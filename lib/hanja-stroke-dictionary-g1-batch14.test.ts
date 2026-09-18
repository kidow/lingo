import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH14_STROKES, G1_BATCH14_DICTIONARY_GEOMETRY, loadG1Batch14DictionaryBundle } from './hanja-stroke-dictionary-g1-batch14.ts'
import { buildG1Batch14DictionaryBundle, G1_BATCH14_DICTIONARY_PROOF_PINS, validateG1Batch14DictionaryProofs, validateG1Batch14DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch14.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch14-2026-09-19/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH14_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved grade 1 reviews reproduce 591 playable strokes with actual corpus provenance', () => {
  validateG1Batch14DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH14_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH14_STROKES.reduce((n, e) => n + e.paths.length, 0), 591)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['餌', '靭', '瓷', '嚼', '檣', '豬', '箸', '邸', '觝'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH14_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH14_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH14_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['餌', '爾', '翌', '靭', '溢', '孕', '炙', '嚼', '雀', '箴', '薔', '漿', '醬', '齋', '錚', '觝'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 乃 writes its 丿 first; 爿 writes its long vertical first; 角 writes its inner bar before the inner vertical; 咸 sweeps before its bar.
  for (const [glyph, n] of [['孕', 1], ['漿', 1], ['醬', 1], ['觝', 5], ['箴', 7]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 艹 pairs bar-then-vertical and 嗇 writes 土 before the 人 pairs; 飠 and 冖 fold before their long vertical; 冂 and 齋 close with the right vertical.
  assert.deepEqual(published('薔').sourceStrokeIndices.slice(0, 10), [2, 1, 4, 3, 9, 10, 5, 6, 7, 8])
  assert.deepEqual(published('餌').sourceStrokeIndices.slice(3, 7), [5, 6, 7, 4])
  assert.deepEqual(published('嚼').sourceStrokeIndices.slice(12, 16), [14, 15, 16, 13])
  assert.deepEqual(published('爾').sourceStrokeIndices.slice(3, 6), [5, 6, 4])
  assert.deepEqual(published('齋').sourceStrokeIndices.slice(11, 14), [13, 14, 12])
  for (const glyph of ['椅', '擬', '誼', '姨', '痍', '弛', '蚓', '咽', '湮', '佚', '剩', '疵', '仔', '瓷', '炸', '勺', '灼', '綽', '鵲', '盞', '棧', '簪', '檣', '杖', '匠', '仗', '滓', '狙', '豬', '箸', '咀', '詛', '邸', '嫡'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The 羽 marks of 翌, the 刃 dot of 靭, the left 益 dot of 溢, the left 火 dot of 炙, the 隹 tick of 雀 and the first 爫 mark of 錚
  // descend to the lower left; the right 益 dot of 溢 and the third 爫 mark of 錚 descend to the lower right; the 立 dot of 翌 and the 亠 dot of 齋 are vertical.
  for (const [glyph, n] of [['翌', 2], ['翌', 3], ['翌', 5], ['翌', 6], ['靭', 12], ['溢', 4], ['炙', 5], ['雀', 6], ['錚', 10]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['溢', 5], ['錚', 12]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] < p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['翌', 7], ['齋', 1]] as const) {
    const dot = points(glyph, n)
    assert.ok(dot.every(([x]) => x === dot[0][0]) && dot[0][1] < dot.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_G1_BATCH14_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 13)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH14_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch14DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch14DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch14DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch14DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch14DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch14DictionaryBundle(HANJA_DICTIONARY_G1_BATCH14_STROKES.slice(1)), /published bundle/)
})
