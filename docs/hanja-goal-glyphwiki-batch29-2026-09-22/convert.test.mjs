import assert from 'node:assert/strict'
import { test } from 'node:test'
import { kagePaths } from '../hanja-goal-glyphwiki-batch26-2026-09-22/convert.mjs'
const source = data => ({ root: 'shape', records: { shape: { data } } })
const bend = '3:32:0:40:30:40:160:170:160'
const options = { allowConnectionLines: true, allowBentStrokes: true }
test('connected bend remains opt-in', () => {
  assert.throws(() => kagePaths(source(bend), [1]), /Unsupported KAGE/)
  assert.throws(() => kagePaths(source(bend), [1], { allowConnectionLines: true }), /Unsupported KAGE/)
})
test('default source corner generates one continuous rounded path', () => {
  assert.deepEqual(kagePaths(source(bend), [1], options),
    ['M 20 15 L 20 75 Q 20 80 25 80 L 85 80'])
  assert.deepEqual(kagePaths(source('1:0:32:100:20:100:57'), [1], options), ['M 50 10 L 50 28.5'])
})
test('hooks, alternate caps, wrong axes, reversed legs and short corners remain rejected', () => {
  for (const row of ['3:32:5:40:30:40:160:170:160', '3:0:0:40:30:40:160:170:160',
    '3:32:0:40:30:50:160:170:160', '3:32:0:40:180:40:160:170:160',
    '3:32:0:40:30:40:160:20:160', '3:32:0:40:150:40:160:170:160',
    '3:32:0:40:30:40:160:48:160', '1:0:32:100:20:140:57']) {
    assert.throws(() => kagePaths(source(row), [1], options))
  }
})
test('declared source metadata is preserved and source points are not overwritten', () => {
  const input = source(bend), original = JSON.stringify(input)
  kagePaths(input, [1], options)
  assert.equal(JSON.stringify(input), original)
})
test('duplicate stroke order and undeclared component stretch remain rejected', () => {
  assert.throws(() => kagePaths(source(bend), [1,1], options))
  const input = {root:'root', records:{root:{data:'99:1:0:0:0:200:200:shape'},shape:{data:bend}}}
  assert.throws(() => kagePaths(input,[1],options), /stretch/)
})
