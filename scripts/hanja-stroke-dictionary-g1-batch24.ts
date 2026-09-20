/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G1_BATCH24_DICTIONARY_VERIFICATION, G1_BATCH24_DICTIONARY_GEOMETRY, G1_BATCH24_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G1_BATCH24_STROKES, g1Batch24DictionaryReference, g1Batch24DictionaryMetadata,
  type G1Batch24DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g1-batch24.ts'

const dir = 'docs/hanja-g1-batch24-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH24_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const G1_BATCH24_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g1-batch24-2026-09-20/originals.json": "29161e4e621c0a75d185436020023908aec2182fbf43df8cb5774438c44f77b1",
  "docs/hanja-g1-batch24-2026-09-20/observations.json": "1c0d6f2978ede90aca0afbbd2821e83d772ac3dccc2c3fef1cec59259623e37c",
  "docs/hanja-g1-batch24-2026-09-20/proposals.json": "0021eb807281b4f13ec627e285679127451500c6b3548e9f3d91509802348f15",
  "docs/hanja-g1-batch24-2026-09-20/source-checks.json": "0abc35774f785145745706d8c761b786916cad0880beff4f58510d1900bb716d",
  "docs/hanja-g1-batch24-2026-09-20/corrections.json": "055167efafe495adeaf8127ec7a362d5da075359e3a6b28bb48bb104517914b4",
  "docs/hanja-g1-batch24-2026-09-20/candidate-paths.json": "bd47b85e98777c71c27d24e948caca880a7618a610df56839c508b073eee1dc9",
  "docs/hanja-g1-batch24-2026-09-20/review.json": "5b3c180ede3228b86446fe2a23b7fb2e70a94c82b3d7c10fd1d94a8abf729f83"
}
export function validateG1Batch24DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G1_BATCH24_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G1 batch24 dictionary proof mismatch: ' + path)
  }
}
export function g1Batch24DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g1Batch24DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G1 batch24 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G1 batch24 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G1 batch24 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('G1 batch24 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G1 batch24 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG1Batch24DictionaryBundle(): G1Batch24DictionaryBundle {
  validateG1Batch24DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G1_BATCH24_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G1_BATCH24_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G1_BATCH24_DICTIONARY_GEOMETRY) || originals.entries.length !== 16
    || new Set(originals.entries.map(e => e.glyph)).size !== 16 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G1 batch24 dictionary approved set mismatch')
  const characters = G1_BATCH24_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G1 batch24 dictionary review incomplete: ' + ref.glyph)
    const geometry = g1Batch24DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G1 batch24 dictionary frozen candidate mismatch')
    return { ...g1Batch24DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G1_BATCH24_DICTIONARY_VERIFICATION, geometrySources: G1_BATCH24_DICTIONARY_GEOMETRY, characters }
}
export function validateG1Batch24DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG1Batch24DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G1_BATCH24_DICTIONARY_VERIFICATION.id }))
    throw Error('G1 batch24 dictionary published entry mismatch')
}
export function validateG1Batch24DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G1_BATCH24_STROKES) {
  const expected = buildG1Batch24DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G1_BATCH24_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G1 batch24 dictionary published bundle mismatch')
}
