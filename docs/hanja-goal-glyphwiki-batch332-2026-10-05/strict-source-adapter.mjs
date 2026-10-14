import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { compileProgressive as compileOriginal, sourceGroups as originalSourceGroups } from './progressive.mjs'
export { renderProgressive } from './progressive.mjs'

const CONTRACT = {
  "batch": 332,
  "directory": "/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch332-2026-10-05",
  "glyph": "諪",
  "root": "u8aea-k",
  "identity": {
    "whole": "u8aea-k",
    "sourceFile": "./sources.json",
    "sourceSHA256": "3588ab806076ff1d0a992b65c58939c3a17c8786c37ac286f4e06938f73d1794",
    "headerFile": "./engine-proof.json",
    "headerSHA256": "bed70cc177390048b2bc38c98c737b6480143fa317b081d75c8e5a6d536b41e4",
    "traceFile": "./draw-trace.json",
    "traceSHA256": "9400cbc155069c2fde60d7b163fc9b00dfcd67f0ff28153c46ec24ffd34ade08",
    "metadataFile": "./metadata.json",
    "metadataSHA256": "0161eb1607c396ccd06a8d312f6d8cdd7327aca9b44fe85cb7a47755e79d51f1",
    "compilerFile": "./progressive.mjs",
    "compilerSHA256": "6ffcd234f9c27adfc2d1e873786683c82e3dd4976351179f542af3a01d2584a2"
  },
  "filePins": {
    "sources.json": "3588ab806076ff1d0a992b65c58939c3a17c8786c37ac286f4e06938f73d1794",
    "alternative-engine-proof.json": "6e2eb2b415e7ff2e833d2e4f3d8ea1a9b33d2d5ec259c8a32a33b67107e75f4a",
    "draw-trace.json": "9400cbc155069c2fde60d7b163fc9b00dfcd67f0ff28153c46ec24ffd34ade08",
    "engine-proof.json": "bed70cc177390048b2bc38c98c737b6480143fa317b081d75c8e5a6d536b41e4",
    "next-source-inventory.json": "da11a493cf35e0ae275d1bcadd8a42524e901633d84b638dad4165011048cf39",
    "alternative-inventory.json": "1d5413a41c5bcdd6f0bcc993fbfde79fdd68028d3c9fb2f3db6cffc5bebfa981",
    "serve-progressive.py": "82c6c0e880669d7c3844cfb2fb6a8fe3e0cfb998ab9e4d9cf33de5c8b55ad9c5",
    "next.json": "2293897af8b3b399b54805fd0615d78eb817dc2fef657082e9b69aa5a7e3f21a",
    "metadata.json": "0161eb1607c396ccd06a8d312f6d8cdd7327aca9b44fe85cb7a47755e79d51f1",
    "serve.py": "40129ec2b5284027da08b38bfbc0621e3b8738735455731266a98f2d19caea2e",
    "verify.mjs": "d364c1a65628efd0d1124dd198904c9175e70b8793324db1313fa5ee21fb3c26",
    "README.md": "ba56da44e62f7a0d341b9131cfde961fcbddf6a3bf56be06eece1755b7413aad",
    "progressive.mjs": "6ffcd234f9c27adfc2d1e873786683c82e3dd4976351179f542af3a01d2584a2",
    "findings.json": "b3956c2e66c89c260efcd9f1c1cd68dcf136cec64d68daacc45e37ddf91d907b",
    "validation.json": "b276d2775a2abc172c2b23ab08c3a6476e9ead8cbebef46a145aa896b93fa73d",
    "coverage.json": "95581dabb1a58aba5214275dc5003a40334f8f475cdc66ba52f5e40db0c6ecce",
    "alternative-source.json": "03bf323bdbdae67cbd3c7f0f0462e557bb82fbb51343b0444bad829b4cfc3cfa",
    "primitive-reveal.mjs": "2a94340dc1b209e6668adb3789cb7a67a285752fb71462637f260e2d8d71e642",
    "../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs": "a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"
  },
  "proofJSONSHA256": "611910870dc7fe8695c548133d532953ef59c57dd5d297200937abec0c4f5a42",
  "traceJSONSHA256": "bb06ca64f40078dfc50d41e1d2564125aa5b73598baba8d6673fe2d054cbd24a",
  "compiledJSONSHA256": "4696052d955dd58e568f09f5d9fa65e90e2194e165bed0153657bad7820ab2a7",
  "engineRevision": "49232bac0348fe815f4200d4116ab7917e0db47f",
  "engineHashes": {
    "2d.js": "dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942",
    "buhin.js": "6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456",
    "curve.js": "77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da",
    "kage.js": "c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78",
    "kagecd.js": "489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860",
    "kagedf.js": "e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847",
    "polygon.js": "f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2",
    "polygons.js": "111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"
  },
  "sourceGroups": [
    [
      0
    ],
    [
      1
    ],
    [
      2
    ],
    [
      3
    ],
    [
      4
    ],
    [
      5,
      6
    ],
    [
      7
    ],
    [
      8
    ],
    [
      9
    ],
    [
      10
    ],
    [
      11,
      12
    ],
    [
      13
    ],
    [
      14
    ],
    [
      15,
      16
    ],
    [
      17
    ],
    [
      18
    ]
  ],
  "sourceRecords": 6,
  "raw": 19,
  "draw": 20,
  "polygons": 33,
  "pens": 16,
  "masks": 16,
  "priorEvidence": {
    "file": "./validation.json",
    "sha256": "b276d2775a2abc172c2b23ab08c3a6476e9ead8cbebef46a145aa896b93fa73d",
    "field": "pinnedEngine.hashesChecked",
    "captured": {
      "files": 8,
      "hashesChecked": true,
      "sourceRecords": 6,
      "rawGroups": 19,
      "drawingPrimitives": 20,
      "Q": 3,
      "C": 0,
      "distinctWholeAlternativeRecords": 8,
      "alternativeOriginalHookChecked": true
    },
    "readmeSHA256": "ba56da44e62f7a0d341b9131cfde961fcbddf6a3bf56be06eece1755b7413aad",
    "reproductionNarrative": "Prior validation confirms 8 pinned engine hashes; README documents original reproduction. No current reproduction request."
  },
  "oldHoldStatus": "deferred-original-terminal-hook-outside-reveal-mask",
  "oldFailedPen": 16,
  "proofContainsTrace": false,
  "sourceVerificationRepeated": false,
  "runtimeExcluded": true
}
const sha = value => createHash('sha256').update(value).digest('hex')
const read = file => JSON.parse(readFileSync(new URL(file, import.meta.url), 'utf8'))
export const selectedSourceIdentity = Object.freeze(CONTRACT.identity)
export const sourceRoot = CONTRACT.root
export const sourceGroups = CONTRACT.sourceGroups
export const nativeApproval = false
export const runtimeApplied = false

function assertOriginalBytePins() {
  for (const [file, pin] of Object.entries(CONTRACT.filePins))
    assert.equal(sha(readFileSync(new URL(file, import.meta.url))), pin, 'Original byte pin changed: ' + file)
}
function assertIdentity(identity) {
  assert.deepEqual(identity, CONTRACT.identity, 'Explicit whole/file/header/trace/metadata/compiler identity is required')
}
export function buildSourceInput(identity) {
  assertIdentity(identity)
  assertOriginalBytePins()
  // The original four-key proof stays unchanged. Trace comes from its separately
  // captured original file; it is never inferred or appended to that proof.
  return { trace: read(CONTRACT.identity.traceFile), proof: read(CONTRACT.identity.headerFile) }
}
export function compileProgressive(trace, proof, identity) {
  assertIdentity(identity)
  assertOriginalBytePins()
  assert.deepEqual(Object.keys(proof).sort(), ['defaults', 'engineHashes', 'engineRevision', 'groups'])
  assert.equal(sha(JSON.stringify(proof)), CONTRACT.proofJSONSHA256, 'Exact original four-key proof required')
  assert.equal(sha(JSON.stringify(trace)), CONTRACT.traceJSONSHA256, 'Exact separately captured trace required')
  assert.equal(proof.engineRevision, CONTRACT.engineRevision)
  assert.deepEqual(proof.engineHashes, CONTRACT.engineHashes)
  assert.deepEqual(originalSourceGroups, CONTRACT.sourceGroups)
  const source = read(CONTRACT.identity.sourceFile)
  const metadata = read(CONTRACT.identity.metadataFile)
  assert.equal(source.root, CONTRACT.root)
  assert.equal(metadata.root, CONTRACT.root)
  assert.equal(source.glyph, CONTRACT.glyph)
  assert.equal(metadata.glyph, CONTRACT.glyph)
  assert.equal(trace.length, proof.groups.length)
  trace.forEach((calls, i) => assert.deepEqual(calls.flatMap(call => call.polygons), proof.groups[i].polygons))
  const traceBefore = JSON.stringify(trace), proofBefore = JSON.stringify(proof)
  const result = compileOriginal(trace, proof)
  assert.equal(JSON.stringify(trace), traceBefore)
  assert.equal(JSON.stringify(proof), proofBefore)
  assert.equal(sha(JSON.stringify(result)), CONTRACT.compiledJSONSHA256, 'Original compiler output must remain exact')
  return result
}
export function compileSourceWhole(whole, trace, proof, identity) {
  assert.equal(whole, CONTRACT.root, 'Only the captured primary whole is supported')
  return compileProgressive(trace, proof, identity)
}

