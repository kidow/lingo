/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_BATCH10_DICTIONARY_VERIFICATION, G2_BATCH10_DICTIONARY_GEOMETRY, G2_BATCH10_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_BATCH10_STROKES, g2Batch10DictionaryReference, g2Batch10DictionaryMetadata,
  type G2Batch10DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-batch10.ts'

const dir = 'docs/hanja-g2-batch10-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G2_BATCH10_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_BATCH10_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-batch10-2026-09-16/initial-observations.json": "8a966e47810f45dd3e78982af77ea8c982b6395eb5c654edc22f7d0fa77b7784",
  "docs/hanja-g2-batch10-2026-09-16/originals.json": "5e14aff1d1c731ad58cbcd4e48fffda5197361ecacd5ff4732e529775f5eda91",
  "docs/hanja-g2-batch10-2026-09-16/observations.json": "0a537e24763c09a5359e5d491e52abf6ff41108a566954e4af94e3fc3464b808",
  "docs/hanja-g2-batch10-2026-09-16/proposals.json": "6bb6037494779b6495528731124a3b0be6c9a74326b3274f2a206c3a3ff4579c",
  "docs/hanja-g2-batch10-2026-09-16/source-checks.json": "9688187aaececdd85ec3a8dedbf20438c1ad11c4c56554415a422791caed924c",
  "docs/hanja-g2-batch10-2026-09-16/corrections.json": "46cb1123291618622224f484d4b24abe8983eb3156fe3b0eedc1f74c8cca6db7",
  "docs/hanja-g2-batch10-2026-09-16/candidate-paths.json": "555fb0c5342b9c86c8e827286d5307de5c0f996c99c55e8011b9c3ae92d9cdc2",
  "docs/hanja-g2-batch10-2026-09-16/review.json": "c888633aac14627e4dba92a15a421a53c4acc658092aefe64128a3da771d3fea"
}
export function validateG2Batch10DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_BATCH10_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 batch10 dictionary proof mismatch: ' + path)
  }
}
export function g2Batch10DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2Batch10DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 batch10 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 batch10 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 batch10 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 batch10 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 batch10 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2Batch10DictionaryBundle(): G2Batch10DictionaryBundle {
  validateG2Batch10DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_BATCH10_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_BATCH10_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_BATCH10_DICTIONARY_GEOMETRY) || originals.entries.length !== 7
    || new Set(originals.entries.map(e => e.glyph)).size !== 7 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 batch10 dictionary approved set mismatch')
  const characters = G2_BATCH10_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G2 batch10 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2Batch10DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 batch10 dictionary frozen candidate mismatch')
    return { ...g2Batch10DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_BATCH10_DICTIONARY_VERIFICATION, geometrySources: G2_BATCH10_DICTIONARY_GEOMETRY, characters }
}
export function validateG2Batch10DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2Batch10DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_BATCH10_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 batch10 dictionary published entry mismatch')
}
export function validateG2Batch10DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_BATCH10_STROKES) {
  const expected = buildG2Batch10DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_BATCH10_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 batch10 dictionary published bundle mismatch')
}
