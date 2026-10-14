import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "grass4-water-trajectory-gap-and-excluding-incidental-closure-leaves-13-pens"
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

export const sourceRoot = "u83cf-ue0102"
export const sourceProofFile = "./engine-whole-u83cf-ue0102.json"
export const sourceProofFileSha256 = "d7dddbbf0d5c78541e7af0416b2a2b075deeda33d6e15668357adf639441c73e"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "0104286a70b78c53d37ef8580af6ba74de29e401054177f6192a1b884aa52521"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "d877e420449e19ae215790b2bfe1ab689e8d6150eb91c0776203dd70448d2584"
export const selectedProofIdentity = {"sourceRoot":"u83cf-ue0102","sourceProofFile":"./engine-whole-u83cf-ue0102.json","sourceProofFileSha256":"d7dddbbf0d5c78541e7af0416b2a2b075deeda33d6e15668357adf639441c73e","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"0104286a70b78c53d37ef8580af6ba74de29e401054177f6192a1b884aa52521","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"d877e420449e19ae215790b2bfe1ab689e8d6150eb91c0776203dd70448d2584"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u83cf-ue0102","sourceProofFile":"./engine-whole-u83cf-ue0102.json","sourceProofFileSha256":"d7dddbbf0d5c78541e7af0416b2a2b075deeda33d6e15668357adf639441c73e","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"0104286a70b78c53d37ef8580af6ba74de29e401054177f6192a1b884aa52521","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"d877e420449e19ae215790b2bfe1ab689e8d6150eb91c0776203dd70448d2584"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "4cf4ff6b69932f2db902a9b0b8af72f025bc2f0a8b619fd97f911d391d38d6cb"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 14
const ORIGINAL = [[{"kind":"cdDrawLine","args":[12.935,33.76,93.53,33.76,0,100]}],[{"kind":"cdDrawLine","args":[63.68,11.92,63.68,54.76,0,300]}],[{"kind":"cdDrawLine","args":[135.32,11.92,135.32,54.76,0,300]}],[{"kind":"cdDrawLine","args":[105.47,33.76,186.065,33.76,0,0]}],[{"kind":"cdDrawCurve","args":[29.785,60.6765,48.16,65.813275,56.245,76.086825,7,8]}],[{"kind":"cdDrawCurve","args":[15.82,94.43245000000003,35.665,99.56922499999999,43.015,109.84277499999999,7,8]}],[{"kind":"cdDrawCurve","args":[17.29,143.598725,43.015,150.20315,40.075,181.02380000000002,7,8]}],[{"kind":"cdDrawCurve","args":[36.4,156.07375000000002,39.34,147.26785,70.21000000000001,95.166275,32,7]}],[{"kind":"cdDrawLine","args":[70.11,72.075,187.48,72.075,0,0]}],[{"kind":"cdDrawLine","args":[88.26,98.15,88.26,136.89,12,13]}],[{"kind":"cdDrawLine","args":[88.26,98.15,128.19,98.15,2,2]}],[{"kind":"cdDrawLine","args":[128.19,98.15,128.19,136.89,22,23]}],[{"kind":"cdDrawLine","args":[88.26,136.89,128.19,136.89,2,2]}],[{"kind":"cdDrawLine","args":[163.28,72.075,163.28,172.335,32,1]},{"kind":"cdDrawCurve","args":[163.28,172.335,163.28,182.335,153.28,182.335,1,14]}]]
const TRACE_SHA256 = "6d43aad06f3e370cf7202fc4b6c9792ebdd1f6610acd06fd504505edf56135f6"
const GROUPS_SHA256 = "4fd2ed77d8f6ae6e741a826082921e61112355bcadd1ea27d3ef6a22ace6a237"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
