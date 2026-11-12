#!/usr/bin/env python3
"""线上复测：定价页 + JSON-LD Offer 校验（geova.cn）

用法：
    python scripts/verify_pricing_live.py

注意：
- Cloudflare 对非浏览器 UA 返回 403，必须带浏览器 UA。
- 站点 output=server，页面由 Worker 渲染，禁用缓存（Cache-Control: no-cache）避免读到旧版本。
"""

import json
import re
import sys
import urllib.error
import urllib.request

BASE = "https://www.geova.cn"
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)

# path -> (页面上必须出现的可见文案, 期望的 Offer 价格或 None)
CASES = {
    "/services/": (
        ["¥6,800", "¥28,000", "¥15,000", "按项目报价"],
        None,
    ),
    "/services/geo-optimization/": (
        ["¥6,800", "¥28,000", "¥98,000", "价格与周期", "诊断费可全额抵扣"],
        28000.0,
    ),
    "/services/geo-audit/": (
        ["¥6,800", "5 个工作日", "全额抵扣"],
        6800.0,
    ),
    "/services/training/": (
        ["¥15,000", "内训价格", "差旅与场地"],
        15000.0,
    ),
    "/services/seo-audit/": (
        [],
        "absent",
    ),
}


def fetch(url: str):
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept": "text/html,application/xhtml+xml",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        return resp.status, resp.read().decode("utf-8", "ignore"), resp.geturl()


def ld_blocks(html: str):
    raw = re.findall(
        r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S
    )
    out, bad = [], 0
    for chunk in raw:
        try:
            data = json.loads(chunk)
        except json.JSONDecodeError:
            bad += 1
            continue
        for item in data if isinstance(data, list) else [data]:
            if isinstance(item, dict):
                out.append(item)
    return out, bad


def main() -> int:
    failures = []
    for path, (needles, expect_price) in CASES.items():
        url = BASE + path
        try:
            status, html, final = fetch(url)
        except urllib.error.HTTPError as exc:
            print(f"[FAIL] {path}  HTTP {exc.code}")
            failures.append(f"{path} HTTP {exc.code}")
            continue
        except Exception as exc:  # noqa: BLE001
            print(f"[FAIL] {path}  {exc}")
            failures.append(f"{path} {exc}")
            continue

        title_m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S)
        title = title_m.group(1).strip() if title_m else "(none)"
        canon = re.search(
            r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', html
        )
        canon = canon.group(1) if canon else "(none)"

        blocks, bad_json = ld_blocks(html)

        print(f"\n=== {path}  HTTP {status}  {len(html)}B")
        print(f"    title  : {title}")
        print(f"    canon  : {canon}")
        if canon != url:
            failures.append(f"{path} canonical 不一致 -> {canon}")

        for needle in needles:
            ok = needle in html
            print(f"    {'OK  ' if ok else 'MISS'} {needle}")
            if not ok:
                failures.append(f"{path} 缺少可见文案 {needle}")

        if bad_json:
            failures.append(f"{path} 有 {bad_json} 个无法解析的 JSON-LD")

        types = [b.get("@type") for b in blocks]
        print(f"    schema : {types}")
        service = next((b for b in blocks if b.get("@type") == "Service"), None)

        if expect_price is None:
            continue

        if expect_price == "absent":
            if service and service.get("offers"):
                print("    FAIL 页面未公开价格，却输出了 offers")
                failures.append(f"{path} 不应有 offers")
            else:
                print("    OK   Service 无 offers（页面未公开价格，符合规范）")
            continue

        if not service:
            print("    FAIL 未找到 Service schema")
            failures.append(f"{path} 缺 Service schema")
            continue

        offer = service.get("offers") or {}
        price = offer.get("price")
        cur = offer.get("priceCurrency")
        spec = offer.get("priceSpecification") or {}
        print(f"    offer  : price={price} cur={cur} unit={spec.get('unitText')}")
        if price is None or float(price) != expect_price:
            failures.append(f"{path} Offer.price={price} 期望 {expect_price}")
        if cur != "CNY":
            failures.append(f"{path} Offer.priceCurrency={cur}")

    print("\n" + "=" * 52)
    if failures:
        print(f"❌ {len(failures)} 项未通过：")
        for item in failures:
            print("   -", item)
        return 1
    print("✅ 全部通过")
    return 0


if __name__ == "__main__":
    sys.exit(main())
