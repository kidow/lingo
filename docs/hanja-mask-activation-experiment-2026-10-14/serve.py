# Isolated diagnostic only. Source and compiler pinned, private SVG RAM-only.
import sys
sys.dont_write_bytecode=True
import json,hashlib,importlib.util,subprocess,os,html
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
CONTRACT=json.loads((HERE/'contract.json').read_text())
FILE_PINS=json.loads((HERE/'experiment-file-pins.json').read_text())
def pinned():
    for name,pin in FILE_PINS.items():
        assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin,'Experiment file pin changed: '+name
def fixture():
    pinned()
    module=(HERE/'fixture.mjs').as_uri()
    script="import{loadFixture}from"+json.dumps(module)+";console.log(JSON.stringify(loadFixture()));"
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',script]))
spec=importlib.util.spec_from_file_location('activation857_ram_dictionary',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
renderer=importlib.util.module_from_spec(spec);spec.loader.exec_module(renderer)
meta=json.loads((HERE/CONTRACT['sourceDirectory']/'metadata.json').read_text())
renderer.base.renderer.ENTRIES['隮']={'strokes':17,'dictionary':meta['dictionary']}
STATIC={'/app.mjs','/reveal-descriptor.mjs','/svg-dom-adapter.mjs','/svg-string-adapter.mjs'}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            pinned();path=urlparse(self.path).path
            if path in STATIC:body=(HERE/path[1:]).read_bytes();mime='text/javascript; charset=utf-8'
            elif path=='/fixture':
                data=fixture();data.pop('dictionary',None);body=json.dumps(data).encode();mime='application/json'
            elif path=='/checks':
                data=fixture();body=json.dumps({'sourcePassed':True,'sourceIdentity':CONTRACT['sourceIdentity'],'sourceCompilerSHA256':CONTRACT['sourcePins']['progressive-native-boundary-compiler.mjs'],'compiledSHA256':CONTRACT['compiledSHA256'],'pens':17,'masks':20,'gateOnly':'pen12 mask2 curve group opacity','productionChanged':False,'nativeApproval':False,'privateMediaSaved':False}).encode();mime='application/json'
            elif path=='/':
                fixture()
                dictionary11=renderer.base.renderer.dictionary_svg('隮',11,True,'exp857dom11')
                dictionary12=renderer.base.renderer.dictionary_svg('隮',12,True,'exp857dom12')
                body=('<!doctype html><meta charset="utf-8"><title>隮 독립 마스크 게이트 실험</title><style>body{font:16px system-ui;margin:16px;width:1180px;color:#222;background:#fff}button,select,input{margin:6px}.compare{display:flex;gap:24px}.compare>section{width:540px}.compare svg{width:520px;height:520px}.domestic{display:flex;gap:24px}.domestic svg{width:200px;height:210px}.samples{display:grid;grid-template-columns:repeat(3,380px);gap:8px}.sample-pair{display:flex}.sample-pair svg{width:180px;height:180px}.samples b{display:block}body.enlarged .samples{display:none}h1{font-size:24px}</style>'
                  '<h1>隮 · 原 마스크 / 40ms 게이트 실험</h1><p>국내11 Q / 12 V+Q를 root가 관찰한 후보. 페이드는 필순·방향·원본 gap을 고치지 않습니다. Runtime 미적용·native 미승인.</p>'
                  '<div class="domestic"><section>국내11'+dictionary11+'</section><section>국내12'+dictionary12+'</section></div>'
                  '<label>펜 <input id="pen" type="number" min="1" max="17" value="12"></label><label>진단 adapter <select id="adapter"><option value="dom">DOM</option><option value="string">SVG string</option></select></label>'
                  '<label>재생 <select id="timing"><option value="slow">8초 느린 진단</option><option value="actual">실제 앱 한 펜 속도433.33ms</option><option value="whole">실제 앱 전체17펜·gap120ms</option></select></label><label><input id="large" type="checkbox">520px fine만</label>'
                  '<p>게이트는 실제 앱 mask시간 기준40ms이며 느린 진단에서는 동일 q 구간을 늘려 관찰합니다. 두 adapter가 공유 pure descriptor를 사용하지만 실제 React 앱은 수정하지 않았습니다.</p>'
                  '<div><button id="before">mask2 경계 직전</button><button id="at">mask2 경계</button><button id="after">mask2 경계 직후</button></div><div id="percent-controls"></div>'
                  '<button id="play">재생</button><button id="stop">정지</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" step="0.00000001" value="0"><output id="status" aria-live="polite">준비</output>'
                  '<div class="compare"><section><h2>원본</h2><div id="original"></div></section><section><h2>게이트</h2><div id="gated"></div></section></div><h2>9프레임: 각 원본 / 게이트</h2><div class="samples" id="samples"></div><script type="module" src="/app.mjs"></script>').encode();mime='text/html; charset=utf-8'
            else:self.send_error(404);return
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
fixture()
print(json.dumps({'port':64720,'pid':os.getpid(),'experimentOnly':True,'nativeApproval':False}),flush=True)
ThreadingHTTPServer(('127.0.0.1',64720),Handler).serve_forever()
