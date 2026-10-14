import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u9f08-g","sourceProofFile":"./engine-whole-u9f08-g.json","sourceProofFileSha256":"403f8ceafda7a5066e54cf6283712756fcd6119b3dc21ac99f2f84912771e845","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"6b03d58718b30d7293aad8501d99b90d7d0f59e2edde6e58965a063afe50d95e","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"4e973df2c49459c1da8af1ac2951f2bdbf0109aba05fae5ac8c0dcba015981b7"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="catalogue25-versus-domestic24-count-conflict-with-incomplete-alternative-wholes"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header/metadata identity is mandatory')
 for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']])assert.equal(sha(readFileSync(new URL(identity[fileKey],import.meta.url))),identity[hashKey])
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"54cc601879af955e6df58139c8b0e99732284208662e9fb5b070838af79da9eb",'Entire original body, defaults and engine header are immutable, including missing nulls')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"3b62d60dc6c678d0d3a60c123ab6a20ccd1d0b509cbb06a399dc6fec6eeed8da")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert.throws(()=>originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u9f08-g","sourceProofFile":"./engine-whole-u9f08-g.json","sourceProofFileSha256":"403f8ceafda7a5066e54cf6283712756fcd6119b3dc21ac99f2f84912771e845","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"6b03d58718b30d7293aad8501d99b90d7d0f59e2edde6e58965a063afe50d95e","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"4e973df2c49459c1da8af1ac2951f2bdbf0109aba05fae5ac8c0dcba015981b7"}),e=>e.message===blockedReason)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
