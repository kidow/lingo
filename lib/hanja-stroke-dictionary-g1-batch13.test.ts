import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH13_STROKES, G1_BATCH13_DICTIONARY_GEOMETRY, loadG1Batch13DictionaryBundle } from './hanja-stroke-dictionary-g1-batch13.ts'
import { buildG1Batch13DictionaryBundle, G1_BATCH13_DICTIONARY_PROOF_PINS, validateG1Batch13DictionaryProofs, validateG1Batch13DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch13.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch13-2026-09-19/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH13_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('forty-six approved grade 1 reviews reproduce 556 playable strokes with actual corpus provenance; the held forms stay out', () => {
  validateG1Batch13DictionaryBundle()
  assert.equal(approved.length, 46)
  assert.equal(HANJA_DICTIONARY_G1_BATCH13_STROKES.length, 46)
  assert.equal(HANJA_DICTIONARY_G1_BATCH13_STROKES.reduce((n, e) => n + e.paths.length, 0), 556)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['阮', '巍', '邀', '饒', '迂', '嵎', '隅', '隕', '喩'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  // 揄·癒·諭·愉 are held: the dictionary writes 兪 with 巜 and a dotted 月 where the pinned MM originals draw 俞 with 刂.
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['揄', '癒', '諭', '愉'])
  for (const record of held) {
    assert.equal(record.checks.glyphForm, 'mismatch')
    assert.ok(!HANJA_DICTIONARY_G1_BATCH13_STROKES.some(e => e.glyph === record.glyph))
    assert.equal(hanjaStrokeData(originals.find(e => e.glyph === record.glyph)!), null)
  }
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH13_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH13_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 46)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH13_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['渦', '巍', '饒', '聳', '耘', '宥', '揖', '膺'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 咼 and 鬼 write their inner bar before the inner vertical; 有 writes its 丿 before the bar.
  for (const [glyph, n] of [['渦', 6], ['巍', 15], ['宥', 4]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 飠 writes its fold and inner bars before the long left vertical; 耳 writes its bars before the right vertical.
  assert.deepEqual(published('饒').sourceStrokeIndices.slice(3, 7), [5, 6, 7, 4])
  assert.deepEqual(published('聳').sourceStrokeIndices.slice(13, 17), [15, 16, 17, 14])
  assert.deepEqual(published('揖').sourceStrokeIndices.slice(8, 12), [10, 11, 12, 9])
  for (const glyph of ['訛', '蝸', '玩', '阮', '頑', '枉', '猥', '擾', '邀', '僥', '凹', '夭', '踊', '涌', '虞', '迂', '寓', '嵎', '隅', '殞', '隕', '冤', '猿', '鴛', '柚', '游', '蹂', '喩', '絨', '戎', '毅'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The top stroke of 耒 in 耘 and the 隹 tick of 膺 descend to the lower left; the 广 dot of 膺 is vertical.
  for (const [glyph, n] of [['耘', 1], ['膺', 8]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  const dot = points('膺', 1)
  assert.ok(dot.every(([x]) => x === dot[0][0]) && dot[0][1] < dot.at(-1)![1])
  assert.equal(published('膺').sourceStrokeIndices[0], null)
  assert.equal(HANJA_DICTIONARY_G1_BATCH13_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 3)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH13_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch13DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch13DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch13DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch13DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch13DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch13DictionaryBundle(HANJA_DICTIONARY_G1_BATCH13_STROKES.slice(1)), /published bundle/)
})
