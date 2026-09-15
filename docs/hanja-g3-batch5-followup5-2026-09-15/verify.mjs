/** Verify the authored whole-glyph approval without changing assets or registries. */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { HANJA_TEXTBOOK_STROKES } from '../../lib/hanja-stroke-textbook.ts'
import { TEXTBOOK_REVIEW_REGISTRY, validateTextbookReview } from '../../scripts/hanja-stroke-textbook.ts'
import { TEXTBOOK_AUTHORED, textbookAuthoredSha256, validateTextbookAuthored } from '../../scripts/hanja-stroke-textbook-authored.ts'
import { prepare } from './prepare.mjs'
const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const sha = value => createHash('sha256').update(value).digest('hex')
const hash = value => sha(JSON.stringify(value))
const scope = json('./sources.json'), observation = json('./observations.json')
const source = json('./source-checks.json'), proposals = json('./proposals.json')['玆']
const review = json('./review.json'), authored = json('./authored.json')
const candidates = json('./candidate-paths.json'), search = json('./candidate-search.json')
const generated = prepare(), item = scope.entries[0]
assert.deepEqual(scope.glyphs, ['玆'])
assert.deepEqual(scope.glyphs, json('../hanja-g3-batch5-followup4-2026-09-15/next-batch.json').glyphs)
assert.equal(scope.status, 'review-complete')
assert.equal(item.glyph.codePointAt(0), 0x7386)
assert.equal(item.manifest.glyph, '玆')
assert.equal(item.manifest.manifestRow, '1223')
assert.equal(item.strokes, 10)
assert.deepEqual(item.candidateCounts, { MM: null, Ja: null, Ko: null })
assert.deepEqual(review.records, generated.records)
assert.deepEqual(authored.entries, generated.entries)
assert.deepEqual(candidates.characters, generated.characters)
assert.deepEqual(candidates.geometrySources, generated.geometrySources)
assert.equal(observation.decision, 'matched')
assert.deepEqual(observation.sourceVideo, item.sourceVideo)
assert.deepEqual(source.sourceVideo, item.sourceVideo)
assert.equal(source.durationSeconds, observation.durationSeconds)
assert.equal(source.videoSha256Verified, true)
assert.equal(source.proprietaryAssetsSaved, 0)
const entry = authored.entries[0], record = review.records[0]
assert.equal(entry.paths.length, 10)
assert.deepEqual(entry.authoredPathIndices, [1,2,3,4,5,6,7,8,9,10])
assert.deepEqual(entry.borrowedParts, [])
assert.equal(validateTextbookAuthored(entry, []), entry)
assert.equal(entry.sourceVideoSha256, item.sourceVideo.sha256)
assert.equal(entry.pathsSha256, hash(entry.paths))
assert.equal(record.geometrySource, textbookAuthoredSha256(entry))
assert.equal(record.geometryAuthored, entry.id)
assert.equal(record.geometryCorrection, undefined)
assert.equal(record.candidateStrokes, 10)
assert.equal(record.expectedStrokes, 10)
assert.equal(record.strokeEndsSeconds.length, 10)
let previous = 0
for (const end of record.strokeEndsSeconds) {
  assert.ok(end > previous && end <= observation.durationSeconds)
  previous = end
}
assert.equal(proposals.length, 10)
for (const points of proposals) {
  assert.ok(points.length >= 2)
  assert.ok(points.every(p => p.length === 2 && p.every(n => Number.isFinite(n) && n >= 0 && n <= 100)))
}
for (const index of [0, 4, 5, 9]) {
  const p = proposals[index]
  assert.ok(p.at(-1)[0] > p[0][0] && p.at(-1)[1] > p[0][1], 'dot and terminal descend right')
}
for (const index of [1, 6]) {
  const p = proposals[index]
  assert.ok(p.at(-1)[0] > p[0][0] && p.at(-1)[1] < p[0][1], 'bar travels right')
}
for (const index of [2, 3, 7, 8]) {
  const p = proposals[index], left = Math.min(...p.map(q => q[0]))
  assert.ok(left < p[0][0] && p.at(-1)[0] > left, 'independent stroke descends left then turns right')
  assert.ok(p.at(-1)[1] > p[0][1])
}
const distance = (point, path) => Math.min(...path.slice(1).map((b, i) => {
  const a = path[i], dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / (dx * dx + dy * dy)))
  return Math.hypot(point[0] - a[0] - t * dx, point[1] - a[1] - t * dy)
}))
// Contacts observed in the source, including the corrected output-8 short foot.
for (const [stroke, endpoint, other] of [[2,0,1],[2,-1,3],[3,-1,4],[7,0,6],[7,-1,8],[8,-1,9]])
  assert.ok(distance(proposals[stroke].at(endpoint), proposals[other]) < 5, 'reviewed contact must remain')
for (const [stroke, endpoint, other] of [[0,-1,1],[5,-1,6],[1,-1,6]])
  assert.ok(distance(proposals[stroke].at(endpoint), proposals[other]) > 5, 'reviewed dot/bar gap must remain')
for (const check of search.checks) {
  assert.equal(check.status, 200)
  assert.equal(check.truncated, false)
  assert.deepEqual(check.matchingFiles, [])
  assert.match(check.sha, /^[a-f0-9]{40}$/)
}
assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.filter(e => e.glyph === '玆'), [record])
assert.deepEqual(TEXTBOOK_AUTHORED.filter(e => e.glyph === '玆'), [entry])
const runtime = HANJA_TEXTBOOK_STROKES.find(e => e.glyph === '玆')
assert.ok(runtime)
const { verificationSource, ...published } = runtime
assert.equal(verificationSource, 'vivasam-high-2022')
assert.deepEqual(published, candidates.characters[0])
assert.deepEqual(runtime.sourceStrokeIndices, Array(10).fill(null))
assert.equal(HANJA_STROKES.filter(e => e.glyph === '玆').length, 1)
validateTextbookReview(runtime, 10)
assert.throws(() => validateTextbookReview({ ...runtime, sourceStrokeIndices: [1,2,3,4,5,1,2,3,4,5] }, 10), /provenance mismatch/)
assert.throws(() => validateTextbookReview({ ...runtime, geometryAuthored: undefined }, 10), /provenance mismatch/)
const changedPaths = runtime.paths.map((p, i) => i === 7 ? 'M54 54 L60 53' : p)
assert.throws(() => validateTextbookReview({ ...runtime, paths: changedPaths, pathsSha256: hash(changedPaths) }, 10), /provenance mismatch/)
const bundle = json('../../public/hanja-strokes/textbook-reviewed.json')
assert.deepEqual(bundle.geometrySources.filter(e => e.glyph === '玆'), candidates.geometrySources)
assert.equal(candidates.geometrySources[0].kind, 'local-authored')
assert.deepEqual(candidates.geometrySources[0].donorSources, [])
for (const [key, before] of Object.entries(json('./baseline.json'))) {
  const file = key.slice(0, key.lastIndexOf('#'))
  assert.equal(hash(json('../../' + file)[before.key].slice(0, before.count)), before.prefixSha256)
}
let freshSourcePins = 0
if (process.argv.includes('--fresh')) {
  const response = await fetch(item.sourceVideo.url)
  assert.ok(response.ok)
  const bytes = Buffer.from(await response.arrayBuffer())
  assert.equal(bytes.length, item.sourceVideo.bytes)
  assert.equal(sha(bytes), item.sourceVideo.sha256)
  freshSourcePins++
}
const catalog = json('../../content/hanja/characters/g3.json').characters
const applied = new Set(HANJA_STROKES.map(e => e.glyph))
const grade3Applied = catalog.filter(e => applied.has(e.glyph)).length
const next = json('./next-batch.json')
assert.equal(next.characters, 50)
assert.equal(next.strokes, 547)
assert.deepEqual(next.glyphs, next.entries.map(e => e.glyph))
assert.equal(new Set(next.glyphs).size, 50)
assert.equal(next.entries.reduce((n, e) => n + e.strokes, 0), 547)
console.log(JSON.stringify({
  result: 'pass', reviewedCharacters: 1, reviewedStrokes: 10,
  addedCharacters: 1, addedStrokes: 10, locallyAuthoredStrokes: 10,
  borrowedStrokes: 0, heldCharacters: 0,
  runtime: applied.size, remaining: 5978 - applied.size,
  grade3Applied, grade3Remaining: catalog.length - grade3Applied,
  existingPrefixesPreserved: true, freshSourcePins, proprietaryAssetsSaved: 0,
}))
