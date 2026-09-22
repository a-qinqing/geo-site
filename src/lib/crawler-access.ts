/**
 * Crawler Access Test（HTTP UA Probe）
 *
 * 对 8 个 AI 爬虫（AI Search / AI Assistant / AI Crawler）各发起一次真实 HTTP GET，
 * 使用各平台官方 User-Agent，记录状态码、结果分类、耗时与最终 URL，并与 robots.txt
 * 的声明结果并置对比——用于暴露「robots.txt 声明放行、边缘 / 服务器实际拦截」这类冲突。
 *
 * ⚠️ 免责：这是本工具以自己的网络出口、携带爬虫 UA 发起的探测，
 * **不代表该平台爬虫的真实抓取行为**（真实爬虫的 IP 段与行为无法由公开信息验证）。
 *
 * 请求约束（与产品规范一致）：
 *  - 仅 GET；每个爬虫最多 1 次请求；不自动 retry；最多跟随 2 次 redirect；
 *  - 单爬虫超时不影响其它爬虫；单个爬虫失败不会导致整个扫描失败；
 *  - 不读取、不返回目标站点响应体（只取状态码 / Location 头）。
 *
 * 安全：目标 URL 来自不可信用户输入。每次请求（含每一次 redirect 跳转）都必须先通过
 * checkTargetSafety() 校验；无法安全确认目标时**直接跳过探测**（fail closed），
 * 并返回安全错误，绝不发起请求。
 */
/* ==================== 类型定义 ==================== */

/** robots.txt 声明层结论 */
export type RobotsVerdict = "Allow" | "Disallow" | "Unknown" | "Error";

/** HTTP 探测层结论 */
export type HttpVerdict =
  | "Success" // 2xx —— 可访问
  | "Blocked" // 401 / 403 / 451 —— 被拒绝
  | "RateLimited" // 429
  | "NotFound" // 404 / 410
  | "ServerError" // 5xx
  | "RedirectUnresolved" // 超出最大跳转次数，或 3xx 未给出可校验的 Location
  | "Timeout"
  | "Error"
  | "Skipped"; // 未发起请求（SSRF 防护拒绝）

export type CrawlerGroup = "AI Search" | "AI Assistant" | "AI Crawler";

export interface CrawlerTarget {
  key: string;
  name: string;
  group: CrawlerGroup;
  userAgent: string;
}

/** 由调用方（scan.ts）注入的 robots.txt 声明层结论 */
export interface RobotsAccess {
  verdict: RobotsVerdict;
  rule: string;
}

export interface CrawlerProbeResult {
  key: string;
  name: string;
  group: CrawlerGroup;
  userAgent: string;
  robots: RobotsVerdict;
  robotsRule: string;
  httpStatus: number;
  httpResult: HttpVerdict;
  httpResponseTimeMs: number | null;
  finalUrl: string | null;
  redirects: number;
  /** robots.txt 声明与实际 HTTP 响应是否冲突 */
  mismatch: boolean;
  /** 中文结论（含冲突提示） */
  message: string;
  /** 被安全策略跳过时的原因 */
  safetyReason: string | null;
  /** 运行时报错原文（截断；用于排查 Workers / Node 等运行环境差异） */
  errorDetail: string | null;
}

export interface CrawlerAccessSummary {
  total: number;
  robotsAllow: number;
  robotsDisallow: number;
  robotsUnknown: number;
  httpSuccess: number;
  httpBlocked: number;
  /** 因安全策略未发起探测（Skipped）的数量 */
  httpSkipped: number;
  /** 其余情况（超时 / 404 / 429 / 5xx / 重定向未完成等） */
  httpOther: number;
  mismatch: number;
}

export interface CrawlerAccessReport {
  enabled: boolean;
  targetUrl: string;
  robotsUrl: string;
  probeTimeoutMs: number;
  maxRedirects: number;
  concurrency: number;
  /** 是否整体跳过 HTTP 探测（SSRF 防护） */
  skipped: boolean;
  skipReason: string | null;
  summary: CrawlerAccessSummary;
  note: string;
  disclaimer: string;
  results: CrawlerProbeResult[];
  error?: string;
}

/** 可注入依赖（仅用于测试；生产路径不传） */
export type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;
export type DnsResolver = (hostname: string, signal: AbortSignal) => Promise<DnsResult>;

export interface DnsResult {
  ok: boolean;
  ips: string[];
  provider: string | null;
  error?: string;
}

export interface CrawlerAccessOptions {
  timeoutMs?: number;
  maxRedirects?: number;
  concurrency?: number;
  fetchImpl?: FetchLike;
  resolveDns?: DnsResolver;
}

/* ==================== 常量 ==================== */

export const PROBE_TIMEOUT_MS = 8000;
export const PROBE_MAX_REDIRECTS = 2;
export const PROBE_CONCURRENCY = 4;
const DNS_TIMEOUT_MS = 4000;

const PROBE_ACCEPT = "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8";

/**
 * 8 个爬虫的官方 User-Agent（分组口径与 Cloudflare AI Crawl Control 的
 * Bot reference 一致：AI Search / AI Assistant / AI Crawler）。
 * UA 中的爬虫 token 必须保留——边缘 / WAF 规则正是按该 token 匹配。
 */
export const CRAWLER_TARGETS: CrawlerTarget[] = [
  {
    key: "oai-searchbot",
    name: "OAI-SearchBot",
    group: "AI Search",
    userAgent: "Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)",
  },
  {
    key: "claude-searchbot",
    name: "Claude-SearchBot",
    group: "AI Search",
    userAgent: "Mozilla/5.0 (compatible; Claude-SearchBot/1.0; +http://anthropic.com/claudebot)",
  },
  {
    key: "perplexitybot",
    name: "PerplexityBot",
    group: "AI Search",
    userAgent: "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
  },
  {
    key: "chatgpt-user",
    name: "ChatGPT-User",
    group: "AI Assistant",
    userAgent: "Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)",
  },
  {
    key: "claude-user",
    name: "Claude-User",
    group: "AI Assistant",
    userAgent: "Mozilla/5.0 (compatible; Claude-User/1.0; +Claude-User@anthropic.com)",
  },
  {
    key: "perplexity-user",
    name: "Perplexity-User",
    group: "AI Assistant",
    userAgent: "Mozilla/5.0 (compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)",
  },
  {
    key: "gptbot",
    name: "GPTBot",
    group: "AI Crawler",
    userAgent: "Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)",
  },
  {
    key: "claudebot",
    name: "ClaudeBot",
    group: "AI Crawler",
    userAgent: "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
  },
];

const DISCLAIMER =
  "HTTP UA Probe 由本工具发起（携带对应爬虫 User-Agent），仅反映服务器 / 边缘对该 UA 的响应，不代表该平台爬虫的真实抓取结果。";

/** 本地 / 内网保留主机名（精确匹配或后缀匹配） */
const BLOCKED_HOST_EXACT = new Set([
  "localhost",
  "localhost.localdomain",
  "ip6-localhost",
  "ip6-loopback",
  "metadata",
  "metadata.goog",
  "metadata.google.internal",
  "instance-data",
]);

const BLOCKED_HOST_SUFFIXES = [
  ".localhost",
  ".local",
  ".internal",
  ".home.arpa",
  ".lan",
  ".intranet",
  ".test",
  ".invalid",
  ".example",
];

/** IPv4 保留 / 私有网段（含云 metadata、链路本地、文档网段、组播、保留段） */
const IPV4_BLOCK_RANGES: Array<{ base: number; prefix: number; label: string }> = [
  { base: 0x00000000, prefix: 8, label: "0.0.0.0/8 未指定网络" },
  { base: 0x0a000000, prefix: 8, label: "10.0.0.0/8 私有网段" },
  { base: 0x64400000, prefix: 10, label: "100.64.0.0/10 运营商级 NAT" },
  { base: 0x7f000000, prefix: 8, label: "127.0.0.0/8 回环地址" },
  { base: 0xa9fe0000, prefix: 16, label: "169.254.0.0/16 链路本地（含 169.254.169.254 云 metadata）" },
  { base: 0xac100000, prefix: 12, label: "172.16.0.0/12 私有网段" },
  { base: 0xc0000000, prefix: 24, label: "192.0.0.0/24 IETF 协议保留" },
  { base: 0xc0000200, prefix: 24, label: "192.0.2.0/24 文档用网段" },
  { base: 0xc0a80000, prefix: 16, label: "192.168.0.0/16 私有网段" },
  { base: 0xc6120000, prefix: 15, label: "198.18.0.0/15 基准测试网段" },
  { base: 0xc6336400, prefix: 24, label: "198.51.100.0/24 文档用网段" },
  { base: 0xcb007100, prefix: 24, label: "203.0.113.0/24 文档用网段" },
  { base: 0xe0000000, prefix: 4, label: "224.0.0.0/4 组播" },
  { base: 0xf0000000, prefix: 4, label: "240.0.0.0/4 保留" },
];

/** 云 metadata 服务地址（显式列出，覆盖 100.64/10 之外的平台保留地址） */
const METADATA_IPS = new Map<string, string>([
  ["169.254.169.254", "云 metadata（AWS / Azure / GCP 等）"],
  ["169.254.170.2", "ECS 任务 metadata"],
  ["168.63.129.16", "Azure 平台保留地址"],
  ["100.100.100.200", "阿里云 metadata"],
]);

/**
 * 公共 DoH 解析器（JSON API）。按顺序尝试，全部失败时**不发起探测**（fail closed）。
 * 均为主流公共 DNS，且对国内外网络出口都可达（海外出口优先 Cloudflare，国内出口回退 AliDNS / DNSPod）。
 */
const DOH_PROVIDERS = [
  { name: "cloudflare-doh", url: "https://cloudflare-dns.com/dns-query" },
  { name: "alidns-doh", url: "https://dns.alidns.com/resolve" },
  { name: "dnspod-doh", url: "https://doh.pub/dns-query" },
  { name: "google-doh", url: "https://dns.google/resolve" },
];

/* ==================== IP / 主机名校验 ==================== */

/** 解析 IPv4 字面量 → 32 位整数；非合法 IPv4 返回 null */
function ipv4ToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let value = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const n = Number(part);
    if (n > 255) return null;
    value = value * 256 + n;
  }
  return value;
}

/** IPv6 → 16 字节数组；无法解析返回 null（调用方按「禁止」处理，fail closed） */
function ipv6ToBytes(input: string): number[] | null {
  let ip = input.trim().toLowerCase();
  const zone = ip.indexOf("%");
  if (zone >= 0) ip = ip.slice(0, zone); // 去掉 zone id（防御性）
  if (!ip.includes(":")) return null;

  // 处理末尾内嵌 IPv4（如 ::ffff:127.0.0.1）
  let tail: number[] = [];
  const lastColon = ip.lastIndexOf(":");
  const tailPart = ip.slice(lastColon + 1);
  if (tailPart.includes(".")) {
    const v4 = ipv4ToInt(tailPart);
    if (v4 === null) return null;
    tail = [(v4 >>> 24) & 0xff, (v4 >>> 16) & 0xff, (v4 >>> 8) & 0xff, v4 & 0xff];
    ip = ip.slice(0, lastColon + 1) + "0:0";
  }

  const halves = ip.split("::");
  if (halves.length > 2) return null;

  const parseGroups = (segment: string): number[] | null => {
    if (!segment) return [];
    const out: number[] = [];
    for (const g of segment.split(":")) {
      if (!/^[0-9a-f]{1,4}$/.test(g)) return null;
      out.push(parseInt(g, 16));
    }
    return out;
  };

  const head = parseGroups(halves[0] ?? "");
  const rest = halves.length === 2 ? parseGroups(halves[1] ?? "") : null;
  if (head === null) return null;
  if (halves.length === 2 && rest === null) return null;

  let groups: number[];
  if (halves.length === 2) {
    const fill = 8 - head.length - (rest ?? []).length;
    if (fill < 1) return null;
    groups = [...head, ...Array<number>(fill).fill(0), ...(rest ?? [])];
  } else {
    groups = head;
  }
  if (groups.length !== 8) return null;

  const bytes: number[] = [];
  for (const g of groups) {
    bytes.push((g >> 8) & 0xff, g & 0xff);
  }
  // 内嵌 IPv4（如 ::ffff:127.0.0.1）覆盖最后 4 字节
  if (tail.length === 4) {
    bytes[12] = tail[0] as number;
    bytes[13] = tail[1] as number;
    bytes[14] = tail[2] as number;
    bytes[15] = tail[3] as number;
  }
  return bytes;
}

function bytesToIpv4(bytes: number[]): string {
  return bytes.join(".");
}

function isForbiddenIpv6(bytes: number[]): string | null {
  const allZero = bytes.every((b) => b === 0);
  if (allZero) return ":: 未指定地址";
  const loopback = bytes.slice(0, 15).every((b) => b === 0) && bytes[15] === 1;
  if (loopback) return "::1 回环地址";
  // IPv4 映射 / 相容地址（::ffff:0:0/96 与 ::/96）：按内嵌 IPv4 判定
  const mapped = bytes.slice(0, 10).every((b) => b === 0);
  if (mapped) {
    const embedded = bytesToIpv4(bytes.slice(12, 16));
    if (bytes[10] === 0xff && bytes[11] === 0xff) {
      const reason = forbiddenIpv4Reason(embedded);
      return reason ? `IPv4 映射地址 ::ffff:${embedded}（${reason}）` : null;
    }
    if (bytes[10] === 0 && bytes[11] === 0) {
      const reason = forbiddenIpv4Reason(embedded);
      return reason ? `IPv4 相容地址 ::${embedded}（${reason}）` : null;
    }
    return "IPv4 映射 / 保留地址";
  }
  if ((bytes[0] ?? 0) === 0x01 && (bytes[1] ?? 0) === 0x00 && bytes.slice(2, 8).every((b) => b === 0)) {
    return "100::/64 丢弃专用网段";
  }
  if (bytes[0] === 0x20 && bytes[1] === 0x01 && bytes[2] === 0x0d && bytes[3] === 0xb8) {
    return "2001:db8::/32 文档用网段";
  }
  if (bytes[0] === 0x20 && bytes[1] === 0x02) return "2002::/16 6to4（可能封装内网 IPv4）";
  if (bytes[0] === 0x20 && bytes[1] === 0x01 && bytes[2] === 0x00 && bytes[3] === 0x00) {
    return "2001::/32 Teredo 隧道地址";
  }
  // NAT64（64:ff9b::/96）：按内嵌 IPv4 判定（防止 NAT64 网络下绕过内网校验）
  if (bytes[0] === 0x00 && bytes[1] === 0x64 && bytes[2] === 0xff && bytes[3] === 0x9b) {
    const embedded = bytesToIpv4(bytes.slice(12, 16));
    const reason = forbiddenIpv4Reason(embedded);
    return reason ? `NAT64 地址 64:ff9b::${embedded}（${reason}）` : null;
  }
  if (bytes[0] === 0xff) return "ff00::/8 组播";
  if (bytes[0] === 0xfe && ((bytes[1] ?? 0) & 0xc0) === 0x80) return "fe80::/10 链路本地";
  if (bytes[0] === 0xfe && ((bytes[1] ?? 0) & 0xc0) === 0xc0) return "fec0::/10 站点本地（已废弃）";
  if ((bytes[0] ?? 0) === 0xfc || (bytes[0] ?? 0) === 0xfd) return "fc00::/7 唯一本地地址（ULA）";
  return null;
}

function forbiddenIpv4Reason(ip: string): string | null {
  const meta = METADATA_IPS.get(ip);
  if (meta) return meta;
  const value = ipv4ToInt(ip);
  if (value === null) return "无法解析的 IPv4 地址";
  for (const range of IPV4_BLOCK_RANGES) {
    const shift = 32 - range.prefix;
    if (value >>> shift === range.base >>> shift) return range.label;
  }
  return null;
}

/**
 * 是否为禁止探测的 IP（私有 / 回环 / 链路本地 / metadata / 保留网段）。
 * 无法解析的输入一律返回 true（fail closed）。
 */
export function isForbiddenIp(ip: string): boolean {
  const value = ip.trim().toLowerCase();
  if (!value) return true;

  if (value.includes(":")) {
    const bytes = ipv6ToBytes(value);
    if (bytes === null) return true; // 解析失败：按禁止处理
    return isForbiddenIpv6(bytes) !== null;
  }

  return forbiddenIpv4Reason(value) !== null;
}

/** 主机名规范化：小写、去 IPv6 方括号、去 FQDN 尾点 */
function normalizeHostname(rawHostname: string): string {
  let host = rawHostname.trim().toLowerCase();
  if (host.startsWith("[") && host.endsWith("]")) host = host.slice(1, -1);
  if (host.length > 1 && host.endsWith(".")) host = host.slice(0, -1);
  return host;
}

function isBlockedHostname(host: string): boolean {
  if (BLOCKED_HOST_EXACT.has(host)) return true;
  return BLOCKED_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));
}

/**
 * 非完整域名 / 数字变体（如 2130706433、0x7f.1、内网单标签主机名）。
 * WHATWG URL 已会把多数数字变体规范化为点分十进制（由 IPv4 分支拦截），
 * 这里作为纵深防御再拦一层。
 */
function isAmbiguousHostname(host: string): boolean {
  const tld = host.includes(".") ? host.slice(host.lastIndexOf(".") + 1) : "";
  if (/^xn--[a-z0-9-]+$/i.test(tld)) return false; // punycode 国际化域名
  return !/^[a-z]{2,}$/.test(tld);
}

/* ==================== DNS：DoH 解析并校验全部 IP ==================== */

interface DohAnswer {
  type?: number;
  data?: string;
}

async function queryDoh(
  provider: { name: string; url: string },
  hostname: string,
  type: "A" | "AAAA",
  fetchImpl: FetchLike,
  signal: AbortSignal
): Promise<{ ok: boolean; ips: string[] }> {
  const url = `${provider.url}?name=${encodeURIComponent(hostname)}&type=${type}`;
  const res = await fetchImpl(url, {
    headers: { accept: "application/dns-json" },
    redirect: "follow",
    signal,
  });
  if (!res.ok) return { ok: false, ips: [] };
  const payload = (await res.json()) as { Answer?: DohAnswer[] };
  const answers = Array.isArray(payload?.Answer) ? payload.Answer : [];
  const wantType = type === "A" ? 1 : 28;
  const ips = answers
    .filter((a) => a?.type === wantType && typeof a.data === "string")
    .map((a) => String(a.data).trim())
    .filter(Boolean);
  return { ok: true, ips };
}

/** 默认 DNS 解析器：公共 DoH 依次回退，全部失败即视为「无法确认」（fail closed） */
export const defaultResolveDns: DnsResolver = async (hostname, signal) => {
  const failures: string[] = [];
  for (const provider of DOH_PROVIDERS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), DNS_TIMEOUT_MS);
    const onAbort = () => controller.abort();
    signal.addEventListener("abort", onAbort);
    try {
      const [a, aaaa] = await Promise.all([
        queryDoh(provider, hostname, "A", fetch, controller.signal),
        queryDoh(provider, hostname, "AAAA", fetch, controller.signal),
      ]);
      if (a.ok && aaaa.ok) {
        return { ok: true, ips: [...a.ips, ...aaaa.ips], provider: provider.name };
      }
      failures.push(`${provider.name}: HTTP 错误`);
    } catch (err) {
      failures.push(`${provider.name}: ${err instanceof Error ? err.message : "解析失败"}`);
    } finally {
      clearTimeout(timer);
      signal.removeEventListener("abort", onAbort);
    }
  }
  return { ok: false, ips: [], provider: null, error: failures.join("；") || "公共 DNS 不可用" };
};

/**
 * 带缓存的 DNS 解析器工厂：同一次扫描内同一主机名只解析一次。
 *
 * 供 /api/scan 把「入场校验 → robots.txt / 首页 HTML 抓取（含每次 redirect）→
 * HTTP UA Probe」串到同一份解析结果上，避免重复请求 DoH。
 * 缓存条目使用运行级 signal（不随单个请求超时中止），以免某个请求超时把其它请求也拖成「解析失败」。
 */
export function createDnsCache(resolver: DnsResolver = defaultResolveDns): DnsResolver {
  const cache = new Map<string, Promise<DnsResult>>();
  const cacheSignal = new AbortController().signal;
  return (hostname) => {
    let pending = cache.get(hostname);
    if (!pending) {
      pending = resolver(hostname, cacheSignal);
      cache.set(hostname, pending);
    }
    return pending;
  };
}

/* ==================== SSRF 目标校验 ==================== */

export interface TargetSafety {
  safe: boolean;
  reason: string;
  ips: string[];
}

/**
 * 发起请求前（含每次 redirect）校验目标：
 * 仅 http / https、仅 80 / 443、禁止凭据、禁止 localhost / 私网 / 链路本地 /
 * metadata / IPv6 回环与私有段；域名必须解析成功且**全部** A / AAAA 记录均为公网地址。
 * 任何一步无法确认 → safe: false（调用方必须跳过请求）。
 */
export async function checkTargetSafety(
  target: URL,
  deps: { resolveDns?: DnsResolver; resolveSignal?: AbortSignal } = {}
): Promise<TargetSafety> {
  const resolveDns = deps.resolveDns ?? defaultResolveDns;
  const resolveSignal = deps.resolveSignal ?? new AbortController().signal;
  const deny = (reason: string, ips: string[] = []): TargetSafety => ({ safe: false, reason, ips });

  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return deny(`协议 ${target.protocol} 不在 http / https 白名单内`);
  }
  if (target.username || target.password) {
    return deny("URL 携带用户名或密码，已拒绝");
  }
  if (target.port && target.port !== "80" && target.port !== "443") {
    return deny(`端口 ${target.port} 不在 80 / 443 白名单内`);
  }

  const host = normalizeHostname(target.hostname);
  if (!host) return deny("无法解析目标主机名");
  if (isBlockedHostname(host)) return deny(`主机名 ${host} 属于本地 / 内网保留名称`);

  // IPv6 字面量（含方括号已被规范化剥离）
  if (host.includes(":")) {
    if (isForbiddenIp(host)) return deny(`目标 IPv6 地址 ${host} 属于本地 / 保留网段`);
    return { safe: true, reason: "", ips: [host] };
  }

  // IPv4 字面量（WHATWG URL 已把 2130706433 / 127.1 / 0x7f.0.0.1 等规范化为点分十进制）
  const ipv4 = ipv4ToInt(host);
  if (ipv4 !== null) {
    const reason = forbiddenIpv4Reason(host);
    if (reason) return deny(`目标 IP ${host} 属于内网 / 保留地址（${reason}）`, [host]);
    return { safe: true, reason: "", ips: [host] };
  }

  if (isAmbiguousHostname(host)) {
    return deny(`主机名 ${host} 不是可公开解析的完整域名，已拒绝`);
  }

  // 域名：DoH 解析后校验全部 IP
  const resolved = await resolveDns(host, resolveSignal);
  if (!resolved.ok) {
    return deny(`无法通过公共 DNS 确认 ${host} 的解析结果（${resolved.error ?? "解析失败"}），已跳过探测`);
  }
  if (resolved.ips.length === 0) {
    return deny(`${host} 未解析到任何公共 A / AAAA 记录，已跳过探测`);
  }
  const blocked = resolved.ips.filter((ip) => isForbiddenIp(ip));
  if (blocked.length > 0) {
    return deny(`${host} 解析到内网 / 保留地址（${blocked.join("、")}）`, resolved.ips);
  }
  return { safe: true, reason: "", ips: resolved.ips };
}

/* ==================== HTTP 探测 ==================== */

function classifyHttp(status: number): HttpVerdict {
  if (status >= 200 && status < 300) return "Success";
  if (status === 401 || status === 403 || status === 451) return "Blocked";
  if (status === 429) return "RateLimited";
  if (status === 404 || status === 410) return "NotFound";
  if (status >= 500 && status < 600) return "ServerError";
  return "Error";
}

/** 丢弃响应体：不读取、不返回目标站点内容 */
function discardBody(res: Response): void {
  try {
    const body = res.body;
    if (body) void body.cancel().catch(() => undefined);
  } catch {
    // 部分运行时（如 opaque response）没有 body，忽略
  }
}

interface ProbeOutcome {
  httpStatus: number;
  httpResult: HttpVerdict;
  httpResponseTimeMs: number | null;
  finalUrl: string | null;
  redirects: number;
  safetyReason: string | null;
  /** 运行时报错原文（截断，便于排查运行环境差异，如 Workers / Node 行为不同） */
  errorDetail: string | null;
}

/** 单爬虫探测：跟随最多 maxRedirects 次跳转，每次跳转前重新校验目标 */
async function probeCrawler(
  target: CrawlerTarget,
  startUrl: URL,
  deps: { fetchImpl: FetchLike; resolveDns: DnsResolver },
  limits: { timeoutMs: number; maxRedirects: number }
): Promise<ProbeOutcome> {
  const startedAt = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), limits.timeoutMs);
  const skipped = (reason: string, redirects: number): ProbeOutcome => ({
    httpStatus: 0,
    httpResult: "Skipped",
    httpResponseTimeMs: Date.now() - startedAt,
    finalUrl: null,
    redirects,
    safetyReason: reason,
    errorDetail: null,
  });

  try {
    let current = new URL(startUrl.href);
    let redirects = 0;

    for (;;) {
      // 每次请求（含每次 redirect 之后）都重新校验目标
      const safety = await checkTargetSafety(current, {
        resolveDns: deps.resolveDns,
        resolveSignal: controller.signal,
      });
      if (!safety.safe) {
        return skipped(
          redirects === 0
            ? safety.reason
            : `第 ${redirects} 次跳转的目标被安全策略拒绝：${safety.reason}`,
          redirects
        );
      }

      let res: Response;
      try {
        res = await deps.fetchImpl(current.href, {
          method: "GET",
          redirect: "manual",
          signal: controller.signal,
          headers: {
            "User-Agent": target.userAgent,
            Accept: PROBE_ACCEPT,
            "Accept-Language": "en-US,en;q=0.9",
          },
        });
      } catch (err) {
        if (controller.signal.aborted) {
          return {
            httpStatus: 0,
            httpResult: "Timeout",
            httpResponseTimeMs: Date.now() - startedAt,
            finalUrl: current.href,
            redirects,
            safetyReason: null,
            errorDetail: "请求超时（超过探测超时上限）",
          };
        }
        return {
          httpStatus: 0,
          httpResult: "Error",
          httpResponseTimeMs: Date.now() - startedAt,
          finalUrl: current.href,
          redirects,
          safetyReason: null,
          errorDetail: describeError(err),
        };
      }
      discardBody(res);

      const time = Date.now() - startedAt;

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get("location");
        if (!location) {
          // 3xx 未给出可读取的 Location（opaque redirect）→ 无法校验跳转目标，fail closed
          return {
            httpStatus: res.status,
            httpResult: "RedirectUnresolved",
            httpResponseTimeMs: time,
            finalUrl: current.href,
            redirects,
            safetyReason: "重定向响应未提供可校验的 Location，已停止跟随",
            errorDetail: null,
          };
        }
        if (redirects >= limits.maxRedirects) {
          return {
            httpStatus: res.status,
            httpResult: "RedirectUnresolved",
            httpResponseTimeMs: time,
            finalUrl: current.href,
            redirects,
            safetyReason: `超出最大跳转次数（${limits.maxRedirects}）`,
            errorDetail: null,
          };
        }
        let next: URL;
        try {
          next = new URL(location, current);
        } catch {
          return {
            httpStatus: res.status,
            httpResult: "RedirectUnresolved",
            httpResponseTimeMs: time,
            finalUrl: current.href,
            redirects,
            safetyReason: "重定向目标 URL 非法",
            errorDetail: null,
          };
        }
        redirects += 1;
        current = next;
        continue;
      }

      return {
        httpStatus: res.status,
        httpResult: classifyHttp(res.status),
        httpResponseTimeMs: time,
        finalUrl: current.href,
        redirects,
        safetyReason: null,
        errorDetail: null,
      };
    }
  } finally {
    clearTimeout(timer);
  }
}

/* ==================== 结论组装 ==================== */

function buildMessage(
  robots: RobotsVerdict,
  httpResult: HttpVerdict,
  httpStatus: number,
  safetyReason: string | null
): { message: string; mismatch: boolean } {
  if (httpResult === "Skipped") {
    return { message: `未发起 HTTP 探测：${safetyReason ?? "目标未通过安全校验"}`, mismatch: false };
  }

  const robotsAllows = robots === "Allow" || robots === "Unknown";
  const robotsDisallows = robots === "Disallow";
  const httpBlocked = httpResult === "Blocked";
  const httpOk = httpResult === "Success";

  if (robotsAllows && httpBlocked) {
    const prefix = robots === "Allow" ? "robots.txt 允许，但实际 HTTP 请求被拒绝。" : "";
    return {
      message:
        (prefix || "robots.txt 未声明该爬虫（默认放行），但实际 HTTP 请求被拒绝。") +
        `（HTTP ${httpStatus}）`,
      mismatch: true,
    };
  }
  if (robotsDisallows && httpOk) {
    return { message: `robots.txt 禁止，但实际 HTTP 请求成功。（HTTP ${httpStatus}）`, mismatch: true };
  }
  if (robots === "Error") {
    return {
      message: `robots.txt 获取失败，无法确认声明策略；实际 HTTP 响应：${httpStatus}（${httpResult}）。`,
      mismatch: false,
    };
  }
  if (robotsDisallows && httpBlocked) {
    return { message: `robots.txt 禁止，实际请求也被拒绝（一致）。（HTTP ${httpStatus}）`, mismatch: false };
  }
  if (robotsAllows && httpOk) {
    return {
      message:
        robots === "Allow"
          ? `robots.txt 放行，实际请求成功（一致）。（HTTP ${httpStatus}）`
          : `robots.txt 未声明该爬虫（默认放行），实际请求成功。（HTTP ${httpStatus}）`,
      mismatch: false,
    };
  }

  const detail =
    httpResult === "RateLimited"
      ? "请求被限流（429），建议降低抓取频率"
      : httpResult === "NotFound"
        ? "目标地址返回 404 / 410"
        : httpResult === "ServerError"
          ? "目标服务器返回 5xx 错误"
          : httpResult === "Timeout"
            ? "请求超时，未能获得响应"
            : httpResult === "RedirectUnresolved"
              ? "重定向无法安全跟随"
              : "请求失败";
  return { message: `${detail}（HTTP ${httpStatus || "-"}，${httpResult}）。`, mismatch: false };
}

/** 把异常收敛成一行可读文本（截断 160 字符），避免把整栈信息带进 API 响应 */
function describeError(err: unknown): string {
  if (err instanceof Error) {
    const cause = (err as { cause?: unknown }).cause;
    const causeText = cause instanceof Error ? ` ← ${cause.message}` : "";
    return `${err.name}: ${err.message}${causeText}`.slice(0, 160);
  }
  return String(err).slice(0, 160);
}

/** HTTP 结论的中文短标签（用于汇总句） */
const HTTP_VERDICT_CN: Record<HttpVerdict, string> = {
  Success: "可访问",
  Blocked: "被拒绝",
  RateLimited: "被限流",
  NotFound: "404/410",
  ServerError: "服务器错误",
  RedirectUnresolved: "重定向未完成",
  Timeout: "超时",
  Error: "请求失败",
  Skipped: "未探测",
};

function buildNote(
  results: CrawlerProbeResult[],
  summary: CrawlerAccessSummary,
  skipped: boolean,
  skipReason: string | null,
  sampleSkipReason: string | null
): string {
  if (skipped) return `HTTP UA Probe 已整体跳过：${skipReason ?? "未通过安全校验"}。`;

  const parts: string[] = [];
  if (summary.mismatch > 0) {
    parts.push(
      `${summary.total} 个爬虫中有 ${summary.mismatch} 个出现「robots.txt 声明」与「实际 HTTP 响应」不一致——声明层放行不等于执行层放行`
    );
  } else if (summary.httpBlocked > 0) {
    parts.push(`${summary.total} 个爬虫中 ${summary.httpBlocked} 个被实际拦截（与 robots.txt 声明一致）`);
  } else if (summary.httpSuccess === summary.total) {
    parts.push(`${summary.total} 个爬虫的 robots.txt 声明与实际 HTTP 响应一致`);
  } else {
    parts.push(`${summary.total} 个爬虫中 ${summary.httpSuccess} 个可正常访问`);
  }

  // 其余结果（非成功 / 非冲突 / 非跳过）的细分，例如「超时 8」「404/410 2、超时 6」
  const rest = new Map<HttpVerdict, number>();
  for (const r of results) {
    if (r.httpResult === "Success" || r.httpResult === "Skipped" || r.mismatch) continue;
    rest.set(r.httpResult, (rest.get(r.httpResult) ?? 0) + 1);
  }
  if (rest.size > 0) {
    parts.push(`其余：${[...rest].map(([verdict, count]) => `${HTTP_VERDICT_CN[verdict]} ${count}`).join("、")}`);
  }

  if (summary.httpSkipped > 0) {
    parts.push(
      `${summary.httpSkipped} 个未发起探测（安全策略）${sampleSkipReason ? `：${sampleSkipReason}` : ""}`
    );
  }
  return `${parts.join("；")}。`;
}

/** 简易并发池：保证单个爬虫失败不影响其它爬虫 */
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;
  const size = Math.max(1, Math.min(limit, items.length));
  const workers = Array.from({ length: size }, async () => {
    for (;;) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      results[index] = await fn(items[index] as T);
    }
  });
  await Promise.all(workers);
  return results;
}

/**
 * 执行 Crawler Access Test。
 *
 * @param targetUrl         目标 URL（已由调用方做过基础校验）
 * @param robotsAccess      由调用方注入的 robots.txt 声明层结论
 * @param options           超时 / 跳转次数 / 并发（测试可注入 fetchImpl、resolveDns）
 *
 * 本函数不抛异常：任何内部错误都会降级为 enabled: false 的报告，
 * 保证「单个 crawler 失败不能导致整个扫描失败」。
 */
export async function runCrawlerAccessTest(
  targetUrl: string,
  robotsAccess: (crawlerName: string) => RobotsAccess | Promise<RobotsAccess>,
  options: CrawlerAccessOptions = {}
): Promise<CrawlerAccessReport> {
  const timeoutMs = options.timeoutMs ?? PROBE_TIMEOUT_MS;
  const maxRedirects = options.maxRedirects ?? PROBE_MAX_REDIRECTS;
  const concurrency = options.concurrency ?? PROBE_CONCURRENCY;
  // 注意：必须用箭头函数包一层，把全局 fetch 作为**自由变量**调用。
  // workerd（Cloudflare Workers）运行时下，把 fetch 存成对象属性后再以 obj.fetch(...) 形式调用
  // 会抛异常（调用接收者不是全局对象），实测表现为 8 个爬虫全部瞬时 "Error"。
  const fetchImpl: FetchLike = options.fetchImpl ?? ((input, init) => fetch(input, init));
  const resolveDns = options.resolveDns ?? defaultResolveDns;

  const base: Omit<CrawlerAccessReport, "note" | "summary" | "results"> = {
    enabled: true,
    targetUrl,
    robotsUrl: "",
    probeTimeoutMs: timeoutMs,
    maxRedirects,
    concurrency,
    skipped: false,
    skipReason: null,
    disclaimer: DISCLAIMER,
  };
  const emptySummary: CrawlerAccessSummary = {
    total: 0,
    robotsAllow: 0,
    robotsDisallow: 0,
    robotsUnknown: 0,
    httpSuccess: 0,
    httpBlocked: 0,
    httpSkipped: 0,
    httpOther: 0,
    mismatch: 0,
  };

  let startUrl: URL;
  try {
    startUrl = new URL(targetUrl);
    base.robotsUrl = `${startUrl.origin}/robots.txt`;
  } catch {
    return {
      ...base,
      enabled: false,
      summary: emptySummary,
      note: "目标 URL 非法，未执行 Crawler Access Test。",
      results: [],
      error: "invalid_target_url",
    };
  }

  // 每次运行的 DNS 结果缓存：8 个爬虫（含 redirect 后重新校验）共用一次解析结果，
  // 避免对同一主机名重复请求 DoH。缓存的 Promise 使用运行级 signal（不随单爬虫超时中止），
  // 以免某个爬虫超时导致其它爬虫误判为「解析失败」。
  const runSignal = new AbortController().signal;
  const dnsCache = new Map<string, Promise<DnsResult>>();
  const cachedResolve: DnsResolver = (hostname) => {
    let pending = dnsCache.get(hostname);
    if (!pending) {
      pending = resolveDns(hostname, runSignal);
      dnsCache.set(hostname, pending);
    }
    return pending;
  };

  // 整体前置校验：目标不通过安全校验时，整体跳过（不发起任何请求）
  let entrySafety: TargetSafety;
  try {
    entrySafety = await checkTargetSafety(startUrl, {
      resolveDns: cachedResolve,
      resolveSignal: runSignal,
    });
  } catch (err) {
    return {
      ...base,
      enabled: false,
      summary: emptySummary,
      note: "目标安全校验过程出错，未执行 Crawler Access Test。",
      results: [],
      error: err instanceof Error ? err.message : "safety_check_failed",
    };
  }

  const errorOutcome = (safetyReason: string | null, errorDetail: string | null = null): ProbeOutcome => ({
    httpStatus: 0,
    httpResult: safetyReason ? "Skipped" : "Error",
    httpResponseTimeMs: null,
    finalUrl: null,
    redirects: 0,
    safetyReason,
    errorDetail,
  });

  // 1) robots.txt 声明层结论（由调用方注入，与 HTTP 探测并行准备）
  const accesses = await Promise.all(
    CRAWLER_TARGETS.map(async (target) => {
      try {
        return await robotsAccess(target.name);
      } catch {
        return { verdict: "Error" as RobotsVerdict, rule: "robots.txt 声明解析失败" };
      }
    })
  );

  // 2) 并发 HTTP 探测（并发池限制；单爬虫失败 / 异常均不影响其它爬虫）
  const outcomes: ProbeOutcome[] = entrySafety.safe
    ? await mapWithConcurrency(CRAWLER_TARGETS, concurrency, (target) =>
        probeCrawler(target, startUrl, { fetchImpl, resolveDns: cachedResolve }, { timeoutMs, maxRedirects }).catch(
          (err: unknown) => errorOutcome(null, describeError(err))
        )
      )
    : CRAWLER_TARGETS.map(() => errorOutcome(entrySafety.reason));

  const results: CrawlerProbeResult[] = CRAWLER_TARGETS.map((target, index) => {
    const access = accesses[index] ?? { verdict: "Error" as RobotsVerdict, rule: "robots.txt 声明解析失败" };
    const outcome = outcomes[index] ?? errorOutcome(null);
    const { message, mismatch } = buildMessage(
      access.verdict,
      outcome.httpResult,
      outcome.httpStatus,
      outcome.safetyReason
    );
    return {
      key: target.key,
      name: target.name,
      group: target.group,
      userAgent: target.userAgent,
      robots: access.verdict,
      robotsRule: access.rule,
      httpStatus: outcome.httpStatus,
      httpResult: outcome.httpResult,
      httpResponseTimeMs: outcome.httpResponseTimeMs,
      finalUrl: outcome.finalUrl,
      redirects: outcome.redirects,
      mismatch,
      message,
      safetyReason: outcome.safetyReason,
      errorDetail: outcome.errorDetail,
    };
  });

  const summary: CrawlerAccessSummary = {
    total: results.length,
    robotsAllow: results.filter((r) => r.robots === "Allow").length,
    robotsDisallow: results.filter((r) => r.robots === "Disallow").length,
    robotsUnknown: results.filter((r) => r.robots === "Unknown" || r.robots === "Error").length,
    httpSuccess: results.filter((r) => r.httpResult === "Success").length,
    httpBlocked: results.filter((r) => r.httpResult === "Blocked").length,
    httpSkipped: results.filter((r) => r.httpResult === "Skipped").length,
    httpOther: results.filter(
      (r) => r.httpResult !== "Success" && r.httpResult !== "Blocked" && r.httpResult !== "Skipped"
    ).length,
    mismatch: results.filter((r) => r.mismatch).length,
  };

  const skipped = results.every((r) => r.httpResult === "Skipped") && !entrySafety.safe;
  const sampleSkipReason = results.find((r) => r.httpResult === "Skipped")?.safetyReason ?? null;

  return {
    ...base,
    skipped,
    skipReason: entrySafety.safe ? null : entrySafety.reason,
    summary,
    note: buildNote(results, summary, skipped, entrySafety.reason || null, sampleSkipReason),
    results,
  };
}
