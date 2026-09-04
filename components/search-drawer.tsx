'use client'

import { Search, X } from 'lucide-react'
import { Drawer } from 'vaul'
import { SearchSheet } from './search-sheet'
import type { TriviaEntry } from '@/lib/trivia'
import type { Article, Concept } from '@/lib/types'

/**
 * 전역 검색을 여는 바텀시트. (spec.md §3)
 *
 * 참고 글 시트와 껍데기가 같다 — 여닫는 것은 버튼이 하고 끌어 닫기는 없다
 * (components/reference-drawer.tsx의 이유가 그대로 적용된다).
 *
 * 다만 **자판이 올라온다는 점이 다르다.** 시트 높이를 `85dvh`로 고정하면
 * iOS에서 자판이 뜨는 순간 아래쪽이 가려져 결과가 자판 뒤로 숨는다. `dvh`가
 * 자판을 반영해 줄어들므로 높이는 그대로 두되, 안쪽이 `min-h-0`으로 눌려
 * 목록만 짧아지게 한다 (components/search-sheet.tsx).
 */
export function SearchDrawer({
  concepts,
  trivia,
  articles,
}: {
  concepts: Concept[]
  trivia: TriviaEntry[]
  articles: Article[]
}) {
  return (
    <Drawer.Root handleOnly>
      <Drawer.Trigger
        aria-label="검색"
        className="rounded-ctrl p-1 text-sub transition outline-none active:scale-[.985]"
      >
        <Search className="size-[18px]" strokeWidth={2.25} aria-hidden />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-ink/40" />

        <Drawer.Content
          className="
            fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[85dvh] w-full max-w-[480px]
            flex-col rounded-t-card bg-bg outline-none
          "
        >
          <div className="flex shrink-0 items-center justify-between px-lg pt-lg pb-3">
            <Drawer.Title className="text-lg font-bold tracking-tight">검색</Drawer.Title>
            <Drawer.Close
              aria-label="닫기"
              className="-mr-1.5 rounded-ctrl p-1.5 text-sub transition outline-none active:scale-[.985]"
            >
              <X className="size-5" strokeWidth={2.5} aria-hidden />
            </Drawer.Close>
          </div>

          <Drawer.Description className="sr-only">
            트랙을 가리지 않고 단어·상식·참고 글을 찾습니다.
          </Drawer.Description>

          <SearchSheet concepts={concepts} trivia={trivia} articles={articles} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
