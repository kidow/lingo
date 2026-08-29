import type { Language } from './types.ts'

/**
 * 학습 트랙. (spec.md §1, §3)
 *
 * 사용자가 고르는 단위는 언어가 아니라 **시험**이다. 무엇을 공부하는지가
 * "일본어"보다 "JLPT"에 더 가깝기 때문이다.
 *
 * 트랙은 언어를 대체하지 않고 **위에 얹힌다.** 개념은 트랙이 아니라 전체가
 * 공유하고, 트랙은 **자기 언어의 단어가 있는 개념만** 골라 출제한다 (§1).
 * 그래서 `cat` 그림 한 장을 여섯 트랙이 같이 쓴다 — 트랙을 더해도 그려야 할
 * 그림은 늘지 않는다. 발음도 시험이 아니라 언어의 것이라
 * `public/audio/{language}/`를 공유한다.
 */
export type TrackId = 'toeic' | 'jlpt' | 'hsk' | 'dele' | 'delf' | 'telc'

export type Track = {
  id: TrackId
  /** 헤더 드롭다운에 보이는 이름 */
  label: string
  language: Language
}

/** 순서가 곧 드롭다운 순서다 */
export const TRACKS: Track[] = [
  { id: 'toeic', label: 'TOEIC', language: 'en' },
  { id: 'jlpt', label: 'JLPT', language: 'ja' },
  { id: 'hsk', label: 'HSK', language: 'zh' },
  { id: 'dele', label: 'DELE', language: 'es' },
  { id: 'delf', label: 'DELF', language: 'fr' },
  { id: 'telc', label: 'telc', language: 'de' },
]

export const TRACK_IDS = TRACKS.map((track) => track.id)

export function trackOf(id: TrackId): Track {
  const found = TRACKS.find((track) => track.id === id)
  if (!found) throw new Error(`알 수 없는 트랙: ${id}`)
  return found
}

/**
 * 기본 트랙. 그림이 있는 개념이 가장 많은 쪽이다 — 첫 화면이 비면 안 된다.
 */
export const DEFAULT_TRACK: TrackId = 'jlpt'
