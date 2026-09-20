/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL2_BATCH18_DICTIONARY_VERIFICATION, SPECIAL2_BATCH18_DICTIONARY_GEOMETRY, SPECIAL2_BATCH18_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES, special2Batch18DictionaryReference, special2Batch18DictionaryMetadata,
  type Special2Batch18DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special2-batch18.ts'

const dir = 'docs/hanja-special2-batch18-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH18_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL2_BATCH18_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special2-batch18-2026-09-20/originals.json": "2d505ab4d1f8c2d62e593f4a3a7cd9f2bcebac72c4d79a88f687de69f27ab883",
  "docs/hanja-special2-batch18-2026-09-20/observations.json": "80399a3c3880e08b20589d094bd19aa43ce493e2228a8405f11a252960f785b5",
  "docs/hanja-special2-batch18-2026-09-20/proposals.json": "07744f8af00fca35a4e04d3dd8f8e53b1cd9708e30d42fc7aa479b155d6575a8",
  "docs/hanja-special2-batch18-2026-09-20/source-checks.json": "903f1cf3e07ff931fe13cb1b860a10d84ba49cb6b9db27f4148a7d1b4e7eb687",
  "docs/hanja-special2-batch18-2026-09-20/corrections.json": "c2f9f37e26a6bfdce0418601c6be18e21f606f46e9714608e71887bf1c14d060",
  "docs/hanja-special2-batch18-2026-09-20/candidate-paths.json": "c6b5d2d052ff1757a792629e2fd68ac7e497e2f70836d63d5256ea7a6bbff9b4",
  "docs/hanja-special2-batch18-2026-09-20/review.json": "1f79b7fa2c84af1f99361a0454323cad4184e70405b71c8c2b02658b07c3cf2e"
}
export function validateSpecial2Batch18DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL2_BATCH18_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special2 batch18 dictionary proof mismatch: ' + path)
  }
}
export function special2Batch18DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = special2Batch18DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special2 batch18 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special2 batch18 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special2 batch18 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special2 batch18 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special2 batch18 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecial2Batch18DictionaryBundle(): Special2Batch18DictionaryBundle {
  validateSpecial2Batch18DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL2_BATCH18_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL2_BATCH18_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL2_BATCH18_DICTIONARY_GEOMETRY) || originals.entries.length !== 12
    || new Set(originals.entries.map(e => e.glyph)).size !== 12 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special2 batch18 dictionary approved set mismatch')
  const characters = SPECIAL2_BATCH18_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special2 batch18 dictionary review incomplete: ' + ref.glyph)
    const geometry = special2Batch18DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special2 batch18 dictionary frozen candidate mismatch')
    return { ...special2Batch18DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL2_BATCH18_DICTIONARY_VERIFICATION, geometrySources: SPECIAL2_BATCH18_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecial2Batch18DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecial2Batch18DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL2_BATCH18_DICTIONARY_VERIFICATION.id }))
    throw Error('Special2 batch18 dictionary published entry mismatch')
}
export function validateSpecial2Batch18DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES) {
  const expected = buildSpecial2Batch18DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL2_BATCH18_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special2 batch18 dictionary published bundle mismatch')
}
