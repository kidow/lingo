'use client'

import { Check, X } from 'lucide-react'
import { useState } from 'react'
import { Drawer } from 'vaul'
import { gradeLabel, hanjaReadings, hunEum, type HanjaCharacter, type HanjaQuestion } from '@/lib/hanja'
import { CHARACTER_INDEX, RADICAL_INDEX } from '@/lib/hanja-corpus'
import { CardImage, CardSheet, FeedCard, SwipeHint } from '../feed'
import { WritingPractice } from './writing'
import { StrokePlayback } from './stroke-player'
import { HanjaGlyph, HanjaGlyphs } from './glyph'
import { HanjaStudyGlyph, HanjaStudyStrokeCount } from './study-glyph'

const GAVE_UP = '__hanja_gave_up__'

export function HanjaIllustration({ character, active = true, autoPlay = false, large = false }: { character: HanjaCharacter; active?: boolean; autoPlay?: boolean; large?: boolean }) {
  return <StrokePlayback character={character} active={active} autoPlay={autoPlay}>{({ diagram, controls, started }) => (
    <div className="flex h-full flex-col items-center justify-center gap-2 pb-10" lang="ko">
      <div className={`relative shrink-0 ${large ? 'size-[clamp(168px,60vw,264px)]' : 'size-[clamp(112px,40vw,176px)]'}`}>
        <HanjaStudyGlyph character={character} className={`h-full w-full ${started ? 'invisible' : ''}`} />
        {diagram && <div className={`absolute inset-0 ${started ? '' : 'invisible'}`}>{diagram}</div>}
      </div>
      {controls}
    </div>
  )}</StrokePlayback>
}

/**
 * 부수 블록. 왼쪽에 부수 글자, 오른쪽에 훈음(배정자) 또는 명칭(엄호·갓머리), 說文解字 번역,
 * 그 아래 원문 한 줄. 원문이 없는 부수(亠·爿)는 훈음만 (docs/hanja-radical-example-design.md).
 */
export function HanjaRadicalBlock({ character }: { character: HanjaCharacter }) {
  const entry = RADICAL_INDEX.get(character.radical)
  return (
    <div className="flex items-start gap-3">
      <HanjaGlyph glyph={character.radical} className="mt-0.5 text-4xl" />
      <div className="min-w-0">
        <p className="text-sm"><span className="text-sub">부수</span> {entry?.label}</p>
        {entry?.radical.translation && <p className="mt-1 text-sm leading-relaxed text-sub">{entry.radical.translation}</p>}
        {entry?.radical.shuowen && <p className="mt-1 text-xs leading-relaxed text-sub/70" lang="zh-Hant">說文 · {entry.radical.shuowen.text}</p>}
      </div>
    </div>
  )
}

/** 한자어 표기·독음과 글자마다의 훈음. 뜻풀이는 싣지 않는다. */
function HanjaExampleBlock({ example }: { example: NonNullable<HanjaCharacter['example']> }) {
  const parts = [...example.word].map((glyph) => CHARACTER_INDEX.get(glyph)).filter((c) => c !== undefined)
  return (
    <>
      <p className="flex items-center gap-3">
        <HanjaGlyphs text={example.word} className="gap-0.5 text-2xl" />
        <span>{example.reading}</span>
      </p>
      <p className="mt-1.5 text-sm text-sub">{parts.map((c) => hunEum(c)).join(' · ')}</p>
    </>
  )
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
        <HanjaStudyStrokeCount character={character} />
      </div>
      <div className="mt-3 border-t border-line pt-4"><HanjaRadicalBlock character={character} /></div>
      {character.example && <div className="mt-3 border-t border-line pt-4"><HanjaExampleBlock example={character.example} /></div>}
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
  const character = question.entry.character
  const intro = question.kind === 'hanja-intro'
  const answered = pick !== null

  return (
    <Drawer.Root open={writing && active} onOpenChange={setWriting} handleOnly>
    <FeedCard>
      <CardImage>
        {intro ? <HanjaIllustration character={character} active={active && !writing} autoPlay large /> : <div className="flex h-full items-center justify-center pb-4" lang="ko">
          {question.entry.skill === 'hun-eum'
            ? <HanjaGlyph glyph={question.prompt} className="size-[clamp(168px,60vw,264px)]" />
            : <span className="text-4xl font-semibold">{question.prompt}</span>}
        </div>}
        {!intro && answered && <span className="absolute right-5 bottom-7 text-sm text-sub">{gradeLabel(character.readingGrade)} · {character.strokes}획</span>}
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
            {answered && <div className="border-t border-line pt-3"><HanjaRadicalBlock character={character} /></div>}
          </>
        )}
        {(intro || answered) && (
          <div className="mt-auto pt-3">
            <Drawer.Trigger className="mx-auto block min-h-11 rounded-ctrl px-5 text-sm text-sub underline underline-offset-4">써보기</Drawer.Trigger>
            <SwipeHint />
          </div>
        )}
      </CardSheet>
    </FeedCard>
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 z-40 bg-ink/40" />
      <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[85dvh] w-full max-w-[480px] flex-col overflow-hidden rounded-t-card bg-surface outline-none" lang="ko">
        <WritingPractice character={character} />
      </Drawer.Content>
    </Drawer.Portal>
    </Drawer.Root>
  )
}
