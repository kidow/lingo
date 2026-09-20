#!/usr/bin/env python3
"""Read-only 35-stroke comparison. Dictionary artwork is retained only in RAM."""
import sys
sys.dont_write_bytecode = True
import importlib.util
import json
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from http.server import ThreadingHTTPServer

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('variant_renderer', HERE.parent / 'hanja-g2-batch10-2026-09-16/serve.py')
renderer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)
entries = []
for folder in ['hanja-g2-si-2026-09-16', 'hanja-g2-yu-zhen-2026-09-16']:
    entries.extend(json.loads((HERE.parent / folder / 'originals.json').read_text())['entries'])
renderer.ENTRIES = {entry['glyph']: entry for entry in entries}

class Handler(renderer.Handler):
    def do_GET(self):
        try:
            query = parse_qs(urlparse(self.path).query)
            glyph = query.get('glyph', ['飼'])[0]
            entry = renderer.ENTRIES[glyph]
            paths = list(entry['paths'])
            corrected = query.get('corrected', ['1'])[0] == '1'
            if corrected and glyph == '祐':
                paths[4], paths[5] = paths[5], paths[4]
            start = int(query.get('start', ['1'])[0])
            end = min(int(query.get('end', ['6'])[0]), len(paths))
            assert 1 <= start <= end
            parts = ['<!doctype html><meta charset="utf-8"><style>body{zoom:2;font:14px system-ui;color:#111;background:white;margin:10px;width:1100px}h1{font-size:22px}.grid{display:grid;grid-template-columns:repeat(2,550px)}section{border:1px solid #ddd}.pair{display:flex}svg{width:270px;height:270px}</style>',
                '<h1>' + glyph + ' · ' + str(len(paths)) + ' strokes · ' + ('review order' if corrected else 'original order') + '</h1>',
                '<p>Left: dictionary / Right: licensed candidate. Blue → green → orange → red, 25% segments. Previous strokes grey.</p><div class="grid">']
            for stroke in range(start, end + 1):
                parts.append('<section><b>' + str(stroke) + '</b><div class="pair">' +
                    renderer.dictionary_svg(glyph, stroke, True, glyph + str(stroke)) +
                    renderer.candidate_svg(paths, stroke) + '</div></section>')
            if query.get('forms', ['0'])[0] == '1':
                static_path = HERE.parents[1] / ('public/hanja/u' + format(ord(glyph), 'x') + '.svg')
                parts.append('<section><b>Current static SVG / reviewed playback form</b><div class="pair">' +
                    static_path.read_text() + renderer.candidate_svg(paths, len(paths), False) + '</div></section>')
            body = (''.join(parts) + '</div>').encode()
            self.send_response(200)
        except Exception as error:
            body = str(error).encode()
            self.send_response(500)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == '__main__':
    print('http://127.0.0.1:51821', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 51821), Handler).serve_forever()
