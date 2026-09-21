import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { kagePaths } from '../hanja-goal-glyphwiki-batch26-2026-09-22/convert.mjs'

const root = new URL('../../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const sha = value => createHash('sha256').update(value).digest('hex')
const raw = read('public/hanja-strokes/glyphwiki/8338.json')
assert.equal(sha(raw), 'b5003702c68bf6be08c30f4a662b653862367f6e4753c0df75f201412841c43f')
assert.equal(sha(read('public/hanja-strokes/glyphwiki/NOTICE-8338.md')), 'bf486b3db7ad935b144419eb2be690f8ad7a56158140d39c79175bc62b3885c8')
const proof = read('docs/hanja-goal-glyphwiki-batch28-2026-09-22/findings.json')
assert.equal(sha(proof), 'cca9d75da6603c8f1b757614ca6e515bf6504e0c701629a481a782aa0d2e939a')
assert.equal(sha(read('docs/hanja-goal-glyphwiki-batch28-2026-09-22/connection-semantics.json')), 'f3c413753420b1205a4b2cc4f8a27739798ed3e2bf609e8c5d9dc9aef71a66be')
const review = JSON.parse(proof).entries.find(e => e.glyph === '茸')
assert.equal(review.decision, 'approved')
assert.equal(review.originalVisualSteps, 10)
assert.equal(review.normalizedCumulativeStates, 10)
assert.equal(review.finalFormReviewed, true)
const paths = kagePaths(JSON.parse(raw), review.sourceStrokeIndices, { allowConnectionLines: true })
const dictionary = JSON.parse(read('docs/hanja-goal-glyphwiki-batch28-2026-09-22/metadata.json')).find(e => e.glyph === '茸').dictionary
console.log(JSON.stringify([{
  glyph: '茸', verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-22',
  geometrySource: sha(raw), geometryCorrection: 'glyphwiki-declared-affine-connection-lines-reviewed-order-v1',
  sourceStrokeIndices: review.sourceStrokeIndices, strokeWidth: 4,
  pathsSha256: sha(JSON.stringify(paths)), paths,
  sourceReference: {
    orderUrl: dictionary.url, dictionarySvgUrl: dictionary.url,
    dictionarySvgSha256: dictionary.sha256,
    dictionaryDirectionStrokes: '1,2,3,4,5,6,7,8,9,10',
    orderReviewSha256: sha(proof), geometryReviewSha256: sha(proof), directionReviewSha256: sha(proof),
  },
  geometryLicense: {
    spdx: 'LicenseRef-GlyphWiki', attribution: 'GlyphWiki contributors',
    url: 'https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18',
    sourceUrl: 'https://glyphwiki.org/wiki/u8338-k@7',
    revision: 'u8338-k@7; ufa5e-03@8; u8033-j@2',
    editableSource: '/hanja-strokes/glyphwiki/8338.json',
    modifications: 'Source-declared affine placement; 200-to-100 scaling; swap3/4; width4; documented connection caps 2/32 as straight centerlines. No new points, splitting, joining or reversal.',
  },
}], null, 2))
