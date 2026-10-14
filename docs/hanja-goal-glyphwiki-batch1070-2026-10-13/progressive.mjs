import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

// This guard preserves missing original geometry. It never emits a stroke.
export const sourceRoot = "u9f10"
export const selectedProofIdentity = {
  "sourceRoot": "u9f10",
  "sourceProofFile": "./engine-whole-u9f10.json",
  "sourceProofFileSha256": "67602125fef7b271238afe7cfb1b36c2a6d981d6ed299c8f6c06ecfa86f0a730",
  "sourceHeaderFile": "./engine-proof.json",
  "sourceHeaderFileSha256": "12388c473294fe04b13dc92e17e014cbdc4dfb86c1b6396f42f003be19e453cd",
  "sourceMetadataFile": "./sources.json",
  "sourceMetadataFileSha256": "5669687895506aaf2ddc25e6692931fcfe13d3fdb054421f6fbf1bbb666970e9"
}
export const sourceProofFile = selectedProofIdentity.sourceProofFile
export const sourceProofFileSha256 = selectedProofIdentity.sourceProofFileSha256
export const sourceProofFileSHA256 = sourceProofFileSha256
export const sourceGroups = []
export const nativeApproved = false
export const runtimeApplied = false
export const approvalStatus = 'blocked-missing-fixed-whole-dependency'
export const missingFixedDependencies = ["u76ee-j"]
const FULL_PROOF_SHA256 = "fd2fdd191a5d668d1974984d68d4fc52d74473e1f3abd1a5cb1fa79ba266a3f2"
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
