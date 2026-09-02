'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { CardImage, CardSheet, FeedCard, SwipeHint } from './feed'
import { ConceptImage } from './concept-image'
import { SayButton } from './say-button'
import { answerSize, blankRow, optionBox, optionColumns, optionSize } from '@/lib/fit'
import { examplesOf, exampleAudioKey, exampleAudioPath, type Entry } from '@/lib/entries'
import { EXAMPLE_AUDIO } from '@/lib/audio-have'
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
/**
 * 채점 결과를 올려보낸다. **무엇을 골랐는지도 함께 준다** — 피드가 그 값을
 * 들고 있어야 카드를 떼었다 다시 붙여도 답한 모습이 그대로 돌아온다
 * (components/feed.tsx의 창).
 */
export type AnswerHandler = (correct: boolean, picked: string) => void

type Common = {
  lang: Language
  onAnswer?: AnswerHandler
  first?: boolean
  /**
   * 지금 화면에 있는 카드인가. 소리를 저절로 울릴지 정한다.
   *
   * 피드는 앞뒤 한 장씩을 미리 그려 둔다(components/feed.tsx). 그래서 **붙는
   * 시점과 보이는 시점이 다르다** — 답을 맞혀 다음 카드가 생기면 아직 보이지도
   * 않는 그 카드가 소리를 냈다. 답한 카드의 소리와 겹쳐 두 번 울린 이유가
   * 이것이다. 소리는 붙을 때가 아니라 **볼 때** 난다.
   */
  active?: boolean
  /**
   * 이미 답한 카드라면 그때 고른 값.
   *
   * 답한 상태는 카드 안에 있다. 화면 밖 카드를 떼는 순간 그 상태도 사라지므로
   * 다시 붙일 때 피드가 되돌려 준다 — 없으면 답이 지워진 채로 되살아나고,
   * 같은 문제를 두 번 채점하게 된다.
   */
  pick?: string | null
}

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
          {/*
            발음 보조에만 대괄호를 씌운다 (lib/lang.ts). 예전에는 **첫 항목**이면
            씌웠는데, 로마자가 비면 표기가 첫 항목으로 올라와 `[計量カップ]`처럼
            한자를 발음인 양 보여줬다
          */}
          {aside.length > 0 && (
            <p className="font-jp text-sm text-sub">
              {aside.map(({ value, sound }) => (sound ? `[${value}]` : value)).join(' · ')}
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
          같은 뜻의 다른 말 (lib/types.ts). 뜻줄 **아래**에 둔다 — 뜻을 읽은
          다음에야 "이 말도 같은 뜻"이 이해되기 때문이다. 큰 글자 옆에 붙이면
          무엇이 학습 대상인지 흐려진다. 퀴즈에는 한 번도 안 나온다
        */}
        {word.also && word.also.length > 0 && (
          <p className="-mt-2 font-jp text-sm text-sub">또는 {word.also.join(' · ')}</p>
        )}

        {/*
          예문은 소개 카드에만 둔다. 정답 단어가 그대로 들어 있어 퀴즈에 못 쓴다.
          여럿이어도 **첫 줄만** 보여준다 — 소개 카드의 일은 한 번 보여주는 것이지
          다 보여주는 것이 아니다. 나머지는 문맥 카드가 회차로 돌려 쓴다
        */}
        {example && (
          <div className="border-t border-line pt-md">
            <div className="flex items-start justify-between gap-md">
              <Copy text={example.text} className="font-jp text-[15px] leading-relaxed" />
              {/*
                예문 소리는 **파일이 있을 때만** 자리를 잡는다. 낱말 발음 버튼과
                달리 비활성으로 남겨 두지 않는다 — 낱말은 언젠가 다 채울 자리라
                빈 버튼이 자리를 지켜야 글자가 안 밀리지만, 예문 소리는 아직
                한 자리도 없어서 3,031장에 회색 버튼만 늘어놓게 된다 (§5)
              */}
              {EXAMPLE_AUDIO.has(`${lang}/${exampleAudioKey(concept.slug, 0, example.text)}`) && (
                <SayButton
                  slug={concept.slug}
                  lang={lang}
                  label={example.text}
                  src={exampleAudioPath(lang, concept.slug, 0, example.text)}
                />
              )}
            </div>
            {/* 로마자는 ja·zh·ru만 값이 있다 (lib/types.ts) */}
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

function ChoiceCard({ question, lang, onAnswer, first, pick, active }: { question: ChoiceQuestion } & Common) {
  const { entry, options } = question
  const { concept, answer } = entry
  // null = 아직 안 답함, GAVE_UP = 모른다고 눌렀음, 그 외 = 고른 보기.
  // 다시 붙는 카드는 피드가 준 값으로 시작한다
  const [picked, setPicked] = useState<string | null>(pick ?? null)
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
                onAnswer?.(option === answer, option)
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
              onAnswer?.(false, GAVE_UP)
            }}
            className="mx-auto rounded-ctrl px-4 py-2 text-sm text-sub underline underline-offset-4 transition active:scale-[.985]"
          >
            모르겠어요
          </button>
        )}

        <Reveal show={answered} correct={correct} gaveUp={gaveUp} question={question} lang={lang} active={active} />
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
 * 풀 수 있다. 답한 뒤에는 그 자리에 낱말과 뜻과 예문이 들어온다 (`ListenBrief`).
 */
function ListenCard({ question, lang, onAnswer, first, pick, active }: { question: ListenQuestion } & Common) {
  const { entry, options } = question
  const { concept, answer } = entry
  const [picked, setPicked] = useState<string | null>(pick ?? null)
  const answered = picked !== null
  const gaveUp = picked === GAVE_UP
  const correct = picked === concept.slug

  return (
    <FeedCard>
      <CardImage>
        {answered ? (
          <ListenBrief entry={entry} lang={lang} correct={correct} gaveUp={gaveUp} />
        ) : (
          <div className="grid h-full place-items-center">
            {/* 답하기 전에는 이 버튼이 문제 전체다. 눌러 다시 들을 수 있고, 두 번째부터는 느리게 나온다 */}
            <SayButton slug={concept.slug} lang={lang} label={answer} autoPlay={active} />
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
                  onAnswer?.(isAnswer, option.concept.slug)
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
              onAnswer?.(false, GAVE_UP)
            }}
            className="mx-auto rounded-ctrl px-4 py-2 text-sm text-sub underline underline-offset-4 transition active:scale-[.985]"
          >
            모르겠어요
          </button>
        )}

        {/*
          `Reveal`을 두지 않는다. 뜻도 소리 버튼도 위 판이 이미 들고 있어서
          같은 줄을 한 화면에 두 번 찍게 된다
        */}
        <div className="mt-auto">{answered && <SwipeHint />}</div>
      </CardSheet>
    </FeedCard>
  )
}

/**
 * 듣기 카드가 답을 받은 뒤 그림 자리에 들어가는 판.
 *
 * 전에는 정답 그림이 그 자리에 들어왔다. 그런데 보기 넷 가운데 하나가 이미
 * 초록 테두리를 두르고 서 있어 **같은 그림이 한 화면에 두 번** 보였다. 두 번째
 * 그림은 새로 알려주는 것이 없다.
 *
 * 그래서 그 자리에는 아직 안 보여준 것을 놓는다 — 낱말과 읽기와 뜻과 예문.
 * 듣기 카드는 소리에서 뜻으로 바로 가는 카드라 **철자를 한 번도 보지 않고**
 * 지나간다. 답한 뒤가 그것을 볼 유일한 자리다.
 */
function ListenBrief({
  entry,
  lang,
  correct,
  gaveUp,
}: {
  entry: Entry
  lang: Language
  correct: boolean
  gaveUp: boolean
}) {
  const { concept, word, answer } = entry
  const aside = asideOf(word, lang)
  const [example] = examplesOf(word)
  const verdict = gaveUp ? '정답은 ' : correct ? '정답입니다. ' : '틀렸습니다. 정답은 '

  return (
    // 그림 자리와 같은 크기라 넘칠 수 있다. 자르지 않고 굴린다 (CardSheet와 같은 이유)
    <div className="flex h-full flex-col justify-center gap-1.5 overflow-y-auto px-5 py-4 text-center" role="status">
      <span className="sr-only">{verdict}</span>
      <div className="flex items-center justify-center gap-sm">
        <Copy text={answer} className={`font-jp ${answerSize(answer)} leading-tight font-bold tracking-tight`} />
        <SayButton slug={concept.slug} lang={lang} label={answer} />
      </div>
      {aside.length > 0 && (
        <p className="font-jp text-sm text-sub">
          {aside.map(({ value, sound }) => (sound ? `[${value}]` : value)).join(' · ')}
        </p>
      )}
      <p className="text-lg font-semibold">{concept.meaning_ko}</p>
      {example && (
        <div className="mt-1 border-t border-line pt-2">
          <p className="font-jp text-[15px] leading-relaxed">{example.text}</p>
          <p className="mt-1 text-sm text-sub">{example.ko}</p>
        </div>
      )}
    </div>
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
function ClozeCard({ question, lang, onAnswer, first, pick, active }: { question: ClozeQuestion } & Common) {
  const { entry, options, before, after } = question
  const { concept, answer } = entry
  const [picked, setPicked] = useState<string | null>(pick ?? null)
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
                onAnswer?.(option === answer, option)
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
              onAnswer?.(false, GAVE_UP)
            }}
            className="mx-auto rounded-ctrl px-4 py-2 text-sm text-sub underline underline-offset-4 transition active:scale-[.985]"
          >
            모르겠어요
          </button>
        )}

        <Reveal show={answered} correct={correct} gaveUp={gaveUp} question={question} lang={lang} active={active} />
        <div className="mt-auto">{answered && <SwipeHint />}</div>
      </CardSheet>
    </FeedCard>
  )
}

/* ── 3. 단서 회상 — 빈칸 ──────────────────────────────────────────── */

function BlankCard({ question, lang, onAnswer, first, pick, active }: { question: BlankQuestion } & Common) {
  const { entry, chars, holeIndex, keys } = question
  const { concept, answer } = entry
  const answerChar = chars[holeIndex]
  // 낱말이 길면 글자를 줄이고 줄바꿈을 허용한다 (lib/fit.ts)
  const { row, cell } = blankRow(chars)
  const [picked, setPicked] = useState<string | null>(pick ?? null)
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
                onAnswer?.(key === answerChar, key)
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

        <Reveal show={answered} correct={correct} question={question} lang={lang} active={active} />
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
  active,
}: {
  show: boolean
  correct: boolean
  gaveUp?: boolean
  question: ChoiceQuestion | BlankQuestion | ClozeQuestion | ListenQuestion
  lang: Language
  /** 보고 있는 카드에서만 저절로 울린다 */
  active?: boolean
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
      <SayButton slug={concept.slug} lang={lang} label={answer} autoPlay={active} />
    </div>
  )
}
