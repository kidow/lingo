import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const sha = value => createHash('sha256').update(value).digest('hex')
export const selectedProofIdentity = Object.freeze({"sourceRoot":"u6faf","sourceProofFile":"./engine-whole-u6faf.json","sourceProofFileSha256":"11b5c2190fc244be637b93c04029d63a6158c1c85b89d682b5766170495e355f","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"11b5c2190fc244be637b93c04029d63a6158c1c85b89d682b5766170495e355f"})
export const sourceRoot = selectedProofIdentity.sourceRoot
export const blockedReason = "minimum-original-pens-17-exceeds-domestic-16"
export const originalCandidateGroups = Object.freeze([].map(g=>Object.freeze(g)))
export const nonconsecutiveGroups = Object.freeze([].map(g=>Object.freeze(g)))
const fullProofSHA256 = "95f76782a63f2b220dc92bd1d83d1a924d7ae2e11a1eda04a2726c2193b53503"
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
