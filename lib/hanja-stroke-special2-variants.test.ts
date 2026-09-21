import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { HANJA_VARIANT_STROKES, hanjaPlaybackVariant } from './hanja-stroke-variants.ts'
import { hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const dir = 'docs/hanja-special2-variant-review-2026-09-21/'
const bytes = (path: string) => readFileSync(new URL('../' + path, import.meta.url))
const read = (path: string) => JSON.parse(bytes(path).toString())
const sha = (value: string | Buffer) => createHash('sha256').update(value).digest('hex')
const review = read(dir + 'review.json')
const originals = read(dir + 'originals.json')
const alternate = read(dir + 'alternate-kui.json')
const catalog: HanjaCharacter[] = read('content/hanja/characters/special-2.json').characters
const glyphs = [...'夔犁蓼鵡筬亐臾贇卄渚猪簒砦穉啣']
const variants = HANJA_VARIANT_STROKES.filter(data => glyphs.includes(data.glyph))

test('특급II 15자 190획은 검토한 전체 후보의 순서와 경로를 보존한다', () => {
  assert.deepEqual(variants.map(data => data.glyph), glyphs)
  assert.equal(variants.reduce((n, data) => n + data.paths.length, 0), 190)
  for (const data of variants) {
    const ref = review.entries.find((entry: { glyph: string }) => entry.glyph === data.glyph)
    const snapshot = data.glyph === '夔' ? alternate : originals
    const original = snapshot.entries.find((entry: { glyph: string }) => entry.glyph === data.glyph)
    const character = catalog.find(entry => entry.glyph === data.glyph)!
    assert.equal(ref.decision, 'dictionary-paths-reviewed-awaiting-integration')
    assert.equal(ref.runtimeApproved, false, 'Keep the historical review unchanged')
    assert.equal(ref.selectedCorpus, data.glyph === '夔' ? 'Hans' : 'Ja')
    assert.equal(data.candidateSha256, ref.selectedCandidateSha256)
    assert.equal(data.candidateSha256, original.candidateSha256)
    assert.equal(data.geometrySource, snapshot.sources[ref.selectedCorpus].sha256)
    assert.deepEqual(data.paths, original.paths)
    assert.deepEqual(data.paths, normalizeMedians(original.medians))
    assert.equal(data.pathsSha256, sha(JSON.stringify(data.paths)))
    const indices = Array.from({ length: data.paths.length }, (_, i) => i + 1)
    assert.deepEqual(data.sourceStrokeIndices, indices)
    assert.equal(data.sourceReference.dictionaryDirectionStrokes, indices.join(','))
    assert.equal(data.sourceReference.dictionarySvgUrl, ref.dictionary.url)
    assert.equal(data.sourceReference.orderUrl, ref.dictionary.url)
    assert.equal(data.sourceReference.dictionarySvgSha256, ref.dictionary.sha256)
    for (const key of ['orderReviewSha256', 'geometryReviewSha256', 'directionReviewSha256'] as const) {
      assert.equal(data.sourceReference[key], sha(bytes(dir + 'review.json')))
    }
    assert.equal(data.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(data.variant, { catalogStrokes: character.strokes, playbackStrokes: original.strokes, form: '사전' })
    assert.equal(data.variant.catalogStrokes, ref.catalogStrokes)
    assert.equal(data.variant.playbackStrokes, ref.playbackStrokes)
    assert.equal(hanjaPlaybackVariant(character), data, 'Static study glyph uses the reviewed paths')
    assert.equal(hanjaStrokeData(character), data, 'Playback uses the same reviewed paths')
  }
})

test('자형 대조 보류 또는 후보 미확보 특급II 획수 충돌 13자는 재생하지 않는다', () => {
  const held = [...'篠鱉宬莽萸菉珷珹奫晸逈凞囍']
  assert.equal(held.length, 13)
  for (const glyph of held) {
    const character = catalog.find(entry => entry.glyph === glyph)!
    assert.ok(character)
    assert.equal(hanjaPlaybackVariant(character), null)
    assert.equal(hanjaStrokeData(character), null)
  }
})
