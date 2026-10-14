import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "complete-whole-minimum-original-pens-14or15-exceeds-catalog-13"
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

export const sourceRoot = "u821d"
export const sourceProofFile = "./engine-whole-u821d.json"
export const sourceProofFileSha256 = "2e3e2ba3838747511b5d1382c37c043364ebff042c51fb329cb25103e6fbb016"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "b43cd033f3b3ae14fbc37f5dd6b862b52ebd82c66656c4e5383a588386dc1e47"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "8e3ee169e02a9be4236838928c893380b06f3eccb34321221f4f7b954b3d989b"
export const selectedProofIdentity = Object.freeze({"sourceRoot":"u821d","sourceProofFile":"./engine-whole-u821d.json","sourceProofFileSha256":"2e3e2ba3838747511b5d1382c37c043364ebff042c51fb329cb25103e6fbb016","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"b43cd033f3b3ae14fbc37f5dd6b862b52ebd82c66656c4e5383a588386dc1e47","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"8e3ee169e02a9be4236838928c893380b06f3eccb34321221f4f7b954b3d989b"})
const SELECTED_PROOF_IDENTITY = Object.freeze({"sourceRoot":"u821d","sourceProofFile":"./engine-whole-u821d.json","sourceProofFileSha256":"2e3e2ba3838747511b5d1382c37c043364ebff042c51fb329cb25103e6fbb016","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"b43cd033f3b3ae14fbc37f5dd6b862b52ebd82c66656c4e5383a588386dc1e47","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"8e3ee169e02a9be4236838928c893380b06f3eccb34321221f4f7b954b3d989b"})
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "bd708e0d9ae19288b858daac861a6a344f9ba7d53b048278c359ed11d49fea3e"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = Object.freeze([])
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 20
const ORIGINAL = [[{"kind":"cdDrawLine","args":[86,14,78,47,0,32]}],[{"kind":"cdDrawLine","args":[39,28,140,28,0,2]}],[{"kind":"cdDrawLine","args":[140,28,140,47,22,32]}],[{"kind":"cdDrawLine","args":[16,47,184,47,0,0]}],[{"kind":"cdDrawCurve","args":[62,53.74,53,60.19,37,67.07,0,7]}],[{"kind":"cdDrawCurve","args":[37,67.07,53,72.23,62,80.4,7,8]}],[{"kind":"cdDrawCurve","args":[109,53.74,100,60.19,84,67.07,0,7]}],[{"kind":"cdDrawCurve","args":[84,67.07,100,72.23,109,80.4,7,8]}],[{"kind":"cdDrawCurve","args":[156,53.74,147,60.19,131,67.07,0,7]}],[{"kind":"cdDrawCurve","args":[131,67.07,147,72.23,156,80.4,7,8]}],[{"kind":"cdDrawCurve","args":[31,74.92,32,102.485,16,111.425,7,8]}],[{"kind":"cdDrawLine","args":[32,86.095,176,86.095,0,2]}],[{"kind":"cdDrawCurve","args":[176,86.095,170,95.035,156,109.935,22,7]}],[{"kind":"cdDrawCurve","args":[90,90,78,107,60,115,0,7]}],[{"kind":"cdDrawCurve","args":[40,117,91,115,154,112,0,7]}],[{"kind":"cdDrawCurve","args":[130,96,147,108,156,123,7,8]}],[{"kind":"cdDrawLine","args":[33,138,148,138,0,0]}],[{"kind":"cdDrawLine","args":[52,142,45,163,0,32]}],[{"kind":"cdDrawLine","args":[12,163,188,163,0,0]}],[{"kind":"cdDrawLine","args":[103,118,103,186,0,200]}]]
const TRACE_SHA256 = "136aa1ab64d8f01482e4f10b25000ab6131d855ad2d9c39253d166fd67638d46"
const GROUPS_SHA256 = "43d8e3d14efd5122e1346fb42deafef49edab1fa2d7e17cf12da52546749b3f9"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
