import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const sha = value => createHash('sha256').update(value).digest('hex')
export const selectedProofIdentity = Object.freeze({"sourceRoot":"u5dd1","sourceProofFile":"./engine-whole-u5dd1.json","sourceProofFileSha256":"0017937e30d3e71b7069b52ab4729607f91895845a55371ad2af50422e5be972","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"5de1eb01d2643c77f91cb6d676cd5a8f1a5d1347550da7e0b06f3e7307fe0cad"})
export const sourceRoot = selectedProofIdentity.sourceRoot
export const blockedReason = "nonconsecutive-original-enclosure-raw17-22"
export const originalCandidateGroups = Object.freeze([[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17,22],[18,19],[20],[21],[23],[24]].map(g=>Object.freeze(g)))
export const nonconsecutiveGroups = Object.freeze([[17,22]].map(g=>Object.freeze(g)))
const fullProofSHA256 = "917e1707198d8ce87cc7343d8c0c97f48f86d08ea43dc5ee92166483290af574"
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
