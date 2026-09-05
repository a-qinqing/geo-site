# GEOVA.CN SEO/GEO 全站工程审计报告（对照 V2.1 关键词体系）

- **审计日期**：2026-09-05
- **审计范围**：geova.cn 全站源码（Astro 5 + Cloudflare Pages），对照《GEOVA.CN 整站关键词体系 V2.1.xlsx》（10 个 sheet）
- **审计方式**：源码级静态审计（pages / components / layouts / content / config / dist 产物 / robots.txt / sitemap），未修改任何代码
- **审计人**：Claude（作为 GEOVA.CN SEO/GEO 架构师角色）
- **阶段**：第一阶段（理解 → 审计 → 规划 → 报告）。**未改动任何代码**，等待确认后再执行修改。

---

## 0. 重要说明：指令文件与实际 Excel 结构的出入

《指令-审计.txt》描述的 V2.1「十大部分」与实际 Excel 的 10 个 sheet **不完全一致**（实际 sheet 为：01_关键词总库V2、02_页面关键词映射、03_Topic_Cluster、04_内容排期_12周、05_执行规则、06_V2升级说明、07_原表复核对照、08_Schema_Matrix、09_GEO_KPI监控、10_V2.1升级路线图）。

- 「AI Platform-Global / Domestic」在 Excel 中体现为 **03_Topic_Cluster 的二级 Topic Cluster**，而非独立 sheet；
- 「GEO Proof Points / Cases」体现在 **02 映射表 + 10 路线图（P1-信任）** 中；
- 「Technical SEO / GEO Infrastructure」体现在 **08_Schema_Matrix + 05_执行规则** 中。

本报告以**实际 Excel 内容为准**，两者主题一致，不影响审计结论。另发现 Excel 自身少量数据质量问题（见 §F-9）。

---

## A. 当前网站架构

### A-1 技术栈

| 维度 | 现状 |
|---|---|
| 框架 | Astro 5.7（`package.json`），`output: "server"`（SSR）+ `@astrojs/cloudflare` v12 适配器 |
| 内容 | `astro:content` 集合 blog（21 篇 md + 1 篇 mdx = **22 篇文章**），`src/content/config.ts` |
| 渲染 | 博客文章静态预渲染（`[...slug].astro` 中 `export const prerender = true`）；其余页面（/、/services、/tool、/about、/contact、/blog、/api/scan）走 Worker SSR（`_routes.json` 可见排除清单） |
| 样式 | Tailwind CSS 3.4（仅本地组件样式，无远程字体实际加载） |
| SEO 基础设施 | `SEO.astro`（Title/Description/Canonical/OG/Twitter/Robots meta）、`JsonLDSchema.astro` 通用组件、`@astrojs/sitemap` |
| 分析 | GTM（GTM-KLSDF65Z，Layout.astro 内），表单提交推 `generate_lead` |
| 部署 | Cloudflare Pages；构建后 `postbuild` 自动跑 IndexNow 提交 |
| 中间件 | `middleware.ts`：为 SSR HTML 响应补 `charset=utf-8`（防中文乱码） |
| 验证 | 百度 meta（仅首页内联）、Bing/Baidu 验证文件位于**项目根目录**（未进 public，见 §C-10） |

### A-2 页面生成方式（实际存在的路由）

| 路由 | 文件 | 渲染 | 类型 |
|---|---|---|---|
| `/` | `src/pages/index.astro` | SSR | 首页 |
| `/services`（含 #seo-audit / #geo-optimization / #training 三个锚点区块） | `src/pages/services.astro` | SSR | **单一服务总页**（三个服务全部堆叠在同一页面） |
| `/tool` | `src/pages/tool.astro` | SSR | GEO 健康度诊断工具（前端 + `/api/scan`） |
| `/about` | `src/pages/about.astro` | SSR | 关于页（个人实体页，但**无任何 Schema、无真实姓名**） |
| `/contact` | `src/pages/contact.astro` | SSR | 咨询表单（web3forms + GTM 转化事件） |
| `/blog` | `src/pages/blog/index.astro` | SSR | 博客列表 |
| `/blog/[slug]` | `src/pages/blog/[...slug].astro` | **静态预渲染** | 22 篇文章 |
| `/api/scan` | `src/pages/api/scan.ts` | SSR | 诊断 API（robots + JSON-LD + 正文可读性检测） |
| `/sitemap.xml` | astro 配置 redirect | — | 301 → `/sitemap-index.xml` |
| 404 | **不存在** | — | 无自定义 404 页（`dist/` 无 404 产物） |

**架构核心事实**：V2.1 商业架构要求的 `/services/geo-optimization/`、`/services/seo-audit/`、`/services/training/`、`/services/geo-audit/`、`/cases/` **全部不存在**；当前三个服务挤在一个 `/services` 单页里，用 `#锚点` 区分——这是整个 V2.1 Mapping 无法落地的根本原因。

---

## B. URL Inventory（28 个现有 URL）

### B-1 非博客页面

| URL | 类型 | Title（`SEO.astro` 自动加「\| GEO 咨询」后缀） | Meta Description（节选） | H1 | Schema（JSON-LD） | 主要关键词（现状承接） | 当前内链（出链） | 状态 |
|---|---|---|---|---|---|---|---|---|
| `/` | 首页 | GEO 咨询 \| 专注 SEO & GEO 优化… | 专注 SEO 与 GEO…免费 15 分钟咨询 | 专注 SEO & GEO 优化，帮企业与个人重构搜索流量 | Person（匿名）+ Organization + ProfessionalService + WebSite(SearchAction→**死链 /search**) | 品牌词（弱：站内无 "GEOVA" 文本）、SEO优化、GEO优化 | →/contact、/services、/blog | 线上 |
| `/services` | 服务总页（兼服务承接页） | 服务项目 \| GEO 咨询 | SEO 全站诊断、GEO/AI 搜索可见度优化… | 服务项目 | ProfessionalService + FAQPage | SEO诊断、GEO优化、培训（三词同一页抢） | →/contact、/services#…（自锚）、/blog 仅首页 | 线上（与 V2.1 子页规划冲突） |
| `/tool` | 工具 | GEO 站点健康度诊断工具 \| GEO 咨询 | 免费检测 GPTBot/PerplexityBot/ClaudeBot/Bytespider… | GEO 站点健康度诊断 | WebApplication + FAQPage | GEO诊断工具、AI搜索可见度检测 | →/contact（结果页/FAQ/CTA） | 线上 |
| `/about` | 关于/实体 | 关于我 \| GEO 咨询 | 一位在 SEO 与 GEO 深耕 10+ 年的实践者… | 关于我 | **无** | GEO顾问/GEO优化师/个人品牌（**词未覆盖**） | →/contact | 线上 |
| `/contact` | 转化 | 预约咨询 \| GEO 咨询 | 预约免费 15 分钟咨询… | 预约免费 15 分钟咨询 | **无** | 咨询（长尾） | 侧栏 → 3 篇博客 + /services | 线上 |
| `/blog` | 博客列表 | 博客 \| GEO 咨询 | SEO 与 GEO 的前沿知识… | 博客 | **无** | SEO/GEO知识库 | →22 篇正文 | 线上 |

### B-2 博客文章（22 篇，全部静态）

| URL（slug） | 发布 | Category | 对应 V2.1 关键词（Excel「已有」标记） | 正文内链（相对 /blog 与 /contact 之外） | 备注 |
|---|---|---|---|---|---|
| what-is-geo | 08-01 | GEO 基础 | 什么是GEO/GEO是什么/生成式引擎优化 ✓ | **0**（含/contact 0） | 核心 Pillar，**内容孤岛** |
| structured-data-guide | 07-10 | 技术 | Schema.org优化/JSON-LD部署/结构化数据指南 ✓ | **0** | 技术 Pillar，**内容孤岛**；mdx 无内链 |
| geo-content-strategy | 07-25 | 策略 | AI友好内容策略/GEO内容策略 ✓ | **0** | Pillar，**内容孤岛** |
| seo-to-geo-transition | 07-18 | 案例研究 | SEO转GEO ✓ | **0** | 与 seo-to-geo-2026 **同意图双页** |
| seo-to-geo-2026 | 08-06 | (默认GEO) | AI搜索流量占比 ✓（P3） | 1（→/contact） | Title 同为「从 SEO 到 GEO：…」 |
| geo-brand-diagnosis-guide | 08-11 | GEO 实战 | 品牌AI可见度诊断 ✓ | 1（→/contact） | 诊断内容页 |
| ghost-citations-geo-2026 | 08-10 | GEO 深度研究 | 幽灵引用 ✓ | 1（→/contact） | 声明了 image 但**文件不存在且模板未用** |
| doubao-deepseek-domestic-geo-guide | 08-21 | 实战指南 | 豆包/DeepSeek/国内大模型GEO ✓ | 7（→/blog ×6 + /contact） | **国内支柱页实际存在** |
| ai-mode-model-churn-guide | 09-03 | 行业动态 | AI引用波动原因 ✓ | 4 | 时效型 |
| chatgpt-ads-era-geo | 08-25 | 行业趋势 | **未映射** | 3 | 事实上是 ChatGPT 平台内容 |
| geo-2026-08-26-ai-citation-guide | 08-26 | GEO 指南 | **未映射** | 1 | 「六大模型官方机制」= 事实上的 Global+Domestic 平台总文，**V2.1 未登记** |
| geo-2026-08-citation-evidence-sourcing | 08-24 | 行业动态 | **未映射** | 1 | 周报 |
| geo-2026-08-recap | 08-17 | 行业动态 | **未映射** | 1 | 月度综述 |
| geo-2026-08-w4-search-to-delivery | 08-22 | 行业动态 | **未映射** | 1 | 周报 |
| geo-ai-search-accounting-era | 08-19 | 行业动态 | **未映射** | 1 | 周报 |
| geo-daily-2026-08-27 | 08-27 | 行业趋势 | **未映射** | 4 | 日报（被 3 篇文章引用为锚点） |
| geo-daily-2026-08-28 | 08-28 | 行业趋势 | **未映射** | 0 | 日报 |
| geo-daily-2026-08-31 | 08-31 | 行业动态 | **未映射** | 1 | 日报 |
| geo-daily-2026-09-01 | 09-01 | 行业动态 | **未映射** | 3 | 日报 |
| ai-search-readiness-audit | 09-02 | 行业动态 | **未映射** | 5 | 50站实测 |
| google-august-spam-update-geo-enforcement | 08-20 | 行业动态 | **未映射** | 5 | 执法季 |
| ai-citations-product-pages | 09-04 | 行业动态 | **未映射** | 3 | 最新 |

> 注：正文「内链」统计为 markdown 相对链接；22 篇文章**没有一篇链到 /services 或 /tool 或 /about**。全站正文链到 /contact 共 17 次。

### B-3 V2.1 规划 URL vs 实际状态（Excel 目标 URL 落地情况）

| V2.1 目标 URL | 角色 | Excel 状态 | 实际 | 缺口 |
|---|---|---|---|---|
| /services/geo-optimization/ | GEO 商业承接（P0 核心） | 规划 | **不存在** | 主 Money Page 缺失；现由 /services#geo-optimization 锚点 + 首页代偿 |
| /services/seo-audit/ | SEO 商业承接（P0） | 规划 | **不存在** | 同上，/services#seo-audit |
| /services/geo-audit/ | 人工诊断承接（P0 漏斗中转） | 规划 | **不存在** | 工具→人工诊断断链 |
| /services/training/ | 培训（P1） | 规划 | **不存在** | /services#training |
| /cases/ | 案例/信任（P1） | 规划 | **不存在** | 全站无任何案例/证据页 |
| /blog/geo-vs-seo-difference/ | Pillar | 规划 | **不存在** | 内容已半埋在 what-is-geo 里 |
| /blog/how-to-do-geo/ | Pillar | 规划 | **不存在** | — |
| /blog/how-to-get-cited-by-ai/ | Pillar（AI Citation） | 规划 | **不存在** | — |
| /blog/how-to-get-recommended-by-ai/ | Pillar（AI Visibility） | 规划 | **不存在** | — |
| /blog/chatgpt-optimization/ | 平台 Pillar（Global） | 规划 | **不存在** | 素材分散在 2-3 篇新闻里 |
| /blog/perplexity-optimization/、/blog/google-ai-overviews-optimization/、/blog/entity-seo-knowledge-graph/、/blog/ai-crawlers/、/blog/geo-pricing/、/blog/geo-time-to-results/、/blog/b2b-geo-optimization/ | 集群 | 规划 | **不存在** | 12 周排期全部「待写」 |

**结论：V2.1 排期（W0–W12）当前执行进度 ≈ 0；关键词体系里 P0 商业词无一有独立落地页。**

---

## C. SEO 技术问题

按指令清单逐项：

1. **Title**
   - 页面级 Title 基本规范（含品牌后缀逻辑 `SEO.astro:62`）。
   - **博客 Title 普遍超长**：字符数 42–120（中文场景每字符 ≈ 2 个显示宽度），如 `geo-2026-08-26-ai-citation-guide` 114 字符、`geo-2026-08-citation-evidence-sourcing` 120 字符——加品牌后缀后远超 SERP 显示上限，且长句堆砌会稀释关键词密度。`doubao-deepseek-domestic-geo-guide` 97、`chatgpt-ads-era-geo` 92。
   - `/about` Title「关于我」、`/services` Title「服务项目」为**零关键词标题**（未含 GEO/SEO/诊断/顾问等核心词）。
2. **Meta Description**：全部页面均有且唯一，质量合格。无缺失。
3. **H1/H2 结构**：每页单 H1、结构清晰；博客正文 H2 组织良好。小问题：首页 H1 不含品牌词（GEOVA / GEO 咨询），H1 中品牌位置由 Title 承担；`/about` H1「关于我」无实体信息。
4. **Canonical**：`SEO.astro:45` 用 `Astro.url.pathname` 动态生成——**URL 形态未归一**。站内链接多数不带尾斜杠（Header nav `/services`），而 sitemap 输出带尾斜杠（`/services/`），两形态都可能 200，canonical 随请求形态漂移 → 潜在重复 URL 形态。需定一个标准并全站归一。
5. **Robots meta**：默认 `index, follow`，无页面误设 noindex；无参数化 URL（无分页/筛选），风险低。
6. **Sitemap**：存在且结构正确（`sitemap-index.xml` + `sitemap-0.xml`，28 个 URL，无 draft 混入）。缺陷：**lastmod 恒为构建时间**（`astro.config.mjs` 中 `lastmod: new Date()`），priority 全 0.7、changefreq 全 weekly，无层级区分——告诉爬虫「全部一样新、一样重要」。
7. **robots.txt**：总体健康（详见 §D）。根域 `geova.cn` 与 `www.geova.cn` 的关系、`/` 与无尾斜杠形态的归一需在 GSC 侧验证。
8. **404**：**无自定义 404 页**（无 `404.astro`，dist 无产物）→ 访客与爬虫遇到错误 URL 落到 Cloudflare 默认页，品牌与引导流失。
9. **Redirect**：仅有 `/sitemap.xml → /sitemap-index.xml` 301。无旧 URL 迁移需求（站点历史短），但未来拆服务页时需要 301 规划（见 §M）。
10. **Open Graph / 社交图**：**全站 og:image 指向 `/og-default.png`，该文件不存在**（`SEO.astro:50` 默认值；`public/` 只有 favicon/robots/2 个校验 txt）→ 所有页面在社交平台/Link 预览均为破图。`ghost-citations` 声明了 `image: /images/blog/ghost-citations.png`，但文件不存在且模板从未读取该字段（`[...slug].astro` 未传 `ogImage`）——双层失效。
11. **图片 alt**：全站几乎无 `<img>`（emoji 图标），不构成问题；无文章配图。
12. **内部链接**：见 §G——**当前为最大系统性问题之一**。
13. **面包屑**：仅博客正文注入 BreadcrumbList JSON-LD（`[...slug].astro:53-76`），**页面无可见面包屑 UI**；Schema 与可见结构不一致属低风险，但按 08_Schema_Matrix「有面包屑时」原则属于可选。
14. **页面可抓取正文**：SSR/静态 HTML 直出完整正文，无 CSR 隐患；`/tool` 结果由 JS 渲染但属功能层（非索引内容），无 SEO 风险。文章纯文本充足。
15. **SSR/SSG/CSR**：博客静态 ✓；其余核心页 SSR——Cloudflare Pages 上每个请求执行 Worker，**未设 Cache-Control/边缘缓存**，对 CWV 的 TTFB 与平台配额有隐性压力（P2 级）。
16. **CWV 风险**：低。无重型 JS/字体/图片，Tailwind 打包体积小；移动端菜单、工具页为唯一交互 JS。
17. **JS 渲染风险**：低（内容不依赖 JS）。

**附加技术发现**：`WebSite.potentialAction` 指向 `/search?q=`（`index.astro:105`），**该站无搜索页 → JSON-LD 里的 SearchAction 指向 404**。

---

## D. GEO 技术问题

1. **AI 爬虫放行**：✅ **核心正确**。robots.txt 显式放行：GPTBot、ChatGPT-User、OAI-SearchBot、PerplexityBot、Bytespider、anthropic-ai、Google-Extended、CCBot、Applebot、Amazonbot、YouBot、cohere-ai、FacebookBot；`*` 兜底 `Allow: /`。与「GEO 咨询站点必须被 AI 抓取」的定位一致，**无错误限制**（`/api/`、`/admin/`、`/draft/`、`/private/` 禁抓合理）。
2. **ClaudeBot 组缺失**：显式组写的是 `anthropic-ai`（旧代号），未按 Anthropic 现行规范列出 **ClaudeBot / Claude-SearchBot**（目前靠 `*` 兜底放行，行为正确，但语义不精确；工具页 FAQ 宣称检测 ClaudeBot）。建议补显式组，防止未来 `*` 策略变化误伤。
3. **Managed robots.txt 风险**（部署层，记忆确认）：Cloudflare「Managed robots.txt」若被开启，会在自建 robots 前注入 Bytespider 拦截组，**AI 爬虫被静默拦截**。必须保持关闭（维护项）。
4. **JSON-LD 现状总览**（按页）：
   - 首页：Person（**匿名**「GEO 咨询顾问」）+ Organization + ProfessionalService + WebSite —— 4 块，**无 WebPage/ItemList，SearchAction 死链**；
   - /services：ProfessionalService + FAQPage（FAQ 与可见 details 一致 ✓）；
   - /tool：WebApplication + FAQPage ✓（符合 08 矩阵；price 0 无聚合评分，未虚构 ✓）；
   - /about：**0 块**（应为 Person + Organization，实体页零 Schema）；
   - /contact：**0 块**；
   - /blog 列表：**0 块**（可加 CollectionPage，低优先）；
   - 博客正文：BlogPosting + BreadcrumbList ✓，但 `author.url = 首页`（Person 无独立实体页）。
5. **Organization/WebSite/Person 实体一致性（GEO 核心问题）**：
   - 全站品牌词文本是 **「GEO 咨询」**；域名 **geova.cn**；LinkedIn handle **geova-qin**；Schema name 全部写「GEO 咨询」；
   - **全站任何页面都没有出现过 "GEOVA" / "GEOVA.CN" 文本**（grep 证实，仅邮箱/LinkedIn/URL 含 geova）——Excel 品牌词 P0（geova、geova.cn、GEOVA GEO）没有任何可见文本锚点；
   - 页面也没有真实个人名（「秦丽芳」在站内 0 次出现），Person schema 匿名、sameAs 指向 LinkedIn，但 LinkedIn 页名 geova-qin 与站名 GEO 咨询 的关系未在任何地方声明；
   - 后果：AI 引擎（含知识图谱）难以把 `geova.cn → GEOVA → GEO咨询 → 顾问本人` 收敛成**一个实体**；「品牌实体统一」是 Excel 品牌词的既定动作，当前完全未做。
6. **AI 可见性基础设施**：无专门面向 AI 引用的统计/测试集落地（09_KPI sheet 全部待建），全站无 proof points。

---

## E. Schema 问题（对照 08_Schema_Matrix）

| 问题 | 位置 | 说明 |
|---|---|---|
| E-1 关于页零 Schema | /about | 矩阵 P1「Person + Organization」；当前为空 → 实体页没有实体标记 |
| E-2 联系页零 Schema | /contact | 至少 ContactPage/ContactPoint 级可选；低优先 |
| E-3 Person 实体匿名且 url=首页 | index.astro:15-39、blog[...slug]:35-38 | name「GEO 咨询顾问」非真实人名；author.url 指首页而非 /about → **两个 Person 相互矛盾**（首页 person.url 是首页自己） |
| E-4 Organization 无 logo / 无 founder 真实性 | index.astro:112-127 | founder 也叫「GEO 咨询顾问」；未声明 brand 与 domain 关系（可加 `sameAs` 域名、`alternateName: GEOVA`） |
| E-5 SearchAction 指向不存在搜索页 | index.astro:101-108 | /search 404 → 无效标注；站点无搜索功能时应**删除** potentialAction |
| E-6 单一 ProfessionalService 覆盖三服务 | index.astro/services.astro | 与 V2.1 拆页后应改为每个 Service 独立 URL 标注（当前是过渡形态，不虚构、不错误，但拆页后必须重构） |
| E-7 FAQ 与可见内容一致 ✓ | /services、/tool | 做法正确（details 与 FAQPage 同文）——保留此模式 |
| E-8 博客类型单一 BlogPosting | [...slug].astro | 22 篇全部 BlogPosting；技术指南类可考虑 TechArticle（矩阵 P0 建议「按实际类型」）；**不批量堆类型** |
| E-9 BreadcrumbList 无可见面包屑 | 博客页 | 低风险，可不改（Schema 与真实结构不冲突） |
| E-10 image 字段空 | BlogPosting | 无 `image` 属性 + og 图缺失（§C-10）→ 富结果/分享预览缺图 |

> 正面记录：全站 Schema 没有「虚构评分/评论/价格」类造假，符合矩阵「不要做什么」栏 —— 这是好底子，修复方向是**补缺 + 对齐实体**，而不是加量。

---

## F. V2.1 Keyword Mapping 问题（对照 Excel）

1. **F-1 商业词全面无承接（最严重）**：P0 词「GEO优化 / GEO优化服务 / AI搜索优化服务 / SEO诊断 / SEO全站诊断 / GEO审计 / GEO网站诊断 / AI搜索诊断 / AI搜索可见度 / GEO可见度优化 / AI引用优化 / 品牌AI可见度提升」等目标 URL（/services/geo-optimization/、/services/seo-audit/、/services/geo-audit/）**一个都没建**。当前全压在：首页（辅助定位，Excel 自己规定「首页不要抢商业长尾」）+ /services 单页锚点 + /tool。**多词一页、词页错位**。
2. **F-2 博客 vs 服务关键词内耗**：「什么是GEO」→ what-is-geo；但 **seo-to-geo-2026（Title「从 SEO 到 GEO：2026 年如何…」）与 seo-to-geo-transition（Title「从 SEO 到 GEO：企业转型实战案例」）同为「SEO转GEO」意图双页**，且 what-is-geo 内含「GEO 和 SEO 的关键区别」H2（Excel 规划的 geo-vs-seo-difference 内容半埋于此）→ 三个页面在「SEO→GEO/区别」认知词上互相抢。
3. **F-3 行业新闻文章脱离关键词体系**：22 篇中 **12 篇（>50%）为未映射的行业日报/周报**（ai-search-readiness-audit、ai-citations-product-pages、ai-mode-model-churn-guide、chatgpt-ads-era-geo、geo-2026-08-26-ai-citation-guide、geo-2026-08-*、geo-daily-*、google-august-spam-update…）。内容生产由「日报工作流」驱动，与 Excel「先 Pillar 后 Cluster」的排期**脱节**——12 周排期 W1-W12 全部「待写」，Pillar 零进度。
4. **F-4 关键意图「无主」**：「如何让 AI 引用我的网站 / 品牌如何被 AI 推荐 / 如何被 ChatGPT 引用」——这些 P1 问题词没有落地页；同时 geo-2026-08-26-ai-citation-guide 等文实际上已经覆盖部分内容但**未登记进词库**（词库↔内容双向脱节）。
5. **F-5 多页面抢词风险已现**：AI 引用/可见度类：geo-daily-2026-08-27（品牌提及 vs 链接）、ghost-citations、ai-citations-product-pages、geo-2026-08-citation-evidence-sourcing、ai-search-readiness-audit、chatgpt-ads-era-geo……**6+ 篇内容在「AI 引用/可见度」语义圈互相重叠**，无一个做枢纽（未来 how-to-get-cited-by-ai / how-to-get-recommended-by-ai 建成后需把新闻文改为「证据外链」角色，避免新枢纽与旧文抢词）。
6. **F-6 首页定位与 Excel 冲突**：首页实际把「SEO & GEO 优化、SEO 诊断、培训」三大服务全量露出（三张卡片 + 锚点），违反 05_执行规则「首页负责品牌+GEO核心品类认知，不再抢所有商业词」；Excel 对首页的要求是「GEO优化辅助 + 品牌」。首页结构调整属于 V2.1 W0 任务，未执行。
7. **F-7 AI Platform Global/Domestic 混乱（指令点名的检查项）**：Global 主题事实内容散在 chatgpt-ads-era-geo（ChatGPT）、geo-2026-08-26-ai-citation-guide（六模型混编）等未映射文章里；Domestic 唯一支柱 doubao-deepseek-domestic-geo-guide 存在且质量好，但缺 千问/Kimi 与「国产模型机制」持续更新机制；未来 Global 平台 Pillar（chatgpt-optimization 等）建页时须把这些新闻文降为支持性来源，防止同一平台 3 篇互相竞争。
8. **F-8 工具词 vs 商业词边界已守住 ✓**：/tool 标题/描述没有抢「GEO审计」商业词；FAQ 里明确区分免费工具与人工诊断（措辞可，缺落地页——见 H 漏斗）。
9. **F-9 Excel 自身数据质量问题（附注）**：01 词库 ID 97 重复两行且第二处实为 DeepSeek GEO 词错行；03_Topic_Cluster 中 AI Platform-Global/Domestic 行重复 3 次、存在「Domestic AI」混用集群名；02 映射表仅 11 行却含重复段落。审计判定为编辑残留，不影响策略，建议下版清理。

---

## G. Internal Link 问题

1. **G-1 博客是内容孤岛**：22 篇文章**零链接到 /services、/tool、/about**；仅有 17 次 →/contact。搜索结果进到文章后，唯一转化出口是「预约咨询」通用按钮——没有「去用免费工具」「看 GEO 优化服务」「读相关支柱文」的分层路径（Excel 映射表「必须内链到」列：全站未执行）。
2. **G-2 Pillar 互链为零**：what-is-geo / geo-content-strategy / structured-data-guide / seo-to-geo-transition 之间 0 交叉链接；what-is-geo 正文 0 链接（连 /contact 都没有）。Topic Cluster 语义无法在链接图上形成。
3. **G-3 列表页不送权重**：/blog 卡片直链文章，无分类聚合（category 只是色块文本，无 /blog/category 页面）、无「推荐文章/相关文章」模块、无分页——22 篇挤一页，无主题枢纽，文章权重全部孤悬。
4. **G-4 反向孤岛**：/about 与 /tool 之间 0 链接（Excel 要求「工具→GEO审计→GEO服务、实体→关于页→服务页」）；/about 只从 Header/Footer 可达。
5. **G-5 少量良性互链**：geo-daily-2026-08-27 被 3 篇引为数据来源锚点、structured-data-guide 被引 3 次——这是日报体系里唯一像样的互链行为，应扩展为「新闻→Pillar 证据链」规范动作。

---

## H. Conversion Funnel 问题（/tool → 人工诊断 → GEO 服务 → Lead）

实际路径：`/tool（免费扫描）→ 结果页文案链接 → /contact（通用表单）→ 邮件确认 → 15 分钟通话`。

1. **H-1 漏斗缺少中间层**：V2.1 要求 `工具 → /services/geo-audit/（人工深度诊断）→ /services/geo-optimization/`。人工诊断页不存在 → 工具用户只能跳到「预约免费 15 分钟咨询」，**没有「购买诊断服务」的交易台阶**，高意向用户（想直接买报告）被压成低意向咨询。
2. **H-2 表单选项与服务错位**：/contact 的「感兴趣的服务」下拉只有 seo-audit / geo-optimization / training / not-sure——**没有 GEO 审计/人工诊断选项**，工具结果页却说「人工深度诊断还覆盖…」，话术与承接错位。
3. **H-3 工具使用无埋点**：/tool 前端（scan 完成、报告完成）**没有 push 任何 dataLayer 事件**；只有 contact 表单提交推 `generate_lead`。09_KPI sheet 的「工具使用率/报告完成率/工具→人工诊断转化」**全部无法度量**。CTA 点击（首页/服务页/博客 CTA）也没有 click 事件。
4. **H-4 CTA 单一化**：全站 CTA 几乎只有一种文案「预约免费 15 分钟咨询」→ /contact；首页 → /services 为次要。无按漏斗阶段差异化的 CTA（工具结果页该推「深度诊断报告」，Pillar 页该推「工具 + 服务」双路径，价格文该推「直接咨询」）。
5. **H-5 信任层缺失**：无案例、无客户证据、无过程展示（Excel 也把 /cases/ 列为 P1 规划）；About 无姓名/照片/履历细节 → 转化前的信任闭环断在「我是谁」这一步（这影响的不只是转化，还有 GEO 的实体可验证性）。
6. **H-6 流程承诺未闭环**：表单承诺「24h 内邮箱回复」，无日历直约；弱（非必改）。
7. **H-7 正面项**：/contact 表单字段少而精、web3forms 直连、成功事件已埋 generate_lead、services 页 CTA 密度合理。

---

## I. Cases / Proof Points 问题

- `/cases/` **不存在**（Excel：P1「当前站点缺失的重要信任层」）；全站无任何案例、过程数据、可验证结果。
- 服务页文案有明确流程/交付物（内容可信），但全部为「承诺型」描述，**无任何可交叉验证的证据**。
- About 页声明「50+ 家企业服务」「100+ 篇文章」为数字卡片，无出处。
- 建议（第一阶段不创建虚假案例，只给架构）：见 §M-7。

---

## J. P0 问题（先做，按影响排序）

| # | 问题 | 证据 |
|---|---|---|
| P0-1 | **商业承接页全部缺失**：/services/geo-optimization/、/services/seo-audit/、/services/geo-audit/（+training）未建，P0 商业词无落点、Schema Service 无法按页配置 | §B-3、§F-1 |
| P0-2 | **品牌实体断裂**：站名「GEO 咨询」vs 域名 geova.cn vs LinkedIn geova-qin vs 匿名 Person；全站无 "GEOVA" 文本、无真实姓名；Person.url=首页自指 | §D-5、E-3/4 |
| P0-3 | **博客→服务/工具内链为零 + 内容孤岛**，Pillar 互链为零；12 周排期 0 执行 | §G、§F-3 |
| P0-4 | **全站 og:image 404**（og-default.png 不存在；ghost-citations 声明图片不存在且模板不用 image 字段） | §C-10、E-10 |
| P0-5 | **转化漏斗断点**：无 geo-audit 中间页；contact 下拉无人工诊断选项；工具/CTA 无埋点，KPI 无法度量 | §H |
| P0-6 | Schema 实体层错误：SearchAction 死链 /search；about 零 Schema；author.url 自指首页 | §E |
| P0-7 | 行业新闻占首页「最新文章」3/3、占词库外内容 12/22，Pillar 排期被日报淹没 | §F-3、B-2 |

## K. P1 问题

| # | 问题 |
|---|---|
| P1-1 | 博客 Title 超长（多数 85-120 字符），部分无关键词标题（/about「关于我」、/services「服务项目」） |
| P1-2 | 无自定义 404 页 |
| P1-3 | Canonical/URL 形态不归一（尾斜杠混用），sitemap lastmod=构建时间、priority 无层级 |
| P1-4 | robots.txt 缺 ClaudeBot/Claude-SearchBot 显式组（现靠 `*` 兜底）；Managed robots.txt 风险维护项 |
| P1-5 | 「SEO→GEO」三文互抢（seo-to-geo-2026 vs seo-to-geo-transition vs what-is-geo 内嵌章节）；AI引用/可见度圈 6+ 文无枢纽 |
| P1-6 | /about 实体内容（姓名/履历/头衔词 GEO顾问·GEO优化师）缺失，Excel 认定的「已有」实为半空页 |
| P1-7 | 文章列表无分类聚合/相关推荐，无 RRS feed（P2 边界，可并入 P1 内容架构一起做） |
| P1-8 | SSR 页面无 Cache-Control/边缘缓存策略（性能/配额） |
| P1-9 | BingSiteAuth.xml、baidu html 验证文件在项目根目录**未部署**（需进 public/）；baidu 靠首页 meta（可用） |

## L. P2 问题

| # | 问题 |
|---|---|
| P2-1 | 根目录杂物：`public${NEW_KEY}.txt`、导出图片、旧指令 txt 未整理/gitignore |
| P2-2 | dns-prefetch fonts.googleapis.com 但未加载任何远程字体（无效预取） |
| P2-3 | 历史日期命名 URL（geo-daily-2026-08-27 等）与现行「关键词英文命名」规则不一致（已发布 URL 不变，仅影响新文） |
| P2-4 | 博客分类标签无落地页、无标签页 |
| P2-5 | Excel 数据质量问题（重复行 97、Global/Domestic 行 3 次重复、映射表重复段落） |
| P2-6 | web3forms key 硬编码前端（换服务需整体迁移，属功能架构，仅提示） |
| P2-7 | contact 无 mailto 直链、无日历直约 |

---

## M. 推荐修改方案（第二阶段执行蓝图，待确认后按批次实施）

> 原则对齐 05_执行规则 + 10_V2.1 路线图；**第一阶段不改任何代码**。

### M-1 批次 1（P0 架构，≈ V2.1 W0）
1. **拆商业页**（改 routing，不动视觉体系）：新建 `/services/geo-optimization/`、`/services/seo-audit/`、`/services/training/`（内容从 /services 三个区块迁移复制），/services 降级为纯导航+比较总页；同步内链（Header/首页卡片/Footer/正文 CTA 段）指向子页。旧锚点 URL 保留 301 或在总页留锚（`/services#seo-audit` → 子页，用 redirects 或锚点跳转 JS）。
2. **新建 `/services/geo-audit/`**（人工深度诊断承接页：服务说明/交付物/与免费工具对比表/价格策略占位/CTA=表单预选 GEO审计）。
3. **/contact 表单下拉增加「GEO 审计 / 人工深度诊断」选项**；工具结果页「人工深度诊断」文案链接指向 geo-audit 页而非 /contact。
4. **埋点补齐**（GTM dataLayer）：tool 扫描开始/完成、报告完成、各 CTA 点击、geo-audit 表单预选值 → 与 09_KPI 表字段一一对应。

### M-2 批次 2（实体与 Schema 修正，纯增量不改设计）
5. 品牌实体统一：确定「对外主品牌名」（建议站内统一为 GEOVA/GEOVA.CN + 中文 GEO 咨询 作为 alternateName；见 §O 风险）——需要你拍板；全站 Schema Organization/WebSite/Person 的 name、url、logo、sameAs 对齐，删匿名 Person，Person.url → /about。
6. /about 注入 Person + Organization 关联 Schema；正文补充可验证实体信号（姓名/年限/方法论/可验证外部出处），关键词「GEO顾问/GEO优化师」落到 H1/正文自然覆盖。
7. 首页 WebSite 删除死链 SearchAction（或先实现搜索）；博客 BlogPosting author/publisher url 修正；技术文按实际可少量标 TechArticle（不做批量）。
8. 全站面包屑 UI + BreadcrumbList 对齐（含 services 子页层级）。

### M-3 批次 3（OG/社交图 + 404）
9. 生成 `public/og-default.png`（1200×630，品牌字标）；文章如有图则模板接入 `post.data.image` 并建 /images/blog/ 目录；清理 ghost-citations 的死 image 引用。
10. 新建 404.astro（品牌化 + 引导链接），robots 不设 noindex（404 状态码即语义）。

### M-4 批次 4（内容与内链，≈ V2.1 W1-W12 前半段）
11. 先立 Topic Hub 模块（组件化，改文章模板）：正文尾部「相关阅读（Pillar）/ 工具 / 对应服务」三链接自动块 + 手动可配。
12. 为 5 个既有 Pillar（what-is-geo、geo-content-strategy、structured-data-guide、seo-to-geo-transition、doubao-deepseek-domestic-geo-guide）补互链与承接链；22 篇旧文按「新闻→Pillar 证据链」补 1-2 条上下文链接（只加不改正文）。
13. 停发/降频「纯日报」内容或改为 Pillar 下证据更新；按 12 周排期先写 2-3 个高 P1 Pillar（geo-vs-seo-difference 或 how-to-get-cited-by-ai 起步，先合并 what-is-geo 内嵌的重复章节）。
14. /blog 增加分类聚合（按 category 生成轻量列表页）或「置顶精选」模块。

### M-5 批次 5（技术卫生）
15. 定 URL 形态标准（建议全站带尾斜杠，与 sitemap 一致），canonical 固定化；internal links 归一。
16. sitemap lastmod 用文章真实日期、priority 按页型分层（首页 1.0 / 服务 0.9 / Pillar 0.8 / 新闻 0.5）。
17. 自定义 404 之外的 redirect 规划表（旧锚点→新子页）；robots.txt 补 ClaudeBot/Claude-SearchBot 显式组 + 注释更新；BingSiteAuth.xml/baidu html 移入 public/。
18. SSR 页面加 `Cache-Control`/`cdn-cache` 策略（Cloudflare Pages Headers）或把纯展示页转静态（/about、/services 子页内容静态化成本低）。

### M-6 批次 6（GEO KPI 落地）
19. 建立固定 Prompt 测试集与周测 SOP（09_KPI sheet 的 P0），结果入站外表格；站点自身每月跑一次 /tool 自检并存档。

### M-7 Cases 架构（不造数据）
20. 建 `/cases/` 模板页（列表 + 单例模板：背景/问题/方法/证据/结果五段结构，Excel 02 表 Proof Point 角色），**录入真实项目后才上线**；之前以「方法/流程证明」替代（服务页已有的交付物清单可强化为证据式写作）。

---

## N. 修改前后架构对比

```
【现在】
/（品牌+三大服务全量+最新3篇新闻）
├── /services            ← SEO诊断+GEO优化+培训 三服务同页锚点（唯一商业承接）
├── /tool                → 结果页 → /contact（无中间交易层）
├── /about               （无 Schema、无姓名）
├── /contact             （下拉无 GEO 审计）
├── /blog                （22 篇；Pillar 孤岛、日报占 12 篇、无分类）
└── 无 /cases、无 404、无 og 图、实体匿名、KPI 无埋点

【V2.1 目标（推荐）】
/（品牌 + GEO 核心品类认知；只做辅助）
├── /services            ← 导航+比较（CollectionPage）
│   ├── /services/seo-audit/        SEO 诊断（Service + Breadcrumb）
│   ├── /services/geo-optimization/ GEO 优化主承接（Service + Breadcrumb）★Money Page
│   ├── /services/geo-audit/        人工深度诊断（Service + Breadcrumb）★漏斗中转
│   └── /services/training/         培训（Service + Breadcrumb）
├── /tool                → 结果页 → /services/geo-audit/ → geo-optimization（事件全埋）
├── /about               （Person+Organization、真实实体、头衔词覆盖）
├── /contact             （下拉含 GEO 审计；表单→generate_lead）
├── /cases/              （真实案例：背景/问题/方法/证据/结果）
├── /blog                （Pillar 枢纽互链 + 新闻作为证据链 + 相关阅读组件 + 分类）
├── /404                 （品牌 404）
└── 全站：实体统一（GEOVA/geova.cn/个人同一实体）、og 图、canonical 归一、KPI 可测
```

---

## O. 修改风险

| 风险 | 说明 | 缓解 |
|---|---|---|
| R1 拆页掉排名 | /services 单页当前已有索引与少量权重，拆成 5 页若 301/内链处理不当会短期抖动 | 旧锚点 URL 301/JS 跳转保历史；子页内容完整复制后再改旧页；分两批上线观察 GSC |
| R2 品牌改名风险 | 站内改主品牌名（如加 "GEOVA" 文本）会改变既有认知；你一直用「GEO 咨询」对外 | **先只改 Schema 的 alternateName/实体对齐，不改可见站名**；可见品牌变更单独决策 |
| R3 首页改造掉率 | 首页砍三大服务卡片（若执行 W0）可能影响当前转化 | 用「服务模块引导到子页」替代直接删除；A/B 或数据观察 |
| R4 内容补链工程量大 | 22 篇旧文逐个补内链耗时 | 用模板级「尾部相关块」批量覆盖，正文手动链接只做 5-8 篇重点 |
| R5 工具→诊断直接导购的观感风险 | 免费工具用户对「卖诊断」敏感 | geo-audit 页文案以「报告交付物」定价逻辑呈现，FAQ 保留免费/人工对比 |
| R6 旧 URL 失效 | /services#geo-optimization 等外链（若有）失效 | 锚点保留跳转子页即可，不删 /services |
| R7 BlogPosting→TechArticle 等类型微调 | 富结果变化 | 只对明显技术文调整，一次 1-2 篇验证 |

---

## P. 预计影响（定性，需上线后用 GSC/GA4/09_KPI 校准）

| 方向 | 预计影响 | 时间窗 |
|---|---|---|
| P0 商业词承接（SEO诊断/GEO优化服务/GEO审计） | 商业意图查询从「无结果可给」变为「有独立交易页可排」，转化词出现可增长空间 | 2-6 个月（新页冷启动） |
| 实体统一 + about Schema | 品牌/人名类查询（geova、GEO 咨询、顾问名）在 AI 答案与知识图谱中的实体一致性改善；LinkedIn 等外部信号才能归位 | 1-3 个月 |
| 内链/枢纽改造 | 既有 22 篇文章的抓取/权重再分配，Pillar 排名聚合效应；AI 引用内容间语义聚类 | 1-3 个月 |
| og 图 + 404 + canonical | 分享转化、抓取卫生的即时修复（破图/重复形态消失） | 即刻 |
| 埋点 + KPI 基线 | 首次具备「工具使用率/报告完成率/工具→诊断转化」数据，之后每次改动可量化 | 即刻-2 周 |
| /cases（真实案例后） | 商业信任 + 「GEO案例」词承接 + 服务页转化助推 | 案例录入后 |

---

## TOP 10 建议立即执行任务（第一阶段定案，第二阶段按此顺序）

1. **T1（P0）拆商业页**：建 /services/geo-optimization/ + /services/seo-audit/（迁移现锚点内容），旧 /services 转总页导航 —— V2.1 W0 核心。
2. **T2（P0）建 /services/geo-audit/**（人工诊断承接页）并把工具结果页、FAQ、contact 下拉全部接通；形成 tool→审计→优化漏斗。
3. **T3（P0）品牌实体定案**：你拍板主品牌口径（建议 Schema 层 alternateName 对齐 GEOVA/geova.cn，Person 实名），随后全站 JSON-LD 实体统一、/about 注入 Person+Organization、删首页匿名 Person、修 SearchAction 死链。
4. **T4（P0）OG 修复**：补 og-default.png；模板接入文章 image 字段；清理死引用。
5. **T5（P0）埋点补齐**：tool 扫描/报告完成、CTA 点击、geo-audit 预选 → dataLayer，对齐 09_KPI P0 指标。
6. **T6（P0）内链工程**：文章模板加「相关 Pillar/工具/服务」尾块 + 5 个既有 Pillar 互链 + 重点旧文（what-is-geo、seo-to-geo-2026 等）正文补链 1-2 条。
7. **T7（P1）关键词去重**：合并/降级 seo-to-geo-2026 与 seo-to-geo-transition 的「SEO转GEO」意图（定唯一承接，另一篇改角度/加 canonical 指引）；what-is-geo 内「GEO vs SEO」章节与未来新 Pillar 的关系定案。
8. **T8（P1）技术卫生**：404.astro；canonical/尾斜杠归一；sitemap lastmod 用真实日期 + priority 分层；robots.txt 补 ClaudeBot 组；验证文件入 public。
9. **T9（P1）博客架构**：分类落地或精选模块 + 停发纯日报节奏、Pillar 排期（W1 geo-vs-seo-difference 或 W3 AI引用 Pillar 二选一起步）。
10. **T10（P1）KPI 基线**：建固定 Prompt 测试集（09_KPI），站点每月 /tool 自检存档，为第二阶段所有改动建立「改前基线」。

---

## 附：关键证据索引（源码位置）

| 证据 | 位置 |
|---|---|
| 服务三合一单页 | `src/pages/services.astro`（#seo-audit / #geo-optimization / #training） |
| og 图默认值（文件缺失） | `src/components/SEO.astro:50`；`public/` 无 og-default.png |
| SearchAction 死链 | `src/pages/index.astro:105` |
| 匿名 Person、url 自指 | `src/pages/index.astro:15-39`；博客 `src/pages/blog/[...slug].astro:35-38` |
| 文章 image 字段未用 | `src/content/blog/ghost-citations-geo-2026.md:8`（文件不存在）；`[...slug].astro` 未读 image |
| 无 404 | `src/pages/` 无 404.astro；`dist/` 无 404 产物 |
| sitemap lastmod 恒值 | `astro.config.mjs`（sitemap 集成 `lastmod: new Date()`） |
| canonical 随请求路径 | `SEO.astro:45` |
| robots ClaudeBot 缺失 | `public/robots.txt`（仅 anthropic-ai 组 + `*` 兜底） |
| Bing/Baidu 验证文件在根目录 | 仓库根 `BingSiteAuth.xml`、`baidu_verify_codeva-XfHJ65VQAj.html`（不在 public/） |
| 埋点仅表单 1 个事件 | `src/pages/contact.astro:244-245`；`tool.astro` 无 dataLayer |
| 正文零内链 | 22 篇文章全文扫描（详见 §G） |

## 附：审计方法与局限

- 依据：源码 + `dist/` 构建产物 + robots.txt + Excel 全部 10 sheet 导出逐行核读。
- **未执行**：线上抓取验证（Googlebot/AI 爬虫实测）、GSC/GA4 数据读取、Rich Results 实测——P0 中需线上验证的项（URL 形态、Bing 验证、CF Managed robots 状态）标注为「待线上确认」。
- Excel 中大量「数据校准：待 GSC/工具校准」字段确认：本报告不引用任何未实测的搜索量/竞争度数字。
