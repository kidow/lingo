import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { HANJA_TEXTBOOK_STROKES } from '../../lib/hanja-stroke-textbook.ts'
import { TEXTBOOK_REVIEW_REGISTRY, validateTextbookReview } from '../../scripts/hanja-stroke-textbook.ts'
import { prepare } from './prepare.mjs'

const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const queue = json('./queue.json'), observations = json('./observations.json').records
const originals = json('./originals.json'), review = json('./review.json')
const corrections = json('./corrections.json'), candidates = json('./candidate-paths.json')
const generated = prepare()
const firstFollowUp = '../hanja-g3-batch5-followup-2026-09-15/'
const secondFollowUp = '../hanja-g3-batch5-followup2-2026-09-15/'
const thirdFollowUp = '../hanja-g3-batch5-followup3-2026-09-15/'
const fourthFollowUp = '../hanja-g3-batch5-followup4-2026-09-15/'
const firstReview = json(firstFollowUp + 'review.json').records
const secondReview = json(secondFollowUp + 'review.json').records
const thirdReview = json(thirdFollowUp + 'review.json').records
const fourthReview = json(fourthFollowUp + 'review.json').records
assert.deepEqual(firstReview.map(e => e.glyph), json('./next-batch.json').glyphs)
assert.deepEqual(secondReview.map(e => e.glyph), json(firstFollowUp + 'next-batch.json').glyphs)
assert.deepEqual(thirdReview.map(e => e.glyph), json(secondFollowUp + 'next-batch.json').glyphs)
assert.deepEqual(fourthReview.map(e => e.glyph), json(thirdFollowUp + 'next-batch.json').glyphs)
const followUpReview = [...firstReview, ...secondReview, ...thirdReview, ...fourthReview]
const followUpCandidates = [firstFollowUp, secondFollowUp, thirdFollowUp, fourthFollowUp].flatMap(path => json(path + 'candidate-paths.json').characters)
assert.equal(queue.entries.length, 50)
assert.equal(queue.entries.reduce((sum, e) => sum + e.strokes, 0), 573)
assert.equal(new Set(queue.entries.map(e => e.glyph)).size, 50)
assert.deepEqual(observations.map(o => o.glyph), queue.entries.map(e => e.glyph))
assert.deepEqual(originals.map(o => o.glyph), queue.entries.map(e => e.glyph))
assert.deepEqual(review.records, generated.records)
assert.deepEqual(corrections.recipes, generated.recipes)
assert.deepEqual(candidates.characters, generated.characters)
const matched = observations.filter(o => o.decision === 'matched')
const held = observations.filter(o => o.decision === 'held')
assert.equal(matched.length, 12)
assert.equal(held.length, 38)
assert.equal(corrections.recipes.length, 2)
for (const item of queue.entries) {
  const observation = observations.find(o => o.glyph === item.glyph)
  const original = originals.find(o => o.glyph === item.glyph)
  assert.equal(original.medians.length, item.candidate ? item.candidateCounts[item.candidate] : 0)
  assert.equal(original.geometrySource, item.candidate ? queue.geometry[item.candidate].sha256 : null)
  assert.equal(item.publisherRow, item.manifest.manifestRow)
  assert.equal(item.manifest.glyph, item.glyph)
  assert.equal(item.sourceVideo.url, new URL('../media/video/' + item.publisherRow + '.mp4', queue.publisher.manifestUrl).href)
  assert.match(item.sourceVideo.sha256, /^[a-f0-9]{64}$/)
  assert.ok(item.sourceVideo.bytes > 1000)
  assert.ok(observation.notes.trim())
  if (observation.decision === 'held') {
    assert.ok(observation.conflicts.length)
    const followUp = followUpReview.find(e => e.glyph === item.glyph)
    if (followUp) {
      assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.find(e => e.glyph === item.glyph), followUp)
      assert.deepEqual(followUp.sourceVideo, item.sourceVideo)
      const entry = HANJA_TEXTBOOK_STROKES.find(e => e.glyph === item.glyph)
      assert.ok(entry)
      const { verificationSource, ...published } = entry
      assert.equal(verificationSource, queue.publisher.id)
      assert.deepEqual(published, followUpCandidates.find(e => e.glyph === item.glyph))
      validateTextbookReview(entry, item.strokes)
    } else {
      assert.equal(HANJA_STROKES.find(e => e.glyph === item.glyph), undefined)
      assert.equal(TEXTBOOK_REVIEW_REGISTRY.records.find(e => e.glyph === item.glyph), undefined)
    }
    continue
  }
  assert.equal(original.medians.length, item.strokes)
  assert.equal(observation.ends.length, item.strokes)
  assert.ok(observation.ends.every((t, i) => t > 0 && t <= original.durationSeconds && (i === 0 || t > observation.ends[i - 1])))
  const record = review.records.find(r => r.glyph === item.glyph)
  const entry = HANJA_TEXTBOOK_STROKES.find(e => e.glyph === item.glyph)
  assert.ok(entry)
  assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.find(r => r.glyph === item.glyph), record)
  assert.deepEqual(record.sourceVideo, item.sourceVideo)
  const { verificationSource, ...published } = entry
  assert.equal(verificationSource, queue.publisher.id)
  assert.deepEqual(published, candidates.characters.find(e => e.glyph === item.glyph))
  validateTextbookReview(entry, item.strokes)
}
for (const [file, before] of Object.entries(json('./baseline.json'))) {
  assert.equal(hash(json('../../' + file)[before.key].slice(0, before.count)), before.prefixSha256)
}
const catalog = json('../../content/hanja/characters/g3.json').characters
const applied = new Set(HANJA_STROKES.map(e => e.glyph))
const grade3Applied = catalog.filter(e => applied.has(e.glyph)).length
const stillHeld = held.filter(e => !followUpReview.some(r => r.glyph === e.glyph))
assert.deepEqual(stillHeld.map(e => e.glyph), json(fourthFollowUp + 'next-batch.json').glyphs)
const result = {
  result: 'pass', reviewedCharacters: 50, reviewedStrokes: 573,
  addedCharacters: matched.length, addedStrokes: review.records.reduce((sum, r) => sum + r.expectedStrokes, 0),
  orderCorrections: corrections.recipes.length,
  heldCharactersAtInitialReview: held.length, followUpApplied: followUpReview.length,
  heldCharacters: stillHeld.length, heldStrokes: queue.entries.filter(e => stillHeld.some(h => h.glyph === e.glyph)).reduce((sum, e) => sum + e.strokes, 0),
  heldGlyphs: stillHeld.map(e => e.glyph).join(''),
  runtime: applied.size, remaining: 5978 - applied.size,
  grade3Applied, grade3Remaining: catalog.length - grade3Applied,
  existingPrefixesPreserved: true, proprietaryAssetsSaved: 0,
}
console.log(JSON.stringify(result))
