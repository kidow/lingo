import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES, SPECIAL2_BATCH10_DICTIONARY_GEOMETRY, loadSpecial2Batch10DictionaryBundle } from './hanja-stroke-dictionary-special2-batch10.ts'
import { buildSpecial2Batch10DictionaryBundle, SPECIAL2_BATCH10_DICTIONARY_PROOF_PINS, validateSpecial2Batch10DictionaryProofs, validateSpecial2Batch10DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch10.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch10-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved reviews reproduce 653 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch10DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES.reduce((n, e) => n + e.paths.length, 0), 653)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph),
    ['鼇', '澳', '熬', '敖', '瘟', '瓮', '椀', '翫', '嵬', '嶢', '燿', '慂'])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH10_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['饔', '癰', '窪', '窩', '嵬', '繇', '燿', '縟', '蕓'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps: an inner bar before its inner vertical, 艹 pairs bar-then-vertical.
  for (const [glyph, n] of [['窩', 8], ['嵬', 7], ['蕓', 1], ['蕓', 3]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 䍃 writes its second long sweep before the two short ticks; 隹 writes all three inner bars before the long vertical.
  assert.deepEqual(published('繇').sourceStrokeIndices.slice(0, 4), [1, 4, 2, 3])
  assert.deepEqual(published('燿').sourceStrokeIndices.slice(14, 17), [16, 17, 15])
  for (const glyph of ['塢', '晤', '俉', '蜈', '鼇', '敖', '兀', '甬', '盂', '勖'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Vertical descending dot: 穴 in 窪.
  const xue = points('窪', 1)
  assert.ok(xue.every(point => point[0] === xue[0][0]))
  assert.ok(xue.at(-1)![1] > xue[0][1])
  // Descending-left strokes: the tick beside 隹 in 饔, 癰 and 燿, the 羽 interiors of 燿 and the left dot under 糸 in 縟.
  for (const [glyph, n] of [['饔', 8], ['癰', 18], ['燿', 6], ['燿', 7], ['燿', 9], ['燿', 10], ['燿', 13], ['縟', 5]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(published('窪').sourceStrokeIndices[0], null)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 9)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH10_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch10DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch10DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch10DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch10DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch10DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch10DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES.slice(1)), /published bundle/)
})
