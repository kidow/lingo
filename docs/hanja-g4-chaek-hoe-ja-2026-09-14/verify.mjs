import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'

// Reproduce recorded facts and candidates; this does not automate visual judgment.
const root = new URL('../../', import.meta.url)
const read = (name) => readFileSync(new URL(name, root))
const json = (name) => JSON.parse(read(name).toString('utf8'))
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex')
const dir = 'docs/hanja-g4-chaek-hoe-ja-2026-09-14/'
const review = json(dir + 'review.json')
const observations = json(dir + 'observations.json')
const originals = json(dir + 'originals.json')
const candidates = json(dir + 'candidate-paths.json')
const targets = ['冊', '灰', '姉']
const sources = json(observations.sourceManifest).entries.filter((entry) => targets.includes(entry.glyph))
const catalog = readdirSync(new URL('content/hanja/characters/', root))
  .filter((name) => name.endsWith('.json'))
  .flatMap((name) => json(`content/hanja/characters/${name}`).characters)
const byGlyph = new Map(catalog.map((entry) => [entry.glyph, entry]))

assert.deepEqual(review.entries.map((entry) => entry.glyph), targets)
assert.deepEqual(candidates.entries.map((entry) => entry.glyph), targets)
assert.equal(review.newRuntimeApprovals, 0)
assert.equal(observations.newRuntimeApprovals, 0)
assert.equal(sources.length, 3)
assert.equal(observations.rows.length, 20)
assert.equal(observations.uniqueMovingStrokesReviewed, 19)
assert.equal(observations.candidateCumulativeStagesReviewed, 19)
assert.equal(observations.reorderedChaekStagesReviewed, 5)
for (const pin of review.priorPins) {
  const bytes = read(pin.file)
  assert.equal(bytes.length, pin.bytes, pin.file)
  assert.equal(hash(bytes), pin.sha256, pin.file)
}

const covered = new Set()
for (const [glyph, stroke, offset, initial, prefix] of observations.rows) {
  const source = sources.find((entry) => entry.glyph === glyph)
  assert.ok(source, glyph)
  assert.equal(initial, source.timingRows.find((row) => row[0] === stroke)?.[3], `${glyph}${stroke}`)
  assert.ok(offset > 0 && offset < initial)
  assert.ok(offset / initial >= 0.08 && offset / initial <= 0.70)
  assert.deepEqual(prefix, Array.from({ length: stroke - 1 }, (_, index) => index + 1))
  covered.add(`${glyph}:${stroke}`)
}
assert.equal(covered.size, 19)
for (const entry of review.entries) {
  const source = sources.find((source) => source.glyph === entry.glyph)
  const original = originals.sources.flatMap((source) => source.entries).find((item) => item.glyph === entry.glyph)
  const candidate = candidates.entries.find((item) => item.glyph === entry.glyph)
  assert.equal(entry.runtimeApproved, false)
  assert.equal(entry.strokes, byGlyph.get(entry.glyph)?.strokes)
  assert.equal(entry.strokes, source.dictionaryStrokes)
  assert.equal(entry.strokeReview.length, entry.strokes)
  assert.equal(original.medians.length, entry.strokes)
  assert.equal(hash(JSON.stringify(original.medians)), original.mediansSha256)
  assert.equal(candidate.originalMediansSha256, original.mediansSha256)
  assert.deepEqual(candidate.paths, normalizeMedians(original.medians))
  assert.deepEqual(candidate.proposedOrder, entry.proposedOrder)
  assert.deepEqual([...entry.proposedOrder].sort((a, b) => a - b), Array.from({ length: entry.strokes }, (_, i) => i + 1))
  entry.strokeReview.forEach(([stroke, role, direction, originalStroke, decision, reason], i) => {
    assert.equal(stroke, i + 1)
    assert.ok(covered.has(`${entry.glyph}:${stroke}`))
    assert.equal(originalStroke, entry.proposedOrder[i])
    assert.ok([role, direction, decision, reason].every((text) => typeof text === 'string' && text.length > 0))
  })
}
assert.deepEqual(candidates.entries[0].proposedOrder, [1, 2, 4, 5, 3])
assert.equal(review.entries[1].strokeReview[2][4], 'reshape')
assert.equal(review.entries[1].strokeReview[5][4], 'extend-start')
assert.equal(review.entries[2].strokeReview[3][4], 'reshape-and-join')
assert.equal(review.entries[2].strokeReview[7][4], 'align-start-and-axis')

let onlineSources = 0
if (process.argv.includes('--online')) {
  await Promise.all(sources.map(async (source) => {
    const response = await fetch(source.sourceUrl, { signal: AbortSignal.timeout(20000) })
    assert.ok(response.ok, `${source.glyph}: HTTP ${response.status}`)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(bytes.length, source.sourceBytes, source.glyph)
    assert.equal(hash(bytes), source.sourceSha256, source.glyph)
    assert.equal(bytes.toString('utf8').match(/<title[^>]*>(.*?)<\/title>/s)?.[1], source.glyph)
    onlineSources += 1
  }))
}

console.log(JSON.stringify({
  status: 'passed',
  reviewedGlyphs: 3,
  reviewedStrokes: covered.size,
  observedMovingFrames: observations.rows.length,
  cumulativeCandidateStages: 19,
  additionalReorderedStages: 5,
  originalCandidatesReproduced: 3,
  priorAndLicensePinsChecked: review.priorPins.length,
  liveDictionarySourcesChecked: onlineSources,
  newRuntimeApprovals: 0,
  currentRuntimeGlyphs: HANJA_STROKES.length,
  currentCatalogGlyphs: catalog.length,
  currentPlayableTargets: targets.filter((glyph) => hanjaStrokeData(byGlyph.get(glyph))),
  correctionRequired: targets,
}, null, 2))
