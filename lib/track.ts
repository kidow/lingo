import type { Language } from './types.ts'

/**
 * 학습 트랙. (spec.md §1, §3)
 *
 * 사용자가 고르는 단위는 언어가 아니라 **시험**이다. 무엇을 공부하는지가
 * "일본어"보다 "JLPT"에 더 가깝기 때문이다.
 *
 * 트랙은 언어를 대체하지 않고 **위에 얹힌다.** 발음은 시험이 아니라 언어의
 * 것이라(`public/audio/{language}/`) 같은 단어를 다른 트랙이 써도 mp3를
 * 공유한다. 나중에 JLPT를 N5·N4로 쪼개거나 같은 영어에 다른 트랙을 더해도
 * 이 구조가 버틴다 — 트랙만 늘고 언어는 그대로다.
 */
export type TrackId = 'toeic' | 'jlpt'

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
