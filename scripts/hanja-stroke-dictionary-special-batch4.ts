/** Offline, fail-closed reconstruction of licensed special grade geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL_BATCH4_DICTIONARY_VERIFICATION, SPECIAL_BATCH4_DICTIONARY_GEOMETRY, SPECIAL_BATCH4_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES, specialBatch4DictionaryReference, specialBatch4DictionaryMetadata,
  type SpecialBatch4DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special-batch4.ts'

const dir = 'docs/hanja-special-batch4-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH4_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL_BATCH4_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special-batch4-2026-09-20/originals.json": "ec4c644266ba245d07bb569a445a008ddf3942f5778ce0a3dd9c3faa64b3d142",
  "docs/hanja-special-batch4-2026-09-20/observations.json": "a49b8462c2c0fcb5fdd6c9cff3cac63b81736388ba1c16b48e53da020c40d098",
  "docs/hanja-special-batch4-2026-09-20/proposals.json": "92f5964203e48856d23396cfefdacd14cd1d86562b45ce9f7756e756826ca4c9",
  "docs/hanja-special-batch4-2026-09-20/source-checks.json": "1d0f9c6744b317c105de748d3a825ef12cc613fc23dbdb78caf7d66b3d3a5066",
  "docs/hanja-special-batch4-2026-09-20/corrections.json": "296fe85c9630938bf5c231404d31e0e4ee79209cf9bcb20c920a962f409e4c01",
  "docs/hanja-special-batch4-2026-09-20/candidate-paths.json": "5f6f7c7d6b3f923e6c4aab83088acafbf695ecbf7b309cc77e521a69decc5d55",
  "docs/hanja-special-batch4-2026-09-20/review.json": "f99b5205dfa9f9711a1d7bd4082cacd48e5011379cc4a695bc8bab3debf74bf8"
}
export function validateSpecialBatch4DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL_BATCH4_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special batch4 dictionary proof mismatch: ' + path)
  }
}
export function specialBatch4DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = specialBatch4DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special batch4 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special batch4 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special batch4 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special batch4 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special batch4 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecialBatch4DictionaryBundle(): SpecialBatch4DictionaryBundle {
  validateSpecialBatch4DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL_BATCH4_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL_BATCH4_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL_BATCH4_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special batch4 dictionary approved set mismatch')
  const characters = SPECIAL_BATCH4_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special batch4 dictionary review incomplete: ' + ref.glyph)
    const geometry = specialBatch4DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special batch4 dictionary frozen candidate mismatch')
    return { ...specialBatch4DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL_BATCH4_DICTIONARY_VERIFICATION, geometrySources: SPECIAL_BATCH4_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecialBatch4DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecialBatch4DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL_BATCH4_DICTIONARY_VERIFICATION.id }))
    throw Error('Special batch4 dictionary published entry mismatch')
}
export function validateSpecialBatch4DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES) {
  const expected = buildSpecialBatch4DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL_BATCH4_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special batch4 dictionary published bundle mismatch')
}
