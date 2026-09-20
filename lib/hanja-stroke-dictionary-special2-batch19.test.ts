import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES, SPECIAL2_BATCH19_DICTIONARY_GEOMETRY, loadSpecial2Batch19DictionaryBundle } from './hanja-stroke-dictionary-special2-batch19.ts'
import { buildSpecial2Batch19DictionaryBundle, SPECIAL2_BATCH19_DICTIONARY_PROOF_PINS, validateSpecial2Batch19DictionaryProofs, validateSpecial2Batch19DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch19.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, JAPANESE_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch19-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Hant' | 'Hans'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('six re-reviewed special grade II forms reproduce 100 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch19DictionaryBundle()
  assert.equal(approved.length, 6)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES.length, 6)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES.reduce((n, e) => n + e.paths.length, 0), 100)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.equal(approved.filter(e => e.corpus === 'Ja').length, 6)
  assert.deepEqual(approved.filter(e => e.corpus !== 'Ja').map(e => e.glyph), [])
  // All six were held against Make Me a Hanzi; the Japanese corpus carries the forms the dictionary draws.
  assert.equal(SPECIAL2_BATCH19_DICTIONARY_GEOMETRY.Ja.sha256, JAPANESE_CANDIDATE_SOURCE.sha256)
  assert.deepEqual(approved.map(e => e.glyph), ['犢', '牘', '竇', '瑜', '砥', '鯖'])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH19_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Hant' | 'Hans') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES, candidates('Ja'), candidates('MM'), candidates('Hant'), candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 6)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES, candidates('MM'), candidates('Ja'), candidates('Hant'), candidates('Hans')), /geometry mismatch/)
})

test('the two reordered forms cannot regress to their licensed original', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['瑜', '鯖'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 王 and 龶 both write the second bar before the vertical; 魚 writes the inner bar of 田 before its vertical.
  for (const [glyph, n] of [['瑜', 2], ['鯖', 5], ['鯖', 13]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  for (const glyph of ['犢', '牘', '竇', '砥'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === i + 1))
})

test('this batch authors no paths: every published stroke is a licensed original', () => {
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 0)
  for (const entry of HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES) {
    const original = originals.find(e => e.glyph === entry.glyph)!
    assert.deepEqual([...entry.sourceStrokeIndices].sort((a, b) => a! - b!), original.paths.map((_, i) => i + 1))
    assert.deepEqual(entry.paths, entry.sourceStrokeIndices.map(i => original.paths[i! - 1]))
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH19_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch19DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch19DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch19DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch19DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch19DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch19DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES.slice(1)), /published bundle/)
})
