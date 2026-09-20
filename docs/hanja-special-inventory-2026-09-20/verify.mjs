/** Verify captured inventory independently of network availability. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE, TRADITIONAL_CANDIDATE_SOURCE,
  SIMPLIFIED_CANDIDATE_SOURCE } from '../../scripts/hanja-stroke-audit.ts'
import { CORPUS_IDS } from './audit.mjs'
import { plan, PREFERENCE } from './plan.mjs'

const read = path => readFileSync(new URL(path, import.meta.url))
const json = path => JSON.parse(read(path))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const expected = json('./expected.json')

const inventory = json('./inventory.json'), dictionary = json('./dictionary-inventory.json')
const catalogBytes = read('../../content/hanja/characters/special.json'), catalog = JSON.parse(catalogBytes)
const expectedGlyphs = catalog.characters.map(c => c.glyph)
assert.equal(expectedGlyphs.length, 1328)
assert.equal(new Set(expectedGlyphs).size, 1328)
assert.equal(catalog.characters.reduce((n, c) => n + c.strokes, 0), 18270)
assert.ok(catalog.characters.every(c => c.readingGrade === '특급'))

const records = snapshot => {
  assert.equal(snapshot.catalog.sha256, hash(catalogBytes))
  assert.equal(snapshot.catalog.characters, 1328)
  assert.equal(snapshot.catalog.strokes, 18270)
  assert.equal(snapshot.rows.length, 1328)
  assert.equal(new Set(snapshot.fields).size, snapshot.fields.length)
  assert.ok(snapshot.rows.every(row => row.length === snapshot.fields.length))
  const rows = snapshot.rows.map(row => Object.fromEntries(snapshot.fields.map((key, i) => [key, row[i]])))
  assert.deepEqual(rows.map(row => row.glyph), expectedGlyphs)
  assert.deepEqual(rows.map(row => row.catalogStrokes), catalog.characters.map(c => c.strokes))
  return rows
}
const geometryRows = records(inventory), dictionaryRows = records(dictionary)
assert.deepEqual(geometryRows.map(row => row.radical), catalog.characters.map(c => c.radical))
const verifyPartition = groups => {
  const flat = Object.values(groups).flat()
  assert.equal(flat.length, 1328)
  assert.equal(new Set(flat).size, 1328)
  assert.deepEqual([...flat].sort(), [...expectedGlyphs].sort())
}
verifyPartition(inventory.geometryGroups)
verifyPartition(dictionary.groups)

// 교과서는 겹치는 글자만 영상 존재를 확인했고 나머지는 요청하지 않았다
const publisher = json('../hanja-stroke-additional-sources/sources.json').sources.find(s => s.id === 'vivasam-high-2022')
assert.equal(inventory.publisher.manifestSha256, publisher.manifestSha256)
assert.equal(inventory.publisher.manifestRows, 1800)
assert.equal(inventory.publisher.videoAssetsCopied, 0)
assert.deepEqual(inventory.publisher.matchedGlyphs, expected.publisherGlyphs)
assert.equal(inventory.publisher.matches, expected.publisherGlyphs.length)
for (const row of geometryRows) {
  const listed = expected.publisherGlyphs.includes(row.glyph)
  assert.equal(row.publisherMatch, listed ? 'exact' : 'absent')
  if (listed) {
    assert.equal(row.videoHttpStatus, 200)
    assert.ok(row.videoBytes > 0)
    assert.equal(row.videoProbeError, null)
  } else {
    for (const key of ['publisherGlyph', 'publisherRow', 'videoHttpStatus', 'videoBytes', 'videoContentType', 'videoProbeError']) assert.equal(row[key], null)
  }
  const counts = CORPUS_IDS.map(key => row[key + 'Strokes'])
  assert.ok(counts.every(count => count === null || Number.isInteger(count) && count > 0))
  const group = counts.every(count => count === null) ? 'missing' : counts.includes(row.catalogStrokes) ? 'countMatch' : 'countReview'
  assert.ok(inventory.geometryGroups[group].includes(row.glyph))
}

const pins = { MM: MAKE_ME_A_HANZI_SOURCE, Ja: JAPANESE_CANDIDATE_SOURCE, Ko: CANDIDATE_SOURCE, Hant: TRADITIONAL_CANDIDATE_SOURCE, Hans: SIMPLIFIED_CANDIDATE_SOURCE }
assert.deepEqual(Object.keys(pins), CORPUS_IDS)
assert.deepEqual([...PREFERENCE].sort(), [...CORPUS_IDS].sort())
for (const [key, pin] of Object.entries(pins)) {
  assert.equal(inventory.geometry[key].url, pin.url)
  assert.equal(inventory.geometry[key].sha256, pin.sha256)
  assert.equal(inventory.geometry[key].license, pin.license)
  assert.deepEqual(inventory.corpusCoverage[key], expected.corpusCoverage[key])
  assert.equal(geometryRows.filter(row => row[key + 'Strokes'] !== null).length, expected.corpusCoverage[key].available)
  assert.equal(geometryRows.filter(row => row[key + 'Strokes'] === row.catalogStrokes).length, expected.corpusCoverage[key].countMatch)
}
for (const [key, count, strokes] of expected.geometryGroups) {
  const glyphs = inventory.geometryGroups[key]
  assert.equal(glyphs.length, count)
  assert.equal(geometryRows.filter(row => glyphs.includes(row.glyph)).reduce((n, row) => n + row.catalogStrokes, 0), strokes)
}

assert.equal(dictionary.source.method, 'POST')
assert.equal(dictionary.source.ajaxUrl, 'http://www.e-hanja.kr/e-hanja/dic/contents/jajun_contentA.asp')
assert.equal(dictionary.source.detailHttpStatus, 200)
assert.equal(dictionary.source.stylesheet.url, 'http://img.e-hanja.kr/hanjaSvg/aniSVG/libs/opmGna.svg.ani.min.css')
assert.equal(dictionary.source.stylesheet.httpStatus, 200)
assert.equal(dictionary.source.stylesheet.sha256, expected.stylesheetSha256)
assert.match(dictionary.source.detailSha256, /^[a-f0-9]{64}$/)
assert.equal(dictionary.proprietaryAssetsSaved, 0)
assert.equal(dictionary.runtimeApprovalsAdded, 0)
assert.deepEqual(dictionary.counts, expected.dictionaryCounts)
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
  const group = row.error ? 'unavailable'
    : row.svgTitle !== row.glyph || !row.timingSequenceValid || !row.clipCoverageValid ? 'metadataReview'
    : [row.displayedStrokes, row.outlineCount, row.animatedCount, row.stepImageCount].some(count => count !== row.catalogStrokes) ? 'countReview' : 'countMatched'
  assert.ok(dictionary.groups[group].includes(row.glyph))
}
assert.deepEqual(dictionary.counts, Object.fromEntries(Object.entries(dictionary.groups).map(([key, glyphs]) => [key, glyphs.length])))
if (dictionary.retryHistory) {
  assert.equal(dictionary.retryHistory.length, expected.retriedRows)
  assert.ok(dictionary.retryHistory.every(entry => entry.attempts === 2 && typeof entry.firstError === 'string'))
  assert.equal(dictionary.retryHistory.filter(entry => entry.finalError).length, expected.dictionaryCounts.unavailable)
} else assert.equal(expected.retriedRows, 0)

const generated = plan(), summary = json('./summary.json'), next = json('./next-batch.json'), progress = json('./progress.json')
assert.deepEqual(summary, generated.summary)
assert.deepEqual(next, generated.nextBatch)
verifyPartition(Object.fromEntries(Object.entries(summary.actionQueue).map(([key, group]) => [key, group.glyphs])))
assert.deepEqual(summary.actionQueue.publisherSource.glyphs, expected.publisherGlyphs)
assert.equal(next.characters, 50)
assert.equal(next.entries.length, 50)
assert.equal(new Set(next.entries.map(row => row.glyph)).size, 50)
assert.deepEqual(next.entries.map(row => row.glyph), summary.actionQueue.wholeStrokeReview.glyphs.slice(0, 50))
for (const entry of next.entries) {
  assert.ok(dictionary.groups.countMatched.includes(entry.glyph))
  assert.ok(inventory.geometryGroups.countMatch.includes(entry.glyph))
  assert.ok(!expected.publisherGlyphs.includes(entry.glyph))
  assert.equal(entry.candidate, entry.matchingCandidates[0])
  const row = geometryRows.find(r => r.glyph === entry.glyph)
  assert.deepEqual(entry.matchingCandidates, PREFERENCE.filter(id => row[id + 'Strokes'] === row.catalogStrokes))
  assert.equal(entry.status, 'awaiting-complete-order-direction-boundary-and-form-review')
}
assert.equal(next.runtimeApprovalsAdded, 0)
assert.equal(summary.runtimeApprovalsAdded, 0)
assert.equal(summary.proprietaryAssetsSaved, 0)
assert.equal(progress.total, 5978)
assert.equal(progress.addedThisTask, 0)
assert.deepEqual(inventory.runtime, { allCharacters: expected.runtimeStrokes, gradeEnabled: 0, gradeRemaining: 1328, added: 0 })
if (process.argv.includes('--runtime-baseline')) {
  assert.equal(HANJA_STROKES.length, expected.runtimeStrokes)
  assert.equal(catalog.characters.filter(c => hanjaStrokeData(c)).length, 0)
  assert.deepEqual(progress, generated.progress)
}
console.log(JSON.stringify({ status: 'passed', records: 1328, strokes: 18270, dictionary: dictionary.counts,
  geometry: Object.fromEntries(Object.entries(inventory.geometryGroups).map(([key, glyphs]) => [key, glyphs.length])),
  actionQueue: Object.fromEntries(Object.entries(summary.actionQueue).map(([key, group]) => [key, group.characters])),
  nextBatch: { characters: next.characters, strokes: next.strokes, from: next.entries[0].glyph, through: next.entries.at(-1).glyph },
  runtimeAdded: 0, liveRuntimeChecked: process.argv.includes('--runtime-baseline') }))
