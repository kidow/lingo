import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u9277","sourceProofFile":"engine-whole-u9277.json","sourceProofFileSha256":"0feb012f656ee1c69cf0fa4adde2e1121e4737517cc0ead38d526eebb0ab7186","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"0feb012f656ee1c69cf0fa4adde2e1121e4737517cc0ead38d526eebb0ab7186"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"3de3ca711835bacc6fe3d2c1f9f133d4f0acf1396848229e8524dd75d4602bce",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"8f4f4602572aa9ae80e3b6ba6db044475f52b2437ff90c0f2bc1e324d00769d3")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"root":"u9277","file":"engine-whole-u9277.json","fileSHA256":"0feb012f656ee1c69cf0fa4adde2e1121e4737517cc0ead38d526eebb0ab7186"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"c15bd2b02e93191e957bc7d6e3561b8034aaf32230e9d9d85d1f175b58aad3f5",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
