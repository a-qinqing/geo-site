---
name: write-blog-post
description: Write a high-quality GEO/SEO blog post in Markdown and publish it to the geova.cn site. Use when the user asks to create, write, or publish an article, blog post, or case study for the GEO consulting site.
---

# Write and Publish a GEO Blog Post

This skill guides writing a professional GEO/SEO article and deploying it to the geova.cn Astro site.

## Workflow

### Step 1: Understand the Requirements

Clarify the article topic, target audience, and any specific structural requirements from the user. If the topic is vague, suggest sharpening it to a specific angle (e.g., "GEO basics" → "How Schema.org drives AI search visibility").

### Step 2: Write the Article

Create the file at `src/content/blog/<slug>.md`. The slug should be kebab-case English (e.g., `geo-brand-diagnosis-guide.md`).

#### Frontmatter Template

```yaml
---
title: "文章标题"
description: "文章摘要，150字以内，用于SEO meta description和博客列表页展示"
pubDate: YYYY-MM-DD
category: "GEO 基础 | GEO 实战 | SEO | 案例研究 | 行业趋势"
tags: ["标签1", "标签2", "标签3"]
author: "GEO 咨询团队"
---
```

Field rules:
- `title`: Use Chinese, concise and compelling (max 40 Chinese characters)
- `description`: Chinese, 80-150 characters, captures the core value proposition
- `pubDate`: Today's date in YYYY-MM-DD format
- `category`: Pick one from `GEO 基础`, `GEO 实战`, `SEO`, `案例研究`, `行业趋势`
- `tags`: 3-6 relevant Chinese tags
- `author`: Default to `"GEO 咨询团队"`

#### Content Guidelines

1. **Length**: 1500-3500 Chinese characters of body text (rich, substantive, not padded)
2. **Structure**: Use H2 (`##`) for major sections, H3 (`###`) for subsections
3. **Practicality**: Every concept should include concrete examples, templates, or checklists the reader can use immediately
4. **Data**: Cite specific numbers, statistics, or test results when possible
5. **Tables**: Use markdown tables for comparisons and frameworks — AI engines parse tables well
6. **Code blocks**: When explaining technical topics (Schema, HTML, JSON-LD), include real code snippets
7. **CTA**: End every article with a call-to-action directing readers to geova.cn's free consultation

#### Internal Linking

Link to other relevant blog posts on the site using relative paths:
- `[GEO 入门指南](/blog/what-is-geo)`
- `[SEO 到 GEO 的转变](/blog/seo-to-geo-transition)`
- `[GEO 内容策略](/blog/geo-content-strategy)`

#### CTA Template (结尾模板)

```markdown
---

**📅 准备好 [与主题相关的行动号召] 了吗？**

[预约免费 15 分钟 GEO 咨询](/contact) —— 我们会在 15 分钟内帮你定位关键问题，给出初步优化方向。无需承诺，纯粹价值。

📧 邮箱：contact@geova.cn
💬 微信：q1404929834（备注"GEO 咨询"）
🌐 网站：[geova.cn](https://www.geova.cn)
```

### Step 3: Build and Verify

```bash
npm run build
```

Confirm:
- Build completes with no errors
- The new page appears in the build output (`dist/blog/<slug>/index.html`)
- Check `dist/sitemap-0.xml` includes the new URL (Astro auto-generates this)

### Step 4: Commit and Push

```bash
git add src/content/blog/<slug>.md
git commit -m "<descriptive commit message in English>"
git push
```

Use descriptive English commit messages like:
- `add GEO brand diagnosis guide blog post`
- `add article on schema structured data for AI search`

### Step 5: Confirm

Report back:
- Article title and slug
- Build status
- Commit hash
- Live URL: `https://www.geova.cn/blog/<slug>`
