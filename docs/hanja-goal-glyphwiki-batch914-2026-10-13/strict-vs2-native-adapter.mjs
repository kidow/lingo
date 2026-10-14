import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import * as candidate from './progressive-vs2.mjs'
export { renderProgressive, sourceRoot, selectedProofIdentity, sourceGroups } from './progressive-vs2.mjs'
const sha = value => createHash('sha256').update(value).digest('hex')
export function compileProgressive(trace, proof, identity) {
  assert.deepEqual(identity, candidate.selectedProofIdentity, 'Explicit VS2 identity required; no base fallback')
  assert.equal(sha(readFileSync(new URL('./progressive-vs2.mjs', import.meta.url))), '442eef4f5a3b41c710db6f3c6f2c53aec8f5a06bb7861204ac4df1c647e9577e', 'Exact separate candidate compiler bytes')
  assert.deepEqual(Object.keys(proof).sort(), ['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(sha(JSON.stringify(proof)), '4845f4dc2c1e1e8269a15984af12782eed5dd1bc6933c5eb0e3f19a0c3cd8e0d', 'Complete original VS2 and engine header')
  const before = JSON.stringify(proof)
  const strokes = candidate.compileProgressive(trace, proof, identity)
  assert.equal(JSON.stringify(proof), before)
  assert.equal(sha(JSON.stringify(strokes)), '600884c93b72055db1f5f8cdd632e7832e4a03f143548adf803ffd83d06faac7', 'Exact original13 masks and fixed same-pen grouping')
  return strokes
}
export const nativeApproval = false
export const runtimeApplied = false
