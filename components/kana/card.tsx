'use client'

import { Check, X } from 'lucide-react'
import { ConceptImage } from '../concept-image'
import { CardImage, CardSheet, FeedCard, SwipeHint } from '../feed'
import { SayButton } from '../say-button'
import { SCRIPT_LABEL, glyphOf, type KanaQuestion, type KanaScript, type KanaUnit } from '@/lib/kana'
import type { Concept } from '@/lib/types'

const GAVE_UP = '__kana_gave_up__'

/** 그림 자리에 서는 글자 하나. 소개와 퀴즈가 같은 크기를 쓴다 */
function Glyph({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span lang="ja" className={`font-jp leading-none font-medium ${className}`}>
      {text}
    </span>
  )
}

/**
 * 예시 낱말 한 줄. 썸네일 → 낱말 → 뜻·로마자 → 재생.
 *
 * **재생은 또렷한 버튼이다.** 낱말 자체를 누르게 두면 그 동작이 카드 넘기기와
 * 부딪힌다 (docs/kana-tab-design.md §5).
 *
 * 배우는 글자를 낱말 안에서 물들인다. 물들이지 않으면 `ヘルメット` 다섯 글자
 * 중 어느 것을 배우는 중인지 매번 눈으로 찾아야 한다.
 */
function Example({ concept, glyph }: { concept: Concept; glyph: string }) {
  const word = concept.words.ja
  const reading = word?.reading ?? word?.term ?? ''
  const parts = reading.split(glyph)
  return (
    <li className="flex items-center gap-3">
      <div className="relative size-11 shrink-0 overflow-hidden rounded-ctrl bg-img-bg">
        <ConceptImage slug={concept.slug} alt={concept.meaning_ko} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[17px] font-semibold">
          {parts.map((part, i) => (
            // 낱말 안에서 자리로만 갈리는 조각이라 인덱스가 곧 이름이다
            <span key={i}>
              {i > 0 && <Glyph text={glyph} className="rounded-[4px] bg-pick px-px text-accent" />}
              <Glyph text={part} />
            </span>
          ))}
        </p>
        <p className="text-xs text-sub">
          {concept.meaning_ko}
          {word?.romanization ? ` · ${word.romanization}` : ''}
        </p>
      </div>
      <SayButton slug={concept.slug} lang="ja" label={`${reading} 발음 듣기`} />
    </li>
  )
}

/**
 * 가나 소개. 글자 하나와 예시 셋. (docs/kana-tab-design.md §5)
 *
 * **상대 표기는 메타 줄에 작게 적는다.** 크게 나란히 세우면 뒤이어 설 그쪽
 * 카드와 겹쳐 보여 방금 본 것을 또 본 줄 알고 넘긴다 — 207장에서 매번 난다.
 *
 * `を`에는 상대 표기가 없다. `ヲ`는 현대 일본어에서 쓰지 않는다 (§1).
 */
function KanaIntro({
  unit,
  script,
  examples,
  concepts,
}: {
  unit: KanaUnit
  script: KanaScript
  examples: string[]
  concepts: Map<string, Concept>
}) {
  const glyph = glyphOf(unit, script)!
  const other = script === 'hira' ? unit.kata : unit.hira
  return (
    <>
      <div className="flex items-baseline gap-3">
        <h2 className="text-3xl font-semibold tracking-tight">
          <Glyph text={glyph} />
        </h2>
        <span className="text-lg font-semibold text-sub">{unit.romaji}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm text-sub">
        <span className="rounded-pill border border-line px-2 py-0.5">{SCRIPT_LABEL[script]}</span>
        {other ? (
          <span>
            {SCRIPT_LABEL[script === 'hira' ? 'kata' : 'hira']} <Glyph text={other} className="text-base" />
          </span>
        ) : (
          <span>가타카나 표기는 쓰지 않는다</span>
        )}
      </div>
      <ul className="mt-1 flex flex-col gap-3 border-t border-line pt-4">
        {examples.map((slug) => {
          const concept = concepts.get(slug)
          return concept ? <Example key={slug} concept={concept} glyph={glyph} /> : null
        })}
      </ul>
    </>
  )
}

/**
 * 가나 카드. 소개 아니면 4지선다다 — 사다리가 한 칸이다 (KANA_LADDER).
 *
 * 보기 글자 크기가 방향마다 다르다. `소리 → 글자`는 글자를 고르는 일이라
 * 크게 세우고, `글자 → 소리`는 로마자라 그만큼 클 이유가 없다. 구별 표시가
 * 붙은 보기(`o (を·조사)`)는 길어서 더 그렇다.
 */
export function KanaCard({
  question,
  concepts,
  pick,
  onAnswer,
}: {
  question: KanaQuestion
  concepts: Map<string, Concept>
  pick: string | null
  onAnswer: (correct: boolean, picked: string) => void
}) {
  const { entry } = question
  const glyph = glyphOf(entry.unit, entry.script)!
  const intro = question.kind === 'kana-intro'
  const answered = pick !== null
  const picking = question.kind === 'kana-choice' ? question : null
  const glyphOptions = picking?.entry.skill === 'write'

  return (
    <FeedCard>
      <CardImage>
        {/*
          어느 문자인지는 **늘 적는다.** 배울 때 구별하지 않을 뿐이고
          `シ`와 `ツ`처럼 모양만으로는 어느 쪽인지 헷갈리는 자리가 있다
        */}
        <span className="absolute top-4 left-4 rounded-pill border border-line bg-surface px-2.5 py-1 text-[11px] font-bold text-sub">
          {SCRIPT_LABEL[entry.script]}
        </span>
        <div className="flex h-full items-center justify-center pb-4">
          {intro || picking?.entry.skill === 'read' ? (
            <Glyph text={glyph} className="text-[clamp(96px,34vw,150px)]" />
          ) : (
            <span className="text-4xl font-semibold">{picking?.prompt}</span>
          )}
        </div>
        {intro && <span className="absolute right-5 bottom-7 text-sm font-semibold text-sub">{entry.unit.romaji}</span>}
      </CardImage>

      <CardSheet>
        {intro ? (
          <KanaIntro unit={entry.unit} script={entry.script} examples={entry.examples} concepts={concepts} />
        ) : picking ? (
          <>
            <div
              className="grid grid-cols-2 gap-sm"
              role="group"
              aria-label={glyphOptions ? '글자 선택' : '소리 선택'}
            >
              {picking.options.map((option) => {
                const correct = answered && option === picking.answer
                const wrong = answered && option === pick && !correct
                return (
                  <button
                    key={option}
                    type="button"
                    aria-disabled={answered}
                    onClick={() => {
                      if (!answered) onAnswer(option === picking.answer, option)
                    }}
                    className={`relative grid min-h-20 place-items-center rounded-ctrl border px-5 py-3 font-semibold transition active:scale-[.985] aria-disabled:active:scale-100
                      ${glyphOptions ? 'text-4xl' : 'text-2xl'}
                      ${correct ? 'border-ok bg-ok-soft text-ok' : wrong ? 'border-err bg-err-soft text-err' : answered ? 'border-line opacity-40' : 'border-line bg-surface'}`}
                  >
                    {glyphOptions ? <Glyph text={option} /> : option}
                    {correct && <Check className="absolute top-2 right-2 size-4" aria-hidden />}
                    {wrong && <X className="absolute top-2 right-2 size-4" aria-hidden />}
                  </button>
                )
              })}
            </div>
            {!answered && (
              <button
                type="button"
                className="mx-auto min-h-11 px-4 text-sm text-sub underline underline-offset-4"
                onClick={() => onAnswer(false, GAVE_UP)}
              >
                모르겠어요
              </button>
            )}
            <p role="status" className="sr-only">
              {answered
                ? `정답 ${picking.answer}. ${pick === picking.answer ? '맞혔어요' : '다시 연습해 보세요'}`
                : ''}
            </p>
          </>
        ) : null}

        {(intro || answered) && (
          <div className="mt-auto pt-3">
            <SwipeHint />
          </div>
        )}
      </CardSheet>
    </FeedCard>
  )
}
