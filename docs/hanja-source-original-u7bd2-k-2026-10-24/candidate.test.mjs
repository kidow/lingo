import assert from'node:assert/strict'
import{test}from'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{compileProgressive,selectedProofIdentity,sourceGroups}from'./candidate.mjs'
const clone=x=>JSON.parse(JSON.stringify(x)),proof=JSON.parse(readFileSync(new URL('./engine-proof.json',import.meta.url)))
test('篒 exact full5 and existing15 order FIRST',()=>{
 const strokes=compileProgressive(proof.trace,proof,selectedProofIdentity)
 assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0)],[15,17,35])
 assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5],[6],[7],[8],[10,11],[12],[13],[9,14],[15],[16]])
 assert.equal(strokes[12][0].direction,'down');assert.equal(strokes[12][0].revealPath,undefined)
 assert.equal(strokes[12][1].revealPath,'M15.5 90.5175 Q37 86.475 58 81.33')
 let negative=0
 const wrong={...selectedProofIdentity,sourceRoot:'u7bd2'};assert.throws(()=>compileProgressive(proof.trace,proof,wrong));negative++
 assert.throws(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,extra:true}));negative++
 const p=clone(proof);p.groups[0].raw[3]+=.01;assert.throws(()=>compileProgressive(p.trace,p,selectedProofIdentity));negative++
 const t=clone(proof.trace);t[0][0].args[0]+=.01;assert.throws(()=>compileProgressive(t,proof,selectedProofIdentity));negative++
 const h=clone(proof);h.defaults.kWidth++;assert.throws(()=>compileProgressive(h.trace,h,selectedProofIdentity));negative++
 let reads=0;const a=clone(proof);Object.defineProperty(a,'defaults',{enumerable:true,get(){reads++;return proof.defaults}});assert.throws(()=>compileProgressive(proof.trace,a,selectedProofIdentity));negative++;assert.equal(reads,0)
 console.log(JSON.stringify({fixture:{u7bd2K:{strokes,fullProof:proof,identity:selectedProofIdentity,sourceGroups,nativeApproval:false,runtimeApplied:false,registered:false,sourceProjectionRuns:1}},geometrySHA256:createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),positiveCompileRuns:1,negativeCases:negative,getterReads:reads,engineRuns:0,originalMasks17:true,originalP35:true}))
})
