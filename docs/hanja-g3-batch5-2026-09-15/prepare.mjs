/** Read-only reconstruction of this batch's manually reviewed additions. */
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { textbookCorrectionSha256, textbookGeometry } from '../../scripts/hanja-stroke-textbook-corrections.ts'

const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export function prepare() {
  const queue = json('./queue.json')
  const observations = json('./observations.json').records
  const originals = json('./originals.json')
  const records = [], recipes = [], characters = []
  for (const observation of observations.filter(o => o.decision === 'matched')) {
    const item = queue.entries.find(e => e.glyph === observation.glyph)
    const original = originals.find(e => e.glyph === observation.glyph)
    const geometrySource = queue.geometry[item.candidate].sha256
    const recipe = observation.order ? {
      glyph: item.glyph, id: `vivasam-g3-batch5-${item.glyph.codePointAt(0).toString(16)}-order-v1`,
      geometrySource, sourceVideoSha256: item.sourceVideo.sha256,
      originalMediansSha256: hash(original.medians),
      strokes: observation.order.map(sourceStroke => ({ sourceStroke })),
      notes: observation.notes + ' Corrected cumulative paths and start/end markers visually rechecked after reordering.',
    } : undefined
    if (recipe) recipes.push(recipe)
    const record = {
      glyph: item.glyph, manifestRow: item.manifest.manifestRow,
      videoFilename: item.manifest.videoFilename, expectedStrokes: item.strokes,
      candidateStrokes: original.medians.length, geometrySource,
      ...(recipe ? { geometryCorrection: recipe.id, correctionSha256: textbookCorrectionSha256(recipe) } : {}),
      status: 'matched', reviewedAt: '2026-09-15',
      reviewer: 'Codex root visual comparison; not expert or examination-body certification',
      reviewMethod: 'video-frame-sequence', sourceVideo: item.sourceVideo,
      durationSeconds: original.durationSeconds, strokeEndsSeconds: observation.ends,
      checks: { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' },
      notes: observation.notes + ' Evidence and holds: docs/hanja-g3-batch5-2026-09-15/. Times are sampled completed-by observations, not exact pen lifts. Only this whole-glyph comparison authorizes this entry.',
    }
    const geometry = recipe ? textbookGeometry(record, original.medians, [recipe]) : { paths: normalizeMedians(original.medians) }
    record.pathsSha256 = hash(geometry.paths)
    records.push(record)
    characters.push({
      glyph: item.glyph, verifiedAt: record.reviewedAt, geometrySource,
      ...(recipe ? { geometryCorrection: recipe.id, sourceStrokeIndices: geometry.sourceStrokeIndices } : {}),
      pathsSha256: record.pathsSha256,
      sourceReference: { manifestSha256: queue.publisher.manifestSha256,
        manifestRow: record.manifestRow, glyph: item.glyph, videoFilename: record.videoFilename },
      paths: geometry.paths,
    })
  }
  return { records, recipes, characters }
}
