import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "catalogue25-versus-domestic24-count-conflict-with-incomplete-alternative-wholes"
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

export const sourceRoot = "u9f08-g"
export const sourceProofFile = "./engine-whole-u9f08-g.json"
export const sourceProofFileSha256 = "403f8ceafda7a5066e54cf6283712756fcd6119b3dc21ac99f2f84912771e845"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "6b03d58718b30d7293aad8501d99b90d7d0f59e2edde6e58965a063afe50d95e"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "4e973df2c49459c1da8af1ac2951f2bdbf0109aba05fae5ac8c0dcba015981b7"
export const selectedProofIdentity = {"sourceRoot":"u9f08-g","sourceProofFile":"./engine-whole-u9f08-g.json","sourceProofFileSha256":"403f8ceafda7a5066e54cf6283712756fcd6119b3dc21ac99f2f84912771e845","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"6b03d58718b30d7293aad8501d99b90d7d0f59e2edde6e58965a063afe50d95e","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"4e973df2c49459c1da8af1ac2951f2bdbf0109aba05fae5ac8c0dcba015981b7"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u9f08-g","sourceProofFile":"./engine-whole-u9f08-g.json","sourceProofFileSha256":"403f8ceafda7a5066e54cf6283712756fcd6119b3dc21ac99f2f84912771e845","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"6b03d58718b30d7293aad8501d99b90d7d0f59e2edde6e58965a063afe50d95e","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"4e973df2c49459c1da8af1ac2951f2bdbf0109aba05fae5ac8c0dcba015981b7"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "54cc601879af955e6df58139c8b0e99732284208662e9fb5b070838af79da9eb"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 27
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[25,16.36,36,23.875,42,33.894999999999996,7,8]}],[{"kind":"cdDrawCurve","args":[94,18.03,85,28.05,72,37.235,0,7]}],[{"kind":"cdDrawLine","args":[24,41.41,24,91.51,12,0]}],[{"kind":"cdDrawLine","args":[24,41.41,96,41.41,2,2]}],[{"kind":"cdDrawLine","args":[96,41.41,96,81.49,22,100]}],[{"kind":"cdDrawLine","args":[60,14.69,60,83.995,0,0]}],[{"kind":"cdDrawCurve","args":[45,49.76,39,64.78999999999999,30,79.82,0,7]}],[{"kind":"cdDrawCurve","args":[68,48.09,79,57.275,83,71.47,7,8]}],[{"kind":"cdDrawCurve","args":[134,15.525,123,38.07,105,61.45,0,7]}],[{"kind":"cdDrawLine","args":[126,36.4,186,36.4,0,0]}],[{"kind":"cdDrawCurve","args":[166,36.4,150,76.48,96,86.5,132,7]}],[{"kind":"cdDrawCurve","args":[126,36.4,137,67.295,180,78.985,7,0]}],[{"kind":"cdDrawLine","args":[43.59,95.625,43.59,113.61,12,313]}],[{"kind":"cdDrawLine","args":[43.59,95.625,160.41,95.625,2,2]}],[{"kind":"cdDrawLine","args":[160.41,95.625,160.41,113.61,22,323]}],[{"kind":"cdDrawLine","args":[43.59,113.61,86.16,113.61,2,2]}],[{"kind":"cdDrawLine","args":[117.84,113.61,160.41,113.61,2,2]}],[{"kind":"cdDrawLine","args":[117.84,95.625,117.84,179.555,32,32]}],[{"kind":"cdDrawLine","args":[86.16,95.625,86.16,169.555,32,1]},{"kind":"cdDrawCurve","args":[86.16,169.555,86.16,179.555,96.16,179.555,1,2001]},{"kind":"cdDrawLine","args":[96.16,179.555,179.22,179.555,2006,5]}],[{"kind":"cdDrawLine","args":[36.66,129.415,86.16,129.415,2,2]}],[{"kind":"cdDrawLine","args":[36.66,129.415,36.66,158.3,12,113]}],[{"kind":"cdDrawLine","args":[36.66,143.585,86.16,143.585,2,2]}],[{"kind":"cdDrawLine","args":[36.66,158.3,86.16,158.3,2,2]}],[{"kind":"cdDrawLine","args":[117.84,129.415,167.34,129.415,0,2]}],[{"kind":"cdDrawLine","args":[167.34,129.415,167.34,158.3,22,223]}],[{"kind":"cdDrawLine","args":[117.84,143.585,167.34,143.585,0,2]}],[{"kind":"cdDrawLine","args":[117.84,158.3,167.34,158.3,0,2]}]]
const TRACE_SHA256 = "1404febae05bbc17dbc808421828a865c77ce3f6194bae1cb81d89e130118641"
const GROUPS_SHA256 = "e2ec82a2770442b08c510270b3ee66edc16ba3adea6fcca5130bb0cc459cb9ba"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
