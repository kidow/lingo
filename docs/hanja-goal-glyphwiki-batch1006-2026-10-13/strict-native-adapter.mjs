import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u83e1-ue0102","sourceProofFile":"engine-whole-u83e1-ue0102.json","sourceProofFileSha256":"a936e5e37f4b8850eeedc2a55723bf49d099435d895da59c09c582a1e267604f","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"fe049e837e88471943a88125d0f6bc6cadf716ee32af3d9cf6bbf197f927e3d8"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11,12],[13]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit complete whole/header/metadata identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 if(identity.sourceMetadataFile)assert.equal(sha(readFileSync(new URL(identity.sourceMetadataFile,import.meta.url))),identity.sourceMetadataFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"4187b5d8e1e351e2e652fbc38f9f603772870bbc0c95c0658804e64a7283045d",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"afe2596db6d19f85d5a4f5f539e9b3cd544c8e9eed4e234a963ef58fe51c88db")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"root":"u83e1-ue0102","file":"engine-whole-u83e1-ue0102.json","fileSHA256":"a936e5e37f4b8850eeedc2a55723bf49d099435d895da59c09c582a1e267604f"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"e738fdb71d737b788b858d4219c47e031d5980c7eeafbc509eb15c83a4f6bffb",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
