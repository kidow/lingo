import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH20_STROKES, G1_BATCH20_DICTIONARY_GEOMETRY, loadG1Batch20DictionaryBundle } from './hanja-stroke-dictionary-g1-batch20.ts'
import { buildG1Batch20DictionaryBundle, G1_BATCH20_DICTIONARY_PROOF_PINS, validateG1Batch20DictionaryProofs, validateG1Batch20DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch20.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch20-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH20_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved grade 1 reviews reproduce 657 playable strokes with actual corpus provenance', () => {
  validateG1Batch20DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH20_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH20_STROKES.reduce((n, e) => n + e.paths.length, 0), 657)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['逼', '遐', '澣', '骸', '邂', '嚮', '饗', '墟', '衒'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH20_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH20_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH20_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['逼', '霞', '遐', '蝦', '瑕', '謔', '瘧', '轄', '緘', '喊', '銜', '鹹', '骸', '駭', '懈', '邂', '嚮', '饗', '噓', '墟', '衒', '絢', '俠', '挾', '狹', '頰', '荊'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 田 writes the inner bar before the inner vertical; 咸 and 虐 write the sweep before the bar; 骨, 角, 糸, 害 and 馬 each keep the dictionary's pairing.
  for (const [glyph, n] of [['逼', 7], ['喊', 4], ['謔', 15], ['瘧', 13], ['轄', 13], ['緘', 4], ['絢', 4], ['骸', 3], ['駭', 1], ['懈', 9], ['邂', 5], ['噓', 10], ['墟', 6], ['墟', 11], ['鹹', 12], ['荊', 1], ['荊', 3]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 叚 writes its long left vertical first; 夾 writes both inner 人 pairs before the long 丿 and ㇏; 皀 keeps its long left vertical for last; 銜 writes all of 金 before 亍.
  assert.deepEqual(published('霞').sourceStrokeIndices.slice(8, 11), [11, 9, 10])
  assert.deepEqual(published('遐').sourceStrokeIndices.slice(0, 3), [3, 1, 2])
  assert.deepEqual(published('蝦').sourceStrokeIndices.slice(6, 9), [9, 7, 8])
  assert.deepEqual(published('瑕').sourceStrokeIndices.slice(4, 7), [7, 5, 6])
  assert.deepEqual(published('俠').sourceStrokeIndices.slice(3, 9), [6, 7, 8, 9, 4, 5])
  assert.deepEqual(published('挾').sourceStrokeIndices.slice(4, 10), [7, 8, 9, 10, 5, 6])
  assert.deepEqual(published('狹').sourceStrokeIndices.slice(4, 10), [7, 8, 9, 10, 5, 6])
  assert.deepEqual(published('頰').sourceStrokeIndices.slice(1, 7), [4, 5, 6, 7, 2, 3])
  assert.deepEqual(published('饗').sourceStrokeIndices.slice(4, 8), [6, 7, 8, 5])
  assert.deepEqual(published('鹹').sourceStrokeIndices.slice(7, 10), [10, 8, 9])
  assert.deepEqual(published('銜').sourceStrokeIndices.slice(3, 14), [7, 4, 9, 10, 11, 12, 13, 14, 8, 5, 6])
  for (const glyph of ['疋', '壑', '罕', '悍', '澣', '涵', '檻', '函', '盒', '蛤', '缸', '肛', '諧', '楷', '偕', '咳', '劾', '歇', '眩', '彗', '醯', '糊', '弧'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The two 皀 marks of 嚮 run from the upper right to the lower left; the 玄 dot of 衒 is the vertical mark the dictionary writes.
  for (const [glyph, n] of [['嚮', 4], ['嚮', 9]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  const dot = points('衒', 4)
  assert.equal(dot[0][0], dot.at(-1)![0])
  assert.ok(dot[0][1] < dot.at(-1)![1])
  assert.equal(published('衒').sourceStrokeIndices[3], null)
  assert.equal(HANJA_DICTIONARY_G1_BATCH20_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 3)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH20_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch20DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch20DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch20DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch20DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch20DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch20DictionaryBundle(HANJA_DICTIONARY_G1_BATCH20_STROKES.slice(1)), /published bundle/)
})
