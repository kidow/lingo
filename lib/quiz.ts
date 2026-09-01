import { distractorPool, examplesOf, nearPool, type Entry } from './entries.ts'
import { blankable, blankableChar, pickConfusables } from './confusables.ts'
import { hashString, makeRng, sample, shuffled } from './random.ts'
import { hasAudio } from './audio-have.ts'
import { LANG } from './lang.ts'
import type { Language } from './types.ts'

/**
 * 문항 만들기. (spec.md §5)
 *
 * 셔플은 시드를 받아 결정적으로 돈다. 같은 카드를 다시 만나면 같은 배치가
 * 나오는 게 아니라, `attempt`를 시드에 섞어 회차마다 달라진다.
 */

export const CHOICE_COUNT = 4
export const KEY_COUNT = 4

/**
 * 몇 번째 회차부터 오답을 같은 주제에서 뽑을 것인가.
 *
 * 재인 칸은 그 낱말을 **처음 시험하는 자리**다. 여기서 오답을 촘촘히 깔면
 * 처음 본 낱말을 바로 정밀 변별로 묻게 되어 초반 승률이 떨어진다 — 승률이
 * 무너지면 무한 스와이프의 동력이 끊긴다 (§6).
 *
 * 그렇다고 계속 넓게 두면 반대 문제가 생긴다. `towel` 문제에 `photographer`가
 * 깔리면 "욕실 물건 같은 것"만 떠올려도 셋이 지워져, 낱말을 아는지가 아니라
 * 어느 분야인지를 묻게 된다.
 *
 * 그래서 **같은 칸이 회차마다 조여진다.** 처음 두 번은 넓게, 그 뒤로는 같은
 * 주제에서 뽑는다. 사다리를 늘리지 않고 난이도만 올리는 방법이다.
 */
export const NEAR_FROM_ATTEMPT = 2

export type IntroQuestion = { kind: 'intro'; entry: Entry }

export type ChoiceQuestion = {
  kind: 'choice'
  entry: Entry
  /** 정답 1 + 오답 3, 섞인 순서 */
  options: string[]
}

export type BlankQuestion = {
  kind: 'blank'
  entry: Entry
  /** 정답을 글자 단위로 쪼갠 것 */
  chars: string[]
  /** 비워둘 자리 */
  holeIndex: number
  /** 후보 글자. 정답 1 + 닮은 오답 3 */
  keys: string[]
}

export type ClozeQuestion = {
  kind: 'cloze'
  entry: Entry
  /** 예문을 정답 자리에서 자른 앞뒤 토막 */
  before: string
  after: string
  /** 정답 1 + 오답 3, 섞인 순서 */
  options: string[]
}

export type ListenQuestion = {
  kind: 'listen'
  entry: Entry
  /** 정답 1 + 오답 3, 섞인 순서. 그림으로 보여주므로 문자열이 아니라 항목이다 */
  options: Entry[]
}

export type Question =
  | IntroQuestion
  | ChoiceQuestion
  | BlankQuestion
  | ClozeQuestion
  | ListenQuestion

const seedOf = (entry: Entry, kind: string, attempt: number) =>
  hashString(`${entry.concept.slug}:${kind}:${attempt}`)

export function buildIntro(entry: Entry): IntroQuestion {
  return { kind: 'intro', entry }
}

/** 회차가 쌓이면 같은 주제에서 뽑는다 (NEAR_FROM_ATTEMPT) */
function poolFor(entry: Entry, entries: Entry[], attempt: number): Entry[] {
  return attempt >= NEAR_FROM_ATTEMPT ? nearPool(entry, entries) : distractorPool(entry, entries)
}

export function buildChoice(entry: Entry, entries: Entry[], attempt = 0): ChoiceQuestion {
  const rng = makeRng(seedOf(entry, 'choice', attempt))
  const pool = poolFor(entry, entries, attempt)
  const distractors = sample(pool, CHOICE_COUNT - 1, rng).map((e) => e.answer)
  return { kind: 'choice', entry, options: shuffled([entry.answer, ...distractors], rng) }
}

/**
 * 듣기 카드를 만들 수 있는가.
 *
 * 소리가 유일한 단서라 발음 파일이 없으면 문제가 성립하지 않는다. 정적
 * 내보내기라 도는 중에 파일을 물어볼 수 없으므로 빌드 때 적어 둔 목록을 본다
 * (lib/audio-have.ts). 없으면 재인 카드가 대신 나간다.
 */
/**
 * 이번 회차를 듣기로 낼까.
 *
 * 회차의 홀짝으로 가르면 **갈리지 않는다.** 답할 때마다 rung과 회차가 같이
 * 1씩 움직여서 `rung + attempt`의 홀짝이 변하지 않기 때문이다 — 한 칸에
 * 머무는 동안 늘 같은 쪽만 나온다. 사다리 양 끝(0에서 틀리거나 3에서 맞히면
 * rung이 안 움직인다)에서만 뒤집히는데, 그건 규칙이 아니라 사고다.
 *
 * 그래서 홀짝 대신 **회차를 섞은 값**으로 던진다. 같은 회차면 같은 결과라
 * 카드를 다시 그려도 종류가 바뀌지 않고, 회차가 오르면 새로 갈린다.
 */
export function isListenTurn(entry: Entry, attempt: number): boolean {
  return canListen(entry) && hashString(`${entry.concept.slug}:turn:${attempt}`) % 2 === 1
}

export function canListen(entry: Entry): boolean {
  return hasAudio(entry.concept.slug, entry.lang)
}

/**
 * 소리를 듣고 그림 넷 중 고른다.
 *
 * 앱이 지금까지 훈련한 것은 **보고 읽기뿐**이었다. 소리에서 뜻으로 가는 길은
 * 20,671개 발음 파일을 쌓아 두고도 한 번도 열지 않았다. 이 카드가 그 길이다.
 *
 * 낱말 대신 **그림**을 보기로 깐다. 글자를 깔면 듣기가 아니라 받아쓰기가 된다 —
 * 소리를 철자로 옮긴 다음에야 고를 수 있기 때문이다. 그림은 소리에서 곧장 뜻으로
 * 간다.
 *
 * 오답 풀은 4지선다와 같은 규칙으로 회차에 따라 좁아진다 (NEAR_FROM_ATTEMPT).
 */
export function buildListen(entry: Entry, entries: Entry[], attempt = 0): ListenQuestion {
  const rng = makeRng(seedOf(entry, 'listen', attempt))
  const pool = poolFor(entry, entries, attempt)
  const distractors = sample(pool, CHOICE_COUNT - 1, rng)
  return { kind: 'listen', entry, options: shuffled([entry, ...distractors], rng) }
}

/**
 * 예문 빈칸을 만들 수 있는가.
 *
 * 정답이 예문 안에 **온전한 낱말로** 보여야 뚫을 수 있다 (`clozeAt`). `pnpm check`가
 * 모든 언어에서 이걸 보증하지만(경고 0건), 데이터가 앞서 나갈 수 있으므로 여기서도
 * 확인하고 안 되면 재인 칸에 머문다.
 *
 * 상황 표현도 여기에 들어온다. 뚫는 것이 표현 **전체**라 빈칸에는 문장이 통째로
 * 들어가고, 감싸는 한 줄이 상황을 만든다 — "어떤 상황에 어떤 말을 하는가"를 묻는
 * 카드가 된다 (spec.md §5).
 */
export function canCloze(entry: Entry): boolean {
  return clozeExamples(entry).length > 0
}

/** 정답이 온전한 낱말로 보이는 예문만 뚫을 수 있다 */
function clozeExamples(entry: Entry) {
  return examplesOf(entry.word).filter((example) => clozeAt(example.text, entry.answer, entry.lang) >= 0)
}

const LETTER = /[\p{L}\p{N}]/u

/**
 * 예문에서 뚫을 자리. 없으면 -1이다.
 *
 * `indexOf`만 쓰면 굴절된 **긴 낱말 안**을 판다. `Wash your hands.`에서 `hand`를
 * 찾으면 `Wash your ___s.`가 되어 꼬리가 정답의 모양을 알려주고, 더 나쁘게는
 * `В чайнике остыл чай.`에서 앞의 `чайнике`가 뚫려 **정답이 뒤에 그대로 남는다**.
 * 그래서 앞뒤가 글자가 아닌 자리만 고른다.
 *
 * 일본어·중국어는 낱말 사이에 공백이 없어 이 규칙을 적용할 수 없다 (lib/lang.ts).
 */
export function clozeAt(text: string, answer: string, lang: Language): number {
  if (!LANG[lang].spaced) return text.indexOf(answer)
  for (let at = text.indexOf(answer); at >= 0; at = text.indexOf(answer, at + 1)) {
    const before = text[at - 1]
    const after = text[at + answer.length]
    if (!LETTER.test(before ?? ' ') && !LETTER.test(after ?? ' ')) return at
  }
  return -1
}

/**
 * 예문에서 낱말을 뚫고 넷 중 고르게 한다.
 *
 * 철자 빈칸(`buildBlank`)은 글자 하나를 묻는다 — 형태는 보지만 뜻은 안 본다.
 * `receipt`의 `p`를 맞히는 것과 "영수증을 주세요"에서 `receipt`를 고르는 것은
 * 다른 일이다. 이 칸은 **문장 안에서 쓰이는 자리**를 묻는다.
 *
 * 예문이 여럿이면 회차마다 다른 문장을 쓴다. 하나뿐이면 같은 문장이 다시
 * 나오는데, 그 반복은 듣기 카드가 번갈아 끼어들어 절반으로 줄인다 (lib/engine.ts).
 *
 * 오답은 **같은 주제 파일**에서 먼저 뽑는다 (`nearPool`). category만 보면
 * `The ___ is clean.`에 `downstairs`가 섞이는데, 문법으로는 들어가지만 문맥으로는
 * 어울리지 않아 문장을 읽지 않고도 걸러진다.
 */
export function buildCloze(entry: Entry, entries: Entry[], attempt = 0): ClozeQuestion {
  const rng = makeRng(seedOf(entry, 'cloze', attempt))
  // 예문이 여럿이면 회차로 돌린다. 뚫을 자리를 돌리는 것과 같은 방식이다
  const sentences = clozeExamples(entry)
  const text = sentences.length > 0 ? sentences[attempt % sentences.length].text : ''
  const at = clozeAt(text, entry.answer, entry.lang)
  const pool = nearPool(entry, entries)
  const distractors = sample(pool, CHOICE_COUNT - 1, rng).map((e) => e.answer)
  return {
    kind: 'cloze',
    entry,
    before: text.slice(0, at),
    after: text.slice(at + entry.answer.length),
    options: shuffled([entry.answer, ...distractors], rng),
  }
}

/**
 * 빈칸은 한 글자만 뚫는다.
 *
 * 정답이 한 글자면 뚫을 자리가 없다 — 그런 단어는 재인 칸에 머문다.
 * 한자처럼 닮은 오답을 깔 수 없는 문자도 같은 이유로 뚫지 않는다.
 * (spec.md §5) 호출부가 `canBlank`로 먼저 거른다.
 */
export function canBlank(entry: Entry): boolean {
  // 상황 표현은 문장이다. 한 글자를 뚫어 봐야 문장 전체가 그대로 보이므로
  // 회상 훈련이 되지 않고, 글자별로 늘어놓는 빈칸 카드가 화면을 넘긴다
  if (entry.concept.category === 'scene') return false
  return blankable(entry.answer) && holesOf(entry.answer).length > 0
}

/**
 * 뚫을 수 있는 자리들.
 *
 * 첫 글자는 단서로 남긴다 — 그래야 순수 회상이 아니라 단서 회상이 된다.
 * 공백은 뚫지 않는다. 뚫어도 후보로 깔 것이 없고, 맞혀도 배우는 게 없다.
 */
function holesOf(answer: string): number[] {
  const chars = [...answer]
  return chars
    .map((ch, i) => (i > 0 && blankableChar(ch) ? i : -1))
    .filter((i) => i >= 0)
}

/**
 * 이번 회차에 뚫을 자리.
 *
 * 회차마다 새로 뽑으면 **같은 자리가 연달아 나온다.** `banana`는 뚫을 자리가
 * 셋인데 세 번 연속 같은 칸이 나오기도 했다 — 순수 난수라 그렇다. 그러면
 * 복습이 같은 글자만 반복해 묻고 나머지 자리는 영영 안 나온다.
 *
 * 그래서 뽑지 않고 **돌린다.** 자리 순서를 낱말마다 한 번 섞어 두고 복습
 * 횟수로 그 순서를 돈다. 낱말마다 순서가 다르고, 같은 자리가 연달아 나오지
 * 않으며, 한 바퀴 돌면 모든 자리를 한 번씩 묻는다.
 */
function holeFor(entry: Entry, holes: number[], attempt: number): number {
  const order = shuffled(holes, makeRng(seedOf(entry, 'holes', 0)))
  return order[attempt % order.length]
}

export function buildBlank(entry: Entry, attempt = 0): BlankQuestion {
  const rng = makeRng(seedOf(entry, 'blank', attempt))
  const chars = [...entry.answer]
  const holes = holesOf(entry.answer)
  const holeIndex = holeFor(entry, holes, attempt)
  const answerChar = chars[holeIndex]
  const distractors = pickConfusables(answerChar, KEY_COUNT - 1, rng, shuffled)
  return {
    kind: 'blank',
    entry,
    chars,
    holeIndex,
    keys: shuffled([answerChar, ...distractors], rng),
  }
}
