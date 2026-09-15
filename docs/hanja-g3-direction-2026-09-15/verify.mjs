/** Verify this reviewed append without changing source media or application data. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { HANJA_TEXTBOOK_STROKES } from '../../lib/hanja-stroke-textbook.ts'
import { TEXTBOOK_REVIEW_REGISTRY, textbookSourceGlyph, validateTextbookReview } from '../../scripts/hanja-stroke-textbook.ts'
import { TEXTBOOK_CORRECTIONS } from '../../scripts/hanja-stroke-textbook-corrections.ts'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { prepare } from './prepare.mjs'

const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const sha = bytes => createHash('sha256').update(bytes).digest('hex')
const hash = value => sha(JSON.stringify(value))
const expected = [...'屯鈍']
const queue = json('./queue.json')
const originals = json('./originals.json')
const catalog = json('../../content/hanja/characters/g3.json').characters
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
assert.equal(review.records.reduce((n, e) => n + e.expectedStrokes, 0), 16)
assert.deepEqual(scope.glyphs, expected)
let freshSourcePins = 0
let freshManifest = false
if (process.argv.includes('--fresh')) {
  const response = await fetch(queue.publisher.manifestUrl, { signal: AbortSignal.timeout(30000) })
  assert.ok(response.ok, 'publisher manifest fetch failed')
  const bytes = Buffer.from(await response.arrayBuffer())
  assert.equal(sha(bytes), queue.publisher.manifestSha256)
  freshManifest = true
}
for (const glyph of expected) {
  const item = queue.entries.find(e => e.glyph === glyph)
  const current = catalog.find(e => e.glyph === glyph)
  const original = originals.find(e => e.glyph === glyph)
  const observation = observations.find(e => e.glyph === glyph)
  const record = review.records.find(e => e.glyph === glyph)
  const recipe = corrections.recipes.find(e => e.glyph === glyph)
  const candidate = candidates.characters.find(e => e.glyph === glyph)
  const source = sources.entries.find(e => e.glyph === glyph)
  assert.equal(observation.decision, 'matched')
  assert.equal(textbookSourceGlyph(record), item.manifest.glyph)
  assert.equal(candidate.sourceReference.glyph, item.manifest.glyph)
  assert.equal(item.manifest.glyph.normalize('NFC'), glyph)
  assert.equal(record.sourceFormCorrection, undefined)
  assert.equal(observation.candidate, item.candidate)
  assert.equal(recipe.originalMediansSha256, hash(original.medians))
  assert.equal(recipe.geometrySource, queue.geometry[item.candidate].sha256)
  assert.equal(recipe.sourceVideoSha256, item.sourceVideo.sha256)
  assert.deepEqual(recipe.strokes, proposals[glyph])
  assert.equal(recipe.strokes.length, current.strokes)
  assert.equal(candidate.paths.length, current.strokes)
  assert.equal(record.candidateStrokes, original.medians.length)
  assert.deepEqual(record.sourceVideo, item.sourceVideo)
  assert.deepEqual(source.sourceVideo, item.sourceVideo)
  assert.equal(source.durationSeconds, original.durationSeconds)
  assert.equal(source.originalMediansSha256, hash(original.medians))
  assert.equal(record.strokeEndsSeconds.length, current.strokes)
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
  validateTextbookReview(entry, current.strokes)
  if (process.argv.includes('--fresh')) {
    const response = await fetch(item.sourceVideo.url, { signal: AbortSignal.timeout(30000) })
    assert.ok(response.ok, glyph + ' publisher fetch failed')
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(bytes.length, item.sourceVideo.bytes)
    assert.equal(sha(bytes), item.sourceVideo.sha256)
    freshSourcePins++
  }
}
const sourceMaps = { 屯: [1,2,3,4], 鈍: [1,2,3,4,5,6,7,8,9,10,11,12] }
for (const glyph of expected) assert.deepEqual(proposals[glyph].map(s => s.sourceStroke), sourceMaps[glyph])
for (const [file, before] of Object.entries(json('./baseline.json'))) {
  assert.equal(hash(json('../../' + file)[before.key].slice(0, before.count)), before.prefixSha256)
}
const direction = json('./direction-review.json')
assert.equal(direction.supersedes.length, 2)
assert.equal(scope.status, 'review-complete')
const dictionaries = json('./dictionary.json').records
for (const [glyph, horizontal, vertical] of [['屯',1,3], ['鈍',9,11]]) {
  const raw = originals.find(e => e.glyph === glyph).medians
  const normalized = normalizeMedians(raw).map(path => [...path.matchAll(/[ML]([0-9.-]+) ([0-9.-]+)/g)].map(m => [Number(m[1]), Number(m[2])]))
  const strokes = proposals[glyph]
  assert.deepEqual(strokes[horizontal - 1].points, normalized[horizontal - 1].slice().reverse())
  assert.equal(strokes.filter(s => s.points).length, 1)
  assert.equal(strokes[vertical - 1].points, undefined)
  const h = strokes[horizontal - 1].points
  assert.ok(h.at(-1)[0] < h[0][0])
  const p = normalized[vertical - 1]
  assert.ok(p.at(-1)[1] > p[0][1])
  const d = direction.supersedes.find(e => e.glyph === glyph)
  assert.equal(d.outputStroke, vertical)
  assert.equal(d.correctedDirection, 'top-to-bottom')
  assert.equal(d.candidateChanged, false)
  assert.ok(d.guideOnlySeconds[1] < d.inkGrowthSeconds[0])
  const dictionary = dictionaries.find(e => e.glyph === glyph)
  assert.deepEqual(dictionary.animation.map(([start], i) => ({start, index:i+1}))
    .sort((a,b) => a.start-b.start).map(e => e.index), direction.dictionaryChronologicalXmlIndices[glyph])
}
let freshDictionaryPins = 0, freshGeometry = false
if (process.argv.includes('--fresh')) {
  for (const pin of dictionaries) {
    const response = await fetch(pin.svgUrl, { signal: AbortSignal.timeout(30000) })
    assert.ok(response.ok)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(bytes.length, pin.bytes)
    assert.equal(sha(bytes), pin.sha256)
    freshDictionaryPins++
  }
  const pin = queue.geometry.MM
  const response = await fetch(pin.url, { signal: AbortSignal.timeout(30000) })
  assert.ok(response.ok)
  const bytes = Buffer.from(await response.arrayBuffer())
  assert.equal(bytes.length, pin.bytes)
  assert.equal(sha(bytes), pin.sha256)
  const rows = new Map(bytes.toString().trim().split('\n').map(s => JSON.parse(s)).map(e => [e.character, e.medians]))
  for (const original of originals) assert.deepEqual(rows.get(original.glyph), original.medians)
  freshGeometry = true
}
const applied = new Set(HANJA_STROKES.map(e => e.glyph))
const grade3Applied = catalog.filter(e => applied.has(e.glyph)).length
console.log(JSON.stringify({
  result: 'pass', reviewedCharacters: 2, reviewedStrokes: 16, originalCatalogStrokes: 16,
  addedCharacters: 2, addedStrokes: 16, corrections: 2, heldCharacters: 0,
  runtime: applied.size, remaining: 5978 - applied.size,
  grade3Applied, grade3Remaining: catalog.length - grade3Applied,
  existingPrefixesPreserved: true, freshSourcePins, freshManifest, freshDictionaryPins, freshGeometry, proprietaryAssetsSaved: 0,
}))
