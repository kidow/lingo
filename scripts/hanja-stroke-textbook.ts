import { createHash } from 'node:crypto'
import registry from './hanja-stroke-textbook-review.json' with { type: 'json' }
import { HANJA_TEXTBOOK_SOURCE } from '../lib/hanja-stroke-textbook.ts'
import type { HanjaTextbookStrokeData } from '../lib/hanja-strokes.ts'

export type TextbookReviewRecord = {
  glyph: string
  manifestRow: string
  videoFilename: string
  expectedStrokes: number
  candidateStrokes: number
  status: string
  reviewedAt?: string
  strokeEndsSeconds?: readonly number[]
  durationSeconds?: number
  pathsSha256?: string
  checks?: { order: string; direction: string; boundaries: string; glyphForm: string }
  notes?: string
}

export type TextbookReviewRegistry = {
  sourceId: string
  manifestSha256: string
  geometrySha256: string
  records: readonly TextbookReviewRecord[]
}

export const TEXTBOOK_REVIEW_REGISTRY: TextbookReviewRegistry = registry
const geometrySha256 = '7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e'

function validReviewDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
}

/** The discovery manifest never authorizes playback; a completed review record is required. */
export function validateTextbookReview(
  review: HanjaTextbookStrokeData,
  expectedStrokes: number,
  ledger: TextbookReviewRegistry = TEXTBOOK_REVIEW_REGISTRY,
) {
  const matches = ledger.records.filter((entry) => entry.glyph === review.glyph)
  const record = matches[0]
  const reference = review.sourceReference
  if (matches.length !== 1 || record.status !== 'matched') {
    throw new Error(`Textbook review not completed: ${review.glyph}`)
  }
  if (ledger.sourceId !== HANJA_TEXTBOOK_SOURCE.id
    || ledger.manifestSha256 !== HANJA_TEXTBOOK_SOURCE.manifestSha256
    || ledger.geometrySha256 !== geometrySha256
    || review.verificationSource !== HANJA_TEXTBOOK_SOURCE.id
    || review.sourceImage !== undefined || review.sourceRow !== undefined || review.sourceWholeImage !== undefined
    || !reference || reference.manifestSha256 !== ledger.manifestSha256
    || reference.glyph !== record.glyph || reference.manifestRow !== record.manifestRow
    || reference.videoFilename !== record.videoFilename
    || !/^\d{4}$/.test(record.manifestRow) || !record.videoFilename.startsWith(`${record.manifestRow} `)) {
    throw new Error(`Textbook evidence mismatch: ${review.glyph}`)
  }
  const ends = record.strokeEndsSeconds
  if (!Number.isInteger(expectedStrokes) || expectedStrokes < 1
    || record.expectedStrokes !== expectedStrokes || record.candidateStrokes !== expectedStrokes
    || review.paths.length !== expectedStrokes
    || !record.reviewedAt || !validReviewDate(record.reviewedAt)
    || review.verifiedAt !== record.reviewedAt
    || !ends || ends.length !== expectedStrokes
    || !Number.isFinite(record.durationSeconds) || record.durationSeconds! <= 0
    || ends.some((end, index) => !Number.isFinite(end) || end <= (index ? ends[index - 1] : 0)
      || end > record.durationSeconds!)
    || !record.checks || ['order', 'direction', 'boundaries', 'glyphForm'].some(
      (key) => record.checks![key as keyof NonNullable<TextbookReviewRecord['checks']>] !== 'match',
    )
    || !record.notes?.trim()) {
    throw new Error(`Textbook whole-glyph comparison incomplete: ${review.glyph}`)
  }
  // Corrections need their own reviewed recipe; this first batch accepts unchanged Ko medians only.
  if (review.geometrySource !== geometrySha256 || review.strokeOrder !== undefined
    || review.geometryCorrection !== undefined || review.sourceStrokeIndices !== undefined
    || !record.pathsSha256 || !/^[a-f0-9]{64}$/.test(record.pathsSha256)
    || review.pathsSha256 !== record.pathsSha256
    || createHash('sha256').update(JSON.stringify(review.paths)).digest('hex') !== record.pathsSha256) {
    throw new Error(`Textbook geometry provenance mismatch: ${review.glyph}`)
  }
  return record
}
