import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "original-yao-endpoint-gaps"
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

export const sourceRoot = "u6229"
export const sourceProofFile = "./engine-whole-u6229.json"
export const sourceProofFileSha256 = "561d47bcd2e5da61e87b0600cc3e9616252109afdbb08e4e9fa12317bcac1ec4"
export const selectedProofIdentity = {"sourceRoot":"u6229","sourceProofFile":"./engine-whole-u6229.json","sourceProofFileSha256":"561d47bcd2e5da61e87b0600cc3e9616252109afdbb08e4e9fa12317bcac1ec4"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u6229","sourceProofFile":"./engine-whole-u6229.json","sourceProofFileSha256":"561d47bcd2e5da61e87b0600cc3e9616252109afdbb08e4e9fa12317bcac1ec4"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "0c034789bb751b1eae8f78a9724b187f03e7cefba9047521325141e9066a3408"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 17
const ORIGINAL = [[{"kind":"cdDrawLine","args":[18.25,25,109.75,25,0,0]}],[{"kind":"cdDrawCurve","args":[41.186,27.24,36.001,52.84,29.779,77.16,0,7]}],[{"kind":"cdDrawCurve","args":[20.446,78.44,36.5195,76.52000000000001,57.778,72.03999999999999,0,7]}],[{"kind":"cdDrawCurve","args":[45.8525,47.08,56.2225,63.72,61.4075,82.92,7,8]}],[{"kind":"cdDrawCurve","args":[85.77699999999999,27.24,80.592,52.84,74.37,77.16,0,7]}],[{"kind":"cdDrawCurve","args":[66.5925,78.44,82.1475,76.52000000000001,102.369,72.03999999999999,0,7]}],[{"kind":"cdDrawCurve","args":[90.4435,47.08,100.8135,63.72,105.9985,82.92,7,8]}],[{"kind":"cdDrawLine","args":[12.15,97,115.85,97,0,0]}],[{"kind":"cdDrawLine","args":[32.70700000000001,116.6,32.70700000000001,174.4,12,113]}],[{"kind":"cdDrawLine","args":[32.70700000000001,116.6,95.293,116.6,2,2]}],[{"kind":"cdDrawLine","args":[95.293,116.6,95.293,174.4,22,323]}],[{"kind":"cdDrawLine","args":[32.70700000000001,144.65,95.293,144.65,2,2]}],[{"kind":"cdDrawLine","args":[32.70700000000001,174.4,95.293,174.4,2,2]}],[{"kind":"cdDrawLine","args":[113.23,75,187.62,69,0,0]}],[{"kind":"cdDrawCurve","args":[149.56,21,165.995,31,173.78,48,7,8]}],[{"kind":"cdDrawBezier","args":[134.85500000000002,14,134.85500000000002,169,174.645,180,182.43,180,0,15]}],[{"kind":"cdDrawCurve","args":[172.915,95,147.82999999999998,169,93.335,188,0,7]}]]
const TRACE_SHA256 = "879eda162afd393e262d60c72244c1efd84feecc0793f1fa1121e524b92616f1"
const GROUPS_SHA256 = "6599e1ca9cc790cc38d98bef6f806380fce6b9c8a3148362d9ca7f0b3614253c"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
