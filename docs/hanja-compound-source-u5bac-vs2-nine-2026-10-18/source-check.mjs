import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity as identity,sourceGroups,nativeApproved,runtimeApplied} from './candidate.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),sha=x=>createHash('sha256').update(x).digest('hex'),config=JSON.parse(read('./config.json')),prep={...config,immutableInputBytePins:Object.fromEntries(Object.entries(config.originalInputBytePins).map(([p,h])=>['../../'+p,h])),catalog:{"id":"u5bac","strokes":10,"grade":"특급II","sourceRow":2643,"file":"../../content/hanja/characters/special-2.json"},expectedMasks:config.expectedMasks,sourcePolygons:config.polygons}
for(const[f,h]of Object.entries(prep.immutableInputBytePins))assert.equal(sha(read(f)),h,f)
const cat=JSON.parse(read(prep.catalog.file)).characters.filter(x=>x.glyph===prep.glyph);assert.equal(cat.length,1);assert.equal(cat[0].strokes,prep.catalog.strokes);assert.equal(cat[0].readingGrade,prep.catalog.grade)
const proof=JSON.parse(read(identity.sourceProofFile)),before=JSON.stringify(proof),out=compileProgressive(proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);console.log(JSON.stringify({publicCompiledCache:out}));assert.equal(out.length,prep.candidatePens);assert.equal(out.flat().length,prep.expectedMasks)
assert.deepEqual(sourceGroups.flat(),Array.from({length:proof.trace.length},(_,i)=>i))
for(const group of sourceGroups)for(let i=1;i<group.length;i++){const a=proof.trace[group[i-1]].at(-1),b=proof.trace[group[i]][0];const offset=a.kind==='cdDrawLine'?2:a.kind==='cdDrawCurve'?4:6;assert.deepEqual(a.args.slice(offset,offset+2),b.args.slice(0,2))}
const canonical=p=>{const variants=[];for(const order of[p,[...p].reverse()])for(let i=0;i<order.length;i++)variants.push(JSON.stringify([...order.slice(i),...order.slice(0,i)]));return variants.sort()[0]}
const sourcePolygons=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(v=>[v.x/2,v.y/2]))).sort()
const emitted=out.flat().flatMap(m=>m.outline.split(' Z').filter(s=>s.trim()).map(s=>canonical([...s.matchAll(/[ML]([-+\d.e]+) ([-+\d.e]+)/g)].map(m=>[Number(m[1]),Number(m[2])])))).sort()
assert.deepEqual(emitted,sourcePolygons,'Every original vertex and polygon exactly once; only existing cyclic/reverse winding normalization');assert.equal(sourcePolygons.length,prep.sourcePolygons)
for(const p of out)for(const m of p){assert(m.weight>0);assert(m.bounds.every(Number.isFinite));if(m.revealWidth!==undefined)assert.equal(m.revealWidth,14)}
let guardRejections=0;const reject=fn=>{assert.throws(fn);guardRejections++}
reject(()=>compileProgressive(proof.trace,proof));reject(()=>compileProgressive(proof.trace,proof,identity,undefined));reject(()=>compileProgressive(proof.trace,proof,{...identity,extra:true}));reject(()=>compileProgressive(proof.trace,proof,{...identity,sourceRoot:'not-the-selected-whole'}));reject(()=>compileProgressive(proof.trace,proof,{...identity,sourceProofFile:'./'+identity.sourceProofFile}))
for(const key of Object.keys(identity)){const other={...identity};delete other[key];reject(()=>compileProgressive(proof.trace,proof,other))}
const{sourceProofFileSha256,...other}=identity;reject(()=>compileProgressive(proof.trace,proof,{...other,sourceProofFileSHA256:sourceProofFileSha256}))
for(const mutate of[p=>{p.trace[0][0].args[0]+=.1},p=>{p.groups[0].polygons[0][0].x+=.1},p=>{p.defaults.kWidth+=1},p=>{p.engineRevision='0'.repeat(40)},p=>{p.engineHashes['2d.js']='0'.repeat(64)},p=>{delete p.engineHashes['buhin.js']},p=>{delete p.defaults},p=>{p.extra=true}]){const changed=structuredClone(proof);mutate(changed);reject(()=>compileProgressive(changed.trace,changed,identity))}
const changedTrace=structuredClone(proof.trace);changedTrace[0][0].args[0]+=.1;reject(()=>compileProgressive(changedTrace,proof,identity))
assert(Object.isFrozen(sourceGroups)&&sourceGroups.every(Object.isFrozen)&&Object.isFrozen(identity));assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false)
const negative=proof.groups.flatMap(g=>g.polygons).filter(p=>p.reduce((n,v,i)=>n+v.x*p[(i+1)%p.length].y-p[(i+1)%p.length].x*v.y,0)<0).length
console.log(JSON.stringify({ok:true,catalogStrokes:10,domesticClips:9,glyph:prep.glyph,sourceRoot:identity.sourceRoot,immutableInputPins:Object.keys(prep.immutableInputBytePins).length,rawRows:proof.trace.length,pens:out.length,masks:out.flat().length,polygons:sourcePolygons.length,compiledSHA256:sha(JSON.stringify(out)),guardRejections,originalInputUnchanged:true,eachOriginalPolygonExactOnce:true,negativeSourceWindings:negative,existingNormalizationOnly:true,finePens:out.flatMap((p,i)=>p.some(m=>m.direction==='curve')?[i+1]:[]),maskTransitions:out.flatMap((p,i)=>p.length>1?[{pen:i+1,boundary:p[0].weight/p.reduce((s,m)=>s+m.weight,0),weights:p.map(m=>m.weight)}]:[]),nativeApproved:false,runtimeApplied:false,engineExecutions:0,serversStarted:0,buildRun:false}))
