import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_STROKES } from './hanja-stroke-dictionary-g2.ts'
import { HANJA_DICTIONARY_G2_FOLLOWUP_STROKES, G2_FOLLOWUP_DICTIONARY_GEOMETRY, loadG2FollowupDictionaryBundle } from './hanja-stroke-dictionary-g2-followup.ts'
import { buildG2FollowupDictionaryBundle, G2_FOLLOWUP_DICTIONARY_PROOF_PINS, validateG2FollowupDictionaryProofs, validateG2FollowupDictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-followup.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-batch1-followup-2026-09-15/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_FOLLOWUP_STROKES.find(e => e.glyph === glyph)!
type Point = [number, number]
const points = (path: string): Point[] => [...path.matchAll(/[ML]([-\.\d]+) ([-\.\d]+)/g)].map(m => [+m[1], +m[2]])
const pointSegment = (p: Point, a: Point, b: Point) => {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
const cross = (a: Point, b: Point, c: Point) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
function distance(a: Point[], b: Point[]) {
  let minimum = Infinity
  for (let i = 1; i < a.length; i++) for (let j = 1; j < b.length; j++) {
    const p = a[i - 1], q = a[i], r = b[j - 1], s = b[j]
    if (cross(p, q, r) * cross(p, q, s) < 0 && cross(r, s, p) * cross(r, s, q) < 0) return 0
    minimum = Math.min(minimum, pointSegment(p, r, s), pointSegment(q, r, s), pointSegment(r, p, q), pointSegment(s, p, q))
  }
  return minimum
}
const stroke = (glyph: string, n: number) => points(published(glyph).paths[n - 1])

test('six previously held forms require the complete 75-stroke followup approval', () => {
  assert.deepEqual(HANJA_DICTIONARY_G2_FOLLOWUP_STROKES.map(e => e.glyph), ['迦', '甄', '雇', '膠', '絞', '窟'])
  assert.equal(HANJA_DICTIONARY_G2_FOLLOWUP_STROKES.reduce((n, e) => n + e.paths.length, 0), 75)
  assert.equal(HANJA_DICTIONARY_G2_FOLLOWUP_STROKES.flatMap(e => e.sourceStrokeIndices).filter(n => n === null).length, 18)
  assert.deepEqual(loadG2FollowupDictionaryBundle(buildG2FollowupDictionaryBundle()), HANJA_DICTIONARY_G2_FOLLOWUP_STROKES)
  validateG2FollowupDictionaryBundle()
  for (const original of originals) {
    assert.deepEqual(hanjaStrokeData(original), published(original.glyph))
    assert.equal(HANJA_DICTIONARY_G2_STROKES.find(e => e.glyph === original.glyph), undefined)
    assert.equal(HANJA_STROKES.filter(e => e.glyph === original.glyph).length, 1)
    assert.equal(hanjaStrokeData({ glyph: original.glyph, strokes: original.strokes + 1 }), null)
  }
})

test('shared audit reconstructs the actual Ja and MM geometry and keeps dictionary attribution', () => {
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = originals.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '2급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G2_FOLLOWUP_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 6)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.equal(audit.playback['dictionary-crosschecked'], 6)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G2_FOLLOWUP_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
  const original = originals[0], changed = structuredClone(original.medians)
  changed[0][0][0]++
  assert.throws(() => dictionaryGeometry(original.glyph, changed), /original mismatch/)
  const wrong = structuredClone(buildG2FollowupDictionaryBundle())
  wrong.characters[0].geometrySource = G2_FOLLOWUP_DICTIONARY_GEOMETRY.MM.sha256
  assert.throws(() => loadG2FollowupDictionaryBundle(wrong), /entry mismatch/)
})

test('reverting held geometry or moving 出 back to candidate order cannot pass publication', () => {
  for (const original of originals) {
    const reverted = structuredClone(published(original.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  assert.deepEqual(published('窟').sourceStrokeIndices.slice(8, 11), [11, 9, 10])
  const reordered = structuredClone(published('窟'))
  const p = [...reordered.paths]
  reordered.paths = [...p.slice(0, 8), p[9], p[10], p[8], ...p.slice(11)]
  assert.throws(() => validateDictionaryReview(reordered, 13), /published entry/)
})

test('reviewed gaps remain open at width five while the intended top-bar and walking joins meet', () => {
  for (const [glyph, a, b] of [['甄', 5, 6], ['雇', 1, 2], ['膠', 2, 6], ['膠', 2, 7], ['膠', 9, 10], ['絞', 4, 5], ['絞', 4, 6]] as const)
    assert.ok(distance(stroke(glyph, a), stroke(glyph, b)) > 5, glyph + ' ' + a + '/' + b)
  assert.ok(distance(stroke('窟', 3).slice(-3), stroke('窟', 5).slice(1)) > 5)
  assert.ok(distance(stroke('窟', 5).slice(2), stroke('窟', 6)) > 5)
  assert.equal(distance(stroke('雇', 1), stroke('雇', 4)), 0)
  assert.equal(distance(stroke('迦', 8), stroke('迦', 9)), 0)
  assert.ok(stroke('雇', 1)[0][0] > stroke('雇', 1).at(-1)![0])
  for (const n of [6, 7, 9, 10]) {
    const p = stroke('膠', n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1])
  }
  const stem = stroke('絞', 4)
  assert.equal(stem[0][0], stem.at(-1)![0])
  assert.ok(stem.at(-1)![1] > stem[0][1])
})

test('rewritten proofs, incomplete sets and malformed paths fail closed', () => {
  for (const file of Object.keys(G2_FOLLOWUP_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2FollowupDictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG2FollowupDictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2FollowupDictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG2FollowupDictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG2FollowupDictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG2FollowupDictionaryBundle(HANJA_DICTIONARY_G2_FOLLOWUP_STROKES.slice(1)), /published bundle/)
})
