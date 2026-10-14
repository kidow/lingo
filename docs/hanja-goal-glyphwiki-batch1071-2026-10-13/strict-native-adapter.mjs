import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u8541-k","sourceProofFile":"./engine-whole-u8541-k.json","sourceProofFileSha256":"0b4e7f720a1c721e2d89141f3c35a74c598c730e89abafb7ddac2cb55794ff05","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"7c49757f23ffa47a07659a9fd7fb0a67a2f431550f042f66d6868b4220833752","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ac3a1ace70ac1b88dbf6a9750350a07ddee5592f149afc1e279a01722203f266"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16],[17]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header/metadata identity is mandatory')
 for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']])assert.equal(sha(readFileSync(new URL(identity[fileKey],import.meta.url))),identity[hashKey])
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"c328f88506a802d5254e3ba6240e5a11ed572919dfb75a64530a3ecf3f7a48f5",'Entire original body, defaults and engine header are immutable, including missing nulls')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"f19fad6722dde5226a1495844cb31244d4876856e811205f656e17a62ff98e81")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u8541-k","sourceProofFile":"./engine-whole-u8541-k.json","sourceProofFileSha256":"0b4e7f720a1c721e2d89141f3c35a74c598c730e89abafb7ddac2cb55794ff05","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"7c49757f23ffa47a07659a9fd7fb0a67a2f431550f042f66d6868b4220833752","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ac3a1ace70ac1b88dbf6a9750350a07ddee5592f149afc1e279a01722203f266"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"ba9892b2c4eae121eb75098e1e3c28bf95ca5baff389c4bb31ac9010cd544cf1",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
