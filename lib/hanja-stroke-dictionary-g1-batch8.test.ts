import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH8_STROKES, G1_BATCH8_DICTIONARY_GEOMETRY, loadG1Batch8DictionaryBundle } from './hanja-stroke-dictionary-g1-batch8.ts'
import { buildG1Batch8DictionaryBundle, G1_BATCH8_DICTIONARY_PROOF_PINS, validateG1Batch8DictionaryProofs, validateG1Batch8DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch8.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch8-2026-09-19/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH8_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved grade 1 reviews reproduce 632 playable strokes with actual corpus provenance', () => {
  validateG1Batch8DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH8_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH8_STROKES.reduce((n, e) => n + e.paths.length, 0), 632)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['魃', '幇', '陪', '魄', '賻'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH8_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH8_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH8_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['槃', '礬', '絆', '畔', '攀', '拌', '魃', '尨', '魄', '駙'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 舟 writes its lower inner dot before the long bar; 鬼 writes the inner bar before the inner vertical;
  // 馬 opens with its left vertical.
  for (const [glyph, n] of [['槃', 5], ['魃', 4], ['魄', 9], ['駙', 1]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 樊 writes 爻 before its left 木; 尨 writes 彡 before the dot of 尤.
  for (const glyph of ['礬', '攀'] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(0, 8), [5, 6, 7, 8, 1, 2, 3, 4], glyph)
  assert.deepEqual(published('尨').sourceStrokeIndices.slice(3, 7), [5, 6, 7, 4])
  for (const glyph of ['斑', '蟠', '頒', '跋', '勃', '醱', '幇', '賻', '訃'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The left 丷 dot of 半 descends to the lower left in 絆·畔·拌; the right dot descends to the lower right.
  for (const [glyph, n] of [['絆', 7], ['畔', 6], ['拌', 4]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['絆', 8], ['畔', 7], ['拌', 5]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] < p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_G1_BATCH8_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 6)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH8_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch8DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch8DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch8DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch8DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch8DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch8DictionaryBundle(HANJA_DICTIONARY_G1_BATCH8_STROKES.slice(1)), /published bundle/)
})
