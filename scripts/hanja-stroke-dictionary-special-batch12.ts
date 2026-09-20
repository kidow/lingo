/** Offline, fail-closed reconstruction of licensed special grade geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL_BATCH12_DICTIONARY_VERIFICATION, SPECIAL_BATCH12_DICTIONARY_GEOMETRY, SPECIAL_BATCH12_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL_BATCH12_STROKES, specialBatch12DictionaryReference, specialBatch12DictionaryMetadata,
  type SpecialBatch12DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special-batch12.ts'

const dir = 'docs/hanja-special-batch12-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH12_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL_BATCH12_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special-batch12-2026-09-20/originals.json": "15a3a2060683398263466f87fc0e730f8e52f112d6b46ec28af49ea88d408618",
  "docs/hanja-special-batch12-2026-09-20/observations.json": "5b56f8c99da87e661c5cc2188a40a1b2aa4df8f0f68d829a015aed4f4ab97050",
  "docs/hanja-special-batch12-2026-09-20/proposals.json": "c62b5d3ca49ab0a18611afd3a6a2e8a4e77686114977969b4ef0d8528676100a",
  "docs/hanja-special-batch12-2026-09-20/source-checks.json": "aacfab1ef7da221c9894f84b1407f80913d547084fc9475c5a9d007abee9ac65",
  "docs/hanja-special-batch12-2026-09-20/corrections.json": "74357e522198b98ac75123fbba61f5eb39a04a08be158201d44392f46dfbeb14",
  "docs/hanja-special-batch12-2026-09-20/candidate-paths.json": "3796b44d3d34044185fbc0a8ca538f104d453d970a53c130a4df47fc7ee74ae5",
  "docs/hanja-special-batch12-2026-09-20/review.json": "ad217fd7cb05f3e4cf14f1bb8bf33cd60510da2d3ccf243f0452ca82ff48bb76"
}
export function validateSpecialBatch12DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL_BATCH12_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special batch12 dictionary proof mismatch: ' + path)
  }
}
export function specialBatch12DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = specialBatch12DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special batch12 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special batch12 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special batch12 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special batch12 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special batch12 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecialBatch12DictionaryBundle(): SpecialBatch12DictionaryBundle {
  validateSpecialBatch12DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL_BATCH12_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL_BATCH12_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL_BATCH12_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special batch12 dictionary approved set mismatch')
  const characters = SPECIAL_BATCH12_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special batch12 dictionary review incomplete: ' + ref.glyph)
    const geometry = specialBatch12DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special batch12 dictionary frozen candidate mismatch')
    return { ...specialBatch12DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL_BATCH12_DICTIONARY_VERIFICATION, geometrySources: SPECIAL_BATCH12_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecialBatch12DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecialBatch12DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL_BATCH12_DICTIONARY_VERIFICATION.id }))
    throw Error('Special batch12 dictionary published entry mismatch')
}
export function validateSpecialBatch12DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL_BATCH12_STROKES) {
  const expected = buildSpecialBatch12DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL_BATCH12_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special batch12 dictionary published bundle mismatch')
}
