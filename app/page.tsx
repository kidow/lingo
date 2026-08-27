import { Feed } from '@/components/feed'
import { entriesFor } from '@/lib/content'
import { DEFAULT_LANGUAGE } from '@/lib/lang'

/**
 * 5단계 — 학습 엔진 연결.
 *
 * 서버는 출제 가능한 개념 목록만 넘긴다. 무엇을 언제 낼지는 진도에 달렸고
 * 진도는 localStorage에 있으므로 클라이언트만 안다. (spec.md §8)
 */
export default function Page() {
  const lang = DEFAULT_LANGUAGE
  return <Feed entries={entriesFor(lang)} lang={lang} />
}
