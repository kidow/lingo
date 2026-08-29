import jlpt from '@/content/jlpt.json'
import toeic from '@/content/toeic.json'
import { entriesFor as selectEntries, type Entry } from './entries.ts'
import { trackOf, type TrackId } from './track.ts'
import type { Concept, ContentFile } from './types.ts'

/**
 * 콘텐츠 로더. (spec.md §4, §8)
 *
 * DB도 fetch도 없다. JSON을 빌드 시점에 import해 번들에 굽는다.
 *
 * **파일이 곧 트랙이다.** 개념이 어느 트랙에 속하는지를 데이터에 필드로 두지
 * 않고 파일 경계로 정한다 — 한 개념이 두 트랙에 걸치는 일이 없고, 트랙을
 * 늘리는 것이 파일을 늘리는 것과 같아진다.
 *
 * 파일을 추가하면 여기 배열에도 넣는다. 정적 import여야 번들러가 잡는다.
 */
const FILES: Array<[TrackId, ContentFile]> = [
  ['toeic', toeic as ContentFile],
  ['jlpt', jlpt as ContentFile],
]

/** 로드된 개념은 자기 트랙을 안다 */
export type TrackedConcept = Concept & { track: TrackId }

export const CONCEPTS: TrackedConcept[] = FILES.flatMap(([track, file]) =>
  file.concepts.map((concept) => ({ ...concept, track })),
)

/** 그 트랙에서 출제 가능한 목록. 트랙이 쓰는 언어로 정답을 뽑는다 */
export function entriesFor(track: TrackId, concepts: TrackedConcept[] = CONCEPTS): Entry[] {
  return selectEntries(
    trackOf(track).language,
    concepts.filter((concept) => concept.track === track),
  )
}

export type { Entry }
export { audioPath, countByCategory, distractorPool, imagePath } from './entries.ts'
