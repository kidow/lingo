import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u91c1","sourceProofFile":"engine-whole-u91c1.json","sourceProofFileSha256":"0d7c59b9eb17ae2cc70a360c7d9fc308a04acc7d22b75fde75f52274d598670f","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"0d7c59b9eb17ae2cc70a360c7d9fc308a04acc7d22b75fde75f52274d598670f"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="Catalog25 differs from domestic26. Whole variants have original adjacent counts17/24/25/26; selecting by numeric equality cannot validate the domestic whole/form."
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"4006e19fff4c699a03d98726ebdeb631050307d8ecb0af7d29956fdc4e3201fd",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
