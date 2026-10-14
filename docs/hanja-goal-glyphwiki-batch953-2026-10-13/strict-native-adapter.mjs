import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u7e36","sourceProofFile":"./engine-whole-u7e36.json","sourceProofFileSha256":"53e98d6ac0d2e78a94b17603dae501fc90f678e2afb414f6722307b1cd8d6264","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"479d193a73b2f621aee303e9a39a1fbabc11d1854510271dbb83b32e0bcc1cda"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="minimum-original-pens-19-exceeds-catalog-17"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact whole file/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"1c0a09f6b95e57738d6e53793ab04fa57e0f337140b2470062a7a662bba191c0",'Complete original geometry and engine header are pinned')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
