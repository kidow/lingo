import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { buildCandidate } from './candidate.mjs'

const root = new URL('../../', import.meta.url)
const json = async name => JSON.parse(await readFile(new URL(name, import.meta.url)))
const sha = value => createHash('sha256').update(value).digest('hex')
const pathHash = paths => sha(JSON.stringify(paths))
const finalHash = 'ad14e4955ce0585f21eb3481c280d47b960c44e974ded49c33f0e9ed898d38ba'
const parse = path => {
  assert.match(path, /^M\d+(?:\.\d+)? \d+(?:\.\d+)?(?: L\d+(?:\.\d+)? \d+(?:\.\d+)?)+$/)
  return [...path.matchAll(/[ML]([\d.]+) ([\d.]+)/g)].map(m => [Number(m[1]), Number(m[2])])
}
const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
const pointDistance = (p, a, b) => {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const lengthSquared = dx * dx + dy * dy
  const t = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / lengthSquared))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
const segmentDistance = (a, b, c, d) => {
  if (cross(a, b, c) * cross(a, b, d) < 0 && cross(c, d, a) * cross(c, d, b) < 0) return 0
  return Math.min(pointDistance(a, c, d), pointDistance(b, c, d), pointDistance(c, a, b), pointDistance(d, a, b))
}
const gap = (a, b) => Math.min(...a.slice(1).flatMap((v, i) => b.slice(1).map((w, k) => segmentDistance(a[i], v, b[k], w))))
function validateGeometry(paths) {
  assert.equal(paths.length, 15, '15 separate pen paths required')
  const p = paths.map(parse)
  for (const stroke of p) for (const [x, y] of stroke) assert.ok(x >= 0 && x <= 100 && y >= 0 && y <= 100)
  const [tenStart, tenEnd] = [p[9].at(-2), p[9].at(-1)]
  assert.ok(tenEnd[0] < tenStart[0] && tenEnd[1] < tenStart[1], '10 must finish left/up')
  assert.ok(p[9][2][0] > p[9][1][0] && p[9][2][1] < p[9][1][1], '10 upper traverse must go right/up')
  const [elevenStart, elevenEnd] = [p[10].at(-2), p[10].at(-1)]
  assert.ok(elevenEnd[0] < elevenStart[0] && elevenEnd[1] < elevenStart[1], '11 must finish left/up')
  assert.deepEqual(p[12].at(-1), p[13][0], '13/14 must share the reviewed turning point')
  assert.ok(p[13][1][0] > p[13][0][0] && p[13][1][1] > p[13][0][1], '14 must begin right/down')
  assert.ok(p[13].at(-1)[0] < p[13].at(-2)[0] && p[13].at(-1)[1] > p[13].at(-2)[1], '14 must finish left/down')
  assert.ok(p[14].at(-1)[0] > p[14][0][0] && p[14].at(-1)[1] < p[14].at(-2)[1], '15 rightward sweep and rising tip')
  const metrics = {
    vertical4to5: gap(p[3], p[4]),
    hook10to11: gap(p[9].slice(3), p[10]),
    end11to9: gap(p[10].slice(-2), p[8]),
    leftFall8to14: gap(p[7], p[13]),
    end14to15: Math.min(...p[14].slice(1).map((v, i) => pointDistance(p[13].at(-1), p[14][i], v))),
  }
  // At the review player's width 5, these separate centerlines must not touch.
  for (const key of ['vertical4to5', 'hook10to11', 'end11to9', 'leftFall8to14']) assert.ok(metrics[key] > 5, key)
  assert.ok(metrics.end14to15 < 5, 'walking component must join the final sweep at width 5')
  return metrics
}

const [frozen, before, original, recipe, review, sources] = await Promise.all(
  ['candidate-paths.json', 'candidate-before.json', 'originals.json', 'recipe.json', 'review.json', 'sources.json'].map(json),
)
const rebuilt = await buildCandidate()
assert.deepEqual(rebuilt, frozen)
assert.equal(pathHash(frozen.paths), finalHash)
assert.equal(review.pathsSha256, finalHash)
assert.equal(pathHash(before.paths), '662ca362725c8e8fc25508d2b6e32ddd78e513030331e32dc7a5860f59527954')
assert.equal(pathHash(original.medians), original.originalMediansSha256)
assert.deepEqual(recipe.sourceStrokeIndices, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13, 14])
assert.deepEqual(before.paths.filter((_, i) => i !== 10), frozen.paths.filter((_, i) => i !== 10))
assert.deepEqual(parse(before.paths[10]).slice(0, -1), parse(frozen.paths[10]).slice(0, -1))
assert.equal(review.strokes.length, 15)
assert.deepEqual(review.strokes.map(s => s.stroke), Array.from({ length: 15 }, (_, i) => i + 1))
assert.ok(review.strokes.every(s => s.result.startsWith('pass')))
assert.equal(review.runtimeApproved, false)
assert.equal(sources.geometry.license, 'Arphic Public License')
assert.equal(sources.directionSupplement.inlineXmlSha256, '0afbd926f88cf27d7ed1852ef8c7b2ec9544cf4489af95d1c8409f7dc42a9b16')
const metrics = validateGeometry(frozen.paths)
let negativeCases = 0
const rejected = paths => { assert.throws(() => validateGeometry(paths)); negativeCases++ }
const changed = (index, value) => frozen.paths.map((p, i) => i === index ? value : p)
rejected(before.paths)
const reverse = path => parse(path).reverse().map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
rejected(changed(9, reverse(frozen.paths[9])))
rejected([...frozen.paths.slice(0, 12), frozen.paths[12] + frozen.paths[13].replace(/^M[^L]+/, ' '), frozen.paths[14]])
rejected(changed(13, frozen.paths[13].replace('M21.8 57', 'M20.8 57')))
rejected(changed(4, frozen.paths[3]))
rejected(changed(14, reverse(frozen.paths[14])))

const unchanged = {
  'docs/hanja-g3ii-cheon-2026-09-13/review.json': '44a6eefa1dac17a7174a4c10b368aead60e39192d69ba28c984f6986d6cc3058',
  'docs/hanja-g3ii-cheon-2026-09-13/sources.json': '7513789f073dfbf6d240ba8efeb2b829d5f556c6942d69333e9a0873a35b76f3',
  'lib/hanja-strokes.ts': '19f227bbc10a7df2fdc947b22d8f2dddbe9ce61fc5074175c84037a8ac120fb7',
  'public/hanja-strokes/dictionary-reviewed.json': '692d938e3524211be4dd732b160e121388b5e6d49ed0bdd6abb1dc939ab8f1bb',
  'content/hanja/characters/g3-2.json': 'd189729116803893abb12e764d9625afbe14997dda76719106abeb28050c0a15',
}
for (const [file, expected] of Object.entries(unchanged)) assert.equal(sha(await readFile(new URL(file, root))), expected, file)
const grade = JSON.parse(await readFile(new URL('content/hanja/characters/g3-2.json', root)))
assert.equal(grade.characters.length, 500)
assert.equal(HANJA_STROKES.length, 1489)
assert.equal(grade.characters.filter(c => hanjaStrokeData(c)).length, 499)
assert.equal(hanjaStrokeData({ glyph: '遷', strokes: 15 }), null)

let live = null
if (process.argv.includes('--live')) {
  const source = sources.directionSupplement
  const response = await fetch(source.detailUrl, { signal: AbortSignal.timeout(20000) })
  assert.equal(response.status, 200)
  const html = await response.text()
  const literal = html.match(/xml\[36983\]\s*=\s*("(?:\\.|[^"\\])*")/)
  assert.ok(literal, 'official page inline XML')
  const xml = JSON.parse(literal[1])
  assert.equal(Buffer.byteLength(xml), source.inlineXmlBytes)
  assert.equal(sha(xml), source.inlineXmlSha256)
  const strokes = [...xml.matchAll(/<Stroke\b[^>]*>([\s\S]*?)<\/Stroke>/g)]
  assert.equal(strokes.length, 15)
  assert.equal(strokes.filter(s => /<Track\b/.test(s[1])).length, 15)
  const diagramResponse = await fetch(source.wholeOrderDiagramUrl, { signal: AbortSignal.timeout(20000) })
  assert.equal(diagramResponse.status, 200)
  const diagram = Buffer.from(await diagramResponse.arrayBuffer())
  assert.equal(diagram.length, source.wholeOrderDiagramBytes)
  assert.equal(sha(diagram), source.wholeOrderDiagramSha256)
  live = { exactGlyph: '遷', inlineStrokeTracks: strokes.length, sourceHashesMatched: true, externalMediaSaved: false }
}
console.log(JSON.stringify({ status: 'pass', glyph: '遷', candidateStrokes: 15, pathsSha256: finalHash, metrics, negativeCases, unchangedFiles: Object.keys(unchanged).length, runtime: { enabled: 1489, grade3ii: '499/500', cheonEnabled: false }, live }, null, 2))
