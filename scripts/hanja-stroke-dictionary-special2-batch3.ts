/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL2_BATCH3_DICTIONARY_VERIFICATION, SPECIAL2_BATCH3_DICTIONARY_GEOMETRY, SPECIAL2_BATCH3_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES, special2Batch3DictionaryReference, special2Batch3DictionaryMetadata,
  type Special2Batch3DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special2-batch3.ts'

const dir = 'docs/hanja-special2-batch3-2026-09-18/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH3_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL2_BATCH3_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special2-batch3-2026-09-18/originals.json": "7aab339576b3753567db4d366a9e23e58ba5d1b248f1e8bd412e8ac9c1d8f652",
  "docs/hanja-special2-batch3-2026-09-18/observations.json": "76f6f7ce6b47a66b9193110fe055ca90be0d3831da648f8e53bf38f7e442f140",
  "docs/hanja-special2-batch3-2026-09-18/proposals.json": "2c3a9012055bc239c0d42522b59ea6c2ab4380483fc76d1dc5855de19d5cd3e5",
  "docs/hanja-special2-batch3-2026-09-18/source-checks.json": "67637f6cbd1cae373a4eed0d159e7ba2f2c99778324f70da36af87d17aac35f4",
  "docs/hanja-special2-batch3-2026-09-18/corrections.json": "12131ffd00351a8b3d014eb537b56c4a2ee5f2987c5040a2a64e16c3f74c455d",
  "docs/hanja-special2-batch3-2026-09-18/candidate-paths.json": "93680b515138a1ccc3a961706bc0f8f6be0e16a5ff41f01bcdaa9fb46274374e",
  "docs/hanja-special2-batch3-2026-09-18/review.json": "b6176af46299f90fd944622a7f3a082d8f9e69ee489f562c13cc19d7223f4b7c"
}
export function validateSpecial2Batch3DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL2_BATCH3_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special2 batch3 dictionary proof mismatch: ' + path)
  }
}
export function special2Batch3DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = special2Batch3DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special2 batch3 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special2 batch3 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special2 batch3 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special2 batch3 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special2 batch3 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecial2Batch3DictionaryBundle(): Special2Batch3DictionaryBundle {
  validateSpecial2Batch3DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL2_BATCH3_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL2_BATCH3_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL2_BATCH3_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special2 batch3 dictionary approved set mismatch')
  const characters = SPECIAL2_BATCH3_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special2 batch3 dictionary review incomplete: ' + ref.glyph)
    const geometry = special2Batch3DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special2 batch3 dictionary frozen candidate mismatch')
    return { ...special2Batch3DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL2_BATCH3_DICTIONARY_VERIFICATION, geometrySources: SPECIAL2_BATCH3_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecial2Batch3DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecial2Batch3DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL2_BATCH3_DICTIONARY_VERIFICATION.id }))
    throw Error('Special2 batch3 dictionary published entry mismatch')
}
export function validateSpecial2Batch3DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES) {
  const expected = buildSpecial2Batch3DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL2_BATCH3_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special2 batch3 dictionary published bundle mismatch')
}
