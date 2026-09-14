/** Read-only reconstruction of the manually reviewed follow-up. */
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { textbookCorrectionSha256, textbookGeometry } from '../../scripts/hanja-stroke-textbook-corrections.ts'

const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export function prepare() {
  const queue = json('../hanja-g3-batch2-2026-09-14/queue.json')
  const originals = json('../hanja-g3-batch2-2026-09-14/originals.json')
  const alternates = json('./alternates.json')
  const proposals = json('./proposals.json')
  const records = [], recipes = [], characters = []
  for (const observation of json('./observations.json').filter(o => o.decision === 'matched')) {
    const item = queue.entries.find(e => e.glyph === observation.glyph)
    const previous = originals.find(e => e.glyph === item.glyph)
    const medians = observation.candidate === item.candidate ? previous.medians
      : alternates[observation.candidate].find(e => e.glyph === item.glyph).medians
    const geometrySource = queue.geometry[observation.candidate].sha256
    const recipe = proposals[item.glyph] ? {
      glyph: item.glyph, id: `vivasam-g3-batch2-followup-${item.glyph.codePointAt(0).toString(16)}-v1`,
      geometrySource, coordinateSystem: 'viewBox100',
      sourceVideoSha256: item.sourceVideo.sha256, originalMediansSha256: hash(medians),
      strokes: proposals[item.glyph], notes: observation.notes,
    } : undefined
    if (recipe) recipes.push(recipe)
    const record = {
      glyph: item.glyph, manifestRow: item.manifest.manifestRow,
      videoFilename: item.manifest.videoFilename, expectedStrokes: item.strokes,
      candidateStrokes: medians.length, geometrySource,
      ...(recipe ? { geometryCorrection: recipe.id, correctionSha256: textbookCorrectionSha256(recipe) } : {}),
      status: 'matched', reviewedAt: '2026-09-14',
      reviewer: 'Codex root visual comparison; not expert or examination-body certification',
      reviewMethod: 'video-frame-sequence', sourceVideo: item.sourceVideo,
      durationSeconds: previous.durationSeconds, strokeEndsSeconds: observation.ends,
      checks: { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' },
      notes: observation.notes + ' Evidence: docs/hanja-g3-batch2-followup-2026-09-14/. Times are sampled completed-by observations, not exact pen lifts. Only this whole-glyph comparison authorizes this entry.',
    }
    const geometry = recipe ? textbookGeometry(record, medians, [recipe]) : { paths: normalizeMedians(medians) }
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
