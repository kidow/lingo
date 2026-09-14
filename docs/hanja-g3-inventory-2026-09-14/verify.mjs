/** Validate the saved discovery inventory without downloading or approving artwork. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE } from '../../scripts/hanja-stroke-audit.ts'

const read = path => readFileSync(new URL(path, import.meta.url))
const json = path => JSON.parse(read(path))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const inventory = json('./inventory.json')
const supplement = json('./supplemental-sources.json')
const catalogBytes = read('../../' + inventory.catalog.file)
const catalog = JSON.parse(catalogBytes)
const rows = inventory.rows.map(row => {
  assert.equal(row.length, inventory.fields.length)
  return Object.fromEntries(inventory.fields.map((key, i) => [key, row[i]]))
})
assert.equal(hash(catalogBytes), inventory.catalog.sha256)
assert.deepEqual(catalog.source, inventory.catalog.source)
assert.equal(rows.length, 317)
assert.equal(new Set(rows.map(r => r.glyph)).size, rows.length)
assert.equal(inventory.catalog.characters, rows.length)
assert.equal(inventory.catalog.strokes, 3483)
assert.deepEqual(rows.map(r => [r.glyph, r.catalogStrokes]), catalog.characters.map(c => [c.glyph, c.strokes]))
assert.equal(rows.reduce((n, r) => n + r.catalogStrokes, 0), inventory.catalog.strokes)
assert.ok(catalog.characters.every(c => c.readingGrade === '3급'))

const publisherPin = json('../hanja-stroke-additional-sources/sources.json').sources.find(s => s.id === inventory.publisher.id)
for (const field of ['productUrl', 'viewerUrl', 'manifestUrl', 'manifestSha256', 'manifestBytes']) assert.equal(inventory.publisher[field], publisherPin[field])
assert.equal(inventory.publisher.manifestRows, 1800)
const pins = { MM: MAKE_ME_A_HANZI_SOURCE, Ja: JAPANESE_CANDIDATE_SOURCE, Ko: CANDIDATE_SOURCE }
for (const [id, pin] of Object.entries(pins)) {
  assert.equal(inventory.geometry[id].url, pin.url)
  assert.equal(inventory.geometry[id].sha256, pin.sha256)
  assert.deepEqual(inventory.corpusCoverage[id], {
    available: rows.filter(r => r[id + 'Strokes'] !== null).length,
    countMatch: rows.filter(r => r[id + 'Strokes'] === r.catalogStrokes).length,
  })
}
const groups = { wholeStrokeReview: [], sourceFormReview: [], geometryCountReview: [], geometryNeeded: [], sourceUnavailable: [] }
for (const r of rows) {
  for (const id of ['MM', 'Ja', 'Ko']) assert.ok(r[id + 'Strokes'] === null || Number.isInteger(r[id + 'Strokes']) && r[id + 'Strokes'] > 0)
  assert.ok(['exact', 'nfc-candidate', 'absent'].includes(r.publisherMatch))
  if (r.publisherMatch === 'absent') {
    for (const field of ['publisherGlyph', 'publisherRow', 'videoHttpStatus', 'videoBytes', 'videoContentType', 'videoPrefixHttpStatus']) assert.equal(r[field], null)
    assert.equal(r.videoPrefixIsMp4, false)
  } else {
    assert.match(r.publisherRow, /^\d{4}$/)
    assert.equal(r.videoHttpStatus, 200)
    assert.ok(r.videoBytes > 32)
    assert.equal(r.videoContentType, 'application/octet-stream')
    assert.equal(r.videoPrefixHttpStatus, 206)
    assert.equal(r.videoPrefixIsMp4, true)
    if (r.publisherMatch === 'exact') assert.equal(r.publisherGlyph, r.glyph)
    else {
      assert.notEqual(r.publisherGlyph, r.glyph)
      assert.equal(r.publisherGlyph.trim().normalize('NFC'), r.glyph.normalize('NFC'))
    }
  }
  assert.equal(r.probeError, null)
  const counts = ['MM', 'Ja', 'Ko'].map(id => r[id + 'Strokes'])
  const group = r.publisherMatch !== 'exact' ? 'sourceFormReview'
    : r.videoHttpStatus !== 200 || !(r.videoBytes > 0) || !r.videoPrefixIsMp4 ? 'sourceUnavailable'
    : counts.every(n => n === null) ? 'geometryNeeded'
    : !counts.includes(r.catalogStrokes) ? 'geometryCountReview' : 'wholeStrokeReview'
  groups[group].push(r.glyph)
}
assert.deepEqual(groups, inventory.groups)
assert.equal(new Set(Object.values(groups).flat()).size, 317)
assert.deepEqual(Object.values(groups).map(g => g.length), [286, 3, 25, 3, 0])
assert.deepEqual(['exact', 'nfc-candidate', 'absent'].map(match => rows.filter(r => r.publisherMatch === match).length), [314, 1, 2])
assert.deepEqual(rows.filter(r => r.publisherMatch === 'nfc-candidate').map(r => [r.glyph, r.publisherGlyph, r.publisherRow]), [['濫', '濫', '0392']])
assert.deepEqual(inventory.variantNeighbors.map(r => [r.glyph, r.neighbor, r.sourceRows[0].manifestRow]), [['隷', '隸', '0435'], ['隣', '鄰', '0480']])

const first50 = groups.wholeStrokeReview.slice(0, 50).map(glyph => {
  const r = rows.find(row => row.glyph === glyph)
  return { glyph, strokes: r.catalogStrokes, publisherRow: r.publisherRow, candidate: ['Ko', 'MM', 'Ja'].find(id => r[id + 'Strokes'] === r.catalogStrokes) }
})
assert.deepEqual(first50, inventory.first50.entries)
assert.equal(inventory.first50.characters, 50)
assert.equal(first50.reduce((n, r) => n + r.strokes, 0), 556)
assert.equal(inventory.first50.strokes, 556)
assert.equal(inventory.first50.status, 'awaiting-complete-order-direction-boundary-and-form-review')
assert.deepEqual(supplement.records.map(r => [r.glyph, r.catalogStrokes]), [['隷', 16], ['隣', 15]])
for (const source of supplement.records) {
  assert.equal(source.sourceDisplayedStrokes, source.catalogStrokes)
  assert.equal(source.svgTitle, source.glyph)
  assert.equal(source.distinctStrokeIds, source.catalogStrokes)
  assert.equal(source.httpStatus, 200)
  assert.ok(source.bytes > 0)
  assert.match(source.sha256, /^[a-f0-9]{64}$/)
  assert.equal(new URL(source.detailUrl).searchParams.get('hanja'), source.glyph)
  assert.equal(source.fullStrokeReviewCompleted, false)
  assert.equal(source.runtimeApproved, false)
  assert.equal(source.assetsCopied, 0)
}
assert.equal(inventory.publisher.videoAssetsCopied, 0)
assert.deepEqual(inventory.runtime, { allCharacters: 1501, grade3Enabled: 0, grade3Remaining: 317, added: 0 })

// Optional historical-baseline check: later approved batches may intentionally change runtime coverage.
if (process.argv.includes('--runtime-baseline')) {
  assert.equal(HANJA_STROKES.length, inventory.runtime.allCharacters)
  assert.equal(catalog.characters.filter(c => hanjaStrokeData(c)).length, inventory.runtime.grade3Enabled)
}
console.log(JSON.stringify({ result: 'pass', characters: rows.length, strokes: inventory.catalog.strokes, groups: Object.fromEntries(Object.entries(groups).map(([key, value]) => [key, value.length])), firstBatch: { characters: 50, strokes: 556 }, supplementarySources: supplement.records.length, runtimeBaselineChecked: process.argv.includes('--runtime-baseline'), newRuntimeApprovals: 0 }))
