/** 葛 儆 菓: full dictionary sequences reviewed after per-glyph boundary and join corrections. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch1.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH1_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 1: 葛 儆 菓 full dictionary sequences individually checked; split top horizontals and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH1_DICTIONARY_GEOMETRY = {
  "Ko": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsKo.txt",
    "sha256": "7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 1387824
  },
  "Ja": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsJa.txt",
    "sha256": "2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 21862957
  },
  "MM": {
    "url": "https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt",
    "sha256": "a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 30778076
  }
} as const
export type G2GeometryBatch1DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH1_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH1_DICTIONARY_REFERENCES: readonly G2GeometryBatch1DictionaryReference[] = [
  {
    "glyph": "葛",
    "strokes": 13,
    "originalStrokes": 12,
    "corpus": "MM",
    "originalMediansSha256": "b77c34ef93da47000e183dda8c2f6ad5f571d85e3797176c9d897ffab9f8faf2",
    "pathsSha256": "4901f17919b3fa2610ee9570d55b9a98d88b03f8bd0df868397a28f2b7f9044b",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8400/845B.svg",
    "dictionarySha256": "3adadc983fa12f72f289b0d9ad87aa62a8feb4a3b6824cccd5550a22f675c259",
    "sourceStrokeIndices": [
      null,
      2,
      null,
      3,
      4,
      5,
      null,
      null,
      8,
      9,
      10,
      11,
      12
    ]
  },
  {
    "glyph": "儆",
    "strokes": 15,
    "originalStrokes": 14,
    "corpus": "MM",
    "originalMediansSha256": "a3909e3a4122dafad9a00fa3fb8ff77a11cdd972340698e829beffe9dc54a0a5",
    "pathsSha256": "baeedbaa6d7f8a19cec7622e9ab092856be5550a27392af39e699d0d798e3ba0",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/5106.svg",
    "dictionarySha256": "b92d76531fb7612042abf0826f8864d356e317125b7e51ff7991c112d4114df7",
    "sourceStrokeIndices": [
      1,
      2,
      null,
      4,
      null,
      5,
      6,
      7,
      8,
      null,
      null,
      11,
      12,
      null,
      null
    ]
  },
  {
    "glyph": "菓",
    "strokes": 12,
    "originalStrokes": 11,
    "corpus": "Ja",
    "originalMediansSha256": "a71c2d96f594ecebe60c99c41c1903eae00d50fe9801d81b17a335e416f9e740",
    "pathsSha256": "35b9f24749c85f1ff413b1ef7f57b402c235ee0f526f1f54af0419423a421955",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83D3.svg",
    "dictionarySha256": "10d23efcdeaf82d86b59c50314040c9fedaa4cce10b8632dc235d973f147004c",
    "sourceStrokeIndices": [
      null,
      2,
      null,
      3,
      4,
      5,
      null,
      null,
      8,
      9,
      10,
      11
    ]
  }
]
export const G2_GEOMETRY_BATCH1_DICTIONARY_REVIEW_SHA256 = '42b6dd0d3fb43bbb122c2ff47f87db0dad1763d667356efdf6a5b2e2f3bb0983'
export const G2_GEOMETRY_BATCH1_DICTIONARY_DIRECTION_SHA256 = 'a92a91865e74a21b729f9309fea29fedfd96b0f64078dff570355dddb6363806'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH1_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch1DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch1DictionaryMetadata(ref: G2GeometryBatch1DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH1_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch1-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH1_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH1_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH1_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch1DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH1_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH1_DICTIONARY_GEOMETRY
  characters: readonly Omit<HanjaDictionaryStrokeData, 'verificationSource'>[]
}
function same(value: unknown, expected: unknown): boolean {
  if (value === expected) return true
  if (Array.isArray(expected)) return Array.isArray(value) && value.length === expected.length
    && expected.every((e, i) => same(value[i], e))
  if (!value || !expected || typeof value !== 'object' || typeof expected !== 'object' || Array.isArray(value)) return false
  const actual = value as Record<string, unknown>, reference = expected as Record<string, unknown>
  return Object.keys(actual).length === Object.keys(reference).length
    && Object.entries(reference).every(([k, v]) => Object.hasOwn(actual, k) && same(actual[k], v))
}
export function loadG2GeometryBatch1DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch1 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH1_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH1_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH1_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch1 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch1 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH1_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch1DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch1 dictionary entry mismatch')
    return { ...g2GeometryBatch1DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH1_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH1_STROKES = loadG2GeometryBatch1DictionaryBundle(reviewed)
