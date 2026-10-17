import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'

const hash = value => createHash('sha256').update(value).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))), '8a1c0d482e643e18cc3533682f7715930b6c7d9ba1bfbb30c67d81442ba72c85', 'Original source compiler bytes')
export const sourceOrderPermutation = Object.freeze([1,2,4,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
export const sourceGroups = Object.freeze(sourceOrderPermutation.map(index => Object.freeze([...original.sourceGroups[index - 1]])))
export const nativeApproval = false
export const runtimeApplied = false

export function compileSourceWhole(root,trace,proof,fileIdentity) {
  assert.equal(root,'u8600-ue0102','Only the explicitly selected original VS2 whole may compile')
  assert.deepEqual(fileIdentity,original.wholeSourceIdentities[root],'Exact root/file/fileSHA256 identity required')
  assert.equal(hash(readFileSync(new URL(fileIdentity.file,import.meta.url))),fileIdentity.fileSHA256)
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','sourceProofFile','sourceProofFileSHA256','sourceRoot','trace'])
  assert.equal(hash(JSON.stringify(proof)), 'fd46ea6e994260c722d029b72952b9118e7049b911231627e2427198c32e88b4', 'Complete original eight-field source/header attribution')
  const before = JSON.stringify({trace,proof,fileIdentity})
  const base = original.compileSourceWhole(root,trace,proof,fileIdentity)
  assert.equal(base.length,20)
  assert.equal(base.flat().length,21)
  assert.equal(hash(JSON.stringify(base)), '48d841d9ecd0772f5d06dabbde1771f69989a1b61c3b072b0a4fd4abd3784768')
  const result = sourceOrderPermutation.map(index => base[index - 1])
  assert.deepEqual([...sourceOrderPermutation].sort((a,b) => a - b),Array.from({length:20},(_,i) => i + 1))
  for (let i = 0; i < result.length; i++) assert.equal(hash(JSON.stringify(result[i])),hash(JSON.stringify(base[sourceOrderPermutation[i] - 1])))
  assert.deepEqual(result.flat().map(mask => JSON.stringify(mask)).sort(),base.flat().map(mask => JSON.stringify(mask)).sort(),'Every complete original mask exactly once')
  assert.equal(result.flat().flatMap(mask => mask.outline.match(/M[^Z]+Z/g) || []).length,41)
  assert.equal(hash(JSON.stringify(result)), 'babd04963c177be1328660e1ddc85035afc65f702e2e712fc2a5659ffa05e891')
  assert.equal(JSON.stringify({trace,proof,fileIdentity}),before)
  return result
}
export function compileProgressive(trace,proof,fileIdentity) {
  return compileSourceWhole('u8600-ue0102',trace,proof,fileIdentity)
}
