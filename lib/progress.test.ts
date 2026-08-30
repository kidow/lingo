import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createEmptyCard, fsrs, Rating, type Card as FsrsCard } from 'ts-fsrs'
import {
  MASTERED_STABILITY,
  RUNG_BLANK,
  RUNG_CHOICE,
  RUNG_INTRO,
  emptyProgress,
  isMastered,
  masteredCount,
  masteryLabel,
  storeCard,
  type CardState,
  type Progress,
  type Rung,
} from './progress.ts'

/* ── 도구 ────────────────────────────────────────────────────────── */

const NOW = new Date(1_700_000_000_000)

/** stability를 직접 박은 카드. 문턱 근처를 정확히 짚으려면 필요하다 */
function card(rung: Rung, stability: number): CardState {
  const fsrs: FsrsCard = { ...createEmptyCard(NOW), stability }
  return { rung, streak: 0, fsrs: storeCard(fsrs) }
}

function progressOf(cards: Record<string, CardState>): Progress {
  return { ...emptyProgress(), cards }
}

/* ── isMastered ──────────────────────────────────────────────────── */

test('미소개 단어는 외운 것이 아니다', () => {
  assert.equal(isMastered(undefined), false)
})

test('문턱은 이상이다 — 정확히 21일이면 외운 것으로 센다', () => {
  assert.equal(isMastered(card(RUNG_BLANK, MASTERED_STABILITY)), true)
  assert.equal(isMastered(card(RUNG_BLANK, MASTERED_STABILITY - 0.1)), false)
})

test('stability가 아무리 높아도 rung이 덜 오르면 외운 것이 아니다', () => {
  assert.equal(isMastered(card(RUNG_CHOICE, 999)), false)
  assert.equal(isMastered(card(RUNG_INTRO, 999)), false)
})

/**
 * rung 2는 소개를 지나 정답 두 번이면 닿는다. 같은 날 반복은 stability를
 * 키우지 않으므로(경과 0일) 이 상태는 외운 것으로 세면 안 된다.
 */
test('한 세션 안의 연속 정답만으로는 문턱을 넘지 못한다', () => {
  const scheduler = fsrs()
  let fsrsCard = createEmptyCard(NOW)
  for (let i = 0; i < 5; i += 1) fsrsCard = scheduler.next(fsrsCard, NOW, Rating.Good).card

  assert.ok(fsrsCard.stability < MASTERED_STABILITY)
  assert.equal(isMastered({ rung: RUNG_BLANK, streak: 5, fsrs: storeCard(fsrsCard) }), false)
})

/** 날짜를 넘겨 복습하면 자란다. 문턱이 요구하는 것이 바로 이 경과다 */
test('예약일마다 맞히면 며칠 안에 문턱을 넘는다', () => {
  const scheduler = fsrs()
  let fsrsCard = createEmptyCard(NOW)
  let at = NOW
  for (let i = 0; i < 4; i += 1) {
    fsrsCard = scheduler.next(fsrsCard, at, Rating.Good).card
    at = fsrsCard.due
  }

  assert.ok(fsrsCard.stability >= MASTERED_STABILITY)

  // 여기서 한 번 틀리면 곧바로 빠진다. 숫자는 현재 상태를 뜻한다
  const lapsed = scheduler.next(fsrsCard, at, Rating.Again).card
  assert.ok(lapsed.stability < MASTERED_STABILITY)
})

/* ── masteredCount ───────────────────────────────────────────────── */

test('목록에 있는 것만 센다', () => {
  const progress = progressOf({
    cat: card(RUNG_BLANK, 30),
    dog: card(RUNG_BLANK, 30),
    bread: card(RUNG_CHOICE, 30),
  })

  assert.equal(masteredCount(progress, ['cat', 'dog', 'bread']), 2)
  assert.equal(masteredCount(progress, ['cat']), 1)
  assert.equal(masteredCount(progress, []), 0)
})

/** 트랙 필터가 바뀌면 진도에 출제되지 않는 slug가 남는다. 분자가 넘치면 안 된다 */
test('목록 밖에 남은 진도는 세지 않는다', () => {
  const progress = progressOf({ cat: card(RUNG_BLANK, 30), ghost: card(RUNG_BLANK, 30) })
  assert.equal(masteredCount(progress, ['cat']), 1)
})

test('빈 진도는 0이다', () => {
  assert.equal(masteredCount(emptyProgress(), ['cat', 'dog']), 0)
})

/* ── masteryLabel ────────────────────────────────────────────────── */

test('외운 것이 없으면 아무것도 쓰지 않는다', () => {
  assert.equal(masteryLabel(0, 1344), null)
})

test('분모가 0이면 아무것도 쓰지 않는다 — 그림이 없는 트랙', () => {
  assert.equal(masteryLabel(0, 0), null)
  assert.equal(masteryLabel(3, 0), null)
})

/** JLPT 분모 1344. 14개는 돼야 1%가 된다 */
test('반올림해서 0이 되는 구간은 <1%로 쓴다', () => {
  assert.equal(masteryLabel(1, 1344), '<1%')
  assert.equal(masteryLabel(6, 1344), '<1%')
  assert.equal(masteryLabel(7, 1344), '1%')
})

test('나머지는 정수 퍼센트다', () => {
  assert.equal(masteryLabel(168, 1344), '13%')
  assert.equal(masteryLabel(1344, 1344), '100%')
  // TOEIC은 분모가 386이라 같은 개수가 더 크게 잡힌다
  assert.equal(masteryLabel(4, 386), '1%')
})
