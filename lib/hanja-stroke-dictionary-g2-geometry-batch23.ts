/** 晙 埈 瓚: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch23.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH23_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 23: 晙 埈 瓚 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH23_DICTIONARY_GEOMETRY = {
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
  },
  "ZhHans": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsZhHans.txt",
    "sha256": "5a5c157fddd0fd9bfaf5580b25c20a1ba2b0cabc0b7142e09f6149cbd5547798",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 22561924
  },
  "ZhHant": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsZhHant.txt",
    "sha256": "731fe26345833745dc7d37c8213f3ca91585aa0ee18179c0ccda91be41ff6aec",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 2988095
  },
  "Components": {
    "url": "docs/hanja-g2-geometry-batch23-2026-09-17/originals.json#entries",
    "sha256": "b065f723984419f5cc64d4c0f10cc44fb4206001cf953e92c577d8ff4e694bd4",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 5972
  }
} as const
export type G2GeometryBatch23DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH23_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH23_DICTIONARY_REFERENCES: readonly G2GeometryBatch23DictionaryReference[] = [
  {
    "glyph": "晙",
    "strokes": 11,
    "originalStrokes": 11,
    "corpus": "Components",
    "originalMediansSha256": "1f214dc6899df5dd72fd52c6f77bce8775c02e3be430f70db6b7ca2da35a0852",
    "pathsSha256": "11426922d14bc826576f117ea60c9778ee3d4cec3f1b411491f044ae027ec96f",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6659.svg",
    "dictionarySha256": "b99f1b60afd47565e7b8672de8683d252ed7cc6d83c75161c7bed3fa3df00b6d",
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
    "glyph": "埈",
    "strokes": 10,
    "originalStrokes": 10,
    "corpus": "Components",
    "originalMediansSha256": "4e61d0f80a287a41f69ed4258883e6622107dec01db274c305a603554dfadb8b",
    "pathsSha256": "0e83ccee74977868dd1abccc6fa2f1c14d3ab880eddf94d47bcd81c9d5b16d45",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/57C8.svg",
    "dictionarySha256": "ed59deeda33cb44fec135a11264f1cb149df8661a3cca8f13f2eb6eaf9e1d7d0",
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
    "glyph": "瓚",
    "strokes": 23,
    "originalStrokes": 23,
    "corpus": "Components",
    "originalMediansSha256": "4f7e8b2ffe1c0df2f5b9ac5056df0f2b28b2d963ef4abc30c245e7b50a29b3ec",
    "pathsSha256": "211ff4d40acdb37da499fcc949ae96c1921c285ccf9cd4d3f7c94e970860106f",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/74DA.svg",
    "dictionarySha256": "26e2f8eda9c8813413b8cf7d3159f9014a9409fe6574f19a3d08bb3dbd372912",
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
      null,
      null,
      null,
      null,
      null,
      null
    ]
  }
]
export const G2_GEOMETRY_BATCH23_DICTIONARY_REVIEW_SHA256 = '400bec4e1ee0bb38971c9ea0a8053efbde8e56fafaf39374bfe84787667d8021'
export const G2_GEOMETRY_BATCH23_DICTIONARY_DIRECTION_SHA256 = 'a2b2f61cd77454cc6c340b016bcc06d706b4956e3cd17e9f4e4c20d25948e322'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH23_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch23DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch23DictionaryMetadata(ref: G2GeometryBatch23DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-17',
    geometrySource: G2_GEOMETRY_BATCH23_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch23-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH23_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH23_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH23_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch23DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH23_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH23_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch23DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch23 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH23_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH23_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH23_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch23 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch23 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH23_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch23DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch23 dictionary entry mismatch')
    return { ...g2GeometryBatch23DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH23_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH23_STROKES = loadG2GeometryBatch23DictionaryBundle(reviewed)
