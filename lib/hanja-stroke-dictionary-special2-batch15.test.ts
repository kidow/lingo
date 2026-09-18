import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH15_STROKES, SPECIAL2_BATCH15_DICTIONARY_GEOMETRY, loadSpecial2Batch15DictionaryBundle } from './hanja-stroke-dictionary-special2-batch15.ts'
import { buildSpecial2Batch15DictionaryBundle, SPECIAL2_BATCH15_DICTIONARY_PROOF_PINS, validateSpecial2Batch15DictionaryProofs, validateSpecial2Batch15DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch15.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch15-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH15_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved reviews reproduce 586 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch15DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH15_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH15_STROKES.reduce((n, e) => n + e.paths.length, 0), 586)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['偸', '鈑', '覇', '俵', '俔'])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH15_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH15_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH15_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['榻', '闖', '鈑', '瓣', '翩', '枰', '佈', '俵', '瀚', '蟹', '奕', '舷'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps: 馬 opens with its left vertical (闖), 布 sweeps before its bar, 表 bars before its vertical, 角 and 舟 inner strokes.
  for (const [glyph, n] of [['闖', 9], ['佈', 3], ['俵', 4], ['蟹', 6], ['舷', 5]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 瓣 writes 瓜 first; 瀚 writes 人 before the two 习 and authors the four interiors on their permuted positions.
  assert.deepEqual(published('瓣').sourceStrokeIndices.slice(0, 12), [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7])
  assert.deepEqual(published('瀚').sourceStrokeIndices.slice(11), [15, 18, 14, null, null, 17, null, null])
  for (const glyph of ['倬', '嘆', '偸', '覇', '嬖', '瓢', '闔', '瀣', '俔', '泫'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // 羽 interiors, the 戶 and 反 opening sweeps, and the left 丷 dot of 平 all descend to the lower left.
  for (const [glyph, n] of [['榻', 10], ['榻', 11], ['榻', 13], ['榻', 14], ['鈑', 9], ['翩', 1], ['翩', 11], ['翩', 12], ['翩', 14], ['翩', 15],
    ['枰', 6], ['瀚', 15], ['瀚', 16], ['瀚', 18], ['瀚', 19]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  // The right 丷 dot of 平 descends to the lower right; the 亦 opening dot of 奕 is vertical.
  const right = points('枰', 7)
  assert.ok(right[0][0] < right.at(-1)![0] && right[0][1] < right.at(-1)![1])
  const dot = points('奕', 1)
  assert.ok(dot.every(([x]) => x === dot[0][0]) && dot[0][1] < dot.at(-1)![1])
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH15_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 17)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH15_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch15DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch15DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch15DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch15DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch15DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch15DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH15_STROKES.slice(1)), /published bundle/)
})
