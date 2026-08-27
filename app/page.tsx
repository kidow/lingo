import { Card } from '@/components/cards'
import { Feed } from '@/components/feed'
import { entriesFor } from '@/lib/content'
import { DEFAULT_LANGUAGE } from '@/lib/lang'
import { buildBlank, buildChoice, buildIntro, canBlank, type Question } from '@/lib/quiz'

/**
 * 3단계 — 카드 3종.
 *
 * 순서를 여기서 손으로 짠다. 무엇을 언제 꽂을지 정하는 건 5단계(학습 엔진)다.
 * 지금은 세 렌더러와 채점이 제대로 도는지만 본다.
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

  const choice2 = by('bread')
  if (choice2) push(buildChoice(choice2, entries))

  const blank2 = by('banana')
  if (blank2 && canBlank(blank2)) push(buildBlank(blank2))

  return (
    <Feed>
      {questions.map((question, i) => (
        <Card key={`${question.entry.concept.slug}-${question.kind}-${i}`} question={question} lang={lang} first={i === 0} />
      ))}
    </Feed>
  )
}
