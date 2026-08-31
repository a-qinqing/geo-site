# geova.cn 博客工作台（个人工作台）

本仓库是 geova.cn 网站的源码（Astro + Cloudflare Pages），同时承担**个人博客工作台**的职责：把知识库里的 GEO 日报加工成正式博客，经确认后发布。

## 工作台日常流程

1. **读日报**：`C:\Users\14049\Desktop\秦丽芳\github\github\知识库\知识库\GEO日报\【GEO日报】YYYY-MM-DD.md`
2. **生成草稿**：调用 `write-blog-post` skill（见下），按其中规范写 `blog-drafts/geo-daily-YYYY-MM-DD.md`
3. **等用户确认**：展示草稿，用户确认后才发布
4. **发布**：`mv blog-drafts/... src/content/blog/` → `npm run build` → git commit + push → Cloudflare Pages 自动部署

## 强制规则

- **任何博客写作 / 改写 / 草稿生成任务，必须先调用 `Skill(write-blog-post)`** 并遵循其中的规范，不得跳过。
- **发布前必须征得用户明确确认**（"确认后发布？"）。严禁把草稿、日报原文或未整理内容直接提交发布——2026-08-31 曾发生过草稿带着"待编辑确认 / 选点说明"直接上线的事故，禁止重演。
- 发布后的文章不得包含任何草稿残留：无"待编辑确认"、"选点说明"、AI 工具自白、孤立 `#标签`、断行的行内粗体。
- 时间线必须校准：日报中超过一周的旧闻只能作为背景或教训，不得冒充本周新闻。
- 发布时用英文提交信息，格式：`feat(blog): publish daily report YYYY-MM-DD`。
- **文件名 / URL 用主关键词英文命名**（kebab-case，如 `ai-overviews-auto-expand.md`），不要用日期命名（如 `geo-daily-2026-08-31`）；已发布的 URL 保持不变。
- 发布完成后清理 `blog-drafts/` 对应文件（commit: `chore(blog): cleanup draft after publish YYYY-MM-DD`）。

## 环境

- 部署：Cloudflare Pages（GitHub `a-qinqing/geo-site` 自动构建），线上域名 geova.cn
- 注意：本机存在另一个仓库副本 `C:\Users\14049\Desktop\秦丽芳\AI_Workspace\GEO咨询网站`，两处共享同一个远程仓库，push 前先 `git pull --rebase origin main` 避免冲突
