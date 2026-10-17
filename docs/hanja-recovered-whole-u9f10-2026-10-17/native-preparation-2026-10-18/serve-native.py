#!/usr/bin/env python3
"""Native review preparation only. Private domestic SVG and compiled geometry stay in RAM."""
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os,subprocess,argparse,re
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent.parent
SERVER_SHA=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
A_BYTES=(HERE/'config.json').read_bytes()
A_SHA=hashlib.sha256(A_BYTES).hexdigest()
A=json.loads(A_BYTES)
NODE_CALLER="import assert from 'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{pathToFileURL}from'node:url';\nconst d=process.env.REVIEW_DIR,prep=JSON.parse(readFileSync(d+'/candidate-source-preparation.json')),prior=JSON.parse(readFileSync(d+'/validation.json')),sha=b=>createHash('sha256').update(b).digest('hex'),id=prep.sourceProofIdentity,root=process.env.WHOLE_ROOT;\nfor(const[f,h]of Object.entries({...prep.sourceInputBytePins,...prep.newCompilerBytePins}))assert.equal(sha(readFileSync(d+'/'+f)),h,f);\nassert.equal(root,'u9f10');assert.equal(root,id.sourceRoot);const proof=JSON.parse(readFileSync(d+'/'+id.sourceProofFile));assert.deepEqual(Object.keys(proof).sort(),prep.proofContract.fullProofKeys);assert.equal(sha(JSON.stringify(proof)),prep.proofContract.fullProofSHA256);\nfunction createStrictCompiler(delegate){return function(...args){assert.equal(args.length,3,'Exactly3 recovered-source arguments required');const[trace,full5,identity]=args;assert.deepEqual(identity,id,'Exact recovered proof/capsule/manifest identity7');assert(full5&&typeof full5==='object','Full5 proof required');assert.deepEqual(Object.keys(full5).sort(),prep.proofContract.fullProofKeys,'Exact full5 keys');assert.equal(sha(JSON.stringify(full5)),prep.proofContract.fullProofSHA256,'Exact pinned full5 proof');assert.deepEqual(trace,proof.trace,'Exact original trace');assert.deepEqual(full5,proof,'Full original proof');return delegate(trace,full5,identity)}}\nif(process.env.REVIEW_GUARDS==='1'){let delegated=0;const reject=createStrictCompiler(()=>{delegated++;throw Error('Unexpected source delegation')});const extra=structuredClone(proof);extra.extra=true;const missing=structuredClone(proof);delete missing.defaults;const mutated=structuredClone(proof);mutated.trace[0][0].args[0]+=1;const mismatch=structuredClone(proof.trace);mismatch[0][0].args[0]+=1;const wrongIdentity={...id,sourceManifestFileSha256:'0'.repeat(64)};const cases=[[],[proof.trace],[proof.trace,proof],[proof.trace,proof,id,true],[proof.trace,proof,undefined],[proof.trace,proof,null],[proof.trace,proof,{...id,extra:true}],[proof.trace,proof,wrongIdentity],[proof.trace,proof,{...id,sourceManifestFile:'../missing.json'}],[proof.trace,extra,id],[proof.trace,missing,id],[mutated.trace,mutated,id],[mismatch,proof,id]];for(const args of cases)assert.throws(()=>reject(...args),e=>!String(e).includes('Unexpected source delegation'));assert.equal(delegated,0);console.log(JSON.stringify({ok:true,strictRejections:cases.length,actualSourceCompiles:0,engineExecutions:0,originalProofUnchanged:sha(JSON.stringify(proof))===prep.proofContract.fullProofSHA256}));}\nelse{const m=await import(pathToFileURL(d+'/progressive.mjs'));assert.deepEqual(m.selectedProofIdentity,id);assert.deepEqual(m.sourceGroups,prep.sourceGroupsZeroBased);assert.equal(typeof m.compileProgressive,'function');assert.equal(m.compileSourceWhole,undefined);const before=JSON.stringify(proof),strictCompile=createStrictCompiler(m.compileProgressive),strokes=strictCompile(proof.trace,proof,id);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,15);assert.equal(strokes.flat().length,16);assert.equal(sha(JSON.stringify(strokes)),prep.compiledSHA256);assert.equal(prior.focusedSourceVerification.compiledSHA256,prep.compiledSHA256);console.log(JSON.stringify({sourceRoot:root,pens:15,masks:16,polygons:32,compiledSHA256:sha(JSON.stringify(strokes)),sourceGroups:m.sourceGroups,strokes,render:m.renderProgressive.toString(),sourceCompileRuns:1,engineExecutions:0,nativeApproval:false,runtimeApplied:false}));}\n"
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
    result=prior['focusedSourceVerification']
    assert prep['sourceProofIdentity']==A['selectedProofIdentity']
    assert prep['proofContract']==A['proofContract']
    assert prep['sourceGroupsZeroBased']==A['sourceGroupsZeroBased']
    assert prep['rawRows']==A['rawRows'] and prep['pens']==A['pens'] and prep['polygons']==A['polygons'] and prep['masks']==A['masks']
    assert result['compiledSHA256']==prep['compiledSHA256']==A['expectedCompiledSHA256']
    assert result['runs']==result['positiveCompileRuns']==1 and result['exitCode']==0
    assert result['eachOriginalPolygonExactOnce'] is True
    assert prep['nativeApproval'] is False and prior['nativeApproval'] is False
    assert prep['runtimeApplied'] is False and prior['runtimeApplied'] is False
    module=(source_dir/'progressive.mjs').read_text()
    identity=json.loads(re.search(r'export const selectedProofIdentity=deepFreeze\((\{[^\n]+\})\)',module).group(1))
    grouping=json.loads(re.search(r'export const sourceGroups=deepFreeze\((\[[^\n]+\])\)',module).group(1))
    assert identity==A['selectedProofIdentity'] and grouping==A['sourceGroupsZeroBased']
    assert 'export function compileProgressive(trace, proof, identity)' in module
    assert 'export function compileSourceWhole' not in module
    assert "assert.equal(args.length,3" in NODE_CALLER
    assert sorted(identity)==sorted(A['proofContract']['identityFields'])
    for name,sha_key in [('sourceProofFile','sourceProofFileSha256'),('sourceCapsuleFile','sourceCapsuleFileSha256'),('sourceManifestFile','sourceManifestFileSha256')]:
        assert hashlib.sha256((source_dir/identity[name]).read_bytes()).hexdigest()==identity[sha_key]
    proof=json.loads((source_dir/identity['sourceProofFile']).read_bytes())
    assert sorted(proof)==prep['proofContract']['fullProofKeys']
    assert proof['engineRevision']==prep['proofContract']['engineRevision'] and proof['engineHashes']==prep['proofContract']['engineHashes']
    assert len(proof['trace'])==len(proof['groups'])==A['rawRows']
    assert sum(len(g['polygons'])for g in proof['groups'])==A['polygons']
    for i,row in enumerate(proof['trace']):assert [p for call in row for p in call['polygons']]==proof['groups'][i]['polygons']
    meta=json.loads((HERE/A['domesticMetadataFile']).read_bytes())
    assert meta['glyph']==A['glyph'] and meta['root']==A['selectedWhole']
    assert meta['dictionary']==A['dictionary']
    assert meta['candidate']['strokes']==meta['dictionary']['clips']==A['catalogStrokes']==A['pens']
    assert meta['candidate']['readingGrade']==A['grade']
    return {'ok':True,'glyph':A['glyph'],'sourceRoot':A['selectedWhole'],'pinsVerified':len(A['immutableInputBytePins']),'sourcePreparationFiles':7,'rawRows':A['rawRows'],'pens':A['pens'],'masks':A['masks'],'polygons':A['polygons'],'compiledDataSource':'prior strict source validation; not recompiled during preparation','actualAPI':'compileProgressive(trace,full5,recovered identity7); no compileSourceWhole','newSourceCompiles':0,'engineExecutions':0,'httpRequests':0,'serversStarted':0,'nativeApproval':False,'runtimeApplied':False}
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
    spec=importlib.util.spec_from_file_location('domestic_native_recovered_u9f10',ROOT/'docs/hanja-special2-direction-review-2026-09-21/serve.py')
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
        env={**os.environ,'REVIEW_DIR':str((HERE/A['sourcePreparationDirectory']).resolve()),'WHOLE_ROOT':A['selectedWhole'],'REVIEW_GUARDS':'1'}
        negative=subprocess.run(['rtk','proxy','node','--input-type=module','-e',NODE_CALLER],env=env,capture_output=True)
        assert negative.returncode==0,negative.stderr.decode()
        result['strictNegativeGuard']=json.loads(negative.stdout)
        result['embeddedNodeSyntaxChecks']=1;result['embeddedNodeExitCode']=syntax.returncode
        print(json.dumps(result,ensure_ascii=False));sys.exit(0)
    configure_runtime()
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'glyph':A['glyph'],'port':server.server_address[1],'pid':os.getpid(),'pens':C['pens'],'masks':C['masks'],'sourceCompileRuns':C['sourceCompileRuns'],'engineExecutions':0,'cachedCompiled':True,'privateMediaSaved':False}),flush=True)
    server.serve_forever()
