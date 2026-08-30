import action from '@/content/action.json'
import body from '@/content/body.json'
import city from '@/content/city.json'
import everyday from '@/content/everyday.json'
import family from '@/content/family.json'
import food from '@/content/food.json'
import home from '@/content/home.json'
import job from '@/content/job.json'
import nature from '@/content/nature.json'
import office from '@/content/office.json'
import quality from '@/content/quality.json'
import scene from '@/content/scene.json'
import school from '@/content/school.json'
import time from '@/content/time.json'
import travel from '@/content/travel.json'
import { entriesForTrack as selectEntries, type Entry } from './entries.ts'
import type { TrackId } from './track.ts'
import type { Concept, ContentFile } from './types.ts'

/**
 * 콘텐츠 로더. (spec.md §4, §8)
 *
 * DB도 fetch도 없다. JSON을 빌드 시점에 import해 번들에 굽는다.
 *
 * **파일은 주제고, 트랙은 언어로 고른다.** 개념은 트랙에 속하지 않는다 —
 * `cat` 하나를 JLPT도 HSK도 DELE도 쓴다. 어느 트랙에 나올지는 그 개념이
 * 그 언어의 단어를 갖고 있느냐로 정해진다 (spec.md §1).
 *
 * 파일을 추가하면 여기 배열에도 넣는다. 정적 import여야 번들러가 잡는다.
 */
const FILES: ContentFile[] = [
  action as ContentFile,
  body as ContentFile,
  city as ContentFile,
  everyday as ContentFile,
  office as ContentFile,
  quality as ContentFile,
  scene as ContentFile,
  school as ContentFile,
  time as ContentFile,
  travel as ContentFile,
  family as ContentFile,
  food as ContentFile,
  home as ContentFile,
  job as ContentFile,
  nature as ContentFile,
]

export const CONCEPTS: Concept[] = FILES.flatMap((file) => file.concepts)

/** 그 트랙에서 출제 가능한 목록. 규칙은 lib/entries.ts가 갖는다 */
export function entriesFor(track: TrackId, concepts: Concept[] = CONCEPTS): Entry[] {
  return selectEntries(track, concepts)
}

export type { Entry }
export { audioPath, countByCategory, distractorPool, imagePath } from './entries.ts'
