import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "catalogue17-versus-domestic16-count-conflict"
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

export const sourceRoot = "u77a5"
export const sourceProofFile = "./engine-whole-u77a5.json"
export const sourceProofFileSha256 = "a5da856e0637648c00fa7ebaf4e24c3eb068446b23e86a20624b7360df8b508b"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "774030b77f6e8433e97fad37cd69a504dd461e52a2cfce6d1e4e749d640e6889"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "6d5a5fc4148fe2355fcac111ad5f29246981753b7047928a654537b629021dcd"
export const selectedProofIdentity = {"sourceRoot":"u77a5","sourceProofFile":"./engine-whole-u77a5.json","sourceProofFileSha256":"a5da856e0637648c00fa7ebaf4e24c3eb068446b23e86a20624b7360df8b508b","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"774030b77f6e8433e97fad37cd69a504dd461e52a2cfce6d1e4e749d640e6889","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"6d5a5fc4148fe2355fcac111ad5f29246981753b7047928a654537b629021dcd"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u77a5","sourceProofFile":"./engine-whole-u77a5.json","sourceProofFileSha256":"a5da856e0637648c00fa7ebaf4e24c3eb068446b23e86a20624b7360df8b508b","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"774030b77f6e8433e97fad37cd69a504dd461e52a2cfce6d1e4e749d640e6889","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"6d5a5fc4148fe2355fcac111ad5f29246981753b7047928a654537b629021dcd"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "cfa7fb761c8ad9c1aafb62c83d293227ac94d1404b1ce9b738ecadf15360dd1e"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 18
const ORIGINAL = [[{"kind":"cdDrawLine","args":[66,13,66,102,0,0]}],[{"kind":"cdDrawLine","args":[31,46,31,108,12,0]}],[{"kind":"cdDrawLine","args":[31,46,99,46,2,2]}],[{"kind":"cdDrawLine","args":[99,46,99,91,22,1]},{"kind":"cdDrawCurve","args":[99,91,99,101,89,101,1,514]}],[{"kind":"cdDrawCurve","args":[47,22,37,33,15,44,0,7]}],[{"kind":"cdDrawCurve","args":[79,20,96,26,106,36,7,8]}],[{"kind":"cdDrawCurve","args":[52,57,52,74,39,91,0,7]}],[{"kind":"cdDrawCurve","args":[74,55,84,65,85,81,7,8]}],[{"kind":"cdDrawCurve","args":[134,14,127,46,109,67,0,7]}],[{"kind":"cdDrawLine","args":[129,36,186,36,0,0]}],[{"kind":"cdDrawCurve","args":[164,38,156,84,107,106,0,7]}],[{"kind":"cdDrawCurve","args":[125,43,137,86,180,102,7,0]}],[{"kind":"cdDrawLine","args":[46,114.2,46,174.92000000000002,12,113]}],[{"kind":"cdDrawLine","args":[46,114.2,154,114.2,2,2]}],[{"kind":"cdDrawLine","args":[154,114.2,154,174.92000000000002,22,123]}],[{"kind":"cdDrawLine","args":[46,134,154,134,2,2]}],[{"kind":"cdDrawLine","args":[46,153.8,154,153.8,2,2]}],[{"kind":"cdDrawLine","args":[46,174.92000000000002,154,174.92000000000002,2,2]}]]
const TRACE_SHA256 = "d6dcf52173d3907bbdc9ca28b706bd3763a20405e23161c6022eb9358c3dee7b"
const GROUPS_SHA256 = "5803cb44ae9192e8788f12fb3d1e8cf4df4a0d114d962da0c8b8ad739bdced6d"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
