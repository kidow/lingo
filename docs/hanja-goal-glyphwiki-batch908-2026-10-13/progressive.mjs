import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "minimum-original-pens-14-exceeds-catalog-12"
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

export const sourceRoot = "u6e4c"
export const sourceProofFile = "./engine-whole-u6e4c.json"
export const sourceProofFileSha256 = "711b24723c944e2176241ff2720afccce2d013b624ada2364ec3141385b5b2cf"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "c8e2523c06393b3a7f4ff58c7346ea3a4aded0de6d16910ff3cd490fae220587"
export const selectedProofIdentity = {"sourceRoot":"u6e4c","sourceProofFile":"./engine-whole-u6e4c.json","sourceProofFileSha256":"711b24723c944e2176241ff2720afccce2d013b624ada2364ec3141385b5b2cf","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"c8e2523c06393b3a7f4ff58c7346ea3a4aded0de6d16910ff3cd490fae220587"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u6e4c","sourceProofFile":"./engine-whole-u6e4c.json","sourceProofFileSha256":"711b24723c944e2176241ff2720afccce2d013b624ada2364ec3141385b5b2cf","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"c8e2523c06393b3a7f4ff58c7346ea3a4aded0de6d16910ff3cd490fae220587"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "5aa9be47010188eb8e57840d7ad90fe6919f0f301216b43a841f32f3df174bb4"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 15
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[27.18,20,46.68,27,55.26,41,7,8]}],[{"kind":"cdDrawCurve","args":[12.36,66,33.42,73,41.22,87,7,8]}],[{"kind":"cdDrawCurve","args":[13.92,133,41.22,142,38.1,184,7,8]}],[{"kind":"cdDrawCurve","args":[34.2,150,37.32,138,70.08,67,32,7]}],[{"kind":"cdDrawCurve","args":[129.04,14.925,104.66,53.73,66.5,87.56,0,7]}],[{"kind":"cdDrawCurve","args":[125.86000000000001,19.9,154.48,57.71,179.92,70.645,7,0]}],[{"kind":"cdDrawLine","args":[103.6,62.685,150.24,62.685,0,100]}],[{"kind":"cdDrawLine","args":[97.24,81.59,153.42,81.59,2,2]}],[{"kind":"cdDrawLine","args":[153.42,81.59,153.42,123.38,22,323]}],[{"kind":"cdDrawLine","args":[97.24,101.49,153.42,101.49,0,2]}],[{"kind":"cdDrawLine","args":[97.24,123.38,153.42,123.38,2,2]}],[{"kind":"cdDrawLine","args":[97.24,81.59,97.24,172.135,12,32]}],[{"kind":"cdDrawCurve","args":[77.1,182.085,107.84,170.145,138.58,157.21,0,7]}],[{"kind":"cdDrawCurve","args":[173.56,124.375,161.9,135.32,139.64,152.235,0,7]}],[{"kind":"cdDrawCurve","args":[119.5,123.38,142.82,167.16,176.74,178.105,7,0]}]]
const TRACE_SHA256 = "d2fc3fcccbc91a701c9ca106886a4a6d46f6fca5a6432acf26bfbd8202d877ed"
const GROUPS_SHA256 = "b1a098406b7f33dc00748c9e2a8726b8eefebfebae427c4699a5b9870f894b28"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
