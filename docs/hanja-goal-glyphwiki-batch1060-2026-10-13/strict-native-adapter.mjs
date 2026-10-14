import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u994e-ue0102","sourceProofFile":"engine-whole-u994e-ue0102.json","sourceProofFileSha256":"a6b0c3023e458da1d201adc2ee77fa5275833a104a04c86de135c56bc6187564","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"37d61bf1a14a69bd15dcb20be12cac520cd7f1d4f07502b4e8154c74f428779f"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20],[21,22],[23]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"9fb74e6203d41ce7430256100edd5b6116cdefa093012dd57235aa2c06ab5e47",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"44fde6cd8acb7161feaf999e7c9b492b9bb469b4604fe83cd293455fb93e029b")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof)
 const boundProof={...proof,sourceRoot:identity.sourceRoot,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSha256}
 const boundBefore=JSON.stringify(boundProof)
 const strokes=originalCompiler.compileProgressive(trace,boundProof,{"root":"u994e-ue0102","file":"engine-whole-u994e-ue0102.json","fileSHA256":"a6b0c3023e458da1d201adc2ee77fa5275833a104a04c86de135c56bc6187564"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(JSON.stringify(boundProof),boundBefore)
 assert.equal(sha(JSON.stringify(strokes)),"72ded0596fe4369060abdd01150d17a9e408da5a8fc9fd949ec74fed41dec9d2",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
