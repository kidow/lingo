# Original-source native review only; compiler/body/header/caller identity SHA pinned. Private dictionary RAM-only.
import sys
sys.dont_write_bytecode=True
import json,importlib.util,os,hashlib,html,subprocess
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs,urlparse
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
STATIC_PINS={"metadata.json":"fae51ed8c9d23e5e8c8b0f0d7bc3adedc034f8b2fb452f4a4f96094edfb2aba4","sources.json":"edea92a8e1b8b7f3561a22a6435c291c6fe2662f7b5fc2865f325a32fa4486d3","engine-proof.json":"a30a05738c2ea0963b3a17d432abffcc2da987d8be9cf1c2592810a76250593b","progressive.mjs":"67bfbe457bff7587be3fc9a9c04ee27ca9a175acf4c07cc6387ed335fe4fc973"}
def assert_static_pins():
    for filename,pin in STATIC_PINS.items():assert hashlib.sha256((HERE/filename).read_bytes()).hexdigest()==pin
assert_static_pins()
metadata=json.loads((HERE/'metadata.json').read_text())
names=["u66b3","u66b3-g","u66b3-jv","u66b3-k","u66b3-t","u66b3-ue0100","u66b3-ue0101","u66b3-ue0102","u66b3-ue0103","u66b3-ue0104"]
WHOLE_PINS={"u66b3":"ed602675620873dcc21f3853e8224fe31c01ffeaa24e2d3c24f1b9e76b85f2a9","u66b3-g":"d7f3c1e041b87d78ce7a5e4159880e5991cf7e729e0c115775bc1a1481389417","u66b3-jv":"ed602675620873dcc21f3853e8224fe31c01ffeaa24e2d3c24f1b9e76b85f2a9","u66b3-k":"c3a8f2b42ff78822a83582069894151066583c77338daaa44088c871d612e12a","u66b3-t":"69866d06ca354f32f8850b95b5a1c144e50ab7fec4475783fbe8b718b03653b2","u66b3-ue0100":"ed602675620873dcc21f3853e8224fe31c01ffeaa24e2d3c24f1b9e76b85f2a9","u66b3-ue0101":"ed602675620873dcc21f3853e8224fe31c01ffeaa24e2d3c24f1b9e76b85f2a9","u66b3-ue0102":"b9073c12291a789b346ff41645f2fad93e60a638e64aa765e95e4b04186b556b","u66b3-ue0103":"1dcbe92c881f5181a56c907709221a5f81ea778101413fbc3174ec988ea5b0a6","u66b3-ue0104":"3294e68ca3e0c689474c1b68a38bbd95752b2360097fc6d5e1327cf2e21a2bd3"}
variants={n:json.loads((HERE/('engine-whole-'+n+'.json')).read_text()) for n in names}
for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin

spec=importlib.util.spec_from_file_location('a1018_review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[{'glyph':'暳','id':n,'dictionaryStrokes':15,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'raw':i} for i in range(len(variants[n]['groups']))]} for n in names]
r.base.renderer.ENTRIES['暳']={'strokes':15,'dictionary':metadata['dictionary']}
def candidate(entry,end=None):
    groups=variants[entry['id']]['groups']
    if end is not None:groups=groups[:end]
    polygons=[p for g in groups for p in g['polygons']]
    assert all(v['off']==0 for p in polygons for v in p)
    return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in p)+'"/>' for p in polygons)+'</g></svg>'
r.candidate=candidate
SUPPORTED_ROOTS=["u66b3-ue0104","u66b3-ue0102","u66b3-ue0103","u66b3-k","u66b3-t"]
def compiled_candidate(root):
    assert root in SUPPORTED_ROOTS,'Only fixed complete source profiles; whole eligibility remains unreviewed'
    return json.loads(subprocess.check_output(['rtk','proxy','node',str(HERE/'server-compile.mjs'),root]))

class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            assert_static_pins()
            q=parse_qs(urlparse(self.path).query);root=q.get('id',['u66b3-ue0104'])[0]
            assert root in names
            pairs=[tuple(map(int,v.split(':'))) for v in q.get('pairs',[''])[0].split(',') if v]
            parts=['<!doctype html><meta charset="utf-8"><title>暳 compiled pen 비교</title><style>body{font:16px system-ui;margin:12px;width:1112px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}button,a{margin:8px}section{border-bottom:1px solid #ddd}.candidate{width:420px}.pair b{display:block}h2{font-size:18px}.pairs{display:grid;grid-template-columns:556px 556px}.pairs section{width:550px}.pairs .pair{gap:16px}.pairs .pair svg{width:200px;height:210px}.pairs .candidate{width:210px}</style><h1>暳 · '+html.escape(root)+'</h1>']
            parts+=['<a href="?id='+n+'">전체 '+n+'</a>' for n in names]
            parts+=['<p>선택 원본 raw '+str(len(variants[root]['groups']))+' · draw '+str(sum(len(calls) for calls in variants[root]['trace']))+' · '+('u66b3-ue0104 명시 컴파일 후보' if root in SUPPORTED_ROOTS else '전체 원본 비교만 지원')+' · 국내 대응과 필순은 미승인</p>']
            parts+=['<a href="?id=u66b3-ue0104&pairs='+','.join(str(i)+':'+str(i) for i in range(1,16))+'">국내 전15 / compiled 후보</a>']
            if pairs:
                compiled=compiled_candidate(root)
                assert len(compiled['strokes'])==15
                for left,right in pairs:assert 1<=left<=15 and 1<=right<=15
                if q.get('view')==['checks']:
                    body=json.dumps({'mapping':'exact-compiled-candidate-pens','root':root,'candidatePens':15,'masks':sum(len(p) for p in compiled['strokes']),'pairs':[{'domestic':left,'candidate':right,'raw':compiled['sourceGroups'][right-1]} for left,right in pairs],'sourceProofFile':compiled['sourceProofFile'],'sourceProofFileSHA256':compiled['sourceProofFileSHA256'],'nativeApproval':False}).encode();mime='application/json'
                else:
                    parts+=['<p>왼쪽 국내 방향 · 오른쪽 원본 compiler 후보 pen. domestic 대응과 native 승인은 미검토.</p><button onclick="show(.25)">25%</button><button onclick="show(.5)">50%</button><button onclick="show(.75)">75%</button><button onclick="show(.9999)">99.99%</button><button onclick="show(1)">100%</button><div class="pairs">']
                    for index,(left,right) in enumerate(pairs):
                        parts+=['<section><h2>국내 '+str(left)+' / 후보 '+str(right)+' · source raw '+html.escape(str(compiled['sourceGroups'][right-1]))+'</h2><div class="pair">'+r.base.renderer.dictionary_svg('暳',left,True,'pair'+str(index))+'<div class="candidate" id="candidate'+str(index)+'"></div></div></section>']
                    parts+=['</div><script>const strokes='+json.dumps(compiled['strokes'])+';const pens='+json.dumps([right for left,right in pairs])+';const render='+compiled['render']+';function show(p){pens.forEach((pen,i)=>document.getElementById("candidate"+i).innerHTML=render(strokes,pen,p,"pair"+i));}show(1);</script><p>매 요청 pinned whole byte SHA·engine header·compiler identity 확인. 사전 SVG RAM-only.</p>'];body=''.join(parts).encode();mime='text/html; charset=utf-8'
            else:
                raw=(HERE/('engine-whole-'+root+'.json')).read_bytes()
                assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]
                parts+=['<p>전체 원본 polygons 비교입니다. 원본raw경계는 국내pen순서로 승인되지 않았습니다.</p><div class="pair">'+r.base.full_dictionary('暳')+candidate({'id':root})+'</div>'];body=''.join(parts).encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=r.ThreadingHTTPServer(('127.0.0.1',0),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(names),'pairMapping':'compiled-candidate-pens','candidatePens':15,'nativeApproved':False}),flush=True)
server.serve_forever()
