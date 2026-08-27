'use client'

import { useCallback, useState } from 'react'
import { Card } from './cards'
import type { Question } from '@/lib/quiz'
import type { Language } from '@/lib/types'

/**
 * 세로 무한 피드. (spec.md §3)
 *
 * 스크롤은 CSS scroll-snap이 한다. 휠·터치·관성·키보드를 브라우저가 공짜로
 * 주고 의존성이 0이다.
 *
 * 잠금은 CSS가 아니라 **DOM으로** 건다. 미응답 퀴즈 다음 카드를 아예
 * 마운트하지 않으면 갈 곳이 없다. overflow를 토글하는 방식은 스크롤이 이미
 * 진행 중이면 늦어서 뚫린다 — 실제로 뚫렸다.
 */
export function Feed({ questions, lang }: { questions: Question[]; lang: Language }) {
  const [mounted, setMounted] = useState(() => mountThrough(questions, 0))

  const handleAnswer = useCallback(
    (index: number) => {
      // 답한 카드 다음을 연다. 소개 카드가 이어지면 판정이 없으므로 연쇄로 열린다
      setMounted((current) => Math.max(current, mountThrough(questions, index + 1)))
    },
    [questions],
  )

  return (
    <main
      className="
        h-dvh overflow-y-scroll overscroll-contain
        snap-y snap-mandatory
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
      "
    >
      {questions.slice(0, mounted).map((question, i) => (
        <Card
          key={`${question.entry.concept.slug}-${question.kind}-${i}`}
          question={question}
          lang={lang}
          first={i === 0}
          onAnswer={() => handleAnswer(i)}
        />
      ))}
    </main>
  )
}

/**
 * `from`번째 카드를 마운트하고, 그게 판정 없는 소개 카드면 다음 것까지 계속 연다.
 * 항상 **한 칸 앞이 열려 있어야** 스와이프가 자연스럽다.
 */
function mountThrough(questions: Question[], from: number): number {
  let n = from
  while (n < questions.length) {
    n += 1
    if (questions[n - 1].kind !== 'intro') break
  }
  return n
}

/**
 * 카드 한 장 = 화면 하나. 골격은 세 종류가 모두 같다.
 *   이미지 → 본문 → 하단 안내
 */
export function FeedCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-dvh snap-start snap-always mx-auto flex w-full max-w-[480px] flex-col gap-lg px-5 pt-xl pb-lg">
      {children}
    </section>
  )
}

/** 정사각 이미지 타일. 화면이 낮아도 카드를 밀어내지 않도록 높이를 가둔다. */
export function ImageTile({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative mx-auto aspect-square w-[min(100%,48dvh)] shrink overflow-hidden rounded-card bg-img-bg">
      {children}
    </div>
  )
}

/** 카드별 본문이 들어가는 자리. 남는 높이를 다 먹고 가운데 정렬한다. */
export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-0 flex-1 flex-col justify-center gap-md">{children}</div>
}

/**
 * 하단 한 줄. 장식이 아니라 "다음 장이 있다"는 신호다.
 * 잠금 중에는 무엇을 해야 하는지 말한다. (brand-spec.md — Cue 문구)
 */
export function Cue({ children, locked = false }: { children: React.ReactNode; locked?: boolean }) {
  return (
    <p
      className={`grid h-[22px] shrink-0 place-items-center text-xs tracking-wide ${
        locked ? 'font-semibold text-accent' : 'text-sub'
      }`}
    >
      {children}
    </p>
  )
}
