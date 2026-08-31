/**
 * 시험 목록 대비 우리 위치. (spec.md §7)
 *
 *   node scripts/coverage.ts
 *
 * "얼마나 더 넣어야 하나"는 개념 수로는 답이 안 나온다. 2,300개를 넣고도
 * HSK 1~3급의 5분의 1밖에 못 덮을 수 있다 — 우리는 목록을 따라가지 않고
 * **그릴 수 있고 일곱 언어가 공유하는 것**을 고르기 때문이다 (§7). 그래서
 * 진도는 목록에 대고 재야 한다.
 *
 * **표를 문서에 박아 두지 않는다.** 배치를 한 번 돌 때마다 낡기 때문이다.
 * spec.md에는 이 스크립트를 돌리라고만 적고, 숫자는 여기서 나온다.
 *
 * 잴 수 있는 것은 **낱말 목록이 공개된 시험뿐**이다.
 *
 *   TSL   TOEIC Service List 1,250개 — 표제어 목록이 CSV로 있다
 *   HSK   HSK 3.0 — complete-hsk-vocabulary (MIT)
 *
 * JLPT·CEFR은 목록 대비 비율을 못 낸다. JMdict의 JLPT 태그는 낱말에 붙어
 * 있을 뿐 "N5 전체 목록"이 아니고, 괴테 목록은 PDF에서 긁은 표제어라
 * 분모로 쓰기에 성기다. 그 둘은 **우리 낱말 중 등급이 붙은 비율**만 센다 —
 * 분모가 다르므로 TSL·HSK와 같은 표에 놓지 않는다.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Concept } from '../lib/types.ts'

const TSL_URL = 'https://www.newgeneralservicelist.com/s/TSL_12_stats.csv'
const HSK_URL =
  'https://raw.githubusercontent.com/drkameleon/complete-hsk-vocabulary/main/complete.min.json'

const concepts: Concept[] = readdirSync('content')
  .filter((f) => f.endsWith('.json'))
  .sort()
  .flatMap((f) => JSON.parse(readFileSync(join('content', f), 'utf8')).concepts)

const line = (n: number) => '─'.repeat(n)
const pct = (a: number, b: number) => (b === 0 ? '—' : `${((100 * a) / b).toFixed(1)}%`)

/** 우리가 쓰는 그 언어의 표기 모음 */
function terms(lang: 'en' | 'zh'): Set<string> {
  const set = new Set<string>()
  for (const concept of concepts) {
    const word = concept.words[lang]
    if (word) set.add(lang === 'en' ? word.term.toLowerCase() : word.term)
  }
  return set
}

async function tsl() {
  const csv = await (await fetch(TSL_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } })).text()
  const words = csv
    .split(/\r?\n/)
    .slice(1)
    .map((row) => row.split(',')[0]?.replace(/"/g, '').trim().toLowerCase())
    .filter((w): w is string => Boolean(w))

  const mine = terms('en')
  const covered = words.filter((w) => mine.has(w)).length
  console.log(`\nTSL (TOEIC) — 표제어 목록\n${line(46)}`)
  console.log(`  ${covered}/${words.length}  ${pct(covered, words.length)}`)
  console.log(`  남은 것 ${words.length - covered}개`)
}

async function hsk() {
  const data = (await (await fetch(HSK_URL)).json()) as Array<{ s?: string; l?: string[] }>

  // l은 ["n7"] 또는 ["t7","n6"] 꼴이다. n이 HSK 3.0 급이고 t는 구 등급이다
  const level = new Map<string, number>()
  const total = new Map<number, number>()
  for (const entry of data) {
    const tag = (entry.l ?? []).find((x) => /^n\d$/.test(x))
    if (!tag || !entry.s) continue
    const grade = Number(tag[1])
    level.set(entry.s, grade)
    total.set(grade, (total.get(grade) ?? 0) + 1)
  }

  const mine = terms('zh')
  const covered = new Map<number, number>()
  for (const [word, grade] of level)
    if (mine.has(word)) covered.set(grade, (covered.get(grade) ?? 0) + 1)

  console.log(`\nHSK 3.0 — 급별\n${line(46)}`)
  let sumTotal = 0
  let sumCovered = 0
  for (const grade of [...total.keys()].sort((a, b) => a - b)) {
    const t = total.get(grade)!
    const c = covered.get(grade) ?? 0
    sumTotal += t
    sumCovered += c
    const label = grade >= 7 ? '7-9급' : `${grade}급`
    console.log(`  ${label.padEnd(6)} ${String(c).padStart(5)}/${String(t).padStart(5)}  ${pct(c, t)}`)
  }
  console.log(`  ${'합계'.padEnd(5)} ${String(sumCovered).padStart(5)}/${String(sumTotal).padStart(5)}  ${pct(sumCovered, sumTotal)}`)

  const upTo = (max: number) => {
    let t = 0
    let c = 0
    for (const [grade, count] of total)
      if (grade <= max) {
        t += count
        c += covered.get(grade) ?? 0
      }
    return `${c}/${t} (${pct(c, t)})`
  }
  console.log(`\n  1~3급 ${upTo(3)} · 1~6급 ${upTo(6)}`)
}

/** 목록이 없는 트랙은 "우리 낱말 중 등급이 붙은 비율"만 낸다 */
function tagged() {
  const rows: Array<[string, 'ja' | 'de', 'jlpt' | 'cefr']> = [
    ['JLPT', 'ja', 'jlpt'],
    ['CEFR (TELC)', 'de', 'cefr'],
  ]
  console.log(`\n등급이 붙은 낱말 — 분모가 목록이 아니라 우리 콘텐츠다\n${line(46)}`)
  for (const [label, lang, key] of rows) {
    let has = 0
    let all = 0
    for (const concept of concepts) {
      const word = concept.words[lang]
      if (!word) continue
      all += 1
      const attributes = word.attributes as Record<string, unknown> | undefined
      if (attributes?.[key]) has += 1
    }
    console.log(`  ${label.padEnd(12)} ${String(has).padStart(5)}/${String(all).padStart(5)}  ${pct(has, all)}`)
  }
  console.log(`  ${'DELE·DELF'.padEnd(12)} ${'—'.padStart(11)}  낱말별 등급을 담은 공개 목록이 없다`)
  console.log(`  ${'TORFL'.padEnd(12)} ${'—'.padStart(11)}  ТРКИ는 목록을 기계가 읽게 내놓지 않는다`)
}

/**
 * 파일별 개수. 파일은 이미지 작업을 몰아서 하기 좋은 단위이지 학습자에게
 * 보이는 구분이 아니다 (§4) — 얇은 축부터 채우는 것은 균형 때문이다.
 *
 * **주제 파일과 품사 파일을 섞어 세지 않는다.** action(동사)·quality(형용사)·
 * scene(상황 표현)은 주제가 아니라 품사라 분모가 다르다. 한 표에 놓으면
 * "scene 230이 제일 두껍다"가 주제 편중처럼 읽히는데, 실제로는 비교 대상이
 * 아니다. 얇은 축을 고를 때 보는 것은 **주제 쪽 표 하나**다.
 */
const BY_PART = new Set(['action', 'quality', 'scene'])

function axes() {
  const counts = readdirSync('content')
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const name = f.replace('.json', '')
      const items = JSON.parse(readFileSync(join('content', f), 'utf8')).concepts as Concept[]
      return [name, items.length] as const
    })
    .sort((a, b) => a[1] - b[1])

  const topics = counts.filter(([name]) => !BY_PART.has(name))
  const parts = counts.filter(([name]) => BY_PART.has(name))

  const draw = (rows: typeof counts, scale: number) => {
    for (const [name, count] of rows) {
      const bar = '■'.repeat(Math.round((count / scale) * 18)).padEnd(18, '·')
      console.log(`  ${name.padEnd(10)} ${bar} ${String(count).padStart(4)}`)
    }
  }

  const widest = topics[topics.length - 1]
  console.log(`\n주제 축 — 적은 순\n${line(46)}`)
  draw(topics, widest[1])
  console.log(`\n  가장 얇은 축이 ${topics[0][0]}(${topics[0][1]}), 두꺼운 축이 ${widest[0]}(${widest[1]})다`)
  console.log(`  ${'차이'.padEnd(4)} ${(widest[1] / topics[0][1]).toFixed(1)}배 — 다음 배치는 위쪽부터 고른다`)

  console.log(`\n품사 파일 — 주제와 분모가 다르다\n${line(46)}`)
  draw(parts, parts[parts.length - 1][1])
}

function shape() {
  const counts: Record<string, number> = { noun: 0, verb: 0, adjective: 0, scene: 0 }
  for (const concept of concepts) counts[concept.category] += 1
  const all = concepts.length
  console.log(`\n콘텐츠 구성\n${line(46)}`)
  console.log(`  개념 ${all}개 · 낱말 ${all * 7}개(7언어)`)
  for (const [key, value] of Object.entries(counts))
    console.log(`  ${key.padEnd(10)} ${String(value).padStart(5)}  ${pct(value, all)}`)
}

shape()
axes()
await tsl()
await hsk()
tagged()
console.log('')
