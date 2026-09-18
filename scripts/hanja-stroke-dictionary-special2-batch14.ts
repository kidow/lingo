/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL2_BATCH14_DICTIONARY_VERIFICATION, SPECIAL2_BATCH14_DICTIONARY_GEOMETRY, SPECIAL2_BATCH14_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES, special2Batch14DictionaryReference, special2Batch14DictionaryMetadata,
  type Special2Batch14DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special2-batch14.ts'

const dir = 'docs/hanja-special2-batch14-2026-09-18/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH14_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL2_BATCH14_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special2-batch14-2026-09-18/originals.json": "031029f8183e956314796571cf8f0cf1eb9a23c489e0310af4596479515992a9",
  "docs/hanja-special2-batch14-2026-09-18/observations.json": "2b1b7e89fc3cbb8acdd1f7ddcd43f3111f08cbc1095cd062bfe6b1bcdd055f44",
  "docs/hanja-special2-batch14-2026-09-18/proposals.json": "7511f8805fd8fea2d4051dafe30df570d7a067c69d12c4d375b0d041b105e90e",
  "docs/hanja-special2-batch14-2026-09-18/source-checks.json": "42e300d943a2793e2c9a84e751b387d6fcf5c22ba08f98f61d1a61375fc638d4",
  "docs/hanja-special2-batch14-2026-09-18/corrections.json": "fca923043e1a1157ad1feb08ce219e74edf3ca53add6eb6b69abfd81fa7580bc",
  "docs/hanja-special2-batch14-2026-09-18/candidate-paths.json": "ce45b9f7a3bc5628e9de583f1919b3287cfe3f5e806be0b48cd84d807e4ad881",
  "docs/hanja-special2-batch14-2026-09-18/review.json": "be2e6d7f6acdbeb802b85744605f0226bc29e2ff4e97f443c773b67f1d168b99"
}
export function validateSpecial2Batch14DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL2_BATCH14_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special2 batch14 dictionary proof mismatch: ' + path)
  }
}
export function special2Batch14DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = special2Batch14DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special2 batch14 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special2 batch14 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special2 batch14 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special2 batch14 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special2 batch14 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecial2Batch14DictionaryBundle(): Special2Batch14DictionaryBundle {
  validateSpecial2Batch14DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL2_BATCH14_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL2_BATCH14_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL2_BATCH14_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special2 batch14 dictionary approved set mismatch')
  const characters = SPECIAL2_BATCH14_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special2 batch14 dictionary review incomplete: ' + ref.glyph)
    const geometry = special2Batch14DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special2 batch14 dictionary frozen candidate mismatch')
    return { ...special2Batch14DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL2_BATCH14_DICTIONARY_VERIFICATION, geometrySources: SPECIAL2_BATCH14_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecial2Batch14DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecial2Batch14DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL2_BATCH14_DICTIONARY_VERIFICATION.id }))
    throw Error('Special2 batch14 dictionary published entry mismatch')
}
export function validateSpecial2Batch14DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES) {
  const expected = buildSpecial2Batch14DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL2_BATCH14_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special2 batch14 dictionary published bundle mismatch')
}
