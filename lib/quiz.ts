import { distractorPool, type Entry } from './entries.ts'
import { blankable, blankableChar, pickConfusables } from './confusables.ts'
import { hashString, makeRng, sample, shuffled } from './random.ts'
import { hasAudio } from './audio-have.ts'

/**
 * 문항 만들기. (spec.md §5)
 *
 * 셔플은 시드를 받아 결정적으로 돈다. 같은 카드를 다시 만나면 같은 배치가
 * 나오는 게 아니라, `attempt`를 시드에 섞어 회차마다 달라진다.
 */

export const CHOICE_COUNT = 4
export const KEY_COUNT = 4

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

export function buildChoice(entry: Entry, entries: Entry[], attempt = 0): ChoiceQuestion {
  const rng = makeRng(seedOf(entry, 'choice', attempt))
  const pool = distractorPool(entry, entries)
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
 */
export function buildListen(entry: Entry, entries: Entry[], attempt = 0): ListenQuestion {
  const rng = makeRng(seedOf(entry, 'listen', attempt))
  const pool = distractorPool(entry, entries)
  const distractors = sample(pool, CHOICE_COUNT - 1, rng)
  return { kind: 'listen', entry, options: shuffled([entry, ...distractors], rng) }
}

/**
 * 예문 빈칸을 만들 수 있는가.
 *
 * 상황 표현은 예문이 없다 — 표현 자체가 문장이라 예문을 따로 두지 않는다.
 * 예문이 있어도 정답이 그 안에 **그대로** 보여야 뚫을 수 있다. `pnpm check`가
 * 모든 언어에서 이걸 보증하지만(경고 0건), 데이터가 앞서 나갈 수 있으므로
 * 여기서도 확인하고 안 되면 재인 칸에 머문다.
 */
export function canCloze(entry: Entry): boolean {
  const text = entry.word.example?.text
  return Boolean(text && text.includes(entry.answer))
}

/**
 * 예문에서 낱말을 뚫고 넷 중 고르게 한다.
 *
 * 철자 빈칸(`buildBlank`)은 글자 하나를 묻는다 — 형태는 보지만 뜻은 안 본다.
 * `receipt`의 `p`를 맞히는 것과 "영수증을 주세요"에서 `receipt`를 고르는 것은
 * 다른 일이다. 이 칸은 **문장 안에서 쓰이는 자리**를 묻는다.
 *
 * 오답은 재인 칸과 같은 풀(같은 category)에서 뽑는다. 그래야 문맥을 읽지 않고
 * 품사만 보고 걸러내지 못한다.
 */
export function buildCloze(entry: Entry, entries: Entry[], attempt = 0): ClozeQuestion {
  const rng = makeRng(seedOf(entry, 'cloze', attempt))
  const text = entry.word.example?.text ?? ''
  const at = text.indexOf(entry.answer)
  const pool = distractorPool(entry, entries)
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
