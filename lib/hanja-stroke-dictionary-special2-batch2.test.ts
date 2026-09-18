import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH2_STROKES, SPECIAL2_BATCH2_DICTIONARY_GEOMETRY, loadSpecial2Batch2DictionaryBundle } from './hanja-stroke-dictionary-special2-batch2.ts'
import { buildSpecial2Batch2DictionaryBundle, SPECIAL2_BATCH2_DICTIONARY_PROOF_PINS, validateSpecial2Batch2DictionaryProofs, validateSpecial2Batch2DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch2.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch2-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH2_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('all fifty individual reviews reproduce 619 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch2DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH2_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH2_STROKES.reduce((n, e) => n + e.paths.length, 0), 619)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(originals.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['逕', '絅', '堺', '誥', '攷', '梱', '洸', '紘', '餃', '逑', '柾', '毬'])
  for (const original of originals) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH2_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = originals.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH2_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH2_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const observations = JSON.parse(read(dir + 'observations.json')) as { entries: { glyph: string; initialDecision: string; correctedReview?: { completed: boolean; reviewedStrokes: number } }[] }
  const corrected = observations.entries.filter(e => e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['耿', '堺', '谿', '誥', '斛', '鍋', '恝', '餃', '翹', '蕎', '瞿', '麴', '堀'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps observed against the dictionary.
  const swapped: [string, number][] = [['堺', 6], ['誥', 10], ['斛', 6], ['鍋', 11]]
  for (const [glyph, n] of swapped) assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n])
  // Longer moves: 耳 right vertical last, 飠 left vertical seventh, 艹 bar-then-vertical pairs, 麥 vertical after the 人 pairs, 出 central vertical first.
  assert.deepEqual(published('耿').sourceStrokeIndices.slice(0, 6), [1, 2, 4, 5, 6, 3])
  assert.deepEqual(published('餃').sourceStrokeIndices.slice(3, 7), [5, 6, 7, 4])
  assert.deepEqual(published('蕎').sourceStrokeIndices.slice(0, 4), [2, 1, 4, 3])
  assert.deepEqual(published('麴').sourceStrokeIndices.slice(0, 6), [1, 3, 4, 5, 6, 2])
  assert.deepEqual(published('堀').sourceStrokeIndices.slice(6, 9), [9, 7, 8])
  for (const glyph of ['谿', '恝', '翹', '瞿', '涇', '鯤', '赳'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Descending-left strokes: 爫 left dot, 羽 interior pairs, 隹 dot.
  for (const [glyph, n] of [['谿', 2], ['翹', 14], ['翹', 15], ['翹', 17], ['翹', 18], ['瞿', 13]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  // 爫 right dot descends to the right.
  const right = points('谿', 4)
  assert.ok(right[0][0] < right.at(-1)![0] && right[0][1] < right.at(-1)![1])
  // 丰 bars run from right to left.
  for (const n of [1, 2, 3] as const) {
    const p = points('恝', n)
    assert.ok(p[0][0] > p.at(-1)![0], '恝' + n)
    assert.equal(published('恝').sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH2_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 10)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH2_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch2DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch2DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch2DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch2DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch2DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch2DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH2_STROKES.slice(1)), /published bundle/)
})
