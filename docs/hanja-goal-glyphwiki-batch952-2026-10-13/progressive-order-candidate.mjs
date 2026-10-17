import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './strict-native-adapter.mjs'
export * from './strict-native-adapter.mjs'

const hash = value => createHash('sha256').update(value).digest('hex')
assert.equal(hash(readFileSync(new URL('./strict-native-adapter.mjs',import.meta.url))), '43d43e5c4ba157f8289810ffd004792e08e1dab06ce91d7701d2e32bec7f8d5c', 'Original strict adapter bytes')
export const sourceOrderPermutation = Object.freeze([1,2,4,5,3,6,7,8,9,10,11,12,13,14,15,16,17])
export const sourceGroups = Object.freeze(sourceOrderPermutation.map(index => Object.freeze([...original.sourceGroups[index - 1]])))
export const sourceOrderStatus = 'source-only-original-complete-mask-permutation-native-pending'

export function compileProgressive(trace,proof,identity) {
  const before = JSON.stringify({trace,proof,identity})
  const base = original.compileProgressive(trace,proof,identity)
  assert.equal(base.length,17)
  assert.equal(base.flat().length,18)
  assert.equal(hash(JSON.stringify(base)), 'a6ce1b6ab4d215d3d117b17bb42f75428bf79bbd4051a6c629884590ccd38033', 'Original complete mask bytes')
  const result = sourceOrderPermutation.map(index => base[index - 1])
  assert.deepEqual([...sourceOrderPermutation].sort((a,b) => a - b),Array.from({length:17},(_,i) => i + 1))
  assert.equal(result.flat().length,18)
  assert.equal(result.flat().flatMap(mask => mask.outline.match(/M[^Z]+Z/g) || []).length,37)
  for (let i = 0; i < result.length; i++) assert.equal(hash(JSON.stringify(result[i])),hash(JSON.stringify(base[sourceOrderPermutation[i] - 1])))
  assert.deepEqual(result.flat().map(mask => JSON.stringify(mask)).sort(),base.flat().map(mask => JSON.stringify(mask)).sort(), 'Every original complete mask exactly once')
  assert.equal(hash(JSON.stringify(result)), 'fc6e4eb27426a20b029f57736acfecd034361876333271cf9e32858abb9908cb')
  assert.equal(JSON.stringify({trace,proof,identity}),before)
  return result
}
