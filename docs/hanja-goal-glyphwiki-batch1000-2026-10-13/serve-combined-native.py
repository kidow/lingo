# Isolated source-only combined native controls; all saved original files remain unchanged.
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, json, os, types
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse
HERE = Path(__file__).resolve().parent
GLYPH = "哻"
COUNT = 10
DEFAULT_ROOT = "u54fb"
SUPPORTED_ROOTS = tuple(["u54fb"])
ORIGINAL_PINS = {"NOTICE.md":"260e6c28b79908461883ac025698575f64851173d79fb8f5d98ab791ed2708a4","candidate-compile-analysis.json":"ca594ed715e771d4f3bd26ff9abc0561e23654c29fac3dfc0f86c151805905a6","engine-proof.json":"b307718caed02108a6c92ee285ceda9d5b61dfeecc47efc81c3d99b5f450b73b","engine-whole-u54fb.json":"528cba8f9ab4d9d410c4d9415e415271339938ad47c78575bcde4be8be7eeb3e","metadata.json":"346dbe36a2231897d5f87307aa0f3b8749113de34b118ba0eea9a18e6c6cdae7","native-server-preparation-source-analysis.json":"cb6ce498371b04647e8e787b724d2c418a4250239a4f16f604acee5f772f5403","native-server-validation.json":"e194b9d225538b651ec2c7a32abc65f56145a04ba64c854d3834a39563ca916e","progressive.mjs":"acd07a688a310d15c91fed3854f02e1b784203d131d78ca5be84093e010c03ac","serve-progressive.py":"38c923995290cba2dd3b7637c2e0dcbf909e6cf5e604905409913db05b0d9757","serve-whole.py":"787d9e661c0e72975dde5d06d3feb3b0f0fef4903f35275de799043023374320","server-compile.mjs":"d0d7607653592ae3d2b119d27ccdfb2964834b8ee0cbb03b50d9baf43acda8fd","source-analysis.json":"911d011f6ee999e06209ce6f71482611d215147c5c06894ae9d222f8bf881ac4","source-join-analysis.json":"0fb6cf0e7b4d0d9611b4f9477cdc82373de78034e5083a8df21fb5a21236f5a2","source-only-helper-readiness-2026-10-14.json":"b0db25321aa5886245382d6432314918b1e7520d9417401046909b6a247475b1","sources.json":"84018ca72962bf309fdb4b5c552fbefdfe4cacbafa59ae8cd3e1008b00d8d964","verify-source.mjs":"ebc001234a2908128c9705bbdf2e805cc333a3e30e1d37ba73ea9eefcdc2000b"}
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
    WHOLE = load_original('own1000_combined_whole',whole_text,'serve-whole.py')
    PROGRESSIVE = load_original('own1000_combined_progressive',progressive_text,'serve-progressive.py')
    candidate = PROGRESSIVE.compile_candidate(DEFAULT_ROOT); assert len(candidate['strokes']) == COUNT
    server = ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'glyph':GLYPH,'pens':COUNT,'masks':sum(len(p)for p in candidate['strokes']),'wholeVariants':len(SUPPORTED_ROOTS),'sourceRoot':DEFAULT_ROOT,'nativeApproval':False,'runtimeApplied':False,'privateMediaSaved':False}),flush=True)
    server.serve_forever()
