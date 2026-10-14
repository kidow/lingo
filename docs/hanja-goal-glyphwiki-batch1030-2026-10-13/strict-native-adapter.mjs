import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u5611","sourceProofFile":"engine-whole-u5611.json","sourceProofFileSha256":"b1e65ef6c58827ebae1a8d63919c80e8e2c3cb2c74d846b26743630212b0047a","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"b1e65ef6c58827ebae1a8d63919c80e8e2c3cb2c74d846b26743630212b0047a"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="Both original wholes have16 raw groups and only adjacent1/2 fold gives15, above catalog14. Nonadjacent0/3 or6/8 coincidence is not permission to force14; keep original geometry and hold."
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"563b8a43ad6cfbb56fd91517f99e9e1f5e55cfca10ce4bb940c3eea77bf89de2",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
