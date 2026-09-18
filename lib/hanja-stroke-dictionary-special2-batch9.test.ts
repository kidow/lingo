import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES, SPECIAL2_BATCH9_DICTIONARY_GEOMETRY, loadSpecial2Batch9DictionaryBundle } from './hanja-stroke-dictionary-special2-batch9.ts'
import { buildSpecial2Batch9DictionaryBundle, SPECIAL2_BATCH9_DICTIONARY_PROOF_PINS, validateSpecial2Batch9DictionaryProofs, validateSpecial2Batch9DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch9.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch9-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved reviews reproduce 698 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch9DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES.reduce((n, e) => n + e.paths.length, 0), 698)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph),
    ['椰', '瀁', '暘', '禳', '檍', '涎', '潁', '叡'])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH9_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['蒻', '瀁', '禳', '馭', '艅', '剡', '琰', '曄', '瀛', '鰲'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps: 艹 pairs bar-then-vertical, 羊's bar before its vertical, 馬's left vertical first, 舟's bar after both inner strokes.
  for (const [glyph, n] of [['蒻', 1], ['蒻', 3], ['曄', 5], ['曄', 7], ['瀁', 7], ['馭', 1], ['艅', 5], ['鰲', 6]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 襄 writes its lower bar before the two short verticals.
  assert.deepEqual(published('禳').sourceStrokeIndices.slice(14, 17), [17, 15, 16])
  for (const glyph of ['齷', '岩', '唵', '狎', '碍', '厓', '掖', '罌', '穰', '乂'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Vertical descending dot: 亠 in 瀛.
  const tou = points('瀛', 4)
  assert.ok(tou.every(point => point[0] === tou[0][0]))
  assert.ok(tou.at(-1)![1] > tou[0][1])
  // Descending-left strokes: both interior pairs of 弱 in 蒻 and the left dot of each 火 in 剡 and 琰.
  for (const [glyph, n] of [['蒻', 8], ['蒻', 9], ['蒻', 13], ['蒻', 14], ['剡', 1], ['剡', 5], ['琰', 5]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
  }
  // 敖's bar runs from left to right in 鰲.
  const bar = points('鰲', 5)
  assert.ok(bar[0][0] < bar.at(-1)![0])
  assert.ok(Math.abs(bar.at(-1)![1] - bar[0][1]) < Math.abs(bar.at(-1)![0] - bar[0][0]))
  for (const [glyph, n] of [['瀛', 4], ['蒻', 8], ['剡', 1], ['琰', 5], ['鰲', 5]] as const)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 9)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH9_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch9DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch9DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch9DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch9DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch9DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch9DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES.slice(1)), /published bundle/)
})
