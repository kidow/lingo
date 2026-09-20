/** Offline, fail-closed reconstruction of licensed special grade geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL_BATCH11_DICTIONARY_VERIFICATION, SPECIAL_BATCH11_DICTIONARY_GEOMETRY, SPECIAL_BATCH11_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES, specialBatch11DictionaryReference, specialBatch11DictionaryMetadata,
  type SpecialBatch11DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special-batch11.ts'

const dir = 'docs/hanja-special-batch11-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH11_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL_BATCH11_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special-batch11-2026-09-20/originals.json": "00415bbc3ca60178e221289a592e0aaab088186b5c153191d72cb805d0d733f9",
  "docs/hanja-special-batch11-2026-09-20/observations.json": "197d6ac4f456c6bd9364a5d855f732aeea57863965f3c87de39b37cb6974000c",
  "docs/hanja-special-batch11-2026-09-20/proposals.json": "f662b452c54bd204dd87d9eee394b686b6b4e004e67ca2237e19d7bca36b6568",
  "docs/hanja-special-batch11-2026-09-20/source-checks.json": "e222b050f7bb46d26a39e83318a0d62494b85018fef851ea001e9da627f049ae",
  "docs/hanja-special-batch11-2026-09-20/corrections.json": "111103414753ae7129582197b46e014330e19230d4df6902ebe07ff0a7a99446",
  "docs/hanja-special-batch11-2026-09-20/candidate-paths.json": "b5c2c505b873f3da6d7647563d3633147a1f899349085d3f7a4007610e79a48e",
  "docs/hanja-special-batch11-2026-09-20/review.json": "f33c920b0c89b1f2457e191ef19b8f3794df769a035df29daba9492eba3d8c6d"
}
export function validateSpecialBatch11DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL_BATCH11_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special batch11 dictionary proof mismatch: ' + path)
  }
}
export function specialBatch11DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = specialBatch11DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special batch11 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special batch11 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special batch11 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special batch11 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special batch11 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecialBatch11DictionaryBundle(): SpecialBatch11DictionaryBundle {
  validateSpecialBatch11DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL_BATCH11_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL_BATCH11_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL_BATCH11_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special batch11 dictionary approved set mismatch')
  const characters = SPECIAL_BATCH11_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special batch11 dictionary review incomplete: ' + ref.glyph)
    const geometry = specialBatch11DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special batch11 dictionary frozen candidate mismatch')
    return { ...specialBatch11DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL_BATCH11_DICTIONARY_VERIFICATION, geometrySources: SPECIAL_BATCH11_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecialBatch11DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecialBatch11DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL_BATCH11_DICTIONARY_VERIFICATION.id }))
    throw Error('Special batch11 dictionary published entry mismatch')
}
export function validateSpecialBatch11DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES) {
  const expected = buildSpecialBatch11DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL_BATCH11_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special batch11 dictionary published bundle mismatch')
}
