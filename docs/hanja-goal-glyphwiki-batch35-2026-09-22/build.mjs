import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { boxPaths } from '../hanja-goal-glyphwiki-batch33-2026-09-22/convert.mjs'

const root = new URL('../../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const sha = value => createHash('sha256').update(value).digest('hex')
const raw = read('public/hanja-strokes/glyphwiki/847a.json')
assert.equal(sha(raw), 'f54f57044335fb49ec3709bf64955cc96f822902fc4fdbb7e82ba71857420f75')
assert.equal(sha(read('public/hanja-strokes/glyphwiki/NOTICE-847a.md')), '71e95ba4e2d75a30ff5f495cccfdfddbe250bf97c7e8945ee058887caa0e2c9b')
const proof = read('docs/hanja-goal-glyphwiki-batch35-2026-09-22/findings.json')
assert.equal(sha(proof), '264177bdfa0cbc4a84e1f637c968ac214fc4e6bfe2b4b6b8bc125f35387691e9')
assert.equal(sha(read('docs/hanja-goal-glyphwiki-batch35-2026-09-22/geometry-semantics.json')), 'c28d276396ddc18f93957a9115a73013871fd3d8c2f32318fd31ca4b0b5322d5')
const review = JSON.parse(proof).entries.find(e => e.glyph === '葺')
assert.equal(review.decision, 'approved')
assert.equal(review.originalVisualSteps, 13)
assert.equal(review.normalizedCumulativeStates, 13)
assert.equal(review.finalFormReviewed, true)
const paths = boxPaths(JSON.parse(raw), review.groups, review.sourceStrokeIndices, { allowCurves: true, allowConnectedVerticals: true })
const dictionary = JSON.parse(read('docs/hanja-goal-glyphwiki-batch35-2026-09-22/metadata.json')).find(e => e.glyph === '葺').dictionary
console.log(JSON.stringify([{
  glyph: '葺', verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-22',
  geometrySource: sha(raw), geometryCorrection: 'glyphwiki-connected-verticals-box-reviewed-v1',
  sourceStrokeIndices: review.sourceStrokeIndices, strokeWidth: 1.5,
  pathsSha256: sha(JSON.stringify(paths)), paths,
  sourceReference: {
    orderUrl: dictionary.url, dictionarySvgUrl: dictionary.url,
    dictionarySvgSha256: dictionary.sha256,
    dictionaryDirectionStrokes: '1,2,3,4,5,6,7,8,9,10,11,12,13',
    orderReviewSha256: sha(proof), geometryReviewSha256: sha(proof), directionReviewSha256: sha(proof),
  },
  geometryLicense: {
    spdx: 'LicenseRef-GlyphWiki', attribution: 'GlyphWiki contributors',
    url: 'https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18',
    sourceUrl: 'https://glyphwiki.org/wiki/u847a-k@11',
    revision: 'u847a-k@11; u8279-k03@9; u54a0-j@2; u53e3-j@20; u8033-j@2',
    editableSource: '/hanja-strokes/glyphwiki/847a.json',
    modifications: 'Source-declared affine placement; 200-to-100 scaling; exact source-adjacent corner group6+7; reviewed group order; width1.5 preserves grass gap; connected downward ear verticals. No invented coordinates, trimming, reversal or glyph substitution.',
  },
}], null, 2))
