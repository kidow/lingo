/** 瓊: explicit Korean variant guidance, Taiwan MOE whole sequence and common Korean dictionary stages. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-qiong.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_QIONG_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Explicit Korean official 瓊 form/count explanations plus Taiwan MOE whole nineteen-stroke sequence/directions and e-hanja common first fifteen strokes; not Korean exam-body certification of the whole animation."
} as const
export const G2_QIONG_DICTIONARY_GEOMETRY = {
  "MM": {
    "url": "https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt",
    "sha256": "a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 30778076
  }
} as const
export type G2QiongDictionaryReference = {
  glyph: string; strokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_QIONG_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_QIONG_DICTIONARY_REFERENCES: readonly G2QiongDictionaryReference[] = [
  {
    "glyph": "瓊",
    "strokes": 19,
    "dictionaryStrokes": 18,
    "corpus": "MM",
    "originalMediansSha256": "6c7dbdff62f493657442081eba6e38e69b6a29e17b946ac53e0add0ce70d9be2",
    "pathsSha256": "48338314678c24b9a583ea4a5facf3229a44cff7cda87090fcc4aafbe76071c3",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/74CA.svg",
    "dictionarySha256": "c2205f3fe1cb92e350638e12752dadf0c028e91ed2a5999454779caaa911b202",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      null,
      null,
      15,
      16,
      17,
      18,
      19
    ]
  }
]
export const G2_QIONG_DICTIONARY_REVIEW_SHA256 = '9dc970465c4d624287307dbdda1d6cb07474e62aee83b4e2512e05a0fd7d7ab2'
export const G2_QIONG_DICTIONARY_DIRECTION_SHA256 = 'd1672882f6b0e76178d5414a3d863cdbb72194bfd84a5a811af60d183a87e713'
const referencesByGlyph = new Map(G2_QIONG_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2QiongDictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2QiongDictionaryMetadata(ref: G2QiongDictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_QIONG_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-qiong-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: "https://stroke-order.learningweb.moe.edu.tw/dictView.jsp?ID=29898&la=0", dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: 15 }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_QIONG_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_QIONG_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_QIONG_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2QiongDictionaryBundle = {
  verificationSource: typeof G2_QIONG_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_QIONG_DICTIONARY_GEOMETRY
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
export function loadG2QiongDictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 qiong dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_QIONG_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_QIONG_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_QIONG_DICTIONARY_REFERENCES.length) throw Error('G2 qiong dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 qiong dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_QIONG_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2QiongDictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 qiong dictionary entry mismatch')
    return { ...g2QiongDictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_QIONG_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_QIONG_STROKES = loadG2QiongDictionaryBundle(reviewed)
