/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL2_BATCH9_DICTIONARY_VERIFICATION, SPECIAL2_BATCH9_DICTIONARY_GEOMETRY, SPECIAL2_BATCH9_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES, special2Batch9DictionaryReference, special2Batch9DictionaryMetadata,
  type Special2Batch9DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special2-batch9.ts'

const dir = 'docs/hanja-special2-batch9-2026-09-18/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH9_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL2_BATCH9_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special2-batch9-2026-09-18/originals.json": "e0247d5aa3e97eceefe8f1c32f4dff5b4be29cfff0032b60cb32000844129f0c",
  "docs/hanja-special2-batch9-2026-09-18/observations.json": "365b42e6c97ce4ccbb66d215b498ea420977aea857393aa8faa7cc0236db4df2",
  "docs/hanja-special2-batch9-2026-09-18/proposals.json": "22168c95b2d006adf8188646bed96a43d9eadfb2d888ecd73f6bc0b163314ef0",
  "docs/hanja-special2-batch9-2026-09-18/source-checks.json": "f26b9f716ca396b067a621e7b0b37c9d6e2889c099dd965da6d01890e4fb88ec",
  "docs/hanja-special2-batch9-2026-09-18/corrections.json": "9f8d37e2a054e5789402cf672d26254707e885af51b4908b54371db70c73c843",
  "docs/hanja-special2-batch9-2026-09-18/candidate-paths.json": "51aee3d4cf559a594344d54bfba190483ef72b66df00fde5ca1d2fdf9faf9bf4",
  "docs/hanja-special2-batch9-2026-09-18/review.json": "25a24935c4d1f96908adcedeae007a0acc6f0c30e8092f277bba4aed6649f156"
}
export function validateSpecial2Batch9DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL2_BATCH9_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special2 batch9 dictionary proof mismatch: ' + path)
  }
}
export function special2Batch9DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = special2Batch9DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special2 batch9 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special2 batch9 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special2 batch9 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special2 batch9 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special2 batch9 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecial2Batch9DictionaryBundle(): Special2Batch9DictionaryBundle {
  validateSpecial2Batch9DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL2_BATCH9_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL2_BATCH9_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL2_BATCH9_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special2 batch9 dictionary approved set mismatch')
  const characters = SPECIAL2_BATCH9_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special2 batch9 dictionary review incomplete: ' + ref.glyph)
    const geometry = special2Batch9DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special2 batch9 dictionary frozen candidate mismatch')
    return { ...special2Batch9DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL2_BATCH9_DICTIONARY_VERIFICATION, geometrySources: SPECIAL2_BATCH9_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecial2Batch9DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecial2Batch9DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL2_BATCH9_DICTIONARY_VERIFICATION.id }))
    throw Error('Special2 batch9 dictionary published entry mismatch')
}
export function validateSpecial2Batch9DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES) {
  const expected = buildSpecial2Batch9DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL2_BATCH9_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special2 batch9 dictionary published bundle mismatch')
}
