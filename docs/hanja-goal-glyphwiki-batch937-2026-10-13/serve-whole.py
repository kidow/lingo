#!/usr/bin/env python3
"""Static original-source comparison only. Dictionary graphics remain in RAM."""
import sys
sys.dont_write_bytecode = True
import hashlib, html, importlib.util, json, os
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
SELF_SHA = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
INPUT_PINS = {"candidate-compile-analysis.json":"e3d43810aad05f08d312cb428f0be16a3e28cd931b49d03ba35f114e8b4f131f","engine-proof.json":"0330b739545613235deec2eda50adb747b33ea952d6f24c48fe297be2295cf8b","engine-whole-u84eb-ue0100.json":"dfb4f007cd74373bae70ca8fee7eedb9ccb3f197c4bd6d42bb1c133c0f30bd54","engine-whole-u84eb-ue0101.json":"869d552d8828178e5107a2a42f479f4fcf2bf4f838fab01ee09585809f0a4fd9","engine-whole-u84eb.json":"0330b739545613235deec2eda50adb747b33ea952d6f24c48fe297be2295cf8b","metadata.json":"bc32783173c8aa8a503902070c2457cb84cbc726bf11d54d1dc7ca2495f3a3a2","source-analysis.json":"9a39971a875fd423c65c721b5cd2969c8a9e3eeabdc173fe9c377a0c7f25fe7a","source-join-analysis.json":"32447a756a6541b545519e5222f8ab5cc4869758a03e684a9b014336e571cbfa","source-preservation-audit.json":"4f635988fd57b722842fbcd2297fc2e4dd008414077458362bbae12e36e9f936","sources.json":"79933ba482d03271cb83130b272fbf5f4bed53fad4194c5676a3cc9aa3a36f36","verify-source.mjs":"a1d745db5771bfaf913fa06ce32446da1a4dfa22bcf2b627414a0101507f183a","native-server-preflight-hold.json":"07b6379b030435db0ccdddb4504bf4ee3514c443ad97fa3ae8eafe460ce0498b"}
FACTS = {"u84eb":{"raw":16,"draw":17,"polygons":32,"exactJoins":[[5,6]],"minimumOriginalPaths":15},"u84eb-ue0100":{"raw":18,"draw":19,"polygons":35,"exactJoins":[[6,7]],"minimumOriginalPaths":17},"u84eb-ue0101":{"raw":15,"draw":16,"polygons":30,"exactJoins":[[4,5]],"minimumOriginalPaths":14}}
GLYPH = "蓫"
def guards():
    assert hashlib.sha256(Path(__file__).read_bytes()).hexdigest() == SELF_SHA
    for filename, expected in INPUT_PINS.items():
        assert hashlib.sha256((HERE / filename).read_bytes()).hexdigest() == expected, "Fixed source input changed"
    assert not (HERE / "progressive.mjs").exists(), "This viewer has no animation compiler"
guards()
metadata = json.loads((HERE / "metadata.json").read_bytes())
assert metadata["candidate"]["glyph"] == GLYPH and metadata["dictionaryStrokes"] == 15
spec = importlib.util.spec_from_file_location("b937_static_original_ram", ROOT / "docs/hanja-special2-alternatives-2026-09-21/serve.py")
review = importlib.util.module_from_spec(spec)
spec.loader.exec_module(review)
review.base.renderer.ENTRIES[GLYPH] = {"strokes": 15, "dictionary": metadata["dictionary"]}

def endpoint(call):
    at = 2 if call["kind"] == "cdDrawLine" else 4 if call["kind"] == "cdDrawCurve" else 6
    return call["args"][at:at + 2]

def original_source(name):
    guards()
    assert name in FACTS, "Unsupported original whole"
    proof = json.loads((HERE / ("engine-whole-" + name + ".json")).read_bytes())
    assert len(proof["trace"]) == FACTS[name]["raw"]
    assert sum(len(row) for row in proof["trace"]) == FACTS[name]["draw"]
    assert all([poly for call in row for poly in call["polygons"]] == proof["groups"][index]["polygons"] for index, row in enumerate(proof["trace"]))
    joins = [[left, right] for left, row in enumerate(proof["trace"]) for right, other in enumerate(proof["trace"]) if left != right and endpoint(row[-1]) == other[0]["args"][:2]]
    assert joins == FACTS[name]["exactJoins"]
    polygons = [poly for group in proof["groups"] for poly in group["polygons"]]
    assert len(polygons) == FACTS[name]["polygons"] and all(vertex["off"] == 0 for poly in polygons for vertex in poly)
    return proof

def original_svg(proof, raw=None):
    pieces = []
    for index, group in enumerate(proof["groups"]):
        if raw is not None and index > raw - 1:
            break
        fill = "#245ad5" if raw is not None and index == raw - 1 else "#222"
        for polygon in group["polygons"]:
            points = " ".join(str(vertex["x"]) + "," + str(vertex["y"]) for vertex in polygon)
            pieces.append('<polygon fill="' + fill + '" points="' + points + '"/>')
    return '<svg viewBox="0 0 200 200">' + "".join(pieces) + "</svg>"

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass
    def do_GET(self):
        try:
            parsed = urlparse(self.path)
            query = parse_qs(parsed.query)
            route = parsed.path
            name = query.get("id", ["u84eb"])[0]
            if route == "/progressive":
                self.reply(409, json.dumps({"blocked": True, "compilerAbsent": True, "compiledPens": 0, "compiledMasks": 0, "nativeApproval": False}).encode(), "application/json")
                return
            if route not in ("/", "/whole", "/pairs", "/checks") or name not in FACTS:
                self.reply(404, b"Unsupported fixed source route", "text/plain")
                return
            proof = original_source(name)
            if route == "/checks" or query.get("view") == ["checks"]:
                body = json.dumps({"glyph": GLYPH, "root": name, **FACTS[name], "domesticCount": 15, "sourceInputPinsVerified": len(INPUT_PINS), "blocked": True, "compilerAbsent": True, "nativeApproval": False, "privateMediaSaved": False}).encode()
                self.reply(200, body, "application/json")
                return
            nav = " ".join('<a href="/whole?id=' + root + '">' + root + "</a>" for root in FACTS)
            title = "Original whole comparison; no shape or pen-boundary approval"
            if route == "/pairs":
                domestic = int(query.get("domestic", ["1"])[0])
                raw = int(query.get("raw", ["1"])[0])
                assert 1 <= domestic <= 15 and 1 <= raw <= len(proof["groups"])
                left = review.base.renderer.dictionary_svg(GLYPH, domestic, True, "b937_" + name + "_" + str(domestic) + "_" + str(raw))
                right = original_svg(proof, raw)
                title = "Domestic pen " + str(domestic) + " / original raw " + str(raw) + "; correspondence unapproved"
            else:
                left = review.base.full_dictionary(GLYPH)
                right = original_svg(proof)
            body = ('<!doctype html><meta charset="utf-8"><title>蓫 original source hold</title><style>body{font:16px system-ui;margin:20px;width:960px}a{margin-right:12px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>蓫 · ' + html.escape(name) + '</h1>' + nav + '<p>' + html.escape(title) + '</p><p>Original minimum paths ' + str(FACTS[name]["minimumOriginalPaths"]) + ' / domestic 15. Grass form and road gaps remain unresolved. No animation, connector, count repair, or native approval.</p><div class="pair">' + left + right + '</div><p>Dictionary bytes/title/clip mapping are checked against the existing pin in RAM only.</p>').encode()
            self.reply(200, body, "text/html; charset=utf-8")
        except Exception:
            self.reply(409, b"Fixed source contract or query rejected", "text/plain")
    def reply(self, status, body, mime):
        self.send_response(status)
        self.send_header("Content-Type", mime)
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    print(json.dumps({"batch": 937, "glyph": GLYPH, "port": server.server_address[1], "pid": os.getpid(), "wholeVariants": len(FACTS), "compiledPens": 0, "compiledMasks": 0, "blocked": True, "nativeApproval": False}), flush=True)
    server.serve_forever()
