import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=value=>createHash('sha256').update(value).digest('hex')
export const sourceRoot="u51d7"
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u51d7","sourceProofFile":"engine-whole-u51d7.json","sourceProofFileSha256":"fab272737e32a9014e2f7e15ce7ccbfa8ad81eacad5dd3c7dddda1e5d5430a4d","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"6f1a58e9442e481f0f09d71d2d3895c4def9044179c246652682a9ca9d43ba1c"})
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4,5],[6],[7],[8,14],[9],[10],[11],[12],[13]].map(g=>Object.freeze(g)))
export const blockedReason="nonconsecutive-original-enclosure-raw8-14"
const fullProofSHA256="14b3fb7c8e3ee6de9803c266ae8c1e7237d5ba18f21daed9a5e7dfaf24f2fea3"
export function compileProgressive(trace,proof,identity) {
  assert.deepEqual(identity,selectedProofIdentity,'Explicit whole root/file/body SHA/header SHA is required')
  assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
  assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(sha(JSON.stringify(proof)),fullProofSHA256,'Complete original body, defaults and 8-engine header are fixed')
  assert.deepEqual(trace,proof.trace,'Argument trace and all original polygons are fixed')
  throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
