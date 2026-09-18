/**
 * 곁말을 붙인다. (spec.md §7)
 *
 *   node scripts/also.ts en widen=broaden prohibit=forbid
 *   node scripts/also.ts ru post-of-duty=должность
 *
 * 곁말은 이미 선 개념에 같은 뜻의 딴 표기를 얹는 일이다(lib/types.ts). 개념
 * 하나 값의 여섯 분의 일이라 목록을 채우는 가장 싼 자리인데, 스크립트가 없어서
 * 회차마다 파이썬을 새로 적고 있었다. 열 번 적었고 그 사이에 두 번 틀렸다.
 *
 * **개념은 slug으로 찾는다. 표기로 찾으면 안 된다.**
 *
 * 2026-09-18에 표기로 찾다가 `light`가 `light-ray`(빛)와 `light`(가벼운) 둘에
 * 걸려 `lightweight`가 양쪽에 붙었다. 눈으로 보고 빛 쪽을 뺐다. 같은 언어에
 * 같은 표기를 쓰는 개념이 **일흔셋**이다 — `fly`(날다·파리) · `season`(간
 * 맞추다·철) · `bank`(은행·벤치) · `livre`(책·파운드)처럼 동음이의어라 뜻줄과
 * 그림으로 갈린다. 흠이 아니라 얼개고, 그러니 표기로 찾는 한 언제든 다시 걸린다.
 * slug은 하나뿐이다.
 *
 * **붙이기 전에 임자를 본다.** 곁말도 다른 개념의 정답과 겹치면 검사가 건다
 * (scripts/check.ts). 그래서 `pnpm claim`이 보는 것과 같은 자리를 여기서도 보고,
 * 걸리면 **아무것도 쓰지 않고 멈춘다** — 절반만 쓰인 파일이 제일 고약하다.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Concept, Language } from '../lib/types.ts'

const LANGS = ['en', 'ja', 'zh', 'es', 'fr', 'de', 'ru'] as const
const norm = (term: string) => term.replace(/́/g, '').trim().toLowerCase()

const [lang, ...pairs] = process.argv.slice(2)

if (!lang || !LANGS.includes(lang as (typeof LANGS)[number]) || pairs.length === 0) {
  console.error(
    '언어와 <slug>=<곁말>을 줍니다.\n\n' +
      '  pnpm also en widen=broaden prohibit=forbid\n' +
      '  pnpm also ru post-of-duty=должность\n\n' +
      `  언어: ${LANGS.join(' · ')}`,
  )
  process.exit(1)
}

const asks = pairs.map((pair) => {
  const at = pair.indexOf('=')
  if (at <= 0) {
    console.error(`<slug>=<곁말> 꼴이 아닙니다 — ${pair}`)
    process.exit(1)
  }
  return { slug: pair.slice(0, at), word: pair.slice(at + 1).trim() }
})

/* ── 콘텐츠를 읽는다. 파일마다 한 번만 읽고 한 번만 쓴다 ─────────────── */

const files = readdirSync('content').filter((f) => f.endsWith('.json')).sort()
const loaded = files.map((file) => ({
  file,
  json: JSON.parse(readFileSync(join('content', file), 'utf8')) as { concepts?: Concept[] },
}))
const all = loaded.flatMap(({ file, json }) => (json.concepts ?? []).map((c) => ({ file, concept: c })))

/** 그 표기를 이미 쓰는 개념. 같은 언어만 본다 — 언어가 다르면 부딪히지 않는다 */
const ownerOf = (word: string) =>
  all.find(({ concept }) => {
    const w = concept.words?.[lang as Language]
    if (!w) return false
    return norm(w.term) === norm(word) || (w.also ?? []).some((a) => norm(a) === norm(word))
  })

const problems: string[] = []
const plan: { file: string; concept: Concept; word: string }[] = []

for (const { slug, word } of asks) {
  const found = all.find(({ concept }) => concept.slug === slug)
  if (!found) {
    problems.push(`  ${slug} — 그런 개념이 없습니다`)
    continue
  }
  if (!found.concept.words?.[lang as Language]) {
    problems.push(`  ${slug} — ${lang} 자리가 비어 있습니다`)
    continue
  }
  const owner = ownerOf(word)
  if (owner) {
    const where = owner.concept.slug === slug ? '이미 붙어 있습니다' : `임자가 있습니다 — ${owner.concept.slug}@${owner.file.replace('.json', '')}`
    problems.push(`  ${slug} +${word} — ${where}`)
    continue
  }
  plan.push({ file: found.file, concept: found.concept, word })
}

if (problems.length > 0) {
  console.error(`걸린 자리 ${problems.length} — 아무것도 쓰지 않았습니다\n`)
  for (const line of problems) console.error(line)
  process.exit(1)
}

/* ── 다 통과했을 때만 쓴다 ────────────────────────────────────────── */

const touched = new Set<string>()
for (const { file, concept, word } of plan) {
  const w = concept.words![lang as Language]!
  w.also = [...(w.also ?? []), word]
  touched.add(file)
  console.log(`  ${concept.slug.padEnd(30)} ${concept.meaning_ko ?? ''}  +${word}`)
}

for (const { file, json } of loaded) {
  if (!touched.has(file)) continue
  writeFileSync(join('content', file), `${JSON.stringify(json, null, 2)}\n`)
}

console.log(`\n곁말 ${plan.length}개를 ${touched.size}개 파일에 붙였습니다 — pnpm check로 보세요`)
