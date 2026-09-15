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
const followUp = '../hanja-g3-batch6-followup-2026-09-15/'
const followUpReview = json(followUp + 'review.json').records
const followUpCandidates = json(followUp + 'candidate-paths.json').characters
assert.deepEqual(followUpReview.map(e => e.glyph), json('./next-batch.json').glyphs)
assert.equal(queue.status, 'reviewed-with-holds')
assert.equal(queue.entries.length, 50)
assert.equal(queue.entries.reduce((sum, e) => sum + e.strokes, 0), 547)
assert.equal(new Set(queue.entries.map(e => e.glyph)).size, 50)
assert.deepEqual(observations.map(o => o.glyph), queue.entries.map(e => e.glyph))
assert.deepEqual(originals.map(o => o.glyph), queue.entries.map(e => e.glyph))
assert.deepEqual(review.records, generated.records)
assert.deepEqual(corrections.recipes, generated.recipes)
assert.deepEqual(candidates.characters, generated.characters)
const matched = observations.filter(o => o.decision === 'matched')
const held = observations.filter(o => o.decision === 'held')
assert.equal(matched.length, 15)
assert.equal(held.length, 35)
assert.equal(corrections.recipes.length, 0)
let observedStrokes = 0
for (const item of queue.entries) {
  const observation = observations.find(o => o.glyph === item.glyph)
  const original = originals.find(o => o.glyph === item.glyph)
  assert.equal(original.medians.length, item.candidateCounts[item.candidate])
  assert.equal(original.geometrySource, queue.geometry[item.candidate].sha256)
  assert.equal(item.publisherRow, item.manifest.manifestRow)
  assert.equal(item.manifest.glyph, item.glyph)
  assert.equal(item.sourceVideo.url, new URL('../media/video/' + item.publisherRow + '.mp4', queue.publisher.manifestUrl).href)
  assert.match(item.sourceVideo.sha256, /^[a-f0-9]{64}$/)
  assert.ok(item.sourceVideo.bytes > 1000)
  assert.ok(observation.notes.trim())
  assert.equal(observation.ends.length, observation.observedStrokes ?? item.strokes, item.glyph)
  assert.ok(observation.ends.every((t, i) => Number.isFinite(t) && t > 0 && t <= original.durationSeconds && (i === 0 || t > observation.ends[i - 1])), item.glyph)
  observedStrokes += observation.ends.length
  if (observation.decision === 'held') {
    assert.ok(observation.conflicts.length)
    const resolved = followUpReview.find(e => e.glyph === item.glyph)
    if (resolved) {
      assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.find(e => e.glyph === item.glyph), resolved)
      assert.deepEqual(resolved.sourceVideo, item.sourceVideo)
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
assert.equal(observedStrokes, 545)
for (const [file, before] of Object.entries(json('./baseline.json'))) {
  assert.equal(hash(json('../../' + file)[before.key].slice(0, before.count)), before.prefixSha256, file)
}
const next = json('./next-batch.json')
assert.equal(next.characters, next.glyphs.length)
assert.ok(next.glyphs.every(g => held.some(e => e.glyph === g)))
assert.equal(next.strokes, queue.entries.filter(e => next.glyphs.includes(e.glyph)).reduce((sum, e) => sum + e.strokes, 0))

let freshVideos = 0
if (process.argv.includes('--fresh')) {
  async function verifySource(url, sha256, bytes) {
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) })
    assert.ok(response.ok, url)
    const body = Buffer.from(await response.arrayBuffer())
    assert.equal(body.length, bytes, url)
    assert.equal(createHash('sha256').update(body).digest('hex'), sha256, url)
  }
  await verifySource(queue.publisher.manifestUrl, queue.publisher.manifestSha256, queue.publisher.manifestBytes)
  for (let i = 0; i < queue.entries.length; i += 5) {
    await Promise.all(queue.entries.slice(i, i + 5).map(async item => {
      await verifySource(item.sourceVideo.url, item.sourceVideo.sha256, item.sourceVideo.bytes)
      freshVideos++
    }))
  }
}
const catalog = json('../../content/hanja/characters/g3.json').characters
const applied = new Set(HANJA_STROKES.map(e => e.glyph))
const grade3Applied = catalog.filter(e => applied.has(e.glyph)).length
const stillHeld = held.filter(e => !followUpReview.some(r => r.glyph === e.glyph))
assert.equal(stillHeld.length, 25)
console.log(JSON.stringify({
  result: 'pass', reviewedCharacters: 50, catalogStrokes: 547, observedStrokes,
  addedCharacters: matched.length, addedStrokes: review.records.reduce((sum, r) => sum + r.expectedStrokes, 0),
  initiallyHeldCharacters: held.length, followUpApplied: followUpReview.length,
  heldCharacters: stillHeld.length, heldCatalogStrokes: queue.entries.filter(e => stillHeld.some(h => h.glyph === e.glyph)).reduce((sum, e) => sum + e.strokes, 0),
  heldGlyphs: stillHeld.map(e => e.glyph).join(''),
  runtime: applied.size, remaining: 5978 - applied.size,
  grade3Applied, grade3Remaining: catalog.length - grade3Applied,
  textbookPublished: HANJA_TEXTBOOK_STROKES.length, reviewRecords: TEXTBOOK_REVIEW_REGISTRY.records.length,
  existingPrefixesPreserved: true, freshVideos, proprietaryAssetsSaved: 0,
}))
