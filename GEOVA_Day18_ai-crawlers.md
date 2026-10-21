# GEOVA Day 18 执行包｜AI 抓不到、也读不懂

## 一、Pre-Writing Audit

### 1. Search Intent

用户是技术负责人、SEO 负责人或内容运营负责人：站点在 AI 答案里长期缺席，已经排除了「内容不够好」这一层，怀疑 AI 爬虫根本没抓到或没读懂。用户处于「有 SEO 基础、需要定位技术通道」的阶段，搜索这个问题是为了拿到一条可执行的排查顺序，而不是又一份内容写作建议。

本文解决：沿一次抓取请求，把「抓不到」与「读不懂」拆成六个技术断点，给出每个断点的失败指纹、取证方法与修复顺序，并说明 UA 探测的证据强度边界。

本文不解决：实体、证据与段落可摘性（三关中的后两关，见 `how-to-get-cited-by-ai`）；canonical、noindex、hreflang 等自我屏蔽（见 `ai-citations-drop-after-migration`，Day 19 亦会单独展开）；完整 GEO 审计规格与评分口径（Day 30）；单平台爬虫机制对比（见 `geo-2026-08-26-ai-citation-guide`、`chatgpt-optimization`）；工具功能与评分说明（见 `/tool`）。

### 2. Existing Content Conflict 评分：1（部分重叠但有新价值）

| 旧文 | 重叠点 | 本文边界 |
|---|---|---|
| `ai-citations-drop-after-migration`（Day 4） | 都涉及 robots/CDN 与 JS 渲染 | 旧文是「改版/迁移后引用下跌」的事件驱动排查，五个断点；本文是常青的技术通道审计，六个断点，新增「UA 探测证据不对称」「声明层 × 执行层」与「内容投递一致性」 |
| `seo-audit-geo-checklist`（Day 15） | 都提到 UA 探测与正文直出 | 旧文是审计流程与报告设计，技术项只占两行；本文深挖单一主题「技术通道」，不写抽样、取证字段与报告措辞 |
| `how-to-get-cited-by-ai` | 第一关「检得到」涉及 robots 与日志 | 旧文是三关全景与诊断动作；本文只深挖第一关的技术子层，不重复采信与摘录 |
| `how-to-do-geo` 第 1 层 | 技术通道的概览 | 旧文讲五层顺序，技术通道只有两段；本文是该层的一篇深挖 |
| `geo-2026-08-26-ai-citation-guide` | 都涉及官方爬虫分工 | 旧文是六引擎官方规则对比；本文是站点侧请求路径排查，不复述平台对比 |
| `/tool` | 工具能力 | 工具页讲功能与评分；本文只把工具当自测手段，并明确其证据边界 |

结论：可写（评分 1）。必须守住「技术通道排查」这一条线，不滑向内容优化、实体建设或平台机制综述；三关、五层、审计与自我屏蔽均只内链。

### 3. Unique Value

现有文章没有把「AI 抓不到 / 读不懂」拆成一条请求路径上的六个断点，也没有说明 UA 探测的证据不对称：403 是强证据，200 只是弱证据。本文补上这两块，并给出每个断点的失败指纹与修复顺序。

### 4. 数据与边界

- 主关键词「AI爬虫」在 V2.2 词库内（P1，Topic Cluster：AI Crawlers，目标 URL `/blog/ai-crawlers/`，状态：规划）；词库未提供搜索量与 KD，本文不编造任何搜索量或难度数据。
- 正文不使用任何百分比断言；不虚构客户案例、实验数据或效果承诺。
- 官方口径均标明来源类型：IETF RFC 9309、Google Search Central、OpenAI、Anthropic、Perplexity、Cloudflare 官方文档；站内工具口径来自 `src/lib/crawler-access.ts` 与 `/tool` 页面。
- Day 21 / 23 / 24 的合并规则不适用本篇。

---

## 二、Article Metadata

| 字段 | 内容 |
|---|---|
| Title | AI 抓不到、也读不懂：robots.txt、CDN/WAF 与 JS 渲染排查 |
| Meta Description | AI 答案里没有你的网站，先别改内容：AI 爬虫可能没抓到，也可能抓到了却读不懂。本文沿一次抓取请求拆出六个技术断点——robots.txt 声明、CDN/WAF 执行、状态码与跳转、JS 渲染、HTML 结构、内容投递一致性，给出每个断点的失败指纹、取证方法与修复顺序。 |
| H1 | 由 frontmatter `title` 渲染，正文不写 H1 |
| 主关键词 | AI爬虫（库内 P1，无搜索量/KD 数据） |
| 次关键词 | GPTBot、robots 与 WAF、JavaScript 渲染、CSR |
| Search Intent | Informational |
| 内容类型 | 技术审计（一篇讲透） |
| 优先级 | P0 |
| Topic Cluster | AI Crawlers |
| 目标 URL | `/blog/ai-crawlers` |
| 建议内链 | `/blog/how-to-do-geo`、`/blog/how-to-get-cited-by-ai`、`/blog/ai-citations-drop-after-migration`、`/blog/chatgpt-optimization`、`/blog/seo-audit-geo-checklist`、`/tool`、`/services/geo-audit`、`/services/geo-optimization` |
| CTA | 免费工具 → GEO 人工诊断（`/tool` → `/services/geo-audit`） |

标题说明：计划标题为「…与 JS 渲染的一轮排查」，为满足 frontmatter 的 40 字上限，发布标题省略「的一轮」，语义不变；计划中的「（合并原 18+19）」是排期备注，不属于标题。

---

## 三、正文（与 `blog-drafts/ai-crawlers.md` 逐字一致）

```markdown
---
title: "AI 抓不到、也读不懂：robots.txt、CDN/WAF 与 JS 渲染排查"
description: "AI 答案里没有你的网站，先别改内容：AI 爬虫可能没抓到，也可能抓到了却读不懂。本文沿一次抓取请求拆出六个技术断点——robots.txt 声明、CDN/WAF 执行、状态码与跳转、JS 渲染、HTML 结构、内容投递一致性，给出每个断点的失败指纹、取证方法与修复顺序。"
pubDate: 2026-10-21
category: "技术"
tags: ["GEO", "AI爬虫", "robots.txt", "JavaScript渲染"]
author: "GEO 咨询团队"
---

## TL;DR / 核心要点总结

- **「AI 不引用我」要先拆成两个问题：抓不到，还是读不懂。** 前者是请求没到或被拒，后者是拿到 HTML 却解析不出正文；结果一样，取证入口不同。
- **robots.txt 只是声明，不是执行。** 4xx 等于不限制，5xx 等于全站禁止；声明层与 CDN/WAF 执行层必须分开记录。
- **UA 探测的结论不对称：403 是强证据，200 只是弱证据。** 探测请求不是真实爬虫的 IP，最终证据在服务器日志。
- **JavaScript 是「读不懂」的头号原因。** Googlebot 会渲染但需排队，其余 AI 抓取器的公开文档没有渲染承诺。
- **排查顺序固定：日志 → 声明 → 边缘响应 → 原始 HTML → 渲染后 DOM → 内容一致性。** 六项都过仍不被引用，问题在通道之外。

---

## 一、先分清两个问题：抓不到，还是读不懂

AI 答案里没有你时，多数团队直接改内容。但先要确认：引擎有没有拿到页面。拿不到是通道问题，拿到却解析不出正文是表达问题；两者都显示为「没被提及、没被引用」，取证入口却不同。

本文只处理技术通道，它是 GEO 五层工作的第一层，整体顺序见 [GEO 优化怎么做](/blog/how-to-do-geo)。实体、证据与段落可摘性属于另外两关（[三关拆解](/blog/how-to-get-cited-by-ai)）；canonical、noindex 这类自我屏蔽见[改版排查文](/blog/ai-citations-drop-after-migration)。

先用症状定位：

| 你看到的现象 | 更可能的问题 | 第一份证据 |
|---|---|---|
| 日志里完全没有爬虫请求 | 入口或声明层 | 服务器日志 + 线上 robots.txt |
| 有请求，但返回 403、429 或 5xx | 边缘或源站拒绝 | 状态码与 WAF 日志 |
| 200，但原始 HTML 里没有正文 | 渲染层 | 查看源代码，搜一句正文 |
| 200 且正文在，但版本不对 | 投递一致性 | 两种 UA 的 HTML diff |
| 200、正文在，仍不被引用 | 不在技术通道 | 转查采信与摘录 |

---

## 二、沿一次请求走：六个断点与失败指纹

一次抓取是一条从域名解析到 HTML 解析的路径，六个断点各有独立指纹。

| # | 断点 | 典型失败指纹 | 取证手段 |
|---|---|---|---|
| 1 | robots.txt 声明 | 关键检索爬虫被 Disallow；robots.txt 5xx；被 CDN 前置覆盖 | 请求线上文件，按 token 解析 |
| 2 | CDN/WAF 执行 | robots 允许，边缘返回 403、429 或挑战页 | 日志按 UA/IP 过滤；UA 探测交叉验证 |
| 3 | 状态码与跳转 | 长跳转链、302 到登录页或首页、软 404、超时 | 看首跳与最终 URL，数跳转次数 |
| 4 | JavaScript 渲染 | 原始 HTML 只有骨架，正文由脚本注入 | 查看源代码搜正文；关 JS 取一次 |
| 5 | HTML 结构 | 正文在图片、视频、折叠组件或无语义容器里 | 去标签后统计正文量，检查文本载体 |
| 6 | 内容投递一致性 | 不同 UA、地区、登录态看到不同版本 | 两种 UA 各取一次 HTML，对比正文 |

---

## 三、抓不到（一）：robots.txt 的声明层

robots.txt 只是偏好声明，不是访问控制。RFC 9309 明确：遵守与否由爬虫决定，它不能替代安全措施。

状态码语义最容易被忽略：返回 4xx（如 404）时，爬虫可以访问任意资源；返回 5xx 或网络错误时，必须假定全站禁止。**robots.txt 坏掉比没有更糟**——一次源站故障就可能让全站对合规爬虫关门。

匹配规则也有反直觉处：爬虫名按产品 token 做大小写不敏感的子串匹配；路径最长匹配优先，长度相同时 Allow 优先；解析上限至少 500 KiB。`User-agent: *` 只在没有匹配具体爬虫的组时生效——单独为某爬虫写组，它就不再受 `*` 约束。

线上文件还可能和仓库里的不是同一份。部分 CDN 的托管 robots.txt 会前置拼接策略，可能自动写入对 GPTBot、ClaudeBot、Google-Extended 的 Disallow。请永远请求线上 URL。

放行按用途分级：检索型（OAI-SearchBot、Claude-SearchBot、PerplexityBot）必须放行；训练型（GPTBot、ClaudeBot、Google-Extended、Bytespider）按政策单独决定。

用户触发型（ChatGPT-User、Claude-User、Perplexity-User）由用户发起，可能不遵守 robots.txt。分工细节见[ChatGPT 搜索优化](/blog/chatgpt-optimization)。

一个高频错误：AI Overviews 与 AI Mode 由 Googlebot 控制；Google-Extended 只管其他 Google 系统里的训练与 grounding，禁掉它不会让页面退出 AI 搜索。

改完别马上复测：OpenAI 与 Perplexity 都写明生效最长约需 24 小时。

---

## 四、抓不到（二）：CDN/WAF 的执行层

声明层过关，执行层仍可能挡人。典型原因：UA 黑名单、IP 或 ASN 地域规则、Bot Management 评分与挑战、速率限制 429、源站防火墙。

CDN 可能不只看 UA：它可能核对官方 IP 段、反向 DNS 或 Web Bot Auth 签名。所以**探测请求的响应不代表真实爬虫的响应**；反过来，真实爬虫的 IP 段也可能被地域规则误伤。

UA 探测的结论因此不对称：403、429 或挑战页是强证据；200 只能说明「至少没按 UA 拦」。站内工具的 8 个爬虫探测也标注了这一边界（[免费自测](/tool)）。

更可靠的证据在日志：按 UA 过滤，再用官方 IP 段核对来源。Perplexity 的 WAF 文档建议把 UA 与官方 IP 段组合成放行规则，并让放行优先于拦截；Anthropic 提醒直接封 IP 可能连带阻断爬虫读取 robots.txt。

修复顺序：按官方 IP 段与 UA 建放行规则，确认放行在拦截之前，再用日志验证。只改 UA 白名单，等于把门开给任何会写 UA 的脚本。

---

## 五、抓不到（三）：状态码与跳转的投递层

请求到了源站，也可能拿不到页面：301 链过长、302 跳到登录页或首页、返回 200 的软 404、超时、200 的错误页或验证页。

对 AI 侧影响更直接：检索管线有时间预算，超时与失败页会被跳过；跳转链消耗配额，最终落点错了页面等于不存在。

取证：先看不跟随跳转的响应头，记录首跳状态与 Location；再跟随，记录跳转次数与最终 URL；最后确认响应体是正文还是错误页。核心页面跳转超过两三次就值得修。

修复只有两条：旧地址做页面级 301 直指新地址；不要用 302 把用户和爬虫丢到首页或登录页。JS 跳转与 meta refresh 能不用就不用。

---

## 六、读不懂（一）：JavaScript 渲染层

这是「读不懂」里最常见的一类：返回 200，原始 HTML 里只有骨架、占位注释和脚本标签。正文由客户端渲染，抓取器拿到的是空壳。

Googlebot 是例外：官方文档说它会用无头 Chromium 执行 JavaScript，并用渲染后的 HTML 索引。但页面要排队等待渲染，可能几秒也可能更久；Google 也建议重要内容以文本形式提供。

其余 AI 抓取器的公开文档没有渲染承诺。站内工具据此统计 HTML 直出的正文量，对纯客户端渲染页面预警。

检查方法：用「查看源代码」而不是「审查元素」，搜一句正文；审查元素看到的是渲染后 DOM，会把问题藏起来。

修复按成本排序：核心正文改服务端渲染或构建时预渲染；必须客户端渲染的，至少把首屏关键内容放进初始 HTML；懒加载只用于图片；不要把正文塞进点击后才注入的组件。

---

## 七、读不懂（二）：HTML 结构与内容载体

正文在 HTML 里，也不等于机器读得懂。常见问题：关键信息只在图片或视频里；对照表做成截图；正文塞进点击后才注入的折叠面板；页面没有 main、article、h1–h2 的结构线索。

Google 官方建议重要内容以文本形式提供，并让结构化数据与可见文本一致。文本是公共通道；图片依赖额外识别，不能假定检索管线会为每张图做 OCR。

标题、列表、表格、段落能降低解析成本；正文占比过低时，模板噪声会淹没内容。

检查：去掉标签统计正文量；搜一句关键结论，确认是文本不是图片；对折叠组件确认是「CSS 隐藏但仍在 HTML」还是「点击后 JS 注入」——后者等于没有。

修复：关键事实文本化；对照表用 HTML 表格；折叠面板保留 DOM 文字；正文用语义标签；图片与视频只作补充。

---

## 八、读不懂（三）：同一 URL 的内容一致性

更隐蔽的一类：页面能抓、也有正文，但爬虫看到的不是你写的那一版。按 UA 返回不同模板、地区跳转、A/B 测试、Cookie 墙、登录墙、个性化，都会造成偏差。

坏处是证据失真：浏览器里内容完整，探测脚本看到另一份；按浏览器版本排查，永远复现不了爬虫的问题。两个版本不等价，还有 cloaking 风险。

检查：用爬虫 UA 与浏览器 UA 各取一次 HTML，对比正文与关键链接；有条件换地区再取；检查 Vary 与跳转逻辑；确认同意墙不替换正文。

修复：给爬虫与用户等价内容；A/B 测试用独立 URL 或稳定分流；地区跳转用页面级 301 而不是 JS；不要用 Cookie 墙把正文挡在交互之后。

---

## 九、排查顺序与证据记录

六个断点按证据强度排序，不要同时查：

1. **先看日志**：有没有请求、什么 UA 与 IP、什么状态码、响应多快。没有请求先查入口与 robots；失败则查边缘与源站。
2. **再查线上 robots.txt**：确认不是 CDN 托管版本，关键检索爬虫未被 Disallow，文件没有 5xx。
3. **然后做 UA 探测**：声明与实际响应并排看；403 认真对待，200 只当参考。
4. **接着取原始 HTML**：搜正文句子，确认是服务端直出还是 JS 注入。
5. **再看渲染后 DOM**：只在原始 HTML 通过后，用来确认结构与载体。
6. **最后做一致性 diff**：两种 UA、必要时两个地区，对比正文与链接。

每条记录六个字段：URL、UA、来源 IP、时间、状态码与最终 URL、正文是否存在。少一个，第二天就无法复核。

六项全过仍不被引用，问题就不在技术通道：去查实体、证据与段落可摘性（[三关拆解](/blog/how-to-get-cited-by-ai)），或按审计清单固化（[SEO 审计如何加 GEO 检查项](/blog/seo-audit-geo-checklist)）。

---

## 行动清单

### 今天做

- [ ] 拉一天日志，按 OAI-SearchBot、Claude-SearchBot、PerplexityBot、GPTBot 过滤，记录状态码
- [ ] 请求线上 robots.txt，确认关键检索爬虫未被 Disallow、不是 CDN 拼接版
- [ ] 对首页做「查看源代码搜正文」测试

### 本周做

- [ ] 用爬虫 UA 探测首页与两个核心页，与日志交叉验证
- [ ] 清理核心页 302 到首页或登录页的跳转
- [ ] 对核心页做 UA 一致性 diff，确认版本等价

### 本月做

- [ ] 把六个断点写进上线验收清单，改版与新站都跑一遍
- [ ] 建立证据记录表：URL、UA、IP、时间、状态码、最终 URL、正文是否存在
- [ ] 把「关键内容文本化」纳入模板，避免新页面把正文交给 JS 与图片

---

## 结语

「AI 抓不到、也读不懂」拆开之后是一组可被证明的事实：请求有没有到、声明有没有放行、边缘有没有拦、HTML 里有没有正文、机器看到的版本对不对。

排查的纪律只有三条：先日志后探测，先声明后执行，先原始 HTML 后渲染 DOM。六项都过了还不被引用，就别再改 robots.txt 了——问题在通道之外。

---

## 📩 需要帮助？GEO 咨询团队可以为你做什么

如果站点长期缺席 AI 答案，又说不清是抓不到还是读不懂：

- **免费工具**：30 秒跑一轮 8 个 AI 爬虫的 UA 探测与正文可读性检查
- **GEO 人工诊断**：结合服务器日志、WAF 规则与渲染方式，逐断点定位并给出修复顺序
- [**GEO 优化服务**](/services/geo-optimization)：通道修好后，继续处理实体与内容

[先跑一轮免费诊断 →](/tool)

[了解 GEO 人工诊断 →](/services/geo-audit)

---

*本文为技术方法说明类内容，不含自有实验数据。robots.txt 的匹配与状态码语义依据 IETF RFC 9309；Google 的 AI 功能与渲染口径来自 Google Search Central 官方文档；三个引擎的爬虫分工与 IP 段来自 OpenAI、Anthropic、Perplexity 官方文档；CDN 托管 robots 与验证爬虫的说明来自 Cloudflare 官方文档。AI 爬虫的命名、IP 段与产品机制变化较快，本文结论截至 2026 年 10 月。*
```

---

## 四、内链表

| 链接 | 出现位置 | 为什么用户现在需要点它 |
|---|---|---|
| `/blog/how-to-do-geo` | 第一节 | 确认问题在技术通道后，需要知道它在 GEO 五层工作中的位置与前后依赖 |
| `/blog/how-to-get-cited-by-ai` | 第一节、第九节 | 六项技术检查都通过仍不被引用时，下一步是采信与摘录两关 |
| `/blog/ai-citations-drop-after-migration` | 第一节 | 如果站点刚改版或迁移，先排除自我屏蔽与迁移断点，避免重复排查 |
| `/blog/chatgpt-optimization` | 第三节 | 需要按平台确认三个爬虫的分工与放行策略时 |
| `/tool` | 第四节、CTA | 先免费拿到 8 个 AI 爬虫的「声明 × 实际响应」对照 |
| `/blog/seo-audit-geo-checklist` | 第九节 | 要把这套检查固化进常规 SEO 审计时 |
| `/services/geo-audit` | CTA | 工具发现通道问题、需要人工逐断点定位与修复顺序时 |
| `/services/geo-optimization` | CTA | 通道修复后，需要持续处理实体与内容时 |

---

## 五、CTA

按 Search Intent（Informational，技术诊断）选择「免费工具 → 人工诊断」路径，不强制 `/contact`：

- 免费工具 `/tool`：8 个 AI 爬虫 UA 探测 + 正文可读性检测，先拿声明与响应的对照；
- GEO 人工诊断 `/services/geo-audit`：结合日志、WAF 与渲染方式逐断点定位；
- GEO 优化服务 `/services/geo-optimization`：通道修好后的持续优化。

---

## 六、Sources / References

- IETF RFC 9309《Robots Exclusion Protocol》：4xx 视为不限制、5xx 视为全站禁止；产品 token 子串匹配与分组；最长路径匹配；Allow 与 Disallow 等价时优先 Allow；解析上限至少 500 KiB；robots.txt 是自愿遵守的声明，不是访问控制。
- Google Search Central《AI features and your website》：AI Overviews 与 AI Mode 无额外技术要求，页面需被索引且有资格出摘要；Googlebot 的 robots.txt 指令是 Search 侧的控制方式；Google-Extended 用于限制 Google 其他系统中的训练与 grounding；官方建议确保 robots.txt 与 CDN/托管基础设施均允许抓取，重要内容以文本形式提供，结构化数据与可见文本一致。
- Google Search Central《Understand JavaScript SEO basics》：Googlebot 使用无头 Chromium 渲染，页面进入渲染队列，等待时间可能超过数秒。
- OpenAI《Overview of OpenAI Crawlers》：OAI-SearchBot 负责搜索收录与摘要，GPTBot 负责训练，ChatGPT-User 由用户触发且 robots.txt 可能不适用；各设置独立；robots.txt 变更最长约 24 小时生效；公布各爬虫 IP 段。
- Anthropic 帮助中心《Does Anthropic crawl data from the web…》：ClaudeBot 负责训练，Claude-SearchBot 负责搜索索引，Claude-User 由用户触发；遵守 robots.txt；直接封 IP 可能妨碍其读取 robots.txt，不是稳定的退出方式。
- Perplexity《Perplexity Crawlers》：PerplexityBot 负责搜索，Perplexity-User 由用户触发且通常忽略 robots.txt；变更最长约 24 小时生效；WAF 建议把 UA 与官方 IP 段组合成放行规则，并让放行优先于拦截。
- Cloudflare《Managed robots.txt》《Verified bots》《AI Crawl Control》：托管 robots.txt 会在源站文件前前置拼接策略；robots.txt 合规是自愿的，不构成技术拦截；验证爬虫会结合 Web Bot Auth 签名、官方 IP 段或反向 DNS，而非只看 UA。
- 站内实现：`src/lib/crawler-access.ts`（8 个爬虫探测列表与「仅反映该 UA 响应、不代表真实抓取」的免责声明）、`src/pages/tool.astro`（正文可读性/CSR 检测与评分口径）。

---

## 七、SEO Checklist

- [x] Title 40 字（≤40）
- [x] Meta Description 136 字（80–160）
- [x] H1 由 frontmatter `title` 渲染，正文无 H1
- [x] 9 个编号 H2，每个回答一个独立子问题
- [x] slug `ai-crawlers` 为非日期 kebab-case
- [x] 8 条内链全部为站内真实路由，无尾斜杠
- [x] category「技术」在枚举内；tags 4 项
- [x] pubDate 2026-10-21（写作当天）
- [x] 主关键词「AI爬虫」出现在标题、描述与正文；次关键词自然覆盖
- [x] TL;DR 与第一节表格给出可直接摘走的答案

---

## 八、GEO Checklist

- [x] Direct Answer：开篇与「二、六个断点」给出可摘走的排查框架
- [x] Entity：robots.txt、CDN/WAF、Googlebot、OAI-SearchBot、Claude-SearchBot、PerplexityBot、GPTBot、ClaudeBot、Google-Extended、Bytespider、Web Bot Auth 均有明确归属
- [x] Structured Information：2 张表 + 六步排查顺序 + 行动清单
- [x] Evidence：官方文档逐项标明来源类型；无百分比、无虚构数据、无效果承诺
- [x] 段落自包含：56 个散文段落全部 ≤150 字
- [x] 品牌主语：关键结论句带「robots.txt」「UA 探测」「技术通道」等明确主语
- [x] 无草稿残留、无孤立 `#标签`、无跨行粗体

---

## 九、A–G 质检

| 维度 | 结论 | 说明 |
|---|---|---|
| A. Intent | 通过 | 回答「AI 抓不到/读不懂怎么查」，与标题一致；只处理技术通道 |
| B. Cannibalization | 通过（评分 1） | 与 Day 4 的差别是「事件驱动迁移排查 vs 常青路径审计」；与 Day 15 的差别是「审计设计 vs 单主题深挖」；未复用旧文结构 |
| C. SEO | 通过 | Title/Meta/关键词/层级/slug 均符合规范 |
| D. GEO | 通过 | 有可摘答案、实体清晰、结构化信息充分、结论有官方依据 |
| E. E-E-A-T | 通过 | 官方来源逐项标明；无虚构案例、无无法验证数字；无百分比 |
| F. Commercial | 通过 | CTA 为 `/tool` → `/services/geo-audit`，与诊断型意图匹配；`/services/geo-optimization` 仅作后续路径 |
| G. Internal Links | 通过 | 上游（how-to-do-geo）+ 平级（三关、迁移、审计、ChatGPT）+ 下游（工具、审计服务、优化服务）三层齐备，路由全部真实 |

脚本结果：`BROKEN LINKS: none`｜`over 150 chars: none`｜`percent assertions: none`｜`hanzi 2995`｜`title 40`｜`desc 136`｜`tags 4`｜`category 合法`。

---

## 十、执行报告

```text
GEOVA Day 18 执行报告

状态：
✅ 已发布（2026-10-21）

标题：
AI 抓不到、也读不懂：robots.txt、CDN/WAF 与 JS 渲染排查

Search Intent：
Informational

核心价值：
把「抓不到 / 读不懂」拆成一条请求路径上的六个断点，给出每个断点的失败指纹、取证与修复顺序；补上现有文章没有的两个判断——robots 声明层与 CDN/WAF 执行层必须分开记录，UA 探测 403 是强证据、200 只是弱证据。

与旧文冲突：
部分重叠（评分 1）。与 Day 4 的分工是「迁移事件排查 vs 常青通道审计」；与 Day 15 的分工是「审计设计 vs 单主题深挖」；与三关文的分工是「技术子层 vs 三关全景」。

主要内链：
/blog/how-to-do-geo
/blog/how-to-get-cited-by-ai
/blog/ai-citations-drop-after-migration
/blog/chatgpt-optimization
/blog/seo-audit-geo-checklist
/tool
/services/geo-audit
/services/geo-optimization

CTA：
免费工具 → GEO 人工诊断（/tool → /services/geo-audit）

事实风险：
低。robots.txt 语义依据 RFC 9309；AI 功能控制、渲染与文本化建议依据 Google Search Central；三个引擎的爬虫分工与 IP 段依据 OpenAI、Anthropic、Perplexity 官方文档；CDN 托管 robots 与验证爬虫依据 Cloudflare；工具能力依据站内源码。无百分比、无自有实验数据。

是否包含自有数据：
否

是否需要人工核验：
建议发布前复核官方文档是否更新（爬虫命名与 IP 段变化较快）；关键词无搜索量数据，已标注库内 P1。

文件：
src/content/blog/ai-crawlers.md
GEOVA_Day18_ai-crawlers.md
```

---

## 十一、发布与线上验证

| 项 | 结果 |
|---|---|
| 发布提交 | `03380c2` feat(blog): publish ai-crawlers (Day 18) |
| 进度表提交 | `a61ddba` chore(content): mark Day 18 published in geo-day-content progress table |
| 构建 | `npx astro build` 通过；`dist/blog/ai-crawlers/index.html` 生成 |
| 本地产物 | Title / H1 / 13 个 H2 / canonical 正确；BlogPosting、BreadcrumbList、Organization 均存在；`dist/sitemap-0.xml` 含新 URL |
| 线上 URL | https://www.geova.cn/blog/ai-crawlers/ ｜ 2026-10-21 17:11 返回 200（经代理复验） |
| 线上 Title / H1 | 与 frontmatter 一致 |
| 线上 H2 数 | 13 |
| 线上 canonical | `https://www.geova.cn/blog/ai-crawlers/` |
| 线上 Schema | BlogPosting、BreadcrumbList、Organization |
| 线上 sitemap | `sitemap-0.xml` 已含 `/blog/ai-crawlers/` |
| 内链复验 | 8 个正文/CTA 目标全部返回 200：how-to-do-geo、how-to-get-cited-by-ai、ai-citations-drop-after-migration、chatgpt-optimization、seo-audit-geo-checklist、/tool、/services/geo-audit、/services/geo-optimization |
| 草稿残留 | 线上 HTML 扫描无「待编辑确认 / 选点说明 / 日报改写 / 我可以把 / TODO / [Input]」 |

发布后 `blog-drafts/ai-crawlers.md` 已随 `mv` 移入 `src/content/blog/ai-crawlers.md`，无遗留草稿文件。

---
