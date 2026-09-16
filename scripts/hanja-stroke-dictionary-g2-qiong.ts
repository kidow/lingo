/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_QIONG_DICTIONARY_VERIFICATION, G2_QIONG_DICTIONARY_GEOMETRY, G2_QIONG_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_QIONG_STROKES, g2QiongDictionaryReference, g2QiongDictionaryMetadata,
  type G2QiongDictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-qiong.ts'

const dir = 'docs/hanja-g2-qiong-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_QIONG_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_QIONG_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-qiong-2026-09-16/initial-observations.json": "d250966f71485192b317ccaaa91e208d18a093cf5875451a10c710c53f99e87a",
  "docs/hanja-g2-qiong-2026-09-16/originals.json": "7eeb8bf0dbe88d0390095149e8d11977312aa6380557ab70d9272b9f1bca439e",
  "docs/hanja-g2-qiong-2026-09-16/observations.json": "d1672882f6b0e76178d5414a3d863cdbb72194bfd84a5a811af60d183a87e713",
  "docs/hanja-g2-qiong-2026-09-16/proposals.json": "491e7e5269ac8209500fd5fa3485ca4ee9f8caa56a578d0bdcb1bbd135e4b129",
  "docs/hanja-g2-qiong-2026-09-16/source-checks.json": "ff343fdaa4d86db107741ef28ef3716a07a83d7b3d4979c22274e78d7fadbaa1",
  "docs/hanja-g2-qiong-2026-09-16/corrections.json": "aef58a8897cd4c17f0860b5333ee7a3c75be31a6964a5b2db2eba8338b9bc1d1",
  "docs/hanja-g2-qiong-2026-09-16/count-basis.json": "0a8b9924e8beb18f592cf9dc7fb5639df23891968150d5fa76677af17bf209b3",
  "docs/hanja-g2-qiong-2026-09-16/candidate-paths.json": "20bd3865387a0463c33435dd25a325404c28ee6505fd56ba1a1f0d1f9c850050",
  "docs/hanja-g2-qiong-2026-09-16/review.json": "9dc970465c4d624287307dbdda1d6cb07474e62aee83b4e2512e05a0fd7d7ab2"
}
export function validateG2QiongDictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_QIONG_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 qiong dictionary proof mismatch: ' + path)
  }
}
export function g2QiongDictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2QiongDictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 qiong dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 qiong dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 qiong dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 qiong dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 qiong dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2QiongDictionaryBundle(): G2QiongDictionaryBundle {
  validateG2QiongDictionaryProofs()
  const basis = JSON.parse(read(dir + 'count-basis.json')) as {
    glyph: string; strokes: number; dictionaryStrokes: number; automaticRadicalApproval: boolean
    wholeFormSource: { embeddedXmlSha256: string; strokes: number }
    officialRulings: { id: number }[]; runtimeToMoeStroke: number[]; runtimeToDictionaryStroke: (number|null)[]
  }
  const catalog = JSON.parse(read('content/hanja/characters/g2.json')) as { characters: { glyph: string; strokes: number }[] }
  if (basis.glyph !== '瓊' || basis.strokes !== 19 || basis.dictionaryStrokes !== 18
    || basis.wholeFormSource.embeddedXmlSha256 !== '8b3af69f2301ca72701f2d0a17511f7a97f17d73e89286daacdfaa5362949d5c'
    || basis.wholeFormSource.strokes !== 19 || basis.automaticRadicalApproval !== false
    || !isDeepStrictEqual(basis.officialRulings.map(r => r.id), [7946,10717])
    || !isDeepStrictEqual(basis.runtimeToMoeStroke, Array.from({length:19},(_,i)=>i+1))
    || !isDeepStrictEqual(basis.runtimeToDictionaryStroke, [...Array.from({length:15},(_,i)=>i+1),null,null,null,null])
    || catalog.characters.find(c => c.glyph === '瓊')?.strokes !== 19)
    throw Error('G2 qiong explicit form and whole-source basis mismatch')
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_QIONG_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_QIONG_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_QIONG_DICTIONARY_GEOMETRY) || originals.entries.length !== 1
    || new Set(originals.entries.map(e => e.glyph)).size !== 1 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 qiong dictionary approved set mismatch')
  const characters = G2_QIONG_DICTIONARY_REFERENCES.map(ref => {
    const original = originals.entries.find(e => e.glyph === ref.glyph)
    const observation = observations.entries.find(e => e.glyph === ref.glyph)
    const source = sourceChecks.entries.find(e => e.glyph === ref.glyph)
    const expectedChecks = { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' }
    if (!original || original.corpus !== ref.corpus || original.strokes !== ref.strokes || original.dictionaryStrokes !== ref.dictionaryStrokes
      || original.originalMediansSha256 !== ref.originalMediansSha256
      || !isDeepStrictEqual(normalizeMedians(original.medians), original.paths)
      || original.dictionary.url !== ref.dictionaryUrl || original.dictionary.sha256 !== ref.dictionarySha256
      || !observation || observation.decision !== 'matched' || observation.directions.length !== ref.strokes
      || !isDeepStrictEqual(observation.checks, expectedChecks)
      || (observation.initialDecision !== 'matched' && (!observation.correctedReview?.completed
        || observation.correctedReview.reviewedStrokes !== 7
        || !isDeepStrictEqual(observation.correctedReview.checks, expectedChecks)))
      || !source || !isDeepStrictEqual(source.dictionary, original.dictionary)
      || source.strokes.length !== ref.dictionaryStrokes || !isDeepStrictEqual(source.strokes.map(s => s.xmlIndex),
        [15,16,17,18,...Array.from({length:14},(_,i)=>i+1)])
      || source.strokes.some((s, i, list) => s.duration <= 0 || s.delay < 0 || (i > 0 && s.delay < list[i - 1].delay + list[i - 1].duration)))
      throw Error('G2 qiong dictionary review incomplete: ' + ref.glyph)
    const geometry = g2QiongDictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 qiong dictionary frozen candidate mismatch')
    return { ...g2QiongDictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_QIONG_DICTIONARY_VERIFICATION, geometrySources: G2_QIONG_DICTIONARY_GEOMETRY, characters }
}
export function validateG2QiongDictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2QiongDictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_QIONG_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 qiong dictionary published entry mismatch')
}
export function validateG2QiongDictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_QIONG_STROKES) {
  const expected = buildG2QiongDictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_QIONG_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 qiong dictionary published bundle mismatch')
}
