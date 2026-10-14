import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u794b","sourceProofFile":"engine-whole-u794b.json","sourceProofFileSha256":"c76ef65ad09a94d43bd2b374ed1f707c751921f8d1bd009ab916d36b0b67223e","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"c76ef65ad09a94d43bd2b374ed1f707c751921f8d1bd009ab916d36b0b67223e"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4,5],[6],[7,8],[9,10],[11]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),"8f23f42eecfc8495481dfbd4fb7a7049c053a5bf2acd12a1210e048fd8bd14e1",'Original source metadata is pinned')
 assert.equal(sha(readFileSync(new URL('metadata.json',import.meta.url))),"26892c71fc65a1e5d84caf96a97b07facf636afbe20e7e5ae26319fbaba70b83",'Catalogue and dictionary metadata are pinned')
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"a830def644f1cd08a6e1c1cd46f492e59ac68466e91912ffc3e716612f64d641",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"d3124e282df10290d61f7beda99f03704f404c2126135bf9c24fd89ae2bbd83c")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof)
 const boundProof={...proof,sourceRoot:identity.sourceRoot,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSha256}
 const boundBefore=JSON.stringify(boundProof)
 const strokes=originalCompiler.compileProgressive(trace,boundProof,{"root":"u794b","file":"engine-whole-u794b.json","fileSHA256":"c76ef65ad09a94d43bd2b374ed1f707c751921f8d1bd009ab916d36b0b67223e"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(JSON.stringify(boundProof),boundBefore)
 assert.equal(sha(JSON.stringify(strokes)),"6fde7d99748d5abd5bce079c7f9c0bb5f9ddb355c00fd01b48983b50407ef716",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
