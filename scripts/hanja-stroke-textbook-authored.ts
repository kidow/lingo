/** Build-time provenance for locally authored centerlines. This registry is not an approval ledger. */
import { createHash } from 'node:crypto'
import { isDeepStrictEqual } from 'node:util'
import registry from './hanja-stroke-textbook-authored.json' with { type: 'json' }
import { HANJA_STROKES, type HanjaStrokeData, type HanjaTextbookStrokeData } from '../lib/hanja-strokes.ts'
import { fitPaths, samplePath, type Box } from './hanja-component-geometry.ts'

export type TextbookAuthoredPart = {
  glyph: string
  approvedPathIndices: readonly number[]
  targetPathIndices: readonly number[]
  donorPathsSha256: string
  geometrySource?: string
  donorVerificationSource: 'eomunhoe-f37' | 'vivasam-high-2022'
  sourceReference?: HanjaTextbookStrokeData['sourceReference']
  sourceImage?: string
  sourceRow?: number
  sourceWholeImage?: boolean
  verifiedAt?: string
  upstreamIndices: readonly (number | null)[]
  sourceBox: Box
  targetBox: Box
  transform: { sx: number; sy: number; tx: number; ty: number }
  paths: readonly string[]
}
export type TextbookAuthored = {
  id: string
  glyph: string
  sourceVideoSha256: string
  paths: readonly string[]
  pathsSha256: string
  authoredPathIndices: readonly number[]
  borrowedParts: readonly TextbookAuthoredPart[]
  notes: readonly string[]
}
export type TextbookAuthoredContext = {
  entries?: readonly TextbookAuthored[]
  donors?: readonly HanjaStrokeData[]
}
type AuthoredReview = {
  glyph: string
  geometrySource?: string
  geometryAuthored?: string
  geometryCorrection?: string
  correctionSha256?: string
  expectedStrokes?: number
  sourceVideo?: { sha256: string }
}

// JSON string literals are widened by TypeScript; every entry is runtime-validated before use.
export const TEXTBOOK_AUTHORED = registry.entries as readonly TextbookAuthored[]
if (registry.version !== 1) throw new Error('Unsupported textbook authored registry version')
const sha256 = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const isHash = (value: string) => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value)
const isArray = (value: unknown): boolean => Array.isArray(value)

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical)
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined)
      .sort(([a], [b]) => a.localeCompare(b, 'en')).map(([key, item]) => [key, canonical(item)]))
  }
  return value
}

/** Fixed schema version and recursively ordered keys; array order is significant. */
export function textbookAuthoredSha256(entry: TextbookAuthored): string {
  return sha256(canonical({ version: 1, ...entry }))
}

function indices(values: readonly number[], limit: number, label: string) {
  if (!isArray(values) || values.some((value, index) => !Number.isSafeInteger(value)
    || value < 1 || value > limit || (index > 0 && value <= values[index - 1]))) {
    throw new Error(`Textbook authored ${label} indices invalid`)
  }
}

/** Verify final approved donor paths, never foreign corpus indices or a draft donor. */
export function validateTextbookAuthored(entry: TextbookAuthored, donors: readonly HanjaStrokeData[] = HANJA_STROKES) {
  if (!entry.id?.trim() || [...entry.glyph].length !== 1 || !isHash(entry.sourceVideoSha256)
    || !isArray(entry.paths) || !entry.paths.length || !isHash(entry.pathsSha256)
    || sha256(entry.paths) !== entry.pathsSha256 || !isArray(entry.borrowedParts)
    || !isArray(entry.notes) || !entry.notes.length || entry.notes.some(note => typeof note !== 'string' || !note.trim())) {
    throw new Error(`Textbook authored geometry invalid: ${entry.glyph}`)
  }
  entry.paths.forEach(path => samplePath(path, 2))
  indices(entry.authoredPathIndices, entry.paths.length, 'authored')
  const assigned = new Set(entry.authoredPathIndices)
  for (const part of entry.borrowedParts) {
    const matches = donors.filter(donor => donor.glyph === part.glyph)
    const donor = matches[0]
    if (matches.length !== 1 || !donor || donor.glyph === entry.glyph
      || !isHash(part.donorPathsSha256) || sha256(donor.paths) !== part.donorPathsSha256
      || part.geometrySource !== donor.geometrySource
      || part.donorVerificationSource !== (donor.verificationSource ?? 'eomunhoe-f37')
      || !isDeepStrictEqual(part.sourceReference, donor.sourceReference)
      || part.sourceImage !== donor.sourceImage || part.sourceRow !== donor.sourceRow
      || part.sourceWholeImage !== donor.sourceWholeImage || part.verifiedAt !== donor.verifiedAt) {
      throw new Error(`Textbook authored donor provenance mismatch: ${entry.glyph}/${part.glyph}`)
    }
    indices(part.approvedPathIndices, donor.paths.length, 'donor')
    indices(part.targetPathIndices, entry.paths.length, 'target')
    if (!part.approvedPathIndices.length || part.approvedPathIndices.length !== part.targetPathIndices.length
      || part.paths.length !== part.targetPathIndices.length) {
      throw new Error(`Textbook authored donor mapping incomplete: ${entry.glyph}`)
    }
    const upstream = part.approvedPathIndices.map(index => donor.sourceStrokeIndices !== undefined
      ? donor.sourceStrokeIndices[index - 1] : donor.strokeOrder?.[index - 1] ?? index)
    if (!isDeepStrictEqual(upstream, part.upstreamIndices)) {
      throw new Error(`Textbook authored donor upstream mapping mismatch: ${entry.glyph}`)
    }
    const fitted = fitPaths(part.approvedPathIndices.map(index => donor.paths[index - 1]), part.targetBox)
    if (!isDeepStrictEqual(fitted.sourceBox, part.sourceBox)
      || !isDeepStrictEqual(fitted.transform, part.transform) || !isDeepStrictEqual(fitted.paths, part.paths)) {
      throw new Error(`Textbook authored donor affine mismatch: ${entry.glyph}`)
    }
    part.targetPathIndices.forEach((index, offset) => {
      if (assigned.has(index) || entry.paths[index - 1] !== part.paths[offset]) {
        throw new Error(`Textbook authored target assignment mismatch: ${entry.glyph}`)
      }
      assigned.add(index)
    })
  }
  if (assigned.size !== entry.paths.length) throw new Error(`Textbook authored unassigned stroke: ${entry.glyph}`)
  return entry
}

export function textbookAuthored(record: AuthoredReview, context: TextbookAuthoredContext = {}) {
  if (record.geometryAuthored === undefined) return undefined
  if (record.geometryCorrection !== undefined || record.correctionSha256 !== undefined) {
    throw new Error(`Textbook authored and correction provenance cannot be mixed: ${record.glyph}`)
  }
  const entries = context.entries ?? TEXTBOOK_AUTHORED
  const matches = entries.filter(entry => entry.id === record.geometryAuthored)
  const entry = matches[0]
  if (matches.length !== 1 || !entry || entry.glyph !== record.glyph
    || entries.filter(item => item.glyph === entry.glyph).length !== 1
    || record.geometrySource !== textbookAuthoredSha256(entry)
    || record.sourceVideo?.sha256 !== entry.sourceVideoSha256
    || record.expectedStrokes !== entry.paths.length) {
    throw new Error(`Textbook authored evidence mismatch: ${record.glyph}`)
  }
  return validateTextbookAuthored(entry, context.donors)
}

/** No claim that a locally composed entry originated in Ko, Ja, or Make Me a Hanzi. */
export function textbookAuthoredSourceMetadata(entry: TextbookAuthored) {
  const metadata = {
    kind: 'local-authored', id: entry.id, glyph: entry.glyph, sha256: textbookAuthoredSha256(entry),
    registry: 'scripts/hanja-stroke-textbook-authored.json',
    license: 'Local authored centerlines; borrowed geometry retains the donor license and notices.',
    donorSources: entry.borrowedParts.map(part => ({
      glyph: part.glyph, geometrySource: part.geometrySource,
      verificationSource: part.donorVerificationSource,
      ...(part.sourceReference ? { sourceReference: part.sourceReference } : { sourceImage: part.sourceImage, sourceRow: part.sourceRow }),
      license: part.geometrySource === 'a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee'
        ? 'Arphic Public License; see ARPHICPL.txt and MAKEMEAHANZI-COPYING.txt in this directory.'
        : ['7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e', '2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8'].includes(part.geometrySource ?? '')
          ? 'Arphic Public License; see ARPHICPL.txt and COPYING.txt in this directory.'
          : 'Locally recorded donor geometry; see its separate provenance and notices.',
    })),
  }
  // Local sources have a repository reference, not an invented upstream URL.
  return metadata as typeof metadata & { url?: never }
}
