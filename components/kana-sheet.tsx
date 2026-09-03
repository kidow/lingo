'use client'

import { useState } from 'react'
import { KANA } from '@/lib/content'
import type { KanaCell, KanaScript, KanaTable } from '@/lib/types'

/**
 * 가나 표. 히라가나·가타카나 오십음도와 규칙을 훑어보는 자리다. (spec.md §5)
 *
 * **푸는 것이 아니라 보는 것이다.** 상식 탭에도 같은 지식이 문항으로 있지만
 * (`content/trivia/ja.json`의 히라가나·가타카나 항목) 쓰임이 다르다 — 문항은
 * 답해서 확인하는 것이고 이 표는 카드를 풀다 막혔을 때 열어 보는 것이다.
 * 그래서 채점도 진도도 없다.
 *
 * **껍데기는 부르는 쪽이 씌운다.** 여기는 내용만 그린다 — 바텀시트든 다른
 * 무엇이든 여는 방식과 섞이지 않아야 표를 다른 자리에 다시 쓸 수 있다.
 */
export function KanaSheet() {
  const [id, setId] = useState<KanaScript['id']>('hiragana')
  const script = KANA.scripts.find((s) => s.id === id) ?? KANA.scripts[0]

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* 두 문자를 갈아 끼운다. 나란히 놓으면 표가 너무 길어져 훑는 데가 없어진다 */}
      <div
        role="tablist"
        aria-label="문자"
        className="flex shrink-0 gap-1.5 border-b border-line px-lg pb-3"
      >
        {KANA.scripts.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === id}
            onClick={() => setId(s.id)}
            className={`rounded-pill border px-3.5 py-1.5 text-sm font-semibold transition active:scale-[.985] ${
              s.id === id
                ? 'border-accent bg-pick text-accent'
                : 'border-line bg-surface text-sub'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-lg pt-4 pb-lg">
        <div className="flex flex-col gap-7">
          {script.tables.map((table) => (
            <Table key={table.title} table={table} />
          ))}

          {script.rules.map((rule) => (
            <section key={rule.title}>
              <h3 className="text-[15px] font-semibold">{rule.title}</h3>
              <p className="mt-1 text-sm text-sub">{rule.body}</p>
              <dl className="mt-2.5 flex flex-col gap-1.5">
                {rule.examples.map((example) => (
                  <div key={example.text} className="flex items-baseline gap-2.5">
                    <dt className="font-jp shrink-0 text-[15px]">{example.text}</dt>
                    <dd className="text-sm text-sub">{example.gloss}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function Table({ table }: { table: KanaTable }) {
  return (
    <section>
      <h3 className="text-[15px] font-semibold">{table.title}</h3>

      {/* 좁은 화면에서 표만 옆으로 밀린다. 시트 전체가 가로로 흔들리면 안 된다 */}
      <div className="-mx-lg mt-2.5 overflow-x-auto px-lg">
        <table className="w-full min-w-[320px] table-fixed border-collapse text-center">
          {table.columns.length > 0 && (
            <thead>
              <tr>
                {/* 줄 이름 칸. 머리글이 없어 스크린리더에는 빈 칸으로 읽힌다 */}
                <th className="w-[4.5rem] pb-1.5" />
                {table.columns.map((column) => (
                  <th key={column} className="pb-1.5 text-xs font-medium text-sub">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="text-left align-middle text-xs font-medium text-sub whitespace-nowrap"
                >
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  // 빈 칸은 음운 체계에서 빠진 자리다 — や행의 yi·ye처럼
                  <td key={i} className="p-0.5">
                    {cell ? <Cell cell={cell} /> : <span className="sr-only">없음</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.caption && <p className="mt-2 text-xs text-sub">{table.caption}</p>}
    </section>
  )
}

function Cell({ cell }: { cell: KanaCell }) {
  return (
    <span
      className="flex flex-col items-center justify-center rounded-ctrl border border-line bg-surface py-1.5"
      title={cell.note}
    >
      <span className="font-jp text-lg leading-none">{cell.kana}</span>
      <span className="mt-1 text-[11px] leading-none text-sub">{cell.roman}</span>
      {/* 가타카나 표에만 있다. 대응하는 히라가나를 같은 칸에 겹쳐 싣는다 */}
      {cell.pair && (
        <span className="font-jp mt-1 text-[11px] leading-none text-sub opacity-70">
          {cell.pair}
        </span>
      )}
    </span>
  )
}
