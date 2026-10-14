import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u732b-ue0102","sourceProofFile":"./engine-whole-u732b-ue0102.json","sourceProofFileSha256":"1ba6779e0dd97785790809f09ac1edbec3dd8cf5e67dd898c11fe0ddba0d6eeb","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"4707b1b07efb2cbe312ac0d2912840435a47b2da5cdcb82821ff06fa5f0f2298","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"894caf585b92f97697e8948c0fd43dc4b063569b5cd51823391077e74abd634e"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header/metadata identity is mandatory')
 for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']])assert.equal(sha(readFileSync(new URL(identity[fileKey],import.meta.url))),identity[hashKey])
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"4a8b33ecc1b11964eb967e7d9d0c7e61468a0d6bd54974ef9b8a9b427c53d57d",'Entire original body, defaults and engine header are immutable, including missing nulls')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"251d758ab2d9bab8a7879786c54e4648815764db42cb9f5d7e3480874a0a4264")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u732b-ue0102","sourceProofFile":"./engine-whole-u732b-ue0102.json","sourceProofFileSha256":"1ba6779e0dd97785790809f09ac1edbec3dd8cf5e67dd898c11fe0ddba0d6eeb","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"4707b1b07efb2cbe312ac0d2912840435a47b2da5cdcb82821ff06fa5f0f2298","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"894caf585b92f97697e8948c0fd43dc4b063569b5cd51823391077e74abd634e"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"09aa070bea8bfb5f83a3f7a461de7e20363fed9bfbb22806565b3eae1d4bb46f",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
