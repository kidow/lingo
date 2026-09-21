import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { hanjaPlaybackVariant } from './hanja-stroke-variants.ts'
import { hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const dir = 'docs/hanja-special2-direction-review-2026-09-21/'
const bytes = (path: string) => readFileSync(new URL('../' + path, import.meta.url))
const read = (path: string) => JSON.parse(bytes(path).toString())
const sha = (value: string | Buffer) => createHash('sha256').update(value).digest('hex')
const review = read(dir + 'review.json')
const originals = read(dir + 'originals.json')
const proposals = read(dir + 'proposals.json')
const catalog: HanjaCharacter[] = read('content/hanja/characters/special-2.json').characters

for (const glyph of [...'嘯瀟嘴']) {
  test(`${glyph}는 검토된 획 순서만 반영하고 원본 좌표와 근거를 보존한다`, () => {
    const character = catalog.find(c => c.glyph === glyph)!
    const data = hanjaPlaybackVariant(character)!
    const ref = review.entries.find((e: { glyph: string }) => e.glyph === glyph)
    const original = originals.entries.find((e: { glyph: string }) => e.glyph === glyph)
    assert.ok(data)
    assert.equal(ref.status, 'paths-reviewed-awaiting-integration', 'Historical review stays unchanged')
    assert.equal(review.runtimeApprovalsAdded, 0)
    assert.deepEqual(data.sourceStrokeIndices, ref.permutation)
    assert.deepEqual(data.sourceStrokeIndices, proposals[glyph])
    const indices = Array.from({ length: original.strokes }, (_, i) => i + 1)
    const sourceIndices = data.sourceStrokeIndices!.map(i => {
      assert.equal(typeof i, 'number')
      return i as number
    })
    assert.deepEqual([...sourceIndices].sort((a, b) => a - b), indices)
    const paths = normalizeMedians(original.medians)
    assert.deepEqual(data.paths, sourceIndices.map(i => paths[i - 1]))
    assert.equal(data.pathsSha256, ref.reviewedPathsSha256)
    assert.equal(data.pathsSha256, sha(JSON.stringify(data.paths)))
    assert.equal(data.candidateSha256, original.candidateSha256)
    assert.equal(data.candidateSha256, ref.candidateSha256)
    assert.equal(data.geometrySource, originals.sources[original.corpus].sha256)
    assert.equal(data.sourceReference.dictionarySvgSha256, ref.dictionary.sha256)
    assert.equal(data.sourceReference.dictionarySvgUrl, ref.dictionary.url)
    assert.equal(data.sourceReference.orderUrl, ref.dictionary.url)
    assert.equal(data.sourceReference.dictionaryDirectionStrokes, indices.join(','))
    for (const key of ['orderReviewSha256', 'geometryReviewSha256', 'directionReviewSha256'] as const) {
      assert.equal(data.sourceReference[key], sha(bytes(dir + 'review.json')))
    }
    assert.deepEqual(data.variant, { catalogStrokes: character.strokes, playbackStrokes: original.strokes, form: '사전' })
    assert.equal(data.verificationSource, 'ehanja-crosschecked')
    assert.equal(hanjaStrokeData(character), data, 'Static and animated study glyphs share the same data')
    assert.equal(hanjaPlaybackVariant({ ...character, strokes: original.strokes }), null, 'Do not silently replace the catalog count')
  })
}

test('새 사전 자형 3자의 재생 획은 합계 52획이다', () => {
  assert.equal([...'嘯瀟嘴'].reduce((n, glyph) => n + hanjaPlaybackVariant(catalog.find(c => c.glyph === glyph)!)!.paths.length, 0), 52)
})
