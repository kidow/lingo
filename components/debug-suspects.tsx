'use client'

import { useMemo, useState } from 'react'
import { TRACKS } from '@/lib/track'
import type { Suspect, SuspectKind } from '@/lib/trivia-audit'
import type { Language } from '@/lib/types'

/**
 * 오답 품질이 의심되는 상식 문항 표. (spec.md §7)
 *
 * 노트 표가 "무엇을 더 캘까"라면 이 표는 "무엇을 고칠까"다. 판정은 전부
 * `lib/trivia-audit.ts`가 하고 화면은 줄로만 늘어놓는다.
 *
 * **오류 목록이 아니라 후보 목록이다.** 정답이 길다고 틀린 문항은 아니다 —
 * 사람이 다시 읽어 "이건 괜찮다"고 넘기는 줄이 섞여 있는 게 정상이라
 * 붉게 칠하지 않는다.
 */
const ALL = 'all' as const
type Filter = Language | SuspectKind | typeof ALL

const LABEL = new Map(TRACKS.map((track) => [track.language, `${track.label} ${track.flag}`]))

/** 신호 이름표. 표 위 필터와 줄 안 배지가 같은 말을 쓴다 */
const KIND: Record<SuspectKind, string> = {
  length: '길이',
  throwaway: '소거',
  gloss: '괄호',
  duplicate: '중복',
}

const KINDS = Object.keys(KIND) as SuspectKind[]

export function DebugSuspects({ suspects }: { suspects: Suspect[] }) {
  const [filter, setFilter] = useState<Filter>(ALL)

  const shown = useMemo(() => {
    if (filter === ALL) return suspects
    if (KINDS.includes(filter as SuspectKind))
      return suspects.filter((suspect) => suspect.kinds.includes(filter as SuspectKind))
    return suspects.filter((suspect) => suspect.lang === filter)
  }, [suspects, filter])

  const count = (value: Filter) =>
    value === ALL
      ? suspects.length
      : KINDS.includes(value as SuspectKind)
        ? suspects.filter((suspect) => suspect.kinds.includes(value as SuspectKind)).length
        : suspects.filter((suspect) => suspect.lang === value).length

  return (
    <>
      {/* 두 줄로 나눈다 — 위는 언어, 아래는 신호. 섞어 놓으면 무엇으로 거르는지 흐려진다 */}
      <div className="mb-2 flex shrink-0 flex-wrap items-center gap-1.5">
        {[ALL, ...TRACKS.map((track) => track.language)].map((value) => (
          <Pill key={value} on={filter === value} onClick={() => setFilter(value)} count={count(value)}>
            {value === ALL ? '전체' : (LABEL.get(value) ?? value)}
          </Pill>
        ))}
      </div>
      <div className="mb-3 flex shrink-0 flex-wrap items-center gap-1.5">
        {KINDS.map((kind) => (
          <Pill key={kind} on={filter === kind} onClick={() => setFilter(kind)} count={count(kind)}>
            {KIND[kind]}
          </Pill>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-auto rounded-ctrl border border-line">
        <table className="w-full min-w-[900px] table-fixed bg-surface text-left text-[13px]">
          <colgroup>
            {[104, 200, 300, 296].map((width, i) => (
              <col key={i} style={{ width }} />
            ))}
          </colgroup>
          <thead className="sticky top-0 z-10 bg-surface">
            <tr className="text-[11px] tracking-wide text-sub uppercase">
              <Th>트랙</Th>
              <Th>id</Th>
              <Th>물음</Th>
              <Th>의심</Th>
            </tr>
          </thead>
          <tbody>
            {shown.map((suspect) => (
              <tr
                key={`${suspect.lang}:${suspect.id}`}
                className="h-[34px] border-t border-line align-middle"
              >
                <Td>
                  <span className="text-xs text-sub">
                    {LABEL.get(suspect.lang) ?? suspect.lang}
                  </span>
                </Td>
                <Td>
                  <span className="font-mono text-xs text-sub">{suspect.id}</span>
                </Td>
                <Td title={suspect.question}>{suspect.question}</Td>
                <Td title={suspect.why}>
                  <span className="mr-1.5">
                    {suspect.kinds.map((kind) => (
                      <span
                        key={kind}
                        className="mr-1 rounded-pill border border-line px-1.5 py-0.5 text-[11px] font-semibold text-sub"
                      >
                        {KIND[kind]}
                      </span>
                    ))}
                  </span>
                  <span className="text-xs text-sub">{suspect.why}</span>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function Pill({
  on,
  onClick,
  count,
  children,
}: {
  on: boolean
  onClick: () => void
  count: number
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-pill border px-3 py-1 text-[13px] font-semibold transition ${
        on ? 'border-accent bg-pick text-accent' : 'border-line bg-surface text-sub'
      }`}
    >
      {children}
      <span className="ml-1.5 font-normal opacity-60">{count}</span>
    </button>
  )
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th className="px-3 py-2 font-medium">{children}</th>
}

function Td({ children, title }: { children?: React.ReactNode; title?: string }) {
  return (
    <td className="truncate px-3" title={title}>
      {children}
    </td>
  )
}
