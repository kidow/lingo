/** Six special grade II forms (batch 19) individually reviewed, with no corrections. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special2-batch19.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL2_BATCH19_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade II batch 17: 11 characters individually checked, 6 approved and 0 held; 2 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL2_BATCH19_DICTIONARY_GEOMETRY = {
  "MM": {
    "url": "https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt",
    "sha256": "a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 30778076
  },
  "Ja": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsJa.txt",
    "sha256": "2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 21862957
  },
  "Hant": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsZhHant.txt",
    "sha256": "731fe26345833745dc7d37c8213f3ca91585aa0ee18179c0ccda91be41ff6aec",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 2988095
  },
  "Hans": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsZhHans.txt",
    "sha256": "5a5c157fddd0fd9bfaf5580b25c20a1ba2b0cabc0b7142e09f6149cbd5547798",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 22561924
  }
} as const
export type Special2Batch19DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH19_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL2_BATCH19_DICTIONARY_REFERENCES: readonly Special2Batch19DictionaryReference[] = [
  {"glyph":"犢","strokes":19,"corpus":"Ja","originalMediansSha256":"6ca8b44dd06e211f61b3babd042b93b4c8d81dcd73f0d7f97683cf8e2db96acf","pathsSha256":"a603311a39d9b0c7e9a126e767f67b28b9fbb1868a8c6577a454a5ba5de1da2f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/72A2.svg","dictionarySha256":"4b197ac28bf5d35aba92ed591ff7490645beff418a2a46a7e3e4d9975344060e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"牘","strokes":19,"corpus":"Ja","originalMediansSha256":"4d87ec1f7379229be2536e20558b28e5678a71f68c66c9b329470973c0b6e446","pathsSha256":"c4e0d1cd2c9238f1ce1f6a7c8075ee4b3e0e312ad934d437c4711f78de82518c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/7258.svg","dictionarySha256":"8d4c064b79c27918a86836523ef5514f99bffe098f4d5be4cfbe4b31171a4583","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"竇","strokes":20,"corpus":"Ja","originalMediansSha256":"a581d222b45cd49e846485dfda86a283e8589c6a3e83dfca5c85542df05c633f","pathsSha256":"4e10ca94f54a9afc0f8c43eaebdec70fdcd202094cb48dc46f3182cf5d9a6081","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7AC7.svg","dictionarySha256":"a43e3f502effe525baaee6a1cea7cc7884b839d3251dbbb50fc5d9e30626ea31","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"瑜","strokes":13,"corpus":"Ja","originalMediansSha256":"d337c77b1446706e87ed8fbb34cb060a8600420e75c041c0daab13201afc7aab","pathsSha256":"0b7f608438b6f693128187db06723f5f6742b5bb55365154918b88b98e36a2bb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/745C.svg","dictionarySha256":"a66dca27be1b85d06e1539e92f138e0fbb01f309a0b00f1d61d77c6da6786866","sourceStrokeIndices":[1,3,2,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"砥","strokes":10,"corpus":"Ja","originalMediansSha256":"d1062484bfbf74375cd688c3f94c2dbbced4577b3f43f0c88503ce52a54cd691","pathsSha256":"80a095d09156b29405b7897ad6c231c14f55e5070a006a8ba7d13b036bbed68d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/7825.svg","dictionarySha256":"1f8971c3a93f26ca53aead75ab08e12e79ab01786c500cf24aaa00b8378310e9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"鯖","strokes":19,"corpus":"Ja","originalMediansSha256":"627bb3ca1b8fd61078c8324a735d38aa0458f963c01dc4940748252663c35b19","pathsSha256":"8b7082b5364bfb24b051544dc1469462afa4e68c551241d77bfb7fbbeb88b508","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9BD6.svg","dictionarySha256":"af6e17302f31097161097c8134b7908287f05b82857a451bd3483f6b9f790aa1","sourceStrokeIndices":[1,2,3,4,6,5,7,8,9,10,11,12,14,13,15,16,17,18,19]},
]
export const SPECIAL2_BATCH19_DICTIONARY_REVIEW_SHA256 = '23df9aa1138f03fbfb717b2dc715cafb4200036e80a9c9a43be9fe106370e1c3'
export const SPECIAL2_BATCH19_DICTIONARY_DIRECTION_SHA256 = '48c632474c8ec9bbe8cd94d11c73dcc951d28942da570204092254501254d3f8'
const referencesByGlyph = new Map(SPECIAL2_BATCH19_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const special2Batch19DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function special2Batch19DictionaryMetadata(ref: Special2Batch19DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL2_BATCH19_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special2-batch19-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL2_BATCH19_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL2_BATCH19_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL2_BATCH19_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type Special2Batch19DictionaryBundle = {
  verificationSource: typeof SPECIAL2_BATCH19_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL2_BATCH19_DICTIONARY_GEOMETRY
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
export function loadSpecial2Batch19DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special2 batch19 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL2_BATCH19_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL2_BATCH19_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL2_BATCH19_DICTIONARY_REFERENCES.length) throw Error('Special2 batch19 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special2 batch19 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL2_BATCH19_DICTIONARY_REFERENCES[i]
    if (!same(metadata, special2Batch19DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special2 batch19 dictionary entry mismatch')
    return { ...special2Batch19DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL2_BATCH19_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES = loadSpecial2Batch19DictionaryBundle(reviewed)
