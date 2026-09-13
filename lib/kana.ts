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
  hira: string
  /**
   * 가타카나 표기. `を`만 `null`이다 — `ヲ`는 현대 일본어에서 쓰지 않아
   * 예시 낱말을 영영 못 채운다 (docs/kana-tab-design.md §1)
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

/** 히라가나를 가타카나로. 두 벌의 배열이 같아서 상수 덧셈으로 끝난다 */
export const toKatakana = (text: string) =>
  [...text].map((ch) => (ch >= 'ぁ' && ch <= 'ゖ' ? String.fromCharCode(ch.charCodeAt(0) + 0x60) : ch)).join('')

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
      hira,
      kata: id === 'wo' ? null : toKatakana(hira),
    }
  })
}

/** 104마디. 가타카나가 없는 `を`를 빼면 카드는 207장이다 */
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

/** 그 마디의 글자. `を`의 가타카나는 없다 */
export const glyphOf = (unit: KanaUnit, script: KanaScript) =>
  script === 'hira' ? unit.hira : unit.kata

/**
 * 사람이 고른 예시. `content/kana.json`의 모양이다.
 * 값은 개념 slug라 낱말·읽기·뜻·발음·그림이 전부 개념에서 따라온다 (§2).
 */
export type KanaExamples = Record<string, Partial<Record<KanaScript, string[]>>>

/** 카드 하나가 요구하는 예시 수 */
export const EXAMPLES_PER_CARD = 3

/**
 * 예시가 모자라도 카드를 세우는 자리. **여기 적힌 것만 예외다.**
 *
 * `ヌ`를 품은 개념이 콘텐츠 전체에 `カヌー`·`スヌーズ` 둘뿐이다. 셋째를
 * 만들려면 개념을 새로 넣어야 하는데, 그 하나 때문에 청음 91장이 통째로
 * 묶이는 편이 더 나쁘다. 목록에 적어 두면 다음 사람이 채울 자리를 안다 —
 * `lib/audio-have.ts`가 없는 것만 적어 두는 것과 같은 규칙이다.
 */
export const EXAMPLE_SHORT: ReadonlyMap<string, number> = new Map([['kata:nu', 2]])

export const exampleQuota = (script: KanaScript, id: string) =>
  EXAMPLE_SHORT.get(`${script}:${id}`) ?? EXAMPLES_PER_CARD

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
export function kanaEntries(examples: KanaExamples, table: KanaUnit[] = KANA_TABLE): KanaEntry[] {
  const entries: KanaEntry[] = []
  for (const unit of table) {
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
  return [
    others.filter((unit) => confusable.has(glyphOf(unit, entry.script)!)),
    // 탁음 짝도 여기서 선다 — `が`의 오답에 `か`가 서면 점 유무를 훈련한다
    others.filter((unit) => unit.row === mine.row || unit.hira.slice(0, 1) === mine.hira.slice(0, 1)),
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
