import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u7d85","sourceProofFile":"./engine-whole-u7d85.json","sourceProofFileSha256":"cee1fe49497bf4b741e1b06ca9b73dacadda7e975e4926420937caa3b2ea5c0c","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"e8ef74a7a640edd8e94f088bba54260334bcb436aba10326ad172b7a58a26d83"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="minimum-original-pens-15-exceeds-catalog-13"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact whole file/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"8af797e3ed009a1b8f630ea9346a45d3af79fcf964da48b788b3bfc515eae1c0",'Complete original geometry and engine header are pinned')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
