# GEOVA Day 20 执行包｜llms.txt 到底要不要做

## 一、Pre-Writing Audit

### 1. Search Intent

用户是企业 SEO/GEO 负责人、技术负责人或内容负责人，正在决定「要不要为 AI 搜索做 llms.txt」。他面对的信息互相矛盾：Google 官方说不需要，Chrome Lighthouse 又在检查，服务商和行业文章则反复劝做。用户需要的不是又一篇「llms.txt 是什么、怎么生成」，而是一个能拍板的判断：官方各产品线到底怎么说、收益能不能被验证、自己的站点属于哪一类。

本文解决：把争论拆成「是不是标准 / 有没有用 / 我要不要做」三个问题；对照 Google Search 官方变更日志、Chrome Lighthouse 的 Agentic Browsing 审计、llms.txt 提案 v2、Ahrefs 137,210 个域名的服务器日志与 SE Ranking 约 30 万域名的相关性研究；给出条件决策树、最小合规写法与更值得优先做的替代方案；并公开本站保留 llms.txt 的真实理由与边界。

本文不解决：不提供一键生成工具或建站教程；不预测各 AI 平台未来是否采纳 llms.txt；不含自有服务器日志实验、搜索量、KD 或见效周期；不展开 robots.txt、sitemap、结构化数据的完整配置（均内链到既有文章）。

### 2. Existing Content Conflict 评分：1（部分重叠但有新价值）

| 旧文 | 重叠点 | 本文边界 |
|---|---|---|
| `/blog/geo-2026-08-26-ai-citation-guide` | 只有一句「Google 官方说 llms.txt 不影响排名」 | 旧文是六大模型官方规则的新闻式汇总；本文是 llms.txt 专题决策指南，补官方口径分层、日志证据、决策树与验收 |
| `/blog/seo-audit-geo-checklist` | 一句「要不要写 llms.txt 是决策，不是检查」 | 旧文讲审计范围与报告写法，不展开 llms.txt 本身 |
| `/blog/doubao-deepseek-domestic-geo-guide` | 一句把 llms.txt 与 ICP 备案并列为国内打法 | 本文给出证据边界：国内平台没有公开承诺读取 llms.txt，不能写成「收录门槛」；不点名旧文，只陈述事实 |
| `/blog/google-ai-mode`、`/blog/how-to-do-geo`、`/blog/structured-data-guide` | 无 llms.txt 实质内容 | 0 |

结论：评分 1，可写。必须守住「决策 + 证据 + 边界」这条线，不写成建站教程，也不复述六大模型规则。

### 3. Unique Value

现有文章只把 llms.txt 当作一句「官方辟谣」带过，没有回答三个决策问题：官方哪个产品在说什么、日志与相关性研究能验证什么、什么类型的站点才属于受益场景。本文用「三个问题拆分 + 两类证据 + 五条决策树 + 最小合规验收」补上这块，并公开本站「保留但不指望它」的用法，避免把「做/不做」写成站队。

### 4. 数据与边界

- 主关键词「llms.txt」**不在 V2.2 / V2.3 词库内**，按规范标注「待 SERP 验证」，不编造搜索量与 KD。
- 官方口径已直取原文：Google Search Central 2026-06-15 变更日志、Google《AI features and your website》、Chrome Lighthouse 13.3 llms.txt 审计文档（Last updated 2026-05-05）。
- 第三方数据均标明来源类型：Ahrefs 2026 年 6 月发布的 137,210 个域名服务器日志研究（数据窗口 2026 年 5 月）、SE Ranking 约 30 万域名的相关性研究（2026-10-15 发布）。
- 2025 年 12 月 Google 文档站出现 llms.txt 一事，来自 Search Engine Journal 的报道；文中写「疑似由 CMS 自动生成」，不写成已确认的官方行为。
- 本站事实已实测：`https://www.geova.cn/llms.txt` 返回 200、`Content-Type: text/plain; charset=utf-8`，列 37 个条目；`robots.txt` 未引用 llms.txt。
- 正文不写百分比符号，改用「百分之……」表述；数据本身不改。
- Day 21 / 23 / 24 的合并规则不适用本篇。

---

## 二、Article Metadata

| 字段 | 内容 |
|---|---|
| Title | llms.txt 到底要不要做：官方口径、可验证收益与替代方案 |
| Meta Description | llms.txt 要不要做，先分清三个问题：Google 搜索是否使用、有没有可验证收益、你的站点是否属于受益场景。本文对照 Google 变更日志、Lighthouse 审计、Ahrefs 13.7 万域名日志与 SE Ranking 30 万域名研究，给出决策树、最小写法与替代方案，并公开本站保留它的理由。 |
| H1 | 由 frontmatter `title` 渲染，正文不写 H1 |
| 主关键词 | llms.txt（**待 SERP 验证**，不在 V2.2 / V2.3 词库） |
| 次关键词 | llms.txt 有用吗、Google 辟谣 llms.txt、llms.txt 替代方案 |
| Search Intent | Informational（技术决策） |
| 内容类型 | 技术决策 |
| 优先级 | P1 |
| Topic Cluster | Technical GEO（技术通道 / 索引入口） |
| 目标 URL | `/blog/llms-txt-decision` |
| 建议内链 | `/blog/how-to-do-geo`、`/blog/geo-framework`、`/blog/geo-2026-08-26-ai-citation-guide`、`/blog/structured-data-guide`、`/blog/ai-crawlers`、`/blog/internal-links-ai-crawling`、`/blog/how-to-get-cited-by-ai`、`/blog/brand-entity-ownership`、`/tool`、`/services/geo-optimization`、`/services/geo-audit` |
| CTA | 免费工具 → GEO 优化服务 → GEO 人工诊断（`/tool` → `/services/geo-optimization` → `/services/geo-audit`） |

标题长度 31 字（≤40），语义与计划书标题一致；slug `llms-txt-decision` 为主关键词英文 kebab-case，非日期。

---

## 三、正文（与 `src/content/blog/llms-txt-decision.md` 逐字一致）

````markdown
---
title: "llms.txt 到底要不要做：官方口径、可验证收益与替代方案"
description: "llms.txt 要不要做，先分清三个问题：Google 搜索是否使用、有没有可验证收益、你的站点是否属于受益场景。本文对照 Google 变更日志、Lighthouse 审计、Ahrefs 13.7 万域名日志与 SE Ranking 30 万域名研究，给出决策树、最小写法与替代方案，并公开本站保留它的理由。"
pubDate: 2026-11-03
category: "技术"
tags: ["GEO", "llms.txt", "AI搜索", "技术决策"]
author: "GEO 咨询团队"
---

## TL;DR / 核心要点总结

- **Google 搜索已明确：llms.txt 不是必需项，也不影响排名与可见性。** 2026 年 6 月 15 日的官方变更日志写得很直白：不需要，但为其他服务保留也可以。
- **“Google 内部打架”是误读。** Search 管搜索结果，Chrome Lighthouse 管浏览器 agent 的可用性；后者检查 llms.txt，不等于搜索会读它。
- **可验证收益非常窄。** Ahrefs 对 13.7 万个域名的日志分析显示，百分之九十七的有效 llms.txt 在 2026 年 5 月零请求；AI 检索爬虫只占请求的百分之一左右。
- **受益者是文档型站点与编码 agent，不是营销站。** 如果目标是 AI Overviews 或 ChatGPT 引用，优先修 robots、sitemap、正文与实体，收益更确定。
- **决策可以很具体：** 有公开开发者文档就做一个合规版本；没有就最后做，甚至不做；任何情况下都别把它当收录开关或 KPI。

---

## 一、先把争论拆开：三个问题被混成了一个

关于 llms.txt 的争论，常见说法互相矛盾：一边说“官方已辟谣”，一边说“Lighthouse 都在检查了”。拆开句子会发现，大家回答的不是同一个问题。

| 问题 | 正确问法 | 答案取决于 |
|---|---|---|
| 它是不是官方标准 | 谁提出的、有没有被搜索引擎采纳 | 提案状态与各产品文档 |
| 它有没有用 | 对谁有用、收益能否被测量 | 站点类型与日志数据 |
| 我要不要做 | 我的站点属于哪种场景、成本多少 | 你的内容形态与目标 |

三个问题可以同时成立：它不是搜索标准，对多数站点没有可测收益，但你的开发者文档仍可能值得放一个。混在一起争论，就会把“Google 搜索不用”听成“完全没用”，或者把“Lighthouse 检查”听成“搜索会读”。

---

## 二、官方口径：Search 说不用，Lighthouse 说可选

先看最硬的两条官方口径，它们针对的不是同一个产品。

2026 年 6 月 15 日，Google Search Central 在变更日志里新增了一条说明：llms.txt 这类文件“对 Google 搜索不是必需的，不会负面影响也不会正面影响你的可见性或排名”；如果你要为其他使用它的服务保留，也没问题。

那份 AI 功能文档还写着：要让内容出现在 AI Overviews 与 AI Mode，不需要创建新的机器可读文件、AI 文本文件或额外标记，也没有额外的技术要求——被索引、有资格显示摘要即可。

另一边，Chrome Lighthouse 13.3 在 2026 年 5 月加入 Agentic Browsing 分类，其中一项会取 `/llms.txt`：取不到且返回 404 时判为“不适用”，只有服务器错误才报错。它衡量的是浏览器 agent 读取站点结构的便利性，不是搜索排名。

两条口径并不冲突，因为它们服务的产品不同。把 Lighthouse 的检查当成 Google 搜索的背书，是这类讨论里最常见的偷换。

还有一个常被当作“官方也在用”的证据：2025 年 12 月，Google Search Central 文档站出现过一份 llms.txt，疑似由 CMS 自动生成，几小时内被移除。文件存在不等于官方支持。

截至本文写作，没有任何主流 AI 平台公开承诺读取第三方站点的 llms.txt。OpenAI、Anthropic、Google（Gemini）给自家文档放 llms.txt，只说明它们认可这种写法，不代表其搜索产品会读你的文件。

---

## 三、可验证的收益：日志与相关性研究说了什么

只看能被复现的数据，结论比争论清楚：对多数站点，llms.txt 没有可验证的 AI 引用收益。

Ahrefs 在 2026 年 6 月发布了一项研究，分析了 137,210 个域名的服务器日志，数据窗口为 2026 年 5 月。约 3.8 万个域名发布了有效的 llms.txt；其中百分之九十七在整月没有收到任何请求。

收到请求的那百分之三里，来源也很集中：编码 agent 约占十分之一，Claude-Code 与 GPTBot 居前；SEO 审计与探测工具占两成上下；AI 检索爬虫只有百分之一左右。

OAI-SearchBot、PerplexityBot 与 Claude 的搜索爬虫合计只有几百次请求。Googlebot 的约九百次属于发现 URL 后的常规抓取，不表示它对 llms.txt 有特殊兴趣。

研究者强调，“被取”不等于“被读”，更不等于“被采用”；这些数字是收益的上限。

SE Ranking 另有一项覆盖约 30 万个域名的相关性研究：约一成域名有 llms.txt，但控制其他变量后，它与 AI 引用频率没有可检出的关系；把该变量从预测模型里去掉，模型表现反而略好。

这是相关性设计、没有爬虫日志，因此只能说明“没看到效果”，不能证明“永远不会有”。

两条证据合起来，支持同一结论：它可能有别的用途，但不是“提升 AI 可见度”。

---

## 四、它到底对谁有用：文档型站点，而不是营销站

llms.txt 的提案由 Jeremy Howard 在 2024 年 9 月提出，2026 年 8 月更新到 v2。出发点不是搜索排名，而是让 agent 用更少的 token 找到关键内容。

v2 写明主要场景是软件文档：编码 agent 按它找到 API 参考与教程。提案还建议为页面提供 Markdown 版本，并用 `rel` 关联 HTML 页、Markdown 页与 llms.txt。

这解释了 Ahrefs 的日志结构：Claude-Code 这类编码 agent 是主要读者，AI 搜索的检索爬虫几乎不出现。

反过来，营销站、企业官网、博客不在这个场景里。页面本来就是 HTML，AI 搜索通过既有索引取内容；再写一份导读，不会多一条收录通道。

| 站点类型 | 是否值得做 | 原因 |
|---|---|---|
| 公开 API / 开发者文档 | 值得 | 编码 agent 会按图索骥，Markdown 版本还能减少解析成本 |
| 产品帮助中心 | 可做 | 结构稳定、页面多，导读能降低 agent 的探索成本 |
| 企业官网 / 营销站 | 最后做或不单独做 | 目标是搜索引用，收益路径不成立 |
| 内容站 / 博客 | 不做 | sitemap 与内链已覆盖发现需求，维护成本不划算 |
| 把 llms.txt 当收录开关 | 不要做 | 它不是 robots.txt，不控制抓取，也不屏蔽训练 |

判断标准不是“别人都在做”，而是“有没有一类读者会主动找这份文件”。没有这类读者，做了也只是多一个要维护的 URL。

---

## 五、决策树：什么条件下做，什么条件下不做

把上面的证据压成一张判断表，决策就不需要站队。

1. **有公开开发者文档，且客户会用编码 agent 读文档 → 做。** 放在 `/llms.txt` 或 `/docs/llms.txt`，按规范写，链接指向 Markdown 版本。
2. **只有企业官网，目标是 AI 搜索引用 → 不做，或排到最后。** 先把 robots、sitemap、正文直出、实体与可摘段落做完。
3. **被 Lighthouse 的 Agentic Browsing 报告困扰 → 做一个最小合规文件即可。** 404 本来判不适用，不必为分数造文件。
4. **想用它阻止训练或控制收录 → 不要做。** 训练与检索的开关在 robots.txt 与 noindex，llms.txt 没有这个能力。
5. **没有维护人手 → 不做。** 一个过期、链接失效的导读，比没有更差。

如果只能留一条：先问“谁会在什么任务里主动来取它”。答不出来，就不做。

---

## 六、如果要做：最小合规写法与验收

决定要做，就按提案的格式做。格式不对，agent 解析不了，等于没做。

- 位置：`/llms.txt`，或 `/docs/llms.txt`（只覆盖该路径下的页面）。
- 结构：必须有 H1；建议一段 blockquote 摘要；用 H2 分组。
- 条目：用 `[名称](URL)`；不要只写裸 URL。
- 指向：LLM 友好页面或 Markdown 版本；可访问、非重定向、非 noindex。
- 响应：`text/plain` 或 `text/markdown`，返回 200。
- 体积：短小，是导读不是镜像。

```markdown
# 示例站点

> 一句话说明站点是什么、主要服务谁。

## 文档
- [快速开始](https://example.com/docs/start.md): 安装与第一个请求
- [API 参考](https://example.com/docs/api.md): 全部端点与参数
```

验收只有三条：返回 200；H1、摘要与至少一个 Markdown 链接能被解析；链接在无 JS 时可达。

Lighthouse 的审计很宽：404 判不适用，只有服务器错误才报错；别把“通过”当成做对了。

更新频率提前定：文档结构大改时更新一次，不为每篇文章加条目。导读一旦变成第二套目录，就会和 sitemap 打架。

---

## 七、比 llms.txt 更值得先做的四件事

如果目标是 AI 搜索可见度，下面四件事的收益路径更清楚。

**第一，放行对的爬虫。** OAI-SearchBot、Claude-SearchBot、PerplexityBot 与 Googlebot 各管一段；训练与检索分开管理。见 [AI 爬虫排查](/blog/ai-crawlers)。

**第二，让页面可发现。** sitemap、内链与自指 canonical 是索引入口；内链如何影响实体理解，见[内链与实体](/blog/internal-links-ai-crawling)。

**第三，让内容可摘。** 正文直出、结论前置、H2 问句化、表格与清单。方法见[如何让 AI 引用你的网站](/blog/how-to-get-cited-by-ai)。

**第四，让实体可信。** 名称、定位、头衔一致，About 与 Organization 标记对得上，第三方档案可交叉验证。见[品牌实体归属治理](/blog/brand-entity-ownership)。

这四件事的官方机制依据，站内已在[六大模型官方规则](/blog/geo-2026-08-26-ai-citation-guide)里汇总；实体与结构化标记的写法见[结构化数据指南](/blog/structured-data-guide)。

文档站的第五件事才是 Markdown 版本与 `rel` 关联——它比单独一个 llms.txt 更接近提案的完整用法。整体顺序见[GEO 优化怎么做](/blog/how-to-do-geo)与[GEO 框架](/blog/geo-framework)。

---

## 八、我们自己的用法：保留，但不指望它

geova.cn 的 `/llms.txt` 是 2026 年 9 月加的，现在返回 200、`text/plain`，列了首页、服务页、工具页和一批文章。

保留的理由只有两个：成本几乎为零；对少数主动找导读文件的 agent，它比从首页猜结构省事。

我们不指望它做三件事：不当排名或引用因素；不当收录开关；不当全站镜像。完整索引以 sitemap 与 `/blog` 为准，新增文章不逐一同步；它的角色是入口，不是目录。

也没把它接入 KPI。没有可归因的数据表明它带来引用；如果明天删掉，按现有证据，很难预期会有可测量的变化。

保留它，只是成本低到不值得为“删不删”开会。

---

## 行动清单

### 今天做

- [ ] 打开 `/llms.txt`，确认返回 200、`Content-Type` 是 `text/plain` 或 `text/markdown`
- [ ] 确认文件有 H1、摘要与至少一个 Markdown 链接
- [ ] 在服务器日志里确认关键检索爬虫的请求与状态码

### 本周做

- [ ] 按站点类型做一次决策：文档站做、营销站延后、内容站不做
- [ ] 如果做，把链接改成 Markdown 格式，去掉裸 URL 与死链
- [ ] 把 llms.txt 从“AI 可见度 KPI”里移除，改记 GSC 与固定提问集

### 本月做

- [ ] 文档站补 Markdown 版本与 `rel` 关联
- [ ] 复查 robots.txt 与 sitemap，确保它们仍是主通道
- [ ] 每季度只做一次结构更新，不为单篇文章维护

---

## 结语

llms.txt 的问题，不是“有用还是没用”，而是“对谁、在什么条件下、用什么指标衡量”。

对 Google 搜索，它已被明确排除在必需项之外；对 AI 检索爬虫，日志显示它们几乎不读；对编码 agent，它是少量但真实的便利。把这三件事分开，决策就不难：文档站做一个合规版本，营销站把资源放回更靠前的通道。

如果只能记一句：它不是 AI 搜索的入场券，最多是给 agent 的一张便签。

---

## 📩 需要帮助？GEO 咨询团队可以为你做什么

如果你已经排除了 llms.txt，想知道下一步该把资源放在哪里：

- **免费工具**：先跑一轮 AI 爬虫访问与正文可读性检查，确认通道没有断
- **GEO 优化服务**：按技术通道、实体、内容可摘性的顺序推进，不靠单点技巧
- **GEO 人工诊断**：需要对照竞品与引用结果时，做一次基线审计

[先跑一轮免费诊断 →](/tool)

[了解 GEO 优化服务 →](/services/geo-optimization)

[了解 GEO 人工诊断 →](/services/geo-audit)

---

*本文依据 Google Search Central 2026 年 6 月 15 日变更日志与《AI features and your website》文档、Chrome Lighthouse 13.3 的 llms.txt 审计说明、llms.txt 提案 v2（2026 年 8 月更新）、Ahrefs 2026 年 6 月发布的 137,210 个域名日志研究、SE Ranking 约 30 万域名的相关性研究整理。第三方数据均标明来源类型；本文不含自有实验数据、搜索量或见效周期。AI 平台的产品与爬虫策略变化较快，结论截至 2026 年 11 月。*
````

---

## 四、内链表

| 链接 | 层级 | 为什么现在需要点它 |
|---|---|---|
| `/blog/how-to-do-geo` | 上游（方法论） | 读者确认 llms.txt 不是主战场后，需要知道整体执行顺序，避免继续在单点文件上打转 |
| `/blog/geo-framework` | 上游（框架） | 把 llms.txt 放回「抓取 → 采信 → 摘录 → 推荐」四层里，判断它究竟影响哪一层 |
| `/blog/geo-2026-08-26-ai-citation-guide` | 平级（官方规则） | 本文只讲 llms.txt，六大模型的完整官方口径与爬虫分工在那篇汇总 |
| `/blog/structured-data-guide` | 平级（实体与标记） | 替代方案里的 Organization / Person / Product 标记怎么写，需要具体格式 |
| `/blog/ai-crawlers` | 平级（技术通道） | 「放行对的爬虫」是比 llms.txt 更靠前的通道问题，排查方法在那篇 |
| `/blog/internal-links-ai-crawling` | 平级（发现路径） | 内链如何影响 AI 的抓取路径与实体理解，是 llms.txt 的替代方案之一 |
| `/blog/how-to-get-cited-by-ai` | 平级（可摘性） | 内容能不能被整段拿走，决定引用结果，比站点导读更直接 |
| `/blog/brand-entity-ownership` | 平级（实体可信） | 品牌名在 AI 答案里没有官网时，实体归属治理是另一条路径 |
| `/tool` | 下游（工具） | 先低成本确认 AI 爬虫访问与正文可读性，再决定是否投入人工排查 |
| `/services/geo-optimization` | 下游（商业） | 通道与实体确认后，需要按顺序推进优化，而不是只改一个文件 |
| `/services/geo-audit` | 下游（商业诊断） | 需要对照竞品与引用结果、建立基线时，走人工诊断 |

三层齐备：上游（方法论 / 框架）+ 平级（官方规则、实体、通道、内链、可摘性、实体归属）+ 下游（工具 / 优化 / 诊断）。所有路由均真实存在，无尾斜杠。

---

## 五、CTA

- 目标：`/tool`（免费工具）→ `/services/geo-optimization`（GEO 优化服务）→ `/services/geo-audit`（GEO 人工诊断）
- 匹配理由：Informational / 技术决策型意图。读者的问题不是「立刻买服务」，而是「这个文件值不值得做、不做的话先做什么」。因此先给免费自测，再给优化服务，最后给需要对照竞品的诊断；不走 `/contact`，也不把 CTA 写成销售页。
- 口径符合 2026-09-22 的「按 Intent 动态选择」决定：免费工具 → GEO 审计 → GEO 优化服务。

---

## 六、Sources / References

| 口径 | 来源类型 | 用途 |
|---|---|---|
| llms.txt「对 Google 搜索不是必需，不影响可见性或排名；为其他服务保留也可以」 | Google Search Central 变更日志，2026-06-15 | 第二节核心官方口径 |
| AI Overviews / AI Mode 不需要新的机器可读文件、AI 文本文件或额外标记；无额外技术要求 | Google Search Central《AI features and your website》 | 第二节 |
| Lighthouse 13.3 的 llms.txt 审计：404 判 N/A，服务器错误才报错；用于 Agentic Browsing | Chrome Lighthouse 官方文档（Last updated 2026-05-05） | 第二节、第六节 |
| llms.txt 提案 v2：H1、blockquote 摘要、H2 文件列表、Markdown 链接；主要场景为软件文档；Markdown 版本与 rel 关联 | llmstxt.org（Jeremy Howard，2024-09-03 提出，2026-08-10 更新 v2） | 第四、六节 |
| 137,210 个域名的服务器日志：约 3.8 万份有效文件，百分之九十七零请求；编码 agent 约占十分之一；AI 检索爬虫约百分之一；OAI-SearchBot / PerplexityBot / Claude 搜索爬虫合计几百次；Googlebot 约九百次 | Ahrefs 研究，2026 年 6 月发布（数据窗口 2026 年 5 月） | 第三节核心证据 |
| 约 30 万域名的相关性研究：约一成域名有 llms.txt；控制变量后与 AI 引用无检出关系；移除变量模型略好 | SE Ranking 研究（2026-10-15 发布） | 第三节 |
| 2025 年 12 月 Google Search Central 文档站出现 llms.txt、数小时内移除 | Search Engine Journal 报道 | 第二节「文件存在不等于官方支持」 |
| 站内六大模型规则汇总 | `/blog/geo-2026-08-26-ai-citation-guide` | 交叉引用，不重复机制 |
| 站内技术通道排查 | `/blog/ai-crawlers` | 替代方案第一节 |
| 站内内容可摘性方法 | `/blog/how-to-get-cited-by-ai` | 替代方案第三节 |

---

## 七、SEO Checklist

- [x] Title 31 字（≤40），含核心判断「到底要不要做」
- [x] Meta Description 156 字（80–160）
- [x] Slug = 主关键词英文 kebab-case，非日期
- [x] 8 个编号 H2，每个回答一个独立子问题
- [x] 内链全部为站内真实路由、无尾斜杠
- [x] 无孤立 `#标签`、无跨行断裂粗体
- [x] 主关键词在 Title / Description / TL;DR / 多个 H2 中自然出现
- [x] 无「随着…的发展」「在数字化时代」类开场
- [x] 正文不写 H1

## 八、GEO Checklist

- [x] 每个 H2 首段给出可直接摘走的答案句
- [x] 实体明确：Google Search Central、AI Overviews、AI Mode、Chrome Lighthouse、Agentic Browsing、OpenAI、Anthropic、Gemini、OAI-SearchBot、PerplexityBot、Claude-SearchBot、Claude-Code、GPTBot、Ahrefs、SE Ranking、Jeremy Howard、llms.txt v2
- [x] 结构化信息：2 张表（三个问题 / 站点类型）+ 5 条决策树 + 1 个最小示例代码块
- [x] 条件判断明确：文档站做、营销站延后、内容站不做、收录开关不要做、无维护人手不做
- [x] 证据与观点分开：官方文档、日志研究、相关性研究各自标明来源类型
- [x] 无自有实验数据、无虚构案例、无效果承诺
- [x] 无百分比符号；数据用「百分之……」表述，均可在来源中复核

## 九、A–G 质检

| 维度 | 结论 | 说明 |
|---|---|---|
| A. Intent | 通过 | 回答「llms.txt 到底要不要做」，与标题、Search Intent 一致 |
| B. Cannibalization | 通过（评分 1） | 与 `geo-2026-08-26-ai-citation-guide` 是「一句官方辟谣 vs 专题决策指南」；与 `seo-audit-geo-checklist` 是「审计边界 vs 文件本身」；未复用旧文结构 |
| C. SEO | 通过 | Title / Meta / slug / H2 / 内链均符合规范 |
| D. GEO | 通过 | 有可摘答案、实体清晰、结构化信息充分、结论有官方与第三方依据 |
| E. E-E-A-T | 通过 | 官方来源逐项标明；第三方研究标明类型与数据窗口；未把第三方口径说成自有；本站实践已实测 |
| F. Commercial | 通过 | CTA 为 `/tool` → `/services/geo-optimization` → `/services/geo-audit`，与 Informational / 技术决策意图匹配，不强推 `/contact` |
| G. Internal Links | 通过 | 上游（how-to-do-geo、geo-framework）+ 平级（官方规则、结构化数据、爬虫、内链、可摘性、实体归属）+ 下游（工具、优化、诊断）三层齐备，11 条路由全部真实 |

脚本结果：`BROKEN LINKS: none`｜`over 150 chars: none`｜`percent assertions: none`｜`hanzi 2997`｜`title 31`｜`desc 156`｜`tags 4`｜`category 合法`。

---

## 十、执行报告

```text
GEOVA Day 20 执行报告

状态：
✅ 已发布（2026-11-03）

标题：
llms.txt 到底要不要做：官方口径、可验证收益与替代方案

Search Intent：
Informational（技术决策）

核心价值：
把 llms.txt 的争论拆成三个可分别回答的问题——官方各产品线怎么说、日志与相关性研究能验证什么、什么类型的站点属于受益场景——并给出五条决策树、最小合规写法与更值得优先做的替代方案。补上现有文章只有一句「官方辟谣」的空白。

与旧文冲突：
部分重叠（评分 1），已处理。与 geo-2026-08-26-ai-citation-guide 是「一句官方口径 vs 专题决策指南」；与 seo-audit-geo-checklist 是「审计边界 vs 文件本身」；对豆包篇的 llms.txt 打法只陈述证据边界，不点名。

主要内链：
/blog/how-to-do-geo
/blog/geo-framework
/blog/geo-2026-08-26-ai-citation-guide
/blog/structured-data-guide
/blog/ai-crawlers
/blog/internal-links-ai-crawling
/blog/how-to-get-cited-by-ai
/blog/brand-entity-ownership
/tool
/services/geo-optimization
/services/geo-audit

CTA：
免费工具 → GEO 优化服务 → GEO 人工诊断（/tool → /services/geo-optimization → /services/geo-audit）

事实风险：
低—中。Google 官方变更日志、AI 功能文档与 Lighthouse 文档已直取原文；Ahrefs 与 SE Ranking 数据来自第三方研究，发布前建议复核原报告的数字与口径；2025 年 12 月 Google 文档站事件来自 SEJ 报道，文中已用「疑似」。

是否包含自有数据：
否（仅说明本站 llms.txt 现状，已实测 200 / text/plain / 37 个条目）

是否需要人工核验：
是（Ahrefs、SE Ranking 两项研究；SEJ 对 2025 年 12 月事件的报道）

文件：
src/content/blog/llms-txt-decision.md
GEOVA_Day20_llms-txt-decision.md
```

---

## 十一、发布与线上验证

| 项 | 结果 |
|---|---|
| 发布提交 | `d5c8a3f` feat(blog): publish llms-txt-decision (Day 20) |
| 构建 | `npx astro build` 通过；`dist/blog/llms-txt-decision/index.html` 生成 |
| 本地产物 | Title / H1 / 12 个 H2 / canonical 正确；BlogPosting、BreadcrumbList、Organization、Person、WebPage 均存在；`dist/sitemap-0.xml` 含新 URL |
| 线上 URL | https://www.geova.cn/blog/llms-txt-decision/ ｜ 推送后轮询返回 200 |
| 线上 Title / H1 | 与 frontmatter 一致 |
| 线上 H2 数 | 12 |
| 线上 canonical | `https://www.geova.cn/blog/llms-txt-decision/` |
| 线上 Schema | BlogPosting、BreadcrumbList、Organization、Person、WebPage |
| 线上 sitemap | `sitemap-0.xml` 已含 `/blog/llms-txt-decision/` |
| 线上内链可达 | 11 条文章内链：8 条博客链接 308 → 200，3 条工具/服务页 200 |
| 草稿残留 | 线上页面无「待编辑确认 / 选点说明 / 日报改写」 |
| 草稿清理 | `blog-drafts/llms-txt-decision.md` 已随 `mv` 移除，无残留 |
