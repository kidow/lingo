/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL2_BATCH5_DICTIONARY_VERIFICATION, SPECIAL2_BATCH5_DICTIONARY_GEOMETRY, SPECIAL2_BATCH5_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES, special2Batch5DictionaryReference, special2Batch5DictionaryMetadata,
  type Special2Batch5DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special2-batch5.ts'

const dir = 'docs/hanja-special2-batch5-2026-09-18/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH5_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL2_BATCH5_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special2-batch5-2026-09-18/originals.json": "962b744297990542011e49bb0ea3f6fe05339f618147646a26c64fe2a594340a",
  "docs/hanja-special2-batch5-2026-09-18/observations.json": "fe50caeb9ef481c357d8e19b44df397a3b2837eab3eb1123c22f73ab019067e6",
  "docs/hanja-special2-batch5-2026-09-18/proposals.json": "5069b54bd39be58c15231ff77bdcd720229c3e4534334028e274bda4c8f50ab8",
  "docs/hanja-special2-batch5-2026-09-18/source-checks.json": "143bb0d0ae8ca989aee7b785fa02dc03fdd6d76478b4a096e09ef8593c1bac27",
  "docs/hanja-special2-batch5-2026-09-18/corrections.json": "76c300e9a1a5aa7947776b26e50c5ddac14afea45c10cd4779c6eda2823934a8",
  "docs/hanja-special2-batch5-2026-09-18/candidate-paths.json": "8eac563777cc9501959d6c92e9b4ed1649e88540bd0d73098276af93331cf924",
  "docs/hanja-special2-batch5-2026-09-18/review.json": "71358e9882230a91df973cc09091cf1f12d931890a82041420d7dd2b3c0831d4"
}
export function validateSpecial2Batch5DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL2_BATCH5_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special2 batch5 dictionary proof mismatch: ' + path)
  }
}
export function special2Batch5DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = special2Batch5DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special2 batch5 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special2 batch5 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special2 batch5 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special2 batch5 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special2 batch5 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecial2Batch5DictionaryBundle(): Special2Batch5DictionaryBundle {
  validateSpecial2Batch5DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL2_BATCH5_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL2_BATCH5_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL2_BATCH5_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special2 batch5 dictionary approved set mismatch')
  const characters = SPECIAL2_BATCH5_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special2 batch5 dictionary review incomplete: ' + ref.glyph)
    const geometry = special2Batch5DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special2 batch5 dictionary frozen candidate mismatch')
    return { ...special2Batch5DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL2_BATCH5_DICTIONARY_VERIFICATION, geometrySources: SPECIAL2_BATCH5_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecial2Batch5DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecial2Batch5DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL2_BATCH5_DICTIONARY_VERIFICATION.id }))
    throw Error('Special2 batch5 dictionary published entry mismatch')
}
export function validateSpecial2Batch5DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES) {
  const expected = buildSpecial2Batch5DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL2_BATCH5_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special2 batch5 dictionary published bundle mismatch')
}
