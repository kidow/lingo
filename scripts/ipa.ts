/**
 * 영어 발음기호(IPA). (spec.md §7)
 *
 *   node scripts/ipa.ts            전체
 *   node scripts/ipa.ts food       한 파일만
 *
 * TOEIC 카드에는 참고줄이 없었다. 표기가 곧 읽기라는 이유였는데, 영어는
 * 그 전제가 깨지는 언어다 — `receipt`도 `colonel`도 적힌 대로 읽지 않는다.
 * JLPT가 읽기를 대괄호로 보여 주듯 영어에는 **발음기호**를 보여 준다.
 * 로마자를 쓰지 않는 것은 영어를 로마자로 옮기는 일이 애초에 없기 때문이다.
 *
 * 출처는 CMU Pronouncing Dictionary다. 카네기멜런이 공개 도메인으로 내놓은
 * 13만 낱말짜리 미국식 발음 사전이고, 표기가 ARPAbet(대문자 코드 + 강세
 * 숫자)이라 IPA로 옮겨 싣는다.
 *
 *   HH AH0 L OW1  →  həˈloʊ
 *
 * **없는 낱말은 비워 둔다.** 사전에 없는 것을 규칙으로 지어내면 틀린 발음을
 * 가르치게 된다 (§5). 여러 낱말로 된 표제어는 낱말마다 찾아 붙이되, 하나라도
 * 빠지면 통째로 비운다 — 반만 맞는 발음기호가 더 나쁘다.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Concept } from '../lib/types.ts'

const CONTENT_DIR = 'content'
const DICT_URL = 'https://raw.githubusercontent.com/cmusphinx/cmudict/master/cmudict.dict'

/**
 * ARPAbet → IPA. 강세 숫자(0·1·2)는 따로 떼어 ˈ와 ˌ로 옮긴다.
 *
 * 모음은 미국식 사전에 맞춘다 — `ɑ`(father)와 `ɔ`(thought)를 가른다.
 *
 * 자음 R은 음성학 기호 `ɹ`가 아니라 **`r`로 적는다.** 옥스퍼드·롱맨 같은
 * 학습자 사전이 그렇게 싣기 때문이다 — 카드를 보는 사람은 음성학자가 아니라
 * 학습자다. 같은 이유로 ER은 `ɝ` 대신 `ɜr`로 푼다.
 */
const ARPA: Record<string, string> = {
  AA: 'ɑ', AE: 'æ', AH: 'ʌ', AO: 'ɔ', AW: 'aʊ', AY: 'aɪ',
  EH: 'ɛ', ER: 'ɜr', EY: 'eɪ', IH: 'ɪ', IY: 'i', OW: 'oʊ',
  OY: 'ɔɪ', UH: 'ʊ', UW: 'u',
  B: 'b', CH: 'tʃ', D: 'd', DH: 'ð', F: 'f', G: 'ɡ', HH: 'h',
  JH: 'dʒ', K: 'k', L: 'l', M: 'm', N: 'n', NG: 'ŋ', P: 'p',
  R: 'r', S: 's', SH: 'ʃ', T: 't', TH: 'θ', V: 'v', W: 'w',
  Y: 'j', Z: 'z', ZH: 'ʒ',
}

/** 강세 없는 AH는 슈와다. 사전이 둘을 같은 코드로 적는다 */
const schwa = (symbol: string, stress: string) => (symbol === 'AH' && stress === '0' ? 'ə' : null)

/** 사전이 모음에만 강세 숫자를 붙인다 */
const isVowel = (token: string) => /[0-2]$/.test(token)

/**
 * 강세 부호는 **음절 앞**에 붙는다 — `ˈkɑfi`이지 `kˈɑfi`가 아니다.
 *
 * 사전은 강세를 모음에 매겨 두므로 그 모음 앞에 붙은 자음까지 거슬러 올라가
 * 음절 머리를 찾아야 한다. 앞 모음 다음의 자음들이 그 음절의 머리다.
 */
function toIpa(arpabet: string[]): string | null {
  const out: string[] = []
  let onset = 0 // 지금까지 쌓인 자음이 시작되는 자리
  for (const token of arpabet) {
    const match = /^([A-Z]+)([0-2]?)$/.exec(token)
    if (!match) return null
    const [, symbol, stress] = match
    const sound = schwa(symbol, stress) ?? ARPA[symbol]
    if (!sound) return null
    if (isVowel(token)) {
      const mark = stress === '1' ? 'ˈ' : stress === '2' ? 'ˌ' : ''
      if (mark) out.splice(onset, 0, mark)
      out.push(sound)
      onset = out.length // 다음 음절의 머리는 이 모음 바로 뒤부터다
    } else {
      out.push(sound)
    }
  }
  return out.join('')
}

/** 낱말 → 발음기호. 동음이의 항목(`read(2)`)은 첫 번째만 쓴다 */
async function dictionary(): Promise<Map<string, string>> {
  const text = await (await fetch(DICT_URL)).text()
  const map = new Map<string, string>()
  for (const raw of text.split('\n')) {
    const line = raw.split('#')[0].trim()
    if (!line) continue
    const [head, ...sounds] = line.split(/\s+/)
    // `read(2)`는 두 번째 발음이다. 첫 번째만 남긴다
    if (head.includes('(')) continue
    const ipa = toIpa(sounds)
    if (ipa) map.set(head.toLowerCase(), ipa)
  }
  return map
}

/**
 * 표제어 전체의 발음기호. 낱말마다 찾아 공백으로 잇는다.
 *
 * 사전 표제어는 `don't`처럼 아포스트로피를 살리고 하이픈은 쓰지 않는다.
 * 그래서 하이픈은 낱말 경계로 보고 자른다.
 */
function lookup(term: string, dict: Map<string, string>): string | null {
  const words = term.toLowerCase().replace(/[.,!?]/g, '').split(/[\s-]+/).filter(Boolean)
  if (words.length === 0) return null
  const parts = words.map((word) => dict.get(word))
  if (parts.some((part) => !part)) return null
  return parts.join(' ')
}

const only = process.argv[2]
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

  for (const concept of data.concepts) {
    const word = concept.words.en
    if (!word || word.romanization) continue
    const ipa = lookup(word.term, dict)
    if (!ipa) {
      missing += 1
      unknown.push(word.term)
      continue
    }
    word.romanization = ipa
    filled += 1
    touched = true
  }

  if (touched) writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
}

console.log(`\n발음기호 ${filled}건을 채웠습니다`)
if (missing > 0) {
  console.log(`사전에 없어 비워 둔 것 ${missing}건`)
  console.log(`  ${unknown.slice(0, 12).join(' · ')}${unknown.length > 12 ? ' …' : ''}`)
}
console.log('')
