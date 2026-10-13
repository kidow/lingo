import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "minimum-original-pens-14-exceeds-catalog-13"
export function compileProgressive(trace, proof, identity = SELECTED_PROOF_IDENTITY) {
  validateSelectedProof(trace, proof, identity)
  throw new Error(blockedReason)
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

export const sourceRoot = "u7d8e"
export const sourceProofFile = "./engine-whole-u7d8e.json"
export const sourceProofFileSha256 = "e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25"
export const selectedProofIdentity = {"sourceRoot":"u7d8e","sourceProofFile":"./engine-whole-u7d8e.json","sourceProofFileSha256":"e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u7d8e","sourceProofFile":"./engine-whole-u7d8e.json","sourceProofFileSha256":"e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "e5ddb2e7be953bd9d2bb529538840355a0503274e04eeba3ab36ea6a5dc811ab"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 17
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[46.9,16,37.8,37,26.75,56,0,7]}],[{"kind":"cdDrawCurve","args":[13.1,45,28.7,56,35.2,76,7,8]}],[{"kind":"cdDrawCurve","args":[65.75,39,47.55,76,26.1,110,0,7]}],[{"kind":"cdDrawCurve","args":[14.4,113,41.7,109,65.75,101,0,7]}],[{"kind":"cdDrawCurve","args":[52.1,78,64.45,91,69.65,114,7,8]}],[{"kind":"cdDrawLine","args":[44.3,109,44.3,186,32,0]}],[{"kind":"cdDrawCurve","args":[28.7,127,26.1,155,13.1,180,0,7]}],[{"kind":"cdDrawCurve","args":[52.75,122,64.45,136,69,161,7,8]}],[{"kind":"cdDrawLine","args":[73.65,33,105.95,33,0,2]}],[{"kind":"cdDrawLine","args":[105.95,33,86,89,22,113]}],[{"kind":"cdDrawLine","args":[86,89,111.65,89,0,2]}],[{"kind":"cdDrawCurve","args":[111.65,89,105.95,167,63.2,187,22,7]}],[{"kind":"cdDrawCurve","args":[80.3,114,91.7,185,180.05,177,7,0]}],[{"kind":"cdDrawLine","args":[114.5,86,187.65,86,0,0]}],[{"kind":"cdDrawLine","args":[148.7,39,148.7,147,32,32]}],[{"kind":"cdDrawLine","args":[115.45,148,183.85,148,0,0]}],[{"kind":"cdDrawCurve","args":[177.2,28,152.5,37,117.35,44,0,7]}]]
const TRACE_SHA256 = "bdeea6aa38eb3e9870cc32274b607b3a1e5e1942d585152542b75903749d4850"
const GROUPS_SHA256 = "c150c6f270e13cfa1808bc6fcd3c540fa5ab22d10ee543381a5e3f3175cbe076"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
