/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_GEOMETRY_BATCH5_DICTIONARY_VERIFICATION, G2_GEOMETRY_BATCH5_DICTIONARY_GEOMETRY, G2_GEOMETRY_BATCH5_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_GEOMETRY_BATCH5_STROKES, g2GeometryBatch5DictionaryReference, g2GeometryBatch5DictionaryMetadata,
  type G2GeometryBatch5DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-geometry-batch5.ts'

const dir = 'docs/hanja-g2-geometry-batch5-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH5_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_GEOMETRY_BATCH5_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-geometry-batch5-2026-09-16/initial-observations.json": "14e167efd66d5ad71144c76f992cb3b0d2948afacebc44d789020108e4b172b9",
  "docs/hanja-g2-geometry-batch5-2026-09-16/originals.json": "6942c6cd85af5ec54bab980f0dc3bd100e0fd1db4bec235245fa91a9869f1c09",
  "docs/hanja-g2-geometry-batch5-2026-09-16/observations.json": "f602af76e2a00ca80c0d463c0dcd3831ffa8b75e60025c425ab005e388879269",
  "docs/hanja-g2-geometry-batch5-2026-09-16/proposals.json": "01b1986859f8b8655ff56d473a421aba9e14cb8eb0da2822b268d61441008171",
  "docs/hanja-g2-geometry-batch5-2026-09-16/source-checks.json": "2f8c10a112629ec7f76ac99e7f75e2826c4aba2ce9cb8c6c4ae2a3b7ad449060",
  "docs/hanja-g2-geometry-batch5-2026-09-16/corrections.json": "4419cb5e4530eacb9a97970ff1765c8fbbe9eae1c139dd172ca215e0f1886c79",
  "docs/hanja-g2-geometry-batch5-2026-09-16/candidate-paths.json": "598c8d5b55cda31dd0225a4aa6e977b0a75ee6f8ae97e61cb099c98f8de807b0",
  "docs/hanja-g2-geometry-batch5-2026-09-16/review.json": "e61b4fc9caba4b50c3141584f3d01bca31e285fcfed87d02e9dcf678f671cb4d"
}
export function validateG2GeometryBatch5DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_GEOMETRY_BATCH5_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 geometry-batch5 dictionary proof mismatch: ' + path)
  }
}
export function g2GeometryBatch5DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2GeometryBatch5DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 geometry-batch5 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 geometry-batch5 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 geometry-batch5 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 geometry-batch5 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 geometry-batch5 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2GeometryBatch5DictionaryBundle(): G2GeometryBatch5DictionaryBundle {
  validateG2GeometryBatch5DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_GEOMETRY_BATCH5_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_GEOMETRY_BATCH5_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_GEOMETRY_BATCH5_DICTIONARY_GEOMETRY) || originals.entries.length !== 3
    || new Set(originals.entries.map(e => e.glyph)).size !== 3 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 geometry-batch5 dictionary approved set mismatch')
  const characters = G2_GEOMETRY_BATCH5_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G2 geometry-batch5 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2GeometryBatch5DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 geometry-batch5 dictionary frozen candidate mismatch')
    return { ...g2GeometryBatch5DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_GEOMETRY_BATCH5_DICTIONARY_VERIFICATION, geometrySources: G2_GEOMETRY_BATCH5_DICTIONARY_GEOMETRY, characters }
}
export function validateG2GeometryBatch5DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2GeometryBatch5DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_GEOMETRY_BATCH5_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 geometry-batch5 dictionary published entry mismatch')
}
export function validateG2GeometryBatch5DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_GEOMETRY_BATCH5_STROKES) {
  const expected = buildG2GeometryBatch5DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_GEOMETRY_BATCH5_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 geometry-batch5 dictionary published bundle mismatch')
}
