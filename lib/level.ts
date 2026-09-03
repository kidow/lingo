import type { TrackId } from './track.ts'
import type { Word } from './types.ts'

/**
 * 카드 좌하단에 적을 레벨 한 줄. (spec.md §5)
 *
 * 시험마다 등급 체계가 다르므로 하나로 합치지 않고 있는 것을 그대로 읽는다.
 *
 * TOEIC은 공식 어휘 등급이 없다. 대신 TOEIC Service List의 **순위**를 적는다 —
 * 등급이 아니므로 `TSL`이라는 이름 그대로 붙인다. 없는 등급을 지어내지 않는다.
 *
 * `track`은 zh에서만 갈린다. HSK와 TOCFL이 같은 낱말에 등급을 둘 다 붙일 수
 * 있어서(`attributes.hsk`·`attributes.tocfl`) 트랙을 모르면 어느 쪽을 읽을지
 * 못 정한다 — 생략하면 hsk를 기본값으로 삼는다.
 */
export function levelOf(word: Word, track?: TrackId): string | undefined {
  const attributes = word.attributes
  if (!attributes) return undefined
  if ('jlpt' in attributes && attributes.jlpt) return attributes.jlpt
  if (track === 'tocfl')
    return 'tocfl' in attributes && attributes.tocfl ? `TOCFL ${attributes.tocfl}` : undefined
  // HSK 3.0의 7~9급은 나뉘지 않은 한 묶음이다. 데이터가 7로 오므로 여기서 편다
  if ('hsk' in attributes && attributes.hsk)
    return `HSK ${attributes.hsk >= 7 ? '7-9' : attributes.hsk}`
  if ('cefr' in attributes && attributes.cefr) return attributes.cefr
  if ('tsl' in attributes && attributes.tsl) return `TSL ${attributes.tsl}`
  if ('torfl' in attributes && attributes.torfl) return attributes.torfl
  return undefined
}
