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
  loadProgress,
  masteredCount,
  masteryLabel,
  progressKey,
  saveProgress,
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

/* ── 저장소 ──────────────────────────────────────────────────────── */

/**
 * localStorage 스텁. `limit`을 넘기면 브라우저처럼 던진다.
 *
 * 진도는 서버에 사본이 없어서 여기서 잘못되면 되돌릴 방법이 없다. 그래서
 * 깨진 값·모르는 버전·용량 초과 셋을 다 짚는다.
 */
function useStore(limit = Infinity) {
  const store = new Map<string, string>()
  ;(globalThis as { localStorage?: unknown }).localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      if (value.length > limit) throw new Error('QuotaExceededError')
      store.set(key, value)
    },
    removeItem: (key: string) => store.delete(key),
  }
  return store
}

const stored = (rung: Rung): CardState => ({ rung, streak: 1, fsrs: storeCard(createEmptyCard(NOW)) })

test('깨진 카드는 그것만 빠지고 나머지 진도는 산다', () => {
  // fsrs가 없는 카드 하나가 isMastered에서 던져 흰 화면이 됐다.
  // 진도는 그대로라 새로고침해도 같은 자리에서 또 죽었다
  const store = useStore()
  store.set(
    progressKey('jlpt'),
    JSON.stringify({
      version: 2,
      cards: { broken: { rung: 3, streak: 1 }, alive: stored(3) },
      introducedAt: {},
    }),
  )
  const progress = loadProgress('jlpt')
  assert.deepEqual(Object.keys(progress.cards), ['alive'])
  assert.doesNotThrow(() => masteredCount(progress, ['broken', 'alive']))
})

test('rung이 사다리 밖이면 그 카드는 안 읽는다', () => {
  const store = useStore()
  store.set(
    progressKey('jlpt'),
    JSON.stringify({
      version: 2,
      cards: { bad: { ...stored(3), rung: 9 }, worse: { ...stored(3), rung: '3' }, ok: stored(2) },
      introducedAt: {},
    }),
  )
  assert.deepEqual(Object.keys(loadProgress('jlpt').cards), ['ok'])
})

test('모르는 버전이어도 버리지 않는다', () => {
  // 새 버전을 쓰다 캐시된 옛 코드로 돌아가면 실제로 일어난다.
  // 조용히 비우면 그때 몇 달치 복습 간격이 사라진다
  const store = useStore()
  store.set(
    progressKey('jlpt'),
    JSON.stringify({ version: 9, cards: { cat: stored(3) }, introducedAt: { cat: 1 } }),
  )
  assert.deepEqual(Object.keys(loadProgress('jlpt').cards), ['cat'])
})

test('v1의 철자 칸은 3으로 올린다', () => {
  // 사다리 가운데에 문맥 칸이 끼면서 철자가 2에서 3으로 밀렸다
  const store = useStore()
  store.set(
    progressKey('jlpt'),
    JSON.stringify({
      version: 1,
      cards: { top: stored(2), mid: stored(1) },
      introducedAt: {},
    }),
  )
  const cards = loadProgress('jlpt').cards
  assert.equal(cards.top.rung, RUNG_BLANK)
  assert.equal(cards.mid.rung, RUNG_CHOICE)
})

test('쓰레기가 들어 있으면 빈 진도로 시작한다', () => {
  const store = useStore()
  store.set(progressKey('jlpt'), 'not json')
  assert.deepEqual(loadProgress('jlpt').cards, {})
})

test('신선도가 다한 자리는 저장하지 않는다', () => {
  // 반감기가 10분이라 하루면 가산점이 0이다. slug마다 영원히 들고 있을 이유가 없다
  const store = useStore()
  const now = NOW.getTime()
  const progress: Progress = {
    ...emptyProgress(),
    introducedAt: { fresh: now - 60_000, stale: now - 3 * 24 * 60 * 60 * 1000 },
  }
  saveProgress('jlpt', progress, now)
  const saved = JSON.parse(store.get(progressKey('jlpt')) ?? '{}') as Progress
  assert.deepEqual(Object.keys(saved.introducedAt), ['fresh'])
})

test('저장하지 못하면 그 사실을 알려준다', () => {
  // 여덟 트랙을 다 공부하면 6MB가 되는데 한도는 대개 5MB다.
  // 조용히 넘기면 그때부터 공부한 것이 전부 날아간다
  useStore(50)
  const big: Progress = { ...emptyProgress(), cards: { a: stored(3), b: stored(3) } }
  assert.equal(saveProgress('jlpt', big), false)
  assert.equal(saveProgress('jlpt', emptyProgress()), true)
})
