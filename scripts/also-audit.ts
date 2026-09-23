/**
 * 중국어 곁말이 정말 그 개념을 가리키는지 사전으로 훑는다. (spec.md §7)
 *
 *   node scripts/also-audit.ts              숫자만
 *   node scripts/also-audit.ts --list       의심스러운 것을 다 찍는다
 *   node scripts/also-audit.ts --list food  그 파일만
 *
 * **고치지 않는다. 목록만 낸다.** 중국어 곁말은 HSK 배치가 회차마다 수십·수백
 * 개씩 넣는 자리라, 훑는 세션과 넣는 세션이 같은 필드를 동시에 만지면 서로의
 * 판단을 덮는다(docs/concurrent-sessions.md). 넣는 쪽이 자기 배치 끝에 이걸
 * 돌리는 것이 맞다.
 *
 * ## 무엇을 보나
 *
 * 러시아어는 어미가 품사를 알려줘서 꼴만으로 걸렀다(`ruPos`). 중국어는 꼴이
 * 품사를 안 알려주므로 **뜻을 봐야 한다.**
 *
 * 곁말의 CC-CEDICT 뜻풀이에 **그 개념의 영어 표기가 들어 있는지**를 본다.
 * `open`의 곁말 `召开`는 뜻풀이가 "to convene (a conference)"라 open이 없다 —
 * 회의를 소집하는 것이지 문을 여는 것이 아니다.
 *
 * 중국어 표제어와 곁말을 서로 대 보는 방법은 **버렸다.** 단음절 표제어의 사전
 * 첫 뜻이 엉뚱한 자리가 많아서다 — `听`(듣다)의 첫 뜻은 "smile (archaic)"이고
 * `修`(고치다)는 "surname Xiu"다. 개념의 영어 표기를 기준으로 삼으면 그 잡음이
 * 사라진다.
 *
 * ## 정밀도는 절반쯤이다
 *
 * 걸린 것을 스물다섯 개 손으로 갈라 보니 열셋이 진짜였다.
 *
 *   진짜   举办(행사를 열다) · 扑灭(불을 끄다) · 筹措(돈을 마련하다) ·
 *          牢(감옥) · 赶紧(부사) · 楼道(복도) · 处于(어떤 상태에 있다)
 *   아님   亲属(친척) · 忠实(충실한) · 盛宴(연회) · 许(허락하다)
 *
 * 그러니 **이 목록은 후보이지 판정이 아니다.** 사람이 하나씩 보고 정한다.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { bag, loadDict } from '../lib/cedict.ts'
import type { Concept } from '../lib/types.ts'

const CONTENT_DIR = 'content'
const argv = process.argv.slice(2)
const list = argv.includes('--list')
/**
 * **`--tight`는 표제어의 사전 뜻까지 맞대 본다.** 곁말의 뜻이 영어 표제어와
 * 안 겹쳐도 **중국어 표제어의 뜻과 겹치면** 지운다 — `图案`(design; pattern)과
 * `花纹`(decorative design)은 «design»으로 이어진다.
 *
 * **눈금은 실측했다** (2026-09-23, 손으로 가른 스물넷 기준).
 *
 *     후보      1827 → 1009   (45%가 빠진다)
 *     거짓 양성  7 가운데 5를 지운다
 *     진짜      17 가운데 3을 함께 지운다 — 时髦(품사가 다름) · 执照(뜻이 넓음) ·
 *               克制(control 한 낱말만 겹친다)
 *
 * 그래서 **기본값은 그대로 둔다.** 다 훑을 때는 붙이지 않고, 한 회차에 빨리
 * 좁힐 때만 붙인다.
 */
const tight = argv.includes('--tight')
/**
 * **`--home`은 받을 자리를 찍어 준다.** 잘못 붙은 곁말은 대개 지울 것이 아니라
 * **옮길 것**이다 — 후보 1,822개가 100% HSK 표제어라, 지우면 목록 덮개가
 * 빠진다([docs/also-recheck.md](../docs/also-recheck.md)).
 *
 * 곁말의 사전 뜻을 **다른 개념의 중국어 표제어·곁말의 사전 뜻**과 맞대고,
 * 흔한 낱말은 값을 낮춰(idf) 가장 높은 하나를 찍는다.
 *
 * **눈금은 실제로 옮긴 아홉으로 쟀다** (2026-09-23) — `承载`→`prop-up`,
 * `走弯路`→`go-around`, `执照`→`permission`, `退让`→`back-away`,
 * `激活`→`turn-on`, `时髦`→`popular-trend`, `持`→`grip`, `款`→`list-item`,
 * `风尚`→`custom-usage`. **아홉 다 1위로 나온다.**
 *
 * **점수가 높다고 맞는 것은 아니다.** 흔한 낱말(`土`)은 아무 데나 높게 붙는다.
 * 먼저 §7의 세 잣대로 «진짜 위반»을 가린 다음, 그 줄에만 이 값을 쓴다.
 */
const home = argv.includes('--home')
/**
 * **`--alone`은 곁말이 하나뿐인 앵커만 남긴다.** 무리가 크면 잘못 보이던 곁말도
 * 그 안에서 제자리를 찾는다 — `威力`는 `力量`·`劲头` 곁이고 `痕迹`는 `足迹`·
 * `踪迹` 곁이다. **하나뿐이면 기댈 무리가 없다.**
 *
 * 2026-09-23에 `nature`를 닫을 때 남은 진짜 둘이 **둘 다 이 자리**였고, 둘 다
 * 개념을 새로 세워야 했다(`阵雨`→소나기 · `环保`→환경보호).
 *
 * **예보가 아니라 가늠자다.** 옳게 옮겨 놓아서 하나가 된 자리도 걸린다 —
 * 같은 날 `激活`을 `turn-on`(켜다)으로 옮겼더니 그 앵커가 곁말 하나짜리가 됐다.
 */
const alone = argv.includes('--alone')
const only = argv.find((a) => !a.startsWith('--'))

const dict = loadDict()
type Row = { file: string; slug: string; meaning: string; en: string; term: string; also: string; gloss: string; alone: boolean; seven: string }
const suspect: Row[] = []
let total = 0
let missing = 0

/** 모든 개념의 중국어 표제어·곁말을 뜻 낱말로 펼친다 — `--home`이 쓴다 */
type Home = { slug: string; meaning: string; words: Set<string>; term: string }
const homes: Home[] = []
if (home) {
  for (const file of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'))) {
    const json = JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf8')) as { concepts?: Concept[] }
    for (const concept of json.concepts ?? []) {
      const zh = concept.words.zh
      if (!zh) continue
      const words = new Set<string>()
      for (const one of [zh.term, ...(zh.also ?? [])])
        for (const gloss of dict.get(one) ?? []) for (const word of bag(gloss)) words.add(word)
      if (words.size > 0)
        homes.push({ slug: concept.slug, meaning: concept.meaning_ko, words, term: zh.term })
    }
  }
}
const df = new Map<string, number>()
for (const one of homes) for (const word of one.words) df.set(word, (df.get(word) ?? 0) + 1)
const idf = (word: string) => Math.log(homes.length / (1 + (df.get(word) ?? 0)))
/**
 * **위 셋을 찍는다.** 2026-09-23에 그날 옮긴 마흔셋으로 재 보니 맞는 집이
 * 1위로 나온 것은 **열여덟(42%)**뿐이었고, **셋 안에 들면 스물셋(53%)**이었다.
 * `得力`→`capable`(유능한)은 2위, `资质`→`temperament`(기질)는 3위였는데
 * 1위만 찍던 때에는 둘 다 «틀린 도구»로 보였다.
 *
 * 나머지 열셋은 사전 뜻이 아예 안 겹친다 — `纱`(cotton yarn)와 `thread`(线,
 * thread; string), `住房`(housing)과 `house`(房子, house; building)가 그렇다.
 * 영어 표제어를 뜻에 섞어 보고 어간을 더 깎아 봐도 **숫자가 안 움직였다**
 * (1위 18→17, 못 찍음 13→12). 그물을 더 조이는 대신 셋을 찍는다.
 */
function topHomes(also: string, self: string) {
  const pool = new Set<string>()
  for (const gloss of dict.get(also) ?? []) for (const word of bag(gloss)) pool.add(word)
  return homes
    .filter((one) => one.slug !== self)
    .map((one) => {
      let score = 0
      for (const word of pool) if (one.words.has(word) && (df.get(word) ?? 0) <= 40) score += idf(word)
      return { slug: one.slug, meaning: one.meaning, score, own: one.term === also }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

for (const file of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'))) {
  if (only && !file.startsWith(only)) continue
  const json = JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf8')) as { concepts?: Concept[] }
  for (const concept of json.concepts ?? []) {
    const zh = concept.words.zh
    const en = concept.words.en
    if (!zh?.also || !en) continue
    for (const also of zh.also) {
      total += 1
      const glosses = dict.get(also)
      if (!glosses) {
        missing += 1
        continue
      }
      const want = [...bag(en.term)]
      if (want.length === 0) continue
      const pool = new Set<string>()
      for (const gloss of glosses) for (const word of bag(gloss)) pool.add(word)
      if (want.some((word) => pool.has(word))) continue
      if (tight) {
        const termWords = new Set<string>()
        for (const gloss of dict.get(zh.term) ?? [])
          for (const word of bag(gloss)) termWords.add(word)
        if ([...termWords].some((word) => pool.has(word))) continue
      }
      suspect.push({
        file: file.replace('.json', ''),
        slug: concept.slug,
        meaning: concept.meaning_ko,
        en: en.term,
        term: zh.term,
        also,
        gloss: glosses.slice(0, 3).join('; '),
        alone: zh.also.length === 1,
        seven: (['ja', 'es', 'fr', 'de', 'ru'] as const)
          .map((lang) => concept.words[lang]?.term)
          .filter(Boolean)
          .join(' · '),
      })
    }
  }
}

console.log(
  `\n중국어 곁말 ${total} — 사전 뜻에 영어 표기가 안 보이는 것 ${suspect.length} · 사전에 없는 표기 ${missing}`,
)
const aloneCount = suspect.filter((row) => row.alone).length
console.log(
  tight
    ? '--tight — 표제어 뜻까지 맞댔습니다. 거짓 양성이 줄지만 진짜도 여섯에 하나쯤 빠집니다\n'
    : '표본으로 잰 정밀도는 절반쯤이다 — 후보이지 판정이 아니다 (--tight로 좁힙니다)\n',
)
console.log(
  `  그 가운데 «홀» ${aloneCount}개 — 앵커의 곁말이 그 하나뿐이라 기댈 무리가 없습니다` +
    `${alone ? '' : ' (--alone 으로 그것만 봅니다)'}\n`,
)

if (!list) {
  const byFile = new Map<string, number>()
  for (const row of suspect) byFile.set(row.file, (byFile.get(row.file) ?? 0) + 1)
  for (const [file, count] of [...byFile].sort((a, b) => b[1] - a[1]))
    console.log(`  ${file.padEnd(12)} ${String(count).padStart(4)}`)
  console.log('\n  --list 를 붙이면 하나씩 찍습니다\n')
} else {
  for (const row of suspect) {
    if (alone && !row.alone) continue
    console.log(
      `  ${row.alone ? '홀' : '  '} ${row.slug.padEnd(20)} ${row.meaning.padEnd(10)} ${row.en.padEnd(16)} ${row.term} / ${row.also} — ${row.gloss.slice(0, 56)}`,
    )
    // **앵커가 무엇을 가르치는지는 일곱 칸을 다 봐야 안다.** 2026-09-23에 같은
    // 자리에서 두 번 틀렸다 — `入口`(입구)는 `admission`(입장)의 es «entrada» ·
    // fr «entrée» · ru «вход»가 이미 가르치고 있었고, `基金`(기금)은
    // `foundation-body`(재단)의 ru «фонд»가 그랬다. 그래서 목록이 직접 찍는다.
    if (row.seven) console.log(`      ${row.seven}`)
    if (!home) continue
    const found = topHomes(row.also, row.slug)
    // **그 낱말이 남의 표제어면 옮길 자리가 아니다 — 빼야 한다.** `移民`이
    // `emigration`(이민)에 붙어 있었는데 `one-come-to-live-here`(들어와 사는 이)의
    // 표제어였다. 점수가 31.0으로 1위였던 이유가 「같은 낱말이라서」였다.
    console.log(
      found.length > 0
        ? `      ↳ ${found.map((x) => `${x.slug}(${x.meaning})${x.own ? ' «표제어»' : ''} ${x.score.toFixed(1)}`).join(' · ')}`
        : '      ↳ 받을 자리가 안 보입니다 — 개념을 세워야 합니다',
    )
  }
  console.log('')
}
