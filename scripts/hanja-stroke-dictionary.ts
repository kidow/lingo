/** Offline proof and geometry reconstruction. Vendor SVG paths are never imported. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import { HANJA_TEXTBOOK_STROKES } from '../lib/hanja-stroke-textbook.ts'
import {
  HANJA_DICTIONARY_SOURCE, HANJA_DICTIONARY_GEOMETRY_SOURCE, HANJA_DICTIONARY_STROKES,
  DICTIONARY_REFERENCES, dictionarySourceReference, dictionaryStrokeIndices,
  type DictionaryBundle, type HanjaDictionaryStrokeData,
} from '../lib/hanja-stroke-dictionary.ts'

type Medians = Parameters<typeof normalizeMedians>[0]
export type DictionaryCandidate = { character: string; medians: Medians; strokes?: readonly string[] }
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
export const DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  'docs/hanja-g3ii-direction-3-2026-09-13/direction-review.json': 'fb78cd80c63793d4edb5f0ce34adc7b9851207c39c69b5a905425fcddef25c78',
  'docs/hanja-g3ii-gyeol-mun-2026-09-13/candidate-paths.json': 'f180a3b12dba2e4e260adad2d2fd67804e3e7f97671f934a6c9b4b2ac27c507d',
  'docs/hanja-g3ii-gyeol-mun-2026-09-13/originals.json': '1af04d53757249d03adfed126e40659ba96d82046213a179eb8594d607380d84',
  'docs/hanja-g3ii-gyeol-mun-2026-09-13/donors.json': 'b83dbee67088e4b0163672f171453355b899e266ec83d27e8036ade902eb35bf',
  'docs/hanja-g3ii-gyeol-mun-2026-09-13/review.json': '7a50a6ecc20a69e8311a57cf85960288735910cb7f0c66f890fad7ebdd413aef',
  'docs/hanja-g3ii-crosscheck-63-2026-09-13/review-a.json': 'ab877fcc6bcb0d24f78b0bfaa4890b1da76e7e1edb131f1bfa1f105462b5cd16',
  'docs/hanja-g3ii-crosscheck-63-2026-09-13/source-matrix.json': 'd278ec44ac5c0f3535fa0b91ce69446b9aad375ad1ac1094d0b58952155233ee',
  'docs/hanja-g3ii-missing-17-2026-09-13/research-provenance.json': 'fbd7dcdd659bacd098b80849e57e4743dc7dc0b4302c2be63bebf889d0833a46',
}
export function validateDictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected) throw new Error('Dictionary proof mismatch: ' + path)
  }
}
const oldDir = 'docs/hanja-g3ii-gyeol-mun-2026-09-13/'
type OriginalSource = { name: string; sha256: string; entries: { glyph: string; medians: Medians }[] }
type Donor = { glyph: string; paths: string[]; hash: string; [key: string]: unknown }
function originals() {
  const sources = JSON.parse(read(oldDir + 'originals.json')) as OriginalSource[]
  const source = sources.find(s => s.name === 'MM')
  if (!source || source.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256) throw new Error('Dictionary corpus mismatch')
  return source.entries
}
const points = (path: string) => {
  if (!/^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)) throw new Error('Dictionary path syntax')
  return [...path.matchAll(/[ML]([-.\d]+) ([-.\d]+)/g)].map(m => [+m[1], +m[2]])
}
const bounds = (paths: readonly string[]) => {
  const p = paths.flatMap(points)
  return [Math.min(...p.map(p => p[0])), Math.min(...p.map(p => p[1])), Math.max(...p.map(p => p[0])), Math.max(...p.map(p => p[1]))]
}
export function dictionaryGeometry(glyph: string, medians: Medians) {
  const ref = Object.hasOwn(DICTIONARY_REFERENCES, glyph) ? DICTIONARY_REFERENCES[glyph] : undefined
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw new Error('Dictionary original medians mismatch: ' + glyph)
  let paths = normalizeMedians(medians)
  if (glyph === '紋') {
    const snapshot = (JSON.parse(read(oldDir + 'donors.json')) as Donor[]).find(d => d.glyph === '紅')
    if (!snapshot) throw new Error('Dictionary donor missing')
    const { hash: expected, ...donor } = snapshot
    if (hash(donor) !== expected || hash(HANJA_TEXTBOOK_STROKES.find(d => d.glyph === '紅')) !== expected) throw new Error('Dictionary reviewed donor mismatch')
    const from = bounds(snapshot.paths.slice(0, 6)), to = bounds(paths.slice(0, 6))
    const sx = (to[2] - to[0]) / (from[2] - from[0]), sy = (to[3] - to[1]) / (from[3] - from[1])
    if (!(sx > 0 && sy > 0)) throw new Error('Dictionary donor reflection')
    const round = (n: number) => Math.round(n * 10) / 10
    paths = paths.map((p, i) => i === 3 || i === 4
      ? points(snapshot.paths[i]).map(([x, y], j) => (j ? 'L' : 'M')
        + round(to[0] + (x - from[0]) * sx) + ' ' + round(to[1] + (y - from[1]) * sy)).join(' ')
      : p)
  }
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256
    || paths.flatMap(points).some(p => p.some(n => !Number.isFinite(n) || n < 0 || n > 100))) throw new Error('Dictionary reconstructed geometry mismatch: ' + glyph)
  return { paths, pathsSha256: hash(paths) }
}
export function buildDictionaryBundle(candidates?: readonly DictionaryCandidate[]): DictionaryBundle {
  validateDictionaryProofs()
  const expectedOriginals = originals()
  const input = candidates ?? expectedOriginals.map(e => ({ character: e.glyph, medians: e.medians }))
  const byGlyph = new Map(input.map(e => [e.character, e]))
  if (byGlyph.size !== 2 || input.length !== 2 || input.some(e => !Object.hasOwn(DICTIONARY_REFERENCES, e.character))) throw new Error('Dictionary candidate set mismatch')
  const frozen = JSON.parse(read(oldDir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  return {
    verificationSource: HANJA_DICTIONARY_SOURCE, geometrySource: HANJA_DICTIONARY_GEOMETRY_SOURCE,
    characters: Object.keys(DICTIONARY_REFERENCES).map(glyph => {
      const paths = dictionaryGeometry(glyph, byGlyph.get(glyph)!.medians)
      if (!isDeepStrictEqual(paths.paths, frozen.entries.find(e => e.glyph === glyph)?.paths)) throw new Error('Dictionary frozen candidate mismatch')
      return {
        glyph, verifiedAt: '2026-09-13', geometrySource: HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256,
        geometryCorrection: 'dictionary-crosscheck-' + glyph.codePointAt(0)!.toString(16) + '-v1',
        sourceStrokeIndices: dictionaryStrokeIndices(glyph), ...paths, sourceReference: dictionarySourceReference(glyph),
      }
    }),
  }
}
export function validateDictionaryReview(review: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const expected = buildDictionaryBundle().characters.find(e => e.glyph === review.glyph)
  if (!expected || expected.paths.length !== expectedStrokes
    || !isDeepStrictEqual(review, { ...expected, verificationSource: HANJA_DICTIONARY_SOURCE.id })) throw new Error('Dictionary published entry mismatch')
}
export function validateDictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_STROKES) {
  const expected = buildDictionaryBundle().characters.map(e => ({ ...e, verificationSource: HANJA_DICTIONARY_SOURCE.id }))
  if (!isDeepStrictEqual(entries, expected)) throw new Error('Dictionary published bundle mismatch')
}
