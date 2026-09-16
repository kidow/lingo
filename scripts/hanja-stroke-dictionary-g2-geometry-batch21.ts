/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch21-2026-09-17/compose.ts'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_GEOMETRY_BATCH21_DICTIONARY_VERIFICATION, G2_GEOMETRY_BATCH21_DICTIONARY_GEOMETRY, G2_GEOMETRY_BATCH21_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_GEOMETRY_BATCH21_STROKES, g2GeometryBatch21DictionaryReference, g2GeometryBatch21DictionaryMetadata,
  type G2GeometryBatch21DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-geometry-batch21.ts'

const dir = 'docs/hanja-g2-geometry-batch21-2026-09-17/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH21_DICTIONARY_GEOMETRY
  components?: DictionaryComponent[]; componentsSha256?: string; medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; additionalDerivedFromStrokes?: number[]; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_GEOMETRY_BATCH21_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-geometry-batch21-2026-09-17/compose.ts": "a1dcb1da03ce4d489e2e7e0f0fe28156544c4e1237d014411710949eee0b1cb7",
  "docs/hanja-g2-geometry-batch21-2026-09-17/initial-observations.json": "ac2c912db295ead6584233a5fbe5a1bf8b06541f56f08d6992266e7ab2002d15",
  "docs/hanja-g2-geometry-batch21-2026-09-17/originals.json": "9ca7ffe7f1e1139fee57d516f4e225d83e4497c3ae4741d8281a2f2a9aa67748",
  "docs/hanja-g2-geometry-batch21-2026-09-17/observations.json": "78ec3ba008ce630c92624710e003311d1ec9487f6f724ee9dea839a69b304544",
  "docs/hanja-g2-geometry-batch21-2026-09-17/proposals.json": "b49064b2e427819e3b41978c922362043a76bea8f6118105d48442f82e2d4288",
  "docs/hanja-g2-geometry-batch21-2026-09-17/source-checks.json": "3546d4fcc80ddf00bf1b39e0d0423f0d73e056de399ac80d04f30ce86d7fb7ba",
  "docs/hanja-g2-geometry-batch21-2026-09-17/corrections.json": "edd86bad8ce70f90ebb0325bada14db809b7914aae569b5651087d63a73eb563",
  "docs/hanja-g2-geometry-batch21-2026-09-17/candidate-paths.json": "d4ccce614c111bf6efc05ff2c298f27a4a1122fcee7bdaf7dcf621e8d65ad1ac",
  "docs/hanja-g2-geometry-batch21-2026-09-17/review.json": "0b42efddb9fbe38a40b3c216b6a304ed42e08ad7d91c45119e7721472f136808"
}
export function validateG2GeometryBatch21DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_GEOMETRY_BATCH21_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 geometry-batch21 dictionary proof mismatch: ' + path)
  }
}
export function g2GeometryBatch21DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2GeometryBatch21DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 geometry-batch21 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 geometry-batch21 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string; additionalOriginalSources?: { stroke: number; path: string }[] }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 geometry-batch21 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 geometry-batch21 dictionary authored path mismatch')
    const extra = r.additionalDerivedFromStrokes ?? []
    if (new Set(extra).size !== extra.length || extra.some(n => !Number.isInteger(n) || n < 1 || n > originalPaths.length || n === r.derivedFromStroke)
      || !isDeepStrictEqual(edit.additionalOriginalSources ?? [], extra.map(n => ({ stroke: n, path: originalPaths[n - 1] }))))
      throw Error('G2 geometry-batch21 dictionary merged source mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 geometry-batch21 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2GeometryBatch21DictionaryBundle(): G2GeometryBatch21DictionaryBundle {
  validateG2GeometryBatch21DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_GEOMETRY_BATCH21_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_GEOMETRY_BATCH21_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_GEOMETRY_BATCH21_DICTIONARY_GEOMETRY) || originals.entries.length !== 3
    || new Set(originals.entries.map(e => e.glyph)).size !== 3 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 geometry-batch21 dictionary approved set mismatch')
  if (hash(Object.fromEntries(originals.entries.map(e => [e.glyph, e.components]))) !== originals.sources.Components.sha256) throw Error('G2 geometry-batch21 component collection mismatch')
  const characters = G2_GEOMETRY_BATCH21_DICTIONARY_REFERENCES.map(ref => {
    const original = originals.entries.find(e => e.glyph === ref.glyph)
    const observation = observations.entries.find(e => e.glyph === ref.glyph)
    const source = sourceChecks.entries.find(e => e.glyph === ref.glyph)
    if (original?.corpus === 'Components' && (!original.components || hash(original.components) !== original.componentsSha256
      || original.components.some(c => c.corpus !== 'MM' || c.sourceSha256 !== originals.sources.MM.sha256)
      || !isDeepStrictEqual(compose(original.components), original.medians))) throw Error('G2 geometry-batch21 component source mismatch')
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
      throw Error('G2 geometry-batch21 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2GeometryBatch21DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 geometry-batch21 dictionary frozen candidate mismatch')
    return { ...g2GeometryBatch21DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_GEOMETRY_BATCH21_DICTIONARY_VERIFICATION, geometrySources: G2_GEOMETRY_BATCH21_DICTIONARY_GEOMETRY, characters }
}
export function validateG2GeometryBatch21DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2GeometryBatch21DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_GEOMETRY_BATCH21_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 geometry-batch21 dictionary published entry mismatch')
}
export function validateG2GeometryBatch21DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_GEOMETRY_BATCH21_STROKES) {
  const expected = buildG2GeometryBatch21DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_GEOMETRY_BATCH21_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 geometry-batch21 dictionary published bundle mismatch')
}
