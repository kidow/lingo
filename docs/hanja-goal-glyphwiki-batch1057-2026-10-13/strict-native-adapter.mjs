import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u9f55","sourceProofFile":"engine-whole-u9f55.json","sourceProofFileSha256":"b410b63e3aeaadb35f3f0f061a9a8652955b4d2ad9763d55f7bcba38182b0b1c","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"b410b63e3aeaadb35f3f0f061a9a8652955b4d2ad9763d55f7bcba38182b0b1c"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="Original visible20 raw groups; adjacent grouping20 differs from domestic18. Exact nonadjacent raw4->15 enclosing contact and backwards raw20->19 contact are unapproved; raw16 empty metadata must remain original."
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"41894bf13259faea4daee61c42e856202759ee96f31cbcdc0eaf4ea4fac05059",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
