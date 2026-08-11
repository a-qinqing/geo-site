/**
 * IndexNow 自动提交脚本
 * 在每次构建后运行，向 Bing / Yandex 等搜索引擎实时提交最新页面 URL
 *
 * IndexNow 协议文档: https://www.indexnow.org/documentation
 *
 * 运行方式: node scripts/submit-indexnow.js
 * 自动触发: npm run build (通过 postbuild 钩子)
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

// ===== IndexNow 配置 =====
const INDEXNOW_KEY = "eb72b966763543b5d383cb3f80448cbe";
const SITE_HOST = "www.geova.cn";
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_API = "https://api.indexnow.org/indexnow";

// ===== 1. 从 sitemap 中提取 URL =====
function extractUrlsFromSitemap(filePath) {
  if (!existsSync(filePath)) {
    console.warn(`[IndexNow] ⚠️  Sitemap not found: ${filePath}`);
    return [];
  }

  const xml = readFileSync(filePath, "utf-8");
  const urlRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  const urls = [];

  let match;
  while ((match = urlRegex.exec(xml)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

// ===== 2. 提交 URL 到 IndexNow =====
async function submitToIndexNow(urls) {
  if (urls.length === 0) {
    console.log("[IndexNow] ℹ️  No URLs to submit.");
    return { submitted: 0 };
  }

  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  console.log(`[IndexNow] 📤 Submitting ${urls.length} URLs to IndexNow...`);

  try {
    const response = await fetch(INDEXNOW_API, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`[IndexNow] ✅ Successfully submitted ${urls.length} URLs (HTTP ${response.status})`);
      return { submitted: urls.length, status: response.status };
    } else {
      const body = await response.text();
      console.error(`[IndexNow] ❌ API returned HTTP ${response.status}: ${body}`);
      return { submitted: 0, status: response.status, error: body };
    }
  } catch (err) {
    console.error(`[IndexNow] ❌ Network error: ${err.message}`);
    return { submitted: 0, error: err.message };
  }
}

// ===== 3. 主流程 =====
async function main() {
  console.log("[IndexNow] 🚀 Starting IndexNow submission...");
  console.log(`[IndexNow]    Host: ${SITE_HOST}`);
  console.log(`[IndexNow]    Key:  ${INDEXNOW_KEY}`);

  // 读取 sitemap（优先 sitemap-0.xml，兼容 sitemap-index.xml）
  const sitemapPaths = [
    resolve(rootDir, "dist", "sitemap-0.xml"),
    resolve(rootDir, "dist", "sitemap-index.xml"),
  ];

  let allUrls = [];
  for (const sitemapPath of sitemapPaths) {
    const urls = extractUrlsFromSitemap(sitemapPath);
    if (urls.length > 0) {
      allUrls = urls;
      console.log(`[IndexNow] 📄 Found ${urls.length} URLs in ${sitemapPath.split("/").pop()}`);
      break;
    }
  }

  if (allUrls.length === 0) {
    console.warn("[IndexNow] ⚠️  No URLs extracted from sitemaps. Skipping submission.");
    return;
  }

  // IndexNow 单次最多提交 10,000 条 URL
  if (allUrls.length > 10_000) {
    console.warn(`[IndexNow] ⚠️  ${allUrls.length} URLs exceeds 10,000 limit. Submitting first 10,000.`);
    allUrls = allUrls.slice(0, 10_000);
  }

  // 逐个展示即将提交的 URL
  console.log("[IndexNow] 📋 URLs to submit:");
  allUrls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));

  const result = await submitToIndexNow(allUrls);

  if (result.submitted > 0) {
    console.log(`[IndexNow] 🎉 Done! ${result.submitted} URLs submitted to Bing/Yandex/Seznam.`);
    console.log("[IndexNow]    Search engines will crawl these URLs soon.");
  } else {
    console.warn("[IndexNow] ⚠️  Submission failed (non-blocking). Check network or API key verification.");
    console.warn("[IndexNow]    This does not affect the site build — continuing.");
  }
}

main();
