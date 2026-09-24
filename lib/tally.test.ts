import assert from 'node:assert/strict'
import { test } from 'node:test'
import { freshCard, MASTERED_STABILITY, type CardState, type Progress, type Rung } from './progress.ts'
import { countProgress, shelfOf } from './tally.ts'

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
