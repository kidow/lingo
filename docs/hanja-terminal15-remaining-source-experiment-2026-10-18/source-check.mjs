import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{spawnSync}from'node:child_process'
import{compileProgressive,compileSourceWhole,sourceCompileCallCount,lastCompilation,nativeApproval,runtimeApplied,guards}from'./terminal15-candidate.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),sha=x=>createHash('sha256').update(x).digest('hex'),config=obj('config.json'),fixtures={},reports=[]
const canonical=p=>{const variants=[];for(const q of[p,[...p].reverse()])for(let i=0;i<q.length;i++)variants.push(JSON.stringify([...q.slice(i),...q.slice(0,i)]));return variants.sort()[0]}
const area=p=>Math.abs(p.reduce((n,q,i)=>{const r=p[(i+1)%p.length];return n+q[0]*r[1]-r[0]*q[1]},0)/2)
const clip=(poly,axis,threshold)=>{const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],ia=a[axis]>=threshold,ib=b[axis]>=threshold;if(ia)out.push(a);if(ia!==ib){const k=(threshold-a[axis])/(b[axis]-a[axis]);out.push([a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k])}}return out}
for(const t of Object.values(config.targets)){
 const h=obj(t.sourceDirectory+'/'+t.headerFile),b=obj(t.sourceDirectory+'/'+t.proofFile),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...b},before=JSON.stringify(proof)
 const strokes=compileSourceWhole(t.root,proof.trace,proof,t.identity),cache=lastCompilation(t.key),baseline=cache.baseline
 assert.equal(sourceCompileCallCount(t.key),1);assert.equal(JSON.stringify(proof),before)
 assert.equal(strokes.length,t.pens);assert.equal(strokes.flat().length,t.masks+1)
 const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort(),emitted=strokes.flatMap(p=>p.flatMap(m=>(m.outline.match(/M[^Z]* Z/g)||[]).map(s=>canonical([...s.matchAll(/[ML]([-+\d.eE]+) ([-+\d.eE]+)/g)].map(v=>[Number(v[1]),Number(v[2])]))))).sort()
 assert.deepEqual(emitted,original)
 const[body,tail]=strokes[t.pen-1],old=baseline[t.pen-1][0],originalTail=proof.trace[t.rawIndices.at(-1)].at(-1).polygons.at(-1)
 assert.deepEqual(cache.tail.polygon,originalTail);assert.equal(tail.direction,t.tailDirection);assert.equal(body.outline+' '+tail.outline,old.outline)
 for(const key of Object.keys(old).filter(k=>k!=='outline'))assert.deepEqual(body[key],old[key])
 for(let i=0;i<strokes.length;i++)if(i!==t.pen-1)assert.deepEqual(strokes[i],baseline[i])
 assert(!('revealPath'in tail)&&!('revealWidth'in tail));assert.equal(tail.weight,cache.tail.jump/2)
 const polygon=originalTail.map(q=>[q.x/2,q.y/2]),axis=t.tailDirection==='up'?1:0,hi=Math.max(...polygon.map(q=>q[axis])),lo=Math.min(...polygon.map(q=>q[axis])),total=area(polygon),at=p=>area(clip(polygon,axis,hi-(hi-lo)*p))
 assert.equal(at(0),0);assert.equal(at(1),total);assert(at(.9999)>at(.99));assert(total-at(.9999)<total-at(.99));assert(at(1e-8)<total/1e6)
 let rejected=0;const reject=f=>{assert.throws(f);rejected++}
 reject(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof]));reject(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof,t.identity,{}]));reject(()=>Reflect.apply(compileSourceWhole,null,[t.root,proof.trace,proof]));reject(()=>Reflect.apply(compileSourceWhole,null,[t.root,proof.trace,proof,t.identity,{}]));reject(()=>compileSourceWhole('wrong',proof.trace,proof,t.identity))
 for(const k of Object.keys(t.identity))reject(()=>compileProgressive(proof.trace,proof,{...t.identity,[k]:'wrong'}))
 for(const k of Object.keys(t.identity)){const bad={...t.identity};delete bad[k];reject(()=>compileProgressive(proof.trace,proof,bad))}
 const fileKey=Object.hasOwn(t.identity,'file')?'file':'sourceProofFile',shaKey=Object.hasOwn(t.identity,'fileSHA256')?'fileSHA256':'sourceProofFileSHA256';reject(()=>compileProgressive(proof.trace,proof,{...t.identity,[fileKey]:'./'+t.identity[fileKey]}));const alias={...t.identity,[shaKey.replace('SHA256','Sha256')]:t.identity[shaKey]};delete alias[shaKey];reject(()=>compileProgressive(proof.trace,proof,alias));const omitted=structuredClone(proof);delete omitted.defaults;reject(()=>compileProgressive(omitted.trace,omitted,t.identity));
 reject(()=>compileProgressive(proof.trace,proof,{...t.identity,extra:true}));reject(()=>compileProgressive([],proof,t.identity))
 for(const mutate of[p=>{p.extra=true},p=>{p.defaults.kWidth+=.1},p=>{p.engineHashes['2d.js']='wrong'},p=>{p.trace[t.rawIndices.at(-1)].at(-1).args[0]+=.1},p=>{p.trace[t.rawIndices.at(-1)].at(-1).args[p.trace[t.rawIndices.at(-1)].at(-1).args.length-1]=14},p=>{p.trace[t.rawIndices.at(-1)].at(-1).polygons.at(-1)[0].x+=.1},p=>{p.groups[0].polygons[0][0].x+=.1}]){const v=structuredClone(proof);mutate(v);reject(()=>compileProgressive(v.trace,v,t.identity))}
 assert.equal(sourceCompileCallCount(t.key),1);assert.equal(nativeApproval,false);assert.equal(runtimeApplied,false)
 reports.push({key:t.key,glyph:t.glyph,pen:t.pen,direction:t.tailDirection,sourceCompiles:1,engineRuns:0,negativeRejections:rejected,pens:strokes.length,masks:strokes.flat().length,polygons:emitted.length,baselineSHA256:sha(JSON.stringify(baseline)),baselineHashProvenance:t.baselineSHA256===null?'New first-positive capture; no independent old compiled hash used':'Existing pinned batch979 source-only candidate baseline; not native evidence',derivedSHA256:sha(JSON.stringify(strokes)),originalPolygonsExactlyOnce:true,tailPolygonOriginalByteIdentity:true,bodyGuideWidthWeightUnchanged:true,unchangedOtherPens:true,tailArea:total,visibleAreaAt0:at(0),visibleAreaAtEpsilon:at(1e-8),residualAreaAt99:total-at(.99),residualAreaAt9999:total-at(.9999),residualAreaAt100:total-at(1),boundary:body.weight/(body.weight+tail.weight),nativeApproval:false,runtimeApplied:false})
 fixtures[t.key]={baseline,strokes}
}
const syntax=spawnSync('python3',['-c','import ast,pathlib;ast.parse(pathlib.Path("serve.py").read_text())'],{cwd:new URL('.',import.meta.url),encoding:'utf8'});assert.equal(syntax.status,0,syntax.stderr)
const guard=spawnSync('python3',['-B','serve.py','--check-only'],{cwd:new URL('.',import.meta.url),encoding:'utf8'});assert.equal(guard.status,0,guard.stderr);guards()
console.log(JSON.stringify({passed:true,targets:reports,positiveCompilations:7,engineRuns:0,helperPythonASTChecks:1,helperStaticGuardChecks:1,privateHTTP:0,serverStarts:0,nativeApproval:false,runtimeApplied:false,fixtures}))
