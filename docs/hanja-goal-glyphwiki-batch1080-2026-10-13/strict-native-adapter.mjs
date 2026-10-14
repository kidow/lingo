import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u6478-ue0102","sourceProofFile":"./engine-whole-u6478-ue0102.json","sourceProofFileSha256":"8290cf731e95d10a956ca79bcdd27cff3000d08de98fbec071cfc73ce6579261","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"cdc935ec4e28b137f30bc7721cf8361809624292bb7e4d5ff663f07071f1564e","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"0f0c27ecdb05a1d82c0a5599de90ff01261f1d574722a5d3e7c8a69ad922ee06"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header/metadata identity is mandatory')
 for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']])assert.equal(sha(readFileSync(new URL(identity[fileKey],import.meta.url))),identity[hashKey])
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"70a9b222a58beb59713e235e6c93aefff7400927fadd2b2c6fb399a4cf6dd2da",'Entire original body, defaults and engine header are immutable, including missing nulls')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"52d6cc6c889ea869c412ebd72efa1d729ac54c549d26a2dc90d0d3ad7024e05c")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u6478-ue0102","sourceProofFile":"./engine-whole-u6478-ue0102.json","sourceProofFileSha256":"8290cf731e95d10a956ca79bcdd27cff3000d08de98fbec071cfc73ce6579261","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"cdc935ec4e28b137f30bc7721cf8361809624292bb7e4d5ff663f07071f1564e","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"0f0c27ecdb05a1d82c0a5599de90ff01261f1d574722a5d3e7c8a69ad922ee06"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"af6a0d2e06d8bf8a8e30dbb04fbeb385aef6fb51ce00036c64283c3447e27ca4",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
