import sys
sys.dont_write_bytecode=True
import json,importlib.util,os,hashlib,html,subprocess
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs,urlparse
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
metadata=json.loads((HERE/'metadata.json').read_text())
names=json.loads((HERE/'sources.json').read_text())['wholeNames']
variants={n:json.loads((HERE/('engine-whole-'+n+'.json')).read_text()) for n in names}
for row in json.loads((HERE/'source-join-analysis.json').read_text())['wholeResults']:
    assert hashlib.sha256((HERE/row['originalWholeFile']).read_bytes()).hexdigest()==row['originalWholeFileSHA256']
spec=importlib.util.spec_from_file_location('a835_review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[{'glyph':'躇','id':n,'dictionaryStrokes':20,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'raw':i} for i in range(len(variants[n]['groups']))]} for n in names]
r.base.renderer.ENTRIES['躇']={'strokes':20,'dictionary':metadata['dictionary']}
def candidate(entry,end=None):
    groups=variants[entry['id']]['groups']
    if end is not None:groups=groups[:end]
    polygons=[p for g in groups for p in g['polygons']]
    assert all(v['off']==0 for p in polygons for v in p)
    return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in p)+'"/>' for p in polygons)+'</g></svg>'
def compiled_candidate(root):
    module=(HERE/'progressive.mjs').as_uri()
    script=f"""import assert from'node:assert/strict';import{{readFileSync}}from'node:fs';import{{createHash}}from'node:crypto';import{{compileSourceWhole,renderProgressive,wholeSourceIdentities,sourceGroups}}from'{module}';
const root={json.dumps(root)},id=wholeSourceIdentities[root];assert(id,'Whole has no compiled pen candidate');const bytes=readFileSync(new URL(id.file,'{module}'));assert.equal(createHash('sha256').update(bytes).digest('hex'),id.fileSHA256);const p=JSON.parse(bytes);assert.equal(p.sourceRoot,root);assert.equal(p.sourceProofFile,id.file);const proof={{...p,sourceProofFileSHA256:id.fileSHA256}},before=JSON.stringify(proof);const strokes=compileSourceWhole(root,proof.trace,proof,id);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,20);assert.equal(strokes.flat().length,20);console.log(JSON.stringify({{strokes,groups:sourceGroups,render:renderProgressive.toString(),root,file:id.file,fileSHA256:id.fileSHA256}}));"""
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',script]))
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            q=parse_qs(urlparse(self.path).query);root=q.get('id',['u8e87-ue0102'])[0]
            pairs=[tuple(map(int,v.split(':'))) for v in q.get('pairs',[''])[0].split(',') if v]
            parts=['<!doctype html><meta charset="utf-8"><title>躇 compiled pen 비교</title><style>body{font:16px system-ui;margin:12px;width:1112px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}button,a{margin:8px}section{border-bottom:1px solid #ddd}.candidate{width:420px}.pair b{display:block}h2{font-size:18px}.pairs{display:grid;grid-template-columns:556px 556px}.pairs section{width:550px}.pairs .pair{gap:16px}.pairs .pair svg{width:200px;height:210px}.pairs .candidate{width:210px}</style><h1>躇 · '+html.escape(root)+'</h1>']
            parts+=['<a href="?id='+n+'">전체 '+n+'</a>' for n in names]
            parts+=['<a href="?id=u8e87-ue0102&pairs='+','.join(str(i)+':'+str(i) for i in range(1,8))+'">국내 足 1–7 / compiled 후보</a>','<a href="?id=u8e87-ue0102&pairs='+','.join(str(i)+':'+str(i) for i in range(1,21))+'">국내 전20 / compiled 후보</a>']
            if pairs:
                compiled=compiled_candidate(root)
                for left,right in pairs:assert 1<=left<=20 and 1<=right<=20
                if q.get('view')==['checks']:
                    body=json.dumps({'mapping':'exact-compiled-candidate-pens','root':root,'candidatePens':20,'masks':20,'pairs':[{'domestic':left,'candidate':right,'raw':compiled['groups'][right-1]} for left,right in pairs],'sourceProofFile':compiled['file'],'sourceProofFileSHA256':compiled['fileSHA256'],'nativeApproval':False}).encode();mime='application/json'
                else:
                    parts+=['<p>왼쪽 국내 방향 · 오른쪽 원본 compiler 후보 pen. raw prefix가 아닙니다. domestic 대응과 native 승인은 미검토.</p><button onclick="show(.25)">25%</button><button onclick="show(.5)">50%</button><button onclick="show(.75)">75%</button><button onclick="show(.9999)">99.99%</button><button onclick="show(1)">100%</button>']
                    parts+=['<div class="pairs">']
                    for index,(left,right) in enumerate(pairs):
                        parts+=['<section><h2>국내 '+str(left)+' / 후보 '+str(right)+' · source raw '+html.escape(str(compiled['groups'][right-1]))+'</h2><div class="pair">'+r.base.renderer.dictionary_svg('躇',left,True,'pair'+str(index))+'<div class="candidate" id="candidate'+str(index)+'"></div></div></section>']
                    parts+=['</div><script>const strokes='+json.dumps(compiled['strokes'])+';const pens='+json.dumps([right for left,right in pairs])+';const render='+compiled['render']+';function show(p){pens.forEach((pen,i)=>document.getElementById("candidate"+i).innerHTML=render(strokes,pen,p,"pair"+i));}show(1);</script>']
                    parts+=['<p>선택 whole의 매 요청 byte SHA·explicit header·compiler identity 확인. 사전 SVG RAM-only.</p>'];body=''.join(parts).encode();mime='text/html; charset=utf-8'
            else:
                assert root in names
                raw=(HERE/('engine-whole-'+root+'.json')).read_bytes();pin=next(row for row in json.loads((HERE/'source-join-analysis.json').read_text())['wholeResults'] if row['root']==root);assert hashlib.sha256(raw).hexdigest()==pin['originalWholeFileSHA256']
                parts+=['<p>전체 원본 polygons 비교입니다. 이 화면의 raw '+str(len(variants[root]['groups']))+'개는 compiled pen 순서가 아닙니다.</p><div class="pair">'+r.base.full_dictionary('躇')+candidate({'id':root})+'</div>'];body=''.join(parts).encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=r.ThreadingHTTPServer(('127.0.0.1',50815),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(names),'pairMapping':'compiled-candidate-pens','candidatePens':20,'masks':20,'nativeApproved':False}),flush=True)
server.serve_forever()
