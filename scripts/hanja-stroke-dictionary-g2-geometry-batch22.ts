/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch22-2026-09-17/compose.ts'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_GEOMETRY_BATCH22_DICTIONARY_VERIFICATION, G2_GEOMETRY_BATCH22_DICTIONARY_GEOMETRY, G2_GEOMETRY_BATCH22_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_GEOMETRY_BATCH22_STROKES, g2GeometryBatch22DictionaryReference, g2GeometryBatch22DictionaryMetadata,
  type G2GeometryBatch22DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-geometry-batch22.ts'

const dir = 'docs/hanja-g2-geometry-batch22-2026-09-17/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH22_DICTIONARY_GEOMETRY
  components?: DictionaryComponent[]; componentsSha256?: string; medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; additionalDerivedFromStrokes?: number[]; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_GEOMETRY_BATCH22_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-geometry-batch22-2026-09-17/compose.ts": "a1dcb1da03ce4d489e2e7e0f0fe28156544c4e1237d014411710949eee0b1cb7",
  "docs/hanja-g2-geometry-batch22-2026-09-17/initial-observations.json": "feb6940ec0da661f96378064a3c4810e8c8b1aacb8345d52f60a54e3180562b9",
  "docs/hanja-g2-geometry-batch22-2026-09-17/originals.json": "13a7c6aaeaeb0e0577248b50a8a884c1908438a6207cc47a9ff0e724c9ce5f3b",
  "docs/hanja-g2-geometry-batch22-2026-09-17/observations.json": "d8ab219f945a99189a465c604cb24732ee7382c381a528b09d2a79484b4d6a79",
  "docs/hanja-g2-geometry-batch22-2026-09-17/proposals.json": "bb500fce9274e823a8e30cf52bef5d6a58ee844e2db51166c23b46a3e6b8ffb8",
  "docs/hanja-g2-geometry-batch22-2026-09-17/source-checks.json": "0b7db7bf7fee011c36dd54ea8813757439ddc65a695d0909af4263fc4d2ce2a9",
  "docs/hanja-g2-geometry-batch22-2026-09-17/corrections.json": "9591745f93d10d1c0c424c146387d903dad5549f26ca5ddcaebe411b2408c8ab",
  "docs/hanja-g2-geometry-batch22-2026-09-17/candidate-paths.json": "6b832cb5fd274699c36da7f3723a9d1e581165af87b457fa6c7b8b2ef60e8d42",
  "docs/hanja-g2-geometry-batch22-2026-09-17/review.json": "014840d70dd4ef3a792b7d171f88bdd79603e5de2601c71648c039e0536a884d"
}
export function validateG2GeometryBatch22DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_GEOMETRY_BATCH22_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 geometry-batch22 dictionary proof mismatch: ' + path)
  }
}
export function g2GeometryBatch22DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2GeometryBatch22DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 geometry-batch22 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 geometry-batch22 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string; additionalOriginalSources?: { stroke: number; path: string }[] }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 geometry-batch22 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 geometry-batch22 dictionary authored path mismatch')
    const extra = r.additionalDerivedFromStrokes ?? []
    if (new Set(extra).size !== extra.length || extra.some(n => !Number.isInteger(n) || n < 1 || n > originalPaths.length || n === r.derivedFromStroke)
      || !isDeepStrictEqual(edit.additionalOriginalSources ?? [], extra.map(n => ({ stroke: n, path: originalPaths[n - 1] }))))
      throw Error('G2 geometry-batch22 dictionary merged source mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 geometry-batch22 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2GeometryBatch22DictionaryBundle(): G2GeometryBatch22DictionaryBundle {
  validateG2GeometryBatch22DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_GEOMETRY_BATCH22_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_GEOMETRY_BATCH22_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_GEOMETRY_BATCH22_DICTIONARY_GEOMETRY) || originals.entries.length !== 3
    || new Set(originals.entries.map(e => e.glyph)).size !== 3 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 geometry-batch22 dictionary approved set mismatch')
  if (hash(Object.fromEntries(originals.entries.map(e => [e.glyph, e.components]))) !== originals.sources.Components.sha256) throw Error('G2 geometry-batch22 component collection mismatch')
  const characters = G2_GEOMETRY_BATCH22_DICTIONARY_REFERENCES.map(ref => {
    const original = originals.entries.find(e => e.glyph === ref.glyph)
    const observation = observations.entries.find(e => e.glyph === ref.glyph)
    const source = sourceChecks.entries.find(e => e.glyph === ref.glyph)
    if (original?.corpus === 'Components' && (!original.components || hash(original.components) !== original.componentsSha256
      || original.components.some(c => c.corpus !== 'MM' || c.sourceSha256 !== originals.sources.MM.sha256)
      || !isDeepStrictEqual(compose(original.components), original.medians))) throw Error('G2 geometry-batch22 component source mismatch')
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
      throw Error('G2 geometry-batch22 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2GeometryBatch22DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 geometry-batch22 dictionary frozen candidate mismatch')
    return { ...g2GeometryBatch22DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_GEOMETRY_BATCH22_DICTIONARY_VERIFICATION, geometrySources: G2_GEOMETRY_BATCH22_DICTIONARY_GEOMETRY, characters }
}
export function validateG2GeometryBatch22DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2GeometryBatch22DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_GEOMETRY_BATCH22_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 geometry-batch22 dictionary published entry mismatch')
}
export function validateG2GeometryBatch22DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_GEOMETRY_BATCH22_STROKES) {
  const expected = buildG2GeometryBatch22DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_GEOMETRY_BATCH22_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 geometry-batch22 dictionary published bundle mismatch')
}
