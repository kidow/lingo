import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u837c-ue0102","sourceProofFile":"engine-whole-u837c-ue0102.json","sourceProofFileSha256":"64461ac700844243361c8153840925723123680a25eeb98570e4e48bfbe1362d","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"6a7060086bd22dcbe797f82f1eadfb348a270b4098300d9cf409e298b0c4b275"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[3],[2],[4],[5],[6],[7],[8],[9],[10]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),"b3ca20216e0f15efe7d75f20aa76b782a75261b8b941ed9a72cd61b177b419a1",'Original source metadata is pinned')
 assert.equal(sha(readFileSync(new URL('metadata.json',import.meta.url))),"08230b91d763d21ae776550dda61324997be103a16244cc48b15e55b895bd4ba",'Catalogue and dictionary metadata are pinned')
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"47e18771bc4b51a7e2a44a57746aaf1e3677d2b045aa0f9f0f45c36f94dce4b6",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"fa2ed03f84f5ae51530229c4c75f6842bcf2bea3a92df9de689cd7c8e8b6d588")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof)
 const boundProof={...proof,sourceRoot:identity.sourceRoot,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSha256}
 const boundBefore=JSON.stringify(boundProof)
 const strokes=originalCompiler.compileProgressive(trace,boundProof,{"root":"u837c-ue0102","file":"engine-whole-u837c-ue0102.json","fileSHA256":"64461ac700844243361c8153840925723123680a25eeb98570e4e48bfbe1362d"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(JSON.stringify(boundProof),boundBefore)
 assert.equal(sha(JSON.stringify(strokes)),"172caf03d9ecb0c72fa72bc97161abb2b40370d4a208fc664ef65a4013a5ca09",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
