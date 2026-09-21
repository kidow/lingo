#!/usr/bin/env python3
"""RAM-only dictionary review. Never persist proprietary SVG, images, or browser captures."""
import sys
sys.dont_write_bytecode = True
import html
import importlib.util
import json
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from http.server import ThreadingHTTPServer

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('review_renderer', HERE.parent / 'hanja-g2-batch10-2026-09-16/serve.py')
renderer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)
DATA = json.loads((HERE / 'originals.json').read_text())
ENTRIES = DATA['entries']
renderer.ENTRIES = {entry['glyph']: entry for entry in ENTRIES}
VISITS = []
def selected_entry(entry, query):
    if query.get('corrected', ['0'])[0] == '1':
        proposal = json.loads((HERE / 'proposals.json').read_text())[entry['glyph']]
        return {**entry, 'paths': [entry['paths'][i - 1] for i in proposal]}
    return entry

STYLE = '<style>body{zoom:1.5;font:14px system-ui;color:#111;background:white;margin:10px;width:1100px}h1{font-size:22px;margin:4px 0}p{margin:6px 0}.grid{display:grid;grid-template-columns:repeat(2,550px)}section{border:1px solid #ddd}.pair,.forms{display:flex}svg{width:270px;height:270px}.forms svg{width:340px;height:290px}.forms>div{text-align:center}.whole{margin:14px 0;border:1px solid #ddd}</style>'

def full_dictionary(glyph):
    source = renderer.source(glyph)
    paths = ''.join('<path d="' + html.escape(s['outline'].get('d')) + '"/>' for s in source['strokes'])
    return '<svg viewBox="0 0 1024 1024"><g transform="' + source['transform'] + '">' + paths + '</g></svg>'

def full_candidate(paths):
    return '<svg viewBox="0 0 100 100"><g fill="none" stroke="#222" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">' + ''.join('<path d="' + path + '"/>' for path in paths) + '</g></svg>'

class Handler(renderer.Handler):
    def log_message(self, *args):
        pass
    def do_GET(self):
        try:
            query = parse_qs(urlparse(self.path).query)
            view = query.get('view', ['strokes'])[0]
            parts = ['<!doctype html><meta charset="utf-8">', STYLE]
            if view == 'checks':
                body = json.dumps({'sources': [{ 'glyph': entry['glyph'], 'strokes': len(renderer.source(entry['glyph'])['strokes']),
                    'transform': renderer.source(entry['glyph'])['transform'],
                    'timeline': [{k: v for k, v in s.items() if k not in ('outline', 'animated')}
                        for s in renderer.source(entry['glyph'])['strokes']] } for entry in ENTRIES], 'visits': VISITS}).encode()
                content_type = 'application/json'
            elif view == 'forms':
                index = int(query.get('index', ['0'])[0])
                selected = ENTRIES[index:index + 2]
                for entry in selected:
                    entry = selected_entry(entry, query)
                    glyph = entry['glyph']
                    static = (HERE.parents[1] / entry['staticSvg']['path']).read_text()
                    parts.append('<div class="whole"><h1>' + glyph + ' · catalog ' + str(entry['catalogStrokes']) + ' / dictionary ' + str(entry['strokes']) + '</h1><div class="forms"><div>Noto static' + static + '</div><div>Dictionary' + full_dictionary(glyph) + '</div><div>' + entry['corpus'] + ' candidate' + full_candidate(entry['paths']) + '</div></div></div>')
                VISITS.append({'view': view, 'glyphs': [e['glyph'] for e in selected], 'corrected': query.get('corrected', ['0'])[0] == '1'})
                body = ''.join(parts).encode()
                content_type = 'text/html; charset=utf-8'
            else:
                glyph = query.get('glyph', [ENTRIES[0]['glyph']])[0]
                entry = selected_entry(renderer.ENTRIES[glyph], query)
                start = int(query.get('start', ['1'])[0])
                end = min(int(query.get('end', [str(start + 5)])[0]), entry['strokes'])
                assert 1 <= start <= end
                parts.extend(['<h1>' + glyph + ' · ' + entry['corpus'] + ' · ' + str(start) + '–' + str(end) + ' / ' + str(entry['strokes']) + '</h1>',
                    '<p>Left dictionary / Right candidate. Blue → green → orange → red. Previous strokes grey.</p><div class="grid">'])
                for stroke in range(start, end + 1):
                    parts.append('<section><b>' + str(stroke) + '</b><div class="pair">' + renderer.dictionary_svg(glyph, stroke, True, glyph + str(stroke)) + renderer.candidate_svg(entry['paths'], stroke) + '</div></section>')
                parts.append('</div><p>©2020 e-hanja · review only · source artwork stays in RAM.</p>')
                VISITS.append({'view': view, 'glyph': glyph, 'start': start, 'end': end, 'corpus': entry['corpus'], 'corrected': query.get('corrected', ['0'])[0] == '1'})
                body = ''.join(parts).encode()
                content_type = 'text/html; charset=utf-8'
            self.send_response(200)
        except Exception as error:
            body = str(error).encode()
            content_type = 'text/plain'
            self.send_response(500)
        self.send_header('Content-Type', content_type)
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1]) if len(sys.argv) > 1 else 51825), Handler).serve_forever()
