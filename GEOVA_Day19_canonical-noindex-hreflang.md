# GEOVA Day 19 执行包｜canonical、noindex、hreflang

## 一、Pre-Writing Audit

### 1. Search Intent

用户是技术负责人、SEO 负责人或运维负责人：站点在 AI 答案里长期缺席，已经排除了「内容不够好」，怀疑是索引层的自我屏蔽配置。用户处于「知道自己可能挡了自己、但不知道该查哪一项」的阶段，搜索这个问题是为了拿到一条可执行的排查路径，而不是又一份配置语法说明。

本文解决：把 `canonical`、`noindex`、`hreflang` 三项按性质分开（硬屏蔽 / 归属判定 / 版本关联），给出分诊表、三个藏身处的取证方法与修复顺序。

本文不解决：抓取层（robots 声明、CDN/WAF 执行、JS 渲染，见 `/blog/ai-crawlers`）；表达层（实体、证据、可摘性，见 `/blog/how-to-get-cited-by-ai`）；多语言站点的完整索引层排查（见 `/blog/bilingual-site-ai-visibility`）；改版与迁移后的全链路排查（见 `/blog/ai-citations-drop-after-migration`）；完整 GEO 审计规格与评分口径（Day 30）。

### 2. Existing Content Conflict 评分：1（部分重叠但有新价值）

> 计划书第十节称该选题「全站无覆盖」。该结论写在 Day 4 / Day 5 发布之前，**已不成立**，本次按现状重评。

| 旧文 | 重叠点 | 本文边界 |
|---|---|---|
| `ai-citations-drop-after-migration`（Day 4） | 断点 3「指令层」讲 canonical 指错、noindex 遗留、旧域名跳转 | 旧文是改版/迁移后引用下跌的事件驱动排查，三项中的两项各占两段；本文是常青分诊，补「三者性质不同」「何时根本不用查」 |
| `bilingual-site-ai-visibility`（Day 5） | 索引层四处配置，含 canonical 跨语言互指、hreflang 三件套、noindex 遗留 | 旧文限定多语言站点，且已给出「canonical/hreflang 属经典搜索机制」的边界；本文把三种设置拆成三类失败，并给出非多语言站点的取证路径 |
| `geo-for-overseas-brands`（Day 9） | 出海站点的 canonical / hreflang 规则表 | 旧文是出海建站决策；本文是存量站点的排查方法 |
| `seo-audit-geo-checklist`（Day 15） | 审计抽样里有一行「自我屏蔽设置」 | 旧文是审计流程与报告设计，不提供取证命令与修复顺序 |
| `ai-crawlers`（Day 18） | 技术通道 | 旧文已明确把 canonical/noindex 交给本文，边界清晰 |
| `large-site-geo-priority`（Day 10） | 「进不了索引的页面」一行 | 旧文是改版优先级排序，不展开配置 |

结论：可写（评分 1）。必须守住「分诊 + 三者性质差异 + 取证」这条线，不写成三项配置的另一次罗列，不重复 Day 5 的多语言分析。

### 3. Unique Value

现有文章都没有回答两个判断：**这三项里哪一项真能挡住 AI、哪一项只是改了归属、哪一项根本不屏蔽**；以及**「Google 有、ChatGPT 没有」时到底该不该查它们**。本文用一张分诊表 + 三种失败指纹 + 三个藏身处的取证法补上这两块，并明确划出「不用查」的情形。

### 4. 数据与边界

- 主关键词「canonical noindex AI 抓取」**不在 V2.2 词库内**，按规范标注「待 SERP 验证」，不编造搜索量与 KD。
- 正文不含任何百分比断言；不虚构客户案例、实验结果或见效周期。
- 官方口径：Google Search Central（canonical 为提示、noindex 为指令、hreflang 三件套、AI 功能与同索引）、OpenAI（OAI-SearchBot 与 noindex）。
- 对自建索引引擎的判断以「公开文档是否有明确口径」为界：无口径的部分只写「没有说明」，不推断其行为。
- **本次写作时本机到 Google / OpenAI 官方文档的网络不可达（代理未启动），官方口径沿用站内已核验版本的表述，未新增未经核验的平台声明。**
- Day 21 / 23 / 24 的合并规则不适用本篇。

---

## 二、Article Metadata

| 字段 | 内容 |
|---|---|
| Title | canonical、noindex、hreflang：三个自己挡 AI 的设置 |
| Meta Description | AI 答案里没有你时，很多人第一时间去查 canonical、noindex 和 hreflang。但三者不是同一类问题：一个是硬屏蔽，一个是把内容归属判给别人，一个从不屏蔽、只决定哪一版给了谁。本文给出分诊表、三个藏身处的取证方法，以及修复顺序与验收标准。 |
| H1 | 由 frontmatter `title` 渲染，正文不写 H1 |
| 主关键词 | canonical noindex AI 抓取（**待 SERP 验证**，不在 V2.2 词库） |
| 次关键词 | AI 抓取屏蔽、hreflang、自我屏蔽排查 |
| Search Intent | Informational |
| 内容类型 | 技术 |
| 优先级 | P1 |
| Topic Cluster | Technical GEO（索引与归属层） |
| 目标 URL | `/blog/canonical-noindex-hreflang` |
| 建议内链 | `/blog/how-to-do-geo`、`/blog/structured-data-guide`、`/blog/ai-crawlers`、`/blog/how-to-get-cited-by-ai`、`/blog/bilingual-site-ai-visibility`、`/blog/ai-citations-drop-after-migration`、`/tool`、`/services/seo-audit` |
| CTA | 自我屏蔽核查 → SEO 全站诊断（`/services/seo-audit`） |

标题说明：计划标题「canonical、noindex、hreflang：三个把自己挡在 AI 之外的设置」共 43 字，超过 frontmatter 的 40 字上限；发布标题压缩为「…三个自己挡 AI 的设置」（39 字），语义不变。

---

## 三、正文（与 `blog-drafts/canonical-noindex-hreflang.md` 逐字一致）

````markdown
---
title: "canonical、noindex、hreflang：三个自己挡 AI 的设置"
description: "AI 答案里没有你时，很多人第一时间去查 canonical、noindex 和 hreflang。但三者不是同一类问题：一个是硬屏蔽，一个是把内容归属判给别人，一个从不屏蔽、只决定哪一版给了谁。本文给出分诊表、三个藏身处的取证方法，以及修复顺序与验收标准。"
pubDate: 2026-11-01
category: "技术"
tags: ["GEO", "canonical", "noindex", "hreflang"]
author: "GEO 咨询团队"
---

## TL;DR / 核心要点总结

- **三项不是同一类问题。** `noindex` 是硬屏蔽，`canonical` 是把内容归属判给另一个 URL，`hreflang` 从不屏蔽、只告诉引擎这几页是同一内容的语言版本。
- **先分诊再动手。** 如果 Google 侧能正常收录和引用、只有 ChatGPT 缺席，这三项大概率不是原因——它们作用于索引层与归属层，解释不了抓取层与表达层。
- **三者藏的地方不一样。** `noindex` 可能藏在响应头或 CDN 规则里，源码里看不到；`canonical` 可能由 JavaScript 注入，不渲染的抓取器读不到。
- **修复顺序固定：** `noindex`（硬屏蔽）→ `canonical`（归属）→ `hreflang`（关联）。顺序反了，前一项的问题会掩盖后一项。
- **验收只认配置证据。** 同一个 URL，用纯 HTTP 头、指定爬虫 UA、渲染后 DOM 各取一次，三者一致才算修好。

---

## 一、先分诊：AI 答案里没有你，是哪一层出局？

「AI 不引用我」不是一个问题。按一次请求的顺序拆，页面可能在四层里的任何一层出局：抓取（请求有没有到）、索引（能不能进候选集）、归属（进的是不是这个 URL）、表达（内容能不能被摘走）。

`canonical`、`noindex`、`hreflang` 只作用于后两层中的一部分。先定位出局层，再决定查哪一项；直接上手改配置，很容易把一天花在并不是原因的地方。

| 你看到的现象 | 更可能出局在哪一层 | 这三项要不要查 |
| --- | --- | --- |
| `site:` 搜索里完全找不到这个页面 | 索引 | 要，先查 `noindex` |
| 搜得到，但 AI 答案里的链接指向另一个 URL | 归属 | 要，查 `canonical` |
| 中文版本正常，英文版本完全缺席 | 索引或归属 | 要，查 `canonical` 与 `hreflang` |
| Google 正常，只有 ChatGPT 里没有 | 抓取或表达 | 基本不用查，先看爬虫放行与正文直出 |
| 被引用了，但答案句选错了段落 | 表达 | 不用查 |

最后两行最容易误判。Google 的 AI 概览与 AI Mode 建在同一套索引上，所以索引层的卫生会同时影响 Google 侧的 AI 答案。

ChatGPT 搜索有自己的抓取与索引。OpenAI 的公开文档把 `noindex` 定位为阻止在搜索结果里展示链接与标题的开关，但没有把 `canonical` 与 `hreflang` 列为检索控制项。

据此能说的只有一句：这三项解释的是「Google 侧也缺席」的那类问题。对「Google 有、ChatGPT 没有」，它们不构成解释，先去看爬虫放行与正文直出。

抓取层与表达层的排查不在本文范围：前者见[AI 抓不到、也读不懂](/blog/ai-crawlers)，后者见[如何让 AI 引用你的网站](/blog/how-to-get-cited-by-ai)。

---

## 二、noindex：唯一的硬屏蔽，也是最容易被误触的

三者的性质差别决定了排查顺序。`noindex` 是其中的硬屏蔽：它把页面排除在索引之外，经典搜索与 Google 侧的 AI 答案会同时失效。

它的载体不止一个。页面里的 `<meta name="robots">`、响应头里的 `X-Robots-Tag`、以及 CDN 或边缘规则下发的同名字段，效果完全相同，取证位置完全不同。

| 载体 | 在哪里看 | 典型来源 |
| --- | --- | --- |
| `<meta name="robots">` | 页面源码的 `<head>` | CMS 模板、测试环境遗留 |
| `X-Robots-Tag` | `curl -sI` 返回的响应头 | 服务器配置、反向代理 |
| 边缘规则 | CDN 控制台 | 临时下线、区域限制、按 UA 差异化 |

- **`noindex` 与 robots.txt 会互相掩盖。** 想让 AI 不索引，用 `noindex` 没问题；但爬虫必须先抓到页面才读得到这个标签。同时用 robots.txt 禁止抓取，`noindex` 永远不会生效，页面仍然留在索引里。
- **按 UA 下发的指令最难发现。** 同一个 URL 对普通浏览器返回正常页面，对 AI 爬虫返回另一套响应头或状态码，只看源码永远查不出来。

失败指纹按范围就能分：多个不相关页面同时消失，先查边缘规则；只有个别页面消失，先查模板与响应头；只有某个 UA 看不到，就按 UA 逐个取一次响应头。

最直接的两条命令是看响应头与看原始 HTML：

```bash
curl -sI https://example.com/page | grep -i x-robots-tag
curl -s  https://example.com/page | grep -i 'name="robots"'
```

再换一个爬虫 UA 取同一地址，对比两次结果。具体的 UA 字符串从爬虫日志或官方文档里取，不要凭记忆拼。

---

## 三、canonical：不是屏蔽，是把归属判给别人

`canonical` 与 `noindex` 常被并列讨论，但它们不是同一种东西。Google 官方把 `rel=canonical` 定位为合并重复 URL 的提示，而不是强制指令。写错的结果不是页面消失，而是你主动声明：这一页的代表 URL 是另一个。

四种错法最常见：模板默认值指向首页；跨语言互指；分页与筛选页互相归并；由 JavaScript 注入，导致不渲染的抓取器读不到。

| 错法 | 你会看到 | 为什么难发现 |
| --- | --- | --- |
| 模板默认指向首页 | 大量页面声明「代表 URL 是首页」 | 单页检查时看起来完全正常 |
| 跨语言互指 | 一种语言版本从索引里消失 | 两个版本都能打开，只是一个不参与 |
| 分页、筛选页归并 | 深层内容进不了候选集 | 用户点得到，抓取器把它合并了 |
| JavaScript 注入 | 部分抓取器视为没有 canonical | 浏览器里一切正常 |

改版后集中出现这类问题，成因与排查顺序见[迁移与改版后的引用排查](/blog/ai-citations-drop-after-migration)。

AI 侧的边界要说清楚。Google 的 AI 界面与经典搜索同索引，这里的归并会间接决定你在 Google 侧 AI 答案里的资格；对自建索引的引擎，公开文档没有说明它们会像 Google 一样执行归并。

所以「canonical 修好了，AI 就会引用我」不是可以承诺的因果。能承诺的只有一条：写错时，你主动把归属交给了另一个 URL。

失败指纹是：页面能打开、能被搜到，但 AI 答案给出的链接是另一个 URL——首页、另一个语言版本，或者去掉参数的版本。看到这个现象再查 `canonical`，比无条件全站扫一遍更有针对性。

取证分两步：源码里确认 `canonical` 指向页面自身；再用不执行 JavaScript 的抓取，确认这条标签在原始 HTML 里就存在。跨语言互指的具体修法，见[中英文站点的引用落差排查](/blog/bilingual-site-ai-visibility)。

---

## 四、hreflang：从不屏蔽，只决定哪一版给了谁

`hreflang` 与另外两项不属于同一类。它既不控制抓取，也不控制索引；它表达的是一组关系——这几页是同一内容的不同语言或地区版本。配置错误的后果是整组标注被忽略，而不是页面从索引里消失。

完整标注要求三件事齐备：每个版本自引用；双向互指，A 指向 B 时 B 也指向 A；整组有一个 `x-default`。缺任何一项，都可能让整组标注失效。

它和 `canonical` 的关系最容易出错。`canonical` 必须指向同语言版本自身；如果 `hreflang` 声明这几页等价，而 `canonical` 说代表 URL 是另一个语言版本，两条信号互相矛盾，通常以 `canonical` 为准，结果是某个语言版本被合并掉。

AI 侧该怎么期待：公开文档没有把 `hreflang` 列为自建索引引擎的检索输入。所以它不该被当成 AI 可见度的开关。它真正影响的是 Google 侧的语言匹配，以及多个语言版本之间会不会互相稀释。

失败指纹：搜英文关键词，返回的却是中文页面的标题；或者某一语言版本完全没有出现在候选结果里，但页面本身访问正常。

---

## 五、三个藏身处：源码、响应头、边缘

三项设置看起来都在页面里，实际可能出现在三个地方，检查方式完全不同。

| 藏身处 | 能看到什么 | 检查方式 |
| --- | --- | --- |
| 原始 HTML | `meta robots`、`link rel=canonical`、`link rel=alternate hreflang` | 查看源代码，不用「审查元素」 |
| 响应头 | `X-Robots-Tag`、`Link` | `curl -sI`，逐个 UA 取一次 |
| 边缘与 CDN | 按路径、地区、UA 下发的规则 | 控制台看规则，或对比不同 UA 的响应 |

有一条纪律要先立住：本地或浏览器里看到的正常，不构成证据。同一个 URL 在不同 UA、不同边缘节点上可能拿到不同的响应头；由脚本注入的标签，在不执行 JavaScript 的抓取器眼里等于不存在。

先用站内工具做第一轮筛查是划算的。免费的 [Crawler Access Test](/tool) 会用多个爬虫 UA 探测同一批 URL，快速看出放行状态与响应差异。但要记住它的边界：它回答「抓不抓得到」，不回答 `canonical` 指向哪、`hreflang` 是否成组。

后者仍然要回到源码与响应头里逐条看。工具给的是线索，配置本身才是证据。

---

## 六、修复顺序与验收：先硬屏蔽，再归属，最后关联

顺序不是习惯问题，是依赖问题。`noindex` 没解除，后两项改得再对，页面也不在候选集里；`canonical` 没统一，`hreflang` 的整组标注仍然会和它打架。

| 顺序 | 动作 | 通过标准 |
| --- | --- | --- |
| 1 | 解除 `noindex` 的三个来源 | 三种取法都拿不到 `noindex`，关键爬虫取到的是正常状态码 |
| 2 | 统一 `canonical` | 每页指向自身，原始 HTML 里可见，与 `hreflang` 不冲突 |
| 3 | 修正 `hreflang` 组 | 自引用、双向、`x-default` 齐备，且与 `canonical` 同语言 |

验收时不要把两本账记在一起。索引状态与 AI 答案里的实际引用不是同步变化的两个指标，前者恢复不代表后者立刻跟上。

判断修没修好，看配置证据；判断有没有效果，看引用证据。引用怎么记录，见[三关拆解](/blog/how-to-get-cited-by-ai)里的测量方法。

---

## 行动清单

### 今天做

- [ ] 用 `curl -sI` 取三个代表性页面（首页、一个栏目页、一篇内容页）的响应头，记录 `X-Robots-Tag` 与 `Link`
- [ ] 在源码里确认这三页的 `canonical` 是否指向自身
- [ ] 用两个不同 UA 各取一次同一 URL，比对状态码与响应头

### 本周做

- [ ] 抽样一批主要页面，批量确认 `canonical` 自指与 `noindex` 缺失
- [ ] 检查 CDN 与边缘规则，确认没有按 UA 或地区下发的索引指令
- [ ] 多语言站点核对 `hreflang` 三件套：自引用、双向、`x-default`

### 本月做

- [ ] 把三项检查写进模板验收，新页面发布前自动过一遍
- [ ] 建立索引状态与 AI 引用的两本账，分开记录、分开判断

---

## 结语

这三项设置的价值，不在于「改完就会被引用」。它们更像资格线：不修，永远没有资格；修了，也只是回到同一起跑线。

真正决定 AI 会不会引用你的，是抓取之后的实体、证据与可摘性。实体怎么写见[结构化数据指南](/blog/structured-data-guide)，整条路径的顺序见[GEO 优化怎么做](/blog/how-to-do-geo)。

所以排查时别把它们当成增长手段。它们筛掉的是「本来就不该缺席却缺席」的那一类问题，而这一类通常最便宜，也最容易被忽略。

---

## 📩 需要帮助？GEO 咨询团队可以为你做什么

三项设置查完仍然缺席，说明问题不在指令层。我们可以把这一步并入一次完整的 SEO 全站诊断，与技术通道、实体层、内容可提取性一起出具。

- **自我屏蔽核查**：逐页核对 `canonical`、`noindex` 与 `X-Robots-Tag`，区分源码、响应头与边缘注入三种来源
- **技术通道体检**：AI 爬虫放行、渲染方式与内容一致性一并检查
- **诊断报告**：每条发现带现象、证据、影响与修复方向

[了解 SEO 全站诊断服务 →](/services/seo-audit)

---

*本文依据 Google Search Central 关于 canonical、noindex 与 hreflang 的官方文档口径，以及 OpenAI 关于 OAI-SearchBot 与 noindex 的官方说明整理。对自建索引引擎的判断以公开文档是否给出明确口径为界，未公开的部分不作推断。本文不含搜索量、引用率或见效周期数据。*
````

---

## 四、内链表

| 链接 | 层级 | 为什么现在需要点它 |
|---|---|---|
| `/blog/how-to-do-geo` | 上游（方法论） | 读者想知道这三项在整体 GEO 顺序里排第几层，避免把资格线当成全部工作 |
| `/blog/structured-data-guide` | 上游（实体层） | 索引层修好后，下一个工作面是「AI 确认你是谁」，这是实体层的入口 |
| `/blog/ai-crawlers` | 平级（抓取层） | 分诊表里「Google 正常、ChatGPT 没有」这一行的下一步，就是抓取与渲染排查 |
| `/blog/how-to-get-cited-by-ai` | 平级（表达层） | 索引与归属通了仍不被引用，问题在采信与摘录，以及引用率怎么记 |
| `/blog/bilingual-site-ai-visibility` | 平级（多语言） | 看到「跨语言互指」这一行错法时，需要更细的语言版本排查 |
| `/blog/ai-citations-drop-after-migration` | 平级（迁移场景） | 问题是改版后才出现的，成因与修复顺序在那篇 |
| `/tool` | 下游（工具） | 想先低成本确认「抓不抓得到」，再决定是否手工取证 |
| `/services/seo-audit` | 下游（商业） | 自查做完仍缺席，需要一次完整的技术与内容诊断 |

---

## 五、CTA

- 目标：`/services/seo-audit`（SEO 全站诊断）
- 匹配理由：Diagnosis / Informational 型意图。读者的问题已经收敛到「配置是否在挡自己」，下一步是核查与诊断，而不是内容改写或采购决策；因此不走 `/contact`，也不强推 `/services/geo-optimization`。

---

## 六、Sources / References

| 口径 | 来源类型 | 用途 |
|---|---|---|
| `rel=canonical` 为提示而非强制指令 | Google Search Central《Consolidate duplicate URLs》 | 第三节核心判断 |
| `noindex` 指令语义 | Google Search Central《Robots meta tag and X-Robots-Tag specifications》 | 第二节 |
| `hreflang` 三件套（自引用、双向、x-default） | Google Search Central《Localized versions of your pages》 | 第四节 |
| AI 功能与经典搜索使用同一索引 | Google Search Central《AI features and your website》 | 第一节分诊边界 |
| 阻止在 ChatGPT 搜索中展示链接与标题用 `noindex`、爬虫须能抓到页面才读得到 | OpenAI 官方 Bots 文档 | 第一节、第二节 |
| 各引擎爬虫分工与官方口径汇总 | 站内 `/blog/geo-2026-08-26-ai-citation-guide` | 交叉引用 |
| 工具能力与边界 | 站内 `src/pages/tool.astro`（Crawler Access Test） | 第五节 |

---

## 七、SEO Checklist

- [x] Title 39 字（≤40），含核心判断
- [x] Meta Description 129 字（80–160）
- [x] Slug = 主关键词英文 kebab-case，非日期
- [x] 6 个编号 H2，每个回答一个独立子问题
- [x] 内链全部为站内真实路由、无尾斜杠
- [x] 无孤立 `#标签`、无跨行断裂粗体
- [x] 主关键词在 Title / Description / TL;DR / H2 中自然出现
- [x] 无「随着…的发展」类开场

## 八、GEO Checklist

- [x] 每个 H2 首段给出可直接摘走的答案句
- [x] 实体明确：Google Search Central、OpenAI、OAI-SearchBot、AI Overviews、AI Mode、Crawler Access Test、`X-Robots-Tag`
- [x] 结构化信息：4 张表（分诊 / 载体 / 错法 / 藏身处 / 顺序）+ 命令行示例
- [x] 条件判断明确：「Google 有、ChatGPT 没有」时不用查这三项
- [x] 事实边界：对自建索引引擎只写「公开文档没有说明」，不推断行为
- [x] 无百分比断言、无虚构案例、无效果承诺

## 九、A–G 质检

| 维度 | 结论 | 说明 |
|---|---|---|
| A. Intent | 通过 | 回答「AI 答案里没有我，该查哪一项索引配置」，与标题一致 |
| B. Cannibalization | 通过（评分 1） | 与 Day 4 是「迁移事件排查 vs 常青分诊」；与 Day 5 是「多语言站点 vs 非多语言站点 + 三者性质分类」；未复用旧文结构 |
| C. SEO | 通过 | Title / Meta / slug / H2 / 内链均符合规范 |
| D. GEO | 通过 | 有可摘答案、实体清晰、结构化信息充分、结论有官方依据 |
| E. E-E-A-T | 通过 | 官方来源逐项标明；无虚构案例、无百分比；未把第三方口径说成自有 |
| F. Commercial | 通过 | CTA 为 `/services/seo-audit`，与诊断型意图匹配 |
| G. Internal Links | 通过 | 上游（how-to-do-geo、structured-data-guide）+ 平级（ai-crawlers、三关、多语言、迁移）+ 下游（工具、诊断服务）三层齐备，路由全部真实 |

脚本结果：`BROKEN LINKS: none`｜`over 150 chars: none`｜`percent assertions: none`｜`hanzi 2923`｜`title 39`｜`desc 129`｜`tags 4`｜`category 合法`。

---

## 十、执行报告

```text
GEOVA Day 19 执行报告

状态：
✅ 已发布（2026-11-01）

标题：
canonical、noindex、hreflang：三个自己挡 AI 的设置

Search Intent：
Informational

核心价值：
把三项索引配置按性质分成三类——硬屏蔽、归属判定、版本关联——并给出分诊表：先判断出局在哪一层，再决定查不查。补上现有文章都没有的两点：三项里只有 noindex 真能挡住 AI；「Google 有、ChatGPT 没有」时这三项不构成解释。

与旧文冲突：
部分重叠（评分 1）。与 Day 4 是「迁移事件排查 vs 常青分诊」；与 Day 5 是「多语言站点 vs 通用站点」；计划书「全站无覆盖」的结论已过时，本次按现状重评。

主要内链：
/blog/how-to-do-geo
/blog/structured-data-guide
/blog/ai-crawlers
/blog/how-to-get-cited-by-ai
/blog/bilingual-site-ai-visibility
/blog/ai-citations-drop-after-migration
/tool
/services/seo-audit

CTA：
自我屏蔽核查 → SEO 全站诊断（/services/seo-audit）

事实风险：
中。本机到 Google Search Central 与 OpenAI 文档的网络不可达（代理未启动），官方口径沿用站内已核验版本的表述，未新增未经核验的平台声明。发布前建议在有网络时复核 canonical「提示」定位、noindex 与 X-Robots-Tag 语义、hreflang 三件套、AI 功能同索引四条。

是否包含自有数据：
否

是否需要人工核验：
是（上述四条官方口径）

文件：
src/content/blog/canonical-noindex-hreflang.md
GEOVA_Day19_canonical-noindex-hreflang.md
```

---

## 十一、发布与线上验证

| 项 | 结果 |
|---|---|
| 发布提交 | `0b9c627` feat(blog): publish canonical-noindex-hreflang (Day 19) |
| 进度表提交 | `9536b71` chore(content): mark Day 19 published in geo-day-content progress table |
| 构建 | `npx astro build` 通过；`dist/blog/canonical-noindex-hreflang/index.html` 生成 |
| 本地产物 | Title / H1 / 10 个 H2 / canonical 正确；BlogPosting、BreadcrumbList、Organization 均存在；`dist/sitemap-0.xml` 含新 URL |
| 线上 URL | https://www.geova.cn/blog/canonical-noindex-hreflang/ ｜ 2026-11-01 推送后第 4 次探测返回 200 |
| 线上 Title / H1 | 与 frontmatter 一致 |
| 线上 H2 数 | 10 |
| 线上 canonical | `https://www.geova.cn/blog/canonical-noindex-hreflang/` |
| 线上 Schema | BlogPosting、BreadcrumbList、Organization |
| 线上 sitemap | `sitemap-0.xml` 已含 `/blog/canonical-noindex-hreflang/` |
| 线上内链可达 | 8 条内链全部 200（`bilingual-site-ai-visibility` 首次探测 000，重试三次均 200，判定为网络抖动） |
| 草稿残留 | 线上页面无「待编辑确认 / 选点说明 / 日报改写」 |
