import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "minimum-original-pens-19-exceeds-catalog-17"
export function compileProgressive(trace, proof, identity = SELECTED_PROOF_IDENTITY) {
  validateSelectedProof(trace, proof, identity)
  throw new Error(blockedReason)
}

function validateSelectedProof(trace, proof, identity) {
  assert.deepEqual(identity, SELECTED_PROOF_IDENTITY, 'Selected source root, proof file and exact file SHA are pinned')
  const bytes = readFileSync(new URL(sourceProofFile, import.meta.url))
  assert.equal(createHash('sha256').update(bytes).digest('hex'), sourceProofFileSha256, 'Pinned source proof file SHA256')
  const headerBytes = readFileSync(new URL(sourceHeaderFile, import.meta.url))
  assert.equal(createHash('sha256').update(headerBytes).digest('hex'), sourceHeaderFileSha256, 'Pinned full engine header file SHA256')
  assert.deepEqual(Object.keys(proof).sort(), ORIGINAL_PROOF_KEYS, 'Complete engine header and original proof keys are pinned')
  assert.equal(digest(proof), PROOF_SHA256, 'Entire selected proof, including full header, remains unchanged')
  assert.equal(digest(trace), TRACE_SHA256)
  assert.equal(digest(proof.groups), GROUPS_SHA256)
  assert.deepEqual(Object.fromEntries(Object.entries(proof).filter(([key]) => key !== 'trace' && key !== 'groups')), FULL_SOURCE_HEADER)
  assert.deepEqual(proof.defaults, PINNED_DEFAULTS)
  assert.equal(proof.engineRevision, ENGINE_REVISION)
  assert.deepEqual(proof.engineHashes, ENGINE_HASHES)
}

export const sourceRoot = "u7e36"
export const sourceProofFile = "./engine-whole-u7e36.json"
export const sourceProofFileSha256 = "53e98d6ac0d2e78a94b17603dae501fc90f678e2afb414f6722307b1cd8d6264"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "479d193a73b2f621aee303e9a39a1fbabc11d1854510271dbb83b32e0bcc1cda"
export const selectedProofIdentity = {"sourceRoot":"u7e36","sourceProofFile":"./engine-whole-u7e36.json","sourceProofFileSha256":"53e98d6ac0d2e78a94b17603dae501fc90f678e2afb414f6722307b1cd8d6264","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"479d193a73b2f621aee303e9a39a1fbabc11d1854510271dbb83b32e0bcc1cda"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u7e36","sourceProofFile":"./engine-whole-u7e36.json","sourceProofFileSha256":"53e98d6ac0d2e78a94b17603dae501fc90f678e2afb414f6722307b1cd8d6264","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"479d193a73b2f621aee303e9a39a1fbabc11d1854510271dbb83b32e0bcc1cda"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "1c0a09f6b95e57738d6e53793ab04fa57e0f337140b2470062a7a662bba191c0"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 20
const ORIGINAL = [[{"kind":"cdDrawLine","args":[20,32.48,98,32.48,0,0]}],[{"kind":"cdDrawLine","args":[58,14.12,58,51.92,0,32]}],[{"kind":"cdDrawLine","args":[12,51.92,105,51.92,0,100]}],[{"kind":"cdDrawCurve","args":[31,54.08,40,60.56,44,73.52,7,8]}],[{"kind":"cdDrawCurve","args":[82,55.16,76,64.88,66,75.68,0,7]}],[{"kind":"cdDrawLine","args":[13,75.68,104,75.68,0,100]}],[{"kind":"cdDrawLine","args":[19,95.12,96,95.12,0,0]}],[{"kind":"cdDrawLine","args":[58,75.68,58,115.64,32,300]}],[{"kind":"cdDrawLine","args":[134,14.12,134,50.84,0,1]},{"kind":"cdDrawCurve","args":[134,50.84,133,89.72,108,100.52,1,7]}],[{"kind":"cdDrawLine","args":[105,40.04,162,40.04,0,2]}],[{"kind":"cdDrawCurve","args":[162,40.04,159,104.84,183,111.32,22,15]}],[{"kind":"cdDrawCurve","args":[106,57.32,136,67.04,149,89.72,7,8]}],[{"kind":"cdDrawCurve","args":[98,99.39,86,111.5,70,123.61,0,7]}],[{"kind":"cdDrawCurve","args":[44,111.5,70,121.015,82,137.45,7,8]}],[{"kind":"cdDrawCurve","args":[137,109.77,118,126.205,88,146.1,0,7]}],[{"kind":"cdDrawCurve","args":[21,149.56,76,147.82999999999998,164,142.64,0,7]}],[{"kind":"cdDrawCurve","args":[139,125.34,164,137.45,175,154.75,7,8]}],[{"kind":"cdDrawLine","args":[100,147.82999999999998,100,185.89,32,100]}],[{"kind":"cdDrawCurve","args":[68,158.21,53,173.78,24,186.755,0,7]}],[{"kind":"cdDrawCurve","args":[125,153.885,152,165.995,166,183.295,7,8]}]]
const TRACE_SHA256 = "25d3ae9b09873b29b8f6ccd97185304fba9920cee88953aa7c580115b06d7025"
const GROUPS_SHA256 = "0655bfc3559073923efcf85979684a16ee110c463ef0561d792e7be61cc303ba"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
