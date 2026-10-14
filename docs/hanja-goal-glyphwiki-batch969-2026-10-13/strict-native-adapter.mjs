import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u6504","sourceProofFile":"engine-whole-u6504.json","sourceProofFileSha256":"f5033f3fc29986a09b6e825d2ad575b03242c31d51559d4959ac670a7fd16b9b","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"d492dcf6f1d5a4426dba870c8846fa6ff5632436ec6cba75705ccdbf51fc3c17"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11,12],[13],[14],[15],[16],[17],[18],[19]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact whole file/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"87ce02d64cee7e4e29a789ba8a973ed87f701b3ebd009777ecf703e88cc07cdc",'Complete original geometry and engine header are pinned')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"d86028daf3b2c05ebf53ffde4c2a4a4e90cdafc50d42b601043733af8ec8505c")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is not allowed')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof)
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"39d468ac186660a0d8bdb111dff10bdbe1af6e095e1e9d5864e77539ec4906ff",'All original masks, bounds, weights, paths and widths are unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
