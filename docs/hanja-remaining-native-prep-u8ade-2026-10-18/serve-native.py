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
NODE_CALLER="import assert from 'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{pathToFileURL}from'node:url';\nconst d=process.env.REVIEW_DIR,prep=JSON.parse(readFileSync(d+'/candidate-source-preparation.json')),prior=JSON.parse(readFileSync(d+'/validation.json')),sha=b=>createHash('sha256').update(b).digest('hex');\nfor(const[f,h]of Object.entries(prep.immutableInputBytePins))assert.equal(sha(readFileSync(d+'/'+f)),h,f);\nconst m=await import(pathToFileURL(d+'/progressive.mjs')),id=prep.selectedProofIdentity,root=process.env.WHOLE_ROOT;assert.equal(root,\"u8ade@8\");assert.equal(root,id.sourceRoot);assert.deepEqual(m.selectedProofIdentity,id);assert.deepEqual(m.sourceGroups,prep.sourceGroupsZeroBased);assert.equal(typeof m.compileProgressive,'function');assert.equal(m.compileSourceWhole,undefined);assert.equal(m.sourceRoot,undefined);\nconst proof=JSON.parse(readFileSync(d+'/'+id.sourceProofFile));assert.deepEqual(Object.keys(proof).sort(),prep.proofContract.fullProofFields);assert.equal(sha(JSON.stringify(proof)),prep.proofContract.fullProofJSONSha256);const before=JSON.stringify(proof);\nconst strokes=m.compileProgressive(proof.trace,proof,id);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,16);assert.equal(strokes.flat().length,17);assert.equal(sha(JSON.stringify(strokes)),prior.focusedVerification.result.compiledSHA256);\nconsole.log(JSON.stringify({sourceRoot:root,pens:strokes.length,masks:strokes.flat().length,polygons:32,compiledSHA256:sha(JSON.stringify(strokes)),sourceGroups:m.sourceGroups,strokes,render:m.renderProgressive.toString(),nativeApproval:false,runtimeApplied:false}));\n"
C=None
review=None
def guards():
    assert hashlib.sha256(Path(__file__).read_bytes()).hexdigest()==SERVER_SHA==A['helperSHA256'],'helper code changed'
    assert hashlib.sha256((HERE/'config.json').read_bytes()).hexdigest()==A_SHA,'native preparation config changed'
    assert hashlib.sha256(NODE_CALLER.encode()).hexdigest()==A['nodeCallerSHA256'],'RAM caller changed'
    for f,sha in A['immutableInputBytePins'].items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==sha,'pinned input changed: '+f
def source_guard():
    guards()
    source_dir=(HERE/A['sourcePreparationDirectory']).resolve()
    prep=json.loads((source_dir/'candidate-source-preparation.json').read_bytes())
    prior=json.loads((source_dir/'validation.json').read_bytes())
    result=prior['focusedVerification']['result']
    assert prep['selectedProofIdentity']==A['selectedProofIdentity']
    assert prep['proofContract']==A['proofContract']
    assert prep['sourceGroupsZeroBased']==A['sourceGroupsZeroBased']
    assert prep['rawRows']==A['rawRows'] and prep['pens']==A['pens'] and prep['sourcePolygons']==A['polygons']
    assert prep['expectedMasks']==A['masks']
    assert result['compiledSHA256']==A['expectedCompiledSHA256']
    assert prior['focusedVerification']['executions']==prior['focusedVerification']['positiveCompileRuns']==1
    assert prior['focusedVerification']['exitCode']==0 and result['eachOriginalPolygonExactOnce'] is True
    assert prep['nativeApproved'] is False and prior['nativeApproved'] is False
    assert prep['runtimeApplied'] is False and prior['runtimeApplied'] is False
    module=(source_dir/'progressive.mjs').read_text()
    identity=json.loads(re.search(r'export const selectedProofIdentity=deepFreeze\((\{[^\n]+\})\)',module).group(1))
    grouping=json.loads(re.search(r'export const sourceGroups=deepFreeze\((\[[^\n]+\])\)',module).group(1))
    assert identity==A['selectedProofIdentity'] and grouping==A['sourceGroupsZeroBased']
    assert 'export function compileProgressive(trace, proof, identity)' in module
    assert 'assert.equal(arguments.length,3' in module
    assert 'export function compileSourceWhole' not in module and 'export const sourceRoot' not in module
    assert 'm.compileProgressive(proof.trace,proof,id)' in NODE_CALLER and 'm.compileSourceWhole(' not in NODE_CALLER
    identity=prep['selectedProofIdentity']
    assert sorted(identity)==sorted(A['proofContract']['identityFields'])
    for name,sha_key in [('sourceProofFile','sourceProofFileSha256'),('sourceCapsuleFile','sourceCapsuleFileSha256'),('sourceChecksFile','sourceChecksFileSha256')]:
        assert hashlib.sha256((source_dir/identity[name]).read_bytes()).hexdigest()==identity[sha_key]
    proof=json.loads((source_dir/identity['sourceProofFile']).read_bytes())
    assert sorted(proof)==prep['proofContract']['fullProofFields']
    assert proof['engineRevision']==prep['proofContract']['engineRevision'] and proof['engineHashes']==prep['proofContract']['engineHashes']
    assert len(proof['trace'])==len(proof['groups'])==A['rawRows']
    assert sum(len(g['polygons'])for g in proof['groups'])==A['polygons']
    for i,trace_row in enumerate(proof['trace']):assert [p for call in trace_row for p in call['polygons']]==proof['groups'][i]['polygons']
    inv=json.loads((HERE/A['dictionaryInventory']).read_bytes());row=next(r for r in inv['rows']if r[0]==A['glyph'])
    assert row==A['inventoryRow'];item=dict(zip(inv['fields'],row))
    assert item['catalogStrokes']==item['displayedStrokes']==item['outlineCount']==item['animatedCount']==item['stepImageCount']==A['pens']==A['catalogStrokes']
    assert item['svgUrl']==A['dictionary']['url'] and item['svgSha256']==A['dictionary']['sha256'] and item['svgBytes']==A['dictionary']['bytes']
    assert item['svgRootId']==A['dictionaryRootId'] and item['timingSequenceValid'] is True and item['clipCoverageValid'] is True
    return {'ok':True,'glyph':A['glyph'],'sourceRoot':A['selectedWhole'],'pinsVerified':len(A['immutableInputBytePins']),'sourcePreparationFiles':7,'rawRows':A['rawRows'],'pens':A['pens'],'masks':A['masks'],'polygons':A['polygons'],'compiledDataSource':'prior strict source validation; not recompiled','actualAPI':'compileProgressive(trace,full5,identity7); no compileSourceWhole/sourceRoot export','newSourceCompiles':0,'engineExecutions':0,'httpRequests':0,'serversStarted':0,'nativeApproval':False,'runtimeApplied':False}
def compiled(root=None):
    global C
    guards();root=root or A['selectedWhole'];assert root==A['selectedWhole'],'No alias, alternative source or dependency fallback'
    if C is None:
        env={**os.environ,'REVIEW_DIR':str((HERE/A['sourcePreparationDirectory']).resolve()),'WHOLE_ROOT':root}
        C=json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',NODE_CALLER],env=env))
    assert C['sourceRoot']==root and C['compiledSHA256']==A['expectedCompiledSHA256']
    return C
def configure_runtime():
    global review
    source_guard()
    spec=importlib.util.spec_from_file_location('domestic_native_u8ade',ROOT/'docs/hanja-special2-direction-review-2026-09-21/serve.py')
    review=importlib.util.module_from_spec(spec);spec.loader.exec_module(review)
    review.renderer.ENTRIES={A['glyph']:{'strokes':A['catalogStrokes'],'dictionary':A['dictionary']}}
    compiled();data=review.renderer.source(A['glyph']);assert len(data['strokes'])==A['dictionary']['clips']
def full_domestic():
    data=review.renderer.source(A['glyph'])
    assert len(data['strokes'])==A['dictionary']['clips']
    paths=''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])
    return '<svg viewBox="0 0 1024 1024"><g transform="'+data['transform']+'">'+paths+'</g></svg>'
def public_whole(root):
    guards();assert root==A['selectedWhole'],'Only exact selected whole has been prepared'
    source_dir=(HERE/A['sourcePreparationDirectory']).resolve()
    p=json.loads((source_dir/A['selectedProofIdentity']['sourceProofFile']).read_bytes())
    assert sorted(p)==['defaults','engineHashes','engineRevision','groups','trace']
    polygons=[]
    for g in p['groups']:
        for poly in g['polygons']:
            assert all(v['off']==0 for v in poly)
            polygons.append('<polygon points="'+' '.join(str(v['x'])+','+str(v['y'])for v in poly)+'"/>')
    return '<svg viewBox="0 0 200 200">'+''.join(polygons)+'</svg>'
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
                body='<!doctype html><meta charset="utf-8"><title>'+A['glyph']+' source-only</title><style>body{font:16px system-ui;margin:18px;width:1112px}svg{width:320px;height:320px}.pair{display:flex;gap:25px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.grid svg{width:200px;height:210px}button,a{margin:6px;display:inline-block}</style><h1>'+A['glyph']+' · 원본 후보 '+str(c['pens'])+'획</h1>'+links+'<p>국내 필순 승인 전. 국내 SVG는 RAM에만 보관. 오른쪽은 raw prefix가 아닌 compiled candidate pen.</p>'
                if route=='/whole' or route=='/':
                    s={'wholeNames':[A['selectedWhole']]}
                    if 'root'in q:assert root in s['wholeNames'],'unsupported whole'
                    variants=[root]if 'root'in q else s['wholeNames']
                    body+='<div class="pair"><div>국내 전체'+full_domestic()+'</div><div id="compiledWhole">compiled 전체</div></div>'
                    body+='<div class="grid">'+''.join('<div>'+html.escape(v)+public_whole(v)+'</div>'for v in variants)+'</div>'
                    body+='<script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';compiledWhole.innerHTML+=render(strokes,strokes.length,1,"whole");</script>'
                elif route=='/pairs':
                    body+='<div class="grid">'
                    for n in range(1,c['pens']+1):
                        domestic=review.renderer.dictionary_svg(A['glyph'],n,True,'pair'+str(n))
                        body+='<div><a href="/progressive?stroke='+str(n)+'&enlarged=1">'+str(n)+'획 확대</a><div class="pair">'+domestic+'<div id="candidate'+str(n)+'"></div></div></div>'
                    body+='</div><script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';for(let n=1;n<=strokes.length;n++)document.getElementById("candidate"+n).innerHTML=render(strokes,n,.75,"pair"+n);</script>'
                elif route=='/progressive':
                    n=int(q.get('stroke',['1'])[0]);assert 1<=n<=c['pens'],'unsupported stroke'
                    masks=c['strokes'][n-1];total=sum(m['weight']for m in masks);cumulative=0;boundary=[]
                    for i,m in enumerate(masks[:-1],1):
                        cumulative+=m['weight'];b=cumulative/total
                        for label,value in [('직전',max(0,b-1e-10)),('경계',b),('직후',min(1,b+1e-10))]:boundary.append('<button onclick="show('+repr(value)+')">마스크 '+str(i+1)+' '+label+'</button>')
                    body+=''.join('<a href="?stroke='+str(i)+'&enlarged=1">'+str(i)+'</a>'for i in range(1,c['pens']+1))
                    if q.get('enlarged',['0'])[0]=='1':body+='<style>body{width:1200px}.pair svg{width:520px;height:520px}</style>'
                    body+='<h2>'+str(n)+'획 · '+str(len(masks))+' masks</h2><div class="pair">'+review.renderer.dictionary_svg(A['glyph'],n,True,'dom'+str(n))+'<div id="candidate"></div></div>'
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
    print(json.dumps({'glyph':A['glyph'],'port':server.server_address[1],'pid':os.getpid(),'pens':C['pens'],'masks':C['masks'],'privateMediaSaved':False}),flush=True)
    server.serve_forever()
