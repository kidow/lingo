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
import { gunzipSync, inflateRawSync } from 'node:zlib'
import { cachedBytes } from './cache.ts'
import type { Concept, Example } from '../lib/types.ts'

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
  'city.json:shop-counter': '櫃檯',
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
  'job.json:lever': '槓桿',
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

  /*
   * 2차 회차(2026-09-08). 위와 같은 자리 아흔셋 — 여섯 자료가 후보를 둘 이상
   * 남긴 곳이다. 고른 값은 모두 스크립트가 인쇄한 후보 목록 안에 있다.
   * 갈린 글자는 위 규칙이 그대로 덮는다: 髮(머리카락)·錶(몸에 지니는 계시기)·
   * 檯(책상형 기물)·捲(마는 동작)·桿/杠(막대 도구)·閒(한가하다)·闆(老闆).
   */
  'action.json:send-by-post': '寄出',
  'action.json:idle': '閒著',
  'action.json:drag-out': '拖出',
  'action.json:get-dirty': '變髒',
  'body.json:tongue-depressor': '壓舌板',
  'body.json:blood-test-tube': '採血管',
  'body.json:operating-table': '手術檯',
  'clothes.json:hair-comb-clip': '髮梳夾',
  'clothes.json:veil-netting': '面紗網',
  'clothes.json:blind-hem': '暗繰邊',
  'everyday.json:string-ball': '線團',
  'everyday.json:wooden-skewer': '竹籤',
  'everyday.json:leisure': '閒暇',
  'family.json:baby-brush': '嬰兒髮刷',
  'family.json:chore-chart': '家務表',
  'family.json:pal': '夥伴',
  'family.json:regiment': '團',
  'food.json:ring-bread': '環形麵包',
  'food.json:kvass': '克瓦斯',
  'food.json:roll-cake': '蛋糕捲',
  'food.json:wheat-vermicelli': '細麵',
  'food.json:bread-loaf': '一整塊麵包',
  'food.json:white-roll': '白麵包捲',
  'home.json:air-purifier': '空氣凈化器',
  'home.json:hinge': '合頁',
  'home.json:art-print': '複製畫',
  'job.json:geologist': '地質學家',
  'job.json:astronomer': '天文學家',
  'job.json:composer': '作曲家',
  'job.json:botanist': '植物學家',
  'job.json:pianist': '鋼琴家',
  'job.json:violinist': '小提琴家',
  'job.json:mountaineer': '登山家',
  'job.json:physicist': '物理學家',
  'job.json:economist': '經濟學家',
  'job.json:historian': '歷史學家',
  'job.json:mathematician': '數學家',
  'job.json:biologist': '生物學家',
  'job.json:geographer': '地理學家',
  'job.json:psychologist': '心理學家',
  'job.json:dean': '系主任',
  'job.json:philologist': '語文學家',
  'job.json:public-figure': '活動家',
  'job.json:critic': '評論家',
  'job.json:geneticist': '遺傳學家',
  'job.json:boss': '老闆',
  'job.json:manual-work': '幹活兒',
  'nature.json:draw-near': '划近',
  'number.json:dial-gauge': '千分錶',
  'number.json:data-point': '數據點',
  'number.json:tally-chart': '計數表',
  'number.json:times-table-grid': '乘法表',
  'number.json:place-value-chart': '數位表',
  'number.json:lever-arm': '杠桿臂',
  'office.json:recommend': '舉薦',
  'quality.json:made-of-iron': '鐵製的',
  'quality.json:modest-plain': '樸素的',
  'quality.json:grey-haired': '白髮的',
  'quality.json:bearded': '有鬍子',
  'quality.json:red-haired': '紅髮',
  'quality.json:steel': '鋼製',
  'quality.json:differently': '各不相同',
  'school.json:homework-diary': '家校聯絡本',
  'school.json:faculty-department': '院系',
  'school.json:ensemble-group': '合奏團',
  'sport.json:medicine-ball': '藥球',
  'sport.json:pull-up-bar': '單杠',
  'sport.json:backboard': '籃板',
  'sport.json:hockey-stick': '冰球桿',
  'sport.json:diving-board': '跳水板',
  'sport.json:home-plate': '本壘板',
  'sport.json:jury-panel': '評審團',
  'time.json:candle-clock': '蠟燭鐘',
  'time.json:incense-clock': '香鐘',
  'time.json:balance-wheel': '擺輪',
  'time.json:watch-winder': '搖錶器',
  'time.json:station-clock': '車站大鐘',
  'time.json:shift-rota': '排班表',
  'time.json:tide-table': '潮汐表',
  'time.json:wall-planner': '年度計劃表',
  'time.json:church-clock': '教堂大鐘',
  'time.json:pill-organiser': '分格藥盒',
  'time.json:pendulum-bob': '擺錘',
  'time.json:ship-bell': '船鐘',
  'time.json:tide-clock': '潮汐鐘',
  'time.json:timer-knob': '定時旋鈕',
  'time.json:curfew-bell': '宵禁鐘',
  'time.json:opening-bell': '開盤鐘',
  'time.json:week-planner': '周計劃表',
  'transport.json:indicator-light': '轉向燈',
  'transport.json:windscreen-wiper-blade': '雨刮片',
  'travel.json:shuttle-stop': '擺渡車站點',
  'travel.json:beach-shower': '戶外沖淋器',
  /* 4차. 두루마리(명사)는 卷이다 — 머리말의 卷/捲 규칙 그대로 */
  'home.json:paper-scroll': '卷',
  /*
   * 兩岸 표를 되돌리는 자리. `水平`은 대만에서도 「수평의」로 그대로 쓰고,
   * 표가 갈아 끼우는 `水準`은 「수준·기준」이라 이 개념의 뜻이 아니다.
   */
  'quality.json:horizontal': '水平',

  /*
   * 3차. 2차 뒤에 들어온 낱말 일곱.
   *   取回   回=되돌아옴. 迴는 빙 도는 것뿐이다
   *   出拳   齣은 희곡을 세는 단위뿐이다
   *   繫泊   묶어 매는 동작 → 繫 (위 규칙 그대로)
   *   噁心   메스껍다는 噁. 惡心은 나쁜 마음이다
   *   剪頭髮 머리카락 → 髮
   *   社會學家 傢는 傢俱·傢伙뿐. 사람 이름표는 家
   *   有劃痕的 긁어 낸 자국은 劃(huá, 劃破). 划는 노를 젓는 쪽이다
   */
  'action.json:retrieve': '取回',
  'action.json:punch': '出拳',
  'action.json:moor': '繫泊',
  'body.json:feel-sick': '噁心',
  'body.json:get-a-haircut': '剪頭髮',
  'job.json:sociologist': '社會學家',
  'quality.json:scratched': '有劃痕的',
}

/* ── 예문 번체 ─────────────────────────────────────────────────────── */

/**
 * 예문을 번체로도 적는다. TOCFL 카드가 그쪽을 본다 (lib/entries.ts).
 *
 * 정답만 번체로 두면 예문은 간체로 남아 정답 문자열이 문장에 없다 — 번체가
 * 간체와 다른 낱말 1,076개가 예외 없이 문맥 카드를 잃었다
 * (docs/tocfl-cloze-gap.md). 대만 시험 트랙에 간체 문장을 보여 주는 것 자체도
 * 틀렸으므로, 문맥 카드는 그 결과지 이유가 아니다.
 *
 * **글자가 아니라 낱말로 옮긴다.** 글자 단위로는 한자 1,894자 중 372자가
 * 갈리고 그중 `了`가 예문에 972번 나온다 — 문장마다 미확정이 찍힌다. 낱말로
 * 분절하면 조각 18,895개 중 갈리는 것이 2,593개(13.7%)로 줄고, 그 13.7%가
 * `了`·`是`·`里`·`着`·`个` 같은 짧은 목록에 몰린다. 그 목록만 손으로 정한다.
 *
 * 분절은 CC-CEDICT(CC BY-SA 4.0)의 간체 표제어로 최장일치한다. 조각마다
 * 낱말 대조와 **같은 `resolve()`**를 태우므로 판정 근거가 낱말 쪽과 하나다.
 */
async function cedictSimplified(): Promise<Set<string>> {
  const bytes = await cachedBytes('cedict.txt', async () => {
    const gz = await fetchBuffer('https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz')
    return Buffer.from(gunzipSync(gz))
  })
  const words = new Set<string>()
  for (const line of bytes.toString('utf8').split('\n')) {
    if (!line || line.startsWith('#')) continue
    const at = line.indexOf(' ')
    const to = line.indexOf(' ', at + 1)
    if (at < 0 || to < 0) continue
    const simplified = line.slice(at + 1, to)
    if (HAN_ONLY.test(simplified)) words.add(simplified)
  }
  return words
}

const HAN_ONLY = /^[\u4e00-\u9fff]+$/
const HAN = /[\u4e00-\u9fff]/

/**
 * 여섯 자료로도 안 갈린 조각. 낱말 쪽 `MANUAL`과 같은 성격이고 열쇠만 다르다 —
 * 저쪽은 자리(`파일:슬러그`)로, 이쪽은 **조각 자체**로 잡는다. 같은 조각은
 * 문장이 달라도 같은 번체를 쓰기 때문이다.
 */
const SEGMENT: Record<string, string> = {
  /*
   * 판정 근거는 **예문에 실제로 쓰인 문맥**이다. 조각마다 그 조각이 든 문장을
   * 다 뽑아 보고 다수를 따랐다. 뜻이 갈리는 짝은 tocfl.ts 머리말의 규칙과
   * 같다 — 아래는 그 규칙이 예문에서 어떻게 갈렸는지다.
   *
   *   了   瞭는 瞭解·瞭望뿐이고 예문에는 없다
   *   里   전부 자리를 가리킨다(這裡·屋裡·水裡). 公里·鄰里는 낱말로 먼저 걸린다
   *   只   只能·只好·只要가 다수다. 一隻은 「一只」가 낱말로 먼저 걸린다
   *   干   未乾·擠乾·乾枯·乾淨처럼 마르다·깨끗하다뿐이다
   *   面   낱말로 안 걸린 자리는 前面·後面·下面이라 麵이 아니다
   *   发   出發·打發·發燒가 다수다. 頭髮은 「头发」가 낱말로 먼저 걸린다
   *   脏   髒水·很髒이고 心臟은 「心脏」이 낱말로 먼저 걸린다
   *   台   臺上·電臺·臺階·이 대다수다. 櫃檯·工作檯는 낱말로 잡았다
   *   杆   欄杆·桅杆은 낱말로 걸리고, 남은 것은 橫桿·這根桿이다
   */
  了: '了', 里: '裡', 只: '只', 后: '後', 才: '才', 干: '乾', 别: '別', 面: '面',
  家: '家', 钟: '鐘', 签: '簽', 发: '發', 借: '借', 向: '向', 出: '出', 摆: '擺',
  台: '臺', 洒: '灑', 药: '藥', 累: '累', 坏: '壞', 云: '雲', 涂: '塗', 脏: '髒',
  回: '回', 于: '於', 杆: '桿', 松: '鬆', 蜡: '蠟',
  到了: '到了', 为了: '為了', 成了: '成了', 看得出: '看得出',
  干净: '乾淨', 伙伴: '夥伴', 柜台: '櫃檯', 老板: '老闆', 手表: '手錶',
  在台: '在臺', 后排: '後排',

  /*
   * 2차. 위를 넣고 98.1%가 된 뒤 남은 57종이다 — 전부 두 번 이하로 나온다.
   * 대부분 위에서 정한 글자가 든 긴 낱말이라 판정이 같고, 갈리는 것만 적는다.
   *
   *   冲   沖坏·沖走처럼 씻어 내는 쪽이다. 衝은 衝擊·衝突에만 붙였다
   *   系   「腰上繫皮帶」 하나뿐이라 매는 동작이다. 體系·關係는 낱말로 걸린다
   *   准   標準·準備·準時이 다수다. 批准은 낱말로 먼저 걸린다
   *   团   麵糰은 낱말로 걸리고, 남은 것은 團聚·團隊라 團이다
   *   折   打折·折斷이라 摺이 아니다
   */
  冲: '沖', 团: '團', 系: '繫', 折: '折', 板: '板', 合: '合', 秋: '秋',
  克: '克', 冬: '冬', 准: '準', 筑: '築', 当: '當', 咸: '鹹', 几: '幾',
  擦干: '擦乾', 查出: '查出', 准备好了: '準備好了', 下发: '下發', 借给: '借給',
  里加: '裡加', 哪里: '哪裡', 摆满: '擺滿', 台风: '颱風', 回复: '回覆',
  买家: '買家', 湖里: '湖裡', 好几: '好幾', 药店: '藥店', 有助于: '有助於',
  脏水: '髒水', 裙摆: '裙襬', 家长会: '家長會', 又来了: '又來了', 入冬: '入冬',
  冲击: '衝擊', 战后: '戰後', 几年: '幾年', 借出: '借出', 迟了: '遲了',
  手里: '手裡', 里带: '裡帶', 坏掉: '壞掉', 浮出水面: '浮出水面', 喷出: '噴出',
  窗帘: '窗簾', 长出: '長出', 冲走: '沖走', 十克: '十克', 找出: '找出',
  寄出: '寄出', 数出: '數出', 选出: '選出', 得出: '得出',
  刮风: '颳風', 在后: '在後', 派出: '派出',

  /*
   * 3차. 검사가 잡아 준 다섯. 낱말 쪽 번체가 문장에 안 들어간 자리다.
   *
   * 앞 둘은 내가 정한 기본값이 긴 낱말을 덮어 쓴 것이다 — 分節이 头/发로
   * 갈리면 發가 붙어 頭發가 된다. 긴 쪽을 표에 올려 먼저 걸리게 한다.
   * 뒤 셋은 글자가 아니라 **낱말이 다른** 자리다(兩岸 어휘). 낱말 대조는
   * crossStrait으로 갈아 끼우는데 문장은 分節이 길어져 그 표를 비켜 갔다.
   */
  头发: '頭髮', 心脏: '心臟', 擦干净: '擦乾淨', 短视频: '短影片', 乒乓球台: '桌球檯',
  卷: '卷', 卷起: '捲起',
  /* 兩岸 표가 문장 안에서도 갈아 끼운다. 이 낱말은 대만에서도 水平이다 */
  水平: '水平',

  /*
   * 4차. 세션이 다 멈춘 뒤 남은 콘텐츠를 한 번에 돌리며 나온 셋.
   *
   *   困    困住·困難이라 갇히다·어렵다 쪽이다. 睏은 졸리다뿐이다
   *   摔壞  坏은 壞다
   *   出具  分節이 잘못 잡은 자리다 — 「請給出具體的方案」은 給出/具體로
   *         끊어야 하는데 出具를 먼저 집었다. 다만 두 글자 다 번체가 같아
   *         결과는 어느 쪽으로 끊든 出具이므로 그대로 박아 둔다
   */
  困: '困', 摔坏: '摔壞', 出具: '出具',
}

/**
 * 미리 박을 조각. **두 글자 이상만 박는다.**
 *
 * 한 글자짜리는 사전이 못 자른 자리를 받는 기본값이지 자리를 주장하는 값이
 * 아니다. 박아 버리면 그 글자가 든 긴 낱말을 통째로 깬다 — `发`를 박으면
 * `发型`이 `发`와 `型`으로 갈려 `髮型`이 `發型`이 되고, `面`을 박으면
 * `面包`가 `麵包`가 못 된다. 긴 것부터 박는 것은 표끼리의 순서다.
 */
const PINNED = Object.keys(SEGMENT)
  .filter((key) => key.length >= 2)
  .sort((a, b) => b.length - a.length)

/**
 * 최장일치로 자른다. 한자가 아닌 것은 한 글자씩 그대로 흘린다.
 *
 * **표에 올린 조각을 먼저 박는다.** 왼쪽부터 최장일치만 하면 사전이 더 긴
 * 엉뚱한 낱말을 집어 표가 무력해진다 — `她把头发剪短了`에서 `把头`(십장)가
 * 먼저 걸려 `头发`가 `头`와 `发`로 쪼개지고 `頭發`가 나왔다. `后心`이 `心脏`을,
 * `擦干`이 `擦干净`을 같은 식으로 잘랐다. 표는 사람이 정한 값이므로 사전보다
 * 세다 — 문장 전체에서 자리를 먼저 잡고, 남은 틈만 사전으로 자른다.
 */
function segments(text: string, dict: Set<string>, maxLen: number): string[] {
  const pinned = new Array<string | null>(text.length).fill(null)
  const taken = new Array<boolean>(text.length).fill(false)
  for (const key of PINNED) {
    for (let at = text.indexOf(key); at >= 0; at = text.indexOf(key, at + 1)) {
      let free = true
      for (let i = at; i < at + key.length; i += 1) if (taken[i]) free = false
      if (!free) continue
      pinned[at] = key
      for (let i = at; i < at + key.length; i += 1) taken[i] = true
    }
  }

  const out: string[] = []
  for (let at = 0; at < text.length; ) {
    const pin = pinned[at]
    if (pin) {
      out.push(pin)
      at += pin.length
      continue
    }
    if (!HAN.test(text[at]!)) {
      out.push(text[at]!)
      at += 1
      continue
    }
    let hit = text[at]!
    // 박아 둔 자리를 넘어서는 후보는 안 본다 — 넘으면 표를 다시 잘라먹는다
    let room = 1
    while (at + room < text.length && !taken[at + room]) room += 1
    for (let len = Math.min(maxLen, room); len >= 2; len -= 1) {
      const piece = text.slice(at, at + len)
      if (dict.has(piece)) {
        hit = piece
        break
      }
    }
    out.push(hit)
    at += hit.length
  }
  return out
}

/** 문장 하나. 조각 하나라도 못 갈리면 null이다 — 반만 번체인 문장은 안 만든다 */
function traditionalSentence(
  text: string,
  dict: Set<string>,
  maxLen: number,
  sources: Parameters<typeof resolve>[1],
  stuck: Map<string, number>,
): string | null {
  let out = ''
  let ok = true
  for (const piece of segments(text, dict, maxLen)) {
    if (!HAN.test(piece)) {
      out += piece
      continue
    }
    const manual = SEGMENT[piece]
    if (manual) {
      out += manual
      continue
    }
    const result = resolve(piece, sources)
    if ('candidates' in result) {
      stuck.set(piece, (stuck.get(piece) ?? 0) + 1)
      ok = false
      continue
    }
    out += result.traditional
  }
  return ok ? out : null
}

const examplesOfWord = (word: { example?: Example; examples?: Example[] }): Example[] =>
  word.examples?.length ? word.examples : word.example ? [word.example] : []

/* ── 실행 ──────────────────────────────────────────────────────────── */

console.log('공식 자료 여섯을 내려받습니다 (수십 MB — 시간이 걸립니다)…')
const [variants, tocfl, naer, concised, revised, crossStrait, cedict] = await Promise.all([
  traditionalVariants(),
  tocflWordList(),
  naerHeadwords(),
  concisedHeadwords(),
  revisedHeadwords(),
  crossStraitTable(),
  cedictSimplified(),
])
/**
 * 최장일치의 상한. CC-CEDICT에는 스무 자가 넘는 성어·고유명사도 있는데 예문은
 * 짧아서 걸릴 일이 없고, 상한이 길수록 조각마다 헛도는 회차만 는다.
 */
const CEDICT_MAX = 8
/** 갈리지 않아 못 옮긴 조각. 빈도순으로 찍어 SEGMENT에 올릴 것을 고른다 */
const stuckSegments = new Map<string, number>()
let sentences = 0
let converted = 0
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

    /*
     * **손으로 적은 값이 먼저다.** 예전에는 여섯 자료가 갈리지 못했을 때만
     * 봤는데, 그러면 兩岸 표가 낱말을 갈아 끼우는 자리를 못 되돌린다 —
     * `水平`(수평의)이 「수준·기준」 뜻의 `水準`으로 바뀌어 예문과 어긋났다.
     * 표는 사람이 자료를 보고 정한 값이므로 자료보다 세다 (SEGMENT와 같다).
     */
    const manual = MANUAL[`${file}:${concept.slug}`]
    let picked: string
    let pickedHow: string
    if (manual) {
      picked = manual
      pickedHow = '표제어 확인'
    } else {
      const result = resolve(word.term, { variants, official, revised, hanSet, crossStrait })
      if ('candidates' in result) {
        unresolved.push({ file, slug: concept.slug, zh: word.term, candidates: result.candidates })
        continue
      }
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

    // 예문 번체는 TOCFL 등급이 붙은 낱말만 만든다 — 그 트랙만 쓰기 때문이다
    for (const example of examplesOfWord(word)) {
      if (!level) {
        delete example.traditional
        continue
      }
      sentences += 1
      const line = traditionalSentence(
        example.text,
        cedict,
        CEDICT_MAX,
        { variants, official, revised, hanSet, crossStrait },
        stuckSegments,
      )
      if (line) {
        example.traditional = line
        converted += 1
      } else delete example.traditional
    }
  }

  writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
  totalResolved += resolved
  totalTocfl += leveled
  console.log(`${file.replace('.json', '').padEnd(10)} 번체 ${resolved}/${words} · TOCFL ${leveled}/${words}`)
}

console.log(`\n번체 확정 ${totalResolved}건 (${Object.entries(how).map(([k, v]) => `${k} ${v}`).join(' · ')})`)
console.log(`TOCFL 등급 ${totalTocfl}건 · 미확정 ${unresolved.length}건`)
console.log(`예문 번체 ${converted}/${sentences}문장 (${((100 * converted) / (sentences || 1)).toFixed(1)}%)`)
if (stuckSegments.size) {
  const top = [...stuckSegments].sort((a, b) => b[1] - a[1])
  console.log(`\n안 갈린 조각 ${stuckSegments.size}종 — 잦은 순으로 SEGMENT에 올립니다:\n`)
  for (const [piece, n] of top.slice(0, 200)) {
    const result = resolve(piece, { variants, official, revised, hanSet, crossStrait })
    const shown = 'candidates' in result ? result.candidates.join(' / ') : result.traditional
    console.log(`  ${String(n).padStart(4)}회  ${piece.padEnd(6)} → ${shown}`)
  }
  if (top.length > 200) console.log(`  … 외 ${top.length - 200}종`)
}
if (unresolved.length) {
  console.log('\n미확정 — 후보가 갈려 사람이 고를 자리입니다:\n')
  for (const u of unresolved) console.log(`  ${u.file} ${u.slug.padEnd(20)} ${u.zh} → ${u.candidates.join(' / ')}`)
}
