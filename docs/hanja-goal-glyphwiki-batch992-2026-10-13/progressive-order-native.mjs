import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import * as original from './progressive.mjs'
const sha = value => createHash('sha256').update(value).digest('hex')
const freeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value) } return value }
const ID = freeze({"root":"u99dc","file":"engine-whole-u99dc.json","fileSHA256":"084343a21e36f0a0f58ecedf968db334ef41ff332c14810c21c57b30db12a764"})
const ORIGINAL_COMPILER_SHA = "dbe2bcce8e4c301ee34dc88b91ad50f57958d59d2ea219e3d5023841264d698f"
const HEADER_SHA = "084343a21e36f0a0f58ecedf968db334ef41ff332c14810c21c57b30db12a764"
const originalBytes = readFileSync(new URL(ID.file, import.meta.url))
const headerBytes = readFileSync(new URL('./engine-proof.json', import.meta.url))
assert.equal(sha(originalBytes), ID.fileSHA256)
assert.equal(sha(headerBytes), HEADER_SHA)
const selected = JSON.parse(originalBytes), header = JSON.parse(headerBytes)
const FULL = freeze({ engineRevision: header.engineRevision, engineHashes: header.engineHashes, ...selected })
const FULL_KEYS = ['defaults','engineHashes','engineRevision','groups','trace']
assert.deepEqual(Object.keys(selected).sort(), FULL_KEYS)
assert.deepEqual(Object.keys(header).sort(), FULL_KEYS)
assert.deepEqual(selected.engineHashes, header.engineHashes)
assert.equal(selected.engineRevision, header.engineRevision)
export const sourceRoot = 'u99dc'
export const sourceProofFile = ID.file
export const sourceProofFileSHA256 = ID.fileSHA256
export const sourcePayloadSHA256 = sha(JSON.stringify(FULL))
export const domesticOrderPermutation = freeze([1,2,4,5,3,6,7,8,9,10,13,15,12,11,14])
assert.deepEqual([...domesticOrderPermutation].sort((a,b)=>a-b), Array.from({length:15},(_,i)=>i+1))
export const sourceGroups = freeze(domesticOrderPermutation.map(index => [...original.sourceGroups[index-1]]))
export const wholeSourceIdentities = freeze({ u99dc: ID })
export const supportedWholeRoots = freeze(['u99dc'])
export { renderProgressive } from './progressive.mjs'
export const nativeApproval = false
export const runtimeApplied = false
export const nativeDirectionsReviewed = 0
export const nativeFramesReviewed = 0
export const nativeReplaysReviewed = 0
export function compileProgressive(trace, proof, identity) {
  assert.equal(arguments.length, 3, 'Trace, exact full5 proof and explicit original identity are required')
  assert.equal(sha(readFileSync(new URL('./progressive.mjs', import.meta.url))), ORIGINAL_COMPILER_SHA)
  assert.equal(sha(readFileSync(new URL(ID.file, import.meta.url))), ID.fileSHA256)
  assert.equal(sha(readFileSync(new URL('./engine-proof.json', import.meta.url))), HEADER_SHA)
  assert.deepEqual(identity, ID, 'Exact lower-case root/file/fileSHA256 original identity; no implicit attribution')
  assert.deepEqual(Object.keys(proof).sort(), FULL_KEYS, 'Exactly five proof fields')
  assert.deepEqual(proof, FULL, 'Immutable defaults, body, groups, engine revision and all eight engine hashes')
  assert.deepEqual(trace, FULL.trace, 'Pinned original trace including every polygon')
  const before = JSON.stringify(proof)
  const strokes = original.compileSourceWhole(sourceRoot, trace, proof, identity)
  assert.equal(JSON.stringify(proof), before, 'No input mutation')
  assert.equal(strokes.length, 15)
  return domesticOrderPermutation.map(index => strokes[index-1])
}
export function compileSourceWhole(root, trace, proof, identity) {
  assert.equal(arguments.length, 4, 'Explicit root plus trace/proof/identity are required')
  assert.equal(root, sourceRoot, 'Only the selected original base profile has this domestic-order candidate')
  return compileProgressive(trace, proof, identity)
}
