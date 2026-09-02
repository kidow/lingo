import action from '@/content/action.json'
import body from '@/content/body.json'
import city from '@/content/city.json'
import clothes from '@/content/clothes.json'
import everyday from '@/content/everyday.json'
import family from '@/content/family.json'
import food from '@/content/food.json'
import home from '@/content/home.json'
import job from '@/content/job.json'
import nature from '@/content/nature.json'
import number from '@/content/number.json'
import office from '@/content/office.json'
import quality from '@/content/quality.json'
import scene from '@/content/scene.json'
import school from '@/content/school.json'
import sport from '@/content/sport.json'
import time from '@/content/time.json'
import transport from '@/content/transport.json'
import travel from '@/content/travel.json'
import triviaEn from '@/content/trivia/en.json'
import triviaJa from '@/content/trivia/ja.json'
import { entriesForTrack as selectEntries, type Entry } from './entries.ts'
import { triviaEntries, type TriviaEntry } from './trivia.ts'
import type { TrackId } from './track.ts'
import type { Concept, ContentFile, Language, TriviaFile } from './types.ts'

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
const FILES: [topic: string, file: ContentFile][] = [
  ['action', action as ContentFile],
  ['body', body as ContentFile],
  ['city', city as ContentFile],
  ['clothes', clothes as ContentFile],
  ['everyday', everyday as ContentFile],
  ['number', number as ContentFile],
  ['office', office as ContentFile],
  ['quality', quality as ContentFile],
  ['scene', scene as ContentFile],
  ['school', school as ContentFile],
  ['sport', sport as ContentFile],
  ['time', time as ContentFile],
  ['transport', transport as ContentFile],
  ['travel', travel as ContentFile],
  ['family', family as ContentFile],
  ['food', food as ContentFile],
  ['home', home as ContentFile],
  ['job', job as ContentFile],
  ['nature', nature as ContentFile],
]

/**
 * 파일 이름을 개념에 붙여 둔다. JSON에 넣지 않는 이유는 그것이 **콘텐츠가
 * 아니라 배치 정보**여서다 — 개념을 다른 파일로 옮기면 값이 따라 바뀌어야
 * 하는데, JSON에 적어 두면 두 곳을 맞춰야 한다.
 */
export const CONCEPTS: Concept[] = FILES.flatMap(([topic, file]) =>
  file.concepts.map((concept) => ({ ...concept, topic })),
)

/**
 * 상식 파일. **언어가 파일을 가른다** — 개념과 달리 트랙이 공유하지 못한다
 * (lib/trivia.ts). 아직 안 쓴 언어는 자리 자체가 없다.
 */
const TRIVIA: Partial<Record<Language, TriviaFile>> = {
  en: triviaEn as TriviaFile,
  ja: triviaJa as TriviaFile,
}

/** 그 언어의 상식 목록. 없으면 빈 배열이고, 그러면 탭이 서지 않는다 */
export function triviaFor(lang: Language): TriviaEntry[] {
  const file = TRIVIA[lang]
  return file ? triviaEntries(lang, file.items) : []
}

/** 그 트랙에서 출제 가능한 목록. 규칙은 lib/entries.ts가 갖는다 */
export function entriesFor(track: TrackId, concepts: Concept[] = CONCEPTS): Entry[] {
  return selectEntries(track, concepts)
}

export type { Entry }
export {
  audioFile,
  audioPath,
  countByCategory,
  distractorPool,
  exampleAudioKey,
  exampleAudioPath,
  imagePath,
} from './entries.ts'
