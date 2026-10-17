import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,compileSourceWhole,selectedProofIdentity,sourceGroups,sourceRoot,renderProgressive,sourceCompileExecutions,originalBaselineSHA256} from './boundary-source-candidate.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),sha=v=>createHash('sha256').update(v).digest('hex'),prep=obj('boundary-source-preparation.json')
for(const[f,h]of Object.entries(prep.inputSHA256))assert.equal(sha(read(f)),h,f)
assert.equal(process.env.WHOLE_ROOT??process.argv[2]??sourceRoot,sourceRoot);assert.deepEqual(selectedProofIdentity,prep.identity);assert.deepEqual(sourceGroups,prep.sourceGroups)
const header=obj('engine-proof.json'),selected=obj(selectedProofIdentity.sourceProofFile),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected},before=JSON.stringify(proof)
assert.deepEqual(Object.keys(selected).sort(),['defaults','groups','trace']);assert.equal(sha(before),prep.fullProofSHA256)
const out=compileSourceWhole(sourceRoot,proof.trace,proof,selectedProofIdentity);assert.equal(JSON.stringify(proof),before)
const canonical=poly=>{const p=poly.map(q=>[q.x/2,q.y/2]),options=[];for(const v of[p,[...p].reverse()])for(let i=0;i<v.length;i++)options.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return options.sort()[0]}
const originalPolygons=proof.groups.flatMap(g=>g.polygons).map(canonical).sort(),emittedPolygons=out.flatMap(pen=>pen.flatMap(mask=>(mask.outline.match(/M[^Z]* Z/g)||[]).map(s=>{const nums=s.match(/-?\d+(?:\.\d+)?/g).map(Number);return canonical(Array.from({length:nums.length/2},(_,i)=>({x:nums[i*2]*2,y:nums[i*2+1]*2})));}))).sort();assert.deepEqual(emittedPolygons,originalPolygons,'Every original polygon exactly once')
assert.equal(out.length,17);assert.equal(out.flat().length,19);assert.equal(originalPolygons.length,39)
let rejected=0;const reject=fn=>{assert.throws(fn);rejected++}
if(process.env.CHECK==='1'){
 reject(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof]));reject(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof,selectedProofIdentity,{}]));reject(()=>Reflect.apply(compileSourceWhole,null,[sourceRoot,proof.trace,proof]));reject(()=>Reflect.apply(compileSourceWhole,null,[sourceRoot,proof.trace,proof,selectedProofIdentity,{}]));reject(()=>compileSourceWhole('wrong',proof.trace,proof,selectedProofIdentity));
 for(const key of Object.keys(selectedProofIdentity))reject(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,[key]:'wrong'}));reject(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,extra:true}));reject(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,sourceProofFile:'./'+selectedProofIdentity.sourceProofFile}));
 const alias={...selectedProofIdentity,sourceProofFileSha256:selectedProofIdentity.sourceProofFileSHA256};delete alias.sourceProofFileSHA256;reject(()=>compileProgressive(proof.trace,proof,alias));
 const missing={...selectedProofIdentity};delete missing.sourceRoot;reject(()=>compileProgressive(proof.trace,proof,missing));
 for(const mutate of[p=>{p.extra=true},p=>{delete p.engineRevision},p=>{p.defaults.kWidth+=.1},p=>{p.engineHashes['2d.js']='wrong'},p=>{p.trace[0][0].args[0]+=.1},p=>{p.groups[0].polygons[0][0].x+=.1}]){const v=structuredClone(proof);mutate(v);reject(()=>compileProgressive(v.trace,v,selectedProofIdentity))}
 reject(()=>compileProgressive([],proof,selectedProofIdentity));assert.equal(sourceCompileExecutions(),1,'All negative checks reject before original source compilation')
}
console.log(JSON.stringify({sourceRoot,pens:out.length,masks:out.flat().length,polygons:originalPolygons.length,compiledSHA256:sha(JSON.stringify(out)),originalCompiledSHA256:originalBaselineSHA256,fullProofSHA256:sha(before),positiveCompilerRuns:sourceCompileExecutions(),strictRejections:rejected,sourceGroups,allOriginalPolygonsExactlyOnce:true,candidatePenMaskSHA256:out.map(p=>sha(JSON.stringify(p))),finePens:out.flatMap((p,i)=>p.some(m=>m.direction==='curve')?[i+1]:[]),maskTransitions:out.flatMap((p,i)=>p.length>1?[{pen:i+1,weights:p.map(m=>m.weight),boundary:p[0].weight/p.reduce((n,m)=>n+m.weight,0)}]:[]),nativeApproval:false,runtimeApplied:false,strokes:process.env.CHECK==='1'?undefined:out,render:process.env.CHECK==='1'?undefined:renderProgressive.toString()}))
