import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"aj1-13637","sourceProofFile":"engine-whole-aj1-13637.json","sourceProofFileSha256":"5a7e7a4ac33997473800b311e9140fe7692f2a4ded8c0b7986678f2d312c7cec","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"5a7e7a4ac33997473800b311e9140fe7692f2a4ded8c0b7986678f2d312c7cec"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4,5],[6,7],[8]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),"4e770d5551a24f4bde7eb019ae923fea87040b685108b9a722b0257602099b37",'Original source metadata is pinned')
 assert.equal(sha(readFileSync(new URL('metadata.json',import.meta.url))),"02f739e1c308ceb5cc8209c08e06254a1f07bdd6f94b0adeca93d43d2b01b1df",'Catalogue and dictionary metadata are pinned')
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","sourceProofFile","sourceRoot","trace"])
 assert.equal(sha(JSON.stringify(proof)),"a732e63d22df66cb16084839cc6ec5dd011688fb6460e2ead716540408b21bac",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"165b8a020efd0eb5cca34c29c1abeddb8cc6898c45b2996149f11cbf289de029")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof)
 const boundProof={...proof,sourceRoot:identity.sourceRoot,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSha256}
 const boundBefore=JSON.stringify(boundProof)
 const strokes=originalCompiler.compileProgressive(trace,boundProof,{"root":"aj1-13637","file":"engine-whole-aj1-13637.json","fileSHA256":"5a7e7a4ac33997473800b311e9140fe7692f2a4ded8c0b7986678f2d312c7cec"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(JSON.stringify(boundProof),boundBefore)
 assert.equal(sha(JSON.stringify(strokes)),"be2b04bdc1e4fe1e726e650a779a2ad574639de0cc728a6b2e82e69c5db9e944",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
