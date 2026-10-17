#!/usr/bin/env python3
"""Whole-form review preparation. Private domestic SVG stays in server RAM only."""
import sys
sys.dont_write_bytecode = True
import argparse
import hashlib
import html
import importlib.util
import json
import math
import os
import threading
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlencode, urlparse

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
CONFIG_SHA256 = "986d56dcf4955e6475b46bd42a9359d44c7f3173a48073f360d5aa39e7d253bf"
_CONFIG_BYTES = (HERE / "config.json").read_bytes()
assert hashlib.sha256(_CONFIG_BYTES).hexdigest() == CONFIG_SHA256
CONFIG = json.loads(_CONFIG_BYTES)
_RENDERER = None
_RENDERER_LOCK = threading.Lock()

def sha(value):
    return hashlib.sha256(value).hexdigest()

def pinned_json(path):
    path = path.resolve()
    rel = os.path.relpath(path, HERE)
    assert rel in CONFIG["immutableInputBytePins"], "Unpinned source path"
    raw = path.read_bytes()
    assert sha(raw) == CONFIG["immutableInputBytePins"][rel], "Pinned source changed"
    return json.loads(raw)

def closure(records, name, active=None, seen=None):
    active = set() if active is None else active
    seen = set() if seen is None else seen
    assert name not in active, "Source dependency cycle"
    if name in seen:
        return seen
    assert name in records, "Incomplete whole closure"
    seen.add(name)
    data = records[name]["data"]
    if data.startswith("[[") and data.endswith("]]"):
        dependencies = [data[2:-2]]
    else:
        dependencies = [fields[7] for fields in (row.split(":") for row in data.split("$")) if fields[0] == "99"]
    for dependency in dependencies:
        closure(records, dependency, active | {name}, seen)
    return seen

def public_svg(proof):
    # Original polygon vertices only. No engine, compiler, stroke partition or new path.
    polygons = [polygon for group in proof["groups"] for polygon in group["polygons"]]
    chunks = []
    for polygon in polygons:
        assert len(polygon) >= 3
        assert all(vertex["off"] == 0 and math.isfinite(vertex["x"]) and math.isfinite(vertex["y"]) for vertex in polygon)
        points = " ".join(str(vertex["x"]) + "," + str(vertex["y"]) for vertex in polygon)
        chunks.append('<polygon points="' + points + '"/>')
    return '<svg viewBox="0 0 200 200" aria-label="public source whole"><g fill="#222">' + "".join(chunks) + "</g></svg>"

def source_guard():
    assert sha((HERE / "config.json").read_bytes()) == CONFIG_SHA256
    for name, expected in CONFIG["immutableInputBytePins"].items():
        assert sha((HERE / name).read_bytes()) == expected, "Immutable input changed: " + name
    family_path = (HERE / CONFIG["familyManifest"]).resolve()
    base_path = (HERE / CONFIG["baseManifest"]).resolve()
    family = pinned_json(family_path)
    base = pinned_json(base_path)
    assert family["engineRevision"] == base["engineRevision"] == CONFIG["engineRevision"]
    assert family["engineHashes"] == base["engineHashes"] == CONFIG["engineHashes"]
    assert family["sourceCheckRunsPerNewWhole"] == 1
    assert family["nativeReviewCount"] == base["nativeReviewCount"] == 0
    assert family["runtimeApplied"] is False and base["runtimeApplied"] is False
    assert family["canonicalHoldCreated"] is False and base["canonicalHoldCreated"] is False
    entries = {}
    for item in family["wholeEntries"]:
        entries[item["root"]] = {
            "root": item["root"], "family": item["family"], "fixedName": item["fixedRootVersion"],
            "proofFile": (family_path.parent / item["proofFile"]).resolve(),
            "proofSHA256": item["proofFileSHA256"],
            "sourceFile": (family_path.parent / item["sourceFile"]).resolve(),
            "range": item["sourceCountOnlyTargetRange"],
            "diagnostic": item["diagnostic"],
            "sourceOrigin": "official family extension",
        }
    for item in base["glyphs"]:
        if item["root"] not in ("u785c", "u795b"):
            continue
        source_path = (base_path.parent / item["sourceFile"]).resolve()
        source = pinned_json(source_path)
        definition = next(p for p in source["providerDefinitions"] if p["lookupName"] == item["root"])
        diagnostic = item["diagnostic"]
        target = item["catalogStrokes"]
        entries[item["root"]] = {
            "root": item["root"], "family": item["root"], "fixedName": definition["fixedName"],
            "proofFile": (base_path.parent / item["proofFile"]).resolve(),
            "proofSHA256": item["proofFileSHA256"], "sourceFile": source_path,
            "range": {"minimum": diagnostic["conservativeRawMinimum"], "maximum": diagnostic["drawingGroups"],
                      "target": target, "containsTarget": diagnostic["conservativeRawMinimum"] <= target <= diagnostic["drawingGroups"]},
            "diagnostic": diagnostic, "sourceOrigin": "immutable original base capsule",
        }
    assert len(entries) == CONFIG["coverage"]["completeWholeClosures"] == 41
    assert sum(entry["range"]["containsTarget"] for entry in entries.values()) == CONFIG["coverage"]["countOnlyPossibilities"] == 14
    proofs = {}
    for root, entry in entries.items():
        proof = pinned_json(entry["proofFile"])
        assert sha(entry["proofFile"].read_bytes()) == entry["proofSHA256"]
        assert list(proof) == ["engineRevision", "engineHashes", "groups", "trace", "defaults"]
        assert proof["engineRevision"] == CONFIG["engineRevision"] and proof["engineHashes"] == CONFIG["engineHashes"]
        assert len(proof["groups"]) == len(proof["trace"]) == entry["diagnostic"]["rawGroups"]
        assert sum(len(group["polygons"]) for group in proof["groups"]) == entry["diagnostic"]["polygons"]
        for group, calls in zip(proof["groups"], proof["trace"]):
            assert group["polygons"] == [polygon for call in calls for polygon in call["polygons"]]
        source = pinned_json(entry["sourceFile"])
        assert root in source.get("wholeNames", [source.get("root")])
        names = closure(source["records"], root)
        for name in names:
            provider = next(value for value in source["providerDefinitions"] if value["lookupName"] == name)
            record = source["records"][name]
            assert provider["record"] == record
            assert sha(provider["provider"]["responseText"].encode()) == provider["provider"]["responseSHA256"]
            if name == root:
                assert provider["fixedName"] == entry["fixedName"]
        public_svg(proof)
        proofs[root] = proof
    for glyph, selected in CONFIG["glyphs"].items():
        inventory = pinned_json(HERE / selected["dictionaryInventory"])
        row = next(row for row in inventory["rows"] if row[0] == glyph)
        values = dict(zip(inventory["fields"], row))
        assert row == selected["inventoryRow"]
        assert values["svgTitle"] == selected["dictionary"]["glyph"] == glyph
        assert values["catalogStrokes"] == values["displayedStrokes"] == values["outlineCount"] == values["animatedCount"] == selected["dictionaryStrokes"]
        assert values["timingSequenceValid"] is True and values["clipCoverageValid"] is True
        assert values["svgRootId"] == selected["dictionaryRootId"]
        assert values["svgUrl"] == selected["dictionary"]["url"]
        assert values["svgBytes"] == selected["dictionary"]["bytes"]
        assert values["svgSha256"] == selected["dictionary"]["sha256"]
        metadata = pinned_json(HERE / selected["existingMetadata"])
        assert metadata["glyph"] == glyph
        assert metadata["dictionary"]["sha256"] == selected["dictionary"]["sha256"]
        assert metadata["dictionary"]["bytes"] == selected["dictionary"]["bytes"]
    assert sum(len(item["requestedNames"]) for item in family["families"]) == CONFIG["coverage"]["familyRootNames"] == 46
    return {"family": family, "entries": entries, "proofs": proofs}

def domestic_whole(glyph):
    # Existing renderer checks HTTP bytes/SHA, glyph title, transform, clip mapping and timeline.
    # Its CACHE contains only RAM objects. Do not persist raw SVG or its rendering.
    global _RENDERER
    with _RENDERER_LOCK:
        if _RENDERER is None:
            spec = importlib.util.spec_from_file_location("outside_two_ram_domestic_renderer", (HERE / CONFIG["renderer"]["file"]).resolve())
            renderer = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(renderer)
            renderer.ENTRIES = {
                name: {"strokes": selected["dictionaryStrokes"], "dictionary": selected["dictionary"]}
                for name, selected in CONFIG["glyphs"].items()
            }
            _RENDERER = renderer
    source = _RENDERER.source(glyph)
    paths = "".join('<path d="' + html.escape(stroke["outline"].get("d")) + '"/>' for stroke in source["strokes"])
    return '<svg viewBox="0 0 1024 1024" aria-label="domestic dictionary whole"><g transform="' + source["transform"] + '" fill="#222">' + paths + "</g></svg>"

def link(glyph, scope="count", root=None):
    values = {"glyph": glyph, "scope": scope}
    if root is not None:
        values["root"] = root
    return "/whole?" + urlencode(values)

def page(state, glyph, scope, root=None):
    selected = CONFIG["glyphs"][glyph]
    family_id = selected["family"]
    family = next(item for item in state["family"]["families"] if item["family"] == family_id)
    available = [entry for entry in state["entries"].values() if entry["family"] == family_id]
    assert scope in ("count", "all")
    shown = [entry for entry in available if scope == "all" or entry["range"]["containsTarget"]]
    if root is not None:
        assert root in state["entries"] and state["entries"][root]["family"] == family_id
        shown = [state["entries"][root]]
    shown.sort(key=lambda entry: (not entry["range"]["containsTarget"], entry["root"]))
    domestic = domestic_whole(glyph)
    style = """<style>body{font:16px system-ui;margin:12px;background:#fff;color:#111;width:1120px}
a{margin-right:16px}table{border-collapse:collapse;width:1100px;font-size:12px}td,th{border:1px solid #ccc;padding:5px;text-align:left}
.sha{font:12px monospace;display:block;overflow-wrap:anywhere}.pair{display:flex;gap:20px}.side{width:520px}.side svg{width:500px;height:500px}
.whole{border-top:2px solid #777;padding:16px 0}h2{font-size:18px}.status{font-size:14px}.notice{border:1px solid #aaa;padding:10px}</style>"""
    parts = ['<!doctype html><meta charset="utf-8"><title>' + html.escape(glyph) + ' whole source comparison</title>', style,
             '<h1>' + html.escape(glyph) + ' · 전체 자형 비교 준비</h1>',
             '<nav>' + "".join('<a href="' + html.escape(link(name)) + '">' + name + '</a>' for name in CONFIG["glyphs"]) + '</nav>',
             '<p class="notice">왼쪽 국내 사전 / 오른쪽 공개 원본. 모든 native 적합성은 미판정입니다. 원본 raw나 획 그룹을 합치거나 결정하지 않습니다.</p>',
             '<p>공식 family 이름 46 · 완전 whole 41 · 획수 범위 가능성 14. 선택 글자: 목록 ' + str(len(family["requestedNames"])) +
             ' · 완전 whole ' + str(len(available)) + ' · 숫자상 가능성 ' + str(sum(entry["range"]["containsTarget"] for entry in available)) + '.</p>',
             '<p>국내 identity: ' + html.escape(glyph) + ' · ' + str(selected["dictionaryStrokes"]) + '획 · ' + str(selected["dictionary"]["bytes"]) + 'bytes</p>',
             '<code class="sha">' + selected["dictionary"]["sha256"] + '</code>',
             '<p>국내 URL은 inventory의 정확한 표기를 사용합니다. SVG는 서버 RAM에만 유지합니다.</p>',
             '<a href="' + html.escape(link(glyph, "count")) + '">획수 범위 후보만</a><a href="' + html.escape(link(glyph, "all")) + '">모든 확보 whole</a>',
             '<h2>공식 family coverage</h2><table><tr><th>Root</th><th>정확한 고정 버전</th><th>원 proof SHA256</th><th>획수 범위 / 상태</th></tr>']
    for name in family["requestedNames"]:
        entry = state["entries"].get(name)
        if entry is None:
            parts.append('<tr><td>' + html.escape(name) + '</td><td>고정 정의 미확보</td><td>보존한 응답 본문 hash 없음</td><td>요청 응답 정의 검증 실패; 영구 부재 판정 아님</td></tr>')
            continue
        r = entry["range"]
        status = "숫자상 가능성 · native 미판정" if r["containsTarget"] else "목표 범위 밖 · native 미판정"
        parts.append('<tr><td><a href="' + html.escape(link(glyph, "all", name)) + '">' + html.escape(name) + '</a></td><td>' +
                     html.escape(entry["fixedName"]) + '</td><td><code class="sha">' + entry["proofSHA256"] + '</code></td><td>' +
                     str(r["minimum"]) + '–' + str(r["maximum"]) + ' / ' + str(r["target"]) + ' · ' + status + '</td></tr>')
    parts.append("</table>")
    for entry in shown:
        parts.extend(['<section class="whole" data-root="' + html.escape(entry["root"]) + '" data-proof-sha256="' + entry["proofSHA256"] + '">',
                      '<h2>' + html.escape(entry["fixedName"]) + '</h2>',
                      '<code class="sha">' + entry["proofSHA256"] + '</code>',
                      '<p class="status">정확한 root identity: ' + html.escape(entry["root"]) + ' · full5 proof · raw ' +
                      str(entry["diagnostic"]["rawGroups"]) + ' · polygons ' + str(entry["diagnostic"]["polygons"]) + ' · native 미판정</p>',
                      '<div class="pair"><div class="side domestic"><b>왼쪽 · 국내 사전</b>' + domestic + '</div><div class="side public"><b>오른쪽 · 공개 원본</b>' +
                      public_svg(state["proofs"][entry["root"]]) + '</div></div></section>'])
    parts.append('<p>©2020 e-hanja · 국내 원본/캡처 디스크 저장 없음. GlyphWiki Project and contributors · LicenseRef-GlyphWiki. API/라이선스 provenance는 고정 source capsule에 보존됩니다.</p>')
    return "".join(parts).encode()

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path not in ("/", "/whole"):
            self.send_error(404)
            return
        try:
            query = parse_qs(parsed.query)
            glyph = query.get("glyph", ["硜"])[0]
            scope = query.get("scope", ["count"])[0]
            root = query.get("root", [None])[0]
            assert glyph in CONFIG["glyphs"], "Unsupported glyph"
            state = source_guard()
            body = page(state, glyph, scope, root)
        except Exception:
            self.send_error(500, "Pinned source or RAM-only domestic verification failed")
            return
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=0)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    state = source_guard()
    if args.check:
        print(json.dumps({"ok": True, "immutablePins": len(CONFIG["immutableInputBytePins"]), "familyNames": 46,
                          "fullWholeIdentities": len(state["entries"]), "countOnlyPossibilities": 14,
                          "dictionaryMetadataPresent": list(CONFIG["glyphs"]), "domesticRequests": 0,
                          "rendererImported": False, "engineExecutions": 0, "serversStarted": 0,
                          "nativeApproved": False, "runtimeApplied": False, "canonicalHoldCreated": False}, ensure_ascii=False))
        return
    assert 0 <= args.port <= 65535
    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    print(json.dumps({"pid": os.getpid(), "port": server.server_address[1], "route": "/whole",
                      "glyphs": list(CONFIG["glyphs"]), "nativeApproved": False, "privateMediaRAMOnly": True}, ensure_ascii=False), flush=True)
    try:
        server.serve_forever()
    finally:
        server.server_close()

if __name__ == "__main__":
    main()
