import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { boxPaths } from './convert.mjs'

const root = new URL('../../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const sha = value => createHash('sha256').update(value).digest('hex')
const raw = read('public/hanja-strokes/glyphwiki/83d6.json')
assert.equal(sha(raw), '20d4a29fb62e504220afcdc80a26d529ecae0c5d6c805e98bc4ec61c73726ccf')
assert.equal(sha(read('public/hanja-strokes/glyphwiki/NOTICE-83d6.md')), 'e016a6fa0f65168294d813330ce9418a8120bda58e6b27c3cf0e15d78105e343')
const proof = read('docs/hanja-goal-glyphwiki-batch33-2026-09-22/findings.json')
assert.equal(sha(proof), '8cccfbb791078cafbf8c3a0db6ad05c82d005f01b49c056d27f2dc6604f91018')
assert.equal(sha(read('docs/hanja-goal-glyphwiki-batch33-2026-09-22/corner-semantics.json')), 'db553bcecea5c92f1f036acbedf7c7b2dca45a3c2c73bfa2b8e614d02c93bf6f')
const review = JSON.parse(proof).entries.find(e => e.glyph === '菖')
assert.equal(review.decision, 'approved')
assert.equal(review.originalVisualSteps, 12)
assert.equal(review.normalizedCumulativeStates, 12)
assert.equal(review.finalFormReviewed, true)
const paths = boxPaths(JSON.parse(raw), review.groups, review.sourceStrokeIndices)
const dictionary = JSON.parse(read('docs/hanja-goal-glyphwiki-batch33-2026-09-22/metadata.json')).find(e => e.glyph === '菖').dictionary
console.log(JSON.stringify([{
  glyph: '菖', verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-22',
  geometrySource: sha(raw), geometryCorrection: 'glyphwiki-source-declared-box-corners-reviewed-order-v1',
  sourceStrokeIndices: review.sourceStrokeIndices, strokeWidth: 4,
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
    sourceUrl: 'https://glyphwiki.org/wiki/u83d6-k@6',
    revision: 'u83d6-k@6; u83d6-ue0102@11; ufa5e-03@8; u660c-j@2; u65e5-03@6; u65e5-04@4',
    editableSource: '/hanja-strokes/glyphwiki/83d6.json',
    modifications: 'Source-declared affine placement; 200-to-100 scaling; exact source-adjacent corner groups6+7 and11+12; reviewed group order; width4. No invented coordinates, trimming, reversal or glyph substitution.',
  },
}], null, 2))
