import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { boxPaths } from '../hanja-goal-glyphwiki-batch33-2026-09-22/convert.mjs'

const root = new URL('../../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const sha = value => createHash('sha256').update(value).digest('hex')
const raw = read('public/hanja-strokes/glyphwiki/83e9.json')
assert.equal(sha(raw), '126f64b9a39930706b9c0ccf4fa295eff7b1b90cca3ed8dc46b87db323d90196')
assert.equal(sha(read('public/hanja-strokes/glyphwiki/NOTICE-83e9.md')), 'ed239849a64f037657347a2dd443d60f3da356a5762c955f4cac7587f8d5e4c2')
const proof = read('docs/hanja-goal-glyphwiki-batch34-2026-09-22/findings.json')
assert.equal(sha(proof), '8dfc01d894d534d2620384d8c124612b3fb6dc5c713ebe458f446de64d13acf0')
assert.equal(sha(read('docs/hanja-goal-glyphwiki-batch34-2026-09-22/geometry-semantics.json')), '4ea663854b3412d352bc4461d81cba56a95a28f3ace67f38f2a17b7c231d3638')
const review = JSON.parse(proof).entries.find(e => e.glyph === '菩')
assert.equal(review.decision, 'approved')
assert.equal(review.originalVisualSteps, 12)
assert.equal(review.normalizedCumulativeStates, 12)
assert.equal(review.finalFormReviewed, true)
const paths = boxPaths(JSON.parse(raw), review.groups, review.sourceStrokeIndices, { allowCurves: true })
const dictionary = JSON.parse(read('docs/hanja-goal-glyphwiki-batch34-2026-09-22/metadata.json')).find(e => e.glyph === '菩').dictionary
console.log(JSON.stringify([{
  glyph: '菩', verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-22',
  geometrySource: sha(raw), geometryCorrection: 'glyphwiki-mixed-curves-box-reviewed-width-v1',
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
    sourceUrl: 'https://glyphwiki.org/wiki/u83e9-k@9',
    revision: 'u83e9-k@9; u83e9-ue0102@10; ufa5e-03@8; u5485-j@2; u7acb-03@6',
    editableSource: '/hanja-strokes/glyphwiki/83e9.json',
    modifications: 'Source-declared affine placement; 200-to-100 scaling; exact source-adjacent corner group11+12; reviewed group order; width2 preserves internal gaps. No invented coordinates, trimming, reversal or glyph substitution.',
  },
}], null, 2))
