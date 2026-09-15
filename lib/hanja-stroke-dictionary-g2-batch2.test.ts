import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_BATCH2_STROKES, G2_BATCH2_DICTIONARY_GEOMETRY, loadG2Batch2DictionaryBundle } from './hanja-stroke-dictionary-g2-batch2.ts'
import { buildG2Batch2DictionaryBundle, G2_BATCH2_DICTIONARY_PROOF_PINS, validateG2Batch2DictionaryProofs, validateG2Batch2DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-batch2.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-batch2-2026-09-15/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_BATCH2_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('all fifty individual reviews reproduce 658 playable strokes with actual corpus provenance', () => {
  validateG2Batch2DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_G2_BATCH2_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G2_BATCH2_STROKES.reduce((n, e) => n + e.paths.length, 0), 658)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(originals.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['垈', '悳', '惇'])
  for (const original of originals) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G2_BATCH2_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = originals.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '2급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH2_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH2_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const observations = JSON.parse(read(dir + 'observations.json')) as { entries: { glyph: string; initialDecision: string; correctedReview?: { completed: boolean; reviewedStrokes: number } }[] }
  const corrected = observations.entries.filter(e => e.initialDecision !== 'matched')
  assert.equal(corrected.length, 17)
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  for (const glyph of ['驥', '驪']) assert.deepEqual(published(glyph).sourceStrokeIndices.slice(0, 2), [2, 1])
  assert.deepEqual(published('萊').sourceStrokeIndices.slice(0, 4), [2, 1, 4, 3])
})

test('source-specific direction and pen-lift corrections remain distinct', () => {
  for (const [glyph, n] of [['溺', 7], ['溺', 8], ['溺', 12], ['溺', 13], ['謄', 5], ['樑', 10], ['驥', 7]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
  }
  const ton = points('頓', 1)
  assert.ok(ton[0][0] > ton.at(-1)![0])
  for (const [glyph, n] of [['麒', 1], ['塘', 4], ['惇', 4], ['燉', 5], ['裸', 1], ['拉', 4], ['亮', 1], ['廬', 1], ['驪', 14], ['驪', 18], ['驪', 19]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(point => point[0] === p[0][0]))
    assert.ok(p.at(-1)![1] > p[0][1])
  }
  for (const [glyph, n] of [['膽', 11], ['謄', 11]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(point => point[1] === p[0][1]))
    assert.ok(p.at(-1)![0] > p[0][0])
  }
  // 亮 has two separate lower legs, not a leading horizontal joining them into 几.
  assert.ok(points('亮', 9)[0][0] - points('亮', 8)[0][0] > 5)
  // The shortened 覀 bar must not close the outer rectangle.
  const short = points('潭', 9), outer = points('潭', 6)
  assert.ok(short[0][0] > outer[0][0] + 5)
  assert.ok(short.at(-1)![0] < outer.at(-1)![0] - 5)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G2_BATCH2_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2Batch2DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG2Batch2DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2Batch2DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG2Batch2DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG2Batch2DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG2Batch2DictionaryBundle(HANJA_DICTIONARY_G2_BATCH2_STROKES.slice(1)), /published bundle/)
})
