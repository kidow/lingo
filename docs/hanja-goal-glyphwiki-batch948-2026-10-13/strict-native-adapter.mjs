import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u83d1-ue0102","sourceProofFile":"./engine-whole-u83d1-ue0102.json","sourceProofFileSha256":"780b9148d9ccf7b3d33cd6b1acd44e31739e96b6605d86b80a7d8ac5d0f13671","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"da8f00cf2c0ff9cd6424cff4bf271be437798ddce5845427330e32cc7baa8b77"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4,5],[6,7],[8,9],[10],[11,12],[13],[14],[15]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact whole file/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"0e4fa7b0009b5ef8476a5604fe759cca52c3d9a863312a8e01f57c639b459803",'Complete original geometry and engine header are pinned')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"14dd6463a99637ab4f6d0e108299605d4fb6e8b603e829b25b370870f6c18c26")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is not allowed')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u83d1-ue0102","sourceProofFile":"./engine-whole-u83d1-ue0102.json","sourceProofFileSha256":"780b9148d9ccf7b3d33cd6b1acd44e31739e96b6605d86b80a7d8ac5d0f13671","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"da8f00cf2c0ff9cd6424cff4bf271be437798ddce5845427330e32cc7baa8b77"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"c5393957b42400c341d6e93c75d47bbd2172b1b22fe682f98f8e1e12505ef48c",'All original masks, bounds, weights, paths and widths are unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
