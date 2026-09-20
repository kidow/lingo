import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH18_STROKES, G1_BATCH18_DICTIONARY_GEOMETRY, loadG1Batch18DictionaryBundle } from './hanja-stroke-dictionary-g1-batch18.ts'
import { buildG1Batch18DictionaryBundle, G1_BATCH18_DICTIONARY_PROOF_PINS, validateG1Batch18DictionaryProofs, validateG1Batch18DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch18.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch18-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH18_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved grade 1 reviews reproduce 672 playable strokes with actual corpus provenance', () => {
  validateG1Batch18DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH18_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH18_STROKES.reduce((n, e) => n + e.paths.length, 0), 672)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['槌', '墜', '鰍', '鎚', '勅', '楕', '陀', '鐸'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH18_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH18_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH18_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['叢', '撮', '墜', '鰍', '酋', '錐', '錘', '椎', '黜', '娶', '翠', '馳', '秤', '駝', '唾', '舵', '擢', '蕩'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 馬 writes its long left vertical before the top bar; 舟 writes the inner mark before the long bar; 田 writes the inner bar before the vertical.
  for (const [glyph, n] of [['馳', 1], ['駝', 1], ['舵', 5], ['鰍', 5], ['黜', 6]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 耳 writes its inner bars and the long bar before the right vertical; 垂 keeps its long centre vertical for last; 艹 pairs bar-then-vertical.
  assert.deepEqual(published('叢').sourceStrokeIndices.slice(12, 16), [14, 15, 16, 13])
  assert.deepEqual(published('撮').sourceStrokeIndices.slice(9, 13), [11, 12, 13, 10])
  assert.deepEqual(published('娶').sourceStrokeIndices.slice(2, 6), [4, 5, 6, 3])
  assert.deepEqual(published('錘').sourceStrokeIndices.slice(10, 15), [12, 13, 14, 15, 11])
  assert.deepEqual(published('唾').sourceStrokeIndices.slice(5, 10), [7, 8, 9, 10, 6])
  assert.deepEqual(published('蕩').sourceStrokeIndices.slice(0, 4), [2, 1, 4, 3])
  assert.deepEqual(published('黜').sourceStrokeIndices.slice(12, 15), [15, 13, 14])
  for (const glyph of ['炒', '囑', '忖', '寵', '槌', '樞', '芻', '鎚', '贅', '悴', '脆', '惻', '幟', '嗤', '痔', '侈', '熾', '癡', '緻', '勅', '砧', '蟄', '楕', '惰', '陀', '鐸', '呑', '坦', '憚', '綻', '宕', '笞'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The left 丷 dots, the 羽 interior dots and the 隹 ticks descend to the lower left; the right 丷 dots descend to the lower right; the 羽 ticks run from the upper right.
  for (const [glyph, n] of [['墜', 4], ['酋', 1], ['秤', 7], ['錐', 11], ['椎', 7], ['翠', 2], ['翠', 5], ['擢', 5], ['擢', 8], ['擢', 12]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['墜', 5], ['酋', 2], ['秤', 8]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] < p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['翠', 3], ['翠', 6], ['擢', 6], ['擢', 9]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_G1_BATCH18_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 17)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH18_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch18DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch18DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch18DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch18DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch18DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch18DictionaryBundle(HANJA_DICTIONARY_G1_BATCH18_STROKES.slice(1)), /published bundle/)
})
