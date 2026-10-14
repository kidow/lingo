import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { compileProgressive as compileOriginal, sourceGroups as originalSourceGroups } from './progressive.mjs'
export { renderProgressive } from './progressive.mjs'

const CONTRACT = {
  "batch": 321,
  "directory": "/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch321-2026-10-05",
  "glyph": "暻",
  "root": "u66bb-k",
  "identity": {
    "whole": "u66bb-k",
    "sourceFile": "./sources.json",
    "sourceSHA256": "7c0328784eb967be311c8a05069950b06ce2a6153717f23e6f245b47e9ab8542",
    "headerFile": "./engine-proof.json",
    "headerSHA256": "92dbd2f888bbeae30b363ce1e85f7917ba5f32aaf5e5284883a81aac5227709f",
    "traceFile": "./draw-trace.json",
    "traceSHA256": "fbf55579c8d0dd78eee0e989fdaf6038da35005fb21d6b4490d3e6d630375813",
    "metadataFile": "./metadata.json",
    "metadataSHA256": "b9c9acc4f4cf51ce62c8f9704a6048d5eddbc282a0a7189411266b06817fe668",
    "compilerFile": "./progressive.mjs",
    "compilerSHA256": "0ebd6f53cc44504a6d42a11b9034fbc46f8d90be62763c47d67b1bde9d89c29d"
  },
  "filePins": {
    "sources.json": "7c0328784eb967be311c8a05069950b06ce2a6153717f23e6f245b47e9ab8542",
    "draw-trace.json": "fbf55579c8d0dd78eee0e989fdaf6038da35005fb21d6b4490d3e6d630375813",
    "engine-proof.json": "92dbd2f888bbeae30b363ce1e85f7917ba5f32aaf5e5284883a81aac5227709f",
    "next-source-inventory.json": "154a13399fe248232a151da89a34de69f486bb32a16aab326dcdf22d83af2393",
    "alternative-inventory.json": "ff1931879a7026f10af98aa67a5aedd2d6073355992e70f8a9db61c6ee75be3f",
    "serve-progressive.py": "b919a9ac903366b38bb132a270eff9cfa95691ffa4073f65d1d767cbd8289426",
    "next.json": "0737a4e6ebe5ea74ecc2af05972613809b3a0a6cc42163de3520afa54c8dffe9",
    "metadata.json": "b9c9acc4f4cf51ce62c8f9704a6048d5eddbc282a0a7189411266b06817fe668",
    "serve.py": "ec4eb01afbe24179c7a3f34cc90049b596b70b7086214f249799932644f9a70d",
    "verify.mjs": "7bff27192418db499d983ad5a05a203acf1f1dfa0948157425309bf8d9e1f9bf",
    "README.md": "e53904381247c8904e53c95971fee5f6b31236e5a912cdd21f44daa7d0ec9ddf",
    "progressive.mjs": "0ebd6f53cc44504a6d42a11b9034fbc46f8d90be62763c47d67b1bde9d89c29d",
    "findings.json": "9767cc99f7354279db3f671f921af0c9399d2ff19e679d09767c95e75aeeae94",
    "validation.json": "88ebe83c40de42c719b45183b18ae741f618c312ddfea85be1ce76adf1abf0da",
    "coverage.json": "821edc08810ab12f2d38631693b6870a1ba20a24566ff5cb36b805f803de023f",
    "primitive-reveal.mjs": "5c764237e05cff01f8fdc9e9ac66a5a2a613c02326452f7833125446215e8063",
    "NOTICE.md": "19599d6d7182649dd75266229ba3c81b2787e4e6ffa8fa7b2f28bb149057ba64",
    "../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs": "a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"
  },
  "proofJSONSHA256": "a0024bccad8d7f26ba0cb473991b03820b27d5ed7232c3a6953b71b1634dec5b",
  "traceJSONSHA256": "e3374b05e14d57de36a5bc0a4c96d49c11c3b8c7e9d6f4ed4b682cef450999c4",
  "compiledJSONSHA256": "357eeb2ecfcf396ef81338d8773380c821f6c415359089dba29ab5dda2e9a7bc",
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
      1,
      2
    ],
    [
      3
    ],
    [
      4
    ],
    [
      5
    ],
    [
      6,
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
      11
    ],
    [
      12
    ],
    [
      13,
      14
    ],
    [
      15
    ],
    [
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
  "polygons": 29,
  "pens": 16,
  "masks": 16,
  "priorEvidence": {
    "file": "./validation.json",
    "sha256": "88ebe83c40de42c719b45183b18ae741f618c312ddfea85be1ce76adf1abf0da",
    "field": "pinnedEngine.stdout(engineChecked=true)",
    "captured": {
      "passed": true,
      "deferred": true,
      "engineChecked": true,
      "rawGroups": 19,
      "drawingPrimitives": 20,
      "domesticPens": 16,
      "examinedFrames": 144,
      "failedTerminalHooks": [
        14
      ],
      "runtimeRegistered": 0,
      "privateMediaSaved": false
    },
    "readmeSHA256": "e53904381247c8904e53c95971fee5f6b31236e5a912cdd21f44daa7d0ec9ddf",
    "reproductionNarrative": "Stored validation.pinnedEngine.stdout declares engineChecked=true; verify.mjs contains a --engine byte-hash/reproduction branch. The original execution transcript, original engine bytes and a live reproduction cache were not available in this preparation. Treat historical execution as unknown.",
    "evidenceStrength": "stored-verifier-output-claim-without-independent-execution-evidence",
    "originalEngineBytesAvailable": false,
    "originalExecutionTranscriptAvailable": false,
    "liveReproductionCacheAvailable": false,
    "establishesActualEngineReproductionPass": false
  },
  "oldHoldStatus": "deferred-terminal-hook-reveal",
  "oldFailedPen": 14,
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
export const sourcePassed = null
export const sourceExecutionClaim = 'unknown'
export const sourceEngineReplayKnown = false
export const diagnosticOnly = true
export const activePens = 0

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

