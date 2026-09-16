'use client'

import { PeekDrawer } from './peek-drawer'
import { SearchSheet } from './search-sheet'
import type { KanaUnit } from '@/lib/kana'
import type { Article } from '@/lib/types'

/**
 * 낱말 트랙의 찾기. (spec.md §3)
 *
 * **껍데기는 `PeekDrawer`가 든다** — 한자 트랙과 같은 것을 쓴다. 여기 남는
 * 것은 이 트랙의 이름과 무엇을 훑을지뿐이다. 예전에는 이 파일이 트리거·시트
 * 골격·머리줄을 다 들고 있었고, 한자 쪽이 그것을 그대로 베껴 두 벌이었다.
 *
 * **자판이 올라온다는 점이 참고 글만 있던 시절과 다르다.** 시트 높이가
 * `85dvh`인데 `dvh`가 자판을 반영해 줄어들므로, 안쪽이 `min-h-0`으로 눌려
 * 목록만 짧아진다 (components/search-sheet.tsx).
 */
export function SearchDrawer({
  trackArticles,
  kanaUnits,
}: {
  trackArticles: Article[]
  /** 지금 트랙에서 공개된 가나 마디 (lib/search.ts) */
  kanaUnits?: KanaUnit[]
}) {
  return (
    <PeekDrawer
      title="찾기"
      description="비워 두면 지금 트랙의 참고 글을, 치면 트랙을 가리지 않고 단어·상식·참고 글을 찾습니다."
    >
      <SearchSheet trackArticles={trackArticles} kanaUnits={kanaUnits} />
    </PeekDrawer>
  )
}
