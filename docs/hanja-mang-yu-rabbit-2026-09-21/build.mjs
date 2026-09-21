/** Reproduce licensed geometry; dictionary graphics are never bundled. */
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {normalizeKanjiVGPath} from '../../lib/hanja-stroke-kanjivg-geometry.ts'
const read = file => readFileSync(new URL(file, import.meta.url))
const candidate = JSON.parse(read('candidate.json'))
const sha = bytes => createHash('sha256').update(bytes).digest('hex')
const paths = candidate.dictionaryToCandidate.map(i => normalizeKanjiVGPath(candidate.paths[i - 1]))
const reviewSha = sha(read('findings.json'))
console.log(JSON.stringify([{
  glyph: candidate.glyph,
  variant: {catalogStrokes: candidate.catalogStrokes, playbackStrokes: candidate.playbackStrokes, form: '사전'},
  verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-21',
  geometrySource: candidate.svgSha256,
  geometryCorrection: 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1',
  candidateSha256: candidate.svgSha256, sourceStrokeIndices: candidate.dictionaryToCandidate,
  pathsSha256: sha(JSON.stringify(paths)),
  sourceReference: {
    orderUrl: candidate.dictionary.url, dictionarySvgUrl: candidate.dictionary.url,
    dictionarySvgSha256: candidate.dictionary.sha256, dictionaryDirectionStrokes: '1,2,3,4,5,6,7,8',
    orderReviewSha256: reviewSha, geometryReviewSha256: reviewSha, directionReviewSha256: reviewSha,
  },
  geometryLicense: {...candidate.license, sourceUrl: candidate.url, revision: candidate.revision,
    modifications: 'Uniform coordinate scaling by 100/109 and reviewed reordering of strokes 4 and 5. No curve flattening, added points, splitting or merging.'},
  paths,
}], null, 2))
