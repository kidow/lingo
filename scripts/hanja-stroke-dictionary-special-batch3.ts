/** Offline, fail-closed reconstruction of licensed special grade geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL_BATCH3_DICTIONARY_VERIFICATION, SPECIAL_BATCH3_DICTIONARY_GEOMETRY, SPECIAL_BATCH3_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES, specialBatch3DictionaryReference, specialBatch3DictionaryMetadata,
  type SpecialBatch3DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special-batch3.ts'

const dir = 'docs/hanja-special-batch3-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH3_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL_BATCH3_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special-batch3-2026-09-20/originals.json": "9ffc3f91ea4fdee15426e138b34ecc086c25932770d04e071ace4fe80c22c75a",
  "docs/hanja-special-batch3-2026-09-20/observations.json": "5da34f769201777ece6b791a9dbe2a96e3a7247bff34c135d68f3f2915df0556",
  "docs/hanja-special-batch3-2026-09-20/proposals.json": "0b25f3be3b74545cd580595011d413635644ac93c82fce154f05c1603df5cbb3",
  "docs/hanja-special-batch3-2026-09-20/source-checks.json": "a645cb88cdc46e24e14b44a47829963c0726aabf73d54004d12892c67596ef00",
  "docs/hanja-special-batch3-2026-09-20/corrections.json": "2b048e282374e45d34e89c1916f76265aac30db6fbac0eccb6dbb25ebbfed7e6",
  "docs/hanja-special-batch3-2026-09-20/candidate-paths.json": "38acbdd87a46fa611bbc31de1757bdc7140b979b121b325da408221661a5f181",
  "docs/hanja-special-batch3-2026-09-20/review.json": "7784b086cd086ec7d389d1a13c8f72b370d44e923e67835a9aa662ad86edce4f"
}
export function validateSpecialBatch3DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL_BATCH3_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special batch3 dictionary proof mismatch: ' + path)
  }
}
export function specialBatch3DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = specialBatch3DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special batch3 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special batch3 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special batch3 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special batch3 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special batch3 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecialBatch3DictionaryBundle(): SpecialBatch3DictionaryBundle {
  validateSpecialBatch3DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL_BATCH3_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL_BATCH3_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL_BATCH3_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special batch3 dictionary approved set mismatch')
  const characters = SPECIAL_BATCH3_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special batch3 dictionary review incomplete: ' + ref.glyph)
    const geometry = specialBatch3DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special batch3 dictionary frozen candidate mismatch')
    return { ...specialBatch3DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL_BATCH3_DICTIONARY_VERIFICATION, geometrySources: SPECIAL_BATCH3_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecialBatch3DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecialBatch3DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL_BATCH3_DICTIONARY_VERIFICATION.id }))
    throw Error('Special batch3 dictionary published entry mismatch')
}
export function validateSpecialBatch3DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES) {
  const expected = buildSpecialBatch3DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL_BATCH3_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special batch3 dictionary published bundle mismatch')
}
