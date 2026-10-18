# GEOVA Day 13 执行包｜GEO 外包的需求与验收：给代理商的 brief 与验收清单

- **状态**：✅ 已发布（2026-10-18）｜ https://www.geova.cn/blog/geo-outsourcing-brief/ ｜ commit `6b91155`
- **发布用文件（canonical）**：`src/content/blog/geo-outsourcing-brief.md`（发布时由 `blog-drafts/geo-outsourcing-brief.md` mv 而来）
- **本文件**：执行记录（审计 + 元信息 + 正文 + 清单 + 报告）；正文与 canonical 文件逐字一致
- **计划来源**：`GEOVA_30天内容战略与选题规划.md` → 第五节 **B 桶 Day 13**（Enterprise / B2B / International；**P1**）；语义审查第十节 **10.6 重新补充**——判定理由：「甲方视角全空白——27 篇全是“自己做”，但多数有预算的客户是“买服务”」
- **计划内 CTA**：预约咨询（`/contact`）
- **计划内建议内链**：上级 `/services/geo-optimization`；旧文 `how-to-do-geo`、`geo-brand-diagnosis-guide`；商业 `/contact` —— **四项全部落地**（见第四节）

---

## 一、Day 13 Pre-Writing Audit

### 1. Search Intent

- **用户真正想解决的问题**：有预算、准备把 GEO 交给外部团队，但不知道 brief 怎么写、交付怎么验、怎么防止被“报告很厚”糊弄。用户要的是能直接用于 RFP、合同与验收会的工具。
- **用户所处阶段**：Commercial Investigation（采购前选型 / 已签约待验收）——已经认可 GEO 要做，正在判断“怎么买、买到的对不对”。
- **为什么搜**：多数企业没有 GEO 内部能力，只能买服务；但站内既有文章几乎全部是“自己做”的视角，采购方缺少需求文档与验收标准。
- **本文不解决什么（边界）**：
  - 不教 GEO 五层具体怎么做——见 `/blog/how-to-do-geo`。
  - 不拆报价结构、计价方式与周期——见 `/blog/geo-pricing`（Day 12 已发布）。
  - 不解决企业内部市场部与 IT 的分工——见 `/blog/enterprise-geo-handoff`（Day 11 已发布）。
  - 不提供完整审计检查项与评分口径——见 `/services/geo-audit`（完整审计框架属计划内 Day 30）。
  - 不评价、不推荐任何具体服务商；不承诺任何效果指标。

### 2. Existing Content Conflict

**评分：1（部分重叠，但有独立价值；核心选题“甲方如何写 GEO 外包 brief 与验收”站内为 0）**

| 对照旧文 | 重叠点 | 边界（本文不做什么） |
| --- | --- | --- |
| `/blog/how-to-do-geo` | 都涉及 GEO 工作面 | 那篇答“按什么顺序做五个工作面”；本篇只把五层作为验收对象，不复述执行方法，§一 内链交回 |
| `/blog/geo-pricing` | 同为甲方采购视角 | 那篇拆报价、计价、周期与比价；本篇写 brief、选型与验收，§二 显式声明不重复价格结构 |
| `/blog/enterprise-geo-handoff` | 都涉及职责与交接 | 那篇讲企业内部市场部 / IT 分工；本篇讲甲方对外部代理商的采购与治理，§一、§五 内链 |
| `/blog/geo-brand-diagnosis-guide` | 都涉及基线 | 那篇教 8 个诊断问题与打分；本篇只把基线作为第 1 道验收关，并内链具体做法 |
| `/blog/doubao-deepseek-domestic-geo-guide` | 都提到“保证引用”风险 | 那篇作为平台指南中的红旗提示；本篇把“承诺排名”列为代理商排除信号，并内链依据 |

**站内检索证据**：对 `src/content/blog/` 检索 `外包 / 代理商 / brief / 验收清单 / 需求文档`，仅在 `geo-pricing`（比价与试点）、`enterprise-geo-handoff`（验收归属）、`ai-citations-drop-after-migration`（改版验收清单）等文出现零散表述；**没有任何一篇从甲方视角写 GEO 外包的 brief 与验收**。核心选题评分 0，整体评分 1，可写。

**计划内风险复核**：Day 13 为 B 桶第 6 篇，P1。语义审查 10.6 判定“甲方视角全空白”。本次判断：**保留成立**。

### 3. Unique Value

> **本文给 GEOVA 增加的唯一价值：全站第一篇甲方采购视角——把“GEO 外包”从一句“帮我做优化”，变成五段式 brief、三类选型能力、四道验收关与四个治理机制，并明确一条采购纪律：代理商能控制交付物，不能承诺 AI 答案。**

为什么这一层空白：站内已有“做什么”（`how-to-do-geo`）、“谁来做”（`enterprise-geo-handoff`）、“多少钱”（`geo-pricing`）、“先改哪 100 页”（`large-site-geo-priority`），但**没有一篇回答“外包需求怎么写、交付怎么验、代理商怎么管”**。

### 4. 关键词库核对

- `GEO 外包` **不在 V2.2 `01_关键词总库V2.2` 内**；库内相邻词为 `GEO优化`、`GEO优化服务`、`GEO优化公司`、`GEO咨询公司` 等服务页商业词。
- 按规则标注 **待 SERP 验证**；**不写搜索量、不写 KD、不写竞争度**。
- 次关键词 `GEO 需求文档`、`验收标准`、`代理商管理` 均自然覆盖，不另建页。
- 本文不与 `/services/geo-optimization` 争“GEO 优化服务”商业主词：服务页承接交易，本文承接“外包采购与验收”长尾信息意图。

### 5. 时间线与事实纪律

- 正文**不含任何百分比数字**，不引用未核实的行业统计、客户案例或“官方表示”。
- 不编造代理商名称、案例、转化率或“某研究显示”。
- 「五段式 brief」「四道验收关」「三类能力判断」明确标注为 GEOVA 工作框架，不代表平台官方口径。
- 引用站内既有公开内容时给出内链：五层工作面、基线诊断、承诺引用/排名的风险。
- 结论截至 2026 年 10 月；AI 搜索产品机制变化较快，后续更新以线上文章为准。

---

## 二、Article Metadata

| 项 | 内容 |
| --- | --- |
| **Title** | GEO 外包的需求与验收：给代理商的 brief 与验收清单（30 字，≤40） |
| **Meta Description** | GEO 外包失败，多半不是代理商能力不够，而是 brief 没写清什么算做完。本文给甲方一份五段式 brief 模板、按阶段执行的验收清单与代理商红旗信号，把「帮我做 GEO」翻译成可交付、可复现、可交接的合同语言。（108 字） |
| **H1** | 与 Title 一致（站点模板 `src/pages/blog/[...slug].astro` 直接渲染 `post.data.title` 为 H1；正文不写 H1） |
| **Primary Keyword** | GEO 外包（**不在 V2.2 库内 → 待 SERP 验证**） |
| **Secondary Keywords** | GEO 需求文档、验收标准、代理商管理 |
| **Search Intent** | Commercial Investigation（采购前选型 / 已签约待验收） |
| **内容类型** | 商业方法（brief 模板 + 选型 + 验收清单 + 治理机制） |
| **优先级** | P1（计划内 B 桶；语义审查 10.6 重新补充） |
| **Slug** | `geo-outsourcing-brief`（主关键词英文 kebab-case，非日期） |
| **目标 URL** | `/blog/geo-outsourcing-brief/` |
| **Category** | 策略 |
| **Tags** | GEO / AI搜索 / GEO外包 / 代理商管理（4 项） |
| **CTA 目标** | `/contact`（预约咨询，匹配 Commercial Investigation）；辅助路径 `/services/geo-optimization` → `/services/geo-audit` → `/contact` |

---

## 三、Article（正文，与 `src/content/blog/geo-outsourcing-brief.md` 逐字一致）

## TL;DR / 核心要点总结

- **GEO 外包买的不是“优化服务”，是一组可验收的交付物。** brief 决定你能买到什么，验收清单决定你买到的对不对。
- **代理商能控制的是交付物，不是 AI 的答案。** 承诺“保证被引用”“排名第一”的，直接排除。
- **brief 写清五段就够**：目标与问题集、范围与现状、交付物与格式、验收口径与证据、权限与退出。
- **验收按四道关走**：基线、改造、持续、退出；每道关都要求原始记录能被甲方独立复跑。
- **最容易漏的是资产归属**：问题集、基线记录、内容与 Schema 清单必须归甲方，否则换代理商等于从零开始。

---

## 一、先判断：哪些工作可以外包，哪些必须留在内部

> **直接回答：GEO 外包买的是一组可验收的执行与证据，不是“效果承诺”。判断标准只有一条——这项工作是否需要外部的方法与人力，而不需要交出业务判断权。**

本文把提供 GEO 执行的外部团队统称为代理商，服务商同义。适合外包的工作有三类：跨技术、内容与站外的复合执行；内部缺少 GEO 方法与经验，需要有人带第一轮；需要第三方做基线与复测，避免自说自话。

必须留在内部的工作同样明确：客户问题的定义、产品与术语的事实口径、对外发布审批、生产环境权限、最终验收签字。这些一旦交出去，后面所有报告都无法核对。

站内已把 GEO 拆成五个工作面：[GEO 优化怎么做](/blog/how-to-do-geo)。本文不重复五层怎么做，只回答这些工作交给外部团队时，需求与验收怎么写。

> 如果连“谁在公司内部负责 GEO”都没定，先解决分工：[企业官网的 GEO 交接](/blog/enterprise-geo-handoff)。

---

## 二、Brief 五段式：把“帮我做 GEO”翻译成可交付的需求

多数 brief 只有一句话：“帮我们做 GEO 优化，提升 AI 可见度。”这句话无法报价，也无法验收——因为它没有说对哪些问题、改哪些页面、交什么、什么算做完。

一份能直接发出的 GEO 外包 brief，写清五段即可。

| 段落 | 必须写清 | 常见漏写 |
| --- | --- | --- |
| 1. 目标与问题集 | 业务目标、10–20 个真实客户问题、平台与语种、竞品集合 | 只写“提升可见度”，没有问题清单 |
| 2. 范围与现状 | 域名、页面或模板清单、站点规模、技术栈、CMS、审批流程 | 没写页面数量，范围无法锁死 |
| 3. 交付物与格式 | 基线报告、优先级清单、Schema 覆盖表、内容改写、站外资产、月度报告 | 只写“报告”，不写粒度与格式 |
| 4. 验收口径与证据 | 提及/引用/推荐分开定义，原始记录、模型版本、复测日期、签字人 | 用“曝光提升”一个词代替三项指标 |
| 5. 权限、治理与退出 | 只读权限、保密协议、资产归属、变更机制、退出交接 | 没写资产归谁，换人即归零 |

五段里最容易被跳过的是第 4 段。没有验收口径，代理商交十页报告也无法判断是否完成；甲方只能凭感觉续约，或凭感觉换人。

可以直接复制的 brief 骨架：

```text
1. 目标：本季度要让哪 10–20 个客户问题的答案里出现我们？覆盖哪些平台与语种？
2. 范围：哪些域名、页面、模板、语种？改多少页？哪些不动？
3. 交付：基线报告 / 优先级清单 / Schema 覆盖表 / 内容改写前后对照 / 站外资产清单 / 月度报告。
4. 验收：提及、引用、推荐分别怎么定义？原始记录、模型版本、复测日期由谁保存？谁签字？
5. 治理：只读权限范围、保密与数据归属、变更怎么计价、退出时交什么。
```

这份骨架不解决“选哪家”，但能让所有候选按同一口径回复——这本身就是第一轮筛选。报价怎么拆、周期怎么定，见 [GEO 优化多少钱、多久见效](/blog/geo-pricing)；本文不重复价格结构。

---

## 三、选代理商：看三样能力，不看案例墙

案例墙证明的是“它做过”，不证明“它能在你的站上复现”。判断一家 GEO 代理商，看三样更硬的东西。

**第一，问对问题的能力。** 第一次沟通就先问客户在问什么、采购决策链有哪几种角色、现有页面哪些被引用过——而不是先推 Schema 套餐或内容包。

**第二，可复现的方法。** 让对方展示一份真实的复测记录：问题集、平台、模型版本、日期、原始回答。拿不出原始记录的“效果”，只能算故事。

**第三，愿意被验收的态度。** 愿意接受本文第四节的清单、愿意把资产归属写进合同、愿意在报告里写“无法判断”的团队，通常比满口承诺的团队可靠。

以下六个信号出现一个，就应当降级或排除：

1. 承诺“保证被 AI 引用”“排名第一”“7 天上首页”——AI 答案是模型实时生成的，没有可承诺的固定位次（[同类风险](/blog/doubao-deepseek-domestic-geo-guide)）。
2. 只给截图，不给问题集、原始回答与模型版本。
3. 把提及、引用、推荐混成一个“曝光提升”数字。
4. 报告不写测试日期，也不写模型版本，无法区分真实变化与模型换代。
5. 拒绝约定内容、Schema、数据的归属与退出交接。
6. 要求生产环境管理员权限，或代发内容不经甲方审批。

> 一句话判断：**愿意被验收的团队，才值得被外包；不愿意的，能力再强也无法证明。**

---

## 四、验收清单：四道关，每道关都要证据

验收的对象是交付物与过程，不是“AI 一定推荐你”。结果指标只能看趋势，不能当合同条款；交付物与证据能否复跑，才是可判定的。

| 关卡 | 交付物 | 合格标准（可判定） | 不合格怎么处理 |
| --- | --- | --- | --- |
| 第 1 关 基线 | 问题集 + 首轮记录 | 10–20 个真实问题、3–4 个引擎、写明日期与模型版本、原始记录交甲方、甲方能独立复跑 | 基线重做，不进入改造 |
| 第 2 关 改造 | 技术、实体、内容三类清单 | 每项有 URL 或模板、改动前后证据、覆盖清单逐项打勾、无回归问题 | 补齐清单；未验收不计入交付 |
| 第 3 关 持续 | 月度/季度复测报告 | 三项指标分栏、同一问题集、标注模型版本、附原始数据、允许写“无法判断” | 报告不计入服务月 |
| 第 4 关 退出 | 资产与权限交接 | 问题集、基线、内容与 Schema 清单、账号权限、文档全部移交，有过渡期 | 与尾款或续约挂钩 |

第 1 关为什么必须甲方能复跑：如果问题集和原始记录都在代理商手里，你无法验证“提升”，也无法在换人时保留比较基准。基线的做法可参考 [品牌 AI 可见度诊断](/blog/geo-brand-diagnosis-guide)。

第 2 关的关键不是“改了多少”，而是“清单是否闭合”。对方说改了 30 页，就要能指出这 30 页的 URL、每页改了什么、改前改后的证据；缺一项，这页就不算交付。

第 3 关要允许“无法判断”。AI 引用会受模型换代影响，不标版本的复测无法区分真实变化与噪声；一份敢写“本期无法判断”的报告，比一份全是上涨箭头的报告更可信。

第 4 关最容易被拖到合同结束才谈。正确做法是签约时就写清：不续约时交什么、几天内交完、哪些账号要转回甲方。否则换代理商时，你买到的方法会随人一起离开。

---

## 五、项目怎么管：四个机制，防止范围漂移

**机制一：问题集版本化。** 首轮基线后冻结问题集；要增删问题，走版本号并记录原因，不能每次复测换一套题。

**机制二：固定节奏。** 每周一次 30 分钟阻塞会，只过三件事：本周交付、下周计划、需要甲方决策的事项；每月一次交付验收；每季度一次同题复测。

**机制三：变更书面化。** 加页面、加语种、加平台、加站外渠道，都要有增量报价与书面确认；口头答应的“顺手做一下”，最后通常既没做，也无法追责。

**机制四：权限最小化。** GSC、GA4 给只读；CMS 给 staging 或限定角色；生产环境改动由甲方发布；所有代发内容先审后发。权限给得越干净，验收时越容易取证。

甲方内部还要有一个固定 owner，负责维护问题集、签收交付、主持复测。这个角色放在市场部还是增长侧，见 [企业官网的 GEO 交接](/blog/enterprise-geo-handoff)。

---

## 六、这篇不解决什么

- **不教 GEO 五层具体怎么做**——那篇讲工作面与顺序：[GEO 优化怎么做](/blog/how-to-do-geo)。
- **不拆报价结构、计价方式与周期**——那是采购价格的另一道题：[GEO 优化多少钱、多久见效](/blog/geo-pricing)。
- **不解决内部市场部与 IT 的分工**——那篇讲谁主责、谁配合：[企业官网的 GEO 交接](/blog/enterprise-geo-handoff)。
- **不提供完整审计检查项与评分口径**——需要第三方基线或验收支持，见 [GEO 审计与 AI 搜索诊断](/services/geo-audit)。
- **不评价任何具体服务商**——本文只给采购与验收的方法，不构成对任何机构的推荐。

---

## 行动清单

### 今天做

- [ ] 列出 10–20 个真实客户问题，标注品牌词、品类词、对比词三类
- [ ] 把手上任何一份 GEO 报告翻出来，检查是否有问题集、模型版本、原始记录

### 本周做

- [ ] 用五段式 brief 写一版，发给 2–3 家候选，要求按同一格式回复
- [ ] 内部确定验收签字人与验收日历，明确谁有权说“通过/不通过”

### 本月做

- [ ] 完成第 1 关基线验收，确认甲方能独立复跑同一套问题
- [ ] 在合同或订单里补上资产归属、变更机制、退出交接三项

### 本季度做

- [ ] 按同一问题集复测，决定扩展、维持还是更换代理商
- [ ] 复盘一次“无法判断”的结论，补上缺失的基线或版本记录

---

## 结语

GEO 外包不是把 GEO 交出去，而是把执行交出去、把判断留下。brief 是采购说明书，验收清单是质量门；两者写清，不同代理商的能力才有可比性。

下一次有人问“GEO 外包靠不靠谱”，答案不在服务商的案例墙，而在你手里的那份 brief：**你有没有写清对哪些问题、交什么、怎么算做完、做完后东西归谁。**

---

## 📩 需要帮助？GEO 咨询团队可以为你做什么

正在写 GEO 外包 brief，或已经签了代理商但验收标准说不清？

- **先把范围写成可验收的清单**：按五个工作面拆交付物与优先级——[GEO 优化服务 →](/services/geo-optimization)
- **需要第三方基线与验收支持**：独立复跑问题集，核对交付证据——[GEO 审计与 AI 搜索诊断 →](/services/geo-audit)
- **带着 brief 初稿来聊**：我们帮你看哪些字段会导致后续扯皮——[预约咨询 →](/contact)

---

*本文为甲方采购与验收方法说明，不评价任何具体服务商。「五段式 brief」「四道验收关」「三类能力判断」为 GEOVA 工作框架，不代表任何平台官方口径。文中涉及的五个工作面与指标定义，见站内 [GEO 优化怎么做](/blog/how-to-do-geo)；「保证引用/排名」类承诺的风险，见 [豆包与 DeepSeek 国内 GEO 指南](/blog/doubao-deepseek-domestic-geo-guide)。AI 搜索产品的机制与命名变化较快，本文结论截至 2026 年 10 月。*

---

## 四、内链表

| 链接 | 层级 | 为什么用户现在需要点它 |
| --- | --- | --- |
| `/blog/how-to-do-geo` | 上游·方法 | 准备写 brief 的范围前，先知道 GEO 分五个工作面，才知道该让代理商交什么 |
| `/blog/enterprise-geo-handoff` | 平级·内部职责 | 外部 brief 要有人签字；内部谁主责没定，采购流程走不下去 |
| `/blog/geo-pricing` | 平级·价格 | brief 写完后要询价；报价怎么拆、周期怎么定是下一道采购题 |
| `/blog/geo-brand-diagnosis-guide` | 上游·基线方法 | 第 1 道验收关要求甲方能独立复跑；这篇给具体问题集与打分法 |
| `/blog/doubao-deepseek-domestic-geo-guide` | 证据·红旗依据 | 代理商承诺“保证引用/排名”时，这里有同类风险的既有分析 |
| `/services/geo-optimization` | 下游·商业上级 | 需要供应商视角、或想直接委托执行时，进入服务页 |
| `/services/geo-audit` | 下游·商业承接 | 需要第三方基线或验收支持时，进入审计服务 |
| `/contact` | 下游·CTA | 带着 brief 初稿来聊，直接进入预约咨询 |

**内链总数**：8 个，全部为站内真实路径，无尾斜杠；上游 / 平级 / 下游三层齐备。

---

## 五、CTA

- **主目标**：`/contact`（预约咨询）——匹配 Commercial Investigation，用户已在选型或验收阶段。
- **辅助路径**：`/services/geo-optimization`（先把范围写成可验收清单）→ `/services/geo-audit`（第三方基线与验收支持）→ `/contact`（带 brief 初稿来聊）。
- **不使用**退役版“预约免费 15 分钟 + 微信”话术；CTA 块沿用 `## 📩 需要帮助？GEO 咨询团队可以为你做什么` 结构。
- CTA 导语按意图改写为“正在写 GEO 外包 brief，或已经签了代理商但验收标准说不清？”。

---

## 六、Sources / References

| 来源 | 类型 | 本文怎么用 |
| --- | --- | --- |
| 站内 `/blog/how-to-do-geo` | GEOVA 方法框架（既有公开内容） | 五个工作面与验收产出的定义；本文只引用，不复述 |
| 站内 `/blog/geo-brand-diagnosis-guide` | 站内既有诊断方法 | 第 1 关基线的具体做法 |
| 站内 `/blog/doubao-deepseek-domestic-geo-guide` | 站内既有平台指南 | “保证引用/排名”类承诺的风险依据 |
| GEOVA 工作框架 | 自有方法 | 五段式 brief、四道验收关、三类能力判断、四个治理机制；非平台官方口径 |

**未使用**：任何搜索量、KD、行业统计、客户案例、转化率、引用率提升百分比；任何具体服务商名称或评价。

---

## 七、SEO Checklist

- [x] Title 30 字，≤40，含核心判断与主关键词
- [x] Meta Description 108 字，80–160
- [x] Slug `geo-outsourcing-brief`，主关键词英文 kebab-case，非日期
- [x] Category `策略`，在允许枚举内
- [x] Tags 4 项
- [x] H1 由 frontmatter title 渲染，正文不写 H1
- [x] 主关键词“GEO 外包”出现在 Title、Description、开头与正文
- [x] 次关键词“需求文档 / 验收标准 / 代理商管理”自然覆盖
- [x] 内链 8 个，全部为站内真实路径，无尾斜杠
- [x] 三层内链齐备：上游方法 / 平级问题 / 商业承接
- [x] `BROKEN LINKS: none`
- [x] CTA 与 Commercial Investigation 意图匹配
- [x] TL;DR / 编号 H2 / 行动清单 / 结语 / 来源脚注齐备
- [x] 发布后核对 `dist/blog/geo-outsourcing-brief/index.html`（29,823 字节）与 `dist/sitemap-0.xml`（含新 URL）
- [x] 发布后轮询 `https://www.geova.cn/blog/geo-outsourcing-brief/` 至 200（第 3 轮 200）

---

## 八、GEO Checklist

- [x] Direct Answer：开头给出“外包买的是一组可验收的执行与证据，不是效果承诺”的可摘答案
- [x] Entity：GEO、GEOVA、代理商/服务商、甲方、市场部、IT、GSC、GA4、CMS、Schema 等角色与概念写清
- [x] Structured Information：5 张核心表（brief 五段、验收四关、选型三能力以清单呈现、治理四机制以加粗短句呈现）
- [x] Evidence：每个判断均给出可执行依据；无无源百分比、无虚构案例
- [x] Extractable：段落短、结论前置、单段可独立读懂
- [x] 时间线校准：全文无旧闻冒充新闻；结论标注截至 2026 年 10 月
- [x] 无残留标记、无 AI 工具自白、无孤立 `#标签`
- [x] 每个内链均回答“为什么现在点它”

---

## 九、A–G 质检

| 项 | 结论 |
| --- | --- |
| **A. Intent** | 通过。标题、开头、五段式 brief、四道验收关与 CTA 均围绕“甲方如何采购与验收 GEO 外包”；未滑向 GEO 方法综述 |
| **B. Cannibalization** | 通过。站内无同题文章；与 `how-to-do-geo`、`geo-pricing`、`enterprise-geo-handoff`、`geo-brand-diagnosis-guide` 均写明边界；不是换标题重写 |
| **C. SEO** | 通过。Title / Description / Slug / Category / Tags / 内链 / CTA 均符合规范；链接脚本无断链、无尾斜杠 |
| **D. GEO** | 通过。Direct Answer、实体、表格、证据、可摘段落齐备；无无源数据 |
| **E. E-E-A-T** | 通过。自有框架明确标注；未把第三方说成自有；未评价具体服务商；无虚构案例；未承诺效果 |
| **F. Commercial** | 通过。CTA 为 `/contact`，匹配采购意图；辅助 `/services/geo-optimization` → `/services/geo-audit` 路径清晰 |
| **G. Internal Links** | 通过。8 个链接全部存在；上游、平级、商业三层齐备；锚文本自然 |

---

## 十、执行报告

```text
GEOVA Day 13 执行报告

状态：
✅ 已发布（2026-10-18）

标题：
GEO 外包的需求与验收：给代理商的 brief 与验收清单

Search Intent：
Commercial Investigation（采购前选型 / 已签约待验收）

核心价值：
全站第一篇甲方采购视角：五段式 brief + 三类选型能力 + 四道验收关 + 四个治理机制；
明确“代理商能控制交付物，不能承诺 AI 答案”。

与旧文冲突：
已处理（评分 1；与 how-to-do-geo / geo-pricing / enterprise-geo-handoff / geo-brand-diagnosis-guide 均写明边界）

主要内链：
/blog/how-to-do-geo
/blog/geo-pricing
/blog/enterprise-geo-handoff
/services/geo-optimization
/services/geo-audit
/contact

CTA：
/contact（预约咨询）；辅助 /services/geo-optimization → /services/geo-audit

事实风险：
无（无百分比、无第三方统计、无客户案例、无服务商评价）

是否包含自有数据：
否（仅使用 GEOVA 工作框架，已标注）

是否需要人工核验：
否（发布前建议由用户确认 CTA 文案与商业口径）

文件：
src/content/blog/geo-outsourcing-brief.md
GEOVA_Day13_geo-outsourcing-brief.md
```

---

## 十一、发布记录（2026-10-18）

| 步骤 | 结果 |
| --- | --- |
| 移动 canonical | `mv blog-drafts/geo-outsourcing-brief.md src/content/blog/geo-outsourcing-brief.md`（`blog-drafts/` 已无本文件残留） |
| 发布前质检 | `hanzi in body: 2975` ｜ `over 150 chars: none` ｜ `BROKEN LINKS: none` ｜ 残留扫描全 clean ｜ tags 4 项 / category 合法 / slug 非日期 / 无尾斜杠内链 |
| 构建 | `npx astro build`（**刻意不用 `npm run build`**：其 postbuild 会向 IndexNow 外发）——`Server built in 6.36s`，`Complete!` |
| 构建产物核对 | `dist/blog/geo-outsourcing-brief/index.html` 存在（29,823 字节）｜ `dist/sitemap-0.xml` 含 `https://www.geova.cn/blog/geo-outsourcing-brief/` ｜ `<title>` 正确 ｜ H1 唯一且与 Title 一致 ｜ H2 = 10 ｜ Schema = `BlogPosting / BreadcrumbList` |
| 提交 | `6b91155` `feat(blog): publish geo-outsourcing-brief (Day 13)`——**仅提交 `src/content/blog/geo-outsourcing-brief.md` 一个文件**（174 行新增），工作区历史遗留改动未动（未使用 `git add .`） |
| 推送前 | `git fetch origin main` 成功，`git rev-list --left-right --count origin/main...HEAD` = `0 1` → 远程无领先提交，无需 rebase |
| 推送 | `git push origin main`（`5a67edd..6b91155`） |
| 进度表 | `588134c` `chore(content): mark Day 13 published in geo-day-content progress table` |
| 清理 | `blog-drafts/` 已无对应文件（mv 完成即清理，无需额外 cleanup 提交） |
| 线上复验 | 见下方「线上复验」 |

### 线上复验

| 检查项 | 结果 |
| --- | --- |
| 线上状态码 | `https://www.geova.cn/blog/geo-outsourcing-brief/` → **200**（首轮 000、次轮 404，第 3 轮 200；Cloudflare Pages git 集成自动构建部署） |
| 标题 / H1 | `<title>` = GEO 外包的需求与验收：给代理商的 brief 与验收清单 ｜ GEO 咨询；H1 唯一且与 Title 一致 |
| H2 数 | **10**（TL;DR + 6 编号章节 + 行动清单 + 结语 + CTA 块），与本地构建一致 |
| Canonical / Schema | canonical = `https://www.geova.cn/blog/geo-outsourcing-brief/`；Schema = `BlogPosting / BreadcrumbList`（另有站点级 Organization / Person / WebPage 等） |
| Meta Description | 108 字，线上渲染正常 |
| 结构完整性 | TL;DR / 行动清单 / 结语 / CTA 块均在线上 HTML 中存在；无残留标记 |
| 内链可达 | 文章 8 条内链全部 **200**：`/blog/how-to-do-geo`、`/blog/enterprise-geo-handoff`、`/blog/geo-pricing`、`/blog/geo-brand-diagnosis-guide`、`/blog/doubao-deepseek-domestic-geo-guide`、`/services/geo-optimization`、`/services/geo-audit`、`/contact`；无尾斜杠写法由站点 308 跳转到带斜杠规范 URL，跟随跳转后 200 |
| 线上 sitemap | `https://www.geova.cn/sitemap-0.xml` 含 `https://www.geova.cn/blog/geo-outsourcing-brief/` |
| CTA 目标 | 线上 CTA 块内 `/services/geo-optimization`、`/services/geo-audit`、`/contact` 均存在且可达 |

**复验口径说明**：本机直连 geova.cn 存在偶发连接超时（000），重试后均恢复；首次拉取页面时第 1 轮 000、第 2 轮 404、第 3 轮 200，属部署完成前的正常过渡，不是 404 故障。内链检查中 `/blog/how-to-do-geo`、`/blog/doubao-deepseek-domestic-geo-guide`、`/contact` 首轮出现 000，重试后均 200。
