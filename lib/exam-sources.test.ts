import assert from 'node:assert/strict'
import { test } from 'node:test'
import { EXAM_SOURCES, examSourcesFor, localDay } from './exam-sources.ts'
import { TRACK_IDS } from './track.ts'

test('id는 유일하고 slug 모양이다', () => {
  const ids = EXAM_SOURCES.map((source) => source.id)
  assert.equal(new Set(ids).size, ids.length)
  for (const id of ids) assert.match(id, /^[a-z0-9-]+$/)
})

test('링크는 https이고 트랙은 있는 트랙이다', () => {
  for (const source of EXAM_SOURCES) {
    assert.equal(new URL(source.url).protocol, 'https:', source.id)
    assert.ok(TRACK_IDS.includes(source.track), source.id)
  }
})

test('마감일은 YYYY-MM-DD다', () => {
  for (const source of EXAM_SOURCES.filter((entry) => entry.until))
    assert.match(source.until!, /^\d{4}-\d{2}-\d{2}$/, source.id)
})

// 어느 트랙에서 열어도 빈 목록이 서지 않아야 한다. 공식 자료는 트랙마다 하나는 있다
test('트랙마다 공식 출처가 하나 이상 있다', () => {
  for (const track of TRACK_IDS) {
    const official = EXAM_SOURCES.filter(
      (source) => source.track === track && (source.kind === 'past' || source.kind === 'mock'),
    )
    assert.ok(official.length > 0, track)
  }
})

test('무료가 먼저 서고, 그 안에서 공식 기출이 맨 앞이다', () => {
  const hsk = examSourcesFor('hsk', '2026-09-27')
  const firstPaid = hsk.findIndex((source) => source.paid || source.bundled)
  assert.ok(firstPaid > 0)
  assert.ok(hsk.slice(firstPaid).every((source) => source.paid || source.bundled))
  assert.equal(hsk[0].kind, 'past')
})

test('마감이 지난 행사는 빠지고 마감일 당일은 남는다', () => {
  const on = examSourcesFor('hsk', '2026-10-16').map((source) => source.id)
  const after = examSourcesFor('hsk', '2026-10-17').map((source) => source.id)
  assert.ok(on.includes('hsk-hackers-ibt'))
  assert.ok(!after.includes('hsk-hackers-ibt'))
})

test('다른 트랙의 출처는 섞이지 않는다', () => {
  assert.ok(examSourcesFor('jlpt', '2026-09-27').every((source) => source.track === 'jlpt'))
})

test('localDay는 기기 시간대의 날짜를 쓴다', () => {
  assert.equal(localDay(new Date(2026, 0, 5, 23, 59)), '2026-01-05')
})
