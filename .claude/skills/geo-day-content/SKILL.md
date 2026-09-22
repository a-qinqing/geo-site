---
name: geo-day-content
description: GEOVA 30 天内容系统的单篇生产流程（Day 文章）。当用户说「执行 Day X」「Day X」「写 Day X」「执行今天」「继续下一篇」「重新执行 Day X」时使用：定位计划中的 Day → 输出 Pre-Writing Audit（含与旧文冲突评分）→ 按 30 天计划写作 → 产出 blog-drafts/<slug>.md 与 GEOVA_DayXX_<slug>.md 两个文件 → 跑质检 → 默认不发布（除非用户说「发布 Day X」）。
---

# GEOVA 30 天内容系统｜Day 单篇生产流程

规范来源：仓库根 `长期内容.txt`（流程）+ `GEOVA_30天内容战略与选题规划.md`（选题，含第十节语义审查）+ `.claude/skills/write-blog-post/SKILL.md`（文章硬规则与发布流程）。

## 触发词

| 用户输入 | 动作 |
| --- | --- |
| 「执行 Day X」/「Day X」/「写 Day X」 | 写作该 Day |
| 「执行今天」/「继续下一篇」 | 写作计划中**最早未完成**的 Day（进度见本文件末尾「执行进度」） |
| 「重新执行 Day X」 | 先检查是否已生成过，**避免覆盖**；除非用户明确要求重写 |
| 「发布 Day X」 | 走 write-blog-post 的发布流程（见第 5 步） |

**不得自行修改计划中已确定的 Day 选题**（标题、主关键词、意图、内链、CTA、优先级）。

## 第 0 步：读取前置资料（禁止凭记忆）

1. `GEOVA_30天内容战略与选题规划.md`：定位目标 Day 整行（标题 / 主关键词 / 次关键词 / Search Intent / 内容类型 / 为什么值得写 / 避免与哪篇重复 / 建议内链 / CTA / 优先级）+ **第十节语义审查**里该 Day 的结论与边界。
2. `GEOVA.CN_整站关键词体系_V2.2_最终执行版.xlsx`（用 `openpyxl` 读，注意 `PYTHONIOENCODING=utf-8`）：
   - 确认该 Day 的 Topic Cluster / Intent / 是否已被覆盖；
   - **词不在库内 → 标注「待 SERP 验证」，禁止编造搜索量或 KD**。
3. 站内现有文章：`https://www.geova.cn/sitemap-0.xml` 取 `/blog/` 条目；**深读与目标 Day 相关的 3–5 篇**（Title / H1 / H2 / 核心论点 / 内链 / CTA），做 Semantic Intent Check——「用户搜这个问题，能否直接从旧文得到相同答案？」能则**不得换标题重写**。
4. 站内结构：`/`、`/blog/`、`/tool`、`/services/*`、`/contact`（商业路径：问题 → 知识 → 方法论 → 工具 → Audit/服务 → 咨询）。

## 第 1 步：Pre-Writing Audit（必须先输出，再动笔）

1. **Search Intent**：用户真正想解决什么 / 处于什么阶段 / 为什么搜 / **本文不解决什么**（写清边界）
2. **Existing Content Conflict 评分**：0 无冲突 ｜ 1 部分重叠但有新价值 ｜ 2 高度重叠 ｜ 3 本质同题
   - **≥2 → 不要直接写**，先重新定位（或按第 4 步处理）
3. **Unique Value**：一句话说明比现有文章的**新增**价值（新问题/场景/方法/框架/实验/数据/平台差异/企业角色/决策路径）。
   - **说不出来 → 停止写作**，直接告诉用户，不要硬写
4. **Day 21 / 23 / 24 特别处理**（合并候选）：若只写成"Perplexity 介绍 / AI Search 基础机制 / 工具功能介绍"→ 并入旧文或 `/tool` 页面，不单独发布

## 第 2 步：写作

### 事实纪律（最高优先级）

- 禁止编造：搜索量、排名、AI 引用率、实验结果、客户案例、企业名称、转化率、提升百分比、"某官方表示"、"研究显示"。
- 第三方数据必须标来源类型（如"SEJ 实测""OpenAI 官方文档""站内既有分析，其本身引用 X"）。
- 自有实验类（GEOVA Experiment / Research）**没有真实数据只能写方法，并标注「待实测」**，不得提前给结论。
- 结论要有据；无数据时直接写「当前缺少足够数据证明该结论」。

### 结构与长度

- 正文 **1500–3000 汉字**；不套模板，结构由 Search Intent 决定。
- 骨架：`## TL;DR / 核心要点总结`（3–5 条加粗结论）→ 编号 H2 章节（**每个 H2 回答一个独立子问题**）→ `## 行动清单`（`- [ ]`，按 今天/本周/本月）→ `## 结语` → CTA 块 → 来源脚注 `*本文…*`。
- 开场 150–250 字直击问题，禁「随着…的发展」「在数字化时代」「GEO 越来越重要」。
- 散文段落 **≤150 字**（脚本会查）；行内粗体**不得跨行断裂**；不出现 `[Input]`/`TODO`/`待补` 等标记；不出现孤立 `#标签`。
- 正文**不写 H1**——站点模板 `src/pages/blog/[...slug].astro` 直接用 frontmatter `title` 渲染 H1。

### frontmatter（六字段，缺一不可）

```yaml
---
title: "中文标题，≤40 字，含核心判断"
description: "中文摘要 80–160 字"
pubDate: YYYY-MM-DD        # 写作当天
category: "实战指南"        # 枚举：行业动态 / 行业趋势 / 实战指南 / GEO 基础 / GEO 实战 / 案例研究 / 策略 / 技术
tags: ["GEO", "AI搜索", "标签3", "标签4"]   # 4 项
author: "GEO 咨询团队"
---
```

### GEO 要求

- **Direct Answer**：核心问题给出可直接摘走的答案句。
- **Entity**：品牌 / 产品 / 平台 / 概念 / 角色 / 关系写清楚，避免模糊指代。
- **Structured Information**：适当用表格、清单、步骤、条件判断；不为 GEO 硬造表格。
- **Evidence**：观点 + 依据；依据不足就明说。

### 内链

- 只用站内**真实存在**的相对路径；**不带尾斜杠**（与站内既有 100+ 处一致：`/blog/xxx`、`/tool`、`/contact`）。
- 三层齐备：上游（概念/方法论）＋平级（相关问题）＋下游商业页（`/tool`、`/services/*`、`/contact`）。
- 每一个内链都要能回答「用户为什么**现在**需要点它」；锚文本自然，禁"点击这里"。

### CTA（按 Search Intent 与用户阶段动态选择，**不强制 `/contact`**）

CTA 的目标必须与文章意图匹配；**不要为了模板统一而强行添加商业链接**。

| 文章类型 | 优先导向 |
| --- | --- |
| Informational / 问题型 | 相关工具（`/tool`）、相关旧文、GEO Audit（`/services/geo-audit`） |
| Diagnosis / 诊断型 | GEO Tool（`/tool`）→ GEO Audit（`/services/geo-audit`） |
| Commercial / 明确商业意图 | 对应 GEO 服务（`/services/geo-optimization`）或 `/contact` |
| GEO 外包 / 预算 / 验收等明确采购意图 | 直接导向 `/services/` 或 `/contact` |
| Research / Experiment | 相关研究、方法论、工具（`/tool`、方法类 Pillar），**不强制** `/contact` |

站点已验证可行的路径：**免费工具 → GEO 审计 → GEO 优化服务**（W1–W5 即此路径且不含 `/contact`，**已确认为正确做法，不要回改**）。

CTA 块仍用 `## 📩 需要帮助？GEO 咨询团队可以为你做什么` 结构；导语按意图改写；**禁用**退役版"预约免费 15 分钟 + 微信"。

## 第 3 步：产出两个文件

1. `blog-drafts/<slug>.md` —— **发布用 canonical**（含完整 frontmatter；slug = 主关键词英文 kebab-case，**非日期**）
2. `GEOVA_DayXX_<slug>.md` —— **执行包**：Pre-Writing Audit + Article Metadata（Title / Meta / H1 / 主次关键词 / Intent / 类型 / 优先级 / Cluster / 目标 URL）+ 正文（与 canonical 逐字一致）+ 内链表（含"为什么现在点它"）+ CTA + Sources/References + SEO Checklist + GEO Checklist + A–G 质检 + 执行报告（模板见 `长期内容.txt` §十五）

## 第 4 步：质检（命令固定）

```bash
PYTHONIOENCODING=utf-8 python scripts/_w1_linkcheck.py blog-drafts/<slug>.md
```

必须满足：`BROKEN LINKS: none`、`over 150 chars: none`、`percent assertions: none`、title ≤40 字、desc 80–160 字、tags 4 项、category 合法、TLDR/行动清单/结语/来源脚注齐备、**CTA 块存在且目标链接与 Search Intent 匹配**（脚本会列出 CTA 指向的链接供人工判断，不强制 `/contact`）、slug 非日期、无尾斜杠内链、无草稿残留、无跨行粗体。

再人工过一遍 **A–G**：Intent / Cannibalization（是否只是换标题、是否复用旧文结构）/ SEO / GEO / E-E-A-T（是否把第三方说成自有、是否有虚构）/ Commercial（CTA 是否匹配意图）/ Internal Links（页面真实存在）。

## 第 5 步：默认不发布；发布时才动线上

默认**只生成文件**——不改线上文章、不改代码/CMS、不提交 sitemap、不 push。

只有用户说「**发布 Day X**」才执行（详见 `.claude/skills/write-blog-post/SKILL.md`）：

```bash
mv blog-drafts/<slug>.md src/content/blog/<slug>.md
npx astro build          # ⚠️ 本地验证用 npx，不要用 npm run build —— 后者 postbuild 会立刻向 IndexNow 外发尚未上线的 URL
# 核对 dist/blog/<slug>/index.html 存在、dist/sitemap-0.xml 含新 URL、Title/H1/Schema 渲染正确
git add src/content/blog/<slug>.md
git commit -m "feat(blog): publish <slug> (Day X)"
git push origin main
# 轮询 https://www.geova.cn/blog/<slug>/ 直至 200，再复验 标题/H2 数/Schema/内链可达
```

注意：Astro **忽略以 `_` 开头的文件**——试构建不要用 `_tmp_*.md`（会被静默跳过）。

## 硬边界（违反即为事故）

1. 草稿残留（"草稿 / 待编辑确认 / 选点说明 / 日报改写 / 我可以把"）绝不允许出现在任何产出文件里。
2. 独立价值 > Search Intent > 专业可信度 > SEO > 发布数量。**宁可砍掉，不要凑数**——写不出独有答案就停下来告诉用户。
3. 不自行修改已确定的 Day 选题；不含未经核实的数据。

## 执行进度（每次发布后更新此表）

| Day | 标题 | 状态 | 线上 / commit |
| --- | --- | --- | --- |
| 1 | AI 说错了你的品牌信息：先分清四类错误，再按顺序修事实源 | ✅ 已发布 | https://www.geova.cn/blog/ai-brand-info-error/ ｜ `4edcaa0` |
| 2 | AI 可见度对标：把 5 个竞品放进同一份提问集 | ⏳ 待执行 | — |

> 「执行今天」= 上表第一个 ⏳ 的 Day。

**CTA 口径（2026-09-22 定为按 Intent 动态选择，不强制 `/contact`）**：Day 1 的 CTA 为「免费工具 `/tool` → 品牌事实源诊断 → `/contact`」，属**已发布的版本，不回改**；若后续判定需要统一口径，再单独决定。
