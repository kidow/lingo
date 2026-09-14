/** Verify this reviewed append without changing source media or application data. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { HANJA_TEXTBOOK_STROKES } from '../../lib/hanja-stroke-textbook.ts'
import { TEXTBOOK_REVIEW_REGISTRY, validateTextbookReview } from '../../scripts/hanja-stroke-textbook.ts'
import { TEXTBOOK_CORRECTIONS } from '../../scripts/hanja-stroke-textbook-corrections.ts'
import { prepare } from './prepare.mjs'

const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const sha = bytes => createHash('sha256').update(bytes).digest('hex')
const hash = value => sha(JSON.stringify(value))
const expected = [...'爵遵遲遞逮逐']
const queue = json('../hanja-g3-batch5-2026-09-15/queue.json')
const originals = json('../hanja-g3-batch5-2026-09-15/originals.json')
const oldObservations = json('../hanja-g3-batch5-2026-09-15/observations.json').records
const observations = json('./observations.json')
const review = json('./review.json'), corrections = json('./corrections.json')
const candidates = json('./candidate-paths.json'), proposals = json('./proposals.json')
const scope = json('./sources.json'), sources = json('./source-checks.json'), generated = prepare()
assert.deepEqual(observations.map(e => e.glyph), expected)
assert.deepEqual(review.records.map(e => e.glyph), expected)
assert.deepEqual(corrections.recipes.map(e => e.glyph), expected)
assert.deepEqual(candidates.characters.map(e => e.glyph), expected)
assert.deepEqual(sources.entries.map(e => e.glyph), expected)
assert.deepEqual(review.records, generated.records)
assert.deepEqual(corrections.recipes, generated.recipes)
assert.deepEqual(candidates.characters, generated.characters)
assert.equal(review.records.reduce((n, e) => n + e.expectedStrokes, 0), 87)
assert.deepEqual(scope.glyphs, expected)
let freshSourcePins = 0
for (const glyph of expected) {
  const item = queue.entries.find(e => e.glyph === glyph)
  const original = originals.find(e => e.glyph === glyph)
  const observation = observations.find(e => e.glyph === glyph)
  const record = review.records.find(e => e.glyph === glyph)
  const recipe = corrections.recipes.find(e => e.glyph === glyph)
  const candidate = candidates.characters.find(e => e.glyph === glyph)
  const source = sources.entries.find(e => e.glyph === glyph)
  assert.equal(oldObservations.find(e => e.glyph === glyph).decision, 'held')
  assert.equal(observation.decision, 'matched')
  assert.equal(observation.candidate, item.candidate)
  assert.equal(recipe.originalMediansSha256, hash(original.medians))
  assert.equal(recipe.geometrySource, queue.geometry[item.candidate].sha256)
  assert.equal(recipe.sourceVideoSha256, item.sourceVideo.sha256)
  assert.deepEqual(recipe.strokes, proposals[glyph])
  assert.equal(recipe.strokes.length, item.strokes)
  assert.equal(candidate.paths.length, item.strokes)
  assert.equal(record.candidateStrokes, original.medians.length)
  assert.deepEqual(record.sourceVideo, item.sourceVideo)
  assert.deepEqual(source.sourceVideo, item.sourceVideo)
  assert.equal(source.durationSeconds, original.durationSeconds)
  assert.equal(record.strokeEndsSeconds.length, item.strokes)
  let previousTime = 0
  for (const end of record.strokeEndsSeconds) {
    assert.ok(end > previousTime && end <= source.durationSeconds)
    previousTime = end
  }
  for (const stroke of recipe.strokes) {
    assert.ok(stroke.sourceStroke === null ||
      Number.isInteger(stroke.sourceStroke) && stroke.sourceStroke >= 1 && stroke.sourceStroke <= original.medians.length)
    if (stroke.sourceStroke === null) assert.ok(stroke.points?.length >= 2)
    for (const point of stroke.points ?? []) {
      assert.equal(point.length, 2)
      assert.ok(point.every(n => Number.isFinite(n) && n >= 0 && n <= 100))
    }
  }
  assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.find(e => e.glyph === glyph), record)
  assert.deepEqual(TEXTBOOK_CORRECTIONS.find(e => e.id === recipe.id), recipe)
  const entry = HANJA_TEXTBOOK_STROKES.find(e => e.glyph === glyph)
  assert.ok(entry)
  const { verificationSource, ...published } = entry
  assert.equal(verificationSource, queue.publisher.id)
  assert.deepEqual(published, candidate)
  assert.equal(hash(candidate.paths), record.pathsSha256)
  assert.equal(HANJA_STROKES.filter(e => e.glyph === glyph).length, 1)
  validateTextbookReview(entry, item.strokes)
  if (process.argv.includes('--fresh')) {
    const response = await fetch(item.sourceVideo.url)
    assert.ok(response.ok, glyph + ' publisher fetch failed')
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(bytes.length, item.sourceVideo.bytes)
    assert.equal(sha(bytes), item.sourceVideo.sha256)
    freshSourcePins++
  }
}
// Fixed mappings capture the whole-glyph review, including omitted dots and new strokes.
const sourceMappings = {
  "爵": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    null,
    null,
    15,
    16,
    17
  ],
  "遵": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    14,
    15
  ],
  "遲": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    15,
    15,
    16
  ],
  "遞": [
    1,
    2,
    3,
    4,
    6,
    5,
    7,
    8,
    9,
    10,
    11,
    13,
    13,
    14
  ],
  "逮": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    10,
    11
  ],
  "逐": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    9,
    10
  ]
}
const omittedOriginals = { 爵: [14], 遵: [], 遲: [14], 遞: [12], 逮: [], 逐: [] }
for (const glyph of expected) {
  const strokes = proposals[glyph]
  assert.deepEqual(strokes.map(s => s.sourceStroke), sourceMappings[glyph])
  const used = new Set(strokes.map(s => s.sourceStroke))
  const originalCount = originals.find(e => e.glyph === glyph).medians.length
  assert.deepEqual(Array.from({ length: originalCount }, (_, i) => i + 1).filter(n => !used.has(n)), omittedOriginals[glyph])
  for (const s of strokes) {
    if (s.sourceStroke === null || strokes.filter(t => t.sourceStroke === s.sourceStroke).length > 1)
      assert.ok(s.points?.length >= 2, glyph + ' authored or split stroke requires explicit points')
  }
}
assert.equal(Object.values(proposals).flat().filter(s => s.sourceStroke === null).length, 2)
for (const index of [13, 14]) {
  const points = proposals['爵'][index].points
  assert.equal(proposals['爵'][index].sourceStroke, null)
  assert.ok(points.at(-1)[0] > points[0][0], '爵 added horizontals run left to right')
  assert.ok(Math.max(...points.map(p => p[1])) - Math.min(...points.map(p => p[1])) < 3)
}
for (const [glyph, leftIndex, rightIndex] of [['遵',13,14],['遲',13,14],['遞',11,12],['逮',9,10],['逐',8,9]]) {
  const left = proposals[glyph][leftIndex], right = proposals[glyph][rightIndex]
  assert.equal(left.sourceStroke, right.sourceStroke)
  assert.deepEqual(left.points.at(-1), right.points[0], glyph + ' split has continuous geometry but separate animation stages')
  assert.ok(right.points.at(-1)[1] > right.points[0][1], glyph + ' second stage descends')
}
assert.ok(proposals['遵'][0].points.at(-1)[0] < proposals['遵'][0].points[0][0])
assert.ok(proposals['遵'][1].points.at(-1)[0] > proposals['遵'][1].points[0][0])
assert.ok(proposals['逐'][5].points.every((p, i, all) => i === 0 || p[1] >= all[i - 1][1]), '逐 falling stroke must not start upward')
assert.deepEqual(sourceMappings['遞'].slice(0, 6), [1, 2, 3, 4, 6, 5], '遞 roof precedes inner falling stroke')
// Preserve visible gaps with the production path width (5), rather than checking count alone.
const distanceToPath = (point, points) => Math.min(...points.slice(1).map((b, i) => {
  const a = points[i], dx = b[0] - a[0], dy = b[1] - a[1]
  const denominator = dx * dx + dy * dy
  const t = denominator ? Math.max(0, Math.min(1, ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / denominator)) : 0
  return Math.hypot(point[0] - a[0] - t * dx, point[1] - a[1] - t * dy)
}))
const pointsFor = (glyph, index) => {
  const stroke = proposals[glyph][index]
  if (stroke.points) return stroke.points
  return candidates.characters.find(e => e.glyph === glyph).paths[index].match(/-?\d+(?:\.\d+)?/g)
    .map(Number).reduce((all, n, i, numbers) => { if (i % 2 === 0) all.push([n, numbers[i + 1]]); return all }, [])
}
for (const [glyph, stroke, endpoint, other] of [
  ['爵',9,-1,13], ['遵',5,-1,7], ['遵',11,-1,10],
  ['遲',11,0,3], ['遲',11,-1,15],
  ['遞',7,0,4], ['遞',9,0,7],
  ['逮',4,-1,5], ['逮',6,0,2], ['逮',7,0,6],
]) {
  assert.ok(distanceToPath(pointsFor(glyph, stroke).at(endpoint), pointsFor(glyph, other)) > 5,
    glyph + ' reviewed gap was lost between output strokes ' + (stroke + 1) + ' and ' + (other + 1))
}
for (const [file, before] of Object.entries(json('./baseline.json'))) {
  assert.equal(hash(json('../../' + file)[before.key].slice(0, before.count)), before.prefixSha256)
}
const catalog = json('../../content/hanja/characters/g3.json').characters
const applied = new Set(HANJA_STROKES.map(e => e.glyph))
const grade3Applied = catalog.filter(e => applied.has(e.glyph)).length
console.log(JSON.stringify({
  result: 'pass', reviewedCharacters: 6, reviewedStrokes: 87,
  addedCharacters: 6, addedStrokes: 87, corrections: 6, heldCharacters: 0,
  runtime: applied.size, remaining: 5978 - applied.size,
  grade3Applied, grade3Remaining: catalog.length - grade3Applied,
  existingPrefixesPreserved: true, freshSourcePins, proprietaryAssetsSaved: 0,
}))
