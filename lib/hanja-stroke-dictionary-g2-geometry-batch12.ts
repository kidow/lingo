/** 陜 邢 祜: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch12.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH12_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 12: 陜 邢 祜 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH12_DICTIONARY_GEOMETRY = {
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
export type G2GeometryBatch12DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH12_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH12_DICTIONARY_REFERENCES: readonly G2GeometryBatch12DictionaryReference[] = [
  {
    "glyph": "陜",
    "strokes": 10,
    "originalStrokes": 9,
    "corpus": "MM",
    "originalMediansSha256": "9d78a289f8f71a5358f6de188887295c7879bcc52223a2b170239368d96de7c5",
    "pathsSha256": "425901964d7761dcf00b283edb1d6b5b69a7f09f0c6f5208da4a948fd8d7f8e9",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/965C.svg",
    "dictionarySha256": "bf0d113858fa5748d92cf5dd3504746d169c1bf1928b6ab244bf1277806b9dcc",
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
      null
    ]
  },
  {
    "glyph": "邢",
    "strokes": 7,
    "originalStrokes": 6,
    "corpus": "MM",
    "originalMediansSha256": "86624fa0e2332530de31f331d7e37f560f8e391778458ea2d21b7c20bd98e4da",
    "pathsSha256": "494cdc5bc8eb6263e4aa8d000bccc8baf3d2e67706928e5e509489a7a1f29a97",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/90A2.svg",
    "dictionarySha256": "26c6f3fb31bace386d2bfe6678690ab1d24beaf00731bc2e1d6bc73ffd2f0cda",
    "sourceStrokeIndices": [
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
    "glyph": "祜",
    "strokes": 10,
    "originalStrokes": 9,
    "corpus": "MM",
    "originalMediansSha256": "6244a2993c168f2229d9e11bd291959d8746dd5e95a3b597b1b4321864b8f416",
    "pathsSha256": "b8cf1178fb38d7c95c011a95278c83ad0e55ca775f67b062a13ccda462cf28a9",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/795C.svg",
    "dictionarySha256": "bb3fbd3d2ba52bba9e7b074b25a76499ebc04e5d38f0925a3891fb6fe6f2a4a9",
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
      null
    ]
  }
]
export const G2_GEOMETRY_BATCH12_DICTIONARY_REVIEW_SHA256 = 'e40a456890fcc92403f28c9109897d0da89fa5ae42423b68f5e77d797840fa06'
export const G2_GEOMETRY_BATCH12_DICTIONARY_DIRECTION_SHA256 = '2271415b38e012a5f6fe782525a6a8642a8e8c9930a8302bcebded34fa6cd39f'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH12_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch12DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch12DictionaryMetadata(ref: G2GeometryBatch12DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH12_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch12-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH12_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH12_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH12_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch12DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH12_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH12_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch12DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch12 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH12_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH12_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH12_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch12 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch12 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH12_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch12DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch12 dictionary entry mismatch')
    return { ...g2GeometryBatch12DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH12_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH12_STROKES = loadG2GeometryBatch12DictionaryBundle(reviewed)
