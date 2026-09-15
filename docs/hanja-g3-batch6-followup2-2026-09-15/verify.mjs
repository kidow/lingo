/** Verify this reviewed append without changing source media or application data. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { HANJA_TEXTBOOK_STROKES } from '../../lib/hanja-stroke-textbook.ts'
import { TEXTBOOK_REVIEW_REGISTRY, validateTextbookReview } from '../../scripts/hanja-stroke-textbook.ts'
import { TEXTBOOK_CORRECTIONS } from '../../scripts/hanja-stroke-textbook-corrections.ts'
import { prepare } from './prepare.mjs'

const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const sha = bytes => createHash('sha256').update(bytes).digest('hex')
const hash = value => sha(JSON.stringify(value))
const expected = [...'貝抱幅漂旱咸奚該軒絃']
const queue = json('../hanja-g3-batch6-2026-09-15/queue.json')
const originals = json('../hanja-g3-batch6-2026-09-15/originals.json')
const oldObservations = json('../hanja-g3-batch6-2026-09-15/observations.json').records
const observations = json('./observations.json')
const review = json('./review.json'), corrections = json('./corrections.json')
const candidates = json('./candidate-paths.json'), proposals = json('./proposals.json')
const scope = json('./scope.json'), sources = json('./source-checks.json'), generated = prepare()
assert.deepEqual(observations.map(e => e.glyph), expected)
assert.deepEqual(review.records.map(e => e.glyph), expected)
assert.deepEqual(corrections.recipes.map(e => e.glyph), expected)
assert.deepEqual(candidates.characters.map(e => e.glyph), expected)
assert.deepEqual(sources.entries.map(e => e.glyph), expected)
assert.deepEqual(review.records, generated.records)
assert.deepEqual(corrections.recipes, generated.recipes)
assert.deepEqual(candidates.characters, generated.characters)
assert.equal(review.records.reduce((n, e) => n + e.expectedStrokes, 0), 101)
assert.deepEqual(scope.glyphs, expected)
let freshSourcePins = 0
for (const glyph of expected) {
  const item = queue.entries.find(e => e.glyph === glyph)
  const original = originals.find(e => e.glyph === glyph)
  const observation = observations.find(e => e.glyph === glyph)
  const record = review.records.find(e => e.glyph === glyph)
  const recipe = corrections.recipes.find(e => e.glyph === glyph)
  const candidate = candidates.characters.find(e => e.glyph === glyph)
  const source = sources.entries.find(e => e.glyph === glyph)
  assert.equal(oldObservations.find(e => e.glyph === glyph).decision, 'held')
  assert.equal(observation.decision, 'matched')
  assert.equal(observation.candidate, item.candidate)
  assert.equal(recipe.originalMediansSha256, hash(original.medians))
  assert.equal(recipe.geometrySource, queue.geometry[item.candidate].sha256)
  assert.equal(recipe.sourceVideoSha256, item.sourceVideo.sha256)
  assert.deepEqual(recipe.strokes, proposals[glyph])
  assert.equal(recipe.strokes.length, item.strokes)
  assert.equal(candidate.paths.length, item.strokes)
  assert.equal(record.candidateStrokes, original.medians.length)
  assert.deepEqual(record.sourceVideo, item.sourceVideo)
  assert.deepEqual(source.sourceVideo, item.sourceVideo)
  assert.equal(source.durationSeconds, original.durationSeconds)
  assert.equal(source.originalMediansSha256, hash(original.medians))
  assert.equal(record.strokeEndsSeconds.length, item.strokes)
  let previousTime = 0
  for (const end of record.strokeEndsSeconds) {
    assert.ok(end > previousTime && end <= source.durationSeconds)
    previousTime = end
  }
  for (const stroke of recipe.strokes) {
    assert.ok(stroke.sourceStroke === null ||
      Number.isInteger(stroke.sourceStroke) && stroke.sourceStroke >= 1 && stroke.sourceStroke <= original.medians.length)
    if (stroke.sourceStroke === null) assert.ok(stroke.points?.length >= 2)
    for (const point of stroke.points ?? []) {
      assert.equal(point.length, 2)
      assert.ok(point.every(n => Number.isFinite(n) && n >= 0 && n <= 100))
    }
  }
  assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.find(e => e.glyph === glyph), record)
  assert.deepEqual(TEXTBOOK_CORRECTIONS.find(e => e.id === recipe.id), recipe)
  const entry = HANJA_TEXTBOOK_STROKES.find(e => e.glyph === glyph)
  assert.ok(entry)
  const { verificationSource, ...published } = entry
  assert.equal(verificationSource, queue.publisher.id)
  assert.deepEqual(published, candidate)
  assert.equal(hash(candidate.paths), record.pathsSha256)
  assert.equal(HANJA_STROKES.filter(e => e.glyph === glyph).length, 1)
  validateTextbookReview(entry, item.strokes)
  if (process.argv.includes('--fresh')) {
    const response = await fetch(item.sourceVideo.url, { signal: AbortSignal.timeout(30000) })
    assert.ok(response.ok, glyph + ' publisher fetch failed')
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(bytes.length, item.sourceVideo.bytes)
    assert.equal(sha(bytes), item.sourceVideo.sha256)
    freshSourcePins++
  }
}
for (const glyph of expected) {
  assert.deepEqual(proposals[glyph].map(s => s.sourceStroke).sort((a, b) => a - b),
    Array.from({ length: queue.entries.find(e => e.glyph === glyph).strokes }, (_, i) => i + 1))
}
assert.deepEqual(proposals['咸'].map(s => s.sourceStroke), [2,1,3,4,5,6,7,8,9])
assert.deepEqual(proposals['絃'].map(s => s.sourceStroke), [1,2,3,5,4,6,7,8,9,10,11])
for (const [file, before] of Object.entries(json('./baseline.json'))) {
  assert.equal(hash(json('../../' + file)[before.key].slice(0, before.count)), before.prefixSha256)
}
const catalog = json('../../content/hanja/characters/g3.json').characters
const applied = new Set(HANJA_STROKES.map(e => e.glyph))
const grade3Applied = catalog.filter(e => applied.has(e.glyph)).length
console.log(JSON.stringify({
  result: 'pass', reviewedCharacters: 10, reviewedStrokes: 101,
  addedCharacters: 10, addedStrokes: 101, corrections: 10, heldCharacters: 0,
  runtime: applied.size, remaining: 5978 - applied.size,
  grade3Applied, grade3Remaining: catalog.length - grade3Applied,
  existingPrefixesPreserved: true, freshSourcePins, proprietaryAssetsSaved: 0,
}))
