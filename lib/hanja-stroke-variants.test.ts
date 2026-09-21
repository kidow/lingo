import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'
import { HANJA_VARIANT_STROKES, hanjaPlaybackVariant } from './hanja-stroke-variants.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const read = (path: string) => JSON.parse(readFileSync(new URL('../' + path, import.meta.url), 'utf8'))
const sha = (value: string | Buffer) => createHash('sha256').update(value).digest('hex')
const reviewPath = 'docs/hanja-g2-variants-2026-09-21/review.json'
const review = read(reviewPath)
const originals = ['hanja-g2-si-2026-09-16', 'hanja-g2-yu-zhen-2026-09-16']
  .flatMap(folder => read('docs/' + folder + '/originals.json').entries)
const catalog: HanjaCharacter[] = read('content/hanja/characters/g2.json').characters
const grade2Variants = HANJA_VARIANT_STROKES.filter(data => '飼祐禎'.includes(data.glyph))

test('3자 35획을 검토 기록에서 정확히 재현하며 사전 출처를 보존한다', () => {
  assert.deepEqual(grade2Variants.map(data => data.glyph), ['飼', '祐', '禎'])
  assert.equal(grade2Variants.reduce((sum, data) => sum + data.paths.length, 0), 35)
  for (const data of grade2Variants) {
    const ref = review.entries.find((entry: { glyph: string }) => entry.glyph === data.glyph)
    const original = originals.find(entry => entry.glyph === data.glyph)
    assert.deepEqual(data.paths, ref.sourceStrokeIndices.map((index: number) => original.paths[index - 1]))
    assert.deepEqual(data.sourceStrokeIndices, ref.sourceStrokeIndices)
    assert.equal(sha(JSON.stringify(data.paths)), ref.reviewedPathsSha256)
    assert.equal(data.pathsSha256, ref.reviewedPathsSha256)
    assert.equal(data.sourceReference.orderReviewSha256, sha(readFileSync(new URL('../' + reviewPath, import.meta.url))))
    assert.equal(data.sourceReference.dictionarySvgSha256, original.dictionary.sha256)
    assert.equal(data.verificationSource, 'ehanja-crosschecked')
    assert.equal(data.variant.catalogStrokes, ref.catalogStrokes)
    assert.equal(data.variant.playbackStrokes, ref.playbackStrokes)
    assert.equal(hanjaStrokeData(catalog.find(entry => entry.glyph === data.glyph)!), data)
  }
})

test('배정 획수가 바뀌거나 미검증 자형이면 예외를 허용하지 않는다', () => {
  for (const data of HANJA_VARIANT_STROKES) {
    for (let strokes = 0; strokes < 30; strokes++) {
      if (strokes === data.variant.catalogStrokes) continue
      assert.equal(hanjaStrokeData({ glyph: data.glyph, strokes }), null)
      assert.equal(hanjaPlaybackVariant({ glyph: data.glyph, strokes }), null)
    }
  }
  assert.equal(hanjaStrokeData({ glyph: '庾', strokes: 11 }), null)
  assert.equal(hanjaStrokeData({ glyph: '篠', strokes: 16 }), null)
  assert.equal(hanjaStrokeData({ glyph: '篠', strokes: 17 }), null)
  assert.equal(hanjaStrokeData({ glyph: '祐', strokes: 9 }), null)
  assert.equal(hanjaStrokeData({ glyph: '山', strokes: 4 }), null)
})

test('전체 카탈로그에서 획수가 다른 재생은 검토한 18자뿐이다', () => {
  const dir = new URL('../content/hanja/characters/', import.meta.url)
  const characters: HanjaCharacter[] = readdirSync(dir).filter(path => path.endsWith('.json'))
    .flatMap(path => JSON.parse(readFileSync(new URL(path, dir), 'utf8')).characters)
  const different = characters.filter(character => {
    const data = hanjaStrokeData(character)
    return data && data.paths.length !== character.strokes
  })
  assert.deepEqual(different.map(character => character.glyph).sort(), [...'飼祐禎夔犁蓼鵡筬亐臾贇卄渚猪簒砦穉啣'].sort())
  assert.equal(new Set(HANJA_STROKES.map(data => data.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(catalog.filter(character => '飼祐禎'.includes(character.glyph)).map(character => character.strokes).sort(), [10, 14, 14])
})
