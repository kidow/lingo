import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u6f5d","sourceProofFile":"engine-whole-u6f5d.json","sourceProofFileSha256":"0ecb779f68ace811f50d446d854d95765735a55e851f5e8f94235dd7816b33a6","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"0ecb779f68ace811f50d446d854d95765735a55e851f5e8f94235dd7816b33a6"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="Original adjacent grouping16 differs from domestic15. raw7->10 is a nonadjacent enclosing contact; water raw2->3 endpoints have delta[-3.8999999999999986,-34], distance34.222945519051976. No connector or count-driven closure merge."
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"6d18e5d876da1295952c483e12c2684c48a8e175e07c8efc77cc5d26c2bbb609",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
