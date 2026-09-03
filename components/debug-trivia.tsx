'use client'

import { useMemo, useState } from 'react'
import { TRACKS } from '@/lib/track'
import type { Language } from '@/lib/types'

/**
 * 상식 점검 표 — **노트 하나가 한 줄이다.** (spec.md §7)
 *
 * 개념 표가 "무엇을 아직 안 그렸나"를 보여준다면 이 표는 "어느 노트를 아직
 * 안 캤나"를 보여준다. 문항마다 `source`에 원본 노트 이름이 박혀 있으므로
 * (lib/types.ts) 그것을 세기만 하면 된다.
 *
 * **문항이 적은 노트가 위로 온다.** 이 화면을 여는 이유가 "다음에 뭘 캘까"라서
 * 많이 캔 노트는 볼 일이 없다. 0은 손도 안 댄 노트다 — brain 폴더를 찾았을
 * 때만 나오고, 못 찾으면 캔 노트만 나열된다 (app/debug/page.tsx).
 */
export type TriviaNote = {
  lang: Language
  /** brain 노트 파일 이름(확장자 없이). 문항의 `source`와 같은 값이다 */
  note: string
  /** 이 노트에서 뽑은 문항 수. 0이면 아직 안 캔 노트다 */
  count: number
}

const ALL = 'all' as const
type Filter = Language | typeof ALL

/** 언어 하나에 트랙 하나라 이름표는 트랙에서 빌려 쓴다 (lib/track.ts) */
const LABEL = new Map(TRACKS.map((track) => [track.language, `${track.label} ${track.flag}`]))

export function DebugTrivia({ notes }: { notes: TriviaNote[] }) {
  const [filter, setFilter] = useState<Filter>(ALL)

  const shown = useMemo(() => {
    const rows = filter === ALL ? notes : notes.filter((note) => note.lang === filter)
    // 적게 캔 것부터. 같은 수면 이름순이라 매번 같은 자리에 선다
    return [...rows].sort((a, b) => a.count - b.count || a.note.localeCompare(b.note))
  }, [notes, filter])

  const items = shown.reduce((sum, note) => sum + note.count, 0)
  const mined = shown.filter((note) => note.count > 0).length
  /** 노트당 평균이 아니라 **캔 노트당** 평균이다. 0을 섞으면 밀도가 흐려진다 */
  const perNote = mined > 0 ? (items / mined).toFixed(1) : '—'
  const most = shown.reduce((max, note) => Math.max(max, note.count), 0)

  return (
    <>
      <div className="mb-3 flex shrink-0 flex-wrap items-center gap-1.5">
        {[ALL, ...TRACKS.map((track) => track.language)].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`rounded-pill border px-3 py-1 text-[13px] font-semibold transition ${
              filter === value
                ? 'border-accent bg-pick text-accent'
                : 'border-line bg-surface text-sub'
            }`}
          >
            {value === ALL ? '전체' : (LABEL.get(value) ?? value)}
            <span className="ml-1.5 font-normal opacity-60">
              {value === ALL
                ? notes.reduce((sum, note) => sum + note.count, 0)
                : notes
                    .filter((note) => note.lang === value)
                    .reduce((sum, note) => sum + note.count, 0)}
            </span>
          </button>
        ))}
      </div>

      <dl className="mb-4 flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2 rounded-ctrl border border-line bg-surface px-3 py-2.5 text-[13px] text-sub">
        <Stat label="문항" value={`${items}`} />
        <Stat label="캔 노트" value={`${mined}/${shown.length}`} bad={mined < shown.length} />
        <Stat label="노트당" value={perNote} />
      </dl>

      <div className="min-h-0 flex-1 overflow-auto rounded-ctrl border border-line">
        <table className="w-full min-w-[560px] table-fixed bg-surface text-left text-[13px]">
          <colgroup>
            {[104, 380, 64, 200].map((width, i) => (
              <col key={i} style={{ width }} />
            ))}
          </colgroup>
          <thead className="sticky top-0 z-10 bg-surface">
            <tr className="text-[11px] tracking-wide text-sub uppercase">
              <Th>트랙</Th>
              <Th>노트</Th>
              <Th>문항</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {shown.map((note) => (
              <tr
                key={`${note.lang}:${note.note}`}
                className="h-[34px] border-t border-line align-middle"
              >
                <Td>
                  <span className="text-xs text-sub">{LABEL.get(note.lang) ?? note.lang}</span>
                </Td>
                {/* 안 캔 노트가 위에 몰리므로 이름까지 붉히면 화면이 통째로
                    경고가 된다. 붉히는 것은 숫자 칸 하나로 족하다 */}
                <Td>{note.note}</Td>
                <Td>
                  {note.count === 0 ? (
                    <span className="text-xs text-err">안 캠</span>
                  ) : (
                    <span className="tabular-nums">{note.count}</span>
                  )}
                </Td>
                <Td>
                  {/* 막대는 가장 많이 캔 노트를 기준으로 잡는다. 절대 개수보다
                      노트 사이의 편차가 눈에 들어와야 다음에 캘 것이 보인다 */}
                  {note.count > 0 && most > 0 && (
                    <span
                      className="block h-1.5 rounded-pill bg-accent/60"
                      style={{ width: `${Math.max((note.count / most) * 100, 4)}%` }}
                    />
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function Stat({ label, value, bad = false }: { label: string; value: string; bad?: boolean }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <dt>{label}</dt>
      <dd className={`font-semibold tabular-nums ${bad ? 'text-err' : 'text-ink'}`}>{value}</dd>
    </div>
  )
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th className="px-3 py-2 font-medium">{children}</th>
}

function Td({ children }: { children?: React.ReactNode }) {
  return <td className="truncate px-3">{children}</td>
}
