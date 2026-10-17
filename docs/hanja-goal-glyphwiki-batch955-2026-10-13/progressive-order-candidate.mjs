import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
assert.equal(sha(readFileSync(new URL('./progressive.mjs',import.meta.url))),"c49463b1c789661392e575e4dd46b86e6819178d33abfec6aa43a409307c1956",'Original compiler bytes')
export const sourceOrderPermutation=Object.freeze([1,2,3,4,6,5,7,8,9,10,11,12,13,14,15,16])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>original.sourceGroups[n-1]))
export function compileSourceWhole(root,trace,proof,fileIdentity){
 assert.equal(root,'u9b80','Only explicitly selected base whole may compile')
 assert.deepEqual(fileIdentity,original.wholeSourceIdentities[root],'Exact root/file/fileSHA256 identity required')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','sourceProofFile','sourceProofFileSHA256','sourceRoot','trace'])
 assert.equal(sha(JSON.stringify(proof)),'23abb80728e4ed9dffb1b4b69e9dca546e48ad751ec73fea295e86707d9ed4f4','Complete original eight-field proof attribution remains pinned')
 const before=JSON.stringify({trace,proof,fileIdentity})
 const base=original.compileSourceWhole(root,trace,proof,fileIdentity)
 assert.equal(base.length,16)
 const out=sourceOrderPermutation.map(n=>base[n-1])
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:16},(_,i)=>i+1))
 assert.equal(out.flat().length,17)
 for(let i=0;i<16;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(base[sourceOrderPermutation[i]-1])))
 assert.equal(JSON.stringify({trace,proof,fileIdentity}),before)
 return out
}
export function compileProgressive(trace,proof,fileIdentity){return compileSourceWhole('u9b80',trace,proof,fileIdentity)}
export const nativeApproval=false
export const runtimeApplied=false
