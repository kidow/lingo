import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u704c","sourceProofFile":"./engine-whole-u704c.json","sourceProofFileSha256":"075e7b46f3f90d2ac7ac53af64d11e3d9857e4ec4db7005112cb97fb75c609e7","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"34a8082517f3b31a110ec1890e219f0480734af2f4038f8ab2dc762e916b905c","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"b941fd984114a84515f9c96746a98587ad9d0ffac9f534b906da0f677e49e628"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12,13],[14],[15],[16],[17],[18],[19],[20],[21],[22]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header/metadata identity is mandatory')
 for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']])assert.equal(sha(readFileSync(new URL(identity[fileKey],import.meta.url))),identity[hashKey])
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"68722defc711f63fe4030952e734cdf54cb602de52d3d2e8828e0c6eca71046b",'Entire original body, defaults and engine header are immutable, including missing nulls')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"f836d322111ac8de65d9919f0f82c43da16f5ef92247a88ef8cb8d6782599c19")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u704c","sourceProofFile":"./engine-whole-u704c.json","sourceProofFileSha256":"075e7b46f3f90d2ac7ac53af64d11e3d9857e4ec4db7005112cb97fb75c609e7","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"34a8082517f3b31a110ec1890e219f0480734af2f4038f8ab2dc762e916b905c","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"b941fd984114a84515f9c96746a98587ad9d0ffac9f534b906da0f677e49e628"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"53db46e5655494e7ed7ee203492b3d40091fb190c9129a5396af4429e0739cd0",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
