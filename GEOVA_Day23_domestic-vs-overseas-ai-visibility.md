# GEOVA Day 23 执行包｜国内 vs 海外 AI：同一套内容，为什么两头表现不同

> 状态：✅ 已发布（2026-11-11）
> 生成日期：2026-11-11

## 一、Pre-Writing Audit

### 1. Search Intent

用户是同时经营国内与海外 AI 渠道的 B2B 市场负责人、内容负责人或 SEO/GEO 负责人，包含出海企业与在华外企。他们已经有一批内容资产，发现「同一套内容」在豆包、DeepSeek 与 ChatGPT、Perplexity 等平台上的表现完全不同，想知道问题出在内容、通道还是市场选择。

用户处于「已有投入、需要判断下一步」的阶段：预算有限，需要一个能向团队解释的依据，决定先修哪一头，而不是再要一份平台介绍。

本文解决：跨阵营落差的结构性原因（两个阵营对「谁有资格替品牌说话」的认定不同）、按「主张—转述者」拆解的诊断表、按成本排序的四变量诊断顺序，以及「两边要不要都做」的业务判断。

本文不解决：单平台机制拆解（见 `doubao-deepseek-domestic-geo-guide`、`geo-2026-08-26-ai-citation-guide`）；平台内部的对照测法（见 `chatgpt-vs-perplexity-citation-style`）；语言版本的站点配置排查（见 `bilingual-site-ai-visibility`）；推荐名单的形成机制（见 `how-to-get-recommended-by-ai`）；具体平台的操作教程。

### 2. Existing Content Conflict 评分：1（部分重叠，但有明显新价值）

| 旧文 | 重叠点 | 本文边界 |
| --- | --- | --- |
| `doubao-deepseek-domestic-geo-guide` | 豆包与 DeepSeek 的检索机制 | 机制只内链、不复述；本文不拆管线，只取「不同池子」这一结论 |
| `geo-2026-08-26-ai-citation-guide` | 六大模型官方规则 | 不重述规则总表；只在入口表里指向原文 |
| `bilingual-site-ai-visibility` | 实体层与信源池的分池现象 | 那篇对象是语言版本的站点配置（抓取/索引/canonical/hreflang）；本文对象是「内容主张的可移植性」，不查站点配置 |
| `chatgpt-vs-perplexity-citation-style` | 跨平台对照测试 | 那篇是平台内对照测法（7 变量、4 轴）；本文是跨阵营诊断，分析单位是「主张—转述者」 |
| `geo-brand-diagnosis-guide` | 「偏科严重」模式 | 不重复 8 题打分卡；那篇量位置，本文量缺口性质 |
| `how-to-get-cited-by-ai` | AI 引用失败排查 | 不复用「检索 / 采信 / 摘录」三段结构；本文不按页面分层，按主张逐条盘点 |

结论：可写（评分 1）。必须守住「主张—转述者」这条线，否则会滑成第五篇「AI 引用排查」，失去独立价值。

### 3. Unique Value

把跨阵营差异从「平台风格不同」改写为「每条主张在当地由谁转述」，并给出按成本排序的四变量诊断顺序（提问 → 入口 → 身份 → 转述者）。这是站内现有文章没有的分析单位：既不是站点技术分层（Day 5），也不是平台对照测法（Day 21），更不是页面级三关（`how-to-get-cited-by-ai`）。

### 4. Day 23 特别处理与数据边界

- 计划要求：Day 23 为合并候选，若只写成「AI Search 基础机制」则并入旧文。本文以诊断方法为主体，机制只出现在一张入口对照表，且全部内链，**成立，单独成篇**。
- 主关键词「国内海外 AI 差异」**不在 V2.2 / V2.3 词库内**，标注「待 SERP 验证」；词库未提供搜索量、KD，本文不编造任何相关数字。
- 不虚构客户案例、实验数据、效果承诺；不声称 GEOVA 有自有对照数据。
- 全文不使用百分比断言（脚本复核：none）。

---

## 二、Article Metadata

| 字段 | 内容 |
| --- | --- |
| Title | 国内 vs 海外 AI：同一套内容，为什么两头表现不同 |
| Meta Description | 同一套内容在豆包、DeepSeek 和 ChatGPT、Perplexity 里表现不同，多数不是内容质量差异，而是两个阵营对「谁有资格替品牌说话」的认定不同。本文给出一套跨阵营诊断方法：先证明差异真实，再按「主张—转述者」逐条盘点，最后决定先修哪一头。 |
| H1 | 由 frontmatter `title` 渲染，正文不写 H1 |
| 主关键词 | 国内海外 AI 差异（**不在 V2.2/V2.3 词库，待 SERP 验证**） |
| 次关键词 | 豆包 vs ChatGPT、跨平台可见度 |
| Search Intent | Informational |
| 内容类型 | 平台对比（诊断方法） |
| 优先级 | P2 |
| Topic Cluster | AI Platform-Domestic / AI Platforms（跨阵营诊断） |
| 目标 URL | `/blog/domestic-vs-overseas-ai-visibility` |
| 建议内链 | `/blog/doubao-deepseek-domestic-geo-guide`、`/blog/geo-2026-08-26-ai-citation-guide`、`/blog/how-to-get-recommended-by-ai`、`/blog/bilingual-site-ai-visibility`、`/blog/chatgpt-vs-perplexity-citation-style`、`/blog/chatgpt-optimization`、`/blog/google-ai-mode`、`/blog/brand-entity-ownership`、`/tool`、`/services/geo-audit`、`/services/geo-optimization` |
| CTA | 免费工具 → GEO 人工诊断（`/tool` → `/services/geo-audit`）→ GEO 优化服务 |

---

## 三、正文（与 `blog-drafts/domestic-vs-overseas-ai-visibility.md` 逐字一致）

```markdown
---
title: "国内 vs 海外 AI：同一套内容，为什么两头表现不同"
description: "同一套内容在豆包、DeepSeek 和 ChatGPT、Perplexity 里表现不同，多数不是内容质量差异，而是两个阵营对「谁有资格替品牌说话」的认定不同。本文给出一套跨阵营诊断方法：先证明差异真实，再按「主张—转述者」逐条盘点，最后决定先修哪一头。"
pubDate: 2026-11-11
category: "实战指南"
tags: ["GEO", "豆包", "ChatGPT", "AI搜索"]
author: "GEO 咨询团队"
---

## TL;DR / 核心要点总结

- **同一套内容两头表现不同，多数不是内容质量差异，而是两个阵营对「谁有资格替品牌说话」的认定不同。** 海外更看公开网页与第三方评测，国内更看生态入池与中文权威转述。
- **不要按「国内 vs 海外」二分下结论。** ChatGPT、Perplexity、Google AI 与豆包、DeepSeek 各有入池条件，实际是四五个互不相通的池子。
- **诊断单位是「一条主张」，不是「一个页面」。** 逐条问：这句话在目标阵营里，除了官网，还有谁在说？没有转述者，改标题也没用。
- **顺序按成本排：提问 → 入口 → 身份 → 转述者。** 内容改造排在这四项之后。
- **两边做不做是业务判断。** 客户不在那个阵营提问，缺口就只是一条观测记录。

---

## 一、先说结论：差异往往不在内容，而在「谁在替你说」

很多团队的问法是一样的：同一篇文章，为什么在 ChatGPT 里能被引用，在豆包里却搜不到？

这个问法默认了「内容只有一份，平台只是两个入口」。但跨阵营诊断的第一课，是这个前提经常不成立。

**两个阵营对「什么算合格来源」的认定不同。** 海外模型更常取用可公开索引的网页与第三方评测；国内模型更依赖生态内的收录、权威层级与中文转述。机制差异站内已拆过，这里只取结论：[豆包 + DeepSeek 双引擎拆解](/blog/doubao-deepseek-domestic-geo-guide)。

这不是说国内更依赖第三方、海外更依赖官网。恰恰相反，两边都以第三方为主。真正的差别在于**第三方的名单几乎不重叠**：海外认维基、领英、评价站与英文媒体；国内认百科、知乎、门户与行业蓝 V。

所以先给一个可操作的判断：**当同一条主张在目标阵营里找不到「替你说这句话的第三方」，它大概率不会出现，和页面写得多好关系不大。**

---

## 二、入场券不同：官网不是同一张票

先把「AI 搜索」这个词拆开。它不是一套系统，而是几套互不相通的检索栈。

| 入口 | 内容怎么进去 | 官网在这里的角色 | 机制细节 |
| --- | --- | --- | --- |
| ChatGPT | 自有搜索爬虫抓取与摘要 | 可成为来源；快照取数面有限（第三方逆向） | [ChatGPT 搜索优化](/blog/chatgpt-optimization) |
| Perplexity | 自建爬虫实时检索 | 正文段落可被直接摘走 | [两套引用风格](/blog/chatgpt-vs-perplexity-citation-style) |
| Google AIO / AI Mode | 与经典搜索共用索引 | 官网资格基本等同 SEO 资格 | [AI Mode 是什么](/blog/google-ai-mode) |
| 豆包 | 字节自建内容库与 RAG 检索池 | 官网要先入池，未必在池内 | [豆包 + DeepSeek 拆解](/blog/doubao-deepseek-domestic-geo-guide) |
| DeepSeek 联网 | 调用 Bing API | 先被 Bing 收录才有候选资格 | [六大模型官方规则](/blog/geo-2026-08-26-ai-citation-guide) |

这张表说明一件事：「发了一篇内容」不等于「五个入口都读得到」。

海外侧，Google 的 AI 答案与经典搜索共用索引，SEO 地基直接生效；ChatGPT 与 Perplexity 则各自抓取、各自决定取数面。

国内侧，豆包看字节的池子，DeepSeek 看 Bing 的候选集。同一个中文页面，进入一个池，不代表进入另一个；同一条知乎回答，在不同国内模型里也可能一个被高频引用、一个完全为零（站内此前的整理，见[双语站点排查](/blog/bilingual-site-ai-visibility)）。

因此，诊断的第一步不是问「国内还是海外」，而是问「我要的那条主张，在哪几个池子里有资格出现」。

---

## 三、把「同一套内容」拆成四张清单

跨阵营诊断最有效的单位，不是页面，而是主张。把核心页面里的关键句逐条拆出来，每条问四个问题：

| 变量 | 要确认的问题 | 验证成本 |
| --- | --- | --- |
| 提问 | 目标阵营的用户，会不会用这种方式问？ | 分钟级 |
| 入口 | 那个入口这一轮会不会去检索、读不读得到你？ | 小时级 |
| 身份 | 说这句话的主体，在那边被认成谁？ | 天级 |
| 转述者 | 除了官网，还有谁在说这句话？ | 周级 |

四条里任何一条不成立，内容都不会以你期待的形式出现。四条的验证成本差别很大，所以顺序固定：从提问开始，到转述者结束。

落到工作表，一行就是一条主张：

| 主张 | 国内侧谁在说 | 海外侧谁在说 | 缺口 |
| --- | --- | --- | --- |
| 品类定义（X 是什么） | 百科、知乎、行业门户 | 维基、行业媒体、官网 | 哪边没有非自家来源 |
| 可比事实（价格、规格、交期） | 垂直媒体、对比页 | 官网事实页、评测站 | 哪边找不到可比数字 |
| 第三方评价（案例与口碑） | 蓝 V、行业奖项、媒体报道 | 领英、案例库、评价站 | 哪边只有自述 |

表里的平台类型按你的行业替换，判断规则只有一条：**每条主张，在目标阵营里至少要有一个非自家来源。** 没有这一条，剩下三张清单做得再好，也只是让一个没人转述的说法更工整。

---

## 四、四种落差，先对号再动手

把症状和缺口对上，能省掉一轮无效改写。

| 症状 | 最可能缺的东西 | 当天能做的验证 |
| --- | --- | --- |
| 海外有引用，国内搜不到 | 中文转述者，或页面没进豆包池 | 不带 URL 问豆包；用唯一字符串做 Canary 验证 |
| 国内有提及，海外零引用 | 英文实体记录与英文第三方来源 | 用英文品牌名与域名查 Bing / Google，核维基与领英 |
| 两边都提品牌，但不给链接 | 页面可摘性与品牌锚定 | 看被引段落是否结论前置、品牌名与数据同句 |
| 一边推荐，一边只提及 | 品类归属与可比事实 | 用推荐题测，别用事实题；看对比表与第三方名单 |

Canary 验证的做法与原理见[豆包 + DeepSeek 拆解](/blog/doubao-deepseek-domestic-geo-guide)；推荐名单由什么决定，见[品牌如何被 AI 搜索推荐](/blog/how-to-get-recommended-by-ai)。

这张表有一个前提：症状必须能稳定复现。单次提问的结果只是观察，不足以支撑任何改造决策。

---

## 五、诊断顺序：先证明差异是真的

跨阵营对比最容易犯的错，是拿两套不等价的问题做比较。中文问题直接机翻成英文，比较对象、单位与合规语境都变了，测到的不是同一个问题。

固定顺序只有四步，按成本从低到高：

1. **统一提问**：同一批问题按各自市场的说法重写，不逐字翻译；每题新开会话，记录模型与模式。
2. **确认这一轮有没有检索**：回答没有外链来源时，先别归因到内容——它可能根本没有去网上找。
3. **查入口与身份**：爬虫是否放行、页面是否进索引或池子；品牌名、`@id` 与 `sameAs` 是否让两边认成同一个主体。
4. **盘点转述者**：列出每条主张在两个阵营里的非自家来源，缺哪边补哪边。

内容改造永远排在这四项之后。在没有入场资格、身份不清、也没人转述的情况下重写页面，改完也无法证明效果。

平台内部的对照测法（固定变量、记录引用集、四轴读差异）已经在 [ChatGPT vs Perplexity](/blog/chatgpt-vs-perplexity-citation-style) 拆过；语言版本的站点配置排查在[中英文站点](/blog/bilingual-site-ai-visibility)。本文只处理跨阵营这一步：同一条主张，为什么在一个池子里成立、在另一个池子里不成立。

---

## 六、两边都要做吗：用「谁在问、谁付钱」判断

诊断的最后一步不是修，而是取舍。两个判断就够：客户在哪个阵营提问；那个阵营的答案是否影响成交。

面向国内客户的企业，海外阵营的零引用往往只是观测缺口。除非海外询盘真实存在，不必为此重写英文站。

做外贸或出海的企业反过来：海外阵营的第三方记录是硬门槛，国内表现可以放低优先级。预算有限时，先补目标市场那一侧。

还有一种情况要单独处理：中文名与英文名各自积累了不同的转述者。这不是「一边没做」，而是两个实体各做了一半。先决定要不要合并、如何互指，再谈内容——实体写法与归属的处理见[品牌实体归属](/blog/brand-entity-ownership)。

---

## 行动清单

### 今天做

- [ ] 选 3 条核心主张，各写成一句可直接引用的话
- [ ] 为每条主张准备两个问法：中文市场的说法与目标市场的说法

### 本周做

- [ ] 在 ChatGPT、豆包各问一遍，先看回答有没有外链来源（有没有触发检索）
- [ ] 逐条盘点：每条主张在两个阵营里各有几个非自家来源

### 本月做

- [ ] 补齐缺口最大的两条主张：每边至少 1–2 个当地转述者
- [ ] 核对中英文品牌名、`@id` 与 `sameAs` 是否互指
- [ ] 建立「主张 × 阵营 × 转述者 × 日期」台账，按月复测

---

## 结语

同一套内容在两头表现不同，不是内容背叛了你，而是它在两个生态里被不同的方式转述与认定。看清这一点，跨阵营的问题就从「哪个平台更好」变成「这条主张在那边由谁替我说」——后者才是能分配预算的问题。

---

## 📩 需要帮助？GEO 咨询团队可以为你做什么

跨阵营的差异，通常一眼看不出断在哪一层。可以按这个顺序走：

- **先自测入口**：用免费工具检查 AI 爬虫访问与页面可读性，30 秒看清基础项：[GEO 诊断工具 →](/tool)
- **再做人工诊断**：把核心主张逐条盘点，按阵营给出缺口与优先级：[GEO 审计与 AI 搜索诊断 →](/services/geo-audit)
- **确认方向后补资产**：内容改造与第三方转述同步推进：[GEO 优化服务 →](/services/geo-optimization)

---

*本文为方法说明类内容，不含自有实验数据。ChatGPT、Perplexity、Google 的检索与索引口径来自各自官方文档与站内已发布的机制整理；豆包与 DeepSeek 的检索池差异来自站内此前的第三方拆解。文中不引用效果类百分比，也不声称任何平台偏好。AI 搜索产品与检索池变化较快，本文方法截至 2026 年 11 月。*
```

---

## 四、内链表

| 内链 | 所在章节 | 为什么用户**现在**要点它 |
| --- | --- | --- |
| [`/blog/doubao-deepseek-domestic-geo-guide`](/blog/doubao-deepseek-domestic-geo-guide) | 一、二、四 | 需要看豆包/DeepSeek 的机制原文，理解「为什么不是一个池子」 |
| [`/blog/geo-2026-08-26-ai-citation-guide`](/blog/geo-2026-08-26-ai-citation-guide) | 二 | 入口表只给结论，官方规则要回原文核对 |
| [`/blog/chatgpt-optimization`](/blog/chatgpt-optimization) | 二 | 要确认 ChatGPT 的抓取与取数链路细节 |
| [`/blog/chatgpt-vs-perplexity-citation-style`](/blog/chatgpt-vs-perplexity-citation-style) | 二、五 | 平台内部的对照测法（变量、记录表、四轴）在那篇，避免重复 |
| [`/blog/google-ai-mode`](/blog/google-ai-mode) | 二 | 需要理解 Google AI 入口与经典搜索的索引关系 |
| [`/blog/bilingual-site-ai-visibility`](/blog/bilingual-site-ai-visibility) | 二、五 | 中英文站点「一边进不了答案」属于站点配置层，需要另一套排查 |
| [`/blog/how-to-get-recommended-by-ai`](/blog/how-to-get-recommended-by-ai) | 四 | 「一边推荐、一边只提及」要往推荐机制深挖 |
| [`/blog/brand-entity-ownership`](/blog/brand-entity-ownership) | 六 | 中英文名各做一半时，先处理实体归属 |
| [`/tool`](/tool) | CTA | 先花 30 秒确认入口层基础项，再决定是否要人工诊断 |
| [`/services/geo-audit`](/services/geo-audit) | CTA | 需要按阵营逐条盘点并拿到优先级清单 |
| [`/services/geo-optimization`](/services/geo-optimization) | CTA | 诊断确认后，才进入内容与转述者的持续建设 |

内链三层齐备：上游（豆包支柱、六模型规则）＋ 平级（Day 21、Day 5、推荐机制、实体归属）＋ 下游商业页（`/tool`、`/services/geo-audit`、`/services/geo-optimization`）。全部为站内真实路径，无尾斜杠。

---

## 五、CTA

按 Search Intent（Informational / 诊断型）选择「免费工具 → GEO 人工诊断 → GEO 优化服务」路径，不导向 `/contact`：

- 先自测：`/tool`
- 再人工诊断：`/services/geo-audit`
- 确认方向后：`/services/geo-optimization`

与 Day 21、Day 22 已验证的漏斗一致。

---

## 六、Sources / References

本篇**未新增外部数据**，全部机制口径指向站内已发布、已核验的文章：

1. [`doubao-deepseek-domestic-geo-guide`](/blog/doubao-deepseek-domestic-geo-guide) —— 豆包自建检索池、DeepSeek 调用 Bing API、Canary 验证法；原文已标注其机制来自第三方拆解。
2. [`geo-2026-08-26-ai-citation-guide`](/blog/geo-2026-08-26-ai-citation-guide) —— 六大模型官方收录与引用规则总表（OpenAI Help Center、Google Search Central、Anthropic、火山引擎、阿里云百炼等）。
3. [`chatgpt-vs-perplexity-citation-style`](/blog/chatgpt-vs-perplexity-citation-style) —— ChatGPT 与 Perplexity 的检索流程、对照测试变量与记录字段。
4. [`bilingual-site-ai-visibility`](/blog/bilingual-site-ai-visibility) —— 中英文信源池差异与「同一知乎在不同国内模型里表现不同」的站内整理。
5. [`how-to-get-recommended-by-ai`](/blog/how-to-get-recommended-by-ai) —— 推荐名单由品类归属、可比事实、第三方共识决定。
6. [`geo-brand-diagnosis-guide`](/blog/geo-brand-diagnosis-guide) —— 可见度打分与「偏科严重」模式。

边界：本文为方法说明类内容，不含自有实验数据；不引用效果类百分比；不声称任何平台偏好。ChatGPT 的快照取数面属第三方逆向结论，已在表格中标注。

---

## 七、SEO Checklist

- [x] Title 27 字（≤40），含核心判断与主关键词语义
- [x] Meta Description 127 字（80–160）
- [x] Slug `domestic-vs-overseas-ai-visibility`：英文 kebab-case、非日期
- [x] 正文不写 H1，由模板渲染
- [x] 6 个编号 H2，每节回答一个独立子问题
- [x] 内链全部为站内真实路径，无尾斜杠
- [x] 内链三层齐备（上游 / 平级 / 下游商业页）
- [x] 表格承担结构化信息，非为 GEO 硬造
- [x] 无关键词堆砌；主关键词「国内海外 AI 差异」以语义形式覆盖（词库外，标注待 SERP 验证）
- [x] 发布后 URL 稳定，不随日期变化

---

## 八、GEO Checklist

- [x] **Direct Answer**：第一节给出可摘走的判断句——「当同一条主张在目标阵营里找不到替你说这句话的第三方，它大概率不会出现」
- [x] **Entity**：ChatGPT、Perplexity、Google AIO / AI Mode、豆包、DeepSeek、字节、Bing 均写清关系
- [x] **Structured Information**：入口对照表、四变量表、主张工作表、症状对照表
- [x] **Evidence**：每条机制结论均指向站内已发布文章；无编造数据、无虚构案例
- [x] **边界声明**：文末脚注明确方法类内容、无自有实验数据、无百分比断言
- [x] **可摘段落**：各节首段结论前置，段落独立成立

---

## 九、A–G 质检

| 项 | 结论 |
| --- | --- |
| **A. Search Intent** | Informational，解决「跨阵营落差先修哪头」；边界写清（不解决单平台机制、平台内测法、站点配置） |
| **B. Cannibalization** | 与 6 篇旧文逐篇划界；分析单位「主张—转述者」为站内首创，不是换标题重写 |
| **C. SEO** | Title 27 字、Desc 127 字、slug 非日期、6 个编号 H2、内链无断链 |
| **D. GEO** | Direct Answer、实体、三张对照表、来源脚注齐备 |
| **E. E-E-A-T** | 未把第三方拆解说成自有；第三方逆向结论已标注；无虚构数据 |
| **F. Commercial** | CTA 匹配诊断型意图：`/tool` → `/services/geo-audit` → `/services/geo-optimization`，不强行 `/contact` |
| **G. Internal Links** | 11 条内链全部通过脚本校验，页面真实存在 |

脚本结果：`BROKEN LINKS: none`｜`over 150 chars: none`｜`percent assertions: none`｜`hanzi in body: 2633`｜`tags 4 项`｜`category 合法`｜`TLDR / 行动清单 / 结语 / CTA / 脚注` 齐备。

---

## 十、执行报告

```text
GEOVA Day 23 执行报告

状态：
✅ 已发布（2026-11-11，commit `10d7628`）

标题：
国内 vs 海外 AI：同一套内容，为什么两头表现不同

Search Intent：
Informational（跨阵营可见度差异诊断）

核心价值：
把「国内 vs 海外」从平台二分改写为「至少四五个互不相通的检索池」，并给出以「主张—转述者」为单位的诊断表与按成本排序的四步顺序。

与旧文冲突：
1（部分重叠，已逐篇划界；不是换标题重写）

主要内链：
/blog/doubao-deepseek-domestic-geo-guide
/blog/geo-2026-08-26-ai-citation-guide
/blog/chatgpt-vs-perplexity-citation-style
/blog/bilingual-site-ai-visibility
/blog/how-to-get-recommended-by-ai
/blog/brand-entity-ownership
/tool
/services/geo-audit
/services/geo-optimization

CTA：
免费工具 /tool → GEO 人工诊断 /services/geo-audit → GEO 优化服务 /services/geo-optimization

事实风险：
无（未新增外部数据，机制口径全部内链；ChatGPT 快照取数面已标注为第三方逆向）

是否包含自有数据：
否

是否需要人工核验：
否（发布前按惯例复核内链与渲染）

文件：
blog-drafts/domestic-vs-overseas-ai-visibility.md
GEOVA_Day23_domestic-vs-overseas-ai-visibility.md
```

---

## 十一、发布记录

- 发布日期：2026-11-11
- 发布提交：`10d7628 feat(blog): publish domestic-vs-overseas-ai-visibility (Day 23)`
- 线上 URL：https://www.geova.cn/blog/domestic-vs-overseas-ai-visibility/
- 线上复验：HTTP 200；Title 与 H1 渲染正确；H2 共 10 个；BlogPosting + BreadcrumbList Schema 各 1 块；canonical 指向自身；`sitemap-0.xml` 已含新 URL；11 条内链全部返回 200。
