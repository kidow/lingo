import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { Entry } from './entries.ts'
import {
  COOLDOWN,
  DISTANCE,
  SETTLED_STREAK,
  initialState,
  nextQuestion,
  pickNext,
  questionFor,
  recordAnswer,
  recordIntro,
  weightOf,
  type EngineState,
} from './engine.ts'
import { RUNG_BLANK, RUNG_CHOICE, RUNG_CLOZE, RUNG_INTRO } from './progress.ts'
import { buildBlank, buildChoice, buildCloze, buildListen, NEAR_FROM_ATTEMPT } from './quiz.ts'
import type { Category, Concept } from './types.ts'

/* ── 도구 ────────────────────────────────────────────────────────── */

const NOW = 1_700_000_000_000
const DAY = 24 * 60 * 60 * 1000

function entry(slug: string, reading: string, category: Category = 'noun'): Entry {
  const concept: Concept = {
    slug,
    meaning_ko: slug,
    category,
    image_prompt: 'x',
    words: { ja: { term: slug, reading } },
  }
  return { concept, word: concept.words.ja!, lang: 'ja', answer: reading }
}

/** 예문이 있는 항목. 문맥 칸(예문 빈칸)은 예문이 있어야 만들어진다 */
function entryWithExample(slug: string, reading: string, category: Category = 'noun'): Entry {
  const e = entry(slug, reading, category)
  e.word.example = { text: `${reading}が すきです。`, ko: `${slug}를 좋아합니다.` }
  return e
}

const ENTRIES = [
  entry('cat', 'ねこ'),
  entry('dog', 'いぬ'),
  entry('bread', 'パン'),
  entry('clock', 'とけい'),
  entry('banana', 'バナナ'),
  entry('book', 'ほん'),
]

/** 정해진 수열을 내는 난수. 다 쓰면 0.5로 고정된다 */
const rngOf = (...values: number[]) => {
  let i = 0
  return () => (i < values.length ? values[i++] : 0.5)
}

/** slug를 한 번 소개하고 rung 1로 올린 상태 */
function introduced(state: EngineState, ...slugs: string[]): EngineState {
  return slugs.reduce((s, slug) => recordIntro(s, slug, NOW), state)
}

/* ── 뽑기 ────────────────────────────────────────────────────────── */

test('아무것도 안 본 상태에서는 미소개 단어가 나온다', () => {
  // 본 단어가 없으면 NEW_RATE 판정을 건너뛰므로 난수의 첫 값이 곧 인덱스다
  const picked = pickNext(initialState(), ENTRIES, rngOf(0), NOW)
  assert.ok(picked)
  assert.equal(picked.concept.slug, 'cat')
})

test('단어가 없으면 null', () => {
  assert.equal(pickNext(initialState(), [], rngOf(), NOW), null)
})

test('예약이 도래하면 그 카드가 먼저 나온다', () => {
  // 복습 후보가 둘이어야 예약의 효과가 드러난다. cat을 쿨다운에 넣어둔다
  let state = introduced(initialState(), 'cat', 'dog')
  state = { ...state, cursor: 2, recent: ['cat'] }

  // 예약은 cursor + 3. 도래 전이면 쿨다운에 걸린 cat이 아니라 dog가 나온다
  assert.equal(pickNext(state, ENTRIES, rngOf(0.9), NOW)?.concept.slug, 'dog')

  // 도래하면 쿨다운을 무시하고 예약이 이긴다
  state = { ...state, cursor: 3 }
  assert.equal(pickNext(state, ENTRIES, rngOf(0.9), NOW)?.concept.slug, 'cat')
})

test('예약이 여럿이면 가장 오래 기다린 것부터', () => {
  const state: EngineState = {
    ...introduced(initialState(), 'cat', 'dog'),
    cursor: 50,
    reservations: { dog: 40, cat: 10 },
  }
  assert.equal(pickNext(state, ENTRIES, rngOf(0.9), NOW)?.concept.slug, 'cat')
})

test('최근 COOLDOWN장에 나온 것은 다시 안 뽑는다', () => {
  const seen = ENTRIES.map((e) => e.concept.slug)
  const state: EngineState = {
    ...introduced(initialState(), ...seen),
    cursor: 999, // 예약을 전부 도래시키지 않도록 아래에서 비운다
    reservations: {},
    recent: seen.slice(0, COOLDOWN),
  }
  for (let i = 0; i < 20; i += 1) {
    const picked = pickNext(state, ENTRIES, rngOf(0.9, i / 20), NOW)
    assert.ok(picked)
    assert.ok(!state.recent.includes(picked.concept.slug), `쿨다운 위반: ${picked.concept.slug}`)
  }
})

test('쿨다운에 다 걸리면 쿨다운을 풀어서라도 낸다', () => {
  const seen = ENTRIES.map((e) => e.concept.slug)
  const state: EngineState = {
    ...introduced(initialState(), ...seen),
    reservations: {},
    recent: seen, // 전부 최근
  }
  assert.ok(pickNext(state, ENTRIES, rngOf(0.9), NOW))
})

test('난수가 NEW_RATE 아래면 새 단어, 위면 복습', () => {
  const state: EngineState = { ...introduced(initialState(), 'cat'), reservations: {} }
  const fresh = pickNext(state, ENTRIES, rngOf(0.01, 0), NOW)
  assert.notEqual(fresh?.concept.slug, 'cat')

  const review = pickNext(state, ENTRIES, rngOf(0.99), NOW)
  assert.equal(review?.concept.slug, 'cat')
})

/* ── 기록 ────────────────────────────────────────────────────────── */

test('소개를 지나가면 rung이 1로 오르고 3장 뒤에 예약된다', () => {
  const state = recordIntro(initialState(), 'cat', NOW)
  assert.equal(state.progress.cards.cat.rung, RUNG_CHOICE)
  assert.equal(state.progress.introducedAt.cat, NOW)
  assert.equal(state.reservations.cat, DISTANCE.intro)
})

test('다시 만난 소개는 FSRS와 최초 노출 시각을 보존한다', () => {
  const once = recordIntro(initialState(), 'cat', NOW)
  const graded = recordAnswer(once, 'cat', true, NOW)
  const again = recordIntro(graded, 'cat', NOW + DAY)

  assert.equal(again.progress.introducedAt.cat, NOW, '최초 노출 시각이 바뀌면 안 된다')
  assert.equal(
    again.progress.cards.cat.fsrs.reps,
    graded.progress.cards.cat.fsrs.reps,
    'FSRS 이력이 초기화되면 안 된다',
  )
})

test('강등돼 내려온 카드도 소개를 지나가면 다시 재인 칸으로 올라간다', () => {
  let state = introduced(initialState(), 'cat')
  state = recordAnswer(state, 'cat', false, NOW) // rung 1 → 0
  assert.equal(state.progress.cards.cat.rung, RUNG_INTRO)

  state = recordIntro(state, 'cat', NOW + DAY)
  assert.equal(state.progress.cards.cat.rung, RUNG_CHOICE, '올라가지 않으면 소개로 맴돈다')
  assert.equal(state.reservations.cat, state.cursor + DISTANCE.intro)
})

test('정답은 rung을 한 칸 올리고 streak을 쌓는다', () => {
  let state = introduced(initialState(), 'cat')
  state = recordAnswer(state, 'cat', true, NOW)
  assert.equal(state.progress.cards.cat.rung, RUNG_CLOZE)
  assert.equal(state.progress.cards.cat.streak, 1)
  assert.equal(state.reservations.cat, DISTANCE.correct)
})

test('rung은 사다리 꼭대기를 넘지 않는다', () => {
  let state = introduced(initialState(), 'cat')
  for (let i = 0; i < 5; i += 1) state = recordAnswer(state, 'cat', true, NOW + i * DAY)
  assert.equal(state.progress.cards.cat.rung, RUNG_BLANK)
})

test('연속 2회 정답부터는 더 멀리 예약된다', () => {
  let state = introduced(initialState(), 'cat')
  state = recordAnswer(state, 'cat', true, NOW)
  assert.equal(state.reservations.cat, DISTANCE.correct)
  state = recordAnswer(state, 'cat', true, NOW + DAY)
  assert.equal(state.reservations.cat, DISTANCE.streak)
})

test('꼭대기에서 내리 맞히면 예약을 놓아준다 — 다 외운 낱말이 20장마다 돌아오지 않는다', () => {
  let state = introduced(initialState(), 'cat')
  for (let i = 0; i < SETTLED_STREAK - 1; i += 1) state = recordAnswer(state, 'cat', true, NOW + i * DAY)
  assert.equal(state.progress.cards.cat.rung, RUNG_BLANK)
  assert.ok(state.reservations.cat !== undefined) // 아직은 예약된다
  state = recordAnswer(state, 'cat', true, NOW + SETTLED_STREAK * DAY)
  assert.equal(state.reservations.cat, undefined)
  // 한 번 틀리면 다시 예약이 붙는다
  state = recordAnswer(state, 'cat', false, NOW + (SETTLED_STREAK + 1) * DAY)
  assert.equal(state.reservations.cat, state.cursor + DISTANCE.wrong)
})

test('오답은 한 칸만 내리고 바닥으로 떨어뜨리지 않는다', () => {
  let state = introduced(initialState(), 'cat')
  state = recordAnswer(state, 'cat', true, NOW) // rung 2 = 문맥
  state = recordAnswer(state, 'cat', false, NOW + DAY)
  assert.equal(state.progress.cards.cat.rung, RUNG_CHOICE) // 2 → 1, 0이 아니다
  assert.equal(state.progress.cards.cat.streak, 0)
  assert.equal(state.reservations.cat, DISTANCE.wrong)
})

test('rung은 0 아래로 내려가지 않는다', () => {
  let state = introduced(initialState(), 'cat')
  for (let i = 0; i < 5; i += 1) state = recordAnswer(state, 'cat', false, NOW + i * DAY)
  assert.equal(state.progress.cards.cat.rung, RUNG_INTRO)
})

test('오답도 FSRS에 기록된다', () => {
  const before = introduced(initialState(), 'cat')
  const after = recordAnswer(before, 'cat', false, NOW + DAY)
  // 소개 직후는 Learning 상태라 lapses가 오르지 않는다. reps는 오른다
  assert.ok(after.progress.cards.cat.fsrs.reps > before.progress.cards.cat.fsrs.reps)
})

test('Review까지 올라간 카드가 틀리면 lapses가 오른다', () => {
  let state = introduced(initialState(), 'cat')
  for (let i = 0; i < 4; i += 1) state = recordAnswer(state, 'cat', true, NOW + i * 30 * DAY)
  const before = state.progress.cards.cat.fsrs.lapses
  state = recordAnswer(state, 'cat', false, NOW + 200 * DAY)
  assert.ok(state.progress.cards.cat.fsrs.lapses > before)
})

/* ── 문항 ────────────────────────────────────────────────────────── */

test('rung이 카드 종류를 정한다', () => {
  const cat = entryWithExample('cat', 'ねこ')
  const entries = [cat, ...ENTRIES.slice(1)]
  let state = initialState()
  assert.equal(questionFor(cat, state, entries).kind, 'intro')

  state = introduced(state, 'cat')
  assert.equal(questionFor(cat, state, entries).kind, 'choice')

  state = recordAnswer(state, 'cat', true, NOW)
  // 문맥 칸에서도 듣기가 번갈아 끼어든다 — 같은 문장이 반복되는 것을 줄인다
  assert.ok(['cloze', 'listen'].includes(questionFor(cat, state, entries).kind))

  state = recordAnswer(state, 'cat', true, NOW + DAY)
  assert.equal(questionFor(cat, state, entries).kind, 'blank')
})

test('문맥 칸은 문맥과 듣기를 번갈아 낸다 — 같은 문장이 매번 나오지 않는다', () => {
  const cat = entryWithExample('cat', 'ねこ')
  const entries = [cat, ...ENTRIES.slice(1)]
  const kinds = new Set<string>()
  for (let attempt = 0; attempt < 12; attempt += 1) {
    let state = introduced(initialState(), 'cat')
    // rung 2에 세우고 회차만 바꿔 가며 어떤 카드가 나오는지 본다
    state = {
      ...state,
      progress: {
        ...state.progress,
        cards: {
          ...state.progress.cards,
          cat: {
            ...state.progress.cards.cat,
            rung: RUNG_CLOZE,
            fsrs: { ...state.progress.cards.cat.fsrs, reps: attempt },
          },
        },
      },
    }
    kinds.add(questionFor(cat, state, entries).kind)
  }
  assert.deepEqual(kinds, new Set(['cloze', 'listen']), '둘 다 나온다')
})

test('예문이 없으면 문맥 칸을 못 만들어 재인에 머문다', () => {
  const cat = ENTRIES[0] // 예문 없음
  let state = introduced(initialState(), 'cat')
  state = recordAnswer(state, 'cat', true, NOW)
  assert.equal(state.progress.cards.cat.rung, RUNG_CLOZE)
  // 재인 칸은 그림 보기와 듣기 두 모습으로 나온다. 문맥 칸만 아니면 된다
  assert.ok(['choice', 'listen'].includes(questionFor(cat, state, ENTRIES).kind))
})

test('읽기가 한 글자면 빈칸을 못 만들어 재인에 머문다', () => {
  const tree = entry('tree', 'き')
  const entries = [...ENTRIES, tree]
  let state = introduced(initialState(), 'tree')
  state = recordAnswer(state, 'tree', true, NOW)
  state = recordAnswer(state, 'tree', true, NOW + DAY)
  assert.equal(state.progress.cards.tree.rung, RUNG_BLANK)
  assert.equal(questionFor(tree, state, entries).kind, 'choice')
})

test('문맥 칸은 예문에서 낱말 자리를 뚫는다', () => {
  const cat = entryWithExample('cat', 'ねこ')
  const entries = [cat, ...ENTRIES.slice(1)]
  const q = buildCloze(cat, entries, 0)
  assert.equal(q.kind, 'cloze')
  if (q.kind !== 'cloze') return
  assert.equal(q.before + 'ねこ' + q.after, cat.word.example!.text, '앞뒤를 붙이면 예문 그대로다')
  assert.ok(!q.before.includes('ねこ') && !q.after.includes('ねこ'), '정답이 남아 있으면 안 된다')
  assert.equal(q.options.length, 4)
  assert.ok(q.options.includes('ねこ'))
  assert.equal(new Set(q.options).size, 4, '보기에 중복이 없다')
})

test('4지선다 보기는 정답 포함 4개이고 중복이 없다', () => {
  const state = introduced(initialState(), 'cat')
  const q = questionFor(ENTRIES[0], state, ENTRIES)
  assert.equal(q.kind, 'choice')
  if (q.kind !== 'choice') return
  assert.equal(q.options.length, 4)
  assert.equal(new Set(q.options).size, 4)
  assert.ok(q.options.includes('ねこ'))
})

test('정답과 글자가 같은 개념은 오답 보기에서 빠진다', () => {
  // 歯도 葉도 읽기가 は다. 슬러그만 보고 거르면 같은 글자가 두 칸에 선다
  const leaf = entry('leaf', 'は')
  const entries = [entry('tooth', 'は'), ...ENTRIES.slice(1), leaf]
  const state = introduced(initialState(), 'tooth')
  const q = questionFor(entries[0], state, entries)
  if (q.kind !== 'choice') return assert.fail('choice가 아니다')
  assert.equal(q.options.filter((option) => option === 'は').length, 1)
})

test('오답 보기는 같은 category에서 나온다', () => {
  const verb = entry('eat', 'たべる', 'verb')
  const entries = [...ENTRIES, verb]
  const state = introduced(initialState(), 'cat')
  const q = questionFor(ENTRIES[0], state, entries)
  if (q.kind !== 'choice') return assert.fail('choice가 아니다')
  assert.ok(!q.options.includes('たべる'))
})

test('상황 표현은 빈칸 칸으로 올라가지 않는다', () => {
  const scene = entry('check-please', 'おかいけい おねがいします', 'scene')
  const entries = [scene, entry('order', 'ちゅうもん おねがいします', 'scene'), entry('help', 'たすけて', 'scene')]
  let state = introduced(initialState(), 'check-please')
  state = recordAnswer(state, 'check-please', true, NOW)
  const q = questionFor(scene, state, entries)
  assert.ok(['choice', 'listen'].includes(q.kind), '빈칸도 문맥도 아니다')
})

test('재인 칸은 그림 보기와 듣기를 번갈아 낸다', () => {
  const cat = ENTRIES[0]
  let state = introduced(initialState(), 'cat')
  const kinds: string[] = []
  for (let i = 0; i < 4; i += 1) {
    kinds.push(questionFor(cat, state, ENTRIES).kind)
    // 오답으로 되돌려 rung을 재인에 묶어 둔 채 회차만 올린다
    state = recordAnswer(state, 'cat', i % 2 === 0, NOW + i * DAY)
    state = { ...state, progress: { ...state.progress,
      cards: { ...state.progress.cards, cat: { ...state.progress.cards.cat, rung: RUNG_CHOICE } } } }
  }
  assert.ok(kinds.includes('choice'), '그림 보기가 한 번은 나온다')
  assert.ok(kinds.includes('listen'), '듣기가 한 번은 나온다')
})

test('듣기 카드는 그림 넷을 보기로 깐다', () => {
  const cat = ENTRIES[0]
  let state = introduced(initialState(), 'cat')
  state = recordAnswer(state, 'cat', false, NOW) // reps 1 → 홀수 회차
  state = { ...state, progress: { ...state.progress,
    cards: { ...state.progress.cards, cat: { ...state.progress.cards.cat, rung: RUNG_CHOICE } } } }
  const q = questionFor(cat, state, ENTRIES)
  assert.equal(q.kind, 'listen')
  if (q.kind !== 'listen') return
  assert.equal(q.options.length, 4)
  assert.ok(q.options.some((o) => o.concept.slug === 'cat'), '정답이 보기에 있다')
  assert.equal(new Set(q.options.map((o) => o.concept.slug)).size, 4, '보기에 중복이 없다')
})

/* ── 가중치 ──────────────────────────────────────────────────────── */

test('오래 안 본 카드일수록 가중치가 크다', () => {
  const state = recordAnswer(introduced(initialState(), 'cat'), 'cat', true, NOW)
  const soon = weightOf(ENTRIES[0], state.progress, NOW + DAY)
  const later = weightOf(ENTRIES[0], state.progress, NOW + 60 * DAY)
  assert.ok(later > soon, `${later} > ${soon}`)
})

test('갓 소개한 단어는 부스트를 받고 시간이 지나면 사그라든다', () => {
  const state = introduced(initialState(), 'cat')
  const now = weightOf(ENTRIES[0], state.progress, NOW)
  const hourLater = weightOf(ENTRIES[0], state.progress, NOW + 60 * 60 * 1000)
  assert.ok(now > hourLater, `${now} > ${hourLater}`)
})

test('안 본 단어의 가중치는 1이다', () => {
  assert.equal(weightOf(ENTRIES[0], initialState().progress, NOW), 1)
})

/* ── 전체 흐름 ───────────────────────────────────────────────────── */

test('nextQuestion은 cursor를 올리고 예약을 지우고 recent에 넣는다', () => {
  const before = introduced(initialState(), 'cat')
  const result = nextQuestion({ ...before, cursor: DISTANCE.intro }, ENTRIES, rngOf(0.9), NOW)
  assert.ok(result)
  assert.equal(result.question.entry.concept.slug, 'cat')
  assert.equal(result.state.cursor, DISTANCE.intro + 1)
  assert.equal(result.state.reservations.cat, undefined)
  assert.deepEqual(result.state.recent, ['cat'])
})

test('100장을 뽑아도 멈추지 않고 같은 카드가 연달아 나오지 않는다', () => {
  let state = initialState()
  let rngSeed = 1
  const rng = () => {
    rngSeed = (rngSeed * 1103515245 + 12345) % 2147483648
    return rngSeed / 2147483648
  }

  let previous = ''
  for (let i = 0; i < 100; i += 1) {
    const result = nextQuestion(state, ENTRIES, rng, NOW + i * 1000)
    assert.ok(result, `${i}번째에서 멈췄다`)
    const slug = result.question.entry.concept.slug
    assert.notEqual(slug, previous, `${i}번째에서 같은 카드가 연달아 나왔다: ${slug}`)
    previous = slug

    state = result.state
    state =
      result.question.kind === 'intro'
        ? recordIntro(state, slug, NOW + i * 1000)
        : recordAnswer(state, slug, i % 3 !== 0, NOW + i * 1000)
  }

  // 여섯 단어를 다 소개했어야 한다
  assert.equal(Object.keys(state.progress.cards).length, ENTRIES.length)
})

/* ── 빈칸 자리 ───────────────────────────────────────────────────── */

test('빈칸 자리는 복습마다 옮겨 간다 — 연달아 같은 칸이 나오지 않는다', () => {
  const target = entry('banana', 'banana')
  const picks = [0, 1, 2, 3, 4, 5].map((attempt) => buildBlank(target, attempt).holeIndex)
  for (let i = 1; i < picks.length; i += 1) {
    assert.notEqual(picks[i], picks[i - 1], `${i}회차가 앞 회차와 같은 자리다`)
  }
})

test('한 바퀴 돌면 뚫을 수 있는 자리를 모두 한 번씩 묻는다', () => {
  const target = entry('banana', 'banana')
  // 첫 글자는 단서로 남기므로 b를 뺀 다섯 자리다
  const seen = new Set([0, 1, 2, 3, 4].map((attempt) => buildBlank(target, attempt).holeIndex))
  assert.equal(seen.size, 5)
  assert.ok(![...seen].includes(0), '첫 글자는 뚫지 않는다')
})

test('같은 회차를 다시 그리면 같은 자리가 나온다 — 다시 그릴 때 답이 튀지 않는다', () => {
  const target = entry('banana', 'banana')
  assert.equal(buildBlank(target, 3).holeIndex, buildBlank(target, 3).holeIndex)
})

/* ── 문맥 카드 오답 ───────────────────────────────────────────────── */

test('문맥 카드 오답은 같은 주제에서 먼저 뽑는다', () => {
  const withTopic = (slug: string, reading: string, topic: string): Entry => {
    const e = entryWithExample(slug, reading)
    e.concept.topic = topic
    return e
  }
  const towel = withTopic('towel', 'タオル', 'home')
  const entries = [
    towel,
    withTopic('curtain', 'カーテン', 'home'),
    withTopic('carpet', 'カーペット', 'home'),
    withTopic('pillow', 'まくら', 'home'),
    withTopic('salad', 'サラダ', 'food'),
    withTopic('pizza', 'ピザ', 'food'),
    withTopic('coupon', 'クーポン', 'office'),
  ]
  let state = introduced(initialState(), 'towel')
  state = recordAnswer(state, 'towel', true, NOW)
  const q = questionFor(towel, state, entries)
  assert.equal(q.kind, 'cloze')
  if (q.kind !== 'cloze') return
  const topics = q.options.map((o) => entries.find((e) => e.answer === o)!.concept.topic)
  assert.deepEqual(new Set(topics), new Set(['home']), '넷 다 같은 주제다')
})

test('문맥 카드는 같은 틀을 쓰는 오답을 뺀다 — 넣어도 맞는 보기는 오답이 아니다', () => {
  const withText = (slug: string, reading: string, text: string): Entry => {
    const e = entry(slug, reading)
    e.concept.topic = 'clothes'
    e.word.example = { text, ko: `${slug} 예문` }
    return e
  }
  const coat = withText('coat', 'コート', 'コートを きる。')
  const entries = [
    coat,
    withText('shirt', 'シャツ', 'シャツを きる。'), // 같은 틀 — 넣어도 맞는다
    withText('cap', 'ぼうし', 'ぼうしが あたらしい。'),
    withText('sock', 'くつした', 'くつしたを あらう。'),
    withText('belt', 'ベルト', 'ベルトが みじかい。'),
  ]
  const q = buildCloze(coat, entries)
  assert.ok(q.options.includes('コート'))
  assert.ok(!q.options.includes('シャツ'), '같은 틀을 쓰는 낱말은 오답에 들어가지 않는다')
})

test('같은 주제에 셋이 모자라면 넓은 풀로 돌아간다', () => {
  const lonely = entryWithExample('towel', 'タオル')
  lonely.concept.topic = 'home'
  const entries = [lonely, ...ENTRIES.slice(1)] // 나머지는 주제가 없다
  let state = introduced(initialState(), 'towel')
  state = recordAnswer(state, 'towel', true, NOW)
  const q = questionFor(lonely, state, entries)
  assert.equal(q.kind, 'cloze')
  if (q.kind !== 'cloze') return
  assert.equal(q.options.length, 4, '문항은 그래도 만들어진다')
})

/* ── 재인 오답이 회차마다 조여진다 ────────────────────────────────── */

test('재인 오답은 처음 두 번은 넓게, 그 뒤로는 같은 주제에서 뽑는다', () => {
  const topic = (slug: string, reading: string, name: string): Entry => {
    const e = entry(slug, reading)
    e.concept.topic = name
    return e
  }
  const towel = topic('towel', 'タオル', 'travel')
  const entries = [
    towel,
    topic('passport', 'パスポート', 'travel'),
    topic('map', 'ちず', 'travel'),
    topic('camera', 'カメラ', 'travel'),
    topic('oven', 'オーブン', 'home'),
    topic('sofa', 'ソファ', 'home'),
    topic('salad', 'サラダ', 'food'),
    topic('pizza', 'ピザ', 'food'),
  ]
  const topicsOf = (q: ReturnType<typeof buildChoice>) =>
    q.options
      .filter((o) => o !== towel.answer)
      .map((o) => entries.find((e) => e.answer === o)!.concept.topic)

  // 첫 회차 — 넓은 풀이라 다른 주제가 섞일 수 있다
  const early = buildChoice(towel, entries, 0)
  assert.equal(early.options.length, 4)

  // 두 번째 회차부터 — 오답 셋이 모두 같은 주제다
  const late = buildChoice(towel, entries, NEAR_FROM_ATTEMPT)
  assert.deepEqual(new Set(topicsOf(late)), new Set(['travel']))

  // 듣기 카드도 같은 규칙을 쓴다
  const heard = buildListen(towel, entries, NEAR_FROM_ATTEMPT)
  const heardTopics = heard.options
    .filter((o) => o.concept.slug !== 'towel')
    .map((o) => o.concept.topic)
  assert.deepEqual(new Set(heardTopics), new Set(['travel']))
})
