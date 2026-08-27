'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Card } from './cards'
import type { Entry } from '@/lib/entries'
import {
  initialState,
  nextQuestion,
  recordAnswer,
  recordIntro,
  type EngineState,
} from '@/lib/engine'
import { loadProgress, saveProgress } from '@/lib/progress'
import type { Question } from '@/lib/quiz'
import type { Language } from '@/lib/types'

/**
 * 세로 무한 피드. (spec.md §3, §6)
 *
 * 스크롤은 CSS scroll-snap이 한다. 휠·터치·관성·키보드를 브라우저가 공짜로
 * 주고 의존성이 0이다.
 *
 * 잠금은 CSS가 아니라 **DOM으로** 건다. 미응답 퀴즈 다음 카드를 아예
 * 만들지 않으면 갈 곳이 없다. overflow를 토글하는 방식은 스크롤이 이미
 * 진행 중이면 늦어서 뚫린다 — 실제로 뚫렸다.
 *
 * 진도는 localStorage에 있으므로 서버는 무엇을 낼지 모른다. 그래서 카드는
 * 마운트 후에 만들어진다. 그전에는 뼈대만 보여준다.
 */
export function Feed({ entries, lang }: { entries: Entry[]; lang: Language }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [ready, setReady] = useState(false)
  const [current, setCurrent] = useState(0)
  const [answered, setAnswered] = useState<Set<number>>(new Set())

  const engine = useRef<EngineState>(initialState())
  /** 소개 카드를 이미 기록했는지. 인덱스 기준 */
  const recorded = useRef<Set<number>>(new Set())
  /** 마지막으로 카드를 늘린 시점의 길이. 같은 길이에서 두 번 늘리지 않는다 */
  const extendedFrom = useRef(-1)
  const scroller = useRef<HTMLElement | null>(null)

  const commit = useCallback(
    (state: EngineState) => {
      engine.current = state
      saveProgress(lang, state.progress)
    },
    [lang],
  )

  /**
   * 딱 한 장만 만든다.
   *
   * 미리 여러 장을 만들면 진도가 아직 반영되지 않은 채로 뽑기 때문에 같은
   * 단어가 중복된다. **항상 한 칸 앞까지만** 열어둔다.
   */
  const extendOne = useCallback(
    (from: number) => {
      // 같은 길이에서 두 번 늘리지 않는다. 효과가 두 번 실행돼도(개발 모드의
      // 이중 호출 등) 카드가 두 장 붙지 않게 한다
      if (extendedFrom.current === from) return
      extendedFrom.current = from

      const result = nextQuestion(engine.current, entries, Math.random, Date.now())
      if (!result) return
      commit(result.state)
      setQuestions((previous) => [...previous, result.question])
    },
    [entries, commit],
  )

  // 마운트 후에 진도를 읽는다. 첫 카드는 아래 '한 칸 앞' 효과가 만든다
  useEffect(() => {
    engine.current = initialState(loadProgress(lang))
    recorded.current = new Set()
    setAnswered(new Set())
    setQuestions([])
    setCurrent(0)
    extendedFrom.current = -1
    setReady(true)
  }, [lang, entries])

  // 지금 보고 있는 카드를 추적한다. 소개 카드를 언제 지나갔는지 알아야 한다
  useEffect(() => {
    const root = scroller.current
    if (!root) return

    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (record.intersectionRatio < 0.6) continue
          const index = Number((record.target as HTMLElement).dataset.index)
          if (!Number.isNaN(index)) setCurrent(index)
        }
      },
      { root, threshold: [0.6] },
    )

    for (const child of Array.from(root.children)) observer.observe(child)
    return () => observer.disconnect()
  }, [questions.length])

  // 소개 카드는 판정이 없다. **지나가는 순간** 학습으로 인정한다 (spec.md §3)
  useEffect(() => {
    let state = engine.current
    let changed = false

    for (let i = 0; i < current; i += 1) {
      const question = questions[i]
      if (!question || question.kind !== 'intro' || recorded.current.has(i)) continue
      recorded.current.add(i)
      state = recordIntro(state, question.entry.concept.slug, Date.now())
      changed = true
    }

    if (changed) commit(state)
  }, [current, questions, commit])

  /**
   * 항상 한 칸 앞까지만 열어둔다.
   *
   * 지금 카드가 아직 안 끝났으면 아무것도 열지 않는다. 이게 잠금이다 —
   * 미응답 퀴즈 아래에는 갈 곳이 아예 없다.
   */
  useEffect(() => {
    if (!ready) return
    if (questions.length === 0) {
      extendOne(0)
      return
    }
    const last = questions.length - 1
    const q = questions[last]
    const finished = q.kind === 'intro' || answered.has(last)
    if (current >= last && finished) extendOne(questions.length)
  }, [ready, current, questions, answered, extendOne])

  const handleAnswer = useCallback(
    (index: number, correct: boolean) => {
      const question = questions[index]
      if (!question) return
      commit(recordAnswer(engine.current, question.entry.concept.slug, correct, Date.now()))
      setAnswered((previous) => new Set(previous).add(index))
    },
    [questions, commit],
  )

  return (
    <main
      ref={scroller}
      className="
        h-dvh overflow-y-scroll overscroll-contain
        snap-y snap-mandatory
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
      "
    >
      {!ready || questions.length === 0 ? (
        <Skeleton empty={ready && entries.length === 0} />
      ) : (
        questions.map((question, i) => (
          <div key={`${question.entry.concept.slug}-${question.kind}-${i}`} data-index={i}>
            <Card
              question={question}
              lang={lang}
              first={i === 0}
              onAnswer={(correct) => handleAnswer(i, correct)}
            />
          </div>
        ))
      )}
    </main>
  )
}

/** 진도를 읽기 전에 보여주는 뼈대. 레이아웃이 튀지 않게 카드와 같은 골격이다 */
function Skeleton({ empty }: { empty: boolean }) {
  return (
    <FeedCard>
      <ImageTile />
      <CardBody />
      <Cue>{empty ? '아직 배울 단어가 없어요' : ' '}</Cue>
    </FeedCard>
  )
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
export function CardBody({ children }: { children?: React.ReactNode }) {
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
