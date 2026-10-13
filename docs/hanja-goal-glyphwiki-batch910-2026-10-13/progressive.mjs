import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "native-boundary-evidence-required-raw4-empty-min13-below14"
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

export const sourceRoot = "u7472"
export const sourceProofFile = "./engine-whole-u7472.json"
export const sourceProofFileSha256 = "6c7bf5b26c93fae335cde031027c9bf94b44b61db18291490cb1ba220e44dd1b"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "af8725be5086be13abba604572e76bad4ed1abf342557f3287556e9d81462e6e"
export const selectedProofIdentity = {"sourceRoot":"u7472","sourceProofFile":"./engine-whole-u7472.json","sourceProofFileSha256":"6c7bf5b26c93fae335cde031027c9bf94b44b61db18291490cb1ba220e44dd1b","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"af8725be5086be13abba604572e76bad4ed1abf342557f3287556e9d81462e6e"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u7472","sourceProofFile":"./engine-whole-u7472.json","sourceProofFileSha256":"6c7bf5b26c93fae335cde031027c9bf94b44b61db18291490cb1ba220e44dd1b","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"af8725be5086be13abba604572e76bad4ed1abf342557f3287556e9d81462e6e"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "2928c6335be9fd62637643a862ed07d72027493839791993be75c78de6cec569"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 17
const ORIGINAL = [[{"kind":"cdDrawLine","args":[14,42,75,42,0,0]}],[{"kind":"cdDrawLine","args":[41,42,41,149,32,32]}],[{"kind":"cdDrawLine","args":[17,93,72,93,0,0]}],[{"kind":"cdDrawCurve","args":[14,160,43,150,78,135,0,7]}],[],[{"kind":"cdDrawCurve","args":[131.6,16,110,53,68,78,0,7]}],[{"kind":"cdDrawCurve","args":[126.80000000000001,19,152,53,183.2,65,7,0]}],[{"kind":"cdDrawLine","args":[102.80000000000001,65,155.6,65,0,100]}],[{"kind":"cdDrawLine","args":[98,81,98,113,12,1]},{"kind":"cdDrawCurve","args":[98,113,98,158,69.2,184,1,7]}],[{"kind":"cdDrawLine","args":[98,81,162.8,81,0,2]}],[{"kind":"cdDrawLine","args":[162.8,81,162.8,117,22,223]}],[{"kind":"cdDrawLine","args":[98,99,162.8,99,2,2]}],[{"kind":"cdDrawLine","args":[98,117,162.8,117,2,2]}],[{"kind":"cdDrawLine","args":[110,141,110,173,12,113]}],[{"kind":"cdDrawLine","args":[110,141,167.6,141,2,2]}],[{"kind":"cdDrawLine","args":[167.6,141,167.6,173,22,123]}],[{"kind":"cdDrawLine","args":[110,173,167.6,173,2,2]}]]
const TRACE_SHA256 = "7102737f5f0038fb979e4a79632beeac1235da5440ab5652711e36a75ae0e5f3"
const GROUPS_SHA256 = "9b06070ebbefc2c1bcf667d0222e495d7e9532f46a24159012ad629efe68e8ef"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
