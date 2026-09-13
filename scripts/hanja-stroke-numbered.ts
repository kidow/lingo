/** Pure generation/validation; no source media download or file writes. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import {
  HANJA_NUMBERED_SOURCE, HANJA_NUMBERED_GEOMETRY_SOURCE, HANJA_NUMBERED_STROKES,
  NUMBERED_REFERENCES, numberedSourceReference, type HanjaNumberedStrokeData, type NumberedBundle,
} from '../lib/hanja-stroke-numbered.ts'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import { samplePath } from './hanja-component-geometry.ts'
import originals from './hanja-stroke-numbered-originals.json' with { type: 'json' }

type Medians = Parameters<typeof normalizeMedians>[0]
export type NumberedCandidate = { character: string; medians: Medians; strokes?: readonly string[] }
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const originalHashes: Readonly<Record<string, string>> = {
  笛: 'cc1434e3800482261bd5df01c2f508a7caa31f89874cf11fdb67236eed88f01e',
  蹟: '78c12699d63b0040ad925e5b8371d8abcf1ca733a0224b14ca90e7bc431de448',
  稚: '199b694f6eb4771d6cc8655bb785bb380191d977e3107ef51f0abbf0ecc97ecb',
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
} as const

export function validateNumberedProofs() {
  for (const [file, expected] of Object.entries(proofFiles)) {
    const bytes = readFileSync(new URL('../' + file, import.meta.url))
    if (createHash('sha256').update(bytes).digest('hex') !== expected) {
      throw new Error('Numbered review proof changed: ' + file)
    }
  }
}

/** Reproduce the exact MM paths and only the three coordinates already reviewed. */
export function numberedGeometry(glyph: string, medians: Medians) {
  if (!Object.hasOwn(NUMBERED_REFERENCES, glyph) || hash(medians) !== originalHashes[glyph]) {
    throw new Error('Numbered original medians mismatch: ' + glyph)
  }
  const paths = normalizeMedians(medians)
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
  return { paths, sourceStrokeIndices: paths.map((_, i) => i + 1) }
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
    if (!candidate || (candidate.strokes !== undefined && candidate.strokes.length !== NUMBERED_REFERENCES[glyph].strokes)) {
      throw new Error('Numbered candidate missing or count mismatch: ' + glyph)
    }
    const { paths, sourceStrokeIndices } = numberedGeometry(glyph, candidate.medians)
    return {
      glyph, verifiedAt: '2026-09-13', geometrySource: HANJA_NUMBERED_GEOMETRY_SOURCE.sha256,
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
