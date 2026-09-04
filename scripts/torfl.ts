/**
 * TORFL(ТРКИ) 어휘 목록. (spec.md §7)
 *
 * 오래 비어 있던 트랙이다. ТРКИ의 «Лексический минимум»은 Златоуст에서 나온
 * 책이라 PDF조차 공개되지 않고, 시중의 "토르플 필수 어휘 2000"은 교재사
 * 편집물이라 쓸 수 없었다. 그래서 등급을 짓지 않고 비워 뒀다.
 *
 * 그 최소치를 **웹으로 그대로 내놓는 곳**이 있다. ros-edu.ru의 «Лексический
 * минимум»은 A1~B2 네 등급을 낱말마다 붙여 두고, 목록 화면이 그리는 JSON을
 * 그대로 받아올 수 있다. robots.txt가 막는 것은 `/assets/...`뿐이라 Cervantes
 * PCIC를 거른 기준(§7)을 통과한다.
 *
 *   POST /380  action=getPublications&page=N&level_id=0&category_id=0
 *   → { data: [{ word_rus, word_eng, level_ids, categories }], count }
 *
 * 한 쪽에 40개씩 4,361줄이 온다. `level_ids`는 그 낱말이 **속한 모든 등급**이라
 * ("1, 2, 3, 4" = A1부터 쭉) 등급은 그중 가장 낮은 것이다.
 *
 * C1·C2는 이 목록에 없다. 사이트가 네 등급까지만 싣는다 — 없는 것을 채우지
 * 않으므로(§5) 상위 두 등급은 여전히 비어 있다.
 */

import { readJson, writeJson } from './cache.ts'

const URL = 'https://www.ros-edu.ru/380'
const PER_PAGE = 40

/** level_ids의 숫자가 곧 등급이다. 사이트의 필터 이름을 그대로 옮겼다 */
const GRADES = { 1: 'A1', 2: 'A2', 3: 'B1', 4: 'B2' } as const

export type TorflLevel = (typeof GRADES)[keyof typeof GRADES]

type Row = { word_rus?: string; level_ids?: string }

/**
 * 강세 부호를 뗀 표기.
 *
 * 목록은 학습용이라 `абсолю́тный`처럼 강세를 결합 문자(U+0301)로 얹어 놓는데
 * 우리 콘텐츠는 얹지 않는다. NFD로 풀어 그 한 글자만 빼면 나머지 표기는 건드리지
 * 않는다 — `ё`는 `е`로 바꾸지 않는다. `все`와 `всё`가 다른 낱말이기 때문이다.
 */
export const bare = (term: string): string =>
  term.normalize('NFD').replace(/́/g, '').normalize('NFC').trim().toLowerCase()

async function page(n: number): Promise<{ data: Row[]; count: number }> {
  const body = `action=getPublications&collection_id=0&page=${n}&level_id=0&category_id=0&query=`
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'lingo-content-tool/1.0 (+https://github.com/kidow/lingo)',
    },
    body,
  })
  return (await response.json()) as { data: Row[]; count: number }
}

/**
 * 한 표제어가 여러 표기를 담는다. 갈래로 펼친다.
 *
 * 목록은 사람이 읽는 책이라 한 줄에 여러 모양을 넣는다 — `зонт; зонтик`,
 * `извини(те)`, `из, изо`, `лист 1`. 줄을 통째로 열쇠로 쓰면 그 낱말은
 * 무엇과도 안 맞아 영영 "빠진 것"이 된다. 뜻을 짐작하는 것이 아니라
 * **적힌 모양을 그대로 나누는** 일이라 안전하다.
 */
export function forms(headword: string): string[] {
  const out = new Set<string>()
  for (const raw of headword.split(/[;,]/)) {
    const part = raw
      .trim()
      .replace(/[!?.]+$/, '')
      // `лист 1`·`мир 1` — 같은 표기의 다른 뜻을 숫자로 가른다
      .replace(/\s+\d+$/, '')
      .trim()
    if (!part) continue
    // `извини(те)` — 괄호 안이 붙은 모양과 안 붙은 모양 둘 다다
    const optional = /^(.+?)\((.+?)\)$/.exec(part)
    if (optional) {
      out.add(optional[1].trim())
      out.add((optional[1] + optional[2]).trim())
    } else out.add(part)
  }
  return [...out].filter(Boolean)
}

export type TorflEntry = { forms: string[]; level: TorflLevel }

/**
 * 목록 한 줄이 한 항목이다. 갈래는 그 안에 담는다.
 *
 * 분모를 세는 쪽은 이것을 쓴다. 펼친 표기로 세면 `зонт; зонтик` 한 줄이 두 개가
 * 되어 목록이 실제보다 커진다.
 */
export async function torflEntries(): Promise<TorflEntry[]> {
  const rows = await allRows()
  const entries = new Map<string, TorflEntry>()
  const rank = new Map<string, number>()
  for (const row of rows) {
    const lowest = lowestGrade(row)
    if (!lowest || !row.word_rus) continue
    const headword = bare(row.word_rus)
    if (!rank.has(headword) || lowest < rank.get(headword)!) {
      rank.set(headword, lowest)
      entries.set(headword, { forms: forms(headword), level: GRADES[lowest] })
    }
  }
  return [...entries.values()]
}

/**
 * 목록 전체를 한 번만 받아 둔다. 한 쪽에 40줄씩 온다.
 *
 * 쪽을 하나씩 도느라 실행마다 백 번 넘게 요청한다 — 목록은 연 단위로나 바뀌므로
 * 받은 줄을 `.cache/torfl.json`에 두고 다시 쓴다 (scripts/cache.ts).
 */
let cached: Row[] | null = null
async function allRows(): Promise<Row[]> {
  if (cached) return cached
  const saved = readJson<Row[]>('torfl.json')
  if (saved && saved.length > 0) {
    cached = saved
    return saved
  }
  const first = await page(1)
  const rows = [...first.data]
  for (let n = 2; n <= Math.ceil(first.count / PER_PAGE); n += 1) rows.push(...(await page(n)).data)
  cached = rows
  writeJson('torfl.json', rows)
  return rows
}

/** 그 낱말이 처음 나오는 등급. 없으면 null */
function lowestGrade(row: Row): 1 | 2 | 3 | 4 | null {
  const grades = String(row.level_ids ?? '')
    .split(',')
    .map((x) => Number(x.trim()))
    .filter((n): n is 1 | 2 | 3 | 4 => n >= 1 && n <= 4)
  return grades.length === 0 ? null : (Math.min(...grades) as 1 | 2 | 3 | 4)
}

/** 표기 → 등급. 갈래를 펼쳐 열쇠로 둔다 */
export async function torflLevels(): Promise<Map<string, TorflLevel>> {
  const rows = await allRows()

  const levels = new Map<string, TorflLevel>()
  const rank = new Map<string, number>()
  for (const row of rows) {
    if (!row.word_rus) continue
    const lowest = lowestGrade(row)
    if (!lowest) continue
    // 한 줄이 여러 모양을 담는다. 갈래마다 열쇠를 둔다 (`forms`)
    for (const term of forms(bare(row.word_rus))) {
      // 같은 표기가 뜻마다 따로 실린다. 낮은 등급이 이긴다 — 그 낱말을 처음 만나는 때다
      if (!rank.has(term) || lowest < rank.get(term)!) {
        rank.set(term, lowest)
        levels.set(term, GRADES[lowest])
      }
    }
  }
  return levels
}
