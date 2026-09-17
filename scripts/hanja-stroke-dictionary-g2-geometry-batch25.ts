/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch25-2026-09-17/compose.ts'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_GEOMETRY_BATCH25_DICTIONARY_VERIFICATION, G2_GEOMETRY_BATCH25_DICTIONARY_GEOMETRY, G2_GEOMETRY_BATCH25_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES, g2GeometryBatch25DictionaryReference, g2GeometryBatch25DictionaryMetadata,
  type G2GeometryBatch25DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-geometry-batch25.ts'

const dir = 'docs/hanja-g2-geometry-batch25-2026-09-17/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH25_DICTIONARY_GEOMETRY
  components?: DictionaryComponent[]; componentsSha256?: string; medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; additionalDerivedFromStrokes?: number[]; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_GEOMETRY_BATCH25_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-geometry-batch25-2026-09-17/compose.ts": "a1dcb1da03ce4d489e2e7e0f0fe28156544c4e1237d014411710949eee0b1cb7",
  "docs/hanja-g2-geometry-batch25-2026-09-17/initial-observations.json": "4c1970b7fffa7928fb4b364c23a3d84df5fad1b41776b145e04a69f090fd378b",
  "docs/hanja-g2-geometry-batch25-2026-09-17/originals.json": "cd3d1840dd8a0854e419655379abb1e7d84ec18d49b9c5e7f9a1cb8091a43e93",
  "docs/hanja-g2-geometry-batch25-2026-09-17/observations.json": "eb7cac25ca1c701a81a341d849e019ed3112d01c3ab75a9f7e9786e72652c92c",
  "docs/hanja-g2-geometry-batch25-2026-09-17/proposals.json": "179db977e49a90c48574179517572e481b76cce15f9efc6e8897f783a46fc2ea",
  "docs/hanja-g2-geometry-batch25-2026-09-17/source-checks.json": "24082f397a4f8065e3be3c44042a9b7fb5e4614df6bf74d0e5711241bd2c04ca",
  "docs/hanja-g2-geometry-batch25-2026-09-17/corrections.json": "48f37867b8899ed51b5c2b2e9b4fcd4b4e2c93671f9bb9c2548f37535f321804",
  "docs/hanja-g2-geometry-batch25-2026-09-17/candidate-paths.json": "0c8b530a1e148f4c6a3d496ba0556b77db66314ec230dd3efb49b798f66fc117",
  "docs/hanja-g2-geometry-batch25-2026-09-17/review.json": "3cb23440c6130f8c0476d49143dfa6d6f97b1ba28473559669ccbe7640f480d2"
}
export function validateG2GeometryBatch25DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_GEOMETRY_BATCH25_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 geometry-batch25 dictionary proof mismatch: ' + path)
  }
}
export function g2GeometryBatch25DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2GeometryBatch25DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 geometry-batch25 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 geometry-batch25 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string; additionalOriginalSources?: { stroke: number; path: string }[] }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 geometry-batch25 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 geometry-batch25 dictionary authored path mismatch')
    const extra = r.additionalDerivedFromStrokes ?? []
    if (new Set(extra).size !== extra.length || extra.some(n => !Number.isInteger(n) || n < 1 || n > originalPaths.length || n === r.derivedFromStroke)
      || !isDeepStrictEqual(edit.additionalOriginalSources ?? [], extra.map(n => ({ stroke: n, path: originalPaths[n - 1] }))))
      throw Error('G2 geometry-batch25 dictionary merged source mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 geometry-batch25 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2GeometryBatch25DictionaryBundle(): G2GeometryBatch25DictionaryBundle {
  validateG2GeometryBatch25DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_GEOMETRY_BATCH25_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_GEOMETRY_BATCH25_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_GEOMETRY_BATCH25_DICTIONARY_GEOMETRY) || originals.entries.length !== 3
    || new Set(originals.entries.map(e => e.glyph)).size !== 3 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 geometry-batch25 dictionary approved set mismatch')
  if (hash(Object.fromEntries(originals.entries.map(e => [e.glyph, e.components]))) !== originals.sources.Components.sha256) throw Error('G2 geometry-batch25 component collection mismatch')
  const characters = G2_GEOMETRY_BATCH25_DICTIONARY_REFERENCES.map(ref => {
    const original = originals.entries.find(e => e.glyph === ref.glyph)
    const observation = observations.entries.find(e => e.glyph === ref.glyph)
    const source = sourceChecks.entries.find(e => e.glyph === ref.glyph)
    if (original?.corpus === 'Components' && (!original.components || hash(original.components) !== original.componentsSha256
      || original.components.some(c => c.corpus !== 'MM' || c.sourceSha256 !== originals.sources.MM.sha256)
      || !isDeepStrictEqual(compose(original.components), original.medians))) throw Error('G2 geometry-batch25 component source mismatch')
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
      throw Error('G2 geometry-batch25 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2GeometryBatch25DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 geometry-batch25 dictionary frozen candidate mismatch')
    return { ...g2GeometryBatch25DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_GEOMETRY_BATCH25_DICTIONARY_VERIFICATION, geometrySources: G2_GEOMETRY_BATCH25_DICTIONARY_GEOMETRY, characters }
}
export function validateG2GeometryBatch25DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2GeometryBatch25DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_GEOMETRY_BATCH25_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 geometry-batch25 dictionary published entry mismatch')
}
export function validateG2GeometryBatch25DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES) {
  const expected = buildG2GeometryBatch25DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_GEOMETRY_BATCH25_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 geometry-batch25 dictionary published bundle mismatch')
}
