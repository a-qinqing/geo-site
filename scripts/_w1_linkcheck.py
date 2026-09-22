# -*- coding: utf-8 -*-
"""Pre-flight check for a blog draft: link validity, residue, stats."""
import io, os, re, glob, sys

DRAFT = sys.argv[1] if len(sys.argv) > 1 else "blog-drafts/geo-vs-seo-difference.md"
t = io.open(DRAFT, encoding="utf-8").read()

# --- build the set of routes the site can actually serve ---
routes = set()
for f in glob.glob("src/pages/**/*.astro", recursive=True):
    r = f.replace(os.sep, "/").replace("src/pages", "").replace(".astro", "")
    if r.endswith("/index"):
        r = r[: -len("/index")]
    routes.add(r if r else "/")
for f in glob.glob("src/content/blog/*.md") + glob.glob("src/content/blog/*.mdx"):
    routes.add("/blog/" + os.path.basename(f).rsplit(".", 1)[0])

links = sorted(set(re.findall(r"\]\((/[^)\s]*)\)", t)))

out = io.open("docs/_linkcheck.txt", "w", encoding="utf-8")
out.write("== INTERNAL LINKS IN DRAFT ==\n")
broken = []
for l in links:
    ok = l in routes
    if not ok:
        broken.append(l)
    out.write("%s  %s\n" % ("OK    " if ok else "BROKEN", l))

out.write("\n== PLANNED LINKS PRESENT? ==\n")
for p in ["/blog/seo-to-geo-2026", "/services/geo-optimization", "/services/seo-audit", "/tool"]:
    out.write("%-28s %s\n" % (p, "yes" if p in links else "NO"))

out.write("\n== RESIDUE SCAN (must all be clean) ==\n")
for bad in ["草稿", "待编辑确认", "选点说明", "日报改写", "我可以把", "知识库", "TODO", "XXX", "待补", "placeholder", "待编辑"]:
    hits = [i + 1 for i, ln in enumerate(t.split("\n")) if bad in ln]
    out.write("%-14s %s\n" % (bad, hits if hits else "clean"))

# --- stats on body only ---
parts = t.split("---", 2)
body = parts[2] if len(parts) > 2 else t
out.write("\n== STATS ==\n")
out.write("hanzi in body: %d\n" % len(re.findall(r"[一-鿿]", body)))
out.write("frontmatter fields: %s\n" % re.findall(r"^(\w+):", parts[1], re.M))
# odd number of ** on a line => bold opened/closed across a line break
dangling = [i + 1 for i, ln in enumerate(body.split("\n"), 1) if ln.count("**") % 2]
out.write("lines with unbalanced bold: %s\n" % (dangling if dangling else "none"))
out.write("H2 count: %d\n" % len(re.findall(r"^## ", body, re.M)))

# --- DAY CHECKS（30 天内容系统：段落长度 / 数据断言 / frontmatter / 结构 / slug）---
def _visible(s):
    s = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", s)  # 行内链接只计锚文本
    return re.sub(r"[*`>#-]", "", s).strip()

paras = []
for i, ln in enumerate(body.split("\n"), 1):
    s = ln.strip()
    if not s or s.startswith(("#", "|", "- ", ">", "*本文")) or re.match(r"^\d+\.", s):
        continue
    paras.append((i, len(_visible(s))))
over = [p[0] for p in paras if p[1] > 150]

fm = parts[1] if len(parts) > 2 else ""
def _f(k):
    m = re.search(k + r':\s*"([^"]+)"', fm)
    return m.group(1) if m else ""
title, desc, cat = _f("title"), _f("description"), _f("category")
tags_m = re.search(r"tags:\s*\[(.*?)\]", fm, re.S)
tags = tags_m.group(1) if tags_m else ""
CATS = ["行业动态", "行业趋势", "实战指南", "GEO 基础", "GEO 实战", "案例研究", "策略", "技术"]
base = os.path.basename(DRAFT).rsplit(".", 1)[0]
slash_links = [l for l in links if l.endswith("/")]   # 尾斜杠写法（站点约定：不带尾斜杠）
pct = re.findall(r"\d+(?:\.\d+)?%", body)

out.write("\n== DAY CHECKS ==\n")
out.write("prose paragraphs: %d | over 150 chars (lines): %s\n" % (len(paras), over if over else "none"))
out.write("percent assertions (需有来源或删除): %s\n" % (pct if pct else "none"))
out.write("title %d 字(<=40) | desc %d 字(80-160) | tags %d 项(==4) | category 合法: %s | pubDate: %s\n" % (
    len(title), len(desc), len([x for x in tags.split(",") if x.strip()]), cat in CATS,
    bool(re.search(r"pubDate:", fm))))
cta_parts = re.split(r"^## 📩", body, flags=re.M)
cta_block = cta_parts[1].split("\n---", 1)[0] if len(cta_parts) > 1 else ""   # 只取 CTA 块（到下一个分隔线为止，不含脚注）
cta_links = re.findall(r"\]\((/[^)]*)\)", cta_block)
out.write("structure: TLDR=%s | 编号章节=%d | 行动清单=%s | 结语=%s | CTA 块=%s | 来源脚注=%s\n" % (
    "## TL;DR" in body, len(re.findall(r"^## [一二三四五六七八九十]+、", body, re.M)),
    "- [ ]" in body, "## 结语" in body, "## 📩" in body,
    bool(re.search(r"^\*本文", body, re.M))))
# CTA 目标按 Search Intent 选择，不强制 /contact（口径见 .claude/skills/geo-day-content/SKILL.md）
out.write("CTA 目标链接（须与 Search Intent 匹配）: %s\n" % (cta_links if cta_links else "none"))
out.write("slug: %s | 含日期: %s | 内链带尾斜杠(站点约定为无): %s\n" % (
    base, bool(re.search(r"\d{4}-\d{2}-\d{2}", base)), slash_links if slash_links else "none"))

out.write("\nBROKEN LINKS: %s\n" % (broken if broken else "none"))
out.close()
print(io.open("docs/_linkcheck.txt", encoding="utf-8").read())
