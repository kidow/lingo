'use client'

import { bcp47 } from '@/lib/lang'
import type { Article, KanaCell, KanaTable } from '@/lib/types'

/**
 * 참고 글 한 편의 본문. (spec.md §5)
 *
 * **푸는 것이 아니라 보는 것이다.** 상식 탭에도 같은 지식이 문항으로 있지만
 * 쓰임이 다르다 — 문항은 답해서 확인하는 것이고 이 글은 카드를 풀다 막혔을
 * 때 열어 보는 것이다. 그래서 채점도 진도도 없다.
 *
 * 표와 규칙만 그리고 **스크롤 상자와 목록은 부르는 쪽이 든다.** 찾기 시트가
 * 빈 칸일 때는 참고 글 목록으로, 검색 결과에서는 한 편으로 이 본문을 편다
 * (components/search-sheet.tsx).
 */
export function ArticleBody({ article }: { article: Article }) {
  /*
   * 제목·해설은 한국어고 표 안의 글자와 예문만 그 언어다. 글 전체에 태그를
   * 붙이면 설명까지 그 언어로 읽히므로 **글자가 서는 자리에만** 내려보낸다
   * (lib/lang.ts)
   */
  const tag = bcp47(article.lang)

  return (
    <>
      <h3 className="text-[17px] font-bold tracking-tight">{article.title}</h3>

      <div className="mt-4 flex flex-col gap-7">
        {article.tables.map((table) => (
          <Table key={table.title} table={table} tag={tag} />
        ))}

        {article.rules.map((rule) => (
          <section key={rule.title}>
            <h4 className="text-[15px] font-semibold">{rule.title}</h4>
            <p className="mt-1 text-sm text-sub">{rule.body}</p>
            <dl className="mt-2.5 flex flex-col gap-1.5">
              {rule.examples.map((example) => (
                <div key={example.text} className="flex items-baseline gap-2.5">
                  <dt lang={tag} className="font-jp shrink-0 text-[15px]">
                    {example.text}
                  </dt>
                  <dd className="text-sm text-sub">{example.gloss}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  )
}

/**
 * 표가 눌리지 않을 폭.
 *
 * 줄 이름 칸과 나머지 칸을 따로 잰다. 둘 다 **가장 긴 글자**를 기준으로 삼는데,
 * 표마다 사정이 다르기 때문이다 — 오십음도는 한 칸이 한 글자지만 활용표는
 * `finissons`처럼 열 자까지 가고, 줄 이름도 `-er · parler`처럼 길어진다.
 * 폭을 하나로 못 박으면 긴 쪽이 서로 붙어 읽히지 않는다.
 *
 * 넘치면 표만 옆으로 밀리고 시트는 흔들리지 않는다.
 */
function widthsOf(table: KanaTable) {
  const columns = table.columns.length || (table.rows[0]?.cells.length ?? 1)
  const longestCell = Math.max(
    1,
    ...table.rows.flatMap((row) =>
      row.cells.map((cell) => (cell ? [...cell.kana].length : 0)),
    ),
  )
  const longestLabel = Math.max(1, ...table.rows.map((row) => [...row.label].length))
  // 줄 이름은 한글이 섞여 글자가 넓다. 칸 쪽 +24는 좌우 여백이다 —
  // 그 여유가 없으면 sommes 같은 긴 활용형이 2px 넘친다
  const label = Math.max(64, longestLabel * 8 + 16)
  return { label, min: label + columns * Math.max(46, longestCell * 9 + 24) }
}

function Table({ table, tag }: { table: KanaTable; tag: string }) {
  const widths = widthsOf(table)

  return (
    <section>
      <h4 className="text-[15px] font-semibold">{table.title}</h4>

      {/* 좁은 화면에서 표만 옆으로 밀린다. 시트 전체가 가로로 흔들리면 안 된다 */}
      <div className="-mx-lg mt-2.5 overflow-x-auto px-lg">
        <table
          className="w-full table-fixed border-collapse text-center"
          style={{ minWidth: widths.min }}
        >
          {table.columns.length > 0 && (
            <thead>
              <tr>
                {/* 줄 이름 칸. 머리글이 없어 스크린리더에는 빈 칸으로 읽힌다 */}
                <th className="pb-1.5" style={{ width: widths.label }} />
                {/* 열 이름은 비어 있을 수 있다(성모·운모 표) — 키는 자리로 잡는다 */}
                {table.columns.map((column, i) => (
                  <th key={i} className="pb-1.5 text-xs font-medium text-sub">
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
                  style={{ width: widths.label }}
                >
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  // 빈 칸은 음운 체계에서 빠진 자리다 — や행의 yi·ye처럼
                  <td key={i} className="p-0.5">
                    {cell ? <Cell cell={cell} tag={tag} /> : <span className="sr-only">없음</span>}
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

function Cell({ cell, tag }: { cell: KanaCell; tag: string }) {
  return (
    <span
      className="flex flex-col items-center justify-center rounded-ctrl border border-line bg-surface py-1.5"
      title={cell.note}
    >
      <span lang={tag} className="font-jp text-lg leading-none">
        {cell.kana}
      </span>
      {cell.roman && (
        <span className="mt-1 text-[11px] leading-none text-sub">{cell.roman}</span>
      )}
      {/* 가타카나 표에만 있다. 대응하는 히라가나를 같은 칸에 겹쳐 싣는다 */}
      {cell.pair && (
        <span lang={tag} className="font-jp mt-1 text-[11px] leading-none text-sub opacity-70">
          {cell.pair}
        </span>
      )}
    </span>
  )
}
