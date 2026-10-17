# Isolated source-only combined native controls; all saved original files remain unchanged.
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, json, os, types
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse
HERE = Path(__file__).resolve().parent
GLYPH = "熯"
COUNT = 15
DEFAULT_ROOT = "u71af"
SUPPORTED_ROOTS = tuple(["u71af","u71af-ue0100"])
ORIGINAL_PINS = {"NOTICE.md":"b4c601052ac7ee2d98f00f60f2d4b5760a6f5ef2a27eb2b25ff3fb1e73ff5b95","candidate-compile-analysis.json":"c369cf85bcd5131129c70a81b2cb799331058140cf2dbb789c2d629fbba9053e","engine-proof.json":"bcd286b20471c4b8593ace2d2caea6f1605d561e5b217a4f12e5d96403068764","engine-whole-u71af-ue0100.json":"87e68404750ea316b52488a8d0706b8ee6feb8b5fc9e484ecf99d72ea148cad6","engine-whole-u71af.json":"87e68404750ea316b52488a8d0706b8ee6feb8b5fc9e484ecf99d72ea148cad6","metadata.json":"36ab91c83a3e1a4b7f9f3950e8ae8902f81351f585ed0d39eb41b083bff7128e","native-server-preparation-source-analysis.json":"fd9d396a162432eb99f1d585e80a2f34c2de626ae2a72a0215348f16b0890019","native-server-validation.json":"9ec4febf0c59456615d0d28ce1bd807af193a330a7da3c52118e7f3fe0e12670","progressive.mjs":"08e0deb48ce12a78caf570dec83e4c87d63e9d0eca16a17b301872aa3e13f040","serve-progressive.py":"33a364b3c9831dde28b2b7ed9256b3c607111cfcf79e1999407091c3df783544","serve-whole.py":"b18cecd11a00c62f6b9f5a976a66f8cb8d88baca09b58a0cbad5b086c7327711","server-compile.mjs":"393279eb0a62ebaea617acaeabf1cdab7da2ae06a5ed3e604b68b633db3d4b21","source-analysis.json":"96ea5302954834d9dd0ad12691b9af7a01014e2510f5d818c20af85595f879bd","source-join-analysis.json":"fec5699979874af14bf81b10e0366a17bb47134418a93c38b9e6d8fa4b260dbd","source-only-helper-readiness-2026-10-14.json":"d8ef2d02e8085035dac8ef3629b88e95474162ed2dd424fb21e4ef2110ad65dd","sources.json":"d421f3ccae4feeaaf5f2f99140a3019368f7603c9e1b7e3e30fb307db94a7249","verify-source.mjs":"9c0269da88dce8d50bcbc8aab8ac0ebb050dba2f9ec9dbf230323dd9ef1bedab"}
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
    WHOLE = load_original('own1001_combined_whole',whole_text,'serve-whole.py')
    PROGRESSIVE = load_original('own1001_combined_progressive',progressive_text,'serve-progressive.py')
    candidate = PROGRESSIVE.compile_candidate(DEFAULT_ROOT); assert len(candidate['strokes']) == COUNT
    server = ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'glyph':GLYPH,'pens':COUNT,'masks':sum(len(p)for p in candidate['strokes']),'wholeVariants':len(SUPPORTED_ROOTS),'sourceRoot':DEFAULT_ROOT,'nativeApproval':False,'runtimeApplied':False,'privateMediaSaved':False}),flush=True)
    server.serve_forever()
