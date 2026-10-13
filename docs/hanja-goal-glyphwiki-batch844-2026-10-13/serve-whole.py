import sys
sys.dont_write_bytecode=True
import json,importlib.util,os,hashlib,html,subprocess
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs,urlparse
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
metadata=json.loads((HERE/'metadata.json').read_text())
names=["u95d0-ue0103","u95d0-ue0102","u95d0-g","u95d0-itaiji-001"]
WHOLE_PINS={"u95d0-ue0103":"fe951f2ef7ec07326641e14b8dc744073ad9f0a52d2e06069732c2b5e90a7bbb","u95d0-ue0102":"3bdff97f8d34c921e9f6364f1ae558a318439f356426038273261cc2f6a8aa5d","u95d0-g":"925544a2c3fd32747dce17062b2bc5656fb86f181a2cb5c67f4debdd02fd3069","u95d0-itaiji-001":"5c27aba9190482c7edb60f9581f84163ef603f09ed49730f8a90126c973d101d"}
variants={n:json.loads((HERE/('engine-whole-'+n+'.json')).read_text()) for n in names}
for name,pin in WHOLE_PINS.items(): assert hashlib.sha256((HERE/('engine-whole-'+name+'.json')).read_bytes()).hexdigest()==pin

spec=importlib.util.spec_from_file_location('a844_whole_review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[{'glyph':'闐','id':n,'dictionaryStrokes':18,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'raw':i} for i in range(len(variants[n]['groups']))]} for n in names]
r.base.renderer.ENTRIES['闐']={'strokes':18,'dictionary':metadata['dictionary']}
def candidate(entry,end=None):
    groups=variants[entry['id']]['groups']
    if end is not None:groups=groups[:end]
    polygons=[p for g in groups for p in g['polygons']]
    assert all(v['off']==0 for p in polygons for v in p)
    return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in p)+'"/>' for p in polygons)+'</g></svg>'
r.candidate=candidate
def compiled_candidate(root):
    assert root in ('u95d0-g','u95d0-ue0103'), 'Only explicitly selected g or VS3 review profiles may compile'
    module=(HERE/'progressive.mjs').as_uri()
    script=f"""import assert from'node:assert/strict';import{{readFileSync}}from'node:fs';import{{createHash}}from'node:crypto';import{{compileSourceWhole,renderProgressive,wholeSourceIdentities,wholeSourceGroups}}from'{module}';
const sourceRoot={json.dumps(root)},identity=wholeSourceIdentities[sourceRoot];assert(identity);const sourceProofFile=identity.file,sourceProofFileSHA256=identity.fileSHA256;const bytes=readFileSync(new URL(sourceProofFile,'{module}'));assert.equal(createHash('sha256').update(bytes).digest('hex'),sourceProofFileSHA256);assert.equal(identity.archiveSHA256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62');const selected=JSON.parse(bytes),headerBytes=readFileSync(new URL('engine-proof.json','{module}'));assert.equal(createHash('sha256').update(headerBytes).digest('hex'),'925544a2c3fd32747dce17062b2bc5656fb86f181a2cb5c67f4debdd02fd3069');const header=JSON.parse(headerBytes),proof={{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot,sourceProofFile,sourceProofFileSHA256,sourceArchiveSHA256:identity.archiveSHA256}};const before=JSON.stringify(proof);const strokes=compileSourceWhole(sourceRoot,proof.trace,proof,identity),sourceGroups=wholeSourceGroups[sourceRoot];assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,18);assert.equal(sourceGroups.length,18);
console.log(JSON.stringify({{strokes,render:renderProgressive.toString(),sourceRoot,sourceProofFile,sourceProofFileSHA256,sourceGroups,identity}}));"""
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',script]))
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            q=parse_qs(urlparse(self.path).query);root=q.get('id',['u95d0-g'])[0]
            assert root in names
            pairs=[tuple(map(int,v.split(':'))) for v in q.get('pairs',[''])[0].split(',') if v]
            parts=['<!doctype html><meta charset="utf-8"><title>闐 compiled pen 비교</title><style>body{font:16px system-ui;margin:12px;width:1112px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}button,a{margin:8px}section{border-bottom:1px solid #ddd}.candidate{width:420px}.pair b{display:block}h2{font-size:18px}.pairs{display:grid;grid-template-columns:556px 556px}.pairs section{width:550px}.pairs .pair{gap:16px}.pairs .pair svg{width:200px;height:210px}.pairs .candidate{width:210px}</style><h1>闐 · '+html.escape(root)+'</h1>']
            parts+=['<a href="?id='+n+'">전체 '+n+'</a>' for n in names]
            parts+=['<p>선택 원본: raw '+str(len(variants[root]['groups']))+' · draw '+str(sum(len(calls) for calls in variants[root]['trace']))+' · 원본 윤곽 '+str(sum(len(group['polygons']) for group in variants[root]['groups']))+' · '+('명시 컴파일 검토 후보' if root in ('u95d0-g','u95d0-ue0103') else '전체 원본 비교만 지원, 컴파일 선택하지 않음')+' · 국내 자형·필순 미승인</p>']
            parts+=['<p>전체 원본 비교 가능: 4종. 컴파일 검토 후보: u95d0-g 또는 VS3. native fine·경계·재생은 미승인. 미확보 u95d0·u95d0-ue0100·u95d0-ue0101: 고정 의존 u76ee-j 누락, 최신 자료 대체 없음.</p>']
            parts+=['<a href="?id='+selected+'&pairs='+','.join(str(i)+':'+str(i) for i in range(1,19))+'">국내 전18 / '+selected+' compiled 후보</a>' for selected in ('u95d0-g','u95d0-ue0103')]
            if pairs:
                compiled=compiled_candidate(root)
                assert len(compiled['strokes'])==18
                for left,right in pairs:assert 1<=left<=18 and 1<=right<=18
                if q.get('view')==['checks']:
                    body=json.dumps({'mapping':'exact-compiled-candidate-pens','root':root,'candidatePens':18,'masks':sum(len(p) for p in compiled['strokes']),'pairs':[{'domestic':left,'candidate':right,'raw':compiled['sourceGroups'][right-1]} for left,right in pairs],'sourceProofFile':compiled['sourceProofFile'],'sourceProofFileSHA256':compiled['sourceProofFileSHA256'],'nativeApproval':False}).encode();mime='application/json'
                else:
                    parts+=['<p>왼쪽 국내 방향 · 오른쪽 원본 compiler 후보 pen. domestic 대응과 native 승인은 미검토.</p><button onclick="show(.25)">25%</button><button onclick="show(.5)">50%</button><button onclick="show(.75)">75%</button><button onclick="show(.9999)">99.99%</button><button onclick="show(1)">100%</button><div class="pairs">']
                    for index,(left,right) in enumerate(pairs):
                        parts+=['<section><h2>국내 '+str(left)+' / 후보 '+str(right)+' · source raw '+html.escape(str(compiled['sourceGroups'][right-1]))+'</h2><div class="pair">'+r.base.renderer.dictionary_svg('闐',left,True,'pair'+str(index))+'<div class="candidate" id="candidate'+str(index)+'"></div></div></section>']
                    parts+=['</div><script>const strokes='+json.dumps(compiled['strokes'])+';const pens='+json.dumps([right for left,right in pairs])+';const render='+compiled['render']+';function show(p){pens.forEach((pen,i)=>document.getElementById("candidate"+i).innerHTML=render(strokes,pen,p,"pair"+i));}show(1);</script><p>매 요청 pinned whole byte SHA·engine header·compiler identity 확인. 사전 SVG RAM-only.</p>'];body=''.join(parts).encode();mime='text/html; charset=utf-8'
            else:
                raw=(HERE/('engine-whole-'+root+'.json')).read_bytes()
                assert hashlib.sha256(raw).hexdigest()==WHOLE_PINS[root]
                parts+=['<p>전체 원본 polygons 비교입니다. 원본raw경계는 국내pen순서로 승인되지 않았습니다.</p><div class="pair">'+r.base.full_dictionary('闐')+candidate({'id':root})+'</div>'];body=''.join(parts).encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=r.ThreadingHTTPServer(('127.0.0.1',64658),Handler)
print(json.dumps({'port':64658,'pid':os.getpid(),'wholeVariants':len(names),'pairMapping':'compiled-candidate-pens','candidatePens':18,'nativeApproved':False}),flush=True)
server.serve_forever()
