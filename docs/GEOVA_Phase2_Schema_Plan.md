# 第二阶段 Schema 改造方案（品牌实体 + Schema + SEO 实体信号）

- 日期：2026-09-05
- 依据：《指令-审计2.txt》、《GEOVA_SEO_GEO_AUDIT_V2.1.md》、V2.1 关键词体系、《About Person 姓名：.txt》用户约定
- 状态：**待用户确认后实施**
- 本阶段范围：品牌实体、Schema、Breadcrumb、SEO 实体信号。不做其他 P0/P1，不改可见品牌、不改 URL/UI、不虚构任何信息。

---

## 1. 当前问题（代码实证）

### 1.1 全站 Schema 无 @id 体系
- 全站唯一 `@id` 出现在博客 `mainEntityOfPage`（文章 URL），其余实体（Organization / Person / WebSite / ProfessionalService / Service / WebApplication）**全部无 `@id`**，实体之间无法互相引用，搜索引擎与 AI 无法确认"这些是同一个实体"。

### 1.2 实体命名与可见品牌错位
| 位置 | 当前值 | 问题 |
|---|---|---|
| Organization.name | "GEO 咨询" | 与域名 geova.cn / GEOVA 无关联声明；全站无 "GEOVA" 文本 |
| WebSite.name | "GEO 咨询" | 同上 |
| Person.name（首页） | "GEO 咨询顾问"（匿名） | 匿名占位实体，非真实人物 |
| Person.url（首页） | `https://www.geova.cn/` | **自指首页**（Person 不应指向首页） |
| Organization.founder | Person "GEO 咨询顾问"（匿名） | 虚构/匿名创始人关系 |
| ProfessionalService.provider | Person "GEO 咨询顾问"（匿名） | 同上 |
| 服务页 Service.provider | Organization "GEO 咨询"（内联） | 无 @id 引用，与首页 Organization 是两个孤立副本 |
| 博客 publisher | Organization "GEO 咨询" url=首页（内联） | 与首页 Organization 未关联 |
| 博客 author | Person "GEO 咨询团队" url=首页 | 匿名"团队"人物 + url 指向首页（自指） |

### 1.3 sameAs 问题
- Person 与 Organization 都声明 `twitter.com/q1404929834` 与 `linkedin.com/in/geova-qin/`。
- **LinkedIn 真实存在**（Footer / About / Contact 三处有真实链接，站内自证）→ 保留。
- **Twitter/X 无法验证存在** → 不放入无效 URL；保留配置模板位，后续手动填有效 URL。

### 1.4 错误 / 冗余 Schema
| 位置 | 问题 | 处理 |
|---|---|---|
| 首页 WebSite.potentialAction | SearchAction → `/search?q=`（**无搜索页**） | 删除 |
| 首页 Person（匿名）+ founder（匿名） | 虚构实体关系 | 删除；真实 Person 只在 /about 建立 |
| 首页 4 个实体（Person/Org/ProfService/WebSite） | 有重复度风险 | 收敛为 3 个：Organization + WebSite + ProfessionalService（保留合理），全部带 @id |

### 1.5 缺失项
- Organization 无 `logo`（站内有真实文件 `public/favicon.svg` → 可用）
- Organization 无 `alternateName`（GEOVA / GEOVA.CN 从未声明）
- /about 零 Schema（无 Person / Organization 标注）
- 无可见 Breadcrumb UI（JSON-LD BreadcrumbList 与页面结构对应真实层级，但无可见对应物）

### 1.6 现有正确的部分（保留不动）
- FAQPage：/services（总览）、/tool、/services/geo-optimization 的 FAQPage 均与页面**可见 FAQ 一致**，保留。
- /services/geo-audit 无 FAQ 也无 FAQPage → 正确，不添加。
- 服务页无 offers/价格/评分 → 正确，不添加。
- Service.serviceType 四页已差异化（SEO 全站诊断 / GEO 优化 / GEO 审计 / 培训），保留并进一步细化。
- robots.txt / sitemap 健康。

---

## 2. Entity 关系设计（目标态）

```
                     ┌────────────────────────────────────┐
                     │  Organization  @id:#organization   │
                     │  name: "GEOVA"                     │
                     │  alternateName: [GEO咨询,          │
                     │    GEOVA顾问, GEOVA.CN]            │
                     │  url: https://www.geova.cn/        │
                     │  logo: .../favicon.svg             │
                     │  sameAs: [linkedin] (+X 占位)      │
                     └──────┬──────────┬──────────┬──────┘
            worksFor/author│          │provider  │publisher/provider
        ┌──────────────────┘          │          │
        ▼                             ▼          ▼
  Person @id:#person           Service ×4    WebSite @id:#website
  name: 秦丽芳 (Lifang Qin)    (每服务页     name: GEOVA
  url: /about/                 @id:#service) url: geova.cn
  worksFor → #organization     provider →    (无 SearchAction)
  sameAs: [linkedin]           #organization
  （真实姓名，用户已确认）          │
                                ▼
                     ProfessionalService @id:#professional-service
                     provider → #organization
                     hasOfferCatalog → 3 Service（URL 指向真实服务页）
```

关键原则：
- **Organization 是唯一根实体**，name=GEOVA（用户约定）；GEO 咨询/GEOVA顾问/GEOVA.CN 全部作为 alternateName 消歧。
- 所有服务页 Service / 博客 publisher / ProfessionalService / Person.worksFor **全部通过 @id 引用 #organization**，不再内联复制孤立 Organization。
- 真实 Person 只在 **/about**（url=/about/），首页不再有匿名 Person。
- 可见品牌（页面文字、Header/Footer "GEO 咨询"）**一律不改**。

---

## 3. 修改文件清单

| # | 文件 | 操作 | 内容 |
|---|---|---|---|
| 1 | `src/lib/schema-entities.ts` | **新增** | 共享实体中心：常量 `SITE_URL`、`organization`、`website`、`person`（关于页用）、`professionalService`（首页用）、`service(id, name, serviceType, description)` 工厂、`breadcrumb(items)` 工厂。全站唯一 truth source |
| 2 | `src/components/Breadcrumb.astro` | **新增** | 可见浅色面包屑 UI（props: `items: [{name, url}]`），样式贴合现有设计（浅灰小字 + `›` 分隔，`scroll-mt` 安全），置于页面内容顶部/标题上方；不输出 JSON-LD（JSON-LD 由页面现有 `<JsonLDSchema>` 负责，保证 schema 与可见一致） |
| 3 | `src/pages/index.astro` | 修改 | 删除匿名 personSchema 与 founder；Organization 换为共享实体（含 alternateName/logo/@id/sameAs 清理）；WebSite 删除 SearchAction；ProfessionalService 用工厂重建（name="SEO & GEO 搜索优化服务"、provider→#organization、hasOfferCatalog 保持真实服务与 URL） |
| 4 | `src/pages/about.astro` | 修改 | 注入真实 Person schema：name "Lifang Qin (秦丽芳)"（与 LinkedIn 建议格式一致）、url=/about/、jobTitle、worksFor→#organization、sameAs=[linkedin]；hero 标签行加真实署名（如 "👋 你好，我是 秦丽芳 (Lifang Qin)"），不改布局与设计 |
| 5 | `src/pages/services.astro` | 修改 | ItemList 项带 url（已带）；加可见 Breadcrumb（首页 > 服务）；FAQPage 保留 |
| 6 | `src/pages/services/seo-audit.astro` 等 ×4 | 修改 | Service 工厂重建（每页 @id `.../seo-audit/#service`、provider→#organization、serviceType/描述保持差异化）；顶部加可见 Breadcrumb（首页 > 服务 > 页名） |
| 7 | `src/pages/tool.astro` | 修改 | WebApplication 加 @id、provider→#organization；加可见 Breadcrumb（首页 > 工具）；FAQPage 保留 |
| 8 | `src/pages/blog/[...slug].astro` | 修改 | articleSchema：author = Person（共享 person 实体，真实姓名）、publisher = organization（@id 引用）；加可见 Breadcrumb（首页 > 博客 > 标题）；按文章 frontmatter 支持 TechArticle（见 §5） |
| 9 | `src/content/config.ts` | 修改 | blog schema 增加可选字段 `articleType: z.enum(["BlogPosting","TechArticle"]).default("BlogPosting")`；author 默认值按用户确认统一 |
| 10 | `src/content/blog/structured-data-guide.mdx` | 修改 | frontmatter 增加 `articleType: "TechArticle"`（唯一明显技术教程；不批量转换） |
| 11 | 22 篇文章 frontmatter | 修改（元数据） | 若有 `author: "GEO 咨询团队"` 的 frontmatter 行统一为真实作者；**只动 frontmatter，不碰标题/正文** |
| 12 | `src/pages/contact.astro` | 不改 | 无需求，不堆砌 |
| 13 | `robots.txt` / `sitemap` / `astro.config` | 不改 | |

---

## 4. 修改前后 Schema 对照

### 4.1 首页（index.astro）

**修改前**（4 个 JSON-LD，无 @id）：
```json
{ "@type": "Person", "name": "GEO 咨询顾问", "url": "https://www.geova.cn/", "sameAs": ["twitter", "linkedin"] }
{ "@type": "Organization", "name": "GEO 咨询", "url": "https://www.geova.cn/", "founder": { "@type": "Person", "name": "GEO 咨询顾问" }, "sameAs": [...] }
{ "@type": "ProfessionalService", "name": "GEO 咨询 — SEO & GEO 搜索优化服务", "provider": { "Person 匿名" }, ... }
{ "@type": "WebSite", "name": "GEO 咨询", "potentialAction": { "@type": "SearchAction", "target": ".../search?q=..." } }
```

**修改后**（3 个 JSON-LD，@id 互引，无匿名、无死链）：
```json
{ "@context": "...", "@id": "https://www.geova.cn/#organization", "@type": "Organization",
  "name": "GEOVA", "alternateName": ["GEO咨询", "GEOVA顾问", "GEOVA.CN"],
  "url": "https://www.geova.cn/", "logo": "https://www.geova.cn/favicon.svg",
  "sameAs": ["https://www.linkedin.com/in/geova-qin/"], "email": "contact@geova.cn" }

{ "@context": "...", "@id": "https://www.geova.cn/#website", "@type": "WebSite",
  "name": "GEOVA", "url": "https://www.geova.cn/", "inLanguage": "zh-CN" }
  // 无 SearchAction（站点无搜索功能）

{ "@context": "...", "@id": "https://www.geova.cn/#professional-service",
  "@type": "ProfessionalService", "name": "SEO & GEO 搜索优化服务",
  "url": "https://www.geova.cn/services/",
  "provider": { "@id": "https://www.geova.cn/#organization" },
  "hasOfferCatalog": { "itemListElement": [
     { "itemOffered": { "@type": "Service", "name": "SEO 全站诊断", "url": "https://www.geova.cn/services/seo-audit/" } },
     { "itemOffered": { "@type": "Service", "name": "GEO / AI 搜索可见度优化", "url": "https://www.geova.cn/services/geo-optimization/" } },
     { "itemOffered": { "@type": "Service", "name": "团队顾问与培训", "url": "https://www.geova.cn/services/training/" } }
  ] } }
```

### 4.2 About（about.astro）— 新增真实 Person

```json
{ "@context": "...", "@id": "https://www.geova.cn/about/#person", "@type": "Person",
  "name": "Lifang Qin (秦丽芳)", "alternateName": "秦丽芳",
  "url": "https://www.geova.cn/about/",
  "jobTitle": "SEO & GEO 策略顾问",
  "worksFor": { "@id": "https://www.geova.cn/#organization" },
  "sameAs": ["https://www.linkedin.com/in/geova-qin/"],
  "knowsAbout": ["SEO", "GEO", "AI Search Visibility", "Structured Data"] }
```
> image：站内目前无真实个人照片，**不添加**（避免虚构）。后续提供真实头像后可补 `image`。

### 4.3 服务页 ×4（示例 /services/geo-optimization/）

**修改前**：内联孤立 Organization provider、无 @id。
**修改后**：
```json
{ "@context": "...", "@id": "https://www.geova.cn/services/geo-optimization/#service",
  "@type": "Service",
  "name": "GEO 优化服务（AI 搜索可见度优化）",
  "serviceType": "GEO 优化 / AI 搜索可见度优化 / AI 引用优化",
  "url": "https://www.geova.cn/services/geo-optimization/",
  "provider": { "@id": "https://www.geova.cn/#organization" },
  "areaServed": { "@type": "Continent", "name": "全球（线上服务）" } }
// 无 offers（页面无价格，真实）—— geo-audit/seo-audit/training 同理差异化 serviceType/description
```

### 4.4 博客（[...slug].astro）

**修改前**：
```json
"author": { "@type": "Person", "name": "GEO 咨询团队", "url": "https://www.geova.cn/" },
"publisher": { "@type": "Organization", "name": "GEO 咨询", "url": "https://www.geova.cn/" }
```
**修改后**：
```json
"author": { "@id": "https://www.geova.cn/about/#person" },   // 真实 Person 秦丽芳
"publisher": { "@id": "https://www.geova.cn/#organization" }, // GEOVA 组织根实体
"@type": 由 frontmatter articleType 决定（默认 BlogPosting；structured-data-guide 为 TechArticle）
```
其余字段（headline/description/datePublished/dateModified/mainEntityOfPage/keywords/inLanguage）保留；image 无真实图不添加。

### 4.5 Breadcrumb（可见 UI + 既有 JSON-LD 对齐）

可见面包屑（新增组件渲染，浅色小字，置于页面顶部内容区）：
```
首页 › 服务 › GEO 优化服务      （服务子页）
首页 › 服务                     （服务总览页）
首页 › 工具                     （工具页）
首页 › 博客 › 文章标题           （博客文章）
```
JSON-LD BreadcrumbList 与可见内容一一对应（既有 breadcrumbSchema 结构不变，仅页面归属随可见位置摆放），杜绝"schema 有、页面无"的不一致。

---

## 5. TechArticle 判定（不批量）

- 22 篇文章中仅 `structured-data-guide.mdx`（《结构化数据与 Schema.org：GEO 的技术基石》）属明显技术教程/文档 → 加 `articleType: "TechArticle"`。
- 其余 21 篇保持 BlogPosting（行业动态/趋势/案例/指南），**不做批量转换**。

## 6. Twitter/X sameAs 处理

- 代码中 sameAs 仅保留 **LinkedIn 真实链接**。
- `src/lib/schema-entities.ts` 中预留 `// TODO: 手动填入有效的 X/Twitter 统一社交账号 URL` 模板位（注释），不放入未验证 URL。
- Organization 与 Person 的 sameAs 使用同一常量，保证一致。

## 7. 风险

| 风险 | 等级 | 缓解 |
|---|---|---|
| Organization.name 改为 GEOVA 与可见"GEO 咨询"不同名 | 中 | 用户已确认（知识图谱消歧方案）；alternateName 完整列出中文名；可见品牌一律不动；上线后用 Rich Results Test / GSC 观察 |
| 新实体中心文件被多页面引用，改错一处影响全站 | 中 | 单一文件集中定义；构建后逐页验证 JSON-LD 合法与 @id 一致 |
| 博客 author 变化影响既有署名展示 | 低 | 仅元数据与模板变化；如需保留"GEO 咨询团队"署名可回退（方案确认时可说明偏好） |
| Breadcrumb 可见组件改动页面顶部视觉 | 低 | 浅色小字、最小侵入；置于现有 hero 上方留白处，不改变现有组件样式 |
| @id 冲突/重复 | 低 | @id 全部基于真实 URL + `#` 片段，全站唯一；验收脚本检查重复 |
| favicon.svg 作为 logo 尺寸偏小 | 低 | 真实文件不虚构；后续可提供 512×512 PNG 替换 |

## 8. 是否需要新增组件

需要 2 个新文件：
1. `src/lib/schema-entities.ts` —— 共享实体中心（无 UI）
2. `src/components/Breadcrumb.astro` —— 可见面包屑（轻量 UI，不改变现有设计体系，未来可复用于其他层级页）

其余改动均在既有文件内完成。

## 9. 是否影响现有页面

- URL：**全部不变**（含服务页、博客、工具、关于）。
- 可见品牌/文字/布局：**除 about 署名行与新增面包屑外零改动**。
- 首页 JSON-LD：4 → 3 块（删除匿名 Person）；无 SearchAction。
- 服务页/博客/工具：JSON-LD 结构优化 + @id；功能无变化。
- robots / sitemap / canonical：不变。

---

## 10. 验收计划（实施后执行）

1. `npm run build`
2. 全站 URL 逐一 200 检查
3. 每页 JSON-LD 合法性（可解析）
4. @id 唯一性 & 引用一致性检查（脚本核对 organization/person/service 引用）
5. 无重复 Schema / 无匿名 Person / 无 SearchAction 死链
6. canonical / sitemap 复查
7. 首页 / About / Blog / Tool / 4 服务页逐页核对
8. 输出《GEOVA 第二阶段 Entity + Schema 验收报告》

---

**请确认本方案**（或指出需调整处：如博客作者署名偏好、TechArticle 范围、Breadcrumb 放置位置等），确认后我开始实施。
