import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

// This guard preserves missing original geometry. It never emits a stroke.
export const sourceRoot = "u7e86"
export const selectedProofIdentity = {
  "sourceRoot": "u7e86",
  "sourceProofFile": "./engine-whole-u7e86.json",
  "sourceProofFileSha256": "362b63e5990e538a4bb90c902026907903106125a23328a142b6740acd23b1a9",
  "sourceHeaderFile": "./engine-proof.json",
  "sourceHeaderFileSha256": "38030b1970dff74eac82a2d5200218a94fcb82427faacfc09ff1308a642791c9",
  "sourceMetadataFile": "./sources.json",
  "sourceMetadataFileSha256": "60819413bdf3bc11cc39d2bba04360b5eed7de8baceabde3a573e6c5796898e0"
}
export const sourceProofFile = selectedProofIdentity.sourceProofFile
export const sourceProofFileSha256 = selectedProofIdentity.sourceProofFileSha256
export const sourceProofFileSHA256 = sourceProofFileSha256
export const sourceGroups = []
export const nativeApproved = false
export const runtimeApplied = false
export const approvalStatus = 'blocked-missing-fixed-whole-dependency'
export const missingFixedDependencies = ["u571f-j"]
const FULL_PROOF_SHA256 = "b4bcb988cd6b4e7ea9afd2e7b7cf029e8171b7a17b6d31c9e864308b65f6cd89"
const sha = value => createHash('sha256').update(typeof value === 'string' || Buffer.isBuffer(value) ? value : JSON.stringify(value)).digest('hex')

export function compileProgressive(trace, proof, identity) {
  assert.deepEqual(identity, selectedProofIdentity, 'Explicit pinned whole identity required')
  for (const [fileKey, hashKey] of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']]) {
    assert.equal(sha(readFileSync(new URL(identity[fileKey], import.meta.url))), identity[hashKey], 'Original source file bytes must remain pinned')
  }
  assert.equal(sha(proof), FULL_PROOF_SHA256, 'Full proof, header, trace, groups and preset are pinned')
  assert.equal(trace, null, 'Missing original trace must stay null')
  assert.equal(proof.trace, null)
  assert.equal(proof.groups, null)
  assert.equal(proof.defaults, null)
  assert.equal(proof.root, sourceRoot)
  assert.equal(proof.status, 'blockedMissingFixedDependency')
  assert.deepEqual(proof.missing, missingFixedDependencies)
  throw new Error('sourceMissing-wholeGeometryNull')
}
