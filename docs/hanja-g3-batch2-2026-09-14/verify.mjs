import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { HANJA_TEXTBOOK_STROKES } from '../../lib/hanja-stroke-textbook.ts'
import { TEXTBOOK_REVIEW_REGISTRY, validateTextbookReview } from '../../scripts/hanja-stroke-textbook.ts'
import { TEXTBOOK_CORRECTIONS } from '../../scripts/hanja-stroke-textbook-corrections.ts'
import { prepare } from './prepare.mjs'

const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const queue = json('./queue.json'), observations = json('./observations.json')
const originals = json('./originals.json'), review = json('./review.json')
const corrections = json('./corrections.json'), candidates = json('./candidate-paths.json')
const generated = prepare()
assert.equal(queue.entries.length, 50)
assert.equal(queue.entries.reduce((sum, e) => sum + e.strokes, 0), 550)
assert.equal(new Set(queue.entries.map(e => e.glyph)).size, 50)
assert.deepEqual(observations.map(o => o.glyph), queue.entries.map(e => e.glyph))
assert.deepEqual(originals.map(o => o.glyph), queue.entries.map(e => e.glyph))
assert.deepEqual(review.records, generated.records)
assert.deepEqual(corrections.recipes, generated.recipes)
assert.deepEqual(candidates.characters, generated.characters)
const matched = observations.filter(o => o.decision === 'matched')
const held = observations.filter(o => o.decision === 'held')
assert.equal(matched.length, 38)
assert.equal(held.length, 12)
assert.equal(corrections.recipes.length, 5)
for (const item of queue.entries) {
  const observation = observations.find(o => o.glyph === item.glyph)
  const original = originals.find(o => o.glyph === item.glyph)
  assert.equal(original.medians.length, item.strokes)
  assert.equal(original.geometrySource, queue.geometry[item.candidate].sha256)
  assert.equal(item.publisherRow, item.manifest.manifestRow)
  assert.equal(item.manifest.glyph, item.glyph)
  assert.equal(item.sourceVideo.url, new URL('../media/video/' + item.publisherRow + '.mp4', queue.publisher.manifestUrl).href)
  assert.match(item.sourceVideo.sha256, /^[a-f0-9]{64}$/)
  assert.ok(item.sourceVideo.bytes > 1000)
  if (observation.decision === 'held') {
    assert.ok(observation.conflicts.length)
    assert.ok(observation.notes.trim())
    const resolved = [...json('../hanja-g3-batch2-followup-2026-09-14/review.json').records,
      ...json('../hanja-g3-direction-2026-09-15/review.json').records].find(r => r.glyph === item.glyph)
    if (resolved) {
      assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.find(e => e.glyph === item.glyph), resolved)
      validateTextbookReview(HANJA_STROKES.find(e => e.glyph === item.glyph), item.strokes)
    } else {
      assert.equal(HANJA_STROKES.find(e => e.glyph === item.glyph), undefined)
      assert.equal(TEXTBOOK_REVIEW_REGISTRY.records.find(e => e.glyph === item.glyph), undefined)
    }
    continue
  }
  const record = review.records.find(r => r.glyph === item.glyph)
  const entry = HANJA_TEXTBOOK_STROKES.find(e => e.glyph === item.glyph)
  assert.ok(entry)
  assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.find(r => r.glyph === item.glyph), record)
  assert.deepEqual(record.sourceVideo, item.sourceVideo)
  const { verificationSource, ...published } = entry
  assert.equal(verificationSource, queue.publisher.id)
  assert.deepEqual(published, candidates.characters.find(e => e.glyph === item.glyph))
  validateTextbookReview(entry, item.strokes)
  if (observation.order) {
    const recipe = corrections.recipes.find(r => r.glyph === item.glyph)
    assert.deepEqual([...observation.order].sort((a, b) => a - b), Array.from({ length: item.strokes }, (_, i) => i + 1))
    assert.deepEqual(recipe.strokes.map(s => s.sourceStroke), observation.order)
    assert.ok(recipe.strokes.every(s => !('points' in s)))
    assert.equal(recipe.originalMediansSha256, hash(original.medians))
    assert.deepEqual(TEXTBOOK_CORRECTIONS.find(r => r.id === recipe.id), recipe)
  }
}
for (const [file, before] of Object.entries(json('./baseline.json'))) {
  assert.equal(hash(json('../../' + file)[before.key].slice(0, before.count)), before.prefixSha256)
}
const catalog = json('../../content/hanja/characters/g3.json').characters
const applied = new Set(HANJA_STROKES.map(e => e.glyph))
const grade3Applied = catalog.filter(e => applied.has(e.glyph)).length
const result = {
  result: 'pass', reviewedCharacters: 50, reviewedStrokes: 550,
  addedCharacters: matched.length, addedStrokes: review.records.reduce((sum, r) => sum + r.expectedStrokes, 0),
  orderCorrections: corrections.recipes.length,
  heldCharacters: held.length, heldStrokes: queue.entries.filter(e => held.some(h => h.glyph === e.glyph)).reduce((sum, e) => sum + e.strokes, 0),
  heldGlyphs: held.map(e => e.glyph).join(''),
  runtime: applied.size, remaining: 5978 - applied.size,
  grade3Applied, grade3Remaining: catalog.length - grade3Applied,
  existingPrefixesPreserved: true, proprietaryAssetsSaved: 0,
}
console.log(JSON.stringify(result))
