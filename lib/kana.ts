import { confusablesOf } from './confusables.ts'
import { hashString, makeRng, shuffled } from './random.ts'
import { RUNG_CHOICE, type Ladder } from './progress.ts'

/**
 * 가나 도표와 출제 규칙. (docs/kana-tab-design.md)
 *
 * JLPT 트랙 안의 `가나` 덱이 쓴다. 개념이 아니라 **글자**를 카드로 세우는
 * 자리라 한능검(lib/hanja.ts)과 구조가 같다 — 소개 한 장에 양방향 4지선다
 * 둘, 사다리는 한 칸이다.
 *
 * **도표는 콘텐츠가 아니라 코드에 있다.** 글자·로마자·행·갈래는 고르는 것이
 * 아니라 정해진 것이다. 사람이 고르는 것은 예시 낱말뿐이고 그것만
 * `content/kana.json`에 있다.
 */

/** 갈래. 공개를 이 단위로 끊는다 — 격자에 구멍이 나면 눈에 보인다 (§8) */
export type KanaKind = 'sei' | 'daku' | 'yoon'
export type KanaScript = 'hira' | 'kata'
export const KANA_SCRIPTS = ['hira', 'kata'] as const
export const SCRIPT_LABEL: Record<KanaScript, string> = { hira: '히라가나', kata: '가타카나' }

export type KanaUnit = {
  /** 고유 키. 진도 키와 데이터 키가 된다 */
  id: string
  /** 화면에 보일 소리. `id`와 다를 수 있다 — 로마자는 충돌하고 키는 고유해야 한다 */
  romaji: string
  /** 행. 오답 후보를 같은 자음에서 먼저 뽑는다 */
  row: string
  kind: KanaKind
  /** 히라가나 표기. `みゅ`·`ぴゅ`만 `null`이다 — 사전에 낱말이 없다 */
  hira: string | null
  /**
   * 가타카나 표기. `ヲ`·`ヂ`·`ヅ`·`ピャ`가 `null`이다 (위 `UNUSED`)
   */
  kata: string | null
}

/**
 * `id:히라가나` 목록. 가타카나는 코드포인트 +0x60으로 **유도한다** — 두 벌을
 * 손으로 적으면 한쪽만 고쳐지는 날이 온다.
 */
const SEI =
  'a:あ i:い u:う e:え o:お ka:か ki:き ku:く ke:け ko:こ sa:さ shi:し su:す se:せ so:そ ' +
  'ta:た chi:ち tsu:つ te:て to:と na:な ni:に nu:ぬ ne:ね no:の ha:は hi:ひ fu:ふ he:へ ho:ほ ' +
  'ma:ま mi:み mu:む me:め mo:も ya:や yu:ゆ yo:よ ra:ら ri:り ru:る re:れ ro:ろ wa:わ wo:を n:ん'

const DAKU =
  'ga:が gi:ぎ gu:ぐ ge:げ go:ご za:ざ ji:じ zu:ず ze:ぜ zo:ぞ ' +
  'da:だ dji:ぢ dzu:づ de:で do:ど ba:ば bi:び bu:ぶ be:べ bo:ぼ pa:ぱ pi:ぴ pu:ぷ pe:ぺ po:ぽ'

const YOON =
  'kya:きゃ kyu:きゅ kyo:きょ sha:しゃ shu:しゅ sho:しょ cha:ちゃ chu:ちゅ cho:ちょ ' +
  'nya:にゃ nyu:にゅ nyo:にょ hya:ひゃ hyu:ひゅ hyo:ひょ mya:みゃ myu:みゅ myo:みょ ' +
  'rya:りゃ ryu:りゅ ryo:りょ gya:ぎゃ gyu:ぎゅ gyo:ぎょ ja:じゃ ju:じゅ jo:じょ ' +
  'bya:びゃ byu:びゅ byo:びょ pya:ぴゃ pyu:ぴゅ pyo:ぴょ'

/**
 * 로마자가 겹치는 자리. `소리 → 글자` 문항에서 정답이 둘이 되므로 화면에
 * 보일 글자에 구별 표시를 단다 (§3). `id`는 이미 갈라 뒀다.
 */
const ROMAJI_OVERRIDE: Record<string, string> = {
  wo: 'o (を·조사)',
  dji: 'ji (ぢ)',
  dzu: 'zu (づ)',
}

/**
 * 쓰지 않는 표기. 글자가 없는 것이 아니라 **낱말이 없는 것**이다.
 *
 * **표기 하나씩 뺀다.** 마디째 빼면 멀쩡한 짝까지 사라진다 — `みゅ`는 일본어
 * 사전에 한 건도 없지만 `ミュ`에는 `ミュージック`·`コミュニケーション`이 있다.
 *
 * | 뺀 것 | 왜 |
 * |---|---|
 * | `ヲ` | 가타카나 조사인데 현대 일본어는 조사를 히라가나로만 쓴다 |
 * | `ヂ`·`ヅ` | 옛 표기(`ラヂオ`)에만 남아 있다 |
 * | `みゅ`·`ピャ`·`ぴゅ` | 사전 조회에서 **한 건도 안 나온다** (고유명사까지 포함해서) |
 * | 요음 열하나 | 걸리는 것이 고유명사(`ピョンヤン`)·생물학 표기(`ヒョウ`)·전문어(`ごびゅう`)뿐이다 |
 *
 * 요음 쪽은 Jisho의 `is_common`과 JLPT 태그로 갈랐다. 기억으로 적으면 근거가
 * 없어서다 — 실제로 한 번 틀렸다. 「`ヒョ`에는 `ヒョウ`(표범)가 있다」고 적었는데
 * 豹의 읽기는 히라가나 `ひょう`고 가타카나는 생물학 표기다.
 *
 * **`ギョ`가 아까운 자리다.** `ギョーザ`는 흔한 낱말인데 콘텐츠가 그 개념을
 * 히라가나 `ぎょうざ`로 적어 두었다. 한 개념에 읽기를 둘 둘 수 없어 못 쓴다.
 *
 * 히라가나 `ぢ`·`づ`는 남는다. `ちぢむ`·`てつづき`처럼 실제로 쓰는 자리가 있다.
 */
const UNUSED = new Set([
  'kata:wo', 'kata:dji', 'kata:dzu',
  // 요음 — 사전에 보통 낱말이 없다
  'hira:myu', 'kata:pya', 'hira:pyu',
  'kata:kyo', 'kata:hya', 'hira:hyu', 'kata:hyo', 'kata:myo',
  'kata:rya', 'kata:gyo', 'kata:bya', 'hira:byu', 'kata:byo', 'kata:pyo',
])

/** 히라가나를 가타카나로. 두 벌의 배열이 같아서 상수 덧셈으로 끝난다 */
export const toKatakana = (text: string) =>
  [...text].map((ch) => (ch >= 'ぁ' && ch <= 'ゖ' ? String.fromCharCode(ch.charCodeAt(0) + 0x60) : ch)).join('')

/**
 * 탁점으로 갈리는 짝. `か`·`が`, `は`·`ば`·`ぱ`가 한 묶음이다.
 *
 * **행으로는 못 잡는다.** `が`의 행은 `g`고 `か`는 `k`라 서로 남이고, 첫 글자
 * 비교도 글자가 달라 빗나간다. 그래서 오답에 `か`를 깔겠다고 적어 두고도
 * 실제로는 무작위 풀에서나 걸렸다 — 표로 박아 고친다.
 *
 * 점 유무를 가리는 것이 가나에서 실제로 틀리는 자리다.
 */
const VOICING = [
  'かが', 'きぎ', 'くぐ', 'けげ', 'こご', 'さざ', 'しじ', 'すず', 'せぜ', 'そぞ',
  'ただ', 'ちぢ', 'つづ', 'てで', 'とど', 'はばぱ', 'ひびぴ', 'ふぶぷ', 'へべぺ', 'ほぼぽ',
]

/** 그 글자와 점만 다른 글자들. 요음이면 작은 글자까지 붙여 돌려준다 */
function voicingKin(hira: string | null): string[] {
  if (!hira) return []
  const head = hira[0]
  const group = VOICING.find((set) => set.includes(head))
  if (!group) return []
  return [...group].filter((ch) => ch !== head).map((ch) => ch + hira.slice(1))
}

/** 행을 뽑는다. `きゃ`는 `か`행이다 — 오답을 같은 자음에서 먼저 준다 */
function rowOf(id: string): string {
  if (id === 'n') return 'n'
  const head = id.replace(/[aiueo]+$/, '')
  return head === '' ? 'a' : head.replace(/y$/, '')
}

function parse(spec: string, kind: KanaKind): KanaUnit[] {
  return spec.split(' ').filter(Boolean).map((pair) => {
    const [id, hira] = pair.split(':')
    return {
      id,
      romaji: ROMAJI_OVERRIDE[id] ?? id,
      row: rowOf(id),
      kind,
      hira: UNUSED.has(`hira:${id}`) ? null : hira,
      kata: UNUSED.has(`kata:${id}`) ? null : toKatakana(hira),
    }
  })
}

/** 104마디. 쓰지 않는 표기 열일곱을 빼면 카드는 191장이다 */
export const KANA_TABLE: KanaUnit[] = [
  ...parse(SEI, 'sei'),
  ...parse(DAKU, 'daku'),
  ...parse(YOON, 'yoon'),
]

export const kanaUnit = (id: string): KanaUnit => {
  const found = KANA_TABLE.find((unit) => unit.id === id)
  if (!found) throw new Error(`알 수 없는 가나: ${id}`)
  return found
}

/** 그 마디의 글자. 쓰지 않는 표기는 `null`이다 (`UNUSED`) */
export const glyphOf = (unit: KanaUnit, script: KanaScript) =>
  script === 'hira' ? unit.hira : unit.kata

/**
 * 사람이 고른 예시. `content/kana.json`의 모양이다.
 * 값은 개념 slug라 낱말·읽기·뜻·발음·그림이 전부 개념에서 따라온다 (§2).
 */
export type KanaExamples = Record<string, Partial<Record<KanaScript, string[]>>>

/**
 * 지금 연 갈래. **공개를 여기서 끊는다.** (docs/kana-tab-design.md §8)
 *
 * 갈래 단위로만 여는 이유는 가나가 **격자**라서다. 카드가 준비되는 대로 열면
 * `さ`는 있는데 `し`가 없는 화면이 되는데, 낱말 피드에서는 개념 하나가 비어도
 * 아무도 모르지만(`undrawn` 열일곱이 그렇게 빠져 있다) 여기서는 **빠진 자리가
 * 보인다** — 학습자가 오십음도를 머릿속에 갖고 오기 때문이다.
 *
 * **아직 안 연 갈래의 예시도 `content/kana.json`에 쌓아 둔다.** 초안은 만드는
 * 데 시간이 들고 시트로 한 번 훑은 것이라 버릴 이유가 없다. 여기 이름이
 * 오르는 날 그대로 선다.
 */
export const KANA_OPEN: readonly KanaKind[] = ['sei', 'daku', 'yoon']

/** 초안이 채우려는 예시 수. 모자라도 아래 최소만 넘으면 카드는 선다 */
export const EXAMPLES_PER_CARD = 3

/**
 * 카드가 서는 **최소** 예시 수. 갈래마다 다르다.
 *
 * 청음·탁음은 셋을 다 채운다. 흔한 낱말이 넉넉하기 때문이다.
 *
 * **요음만 하나로 내린다.** 일본어 자체에 낱말이 없는 자리라서다 — 사전을
 * 뒤져도 `ギョ`에는 `ギョーザ`, `キョ`에는 `キョロキョロ`, `ニャ`에는
 * `コニャック` 하나뿐이다. 셋을 고집하면 그 마디들이 통째로 빠지는데,
 * **`ギョ`는 교자의 교**라고 한 번 가르치는 카드가 없는 카드보다 낫다.
 * 모자란 것은 콘텐츠가 아니라 어휘 자체다 (docs/kana-tab-design.md §8).
 */
const MIN_BY_KIND: Record<KanaKind, number> = { sei: 3, daku: 3, yoon: 1 }

/**
 * 예시가 모자라도 카드를 세우는 자리. **여기 적힌 것만 예외다.**
 *
 * `ヌ`를 품은 개념이 콘텐츠 전체에 `カヌー`·`スヌーズ` 둘뿐이다. 셋째를
 * 만들려면 개념을 새로 넣어야 하는데, 그 하나 때문에 청음 91장이 통째로
 * 묶이는 편이 더 나쁘다. 목록에 적어 두면 다음 사람이 채울 자리를 안다 —
 * `lib/audio-have.ts`가 없는 것만 적어 두는 것과 같은 규칙이다.
 */
export const EXAMPLE_SHORT: ReadonlyMap<string, number> = new Map([['kata:nu', 2]])

/** 이 자리에 **적어도** 몇 개가 있어야 카드가 서는가 */
export const exampleQuota = (script: KanaScript, id: string) =>
  EXAMPLE_SHORT.get(`${script}:${id}`) ?? MIN_BY_KIND[kanaUnit(id).kind]

/** 배우는 능력. 읽기와 쓰기는 다른 일이라 진도를 따로 센다 (§4) */
export const KANA_SKILLS = ['read', 'write'] as const
export type KanaSkill = (typeof KANA_SKILLS)[number]

/** 카드 하나 — 글자 하나 × 능력 하나 */
export type KanaEntry = {
  key: string
  unit: KanaUnit
  script: KanaScript
  skill: KanaSkill
  /** 이 글자의 예시 개념 slug */
  examples: string[]
}

export type KanaQuestion =
  | { kind: 'kana-intro'; entry: KanaEntry }
  | { kind: 'kana-choice'; entry: KanaEntry; prompt: string; answer: string; options: string[] }

/** 한능검과 같다 — 문맥 빈칸도 철자 빈칸도 만들 수 없다 (lib/progress.ts) */
export const KANA_LADDER: Ladder = { min: RUNG_CHOICE, max: RUNG_CHOICE }

export const kanaKey = (script: KanaScript, id: string, skill: KanaSkill) => `kana:${script}:${id}:${skill}`

export const isKana = (item: { key: string }): item is KanaEntry => 'unit' in item

/**
 * 출제할 수 있는 카드 전부.
 *
 * 예시가 정해진 수만큼 있는 글자만 남긴다. 예시가 모자란 카드는 소개할 것이
 * 없어 소리만 외우게 되는데, 그건 낱말 없이 글자를 외우는 일이라 다음 날
 * 사라진다.
 */
export function kanaEntries(
  examples: KanaExamples,
  table: KanaUnit[] = KANA_TABLE,
  open: readonly KanaKind[] = KANA_OPEN,
): KanaEntry[] {
  const entries: KanaEntry[] = []
  for (const unit of table) {
    if (!open.includes(unit.kind)) continue
    for (const script of KANA_SCRIPTS) {
      if (!glyphOf(unit, script)) continue
      const picked = examples[unit.id]?.[script] ?? []
      if (picked.length < exampleQuota(script, unit.id)) continue
      for (const skill of KANA_SKILLS)
        entries.push({ key: kanaKey(script, unit.id, skill), unit, script, skill, examples: picked })
    }
  }
  return entries
}

/**
 * 오답 후보 사다리. 혼동표 → 같은 행 → 같은 단 → 나머지. (§4)
 *
 * `lib/confusables.ts`는 207마디 중 45만 덮는다 — 빈칸 카드용으로 실제로
 * 헷갈리는 것만 손으로 적은 표라 그렇고, 요음은 하나도 없다. 나머지는
 * **격자**가 준다: 같은 행은 자음이 같고(`か き く け こ`) 같은 단은 모음이
 * 같다(`あ か さ た な`). 학습자가 틀리는 자리가 그 두 줄이다.
 *
 * **문자 종류는 섞지 않는다.** `あ` 문제의 오답은 히라가나만이다 — 섞으면
 * 표기를 고르는 문제가 되어 「구별하지 않는다」는 원칙과 어긋난다.
 */
function pools(entry: KanaEntry, table: KanaUnit[], confusables: string[]): KanaUnit[][] {
  const mine = entry.unit
  const glyph = glyphOf(mine, entry.script)!
  const others = table.filter((unit) => unit.id !== mine.id && glyphOf(unit, entry.script))
  const confusable = new Set(confusables)
  const vowel = mine.id.match(/[aiueo]+$/)?.[0] ?? ''
  const kin = voicingKin(mine.hira)
  return [
    others.filter((unit) => confusable.has(glyphOf(unit, entry.script)!)),
    // 점 유무를 훈련하는 자리 — `が`의 오답에 `か`가 선다
    others.filter((unit) => kin.includes(unit.hira ?? '')),
    others.filter((unit) => unit.row === mine.row),
    others.filter((unit) => vowel !== '' && unit.id.endsWith(vowel)),
    others,
  ].map((pool) => pool.filter((unit) => glyphOf(unit, entry.script) !== glyph))
}

/**
 * 4지선다 한 문항.
 *
 * `read`는 글자를 보고 소리를, `write`는 소리를 보고 글자를 고른다.
 *
 * **정답이 둘이 되지 않게 한다.** `を`와 `お`는 로마자가 둘 다 `o`라 소리로
 * 물으면 답이 갈리는데, 구별 표시(`o (を·조사)`)가 그 자리를 하나로 만든다.
 * 표시가 없는 옛 데이터가 섞여도 같은 글자가 두 번 서지 않게 여기서 한 번 더
 * 거른다.
 */
export function buildKanaChoice(
  entry: KanaEntry,
  table: KanaUnit[] = KANA_TABLE,
  attempt = 0,
): KanaQuestion {
  const reading = entry.skill === 'read'
  const glyph = glyphOf(entry.unit, entry.script)!
  const confusables = confusablesOf(glyph)
  const label = (unit: KanaUnit) => (reading ? unit.romaji : glyphOf(unit, entry.script)!)
  const answer = label(entry.unit)
  const rng = makeRng(hashString(`${entry.key}:${attempt}`))

  const options = new Set<string>()
  for (const pool of pools(entry, table, confusables)) {
    for (const unit of shuffled(pool, rng)) {
      if (options.size >= 3) break
      const value = label(unit)
      if (value !== answer) options.add(value)
    }
    if (options.size >= 3) break
  }
  if (options.size < 3) throw new Error(`가나 보기 부족: ${entry.key}`)

  return {
    kind: 'kana-choice',
    entry,
    answer,
    prompt: reading ? glyph : entry.unit.romaji,
    options: shuffled([answer, ...[...options]], rng),
  }
}

/**
 * 다 외운 글자 수. 두 능력이 **모두** 숙련이어야 한 글자다 — 한능검이
 * 한자를 세는 방식과 같다 (lib/hanja.ts)
 */
export function masteredKanaCount(
  isDone: (key: string) => boolean,
  entries: KanaEntry[],
): number {
  const byGlyph = new Map<string, KanaEntry[]>()
  for (const entry of entries) {
    const id = `${entry.script}:${entry.unit.id}`
    byGlyph.set(id, [...(byGlyph.get(id) ?? []), entry])
  }
  let done = 0
  for (const group of byGlyph.values()) if (group.every((entry) => isDone(entry.key))) done += 1
  return done
}
