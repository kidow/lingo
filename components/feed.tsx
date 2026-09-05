'use client'

import { ChevronsUp } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Card } from './cards'
import {
  initialState,
  nextQuestion,
  recordAnswer,
  recordIntro,
  type EngineState,
} from '@/lib/engine'
import { loadProgress, saveProgress, WORD_LADDER, type Ladder, type Progress } from '@/lib/progress'
import { questionKey, type Question } from '@/lib/quiz'
import type { LearnItem } from '@/lib/trivia'
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
/**
 * 앞뒤로 몇 장까지 실제로 그릴까.
 *
 * 카드는 한 장씩 늘어나기만 하고 줄지 않는다 — 200장을 넘긴 세션이면 지나간
 * 199장이 그대로 문서에 남는다. 카드 한 장이 노드 60개와 이미지 하나를 쓰므로
 * 오래 앉아 있을수록 무거워진다. 무한 스와이프가 목표라면(spec.md §6) 한계가
 * 없다는 뜻이라 그대로 둘 수 없다.
 *
 * 1이면 현재·직전·직후 세 장이다. 스냅이 한 칸씩 움직이므로 넘기는 동안
 * 화면에 걸치는 것은 많아야 두 장이고, 되돌아가는 한 칸도 이미 그려져 있다.
 * 아주 세게 튕겨 두 칸 이상을 한 번에 지나가면 빈 자리가 잠깐 보일 수 있다 —
 * 그 자리는 스냅이 멈추는 곳이 아니라 지나가는 곳이다.
 */
const WINDOW = 1

export function Feed({
  entries,
  track,
  lang,
  ladder = WORD_LADDER,
  ordered = false,
  onProgress,
}: {
  entries: LearnItem[]
  /** 진도가 갈리는 단위 */
  track: TrackId
  /** 이 덱의 사다리. 상식은 한 칸이다 (lib/progress.ts) */
  ladder?: Ladder
  /** 새 카드를 목록 앞에서부터 낼지. 상식은 배열 순서가 커리큘럼이다 (lib/engine.ts) */
  ordered?: boolean
  /** 발음 파일과 정답 필드가 따르는 단위 */
  lang: Language
  /**
   * 진도가 바뀔 때마다 부른다. 헤더의 숙련도가 이걸로 산다. (spec.md §3)
   *
   * 진도는 여기 `useRef`에 있어 헤더가 볼 수 없다. 저장소를 헤더가 다시
   * 읽게 하면 언제 읽을지를 또 정해야 하므로, 쓰는 쪽이 알리는 편이 짧다.
   */
  onProgress?: (progress: Progress) => void
}) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [ready, setReady] = useState(false)
  const [current, setCurrent] = useState(0)
  /**
   * 답한 카드의 인덱스 → 그때 고른 값.
   *
   * 무엇을 골랐는지까지 들고 있는 이유는 **화면 밖 카드를 떼기 때문이다.**
   * 다시 붙을 때 이 값을 되돌려 주지 않으면 답이 지워진 채로 되살아난다.
   */
  const [picks, setPicks] = useState<Map<number, string>>(new Map())

  const engine = useRef<EngineState>(initialState())
  /** 소개 카드를 이미 기록했는지. 인덱스 기준 */
  const recorded = useRef<Set<number>>(new Set())
  /** 마지막으로 카드를 늘린 시점의 길이. 같은 길이에서 두 번 늘리지 않는다 */
  const extendedFrom = useRef(-1)
  const scroller = useRef<HTMLElement | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  /** 몇 번째 자리까지 관찰에 넣었는지 */
  const observedUpTo = useRef(0)

  const commit = useCallback(
    (state: EngineState) => {
      engine.current = state
      saveProgress(track, state.progress)
      onProgress?.(state.progress)
    },
    [track, onProgress],
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

      const result = nextQuestion(engine.current, entries, Math.random, Date.now(), ordered)
      if (!result) return
      commit(result.state)
      setQuestions((previous) => [...previous, result.question])
    },
    [entries, commit, ordered],
  )

  // 마운트 후에 진도를 읽는다. 첫 카드는 아래 '한 칸 앞' 효과가 만든다
  useEffect(() => {
    engine.current = initialState(loadProgress(track))
    recorded.current = new Set()
    setPicks(new Map())
    setQuestions([])
    setCurrent(0)
    extendedFrom.current = -1
    setReady(true)
  }, [track, entries])

  /**
   * 지금 보고 있는 카드를 추적한다. 소개 카드를 언제 지나갔는지 알아야 한다.
   *
   * 관찰자는 **한 번만** 만든다. 카드가 늘 때마다 새로 만들어 전체를 다시
   * 관찰하면 자리가 n개일 때 등록이 n²/2번이 된다 — 무한 스와이프에서는
   * 앉아 있을수록 넘기는 손이 무거워진다는 뜻이다.
   */
  useEffect(() => {
    const root = scroller.current
    if (!root) return

    observer.current = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (record.intersectionRatio < 0.6) continue
          const index = Number((record.target as HTMLElement).dataset.index)
          if (!Number.isNaN(index)) setCurrent(index)
        }
      },
      { root, threshold: [0.6] },
    )

    return () => {
      observer.current?.disconnect()
      observer.current = null
    }
  }, [])

  /**
   * 새로 붙은 자리만 관찰에 넣는다. 이미 보고 있는 자리는 그대로 둔다.
   *
   * 자리 수와 카드 수가 1:1이라 인덱스로 어디까지 넣었는지만 세면 된다.
   * 트랙이 바뀌면 카드가 0으로 돌아가고 자리도 통째로 갈리므로, 옛 자리를
   * 붙들지 않도록 그때만 관찰을 끊는다 — 사라진 DOM을 관찰자가 붙잡고 있으면
   * 회수되지 않는다.
   */
  useEffect(() => {
    const root = scroller.current
    const io = observer.current
    if (!root || !io) return

    if (questions.length === 0) {
      io.disconnect()
      observedUpTo.current = 0
      return
    }

    for (let i = observedUpTo.current; i < questions.length; i += 1) {
      const slot = root.children[i]
      if (slot) io.observe(slot)
    }
    observedUpTo.current = questions.length
  }, [questions.length])

  // 소개 카드는 판정이 없다. **지나가는 순간** 학습으로 인정한다 (spec.md §3)
  useEffect(() => {
    let state = engine.current
    let changed = false

    for (let i = 0; i < current; i += 1) {
      const question = questions[i]
      if (!question || question.kind !== 'intro' || recorded.current.has(i)) continue
      recorded.current.add(i)
      state = recordIntro(state, questionKey(question), Date.now())
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
    const finished = q.kind === 'intro' || picks.has(last)
    if (current >= last && finished) extendOne(questions.length)
  }, [ready, current, questions, picks, extendOne])

  const handleAnswer = useCallback(
    (index: number, correct: boolean, picked: string) => {
      const question = questions[index]
      if (!question) return
      // 같은 카드를 두 번 채점하지 않는다. 버튼은 답한 뒤 잠기지만, 카드가
      // 떼였다 붙는 자리라 잠금이 한 번 풀린 것처럼 보일 수 있다
      if (picks.has(index)) return
      commit(recordAnswer(engine.current, questionKey(question), correct, Date.now(), ladder))
      setPicks((previous) => new Map(previous).set(index, picked))
    },
    [questions, picks, commit, ladder],
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
          // 카드가 내용 높이로 줄어 스냅이 어긋난다.
          //
          // 스냅과 높이는 **래퍼가** 들고 있다. 안이 비어도 자리와 스냅점이
          // 그대로 남아야 카드를 떼도 스크롤이 밀리지 않는다
          <div
            key={`${questionKey(question)}-${question.kind}-${i}`}
            data-index={i}
            className="h-full snap-start snap-always"
          >
            {Math.abs(i - current) <= WINDOW && (
              <Card
                question={question}
                lang={lang}
                track={track}
                first={i === 0}
                active={i === current}
                pick={picks.get(i) ?? null}
                onAnswer={(correct, picked) => handleAnswer(i, correct, picked)}
              />
            )}
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
 *
 * **세로가 700px 아래면 상한을 더 낮춘다.** 320×568(구형 4인치)에서 52dvh는
 * 295px이라 시트에 235px밖에 안 남는데, 소개 카드 한 장이 236px을 쓴다 —
 * 1px 차이로 넘길 화살표가 잘렸다. 40dvh면 시트가 90px 넓어진다.
 */
export function CardImage({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative aspect-square max-h-[52dvh] [@media(max-height:700px)]:max-h-[40dvh] w-full shrink-0 overflow-hidden bg-img-bg">
      {children}
    </div>
  )
}

/**
 * 본문 시트. 이미지 위로 올라타 둘을 한 덩어리로 만든다.
 *
 * 테두리를 두르지 않는다. 선을 그으면 그림이 사각형 안에 갇혀
 * "이미지가 배경에 녹는다"는 원칙이 깨진다. (brand-spec.md)
 *
 * 넘치면 **자른다가 아니라 굴린다.** 상황 표현 넷이 한 열로 쌓이는 4지선다는
 * 짧은 화면에서 시트보다 길어지는데, 잘리면 마지막 보기와 모르겠어요가
 * 사라져 카드가 못 쓰게 된다. 스크롤 체이닝은 막지 않는다 — 끝까지 굴리면
 * 그대로 다음 카드로 넘어간다.
 */
/**
 * `bare`는 위에 이미지가 없는 카드다 — 상식 카드 하나뿐이다 (spec.md §5).
 *
 * 물고 올라갈 그림이 없으므로 음수 여백도 둥근 모서리도 뺀다. 그것들은
 * "이미지와 글자가 한 덩어리로 읽힌다"를 만드는 장치인데(§3), 그림이 없는
 * 자리에 남겨 두면 시트가 허공 위로 3rem 떠올라 헤더를 파고든다.
 */
/**
 * 바닥 여백에 **안전영역을 더한다.** manifest가 `standalone`이고 viewport가
 * `viewportFit: 'cover'`라(app/layout.tsx) 홈 인디케이터가 있는 기기에서는
 * 화면 맨 아래가 앱의 것이면서 손가락이 닿지 않는 자리다 — 넘길 화살표와
 * 1열로 쌓인 마지막 보기가 그 아래로 들어간다.
 *
 * 위쪽은 더하지 않는다. `statusBarStyle: 'default'`라 상태바가 불투명하고
 * 웹뷰가 그 아래에서 시작하므로 헤더를 밀 이유가 없다 — `black-translucent`로
 * 바꾸는 날 여기도 같이 봐야 한다.
 */
export function CardSheet({ children, bare = false }: { children: React.ReactNode; bare?: boolean }) {
  return (
    <div
      className={`relative flex min-h-0 flex-1 flex-col gap-md overflow-y-auto bg-surface px-5 pb-[calc(var(--spacing-lg)+env(safe-area-inset-bottom))] ${
        bare ? 'pt-md' : '-mt-lg rounded-t-card pt-lg'
      }`}
    >
      {children}
    </div>
  )
}

