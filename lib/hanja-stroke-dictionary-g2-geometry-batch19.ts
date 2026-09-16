/** 昺 昞 揷: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch19.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH19_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 19: 昺 昞 揷 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH19_DICTIONARY_GEOMETRY = {
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
    "url": "docs/hanja-g2-geometry-batch19-2026-09-16/originals.json#entries",
    "sha256": "7705739bc1b86754cb2c3d9f8626276906bd8b99af1175fa0cef89667232cf58",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 3753
  }
} as const
export type G2GeometryBatch19DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH19_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH19_DICTIONARY_REFERENCES: readonly G2GeometryBatch19DictionaryReference[] = [
  {
    "glyph": "昺",
    "strokes": 9,
    "originalStrokes": 9,
    "corpus": "Components",
    "originalMediansSha256": "11aec3fb48d09c0e5b1e78a8888e90528ad3be5dbb687627fada67477ded43ae",
    "pathsSha256": "f2f94dbbf0197106756a426f31582594a4212dfd9bcd49b55e1edacff3e033ac",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/663A.svg",
    "dictionarySha256": "bf75564305abec3fe750e6bc9243d2cc78410c3714c3a28593bbd34691aeeb93",
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
  },
  {
    "glyph": "昞",
    "strokes": 9,
    "originalStrokes": 9,
    "corpus": "Components",
    "originalMediansSha256": "56de610e461ea87596701a95dc3f5f1f009f42a405c35ea22c638f12d4a40215",
    "pathsSha256": "d2471fc7e934624fdc8ef57cdd480b5da350c3d5c1e1c85fb8909318557c1319",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/661E.svg",
    "dictionarySha256": "85145396b4f3aa0b3dc253303d5229cb79c632dc3f5026a2f73233a30547971c",
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
  },
  {
    "glyph": "揷",
    "strokes": 12,
    "originalStrokes": 12,
    "corpus": "Components",
    "originalMediansSha256": "5e84b308b13e44bd736d7d25d3f27b08e94e4468aa031a559e4f9ad222fec0c5",
    "pathsSha256": "a70a5e5ade79846eec52f52e7136d65ebe75d7737bf45f96b5cec278678574e7",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/63F7.svg",
    "dictionarySha256": "95e2bb3e95a0b47e4e907953ebbf11ed5e88edefd87d883e83b2f76e1b8c53fe",
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
  }
]
export const G2_GEOMETRY_BATCH19_DICTIONARY_REVIEW_SHA256 = '915cac1effa8d2626ce6974ff2701cc3dbbcd4a89270674d194ed5a64a39af7f'
export const G2_GEOMETRY_BATCH19_DICTIONARY_DIRECTION_SHA256 = '020cd815dc6e463176cd645105f912a12527529a43ecc460acc67d73c19c89af'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH19_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch19DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch19DictionaryMetadata(ref: G2GeometryBatch19DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH19_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch19-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH19_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH19_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH19_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch19DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH19_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH19_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch19DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch19 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH19_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH19_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH19_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch19 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch19 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH19_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch19DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch19 dictionary entry mismatch')
    return { ...g2GeometryBatch19DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH19_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH19_STROKES = loadG2GeometryBatch19DictionaryBundle(reviewed)
