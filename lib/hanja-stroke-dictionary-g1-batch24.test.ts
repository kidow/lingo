import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH24_STROKES, G1_BATCH24_DICTIONARY_GEOMETRY, loadG1Batch24DictionaryBundle } from './hanja-stroke-dictionary-g1-batch24.ts'
import { buildG1Batch24DictionaryBundle, G1_BATCH24_DICTIONARY_PROOF_PINS, validateG1Batch24DictionaryProofs, validateG1Batch24DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch24.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, JAPANESE_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch24-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH24_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('eleven re-reviewed grade 1 forms reproduce 142 playable strokes with actual corpus provenance', () => {
  validateG1Batch24DictionaryBundle()
  assert.equal(approved.length, 11)
  assert.equal(HANJA_DICTIONARY_G1_BATCH24_STROKES.length, 11)
  assert.equal(HANJA_DICTIONARY_G1_BATCH24_STROKES.reduce((n, e) => n + e.paths.length, 0), 142)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus !== 'Ja').map(e => e.glyph), [])
  // Every one of the eleven is published from the Japanese corpus, which is what the earlier rounds never compared.
  assert.equal(G1_BATCH24_DICTIONARY_GEOMETRY.Ja.sha256, JAPANESE_CANDIDATE_SOURCE.sha256)
  // The five that still differ in form stay out of the runtime.
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held').map(e => e.glyph), ['瀆', '諭', '愉', '朕', '讒'])
  for (const glyph of ['瀆', '諭', '愉', '朕', '讒'])
    assert.equal(HANJA_DICTIONARY_G1_BATCH24_STROKES.find(e => e.glyph === glyph), undefined)
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH24_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH24_STROKES, candidates('Ja'), candidates('MM'), candidates('Hant'), candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 11)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH24_STROKES, candidates('MM'), candidates('Ja'), candidates('Hant'), candidates('Hans')), /geometry mismatch/)
})

test('the three reordered forms cannot regress to their licensed original', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['猜', '睛', '凸'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 靑 writes the second bar of 龶 before its vertical; 凸 writes the upper vertical before the left bar.
  for (const [glyph, n] of [['猜', 5], ['睛', 7], ['凸', 1]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  for (const glyph of ['疼', '碌', '贖', '揄', '癒', '嗔', '瘠', '脊'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === i + 1))
})

test('this batch authors no paths: every published stroke is a licensed original', () => {
  assert.equal(HANJA_DICTIONARY_G1_BATCH24_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 0)
  for (const entry of HANJA_DICTIONARY_G1_BATCH24_STROKES) {
    const original = originals.find(e => e.glyph === entry.glyph)!
    assert.deepEqual([...entry.sourceStrokeIndices].sort((a, b) => a! - b!), original.paths.map((_, i) => i + 1))
    assert.deepEqual(entry.paths, entry.sourceStrokeIndices.map(i => original.paths[i! - 1]))
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH24_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch24DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch24DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch24DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch24DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch24DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch24DictionaryBundle(HANJA_DICTIONARY_G1_BATCH24_STROKES.slice(1)), /published bundle/)
})
