import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
assert.equal(sha(readFileSync(new URL('./progressive.mjs',import.meta.url))),"991e7b29dd5283197cce7687c88eb1f565bcc654f9b266ab90756cb72fd2800c",'Original compiler bytes')
export const sourceOrderPermutation=Object.freeze([1,2,3,4,5,6,7,8,9,12,10,11])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>original.sourceGroups[n-1]))
export function compileSourceWhole(root,trace,proof,fileIdentity){
 assert.equal(root,'u6913','Only explicitly selected base whole may compile')
 assert.deepEqual(fileIdentity,original.wholeSourceIdentities[root],'Exact root/file/fileSHA256 identity required')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','sourceProofFile','sourceProofFileSHA256','sourceRoot','trace'])
 assert.equal(sha(JSON.stringify(proof)),'49ef345819177270739876a5319cc29e96dac1764210b0f4abfa5cd6f0e2880e','Complete original eight-field proof attribution remains pinned')
 const before=JSON.stringify({trace,proof,fileIdentity})
 const base=original.compileSourceWhole(root,trace,proof,fileIdentity)
 assert.equal(base.length,12)
 const out=sourceOrderPermutation.map(n=>base[n-1])
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:12},(_,i)=>i+1))
 assert.equal(out.flat().length,13)
 for(let i=0;i<12;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(base[sourceOrderPermutation[i]-1])))
 assert.equal(JSON.stringify({trace,proof,fileIdentity}),before)
 return out
}
export function compileProgressive(trace,proof,fileIdentity){return compileSourceWhole('u6913',trace,proof,fileIdentity)}
export const nativeApproval=false
export const runtimeApplied=false
