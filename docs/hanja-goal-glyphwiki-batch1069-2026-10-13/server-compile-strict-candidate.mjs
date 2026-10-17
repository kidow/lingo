import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,compileSourceWhole,selectedProofIdentity,sourceGroups,sourceRoot,renderProgressive} from './strict-source-candidate.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),sha=v=>createHash('sha256').update(v).digest('hex'),prep=obj('strict-source-preparation.json')
for(const[f,h]of Object.entries({...prep.originalPins,...prep.sharedRendererBytePins,...prep.newFilesSHA256}))assert.equal(sha(read(f)),h,f)
assert.equal(process.env.WHOLE_ROOT??process.argv[2]??sourceRoot,sourceRoot,'Selected original profile only')
assert.deepEqual(selectedProofIdentity,prep.identity);assert.deepEqual(sourceGroups,prep.sourceGroups)
const h=obj(selectedProofIdentity.sourceHeaderFile),b=obj(selectedProofIdentity.sourceProofFile)
const proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...b},before=JSON.stringify(proof)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.equal(sha(before),prep.fullProofSHA256)
const out=compileSourceWhole(sourceRoot,proof.trace,proof,selectedProofIdentity)
assert.equal(JSON.stringify(proof),before)
const canonical=poly=>{const options=[];for(const v of[poly,[...poly].reverse()])for(let i=0;i<v.length;i++)options.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return options.sort()[0]}
const originalPolygons=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort()
const emittedPolygons=out.flatMap(pen=>pen.flatMap(mask=>mask.outline.split(' Z').filter(s=>s.trim()).map(s=>canonical([...s.matchAll(/[ML]([-+\d.eE]+) ([-+\d.eE]+)/g)].map(m=>[Number(m[1]),Number(m[2])]))))).sort()
assert.deepEqual(emittedPolygons,originalPolygons,'Every original polygon and vertex exactly once; existing cyclic/reverse normalization only')
assert.equal(sha(JSON.stringify(out)),prep.expectedCompiledSHA256)
let rejected=0;const reject=fn=>{assert.throws(fn);rejected++}
if(process.env.CHECK==='1'){
 reject(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof]))
 reject(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof,selectedProofIdentity,{}]))
 reject(()=>Reflect.apply(compileSourceWhole,null,[sourceRoot,proof.trace,proof]))
 reject(()=>Reflect.apply(compileSourceWhole,null,[sourceRoot,proof.trace,proof,selectedProofIdentity,{}]))
 reject(()=>compileSourceWhole('wrong',proof.trace,proof,selectedProofIdentity))
 for(const key of Object.keys(selectedProofIdentity)){
  reject(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,[key]:'wrong'}))
  const missing={...selectedProofIdentity};delete missing[key];reject(()=>compileProgressive(proof.trace,proof,missing))
 }
 reject(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,extra:true}))
 reject(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,sourceProofFile:'./'+selectedProofIdentity.sourceProofFile}))
 const alias={...selectedProofIdentity,sourceProofFileSHA256:selectedProofIdentity.sourceProofFileSha256};delete alias.sourceProofFileSha256
 reject(()=>compileProgressive(proof.trace,proof,alias))
 const metadataAlias={...selectedProofIdentity,sourceMetadataFileSHA256:selectedProofIdentity.sourceMetadataFileSha256};delete metadataAlias.sourceMetadataFileSha256
 reject(()=>compileProgressive(proof.trace,proof,metadataAlias))
 const headerAlias={...selectedProofIdentity,sourceHeaderFileSHA256:selectedProofIdentity.sourceHeaderFileSha256};delete headerAlias.sourceHeaderFileSha256
 reject(()=>compileProgressive(proof.trace,proof,headerAlias))
 for(const mutate of[p=>{p.extra=true},p=>{delete p.defaults},p=>{p.defaults.kWidth+=.1},p=>{p.engineHashes['2d.js']='wrong'},p=>{p.trace[0][0].args[0]+=.1},p=>{p.groups[0].polygons[0][0].x+=.1},p=>{p.sourceRoot=sourceRoot}]){
  const value=structuredClone(proof);mutate(value);reject(()=>compileProgressive(value.trace,value,selectedProofIdentity))
 }
 reject(()=>compileProgressive([],proof,selectedProofIdentity))
}
for(const[f,h]of Object.entries({...prep.originalPins,...prep.sharedRendererBytePins,...prep.newFilesSHA256}))assert.equal(sha(read(f)),h,f)
console.log(JSON.stringify({sourceRoot,pens:out.length,masks:out.flat().length,polygons:originalPolygons.length,compiledSHA256:sha(JSON.stringify(out)),fullProofSHA256:sha(before),positiveCompilerRuns:1,strictRejections:rejected,sourceGroups,allOriginalPolygonsExactlyOnce:true,finePens:out.flatMap((pen,i)=>pen.some(m=>m.direction==='curve')?[i+1]:[]),maskTransitions:out.flatMap((pen,i)=>pen.length>1?[{pen:i+1,weights:pen.map(m=>m.weight),boundaries:pen.slice(0,-1).map((_,j)=>pen.slice(0,j+1).reduce((n,m)=>n+m.weight,0)/pen.reduce((n,m)=>n+m.weight,0))}]:[]),nativeApproval:false,runtimeApplied:false,strokes:process.env.CHECK==='1'?undefined:out,render:process.env.CHECK==='1'?undefined:renderProgressive.toString()}))

