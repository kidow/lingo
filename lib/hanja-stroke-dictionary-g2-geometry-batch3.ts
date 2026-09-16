/** 礪 遼 膜: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch3.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH3_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 3: 礪 遼 膜 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH3_DICTIONARY_GEOMETRY = {
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
export type G2GeometryBatch3DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH3_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH3_DICTIONARY_REFERENCES: readonly G2GeometryBatch3DictionaryReference[] = [
  {
    "glyph": "礪",
    "strokes": 20,
    "originalStrokes": 19,
    "corpus": "Ja",
    "originalMediansSha256": "e9de845ff7fa1930f3926c3fb56b7fe4e37d556ac31f2fed804e24a760f3995a",
    "pathsSha256": "73964923499e04b99af7cf8d1b341fb5832f6218c7ac4882a4a789f26cc8980c",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/792A.svg",
    "dictionarySha256": "c721a970c539e60a231031bbe466224e7f9c73b5cce75299aa0dbc826218b602",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      null,
      null,
      null,
      7,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      15,
      null,
      null,
      null,
      null
    ]
  },
  {
    "glyph": "遼",
    "strokes": 16,
    "originalStrokes": 15,
    "corpus": "MM",
    "originalMediansSha256": "09f63552c0143c480e17100a1f1c791217c4742f09a85685c1d0e5a6b0cf15eb",
    "pathsSha256": "eb708552357f02fb05ece3f0a182a715acf772572d7dbefe1df36c702f4a6602",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/907C.svg",
    "dictionarySha256": "73da14f38d85da3087cc16313c439ed24c0bb2f3b7e84c2a1acbfa992c35b1d2",
    "sourceStrokeIndices": [
      null,
      2,
      null,
      null,
      null,
      6,
      null,
      null,
      null,
      null,
      11,
      null,
      13,
      null,
      null,
      null
    ]
  },
  {
    "glyph": "膜",
    "strokes": 15,
    "originalStrokes": 14,
    "corpus": "MM",
    "originalMediansSha256": "10fe884f3effe10c1869fd7f11498cd0bf8121d66a5169d4e976f87a2eb713bc",
    "pathsSha256": "ac60bfb92607240f332eb6be581090eeb58883d566a0f1d7f609cf3feffdccaf",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/819C.svg",
    "dictionarySha256": "64a4a224d23d838af525dc7805781038588be130746d03ead506dff612c74abb",
    "sourceStrokeIndices": [
      1,
      null,
      null,
      null,
      null,
      6,
      null,
      null,
      8,
      null,
      null,
      null,
      null,
      null,
      null
    ]
  }
]
export const G2_GEOMETRY_BATCH3_DICTIONARY_REVIEW_SHA256 = 'eafcda9d7c16236834e3e18de16af6699b6211ad39483ac0d775da0fd98c7cc2'
export const G2_GEOMETRY_BATCH3_DICTIONARY_DIRECTION_SHA256 = 'b157c7f6925f69b475a498b25589e04a47e50c6afc7b9d53f476a8ba72b1691f'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH3_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch3DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch3DictionaryMetadata(ref: G2GeometryBatch3DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH3_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch3-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH3_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH3_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH3_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch3DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH3_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH3_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch3DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch3 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH3_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH3_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH3_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch3 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch3 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH3_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch3DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch3 dictionary entry mismatch')
    return { ...g2GeometryBatch3DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH3_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH3_STROKES = loadG2GeometryBatch3DictionaryBundle(reviewed)
