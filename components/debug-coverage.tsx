/**
 * 시험 목록 대비 우리 위치. (spec.md §7, scripts/coverage.ts)
 *
 * 다른 표들은 **우리가 넣은 것**을 센다 — 개념이 몇 개고 그림이 몇 장인가.
 * 이 표만 분모가 밖에 있다. 목표가 우리 손에 있지 않으므로 "얼마나 남았나"는
 * 여기서만 답이 나온다.
 *
 * **숫자를 옮겨 적지 않는다.** 셈은 `pnpm coverage`가 하고 이 화면은 그
 * 결과(`--json`)를 받아 그리기만 한다 — 두 곳에서 세면 반드시 어긋난다.
 *
 * 두 표로 나눈 이유는 **분모가 다르기 때문**이다. 위는 시험이 공개한 목록이
 * 분모이고, 아래는 우리 콘텐츠가 분모다. 한 표에 놓으면 JLPT 47%가 TSL 62%와
 * 견줄 수 있는 수처럼 읽히는데 그렇지 않다.
 */
export type CoverageData = {
  tsl: { covered: number; total: number; sideOnly: number }
  hsk: Graded
  torfl: Graded
  goethe: Graded
  tagged: Array<{ label: string; has: number; all: number; spread: string }>
}

type Graded = {
  levels: Array<{ label: string; covered: number; total: number }>
  covered: number
  total: number
  sideOnly: number
}

/**
 * 백분율. `masteryLabel`·`Fill`과 같은 규칙이다 (lib/progress.ts).
 *
 * **덜 찼는데 `100%`라고 쓰지 않는다.** TORFL A1이 714/717이면 반올림이 100이
 * 되는데, 그러면 다 채운 급수와 구별되지 않아 마지막 셋이 영영 안 보인다.
 */
function percentOf(done: number, total: number): string {
  if (total === 0) return '—'
  if (done === total) return '100%'
  if (done === 0) return '0%'
  const value = Math.round((done / total) * 100)
  return value === 0 ? '<1%' : `${Math.min(value, 99)}%`
}

export function DebugCoverage({ data }: { data: CoverageData | null }) {
  if (!data)
    return (
      <p className="text-sm text-sub">
        커버리지를 세지 못했습니다 — TSL 목록을 받아오려면 네트워크가 있어야 합니다.
        터미널에서 <code className="font-mono">pnpm coverage</code>를 돌리면 같은 수가 나옵니다.
      </p>
    )

  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-auto">
      <section>
        <Caption>
          시험이 공개한 목록이 분모다 — 남은 것이 곧 일감이다
        </Caption>
        <Table head={['목록', '덮음', '전체', '진행', '남음']}>
          <Row label="TSL (TOEIC)" covered={data.tsl.covered} total={data.tsl.total} />
          <Group name="HSK (2026 대강)" graded={data.hsk} />
          <Group name="TORFL (ТРКИ)" graded={data.torfl} />
          <Group name="Goethe (TELC)" graded={data.goethe} />
        </Table>
        <p className="mt-2 text-[12px] text-sub">
          그 가운데 곁말(<code className="font-mono">also</code>)로만 실린 것 — TSL{' '}
          {data.tsl.sideOnly} · HSK {data.hsk.sideOnly} · TORFL {data.torfl.sideOnly} · Goethe{' '}
          {data.goethe.sideOnly}. 카드에
          보이지만 퀴즈에는 안 나온다. TORFL의 C1·C2는 목록에 없다 — 사이트가 B2까지만 싣는다. Goethe는 B1까지다.
        </p>
      </section>

      <section>
        <Caption>우리 콘텐츠가 분모다 — 위 표와 견줄 수 없다</Caption>
        <Table head={['트랙', '등급 붙음', '전체', '진행', '분포']}>
          {data.tagged.map((row) => (
            <Row
              key={row.label}
              label={row.label}
              covered={row.has}
              total={row.all}
              // 여기서 남은 수는 일감이 아니다 — 등급이 없는 낱말은 목록 밖에
              // 있다는 뜻이지 우리가 빠뜨린 것이 아니다. 대신 분포를 적는다
              tail={row.spread}
            />
          ))}
          <tr className="border-t border-line">
            <th scope="row" className="px-3 py-1.5 text-left font-medium">
              DELE
            </th>
            <td colSpan={4} className="px-3 py-1.5 text-sub">
              전량 목록이 §7 기준을 통과하지 못한다
            </td>
          </tr>
        </Table>
        <p className="mt-2 text-[12px] text-sub">
          독일어가 낮은 것은 덜 채워서가 아니다 — Goethe 목록이 B1까지라 B2 이상 낱말은 붙을
          자리가 없다 (spec.md §7).
        </p>
      </section>
    </div>
  )
}

/** 급수가 있는 목록은 합계를 먼저 놓고 급수를 그 아래 들여쓴다 */
function Group({ name, graded }: { name: string; graded: Graded }) {
  return (
    <>
      <Row label={name} covered={graded.covered} total={graded.total} />
      {graded.levels.map((level) => (
        <Row key={level.label} label={level.label} covered={level.covered} total={level.total} sub />
      ))}
    </>
  )
}

/**
 * 꼬리 칸은 **표마다 뜻이 다르다.** 목록 표에서는 남은 수가 곧 다음 배치의
 * 크기지만, 등급 표에서는 남은 수가 일감이 아니다 — 그래서 무엇을 적을지
 * 부르는 쪽이 정한다.
 */
function Row({
  label,
  covered,
  total,
  tail,
  sub = false,
}: {
  label: string
  covered: number
  total: number
  tail?: string
  sub?: boolean
}) {
  const short = total - covered
  return (
    <tr className="border-t border-line">
      <th
        scope="row"
        className={`px-3 py-1.5 text-left ${sub ? 'pl-7 font-normal text-sub' : 'font-medium'}`}
      >
        {label}
      </th>
      <td className="px-3 py-1.5 text-right tabular-nums text-sub">{covered}</td>
      <td className="px-3 py-1.5 text-right tabular-nums text-sub">{total}</td>
      <td
        className={`px-3 py-1.5 text-right tabular-nums ${short > 0 ? 'font-semibold text-err' : 'text-ink'}`}
      >
        {percentOf(covered, total)}
      </td>
      <td className="px-3 py-1.5 text-right tabular-nums text-sub">
        {tail ?? (short > 0 ? short : '')}
      </td>
    </tr>
  )
}

const Caption = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-1.5 text-[13px] font-semibold text-sub">{children}</h2>
)

const Table = ({ head, children }: { head: string[]; children: React.ReactNode }) => (
  <div className="overflow-x-auto rounded-ctrl border border-line bg-surface">
    <table className="w-full text-[13px]">
      <thead>
        <tr className="border-b border-line text-sub">
          {head.map((label, i) => (
            <th
              key={label}
              scope="col"
              className={`px-3 py-1.5 font-medium ${i === 0 ? 'text-left' : 'text-right'}`}
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
)
