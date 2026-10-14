import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u821d","sourceProofFile":"./engine-whole-u821d.json","sourceProofFileSha256":"2e3e2ba3838747511b5d1382c37c043364ebff042c51fb329cb25103e6fbb016","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"b43cd033f3b3ae14fbc37f5dd6b862b52ebd82c66656c4e5383a588386dc1e47","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"8e3ee169e02a9be4236838928c893380b06f3eccb34321221f4f7b954b3d989b"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="complete-whole-minimum-original-pens-14or15-exceeds-catalog-13"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit complete whole/header/metadata identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 if(identity.sourceMetadataFile)assert.equal(sha(readFileSync(new URL(identity.sourceMetadataFile,import.meta.url))),identity.sourceMetadataFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"bd708e0d9ae19288b858daac861a6a344f9ba7d53b048278c359ed11d49fea3e",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
