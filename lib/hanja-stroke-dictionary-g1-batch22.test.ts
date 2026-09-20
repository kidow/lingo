import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH22_STROKES, G1_BATCH22_DICTIONARY_GEOMETRY, loadG1Batch22DictionaryBundle } from './hanja-stroke-dictionary-g1-batch22.ts'
import { buildG1Batch22DictionaryBundle, G1_BATCH22_DICTIONARY_PROOF_PINS, validateG1Batch22DictionaryProofs, validateG1Batch22DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch22.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch22-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH22_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('three approved grade 1 reviews reproduce 42 playable strokes with actual corpus provenance', () => {
  validateG1Batch22DictionaryBundle()
  assert.equal(approved.length, 3)
  assert.equal(HANJA_DICTIONARY_G1_BATCH22_STROKES.length, 3)
  assert.equal(HANJA_DICTIONARY_G1_BATCH22_STROKES.reduce((n, e) => n + e.paths.length, 0), 42)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), [])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH22_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH22_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 3)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH22_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('the closing three needed no correction at all', () => {
  assert.deepEqual(observations.entries.filter(e => e.initialDecision !== 'matched'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.deepEqual(entry.sourceStrokeIndices, original.paths.map((_, i) => i + 1))
    assert.deepEqual(entry.paths, original.paths)
  }
})

test('this batch authors no paths: every published stroke is a licensed original', () => {
  assert.equal(HANJA_DICTIONARY_G1_BATCH22_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 0)
  for (const entry of HANJA_DICTIONARY_G1_BATCH22_STROKES) {
    const original = originals.find(e => e.glyph === entry.glyph)!
    assert.deepEqual([...entry.sourceStrokeIndices].sort((a, b) => a! - b!), original.paths.map((_, i) => i + 1))
    assert.deepEqual(entry.paths, entry.sourceStrokeIndices.map(i => original.paths[i! - 1]))
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH22_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch22DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch22DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch22DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch22DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch22DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch22DictionaryBundle(HANJA_DICTIONARY_G1_BATCH22_STROKES.slice(1)), /published bundle/)
})
