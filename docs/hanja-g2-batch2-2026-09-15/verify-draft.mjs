/** Read-only partial-review integrity check; this does not publish animation data. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'

const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const originals = read('originals.json')
const review = read('observations-draft.json')
const sourceChecks = read('source-checks-draft.json')
assert.equal(originals.entries.length, 50)
assert.equal(new Set(originals.entries.map(e => e.glyph)).size, 50)
assert.equal(originals.entries.reduce((sum, e) => sum + e.strokes, 0), 658)
assert.equal(review.status, 'partial')
assert.equal(review.publishedCharacters, 0)
assert.equal(review.entries.length, review.reviewedCharacters)
assert.deepEqual(review.entries.map(e => e.glyph), originals.entries.slice(0, review.entries.length).map(e => e.glyph))
assert.deepEqual(sourceChecks.entries.map(e => e.glyph), review.entries.map(e => e.glyph))
assert.deepEqual(review.remaining, originals.entries.slice(review.entries.length).map(e => ({ glyph: e.glyph, strokes: e.strokes })))
for (const original of originals.entries) {
  assert.equal(hash(original.medians), original.originalMediansSha256, original.glyph + ' median hash')
  assert.deepEqual(normalizeMedians(original.medians), original.paths, original.glyph + ' normalized paths')
  assert.equal(original.paths.length, original.strokes)
}
for (const entry of review.entries) {
  const original = originals.entries.find(e => e.glyph === entry.glyph)
  const source = sourceChecks.entries.find(e => e.glyph === entry.glyph)
  assert.equal(entry.directions.length, original.strokes, entry.glyph + ' directions')
  assert.deepEqual(source.dictionary, original.dictionary)
  assert.equal(source.strokes.length, original.strokes)
  assert.equal(new Set(source.strokes.map(s => s.xmlIndex)).size, original.strokes)
  source.strokes.forEach((s, i) => {
    assert.ok(s.delay >= 0 && s.duration > 0)
    if (i) assert.ok(s.delay >= source.strokes[i - 1].delay + source.strokes[i - 1].duration)
  })
  assert.ok(['matched', 'correction-required'].includes(entry.decision))
  if (entry.decision === 'correction-required') {
    assert.ok(entry.issues.length > 0)
    assert.ok(entry.issues.every(n => Number.isInteger(n) && n >= 1 && n <= original.strokes))
  } else assert.equal(entry.issues, undefined)
}
const countStrokes = entries => entries.reduce((s, e) => s + originals.entries.find(o => o.glyph === e.glyph).strokes, 0)
assert.equal(countStrokes(review.entries), review.reviewedStrokes)
const matches = review.entries.filter(e => e.decision === 'matched')
const held = review.entries.filter(e => e.decision !== 'matched')
console.log(JSON.stringify({
  valid: true,
  selected: { characters: 50, strokes: 658 },
  reviewed: { characters: review.entries.length, strokes: countStrokes(review.entries) },
  matched: { characters: matches.length, strokes: countStrokes(matches) },
  held: held.map(e => ({ glyph: e.glyph, strokes: originals.entries.find(o => o.glyph === e.glyph).strokes, issues: e.issues })),
  pending: { characters: review.remaining.length, strokes: review.remaining.reduce((s, e) => s + e.strokes, 0), first: review.remaining[0].glyph, last: review.remaining.at(-1).glyph },
  publishedCharacters: 0,
}, null, 2))
