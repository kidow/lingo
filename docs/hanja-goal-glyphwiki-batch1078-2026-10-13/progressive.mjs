import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "catalogue12-versus-domestic11-count-conflict"
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

export const sourceRoot = "u83bd-ue0103"
export const sourceProofFile = "./engine-whole-u83bd-ue0103.json"
export const sourceProofFileSha256 = "402d515a6f99aa5e011cc4f00414d8d71618ccbae9fa6a24bd6aa0bb32fd5168"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "b3fc9b49f21b09fd557ac3093413d156fc88cc5d259e9c0bea1e54258398cad7"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "170552ad7ba4e558962667ffc6fbcf0962c12496a9ab208a6e03d0845646a78a"
export const selectedProofIdentity = {"sourceRoot":"u83bd-ue0103","sourceProofFile":"./engine-whole-u83bd-ue0103.json","sourceProofFileSha256":"402d515a6f99aa5e011cc4f00414d8d71618ccbae9fa6a24bd6aa0bb32fd5168","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"b3fc9b49f21b09fd557ac3093413d156fc88cc5d259e9c0bea1e54258398cad7","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"170552ad7ba4e558962667ffc6fbcf0962c12496a9ab208a6e03d0845646a78a"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u83bd-ue0103","sourceProofFile":"./engine-whole-u83bd-ue0103.json","sourceProofFileSha256":"402d515a6f99aa5e011cc4f00414d8d71618ccbae9fa6a24bd6aa0bb32fd5168","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"b3fc9b49f21b09fd557ac3093413d156fc88cc5d259e9c0bea1e54258398cad7","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"170552ad7ba4e558962667ffc6fbcf0962c12496a9ab208a6e03d0845646a78a"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "f6dd5f20528bf18f1bfea54fc940fa1ad2bb3e5d70042f71d54d86a9225fcdba"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 12
const ORIGINAL = [[{"kind":"cdDrawLine","args":[19.895,39.76,94.01,39.76,0,100]}],[{"kind":"cdDrawLine","args":[66.56,17.92,66.56,60.76,0,300]}],[{"kind":"cdDrawLine","args":[132.44,17.92,132.44,60.76,0,300]}],[{"kind":"cdDrawLine","args":[104.99,39.76,179.105,39.76,0,0]}],[{"kind":"cdDrawLine","args":[102,145,177,145,0,0]}],[{"kind":"cdDrawLine","args":[71,116,71,141,0,1]},{"kind":"cdDrawCurve","args":[71,141,72,176,31,188,1,7]}],[{"kind":"cdDrawLine","args":[129,119,129,184,0,0]}],[{"kind":"cdDrawCurve","args":[24,160,58,148,99,135,0,7]}],[{"kind":"cdDrawLine","args":[16.4327,86.7459,184.5573,86.7459,0,0]}],[{"kind":"cdDrawCurve","args":[100.495,62.4426,83.06745000000001,107.57730000000001,12.3321,138.82440000000003,0,7]}],[{"kind":"cdDrawCurve","args":[112.7968,86.7459,141.50099999999998,116.25704999999999,182.50699999999998,133.61655000000002,7,0]}],[{"kind":"cdDrawCurve","args":[116.15,61.595,135.34,67.3,147.46,79.525,7,8]}]]
const TRACE_SHA256 = "7cb259c451ff67d72313ca0dcb8f7e8359654d2d28dd448047cee70c5ab0ca3f"
const GROUPS_SHA256 = "22064c06c7c4a0459a90a50c540522010d0442b073d129aee05d258e839e6bbf"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
