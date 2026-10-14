import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import * as candidate from './progressive-terminal15-candidate.mjs'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha = bytes => createHash('sha256').update(bytes).digest('hex')
const pins = Object.freeze({"progressive.mjs":"c88189d5be023a84bc7d53a9325c8d61bbf340bc04d76db9d114e906641112a7","progressive-terminal15-candidate.mjs":"91283399dfacde6938f46d6726a3b6c858b7f8a3e6a222252bdff5ceb565635f","engine-whole-u4ff4.json":"4b932bbe79e7bc96dde85ebdbb70f048d9e2ac5656fa2979e83bfc5b3c5628a6","engine-proof.json":"4b932bbe79e7bc96dde85ebdbb70f048d9e2ac5656fa2979e83bfc5b3c5628a6","metadata.json":"0716d1d9812daed1c332cc71f1f6ff4243aeb4e351820a9f4b58c1e4e458aa2f","sources.json":"ff5b3a83320c00d0113666b1c6e9de73be835c498b571f12e77edafbf1ef21a8","native-review-root-hold.json":"e1f978e573bfa28eab03b1a0f017f6c5908a6a0729fc38032f2338784f92a973","terminal15-source-analysis.json":"da5a236e5bb077cd77a08be48c1b00e011760af5f75056cfba05593a13f9c921"})
export const selectedProofIdentity = Object.freeze({sourceRoot:'u4ff4',sourceProofFile:'engine-whole-u4ff4.json',sourceProofFileSHA256:'4b932bbe79e7bc96dde85ebdbb70f048d9e2ac5656fa2979e83bfc5b3c5628a6',sourceHeaderFile:'engine-proof.json',sourceHeaderFileSHA256:'4b932bbe79e7bc96dde85ebdbb70f048d9e2ac5656fa2979e83bfc5b3c5628a6'})
export const sourceRoot = selectedProofIdentity.sourceRoot
export const sourceGroups = candidate.sourceGroups
export const nativeApproval = false
export const runtimeApplied = false
export const status = 'isolated-source-terminal15-candidate-native-review-pending'
export function compileProgressive(trace, proof, identity) {
  assert.deepEqual(identity, selectedProofIdentity, 'Explicit selected whole and original header identity required')
  for (const [file, expected] of Object.entries(pins)) assert.equal(sha(readFileSync(new URL(file, import.meta.url))), expected, 'Original/candidate file pin: '+file)
  const selected=JSON.parse(readFileSync(new URL(identity.sourceProofFile,import.meta.url)))
  const header=JSON.parse(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url)))
  const expected={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}
  assert.deepEqual(proof,expected,'Complete original body and 8-engine header')
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
  assert.deepEqual(trace,proof.trace)
  const before=JSON.stringify(proof)
  const strokes=candidate.compileProgressive(trace,proof,candidate.selectedProofIdentity)
  assert.equal(JSON.stringify(proof),before,'Input proof must remain immutable')
  assert.equal(strokes.length,10)
  assert.equal(strokes.flat().length,12)
  assert.equal(sha(JSON.stringify(strokes)),'d0ce4925ea943017f73be22ae925bb468f8295e5d2a8b28a1b1152d70ac31f23','Exact original candidate masks/path/width/weight')
  for (const raw of [3,7]) {
    const call=proof.trace[raw][0]
    assert.equal(call.kind,'cdDrawCurve')
    assert.equal(call.args.at(-1),15)
    assert.equal(call.polygons.length,5)
    assert.equal(strokes[raw].length,2)
    assert.equal(strokes[raw][0].direction,'curve')
    assert.equal(strokes[raw][0].revealWidth,14)
    assert.equal(strokes[raw][1].direction,'up')
    assert.equal(strokes[raw][1].revealPath,undefined,'No invented original-tail centerline')
    assert.equal(strokes[raw][1].weight,proof.defaults.kWidth*5/2,'Original jump-based weight, never bbox-height estimate')
  }
  return strokes
}
export function compileSourceWhole(root,trace,proof,identity) {
  assert.equal(root,sourceRoot,'No implicit whole or foreign source substitution')
  return compileProgressive(trace,proof,identity)
}

