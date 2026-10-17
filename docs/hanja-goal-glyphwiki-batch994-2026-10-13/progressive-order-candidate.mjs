import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"root":"u98f6","file":"engine-whole-u98f6.json","fileSHA256":"b534060ac868660acde2b7ef2d643afd8238b5b8268c717bc96848f2c51e3fdc"})
export const selectedOuterIdentity=Object.freeze({"root":"u98f6","sourceProofFile":"engine-whole-u98f6.json","sourceProofFileSHA256":"b534060ac868660acde2b7ef2d643afd8238b5b8268c717bc96848f2c51e3fdc","engineHeaderSHA256":"b534060ac868660acde2b7ef2d643afd8238b5b8268c717bc96848f2c51e3fdc","sourceFileSHA256":"8e5614b883cb8f09e946e40f8f2244e0adb15df8995ccaf1e5e999bb0a0df0ef","compilerFileSHA256":"8a9901a0c9444697912c7044a636310c3b1072f67b4be343814cea0c9825d5f7"})
export const sourceRoot=selectedProofIdentity.root
export const sourceOrderPermutation=Object.freeze([1,2,3,5,6,7,4,8,9,12,14,11,10,13])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>Object.freeze([...original.sourceGroups[n-1]])))
assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),selectedOuterIdentity.compilerFileSHA256)
assert.deepEqual(original.wholeSourceIdentities[sourceRoot],selectedProofIdentity)
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Explicit original identity3 is mandatory')
 assert.deepEqual(identity,selectedProofIdentity,'Exact original root/file/fileSHA256 casing')
 for(const[file,pin]of Object.entries({[identity.file]:identity.fileSHA256,'engine-proof.json':selectedOuterIdentity.engineHeaderSHA256,'sources.json':selectedOuterIdentity.sourceFileSHA256}))assert.equal(sha(readFileSync(new URL(file,import.meta.url))),pin)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),'a7716d8d3c14fa891d96a9a981ca3b84551394b6d42af204a4dc617fd4af111d','Complete original full5 proof')
 assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),base=original.compileSourceWhole(sourceRoot,trace,proof,identity)
 assert.equal(JSON.stringify(proof),before);assert.equal(sha(JSON.stringify(base)),'ebef42b16377c7d8555c4b83f0fcb7a059e453909b77def7d85f1c905fbbd872')
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:14},(_,i)=>i+1))
 const out=sourceOrderPermutation.map(n=>base[n-1]);assert.equal(out.length,14);assert.equal(out.flat().length,15)
 for(let i=0;i<14;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(base[sourceOrderPermutation[i]-1])))
 assert.equal(sha(JSON.stringify(out)),'c07e093fcbda02f271acc7ea1b0f9570339216c7b78d40994cde1164c7148499','Complete original masks only, unchanged directions/paths/widths')
 return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,selectedProofIdentity.root);return compileProgressive(trace,proof,identity)}
export function compileWithOuterIdentity(trace,proof,identity){assert.equal(arguments.length,3);assert.deepEqual(identity,selectedOuterIdentity,'Exact original outer6 caller identity');return compileProgressive(trace,proof,selectedProofIdentity)}
export const nativeApproval=false
export const runtimeApplied=false
