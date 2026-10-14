// Fixed-source blocked preflight. No native or runtime approval.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceRoot = "u6f11"
export const sourceProofFile = "engine-whole-u6f11.json"
export const sourceProofFileSHA256 = "7ff6c8fb904a1a2a18bba8d82fc15389e2613bbe9e136ca0c2beab762b8a0339"
export const selectedProofIdentity = Object.freeze({"sourceRoot":"u6f11","sourceProofFile":"engine-whole-u6f11.json","sourceProofFileSHA256":"7ff6c8fb904a1a2a18bba8d82fc15389e2613bbe9e136ca0c2beab762b8a0339"})
export const sourceGroups = Object.freeze([[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]].map(g=>Object.freeze(g)))
export const catalogStrokes = 14
export const domesticClips = 14
export const blockedReason = "no-consecutive-exact14-candidate-selected16-water-turn-original-gap-remains"
export const approvalStatus = 'source-only-blocked-no-native-approval'
export const nativeApproval = false
export const nativeDirectionsReviewed = 0
export const nativeFramesReviewed = 0
export const nativeReplaysReviewed = 0
export const runtimeApplied = false
export function compileProgressive(trace, proof, identity) {
  assert.deepEqual(identity, selectedProofIdentity, 'Explicit exact root/file/byte SHA identity required')
  const bytes=readFileSync(new URL(sourceProofFile,import.meta.url))
  assert.equal(createHash('sha256').update(bytes).digest('hex'),sourceProofFileSHA256)
  const original=JSON.parse(bytes)
  assert.deepEqual(proof,original,'Entire fixed header, preset, original trajectories and polygons are immutable')
  assert.deepEqual(trace,original.trace,'Caller trace must be the selected exact original')
  assert.deepEqual([...sourceGroups.flat()].sort((a,b)=>a-b),original.trace.map((_,i)=>i),'Every original raw retained once')
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  const error=new Error(blockedReason)
  error.code='HANJA_SOURCE_CANDIDATE_BLOCKED'
  throw error
}
export function compileSourceWhole(root,trace,proof,identity) {
  assert.equal(root,sourceRoot,'No other whole root silently substitutes for the selected original')
  return compileProgressive(trace,proof,identity)
}
