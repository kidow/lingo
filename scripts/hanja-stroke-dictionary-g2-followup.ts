/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_FOLLOWUP_DICTIONARY_VERIFICATION, G2_FOLLOWUP_DICTIONARY_GEOMETRY, G2_FOLLOWUP_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_FOLLOWUP_STROKES, g2FollowupDictionaryReference, g2FollowupDictionaryMetadata,
  type G2FollowupDictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-followup.ts'

const dir = 'docs/hanja-g2-batch1-followup-2026-09-15/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G2_FOLLOWUP_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const G2_FOLLOWUP_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-batch1-followup-2026-09-15/originals.json": "08059b57bf5af89a38e1888b2cc8338762ca2a7d49cb6528369e41156dc2baf9",
  "docs/hanja-g2-batch1-followup-2026-09-15/observations.json": "ea544352924ace9d47850f067ac8b3add08eb72fcc6b791c17be17c0df8357ad",
  "docs/hanja-g2-batch1-followup-2026-09-15/proposals.json": "2fb04826e5b3599168b37e7fb2b0f5b579a64599adca44e738844c4df6ec0b57",
  "docs/hanja-g2-batch1-followup-2026-09-15/source-checks.json": "a4c69df42e6b1cb100934410a9db6e799ed0fb61d0863eaa09a2f800b9164b0d",
  "docs/hanja-g2-batch1-followup-2026-09-15/corrections.json": "750e6db7433a809226978ea1889483a110bf40bc35dc0a6154467f3f2cda8b03",
  "docs/hanja-g2-batch1-followup-2026-09-15/candidate-paths.json": "576512b7549bd70c59a223ed8449e8bbbff82a6cde460007a7d88275409e93c7",
  "docs/hanja-g2-batch1-followup-2026-09-15/review.json": "c7fb7ed673daff9ede9dde19dca864928370663222064188bb7b099951d5b50a"
}
export function validateG2FollowupDictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_FOLLOWUP_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 followup dictionary proof mismatch: ' + path)
  }
}
export function g2FollowupDictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2FollowupDictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 followup dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 followup dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 followup dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('G2 followup dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 followup dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2FollowupDictionaryBundle(): G2FollowupDictionaryBundle {
  validateG2FollowupDictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_FOLLOWUP_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_FOLLOWUP_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_FOLLOWUP_DICTIONARY_GEOMETRY) || originals.entries.length !== 6
    || new Set(originals.entries.map(e => e.glyph)).size !== 6 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 followup dictionary approved set mismatch')
  const characters = G2_FOLLOWUP_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G2 followup dictionary review incomplete: ' + ref.glyph)
    const geometry = g2FollowupDictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 followup dictionary frozen candidate mismatch')
    return { ...g2FollowupDictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_FOLLOWUP_DICTIONARY_VERIFICATION, geometrySources: G2_FOLLOWUP_DICTIONARY_GEOMETRY, characters }
}
export function validateG2FollowupDictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2FollowupDictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_FOLLOWUP_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 followup dictionary published entry mismatch')
}
export function validateG2FollowupDictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_FOLLOWUP_STROKES) {
  const expected = buildG2FollowupDictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_FOLLOWUP_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 followup dictionary published bundle mismatch')
}
