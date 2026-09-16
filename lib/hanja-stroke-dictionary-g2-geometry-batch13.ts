/** 薰 姬: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch13.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH13_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 13: 薰 姬 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH13_DICTIONARY_GEOMETRY = {
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
export type G2GeometryBatch13DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH13_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH13_DICTIONARY_REFERENCES: readonly G2GeometryBatch13DictionaryReference[] = [
  {
    "glyph": "薰",
    "strokes": 18,
    "originalStrokes": 17,
    "corpus": "MM",
    "originalMediansSha256": "64006a08c7eb7a94fec81299d6724995efac6036d17b831a2f14377b976a3041",
    "pathsSha256": "27e53166539c278ac37b7b27b6b8dd7045d19ae3e4671b9689a7584adb1f17b1",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85B0.svg",
    "dictionarySha256": "a5145f4d16ca5693b228c4b797b75b7b76702eda63495d47782bd6e3903d5be3",
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
    "glyph": "姬",
    "strokes": 9,
    "originalStrokes": 10,
    "corpus": "MM",
    "originalMediansSha256": "20f8487f2e65aa4d5d26f715d0561499754ca7eaa6636a83f5a6b2d04f9a4f7c",
    "pathsSha256": "413ae025ae559fc0c6fb2d5e72bb67e54eb78cf91aa030de42bc963442c906b0",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/59EC.svg",
    "dictionarySha256": "904e07eb422bb2e9398603d9b8eaae50f07e90f6a8a9a3ae6e05ef2320ceeed1",
    "sourceStrokeIndices": [
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
  }
]
export const G2_GEOMETRY_BATCH13_DICTIONARY_REVIEW_SHA256 = 'e75a038df0228ec4fe95c2466ff1acb1a62f6002eec2c9f6a168bc3233f2436d'
export const G2_GEOMETRY_BATCH13_DICTIONARY_DIRECTION_SHA256 = 'cffdef0c796edfb4f931cb784f95180664cf3d8b5b0826570575f3e2a03c7bea'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH13_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch13DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch13DictionaryMetadata(ref: G2GeometryBatch13DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH13_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch13-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH13_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH13_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH13_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch13DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH13_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH13_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch13DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch13 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH13_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH13_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH13_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch13 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch13 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH13_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch13DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch13 dictionary entry mismatch')
    return { ...g2GeometryBatch13DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH13_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES = loadG2GeometryBatch13DictionaryBundle(reviewed)
