import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH1_STROKES, G1_BATCH1_DICTIONARY_GEOMETRY, loadG1Batch1DictionaryBundle } from './hanja-stroke-dictionary-g1-batch1.ts'
import { buildG1Batch1DictionaryBundle, G1_BATCH1_DICTIONARY_PROOF_PINS, validateG1Batch1DictionaryProofs, validateG1Batch1DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch1.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch1-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH1_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved grade 1 reviews reproduce 638 playable strokes with actual corpus provenance', () => {
  validateG1Batch1DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH1_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH1_STROKES.reduce((n, e) => n + e.paths.length, 0), 638)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['瞰', '箇', '渠', '腱', '譴'])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH1_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH1_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH1_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['駕', '薑', '渠', '膈', '繭'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 馬 opens with its left vertical; 巨 opens with its top bar; 艹 pairs bar-then-vertical.
  assert.deepEqual(published('駕').sourceStrokeIndices.slice(5, 7), [7, 6])
  assert.deepEqual(published('渠').sourceStrokeIndices.slice(3, 5), [5, 4])
  for (const glyph of ['薑', '繭']) assert.deepEqual(published(glyph).sourceStrokeIndices.slice(0, 4), [2, 1, 4, 3])
  for (const glyph of ['嘉', '呵', '瞰', '箇', '腱', '譴', '鵑', '勁'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The inner dots of 鬲 in 膈 fan outward: 11 to the lower left, 12 to the lower right.
  const left = points('膈', 11), right = points('膈', 12)
  assert.ok(left[0][0] > left.at(-1)![0] && left[0][1] < left.at(-1)![1])
  assert.ok(right[0][0] < right.at(-1)![0] && right[0][1] < right.at(-1)![1])
  assert.deepEqual(published('膈').sourceStrokeIndices.slice(10, 12), [null, null])
  assert.equal(HANJA_DICTIONARY_G1_BATCH1_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 2)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH1_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch1DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch1DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch1DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch1DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch1DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch1DictionaryBundle(HANJA_DICTIONARY_G1_BATCH1_STROKES.slice(1)), /published bundle/)
})
