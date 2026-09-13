import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { initialState, questionFor } from './engine.ts'
import {
  EXAMPLES_PER_CARD,
  KANA_LADDER,
  KANA_SCRIPTS,
  KANA_SKILLS,
  KANA_TABLE,
  buildKanaChoice,
  exampleQuota,
  glyphOf,
  kanaEntries,
  kanaKey,
  kanaUnit,
  masteredKanaCount,
  toKatakana,
  type KanaExamples,
} from './kana.ts'
import { RUNG_CHOICE, RUNG_INTRO } from './progress.ts'
import type { Concept } from './types.ts'

const examples = JSON.parse(readFileSync('content/kana.json', 'utf8')) as KanaExamples

/** 도표 전체를 채운 가짜 예시. 카드 수를 셀 때는 콘텐츠 진행도와 떼어 놓는다 */
const full: KanaExamples = Object.fromEntries(
  KANA_TABLE.map((unit) => [
    unit.id,
    Object.fromEntries(
      KANA_SCRIPTS.filter((script) => glyphOf(unit, script)).map((script) => [
        script,
        Array.from({ length: exampleQuota(script, unit.id) }, (_, i) => `${unit.id}-${script}-${i}`),
      ]),
    ),
  ]),
)

test('도표는 104마디이고 ヲ가 빠져 카드는 207장이다', () => {
  assert.equal(KANA_TABLE.length, 104)
  assert.equal(new Set(KANA_TABLE.map((unit) => unit.id)).size, 104)

  const glyphs = KANA_TABLE.flatMap((unit) =>
    KANA_SCRIPTS.map((script) => glyphOf(unit, script)).filter(Boolean),
  )
  assert.equal(glyphs.length, 207)
  assert.equal(kanaUnit('wo').kata, null)
  // 한 글자가 두 마디에 겹치면 4지선다에서 정답이 둘이 된다
  assert.equal(new Set(glyphs).size, 207)

  assert.equal(kanaEntries(full).length, 207 * KANA_SKILLS.length)
})

test('가타카나는 히라가나에서 유도한다', () => {
  assert.equal(toKatakana('あ'), 'ア')
  assert.equal(toKatakana('きゃ'), 'キャ')
  assert.equal(kanaUnit('kya').kata, 'キャ')
  assert.equal(kanaUnit('n').kata, 'ン')
})

test('로마자가 겹치는 셋은 화면 글자를 갈라 둔다', () => {
  // `소리 → 글자` 문항에서 정답이 둘이 되면 안 된다 (docs/kana-tab-design.md §3)
  const romaji = KANA_TABLE.map((unit) => unit.romaji)
  assert.equal(new Set(romaji).size, romaji.length)
  for (const [id, raw] of [['wo', 'o'], ['dji', 'ji'], ['dzu', 'zu']] as const)
    assert.ok(kanaUnit(id).romaji.startsWith(raw), id)
})

test('예시가 모자란 글자는 카드가 서지 않는다', () => {
  const thin: KanaExamples = { a: { hira: ['rain', 'ant'], kata: ['duck', 'eye-mask', 'questionnaire'] } }
  const entries = kanaEntries(thin, [kanaUnit('a')])
  assert.deepEqual([...new Set(entries.map((entry) => entry.script))], ['kata'])
  assert.equal(entries.length, KANA_SKILLS.length)
})

test('4지선다는 같은 문자 체계에서만 보기를 뽑고 정답이 하나다', () => {
  const table = KANA_TABLE
  for (const entry of kanaEntries(full)) {
    const question = buildKanaChoice(entry, table)
    assert.equal(question.kind, 'kana-choice')
    if (question.kind !== 'kana-choice') return
    assert.equal(question.options.length, 4, entry.key)
    assert.equal(new Set(question.options).size, 4, entry.key)
    assert.ok(question.options.includes(question.answer), entry.key)

    if (entry.skill === 'write') {
      // 보기가 전부 그 문자 체계의 글자여야 한다 — 섞으면 표기를 고르는 문제가 된다
      const mine = new Set(
        table.map((unit) => glyphOf(unit, entry.script)).filter(Boolean) as string[],
      )
      for (const option of question.options) assert.ok(mine.has(option), `${entry.key} ← ${option}`)
    }
  }
})

test('같은 문항은 몇 번을 만들어도 같다', () => {
  const [entry] = kanaEntries(full, [kanaUnit('ka')])
  const once = buildKanaChoice(entry, KANA_TABLE, 3)
  const twice = buildKanaChoice(entry, KANA_TABLE, 3)
  assert.deepEqual(once, twice)
  assert.notDeepEqual(buildKanaChoice(entry, KANA_TABLE, 4), once)
})

test('닮은 글자를 먼저 깐다', () => {
  const entry = kanaEntries(full, [kanaUnit('shi')]).find(
    (item) => item.script === 'kata' && item.skill === 'write',
  )!
  const question = buildKanaChoice(entry, KANA_TABLE)
  if (question.kind !== 'kana-choice') return assert.fail('4지선다가 아니다')
  // lib/confusables.ts가 シ의 짝으로 적어 둔 것들
  assert.ok(question.options.some((option) => ['ツ', 'ミ', 'ソ'].includes(option)))
})

test('소개는 글자마다 한 번이다', () => {
  const entries = kanaEntries(full, [kanaUnit('a')])
  const state = initialState()
  const kinds = entries.map((entry) => questionFor(entry, state, entries).kind)
  // 읽기 넷·쓰기 넷이 아니라 글자 둘에 소개 둘이다
  assert.equal(kinds.filter((kind) => kind === 'kana-intro').length, 2)
  assert.equal(kinds.filter((kind) => kind === 'kana-choice').length, 2)
})

test('사다리는 한 칸이라 소개 다음이 바로 4지선다다', () => {
  assert.equal(KANA_LADDER.min, RUNG_CHOICE)
  assert.equal(KANA_LADDER.max, RUNG_CHOICE)
  assert.notEqual(RUNG_INTRO, RUNG_CHOICE)
})

test('숙련도는 카드가 아니라 글자를 센다', () => {
  const entries = kanaEntries(full, [kanaUnit('a')])
  const read = new Set(entries.filter((entry) => entry.skill === 'read').map((entry) => entry.key))
  // 읽기만 뗐으면 아직 아는 글자가 아니다
  assert.equal(masteredKanaCount((key) => read.has(key), entries), 0)
  assert.equal(masteredKanaCount(() => true, entries), 2)
  assert.equal(kanaKey('hira', 'a', 'read'), 'kana:hira:a:read')
})

test('content/kana.json의 예시가 실제 개념이고 그 글자를 품는다', () => {
  const concepts = new Map<string, Concept>()
  for (const name of ['action', 'body', 'city', 'clothes', 'everyday', 'family', 'food', 'home',
    'idea', 'job', 'nature', 'number', 'office', 'quality', 'scene', 'school', 'sport', 'time',
    'transport', 'travel']) {
    const file = JSON.parse(readFileSync(`content/${name}.json`, 'utf8')) as { concepts: Concept[] }
    for (const concept of file.concepts) concepts.set(concept.slug, concept)
  }

  const seen = new Map<string, number>()
  for (const [id, picked] of Object.entries(examples)) {
    const unit = kanaUnit(id)
    for (const script of KANA_SCRIPTS) {
      const list = picked[script]
      if (!list) continue
      const glyph = glyphOf(unit, script)
      assert.ok(glyph, `${id} ${script} — 없는 표기에 예시가 붙었다`)
      assert.equal(list.length, exampleQuota(script, id), `${glyph} 예시 수`)
      assert.ok(exampleQuota(script, id) <= EXAMPLES_PER_CARD)

      for (const slug of list) {
        const concept = concepts.get(slug)
        assert.ok(concept, `${glyph} ← ${slug} 없는 개념`)
        const word = concept.words.ja
        const reading = word?.reading ?? word?.term ?? ''
        assert.ok(reading.includes(glyph!), `${glyph} ← ${slug}(${reading})`)
        seen.set(slug, (seen.get(slug) ?? 0) + 1)
      }
    }
  }
  // 한 낱말은 최대 두 장까지 (docs/kana-tab-design.md §2)
  for (const [slug, count] of seen) assert.ok(count <= 2, `${slug}이 ${count}장에 겹쳤다`)
})

test('지금 공개된 것은 청음이고 갈래에 구멍이 없다', () => {
  const opened = new Set(
    KANA_TABLE.filter((unit) =>
      KANA_SCRIPTS.some((script) => (examples[unit.id]?.[script]?.length ?? 0) > 0),
    ).map((unit) => unit.kind),
  )
  assert.deepEqual([...opened], ['sei'])

  // 열린 갈래는 **한 마디도 빠지지 않아야** 한다. 격자는 빠진 자리가 보인다
  for (const unit of KANA_TABLE.filter((item) => item.kind === 'sei'))
    for (const script of KANA_SCRIPTS)
      if (glyphOf(unit, script))
        assert.equal(
          examples[unit.id]?.[script]?.length,
          exampleQuota(script, unit.id),
          `${glyphOf(unit, script)} 가 비었다`,
        )

  assert.equal(kanaEntries(examples).length, 91 * KANA_SKILLS.length)
})
