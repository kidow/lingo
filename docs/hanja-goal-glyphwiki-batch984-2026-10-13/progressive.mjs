import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "catalog-12-domestic-11-mismatch"
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

export const sourceRoot = "u655d"
export const sourceProofFile = "./engine-whole-u655d.json"
export const sourceProofFileSha256 = "aec1600890713b18fd739998c8b2451eaf267e664039ab6db60b6124c39a94af"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "a1e4d41afd749d9af493f30fcaf7eccb685b911aead2f38349104d6bbfb0fb87"
export const selectedProofIdentity = {"sourceRoot":"u655d","sourceProofFile":"./engine-whole-u655d.json","sourceProofFileSha256":"aec1600890713b18fd739998c8b2451eaf267e664039ab6db60b6124c39a94af","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a1e4d41afd749d9af493f30fcaf7eccb685b911aead2f38349104d6bbfb0fb87"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u655d","sourceProofFile":"./engine-whole-u655d.json","sourceProofFileSha256":"aec1600890713b18fd739998c8b2451eaf267e664039ab6db60b6124c39a94af","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a1e4d41afd749d9af493f30fcaf7eccb685b911aead2f38349104d6bbfb0fb87"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "f9a1d73a035af52c76c81da6b9bf5a45a9a442c06b4532e64e25fdb0fca4ea50"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 13
const ORIGINAL = [[{"kind":"cdDrawLine","args":[63,14,63,79,0,32]}],[{"kind":"cdDrawCurve","args":[44,30,34,56,12,78,0,7]}],[{"kind":"cdDrawCurve","args":[75,29,94,43,105,66,7,8]}],[{"kind":"cdDrawLine","args":[27,79,27,185,12,0]}],[{"kind":"cdDrawLine","args":[27,79,99,79,2,2]}],[{"kind":"cdDrawLine","args":[99,79,99,169,22,1]},{"kind":"cdDrawCurve","args":[99,169,99,179,89,179,1,514]}],[{"kind":"cdDrawLine","args":[63,79,63,182,32,0]}],[{"kind":"cdDrawCurve","args":[48,99,45,129,35,154,0,7]}],[{"kind":"cdDrawCurve","args":[71,96,82,118,85,146,7,8]}],[{"kind":"cdDrawCurve","args":[141.2,14,131.6,65,109.2,100,0,7]}],[{"kind":"cdDrawLine","args":[128.4,63,187.6,63,2,0]}],[{"kind":"cdDrawCurve","args":[165.2,63,155.6,160,94,188,2,7]}],[{"kind":"cdDrawCurve","args":[123.6,73,132.4,150,181.2,178,7,0]}]]
const TRACE_SHA256 = "50c246b00adcd03fc76235a85518433e41c9776066d76828eb36df30ec00a32a"
const GROUPS_SHA256 = "1a4d8074afc8ad3813051a583c410801864ef4bfbcec7ff3c05b34d14b7db19b"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
