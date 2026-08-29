'use client'

import { useMemo, useState } from 'react'
import { DebugPlay } from './debug-play'
import { TRACKS, trackOf, type TrackId } from '@/lib/track'

/**
 * 점검 표. 트랙으로 걸러 본다. (spec.md §7)
 *
 * 서버가 fs로 훑은 결과를 그대로 받아 그리기만 한다 — 표는 파일 시스템을
 * 모른다. 필터는 화면에서만 도는 상태다. 정적 export라 쿼리 파라미터를
 * 서버가 읽을 수 없고, 어차피 새로고침해 유지할 값도 아니다.
 */
export type DebugRow = {
  slug: string
  track: TrackId
  /** 그림이 없으면 피드에 안 나온다. 목록에만 있는 상태다 */
  level?: string
  answer?: string
  aside: string[]
  meaning: string
  partOfSpeech?: string
  example?: string
  imagePath: string
  hasImage: boolean
  audioSize: number | null
  audioPath: string
}

const ALL = 'all' as const
type Filter = TrackId | typeof ALL

export function DebugTable({ rows, tracks }: { rows: DebugRow[]; tracks: TrackId[] }) {
  const [filter, setFilter] = useState<Filter>(ALL)

  const shown = useMemo(
    () => (filter === ALL ? rows : rows.filter((row) => row.track === filter)),
    [rows, filter],
  )

  const concepts = new Set(shown.map((row) => row.slug)).size
  const missingImage = shown.filter((row) => !row.hasImage).length
  const missingAudio = shown.filter((row) => row.audioSize === null).length
  const missingExample = shown.filter((row) => !row.example).length

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        {[ALL, ...tracks].map((value) => (
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
            {value === ALL ? '전체' : (TRACKS.find((track) => track.id === value)?.label ?? value)}
            <span className="ml-1.5 font-normal opacity-60">
              {value === ALL ? rows.length : rows.filter((row) => row.track === value).length}
            </span>
          </button>
        ))}
      </div>

      {/* 숫자는 걸러진 것만 센다. 영어만 볼 때 일본어 결손이 섞이면 읽을 수 없다 */}
      <dl className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-ctrl border border-line bg-surface px-3 py-2.5 text-[13px] text-sub">
        <Stat label="개념" value={`${concepts}`} />
        <Stat label="단어" value={`${shown.length}`} />
        <Stat label="이미지" value={`${shown.length - missingImage}/${shown.length}`} bad={missingImage > 0} />
        <Stat label="발음" value={`${shown.length - missingAudio}/${shown.length}`} bad={missingAudio > 0} />
        <Stat label="예문" value={`${shown.length - missingExample}/${shown.length}`} bad={missingExample > 0} />
      </dl>

      {/* 좁은 창에서 칸이 짓눌리는 대신 표째로 가로 스크롤한다 */}
      <div className="overflow-x-auto rounded-ctrl border border-line">
        <table className="w-full min-w-[720px] bg-surface text-left text-[13px]">
          <thead>
            <tr className="text-[11px] tracking-wide text-sub uppercase">
              <Th />
              <Th>slug</Th>
              <Th>트랙</Th>
              <Th>읽기 · 참고</Th>
              <Th>뜻</Th>
              <Th>품사</Th>
              <Th>예문</Th>
              <Th>발음</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {shown.map((row) => (
              <tr key={`${row.slug}:${row.track}`} className="border-t border-line align-middle">
                <Td>
                  <span className="grid size-9 place-items-center overflow-hidden rounded-md bg-img-bg">
                    {row.hasImage ? (
                      // 최적화가 꺼져 있어(next.config.ts) img로도 같은 파일이 그대로 나간다
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={row.imagePath} alt="" className="size-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-err">없음</span>
                    )}
                  </span>
                </Td>
                <Td>
                  <span className="font-mono text-xs text-sub">{row.slug}</span>
                </Td>
                <Td>
                  <span className="font-mono text-xs text-sub">{row.track}</span>
                  {row.level && <span className="ml-1.5 text-xs text-sub">{row.level}</span>}
                </Td>
                <Td>
                  {row.answer ? (
                    <>
                      <span className="font-jp font-semibold">{row.answer}</span>{' '}
                      {row.aside.length > 0 && (
                        <span className="font-jp text-xs text-sub">
                          {row.aside.map((value, i) => (i === 0 ? `[${value}]` : value)).join(' · ')}
                        </span>
                      )}
                    </>
                  ) : (
                    <Missing>출제 불가</Missing>
                  )}
                </Td>
                <Td>{row.meaning}</Td>
                <Td>{row.partOfSpeech ?? <span className="text-sub">—</span>}</Td>
                <Td>
                  {row.example ? (
                    <span className="font-jp text-xs">{row.example}</span>
                  ) : (
                    <Missing>없음</Missing>
                  )}
                </Td>
                <Td>
                  {row.audioSize !== null ? (
                    <span className="rounded-pill border border-ok/30 bg-ok-soft px-2 py-0.5 text-[11px] font-semibold text-ok">
                      {(row.audioSize / 1024).toFixed(1)}KB
                    </span>
                  ) : (
                    <Missing>없음</Missing>
                  )}
                </Td>
                <Td>
                  {row.audioSize !== null ? (
                    <DebugPlay src={row.audioPath} />
                  ) : (
                    <span className="block size-7" />
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
      <dd className={`font-semibold ${bad ? 'text-err' : 'text-ink'}`}>{value}</dd>
    </div>
  )
}

const Th = ({ children }: { children?: React.ReactNode }) => (
  <th className="px-2.5 py-2 font-semibold">{children}</th>
)
const Td = ({ children }: { children?: React.ReactNode }) => <td className="px-2.5 py-2">{children}</td>
const Missing = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-pill border border-err/25 bg-err-soft px-2 py-0.5 text-[11px] font-semibold text-err">
    {children}
  </span>
)
