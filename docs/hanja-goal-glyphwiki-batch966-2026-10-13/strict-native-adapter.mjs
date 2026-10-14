import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u90b0","sourceProofFile":"engine-whole-u90b0.json","sourceProofFileSha256":"b19f2a5114acb5851aaac25d09b003366d73b2f5f0e70205772716d58313b5c2","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"d137e247819ed2a62185f045fb97dc24f48632cfbb1d210f6cdb6ffe88d58e8d"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3,6],[4,5],[7,8],[9],[10]].map(g=>Object.freeze(g)))
export const blockedReason="nonconsecutive-original-enclosure"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact whole file/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"de50edca62f3307d3447546caa6a3e92f5fcac09cd8a002e94b798b09e22a7fc",'Complete original geometry and engine header are pinned')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
