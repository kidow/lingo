import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u5126","sourceProofFile":"engine-whole-u5126.json","sourceProofFileSha256":"1c45e7464ff0f997ca04300342c8001cfb140c08b137986dee4f7ae0371a9021","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"1c45e7464ff0f997ca04300342c8001cfb140c08b137986dee4f7ae0371a9021"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="The single fixed root has19 raw groups with one exact5/6 join, lower bound18 greater than catalog/domestic17. Three explicit historical dependencies are preserved; current exact-join candidate remains on hold."
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact original whole/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"90b742c8f7c734cc1854c8304cd7645ae5e81c717cdc577eee2e208df7b976a5")
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
