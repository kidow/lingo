import assert from 'node:assert/strict'
import { test } from 'node:test'
import { busyMark, busyNote, dirtyFiles } from './busy.ts'

test('git 출력에서 파일 이름만 남긴다', () => {
  const dirty = dirtyFiles('content/scene.json\ncontent/quality.json\n')
  assert.deepEqual([...dirty].sort(), ['quality', 'scene'])
})

test('json이 아닌 줄과 빈 줄은 버린다', () => {
  // 인자에 -- content 를 줘도 다른 경로가 섞여 오는 자리가 있다
  const dirty = dirtyFiles('\ncontent/scene.json\nlib/audio-have.ts\npublic/concepts/a.webp\n')
  assert.deepEqual([...dirty], ['scene'])
})

test('만져지는 파일에만 표시가 붙는다', () => {
  const dirty = dirtyFiles('content/action.json\n')
  assert.equal(busyMark('action', dirty), ' ⟨손대는 중⟩')
  assert.equal(busyMark('scene', dirty), '')
})

test('파일을 모르면 표시하지 않는다', () => {
  // 개념이 어느 파일에 있는지 못 찾은 자리다. 모르면 조용한 편이 낫다
  assert.equal(busyMark(undefined, dirtyFiles('content/action.json\n')), '')
})

test('만져지는 파일이 없으면 설명도 없다', () => {
  assert.equal(busyNote(dirtyFiles('')), '')
})

test('설명에는 파일 이름과 하지 말아야 할 일이 들어간다', () => {
  const note = busyNote(dirtyFiles('content/time.json\ncontent/action.json\n'))
  assert.match(note, /action time/)
  assert.match(note, /덮습니다/)
})
