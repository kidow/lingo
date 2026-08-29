'use client'

import { useState } from 'react'
import { CardImage, CardSheet, FeedCard, SwipeHint } from './feed'
import { ConceptImage } from './concept-image'
import { SayButton } from './say-button'
import { asideOf } from '@/lib/lang'
import type { BlankQuestion, ChoiceQuestion, IntroQuestion, Question } from '@/lib/quiz'
import type { Language } from '@/lib/types'

/**
 * 카드 3종. (spec.md §5)
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
    case 'blank':
      return <BlankCard question={question} {...rest} />
  }
}

/* ── 0. 소개 — 판정 없음 ──────────────────────────────────────────── */

function IntroCard({ question, lang, first }: { question: IntroQuestion } & Common) {
  const { concept, word, answer } = question.entry
  const aside = asideOf(word, lang)

  return (
    <FeedCard>
      <CardImage>
        <ConceptImage slug={concept.slug} alt={concept.meaning_ko} priority={first} />
      </CardImage>

      <CardSheet>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-md">
            <p className="font-jp text-[clamp(34px,10vw,42px)] leading-tight font-bold tracking-tight">
              {answer}
            </p>
            <SayButton slug={concept.slug} lang={lang} label={answer} />
          </div>
          {/* 첫 항목이 발음 보조다. 큰 글자가 이미 읽기라 여기 오는 건 로마자 (lib/lang.ts) */}
          {aside.length > 0 && (
            <p className="font-jp text-sm text-sub">
              {aside.map((value, i) => (i === 0 ? `[${value}]` : value)).join(' · ')}
            </p>
          )}
        </div>

        <div className="flex items-center gap-xs">
          {word.part_of_speech && (
            <span className="shrink-0 rounded-pill border border-line bg-surface px-2 py-0.5 text-xs font-semibold text-sub">
              {word.part_of_speech}
            </span>
          )}
          <p className="text-lg font-semibold">{concept.meaning_ko}</p>
        </div>

        {/* 예문은 소개 카드에만 둔다. 정답 단어가 그대로 들어 있어 퀴즈에 못 쓴다 */}
        {word.example && (
          <div className="border-t border-line pt-md">
            <p className="font-jp text-[15px] leading-relaxed">{word.example.text}</p>
            <p className="mt-1 text-sm text-sub">{word.example.ko}</p>
          </div>
        )}

        {/* 소개 카드는 언제나 넘길 수 있다 */}
        <SwipeHint />
      </CardSheet>
    </FeedCard>
  )
}

/* ── 1. 재인 — 4지선다 ────────────────────────────────────────────── */

function ChoiceCard({ question, lang, onAnswer, first }: { question: ChoiceQuestion } & Common) {
  const { entry, options } = question
  const { concept, answer } = entry
  const [picked, setPicked] = useState<string | null>(null)
  const answered = picked !== null
  const correct = picked === answer

  return (
    <FeedCard>
      <CardImage>
        <ConceptImage slug={concept.slug} alt={concept.meaning_ko} priority={first} />
      </CardImage>

      <CardSheet>
        <div className="grid grid-cols-2 gap-sm">
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
                grid min-h-[72px] place-items-center rounded-ctrl border px-1.5 py-4
                font-jp text-[22px] font-semibold transition active:scale-[.985]
                disabled:active:scale-100
                ${verdictClass(answered, option === answer, option === picked)}
              `}
            >
              {option}
            </button>
          ))}
        </div>
        <Reveal show={answered} correct={correct} question={question} lang={lang} />
        {/* 답해야 다음 카드가 열린다. 화살표는 열린 뒤에만 뜬다 */}
        {answered && <SwipeHint />}
      </CardSheet>
    </FeedCard>
  )
}

/* ── 2. 단서 회상 — 빈칸 ──────────────────────────────────────────── */

function BlankCard({ question, lang, onAnswer, first }: { question: BlankQuestion } & Common) {
  const { entry, chars, holeIndex, keys } = question
  const { concept, answer } = entry
  const answerChar = chars[holeIndex]
  const [picked, setPicked] = useState<string | null>(null)
  const answered = picked !== null
  const correct = picked === answerChar

  return (
    <FeedCard>
      <CardImage>
        <ConceptImage slug={concept.slug} alt={concept.meaning_ko} priority={first} />
      </CardImage>

      <CardSheet>
        <div className="flex items-baseline justify-center gap-2.5">
          {chars.map((char, i) => {
            const hole = i === holeIndex
            if (!hole)
              return (
                <span key={i} className="min-w-[34px] text-center font-jp text-[38px] font-bold">
                  {char}
                </span>
              )
            return (
              <span
                key={i}
                // 답하기 전에는 정답을 DOM에 두지 않는다. 투명하게 칠하기만 하면
                // 스크린리더가 읽고 복사도 된다
                className={`
                  min-w-[34px] border-b-[3px] text-center font-jp text-[38px] font-bold
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
        {answered && <SwipeHint />}
      </CardSheet>
    </FeedCard>
  )
}

/* ── 공통 ─────────────────────────────────────────────────────────── */

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

function Reveal({
  show,
  correct,
  question,
  lang,
}: {
  show: boolean
  correct: boolean
  question: ChoiceQuestion | BlankQuestion
  lang: Language
}) {
  if (!show) return null
  const { concept, word, answer } = question.entry
  const extra = word.term !== answer ? ` · ${word.term}` : ''
  return (
    <div className="flex items-center justify-center gap-sm">
      <p className="text-sm text-sub" role="status">
        <span className="sr-only">{correct ? '정답입니다. ' : '틀렸습니다. 정답은 '}</span>
        {concept.meaning_ko}
        {extra}
      </p>
      {/* 답하기 전에는 이 줄 자체가 없다. 잠금을 disabled가 아니라 렌더로 건다 */}
      <SayButton slug={concept.slug} lang={lang} label={answer} />
    </div>
  )
}
