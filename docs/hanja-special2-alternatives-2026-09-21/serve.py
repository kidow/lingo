#!/usr/bin/env python3
"""Compare licensed candidates with RAM-only dictionary graphics."""
import sys
sys.dont_write_bytecode = True
import html
import importlib.util
import json
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('direction_renderer', HERE.parent / 'hanja-special2-direction-review-2026-09-21/serve.py')
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
ENTRIES = json.loads((HERE / 'candidates.json').read_text())['entries']
VISITS = []

def candidate(entry, end=None):
    paths = [s['path'] for s in entry['strokes']]
    if end is not None:
        return base.renderer.candidate_svg(paths, end).replace('0 0 100 100', entry['viewBox'])
    return '<svg viewBox="' + entry['viewBox'] + '"><g fill="none" stroke="#222" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' + ''.join('<path d="' + html.escape(p) + '"/>' for p in paths) + '</g></svg>'

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        try:
            q = parse_qs(urlparse(self.path).query)
            if q.get('view') == ['checks']:
                body = json.dumps({'visits': VISITS, 'sources': [
                    {'glyph': g, 'strokes': len(base.renderer.source(g)['strokes'])}
                    for g in dict.fromkeys(e['glyph'] for e in ENTRIES)]}).encode()
                content_type = 'application/json'
            else:
                entry = next(e for e in ENTRIES if e['id'] == q.get('id', [ENTRIES[0]['id']])[0])
                glyph = entry['glyph']
                pairs = [tuple(map(int, p.split(':'))) for p in q.get('pairs', [''])[0].split(',') if p]
                parts = ['<!doctype html><meta charset="utf-8"><style>body{margin:8px;width:840px;font:14px sans-serif}h1{font-size:20px;margin:6px}svg{width:204px;height:204px}.grid{display:grid;grid-template-columns:420px 420px}section{border:1px solid #ddd}.pair{display:flex}.forms svg{width:390px;height:390px}</style>',
                    '<h1>' + glyph + ' · ' + entry['id'] + '</h1><p>Left e-hanja / Right KanjiVG. Blue → green → orange → red.</p>']
                if pairs:
                    parts.append('<div class="grid">')
                    for left, right in pairs:
                        assert 1 <= left <= entry['dictionaryStrokes'] and 1 <= right <= len(entry['strokes'])
                        parts.append('<section><b>Dictionary ' + str(left) + ' / candidate ' + str(right) + '</b><div class="pair">' + base.renderer.dictionary_svg(glyph, left, True, entry['id'] + str(left) + str(right)) + candidate(entry, right) + '</div></section>')
                    parts.append('</div>')
                else:
                    parts.append('<div class="pair forms">' + base.full_dictionary(glyph) + candidate(entry) + '</div>')
                parts.append('<p>©2020 e-hanja: source graphics stay in RAM. KanjiVG © Ulrich Apel, CC BY-SA 3.0.</p>')
                VISITS.append({'id': entry['id'], 'glyph': glyph, 'pairs': pairs, 'view': 'strokes' if pairs else 'forms'})
                body = ''.join(parts).encode()
                content_type = 'text/html; charset=utf-8'
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(body)
        except Exception as exc:
            self.send_error(500, str(exc))

if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1]) if len(sys.argv) > 1 else 51828), Handler).serve_forever()
