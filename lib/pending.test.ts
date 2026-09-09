import assert from 'node:assert/strict'
import { test } from 'node:test'
import { pendingIn } from './pending.ts'

const known = new Set(['plate', 'cracked', 'compass', 'hour', 'food', 'city'])
const files = new Set(['food', 'city', 'quality'])
const find = (text: string) => pendingIn(text, known, files)

test('표 줄에서 뽑는다', () => {
  assert.deepEqual(find('| `cracked`(금 간) | 64 | 접시를 그린다 |'), [{ slug: 'cracked', line: 1 }])
})

test('목록 줄에서도 뽑는다', () => {
  assert.deepEqual(find('- `compass`는 시계 얼굴을 쓴다'), [{ slug: 'compass', line: 1 }])
})

test('산문 줄은 버린다', () => {
  // 「hour는 어제 뺐다」처럼 끝난 일을 적은 자리가 여덟이었다 (2026-09-10)
  assert.deepEqual(find('`hour`는 2026-09-09에 뺐다. 57 → 116이다.'), [])
})

test('굵게의 별표는 목록이 아니다', () => {
  assert.deepEqual(find('**`hour`는 뺐다.** 시계 얼굴 대신 향으로 갔다'), [])
})

test('끝났다고 적은 제목 아래는 통째로 건너뛴다', () => {
  const text = ['## 고쳤다 (2026-09-10)', '', '| `compass` | 45 → 138 |'].join('\n')
  assert.deepEqual(find(text), [])
})

test('다음 제목에서 다시 본다', () => {
  const text = ['## 고쳤다', '| `compass` | 끝 |', '## 남은 것', '| `plate` | 아직 |'].join('\n')
  assert.deepEqual(find(text), [{ slug: 'plate', line: 4 }])
})

test('취소선을 그은 표 줄은 버린다', () => {
  assert.deepEqual(find('| ~~`compass`~~ | 45 → 138 | **끝냈다** |'), [])
})

test('헛것으로 판정한 줄도 버린다', () => {
  assert.deepEqual(find('- `compass`와 `plate`는 구조만 닮았을 뿐 물건이 다르다'), [])
})

test('파일 이름이 홀로 서면 버린다', () => {
  // `food`는 개념(먹을거리)이자 파일 이름이다. 문서는 파일을 가리키는 데 더 자주 쓴다
  assert.deepEqual(find('| `food` 46 · `city` 24 |'), [])
})

test('파일을 붙여 적으면 개념으로 본다', () => {
  assert.deepEqual(find('| `food/plate`(접시) | 64 |'), [{ slug: 'plate', line: 1 }])
})

test('모르는 이름은 버린다', () => {
  // 표기나 독일어 낱말이 backtick에 들어 있는 자리가 많다
  assert.deepEqual(find('| `abendlich` | `evitar` |'), [])
})

test('한 문서에 여러 번 나와도 처음 줄만 남긴다', () => {
  const text = ['| `plate` | 첫 줄 |', '| `plate` | 다시 |'].join('\n')
  assert.deepEqual(find(text), [{ slug: 'plate', line: 1 }])
})
