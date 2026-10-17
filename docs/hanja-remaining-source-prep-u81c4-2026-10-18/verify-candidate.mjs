import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,compileSourceWhole,selectedProofIdentity as identity,sourceGroups,nativeApproved,runtimeApplied} from './progressive.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),sha=x=>createHash('sha256').update(x).digest('hex')
const proof=JSON.parse(read(identity.sourceProofFile)),before=JSON.stringify(proof)
const prep=JSON.parse(read('./candidate-source-preparation.json'))
for(const[f,h]of Object.entries(prep.immutableInputBytePins))assert.equal(sha(read(f)),h,f)
const cat=JSON.parse(read(prep.catalog.file)).characters.find(x=>x.id==='u81c4')
assert.equal(cat.strokes,17);assert.equal(cat.readingGrade,'특급');assert.equal(cat.sourceRow,179)
const out=compileSourceWhole('u81c4',proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(out.length,17);assert.equal(out.flat().length,20)
const expected=[[0],[1,2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14],[15],[16],[17],[18]]
assert.deepEqual(sourceGroups,expected);assert.deepEqual(sourceGroups.flat(),Array.from({length:19},(_,i)=>i))
for(const[a,b]of [[1,2],[8,9]])assert.deepEqual(proof.trace[a].at(-1).args.slice(-4,-2),proof.trace[b][0].args.slice(0,2))
const canonical=p=>{
 const variants=[]
 for(const order of[p,[...p].reverse()])for(let i=0;i<order.length;i++)variants.push(JSON.stringify([...order.slice(i),...order.slice(0,i)]))
 return variants.sort()[0]
}
const sourcePolygons=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(v=>[v.x/2,v.y/2]))).sort()
const emittedPolygons=out.flat().flatMap(mask=>mask.outline.split(' Z').filter(s=>s.trim()).map(s=>canonical([...s.matchAll(/[ML]([-+\d.e]+) ([-+\d.e]+)/g)].map(m=>[Number(m[1]),Number(m[2])])))).sort()
assert.deepEqual(emittedPolygons,sourcePolygons,'Each original polygon keeps every vertex and occurs exactly once; cyclic/reverse normalization only')
assert.equal(sourcePolygons.length,45)
for(const pen of out)for(const m of pen){assert(m.weight>0);assert(m.bounds.every(Number.isFinite));if(m.revealWidth!==undefined)assert.equal(m.revealWidth,14)}
let rejections=0
const reject=fn=>{assert.throws(fn);rejections++}
reject(()=>compileProgressive(proof.trace,proof))
reject(()=>compileProgressive(proof.trace,proof,identity,undefined))
reject(()=>compileProgressive(proof.trace,proof,{...identity,extra:true}))
reject(()=>compileProgressive(proof.trace,proof,{...identity,sourceRoot:'u81c4@12'}))
reject(()=>compileProgressive(proof.trace,proof,{...identity,sourceProofFile:'./'+identity.sourceProofFile}))
for(const key of Object.keys(identity)){const changed={...identity};delete changed[key];reject(()=>compileProgressive(proof.trace,proof,changed))}
const{sourceProofFileSha256,...otherIdentity}=identity
reject(()=>compileProgressive(proof.trace,proof,{...otherIdentity,sourceProofFileSHA256:sourceProofFileSha256}))
for(const mutate of[
 p=>{p.trace[0][0].args[0]+=.1},
 p=>{p.groups[0].polygons[0][0].x+=.1},
 p=>{p.defaults.kWidth+=1},
 p=>{p.engineRevision='0'.repeat(40)},
 p=>{p.engineHashes['2d.js']='0'.repeat(64)},
 p=>{delete p.engineHashes['buhin.js']},
 p=>{delete p.defaults},
 p=>{p.extraFallback=true},
]){const changed=structuredClone(proof);mutate(changed);reject(()=>compileProgressive(changed.trace,changed,identity))}
const changedTrace=structuredClone(proof.trace);changedTrace[0][0].args[0]+=.1
reject(()=>compileProgressive(changedTrace,proof,identity))
reject(()=>compileSourceWhole('u81c4',proof.trace,proof))
reject(()=>compileSourceWhole('u81c4',proof.trace,proof,identity,undefined))
reject(()=>compileSourceWhole('u81c4@12',proof.trace,proof,identity))
reject(()=>compileSourceWhole('u81c4',proof.trace,proof,{...identity,sourceRoot:'u81c4@12'}))
assert(Object.isFrozen(sourceGroups)&&sourceGroups.every(Object.isFrozen)&&Object.isFrozen(identity))
assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false)
for(const[f,h]of Object.entries(prep.immutableInputBytePins))assert.equal(sha(read(f)),h,f)
const finePens=out.flatMap((p,i)=>p.some(m=>m.direction==='curve')?[i+1]:[])
const maskBounds=out.map((p,i)=>({pen:i+1,bounds:p.map(m=>m.bounds),sourceRows:sourceGroups[i]}))
const negativeSourcePolygons=proof.groups.flatMap(g=>g.polygons).filter(p=>p.reduce((n,v,i)=>n+v.x*p[(i+1)%p.length].y-p[(i+1)%p.length].x*v.y,0)<0).length
const tailPolicies=[{pen:2,rawRows:[1,2],terminal:214},{pen:10,rawRows:[11],terminal:5},{pen:13,rawRows:[14],terminal:14}]
console.log(JSON.stringify({ok:true,glyph:'臄',sourceRoot:'u81c4',fixedRootVersion:'u81c4@12',rawRows:19,pens:17,masks:20,polygons:45,compiledSHA256:sha(JSON.stringify(out)),positiveCompiles:1,rejections,originalInputUnchanged:true,eachOriginalPolygonExactOnce:true,sourcePolygonsWithNegativeWinding:negativeSourcePolygons,existingNormalizationOnly:true,finePens,maskBounds,maskTransitions:out.flatMap((p,i)=>p.length>1?[{pen:i+1,boundary:p[0].weight/p.reduce((s,m)=>s+m.weight,0),weights:p.map(m=>m.weight)}]:[]),terminalRisk:tailPolicies.map(p=>({...p,nativeReviewed:false,originalTailPolygonPreserved:true})),nativeApproval:false,runtimeApplied:false,engineExecutions:0,serversStarted:0,buildRun:false}))
