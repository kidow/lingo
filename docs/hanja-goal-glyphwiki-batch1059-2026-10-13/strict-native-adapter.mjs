import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u51de","sourceProofFile":"engine-whole-u51de.json","sourceProofFileSha256":"59adc1112c7e6456b67ecc86c6583f11475287bf71af5a8f0a6e429d5dddc91c","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"59adc1112c7e6456b67ecc86c6583f11475287bf71af5a8f0a6e429d5dddc91c"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="Catalog15 differs from unchanged domestic16 (SHA584c8c831fe65098988320ec174f4c96f21caa11f06e785fe7768910f9ceb59c). Preserve batches295/388 count and second ice-stroke native hold. Selected original raw1->2 gap30.347296831843202; no connector/transplant/reversal."
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"3d841c3c1a78f324c8cf0ab813ce629fbc1da4d8d54088d7b28cf104e9049c47",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
