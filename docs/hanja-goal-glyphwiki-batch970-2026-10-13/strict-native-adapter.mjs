import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u564b","sourceProofFile":"engine-whole-u564b.json","sourceProofFileSha256":"9e468c43ae57c61254b5ce92073ccf53e8d86c1c6c0ab254853a7059aa1c2410","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"1fc94a42491373532b26a978d70943bd9e23e3d4d882e0eedfb143587ec22110"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1,2],[3],[4],[5],[6],[7,8],[9,11],[10],[12],[13],[14],[15],[16],[17]].map(g=>Object.freeze(g)))
export const blockedReason="nonconsecutive-original-enclosure"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact whole file/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"f811054ce16f917d18994fec10f79c14fb8790a13bdea229f6cc92269cfde698",'Complete original geometry and engine header are pinned')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
