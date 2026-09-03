'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { Article, KanaCell, KanaTable } from '@/lib/types'

/**
 * 참고 글을 훑는 자리. (spec.md §5)
 *
 * **목록이 먼저다.** 지금은 히라가나·가타카나 두 편뿐이지만 가나 표만 들어올
 * 자리가 아니라서, 처음부터 목록을 세우고 글을 그 아래 둔다 — 탭으로 두면
 * 셋째 글이 오는 순간 다시 짜야 한다.
 *
 * **푸는 것이 아니라 보는 것이다.** 상식 탭에도 같은 지식이 문항으로 있지만
 * 쓰임이 다르다 — 문항은 답해서 확인하는 것이고 이 글은 카드를 풀다 막혔을
 * 때 열어 보는 것이다. 그래서 채점도 진도도 없다.
 *
 * **껍데기는 부르는 쪽이 씌운다.** 여는 방식과 섞이지 않아야 다른 자리에
 * 다시 쓸 수 있다 (components/reference-drawer.tsx).
 */
export function ArticleSheet({ articles }: { articles: Article[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const article = articles.find((a) => a.id === openId) ?? null

  if (article) {
    return (
      <div className="flex h-full min-h-0 flex-col">
        {/* 목록으로 돌아가는 길. 시트를 닫았다 다시 여는 것보다 짧아야 한다 */}
        <div className="shrink-0 px-lg pb-3">
          <button
            type="button"
            onClick={() => setOpenId(null)}
            className="-ml-1.5 flex items-center gap-0.5 rounded-ctrl py-1 pr-2 pl-1 text-sm text-sub transition active:scale-[.985]"
          >
            <ChevronLeft className="size-4" strokeWidth={2.5} aria-hidden />
            목록
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-lg pb-lg">
          <h3 className="text-[17px] font-bold tracking-tight">{article.title}</h3>

          <div className="mt-4 flex flex-col gap-7">
            {article.tables.map((table) => (
              <Table key={table.title} table={table} />
            ))}

            {article.rules.map((rule) => (
              <section key={rule.title}>
                <h4 className="text-[15px] font-semibold">{rule.title}</h4>
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

  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-lg pb-lg">
      <ul className="flex flex-col gap-2">
        {articles.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => setOpenId(a.id)}
              className="flex w-full items-center gap-3 rounded-ctrl border border-line bg-surface px-4 py-3 text-left transition active:scale-[.985]"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold">{a.title}</span>
                {/* 제목만으로는 열어 볼지 판단이 안 된다. 무엇이 들어 있는지 말한다 */}
                <span className="mt-0.5 block text-[13px] text-sub">{a.summary}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-sub" strokeWidth={2.5} aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Table({ table }: { table: KanaTable }) {
  return (
    <section>
      <h4 className="text-[15px] font-semibold">{table.title}</h4>

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
                  className="text-left align-middle text-xs font-medium whitespace-nowrap text-sub"
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
