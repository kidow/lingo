import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "excluding-incidental-day-outer-closure-leaves-10-pens-above-catalogue9"
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

export const sourceRoot = "u6621-ue0102"
export const sourceProofFile = "./engine-whole-u6621-ue0102.json"
export const sourceProofFileSha256 = "67b59b9e874156b76639b8f648c1cff10c966816bdd6558d96782023d1c3ed08"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "ca57bdf4e2bde1cb6ed97d9e880324d06de13040287ee3f12afab287cee1f1c4"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "00c8bf9fbeaad04fdeb63481808352a8613f1a30d73bc202cc619550055d1038"
export const selectedProofIdentity = {"sourceRoot":"u6621-ue0102","sourceProofFile":"./engine-whole-u6621-ue0102.json","sourceProofFileSha256":"67b59b9e874156b76639b8f648c1cff10c966816bdd6558d96782023d1c3ed08","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"ca57bdf4e2bde1cb6ed97d9e880324d06de13040287ee3f12afab287cee1f1c4","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"00c8bf9fbeaad04fdeb63481808352a8613f1a30d73bc202cc619550055d1038"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u6621-ue0102","sourceProofFile":"./engine-whole-u6621-ue0102.json","sourceProofFileSha256":"67b59b9e874156b76639b8f648c1cff10c966816bdd6558d96782023d1c3ed08","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"ca57bdf4e2bde1cb6ed97d9e880324d06de13040287ee3f12afab287cee1f1c4","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"00c8bf9fbeaad04fdeb63481808352a8613f1a30d73bc202cc619550055d1038"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "c48cfa9d74482ec4b3a5862b9aeee4f9a9a52bcaf0276314904e3c25afc54caa"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 11
const ORIGINAL = [[{"kind":"cdDrawLine","args":[26.185950000000002,37.56,26.185950000000002,150.44,12,13]}],[{"kind":"cdDrawLine","args":[26.185950000000002,37.56,65.47904999999999,37.56,2,2]}],[{"kind":"cdDrawLine","args":[65.47904999999999,37.56,65.47904999999999,150.44,22,123]}],[{"kind":"cdDrawLine","args":[26.185950000000002,92.34,65.47904999999999,92.34,2,2]}],[{"kind":"cdDrawLine","args":[26.185950000000002,150.44,65.47904999999999,150.44,2,2]}],[{"kind":"cdDrawLine","args":[126.47999999999998,16,126.47999999999998,50,0,32]}],[{"kind":"cdDrawLine","args":[74.64,50,185.88,50,0,0]}],[{"kind":"cdDrawCurve","args":[134.04,55,123.24,76,103.8,102,0,7]}],[{"kind":"cdDrawCurve","args":[83.28,87,110.28,108,118.91999999999999,128,7,8]}],[{"kind":"cdDrawCurve","args":[167.52,80,139.44,123,88.68,180,0,7]}],[{"kind":"cdDrawLine","args":[72.48,180,184.8,180,0,0]}]]
const TRACE_SHA256 = "eba41dfdbc4de5df1e91c2091c3cd6b49027834047518594a39173cdeb8ddcdc"
const GROUPS_SHA256 = "1dfb1d7dd53d4158bfc67816e2fc8cb8db05455f939c917ecf7e8c49ecb1a0cd"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
