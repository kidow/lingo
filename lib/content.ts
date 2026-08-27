import nouns from '@/content/nouns.json'
import { entriesFor as selectEntries, type Entry } from './entries.ts'
import type { Concept, ContentFile, Language } from './types.ts'

/**
 * 콘텐츠 로더. (spec.md §4, §8)
 *
 * DB도 fetch도 없다. JSON을 빌드 시점에 import해 번들에 굽는다.
 * 파일 분할은 편의일 뿐이고 앱은 전부를 하나의 풀로 읽는다.
 *
 * 파일을 추가하면 여기 배열에도 넣는다. 정적 import여야 번들러가 잡는다.
 * 이 모듈만 JSON을 안다 — 나머지 로직은 lib/entries.ts에 있어 node로 테스트된다.
 */
const FILES: ContentFile[] = [nouns as ContentFile]

export const CONCEPTS: Concept[] = FILES.flatMap((file) => file.concepts)

export function entriesFor(lang: Language, concepts: Concept[] = CONCEPTS): Entry[] {
  return selectEntries(lang, concepts)
}

export type { Entry }
export { audioPath, countByCategory, distractorPool, imagePath } from './entries.ts'
