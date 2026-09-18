import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH6_STROKES, SPECIAL2_BATCH6_DICTIONARY_GEOMETRY, loadSpecial2Batch6DictionaryBundle } from './hanja-stroke-dictionary-special2-batch6.ts'
import { buildSpecial2Batch6DictionaryBundle, SPECIAL2_BATCH6_DICTIONARY_PROOF_PINS, validateSpecial2Batch6DictionaryProofs, validateSpecial2Batch6DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch6.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch6-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH6_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved reviews reproduce 595 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch6DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH6_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH6_STROKES.reduce((n, e) => n + e.paths.length, 0), 595)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['緡', '栢', '琺', '輹', '艀', '粃'])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH6_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH6_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH6_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['瘢', '泮', '磐', '舫', '蚌', '樊', '琺', '宓', '蔔', '孚', '秘'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps: 舟's long bar after both inner strokes, the 王 radical's bars before its vertical, 艹 pairs bar-then-vertical.
  for (const [glyph, n] of [['瘢', 10], ['磐', 5], ['舫', 5], ['琺', 2], ['蔔', 1], ['蔔', 3]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 爻 before either 木 in 樊; 必 written dot, sweep, curve, then the side dots in 宓 and 秘.
  assert.deepEqual(published('樊').sourceStrokeIndices.slice(0, 8), [5, 6, 7, 8, 1, 2, 3, 4])
  assert.deepEqual(published('宓').sourceStrokeIndices.slice(3, 7), [6, 7, 5, 4])
  assert.deepEqual(published('秘').sourceStrokeIndices.slice(5, 9), [8, 9, 7, 6])
  for (const glyph of ['岷', '愍', '緡', '璞', '雹', '裴', '缶', '斌'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Vertical descending dot: 疒 in 瘢.
  const pi = points('瘢', 1)
  assert.ok(pi.every(point => point[0] === pi[0][0]))
  assert.ok(pi.at(-1)![1] > pi[0][1])
  assert.equal(published('瘢').sourceStrokeIndices[0], null)
  // Outward dot pairs: 半 in 泮 and 爫 in 孚 spread left and right.
  for (const [glyph, n] of [['泮', 4], ['孚', 2]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['泮', 5], ['孚', 4]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] < p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  // 丰's top stroke runs from the upper right to the left in 蚌.
  const feng = points('蚌', 7)
  assert.ok(feng[0][0] > feng.at(-1)![0])
  assert.ok(Math.abs(feng.at(-1)![1] - feng[0][1]) < Math.abs(feng.at(-1)![0] - feng[0][0]))
  assert.equal(published('蚌').sourceStrokeIndices[6], null)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH6_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 6)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH6_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch6DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch6DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch6DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch6DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch6DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch6DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH6_STROKES.slice(1)), /published bundle/)
})
