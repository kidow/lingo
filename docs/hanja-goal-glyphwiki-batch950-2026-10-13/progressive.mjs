import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "minimum-original-pens-15-exceeds-catalog-13"
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

export const sourceRoot = "u7d85"
export const sourceProofFile = "./engine-whole-u7d85.json"
export const sourceProofFileSha256 = "cee1fe49497bf4b741e1b06ca9b73dacadda7e975e4926420937caa3b2ea5c0c"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "e8ef74a7a640edd8e94f088bba54260334bcb436aba10326ad172b7a58a26d83"
export const selectedProofIdentity = {"sourceRoot":"u7d85","sourceProofFile":"./engine-whole-u7d85.json","sourceProofFileSha256":"cee1fe49497bf4b741e1b06ca9b73dacadda7e975e4926420937caa3b2ea5c0c","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"e8ef74a7a640edd8e94f088bba54260334bcb436aba10326ad172b7a58a26d83"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u7d85","sourceProofFile":"./engine-whole-u7d85.json","sourceProofFileSha256":"cee1fe49497bf4b741e1b06ca9b73dacadda7e975e4926420937caa3b2ea5c0c","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"e8ef74a7a640edd8e94f088bba54260334bcb436aba10326ad172b7a58a26d83"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "8af797e3ed009a1b8f630ea9346a45d3af79fcf964da48b788b3bfc515eae1c0"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 18
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[50.85,16,40.7,37,28.375,56,0,7]}],[{"kind":"cdDrawCurve","args":[13.15,45,30.55,56,37.8,76,7,8]}],[{"kind":"cdDrawCurve","args":[71.875,39,51.575,76,27.65,110,0,7]}],[{"kind":"cdDrawCurve","args":[14.6,113,45.05,109,71.875,101,0,7]}],[{"kind":"cdDrawCurve","args":[56.65,78,70.425,91,76.225,114,7,8]}],[{"kind":"cdDrawLine","args":[47.95,109,47.95,186,32,0]}],[{"kind":"cdDrawCurve","args":[30.55,127,27.65,155,13.15,180,0,7]}],[{"kind":"cdDrawCurve","args":[57.375,122,70.425,136,75.5,161,7,8]}],[{"kind":"cdDrawLine","args":[106.28,24,163.79,24,0,2]}],[{"kind":"cdDrawLine","args":[163.79,24,163.79,70,22,223]}],[{"kind":"cdDrawLine","args":[94.13,47,186.47,47,0,200]}],[{"kind":"cdDrawLine","args":[106.28,70,163.79,70,0,2]}],[{"kind":"cdDrawCurve","args":[95.07365,82.4,95.6528,106.45,86.3864,114.25,7,8]}],[{"kind":"cdDrawLine","args":[95.6528,92.15,179.0504,92.15,0,2]}],[{"kind":"cdDrawCurve","args":[179.0504,92.15,175.5755,99.95,167.46740000000003,112.95,22,7]}],[{"kind":"cdDrawLine","args":[99.8,116,162.17000000000002,116,0,2]}],[{"kind":"cdDrawCurve","args":[162.17000000000002,116,141.92000000000002,168,75.5,185,22,7]}],[{"kind":"cdDrawCurve","args":[115.19,116,132.2,166,177.56,178,7,0]}]]
const TRACE_SHA256 = "7cdb528d9ab141a8ca2cd62559395ecfaf851db8267b0835929b719aae28f8ee"
const GROUPS_SHA256 = "553c72cad881bf81bdb56cb3c8a71300b1151628961cf4980f876ea4a2714c69"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
