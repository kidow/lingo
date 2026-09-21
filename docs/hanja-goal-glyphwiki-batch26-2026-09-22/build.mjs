import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { kagePaths } from './convert.mjs'

const root = new URL('../../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const sha = value => createHash('sha256').update(value).digest('hex')
const raw = read('public/hanja-strokes/glyphwiki/82a5.json')
assert.equal(sha(raw), '147de57b3713c23a721c007db8fbcf88449b671e46465862aa3e6f557a7bffa1')
assert.equal(sha(read('public/hanja-strokes/glyphwiki/NOTICE.md')), '5cc446fbd34f348b5330f76f51a85b45c7898bc052e7a3fd27cc008ffddc3231')
const proof = read('docs/hanja-goal-glyphwiki-batch26-2026-09-22/findings.json')
assert.equal(sha(proof), 'c26d9d239d305db1f99ece025961ae81f75b6db791d84846f1f4cae491b38dff')
const review = JSON.parse(proof).entries.find(e => e.glyph === '芥')
assert.equal(review.decision, 'approved')
assert.equal(review.originalVisualSteps, 8)
assert.equal(review.normalizedCumulativeStates, 8)
assert.equal(review.finalFormReviewed, true)
const paths = kagePaths(JSON.parse(raw), review.sourceStrokeIndices)
const dictionary = JSON.parse(read('docs/hanja-goal-glyphwiki-batch26-2026-09-22/metadata.json')).find(e => e.glyph === '芥').dictionary
console.log(JSON.stringify([{
  glyph: '芥', verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-22',
  geometrySource: sha(raw), geometryCorrection: 'glyphwiki-declared-affine-reviewed-order-v1',
  sourceStrokeIndices: review.sourceStrokeIndices, strokeWidth: 4,
  pathsSha256: sha(JSON.stringify(paths)), paths,
  sourceReference: {
    orderUrl: dictionary.url, dictionarySvgUrl: dictionary.url,
    dictionarySvgSha256: dictionary.sha256,
    dictionaryDirectionStrokes: '1,2,3,4,5,6,7,8',
    orderReviewSha256: sha(proof), geometryReviewSha256: sha(proof), directionReviewSha256: sha(proof),
  },
  geometryLicense: {
    spdx: 'LicenseRef-GlyphWiki', attribution: 'GlyphWiki contributors',
    url: 'https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18',
    sourceUrl: 'https://glyphwiki.org/wiki/u82a5-k@11',
    revision: 'u82a5-k@11; koseki-343300@11; ufa5e-03@8; u4ecb-j@3; u201a2-03@2',
    editableSource: '/hanja-strokes/glyphwiki/82a5.json',
    modifications: 'Source-declared affine placement; 200-to-100 scaling; swap3/4; width4. No new points, splitting, joining or reversal.',
  },
}], null, 2))
