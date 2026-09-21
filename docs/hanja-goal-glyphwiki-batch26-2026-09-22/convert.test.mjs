import assert from 'node:assert/strict'
import { test } from 'node:test'
import { expandKage, kagePaths } from './convert.mjs'

test('부품의 중첩 배치와 원본 2차 곡선을 그대로 보존한다', () => {
  const source = { root: 'root', records: {
    root: { data: '99:0:0:20:40:120:140:curve' },
    curve: { data: '2:0:7:100:20:50:100:0:180' },
  } }
  assert.deepEqual(kagePaths(source, [1]), ['M 35 25 Q 22.5 45 10 65'])
  assert.deepEqual(expandKage(source)[0].points, [[35,25],[22.5,45],[10,65]])
})
test('원본 세로 선분과 2차 곡선이 한 획으로 유지된다', () => {
  const source = { root: 'root', records: { root: { data: '7:0:7:100:10:100:50:100:150:20:190' } } }
  assert.deepEqual(kagePaths(source, [1]), ['M 50 5 L 50 25 Q 50 75 10 95'])
})
test('갈고리·미지원 곡선·stretch·순환·누락 원본은 실패한다', () => {
  for (const data of ['1:32:4:152:38:152:182','4:0:5:10:20:30:40:50:60','99:205:0:0:0:200:200:part:0:0:0','99:0:0:0:0:200:200:root','99:0:0:0:0:200:200:missing']) {
    assert.throws(() => expandKage({ root: 'root', records: { root: { data } } }))
  }
})
test('부분 순서·중복·분할로 획수를 맞추지 않는다', () => {
  const source = { root: 'root', records: { root: { data: '1:0:0:0:0:200:0$1:0:0:0:0:0:200' } } }
  for (const order of [[1],[1,1],[1,2,2],[-1,2]]) assert.throws(() => kagePaths(source, order))
})
