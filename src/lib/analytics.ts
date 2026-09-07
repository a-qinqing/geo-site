/**
 * 站点统一 analytics 轻量助手（第三阶段第二批：GA4 + GTM + dataLayer 漏斗埋点）
 *
 * 架构：GTM 容器（GTM-KLSDF65Z）在 src/layouts/Layout.astro 中统一初始化，
 * 页面只负责向 dataLayer 推送标准事件（event 名 = GA4 事件名，snake_case），
 * GTM 控制台内的 Trigger / Tag 映射不在代码仓库内，无法在此验证。
 *
 * 本文件是所有页面推送事件的唯一入口：
 *  - 不初始化 GA4 / 不加载 gtag（禁止重复初始化 GTM）
 *  - 仅同步 push，不等待 GTM/GA4 响应 → 绝不阻塞用户导航
 *  - 事件参数禁止包含 PII（姓名 / 邮箱 / 电话 / 留言原文 / URL 敏感参数等）
 */
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(eventName: string, params?: Record<string, unknown>): void {
  // GTM 容器代码在 <head> 中已创建 dataLayer；此兜底仅为防御性初始化，非重复加载 GTM
  const dataLayer = window.dataLayer || (window.dataLayer = []);
  dataLayer.push({ event: eventName, ...params });
}

/**
 * 埋点专用 URL 清洗：只保留 origin + pathname。
 * 丢弃 query / hash，避免扫描目标 URL 携带的敏感参数进入 GA4。
 * 解析失败返回空字符串（调用方应据此省略 source_url 参数）。
 */
export function safePageUrl(raw: string): string {
  try {
    const u = new URL(String(raw));
    return `${u.origin}${u.pathname}`;
  } catch {
    return "";
  }
}
