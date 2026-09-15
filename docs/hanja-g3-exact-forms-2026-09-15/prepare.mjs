/** Reconstruct licensed Ja paths and pin the complete exact-form dictionary review. */
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
const read = name => readFileSync(new URL(name, import.meta.url), 'utf8')
const json = name => JSON.parse(read(name))
const sha = value => createHash('sha256').update(value).digest('hex')
const hash = value => sha(JSON.stringify(value))
export function prepare() {
  const sources = json('./sources.json'), observations = json('./observations.json')
  const proposals = json('./proposals.json')
  const records = [], entries = []
  for (const glyph of ['隷', '隣']) {
    const original = sources.originals.find(e => e.glyph === glyph)
    const pin = sources.dictionary.find(e => e.glyph === glyph)
    const observation = observations.entries.find(e => e.glyph === glyph)
    if (observation.decision !== 'matched' || !pin.fullStrokeReviewCompleted) throw new Error('Review incomplete')
    const originalPaths = normalizeMedians(original.medians)
    const paths = proposals[glyph].map(s => s.points
      ? s.points.map(([x,y],i) => (i ? 'L' : 'M') + x + ' ' + y).join(' ')
      : originalPaths[s.sourceStroke - 1])
    records.push({ glyph, status: 'matched', reviewedAt: observations.date,
      reviewer: observations.reviewer, reviewMethod: 'dictionary-mask-sequence',
      strokes: pin.catalogStrokes, candidateStrokes: original.medians.length,
      sourceSvg: { url: pin.svgUrl, bytes: pin.bytes, sha256: pin.sha256 },
      geometrySource: sources.geometry.sha256, originalMediansSha256: hash(original.medians),
      sourceStrokeIndices: proposals[glyph].map(s => s.sourceStroke),
      pathsSha256: hash(paths), checks: observation.checks, notes: observation.notes })
    entries.push({ glyph, paths })
  }
  const review = { version: 1, verificationSource: 'ehanja-crosschecked', records }
  const reviewSha256 = sha(JSON.stringify(review, null, 2) + '\n')
  const observationSha256 = sha(read('./observations.json'))
  const characters = records.map(record => ({
    glyph: record.glyph, verifiedAt: record.reviewedAt, geometrySource: record.geometrySource,
    geometryCorrection: 'dictionary-crosscheck-' + record.glyph.codePointAt(0).toString(16) + '-v1',
    sourceStrokeIndices: record.sourceStrokeIndices, pathsSha256: record.pathsSha256,
    sourceReference: { orderUrl: record.sourceSvg.url, dictionarySvgUrl: record.sourceSvg.url,
      dictionarySvgSha256: record.sourceSvg.sha256,
      dictionaryDirectionStrokes: Array.from({length:record.strokes},(_,i)=>i+1).join(','),
      orderReviewSha256: reviewSha256, geometryReviewSha256: reviewSha256,
      directionReviewSha256: observationSha256 },
    paths: entries.find(e => e.glyph === record.glyph).paths,
  }))
  return { review, candidates: { entries }, characters }
}
