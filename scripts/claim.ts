/**
 * 후보 낱말에 임자가 있는지 먼저 본다. (spec.md §7)
 *
 *   node scripts/claim.ts обида поддержка ресница
 *   pbpaste | node scripts/claim.ts
 *
 * 배치를 짤 때 이미 있는 낱말을 후보로 잡는 일이 잦다. 콘텐츠가 4,700개를
 * 넘으면서 B2 한 배치(18개)에서 열둘이 겹친 적도 있다. 겹친 것은 개념을 새로
 * 만들 수 없으므로 — 같은 표기가 정답 둘이 되면 4지선다에 답이 두 개 깔린다 —
 * 통째로 빼고 다른 낱말로 갈아야 한다.
 *
 * 그런데 지금은 **다 쓰고 나서** 알게 된다. 뜻·예문·그림 프롬프트를 일곱 언어로
 * 다 짜 넣은 뒤에야 추가 스크립트의 충돌 검사가 걸고, 그 자리를 도로 들어낸다.
 * 버리는 것은 검사가 아니라 그 앞의 손이다. 그래서 그 검사를 배치 **앞**으로
 * 옮긴다 — 후보 목록만 있으면 곧바로 답이 나온다.
 *
 * 임자는 두 가지다.
 *
 *   term   다른 개념의 정답이다. 새로 만들 수 없다
 *   also   다른 개념이 같은 뜻의 딴 표기로 이미 적어 뒀다 (lib/types.ts)
 *
 * 둘 다 막힌 자리다 — `also`도 다른 개념의 정답과 겹치면 검사가 건다.
 * 예문에만 나오는 낱말은 임자가 아니므로 세지 않는다. 그건 그냥 쓰인 것이다.
 *
 * **표기가 어긋난 자리도 짚는다.** 겹치는 것이 늘 같은 표기는 아니다. 버찌를
 * 빼야 했던 것은 `черешня`가 이미 있어서가 아니라 벚나무 열매 개념이 `вишня`로
 * 이미 있었기 때문이고, 향신료는 영어 `spice`가 임자였다. 표기만 대조하면 둘
 * 다 빈자리로 보인다. 그래서 단수·복수와 여러 낱말 중 한 낱말이 걸리는 자리는
 * 따로 모아 눈으로 보게 한다 — 막힌 자리라고 단정하지는 않는다.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Concept, Language } from '../lib/types.ts'

/**
 * 대조용 표기.
 *
 * 러시아어 학습 목록은 `абсолю́тный`처럼 강세를 결합 문자로 얹어 놓는데 우리
 * 콘텐츠는 얹지 않는다. 그 한 글자만 뗀다 — NFD로 풀지는 않는다. 풀면 프랑스어
 * `é`까지 같이 벗겨져 다른 낱말이 같은 것으로 보인다.
 */
const norm = (term: string) => term.replace(/́/g, '').trim().toLowerCase()

type Owner = { slug: string; file: string; lang: Language; via: 'term' | 'also' }

const owners = new Map<string, Owner>()

for (const file of readdirSync('content').filter((f) => f.endsWith('.json')).sort()) {
  const parsed = JSON.parse(readFileSync(join('content', file), 'utf8'))
  // content/에는 개념 파일이 아닌 것도 있다 — kana.json은 가나 표라 concepts가 없다
  for (const concept of (parsed.concepts as Concept[] | undefined) ?? [])
    for (const [lang, word] of Object.entries(concept.words ?? {})) {
      const put = (term: string | undefined, via: Owner['via']) => {
        const key = norm(term ?? '')
        // 먼저 적힌 것을 임자로 둔다. term이 also보다 먼저 들어오므로 정답이 이긴다
        if (key && !owners.has(key)) owners.set(key, { slug: concept.slug, file, lang: lang as Language, via })
      }
      put(word.term, 'term')
      for (const alt of word.also ?? []) put(alt, 'also')
    }
}

/**
 * 후보를 받는다.
 *
 * 인자는 **하나가 하나**다. `sweet cherry`처럼 두 낱말짜리 후보를 쪼개면 안 되기
 * 때문이다. 표준 입력은 반대로 공백으로 끊는다 — `pnpm coverage --missing`이
 * 찍은 줄을 그대로 붙여넣을 수 있어야 해서다. 한 낱말짜리 후보가 스물이 넘어가면
 * 그쪽이 편하다.
 */
const args = process.argv.slice(2)
if (args.length === 0 && process.stdin.isTTY) {
  console.error('낱말을 인자로 주거나 표준 입력으로 흘려보냅니다.\n\n  pnpm claim обида поддержка\n  pbpaste | pnpm claim')
  process.exit(1)
}
const raw = args.length > 0 ? args : readFileSync(0, 'utf8').split(/\s+/)
const candidates = [...new Set(raw.map(norm).filter((t) => /\p{L}/u.test(t)))]

/**
 * 표기가 어긋난 채 같은 것을 가리키는 자리.
 *
 * 영어 후보는 단수·복수가 갈리고(`spices` ↔ `spice`), 여러 낱말로 된 후보는
 * 그중 한 낱말이 이미 개념이다(`sweet cherry` ↔ `cherry`). 어느 쪽도 확정이
 * 아니므로 임자와 섞지 않는다 — 사람이 보고 정할 몫이다.
 */
function near(term: string): Owner | null {
  const forms = [
    term.replace(/ies$/, 'y'),
    term.replace(/(ch|sh|s|x|z)es$/, '$1'),
    term.replace(/s$/, ''),
    `${term}s`,
    // 여러 낱말이면 각각도 본다. 한 낱말짜리는 자기 자신이라 볼 것이 없다
    ...(term.includes(' ') ? term.split(' ') : []),
  ]
  for (const form of forms) if (form !== term && owners.has(form)) return owners.get(form)!
  return null
}

const taken = candidates.filter((t) => owners.has(t))
const rest = candidates.filter((t) => !owners.has(t))
const close = rest.map((t) => [t, near(t)] as const).filter((row): row is [string, Owner] => row[1] !== null)
const free = rest.filter((t) => near(t) === null)

const line = (term: string, owner: Owner, width: number) =>
  `  ${term.padEnd(width)}  ${owner.lang}  ${owner.slug}${owner.via === 'also' ? ' (also)' : ''}  ${owner.file}`

console.log(
  `후보 ${candidates.length} — 임자 있음 ${taken.length} · 비슷한 것 ${close.length} · 빈자리 ${free.length}\n`,
)

if (taken.length > 0) {
  const width = Math.max(...taken.map((t) => t.length))
  for (const term of taken) console.log(line(term, owners.get(term)!, width))
  console.log('')
}

if (close.length > 0) {
  const width = Math.max(...close.map(([term]) => term.length))
  console.log('비슷한 것 — 같은 개념인지 보고 정합니다')
  for (const [term, owner] of close) console.log(line(term, owner, width))
  console.log('')
}

if (free.length > 0) console.log(`빈자리\n  ${free.join(' ')}`)
