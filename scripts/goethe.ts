/**
 * Goethe-Zertifikat Wortliste(A1~B1)에서 **표제어만** 뽑는다. (spec.md §7)
 *
 *   node scripts/goethe.ts            등급별 표제어 수와 앞 서른 개
 *   node scripts/goethe.ts B1 --lines 표제어 칸의 줄을 그대로 (검수용)
 *
 * `levels.ts`의 `pdfWords`는 PDF의 글자를 **전부** 긁는다 — 표제어와 예문이
 * 섞여 나와 목록의 크기를 셀 수 없었다(A1 PDF에서 낱말 수천 개). 목록은 두
 * 칸으로 짜여 있다. 왼쪽이 표제어(관사·복수·활용), 오른쪽이 예문이다. 그래서
 * **글자의 x 좌표**로 표제어 칸만 떼어 낸다.
 *
 * PDF 도구를 설치하지 않는다. 텍스트 연산자(Tm·Td·TD·T*·cm)만 따라가면
 * 글자 조각이 시작하는 좌표가 나온다 — 조각 안의 글자 폭은 몰라도 된다.
 * 칸을 가르는 데는 **조각이 어디서 시작하는지**만 필요하다.
 *
 * 한 표제어가 여러 줄에 걸치는 것은 동사다(`einzahlen, zahlt ein,` →
 * `zahlte ein, hat eingezahlt`). 이어지는 줄은 앞 줄이 쉼표로 끝나거나 줄이
 * 활용형(hat·ist·war …)으로 시작한다.
 */
import { inflateSync } from 'node:zlib'
import { cachedBytes } from './cache.ts'

export type GoetheLevel = 'A1' | 'A2' | 'B1'

const URL: Record<GoetheLevel, string> = {
  A1: 'https://www.goethe.de/pro/relaunch/prf/de/A1_SD1_Wortliste_02.pdf',
  A2: 'https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_A2_Wortliste.pdf',
  B1: 'https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_B1_Wortliste.pdf',
}

/**
 * 표제어 칸의 x 범위(pt). A1은 한 단, A2·B1은 두 단이다. 2024년판 PDF를 재어
 * 적었다 — 판이 바뀌면 `--lines`로 줄을 보고 다시 잰다.
 */
const COLUMNS: Record<GoetheLevel, [number, number][]> = {
  A1: [[135, 235]],
  A2: [[28, 104], [298, 374]],
  B1: [[28, 128], [308, 408]],
}

type Piece = { x: number; y: number; text: string }

/** 3×2 행렬 [a b c d e f]의 곱 m × n */
const mul = (m: number[], n: number[]) => [
  m[0] * n[0] + m[1] * n[2],
  m[0] * n[1] + m[1] * n[3],
  m[2] * n[0] + m[3] * n[2],
  m[2] * n[1] + m[3] * n[3],
  m[4] * n[0] + m[5] * n[2] + n[4],
  m[4] * n[1] + m[5] * n[3] + n[5],
]

/** PDF 문자열 리터럴 `( … )`의 이스케이프를 푼다. 글꼴이 WinAnsi라 latin1로 읽힌다 */
function literal(raw: string): string {
  return raw
    .replace(/\\([nrtbf()\\])/g, (_, c) => ({ n: '\n', r: '\r', t: '\t', b: '\b', f: '\f' })[c as 'n'] ?? c)
    .replace(/\\(\d{1,3})/g, (_, o) => String.fromCharCode(parseInt(o, 8)))
}

/** 콘텐츠 스트림 하나 → 글자 조각과 그 시작 좌표 */
function pieces(stream: string): Piece[] {
  const out: Piece[] = []
  const operands: (number | string)[] = []
  let ctm = [1, 0, 0, 1, 0, 0]
  const stack: number[][] = []
  let tm = [1, 0, 0, 1, 0, 0]
  let tlm = tm
  let leading = 0
  const moveTo = (tx: number, ty: number) => {
    tlm = mul([1, 0, 0, 1, tx, ty], tlm)
    tm = tlm
  }
  const show = (text: string) => {
    if (!text.trim()) return
    const m = mul(tm, ctm)
    out.push({ x: m[4], y: m[5], text })
  }
  const token = /\((?:\\.|[^()\\])*\)|\[|\]|\/[^\s/[\]()<>]+|<[0-9A-Fa-f\s]*>|[+-]?\d*\.?\d+|[A-Za-z'"*]+/g
  let array: string[] | null = null
  for (const [tok] of stream.matchAll(token)) {
    if (tok[0] === '(') {
      const text = literal(tok.slice(1, -1))
      if (array) array.push(text)
      else operands.push(text)
    } else if (tok === '[') array = []
    else if (tok === ']') {
      operands.push(array!.join(''))
      array = null
    } else if (/^[+-]?\d*\.?\d+$/.test(tok)) {
      // TJ 배열 안의 숫자는 자간 조정이다. 낱말 사이 빈칸은 문자열 안에 공백으로
      // 들어 있으므로, 칸을 건너뛸 만큼 큰 값만 빈칸으로 본다 — 작은 값을 빈칸으로
      // 읽으면 `Softw are` · `Giraff e`처럼 낱말이 쪼개진다
      if (array) {
        if (Number(tok) < -1000) array.push('   ')
      } else operands.push(Number(tok))
    } else if (tok[0] === '/' || tok[0] === '<') operands.push(tok)
    else {
      const n = operands.filter((v): v is number => typeof v === 'number')
      switch (tok) {
        case 'q': stack.push(ctm); break
        case 'Q': ctm = stack.pop() ?? [1, 0, 0, 1, 0, 0]; break
        case 'cm': ctm = mul(n.slice(-6), ctm); break
        case 'BT': tm = tlm = [1, 0, 0, 1, 0, 0]; break
        case 'Tm': tm = tlm = n.slice(-6); break
        case 'Td': moveTo(n.at(-2)!, n.at(-1)!); break
        case 'TD': leading = -n.at(-1)!; moveTo(n.at(-2)!, n.at(-1)!); break
        case 'TL': leading = n.at(-1)!; break
        case 'T*': moveTo(0, -leading); break
        case 'Tj':
        case 'TJ': show(String(operands.at(-1) ?? '')); break
        case "'": moveTo(0, -leading); show(String(operands.at(-1) ?? '')); break
        case '"': moveTo(0, -leading); show(String(operands.at(-1) ?? '')); break
      }
      operands.length = 0
    }
  }
  return out
}

/** PDF → 페이지(콘텐츠 스트림)마다 조각 목록. 글꼴 프로그램 같은 바이너리는 걸러진다 */
function streams(buf: Buffer): Piece[][] {
  const pages: Piece[][] = []
  let i = 0
  for (;;) {
    const s = buf.indexOf('stream', i)
    if (s < 0) break
    const e = buf.indexOf('endstream', s)
    if (e < 0) break
    let a = s + 6
    while (buf[a] === 0x0d || buf[a] === 0x0a) a += 1
    try {
      const chunk = inflateSync(buf.subarray(a, e)).toString('latin1')
      if (/\bBT\b/.test(chunk) && /\bT[jJ]\b/.test(chunk)) pages.push(pieces(chunk))
    } catch {
      // 풀리지 않는 스트림은 콘텐츠가 아니다
    }
    i = e + 9
  }
  return pages
}

/** 활용이 이어지는 줄의 첫 낱말. 앞 줄이 쉼표로 안 끝나도 이것으로 시작하면 잇는다 */
const CONTINUES = /^(hat|ist|war|wurde|haben|sein)\s/

/** 표제어 칸의 줄들. 한 표제어의 활용이 여러 줄이면 한 줄로 붙인다 */
export async function goetheLines(level: GoetheLevel): Promise<string[]> {
  const buf = await cachedBytes(`goethe-${level}.pdf`, async () =>
    Buffer.from(await (await fetch(URL[level], { headers: { 'User-Agent': 'Mozilla/5.0' } })).arrayBuffer()),
  )
  const entries: string[] = []
  for (const page of streams(buf)) {
    const onPage: string[] = []
    for (const [lo, hi] of COLUMNS[level]) {
      // 같은 줄은 y가 같다. 반 포인트 안쪽이면 한 줄로 본다
      const rows = new Map<number, Piece[]>()
      for (const piece of page) {
        if (piece.x < lo || piece.x >= hi) continue
        const key = Math.round(piece.y * 2)
        rows.set(key, [...(rows.get(key) ?? []), piece])
      }
      let open = false
      for (const key of [...rows.keys()].sort((a, b) => b - a)) {
        // 표제어와 예문이 한 조각에 들어 있고 공백 여러 칸으로 벌어져 있다
        // (`abgeben,              Ich muss …`). 공백으로 시작하는 조각은 예문이
        // 이어지는 줄이다. 첫 조각의 앞머리만 표제어 칸의 글자다
        const text = rows
          .get(key)!
          .sort((a, b) => a.x - b.x)
          .map((p) => (/^\s/.test(p.text) ? '' : p.text.split(/\s{3,}/)[0]))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim()
        if (!text) continue
        if ((open || CONTINUES.test(text)) && onPage.length) onPage[onPage.length - 1] += ` ${text}`
        else onPage.push(text)
        open = text.endsWith(',')
      }
    }
    /*
     * **목록이 아닌 페이지는 통째로 뺀다.** 머리말·판권·차례도 같은 칸 자리에
     * 글이 있어 줄 단위로는 못 거른다(`Autoren und Autorinnen`). 목록 페이지는
     * 관사로 시작하거나 한 낱말인 줄이 대부분이다 — 주제별 목록(숫자·요일·색)도
     * 그렇다. 셋에 하나도 안 되면 글 페이지다
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
    // 첫 글자만 따로 찍힌 제목(`W ohnen`)을 붙인다
    .replace(/^([A-ZÄÖÜ]) (?=[a-zäöüß])/, '$1')
    .replace(ARTICLE, '')
    .replace(/^\(sich\)\s*|^sich\s+/, '')
    .split(',')[0]
    .replace(/\d+$/, '')
    .trim()
  return head
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
}

/** 등급 → 표제어 집합. 낮은 등급에 이미 있으면 높은 등급에서는 뺀다(처음 나오는 등급 하나) */
export async function goetheHeadwords(): Promise<Map<GoetheLevel, Set<string>>> {
  const out = new Map<GoetheLevel, Set<string>>()
  const seen = new Set<string>()
  for (const level of ['A1', 'A2', 'B1'] as const) {
    const words = new Set<string>()
    for (const line of await goetheLines(level))
      for (const word of headwordsOf(line)) if (!seen.has(word)) words.add(word)
    for (const word of words) seen.add(word)
    out.set(level, words)
  }
  return out
}

if (import.meta.main) {
  const [level, flag] = process.argv.slice(2)
  if (flag === '--lines') for (const line of await goetheLines(level as GoetheLevel)) console.log(line)
  else
    for (const [lv, words] of await goetheHeadwords()) {
      const list = [...words]
      console.log(`${lv} ${list.length} — ${list.slice(0, 30).join(' · ')}`)
    }
}
