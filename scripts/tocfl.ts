/**
 * 번체 표기·TOCFL 등급 채우기. (spec.md §7)
 *
 *   node scripts/tocfl.ts             콘텐츠 전체
 *   node scripts/tocfl.ts food        한 파일만
 *
 * 공식 자료 여섯을 엮는다. 어느 하나도 그림 명사(체크인 카운터·구명조끼)까지
 * 다 신지 않아서, 겹쳐야 셋 중 둘이 풀린다.
 *
 *   Unihan `kTraditionalVariant`   글자 하나의 간체→번체 후보. Unicode License
 *   華語八千詞表 (TOCFL)           7,517어. 표제어가 번체 · **TOCFL 7등급** · 병음
 *   三等七級詞語表 (國教院)         14,452어. 표제어가 번체 · 병음. 후보 검증용
 *   國語辭典 簡編本 (교육부)        44,398어. 후보 검증용. CC BY-ND — 표제어 조회만, 釋義는 옮기지 않는다
 *   國語辭典 重編修訂本 (교육부)     163,921어. 후보가 갈릴 때 최장 일치로 가른다
 *   兩岸常用詞語對照表 (교육부)      낱말 자체가 바뀌는 자리. 번체화가 아니다(土豆→馬鈴薯)
 *
 * **후보를 좁히기만 한다. 추정하지 않는다.**
 *
 *   1. Unihan으로 글자마다 번체 후보를 만든다 (한 글자에 여럿일 수 있다 — 发→發/髮)
 *   2. 공식 표제어(八千詞表∪國教院∪簡編本)에 정확히 하나만 있으면 그것을 쓴다
 *   3. 후보가 하나뿐이면(글자마다 번체가 하나씩) 그대로 쓴다
 *   4. 그래도 갈리면 重編 표제어로 나눠 떨어지는 후보가 하나면 그것을 쓴다
 *   5. 重編 최장 일치 점수가 유일하게 가장 높은 후보가 있으면 그것을 쓴다
 *   6. 그래도 안 갈리면 **비운다** — 台/臺/檯/颱, 发/發/髮처럼 사람이 고를 자리다
 *
 * 兩岸表는 마지막에 한 번 더 지나간다. 번체화가 아니라 대만에서 **다른 낱말**을
 * 쓰는 자리라(土豆→馬鈴薯) 자소 대조로는 못 잡는다.
 *
 * TOCFL 등급은 八千詞表에서만 붙인다. 國教院·簡編本·重編은 후보 검증용이지
 * TOCFL 시험 자체의 어휘표가 아니다 — 등급을 섞으면 "TOCFL 등급"이 거짓말이 된다.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { inflateRawSync } from 'node:zlib'
import type { Concept } from '../lib/types.ts'

const UA = { 'User-Agent': 'lingo-content-tool/1.0 (+https://github.com/kidow/lingo)' }

async function fetchBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url, { headers: UA })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

/* ── zip · xlsx ──────────────────────────────────────────────────────
 *
 * 압축 도구를 설치하지 않는다. `node:zlib`로 DEFLATE만 풀면 되고,
 * 중앙 디렉터리만 읽는다 — 로컬 헤더를 순서대로 훑으면 한자 파일명이 섞인
 * 항목(TOCFL zip의 폰트 디렉터리)에서 오프셋이 어긋난다.
 */
type Zip = { get(name: string): Buffer; find(pattern: RegExp): string }

function openZip(buf: Buffer): Zip {
  let e = buf.length - 22
  while (e >= 0 && buf.readUInt32LE(e) !== 0x06054b50) e -= 1
  if (e < 0) throw new Error('zip 종료 레코드를 찾지 못했습니다')
  const count = buf.readUInt16LE(e + 10)
  let off = buf.readUInt32LE(e + 16)
  const index = new Map<string, { method: number; compSize: number; localHeader: number }>()
  for (let i = 0; i < count; i += 1) {
    const method = buf.readUInt16LE(off + 10)
    const compSize = buf.readUInt32LE(off + 20)
    const nameLen = buf.readUInt16LE(off + 28)
    const extraLen = buf.readUInt16LE(off + 30)
    const commentLen = buf.readUInt16LE(off + 32)
    const localHeader = buf.readUInt32LE(off + 42)
    // UTF-8이 아니어도 상관없다 — 찾는 이름(.xlsx·.txt)이 전부 아스키라 접두어가
    // 깨져 보여도 끝은 그대로 맞는다
    const name = buf.toString('utf8', off + 46, off + 46 + nameLen)
    index.set(name, { method, compSize, localHeader })
    off += 46 + nameLen + extraLen + commentLen
  }
  return {
    get(name) {
      const entry = index.get(name)
      if (!entry) throw new Error(`zip에 ${name}이 없습니다`)
      const nameLen = buf.readUInt16LE(entry.localHeader + 26)
      const extraLen = buf.readUInt16LE(entry.localHeader + 28)
      const start = entry.localHeader + 30 + nameLen + extraLen
      const raw = buf.subarray(start, start + entry.compSize)
      return entry.method === 0 ? Buffer.from(raw) : inflateRawSync(raw)
    },
    find(pattern) {
      const name = [...index.keys()].find((n) => pattern.test(n))
      if (!name) throw new Error(`${pattern}에 맞는 항목이 없습니다`)
      return name
    },
  }
}

type SheetRow = Record<string, string>

/** xlsx의 시트 하나를 열 문자 → 값 객체 배열로 편다. 필요한 열만 읽는다 */
function xlsxSheet(xlsx: Zip, sheetPath: string, sharedStrings: string[]): SheetRow[] {
  const xml = xlsx.get(sheetPath).toString('utf8')
  return [...xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)].map((row) => {
    const cell: SheetRow = {}
    for (const m of row[1].matchAll(/<c r="([A-Z]+)\d+"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const isShared = /t="s"/.test(m[2])
      const value = m[3] && (m[3].match(/<v>([\s\S]*?)<\/v>/) ?? [])[1]
      if (value !== undefined) cell[m[1]] = isShared ? sharedStrings[Number(value)] : value
    }
    return cell
  })
}

function sharedStringsOf(xlsx: Zip): string[] {
  const xml = xlsx.get('xl/sharedStrings.xml').toString('utf8')
  return [...xml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) =>
    [...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => t[1]).join(''),
  )
}

/* ── 출처 ──────────────────────────────────────────────────────────── */

const TOCFL_ZIP_URL = 'https://tocfl.edu.tw/tocfl/assets/files/vocabulary/8000zhuyin_202409.zip'
const NAER_XLSX_URL = 'https://coct.naer.edu.tw/file/files/' + encodeURIComponent('14452詞語表202504.xlsx')
const CONCISED_ZIP_URL =
  'https://language.moe.gov.tw/001/Upload/Files/site_content/M0001/respub/download/dict_concised_2014_20260626.zip'
const REVISED_ZIP_URL =
  'https://language.moe.gov.tw/001/Upload/Files/site_content/M0001/respub/download/dict_revised_2015_20260625.zip'
const CROSS_STRAIT_URL = 'https://dict.concised.moe.edu.tw/appendix.jsp?ID=54&SN={SN}&la=0&powerMode=0'
const UNIHAN_ZIP_URL = 'https://www.unicode.org/Public/UNIDATA/Unihan.zip'

type TocflLevel = '準備1' | '準備2' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5'
const TOCFL_LEVELS: { level: TocflLevel; sheet: number; column: 'A' | 'B' }[] = [
  { level: '準備1', sheet: 1, column: 'B' },
  { level: '準備2', sheet: 2, column: 'B' },
  { level: 'L1', sheet: 3, column: 'B' },
  { level: 'L2', sheet: 4, column: 'B' },
  { level: 'L3', sheet: 5, column: 'A' },
  { level: 'L4', sheet: 6, column: 'A' },
  { level: 'L5', sheet: 7, column: 'A' },
]

/** Unihan 글자 하나 → 번체 후보 목록. 후보가 없으면(이미 번체거나 무관자) 그 글자 자신 */
async function traditionalVariants(): Promise<Map<string, string[]>> {
  const zip = openZip(await fetchBuffer(UNIHAN_ZIP_URL))
  const text = zip.get('Unihan_Variants.txt').toString('utf8')
  const table = new Map<string, string[]>()
  for (const line of text.split('\n')) {
    if (!line.includes('\tkTraditionalVariant\t')) continue
    const [codepoint, , values] = line.trim().split('\t')
    const char = String.fromCodePoint(parseInt(codepoint.slice(2), 16))
    const variants = [...values.matchAll(/U\+([0-9A-F]{4,6})/g)].map((m) =>
      String.fromCodePoint(parseInt(m[1], 16)),
    )
    if (variants.length) table.set(char, variants)
  }
  return table
}

/** 八千詞表. 표제어(번체) → TOCFL 등급 + 표제어 집합(후보 검증용) */
async function tocflWordList(): Promise<{ levelOf: Map<string, TocflLevel>; headwords: Set<string> }> {
  const outer = openZip(await fetchBuffer(TOCFL_ZIP_URL))
  // 폰트 4개와 xlsx 하나가 中文 폴더 이름 아래 있다. 정확한 폴더명을 하드코딩하지 않고 찾는다
  const inner = openZip(outer.get(outer.find(/\.xlsx$/)))
  const ss = sharedStringsOf(inner)
  const levelOf = new Map<string, TocflLevel>()
  const headwords = new Set<string>()
  for (const { level, sheet, column } of TOCFL_LEVELS) {
    for (const row of xlsxSheet(inner, `xl/worksheets/sheet${sheet}.xml`, ss).slice(1)) {
      const cell = (row[column] ?? '').trim()
      if (!cell) continue
      // `剎(ㄕㄚ)車/煞車`처럼 주음이 괄호로 섞인 자리가 있다. 갈래마다 지운다
      for (const term of cell.split('/')) {
        const word = term.replace(/\(.*?\)/g, '').trim()
        if (!word) continue
        headwords.add(word)
        levelOf.set(word, level)
      }
    }
  }
  return { levelOf, headwords }
}

/** 三等七級詞語表. 표제어(번체) 집합만 쓴다 — 후보 검증용 */
async function naerHeadwords(): Promise<Set<string>> {
  const zip = openZip(await fetchBuffer(NAER_XLSX_URL))
  const ss = sharedStringsOf(zip)
  const rows = xlsxSheet(zip, 'xl/worksheets/sheet1.xml', ss).slice(1)
  return new Set(rows.map((r) => (r.B ?? '').trim()).filter(Boolean))
}

/** 簡編本. 표제어(번체) 집합. zip 안에 xlsx 하나뿐이다 */
async function concisedHeadwords(): Promise<Set<string>> {
  const outer = openZip(await fetchBuffer(CONCISED_ZIP_URL))
  const inner = openZip(outer.get(outer.find(/\.xlsx$/)))
  const ss = sharedStringsOf(inner)
  const rows = xlsxSheet(inner, 'xl/worksheets/sheet1.xml', ss).slice(1)
  return new Set(rows.map((r) => (r.A ?? '').trim()).filter(Boolean))
}

/** 重編修訂本. 표제어(번체) 집합. 후보가 갈릴 때 최장 일치 분절에 쓴다 */
async function revisedHeadwords(): Promise<Set<string>> {
  const outer = openZip(await fetchBuffer(REVISED_ZIP_URL))
  const inner = openZip(outer.get(outer.find(/^dict_revised.*\.xlsx$/)))
  const ss = sharedStringsOf(inner)
  const rows = xlsxSheet(inner, 'xl/worksheets/sheet1.xml', ss).slice(1)
  return new Set(rows.map((r) => (r.A ?? '').trim()).filter(Boolean))
}

/**
 * 兩岸常用詞語對照表. 注音 첫소리(ㄅ~ㄩ) 28묶음으로 나뉘어 있어 한 번에 못 받는다
 * — 묶음마다 다시 요청해 모은다. 大陸語詞는 `／`로 여러 표기를 묶어 낸다.
 */
async function crossStraitTable(): Promise<Map<string, string>> {
  const groups = [
    'ㄅ', 'ㄆ', 'ㄇ', 'ㄈ', 'ㄉ', 'ㄊ', 'ㄋ', 'ㄌ', 'ㄍ', 'ㄎ', 'ㄏ', 'ㄐ', 'ㄑ', 'ㄒ',
    'ㄓ', 'ㄔ', 'ㄕ', 'ㄖ', 'ㄗ', 'ㄘ', 'ㄙ', 'ㄚ', 'ㄞ', 'ㄡ', 'ㄢ', 'ㄧ', 'ㄨ', 'ㄩ',
  ]
  const table = new Map<string, string>()
  for (const group of groups) {
    const url = CROSS_STRAIT_URL.replace('{SN}', encodeURIComponent(group))
    const html = await (await fetch(url, { headers: UA })).text()
    const body = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
    // "臺灣語詞 大陸語詞" 다음부터 "1/1" 앞까지가 표다. 줄마다 注音 · 대만어 · 대륙어 세 토막이다
    const start = body.indexOf('臺灣語詞 大陸語詞')
    const end = body.indexOf('回頂端', start)
    if (start < 0) continue
    // 표 앞에 "지금 고른 索引" 표시로 그룹 글자가 한 번 더 찍혀 나온다(ㄅ ㄅ 巴金森氏症…) —
    // 그대로 자르면 첫 줄이 한 칸씩 밀린다. 그 한 글자를 떼고서 자른다
    const rows = body
      .slice(start + '臺灣語詞 大陸語詞'.length, end < 0 ? undefined : end)
      .trim()
      .replace(new RegExp(`^${group}\\s+`), '')
    for (const m of rows.matchAll(new RegExp(`${group}\\s+(\\S+)\\s+(\\S+(?:／\\S+)*)`, 'g'))) {
      const [, tw, cn] = m
      for (const word of cn.split('／')) if (word && word !== tw && !table.has(word)) table.set(word, tw)
    }
  }
  return table
}

/* ── 후보 생성·해소 ──────────────────────────────────────────────────── */

/** 간체 낱말의 번체 후보 전부. 글자마다 후보를 곱한다 */
function candidatesOf(term: string, variants: Map<string, string[]>): string[] {
  let acc = ['']
  for (const ch of term) {
    const options = variants.get(ch) ?? [ch]
    acc = acc.flatMap((prefix) => options.map((option) => prefix + option))
    if (acc.length > 4096) break // 병리적인 경우를 막는 상한. 실제 낱말 길이에서는 닿지 않는다
  }
  return [...new Set(acc)]
}

/** s가 dict의 표제어들로 빈틈없이 나뉘는가. 1글자 조각은 hanSet에도 있어야 한다(조사·허사 방지) */
function segmentable(s: string, dict: Set<string>, single: Set<string>): boolean {
  const n = s.length
  const reachable = new Array(n + 1).fill(false)
  reachable[0] = true
  for (let i = 1; i <= n; i += 1) {
    for (let j = Math.max(0, i - 8); j < i; j += 1) {
      if (!reachable[j]) continue
      const piece = s.slice(j, i)
      if (piece.length === 1 ? single.has(piece) : dict.has(piece)) {
        reachable[i] = true
        break
      }
    }
  }
  return reachable[n]
}

/** 重編 표제어 최장 일치 점수. 길게 끊길수록 점수가 크다(제곱합) */
function longestMatchScore(s: string, dict: Set<string>): number {
  const n = s.length
  const score = new Array(n + 1).fill(-1)
  score[0] = 0
  for (let i = 1; i <= n; i += 1) {
    for (let j = Math.max(0, i - 8); j < i; j += 1) {
      if (score[j] < 0) continue
      const piece = s.slice(j, i)
      if (dict.has(piece)) {
        const candidate = score[j] + piece.length ** 2
        if (candidate > score[i]) score[i] = candidate
      }
    }
  }
  return score[n]
}

type Resolution = { traditional: string; how: string } | { candidates: string[] }

function resolve(
  term: string,
  sources: {
    variants: Map<string, string[]>
    official: Set<string>
    revised: Set<string>
    hanSet: Set<string>
    crossStrait: Map<string, string>
  },
): Resolution {
  const cs = candidatesOf(term, sources.variants)
  const apply = (picked: string, how: string): Resolution => ({
    traditional: sources.crossStrait.get(picked) ?? picked,
    how,
  })

  const inOfficial = cs.filter((c) => sources.official.has(c))
  if (inOfficial.length === 1) return apply(inOfficial[0], '공식 표제어')
  if (cs.length === 1) return apply(cs[0], '후보 하나')

  const segmentableOnes = cs.filter((c) => segmentable(c, sources.official, sources.hanSet))
  if (segmentableOnes.length === 1) return apply(segmentableOnes[0], '분절 유일')

  const scored = cs.map((c) => [c, longestMatchScore(c, sources.revised)] as const)
  const best = Math.max(-1, ...scored.map(([, s]) => s))
  const winners = best >= 0 ? scored.filter(([, s]) => s === best).map(([c]) => c) : []
  if (winners.length === 1) return apply(winners[0], '重編 최장일치')

  const shown = inOfficial.length > 1 ? inOfficial : segmentableOnes.length ? segmentableOnes : cs
  return { candidates: shown.slice(0, 6) }
}

/**
 * 여섯 자료로도 안 갈린 95곳. 사람이 중국어를 몰라도 되는 자리다 — 重編國語辭典의
 * 표제어 釋義(뜻풀이)를 직접 찾아 확인했다. 후보 목록 밖의 글자를 쓴 자리도 있다
 * (`乾淨`의 淨, `雙槓`의 槓, `迴紋針`의 紋) — Unihan이 놓친 변체이거나 애초에
 * 원문과 다른 낱말이 대만 표준이라, 표제어로 다시 확인해 그대로 썼다.
 *
 * 자리마다 근거:
 *   板/闆   闆은 오직 「老闆」뿐이다 — 나머지는 전부 板
 *   台/臺/檯/颱  臺=무대·받침대·공공 설비, 檯=책상형 기물, 颱=오직 颱風
 *   发/髮/發  머리카락 뜻일 때만 髮
 *   干/乾/幹  마르다=乾, 나머지 뜻은 그대로 두거나(干涉 등) 幹
 *   系/係/繫  묶다·매다·잠그다 동작은 繫
 *   表/錶   錶는 「몸에 지니는 계시기」뿐이다(手錶) — 문서·계기판은 表
 *   卷/捲   두루마리(명사)는 卷, "말다" 동작에서 온 말은 捲
 *   杆/桿   막대 도구(레버·채)는 桿
 * 나머지는 낱말별로 重編·簡編 표제어를 찾아 확인했다.
 */
const MANUAL: Record<string, string> = {
  'action.json:paint': '塗',
  'action.json:fold': '摺',
  'action.json:tie': '繫',
  'action.json:borrow': '借',
  'action.json:spill': '灑',
  'action.json:lend': '借出',
  'action.json:drain': '瀝乾',
  'body.json:medicine': '藥',
  'body.json:pharmacy': '藥店',
  'body.json:cotton-swab': '棉籤',
  'city.json:pharmacy-cross': '藥店標誌',
  'city.json:playground-swing': '鞦韆',
  'city.json:drinking-fountain': '飲水臺',
  'clothes.json:headband': '髮箍',
  'clothes.json:hem': '下襬',
  'clothes.json:fabric-roll': '布卷',
  'clothes.json:ironing-board': '熨衣板',
  'everyday.json:smart-watch': '智能手錶',
  'everyday.json:hair-tie': '髮圈',
  'everyday.json:desk-fan': '檯式風扇',
  'everyday.json:desktop': '檯式電腦',
  'everyday.json:pill-organizer': '藥盒',
  'family.json:guest-book': '來賓簽名簿',
  'family.json:changing-table': '尿布檯',
  'food.json:pasta': '意大利麵',
  'food.json:cutting-board': '菜板',
  'food.json:homemade': '自製',
  'food.json:skewer': '串籤',
  'food.json:ginger': '薑',
  'home.json:curtain': '窗簾',
  'home.json:rack': '掛衣桿',
  'home.json:extension-cord': '插線板',
  'home.json:shower-curtain': '浴簾',
  'home.json:watering-can': '灑水壺',
  'home.json:curtain-rod': '窗簾桿',
  'job.json:baker': '麵包師',
  'job.json:potter': '陶藝家',
  'job.json:archaeologist': '考古學家',
  'job.json:vise': '檯鉗',
  'nature.json:cloud': '雲',
  'nature.json:hurricane': '颱風',
  'number.json:centimeter': '厘米',
  'number.json:gram': '克',
  'number.json:thousand': '一千',
  'number.json:odometer': '里程表',
  'number.json:micrometer': '千分尺',
  'number.json:speedometer': '車速表',
  'number.json:pressure-gauge': '壓力表',
  'office.json:clipboard': '寫字板',
  'office.json:itinerary': '行程表',
  'office.json:confirmation': '確認單',
  'office.json:timesheet': '考勤表',
  'office.json:payroll': '工資表',
  'quality.json:dry': '乾',
  'quality.json:clean': '乾淨',
  'quality.json:dirty': '髒',
  'quality.json:tired': '累',
  'quality.json:sleepy': '睏',
  'quality.json:salty': '鹹',
  'quality.json:cloudy': '多雲',
  'quality.json:loose': '鬆',
  'quality.json:windy': '颳風',
  'quality.json:folded': '摺疊',
  'quality.json:rolled': '捲起的',
  'quality.json:laced': '繫帶的',
  'quality.json:pickled': '腌製的',
  'school.json:sharpener': '卷筆刀',
  'school.json:marker': '馬克筆',
  'school.json:paperclip': '迴紋針',
  'school.json:periodic-chart': '元素表',
  'sport.json:saxophone': '薩克斯',
  'sport.json:shin-guard': '護腿板',
  'sport.json:skipping-timer': '比賽計時鐘',
  'sport.json:podium-stand': '領獎臺',
  'sport.json:rowing-machine': '划船機',
  'sport.json:chess-clock': '棋鐘',
  'sport.json:surf-wax': '衝浪蠟',
  'sport.json:kickboard': '浮板',
  'sport.json:kayak': '皮划艇',
  'sport.json:golf-club': '高爾夫球桿',
  'sport.json:parallel-bars': '雙槓',
  'sport.json:high-jump-bar': '跳高橫桿',
  'time.json:cuckoo-clock': '布穀鳥鐘',
  'time.json:water-clock': '水鐘',
  'time.json:advent-calendar': '降臨節日曆',
  'time.json:clock': '鐘',
  'time.json:wristwatch': '手錶',
  'transport.json:gear-shift': '變速桿',
  'transport.json:dashboard': '儀表盤',
  'transport.json:fasten-belt': '繫上',
  'transport.json:fuel-gauge': '油量表',
  'travel.json:surfboard': '衝浪板',
  'travel.json:check-in-counter': '值機櫃檯',
  'travel.json:tray-table': '小桌板',
  'travel.json:diving-mask': '潛水面鏡',
  'travel.json:selfie-stick': '自拍桿',
  'travel.json:paddleboard': '槳板',
}

/* ── 실행 ──────────────────────────────────────────────────────────── */

console.log('공식 자료 여섯을 내려받습니다 (수십 MB — 시간이 걸립니다)…')
const [variants, tocfl, naer, concised, revised, crossStrait] = await Promise.all([
  traditionalVariants(),
  tocflWordList(),
  naerHeadwords(),
  concisedHeadwords(),
  revisedHeadwords(),
  crossStraitTable(),
])
const official = new Set([...tocfl.headwords, ...naer, ...concised])
// 漢字表가 없어도 된다 — 1글자 조각 검증은 簡編本(단자도 표제어로 싣는다)으로 충분하다
const hanSet = concised

console.log(
  `八千詞表 ${tocfl.headwords.size} · 國教院 ${naer.size} · 簡編本 ${concised.size} · ` +
    `重編 ${revised.size} · 兩岸表 ${crossStrait.size} · Unihan ${variants.size}자\n`,
)

const only = process.argv[2]
const files = readdirSync('content')
  .filter((f) => f.endsWith('.json'))
  .filter((f) => !only || f === `${only}.json`)
  .sort()

if (files.length === 0) {
  console.error(`\ncontent/${only}.json 이 없습니다.\n`)
  process.exit(1)
}

let totalResolved = 0
let totalTocfl = 0
const how: Record<string, number> = {}
const unresolved: { file: string; slug: string; zh: string; candidates: string[] }[] = []

for (const file of files) {
  const path = `content/${file}`
  const data = JSON.parse(readFileSync(path, 'utf8')) as { concepts: Concept[] }
  let words = 0
  let resolved = 0
  let leveled = 0

  for (const concept of data.concepts ?? []) {
    // scene(표현 덱, 문장)은 건너뛴다 — TOCFL 등급은 낱말 시험이라 문장 전체에는
    // 안 붙고, 글자마다 후보를 곱하면 문장 길이만큼 부풀어 진짜 갈리는 자리를
    // 파묻는다(了 하나가 문장마다 了/瞭 "미확정"을 찍어낸다)
    if (concept.category === 'scene') continue
    const word = concept.words.zh
    if (!word) continue
    words += 1

    const result = resolve(word.term, { variants, official, revised, hanSet, crossStrait })
    let picked: string
    let pickedHow: string
    if ('candidates' in result) {
      const manual = MANUAL[`${file}:${concept.slug}`]
      if (!manual) {
        unresolved.push({ file, slug: concept.slug, zh: word.term, candidates: result.candidates })
        continue
      }
      picked = manual
      pickedHow = '표제어 확인'
    } else {
      picked = result.traditional
      pickedHow = result.how
    }

    word.traditional = picked
    resolved += 1
    how[pickedHow] = (how[pickedHow] ?? 0) + 1

    const level = tocfl.levelOf.get(picked)
    const attributes = (word.attributes ?? {}) as Record<string, unknown>
    if (level) {
      attributes.tocfl = level
      leveled += 1
    } else delete attributes.tocfl
    if (Object.keys(attributes).length > 0) word.attributes = attributes as typeof word.attributes
    else delete word.attributes
  }

  writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
  totalResolved += resolved
  totalTocfl += leveled
  console.log(`${file.replace('.json', '').padEnd(10)} 번체 ${resolved}/${words} · TOCFL ${leveled}/${words}`)
}

console.log(`\n번체 확정 ${totalResolved}건 (${Object.entries(how).map(([k, v]) => `${k} ${v}`).join(' · ')})`)
console.log(`TOCFL 등급 ${totalTocfl}건 · 미확정 ${unresolved.length}건`)
if (unresolved.length) {
  console.log('\n미확정 — 후보가 갈려 사람이 고를 자리입니다:\n')
  for (const u of unresolved) console.log(`  ${u.file} ${u.slug.padEnd(20)} ${u.zh} → ${u.candidates.join(' / ')}`)
}
