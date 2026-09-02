'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { DebugPlay } from './debug-play'
import { TRACKS, trackOf, type TrackId } from '@/lib/track'
import type { Concept } from '@/lib/types'

/**
 * 점검 표. 트랙으로 걸러 본다. (spec.md §7)
 *
 * 서버가 fs로 훑은 결과를 그대로 받아 그리기만 한다 — 표는 파일 시스템을
 * 모른다. 필터는 화면에서만 도는 상태다. 정적 export라 쿼리 파라미터를
 * 서버가 읽을 수 없고, 어차피 새로고침해 유지할 값도 아니다.
 *
 * 줄은 **보이는 것만** 그린다. 전체는 12,844줄(개념 × 트랙)이라 다 그리면
 * DOM 노드가 27만 개가 되고, 필터를 껐다 켜는 데만 3.5초가 걸렸다. 화면에
 * 들어오는 30줄 남짓만 그리고 위아래는 빈 줄 하나로 높이를 메운다.
 *
 * 그래서 **한 줄은 정확히 한 줄 높이**여야 한다 — 예문이 접히면 줄 높이가
 * 제각각이 되어 스크롤 위치에서 몇 번째 줄인지 계산할 수 없다. 예문은 접지
 * 않고 잘라 두고, 잘린 것은 title로 남긴다.
 *
 * 단어와 예문은 눌러서 복사한다. 콘텐츠를 고치러 갈 때 화면에 보이는 글자를
 * 그대로 집어 가는 자리다 — 잘린 예문은 눈으로 못 읽어도 복사는 전문이 된다.
 */
export type DebugRow = {
  slug: string
  /** 상황 표현은 예문을 세는 분모에서 빠진다 — 정답이 이미 문장이다 */
  category: Concept['category']
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

/**
 * 줄 높이(px). 그림 36 + 위아래 여백 16 + 위 테두리 1 = 53.
 * CSS와 이 숫자가 어긋나면 스크롤할수록 어긋남이 쌓여 끝에서 빈칸이 남는다.
 */
const ROW = 53
/** 화면 밖에 미리 그려 두는 줄 수. 빨리 굴릴 때 흰 칸이 스치는 것을 막는다 */
const OVERSCAN = 8

export function DebugTable({ rows, tracks }: { rows: DebugRow[]; tracks: TrackId[] }) {
  const [filter, setFilter] = useState<Filter>(ALL)
  const scroller = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState(0)
  const [height, setHeight] = useState(0)

  const shown = useMemo(
    () => (filter === ALL ? rows : rows.filter((row) => row.track === filter)),
    [rows, filter],
  )

  // 창 크기가 바뀌면 그릴 줄 수도 바뀐다. 첫 값도 여기서 받는다 — 서버에서는
  // 높이를 알 수 없어 0으로 시작하고, 붙는 즉시 실제 높이가 들어온다
  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const observer = new ResizeObserver(() => setHeight(el.clientHeight))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // 필터를 바꾸면 목록이 통째로 갈린다. 스크롤을 그대로 두면 엉뚱한 자리가 보인다
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
    setTop(0)
  }, [filter])

  const start = Math.max(0, Math.floor(top / ROW) - OVERSCAN)
  const end = Math.min(shown.length, Math.ceil((top + height) / ROW) + OVERSCAN)
  const visible = shown.slice(start, end)

  const concepts = new Set(shown.map((row) => row.slug)).size
  const missingImage = shown.filter((row) => !row.hasImage).length
  const missingAudio = shown.filter((row) => row.audioSize === null).length
  // 상황 표현도 이제 예문을 갖는다 (spec.md §5) — 예전에는 정답이 문장이라
  // 예문을 두지 않았고 그래서 분모에서 뺐다. 지금은 뺄 이유가 없다
  const missingExample = shown.filter((row) => !row.example).length

  return (
    <>
      <div className="mb-3 flex shrink-0 flex-wrap items-center gap-1.5">
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
      <dl className="mb-4 flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2 rounded-ctrl border border-line bg-surface px-3 py-2.5 text-[13px] text-sub">
        <Stat label="개념" value={`${concepts}`} />
        <Stat label="단어" value={`${shown.length}`} />
        <Stat label="이미지" value={`${shown.length - missingImage}/${shown.length}`} bad={missingImage > 0} />
        <Stat label="발음" value={`${shown.length - missingAudio}/${shown.length}`} bad={missingAudio > 0} />
        <Stat
          label="예문"
          value={`${shown.length - missingExample}/${shown.length}`}
          bad={missingExample > 0}
        />
      </dl>

      {/* 좁은 창에서 칸이 짓눌리는 대신 표째로 가로 스크롤한다 */}
      <div
        ref={scroller}
        onScroll={(event) => setTop(event.currentTarget.scrollTop)}
        className="min-h-0 flex-1 overflow-auto rounded-ctrl border border-line"
      >
        {/* 칸 너비를 고정한다. 보이는 줄만 그리므로 자동 너비면 스크롤할 때마다
            그 순간 그려진 줄에 맞춰 칸이 들썩인다 */}
        <table className="w-full min-w-[1078px] table-fixed bg-surface text-left text-[13px]">
          <colgroup>
            {[56, 150, 124, 190, 130, 56, 232, 92, 48].map((width, i) => (
              <col key={i} style={{ width }} />
            ))}
          </colgroup>
          <thead className="sticky top-0 z-10 bg-surface">
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
            {/* 안 그린 줄만큼 높이를 메운다. 스크롤 막대가 전체 길이를 보여야 한다 */}
            {start > 0 && <tr style={{ height: start * ROW }} />}
            {visible.map((row) => (
              <tr
                key={`${row.slug}:${row.track}`}
                className="h-[52px] border-t border-line align-middle"
              >
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
                      <Copy text={row.answer} className="font-jp font-semibold" />{' '}
                      {row.aside.length > 0 && (
                        <span className="font-jp text-xs text-sub">
                          {row.aside.join(' · ')}
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
                    <Copy text={row.example} className="font-jp text-xs" />
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
                    <DebugPlay src={row.audioPath} missing={row.audioSize === null} />
                  ) : (
                    <span className="block size-7" />
                  )}
                </Td>
              </tr>
            ))}
            {end < shown.length && <tr style={{ height: (shown.length - end) * ROW }} />}
          </tbody>
        </table>
      </div>
    </>
  )
}

/**
 * 눌러서 복사하는 글자. 붙여넣을 곳까지 손으로 옮겨 적던 것을 없앤다.
 *
 * 클립보드는 보안 컨텍스트(localhost·https)에서만 열린다. 점검 화면은 개발
 * 서버에서만 뜨므로 늘 열려 있지만, 막힌 경우를 조용히 넘기면 복사된 줄
 * 알고 엉뚱한 것을 붙여넣게 된다 — 실패도 토스트로 말한다.
 */
function Copy({ text, className = '' }: { text: string; className?: string }) {
  return (
    <button
      type="button"
      title={text}
      onClick={() =>
        navigator.clipboard.writeText(text).then(
          () => toast.success('복사했습니다', { description: text }),
          () => toast.error('복사하지 못했습니다', { description: text }),
        )
      }
      className={`max-w-full cursor-pointer truncate align-bottom hover:underline ${className}`}
    >
      {text}
    </button>
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
// 접히면 줄 높이가 달라져 창 계산이 어긋난다. 넘치는 것은 잘라 두고 title로 남긴다
const Td = ({ children }: { children?: React.ReactNode }) => (
  <td className="truncate px-2.5 py-2 whitespace-nowrap">{children}</td>
)
const Missing = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-pill border border-err/25 bg-err-soft px-2 py-0.5 text-[11px] font-semibold text-err">
    {children}
  </span>
)
