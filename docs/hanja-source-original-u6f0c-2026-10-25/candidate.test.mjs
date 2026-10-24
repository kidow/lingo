import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {compileProgressive,selectedProofIdentity,sourceGroups,nativeApproved,runtimeApplied} from './candidate.mjs'
const f=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url),'utf8')).u6f0c
const clone=v=>JSON.parse(JSON.stringify(v))
test('new mapping uses sixteen original raw rows once and corrects only twelve/thirteen order',()=>{
 assert.equal(sourceGroups.length,14);assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:16},(_,i)=>i))
 assert.deepEqual(sourceGroups[11],[14]);assert.deepEqual(sourceGroups[12],[13]);assert.deepEqual(sourceGroups[2],[2,3]);assert.deepEqual(sourceGroups[8],[9,10])
 assert.equal(f.strokes[11][0].direction,'right');assert.equal(f.strokes[12][0].direction,'down');assert.equal(f.strokes.length,14);assert.equal(f.strokes.flat().length,16)
 assert.deepEqual(f.fullProof.trace[14][0].args,[80.6,157,172.4,157,0,0]);assert.deepEqual(f.fullProof.trace[13][0].args,[126.5,59,126.5,182,32,32])
 assert.deepEqual(f.sourceProposal.water3.end,[37.875,184]);assert.deepEqual(f.sourceProposal.water3.restart,[34,150]);assert.equal(f.sourceProposal.water3.syntheticBridge,false)
 assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false);assert.equal(f.sourceProposal.sourceStaticMappingApproved,false)
})
test('new binding rejects altered identity, original arguments and missing identity before projection',()=>{
 const id=clone(selectedProofIdentity);id.sourceRoot='other';assert.throws(()=>compileProgressive(f.fullProof.trace,f.fullProof,id))
 const p=clone(f.fullProof);p.trace[14][0].args[0]+=1;assert.throws(()=>compileProgressive(p.trace,p,selectedProofIdentity))
 assert.throws(()=>compileProgressive(f.fullProof.trace,f.fullProof))
})
