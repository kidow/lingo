import type { Entry } from './entries.ts'

/**
 * 덱 — 한 트랙 안에서 무엇을 볼지. (spec.md §3)
 *
 * 카드에는 낱말과 통짜 표현이 섞여 있다(`계산해 주세요`). 둘은 외우는 방식이
 * 다르다 — 낱말은 뜻을 붙이는 일이고 표현은 상황에 통째로 붙이는 일이다.
 * 그래서 **보는 자리를 나눈다.**
 *
 * **진도는 나누지 않는다.** 덱은 걸러 보는 창일 뿐이고 `lingo.progress.{track}`
 * 하나를 그대로 쓴다. 나누면 표현 380개짜리 진도가 며칠이면 바닥나고, 헤더
 * 숙련도도 무엇의 비율인지 흐려진다.
 *
 * **상식만 예외다.** 저장소는 그대로 하나를 쓰지만(키 앞자리로 갈린다 —
 * lib/trivia.ts) 헤더 숙련도의 **분모에는 넣지 않는다.** 낱말 1,344개에 상식
 * 몇백 개를 더하면 그 숫자가 무엇의 비율인지 흐려지고, 낱말을 하나도 안 늘려도
 * 상식을 풀어 퍼센트가 오른다. 세는 단위가 다르면 한 줄에 못 합친다 (§3).
 */
export type DeckId = 'word' | 'phrase' | 'trivia'

export const DECKS: Array<{ id: DeckId; label: string }> = [
  { id: 'word', label: '단어' },
  { id: 'phrase', label: '표현' },
  { id: 'trivia', label: '상식' },
]

export const DECK_IDS = DECKS.map((deck) => deck.id)
export const DEFAULT_DECK: DeckId = 'word'

/**
 * 그 덱에 속하는 것만 남긴다.
 *
 * 가르는 기준은 `category`다 — `scene`이 통짜 표현이고 나머지 셋(명사·동사·
 * 형용사)이 낱말이다. 품사가 아니라 **정답의 모양**으로 갈리는 자리라
 * 카테고리가 그대로 기준이 된다 (§4).
 */
export function entriesForDeck(deck: DeckId, entries: Entry[]): Entry[] {
  // 상식은 개념이 아니라 별개 목록이라 여기를 지나가지 않는다 (lib/trivia.ts)
  if (deck === 'trivia') return []
  return entries.filter((entry) =>
    deck === 'phrase' ? entry.concept.category === 'scene' : entry.concept.category !== 'scene',
  )
}
