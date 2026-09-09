/**
 * 후보 개념이 이미 있는지 **배치를 짜기 전에** 본다. (spec.md §7)
 *
 *   node scripts/dup.ts postnatal-yoga braces-consult "산후 요가" "교정"
 *
 * `pnpm claim`은 **표기**의 임자를 본다 — 러시아어 `вишня`가 이미 쓰였는지.
 * 이건 **개념 자체**를 본다. 상황 표현은 표기가 문장이라 겹치는 일이 없고,
 * 겹치는 것은 언제나 slug와 뜻이다.
 *
 * 스물여덟 회차를 돌면서 세 번 걸렸고, 걸린 자리가 매번 달랐다.
 *
 *   engine-noise    slug가 이미 있었다. 예문 105줄을 다 쓰고 나서 알았다
 *   eye-drops       scene.json에만 없었다. body.json에 있는 것을 못 봤다
 *   spare-part      slug도 뜻("부품이 있나요?")도 있었다 — 이름만 갈 뻔했다
 *
 * 그래서 **content/ 전체**를 보고 **slug와 뜻을 함께** 본다. 셋 다 이 둘 중
 * 하나로 걸렸을 자리다.
 *
 * 인자는 섞어 적는다. `^[a-z0-9-]+$`이면 slug로 정확히 맞춰 보고, 아니면 뜻의
 * 조각으로 훑는다 — 뜻은 «산후 요가 있나요?»처럼 문장이라 부분으로 찾는 편이
 * 쓸모 있다.
 */
import { spawnSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { busyMark, busyNote, dirtyFiles } from '../lib/busy.ts'
import type { Concept } from '../lib/types.ts'

const CONTENT_DIR = 'content'
const SLUG_RE = /^[a-z0-9-]+$/

type Row = { file: string; slug: string; meaning: string }

const rows: Row[] = []
for (const file of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'))) {
  const json = JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf8')) as { concepts?: Concept[] }
  for (const concept of json.concepts ?? [])
    rows.push({ file: file.replace('.json', ''), slug: concept.slug, meaning: concept.meaning_ko })
}

const argv = process.argv.slice(2)
if (argv.length === 0) {
  console.log('후보를 적으세요 — slug는 그대로, 뜻은 조각으로')
  console.log('  node scripts/dup.ts postnatal-yoga "산후 요가" "교정"')
  process.exit(1)
}

const bySlug = new Map(rows.map((r) => [r.slug, r]))

const dirty = dirtyFiles(
  spawnSync('git', ['diff', '--name-only', 'HEAD', '--', CONTENT_DIR], { encoding: 'utf8' }).stdout ?? '',
)

const show = (r: Row) => `${r.slug}(${r.meaning})@${r.file}${busyMark(r.file, dirty)}`

const taken: string[] = []
const near: string[] = []
const free: string[] = []

for (const arg of argv) {
  if (SLUG_RE.test(arg)) {
    const owner = bySlug.get(arg)
    if (owner) taken.push(`${arg.padEnd(22)} slug — ${show(owner)}`)
    else free.push(arg)
    continue
  }
  const hits = rows.filter((r) => r.meaning.includes(arg))
  if (hits.length === 0) free.push(arg)
  else if (hits.some((r) => r.meaning === arg))
    taken.push(`${arg.padEnd(22)} 뜻 — ${hits.slice(0, 4).map(show).join(' · ')}`)
  else near.push(`${arg.padEnd(22)} 뜻 조각 — ${hits.slice(0, 4).map(show).join(' · ')}`)
}

console.log(`\n후보 ${argv.length} — 임자 있음 ${taken.length} · 비슷한 것 ${near.length} · 빈자리 ${free.length}`)
if (taken.length) {
  console.log('')
  for (const line of taken) console.log(`  ${line}`)
}
/**
 * 조각이 걸렸다고 막힌 자리는 아니다. «상담»은 학원·대출·트레이너에 이미
 * 있지만 «상담은 몇 분이에요?»는 다른 개념이다. 사람이 보라고 따로 낸다.
 */
if (near.length) {
  console.log('\n비슷한 것 — 같은 개념인지 보고 정합니다')
  for (const line of near) console.log(`  ${line}`)
}
if (free.length) console.log(`\n빈자리\n  ${free.join(' ')}`)
if (dirty.size > 0) console.log(busyNote(dirty))
console.log('')
