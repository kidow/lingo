import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u63cf-ue0102","sourceProofFile":"./engine-whole-u63cf-ue0102.json","sourceProofFileSha256":"1c11a164470864ff936ba7dfe0c958f73fbc17cc9032bb0467fab89b82cbefc4","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"8cb0fec318dac99d606ac7b6d9c4fca92da65e6277600866f6eb0c2adf77cc90","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"1cc82bf3fd232805a6c2a98ee518b7febfb32beb09e68662ef8f64a4c493983a"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header/metadata identity is mandatory')
 for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']])assert.equal(sha(readFileSync(new URL(identity[fileKey],import.meta.url))),identity[hashKey])
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"6c5caf78eeaaf93bdb1058160a521e2ff99b960a066186246c3d6bd7bae9591d",'Entire original body, defaults and engine header are immutable, including missing nulls')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"7c838997630c0522f99042d1e1a73a9b18410ea03f43688a8997d4cd165f794c")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u63cf-ue0102","sourceProofFile":"./engine-whole-u63cf-ue0102.json","sourceProofFileSha256":"1c11a164470864ff936ba7dfe0c958f73fbc17cc9032bb0467fab89b82cbefc4","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"8cb0fec318dac99d606ac7b6d9c4fca92da65e6277600866f6eb0c2adf77cc90","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"1cc82bf3fd232805a6c2a98ee518b7febfb32beb09e68662ef8f64a4c493983a"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"474d1cdf308e00e96429d9626c3d56c1109cf1a31057d33b425ac1324236a88a",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
