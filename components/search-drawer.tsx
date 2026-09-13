'use client'

import { Search, X } from 'lucide-react'
import { Drawer } from 'vaul'
import { FAB_CLASS } from './search-fab'
import { SearchSheet } from './search-sheet'
import type { Article } from '@/lib/types'

/**
 * 찾아보기를 여는 바텀시트. (spec.md §3)
 *
 * **트리거는 카드 오른쪽 아래에 뜬 돋보기다.** 오래 덱 탭과 같은 줄에 선
 * `찾기` 두 글자였는데, 탭이 넷이 되면서 헤더가 넘쳐 밖으로 나왔다
 * (components/search-fab.tsx). 탭 줄을 떠나면서 낱말일 이유도 사라졌다 —
 * 옆에 나란히 설 낱말이 없으면 두 글자보다 아이콘이 작고, 같은 자리에 늘
 * 있는 것 하나는 모양만으로 외워진다.
 *
 * 여닫는 것은 버튼이 하고 끌어 닫기는 없다 — 피드가 세로로 넘기고 시트 안도
 * 세로로 길어서, 끌어 닫기까지 얹으면 세로 제스처가 세 겹이 된다. `handleOnly`를
 * 켜고 `Drawer.Handle`을 두지 않아 끌 자리 자체를 없앴다. 배경 누르기와 ESC는
 * 살려 둔다.
 *
 * **자판이 올라온다는 점이 참고 글만 있던 시절과 다르다.** 시트 높이를 `85dvh`로
 * 두되 `dvh`가 자판을 반영해 줄어들므로, 안쪽이 `min-h-0`으로 눌려 목록만
 * 짧아진다 (components/search-sheet.tsx).
 */
export function SearchDrawer({ trackArticles }: { trackArticles: Article[] }) {
  return (
    <Drawer.Root handleOnly>
      {/*
        아이콘뿐이라 이름을 따로 준다. 돋보기는 보편적이지만 보편적인 것은
        보이는 사람에게만 그렇다
      */}
      <Drawer.Trigger aria-label="찾기" className={FAB_CLASS}>
        <Search className="size-5" strokeWidth={2.5} aria-hidden />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-ink/40" />

        {/*
          `outline-none`은 **여기만** 남긴다. vaul이 시트를 열며 이 상자에
          포커스를 주는데, 링이 뜨면 화면 절반에 3px 테두리가 둘린다 — 누를
          것이 아니라 담는 것이라 포커스를 눈으로 알릴 이유가 없다.

          누르는 자리에는 붙이지 않는다. Tailwind v4의 `outline-none`은
          `outline-style: none`이고 utilities 레이어가 base를 이겨서,
          globals.css의 `:focus-visible` 규칙을 **통째로 무효화한다** —
          트리거와 닫기와 검색 칸 넷이 그렇게 포커스 링을 잃고 있었다
          (WCAG 2.4.7, brand-spec.md)
        */}
        <Drawer.Content
          className="
            fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[85dvh] w-full max-w-[480px]
            flex-col rounded-t-card bg-bg outline-none
          "
        >
          <div className="flex shrink-0 items-center justify-between px-lg pt-lg pb-3">
            <Drawer.Title className="text-lg font-bold tracking-tight">찾기</Drawer.Title>
            <Drawer.Close
              aria-label="닫기"
              // 아이콘이 20px이라 그대로는 32px이다. 패딩으로 44px을 만들고
              // 같은 만큼 당겨 시트 머리줄이 두꺼워지지 않게 한다
              className="-my-3 -mr-3 rounded-ctrl p-3 text-sub transition active:scale-[.985]"
            >
              <X className="size-5" strokeWidth={2.5} aria-hidden />
            </Drawer.Close>
          </div>

          <Drawer.Description className="sr-only">
            비워 두면 지금 트랙의 참고 글을, 치면 트랙을 가리지 않고 단어·상식·참고 글을
            찾습니다.
          </Drawer.Description>

          <SearchSheet trackArticles={trackArticles} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
