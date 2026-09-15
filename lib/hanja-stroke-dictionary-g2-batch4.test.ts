import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_BATCH4_STROKES, G2_BATCH4_DICTIONARY_GEOMETRY, loadG2Batch4DictionaryBundle } from './hanja-stroke-dictionary-g2-batch4.ts'
import { buildG2Batch4DictionaryBundle, G2_BATCH4_DICTIONARY_PROOF_PINS, validateG2Batch4DictionaryProofs, validateG2Batch4DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-batch4.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-batch4-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_BATCH4_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('all fifty individual reviews reproduce 594 playable strokes with actual corpus provenance', () => {
  validateG2Batch4DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_G2_BATCH4_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G2_BATCH4_STROKES.reduce((n, e) => n + e.paths.length, 0), 594)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(originals.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['汎', '毘'])
  for (const original of originals) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G2_BATCH4_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = originals.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '2급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH4_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH4_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const observations = JSON.parse(read(dir + 'observations.json')) as { entries: { glyph: string; initialDecision: string; correctedReview?: { completed: boolean; reviewedStrokes: number } }[] }
  const corrected = observations.entries.filter(e => e.initialDecision !== 'matched')
  assert.equal(corrected.length, 32)
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  assert.deepEqual(published('泌').sourceStrokeIndices.slice(3, 7), [6, 7, null, 4])
  assert.deepEqual(published('毖').sourceStrokeIndices.slice(4, 8), [7, 8, null, 5])
  assert.deepEqual(published('毘').sourceStrokeIndices.slice(2, 4), [null, 3])
  assert.deepEqual(published('馮').sourceStrokeIndices.slice(2, 4), [4, 3])
  for (const glyph of ['繕', '纖'])
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(3, 6), [null, null, null])
})

test('source-specific verticals, turns and enclosure connections remain distinct', () => {
  for (const [glyph, n] of [['旁', 1], ['旁', 7], ['龐', 1], ['龐', 4], ['賠', 8],
    ['僻', 9], ['卞', 1], ['庠', 1], ['瑄', 5], ['繕', 4], ['纖', 4]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(point => point[0] === p[0][0]))
    assert.ok(p.at(-1)![1] > p[0][1])
  }
  for (const [glyph, n] of [['泌', 6], ['毖', 7], ['唆', 7], ['酸', 11], ['蟾', 12]] as const) {
    const p = points(glyph, n)
    assert.equal(p[0][0], p[1][0])
    assert.ok(p[1][1] > p[0][1])
    assert.ok(p.at(-1)![0] > p[0][0])
    assert.ok(p.at(-1)![1] < p.at(-2)![1])
  }
  for (const [glyph, n] of [['俳', 3], ['匪', 2]] as const) {
    const p = points(glyph, n)
    assert.ok(p.at(-1)![0] < p[0][0] - 10)
    assert.ok(p.at(-1)![1] > p[0][1] + 40)
  }
  for (const [glyph, n, right] of [['柏', 8, 7], ['甫', 4, 3], ['甫', 5, 3],
    ['箱', 13, 12], ['箱', 14, 12], ['碩', 10, 9], ['碩', 11, 9]] as const) {
    const bar = points(glyph, n), wall = points(glyph, right)
    assert.ok(Math.abs(bar.at(-1)![0] - Math.max(...wall.map(p => p[0]))) < 3)
  }
  const horizontal = points('蟾', 13)
  assert.ok(horizontal.every(p => p[1] === horizontal[0][1]))
  assert.ok(horizontal.at(-1)![0] > horizontal[0][0])
})

test('corrected independent marks stay separated at playback stroke width', () => {
  const distance = (p: number[], a: number[], b: number[]) => {
    const dx = b[0] - a[0], dy = b[1] - a[1]
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
    return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
  }
  const separation = (a: number[][], b: number[][]) => Math.min(...a.flatMap((p, i) => i === 0 ? [] :
    Array.from({ length: 101 }, (_, j) => {
      const q = [a[i - 1][0] + (p[0] - a[i - 1][0]) * j / 100, a[i - 1][1] + (p[1] - a[i - 1][1]) * j / 100]
      return Math.min(...b.slice(1).map((v, k) => distance(q, b[k], v)))
    })))
  for (const [glyph, a, b] of [['繕', 6, 15], ['纖', 6, 14], ['纖', 6, 15], ['纖', 6, 20], ['蟾', 13, 14], ['蟾', 12, 13]] as const)
    assert.ok(separation(points(glyph, a), points(glyph, b)) > 5, glyph + ': ' + a + '/' + b)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G2_BATCH4_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2Batch4DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG2Batch4DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2Batch4DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG2Batch4DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG2Batch4DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG2Batch4DictionaryBundle(HANJA_DICTIONARY_G2_BATCH4_STROKES.slice(1)), /published bundle/)
})
