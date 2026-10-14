import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u7a0c","sourceProofFile":"engine-whole-u7a0c.json","sourceProofFileSha256":"20b9fa6a30bac0f12f548d96c2dfb57cb979f6fdd6f3df4c3b165a5651eed1a5","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"20b9fa6a30bac0f12f548d96c2dfb57cb979f6fdd6f3df4c3b165a5651eed1a5"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[11],[10]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),"f4845cf44ff0fa9e3db1e7db72c296103b1660ca569d4e54fd46e2c325f100ad",'Original source metadata is pinned')
 assert.equal(sha(readFileSync(new URL('metadata.json',import.meta.url))),"50a8163de1b9e38bec4f0ceedf6a4a944373d63ee409c71202452fe9206c2bad",'Catalogue and dictionary metadata are pinned')
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"323729b8b6e718c7b6137d572b794617a2fcb2ed6f5298d5fe41e81e93e3be8c",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"3f6d54602f35cb47cc559823bf25a80fb36953b0de5748fca7729bf69b3b90c6")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof)
 const boundProof={...proof,sourceRoot:identity.sourceRoot,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSha256}
 const boundBefore=JSON.stringify(boundProof)
 const strokes=originalCompiler.compileProgressive(trace,boundProof,{"root":"u7a0c","file":"engine-whole-u7a0c.json","fileSHA256":"20b9fa6a30bac0f12f548d96c2dfb57cb979f6fdd6f3df4c3b165a5651eed1a5"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(JSON.stringify(boundProof),boundBefore)
 assert.equal(sha(JSON.stringify(strokes)),"a98002f7844ab25727aff9e24ef9f36883d6622203974ddb7014ad5cd81c4a65",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
