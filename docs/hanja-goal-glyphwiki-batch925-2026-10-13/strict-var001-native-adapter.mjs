import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const CONTRACT={
  "batch": 925,
  "glyph": "遆",
  "catalogStrokes": 13,
  "selectedWhole": "u9046-var-001",
  "selectedProof": "engine-whole-u9046-var-001.json",
  "adapter": "strict-var001-native-adapter.mjs",
  "compiler": "progressive.mjs",
  "dictionary": {
    "url": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9046.svg",
    "status": 200,
    "bytes": 6498,
    "sha256": "a208a6dc876a22e6a18f674a5d95c6995d0585f3101c2e12cb6ca1c9397acad5",
    "clips": 13,
    "glyph": "遆",
    "privateMediaSaved": false
  },
  "identity": {
    "sourceRoot": "u9046-var-001",
    "sourceProofFile": "engine-whole-u9046-var-001.json",
    "sourceProofFileSHA256": "1ec1cf99c0b07bff2ce0dbfaa53e20eff3cf3a6d04d27d265324c6f33fe12168",
    "sourceHeaderFile": "engine-proof.json",
    "sourceHeaderFileSHA256": "86382f11953e50bb90ac2761136c8e35515df6811d6ad724917a6406a3b925aa"
  },
  "originalFileIdentity": {
    "root": "u9046-var-001",
    "file": "engine-whole-u9046-var-001.json",
    "fileSHA256": "1ec1cf99c0b07bff2ce0dbfaa53e20eff3cf3a6d04d27d265324c6f33fe12168"
  },
  "inputSHA256": {
    "sources.json": "7066884b7434f042e69aa736f115491fe8c80a10e74b0ebb4174dd5edab60b93",
    "metadata.json": "152ba31db8462ca41c55f6e983ef448061b3d920df74195129c594a0a13e2b09",
    "engine-proof.json": "86382f11953e50bb90ac2761136c8e35515df6811d6ad724917a6406a3b925aa",
    "progressive.mjs": "77f3da4814dcdc3ba09bd913973be3f849bedc737a973d10eecf2ca38078e14c",
    "engine-whole-u9046-g.json": "422f0241f3258bae0ede99f352491a433ac76644a43755893de16653c3aa39c9",
    "engine-whole-u9046-jv.json": "ebcdb2010250a4e5feda8cd7564c3d16c5d72e3cc962b93e63b0df112b24a002",
    "engine-whole-u9046-t.json": "ab1d448b10d9b196b9bedb65a97e219d59b2fefd954c107267dba397e9d9fde1",
    "engine-whole-u9046-var-001.json": "1ec1cf99c0b07bff2ce0dbfaa53e20eff3cf3a6d04d27d265324c6f33fe12168",
    "engine-whole-u9046-var-002.json": "3951f0f2af75f7dd959101a10ff02865cfa30406bf9f4257acde01b569e9203f",
    "engine-whole-u9046.json": "ebcdb2010250a4e5feda8cd7564c3d16c5d72e3cc962b93e63b0df112b24a002"
  },
  "fullProofSHA256": "65a599a2bfedaa42e2e93ba7e01b643a8675472f4a7bfb39cfd7a6283ef16beb",
  "compiledSHA256": "a8ba2585f67d65da5c03e17699ea168670ad3ee631e21eb0b078c6ab7942dd6b",
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
      10,
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
    ]
  ],
  "sourceOrder": "Original 辶4 pens then 帝9 pens retained; domestic order unapproved and expected to need native whole-pen permutation.",
  "sourceVerificationReused": {
    "file": "strict-native-server-preflight.json",
    "executedRecorded": true,
    "runsRecorded": 1,
    "sourcePassedRecorded": true,
    "engineFilesVerifiedRecorded": 8,
    "currentSourceEngineReplayExecuted": false
  },
  "parentReportedWholeCompatibility": true,
  "parentReportedDirectionsApproved": false,
  "nativeApproval": false,
  "runtimeApplied": false
}
const sha=b=>createHash('sha256').update(b).digest('hex')
export const selectedProofIdentity=Object.freeze(CONTRACT.identity)
export const sourceRoot=CONTRACT.selectedWhole
export const sourceGroups=Object.freeze(CONTRACT.sourceGroups.map(g=>Object.freeze(g)))
export const nativeApproval=false
export const runtimeApplied=false
export const domesticOrderApproved=false
export const diagnosticOnly=true
export function buildSourceProof(identity){
 assert.deepEqual(identity,selectedProofIdentity)
 for(const[f,h]of Object.entries(CONTRACT.inputSHA256))assert.equal(sha(readFileSync(new URL(f,import.meta.url))),h,'Unchanged original file '+f)
 const body=JSON.parse(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),header=JSON.parse(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url)))
 return {engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body,sourceRoot,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSHA256}
}
export function compileSourceWhole(root,trace,proof,identity){
 assert.equal(root,sourceRoot);assert.deepEqual(identity,selectedProofIdentity)
 assert.deepEqual(proof,buildSourceProof(identity),'Exact original var001 body and explicit original header/root/file bridge')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','sourceProofFile','sourceProofFileSHA256','sourceRoot','trace'])
 assert.deepEqual(trace,proof.trace);assert.equal(sha(JSON.stringify(proof)),CONTRACT.fullProofSHA256)
 const before=JSON.stringify(proof)
 const strokes=original.compileSourceWhole(root,trace,proof,CONTRACT.originalFileIdentity)
 assert.equal(JSON.stringify(proof),before);assert.equal(sha(JSON.stringify(strokes)),CONTRACT.compiledSHA256)
 assert.equal(strokes.length,13);assert.equal(strokes.flat().length,14)
 return strokes
}
export function compileProgressive(trace,proof,identity){return compileSourceWhole(sourceRoot,trace,proof,identity)}

