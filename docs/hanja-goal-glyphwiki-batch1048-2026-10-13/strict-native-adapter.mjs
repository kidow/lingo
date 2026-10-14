import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u9442","sourceProofFile":"engine-whole-u9442.json","sourceProofFileSha256":"84c66dc2267693ab4c44d2532c3855d5cec1272ff59a8c27299a0df3895a2a39","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"84c66dc2267693ab4c44d2532c3855d5cec1272ff59a8c27299a0df3895a2a39"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"6d931f0d6866b4bbc8fd4658e204d92e0dd48883dc80eceaaad46e2e91b383a1",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"b56738ef5ecc64e6d81928f0fdd3abda3632c2b61395ea327801da25643306d4")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof)
 const boundProof={...proof,sourceRoot:identity.sourceRoot,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSha256}
 const boundBefore=JSON.stringify(boundProof)
 const strokes=originalCompiler.compileProgressive(trace,boundProof,{"root":"u9442","file":"engine-whole-u9442.json","fileSHA256":"84c66dc2267693ab4c44d2532c3855d5cec1272ff59a8c27299a0df3895a2a39"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(JSON.stringify(boundProof),boundBefore)
 assert.equal(sha(JSON.stringify(strokes)),"15c42216bc6a438faf3c39a282f5fcfe8a4c91d03977afe97df4a50af5117259",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
