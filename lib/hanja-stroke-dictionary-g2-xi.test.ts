import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_XI_STROKES, G2_XI_DICTIONARY_GEOMETRY, loadG2XiDictionaryBundle } from './hanja-stroke-dictionary-g2-xi.ts'
import { buildG2XiDictionaryBundle, G2_XI_DICTIONARY_PROOF_PINS, validateG2XiDictionaryProofs, validateG2XiDictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-xi.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-xi-2026-09-16/'
const original = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; medians: number[][][]; paths: string[] }[]
}).entries[0]
const entry = HANJA_DICTIONARY_G2_XI_STROKES[0]
const points = (n: number) => [...entry.paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
const distanceTo = (p: number[], path: number[][]) => Math.min(...path.slice(1).map((b, i) => {
  const a = path[i], dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}))

test('熙 has fourteen playable licensed strokes with dictionary provenance and preserved source count', () => {
  validateG2XiDictionaryBundle()
  assert.equal(HANJA_DICTIONARY_G2_XI_STROKES.length, 1)
  assert.equal(entry.paths.length, 14)
  assert.equal(entry.geometrySource, G2_XI_DICTIONARY_GEOMETRY.MM.sha256)
  assert.equal(entry.verificationSource, 'ehanja-crosschecked')
  assert.deepEqual(dictionaryGeometry('熙', original.medians).paths, entry.paths)
  assert.deepEqual(hanjaStrokeData(original), entry)
  assert.equal(hanjaStrokeData({ glyph: '熙', strokes: 13 }), null)
  assert.equal(hanjaStrokeData({ glyph: '熙', strokes: 15 }), null)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  validateDictionaryReview(entry, 14)
  const catalog = (JSON.parse(read('content/hanja/characters/g2.json')) as {
    characters: { glyph: string; strokes: number; readingGrade: string; sourceGlyph?: string; sourceStrokes?: number }[]
  }).characters.find(c => c.glyph === '熙')!
  assert.deepEqual([catalog.strokes, catalog.sourceGlyph, catalog.sourceStrokes], [14, '煕', 13])
  const candidates = [{ character: '熙', medians: original.medians, strokes: original.paths }]
  const audit = auditStrokes([catalog], [], HANJA_DICTIONARY_G2_XI_STROKES, [], candidates)
  assert.equal(audit.verificationSources.dictionary, 1)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes([catalog], [], HANJA_DICTIONARY_G2_XI_STROKES, candidates, []), /geometry mismatch/)
})

test('the two corrected turns descend to the closing bars without leftward curled terminals', () => {
  assert.deepEqual(entry.sourceStrokeIndices, [1, 2, 3, null, 5, 6, 7, null, 9, 10, 11, 12, 13, 14])
  for (let i = 0; i < 14; i++) {
    if ([3, 7].includes(i)) assert.notEqual(entry.paths[i], original.paths[i])
    else assert.equal(entry.paths[i], original.paths[i])
  }
  for (const [n, bar] of [[4, 5], [8, 9]]) {
    const p = points(n), end = p.at(-1)!
    assert.ok(end[1] > p[0][1])
    assert.ok(Math.max(...p.map(q => q[0])) - end[0] < 2, 'No curled-left terminal')
    assert.ok(distanceTo(end, points(bar)) < 0.1, 'Right side meets closing bar')
  }
  const l = points(7), hook = points(10)
  assert.ok(l.at(-1)![0] > l[0][0] && l.at(-1)![1] > l[0][1])
  assert.ok(hook.at(-1)![1] < Math.max(...hook.map(p => p[1])) - 10)
  assert.ok(points(11).at(-1)![0] < points(11)[0][0])
  for (const n of [12, 13, 14]) assert.ok(points(n).at(-1)![0] > points(n)[0][0])
  for (const n of [11, 12, 13, 14])
    assert.ok(points(n).every(p => [7, 10].every(top => distanceTo(p, points(top)) > 5)))
  const reverted = structuredClone(entry)
  reverted.paths = original.paths
  assert.throws(() => validateDictionaryReview(reverted, 14), /published entry/)
})

test('incomplete source evidence, changed geometry and relabeled bundles cannot pass publication', () => {
  for (const file of Object.keys(G2_XI_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2XiDictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const source = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    svg: { title: string; animated: number; clipCoverageValid: boolean }; strokes: { delay: number; duration: number }[]
  }[] }
  assert.equal(source.entries[0].svg.title, '熙')
  assert.equal(source.entries[0].svg.animated, 14)
  assert.equal(source.entries[0].svg.clipCoverageValid, true)
  assert.equal(source.entries[0].strokes.length, 14)
  for (const [i, stroke] of source.entries[0].strokes.entries()) {
    assert.ok(stroke.duration > 0)
    if (i) assert.ok(stroke.delay >= source.entries[0].strokes[i - 1].delay + source.entries[0].strokes[i - 1].duration)
  }
  const malformed = structuredClone(buildG2XiDictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2XiDictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG2XiDictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG2XiDictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG2XiDictionaryBundle([]), /published bundle/)
})
