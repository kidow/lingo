import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH17_STROKES, G1_BATCH17_DICTIONARY_GEOMETRY, loadG1Batch17DictionaryBundle } from './hanja-stroke-dictionary-g1-batch17.ts'
import { buildG1Batch17DictionaryBundle, G1_BATCH17_DICTIONARY_PROOF_PINS, validateG1Batch17DictionaryProofs, validateG1Batch17DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch17.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch17-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH17_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('forty-six approved grade 1 reviews reproduce 654 playable strokes with actual corpus provenance; the held forms stay out', () => {
  validateG1Batch17DictionaryBundle()
  assert.equal(approved.length, 46)
  assert.equal(HANJA_DICTIONARY_G1_BATCH17_STROKES.length, 46)
  assert.equal(HANJA_DICTIONARY_G1_BATCH17_STROKES.reduce((n, e) => n + e.paths.length, 0), 654)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['擲'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  // 讒, 凸, 瘠 and 脊 are held: a 毚 stroke shape, two differently placed pen lifts, and the 脊 top drawn with bars instead of slanted marks.
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['讒', '瘠', '脊', '凸'])
  for (const record of held) {
    assert.equal(record.checks.glyphForm, 'mismatch')
    assert.ok(!HANJA_DICTIONARY_G1_BATCH17_STROKES.some(e => e.glyph === record.glyph))
    assert.equal(hanjaStrokeData(originals.find(e => e.glyph === record.glyph)!), null)
  }
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH17_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH17_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 46)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH17_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['脹', '廠', '艙', '漲', '柵', '硝', '憔', '樵', '梢', '稍'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 長 writes its long left vertical before the top bar; 舟 writes the inner mark before the long bar.
  for (const [glyph, n] of [['脹', 5], ['漲', 7], ['艙', 5]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 冊 writes both inner verticals before the long bar.
  assert.deepEqual(published('柵').sourceStrokeIndices.slice(6, 9), [8, 9, 7])
  for (const glyph of ['篡', '擦', '塹', '站', '僭', '懺', '讖', '槍', '娼', '猖', '瘡', '倡', '愴', '寨', '凄', '滌', '擲', '闡', '穿', '擅', '喘', '轍', '綴', '籤', '僉', '諂', '帖', '貼', '疊', '牒', '捷', '涕', '諦', '貂', '礁', '醋'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The left 丷 dots of 尚 and 肖 and the 隹 ticks descend to the lower left; the right 丷 dots descend to the lower right.
  for (const [glyph, n] of [['廠', 5], ['硝', 7], ['梢', 6], ['稍', 7], ['憔', 6], ['樵', 7]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['廠', 6], ['硝', 8], ['梢', 7], ['稍', 8]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] < p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_G1_BATCH17_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 10)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH17_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch17DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch17DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch17DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch17DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch17DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch17DictionaryBundle(HANJA_DICTIONARY_G1_BATCH17_STROKES.slice(1)), /published bundle/)
})
