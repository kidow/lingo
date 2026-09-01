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
export type TrackId = 'toeic' | 'jlpt' | 'hsk' | 'dele' | 'delf' | 'telc' | 'torfl'

export type Track = {
  id: TrackId
  /** 헤더 드롭다운에 보이는 이름 */
  label: string
  /**
   * 트랙 이름 뒤에 붙는 국기. 드롭다운 항목과 헤더 트리거에 함께 선다.
   *
   * 두문자어 일곱 개는 서로 닮아 눈으로 훑을 때 걸리는 데가 없다 — DELE와
   * DELF는 글자 하나만 다르다. 국기는 **읽지 않고도** 갈라지는 표지라
   * 목록을 훑는 시간을 줄인다.
   *
   * 이름을 대신하지는 않는다. 국기 하나로는 시험을 특정할 수 없고(영어권
   * 시험은 여럿이다) 문화권과 언어가 일대일도 아니라, 어디까지나 이름 옆의
   * 보조 표지다. 그래서 스크린리더에는 읽히지 않는다.
   */
  flag: string
  language: Language
}

/** 순서가 곧 드롭다운 순서다 */
export const TRACKS: Track[] = [
  // TOEIC은 미국 ETS가 내고 발음도 미국식이라 성조기를 붙인다
  { id: 'toeic', label: 'TOEIC', flag: '🇺🇸', language: 'en' },
  { id: 'jlpt', label: 'JLPT', flag: '🇯🇵', language: 'ja' },
  { id: 'hsk', label: 'HSK', flag: '🇨🇳', language: 'zh' },
  { id: 'dele', label: 'DELE', flag: '🇪🇸', language: 'es' },
  { id: 'delf', label: 'DELF', flag: '🇫🇷', language: 'fr' },
  // telc 공식 표기는 소문자지만 나머지 다섯이 두문자어라 혼자 소문자면 오타로 읽힌다
  { id: 'telc', label: 'TELC', flag: '🇩🇪', language: 'de' },
  // TORFL은 러시아어 능력 시험(ТРКИ)의 영어 표기다
  { id: 'torfl', label: 'TORFL', flag: '🇷🇺', language: 'ru' },
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
