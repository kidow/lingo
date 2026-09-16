/** 蔘 薛 陝: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch6.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH6_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 6: 蔘 薛 陝 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH6_DICTIONARY_GEOMETRY = {
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
export type G2GeometryBatch6DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH6_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH6_DICTIONARY_REFERENCES: readonly G2GeometryBatch6DictionaryReference[] = [
  {
    "glyph": "蔘",
    "strokes": 15,
    "originalStrokes": 14,
    "corpus": "Ja",
    "originalMediansSha256": "3ae21dfd23a630248f1c33c2f7d8e8a11c62bc195e4b829fc6d851092629a36e",
    "pathsSha256": "411188874bf4e6f7b02471c87e106c4d8341fc8d416ba200f86c2d1ea8ad1cba",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/8518.svg",
    "dictionarySha256": "cd0639d6785929dfe2e8ef87dcd8008a70887cbf99622092e466edad97304595",
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
      null
    ]
  },
  {
    "glyph": "薛",
    "strokes": 17,
    "originalStrokes": 16,
    "corpus": "MM",
    "originalMediansSha256": "cc7ef465bd1098ef7793a8af10819058b6c91ca509e12202c61591e31eb8eea3",
    "pathsSha256": "43428a03af48f38792cb580425444d88a0dedd3a4854ffb6ba9a8f9fe4361189",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/859B.svg",
    "dictionarySha256": "5b9595d386d0c95f4fc6b31d1e7fcbbb5902cf493a5313f0ba00466ce949b4ab",
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
      null
    ]
  },
  {
    "glyph": "陝",
    "strokes": 10,
    "originalStrokes": 9,
    "corpus": "MM",
    "originalMediansSha256": "18c19d45ab81ca15a468504582343e2dfba1b106bb9bfba26c1526681bf23b46",
    "pathsSha256": "c3e43b0cb0ade3e7878d26d65c5b1633b9498e56c3ee298b7f67e95035c225f1",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/965D.svg",
    "dictionarySha256": "ec4392a162d73c049d75f757b5542d58c8c2f951173239971696b6a92ff581cc",
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
export const G2_GEOMETRY_BATCH6_DICTIONARY_REVIEW_SHA256 = '2e62627ddf9dd8012114bf369a1c002c4caf60e80ae875b61abdc4460561cf08'
export const G2_GEOMETRY_BATCH6_DICTIONARY_DIRECTION_SHA256 = '6f86c6855e65b81c0d476f615a44e3e2729c8a510b5e79139a9985c17ce8d572'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH6_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch6DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch6DictionaryMetadata(ref: G2GeometryBatch6DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH6_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch6-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH6_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH6_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH6_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch6DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH6_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH6_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch6DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch6 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH6_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH6_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH6_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch6 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch6 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH6_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch6DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch6 dictionary entry mismatch')
    return { ...g2GeometryBatch6DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH6_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH6_STROKES = loadG2GeometryBatch6DictionaryBundle(reviewed)
