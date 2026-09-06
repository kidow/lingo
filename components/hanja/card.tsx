'use client'

import { Check, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { gradeLabel, hanjaReadings, hunEum, type HanjaCharacter, type HanjaQuestion } from '@/lib/hanja'
import { CardImage, CardSheet, FeedCard, SwipeHint } from '../feed'
import { WritingPractice } from './writing'
import { StrokePlayback } from './stroke-player'
import { HanjaGlyph, HanjaGlyphs } from './glyph'

const GAVE_UP = '__hanja_gave_up__'

export function HanjaIllustration({ character, active = true, autoPlay = false }: { character: HanjaCharacter; active?: boolean; autoPlay?: boolean }) {
  return <StrokePlayback character={character} active={active} autoPlay={autoPlay}>{({ diagram, controls, started }) => (
    <div className="flex h-full flex-col items-center justify-center gap-2 pb-10" lang="ko">
      <div className="relative size-[clamp(112px,40vw,176px)] shrink-0">
        <HanjaGlyph glyph={character.glyph} className={`h-full w-full ${started ? 'invisible' : ''}`} />
        {diagram && <div className={`absolute inset-0 ${started ? '' : 'invisible'}`}>{diagram}</div>}
      </div>
      {controls}
    </div>
  )}</StrokePlayback>
}

export function HanjaDetails({ character }: { character: HanjaCharacter }) {
  return (
    <>
      <h2 className="text-3xl font-semibold tracking-tight">{hunEum(character)}</h2>
      {hanjaReadings(character).length > 1 && (
        <p className="text-sm text-sub">{hanjaReadings(character).slice(1).map(({ hun, eum }) => `${hun} ${eum}`).join(' · ')}</p>
      )}
      <div className="flex items-center gap-3 text-sm text-sub">
        <span className="rounded-pill border border-line px-2 py-0.5">{gradeLabel(character.readingGrade)}</span>
        <span>부수 <HanjaGlyph glyph={character.radical} /></span>
        <span>{character.strokes}획</span>
      </div>
      {character.example && <div className="mt-3 border-t border-line pt-4">
        <p className="flex items-center gap-3">
          <HanjaGlyphs text={character.example.word} className="gap-0.5 text-2xl" />
          <span>{character.example.reading}</span>
        </p>
        <p className="mt-2 text-sm text-sub">{character.example.meaning}</p>
      </div>}
    </>
  )
}

export function HanjaCard({ question, active, pick, onAnswer }: {
  question: HanjaQuestion
  active: boolean
  pick: string | null
  onAnswer: (correct: boolean, picked: string) => void
}) {
  const [writing, setWriting] = useState(false)
  const writeButton = useRef<HTMLButtonElement>(null)
  const character = question.entry.character
  const intro = question.kind === 'hanja-intro'
  const answered = pick !== null

  if (writing && active) return (
    <FeedCard>
      <WritingPractice character={character} onClose={() => {
        setWriting(false)
        requestAnimationFrame(() => writeButton.current?.focus())
      }} />
    </FeedCard>
  )

  return (
    <FeedCard>
      <CardImage>
        {intro ? <HanjaIllustration character={character} active={active} autoPlay /> : <div className="flex h-full items-center justify-center pb-4" lang="ko">
          {question.entry.skill === 'hun-eum'
            ? <HanjaGlyph glyph={question.prompt} className="size-[clamp(168px,60vw,264px)]" />
            : <span className="text-4xl font-semibold">{question.prompt}</span>}
        </div>}
        {!intro && answered && <span className="absolute right-5 bottom-7 text-sm text-sub">{gradeLabel(character.readingGrade)}</span>}
      </CardImage>
      <CardSheet>
        {intro ? <HanjaDetails character={character} /> : (
          <>
            <div className="grid grid-cols-2 gap-sm" role="group" aria-label={question.entry.skill === 'hun-eum' ? '훈음 선택' : '한자 선택'}>
              {question.options.map((option) => {
                const correct = answered && option === question.answer
                const wrong = answered && option === pick && !correct
                return (
                  <button
                    key={option}
                    type="button"
                    aria-disabled={answered}
                    onClick={() => { if (!answered) onAnswer(option === question.answer, option) }}
                    className={`relative grid min-h-20 place-items-center rounded-ctrl border px-5 py-3 font-semibold transition active:scale-[.985] aria-disabled:active:scale-100
                      ${question.entry.skill === 'recognition' ? 'text-4xl' : Math.max(...question.options.map((value) => value.length)) > 10 ? 'text-base' : 'text-2xl'}
                      ${correct ? 'border-ok bg-ok-soft text-ok' : wrong ? 'border-err bg-err-soft text-err' : answered ? 'border-line opacity-40' : 'border-line bg-surface'}`}
                  >
                    {question.entry.skill === 'recognition' ? <HanjaGlyph glyph={option} /> : option}
                    {correct && <Check className="absolute top-2 right-2 size-4" aria-hidden />}
                    {wrong && <X className="absolute top-2 right-2 size-4" aria-hidden />}
                  </button>
                )
              })}
            </div>
            {!answered && (
              <button type="button" className="mx-auto min-h-11 px-4 text-sm text-sub underline underline-offset-4" onClick={() => onAnswer(false, GAVE_UP)}>모르겠어요</button>
            )}
            <p role="status" className="sr-only">{answered ? `정답 ${question.answer}. ${pick === question.answer ? '맞혔어요' : '다시 연습해 보세요'}` : ''}</p>
          </>
        )}
        {(intro || answered) && (
          <div className="mt-auto pt-3">
            <button ref={writeButton} type="button" className="mx-auto block min-h-11 rounded-ctrl px-5 text-sm text-sub underline underline-offset-4" onClick={() => setWriting(true)}>써보기</button>
            <SwipeHint />
          </div>
        )}
      </CardSheet>
    </FeedCard>
  )
}
