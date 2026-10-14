import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u7fff","sourceProofFile":"engine-whole-u7fff.json","sourceProofFileSha256":"250c9322db054914d532dc908237919b0aa043f6747f065665582c9bc8c4ab56","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"250c9322db054914d532dc908237919b0aa043f6747f065665582c9bc8c4ab56"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15],[16,17],[18],[19],[20,21],[22],[23]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),"aa6995e90cf59010c1ff3142b93dfcc8c3e3b971830e6624fcf0f3705590a41f",'Original source metadata is pinned')
 assert.equal(sha(readFileSync(new URL('metadata.json',import.meta.url))),"19f8783b6ccc98798b7cc5424e88c8051283128ff73d93306e68dd7663c97a5c",'Catalogue and dictionary metadata are pinned')
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"f35b305da9c2d0870ea6c9014cbfe1ce2920927edf277e129bff84c3c5772e25",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"21f72e5ee002f5a0c514f60145450384c1c5d8927cc8902f137fab0f345c12ae")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof)
 const boundProof={...proof,sourceRoot:identity.sourceRoot,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSha256}
 const boundBefore=JSON.stringify(boundProof)
 const strokes=originalCompiler.compileProgressive(trace,boundProof,{"root":"u7fff","file":"engine-whole-u7fff.json","fileSHA256":"250c9322db054914d532dc908237919b0aa043f6747f065665582c9bc8c4ab56"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(JSON.stringify(boundProof),boundBefore)
 assert.equal(sha(JSON.stringify(strokes)),"3faa91a7ebd67dc74685097ad162d9a5fa7f7e1a51febb9c0c1f9795f260eea2",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
