'use client'

import { ChevronDown } from 'lucide-react'
import { ReferenceDrawer } from './reference-drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DECKS, type DeckId } from '@/lib/deck'
import type { Article } from '@/lib/types'
import { TRACKS, trackOf, type TrackId } from '@/lib/track'

/**
 * 화면 맨 위 고정 줄. 왼쪽에 학습 언어 하나뿐이다. (spec.md §3)
 *
 * 오랫동안 헤더를 두지 않았다. 화면이 하나뿐이라 이동할 곳이 없었기 때문이다.
 * 트랙이 둘이 되면서 **고를 것**이 생겼고, 고를 것은 카드 안에 둘 수 없다 —
 * 카드는 넘기는 물건이라 설정이 섞이면 오터치가 난다.
 *
 * 그래서 헤더에는 트랙만 있다. 탭도, 뒤로가기도, 메뉴도 없다.
 * 사용자가 고르는 단위는 언어가 아니라 시험이다 — "일본어"보다 "JLPT"가
 * 무엇을 공부하는지에 더 가깝다.
 *
 * 고르는 행위라 항목을 **라디오**로 둔다. 지금 무엇이 켜져 있는지가 체크
 * 표시로 드러나고, 스크린리더에도 그렇게 읽힌다.
 *
 * 트랙 옆에 숙련도가 하나 더 붙는다. 이것은 목표가 아니라 **상태**다 —
 * 하루가 지나도 리셋되지 않고, 채워도 축하하지 않으며, 채우라고 조르지도
 * 않는다. 그래서 스트릭·일일 목표를 배제한 §2와 부딪히지 않는다.
 *
 * 트리거 **밖**에 둔다. 안에 넣으면 `학습 트랙` 라벨에 숫자가 섞여 버튼
 * 이름이 "학습 트랙 12%"가 된다 — 버튼이 하는 일과 무관한 말이다.
 */
export function Header({
  track,
  onChange,
  mastery,
  decks = [],
  deck,
  onDeck,
  articles = [],
}: {
  track: TrackId
  onChange: (track: TrackId) => void
  /**
   * 이 트랙에 세울 탭. 하나뿐이면 자리째 빠진다 — 표현도 상식도 없는 트랙이
   * 있고(TOEIC), 고를 것이 하나면 그건 고르는 자리가 아니다 (lib/deck.ts)
   */
  decks?: DeckId[]
  /** 지금 보는 덱 */
  deck?: DeckId
  onDeck?: (deck: DeckId) => void
  /**
   * 완전히 외운 비율. 아직 없으면 null이고, 그러면 헤더는 트랙 하나뿐이던
   * 시절과 똑같다. (lib/progress.ts)
   */
  mastery?: string | null
  /**
   * 이 트랙에서 볼 수 있는 참고 글. 없으면 버튼이 자리째 빠진다 — 덱 탭이
   * 트랙에 따라 서고 마는 것과 같은 이유다 (content/articles.json)
   */
  articles?: Article[]
}) {
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-line px-5">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="학습 트랙"
          className="flex items-center gap-1 rounded-ctrl outline-none"
        >
          <span className="text-lg font-bold tracking-tight">{trackOf(track).label}</span>
          {/* 국기는 이름 뒤에 붙는 표지다 (lib/track.ts). 버튼 이름에는 안 섞인다 */}
          <span aria-hidden className="text-lg leading-none">{trackOf(track).flag}</span>
          <ChevronDown className="size-4 text-sub" strokeWidth={2.5} aria-hidden />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" sideOffset={10} className="min-w-36">
          <DropdownMenuRadioGroup
            value={track}
            onValueChange={(value) => onChange(value as TrackId)}
          >
            {TRACKS.map(({ id, label, flag }) => (
              // Base UI의 라디오 항목은 기본적으로 메뉴를 열어 둔다. 여러 개를
              // 연달아 고르는 자리라면 맞지만 여기서는 하나를 고르면 끝이다
              <DropdownMenuRadioItem key={id} value={id} closeOnClick className="text-[15px]">
                {label}
                {/*
                  스크린리더에는 읽히지 않는다 — "TOEIC 미국 국기"는 항목
                  이름이 아니다. 트리거에도 같은 표지가 선다
                */}
                <span aria-hidden>{flag}</span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/*
        숫자만 있으면 무엇의 12%인지 알 수 없다. 눈으로는 옆의 트랙 이름이
        그 말을 대신하지만 스크린리더에는 따로 붙여 준다.

        자릿수가 바뀔 때 글자가 밀리지 않게 고정폭 숫자를 쓴다
      */}
      {mastery && (
        <span
          className="ml-sm text-sm font-semibold text-sub tabular-nums"
          // 덱마다 세는 대상이 다르다. "단어"라고 못 박으면 상식 탭에서 틀린
          // 말이 된다 (lib/deck.ts)
          aria-label={`완전히 외운 비율 ${mastery}`}
        >
          {mastery}
        </span>
      )}

      {/*
        덱 탭. 한 트랙 안에서 낱말과 통짜 표현을 갈라 본다 (lib/deck.ts).

        드롭다운이 아니라 **늘 보이는 두 글자**로 둔다 — 고를 것이 두셋뿐이고,
        지금 무엇을 보고 있는지가 트랙만큼 자주 바뀌기 때문이다.

        왼쪽 숙련도는 단어·표현일 때 트랙 전체를 가리키고, 상식일 때만 상식
        안에서의 비율이 된다 — 세는 단위가 달라 한 줄에 못 합친다 (lib/deck.ts)

        고를 것이 하나뿐인 트랙에서는 자리째 빠진다. TOEIC은 TSL 표제어만 내는데
        통짜 표현은 그 목록에 없다 (lib/entries.ts)

        상식은 트랙이 아니라 **언어**의 것이라 아직 안 쓴 언어에서는 안 선다
        (lib/trivia.ts)
      */}
      {/* 오른쪽에 서는 것들을 한 묶음으로 둔다. 덱 탭이 없는 트랙에서도 가나
          버튼은 같은 자리에 서야 해서 ml-auto를 바깥이 든다 */}
      <div className="ml-auto flex items-center gap-3">
        {deck && onDeck && decks.length > 1 && (
          <div className="flex items-center gap-2 text-[15px]">
            {DECKS.filter(({ id }) => decks.includes(id)).map(({ id, label }, i) => (
              <span key={id} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-line">|</span>}
                <button
                  type="button"
                  aria-pressed={deck === id}
                  onClick={() => onDeck(id)}
                  className={`rounded-ctrl transition ${deck === id ? 'font-bold' : 'text-sub'}`}
                >
                  {label}
                </button>
              </span>
            ))}
          </div>
        )}

        {articles.length > 0 && <ReferenceDrawer articles={articles} />}
      </div>
    </header>
  )
}
