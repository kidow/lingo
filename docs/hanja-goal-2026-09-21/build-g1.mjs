/** Reproduce licensed curves; never bundle proprietary dictionary graphics. */
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { pathToFileURL } from 'node:url'
import { normalizeKanjiVGPath } from '../../lib/hanja-stroke-kanjivg-geometry.ts'

const read = name => readFileSync(new URL(name, import.meta.url))
const sha = data => createHash('sha256').update(data).digest('hex')
export function buildG1KanjiVGBundle() {
  const candidates = JSON.parse(read('g1-reviewed-candidates.json'))
  const reviewSha = sha(read('g1-findings.json'))
  return candidates.entries.map(entry => {
    const paths = entry.sourceStrokeIndices.map(i => normalizeKanjiVGPath(entry.paths[i - 1]))
    return {
      glyph: entry.glyph, verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-21',
      geometrySource: entry.candidate.sha256,
      geometryCorrection: 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1',
      sourceStrokeIndices: entry.sourceStrokeIndices, pathsSha256: sha(JSON.stringify(paths)),
      sourceReference: {
        orderUrl: entry.dictionary.url, dictionarySvgUrl: entry.dictionary.url,
        dictionarySvgSha256: entry.dictionary.sha256,
        dictionaryDirectionStrokes: Array.from({ length: paths.length }, (_, i) => i + 1).join(','),
        orderReviewSha256: reviewSha, geometryReviewSha256: reviewSha, directionReviewSha256: reviewSha,
      },
      geometryLicense: { ...candidates.license, sourceUrl: entry.candidate.url, revision: candidates.revision,
        modifications: 'Uniform coordinate scaling by 100/109; reviewed stroke reordering for 饉 only. No curve flattening, reversal, new points, splitting or merging.' },
      paths,
    }
  })
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(JSON.stringify(buildG1KanjiVGBundle(), null, 2))
}
