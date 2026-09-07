# GEOVA_Phase3_Analytics 验收报告（GA4 + GTM + dataLayer 漏斗埋点）

- **验收日期**：2026-09-07
- **验收依据**：《最终指令.txt》（第三阶段第二批：只做数据追踪，不改页面结构 / SEO）
- **验收环境**：本地 `npm run build`（exit 0）
- **结论**：✅ **代码层埋点完成，build 通过，15 项静态验收全部通过**
- **重要边界**：⚠️ **代码层已完成，GTM 控制台配置待人工完成**（仓库内无法访问 GTM 控制台，容器 Trigger / Tag 未在本批次中配置，也不声称已完成）

---

## 一、当前 Analytics 架构（修改前核查结果）

| 项 | 现状 | 处理 |
|---|---|---|
| GTM | `src/layouts/Layout.astro:41-47`（head 容器代码）+ `68-71`（noscript）**已初始化一次**，容器 `GTM-KLSDF65Z`，全站页面共用该 Layout | **未重复初始化**；本批次未触碰 Layout |
| GA4 | 无直接 gtag 代码，GA4 依赖 GTM 容器内配置 | 沿用，不新增 |
| dataLayer | 仅在 `contact.astro` 提交成功处内联 `window.dataLayer.push({event:'generate_lead'})` | 改为统一 helper（同一行为） |
| 共享 analytics 工具 | **不存在**（无 lib / helper / 组件封装） | 新建唯一入口 `src/lib/analytics.ts` |
| 事件 | 仅有 `generate_lead` 一个（contact 提交成功后触发，无参数） | 保留并补 `service` |

**架构结论**：页面 → `dataLayer.push`（事件名 snake_case）= GA4 事件名 → GTM → GA4。全站唯一的 analytics 事件出口为 `src/lib/analytics.ts` 的 `track()`，各页面不再各自拼 `window.dataLayer`。

## 二、修改文件（4 改 + 1 新增）

| 文件 | 变更 | 内容 |
|---|---|---|
| `src/lib/analytics.ts` | **新增** | `track(eventName, params?)`：dataLayer 兜底初始化 + push；`safePageUrl()`：埋点用 URL 清洗（只留 origin+path，丢 query/hash）。不加载 gtag、不初始化 GTM/GA4 |
| `src/pages/tool.astro` | ~+30 | tool_scan_start / tool_scan_complete / tool_scan_error / tool_cta_click；结果区与页底 CTA 加 `data-cta-name` |
| `src/pages/services/geo-audit.astro` | +9 / 4 处属性 | 新增事件委托脚本 → geo_audit_cta_click；4 个 CTA 加 `data-cta-name` |
| `src/pages/services/geo-optimization.astro` | +9 / 3 处属性 | 新增事件委托脚本 → geo_optimization_cta_click；3 个 CTA 加 `data-cta-name`（自链接除外，见下） |
| `src/pages/contact.astro` | ~+20 / −3 | contact_start / contact_submit_attempt；generate_lead 改走 helper 并补 `service` |

## 三、事件清单（9 新增 + 1 保留）

| 事件 | 位置 | 触发条件 | 参数 | PII |
|---|---|---|---|---|
| `tool_scan_start` | tool.astro:446 | 用户输入 URL 通过前端校验、即将请求 `/api/scan`（真正开始扫描） | `source_url`（清洗为 origin+path；解析失败则省略） | 无 |
| `tool_scan_complete` | tool.astro:471 | `/api/scan` 成功返回且报告已渲染（见合并说明） | `score`、`source_url` | 无 |
| `tool_report_view` | **与 complete 合并**（见说明） | — | — | — |
| `tool_scan_error` | tool.astro:463 / 473 | API 非成功响应 → `error_type:"api_error"`；fetch 网络异常 → `error_type:"network_error"` | 仅 `error_type`（粗粒度） | 无 |
| `tool_cta_click` | tool.astro:490 | Tool 结果区 / 页底带 `data-cta-name` 的 CTA 被点击 | `cta_name`、`cta_target`、`score`（有展示报告时附带） | 无 |
| `geo_audit_cta_click` | geo-audit.astro:420 | GEO Audit 页带 `data-cta-name` 的 CTA 点击 | `cta_name`、`cta_target` | 无 |
| `geo_optimization_cta_click` | geo-optimization.astro:460 | GEO Optimization 页带 `data-cta-name` 的 CTA 点击 | `cta_name`、`cta_target` | 无 |
| `contact_start` | contact.astro:222 | 用户首次对表单字段（input/select/textarea）focusin 或 input——**只触发一次**，用 focusin+input 双监听兜底移动端；提交按钮聚焦不算「开始填写」 | 无 | 无 |
| `contact_submit_attempt` | contact.astro:238 | 用户点击提交且通过浏览器必填校验（submit 事件触发；无效表单不会触发） | `service`（下拉枚举值；未选则省略） | 无 |
| `generate_lead`（保留） | contact.astro:271 | **仅 Web3Forms 返回 success 后**（原有逻辑未删除） | 原无参数 → 补充 `service`（枚举值）；`source_url` 不补充：静态架构无可靠来源页信息，GA4 自动附带 `page_location` | 无 |

### tool_report_view 与 tool_scan_complete 合并说明

当前代码中，`/api/scan` 成功返回后**立即同步调用 `renderResults(data)` 展示报告，无中间步骤、无二次等待**——「API 成功返回」与「报告展示给用户」是同一个用户动作（同一 tick 内完成）。因此合并为一次 `tool_scan_complete` 上报（携带 score / source_url），不单独发 tool_report_view；后续若报告改为异步/分步展示，再拆分。

### 合并事件实测参数

- `tool_scan_complete`：`score`（0-100 数字）、`source_url`（data.url 或输入值清洗后的 origin+path）
- `tool_scan_error` 不携带：API 报错原文（可能回显目标站细节）、HTTP 状态码原文以外的任何内容——**只发 api_error / network_error 两个粗粒度值**

### CTA 命名（实际页面为准）

| 页面 | cta_name | cta_target | 按钮 |
|---|---|---|---|
| /tool/ | `human_audit` | /services/geo-audit/ | 结果框底部「人工深度诊断」；优化建议内动态「可预约人工诊断服务」；页底「🩺 了解 GEO 人工深度诊断」 |
| /tool/ | `book_consultation` | /contact | 页底「📅 或先预约免费咨询」 |
| /services/geo-audit/ | `back_to_tool` | /tool/ | 「🛠️ 先用免费工具自测」 |
| /services/geo-audit/ | `optimization` | /services/geo-optimization/ | 「🚀 了解 GEO 优化服务」 |
| /services/geo-audit/ | `book_consultation` | /contact | 「📅 预约人工诊断」+ 页底「📅 预约免费 15 分钟咨询」 |
| /services/geo-optimization/ | `back_to_tool` | /tool/ | 「🛠️ 免费工具检测基础健康度」 |
| /services/geo-optimization/ | `human_audit` | /services/geo-audit/ | 「🩺 GEO 人工审计：先看清 AI 里的真实可见度」 |
| /services/geo-optimization/ | `book_consultation` | /contact | 页底「📅 预约免费 15 分钟咨询」 |

说明：
- 只对**漏斗型 CTA** 埋点（按钮 / 结果区转化链接）；正文信息链接与 FAQ 内链接不埋点，避免噪音。
- `/services/geo-optimization/` 的「🚀 GEO 持续优化（当前页面）」为**自链接**（点击不发生页面转移），不埋点。

## 四、Tool 漏斗

```
输入 URL →（前端校验失败：无事件，未开始扫描）
   ↓ 校验通过
tool_scan_start { source_url }        ← 真正开始请求扫描
   ↓ /api/scan 非成功 / 网络异常
tool_scan_error { error_type }        ← 无 score、无报错原文
   ↓ /api/scan 成功
tool_scan_complete { score, source_url }   ← 与 report_view 合并（同步渲染）
   ↓ 结果区 / 页底 CTA 点击
tool_cta_click { cta_name, cta_target, score? }  → 人工诊断 / 预约咨询
```

## 五、Contact 漏斗 与 generate_lead 逻辑

```
用户开始填写（首次字段交互）
   ↓ contact_start（只触发一次，页面内不重复）
点击提交（浏览器校验通过才触发 submit）
   ↓ contact_submit_attempt { service }
Web3Forms API 请求
   ├─ 成功 → generate_lead { service }     ← 唯一的 lead 事件，成功后才触发
   └─ 失败（服务端报错 / 网络异常）→ 无 generate_lead，只保留 contact_submit_attempt
```

要点：
- `generate_lead` 原有触发点**保留未删除**（仅成功分支，contact.astro:271），不会因新增 submit_attempt 而产生重复 lead；
- 提交期间按钮 disabled，天然防连点重复提交（原有行为）；
- 失败路径（`data.success=false`、fetch 异常）只产生 submit_attempt —— 与指令第六节一致。

## 六、CTA 导航不被埋点阻塞

- 所有埋点 CTA 均为原生 `<a href>`，导航不依赖任何 JS；
- 点击监听为**事件委托 + 同步 push**，不 `preventDefault()`、不 await；
- GTM/GA4 加载失败或 dataLayer 异常时，push 到兜底数组后照常放行 —— 埋点零阻塞导航。

## 七、PII 检查（逐事件核对）

| 检查项 | 结果 |
|---|---|
| 姓名 / 邮箱 / 电话 / 公司 / 留言原文进入任何事件 | ✅ 未发送（上述内容仅存在于 Web3Forms 业务 payload，属原有业务逻辑，不参与埋点） |
| `tool_scan_error` 上传报错原文 / 目标站细节 | ✅ 只发 `error_type` 粗粒度值 |
| `source_url` 携带 query / hash（URL 敏感参数） | ✅ `safePageUrl()` 清洗为 origin+path，解析失败直接省略该参数 |
| `service` 参数 | ✅ 固定下拉枚举值（seo-audit / geo-optimization / geo-audit / training / not-sure），非自由文本 |
| `score` | ✅ 0-100 数字 |

## 八、重复初始化检查

- GTM 容器代码（`GTM-KLSDF65Z`）仅存在于 `Layout.astro`（head snippet + noscript iframe，标准一份）；本批次零修改；
- 全仓无 `gtag(` / GA4 直发代码；`analytics.ts` 只 push 不 init；
- 页面脚本经 build 后确认：tool / contact / geo-audit / geo-optimization 四个 bundle 各含本页事件，`generate_lead` 在 contact bundle 中恰好 1 处。

## 九、Build 结果

- `npm run build` → **exit 0**
- `[build] ✓ Completed`；tool/contact/geo-audit/geo-optimization 各页脚本 bundle 成功产出，事件字符串均可在 `dist/_astro/*.js` 中检索到
- 本批次未改：SEO / Schema / Title / Meta / URL / robots / sitemap / 博客 / 页面结构 / 扫描与评分逻辑 / UI / CTA 数量 / CRM / 预约系统 / 支付

## 十、验收清单（15 项）

| # | 验收点 | 结果 |
|---|---|---|
| 1 | tool_scan_start 存在 | ✅ tool.astro:446 |
| 2 | tool_scan_complete 存在 | ✅ tool.astro:471 |
| 3 | tool_report_view 存在或说明合并 | ✅ 与 complete 合并（见第三节说明） |
| 4 | tool_scan_error 存在 | ✅ tool.astro:463（api_error）/ 473（network_error） |
| 5 | tool_cta_click 存在 | ✅ tool.astro:490 |
| 6 | geo_audit_cta_click 存在 | ✅ geo-audit.astro:420 |
| 7 | geo_optimization_cta_click 存在 | ✅ geo-optimization.astro:460 |
| 8 | contact_start 存在 | ✅ contact.astro:222（只触发一次） |
| 9 | contact_submit_attempt 存在 | ✅ contact.astro:238 |
| 10 | generate_lead 保留 | ✅ contact.astro:271 |
| 11 | 失败提交不触发 generate_lead | ✅ 仅在 `data.success` 分支触发 |
| 12 | CTA 不依赖 analytics 跳转 | ✅ 原生 `<a href>` + 不 preventDefault + 同步 push |
| 13 | 不发送 PII | ✅ 见第七节 |
| 14 | 没有重复初始化 GA4/GTM | ✅ GTM 仅 Layout 一份，全仓无 gtag |
| 15 | build 成功 | ✅ exit 0 |

## 十一、GTM 控制台：需要人工配置 ⚠️

**代码层已完成，GTM 控制台配置待人工完成。** 仓库无法访问 GTM 控制台（GTM-KLSDF65Z），本批次**未**在容器内配置任何 Trigger / Tag，也不声称 GTM 已生效。上线前需人工在 GTM 控制台完成：

1. 为每个事件建 **自定义事件 Trigger**，Trigger 名与 dataLayer `event` 值一致（`tool_scan_start` … `generate_lead`，事件名必须与代码一致，GTM Trigger 匹配规则 `event equals <snake_case 名>`）；
2. 为每个 Trigger 建 **GA4 事件 Tag**，指向 GA4 测量 ID；
3. `contact_start` / `contact_submit_attempt` / `generate_lead` 建议另建 **GA4 转化（Key Event）** 标记 lead 类事件；
4. 保留现有 GTM 容器代码不动（页面 dataLayer 已就绪）。

## 十二、下一步操作

1. 人工完成 GTM 容器内 Trigger / Tag 配置并发布容器（上文清单）；
2. `astro dev` 后打开浏览器 DevTools → Console 输入 `dataLayer` 复验各事件（扫描 / 点 CTA / 填表单）；
3. 用 GA4 DebugView 核对事件与参数（score、source_url、service、cta_name、cta_target、error_type）；
4. 与第三阶段 P0 漏斗修复联动，观察「报告 → 人工诊断 → 预约」漏斗转化率；
5. 本改动为代码层，未提交 git —— 确认后由用户按常规流程提交（建议 commit 信息：`feat(analytics): add GA4 funnel tracking events via GTM dataLayer`）。
