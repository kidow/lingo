import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { dictionaryGeometry, validateDictionaryProofs, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const dir = 'docs/hanja-g4-ek-po-geun-2026-09-14/'
const read = (p: string) => readFileSync(new URL('../' + p, import.meta.url), 'utf8')
const original = JSON.parse(read(dir + 'originals.json')) as { entries: { glyph: string; medians: number[][][] }[] }
const before = JSON.parse(read(dir + 'prior-candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
const hash = (v: unknown) => createHash('sha256').update(JSON.stringify(v)).digest('hex')
const runtime = HANJA_STROKES.filter(e => ['液', '砲', '筋'].includes(e.glyph))
const points = (p: string) => [...p.matchAll(/[ML]([-.\d]+) ([-.\d]+)/g)].map(m => [+m[1], +m[2]])
function gap(p: number[], path: string) {
  const ps = points(path)
  return Math.min(...ps.slice(1).map((b, i) => {
    const a = ps[i], dx = b[0] - a[0], dy = b[1] - a[1]
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
    return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
  }))
}

test('液, 砲 and 筋 publish exactly 33 dictionary-crosschecked strokes', () => {
  assert.deepEqual(runtime.map(e => [e.glyph, e.paths.length]), [['液', 11], ['砲', 10], ['筋', 12]])
  for (const e of runtime) {
    assert.equal(e.verificationSource, 'ehanja-crosschecked')
    assert.equal(e.verifiedAt, '2026-09-14')
    assert.deepEqual(hanjaStrokeData({ glyph: e.glyph, strokes: e.paths.length }), e)
    assert.equal(hanjaStrokeData({ glyph: e.glyph, strokes: e.paths.length + 1 }), null)
  }
  for (const glyph of ['藝', '衛', '豊', '獎', '鍾']) assert.ok(!HANJA_STROKES.some(e => e.glyph === glyph))
})

test('99 observed source frames cover each exact original timing row once', () => {
  const observed = JSON.parse(read(dir + 'observations.json')) as { samples: [string, number, number, number, number, number][] }
  const source = JSON.parse(read('docs/hanja-g4-held-11-2026-09-14/sources.json')) as { entries: { glyph: string; timingRows: number[][] }[] }
  assert.equal(observed.samples.length, 33)
  assert.equal(new Set(observed.samples.map(r => r[0] + r[1])).size, 33)
  for (const [glyph, n, count, ...times] of observed.samples) {
    const entry = source.entries.find(e => e.glyph === glyph)!, row = entry.timingRows[n - 1]
    assert.equal(count, entry.timingRows.length)
    assert.equal(row[0], n)
    times.forEach((time, i) => assert.ok(Math.abs(time - row[1] - row[2] * [.2, .8, 1][i]) < 1e-8))
  }
  for (const file of ['originals.json', 'prior-candidate-paths.json', 'observations.json', 'review.json', 'corrections.json', 'candidate-paths.json']) {
    assert.throws(() => validateDictionaryProofs(p => read(p) + (p === dir + file ? ' ' : '')), /proof mismatch/)
  }
})

test('only the five approved replacements change the original normalized medians', () => {
  const expected: Record<string, number[]> = { 液: [4, 10], 砲: [3], 筋: [3, 6] }
  for (const e of original.entries) {
    const old = before.entries.find(p => p.glyph === e.glyph)!, current = runtime.find(p => p.glyph === e.glyph)!
    assert.deepEqual(normalizeMedians(e.medians), old.paths)
    assert.deepEqual(current.paths.flatMap((p, i) => p === old.paths[i] ? [] : [i + 1]), expected[e.glyph])
    assert.deepEqual(current.sourceStrokeIndices?.flatMap((n, i) => n === null ? [i + 1] : []), expected[e.glyph])
    assert.deepEqual(dictionaryGeometry(e.glyph, e.medians).paths, current.paths)
    const forged = structuredClone(current)
    forged.paths = old.paths
    forged.pathsSha256 = hash(old.paths)
    assert.throws(() => validateDictionaryReview(forged as Parameters<typeof validateDictionaryReview>[0], current.paths.length), /published entry/)
  }
})

test('verticals and connected marks retain their observed direction and close the old gaps', () => {
  const paths = (g: string) => runtime.find(e => e.glyph === g)!.paths
  for (const [g, n] of [['液', 4], ['砲', 3]] as const) {
    const p = points(paths(g)[n - 1])
    assert.equal(p[0][0], p.at(-1)![0]); assert.ok(p[0][1] < p.at(-1)![1])
  }
  for (const [g, n, target, end] of [['液', 4, 5, true], ['液', 10, 9, true], ['砲', 3, 4, false], ['筋', 3, 2, false], ['筋', 6, 5, false]] as const) {
    const ps = paths(g), p = points(ps[n - 1])
    assert.ok(gap(end ? p.at(-1)! : p[0], ps[target - 1]) < 3.2)
  }
  for (const [g, n] of [['液', 10], ['筋', 3], ['筋', 6]] as const) {
    const p = points(paths(g)[n - 1])
    assert.ok(p.at(-1)![0] > p[0][0] && p.at(-1)![1] > p[0][1])
  }
})

test('shared audit uses the exact MM originals and does not promote them to official evidence', () => {
  const candidates = original.entries.map(e => ({ character: e.glyph, medians: e.medians, strokes: normalizeMedians(e.medians) }))
  const characters = runtime.map(e => ({ glyph: e.glyph, strokes: e.paths.length, readingGrade: e.glyph === '筋' ? '4급' : '4급II' }))
  const audit = auditStrokes(characters, [], runtime, [], candidates)
  assert.equal(audit.verificationSources.dictionary, 3)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.equal(audit.playback['dictionary-crosschecked'], 3)
  assert.throws(() => auditStrokes(characters, [], runtime, candidates, []), /geometry mismatch/)
})
