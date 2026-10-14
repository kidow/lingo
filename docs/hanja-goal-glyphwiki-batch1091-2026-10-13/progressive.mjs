import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "catalogue12-versus-domestic13-count-conflict"
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

export const sourceRoot = "u5ac2"
export const sourceProofFile = "./engine-whole-u5ac2.json"
export const sourceProofFileSha256 = "a367869062d12affb1f3adb456749f484c804b1247b5928a722ca8c062fe4be3"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "5923d4bf3cb3fefba109a1a8889bd4384fb6b79ff26838dc406f820c764b1294"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "d344246806561064897e12549e39ca175777e1d17d51a95beb1a2e5e27e8f774"
export const selectedProofIdentity = {"sourceRoot":"u5ac2","sourceProofFile":"./engine-whole-u5ac2.json","sourceProofFileSha256":"a367869062d12affb1f3adb456749f484c804b1247b5928a722ca8c062fe4be3","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"5923d4bf3cb3fefba109a1a8889bd4384fb6b79ff26838dc406f820c764b1294","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"d344246806561064897e12549e39ca175777e1d17d51a95beb1a2e5e27e8f774"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u5ac2","sourceProofFile":"./engine-whole-u5ac2.json","sourceProofFileSha256":"a367869062d12affb1f3adb456749f484c804b1247b5928a722ca8c062fe4be3","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"5923d4bf3cb3fefba109a1a8889bd4384fb6b79ff26838dc406f820c764b1294","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"d344246806561064897e12549e39ca175777e1d17d51a95beb1a2e5e27e8f774"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "9a1c18ea2e6a885e79714ef51e9d9797e4773e61924d0541afac4ce98793d101"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 15
const ORIGINAL = [[{"kind":"cdDrawLine","args":[46.6,16,25.8,135,0,0]}],[{"kind":"cdDrawCurve","args":[27.4,118,57.8,129,73,156,7,8]}],[{"kind":"cdDrawCurve","args":[68.2,61,58.6,153,12.2,188,22,7]}],[{"kind":"cdDrawLine","args":[17,61,68.2,61,0,2]}],[{"kind":"cdDrawCurve","args":[117.125,30,104.45,35,89.825,40,0,7]}],[{"kind":"cdDrawLine","args":[89.825,40,89.825,100,12,113]}],[{"kind":"cdDrawLine","args":[89.825,68,121.025,68,2,200]}],[{"kind":"cdDrawLine","args":[143.45,34,172.7,34,0,2]}],[{"kind":"cdDrawLine","args":[172.7,34,172.7,100,22,123]}],[{"kind":"cdDrawLine","args":[144.425,67,172.7,67,0,2]}],[{"kind":"cdDrawLine","args":[89.825,100,172.7,100,2,2]}],[{"kind":"cdDrawLine","args":[132.725,14,132.725,125,0,32]}],[{"kind":"cdDrawLine","args":[80.075,125,167.825,125,0,2]}],[{"kind":"cdDrawCurve","args":[167.825,125,135.65,178,70.325,188,22,7]}],[{"kind":"cdDrawCurve","args":[101.525,125,125.9,171,177.575,182,7,0]}]]
const TRACE_SHA256 = "754ca5f6699fb6575e748ae98d82899b6b67c8bbfae6744ff073346842f6ab69"
const GROUPS_SHA256 = "32eeb2cae02bb152b60cdc564017da350346899be0534150b6894a8a18a053ea"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
