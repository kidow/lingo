#!/usr/bin/env python3
"""RAM-only source boundary inspection; no proprietary assets written."""
import sys
sys.dont_write_bytecode = True
import html
import importlib.util
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
spec = importlib.util.spec_from_file_location('count_review_renderer', HERE.parent / 'hanja-g2-batch10-2026-09-16/serve.py')
renderer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)
DATA = json.loads((HERE / 'source-checks.json').read_text())
renderer.ENTRIES = {e['glyph']: {**e, 'strokes': e['animated']} for e in DATA['entries']}

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass
    def do_GET(self):
        try:
            q = parse_qs(urlparse(self.path).query)
            index = int(q.get('i', ['0'])[0])
            entry = DATA['entries'][index]
            glyph = entry['glyph']
            source = renderer.source(glyph)
            if urlparse(self.path).path == '/metadata':
                body = json.dumps({'glyph': glyph, 'transform': source['transform'],
                    'strokes': [{k:v for k,v in s.items() if k not in ('outline','animated')} for s in source['strokes']]}, ensure_ascii=False).encode()
                mime = 'application/json'
            else:
                n = entry['animated']
                start = int(q.get('start', ['1'])[0])
                end = min(n, int(q.get('end', [str(n)])[0]))
                asset = ROOT / 'public/hanja' / ('u' + format(ord(glyph), 'x') + '.svg')
                static = asset.read_text()
                content = f'<h1>{index+1}/9 · {glyph} · catalog {entry["catalogStrokes"]} / dictionary {n}</h1>'
                content += '<p>Source boundaries in delay order. Colored current stroke: blue → green → orange → red. Previous strokes gray. Count investigation only.</p><div class="grid">'
                for k in range(start, end+1):
                    content += f'<section><b>{k}</b>' + renderer.dictionary_svg(glyph, k, True, f'count-{index}-{k}') + '</section>'
                content += '</div><div class="final"><section><b>Dictionary final</b>' + renderer.dictionary_svg(glyph, n, False, 'final') + '</section><section><b>Current app SVG</b>' + static + '</section></div>'
                body = ('<!doctype html><meta charset="utf-8"><style>body{zoom:2;width:1100px;margin:10px;font:14px system-ui;background:white;color:#111}h1{font-size:22px;margin:4px 0}.grid{display:grid;grid-template-columns:repeat(6,180px)}section{border:1px solid #ddd;padding:4px}.grid svg{display:block;width:170px;height:170px}.final{display:flex;justify-content:center}.final svg{display:block;width:230px;height:230px}</style>' + content).encode()
                mime = 'text/html; charset=utf-8'
            self.send_response(200)
        except Exception as error:
            body, mime = str(error).encode(), 'text/plain; charset=utf-8'
            self.send_response(500)
        self.send_header('Content-Type', mime)
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == '__main__':
    print('Count review http://127.0.0.1:51746', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 51746), Handler).serve_forever()
