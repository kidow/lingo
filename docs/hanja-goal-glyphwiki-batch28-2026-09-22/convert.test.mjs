import assert from 'node:assert/strict'
import { test } from 'node:test'
import { kagePaths } from '../hanja-goal-glyphwiki-batch26-2026-09-22/convert.mjs'
const source = data => ({ root: 'line', records: { line: { data } } })
const options = { allowConnectionLines: true }
test('connection caps remain opt-in', () => {
  assert.throws(() => kagePaths(source('1:32:32:40:20:40:180'), [1]), /Unsupported head/)
})
test('documented vertical and horizontal connections retain exact source coordinates', () => {
  assert.deepEqual(kagePaths(source('1:32:32:40:20:40:180$1:2:2:40:60:140:60$1:32:0:140:20:140:190'), [1,2,3], options),
    ['M 20 10 L 20 90', 'M 20 30 L 70 30', 'M 70 10 L 70 95'])
})
test('axis mismatch, hooks, corners and undeclared shape codes remain rejected', () => {
  for (const row of ['1:2:2:40:20:40:180','1:32:32:40:20:140:20','1:32:4:40:20:40:180','1:12:0:40:20:40:180','3:0:0:20:20:40:40:60:60']) {
    assert.throws(() => kagePaths(source(row), [1], options))
  }
})
test('raw head and tail provenance is never discarded', () => {
  const input = source('1:32:32:40:20:40:180')
  const original = JSON.stringify(input)
  kagePaths(input, [1], options)
  assert.equal(JSON.stringify(input), original)
  assert.match(input.records.line.data, /^1:32:32:/)
})
