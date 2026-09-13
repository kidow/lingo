/** Pure generation/validation; no source media download or file writes. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import {
  HANJA_NUMBERED_SOURCE, HANJA_NUMBERED_GEOMETRY_SOURCE, HANJA_NUMBERED_STROKES,
  NUMBERED_REFERENCES, numberedSourceReference, numberedStrokeIndices, type HanjaNumberedStrokeData, type NumberedBundle,
} from '../lib/hanja-stroke-numbered.ts'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import { samplePath } from './hanja-component-geometry.ts'
import originals from './hanja-stroke-numbered-originals.json' with { type: 'json' }
import cheonRecipe from '../docs/hanja-g3ii-cheon-paths-2026-09-13/recipe.json' with { type: 'json' }

type Medians = Parameters<typeof normalizeMedians>[0]
export type NumberedCandidate = { character: string; medians: Medians; strokes?: readonly string[] }
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const originalHashes: Readonly<Record<string, string>> = {
  笛: 'cc1434e3800482261bd5df01c2f508a7caa31f89874cf11fdb67236eed88f01e',
  蹟: '78c12699d63b0040ad925e5b8371d8abcf1ca733a0224b14ca90e7bc431de448',
  稚: '199b694f6eb4771d6cc8655bb785bb380191d977e3107ef51f0abbf0ecc97ecb',
  遷: '7bb671fbc49d1e2bdfecb5185443439e471c25cf7b3510d75f37f846f6ca9874',
}
const proofFiles = {
  'docs/hanja-g3ii-missing-17-2026-09-13/source-matrix.json': HANJA_NUMBERED_SOURCE.sourceReviewSha256,
  'docs/hanja-g3ii-missing-17-2026-09-13/research-provenance.json': HANJA_NUMBERED_SOURCE.publisherProvenanceSha256,
  'docs/hanja-g3ii-crosscheck-63-2026-09-13/source-matrix.json': 'd278ec44ac5c0f3535fa0b91ce69446b9aad375ad1ac1094d0b58952155233ee',
  'docs/hanja-g3ii-crosscheck-63-2026-09-13/review-b.json': '80b1e74cb9590544db806e17f77fc05a9f646317670417fffd8c902fd115187b',
  'docs/hanja-g3ii-crosscheck-63-2026-09-13/review-c.json': 'aaf5cba79f43f29ee492a44168e43c8f32202bc0bed8a0cae146b276a4b28ca4',
  'docs/hanja-g3ii-paths-42-2026-09-13/geometry-di.json': '437cc1b265632edb7396bce226fd584f80d8339eb2ea05d45c1ef4b7f2db3d21',
  'docs/hanja-g3ii-paths-42-2026-09-13/geometry-ji.json': '16107a1693e589e9b8b79add5c4452fb29f2f292403f6de6652ffec62cab6316',
  'docs/hanja-g3ii-paths-42-2026-09-13/geometry-zhi.json': '1570fa73aab6515ec2581d54f8803e3c43446b4cae140622d66ed7f6229b3d0a',
  'docs/hanja-g3ii-cheon-2026-09-13/sources.json': '7513789f073dfbf6d240ba8efeb2b829d5f556c6942d69333e9a0873a35b76f3',
  'docs/hanja-g3ii-cheon-paths-2026-09-13/originals.json': 'cbbd281e14d94e90539c245e998faeaaff71dbd74d38771795729e0d5f410e81',
  'docs/hanja-g3ii-cheon-paths-2026-09-13/recipe.json': 'e05ef750408339a600ef5d1901b335a3c626e91cb49bbd4184e0c12262827678',
  'docs/hanja-g3ii-cheon-paths-2026-09-13/review.json': 'a8d56f98029c3223cf820dcc75e59159eb9257c8e55d94bda35968e0b11a029a',
  'docs/hanja-g3ii-cheon-paths-2026-09-13/candidate-paths.json': '6d93f3f16d375ae25f9a0e2de0c1658a515220fe0a3ddc7313715a0ea81cb5e0',
  'docs/hanja-g3ii-cheon-paths-2026-09-13/sources.json': '3282cbc6b8942db232997aa6336621661a27e1e552ae94468c632db525884e90',
} as const

export function validateNumberedProofs(readProof: (file: string) => Uint8Array = file => readFileSync(new URL('../' + file, import.meta.url))) {
  for (const [file, expected] of Object.entries(proofFiles)) {
    const bytes = readProof(file)
    if (createHash('sha256').update(bytes).digest('hex') !== expected) {
      throw new Error('Numbered review proof changed: ' + file)
    }
  }
}

/** Reproduce pinned MM paths with only the per-glyph corrections and split already reviewed. */
export function numberedGeometry(glyph: string, medians: Medians) {
  if (!Object.hasOwn(NUMBERED_REFERENCES, glyph) || hash(medians) !== originalHashes[glyph]) {
    throw new Error('Numbered original medians mismatch: ' + glyph)
  }
  const corrected = medians.map(stroke => stroke.map(point => [...point]))
  if (glyph === '遷') {
    const { sourceStroke, sharedPointIndex } = cheonRecipe.split
    const source = corrected[sourceStroke - 1]
    corrected.splice(sourceStroke - 1, 1, source.slice(0, sharedPointIndex + 1), source.slice(sharedPointIndex))
    for (const correction of cheonRecipe.pointCorrections) {
      corrected[correction.stroke - 1][correction.pointIndex] = [...correction.corrected]
    }
  }
  const paths = normalizeMedians(corrected)
  if (glyph === '蹟' || glyph === '稚') {
    const index = glyph === '蹟' ? 11 : 1
    const points = paths[index].split(/(?=[ML])/).map(part => part.slice(1).trim().split(/\s+/).map(Number))
    if (glyph === '蹟') {
      points[0][1] = 46.3
      points[1][1] = 46.6
    } else points[points.length - 1][0] = 41
    paths[index] = points.map(([x, y], i) => (i ? 'L' : 'M') + x + ' ' + y).join(' ')
  }
  if (paths.length !== NUMBERED_REFERENCES[glyph].strokes || hash(paths) !== NUMBERED_REFERENCES[glyph].pathsSha256) {
    throw new Error('Numbered reviewed path hash mismatch: ' + glyph)
  }
  paths.forEach(path => samplePath(path, 2))
  return { paths, sourceStrokeIndices: numberedStrokeIndices(glyph) }
}

export function buildNumberedBundle(candidates: readonly NumberedCandidate[] = originals.candidates): NumberedBundle {
  validateNumberedProofs()
  if (originals.sha256 !== HANJA_NUMBERED_GEOMETRY_SOURCE.sha256
    || originals.sourceUrl !== HANJA_NUMBERED_GEOMETRY_SOURCE.url) throw new Error('Numbered corpus source mismatch')
  const byGlyph = new Map<string, NumberedCandidate>()
  for (const candidate of candidates) {
    if (!candidate || !Object.hasOwn(NUMBERED_REFERENCES, candidate.character) || byGlyph.has(candidate.character)) {
      throw new Error('Duplicate or unsupported numbered candidate')
    }
    byGlyph.set(candidate.character, candidate)
  }
  const characters = Object.keys(NUMBERED_REFERENCES).map(glyph => {
    const candidate = byGlyph.get(glyph)
    const ref = NUMBERED_REFERENCES[glyph]
    if (!candidate || (candidate.strokes !== undefined && candidate.strokes.length !== (ref.originalStrokes ?? ref.strokes))) {
      throw new Error('Numbered candidate missing or count mismatch: ' + glyph)
    }
    const { paths, sourceStrokeIndices } = numberedGeometry(glyph, candidate.medians)
    return {
      glyph, verifiedAt: ref.verifiedAt ?? '2026-09-13', geometrySource: HANJA_NUMBERED_GEOMETRY_SOURCE.sha256,
      geometryCorrection: 'reviewed-mm-' + glyph.codePointAt(0)!.toString(16) + '-v1',
      sourceStrokeIndices, pathsSha256: hash(paths), sourceReference: numberedSourceReference(glyph), paths,
    }
  })
  return { verificationSource: HANJA_NUMBERED_SOURCE, geometrySource: HANJA_NUMBERED_GEOMETRY_SOURCE, characters }
}

/** Full-entry equality binds order, shape and attribution to the reviewed originals. */
export function validateNumberedReview(review: HanjaNumberedStrokeData, expectedStrokes: number) {
  const expected = buildNumberedBundle().characters.find(entry => entry.glyph === review.glyph)
  if (!expected || expected.paths.length !== expectedStrokes
    || !isDeepStrictEqual(review, { ...expected, verificationSource: HANJA_NUMBERED_SOURCE.id })) {
    throw new Error('Numbered reviewed entry mismatch: ' + review.glyph)
  }
}

export function validateNumberedBundle(entries: readonly HanjaNumberedStrokeData[] = HANJA_NUMBERED_STROKES) {
  const expected = buildNumberedBundle().characters.map(entry => ({ ...entry, verificationSource: HANJA_NUMBERED_SOURCE.id }))
  if (!isDeepStrictEqual(entries, expected)) throw new Error('Numbered published bundle mismatch')
}
