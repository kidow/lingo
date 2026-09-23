/**
 * 후보 개념이 이미 있는지 **배치를 짜기 전에** 본다. (spec.md §7)
 *
 *   node scripts/dup.ts postnatal-yoga braces-consult "산후 요가" "교정"
 *
 * **개념과 표기를 한 번에 본다.** 뜻줄과 slug로 개념이 이미 있는지 보고,
 * 같은 인자를 일곱 언어의 표기에도 대 본다. 인자를 가려 받지 않으므로
 * 한국어 뜻과 외국어 낱말을 섞어 적어도 된다.
 *
 * 오래 이 둘이 갈라져 있었다. `dup`은 뜻만 보고 `claim`은 표기만 봤는데,
 * 뜻줄이 조금만 달라도 `dup`은 빈자리라고 한다. 축을 채우는 아홉 회차에서
 * **마흔 남짓**이 그렇게 빈자리로 나왔다가 표기를 따로 대 보고서야 걸렸다.
 *
 *   시동을 걸다     dup은 빈자리. 일곱 언어 가운데 넷이 이미 서 있었다
 *   반칙하다        dup은 빈자리. 같은 파일에 foul-play(반칙)가 있었다
 *   느끼한          dup은 빈자리. greasy가 다섯 언어를 쥐고 있었다
 *
 * 세 번 다 **뜻줄의 글자가 달라서** 못 본 자리다. 그래서 여기서 표기까지 본다.
 * `pnpm claim`은 여전히 러시아어 어간 한 집안까지 보므로 곁말을 붙일 때 쓴다.
 *
 * **뜻줄은 공백을 지우고 맞춘다.** 「딱 정해진」이 있는데 `dup 딱정해진`이
 * 빈자리라고 하던 흠이 여기서 사라진다.
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
 * **중국어 표기는 사전 뜻으로도 판다.** 표기가 안 겹치면 오래 «빈자리»라고만
 * 했는데, 그 말은 「개념을 세워라」로 읽힌다. 2026-09-23에 곁말 넷을 개념으로
 * 세우려다 **셋이 이미 서 있는 것**을 알았다 — `艺人`은 `performer`(무대 배우),
 * `住房`은 `house`(집), `凶手`는 `a-hired-killer`(살수)였다. 셋 다 내가 적은
 * 한국어(연예인·주택·살인자)로는 안 걸린다. 그래서 중국어 인자에는 **CC-CEDICT
 * 뜻풀이를 다른 개념의 중국어 표제어·곁말 뜻풀이와 맞대** 가까운 셋을 찍는다.
 * `pnpm also-audit --home`과 같은 눈금이고, 여기서는 **인자 하나**를 판다.
 *
 * 인자는 섞어 적는다. `^[a-z0-9-]+$`이면 slug로 정확히 맞춰 보고, 아니면 뜻의
 * 조각으로 훑는다 — 뜻은 «산후 요가 있나요?»처럼 문장이라 부분으로 찾는 편이
 * 쓸모 있다.
 */
import { spawnSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { busyMark, busyNote, dirtyFiles } from '../lib/busy.ts'
import { bag, loadDict } from '../lib/cedict.ts'
import type { Concept } from '../lib/types.ts'

const CONTENT_DIR = 'content'
const SLUG_RE = /^[a-z0-9-]+$/

/** 뜻줄은 공백을 지우고 맞춘다 — 「딱 정해진」과 「딱정해진」은 같은 뜻이다 */
const bare = (s: string) => s.replace(/\s+/g, '')
/** 표기는 강세 부호를 떼고 맞춘다 (scripts/also.ts와 같은 자리) */
const spellKey = (s: string) => s.replace(/́/g, '').trim().toLowerCase()

/**
 * 뜻줄이 후보 **안에** 들어 있는 쪽을 볼 때 걸러 낼 것. 이 열은 이름 뒤에
 * 붙어 움직임만 만드는 말이라 「반칙하다」가 `do(하다)`에, 「손주를 보다」가
 * `see(보다)`에 걸린다. 개념이 겹친 것이 아니라 어미가 같을 뿐이다.
 */
const LIGHT = new Set(['하다', '되다', '있다', '없다', '같다', '지다', '싶다', '보다', '주다', '받다', '나다', '내다', '이다'])

type Row = { file: string; slug: string; meaning: string }
type Spell = Row & { lang: string; also: boolean }

const rows: Row[] = []
/** `rows`와 자리를 맞춘 개념 원본 — 사전 뜻을 팔 때 중국어 표기가 필요하다 */
const conceptOf: Concept[] = []
const spells = new Map<string, Spell[]>()

for (const file of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'))) {
  const json = JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf8')) as { concepts?: Concept[] }
  for (const concept of json.concepts ?? []) {
    const row = { file: file.replace('.json', ''), slug: concept.slug, meaning: concept.meaning_ko }
    rows.push(row)
    conceptOf.push(concept)
    for (const [lang, word] of Object.entries(concept.words ?? {})) {
      if (!word) continue
      for (const [term, also] of [[word.term, false], ...(word.also ?? []).map((a) => [a, true])] as [string, boolean][]) {
        if (!term) continue
        const key = spellKey(term)
        const list = spells.get(key) ?? []
        list.push({ ...row, lang, also })
        spells.set(key, list)
      }
    }
  }
}

const argv = process.argv.slice(2)
if (argv.length === 0) {
  console.log('후보를 적으세요 — slug는 그대로, 뜻은 조각으로, 표기는 그 언어 낱말 그대로')
  console.log('  node scripts/dup.ts postnatal-yoga "산후 요가" "교정" greasy 脂っこい')
  process.exit(1)
}

const bySlug = new Map(rows.map((r) => [r.slug, r]))

const dirty = dirtyFiles(
  spawnSync('git', ['diff', '--name-only', 'HEAD', '--', CONTENT_DIR], { encoding: 'utf8' }).stdout ?? '',
)

const show = (r: Row) => `${r.slug}(${r.meaning})@${r.file}${busyMark(r.file, dirty)}`
const showSpell = (s: Spell) => `${s.lang} ${show(s)}${s.also ? ' (곁말)' : ''}`

const taken: string[] = []
const spelt: string[] = []
const near: string[] = []
const free: string[] = []

for (const arg of argv) {
  /** 표기는 인자를 가리지 않고 본다 — 한국어 뜻은 어차피 표기로 안 쓴다 */
  const owners = spells.get(spellKey(arg)) ?? []
  if (owners.length > 0) spelt.push(`${arg.padEnd(22)} 표기 — ${owners.slice(0, 4).map(showSpell).join(' · ')}`)

  if (SLUG_RE.test(arg)) {
    const owner = bySlug.get(arg)
    if (owner) taken.push(`${arg.padEnd(22)} slug — ${show(owner)}`)
    else if (owners.length === 0) free.push(arg)
    continue
  }
  /**
   * 조각은 **양쪽으로** 본다. 「반칙」이 있는데 `dup 반칙하다`가 빈자리라고
   * 하던 자리다 — 뜻줄이 후보 안에 들어 있는 쪽도 같은 개념일 때가 많다.
   * 한 글자짜리 뜻줄은 아무 데나 걸리므로 두 글자부터 본다.
   */
  const hits = rows.filter(
    (r) =>
      bare(r.meaning).includes(bare(arg)) ||
      (bare(r.meaning).length >= 2 && !LIGHT.has(bare(r.meaning)) && bare(arg).includes(bare(r.meaning))),
  )
  if (hits.length === 0) {
    if (owners.length === 0) free.push(arg)
  } else if (hits.some((r) => bare(r.meaning) === bare(arg)))
    taken.push(`${arg.padEnd(22)} 뜻 — ${hits.slice(0, 4).map(show).join(' · ')}`)
  else near.push(`${arg.padEnd(22)} 뜻 조각 — ${hits.slice(0, 4).map(show).join(' · ')}`)
}

console.log(
  `\n후보 ${argv.length} — 임자 있음 ${taken.length} · 표기 겹침 ${spelt.length} · 비슷한 것 ${near.length} · 빈자리 ${free.length}`,
)
if (taken.length) {
  console.log('')
  for (const line of taken) console.log(`  ${line}`)
}
/**
 * 표기가 겹치면 그 언어에는 그 낱말을 못 쓴다. 한 언어만 막혔으면 낱말을
 * 바꿔 살리고, 서너 언어가 한 개념을 가리키면 같은 개념이라 물러난다.
 */
if (spelt.length) {
  console.log('\n표기 겹침 — 그 언어에는 이미 임자가 있습니다')
  for (const line of spelt) console.log(`  ${line}`)
}
/**
 * 조각이 걸렸다고 막힌 자리는 아니다. «상담»은 학원·대출·트레이너에 이미
 * 있지만 «상담은 몇 분이에요?»는 다른 개념이다. 사람이 보라고 따로 낸다.
 */
if (near.length) {
  console.log('\n비슷한 것 — 같은 개념인지 보고 정합니다')
  for (const line of near) console.log(`  ${line}`)
}
/**
 * **뜻이 닿는 개념.** 중국어 인자만 본다 — 사전이 중국어 표기로만 서 있다.
 * 표기가 겹치지 않아도 같은 무리가 이미 서 있을 수 있다. 점수는 흔한 낱말을
 * 깎은(idf) 뜻풀이 겹침이고, **판정이 아니라 후보**다.
 */
const CJK = /[\u4e00-\u9fff]/
const cjk = argv.filter((a) => CJK.test(a))
if (cjk.length > 0) {
  let dict: Map<string, string[]> | null = null
  try {
    dict = loadDict()
  } catch {
    console.log('\n사전이 없습니다 — .cache/cedict.txt를 받아 두면 뜻으로도 팝니다')
  }
  if (dict) {
    const homes = rows.map((r, i) => {
      const words = new Set<string>()
      const concept = conceptOf[i]
      const spelt = new Set<string>()
      for (const term of [concept.words?.zh?.term, ...(concept.words?.zh?.also ?? [])]) {
        if (!term) continue
        spelt.add(term)
        for (const gloss of dict.get(term) ?? []) for (const word of bag(gloss)) words.add(word)
      }
      return { ...r, words, spelt }
    })
    const df = new Map<string, number>()
    for (const one of homes) for (const word of one.words) df.set(word, (df.get(word) ?? 0) + 1)
    const idf = (word: string) => Math.log(homes.length / (1 + (df.get(word) ?? 0)))
    const lines: string[] = []
    for (const arg of cjk) {
      const pool = new Set<string>()
      for (const gloss of dict.get(arg) ?? []) for (const word of bag(gloss)) pool.add(word)
      if (pool.size === 0) {
        lines.push(`${arg.padEnd(22)} 사전에 없는 표기입니다`)
        continue
      }
      /**
       * **그 낱말을 이미 쥔 개념은 뺀다.** 안 빼면 지금 얹혀 있는 앵커가
       * 제 곁말의 뜻으로 1위에 올라 자리를 가린다 — `不服`이 그 앵커
       * `dissatisfaction`(불만)을 63.8로 덮었다. 그 자리는 위의 «표기 겹침»이
       * 이미 찍는다.
       */
      const scored = homes
        .filter((one) => !one.spelt.has(arg))
        .map((one) => {
          let score = 0
          for (const word of pool) if (one.words.has(word) && (df.get(word) ?? 0) <= 40) score += idf(word)
          return { one, score }
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
      if (scored.length === 0) lines.push(`${arg.padEnd(22)} 닿는 개념이 없습니다`)
      else lines.push(`${arg.padEnd(22)} ${scored.map((x) => `${show(x.one)} ${x.score.toFixed(1)}`).join(' · ')}`)
    }
    console.log('\n사전 뜻이 닿는 개념 — 표기가 안 겹쳐도 같은 무리일 수 있습니다')
    for (const line of lines) console.log(`  ${line}`)
  }
}
if (free.length) console.log(`\n빈자리\n  ${free.join(' ')}`)
if (dirty.size > 0) console.log(busyNote(dirty))
console.log('')
