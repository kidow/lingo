import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u6f11","sourceProofFile":"engine-whole-u6f11.json","sourceProofFileSha256":"7ff6c8fb904a1a2a18bba8d82fc15389e2613bbe9e136ca0c2beab762b8a0339","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"7ff6c8fb904a1a2a18bba8d82fc15389e2613bbe9e136ca0c2beab762b8a0339"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]].map(g=>Object.freeze(g)))
export const blockedReason="no-consecutive-exact14-candidate-selected16-water-turn-original-gap-remains"
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),"cbf8ecd33b8bdbe6865b6febf1ac6c0d290968cdb2128f3150ebd9f3c5cd1ae7",'Original source metadata is pinned')
 assert.equal(sha(readFileSync(new URL('metadata.json',import.meta.url))),"8ec89b653a3119cb7c2def774858f8e78bfd6761555611153400e4c2e08eb75f",'Catalogue and dictionary metadata are pinned')
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.equal(sha(JSON.stringify(proof)),"b781341178947f8073a97f5b55d6b0569242c1be7dad47f95f06aad252056d29",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"7bca866a9ddc8d5f97d4ea6a052b471947c9fb0b62a37c89922090e5ff218823")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert.throws(()=>originalCompiler.compileProgressive(trace,proof,{"sourceRoot":"u6f11","sourceProofFile":"engine-whole-u6f11.json","sourceProofFileSHA256":"7ff6c8fb904a1a2a18bba8d82fc15389e2613bbe9e136ca0c2beab762b8a0339"}),e=>e.message===blockedReason)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
