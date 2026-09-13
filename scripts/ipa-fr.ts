/**
 * 프랑스어 발음기호(IPA). (spec.md §7)
 *
 *   node scripts/ipa-fr.ts            전체
 *   node scripts/ipa-fr.ts food       한 파일만
 *   node scripts/ipa-fr.ts --refresh  사전을 다시 받는다
 *
 * 참고줄을 두는 언어는 표기가 소리를 안 보여 주는 언어다(§4). 프랑스어가
 * 그렇다 — `doigt`는 /dwa/고 `monsieur`는 /məsjø/고 `seconde`의 c는 /g/다.
 * 스페인어·독일어는 철자와 소리가 대체로 맞물려 참고줄을 두지 않는다.
 *
 * 출처는 **Lexique 383**이다(lexique.org, CC BY-SA 4.0). 프랑스어 심리언어학
 * 데이터베이스로 철자 12만 개에 발음이 붙어 있고, 활용형과 복수형까지 실려
 * 있다 — `coûte`도 `chaussures`도 표제형을 거치지 않고 바로 찾힌다.
 *
 * Wiktionary를 긁어 만든 wikipron도 후보였지만 버렸다. 한 낱말에 발음이 여럿
 * 실리는데 순서가 품질순이 아니라서, 첫 줄을 집으면 `chat`이 /tʃat/으로 나오고
 * `fils`에는 영어에서 흘러든 /fɪs/가 섞인다. 틀린 기호는 없느니만 못하다.
 *
 * Lexique은 제 표기를 쓴다. IPA로 옮겨 싣는다.
 *
 *   Sa    →  ʃa        (chat)
 *   t@    →  tɑ̃        (temps)
 *   m°sj2 →  məsjø     (monsieur)
 *
 * 한 철자에 발음이 둘 이상이면 **빈도가 높은 쪽**을 집는다. `fils`는 /fil/(실)과
 * /fis/(아들)이 다 실려 있는데, 빈도를 보면 후자가 서른 배 넘게 흔하다.
 *
 * **없는 낱말은 비워 둔다.** 규칙으로 지어내면 틀린 발음을 가르치게 된다 (§5).
 * 여러 낱말로 된 표제어는 낱말마다 찾아 붙이되, 하나라도 빠지면 통째로 비운다.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Concept } from '../lib/types.ts'
import { cachedBytes } from './cache.ts'

const CONTENT_DIR = 'content'
const DICT_URL = 'http://www.lexique.org/databases/Lexique383/Lexique383.tsv'

/**
 * Lexique 표기 → IPA. 적히지 않은 글자는 IPA와 같은 글자다.
 *
 * 학습자 사전 표기를 쓴다(§4). 프랑스어 사전은 구개수음을 `ʁ`로 싣지
 * `ʀ`나 `r`로 싣지 않아서, 영어에서 `ɹ` 대신 `r`을 쓴 것과 달리 여기서는
 * `ʁ`가 그대로 학습자 표기다.
 */
const LEXIQUE: Record<string, string> = {
  '1': 'œ̃', // aucun /okœ̃/
  '2': 'ø', // peu /pø/
  '5': 'ɛ̃', // pain /pɛ̃/
  '8': 'ɥ', // huit /ɥit/
  '9': 'œ', // peur /pœʁ/
  '@': 'ɑ̃', // temps /tɑ̃/
  '§': 'ɔ̃', // pont /pɔ̃/
  '°': 'ə', // petit /pəti/
  E: 'ɛ', // mère /mɛʁ/
  O: 'ɔ', // port /pɔʁ/
  R: 'ʁ', // rue /ʁy/
  S: 'ʃ', // chat /ʃa/
  Z: 'ʒ', // jour /ʒuʁ/
  N: 'ɲ', // agneau /aɲo/
  G: 'ŋ', // parking /paʁkiŋ/ — 외래어에만 나온다
}

const toIpa = (phon: string) => [...phon].map((ch) => LEXIQUE[ch] ?? ch).join('')

/**
 * 합자와 굽은 아포스트로피를 편다. 우리 콘텐츠는 `cœur`로 적고 Lexique은
 * `coeur`로 싣는다 — 펴 두지 않으면 `œ`가 든 낱말이 통째로 빠진다.
 */
const normalize = (text: string) =>
  text.toLowerCase().replace(/œ/g, 'oe').replace(/æ/g, 'ae').replace(/’/g, "'")

/** 철자 → 발음. 같은 철자가 여럿이면 빈도가 높은 쪽만 남긴다 */
async function dictionary(): Promise<Map<string, string>> {
  const bytes = await cachedBytes('lexique383.tsv', async () => {
    const response = await fetch(DICT_URL)
    if (!response.ok) throw new Error(`Lexique를 못 받았습니다 (HTTP ${response.status})`)
    return Buffer.from(await response.arrayBuffer())
  })

  const lines = bytes.toString('utf8').split('\n')
  const header = lines[0]!.split('\t')
  const column = {
    ortho: header.indexOf('ortho'),
    phon: header.indexOf('phon'),
    films: header.indexOf('freqfilms2'),
    books: header.indexOf('freqlivres'),
  }
  if (Object.values(column).some((index) => index < 0)) {
    throw new Error('Lexique의 열 이름이 바뀌었습니다 — ortho·phon·freqfilms2·freqlivres')
  }

  const map = new Map<string, string>()
  const seen = new Map<string, number>()
  for (const line of lines.slice(1)) {
    const cells = line.split('\t')
    const ortho = cells[column.ortho]
    const phon = cells[column.phon]
    if (!ortho || !phon) continue
    // 영화 자막과 책, 두 말뭉치의 빈도를 더해 견준다. 한쪽에만 흔한 낱말이 있다
    const frequency =
      (Number.parseFloat(cells[column.films] ?? '') || 0) +
      (Number.parseFloat(cells[column.books] ?? '') || 0)
    const key = normalize(ortho)
    if ((seen.get(key) ?? -1) >= frequency) continue
    seen.set(key, frequency)
    map.set(key, phon)
  }
  return map
}

/**
 * 축약 접두. `c'est`의 `c'`는 낱말이 아니라 사전에 없다.
 *
 * 일곱을 적어 두면 우리 표제어에서 이 갈래는 다 덮인다. 뒤에 오는 낱말과
 * 이어 읽히지만(`c'est` /sɛ/), 카드는 낱말 단위로 보여 주므로 갈라 둔다.
 */
const ELISION: Record<string, string> = {
  "c'": 's',
  "d'": 'd',
  "j'": 'Z',
  "l'": 'l',
  "m'": 'm',
  "n'": 'n',
  "qu'": 'k',
  "s'": 's',
  "t'": 't',
}

/** 표제어를 사전에서 찾을 조각으로 가른다. 통째로 실린 것은 가르지 않는다 */
function pieces(term: string, dict: Map<string, string>): string[] {
  const out: string[] = []
  const chunks = normalize(term)
    .replace(/[?!.,;:«»"]/g, ' ')
    .split(/[\s-]+/)
    .filter(Boolean)
  for (const chunk of chunks) {
    // `aujourd'hui`처럼 아포스트로피째 실린 것이 있다. 먼저 통째로 본다
    if (dict.has(chunk)) {
      out.push(chunk)
      continue
    }
    const cut = chunk.indexOf("'")
    if (cut >= 0) out.push(chunk.slice(0, cut + 1), chunk.slice(cut + 1))
    else out.push(chunk)
  }
  return out.filter(Boolean)
}

function lookup(term: string, dict: Map<string, string>): string | null {
  const parts = pieces(term, dict)
  if (parts.length === 0) return null
  const sounds = parts.map((part) => dict.get(part) ?? ELISION[part])
  if (sounds.some((sound) => !sound)) return null
  return sounds.map((sound) => toIpa(sound!)).join(' ')
}

const force = process.argv.includes('--force')
const only = process.argv.slice(2).find((argument) => !argument.startsWith('--'))
const files = readdirSync(CONTENT_DIR)
  .filter((name) => name.endsWith('.json'))
  .filter((name) => !only || name === `${only}.json`)

if (files.length === 0) {
  console.error(`content/${only}.json 이 없습니다`)
  process.exit(1)
}

const dict = await dictionary()
let filled = 0
let missing = 0
const unknown: string[] = []

for (const name of files) {
  const path = join(CONTENT_DIR, name)
  const data = JSON.parse(readFileSync(path, 'utf8')) as { concepts: Concept[] }
  let touched = false

  for (const concept of data.concepts ?? []) {
    const word = concept.words.fr
    if (!word || (word.romanization && !force)) continue
    const ipa = lookup(word.term, dict)
    if (!ipa) {
      missing += 1
      unknown.push(word.term)
      continue
    }
    if (word.romanization === ipa) continue
    word.romanization = ipa
    filled += 1
    touched = true
  }

  if (touched) writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
}

console.log(`\n프랑스어 발음기호 ${filled}건을 채웠습니다`)
if (missing > 0) {
  console.log(`사전에 없어 비워 둔 것 ${missing}건`)
  console.log(`  ${unknown.slice(0, 12).join(' · ')}${unknown.length > 12 ? ' …' : ''}`)
}
console.log('')
