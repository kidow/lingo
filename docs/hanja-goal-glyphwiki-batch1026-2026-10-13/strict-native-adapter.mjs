import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u6fe9","sourceProofFile":"engine-whole-u6fe9.json","sourceProofFileSha256":"7b98fff8370717565a693d8179991e2b6d79b0753ee73e0c7ede70f0653a2f96","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"7b98fff8370717565a693d8179991e2b6d79b0753ee73e0c7ede70f0653a2f96"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="All named fixed wholes preserve the already native-reviewed disconnected third water pen. No bridge, reversal, trimming or component transplant; numerical count equality does not unlock the hold."
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"e30fb8a8d3825e0cd3f1e2358d8a572746964c81a803fcc535b0bc49e1e9b00f",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
