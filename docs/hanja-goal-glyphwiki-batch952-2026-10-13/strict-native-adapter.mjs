import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u99f8","sourceProofFile":"./engine-whole-u99f8.json","sourceProofFileSha256":"e714bb9322a85827fcdfb4f8a934d38db02132b6ba13522cd49158ed68ea51b5","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"22d9a244112a96f9e53f4e801b42f40bc2a26a93ff6963affcb3579bd410c0b5"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16,17],[18,19],[20]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact whole file/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"7b00f149de47d0626a1167bc4e8de874862bdf3d1f99fcc4a946a344952ba76d",'Complete original geometry and engine header are pinned')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"e31c9c0e8444855f0bb03c1910e2463e213f9aa21328e24d8c8802b0dd858639")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is not allowed')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u99f8","sourceProofFile":"./engine-whole-u99f8.json","sourceProofFileSha256":"e714bb9322a85827fcdfb4f8a934d38db02132b6ba13522cd49158ed68ea51b5","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"22d9a244112a96f9e53f4e801b42f40bc2a26a93ff6963affcb3579bd410c0b5"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"a6ce1b6ab4d215d3d117b17bb42f75428bf79bbd4051a6c629884590ccd38033",'All original masks, bounds, weights, paths and widths are unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
