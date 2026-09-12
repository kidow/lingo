/** Build-time guards for explicit Korean document reviews; never an approval by discovery. */
import { createHash } from 'node:crypto'
import { isDeepStrictEqual } from 'node:util'
import registry from './hanja-stroke-document-review.json' with { type: 'json' }
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import { samplePath } from './hanja-component-geometry.ts'
import {
  DOCUMENT_GLYPH_PAGES, DOCUMENT_VERIFICATION_METADATA,
  HANJA_DOCUMENT_GEOMETRY_SOURCE, HANJA_DOCUMENT_SOURCE,
  type HanjaDocumentStrokeData,
} from '../lib/hanja-stroke-documents.ts'

type Medians = readonly (readonly (readonly number[])[])[]
type Checks = { order: string; direction: string; boundaries: string; glyphForm: string }
export type DocumentReviewRecord = {
  glyph: string
  expectedStrokes: number
  candidateStrokes: number
  geometrySource: string
  status: string
  reviewedAt: string
  reviewer: string
  reviewMethod: string
  sourceDocument: {
    url: string; sha256: string; bytes: number
    pdfPage: number; printedPage: number; glyph: string; cumulativePanels: number
  }
  directionEvidence: {
    sourceId: string; url: string; sha256: string; bytes: number; glyph: string; strokeCount: number
  }
  steps: readonly (Checks & {
    stroke: number; panel: number; sourceStroke: number; directionTrack: number; notes: string
  })[]
  checks: Checks
  geometryRecipe: {
    id: string
    originalMediansSha256: string
    /** Explicit display coordinates; omitted points use the normalized whole original glyph. */
    strokes: readonly { sourceStroke: number; points?: readonly (readonly number[])[] }[]
    notes: string
  }
  recipeSha256: string
  pathsSha256: string
  notes: string
}
export type DocumentReviewRegistry = {
  version: number
  sourceId: string
  documentSha256: string
  geometrySha256: string
  records: readonly DocumentReviewRecord[]
}
export type DocumentCandidate = { character: string; medians: Medians; strokes?: readonly string[] }
export const DOCUMENT_REVIEW_REGISTRY = registry as DocumentReviewRegistry

/** Hashes only; official XML coordinates are neither stored nor used as geometry. */
export const DOCUMENT_DIRECTION_SOURCES: Readonly<Record<string, {
  sourceId: string; url: string; sha256: string; bytes: number; glyph: string; strokeCount: number
}>> = {
  阿: {
    sourceId: 'moe-tw-stroke-order',
    url: 'https://stroke-order.learningweb.moe.edu.tw/dictFrame.jsp?ID=38463',
    sha256: '2925da50831c78aeeab321ab14f3d13d5a5f1b8be236b05c72f848ac546ab77e',
    bytes: 15092, glyph: '阿', strokeCount: 8,
  },
  兔: {
    sourceId: 'moe-tw-stroke-order',
    url: 'https://stroke-order.learningweb.moe.edu.tw/dictView.jsp?ID=20820',
    sha256: '352ac56b2faf6832ab1340682c28b1a8c0d470f9a05c49889bcfe99bb7cf0c02',
    bytes: 15841, glyph: '兔', strokeCount: 8,
  },
}

const originalMediansHashes: Readonly<Record<string, string>> = {
  阿: '8d01e666fc12e8e14bb86eec2a88ca057d76b53357d7ae8c4e195496e863d3be',
  兔: '64decbec9ead64ed115605c8b1fa7f8a1b90ea47ec496593028f3f9ad015dc2d',
}
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const isHash = (value: unknown): value is string => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value)
const text = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
const matches = (checks: Checks | undefined) => checks !== undefined && checks !== null
  && ['order', 'direction', 'boundaries', 'glyphForm'].every(key => checks[key as keyof Checks] === 'match')

function validDate(value: unknown) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(value + 'T00:00:00Z')
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
}

function checkLedger(ledger: DocumentReviewRegistry) {
  if (!ledger || ledger.version !== 1 || ledger.sourceId !== HANJA_DOCUMENT_SOURCE.id
    || ledger.documentSha256 !== HANJA_DOCUMENT_SOURCE.documentSha256
    || ledger.geometrySha256 !== HANJA_DOCUMENT_GEOMETRY_SOURCE.sha256 || !Array.isArray(ledger.records)) {
    throw new Error('Document registry source mismatch')
  }
  const seen = new Set<string>()
  for (const record of ledger.records) {
    if (!record || !Object.hasOwn(DOCUMENT_GLYPH_PAGES, record.glyph) || seen.has(record.glyph)
      || !['pending', 'matched', 'conflict'].includes(record.status)) {
      throw new Error('Document registry duplicate, unsupported glyph or status')
    }
    seen.add(record.glyph)
  }
}

function sourceReference(record: DocumentReviewRecord): HanjaDocumentStrokeData['sourceReference'] {
  return {
    documentSha256: record.sourceDocument.sha256,
    pdfPage: record.sourceDocument.pdfPage,
    printedPage: record.sourceDocument.printedPage,
    glyph: record.sourceDocument.glyph,
    cumulativePanels: record.sourceDocument.cumulativePanels,
    directionEvidenceSha256: record.directionEvidence.sha256,
  }
}

/** Stable field order binds every editable point and its original stroke correspondence. */
export function documentRecipeSha256(record: Pick<DocumentReviewRecord,
  'glyph' | 'geometrySource' | 'sourceDocument' | 'geometryRecipe'>): string {
  const recipe = record.geometryRecipe
  return hash({
    version: 1, glyph: record.glyph, geometrySource: record.geometrySource,
    sourceDocumentSha256: record.sourceDocument.sha256,
    id: recipe.id, originalMediansSha256: recipe.originalMediansSha256,
    strokes: recipe.strokes.map(stroke => ({
      sourceStroke: stroke.sourceStroke,
      ...(stroke.points !== undefined ? { points: stroke.points } : {}),
    })),
    notes: recipe.notes,
  })
}

function checkRecipe(record: DocumentReviewRecord) {
  const recipe = record.geometryRecipe
  if (!record || !Object.hasOwn(originalMediansHashes, record.glyph)
    || record.geometrySource !== HANJA_DOCUMENT_GEOMETRY_SOURCE.sha256
    || record.expectedStrokes !== 8 || record.candidateStrokes !== 8
    || !record.sourceDocument || record.sourceDocument.sha256 !== HANJA_DOCUMENT_SOURCE.documentSha256
    || !recipe || !text(recipe.id) || !text(recipe.notes)
    || recipe.originalMediansSha256 !== originalMediansHashes[record.glyph]
    || !Array.isArray(recipe.strokes) || recipe.strokes.length !== 8) {
    throw new Error('Document recipe source or original medians mismatch')
  }
  const assigned = new Set<number>()
  for (const stroke of recipe.strokes) {
    if (!stroke || !Number.isSafeInteger(stroke.sourceStroke) || stroke.sourceStroke < 1
      || stroke.sourceStroke > 8 || assigned.has(stroke.sourceStroke)) {
      throw new Error('Document recipe stroke mapping invalid')
    }
    assigned.add(stroke.sourceStroke)
    if (stroke.points !== undefined && (!Array.isArray(stroke.points) || stroke.points.length < 2
      || stroke.points.some((point: readonly number[]) => !Array.isArray(point) || point.length !== 2
        || point.some(value => !Number.isFinite(value) || value < 0 || value > 100)))) {
      throw new Error('Document recipe display points invalid')
    }
  }
  if (!isHash(record.recipeSha256) || record.recipeSha256 !== documentRecipeSha256(record)) {
    throw new Error('Document recipe hash mismatch')
  }
  return recipe
}

function checkRecord(record: DocumentReviewRecord, expectedStrokes: number) {
  if (record.status !== 'matched') throw new Error('Document review not completed: ' + record.glyph)
  const source = record.sourceDocument
  const forbidden = record as DocumentReviewRecord & Record<string, unknown>
  if (expectedStrokes !== 8 || record.expectedStrokes !== expectedStrokes
    || !source || source.url !== HANJA_DOCUMENT_SOURCE.downloadUrl
    || source.sha256 !== HANJA_DOCUMENT_SOURCE.documentSha256 || source.bytes !== HANJA_DOCUMENT_SOURCE.documentBytes
    || source.glyph !== record.glyph || source.pdfPage !== DOCUMENT_GLYPH_PAGES[record.glyph]
    || source.printedPage !== source.pdfPage || source.cumulativePanels !== expectedStrokes
    || !isDeepStrictEqual(record.directionEvidence, DOCUMENT_DIRECTION_SOURCES[record.glyph])
    || ['sourceVideo', 'manifestRow', 'videoFilename', 'strokeEndsSeconds', 'sourceImage', 'sourceRow',
      'sourceWholeImage', 'geometryAuthored', 'strokeOrder'].some(key => forbidden[key] !== undefined)) {
    throw new Error('Document source or direction evidence mismatch: ' + record.glyph)
  }
  const recipe = checkRecipe(record)
  if (!validDate(record.reviewedAt) || !text(record.reviewer)
    || record.reviewMethod !== 'document-cumulative-and-official-direction'
    || !matches(record.checks) || !text(record.notes) || !isHash(record.pathsSha256)
    || !Array.isArray(record.steps) || record.steps.length !== expectedStrokes
    || record.steps.some((step, index) => !step || step.stroke !== index + 1 || step.panel !== index + 1
      || step.directionTrack !== index + 1 || step.sourceStroke !== recipe.strokes[index].sourceStroke
      || !matches(step) || !text(step.notes))) {
    throw new Error('Document whole-glyph comparison incomplete: ' + record.glyph)
  }
}

/** Only the exact original candidate can generate the recorded display recipe. */
export function documentGeometry(record: DocumentReviewRecord, original: Medians) {
  const recipe = checkRecipe(record)
  if (!Array.isArray(original) || original.length !== record.candidateStrokes
    || hash(original) !== recipe.originalMediansSha256) {
    throw new Error('Document original medians changed: ' + record.glyph)
  }
  const normalized = normalizeMedians(original)
  const paths = recipe.strokes.map(stroke => stroke.points
    ? stroke.points.map(([x, y], index) => (index ? 'L' : 'M') + x + ' ' + y).join(' ')
    : normalized[stroke.sourceStroke - 1])
  paths.forEach(path => samplePath(path, 2))
  return { paths, sourceStrokeIndices: recipe.strokes.map(stroke => stroke.sourceStroke) }
}

/** A complete ledger record, exact source reference and path hash are all required. */
export function validateDocumentReview(
  review: HanjaDocumentStrokeData,
  expectedStrokes: number,
  ledger: DocumentReviewRegistry = DOCUMENT_REVIEW_REGISTRY,
): DocumentReviewRecord {
  checkLedger(ledger)
  const record = ledger.records.find(entry => entry.glyph === review.glyph)
  if (!record) throw new Error('Document review missing: ' + review.glyph)
  checkRecord(record, expectedStrokes)
  if (review.verificationSource !== HANJA_DOCUMENT_SOURCE.id
    || review.verifiedAt !== record.reviewedAt || review.geometrySource !== record.geometrySource
    || review.geometryCorrection !== record.geometryRecipe.id
    || !isDeepStrictEqual(review.sourceReference, sourceReference(record))
    || !isDeepStrictEqual(review.sourceStrokeIndices, record.geometryRecipe.strokes.map(stroke => stroke.sourceStroke))
    || review.sourceImage !== undefined || review.sourceRow !== undefined || review.sourceWholeImage !== undefined
    || review.geometryAuthored !== undefined || review.strokeOrder !== undefined
    || !Array.isArray(review.paths) || review.paths.length !== expectedStrokes
    || review.pathsSha256 !== record.pathsSha256 || hash(review.paths) !== record.pathsSha256) {
    throw new Error('Document runtime provenance or path hash mismatch: ' + review.glyph)
  }
  review.paths.forEach(path => samplePath(path, 2))
  return record
}

/** Deterministic data generation only; this function never changes review status or writes a file. */
export function buildDocumentBundle(
  candidates: readonly DocumentCandidate[],
  ledger: DocumentReviewRegistry = DOCUMENT_REVIEW_REGISTRY,
) {
  checkLedger(ledger)
  if (!Array.isArray(candidates)) throw new Error('Document candidates invalid')
  const index = new Map<string, DocumentCandidate>()
  for (const candidate of candidates) {
    if (!candidate || typeof candidate.character !== 'string' || [...candidate.character].length !== 1
      || index.has(candidate.character)) throw new Error('Duplicate or invalid document candidate')
    index.set(candidate.character, candidate)
  }
  const characters = ledger.records.filter(record => record.status === 'matched').map(record => {
    checkRecord(record, record.expectedStrokes)
    const candidate = index.get(record.glyph)
    if (!candidate || (candidate.strokes !== undefined && (!Array.isArray(candidate.strokes)
      || candidate.strokes.length !== record.candidateStrokes))) throw new Error('Document candidate missing or count mismatch')
    const { paths, sourceStrokeIndices } = documentGeometry(record, candidate.medians)
    const entry: HanjaDocumentStrokeData = {
      glyph: record.glyph, verificationSource: HANJA_DOCUMENT_SOURCE.id, verifiedAt: record.reviewedAt,
      geometrySource: record.geometrySource, geometryCorrection: record.geometryRecipe.id,
      sourceStrokeIndices, pathsSha256: hash(paths), sourceReference: sourceReference(record), paths,
    }
    validateDocumentReview(entry, record.expectedStrokes, ledger)
    const { verificationSource: _source, ...published } = entry
    return published
  })
  return {
    verificationSource: DOCUMENT_VERIFICATION_METADATA,
    geometrySource: HANJA_DOCUMENT_GEOMETRY_SOURCE,
    characters,
  }
}
