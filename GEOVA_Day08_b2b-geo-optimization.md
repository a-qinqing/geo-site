# GEOVA Day 08 执行包｜B2B 企业做 GEO：采购决策链上有 4 种提问，分别归谁管

- **状态**：✅ 已发布（2026-10-13）
- **线上**：https://www.geova.cn/blog/b2b-geo-optimization/ ｜ commit `1c609fe`
- **标题**：B2B 企业做 GEO：采购决策链上有 4 种提问，分别归谁管
- **日期**：2026-10-13
- **计划来源**：`GEOVA_30天内容战略与选题规划.md` → 第五节 B 桶 Day 8（行业 Pillar；**P0**）；语义审查第十节 10.4 **C 类「需要修改」已改题**（原标题「B2B 企业做 GEO，为什么产品页可能比博客更重要？」因与 `/blog/ai-citations-product-pages/` 实质同题被替换），原 Day 13「SaaS 场景」按 10.5 D 类并入本篇作一个 H2
- **发布用文件（canonical）**：`src/content/blog/b2b-geo-optimization.md`（由 `blog-drafts/b2b-geo-optimization.md` mv 而来）
- **本文件**：执行记录（审计 + 元信息 + 正文 + 清单 + 报告），正文与 canonical 文件逐字一致

---

## 一、Day 8 Pre-Writing Audit

### 1. Search Intent

- **用户真正想解决的问题**：B2B 企业被要求「做 GEO」，拿到的方法却都按页面类型（首页 / 产品页 / 博客）或按平台组织，套到自己公司不成立——因为同一份内容要面对采购决策链上四拨问法完全不同的人。用户要的是「这四拨人各问什么、各要什么材料、公司里谁负责」，而不是又一份 GEO 入门清单。
- **用户所处的阶段**：已认可 GEO 值得做，正在找**适合 B2B 的做法**，同时评估是否引入外部服务（Commercial Investigation）。
- **为什么会搜这个问题**：B2B 是「一份内容答不完所有人」的典型场景——决策链长、角色多、证据要求高，而市面上的 GEO 内容几乎都默认读者是内容站或 B2C。
- **本文不解决的问题**（边界）：
  - 不复述推荐名单的形成机制（品类归属 / 可比事实 / 第三方共识）→ 见 [品牌如何被 AI 搜索推荐](/blog/how-to-get-recommended-by-ai)
  - 不复述「产品页是引用占比最高页型」的实测结论 → 见 [产品页引用分布](/blog/ai-citations-product-pages)；本文只在 §二 末作边界提醒，不展开
  - 不教技术通道与实体层的部署顺序 → 见 [GEO 优化怎么做](/blog/how-to-do-geo)
  - 不教 JSON-LD / Schema 写法 → 见 [结构化数据与 Schema.org](/blog/structured-data-guide)
  - 不教内部术语与用户口语的映射做法 → 见 [你的产品叫法 AI 不认识](/blog/ai-terminology-mapping)
  - 不提供 B2B GEO 的对标基准数字或效果承诺（无自有实测数据，拒绝设基准）

### 2. Existing Content Conflict

**评分：1（有部分重叠，但本文存在明确新价值）**

| 对照旧文 | 重叠点 | 边界（本文不做什么） |
| --- | --- | --- |
| `/blog/how-to-get-recommended-by-ai/` | 都涉及 B2B 买家在 AI 里选供应商 | 那篇是**品牌级机制**（你为什么进不去名单）；本文是**组织级分工**（四类提问归谁管、缺哪份资产）。机制在 §一 只留一条结论并内链 |
| `/blog/ai-citations-product-pages/` | 原 Day 8 选题与它同题（产品页 vs 博客） | 已按规划 §10.4 改题；本文只在 §二 末写一句边界提醒，不复述其数据 |
| `/blog/ai-competitor-benchmark/` | 都用到「提问集」这一形式 | Day 2 的题测**对标竞品**（在场差 / 位次差 / 证据差）；本文的题测**分工是否成立**（每类题归谁、补哪份资产），§四 明确「两套题不要混用」 |
| `/blog/ai-terminology-mapping/` | 都涉及「说法对不上」 | Day 7 解决**用词层**（内部叫法 → 用户口语 → AI 词表）；本文解决**角色层**，用词只作一句内链 |
| `/blog/how-to-do-geo/` | 都讲落地顺序 | 那篇是五个工作面的**推进顺序**；本文是同一批工作面内部**按角色分工**，前提条件明确内链 |
| `/blog/brand-entity-ownership/` | 都涉及实体一致性 | 那篇是**品牌实体归属治理**；本文只在 §三 SaaS 用「两个版本打架会拆散实体」一句并内链 |
| `/blog/geo-content-strategy/`、`/blog/what-is-geo/` | 内容策略与 GEO 定义 | 均为薄文，本文不覆盖其议题，也不抢占其主关键词 |

**全站核实**：对 `src/content/blog/`（34 篇）检索 `B2B / 采购 / 决策链 / 角色 / 销售 / 技术文档 / 定价 / 责任` ——命中集中在 `ai-citations-product-pages`（B2B 买家评估的主战场）、`how-to-get-recommended-by-ai`（AI 在选供应商）与 `ai-terminology-mapping`（B2B 尤甚）三篇，**均为「B2B 背景」而非「B2B 角色分工」**。全站无任何一篇按采购角色组织内容责任人，评分 ≤1，可写。

**计划内风险复核**：Day 8 是全计划 **10 篇 P0** 之一，且为 B 桶（Enterprise / B2B）的首篇。本次写作判断：**保留成立**——它交付的是全站唯一一张「角色 × 提问 × 资产 × 主责」映射表与两处交接点诊断，属真实可交付物，不是换标题的关键词文章。

### 3. Unique Value

> **本文给 GEOVA 增加的唯一价值：全站首次把「B2B 做 GEO」从「把某个页面改好」升级为按采购决策链的**四类提问分工**——交付「角色 × 提问 × 证据资产 × 内部主责」映射表、两条规律（粒度反向 / 证据不可互换）、两处最容易断的交接点（销售不进内容流程、技术文档不在 GEO 范围内）、每月提问回收机制、一份 4×N 自测题清单，以及 SaaS 双路径（自助 / 企业采购）的分叉处理法。**

这一层为何空白：站内已有推荐名单机制（`how-to-get-recommended-by-ai`）、页型引用分布（`ai-citations-product-pages`）、对标提问集（`ai-competitor-benchmark`）与用词映射（`ai-terminology-mapping`），但**没有一篇处理「同一家公司的四拨人，在 AI 里问的是四类不同的问题，且答案归属不同负责人」这一组织层问题**——它恰是 B2B 客户「内容做了很多、四类提问都答不全」的结构性原因。

---

## 二、Article Metadata

| 项 | 内容 |
| --- | --- |
| **Title** | B2B 企业做 GEO：采购决策链上有 4 种提问，分别归谁管（31 字） |
| **Meta Description** | B2B 的 GEO 不是把某个页面改好，而是回答采购决策链上四类角色的四类提问：业务要场景与迁移代价，技术要集成与数据边界，采购要计价口径，高层要第三方共识。本文给出一张「角色 × 提问 × 资产 × 主责」映射表、两处最容易断的交接点、一份 4×N 自测题清单，以及 SaaS 双路径的分叉处理法。（150 字） |
| **H1** | 与 Title 一致（站点模板 `src/pages/blog/[...slug].astro` 直接渲染 `post.data.title` 为 H1，两者共用一个字段） |
| **Primary Keyword** | B2B企业GEO优化（**库内 P1**，V2.3 `01_V2.3关键词总库` ID 72：行业/人群词 · 信息/商业 · 考虑阶段，Topic Cluster = Audience，标准目标 URL `/blog/b2b-geo-optimization/`；V2.3 备注「规划候选，暂不因 GSC 无数据建页」，**GSC 页面维度未出现**，未编造搜索量或 KD） |
| **Secondary Keywords** | 决策链提问、证据资产、B2B AI 搜索 |
| **Search Intent** | Commercial Investigation（已认可要投入，正在选做法与服务方式） |
| **内容类型** | 行业 Pillar（框架 + 责任表 + 自测法） |
| **优先级** | **P0**（计划内，B 桶 Enterprise / B2B；规划第五节与 §10.7 均列为 P0） |
| **Slug** | `b2b-geo-optimization`（主关键词英文 kebab-case，非日期；与库内标准目标 URL 一致） |
| **目标 URL** | `/blog/b2b-geo-optimization/` |
| **Category** | 实战指南 |
| **Tags** | GEO / AI搜索 / B2B / 采购决策链 |
| **CTA 目标** | `/services/geo-optimization`（GEO 优化服务，与计划 CTA 列一致）＋ `/services/geo-audit`（先做深度诊断的可选路径）；正文内另有 `/tool`（免费自查） |

**库内相邻词核对（未使用，避免抢词）**：`/blog/geo-for-overseas-brands/`（出海企业GEO，库内 P1，对应 Day 9）与 `/blog/entity-seo-knowledge-graph/`（实体 SEO）**均尚未创建**，故本文不作内链、不占用其词；「B2B GEO 案例」属 `/cases/`（W12，规划暂缓），本文不作案例引用。

---

## 三、Article（正文，与 `blog-drafts/b2b-geo-optimization.md` 逐字一致）

## TL;DR / 核心要点总结

- **B2B 的 GEO 单位不是页面，是提问。** 决策链上四类角色问的问题不同，需要四类不能互换的资产，也归四个不同的角色管。
- **跟「推荐名单机制」的分工。** 名单怎么形成站内已单独拆过；本文只处理这四类提问在公司内部怎么分。
- **越靠近签字人的提问越粗，但它决定你进不进名单。** 精力全放在把参数写全的一端，名单却是在最粗的那一端形成的。
- **最容易断的两个交接点。** 销售知道客户的真实提问却进不了内容流程；技术事实躺在登录后的文档里。

---

一家 B2B 公司决定做 GEO，第一步通常是列页面清单：首页、产品页、解决方案页、博客。这个清单在内容站上够用，在 B2B 上会失效——原因不在页面，而在提问。

B2B 采购从定义上就不是一个人的事。业务要用的人、技术要接的人、采购要付钱的人、高层要签字的人，会各自去 AI 里问问题，问的还不是同一件事。

按页面分工的隐含假设是「一个页面服务一类读者」，B2B 恰好相反：产品页同时要答业务的场景问题和技术的数据边界问题，写在一起两边都摘不走；采购的计价问题、高层的品类问题，更没有落点。

本文交付另一套分工：**先列出决策链上的四类提问，再给每一类配上证据资产与主责。** 前提是技术通道与实体层已通，顺序见 [GEO 优化怎么做](/blog/how-to-do-geo)。

## 一、四类提问：谁在问、问什么

划分依据不是部门名称，而是**问题在 AI 里长什么样**。

| 提问类型 | 谁在问 | 问题在 AI 里的形状 | 他点头靠什么 |
| --- | --- | --- | --- |
| 场景型 | 业务 / 一线使用者 | 带现状：「我们现在用 A，要做 B，换成 C 行不行」 | 迁移代价与不适用边界 |
| 规格型 | 技术 / IT | 粒度细、要确切答案：支持哪些协议、数据存在哪 | 细节能不能对上文档 |
| 口径型 | 采购 / 财务 | 问结构与量：这类工具怎么计价、预算落在什么区间 | 能不能填进预算表 |
| 信心型 | 高层 / 决策者 | 几乎不带品牌名：这类投入值不值得做、同行怎么做 | 有没有第三方替你说 |

**场景型最容易答偏。** 它问的不是「你支持什么行业」，而是「从现状换到你，要付出什么」。只写适用行业、不写迁移代价与边界的页面，进不了 AI 的对比表。它还会先卡在用词上——客户的说法和你内部的叫法对不上时，得先做一次三列映射（[内部术语映射](/blog/ai-terminology-mapping)）。

**规格型容错率最低。** 技术评估者问 AI 多半是在交叉验证——他会拿答案去对文档。答案含糊或对不上，不是说服力弱，而是直接出局。机器读不懂页面，是就绪度断层里最薄的一环（[50 站实测](/blog/ai-search-readiness-audit)）。

**口径型最常被整片放弃。** 很多 B2B 公司全站只有「按需报价」。但放弃不等于安全：你答不出自己品类的计价结构，AI 就会去引用别人写的价格文章。

**信心型根本不会念到你的品牌名。** 高层问的是品类级问题，AI 在这一步召回的是第三方共识（机制见 [品牌如何被 AI 搜索推荐](/blog/how-to-get-recommended-by-ai)）——**这类提问的主战场不在官网上。**

两条规律决定后面的分工：**提问粒度是反着来的**，越靠下游（高层）越粗、越靠上游越细，而决定你进不进名单的是最粗的那一端；**四类证据不能互换**，用一份内容覆盖四类，每一类都只答一半。

## 二、要什么资产、归谁管

四份资产里，前三份多数公司有雏形，第四份几乎为零——而缺的那一份通常正好决定名单。

| 提问类型 | 要的证据资产 | 合格线 | 常见失败 |
| --- | --- | --- | --- |
| 场景型 | 场景页、对比页 | 客户原话能对上页面里的一句话 | 只写适用行业，不写迁移代价 |
| 规格型 | 技术事实页 | 集成、数据、权限、接口限制各是一段独立纯文本 | 藏在登录后、附件或架构图里 |
| 口径型 | 计价结构说明、采购 FAQ | 计价维度可独立摘走 | 全站只有「按需报价」 |
| 信心型 | 第三方渠道的统一表述 | 各渠道是同一个版本 | 只在官网自述 |

**技术资产的问题几乎从不是「没有」，而是「放错位置」。** 规格型提问的答案通常早已写在技术文档里——登录后才能看、以附件形式存在、或只画在架构图的图形里。AI 拿不到这些位置的内容，等于你在这类提问上完全没有供给。结构化标注能让机器读懂（[结构化数据指南](/blog/structured-data-guide)），但替代不了「内容本身在公开页面上」。

**信心资产要的是一致性。** 同一句品类归属、同一组核心可比值，在所有第三方渠道上要是同一个版本（[证据来源的分布变化](/blog/geo-2026-08-citation-evidence-sourcing)）；三个版本比一个更糟，它会把品牌拆成几个互不相认的对象。

资产还要有人认领，并能拿到只有别人手里才有的输入：

| 提问类型 | 内容主责 | 必须拉进来的输入方 | 交付物 |
| --- | --- | --- | --- |
| 场景型 | 市场 / 产品营销 | 销售一线、客户成功 | 场景页与对比页的可比值清单 |
| 规格型 | 技术文档 / 开发者关系 | 工程、安全 | 公开可抓取的技术事实页 |
| 口径型 | 市场 + 销售运营 | 财务、法务 | 计价结构说明与采购 FAQ |
| 信心型 | 品牌 / 公关 + 创始人 | 销售（赢单输单的真实原因） | 第三方渠道的统一表述与可引用资产 |

这张表按**提问类型**分，不按部门分；关键是每一类提问都有明确的人认领。

**断点一：销售知道真实提问，但不进内容流程。** 销售通话里的一句话是四类提问中最真实的版本，但它通常只进 CRM，不进内容排期。

**断点二：技术事实在文档团队手里，而文档不在 GEO 范围内。** 技术文档从没被当作 AI 可读资产评估过，偏偏规格型提问容错率最低。

**一个低成本机制：每月一次提问回收。** 把销售、售前、客服的问题原话按四类归档，用途只有一个：变成下个月的内容题与复测题。不需要工具，只需要定一个人每月汇总。

最后提醒一句：**产品页写好不等于 B2B GEO 的全部。** 产品页是引用占比最高的一类页面（[页型分布](/blog/ai-citations-product-pages)），但那是**结果**不是**方法**——它被引用是因为承装了可比值。只把排版做漂亮、可比值没补，页型优势换不来答案。

## 三、SaaS 场景：同一个产品，两条路径要两套答案

SaaS 最容易被这套框架漏掉：同一个产品有两条并行的购买路径，证据需求几乎不重叠。

**路径 A｜自助路径。** 业务或技术人员自己搜、自己注册、自己试，决策链实际只有一个人。他问的是「我现在能不能开始用」「免费版够不够」——他要的是入口，不是材料。

**路径 B｜企业采购路径。** 走完整的四类提问链条，证据需求回到那四份资产上。

由此生出两个常见错误。**一是用一条路径的答案覆盖两条**：官网通篇是企业级话术——安全、合规、私有化部署，自助用户看完不知道能不能立刻注册，就在 AI 答案里换了一家。

**二是两个版本互相打架**：自助页写「几分钟接入」，技术文档写「需企业 IT 配合开通」，采购页写「有最小起步席位」——在 AI 眼里像三个互不相关的实体（[品牌实体归属治理](/blog/brand-entity-ownership)）。

处理原则只有一条：**入口问题分开写，事实层只能有一份。** 两套题各有落点页面；但价格口径、功能边界、集成清单、数据存放位置这四项，无论出现在哪个版本里，数字和说法必须一致。

## 四、20 分钟自测：先找出答不上来的那一类

四类都要做，但不能同时开工，先用一份固定题找出该先做哪一类：每类写 5 个题面，用客户原话；同一引擎、同一模型版本、同一天跑完，新会话；每题记三样——AI 有没有答上、可比值是什么、引用来自哪里；最后只做一个判断，哪一类答不上来的题最多。

那一类就是你下个月的唯一优先级。四类同时开工、每类各做一半，是本文最想避免的结果。

两个边界写在前面：**这份题测的是「分工是否成立」，不是对标竞品**——想量你与竞品的差距，要用另一套对标提问集（[AI 可见度对标](/blog/ai-competitor-benchmark)）。另外，**不要给四类设及格线**：公开渠道没有可信的行业平均值。

想先看自动结果，[GEO 诊断工具](/tool) 能测爬虫访问、结构化数据与内容可读性三项；但四类提问答得怎么样，只能靠上面这份题。

## 行动清单

### 今天做

- [ ] 按四类提问各写 5 个题面，用客户原话，不用「专业问法」
- [ ] 固定同一引擎与模型版本、同一天跑完，记下答不上来最多的那一类

### 本周做

- [ ] 把四类提问对照到现有页面：哪一类有专属落点页，哪一类只能挤在别的页面里
- [ ] 检查技术事实的存放位置：集成、数据、权限、接口限制是否有公开页面上的纯文本答案

### 本月做

- [ ] 定下四类提问的主责人与输入方，把责任表落成文档
- [ ] 建立每月提问回收：归档销售、售前、客服的问题原话，转成内容题
- [ ] 计价口径收口：即使不公开具体价格，也把计价维度与门槛写成可独立摘走的段落

## 结语：分工的单位是提问，不是页面

B2B 企业做 GEO 的起点不是一张页面清单，而是一张提问清单：先认出四类提问，再给每一类配上证据资产和主责的人。

最反直觉的一条是：**越靠近签字人的提问，越多的工作发生在你的官网之外。**

## 📩 需要帮助？GEO 咨询团队可以为你做什么

B2B 的 GEO 落地，难点通常不在写内容，而在把四类提问分到人头上：

- **分工设计与责任表落地**：按你的实际决策链产出「角色 × 提问 × 资产 × 主责」映射表（[GEO 优化服务 →](/services/geo-optimization)）
- **提问回收机制搭建**：把销售、售前、客服的问题原话变成每月固定的复测题
- **先量基线再动手**：想先看清自己与竞品在 AI 答案里的位置（[品牌 AI 可见度诊断](/blog/geo-brand-diagnosis-guide)），或做一次深度人工诊断（[GEO 审计与 AI 搜索诊断 →](/services/geo-audit)）

---

*本文为方法说明类内容。四类提问的划分、责任表与自测清单均为 GEOVA 的工作框架，用于内部分工，不代表任何平台的官方口径，也不构成行业统计结论。文中引用的数据均来自站内已发布报道的公开来源，并已在对应位置给出内链。AI 搜索产品的机制与名称变化较快，本文结论截至 2026 年 10 月。*

---

## 四、Internal Links（每一处都回答「用户为什么现在需要点它」）

| 内链 | 层 | 出现位置 | 为什么现在需要点它 |
| --- | --- | --- | --- |
| `/blog/how-to-do-geo` | 上游 Pillar | 开头末 | 用户刚被指到「分工」这一层，需要先确认它的前置条件（技术通道、实体层）与五层推进顺序 |
| `/blog/how-to-get-recommended-by-ai` | 上游 Pillar（机制依据 + 边界） | §一 信心型 | 信心型提问依赖的第三方共识与名单机制，读完即知本文为何不复述机制 |
| `/blog/ai-terminology-mapping` | 平级（平行维度） | §一 场景型 | 场景资产常先卡在用词上，需要那一份「内部叫法 → 用户口语 → AI 词表」三列映射 |
| `/blog/ai-search-readiness-audit` | 平级（数据依据） | §一 规格型 | 「机器读不懂页面是最薄一环」的实测出处，用户可据此判断规格型提问为何容错率最低 |
| `/blog/structured-data-guide` | 平级（技术落点） | §二 技术资产 | 确认「标注能让机器读懂」之后，下一步就是 JSON-LD 写法与验证清单 |
| `/blog/geo-2026-08-citation-evidence-sourcing` | 平级（证据来源） | §二 信心资产 | 第三方证据来源结构正在变化，决定信心资产该往哪些渠道供给 |
| `/blog/ai-citations-product-pages` | 平级（边界） | §二 末 | 产品页引用占比结论的出处；同时是边界声明——读完即知本文为何不复述该数据 |
| `/blog/brand-entity-ownership` | 平级（边界） | §三 SaaS | 两个版本自相矛盾会把一个品牌拆成多个实体，需要那篇的归属治理路径 |
| `/blog/ai-competitor-benchmark` | 平级（方法对照） | §四 自测 | 想量的是与竞品的差距（而非分工是否成立）时，需要换用对标提问集 |
| `/tool` | 下游（工具） | §四 末 | 自测题跑完但想先看站点基础项（爬虫、结构化数据、内容可读性）的自动结果 |
| `/services/geo-optimization` | 下游（商业） | CTA 第一步 | 责任表落地是一次完整的按层交付，与该服务页能力对应 |
| `/blog/geo-brand-diagnosis-guide` | 下游（诊断方法） | CTA 第三步 | 不想立刻改内容时，先用 8 个问题量出自己与竞品在 AI 答案里的位置 |
| `/services/geo-audit` | 下游（商业） | CTA 第三步 | 需要一次性深度诊断再定投入方向的用户路径 |

**内链层次**：上游 2（两篇 Pillar）＋ 平级 7（平行维度 / 数据依据 / 技术落点 / 证据来源 / 边界 ×2 / 方法对照）＋ 下游 4（工具 + 诊断方法 + 商业页 ×2），共 13 处，三层齐备，全部无尾斜杠。

---

## 五、CTA

**类型**：Commercial Investigation × 行业 Pillar → **GEO 优化服务**（`/services/geo-optimization`），与计划 CTA 列一致；并列一条「先做深度人工诊断」路径（`/services/geo-audit`）。正文内保留站内已验证路径的免费工具入口（`/tool`）。

**匹配理由**：文章交付的是「四类提问 → 证据资产 → 内部主责」的一次性分工工程与持续回收机制，落点是**按层推进的优化落地**，而非一次性诊断；`/services/geo-optimization` 承接的正是这类跨市场 / 技术文档 / 销售 / 品牌多方的持续工作。**全文仅 2 个商业承接页，未导向 `/contact`**，也未强行添加商业链接。

---

## 六、Sources / References

| 依据 | 类型 | 在文中的用法 |
| --- | --- | --- |
| 站内 `ai-citations-product-pages`（Ten Speed / Peec AI 的 7,387 次引用实测：产品页 24.1% 为最大单一来源） | 站内既有分析（第三方数据） | §二 末边界提醒：只取「产品页是引用占比最高页型」这一结论并内链，**不复述任何百分比数字** |
| 站内 `how-to-get-recommended-by-ai`（Semrush × Kevin Indig 1,094 品类研究、Shero Commerce 1,851 来源分析、Lily Ray 100 个 B2B 查询实测） | 站内既有分析（第三方数据） | §一 信心型：机制只作一条结论并内链，未新增数字、未复述机制 |
| 站内 `ai-search-readiness-audit`（Search Engine Journal 带探针浏览器实测 50 个大站：可抓取层平均 74.4%、语义层 38.5%） | 站内既有分析（第三方数据） | §一 规格型：只引「机器读不懂页面那一层最薄」这一定性判断并内链，**文中不出现该百分比** |
| 站内 `geo-2026-08-citation-evidence-sourcing`（AI 引用从「声量分配」转向「证据采购」） | 站内既有分析 | §二 信心资产：第三方渠道该往哪里供给的依据 |
| 站内 `how-to-do-geo`（五层推进顺序）、`structured-data-guide`（JSON-LD 写法）、`ai-terminology-mapping`（三列词表）、`ai-competitor-benchmark`（提问集三类题）、`brand-entity-ownership`（实体归属治理） | 站内既有分析 / 站内资产 | 均只作边界、前提或落点内链，不搬运结论 |
| 站内 `/tool` 与 `/services/geo-optimization`、`/services/geo-audit` 公开能力说明 | 站内资产 | CTA 各步与页面能力逐条对应 |
| B2B 采购为多角色、多环节决策（业务 / 技术 / 采购 / 高层各自提出不同问题） | 行业通行认知（定性） | §一 的划分依据。**本文未引用任何统计数字**：「四类提问」「两条规律」「责任表」均为 GEOVA 的工作框架，脚注已显式声明不代表平台口径、不构成行业统计结论 |

**事实风险**：极低。**0 处百分比断言**（机器校验：`percent assertions: none`）；未使用自有实验数据；未出现「研究显示」「某官方表示」一类模糊归因；未引用任何无法回溯一手口径的外部统计。

**写作前的核验说明（重要）**：按事实纪律，本机 WebFetch 与裸 curl 均不通（仅 WebSearch 可用），因此对 Day 8 做过一次外部检索。检索返回的 Gartner 2026 Technology Buying Behaviour、G2 2026-04、6sense 2025、Forrester《State of Business Buying 2026》等数字**均来自聚合摘要页，无法回溯到一手口径**，**一律未采用**。本文因此按 Day 1–7 同款处理为**纯方法 / 框架类**：不引任何新增外部数字。

---

## 七、SEO Checklist

- [x] Title 31 字（≤40），含核心判断，与 H1 一致
- [x] Meta Description 150 字（80–160），含问题与三项交付物
- [x] 主关键词「B2B企业GEO优化」在 Title 与 §一 语境中自然出现；库内 P1 已核对（V2.3 ID 72），未编造搜索量 / KD
- [x] 次关键词「决策链提问」「证据资产」「B2B AI 搜索」自然分布于标题、§一、§二
- [x] Slug `b2b-geo-optimization`，**非日期**，与库内标准目标 URL 一致
- [x] 内链 13 处不带尾斜杠，目标页面在源码中逐一核实存在
- [x] 无 broken link（`BROKEN LINKS: none`）
- [x] 正文无 H1（由模板渲染 `title`）
- [x] 结构：TL;DR / 4 个编号 H2 / 行动清单 / 结语 / CTA / 来源脚注齐备
- [x] 无孤立 `#标签`，无残留标记词

---

## 八、GEO Checklist

- [x] **Direct Answer**：§一 表格直接回答「四类提问分别是什么」；§二 两张表给出「要什么资产」与「归谁管」；§四 给自测四步与唯一判断标准——均可整段摘走
- [x] **Definition**：§一 明确界定四类提问的划分依据（问题在 AI 里长什么样，而非部门名称）；§二 界定「合格线」与「常见失败」；§三 界定自助路径与企业采购路径
- [x] **Entity**：业务 / 技术 / 采购 / 高层四类角色、场景页 / 对比页 / 技术事实页 / 计价结构说明 / 采购 FAQ 五类资产、销售一线 / 客户成功 / 工程 / 安全 / 财务 / 法务 / 品牌 / 公关等输入方与关系写全，避免模糊指代
- [x] **Structured Information**：4 张表格（四类提问、资产与合格线、责任表、内链表），为框架本身必需，非硬造
- [x] **Evidence**：所有数据只作内链不复述；框架部分在脚注显式声明为 GEOVA 工作框架、不代表平台口径、不构成行业统计结论；**无数据处直接不写数字**（未给任何基准线）

---

## 九、Final Quality Check（A–G）

| 检查 | 结论 |
| --- | --- |
| **A. Intent** | 全文 4 个章节均服务于「B2B 决策链上的四类提问分别归谁管」，无跑题段落；§四 强制先做「哪一类答不上来最多」的判断，避免退化成四类同时开工 |
| **B. Cannibalization** | 与 34 篇已发布内容逐一比对：无换标题式重复。与 `how-to-get-recommended-by-ai`（品牌级机制 vs 组织级分工）、`ai-citations-product-pages`（该文论点刻意不复述）、`ai-competitor-benchmark`（对标差距 vs 内部分工，§四 显式声明不混用）、`ai-terminology-mapping`（用词层 vs 角色层）、`how-to-do-geo`（推进顺序 vs 角色分工）、`brand-entity-ownership`（实体治理 vs 两版本冲突）六处相邻内容均声明边界或只作依据引用；**「四类提问 + 两条规律 + 责任表 + 两处断点 + 提问回收」为本文原创组织方式，站内无同类清单** |
| **C. SEO** | 见第七节清单，机器校验全部通过（`BROKEN LINKS: none`；标题 31 字；desc 150 字；tags 4 项；category 合法；slug 非日期；无尾斜杠内链） |
| **D. GEO** | 见第八节清单，全部通过（Direct Answer / Definition / Entity / Structured Information / Evidence） |
| **E. E-E-A-T** | 无虚构案例与数字；0 处百分比断言；未把第三方研究说成自有；未引用任何无法回溯一手口径的外部统计（检索所得聚合数字一律弃用）；框架部分主动声明为工作框架并写入脚注 |
| **F. Commercial** | CTA 与 Commercial Investigation 意图匹配，与计划 CTA 列一致（`/services/geo-optimization`）；全文 2 个商业承接页 + 1 个免费工具入口，符合站内已验证的「工具 → 审计 → 服务」路径，**未导向 `/contact`** |
| **G. Internal Links** | 13 处内链，目标在站点源码中逐一核对存在（`/tool` 经 `src/pages/tool.astro`，`/services/geo-optimization` 与 `/services/geo-audit` 经 `src/pages/services/`，博客内链经 `src/content/blog/`） |

**机器校验记录**：字数 **2,999 汉字**（区间 1,500–3,000 ✓）；frontmatter 6 字段完整 ✓；无残留标记词 ✓；无孤立 #标签 ✓；无跨行断裂粗体 ✓；超 150 字段落 0 处 ✓；百分比断言 0 处 ✓；无尾斜杠内链 ✓；`BROKEN LINKS: none` ✓。

---

## 十、GEOVA Day 8 执行报告

```text
GEOVA Day X 执行报告

状态：
✅ 完成（2026-10-13 已发布）

标题：
B2B 企业做 GEO：采购决策链上有 4 种提问，分别归谁管

Search Intent：
Commercial Investigation —— B2B 企业已认可要投入 GEO，需要一个能套进自己组织结构的做法：决策链上四类提问分别要什么、归谁管、缺哪一份

核心价值：
全站首次交付「角色 × 提问 × 证据资产 × 内部主责」映射表 + 两条规律（提问粒度反向 / 四类证据不可互换）+ 两处最容易断的交接点 + 每月提问回收机制 + 4×N 自测题清单 + SaaS 双路径分叉处理法

与旧文冲突：
部分重叠（评分 1），已处理：与 how-to-get-recommended-by-ai 分工为「品牌级机制 vs 组织级分工」；与 ai-citations-product-pages 按规划 §10.4 改题并刻意不复述其「产品页 24.1%」论点，只在 §二 末留一句边界提醒；与 ai-competitor-benchmark 分工为「对标竞品 vs 内部分工」并在 §四 声明两套题不混用；与 ai-terminology-mapping 分工为「用词层 vs 角色层」；与 how-to-do-geo 分工为「推进顺序 vs 角色分工」；与 brand-entity-ownership 只在 §三 SaaS 作一句内链

主要内链：
/blog/how-to-do-geo（上游 Pillar · 五层顺序与前提）
/blog/how-to-get-recommended-by-ai（上游 Pillar · 机制依据 + 边界）
/blog/ai-terminology-mapping（平行维度 · 用词层）
/blog/ai-search-readiness-audit（数据依据 · 就绪度断层）
/blog/structured-data-guide（技术落点）
/blog/geo-2026-08-citation-evidence-sourcing（证据来源）
/blog/ai-citations-product-pages（边界声明）
/blog/brand-entity-ownership（边界 · 实体被拆散）
/blog/ai-competitor-benchmark（方法对照）
/tool、/blog/geo-brand-diagnosis-guide、/services/geo-optimization、/services/geo-audit（下游承接，共 13 处）

CTA：
Commercial Investigation × 行业 Pillar → GEO 优化服务（/services/geo-optimization）＋ 可选深度诊断（/services/geo-audit）
正文内含免费工具自查入口（/tool）；未导向 /contact，未强行添加商业链接

事实风险：
极低 —— 0 处百分比断言；未使用自有实验数据；未出现模糊归因
写作前做过一次 WebSearch 核验：返回的 Gartner / G2 / 6sense / Forrester 等数字均来自聚合摘要、无法回溯一手口径，一律未采用；本文按 Day 1–7 同款处理为纯方法/框架类，不引任何新增外部数字
「四类提问」「两条规律」「责任表」为 GEOVA 工作框架，已在来源脚注显式声明

是否包含自有数据：
否（未给任何基准线，明确写「公开渠道没有可信的行业平均值」）

是否需要人工核验：
建议核验 1 项 —— 主关键词「B2B企业GEO优化」在 V2.3 中标注「规划候选，暂不因 GSC 无数据建页」且 GSC 页面维度未出现，建议发布后用 GSC / 工具校准真实搜索量与用词变体

文件：
src/content/blog/b2b-geo-optimization.md（canonical，已发布）
GEOVA_Day08_b2b-geo-optimization.md（本执行包，仓库根）
```

---

## 十一、发布记录（2026-10-13）

```text
git fetch origin main      # 本地 HEAD 与 origin/main 均为 222ef75，无需 rebase
mv blog-drafts/b2b-geo-optimization.md → src/content/blog/b2b-geo-optimization.md
npx astro build            # ⚠️ 用 npx 而非 npm run build：后者的 postbuild 会向 IndexNow 外发 sitemap 全部 URL
                           # 构建产出：dist/blog/b2b-geo-optimization/index.html（29,553 字节）
                           # dist/sitemap-0.xml 已含 https://www.geova.cn/blog/b2b-geo-optimization/
git add src/content/blog/b2b-geo-optimization.md   # 仅此一个文件（工作区另有历史遗留改动，未动）
git commit 1c609fe         # feat(blog): publish b2b-geo-optimization (Day 8)
git push origin main       # 222ef75..1c609fe（无需代理参数）
```

线上复验（https://www.geova.cn/blog/b2b-geo-optimization/）：

- 状态码 200（第 4 次轮询，约 80 秒后 Cloudflare Pages 自动部署完成；前 3 次为 404）
- Title / H1 一致：「B2B 企业做 GEO：采购决策链上有 4 种提问，分别归谁管 | GEO 咨询」
- H2 数 8 ｜ 表格 3 ｜ canonical 正确
- Schema：`BlogPosting` + `BreadcrumbList`——与已发布的 Day 7 页面 Schema 图逐项一致，无回归
- 0 处百分比断言；无任何残留标记词
- **13 处内链全部可达（逐个实测，均 200）**：
  `/blog/how-to-do-geo`、`/blog/how-to-get-recommended-by-ai`、`/blog/ai-terminology-mapping`、
  `/blog/ai-search-readiness-audit`、`/blog/structured-data-guide`、
  `/blog/geo-2026-08-citation-evidence-sourcing`、`/blog/ai-citations-product-pages`、
  `/blog/brand-entity-ownership`、`/blog/ai-competitor-benchmark`、`/blog/geo-brand-diagnosis-guide`、
  `/tool`、`/services/geo-optimization`、`/services/geo-audit`

后续动作：`.claude/skills/geo-day-content/SKILL.md` 执行进度表已更新 Day 8 为 ✅（commit `chore(content): mark Day 8 published in geo-day-content progress table`）。
