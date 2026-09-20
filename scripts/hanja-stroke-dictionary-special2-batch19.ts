/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL2_BATCH19_DICTIONARY_VERIFICATION, SPECIAL2_BATCH19_DICTIONARY_GEOMETRY, SPECIAL2_BATCH19_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES, special2Batch19DictionaryReference, special2Batch19DictionaryMetadata,
  type Special2Batch19DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special2-batch19.ts'

const dir = 'docs/hanja-special2-batch19-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH19_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL2_BATCH19_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special2-batch19-2026-09-20/originals.json": "d7046f9d95745a6d8eb5f4eec1a0a476dbbf4d34746b2be22199a73f32504639",
  "docs/hanja-special2-batch19-2026-09-20/observations.json": "48c632474c8ec9bbe8cd94d11c73dcc951d28942da570204092254501254d3f8",
  "docs/hanja-special2-batch19-2026-09-20/proposals.json": "c3479f774d14bc5c97e04a8875c9041177f65cbd87c049ceb5215ab44bf3d27d",
  "docs/hanja-special2-batch19-2026-09-20/source-checks.json": "ffc40f5437e268a4de5a7092c255827d7bc4b67189a6388b0955b81e10d28436",
  "docs/hanja-special2-batch19-2026-09-20/corrections.json": "055167efafe495adeaf8127ec7a362d5da075359e3a6b28bb48bb104517914b4",
  "docs/hanja-special2-batch19-2026-09-20/candidate-paths.json": "8b0a0ba9e9b1e41152ad106d1ae1c71d794f88c82acb1495500b1f2eb860c9d9",
  "docs/hanja-special2-batch19-2026-09-20/review.json": "23df9aa1138f03fbfb717b2dc715cafb4200036e80a9c9a43be9fe106370e1c3"
}
export function validateSpecial2Batch19DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL2_BATCH19_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special2 batch19 dictionary proof mismatch: ' + path)
  }
}
export function special2Batch19DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = special2Batch19DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special2 batch19 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special2 batch19 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special2 batch19 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special2 batch19 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special2 batch19 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecial2Batch19DictionaryBundle(): Special2Batch19DictionaryBundle {
  validateSpecial2Batch19DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL2_BATCH19_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL2_BATCH19_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL2_BATCH19_DICTIONARY_GEOMETRY) || originals.entries.length !== 6
    || new Set(originals.entries.map(e => e.glyph)).size !== 6 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special2 batch19 dictionary approved set mismatch')
  const characters = SPECIAL2_BATCH19_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special2 batch19 dictionary review incomplete: ' + ref.glyph)
    const geometry = special2Batch19DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special2 batch19 dictionary frozen candidate mismatch')
    return { ...special2Batch19DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL2_BATCH19_DICTIONARY_VERIFICATION, geometrySources: SPECIAL2_BATCH19_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecial2Batch19DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecial2Batch19DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL2_BATCH19_DICTIONARY_VERIFICATION.id }))
    throw Error('Special2 batch19 dictionary published entry mismatch')
}
export function validateSpecial2Batch19DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES) {
  const expected = buildSpecial2Batch19DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL2_BATCH19_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special2 batch19 dictionary published bundle mismatch')
}
