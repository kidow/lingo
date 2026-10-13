import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "native-boundary-evidence-required-min16or17-below19"
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

export const sourceRoot = "u8806"
export const sourceProofFile = "./engine-whole-u8806.json"
export const sourceProofFileSha256 = "3013bede49f2da0142397e9a1972cb608ca7f4343fb740c9e6c85b3be9775f81"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "1fba65e62cc23e067d4afe88c9bfe987c3f65dec3306f83db13a23e7aaff0933"
export const selectedProofIdentity = {"sourceRoot":"u8806","sourceProofFile":"./engine-whole-u8806.json","sourceProofFileSha256":"3013bede49f2da0142397e9a1972cb608ca7f4343fb740c9e6c85b3be9775f81","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"1fba65e62cc23e067d4afe88c9bfe987c3f65dec3306f83db13a23e7aaff0933"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u8806","sourceProofFile":"./engine-whole-u8806.json","sourceProofFileSha256":"3013bede49f2da0142397e9a1972cb608ca7f4343fb740c9e6c85b3be9775f81","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"1fba65e62cc23e067d4afe88c9bfe987c3f65dec3306f83db13a23e7aaff0933"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "17e118ac79e3979c4593481244359e123143f62c3244701e9106440efa9b10d1"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 21
const ORIGINAL = [[{"kind":"cdDrawLine","args":[45,133.65,45,153.45,12,213]}],[{"kind":"cdDrawLine","args":[45,133.65,155,133.65,2,2]}],[{"kind":"cdDrawLine","args":[155,133.65,155,153.45,22,323]}],[{"kind":"cdDrawLine","args":[45,153.45,155,153.45,2,2]}],[{"kind":"cdDrawLine","args":[100,121.275,100,175.725,0,32]}],[{"kind":"cdDrawCurve","args":[20,180.675,97,178.2,160,172.425,0,7]}],[{"kind":"cdDrawCurve","args":[132,159.225,163,169.125,176,185.625,7,8]}],[{"kind":"cdDrawLine","args":[46,48.230000000000004,46,75.67,12,313]}],[{"kind":"cdDrawLine","args":[46,48.230000000000004,154,48.230000000000004,2,2]}],[{"kind":"cdDrawLine","args":[154,48.230000000000004,154,75.67,22,323]}],[{"kind":"cdDrawLine","args":[46,61.95,154,61.95,2,2]}],[{"kind":"cdDrawLine","args":[46,75.67,154,75.67,2,2]}],[{"kind":"cdDrawLine","args":[32,88.41,32,125.65,12,100]}],[{"kind":"cdDrawLine","args":[32,88.41,168,88.41,2,2]}],[{"kind":"cdDrawLine","args":[168,88.41,168,113.69,22,1]},{"kind":"cdDrawCurve","args":[168,113.69,168,123.69,158,123.69,1,314]}],[{"kind":"cdDrawLine","args":[100,48.230000000000004,100,106.54,32,32]}],[{"kind":"cdDrawCurve","args":[51,110.46,94,108.01,137,104.58,0,7]}],[{"kind":"cdDrawCurve","args":[116,93.31,138,102.13,146,114.38,7,8]}],[{"kind":"cdDrawLine","args":[13,28.255,187,28.255,0,0]}],[{"kind":"cdDrawLine","args":[72,14.085,72,41.88,0,300]}],[{"kind":"cdDrawLine","args":[128,14.085,128,41.88,0,300]}]]
const TRACE_SHA256 = "5f1534762a845a54f230503f60a39649d1d632a339ea09bfa220546b3ae37883"
const GROUPS_SHA256 = "045921d2d4555f838319908244cf128fff0ba799097efdb99082865cad03694e"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
