'use client'

import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PeekDrawer } from '../peek-drawer'
import { gradeLabel, hunEum, searchHanja, HANJA_GRADES, type HanjaCharacter, type HanjaGrade } from '@/lib/hanja'
import { HanjaDetails, HanjaIllustration } from './card'
import { HanjaGlyph } from './glyph'

/** 한 번에 그리는 글자 수. 특급만 1,328자라 전량을 한 번에 세울 수 없다 */
const PAGE = 60

/**
 * 한자 트랙의 찾기. 껍데기는 낱말 트랙과 **같은 것**을 쓴다
 * (components/peek-drawer.tsx).
 *
 * **급수를 한 겹 둔다.** 5,978자가 한 그리드에 쏟아지면 「더 보기」를 백 번
 * 눌러야 끝에 닿는다. 한국어문회 배정은 급수가 곧 커리큘럼이라(lib/hanja.ts)
 * 찾는 사람도 대개 «내 급수»를 안다 — 그 단위로 먼저 가른다.
 *
 * **치면 급수를 벗어난다.** 찾는 사람은 그 글자가 몇 급인지 모르는 채로 찾는다.
 * 낱말 트랙이 «검색은 트랙을 안 가린다»고 한 것과 같은 이유다(spec.md §3).
 * 지우면 보던 급수로 돌아온다 — 검색은 덮개지 이동이 아니다.
 *
 * **급수 안에서는 글자 밑에 급수를 적지 않는다.** 오십 줄이 다 같은 값이라
 * 되풀이될 뿐이다 — 어느 급수를 보고 있는지는 위 돌아가는 줄이 말한다.
 * **검색 결과에는 적는다.** 거기서는 줄마다 값이 다르고, 찾은 글자가 몇 급인지가
 * 곧 «지금 내가 볼 것인가»를 가른다.
 *
 * **접어도 지우지 않는다.** 예전에는 시트가 닫힐 때 검색어·선택을 되돌렸는데,
 * 닫힘이 접힘으로 바뀌면서 그 자리를 뺐다 — 뒤 카드를 흘긋 보려고 내린 사람이
 * 돌아왔을 때 친 것이 없으면 다시 올라올 이유가 없다.
 */
export function HanjaSearch({ characters }: { characters: HanjaCharacter[] }) {
  const [query, setQuery] = useState('')
  const [grade, setGrade] = useState<HanjaGrade | null>(null)
  const [limit, setLimit] = useState(PAGE)
  const [selected, setSelected] = useState<HanjaCharacter | null>(null)

  /** 급수 목록에 적을 글자 수. 배정표가 바뀌지 않으므로 한 번만 센다 */
  const counts = useMemo(() => {
    const tally = new Map<HanjaGrade, number>()
    for (const character of characters)
      tally.set(character.readingGrade, (tally.get(character.readingGrade) ?? 0) + 1)
    return tally
  }, [characters])

  const matches = useMemo(() => searchHanja(characters, query), [characters, query])
  const ofGrade = useMemo(
    () => (grade ? characters.filter((character) => character.readingGrade === grade) : []),
    [characters, grade],
  )

  // 자리를 옮기면 「더 보기」로 늘려 둔 것도 처음으로 돌아간다
  function go(next: () => void) {
    setLimit(PAGE)
    next()
  }

  /** 상세에서 돌아갈 자리의 이름. 어디서 열었는지에 따라 갈린다 */
  const back = query ? '검색 결과' : grade ? gradeLabel(grade) : '급수'
  const shown = query ? matches : ofGrade

  return (
    <PeekDrawer title="한자 찾기" description="급수로 훑거나 한자, 훈음, 한자어로 검색합니다." lang="ko">
      {selected ? (
        <div className="flex min-h-0 flex-col gap-3 overflow-y-auto px-5 pb-8">
          <button type="button" onClick={() => setSelected(null)} className="flex min-h-11 items-center gap-2 self-start rounded-ctrl text-sm text-sub"><ArrowLeft className="size-4" aria-hidden />{back}</button>
          <div className="h-64 shrink-0"><HanjaIllustration key={selected.id} character={selected} /></div>
          <HanjaDetails character={selected} />
        </div>
      ) : (
        <>
          {/* 손잡이 바로 밑이다 — 「한자 찾기」 제목 줄은 sr-only로 내려갔다 (components/peek-drawer.tsx) */}
          <input aria-label="한자 검색" placeholder="山, 메 산, 산림" value={query} onChange={(event) => go(() => setQuery(event.target.value))} className="mx-5 mt-1 mb-3 min-h-12 shrink-0 rounded-ctrl border border-line bg-surface px-4" />

          {/* 급수 안에 있을 때만 나오는 돌아가는 줄. 검색 중에는 지우는 것이 돌아가는 길이라 세우지 않는다 */}
          {!query && grade && (
            <button type="button" onClick={() => go(() => setGrade(null))} className="mx-5 mb-1 flex min-h-11 shrink-0 items-center gap-2 self-start rounded-ctrl text-sm text-sub"><ArrowLeft className="size-4" aria-hidden />급수<span className="font-semibold text-ink">{gradeLabel(grade)}</span></button>
          )}

          {!query && !grade ? (
            <ul className="min-h-0 flex-1 overflow-y-auto px-5 pb-8">
              {HANJA_GRADES.map((value) => (
                <li key={value}>
                  <button type="button" onClick={() => go(() => setGrade(value))} className="flex min-h-14 w-full items-center gap-3 border-b border-line text-left">
                    <span className="text-base font-semibold">{gradeLabel(value)}</span>
                    <span className="ml-auto text-sm text-sub">{counts.get(value) ?? 0}자</span>
                    <ChevronRight className="size-4 shrink-0 text-sub" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-8">
              <div className="grid grid-cols-3 gap-x-3 gap-y-1">
                {shown.slice(0, limit).map((character) => (
                  <button key={character.id} type="button" onClick={() => setSelected(character)} className="flex min-w-0 flex-col items-center gap-2 border-b border-line px-1 py-4 text-center">
                    <HanjaGlyph glyph={character.glyph} className="text-4xl" />
                    <span className="w-full break-words text-sm">{hunEum(character)}{query && <span className="mt-1 block text-xs text-sub">{gradeLabel(character.readingGrade)}</span>}</span>
                  </button>
                ))}
              </div>
              {shown.length > limit && <button type="button" onClick={() => setLimit((value) => value + PAGE)} className="mt-3 min-h-11 w-full rounded-ctrl border border-line text-sm text-sub">더 보기</button>}
              {!shown.length && <p role="status" className="py-6 text-sm text-sub">검색 결과가 없어요</p>}
            </div>
          )}
        </>
      )}
    </PeekDrawer>
  )
}
