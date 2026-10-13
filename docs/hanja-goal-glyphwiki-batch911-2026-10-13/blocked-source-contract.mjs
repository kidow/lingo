import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const sha = value => createHash('sha256').update(value).digest('hex')
export const selectedProofIdentity = Object.freeze({"sourceRoot":"u97d4","sourceProofFile":"./engine-whole-u97d4.json","sourceProofFileSha256":"bdf34b3271766ea67689b1defad2e0cf19159cf2d20fd31545b160787fd29171","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"e8a2b01d26c9cd76964af97ae98e2c458039f659a95ef1e7a30ba1bfb5a8ece4"})
export const sourceRoot = selectedProofIdentity.sourceRoot
export const blockedReason = "nonconsecutive-original-enclosure-raw4-7-and-raw12-17"
export const originalCandidateGroups = Object.freeze([[0,1],[2],[3],[4,7],[5,6],[8],[9],[10],[11],[12,17],[13],[14],[15],[16],[18],[19],[20]].map(g=>Object.freeze(g)))
export const nonconsecutiveGroups = Object.freeze([[4,7],[12,17]].map(g=>Object.freeze(g)))
const fullProofSHA256 = "7a94408d12337698d02178aca56825b6bebb56e80b5d1760477ee0118bda3b34"
export function validateBlockedCandidate(trace,proof,identity) {
  assert.deepEqual(identity,selectedProofIdentity,'Explicit fixed root/file/whole SHA/header SHA identity is required')
  const bytes=readFileSync(new URL(identity.sourceProofFile,import.meta.url))
  const headerBytes=readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))
  assert.equal(sha(bytes),identity.sourceProofFileSha256)
  assert.equal(sha(headerBytes),identity.sourceHeaderFileSha256)
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(sha(JSON.stringify(proof)),fullProofSHA256,'Complete original proof and full engine header are fixed')
  assert.deepEqual(trace,proof.trace,'Original independent trace is fixed')
  assert.deepEqual(originalCandidateGroups.filter(g=>g.some((v,i)=>i>0&&v!==g[i-1]+1)),nonconsecutiveGroups)
  throw new Error(blockedReason)
}
export const compiledPens = 0
export const compiledMasks = 0
export const nativeApproval = false
export const runtimeApplied = false
