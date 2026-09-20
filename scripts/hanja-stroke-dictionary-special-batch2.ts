/** Offline, fail-closed reconstruction of licensed special grade geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL_BATCH2_DICTIONARY_VERIFICATION, SPECIAL_BATCH2_DICTIONARY_GEOMETRY, SPECIAL_BATCH2_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL_BATCH2_STROKES, specialBatch2DictionaryReference, specialBatch2DictionaryMetadata,
  type SpecialBatch2DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special-batch2.ts'

const dir = 'docs/hanja-special-batch2-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH2_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL_BATCH2_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special-batch2-2026-09-20/originals.json": "9a6374b841436fb736002eeb170570d3f8bcd95f98ec5fcb717c4f05c7f53278",
  "docs/hanja-special-batch2-2026-09-20/observations.json": "9571e66d6cdf1b2d14b375d84bbdc9235f4648a130a5f7867e1e500b7b936d5d",
  "docs/hanja-special-batch2-2026-09-20/proposals.json": "e2c1588b50168a885c83436429083eb3598d29adaefe1de7eee349ed0739c96b",
  "docs/hanja-special-batch2-2026-09-20/source-checks.json": "c13c5b3f765872b55f6e9b02dd9a4e5f29d2de2625a73bac12b446e0d4df3c85",
  "docs/hanja-special-batch2-2026-09-20/corrections.json": "232de89e4365682552e408961a53e18eef77c9ab328397378044a745d92106ad",
  "docs/hanja-special-batch2-2026-09-20/candidate-paths.json": "398cb15a6523143ee690149b0d24ee0c99c03ecfb7f3db685bc74e7f7d805ea6",
  "docs/hanja-special-batch2-2026-09-20/review.json": "676273118c421a445fac0cc65e90832fa2fe7741e95502cc753e294392fd0868"
}
export function validateSpecialBatch2DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL_BATCH2_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special batch2 dictionary proof mismatch: ' + path)
  }
}
export function specialBatch2DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = specialBatch2DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special batch2 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special batch2 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special batch2 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special batch2 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special batch2 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecialBatch2DictionaryBundle(): SpecialBatch2DictionaryBundle {
  validateSpecialBatch2DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL_BATCH2_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL_BATCH2_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL_BATCH2_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special batch2 dictionary approved set mismatch')
  const characters = SPECIAL_BATCH2_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special batch2 dictionary review incomplete: ' + ref.glyph)
    const geometry = specialBatch2DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special batch2 dictionary frozen candidate mismatch')
    return { ...specialBatch2DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL_BATCH2_DICTIONARY_VERIFICATION, geometrySources: SPECIAL_BATCH2_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecialBatch2DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecialBatch2DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL_BATCH2_DICTIONARY_VERIFICATION.id }))
    throw Error('Special batch2 dictionary published entry mismatch')
}
export function validateSpecialBatch2DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL_BATCH2_STROKES) {
  const expected = buildSpecialBatch2DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL_BATCH2_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special batch2 dictionary published bundle mismatch')
}
