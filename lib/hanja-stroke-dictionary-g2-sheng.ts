/** 晟: dictionary order plus official count and boundary correction; not a direct eleven-stage dictionary match. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-sheng.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_SHENG_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 晟: 10-stage dictionary crosscheck plus official 晟 eleven-stroke ruling and 成 boundary diagram; 11 resulting paths rechecked. Not exam-body certification."
} as const
export const G2_SHENG_DICTIONARY_GEOMETRY = {
  "MM": {
    "url": "https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt",
    "sha256": "a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 30778076
  }
} as const
export type G2ShengDictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G2_SHENG_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_SHENG_DICTIONARY_REFERENCES: readonly G2ShengDictionaryReference[] = [
  {
    "glyph": "晟",
    "strokes": 11,
    "corpus": "MM",
    "originalMediansSha256": "33f6b4c5f3813e3584791c64cd9bcf4b8683114cf18c386abc0cc1083cd58a66",
    "pathsSha256": "d9a1d245b89e31d49c8cd94d31773b55cad36dd534e29a7f8dd9d0a13f67bb8f",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/665F.svg",
    "dictionarySha256": "ee91e5e6df4b8f6b8fc68a7c1c2f8794f53ab89a33a2c5436a41f1ae61df1a34",
    "sourceStrokeIndices": [
      1,
      2,
      null,
      4,
      6,
      5,
      null,
      null,
      8,
      9,
      10
    ]
  }
]
export const G2_SHENG_DICTIONARY_REVIEW_SHA256 = '7909aeff700d14b30ed4bde8758faa874cbd97c6ffc05915fd6ecc03e9198eef'
export const G2_SHENG_DICTIONARY_DIRECTION_SHA256 = 'a2870dd0f073fd999842b68893ebbbbdbf75a26c282db3b9da0db3924d6df217'
const referencesByGlyph = new Map(G2_SHENG_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2ShengDictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2ShengDictionaryMetadata(ref: G2ShengDictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_SHENG_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-sheng-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: "https://www.hanja.re.kr/klea/counsel/hanjaDetail.do?id=10026", dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: '1,2,3,4,5,6,7,8,9,10',
      orderReviewSha256: G2_SHENG_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_SHENG_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_SHENG_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2ShengDictionaryBundle = {
  verificationSource: typeof G2_SHENG_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_SHENG_DICTIONARY_GEOMETRY
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
export function loadG2ShengDictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 sheng dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_SHENG_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_SHENG_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_SHENG_DICTIONARY_REFERENCES.length) throw Error('G2 sheng dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 sheng dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_SHENG_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2ShengDictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 sheng dictionary entry mismatch')
    return { ...g2ShengDictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_SHENG_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_SHENG_STROKES = loadG2ShengDictionaryBundle(reviewed)
