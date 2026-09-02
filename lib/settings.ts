import { DECK_IDS, DEFAULT_DECK, type DeckId } from './deck.ts'
import { DEFAULT_TRACK, TRACK_IDS, type TrackId } from './track.ts'
import { DECK_KEY, TRACK_KEY } from './progress.ts'

/**
 * 학습 트랙 설정. (spec.md §3)
 *
 * 진도와 마찬가지로 서버가 모르는 값이라 localStorage에만 있다. 진도는
 * 트랙별로 갈라져 저장되므로(lib/progress.ts) 트랙을 오가도 서로를 덮지 않는다.
 */
export function loadTrack(): TrackId {
  if (typeof localStorage === 'undefined') return DEFAULT_TRACK
  const stored = localStorage.getItem(TRACK_KEY)
  return TRACK_IDS.includes(stored as TrackId) ? (stored as TrackId) : DEFAULT_TRACK
}

export function saveTrack(track: TrackId) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(TRACK_KEY, track)
}

/**
 * 덱 설정. 트랙과 달리 **하나만** 저장한다.
 *
 * 트랙마다 따로 두면 JLPT에서 표현을 보다 HSK로 갔을 때 단어로 돌아온다 —
 * 무엇을 공부하려는지는 언어가 아니라 사람에게 달린 선택이라 트랙을 오가도
 * 따라간다.
 */
export function loadDeck(): DeckId {
  if (typeof localStorage === 'undefined') return DEFAULT_DECK
  const stored = localStorage.getItem(DECK_KEY)
  return DECK_IDS.includes(stored as DeckId) ? (stored as DeckId) : DEFAULT_DECK
}

export function saveDeck(deck: DeckId) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(DECK_KEY, deck)
}
