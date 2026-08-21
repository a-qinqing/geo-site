/**
 * 全局中间件：为所有 SSR HTML 响应补充 charset 声明
 *
 * 背景：切换到 output: "server" + @astrojs/cloudflare 后，Worker 渲染的
 * 页面响应头为 "Content-Type: text/html"（缺少 charset=utf-8）。
 * 部分浏览器与国内网络环境（微信内置浏览器、部分安全浏览器、代理等）
 * 在响应头缺少 charset 时会回退到本地默认编码（如 GBK），导致中文乱码。
 * 静态预渲染页面（如博客文章）由平台按文件元数据带 charset 返回，不受影响。
 */
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();

  const contentType = response.headers.get("Content-Type") ?? "";
  const lower = contentType.toLowerCase();
  if (lower.startsWith("text/html") && !lower.includes("charset")) {
    const headers = new Headers(response.headers);
    headers.set("Content-Type", `${contentType}; charset=utf-8`);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
});
