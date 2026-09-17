'use client'

import { useState } from 'react'

/**
 * 한능검 점검 표 — **급수 하나가 한 줄이다.** (docs/hanja-track-design.md §8)
 *
 * 단어 표와 나란히 두지 않고 자리를 나눈 이유는 **세는 단위도 검사하는 것도
 * 다르기 때문이다.** 외국어 트랙은 개념 × 트랙이 한 줄이고 그림·발음·예문·
 * 등급을 본다. 한자는 그 넷이 다 없다 — 그림을 그리지 않고, 발음을 붙이지
 * 않으며(docs/hanja-track-design.md §1), 예문 대신 활용 한자어 하나가, 등급
 * 대신 배정 급수가 온다. 같은 표에 밀어 넣으면 빈 칸 넷이 영영 붉게 남는다.
 *
 * 여기서 보는 결손은 셋이다.
 *
 *   예시   — 활용 한자어. 급수 안 2음절 한자어가 사전에 없으면 빈다
 *            (docs/hanja-radical-example-design.md). 규칙대로 비운 것이라 붉히지 않는다
 *   필순   — 공식 도해로 글자마다 대조한 것만 있다. 나머지는 자형만 보여준다
 *   부수   — 213자는 전부 채웠다. 아래 요약 줄에서 한눈에 본다
 *
 * **빠진 글자를 펼쳐 볼 수 있다.** 숫자만으로는 다음에 무엇을 채울지 안 보인다 —
 * 줄을 누르면 그 급수에서 예시가 빈 글자가 깔린다. 스크립트에 그대로 넘길 수 있게
 * 글자만 이어 둔다.
 *
 * **채운 쪽이 아니라 남은 쪽을 그린다.** 처음에는 채움 비율 막대를 숫자 옆 빈 칸에
 * 뒀는데 세 가지가 어긋났다 — 헤더가 비어 무엇의 막대인지 안 보였고, 다 찬 급수는
 * 막대를 안 그려 «100%»가 «데이터 없음»으로 읽혔으며, 2급 필순 534/538처럼 잘된
 * 값이 표에서 가장 요란했다. 지금은 `488/538` 꼴로 붙이고 **결손만 붉힌다.**
 * 다 찬 줄은 조용하고 특급·1급만 눈에 든다.
 */
export type HanjaGradeRow = {
  id: string
  label: string
  characters: number
  examples: number
  strokes: number
  /** 예시가 빈 글자. 줄을 눌렀을 때만 쓰인다 */
  missing: string
}

export type HanjaRadicalSummary = {
  total: number
  /** 說文解字 원문을 붙인 부수. 나머지는 원문 자체가 없는 글자다 */
  shuowen: number
  /** 원문을 우리말로 옮긴 부수. shuowen과 같아야 한다 */
  translated: number
  /** 배정자가 아니라 사전에서 명칭을 가져온 부수 */
  named: number
  /** 說文에 부가 없는 글자 */
  without: string
}

export function DebugHanja({ grades, radicals }: { grades: HanjaGradeRow[]; radicals: HanjaRadicalSummary }) {
  const [open, setOpen] = useState<string | null>(null)

  const characters = grades.reduce((sum, grade) => sum + grade.characters, 0)
  const examples = grades.reduce((sum, grade) => sum + grade.examples, 0)
  const strokes = grades.reduce((sum, grade) => sum + grade.strokes, 0)
  const selected = grades.find((grade) => grade.id === open)

  return (
    <>
      <dl className="mb-4 flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2 rounded-ctrl border border-line bg-surface px-3 py-2.5 text-[13px] text-sub">
        <Stat label="글자" value={`${characters.toLocaleString()}`} />
        <Stat label="예시" value={`${examples.toLocaleString()}/${characters.toLocaleString()}`} />
        <Stat label="필순" value={`${strokes.toLocaleString()}/${characters.toLocaleString()}`} />
        <Stat label="부수" value={`${radicals.translated}/${radicals.shuowen}`} bad={radicals.translated < radicals.shuowen} />
        <Stat label="사전 명칭" value={`${radicals.named}`} />
        {/* 說文에 부가 없는 글자는 결손이 아니라 원전의 사실이다. 붉히지 않는다 */}
        {radicals.without && <span className="opacity-60">說文 없음 {radicals.without}</span>}
      </dl>

      <div className="min-h-0 flex-1 overflow-auto rounded-ctrl border border-line">
        <table className="w-full min-w-[400px] table-fixed bg-surface text-left text-[13px]">
          <colgroup>
            {[80, 70, 125, 125].map((width, i) => (
              <col key={i} style={{ width }} />
            ))}
          </colgroup>
          <thead className="sticky top-0 z-10 bg-surface">
            <tr className="text-[11px] tracking-wide text-sub uppercase">
              <Th>급수</Th>
              <Th>글자</Th>
              <Th>예시</Th>
              <Th>필순</Th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr
                key={grade.id}
                onClick={() => setOpen(open === grade.id ? null : grade.id)}
                aria-expanded={open === grade.id}
                className={`h-[34px] cursor-pointer border-t border-line align-middle transition ${
                  open === grade.id ? 'bg-pick' : ''
                }`}
              >
                <Td>{grade.label}</Td>
                <Td>
                  <span className="tabular-nums">{grade.characters.toLocaleString()}</span>
                </Td>
                <Td>
                  <Filled filled={grade.examples} total={grade.characters} />
                </Td>
                <Td>
                  <Filled filled={grade.strokes} total={grade.characters} />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="mt-3 max-h-40 shrink-0 overflow-auto rounded-ctrl border border-line bg-surface px-3 py-2.5 text-[13px]">
          <p className="mb-1.5 text-xs text-sub">
            {selected.label} · 예시 없는 글자 {selected.characters - selected.examples}
            {selected.missing ? '' : ' — 없다'}
          </p>
          {/* 글자만 이어 둔다. 그대로 긁어 스크립트에 넘길 수 있다 */}
          <p className="leading-relaxed break-all">{selected.missing}</p>
        </div>
      )}
    </>
  )
}

/**
 * `488/538` 꼴. **결손만 붉힌다** — 다 찬 급수는 분모를 흐리게 눕혀 조용히 지나가고,
 * 덜 찬 급수만 숫자가 붉어진다. 채운 쪽을 칠하면 잘된 급수가 제일 요란해진다.
 */
function Filled({ filled, total }: { filled: number; total: number }) {
  const done = filled === total
  return (
    <span className="tabular-nums">
      <span className={done ? '' : 'font-semibold text-err'}>{filled.toLocaleString()}</span>
      <span className="text-sub opacity-60">/{total.toLocaleString()}</span>
    </span>
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
