import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'

const read = async path => JSON.parse(await readFile(new URL(path, import.meta.url)))
const sources = await read('sources.json'), review = await read('review.json')
assert.equal(sources.glyph, '遷')
assert.equal(sources.catalogStrokes, 15)
assert.equal(review.glyph, sources.glyph)
assert.equal(review.strokes, 15)
const sequence = Array.from({ length: 15 }, (_, i) => i + 1)
assert.deepEqual(review.orderReviewedStrokes, sequence)
assert.deepEqual(review.observations.map(row => row.stroke), sequence)
assert.deepEqual(Object.fromEntries(['upper', 'middle', 'inner', 'walk'].map(component => [component, review.observations.filter(row => row.component === component).length])), { upper: 6, middle: 3, inner: 2, walk: 4 })
assert.equal(review.runtimeApproved, false)
assert.equal(review.wholeCandidateGeometryReviewed, false)
assert.equal(review.runtimeAdditions, 0)
assert.deepEqual(review.motionDirectionReviewedStrokes, [])
assert.deepEqual(review.videoObservations.map(row => row.seconds), [12.1, 13, 15.1, 17.7, 18.1, 18.5, 18.9, 21.9])
assert.deepEqual(sources.assets.map(row => row.id), ['moya-sequence', 'moya-numbered', 'vivasam-video'])
for (const row of sources.assets) {
  assert.match(row.sha256, /^[a-f0-9]{64}$/)
  assert.ok(row.bytes > 0)
  assert.equal(new URL(row.url).protocol, 'https:')
}
assert.ok(sources.assets.some(row => row.id === review.orderSource))
assert.ok(sources.assets.some(row => row.id === review.boundarySource))
const pins = {
  'docs/hanja-g3ii-batch9-2026-09-12/review-a.json': '5fff7a9cbcaa97c061dab0e391a50d6787d8164516e22a6cba278cdc2d54aeaf',
  'docs/hanja-g3ii-dictionary-12-2026-09-13/review.json': 'a03a988581ae438f9db5e08fe6846854f0d343b1b2f2d89552a70a39b7409314',
  'content/hanja/characters/g3-2.json': 'd189729116803893abb12e764d9625afbe14997dda76719106abeb28050c0a15',
  'public/hanja/u9077.svg': '5305c4cb5d9410e3b239556112ed1b44753b4b5f70179a1f566026637dba3ac0',
  'lib/hanja-strokes.ts': '19f227bbc10a7df2fdc947b22d8f2dddbe9ce61fc5074175c84037a8ac120fb7',
  'public/hanja-strokes/dictionary-reviewed.json': '692d938e3524211be4dd732b160e121388b5e6d49ed0bdd6abb1dc939ab8f1bb',
}
for (const [path, expected] of Object.entries(pins)) {
  const bytes = await readFile(new URL(`../../${path}`, import.meta.url))
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expected, path)
}
const catalog = await read('../../content/hanja/characters/g3-2.json')
const cheon = catalog.characters.find(row => row.glyph === '遷')
assert.equal(cheon.strokes, 15)
assert.equal(cheon.readingGrade, '3급II')
assert.equal(cheon.sourceRow, 4797)
assert.equal(hanjaStrokeData(cheon), null)
const all = []
for (const filename of await readdir(new URL('../../content/hanja/characters/', import.meta.url))) {
  if (!filename.endsWith('.json')) continue
  all.push(...(await read(`../../content/hanja/characters/${filename}`)).characters)
}
const playable = all.filter(row => hanjaStrokeData(row)).length
const g3iiPlayable = catalog.characters.filter(row => hanjaStrokeData(row)).length
assert.equal(all.length, 5978)
assert.equal(playable, 1489)
assert.equal(g3iiPlayable, 499)
console.log(JSON.stringify({ glyph: '遷', sourceOrderStages: 15, wholeMotionDirectionsApproved: 0, runtimeAdditions: 0, priorPins: Object.keys(pins).length, playable, total: all.length, remaining: all.length - playable, g3iiPlayable, g3iiTotal: catalog.characters.length, result: 'passed' }, null, 2))
