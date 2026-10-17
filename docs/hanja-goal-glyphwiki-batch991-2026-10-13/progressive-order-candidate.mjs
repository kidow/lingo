import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"root":"u924d","file":"engine-whole-u924d.json","fileSHA256":"75f457eb2999aeabdcaac8b63d09569fa6bc1e3ba04fa931c69e3750eda0e04a"})
export const selectedOuterIdentity=Object.freeze({"root":"u924d","sourceProofFile":"engine-whole-u924d.json","sourceProofFileSHA256":"75f457eb2999aeabdcaac8b63d09569fa6bc1e3ba04fa931c69e3750eda0e04a","engineHeaderSHA256":"75f457eb2999aeabdcaac8b63d09569fa6bc1e3ba04fa931c69e3750eda0e04a","sourceFileSHA256":"11fd773aa6e59333187ef44d08a7b54b42e2812f3d2ede08c7d061d5f0579d52","compilerFileSHA256":"33411312e63fc1353cdf92fefc465b615ae1744d92559f017e16615c28897b24"})
export const sourceRoot=selectedProofIdentity.root
export const sourceOrderPermutation=Object.freeze([1,2,3,4,5,6,7,8,11,13,10,9,12])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>Object.freeze([...original.sourceGroups[n-1]])))
assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),selectedOuterIdentity.compilerFileSHA256)
assert.deepEqual(original.wholeSourceIdentities[sourceRoot],selectedProofIdentity)
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Explicit original identity3 is mandatory')
 assert.deepEqual(identity,selectedProofIdentity,'Exact original root/file/fileSHA256 casing')
 for(const[file,pin]of Object.entries({[identity.file]:identity.fileSHA256,'engine-proof.json':selectedOuterIdentity.engineHeaderSHA256,'sources.json':selectedOuterIdentity.sourceFileSHA256}))assert.equal(sha(readFileSync(new URL(file,import.meta.url))),pin)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),'dcdb84d6fecfe5443e54a289ad3753c317faf8c272b92c2593cdb8ca636636ea','Complete original full5 proof')
 assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),base=original.compileSourceWhole(sourceRoot,trace,proof,identity)
 assert.equal(JSON.stringify(proof),before);assert.equal(sha(JSON.stringify(base)),'5bfe4eb0f4ef5bcda73812ea6e0e2099ae8b06cc0cbb37af6a628704d8f53080')
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:13},(_,i)=>i+1))
 const out=sourceOrderPermutation.map(n=>base[n-1]);assert.equal(out.length,13);assert.equal(out.flat().length,14)
 for(let i=0;i<13;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(base[sourceOrderPermutation[i]-1])))
 assert.equal(sha(JSON.stringify(out)),'d0ff539f4d946271eece354ac914120c708c02a6069395db9fc9fdf601835b20','Complete original masks only, unchanged directions/paths/widths')
 return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,selectedProofIdentity.root);return compileProgressive(trace,proof,identity)}
export function compileWithOuterIdentity(trace,proof,identity){assert.equal(arguments.length,3);assert.deepEqual(identity,selectedOuterIdentity,'Exact original outer6 caller identity');return compileProgressive(trace,proof,selectedProofIdentity)}
export const nativeApproval=false
export const runtimeApplied=false
