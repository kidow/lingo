/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G1_BATCH11_DICTIONARY_VERIFICATION, G1_BATCH11_DICTIONARY_GEOMETRY, G1_BATCH11_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G1_BATCH11_STROKES, g1Batch11DictionaryReference, g1Batch11DictionaryMetadata,
  type G1Batch11DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g1-batch11.ts'

const dir = 'docs/hanja-g1-batch11-2026-09-19/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH11_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const G1_BATCH11_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g1-batch11-2026-09-19/originals.json": "1cbfcbdb3f7014ac32e6a2349c0b583fb1f69d038f834825f4baabafe1bf8342",
  "docs/hanja-g1-batch11-2026-09-19/observations.json": "6c9321c9b6831316937fa13ca89a84a5a0b0452adc3896cb31d4aad7f41a5119",
  "docs/hanja-g1-batch11-2026-09-19/proposals.json": "7e0d9e6218565fa70cb1795c1fe79ffd8d8a543aa3bb94bfeb65d190bd597c40",
  "docs/hanja-g1-batch11-2026-09-19/source-checks.json": "6f4afe8bc3fda32d0df063af6275a3da2743c27fabf1749aa3988e56f08b71c5",
  "docs/hanja-g1-batch11-2026-09-19/corrections.json": "e896c086710373ddb378c9f95846877f4ee89daf7a291a8c1affcd32896304d3",
  "docs/hanja-g1-batch11-2026-09-19/candidate-paths.json": "821efafd2720187c4664bd4971da8e0ff2f8d07ab79887dad4838111cf17b4b9",
  "docs/hanja-g1-batch11-2026-09-19/review.json": "5426b7ac32fd83aa618bfc894e21ea1bb982cfdbad3caa297141bbc79fc26409"
}
export function validateG1Batch11DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G1_BATCH11_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G1 batch11 dictionary proof mismatch: ' + path)
  }
}
export function g1Batch11DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g1Batch11DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G1 batch11 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G1 batch11 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G1 batch11 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('G1 batch11 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G1 batch11 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG1Batch11DictionaryBundle(): G1Batch11DictionaryBundle {
  validateG1Batch11DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G1_BATCH11_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G1_BATCH11_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G1_BATCH11_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G1 batch11 dictionary approved set mismatch')
  const characters = G1_BATCH11_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G1 batch11 dictionary review incomplete: ' + ref.glyph)
    const geometry = g1Batch11DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G1 batch11 dictionary frozen candidate mismatch')
    return { ...g1Batch11DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G1_BATCH11_DICTIONARY_VERIFICATION, geometrySources: G1_BATCH11_DICTIONARY_GEOMETRY, characters }
}
export function validateG1Batch11DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG1Batch11DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G1_BATCH11_DICTIONARY_VERIFICATION.id }))
    throw Error('G1 batch11 dictionary published entry mismatch')
}
export function validateG1Batch11DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G1_BATCH11_STROKES) {
  const expected = buildG1Batch11DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G1_BATCH11_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G1 batch11 dictionary published bundle mismatch')
}
