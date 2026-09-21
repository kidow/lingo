import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { kagePaths } from '../hanja-goal-glyphwiki-batch26-2026-09-22/convert.mjs'

const root = new URL('../../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const sha = value => createHash('sha256').update(value).digest('hex')
const raw = read('public/hanja-strokes/glyphwiki/8299.json')
assert.equal(sha(raw), 'fc4bf204c22695e4340e7b5dba3edc464796885c43132eaa1243f5f20dfbf693')
assert.equal(sha(read('public/hanja-strokes/glyphwiki/NOTICE-8299.md')), '21e4d702aa3e57fd93e81214954a5eaa3ec9d1beffe8061fc9d5b881055f90ee')
const proof = read('docs/hanja-goal-glyphwiki-batch27-2026-09-22/findings.json')
assert.equal(sha(proof), 'e38afc72c00dcc83db7e6c943792a5a7b727e9395e43d46a0d8f9a12dda31532')
const review = JSON.parse(proof).entries.find(e => e.glyph === '芙')
assert.equal(review.decision, 'approved')
assert.equal(review.originalVisualSteps, 8)
assert.equal(review.normalizedCumulativeStates, 8)
assert.equal(review.finalFormReviewed, true)
const paths = kagePaths(JSON.parse(raw), review.sourceStrokeIndices)
const dictionary = JSON.parse(read('docs/hanja-goal-glyphwiki-batch27-2026-09-22/metadata.json')).find(e => e.glyph === '芙').dictionary
console.log(JSON.stringify([{
  glyph: '芙', verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-22',
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
    sourceUrl: 'https://glyphwiki.org/wiki/u8299-k@11',
    revision: 'u8299-k@11; ufa5e-03@8; u592b-j@2',
    editableSource: '/hanja-strokes/glyphwiki/8299.json',
    modifications: 'Source-declared affine placement; 200-to-100 scaling; swap3/4; width4. No new points, splitting, joining or reversal.',
  },
}], null, 2))
