#!/usr/bin/env python3
"""鄰 textbook comparison. Publisher video and decoded frames stay in RAM."""
import sys
sys.dont_write_bytecode = True
import base64
import hashlib
import html
import importlib.util
import io
import json
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse
from urllib.request import urlopen
from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result
BASE = module("video_base", ROOT / "docs/hanja-g3-batch1-2026-09-14/serve.py")
RENDER = module("path_renderer", ROOT / "docs/hanja-g2-batch10-2026-09-16/serve.py")
SOURCE = json.loads((HERE / "sources.json").read_text())
NORMALIZED = json.loads((HERE / "normalized.json").read_text())
OBSERVATIONS = json.loads((HERE / "observations.json").read_text())
with urlopen(SOURCE["sourceVideo"]["url"], timeout=30) as response:
    original = response.read()
if len(original) != SOURCE["sourceVideo"]["bytes"] or hashlib.sha256(original).hexdigest() != SOURCE["sourceVideo"]["sha256"]:
    raise ValueError("Publisher video changed")
DATA = BASE.MEMORY.faststart(original)
FRAMES, STRIDE = BASE.frames({"data": DATA}, 8, 170)
VISITS = []
def frame(time):
    index = round(time * 8)
    if abs(index / 8 - time) > 1e-9 or (index + 1) * STRIDE > len(FRAMES):
        raise ValueError("Unobserved frame time")
    raw = FRAMES[index * STRIDE:(index + 1) * STRIDE]
    buf = io.BytesIO()
    Image.frombytes("RGB", (170, 170), raw).save(buf, format="PNG")
    return buf.getvalue()
def picture(time):
    return '<div><img src="data:image/png;base64,' + base64.b64encode(frame(time)).decode() + '"><small>' + str(time) + 's</small></div>'
def candidate(end=None):
    if end is not None:
        return RENDER.candidate_svg(NORMALIZED["paths"], end)
    return '<svg viewBox="0 0 100 100"><g fill="none" stroke="#222" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">' + ''.join('<path d="' + html.escape(p) + '"/>' for p in NORMALIZED["paths"]) + '</g></svg>'
class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        try:
            q = parse_qs(urlparse(self.path).query)
            if urlparse(self.path).path == "/metadata":
                result = {"sourceVideo": SOURCE["sourceVideo"], "decodedFps": 8, "visits": VISITS,
                          "observedFrames": [{"stroke": row["stroke"], "frames": [{"time": t, "sha256": hashlib.sha256(frame(t)).hexdigest()} for t in row["observedTimes"]]} for row in OBSERVATIONS["strokes"]]}
                body = json.dumps(result, ensure_ascii=False).encode()
                mime = "application/json"
            else:
                parts = ['<!doctype html><meta charset="utf-8"><style>body{width:760px;margin:8px;font:14px sans-serif}section{border:1px solid #ddd}img,svg{width:170px;height:170px}small{display:block}.row{display:flex}.forms img,.forms svg{width:360px;height:360px}</style><h2>鄰 · textbook 0480 / normalized KanjiVG</h2>']
                if q.get("view") == ["form"]:
                    parts.append('<div class="row forms">' + picture(21.5) + candidate() + '</div>')
                    VISITS.append({"view": "complete", "time": 21.5})
                else:
                    start = int(q.get("start", ["1"])[0]); count = int(q.get("count", ["5"])[0])
                    rows = OBSERVATIONS["strokes"][start-1:start-1+count]
                    for row in rows:
                        parts.append('<section><b>Stroke ' + str(row["stroke"]) + '</b><div class="row">' + ''.join(picture(t) for t in row["observedTimes"]) + candidate(row["stroke"]) + '</div></section>')
                    VISITS.append({"view": "cumulative", "strokes": [r["stroke"] for r in rows]})
                parts.append('<p>Publisher video/frames stay in RAM; no screenshot or source graphic export. KanjiVG © Ulrich Apel and contributors, CC BY-SA 3.0.</p>')
                body = ''.join(parts).encode(); mime = "text/html; charset=utf-8"
            self.send_response(200); self.send_header("Content-Type", mime); self.send_header("Cache-Control", "no-store"); self.end_headers(); self.wfile.write(body)
        except Exception as error:
            self.send_error(500, str(error))
if __name__ == "__main__":
    print("Ready: 鄰 textbook 0480", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 51838), Handler).serve_forever()
