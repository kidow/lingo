import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=value=>createHash('sha256').update(value).digest('hex')
export const sourceRoot="u585a"
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u585a","sourceProofFile":"engine-whole-u585a.json","sourceProofFileSha256":"1c11082d10ca0554dfe4846862f6cfb01217b5a4fe95f1c9b6fe400d383a66c6","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"fdf45aacddbdad306a866d02be19cb7fa5148bcab857a503db368ed3224f0c2f"})
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="source-reproduction-float-mismatch-and-catalog13-domestic12"
const fullProofSHA256="35cc7fceaff6beac5fb41b3dcc1e3073c763aff2da010a62c49101c12a79de22"
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
