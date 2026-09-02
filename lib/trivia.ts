import type { Entry } from './entries.ts'
import type { Language, Trivia } from './types.ts'

/**
 * 상식을 다루는 순수 함수들. (spec.md §4, §5)
 *
 * 낱말과 나란히 서는 두 번째 학습 단위다. 다른 점은 셋뿐이다 —
 * **언어가 파일을 가르고**, **그림이 없고**, **오답을 손으로 적는다.**
 * 나머지(뽑기·예약·FSRS·진도)는 낱말과 같은 엔진을 그대로 탄다.
 *
 * lib/entries.ts와 같은 이유로 JSON을 import하지 않는다 — 그래야 번들러
 * 없이도(node --test) 돌릴 수 있다. 실제 로딩은 lib/content.ts가 한다.
 */

/**
 * 엔진이 다루는 상식 한 장.
 *
 * `Entry`와 필드를 맞추지 않는다. 맞추려면 없는 개념과 없는 그림을 지어내야
 * 하고, 그러면 그림 없는 개념이 낱말 피드로 새어 들어간다 (spec.md §4).
 * 공통분모는 `key` 하나뿐이고 엔진이 요구하는 것도 그것뿐이다.
 */
export type TriviaEntry = {
  key: string
  lang: Language
  trivia: Trivia
}

/** 엔진과 피드가 다루는 카드. 한 덱 안에서는 한 종류만 섞인다 */
export type LearnItem = Entry | TriviaEntry

export const isTrivia = (item: LearnItem): item is TriviaEntry => 'trivia' in item

/**
 * 진도 키. 낱말 slug와 절대 겹치지 않게 앞자리를 붙인다.
 *
 * 언어까지 넣는 이유는 같은 id를 언어마다 따로 써도 되게 하려는 것이다 —
 * `particle-wa`는 일본어에도 러시아어에도 어울리는 이름이다. 저장소 자체는
 * 이미 트랙별로 갈라져 있다 (lib/progress.ts).
 */
export const triviaKey = (lang: Language, id: string) => `trivia:${lang}:${id}`

export function triviaEntries(lang: Language, items: Trivia[]): TriviaEntry[] {
  return items.map((trivia) => ({ key: triviaKey(lang, trivia.id), lang, trivia }))
}
