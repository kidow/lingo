import sys
sys.dont_write_bytecode = True
import html, json, hashlib, importlib.util, os
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
METADATA = json.loads((HERE / 'metadata.json').read_text())
GLYPH = METADATA['glyph']
NAMES = ["u8407","u8407-ue0100","u8407-ue0101","u8407-ue0102"]
PINS = {"u8407":"9d75cb2107b46a390dd89188177f975b35a892c735332a965856111b00a382c8","u8407-ue0100":"9d75cb2107b46a390dd89188177f975b35a892c735332a965856111b00a382c8","u8407-ue0101":"9d75cb2107b46a390dd89188177f975b35a892c735332a965856111b00a382c8","u8407-ue0102":"4feed3fbf8f5ea97f8907536ada45a5b0070af09b571e24f5dbf018448184306"}
PORT = 64644
VARIANTS = {}
for name in NAMES:
    raw = (HERE / ('engine-whole-' + name + '.json')).read_bytes()
    assert hashlib.sha256(raw).hexdigest() == PINS[name]
    VARIANTS[name] = json.loads(raw)
spec = importlib.util.spec_from_file_location('b832_critical_whole', ROOT / 'docs/hanja-special2-direction-review-2026-09-21/serve.py')
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.renderer.ENTRIES[GLYPH] = {'strokes': 12, 'dictionary': METADATA['dictionary']}
VISITS = []

def candidate(name, end=None):
    groups = VARIANTS[name]['groups']
    if end is not None:
        groups = groups[:end]
    pieces = []
    for index, group in enumerate(groups):
        color = '#222' if end is None else ('#c44' if index == len(groups) - 1 else '#bbb')
        for polygon in group['polygons']:
            assert all(v['off'] == 0 for v in polygon)
            points = ' '.join(str(v['x']) + ',' + str(v['y']) for v in polygon)
            pieces.append('<polygon fill="' + color + '" points="' + points + '"/>')
    return '<svg viewBox="0 0 200 200">' + ''.join(pieces) + '</svg>'

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass
    def do_GET(self):
        try:
            q = parse_qs(urlparse(self.path).query)
            if q.get('view') == ['checks']:
                source = base.renderer.source(GLYPH)
                value = {'glyph': GLYPH, 'domesticStrokes': len(source['strokes']),
                         'variants': [{'root': n, 'rawGroups': len(VARIANTS[n]['groups'])} for n in NAMES],
                         'visits': VISITS, 'nativeApproval': False, 'graphicsPersisted': False}
                body, content = json.dumps(value).encode(), 'application/json'
            else:
                name = q.get('id', [NAMES[0]])[0]
                assert name in VARIANTS
                pairs = [tuple(map(int, x.split(':'))) for x in q.get('pairs', [''])[0].split(',') if x]
                parts = ['<!doctype html><meta charset="utf-8"><style>body{margin:8px;width:840px;font:14px system-ui;color:#111;background:white}h1{font-size:20px;margin:6px}svg{width:204px;height:204px}.grid{display:grid;grid-template-columns:420px 420px}section{border:1px solid #ddd}.pair{display:flex}.forms svg{width:390px;height:390px}</style>',
                         '<h1>' + GLYPH + ' · ' + html.escape(name) + '</h1>',
                         '<p>Left: domestic direction blue → green → orange → red. Right: exact original raw cumulative polygons; grey previous raw, red current raw. Raw boundaries are not approved domestic pens.</p>',
                         '<p>' + ' '.join('<a href="?id=' + n + '">' + n + '</a>' for n in NAMES) + '</p>']
                if pairs:
                    parts.append('<div class="grid">')
                    for d, raw_count in pairs:
                        assert 1 <= d <= 12 and 1 <= raw_count <= len(VARIANTS[name]['groups'])
                        parts.append('<section><b>Domestic ' + str(d) + ' / original raw cumulative 1–' + str(raw_count) + ' (current zero-based raw ' + str(raw_count - 1) + ')</b><div class="pair">' + base.renderer.dictionary_svg(GLYPH, d, True, name + str(d) + '-' + str(raw_count)) + candidate(name, raw_count) + '</div></section>')
                    parts.append('</div>')
                else:
                    parts.append('<div class="pair forms">' + base.full_dictionary(GLYPH) + candidate(name) + '</div>')
                parts.append('<p>©2020 e-hanja: private source graphics remain only in RAM. GlyphWiki contributors: fixed original polygons. No native approval from source reproduction.</p>')
                VISITS.append({'root': name, 'pairsDomesticRawCumulative': pairs, 'mode': 'directions' if pairs else 'whole'})
                body, content = ''.join(parts).encode(), 'text/html; charset=utf-8'
            self.send_response(200)
        except Exception as e:
            body, content = str(e).encode(), 'text/plain; charset=utf-8'
            self.send_response(500)
        self.send_header('Content-Type', content)
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == '__main__':
    print(json.dumps({'port': PORT, 'pid': os.getpid(), 'glyph': GLYPH, 'wholeVariants': len(NAMES), 'nativeApproval': False}), flush=True)
    ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
