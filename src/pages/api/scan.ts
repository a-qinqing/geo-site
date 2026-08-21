/**
 * GEO 站点健康度综合诊断 API
 *
 * POST /api/scan
 * Body: { "target_url": "https://example.com" }
 *
 * 检测逻辑：
 *  1. 抓取目标站点的 /robots.txt，检测 GPTBot / PerplexityBot / ClaudeBot / Bytespider 的访问策略
 *  2. 抓取首页 HTML，检测 JSON-LD 结构化数据（Organization / FAQPage / Article 等）
 *  3. 统计 <body> 纯文本字数，预警 CSR 动态渲染（AI 爬虫通常不执行 JavaScript）
 *
 * 评分体系（总分 100）：
 *  - AI 爬虫访问 40 分（每个爬虫 10 分）
 *  - 结构化数据 30 分（Organization 15 / FAQPage 8 / Article 7）
 *  - 内容可读性 30 分（按正文纯文本量分级）
 *
 * 注意：该路由需要 on-demand rendering（SSR）运行环境。
 * 若 `astro build` 报 "Output is static" 类错误，需要在 astro.config.mjs 中
 * 设置 output: "server" 并安装对应适配器（如 @astrojs/cloudflare），本文件无需改动。
 */
import type { APIRoute } from "astro";

export const prerender = false;

/* ==================== 类型定义 ==================== */

type ChecklistStatus = "pass" | "warning" | "fail" | "error" | "info";

interface FetchOutcome {
  ok: boolean;
  httpStatus: number;
  found: boolean;
  text: string;
  truncated: boolean;
  error?: string;
}

interface BotCheck {
  key: string;
  name: string;
  vendor: string;
  status: "allowed" | "blocked" | "unknown" | "error";
  rule: string;
  points: number;
}

interface CrawlersDimension {
  score: number;
  maxScore: number;
  status: ChecklistStatus;
  note: string;
  robotsUrl: string;
  robotsFound: boolean;
  bots: BotCheck[];
}

interface SdCheckResult {
  key: string;
  label: string;
  found: boolean;
  foundType?: string;
  points: number;
  advice: string;
}

interface StructuredDataDimension {
  score: number;
  maxScore: number;
  status: ChecklistStatus;
  note: string;
  types: string[];
  jsonLdCount: number;
  checks: SdCheckResult[];
}

interface ContentDimension {
  score: number;
  maxScore: number;
  status: ChecklistStatus;
  note: string;
  textLength: number;
  csrRisk: "low" | "medium" | "high";
  csrSignals: string[];
}

interface ChecklistItem {
  category: "爬虫访问" | "结构化数据" | "内容可读性";
  label: string;
  status: ChecklistStatus;
  detail: string;
}

/* ==================== 常量 ==================== */

const SCAN_UA =
  "Mozilla/5.0 (compatible; GEOHealthScanner/1.0; +https://www.geova.cn/tool)";
const ROBOTS_TIMEOUT_MS = 8000;
const HTML_TIMEOUT_MS = 12000;
const ROBOTS_MAX_BYTES = 512 * 1024;
const HTML_MAX_BYTES = 3 * 1024 * 1024;

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
} as const;

const SCORE = {
  crawlers: { max: 40, perBot: 10, unknownPoints: 5 },
  structuredData: { max: 30 },
  content: { max: 30 },
} as const;

const AI_BOTS: Array<{ key: string; name: string; vendor: string }> = [
  { key: "gptbot", name: "GPTBot", vendor: "OpenAI / ChatGPT" },
  { key: "perplexitybot", name: "PerplexityBot", vendor: "Perplexity" },
  { key: "claudebot", name: "ClaudeBot", vendor: "Anthropic / Claude" },
  { key: "bytespider", name: "Bytespider", vendor: "ByteDance / 豆包" },
];

const ENTITY_TYPES = [
  "organization",
  "website",
  "person",
  "professionalservice",
  "localbusiness",
  "corporation",
  "brand",
] as const;

const ARTICLE_TYPES = [
  "article",
  "blogposting",
  "newsarticle",
  "techarticle",
  "report",
  "scholarlyarticle",
] as const;

interface SdCheckDef {
  key: string;
  label: string;
  types: readonly string[];
  points: number;
  advice: string;
}

const SD_CHECKS: SdCheckDef[] = [
  {
    key: "entity",
    label: "Organization 实体标记",
    types: ENTITY_TYPES,
    points: 15,
    advice:
      "添加 Organization（或 WebSite / Person 等实体类）JSON-LD，帮助 AI 搜索引擎准确识别品牌实体与业务信息。",
  },
  {
    key: "faq",
    label: "FAQPage 问答标记",
    types: ["faqpage"],
    points: 8,
    advice:
      "为高频问题添加 FAQPage 结构化数据，增加内容被 AI 引擎直接引用为答案的机会。",
  },
  {
    key: "article",
    label: "Article 文章标记",
    types: ARTICLE_TYPES,
    points: 7,
    advice:
      "为博客 / 内容页添加 Article（BlogPosting / NewsArticle）JSON-LD，强化作者、日期与内容语义信号。",
  },
];

/** 正文过短时，辅助判断 CSR 动态渲染的框架特征标记 */
const CSR_MARKERS: Array<{ re: RegExp; label: string }> = [
  { re: /\bid=["'](?:root|app)["']/i, label: '存在 id="root" / id="app" 挂载容器' },
  {
    re: /__NEXT_DATA__|createRoot\s*\(|hydrateRoot\s*\(|data-reactroot/i,
    label: "检测到 React / Next 等客户端渲染框架标记",
  },
];

/* ==================== 工具函数 ==================== */

/** 规范化用户输入的 URL；非法输入返回 null */
function normalizeUrl(raw: string): URL | null {
  const input = raw.trim();
  if (!input) return null;
  const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`;
  try {
    const url = new URL(withProtocol);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    if (!url.hostname) return null;
    if (url.username || url.password) return null; // 拒绝带凭据的 URL
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

/** 基础 SSRF 防护：拦截 localhost / 私网 IP 与非常用端口（DNS 层防护依赖部署平台） */
function isForbiddenUrl(url: URL): boolean {
  if (url.port && url.port !== "80" && url.port !== "443") return true;

  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    return true;
  }

  // IPv4 字面量
  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const [a, b] = ipv4.slice(1).map(Number);
    if ([a, b].some((n) => Number.isNaN(n) || n > 255)) return true;
    if (a === 10) return true; // 10.0.0.0/8
    if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
    if (a === 192 && b === 168) return true; // 192.168.0.0/16
    if (a === 127) return true; // 回环
    if (a === 0) return true; // 0.0.0.0/8
    if (a === 169 && b === 254) return true; // 链路本地
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT 100.64.0.0/10
    return false;
  }

  // IPv6 字面量
  if (host.includes(":")) {
    const h = host.toLowerCase();
    if (h === "::1" || h === "::") return true; // 回环 / 未指定
    if (h.startsWith("fe80") || h.startsWith("fc") || h.startsWith("fd")) return true; // 链路本地 / ULA
  }

  return false;
}

/** 带超时与体积上限的抓取（兼容 Node / Cloudflare Workers 运行时） */
async function fetchWithLimit(
  url: string,
  timeoutMs: number,
  maxBytes: number
): Promise<FetchOutcome> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": SCAN_UA,
        Accept: "text/html,text/plain,application/xhtml+xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!res.ok || !res.body) {
      return { ok: false, httpStatus: res.status, found: false, text: "", truncated: false };
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let text = "";
    let received = 0;
    let truncated = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > maxBytes) {
        truncated = true;
        const keep = value.byteLength - (received - maxBytes);
        if (keep > 0) text += decoder.decode(value.subarray(0, keep), { stream: false });
        await reader.cancel().catch(() => undefined);
        break;
      }
      text += decoder.decode(value, { stream: true });
    }
    if (!truncated) text += decoder.decode(); // flush 剩余字节

    return {
      ok: true,
      httpStatus: res.status,
      found: res.status >= 200 && res.status < 300,
      text,
      truncated,
    };
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === "AbortError";
    return {
      ok: false,
      httpStatus: 0,
      found: false,
      text: "",
      truncated: false,
      error: aborted ? "请求超时" : "网络错误，无法连接目标站点",
    };
  } finally {
    clearTimeout(timer);
  }
}

/* ==================== robots.txt 解析 ==================== */

interface RobotsGroup {
  agents: string[];
  disallowAll: boolean;
  allowAll: boolean;
}

function parseRobotsGroups(content: string): RobotsGroup[] {
  const groups: RobotsGroup[] = [];
  let current: RobotsGroup | null = null;
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.split("#", 1)[0]?.trim() ?? "";
    if (!line) continue;
    const idx = line.indexOf(":");
    if (idx <= 0) continue;
    const field = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    if (field === "user-agent") {
      current = { agents: [value.toLowerCase()], disallowAll: false, allowAll: false };
      groups.push(current);
    } else if (current && field === "disallow" && value === "/") {
      current.disallowAll = true;
    } else if (current && field === "allow" && value === "/") {
      current.allowAll = true;
    }
  }
  return groups;
}

function resolveBotAccess(
  groups: RobotsGroup[],
  botName: string
): { status: "allowed" | "blocked"; rule: string } {
  const name = botName.toLowerCase();
  const exact = groups.find((g) => g.agents.includes(name));
  const group = exact ?? groups.find((g) => g.agents.includes("*"));
  if (!group) {
    return { status: "allowed", rule: "robots.txt 未声明该爬虫，默认允许抓取" };
  }
  if (group.allowAll) {
    return { status: "allowed", rule: '存在 "Allow: /" 全站放行规则' };
  }
  if (group.disallowAll) {
    return {
      status: "blocked",
      rule: `"User-agent: ${group.agents.join(", ")}" 组存在 "Disallow: /" 全站拦截`,
    };
  }
  return { status: "allowed", rule: "未发现全站拦截规则，默认允许抓取" };
}

/* ==================== HTML 解析 ==================== */

interface JsonLdBlock {
  type: string;
}

function extractJsonLd(html: string): JsonLdBlock[] {
  const results: JsonLdBlock[] = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    const raw = match[1]?.trim();
    if (!raw) continue;
    try {
      const parsed: unknown = JSON.parse(raw);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        if (!item || typeof item !== "object") continue;
        const type = (item as { "@type"?: unknown })["@type"];
        if (typeof type === "string") {
          results.push({ type });
        } else if (Array.isArray(type)) {
          for (const t of type) {
            if (typeof t === "string") results.push({ type: t });
          }
        }
      }
    } catch {
      // 忽略非法 JSON-LD 块
    }
  }
  return results;
}

/** 提取 body 纯文本：剥离脚本 / 样式 / 标签，解码常见 HTML 实体 */
function extractBodyText(html: string): string {
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<template[\s\S]*?<\/template>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ");

  text = text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)));

  return text.replace(/\s+/g, " ").trim();
}

/* ==================== 维度分析 ==================== */

function analyzeCrawlers(url: URL, robots: FetchOutcome): CrawlersDimension {
  const robotsUrl = `${url.origin}/robots.txt`;
  const { max, perBot, unknownPoints } = SCORE.crawlers;
  const groups = robots.found ? parseRobotsGroups(robots.text) : [];

  const bots: BotCheck[] = AI_BOTS.map((bot) => {
    if (robots.error) {
      return {
        key: bot.key,
        name: bot.name,
        vendor: bot.vendor,
        status: "error",
        rule: `robots.txt 获取失败（${robots.error}），无法确认`,
        points: 0,
      };
    }
    if (!robots.found) {
      return {
        key: bot.key,
        name: bot.name,
        vendor: bot.vendor,
        status: "unknown",
        rule: "robots.txt 不存在，默认允许抓取（无法确认服务器级策略）",
        points: unknownPoints,
      };
    }
    const resolved = resolveBotAccess(groups, bot.name);
    return {
      key: bot.key,
      name: bot.name,
      vendor: bot.vendor,
      status: resolved.status,
      rule: resolved.rule,
      points: resolved.status === "allowed" ? perBot : 0,
    };
  });

  const score = bots.reduce((sum, b) => sum + b.points, 0);
  const blockedCount = bots.filter((b) => b.status === "blocked").length;

  let status: ChecklistStatus;
  let note: string;
  if (robots.error) {
    status = "error";
    note = "无法获取 robots.txt，爬虫访问策略未知";
  } else if (!robots.found) {
    status = "warning";
    note = "未找到 robots.txt：默认不拦截 AI 爬虫，但无法确认";
  } else if (blockedCount > 0) {
    status = "warning";
    note = `${blockedCount} 个 AI 爬虫被 robots.txt 拦截`;
  } else {
    status = "pass";
    note = "主流 AI 爬虫全部放行";
  }

  return { score, maxScore: max, status, note, robotsUrl, robotsFound: robots.found, bots };
}

function analyzeStructuredData(html: FetchOutcome): StructuredDataDimension {
  const { max } = SCORE.structuredData;
  if (html.error) {
    return {
      score: 0,
      maxScore: max,
      status: "error",
      note: `HTML 获取失败（${html.error}），无法检测结构化数据`,
      types: [],
      jsonLdCount: 0,
      checks: [],
    };
  }

  const blocks = extractJsonLd(html.text);
  const types = Array.from(new Set(blocks.map((b) => b.type)));

  const checks: SdCheckResult[] = SD_CHECKS.map((def) => {
    const foundType = types.find((t) => def.types.includes(t.toLowerCase()));
    return {
      key: def.key,
      label: def.label,
      found: Boolean(foundType),
      foundType,
      points: def.points,
      advice: def.advice,
    };
  });

  const score = checks.reduce((sum, c) => sum + (c.found ? c.points : 0), 0);
  const status: ChecklistStatus = score === max ? "pass" : score > 0 ? "warning" : "fail";
  const other = types.filter((t) => !SD_CHECKS.some((def) => def.types.includes(t.toLowerCase())));

  const note =
    blocks.length === 0
      ? "未检测到任何 JSON-LD 结构化数据"
      : `检测到 ${blocks.length} 个 JSON-LD 块：${types.join("、")}${
          other.length > 0 ? `（含 ${other.join("、")} 等附加类型）` : ""
        }`;

  return { score, maxScore: max, status, note, types, jsonLdCount: blocks.length, checks };
}

function analyzeContent(html: FetchOutcome): ContentDimension {
  const { max } = SCORE.content;
  if (html.error) {
    return {
      score: 0,
      maxScore: max,
      status: "error",
      note: `HTML 获取失败（${html.error}），无法检测正文内容`,
      textLength: 0,
      csrRisk: "high",
      csrSignals: [],
    };
  }

  const text = extractBodyText(html.text);
  const textLength = text.length;

  let score: number;
  let csrRisk: "low" | "medium" | "high";
  if (textLength >= 1200) {
    score = 30;
    csrRisk = "low";
  } else if (textLength >= 600) {
    score = 24;
    csrRisk = "medium";
  } else if (textLength >= 300) {
    score = 14;
    csrRisk = "medium";
  } else {
    score = 0;
    csrRisk = "high";
  }

  const csrSignals: string[] = [];
  if (csrRisk === "high") {
    csrSignals.push(`正文纯文本仅 ${textLength} 字，远低于安全阈值（推荐 ≥ 1200 字）`);
    for (const marker of CSR_MARKERS) {
      if (marker.re.test(html.text)) csrSignals.push(marker.label);
    }
  }
  if (html.truncated) csrSignals.push("HTML 超过 3MB 已截断，统计可能不完整");

  const status: ChecklistStatus =
    csrRisk === "high" ? "fail" : csrRisk === "medium" ? "warning" : "pass";
  const note =
    csrRisk === "high"
      ? `正文仅 ${textLength} 字，疑似 CSR 动态渲染——AI 爬虫可能看不到实际内容`
      : csrRisk === "medium"
        ? `正文 ${textLength} 字，内容量偏少`
        : `正文 ${textLength} 字，内容量充足`;

  return { score, maxScore: max, status, note, textLength, csrRisk, csrSignals };
}

/* ==================== 汇总输出 ==================== */

function gradeOf(score: number): string {
  if (score >= 85) return "优秀";
  if (score >= 70) return "良好";
  if (score >= 50) return "中等";
  if (score >= 30) return "薄弱";
  return "亟需优化";
}

function buildSummary(
  score: number,
  grade: string,
  d: { crawlers: CrawlersDimension; structuredData: StructuredDataDimension; content: ContentDimension }
): string {
  if (d.crawlers.status === "error" && d.structuredData.status === "error") {
    return "无法访问该站点，未能完成诊断，请检查网址后重试。";
  }
  const issues: string[] = [];
  if (d.crawlers.status === "warning" || d.crawlers.status === "error") issues.push(d.crawlers.note);
  if (d.structuredData.status === "fail") issues.push("缺少 JSON-LD 结构化数据");
  else if (d.structuredData.status === "warning") issues.push("结构化数据不完整");
  if (d.content.status === "fail") issues.push("正文内容严重不足，疑似 CSR 渲染");
  else if (d.content.status === "warning") issues.push("正文内容偏少");

  if (issues.length === 0) {
    return `GEO 健康度 ${score} 分（${grade}）：核心基础信号全部通过，继续保持。`;
  }
  return `GEO 健康度 ${score} 分（${grade}）：${issues.join("；")}。`;
}

function buildChecklist(d: {
  crawlers: CrawlersDimension;
  structuredData: StructuredDataDimension;
  content: ContentDimension;
}): ChecklistItem[] {
  const items: ChecklistItem[] = [];

  // robots.txt 总览
  if (d.crawlers.status === "error") {
    items.push({
      category: "爬虫访问",
      label: "robots.txt 获取失败",
      status: "error",
      detail: "网络错误或请求超时，无法确认爬虫访问策略",
    });
  } else if (d.crawlers.robotsFound) {
    items.push({
      category: "爬虫访问",
      label: "robots.txt 可访问",
      status: "pass",
      detail: d.crawlers.robotsUrl,
    });
  } else {
    items.push({
      category: "爬虫访问",
      label: "未找到 robots.txt",
      status: "warning",
      detail: "默认不拦截爬虫，但无法确认服务器级访问策略",
    });
  }

  // 每个 AI 爬虫
  for (const bot of d.crawlers.bots) {
    const status: ChecklistStatus =
      bot.status === "allowed"
        ? "pass"
        : bot.status === "blocked"
          ? "fail"
          : bot.status === "error"
            ? "error"
            : "warning";
    items.push({
      category: "爬虫访问",
      label: `${bot.name}（${bot.vendor}）`,
      status,
      detail: bot.rule,
    });
  }

  // 结构化数据
  if (d.structuredData.status === "error") {
    items.push({
      category: "结构化数据",
      label: "JSON-LD 检测失败",
      status: "error",
      detail: d.structuredData.note,
    });
  } else {
    for (const check of d.structuredData.checks) {
      items.push({
        category: "结构化数据",
        label: check.label,
        status: check.found ? "pass" : "fail",
        detail: check.found
          ? `检测到 @type: ${check.foundType}`
          : "未检测到该类型标记",
      });
    }
  }

  // 内容可读性
  if (d.content.status === "error") {
    items.push({
      category: "内容可读性",
      label: "HTML 内容检测失败",
      status: "error",
      detail: d.content.note,
    });
  } else {
    items.push({
      category: "内容可读性",
      label: "HTML 正文内容量",
      status: d.content.status,
      detail: `解析出正文纯文本 ${d.content.textLength} 字（推荐 ≥ 1200 字）`,
    });
    if (d.content.csrRisk !== "low") {
      items.push({
        category: "内容可读性",
        label: "CSR 动态渲染预警",
        status: d.content.csrRisk === "high" ? "fail" : "warning",
        detail:
          d.content.csrSignals.join("；") ||
          "正文偏少，建议检查内容是否依赖客户端 JavaScript 渲染",
      });
    }
  }

  return items;
}

function buildRecommendations(
  d: { crawlers: CrawlersDimension; structuredData: StructuredDataDimension; content: ContentDimension },
  score: number
): string[] {
  const recs: string[] = [];

  if (d.crawlers.status === "error") {
    recs.push("无法获取 robots.txt：请确认站点可达、服务器响应正常后重试。");
  }
  if (d.structuredData.status === "error") {
    recs.push("无法获取首页 HTML：请确认站点可正常访问，且未屏蔽爬虫请求。");
  }

  const blocked = d.crawlers.bots.filter((b) => b.status === "blocked").map((b) => b.name);
  if (blocked.length > 0) {
    recs.push(
      `解除 robots.txt 中对 ${blocked.join("、")} 的拦截：AI 爬虫被拒之门外，品牌内容就无法被 AI 引擎引用。`
    );
  }
  if (!d.crawlers.robotsFound && d.crawlers.status !== "error") {
    recs.push("创建 robots.txt 并显式放行主流 AI 爬虫，避免默认策略带来的不确定性。");
  }

  for (const check of d.structuredData.checks) {
    if (!check.found) recs.push(check.advice);
  }

  if (d.content.csrRisk === "high" && d.content.status !== "error") {
    recs.push(
      "HTML 正文过短，疑似 CSR 动态渲染：AI 爬虫通常不执行 JavaScript，请改用 SSR / 预渲染，或提供静态直出的核心内容。"
    );
  } else if (d.content.status === "warning") {
    recs.push("补充正文内容：建议首页可解析纯文本达到 1200 字以上，帮助 AI 提取完整语义。");
  }

  if (score >= 85) {
    recs.unshift("核心 GEO 基础信号全部通过，建议定期复测并持续跟踪 AI 引擎引用情况。");
  } else {
    recs.push("如需深度诊断（AI 引用评估、竞品对标、知识图谱建设），可预约人工诊断服务。");
  }

  return recs;
}

function respondError(status: number, error: string): Response {
  return new Response(JSON.stringify({ success: false, error }), {
    status,
    headers: JSON_HEADERS,
  });
}

/* ==================== 路由处理 ==================== */

export const POST: APIRoute = async ({ request }) => {
  const startedAt = Date.now();

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return respondError(400, '请求体不是合法的 JSON，请提交 { "target_url": "https://..." }');
  }

  const raw = (payload as { target_url?: unknown } | null)?.target_url;
  if (typeof raw !== "string" || !raw.trim()) {
    return respondError(400, "缺少 target_url 参数");
  }

  const url = normalizeUrl(raw);
  if (!url) {
    return respondError(400, "URL 格式不正确，请输入 http/https 开头的完整网址");
  }
  if (isForbiddenUrl(url)) {
    return respondError(400, "出于安全考虑，不支持内网地址（localhost / 私网 IP / 非常用端口）");
  }

  // 并发抓取 robots.txt 与首页 HTML
  const [robots, html] = await Promise.all([
    fetchWithLimit(`${url.origin}/robots.txt`, ROBOTS_TIMEOUT_MS, ROBOTS_MAX_BYTES),
    fetchWithLimit(url.href, HTML_TIMEOUT_MS, HTML_MAX_BYTES),
  ]);

  const crawlers = analyzeCrawlers(url, robots);
  const structuredData = analyzeStructuredData(html);
  const content = analyzeContent(html);
  const dimensions = { crawlers, structuredData, content };

  const score = Math.max(
    0,
    Math.min(100, Math.round(crawlers.score + structuredData.score + content.score))
  );
  const grade = gradeOf(score);

  const result = {
    success: true,
    url: url.href,
    scannedAt: new Date().toISOString(),
    durationMs: Date.now() - startedAt,
    score,
    grade,
    summary: buildSummary(score, grade, dimensions),
    dimensions,
    checklist: buildChecklist(dimensions),
    recommendations: buildRecommendations(dimensions, score),
  };

  return new Response(JSON.stringify(result), { status: 200, headers: JSON_HEADERS });
};

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      success: false,
      error: '本接口仅支持 POST，请提交 { "target_url": "https://..." }',
    }),
    { status: 405, headers: JSON_HEADERS }
  );
