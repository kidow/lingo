import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u99d3","sourceProofFile":"engine-whole-u99d3.json","sourceProofFileSha256":"bbed866c79a9086e8861693de7a799d23418b915141201c286676816462c80a5","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"bbed866c79a9086e8861693de7a799d23418b915141201c286676816462c80a5"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[3],[4],[2],[5,6],[7],[8],[9],[10,11],[12],[13],[14],[15],[16]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),"e5b4a7a5cef510e00c0933cc1b9fae2e06dfd171a7a15e2a00267a5b4cca3999",'Original source metadata is pinned')
 assert.equal(sha(readFileSync(new URL('metadata.json',import.meta.url))),"8ad4bc42b8037267c7e9dcf80c8f615f020dd020fb0506c151517b43f2a32250",'Catalogue and dictionary metadata are pinned')
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"e33569c885042967df7c14bc647c3597753b233e82b42d4e33a2dcfa1ca9fca6",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"2e49cabb2478adde75158bf8e52bc353e947217e73fbdb87c5f6781abf8d5c29")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof)
 const boundProof={...proof,sourceRoot:identity.sourceRoot,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSha256}
 const boundBefore=JSON.stringify(boundProof)
 const strokes=originalCompiler.compileProgressive(trace,boundProof,{"root":"u99d3","file":"engine-whole-u99d3.json","fileSHA256":"bbed866c79a9086e8861693de7a799d23418b915141201c286676816462c80a5"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(JSON.stringify(boundProof),boundBefore)
 assert.equal(sha(JSON.stringify(strokes)),"bda8a80b454b28dccfb01ff627a4dd5dfb5848ea732af8a1eff238c397a1d737",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
