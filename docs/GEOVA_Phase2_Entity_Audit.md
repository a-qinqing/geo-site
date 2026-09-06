# 第二阶段执行前审计：全站实体一致性盘点（Entity + Schema）

- 日期：2026-09-05
- 方法：源码级逐页盘点（`src/pages/**`、`src/components`、`src/content/config.ts`）+ 构建产物抽查
- 用途：《第二阶段 Schema 改造方案》（GEOVA_Phase2_Schema_Plan.md）的事实依据
- 范围：/、/services/、4 服务页、/tool、/about、/contact、/blog、/blog/[slug]

---

## 1. 逐页盘点总表（页面 → Entity → Schema → 关键字段）

### 1.1 `/`（首页，index.astro）— 4 个 JSON-LD

| 检查项 | Person（personSchema） | Organization（organizationSchema） | ProfessionalService | WebSite（webSiteSchema） |
|---|---|---|---|---|
| @type | Person | Organization | ProfessionalService | WebSite |
| **@id** | ❌ 无 | ❌ 无 | ❌ 无 | ❌ 无 |
| name | "GEO 咨询顾问"（**匿名占位**） | "GEO 咨询" | "GEO 咨询 — SEO & GEO 搜索优化服务" | "GEO 咨询" |
| url | `https://www.geova.cn/`（**自指首页**） | `https://www.geova.cn/` | 无（offer 内子项有 URL） | `https://www.geova.cn/` |
| alternateName | 无 | 无 | 无 | 无 |
| logo | — | ❌ 无 | — | — |
| sameAs | twitter + linkedin | twitter + linkedin | — | — |
| publisher | — | — | — | 无 |
| author | — | — | — | — |
| provider | — | — | Person "GEO 咨询顾问"（**匿名**） | — |
| founder | — | Person "GEO 咨询顾问"（**匿名**） | — | — |
| potentialAction | — | — | — | SearchAction → `/search?q=`（**死链，无搜索页**） |
| hasOfferCatalog | — | — | 3 个 Service（SEO全站诊断/GEO/AI优化/培训），url 指向独立服务页（P0-1 后已正确） | — |
| 其他 | jobTitle "SEO & GEO 策略顾问"、contactPoint（email contact@geova.cn、language zh-CN+en） | email、founder | areaServed 全球线上、ServiceChannel → /contact | inLanguage zh-CN |

### 1.2 `/services/`（服务总览，services.astro）— 3 个 JSON-LD

| 检查项 | ItemList | FAQPage | BreadcrumbList |
|---|---|---|---|
| @type | ItemList | FAQPage | BreadcrumbList |
| **@id** | ❌ 无 | ❌ 无 | ❌ 无 |
| name | "SEO & GEO 专业服务" | — | — |
| 内容 | 4 项（seo-audit/geo-optimization/geo-audit/training），url 指向真实子页 ✅ | 3 问 3 答，**与页面可见 `<details>` FAQ 完全一致** ✅ | 首页 › 服务（2 级） |
| 问题 | ItemList 项无 @id | 无（保留） | 无可见面包屑 UI（schema 与导航层级一致，但页面无可见对应物） |

### 1.3 服务子页 ×4（services/seo-audit、geo-optimization、geo-audit、training）— 每页 2~3 个 JSON-LD

| 检查项 | seo-audit | geo-optimization | geo-audit | training |
|---|---|---|---|---|
| @type | Service + BreadcrumbList | Service + FAQPage + BreadcrumbList | Service + BreadcrumbList | Service + BreadcrumbList |
| **@id** | ❌ 无 | ❌ 无 | ❌ 无 | ❌ 无 |
| Service.name | SEO 全站诊断服务 | GEO 优化服务（AI 搜索可见度优化） | GEO 审计与 AI 搜索诊断服务 | SEO/GEO 培训与团队顾问服务 |
| Service.serviceType | SEO 全站诊断 / SEO 技术审计 | GEO 优化 / AI 搜索可见度优化 / AI 引用优化 | GEO 审计 / GEO 网站诊断 / AI 搜索可见度诊断 | SEO/GEO 培训 / SEO 内训 / 搜索优化顾问 |
| **provider** | Organization "GEO 咨询"（**内联副本，无 @id，与首页 Organization 断开**） | 同左 | 同左 | 同左 |
| url | 页面 URL ✅ | ✅ | ✅ | ✅ |
| areaServed | Continent 全球线上（真实：线上服务）✅ | ✅ | ✅ | ✅ |
| offers | ❌ 无（正确：页面无价格） | ❌ 无 ✅ | ❌ 无 ✅ | ❌ 无 ✅ |
| FAQPage | — | 3 问 3 答与可见 FAQ 一致 ✅ | 无 FAQ 也无 FAQPage ✅ | — |
| BreadcrumbList | 首页 › 服务 › 页名（3 级，真实层级） | 同左 | 同左 | 同左 |

### 1.4 `/tool/`（工具页，tool.astro）— 2 个 JSON-LD

| 检查项 | WebApplication | FAQPage |
|---|---|---|
| **@id** | ❌ 无 | ❌ 无 |
| name | GEO 站点健康度诊断工具 | — |
| url | /tool ✅ | — |
| offers | price 0 CNY（页面真实免费，**非虚构**，可保留）| — |
| provider/publisher | ❌ 无（工具未归属到任何实体） | — |
| FAQ | — | 3 问 3 答与可见 FAQ 一致 ✅ |
| Breadcrumb | ❌ 无（未建） | — |

### 1.5 `/about/`（关于页，about.astro）

| 检查项 | 结果 |
|---|---|
| Schema | ❌ **零 JSON-LD**（页面介绍个人顾问，但没有任何实体标注） |
| @id | — |
| 可见内容 | 全部以"我"叙事，**无真实姓名出现**；含 LinkedIn 真实链接（geova-qin）；"10+ 年 / 50+ 家企业 / 100+ 篇"数字卡片无 schema |
| 问题 | 实体页无实体 → 搜索引擎/AI 无法把 About 内容关联到任何 Person/Organization |

### 1.6 `/contact/`（联系页，contact.astro）

| 检查项 | 结果 |
|---|---|
| Schema | ❌ 零 JSON-LD（无 ContactPage/ContactPoint 标注；低优先，不虚构） |

### 1.7 `/blog/`（博客列表，blog/index.astro）

| 检查项 | 结果 |
|---|---|
| Schema | ❌ 零 JSON-LD（无 CollectionPage/ItemList；低优先） |

### 1.8 `/blog/[slug]`（文章页，[...slug].astro）— 2 个 JSON-LD

| 检查项 | BlogPosting（articleSchema） | BreadcrumbList |
|---|---|---|
| **@id** | ❌ 无（mainEntityOfPage 有 @id = 文章 URL ✅） | ❌ 无 |
| headline | post.title ✅ | — |
| description | post.description ✅ | — |
| datePublished / dateModified | pubDate / updatedDate ✅ | — |
| **author** | Person，name = `post.data.author || "GEO 咨询团队"`（**匿名团队人物**），url = `首页`（**自指**）| — |
| **publisher** | Organization "GEO 咨询" url=首页（**内联副本，与首页 Organization 断开**）| — |
| mainEntityOfPage | WebPage @id = 文章 URL ✅ | — |
| image | ❌ 无（站内无真实文章图；正确，不虚构） | — |
| keywords/inLanguage | tags / zh-CN ✅ | — |
| @type 判定 | 全部 22 篇统一 BlogPosting（structured-data-guide 为明显技术教程，未判 TechArticle） | 首页 › 博客 › 文章（真实层级） |
| 可见 breadcrumb UI | ❌ 无 | — |

### 1.9 共享组件与配置

| 文件 | 现状 |
|---|---|
| `SEO.astro` | title 自动加 "GEO 咨询" 后缀；canonical 自动生成 ✅；og 默认图 og-default.png 不存在（P0-4 OG 批遗留，本阶段不做） |
| `JsonLDSchema.astro` | 通用渲染组件，无实体逻辑 ✅ |
| `Layout.astro` | 无 schema（合理） |
| `content/config.ts` | blog author 默认 `"GEO 咨询团队"`（匿名）；无 articleType 字段 |
| 22 篇文章 frontmatter | author 多为 "GEO 咨询团队" 或走默认值 |
| `robots.txt` / sitemap | 健康，无实体问题 |

---

## 2. 问题清单（按类型汇总）

### 2.1 ❌ 重复实体（孤立副本，无 @id 引用）
- **Organization 出现 5 处孤立副本**：首页 organizationSchema、4 个服务页 provider 内联 Organization "GEO 咨询"、博客 publisher 内联 Organization "GEO 咨询"。全部无 @id → 搜索引擎视为 5 个不同实体。
- **Person 出现 3 处**：首页 personSchema（匿名"GEO 咨询顾问"）、首页 founder（匿名）、博客 author（匿名"GEO 咨询团队"）→ 3 个互不相同的匿名人。

### 2.2 ❌ 匿名 Person
- 首页 Person "GEO 咨询顾问"（url 自指首页）
- Organization.founder "GEO 咨询顾问"
- ProfessionalService.provider "GEO 咨询顾问"
- 博客 author "GEO 咨询团队"（url 自指首页）

### 2.3 ❌ 错误 @id
- 全站除文章 mainEntityOfPage 外**零 @id** → 无实体锚点、无引用关系。

### 2.4 ❌ 错误 sameAs / 无法验证
- twitter.com/q1404929834：Person 与 Organization 各声明一次，**站内无任何自证链接，无法验证存在与归属**。
- linkedin.com/in/geova-qin/：Footer / About / Contact 三处真实链接自证 ✅ 保留。

### 2.5 ❌ self-reference（自指）
- Person.url = 首页（人指向站点首页）
- 博客 author.url = 首页（"团队"指向首页）
- publisher.url = 首页（组织指向首页——合法但作为孤立副本与 #organization 断裂）

### 2.6 ❌ 不一致 name
- Schema name 全为 "GEO 咨询"；域名品牌 geova.cn / GEOVA 从未在 Schema 中出现 → AI 无法把 `GEOVA.CN ↔ GEOVA ↔ GEO 咨询` 关联为一个实体（审计 V2.1 报告 P0-2 的代码层根因）。
- Person 无真实姓名；blog author "团队"与真实作者不一致。

### 2.7 ❌ 虚假/可疑实体关系
- Organization.founder = 匿名 Person（无法验证的创始人关系）
- ProfessionalService.provider = 匿名 Person（服务由"匿名顾问"提供，而实际可见主体是组织）
- WebSite.potentialAction SearchAction → /search（**指向不存在页面**，无效标注）
- availableLanguage 多处声明 "en"（站点无英文版；属轻微夸大，低风险）

### 2.8 ❌ 缺失
- About 零 Schema（应承载真实 Person）
- Organization 无 alternateName / logo
- WebApplication（tool）未归属 provider/publisher
- 全站无可见 Breadcrumb UI（4 服务页 + 博客已有 JSON-LD BreadcrumbList，但页面无对应可见元素）
- blog schema 无 TechArticle 区分机制

### 2.9 ✅ 现状正确（保留不动）
- FAQPage ×3（/services、/tool、geo-optimization）与可见 FAQ 一致
- 无 offers/评分/评论/价格虚构；无客户数量虚构
- 服务页 Service.serviceType 已差异化
- canonical 全站正确、sitemap 完整
- 4 服务页 Service.url 与 BreadcrumbList 层级真实

---

## 3. 结论

当前实体层处于"**无 @id、匿名 Person、Organization 五处孤立副本、品牌名与域名实体断裂**"状态——这正是《GEOVA_SEO_GEO_AUDIT_V2.1.md》P0-2（品牌实体断裂）与 E 部分 Schema 问题在代码中的具体表现。

修复方向见《GEOVA_Phase2_Schema_Plan.md》（§2 Entity 关系设计）：Organization 唯一根实体（@id #organization，name GEOVA + alternateName），真实 Person 建于 /about，全部 provider/publisher/author 通过 @id 引用，删除匿名实体与 SearchAction。
