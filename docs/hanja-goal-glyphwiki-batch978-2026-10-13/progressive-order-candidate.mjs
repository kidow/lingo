import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u7cba","sourceProofFile":"./engine-whole-u7cba.json","sourceProofFileSha256":"a19ba8acdecb926494743b63408eac407f71b892a577c719b37994a8e4b1626e","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"56b85a3e1630c785812dfb31fe16cef16815d075fc227070b353e257102bf2a6"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceOrderPermutation=Object.freeze([1,2,3,4,5,6,13,7,8,9,10,14,11,12])
const profile=original.candidateWholeProofs.find(p=>p.identity.sourceRoot===sourceRoot)
assert(profile);assert.deepEqual(profile.identity,selectedProofIdentity)
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>Object.freeze([...profile.sourceGroups[n-1]])))
assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),'204c62e750f69adcf37bec4352bcfd94c5a581274cf98485575a9802b5592d39')
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Explicit trace/proof/identity are mandatory')
 assert.deepEqual(identity,selectedProofIdentity,'Exact inner5 lowercase Sha256 and ./ prefixes')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),'2b62b80784565d81ca8b2a465e912522501d8d6c5bf6582a3bdbb612ef39133c')
 assert.deepEqual(trace,proof.trace);assert.equal(proof.trace[6].length,0);assert.equal(proof.groups[6].polygons.length,0)
 assert.deepEqual(profile.sourceGroups[5],[5,6],'Original empty raw6 membership remains intact')
 const before=JSON.stringify(proof),base=original.compileSourceWhole(sourceRoot,trace,proof,identity)
 assert.equal(sha(JSON.stringify(base)),'f992d1c33f0b1f4abd39a86f48f74133a4ff3208a634dd134ea2196e1e4620de')
 assert.equal(base.length,14);assert.equal(base.flat().length,14)
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:14},(_,i)=>i+1))
 const out=sourceOrderPermutation.map(n=>base[n-1])
 for(let i=0;i<14;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(base[sourceOrderPermutation[i]-1])))
 assert.equal(sha(JSON.stringify(out)),'e7967515b3668d5ccf2a88868009e42ba8b7699ebdf16ca392d8058684161019')
 assert.equal(JSON.stringify(proof),before)
 return out
}
export function compileSourceWhole(root,trace,proof,identity){
 assert.equal(arguments.length,4,'Explicit root/trace/proof/identity are mandatory')
 assert(identity);assert.equal(root,identity.sourceRoot)
 return compileProgressive(trace,proof,identity)
}
export const nativeApproval=false
export const runtimeApplied=false
