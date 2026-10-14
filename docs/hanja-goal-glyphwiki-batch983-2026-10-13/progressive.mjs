import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "catalog-18-domestic-17-mismatch"
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

export const sourceRoot = "u6583"
export const sourceProofFile = "./engine-whole-u6583.json"
export const sourceProofFileSha256 = "d14c80336eabbc950ea68b677cf90737bc19c47876b5d3b96947d33714caabfd"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "04fd8cff71681b2c3f776a97ba2d7cdf6a77cf5ba1319acee29985b698ccacf5"
export const selectedProofIdentity = {"sourceRoot":"u6583","sourceProofFile":"./engine-whole-u6583.json","sourceProofFileSha256":"d14c80336eabbc950ea68b677cf90737bc19c47876b5d3b96947d33714caabfd","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"04fd8cff71681b2c3f776a97ba2d7cdf6a77cf5ba1319acee29985b698ccacf5"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u6583","sourceProofFile":"./engine-whole-u6583.json","sourceProofFileSha256":"d14c80336eabbc950ea68b677cf90737bc19c47876b5d3b96947d33714caabfd","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"04fd8cff71681b2c3f776a97ba2d7cdf6a77cf5ba1319acee29985b698ccacf5"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "92f108f418c4ae185c39a5e4209aaaad464be7272498f7b38223c8417e4db604"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 20
const ORIGINAL = [[{"kind":"cdDrawLine","args":[63,14.21,63,47.685,0,32]}],[{"kind":"cdDrawCurve","args":[44,22.45,34,35.84,12,47.17,0,7]}],[{"kind":"cdDrawCurve","args":[75,21.935000000000002,94,29.145,105,40.99,7,8]}],[{"kind":"cdDrawLine","args":[27,47.685,27,102.275,12,0]}],[{"kind":"cdDrawLine","args":[27,47.685,99,47.685,2,2]}],[{"kind":"cdDrawLine","args":[99,47.685,99,89.185,22,1]},{"kind":"cdDrawCurve","args":[99,89.185,99,99.185,89,99.185,1,514]}],[{"kind":"cdDrawLine","args":[63,47.685,63,100.73,32,0]}],[{"kind":"cdDrawCurve","args":[48,57.985,45,73.435,35,86.31,0,7]}],[{"kind":"cdDrawCurve","args":[71,56.44,82,67.77000000000001,85,82.19,7,8]}],[{"kind":"cdDrawCurve","args":[141.2,14.21,131.6,40.475,109.2,58.5,0,7]}],[{"kind":"cdDrawLine","args":[128.4,39.445,187.6,39.445,2,0]}],[{"kind":"cdDrawCurve","args":[165.2,39.445,155.6,89.4,94,103.82,2,7]}],[{"kind":"cdDrawCurve","args":[123.6,44.595,132.4,84.25,181.2,98.67,7,0]}],[{"kind":"cdDrawLine","args":[16,113.5,184,113.5,0,0]}],[{"kind":"cdDrawCurve","args":[57,113.5,48,145.5,17,160,132,7]}],[{"kind":"cdDrawLine","args":[45,134.5,91,134.5,0,2]}],[{"kind":"cdDrawCurve","args":[91,134.5,79,178,14,187,22,7]}],[{"kind":"cdDrawCurve","args":[38,144.5,57,150.5,66,160,7,8]}],[{"kind":"cdDrawLine","args":[114,119,114,171,0,1]},{"kind":"cdDrawCurve","args":[114,171,114,181,124,181,1,1]},{"kind":"cdDrawLine","args":[124,181,180,181,6,5]}],[{"kind":"cdDrawCurve","args":[171,134.5,145,141.5,114,148,0,7]}]]
const TRACE_SHA256 = "1e363b59d00a03ec9525a19e32c1a43b607bde036fd2e2fccce207f688b6d30e"
const GROUPS_SHA256 = "0543ebd04189ed730e60cc7aa6d5c2f5b021d45db10418a9006f48603750f885"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
