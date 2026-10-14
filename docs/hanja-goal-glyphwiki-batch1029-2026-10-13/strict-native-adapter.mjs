import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u769c","sourceProofFile":"engine-whole-u769c.json","sourceProofFileSha256":"3d11ed820a45507e236839e021a28ddd9d4ec43955a0ec1812befb6af93de2ae","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"3d11ed820a45507e236839e021a28ddd9d4ec43955a0ec1812befb6af93de2ae"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2,3],[4],[5,6],[7],[8],[9],[10,11],[12],[13],[14,15],[16],[17,18],[19]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"f1b4965691a35c26165e1bda3f313a00be78dd351291991c0cda1dd678aeca2e",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"4a053210888996e8986d4f596cb4462e4a77e396111858992f18efca62c71726")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"root":"u769c","file":"engine-whole-u769c.json","fileSHA256":"3d11ed820a45507e236839e021a28ddd9d4ec43955a0ec1812befb6af93de2ae"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"08652b4f12edd0df259bdb5eac1b263e6eb2fa94064c0a934f8d5f524e6a66e0",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
