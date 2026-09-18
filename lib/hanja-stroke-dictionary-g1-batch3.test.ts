import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH3_STROKES, G1_BATCH3_DICTIONARY_GEOMETRY, loadG1Batch3DictionaryBundle } from './hanja-stroke-dictionary-g1-batch3.ts'
import { buildG1Batch3DictionaryBundle, G1_BATCH3_DICTIONARY_PROOF_PINS, validateG1Batch3DictionaryProofs, validateG1Batch3DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch3.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch3-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH3_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved grade 1 reviews reproduce 623 playable strokes with actual corpus provenance', () => {
  validateG1Batch3DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH3_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH3_STROKES.reduce((n, e) => n + e.paths.length, 0), 623)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['矩', '廏', '逵', '隙', '擒', '汲'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), ['几'])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH3_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, candidates('Ko'), HANJA_DICTIONARY_G1_BATCH3_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, candidates('Ko'), HANJA_DICTIONARY_G1_BATCH3_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['矩', '駒', '廏', '衢', '灸', '眷', '捲', '倦', '窺', '擒'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 巨 writes its top bar before the left vertical; 馬 opens with its left vertical.
  for (const [glyph, n] of [['矩', 6], ['駒', 1]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  for (const glyph of ['轎', '鳩', '寇', '几', '逵', '隙', '覲', '襟', '汲'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The 隹 tick of 衢, the left 火 dot of 灸 and the left 龹 dots of 眷·捲·倦 descend to the lower left;
  // the right 龹 dots descend to the lower right; the 广, 穴 and 亠 dots of 廏, 窺 and 擒 are vertical.
  for (const [glyph, n] of [['衢', 16], ['灸', 4], ['眷', 1], ['捲', 4], ['倦', 3]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['眷', 2], ['捲', 5], ['倦', 4]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] < p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['廏', 1], ['窺', 1], ['擒', 6]] as const) {
    const dot = points(glyph, n)
    assert.ok(dot.every(([x]) => x === dot[0][0]) && dot[0][1] < dot.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_G1_BATCH3_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 11)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH3_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch3DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch3DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch3DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch3DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch3DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch3DictionaryBundle(HANJA_DICTIONARY_G1_BATCH3_STROKES.slice(1)), /published bundle/)
})
