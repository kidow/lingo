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
 * `извини(те)`, `из, изо`, `лист 1`, `диск — лазерный диск`. 줄을 통째로
 * 열쇠로 쓰면 그 낱말은 무엇과도 안 맞아 영영 "빠진 것"이 된다. 뜻을 짐작하는
 * 것이 아니라 **적힌 모양을 그대로 나누는** 일이라 안전하다.
 *
 * **대시는 양옆이 빈칸일 때만 가른다.** `по-русски`·`чуть-чуть`·`кто-нибудь`는
 * 붙임표가 낱말 안에 있으므로 가르면 안 된다.
 *
 * **앞에만 빈칸이 있는 붙임표는 어미 토막이다.** `осенний -яя`는 여성형
 * 어미를 덧붙여 적은 것이라 통째로 열쇠가 되면 `осенний`가 영영 안 맞는다.
 * 빈칸 뒤에 바로 붙임표가 오면 그 뒤는 버린다.
 */
export function forms(headword: string): string[] {
  const out = new Set<string>()
  for (const raw of headword.split(/[;,]|\s+[—–-]\s+|\s+-(?=\S)/)) {
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

/**
 * 목록에 섞인 라틴 글자를 키릴로 되돌린다.
 *
 * `cпециализироваться`는 첫 글자만 라틴 `c`다. 눈으로는 안 보이고 우리 표기와
 * 영영 안 맞는다 — 이미 싣고 있는데도 "빠진 것"으로 센다. 웹으로 받아 온 목록에
 * 흔한 흠이라, 낱말을 하나씩 고쳐 적지 않고 **모양이 같은 글자만** 되돌린다.
 *
 * 키릴이 이미 든 낱말에만 적용한다. 목록에 진짜 라틴 낱말이 실려 있다면
 * (`e-mail` 같은) 건드리면 안 되기 때문이다.
 */
const LOOKALIKE: Record<string, string> = {
  a: 'а', c: 'с', e: 'е', o: 'о', p: 'р', x: 'х', y: 'у',
  A: 'А', B: 'В', C: 'С', E: 'Е', H: 'Н', K: 'К', M: 'М', O: 'О', P: 'Р', T: 'Т', X: 'Х',
}
function deLatin(term: string): string {
  if (!/[Ѐ-ӿ]/.test(term)) return term
  return term.replace(/[a-zA-Z]/g, (ch) => LOOKALIKE[ch] ?? ch)
}

/**
 * 낱말이 아닌 줄인가. 앞가지는 표제어가 아니다.
 *
 * `анти-`·`взаимо-`·`пра-`는 낱말이 아니라 **앞에 붙이는 조각**이다. 목록은
 * 사람이 읽는 책이라 이런 줄도 싣지만, 우리 카드에 올릴 자리가 없다. 분모에
 * 두면 영영 못 채우는 빚이 된다 — 없는 것을 채우지 않으므로(§5) 아예 뺀다.
 *
 * 뒤에 붙임표가 오는 줄만이다. `по-русски`처럼 가운데 든 것은 낱말이다.
 */
function isPrefixOnly(term: string): boolean {
  return term.endsWith('-')
}

export type TorflEntry = { forms: string[]; level: TorflLevel }

/** 쉿소리 뒤에는 `ы`가 아니라 `и`가 온다 — 철자 규칙 */
const HUSH = /[кгхжшчщ]$/u
/** `й`는 넣지 않는다 — 겹수가 `трамвайы`가 아니라 `трамваи`고, `ый`로 끝나는 형용사를 자음 끝으로 읽는다 */
const CONSONANT = /[бвгджзклмнпрстфхцчшщ]$/u

/**
 * 같은 낱말의 **다른 꼴**을 지어 본다.
 *
 * 목록은 낱말을 하나 고르면 한 꼴만 싣는다. 그런데 어느 꼴을 고르는지는
 * 일정하지 않다 — `орех`는 홑수인데 `близнецы`는 겹수고, `виден`은 짧은꼴인데
 * `открытый`는 긴꼴이다. 우리가 다른 꼴로 싣고 있으면 **이미 가르치고 있는데도**
 * 빠진 것으로 센다. 2026-09-18에 그렇게 센 것이 일곱이었다.
 *
 * 뜻을 짐작하는 것이 아니라 **철자를 굴리는** 일이다. 그래서 지어낸 꼴은
 * 등급을 찍는 쪽(`torflLevels`)에는 주지 않는다. 세는 쪽만 쓴다 — 닮은 표기에
 * 등급이 잘못 붙는 것이 못 세는 것보다 나쁘다.
 *
 * 지은 꼴이 **목록의 다른 표제어와 같으면 버린다.** 그 줄과 이 줄을 한 낱말로
 * 뭉개는 셈이라, `её`를 `ее`로 접는 것과 같은 잘못이 된다.
 */
function siblings(term: string): string[] {
  const out: string[] = []
  const add = (...xs: string[]) => out.push(...xs.filter((x) => x.length >= 4))

  // ё를 е로 적는 것은 러시아어에서 흔하다. 목록의 `неопредёленный`처럼 ё가
  // 엉뚱한 자리에 찍힌 오타도 이 접기로 함께 지워진다
  if (term.includes('ё')) add(term.replace(/ё/g, 'е'))

  if (/(ый|ий|ой)$/u.test(term)) {
    // 형용사 긴꼴 → 짧은꼴. `открытый`→`открыт`, `видный`→`виден`
    const stem = term.slice(0, -2)
    add(stem)
    // 짧은꼴에서 자음이 겹치면 사이에 `е`가 든다
    const filled = stem.replace(/([бвгджзклмнпрстфхцчшщ])([нкл])$/u, '$1е$2')
    if (filled !== stem) add(filled)
  } else if (CONSONANT.test(term)) {
    // 홑수 → 겹수, 그리고 형용사 짧은꼴 → 긴꼴. 자음 끝은 둘 다 될 수 있다
    add(term + (HUSH.test(term) ? 'и' : 'ы'), term + 'ый')
    // 짧은꼴의 사이 모음은 긴꼴에서 빠진다 — `виден`→`видный`
    const dropped = term.replace(/([бвгджзклмнпрстфхцчшщ])[ео]([нкл])$/u, '$1$2')
    if (dropped !== term) add(dropped + 'ый', dropped + 'ий')
  } else if (term.endsWith('й')) add(term.slice(0, -1) + 'и')
  else if (term.endsWith('а')) add(term.slice(0, -1) + (HUSH.test(term.slice(0, -1)) ? 'и' : 'ы'))
  else if (/[ыи]$/u.test(term)) {
    // 겹수 → 홑수. 어느 꼴이 맞는지는 알 수 없으니 넷을 다 둔다.
    // `-ок`은 겹수에서 통째로 빠지는 자리다 — `цветок`→`цветы`
    const stem = term.slice(0, -1)
    add(stem, stem + 'ь', stem + 'а', stem + 'ок')
  }

  return [...new Set(out)].filter((x) => x !== term)
}

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
    const headword = deLatin(bare(row.word_rus))
    if (isPrefixOnly(headword)) continue
    if (!rank.has(headword) || lowest < rank.get(headword)!) {
      rank.set(headword, lowest)
      entries.set(headword, { forms: forms(headword), level: GRADES[lowest] })
    }
  }
  // 지은 꼴이 다른 줄의 표제어면 두 줄을 한 낱말로 뭉갠다. 그런 것은 버린다
  const headwords = new Set(entries.keys())
  for (const entry of entries.values()) {
    const grown = entry.forms.flatMap(siblings).filter((x) => !headwords.has(x))
    entry.forms = [...new Set([...entry.forms, ...grown])]
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
    const headword = deLatin(bare(row.word_rus))
    if (isPrefixOnly(headword)) continue
    // 한 줄이 여러 모양을 담는다. 갈래마다 열쇠를 둔다 (`forms`).
    // 지어낸 꼴(`siblings`)은 여기 안 쓴다 — 닮은 표기에 등급을 잘못 붙인다
    for (const term of forms(headword)) {
      // 같은 표기가 뜻마다 따로 실린다. 낮은 등급이 이긴다 — 그 낱말을 처음 만나는 때다
      if (!rank.has(term) || lowest < rank.get(term)!) {
        rank.set(term, lowest)
        levels.set(term, GRADES[lowest])
      }
    }
  }
  return levels
}
