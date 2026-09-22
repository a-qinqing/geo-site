# GEOVA.CN 30天内容战略规划

> 生成时间：2026-09-22 ｜ 执行：Claude Code（实际抓取网站后生成，非推测）

## 〇、执行说明与限制（先声明口径）

**实际抓取情况**

| 项 | 结果 |
| --- | --- |
| 抓取入口 | `sitemap-index.xml` → `sitemap-0.xml`（37 个 URL）+ `/blog/` 索引 + `/llms.txt` 交叉核对 |
| Blog 文章 | **28 条 /blog/ 记录，其中 1 条是索引页，27 篇正式文章** |
| 抓取成功 | **27 / 27 篇全部 HTTP 200 抓取成功，无不可访问页面** |
| 抓取内容 | 每篇的 `<title>` / meta description / H1 / 全部 H2 / 三级标题数 / 正文中文字数 |
| 未抓取的部分 | 站点无 `draft/` 公开页；`/cases/`、`/blog/ai-crawlers/`、`/blog/geo-pricing/` 等**尚未存在**（关键词库中标为"规划"），不视为"抓不到" |
| 辅助真实数据源 | `GEOVA.CN_整站关键词体系_V2.2_最终执行版.xlsx`（104 条关键词 + 16 个 Topic Cluster + 12 周排期 W0–W12）+ 仓库内历史审计报告 |

**数据使用边界（严格遵守）**

- **不提供任何搜索量、竞争度、排名数据**：本机无接入任何 SEO 工具，全部选题按 **Search Intent / 商业价值 / 集群相关性 / 内容缺口 / 业务相关性** 做**定性**判断。
- **不含任何实验数据与案例**：涉及数据/实验的选题一律标注「**待 GEOVA 实际测试后发布**」，未测试前不得发布任何结论性数字。
- 主关键词凡未出现在 V2.2 关键词库中的，一律标注「（待 SERP 验证）」。

---

## 一、当前网站内容资产分析

### 1.1 规模与结构

- **27 篇文章，正文合计 81,615 中文字，平均 3,023 字**（最长 5,860 字《六大模型官方规则》；最短 761 字《结构化数据与 Schema.org》）。
- **薄文（<1000 字）4 篇**，且其中 2 篇是核心意图页，属结构性问题：
  `structured-data-guide`(761) · `seo-to-geo-transition`(862) · `what-is-geo`(864) · `geo-content-strategy`(893)
- **类型比例失衡**：新闻/趋势型 **13 篇（48%）**，常青/支柱型 14 篇（52%）。
- **发布节奏（按抓取到的真实日期，区间 2026-07-10 → 2026-09-18）**：近 4 周（≥2026-08-25）共发布 **14 篇**，其中新闻/趋势型 **8 篇**、常青型 6 篇。节奏呈两段式：**8/25–9/4 以新闻为主**（7 篇里 6 篇是时事），**9/10–9/18 集中补 Pillar**（W1–W5 五篇常青一次性补齐）。
- **由此得出的判断**：新闻产能已被充分验证（甚至偏多），**Pillar 也已补齐**；真正的缺口不在"再写什么基础文"，而在**商业意图（交易/行业）、自有数据资产与平台对比**——这是本 30 天计划的取舍依据。

### 1.2 已有 Topic Cluster（对照 V2.2 `03_Topic_Cluster`）

| Cluster | 支柱页 | 现状 |
| --- | --- | --- |
| GEO Basics | `/blog/what-is-geo/` | 有，但**薄文 864 字**，且正文含「GEO 和 SEO 的关键区别」小节，与 W1 Pillar 争同一意图 |
| GEO Framework | `/blog/how-to-do-geo/` | **强**（五层推进，3,770 字，H2×12） |
| AI Citation | `/blog/how-to-get-cited-by-ai/` | **强**（三道关，4,236 字），子意图「幽灵引用」已有专文 |
| AI Visibility | `/blog/how-to-get-recommended-by-ai/` | **强**（4,672 字，7,387 次引用 / 1,851 来源 / 1,094 品类实测） |
| AI Platform-Global | `/blog/chatgpt-optimization/` | ChatGPT 有（4,219 字）；**Google AI / Perplexity / Gemini 全缺** |
| AI Platform-Domestic | `/blog/doubao-deepseek-domestic-geo-guide/` | 有（4,179 字，双引擎机制拆解） |
| GEO Technical | `/blog/structured-data-guide/` | **薄文 761 字**，W7 计划为"更新/合并" |
| AI Crawlers | `/blog/ai-crawlers/`（规划） | **完全缺失**（仅 `/tool/` 工具有该能力） |
| Entity & Knowledge | `/blog/entity-seo-knowledge-graph/`（规划） | **完全缺失** |
| GEO Commercial | `/blog/geo-pricing/`（规划） | **完全缺失**（交易意图零覆盖） |
| Audience | `/blog/b2b-geo-optimization/`（规划） | **完全缺失**（B2B/出海/SaaS 均无内容） |
| GEO Proof | `/cases/`（规划） | **完全缺失**（无真实案例，禁止虚构） |
| Tools | `/tool/` | **强**：Crawler Access Test（8 爬虫 UA 探测 + 声明/执行并置）+ 三维评分 |
| SEO | `/services/seo-audit/` | 服务页有，**但没有任何"SEO × AI"的内容支撑** |

### 1.3 重复问题（真实发现，须先处理再新增）

| # | 问题 | 位置 | 建议 |
| --- | --- | --- | --- |
| R1 | 「如何让 AI 引用」意图被两篇争抢 | `what-is-geo`（含「GEO 和 SEO 的关键区别」小节 + 对比表）→ W1 Pillar | 压缩为 1 段 + 内链到 W1（**改写，不新建**） |
| R2 | 同上，内容策略页标题仍写「如何让 AI 引用你的内容」 | `geo-content-strategy`（893 字薄文） | 标题意图收敛为「GEO 内容写作细则」，摘掉 Pillar 词 |
| R3 | **含编造案例与数据（已上线）** | `seo-to-geo-transition`：「SaaS 企业 A」「+180% 引用率」等，description 还称"真实企业" | 违反"不编造"原则，建议改写为方法论页或下线 |
| R4 | 无来源的效果口径 | `seo-to-geo-2026`：「经过验证的 90 天计划」「AI 搜索已占 30%+」 | 补来源或删表述 |
| R5 | 两篇"SEO→GEO"并存 | `seo-to-geo-2026`(2167) 与 `seo-to-geo-transition`(862) | 保留前者为过渡指南，后者按 R3 处理 |
| R6 | 薄文与技术 Pillar 不匹配 | `structured-data-guide`(761) | W7 计划更新为技术 Pillar；FAQ 富结果退场后的价值排序**并入该次更新**（见第十节 D-4），不再单独成篇 |

> **结论：30 天内不得再产出任何与 R1–R6 同意图的文章；先清理存量，再补缺口。**

### 1.4 商业内容缺口（最影响获客的部分）

1. **交易意图为零**：全站没有一篇回答"GEO 多少钱 / 多久见效"——而这是询盘前最后一问（库内 P1 且已规划 `/blog/geo-pricing/`）。
2. **没有行业/人群入口**：B2B、出海、SaaS、跨境、个人品牌全部空白（库内 4 个 P1/P2 词无处落地）。
3. **没有案例与信任资产**：`/cases/` 未建（**无真实项目前禁止虚构，只能等**）。
4. **没有数据/实验资产**：27 篇里的数字全部来自第三方（SEJ、Petra Labs、Digiday 等），**没有一条 GEOVA 自有的实测数据**——这是与竞品拉开差距的最大缺口，也是本次 5 篇 Data/Experiment 选题的由来。
5. **SEO 服务与内容脱节**：`/services/seo-audit/` 是 P0 商业页，但没有任何"SEO 审计 × AI"的内容承接。

---

## 二、已占用主题库（27 篇真实抓取）

| URL | 文章标题 | 主关键词 | Search Intent | Topic Cluster | 内容类型 | 是否允许继续扩展 |
| --- | --- | --- | --- | --- | --- | --- |
| /blog/what-is-geo/ | 什么是 GEO？生成式引擎优化的完整指南 | 什么是GEO | Informational | GEO Basics | 基础定义（**薄文 864**） | ⚠️ 仅允许改写，不再新建同义页 |
| /blog/geo-vs-seo-difference/ | GEO 和 SEO 的区别：从"争排名"转向"争引用" | GEO和SEO的区别 | Informational | GEO Basics | Pillar（3,680） | ❌ 意图已占满 |
| /blog/seo-to-geo-2026/ | 从 SEO 到 GEO：2026 年如何在 AI 搜索引擎中抢占流量？ | SEO转GEO | Informational | GEO Basics | 过渡指南（**含无来源口径**） | ⚠️ 需补来源 |
| /blog/seo-to-geo-transition/ | 从 SEO 到 GEO：企业转型实战案例 | SEO转GEO | Informational | GEO Basics | 案例（**编造，薄文 862**） | ⚠️ 建议改写/下线 |
| /blog/how-to-do-geo/ | GEO 优化怎么做：不是做五件事，是按顺序做对五层 | GEO优化怎么做 | Informational | GEO Framework | Pillar（3,770） | ✅ 允许扩展子问题（页面类型、术语、改造顺序） |
| /blog/how-to-get-cited-by-ai/ | 如何让 AI 引用我的网站：引用要连过三道关 | 如何让AI引用我的网站 | Informational | AI Citation | Pillar（4,236） | ✅ 允许扩展（引用口径、页面类型） |
| /blog/ghost-citations-geo-2026/ | "被引用"≠"被记住"：幽灵引用诊断与修复 | 幽灵引用 | Informational | AI Citation | 概念+方法（3,132） | ❌ 意图已占 |
| /blog/how-to-get-recommended-by-ai/ | 品牌如何被 AI 搜索推荐：AI 在选供应商 | 品牌如何被AI搜索推荐 | Informational | AI Visibility | Pillar（4,672） | ✅ 允许扩展（竞品对标、第三方资产） |
| /blog/geo-brand-diagnosis-guide/ | 品牌 AI 可见度诊断：用 8 个问题量出位置 | 品牌AI可见度诊断 | Informational | AI Visibility | 诊断方法（3,602） | ✅ 允许扩展（信息正确性、品牌词归属） |
| /blog/geo-content-strategy/ | GEO 时代的内容策略：如何让 AI 引用你的内容 | GEO内容策略 | Informational | GEO Content | 方法（**薄文 893，标题抢词**） | ⚠️ 收敛标题后可扩展"改造顺序" |
| /blog/structured-data-guide/ | 结构化数据与 Schema.org：GEO 的技术基石 | 结构化数据指南 | Informational | GEO Technical | 技术（**薄文 761**） | ✅ 待更新为技术 Pillar |
| /blog/chatgpt-optimization/ | ChatGPT 搜索优化：它不再搜全网，而是在点名取数 | ChatGPT搜索优化 | Informational | AI Platform-Global | 平台 Pillar（4,219） | ✅ 允许扩展（平台对比） |
| /blog/doubao-deepseek-domestic-geo-guide/ | 豆包 + DeepSeek 双引擎拆解 | 豆包GEO优化 | Informational | AI Platform-Domestic | 平台（4,179） | ✅ 允许扩展（跨平台差异诊断） |
| /blog/geo-2026-08-26-ai-citation-guide/ | 想被 AI 引用，先看懂六大模型的官方规则 | 六大模型官方规则 | Informational | AI Platform | 规则拆解（5,860） | ✅ 允许扩展（llms.txt 决策等子题） |
| /blog/ai-search-readiness-audit/ | 50 站实测：AI 就绪度三层断层 | AI就绪度 | Research/Data | AI Search | **新闻/研究**（2,727） | ❌ 单次数据，不再重复同题 |
| /blog/geo-2026-08-recap/ | 2026 年 8 月 GEO 行业剧变 | GEO行业趋势 | Research/Data | AI Search | **新闻**（3,374） | ❌ 时事型 |
| /blog/geo-2026-08-w4-search-to-delivery/ | 搜索正在从"给链接"变成"给交付" | AI搜索趋势 | Research/Data | AI Search | **新闻**（3,547） | ❌ 时事型 |
| /blog/geo-2026-08-citation-evidence-sourcing/ | AI 引用从"声量分配"进入"证据采购" | AI引用趋势 | Research/Data | AI Search | **新闻**（4,380） | ❌ 时事型 |
| /blog/geo-ai-search-accounting-era/ | AI 搜索进入「算账时代」 | AI搜索数据 | Research/Data | AI Search | **新闻**（3,906） | ❌ 时事型 |
| /blog/ai-mode-model-churn-guide/ | Gemini Flash 三周一换：先查模型版本再改内容 | AI引用波动原因 | Informational | AI Citation | **新闻+方法**（3,016） | ✅ 允许（站点侧原因排查） |
| /blog/ai-citations-product-pages/ | 产品页吃掉 24.1% 的 AI 引用 | 产品页AI引用 | Research/Data | AI Citation | **新闻**（3,286） | ✅ 允许（B2B 决策链视角） |
| /blog/chatgpt-ads-era-geo/ | ChatGPT 答案页开始卖广告了 | ChatGPT广告 | Informational | AI Platform-Global | **新闻**（2,517） | ❌ 时事型 |
| /blog/google-august-spam-update-geo-enforcement/ | GEO 进入「执法季」：Google 8 月垃圾更新 | Google垃圾更新 | Informational | AI Search | **新闻**（2,418） | ❌ 时事型 |
| /blog/geo-daily-2026-08-27/ | AI 推荐你，却引用别家网站 | AI品牌提及 | Informational | AI Visibility | **新闻**（3,143） | ✅ 允许（第三方资产接回） |
| /blog/geo-daily-2026-08-28/ | 搜索的规则正在裂开：Google 三件大事 | Google动态 | Informational | AI Search | **新闻**（1,820） | ❌ 时事型 |
| /blog/geo-daily-2026-08-31/ | AI Overviews 自动展开、Google 首次分轨 | AIOverviews | Informational | AI Search | **新闻**（2,115） | ✅ 允许（AIO 常青策略） |
| /blog/geo-daily-2026-09-01/ | GSC 生成式 AI 报告全球上线 | GSC生成式AI报告 | Research/Data | AI Search | **新闻**（2,469） | ✅ 允许（数据源手册） |

**统计**：27 篇中 **13 篇（48%）为新闻/趋势型**；标记 ❌（意图占满、不可扩展）的 9 篇全部集中在新闻型与基础定义型。

---

## 三、当前关键词 / Search Intent 覆盖地图

| Topic | 已覆盖 | 部分覆盖 | 缺失 | 优先级 |
| --- | --- | --- | --- | --- |
| GEO 基础定义 | W1 GEO vs SEO（强） | 什么是GEO（薄文 864，抢词） | — | P1（改写） |
| GEO 执行框架 | how-to-do-geo（五层，强） | — | 页面类型级优先级、存量改造顺序 | P1 |
| AI 引用获取 | how-to-get-cited（三关，强）+ 幽灵引用 | 引用口径测量 | 服务页/产品页不出引用、内部术语映射 | **P0** |
| AI 推荐 | how-to-get-recommended（三要素，强） | 品牌诊断 8 问 | **竞品对标诊断、第三方资产被引用** | **P0** |
| 品牌实体与信息正确性 | — | 品牌诊断（位置） | **AI 说错品牌信息、品牌词答案无官网** | **P0** |
| AI Platform · Google | —（仅 2 篇新闻） | — | **Google AI Overviews / AI Mode 常青策略** | **P0** |
| AI Platform · Perplexity | — | — | 平台对比（vs ChatGPT） | P1 |
| AI Platform · 国内 | doubao-deepseek（强） | 六大模型规则 | 国内 vs 海外差异**诊断** | P2 |
| AI Crawler / 抓取执行层 | /tool/ 工具（能力已上线） | — | **robots 声明 vs CDN 执行、JS 渲染、llms.txt 决策** | **P0** |
| 结构化数据 / Schema | structured-data-guide（薄文） | FAQ 退场后的价值重排 | 技术 Pillar 更新 | P1 |
| Entity / 知识图谱 | — | — | 完全缺失 | P1（第 2 个月） |
| GEO 价格与周期（交易） | — | — | **完全缺失（询盘前最后一问）** | **P0** |
| B2B / 出海 / SaaS | — | — | **完全缺失（4 个库内 P1/P2 词无落地页）** | **P0** |
| SEO × AI（差异化主线） | — | — | **排名与引用的关系、审计如何加 GEO 检查项** | **P0** |
| 数据 / 实验 / 案例 | 第三方数据新闻 13 篇 | 引用率测量口径 | **GEOVA 自有实验与改造日志** | P1（待实测） |
| GEOVA 方法论 | 散落在 4 篇 Pillar | — | **统一框架 + 审计框架成体系** | **P0** |
| 工具 / 商业承接 | /tool/ + 4 个服务页 | — | 内容→工具→服务的显式路径 | P1 |

---

## 四、内容缺口地图

**已覆盖（有质量、不再新建）**：GEO vs SEO、GEO 怎么做、如何让 AI 引用、品牌如何被 AI 推荐、ChatGPT 平台机制、幽灵引用、8 月行业大事（4 篇日更 + 4 篇专题）。

**部分覆盖（有文章但需补齐或改写）**：什么是 GEO（薄+抢词）、GEO 内容策略（薄+抢词）、结构化数据（薄，待 W7）、SEO→GEO（2 篇重复，1 篇编造数据）、AI 引用测量的口径（分散在多篇）。

**完全缺失（符合定位、应尽快补）**：Google AI Overviews / AI Mode 策略、AI 爬虫执行层（声明 vs 执行）、JS 渲染与 AI 抓取、llms.txt 决策、品牌信息正确性、竞品 AI 对标、服务页/产品页引用缺口、内部术语映射、B2B / 出海 / SaaS / 价格与周期、SEO 审计 × GEO、GEOVA 框架与审计框架、自有实验数据。

**暂时不建议（有需求但不适合现在做）**：
1. 纯新闻日更（GEO Daily 已证明边际递减，且 48% 已是新闻）；
2. 「什么是 X GEO」平台介绍型（ChatGPT/Gemini/Perplexity 各自的"是什么"）；
3. 纯开发向内容（爬虫源码、API 调用教程）；
4. 搜索意图弱的行业词（GEO 市场规模 P3、个人品牌 P2 → 第 2 个月再看）；
5. 无真实项目支撑的案例页（`/cases/` 必须等真实项目，禁止虚构）；
6. 任何与 R1–R6 同意图的"新包装"文章。

---

## 五、30 天内容计划

> 比例严格按需求执行：**AI Search Problem 7 · Enterprise/B2B/International 6 · SEO + GEO 4 · Technical GEO 3 · AI Platform Comparison 3 · Data/Experiment 5 · GEOVA Methodology 2 = 30**。
> 内链 = `上级主题页` + `2–3 篇语义相关旧文` + `1 个商业承接页`；标注「(新)」的指计划中先发布的那一篇。

### A. AI Search Problem（7 篇）

| Day | 标题 | 主关键词 | 次关键词 | Search Intent | 内容类型 | 为什么值得写 | 避免与哪篇重复 | 建议内链 | CTA | 优先级 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | AI 说错了你的品牌信息：事实源冲突的诊断与修正顺序 | 品牌信息 AI 错误（待 SERP 验证） | AI 品牌描述错误、事实源、实体冲突 | Problem Solving | 问题诊断+方法 | 企业最高频投诉之一，且与实体/结构化数据/About 页强相关；**27 篇零覆盖** | 与 `/blog/geo-brand-diagnosis-guide/`：那篇测"位置"，本篇治"对错" | 上级 `/blog/how-to-do-geo/`；旧文 `geo-brand-diagnosis-guide`、`structured-data-guide`；商业 `/services/geo-optimization/` | GEO 优化服务 | **P0** |
| 2 | AI 可见度对标：把 5 个竞品放进同一份提问集，量出你差在哪 | AI 竞品对标（待 SERP 验证） | AI 竞品分析、对标提问集、竞品被推荐 | Commercial Investigation | 对标方法+商业 | 决策人最常问的问题；**只交付对标流程与交付物**（提问集模板 + 记录表 + 结论写法），不复述推荐机制 | 与 `how-to-get-recommended-by-ai`（名单形成机制）：机制部分只做内链，本篇输出可复用的对标方法 | 上级 `/blog/how-to-get-recommended-by-ai/`；旧文 `geo-brand-diagnosis-guide`、`ai-citations-product-pages`；商业 `/services/geo-audit/` | GEO 人工诊断 | **P0** |
| 3 | AI 搜索流量不转化：先分清三种「AI 访问」再谈优化 | AI 搜索转化率（**库内 P2**，未落地） | AI 流量质量、AI 访问类型、转化口径 | Problem Solving | 问题+数据读法 | 库内 P2 词无落地页；企业普遍反馈「AI 流量来了不转化」，根源是把三种访问混为一谈（引用落地 / 品牌搜索回访 / 浏览器直访） | 与 `geo-ai-search-accounting-era`（GA4 误记归因）、`how-to-get-cited-by-ai`（引用率三字段）：本篇只解决「转化口径与三种访问的拆分」 | 上级 `/blog/how-to-get-cited-by-ai/`；旧文 `geo-ai-search-accounting-era`、`geo-daily-2026-09-01`；商业 `/services/geo-optimization/` | GEO 优化服务 | P1 |
| 4 | 网站改版或域名迁移后 AI 引用掉了：5 个断点排查 | 改版后 AI 引用下降（待 SERP 验证） | 域名迁移、AI 可见度下降 | Problem Solving | 排查清单 | 改版/迁移是高频触发事件；可形成常青检查资产 | 与 `ai-mode-model-churn-guide`：那篇先排除"模型换代噪声"，本篇只查站点侧 | 上级 `how-to-do-geo`；旧文 `ai-mode-model-churn-guide`、`structured-data-guide`；商业 `/services/seo-audit/` | SEO/GEO 诊断 | P1 |
| 5 | 中英文站点：为什么只有一边进得了 AI 答案 | 中英文站 AI 可见度（待 SERP 验证） | 多语言 AI 引用、语言层差异排查 | Problem Solving | 排查方法 | 双语站点普遍「一边被引用、一边零引用」；现有 27 篇只有平台机制与站点结构，**没有任何一篇讲语言层排查** | 与 `doubao-deepseek-domestic-geo-guide`（平台机制）、Day 9 出海（站点结构决策）：本篇是「已存在的双语站点如何排查差异」 | 上级 `/blog/how-to-do-geo/`（Day 9 发布后改为 `/blog/geo-for-overseas-brands/`）；旧文 `how-to-do-geo`、`geo-2026-08-26-ai-citation-guide`；商业 `/services/geo-audit/` | GEO 人工诊断 | P1 |
| 6 | 搜自己品牌名，AI 答案里没有官网：品牌实体归属治理 | 品牌词 AI 答案（待 SERP 验证） | AI 品牌实体、官网缺席 | Problem Solving | 治理方法 | 可自助验证、痛点直观；与实体/About/Schema 强相关 | 与 `geo-2026-08-recap`（品牌词劫持是新闻事件）：本篇是常青治理 | 上级 `how-to-do-geo`；旧文 `what-is-geo`、`geo-brand-diagnosis-guide`；商业 `/services/geo-audit/` | GEO 人工诊断 | P1 |
| 7 | 你的产品叫法 AI 不认识：把内部术语映射成 AI 的词汇表 | 行业术语 AI 收录（待 SERP 验证） | 产品名映射、同义词、内部叫法 | Problem Solving | 方法 | 术语错配是"检得到"失败的隐形原因，B2B 尤甚；完全空白 | 与 `how-to-get-cited-by-ai`（三道关总论）：本篇只做"词汇映射"一件事 | 上级 `how-to-get-cited-by-ai`；旧文 `how-to-do-geo`、`structured-data-guide`；商业 `/services/geo-optimization/` | GEO 优化服务 | P2 |

### B. Enterprise / B2B / International（6 篇）

| Day | 标题 | 主关键词 | 次关键词 | Search Intent | 内容类型 | 为什么值得写 | 避免与哪篇重复 | 建议内链 | CTA | 优先级 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 8 | B2B 企业做 GEO：采购决策链上有 4 种提问，分别归谁管 | B2B企业GEO优化（**库内 P1** → `/blog/b2b-geo-optimization/`） | 决策链提问、证据资产、B2B AI 搜索 | Commercial Investigation | 行业 Pillar | 库内规划且完全缺失；B2B 决策链（业务/技术/采购/高层）在 AI 里问的是不同问题，需要不同证据资产。**SaaS 场景（原 Day 13）并入本篇做一个 H2**，不再单独成篇 | 与 `ai-citations-product-pages`（「产品页 24.1%」数据）：**该论点已被旧文覆盖，本篇不重复**，改讲决策链与证据类型分工 | 上级 `/services/geo-optimization/`；旧文 `ai-citations-product-pages`、`how-to-get-recommended-by-ai`、`how-to-do-geo`；商业 `/services/geo-optimization/` | GEO 优化服务 | **P0** |
| 9 | 出海企业 GEO：英文站与中文站，应该分开做吗？ | 出海企业GEO（**库内 P1** → `/blog/geo-for-overseas-brands/`） | 多语言 GEO、国际 AI 搜索 | Commercial Investigation | 行业/人群 | 出海是明确客群，库内已规划；站内零内容 | 与 `geo-2026-08-26-ai-citation-guide`：那篇讲六模型规则，本篇讲站点结构决策 | 上级 `/services/geo-optimization/`；旧文 `doubao-deepseek-domestic-geo-guide`、`geo-2026-08-26-ai-citation-guide`；商业 `/services/geo-optimization/` | 预约咨询 | P1 |
| 10 | 大规模站点 GEO：上万页里，先改哪 100 页？ | 大规模网站 GEO（待 SERP 验证） | 企业站优先级、批量优化 | Commercial Investigation | 方法+商业 | 企业客户真实约束是"不可能全改"；交付排序模型（引用价值×证据可摘性×改动成本） | 与 `how-to-do-geo`（五层顺序）：本篇解决"在存量里选谁" | 上级 `how-to-do-geo`；旧文 `ai-search-readiness-audit`、`geo-ai-search-accounting-era`；商业 `/services/geo-audit/` | GEO 审计 | P1 |
| 11 | 企业官网的 GEO 交接：市场部与 IT 各负责哪一半 | 企业 GEO 落地（待 SERP 验证） | GEO 分工、跨部门协作 | Commercial Investigation | 组织/流程 | 落地失败多因职责不清；天然承接培训与顾问服务 | 与 `how-to-do-geo`（做什么）：本篇解决"谁来做" | 旧文 `structured-data-guide`、`geo-content-strategy`；商业 `/services/training/`；上级 `/blog/how-to-do-geo/` | SEO/GEO 培训 | P1 |
| 12 | GEO 优化多少钱、多久见效：把报价单拆开给你看 | GEO优化多少钱（**库内 P1** → `/blog/geo-pricing/`） | GEO优化多久见效、GEO 报价 | Transactional | 商业内容 | **全站交易意图零覆盖**，却是询盘前最后一问；库内 W9 已规划 | 与所有方法文不同：本篇只谈定价结构与周期变量（库内注：周期若 SERP 重合则合并为同页） | 上级 `/services/geo-optimization/`；旧文 `how-to-do-geo`、`geo-brand-diagnosis-guide`；商业 `/contact/` | 直接咨询 | **P0** |
| 13 | GEO 外包的需求与验收：给代理商的 brief 与验收清单 | GEO 外包（待 SERP 验证） | GEO 需求文档、验收标准、代理商管理 | Commercial Investigation | 商业方法 | **甲方视角完全空白**——27 篇全是「自己做」，但多数有预算的客户是「买服务」，缺可用的采购与验收工具；直接对接咨询 | 与 Day 11（内部分工）、Day 12（价格）、Day 15（审计检查项）：本篇是「甲方如何写 brief 与验收」，角色不同 | 上级 `/services/geo-optimization/`；旧文 `how-to-do-geo`、`geo-brand-diagnosis-guide`；商业 `/contact/` | 预约咨询 | P1 |

### C. SEO + GEO（4 篇）

| Day | 标题 | 主关键词 | 次关键词 | Search Intent | 内容类型 | 为什么值得写 | 避免与哪篇重复 | 建议内链 | CTA | 优先级 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 14 | 排名第一也不被引用：把「SEO 已达标」和「AI 可引用」两套条件分开查 | SEO 排名 AI 引用（待 SERP 验证） | 排名与引用、SEO 与 GEO 关系、双清单排查 | Informational | 主张+对照清单 | GEOVA 差异化主线；**只用机制差异（守门人 / 三关，均有据）解释，不声称排名与引用的统计相关性**（无自有数据不编） | 与 `geo-vs-seo-difference`（六维对比）：本篇输出「两套条件对照表 + 排查顺序」，不复述六维 | 上级 `/blog/geo-vs-seo-difference/`；旧文 `how-to-get-cited-by-ai`、`ai-mode-model-churn-guide`；商业 `/services/seo-audit/` | SEO 全站诊断 | **P0** |
| 15 | SEO 审计如何加 GEO 检查项：把 AI 抓取与引用纳入技术审计 | SEO 审计 GEO 检查（待 SERP 验证） | 技术审计、AI 抓取检查 | Commercial Investigation | 方法+商业 | 站内唯一"SEO×AI"商业页 `/services/seo-audit/` **没有任何内容承接**；交付检查项清单 | 与 `how-to-do-geo`（GEO 自身流程）：本篇是审计者视角 | 上级 `/blog/geo-vs-seo-difference/`；旧文 `how-to-do-geo`、`structured-data-guide`；商业 `/services/seo-audit/` | SEO 全站诊断 | **P0** |
| 16 | 已有 SEO 内容改造为 AI 可引用：先改顺序，别急着重写 | 内容改造 AI 引用（待 SERP 验证） | 旧文改造、可摘录段落 | Informational | 方法 | 客户最关心成本（不想重写）；与工具、审计天然衔接 | 与 `geo-content-strategy`（薄文，讲策略）：本篇是存量改造的操作顺序 | 上级 `how-to-do-geo`；旧文 `geo-content-strategy`、`how-to-get-cited-by-ai`；商业 `/services/geo-optimization/` | GEO 优化服务 | P1 |
| 17 | 内链与实体：把 SEO 内链策略升级到 AI 可理解的实体层 | 内链 AI 抓取（待 SERP 验证） | 实体内链、内链结构、抓取路径 | Informational | 技术方法（SEO+GEO 交叉） | SEO 内链是成熟话题，但「内链如何影响 AI 的抓取路径与实体理解」**全站未覆盖**，且属于 SEO 团队既有工作流，改造成本低 | 与 `how-to-do-geo` 第 2 层（实体建设）、`structured-data-guide`（Schema）：本篇只讲**链接结构**这一件事 | 上级 `/blog/geo-vs-seo-difference/`；旧文 `how-to-do-geo`、`structured-data-guide`；商业 `/services/seo-audit/` | SEO 全站诊断 | P1 |

### D. Technical GEO（3 篇）

| Day | 标题 | 主关键词 | 次关键词 | Search Intent | 内容类型 | 为什么值得写 | 避免与哪篇重复 | 建议内链 | CTA | 优先级 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 18 | AI 抓不到、也读不懂：robots.txt、CDN/WAF 与 JS 渲染的一轮排查（合并原 18+19） | AI爬虫（**库内 P1** → `/blog/ai-crawlers/`，即 W8） | GPTBot、robots 与 WAF、JavaScript 渲染、CSR | Informational | 技术审计（一篇讲透） | 把「抓不到 / 读不懂」的六个技术断点**整合成一篇高价值审计文**（不拆成多篇低价值技术文），并配站内工具自测路径（8 爬虫 UA 探测 + 正文纯文本/CSR 检测） | 与 `/tool/`（功能说明）、`how-to-do-geo` 第 1 层（概览）：本篇深挖单一主题「技术通道」，工具只作自测手段 | 上级 `/tool/`；旧文 `how-to-get-cited-by-ai`、`geo-2026-08-26-ai-citation-guide`、`how-to-do-geo`；商业 `/services/geo-optimization/` | 免费工具 → 人工诊断 | **P0** |
| 19 | canonical、noindex、hreflang：三个把自己挡在 AI 之外的设置 | canonical noindex AI 抓取（待 SERP 验证） | AI 抓取屏蔽、hreflang、自我屏蔽排查 | Informational | 技术 | 三项都是 SEO 常规设置，但在 AI 抓取侧的表现与经典搜索并不一致；**全站无覆盖**，且属「低成本高影响」的排查项 | 与 Day 18（抓取通道排查）：本篇是「自我屏蔽与指向错误」类问题，属不同失败类型 | 上级 `/blog/how-to-do-geo/`；旧文 `structured-data-guide`、`how-to-get-cited-by-ai`；商业 `/services/seo-audit/` | SEO/GEO 诊断 | P1 |
| 20 | llms.txt 到底要不要做：官方口径、可验证收益与替代方案 | llms.txt（待 SERP 验证） | llms.txt 有用吗、Google 辟谣 llms.txt | Informational | 技术决策 | 争议大且官方已辟谣；**我们自己站上就有 llms.txt**，可诚实写"为什么保留、它不解决什么" | 与 `geo-2026-08-26-ai-citation-guide`（新闻式引用辟谣）：本篇是专题决策指南 | 上级 `/blog/how-to-do-geo/`；旧文 `geo-2026-08-26-ai-citation-guide`、`structured-data-guide`；商业 `/services/geo-optimization/` | GEO 优化服务 | P1 |

### E. AI Platform Comparison（3 篇）

| Day | 标题 | 主关键词 | 次关键词 | Search Intent | 内容类型 | 为什么值得写 | 避免与哪篇重复 | 建议内链 | CTA | 优先级 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 21 | ChatGPT vs Perplexity：同一个问题，两套引用风格 | ChatGPT Perplexity 对比（待 SERP 验证） | 平台差异、引用风格、Perplexity SEO（**库内 P2**） | Informational | 平台对比 | 库内 Perplexity 专题仅规划未落地；对比优于"平台介绍" | 与 `chatgpt-optimization`（单平台三道门）：本篇只做差异与联合策略 | 上级 `chatgpt-optimization`；旧文 `how-to-get-cited-by-ai`、`geo-brand-diagnosis-guide`；商业 `/services/geo-optimization/` | GEO 优化服务 | P1 |
| 22 | AI Mode 是什么：它和 AI Overviews、经典搜索的关系，以及内容该怎么做 | AI Mode是什么（**库内 P2** → `/blog/google-ai-mode/`） | Google AI Overviews优化（**库内 P1**）、Gemini | Informational | 平台（概念+策略） | 库内 W6 规划；**「共用同一索引」这条官方口径已被 `geo-2026-08-26-ai-citation-guide` 覆盖**，本篇改聚焦 AI Mode 这一新入口（对话式/多轮/任务化）与经典搜索的差异及内容应对 | 与 `geo-2026-08-26-ai-citation-guide`（官方收录机制）：本篇是产品形态与内容策略，不重复机制 | 上级 `/blog/chatgpt-optimization/`；旧文 `geo-2026-08-26-ai-citation-guide`、`geo-daily-2026-08-31`；商业 `/services/seo-audit/` | SEO/GEO 诊断 | **P0** |
| 23 | 国内 vs 海外 AI：同一套内容，为什么两头表现不同 | 国内海外 AI 差异（待 SERP 验证） | 豆包 vs ChatGPT、跨平台可见度 | Informational | 平台对比 | 国内客群必问；已有素材（双引擎拆解 + 六模型规则）但缺"差异诊断" | 与 `doubao-deepseek-domestic-geo-guide`（机制拆解）、`geo-2026-08-26-ai-citation-guide`（规则）：本篇是诊断方法 | 上级 `/blog/doubao-deepseek-domestic-geo-guide/`；旧文 `geo-2026-08-26-ai-citation-guide`、`how-to-get-recommended-by-ai`；商业 `/services/geo-audit/` | GEO 人工诊断 | P2 |

### F. Data / Experiment（5 篇｜**未实测前禁止发布任何结论**）

| Day | 标题 | 主关键词 | 次关键词 | Search Intent | 内容类型 | 为什么值得写 | 避免与哪篇重复 | 建议内链 | CTA | 优先级 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 24 | AI 引用数据源盘点：可公开获取的 5 类数据与各自的盲区 | AI 引用数据（待 SERP 验证） | 数据源、GSC 生成式报告、第三方监测 | Research / Data | 研究盘点 | 9/1 GSC 生成式报告上线后企业更困惑"信哪个"；本篇只盘点公开来源与盲区，**不含自有结论** | 与 `geo-daily-2026-09-01`（新闻）、`geo-ai-search-accounting-era`（四本账）：旧文解读具体数字，本篇只做「数据获取渠道 + 各自盲区 + 组合使用」的工具书 | 上级 `/blog/how-to-get-cited-by-ai/`；旧文 `geo-daily-2026-09-01`、`geo-ai-search-accounting-era`；商业 `/tool/` | 免费工具 | P1 |
| 25 | GEOVA 实验 001：10 个提问集 × 20 个站点，AI 引用分布长什么样 | GEOVA 实验（自有） | AI 引用分布、提问集 | Research / Data | 实验 | **全站没有任何 GEOVA 自有数据**，这是与竞品最大的差距；本实验全部用公开可复现方法 | 与 `ai-search-readiness-audit`（第三方 50 站研究）：本篇是自有口径与方法 | 上级 `/blog/how-to-do-geo/`；旧文 `how-to-get-cited-by-ai`、`geo-brand-diagnosis-guide`；商业 `/services/geo-audit/` | GEO 人工诊断 | P1（**待 GEOVA 实际测试后发布**） |
| 26 | GEOVA 实验 002：加一张对比表，AI 引用会变吗 | GEOVA 实验（自有） | 对比表、可摘录结构 | Research / Data | 实验 | 站内已有第三方结论（对比表红利），需要用自有数据验证一遍 | 与 `geo-ai-search-accounting-era`（第三方数据）：本篇是自测复现 | 上级 `how-to-do-geo`；旧文 `geo-ai-search-accounting-era`、`how-to-get-cited-by-ai`；商业 `/services/geo-optimization/` | GEO 优化服务 | P1（**待实测后发布**） |
| 27 | GEOVA 实验 003：结构化数据对 AI 引用的实际影响 | GEOVA 实验（自有） | Schema、JSON-LD、引用率 | Research / Data | 实验 | 行业普遍假设"Schema 就能提升引用"，需要自有数据检验（可能得出"影响有限"的反直觉结论） | 与 `structured-data-guide`（部署指南）：本篇是效果验证 | 上级 `structured-data-guide`；旧文 `geo-vs-seo-difference`、`how-to-get-cited-by-ai`；商业 `/services/geo-optimization/` | GEO 优化服务 | P1（**待实测后发布**） |
| 28 | GEOVA 改造日志：用我们自己的工具改造 geova.cn 的前后对比 | GEOVA 改造日志（自有） | 站内改造、Crawler Access Test、评分对比 | Research / Data | 实验/日志 | **素材已具备**（工具 3 维评分 + 8 爬虫探测 + 历史审计报告），是"用自己当案例"的最低成本信任资产 | 与审计报告类文档（内部）：本篇是对外可公开的方法与结果 | 上级 `/tool/`；旧文 `how-to-do-geo`、`geo-brand-diagnosis-guide`；商业 `/services/geo-audit/` | 免费工具 → 人工诊断 | P1（**待实测后发布**；不得虚构前后数据） |

### G. GEOVA Methodology（2 篇）

| Day | 标题 | 主关键词 | 次关键词 | Search Intent | 内容类型 | 为什么值得写 | 避免与哪篇重复 | 建议内链 | CTA | 优先级 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 29 | GEOVA GEO 框架 1.0：抓取 → 采信 → 摘录 → 推荐 | GEO 框架（待 SERP 验证） | GEOVA 方法论、四层模型 | Informational | 方法论 | **从 4 篇 Pillar 抽取共同结构**（五层顺序 + 三道关 + 推荐三要素 + 诊断 8 问），形成 GEOVA 独有资产 | 不是总结已有文章：本篇给"统一模型 + 使用顺序"，各 Pillar 仍是细节入口 | 上级 `/services/geo-optimization/`；旧文 `how-to-do-geo`、`how-to-get-cited-by-ai`、`how-to-get-recommended-by-ai`、`geo-brand-diagnosis-guide`；商业 `/services/geo-optimization/` | GEO 优化服务 | **P0** |
| 30 | GEOVA 审计框架：AI 可见度审计的 6 个必查项与交付物 | GEO审计（**库内 P0** → `/services/geo-audit/`） | GEO 网站诊断、AI 搜索诊断 | Commercial Investigation | 方法论+商业 | 把工具能力（3 维评分 + 8 爬虫探测）与人力检查项整合成"可售卖的审计规格"，直接承接 P0 商业页 | 与 `/services/geo-audit/`（销售页）：本篇是可验证的方法说明并指向服务 | 上级 `/services/geo-audit/`；旧文 `how-to-do-geo`、`geo-brand-diagnosis-guide`、`structured-data-guide`；商业 `/services/geo-audit/` | GEO 人工诊断 | **P0** |

**优先级分布**：P0 **10 篇（33%）**｜P1 **18 篇**｜P2 **2 篇**（语义审查后口径，见第十节）。

> 核对（语义审查后）：P0 = Day 1、2、8、12、14、15、18、22、29、30 = **10 篇（33%）**；P1 = Day 3、4、5、6、9、10、11、13、16、17、19、20、21、24、25、26、27、28 = **18 篇**；P2 = Day 7、23 = **2 篇**。合计 30 ✓。P0 不满盘，符合「不要给每篇都标 P0」。

---

## 六、与现有 12 周排期（W6–W12）的关系

| 库内排期 | 状态 | 本 30 天计划中的落点 | 说明 |
| --- | --- | --- | --- |
| W6 Google AI 专题 | 待写 | **Day 22**（AI Mode 定位，可用 `/blog/google-ai-mode/`；AIO 关键词并入） | 见第十节 C-2：避开已被旧文覆盖的「共用索引」口径 |
| W7 结构化数据 | 待写 | **Day 17**（新文）+ 改写 `/blog/structured-data-guide/` | 一个意图两件产出：新文答"还要不要做"，旧文改成"怎么部署" |
| W8 AI 爬虫 | 待写 | **Day 18**（`/blog/ai-crawlers/`，已合并 JS 渲染为一体） | 见第十节 D-5：技术内容整合为一篇高价值审计文 |
| W9 GEO 价格与周期 | 待写 | **Day 12**（`/blog/geo-pricing/`） | 周期意图按库内注记：SERP 重合则并入同页 |
| W10 B2B GEO | 待写 | **Day 8**（`/blog/b2b-geo-optimization/`） | 沿用库内 URL |
| W11 实体与知识图谱 | 待写 | **暂缓（第 2 个月）** | 本 30 天先由 Day 1/6 覆盖实体相关的两个高价值子问题；Pillar 级内容建议单独排 |
| W12 案例资产 `/cases/` | 待执行 | **暂缓（等真实项目）** | 库内明确"无真实项目不虚构"；Day 28 改造日志可先承担部分信任职能 |

**未纳入 30 天、建议放到第 2 个月的库内规划词**：跨境电商 GEO（P2）、个人品牌 AI 可见度（P2）、GEO 市场规模（P3）。

> 其中「AI 搜索转化率（P2）」已由语义审查补入 Day 3；「品牌提及优化（P1）」与 `/blog/geo-daily-2026-08-27/` 高度重叠，建议**改写该旧文为常青版**而不是新建（见第十节 D-2）。

---

## 七、内链与商业承接策略（遵循 V2.2 `03_Topic_Cluster` 内链规则）

1. **统一路径**：新文 → 上级 Pillar → `/tool/`（免费诊断）→ `/services/geo-audit/`（人工诊断）→ `/services/geo-optimization/`（优化服务）→ `/contact/`（咨询）。
2. **每个集群只喂一个 Pillar**：AI Citation 集群的新文统一指向 `how-to-get-cited-by-ai`；AI Visibility 集群指向 `how-to-get-recommended-by-ai`；技术类指向 `structured-data-guide` 或 `/tool/`。
3. **商业页只做一次**：一篇新文最多 1 个商业承接页，且必须与意图匹配（交易类 → `/contact/`；技术类 → `/tool/`；审计类 → `/services/geo-audit/`；培训类 → `/services/training/`）。
4. **SEO 线单独闭环**：Day 14/15/19 指向 `/services/seo-audit/`，把 SEO 客群引到唯一具备 SEO+AI 能力的商业页。
5. **Pillar 反向补链**：Day 29/30 发布后，回填 4 篇 Pillar 的显式内链（一致性信号）。

---

## 八、最终自检

### Duplicate Check（标题 / 主关键词 / Search Intent / Cluster / 语义重复）

- **标题重复**：30 个标题两两做关键词与意图比对，**无重复**；均未使用"M 完整指南 / M 优化指南 / 什么是 M / 如何做好 M"模板。
- **主关键词重复**：与 27 篇已发布文章的主关键词**零冲突**；与库内 104 词比对，新引入词仅 6 个（均标"待 SERP 验证"），其余全部沿用库内既有词语。
- **Search Intent 重复**：逐条写出"避免与哪篇重复"并给出分工，重点排除 5 组高危对：
  `what-is-geo`↔W1、`geo-content-strategy`↔W3、`seo-to-geo-*` 两篇互斥、`ai-search-readiness-audit`↔Day 25（第三方研究 vs 自有实验）。
- **语义层二次审查（第十节）另查出 5 处「标题不重复、但 Search Intent 实质重叠」的选题**：原 Day 3 / 5 / 13 / 17 已并入或删除、原 Day 19 已并入 Day 18；Day 2 / 8 / 14 / 22 已重定位。
- **Topic Cluster 重复**：每篇只归属一个主集群，不存在两篇争夺同一集群主位。
- **语义重复删除**：原候选中的「内容更新与快照刷新」「推荐名单三要素拆解」「AI 流量归因」三条，因与 `chatgpt-optimization`、`how-to-get-recommended-by-ai`、`geo-ai-search-accounting-era` 实质同题，**已删除**（宁少不滥）。

### Strategic Check

| 检查项 | 结果 |
| --- | --- |
| 符合 GEOVA.CN 定位 | ✅ 30 篇全部落在 SEO+GEO/企业服务/工具三条主线上，无纯科普堆量 |
| 同时体现 SEO + GEO | ✅ 专设 SEO+GEO 桶 4 篇（Day 14/15/16/17），并把 SEO 客群导向 `/services/seo-audit/` |
| 增加企业真实问题 | ✅ A 桶 7 篇全部是问题型（说错信息/竞品点名/服务页不引用/改版掉引用/第三方抢引用/品牌词无官网/术语不认识） |
| 增加商业搜索意图 | ✅ 交易类 1 篇（Day 12 价格）+ 商业调查类 8 篇（Day 2/8/9/10/11/13/15/30） |
| 增加 GEOVA 独有内容 | ✅ 方法论 2 篇（Day 29/30）+ 自有实验/日志 5 篇（Day 24–28） |
| 减少纯新闻内容 | ✅ 30 篇中 0 篇纯新闻（对比：现有 27 篇中 13 篇为新闻型） |
| 减少基础科普 | ✅ 0 篇"什么是 X"型（对比：现有 4 篇基础定义型，其中 3 篇为薄文） |
| 能形成内链网络 | ✅ 每篇均有上级 + 2–3 旧文 + 1 商业页；Day 29/30 反哺 Pillar |

### Quality Check

- 无"只换标题、本质同文"的选题（逐条分工已写入表格"避免与哪篇重复"列）。
- 5 篇数据/实验类**全部标注发布前置条件**（待实测），未预设任何结论或数字。
- 未使用任何虚构搜索量、排名或关键词难度。

---

## 九、待确认的三件事

1. **存量清理是否同步做**：R1–R6（尤其 R3 编造案例的 `seo-to-geo-transition`）建议在 30 天计划启动前处理，否则新内容再好也会被旧文拉低信任度。
2. **日更节奏**：本计划按"每天 1 篇"设计，但 Day 25–28（实验类）依赖实测，若测试未完成应**顺延而不是凑数**；是否接受"实验类未就绪时用第 2 个月的 P2 选题顶替"？
3. **是否启用 `_v2` 版本管理**：本文件为初版（仓库内无同名文件）；若后续调整，建议保留本版并按 `_v2` 递增。

---

## 十、语义层 Search Intent 二次审查（2026-09-22）

### 10.1 方法与判定口径

上一轮只做了**机器可查的三类检查**（标题重复、主关键词冲突、内链完整性）。本轮改用**语义判断**：

> 用户搜索这个新问题时，**真正想得到的答案**是否已经存在于 27 篇旧文章里？

判定标准（A/B/C/D）：

- **A 明显独立**：用户问题完全不同 → 保留。
- **B 部分重叠但有明确新意**：保留，但必须写明「新文解决旧文没有解决的什么」与「边界在哪」。
- **C 高度重叠**：标题不同、实质回答同一个 Search Intent → 必须修改。
- **D 实际应合并**：不应单独存在 → 并入旧文或改写旧文。

对照依据是 27 篇的**实际 H2 结构**（本轮抓取所得）+ 字数 + 意图，**不只看标题**。

### 10.2 保留（A：明显独立，问题完全不同）

| Day | 标题 | 判断 | 原因 |
| --- | --- | --- | --- |
| 1 | AI 说错了你的品牌信息：事实源冲突的诊断与修正顺序 | A | 27 篇没有一篇讲「信息正确性」（`geo-brand-diagnosis-guide` 测的是"位置"，`ghost-citations` 讲的是"不提品牌"） |
| 4 | 网站改版或域名迁移后 AI 引用掉了：5 个断点排查 | A | 全站无任何改版/迁移类内容；`ai-mode-model-churn-guide` 只负责先排除"模型换代"这一侧 |
| 9 | 出海企业 GEO：英文站与中文站，应该分开做吗 | A | 库内 P1 词无落地；27 篇只讲平台机制，没有任何站点结构/多语言决策 |
| 10 | 大规模站点 GEO：上万页里，先改哪 100 页 | A | 无任何"存量优先级排序"内容；与 `how-to-do-geo` 的"五层顺序"是不同问题（做什么 vs 先做哪个） |
| 11 | 企业官网的 GEO 交接：市场部与 IT 各负责哪一半 | A | 无组织/分工类内容，且天然承接培训服务 |
| 12 | GEO 优化多少钱、多久见效：把报价单拆开给你看 | A | **交易意图全站零覆盖**（库内 P1 已规划），与方法类文章意图完全不同 |
| 25 | GEOVA 实验 001：10 个提问集 × 20 个站点 | A | 自有数据资产，27 篇数字全来自第三方（**待实测后发布**） |
| 26 | GEOVA 实验 002：加一张对比表，AI 引用会变吗 | A | 同上；用自有数据复现第三方结论（**待实测后发布**） |
| 27 | GEOVA 实验 003：结构化数据对 AI 引用的实际影响 | A | 同上；可能得到反直觉结论（**待实测后发布**） |
| 28 | GEOVA 改造日志：用我们自己的工具改造 geova.cn | A | 素材已具备（工具评分 + 8 爬虫探测 + 审计报告），是"自己当案例"的最低成本信任资产（**待实测后发布**） |

### 10.3 保留但需明确边界（B）

| Day | 标题 | 与哪篇相邻 | 边界（新文只做什么 / 不做什么） |
| --- | --- | --- | --- |
| 2 | AI 可见度对标：把 5 个竞品放进同一份提问集 | `how-to-get-recommended-by-ai` | 机制（名单三要素）**只内链不复述**；新文只输出对标流程：提问集模板 + 记录表 + 结论写法 |
| 6 | 搜自己品牌名，AI 答案里没有官网：品牌实体归属治理 | `geo-2026-08-recap`（品牌词劫持） | 旧文是**新闻事件**；新文是常青**治理步骤**（实体归属、About、结构化数据） |
| 7 | 你的产品叫法 AI 不认识：内部术语映射 | `how-to-get-cited-by-ai`（检得到） | 旧文讲三道关原理；新文只交付「内部术语 → 用户口语 → AI 词表」的映射工作表 + 自测法 |
| 14 | 排名第一也不被引用：两套条件分开查 | `geo-vs-seo-difference`（六维对比） | 旧文讲概念差异；新文输出「SEO 达标项 vs AI 可引用项」对照表 + 排查顺序。**只讲机制差异，不声称排名与引用的统计相关性（无自有数据不编）** |
| 15 | SEO 审计如何加 GEO 检查项 | Day 30（GEOVA 审计框架） | 新文 = **增量视角**（在既有 SEO 审计里加什么，服务方视角）；Day 30 = 完整审计方法（交付物与评分口径） |
| 16 | 已有 SEO 内容改造为 AI 可引用 | `geo-content-strategy`、`how-to-do-geo` 第 3 层 | 旧文是策略/原理；新文是**存量页面的改造排序与验收** |
| 20 | llms.txt 到底要不要做 | `geo-2026-08-26-ai-citation-guide` | 旧文只提了 Google 辟谣这一句；新文是完整决策指南（口径 + 可验证收益 + 替代方案 + 我们自己的用法） |
| 21 | ChatGPT vs Perplexity：两套引用风格 | `chatgpt-optimization`、`geo-2026-08-26-ai-citation-guide`（对比总表） | 旧文：单平台机制 / 官方规则对比；新文：**同一问题的对照测试法**（可复现方法，不宣称差异结论） |
| 23 | 国内 vs 海外 AI：同一套内容两头表现不同 | `doubao-deepseek...`、`geo-2026-08-26-ai-citation-guide` | 旧文：机制拆解与官方规则；新文：跨阵营的**可见度差异诊断**（机制只内链） |
| 24 | AI 引用数据源盘点：5 类数据与盲区 | `geo-ai-search-accounting-era`、`geo-daily-2026-09-01` | 旧文解读具体数字；新文只做「获取渠道 + 各自盲区 + 组合使用」的工具书，不含结论 |
| 29 | GEOVA GEO 框架 1.0（抓取→采信→摘录→推荐） | 四篇 Pillar | **不是总结**：抽取公共结构 + 使用顺序；各 Pillar 仍是细节入口 |
| 30 | GEOVA 审计框架：6 个必查项与交付物 | Day 15 | 完整审计规格（含工具能力与交付物），承接 `/services/geo-audit/` |

### 10.4 需要修改（C：标题不同、实质同题）——已改

| Day | 原标题 | 与哪篇重叠 | 重叠原因 | 修改结果 |
| --- | --- | --- | --- | --- |
| 8 | B2B 企业做 GEO，为什么产品页可能比博客更重要？ | `/blog/ai-citations-product-pages/` | 旧文标题即「产品页…B2B 买家评估的 GEO 主战场已定」，**该论点已被覆盖**，新文会变成复述 | 改为「**B2B 企业做 GEO：采购决策链上有 4 种提问，分别归谁管**」，并吸收原 Day 13 的 SaaS 场景作一个 H2 |
| 22 | Google AI Overviews 与经典搜索：同一个索引，为什么表现不同 | `/blog/geo-2026-08-26-ai-citation-guide/` | 「AI Overviews 与经典搜索共用同一索引」是**已被旧文写过的官方口径** | 改为「**AI Mode 是什么：它和 AI Overviews、经典搜索的关系，以及内容该怎么做**」，聚焦新入口（库内 P2 词 `/blog/google-ai-mode/`） |

### 10.5 建议删除 / 合并（D）——已执行

| 原 Day | 原标题 | 应与哪篇合并 | 原因 |
| --- | --- | --- | --- |
| 3 | AI 只引用你的博客，不引用你的服务页 | → 原 **Day 10**（先改哪 100 页） | 两者都是「站内该先改哪些页面」；且新文原假设「服务页更难被引用」**与旧文数据相反**（产品页占引用 24.1%，是最高），继续写等于制造未经证实的前提 |
| 5 | 被 AI 引用的其实是你的经销商页面 | → 改写 `/blog/geo-daily-2026-08-27/` 为常青版 | 旧文（1,851 来源、自有站仅 2.8%、"推荐是品牌级计算"）**已经讲过同一现象与应对**；库内 P1「品牌提及优化」也应并入该旧文而不是新建 |
| 13 | SaaS GEO：自助用户与决策者两套答案 | → 原 **Day 8**（B2B 决策链） | 与 B2B 决策链同属"不同角色问不同问题"；拆两篇即重复 |
| 17 | FAQ 富结果退场之后：结构化数据还剩什么价值 | → **W7 改写 `/blog/structured-data-guide/`** | 旧文（7 天内发布）已写「FAQPage 从展示转为 AI 语料」；该议题应作为技术 Pillar 更新里的一个 H2，不单独成篇 |
| 19 | JavaScript 渲染与 AI 抓取 | → 原 **Day 18**（合并为一篇技术审计文） | 两篇同属"AI 抓不到/读不懂"的排查，拆开就是低价值技术文；合并后配工具自测路径，价值更高 |

### 10.6 重新补充（5 篇，全部来自库内未落地词或全站真实空白）

| 位置 | 新标题 | 主关键词 | 缺口依据 |
| --- | --- | --- | --- |
| Day 3 | AI 搜索流量不转化：先分清三种「AI 访问」再谈优化 | AI 搜索转化率（**库内 P2**，未落地） | 库内词无落地页；企业普遍反馈"AI 流量不转化"，实际是把三种访问混为一谈 |
| Day 5 | 中英文站点：为什么只有一边进得了 AI 答案 | 中英文站 AI 可见度（待 SERP 验证） | 双语站点普遍"一边被引用一边没有"；27 篇无任何语言层排查内容 |
| Day 13 | GEO 外包的需求与验收：给代理商的 brief 与验收清单 | GEO 外包（待 SERP 验证） | **甲方视角全空白**——27 篇全是"自己做"，但多数有预算的客户是"买服务" |
| Day 17 | 内链与实体：把 SEO 内链策略升级到 AI 可理解的实体层 | 内链 AI 抓取（待 SERP 验证） | SEO 内链是成熟话题，但"内链如何影响 AI 抓取路径与实体理解"全站未覆盖，且改造成本低 |
| Day 19 | canonical、noindex、hreflang：三个把自己挡在 AI 之外的设置 | canonical noindex AI 抓取（待 SERP 验证） | 三项 SEO 常规设置在 AI 抓取侧表现不一致，属"低成本高影响"排查项，全站无覆盖 |

### 10.7 最终检查（逐项回答）

| 检查项 | 结论 |
| --- | --- |
| **30 篇最终是否成立** | **成立**。比例仍为 7 / 6 / 4 / 3 / 3 / 5 / 2；优先级 P0 10 篇（33%）/ P1 18 / P2 2（见第五节已同步更新的口径） |
| **是否存在明显的 Search Intent Cannibalization** | 审查前查出 **5 处**实质重叠（原 Day 3、5、13、17、19）与 **2 处论点已被旧文覆盖**（原 Day 8、22）→ **已全部处理**；现存 12 篇 B 类均已写明边界 |
| **是否存在只是换标题的文章** | 无。本轮删掉的 5 篇正是这一类（标题不同、实质同题） |
| **是否存在只为关键词而创建的文章** | 仅两篇偏关键词驱动：**Day 21**（Perplexity，库内 P2 词驱动）与 **Day 7**（术语映射）。两者都有真实问题与可交付方法，故保留；**若后续必须再压缩，这两篇排在最前** |
| **是否存在与商业定位无关的文章** | 无。每篇都有明确的商业承接页或服务指向（`/tool/`、`/services/geo-audit/`、`/services/geo-optimization/`、`/services/seo-audit/`、`/services/training/`、`/contact/`） |
| **Problem / Business / Research 是否足够** | 足够且偏重：Problem Solving 7（A 桶全部）+ 商业调查/交易 10（B 桶 6 + Day 2、14、15、30）+ Research/Data 5（Day 24–28）；纯 Informational 约 8 篇，全部有商业承接 |

### 10.8 关于「27 篇是否比 30 篇更合理」

**明确结论：修订后的 30 篇成立，不需要减到 27。** 理由：

1. 本轮删掉的 5 篇**都找到了替代选题**（不是删了留空），且替代项全部有真实依据——库内未落地词（AI 搜索转化率 P2、AI Mode P2）或全站真实空白（甲方采购/验收、内链×实体、canonical/noindex/hreflang）；
2. 替代选题与原选题**属于不同 Search Intent**，不是"换个说法凑数"。

**但标准不降低**：如果实际写作时发现其中任何一篇写不出**独有的答案**，应当直接砍掉，不要为凑 30 篇而写。下一批可优先合并的候选依次为：

1. **Day 21**（ChatGPT vs Perplexity）→ 可并入 ChatGPT 平台专题；
2. **Day 23**（国内 vs 海外）→ 机制部分已被 `doubao-deepseek` 与六模型文覆盖，只剩诊断方法；
3. **Day 24**（数据源盘点）→ 可并入 `/tool/` 的说明或服务文档。

> 审查执行方式：30 篇逐篇与 27 篇的**实际 H2 结构**对照（非标题比对），判定结果与修改**已直接落到第五节计划表**；本文件第五节与第十节口径一致，不存在两份冲突的计划。
