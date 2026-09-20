import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH23_STROKES, G1_BATCH23_DICTIONARY_GEOMETRY, loadG1Batch23DictionaryBundle } from './hanja-stroke-dictionary-g1-batch23.ts'
import { buildG1Batch23DictionaryBundle, G1_BATCH23_DICTIONARY_PROOF_PINS, validateG1Batch23DictionaryProofs, validateG1Batch23DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch23.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, TRADITIONAL_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch23-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH23_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('three approved grade 1 reviews reproduce 43 playable strokes with actual corpus provenance', () => {
  validateG1Batch23DictionaryBundle()
  assert.equal(approved.length, 3)
  assert.equal(HANJA_DICTIONARY_G1_BATCH23_STROKES.length, 3)
  assert.equal(HANJA_DICTIONARY_G1_BATCH23_STROKES.reduce((n, e) => n + e.paths.length, 0), 43)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.map(e => e.corpus), ['Hans', 'Hant', 'Hant'])
  // 藉 and 蕉 are here because the Taiwan standard draws 艹 in the four strokes the catalog counts.
  assert.equal(G1_BATCH23_DICTIONARY_GEOMETRY.Hant.sha256, TRADITIONAL_CANDIDATE_SOURCE.sha256)
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH23_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH23_STROKES, candidates('Ja'), candidates('MM'), candidates('Hant'), candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 3)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH23_STROKES, candidates('Ja'), candidates('MM'), candidates('Hans'), candidates('Hant')), /geometry mismatch/)
})

test('the two corrected forms cannot regress to their licensed original', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['藉', '蕉'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // The dictionary writes the left 十 of 艹 as bar then vertical; both corpora write the vertical first.
  for (const glyph of ['藉', '蕉'] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(0, 2), [2, 1], glyph)
  // The opening 丿 of 耒 and the 隹 tick both descend to the lower left.
  for (const [glyph, n] of [['藉', 5], ['蕉', 7]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.ok(published('洑').sourceStrokeIndices.every((index, i) => index === i + 1))
})

test('only the two authored strokes leave the licensed sequence', () => {
  assert.equal(HANJA_DICTIONARY_G1_BATCH23_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 2)
  for (const entry of HANJA_DICTIONARY_G1_BATCH23_STROKES) {
    if (entry.glyph !== '洑') continue
    const original = originals.find(e => e.glyph === entry.glyph)!
    assert.deepEqual([...entry.sourceStrokeIndices].sort((a, b) => a! - b!), original.paths.map((_, i) => i + 1))
    assert.deepEqual(entry.paths, entry.sourceStrokeIndices.map(i => original.paths[i! - 1]))
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH23_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch23DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch23DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch23DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch23DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch23DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch23DictionaryBundle(HANJA_DICTIONARY_G1_BATCH23_STROKES.slice(1)), /published bundle/)
})
