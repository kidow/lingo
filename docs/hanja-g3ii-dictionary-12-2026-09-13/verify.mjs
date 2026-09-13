import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'

// This checks recorded facts and provenance, not visual correctness or approval.
const root = new URL('../../', import.meta.url)
const read = (file) => readFileSync(new URL(file, root))
const json = (file) => JSON.parse(read(file).toString('utf8'))
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex')
const folder = 'docs/hanja-g3ii-dictionary-12-2026-09-13/'
const sources = json(`${folder}sources.json`)
const observations = json(`${folder}observations.json`)
const review = json(`${folder}review.json`)
const expectedGlyphs = Array.from('蓮奔森慈遷追兔透弊楓響還')
const catalog = readdirSync(new URL('content/hanja/characters/', root))
  .filter((name) => name.endsWith('.json'))
  .flatMap((name) => json(`content/hanja/characters/${name}`).characters)
const byGlyph = new Map(catalog.map((entry) => [entry.glyph, entry]))
const ordered = (values) => [...values].sort()

assert.deepEqual(ordered(sources.entries.map((entry) => entry.glyph)), ordered(expectedGlyphs))
assert.deepEqual(ordered(review.entries.map((entry) => entry.glyph)), ordered(expectedGlyphs))
assert.equal(new Set(sources.entries.map((entry) => entry.glyph)).size, 12)
assert.equal(sources.newRuntimeApprovals, 0)
assert.equal(observations.newRuntimeApprovals, 0)
for (const pin of sources.priorReviewPins) {
  const bytes = read(pin.file)
  assert.equal(bytes.length, pin.bytes, pin.file)
  assert.equal(sha256(bytes), pin.sha256, pin.file)
}

const available = sources.entries.filter((entry) => entry.sourceUrl)
assert.equal(available.length, 11)
assert.equal(available.reduce((sum, entry) => sum + entry.timingRows.length, 0), 143)
for (const entry of sources.entries) {
  assert.equal(byGlyph.get(entry.glyph)?.readingGrade, '3급II', entry.glyph)
  assert.equal(byGlyph.get(entry.glyph)?.strokes, entry.catalogStrokes, entry.glyph)
  if (!entry.sourceUrl) {
    assert.equal(entry.glyph, '遷')
    assert.equal(entry.status, 'blocked-by-paid-pagination')
    assert.equal(entry.dictionaryStrokes, null)
    continue
  }
  assert.equal(new URL(entry.sourceUrl).origin, 'http://img.e-hanja.kr')
  assert.equal(new URL(entry.detailUrl).searchParams.get('hanja'), entry.glyph)
  assert.equal(entry.sourceTitle, entry.glyph)
  assert.match(entry.sourceSha256, /^[a-f0-9]{64}$/)
  assert.equal(entry.timingRows.length, entry.dictionaryStrokes)
  entry.timingRows.forEach(([stroke, delay, duration, initialOffset], index) => {
    assert.equal(stroke, index + 1)
    assert.ok(delay > 0 && duration > 0 && initialOffset > 0)
    if (index > 0) {
      const previous = entry.timingRows[index - 1]
      assert.ok(delay >= previous[1] + previous[2])
    }
  })
}

assert.equal(observations.rows.length, 66)
assert.equal(new Set(observations.rows.map(([glyph, stroke]) => `${glyph}:${stroke}`)).size, 66)
for (const [glyph, stroke, offset, initialOffset, completed, exactPrefix] of observations.rows) {
  const entry = available.find((item) => item.glyph === glyph)
  assert.ok(entry, glyph)
  assert.equal(entry.timingRows[stroke - 1][3], initialOffset)
  assert.ok(offset > initialOffset * 0.25 && offset < initialOffset * 0.70)
  assert.equal(completed, stroke - 1)
  assert.equal(exactPrefix, true)
}
for (const entry of review.entries) {
  assert.equal(entry.strokes, byGlyph.get(entry.glyph)?.strokes)
  assert.equal(entry.runtimeApproved, false)
  assert.equal(entry.wholeCandidateGeometryReviewed, false)
  assert.deepEqual(ordered(entry.observed), ordered(observations.rows
    .filter(([glyph]) => glyph === entry.glyph).map(([, stroke]) => stroke)))
}
for (const glyph of ['森', '楓']) {
  const observed = observations.rows.filter(([name]) => name === glyph).map(([, stroke]) => stroke)
  assert.deepEqual(observed, Array.from({ length: byGlyph.get(glyph).strokes }, (_, index) => index + 1))
}
const ready = review.entries.filter((entry) => entry.status === 'ready-for-path-review')
assert.equal(ready.length, 9)
assert.equal(ready.reduce((sum, entry) => sum + entry.strokes, 0), 121)
assert.equal(review.entries.reduce((sum, entry) => sum + entry.strokes, 0), 159)
assert.equal(review.entries.find((entry) => entry.glyph === '兔').status, 'glyph-variant-conflict')
assert.equal(review.entries.find((entry) => entry.glyph === '弊').status, 'stroke-count-conflict')
assert.equal(sources.entries.find((entry) => entry.glyph === '弊').dictionaryStrokes, 14)

let liveSourcesChecked = 0
if (process.argv.includes('--online')) {
  await Promise.all(available.map(async (entry) => {
    const response = await fetch(entry.sourceUrl, { signal: AbortSignal.timeout(15000) })
    assert.ok(response.ok, `${entry.glyph}: HTTP ${response.status}`)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(bytes.length, entry.sourceBytes, entry.glyph)
    assert.equal(sha256(bytes), entry.sourceSha256, entry.glyph)
    const text = bytes.toString('utf8')
    assert.equal(text.match(/<title[^>]*>(.*?)<\/title>/s)?.[1], entry.glyph)
    const timings = Array.from(text.matchAll(/<path\b[^>]*clip-path[^>]*>/g)).map(([tag]) => {
      const clip = tag.match(/clip-path="([^"]+)"/)?.[1] ?? ''
      const style = tag.match(/style="([^"]+)"/)?.[1] ?? ''
      return [
        Number(clip.match(/c(\d+)/)?.[1]),
        Number(style.match(/--d:\s*([\d.]+)/)?.[1]),
        Number(style.match(/--t:\s*([\d.]+)/)?.[1]),
        Number(style.match(/stroke-dashoffset:\s*([\d.]+)/)?.[1]),
      ]
    }).sort((a, b) => a[0] - b[0])
    assert.deepEqual(timings, entry.timingRows, entry.glyph)
    liveSourcesChecked += 1
  }))
}

console.log(JSON.stringify({
  status: 'passed',
  priorReviewPins: sources.priorReviewPins.length,
  targetGlyphs: 12,
  targetStrokes: 159,
  publicSources: available.length,
  sourceTimingRows: 143,
  movingObservations: observations.rows.length,
  fullStrokeObservationGlyphs: ['森', '楓'],
  readyForPathReview: ready.length,
  readyForPathReviewStrokes: 121,
  liveSourcesChecked,
  newRuntimeApprovals: 0,
  currentRuntimeGlyphs: HANJA_STROKES.length,
  currentPlayableTargets: expectedGlyphs.filter((glyph) => hanjaStrokeData(byGlyph.get(glyph))),
}, null, 2))
