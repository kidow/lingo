import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u8b48","sourceProofFile":"engine-whole-u8b48.json","sourceProofFileSha256":"9f12d731a7bdb638a2f76da77deb276599715d3528787bdf3d32b66aec83eb30","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"9f12d731a7bdb638a2f76da77deb276599715d3528787bdf3d32b66aec83eb30"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11,12],[14],[13,15],[16],[17],[18],[19],[20],[21]].map(g=>Object.freeze(g)))
export const blockedReason="nonconsecutive-original-enclosure"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),"6bda4d11f55cc92f89d57c9d4a605ab83ec55e89bd03015c729fd6c0e9141341",'Original source metadata is pinned')
 assert.equal(sha(readFileSync(new URL('metadata.json',import.meta.url))),"5893022e767d7d591fc34fdd6e9319aa71ec9b45826483ef781f8ff7fcebf71c",'Catalogue and dictionary metadata are pinned')
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"31d3d892021001833f952c8fd0ef0eb41973613b2bbe58184bad298ba140838d",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"460e0643b3e30502835fb18c46d4bc234d9ced8ff77fddb56eca91696d946d0d")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
