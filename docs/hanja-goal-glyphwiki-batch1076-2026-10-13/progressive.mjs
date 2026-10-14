import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "complete-whole-minimum16-exceeds-catalogue15"
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

export const sourceRoot = "u6f7e-g"
export const sourceProofFile = "./engine-whole-u6f7e-g.json"
export const sourceProofFileSha256 = "8477f855136689c136d166cb76f59780604a29f31e6a61d2399a2e8dff5f3d69"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "c9d75a60950006976eb2b7fc398082bd4a3d3b3bba5f0eaea6a6eb874156a8d2"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "dd68751ff493f5c36e1f95c7639bc68713c0bebf175ad18f5e3827c6ca242910"
export const selectedProofIdentity = {"sourceRoot":"u6f7e-g","sourceProofFile":"./engine-whole-u6f7e-g.json","sourceProofFileSha256":"8477f855136689c136d166cb76f59780604a29f31e6a61d2399a2e8dff5f3d69","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"c9d75a60950006976eb2b7fc398082bd4a3d3b3bba5f0eaea6a6eb874156a8d2","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"dd68751ff493f5c36e1f95c7639bc68713c0bebf175ad18f5e3827c6ca242910"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u6f7e-g","sourceProofFile":"./engine-whole-u6f7e-g.json","sourceProofFileSha256":"8477f855136689c136d166cb76f59780604a29f31e6a61d2399a2e8dff5f3d69","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"c9d75a60950006976eb2b7fc398082bd4a3d3b3bba5f0eaea6a6eb874156a8d2","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"dd68751ff493f5c36e1f95c7639bc68713c0bebf175ad18f5e3827c6ca242910"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "15d986fee59ff0e876206fc77e01aca851ac3bdd178317c3603742de859d90e9"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 18
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[28.01,20,45.76,27,53.57,41,7,8]}],[{"kind":"cdDrawCurve","args":[14.52,66,33.69,73,40.79,87,7,8]}],[{"kind":"cdDrawCurve","args":[15.94,133,40.79,142,37.95,184,7,8]}],[{"kind":"cdDrawCurve","args":[34.4,150,37.239999999999995,138,67.06,67,32,7]}],[{"kind":"cdDrawCurve","args":[79.25,23,95.35,32,102.25,46,7,8]}],[{"kind":"cdDrawCurve","args":[165.5,23,155.15,37,141.35,50,0,7]}],[{"kind":"cdDrawLine","args":[70.05,57,183.9,57,0,0]}],[{"kind":"cdDrawLine","args":[125.25,16,125.25,104,0,0]}],[{"kind":"cdDrawCurve","args":[119.5,57,102.25,81,65.45,98,132,7]}],[{"kind":"cdDrawCurve","args":[131,57,151.7,78,177,89,7,0]}],[{"kind":"cdDrawCurve","args":[96.5,99,87.3,127,65.45,150,0,7]}],[{"kind":"cdDrawLine","args":[88.45,119,117.19999999999999,119,2,2]}],[{"kind":"cdDrawCurve","args":[117.19999999999999,119,104.55000000000001,169,62,188,22,7]}],[{"kind":"cdDrawCurve","args":[79.25,132,90.75,138,96.5,147,7,8]}],[{"kind":"cdDrawLine","args":[129.85,119,183.9,119,0,200]}],[{"kind":"cdDrawLine","args":[135.6,129,131,151,0,213]}],[{"kind":"cdDrawLine","args":[131,151,187.35,151,2,100]}],[{"kind":"cdDrawLine","args":[158.6,99,158.6,186,0,0]}]]
const TRACE_SHA256 = "dee2def73f6a21a517f922ff4a04edb9a7dc6641262bb42660e417aef91871fb"
const GROUPS_SHA256 = "f68d6d7806990835a945c6f77804848fa666c879cae03f1527073c523eb0b3b6"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
