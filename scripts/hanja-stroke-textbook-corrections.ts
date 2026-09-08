import { createHash } from 'node:crypto'
import registry from './hanja-stroke-textbook-corrections.json' with { type: 'json' }
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'

type Medians = readonly (readonly (readonly number[])[])[]
export type TextbookCorrection = {
  glyph: string
  id: string
  geometrySource: string
  sourceVideoSha256: string
  originalMediansSha256: string
  /** null identifies a separately authored, video-reviewed stroke; explicit points are required. */
  strokes: readonly { sourceStroke: number | null; points?: readonly (readonly number[])[] }[]
  notes: string
}
type CorrectionReview = {
  glyph: string
  geometryCorrection?: string
  correctionSha256?: string
  geometrySource?: string
  expectedStrokes: number
  sourceVideo?: { sha256: string }
}

export const TEXTBOOK_CORRECTIONS: readonly TextbookCorrection[] = registry.recipes
const koSha = '7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e'

/** Pin both the output geometry and its exact correspondence to upstream strokes. */
export function textbookCorrectionSha256(recipe: TextbookCorrection) {
  const canonical = { glyph: recipe.glyph, id: recipe.id, geometrySource: recipe.geometrySource,
    sourceVideoSha256: recipe.sourceVideoSha256, originalMediansSha256: recipe.originalMediansSha256,
    strokes: recipe.strokes.map(({ sourceStroke, points }) => ({ sourceStroke, ...(points ? { points } : {}) })),
    notes: recipe.notes }
  return createHash('sha256').update(JSON.stringify(canonical)).digest('hex')
}

/** Only a named whole-glyph video comparison can authorize these local vector edits. */
export function textbookCorrection(record: CorrectionReview,
  recipes: readonly TextbookCorrection[] = TEXTBOOK_CORRECTIONS) {
  if (record.geometryCorrection === undefined) return undefined
  const matches = recipes.filter((recipe) => recipe.glyph === record.glyph && recipe.id === record.geometryCorrection)
  const recipe = matches[0]
  if (matches.length !== 1 || !recipe || recipe.geometrySource !== (record.geometrySource ?? koSha)
    || !/^[a-f0-9]{64}$/.test(recipe.sourceVideoSha256)
    || recipe.sourceVideoSha256 !== record.sourceVideo?.sha256
    || record.correctionSha256 !== textbookCorrectionSha256(recipe)
    || !/^[a-f0-9]{64}$/.test(recipe.originalMediansSha256)
    || recipe.strokes.length !== record.expectedStrokes || !recipe.notes.trim()) {
    throw new Error(`Textbook correction evidence mismatch: ${record.glyph}`)
  }
  return recipe
}

export function textbookGeometry(record: CorrectionReview, original: Medians,
  recipes: readonly TextbookCorrection[] = TEXTBOOK_CORRECTIONS) {
  const recipe = textbookCorrection(record, recipes)
  if (!recipe) return { paths: normalizeMedians(original), sourceStrokeIndices: undefined }
  if (recipe.originalMediansSha256 !== createHash('sha256').update(JSON.stringify(original)).digest('hex')) {
    throw new Error(`Textbook correction original geometry changed: ${record.glyph}`)
  }
  const medians = recipe.strokes.map(({ sourceStroke, points }) => {
    if (sourceStroke !== null && (!Number.isSafeInteger(sourceStroke) || sourceStroke < 1 || sourceStroke > original.length)) {
      throw new Error(`Textbook correction source index invalid: ${record.glyph}`)
    }
    const stroke = points ?? (sourceStroke === null ? undefined : original[sourceStroke - 1])
    if (!stroke || stroke.length < 2 || stroke.some((point) => point.length !== 2 || point.some((value) => !Number.isFinite(value)))) {
      throw new Error(`Textbook correction points invalid: ${record.glyph}`)
    }
    return stroke
  })
  return { paths: normalizeMedians(medians), sourceStrokeIndices: recipe.strokes.map((stroke) => stroke.sourceStroke) }
}
