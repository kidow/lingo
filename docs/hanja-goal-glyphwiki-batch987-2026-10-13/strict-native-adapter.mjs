import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u6eee","sourceProofFile":"engine-whole-u6eee.json","sourceProofFileSha256":"3685c250740f4f1af5c048704b45de7b9dfd336b4be838a79eda5d01a99a7725","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"3685c250740f4f1af5c048704b45de7b9dfd336b4be838a79eda5d01a99a7725"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="Both fixed roots have16 raw groups and only noncontiguous6/8 endpoint coincidence, giving raw endpoint lower bound15 greater than catalog/domestic14. Current exact-join workflow cannot produce14 without further original boundary evidence; no invented connector."
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact original whole/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"1b6bbf8738e1ea8f3ac60885dda23a5b2a90029e00eb52a8cc28710a3b8d3d23")
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
