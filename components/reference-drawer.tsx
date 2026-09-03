'use client'

import { BookOpen, X } from 'lucide-react'
import { Drawer } from 'vaul'
import type { Article } from '@/lib/types'
import { ArticleSheet } from './article-sheet'

/**
 * 참고 글을 여는 바텀시트. (spec.md §5)
 *
 * **끌어서 닫지 않는다.** 피드가 세로 스크롤로 카드를 넘기고(components/feed.tsx)
 * 표는 시트 안에서 또 세로로 길다 — 여기에 끌어 닫기까지 얹으면 세로 제스처가
 * 세 겹이 된다. `handleOnly`를 켜고 `Drawer.Handle`을 두지 않아 끌 자리 자체를
 * 없앴다. 여닫는 것은 버튼이 한다.
 *
 * 배경을 눌러 닫는 것과 ESC는 살려 둔다 — 그 둘은 세로 제스처가 아니라
 * 부딪히지 않고, 글 하나 보고 나가는 자리에서 닫는 길이 버튼 하나뿐이면
 * 답답하다.
 */
export function ReferenceDrawer({ articles }: { articles: Article[] }) {
  return (
    <Drawer.Root handleOnly>
      <Drawer.Trigger
        aria-label="참고 글"
        className="rounded-ctrl p-1 text-sub transition outline-none active:scale-[.985]"
      >
        <BookOpen className="size-[18px]" strokeWidth={2.25} aria-hidden />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-ink/40" />

        {/* 피드와 같은 레일 폭을 쓴다. 넓은 화면에서 시트만 끝까지 벌어지면 안 된다 */}
        <Drawer.Content
          className="
            fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[85dvh] w-full max-w-[480px]
            flex-col rounded-t-card bg-bg outline-none
          "
        >
          <div className="flex shrink-0 items-center justify-between px-lg pt-lg pb-3">
            <Drawer.Title className="text-lg font-bold tracking-tight">참고</Drawer.Title>
            <Drawer.Close
              aria-label="닫기"
              className="-mr-1.5 rounded-ctrl p-1.5 text-sub transition outline-none active:scale-[.985]"
            >
              <X className="size-5" strokeWidth={2.5} aria-hidden />
            </Drawer.Close>
          </div>

          {/*
            시트를 여는 이유를 한 줄로 말한다. Radix Dialog는 설명이 없으면
            콘솔에 경고를 내고, 스크린리더에도 제목만으로는 무엇을 하는
            자리인지 전해지지 않는다
          */}
          <Drawer.Description className="sr-only">
            지금 트랙의 언어에 딸린 참고 글을 골라 봅니다.
          </Drawer.Description>

          <ArticleSheet articles={articles} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
