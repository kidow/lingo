import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, HANJA_STROKE_SOURCE, hanjaStrokeData, STROKE_DURATION, STROKE_GAP, strokeDuration, strokeNumberAt } from './hanja-strokes.ts'

const grades = ['g8', 'g7-2', 'g7', 'g6-2', 'g6', 'g5-2', 'g5']
const characters = grades.flatMap((grade) => JSON.parse(readFileSync(
  new URL(`../content/hanja/characters/${grade}.json`, import.meta.url), 'utf8',
)).characters)
const blocked = new Set(Array.from('萬草花成藥苦英敬觀舊落葉'))
const supplements = ['g4-2', 'g3-2', 'g1'].flatMap((grade) => JSON.parse(readFileSync(
  new URL(`../content/hanja/characters/${grade}.json`, import.meta.url), 'utf8',
)).characters).filter((c: { glyph: string }) => '回瓦臼'.includes(c.glyph))
const wholeImages: Record<string, string> = { 回: 'BIN0036.bmp', 瓦: 'BIN0038.bmp', 臼: 'BIN0017.gif' }
const locations = JSON.parse(readFileSync(new URL('../scripts/hanja-stroke-locations.json', import.meta.url), 'utf8'))

test('5급까지 488자와 별도 공식 도해 3자를 합쳐 검토된 491자만 제공한다', () => {
  assert.equal(characters.length, 500)
  assert.equal(supplements.length, 3)
  assert.deepEqual([...HANJA_STROKES.map((d) => d.glyph)].sort(),
    [...characters.filter((c: { glyph: string }) => !blocked.has(c.glyph)), ...supplements].map((c: { glyph: string }) => c.glyph).sort())
  assert.equal(new Set(HANJA_STROKES.map((d) => d.glyph)).size, 491)
  for (const data of HANJA_STROKES) {
    const character = [...characters, ...supplements].find((c: { glyph: string }) => c.glyph === data.glyph)
    assert.ok(character)
    assert.equal(data.paths.length, character.strokes, data.glyph)
    assert.equal(hanjaStrokeData(character), data)
    if (data.sourceWholeImage) {
      assert.equal(data.sourceImage, wholeImages[data.glyph])
      assert.equal(data.sourceRow, undefined)
    } else {
      assert.match(data.sourceImage, /^BIN[0-9A-F]{4}\.gif$/)
      assert.ok(data.sourceRow !== undefined && data.sourceRow >= 1 && data.sourceRow <= 25)
      assert.equal(Array.from(locations.pages[data.sourceImage.slice(3, 7)])[data.sourceRow - 1], data.glyph)
    }
    for (const path of data.paths) {
      assert.equal((path.match(/M/g) ?? []).length, 1, 'a pen-down stroke must remain connected')
      assert.ok((path.match(/-?\d+(?:\.\d+)?/g) ?? []).every((n) => Number(n) >= 0 && Number(n) <= 100))
    }
  }
  assert.equal(HANJA_STROKE_SOURCE.sha256, '4e191bbee54edd6db595f16fc83a15b9929eba0e3e01095da1e828c70e10760c')
})

test('검증되지 않은 한자나 획수가 달라진 자형에 필순을 추정하지 않는다', () => {
  assert.equal(hanjaStrokeData({ glyph: '警', strokes: 20 }), null)
  for (const glyph of blocked) {
    const character = characters.find((c: { glyph: string }) => c.glyph === glyph)
    assert.equal(hanjaStrokeData(character), null, glyph)
  }
  assert.equal(hanjaStrokeData({ glyph: '性', strokes: 7 }), null)
  assert.equal(hanjaStrokeData({ glyph: '毎', strokes: 7 }), null)
  assert.equal(hanjaStrokeData({ glyph: '漢', strokes: 15 }), null)
  assert.equal(hanjaStrokeData({ glyph: '萬', strokes: 13 }), null)
  assert.equal(hanjaStrokeData({ glyph: '萬', strokes: 12 }), null)
  assert.equal(hanjaStrokeData({ glyph: '山', strokes: 4 }), null)
  assert.equal(hanjaStrokeData({ glyph: '⼭', strokes: 3 }), null)
})

test('획 사이 간격 동안 이전 획을 유지하고 마지막 획에서 멈춘다', () => {
  assert.equal(strokeDuration(1), STROKE_DURATION)
  assert.equal(strokeDuration(4), 4 * STROKE_DURATION + 3 * STROKE_GAP)
  assert.equal(strokeNumberAt(0, 4), 1)
  assert.equal(strokeNumberAt(STROKE_DURATION + STROKE_GAP - 1, 4), 1)
  assert.equal(strokeNumberAt(STROKE_DURATION + STROKE_GAP, 4), 2)
  assert.equal(strokeNumberAt(strokeDuration(4), 4), 4)
  assert.equal(strokeNumberAt(strokeDuration(4) + 10_000, 4), 4)
})
