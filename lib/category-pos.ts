/**
 * 일곱 언어의 품사가 가리키는 category. (scripts/check.ts)
 *
 * 오답 보기는 같은 category에서 뽑는다(lib/entries.ts). 동사구가 `adjective`로
 * 적히면 그 카드의 보기는 형용사로 채워져 **품사 모양만 보고도** 오답이
 * 걸러진다. 퀴즈는 안 깨지므로 아무도 몰랐고, 2026-09-28에 세어 보니 314개였다
 * (docs/category-pending.md).
 *
 * 잣대는 다수결이다 — 다섯 언어 이상이 같은 품사일 때만 답한다. 언어마다
 * 품사가 갈리는 개념(`filtering`은 명사 다섯 · 동사 둘)이 있어, 둘셋이 다른
 * 것으로는 틀렸다고 못 한다.
 */
import type { Category } from './types.ts'

const BY_POS: Record<string, Category> = { 명사: 'noun', 동사: 'verb', 형용사: 'adjective' }

/** 이만큼 같은 품사여야 category를 말한다 */
export const POS_QUORUM = 5

export function categoryByPos(words: Record<string, { part_of_speech?: string } | undefined>): Category | null {
  const counts = new Map<Category, number>()
  for (const word of Object.values(words)) {
    const category = word?.part_of_speech ? BY_POS[word.part_of_speech] : undefined
    if (category) counts.set(category, (counts.get(category) ?? 0) + 1)
  }
  for (const [category, count] of counts) if (count >= POS_QUORUM) return category
  return null
}
