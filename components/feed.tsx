'use client'

import { ChevronsUp } from 'lucide-react'
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
import type { TrackId } from '@/lib/track'
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
export function Feed({
  entries,
  track,
  lang,
}: {
  entries: Entry[]
  /** 진도가 갈리는 단위 */
  track: TrackId
  /** 발음 파일과 정답 필드가 따르는 단위 */
  lang: Language
}) {
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
      saveProgress(track, state.progress)
    },
    [track],
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
    engine.current = initialState(loadProgress(track))
    recorded.current = new Set()
    setAnswered(new Set())
    setQuestions([])
    setCurrent(0)
    extendedFrom.current = -1
    setReady(true)
  }, [track, entries])

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
        min-h-0 flex-1 overflow-y-scroll overscroll-contain
        snap-y snap-mandatory
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
      "
    >
      {!ready || questions.length === 0 ? (
        <Skeleton empty={ready && entries.length === 0} />
      ) : (
        questions.map((question, i) => (
          // 래퍼도 높이를 넘겨받아야 카드가 화면 하나를 채운다. 여기가 auto면
          // 카드가 내용 높이로 줄어 스냅이 어긋난다
          <div key={`${question.entry.concept.slug}-${question.kind}-${i}`} data-index={i} className="h-full">
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

/**
 * 다음 카드가 있다는 신호. 시트 맨 아래에서 위로 튄다. (spec.md §3)
 *
 * 문구 대신 아이콘 하나다. `답을 고르세요` 같은 지시문은 쓰지 않기로 했고
 * (§5), 여기서 말하려는 것은 "무엇을 하라"가 아니라 **"위로 갈 수 있다"** 다.
 *
 * 뜨는 조건이 카드마다 다르다. 소개 카드는 언제나 넘길 수 있으니 상시,
 * 퀴즈 카드는 답해야 다음이 열리므로 답한 뒤다. **화살표가 보이는 것과
 * 실제로 넘어갈 수 있는 것이 항상 같다** — 보이면 열려 있다.
 *
 * 스크린리더에는 숨긴다. 스크롤은 원래 되는 것이고, 이 아이콘은 그 사실을
 * 눈으로만 알려 준다. 움직임을 줄이는 설정에서는 globals.css가 애니메이션을
 * 멈춰 화살표만 남는다.
 */
export function SwipeHint() {
  return (
    <div className="grid h-7 shrink-0 place-items-center text-sub" aria-hidden>
      <ChevronsUp className="size-5 animate-bounce" strokeWidth={1.8} />
    </div>
  )
}

/** 진도를 읽기 전에 보여주는 뼈대. 레이아웃이 튀지 않게 카드와 같은 골격이다 */
function Skeleton({ empty }: { empty: boolean }) {
  return (
    <FeedCard>
      <CardImage />
      <CardSheet>
        {/* 단어는 있는데 그림이 없을 수도 있다. 그 경우와 구분되게 쓴다 */}
        {empty && <p className="text-sm text-sub">그림이 준비된 단어가 아직 없어요</p>}
      </CardSheet>
    </FeedCard>
  )
}

/**
 * 카드 한 장 = 화면 하나. 골격은 세 종류가 모두 같다.
 *   이미지 → 본문 시트
 *
 * 카드 자체는 여백을 갖지 않는다. 이미지가 레일 폭을 꽉 채우고 시트가 자기
 * 패딩을 들고 있기 때문이다.
 */
export function FeedCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="feed-card h-full snap-start snap-always mx-auto flex w-full max-w-[480px] flex-col">
      {children}
    </section>
  )
}

/**
 * 카드 상단 이미지. 레일 폭을 꽉 채운다. (spec.md §3)
 *
 * 모바일 전용이 되면서 이미지를 가운데 띄워 둘 이유가 사라졌다. 폭을 그대로
 * 쓰고 아래 시트가 그 위로 올라타 이미지와 글자가 한 덩어리로 읽힌다.
 *
 * 정사각이되 높이에 상한을 둔다. 짧은 화면에서 정사각을 고집하면 시트가
 * 밀려 예문이 잘린다.
 */
export function CardImage({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative aspect-square max-h-[52dvh] w-full shrink-0 overflow-hidden bg-img-bg">
      {children}
    </div>
  )
}

/**
 * 본문 시트. 이미지 위로 올라타 둘을 한 덩어리로 만든다.
 *
 * 테두리를 두르지 않는다. 선을 그으면 그림이 사각형 안에 갇혀
 * "이미지가 배경에 녹는다"는 원칙이 깨진다. (brand-spec.md)
 */
export function CardSheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative -mt-lg flex min-h-0 flex-1 flex-col gap-md rounded-t-card bg-surface px-5 pt-lg pb-lg">
      {children}
    </div>
  )
}

