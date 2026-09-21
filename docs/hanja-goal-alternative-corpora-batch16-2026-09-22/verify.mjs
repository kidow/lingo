import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
const read = f => JSON.parse(readFileSync(new URL(f, import.meta.url), 'utf8'))
const original = read('originals.json'), candidates = read('candidates.json'), findings = read('findings.json'), coverage = read('coverage.json'), sources = read('sources.json')
assert.equal(original.revision, 'ec5e17cca76c87587790bcbce5ea0b4d4fb753d6')
assert.equal(original.license, 'Arphic Public License')
assert.deepEqual(candidates.map(e => e.glyph), ['兕', '牖', '瘦'])
let total = 0
for (const c of candidates) {
  const o = original.entries.find(e => e.glyph === c.glyph), f = findings.entries.find(e => e.glyph === c.glyph)
  assert(o && f)
  assert.equal(createHash('sha256').update(JSON.stringify(o.medians)).digest('hex'), o.mediansSha256)
  assert.deepEqual(c.strokes.map(s => s.path), normalizeMedians(o.medians))
  assert.equal(c.strokes.length, c.dictionary.strokes)
  assert.deepEqual(f.reviewedStrokeIndices, c.strokes.map((_, i) => i + 1))
  assert.equal(f.reviewedCumulativeStates, c.strokes.length)
  assert.equal(f.finalFormReviewed, true)
  assert.equal(f.decision, 'hold')
  assert(f.blockers.length > 0 && f.releaseCondition)
  assert.equal(HANJA_STROKES.some(s => s.glyph === c.glyph), false, c.glyph + ' is held')
  assert.equal(c.dictionary.sha256, o.dictionary.sha256)
  total += c.strokes.length
}
assert.equal(total, 37)
assert.equal(sources.hanziVGNewFiles.length, 5)
assert(sources.hanziVGNewFiles.every(e => e.strokes !== e.dictionaryStrokes && !e.countMatches))
assert.equal(sources.fallback.files, 287)
assert.equal(sources.fallback.errors.length, 0)
assert.equal(sources.fallback.matchingPaths.length, 45)
assert.equal(sources.fallback.outsideRecentHolds, 0)
assert.equal(coverage.runtime.total, coverage.runtime.applied + coverage.runtime.remaining)
const directory = new URL('../../content/hanja/characters/', import.meta.url)
const chars = readdirSync(directory).filter(f => f.endsWith('.json')).flatMap(f => JSON.parse(readFileSync(new URL(f, directory), 'utf8')).characters)
const applied = new Set(HANJA_STROKES.map(s => s.glyph))
assert.equal(chars.length, coverage.runtime.total)
assert.equal(chars.filter(c => applied.has(c.glyph)).length, coverage.runtime.applied)
console.log(JSON.stringify({passed: true, reviewedGlyphs: candidates.length, reviewedStrokes: total, applied: coverage.runtime.applied, remaining: coverage.runtime.remaining, runtimeChanged: false}))
