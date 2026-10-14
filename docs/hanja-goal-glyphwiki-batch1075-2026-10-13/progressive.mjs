import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "catalogue15-versus-domestic16-count-conflict"
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

export const sourceRoot = "u64c4"
export const sourceProofFile = "./engine-whole-u64c4.json"
export const sourceProofFileSha256 = "2dc692feba8d5a77617efd6ddc33635ee2dbb124efcc736bd08eb4ad07c6ffba"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "dfd81ac5591f597410986812184eb19c0a1988c4798cdb5188edb2611f388eec"
export const sourceMetadataFile = "./sources.json"
export const sourceMetadataFileSha256 = "ea5240d8bc3b5a649e85c543c72d1901862e2757649d01822f8cdd8e591f572b"
export const selectedProofIdentity = {"sourceRoot":"u64c4","sourceProofFile":"./engine-whole-u64c4.json","sourceProofFileSha256":"2dc692feba8d5a77617efd6ddc33635ee2dbb124efcc736bd08eb4ad07c6ffba","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"dfd81ac5591f597410986812184eb19c0a1988c4798cdb5188edb2611f388eec","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ea5240d8bc3b5a649e85c543c72d1901862e2757649d01822f8cdd8e591f572b"}
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u64c4","sourceProofFile":"./engine-whole-u64c4.json","sourceProofFileSha256":"2dc692feba8d5a77617efd6ddc33635ee2dbb124efcc736bd08eb4ad07c6ffba","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"dfd81ac5591f597410986812184eb19c0a1988c4798cdb5188edb2611f388eec","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ea5240d8bc3b5a649e85c543c72d1901862e2757649d01822f8cdd8e591f572b"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "4d843c54cca5e69870a822c5fa9553eb2a38eeb7afb87bc9563e5f5a7539472e"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = []
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 19
const ORIGINAL = [[{"kind":"cdDrawLine","args":[15.625,55,70,55,0,100]}],[{"kind":"cdDrawLine","args":[42.5,15,42.5,171,0,1]},{"kind":"cdDrawCurve","args":[42.5,171,42.5,181,32.5,181,1,314]}],[{"kind":"cdDrawCurve","args":[16.25,122,44.375,107,70,91,0,7]}],[{"kind":"cdDrawLine","args":[122.2,13,122.2,46,0,32]}],[{"kind":"cdDrawLine","args":[122.2,28,170.5,28,2,100]}],[{"kind":"cdDrawLine","args":[79.5,46,79.5,111,12,1]},{"kind":"cdDrawCurve","args":[79.5,111,79.5,163,63.4,185,1,7]}],[{"kind":"cdDrawLine","args":[79.5,46,178.2,46,2,2]}],[{"kind":"cdDrawCurve","args":[178.2,46,173.3,56,166.3,68,22,7]}],[{"kind":"cdDrawLine","args":[86.5,72,162.1,63,0,0]}],[{"kind":"cdDrawLine","args":[118,48,118,75,0,1]},{"kind":"cdDrawCurve","args":[118,75,118,85,128,85,1,3001]},{"kind":"cdDrawLine","args":[128,85,174,85,3006,5]}],[{"kind":"cdDrawLine","args":[108.2,98,108.2,133,12,213]}],[{"kind":"cdDrawLine","args":[108.2,98,161.4,98,2,2]}],[{"kind":"cdDrawLine","args":[161.4,98,161.4,133,22,223]}],[{"kind":"cdDrawLine","args":[89.3,116,184.5,116,0,200]}],[{"kind":"cdDrawLine","args":[134.8,98,134.8,133,32,32]}],[{"kind":"cdDrawLine","args":[108.2,133,161.4,133,2,2]}],[{"kind":"cdDrawLine","args":[89.825,152.8,167.7875,152.8,0,2]}],[{"kind":"cdDrawCurve","args":[167.7875,152.8,167.20999999999998,173.2,162.37921231398045,176.25504359590167,22,0]},{"kind":"cdDrawCurve","args":[162.37921231398045,176.25504359590167,153.9275,181.6,143.9275,181.6,2,14]}],[{"kind":"cdDrawCurve","args":[135.4475,136.6,127.3625,176.8,83.4725,185.8,0,7]}]]
const TRACE_SHA256 = "554169153c3584faa8aeab908537e788d457b8c94f22308e834c170cead91705"
const GROUPS_SHA256 = "ef4b6d06fccb1bae59814a27dcdd287ad91385bfc1735946e439bcf09fc99fb9"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
