import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups,sourceProposal} from './candidate.mjs'
const read=p=>readFileSync(new URL(p,import.meta.url)),json=p=>JSON.parse(read(p)),sha=b=>createHash('sha256').update(b).digest('hex'),fixture=json('./fixtures.json').hkcs_m705d,proof=fixture.fullProof
const normalize=points=>JSON.stringify(points.map(p=>[p.x,p.y]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]))
const contours=outline=>outline.trim().split(/\s+Z(?:\s+|$)/).filter(Boolean).map(path=>{const nums=path.match(/-?\d+(?:\.\d+)?/g).map(Number);assert.equal(nums.length%2,0);return Array.from({length:nums.length/2},(_,i)=>({x:nums[2*i],y:nums[2*i+1]}))})
test('灝 exact original full5 and original filled P survive one stored projection',()=>{
 assert.deepEqual(fixture.identity,selectedProofIdentity);assert.deepEqual(sourceGroups,[[0],[1],[2,3,4,5],[6],[7,8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20],[21],[22],[23,24],[25],[26],[27],[28],[29]]);assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:30},(_,i)=>i))
 for(const [p,h]of [[selectedProofIdentity.sourceProofFile,selectedProofIdentity.sourceProofFileSha256],[selectedProofIdentity.sourceCapsuleFile,selectedProofIdentity.sourceCapsuleFileSha256],[selectedProofIdentity.sourceChecksFile,selectedProofIdentity.sourceChecksFileSha256]])assert.equal(sha(read(p)),h)
 assert.deepEqual(proof,json(selectedProofIdentity.sourceProofFile));assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(proof.groups.length,30);assert.equal(proof.trace.flat().length,31)
 assert.equal(fixture.strokes.length,24);assert.equal(fixture.strokes.flat().length,31)
 for(const [i,rows]of sourceGroups.entries()){
  const calls=rows.flatMap(r=>proof.trace[r]);assert.equal(fixture.strokes[i].length,calls.length)
  for(const [j,call]of calls.entries()){
   const stroke=fixture.strokes[i][j],polys=call.polygons.map(p=>p.map(v=>({x:v.x/2,y:v.y/2})))
   assert.deepEqual(contours(stroke.outline).map(normalize).sort(),polys.map(normalize).sort())
   assert(call.polygons.flat().every(v=>v.off===0));const points=polys.flat();assert.deepEqual(stroke.bounds,[Math.min(...points.map(v=>v.x)),Math.min(...points.map(v=>v.y)),Math.max(...points.map(v=>v.x)),Math.max(...points.map(v=>v.y))])
   const a=call.args;if(call.kind==='cdDrawCurve'){assert.equal(stroke.revealPath,'M'+a[0]/2+' '+a[1]/2+' Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2);assert.equal(stroke.revealWidth,14)}else assert.equal(stroke.revealPath,undefined)
  }
 }
 assert.equal(fixture.strokes.flat().reduce((n,s)=>n+contours(s.outline).length,0),51);assert.equal(sourceProposal.sourceStaticMappingApproved,true);assert.equal(sourceProposal.directOriginalDirectionFrames,72);assert.equal(sourceProposal.runtimeApplied,false)
 console.log(JSON.stringify({sourceGate:true,originalFull5:true,pens24:true,masks31:true,P51:true,sourceGeometryChanged:false,positiveCompileRunsInTest:0,engine:0,registryImported:false}))
})
test('灝 binder rejects changed proof, identity, trace, getters and surplus arguments before projection',()=>{
 const p=structuredClone(proof);p.defaults.kMage++;assert.throws(()=>compileProgressive(p.trace,p,selectedProofIdentity))
 const header=structuredClone(proof);header.engineRevision='unreviewed';assert.throws(()=>compileProgressive(header.trace,header,selectedProofIdentity))
 const trace=structuredClone(proof.trace);trace[0][0].args[0]++;assert.throws(()=>compileProgressive(trace,proof,selectedProofIdentity))
 const identity={...selectedProofIdentity,sourceRoot:'other'};assert.throws(()=>compileProgressive(proof.trace,proof,identity))
 const changedP=structuredClone(proof);changedP.groups[0].polygons[0][0].x++;assert.throws(()=>compileProgressive(changedP.trace,changedP,selectedProofIdentity))
 let reads=0;const getter={...selectedProofIdentity};Object.defineProperty(getter,'sourceRoot',{enumerable:true,get(){reads++;return'hkcs_m705d'}});assert.throws(()=>compileProgressive(proof.trace,proof,getter));assert.equal(reads,0)
 assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof,selectedProofIdentity,proof]));console.log(JSON.stringify({negative7:true,getterReads:reads,positiveCompileRuns:0}))
})
