/** 騏 乭 旼: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch17.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH17_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 17: 騏 乭 旼 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH17_DICTIONARY_GEOMETRY = {
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
    "url": "docs/hanja-g2-geometry-batch17-2026-09-16/originals.json#entries",
    "sha256": "2ca8373b5c6d1b6e3371143abccf9b5f29ab6be2aa231819a031e3c79d83ce83",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 3536
  }
} as const
export type G2GeometryBatch17DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH17_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH17_DICTIONARY_REFERENCES: readonly G2GeometryBatch17DictionaryReference[] = [
  {
    "glyph": "騏",
    "strokes": 18,
    "originalStrokes": 18,
    "corpus": "Components",
    "originalMediansSha256": "aa59434cad34498a11ce5120a1da6b225c45d063d85f85a752c5d02243db720e",
    "pathsSha256": "5e91f6900134f08d15c47be4c482a804f56d899a8facaea24c3dcfa846327215",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9A00/9A0F.svg",
    "dictionarySha256": "977ca564943a284585f15bf0fd17ece774e81eb0c594e4c2429a22ee41546bc7",
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
    "glyph": "乭",
    "strokes": 6,
    "originalStrokes": 6,
    "corpus": "Components",
    "originalMediansSha256": "a5cdafaf98e6f252b5bde45a3962281f8ac8c734bbd976c1431ecd7356141cd1",
    "pathsSha256": "724e4727ef3c1da49ee5209703c0ef5972b0a52c76937efc074078bc7f9a8239",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4E6D.svg",
    "dictionarySha256": "8885598ddc2893078127c64d7a45eb7059b3a72f3ef04e087e638919efaceda6",
    "sourceStrokeIndices": [
      null,
      null,
      null,
      null,
      null,
      null
    ]
  },
  {
    "glyph": "旼",
    "strokes": 8,
    "originalStrokes": 8,
    "corpus": "Components",
    "originalMediansSha256": "3d7be6b682077aafa92cf815d545c8550b79e6724212d94a73905493b2b6bce1",
    "pathsSha256": "c2eb3a06acad5723dc726d245a20f929fadc336d36dc949a83a6d07ae0c36989",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65FC.svg",
    "dictionarySha256": "9a4676e42f7ae6b7bbe08a5787ad2523bebc86b44abec304b7b0e9583ef23f59",
    "sourceStrokeIndices": [
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
export const G2_GEOMETRY_BATCH17_DICTIONARY_REVIEW_SHA256 = '07898a14bc7f82658ee14abe60bd1cda82bf48f0ceb7c15aa8d7572c5c3311c3'
export const G2_GEOMETRY_BATCH17_DICTIONARY_DIRECTION_SHA256 = '96f66a108cee7752025e5c98789d67f1c943722937b47b782f96c5e2b02140a6'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH17_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch17DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch17DictionaryMetadata(ref: G2GeometryBatch17DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH17_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch17-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH17_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH17_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH17_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch17DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH17_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH17_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch17DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch17 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH17_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH17_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH17_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch17 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch17 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH17_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch17DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch17 dictionary entry mismatch')
    return { ...g2GeometryBatch17DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH17_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH17_STROKES = loadG2GeometryBatch17DictionaryBundle(reviewed)
