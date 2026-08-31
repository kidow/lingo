/**
 * 시험 등급 채우기. (spec.md §7)
 *
 *   node scripts/levels.ts            콘텐츠 전체
 *   node scripts/levels.ts food       한 파일만
 *
 * 등급을 **추정하지 않는다.** 세 출처를 조회해 있는 것만 붙이고, 없으면 비운다 —
 * 비면 그 카드에 레벨 줄이 안 나온다 (§5).
 *
 *   JLPT  Jisho(JMdict). 구 출제기준 기반이라 가타카나 외래어가 빠져 있다
 *   HSK   complete-hsk-vocabulary (MIT). HSK 3.0 기준
 *   CEFR  Goethe-Institut 공식 Wortliste. 독일어만, A1~B1까지
 *   TSL   TOEIC Service List (Browne & Culligan, CC BY-SA 4.0). 등급이 아니라 순위다
 *   TORFL ros-edu.ru의 ТРКИ 어휘 최소치. A1~B2까지다 (scripts/torfl.ts)
 *
 * 스페인어·프랑스어는 채우지 않는다. Cervantes PCIC는 robots.txt가 자동 수집을
 * 막고 있고, 프랑스어는 공개된 기계 판독 목록이 없다.
 *
 * **표기가 같아도 뜻이 다르면 사람이 지운다.** 대조는 표기로만 하므로 동형어가
 * 다른 뜻의 등급을 물려받는다 — Bank(벤치/은행), Karte(지도/카드)가 그랬다.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { inflateSync } from 'node:zlib'
import { hskOf, jlptOf } from './define.ts'
import { bare, torflLevels } from './torfl.ts'
import type { Concept } from '../lib/types.ts'

/**
 * TOEIC Service List 1.2 — 1,250단어. NGSL과 합쳐 최근 TOEIC의 98.5%를 덮는다.
 *
 * ETS는 공식 어휘 목록을 내지 않는다. 시중의 "필수 1000단어"는 교재사 편집물이라
 * 공개 레포에 못 쓰지만, TSL은 TOEIC 대비 교재 150만 단어 코퍼스에서 뽑은
 * 학술 목록이고 **CC BY-SA 4.0**이라 쓸 수 있다. 출처는 spec.md §7 표에 적는다.
 *
 *   Browne, C., Culligan, B. (2013). The TOEIC Service List.
 *   www.newgeneralservicelist.com
 */
const TSL_URL = 'https://www.newgeneralservicelist.com/s/TSL_12_stats.csv'

/** 표제어 → 순위. CSV는 `Word,TSL Rank,SFI,U` 네 칸이다 */
async function tslRanks(): Promise<Map<string, number>> {
  const csv = await (await fetch(TSL_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } })).text()
  const ranks = new Map<string, number>()
  for (const row of csv.split(/\r?\n/).slice(1)) {
    const [word, rank] = row.split(',')
    if (word?.trim()) ranks.set(word.replace(/"/g, '').trim().toLowerCase(), Number(rank))
  }
  return ranks
}

const GOETHE: Array<[string, string]> = [
  ['B1', 'https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_B1_Wortliste.pdf'],
  ['A2', 'https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_A2_Wortliste.pdf'],
  ['A1', 'https://www.goethe.de/pro/relaunch/prf/de/A1_SD1_Wortliste_02.pdf'],
]

/**
 * PDF에서 낱말을 긁는다.
 *
 * PDF 도구를 설치하지 않는다. FlateDecode 스트림을 zlib으로 풀되 **BT/Tj 연산자가
 * 있는 콘텐츠 스트림만** 쓴다 — 글꼴 프로그램에는 그 연산자가 없어서 이 한 줄로
 * 바이너리가 걸러진다.
 */
async function pdfWords(url: string): Promise<string[]> {
  const buf = Buffer.from(
    await (await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })).arrayBuffer(),
  )
  let text = ''
  let i = 0
  while (true) {
    const s = buf.indexOf('stream', i)
    if (s < 0) break
    const e = buf.indexOf('endstream', s)
    if (e < 0) break
    let a = s + 6
    while (buf[a] === 0x0d || buf[a] === 0x0a) a += 1
    try {
      const chunk = inflateSync(buf.subarray(a, e)).toString('latin1')
      if (/\bBT\b/.test(chunk) && /\bT[jJ]\b/.test(chunk)) {
        for (const m of chunk.matchAll(/\((?:\\.|[^()\\])*\)/g)) {
          text += m[0]
            .slice(1, -1)
            .replace(/\\([()\\])/g, '$1')
            .replace(/\\(\d{1,3})/g, (_, o) => String.fromCharCode(parseInt(o, 8)))
        }
      }
    } catch {
      // 풀리지 않는 스트림은 콘텐츠가 아니다
    }
    i = e + 9
  }
  return text.match(/[A-ZÄÖÜ][a-zäöüß]+/g) ?? []
}

async function germanLevels(): Promise<Map<string, string>> {
  const levels = new Map<string, string>()
  // 높은 등급부터 넣어 낮은 등급이 덮어쓰게 한다
  for (const [level, url] of GOETHE) {
    for (const word of await pdfWords(url)) levels.set(word, level)
  }
  return levels
}

/**
 * 괴테 목록에 있지만 **뜻이 우리 개념과 다른** 낱말. 등급을 붙이지 않는다.
 *
 * 목록은 표제어만 있고 뜻은 예문으로만 드러난다. 표기가 같아도 같은 낱말이
 * 아니면 A1이라는 표시가 거짓말이 된다 — `die Bank`는 은행이지 벤치가 아니고,
 * `die Karte`는 승차권·카드지 지도가 아니다.
 */
const GERMAN_HOMONYMS = new Set(['Bank', 'Karte'])

const german = await germanLevels()
const tsl = await tslRanks()
const torfl = await torflLevels()
const only = process.argv[2]
const files = readdirSync('content')
  .filter((f) => f.endsWith('.json'))
  .filter((f) => !only || f === `${only}.json`)
  .sort()

if (files.length === 0) {
  console.error(`\ncontent/${only}.json 이 없습니다.\n`)
  process.exit(1)
}

for (const file of files) {
  const path = `content/${file}`
  const data = JSON.parse(readFileSync(path, 'utf8')) as { concepts: Concept[] }
  const counts = { jlpt: 0, hsk: 0, cefr: 0, tsl: 0, torfl: 0 }
  let words = { ja: 0, zh: 0, de: 0, en: 0, ru: 0 }

  for (const concept of data.concepts) {
    const apply = (
      lang: 'ja' | 'zh' | 'de' | 'en' | 'ru',
      key: 'jlpt' | 'hsk' | 'cefr' | 'tsl' | 'torfl',
      value: unknown,
    ) => {
      const word = concept.words[lang]
      if (!word) return
      words[lang] += 1
      const attributes = (word.attributes ?? {}) as Record<string, unknown>
      if (value) {
        attributes[key] = value
        counts[key] += 1
      } else {
        delete attributes[key]
      }
      if (Object.keys(attributes).length > 0) word.attributes = attributes as typeof word.attributes
      else delete word.attributes
    }

    apply('ja', 'jlpt', concept.words.ja && (await jlptOf(concept.words.ja.term)))
    apply('zh', 'hsk', concept.words.zh && (await hskOf(concept.words.zh.term)))
    const de = concept.words.de?.term
    apply('de', 'cefr', de && !GERMAN_HOMONYMS.has(de) ? german.get(de) : undefined)
    // 표기가 정확히 같을 때만 붙인다. TSL은 표제어 목록이라 `shoes`는 없고
    // `shoe`만 있는데, 복수형을 잘라 맞추면 `glasses`(안경)가 `glass`(유리컵)의
    // 순위를 물려받는다 — 독일어 Bank·Karte에서 겪은 것과 같은 함정이다
    apply('en', 'tsl', concept.words.en && tsl.get(concept.words.en.term.toLowerCase()))
    // 목록은 강세를 얹어 싣는다. 뗀 표기끼리 맞춘다 (scripts/torfl.ts)
    apply('ru', 'torfl', concept.words.ru && torfl.get(bare(concept.words.ru.term)))
  }

  writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
  console.log(
    `${file.replace('.json', '').padEnd(10)} JLPT ${counts.jlpt}/${words.ja}` +
      ` · HSK ${counts.hsk}/${words.zh} · CEFR ${counts.cefr}/${words.de}` +
      ` · TSL ${counts.tsl}/${words.en} · TORFL ${counts.torfl}/${words.ru}`,
  )
}
