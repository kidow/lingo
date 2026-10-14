import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "complete-whole-minimum12-exceeds-catalogue9-no-exact-joins"
export function compileProgressive(trace, proof, identity) {
  validateSelectedProof(trace, proof, identity)
  throw new Error(blockedReason)
}

function validateSelectedProof(trace, proof, identity) {
  assert.deepEqual(identity, SELECTED_PROOF_IDENTITY, 'Selected source root, proof file and exact file SHA are pinned')
  const bytes = readFileSync(new URL(sourceProofFile, import.meta.url))
  assert.equal(createHash('sha256').update(bytes).digest('hex'), sourceProofFileSha256, 'Pinned source proof file SHA256')
  const headerBytes = readFileSync(new URL(sourceHeaderFile, import.meta.url))
  assert.equal(createHash('sha256').update(headerBytes).digest('hex'), sourceHeaderFileSha256, 'Pinned full engine header file SHA256')
  const sourceBytes = readFileSync(new URL(sourceMetadataFile, import.meta.url))
  assert.equal(createHash('sha256').update(sourceBytes).digest('hex'), sourceMetadataFileSha256, 'Pinned original source metadata file SHA256')
  assert.deepEqual(Object.keys(proof).sort(), ORIGINAL_PROOF_KEYS, 'Complete engine header and original proof keys are pinned')
  assert.equal(digest(proof), PROOF_SHA256, 'Entire selected proof, including full header, remains unchanged')
  assert.equal(digest(trace), TRACE_SHA256)
  assert.equal(digest(proof.groups), GROUPS_SHA256)
  assert.deepEqual(Object.fromEntries(Object.entries(proof).filter(([key]) => key !== 'trace' && key !== 'groups')), FULL_SOURCE_HEADER)
  assert.deepEqual(proof.defaults, PINNED_DEFAULTS)
  assert.equal(proof.engineRevision, ENGINE_REVISION)
  assert.deepEqual(proof.engineHashes, ENGINE_HASHES)
}

export const sourceRoot = "u4fd3"
export const sourceProofFile = "./engine-whole-u4fd3.json"
export const sourceProofFileSha256 = "a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "655ccee1ebef3e043e7e2b3d1fdf4f6a8fd299cd2e84fb6c0650d158b1bfb936"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "b19ddfdd57ce69e70a8167d85db9d2e88437f3143d284b2afa28a1b9f879049a"
export const selectedProofIdentity = {"sourceRoot":"u4fd3","sourceProofFile":"./engine-whole-u4fd3.json","sourceProofFileSha256":"a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"655ccee1ebef3e043e7e2b3d1fdf4f6a8fd299cd2e84fb6c0650d158b1bfb936","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"b19ddfdd57ce69e70a8167d85db9d2e88437f3143d284b2afa28a1b9f879049a"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u4fd3","sourceProofFile":"./engine-whole-u4fd3.json","sourceProofFileSha256":"a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"655ccee1ebef3e043e7e2b3d1fdf4f6a8fd299cd2e84fb6c0650d158b1bfb936","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"b19ddfdd57ce69e70a8167d85db9d2e88437f3143d284b2afa28a1b9f879049a"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "e58a97d68f15aacc72bbccb5d3cb22fe40bc080b4e4de1c96d85e5e7551c09a0"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 12
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[68.175,15,45.9,72,12.9,117,0,7]}],[{"kind":"cdDrawLine","args":[45.9,73,45.9,186,0,0]}],[{"kind":"cdDrawLine","args":[72.9,28,185.65,28,0,0]}],[{"kind":"cdDrawCurve","args":[101.6,43,91.35,59,77,78,0,7]}],[{"kind":"cdDrawCurve","args":[75.975,76,95.45,92,105.7,113,7,8]}],[{"kind":"cdDrawCurve","args":[136.45,43,126.19999999999999,59,111.85,78,0,7]}],[{"kind":"cdDrawCurve","args":[110.825,76,130.3,92,140.55,113,7,8]}],[{"kind":"cdDrawCurve","args":[171.3,43,161.05,59,145.675,78,0,7]}],[{"kind":"cdDrawCurve","args":[144.65,76,165.15,91,177.45,111,7,8]}],[{"kind":"cdDrawLine","args":[78.025,133,180.525,133,0,0]}],[{"kind":"cdDrawLine","args":[129.275,133,129.275,177,32,32]}],[{"kind":"cdDrawLine","args":[69.825,177,186.675,177,0,0]}]]
const TRACE_SHA256 = "3854663df8cfbe1f614451fd380dff6bfbaee02e6d4f46c9ad85843043bd3683"
const GROUPS_SHA256 = "ebc26315cf9a6be5682ff03e0bcf2fddb787a1175f46f695eb0265803414bb8e"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
