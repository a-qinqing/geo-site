# GEOVA Day 17 执行包｜内链与实体：把 SEO 内链策略升级到 AI 可理解的实体层

## 一、Pre-Writing Audit

### 1. Search Intent

用户已经有一套 SEO 内链做法（栏目 silo、关键词锚文本、页脚互链），也知道 AI 搜索在改变流量入口，但不清楚内链在 AI 抓取与实体理解里到底起什么作用、哪些做法要改、改完怎么验收。典型角色是 SEO 负责人、技术 SEO、内容运营与站点开发者。

用户处于「SEO 基础已有、准备做 GEO 技术层改造」的阶段。搜索这个问题，是因为内链是站内完全可控、改造成本低的资产，但现有 GEO 内容多讲内容和 Schema，很少把「链接结构」单独拆开讲。

本文不解决：外链建设、Schema 部署细节（`structured-data-guide` 已写）、品牌实体归属治理（`brand-entity-ownership` 已写）、抓取通道故障（`ai-crawlers` 已写）、站点迁移断点（`ai-citations-drop-after-migration` 已写）、引用率提升承诺。

### 2. Existing Content Conflict 评分：1（部分重叠但有新价值）

| 旧文 | 重叠点 | 本文边界 |
|---|---|---|
| `how-to-do-geo` 第 2 层 | 同讲实体层 | 旧文讲实体标记、全站一致、第三方档案；本文只讲链接结构这一件事 |
| `structured-data-guide` | 同讲实体与机器可读 | 旧文讲 Schema/JSON-LD 部署；本文讲页面之间的链接关系，不重复 Schema 写法 |
| `brand-entity-ownership` | 同讲品牌实体 | 旧文讲自述、一致性、交叉确认三层治理；本文讲站内链接如何给实体命名与连关系 |
| `content-retrofit-ai-citation` | 同讲存量改造 | 旧文明确把「URL 与导航」列为站点级动作、应单独成批；本文正是那个单独批次 |
| `ai-crawlers` | 同讲抓取 | 旧文排查 robots/CDN/JS/HTML 六个断点；本文假设通道是通的，只查链接图 |
| `seo-audit-geo-checklist` | 同属 SEO×GEO 审计 | 旧文是审计检查项总表；本文是「内链」这一项的深挖与操作模板 |
| `google-ai-mode` §内链 | 同讲子答案互链 | 旧文只有两段原则；本文是完整的三层方法与验收表 |

评分 1：有明确重叠，但现有文章没有一篇系统讲「内链结构如何影响 AI 抓取路径与实体理解」。

### 3. Unique Value

把 SEO 内链升级拆成发现层 → 语义层 → 关系层三层：发现层解决「抓得到吗」，语义层解决「认得出吗」，关系层解决「连得上吗」。交付三张可直接用的表（孤儿页指纹表、锚文本改写表、实体词表）＋一张三层审计表＋四个不依赖引用率的验收信号。站内现有文章没有这套链接结构方法。

### 4. 数据与边界

- 主关键词「内链 AI 抓取」不在 V2.2 / V2.3 词库内，标注「待 SERP 验证」，不编造搜索量或 KD。
- 机制口径只使用 Google Search Central 官方文档（《Link best practices》《AI features and your website》），已通过代理核对原文；「发现层 / 语义层 / 关系层」标注为 GEOVA 工作框架，不是平台官方口径。
- 不声称内链与 AI 引用率存在统计相关性；不使用百分比断言；不虚构客户案例或改造前后数据。
- Day 21 / 23 / 24 的合并规则不适用本篇。

---

## 二、Article Metadata

| 字段 | 内容 |
|---|---|
| Title | 内链与实体：把 SEO 内链策略升级到 AI 可理解的实体层 |
| Meta Description | 内链不只是导航。它决定 AI 抓取器能否发现页面，也决定锚文本能否把「这是什么实体、和谁有关」说清楚。本文把内链升级拆成发现、语义、关系三层，给出审计表、锚文本改写模板与验收口径。 |
| H1 | 由 frontmatter `title` 渲染，正文不写 H1 |
| 主关键词 | 内链 AI 抓取（待 SERP 验证，不在 V2.2 / V2.3 词库内） |
| 次关键词 | 实体内链、内链结构、抓取路径 |
| Search Intent | Informational |
| 内容类型 | 技术方法（SEO + GEO 交叉） |
| 优先级 | P1 |
| Topic Cluster | SEO + GEO（承接 `/services/seo-audit`） |
| 目标 URL | `/blog/internal-links-ai-crawling` |
| 建议内链 | `/blog/geo-vs-seo-difference`、`/blog/how-to-do-geo`、`/blog/structured-data-guide`、`/blog/brand-entity-ownership`、`/blog/ai-terminology-mapping`、`/blog/ai-crawlers`、`/blog/seo-audit-geo-checklist`、`/tool`、`/services/seo-audit`、`/services/geo-audit` |
| CTA | SEO 全站诊断 → `/services/seo-audit`（辅助 `/tool`、`/services/geo-audit`） |

---

## 三、正文（与 `src/content/blog/internal-links-ai-crawling.md` 逐字一致）

```markdown
---
title: "内链与实体：把 SEO 内链策略升级到 AI 可理解的实体层"
description: "内链不只是导航。它决定 AI 抓取器能否发现页面，也决定锚文本能否把「这是什么实体、和谁有关」说清楚。本文把内链升级拆成发现、语义、关系三层，给出审计表、锚文本改写模板与验收口径。"
pubDate: 2026-10-31
category: "技术"
tags: ["GEO", "内链", "AI抓取", "实体优化"]
author: "GEO 咨询团队"
---

## TL;DR / 核心要点总结

- **内链在 AI 搜索里做两件事：让抓取器发现 URL，用锚文本说明「这是什么实体、和谁有关」。**
- **升级顺序：发现层 → 语义层 → 关系层。** 跳过发现层改锚文本，等于给抓不到的页面贴标签。
- **发现层硬规则：关键页至少有一条站内 `<a href>`；sitemap 不能替代内链。**
- **语义层把「点击这里」换成「实体名 + 角色」；关系层用枢纽页与回链写出四类实体关系。**
- **内链不保证引用，只保证进入候选集、实体被认对；平台未公开内链在 AI 引用中的权重。**

---

## 一、内链在 AI 搜索里到底影响什么

很多站点做 GEO，先改标题和段落，最后才看内链。顺序反了：抓取器要先沿链接走到 URL，才有机会用到它；走到之后，锚文本又在告诉系统这个页面是谁。

Google Search Central 的 AI 功能文档把「通过站内内链让内容更容易被找到」列为仍值得做的 SEO 基础项。本文把它拆成发现、语义、关系三层；不承诺引用率，也不谈外链。

> **直接回答：内链的 AI 价值不在「传递权重」，而在两个可验证的结果——页面能被抓到，实体能被认对。顺序是发现层 → 语义层 → 关系层。**

Google 的链接最佳实践写明：链接被用来判断页面相关性、发现新页面；通常只有带 href 的 `<a>` 才能被可靠抓取。对 AI 功能，候选页还须先被索引、允许展示摘要；没有额外技术要求。内链首先决定「有没有资格进候选集」，不是「会不会被引用」。

同一文档还提到，内部链接的锚文本帮助人和 Google 理解站点。对 AI 搜索，锚文本还在给实体命名：同一产品叫三种名字，系统拿到的是三个模糊标签。这是机制推断；能确认的是参与理解，不是引用率。

| 作用 | 官方口径 | 对 GEO 的含义 | 不能推出 |
| --- | --- | --- | --- |
| 发现 URL | 用链接发现新页面；通常只解析带 href 的 `<a>` | 孤儿页、JS 链接可能进不了抓取 | 有内链就一定被索引 |
| 标注页面 | 锚文本帮助理解被链接页面 | 锚文本是站内可控的实体标签 | 改锚文本就能提高引用率 |
| 连接关系 | 内部链接帮助理解站点结构 | hub-spoke 让子问题页形成证据簇 | 链接越多越好 |

本文以 Google 公开文档为基准；其他引擎抓取来源不同，做法可迁移，效果不能换算。验收看三个前置信号：关键页有入链、日志里出现、锚文本与实体名一致。

## 二、SEO 的内链做法，缺的是哪三块

传统 SEO 的内链目标通常是三件事：让爬虫找到页面、分配权重、用关键词锚文本强化相关性。这三件事在 AI 搜索里仍成立，但不够。

| 传统做法 | 在 AI 搜索里缺什么 | 升级动作 |
| --- | --- | --- |
| 关键词锚文本 | 关键词不等于实体名；多个叫法会稀释身份 | 建实体词表，锚文本用「标准名 + 角色」 |
| 按栏目做 silo | query fan-out 会把问题拆成子查询，需要证据簇 | 每个 hub 下配齐子问题页，做回链与横链 |
| 用排名和流量验收 | 抓取与索引发生在排名之前 | 增加抓取日志、索引状态、锚文本一致性 |
| 靠 sitemap 兜底 | sitemap 只列 URL，不表达页面关系 | 关键页至少一条站内上下文链接 |

对应三个升级方向：发现层、语义层、关系层。一次审计只问三个问题：抓得到吗、认得出吗、连得上吗。

和内链最容易混淆的是 Schema、About 页与 sitemap：它们描述实体或列出 URL，但都不替代站内上下文链接。分工见 [结构化数据指南](/blog/structured-data-guide) 与 [品牌实体归属治理](/blog/brand-entity-ownership)；差异见 [GEO 和 SEO 的区别](/blog/geo-vs-seo-difference)。

## 三、发现层：先让重要页面有路可走

> **直接回答：关键页至少有一个站内页面用可抓取的 `<a href>` 链过去；sitemap、导航搜索框、JS 跳转都不算这条链接。**

Google 的规则很朴素：你关心的每个页面，至少应从站内另一个页面获得一条链接。对 AI 搜索，这条链接把页面送进抓取队列；抓不到，内容与实体都无从谈起。

先列「必须被引用」的页面：服务页与产品页、核心方法文与术语页、关于页与作者页、案例页与证据页。收敛到一二十个 URL 再做审计。

| 失败指纹 | 怎么取证 | 修复动作 |
| --- | --- | --- |
| 没有任何 `<a href>` 指向它 | 站点爬虫导出 Inlinks，筛选入链为 0 | 从上级页与两个平级页补上下文链接 |
| 链接由 JS 注入或绑在 onclick 上 | 查看源代码，搜目标 URL；对比渲染后 DOM | 改成服务端输出的 `<a href>` |
| 只出现在 sitemap 或页脚 | 看链接位置与上下文 | 在正文或栏目页补一条有语义的链接 |

页脚链接缺少上下文，适合兜底，不适合当主路径。点击深度没有官方阈值，用同批关键页横向比较；路径是否合理，比深度数字更重要。

有入链却抓不到，问题可能在抓取通道。排查线见 [AI 抓不到、也读不懂](/blog/ai-crawlers)；本文假设通道是通的。

## 四、语义层：把锚文本写成实体标签

> **直接回答：锚文本不是关键词位，而是被链接页面的「名字 + 角色」。能写「GEO 审计检查项」就不要写「点击这里」。**

Google 的标准：描述性、简洁、与所在页和目标页相关。执行：只看链接文字，也能猜出点过去看什么。

对 AI 搜索，锚文本还在给实体命名；同一实体全站多个叫法，标签就互相稀释。

| 坏写法 | 好写法 | 差别 |
| --- | --- | --- |
| 点击这里 / 了解更多 | GEO 审计检查项 / AI 爬虫访问排查 | 说清目标页主题与角色 |
| 这篇 / 产品 | 存量内容改造顺序 / GEO 优化服务 | 把页面类型与范围写出来 |
| 我们 | GEOVA 咨询团队 | 给实体名，不给代词 |

原则：名字 + 角色 + 必要的限定。建一张实体词表，写锚文本、改版、对 Schema 与站外档案都用它。方法见 [术语映射](/blog/ai-terminology-mapping)。

| 实体 | 标准名 | 允许别名 | 页面角色 | 目标 URL |
| --- | --- | --- | --- | --- |
| GEO 优化服务 | GEO 优化服务 | GEO 服务 | 商业服务页 | `/services/geo-optimization` |
| GEO 审计 | GEO 审计 | GEO 人工诊断 | 诊断服务页 | `/services/geo-audit` |
| 免费工具 | GEO 站点健康度诊断 | 免费工具 | 工具页 | `/tool` |
| GEO 方法 | GEO 优化怎么做 | 五层顺序 | 方法枢纽页 | `/blog/how-to-do-geo` |

三条纪律：一条链接只服务一个意图；不重复链同一 URL；不为关键词硬造锚文本。锚文本是必要项，不是充分项。

## 五、关系层：用链接写出实体之间的关系

> **直接回答：关系层不是多放几条相关文章，而是用链接回答四个问题：谁属于谁、谁证明谁、谁和谁分工、谁是谁的上位或同义。**

单页能被摘走，但 AI 答案要跨页组织事实：服务页说能力，案例页说证据，方法文说做法，关于页说你是谁。链接把这些页面连成同一个实体。

AI Mode 这类入口会用 query fan-out 把复杂问题拆成多个子查询；一个 hub 下要配齐子问题页，子页之间能互相走到，否则每个子页都是孤岛。

| 关系 | 谁链谁 | 锚文本示例 | 目的 |
| --- | --- | --- | --- |
| 归属 | 产品页或服务页 → 关于页 | GEOVA 咨询团队 | 把页面归到品牌实体 |
| 证据 | 方法文或主张 → 案例页 | 这次改造的验收记录 | 让结论有可核查的证据 |
| 分工 | 问题页 → 方法页 → 工具页 → 服务页 | 先用免费工具自查 | 沿商业路径送用户 |
| 上下位 | 术语页 → 定义页 → 相关术语 | 什么是 GEO | 建立概念层级 |

方向要稳定：归属向上，证据向旁，分工向下，上下位双向。枢纽页要像 [GEO 优化怎么做](/blog/how-to-do-geo) 那样：自己完整、向下链子问题、接收子页回链。

目标结构不是现状；先画图再改链接。全站互链和自动相关插件都不算关系层：前者制造噪声，后者无法表达「谁证明谁」。

## 六、三层一起怎么查：一张审计表

> **直接回答：按发现、语义、关系三层各查三项，输出一张「页面—入链—锚文本—关系」表；先用一二十个关键页抽检，再决定是否全站铺开。**

| 层级 | 要回答的问题 | 通过标准 | 取证方式 |
| --- | --- | --- | --- |
| 发现 | 抓得到吗 | 关键页至少一条站内 `<a href>`；不是孤儿 | 爬虫导出 Inlinks；查看源代码 |
| 语义 | 认得出吗 | 锚文本能独立说明目标页；实体名一致 | 锚文本清单；实体词表比对 |
| 关系 | 连得上吗 | 每个 hub 有向下链接；每个子页有回链 | 手画关系图；抽查正文链接 |

30 分钟快查：列一二十个关键 URL；查入链；抄下锚文本；问每个页面的 hub 与回链；只记问题先不改。快查只为判断值不值得做完整审计：大量孤儿先修发现层，锚文本泛称先修语义层。

验收看四个信号：原始 HTML 有 `<a href>`；孤儿页入链从 0 变 1；遮住目标页仍能看懂锚文本；抓取日志出现目标 URL。

不要用引用率验收。Google 说抓取要几天到几个月，引用还受内容与模型变化影响。并进审计时见 [SEO 审计如何加 GEO 检查项](/blog/seo-audit-geo-checklist)。

## 七、五个常见错误

1. **只交 sitemap，不补内链。** sitemap 是发现补充，不建立关系。
2. **把「点击这里」当锚文本。** 它没告诉读者和系统目标页是什么。
3. **在页脚堆链接。** 页脚缺少上下文，适合兜底，不适合承载主要关系。
4. **同一实体全站多个叫法。** 产品名、服务名、旧名混用，锚文本互相打架。
5. **链到 JS 注入、重定向或 noindex 页面。** 链接存在但目标不可抓，等于没链。

## 八、行动清单

### 今天做

- [ ] 列出 10 个「用户问到时必须由我们回答」的页面，标出目标 URL。
- [ ] 抽查 3 个页面的入链：查看源代码，搜站内路径，确认不是孤儿。
- [ ] 把正文里 3 处「点击这里 / 了解更多」改成「实体名 + 角色」。

### 本周做

- [ ] 建一张实体词表：标准名、别名、页面角色、目标 URL。
- [ ] 给每个关键 hub 补三条向下链接，给子页补回链；导出 Inlinks，记录孤儿页。

### 本月做

- [ ] 完成一轮三层审计，按商业价值排序修复前 20 个页面。
- [ ] 在服务器或 CDN 日志里确认 AI 爬虫开始抓取修复后的 URL。

## 结语：先把路修通，再谈内容

内链是站内少数完全可控的实体信号。内容质量决定 AI 愿不愿意用你，内链结构决定 AI 能不能找到你、认不认得你。

先修路，再命名，最后连关系；三步做完再谈引用率。

---

## 📩 需要帮助？GEO 咨询团队可以为你做什么

如果你的站点页面很多，却说不清哪些页面该被 AI 引用、哪些链接在拖后腿：

- **[SEO 全站诊断](/services/seo-audit)**：抓取、索引、内链结构与实体一致性逐项查
- **[免费工具](/tool)**：先排除 AI 爬虫访问、结构化数据与正文可读性（不检查内链）
- **[GEO 人工诊断](/services/geo-audit)**：把内链问题放进整体 GEO 路线图

[查看 SEO 全站诊断 →](/services/seo-audit)

---

*本文为方法说明类内容。机制口径来自 Google Search Central 的《Link best practices》与《AI features and your website》官方文档（截至 2026 年 10 月）；「发现层 / 语义层 / 关系层」为 GEOVA 工作框架，不代表平台官方口径。文中不含自有实验数据，未引用效果类百分比；平台未公开内链在 AI 答案引用中的权重，相关表述已标注为机制推断。*
```

---

## 四、内链表

| 链接 | 类型 | 为什么现在点它 |
|---|---|---|
| `/blog/geo-vs-seo-difference` | 上级概念 | 先分清 SEO 争位置与 GEO 争引用的差异，再理解内链为什么要升级 |
| `/blog/how-to-do-geo` | 上游方法 | 把内链放回五层顺序，确认实体层在整个 GEO 工作中的位置 |
| `/blog/structured-data-guide` | 平级技术 | Schema 负责实体属性，本文负责页面关系，二者互补 |
| `/blog/brand-entity-ownership` | 平级实体 | 品牌自述与交叉确认，补足站内链接之外的实体治理 |
| `/blog/ai-terminology-mapping` | 平级语义 | 锚文本的实体命名需要统一的术语表 |
| `/blog/ai-crawlers` | 边界排查 | 有入链仍抓不到时，转去查 robots、CDN/WAF、状态码与 JS 渲染 |
| `/blog/seo-audit-geo-checklist` | 下游审计 | 把发现、语义、关系三层检查并进现有 SEO 审计 |
| `/services/seo-audit` | 商业 | 需要全站诊断时，直接进入 SEO 审计服务 |
| `/services/geo-audit` | 诊断 | 需要把内链问题放进整体 GEO 路线图时 |
| `/tool` | 工具 | 先排除 AI 爬虫访问、结构化数据与正文可读性三项基础问题 |

---

## 五、CTA

- 主 CTA：SEO 全站诊断 → `/services/seo-audit`
- 辅助：免费工具 `/tool`、GEO 人工诊断 `/services/geo-audit`
- 匹配理由：Informational / 技术方法意图，用户要的是「怎么查、怎么改、怎么验收」；SEO 全站诊断是承接内链审计与修复的商业入口，工具与 GEO 审计是自助和诊断替代项；不强制 `/contact`。

---

## 六、Sources / References

- Google Search Central，《Link best practices for Google》（官方文档，2026-10-31 通过代理核对）：
  - Google 把链接作为判断页面相关性的信号，并用链接发现新页面。
  - 通常只有带 `href` 的 `<a>` 元素才能被可靠抓取。
  - 你关心的每个页面，至少应从站内另一个页面获得一条链接。
  - 好锚文本应描述性、简洁、与所在页和目标页相关。
- Google Search Central，《AI features and your website》（官方文档，2026-10-31 通过代理核对）：
  - 页面必须被索引、并允许在 Google 搜索中展示摘要，才有资格作为 AI Overviews / AI Mode 的支持链接；没有额外技术要求。
  - 官方把「通过站内内链让内容更容易被找到」列为仍值得做的 SEO 基础项。
  - AI Overviews 与 AI Mode 可能使用 query fan-out，把查询拆成多个相关子搜索。
  - 不需要为 AI 功能创建新的机器可读文件或特殊 Schema。
  - 抓取可能需要几天到几个月。
- 站内文章：`/blog/how-to-do-geo`、`/blog/geo-vs-seo-difference`、`/blog/structured-data-guide`、`/blog/brand-entity-ownership`、`/blog/ai-terminology-mapping`、`/blog/ai-crawlers`、`/blog/seo-audit-geo-checklist`。
- 本文未引入新的外部数据；未使用百分比；未包含自有实验数据。

---

## 七、SEO Checklist

- [x] Title 30 字，≤40，含核心判断与主关键词
- [x] Meta Description 90 字，80–160，说明问题、方法、交付
- [x] 正文不写 H1，由 frontmatter `title` 渲染
- [x] 主关键词自然出现在 Title、开头、H2 与正文
- [x] 次关键词（实体内链、内链结构、抓取路径）自然出现，无堆砌
- [x] 8 个编号 H2，每个回答一个独立子问题
- [x] slug `internal-links-ai-crawling` 为非日期 kebab-case
- [x] 10 个站内真实路由、无尾斜杠
- [x] category「技术」在枚举内；tags 4 项
- [x] pubDate 2026-10-31（写作当天）

---

## 八、GEO Checklist

- [x] Direct Answer：开篇与三个关键小节均有可直接摘走的答案句
- [x] Entity：GEO、AI 抓取、实体、锚文本、枢纽页、发现层 / 语义层 / 关系层均有明确定义或上下文
- [x] Structured Information：7 张表（作用对照、传统做法升级、孤儿页指纹、锚文本改写、实体词表、关系类型、审计表）+ 行动清单
- [x] Evidence：机制口径标明 Google 官方文档；机制推断已标注；无百分比断言
- [x] 段落自包含：30 个散文段落全部 ≤150 字，结论前置
- [x] 品牌主语：关键结论句带「内链」「锚文本」「枢纽页」「审计」等明确主语
- [x] 无孤立 `#标签`、无跨行粗体、无未整理内容残留

---

## 九、A–G 质检

| 维度 | 结论 | 说明 |
|---|---|---|
| A. Intent | 通过 | 回答「内链如何影响 AI 抓取与实体理解、先改哪里、怎么验收」，与标题一致 |
| B. Cannibalization | 通过（评分 1） | 与 `how-to-do-geo` 的分工是「实体标记/一致性」vs「链接结构」；与 `structured-data-guide` 是「Schema 属性」vs「页面关系」；与 `content-retrofit-ai-citation` 是「页内改造」vs「站点级链接」；与 `ai-crawlers` 是「抓取通道」vs「链接图」；未复用旧文结构 |
| C. SEO | 通过 | Title / Meta / 关键词 / 层级 / slug / 内链均符合规范 |
| D. GEO | 通过 | 有可摘答案、实体清晰、结构化信息充分、结论有官方口径支撑 |
| E. E-E-A-T | 通过 | 官方文档明确署名；机制推断标注边界；无虚构案例、无百分比、无自有数据冒充 |
| F. Commercial | 通过 | CTA 为 `/services/seo-audit`，与 Informational + 技术审计意图匹配；辅助 `/tool`、`/services/geo-audit` |
| G. Internal Links | 通过 | 上游（`how-to-do-geo`、`geo-vs-seo-difference`、`structured-data-guide`）+ 平级（`brand-entity-ownership`、`ai-terminology-mapping`、`ai-crawlers`）+ 下游（`seo-audit-geo-checklist`、`/tool`、`/services/seo-audit`、`/services/geo-audit`）三层齐备，路由全部真实 |

脚本结果：`BROKEN LINKS: none`｜`over 150 chars: none`｜`percent assertions: none`｜`hanzi 2996`｜`title 30`｜`desc 90`｜`tags 4`｜`category 合法`。

---

## 十、执行报告

```text
GEOVA Day 17 执行报告

状态：
✅ 完成（已发布）

标题：
内链与实体：把 SEO 内链策略升级到 AI 可理解的实体层

Search Intent：
Informational

核心价值：
把 SEO 内链升级拆成发现层 → 语义层 → 关系层；交付孤儿页指纹表、锚文本改写表、实体词表、三层审计表与四个不依赖引用率的验收信号。站内现有文章没有系统讲链接结构如何影响 AI 抓取路径与实体理解。

与旧文冲突：
部分重叠（评分 1），已通过边界声明与内链定位处理；与 how-to-do-geo 的分工是「实体标记/一致性」vs「链接结构」，与 structured-data-guide 的分工是「Schema 属性」vs「页面关系」，与 content-retrofit-ai-citation 的分工是「页内改造」vs「站点级链接」，与 ai-crawlers 的分工是「抓取通道」vs「链接图」。

主要内链：
/blog/geo-vs-seo-difference
/blog/how-to-do-geo
/blog/structured-data-guide
/blog/brand-entity-ownership
/blog/ai-terminology-mapping
/blog/ai-crawlers
/blog/seo-audit-geo-checklist
/tool
/services/seo-audit
/services/geo-audit

CTA：
SEO 全站诊断 → /services/seo-audit（辅助 /tool、/services/geo-audit）

事实风险：
低（仅使用 Google 官方文档口径；机制推断已标注；无百分比、无自有实验数据、无客户案例）

是否包含自有数据：
否

是否需要人工核验：
否（主关键词不在词库，已标注「待 SERP 验证」）

文件：
src/content/blog/internal-links-ai-crawling.md
GEOVA_Day17_internal-links-ai-crawling.md
```

---

## 十一、线上验证结果（2026-11-01）

- 发布 commit：`78b2cd1`（`feat(blog): publish internal-links-ai-crawling (Day 17)`）
- 线上 URL：https://www.geova.cn/blog/internal-links-ai-crawling/
- HTTP 状态：200（经 `http://127.0.0.1:7897` 代理复验；Cloudflare 部署完成前曾返回 404）
- Title：`内链与实体：把 SEO 内链策略升级到 AI 可理解的实体层 | GEO 咨询`
- H1：与 frontmatter title 一致
- H2：11 个（8 个编号章节 + TL;DR + 结语 + CTA）
- Schema：BlogPosting + BreadcrumbList（ListItem）+ Organization / Person / WebPage
- canonical：https://www.geova.cn/blog/internal-links-ai-crawling/
- sitemap：`dist/sitemap-0.xml` 与线上 sitemap 均含新 URL
- 内链：10 个路由最终均 200（无尾斜杠写法会 308 到带斜杠版本，属站点既有行为）
- 构建：`npx astro build` 成功，未触发 IndexNow postbuild
