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

type Owner = { slug: string; file: string; lang: Language; via: 'term' | 'also'; gloss: string }

const owners = new Map<string, Owner>()

/**
 * 러시아어 어간 한 집안.
 *
 * 임자가 없어도 못 쓰는 자리가 있다. `ввозить`는 `привозить`와 접두만 다르고,
 * `унижать`는 `принижать`와, `эвакуировать`는 `эвакуироваться`와 어간이 같다.
 * 배우는 쪽에는 **한 낱말의 다른 꼴**이라 곁말로 붙일 수 없고(검사가 건다),
 * 개념으로 세우려면 뜻을 처음부터 달리 잡아야 한다.
 *
 * 그런데 지금은 배치를 다 쓴 뒤 `apply`가 표기 충돌을 낼 때에야 알아챈다.
 * 2026-09-18 하루에만 네 번 되돌렸다. 그 조회를 앞으로 옮긴다.
 *
 * 어간은 **접두와 어미를 떼어** 잡는다. 언어학적으로 맞는 어근이 아니라 —
 * `обостряться`는 `бостр`가 된다 — 같은 집안끼리 같은 열쇠로 모이면 된다.
 * **판정하지 않는다.** 한 집안이라고 찍어 줄 뿐 쓸지 말지는 사람이 정한다.
 */
const RU_PREFIX = ['пере', 'пред', 'при', 'про', 'раз', 'рас', 'вы', 'вз', 'вс', 'за', 'из', 'на', 'об', 'от', 'по', 'под', 'пре', 'со', 'в', 'о', 'с', 'у']
const RU_ENDING = ['изироваться', 'ироваться', 'изировать', 'ировать', 'оваться', 'иваться', 'ываться', 'аться', 'яться', 'иться', 'еться', 'ться', 'тись', 'ти', 'овать', 'ивать', 'ывать', 'ать', 'ять', 'ить', 'еть', 'ыть', 'ся', 'ого', 'ому', 'ый', 'ий', 'ой', 'ая', 'яя', 'ое', 'ее', 'ые', 'ие', 'а', 'о', 'у', 'ы', 'и', 'е', 'я', 'ь']

/**
 * 접두 하나와 어미 하나를 뗀 열쇠. 석 자 아래로 깎이면 떼지 않는다.
 *
 * **접두는 움직씨꼴에서만 뗀다.** 이름씨와 그림씨에서까지 떼면 뿌리의 첫 소리를
 * 접두로 잘못 보아 남남이 한 집안이 된다 — `угол`(각도)이 `гол`로, `уличный`
 * (거리의)가 `личный`로, `сообщение`(알림)이 `общение`으로 깎인다. 처음 돌렸을
 * 때 걸린 쉰 줄 가운데 절반이 그런 자리였다. 움직씨는 접두로 방향이 갈리는 것이
 * 본래 얼개라(`ввозить`·`привозить`·`вывозить`) 떼는 편이 맞다.
 *
 * **`-ировать`는 어간 뒤에 `-ир-`를 끼운다.** `реформа`에서 `реформировать`가
 * 나오는데 `овать`만 떼면 `реформир`가 되어 `реформ`과 남남이 된다. 들온말
 * 움직씨가 다 이 꼴이라(`аргументировать`·`деградировать`·`инвестировать`)
 * `ировать`를 통째로 뗀다.
 *
 * **`-ти`도 움직씨 어미다.** `вести`·`нести`가 그 꼴인데 어미 목록에 없어서
 * `повести`가 `вести`와 남남이 됐다. 어미에 넣고 움직씨 판정에도 넣는다.
 */
export function ruStem(term: string): string {
  let word = norm(term)
  if (!/^[а-яё-]+$/.test(word)) return ''
  // 열쇠에서만 `ё`를 `е`로 접는다. 뿌리가 같은데 꼴마다 갈리기 때문이다 —
  // `плевать`와 `выплёвывать`가 그렇다. 표기를 대조하는 쪽(`norm`)은 접지
  // 않는다. `все`와 `всё`는 다른 낱말이다 (scripts/torfl.ts)
  word = word.replace(/ё/g, 'е')
  // `вести`·`нести`처럼 `-ти`로 끝나는 움직씨도 접두로 갈린다 (`повести`·`увести`)
  const verb = /(ться|ть|тись|ти)$/.test(word)
  for (const ending of RU_ENDING)
    if (word.endsWith(ending) && word.length - ending.length >= 3) {
      word = word.slice(0, -ending.length)
      break
    }
  if (verb)
    for (const prefix of RU_PREFIX)
      if (word.startsWith(prefix) && word.length - prefix.length >= 3) {
        word = word.slice(prefix.length)
        break
      }
  return word.length >= 3 ? word : ''
}

/**
 * 한 낱말이 내놓는 어간 열쇠들.
 *
 * 어미를 하나만 떼면 **그림씨와 이름씨가 갈린다.** `гармоничный`는 `гармонич`가
 * 되고 `гармония`는 `гармони`가 되어 남남이 된다 — 뒤에 붙는 것이 어미 하나가
 * 아니라 `-ич-`·`-ов-`·`-н-` 같은 파생 조각이기 때문이다. 조각을 다 알아내는
 * 대신 **끝 한 글자를 깎은 열쇠를 하나 더 낸다.** 둘 중 하나라도 겹치면 한 집안이다.
 *
 * **두 글자까지 깎는다.** 2026-09-19에 B2에 남은 227로 재었다.
 *
 * | 열쇠 | 잡히는 낱말 | 줄 |
 * | --- | --- | --- |
 * | 어간만 | 40 | 195 |
 * | 한 글자 깎기 | 56 | 238 |
 * | 두 글자 깎기 | 88 | 369 |
 *
 * 한 글자에서 새로 걸린 열여섯은 모두 진짜였고(`акционерный`↔`акционер` ·
 * `шоколадный`↔`шоколад` · `ювелирный`↔`ювелир`), 두 글자에서 더 걸린 서른둘도
 * `африканец`↔`африканский` · `буддист`↔`буддизм` · `единичный`↔`единица` ·
 * `зрительный`↔`зритель`처럼 대부분 진짜다. 손으로 갈라 보니 헛것은 `подвиг`↔
 * `подвал` 하나였다. 줄이 백서른 늘지만 이 검사가 내놓는 신호는 **그 낱말이
 * 집안에 걸리느냐**이고, 줄은 사람이 훑는다.
 *
 * 관계 형용사를 넣던 회차에 이 자리를 손으로 훑어 스물아홉을 찾았는데, 그 조회가
 * 이것이다.
 *
 * 넉 자 아래로 깎이면 열쇠를 내지 않는다. `дам`이 `да`가 되면 남남끼리 묶인다.
 */
function ruKeys(term: string): string[] {
  const stem = ruStem(term)
  if (!stem) return []
  const keys = [stem]
  if (stem.length >= 5) keys.push(stem.slice(0, -1))
  if (stem.length >= 6) keys.push(stem.slice(0, -2))
  return keys
}

/**
 * 영어 어간 한 집안.
 *
 * 러시아어에서는 굴절이, 영어에서는 **파생이** 같은 일을 한다. `productivity`는
 * `productive`와, `illogical`은 `logical`과, `renewal`은 `renew`와 한 집안이다.
 * 곁말로 붙일 수 없고(품사가 다르다) 개념으로 세우려면 뜻을 갈라 잡아야 한다.
 *
 * 잡는 값은 러시아어와 다르다. 러시아어에서는 «막힌 자리를 미리 안다»가 값이었는데,
 * 영어에서는 **그 개념이 이미 어딘가 서 있는지 가리키는 이정표**가 더 크다.
 * TSL 회차를 돌 때 `renewal`이 `renew`를 가리키고 `eligible`이 `qualified`
 * 곁으로 데려간다 — 뜻이 겹치는지는 사람이 보지만, 어디를 볼지는 이것이 정한다.
 *
 * **앞가지는 뒤가 넉 자 넘게 남을 때만 뗀다.** 안 그러면 `interest`가 `est`로,
 * `impact`가 `pact`로 깎여 남남끼리 묶인다. 아니오 뜻 앞가지(`un`·`in`·`il`·`ir`)가
 * 이 검사의 절반을 버는 자리라 떼기는 해야 한다 — `unhappy`·`incomplete`·
 * `illogical`·`irregular`가 다 그 꼴이다.
 */
const EN_PREFIX = ['under', 'inter', 'over', 'anti', 'non', 'dis', 'mis', 'pre', 'sub', 'un', 'in', 'im', 'il', 'ir', 're', 'de']
const EN_ENDING = ['ivities', 'ization', 'isation', 'ibility', 'ability', 'ational', 'fulness', 'iveness', 'ousness', 'ivity', 'ation', 'ition', 'ement', 'ingly', 'ively', 'ously', 'ance', 'ence', 'ment', 'ness', 'less', 'able', 'ible', 'tion', 'sion', 'ical', 'ally', 'ings', 'ful', 'ity', 'ive', 'ize', 'ise', 'ing', 'ers', 'est', 'ed', 'er', 'ly', 'al', 'ic', 'es', 's', 'y', 'e']

/** 앞가지 하나와 어미 하나를 뗀 열쇠. 넉 자 아래로 깎이면 떼지 않는다 */
export function enStem(term: string): string {
  let word = norm(term)
  if (!/^[a-z'-]+$/.test(word)) return ''
  for (const prefix of EN_PREFIX)
    if (word.startsWith(prefix) && word.length - prefix.length >= 5) {
      word = word.slice(prefix.length)
      break
    }
  for (const ending of EN_ENDING)
    if (word.endsWith(ending) && word.length - ending.length >= 4) {
      word = word.slice(0, -ending.length)
      break
    }
  return word.length >= 4 ? word : ''
}

/**
 * 영어 한 낱말이 내놓는 어간 열쇠들.
 *
 * 러시아어와 같은 손질이다 — 어미를 하나만 떼면 파생 조각이 남아 같은 집안이
 * 갈린다. `product`와 `produce`는 끝 한 글자가 다르고, `explain`과 `explanatory`는
 * 두 글자가 다르다. 끝을 한 글자·두 글자 깎은 열쇠를 더 낸다.
 */
function enKeys(term: string): string[] {
  const stem = enStem(term)
  if (!stem) return []
  const keys = [stem]
  if (stem.length >= 6) keys.push(stem.slice(0, -1))
  if (stem.length >= 7) keys.push(stem.slice(0, -2))
  return keys
}

/** 어간 → 그 어간을 쓰는 표기들. 러시아어는 굴절로, 영어는 파생으로 모인다 */
const family = new Map<string, Array<{ term: string; owner: Owner }>>()

for (const file of readdirSync('content').filter((f) => f.endsWith('.json')).sort()) {
  const parsed = JSON.parse(readFileSync(join('content', file), 'utf8'))
  // content/에는 개념 파일이 아닌 것도 있다 — kana.json은 가나 표라 concepts가 없다
  for (const concept of (parsed.concepts as Concept[] | undefined) ?? [])
    for (const [lang, word] of Object.entries(concept.words ?? {})) {
      const put = (term: string | undefined, via: Owner['via']) => {
        const key = norm(term ?? '')
        if (!key) return
        const owner: Owner = { slug: concept.slug, file, lang: lang as Language, via, gloss: concept.meaning_ko ?? '' }
        // 먼저 적힌 것을 임자로 둔다. term이 also보다 먼저 들어오므로 정답이 이긴다
        if (!owners.has(key)) owners.set(key, owner)
        // 러시아어는 에두른 표제어가 여러 낱말이라 낱말마다 집안에 넣는다.
        // **영어는 홑낱말만 넣는다.** 파생은 낱말 하나에서 자라는데, 구를 쪼개
        // 넣으면 `send`가 든 상황 표현 열일곱 줄이 `sender` 하나에 딸려 나온다.
        // 재어 보니 660줄 가운데 절반이 그런 줄이었고, 진짜 식구는 다 홑낱말이다
        const parts = lang === 'ru' ? key.split(/\s+/) : key.includes(' ') ? [] : [key]
        if (lang === 'ru' || lang === 'en')
          for (const part of parts)
            for (const stem of (lang === 'ru' ? ruKeys : enKeys)(part))
              (family.get(`${lang}:${stem}`) ?? family.set(`${lang}:${stem}`, []).get(`${lang}:${stem}`)!).push({ term: key, owner })
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
    // 미국·영국 철자. 같은 낱말이라 곁말로 바로 붙는다
    term.replace(/ize$/, 'ise'), term.replace(/ise$/, 'ize'),
    term.replace(/ization$/, 'isation'), term.replace(/isation$/, 'ization'),
    term.replace(/or$/, 'our'), term.replace(/our$/, 'or'),
    term.replace(/orable$/, 'ourable'), term.replace(/ourable$/, 'orable'),
    term.replace(/ward$/, 'wards'), term.replace(/wards$/, 'ward'),
    // 끝 닿소리를 겹쳐 적는 자리 — `enrol`↔`enroll`·`travelled`↔`traveled`
    term.replace(/([lpt])$/, '$1$1'), term.replace(/([lpt])\1$/, '$1'),
    // 붙여 쓰기. 목록과 우리가 갈리는 자리다 — `webpage`↔`web page`
    term.replace(/-/g, ''), term.replace(/-/g, ' '),
    term.replace(/ /g, ''), term.replace(/ /g, '-'),
    // 여러 낱말이면 각각도 본다. 한 낱말짜리는 자기 자신이라 볼 것이 없다
    ...(term.includes(' ') ? term.split(' ') : []),
    // 붙여 쓴 것을 갈라 본다 — `healthcare`↔`health care`
    ...(term.includes(' ') || term.includes('-')
      ? []
      : Array.from({ length: Math.max(0, term.length - 5) }, (_, i) => i + 3).flatMap((i) => [
          `${term.slice(0, i)} ${term.slice(i)}`,
          `${term.slice(0, i)}-${term.slice(i)}`,
        ])),
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

/**
 * 임자는 없는데 어간이 같은 자리.
 *
 * 곁말로는 못 붙는다 — 한 낱말의 다른 꼴이라 검사가 건다. 개념으로 세우려면
 * 뜻을 그 집안과 갈리게 처음부터 달리 잡아야 한다. 그래서 집안 식구의 **뜻을
 * 같이 찍는다** — 뜻이 겹치는지는 표기가 아니라 뜻으로만 보인다.
 *
 * **영어에서는 쓰임이 하나 더 있다.** 2026-09-18에 TSL에 남은 332로 쟀다.
 *
 * | | 걸린 낱말 | 줄 |
 * | --- | --- | --- |
 * | 구까지 넣었을 때 | 157 | 660 |
 * | 홑낱말만 넣었을 때 | 132 | 210 |
 *
 * 줄이 3분의 1로 줄었는데 걸린 낱말은 84%가 남았다. 빠진 스물다섯은 `sender`가
 * `send`가 든 상황 표현 열일곱을 끌고 오던 줄이라, 잃은 것이 없다.
 *
 * 남은 210줄은 **뜻을 갈라 잡을 자리를 가리키는 이정표**다 — `knowledgeable`이
 * `knowledge`를, `purchaser`가 `purchase`를, `certification`이 `certificate`를
 * 가리킨다. 그 개념이 이미 서 있으면 곁말 한 줄로 끝나고, 아니면 뜻을 어디서
 * 갈라야 할지가 그 줄에 적혀 있다. 헛것도 섞인다(`distractor`↔`tractor`,
 * `instruct`↔`structure`) — 뜻을 같이 찍는 까닭이 이것이다.
 *
 * **곁말이 될 자리는 찍지 않는다. 재어 보고 버렸다.** ros-edu.ru 목록은 낱말마다
 * 영어 뜻(`word_eng`)을 달아 두므로 그것을 우리 영어 표제어와 맞대면 곁말 후보가
 * 기계로 나올 듯싶다. 2026-09-18에 B2에 남은 247을 그렇게 돌려 스물넷이 걸렸는데
 * 쓸 수 있는 것은 둘이었다(`делегат`·`заместитель` → `депутат`). 나머지는 두
 * 갈래다 — 열넷은 `шёлковый`↔`шёлк`처럼 **어간이 같아 이미 막힌** 자리였고,
 * 여덟은 영어가 두 뜻을 겹쳐 쓰는 자리였다(`record` 음반/기록, `sign` 서명/조짐,
 * `fan` 부채/열성팬, `present` 선물/지금). 스물넷을 사람이 보는 품이 둘을 줍는
 * 값보다 크다. 막힌 자리를 미리 찍는 쪽만 남긴다.
 */
const kin = free
  .map((term) => {
    // 열쇠가 둘이면 같은 식구가 두 번 걸린다. 표기로 한 번만 남긴다
    const seen = new Map<string, { term: string; owner: Owner }>()
    // 후보가 어느 글자인지로 가른다. 키릴이면 굴절, 로마자면 파생을 본다
    const lang = /[а-яё]/.test(term) ? 'ru' : 'en'
    for (const stem of (lang === 'ru' ? ruKeys : enKeys)(term))
      for (const row of family.get(`${lang}:${stem}`) ?? []) if (row.term !== term) seen.set(row.term, row)
    return [term, [...seen.values()]] as const
  })
  .filter(([, rows]) => rows.length > 0)

if (kin.length > 0) {
  const width = Math.max(...kin.map(([term]) => term.length))
  console.log('한 집안 — 어간이 같습니다. 곁말로는 못 붙이고, 뜻을 갈라 잡아야 합니다')
  for (const [term, rows] of kin)
    for (const { term: other, owner } of rows)
      console.log(`  ${term.padEnd(width)}  ${other}  ${owner.gloss}  ${owner.slug}  ${owner.file}`)
  console.log('')
}

const clear = free.filter((term) => !kin.some(([kinTerm]) => kinTerm === term))
if (clear.length > 0) console.log(`빈자리\n  ${clear.join(' ')}`)
