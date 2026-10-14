import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u7e86","sourceProofFile":"./engine-whole-u7e86.json","sourceProofFileSha256":"362b63e5990e538a4bb90c902026907903106125a23328a142b6740acd23b1a9","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"38030b1970dff74eac82a2d5200218a94fcb82427faacfc09ff1308a642791c9","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"60819413bdf3bc11cc39d2bba04360b5eed7de8baceabde3a573e6c5796898e0"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="sourceMissing-wholeGeometryNull"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header/metadata identity is mandatory')
 for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']])assert.equal(sha(readFileSync(new URL(identity[fileKey],import.meta.url))),identity[hashKey])
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","missing","root","status","trace"])
 assert.equal(sha(JSON.stringify(proof)),"b4bcb988cd6b4e7ea9afd2e7b7cf029e8171b7a17b6d31c9e864308b65f6cd89",'Entire original body, defaults and engine header are immutable, including missing nulls')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"0a3375487378d55d77f07a9c2f0ac9f1c9832b0b7c613a25141cbb5e6ea06958")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert.throws(()=>originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u7e86","sourceProofFile":"./engine-whole-u7e86.json","sourceProofFileSha256":"362b63e5990e538a4bb90c902026907903106125a23328a142b6740acd23b1a9","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"38030b1970dff74eac82a2d5200218a94fcb82427faacfc09ff1308a642791c9","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"60819413bdf3bc11cc39d2bba04360b5eed7de8baceabde3a573e6c5796898e0"}),e=>e.message===blockedReason)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
