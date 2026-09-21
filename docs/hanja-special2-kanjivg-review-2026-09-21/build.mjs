/** Print licensed runtime geometry; never read or write proprietary dictionary artwork. */
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { normalizeKanjiVGPath } from '../../lib/hanja-stroke-kanjivg-geometry.ts'
const bytes = file => readFileSync(new URL(file, import.meta.url))
const read = file => JSON.parse(bytes(file))
const sha = value => createHash('sha256').update(value).digest('hex')
const proposals = read('proposals.json')
const originals = read(proposals.candidateFile)
const reviewSha = sha(bytes('findings.json'))
console.log(JSON.stringify(proposals.entries.map(entry => {
  const original = originals.entries.find(e => e.id === entry.id)
  const paths = entry.dictionaryToCandidate.map(i => normalizeKanjiVGPath(original.strokes[i - 1].path))
  return {
    glyph: entry.glyph,
    variant: { catalogStrokes: entry.catalogStrokes, playbackStrokes: entry.strokes, form: '사전' },
    verificationSource: 'ehanja-crosschecked', verifiedAt: '2026-09-21',
    geometrySource: entry.svgSha256,
    geometryCorrection: 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1',
    candidateSha256: entry.svgSha256,
    sourceStrokeIndices: entry.dictionaryToCandidate,
    pathsSha256: sha(JSON.stringify(paths)),
    sourceReference: {
      orderUrl: entry.dictionary.url, dictionarySvgUrl: entry.dictionary.url,
      dictionarySvgSha256: entry.dictionary.sha256,
      dictionaryDirectionStrokes: Array.from({length: entry.strokes}, (_, i) => i + 1).join(','),
      orderReviewSha256: reviewSha, geometryReviewSha256: reviewSha, directionReviewSha256: reviewSha,
    },
    geometryLicense: { name: 'CC-BY-SA-3.0', url: originals.licenseUrl,
      attribution: originals.attribution, sourceUrl: entry.url, revision: entry.revision,
      modifications: 'Uniform coordinate scaling by 100/109 and reviewed stroke reordering. No curve flattening, added points, splitting or merging.' },
    paths,
  }
}), null, 2))
