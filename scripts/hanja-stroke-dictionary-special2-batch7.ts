/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL2_BATCH7_DICTIONARY_VERIFICATION, SPECIAL2_BATCH7_DICTIONARY_GEOMETRY, SPECIAL2_BATCH7_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES, special2Batch7DictionaryReference, special2Batch7DictionaryMetadata,
  type Special2Batch7DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special2-batch7.ts'

const dir = 'docs/hanja-special2-batch7-2026-09-18/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH7_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL2_BATCH7_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special2-batch7-2026-09-18/originals.json": "2234517dfddbff3f10aacd12e981d642b382c2226a6d3f2a02453dba53b973c5",
  "docs/hanja-special2-batch7-2026-09-18/observations.json": "8e61218f0b27326458f761ebe2fdf1bcfdfcdc5b1cf08081100e8df2097d859b",
  "docs/hanja-special2-batch7-2026-09-18/proposals.json": "2afa886f21e75776d2440ccd111bed11574890d38e6a7e70c01db1b2ce3cc595",
  "docs/hanja-special2-batch7-2026-09-18/source-checks.json": "a7592423a9432249746512d42a7100ceb598b16e17fa29d49c1c6a4d46da8a7c",
  "docs/hanja-special2-batch7-2026-09-18/corrections.json": "b61b5685d95dabbff11c291c1aed832ce9ff293c4d8be43601653b34d1f44514",
  "docs/hanja-special2-batch7-2026-09-18/candidate-paths.json": "66445647e2a2bd8f1a4ee694af9bdbf33f80cd6d520de64f753b31893da85451",
  "docs/hanja-special2-batch7-2026-09-18/review.json": "f4dbf65fac381183269309a1213a32d02592459c3c55b2380faf989c61035f09"
}
export function validateSpecial2Batch7DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL2_BATCH7_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special2 batch7 dictionary proof mismatch: ' + path)
  }
}
export function special2Batch7DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = special2Batch7DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special2 batch7 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special2 batch7 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special2 batch7 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special2 batch7 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special2 batch7 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecial2Batch7DictionaryBundle(): Special2Batch7DictionaryBundle {
  validateSpecial2Batch7DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL2_BATCH7_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL2_BATCH7_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL2_BATCH7_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special2 batch7 dictionary approved set mismatch')
  const characters = SPECIAL2_BATCH7_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special2 batch7 dictionary review incomplete: ' + ref.glyph)
    const geometry = special2Batch7DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special2 batch7 dictionary frozen candidate mismatch')
    return { ...special2Batch7DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL2_BATCH7_DICTIONARY_VERIFICATION, geometrySources: SPECIAL2_BATCH7_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecial2Batch7DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecial2Batch7DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL2_BATCH7_DICTIONARY_VERIFICATION.id }))
    throw Error('Special2 batch7 dictionary published entry mismatch')
}
export function validateSpecial2Batch7DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES) {
  const expected = buildSpecial2Batch7DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL2_BATCH7_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special2 batch7 dictionary published bundle mismatch')
}
