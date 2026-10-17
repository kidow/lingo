import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u84f7-ue0102","sourceProofFile":"engine-whole-u84f7-ue0102.json","sourceProofFileSHA256":"cbe4c51a6a1a6552a778a94c7ad5cc0e99e4426e907ee1670a0bf9cc38b8ae2d"})
export const sourceOrderPermutation=Object.freeze([1,2,4,3,5,6,7,8,9,10,11,13,14,12,15])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>Object.freeze([...original.sourceGroups[n-1]])))
const SOURCE_HEADER_SHA256='5fe3095208c76a4fb82c88a500d6a4bd57800c44e9909c47271a0ec5a7ee4f8e'
assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),'4c54269328b421e07d8ee5c0ca7161c5a6f966b3e6cbfe8fc9cb092f810256f5','Original compiler bytes')
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact original uppercase-SHA three-field identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSHA256)
 assert.equal(sha(readFileSync(new URL('engine-proof.json',import.meta.url))),SOURCE_HEADER_SHA256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),'25d4245c9a74ce598a4e6bc9cc09680820c832916e610a36d367f254e3b6f825','Complete original full5 proof remains pinned')
 assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify({trace,proof,identity}),base=original.compileProgressive(trace,proof)
 assert.equal(base.length,15);assert.equal(base.flat().length,16)
 assert.equal(sha(JSON.stringify(base)),'ccfefbc4c2419c63d9716b9acc671d4e2f56c6185906615da0b94a070b20d3c6')
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:15},(_,i)=>i+1))
 const out=sourceOrderPermutation.map(n=>base[n-1])
 for(let i=0;i<15;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(base[sourceOrderPermutation[i]-1])))
 assert.equal(JSON.stringify({trace,proof,identity}),before)
 return out
}
export const nativeApproval=false
export const runtimeApplied=false
