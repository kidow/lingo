/** Twelve special grade II forms (batch 18) individually reviewed, with no corrections. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special2-batch18.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL2_BATCH18_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade II batch 17: 11 characters individually checked, 12 approved and 0 held; 2 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL2_BATCH18_DICTIONARY_GEOMETRY = {
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
export type Special2Batch18DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH18_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL2_BATCH18_DICTIONARY_REFERENCES: readonly Special2Batch18DictionaryReference[] = [
  {"glyph":"棨","strokes":12,"corpus":"Hans","originalMediansSha256":"c2fca3fa25e56d6fdfa2d7b07a767499bb91f3a89f9f671f8b9ca406c601720d","pathsSha256":"0bb086db867ac854fa8cef6885f9228eebe17192aacd90bd22830f1f00161ce1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68E8.svg","dictionarySha256":"ca4fb7a247ebfe9a8e60105caf3b611a295b973beee4894a431bdd8591dde2ad","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"杻","strokes":8,"corpus":"Hans","originalMediansSha256":"ce60187766cb70c237b4fa5ce5d6f7b246de8375f329a5a0312d5c29255225a0","pathsSha256":"1da496bf75c7ab9a2b45fb0a70abeed6fc4abe975d3bd839cf396a96eb9274f2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/677B.svg","dictionarySha256":"c5c5fb04b6e18a9aaa5aa6565ded6f0f0f30cd3e0fe20d437acf880a0a0213dc","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"璘","strokes":16,"corpus":"Hans","originalMediansSha256":"b5bb7a3094d6df51eb4bf30babcd4f694ed4eb3c07922454b42cffc8606e09eb","pathsSha256":"92ed607523e3547c3c45907d1872407617c1a5f38206a45eb76db5479b8b6983","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7498.svg","dictionarySha256":"c225bf6d95b3e67d5045a6bdf9893ffdfdfaedc9b973ec59f3eea37064db04f5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"琫","strokes":12,"corpus":"Hans","originalMediansSha256":"b8d81201c2052518f49d3f14139cc0a9cd1e2c7bd37148c98a465445aab1d197","pathsSha256":"a89cfe484a8c44cc2cf57d77f3894812d413f56504e5a23dcd0d4f393e1ac746","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/742B.svg","dictionarySha256":"3327f4f0db787a06d8813d62317c9d60db58bd5ad66dd7d8c4a75df8f01fdb1c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"琇","strokes":11,"corpus":"Hans","originalMediansSha256":"4e36ccafa84ec4064ff9fb6ccd93a9ddfe0a83bf949a5de8dd1647c120d3c2fa","pathsSha256":"89ee709b5c3a158c93a7ecc0336abcfa47a68bd2068e7347806eb2e7c22a0707","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7407.svg","dictionarySha256":"8e82f8bdb2e31f33e57648b58f7c1b7ab4171db57ef952a3a9e796f4fcd2c52c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,11,10]},
  {"glyph":"栒","strokes":10,"corpus":"Hans","originalMediansSha256":"fb17920415153a2bf4fcd007e5c82b5bfe59fd98374e2924ac36a909b8116190","pathsSha256":"e161a8089033571c79c5e69b525f4980f76b377167c4e6db614b51d21ee8c4a7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/6812.svg","dictionarySha256":"8e0ea759a4e386666ef95868230b1f8a123c1891af784518040b83c6b086c3eb","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"汭","strokes":7,"corpus":"Hans","originalMediansSha256":"3dde2a6870443257375981419b7fca5255e8cbc6c954ead61deb82534a5875c4","pathsSha256":"57c9c522cec9e6b0b60ba8a57777e66aae2e742a44f01f0d2851ff51fd7a392e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C6D.svg","dictionarySha256":"6f0b84f2f17469a146af4b2c07302db1a0638ee70a30ef98fa07ba60413c9793","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"瑀","strokes":13,"corpus":"Hans","originalMediansSha256":"54464d18fbdb3287510ea0b0e8e33dfe9fd0d1f9688ba6b33a1d7e40f1ae9263","pathsSha256":"1e14fe91e4397f2beda364b3df74b59305f38cc14968ce8420be339c9aa38b19","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7440.svg","dictionarySha256":"d1acfb6f7e761ac821649f8f2858177f9815537b0881254a087064b54ebafcb0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"堉","strokes":11,"corpus":"Hans","originalMediansSha256":"28a700a11fe93bfa8d75a76ac5dc26734ccc35ab761e89a52dfa191b0ab56d13","pathsSha256":"19a21bdaf9ca1a9f13459576a59a3916d8e12f3423d381e23909594974319e4d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5809.svg","dictionarySha256":"f5f7dba7583c34c8532bb36fe8989af125b1ca87706074f877bc0700f8cfed8a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"璪","strokes":17,"corpus":"Hans","originalMediansSha256":"686d2a05d9bc56ecc6c4605d73221b491704557af58b3baaf684d7b61d613a70","pathsSha256":"b545b8b1b50b46cda16b124288c34919a11f2f6f9af989b1a9f4322c9fc530df","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/74AA.svg","dictionarySha256":"4ffa2ecce9d9ee3f86ad8725d8725de7adbf72ef7e2fd00a57555a2cd02a89ad","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"畯","strokes":12,"corpus":"Hans","originalMediansSha256":"fe1cbc37b1699e597bdedaf55839c195fa5e2db70ab5a69d275112c21e1ef3d4","pathsSha256":"365191eff323dd9cbdf7d87d8f69da941a6f13e238676af69989525235c0f6f4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/756F.svg","dictionarySha256":"3ced7256e8314ec833d7e631ea780808524c8a7662659c86c9327d39c587cd58","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"淏","strokes":11,"corpus":"Hans","originalMediansSha256":"dde5fc115c29e39c21fe8ff32beb66149de1b0514f33b9f1de2638e9e7c87287","pathsSha256":"86e6da7615f6d19bb5707b5b94905149fffcc17d00ad0ffe4ea5b9a2e825a3f8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6DCF.svg","dictionarySha256":"d1d7edb969f76f6f02137ba037b1890fb4840d4e43cc1eb15fdae7bb1574e4c7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
]
export const SPECIAL2_BATCH18_DICTIONARY_REVIEW_SHA256 = '1f79b7fa2c84af1f99361a0454323cad4184e70405b71c8c2b02658b07c3cf2e'
export const SPECIAL2_BATCH18_DICTIONARY_DIRECTION_SHA256 = '80399a3c3880e08b20589d094bd19aa43ce493e2228a8405f11a252960f785b5'
const referencesByGlyph = new Map(SPECIAL2_BATCH18_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const special2Batch18DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function special2Batch18DictionaryMetadata(ref: Special2Batch18DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL2_BATCH18_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special2-batch18-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL2_BATCH18_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL2_BATCH18_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL2_BATCH18_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type Special2Batch18DictionaryBundle = {
  verificationSource: typeof SPECIAL2_BATCH18_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL2_BATCH18_DICTIONARY_GEOMETRY
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
export function loadSpecial2Batch18DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special2 batch18 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL2_BATCH18_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL2_BATCH18_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL2_BATCH18_DICTIONARY_REFERENCES.length) throw Error('Special2 batch18 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special2 batch18 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL2_BATCH18_DICTIONARY_REFERENCES[i]
    if (!same(metadata, special2Batch18DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special2 batch18 dictionary entry mismatch')
    return { ...special2Batch18DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL2_BATCH18_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES = loadSpecial2Batch18DictionaryBundle(reviewed)
