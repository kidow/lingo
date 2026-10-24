import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {sourceGroups,selectedProofIdentity,sourceProposal,compileProgressive,nativeApproved,runtimeApplied} from './candidate.mjs'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex')
test('庾 VS2 draft12 preserves exact original13 rows and fails closed',()=>{
 const f=read('fixtures.json').u5ebe_ue0102,p=read(selectedProofIdentity.sourceProofFile)
 assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(f.fullProof,p);assert.deepEqual(f.sourceProposal,sourceProposal)
 assert.deepEqual(Object.keys(p),['engineRevision','engineHashes','groups','trace','defaults'])
 assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:13},(_,i)=>i))
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,p.groups.length,p.trace.flat().length,p.trace.flat().reduce((s,c)=>s+c.polygons.length,0)],[12,15,13,15,26])
 assert.equal(sha(JSON.stringify(f.strokes)),'7a0ce084854021f6befdac71d5be4e6b2a6f32bb7281fab33386e2834ffa7557')
 assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5],[12],[8,7],[9],[6],[10],[11]])
 assert.deepEqual(p.trace[8][0].args.slice(2,4),p.trace[7][0].args.slice(0,2))
 assert.equal(p.trace[7][0].args[5],23)
 assert.deepEqual(p.trace.map((row,i)=>row.flatMap(c=>c.polygons)),p.groups.map(g=>g.polygons))
 for(const[key,hash]of[['sourceProofFile','sourceProofFileSha256'],['sourceCapsuleFile','sourceCapsuleFileSha256'],['sourceChecksFile','sourceChecksFileSha256']])assert.equal(sha(readFileSync(new URL(selectedProofIdentity[key],import.meta.url))),selectedProofIdentity[hash])
 assert.equal(sourceProposal.catalogStrokes,11);assert.equal(sourceProposal.proposedPlaybackStrokes,12)
 for(const key of ['sourceStaticMappingApproved','productionImportAllowed','countConflictResolved','nativeApproval','runtimeApplied'])assert.equal(sourceProposal[key],false)
 assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false)
 const badId={...f.identity,sourceRoot:'u5ebe'};assert.throws(()=>compileProgressive(p.trace,p,badId))
 const badTrace=structuredClone(p.trace);badTrace[0][0].args[0]++;assert.throws(()=>compileProgressive(badTrace,p,f.identity))
 const badProof=structuredClone(p);badProof.groups[0].polygons[0][0].x++;assert.throws(()=>compileProgressive(p.trace,badProof,f.identity))
 let reads=0;const getter={...f.identity};Object.defineProperty(getter,'sourceRoot',{enumerable:true,get(){reads++;return'u5ebe-ue0102'}});assert.throws(()=>compileProgressive(p.trace,p,getter));assert.equal(reads,0)
 console.log(JSON.stringify({logical12:true,raw13:true,calls15:true,P26:true,positiveProjectionReplayed:0,negativeGuards4:true,registration:false,build:false}))
})
