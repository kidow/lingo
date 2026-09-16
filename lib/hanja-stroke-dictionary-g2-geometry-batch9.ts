/** 莞 芸 蔚: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch9.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH9_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 9: 莞 芸 蔚 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH9_DICTIONARY_GEOMETRY = {
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
export type G2GeometryBatch9DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH9_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH9_DICTIONARY_REFERENCES: readonly G2GeometryBatch9DictionaryReference[] = [
  {
    "glyph": "莞",
    "strokes": 11,
    "originalStrokes": 10,
    "corpus": "MM",
    "originalMediansSha256": "f22c26a75c619b6d0eaf457461f7308462585e3579183fd8f262767594418d22",
    "pathsSha256": "4b6b809715e20e5d6a953f6fffd51c1e586d02834ea6c4fb15966f6fd2e88fb6",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/839E.svg",
    "dictionarySha256": "8bc78f51f6a7fd5b3710033c3b17a20ea21ee921273ad69bb90333bd8ef7ca13",
    "sourceStrokeIndices": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ]
  },
  {
    "glyph": "芸",
    "strokes": 8,
    "originalStrokes": 7,
    "corpus": "MM",
    "originalMediansSha256": "25394a73495288f50b18fe4688fdedf0116a256aada9febe6acebfa41350e4e4",
    "pathsSha256": "7a02fb3b0dd3c2b5f38dfc9c4aa751b6b94ff94d8940daacaeec3ad783744d46",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82B8.svg",
    "dictionarySha256": "5f63ae7893fcde8386656daf1b3ce0c3c83704a235c2cc24d99fa4d0ba1347f5",
    "sourceStrokeIndices": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      7
    ]
  },
  {
    "glyph": "蔚",
    "strokes": 15,
    "originalStrokes": 14,
    "corpus": "MM",
    "originalMediansSha256": "42e72f599861306247fd0f97af3cb3757f9055bc50e6fdba1f8b97c33b0b8582",
    "pathsSha256": "b8b9102358d14545d035a9792eb423e6bbd6437cc3b0043ebf088504983b1ac8",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/851A.svg",
    "dictionarySha256": "ceade4b63e4b6181b4757620f1f3b8715cf3c4e23234a957a2633831cd55d766",
    "sourceStrokeIndices": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      10,
      null,
      null,
      null,
      14
    ]
  }
]
export const G2_GEOMETRY_BATCH9_DICTIONARY_REVIEW_SHA256 = '6c9105ff1732d3c96fc614d26eae06f3e5960b28619cafbe99171907b4d85c1c'
export const G2_GEOMETRY_BATCH9_DICTIONARY_DIRECTION_SHA256 = '5ddddc6926d291b0b81222c9b2d1003d98293f9647539a3a86454f0fb5391d90'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH9_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch9DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch9DictionaryMetadata(ref: G2GeometryBatch9DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH9_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch9-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH9_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH9_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH9_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch9DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH9_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH9_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch9DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch9 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH9_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH9_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH9_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch9 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch9 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH9_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch9DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch9 dictionary entry mismatch')
    return { ...g2GeometryBatch9DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH9_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH9_STROKES = loadG2GeometryBatch9DictionaryBundle(reviewed)
