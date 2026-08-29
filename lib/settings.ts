import { DEFAULT_TRACK, TRACK_IDS, type TrackId } from './track.ts'
import { TRACK_KEY } from './progress.ts'

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
