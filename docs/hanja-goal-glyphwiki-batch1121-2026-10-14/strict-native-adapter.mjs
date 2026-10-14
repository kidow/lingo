import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u83f1","sourceProofFile":"engine-whole-u83f1.json","sourceProofFileSha256":"730a2ec4643d370ac0341cfd1f65c1c58d9f110d7edb225cbad51cadf2b3359b","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"730a2ec4643d370ac0341cfd1f65c1c58d9f110d7edb225cbad51cadf2b3359b"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="catalog12-domestic11-count-conflict-existing-deferred-state-preserved"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),"e56afbfe16ab6d8ad9659c1b9b848c4891f8ef50fe380c2df8bd983e497f0ae6",'Original source metadata is pinned')
 assert.equal(sha(readFileSync(new URL('metadata.json',import.meta.url))),"59053b05373a451f0b692d3cd8e36f0c3741ad5dd08708ec5d83664dce232c07",'Catalogue and dictionary metadata are pinned')
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"7139521cac631da0334f6d53884c8e59924ca7095705ced0e3f47cf7edd12278",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 
 
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
