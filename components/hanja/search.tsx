'use client'

import { ArrowLeft, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Drawer } from 'vaul'
import { gradeLabel, hunEum, searchHanja, type HanjaCharacter } from '@/lib/hanja'
import { HANJA_FONT, HanjaDetails } from './card'

export function HanjaSearch({ characters }: { characters: HanjaCharacter[] }) {
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(60)
  const [selected, setSelected] = useState<HanjaCharacter | null>(null)
  const matches = useMemo(() => searchHanja(characters, query), [characters, query])
  return (
    <Drawer.Root handleOnly onOpenChange={(open) => { if (!open) { setSelected(null); setQuery(''); setLimit(60) } }}>
      <Drawer.Trigger className="-my-3 grid min-w-11 place-items-center rounded-ctrl px-2.5 py-3 text-[15px] text-sub">찾기</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-ink/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[85dvh] w-full max-w-[480px] flex-col rounded-t-card bg-bg outline-none" lang="ko">
          <div className="flex shrink-0 items-center justify-between px-5 pt-5 pb-3">
            <Drawer.Title className="text-lg font-bold">한자 찾기</Drawer.Title>
            <Drawer.Close aria-label="닫기" className="-my-3 -mr-3 rounded-ctrl p-3 text-sub"><X className="size-5" aria-hidden /></Drawer.Close>
          </div>
          <Drawer.Description className="sr-only">한자, 훈음, 한자어로 검색합니다.</Drawer.Description>
          {selected ? (
            <div className="flex min-h-0 flex-col gap-3 overflow-y-auto px-5 pb-8">
              <button type="button" onClick={() => setSelected(null)} className="flex min-h-11 items-center gap-2 self-start rounded-ctrl text-sm text-sub"><ArrowLeft className="size-4" aria-hidden />검색 결과</button>
              <div style={HANJA_FONT} className="py-6 text-center text-8xl">{selected.glyph}</div>
              <HanjaDetails character={selected} />
            </div>
          ) : (
            <>
              <input aria-label="한자 검색" placeholder="山, 메 산, 산림" value={query} onChange={(event) => { setQuery(event.target.value); setLimit(60) }} className="mx-5 mb-3 min-h-12 rounded-ctrl border border-line bg-surface px-4" />
              <div className="min-h-0 overflow-y-auto px-5 pb-8">
                {matches.slice(0, limit).map((character) => (
                  <button key={character.id} type="button" onClick={() => setSelected(character)} className="flex w-full items-center gap-4 border-b border-line py-4 text-left">
                    <span style={HANJA_FONT} className="text-4xl">{character.glyph}</span>
                    <span>{hunEum(character)}<span className="mt-1 block text-sm text-sub">{gradeLabel(character.readingGrade)}</span></span>
                  </button>
                ))}
                {matches.length > limit && <button type="button" onClick={() => setLimit((value) => value + 60)} className="mt-3 min-h-11 w-full rounded-ctrl border border-line text-sm text-sub">더 보기</button>}
                {!matches.length && <p role="status" className="py-6 text-sm text-sub">검색 결과가 없어요</p>}
              </div>
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
