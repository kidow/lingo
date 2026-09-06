'use client'

import { Check, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { gradeLabel, hanjaReadings, hunEum, type HanjaCharacter, type HanjaQuestion } from '@/lib/hanja'
import { CardImage, CardSheet, FeedCard, SwipeHint } from '../feed'
import { WritingPractice } from './writing'

/** 한국 한자 자형을 우선한다. 글꼴 윤곽은 필순이나 채점 근거가 아니다. */
export const HANJA_FONT = { fontFamily: '"AppleMyungjo", "Noto Serif CJK KR", "Noto Serif KR", serif' }
const GAVE_UP = '__hanja_gave_up__'

export function HanjaDetails({ character }: { character: HanjaCharacter }) {
  return (
    <>
      <h2 className="text-3xl font-semibold tracking-tight">{hunEum(character)}</h2>
      {hanjaReadings(character).length > 1 && (
        <p className="text-sm text-sub">{hanjaReadings(character).slice(1).map(({ hun, eum }) => `${hun} ${eum}`).join(' · ')}</p>
      )}
      <div className="flex items-center gap-3 text-sm text-sub">
        <span className="rounded-pill border border-line px-2 py-0.5">{gradeLabel(character.readingGrade)}</span>
        <span>부수 <span style={HANJA_FONT}>{character.radical}</span></span>
        <span>{character.strokes}획</span>
      </div>
      {character.example && <div className="mt-3 border-t border-line pt-4">
        <p className="flex items-center gap-3">
          <span style={HANJA_FONT} className="text-2xl tracking-widest">{character.example.word}</span>
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
        <div className="flex h-full items-center justify-center pb-4" lang="ko">
          <span
            style={intro || question.entry.skill === 'hun-eum' ? HANJA_FONT : undefined}
            className={intro || question.entry.skill === 'hun-eum'
              ? 'text-[clamp(112px,40vw,176px)] leading-none' : 'text-4xl font-semibold'}
          >{intro ? character.glyph : question.prompt}</span>
        </div>
        {!intro && <span className="absolute right-5 bottom-7 text-sm text-sub">{gradeLabel(character.readingGrade)}</span>}
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
                    style={question.entry.skill === 'recognition' ? HANJA_FONT : undefined}
                  >
                    {option}
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
