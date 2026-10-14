import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u7d7a","sourceProofFile":"./engine-whole-u7d7a.json","sourceProofFileSha256":"611e55e39e0ece888384112c74ccf7575534e31a5340789b01b333bac1ef112f","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"8ca5792ecff90e6324438b4fdaa6d64cb038762bd4f0b62a79948ce95d9966a6"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="minimum-original-pens-15-exceeds-catalog-13"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact whole file/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"48e1f7b44d0d008a38f38c3f1df90526298869a8f22e68108ab74b12a18fc552",'Complete original geometry and engine header are pinned')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
