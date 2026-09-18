import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES, SPECIAL2_BATCH7_DICTIONARY_GEOMETRY, loadSpecial2Batch7DictionaryBundle } from './hanja-stroke-dictionary-special2-batch7.ts'
import { buildSpecial2Batch7DictionaryBundle, SPECIAL2_BATCH7_DICTIONARY_PROOF_PINS, validateSpecial2Batch7DictionaryProofs, validateSpecial2Batch7DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch7.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch7-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved reviews reproduce 647 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch7DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES.reduce((n, e) => n + e.paths.length, 0), 647)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['牀', '峠', '橡', '笹'])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH7_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['騁', '肆', '駟', '廂', '穡', '墅', '蘚', '褻', '銷'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps: 馬 and 镸 open with the left vertical, 里's 土 bar precedes its long vertical, 艹 pairs bar-then-vertical.
  for (const [glyph, n] of [['騁', 1], ['肆', 1], ['駟', 1], ['墅', 5], ['蘚', 1], ['蘚', 3]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 嗇 writes its bar and long vertical before the two 人 pairs.
  assert.deepEqual(published('穡').sourceStrokeIndices.slice(5, 11), [10, 11, 6, 7, 8, 9])
  for (const glyph of ['篩', '俟', '乍', '汕', '衫', '牀', '笹', '涑'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Vertical descending dot: 广 in 廂.
  const yan = points('廂', 1)
  assert.ok(yan.every(point => point[0] === yan[0][0]))
  assert.ok(yan.at(-1)![1] > yan[0][1])
  assert.equal(published('廂').sourceStrokeIndices[0], null)
  // Outward dot pair: 小 in 銷 spreads left and right.
  const left = points('銷', 10)
  assert.ok(left[0][0] > left.at(-1)![0] && left[0][1] < left.at(-1)![1])
  const right = points('銷', 11)
  assert.ok(right[0][0] < right.at(-1)![0] && right[0][1] < right.at(-1)![1])
  for (const n of [10, 11]) assert.equal(published('銷').sourceStrokeIndices[n - 1], null)
  // 衣's long sweep runs from the upper right down to the lower left in 褻.
  const sweep = points('褻', 14)
  assert.ok(sweep[0][0] > sweep.at(-1)![0] && sweep[0][1] < sweep.at(-1)![1])
  assert.equal(published('褻').sourceStrokeIndices[13], null)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 4)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH7_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch7DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch7DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch7DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch7DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch7DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch7DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES.slice(1)), /published bundle/)
})
