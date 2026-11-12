import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.geova.cn/",
  output: "server",
  adapter: cloudflare(),
  // 强制统一尾斜杠：不加尾斜杠的地址会被 301 到带斜杠版本。
  // 不设此项时 Astro 默认 "ignore"，/about 与 /about/ 会各自返回 200 且各自声明
  // canonical，导致 GSC 报「重复网页，Google 选择的规范网页与用户指定的不同」。
  trailingSlash: "always",
  redirects: {
    "/sitemap.xml": "/sitemap-index.xml",
  },
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/draft/"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
