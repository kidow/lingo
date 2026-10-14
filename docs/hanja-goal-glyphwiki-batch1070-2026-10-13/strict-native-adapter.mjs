import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u9f10","sourceProofFile":"./engine-whole-u9f10.json","sourceProofFileSha256":"67602125fef7b271238afe7cfb1b36c2a6d981d6ed299c8f6c06ecfa86f0a730","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"12388c473294fe04b13dc92e17e014cbdc4dfb86c1b6396f42f003be19e453cd","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"5669687895506aaf2ddc25e6692931fcfe13d3fdb054421f6fbf1bbb666970e9"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="sourceMissing-wholeGeometryNull"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header/metadata identity is mandatory')
 for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSha256'],['sourceHeaderFile','sourceHeaderFileSha256'],['sourceMetadataFile','sourceMetadataFileSha256']])assert.equal(sha(readFileSync(new URL(identity[fileKey],import.meta.url))),identity[hashKey])
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","missing","root","status","trace"])
 assert.equal(sha(JSON.stringify(proof)),"fd2fdd191a5d668d1974984d68d4fc52d74473e1f3abd1a5cb1fa79ba266a3f2",'Entire original body, defaults and engine header are immutable, including missing nulls')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"b40fd8b681e0b9c15c1bfe2a9dda229eccff395e07acc5ef58992de6c4ac2b68")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert.throws(()=>originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u9f10","sourceProofFile":"./engine-whole-u9f10.json","sourceProofFileSha256":"67602125fef7b271238afe7cfb1b36c2a6d981d6ed299c8f6c06ecfa86f0a730","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"12388c473294fe04b13dc92e17e014cbdc4dfb86c1b6396f42f003be19e453cd","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"5669687895506aaf2ddc25e6692931fcfe13d3fdb054421f6fbf1bbb666970e9"}),e=>e.message===blockedReason)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
