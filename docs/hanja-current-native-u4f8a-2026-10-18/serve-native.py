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
P_BYTES=(HERE/'validation.json').read_bytes()
P_SHA=hashlib.sha256(P_BYTES).hexdigest()
P=json.loads(P_BYTES)
NODE_CALLER="import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{pathToFileURL}from'node:url';const d=process.env.REVIEW_DIR,sha=b=>createHash('sha256').update(b).digest('hex'),profile=JSON.parse(readFileSync(d+'/source-profile.json')),prior=JSON.parse(readFileSync(d+'/validation.json')),id=profile.identity,root=process.env.WHOLE_ROOT;assert.equal(root,id.sourceRoot);const proofBytes=readFileSync(d+'/'+id.sourceProofFile),proof=JSON.parse(proofBytes),capBytes=readFileSync(d+'/'+id.sourceCapsuleFile);assert.equal(sha(proofBytes),id.sourceProofFileSha256);assert.equal(sha(capBytes),id.sourceCapsuleFileSha256);assert.deepEqual(Object.keys(proof).sort(),profile.fullProofKeys);assert.equal(sha(JSON.stringify(proof)),profile.fullProofSHA256);const cacheBytes=readFileSync(d+'/compiled-u4f8a.json'),cached=JSON.parse(cacheBytes);assert.equal(sha(cacheBytes),prior.compiled.fileSHA256);assert.equal(sha(JSON.stringify(cached)),prior.compiled.SHA256);function strict(delegate){return function(...args){assert.equal(args.length,3);const[trace,full5,identity]=args;assert.deepEqual(identity,id);assert.deepEqual(full5,proof);assert.deepEqual(trace,proof.trace);return delegate(trace,full5,identity)}}if(process.env.REVIEW_GUARDS==='1'){let delegated=0;const checked=strict(()=>{delegated++;throw Error('DELEGATE')});const cases=[[],[proof.trace],[proof.trace,proof],[proof.trace,proof,id,true],[proof.trace,proof,null],[proof.trace,proof,{...id,extra:true}]];for(const k of Object.keys(id)){const q={...id};delete q[k];cases.push([proof.trace,proof,q]);cases.push([proof.trace,proof,{...id,[k]:'wrong'}])}for(const mutate of [p=>p.extra=true,p=>delete p.defaults,p=>p.trace[0][0].args[0]++,p=>p.groups[0].polygons[0][0].x++]){const p=structuredClone(proof);mutate(p);cases.push([p.trace,p,id])}for(const a of cases)assert.throws(()=>Reflect.apply(checked,null,a),e=>!String(e).includes('DELEGATE'));assert.equal(delegated,0);console.log(JSON.stringify({passed:true,strictRejections:cases.length,sourceCompilerRuns:0,engineRuns:0}))}else{const m=await import(pathToFileURL(d+'/progressive.mjs'));assert.deepEqual(m.selectedProofIdentity,id);assert.deepEqual(m.sourceGroups,profile.sourceGroups);assert.equal(m.sourceRoot,root);assert.equal(m.sourceCompileCallCount(),0);assert.equal(typeof m.compileProgressive,'function');assert.equal(typeof m.compileSourceWhole,'function');assert.equal(cached.length,8);assert.equal(cached.flat().length,8);console.log(JSON.stringify({sourceRoot:root,pens:8,masks:8,polygons:22,compiledSHA256:prior.compiled.SHA256,sourceGroups:m.sourceGroups,strokes:cached,render:m.renderProgressive.toString(),sourceCompileRuns:0,engineExecutions:0,publicCompiledCache:true,nativeApproval:false,runtimeApplied:false}))}"
C=None
review=None
def guards():
    assert hashlib.sha256(Path(__file__).read_bytes()).hexdigest()==SERVER_SHA==A['helperSHA256'],'helper code changed'
    assert hashlib.sha256((HERE/'config.json').read_bytes()).hexdigest()==A_SHA,'native preparation config changed'
    assert hashlib.sha256(NODE_CALLER.encode()).hexdigest()==A['nodeCallerSHA256'],'RAM caller changed'
    assert hashlib.sha256((HERE/'validation.json').read_bytes()).hexdigest()==P_SHA,'preparation changed'
    assert P['newFilesSHA256']['serve-native.py']==SERVER_SHA and P['newFilesSHA256']['config.json']==A_SHA,'new helper/config pins changed'
    for f,sha in P['newFilesSHA256'].items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==sha,'own helper input changed: '+f
    for f,sha in A['immutableInputBytePins'].items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==sha,'pinned input changed: '+f
def source_guard():
    guards()
    source_dir=(HERE/A['sourcePreparationDirectory']).resolve()
    profile=json.loads((source_dir/'source-profile.json').read_bytes())
    prior=json.loads((source_dir/'validation.json').read_bytes())
    assert profile['identity']==A['selectedProofIdentity']
    assert profile['fullProofKeys']==A['proofContract']['fullProofKeys']
    assert profile['fullProofSHA256']==A['proofContract']['fullProofSHA256']
    assert profile['externalMandatoryArguments']==[3,4]
    assert profile['sourceGroups']==A['sourceGroupsZeroBased']
    assert profile['nativeApproved'] is False and profile['runtimeApplied'] is False
    assert prior['nativeApproval'] is False and prior['runtimeApplied'] is False
    assert prior['sourceCompiler']['positiveRuns']==1 and prior['focused']['passedAttempts']==1
    assert prior['compiled']['SHA256']==A['expectedCompiledSHA256']
    assert prior['compiled']['pens']==A['pens'] and prior['compiled']['masks']==A['masks'] and prior['compiled']['polygons']==A['polygons']
    identity=A['selectedProofIdentity']
    assert sorted(identity)==sorted(A['proofContract']['identityFields'])
    for name,key in [('sourceProofFile','sourceProofFileSha256'),('sourceCapsuleFile','sourceCapsuleFileSha256')]:assert hashlib.sha256((source_dir/identity[name]).read_bytes()).hexdigest()==identity[key]
    proof=json.loads((source_dir/identity['sourceProofFile']).read_bytes())
    assert sorted(proof)==profile['fullProofKeys']
    assert proof['engineRevision']==A['proofContract']['engineRevision'] and proof['engineHashes']==A['proofContract']['engineHashes']
    assert len(proof['trace'])==len(proof['groups'])==A['rawRows']
    assert sum(len(g['polygons'])for g in proof['groups'])==A['polygons']
    for i,row in enumerate(proof['trace']):assert [p for call in row for p in call['polygons']]==proof['groups'][i]['polygons']
    capsule=json.loads((source_dir/identity['sourceCapsuleFile']).read_bytes())
    assert capsule['root']==A['selectedWhole'] and capsule['glyph']==A['glyph']
    assert capsule['mode']=='current-api-fixed-version-snapshot' and capsule['currentBaseChangedFromArchive'] is True
    assert len(capsule['records'])==5 and capsule['providers']['u4f8a']['fixedName']=='u4f8a@8'
    for name,provider in capsule['providers'].items():
        assert hashlib.sha256(capsule['records'][name]['data'].encode()).hexdigest()==provider['dataSHA256']
        response=next(r for r in capsule['responses'] if r['lookupName']==provider['fixedName'])
        assert hashlib.sha256(response['responseText'].encode()).hexdigest()==provider['responseSHA256']==response['responseSHA256']
        assert json.loads(response['responseText'])==response['json']
        for row in capsule['records'][name]['data'].split('$'):
            fields=row.split(':')
            if fields[0]=='99':assert fields[7] in capsule['records']
    cache_bytes=(source_dir/'compiled-u4f8a.json').read_bytes()
    assert hashlib.sha256(cache_bytes).hexdigest()==prior['compiled']['fileSHA256']
    cache=json.loads(cache_bytes)
    assert len(cache)==A['pens'] and sum(len(p)for p in cache)==A['masks']
    assert sum(m['outline'].count('M')for p in cache for m in p)==A['polygons']
    meta=json.loads((HERE/A['domesticMetadataFile']).read_bytes())
    assert meta['glyph']==A['glyph'] and meta['dictionary']==A['dictionary']
    assert meta['catalogStrokes']==A['catalogStrokes']==8
    assert A['domesticStrokes']==A['pens']==8
    original_findings=json.loads((ROOT/'docs/hanja-goal-glyphwiki-batch84-2026-09-27/findings.json').read_bytes())
    assert original_findings['glyph']==A['glyph'] and original_findings['strokes']==8
    return {'passed':True,'glyph':A['glyph'],'sourceRoot':A['selectedWhole'],'pinsVerified':len(A['immutableInputBytePins']),'sourcePreparationFiles':10,'rawRows':8,'pens':8,'masks':8,'polygons':22,'newSourceCompiles':0,'futureStartupCompiles':0,'GETCompiles':0,'engineExecutions':0,'httpRequests':0,'serversStarted':0,'nativeApproval':False,'runtimeApplied':False}
def compiled(root=None):
    global C
    source_guard();root=root or A['selectedWhole'];assert root==A['selectedWhole'],'No alias, alternative source or dependency fallback'
    if C is None:
        env={**os.environ,'REVIEW_DIR':str((HERE/A['sourcePreparationDirectory']).resolve()),'WHOLE_ROOT':root}
        C=json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',NODE_CALLER],env=env))
    assert C['sourceRoot']==root and C['compiledSHA256']==A['expectedCompiledSHA256']
    return C
def configure_runtime():
    global review
    source_guard()
    spec=importlib.util.spec_from_file_location('domestic_native_recovered_'+A['selectedWhole'],ROOT/'docs/hanja-special2-direction-review-2026-09-21/serve.py')
    review=importlib.util.module_from_spec(spec);spec.loader.exec_module(review)
    review.renderer.ENTRIES={A['glyph']:{'strokes':A['domesticStrokes'],'dictionary':A['dictionary']}}
    compiled();data=review.renderer.source(A['glyph']);assert len(data['strokes'])==A['domesticStrokes']
def full_domestic():
    data=review.renderer.source(A['glyph'])
    assert len(data['strokes'])==A['domesticStrokes']
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
                body='<!doctype html><meta charset="utf-8"><title>'+A['glyph']+' source-only</title><style>body{font:16px system-ui;margin:18px;width:1112px}svg{width:520px;height:520px}.pair{display:flex;gap:25px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.grid svg{width:220px;height:220px}button,a{margin:6px;display:inline-block}</style><h1>'+A['glyph']+' · 원본 후보 '+str(c['pens'])+'획</h1>'+links+'<p>국내 필순 승인 전. 국내 SVG는 RAM에만 보관. 오른쪽은 raw prefix가 아닌 compiled candidate pen.</p>'
                if route=='/whole' or route=='/':
                    s={'wholeNames':[A['selectedWhole']]}
                    if 'root'in q:assert root in s['wholeNames'],'unsupported whole'
                    variants=[root]if 'root'in q else s['wholeNames']
                    body+='<div class="pair"><div>국내 전체'+full_domestic()+'</div><div id="compiledWhole">compiled 전체</div></div>'
                    body+='<div class="grid">'+''.join('<div>'+html.escape(v)+public_whole(v)+'</div>'for v in variants)+'</div>'
                    body+='<script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';compiledWhole.innerHTML+=render(strokes,strokes.length,1,"whole");</script>'
                elif route=='/pairs':
                    n=int(q.get('stroke',q.get('pen',['1']))[0]);assert 1<=n<=c['pens'],'unsupported pair pen'
                    progress=float(q.get('p',['0.75'])[0]);assert 0<=progress<=1,'unsupported pair progress'
                    body+=''.join('<a href="?stroke='+str(i)+'&p='+str(progress)+'">'+str(i)+'</a>'for i in range(1,c['pens']+1))
                    body+='<h2>'+str(n)+'획 방향 대조 · 왼쪽 국내 / 오른쪽 원 compiled pen</h2><div class="pair">'+review.renderer.dictionary_svg(A['glyph'],n,True,'pairDomestic'+str(n))+'<div id="pairCandidate"></div></div>'
                    body+=''.join('<a href="?stroke='+str(n)+'&p='+str(p)+'">'+label+'</a>'for label,p in [('50%',.5),('75%',.75),('100%',1)])+'<a href="/progressive?stroke='+str(n)+'&enlarged=1">fine·모든 mask 경계·재생</a>'
                    body+='<script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';pairCandidate.innerHTML=render(strokes,'+str(n)+','+str(progress)+',"pairCandidate'+str(n)+'");</script>'
                elif route=='/progressive':
                    n=int(q.get('stroke',['1'])[0]);assert 1<=n<=c['pens'],'unsupported stroke'
                    masks=c['strokes'][n-1];total=sum(m['weight']for m in masks);cumulative=0;boundary=[]
                    for i,m in enumerate(masks[:-1],1):
                        cumulative+=m['weight'];b=cumulative/total
                        for label,value in [('직전',max(0,b-1e-10)),('경계',b),('직후',min(1,b+1e-10))]:boundary.append('<button onclick="show('+repr(value)+')">마스크 '+str(i+1)+' '+label+'</button>')
                    body+=''.join('<a href="?stroke='+str(i)+'&enlarged=1">'+str(i)+'</a>'for i in range(1,c['pens']+1))
                    body+='<style>body{width:1200px}.pair svg{width:520px;height:520px}</style>'
                    body+='<h2>'+str(n)+'획 · '+str(len(masks))+' masks</h2><div class="pair">'+review.renderer.dictionary_svg(A['glyph'],n,True,'dom'+str(n))+'<div id="candidate"></div></div>'
                    body+=''.join('<button onclick="show('+repr(p)+')">'+label+'</button>'for label,p in [('0%',0),('ε',1e-8),('50%',.5),('75%',.75),('95%',.95),('99%',.99),('99.99%',.9999),('100%',1)])+''.join(boundary)
                    body+='<button id="play">재생</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0" step=".0001"><output id="value"></output>'
                    body+='<script>const strokes='+json.dumps(c['strokes'])+';const stroke='+str(n)+';const render='+c['render']+';const show=p=>{candidate.innerHTML=render(strokes,stroke,p,"live");progress.value=p*100;value.textContent=(p*100).toFixed(4)+"%"};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};show(0);</script>'
                    if q.get('samples',['0'])[0]=='1':
                        body+='<style>.coarse{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.coarse svg{width:220px;height:220px}</style><div class="coarse" id="coarseSamples"></div><script>[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{coarseSamples.innerHTML+="<div>"+(p*100)+"%"+render(strokes,stroke,p,"coarse"+i)+"</div>"});</script>'
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
