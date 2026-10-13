# Original-source native review only; compiler/body/header/caller identity SHA pinned. Private dictionary RAM-only.
import sys
sys.dont_write_bytecode=True
import json,importlib.util,os,hashlib,html,subprocess
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs,urlparse
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
metadata=json.loads((HERE/'metadata.json').read_text())
names=["u84c1","u84c1-ue0100","u84c1-ue0101","u84c1-ue0102"]
WHOLE_PINS={"u84c1":"b823242f1cf1d1ece55e7e5409eb8cce24fe5c58ecea21e3211cad555c8b61c3","u84c1-ue0100":"30591e9c2fbd32946be189332ec3cc730805b46f3a24a05dc9da19148d49d3e3","u84c1-ue0101":"30591e9c2fbd32946be189332ec3cc730805b46f3a24a05dc9da19148d49d3e3","u84c1-ue0102":"c3d374c785248ba8ac905d3f5548a5d334e7e2996079987559cce7e367583cb1"}
variants={n:json.loads((HERE/('engine-whole-'+n+'.json')).read_text()) for n in names}
for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin

spec=importlib.util.spec_from_file_location('a894_review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[{'glyph':'蓁','id':n,'dictionaryStrokes':14,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'raw':i} for i in range(len(variants[n]['groups']))]} for n in names]
r.base.renderer.ENTRIES['蓁']={'strokes':14,'dictionary':metadata['dictionary']}
def candidate(entry,end=None):
    groups=variants[entry['id']]['groups']
    if end is not None:groups=groups[:end]
    polygons=[p for g in groups for p in g['polygons']]
    assert all(v['off']==0 for p in polygons for v in p)
    return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in p)+'"/>' for p in polygons)+'</g></svg>'
r.candidate=candidate
def compiled_candidate(root):
    assert root=='u84c1-ue0102','Only the explicitly selected complete compiler root is available'
    module=(HERE/'progressive.mjs').as_uri()
    script = f"""import assert from'node:assert/strict';import{{readFileSync}}from'node:fs';import{{createHash}}from'node:crypto';import{{compileProgressive,renderProgressive,sourceRoot,sourceProofFile,sourceWholeFileSHA256 as sourceProofFileSHA256,sourceGroups}}from'{module}';
assert.equal(createHash('sha256').update(readFileSync(new URL('progressive.mjs','{module}'))).digest('hex'),"56b8590adf328134a2afb66f6189ba79899ff0190818c60e78f87871cba022a7");const bytes=readFileSync(new URL(sourceProofFile,'{module}'));assert.equal(sourceRoot,"u84c1-ue0102");assert.equal(sourceProofFile,"engine-whole-u84c1-ue0102.json");assert.equal(createHash('sha256').update(bytes).digest('hex'),sourceProofFileSHA256);const identity=Object.freeze({{sourceRoot,sourceProofFile,sourceProofFileSHA256}});assert.deepEqual(identity,{{"sourceRoot":"u84c1-ue0102","sourceProofFile":"engine-whole-u84c1-ue0102.json","sourceProofFileSHA256":"c3d374c785248ba8ac905d3f5548a5d334e7e2996079987559cce7e367583cb1"}});const selected=JSON.parse(bytes),headerBytes=readFileSync(new URL('engine-proof.json','{module}'));assert.equal(createHash('sha256').update(headerBytes).digest('hex'),"e53c76456874f5eddc1b0cbcae0e2b89b0507baa13fc94db34939ea82898c159");const header=JSON.parse(headerBytes),proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}};assert.equal(createHash('sha256').update(JSON.stringify(proof)).digest('hex'),"d645ba97c3b288005230d50af3e602301bf2a6a78a30102b81964a8331321229");const before=JSON.stringify(proof),strokes=compileProgressive(proof.trace,proof);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,14);console.log(JSON.stringify({{strokes,render:renderProgressive.toString(),sourceRoot,sourceProofFile,sourceProofFileSHA256,sourceGroups}}));"""
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',script]))
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            q=parse_qs(urlparse(self.path).query);root=q.get('id',['u84c1-ue0102'])[0]
            assert root in names
            pairs=[tuple(map(int,v.split(':'))) for v in q.get('pairs',[''])[0].split(',') if v]
            parts=['<!doctype html><meta charset="utf-8"><title>蓁 compiled pen 비교</title><style>body{font:16px system-ui;margin:12px;width:1112px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}button,a{margin:8px}section{border-bottom:1px solid #ddd}.candidate{width:420px}.pair b{display:block}h2{font-size:18px}.pairs{display:grid;grid-template-columns:556px 556px}.pairs section{width:550px}.pairs .pair{gap:16px}.pairs .pair svg{width:200px;height:210px}.pairs .candidate{width:210px}</style><h1>蓁 · '+html.escape(root)+'</h1>']
            parts+=['<a href="?id='+n+'">전체 '+n+'</a>' for n in names]
            parts+=['<p>선택 원본 raw '+str(len(variants[root]['groups']))+' · draw '+str(sum(len(calls) for calls in variants[root]['trace']))+' · '+('u84c1-ue0102 명시 컴파일 후보' if root=='u84c1-ue0102' else '전체 원본 비교만 지원')+' · 국내 대응과 필순은 미승인</p>']
            parts+=['<a href="?id=u84c1-ue0102&pairs='+','.join(str(i)+':'+str(i) for i in range(1,15))+'">국내 전14 / compiled 후보</a>']
            if pairs:
                compiled=compiled_candidate(root)
                assert len(compiled['strokes'])==14
                for left,right in pairs:assert 1<=left<=14 and 1<=right<=14
                if q.get('view')==['checks']:
                    body=json.dumps({'mapping':'exact-compiled-candidate-pens','root':root,'candidatePens':14,'masks':sum(len(p) for p in compiled['strokes']),'pairs':[{'domestic':left,'candidate':right,'raw':compiled['sourceGroups'][right-1]} for left,right in pairs],'sourceProofFile':compiled['sourceProofFile'],'sourceProofFileSHA256':compiled['sourceProofFileSHA256'],'nativeApproval':False}).encode();mime='application/json'
                else:
                    parts+=['<p>왼쪽 국내 방향 · 오른쪽 원본 compiler 후보 pen. domestic 대응과 native 승인은 미검토.</p><button onclick="show(.25)">25%</button><button onclick="show(.5)">50%</button><button onclick="show(.75)">75%</button><button onclick="show(.9999)">99.99%</button><button onclick="show(1)">100%</button><div class="pairs">']
                    for index,(left,right) in enumerate(pairs):
                        parts+=['<section><h2>국내 '+str(left)+' / 후보 '+str(right)+' · source raw '+html.escape(str(compiled['sourceGroups'][right-1]))+'</h2><div class="pair">'+r.base.renderer.dictionary_svg('蓁',left,True,'pair'+str(index))+'<div class="candidate" id="candidate'+str(index)+'"></div></div></section>']
                    parts+=['</div><script>const strokes='+json.dumps(compiled['strokes'])+';const pens='+json.dumps([right for left,right in pairs])+';const render='+compiled['render']+';function show(p){pens.forEach((pen,i)=>document.getElementById("candidate"+i).innerHTML=render(strokes,pen,p,"pair"+i));}show(1);</script><p>매 요청 pinned whole byte SHA·engine header·compiler identity 확인. 사전 SVG RAM-only.</p>'];body=''.join(parts).encode();mime='text/html; charset=utf-8'
            else:
                raw=(HERE/('engine-whole-'+root+'.json')).read_bytes()
                assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]
                parts+=['<p>전체 원본 polygons 비교입니다. 원본raw경계는 국내pen순서로 승인되지 않았습니다.</p><div class="pair">'+r.base.full_dictionary('蓁')+candidate({'id':root})+'</div>'];body=''.join(parts).encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=r.ThreadingHTTPServer(('127.0.0.1',64723),Handler)
print(json.dumps({'port':64723,'pid':os.getpid(),'wholeVariants':len(names),'pairMapping':'compiled-candidate-pens','candidatePens':14,'nativeApproved':False}),flush=True)
server.serve_forever()
