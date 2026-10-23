import assert from 'node:assert/strict'
import{test}from'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{compileProgressive,selectedProofIdentity,sourceGroups}from'./candidate.mjs'
const clone=x=>JSON.parse(JSON.stringify(x)),proof=JSON.parse(readFileSync(new URL('./engine-proof.json',import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex')
test('VS1 exact whole source guard and explicit14 candidate order FIRST',()=>{
 const strokes=compileProgressive(proof.trace,proof,selectedProofIdentity)
 assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0)],[14,15,31])
 assert.deepEqual(sourceGroups,[[0],[1,2],[3],[4],[5],[6],[8,9],[10],[7],[11],[12,13],[14],[15],[16]])
 assert.equal(strokes[5][0].revealPath,'M85.44 12.5 Q69.84 16 45.4 18.5')
 let rejected=0
 const wrong=clone(selectedProofIdentity);wrong.sourceRoot='hkcs_u890a';assert.throws(()=>compileProgressive(proof.trace,proof,wrong));rejected++
 const extra={...selectedProofIdentity,alias:true};assert.throws(()=>compileProgressive(proof.trace,proof,extra));rejected++
 const coordinate=clone(proof);coordinate.groups[0].raw[3]+=.01;assert.throws(()=>compileProgressive(coordinate.trace,coordinate,selectedProofIdentity));rejected++
 const trace=clone(proof.trace);trace[0][0].args[0]+=.01;assert.throws(()=>compileProgressive(trace,proof,selectedProofIdentity));rejected++
 const header=clone(proof);header.defaults.kWidth++;assert.throws(()=>compileProgressive(header.trace,header,selectedProofIdentity));rejected++
 let reads=0;const accessor=clone(proof);Object.defineProperty(accessor,'defaults',{enumerable:true,get(){reads++;return proof.defaults}});assert.throws(()=>compileProgressive(proof.trace,accessor,selectedProofIdentity));rejected++;assert.equal(reads,0)
 console.log(JSON.stringify({fixture:{u890aVS1:{strokes,fullProof:proof,identity:selectedProofIdentity,sourceGroups,nativeApproval:false,runtimeApplied:false,registered:false,sourceProjectionRuns:1}},geometrySHA256:sha(JSON.stringify(strokes)),strictGuardFIRST:true,positiveCompileRuns:1,negativeCases:rejected,getterReads:reads,engineRuns:0,nativeApproval:false}))
})
