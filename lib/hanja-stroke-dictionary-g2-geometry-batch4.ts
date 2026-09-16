/** 蔑 茅 范: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch4.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH4_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 4: 蔑 茅 范 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH4_DICTIONARY_GEOMETRY = {
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
export type G2GeometryBatch4DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH4_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH4_DICTIONARY_REFERENCES: readonly G2GeometryBatch4DictionaryReference[] = [
  {
    "glyph": "蔑",
    "strokes": 15,
    "originalStrokes": 14,
    "corpus": "MM",
    "originalMediansSha256": "e451532b91dd01f6da90ed18c3f61460b32e64056ba421bd66586e3a4fc75881",
    "pathsSha256": "2e42ee946307eebeb42c3d742e551c4e5590de2a0c51988c570733da92fa386e",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/8511.svg",
    "dictionarySha256": "9371c737e5625b5f5eafdf551965acacd699ce592dc143300e40eb3de449588f",
    "sourceStrokeIndices": [
      null,
      null,
      null,
      null,
      4,
      null,
      null,
      null,
      null,
      null,
      null,
      11,
      null,
      null,
      null
    ]
  },
  {
    "glyph": "茅",
    "strokes": 9,
    "originalStrokes": 8,
    "corpus": "MM",
    "originalMediansSha256": "e838a68923c802d0ad5fa279216130c2c9cec7017d51f32923ef1258cf107f68",
    "pathsSha256": "ee75610294c2d62d3462c11200afe2555a4a383bd21680c6941aa7b6064e460f",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8305.svg",
    "dictionarySha256": "5edfc4172641221f5df4cf0f094a7b5f60464dabffd99514f631e4545a162720",
    "sourceStrokeIndices": [
      null,
      2,
      null,
      null,
      null,
      null,
      6,
      null,
      null
    ]
  },
  {
    "glyph": "范",
    "strokes": 9,
    "originalStrokes": 8,
    "corpus": "MM",
    "originalMediansSha256": "58321db21e01cd99323bc526ce51f0cb7cc95ca2a98105d6fe1788c877911914",
    "pathsSha256": "78123d9f7e14d82fa9e318b146c60f421c6ce7c2bdba034afe77c584f1db9575",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8303.svg",
    "dictionarySha256": "caf51eba5fd16a3a5488470668c220332b41095a8e7fdbd7d1af2e4310e4215f",
    "sourceStrokeIndices": [
      null,
      2,
      null,
      3,
      null,
      5,
      null,
      null,
      null
    ]
  }
]
export const G2_GEOMETRY_BATCH4_DICTIONARY_REVIEW_SHA256 = 'd50bdf7563d3a636bd3209ee8a664e8f03bea8e852c479e5a64eb0e78ded6a77'
export const G2_GEOMETRY_BATCH4_DICTIONARY_DIRECTION_SHA256 = '7a37cdf86e7cb4cd50c63edaa382df2f9017c6760c54c8cfc6b61d17f373ec41'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH4_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch4DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch4DictionaryMetadata(ref: G2GeometryBatch4DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH4_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch4-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH4_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH4_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH4_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch4DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH4_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH4_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch4DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch4 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH4_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH4_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH4_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch4 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch4 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH4_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch4DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch4 dictionary entry mismatch')
    return { ...g2GeometryBatch4DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH4_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES = loadG2GeometryBatch4DictionaryBundle(reviewed)
