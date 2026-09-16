/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_GEOMETRY_BATCH15_DICTIONARY_VERIFICATION, G2_GEOMETRY_BATCH15_DICTIONARY_GEOMETRY, G2_GEOMETRY_BATCH15_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES, g2GeometryBatch15DictionaryReference, g2GeometryBatch15DictionaryMetadata,
  type G2GeometryBatch15DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-geometry-batch15.ts'

const dir = 'docs/hanja-g2-geometry-batch15-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH15_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; additionalDerivedFromStrokes?: number[]; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_GEOMETRY_BATCH15_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-geometry-batch15-2026-09-16/initial-observations.json": "52997cb26f8dfb370a41c96498b247e6893a78b17af93a62cac333d93c290a10",
  "docs/hanja-g2-geometry-batch15-2026-09-16/originals.json": "06402b72fe34e17e44afcde5034cdca18faa14b57169519f08bf4a1af5494eb8",
  "docs/hanja-g2-geometry-batch15-2026-09-16/observations.json": "be02db2924518e01c86c0d64e4595a3661edfdc736c3018ad6799fe0c9b83ca2",
  "docs/hanja-g2-geometry-batch15-2026-09-16/proposals.json": "a06de0b317b91751267488764949e1f623dbc2568e09cabb93b055c3a6d5e5e4",
  "docs/hanja-g2-geometry-batch15-2026-09-16/source-checks.json": "9ac51d9830287a135164aacf509750544dc253319540d7d7e942b109600a6e7e",
  "docs/hanja-g2-geometry-batch15-2026-09-16/corrections.json": "574528505b64f0ba7f994eed8b6c6cfa7d2885be7c561ca4eefcf591e8079ede",
  "docs/hanja-g2-geometry-batch15-2026-09-16/candidate-paths.json": "284ce945dc4ec19d2cd2f605f0ea2d4bd9a4478543476593d61f9b66e0dc39b4",
  "docs/hanja-g2-geometry-batch15-2026-09-16/review.json": "de20811600e12069b78daf0f3a02198ae1a539207e7e6c5f0dbac1ab4af04f9c"
}
export function validateG2GeometryBatch15DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_GEOMETRY_BATCH15_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 geometry-batch15 dictionary proof mismatch: ' + path)
  }
}
export function g2GeometryBatch15DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2GeometryBatch15DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 geometry-batch15 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 geometry-batch15 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string; additionalOriginalSources?: { stroke: number; path: string }[] }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 geometry-batch15 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 geometry-batch15 dictionary authored path mismatch')
    const extra = r.additionalDerivedFromStrokes ?? []
    if (new Set(extra).size !== extra.length || extra.some(n => !Number.isInteger(n) || n < 1 || n > originalPaths.length || n === r.derivedFromStroke)
      || !isDeepStrictEqual(edit.additionalOriginalSources ?? [], extra.map(n => ({ stroke: n, path: originalPaths[n - 1] }))))
      throw Error('G2 geometry-batch15 dictionary merged source mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 geometry-batch15 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2GeometryBatch15DictionaryBundle(): G2GeometryBatch15DictionaryBundle {
  validateG2GeometryBatch15DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_GEOMETRY_BATCH15_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_GEOMETRY_BATCH15_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_GEOMETRY_BATCH15_DICTIONARY_GEOMETRY) || originals.entries.length !== 3
    || new Set(originals.entries.map(e => e.glyph)).size !== 3 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 geometry-batch15 dictionary approved set mismatch')
  const characters = G2_GEOMETRY_BATCH15_DICTIONARY_REFERENCES.map(ref => {
    const original = originals.entries.find(e => e.glyph === ref.glyph)
    const observation = observations.entries.find(e => e.glyph === ref.glyph)
    const source = sourceChecks.entries.find(e => e.glyph === ref.glyph)
    const expectedChecks = { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' }
    if (!original || original.corpus !== ref.corpus || original.catalogStrokes !== ref.strokes || original.dictionaryStrokes !== ref.strokes || original.strokes !== ref.originalStrokes || original.medians.length !== ref.originalStrokes
      || original.originalMediansSha256 !== ref.originalMediansSha256
      || !isDeepStrictEqual(normalizeMedians(original.medians), original.paths)
      || original.dictionary.url !== ref.dictionaryUrl || original.dictionary.sha256 !== ref.dictionarySha256
      || !observation || observation.decision !== 'matched' || observation.directions.length !== ref.strokes
      || !isDeepStrictEqual(observation.checks, expectedChecks)
      || (observation.initialDecision !== 'matched' && (!observation.correctedReview?.completed
        || observation.correctedReview.reviewedStrokes !== ref.strokes
        || !isDeepStrictEqual(observation.correctedReview.checks, expectedChecks)))
      || !source || !isDeepStrictEqual(source.dictionary, original.dictionary)
      || source.strokes.length !== ref.strokes || new Set(source.strokes.map(s => s.xmlIndex)).size !== ref.strokes
      || source.strokes.some((s, i, list) => s.duration <= 0 || s.delay < 0 || (i > 0 && s.delay < list[i - 1].delay + list[i - 1].duration)))
      throw Error('G2 geometry-batch15 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2GeometryBatch15DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 geometry-batch15 dictionary frozen candidate mismatch')
    return { ...g2GeometryBatch15DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_GEOMETRY_BATCH15_DICTIONARY_VERIFICATION, geometrySources: G2_GEOMETRY_BATCH15_DICTIONARY_GEOMETRY, characters }
}
export function validateG2GeometryBatch15DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2GeometryBatch15DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_GEOMETRY_BATCH15_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 geometry-batch15 dictionary published entry mismatch')
}
export function validateG2GeometryBatch15DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES) {
  const expected = buildG2GeometryBatch15DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_GEOMETRY_BATCH15_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 geometry-batch15 dictionary published bundle mismatch')
}
