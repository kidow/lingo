import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u8fe8-ue0102","sourceProofFile":"engine-whole-u8fe8-ue0102.json","sourceProofFileSha256":"3f6386eb511ca16586c38568f05a7c6fed3f7a23641d6fbb70a4006d2d3f9950","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"b761033f1011dae76fe3d30324ddae06448954c52a583305ee2ee085f21f80b1"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1,2],[3],[4],[5],[6],[7],[8,11],[9,10]].map(g=>Object.freeze(g)))
export const blockedReason="nonconsecutive-original-enclosure"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact whole file/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"20551d60ce7a86c9c5975f50c81afb0f9cc9701e34836da47f1ff9295229a393",'Complete original geometry and engine header are pinned')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
