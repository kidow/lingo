import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u7e81","sourceProofFile":"engine-whole-u7e81.json","sourceProofFileSha256":"a1823d5561cf955317c983a38753aa419edfb790f75d772aed00a85ab96dbe9f","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"a1823d5561cf955317c983a38753aa419edfb790f75d772aed00a85ab96dbe9f"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="Strict original directed path-cover minimum 21 exceeds catalog and domestic 20; no count-driven regrouping or connector; Strict original directed path-cover minimum 21 exceeds catalog and domestic 20; no count-driven regrouping or connector"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"de70caf8d9695bde4f4937ddbc3571ededf001ae7e72ecf41e778d910a50cc25",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
