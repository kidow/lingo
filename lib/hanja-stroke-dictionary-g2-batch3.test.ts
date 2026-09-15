import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_BATCH3_STROKES, G2_BATCH3_DICTIONARY_GEOMETRY, loadG2Batch3DictionaryBundle } from './hanja-stroke-dictionary-g2-batch3.ts'
import { buildG2Batch3DictionaryBundle, G2_BATCH3_DICTIONARY_PROOF_PINS, validateG2Batch3DictionaryProofs, validateG2Batch3DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-batch3.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-batch3-2026-09-15/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_BATCH3_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('all fifty individual reviews reproduce 674 playable strokes with actual corpus provenance', () => {
  validateG2Batch3DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_G2_BATCH3_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G2_BATCH3_STROKES.reduce((n, e) => n + e.paths.length, 0), 674)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(originals.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['漣', '魔', '靺', '魅', '旻', '鉢'])
  for (const original of originals) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G2_BATCH3_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = originals.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '2급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH3_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH3_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const observations = JSON.parse(read(dir + 'observations.json')) as { entries: { glyph: string; initialDecision: string; correctedReview?: { completed: boolean; reviewedStrokes: number } }[] }
  const corrected = observations.entries.filter(e => e.initialDecision !== 'matched')
  assert.equal(corrected.length, 30)
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  assert.deepEqual(published('彌').sourceStrokeIndices.slice(6, 9), [8, 9, 7])
  assert.deepEqual(published('魅').sourceStrokeIndices.slice(3, 5), [5, 4])
  assert.deepEqual(published('謨').sourceStrokeIndices.slice(7, 11), [9, 8, 11, 10])
})

test('source-specific direction and pen-lift corrections remain distinct', () => {
  for (const [glyph, n] of [['謬', 9], ['謬', 10], ['謬', 12], ['謬', 13], ['濂', 7], ['覓', 2]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
  }
  for (const [glyph, n] of [['旻', 5], ['閔', 9], ['玟', 5], ['網', 12], ['紊', 8], ['舶', 5], ['搬', 8], ['摩', 7]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(point => point[0] === p[0][0]))
    assert.ok(p.at(-1)![1] > p[0][1])
  }
  for (const [glyph, n] of [['玲', 7], ['謬', 1], ['灣', 4], ['蠻', 1], ['謨', 1]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(point => point[1] === p[0][1]))
    assert.ok(p.at(-1)![0] > p[0][0])
  }
  assert.deepEqual(published('舶').sourceStrokeIndices.slice(4, 6), [null, 5])
  assert.deepEqual(published('搬').sourceStrokeIndices.slice(7, 9), [null, 8])
  for (const [glyph, n, left, right] of [['冕', 4, 1, 2], ['帽', 7, 4, 5]] as const) {
    const bar = points(glyph, n)
    assert.ok(bar[0][0] > points(glyph, left).at(-1)![0] + 5)
    assert.ok(bar.at(-1)![0] < points(glyph, right).at(-1)![0] - 5)
  }
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
  for (const [glyph, a, b] of [['痲', 9, 12], ['魔', 7, 10], ['魔', 7, 12], ['紡', 4, 10], ['蠻', 11, 20], ['灣', 21, 10]] as const)
    assert.ok(separation(points(glyph, a), points(glyph, b)) > 5, glyph + ': ' + a + '/' + b)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G2_BATCH3_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2Batch3DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG2Batch3DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2Batch3DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG2Batch3DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG2Batch3DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG2Batch3DictionaryBundle(HANJA_DICTIONARY_G2_BATCH3_STROKES.slice(1)), /published bundle/)
})
