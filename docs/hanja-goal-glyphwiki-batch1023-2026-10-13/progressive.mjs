import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "excluding-incidental-outer-closures-leaves22-pens-above-catalogue21"
export function compileSourceWhole(root,trace,proof,identity){assert(identity&&identity.sourceRoot===root,'Explicit root and pinned file identity must agree');assert.equal(root,sourceRoot,'Unsupported whole roots remain blocked');return compileProgressive(trace,proof,identity)}
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

export const sourceRoot = "u9436"
export const sourceProofFile = "./engine-whole-u9436.json"
export const sourceProofFileSha256 = "ec19e3e858d95535af58486f5e28e1436902c78072a5d3fe57bf632e95468aea"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "0092d199029b6b8a54336de1a02bacccdea6197f55c425fd3fe0d1954381e603"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "61fd44c9c114c7227a361fd88202cb4bd4f6425d51feae2effefb9b5cced28b1"
export const selectedProofIdentity = Object.freeze({"sourceRoot":"u9436","sourceProofFile":"./engine-whole-u9436.json","sourceProofFileSha256":"ec19e3e858d95535af58486f5e28e1436902c78072a5d3fe57bf632e95468aea","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"0092d199029b6b8a54336de1a02bacccdea6197f55c425fd3fe0d1954381e603","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"61fd44c9c114c7227a361fd88202cb4bd4f6425d51feae2effefb9b5cced28b1"})
const SELECTED_PROOF_IDENTITY = Object.freeze({"sourceRoot":"u9436","sourceProofFile":"./engine-whole-u9436.json","sourceProofFileSha256":"ec19e3e858d95535af58486f5e28e1436902c78072a5d3fe57bf632e95468aea","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"0092d199029b6b8a54336de1a02bacccdea6197f55c425fd3fe0d1954381e603","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"61fd44c9c114c7227a361fd88202cb4bd4f6425d51feae2effefb9b5cced28b1"})
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "2ca56fafdfa167e66b9355abd94fff3cbfe1b4a0f3d6e9ff1a3fe1903cd2a4e8"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = Object.freeze([])
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 24
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[53.15,15,39.95,58,12.725,92,0,7]}],[{"kind":"cdDrawCurve","args":[52.325,27,72.95,38,81.2,54,7,8]}],[{"kind":"cdDrawLine","args":[33.35,71,80.375,71,0,100]}],[{"kind":"cdDrawLine","args":[18.5,103,85.325,103,0,0]}],[{"kind":"cdDrawLine","args":[52.325,71,52.325,164,32,32]}],[{"kind":"cdDrawCurve","args":[20.15,120,33.35,134,35,154,7,8]}],[{"kind":"cdDrawCurve","args":[77.075,119,71.3,135,62.225,151,0,7]}],[{"kind":"cdDrawCurve","args":[16.85,177,50.675,169,83.675,157,0,7]}],[{"kind":"cdDrawLine","args":[100.725,22,100.725,52,1012,213]}],[{"kind":"cdDrawLine","args":[100.725,22,171.785,22,2,2]}],[{"kind":"cdDrawLine","args":[171.785,22,171.785,52,22,223]}],[{"kind":"cdDrawLine","args":[123.715,22,123.715,52,1032,32]}],[{"kind":"cdDrawLine","args":[147.75,22,147.75,52,32,32]}],[{"kind":"cdDrawLine","args":[100.725,52,171.785,52,2,2]}],[{"kind":"cdDrawLine","args":[87.14,73,187.46,73,0,100]}],[{"kind":"cdDrawLine","args":[105.95,89,105.95,115,12,113]}],[{"kind":"cdDrawLine","args":[105.95,89,167.605,89,2,2]}],[{"kind":"cdDrawLine","args":[167.605,89,167.605,115,22,323]}],[{"kind":"cdDrawLine","args":[105.95,115,167.605,115,2,2]}],[{"kind":"cdDrawCurve","args":[139.39,117,111.175,146,77.735,162,0,7]}],[{"kind":"cdDrawLine","args":[110.13,143,110.13,170,32,32]}],[{"kind":"cdDrawCurve","args":[94.455,181,118.49,172,146.705,158,0,7]}],[{"kind":"cdDrawCurve","args":[183.28,129,168.65,140,151.93,148,0,7]}],[{"kind":"cdDrawCurve","args":[138.345,119,147.75,158,181.19,177,7,0]}]]
const TRACE_SHA256 = "6e7d51baafd493bdb0d1d4d2bf728b8115aeb543078476dc3f1d0209445c0f1a"
const GROUPS_SHA256 = "a716b0f8bf726b0695718547c300e75a13263b6b951945dd6510b70329452f9b"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
