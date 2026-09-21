import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { buildManPaths, expandMan } from './convert.mjs'

const root = new URL('../../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const sha = value => createHash('sha256').update(value).digest('hex')
const raw = read('public/hanja-strokes/glyphwiki/8513.json')
assert.equal(sha(raw), 'bfa61b6cd50745f8b3c8a8aa18fbc6e0c1647fd9de55ad4beff44708421ac66b')
assert.equal(sha(read('public/hanja-strokes/glyphwiki/NOTICE-8513.md')), 'ca5880a943ca3b479f8f55bdb2b63a4c036698b266ed2034290423fda2ec3b31')
const proof = read('docs/hanja-goal-glyphwiki-batch39-2026-09-22/findings.json')
assert.equal(sha(proof), '1b1ec07e341b79c67d415da6bc4edb4f269e53eb16b5871979247c7bd986cce4')
assert.equal(sha(read('docs/hanja-goal-glyphwiki-batch39-2026-09-22/geometry-semantics.json')), 'b1b97720e3e20833f001d1ed34e1d6c79cf777a378e92991bf182f7046b2a8ca')
const review = JSON.parse(proof).entries.find(e => e.glyph === '蔓')
assert.equal(review.decision, 'approved')
assert.equal(review.originalVisualSteps, 15)
assert.equal(review.normalizedCumulativeStates, 15)
assert.equal(review.finalFormReviewed, true)
const reference=read('docs/hanja-goal-glyphwiki-batch39-2026-09-22/reference.json')
assert.equal(sha(reference),'73c728e9a1c619fed64e13c6f2cfd10df6675519c2f8656895586dc6391df616')
assert.deepEqual(expandMan(JSON.parse(raw)).map(p=>[p.type,p.head,p.tail,...p.points.flat()]),JSON.parse(reference).raw)
const paths = buildManPaths(JSON.parse(raw), review.groups, review.sourceStrokeIndices)
const dictionary = JSON.parse(read('docs/hanja-goal-glyphwiki-batch39-2026-09-22/metadata.json')).find(e => e.glyph === '蔓').dictionary
console.log(JSON.stringify([{
  glyph: '蔓', verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-22',
  geometrySource: sha(raw), geometryCorrection: 'glyphwiki-equal-pivot-box-curve-reviewed-v1',
  sourceStrokeIndices: review.sourceStrokeIndices, strokeWidth: 3,
  pathsSha256: sha(JSON.stringify(paths)), paths,
  sourceReference: {
    orderUrl: dictionary.url, dictionarySvgUrl: dictionary.url,
    dictionarySvgSha256: dictionary.sha256,
    dictionaryDirectionStrokes: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15',
    orderReviewSha256: sha(proof), geometryReviewSha256: sha(proof), directionReviewSha256: sha(proof),
  },
  geometryLicense: {
    spdx: 'LicenseRef-GlyphWiki', attribution: 'GlyphWiki contributors',
    url: 'https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18',
    sourceUrl: 'https://glyphwiki.org/wiki/u8513-k@14',
    revision: 'u8513-k@14; ufa5e-03@8; u66fc@18; u66fc-j@4; u2ff1-u65e5-u7f52@9; u65e5-03@6; u7f52-07@6; u53c8-07@3',
    editableSource: '/hanja-strokes/glyphwiki/8513.json',
    modifications: 'Declared affine placement and exact equal-pivot floor arithmetic; 200-to-100 scaling; source-adjacent corner groups6+7,11+12,16+17; grass order3/4 exchange; width3. No invented coordinates, trimming, reversal or glyph substitution.',
  },
}], null, 2))
