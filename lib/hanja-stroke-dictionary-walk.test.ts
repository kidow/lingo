import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { HANJA_DICTIONARY_STROKES } from './hanja-stroke-dictionary.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { validateDictionaryProofs, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g3ii-walk-4-2026-09-13/'
const originals = JSON.parse(read(dir + 'originals.json')) as { entries: { glyph: string; medians: number[][][] }[] }
const observations = JSON.parse(read(dir + 'observations.json')) as { rows: [string, number, number, number, number, boolean][] }
const review = JSON.parse(read(dir + 'review.json')) as { entries: {
  glyph: string; strokes: number; strokeReview: [number, string, string, string][];
  localReplacementStrokes: number[]; wholeCandidateGeometryReviewed: boolean; runtimeApproved: boolean
}[] }
const recipes = JSON.parse(read(dir + 'corrections.json')) as { entries: {
  glyph: string; sourceStrokeIndices: (number | null)[]; authored: { stroke: number; path: string }[]
}[] }

test('four walking-radical glyphs require 53 observations, six reordered medians and 20 explicit corrections', () => {
  assert.equal(observations.rows.length, 53)
  assert.deepEqual(review.entries.map(e => [e.glyph, e.strokes]), [['蓮', 15], ['追', 10], ['透', 11], ['還', 17]])
  let retained = 0, reordered = 0, authored = 0
  for (const entry of review.entries) {
    const original = normalizeMedians(originals.entries.find(e => e.glyph === entry.glyph)!.medians)
    const published = HANJA_DICTIONARY_STROKES.find(e => e.glyph === entry.glyph)!
    const recipe = recipes.entries.find(e => e.glyph === entry.glyph)!
    const sequence = Array.from({ length: entry.strokes }, (_, i) => i + 1)
    const rows = observations.rows.filter(r => r[0] === entry.glyph)
    assert.equal(original.length, entry.strokes - 1)
    assert.deepEqual(rows.map(r => r[1]), sequence)
    assert.ok(rows.every(r => r[2] > 0 && r[2] < r[3] && r[4] === r[1] - 1 && r[5]))
    assert.deepEqual(entry.strokeReview.map(r => r[0]), sequence)
    assert.ok(entry.strokeReview.every(r => r[1] && r[2] && r[3] === 'verified'))
    assert.ok(entry.wholeCandidateGeometryReviewed && entry.runtimeApproved)
    assert.deepEqual(published.sourceStrokeIndices, recipe.sourceStrokeIndices)
    assert.deepEqual(recipe.authored.map(a => a.stroke), entry.localReplacementStrokes)
    assert.equal(published.sourceReference.dictionaryDirectionStrokes, sequence.join(','))
    for (const [i, sourceIndex] of published.sourceStrokeIndices.entries()) {
      if (sourceIndex === null) {
        authored++
        assert.equal(published.paths[i], recipe.authored.find(a => a.stroke === i + 1)!.path)
      } else {
        retained++
        if (sourceIndex !== i + 1) reordered++
        assert.equal(published.paths[i], original[sourceIndex - 1])
      }
    }
    assert.deepEqual(published.sourceStrokeIndices.slice(-4), [null, null, null, null])
  }
  assert.deepEqual({ retained, reordered, authored }, { retained: 33, reordered: 6, authored: 20 })
})

test('single-dot restoration, order swaps and rewritten walk-four proofs cannot bypass approval', () => {
  const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
  for (const glyph of ['蓮', '追', '透', '還']) {
    const published = HANJA_DICTIONARY_STROKES.find(e => e.glyph === glyph)!
    const original = normalizeMedians(originals.entries.find(e => e.glyph === glyph)!.medians)
    const reverted = structuredClone(published)
    reverted.paths = original
    reverted.pathsSha256 = hash(original)
    assert.throws(() => validateDictionaryReview(reverted, published.paths.length), /published entry/)
    for (const stroke of published.sourceStrokeIndices.flatMap((n, i) => n === null || n !== i + 1 ? [i] : [])) {
      const changed = structuredClone(published)
      changed.paths = changed.paths.map((path, i) => i === stroke ? original[Math.min(i, original.length - 1)] : path)
      changed.pathsSha256 = hash(changed.paths)
      assert.throws(() => validateDictionaryReview(changed, published.paths.length), /published entry/)
    }
  }
  for (const filename of ['originals.json', 'corrections.json', 'observations.json', 'candidate-paths.json', 'review.json']) {
    assert.throws(() => validateDictionaryProofs(path => read(path) + (path === dir + filename ? ' ' : '')), /proof mismatch/)
  }
})
