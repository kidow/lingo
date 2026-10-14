import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u9a11","sourceProofFile":"engine-whole-u9a11.json","sourceProofFileSha256":"05c509abe7bb47e622fc1a982947dcc19bf8ce6f24a0ff3dc911694368289025","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"05c509abe7bb47e622fc1a982947dcc19bf8ce6f24a0ff3dc911694368289025"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[3],[4],[2],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),"63742d152c41655dd38a5093ee21b09de8cfe286124ab8e585437ca8600dd440",'Original source metadata is pinned')
 assert.equal(sha(readFileSync(new URL('metadata.json',import.meta.url))),"a9c81a649fd84d24d225953d15ec5d59d9eb773970b33525cfe43aec932e2b4e",'Catalogue and dictionary metadata are pinned')
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"f1651d80f221bb323456560893e054486b136961d985d80bd45cc7e8fb48bdb5",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"d8c20c780098c84dcae236b046a5942d543aaeb53b1165dae86ce0ef44b5465c")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof)
 const boundProof={...proof,sourceRoot:identity.sourceRoot,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSha256}
 const boundBefore=JSON.stringify(boundProof)
 const strokes=originalCompiler.compileProgressive(trace,boundProof,{"root":"u9a11","file":"engine-whole-u9a11.json","fileSHA256":"05c509abe7bb47e622fc1a982947dcc19bf8ce6f24a0ff3dc911694368289025"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(JSON.stringify(boundProof),boundBefore)
 assert.equal(sha(JSON.stringify(strokes)),"e77a2009692e9152ae455024224b2c66b3741ef2a133e61144abcc6a6c391357",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
