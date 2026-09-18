import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH11_STROKES, G1_BATCH11_DICTIONARY_GEOMETRY, loadG1Batch11DictionaryBundle } from './hanja-stroke-dictionary-g1-batch11.ts'
import { buildG1Batch11DictionaryBundle, G1_BATCH11_DICTIONARY_PROOF_PINS, validateG1Batch11DictionaryProofs, validateG1Batch11DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch11.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch11-2026-09-19/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH11_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('forty-eight approved grade 1 reviews reproduce 589 playable strokes with actual corpus provenance; the held forms stay out', () => {
  validateG1Batch11DictionaryBundle()
  assert.equal(approved.length, 48)
  assert.equal(HANJA_DICTIONARY_G1_BATCH11_STROKES.length, 48)
  assert.equal(HANJA_DICTIONARY_G1_BATCH11_STROKES.reduce((n, e) => n + e.paths.length, 0), 589)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['遜', '羞', '讎', '蝕'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  // 贖 and 猜 are held: the dictionary writes 賣 with 四 and 靑 with 円 where the pinned MM originals draw 罒 and 月.
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['贖', '猜'])
  for (const record of held) {
    assert.equal(record.checks.glyphForm, 'mismatch')
    assert.ok(!HANJA_DICTIONARY_G1_BATCH11_STROKES.some(e => e.glyph === record.glyph))
    assert.equal(hanjaStrokeData(originals.find(e => e.glyph === record.glyph)!), null)
  }
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH11_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH11_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 48)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH11_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['蒐', '戍', '羞', '繡', '讎', '塾', '馴', '蝕', '衙', '晏'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 艹 pairs bar-then-vertical; 戍 sweeps before its bar; 羊 writes its second bar before the vertical; 馬 opens with its left vertical.
  for (const [glyph, n] of [['蒐', 1], ['蒐', 3], ['戍', 1], ['羞', 4], ['馴', 1]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 飠 writes its fold and inner bars before the long vertical; 衙 writes 吾 before 亍; 肅 ends with the right and central verticals;
  // 讎 writes the left 隹 before 言 and each 隹's bars before its inner vertical.
  assert.deepEqual(published('蝕').sourceStrokeIndices.slice(3, 7), [5, 6, 7, 4])
  assert.deepEqual(published('衙').sourceStrokeIndices.slice(3), [7, 8, 9, 10, 11, 12, 13, 4, 5, 6])
  assert.deepEqual(published('繡').sourceStrokeIndices.slice(9), [11, 13, 14, 16, 17, 15, 19, 18, 12, 10])
  assert.deepEqual(published('讎').sourceStrokeIndices, [8, 9, null, 11, 13, 14, 12, 15, 1, 2, 3, 4, 5, 6, 7, 16, 17, null, 19, 21, 22, 20, 23])
  for (const glyph of ['遜', '悚', '灑', '酬', '穗', '夙', '筍', '膝', '諡', '愕', '斡'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The top-right ticks of both 隹 in 讎 descend to the lower left; the 亠 dot of 塾 and the 宀 dot of 晏 are vertical.
  for (const n of [3, 18]) {
    const p = points('讎', n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], '讎' + n)
    assert.equal(published('讎').sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['塾', 1], ['晏', 5]] as const) {
    const dot = points(glyph, n)
    assert.ok(dot.every(([x]) => x === dot[0][0]) && dot[0][1] < dot.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_G1_BATCH11_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 4)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH11_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch11DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch11DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch11DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch11DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch11DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch11DictionaryBundle(HANJA_DICTIONARY_G1_BATCH11_STROKES.slice(1)), /published bundle/)
})
