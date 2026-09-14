import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'

// Verify recorded provenance and timing facts, not visual direction or approval.
const root = new URL('../../', import.meta.url)
const read = (file) => readFileSync(new URL(file, root))
const json = (file) => JSON.parse(read(file).toString('utf8'))
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex')
const sources = json('docs/hanja-g4-held-11-2026-09-14/sources.json')
const targets = Array.from('液藝衛砲豊筋姉獎鍾冊灰')
const catalog = readdirSync(new URL('content/hanja/characters/', root))
  .filter((name) => name.endsWith('.json'))
  .flatMap((name) => json(`content/hanja/characters/${name}`).characters)
const byGlyph = new Map(catalog.map((entry) => [entry.glyph, entry]))

assert.deepEqual(sources.entries.map((entry) => entry.glyph), targets)
assert.equal(new Set(targets).size, 11)
assert.equal(sources.newRuntimeApprovals, 0)
assert.equal(sources.runtimeSnapshot.catalogGlyphs, 5978)
assert.equal(sources.runtimeSnapshot.runtimeGlyphs, 1490)
assert.equal(sources.runtimeSnapshot.throughG3iiPlayable, 1489)
assert.equal(sources.runtimeSnapshot.throughG3iiTotal, 1500)
assert.equal(sources.entries.reduce((sum, entry) => sum + entry.catalogStrokes, 0), 131)
assert.equal(sources.entries.filter((entry) => entry.readingGrade === '4급II').length, 5)
assert.equal(sources.entries.filter((entry) => entry.readingGrade === '4급').length, 6)

for (const pin of sources.priorReviewPins) {
  const bytes = read(pin.file)
  assert.equal(bytes.length, pin.bytes, pin.file)
  assert.equal(sha256(bytes), pin.sha256, pin.file)
}

for (const entry of sources.entries) {
  const character = byGlyph.get(entry.glyph)
  assert.ok(character, entry.glyph)
  assert.equal(character.strokes, entry.catalogStrokes, entry.glyph)
  assert.equal(character.readingGrade, entry.readingGrade, entry.glyph)
  assert.equal(entry.dictionaryStrokes, entry.catalogStrokes, entry.glyph)
  assert.equal(entry.sourceTitle, entry.glyph)
  assert.equal(entry.runtimeApproved, false)
  assert.equal(entry.status, 'source-acquired-awaiting-stroke-review')
  assert.ok(entry.priorHold.length > 0 && entry.visualObservation.length > 0)
  const detail = new URL(entry.detailUrl)
  assert.equal(detail.hostname, 'www.e-hanja.kr')
  assert.equal(detail.searchParams.get('hanja'), entry.glyph)
  assert.equal(detail.searchParams.get('keyword'), entry.glyph)
  assert.equal(new URL(entry.sourceUrl).hostname, 'img.e-hanja.kr')
  assert.match(entry.sourceSha256, /^[a-f0-9]{64}$/)
  assert.ok(Number.isInteger(entry.sourceBytes) && entry.sourceBytes > 0)
  assert.equal(entry.timingRows.length, entry.catalogStrokes, entry.glyph)
  let previousEnd = 300
  entry.timingRows.forEach(([stroke, delay, duration, offset], index) => {
    assert.equal(stroke, index + 1, entry.glyph)
    assert.ok([stroke, delay, duration, offset].every(Number.isFinite), entry.glyph)
    assert.ok(duration > 0 && offset > 0, entry.glyph)
    assert.equal(delay, previousEnd + 200, `${entry.glyph} stroke ${stroke}: gap`)
    previousEnd = delay + duration
  })
}

let liveSourcesChecked = 0
if (process.argv.includes('--online')) {
  await Promise.all(sources.entries.map(async (entry) => {
    const response = await fetch(entry.sourceUrl, { signal: AbortSignal.timeout(20000) })
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

const cumulativeGrades = new Set(['8급', '7급II', '7급', '6급II', '6급', '5급II', '5급', '4급II', '4급', '3급II'])
const throughG3ii = catalog.filter((entry) => cumulativeGrades.has(entry.readingGrade))
console.log(JSON.stringify({
  status: 'passed',
  targetGlyphs: targets.length,
  targetStrokes: 131,
  exactPublicSources: sources.entries.length,
  sourceTimingRows: sources.entries.reduce((sum, entry) => sum + entry.timingRows.length, 0),
  priorReviewPins: sources.priorReviewPins.length,
  liveSourcesChecked,
  newRuntimeApprovals: 0,
  // Live coverage is reported rather than asserted against a historical snapshot.
  currentRuntimeGlyphs: HANJA_STROKES.length,
  currentCatalogGlyphs: catalog.length,
  currentPlayableTargets: targets.filter((glyph) => hanjaStrokeData(byGlyph.get(glyph))),
  currentThroughG3iiPlayable: throughG3ii.filter((entry) => hanjaStrokeData(entry)).length,
  currentThroughG3iiTotal: throughG3ii.length,
}, null, 2))
