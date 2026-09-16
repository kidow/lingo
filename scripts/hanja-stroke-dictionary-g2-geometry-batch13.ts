/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_GEOMETRY_BATCH13_DICTIONARY_VERIFICATION, G2_GEOMETRY_BATCH13_DICTIONARY_GEOMETRY, G2_GEOMETRY_BATCH13_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES, g2GeometryBatch13DictionaryReference, g2GeometryBatch13DictionaryMetadata,
  type G2GeometryBatch13DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-geometry-batch13.ts'

const dir = 'docs/hanja-g2-geometry-batch13-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH13_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; additionalDerivedFromStrokes?: number[]; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_GEOMETRY_BATCH13_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-geometry-batch13-2026-09-16/initial-observations.json": "75c552b1618415d843c8d4d36f448a4db84b42f96659ffc675f24fb87bb6faad",
  "docs/hanja-g2-geometry-batch13-2026-09-16/originals.json": "a340e00c79ce62a8b2e7cf89ad8b692a5fc502eab0262a15217af03b3fd622fb",
  "docs/hanja-g2-geometry-batch13-2026-09-16/observations.json": "cffdef0c796edfb4f931cb784f95180664cf3d8b5b0826570575f3e2a03c7bea",
  "docs/hanja-g2-geometry-batch13-2026-09-16/proposals.json": "a26ed1cc57c2248b15ffbf24adee54fb5953fb9e6ff8e95cbd830d196d65eb2a",
  "docs/hanja-g2-geometry-batch13-2026-09-16/source-checks.json": "ebe2df5f37d39bd0894bf545acbc4d338ba5d50ea00c408742982ca550028ae9",
  "docs/hanja-g2-geometry-batch13-2026-09-16/corrections.json": "0bc8162db8c326c4b7d4bc3da4dee0be02efa13c359f0bf91188e22ccdc1e6ff",
  "docs/hanja-g2-geometry-batch13-2026-09-16/candidate-paths.json": "edc27e90a953e34019456ce1fbe69aefa93f93f4ce902d4b732fab75480a4e13",
  "docs/hanja-g2-geometry-batch13-2026-09-16/review.json": "e75a038df0228ec4fe95c2466ff1acb1a62f6002eec2c9f6a168bc3233f2436d"
}
export function validateG2GeometryBatch13DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_GEOMETRY_BATCH13_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 geometry-batch13 dictionary proof mismatch: ' + path)
  }
}
export function g2GeometryBatch13DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2GeometryBatch13DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 geometry-batch13 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 geometry-batch13 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string; additionalOriginalSources?: { stroke: number; path: string }[] }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 geometry-batch13 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 geometry-batch13 dictionary authored path mismatch')
    const extra = r.additionalDerivedFromStrokes ?? []
    if (new Set(extra).size !== extra.length || extra.some(n => !Number.isInteger(n) || n < 1 || n > originalPaths.length || n === r.derivedFromStroke)
      || !isDeepStrictEqual(edit.additionalOriginalSources ?? [], extra.map(n => ({ stroke: n, path: originalPaths[n - 1] }))))
      throw Error('G2 geometry-batch13 dictionary merged source mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 geometry-batch13 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2GeometryBatch13DictionaryBundle(): G2GeometryBatch13DictionaryBundle {
  validateG2GeometryBatch13DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_GEOMETRY_BATCH13_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_GEOMETRY_BATCH13_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_GEOMETRY_BATCH13_DICTIONARY_GEOMETRY) || originals.entries.length !== 2
    || new Set(originals.entries.map(e => e.glyph)).size !== 2 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 geometry-batch13 dictionary approved set mismatch')
  const characters = G2_GEOMETRY_BATCH13_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G2 geometry-batch13 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2GeometryBatch13DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 geometry-batch13 dictionary frozen candidate mismatch')
    return { ...g2GeometryBatch13DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_GEOMETRY_BATCH13_DICTIONARY_VERIFICATION, geometrySources: G2_GEOMETRY_BATCH13_DICTIONARY_GEOMETRY, characters }
}
export function validateG2GeometryBatch13DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2GeometryBatch13DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_GEOMETRY_BATCH13_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 geometry-batch13 dictionary published entry mismatch')
}
export function validateG2GeometryBatch13DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES) {
  const expected = buildG2GeometryBatch13DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_GEOMETRY_BATCH13_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 geometry-batch13 dictionary published bundle mismatch')
}
