import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { dictionaryGeometry, validateDictionaryProofs, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const dir = 'docs/hanja-g4-ye-2026-09-14/'
const read = (p: string) => readFileSync(new URL('../' + p, import.meta.url), 'utf8')
const original = JSON.parse(read(dir + 'originals.json')) as { entries: { glyph: string; medians: number[][][] }[] }
const before = JSON.parse(read(dir + 'prior-candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
const hash = (v: unknown) => createHash('sha256').update(JSON.stringify(v)).digest('hex')
const runtime = HANJA_STROKES.filter(e => e.glyph === '藝')
const points = (p: string) => [...p.matchAll(/[ML]([-.\d]+) ([-.\d]+)/g)].map(m => [+m[1], +m[2]])
function gap(p: number[], path: string) {
  const ps = points(path)
  return Math.min(...ps.slice(1).map((b, i) => {
    const a = ps[i], dx = b[0] - a[0], dy = b[1] - a[1]
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
    return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
  }))
}

test('藝 publishes one exact 19-stroke private dictionary review', () => {
  assert.equal(runtime.length, 1)
  const e = runtime[0]
  assert.equal(e.paths.length, 19)
  assert.equal(e.verificationSource, 'ehanja-crosschecked')
  assert.equal(e.verifiedAt, '2026-09-14')
  assert.deepEqual(hanjaStrokeData({ glyph: '藝', strokes: 19 }), e)
  assert.equal(hanjaStrokeData({ glyph: '藝', strokes: 18 }), null)
  assert.equal(hanjaStrokeData({ glyph: '艺', strokes: 19 }), null)
  assert.equal(hanjaStrokeData({ glyph: '芸', strokes: 19 }), null)
})

test('57 observed frames cover every original timing row and all six proof files are pinned', () => {
  const observed = JSON.parse(read(dir + 'observations.json')) as { samples: [string, number, number, number, number, number][] }
  const source = JSON.parse(read('docs/hanja-g4-held-11-2026-09-14/sources.json')) as { entries: { glyph: string; timingRows: number[][] }[] }
  const entry = source.entries.find(e => e.glyph === '藝')!
  assert.equal(observed.samples.length, 19)
  assert.deepEqual(observed.samples.map(r => r[1]), Array.from({ length: 19 }, (_, i) => i + 1))
  for (const [glyph, n, count, ...times] of observed.samples) {
    assert.equal(glyph, '藝')
    assert.equal(count, 19)
    const row = entry.timingRows[n - 1]
    assert.equal(row[0], n)
    times.forEach((time, i) => assert.ok(Math.abs(time - row[1] - row[2] * [.2, .8, 1][i]) < 1e-8))
  }
  for (const file of ['originals.json', 'prior-candidate-paths.json', 'observations.json', 'review.json', 'corrections.json', 'candidate-paths.json']) {
    assert.throws(() => validateDictionaryProofs(p => read(p) + (p === dir + file ? ' ' : '')), /proof mismatch/)
  }
})

test('three replacements and four reordered positions reconstruct the approved geometry', () => {
  const current = runtime[0], old = before.entries[0].paths
  assert.deepEqual(normalizeMedians(original.entries[0].medians), old)
  assert.deepEqual(current.sourceStrokeIndices?.slice(0, 4), [2, 1, 4, 3])
  assert.deepEqual(current.sourceStrokeIndices?.flatMap((n, i) => n === null ? [i + 1] : []), [9, 11, 13])
  assert.deepEqual(current.paths.flatMap((p, i) => p === old[i] ? [] : [i + 1]), [1, 2, 3, 4, 9, 11, 13])
  current.sourceStrokeIndices?.forEach((n, i) => {
    if (n !== null) assert.equal(current.paths[i], old[n - 1])
  })
  assert.deepEqual(dictionaryGeometry('藝', original.entries[0].medians).paths, current.paths)
  for (const paths of [old, [current.paths[1], current.paths[0], ...current.paths.slice(2)]]) {
    const forged = structuredClone(current)
    forged.paths = paths
    forged.pathsSha256 = hash(paths)
    assert.throws(() => validateDictionaryReview(forged as Parameters<typeof validateDictionaryReview>[0], 19), /published entry/)
  }
})

test('藝 restores stroke 9 down-right turn and separates the lower 土 at width 5', () => {
  const ps = runtime[0].paths, bend = points(ps[8]), lower = points(ps[10])
  assert.equal(bend[0][0], bend[1][0])
  assert.ok(bend[1][1] > bend[0][1])
  assert.equal(bend[2][1], bend[3][1])
  assert.ok(bend[3][0] > bend[2][0])
  assert.equal(lower[0][0], lower.at(-1)![0])
  assert.ok(lower.at(-1)![1] > lower[0][1])
  assert.ok(gap(lower[0], ps[6]) > 5)
  assert.ok(gap(lower.at(-1)!, ps[11]) < 5)
  const crossbar = points(ps[9])
  assert.ok(Math.min(...crossbar.map(p => p[0])) < lower[0][0])
  assert.ok(Math.max(...crossbar.map(p => p[0])) > lower[0][0])
  assert.ok(lower[0][1] < Math.min(...crossbar.map(p => p[1])))
  assert.ok(lower.at(-1)![1] > Math.max(...crossbar.map(p => p[1])))
  assert.ok(gap(points(before.entries[0].paths[10])[0], before.entries[0].paths[6]) < 5)
})

test('藝 resolves the held upper-right gap without disconnecting the 丸 crossing', () => {
  const ps = runtime[0].paths, descent = points(ps[12]), prior = before.entries[0].paths
  assert.ok(gap(descent[0], ps[3]) > 5)
  assert.ok(gap(points(prior[12])[0], prior[2]) < 5)
  assert.ok(descent.at(-1)![0] < descent[0][0] && descent.at(-1)![1] > descent[0][1])
  assert.ok(descent.every((p, i) => i === 0 || p[1] >= descent[i - 1][1]))
  const crossing = points(ps[13])
  assert.ok(crossing[0][0] < descent[0][0])
  assert.ok(crossing.some(p => p[0] > descent[0][0] && p[1] < descent.at(-1)![1]))
  assert.ok(Math.min(...crossing.map(p => gap(p, ps[12]))) < 5)
})

test('shared audit requires the MM originals and retains private dictionary provenance', () => {
  const candidates = original.entries.map(e => ({ character: e.glyph, medians: e.medians, strokes: normalizeMedians(e.medians) }))
  const characters = [{ glyph: '藝', strokes: 19, readingGrade: '4급II' }]
  const audit = auditStrokes(characters, [], runtime, [], candidates)
  assert.equal(audit.verificationSources.dictionary, 1)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.equal(audit.playback['dictionary-crosschecked'], 1)
  assert.throws(() => auditStrokes(characters, [], runtime, candidates, []), /geometry mismatch/)
})
