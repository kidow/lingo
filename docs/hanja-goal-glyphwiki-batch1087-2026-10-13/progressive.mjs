import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "original-water-gap-and-excluding-incidental-mouth-closure-leaves13-pens-above12"
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

export const sourceRoot = "u6e7a"
export const sourceProofFile = "./engine-whole-u6e7a.json"
export const sourceProofFileSha256 = "9885f0959ffeab9f19945f5d6e3627800f558ce6b854f9ad1f328eaa7825736c"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "729ff27e78cfbc9ed772c8d5fad69b72afdfb80043d8e4484be6a9ac0d3a5bfe"
export const selectedProofIdentity = {"sourceRoot":"u6e7a","sourceProofFile":"./engine-whole-u6e7a.json","sourceProofFileSha256":"9885f0959ffeab9f19945f5d6e3627800f558ce6b854f9ad1f328eaa7825736c","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"729ff27e78cfbc9ed772c8d5fad69b72afdfb80043d8e4484be6a9ac0d3a5bfe"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u6e7a","sourceProofFile":"./engine-whole-u6e7a.json","sourceProofFileSha256":"9885f0959ffeab9f19945f5d6e3627800f558ce6b854f9ad1f328eaa7825736c","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"729ff27e78cfbc9ed772c8d5fad69b72afdfb80043d8e4484be6a9ac0d3a5bfe"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "ff4da0992129c85be7886b7d2831c8ea00d8e192d51fc72836cc74d4d7bd57ad"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 15
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[26.32,20,44.32,27,52.24,41,7,8]}],[{"kind":"cdDrawCurve","args":[12.64,66,32.08,73,39.28,87,7,8]}],[{"kind":"cdDrawCurve","args":[14.08,133,39.28,142,36.4,184,7,8]}],[{"kind":"cdDrawCurve","args":[32.8,150,35.68,138,65.92,67,32,7]}],[],[{"kind":"cdDrawCurve","args":[96.24680000000001,16.625,81.9584,72.2,60.7904,116.075,0,7]}],[{"kind":"cdDrawLine","args":[81.9584,73.175,81.9584,183.35,0,0]}],[{"kind":"cdDrawLine","args":[112.03999999999999,27,112.03999999999999,80,12,13]}],[{"kind":"cdDrawLine","args":[112.03999999999999,27,167.48000000000002,27,2,2]}],[{"kind":"cdDrawLine","args":[167.48000000000002,27,167.48000000000002,80,22,23]}],[{"kind":"cdDrawLine","args":[112.03999999999999,80,167.48000000000002,80,2,2]}],[{"kind":"cdDrawLine","args":[94.03999999999999,113,184.04,113,0,0]}],[{"kind":"cdDrawLine","args":[138.68,80,138.68,183,32,0]}],[{"kind":"cdDrawCurve","args":[134.36,113,121.4,153,91.88,178,132,7]}],[{"kind":"cdDrawCurve","args":[143.72,113,156.68,147,181.16,167,7,0]}]]
const TRACE_SHA256 = "30507a700b7025cabcd730d50576321fe7e8da1863bf570804a287461e8bf6c7"
const GROUPS_SHA256 = "f065db26a27c2d4fe958174a0d4188190ca057e46d3662cda97eaa9477598931"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
