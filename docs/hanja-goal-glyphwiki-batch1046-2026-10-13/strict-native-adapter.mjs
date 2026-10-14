import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u936d","sourceProofFile":"engine-whole-u936d.json","sourceProofFileSha256":"d6582f5ae72db874abba2ebd38e2009295f48beb17f4c56cef66083e23c069dd","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"d6582f5ae72db874abba2ebd38e2009295f48beb17f4c56cef66083e23c069dd"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15],[16],[17]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"7d07927bfc6c4c5e52eab9af877e4f2c91ed3897c32659bd34d48a0c408b95ae",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"b9ea2fc723a704373922367e3d65e19a7d495b1f7af124deeb89932f7ca1ea1a")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof)
 const boundProof={...proof,sourceRoot:identity.sourceRoot,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSha256}
 const boundBefore=JSON.stringify(boundProof)
 const strokes=originalCompiler.compileProgressive(trace,boundProof,{"root":"u936d","file":"engine-whole-u936d.json","fileSHA256":"d6582f5ae72db874abba2ebd38e2009295f48beb17f4c56cef66083e23c069dd"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(JSON.stringify(boundProof),boundBefore)
 assert.equal(sha(JSON.stringify(strokes)),"c66f50f10daccead7d2e7aa7faa5061741953abf58af6f30367af762cda4e2a3",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
