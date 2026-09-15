/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_BATCH5_DICTIONARY_VERIFICATION, G2_BATCH5_DICTIONARY_GEOMETRY, G2_BATCH5_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_BATCH5_STROKES, g2Batch5DictionaryReference, g2Batch5DictionaryMetadata,
  type G2Batch5DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-batch5.ts'

const dir = 'docs/hanja-g2-batch5-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G2_BATCH5_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_BATCH5_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-batch5-2026-09-16/initial-observations.json": "88847c9364ec8ef153c135e513828764e12b47a88aae1eb0d51d190019f04660",
  "docs/hanja-g2-batch5-2026-09-16/originals.json": "45367d94cb48a3ec9761eb781923a404d8e2c1923e532944b392f34eb260d322",
  "docs/hanja-g2-batch5-2026-09-16/observations.json": "a8aa5927f5075aa05130d2351246e937b573287b2bf8cebe5e8d0b06987539d4",
  "docs/hanja-g2-batch5-2026-09-16/proposals.json": "b54c3088a33aca4b4ccbf8f76604b44aa19f1d9b831b2e5910cb2df2c375735c",
  "docs/hanja-g2-batch5-2026-09-16/source-checks.json": "199d2d0fb91cdba3e3cb34e554847b3ef65514d18c8bc3c57a4fe5d971534f87",
  "docs/hanja-g2-batch5-2026-09-16/corrections.json": "5366874e9d54cdce6225032b9f17e9e91bcca03bad3db570974b09342b4eaaa8",
  "docs/hanja-g2-batch5-2026-09-16/candidate-paths.json": "fc078eac6c313b6090bdb61dc565dadf7af599d9686ec3acb768e1e036265275",
  "docs/hanja-g2-batch5-2026-09-16/review.json": "15a5cb793e98616f8aeecf9719cba39645e149e8fe30c2afab4fd33d74cf6410"
}
export function validateG2Batch5DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_BATCH5_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 batch5 dictionary proof mismatch: ' + path)
  }
}
export function g2Batch5DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2Batch5DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 batch5 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 batch5 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 batch5 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 batch5 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 batch5 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2Batch5DictionaryBundle(): G2Batch5DictionaryBundle {
  validateG2Batch5DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_BATCH5_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_BATCH5_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_BATCH5_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 batch5 dictionary approved set mismatch')
  const characters = G2_BATCH5_DICTIONARY_REFERENCES.map(ref => {
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
        || observation.correctedReview.reviewedStrokes !== ref.strokes
        || !isDeepStrictEqual(observation.correctedReview.checks, expectedChecks)))
      || !source || !isDeepStrictEqual(source.dictionary, original.dictionary)
      || source.strokes.length !== ref.strokes || new Set(source.strokes.map(s => s.xmlIndex)).size !== ref.strokes
      || source.strokes.some((s, i, list) => s.duration <= 0 || s.delay < 0 || (i > 0 && s.delay < list[i - 1].delay + list[i - 1].duration)))
      throw Error('G2 batch5 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2Batch5DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 batch5 dictionary frozen candidate mismatch')
    return { ...g2Batch5DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_BATCH5_DICTIONARY_VERIFICATION, geometrySources: G2_BATCH5_DICTIONARY_GEOMETRY, characters }
}
export function validateG2Batch5DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2Batch5DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_BATCH5_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 batch5 dictionary published entry mismatch')
}
export function validateG2Batch5DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_BATCH5_STROKES) {
  const expected = buildG2Batch5DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_BATCH5_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 batch5 dictionary published bundle mismatch')
}
