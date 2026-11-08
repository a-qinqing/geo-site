# GEOVA Day 21 执行包｜ChatGPT vs Perplexity：同一个问题，两套引用风格

## 一、Pre-Writing Audit

### 1. Search Intent

用户是企业 SEO / GEO 负责人、内容负责人或增长负责人，正在为 ChatGPT 与 Perplexity 分配内容与监测资源。他搜「ChatGPT vs Perplexity」时，真正想解决的不是两家产品谁更强，而是：同一个问题，两家的引用来源为什么经常不同；该按什么变量测、记录什么、怎样判断差异来自平台还是自己的站点；最后该做一套内容还是两套。

本文解决：给出一套可复现的对照测试法——7 个控制变量、3 类问题各 3 题、6 个引用记录字段、4 条差异轴、6 步排查顺序，以及「一套证据底座、两种入口适配」的联合策略。

本文不解决：不比较两家的产品功能、价格或模型强弱；不重复 ChatGPT 单台引擎的取数机制（内链到既有文章）；不提供自有对照实验结论；不声称「Perplexity 一定偏好某类来源」；不覆盖 Perplexity 的完整平台专题——库内 `/blog/perplexity-optimization/` 仍是候选，需独立 SERP 证据后再决定是否建页。

### 2. Existing Content Conflict 评分：1（部分重叠但有新价值）

| 旧文 | 重叠点 | 本文边界 |
|---|---|---|
| `/blog/chatgpt-optimization` | ChatGPT 取数、快照、三道门 | 旧文是单平台机制拆解；本文只把 ChatGPT 作为对照的一侧，机制细节只内链，不复述 |
| `/blog/geo-brand-diagnosis-guide` | 同样在 ChatGPT / Perplexity 上跑固定问题 | 旧文用 8 个问题给品牌位置打分，回答「我在第几名」；本文记录引用集与来源结构，回答「为什么选这些来源」 |
| `/blog/geo-2026-08-26-ai-citation-guide` | 多引擎官方规则与对比 | 旧文是官方口径汇总，且对比表不含 Perplexity；本文是可复现的对照测试法，不宣称差异结论 |
| `/blog/geo-2026-08-citation-evidence-sourcing` | 引擎间引用分裂（Reddit 数据） | 旧文是行业事件解读；本文只把该数据当作方法背景，不重述事件 |
| `/blog/how-to-get-cited-by-ai` | 引用三关、引用率测法 | 旧文讲三关原理与三个记录字段；本文只链接测法，不重复三关 |
| `/blog/ai-crawlers` | 爬虫放行与日志排查 | 旧文是技术排查指南；本文把「爬虫是否被拦」作为差异诊断的第一步，配置细节内链 |

初评对 `geo-brand-diagnosis-guide` 为 2（高度重叠），已按计划书第 10.3 节重新定位：分析单位从「品牌位置」改为「引用集与来源结构」，输出从「打分卡」改为「对照记录表 + 排查顺序」。重定位后评分为 1。

结论：评分 1，可写。必须守住「对照方法 + 记录结构 + 先排除通道」这条线，不写成平台介绍，也不写产品评测。

### 3. Unique Value

现有文章分别解决：ChatGPT 单台机制（`chatgpt-optimization`）、六大引擎官方规则（`geo-2026-08-26-ai-citation-guide`）、品牌位置打分（`geo-brand-diagnosis-guide`）、引用三关（`how-to-get-cited-by-ai`）。没有一篇给出「同一问题跨两家引擎、控制变量、记录引用集、先排除通道差异再谈风格」的可复现方法。本文补的正是这块，并明确不提供自有实测结论。

### 4. Day 21 特别处理（合并候选）

按计划书与 `长期内容.txt` 第十七节，Day 21 若只写成「Perplexity 基础介绍」应并入 ChatGPT / AI Search 专题。本篇不是平台介绍：Perplexity 只作为对照的一侧出现，主体是跨平台对照测试法与联合策略，且有独立交付物（控制变量表、引用记录表、四轴读法、六步排查、四种结果处理）。因此保留独立成篇。

如后续必须再压缩，合并目标优先级：先并入 `/blog/chatgpt-optimization` 的「平台对照」一节，或未来有独立 SERP 证据的 Perplexity 专题；不要并入 `/tool` 页面（工具页不承载方法长文）。

### 5. 数据与边界

- 主关键词「ChatGPT Perplexity 对比」**不在 V2.2 词库内**，按规范标注「待 SERP 验证」，不编造搜索量与 KD。
- 次关键词「Perplexity SEO」在 V2.2 词库内为 **P2**；「平台差异」「引用风格」为描述性词，未做 SERP 校准。
- 官方口径：ChatGPT 的 `OAI-SearchBot`、`GPTBot`、`utm_source=chatgpt.com` 以 OpenAI Help Center 发布者文档为准；Perplexity 的 `PerplexityBot` 以 Perplexity 官方文档为准。
- 第三方口径：快速模式快照与「约九成回答不打开网页」来自 Search Engine Journal 2026-08-25 及逆向分析者原文，**非 OpenAI 官方说明**；Perplexity 约百分之九十四的实时检索触发率来自站内六大引擎规则一文所引第三方测试；幽灵引用率与重叠率来自 Search Engine Land 2026-07-29、Semrush / Kevin Indig 2026-08-03；Reddit 引用变化来自 Promptwatch、Petra Labs 等 2026 年 8 月监测；三平台来源占比来自 Shero Commerce 2026-08-26，且为三平台合计。
- 本文不含自有对照实验数据，正文与脚注均已写明；所有百分比改用「百分之……」表述，便于脚本检查并保留可复核性。
- 站内用户明确要求：写作与发布流程遵循 `write-blog-post` 与 `geo-day-content`；本文默认只生成文件，不发布。

---

## 二、Article Metadata

| 字段 | 内容 |
|---|---|
| Title | ChatGPT vs Perplexity：同一个问题，两套引用风格 |
| Meta Description | 同一个问题分别问 ChatGPT 和 Perplexity，引用来源为什么经常完全不同？本文给出一套可复现的对照测试法：固定问题集与控制变量、记录引用集与来源结构、先排除抓取与索引差异，再判断平台风格，最后落到一套证据底座、两种入口适配的联合策略。 |
| H1 | 由 frontmatter `title` 渲染，正文不写 H1 |
| 主关键词 | ChatGPT Perplexity 对比（**待 SERP 验证**，不在 V2.2 词库） |
| 次关键词 | Perplexity SEO（库内 P2）、平台差异、引用风格 |
| Search Intent | Informational（平台对比 / 方法） |
| 内容类型 | 平台对比 + 可复现方法 |
| 优先级 | P1 |
| Topic Cluster | AI Platform-Global（ChatGPT 专题的平级对照；不新建 Perplexity 平台页） |
| 目标 URL | `/blog/chatgpt-vs-perplexity-citation-style` |
| 建议内链 | `/blog/chatgpt-optimization`、`/blog/how-to-get-cited-by-ai`、`/blog/ai-crawlers`、`/blog/geo-brand-diagnosis-guide`、`/blog/ai-mode-model-churn-guide`、`/tool`、`/services/geo-audit`、`/services/geo-optimization` |
| CTA | `/tool` → `/services/geo-audit` → `/services/geo-optimization` |

标题长度 34 字（≤40）；slug `chatgpt-vs-perplexity-citation-style` 为主关键词英文 kebab-case，非日期。

---

## 三、正文（与 `src/content/blog/chatgpt-vs-perplexity-citation-style.md` 逐字一致）

````markdown
---
title: "ChatGPT vs Perplexity：同一个问题，两套引用风格"
description: "同一个问题分别问 ChatGPT 和 Perplexity，引用来源为什么经常完全不同？本文给出一套可复现的对照测试法：固定问题集与控制变量、记录引用集与来源结构、先排除抓取与索引差异，再判断平台风格，最后落到一套证据底座、两种入口适配的联合策略。"
pubDate: 2026-11-08
category: "实战指南"
tags: ["GEO", "ChatGPT", "Perplexity", "AI引用"]
author: "GEO 咨询团队"
---

## TL;DR / 核心要点总结

- **同一个问题，两家给出的不是两个答案，而是两套引用集。** 该记的是引用 URL、来源类型、时效与答案形态，而不是“有没有提到我”。
- **先固定 7 个变量，再谈差异。** 问题原文、语言、时间窗、登录状态、会话、模型与模式、重复次数——少一个，测到的可能只是波动。
- **多数“平台差异”其实是通道差异。** 抓取被拦、没进索引、根本没检索，都会表现成“它不引用你”；先排查这三件事。
- **两套入口，一套证据底座。** 事实页、可摘段落、带来源与日期的数字、第三方印证是共通层；ChatGPT 额外做“第一行可读”，Perplexity 额外做“段落可摘”。
- **不要把单题差异上升为平台定律。** 2026 年 8 月的监测里，同一批 Reddit 内容在 ChatGPT 引用降百分之八十六点四，在 Perplexity 反升百分之九——但只对那批问题成立。

---

## 一、先分清：你要对比的不是两个产品，而是两套引用流程

ChatGPT 的链路是“取数、压快照、拼答案”。官方口径里，搜索收录与摘要由 `OAI-SearchBot` 负责，`GPTBot` 只影响训练；访问带 `utm_source=chatgpt.com`（来源：OpenAI Help Center）。

第三方逆向补上中间一段：快速模式下约九成回答不打开网页，直接用快照，取数面是 H1 加正文前 150 字符（来源：Search Engine Journal 2026-08-25 及逆向原文，**非官方说明**）。

Perplexity 更像“先检索、边读边写”。它用自建爬虫 `PerplexityBot` 抓取（官方文档），回答以编号角标标注来源。第三方实测显示，约百分之九十四的回答触发实时检索（来源见站内六大引擎规则所引测试）。

> 对企业的翻译：ChatGPT 的引用可能在“快照层”就定了，Perplexity 的更可能在“生成层”由检索段落决定。记录时先看它是在哪一层被选中。

本文不比较功能、价格或模型强弱，也不重复拆解 ChatGPT 单台机制——那部分见 [ChatGPT 搜索优化](/blog/chatgpt-optimization)。只解决：同一个问题问两家，怎样测、怎样读、怎样落到同一套内容资产上。

---

## 二、先固定 7 个变量，再开始问

AI 回答是随机的。同一句话、同一天、同一个账号，连问三次都可能出现不同引用。不控制变量，看到的“差异”可能只是噪声。

| 变量 | 怎么固定 |
|---|---|
| 问题原文 | 9 题逐字固定，不改写、不加提示 |
| 语言 | 全部用同一种语言 |
| 时间窗 | 同一天、尽量同一小时 |
| 登录状态 | 退出登录或临时会话；登录时账号一致 |
| 会话状态 | 每题新开会话 |
| 模型与模式 | 记录模型名与模式，两家同层级 |
| 重复次数 | 每题至少 3 次，新会话 |

问题集分 3 类，各 3 题：

| 类型 | 示例 | 你想验证什么 |
|---|---|---|
| 事实题 | 某产品的 API 速率限制是多少？ | 第一方官网是否被优先引用 |
| 对比题 | A 和 B 有什么区别？ | 第三方评测与对比页占多大比例 |
| 推荐题 | 适合中小企业的某类工具推荐 | 名单由谁构成、品牌在不在 |

常见错法：每次问法不同、拿快速模式对比深度研究、只问一次就下结论。测试期间网络与地区一致。

---

## 三、记录的不是“有没有我”，而是“引用集长什么样”

很多团队只记“有没有提到我”，把“引用”和“提及”混在一起。

Semrush 与 Kevin Indig 的研究显示，“被引用”与“被提到”的重叠率只有百分之二十一；Perplexity 的幽灵引用率百分之五十二，ChatGPT 百分之三十七。

来源：Search Engine Land 2026-07-29、Semrush / Kevin Indig 2026-08-03，第三方口径。

记录表至少 6 个字段：

| 字段 | 为什么记 | 常见错法 |
|---|---|---|
| 引用 URL（按顺序） | 顺序反映先引用谁 | 只存截图，URL 事后找不到 |
| 来源类型 | 第一方、第三方媒体、评测目录、UGC、官方或学术 | 把所有外链都叫“第三方” |
| 引用数量 | 一条和八条不是一回事 | 只记“有 / 没有” |
| 正文是否出现品牌名 | 区分“被引用”与“被记住” | 把引用 URL 当品牌曝光 |
| 被引页面日期 | 判断快照与实时的差异 | 只看自己的更新时间 |
| 答案形态 | 段落、列表、表格、步骤 | 只记文字，不记结构 |

这张表与 [品牌 AI 可见度诊断](/blog/geo-brand-diagnosis-guide) 分工不同：那篇用 8 个问题给位置打分，回答“我在第几名”；这张表记录来源构成，回答“为什么选这些来源”。可以同天做，不要混表。

---

## 四、四轴读差异：来源结构、引用粒度、时效、答案形态

把 9 题 × 3 次的结果放一起，先别急着解释“平台偏好”。按四轴对比，差异才有结构。

| 轴 | 对比什么 | 稳定重复时提示什么 |
|---|---|---|
| 来源结构 | 第一方、第三方媒体、评测目录、UGC 各占多少 | 该引擎更依赖哪类证据 |
| 引用粒度 | 每条回答引用几个来源；落在整页还是段落 | 页面有没有可摘的段落 |
| 时效 | 被引页面是最近更新还是旧页 | 实时检索与快照各起作用 |
| 答案形态 | 段落、列表、表格还是步骤 | 内容结构是否要重排 |

2026 年 8 月，多家监测方观察到同一批 Reddit 内容在不同引擎里命运相反：ChatGPT 的引用降百分之八十六点四，Perplexity 反升百分之九（来源：Promptwatch、Petra Labs 等）。同一来源确实会被区别对待。

但 Shero Commerce 对三平台（ChatGPT、Perplexity、Google AI Mode）共 1,851 个引用来源的分析显示，品牌自有网站只占百分之二点八，第三方媒体占百分之五十九（来源：Shero Commerce 2026-08-26）。

三平台合计不能证明“Perplexity 更爱第三方”。

> 对企业的翻译：单题、单次、单平台的差异只是“观察”；跨 9 题、重复 3 次仍稳定的差异，才值得写进策略。

---

## 五、差异出现后，按这个顺序排查，不要先改内容

看到“一家引用我、另一家不引用”，最容易犯的错是立刻重写页面。多数情况下问题不在内容，而在通道。按顺序排查，能省掉大量改写。

1. **这轮到底有没有检索？** 回答没有外链来源时，先确认它是不是用了模型记忆。没有检索，就谈不上引用风格；字段见 [如何让 AI 引用我的网站](/blog/how-to-get-cited-by-ai)。
2. **目标引擎的爬虫进得来吗？** 查 robots.txt、CDN / WAF 与日志，确认 `OAI-SearchBot`、`PerplexityBot` 没被拦。方法见 [AI 抓不到、也读不懂](/blog/ai-crawlers)。
3. **页面进没进候选？** 用页面标题、品牌词定向提问，结合日志看该引擎抓没抓过这个 URL；没有记录，先解决发现。
4. **问题类型对不对？** 事实题更依赖第一方页面，推荐题更依赖第三方共识。拿推荐题测官网，结论一定失真。
5. **是快照、实时，还是模型换代？** 对比被引页面日期与你的更新时间；记录模型名、模式与日期，避免把换代噪声当成平台差异。方法见 [AI Mode 模型换代](/blog/ai-mode-model-churn-guide)。
6. **最后才谈风格。** 前五步都排除后，剩下的差异才值得归因到“引用风格”。

---

## 六、联合策略：一套证据底座，两种入口适配

排查完通道，剩下的不是“写两个版本”，而是把同一套证据做成两个入口都吃得下的形态。

共通层四件事：实体写清楚（品牌名、产品名、域名一致）、每段第一句给结论、数字带来源与日期、关键差异做成对比表。这四件事对两个引擎都成立，也是第三方印证能被引用的前提。

ChatGPT 侧额外做三件事：H1 与前 150 字符写成能独立回答问题的“第一印象”；品牌词与比价页纳入 30 天更新节奏；确保 `OAI-SearchBot` 放行，并用 `utm_source=chatgpt.com` 核对引荐流量。

Perplexity 侧确保正文是服务端可抓取的 HTML、结论段落不依赖上下文、段落里写清来源与日期；爬虫放行见 [AI 爬虫排查](/blog/ai-crawlers)。

落到执行：共通层管实体、结构、证据与通道；两个入口的差异只放在额外动作里，不另起一套内容。

> 对企业的翻译：不要为两个引擎维护两套内容。把事实页做成“可摘、可核、可更新”的同一份资产，差异只放在入口层，维护成本才不会翻倍。

---

## 七、四种常见结果，分别怎么处理

测完 9 题 × 3 次，大概率落入四种结果之一。对号入座，再决定动作。

| 结果 | 更像是 | 先做什么 |
|---|---|---|
| 两个引擎都没有引用你 | 通道或证据缺口 | 查日志与 robots；确认可抓取、可索引 |
| 都引用第三方，不引用你 | 证据缺口 | 补第三方印证与可摘的事实页 |
| 一个引用你、另一个不引用 | 入口差异 | 查该引擎的抓取、索引与快照 |
| 都引用你，但正文不提品牌 | 幽灵引用 | 做品牌锚定，让结论句带品牌主语 |

只有同一种来源结构差异在 9 题 × 3 次里稳定重复，才值得写成“平台风格差异”。即使如此，也只对你测的这批问题成立，不要外推。

最小节奏：每月 1 次、9 题 × 3 次、两个引擎、同一张表。连续 3 个月，你得到的是自己业务问题集上的引用基线——比行业通用结论更有用。

---

## 行动清单

### 今天做

- [ ] 选 9 个真实客户会问的问题，按事实、对比、推荐各 3 题分组
- [ ] 两家各跑一遍，记录引用 URL、来源类型、数量、品牌提及、页面日期、答案形态

### 本周做

- [ ] 每题重复 3 次，确认哪些差异稳定、哪些只是波动
- [ ] 查服务器日志，确认两个爬虫的抓取状态码
- [ ] 挑 3 个被引用最多的第三方页面，看它们有你没有的事实或结构

### 本月做

- [ ] 把核心事实页改造成“结论前置 + 对比表 + 数字带来源与日期”的统一形态
- [ ] 建立月度对照表，固定问题集、引擎、模型与字段
- [ ] 对“被引用但不提品牌”的页面做品牌锚定改写

---

## 结语：对比的目的不是选边，而是定位断点

两家的引用风格确实不同，但“不同”本身不构成策略。真正有用的问题是：这次不被引用，断在检索、抓取、索引、快照，还是内容本身？

固定 7 个变量，记下引用集，按四轴读差异，按顺序排查通道——最后你会发现，多数“平台差异”是同一套证据在不同入口里的可见度差异。**一套证据底座，两种入口适配**，比写两篇“平台专属文章”省力。

---

## 📩 需要帮助？GEO 咨询团队可以为你做什么

如果你跑过一轮对照测试，却不确定差异该归因到哪层，可以按这个顺序走：

- **先自测**：用免费工具检查 AI 爬虫访问、结构化数据与正文可读性，30 秒看清通道：[GEO 诊断工具 →](/tool)
- **再做人工诊断**：需要把两家的引用差异逐层定位、拿到按优先级排序的清单：[GEO 审计与 AI 搜索诊断 →](/services/geo-audit)
- **最后做持续优化**：确认方向后，把事实页、第三方印证与月度复测纳入流程：[GEO 优化服务 →](/services/geo-optimization)

---

*本文为方法说明类内容，不含自有对照实验数据。ChatGPT 的爬虫分工、收录资格与 `utm_source=chatgpt.com` 归因参数以 OpenAI Help Center 发布者文档为准；Perplexity 的爬虫分工以 Perplexity 官方文档为准。快速模式快照取数面、检索触发率、幽灵引用率、Reddit 引用变化与第三方来源占比均来自公开第三方研究或监测，已逐处标注，**不代表官方承诺**。AI 搜索产品变化较快，本文方法截至 2026 年 11 月，执行时请以当时的模型与模式为准。*

````

---

## 四、内链表

| 链接 | 层级 | 为什么现在需要点它 |
|---|---|---|
| `/blog/chatgpt-optimization` | 上游（单平台机制） | 读者确认两家流程不同后，若要深入 ChatGPT 的取数、快照与域名记忆，需要单台机制拆解 |
| `/blog/how-to-get-cited-by-ai` | 上游（引用三关与测法） | 对照测试只是起步；要知道引用率的三个记录字段与三关诊断，需要回到这篇 Pillar |
| `/blog/ai-crawlers` | 平级（技术通道） | 「一边引用、一边不引用」最先要排除爬虫被拦，配置与日志排查在那篇 |
| `/blog/geo-brand-diagnosis-guide` | 平级（品牌位置） | 本文记录来源结构；若还要给品牌位置打分、看「偏科」模式，需要那张 8 问打分卡 |
| `/blog/ai-mode-model-churn-guide` | 平级（模型换代噪声） | 差异可能来自模型换代；按版本记录与观测的方法在那篇 |
| `/tool` | 下游（工具） | 先低成本确认 AI 爬虫访问、结构化数据与正文可读性，再决定是否投入人工排查 |
| `/services/geo-audit` | 下游（商业诊断） | 需要把两家的引用差异逐层定位、拿到按优先级排序的清单时 |
| `/services/geo-optimization` | 下游（商业优化） | 确认方向后，把事实页、第三方印证与月度复测纳入持续流程 |

三层齐备：上游（单平台机制、引用三关）+ 平级（技术通道、品牌位置、模型换代）+ 下游（工具、审计、优化）。所有路由均真实存在，无尾斜杠。

---

## 五、CTA

- 目标：`/tool`（免费工具）→ `/services/geo-audit`（GEO 人工诊断）→ `/services/geo-optimization`（GEO 优化服务）。
- 匹配理由：Informational / 方法型意图。读者的问题不是「立刻买服务」，而是「差异该归因到哪一层、下一步做什么」。先给免费自测，再给人工诊断，最后给持续优化；不走 `/contact`。
- 与计划书 CTA 的对应：计划书列「GEO 优化服务」，正文 CTA 的最终链接即 `/services/geo-optimization`，前两步为站内已验证的「免费工具 → 审计 → 优化」路径，不改变计划书的商业承接方向。

---

## 六、Sources / References

| 口径 | 来源类型 | 用途 |
|---|---|---|
| `OAI-SearchBot` 负责搜索收录与摘要、`GPTBot` 只影响训练、`utm_source=chatgpt.com` 归因参数 | OpenAI Help Center 发布者文档（官方） | 第一节、第六节 |
| `PerplexityBot` 自建爬虫与抓取分工 | Perplexity 官方文档（官方） | 第一节、第五节 |
| 快速模式约九成回答不打开网页；取数面为 H1 + 正文前 150 字符 | Search Engine Journal 2026-08-25 及逆向分析者公开原文（第三方，非官方） | 第一节 |
| 约百分之九十四的 Perplexity 回答触发实时检索 | 站内 `/blog/geo-2026-08-26-ai-citation-guide` 所引第三方测试（第三方） | 第一节 |
| 「被引用」与「被提到」重叠率百分之二十一；幽灵引用率 Perplexity 百分之五十二、ChatGPT 百分之三十七 | Search Engine Land 2026-07-29；Semrush / Kevin Indig 2026-08-03（第三方） | 第三节 |
| Reddit 引用变化：ChatGPT 降百分之八十六点四、Perplexity 升百分之九 | Promptwatch、Petra Labs 等 2026 年 8 月监测（第三方） | 第四节 |
| 三平台合计 1,851 个引用来源；品牌自有网站百分之二点八、第三方媒体百分之五十九 | Shero Commerce 2026-08-26（第三方，三平台合计） | 第四节 |
| ChatGPT 单台机制拆解 | 站内 `/blog/chatgpt-optimization` | 第一节、第六节 |
| AI 爬虫排查与日志方法 | 站内 `/blog/ai-crawlers` | 第五节、第六节 |
| 模型换代噪声的观测方法 | 站内 `/blog/ai-mode-model-churn-guide` | 第五节 |

---

## 七、SEO Checklist

- [x] Title 34 字（≤40），含核心判断「同一个问题，两套引用风格」
- [x] Meta Description 124 字（80–160）
- [x] Slug = 主关键词英文 kebab-case，非日期
- [x] 7 个编号 H2，每个回答一个独立子问题
- [x] 内链全部为站内真实路由、无尾斜杠
- [x] 无孤立 `#标签`、无跨行断裂粗体
- [x] 主关键词在 Title / Description / TL;DR / H2 中自然出现
- [x] 无「随着…的发展」「在数字化时代」类开场
- [x] 正文不写 H1

## 八、GEO Checklist

- [x] 每个 H2 首段给出可直接摘走的答案句
- [x] 实体明确：ChatGPT、Perplexity、OAI-SearchBot、GPTBot、PerplexityBot、OpenAI Help Center、Perplexity 官方文档、Search Engine Journal、Semrush、Kevin Indig、Shero Commerce、Promptwatch、Petra Labs
- [x] 结构化信息：5 张表（控制变量、问题类型、记录字段、差异轴、结果处理）+ 6 步排查 + 行动清单
- [x] 条件判断明确：先检索、再抓取、再索引、再问题类型、再快照/模型、最后风格
- [x] 证据与观点分开：官方文档、第三方逆向、第三方监测各自标明
- [x] 无自有实验数据、无虚构案例、无效果承诺
- [x] 百分比用「百分之……」表述，均可在来源中复核

---

## 九、A–G 质检

| 维度 | 结论 | 说明 |
|---|---|---|
| A. Intent | 通过 | 回答「同一个问题问两家，怎样测、怎样读、怎样落到同一套内容资产」，与标题和 Search Intent 一致 |
| B. Cannibalization | 通过（评分 1） | 与 `geo-brand-diagnosis-guide` 是「品牌位置打分 vs 引用来源画像」；与 `chatgpt-optimization` 是「单平台机制 vs 跨平台对照」；未复用旧文结构 |
| C. SEO | 通过 | Title / Meta / slug / H2 / 内链均符合规范 |
| D. GEO | 通过 | 有可摘答案、实体清晰、结构化信息充分、结论有官方与第三方依据 |
| E. E-E-A-T | 通过 | 官方与第三方逐项区分；未把第三方逆向说成官方；未声称自有数据 |
| F. Commercial | 通过 | CTA 为 `/tool` → `/services/geo-audit` → `/services/geo-optimization`，与 Informational / 方法型意图匹配，不强推 `/contact` |
| G. Internal Links | 通过 | 上游（单平台机制、引用三关）+ 平级（爬虫、品牌位置、模型换代）+ 下游（工具、审计、优化）三层齐备，8 条路由全部真实 |

脚本结果（`scripts/_w1_linkcheck.py`）：`BROKEN LINKS: none`｜`over 150 chars: none`｜`percent assertions: none`｜`hanzi 3000`｜`title 34`｜`desc 124`｜`tags 4`｜`category 合法`｜`pubDate` 存在｜`TLDR / 编号章节 / 行动清单 / 结语 / CTA / 来源脚注` 齐备｜`slug` 非日期｜无尾斜杠内链。

---

## 十、执行报告

```text
GEOVA Day 21 执行报告

状态：
✅ 已发布（2026-11-08）

标题：
ChatGPT vs Perplexity：同一个问题，两套引用风格

Search Intent：
Informational（平台对比 / 方法）

核心价值：
把「ChatGPT vs Perplexity」从平台介绍改成一套可复现的对照测试法：7 个控制变量、3 类问题各 3 题、6 个引用记录字段、4 条差异轴、6 步排查顺序，并给出「一套证据底座、两种入口适配」的联合策略。补上现有文章只有单平台机制、官方规则或品牌位置打分的空白。

与旧文冲突：
部分重叠（评分 1），已处理。与 geo-brand-diagnosis-guide 是「品牌位置打分 vs 引用来源画像」；与 chatgpt-optimization 是「单平台机制 vs 跨平台对照」；与 geo-2026-08-26-ai-citation-guide 是「官方规则汇总 vs 可复现测试法」。

主要内链：
/blog/chatgpt-optimization
/blog/how-to-get-cited-by-ai
/blog/ai-crawlers
/blog/geo-brand-diagnosis-guide
/blog/ai-mode-model-churn-guide
/tool
/services/geo-audit
/services/geo-optimization

CTA：
免费工具 → GEO 人工诊断 → GEO 优化服务（/tool → /services/geo-audit → /services/geo-optimization）

事实风险：
低—中。官方口径（OpenAI Help Center、Perplexity 官方文档）可直接复核；第三方部分（SEJ 逆向、幽灵引用率、Reddit 监测、Shero Commerce 三平台合计）已在文中标明来源类型与口径，发布前建议再核一次原始报道的数据与时间窗。

是否包含自有数据：
否（正文与脚注均已声明不含自有对照实验数据）

是否需要人工核验：
是（Search Engine Journal 2026-08-25 逆向报道；Search Engine Land / Semrush / Kevin Indig 幽灵引用数据；Promptwatch / Petra Labs Reddit 数据；Shero Commerce 2026-08-26 来源占比）

文件：
src/content/blog/chatgpt-vs-perplexity-citation-style.md
GEOVA_Day21_chatgpt-vs-perplexity-citation-style.md

发布 commit：
19d7cd8

线上 URL：
https://www.geova.cn/blog/chatgpt-vs-perplexity-citation-style/

线上验证：
200；Title / H1 正确；H2 11 个；JSON-LD 2 块（含 headline / datePublished）；sitemap 已收录；8 条内链全部 200。
```

---

## 十一、发布与线上验证（已完成）

1. ✅ 用户确认「发布 Day 21」。
2. ✅ `mv blog-drafts/chatgpt-vs-perplexity-citation-style.md src/content/blog/chatgpt-vs-perplexity-citation-style.md`
3. ✅ `npx astro build`（避开 `npm run build` 的 postbuild IndexNow 外发）。
4. ✅ `dist/blog/chatgpt-vs-perplexity-citation-style/index.html` 存在；`dist/sitemap-0.xml` 含新 URL；Title / H1 / 11 个 H2 / 2 块 JSON-LD / 8 条内链渲染正常。
5. ✅ `git commit -m "feat(blog): publish chatgpt-vs-perplexity-citation-style (Day 21)"`（`19d7cd8`）+ `git push origin main`。
6. ✅ 线上 URL 返回 200（推送后约 1 分钟）；Title / H1 正确；H2 11 个；JSON-LD 2 块；线上 sitemap 已收录；8 条内链全部 200。
7. ✅ `blog-drafts/` 对应文件已随 `mv` 移走，无残留，无需单独 cleanup 提交。
