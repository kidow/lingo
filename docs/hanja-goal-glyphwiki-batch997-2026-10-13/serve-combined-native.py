# Isolated source-only combined native controls; all saved original files remain unchanged.
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, json, os, types
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse
HERE = Path(__file__).resolve().parent
GLYPH = "騢"
COUNT = 19
DEFAULT_ROOT = "u9a22"
SUPPORTED_ROOTS = tuple(["u9a22","u9a22-ue0100"])
ORIGINAL_PINS = {"NOTICE.md":"c4ea49017d999a6e2ac9947e73559ce7da69368836be9ffac3b11a126499f310","candidate-compile-analysis.json":"98bc96de33e10863a0564918f8c07657950ef149f330b9ff1932593ae72b8a51","engine-proof.json":"8b4cc3119febcb64146fb6b64471b6bea7ab6ca2134ecbd5769fed1fda7ea1d9","engine-whole-u9a22-ue0100.json":"b9ce8d33ff034039a0fe58dd8ac6b1677ebd7b91534c476efdcbb3bf934d4fe5","engine-whole-u9a22.json":"b9ce8d33ff034039a0fe58dd8ac6b1677ebd7b91534c476efdcbb3bf934d4fe5","metadata.json":"6a3bba7d0df4c0bb051d33b5f8b32e592de1506127541e24d1169b0cadfd7148","native-server-preparation-source-analysis.json":"f4c0cbfb7c4fa408364fad542d6f86a27e760f7d731d41e4f08a75b8baf945cf","native-server-validation.json":"6fd2845fef254b19434a7d8b76a33134d289310f7acf92415b4e17a67347023b","progressive.mjs":"25b9a23cdf644798a7336df3f78b72ecc3c4ad10d0fbe860b403a38911e514f6","serve-progressive.py":"edaa28ba5bcad3ea0eaf11f26c26ae891e1238d7a116028aa605deaeab2663eb","serve-whole.py":"3d8005de6fffe6ee0e2b5404ec9867469e4537fbc6383e78c91b0454325b1252","server-compile.mjs":"468f3e333b9a3a7cad61d32cb52be897e8fb9d0c3370170700b2eab96ca67eca","source-analysis.json":"d30f5a8476bd4963afc9ada74ce2df77bfd3b0e0cbe08bf3afacd984e9ac9d52","source-join-analysis.json":"6a2f0c41ef19ba3e8b16260551ba2211845e57943044b7acb91bf4a8ac2c1140","source-only-helper-readiness.json":"7e9032a2edf571ecb964bd1bbca9f0faa15361b7f7aec2fe7c63d60ce7df27ba","source-preservation-audit.json":"67370f7475bd3418af0afc74e4d2a09765fba74b1f1822b1297bed76d3c33c21","sources.json":"bd167ab27a95af086c8cb2a14d4622c92860e019eedcf4f367fe59b1d5f01056","verify-source.mjs":"6b30c1c4e3d41cdb667309422ba75be05141144dd61fe9eb1b61ae34eab723ff"}
ADDITIONAL_PINS = {"../hanja-special2-alternatives-2026-09-21/serve.py":"d5d85c7304efef4b9546bd4d8414282d97757568af89dd97c2ad7701392e6532","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"}
PREP = json.loads((HERE/'combined-native-preparation.json').read_text())
WHOLE_SERVER_MARKER = "server=r.ThreadingHTTPServer(('127.0.0.1',0),Handler)\n"
STARTUP_COMPILE = "compiled=compile_candidate()\n"
SLIDER = '<input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0">'
END_BUTTON = '<button onclick="show(1)">100%</button>'

def guards():
    assert PREP['originalBytePins'] == ORIGINAL_PINS
    assert PREP['additionalProtectedPins'] == ADDITIONAL_PINS
    assert hashlib.sha256(Path(__file__).read_bytes()).hexdigest() == PREP['helperSHA256'], 'Isolated helper changed'
    for name, expected in {**ORIGINAL_PINS, **ADDITIONAL_PINS}.items():
        assert hashlib.sha256((HERE/name).read_bytes()).hexdigest() == expected, 'Pinned input changed: '+name

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
    WHOLE = load_original('own997_combined_whole',whole_text,'serve-whole.py')
    PROGRESSIVE = load_original('own997_combined_progressive',progressive_text,'serve-progressive.py')
    candidate = PROGRESSIVE.compile_candidate(DEFAULT_ROOT); assert len(candidate['strokes']) == COUNT
    server = ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'glyph':GLYPH,'pens':COUNT,'masks':sum(len(p)for p in candidate['strokes']),'wholeVariants':len(SUPPORTED_ROOTS),'sourceRoot':DEFAULT_ROOT,'nativeApproval':False,'runtimeApplied':False,'privateMediaSaved':False}),flush=True)
    server.serve_forever()
