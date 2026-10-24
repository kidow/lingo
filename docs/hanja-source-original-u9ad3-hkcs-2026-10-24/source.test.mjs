import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups,originalNonDrawingRawRows,sourceProposal} from './candidate.mjs'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x)),f=read('./fixtures.json').hkcs_m9ad3,full=read(selectedProofIdentity.sourceProofFile),strokes=f.strokes,start=performance.now()
assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(f.fullProof,full);assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.deepEqual([strokes.length,strokes.flat().length,full.groups.length,full.trace.flat().length,full.trace.flat().reduce((n,c)=>n+c.polygons.length,0)],[23,31,30,31,51])
assert.equal(sha(JSON.stringify(strokes)),'e5abfd7fc4b7db418b2911a477bf0b800b6b0be6f45b2f21e422d7a0d7068899')
assert.deepEqual(originalNonDrawingRawRows,[18]);assert.deepEqual([...sourceGroups.flat(),...originalNonDrawingRawRows].toSorted((a,b)=>a-b),Array.from({length:30},(_,i)=>i))
assert.deepEqual(full.groups[18],{raw:[0,null,null,null,null,null,null,null,null,null,null],polygons:[]});assert.deepEqual(full.trace[18],[])
const polygons=s=>s.match(/M[^M]+/g).map(p=>{const a=p.match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/g).map(Number);return Array.from({length:a.length/2},(_,i)=>[a[2*i],a[2*i+1]])}),cycle=(a,b)=>[b,b.toReversed()].some(v=>v.some((_,i)=>JSON.stringify(a)===JSON.stringify([...v.slice(i),...v.slice(0,i)])))
const calls=sourceGroups.flatMap(gs=>gs.flatMap(i=>full.trace[i]));let polygonsChecked=0,curves=0,beziers=0,lines=0
for(let i=0;i<calls.length;i++){
 const c=calls[i],s=strokes.flat()[i],P=polygons(s.outline),a=c.args;assert.equal(P.length,c.polygons.length)
 for(let j=0;j<P.length;j++){assert(cycle(P[j],c.polygons[j].map(v=>[v.x/2,v.y/2])));polygonsChecked++}
 const last=c.kind==='cdDrawCurve'?4:c.kind==='cdDrawBezier'?6:2
 assert.equal(s.weight,Math.round(Math.hypot(a[last]-a[0],a[last+1]-a[1])/2*1e6)/1e6)
 if(c.kind==='cdDrawCurve'){assert.equal(s.revealPath,`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`);assert.equal(s.revealWidth,14);curves++}
 else if(c.kind==='cdDrawBezier'){assert.equal(s.revealPath,`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`);assert.equal(s.revealWidth,14);beziers++}
 else {assert.equal(c.kind,'cdDrawLine');assert(!('revealPath'in s));assert.equal(s.direction,a[0]===a[2]?(a[3]>a[1]?'down':'up'):(a[2]>a[0]?'right':'left'));lines++}
}
for(const k of ['sourceStaticMappingApproved','initialContactApproved','productionImportAllowed','runtimeApplied','nativeApproval'])assert.equal(sourceProposal[k],false)
assert.equal(sourceProposal.providerRoot,'hkcs_m9ad3');assert.equal(sourceProposal.metadataAssignedToSpecificStroke,false)
let negative=0
for(const change of[x=>x.identity.sourceRoot='u9ad3-hkcs',x=>x.identity.sourceProofFileSha256='0'.repeat(64),x=>x.full.groups[18].raw[0]=1,x=>x.trace[26][0].args[0]+=.01,x=>x.trace[29][0].polygons[0][0].x+=.01]){
 const x={identity:clone(selectedProofIdentity),full:clone(full),trace:clone(full.trace)};change(x);assert.throws(()=>compileProgressive(x.trace,x.full,x.identity));negative++
}
let getterReads=0;const bad=clone(selectedProofIdentity);Object.defineProperty(bad,'sourceRoot',{enumerable:true,get(){getterReads++;return selectedProofIdentity.sourceRoot}});assert.throws(()=>compileProgressive(full.trace,full,bad));assert.equal(getterReads,0);negative++
console.log(JSON.stringify({sourceProjectionGateFIRSTPASS:true,pens:23,masks:31,raw:30,nonDrawingRaw:1,calls:31,polygonsChecked,curves,beziers,lines,negative,getterReads,positiveProjectionReused:true,projectionReplay:0,engine:0,staticMappingApproved:false,runtimeApplied:false,durationMs:performance.now()-start}))
