/**
 * Goethe-Zertifikat Wortliste(A1~B1)의 **표제어**와 등급. (spec.md §7)
 *
 *   node scripts/goethe.ts            PDF에서 다시 뽑아 scripts/goethe-wortliste.json을 쓴다
 *   node scripts/goethe.ts B1 --lines 표제어 칸의 줄을 그대로 (검수용)
 *
 * 예전 `levels.ts`의 `pdfWords`는 PDF의 글자를 **전부** 긁었다 — 표제어와 예문이
 * 섞여, A1 목록 예문에 스친 낱말까지 A1이 됐고 목록의 크기도 셀 수 없었다.
 * 목록은 두 칸으로 짜여 있다. 왼쪽이 표제어(관사·복수·활용), 오른쪽이 예문이다.
 * 그래서 **표제어 칸의 사각형 안 글자만** 고른다.
 *
 * 고르는 일은 macOS PDFKit이 한다(goethe-columns.swift). 글자 일부가 CID 글꼴의
 * 글리프 번호로 찍혀 있어 zlib으로 스트림을 푸는 방식으로는 그 쪽이 통째로
 * 빠졌다 — A1에서 schreiben·sprechen이 없었다. **뽑은 표를 커밋한다** — 다른
 * 기계에서는 이 단계가 안 돌고, 목록이 바뀌는 일은 몇 해에 한 번이다
 * (hsk-2026.json과 같다).
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { cachedBytes } from './cache.ts'

export type GoetheLevel = 'A1' | 'A2' | 'B1'
const LEVELS: GoetheLevel[] = ['A1', 'A2', 'B1']

const URL: Record<GoetheLevel, string> = {
  A1: 'https://www.goethe.de/pro/relaunch/prf/de/A1_SD1_Wortliste_02.pdf',
  A2: 'https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_A2_Wortliste.pdf',
  B1: 'https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_B1_Wortliste.pdf',
}

/**
 * [단 수, 들여쓰기 pt]. A1은 한 단, A2·B1은 두 단이다 — 두 단이면 쪽 가운데로
 * 나눈다. 들여쓰기는 표제어 칸 왼쪽 끝에서 이만큼 넘게 들어가 시작하는 줄을
 * 예문으로 보는 기준이다. 판마다 짜임이 달라 재어 적었다:
 *
 *   A1  표제어 143 → 예문 237 (+94)
 *   A2  표제어 35 → 예문 105 (+70)
 *   B1  동사 315 → 명사의 관사 376 (+61) → 번호 예문 411 (+96)
 */
const COLUMNS: Record<GoetheLevel, [number, number]> = { A1: [1, 60], A2: [2, 50], B1: [2, 80] }

const OUT = join('scripts', 'goethe-wortliste.json')

/** 활용이 이어지는 줄의 첫 낱말. 앞 줄이 쉼표로 안 끝나도 이것으로 시작하면 잇는다 */
const CONTINUES = /^(hat|ist|war|wurde|haben|sein)\s/

/** 표제어 칸의 줄들. 한 표제어의 활용이 여러 줄이면 한 줄로 붙인다 */
export async function goetheLines(level: GoetheLevel): Promise<string[]> {
  await cachedBytes(`goethe-${level}.pdf`, async () =>
    Buffer.from(await (await fetch(URL[level], { headers: { 'User-Agent': 'Mozilla/5.0' } })).arrayBuffer()),
  )
  const text = execFileSync(
    'swift',
    [join("scripts", "goethe-columns.swift"), join(".cache", `goethe-${level}.pdf`), ...COLUMNS[level].map(String)],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  )
  const entries: string[] = []
  for (const page of text.split('\f')) {
    const onPage: string[] = []
    for (const column of page.split('\v')) {
      let open = false
      for (const raw of column.split('\n')) {
        // 표제어와 예문이 한 줄에 공백 여러 칸으로 벌어진 쪽이 있다
        // (`abgeben,              Ich muss …`). 칸 사각형이 예문 앞머리를 자르므로
        // 첫 공백 뭉치 앞까지만 표제어다. 공백으로 시작하면 예문이 이어지는 줄이다
        if (/^\s/.test(raw)) continue
        const line = raw.split(/\s{3,}/)[0].replace(/\s+/g, ' ').trim()
        if (!line) continue
        const last = onPage[onPage.length - 1]
        // 줄 끝 하이픈으로 나뉜 명사(`das Kranken-` / `haus, ¨-er`)는 붙인다. 관사가
        // 있을 때만이다 — `Feier-` · `Schwimm-`은 그 자체가 접두어 표제어다
        if (last && /^(der|die|das) .*[a-zäöüß]-$/.test(last) && /^[a-zäöüß]/.test(line))
          onPage[onPage.length - 1] = last.slice(0, -1) + line
        else if ((open || CONTINUES.test(line)) && last) onPage[onPage.length - 1] += ` ${line}`
        else onPage.push(line)
        open = line.endsWith(',')
      }
    }
    /*
     * **목록이 아닌 쪽은 통째로 뺀다.** 머리말·판권·차례도 같은 칸 자리에 글이
     * 있어 줄 단위로는 못 거른다(`Autoren und Autorinnen`). 목록 쪽은 관사로
     * 시작하거나 한 낱말인 줄이 대부분이다 — 주제별 목록(숫자·요일·색)도 그렇다.
     * 셋에 하나도 안 되면 글 쪽이다
     */
    const listy = onPage.filter((line) => /^(der|die|das) \S|^[A-Za-zÄÖÜäöüß-]+,?$|^[a-zäöüß]+, /.test(line))
    if (onPage.length && listy.length / onPage.length >= 0.3) entries.push(...onPage)
  }
  return entries
}

const ARTICLE = /^(?:der|die|das)(?:\/(?:der|die|das))*\s+/

/**
 * 줄 → 표제어. 관사·`(sich)`·복수 꼬리·활용을 떼고, 빗금으로 묶인 형태는 나눈다
 * (`Samstag/Sonnabend`). 여러 낱말로 된 표제어(`weg sein`)는 그대로 둔다.
 */
export function headwordsOf(line: string): string[] {
  const head = line
    .replace(ARTICLE, '')
    .replace(/^\(sich\)\s*|^sich\s+/, '')
    .split(',')[0]
    .replace(/\d+$/, '')
    .trim()
  return (
    head
      .split('/')
      .map((form) => form.trim())
      .filter((form) => /^[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß. '-]*$/.test(form) && form.length > 1)
      // 네 낱말이 넘으면 표제어가 아니라 머리말·판권의 문장이다. 표제어는 길어도
      // `jedes Mal` · `weg sein` · `Bescheid sagen` 셋 안쪽이다
      .filter((form) => form.split(' ').length <= 3)
      // 쪽 제목(`ALPHABETISCHER WORTSCHATZ`)은 대문자로만 된 넉 자 이상이다. DVD·EG 같은 약어는 둔다
      .filter((form) => !/^[A-ZÄÖÜ]{4,}/.test(form))
      // 활용 줄이 새어 나온 것(`hat genommen`)
      .filter((form) => !/^(hat|ist|war|wurde) /.test(form))
  )
}

/** 등급 → 표제어. 낮은 등급에 이미 있으면 높은 등급에서는 뺀다(처음 나오는 등급 하나) */
export function goetheHeadwords(): Map<GoetheLevel, Set<string>> {
  const table = JSON.parse(readFileSync(OUT, 'utf8')) as Record<GoetheLevel, string[]>
  return new Map(LEVELS.map((level) => [level, new Set(table[level])]))
}

/**
 * 목록이 **재귀동사로** 싣는 표제어(`(sich) beeilen` → `beeilen`).
 *
 * 우리 표제어는 `sich beeilen`이라 재귀대명사를 떼야 목록과 만난다. 그런데 아무
 * 동사에서나 떼면 `sich stellen`(나서다)이 `stellen`(세우다)의 등급을 받는다 —
 * 목록도 재귀형으로 실었을 때만 뗀다.
 */
export function goetheReflexive(): Set<string> {
  const table = JSON.parse(readFileSync(OUT, 'utf8')) as { reflexive?: string[] }
  return new Set(table.reflexive ?? [])
}

/** 우리 독일어 표기 → 목록에서 찾을 꼴. 목록도 재귀형일 때만 `sich `를 뗀다 */
export function goetheKey(term: string, reflexive: Set<string>): string {
  const bare = term.replace(/^sich /, '')
  return bare !== term && reflexive.has(bare) ? bare : term
}

if (import.meta.main) {
  const [level, flag] = process.argv.slice(2)
  if (flag === '--lines') {
    for (const line of await goetheLines(level as GoetheLevel)) console.log(line)
  } else {
    const table: Record<string, string[]> = {}
    const seen = new Set<string>()
    const reflexive = new Set<string>()
    for (const lv of LEVELS) {
      const words = new Set<string>()
      for (const line of await goetheLines(lv))
        for (const word of headwordsOf(line)) {
          if (/^(?:(?:der|die|das) )?\(?sich\)? /.test(line)) reflexive.add(word)
          if (!seen.has(word)) words.add(word)
        }
      for (const word of words) seen.add(word)
      table[lv] = [...words].sort((a, b) => a.localeCompare(b, 'de'))
      console.log(`${lv} ${words.size}개`)
    }
    table.reflexive = [...reflexive].sort((a, b) => a.localeCompare(b, 'de'))
    console.log(`재귀형 ${reflexive.size}개`)
    writeFileSync(OUT, `${JSON.stringify(table, null, 1)}\n`)
    console.log(`→ ${OUT}`)
  }
}
