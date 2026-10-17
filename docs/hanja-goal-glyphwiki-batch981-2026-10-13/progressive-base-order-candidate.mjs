import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as base from './progressive-base-candidate.mjs'
export * from './progressive-base-candidate.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u5fa7","sourceProofFile":"./engine-whole-u5fa7.json","sourceProofFileSha256":"b2206f3ca557e9667aa9ac5496bbc23d91a161c9a3da865d11e2d1f89bf1a26d","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"65f407a46de41a235666d33630ca11f926f8a7d065c7a981fc9b941098625098"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceOrderPermutation=Object.freeze([1,2,3,4,6,7,5,8,9,10,11,12])
assert.equal(sha(readFileSync(new URL('progressive-base-candidate.mjs',import.meta.url))),'e3ca382519af3c9590e55508d42db2dbef014c2f1a75bc5a28bf284cd6ac5cd3')
assert.deepEqual(base.selectedProofIdentity,selectedProofIdentity)
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>Object.freeze([...base.sourceGroups[n-1]])))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Explicit trace/proof/identity are mandatory')
 assert.deepEqual(identity,selectedProofIdentity,'Exact inner5 lowercase Sha256 and ./ prefix are mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),'3d6dabed2769fc89562cf8f9c57ebb4a12e6da1a78c4097c1edf0122d60dbb8c')
 assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),original=base.compileSourceWhole(sourceRoot,trace,proof,identity)
 assert.equal(sha(JSON.stringify(original)),'6b3b47e1ea2d6a4ea1636733137cb30a570503d6624313d1b64fce1e24221bdb')
 assert.equal(original.length,12);assert.equal(original.flat().length,13)
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:12},(_,i)=>i+1))
 const out=sourceOrderPermutation.map(n=>original[n-1])
 for(let i=0;i<12;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(original[sourceOrderPermutation[i]-1])))
 assert.equal(out.flat().length,13);assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),28)
 assert.equal(JSON.stringify(proof),before)
 return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Explicit root/trace/proof/identity are mandatory');assert(identity);assert.equal(root,identity.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
