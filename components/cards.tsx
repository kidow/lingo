'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { CardImage, CardSheet, FeedCard, SwipeHint } from './feed'
import { ConceptImage } from './concept-image'
import { SayButton } from './say-button'
import { answerSize, blankRow, optionBox, optionColumns, optionSize } from '@/lib/fit'
import { examplesOf } from '@/lib/entries'
import { asideOf } from '@/lib/lang'
import { levelOf } from '@/lib/level'
import type {
  BlankQuestion,
  ChoiceQuestion,
  ClozeQuestion,
  IntroQuestion,
  ListenQuestion,
  Question,
} from '@/lib/quiz'
import type { Language } from '@/lib/types'

/**
 * 카드 5종. (spec.md §5)
 *
 * 문항 지시문을 쓰지 않는다. 이미지와 보기만으로 무엇을 묻는지 자명하다.
 * 자가판정이 없다 — 객관적으로 채점되는 카드만 있다.
 *
 * 채점 결과는 onAnswer로 올려보낸다. 이걸 받아 rung을 옮기고 다음 등장을
 * 예약하는 건 5단계(학습 엔진)다. 지금은 화면만 한다.
 */
export type AnswerHandler = (correct: boolean) => void

type Common = { lang: Language; onAnswer?: AnswerHandler; first?: boolean }

export function Card({ question, ...rest }: { question: Question } & Common) {
  switch (question.kind) {
    case 'intro':
      return <IntroCard question={question} {...rest} />
    case 'choice':
      return <ChoiceCard question={question} {...rest} />
    case 'listen':
      return <ListenCard question={question} {...rest} />
    case 'cloze':
      return <ClozeCard question={question} {...rest} />
    case 'blank':
      return <BlankCard question={question} {...rest} />
  }
}

/* ── 0. 소개 — 판정 없음 ──────────────────────────────────────────── */

function IntroCard({ question, lang, first }: { question: IntroQuestion } & Common) {
  const { concept, word, answer } = question.entry
  const aside = asideOf(word, lang)
  const level = levelOf(word)
  const [example] = examplesOf(word)

  return (
    <FeedCard>
      <CardImage>
        <ConceptImage slug={concept.slug} alt={concept.meaning_ko} priority={first} />
      </CardImage>

      <CardSheet>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-md">
            <Copy
              text={answer}
              className={`font-jp ${answerSize(answer)} leading-tight font-bold tracking-tight`}
            />
            <SayButton slug={concept.slug} lang={lang} label={answer} />
          </div>
          {/* 첫 항목이 발음 보조다. 큰 글자가 이미 읽기라 여기 오는 건 로마자 (lib/lang.ts) */}
          {aside.length > 0 && (
            <p className="font-jp text-sm text-sub">
              {aside.map((value, i) => (i === 0 ? `[${value}]` : value)).join(' · ')}
            </p>
          )}
        </div>

        {/*
          레벨은 뜻 줄 오른쪽 끝에 붙인다. 배지가 아니라 조용한 한 줄이다 —
          학습 대상이 아니라 참고 정보라서 크기와 색을 뜻보다 낮춘다. 값이 없는
          트랙(TOEIC·TORFL)은 자리째 빠진다 — 없는 등급을 지어내지 않는다
        */}
        <div className="flex items-center gap-xs">
          {word.part_of_speech && (
            <span className="shrink-0 rounded-pill border border-line bg-surface px-2 py-0.5 text-xs font-semibold text-sub">
              {word.part_of_speech}
            </span>
          )}
          <p className="text-lg font-semibold">{concept.meaning_ko}</p>
          {level && <span className="ml-auto shrink-0 text-xs text-sub">{level}</span>}
        </div>

        {/*
          예문은 소개 카드에만 둔다. 정답 단어가 그대로 들어 있어 퀴즈에 못 쓴다.
          여럿이어도 **첫 줄만** 보여준다 — 소개 카드의 일은 한 번 보여주는 것이지
          다 보여주는 것이 아니다. 나머지는 문맥 카드가 회차로 돌려 쓴다
        */}
        {example && (
          <div className="border-t border-line pt-md">
            <Copy text={example.text} className="font-jp text-[15px] leading-relaxed" />
            {/* 예문도 소리 내 볼 수 있어야 한다. ja·zh·ru만 값이 있다 (lib/types.ts) */}
            {example.romanization && (
              <p className="mt-0.5 text-xs text-sub">{example.romanization}</p>
            )}
            <p className="mt-1 text-sm text-sub">{example.ko}</p>
          </div>
        )}

        {/* 소개 카드는 언제나 넘길 수 있다 */}
        <div className="mt-auto">
          <SwipeHint />
        </div>
      </CardSheet>
    </FeedCard>
  )
}

/* ── 1. 재인 — 4지선다 ────────────────────────────────────────────── */

function ChoiceCard({ question, lang, onAnswer, first }: { question: ChoiceQuestion } & Common) {
  const { entry, options } = question
  const { concept, answer } = entry
  // null = 아직 안 답함, GAVE_UP = 모른다고 눌렀음, 그 외 = 고른 보기
  const [picked, setPicked] = useState<string | null>(null)
  const answered = picked !== null
  const gaveUp = picked === GAVE_UP
  const correct = picked === answer

  return (
    <FeedCard>
      <CardImage>
        <ConceptImage slug={concept.slug} alt={concept.meaning_ko} priority={first} />
      </CardImage>

      <CardSheet>
        <div className={`grid gap-sm ${optionColumns(options) === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => {
                if (answered) return
                setPicked(option)
                onAnswer?.(option === answer)
              }}
              className={`
                grid ${optionBox(options)} place-items-center rounded-ctrl border px-1.5
                font-jp ${optionSize(options)} font-semibold transition active:scale-[.985]
                disabled:active:scale-100
                ${verdictClass(answered, option === answer, option === picked)}
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {/*
          찍어서 맞히면 FSRS에는 "안다"로 기록된다. 그 한 번이 다음 복습을
          몇 주 뒤로 밀어 버리므로, 모를 때 모른다고 말할 자리를 준다.
          보기와 같은 모양이면 다섯 번째 보기로 읽히므로 테두리 없는
          조용한 글자 버튼으로 두고, 답한 뒤에는 자리째 사라진다.
        */}
        {!answered && (
          <button
            type="button"
            onClick={() => {
              setPicked(GAVE_UP)
              onAnswer?.(false)
            }}
            className="mx-auto rounded-ctrl px-4 py-2 text-sm text-sub underline underline-offset-4 transition active:scale-[.985]"
          >
            모르겠어요
          </button>
        )}

        <Reveal show={answered} correct={correct} gaveUp={gaveUp} question={question} lang={lang} />
        {/* 답해야 다음 카드가 열린다. 화살표는 열린 뒤에만 뜬다 */}
        <div className="mt-auto">{answered && <SwipeHint />}</div>
      </CardSheet>
    </FeedCard>
  )
}

/* ── 1'. 재인 — 듣고 그림 고르기 ──────────────────────────────────── */

/**
 * 소리를 듣고 그림 넷 중 고른다. (spec.md §5)
 *
 * 재인 칸의 두 번째 모습이다. 사다리를 늘리지 않은 이유는 듣기가 더 어려운
 * 단계가 아니라 **같은 재인을 다른 감각으로 하는 것**이기 때문이다.
 *
 * 보기가 글자가 아니라 그림인 이유는, 글자를 깔면 듣기가 아니라 받아쓰기가
 * 되기 때문이다 — 소리를 철자로 옮긴 다음에야 고를 수 있다. 그림은 소리에서
 * 곧장 뜻으로 간다.
 *
 * 위쪽 그림 자리에는 **소리 버튼만** 놓는다. 정답 그림을 띄워 놓으면 듣지 않고
 * 풀 수 있다. 답한 뒤에 그 자리에 정답 그림이 들어온다.
 */
function ListenCard({ question, lang, onAnswer, first }: { question: ListenQuestion } & Common) {
  const { entry, options } = question
  const { concept, answer } = entry
  const [picked, setPicked] = useState<string | null>(null)
  const answered = picked !== null
  const gaveUp = picked === GAVE_UP
  const correct = picked === concept.slug

  return (
    <FeedCard>
      <CardImage>
        {answered ? (
          <ConceptImage slug={concept.slug} alt={concept.meaning_ko} priority={first} />
        ) : (
          <div className="grid h-full place-items-center">
            {/* 답하기 전에는 이 버튼이 문제 전체다. 눌러 다시 들을 수 있고, 두 번째부터는 느리게 나온다 */}
            <SayButton slug={concept.slug} lang={lang} label={answer} autoPlay />
          </div>
        )}
      </CardImage>

      <CardSheet>
        <div className="grid grid-cols-2 gap-sm">
          {options.map((option) => {
            const isAnswer = option.concept.slug === concept.slug
            return (
              <button
                key={option.concept.slug}
                type="button"
                disabled={answered}
                aria-label={option.concept.meaning_ko}
                onClick={() => {
                  if (answered) return
                  setPicked(option.concept.slug)
                  onAnswer?.(isAnswer)
                }}
                // 정사각으로 깔면 넷이 세로를 다 먹어 모르겠어요가 접힌 자리로
                // 밀린다. 4:3이면 그림은 그대로 읽히면서 80px이 남고, 세로가
                // 700px 아래인 화면에서는 3:2로 더 눕힌다 — 320×568에서 4:3은
                // 10px이 모자랐다
                className={`
                  relative aspect-[4/3] [@media(max-height:700px)]:aspect-[3/2]
                  overflow-hidden rounded-ctrl border transition
                  active:scale-[.985] disabled:active:scale-100
                  ${verdictClass(answered, isAnswer, option.concept.slug === picked)}
                `}
              >
                <ConceptImage
                  slug={option.concept.slug}
                  alt={option.concept.meaning_ko}
                  priority={first}
                />
              </button>
            )
          })}
        </div>

        {!answered && (
          <button
            type="button"
            onClick={() => {
              setPicked(GAVE_UP)
              onAnswer?.(false)
            }}
            className="mx-auto rounded-ctrl px-4 py-2 text-sm text-sub underline underline-offset-4 transition active:scale-[.985]"
          >
            모르겠어요
          </button>
        )}

        <Reveal show={answered} correct={correct} gaveUp={gaveUp} question={question} lang={lang} />
        <div className="mt-auto">{answered && <SwipeHint />}</div>
      </CardSheet>
    </FeedCard>
  )
}

/* ── 2. 문맥 — 예문 빈칸 ──────────────────────────────────────────── */

/**
 * 예문에서 낱말을 뚫고 넷 중 고른다.
 *
 * 4지선다는 그림을 보고 이름을 고른다. 여기서는 **문장이 그림 자리를 대신**
 * 한다 — 그림은 위에 그대로 있지만 단서는 문장이다. 뜻을 아는 것과 문장 안
 * 자리를 아는 것은 다른 일이라 사다리의 칸을 따로 둔다 (lib/progress.ts).
 *
 * 답한 뒤에는 빈칸을 정답으로 메워 문장을 완성해 보여 준다. 틀린 채로 문장이
 * 비어 있으면 무엇이 맞았는지 읽을 자리가 없다.
 *
 * **그림은 답한 뒤에 나온다.** 위에 수건 그림을 띄워 놓고 "The ___ is clean."을
 * 물으면 문장을 읽지 않고도 답이 되어 재인 칸과 같은 문제가 된다. 자리는
 * 비워 두되 없애지는 않는다 — 없애면 카드 높이가 달라져 넘길 때 튄다.
 */
function ClozeCard({ question, lang, onAnswer, first }: { question: ClozeQuestion } & Common) {
  const { entry, options, before, after } = question
  const { concept, answer } = entry
  const [picked, setPicked] = useState<string | null>(null)
  const answered = picked !== null
  const gaveUp = picked === GAVE_UP
  const correct = picked === answer

  return (
    <FeedCard>
      <CardImage>
        {answered && <ConceptImage slug={concept.slug} alt={concept.meaning_ko} priority={first} />}
      </CardImage>

      <CardSheet>
        <p className="font-jp text-[17px] leading-relaxed">
          {before}
          <span
            className={`
              mx-0.5 inline-block min-w-[64px] border-b-[3px] text-center align-baseline font-bold
              ${!answered ? 'border-accent' : correct ? 'border-ok text-ok' : 'border-err text-err'}
            `}
          >
            {answered ? answer : ' '}
          </span>
          {after}
        </p>

        <div className={`grid gap-sm ${optionColumns(options) === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => {
                if (answered) return
                setPicked(option)
                onAnswer?.(option === answer)
              }}
              className={`
                grid ${optionBox(options)} place-items-center rounded-ctrl border px-1.5
                font-jp ${optionSize(options)} font-semibold transition active:scale-[.985]
                disabled:active:scale-100
                ${verdictClass(answered, option === answer, option === picked)}
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {!answered && (
          <button
            type="button"
            onClick={() => {
              setPicked(GAVE_UP)
              onAnswer?.(false)
            }}
            className="mx-auto rounded-ctrl px-4 py-2 text-sm text-sub underline underline-offset-4 transition active:scale-[.985]"
          >
            모르겠어요
          </button>
        )}

        <Reveal show={answered} correct={correct} gaveUp={gaveUp} question={question} lang={lang} />
        <div className="mt-auto">{answered && <SwipeHint />}</div>
      </CardSheet>
    </FeedCard>
  )
}

/* ── 3. 단서 회상 — 빈칸 ──────────────────────────────────────────── */

function BlankCard({ question, lang, onAnswer, first }: { question: BlankQuestion } & Common) {
  const { entry, chars, holeIndex, keys } = question
  const { concept, answer } = entry
  const answerChar = chars[holeIndex]
  // 낱말이 길면 글자를 줄이고 줄바꿈을 허용한다 (lib/fit.ts)
  const { row, cell } = blankRow(chars)
  const [picked, setPicked] = useState<string | null>(null)
  const answered = picked !== null
  const correct = picked === answerChar

  return (
    <FeedCard>
      <CardImage>
        <ConceptImage slug={concept.slug} alt={concept.meaning_ko} priority={first} />
      </CardImage>

      <CardSheet>
        <div className={`flex flex-wrap items-baseline justify-center ${row}`}>
          {chars.map((char, i) => {
            const hole = i === holeIndex
            if (!hole)
              return (
                <span key={i} className={`${cell} text-center font-jp font-bold`}>
                  {char}
                </span>
              )
            return (
              <span
                key={i}
                // 답하기 전에는 정답을 DOM에 두지 않는다. 투명하게 칠하기만 하면
                // 스크린리더가 읽고 복사도 된다
                className={`
                  ${cell} border-b-[3px] text-center font-jp font-bold
                  ${!answered ? 'border-accent' : correct ? 'border-ok text-ok' : 'border-err text-err'}
                `}
              >
                {answered ? picked : ' '}
              </span>
            )
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-2.5">
          {keys.map((key) => (
            <button
              key={key}
              type="button"
              disabled={answered}
              onClick={() => {
                if (answered) return
                setPicked(key)
                onAnswer?.(key === answerChar)
              }}
              className={`
                min-w-[60px] rounded-ctrl border px-2 py-3.5 font-jp text-[22px] font-semibold
                transition active:scale-95 disabled:active:scale-100
                ${verdictClass(answered, key === answerChar, key === picked)}
              `}
            >
              {key}
            </button>
          ))}
        </div>

        <Reveal show={answered} correct={correct} question={question} lang={lang} />
        {/* 답해야 다음 카드가 열린다. 화살표는 열린 뒤에만 뜬다 */}
        <div className="mt-auto">{answered && <SwipeHint />}</div>
      </CardSheet>
    </FeedCard>
  )
}

/* ── 공통 ─────────────────────────────────────────────────────────── */

/** 보기 문자열과 절대 겹치지 않는 값. 모른다고 누른 상태를 나타낸다 */
const GAVE_UP = '\u0000gave-up'

/**
 * 색만으로 정오답을 전달하지 않는다. 틀렸을 때 정답도 함께 초록으로
 * 드러내고, 아래 Reveal이 뜻과 표기를 말로 보여준다. (brand-spec.md)
 */
function verdictClass(answered: boolean, isAnswer: boolean, isPicked: boolean) {
  if (!answered) return 'border-line bg-surface text-ink'
  if (isAnswer) return 'border-ok bg-ok-soft text-ok'
  if (isPicked) return 'border-err bg-err-soft text-err'
  return 'border-line bg-surface text-sub opacity-60'
}

/**
 * 눌러서 복사하는 글자. **모양은 그대로 둔다** — 밑줄도 색도 커서도 바꾸지
 * 않는다. 카드는 읽는 화면이지 조작하는 화면이 아니라서, 눌러도 되는 자리처럼
 * 보이기 시작하면 시선이 그리로 끌린다. 필요할 때 눌러 보면 복사가 될 뿐이다.
 *
 * 클립보드는 보안 컨텍스트(localhost·https)에서만 열린다. 막힌 경우를 조용히
 * 넘기면 복사된 줄 알고 엉뚱한 것을 붙여넣게 되므로 실패도 토스트로 말한다.
 */
function Copy({ text, className = '' }: { text: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        navigator.clipboard.writeText(text).then(
          () => toast.success('복사했습니다', { description: text }),
          () => toast.error('복사하지 못했습니다', { description: text }),
        )
      }
      className={`text-left ${className}`}
    >
      {text}
    </button>
  )
}

function Reveal({
  show,
  correct,
  gaveUp = false,
  question,
  lang,
}: {
  show: boolean
  correct: boolean
  gaveUp?: boolean
  question: ChoiceQuestion | BlankQuestion | ClozeQuestion | ListenQuestion
  lang: Language
}) {
  if (!show) return null
  const { concept, word, answer } = question.entry
  const extra = word.term !== answer ? ` · ${word.term}` : ''
  const verdict = gaveUp ? '정답은 ' : correct ? '정답입니다. ' : '틀렸습니다. 정답은 '
  return (
    <div className="flex items-center justify-center gap-sm">
      <p className="text-sm text-sub" role="status">
        <span className="sr-only">{verdict}</span>
        {concept.meaning_ko}
        {extra}
      </p>
      {/* 답하기 전에는 이 줄 자체가 없다. 잠금을 disabled가 아니라 렌더로 건다 */}
      <SayButton slug={concept.slug} lang={lang} label={answer} autoPlay />
    </div>
  )
}
