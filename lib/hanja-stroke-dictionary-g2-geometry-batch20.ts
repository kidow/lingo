/** 晳 璿 卨: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch20.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH20_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 20: 晳 璿 卨 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH20_DICTIONARY_GEOMETRY = {
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
    "url": "docs/hanja-g2-geometry-batch20-2026-09-17/originals.json#entries",
    "sha256": "f3ff832aa772f54ecd03c5ba4818ca10e3f604d6c3760a1e497e8badb3c3c3cb",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 3914
  }
} as const
export type G2GeometryBatch20DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH20_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH20_DICTIONARY_REFERENCES: readonly G2GeometryBatch20DictionaryReference[] = [
  {
    "glyph": "晳",
    "strokes": 12,
    "originalStrokes": 12,
    "corpus": "Components",
    "originalMediansSha256": "6fdeb5add516110ce557966e19f5e11f103d0ce16cb6874e0adaa8f1e31b6ca8",
    "pathsSha256": "250295f1ab894365650ad0b0304286de91be64571d4726bc24f17afdabab5d18",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6673.svg",
    "dictionarySha256": "d6ee2d6ef09f53a7fe80a444f52c2ab7bba4fc4d36f698df2c4e960927c69f24",
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
      null
    ]
  },
  {
    "glyph": "璿",
    "strokes": 18,
    "originalStrokes": 18,
    "corpus": "Components",
    "originalMediansSha256": "5a42d91d31bc37d41771062093bcf1dcef20a443631f3d1900985b3685b963a7",
    "pathsSha256": "5d4302239dd8929612ae2c2c3c1333e46921a42644452d7604eac897ab6d33c1",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/74BF.svg",
    "dictionarySha256": "a634f351f8c8ff21ddacd73e7eb483c3c0cab0b391acc92b3c9aed69aa1b2383",
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
    "glyph": "卨",
    "strokes": 11,
    "originalStrokes": 11,
    "corpus": "Components",
    "originalMediansSha256": "4c85b62c4697069368fd9d12e5c2adf656fa4e47fd9574c095b738f0ce6eed01",
    "pathsSha256": "c5fb51614e6e4ca4772d579c2a1538284b8e1b96481b2c7b3db731c94fb0281d",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/5368.svg",
    "dictionarySha256": "b432196c444719540ee303e39a0d14ccecd78f8b282ce2d87be0394334a0a243",
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
  }
]
export const G2_GEOMETRY_BATCH20_DICTIONARY_REVIEW_SHA256 = '6ca6fa84d4bb5e2c6f3a88b1690d582d8b80337dc4b07dc7ee29c6f9d09e1915'
export const G2_GEOMETRY_BATCH20_DICTIONARY_DIRECTION_SHA256 = 'c1cacb545345e46f871462e40f51ba415087d2dc3cc71f915f99512207dd590b'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH20_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch20DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch20DictionaryMetadata(ref: G2GeometryBatch20DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-17',
    geometrySource: G2_GEOMETRY_BATCH20_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch20-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH20_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH20_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH20_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch20DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH20_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH20_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch20DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch20 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH20_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH20_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH20_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch20 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch20 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH20_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch20DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch20 dictionary entry mismatch')
    return { ...g2GeometryBatch20DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH20_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH20_STROKES = loadG2GeometryBatch20DictionaryBundle(reviewed)
