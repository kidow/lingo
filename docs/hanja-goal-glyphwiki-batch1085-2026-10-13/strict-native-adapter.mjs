import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u77a5","sourceProofFile":"./engine-whole-u77a5.json","sourceProofFileSha256":"a5da856e0637648c00fa7ebaf4e24c3eb068446b23e86a20624b7360df8b508b","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"774030b77f6e8433e97fad37cd69a504dd461e52a2cfce6d1e4e749d640e6889","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"6d5a5fc4148fe2355fcac111ad5f29246981753b7047928a654537b629021dcd"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="catalogue17-versus-domestic16-count-conflict"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header/metadata identity is mandatory')
 for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']])assert.equal(sha(readFileSync(new URL(identity[fileKey],import.meta.url))),identity[hashKey])
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"cfa7fb761c8ad9c1aafb62c83d293227ac94d1404b1ce9b738ecadf15360dd1e",'Entire original body, defaults and engine header are immutable, including missing nulls')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"d94622dff0a97222aa94ec37b5e06c7eb5281f0d5d82deca54f2cede1a60edd2")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert.throws(()=>originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u77a5","sourceProofFile":"./engine-whole-u77a5.json","sourceProofFileSha256":"a5da856e0637648c00fa7ebaf4e24c3eb068446b23e86a20624b7360df8b508b","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"774030b77f6e8433e97fad37cd69a504dd461e52a2cfce6d1e4e749d640e6889","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"6d5a5fc4148fe2355fcac111ad5f29246981753b7047928a654537b629021dcd"}),e=>e.message===blockedReason)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
