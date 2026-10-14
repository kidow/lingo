import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "minimum-original-pens-13-exceeds-catalog-11"
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

export const sourceRoot = "u7d3d"
export const sourceProofFile = "./engine-whole-u7d3d.json"
export const sourceProofFileSha256 = "e7c2484d2cca44987ed560c8c8f91766995e161b0f0ec716c674e9fb0602edba"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "43d96c6fab191814e46c97219036d6c5a3a46fc2c5a12b2ffa3312c43cee7e47"
export const selectedProofIdentity = {"sourceRoot":"u7d3d","sourceProofFile":"./engine-whole-u7d3d.json","sourceProofFileSha256":"e7c2484d2cca44987ed560c8c8f91766995e161b0f0ec716c674e9fb0602edba","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"43d96c6fab191814e46c97219036d6c5a3a46fc2c5a12b2ffa3312c43cee7e47"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u7d3d","sourceProofFile":"./engine-whole-u7d3d.json","sourceProofFileSha256":"e7c2484d2cca44987ed560c8c8f91766995e161b0f0ec716c674e9fb0602edba","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"43d96c6fab191814e46c97219036d6c5a3a46fc2c5a12b2ffa3312c43cee7e47"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "f34aa1eeb878c3f40dc4ec3b41d16b287c5c7bb8bf0643160157f2cb8aa93335"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 14
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[51.5,16,41,37,28.25,56,0,7]}],[{"kind":"cdDrawCurve","args":[12.5,45,30.5,56,38,76,7,8]}],[{"kind":"cdDrawCurve","args":[73.25,39,52.25,76,27.5,110,0,7]}],[{"kind":"cdDrawCurve","args":[14,113,45.5,109,73.25,101,0,7]}],[{"kind":"cdDrawCurve","args":[57.5,78,71.75,91,77.75,114,7,8]}],[{"kind":"cdDrawLine","args":[48.5,109,48.5,186,32,0]}],[{"kind":"cdDrawCurve","args":[30.5,127,27.5,155,12.5,180,0,7]}],[{"kind":"cdDrawCurve","args":[58.25,122,71.75,136,77,161,7,8]}],[{"kind":"cdDrawLine","args":[130,16.880000000000003,130,45.4,0,32]}],[{"kind":"cdDrawCurve","args":[87.22,33.80799999999999,87.84,64.444,77.92,74.38,7,8]}],[{"kind":"cdDrawLine","args":[87.84,46.228,177.12,46.228,0,2]}],[{"kind":"cdDrawCurve","args":[177.12,46.228,173.4,56.16400000000001,164.72,72.724,22,7]}],[{"kind":"cdDrawCurve","args":[169,90,140,105,105,120,0,7]}],[{"kind":"cdDrawLine","args":[105,65,105,166,0,1]},{"kind":"cdDrawCurve","args":[105,166,105,176,115,176,1,1]},{"kind":"cdDrawLine","args":[115,176,180,176,6,5]}]]
const TRACE_SHA256 = "0b5c3e3247f758ba1eff01ec6ba5f4ac96652c356cbb978e8b5f73c5c98c767b"
const GROUPS_SHA256 = "d08054d98eb115ef905eb9de85fb3f07419151a653fef58f3eafebd0f4ec7cc5"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
