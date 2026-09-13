import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'

const root = new URL('../../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const sha = value => createHash('sha256').update(value).digest('hex')
const hash = value => sha(JSON.stringify(value))
const dir = 'docs/hanja-g3ii-gyeol-mun-2026-09-13/'
const pins = {
  'docs/hanja-g3ii-crosscheck-63-2026-09-13/review-a.json': 'ab877fcc6bcb0d24f78b0bfaa4890b1da76e7e1edb131f1bfa1f105462b5cd16',
  'docs/hanja-g3ii-crosscheck-63-2026-09-13/source-matrix.json': 'd278ec44ac5c0f3535fa0b91ce69446b9aad375ad1ac1094d0b58952155233ee',
  'docs/hanja-g3ii-missing-17-2026-09-13/research-provenance.json': 'fbd7dcdd659bacd098b80849e57e4743dc7dc0b4302c2be63bebf889d0833a46',
  [dir + 'originals.json']: '1af04d53757249d03adfed126e40659ba96d82046213a179eb8594d607380d84',
  [dir + 'donors.json']: 'b83dbee67088e4b0163672f171453355b899e266ec83d27e8036ade902eb35bf',
}
for (const [path, expected] of Object.entries(pins)) assert.equal(sha(read(path)), expected, path)
const originals = JSON.parse(read(dir + 'originals.json'))
const donors = JSON.parse(read(dir + 'donors.json'))
const inventory = JSON.parse(read('docs/hanja-g3ii-crosscheck-63-2026-09-13/candidate-inventory.json'))
for (const source of originals) {
  const sourcePin = inventory.sources.find(s => s.name === source.name)
  assert.equal(source.url, sourcePin.url)
  assert.equal(source.sha256, sourcePin.sha256)
  for (const entry of source.entries) {
    const pin = sourcePin.characters.find(c => c.glyph === entry.glyph)
    assert.equal(hash(entry.medians), pin.originalMediansSha256)
    assert.equal(hash(normalizeMedians(entry.medians)), pin.normalizedPathsSha256)
  }
}
for (const { hash: expected, ...snapshot } of donors) {
  assert.equal(hash(snapshot), expected)
  assert.equal(hash(HANJA_STROKES.find(d => d.glyph === snapshot.glyph)), expected)
}
const points = path => {
  assert.match(path, /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/)
  return [...path.matchAll(/[ML]([-.\d]+) ([-.\d]+)/g)].map(m => [+m[1], +m[2]])
}
const bounds = paths => {
  const p = paths.flatMap(points)
  return [Math.min(...p.map(p => p[0])), Math.min(...p.map(p => p[1])), Math.max(...p.map(p => p[0])), Math.max(...p.map(p => p[1]))]
}
const round = n => Math.round(n * 10) / 10
const original = (glyph, source = 'MM') => normalizeMedians(originals.find(s => s.name === source).entries.find(e => e.glyph === glyph).medians)
const mmMun = original('紋')
const hong = donors.find(d => d.glyph === '紅')
const from = bounds(hong.paths.slice(0, 6)), to = bounds(mmMun.slice(0, 6))
const affine = {
  scaleX: (to[2] - to[0]) / (from[2] - from[0]),
  scaleY: (to[3] - to[1]) / (from[3] - from[1]),
  translateX: to[0] - from[0] * (to[2] - to[0]) / (from[2] - from[0]),
  translateY: to[1] - from[1] * (to[3] - to[1]) / (from[3] - from[1]),
}
const transform = path => points(path).map(([x, y], i) =>
  (i ? 'L' : 'M') + round(x * affine.scaleX + affine.translateX) + ' ' + round(y * affine.scaleY + affine.translateY),
).join(' ')
const munPaths = mmMun.map((p, i) => i === 3 || i === 4 ? transform(hong.paths[i]) : p)
const entries = [
  { glyph: '訣', strokes: 11, candidateSource: 'MM', paths: original('訣'), changedStrokes: [], sourceStrokeIndices: Array.from({ length: 11 }, (_, i) => i + 1), borrowedStrokes: [], sameGlyphDirectionPending: [11] },
  { glyph: '紋', strokes: 10, candidateSource: 'MM with reviewed 紅 strokes 4 and 5', paths: munPaths, changedStrokes: [4, 5], sourceStrokeIndices: [1, 2, 3, null, null, 6, 7, 8, 9, 10], borrowedStrokes: [{ targetStroke: 4, donorGlyph: '紅', donorStroke: 4 }, { targetStroke: 5, donorGlyph: '紅', donorStroke: 5 }], sameGlyphDirectionPending: [4, 5] },
].map(entry => ({ ...entry, pathsSha256: hash(entry.paths), runtimeApproved: false }))
const candidate = { schemaVersion: 1, date: '2026-09-13', scope: 'Review candidates only; component analogy is not direct evidence for the target character', strokeWidth: 5, transform: { fromGlyph: '紅', fromBounds: from, toGlyph: '紋', toBounds: to, affine, rounding: 'nearest 0.1 after affine mapping' }, entries }

const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
const projectionDistance = (p, a, b) => {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
const segmentDistance = (a, b, c, d) => {
  const straddles = cross(a, b, c) * cross(a, b, d) <= 0 && cross(c, d, a) * cross(c, d, b) <= 0
  const overlaps = [0, 1].every(i => Math.max(Math.min(a[i], b[i]), Math.min(c[i], d[i])) <= Math.min(Math.max(a[i], b[i]), Math.max(c[i], d[i])))
  return straddles && overlaps ? 0 : Math.min(projectionDistance(a, c, d), projectionDistance(b, c, d), projectionDistance(c, a, b), projectionDistance(d, a, b))
}
const distance = (a, b) => {
  const p = points(a), q = points(b)
  return Math.min(...p.slice(1).flatMap((end, i) => q.slice(1).map((other, j) => segmentDistance(p[i], end, q[j], other))))
}
const audit = entries.map(entry => {
  const before = original(entry.glyph), after = entry.paths
  const changed = after.flatMap((p, i) => p === before[i] ? [] : [i + 1])
  assert.deepEqual(changed, entry.changedStrokes)
  assert.equal(after.length, entry.strokes)
  for (const p of after) for (const [x, y] of points(p)) assert.ok(Number.isFinite(x + y) && x >= 0 && x <= 100 && y >= 0 && y <= 100)
  const pairChanges = []
  for (let i = 0; i < after.length; i++) for (let j = i + 1; j < after.length; j++) {
    const b = distance(before[i], before[j]), a = distance(after[i], after[j])
    if (Math.abs(a - b) > 1e-9) pairChanges.push({ strokes: [i + 1, j + 1], before: +b.toFixed(6), after: +a.toFixed(6), contactBefore: b <= 5, contactAfter: a <= 5 })
  }
  return { glyph: entry.glyph, strokes: entry.strokes, changedStrokes: changed, comparedStrokePairs: after.length * (after.length - 1) / 2, pairChanges, changedContacts: pairChanges.filter(p => p.contactBefore !== p.contactAfter), pathsSha256: entry.pathsSha256 }
})
assert.equal(distance(munPaths[1], munPaths[3]) <= 5, true, 'central stroke meets upper thread component')
assert.ok(distance(munPaths[3], munPaths[4]) > 5, 'left stroke remains separate')
assert.ok(distance(munPaths[3], munPaths[5]) > 5, 'right dot remains separate')
assert.ok(points(munPaths[3]).at(-1)[1] - points(munPaths[3])[0][1] > 20, 'central stroke is long and downward')
assert.ok(points(munPaths[4]).at(-1)[0] < points(munPaths[4])[0][0], 'left stroke retains the donor left-falling direction')
assert.ok(distance(entries[0].paths[9], entries[0].paths[10]) <= 5, '訣 long right-falling stroke meets the descending stroke')
assert.deepEqual(audit.flatMap(a => a.changedContacts.map(p => ({ glyph: a.glyph, strokes: p.strokes, contactBefore: p.contactBefore, contactAfter: p.contactAfter }))), [
  { glyph: '紋', strokes: [2, 4], contactBefore: false, contactAfter: true },
], 'only the intended upper-thread / central-stem connection changes')
assert.ok(affine.scaleX > 0 && affine.scaleY > 0, 'donor mapping must not reflect or reverse the stroke')
for (const entry of entries) assert.equal(HANJA_STROKES.some(d => d.glyph === entry.glyph), false, 'candidate must remain outside runtime: ' + entry.glyph)
if (process.argv[2] === '--candidate') {
  console.log(JSON.stringify(candidate))
} else {
  assert.deepEqual(JSON.parse(read(dir + 'candidate-paths.json')), candidate)
  console.log(JSON.stringify({ status: 'passed', sourcePins: Object.keys(pins).length, originalCandidates: 4, originalStrokes: 42, reviewedCandidateStrokes: 21, changedStrokes: 2, sameGlyphDirectionPending: 3, newRuntimeApprovals: 0, runtimeCharacters: HANJA_STROKES.length, audit }, null, 2))
}
