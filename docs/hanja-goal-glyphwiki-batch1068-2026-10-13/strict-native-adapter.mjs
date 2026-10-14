import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u82fd-k","sourceProofFile":"./engine-whole-u82fd-k.json","sourceProofFileSha256":"4e7bed3138e42c70a00f80a866afb69b9b8634cac9c6c64eec01e7814efec95d","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"4fb9f44f1daeed5c1989f904695408a7384b2374d78b8678670c059edc78833a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"4a8369844d5379d322e6e68a362198adac7b3d3bab2586fa6c4d8a173884cd71"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4,5],[6],[7],[8],[9]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header/metadata identity is mandatory')
 for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']])assert.equal(sha(readFileSync(new URL(identity[fileKey],import.meta.url))),identity[hashKey])
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"0936d3524fa4dec667c7915242fd48579890b7e90b0cd79ea7d6e2c96f22b5cc",'Entire original body, defaults and engine header are immutable, including missing nulls')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"ae4ea07ef00d3034f317bf73618e19407f802a3ff3baefbf137e0ee4bc3ba845")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u82fd-k","sourceProofFile":"./engine-whole-u82fd-k.json","sourceProofFileSha256":"4e7bed3138e42c70a00f80a866afb69b9b8634cac9c6c64eec01e7814efec95d","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"4fb9f44f1daeed5c1989f904695408a7384b2374d78b8678670c059edc78833a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"4a8369844d5379d322e6e68a362198adac7b3d3bab2586fa6c4d8a173884cd71"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"d2c1eac4723430f28d8ce190c61566617130cf6c51139c3e487c376ce01d9b5b",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
