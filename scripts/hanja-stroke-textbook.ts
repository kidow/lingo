import { createHash } from 'node:crypto'
import registry from './hanja-stroke-textbook-review.json' with { type: 'json' }
import { HANJA_TEXTBOOK_SOURCE } from '../lib/hanja-stroke-textbook.ts'
import type { HanjaTextbookStrokeData } from '../lib/hanja-strokes.ts'
import { textbookCorrection } from './hanja-stroke-textbook-corrections.ts'
import { textbookAuthored, type TextbookAuthoredContext } from './hanja-stroke-textbook-authored.ts'
import { validateTextbookSourceForm } from './hanja-stroke-source-forms.ts'

export type TextbookReviewRecord = {
  glyph: string
  /** Exact manifest spelling; non-NFC differences require a pinned video-form observation. */
  sourceGlyph?: string
  sourceFormCorrection?: string
  sourceFormCorrectionSha256?: string
  manifestRow: string
  videoFilename: string
  expectedStrokes: number
  candidateStrokes: number
  geometrySource?: string
  geometryCorrection?: string
  geometryAuthored?: string
  correctionSha256?: string
  status: string
  reviewedAt?: string
  reviewer?: string
  reviewMethod?: string
  sourceVideo?: { url: string; sha256: string; bytes: number }
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
/** Preserve source spelling. Never infer variant equivalence from pronunciation or meaning. */
export function textbookSourceGlyph(record: Pick<TextbookReviewRecord, 'glyph' | 'sourceGlyph'> & Partial<TextbookReviewRecord>): string {
  const source = record.sourceGlyph ?? record.glyph
  if (typeof source !== 'string' || [...source].length !== 1 || [...record.glyph].length !== 1) {
    throw new Error('Textbook source glyph is not NFC-compatible: ' + record.glyph)
  }
  if (record.sourceFormCorrection !== undefined || record.sourceFormCorrectionSha256 !== undefined) {
    validateTextbookSourceForm(record)
  } else if (source.normalize('NFC') !== record.glyph.normalize('NFC')) {
    throw new Error('Textbook source glyph is not NFC-compatible: ' + record.glyph)
  }
  return source
}
const geometrySha256 = '7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e'
const japaneseGeometrySha256 = '2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8'
const makeMeAHanziGeometrySha256 = 'a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee'

/** Keep the existing Ko default; another corpus must be explicitly reviewed. */
export function textbookGeometrySource(record: Partial<TextbookReviewRecord>, context: TextbookAuthoredContext = {}) {
  if (record.geometryAuthored !== undefined) {
    if (!record.glyph) throw new Error('Missing textbook authored glyph')
    textbookAuthored({ ...record, glyph: record.glyph }, context)
    return record.geometrySource!
  }
  const source = record.geometrySource === undefined ? geometrySha256 : record.geometrySource
  if (source !== geometrySha256 && source !== japaneseGeometrySha256 && source !== makeMeAHanziGeometrySha256) {
    throw new Error('Unsupported textbook geometry source')
  }
  return source
}

function validReviewDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
}

function validSourceVideo(record: TextbookReviewRecord) {
  const video = record.sourceVideo
  if (!video || typeof video.url !== 'string' || typeof video.sha256 !== 'string'
    || !/^[a-f0-9]{64}$/i.test(video.sha256)
    || !Number.isSafeInteger(video.bytes) || video.bytes <= 0) return false
  try {
    const expectedUrl = new URL(`../media/video/${record.manifestRow}.mp4`, HANJA_TEXTBOOK_SOURCE.manifestUrl)
    return new URL(video.url).href === expectedUrl.href
  } catch {
    return false
  }
}

/** The discovery manifest never authorizes playback; a completed review record is required. */
export function validateTextbookReview(
  review: HanjaTextbookStrokeData,
  expectedStrokes: number,
  ledger: TextbookReviewRegistry = TEXTBOOK_REVIEW_REGISTRY,
  context: TextbookAuthoredContext = {},
) {
  const matches = ledger.records.filter((entry) => entry.glyph === review.glyph)
  const record = matches[0]
  const reference = review.sourceReference
  if (matches.length !== 1 || record.status !== 'matched') {
    throw new Error(`Textbook review not completed: ${review.glyph}`)
  }
  const sourceGlyph = textbookSourceGlyph(record)
  if (ledger.sourceId !== HANJA_TEXTBOOK_SOURCE.id
    || ledger.manifestSha256 !== HANJA_TEXTBOOK_SOURCE.manifestSha256
    || ledger.geometrySha256 !== geometrySha256
    || review.verificationSource !== HANJA_TEXTBOOK_SOURCE.id
    || review.sourceImage !== undefined || review.sourceRow !== undefined || review.sourceWholeImage !== undefined
    || !reference || reference.manifestSha256 !== ledger.manifestSha256
    || reference.glyph !== sourceGlyph || reference.manifestRow !== record.manifestRow
    || reference.videoFilename !== record.videoFilename
    || reference.formCorrection !== record.sourceFormCorrection
    || reference.formCorrectionSha256 !== record.sourceFormCorrectionSha256
    || !/^\d{4}$/.test(record.manifestRow) || !record.videoFilename.startsWith(`${record.manifestRow} `)) {
    throw new Error(`Textbook evidence mismatch: ${review.glyph}`)
  }
  const ends = record.strokeEndsSeconds
  if (!Number.isInteger(expectedStrokes) || expectedStrokes < 1
    || record.expectedStrokes !== expectedStrokes
    || !Number.isInteger(record.candidateStrokes) || record.candidateStrokes < 1
    || (!record.geometryCorrection && record.candidateStrokes !== expectedStrokes)
    || review.paths.length !== expectedStrokes
    || !record.reviewedAt || !validReviewDate(record.reviewedAt)
    || typeof record.reviewer !== 'string' || !record.reviewer.trim()
    || record.reviewMethod !== 'video-frame-sequence' || !validSourceVideo(record)
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
  // A local vector correction must name the recipe compared against this exact source video.
  const authored = textbookAuthored(record, context)
  const correction = textbookCorrection(record)
  if (review.geometrySource !== textbookGeometrySource(record, context) || review.strokeOrder !== undefined
    || review.geometryAuthored !== record.geometryAuthored
    || (authored !== undefined && record.pathsSha256 !== authored.pathsSha256)
    || review.geometryCorrection !== record.geometryCorrection
    || JSON.stringify(review.sourceStrokeIndices) !== JSON.stringify(authored ? authored.paths.map(() => null) : correction?.strokes.map((stroke) => stroke.sourceStroke))
    || !record.pathsSha256 || !/^[a-f0-9]{64}$/.test(record.pathsSha256)
    || review.pathsSha256 !== record.pathsSha256
    || createHash('sha256').update(JSON.stringify(review.paths)).digest('hex') !== record.pathsSha256) {
    throw new Error(`Textbook geometry provenance mismatch: ${review.glyph}`)
  }
  return record
}
