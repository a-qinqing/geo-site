# -*- coding: utf-8 -*-
"""Publish-checklist audit for blog draft. Output-only; no file writes."""
import re, sys

p = "blog-drafts/ai-citations-product-pages.md"
raw = open(p, encoding="utf-8").read()
lines = raw.splitlines()

# --- frontmatter stats ---
first = lines.index("---", 0)
second = lines.index("---", 1)
meta = {}
for l in lines[first + 1:second]:
    if ":" in l:
        k, v = l.split(":", 1)
        meta[k.strip()] = v.strip().strip('"')
print("title chars:", len(meta.get("title", "")))
print("desc chars:", len(meta.get("description", "")))
print("pubDate:", meta.get("pubDate"), "| category:", meta.get("category"), "| tags:", meta.get("tags"))
print("author:", meta.get("author"))

# --- forbidden residue (body only) ---
body = "\n".join(lines[second + 1:])
found = False
for w in ["待编辑确认", "选点说明", "日报改写", "我可以把", "草稿", "GEO日报", "GEO 日报", "知识库", "占位", "TBD"]:
    n = body.count(w)
    if n:
        found = True
        print("RESIDUE:", repr(w), n)
if not found:
    print("residue: none")

# --- AI self-talk / stray tags ---
for pat in [r"#GEO(?![A-Za-z])", r"如果需要(,|，)?我", r"我可以(帮你|为你)"]:
    for m in re.finditer(pat, body):
        ln = body[:m.start()].count("\n") + second + 2
        print("SELF-TALK/TAG line", ln, "->", lines[ln - 1].strip()[:80])

# --- lines with odd count of ** (unclosed/extra bold marker) ---
odd = 0
for i, l in enumerate(lines, 1):
    if l.count("**") % 2 == 1:
        odd += 1
        print("BOLD-ODD line", i, "->", l[:90])
if not odd:
    print("bold markers: balanced on all lines")

# --- ASCII quotes in body ---
q = 0
for i in range(second + 1, len(lines)):
    for m in re.finditer(r'"|\'', lines[i]):
        q += 1
        if q <= 12:
            print("ASCII-QUOTE line", i + 1, "->", lines[i].strip()[:100])
if not q:
    print("ascii quotes: none in body")
