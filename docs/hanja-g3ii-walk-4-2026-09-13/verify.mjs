import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { validateDictionaryBundle } from '../../scripts/hanja-stroke-dictionary.ts'

const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const originals = read('./originals.json'), candidates = read('./candidate-paths.json')
const review = read('./review.json'), corrections = read('./corrections.json')
const sources = read('../hanja-g3ii-dictionary-12-2026-09-13/sources.json')
const observations = read('./observations.json')
const glyphs = ['蓮', '追', '透', '還']
validateDictionaryBundle()
assert.deepEqual(originals.entries.map(e => e.glyph), glyphs)
assert.deepEqual(candidates.entries.map(e => e.glyph), glyphs)
assert.deepEqual(review.entries.map(e => e.glyph), glyphs)
assert.deepEqual(corrections.entries.map(e => e.glyph), glyphs)
assert.equal(observations.rows.length, 53)
assert.ok(observations.rows.every(r => r[2] > 0 && r[2] < r[3] && r[4] === r[1] - 1 && r[5]))
let liveSourcesChecked = 0, retained = 0, reordered = 0, localReplacements = 0
for (const entry of review.entries) {
  const original = originals.entries.find(e => e.glyph === entry.glyph)
  const baseline = normalizeMedians(original.medians)
  const candidate = candidates.entries.find(e => e.glyph === entry.glyph)
  const recipe = corrections.entries.find(e => e.glyph === entry.glyph)
  const source = sources.entries.find(e => e.glyph === entry.glyph)
  const published = hanjaStrokeData({ glyph: entry.glyph, strokes: entry.strokes })
  const sequence = Array.from({ length: entry.strokes }, (_, i) => i + 1)
  assert.equal(original.medians.length, entry.strokes - 1)
  assert.equal(hash(JSON.stringify(original.medians)), entry.originalMediansSha256)
  assert.equal(hash(JSON.stringify(baseline)), candidate.originalPathsSha256)
  assert.deepEqual(recipe.sourceStrokeIndices, entry.sourceStrokeIndices)
  const reconstructed = recipe.sourceStrokeIndices.map((n, i) => {
    if (n === null) { localReplacements++; return recipe.authored.find(a => a.stroke === i + 1).path }
    retained++
    if (n !== i + 1) reordered++
    return baseline[n - 1]
  })
  assert.deepEqual(reconstructed, candidate.paths)
  assert.equal(hash(JSON.stringify(reconstructed)), entry.pathsSha256)
  assert.deepEqual(published.paths, reconstructed)
  assert.deepEqual(published.sourceStrokeIndices, entry.sourceStrokeIndices)
  assert.deepEqual(observations.rows.filter(r => r[0] === entry.glyph).map(r => r[1]), sequence)
  assert.deepEqual(entry.strokeReview.map(r => r[0]), sequence)
  assert.ok(entry.strokeReview.every(r => r[1] && r[2] && r[3] === 'verified'))
  assert.ok(entry.wholeCandidateGeometryReviewed && entry.runtimeApproved)
  assert.equal(source.dictionaryStrokes, entry.strokes)
  assert.equal(source.sourceSha256, entry.sourceSha256)
  assert.equal(source.sourceUrl, entry.sourceUrl)
  if (process.argv.includes('--online')) {
    const response = await fetch(source.sourceUrl, { signal: AbortSignal.timeout(15000) })
    assert.ok(response.ok, entry.glyph + ': HTTP ' + response.status)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(bytes.length, source.sourceBytes)
    assert.equal(hash(bytes), source.sourceSha256)
    const text = bytes.toString('utf8')
    assert.equal(text.match(/<title[^>]*>(.*?)<\/title>/s)?.[1], entry.glyph)
    const timings = Array.from(text.matchAll(/<path\b[^>]*clip-path[^>]*>/g)).map(([tag]) => {
      const clip = tag.match(/clip-path="([^"]+)"/)?.[1] ?? ''
      const style = tag.match(/style="([^"]+)"/)?.[1] ?? ''
      return [Number(clip.match(/c(\d+)/)?.[1]), Number(style.match(/--d:\s*([\d.]+)/)?.[1]),
        Number(style.match(/--t:\s*([\d.]+)/)?.[1]), Number(style.match(/stroke-dashoffset:\s*([\d.]+)/)?.[1])]
    }).sort((a, b) => a[0] - b[0])
    assert.deepEqual(timings, source.timingRows)
    liveSourcesChecked++
  }
}
assert.deepEqual({ retained, reordered, localReplacements }, { retained: 33, reordered: 6, localReplacements: 20 })
const directory = new URL('../../content/hanja/characters/', import.meta.url)
const catalog = readdirSync(directory).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, directory), 'utf8')).characters)
const grade = catalog.filter(c => c.readingGrade === '3급II')
const playable = catalog.filter(c => hanjaStrokeData(c))
console.log(JSON.stringify({
  status: 'passed', glyphs, verifiedStrokes: 53, retained, reordered, localReplacements, liveSourcesChecked,
  newRuntimeGlyphs: 4, currentRuntimeGlyphs: HANJA_STROKES.length, catalogTotal: catalog.length,
  playable: playable.length, remaining: catalog.length - playable.length,
  grade3iiTotal: grade.length, grade3iiPlayable: grade.filter(c => hanjaStrokeData(c)).length,
  grade3iiRemaining: grade.filter(c => !hanjaStrokeData(c)).map(c => c.glyph),
}, null, 2))
