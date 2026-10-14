import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'

const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u9654","sourceProofFile":"engine-whole-u9654.json","sourceProofFileSha256":"c9c59133365d33fdbe9c6cb6d58963c100db5cf91be234c9b3df4f1e7e7ea169","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"c9c59133365d33fdbe9c6cb6d58963c100db5cf91be234c9b3df4f1e7e7ea169"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([].map(g=>Object.freeze(g)))
export const blockedReason="All four fixed complete original wholes have11 drawing raw groups and only exact0/1 join. Minimum endpoint path cover10 and original-order contiguous count10 both exceed catalog/domestic9. Integrity verification passes; no original connector, extra merge or newer substitution is permitted to force9."
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit complete whole/header/metadata identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 if(identity.sourceMetadataFile)assert.equal(sha(readFileSync(new URL(identity.sourceMetadataFile,import.meta.url))),identity.sourceMetadataFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"19856c8f6fde170c66ff49ff9d88c93a4cb29d34bd47cf293144489f92d91887",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 throw new Error(blockedReason)
}
export const nativeApproval=false
export const runtimeApplied=false
