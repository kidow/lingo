import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u655d","sourceProofFile":"./engine-whole-u655d.json","sourceProofFileSha256":"aec1600890713b18fd739998c8b2451eaf267e664039ab6db60b6124c39a94af","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a1e4d41afd749d9af493f30fcaf7eccb685b911aead2f38349104d6bbfb0fb87"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="catalog-12-domestic-11-mismatch"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact original whole/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"f9a1d73a035af52c76c81da6b9bf5a45a9a442c06b4532e64e25fdb0fca4ea50")
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
