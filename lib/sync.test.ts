import assert from 'node:assert/strict'
import { test } from 'node:test'
import { initialState, recordAnswer, recordIntro, type EngineState } from './engine.ts'
import { applyPulled, RATING_AGAIN, RATING_GOOD, RATING_INTRO, replay, type Logged } from './sync.ts'
import { WORD_LADDER, type Rung } from './progress.ts'

/**
 * 재생이 엔진과 **같은 값**을 내야 한다. (lib/sync.ts, docs/progress-sync.md)
 *
 * 이게 틀리면 기기를 오갈 때마다 복습 간격이 조용히 어긋난다 — 화면에는
 * 아무 표시도 안 나고, 며칠 뒤 안 나와야 할 카드가 나오는 것으로만 보인다.
 * 그래서 한 기기에서 쭉 푼 결과와 그 로그를 재생한 결과를 맞대 놓고 잰다.
 */

const SLUG = 'cat'
const DAY = 24 * 60 * 60 * 1000
const START = Date.UTC(2026, 0, 1, 9)

/** 엔진을 굴리면서 같은 사건을 로그로도 적는다 — 피드가 하는 일 그대로다 */
function run(script: Array<'intro' | boolean>): { state: EngineState; log: Logged[] } {
  let state = initialState()
  const log: Logged[] = []

  script.forEach((step, day) => {
    const at = START + day * DAY

    if (step === 'intro') state = recordIntro(state, SLUG, at)
    else state = recordAnswer(state, SLUG, step, at, WORD_LADDER)

    log.push({
      slug: SLUG,
      at: new Date(at).toISOString(),
      rating: step === 'intro' ? RATING_INTRO : step ? RATING_GOOD : RATING_AGAIN,
      rung: state.progress.cards[SLUG]!.rung,
    })
  })

  return { state, log }
}

function same(script: Array<'intro' | boolean>, note: string) {
  const { state, log } = run(script)
  const engine = state.progress.cards[SLUG]!
  const replayed = replay(log)

  assert.equal(replayed.rung, engine.rung, `${note} — 칸`)
  assert.equal(replayed.streak, engine.streak, `${note} — 연속`)
  assert.equal(replayed.fsrs.stability, engine.fsrs.stability, `${note} — 안정도`)
  assert.equal(replayed.fsrs.difficulty, engine.fsrs.difficulty, `${note} — 난이도`)
  assert.equal(replayed.fsrs.reps, engine.fsrs.reps, `${note} — 횟수`)
  assert.equal(replayed.fsrs.lapses, engine.fsrs.lapses, `${note} — 실수`)
  assert.equal(replayed.fsrs.due, engine.fsrs.due, `${note} — 다음 차례`)
  assert.equal(replayed.fsrs.state, engine.fsrs.state, `${note} — 상태`)
}

test('소개만 지나간 카드', () => {
  same(['intro'], '소개')
  // 소개는 판정이 아니다. FSRS를 먹이지 않으므로 아직 한 번도 안 센다
  assert.equal(replay(run(['intro']).log).fsrs.reps, 0)
})

test('소개 뒤 정답이 이어지는 카드', () => {
  same(['intro', true], '한 번')
  same(['intro', true, true], '두 번')
  same(['intro', true, true, true], '꼭대기까지')
  same(['intro', true, true, true, true], '꼭대기에서 한 번 더')
})

test('틀린 자리가 섞인 카드', () => {
  same(['intro', true, false], '올랐다 내림')
  same(['intro', false], '첫 판에 틀림')
  same(['intro', true, true, false, true], '가운데서 틀림')
  same(['intro', false, false, false], '내리 틀림')
})

test('소개 없이 바로 답한 카드', () => {
  // 강등돼 내려온 카드나 상식 덱이 이 모양이다 (lib/progress.ts의 TRIVIA_LADDER)
  same([true], '첫 사건이 정답')
  same([false, true, true], '첫 사건이 오답')
})

test('연속 정답은 로그 꼬리에서 세어진다', () => {
  assert.equal(replay(run(['intro', true, true, true]).log).streak, 3)
  assert.equal(replay(run(['intro', true, true, false]).log).streak, 0, '틀리면 끊긴다')
  assert.equal(
    replay(run(['intro', false, true]).log).streak,
    1,
    '끊긴 뒤 다시 맞히면 거기서부터 센다',
  )
})

test('칸은 마지막 줄의 것을 쓴다', () => {
  // 사다리의 위아래 끝은 덱마다 달라서(lib/progress.ts) 재생 쪽에서 다시
  // 세지 않는다. 가장 최근의 답이 정한 값을 그대로 집는다
  const log = run(['intro', true, true]).log
  const bent: Logged[] = [...log.slice(0, -1), { ...log[log.length - 1]!, rung: 1 as Rung }]
  assert.equal(replay(bent).rung, 1)
})

test('두 기기가 갈라져도 합치면 하나로 모인다', () => {
  // 같은 카드를 폰과 노트북에서 번갈아 풀었다. 서버에는 둘이 섞여 시간순으로
  // 쌓이고, 그것을 재생한 값이 «처음부터 한 기기에서 푼 것»과 같아야 한다
  const script: Array<'intro' | boolean> = ['intro', true, false, true, true]
  const { log } = run(script)

  const phone = log.filter((_, i) => i % 2 === 0)
  const laptop = log.filter((_, i) => i % 2 === 1)
  const merged = [...phone, ...laptop].sort((a, b) => a.at.localeCompare(b.at))

  assert.deepEqual(replay(merged), replay(log))
  assert.equal(merged.length, log.length, '섞는 동안 잃은 줄이 없다')
})

test('받는 사이 여기서 건드린 카드는 덮지 않는다', () => {
  // 앱을 열자마자 넘긴 경우다. 받기 시작할 때의 진도(before)와 받아 온 것이
  // 도착했을 때의 진도(now) 사이에 cat을 여기서 풀었다. 받아 온 cat에는 그
  // 복습이 없다 — 덮으면 방금 푼 것이 사라진다
  const start = run(['intro']).state
  const before = start.progress.cards
  const now = recordAnswer(start, SLUG, true, START + DAY, WORD_LADDER).progress
  const remote = replay(run(['intro', false]).log)
  const other = replay(run(['intro']).log)

  const { progress, clean } = applyPulled(now, { cards: { [SLUG]: remote, dog: other }, cursor: 'x' }, before)

  assert.equal(progress.cards[SLUG], now.cards[SLUG], '여기서 푼 카드는 그대로')
  assert.equal(progress.cards.dog, other, '안 건드린 카드는 받아 온 것으로')
  assert.equal(clean, false, '커서를 옮기지 말라고 알린다 — 다음에 다시 받는다')
})

test('받는 사이 아무것도 안 건드렸으면 다 얹고 커서를 옮겨도 된다', () => {
  const start = run(['intro']).state
  const remote = replay(run(['intro', true]).log)
  const { progress, clean } = applyPulled(start.progress, { cards: { [SLUG]: remote }, cursor: 'x' }, start.progress.cards)
  assert.equal(progress.cards[SLUG], remote)
  assert.equal(clean, true)
})
