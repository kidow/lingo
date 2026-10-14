import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { compileProgressive as compileOriginal, sourceGroups as originalSourceGroups } from './progressive.mjs'
export { renderProgressive } from './progressive.mjs'

const CONTRACT = {
  "batch": 329,
  "directory": "/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch329-2026-10-05",
  "glyph": "蕙",
  "root": "u8559-k",
  "identity": {
    "whole": "u8559-k",
    "sourceFile": "./sources.json",
    "sourceSHA256": "2e281c8023e63c21d0fee8f37312d0f32fcfa99d7e0446f4e39ca5bbd7dcbadc",
    "headerFile": "./engine-proof.json",
    "headerSHA256": "c67ae009d30d805a20a0a0d41884bcaa0afb8d226ce407792ce2131e665d17bc",
    "traceFile": "./draw-trace.json",
    "traceSHA256": "227bd558f35d8bf7810e3c94b542ab9084ed567174603f504e95ae7c88cdb9ef",
    "metadataFile": "./metadata.json",
    "metadataSHA256": "42bd1d223b9245b56d0e44fda6084b656c7586d714c4c6932f2187efcb5eea83",
    "compilerFile": "./progressive.mjs",
    "compilerSHA256": "53e8d504a8ec4c2e38640f9e1f12dbc3656163d78775fc2426dfbc9c011331dd"
  },
  "filePins": {
    "sources.json": "2e281c8023e63c21d0fee8f37312d0f32fcfa99d7e0446f4e39ca5bbd7dcbadc",
    "draw-trace.json": "227bd558f35d8bf7810e3c94b542ab9084ed567174603f504e95ae7c88cdb9ef",
    "engine-proof.json": "c67ae009d30d805a20a0a0d41884bcaa0afb8d226ce407792ce2131e665d17bc",
    "next-source-inventory.json": "edd52374c3bb96f1ca3c9eae531eebf4ef594f8bf0315b2ed9130e662e0b916b",
    "alternative-inventory.json": "2956f71e4386553020a38f4a37d703be0f544e96c092a816d8fdd9e0621fc730",
    "serve-progressive.py": "d9644d0adc4b67bc5aba125b90c9ed7790c59811c8aa8eaa70e72ef22187ea47",
    "next.json": "1660f844e514c0c051bcc76b30a417d8ecddcd72937585274185558dc8ad667e",
    "metadata.json": "42bd1d223b9245b56d0e44fda6084b656c7586d714c4c6932f2187efcb5eea83",
    "serve.py": "634e101f340dfaa06b745ed87d0f0b13e7bc00398997b2af96a6bee2bece3f06",
    "verify.mjs": "a4a98ffd8ff806bc56415c6819facd663e3d029a97cad78fede29b262b778d4b",
    "README.md": "eaebe9b98c63a83eeb5f5302f7af419e163f6c1f0cab6a9db18751a402db99c7",
    "progressive.mjs": "53e8d504a8ec4c2e38640f9e1f12dbc3656163d78775fc2426dfbc9c011331dd",
    "findings.json": "6bc2bc3edb55e105c8ff172d52fc09e99ead6bdff8fac686095b4126ec00e4e1",
    "validation.json": "bcbea0108665908e0d0fabc1c1f2f05e1547dcd3999994b21f1cb4a7ddd36a45",
    "coverage.json": "fbf1223d800efe3c96a8015a6b3cebc43bffa147fa38dcac6744d442e2a416b4",
    "primitive-reveal.mjs": "92cb193df1e45a3fef48221f124c1459e3a0139692cdc69b83dced16c8d5a828",
    "../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs": "a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"
  },
  "proofJSONSHA256": "f240d562a4bb8532c21a3f5b753eccf1c691e65beb014f4440c570505d1a2a70",
  "traceJSONSHA256": "d74a683e3264431cb80b27f587fda4f441c5e00abc4576510c748ca3d3f8e97b",
  "compiledJSONSHA256": "60cb9437650a897bc3bb982a4623815bad24cfd946015703953bfbceb517d7d4",
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
      3
    ],
    [
      2
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
      13
    ],
    [
      14
    ],
    [
      15
    ],
    [
      16
    ]
  ],
  "sourceRecords": 7,
  "raw": 17,
  "draw": 19,
  "polygons": 37,
  "pens": 16,
  "masks": 16,
  "priorEvidence": {
    "file": "./validation.json",
    "sha256": "bcbea0108665908e0d0fabc1c1f2f05e1547dcd3999994b21f1cb4a7ddd36a45",
    "field": "pinnedEngine.hashesChecked",
    "captured": {
      "files": 8,
      "hashesChecked": true,
      "sourceRecords": 7,
      "rawGroups": 17,
      "drawingPrimitives": 19,
      "Q": 6,
      "C": 0
    },
    "readmeSHA256": "eaebe9b98c63a83eeb5f5302f7af419e163f6c1f0cab6a9db18751a402db99c7",
    "reproductionNarrative": "Stored validation declares 8 engine hashesChecked=true and README describes reproduction. These declarations do not establish an observed original engine-byte reproduction execution; local researchVerification output is not a network/source execution proof.",
    "evidenceStrength": "declaration-only",
    "originalEngineBytesAvailable": false,
    "originalExecutionTranscriptAvailable": false,
    "liveReproductionCacheAvailable": false,
    "establishesActualEngineReproductionPass": false
  },
  "oldHoldStatus": "deferred-original-terminal-hook-outside-reveal-mask",
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
export const sourceExecutionClaim = 'declaration-only'
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

