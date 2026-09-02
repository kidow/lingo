/**
 * 예문 로마자 표기를 채운다. (spec.md §5)
 *
 * 일본어와 중국어는 예문을 읽을 수 없으면 소리 내 볼 수 없다. 낱말에는
 * `romanization`이 있는데 예문에는 없어서, 카드 아래 예문만 읽기가 끊겼다.
 *
 * **손으로 쓰지 않고 규칙으로 만든다.**
 *
 * - 일본어 예문은 규칙상 かな로만 쓴다(한자 없음). 그래서 표를 태우면
 *   헵번식 로마자가 결정적으로 나온다 — 사람이 판단할 자리가 없다.
 * - 중국어는 한자 → 병음이 사전 없이는 안 된다. 다음자(多音字) 때문에
 *   글자 단위로 찍으면 틀린다(`长`·`了`·`不`). CC-CEDICT를 받아
 *   **낱말 단위 최장 일치**로 끊고, 그 낱말의 병음을 쓴다.
 *
 * CC-CEDICT는 CC BY-SA 4.0이다. 받은 파일은 .cache/에 두고 커밋하지 않는다.
 *
 * ```bash
 * pnpm romanize            # 전체
 * pnpm romanize food       # 한 파일만
 * ```
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { gunzipSync } from 'node:zlib'

const CONTENT_DIR = join(import.meta.dirname, '..', 'content')
const CACHE_DIR = join(import.meta.dirname, '..', '.cache')
const CEDICT_URL = 'https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz'

// ── 일본어: かな → 헵번식 로마자 ────────────────────────────────────────

/** 요음(拗音)부터 본다. 두 글자가 한 소리이므로 한 글자 표보다 먼저다 */
const DIGRAPHS: Record<string, string> = {
  きゃ: 'kya', きゅ: 'kyu', きょ: 'kyo', しゃ: 'sha', しゅ: 'shu', しょ: 'sho',
  ちゃ: 'cha', ちゅ: 'chu', ちょ: 'cho', にゃ: 'nya', にゅ: 'nyu', にょ: 'nyo',
  ひゃ: 'hya', ひゅ: 'hyu', ひょ: 'hyo', みゃ: 'mya', みゅ: 'myu', みょ: 'myo',
  りゃ: 'rya', りゅ: 'ryu', りょ: 'ryo', ぎゃ: 'gya', ぎゅ: 'gyu', ぎょ: 'gyo',
  じゃ: 'ja', じゅ: 'ju', じょ: 'jo', びゃ: 'bya', びゅ: 'byu', びょ: 'byo',
  ぴゃ: 'pya', ぴゅ: 'pyu', ぴょ: 'pyo',
  ふぁ: 'fa', ふぃ: 'fi', ふぇ: 'fe', ふぉ: 'fo', てぃ: 'ti', でぃ: 'di',
  でゅ: 'dyu', とぅ: 'tu', どぅ: 'du', うぃ: 'wi', うぇ: 'we', うぉ: 'wo',
  ゔぁ: 'va', ゔぃ: 'vi', ゔぇ: 've', ゔぉ: 'vo', しぇ: 'she', ちぇ: 'che', じぇ: 'je',
}

const KANA: Record<string, string> = {
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  わ: 'wa', ゐ: 'i', ゑ: 'e', を: 'o', ん: 'n',
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
  ゔ: 'vu', ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o',
}

const LONG: Record<string, string> = { a: 'ā', i: 'ī', u: 'ū', e: 'ē', o: 'ō' }

/** カタカナ → ひらがな. 표를 하나로 유지하려고 앞에서 낮춘다 */
function toHiragana(text: string): string {
  return text.replace(/[\u30a1-\u30f6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))
}

/** かな 한 덩이(띄어쓰기 없는 낱말)를 로마자로 */
function romajiWord(kana: string): string {
  const text = toHiragana(kana)
  let out = ''
  for (let i = 0; i < text.length; ) {
    const pair = text.slice(i, i + 2)
    if (DIGRAPHS[pair]) {
      out += DIGRAPHS[pair]
      i += 2
      continue
    }
    const ch = text[i]!
    if (ch === 'っ') {
      // 촉음은 다음 자음을 겹친다. 뒤가 없으면 버린다
      const next = text.slice(i + 1, i + 3)
      const sound = DIGRAPHS[next] ?? KANA[text[i + 1] ?? ''] ?? ''
      if (sound) out += sound.startsWith('ch') ? 't' : sound[0]
      i += 1
      continue
    }
    if (ch === 'ー') {
      // 장음 부호는 앞 모음을 늘인다
      const last = out.at(-1) ?? ''
      out = LONG[last] ? out.slice(0, -1) + LONG[last] : out
      i += 1
      continue
    }
    if (KANA[ch]) {
      // ん 다음에 모음·y가 오면 음절 경계가 흐려진다. 아포스트로피로 끊는다
      if (out.endsWith('n') && /^[あいうえおやゆよ]$/.test(ch)) out += "'"
      out += KANA[ch]
      i += 1
      continue
    }
    out += ch
    i += 1
  }
  return longVowels(out)
}

/** おう·うう 같은 연속 모음을 장음 기호로 접는다 */
function longVowels(text: string): string {
  return text
    .replace(/ou/g, 'ō')
    .replace(/oo/g, 'ō')
    .replace(/uu/g, 'ū')
    .replace(/aa/g, 'ā')
}

const JA_PUNCT: Record<string, string> = { '。': '.', '、': ',', '？': '?', '！': '!', '　': ' ' }

/**
 * 조사는 앞말에서 떼고 소리도 바꾼다. は는 wa, へ는 e, を는 o다.
 *
 * 붙여 두면 `ほんを よむ`가 `hono yomu`가 되어 읽을 수 없다. 그런데 무턱대고
 * 떼면 `しごと`가 `shigo to`가 된다 — 낱말 끝 글자가 조사와 같은 글자다.
 * 그래서 **콘텐츠에 있는 일본어 읽기를 사전으로 삼아**, 토큰 전체가 아는
 * 낱말이면 떼지 않는다. 조사는 한 번만 뗀다.
 */
/** 어간이 한 글자여도 뗄 수 있는 조사. 이 넷은 낱말 끝소리로 거의 안 온다 */
const STRONG = new Set(['は', 'が', 'を', 'へ'])

const PARTICLES: [string, string][] = [
  ['から', 'kara'], ['まで', 'made'], ['より', 'yori'], ['では', 'de wa'],
  ['は', 'wa'], ['へ', 'e'], ['を', 'o'], ['が', 'ga'], ['に', 'ni'],
  ['で', 'de'], ['と', 'to'], ['も', 'mo'], ['の', 'no'],
]

/** 붙여 쓰지만 한 낱말로 읽는 꼬리. 조사보다 먼저 뗀다 */
const TAILS: [string, string][] = [['ですか', 'desu ka'], ['でした', 'deshita'], ['です', 'desu']]

function splitParticle(token: string, known: Set<string>): string[] {
  if (known.has(token)) return [token]
  for (const [tail, romaji] of TAILS) {
    if (token.endsWith(tail) && token.length > tail.length) {
      const stem = token.slice(0, -tail.length)
      return [...splitParticle(stem, known), `\u0000${romaji}`]
    }
  }
  for (const [particle, romaji] of PARTICLES) {
    if (!token.endsWith(particle)) continue
    const stem = token.slice(0, -particle.length)
    // 어간이 한 글자면 그 글자가 조사일 확률보다 낱말일 확률이 높다 (`うで`·`そで`).
    // 다만 は·が·を·へ는 낱말 끝소리로 거의 오지 않아 한 글자 어간도 뗀다 (`えが`)
    if ([...stem].length === 0) continue
    if ([...stem].length < 2 && !STRONG.has(particle)) continue
    if (known.has(stem + particle)) continue
    return [stem, `\u0000${romaji}`]
  }
  return [token]
}

function romajiSentence(text: string, known: Set<string>): string {
  return text
    .split(/(\s+)/)
    .map((token) => {
      if (/^\s+$/.test(token)) return token
      const punct = [...token].every((ch) => JA_PUNCT[ch])
      if (punct) return [...token].map((ch) => JA_PUNCT[ch]).join('')
      let word = token
      let tail = ''
      while (word.length > 0 && JA_PUNCT[word.at(-1)!]) {
        tail = JA_PUNCT[word.at(-1)!] + tail
        word = word.slice(0, -1)
      }
      const parts = splitParticle(word, known)
        .map((part) => (part.startsWith('\u0000') ? part.slice(1) : romajiWord(part)))
        .filter(Boolean)
      return parts.join(' ') + tail
    })
    .join('')
    .trim()
}

// ── 러시아어: 키릴 → 로마자 ────────────────────────────────────────────

/**
 * 키릴은 글자와 소리가 거의 일대일이라 표 하나로 끝난다. 사전이 필요 없다.
 *
 * 표기는 BGN/PCGN을 따르되 학습자용으로 경음·연음 부호(ъ·ь)는 버린다 —
 * 소리로 드러나지 않는 기호를 로마자에 남기면 읽기만 어려워진다.
 */
const CYRILLIC: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh',
  щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
}

function translit(text: string): string {
  let out = ''
  for (const ch of text) {
    const lower = ch.toLowerCase()
    const mapped = CYRILLIC[lower]
    if (mapped === undefined) {
      out += ch
      continue
    }
    // 대문자는 첫 글자만 올린다. `Я` → `Ya`이지 `YA`가 아니다
    out += ch === lower ? mapped : mapped.charAt(0).toUpperCase() + mapped.slice(1)
  }
  return out
}

// ── 중국어: 한자 → 병음 (CC-CEDICT 낱말 단위 최장 일치) ────────────────

const TONES: Record<string, string[]> = {
  a: ['ā', 'á', 'ǎ', 'à'], e: ['ē', 'é', 'ě', 'è'], i: ['ī', 'í', 'ǐ', 'ì'],
  o: ['ō', 'ó', 'ǒ', 'ò'], u: ['ū', 'ú', 'ǔ', 'ù'], ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
}

/** `zhong1` → `zhōng`. 성조는 a·o·e 우선, iu/ui는 뒤 모음에 붙인다 */
function toneMark(syllable: string): string {
  const tone = Number(syllable.at(-1))
  const base = /[1-5]/.test(syllable.at(-1) ?? '') ? syllable.slice(0, -1) : syllable
  const plain = base.replace(/u:/g, 'ü').replace(/v/g, 'ü')
  if (!tone || tone === 5) return plain
  const vowels = [...plain].map((ch, i) => [ch, i] as const).filter(([ch]) => /[aeiouü]/.test(ch))
  if (vowels.length === 0) return plain
  const pick =
    vowels.find(([ch]) => ch === 'a') ??
    vowels.find(([ch]) => ch === 'o') ??
    vowels.find(([ch]) => ch === 'e') ??
    vowels.at(-1)!
  const [ch, index] = pick
  const marked = TONES[ch]?.[tone - 1] ?? ch
  return plain.slice(0, index) + marked + plain.slice(index + 1)
}

const ZH_PUNCT: Record<string, string> = {
  '。': '.', '，': ',', '？': '?', '！': '!', '：': ':', '、': ',', '；': ';',
  '（': '(', '）': ')', '“': '"', '”': '"',
}

/**
 * 빈도로도 안 갈리는 한 글자. 문맥을 봐야 하는 글자들이라 손으로 못 박는다.
 *
 * 이 표는 **자주 나오는 기능어**만 담는다. 다음자를 전부 풀려면 품사 분석이
 * 필요한데, 예문은 짧고 쉬운 문장이라 이 정도로 충분하다.
 */
const SINGLE_CHAR: Record<string, string> = {
  还: 'hai2', 的: 'de5', 了: 'le5', 得: 'de5', 地: 'di4', 着: 'zhe5', 过: 'guo4',
  都: 'dou1', 会: 'hui4', 好: 'hao3', 为: 'wei4', 中: 'zhong1', 行: 'xing2',
  教: 'jiao1', 干: 'gan4', 空: 'kong1', 少: 'shao3', 只: 'zhi3', 重: 'zhong4',
}

async function cedict(): Promise<Map<string, string>> {
  mkdirSync(CACHE_DIR, { recursive: true })
  const file = join(CACHE_DIR, 'cedict.txt')
  if (!existsSync(file)) {
    process.stdout.write('CC-CEDICT 내려받는 중… ')
    const response = await fetch(CEDICT_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!response.ok) throw new Error(`CC-CEDICT ${response.status}`)
    const text = gunzipSync(Buffer.from(await response.arrayBuffer())).toString('utf8')
    writeFileSync(file, text)
    process.stdout.write('완료\n')
  }
  const map = new Map<string, string>()
  /** 한 글자 표제어의 읽기 후보. 여러 낱말에서 실제로 쓰인 횟수를 센다 */
  const charCounts = new Map<string, Map<string, number>>()
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    if (line.startsWith('#')) continue
    const match = /^(\S+) (\S+) \[([^\]]+)\]/.exec(line)
    if (!match) continue
    const [, , simplified, pinyin] = match
    if (!simplified || !pinyin) continue
    // CC-CEDICT는 고유명사 읽기를 대문자로 적는다(`海 Hai3`는 성씨다).
    // 보통 읽기가 있으면 그쪽을 쓴다 — 예문은 사람 이름이 아니다
    const previous = map.get(simplified)
    const isProper = /^[A-Z]/.test(pinyin)
    if (!previous || (/^[A-Z]/.test(previous) && !isProper)) map.set(simplified, pinyin)

    // 낱말 안에서 그 글자가 어떻게 읽혔는지를 센다. 사전 순서는 빈도가 아니다 —
    // `上`은 shang3이 먼저 나오지만 실제로 쓰이는 읽기는 shàng이다
    const chars = [...simplified]
    const syllables = pinyin.split(/\s+/)
    if (chars.length < 2 || chars.length !== syllables.length || isProper) continue
    for (const [index, char] of chars.entries()) {
      const syllable = syllables[index]!.toLowerCase()
      if (syllable.endsWith('5')) continue // 경성은 그 글자의 본래 읽기가 아니다
      const counts = charCounts.get(char) ?? new Map<string, number>()
      counts.set(syllable, (counts.get(syllable) ?? 0) + 1)
      charCounts.set(char, counts)
    }
  }
  // 한 글자 표제어를 가장 흔한 읽기로 덮는다
  for (const [char, counts] of charCounts) {
    if (!map.has(char)) continue
    const best = [...counts].sort((a, b) => b[1] - a[1])[0]
    if (best) map.set(char, best[0])
  }
  for (const [char, pinyin] of Object.entries(SINGLE_CHAR)) map.set(char, pinyin)
  return map
}

function pinyinSentence(text: string, dict: Map<string, string>): string {
  const words: string[] = []
  for (let i = 0; i < text.length; ) {
    const ch = text[i]!
    if (ZH_PUNCT[ch]) {
      // 문장부호는 앞 낱말에 붙인다 — 병음에서도 띄지 않는다
      if (words.length > 0) words[words.length - 1] += ZH_PUNCT[ch]
      else words.push(ZH_PUNCT[ch]!)
      i += 1
      continue
    }
    if (!/[\u4e00-\u9fff]/.test(ch)) {
      words.push(ch)
      i += 1
      continue
    }
    let hit = ''
    for (let len = Math.min(6, text.length - i); len >= 1; len -= 1) {
      const slice = text.slice(i, i + len)
      if (dict.has(slice)) {
        hit = slice
        break
      }
    }
    if (!hit) {
      words.push(ch)
      i += 1
      continue
    }
    const syllables = dict.get(hit)!.split(/\s+/).map(toneMark)
    words.push(syllables.join(''))
    i += hit.length
  }
  const sentence = words.join(' ').replace(/\s+([.,?!:;)])/g, '$1').trim().toLowerCase()
  return sentence.charAt(0).toUpperCase() + sentence.slice(1)
}

// ── 실행 ────────────────────────────────────────────────────────────────

const only = process.argv[2]
const files = readdirSync(CONTENT_DIR)
  .filter((name) => name.endsWith('.json'))
  .filter((name) => !only || name === `${only}.json`)

if (files.length === 0) {
  console.error(`content/${only}.json 이 없습니다`)
  process.exit(1)
}

const dict = await cedict()

/** 일본어 조사 판정에 쓰는 사전. 콘텐츠의 읽기가 곧 아는 낱말이다 */
const known = new Set<string>()
for (const name of readdirSync(CONTENT_DIR).filter((n) => n.endsWith('.json'))) {
  const data = JSON.parse(readFileSync(join(CONTENT_DIR, name), 'utf8'))
  for (const concept of data.concepts) {
    const reading = concept.words?.ja?.reading
    if (reading) known.add(reading)
  }
}

let filled = 0

for (const name of files) {
  const path = join(CONTENT_DIR, name)
  const data = JSON.parse(readFileSync(path, 'utf8'))
  let touched = 0
  for (const concept of data.concepts) {
    for (const [lang, word] of Object.entries(concept.words) as [string, Record<string, any>][]) {
      // 예문은 한 줄일 수도 여러 줄일 수도 있다 (lib/types.ts). 전부 채운다
      const sentences: Record<string, any>[] = word.examples?.length
        ? word.examples
        : word.example
          ? [word.example]
          : []
      for (const example of sentences) {
        const value =
          lang === 'ja' ? romajiSentence(example.text, known)
          : lang === 'zh' ? pinyinSentence(example.text, dict)
          : lang === 'ru' ? translit(example.text)
          : undefined
        if (value && example.romanization !== value) {
          example.romanization = value
          touched += 1
        }
      }

      /**
       * 낱말 자체의 로마자.
       *
       * 오래 러시아어에만 채웠다. 그래서 일본어·중국어에는 빈 자리가 817개
       * 남았고, 소개 카드가 그 자리를 표기로 메워 `[計量カップ]`처럼 한자를
       * 발음인 양 보여줬다. 카드 쪽도 고쳤지만(components/cards.tsx) 값이
       * 있어야 발음 보조가 제 일을 한다.
       *
       * 일본어는 **읽기**에서 딴다 — 표기는 한자라 소리가 안 나온다.
       */
      const surface = lang === 'ja' ? word.reading : word.term
      if (surface) {
        const value =
          lang === 'ja' ? romajiSentence(surface, known)
          : lang === 'zh' ? pinyinSentence(surface, dict)
          : lang === 'ru' ? translit(surface)
          : undefined
        if (value && word.romanization !== value) {
          word.romanization = value
          touched += 1
        }
      }

      const example = sentences[0]
      if (!example?.text && lang !== 'ru') continue
      if (!example?.text && lang === 'ru') {
        if (word.term && word.romanization !== translit(word.term)) {
          word.romanization = translit(word.term)
          touched += 1
        }
        continue
      }
      // 러시아어는 낱말 자체도 키릴이라 참고줄에 로마자가 필요하다 (lib/lang.ts)
      if (lang === 'ru' && word.term) {
        const term = translit(word.term)
        if (word.romanization !== term) {
          word.romanization = term
          touched += 1
        }
      }
    }
  }
  if (touched > 0) {
    writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`)
    filled += touched
  }
  console.log(`${name.replace('.json', '').padEnd(10)} ${touched}건`)
}

console.log(`\n예문 로마자 ${filled}건을 채웠습니다`)
