# Isolated source-only combined native controls; all saved original files remain unchanged.
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, json, os, types
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse
HERE = Path(__file__).resolve().parent
GLYPH = "駽"
COUNT = 17
DEFAULT_ROOT = "u99fd"
SUPPORTED_ROOTS = tuple(["u99fd","u99fd-ue0100"])
ORIGINAL_PINS = {"NOTICE.md":"ad42d0be02d1959ecc66b6a2a4f8e0e89af80653af93708e248f91d0c5cf9bd1","candidate-compile-analysis.json":"9cf871aada706a3d5dc0f15f7a7a7bd9c1b6c22af56da4fdea2974ae17686fb9","engine-proof.json":"c46af98e9a2a6d8e89d002a87290e074c1e6ad3fb348784fb5e9da3a5678ea4b","engine-whole-u99fd-ue0100.json":"2bc15fa3ff20aaf206a01cd8063a610c43a251c6603c19128c97ae1152377ee8","engine-whole-u99fd.json":"2bc15fa3ff20aaf206a01cd8063a610c43a251c6603c19128c97ae1152377ee8","metadata.json":"c7a83fe235b82c316caea17a381dc1c07ccec7eb44df05bc21ab74c6733fd685","native-server-preparation-source-analysis.json":"ba9af9079e8ef39dbd3bc4bf1ca485044dbfd0dab611ff75a71499fbe5e1f7e0","native-server-validation.json":"44aea42b22b7c30f4656579ffb4b311f6f905360955dcf3d8f8917736f3fa54f","progressive.mjs":"924716145002ac4a6bf95f44225329a5418e12e3b13dbc7f52d23de91d01b065","serve-progressive.py":"53ab6f99d07806ac1696913157fd3f2c59754afe1f7430b6e86fa1b7f863ee97","serve-whole.py":"0054a644c69ef24a4417703906a9b4981d8977cc43c9a6adbe6d7aaf07e8309e","server-compile.mjs":"b3868e0989787edc81709e180c692b13425c75c0522aa9801acc5350bca59dff","source-analysis.json":"335d24926d438ae6c9084ff826d23db3901cff37ca7c0941f920a8d80254ac64","source-join-analysis.json":"427e253d73f0fb38276592d0defbaa340aec9cee06780679e6f87be321a25baf","source-only-helper-readiness-2026-10-14.json":"29b9f00d3328a88871737fdfafa232b9f213940a9d966f6ce4edcaeaaefe35ec","source-preservation-audit.json":"15f984ce94a3e23ec6f9407fae4f3c93bfbf2995a5c1bbc615d3fc0ab85f5ce7","sources.json":"5e40bbd47401ba3dda43af151b82e889131b7c4fd4fec3face096443b1f9a94f","verify-source.mjs":"567bd84df89867ffdced0b9f86184cea003fc40e9572795acbad6a0ed47d2958","strict-source-candidate.mjs":"0cfc552c573d93585fcc5dfa31355aeee51b3ba38e2ae14977464471cc62846c","strict-source-candidate.d.mts":"1c099833bbf79092f704f9e723e4c1df027584f385153aea74c1f9d778817a03","server-compile-strict-candidate.mjs":"e274eec0d0361ed82bd4bf1bfd404582afd28718b7a1028ad2d6c764162ccd7c","strict-source-preparation.json":"1ec7b46fc77b28b9af460f76c970af699d11f36544826003ddfd4c34dce40ef4"}
ADDITIONAL_PINS = {"../hanja-special2-alternatives-2026-09-21/serve.py":"d5d85c7304efef4b9546bd4d8414282d97757568af89dd97c2ad7701392e6532","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"}
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
    WHOLE = load_original('own1016_combined_whole',whole_text,'serve-whole.py')
    PROGRESSIVE = load_original('own1016_combined_progressive',progressive_text,'serve-progressive.py')
    candidate = PROGRESSIVE.compile_candidate(DEFAULT_ROOT); assert len(candidate['strokes']) == COUNT
    server = ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'glyph':GLYPH,'pens':COUNT,'masks':sum(len(p)for p in candidate['strokes']),'wholeVariants':len(SUPPORTED_ROOTS),'sourceRoot':DEFAULT_ROOT,'nativeApproval':False,'runtimeApplied':False,'privateMediaSaved':False}),flush=True)
    server.serve_forever()
