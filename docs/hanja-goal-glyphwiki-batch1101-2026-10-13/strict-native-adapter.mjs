import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u54b7","sourceProofFile":"engine-whole-u54b7.json","sourceProofFileSha256":"5838467e596ba3b35196ec52f5c7bebe2a0f7f13d847f10d2d1ea70c3cb244d9","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"5838467e596ba3b35196ec52f5c7bebe2a0f7f13d847f10d2d1ea70c3cb244d9"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1,2],[3],[4],[5],[6],[7],[8],[9]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),"ad375e4dfebd69e969661e21f923dce260af90ddf2d2ed009c9cae4a4ef34025",'Original source metadata is pinned')
 assert.equal(sha(readFileSync(new URL('metadata.json',import.meta.url))),"294e86ac736f613d1348e6fe3cc2d8e40901057b2285e79f34577ee79e34b6dc",'Catalogue and dictionary metadata are pinned')
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"2d0092b8e4d599450fb1e15d58ba75b3bea1389bd8758fd10ee147e57436ee1c",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"2d988a62c6b1905d51cf6220f97ff7597cf236db53f009bbd9313fd2ba6efd7f")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof)
 const boundProof={...proof,sourceRoot:identity.sourceRoot,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSha256}
 const boundBefore=JSON.stringify(boundProof)
 const strokes=originalCompiler.compileProgressive(trace,boundProof,{"root":"u54b7","file":"engine-whole-u54b7.json","fileSHA256":"5838467e596ba3b35196ec52f5c7bebe2a0f7f13d847f10d2d1ea70c3cb244d9"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(JSON.stringify(boundProof),boundBefore)
 assert.equal(sha(JSON.stringify(strokes)),"7d36dc94e5e33fcdb58a410fdac6a5ab201a986e89c25489a2aed39981a13e53",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
