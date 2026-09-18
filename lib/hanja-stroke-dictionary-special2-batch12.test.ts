import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES, SPECIAL2_BATCH12_DICTIONARY_GEOMETRY, loadSpecial2Batch12DictionaryBundle } from './hanja-stroke-dictionary-special2-batch12.ts'
import { buildSpecial2Batch12DictionaryBundle, SPECIAL2_BATCH12_DICTIONARY_PROOF_PINS, validateSpecial2Batch12DictionaryProofs, validateSpecial2Batch12DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch12.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch12-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved reviews reproduce 648 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch12DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES.reduce((n, e) => n + e.paths.length, 0), 648)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph),
    ['縡', '諍', '這', '紵', '楮', '儲', '鏑', '勣', '岾', '鮎', '渟', '鉦', '瀞', '霆', '蚤'])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH12_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['齎', '箏', '苧', '雎', '勣', '翟', '鮎', '摺', '瀞', '霽', '薺', '臍', '雕', '鐘'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps: 艹 pairs bar-then-vertical, 責·青 upper bars before the vertical, 田 inner bar before its vertical, 里 lower bar before the long vertical.
  for (const [glyph, n] of [['苧', 1], ['苧', 3], ['薺', 1], ['薺', 3], ['勣', 2], ['瀞', 5], ['鮎', 5], ['鐘', 18]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 齊's lower frame writes its two inner bars before the long right vertical.
  assert.deepEqual(published('齎').sourceStrokeIndices.slice(11, 14), [13, 14, 12])
  assert.deepEqual(published('霽').sourceStrokeIndices.slice(19, 22), [21, 22, 20])
  assert.deepEqual(published('薺').sourceStrokeIndices.slice(15, 18), [17, 18, 16])
  assert.deepEqual(published('臍').sourceStrokeIndices.slice(15, 18), [17, 18, 16])
  for (const glyph of ['縡', '姐', '齟', '這', '佇', '儲', '筌', '点', '醍', '澍'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Vertical descending dot: 亠 in 齎.
  const tou = points('齎', 1)
  assert.ok(tou.every(point => point[0] === tou[0][0]))
  assert.ok(tou.at(-1)![1] > tou[0][1])
  assert.equal(published('齎').sourceStrokeIndices[0], null)
  // Descending-left strokes: the left 爫 dot of 箏, the 隹 ticks of 雎·翟·雕 and the 羽 interiors of 翟 and 摺.
  for (const [glyph, n] of [['箏', 8], ['雎', 8], ['翟', 2], ['翟', 3], ['翟', 5], ['翟', 6], ['翟', 9],
    ['摺', 5], ['摺', 6], ['摺', 8], ['摺', 9], ['雕', 11]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  // The right 爫 dot of 箏 descends right.
  const right = points('箏', 10)
  assert.ok(right[0][0] < right.at(-1)![0] && right[0][1] < right.at(-1)![1])
  assert.equal(published('箏').sourceStrokeIndices[9], null)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 14)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH12_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch12DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch12DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch12DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch12DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch12DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch12DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES.slice(1)), /published bundle/)
})
