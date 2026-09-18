import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH7_STROKES, G1_BATCH7_DICTIONARY_GEOMETRY, loadG1Batch7DictionaryBundle } from './hanja-stroke-dictionary-g1-batch7.ts'
import { buildG1Batch7DictionaryBundle, G1_BATCH7_DICTIONARY_PROOF_PINS, validateG1Batch7DictionaryProofs, validateG1Batch7DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch7.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch7-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH7_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved grade 1 reviews reproduce 603 playable strokes with actual corpus provenance', () => {
  validateG1Batch7DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH7_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH7_STROKES.reduce((n, e) => n + e.paths.length, 0), 603)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['麪', '歿', '憮'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH7_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH7_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH7_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['襪', '罵', '糢', '耗', '蕪', '拇', '靡', '謐', '駁'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 艹 pairs bar-then-vertical; 馬 opens with its left vertical; 母 writes its second dot before the long bar;
  // 戍 writes its long left sweep before the bar.
  for (const [glyph, n] of [['襪', 6], ['襪', 8], ['襪', 15], ['糢', 7], ['糢', 9], ['蕪', 1], ['蕪', 3], ['罵', 6], ['駁', 1], ['拇', 7]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 必 follows the dictionary's own five-stroke sequence.
  assert.deepEqual(published('謐').sourceStrokeIndices.slice(7, 12), [10, 11, 9, 8, 12])
  for (const glyph of ['挽', '瞞', '麪', '歿', '憮', '毋', '撲', '粕'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The reversed 耒 bar of 耗 runs from the right to the left; the 广 dot of 靡 is vertical.
  const bar = points('耗', 1)
  assert.ok(bar[0][0] > bar.at(-1)![0])
  assert.equal(published('耗').sourceStrokeIndices[0], null)
  const dot = points('靡', 1)
  assert.ok(dot.every(([x]) => x === dot[0][0]) && dot[0][1] < dot.at(-1)![1])
  assert.equal(published('靡').sourceStrokeIndices[0], null)
  assert.equal(HANJA_DICTIONARY_G1_BATCH7_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 2)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH7_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch7DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch7DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch7DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch7DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch7DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch7DictionaryBundle(HANJA_DICTIONARY_G1_BATCH7_STROKES.slice(1)), /published bundle/)
})
