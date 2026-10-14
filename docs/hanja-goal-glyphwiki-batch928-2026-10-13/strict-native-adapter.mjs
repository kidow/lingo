import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=value=>createHash('sha256').update(value).digest('hex')
export const sourceRoot="u6f68"
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u6f68","sourceProofFile":"engine-whole-u6f68.json","sourceProofFileSha256":"491d52c05f53b89ac1acd042e45e3bec0d4a9c8ca300cbd49bbd26fb0fa81e87","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"7411f7ea88acc7ba7544d5ac54a8d9f98602569b383a2445c8f6cb5f33367e52"})
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="minimum-original-pens16-exceeds-domestic15"
const fullProofSHA256="963c4e0f5f1e263320c04450c1bd45d939325ff12232c529ecad904d9d56504a"
export function compileProgressive(trace,proof,identity) {
  assert.deepEqual(identity,selectedProofIdentity,'Explicit whole root/file/body SHA/header SHA is required')
  assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
  assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(sha(JSON.stringify(proof)),fullProofSHA256,'Complete original body, defaults and 8-engine header are fixed')
  assert.deepEqual(trace,proof.trace,'Argument trace and all original polygons are fixed')
  throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
