import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u7043","sourceProofFile":"engine-whole-u7043.json","sourceProofFileSha256":"1322f8fb566bbfcc6d1441e4ebe27082bf19066b94382c9ee5d61d23718158bd","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"1322f8fb566bbfcc6d1441e4ebe27082bf19066b94382c9ee5d61d23718158bd"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="Both fixed roots have24 raw groups. Adjacent13/14 and18/19 source folds give22. Lower bound21 additionally uses noncontiguous17/20 vertical-to-bottom-horizontal coincidence [87.625,145]; that rectangle closing boundary is not approved as one pen. Hold instead of matching count by that merge."
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact original whole/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"d117f9b92b12084452edba69e582dd7ef5b97b2c9c9a2ecf6cf71ff357ad1629")
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
