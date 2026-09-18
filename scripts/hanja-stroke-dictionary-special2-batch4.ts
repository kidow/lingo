/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL2_BATCH4_DICTIONARY_VERIFICATION, SPECIAL2_BATCH4_DICTIONARY_GEOMETRY, SPECIAL2_BATCH4_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES, special2Batch4DictionaryReference, special2Batch4DictionaryMetadata,
  type Special2Batch4DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special2-batch4.ts'

const dir = 'docs/hanja-special2-batch4-2026-09-18/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH4_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL2_BATCH4_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special2-batch4-2026-09-18/originals.json": "70c03389a3bb4c8c80f2a04e7c7ed9b8515a8dba96ef2fc16ece428926ff43f2",
  "docs/hanja-special2-batch4-2026-09-18/observations.json": "67b8ed971338caf413b863cac43a45c35435b2fa5b55786dab2740c958e29b0b",
  "docs/hanja-special2-batch4-2026-09-18/proposals.json": "b625a706b8c9147205761a67275d881945df6bdf5f48c143b40369221004980a",
  "docs/hanja-special2-batch4-2026-09-18/source-checks.json": "ba6303ff3390b6f29c83da8a3db937891a0d93721de9a8afe9c2d2d62acfec39",
  "docs/hanja-special2-batch4-2026-09-18/corrections.json": "75a58396221cecad43477449be4ff90f5152837ec4b67b2525ce248ab502ecb3",
  "docs/hanja-special2-batch4-2026-09-18/candidate-paths.json": "71572b50ea9b85718f1bc7445fd7f17fb3555d759439fa7cb3708b3e115ec1cd",
  "docs/hanja-special2-batch4-2026-09-18/review.json": "41fbbdf280fc4cbf361bcdee5211be25d43ceb5ba78481e01f858b945f7abd21"
}
export function validateSpecial2Batch4DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL2_BATCH4_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special2 batch4 dictionary proof mismatch: ' + path)
  }
}
export function special2Batch4DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = special2Batch4DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special2 batch4 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special2 batch4 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special2 batch4 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special2 batch4 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special2 batch4 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecial2Batch4DictionaryBundle(): Special2Batch4DictionaryBundle {
  validateSpecial2Batch4DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL2_BATCH4_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL2_BATCH4_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL2_BATCH4_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special2 batch4 dictionary approved set mismatch')
  const characters = SPECIAL2_BATCH4_DICTIONARY_REFERENCES.map(ref => {
    const original = originals.entries.find(e => e.glyph === ref.glyph)
    const observation = observations.entries.find(e => e.glyph === ref.glyph)
    const source = sourceChecks.entries.find(e => e.glyph === ref.glyph)
    const expectedChecks = { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' }
    if (!original || original.corpus !== ref.corpus || original.strokes !== ref.strokes
      || original.originalMediansSha256 !== ref.originalMediansSha256
      || !isDeepStrictEqual(normalizeMedians(original.medians), original.paths)
      || original.dictionary.url !== ref.dictionaryUrl || original.dictionary.sha256 !== ref.dictionarySha256
      || !observation || observation.decision !== 'matched' || observation.directions.length !== ref.strokes
      || !isDeepStrictEqual(observation.checks, expectedChecks)
      || (observation.initialDecision !== 'matched' && (!observation.correctedReview?.completed
        || !isDeepStrictEqual(observation.correctedReview.checks, expectedChecks)))
      || !source || !isDeepStrictEqual(source.dictionary, original.dictionary)
      || source.strokes.length !== ref.strokes || new Set(source.strokes.map(s => s.xmlIndex)).size !== ref.strokes
      || source.strokes.some((s, i, list) => s.duration <= 0 || s.delay < 0 || (i > 0 && s.delay <= list[i - 1].delay)))
      throw Error('Special2 batch4 dictionary review incomplete: ' + ref.glyph)
    const geometry = special2Batch4DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special2 batch4 dictionary frozen candidate mismatch')
    return { ...special2Batch4DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL2_BATCH4_DICTIONARY_VERIFICATION, geometrySources: SPECIAL2_BATCH4_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecial2Batch4DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecial2Batch4DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL2_BATCH4_DICTIONARY_VERIFICATION.id }))
    throw Error('Special2 batch4 dictionary published entry mismatch')
}
export function validateSpecial2Batch4DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES) {
  const expected = buildSpecial2Batch4DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL2_BATCH4_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special2 batch4 dictionary published bundle mismatch')
}
