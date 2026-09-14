import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { HANJA_TEXTBOOK_SOURCE, HANJA_TEXTBOOK_STROKES } from '../../lib/hanja-stroke-textbook.ts'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { TEXTBOOK_REVIEW_REGISTRY, validateTextbookReview } from '../../scripts/hanja-stroke-textbook.ts'
import { TEXTBOOK_CORRECTIONS, textbookCorrectionSha256, textbookGeometry } from '../../scripts/hanja-stroke-textbook-corrections.ts'

const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const review = json('./review.json'), observations = json('./observations.json')
const originals = json('./originals.json'), paths = json('./candidate-paths.json')
const orders = json('./orders.json'), recipes = json('./corrections.json').recipes
const baseline = json('./baseline.json'), inventory = json('../hanja-g3-inventory-2026-09-14/inventory.json')
const catalog = json('../../content/hanja/characters/g3.json').characters
const held = [...'肩絹繫顧郭郊矯糾那奈稻']
const corrected = [...'卿癸愧驅乃篤']
const approved = review.records.filter(r => r.decision !== 'held')
const runtimeBaseline = process.argv.includes('--runtime-baseline')
const glyphs = list => list.map(r => r.glyph)
const sum = list => list.reduce((n, r) => n + r.expectedStrokes, 0)

assert.equal(review.manifest.sha256, HANJA_TEXTBOOK_SOURCE.manifestSha256)
assert.equal(review.manifest.url, inventory.publisher.manifestUrl)
assert.deepEqual(glyphs(review.records), glyphs(inventory.first50.entries))
assert.deepEqual(glyphs(observations), glyphs(review.records))
assert.deepEqual(glyphs(originals), glyphs(review.records))
assert.deepEqual(glyphs(paths), glyphs(review.records))
assert.deepEqual(glyphs(review.records.filter(r => r.decision === 'held')), held)
assert.deepEqual(glyphs(recipes), corrected)
assert.deepEqual(Object.keys(orders), corrected)
assert.equal(approved.length, 39)
assert.equal(sum(approved), 420)
assert.equal(sum(review.records), 556)

for (const r of review.records) {
  const original = originals.find(o => o.glyph === r.glyph)
  const observed = observations.find(o => o.glyph === r.glyph)
  const candidate = inventory.first50.entries.find(o => o.glyph === r.glyph)
  const character = catalog.find(c => c.glyph === r.glyph)
  const runtime = hanjaStrokeData(character)
  assert.equal(character.strokes, r.expectedStrokes, r.glyph)
  assert.equal(candidate.publisherRow, r.manifestRow)
  assert.equal(original.geometrySource.sha256, inventory.geometry[candidate.candidate].sha256)
  assert.equal(original.geometrySource.url, inventory.geometry[candidate.candidate].url)
  assert.equal(r.geometrySource, original.geometrySource.sha256)
  assert.equal(hash(original.medians), original.originalMediansSha256)
  assert.equal(original.medians.length, r.expectedStrokes)
  assert.equal(r.sourceVideo.url, new URL('../media/video/' + r.manifestRow + '.mp4', HANJA_TEXTBOOK_SOURCE.manifestUrl).href)
  assert.match(r.sourceVideo.sha256, /^[a-f0-9]{64}$/)
  assert.ok(r.sourceVideo.bytes > 0)
  assert.ok(r.videoFilename.startsWith(r.manifestRow + ' '))
  assert.deepEqual(r.strokeEndsSeconds, observed.ends)
  assert.equal(r.strokeEndsSeconds.length, r.expectedStrokes)
  assert.equal(r.overview.fps, 2)
  assert.equal(r.overview.from, 0)
  assert.equal(r.overview.to, Math.floor(r.durationSeconds * 2) / 2)
  r.strokeEndsSeconds.forEach((t, i, all) => {
    assert.ok(Number.isFinite(t) && t > (all[i - 1] ?? 0) && t <= r.durationSeconds, r.glyph + ' observation ' + (i + 1))
  })
  if (r.detail) {
    assert.deepEqual(r.detail, observed.detail)
    assert.equal(r.detail.fps, 10)
    assert.ok((r.detail.startIndex + r.detail.count - 1) / 10 <= r.durationSeconds)
  }
  const displayed = paths.find(p => p.glyph === r.glyph).paths
  const normalized = normalizeMedians(original.medians)
  const order = orders[r.glyph] ?? normalized.map((_, i) => i + 1)
  assert.deepEqual([...order].sort((a, b) => a - b), normalized.map((_, i) => i + 1))
  assert.deepEqual(displayed, order.map(i => normalized[i - 1]))

  if (r.decision === 'held') {
    // Later documented batches can resolve these historical holds.
    if (runtimeBaseline) assert.equal(runtime, null, r.glyph + ' must remain disabled at the original baseline')
    assert.ok(Object.values(r.checks).some(c => c !== 'match'))
    if (runtimeBaseline) assert.ok(!TEXTBOOK_REVIEW_REGISTRY.records.some(e => e.glyph === r.glyph))
    continue
  }
  assert.deepEqual(r.checks, { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' })
  const record = TEXTBOOK_REVIEW_REGISTRY.records.find(e => e.glyph === r.glyph)
  const entry = HANJA_TEXTBOOK_STROKES.find(e => e.glyph === r.glyph)
  assert.ok(record && entry && runtime)
  assert.equal(record.status, 'matched')
  assert.equal(record.reviewedAt, review.reviewedAt)
  assert.equal(record.reviewMethod, 'video-frame-sequence')
  assert.deepEqual(record.sourceVideo, r.sourceVideo)
  assert.deepEqual(record.strokeEndsSeconds, r.strokeEndsSeconds)
  assert.equal(record.durationSeconds, r.durationSeconds)
  assert.equal(record.manifestRow, r.manifestRow)
  assert.equal(record.videoFilename, r.videoFilename)
  assert.deepEqual(record.checks, r.checks)
  assert.equal(entry.sourceReference.glyph, r.glyph)
  assert.deepEqual(runtime.paths, displayed)
  assert.deepEqual(entry.paths, displayed)
  assert.equal(record.pathsSha256, hash(displayed))
  assert.equal(entry.pathsSha256, hash(displayed))
  const recipe = recipes.find(e => e.glyph === r.glyph)
  if (recipe) {
    assert.deepEqual(TEXTBOOK_CORRECTIONS.find(e => e.glyph === r.glyph), recipe)
    assert.equal(record.correctionSha256, textbookCorrectionSha256(recipe))
    assert.equal(recipe.originalMediansSha256, original.originalMediansSha256)
    assert.equal(recipe.sourceVideoSha256, r.sourceVideo.sha256)
    assert.ok(recipe.strokes.every(s => Object.keys(s).length === 1 && Number.isInteger(s.sourceStroke)))
    assert.deepEqual(recipe.strokes.map(s => s.sourceStroke), order)
    assert.deepEqual(entry.sourceStrokeIndices, order)
    assert.deepEqual(observed.afterCorrection, r.checks)
  } else assert.equal(record.geometryCorrection, undefined)
  assert.deepEqual(textbookGeometry(record, original.medians).paths, displayed)
  validateTextbookReview(entry, character.strokes)
}

// All pre-existing records remain byte-equivalent after canonical serialization.
for (const [file, before] of Object.entries(baseline)) {
  const list = json('../../' + file)[before.key]
  assert.equal(hash(list.slice(0, before.count)), before.prefixSha256, file)
  const added = list.slice(before.count, before.count + (before.key === 'recipes' ? corrected.length : approved.length))
  assert.deepEqual(glyphs(added), before.key === 'recipes' ? corrected : glyphs(approved))
}
if (runtimeBaseline) {
  assert.equal(HANJA_STROKES.length, 1540)
  assert.equal(catalog.filter(c => hanjaStrokeData(c)).length, 39)
}
assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
console.log(JSON.stringify({ result: 'pass', reviewed: { characters: 50, strokes: 556 }, applied: { characters: 39, strokes: 420 }, orderCorrections: 6, heldAtReview: { characters: 11, strokes: 136 }, runtimeAtReview: { applied: 1540, total: 5978, remaining: 4438 }, grade3AtReview: { applied: 39, total: 317, remaining: 278 }, currentRuntime: HANJA_STROKES.length, runtimeBaselineChecked: runtimeBaseline, preservedPriorRecords: true, publisherAssetsCopied: 0 }))
