import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "catalog-29-domestic-30-mismatch"
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

export const sourceRoot = "u7228"
export const sourceProofFile = "./engine-whole-u7228.json"
export const sourceProofFileSha256 = "f4a437c351edd4368b6023c05ad8c84e907ee80be008f0b06f75a57e5f15da18"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "fc90be0b59c5a628f50f4a104af12d96ee0b70e05257448a26ac067f4e12c7d9"
export const selectedProofIdentity = {"sourceRoot":"u7228","sourceProofFile":"./engine-whole-u7228.json","sourceProofFileSha256":"f4a437c351edd4368b6023c05ad8c84e907ee80be008f0b06f75a57e5f15da18","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"fc90be0b59c5a628f50f4a104af12d96ee0b70e05257448a26ac067f4e12c7d9"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u7228","sourceProofFile":"./engine-whole-u7228.json","sourceProofFileSha256":"f4a437c351edd4368b6023c05ad8c84e907ee80be008f0b06f75a57e5f15da18","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"fc90be0b59c5a628f50f4a104af12d96ee0b70e05257448a26ac067f4e12c7d9"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "621c9bee80adf3e48137a422982a0adb0f2f966cabc528aa46d519ee91ac62c7"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 33
const ORIGINAL = [[{"kind":"cdDrawLine","args":[75,21.625,75,73.03,12,32]}],[{"kind":"cdDrawLine","args":[75,21.625,125,21.625,2,2]}],[{"kind":"cdDrawLine","args":[125,21.625,125,73.03,1022,32]}],[{"kind":"cdDrawLine","args":[75,35.035,115,35.035,2,100]}],[{"kind":"cdDrawLine","args":[74.8,46.548975,104,46.548975,0,2]}],[{"kind":"cdDrawLine","args":[104,46.548975,104,60.227174999999995,1022,323]}],[{"kind":"cdDrawLine","args":[74.8,60.227174999999995,104,60.227174999999995,0,2]}],[{"kind":"cdDrawCurve","args":[60,19.39,50,23.115,32,27.585,0,7]}],[{"kind":"cdDrawLine","args":[32,27.585,34,73.03,12,32]}],[{"kind":"cdDrawLine","args":[33,40.995,64,40.995,2,200]}],[{"kind":"cdDrawLine","args":[33,55.895,64,55.895,2,200]}],[{"kind":"cdDrawLine","args":[140,23.86,168,23.86,0,2]}],[{"kind":"cdDrawLine","args":[168,23.86,166,73.03,22,32]}],[{"kind":"cdDrawLine","args":[136,40.995,167,40.995,0,2]}],[{"kind":"cdDrawLine","args":[136,55.895,167,55.895,0,2]}],[{"kind":"cdDrawCurve","args":[24,66.325,25,84.205,16,92.4,7,8]}],[{"kind":"cdDrawLine","args":[26,73.03,178,73.03,2,2]}],[{"kind":"cdDrawCurve","args":[178,73.03,174,78.99,162,91.655,22,7]}],[{"kind":"cdDrawLine","args":[30,92,100,92,0,100]}],[{"kind":"cdDrawLine","args":[63,77,63,124,0,100]}],[{"kind":"cdDrawCurve","args":[62,92,50,110,22,123,132,7]}],[{"kind":"cdDrawCurve","args":[63,98,77,102,86,111,7,8]}],[{"kind":"cdDrawLine","args":[103,92,170,92,0,100]}],[{"kind":"cdDrawLine","args":[134,77,134,124,0,100]}],[{"kind":"cdDrawCurve","args":[133,92,124,109,100,123,132,7]}],[{"kind":"cdDrawCurve","args":[134,96,154,104,166,116,7,8]}],[{"kind":"cdDrawLine","args":[18,129,182,129,0,0]}],[{"kind":"cdDrawCurve","args":[99,111,69,147,11,164,0,7]}],[{"kind":"cdDrawCurve","args":[119,129,148,151,179,157,7,0]}],[{"kind":"cdDrawCurve","args":[74,141,73,159,59,167,7,8]}],[{"kind":"cdDrawCurve","args":[137,147,130,158,118,169,0,7]}],[{"kind":"cdDrawCurve","args":[103,136,102,181,26,188,0,7]}],[{"kind":"cdDrawCurve","args":[94,164,140,174,164,185,7,8]}]]
const TRACE_SHA256 = "513b976ac9ebb6696a629f0ae0ee59a078e05641c8c1a028d2f7d8c732dabe8b"
const GROUPS_SHA256 = "6c4082a5f18a490229dde062049355a1ee4f50ebe073e0fae4e6c2a548e02d0b"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
