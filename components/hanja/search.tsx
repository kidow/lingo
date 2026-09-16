'use client'

import { ArrowLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PeekDrawer } from '../peek-drawer'
import { gradeLabel, hunEum, searchHanja, type HanjaCharacter } from '@/lib/hanja'
import { HanjaDetails, HanjaIllustration } from './card'
import { HanjaGlyph } from './glyph'

/**
 * 한자 트랙의 찾기. 껍데기는 낱말 트랙과 **같은 것**을 쓴다
 * (components/peek-drawer.tsx).
 *
 * **접어도 지우지 않는다.** 예전에는 시트가 닫힐 때 검색어·선택을 되돌렸는데,
 * 닫힘이 접힘으로 바뀌면서 그 자리를 뺐다 — 뒤 카드를 흘긋 보려고 내린 사람이
 * 돌아왔을 때 친 것이 없으면 다시 올라올 이유가 없다.
 */
export function HanjaSearch({ characters }: { characters: HanjaCharacter[] }) {
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(60)
  const [selected, setSelected] = useState<HanjaCharacter | null>(null)
  const matches = useMemo(() => searchHanja(characters, query), [characters, query])
  return (
    <PeekDrawer title="한자 찾기" description="한자, 훈음, 한자어로 검색합니다." lang="ko">
      {selected ? (
        <div className="flex min-h-0 flex-col gap-3 overflow-y-auto px-5 pb-8">
          <button type="button" onClick={() => setSelected(null)} className="flex min-h-11 items-center gap-2 self-start rounded-ctrl text-sm text-sub"><ArrowLeft className="size-4" aria-hidden />검색 결과</button>
          <div className="h-64 shrink-0"><HanjaIllustration key={selected.id} character={selected} /></div>
          <HanjaDetails character={selected} />
        </div>
      ) : (
        <>
          {/* 손잡이 바로 밑이다 — 「한자 찾기」 제목 줄은 sr-only로 내려갔다 (components/peek-drawer.tsx) */}
          <input aria-label="한자 검색" placeholder="山, 메 산, 산림" value={query} onChange={(event) => { setQuery(event.target.value); setLimit(60) }} className="mx-5 mt-1 mb-3 min-h-12 rounded-ctrl border border-line bg-surface px-4" />
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-8">
            <div className="grid grid-cols-3 gap-x-3 gap-y-1">
              {matches.slice(0, limit).map((character) => (
                <button key={character.id} type="button" onClick={() => setSelected(character)} className="flex min-w-0 flex-col items-center gap-2 border-b border-line px-1 py-4 text-center">
                  <HanjaGlyph glyph={character.glyph} className="text-4xl" />
                  <span className="w-full break-words text-sm">{hunEum(character)}<span className="mt-1 block text-xs text-sub">{gradeLabel(character.readingGrade)}</span></span>
                </button>
              ))}
            </div>
            {matches.length > limit && <button type="button" onClick={() => setLimit((value) => value + 60)} className="mt-3 min-h-11 w-full rounded-ctrl border border-line text-sm text-sub">더 보기</button>}
            {!matches.length && <p role="status" className="py-6 text-sm text-sub">검색 결과가 없어요</p>}
          </div>
        </>
      )}
    </PeekDrawer>
  )
}
