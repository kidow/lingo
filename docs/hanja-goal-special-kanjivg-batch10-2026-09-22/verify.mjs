/** Validate this research packet; it contains no approved runtime geometry. */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { normalizeKanjiVGPath } from '../../lib/hanja-stroke-kanjivg-geometry.ts'
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const source = read('candidates.json'), findings = read('findings.json'), normalized = read('normalized.json')
assert.equal(source.revision, '422b5538595676da918c288a4230cb5e22a1ee7e')
assert.equal(source.license.spdx, 'CC-BY-SA-3.0')
assert.equal(findings.runtimeAdded, 0)
assert.equal(findings.entries.reduce((sum, e) => sum + e.reviewedStrokes.length, 0), 47)
for (const review of findings.entries) {
  assert.equal(review.decision, 'held')
  assert.equal(HANJA_STROKES.some(e => e.glyph === review.glyph), false)
  const entry = source.entries.find(e => e.candidate.id === review.candidate)
  const alternate = source.entries.find(e => e.candidate.id === review.alternativeReview.id)
  assert.equal(entry.paths.length, review.strokes)
  assert.equal(entry.dictionaryStrokes, review.strokes)
  assert.equal(entry.candidate.revision, source.revision)
  assert.match(entry.dictionary.sha256, /^[a-f0-9]{64}$/)
  assert.match(entry.candidate.sha256, /^[a-f0-9]{64}$/)
  for (const i of review.alternativeReview.unchangedProblemPaths)
    assert.equal(entry.paths[i - 1], alternate.paths[i - 1])
  if (review.alternativeReview.pathIdentityMappingToBase)
    assert.deepEqual(alternate.paths, review.alternativeReview.pathIdentityMappingToBase.map(i => entry.paths[i - 1]))
  if (review.alternativeReview.differentPathIndices)
    assert.deepEqual(entry.paths.flatMap((p, i) => p === alternate.paths[i] ? [] : [i + 1]), review.alternativeReview.differentPathIndices)
}
const horse = source.entries.find(e => e.candidate.id === '099f8')
const order = findings.entries[0].sourceStrokeIndices
assert.deepEqual([...order].sort((a, b) => a - b), Array.from({ length: 17 }, (_, i) => i + 1))
assert.deepEqual(normalized.entries, [{ glyph: '駸', sourceStrokeIndices: order, paths: order.map(i => normalizeKanjiVGPath(horse.paths[i - 1])) }])
console.log(JSON.stringify({ reviewedCharacters: 3, reviewedStrokes: 47, runtimeAdded: 0,
  findingsSha256: createHash('sha256').update(readFileSync(new URL('findings.json', import.meta.url))).digest('hex') }))
