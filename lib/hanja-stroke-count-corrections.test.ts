import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import corrections from '../content/hanja/stroke-count-corrections.json' with { type: 'json' }
import { hanjaEntries, type HanjaCharacter } from './hanja.ts'

const grade = JSON.parse(readFileSync(new URL('../content/hanja/characters/g3-2.json', import.meta.url), 'utf8')) as {
  source: { sha256: string }
  characters: HanjaCharacter[]
}
const character = grade.characters.find((item) => item.glyph === '弊')!

test('弊의 공식 후속 획수 보정은 배정표 원문과 출처를 함께 보존한다', () => {
  const correction = corrections.entries.find((entry) => entry.id === character.strokeCountCorrection)!
  assert.ok(correction)
  assert.equal(corrections.version, 1)
  assert.equal(corrections.workbookSha256, grade.source.sha256)
  assert.equal(correction.sourceUrl, 'https://www.hanja.re.kr/klea/counsel/hanjaDetail.do?id=16424')
  assert.equal(correction.glyph, character.glyph)
  assert.equal(correction.sourceRow, character.sourceRow)
  assert.equal(character.sourceRow, 5316)
  assert.equal(correction.sourceStrokes, 15)
  assert.equal(character.sourceStrokes, correction.sourceStrokes)
  assert.equal(correction.strokes, 7 + 4 + 3)
  assert.equal(character.strokes, correction.strokes)
})

test('획수 보정은 弊의 훈음, 급수, 식별자와 두 학습 기록 키를 유지한다', () => {
  assert.equal(character.id, 'u5f0a')
  assert.equal(character.hun, '폐단/해질')
  assert.equal(character.eum, '폐')
  assert.equal(character.readingGrade, '3급II')
  assert.equal(character.radical, '廾')
  assert.equal(character.sourceHunEum, '폐단/해질 폐:')
  const original = { ...character, strokes: character.sourceStrokes! }
  delete original.sourceStrokes
  delete original.strokeCountCorrection
  const keys = (item: HanjaCharacter) => hanjaEntries([item]).map((entry) => entry.key)
  assert.deepEqual(keys(character), keys(original))
  assert.deepEqual(keys(character), ['hanja:char:u5f0a:recognition', 'hanja:char:u5f0a:hun-eum'])
})

const grade2 = JSON.parse(readFileSync(new URL('../content/hanja/characters/g2.json', import.meta.url), 'utf8')) as {
  source: { sha256: string }
  characters: HanjaCharacter[]
}
const hui = grade2.characters.find((item) => item.glyph === '熙')!

test('熙 표시 자형은 14획이며 XLS의 煕 13획과 근거를 보존한다', () => {
  const correction = corrections.entries.find((entry) => entry.id === hui.strokeCountCorrection)!
  assert.equal(correction.sourceUrl, 'https://www.hanja.re.kr/klea/counsel/hanjaDetail.do?id=9699')
  assert.equal(correction.sourceDate, '2016-10-08')
  assert.equal(corrections.workbookSha256, grade2.source.sha256)
  assert.equal(hui.sourceRow, 5954)
  assert.equal(hui.glyph, '熙')
  assert.equal(hui.sourceGlyph, '煕')
  assert.deepEqual(hui.glyphAliases, ['煕'])
  assert.equal(hui.sourceStrokes, 13)
  assert.equal(hui.strokes, 14)
  assert.equal(correction.sourceGlyph, hui.sourceGlyph)
  assert.equal(correction.sourceRow, hui.sourceRow)
  assert.equal(correction.sourceStrokes, hui.sourceStrokes)
  assert.equal(correction.strokes, hui.strokes)
})

test('표시 획수 보정은 熙의 학습 키나 다른 여덟 후보의 획수를 바꾸지 않는다', () => {
  const keys = (item: HanjaCharacter) => hanjaEntries([item]).map((entry) => entry.key)
  assert.deepEqual(keys(hui), keys({ ...hui, strokes: 13 }))
  assert.deepEqual(keys(hui), ['hanja:char:u7199:recognition', 'hanja:char:u7199:hun-eum'])
  assert.equal(hui.readingGrade, '2급')
  assert.equal(hui.hun, '빛날')
  assert.equal(hui.eum, '희')
  for (const [glyph, strokes] of [['瓊', 19], ['藍', 18], ['蘆', 20], ['飼', 14], ['晟', 11], ['祐', 10], ['庾', 11], ['禎', 14]] as const) {
    const character = grade2.characters.find(c => c.glyph === glyph)!
    assert.equal(character.strokes, strokes)
    assert.equal(character.strokeCountCorrection, undefined)
  }
})
