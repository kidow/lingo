import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u8910","sourceProofFile":"engine-whole-u8910.json","sourceProofFileSha256":"85ddd6f69ddbfb17ed875a7bc31282f9a3f7fe37195e05517c1a6639ead30d48","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"85ddd6f69ddbfb17ed875a7bc31282f9a3f7fe37195e05517c1a6639ead30d48"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1,2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12,13],[14],[15]].map(g=>Object.freeze(g)))
export const blockedReason="catalog14-domestic13-conflict-original13-candidate-is-not-runtime-eligible"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),"0908302beaad57284aa7bff938ef9a41412fed7a1c62a589cb28b10c0b92559a",'Original source metadata is pinned')
 assert.equal(sha(readFileSync(new URL('metadata.json',import.meta.url))),"7fcff216b434075e2dae887a93d624209985ec465ef825c1b57217680db22674",'Catalogue and dictionary metadata are pinned')
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"71f70ee11cd3e09ca1ec36926ee7a060f1b2f2dc9decef653f9f96b9a4441058",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"f2a4373fdfcd4a3031358664b7376745129fda8148bba0f9cb0d1c2d21f0211f")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert.throws(()=>originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u8910","sourceProofFile":"engine-whole-u8910.json","sourceProofFileSHA256":"85ddd6f69ddbfb17ed875a7bc31282f9a3f7fe37195e05517c1a6639ead30d48"}),e=>e.message===blockedReason)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
