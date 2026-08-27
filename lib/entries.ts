import { answerOf } from './lang.ts'
import type { Category, Concept, Language, Word } from './types.ts'

/**
 * 개념을 다루는 순수 함수들.
 *
 * JSON을 import하지 않는다. 그래야 번들러 없이도(node --test) 돌릴 수 있다.
 * 실제 데이터 로딩은 lib/content.ts가 한다.
 */

/** 개념 + 그 언어의 단어. 카드가 실제로 다루는 단위다. */
export type Entry = {
  concept: Concept
  word: Word
  /** 그 언어에서 정답으로 쓰는 문자열 */
  answer: string
}

/**
 * 그 언어로 **출제 가능한** 개념만 추린다.
 * 단어가 없거나 정답 필드가 비어 있으면 조용히 빠진다. (spec.md §4)
 */
export function entriesFor(lang: Language, concepts: Concept[]): Entry[] {
  const entries: Entry[] = []
  for (const concept of concepts) {
    const word = concept.words[lang]
    if (!word) continue
    const answer = answerOf(word, lang)
    if (!answer) continue
    entries.push({ concept, word, answer })
  }
  return entries
}

/** 오답 보기를 뽑을 후보. 같은 category에서만 고른다. (spec.md §5) */
export function distractorPool(entry: Entry, entries: Entry[]): Entry[] {
  const sameCategory = entries.filter(
    (other) =>
      other.concept.slug !== entry.concept.slug &&
      other.concept.category === entry.concept.category,
  )
  if (sameCategory.length >= 3) return sameCategory

  // 같은 category가 모자라면 전체 풀로 넓힌다
  return entries.filter((other) => other.concept.slug !== entry.concept.slug)
}

export function countByCategory(entries: Entry[]): Record<Category, number> {
  const counts: Record<Category, number> = { noun: 0, verb: 0, adjective: 0, scene: 0 }
  for (const entry of entries) counts[entry.concept.category] += 1
  return counts
}

/** 이미지·오디오 경로는 slug에서 결정된다. 데이터에 경로 필드를 두지 않는 이유다. */
export function imagePath(slug: string): string {
  return `/concepts/${slug}.webp`
}

export function audioPath(slug: string, lang: Language): string {
  return `/audio/${lang}/${slug}.mp3`
}
