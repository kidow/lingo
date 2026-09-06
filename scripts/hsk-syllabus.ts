/**
 * 공식 HSK 대강에서 낱말별 등급표를 만든다. (spec.md §7)
 *
 *   node scripts/hsk-syllabus.ts    →  scripts/hsk-2026.json
 *
 * 등급은 **출제기관의 표**에서 온다. 한때 남의 저장소(complete-hsk-vocabulary)의
 * 태그를 그대로 썼는데, 그 데이터는 등급을 틀리게 주지는 않았지만 공식 표
 * 10,896개 가운데 839개를 빠뜨렸다 — `头痛`·`电子书`·`橙子`·`肺炎`처럼 등급이
 * 빌 이유가 없는 낱말이 그래서 비어 있었다(우리 콘텐츠에서 51개).
 *
 * PDF에서 표를 읽을 때 걸리는 자리가 셋이다.
 *
 *   1. `汉考国际` 워터마크가 줄 **가운데로** 끼어든다 (`汉考国际5403 7-9 哀求`)
 *   2. 등급 칸이 겹친다 — `1（2）（4）`는 1급에서 처음 나오고 2·4급에서 뜻이
 *      늘어난다는 뜻이다. **첫 숫자**가 그 낱말을 처음 만나는 등급이다
 *   3. 동형어에 번호가 붙는다 — `别1`·`生2`. 표기에서 떼어낸다
 *
 * 7~9급은 한 묶음이라 표에도 `7-9`로 적힌다. 우리는 7로 저장하고 화면에서
 * `HSK 7-9`로 편다 (lib/level.ts).
 *
 * **뽑은 표를 커밋한다.** 잠긴 PDF라 macOS PDFKit이 필요해서(hsk-syllabus.swift)
 * 다른 기계에서는 이 단계가 안 돈다. 대강이 바뀌는 일은 몇 해에 한 번이므로
 * 그때 이 스크립트를 다시 돌려 표를 갈아 끼운다.
 */
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { cachedBytes } from './cache.ts'

/** 2025-11 발표 · 2026-07 시행. chinesetest.cn의 대강 페이지가 직접 거는 파일이다 */
const PDF_URL =
  'https://hsk.cn-bj.ufileos.com/3.0/%E6%96%B0%E7%89%88HSK%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B21219.pdf'

const OUT = join('scripts', 'hsk-2026.json')

/** `序号 等级 词语 拼音 词性` 한 줄. 등급 칸은 `1`·`7-9`·`1（2）（4）` 꼴이다 */
const ROW = /^(\d{1,5})\s*(7-9|[1-9])((?:[（(][^）)]*[）)])*)\s+(\S+)\s+(.*)$/

// cachedBytes가 .cache/에 그대로 떨궈 둔다. swift는 파일 경로를 받는다
await cachedBytes('hsk-2026.pdf', async () =>
  Buffer.from(await (await fetch(PDF_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } })).arrayBuffer()),
)
const path = join('.cache', 'hsk-2026.pdf')

const text = execFileSync('swift', [join('scripts', 'hsk-syllabus.swift'), path], {
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
})

const levels: Record<string, number> = {}
let rows = 0
const skipped: string[] = []
for (const raw of text.split('\n')) {
  const line = raw.replaceAll('汉考国际', '').trim()
  if (!line || line.startsWith('序号')) continue
  const m = ROW.exec(line)
  if (!m) {
    // 번호로 시작하는데 안 맞으면 표 한 줄을 흘린 것이다. 조용히 넘기지 않는다
    if (/^\d{1,5}\s/.test(line)) skipped.push(line)
    continue
  }
  rows += 1
  const level = m[2] === '7-9' ? 7 : Number(m[2])
  const word = m[4].replace(/\d+$/, '')
  // 한 낱말이 여러 등급에 실린다. 처음 만나는 등급이 그 낱말의 등급이다
  if (word) levels[word] = Math.min(levels[word] ?? 99, level)
}

if (skipped.length > 0) {
  console.error(`표 줄을 ${skipped.length}개 못 읽었습니다. 앞의 셋:`)
  for (const line of skipped.slice(0, 3)) console.error(`  ${line}`)
  process.exit(1)
}

const sorted = Object.fromEntries(Object.entries(levels).sort(([a], [b]) => a.localeCompare(b, 'zh')))
writeFileSync(OUT, `${JSON.stringify(sorted, null, 0)}\n`)

const per = new Map<number, number>()
for (const level of Object.values(levels)) per.set(level, (per.get(level) ?? 0) + 1)
const spread = [...per.entries()]
  .sort(([a], [b]) => a - b)
  .map(([level, n]) => `${level === 7 ? '7-9' : level}급 ${n}`)
  .join(' · ')
console.log(`표 ${rows}행 → 낱말 ${Object.keys(levels).length}개 → ${OUT}\n  ${spread}`)
