import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u8585","sourceProofFile":"engine-whole-u8585.json","sourceProofFileSha256":"bd2560796015ef1a748818c32ffe7f93eb14e2fe3cde975c99aaa805fc26a04e","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"bd2560796015ef1a748818c32ffe7f93eb14e2fe3cde975c99aaa805fc26a04e"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"0fc8a2878b7ff76541ee89938ce5593c2c1f598568a2b2a21aa81beaee6dabb7",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"d19ef6368251e507bdde02828f1c396e7d6e2f27224ed8263492b388bb9b9706")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"root":"u8585","file":"engine-whole-u8585.json","fileSHA256":"bd2560796015ef1a748818c32ffe7f93eb14e2fe3cde975c99aaa805fc26a04e"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"650546d7b7de7b0c8672ac39a8025cca0e7df781fd420e2f09b2ec0d21ef3b48",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
