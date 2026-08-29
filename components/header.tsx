'use client'

import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
 */
export function Header({
  track,
  onChange,
}: {
  track: TrackId
  onChange: (track: TrackId) => void
}) {
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-line px-5">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="학습 트랙"
          className="flex items-center gap-1 rounded-ctrl outline-none"
        >
          <span className="text-lg font-bold tracking-tight">{trackOf(track).label}</span>
          <ChevronDown className="size-4 text-sub" strokeWidth={2.5} aria-hidden />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" sideOffset={10} className="min-w-36">
          <DropdownMenuRadioGroup
            value={track}
            onValueChange={(value) => onChange(value as TrackId)}
          >
            {TRACKS.map(({ id, label }) => (
              // Base UI의 라디오 항목은 기본적으로 메뉴를 열어 둔다. 여러 개를
              // 연달아 고르는 자리라면 맞지만 여기서는 하나를 고르면 끝이다
              <DropdownMenuRadioItem key={id} value={id} closeOnClick className="text-[15px]">
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
