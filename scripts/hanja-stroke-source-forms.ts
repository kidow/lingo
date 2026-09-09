/** Explicit observations where the publisher video draws a different glyph than its list label. */
import { createHash } from 'node:crypto'
import registry from './hanja-stroke-source-forms.json' with { type: 'json' }
import { HANJA_TEXTBOOK_SOURCE } from '../lib/hanja-stroke-textbook.ts'

export const TEXTBOOK_SOURCE_FORMS = registry.entries
type Form = typeof TEXTBOOK_SOURCE_FORMS[number]
type Review = {
  glyph: string; sourceGlyph?: string; sourceFormCorrection?: string; sourceFormCorrectionSha256?: string
  manifestRow?: string; videoFilename?: string; expectedStrokes?: number
  sourceVideo?: { url: string; sha256: string; bytes: number }
}
export function textbookSourceFormSha256(entry: Form) {
  return createHash('sha256').update(JSON.stringify({ id: entry.id, glyph: entry.glyph,
    sourceGlyph: entry.sourceGlyph, manifestRow: entry.manifestRow, videoFilename: entry.videoFilename,
    expectedStrokes: entry.expectedStrokes, sourceVideoSha256: entry.sourceVideoSha256,
    sourceVideoBytes: entry.sourceVideoBytes, durationSeconds: entry.durationSeconds,
    reviewedAt: entry.reviewedAt, reviewer: entry.reviewer, notes: entry.notes })).digest('hex')
}
export function validateTextbookSourceForm(record: Review): void {
  const matches = TEXTBOOK_SOURCE_FORMS.filter((entry) => entry.id === record.sourceFormCorrection)
  const entry = matches[0]
  if (registry.version !== 1 || matches.length !== 1 || !entry
    || entry.glyph !== record.glyph || entry.sourceGlyph !== record.sourceGlyph
    || entry.manifestRow !== record.manifestRow || entry.videoFilename !== record.videoFilename
    || entry.expectedStrokes !== record.expectedStrokes
    || textbookSourceFormSha256(entry) !== record.sourceFormCorrectionSha256
    || record.sourceVideo?.sha256 !== entry.sourceVideoSha256
    || record.sourceVideo?.bytes !== entry.sourceVideoBytes
    || record.sourceVideo?.url !== new URL(`../media/video/${entry.manifestRow}.mp4`, HANJA_TEXTBOOK_SOURCE.manifestUrl).href) {
    throw new Error('Textbook rendered source form mismatch: ' + record.glyph)
  }
}
