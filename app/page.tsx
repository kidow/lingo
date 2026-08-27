import { Feed } from '@/components/feed'
import { entriesFor } from '@/lib/content'
import { DEFAULT_LANGUAGE } from '@/lib/lang'
import { buildBlank, buildChoice, buildIntro, canBlank, type Question } from '@/lib/quiz'

/**
 * 4단계 — 캐러셀.
 *
 * 순서를 여기서 손으로 짠다. 무엇을 언제 꽂을지 정하는 건 5단계(학습 엔진)다.
 * 지금 확인할 것은 잠금이 실제로 막는가다.
 *   소개(banana) → 4지선다(cat) → 빈칸(clock) → 소개(bread) → 4지선다(banana)
 *
 * 처음에는 앞의 둘만 열린다. 소개는 판정이 없어 연쇄로 열리고, 그 다음
 * 4지선다에서 멈춘다. 답해야 그 다음이 마운트된다.
 */
export default function Page() {
  const lang = DEFAULT_LANGUAGE
  const entries = entriesFor(lang)
  const by = (slug: string) => entries.find((e) => e.concept.slug === slug)

  const questions: Question[] = []
  const push = (q: Question | undefined) => q && questions.push(q)

  const intro = by('banana')
  if (intro) push(buildIntro(intro))

  const choice = by('cat')
  if (choice) push(buildChoice(choice, entries))

  // 정답이 한 글자면 뚫을 자리가 없다. 그런 단어는 재인 칸에 머문다
  const blank = by('clock')
  if (blank) push(canBlank(blank) ? buildBlank(blank) : buildChoice(blank, entries))

  const intro2 = by('bread')
  if (intro2) push(buildIntro(intro2))

  const choice2 = by('banana')
  if (choice2) push(buildChoice(choice2, entries))

  return <Feed questions={questions} lang={lang} />
}
