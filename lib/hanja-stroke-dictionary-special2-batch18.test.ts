import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES, SPECIAL2_BATCH18_DICTIONARY_GEOMETRY, loadSpecial2Batch18DictionaryBundle } from './hanja-stroke-dictionary-special2-batch18.ts'
import { buildSpecial2Batch18DictionaryBundle, SPECIAL2_BATCH18_DICTIONARY_PROOF_PINS, validateSpecial2Batch18DictionaryProofs, validateSpecial2Batch18DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch18.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, SIMPLIFIED_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch18-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Hant' | 'Hans'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('twelve approved special grade II reviews reproduce 140 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch18DictionaryBundle()
  assert.equal(approved.length, 12)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES.length, 12)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES.reduce((n, e) => n + e.paths.length, 0), 140)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.equal(approved.filter(e => e.corpus === 'Hans').length, 12)
  assert.deepEqual(approved.filter(e => e.corpus !== 'Hans').map(e => e.glyph), [])
  // These twelve exist only in the AnimCJK simplified file of the pinned revision; that is what admitted them.
  assert.equal(SPECIAL2_BATCH18_DICTIONARY_GEOMETRY.Hans.sha256, SIMPLIFIED_CANDIDATE_SOURCE.sha256)
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH18_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Hant' | 'Hans') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES, candidates('Ja'), candidates('MM'), candidates('Hant'), candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 12)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES, candidates('Ja'), candidates('MM')), /geometry mismatch/)
})

test('the two corrected forms cannot regress to their licensed original', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['棨', '琇'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 秀 writes the long left sweep of 乃 before the fold; the opening stroke of 戶 descends to the lower left.
  assert.deepEqual(published('琇').sourceStrokeIndices.slice(9, 11), [11, 10])
  const opening = points('棨', 1)
  assert.ok(opening[0][0] > opening.at(-1)![0] && opening[0][1] < opening.at(-1)![1])
  assert.equal(published('棨').sourceStrokeIndices[0], null)
  for (const glyph of ['杻', '璘', '琫', '栒', '汭', '瑀', '堉', '璪', '畯', '淏'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === i + 1))
})

test('only the one authored stroke leaves the licensed sequence', () => {
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 1)
  for (const entry of HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES) {
    if (entry.glyph === '棨') continue
    const original = originals.find(e => e.glyph === entry.glyph)!
    assert.deepEqual([...entry.sourceStrokeIndices].sort((a, b) => a! - b!), original.paths.map((_, i) => i + 1))
    assert.deepEqual(entry.paths, entry.sourceStrokeIndices.map(i => original.paths[i! - 1]))
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH18_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch18DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch18DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch18DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch18DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch18DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch18DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES.slice(1)), /published bundle/)
})
