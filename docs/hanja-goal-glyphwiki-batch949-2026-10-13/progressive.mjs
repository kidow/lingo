import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export const blockedReason = "minimum-original-pens-15-exceeds-catalog-13"
export function compileProgressive(trace, proof, identity) {
  validateSelectedProof(trace, proof, identity)
  throw new Error(blockedReason)
}

export function compileSourceWhole(root,trace,proof,identity){assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity);}

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

export const sourceRoot = "u7d7a"
export const sourceProofFile = "./engine-whole-u7d7a.json"
export const sourceProofFileSha256 = "611e55e39e0ece888384112c74ccf7575534e31a5340789b01b333bac1ef112f"
export const sourceHeaderFile = "./engine-proof.json"
export const sourceHeaderFileSha256 = "8ca5792ecff90e6324438b4fdaa6d64cb038762bd4f0b62a79948ce95d9966a6"
export const selectedProofIdentity = Object.freeze({"sourceRoot":"u7d7a","sourceProofFile":"./engine-whole-u7d7a.json","sourceProofFileSha256":"611e55e39e0ece888384112c74ccf7575534e31a5340789b01b333bac1ef112f","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"8ca5792ecff90e6324438b4fdaa6d64cb038762bd4f0b62a79948ce95d9966a6"})
const SELECTED_PROOF_IDENTITY = {"sourceRoot":"u7d7a","sourceProofFile":"./engine-whole-u7d7a.json","sourceProofFileSha256":"611e55e39e0ece888384112c74ccf7575534e31a5340789b01b333bac1ef112f","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"8ca5792ecff90e6324438b4fdaa6d64cb038762bd4f0b62a79948ce95d9966a6"}
const ORIGINAL_PROOF_KEYS = ["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256 = "48e1f7b44d0d008a38f38c3f1df90526298869a8f22e68108ab74b12a18fc552"
const FULL_SOURCE_HEADER = {"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups = Object.freeze([])
const ORIGINAL_SOURCE_GROUPS = []
const RAW_COUNT = 16
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[51.51,16,41.22,37,28.725,56,0,7]}],[{"kind":"cdDrawCurve","args":[13.29,45,30.93,56,38.28,76,7,8]}],[{"kind":"cdDrawCurve","args":[72.825,39,52.245,76,27.99,110,0,7]}],[{"kind":"cdDrawCurve","args":[14.76,113,45.63,109,72.825,101,0,7]}],[{"kind":"cdDrawCurve","args":[57.39,78,71.355,91,77.235,114,7,8]}],[{"kind":"cdDrawLine","args":[48.57,109,48.57,186,32,0]}],[{"kind":"cdDrawCurve","args":[30.93,127,27.99,155,13.29,180,0,7]}],[{"kind":"cdDrawCurve","args":[58.125,122,71.355,136,76.5,161,7,8]}],[{"kind":"cdDrawCurve","args":[162.875,19,141.275,42,87.275,66,0,7]}],[{"kind":"cdDrawCurve","args":[98.075,19,142.625,41,165.575,63,7,8]}],[{"kind":"cdDrawLine","args":[75.125,82,187.85,82,0,0]}],[{"kind":"cdDrawCurve","args":[124.4,62,110.9,108,75.8,144,0,7]}],[{"kind":"cdDrawLine","args":[135.2,90,135.2,185,0,0]}],[{"kind":"cdDrawLine","args":[104.15,115,104.15,172,32,0]}],[{"kind":"cdDrawLine","args":[104.15,115,168.95,115,2,2]}],[{"kind":"cdDrawLine","args":[168.95,115,168.95,158,22,1]},{"kind":"cdDrawCurve","args":[168.95,158,168.95,168,158.95,168,1,514]}]]
const TRACE_SHA256 = "a7745892ebc15a776e47a15001564c3ffa37bfacda97462a94d71db69a4b8bda"
const GROUPS_SHA256 = "8eb78b736913df2bd4ad50b258d26847774ab6efb0d6ef208f2e99b4ab848d66"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
export const approvalStatus = "blocked-original-source"
export const nativeApproved = false
export const runtimeApplied = false
