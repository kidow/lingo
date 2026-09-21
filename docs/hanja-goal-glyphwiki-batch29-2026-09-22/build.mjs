import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { kagePaths } from '../hanja-goal-glyphwiki-batch26-2026-09-22/convert.mjs'

const root = new URL('../../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const sha = value => createHash('sha256').update(value).digest('hex')
const raw = read('public/hanja-strokes/glyphwiki/8292.json')
assert.equal(sha(raw), '3e1d238659423d2050c735b625041c457705294cdfa44bbdc11592ff010620ae')
assert.equal(sha(read('public/hanja-strokes/glyphwiki/NOTICE-8292.md')), 'a4784a8dfb7694f6fb85530b316715fd6251d7e59161010aa468a9f8768a29b7')
const proof = read('docs/hanja-goal-glyphwiki-batch29-2026-09-22/findings.json')
assert.equal(sha(proof), '767376fbb8814635c8c32b5948220c5a7477ec5e3d4f79e2f194a0eaa664e84b')
assert.equal(sha(read('docs/hanja-goal-glyphwiki-batch29-2026-09-22/bend-semantics.json')), '934c31797697255c517d9520c6038ff9551d10f3df8ddfac193e107af43b04b6')
const review = JSON.parse(proof).entries.find(e => e.glyph === '芒')
assert.equal(review.decision, 'approved')
assert.equal(review.originalVisualSteps, 7)
assert.equal(review.normalizedCumulativeStates, 7)
assert.equal(review.finalFormReviewed, true)
const paths = kagePaths(JSON.parse(raw), review.sourceStrokeIndices, { allowConnectionLines: true, allowBentStrokes: true })
const dictionary = JSON.parse(read('docs/hanja-goal-glyphwiki-batch29-2026-09-22/metadata.json')).find(e => e.glyph === '芒').dictionary
console.log(JSON.stringify([{
  glyph: '芒', verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-22',
  geometrySource: sha(raw), geometryCorrection: 'glyphwiki-declared-affine-default-bend-reviewed-order-v1',
  sourceStrokeIndices: review.sourceStrokeIndices, strokeWidth: 4,
  pathsSha256: sha(JSON.stringify(paths)), paths,
  sourceReference: {
    orderUrl: dictionary.url, dictionarySvgUrl: dictionary.url,
    dictionarySvgSha256: dictionary.sha256,
    dictionaryDirectionStrokes: '1,2,3,4,5,6,7',
    orderReviewSha256: sha(proof), geometryReviewSha256: sha(proof), directionReviewSha256: sha(proof),
  },
  geometryLicense: {
    spdx: 'LicenseRef-GlyphWiki', attribution: 'GlyphWiki contributors',
    url: 'https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18',
    sourceUrl: 'https://glyphwiki.org/wiki/u8292-k@14',
    revision: 'u8292-k@14; ufa5e-03@8; u4ea1-j@4',
    editableSource: '/hanja-strokes/glyphwiki/8292.json',
    modifications: 'Source-declared affine placement; 200-to-100 scaling; swap3/4; width4; connected vertical and engine-default rounded type3 turn. No manual points, splitting, joining or reversal.',
  },
}], null, 2))
