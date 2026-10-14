import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u905d-ue0102","sourceProofFile":"./engine-whole-u905d-ue0102.json","sourceProofFileSha256":"ff6fd860826efcbdef27942cc62027ebb893d9fc2f5c2156557b4900bb4153a6","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"747a19309cdf2b7188af2372a3f036be63ae6227dcdfea28788d81c06e9008ff","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edb92c6c5826253c6af36abd27bcf27b3d7bbf2792a84ba54abcaeae5d943f5e"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header/metadata identity is mandatory')
 for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']])assert.equal(sha(readFileSync(new URL(identity[fileKey],import.meta.url))),identity[hashKey])
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"02383c6b885c1a7032394e4a2e4faf4ea53c7df219ece60a4c2e503942e37ec3",'Entire original body, defaults and engine header are immutable, including missing nulls')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"629abe65e12f595b2150b6c392877b75ab802596120a1703a356558876005f6e")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u905d-ue0102","sourceProofFile":"./engine-whole-u905d-ue0102.json","sourceProofFileSha256":"ff6fd860826efcbdef27942cc62027ebb893d9fc2f5c2156557b4900bb4153a6","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"747a19309cdf2b7188af2372a3f036be63ae6227dcdfea28788d81c06e9008ff","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edb92c6c5826253c6af36abd27bcf27b3d7bbf2792a84ba54abcaeae5d943f5e"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"ada6d835a1d2306f099b966fa17454cca63b9da63458acb7b0b899081979a5a2",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
