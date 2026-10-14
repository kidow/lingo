import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u8af4","sourceProofFile":"./engine-whole-u8af4.json","sourceProofFileSha256":"c783ad2bdeb60ba047c15c67ca2c7645faa86534655dbcc1dc8aa0d428ebdf0e","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"652dcf83aa2688692b2c6a741009f2417552343f858844d59c64d792a5a7e30a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"9e16ca8eace61ecb4a83e520a98c10bb42b1542f3ab3b3d5823a7d37e18bc6ca"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16],[17]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit complete whole/header/metadata identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 if(identity.sourceMetadataFile)assert.equal(sha(readFileSync(new URL(identity.sourceMetadataFile,import.meta.url))),identity.sourceMetadataFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"cabe98b2b5cfc8e57af093315d33664febf668941878522100622f0b098da882",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"88b18f373615c4b46454c4d42702eba28f01ae8b1a8391b940a459d61e03d0aa")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u8af4","sourceProofFile":"./engine-whole-u8af4.json","sourceProofFileSha256":"c783ad2bdeb60ba047c15c67ca2c7645faa86534655dbcc1dc8aa0d428ebdf0e","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"652dcf83aa2688692b2c6a741009f2417552343f858844d59c64d792a5a7e30a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"9e16ca8eace61ecb4a83e520a98c10bb42b1542f3ab3b3d5823a7d37e18bc6ca"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"5238aa9ee3a4ed3082c50a02f17ee3cc4b437c373bb35d03e016cd9ec7e49d6f",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
