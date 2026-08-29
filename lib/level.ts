import type { Word } from './types.ts'

/**
 * 카드 좌하단에 적을 레벨 한 줄. (spec.md §5)
 *
 * 시험마다 등급 체계가 다르므로 하나로 합치지 않고 있는 것을 그대로 읽는다.
 * TOEIC은 공식 어휘 등급이 없어 아무것도 돌려주지 않는다 — 없는 등급을
 * 지어내지 않는다.
 */
export function levelOf(word: Word): string | undefined {
  const attributes = word.attributes
  if (!attributes) return undefined
  if ('jlpt' in attributes && attributes.jlpt) return attributes.jlpt
  if ('hsk' in attributes && attributes.hsk) return `HSK ${attributes.hsk}`
  if ('cefr' in attributes && attributes.cefr) return attributes.cefr
  return undefined
}
