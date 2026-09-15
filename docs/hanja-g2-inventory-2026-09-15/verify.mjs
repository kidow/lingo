/** Verify captured inventory independently of network availability. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE } from '../../scripts/hanja-stroke-audit.ts'
import { plan } from './plan.mjs'

const read = path => readFileSync(new URL(path, import.meta.url))
const json = path => JSON.parse(read(path))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const inventory = json('./inventory.json'), dictionary = json('./dictionary-inventory.json')
const catalogBytes = read('../../content/hanja/characters/g2.json'), catalog = JSON.parse(catalogBytes)
const expectedGlyphs = catalog.characters.map(c => c.glyph)
assert.equal(expectedGlyphs.length, 538)
assert.equal(new Set(expectedGlyphs).size, 538)
assert.equal(catalog.characters.reduce((n, c) => n + c.strokes, 0), 6668)
assert.ok(catalog.characters.every(c => c.readingGrade === '2급'))
const records = snapshot => {
  assert.equal(snapshot.catalog.sha256, hash(catalogBytes))
  assert.equal(snapshot.catalog.characters, 538)
  assert.equal(snapshot.catalog.strokes, 6668)
  assert.equal(snapshot.rows.length, 538)
  assert.equal(new Set(snapshot.fields).size, snapshot.fields.length)
  assert.ok(snapshot.rows.every(row => row.length === snapshot.fields.length))
  const rows = snapshot.rows.map(row => Object.fromEntries(snapshot.fields.map((key, i) => [key, row[i]])))
  assert.deepEqual(rows.map(row => row.glyph), expectedGlyphs)
  assert.deepEqual(rows.map(row => row.catalogStrokes), catalog.characters.map(c => c.strokes))
  return rows
}
const geometryRows = records(inventory), dictionaryRows = records(dictionary)
const verifyPartition = groups => {
  const flat = Object.values(groups).flat()
  assert.equal(flat.length, 538)
  assert.equal(new Set(flat).size, 538)
  assert.deepEqual([...flat].sort(), [...expectedGlyphs].sort())
}
verifyPartition(inventory.geometryGroups)
verifyPartition(inventory.publisherGroups)
verifyPartition(dictionary.groups)
const publisher = json('../hanja-stroke-additional-sources/sources.json').sources.find(s => s.id === 'vivasam-high-2022')
assert.equal(inventory.publisher.manifestSha256, publisher.manifestSha256)
assert.equal(inventory.publisher.manifestRows, 1800)
assert.equal(inventory.publisher.videoAssetsCopied, 0)
assert.deepEqual(inventory.publisherGroups.sourceMissing, expectedGlyphs)
assert.equal(inventory.publisherFirst50.characters, 0)
for (const row of geometryRows) {
  assert.equal(row.publisherMatch, 'absent')
  for (const key of ['publisherGlyph', 'publisherRow', 'videoHttpStatus', 'videoBytes', 'videoContentType', 'videoPrefixHttpStatus', 'probeError']) assert.equal(row[key], null)
  assert.equal(row.videoPrefixIsMp4, false)
  const counts = ['MM', 'Ja', 'Ko'].map(key => row[key + 'Strokes'])
  assert.ok(counts.every(count => count === null || Number.isInteger(count) && count > 0))
  const expectedGroup = counts.every(count => count === null) ? 'missing' : counts.includes(row.catalogStrokes) ? 'countMatch' : 'countReview'
  assert.ok(inventory.geometryGroups[expectedGroup].includes(row.glyph))
}
const pins = { MM: MAKE_ME_A_HANZI_SOURCE, Ja: JAPANESE_CANDIDATE_SOURCE, Ko: CANDIDATE_SOURCE }
const expectedCoverage = { MM: { available: 476, countMatch: 412 }, Ja: { available: 451, countMatch: 402 }, Ko: { available: 0, countMatch: 0 } }
for (const [key, pin] of Object.entries(pins)) {
  assert.equal(inventory.geometry[key].url, pin.url)
  assert.equal(inventory.geometry[key].sha256, pin.sha256)
  assert.equal(inventory.geometry[key].license, pin.license)
  assert.deepEqual(inventory.corpusCoverage[key], expectedCoverage[key])
  assert.equal(geometryRows.filter(row => row[key + 'Strokes'] !== null).length, expectedCoverage[key].available)
  assert.equal(geometryRows.filter(row => row[key + 'Strokes'] === row.catalogStrokes).length, expectedCoverage[key].countMatch)
}
for (const [key, count, strokes] of [['countMatch', 461, 5663], ['countReview', 43, 553], ['missing', 34, 452]]) {
  const glyphs = inventory.geometryGroups[key]
  assert.equal(glyphs.length, count)
  assert.equal(geometryRows.filter(row => glyphs.includes(row.glyph)).reduce((n, row) => n + row.catalogStrokes, 0), strokes)
}
assert.equal(dictionary.source.method, 'POST')
assert.equal(dictionary.source.ajaxUrl, 'http://www.e-hanja.kr/e-hanja/dic/contents/jajun_contentA.asp')
assert.equal(dictionary.source.detailHttpStatus, 200)
assert.equal(dictionary.source.stylesheet.url, 'http://img.e-hanja.kr/hanjaSvg/aniSVG/libs/opmGna.svg.ani.min.css')
assert.equal(dictionary.source.stylesheet.httpStatus, 200)
assert.equal(dictionary.source.stylesheet.bytes, 804)
assert.equal(dictionary.source.stylesheet.sha256, '5c427b5157bb10b0f03e2b42207c55cb2149098044c3a254cd6d0a8d22f8af18')
assert.match(dictionary.source.detailSha256, /^[a-f0-9]{64}$/)
assert.equal(dictionary.proprietaryAssetsSaved, 0)
assert.equal(dictionary.runtimeApprovalsAdded, 0)
assert.deepEqual(dictionary.counts, { countMatched: 529, countReview: 9, metadataReview: 0, unavailable: 0 })
assert.deepEqual(dictionary.groups.countReview, ['瓊', '藍', '蘆', '飼', '晟', '祐', '庾', '禎', '熙'])
assert.equal(dictionary.retryHistory.length, 51)
assert.equal(new Set(dictionary.retryHistory.map(row => row.glyph)).size, 51)
assert.ok(dictionary.retryHistory.every(row => expectedGlyphs.includes(row.glyph) && row.attempts === 2 && typeof row.firstError === 'string' && row.finalError === null))
for (const row of dictionaryRows) {
  if (row.error !== null) assert.equal(typeof row.error, 'string')
  else {
    assert.equal(row.detailHttpStatus, 200)
    assert.equal(row.svgHttpStatus, 200)
    assert.ok(row.detailBytes > 0 && row.svgBytes > 0)
    assert.match(row.detailSha256, /^[a-f0-9]{64}$/)
    assert.match(row.svgSha256, /^[a-f0-9]{64}$/)
    const url = new URL(row.svgUrl)
    assert.equal(url.origin, 'http://img.e-hanja.kr')
    assert.match(url.pathname, /^\/hanjaSvg\/aniSVG\/[A-F\d]+\/[A-F\d]+\.svg$/)
    assert.equal(typeof row.timingSequenceValid, 'boolean')
    assert.equal(typeof row.clipCoverageValid, 'boolean')
  }
  const expectedGroup = row.error ? 'unavailable'
    : row.svgTitle !== row.glyph || !row.timingSequenceValid || !row.clipCoverageValid ? 'metadataReview'
    : [row.displayedStrokes, row.outlineCount, row.animatedCount, row.stepImageCount].some(count => count !== row.catalogStrokes) ? 'countReview' : 'countMatched'
  assert.ok(dictionary.groups[expectedGroup].includes(row.glyph))
}
assert.deepEqual(dictionary.counts, Object.fromEntries(Object.entries(dictionary.groups).map(([key, glyphs]) => [key, glyphs.length])))
const generated = plan(), summary = json('./summary.json'), next = json('./next-batch.json'), progress = json('./progress.json')
assert.deepEqual(summary, generated.summary)
assert.deepEqual(next, generated.nextBatch)
verifyPartition(Object.fromEntries(Object.entries(summary.actionQueue).map(([key, group]) => [key, group.glyphs])))
assert.equal(next.characters, 50)
assert.equal(next.entries.length, 50)
assert.equal(new Set(next.entries.map(row => row.glyph)).size, 50)
assert.deepEqual(next.entries.map(row => row.glyph), summary.actionQueue.wholeStrokeReview.glyphs.slice(0, 50))
for (const entry of next.entries) {
  assert.ok(dictionary.groups.countMatched.includes(entry.glyph))
  assert.ok(inventory.geometryGroups.countMatch.includes(entry.glyph))
  assert.equal(entry.status, 'awaiting-complete-order-direction-boundary-and-form-review')
}
assert.equal(next.runtimeApprovalsAdded, 0)
assert.equal(summary.runtimeApprovalsAdded, 0)
assert.equal(summary.proprietaryAssetsSaved, 0)
assert.equal(progress.total, 5978)
assert.equal(progress.applied, 1818)
assert.equal(progress.remaining, 4160)
assert.equal(progress.addedThisTask, 0)
assert.deepEqual(inventory.runtime, { allCharacters: 1818, grade2Enabled: 0, grade2Remaining: 538, added: 0 })
if (process.argv.includes('--runtime-baseline')) {
  assert.equal(HANJA_STROKES.length, 1818)
  assert.equal(catalog.characters.filter(c => hanjaStrokeData(c)).length, 0)
  assert.deepEqual(progress, generated.progress)
}
console.log(JSON.stringify({ status: 'passed', records: 538, strokes: 6668, dictionary: dictionary.counts,
  geometry: Object.fromEntries(Object.entries(inventory.geometryGroups).map(([key, glyphs]) => [key, glyphs.length])),
  nextBatch: { characters: next.characters, strokes: next.strokes, from: next.entries[0].glyph, through: next.entries.at(-1).glyph },
  runtimeAdded: 0, liveRuntimeChecked: process.argv.includes('--runtime-baseline') }))
