import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const sha = value => createHash('sha256').update(value).digest('hex')
export const sourceRoot = "u61af-ue0100"
export const selectedProofIdentity = Object.freeze({"sourceRoot":"u61af-ue0100","sourceProofFile":"./engine-whole-u61af-ue0100.json","sourceProofFileSha256":"54436372d0c809bc1fd74a045f1f95eb4a9069bf9cfbbc57ee50199a875bc92c","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"fa30b113b26460510343b9defbc840b55052ea7bc7010cab565034f7e76c15d4"})
export const blockedReason = 'nonconsecutive-original-enclosure-raw14-18'
export const sourceGroups = Object.freeze([[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10,11],[12],[13],[14,18],[15,16],[17]].map(g=>Object.freeze(g)))
const fullProofSha256 = "e571a8b200046386acfcc5f9b7cb58f785a4552545805ee93a24969da0fddb04"
export function validateBlockedCandidate(trace, proof, identity) {
  assert.deepEqual(identity, selectedProofIdentity, 'Exact selected root/file/header identity is mandatory')
  const original = readFileSync(new URL(identity.sourceProofFile,import.meta.url))
  const header = readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))
  assert.equal(sha(original),identity.sourceProofFileSha256)
  assert.equal(sha(header),identity.sourceHeaderFileSha256)
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(sha(JSON.stringify(proof)),fullProofSha256,'Whole body and full engine header remain fixed')
  assert.deepEqual(trace,proof.trace)
  assert.deepEqual(sourceGroups.filter(g=>g.some((raw,i)=>i>0&&raw!==g[i-1]+1)),[[14,18]])
  throw new Error(blockedReason)
}
export const nativeApproval = false
export const runtimeApplied = false
