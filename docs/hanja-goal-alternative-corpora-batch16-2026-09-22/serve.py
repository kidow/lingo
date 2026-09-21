#!/usr/bin/env python3
"""RAM-only domestic comparison; licensed AnimCJK paths are local."""
import sys
sys.dont_write_bytecode = True
import html, json, importlib.util
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('review', HERE.parent / 'hanja-special2-alternatives-2026-09-21/serve.py')
r = importlib.util.module_from_spec(spec); spec.loader.exec_module(r)
entries = json.loads((HERE / 'candidates.json').read_text())
for e in entries:
    r.base.renderer.ENTRIES[e['glyph']] = {'strokes': e['dictionaryStrokes'], 'dictionary': e['dictionary']}
class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        try:
            q = parse_qs(urlparse(self.path).query)
            e = next(e for e in entries if e['id'] == q.get('id', [entries[0]['id']])[0])
            g = e['glyph']
            pairs = [tuple(map(int, p.split(':'))) for p in q.get('pairs', [''])[0].split(',') if p]
            parts = ['<!doctype html><meta charset="utf-8"><style>body{margin:8px;width:840px;font:14px sans-serif}h1{font-size:20px}svg{width:204px;height:204px}.grid{display:grid;grid-template-columns:420px 420px}section{border:1px solid #ddd}.pair{display:flex}.forms svg{width:390px;height:390px}</style>',
                '<h1>' + html.escape(g + ' · ' + e['id']) + '</h1><p>Left: Korean dictionary / Right: AnimCJK ' + e['corpus'] + '. Blue → green → orange → red.</p>']
            if pairs:
                parts.append('<div class="grid">')
                for left, right in pairs:
                    assert 1 <= left <= e['dictionaryStrokes'] and 1 <= right <= len(e['strokes'])
                    parts.append('<section><b>' + str(left) + ' / ' + str(right) + '</b><div class="pair">' + r.base.renderer.dictionary_svg(g, left, True, e['id'] + str(left)) + r.candidate(e, right) + '</div></section>')
                parts.append('</div>')
            else:
                parts.append('<div class="pair forms">' + r.base.full_dictionary(g) + r.candidate(e) + '</div>')
            parts.append('<p>Dictionary ©2020 e-hanja: RAM only. AnimCJK ©2016–2026 FM&amp;SH, Arphic Public License.</p>')
            body = ''.join(parts).encode()
            self.send_response(200); self.send_header('Content-Type', 'text/html; charset=utf-8'); self.send_header('Cache-Control', 'no-store'); self.end_headers(); self.wfile.write(body)
        except Exception as exc: self.send_error(500, str(exc))
if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1]) if len(sys.argv) > 1 else 51841), Handler).serve_forever()
