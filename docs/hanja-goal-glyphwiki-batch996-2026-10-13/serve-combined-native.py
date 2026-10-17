# Source-only combined wrapper; original helpers/compiler remain byte-pinned and unchanged.
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, json, os, types
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse

HERE = Path(__file__).resolve().parent
ORIGINAL_PINS = {"NOTICE.md":"4883c42cdf8ae53dc1a9b0d2a82285d2e29ac8eb8597c88703d86a3d71efdbc6","candidate-compile-analysis.json":"568c4b5f95573c911d482bcd0895c0ee76a35a3a5154a643b4a5ba663087a51a","engine-proof.json":"92fdafc3d0572dd22e2daafba2a718bc055d61b2b8e6dd56d47f863725c992a0","engine-whole-u506a-ue0100.json":"2c1558cc69e18fbcd23a7e04026150142543687be1c05f5b0646e84ad1cf1d78","engine-whole-u506a.json":"2c1558cc69e18fbcd23a7e04026150142543687be1c05f5b0646e84ad1cf1d78","metadata.json":"4d61d0b21f8cca70842c10fb00a95005a6dae96c45f7bdd2da76eb0fa033623c","native-server-preparation-source-analysis.json":"ad4bb7f1a1fbec99e4fb17e741e50831c9c8bc61da0d0108acb49859c2ac51ba","native-server-validation.json":"255416269d56bc50c0b908480aaca10c453144d4ad07550d47d513a4c181e7c8","progressive.mjs":"e798ddf15dd133fb11601b1702d22b0ccc5bcbe84d7cd42bd9a4fb6a9629c3a8","serve-progressive.py":"2a31f437f4c12a8b00198f9e76f1c683ee11726a86f2a6e00a5dc48d93899c82","serve-whole.py":"553c13c3065ddb3095c6cfc7c7fcfab80c0414fe9d9c8cd9e00031388d2b97d6","server-compile.mjs":"ca3ce49612fe25f3ac27c39b21ac85e78515548ab14dc929451937078fe4b763","source-analysis.json":"5b68dd793c0f9335ae6e2b9672e3e1441eb54db90f646f12b56c17d2d2315d5e","source-join-analysis.json":"059eb92c0529e4bafeeaddad7f6363c41195af3b2a5cfbb84233c812547dc990","source-only-helper-readiness.json":"0798e95ea6c33330cbf82b328afcc215cc8e5d02d07914d03f28f89d501a9f36","source-preservation-audit.json":"0ee4c52aba288fdf19956169441b5e14b433f44cd0b74b396820668897b40698","sources.json":"e9676e69d3353367984b78fa3bac20186eac3c6d0d7a54a7acb809aadd3abe38","verify-source.mjs":"8f1ad09db9628c19884541ec8252169ce0b618c67d7bdb8f10ce7aadf130018c"}
SUPPORTED_ROOTS = ("u506a", "u506a-ue0100")
WHOLE_SERVER_MARKER = "server=r.ThreadingHTTPServer(('127.0.0.1',0),Handler)\n"
STARTUP_COMPILE = "compiled=compile_candidate()\n"
SLIDER = '<input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0">'

def guards():
    for name, expected in ORIGINAL_PINS.items():
        assert hashlib.sha256((HERE/name).read_bytes()).hexdigest() == expected, 'Pinned original changed: '+name

def source_texts():
    guards()
    whole = (HERE/'serve-whole.py').read_text()
    progressive = (HERE/'serve-progressive.py').read_text()
    assert whole.count(WHOLE_SERVER_MARKER) == 1
    whole = whole.split(WHOLE_SERVER_MARKER, 1)[0]
    assert progressive.count(STARTUP_COMPILE) == 1
    progressive = progressive.replace(STARTUP_COMPILE, '', 1)
    assert progressive.count(SLIDER) == 1
    progressive = progressive.replace(SLIDER, SLIDER[:-1]+' step=".0001">', 1)
    return whole, progressive

def load_original(name, text, file):
    module = types.ModuleType(name)
    module.__file__ = str(HERE/file)
    exec(compile(text, str(HERE/file), 'exec'), module.__dict__)
    return module

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        try:
            guards()
            parsed = urlparse(self.path)
            query = parse_qs(parsed.query)
            root = query.get('root', query.get('id', ['u506a']))[0]
            assert root in SUPPORTED_ROOTS, 'Only exact pinned whole identities are supported'
            original_path = self.path
            if parsed.path in ('/', '/checks'):
                if parsed.path == '/checks':
                    body = json.dumps({'glyph':'偪', 'sourceRoot':root, 'candidatePens':11, 'masks':11, 'originalPins':len(ORIGINAL_PINS), 'identityContract':'mandatory full5 plus seven-field root/proof/header/metadata identity', 'nativeApproval':False, 'runtimeApplied':False}).encode()
                    self.send_response(200); self.send_header('Content-Type','application/json'); self.send_header('Cache-Control','no-store'); self.end_headers(); self.wfile.write(body)
                else:
                    body = ('<!doctype html><meta charset="utf-8"><title>偪 combined source review</title><h1>偪 · source-only</h1><a href="/whole">전체</a> <a href="/pairs">국내 방향 ↔ 후보11획</a> <a href="/progressive?stroke=1&enlarged=1">520px progressive</a><p>Native approval remains false. Dictionary graphics remain RAM-only.</p>').encode()
                    self.send_response(200); self.send_header('Content-Type','text/html; charset=utf-8'); self.send_header('Cache-Control','no-store'); self.end_headers(); self.wfile.write(body)
            elif parsed.path in ('/whole', '/pairs'):
                translated = {'id':[root]}
                if parsed.path == '/pairs':
                    requested = query.get('pairs', [None])[0]
                    if requested is None:
                        selected = [int(query['stroke'][0])] if 'stroke' in query else list(range(1,12))
                        assert all(1 <= pen <= 11 for pen in selected)
                        requested = ','.join(str(pen)+':'+str(pen) for pen in selected)
                    translated['pairs'] = [requested]
                    if 'view' in query: translated['view'] = query['view']
                self.path = '/?'+urlencode(translated, doseq=True)
                WHOLE.Handler.do_GET(self)
            elif parsed.path == '/progressive':
                translated = dict(query)
                translated['root'] = [root]
                translated.setdefault('enlarged', ['1'])
                if query.get('coarse') == ['1']: translated['enlarged'] = ['0']
                self.path = '/?'+urlencode(translated, doseq=True)
                PROGRESSIVE.Handler.do_GET(self)
            else:
                self.send_error(404)
            self.path = original_path
        except Exception as exc:
            self.send_error(500, str(exc))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=0)
    args = parser.parse_args()
    whole_text, progressive_text = source_texts()
    WHOLE = load_original('a996_combined_whole', whole_text, 'serve-whole.py')
    PROGRESSIVE = load_original('a996_combined_progressive', progressive_text, 'serve-progressive.py')
    compiled = PROGRESSIVE.compile_candidate('u506a')
    assert len(compiled['strokes']) == 11
    server = ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'port':server.server_address[1], 'pid':os.getpid(), 'glyph':'偪', 'candidatePens':11, 'masks':sum(len(p) for p in compiled['strokes']), 'originalPins':len(ORIGINAL_PINS), 'sourceRoot':'u506a', 'nativeApproval':False, 'runtimeApplied':False, 'privateMediaSaved':False}), flush=True)
    server.serve_forever()
