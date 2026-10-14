# Static original whole inspection only. No compiler, inferred pen mapping, or animation.
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, importlib.util, json, os
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
SELF_SHA = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
HOLD_BYTES = (HERE / 'native-server-preflight-hold.json').read_bytes()
HOLD_SHA = hashlib.sha256(HOLD_BYTES).hexdigest()
HOLD = json.loads(HOLD_BYTES)
NAMES = HOLD['renderableWholeRoots']
META = json.loads((HERE / 'metadata.json').read_bytes())
spec = importlib.util.spec_from_file_location('a961_static_review', ROOT / 'docs/hanja-special2-direction-review-2026-09-21/serve.py')
review = importlib.util.module_from_spec(spec)
spec.loader.exec_module(review)
review.renderer.ENTRIES = {META['glyph']: {'strokes': META['dictionaryStrokes'], 'dictionary': META['dictionary']}}

def guard():
    assert hashlib.sha256(Path(__file__).read_bytes()).hexdigest() == SELF_SHA
    assert hashlib.sha256((HERE / 'native-server-preflight-hold.json').read_bytes()).hexdigest() == HOLD_SHA
    for name, expected in HOLD['inputSHA256'].items():
        assert hashlib.sha256((HERE / name).read_bytes()).hexdigest() == expected, name
    assert not (HERE / 'progressive.mjs').exists(), 'Original source hold must not become a compiler implicitly'

def original(root, raw_count=None):
    assert root in NAMES, 'Unsupported original whole'
    p = json.loads((HERE / ('engine-whole-' + root + '.json')).read_bytes())
    header = json.loads((HERE / 'engine-proof.json').read_bytes())
    assert sorted(p) == ['defaults', 'engineHashes', 'engineRevision', 'groups', 'trace']
    assert p['engineRevision'] == header['engineRevision']
    assert p['engineHashes'] == header['engineHashes']
    assert p['defaults'] == header['defaults']
    for i, row in enumerate(p['trace']):
        assert [poly for call in row for poly in call['polygons']] == p['groups'][i]['polygons']
    groups = p['groups'] if raw_count is None else p['groups'][:raw_count]
    polygons = [poly for g in groups for poly in g['polygons']]
    assert all(v['off'] == 0 for poly in polygons for v in poly)
    return '<svg viewBox="0 0 200 200">' + ''.join('<polygon points="' + ' '.join(str(v['x']) + ',' + str(v['y']) for v in poly) + '"/>' for poly in polygons) + '</svg>'

def domestic():
    data = review.renderer.source(META['glyph'])
    assert len(data['strokes']) == META['dictionaryStrokes']
    paths = ''.join('<path d="' + html.escape(s['outline'].get('d')) + '"/>' for s in data['strokes'])
    return '<svg viewBox="0 0 1024 1024"><g transform="' + data['transform'] + '">' + paths + '</g></svg>'

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass
    def do_GET(self):
        try:
            guard()
            u = urlparse(self.path)
            q = parse_qs(u.query)
            root = q.get('id', [NAMES[0]])[0]
            assert root in NAMES, 'Unsupported original whole'
            if u.path in ['/progressive', '/pairs']:
                raise ValueError('No compiler or domestic-to-raw pen mapping: source hold remains')
            if u.path == '/checks':
                original(root)
                body = json.dumps({'glyph': META['glyph'], 'root': root, 'catalogStrokes': 11, 'originalRawGroups': 13, 'legitimateFoldPens': 12, 'compiledPens': 0, 'reason': HOLD['reason'], 'nativeApproval': False}, ensure_ascii=False).encode()
                mime = 'application/json'
            else:
                assert u.path in ['/', '/whole', '/raw']
                body = '<!doctype html><meta charset="utf-8"><title>梲 · original source hold</title><style>body{font:16px system-ui;margin:16px;width:1100px}svg{width:420px;height:420px}.pair{display:flex;gap:24px}a{margin:8px;display:inline-block}</style><h1>梲 · 원본 비교만</h1><p>국내11획·원본13행. 정당한 연속 병합 후12펜. 국내 필순 대응과 애니메이션은 미승인.</p>'
                body += ''.join('<a href="/whole?id=' + name + '">' + name + '</a>' for name in NAMES)
                body += '<p>' + html.escape(HOLD['reason']) + '</p>'
                if u.path == '/raw':
                    n = int(q.get('raw', ['1'])[0])
                    assert 1 <= n <= 13
                    body += '<p>원본 raw 누적 ' + str(n) + '/13: 국내 단일 획과의 대응이 아닙니다.</p>' + original(root, n)
                else:
                    body += '<div class="pair"><div>국내 전체' + domestic() + '</div><div>' + html.escape(root) + original(root) + '</div></div>'
                body = body.encode()
                mime = 'text/html; charset=utf-8'
            self.send_response(200)
            self.send_header('Content-Type', mime)
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(body)
        except Exception as e:
            self.send_error(409, str(e))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=0)
    args = parser.parse_args()
    guard()
    for name in NAMES:
        original(name)
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    print(json.dumps({'port': server.server_address[1], 'pid': os.getpid(), 'wholeVariants': len(NAMES), 'blocked': True, 'compiledPens': 0, 'nativeApproval': False}), flush=True)
    server.serve_forever()

