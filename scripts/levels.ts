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
 *   CEFR  독일어는 Goethe-Institut 공식 Wortliste(A1~B1). 프랑스어는 FLELex/Beacco
 *         (UCLouvain CENTAL, CC BY-NC-SA 4.0) — A1~C2 여섯 등급 다 낸다
 *   TSL   TOEIC Service List (Browne & Culligan, CC BY-SA 4.0). 등급이 아니라 순위다
 *   TORFL ros-edu.ru의 ТРКИ 어휘 최소치. A1~B2까지다 (scripts/torfl.ts)
 *
 * 스페인어는 채우지 않는다. Instituto Cervantes PCIC는 `cvc.cervantes.es`가
 * robots.txt로 전체 크롤링을 막고(`Disallow: /`), 같은 계열의 ELELex(CEFRLex
 * 프로젝트)는 등급별 빈도 **분포**만 준다 — FLELex와 달리 단일 등급으로 정리한
 * 버전(Beacco)이 없어서, 등급 하나를 고르려면 우리가 추정해야 한다.
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
  // CSV가 UTF-8이 아니다. 그대로 읽으면 `résumé`·`café`가 깨져 영영 안 맞는다
  const csv = new TextDecoder('windows-1252').decode(
    await (await fetch(TSL_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } })).arrayBuffer(),
  )
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
  // **소문자도 긁는다.** 대문자로 시작하는 것만 받으면 명사만 남는다 —
  // 독일어 동사·형용사는 목록에도 소문자로 실려서 `essen`·`groß`가 통째로
  // 빠졌다. 등급이 붙은 낱말 670개가 전부 명사였던 이유가 이것이다
  return text.match(/[A-Za-zÄÖÜäöüß]{2,}/g) ?? []
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
 * FLELex/Beacco — 프랑스어 CEFR 등급.
 *
 * 기본 FLELex는 낱말마다 A1~C2 여섯 등급의 **빈도**를 주는 분포표라, 등급 하나를
 * 정하려면 우리가 임계값을 지어내야 한다. Beacco 버전은 그 작업을 이미 논문으로
 * 끝냈다 — 전문가 판단과 빈도를 합쳐 낱말마다 등급 하나를 확정해 `level` 열에
 * 낸다(Pintard & François, 2020). 출처가 정한 값을 그대로 읽을 뿐이다.
 *
 *   Pintard, A., François, T. (2020). Combining expert knowledge with frequency
 *   information to infer CEFR levels for words. READI 워크숍, LREC 2020.
 */
const FLELEX_BEACCO_URL =
  'https://cental.uclouvain.be/cefrlex/static/resources/fr/FleLex_TT_Beacco.tsv'

async function frenchLevels(): Promise<Map<string, string>> {
  const tsv = await (
    await fetch(FLELEX_BEACCO_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  ).text()
  const levels = new Map<string, string>()
  for (const row of tsv.split('\n').slice(1)) {
    const cells = row.split('\t')
    const [word, level] = [cells[0], cells[9]]
    if (word && level) levels.set(word, level.trim())
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

/**
 * FLELex 목록에 있지만 **뜻이 우리 개념과 다른** 낱말. FLELex는 표기+품사로만
 * 묶어서, 뜻이 갈리는 동철이의어는 두 뜻의 빈도가 한 등급에 섞인다. 흔한 뜻이
 * 우리가 쓰는 낱은 뜻의 등급을 덮어써 버리는 자리를 걷어낸다.
 *
 *   vol    A1 — `절도`가 아니라 `비행`(공항 어휘)이 붙인 등급이다
 *   livre  A1 — `파운드`(무게 단위)가 아니라 `책`이 붙인 등급이다. 프랑스는
 *          미터법을 써서 livre가 무게로 잘 안 쓰인다
 *   poêle  B2 — 요리 어휘 `프라이팬`치고 높다. `le poêle`(난로)가 더 무거운
 *          말이라 그쪽이 등급을 끌어올렸을 가능성이 크다
 */
const FRENCH_HOMONYMS = new Set(['vol', 'livre', 'poêle'])

const german = await germanLevels()
const french = await frenchLevels()
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
  let words = { ja: 0, zh: 0, de: 0, fr: 0, en: 0, ru: 0 }

  for (const concept of data.concepts ?? []) {
    const apply = (
      lang: 'ja' | 'zh' | 'de' | 'fr' | 'en' | 'ru',
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
    const fr = concept.words.fr?.term
    apply('fr', 'cefr', fr && !FRENCH_HOMONYMS.has(fr) ? french.get(fr) : undefined)
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
      // CEFR는 de·fr을 합쳐 하나로 센다 — 속성 열쇠(cefr)가 둘이 같아서 나뉘지 않는다
      ` · HSK ${counts.hsk}/${words.zh} · CEFR ${counts.cefr}/${words.de + words.fr}` +
      ` · TSL ${counts.tsl}/${words.en} · TORFL ${counts.torfl}/${words.ru}`,
  )
}
