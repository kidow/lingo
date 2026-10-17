# Isolated source-only combined native controls; all saved original files remain unchanged.
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, json, os, types
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse
HERE = Path(__file__).resolve().parent
GLYPH = "偪"
COUNT = 11
DEFAULT_ROOT = "u506a"
SUPPORTED_ROOTS = tuple(["u506a","u506a-ue0100"])
ORIGINAL_PINS = {"NOTICE.md":"4883c42cdf8ae53dc1a9b0d2a82285d2e29ac8eb8597c88703d86a3d71efdbc6","candidate-compile-analysis.json":"568c4b5f95573c911d482bcd0895c0ee76a35a3a5154a643b4a5ba663087a51a","combined-native-preparation.json":"fbebd63b095c0b19096bdf223f68c1bc83de05613a68c96944f8246e130ddfe4","engine-proof.json":"92fdafc3d0572dd22e2daafba2a718bc055d61b2b8e6dd56d47f863725c992a0","engine-whole-u506a-ue0100.json":"2c1558cc69e18fbcd23a7e04026150142543687be1c05f5b0646e84ad1cf1d78","engine-whole-u506a.json":"2c1558cc69e18fbcd23a7e04026150142543687be1c05f5b0646e84ad1cf1d78","metadata.json":"4d61d0b21f8cca70842c10fb00a95005a6dae96c45f7bdd2da76eb0fa033623c","native-server-preparation-source-analysis.json":"ad4bb7f1a1fbec99e4fb17e741e50831c9c8bc61da0d0108acb49859c2ac51ba","native-server-validation.json":"255416269d56bc50c0b908480aaca10c453144d4ad07550d47d513a4c181e7c8","progressive.mjs":"e798ddf15dd133fb11601b1702d22b0ccc5bcbe84d7cd42bd9a4fb6a9629c3a8","serve-combined-native.py":"d428b42999b378ffa3b760c13f6fafdb521221b102f7768a47dabcc1816a55d4","serve-progressive.py":"2a31f437f4c12a8b00198f9e76f1c683ee11726a86f2a6e00a5dc48d93899c82","serve-whole.py":"553c13c3065ddb3095c6cfc7c7fcfab80c0414fe9d9c8cd9e00031388d2b97d6","server-compile.mjs":"ca3ce49612fe25f3ac27c39b21ac85e78515548ab14dc929451937078fe4b763","source-analysis.json":"5b68dd793c0f9335ae6e2b9672e3e1441eb54db90f646f12b56c17d2d2315d5e","source-join-analysis.json":"059eb92c0529e4bafeeaddad7f6363c41195af3b2a5cfbb84233c812547dc990","source-only-helper-readiness.json":"0798e95ea6c33330cbf82b328afcc215cc8e5d02d07914d03f28f89d501a9f36","source-preservation-audit.json":"0ee4c52aba288fdf19956169441b5e14b433f44cd0b74b396820668897b40698","sources.json":"e9676e69d3353367984b78fa3bac20186eac3c6d0d7a54a7acb809aadd3abe38","verify-source.mjs":"8f1ad09db9628c19884541ec8252169ce0b618c67d7bdb8f10ce7aadf130018c"}
ADDITIONAL_PINS = {"../hanja-special2-alternatives-2026-09-21/serve.py":"d5d85c7304efef4b9546bd4d8414282d97757568af89dd97c2ad7701392e6532","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"}
PREP = json.loads((HERE/'source-order-candidate-validation.json').read_text())
WHOLE_SERVER_MARKER = "server=r.ThreadingHTTPServer(('127.0.0.1',0),Handler)\n"
STARTUP_COMPILE = "compiled=compile_candidate()\n"
SLIDER = '<input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0">'
END_BUTTON = '<button onclick="show(1)">100%</button>'

def guards():
    assert PREP['originalBytePins'] == ORIGINAL_PINS
    assert PREP['additionalProtectedPins'] == ADDITIONAL_PINS
    assert hashlib.sha256(Path(__file__).read_bytes()).hexdigest() == PREP['helperSHA256'], 'Isolated helper changed'
    for name, expected in {**ORIGINAL_PINS, **ADDITIONAL_PINS, **PREP['newFilesSHA256']}.items():
        assert hashlib.sha256((HERE/name).read_bytes()).hexdigest() == expected, 'Pinned input changed: '+name

def source_texts():
    guards()
    whole = (HERE/'serve-whole.py').read_text()
    progressive = (HERE/'serve-progressive.py').read_text()
    assert whole.count(WHOLE_SERVER_MARKER) == 1
    whole = whole.split(WHOLE_SERVER_MARKER, 1)[0]
    assert whole.count('server-compile.mjs') == 1
    whole = whole.replace('server-compile.mjs','server-compile-order-candidate.mjs',1)
    assert progressive.count(STARTUP_COMPILE) == 1
    progressive = progressive.replace(STARTUP_COMPILE, '', 1)
    assert progressive.count('server-compile.mjs') == 1
    progressive = progressive.replace('server-compile.mjs','server-compile-order-candidate.mjs',1)
    assert progressive.count(SLIDER) == 1
    progressive = progressive.replace(SLIDER, SLIDER[:-1]+' step=".0001">', 1)
    assert progressive.count(END_BUTTON) == 1
    progressive = progressive.replace(END_BUTTON, END_BUTTON+'<button onclick="show(.95)">95%</button>', 1)
    return whole, progressive

def load_original(name, text, filename):
    module = types.ModuleType(name)
    module.__file__ = str(HERE/filename)
    exec(compile(text, str(HERE/filename), 'exec'), module.__dict__)
    return module

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        original_path = self.path
        try:
            guards()
            parsed = urlparse(self.path); query = parse_qs(parsed.query)
            root = query.get('root', query.get('id', [DEFAULT_ROOT]))[0]
            assert root in SUPPORTED_ROOTS, 'Only explicitly pinned whole profiles are supported'
            if parsed.path == '/checks':
                candidate = PROGRESSIVE.compile_candidate(root)
                body = json.dumps({'glyph':GLYPH,'sourceRoot':root,'pens':len(candidate['strokes']),'masks':sum(len(p)for p in candidate['strokes']),'sourceGroups':candidate['sourceGroups'],'identityContract':'mandatory full5/root-specific identity7 with ./ prefixes and lowercase Sha256','nativeApproval':False,'runtimeApplied':False}).encode()
                self.send_response(200); self.send_header('Content-Type','application/json'); self.send_header('Cache-Control','no-store'); self.end_headers(); self.wfile.write(body)
            elif parsed.path in ('/', '/whole'):
                PROGRESSIVE.compile_candidate(root)
                variants = SUPPORTED_ROOTS if query.get('all',['1']) == ['1'] else (root,)
                blocks = ''.join('<section><h2>'+html.escape(name)+'</h2>'+WHOLE.candidate({'id':name})+'</section>'for name in variants)
                body = ('<!doctype html><meta charset="utf-8"><title>'+GLYPH+' whole review</title><style>body{font:16px system-ui;margin:18px;width:1112px}svg{width:420px;height:420px}.variants{display:grid;grid-template-columns:556px 556px}a{margin:6px}</style><h1>'+GLYPH+' · original whole profiles</h1><a href="/whole">전체 원본</a><a href="/pairs?root='+root+'">국내 방향 ↔ 후보</a><a href="/progressive?root='+root+'&amp;stroke=1&amp;enlarged=1">520px</a><h2>국내</h2>'+WHOLE.r.base.full_dictionary(GLYPH)+'<div class="variants">'+blocks+'</div><p>Source-only · native/runtime approval false · dictionary RAM-only</p>').encode()
                self.send_response(200); self.send_header('Content-Type','text/html; charset=utf-8'); self.send_header('Cache-Control','no-store'); self.end_headers(); self.wfile.write(body)
            elif parsed.path == '/pairs':
                requested = query.get('pairs', [None])[0]
                if requested is None:
                    selected = [int(query['stroke'][0])]if 'stroke'in query else list(range(1,COUNT+1))
                    assert all(1 <= pen <= COUNT for pen in selected)
                    requested = ','.join(str(pen)+':'+str(pen)for pen in selected)
                translated = {'id':[root],'pairs':[requested]}
                if 'view'in query: translated['view'] = query['view']
                self.path = '/?'+urlencode(translated,doseq=True)
                WHOLE.Handler.do_GET(self)
            elif parsed.path == '/progressive':
                translated = dict(query); translated['root'] = [root]; translated.setdefault('enlarged',['1'])
                if query.get('coarse') == ['1']: translated['enlarged'] = ['0']
                self.path = '/?'+urlencode(translated,doseq=True)
                PROGRESSIVE.Handler.do_GET(self)
            else: self.send_error(404)
        except Exception as exc: self.send_error(500,str(exc))
        finally: self.path = original_path

if __name__ == '__main__':
    parser = argparse.ArgumentParser(); parser.add_argument('--port',type=int,default=0); args = parser.parse_args()
    whole_text, progressive_text = source_texts()
    WHOLE = load_original('own996_combined_whole',whole_text,'serve-whole.py')
    PROGRESSIVE = load_original('own996_combined_progressive',progressive_text,'serve-progressive.py')
    candidate = PROGRESSIVE.compile_candidate(DEFAULT_ROOT); assert len(candidate['strokes']) == COUNT
    server = ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'glyph':GLYPH,'pens':COUNT,'masks':sum(len(p)for p in candidate['strokes']),'wholeVariants':len(SUPPORTED_ROOTS),'sourceRoot':DEFAULT_ROOT,'nativeApproval':False,'runtimeApplied':False,'privateMediaSaved':False}),flush=True)
    server.serve_forever()
