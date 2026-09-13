/** Reconstruct the exact reviewed Ja-derived candidate; never import vendor SVG paths. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import {
  HANJA_DICTIONARY_JA_GEOMETRY, HANJA_DICTIONARY_JA_VERIFICATION, HANJA_DICTIONARY_JA_ENTRY,
  HANJA_DICTIONARY_JA_ORIGINAL_SHA256, HANJA_DICTIONARY_JA_STROKES, type DictionaryJaBundle,
} from '../lib/hanja-stroke-dictionary-ja.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const dir = 'docs/hanja-g3ii-hyang-2026-09-13/'
export const JA_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g3ii-hyang-2026-09-13/originals.json": "596d94bad4f521b975f3e811c03cbe10f767d4c07a3c9d4debf1bfa066a2d135",
  "docs/hanja-g3ii-hyang-2026-09-13/prior-candidate.json": "db83fc6edd98a73a485d0e9c5a286933684cece1df36e811e70ce6cc9123e470",
  "docs/hanja-g3ii-hyang-2026-09-13/corrections.json": "3e9881a3d794fcffd48ea283b282d891c2e99a2519a1a501ff9481a0423fe458",
  "docs/hanja-g3ii-hyang-2026-09-13/observations.json": "782b37401cff2730119588fa8802a1070f929c1a50095bedc6230306bac671ce",
  "docs/hanja-g3ii-hyang-2026-09-13/candidate-paths.json": "35d4ce7381e32440ec962d8d1e1ec8879bc31478f224ed2974f916de3bddc038",
  "docs/hanja-g3ii-hyang-2026-09-13/review.json": "d3824f6af8659b9e1083d055593651e86a3a108f66e4181afa2de3c9676f3a13",
  "docs/hanja-g3ii-dictionary-12-2026-09-13/sources.json": "9c446f8e8475b71c657b884300b648dd508d27432e410aadaaba13d5010f1f98"
}
export function validateJaDictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(JA_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected) throw new Error('Ja dictionary proof mismatch: ' + path)
  }
}
export function jaDictionaryGeometry(glyph: string, medians: Parameters<typeof normalizeMedians>[0]) {
  if (glyph !== '響' || hash(medians) !== HANJA_DICTIONARY_JA_ORIGINAL_SHA256) throw new Error('Ja dictionary original mismatch')
  const recipe = JSON.parse(read(dir + 'corrections.json')) as {
    glyph: string; geometrySource: string; originalMediansSha256: string;
    strokes: { sourceStroke: number | null; points: [number, number][] }[]
  }
  if (recipe.glyph !== glyph || recipe.geometrySource !== HANJA_DICTIONARY_JA_GEOMETRY.sha256
    || recipe.originalMediansSha256 !== HANJA_DICTIONARY_JA_ORIGINAL_SHA256
    || !isDeepStrictEqual(recipe.strokes.map(s => s.sourceStroke), HANJA_DICTIONARY_JA_ENTRY.sourceStrokeIndices)
    || recipe.strokes.some(s => s.points.length < 2 || s.points.some(p => p.length !== 2 || p.some(n => !Number.isFinite(n) || n < 0 || n > 100)))) throw new Error('Ja dictionary recipe mismatch')
  const paths = normalizeMedians(recipe.strokes.map(s => s.points.map(([x, y]) => [x, -y])))
  if (paths.length !== 22 || hash(paths) !== HANJA_DICTIONARY_JA_ENTRY.pathsSha256) throw new Error('Ja dictionary reconstructed geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildJaDictionaryBundle(): DictionaryJaBundle {
  validateJaDictionaryProofs()
  const original = JSON.parse(read(dir + 'originals.json')) as {
    sha256: string; entries: { glyph: string; medians: Parameters<typeof normalizeMedians>[0] }[]
  }
  if (original.sha256 !== HANJA_DICTIONARY_JA_GEOMETRY.sha256 || original.entries.length !== 1
    || original.entries[0].glyph !== '響') throw new Error('Ja dictionary corpus mismatch')
  const geometry = jaDictionaryGeometry('響', original.entries[0].medians)
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  if (frozen.entries.length !== 1 || frozen.entries[0].glyph !== '響'
    || !isDeepStrictEqual(geometry.paths, frozen.entries[0].paths)) throw new Error('Ja dictionary frozen candidate mismatch')
  return {
    verificationSource: HANJA_DICTIONARY_JA_VERIFICATION, geometrySource: HANJA_DICTIONARY_JA_GEOMETRY,
    characters: [{ ...HANJA_DICTIONARY_JA_ENTRY, ...geometry }],
  }
}
export function validateJaDictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const expected = { ...buildJaDictionaryBundle().characters[0], verificationSource: HANJA_DICTIONARY_JA_VERIFICATION.id }
  if (expectedStrokes !== 22 || !isDeepStrictEqual(entry, expected)) throw new Error('Ja dictionary published entry mismatch')
}
export function validateJaDictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_JA_STROKES) {
  const expected = buildJaDictionaryBundle().characters.map(e => ({ ...e, verificationSource: HANJA_DICTIONARY_JA_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw new Error('Ja dictionary published bundle mismatch')
}
