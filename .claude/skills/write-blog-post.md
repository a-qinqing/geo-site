---
name: write-blog-post
description: Write a high-quality GEO/SEO blog post in Markdown for the geova.cn site. Use when the user asks to create, write, publish, or rewrite an article, blog post, or case study — including converting a GEO daily report (GEO日报) into a blog post, or when generating a blog draft (博客草稿). Covers the full workflow: draft → user confirmation → build → commit → deploy.
---

# Write and Publish a GEO Blog Post

This skill guides writing a professional GEO/SEO article and deploying it to the geova.cn Astro site. It covers two modes:

- **Mode A: Write from scratch** — a standalone article on a chosen topic.
- **Mode B: Rewrite from GEO daily report** — converting `GEO日报/【GEO日报】YYYY-MM-DD.md` into a publishable blog post (the standard workflow of the 个人工作台).

## Hard rules (all modes — these exist because a raw daily-report draft was once published live)

1. **NEVER leave draft residue in the published file.** The following must never appear: "草稿", "待编辑确认", "由今日 GEO 日报改写", "选点说明", "知识库/博客草稿", tool self-talk ("如果需要，我可以…"), stray tags like a lone `#GEO`, or half-rendered markdown emphasis (e.g. `**动态且间歇**的` split across lines — keep bold phrases inline, never broken by line breaks).
2. **Write to `blog-drafts/` first, then WAIT for user confirmation** (e.g. "草稿已生成，确认后发布？"). Do NOT commit/push/deploy before the user says yes. Publishing without confirmation is the exact incident this rule prevents.
3. **Frontmatter is mandatory and complete** — see template below. No missing fields, no placeholder text.
4. **Fix the timeline.** Daily reports mix this week's news with older events (e.g. Reddit 引用暴跌 -86% happened 8/14 — it is context, not news, for an 8/31 post). Events older than ~1 week must be repositioned as background/教训, never presented as "过去一周" news. Verify every event's date against the report before writing.
5. **Use the site's current CTA block** (see CTA template) — not older variants.
6. **Category must be one the site actually uses**: `行业动态` / `行业趋势` (default for daily-report posts), `实战指南`, `GEO 基础`, `GEO 实战`, `案例研究`, `策略`, `技术` — pick the closest match.

## Workflow (Mode B — daily report → blog post; Mode A follows the same steps from Step 2)

### Step 1: Read the daily report

Locate `C:\Users\14049\Desktop\秦丽芳\github\github\知识库\知识库\GEO日报\【GEO日报】YYYY-MM-DD.md` for the target date. Read it fully. The report's structure: 今日核心洞察 → 模块一（算法异动，每条含"核心变动大白话 / 情报来源 / 我的判断 / 行动建议"）→ 模块二（行业宏观）→ 模块三（One-Liner 表）.

Pick the 2–4 items with the highest reader value (biggest impact on reader decisions). Older-than-a-week events in the report become background/教训, not headlines.

### Step 2: Write the draft to `blog-drafts/`

Create `blog-drafts/geo-daily-YYYY-MM-DD.md` (or `<slug>.md` for Mode A). Slug: kebab-case (e.g. `geo-daily-2026-08-31.md`).

#### Frontmatter Template

```yaml
---
title: "中文标题，40 字以内，含核心判断"
description: "中文摘要 80–150 字，SEO meta description + 列表页展示"
pubDate: YYYY-MM-DD
category: "行业动态"
tags: ["GEO", "AI搜索", "标签3", "标签4"]
author: "GEO 咨询团队"
---
```

#### Structure (all modes)

```
## TL;DR / 核心要点总结     ← 3–5 条加粗要点，先给结论
---
## 一、…（编号章节，每个事件一章）
（正文：发生了什么 → 关键数据/表格 → 对企业的翻译/应对思路）
---
## 四、行动清单             ← checkbox 形式，按 今天/本周/本月 分组
---
## 结语
---
## 📩 需要帮助？GEO 咨询团队可以为你做什么   ← 站内服务列表
[联系我们，获取免费的 GEO 初步诊断 →](/contact)
---
*本文基于 … 公开报道与行业追踪数据整理…*
```

Content guidelines:
- **Length**: 1500–3000 汉字正文，有干货不注水
- **Data**: 引用日报中的具体数字、表格（markdown 表格，AI 引擎解析好）；数据附情报来源口径（如"Promptwatch 数据""官方报告"），不编造来源
- **每章结构**: 事件 → 关键数据/对比表 → `> 对企业的翻译` 引用块（实战含义）→ 行动建议
- **Internal links**: 用相对路径链到站内相关博客（`[…](/blog/geo-2026-08-w4-search-to-delivery)`）
- **Draft file gets NO frontmatter residue**: the draft is a full article already — same content quality as final, only living in `blog-drafts/`

### Step 3: Show the draft and WAIT for confirmation

Present the draft (title, structure, key points) and ask: 确认后发布？Do not proceed to Step 4 until the user confirms. If the user requests changes, revise the draft first.

### Step 4: Publish on confirmation

```bash
# move draft to content
mv blog-drafts/<slug>.md src/content/blog/<slug>.md
npm run build
```

Confirm:
- Build completes with no errors
- New page appears in `dist/blog/<slug>/index.html`
- `dist/sitemap-0.xml` includes the new URL

### Step 5: Commit, push, and report

```bash
git add src/content/blog/<slug>.md
git commit -m "feat(blog): publish daily report YYYY-MM-DD"
git push origin main
```

Report back: article title and slug, build status, commit hash, live URL `https://www.geova.cn/blog/<slug>`.

---

## CTA Template (current site version — use exactly this)

```markdown
## 📩 需要帮助？GEO 咨询团队可以为你做什么

面对本周的变化，我们为 B2B 与专业技术品牌提供：

- **服务项一**：一句话说明
- **服务项二**：一句话说明
- **服务项三**：一句话说明

[联系我们，获取免费的 GEO 初步诊断 →](/contact)
```

(Do NOT use the older "预约免费 15 分钟 GEO 咨询 + 微信" variant — it has been retired on the site.)

---

## Publish-time checklist (run before every push)

- [ ] No draft residue (hard rule 1) — grep for: 待编辑确认 / 选点说明 / 日报改写 / 我可以把
- [ ] Frontmatter complete and valid (title / description / pubDate=today / category / tags / author)
- [ ] pubDate matches the file date; timeline events dated correctly; no old news sold as this-week news
- [ ] TL;DR present, numbered sections, action checklist, 结语, CTA block, source footnote
- [ ] No broken inline markdown (bold phrases not split across lines)
- [ ] Build passes; URL in sitemap
- [ ] User confirmed the draft before this publish
