import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "minimum-original-pens-11-exceeds-catalog-10"
export function compileProgressive(trace, proof, identity) {
  validateSelectedProof(trace, proof, identity)
  throw new Error(blockedReason)
}

export function compileSourceWhole(root, trace, proof, identity) {
  assert.equal(root, sourceRoot, 'Only the selected fixed whole root is supported')
  return compileProgressive(trace, proof, identity)
}

function validateSelectedProof(trace, proof, identity) {
  assert.deepEqual(identity, SELECTED_PROOF_IDENTITY, 'Selected source root, proof file and exact file SHA are pinned')
  const bytes = readFileSync(new URL(sourceProofFile, import.meta.url))
  assert.equal(createHash('sha256').update(bytes).digest('hex'), sourceProofFileSha256, 'Pinned source proof file SHA256')
  assert.deepEqual(Object.keys(proof).sort(), ORIGINAL_PROOF_KEYS, 'Complete engine header and original proof keys are pinned')
  assert.equal(digest(proof), PROOF_SHA256, 'Entire selected proof, including full header, remains unchanged')
  assert.equal(digest(trace), TRACE_SHA256)
  assert.equal(digest(proof.groups), GROUPS_SHA256)
  assert.deepEqual(Object.fromEntries(Object.entries(proof).filter(([key]) => key !== 'trace' && key !== 'groups')), FULL_SOURCE_HEADER)
  assert.deepEqual(proof.defaults, PINNED_DEFAULTS)
  assert.equal(proof.engineRevision, ENGINE_REVISION)
  assert.deepEqual(proof.engineHashes, ENGINE_HASHES)
}

export const sourceRoot = "u7277"
export const sourceProofFile = "./engine-whole-u7277.json"
export const sourceProofFileSha256 = "7fe0c9ae5651e63c0e0bd6d473f79158c815576c222b6f258d5a148e5295b677"
export const selectedProofIdentity = Object.freeze({"sourceRoot":"u7277","sourceProofFile":"./engine-whole-u7277.json","sourceProofFileSha256":"7fe0c9ae5651e63c0e0bd6d473f79158c815576c222b6f258d5a148e5295b677"})
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u7277","sourceProofFile":"./engine-whole-u7277.json","sourceProofFileSha256":"7fe0c9ae5651e63c0e0bd6d473f79158c815576c222b6f258d5a148e5295b677"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "f699409a71842fb8208b82c62bec156b2eaf96f1abd6aa3a2aba81c6d7f7e9b6"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 11
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[33.7,28,29.6,72,15.66,104,0,7]}],[{"kind":"cdDrawLine","args":[27.96,64,85.36,64,2,0]}],[{"kind":"cdDrawLine","args":[54.2,14,54.2,186,0,0]}],[{"kind":"cdDrawCurve","args":[18.119999999999997,132,46,120,83.72,104,0,7]}],[{"kind":"cdDrawCurve","args":[128.85,25,109.95,72,68.1,106,132,7]}],[{"kind":"cdDrawLine","args":[101.175,25,138.3,25,0,100]}],[{"kind":"cdDrawCurve","args":[131.55,25,153.825,74,182.85,93,7,0]}],[{"kind":"cdDrawLine","args":[97.8,91,158.55,91,0,0]}],[{"kind":"cdDrawLine","args":[91.05,133,165.3,133,0,0]}],[{"kind":"cdDrawLine","args":[75.525,177,180.15,177,0,0]}],[{"kind":"cdDrawLine","args":[127.5,93,127.5,177,32,32]}]]
const TRACE_SHA256 = "4228a3afc2d0dc14f22a55808e216271154db4945b7a4e4da729f85c9cc5f39b"
const GROUPS_SHA256 = "bc830a55a04a4c78be0520cb5d3ce0bbfb920bf35afa17e8e4b13f865595f7cd"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
