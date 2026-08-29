import { distractorPool, type Entry } from './entries.ts'
import { blankable, blankableChar, pickConfusables } from './confusables.ts'
import { hashString, makeRng, sample, shuffled } from './random.ts'

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

export type Question = IntroQuestion | ChoiceQuestion | BlankQuestion

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
 * 빈칸은 한 글자만 뚫는다.
 *
 * 정답이 한 글자면 뚫을 자리가 없다 — 그런 단어는 재인 칸에 머문다.
 * 한자처럼 닮은 오답을 깔 수 없는 문자도 같은 이유로 뚫지 않는다.
 * (spec.md §5) 호출부가 `canBlank`로 먼저 거른다.
 */
export function canBlank(entry: Entry): boolean {
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

export function buildBlank(entry: Entry, attempt = 0): BlankQuestion {
  const rng = makeRng(seedOf(entry, 'blank', attempt))
  const chars = [...entry.answer]
  const holes = holesOf(entry.answer)
  const holeIndex = holes[Math.floor(rng() * holes.length)]
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
