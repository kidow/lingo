import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { buildKwiPaths } from './convert.mjs'

const root = new URL('../../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const sha = value => createHash('sha256').update(value).digest('hex')
const raw = read('public/hanja-strokes/glyphwiki/8475.json')
assert.equal(sha(raw), '17044d76c707fad8e396971b94de1a72f3cc34642a9813e60c8bc76b39f10d17')
assert.equal(sha(read('public/hanja-strokes/glyphwiki/NOTICE-8475.md')), '569b0cba0f0d12b5b3841bcf21b735a638dfc5e6debeca3d72c860b350a0ef66')
const proof = read('docs/hanja-goal-glyphwiki-batch31-2026-09-22/findings.json')
assert.equal(sha(proof), 'a383b70c0ed3369deb7bd658f6c7726fd12775afef63306bfeb27d80f9c1b0a4')
assert.equal(sha(read('docs/hanja-goal-glyphwiki-batch31-2026-09-22/curve-semantics.json')), '7d445e900b4553c98b67ccec0b94b570c59b5c51c22c468874f3b90a907657f9')
const review = JSON.parse(proof).entries.find(e => e.glyph === '葵')
assert.equal(review.decision, 'approved')
assert.equal(review.originalVisualSteps, 13)
assert.equal(review.normalizedCumulativeStates, 13)
assert.equal(review.finalFormReviewed, true)
const paths = buildKwiPaths(JSON.parse(raw), review)
const dictionary = JSON.parse(read('docs/hanja-goal-glyphwiki-batch31-2026-09-22/metadata.json')).find(e => e.glyph === '葵').dictionary
console.log(JSON.stringify([{
  glyph: '葵', verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-22',
  geometrySource: sha(raw), geometryCorrection: 'glyphwiki-exact-glyph-composite-reviewed-order-v1',
  sourceStrokeIndices: review.sourceStrokeIndices, strokeWidth: 4.5,
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
    sourceUrl: 'https://glyphwiki.org/wiki/u8475-var-001@1',
    revision: 'u8475-var-001@1; ufa5e-03@8; u7676-03-var-003@1; u5929-g14@1; u8475-var-003@2; u7678-var-001@2',
    editableSource: '/hanja-strokes/glyphwiki/8475.json',
    modifications: 'Source-declared affine placement; 200-to-100 scaling; explicit corner group5+6; reviewed group order; final stroke from alternate whole 葵 primitive14; width4.5. No invented points or path reversal. See editable source and pinned review recipe.',
  },
}], null, 2))
