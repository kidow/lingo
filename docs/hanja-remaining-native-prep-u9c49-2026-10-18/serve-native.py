#!/usr/bin/env python3
"""Native review preparation only. Private domestic SVG and compiled geometry stay in RAM."""
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os,subprocess,argparse,re
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
SERVER_SHA=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
A_BYTES=(HERE/'config.json').read_bytes()
A_SHA=hashlib.sha256(A_BYTES).hexdigest()
A=json.loads(A_BYTES)
NODE_CALLER="import assert from 'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{pathToFileURL}from'node:url';\nconst d=process.env.REVIEW_DIR,n=process.env.NATIVE_PREP_DIR,a=JSON.parse(readFileSync(n+'/config.json')),prep=JSON.parse(readFileSync(d+'/candidate-source-preparation.json')),sha=b=>createHash('sha256').update(b).digest('hex');\nfor(const[f,h]of Object.entries(a.immutableInputBytePins))assert.equal(sha(readFileSync(n+'/'+f)),h,f);\nconst m=await import(pathToFileURL(d+'/progressive.mjs')),id=prep.selectedProofIdentity,root=process.env.WHOLE_ROOT;assert.equal(root,a.selectedWhole);assert.equal(root,id.sourceRoot);assert.deepEqual(id,a.selectedProofIdentity);assert.deepEqual(m.selectedProofIdentity,id);assert.deepEqual(m.sourceGroups,prep.sourceGroupsZeroBased);\nconst bytes=readFileSync(d+'/'+id.sourceProofFile);assert.equal(sha(bytes),id.sourceProofFileSha256);const p=JSON.parse(bytes);assert.deepEqual(Object.keys(p).sort(),prep.proofContract.fullProofFields);assert.equal(sha(JSON.stringify(p)),prep.proofContract.fullProofJSONSha256);const before=JSON.stringify(p);\nconst strokes=m.compileProgressive(p.trace,p,id);assert.equal(JSON.stringify(p),before);assert.equal(strokes.length,a.sourcePens);assert.equal(strokes.flat().length,a.sourceMasks);assert.equal(sha(JSON.stringify(strokes)),a.expectedCompiledSHA256);\nconsole.log(JSON.stringify({sourceRoot:root,pens:strokes.length,masks:strokes.flat().length,polygons:a.sourcePolygons,compiledSHA256:sha(JSON.stringify(strokes)),sourceGroups:m.sourceGroups,strokes,render:m.renderProgressive.toString(),countMismatch:true,sourcePens:a.sourcePens,domesticClips:a.domesticClips,catalogStrokes:a.catalogStrokes,nativeApproval:false,runtimeApplied:false}));\n"
C=None
review=None
def guards():
    assert hashlib.sha256(Path(__file__).read_bytes()).hexdigest()==SERVER_SHA==A['helperSHA256'],'helper code changed'
    assert hashlib.sha256((HERE/'config.json').read_bytes()).hexdigest()==A_SHA,'native preparation config changed'
    assert hashlib.sha256(NODE_CALLER.encode()).hexdigest()==A['nodeCallerSHA256'],'RAM caller changed'
    for f,sha in A['immutableInputBytePins'].items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==sha,'pinned input changed: '+f
def at_path(value,path):
    for key in path:value=value[key]
    return value
def source_guard():
    guards()
    assert A['countMismatch'] is True and A['sourcePens']!=A['domesticClips']
    source_dir=(HERE/A['sourcePreparationDirectory']).resolve()
    prep=json.loads((source_dir/'candidate-source-preparation.json').read_bytes())
    prior=json.loads((source_dir/'validation.json').read_bytes())
    result=at_path(prior,A['priorResultPath'])
    assert prep['selectedProofIdentity']==A['selectedProofIdentity']
    assert prep['proofContract']==A['proofContract'] and prep['proofContract']['arguments']==3
    assert prep['sourceGroupsZeroBased']==A['sourceGroupsZeroBased']
    assert prep['catalog']['strokes']==prep['pens']==A['catalogStrokes']==A['sourcePens']
    assert prep['rawRows']==A['sourceRawRows'] and prep['sourcePolygons']==A['sourcePolygons']
    assert result['compiledSHA256']==A['expectedCompiledSHA256'] and result['pens']==A['sourcePens'] and result['masks']==A['sourceMasks']
    assert result['eachOriginalPolygonExactOnce'] is True and at_path(prior,A['priorPositivePath'])==1
    assert prep['nativeApproved'] is False and prep['runtimeApplied'] is False
    module=(source_dir/'progressive.mjs').read_text()
    identity=json.loads(re.search(r'export const selectedProofIdentity=deepFreeze\((\{[^\n]+\})\)',module).group(1))
    grouping=json.loads(re.search(r'export const sourceGroups=deepFreeze\((\[[^\n]+\])\)',module).group(1))
    assert identity==A['selectedProofIdentity'] and grouping==A['sourceGroupsZeroBased']
    assert re.search(r'assert.equal\(arguments.length,\s*3',module)
    assert 'm.compileProgressive(p.trace,p,id)' in NODE_CALLER
    assert 'm.compileSourceWhole(' not in NODE_CALLER
    id=prep['selectedProofIdentity']
    for file_key,sha_key in [('sourceProofFile','sourceProofFileSha256'),('sourceCapsuleFile','sourceCapsuleFileSha256'),('sourceChecksFile','sourceChecksFileSha256')]:
        assert hashlib.sha256((source_dir/id[file_key]).read_bytes()).hexdigest()==id[sha_key]
    proof=json.loads((source_dir/id['sourceProofFile']).read_bytes())
    assert sorted(proof)==prep['proofContract']['fullProofFields']
    assert proof['engineRevision']==prep['proofContract']['engineRevision'] and proof['engineHashes']==prep['proofContract']['engineHashes']
    assert len(proof['trace'])==len(proof['groups'])==A['sourceRawRows']
    assert sum(len(g['polygons'])for g in proof['groups'])==A['sourcePolygons']
    for i,row in enumerate(proof['trace']):assert [p for call in row for p in call['polygons']]==proof['groups'][i]['polygons']
    inv=json.loads((HERE/A['dictionaryInventory']).read_bytes());row=next(r for r in inv['rows']if r[0]==A['glyph'])
    assert row==A['inventoryRow'];item=dict(zip(inv['fields'],row))
    assert item['catalogStrokes']==A['catalogStrokes']
    assert item['displayedStrokes']==item['outlineCount']==item['animatedCount']==item['stepImageCount']==A['domesticClips']
    assert item['svgHttpStatus']==200 and item['svgTitle']==A['glyph']
    assert item['svgUrl']==A['dictionary']['url'] and item['svgSha256']==A['dictionary']['sha256'] and item['svgBytes']==A['dictionary']['bytes']
    assert item['svgRootId']==A['dictionaryRootId'] and item['timingSequenceValid'] is True and item['clipCoverageValid'] is True
    assert A['nativeApproval'] is False and A['runtimeApplied'] is False and A['automaticStrokeMapping'] is False
    return {'ok':True,'glyph':A['glyph'],'countMismatch':True,'sourcePens':A['sourcePens'],'domesticClips':A['domesticClips'],'catalogStrokes':A['catalogStrokes'],'pinsVerified':len(A['immutableInputBytePins']),'sourcePreparationFiles':7,'rawRows':A['sourceRawRows'],'masks':A['sourceMasks'],'polygons':A['sourcePolygons'],'sourceAPI':'compileProgressive3','automaticStrokeMapping':False,'newSourceCompiles':0,'engineExecutions':0,'httpRequests':0,'serversStarted':0,'nativeApproval':False,'runtimeApplied':False}
def compiled(root=None):
    global C
    guards();root=root or A['selectedWhole'];assert root==A['selectedWhole'],'No alias, alternative source or dependency fallback'
    if C is None:
        env={**os.environ,'REVIEW_DIR':str((HERE/A['sourcePreparationDirectory']).resolve()),'WHOLE_ROOT':root,'NATIVE_PREP_DIR':str(HERE)}
        C=json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',NODE_CALLER],env=env))
    assert C['sourceRoot']==root and C['compiledSHA256']==A['expectedCompiledSHA256']
    return C
def configure_runtime():
    global review
    source_guard()
    spec=importlib.util.spec_from_file_location('domestic_native_'+A['glyph'],ROOT/'docs/hanja-special2-direction-review-2026-09-21/serve.py')
    review=importlib.util.module_from_spec(spec);spec.loader.exec_module(review)
    review.renderer.ENTRIES={A['glyph']:{'strokes':A['domesticClips'],'dictionary':A['dictionary']}}
    compiled();data=review.renderer.source(A['glyph']);assert len(data['strokes'])==A['domesticClips']
def full_domestic():
    data=review.renderer.source(A['glyph'])
    assert len(data['strokes'])==A['dictionary']['clips']
    paths=''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])
    return '<svg viewBox="0 0 1024 1024"><g transform="'+data['transform']+'">'+paths+'</g></svg>'
def public_whole(root):
    guards();assert root==A['selectedWhole'],'고정된 선택 whole만 지원합니다.'
    source_dir=(HERE/A['sourcePreparationDirectory']).resolve()
    p=json.loads((source_dir/A['selectedProofIdentity']['sourceProofFile']).read_bytes())
    assert sorted(p)==['defaults','engineHashes','engineRevision','groups','trace']
    polygons=[]
    for g in p['groups']:
        for poly in g['polygons']:
            assert all(v['off']==0 for v in poly)
            polygons.append('<polygon points="'+' '.join(str(v['x'])+','+str(v['y'])for v in poly)+'"/>')
    return '<svg viewBox="0 0 200 200">'+''.join(polygons)+'</svg>'
def optional_pen(q,key,limit):
    value=q.get(key,[''])[0]
    if value=='':return None
    n=int(value);assert 1<=n<=limit,'선택한 획이 범위를 벗어났습니다.'
    return n
def independent_controls(q):
    controls='<form action="/pairs" method="get"><p>획수 불일치: 자동1:1 대응을 하지 않습니다.</p>'
    for key,label,limit in [('domestic','국내',A['domesticClips']),('sourcePen','source',A['sourcePens'])]:
        selected=optional_pen(q,key,limit)
        controls+='<label>'+label+' <select name="'+key+'"><option value="">선택 안함</option>'
        for i in range(1,limit+1):controls+='<option value="'+str(i)+'"'+(' selected'if selected==i else '')+'>'+str(i)+'획</option>'
        controls+='</select></label>'
    return controls+'<button type="submit">독립 선택 비교</button></form>'
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            u=urlparse(self.path);q=parse_qs(u.query);route=u.path
            root=q.get('root',[A['selectedWhole']])[0]
            c=compiled(root if route!='/whole' else None)
            if route=='/checks':
                out=json.dumps({k:v for k,v in c.items()if k not in ['strokes','render']},ensure_ascii=False).encode()
                kind='application/json'
            else:
                links='<a href="/whole">whole</a> <a href="/pairs">국내 방향 ↔ compiled pen</a> <a href="/progressive?stroke=1&enlarged=1">progressive</a>'
                body='<!doctype html><meta charset="utf-8"><title>'+A['glyph']+' source-only</title><style>body{font:16px system-ui;margin:18px;width:1112px}svg{width:320px;height:320px}.pair{display:flex;gap:25px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.grid svg{width:200px;height:210px}button,a{margin:6px;display:inline-block}</style><h1>'+A['glyph']+' · 획수 불일치 비교</h1><p>카탈로그 '+str(A['catalogStrokes'])+'획 / source '+str(A['sourcePens'])+'획 / 국내 '+str(A['domesticClips'])+'획</p>'+links+'<p>국내 필순 승인 전. 국내 SVG는 RAM에만 보관. 국내와 source는 획수가 다릅니다. 양쪽 획은 독립 선택하며 같은 번호의 대응을 가정하지 않습니다.</p>'
                if route=='/whole' or route=='/':
                    s={'wholeNames':[A['selectedWhole']]}
                    if 'root'in q:assert root in s['wholeNames'],'unsupported whole'
                    variants=[root]if 'root'in q else s['wholeNames']
                    body+='<div class="pair"><div>국내 전체'+full_domestic()+'</div><div id="compiledWhole">compiled 전체</div></div>'
                    body+='<div class="grid">'+''.join('<div>'+html.escape(v)+public_whole(v)+'</div>'for v in variants)+'</div>'
                    body+='<script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';compiledWhole.innerHTML+=render(strokes,strokes.length,1,"whole");</script>'
                elif route=='/pairs':
                    body+=independent_controls(q)
                    domestic_pen=optional_pen(q,'domestic',A['domesticClips'])
                    source_pen=optional_pen(q,'sourcePen',A['sourcePens'])
                    left=review.renderer.dictionary_svg(A['glyph'],domestic_pen,True,'independent-dom')if domestic_pen else '<p>국내 획을 독립 선택하세요.</p>'
                    right='<div id="independentCandidate"></div>'if source_pen else '<p>source 획을 독립 선택하세요.</p>'
                    body+='<div class="pair"><div>국내 '+str(domestic_pen or '')+left+'</div><div>source '+str(source_pen or '')+right+'</div></div>'
                    if source_pen:body+='<script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';independentCandidate.innerHTML=render(strokes,'+str(source_pen)+',.75,"independent");</script>'
                elif route=='/progressive':
                    n=int(q.get('stroke',['1'])[0]);assert 1<=n<=c['pens'],'unsupported stroke'
                    masks=c['strokes'][n-1];total=sum(m['weight']for m in masks);cumulative=0;boundary=[]
                    for i,m in enumerate(masks[:-1],1):
                        cumulative+=m['weight'];b=cumulative/total
                        for label,value in [('직전',max(0,b-1e-10)),('경계',b),('직후',min(1,b+1e-10))]:boundary.append('<button onclick="show('+repr(value)+')">마스크 '+str(i+1)+' '+label+'</button>')
                    body+=''.join('<a href="?stroke='+str(i)+'&enlarged=1">'+str(i)+'</a>'for i in range(1,c['pens']+1))
                    if q.get('enlarged',['0'])[0]=='1':body+='<style>body{width:1200px}.pair svg{width:520px;height:520px}</style>'
                    domestic_pen=optional_pen(q,'domestic',A['domesticClips'])
                    left=review.renderer.dictionary_svg(A['glyph'],domestic_pen,True,'selected-dom')if domestic_pen else full_domestic()
                    body+='<h2>source '+str(n)+'획 · '+str(len(masks))+' masks</h2><p>왼쪽: '+('독립 선택한 국내 '+str(domestic_pen)+'획'if domestic_pen else '국내 전체: source 획과 대응시키지 않음')+'</p><div class="pair"><div>'+left+'</div><div id="candidate"></div></div>'
                    body+=''.join('<button onclick="show('+repr(p)+')">'+label+'</button>'for label,p in [('0%',0),('50%',.5),('75%',.75),('95%',.95),('99%',.99),('99.99%',.9999),('100%',1)])+''.join(boundary)
                    body+='<button id="play">재생</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0" step=".0001"><output id="value"></output>'
                    body+='<script>const strokes='+json.dumps(c['strokes'])+';const stroke='+str(n)+';const render='+c['render']+';const show=p=>{candidate.innerHTML=render(strokes,stroke,p,"live");progress.value=p*100;value.textContent=(p*100).toFixed(4)+"%"};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};show(0);</script>'
                    if q.get('samples',['0'])[0]=='1':
                        body+='<style>.coarse{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.coarse svg{width:170px;height:170px}</style><div class="coarse" id="coarseSamples"></div><script>[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{coarseSamples.innerHTML+="<div>"+(p*100)+"%"+render(strokes,stroke,p,"coarse"+i)+"</div>"});</script>'
                else:raise ValueError('unsupported route')
                out=body.encode();kind='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',kind);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(out)
        except Exception as e:self.send_error(409,str(e))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    if args.check_only:
        result=source_guard()
        syntax=subprocess.run(['rtk','proxy','node','--check','--input-type=module'],input=NODE_CALLER.encode(),capture_output=True)
        assert syntax.returncode==0,syntax.stderr.decode()
        result['embeddedNodeSyntaxChecks']=1;result['embeddedNodeExitCode']=syntax.returncode
        print(json.dumps(result,ensure_ascii=False));sys.exit(0)
    configure_runtime()
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'glyph':A['glyph'],'port':server.server_address[1],'pid':os.getpid(),'sourcePens':C['pens'],'domesticClips':A['domesticClips'],'catalogStrokes':A['catalogStrokes'],'countMismatch':True,'masks':C['masks'],'privateMediaSaved':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
