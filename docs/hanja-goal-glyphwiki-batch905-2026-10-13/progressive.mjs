import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "minimum-original-pens-27-exceeds-catalog-25"
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

export const sourceRoot = "u7e98"
export const sourceProofFile = "./engine-whole-u7e98.json"
export const sourceProofFileSha256 = "c222e61617c15dd26ff60ccce95459a26a4e1048f1c2fcb07e40874555dc3709"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "46f0c5e27313a6d3f1b8caec8eb33f7542ab6033be8db86d6edbee5fb55b3556"
export const selectedProofIdentity = {"sourceRoot":"u7e98","sourceProofFile":"./engine-whole-u7e98.json","sourceProofFileSha256":"c222e61617c15dd26ff60ccce95459a26a4e1048f1c2fcb07e40874555dc3709","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"46f0c5e27313a6d3f1b8caec8eb33f7542ab6033be8db86d6edbee5fb55b3556"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u7e98","sourceProofFile":"./engine-whole-u7e98.json","sourceProofFileSha256":"c222e61617c15dd26ff60ccce95459a26a4e1048f1c2fcb07e40874555dc3709","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"46f0c5e27313a6d3f1b8caec8eb33f7542ab6033be8db86d6edbee5fb55b3556"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "a0e4b12d263681be4f0fb58ea272c6bfac68a92720a43ad26ac7732aba928d9b"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 29
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[45.9,16,36.8,37,25.75,56,0,7]}],[{"kind":"cdDrawCurve","args":[12.1,45,27.7,56,34.2,76,7,8]}],[{"kind":"cdDrawCurve","args":[64.75,39,46.55,76,25.1,110,0,7]}],[{"kind":"cdDrawCurve","args":[13.4,113,40.7,109,64.75,101,0,7]}],[{"kind":"cdDrawCurve","args":[51.1,78,63.45,91,68.65,114,7,8]}],[{"kind":"cdDrawLine","args":[43.3,109,43.3,186,32,0]}],[{"kind":"cdDrawCurve","args":[27.7,127,25.1,155,12.1,180,0,7]}],[{"kind":"cdDrawCurve","args":[51.75,122,63.45,136,68,161,7,8]}],[{"kind":"cdDrawCurve","args":[86.76,19.7,82.8,34.66,74.88,47.75,0,7]}],[{"kind":"cdDrawLine","args":[82.8,33.725,123.72,33.725,0,200]}],[{"kind":"cdDrawLine","args":[101.28,14.09,101.28,53.36,0,32]}],[{"kind":"cdDrawLine","args":[72.24,53.36,127.68,53.36,0,100]}],[{"kind":"cdDrawCurve","args":[93.36,53.36,89.4,83.28,71.58,98.24,132,7]}],[{"kind":"cdDrawLine","args":[109.2,53.36,109.2,79.54,32,32]}],[{"kind":"cdDrawCurve","args":[99.3,83.28,111.18,79.54,128.34,70.19,0,7]}],[{"kind":"cdDrawCurve","args":[143.51999999999998,19.7,139.56,34.66,131.64,47.75,0,7]}],[{"kind":"cdDrawLine","args":[139.56,33.725,179.16,33.725,0,200]}],[{"kind":"cdDrawLine","args":[156.72,14.09,156.72,53.36,0,32]}],[{"kind":"cdDrawLine","args":[130.32,53.36,185.76,53.36,0,100]}],[{"kind":"cdDrawCurve","args":[148.8,53.36,147.48000000000002,75.8,127.68,88.89,132,7]}],[{"kind":"cdDrawLine","args":[164.64,53.36,164.64,71.41,32,1]},{"kind":"cdDrawCurve","args":[164.64,71.41,164.64,81.41,174.64,81.41,1,1001]},{"kind":"cdDrawLine","args":[174.64,81.41,183.12,81.41,1006,5]}],[{"kind":"cdDrawLine","args":[96,96.52,96,153.28,12,213]}],[{"kind":"cdDrawLine","args":[96,96.52,162,96.52,2,2]}],[{"kind":"cdDrawLine","args":[162,96.52,162,153.28,22,323]}],[{"kind":"cdDrawLine","args":[96,115.44,162,115.44,2,2]}],[{"kind":"cdDrawLine","args":[96,134.36,162,134.36,2,2]}],[{"kind":"cdDrawLine","args":[96,153.28,162,153.28,2,2]}],[{"kind":"cdDrawCurve","args":[117.12,163.6,103.25999999999999,175.64,72.9,187.68,0,7]}],[{"kind":"cdDrawCurve","args":[135.6,163.6,165.95999999999998,171.34,178.5,185.1,7,8]}]]
const TRACE_SHA256 = "a3877bcabb65f934d0d468824a388fd2ba6eb5f8ff135b6f4c55776988a6ef13"
const GROUPS_SHA256 = "5d27302840a21d4eda9143923535117eec0384f4df4347cff43b18fb5a7e787c"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
