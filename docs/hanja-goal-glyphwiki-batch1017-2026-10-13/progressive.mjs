import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "original-water-trajectory-gap-and-minimum-pens22-exceeds-catalogue21"
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

export const sourceRoot = "u7050"
export const sourceProofFile = "./engine-whole-u7050.json"
export const sourceProofFileSha256 = "48c62ed4fbebc6fd0bb1103b93c578054532103f253d97e08949f84ed62a5e30"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "f8bb397b969b2d0df140586790f7372c622d4286c09c30aa6e2e442c9ec4eeec"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "302abc84cb13e3caaa625480c7c805d35eb96eb0ba6e7f12a9059eb6110df24b"
export const selectedProofIdentity = {"sourceRoot":"u7050","sourceProofFile":"./engine-whole-u7050.json","sourceProofFileSha256":"48c62ed4fbebc6fd0bb1103b93c578054532103f253d97e08949f84ed62a5e30","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"f8bb397b969b2d0df140586790f7372c622d4286c09c30aa6e2e442c9ec4eeec","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"302abc84cb13e3caaa625480c7c805d35eb96eb0ba6e7f12a9059eb6110df24b"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u7050","sourceProofFile":"./engine-whole-u7050.json","sourceProofFileSha256":"48c62ed4fbebc6fd0bb1103b93c578054532103f253d97e08949f84ed62a5e30","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"f8bb397b969b2d0df140586790f7372c622d4286c09c30aa6e2e442c9ec4eeec","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"302abc84cb13e3caaa625480c7c805d35eb96eb0ba6e7f12a9059eb6110df24b"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "df451f5f183ced3047697970d20519c4b8c690f562c9df04da4ecf8e1bc2b481"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 24
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[24.235,20,41.36,27,48.895,41,7,8]}],[{"kind":"cdDrawCurve","args":[11.22,66,29.715,73,36.565,87,7,8]}],[{"kind":"cdDrawCurve","args":[12.59,133,36.565,142,33.825,184,7,8]}],[{"kind":"cdDrawCurve","args":[30.4,150,33.14,138,61.91,67,32,7]}],[],[{"kind":"cdDrawCurve","args":[78.84299999999999,24.0212125,81.18975,34.1563375,74.1495,43.953625,7,8]}],[{"kind":"cdDrawCurve","args":[116.72625,21.994187500000002,111.69749999999999,31.791475000000002,102.3105,40.575250000000004,0,7]}],[{"kind":"cdDrawCurve","args":[96.276,14.223925,96.94650000000001,55.7779375,68.7855,68.277925,0,7]}],[{"kind":"cdDrawCurve","args":[92.58824999999999,45.30497499999999,108.345,52.3995625,119.40825,65.575225,7,8]}],[{"kind":"cdDrawCurve","args":[133.973,24.0212125,136.31975,34.1563375,129.27949999999998,43.953625,7,8]}],[{"kind":"cdDrawCurve","args":[171.85625,21.994187500000002,166.8275,31.791475000000002,157.44050000000001,40.575250000000004,0,7]}],[{"kind":"cdDrawCurve","args":[151.406,14.223925,152.0765,55.7779375,123.91550000000001,68.277925,0,7]}],[{"kind":"cdDrawCurve","args":[147.71824999999998,45.30497499999999,163.475,52.3995625,174.53825,65.575225,7,8]}],[{"kind":"cdDrawCurve","args":[71.095,63.85708,71.84,93.14276500000001,59.92,102.640825,7,8]}],[{"kind":"cdDrawLine","args":[71.84,75.729655,179.12,75.729655,0,2]}],[{"kind":"cdDrawCurve","args":[179.12,75.729655,174.65,85.22771499999999,164.22,101.05781499999999,22,7]}],[{"kind":"cdDrawCurve","args":[127.715,81.98200000000001,105.36500000000001,121.87899999999999,58.43,147.619,0,7]}],[{"kind":"cdDrawCurve","args":[125.48,88.417,150.065,123.166,181.355,137.32299999999998,7,0]}],[{"kind":"cdDrawLine","args":[102.38499999999999,125.74,147.82999999999998,125.74,0,100]}],[{"kind":"cdDrawLine","args":[81.525,147.619,165.70999999999998,147.619,0,0]}],[{"kind":"cdDrawLine","args":[123.245,125.74,123.245,181.08100000000002,32,32]}],[{"kind":"cdDrawCurve","args":[91.955,152.767,100.15,161.776,103.875,174.64600000000002,7,8]}],[{"kind":"cdDrawCurve","args":[150.81,155.341,145.595,168.211,138.14499999999998,181.08100000000002,0,7]}],[{"kind":"cdDrawLine","args":[64.39,181.08100000000002,182.845,181.08100000000002,0,0]}]]
const TRACE_SHA256 = "89e491b38058c544f9a861db40afe0ce708ef42f5a3430e8baab7ea6f96dbfb1"
const GROUPS_SHA256 = "7669410fb239b61a58901fa01a2512608703e7a39e60daa59a8ea35b9899fefe"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
