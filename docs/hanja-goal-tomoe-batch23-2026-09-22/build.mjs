import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'

const root = new URL('../../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const sha = value => createHash('sha256').update(value).digest('hex')
const xml = read('public/hanja-strokes/tomoe/9950.xml')
assert.equal(sha(xml), '7b818dfc7a30f5f5cf341646c072bebe199c9da9aef53b681798560015409731')
assert.equal(sha(read('public/hanja-strokes/tomoe/README.original')), '4a3d40b2626c9ef96e8635e25be6ce45d4362dfd7aad3417608f8e66e813d44f')
assert.equal(sha(read('public/hanja-strokes/tomoe/COPYING.original')), 'a190dc9c8043755d90f8b0a75fa66b9e42d4af4c980bf5ddc633f0124db3cee7')
const proof = read('docs/hanja-goal-tomoe-batch23-2026-09-22/findings.json')
assert.equal(sha(proof), '1c6671e4e834a72d1cea1a7b267267a1028862b6066b6f8a7bc38f92ac71ccb1')
const review = JSON.parse(proof).entries.find(e => e.glyph === '饐')
assert.equal(review.decision, 'approved')
assert.equal(review.normalizedCumulativeStates, 21)
const points = [...xml.matchAll(/<stroke>([\s\S]*?)<\/stroke>/g)].map(match =>
  [...match[1].matchAll(/<point x="([^"]+)" y="([^"]+)"\s*\/>/g)].map(p => [Number(p[1]), -Number(p[2])]))
assert.equal(points.length, 21)
assert.ok(points.every(stroke => stroke.length >= 2))
const normalized = normalizeMedians(points)
assert.equal(sha(JSON.stringify(normalized)), '07e8aa75f624e8620944be909e5e3278f67ebef60e9b06273f8dfc4b7ef294ee')
const paths = review.sourceStrokeIndices.map(i => normalized[i - 1])
const dictionary = JSON.parse(read('docs/hanja-goal-tomoe-batch23-2026-09-22/metadata.json')).find(e => e.glyph === '饐').dictionary
const entry = {
  glyph: '饐', verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-22',
  geometrySource: '6f30a4f42f24dc611f1a3e4d7a220c5009bb0323f237f01f50e3be3dfefb11f8',
  geometryCorrection: 'tomoe-uniform-normalize-reviewed-order-v1',
  sourceStrokeIndices: review.sourceStrokeIndices, strokeWidth: 2.6,
  pathsSha256: sha(JSON.stringify(paths)), paths,
  sourceReference: {
    orderUrl: dictionary.url, dictionarySvgUrl: dictionary.url, dictionarySvgSha256: dictionary.sha256,
    dictionaryDirectionStrokes: Array.from({ length: 21 }, (_, i) => i + 1).join(','),
    orderReviewSha256: sha(proof), geometryReviewSha256: sha(proof), directionReviewSha256: sha(proof),
  },
  geometryLicense: {
    spdx: 'LGPL-2.1', attribution: 'Tomoe project contributors',
    url: '/hanja-strokes/tomoe/COPYING.original',
    sourceUrl: 'https://raw.githubusercontent.com/l4u/tomoe/9d054a1f490368e0d45e0aff6430ce3598ab92c5/data/handwriting-ja.xml',
    revision: '9d054a1f490368e0d45e0aff6430ce3598ab92c5',
    editableSource: '/hanja-strokes/tomoe/9950.xml',
    modifications: 'Uniform normalizeMedians; source order 1,2,3,5,6,7,4,8,9,10-21; width 2.6. No new, removed, reversed, split or merged points.',
  },
}
console.log(JSON.stringify([entry], null, 2))
