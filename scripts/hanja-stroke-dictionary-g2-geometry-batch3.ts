/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_GEOMETRY_BATCH3_DICTIONARY_VERIFICATION, G2_GEOMETRY_BATCH3_DICTIONARY_GEOMETRY, G2_GEOMETRY_BATCH3_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_GEOMETRY_BATCH3_STROKES, g2GeometryBatch3DictionaryReference, g2GeometryBatch3DictionaryMetadata,
  type G2GeometryBatch3DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-geometry-batch3.ts'

const dir = 'docs/hanja-g2-geometry-batch3-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH3_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_GEOMETRY_BATCH3_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-geometry-batch3-2026-09-16/initial-observations.json": "b4a767ceb9eab0d5f33f99a140d3faccd958fe9590ec404b706df2379d461e79",
  "docs/hanja-g2-geometry-batch3-2026-09-16/originals.json": "b1be23c5a8ac0369101ed181af533ae76cff31dfb5f9ebcc61a4fb57bda9b08c",
  "docs/hanja-g2-geometry-batch3-2026-09-16/observations.json": "b157c7f6925f69b475a498b25589e04a47e50c6afc7b9d53f476a8ba72b1691f",
  "docs/hanja-g2-geometry-batch3-2026-09-16/proposals.json": "5be277262f1140541b44cf6b13240d66e1ef52738d98e0b7cd04770ea0e2a18a",
  "docs/hanja-g2-geometry-batch3-2026-09-16/source-checks.json": "acf9c2921104601c84b24811ba88ee4cffa00b06c85999ca29ec9c39f9d9f06a",
  "docs/hanja-g2-geometry-batch3-2026-09-16/corrections.json": "8024495ff89ba8875b4b227a4f483e0ec335329686f69fc40913aca96df70a0a",
  "docs/hanja-g2-geometry-batch3-2026-09-16/candidate-paths.json": "302f54556abe522afd2ff1e127f0a53249d5b2bfd7d4283ce8ec0cb2cd1cad5e",
  "docs/hanja-g2-geometry-batch3-2026-09-16/review.json": "eafcda9d7c16236834e3e18de16af6699b6211ad39483ac0d775da0fd98c7cc2"
}
export function validateG2GeometryBatch3DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_GEOMETRY_BATCH3_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 geometry-batch3 dictionary proof mismatch: ' + path)
  }
}
export function g2GeometryBatch3DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2GeometryBatch3DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 geometry-batch3 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 geometry-batch3 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 geometry-batch3 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 geometry-batch3 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 geometry-batch3 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2GeometryBatch3DictionaryBundle(): G2GeometryBatch3DictionaryBundle {
  validateG2GeometryBatch3DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_GEOMETRY_BATCH3_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_GEOMETRY_BATCH3_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_GEOMETRY_BATCH3_DICTIONARY_GEOMETRY) || originals.entries.length !== 3
    || new Set(originals.entries.map(e => e.glyph)).size !== 3 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 geometry-batch3 dictionary approved set mismatch')
  const characters = G2_GEOMETRY_BATCH3_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G2 geometry-batch3 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2GeometryBatch3DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 geometry-batch3 dictionary frozen candidate mismatch')
    return { ...g2GeometryBatch3DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_GEOMETRY_BATCH3_DICTIONARY_VERIFICATION, geometrySources: G2_GEOMETRY_BATCH3_DICTIONARY_GEOMETRY, characters }
}
export function validateG2GeometryBatch3DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2GeometryBatch3DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_GEOMETRY_BATCH3_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 geometry-batch3 dictionary published entry mismatch')
}
export function validateG2GeometryBatch3DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_GEOMETRY_BATCH3_STROKES) {
  const expected = buildG2GeometryBatch3DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_GEOMETRY_BATCH3_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 geometry-batch3 dictionary published bundle mismatch')
}
