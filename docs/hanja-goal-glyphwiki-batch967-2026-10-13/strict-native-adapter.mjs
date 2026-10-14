import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u99fe-ufe00","sourceProofFile":"engine-whole-u99fe-ufe00.json","sourceProofFileSha256":"98c81d9fb17f477903d121aa74e88f14ba00289dca3770598a60e1a919107a1d","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"545ed363b3c99a5cd017a8d23ac28f1d73de2319803d21f832da644a221e89e9"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact whole file/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"f1af3000cb14ff9da67eb539ff1d9524f2dd2fb1f4847888f9dd740f90fd3702",'Complete original geometry and engine header are pinned')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"308704dcf8022e9f80a32aa3142736fb938bf8f2108e63a574b26fdec8d1e88b")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is not allowed')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof)
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"6b650ab18683a3fdb5b33b91c2f7ceebb8f2643c2fc54b11a1b59e0a579c2ea3",'All original masks, bounds, weights, paths and widths are unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
