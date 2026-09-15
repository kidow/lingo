import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const sources = JSON.parse(readFileSync(new URL('../docs/hanja-g3-exact-forms-2026-09-15/sources.json', import.meta.url), 'utf8')) as {
  originals: { glyph: string; medians: number[][][] }[]
}
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const entries = HANJA_STROKES.filter(e => ['隷', '隣'].includes(e.glyph))

test('隷 and 隣 use exact domestic dictionary evidence and Ja geometry in the shared audit', () => {
  assert.deepEqual(entries.map(e => [e.glyph, e.paths.length]), [['隷', 16], ['隣', 15]])
  assert.ok(entries.every(e => e.verificationSource === 'ehanja-crosschecked'))
  const catalog = entries.map(e => ({ glyph: e.glyph, strokes: e.paths.length, readingGrade: '3급' }))
  const candidates = sources.originals.map(e => ({ character: e.glyph, medians: e.medians, strokes: normalizeMedians(e.medians) }))
  const audit = auditStrokes(catalog, [], entries, candidates, [])
  assert.equal(audit.verificationSources.dictionary, 2)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], entries, [], candidates), /geometry mismatch/)
  assert.equal(hanjaStrokeData({glyph:'隣', strokes:16}), null)
})

test('隣 keeps the observed down-then-right bend in a single fourteenth stroke', () => {
  const entry = entries.find(e => e.glyph === '隣')!
  assert.equal(entry.verificationSource, 'ehanja-crosschecked')
  if (entry.verificationSource !== 'ehanja-crosschecked') throw new Error('Wrong verification source')
  assert.deepEqual(entry.sourceStrokeIndices, [1,2,3,4,5,6,7,8,9,10,11,12,13,null,16])
  assert.equal((entry.paths[13].match(/M/g) ?? []).length, 1)
  const points = [...entry.paths[13].matchAll(/[ML]([0-9.-]+) ([0-9.-]+)/g)].map(m => [Number(m[1]), Number(m[2])])
  assert.ok(points[2][1] > points[0][1] && Math.abs(points[2][0] - points[0][0]) < 3)
  assert.ok(points.at(-1)![0] > points[2][0] + 15)
  const original = sources.originals.find(e => e.glyph === '隣')!
  const restored = { ...entry, paths: normalizeMedians(original.medians) }
  restored.pathsSha256 = hash(restored.paths)
  assert.throws(() => validateDictionaryReview(restored, 16), /published entry/)
})

test('exact-form geometry rejects changed originals, reversed paths and false provenance', () => {
  for (const entry of entries) {
    if (entry.verificationSource !== 'ehanja-crosschecked') throw new Error('Wrong verification source')
    const original = sources.originals.find(e => e.glyph === entry.glyph)!
    const changed = structuredClone(original.medians)
    changed[0][0][0]++
    assert.throws(() => dictionaryGeometry(entry.glyph, changed), /original mismatch/)
    const swapped = { ...entry, paths: [...entry.paths].reverse() }
    swapped.pathsSha256 = hash(swapped.paths)
    assert.throws(() => validateDictionaryReview(swapped, entry.paths.length), /published entry/)
    assert.throws(() => validateDictionaryReview({ ...entry,
      sourceReference: { ...entry.sourceReference, dictionarySvgSha256: '0'.repeat(64) },
    }, entry.paths.length), /published entry/)
  }
})
