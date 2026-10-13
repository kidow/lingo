import sys
sys.dont_write_bytecode = True
import hashlib, html, importlib.util, json, os
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
CONFIG_SHA = 'd62c996bd875fbefcb6739d97b00a753109cbc830e2140e088b3fcada453e911'
config_bytes = (HERE / 'native-static-input-pins.json').read_bytes()
assert hashlib.sha256(config_bytes).hexdigest() == CONFIG_SHA
CFG = json.loads(config_bytes)
NAMES = CFG['wholeNames']
GLYPH = CFG['glyph']

def check_pins():
    assert hashlib.sha256((HERE / 'native-static-input-pins.json').read_bytes()).hexdigest() == CONFIG_SHA
    for filename, pin in CFG['pins'].items():
        assert hashlib.sha256((HERE / filename).read_bytes()).hexdigest() == pin, 'Pinned input changed: ' + filename
    manifest = json.loads((HERE / 'sources.json').read_text())
    assert manifest['wholeNames'] == NAMES
    assert manifest['missing'] == []
    metadata = json.loads((HERE / 'metadata.json').read_text())
    assert metadata['glyph'] == GLYPH and metadata['dictionaryStrokes'] == 19
    return metadata

metadata = check_pins()
spec = importlib.util.spec_from_file_location('b913_static_ram_renderer', ROOT / 'docs/hanja-special2-alternatives-2026-09-21/serve.py')
renderer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)
renderer.base.renderer.ENTRIES[GLYPH] = {'strokes': 19, 'dictionary': metadata['dictionary']}

def original_svg(name, cumulative=None, single=None):
    assert name in NAMES
    proof = json.loads((HERE / ('engine-whole-' + name + '.json')).read_text())
    groups = proof['groups']
    if cumulative is not None:
        assert 1 <= cumulative <= len(groups)
        groups = groups[:cumulative]
    if single is not None:
        assert 0 <= single < len(groups)
        groups = [groups[single]]
    polygons = [polygon for group in groups for polygon in group['polygons']]
    assert all(vertex['off'] == 0 for polygon in polygons for vertex in polygon)
    paths = ' '.join(' '.join(('M' if index == 0 else 'L') + str(vertex['x']/2) + ' ' + str(vertex['y']/2) for index, vertex in enumerate(polygon)) + ' Z' for polygon in polygons)
    return '<svg viewBox="0 0 100 100" aria-label="' + html.escape(name) + '"><path fill="#242422" d="' + paths + '"/></svg>'

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_GET(self):
        try:
            check_pins()
            parsed = urlparse(self.path)
            query = parse_qs(parsed.query)
            name = query.get('id', [NAMES[0]])[0]
            assert name in NAMES, 'Unsupported original whole identity'
            if query.get('view') == ['checks']:
                body = json.dumps({'glyph': GLYPH, 'wholeNames': NAMES, 'selectedStaticWhole': name, 'sourceInputPinsVerified': len(CFG['pins']), 'wholeFacts': CFG['wholeFacts'], 'compilerActivated': False, 'compiledPens': 0, 'compiledMasks': 0, 'nativeApproval': False, 'privateMediaSaved': False}).encode()
                mime = 'application/json'
            else:
                nav = '<nav>' + ''.join('<a href="/whole?id=' + root + '">' + root + '</a> ' for root in NAMES) + '</nav>'
                style = '<style>body{font:16px system-ui;margin:16px;width:1100px}.pair{display:grid;grid-template-columns:520px 520px;gap:20px}svg{width:520px;height:520px}a{margin:6px}section{margin:24px 0}</style>'
                if parsed.path in ['/', '/whole']:
                    rows = ''.join('<section><h2>' + root + '</h2><div class="pair">' + renderer.base.full_dictionary(GLYPH) + original_svg(root) + '</div></section>' for root in NAMES)
                    page = '<h1>蠆 · 고정 원본 전체 자형</h1>' + rows
                elif parsed.path == '/pairs':
                    domestic = int(query.get('domestic', ['1'])[0])
                    raw = int(query.get('raw', ['1'])[0])
                    assert 1 <= domestic <= 19
                    proof = json.loads((HERE / ('engine-whole-' + name + '.json')).read_text())
                    assert 1 <= raw <= len(proof['groups'])
                    one = query.get('single') == ['1']
                    source_svg = original_svg(name, single=raw-1) if one else original_svg(name, cumulative=raw)
                    page = '<h1>蠆 · 국내 ' + str(domestic) + ' / 원본 raw ' + str(raw-1) + (' 단독' if one else ' 누적(0부터)') + ' · ' + name + '</h1><p>원본 raw는 국내 필순 또는 펜 경계로 승인되지 않았습니다.</p><div class="pair">' + renderer.base.renderer.dictionary_svg(GLYPH, domestic, True, 'b913dom' + str(domestic)) + source_svg + '</div>'
                elif parsed.path == '/progressive':
                    page = '<h1>蠆 · 애니메이션 후보 차단</h1><p>원본 펜 경계 미확인. 정적 원본 대조만 제공하며 재생하지 않습니다.</p>'
                else:
                    self.send_error(404)
                    return
                body = ('<!doctype html><meta charset="utf-8"><title>蠆 static original review</title>' + style + nav + page).encode()
                mime = 'text/html; charset=utf-8'
            self.send_response(200)
            self.send_header('Content-Type', mime)
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(body)
        except Exception as exc:
            self.send_error(500, str(exc))

server = ThreadingHTTPServer(('127.0.0.1', CFG['port']), Handler)
print(json.dumps({'port': server.server_address[1], 'pid': os.getpid(), 'wholeVariants': len(NAMES), 'sourceInputPinsVerified': len(CFG['pins']), 'compilerActivated': False, 'nativeApproval': False}), flush=True)
server.serve_forever()
