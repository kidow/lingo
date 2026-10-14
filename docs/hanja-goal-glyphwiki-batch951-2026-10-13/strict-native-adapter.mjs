import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u5bd1","sourceProofFile":"./engine-whole-u5bd1.json","sourceProofFileSha256":"75056c7ed106dd63b6102db6539d871486485d1a13f6fa00c0ff17eb6ca747c4","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"7fd0ffaf9b0d347c428e4a9cb239dc84864f218b3e640d4f9eaab3dc6a138645"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2,3],[4],[5],[6,7],[8],[9],[10],[11,12],[13,14],[15]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact whole file/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"9fda7bb13e1e32d0e8648cba9bd6f2c4f4e4249cadf811ed16f5d0e06e7e430c",'Complete original geometry and engine header are pinned')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"e7eaf805b44601c08acc006cec2193a99411f0b5e816f46c9546f419ab5d22c3")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is not allowed')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u5bd1","sourceProofFile":"./engine-whole-u5bd1.json","sourceProofFileSha256":"75056c7ed106dd63b6102db6539d871486485d1a13f6fa00c0ff17eb6ca747c4","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"7fd0ffaf9b0d347c428e4a9cb239dc84864f218b3e640d4f9eaab3dc6a138645"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"a074acdb4ee126a828343194f9b33741d84aee31651b824d183aa398af3e3016",'All original masks, bounds, weights, paths and widths are unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
