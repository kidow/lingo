import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH1_STROKES, SPECIAL2_BATCH1_DICTIONARY_GEOMETRY, loadSpecial2Batch1DictionaryBundle } from './hanja-stroke-dictionary-special2-batch1.ts'
import { buildSpecial2Batch1DictionaryBundle, SPECIAL2_BATCH1_DICTIONARY_PROOF_PINS, validateSpecial2Batch1DictionaryProofs, validateSpecial2Batch1DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch1.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch1-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH1_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('all fifty individual reviews reproduce 643 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch1DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH1_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH1_STROKES.reduce((n, e) => n + e.paths.length, 0), 643)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(originals.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['橄', '羌', '襁', '炬', '遽', '鉅', '劒', '鎌', '勍'])
  for (const original of originals) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH1_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = originals.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH1_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH1_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const observations = JSON.parse(read(dir + 'observations.json')) as { entries: { glyph: string; initialDecision: string; correctedReview?: { completed: boolean; reviewedStrokes: number } }[] }
  const corrected = observations.entries.filter(e => e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['羌', '舡', '疥', '盖', '炬', '遽', '鉅', '騫', '蹇', '黔', '鎌', '慊'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Order swaps observed against the dictionary: bar before vertical in 羊/巨/黑, sweep after bar in 虍, 馬 vertical first.
  const swapped: [string, number][] = [['羌', 4], ['舡', 5], ['盖', 5], ['炬', 5], ['遽', 3], ['鉅', 9], ['騫', 11], ['黔', 6]]
  for (const [glyph, n] of swapped) assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n])
  for (const glyph of ['疥', '蹇', '鎌', '慊', '橄', '愆', '勍'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  for (const [glyph, n] of [['疥', 1], ['騫', 1], ['蹇', 1]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(point => point[0] === p[0][0]))
    assert.ok(p.at(-1)![1] > p[0][1])
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['鎌', 9], ['慊', 4]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH1_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 5)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH1_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch1DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch1DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch1DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch1DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch1DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch1DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH1_STROKES.slice(1)), /published bundle/)
})
