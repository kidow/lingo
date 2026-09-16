/** 姸 燁 鏞: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch21.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH21_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 21: 姸 燁 鏞 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH21_DICTIONARY_GEOMETRY = {
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
    "url": "docs/hanja-g2-geometry-batch21-2026-09-17/originals.json#entries",
    "sha256": "0287ab23473b0df3310d7dfecb96b6680e996a19aec8dcfd62f0d4de477819ba",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 4177
  }
} as const
export type G2GeometryBatch21DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH21_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH21_DICTIONARY_REFERENCES: readonly G2GeometryBatch21DictionaryReference[] = [
  {
    "glyph": "姸",
    "strokes": 9,
    "originalStrokes": 9,
    "corpus": "Components",
    "originalMediansSha256": "db32dd24cc2e622b6b7ab7f3c1310f7959df975bc5dc5014d1407ec3dca9833a",
    "pathsSha256": "1467739e62a114b21c4e817137d95af7c4f46a4ebad335ded7c3c3f05ece1b9e",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/59F8.svg",
    "dictionarySha256": "00d0a486f69800aa7cb54c1b5a1987a4ec81a2a2a4811585cace4f9eed7f87fc",
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
    "glyph": "燁",
    "strokes": 15,
    "originalStrokes": 15,
    "corpus": "Components",
    "originalMediansSha256": "b46d13a16e0a7ee97c05a7c05c5d0219f0e0de006775acef7e6cd77912dd7c18",
    "pathsSha256": "51a438550cc4a0b0c0afce798ef37b8c3a71ff596218ceeb09faeb8f3730063c",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/71C1.svg",
    "dictionarySha256": "c129e73f21e7e134549a52f3a301bcac34d6ec21883938a34699cce099ceb4bb",
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
    "glyph": "鏞",
    "strokes": 19,
    "originalStrokes": 19,
    "corpus": "Components",
    "originalMediansSha256": "69d339ab0914e5097047f8de1680f72ac93611e8f0a9abe171f3d480703436dd",
    "pathsSha256": "8230763caf9c6b99727658b2f0e493fdf277bac4f9f9e514c6ab144a72a684cf",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/93DE.svg",
    "dictionarySha256": "081b384ee677c269c6dc13daf5737c090f0052a697b1a7554f3460df65a999b2",
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
      null
    ]
  }
]
export const G2_GEOMETRY_BATCH21_DICTIONARY_REVIEW_SHA256 = '0b42efddb9fbe38a40b3c216b6a304ed42e08ad7d91c45119e7721472f136808'
export const G2_GEOMETRY_BATCH21_DICTIONARY_DIRECTION_SHA256 = '78ec3ba008ce630c92624710e003311d1ec9487f6f724ee9dea839a69b304544'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH21_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch21DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch21DictionaryMetadata(ref: G2GeometryBatch21DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-17',
    geometrySource: G2_GEOMETRY_BATCH21_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch21-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH21_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH21_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH21_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch21DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH21_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH21_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch21DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch21 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH21_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH21_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH21_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch21 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch21 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH21_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch21DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch21 dictionary entry mismatch')
    return { ...g2GeometryBatch21DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH21_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH21_STROKES = loadG2GeometryBatch21DictionaryBundle(reviewed)
