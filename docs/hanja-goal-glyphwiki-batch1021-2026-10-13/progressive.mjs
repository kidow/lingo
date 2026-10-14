import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "complete-whole-original-minimum14-exceeds-catalogue12-no-exact-joins"
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

export const sourceRoot = "u5092"
export const sourceProofFile = "./engine-whole-u5092.json"
export const sourceProofFileSha256 = "6846a697199379906c05af93ae7d8b90341a0a36447b048bc9b6582422a3812e"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "4df5262150a106350598ea1e99134d87c2a21bd62a171bde1110ff94d3a1f13d"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "bc8a9c0a7a599055a68ab28da1459ab39243e90b3871290a0d46642ac35c6e7f"
export const selectedProofIdentity = Object.freeze({"sourceRoot":"u5092","sourceProofFile":"./engine-whole-u5092.json","sourceProofFileSha256":"6846a697199379906c05af93ae7d8b90341a0a36447b048bc9b6582422a3812e","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"4df5262150a106350598ea1e99134d87c2a21bd62a171bde1110ff94d3a1f13d","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"bc8a9c0a7a599055a68ab28da1459ab39243e90b3871290a0d46642ac35c6e7f"})
const SELECTED_PROOF_IDENTITY = Object.freeze({"sourceRoot":"u5092","sourceProofFile":"./engine-whole-u5092.json","sourceProofFileSha256":"6846a697199379906c05af93ae7d8b90341a0a36447b048bc9b6582422a3812e","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"4df5262150a106350598ea1e99134d87c2a21bd62a171bde1110ff94d3a1f13d","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"bc8a9c0a7a599055a68ab28da1459ab39243e90b3871290a0d46642ac35c6e7f"})
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "543e50dd0c62a624cd56ffe8b56ee9046279766eeb1cc3109158fa364f5a6889"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = Object.freeze([])
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 14
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[69.125,15,45.5,72,10.5,117,0,7]}],[{"kind":"cdDrawLine","args":[45.5,73,45.5,186,0,0]}],[{"kind":"cdDrawCurve","args":[169.28,18,133.64,28,93.05,34,0,7]}],[{"kind":"cdDrawCurve","args":[96.02,28,88.1,54,74.24,76,0,7]}],[{"kind":"cdDrawCurve","args":[119.78,36,129.68,46,133.64,60,7,8]}],[{"kind":"cdDrawCurve","args":[155.42,32,171.26,44,179.18,62,7,8]}],[{"kind":"cdDrawCurve","args":[123.74,60,113.84,72,101.96,88,0,7]}],[{"kind":"cdDrawCurve","args":[86.12,80,101.96,86,111.86,100,7,8]}],[{"kind":"cdDrawCurve","args":[153.44,70,133.64,92,111.86,114,0,7]}],[{"kind":"cdDrawCurve","args":[78.2,120,129.68,116,171.26,110,0,7]}],[{"kind":"cdDrawCurve","args":[151.46,96,169.28,106,179.18,122,7,8]}],[{"kind":"cdDrawLine","args":[73.25,144,185.12,144,0,0]}],[{"kind":"cdDrawCurve","args":[127.69999999999999,124,121.76,176,66.32,188,0,7]}],[{"kind":"cdDrawCurve","args":[129.68,144,143.54,172,175.22,181,7,0]}]]
const TRACE_SHA256 = "84cd2bc58b5a7d1dc240e8a3af8b01eea45cc19404658b15ef24de6c61355c71"
const GROUPS_SHA256 = "f53c64669c1ac1ade3ab650a17f50cd5f2344f2e138834bb19a772f08b7ddb5d"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
