import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u50e9","sourceProofFile":"./engine-whole-u50e9.json","sourceProofFileSha256":"9cff50b00cf3e6b7184bf3f62cb1a29fbaf6fc2c7a68ff8923332ecb82bbdeb9","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"e2a2fca7d956cfc3d79561d2af1d16a1199966dee46995ca7ee32b935a02c2be","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"35e0dfdfa83f9728179814bf3471b7c0f7c3fec8c2a924e1084fcb9bdf9cd784"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3,4],[5],[6],[7],[8,9],[10],[11],[12],[13,14],[15],[16]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit complete whole/header/metadata identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 if(identity.sourceMetadataFile)assert.equal(sha(readFileSync(new URL(identity.sourceMetadataFile,import.meta.url))),identity.sourceMetadataFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"17a46e86cff47ff19fd65e63208b2b8d11d1a0e2817a5652380327db39f37a21",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"a156a9a702ba2f9ec88708247d5488a2b3c1a96c3343928868eb8eb23502d596")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u50e9","sourceProofFile":"./engine-whole-u50e9.json","sourceProofFileSha256":"9cff50b00cf3e6b7184bf3f62cb1a29fbaf6fc2c7a68ff8923332ecb82bbdeb9","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"e2a2fca7d956cfc3d79561d2af1d16a1199966dee46995ca7ee32b935a02c2be","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"35e0dfdfa83f9728179814bf3471b7c0f7c3fec8c2a924e1084fcb9bdf9cd784"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"23471b6ff9b59ca68a63c3d5d2df30349465c8f532427f6f38118d4132e602a5",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
