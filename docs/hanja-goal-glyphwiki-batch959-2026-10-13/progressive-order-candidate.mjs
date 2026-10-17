import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
assert.equal(sha(readFileSync(new URL('./progressive.mjs',import.meta.url))),"441a899527e22fdf3c53aa5caa9f784a348b70797610d699e3b0d53b96b64e21",'Original compiler bytes')
export const sourceOrderPermutation=Object.freeze([1,2,4,5,3,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>original.sourceGroups[n-1]))
export function compileSourceWhole(root,trace,proof,fileIdentity){
 assert.equal(root,'u9a52','Only explicitly selected base whole may compile')
 assert.deepEqual(fileIdentity,original.wholeSourceIdentities[root],'Exact root/file/fileSHA256 identity required')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','sourceProofFile','sourceProofFileSHA256','sourceRoot','trace'])
 assert.equal(sha(JSON.stringify(proof)),'7dc6356e60e854e8e873ff6f9e1c8b4ea9c2b18913d87516926f0ba3fb1acdec','Complete original eight-field proof attribution remains pinned')
 const before=JSON.stringify({trace,proof,fileIdentity})
 const base=original.compileSourceWhole(root,trace,proof,fileIdentity)
 assert.equal(base.length,22)
 const out=sourceOrderPermutation.map(n=>base[n-1])
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:22},(_,i)=>i+1))
 assert.equal(out.flat().length,23)
 for(let i=0;i<22;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(base[sourceOrderPermutation[i]-1])))
 assert.equal(JSON.stringify({trace,proof,fileIdentity}),before)
 return out
}
export function compileProgressive(trace,proof,fileIdentity){return compileSourceWhole('u9a52',trace,proof,fileIdentity)}
export const nativeApproval=false
export const runtimeApplied=false
