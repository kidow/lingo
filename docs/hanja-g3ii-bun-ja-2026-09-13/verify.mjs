import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { DICTIONARY_REFERENCES } from '../../lib/hanja-stroke-dictionary.ts'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { validateDictionaryBundle } from '../../scripts/hanja-stroke-dictionary.ts'

const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const sha256 = value => createHash('sha256').update(value).digest('hex')
const originals = read('./originals.json'), candidates = read('./candidate-paths.json')
const review = read('./review.json'), corrections = read('./corrections.json')
const sources = read('../hanja-g3ii-dictionary-12-2026-09-13/sources.json')
const previous = read('../hanja-g3ii-dictionary-12-2026-09-13/observations.json')
const observations = read('./observations.json')
const glyphs = ['奔', '慈']
validateDictionaryBundle()
assert.deepEqual(originals.entries.map(e => e.glyph), glyphs)
assert.deepEqual(candidates.entries.map(e => e.glyph), glyphs)
assert.deepEqual(review.entries.map(e => e.glyph), glyphs)
assert.deepEqual(corrections.entries.map(e => e.stroke), [4, 7, 11])
assert.equal(observations.rows.length, 12)
assert.equal(observations.additionalDirectionObservations.length, 5)
for (const row of [...observations.rows, ...observations.additionalDirectionObservations]) {
  assert.ok(row[2] > 0 && row[2] < row[3] && row[4] === row[1] - 1 && row[5])
}
let liveSourcesChecked = 0
for (const original of originals.entries) {
  const glyph = original.glyph, ref = DICTIONARY_REFERENCES[glyph]
  const candidate = candidates.entries.find(e => e.glyph === glyph)
  const decision = review.entries.find(e => e.glyph === glyph)
  const source = sources.entries.find(e => e.glyph === glyph)
  const rows = [...previous.rows, ...observations.rows].filter(row => row[0] === glyph).sort((a,b) => a[1]-b[1])
  const sequence = Array.from({ length: ref.strokes }, (_, i) => i + 1)
  const published = hanjaStrokeData({ glyph, strokes: ref.strokes })
  const baseline = normalizeMedians(original.medians)
  const expected = baseline.map((path, i) => glyph === '慈' ? corrections.entries.find(e => e.stroke === i + 1)?.path ?? path : path)
  assert.equal(sha256(JSON.stringify(original.medians)), ref.originalMediansSha256)
  assert.equal(sha256(JSON.stringify(baseline)), candidate.originalPathsSha256)
  assert.deepEqual(expected, candidate.paths)
  assert.equal(sha256(JSON.stringify(candidate.paths)), ref.pathsSha256)
  assert.deepEqual(published.paths, candidate.paths)
  assert.deepEqual(published.sourceStrokeIndices, decision.sourceStrokeIndices)
  assert.deepEqual(rows.map(row => row[1]), sequence)
  assert.deepEqual(decision.strokeReview.map(row => row[0]), sequence)
  assert.ok(decision.strokeReview.every(row => row[3] === 'verified'))
  assert.ok(decision.runtimeApproved && decision.wholeCandidateGeometryReviewed)
  assert.equal(source.sourceSha256, ref.svgSha256)
  assert.equal(source.dictionaryStrokes, ref.strokes)
  if (process.argv.includes('--online')) {
    const response = await fetch(source.sourceUrl, { signal: AbortSignal.timeout(15000) })
    assert.ok(response.ok, `${glyph}: HTTP ${response.status}`)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(bytes.length, source.sourceBytes)
    assert.equal(sha256(bytes), ref.svgSha256)
    const text = bytes.toString('utf8')
    assert.equal(text.match(/<title[^>]*>(.*?)<\/title>/s)?.[1], glyph)
    const timings = Array.from(text.matchAll(/<path\b[^>]*clip-path[^>]*>/g)).map(([tag]) => {
      const clip = tag.match(/clip-path="([^"]+)"/)?.[1] ?? ''
      const style = tag.match(/style="([^"]+)"/)?.[1] ?? ''
      return [Number(clip.match(/c(\d+)/)?.[1]), Number(style.match(/--d:\s*([\d.]+)/)?.[1]),
        Number(style.match(/--t:\s*([\d.]+)/)?.[1]), Number(style.match(/stroke-dashoffset:\s*([\d.]+)/)?.[1])]
    }).sort((a,b) => a[0]-b[0])
    assert.deepEqual(timings, source.timingRows)
    liveSourcesChecked += 1
  }
}
const directory = new URL('../../content/hanja/characters/', import.meta.url)
const catalog = readdirSync(directory).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, directory), 'utf8')).characters)
const grade = catalog.filter(c => c.readingGrade === '3급II')
const playable = catalog.filter(c => hanjaStrokeData(c))
console.log(JSON.stringify({ status:'passed', glyphs, verifiedStrokes:21, locallyAuthoredReplacementStrokes:3,
  liveSourcesChecked, priorCoveredStrokes:9, newlyCoveredStrokes:12, additionalConflictFrames:5,
  newRuntimeGlyphs:2, currentRuntimeGlyphs:HANJA_STROKES.length,
  catalogTotal:catalog.length, playable:playable.length, remaining:catalog.length-playable.length,
  grade3iiTotal:grade.length, grade3iiPlayable:grade.filter(c => hanjaStrokeData(c)).length,
  grade3iiRemaining:grade.filter(c => !hanjaStrokeData(c)).map(c => c.glyph),
},null,2))
