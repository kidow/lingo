import assert from 'node:assert/strict'
import { test } from 'node:test'
import { freshCard, MASTERED_STABILITY, type CardState, type Progress, type Rung } from './progress.ts'
import { countProgress, shelfOf, shiftDay, steady, type Day } from './tally.ts'

const phrases = new Set(['nice-to-meet-you'])

/** 외운 카드와 본 카드. 외움은 사다리 끝 + 21일이다 (lib/progress.ts) */
const done = (rung: Rung): CardState => ({
  rung,
  streak: 4,
  fsrs: { ...freshCard(new Date(0)), stability: MASTERED_STABILITY },
})
const seen = (rung: Rung = 1): CardState => ({ rung, streak: 0, fsrs: freshCard(new Date(0)) })

const progressOf = (cards: Record<string, CardState>): Progress => ({ version: 2, cards, introducedAt: {} })

test('카드 이름으로 칸을 가른다', () => {
  assert.equal(shelfOf('hanja:char:u6821:recognition', phrases), 'hanja')
  assert.equal(shelfOf('kana:hira:a:read', phrases), 'kana')
  assert.equal(shelfOf('trivia:ja:q12', phrases), 'trivia')
  // 단어와 표현은 이름이 둘 다 slug라 목록을 봐야 한다
  assert.equal(shelfOf('nice-to-meet-you', phrases), 'phrase')
  assert.equal(shelfOf('workbook', phrases), 'word')
})

test('단어·표현·상식은 카드 하나가 하나다', () => {
  const counts = countProgress(
    progressOf({
      workbook: done(3),
      advertiser: seen(),
      'nice-to-meet-you': seen(2),
      // 상식은 사다리가 한 칸이라 1칸에서 외움이 된다 (TRIVIA_LADDER)
      'trivia:ja:q1': done(1),
    }),
    phrases,
  )
  assert.deepEqual(counts.word, { seen: 2, mastered: 1 })
  assert.deepEqual(counts.phrase, { seen: 1, mastered: 0 })
  assert.deepEqual(counts.trivia, { seen: 1, mastered: 1 })
})

test('단어는 사다리 끝까지 가야 외움이다 — 21일을 넘겨도 문맥 칸이면 아니다', () => {
  const counts = countProgress(progressOf({ workbook: done(2) }), phrases)
  assert.deepEqual(counts.word, { seen: 1, mastered: 0 })
})

test('가나와 한능검은 글자를 센다 — 두 능력을 다 떼야 외움이다', () => {
  const counts = countProgress(
    progressOf({
      'kana:hira:a:read': done(1),
      'kana:hira:a:write': done(1),
      // 읽기만 뗀 글자. 카드로 세면 절반이 외움으로 잡힌다
      'kana:hira:i:read': done(1),
      'kana:hira:i:write': seen(),
      'hanja:char:u6821:recognition': done(1),
      'hanja:char:u6821:hun-eum': seen(),
    }),
    phrases,
  )
  assert.deepEqual(counts.kana, { seen: 2, mastered: 1 })
  assert.deepEqual(counts.hanja, { seen: 1, mastered: 0 })
})

test('빈 진도는 아무 칸도 안 만든다', () => {
  assert.deepEqual(countProgress(progressOf({}), phrases), {})
})

const day = (d: string, total: number, good = 0, again = 0): Day => ({ day: d, total, good, again })

test('공부한 날은 최근 7일 안에서만 센다', () => {
  const days = [day('2026-09-10', 99), day('2026-09-18', 5), day('2026-09-20', 3), day('2026-09-22', 2)]
  assert.equal(steady(days, '2026-09-22').active, 3, '09-10은 7일 밖이다')
})

test('하루 빠져도 무너지지 않는다 — 연속일이 아니다', () => {
  // 스트릭이었다면 19일이 비어 1로 떨어졌을 자리다 (spec.md §2)
  const days = [day('2026-09-17', 1), day('2026-09-18', 1), day('2026-09-20', 1), day('2026-09-21', 1)]
  assert.equal(steady(days, '2026-09-21').active, 4)
  assert.equal(steady(days, '2026-09-21').today, 1)
  assert.equal(steady(days, '2026-09-22').today, 0, '오늘 아직 안 했다')
})

test('막대는 오늘을 끝으로 7칸이고 빈 날은 0이다', () => {
  const { week } = steady([day('2026-09-22', 4), day('2026-09-18', 9), day('2026-09-10', 99)], '2026-09-22')
  assert.deepEqual(week.map((w) => w.day), [
    '2026-09-16', '2026-09-17', '2026-09-18', '2026-09-19', '2026-09-20', '2026-09-21', '2026-09-22',
  ])
  assert.deepEqual(week.map((w) => w.total), [0, 0, 9, 0, 0, 0, 4], '7일 밖(09-10)은 안 든다')
})

test('정답률은 최근 7일의 퀴즈만 센다', () => {
  const days = [
    day('2026-09-22', 10, 6, 2), // 소개 2장은 분모에 안 든다
    day('2026-09-20', 4, 2, 2),
    day('2026-09-01', 50, 0, 50), // 7일 밖
  ]
  assert.equal(steady(days, '2026-09-22').accuracy, 8 / 12)
  assert.equal(steady([day('2026-09-22', 5)], '2026-09-22').accuracy, null, '소개만 넘긴 날은 정답률이 없다')
})

test('날짜 더하기는 달과 해를 넘는다', () => {
  assert.equal(shiftDay('2026-03-01', -1), '2026-02-28')
  assert.equal(shiftDay('2026-12-31', 1), '2027-01-01')
})
