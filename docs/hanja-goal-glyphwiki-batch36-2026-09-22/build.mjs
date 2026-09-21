import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { boxPaths } from '../hanja-goal-glyphwiki-batch33-2026-09-22/convert.mjs'

const root = new URL('../../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const sha = value => createHash('sha256').update(value).digest('hex')
const raw = read('public/hanja-strokes/glyphwiki/8403.json')
assert.equal(sha(raw), '40a4dbb2a790cf2bbfdcab1fdd4f7c4d07c8b0181ffb6e911a9c3605ab844b95')
assert.equal(sha(read('public/hanja-strokes/glyphwiki/NOTICE-8403.md')), '9c4ef1756642cc0723dcf8509f4336a70d152b7e028d9655ed780a1def2d891e')
const proof = read('docs/hanja-goal-glyphwiki-batch36-2026-09-22/findings.json')
assert.equal(sha(proof), 'e5cc4b5ccc8ee031ab5965e7cdf256b5403e0c78884df2721d9bf003c0594656')
assert.equal(sha(read('docs/hanja-goal-glyphwiki-batch36-2026-09-22/geometry-semantics.json')), '7486bb430554d3ddb07fb41ad1001fa2b3170904aef85bf9ac62ee2687f76ae6')
const review = JSON.parse(proof).entries.find(e => e.glyph === '萃')
assert.equal(review.decision, 'approved')
assert.equal(review.originalVisualSteps, 12)
assert.equal(review.normalizedCumulativeStates, 12)
assert.equal(review.finalFormReviewed, true)
const paths = boxPaths(JSON.parse(raw), review.groups, review.sourceStrokeIndices, { allowCurves: true })
const dictionary = JSON.parse(read('docs/hanja-goal-glyphwiki-batch36-2026-09-22/metadata.json')).find(e => e.glyph === '萃').dictionary
console.log(JSON.stringify([{
  glyph: '萃', verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-22',
  geometrySource: sha(raw), geometryCorrection: 'glyphwiki-whole-quadratics-reviewed-v1',
  sourceStrokeIndices: review.sourceStrokeIndices, strokeWidth: 2,
  pathsSha256: sha(JSON.stringify(paths)), paths,
  sourceReference: {
    orderUrl: dictionary.url, dictionarySvgUrl: dictionary.url,
    dictionarySvgSha256: dictionary.sha256,
    dictionaryDirectionStrokes: '1,2,3,4,5,6,7,8,9,10,11,12',
    orderReviewSha256: sha(proof), geometryReviewSha256: sha(proof), directionReviewSha256: sha(proof),
  },
  geometryLicense: {
    spdx: 'LicenseRef-GlyphWiki', attribution: 'GlyphWiki contributors',
    url: 'https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18',
    sourceUrl: 'https://glyphwiki.org/wiki/u8403-k@8',
    revision: 'u8403-k@8; u8403-ue0103@11; ufa5e-03@8; u5352-j@2; u20143-03@1; u4ea0-03@7; u5341-04@2',
    editableSource: '/hanja-strokes/glyphwiki/8403.json',
    modifications: 'Source-declared affine placement; 200-to-100 scaling; grass order3/4 exchange; uniform width2. All12 raw primitives remain separate. No invented coordinates, grouping, trimming, reversal or glyph substitution.',
  },
}], null, 2))
