# GEOVA Day 16 执行包｜已有 SEO 内容改造为 AI 可引用

## 一、Pre-Writing Audit

### 1. Search Intent

用户手上已经有一批排名尚可、流量稳定的旧页面（产品页、服务页、博客），听说 GEO 要求「可被 AI 摘录」，但不想推倒重写。真正要解决的是：先改哪里、按什么顺序改、改到什么程度算合格、什么时候才真的需要重写。典型角色是内容负责人、市场负责人与执行改造的 SEO / 内容从业者。

用户处于「已有 SEO 基础、准备做 GEO 但工时有限」的阶段。搜索这个问题，是因为重写成本高且有丢排名风险，而多数 GEO 内容只讲「要可摘录」，没有给出存量页面的操作顺序。

本文不解决：不教站点级选页（`large-site-geo-priority` 已写）、不写完整五层顺序（`how-to-do-geo`）、不写审计检查项（Day 15）、不承诺引用率提升、不提供平台特定规则。

### 2. Existing Content Conflict 评分：1（部分重叠但有新价值）

| 旧文 | 重叠点 | 本文边界 |
|---|---|---|
| `geo-content-strategy` | 同讲内容可被引用 | 旧文是「为什么 / 什么样」的原则；本文是存量页面的改造顺序与验收 |
| `how-to-do-geo` 第 3 层 | 同讲内容层改造 | 旧文给四条标准；本文把标准转成「先改哪一句、哪一档、怎么验收」 |
| `how-to-get-cited-by-ai` 第三关 | 同讲段落可摘性 | 旧文讲三关机制与诊断；本文只处理已有段落怎么改 |
| `large-site-geo-priority` | 同讲「先改哪些」 | 旧文是站点级选页（哪 100 页）；本文是页内改造顺序（同一页先改哪一段） |
| `seo-audit-geo-checklist` | 同属 SEO × GEO | 旧文是审计者查现状；本文是执行者改内容 |

### 3. Unique Value

现有文章没有一篇从「存量页面改造顺序 + 验收」组织内容。本文把「内容要可摘」拆成四档成本（重排 → 局部改写 → 补写证据 → 重写），给出页面内先动的三个位置、五类先不要动的动作，以及不依赖引用率的抽段验收法，并明确三类才值得重写的页面。

### 4. 数据与边界

- 主关键词「内容改造 AI 引用」不在 V2.2 / V2.3 词库内，标注「待 SERP 验证」，不编造搜索量或 KD。
- 正文不使用任何百分比断言；引用颗粒度以 Google / Anthropic 官方文档口径为准（站内已有引用），第三方研究只做定性转述并内链。
- 不虚构客户案例、改造前后引用率或工时节省比例。
- Day 21 / 23 / 24 的合并规则不适用本篇。

---

## 二、Article Metadata

| 字段 | 内容 |
|---|---|
| Title | 已有 SEO 内容改造为 AI 可引用：先改顺序，别急着重写 |
| Meta Description | 手上有一批排名不错的旧页面，做 GEO 一定要重写吗？不必。本文把存量内容改造按成本分成四档，给出页面内先改哪三个位置、哪些内容先别动，以及一套不依赖引用率的抽段验收法，并说明哪三类页面才值得重写。 |
| H1 | 由 frontmatter `title` 渲染，正文不写 H1 |
| 主关键词 | 内容改造 AI 引用（待 SERP 验证，不在 V2.2 / V2.3 词库内） |
| 次关键词 | 旧文改造、可摘录段落、存量内容改造 |
| Search Intent | Informational |
| 内容类型 | 方法 |
| 优先级 | P1 |
| Topic Cluster | SEO + GEO（承接 `/services/geo-optimization`） |
| 目标 URL | `/blog/content-retrofit-ai-citation` |
| 建议内链 | `/blog/how-to-do-geo`、`/blog/seo-audit-geo-checklist`、`/blog/geo-content-strategy`、`/blog/how-to-get-cited-by-ai`、`/blog/geo-ai-search-accounting-era`、`/blog/large-site-geo-priority`、`/blog/geo-framework`、`/blog/ai-citations-product-pages`、`/blog/ai-citations-drop-after-migration`、`/tool`、`/services/geo-optimization`、`/services/geo-audit` |
| CTA | GEO 优化服务 → `/services/geo-optimization`（辅助 `/tool`、`/services/geo-audit`） |

---

## 三、正文（与 `src/content/blog/content-retrofit-ai-citation.md` 逐字一致）

```markdown
---
title: "已有 SEO 内容改造为 AI 可引用：先改顺序，别急着重写"
description: "手上有一批排名不错的旧页面，做 GEO 一定要重写吗？不必。本文把存量内容改造按成本分成四档，给出页面内先改哪三个位置、哪些内容先别动，以及一套不依赖引用率的抽段验收法，并说明哪三类页面才值得重写。"
pubDate: 2026-10-30
category: "实战指南"
tags: ["GEO", "内容改造", "AI引用", "SEO"]
author: "GEO 咨询团队"
---

## TL;DR / 核心要点总结

- **存量页面做 GEO，先改「顺序」，再改「结构」，重写是最后一档，不是第一反应。** 多数页面缺的不是新内容，而是把结论放到能被摘走的位置。
- **改造按成本分四档：重排 → 局部改写 → 补写证据 → 重写。** 能停在低一档，就不要跳到高一档。
- **一页之内先动三个位置：H1 与首段、每个 H2 的第一句、承载事实的段落。** 其余内容先不动。
- **验收用「抽段测试」，不要用 AI 引用率。** 改前抽 10 段存档，改后同段复测；引用率周期长、波动大。
- **只有三类页面值得重写：事实过时、整页没有独立事实、页面站错了问题。** 其余页面改造即可。

---

## 一、先算一笔账：重写贵在哪里

重写的成本不只是字数。一次整页重写至少消耗三笔账：内容生产工时、设计开发排期、改完之后的归因成本。

第三笔最容易被忽略。整页同时换了标题、结构、措辞和关键词，流量或引用无论涨跌，都说不清是哪一项造成的。

对已有排名的页面，重写还会动到原来的搜索入口。标题、H1、首屏关键词一旦变化，经典搜索的点击可能先掉一轮，再等新版本重新积累。

存量页面的问题往往是局部的：结论埋在第三段、段落依赖上下文、规格只写在图片里。这些不需要重写，重排和补写即可。

所以顺序是：先判断问题在哪一层，再选成本最低的那一档；只有改不动了，才重写。

完整的 GEO 工作面顺序见 [GEO 优化怎么做](/blog/how-to-do-geo)。如果还没确认问题在通道层还是内容层，先过一遍审计检查项：[SEO 审计如何加 GEO 检查项](/blog/seo-audit-geo-checklist)。

> **直接回答：存量内容做 GEO，正确顺序是「先诊断段落，再按成本从低到高改造，最后才重写」，不是先重写再补结构。**

---

## 二、改造分四档：先选成本最低的那一档

把「改造」当成一个动作，就会直接跳到重写。更实用的做法是拆成四档，按成本判断。

| 档位 | 典型症状 | 改法 | 新增内容 | 成本 |
| --- | --- | --- | --- | --- |
| 一档：重排 | 结论在中后段；H2 是名词短语；答案与问题隔了几段 | 把结论句搬到 H2 后第一句；H2 改成问题或判断 | 否 | 最低 |
| 二档：局部改写 | 段落用「这一点」「前者」开头；一句话套三个从句；主语缺失 | 拆段、补主语、一句一义 | 否 | 低 |
| 三档：补写证据 | 有判断没依据；规格、价格、条件只在图片或 PDF；「行业领先」没有口径 | 补数字、来源、时间与条件；把附件内容搬进正文 | 是 | 中 |
| 四档：重写或合并 | 事实过时；整页没有可独立成立的事实；回答的问题与目标提问错位 | 重写，或并入更合适的页面 | 是 | 高 |

四档不是四个步骤，而是四次判断。能停在一档，就不要进二档；能补写解决，就不要重写。

判断顺序从上往下：能不能只挪位置 → 能不能只改表达 → 缺不缺证据 → 是不是站错了地方。

这套顺序的依据是 AI 的摘取单位：引用落在段落上，段落的位置、主语与结构决定它能不能被拿走。机制拆解见 [如何让 AI 引用我的网站](/blog/how-to-get-cited-by-ai) 第三关。

---

## 三、页面内先改哪里：三个位置，按顺序动

> **直接回答：一页之内先动三个位置——H1 与首段、每个 H2 的第一句、承载事实的段落；导航、配图、页脚与 CTA 先不动。**

### 第一个位置：H1 与首段，但先别动 title 标签

H1 要自带结论，不是栏目名。「产品中心」不是结论，「支持 6 种部署方式的企业搜索产品」才是。

首段前 100–150 字要能独立回答「这页讲什么、结论是什么」。不要用「随着……发展」「在数字化时代」开场。

第三方 Resoneo 对 ChatGPT 索引的解剖显示，每条记录只保留标题与正文开头约 200 个字符，模板文字会挤占额度（[站内拆解](/blog/geo-ai-search-accounting-era)）。首段写套话，等于浪费额度。

注意：正文 H1 可以先改，`<title>` 属于 SEO 资产，等验收后再调整。

### 第二个位置：每个 H2 的第一句

把这一节最重要的判断放在 H2 下面第一句，而不是最后一段。

H2 本身尽量写成问题或判断。「多久能见效」优于「效果周期说明」；「哪些企业不适合」优于「适用范围」。

如果一节里有多个并列结论，先给一句总判断，再展开。

### 第三个位置：承载事实的段落

找出页面里真正会被摘走的事实：规格、价格区间、适用条件、对比关系、时间点。

把散在散文里的事实集中成表格或清单。一个表格只回答一个维度，不要塞进参数、价格与服务条款。

每个数字都要带口径：谁说的、什么时候、统计范围。没有口径不如不写。

段落自包含检查只有一句：把这段单独复制出来，主语还在不在，品牌名在不在，结论在不在第一句。

写作层面的完整方法见 [GEO 时代的内容策略](/blog/geo-content-strategy)。

---

## 四、一页之内，哪些位置先不要动

改造失败常见于把「内容改造」做成「整页翻新」。以下五类动作先不要混进同一批。

| 先不要动 | 原因 |
| --- | --- |
| 视觉与排版 | 换模板、调配图、改字体，不直接改变段落能否被摘走 |
| URL 与导航 | 会牵动重定向、内链与索引，属于站点级动作，应单独成批 |
| 全站页脚与侧栏 | 模板文字会挤占摘要额度，但改动影响全站，需单独验收 |
| 已有排名且答案完整的段落 | 改动本身有风险，收益却不明确 |
| 合规文本与交易流程页 | 以准确和可用为先，不参与可摘性改造 |

改 URL 或改版后引用掉了，排查顺序另有一套：[改版后引用掉了怎么查](/blog/ai-citations-drop-after-migration)。

站点规模很大时，先要解决的不是页内顺序，而是「上万页里先改哪 100 页」。这个问题站内已写过：[大规模站点 GEO 的选页与排序](/blog/large-site-geo-priority)。

---

## 五、改造什么时候算完成：抽段验收法

> **直接回答：验收标准是「抽出来的段落能不能独立成立」，不是「AI 有没有引用」。**

1. **改前抽样。** 从目标页面抽 10 段，覆盖开头、每个 H2、事实段与结尾，原样存档。
2. **逐段四问。** 这段讲的是谁？结论在哪一句？凭什么是真的？离开上下文还成立吗？
3. **改后复测。** 同一批段落再测一次，记录「四问全过」的比例，而不是字数变化。
4. **记录改动清单。** 这页动了哪三处、属于哪一档，写进同一张表，下次复测能对上。

| 验收项 | 通过标准 | 不通过的表现 |
| --- | --- | --- |
| 主语完整 | 每段第一句有明确主体，品牌或产品名可出现 | 用「它」「前者」「如上所述」开头 |
| 结论前置 | H2 后第一句就是判断 | 铺垫三段才给结论 |
| 事实带口径 | 数字有来源、时间、范围 | 「大幅提升」「行业领先」没有依据 |
| 结构可搬 | 关键事实在表格、清单或定义句里 | 只在图片、PDF、视频里 |
| 页面可归类 | H1 与首段能回答「这页讲什么」 | 首段是公司介绍或口号 |

为什么不拿 AI 引用率做验收？引用是结果，前面还有检索与采信两关。页面改好了，也可能因抓取通道、实体不一致或缺少第三方证据而不被引用。

引用率波动也大，单次回答不能当趋势。拿它做周度验收，会把正常波动误判成失败，再把已经改对的地方改回去。

正确做法是分开记：改造验收看可摘性，引用变化放到月度观察。引用率的测法见 [如何让 AI 引用我的网站](/blog/how-to-get-cited-by-ai)，四层框架见 [GEOVA GEO 框架](/blog/geo-framework)。

---

## 六、什么情况下才真的需要重写

三类页面，改造救不了，应该直接进入重写或合并。

**事实基础过时。** 产品下线、价格体系变了、政策口径变了。这类问题不是表达问题，重排和改写都解决不了错误的事实。

**整页没有独立事实。** 通篇是形容词、愿景和口号，抽不出一句可验证的陈述。补写成本接近重写，不如直接重写。

**页面站错了问题。** 这页回答的是「我们是谁」，但目标提问是「该怎么选」。应新建或合并到合适的页面，而不是硬改。

重写时保留原有 URL 与内链。必须换 URL 时按迁移流程处理，不要直接删旧页。重写不是推倒重来：先盘点仍成立的段落，只换掉不成立的部分。

---

## 七、五个常见错误

**把加粗关键词当结论前置。** 加粗不改变句子是否自包含。模型摘走的是整句，不是加粗的词。

**一次改整页。** 归因失效，下次不知道该保留什么。一次只改一类动作，才说得清是哪项起了作用。

**把文章改成问答体模板。** 为了可摘性牺牲可读性，页面会变成低质问答聚合。可摘性靠段落写法，不靠 FAQ 外壳。

**只改博客，不改产品页与服务页。** 第三方引用分布里，产品页是占比最高的单一页型（[数据与口径](/blog/ai-citations-product-pages)）。博客好改，却不一定是引用大头。

**改完不做前后对照。** 凭感觉验收，下一轮又从头猜。抽段存档花不了多少时间，却能省一轮返工。

---

## 八、行动清单

### 今天做

- [ ] 选 1 个有稳定流量、内容仍准确的产品页或服务页，只标出三个位置：H1 与首段、每个 H2 第一句、事实段。
- [ ] 从这页抽 10 段，按「四问」做一次改前存档。

### 本周做

- [ ] 完成这一页的第一档改造（重排），不改 title 标签、不改 URL。
- [ ] 同批 10 段复测，记录四问通过情况与改动清单。

### 本月做

- [ ] 同页型的 5–10 页按同样顺序改完，形成可复用的改造记录表。
- [ ] 属于三类重写条件的页面单独立项，不与改造批次混在一起。
- [ ] 月度看一次引用变化，与改造验收分开记录。

---

## 结语：顺序对了，改造才便宜

存量内容做 GEO，最大的浪费不是没重写，而是一上来就重写。

先搬结论、再拆段落、再补证据、最后才动结构；改完用抽段测试验收，而不是用引用率自我安慰。顺序对了，一页的改造通常比重写便宜得多；顺序错了，重写十页也未必多一句能被摘走的话。

---

## 📩 需要帮助？GEO 咨询团队可以为你做什么

已有一批 SEO 内容，想判断哪些该改造、哪些该重写：

- **[GEO 优化服务](/services/geo-optimization)**：按页型做存量改造与验收，不推倒重写
- **[免费工具](/tool)**：先扫一遍抓取通道、结构化数据与正文可读性
- **[GEO 人工诊断](/services/geo-audit)**：需要先确认问题在通道层还是内容层时

[查看 GEO 优化服务 →](/services/geo-optimization)

---

*本文为方法说明类内容，不包含未经核实的行业数据。文中涉及的引用颗粒度以 Google、Anthropic 官方文档口径为准（站内已在相关文章中引用）；第三方研究均标注来源并给出内链。不同 AI 产品的抓取与引用机制变化较快，本文结论截至 2026 年 10 月。*
```

---

## 四、内链表

| 链接 | 类型 | 为什么现在点它 |
|---|---|---|
| `/blog/how-to-do-geo` | 上游方法 | 确认内容层在整个五层顺序中的位置，避免跳层改造 |
| `/blog/seo-audit-geo-checklist` | 前置排查 | 还没确认问题在通道层还是内容层时，先查再改 |
| `/blog/geo-content-strategy` | 平级旧文 | 写作层面的完整方法，本文只给改造顺序 |
| `/blog/how-to-get-cited-by-ai` | 平级机制 | 三关机制与引用率测法，解释为什么不能用引用率验收 |
| `/blog/geo-ai-search-accounting-era` | 证据 | 200 字符索引解剖的出处与口径 |
| `/blog/large-site-geo-priority` | 边界 | 大站先选页，再谈页内改造 |
| `/blog/ai-citations-drop-after-migration` | 下游风险 | 改 URL 或改版后引用掉了的排查顺序 |
| `/blog/geo-framework` | 上游框架 | 摘录层在四层漏斗中的位置 |
| `/blog/ai-citations-product-pages` | 证据 | 页型引用分布与口径局限 |
| `/services/geo-optimization` | 商业 | 存量改造与验收服务 |
| `/tool` | 工具 | 先扫抓取通道、结构化数据与正文可读性 |
| `/services/geo-audit` | 诊断 | 确认问题层级的付费诊断 |

---

## 五、CTA

- 主 CTA：GEO 优化服务 → `/services/geo-optimization`
- 辅助：免费工具 `/tool`、GEO 人工诊断 `/services/geo-audit`
- 匹配理由：Informational 意图，用户关心「改造还是重写、成本多少」，先给自助工具与诊断入口，再导向存量改造服务；不强制 `/contact`。

---

## 六、Sources / References

- Google Gemini grounding 的 `groundingMetadata` / `groundingChunks` 段落级引用口径：转引自站内 `/blog/geo-2026-08-26-ai-citation-guide`（官方文档口径）。
- Anthropic Citations API 逐句引用：同上。
- Resoneo 对 ChatGPT 索引的解剖（每条记录保留标题 + 正文开头约 200 个字符）：转引自站内 `/blog/geo-ai-search-accounting-era`。
- Ten Speed 7,387 次引用的页型分布（产品页为占比最高的单一页型）：转引自站内 `/blog/ai-citations-product-pages`，原文已标注单客户群快照、未按模型拆分等口径局限。
- 站内方法文：`/blog/how-to-do-geo`、`/blog/geo-content-strategy`、`/blog/how-to-get-cited-by-ai`、`/blog/large-site-geo-priority`、`/blog/seo-audit-geo-checklist`、`/blog/geo-framework`。
- 本文未引入新的外部数据；所有第三方数字均为站内既有分析的转述。

---

## 七、SEO Checklist

- [x] Title 30 字，≤40，含核心判断与主关键词
- [x] Meta Description 99 字，80–160，说明问题、方法、交付
- [x] 正文不写 H1，由 frontmatter `title` 渲染
- [x] 主关键词自然出现在 Title、开头、H2 与正文
- [x] 次关键词（旧文改造、可摘录段落）自然出现，无堆砌
- [x] 8 个编号 H2，每个回答一个独立子问题
- [x] slug `content-retrofit-ai-citation` 为非日期 kebab-case
- [x] 12 个站内真实路由、14 处链接，全部无尾斜杠
- [x] category「实战指南」在枚举内；tags 4 项
- [x] pubDate 2026-10-30（写作当天）

---

## 八、GEO Checklist

- [x] Direct Answer：开篇与三个关键小节均有可直接摘走的答案句
- [x] Entity：GEO、AI 引用、段落级摘取、四档改造、抽段验收均有明确定义或上下文
- [x] Structured Information：3 张表（四档成本、先不要动、验收标准）+ 四步抽段法 + 行动清单
- [x] Evidence：机制口径标明官方来源类型；第三方数据标注并内链；无百分比断言
- [x] 段落自包含：53 个散文段落全部 ≤150 字，结论前置
- [x] 品牌主语：关键结论句带「存量内容」「改造」「验收」等明确主语
- [x] 无孤立 `#标签`、无跨行粗体、无未整理内容残留

---

## 九、A–G 质检

| 维度 | 结论 | 说明 |
|---|---|---|
| A. Intent | 通过 | 回答「存量页面先改哪里、怎么验收、何时重写」，与标题一致 |
| B. Cannibalization | 通过（评分 1） | 与 `geo-content-strategy` 的分工是「原则 vs 操作顺序」；与 `large-site-geo-priority` 的分工是「选页 vs 页内改造」；与 `how-to-get-cited-by-ai` 的分工是「机制诊断 vs 改造执行」；未复用旧文结构 |
| C. SEO | 通过 | Title / Meta / 关键词 / 层级 / slug 均符合规范 |
| D. GEO | 通过 | 有可摘答案、实体清晰、结构化信息充分、无无依据结论 |
| E. E-E-A-T | 通过 | 第三方研究始终标明为第三方；无虚构案例、无无法验证数字；无百分比 |
| F. Commercial | 通过 | CTA 为 `/services/geo-optimization`，与 Informational + 成本决策意图匹配；辅助 `/tool`、`/services/geo-audit` |
| G. Internal Links | 通过 | 上游（`how-to-do-geo`、`geo-framework`）+ 平级（`geo-content-strategy`、`how-to-get-cited-by-ai`、`large-site-geo-priority`、`seo-audit-geo-checklist`）+ 下游（`/tool`、`/services/geo-optimization`、`/services/geo-audit`）三层齐备，路由全部真实 |

脚本结果：`BROKEN LINKS: none`｜`over 150 chars: none`｜`percent assertions: none`｜`hanzi 2998`｜`title 30`｜`desc 99`｜`tags 4`｜`category 合法`。

---

## 十、执行报告

```text
GEOVA Day 16 执行报告

状态：
✅ 完成（已发布）

标题：
已有 SEO 内容改造为 AI 可引用：先改顺序，别急着重写

Search Intent：
Informational

核心价值：
把「内容要可摘」拆成存量页面的四档改造顺序（重排 → 局部改写 → 补写证据 → 重写），给出页内三个优先位置、五类先不要动的动作与不依赖引用率的抽段验收法；现有文章没有这套操作顺序与验收口径。

与旧文冲突：
部分重叠（评分 1），已通过边界声明与内链定位处理；与 geo-content-strategy 的分工是「原则 vs 操作」，与 large-site-geo-priority 的分工是「选页 vs 页内改造」，与 how-to-get-cited-by-ai 的分工是「机制诊断 vs 改造执行」。

主要内链：
/blog/how-to-do-geo
/blog/seo-audit-geo-checklist
/blog/geo-content-strategy
/blog/how-to-get-cited-by-ai
/blog/geo-ai-search-accounting-era
/blog/large-site-geo-priority
/blog/geo-framework
/blog/ai-citations-product-pages
/blog/ai-citations-drop-after-migration
/tool
/services/geo-optimization
/services/geo-audit

CTA：
GEO 优化服务 → /services/geo-optimization（辅助 /tool、/services/geo-audit）

事实风险：
低（未使用百分比；第三方数字均为站内既有分析转述并标注来源类型；无自有实验数据）

是否包含自有数据：
否

是否需要人工核验：
否（关键词标注「待 SERP 验证」）

文件：
src/content/blog/content-retrofit-ai-citation.md
GEOVA_Day16_content-retrofit-ai-citation.md
```

---

## 十一、线上验证结果（2026-10-30）

- 发布 commit：`3823e3b`（`feat(blog): publish content-retrofit-ai-citation (Day 16)`）
- 进度表 commit：`c2c783b`
- 线上 URL：https://www.geova.cn/blog/content-retrofit-ai-citation/
- HTTP 状态：200（经 `http://127.0.0.1:7897` 代理复验）
- Title：`已有 SEO 内容改造为 AI 可引用：先改顺序，别急着重写 | GEO 咨询`
- H1：与 frontmatter title 一致
- Schema：BlogPosting + BreadcrumbList（3 个 ListItem）+ Organization / Person / WebPage
- sitemap：`dist/sitemap-0.xml` 已含新 URL
- 内链：12 个路由全部 200（博客 9 条、服务/工具 3 条）
- 构建：`npx astro build` 成功，未触发 IndexNow postbuild
