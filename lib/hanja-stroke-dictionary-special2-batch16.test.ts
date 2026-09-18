import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH16_STROKES, SPECIAL2_BATCH16_DICTIONARY_GEOMETRY, loadSpecial2Batch16DictionaryBundle } from './hanja-stroke-dictionary-special2-batch16.ts'
import { buildSpecial2Batch16DictionaryBundle, SPECIAL2_BATCH16_DICTIONARY_PROOF_PINS, validateSpecial2Batch16DictionaryProofs, validateSpecial2Batch16DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch16.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch16-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH16_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved reviews reproduce 647 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch16DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH16_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH16_STROKES.reduce((n, e) => n + e.paths.length, 0), 647)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['脇', '鋏', '烱', '琿', '簧', '晄', '隍', '獪', '驍'])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH16_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH16_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH16_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['浹', '夾', '莢', '滎', '鎣', '熒', '蹊', '琿', '攫', '豁', '簧', '隍', '匯', '驍', '淆', '肴', '燻', '虧'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps: 王 bars before the vertical, 田 and 里 inner bar before the vertical, 爻-top 丿 before the bar, 龶 vertical before its bottom bar.
  for (const [glyph, n] of [['琿', 2], ['簧', 14], ['隍', 10], ['淆', 6], ['肴', 3], ['燻', 12], ['豁', 6]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 夾 writes its two small 人 before the long 丿 and 乀 of 大; 艹 pairs bar-then-vertical; 馬 inner bars before the middle vertical.
  assert.deepEqual(published('夾').sourceStrokeIndices, [1, 4, 5, 6, 7, 2, 3])
  assert.deepEqual(published('浹').sourceStrokeIndices.slice(4), [7, 8, 9, 10, 5, 6])
  assert.deepEqual(published('莢').sourceStrokeIndices, [2, 1, 4, 3, 5, 8, 9, 10, 11, 6, 7])
  assert.deepEqual(published('驍').sourceStrokeIndices.slice(0, 6), [1, 2, 4, 5, 3, 6])
  for (const glyph of ['孑', '頁', '鋏', '鞋', '顥', '瓠', '壺', '獪', '暉', '畦'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Descending-left strokes: the 火 left dots, the 爫 left dot of 奚, and the 隹 ticks.
  for (const [glyph, n] of [['滎', 1], ['滎', 5], ['鎣', 1], ['鎣', 5], ['熒', 5], ['熒', 11], ['蹊', 9], ['攫', 16], ['匯', 7], ['虧', 9]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  // The 爫 right dot of 奚 descends to the lower right; the 龶 top of 害 sweeps leftward.
  const right = points('蹊', 11)
  assert.ok(right[0][0] < right.at(-1)![0] && right[0][1] < right.at(-1)![1])
  const sweep = points('豁', 4)
  assert.ok(sweep[0][0] > sweep.at(-1)![0] && Math.abs(sweep[0][1] - sweep.at(-1)![1]) < 5)
  assert.equal(published('豁').sourceStrokeIndices[3], null)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH16_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 12)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH16_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch16DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch16DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch16DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch16DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch16DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch16DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH16_STROKES.slice(1)), /published bundle/)
})
