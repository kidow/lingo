import { fsrs, Rating } from 'ts-fsrs'
import type { Entry } from './entries.ts'
import {
  RUNG_BLANK,
  RUNG_CHOICE,
  RUNG_CLOZE,
  RUNG_INTRO,
  RUNG_MAX,
  emptyProgress,
  freshCard,
  storeCard,
  type CardState,
  type Progress,
  type Rung,
} from './progress.ts'
import {
  buildBlank,
  buildChoice,
  buildCloze,
  buildIntro,
  buildListen,
  canBlank,
  canCloze,
  isClozeTurn,
  isListenTurn,
  type Question,
} from './quiz.ts'

/**
 * 학습 엔진. (spec.md §6)
 *
 * 두 층으로 나뉜다.
 *   시간 층 — 이 카드를 오늘 꺼낼까 2주 뒤에 꺼낼까. ts-fsrs가 맡는다
 *   피드 층 — 지금 이 자리에서 몇 장 뒤에 다시 꽂을까. 여기서 맡는다
 *
 * FSRS의 망각곡선은 일 단위다. 방금 맞힌 카드를 3분 뒤에 물으면 회상확률이
 * 거의 안 떨어져 가중치가 0에 가깝다. 한 번 앉아서 스와이프하는 동안의
 * 재등장은 FSRS가 못 정하므로 예약 큐가 대신한다.
 *
 * 모든 함수는 순수하다. 난수와 시각을 주입받아 테스트 가능하게 둔다.
 */

/** 답한 카드를 몇 장 뒤에 다시 꽂을까 */
export const DISTANCE = {
  intro: 3,
  correct: 8,
  /** 연속 2회 이상 맞히면 더 멀리 */
  streak: 20,
  wrong: 2,
} as const

/**
 * 사다리 꼭대기에서 이만큼 연속으로 맞히면 그 세션 동안 예약을 놓아준다.
 *
 * 4인 이유는 꼭대기(rung 3)에 닿는 데 정답 세 번이 들고, 거기서 **한 번 더**
 * 맞혀야 "오늘은 됐다"고 볼 수 있기 때문이다. 그 아래에서 놓아주면 방금 처음
 * 맞힌 낱말이 세션에서 사라진다.
 */
export const SETTLED_STREAK = 4

/** 매 카드마다 이 확률로 새 단어를 꽂는다. 조건부가 아니라 고정 비율이다 */
export const NEW_RATE = 0.15
/** 최근 이만큼은 다시 뽑지 않는다 */
export const COOLDOWN = 5
/** 갓 소개한 단어에 주는 가중치 가산점과 감쇠 반감기(ms) */
export const FRESH_BOOST = 1.5
export const FRESH_HALFLIFE = 10 * 60 * 1000

const scheduler = fsrs()

export type EngineState = {
  progress: Progress
  /** 지금까지 낸 카드 수 */
  cursor: number
  /** slug → 이 cursor에 다시 낸다 */
  reservations: Record<string, number>
  /** 최근에 낸 slug들. 앞이 오래된 것 */
  recent: string[]
}

export const initialState = (progress: Progress = emptyProgress()): EngineState => ({
  progress,
  cursor: 0,
  reservations: {},
  recent: [],
})

export type Rng = () => number
export type Clock = () => number

/* ── 뽑기 ────────────────────────────────────────────────────────── */

/**
 * 다음 카드를 고른다.
 *
 *   1. 예약이 도래한 카드가 있으면 그것
 *   2. 없으면 NEW_RATE 확률로 아직 안 본 단어
 *   3. 나머지는 (1 - 회상확률) 가중 추출. 최근 COOLDOWN장은 제외
 *
 * 낼 게 없으면 null. 단어가 0개일 때만 일어난다.
 */
export function pickNext(
  state: EngineState,
  entries: Entry[],
  rng: Rng,
  now: number,
): Entry | null {
  if (entries.length === 0) return null

  const bySlug = new Map(entries.map((e) => [e.concept.slug, e]))

  // 1. 예약 도래 — 가장 오래 기다린 것부터
  const due = Object.entries(state.reservations)
    .filter(([slug, at]) => at <= state.cursor && bySlug.has(slug))
    .sort((a, b) => a[1] - b[1])
  if (due.length > 0) return bySlug.get(due[0][0]) ?? null

  // 쿨다운이 단어 수보다 크면 후보가 전멸해 방금 낸 카드를 또 내게 된다.
  // 풀 크기에 맞춰 줄여 항상 최소 한 장은 남긴다
  const cooldown = Math.min(COOLDOWN, Math.max(entries.length - 1, 0))
  const recent = new Set(state.recent.slice(state.recent.length - cooldown))
  const fresh = (e: Entry) => !recent.has(e.concept.slug)

  const unseen = entries.filter((e) => !state.progress.cards[e.concept.slug] && fresh(e))
  const seen = entries.filter((e) => state.progress.cards[e.concept.slug] && fresh(e))

  // 2. 신규 유입은 고정 비율이다. 복습이 끝나기를 기다리지 않는다 —
  //    노벨티를 조건부로 미루면 피드가 굳는다
  if (unseen.length > 0 && (seen.length === 0 || rng() < NEW_RATE)) {
    return unseen[Math.floor(rng() * unseen.length)]
  }

  // 3. 가중 추출
  if (seen.length > 0) return weightedPick(seen, state.progress, rng, now)
  if (unseen.length > 0) return unseen[Math.floor(rng() * unseen.length)]

  // 쿨다운에 전부 걸렸다. 그중 가장 오래된 것을 낸다
  const oldest = entries.find((e) => e.concept.slug === state.recent[0])
  return oldest ?? entries[Math.floor(rng() * entries.length)]
}

/** 회상확률이 낮을수록, 갓 소개한 것일수록 자주 나온다 */
function weightedPick(pool: Entry[], progress: Progress, rng: Rng, now: number): Entry {
  const weights = pool.map((entry) => weightOf(entry, progress, now))
  const total = weights.reduce((sum, w) => sum + w, 0)
  if (total <= 0) return pool[Math.floor(rng() * pool.length)]

  let roll = rng() * total
  for (let i = 0; i < pool.length; i += 1) {
    roll -= weights[i]
    if (roll <= 0) return pool[i]
  }
  return pool[pool.length - 1]
}

export function weightOf(entry: Entry, progress: Progress, now: number): number {
  const slug = entry.concept.slug
  const card = progress.cards[slug]
  if (!card) return 1

  const retrievability = scheduler.get_retrievability(card.fsrs, new Date(now), false)
  // 잊었을 확률이 곧 가중치다. 완전히 잊은 것도 0이 되지 않게 바닥을 둔다
  let weight = Math.max(1 - retrievability, 0.02)

  // 갓 소개한 단어는 한동안 자주 나오다 서서히 정상 주기로 편입된다
  const introduced = progress.introducedAt[slug]
  if (introduced) {
    const age = Math.max(now - introduced, 0)
    weight += FRESH_BOOST * Math.pow(0.5, age / FRESH_HALFLIFE)
  }
  return weight
}

/* ── 문항 만들기 ─────────────────────────────────────────────────── */

/**
 * rung이 카드 종류를 정한다.
 *
 * 못 만드는 카드는 **재인으로 떨어뜨린다.** 한 글자짜리 낱말은 철자 칸을 못
 * 만들고, 상황 표현은 문장이라 철자 칸으로 올라가지 않으며, 발음이 없는 낱말은
 * 듣기 칸을 못 만든다 — 그런 카드도 복습은 돌아야 하므로 만들 수 있는 것 중
 * 가장 가까운 것을 낸다. 상황 표현은 철자 칸에서 문맥 칸으로 내려앉는다.
 */
export function questionFor(entry: Entry, state: EngineState, entries: Entry[]): Question {
  const card = state.progress.cards[entry.concept.slug]
  const rung: Rung = card?.rung ?? RUNG_INTRO
  const attempt = card?.fsrs.reps ?? 0

  if (rung === RUNG_INTRO) return buildIntro(entry)

  /**
   * 철자 칸에는 문맥이 세 번에 한 번 끼어든다.
   *
   * 꼭대기는 위로 갈 데가 없어서 한 낱말이 거기 앉으면 남은 복습이 전부 한 글자
   * 빈칸이었다. 아래 두 칸은 듣기와 번갈아 도는데 여기만 한 모양이었다.
   * 듣기를 넣지 않는 것은 듣기가 재인 — 사다리에서 두 칸 아래이기 때문이다.
   */
  if (rung === RUNG_BLANK && canBlank(entry)) {
    if (isClozeTurn(entry, attempt) && canCloze(entry)) return buildCloze(entry, entries, attempt)
    return buildBlank(entry, attempt)
  }

  /**
   * 듣기는 재인·문맥 두 칸에서 번갈아 끼어든다.
   *
   * 재인 칸에서는 **같은 재인을 다른 감각으로** 하려는 것이고, 문맥 칸에서는
   * 이유가 하나 더 있다 — **같은 문장이 반복되는 것을 줄인다.** 예문이 둘이면
   * 회차로 돌아가지만 세 번째 회차에서 첫 문장이 되돌아온다. 엔진을 3,000장
   * 돌려 보면 문맥 카드 600장이 낱말 열댓 개에 몰리고 한 낱말이 최대 156번까지
   * 나온다 — 그 절반을 듣기가 가져간다.
   */
  const listenTurn = isListenTurn(entry, attempt)

  if (rung >= RUNG_CLOZE && canCloze(entry)) {
    return listenTurn ? buildListen(entry, entries, attempt) : buildCloze(entry, entries, attempt)
  }
  if (listenTurn) return buildListen(entry, entries, attempt)
  return buildChoice(entry, entries, attempt)
}

/** 뽑기 + 문항 만들기 + 낸 것으로 기록. 상태를 새로 만들어 돌려준다 */
export function nextQuestion(
  state: EngineState,
  entries: Entry[],
  rng: Rng,
  now: number,
): { question: Question; state: EngineState } | null {
  const entry = pickNext(state, entries, rng, now)
  if (!entry) return null

  const question = questionFor(entry, state, entries)
  const slug = entry.concept.slug

  const reservations = { ...state.reservations }
  delete reservations[slug]

  return {
    question,
    state: {
      ...state,
      cursor: state.cursor + 1,
      reservations,
      recent: [...state.recent, slug].slice(-COOLDOWN),
    },
  }
}

/* ── 기록 ────────────────────────────────────────────────────────── */

/**
 * 소개 카드를 지나갔다. 넘기는 순간 학습으로 인정한다.
 * 판정이 없으므로 FSRS 등급을 매기지 않고 카드만 만든다.
 */
export function recordIntro(state: EngineState, slug: string, now: number): EngineState {
  const existing = state.progress.cards[slug]

  // 강등돼 rung 0으로 내려온 카드도 소개를 지나가면 다시 재인 칸으로 올라간다.
  // 여기서 멈추면 그 단어는 소개 카드로 영원히 맴돈다 — 실제로 맴돌았다.
  const card = existing ?? { rung: RUNG_INTRO, streak: 0, fsrs: freshCard(new Date(now)) }

  return {
    ...state,
    progress: {
      ...state.progress,
      cards: { ...state.progress.cards, [slug]: { ...card, rung: RUNG_CHOICE } },
      // 신선도 부스트는 진짜 처음 본 시각을 쓴다. 다시 만난 것은 새것이 아니다
      introducedAt: existing
        ? state.progress.introducedAt
        : { ...state.progress.introducedAt, [slug]: now },
    },
    reservations: { ...state.reservations, [slug]: state.cursor + DISTANCE.intro },
  }
}

/**
 * 퀴즈에 답했다.
 *
 * 정답 → rung +1 (최대 2), streak +1, Rating.Good
 * 오답 → rung -1 (최소 0), streak 0, Rating.Again
 *
 * 오답은 한 칸만 내린다. 바닥까지 떨어뜨리면 승률이 무너지고,
 * 승률이 무너지면 무한 스와이프의 동력이 끊긴다.
 */
export function recordAnswer(
  state: EngineState,
  slug: string,
  correct: boolean,
  now: number,
): EngineState {
  const previous = state.progress.cards[slug]
  const base: CardState = previous ?? {
    rung: RUNG_CHOICE,
    streak: 0,
    fsrs: freshCard(new Date(now)),
  }

  const graded = scheduler.next(base.fsrs, new Date(now), correct ? Rating.Good : Rating.Again)

  const rung = (
    correct ? Math.min(base.rung + 1, RUNG_MAX) : Math.max(base.rung - 1, RUNG_INTRO)
  ) as Rung
  const streak = correct ? base.streak + 1 : 0

  const distance = !correct
    ? DISTANCE.wrong
    : streak >= 2
      ? DISTANCE.streak
      : DISTANCE.correct

  /**
   * 사다리를 다 오르고 내리 맞히는 카드는 **예약하지 않는다.**
   *
   * 예약 큐는 뽑기의 1순위라 가중치를 통째로 건너뛴다. 그래서 맞힐 때마다
   * 다시 예약하면 꼭대기에 앉은 낱말이 20장마다 **영원히** 돌아온다 — 맞혀도
   * 한 글자 카드가 계속 나오던 이유가 이것이었다. 예약은 아직 배우는 중인
   * 카드를 한 세션 안에 다시 만나게 하려는 장치이고, 그 위의 재등장 간격은
   * 날짜 단위라 FSRS가 정한다. 놓아주면 회상확률이 1에 가까워 가중치가
   * 바닥(0.02)에 붙고, 하루가 지나 확률이 떨어지면 저절로 다시 올라온다.
   */
  const settled = correct && rung === RUNG_MAX && streak >= SETTLED_STREAK
  const reservations = { ...state.reservations }
  if (settled) delete reservations[slug]
  else reservations[slug] = state.cursor + distance

  return {
    ...state,
    progress: {
      ...state.progress,
      cards: {
        ...state.progress.cards,
        [slug]: { rung, streak, fsrs: storeCard(graded.card) },
      },
    },
    reservations,
  }
}
