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
names=["u57fb","u57fb-ue0100"]
WHOLE_PINS={"u57fb":"9b22b6f315bad9a67abc25e84d912b825078cdf1a523bef1c2c557ba4cb1c5c3","u57fb-ue0100":"9b22b6f315bad9a67abc25e84d912b825078cdf1a523bef1c2c557ba4cb1c5c3"}
variants={n:json.loads((HERE/('engine-whole-'+n+'.json')).read_text()) for n in names}
for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin

spec=importlib.util.spec_from_file_location('a886_review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[{'glyph':'埻','id':n,'dictionaryStrokes':11,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'raw':i} for i in range(len(variants[n]['groups']))]} for n in names]
r.base.renderer.ENTRIES['埻']={'strokes':11,'dictionary':metadata['dictionary']}
def candidate(entry,end=None):
    groups=variants[entry['id']]['groups']
    if end is not None:groups=groups[:end]
    polygons=[p for g in groups for p in g['polygons']]
    assert all(v['off']==0 for p in polygons for v in p)
    return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in p)+'"/>' for p in polygons)+'</g></svg>'
r.candidate=candidate
def compiled_candidate(root):
    assert root=='u57fb','Only the explicitly selected complete compiler root is available'
    module=(HERE/'progressive.mjs').as_uri()
    script = f"""import assert from'node:assert/strict';import{{readFileSync}}from'node:fs';import{{createHash}}from'node:crypto';import{{compileProgressive,renderProgressive,sourceRoot,sourceProofFile,sourceWholeFileSHA256 as sourceProofFileSHA256,sourceGroups}}from'{module}';
assert.equal(createHash('sha256').update(readFileSync(new URL('progressive.mjs','{module}'))).digest('hex'),"c40f0195eb11447cb48b5a920250273e139d703bd724912fb670a2baa5ef355b");const bytes=readFileSync(new URL(sourceProofFile,'{module}'));assert.equal(sourceRoot,"u57fb");assert.equal(sourceProofFile,"engine-whole-u57fb.json");assert.equal(createHash('sha256').update(bytes).digest('hex'),sourceProofFileSHA256);const identity=Object.freeze({{sourceRoot,sourceProofFile,sourceProofFileSHA256}});assert.deepEqual(identity,{{"sourceRoot":"u57fb","sourceProofFile":"engine-whole-u57fb.json","sourceProofFileSHA256":"9b22b6f315bad9a67abc25e84d912b825078cdf1a523bef1c2c557ba4cb1c5c3"}});const selected=JSON.parse(bytes),headerBytes=readFileSync(new URL('engine-proof.json','{module}'));assert.equal(createHash('sha256').update(headerBytes).digest('hex'),"ffe1956afabc954af5ecbb22c925f7b636ca3e3f8cde611d638e74f5ca015390");const header=JSON.parse(headerBytes),proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}};assert.equal(createHash('sha256').update(JSON.stringify(proof)).digest('hex'),"8a30044656f63a439a73b6816489bc18c3a2278455ac8fa238e57d1f6d237f8d");const before=JSON.stringify(proof),strokes=compileProgressive(proof.trace,proof);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,11);console.log(JSON.stringify({{strokes,render:renderProgressive.toString(),sourceRoot,sourceProofFile,sourceProofFileSHA256,sourceGroups}}));"""
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',script]))
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            q=parse_qs(urlparse(self.path).query);root=q.get('id',['u57fb'])[0]
            assert root in names
            pairs=[tuple(map(int,v.split(':'))) for v in q.get('pairs',[''])[0].split(',') if v]
            parts=['<!doctype html><meta charset="utf-8"><title>埻 compiled pen 비교</title><style>body{font:16px system-ui;margin:12px;width:1112px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}button,a{margin:8px}section{border-bottom:1px solid #ddd}.candidate{width:420px}.pair b{display:block}h2{font-size:18px}.pairs{display:grid;grid-template-columns:556px 556px}.pairs section{width:550px}.pairs .pair{gap:16px}.pairs .pair svg{width:200px;height:210px}.pairs .candidate{width:210px}</style><h1>埻 · '+html.escape(root)+'</h1>']
            parts+=['<a href="?id='+n+'">전체 '+n+'</a>' for n in names]
            parts+=['<p>선택 원본 raw '+str(len(variants[root]['groups']))+' · draw '+str(sum(len(calls) for calls in variants[root]['trace']))+' · '+('u57fb 명시 컴파일 후보' if root=='u57fb' else '전체 원본 비교만 지원')+' · 국내 대응과 필순은 미승인</p>']
            parts+=['<a href="?id=u57fb&pairs='+','.join(str(i)+':'+str(i) for i in range(1,12))+'">국내 전11 / compiled 후보</a>']
            if pairs:
                compiled=compiled_candidate(root)
                assert len(compiled['strokes'])==11
                for left,right in pairs:assert 1<=left<=11 and 1<=right<=11
                if q.get('view')==['checks']:
                    body=json.dumps({'mapping':'exact-compiled-candidate-pens','root':root,'candidatePens':11,'masks':sum(len(p) for p in compiled['strokes']),'pairs':[{'domestic':left,'candidate':right,'raw':compiled['sourceGroups'][right-1]} for left,right in pairs],'sourceProofFile':compiled['sourceProofFile'],'sourceProofFileSHA256':compiled['sourceProofFileSHA256'],'nativeApproval':False}).encode();mime='application/json'
                else:
                    parts+=['<p>왼쪽 국내 방향 · 오른쪽 원본 compiler 후보 pen. domestic 대응과 native 승인은 미검토.</p><button onclick="show(.25)">25%</button><button onclick="show(.5)">50%</button><button onclick="show(.75)">75%</button><button onclick="show(.9999)">99.99%</button><button onclick="show(1)">100%</button><div class="pairs">']
                    for index,(left,right) in enumerate(pairs):
                        parts+=['<section><h2>국내 '+str(left)+' / 후보 '+str(right)+' · source raw '+html.escape(str(compiled['sourceGroups'][right-1]))+'</h2><div class="pair">'+r.base.renderer.dictionary_svg('埻',left,True,'pair'+str(index))+'<div class="candidate" id="candidate'+str(index)+'"></div></div></section>']
                    parts+=['</div><script>const strokes='+json.dumps(compiled['strokes'])+';const pens='+json.dumps([right for left,right in pairs])+';const render='+compiled['render']+';function show(p){pens.forEach((pen,i)=>document.getElementById("candidate"+i).innerHTML=render(strokes,pen,p,"pair"+i));}show(1);</script><p>매 요청 pinned whole byte SHA·engine header·compiler identity 확인. 사전 SVG RAM-only.</p>'];body=''.join(parts).encode();mime='text/html; charset=utf-8'
            else:
                raw=(HERE/('engine-whole-'+root+'.json')).read_bytes()
                assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]
                parts+=['<p>전체 원본 polygons 비교입니다. 원본raw경계는 국내pen순서로 승인되지 않았습니다.</p><div class="pair">'+r.base.full_dictionary('埻')+candidate({'id':root})+'</div>'];body=''.join(parts).encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=r.ThreadingHTTPServer(('127.0.0.1',64695),Handler)
print(json.dumps({'port':64695,'pid':os.getpid(),'wholeVariants':len(names),'pairMapping':'compiled-candidate-pens','candidatePens':11,'nativeApproved':False}),flush=True)
server.serve_forever()
