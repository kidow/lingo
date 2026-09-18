/** Eleven special grade II forms (batch 17) individually reviewed, including 1 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special2-batch17.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL2_BATCH17_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade II batch 17: 11 characters individually checked, 11 approved and 0 held; 1 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL2_BATCH17_DICTIONARY_GEOMETRY = {
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
  }
} as const
export type Special2Batch17DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH17_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL2_BATCH17_DICTIONARY_REFERENCES: readonly Special2Batch17DictionaryReference[] = [
  {"glyph":"譎","strokes":19,"corpus":"MM","originalMediansSha256":"b9b6bf06bbcc6021235e17b99224b787ebfe113b6a3accd6146d523bf3f7da18","pathsSha256":"49899610077a6f447aa403fd794fdfe72272dccfcb0b1b378b7dfd5e691ac40b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8B00/8B4E.svg","dictionarySha256":"75bc5e30c66aaa43fcf285a579980f2996e31dd5adfe232b7e9e778488adccf2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"鷸","strokes":23,"corpus":"MM","originalMediansSha256":"8e37cd9737457c3ac83988570e99b6a48bf51a68e563e60ef7051991bd17c33e","pathsSha256":"ee9b9678f5e06afc8c7e96e17690f3bd85cdbf826c708f9e72969ac4dfac76dc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9DF8.svg","dictionarySha256":"fc945c7ffb0a9198c37a7f8ead6f4a8d50ea4f7d6d44e5f40448d3a7cafe6517","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},
  {"glyph":"昕","strokes":8,"corpus":"MM","originalMediansSha256":"54f050bc2c78c0c2516d96b71d38206b59dd3a13b3fec8c9f37eabb7a7231cac","pathsSha256":"554cca3d7a4c48568232745bfa66238ea3f2125b0eb6312dbf0e2c6c3cfc314d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6615.svg","dictionarySha256":"18425263f62b285f3d2f31104f997e6aeffef8e98752896f102d2fc772cf8f03","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"屹","strokes":6,"corpus":"MM","originalMediansSha256":"866a93e1db8544a5f156c76b747ba8c99b80cebe9ae327fa24ab35589af3862f","pathsSha256":"4fba621bc57e42c4241c35c2be4a466a5508838a34651552bd1551dd5938dcc0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5C00/5C79.svg","dictionarySha256":"94415dc6685eb415b97c6bd8dd0afb4ccfb8bb34e12adbbe8eef08f3c417f10a","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"吃","strokes":6,"corpus":"MM","originalMediansSha256":"63ca9d6fcf0d1ed5bae07d8933f8f6add1cc7441f0f949a938e38ede760358b7","pathsSha256":"002ef96a8e1382c9c066683eabb49c304496e55941e57597037215609b35c2ac","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/5403.svg","dictionarySha256":"de042fe1d0e7a16dbc475a83ad10398d5cdb024433345b44603ed3a74549fe79","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"紇","strokes":9,"corpus":"MM","originalMediansSha256":"605f0ee235b4896614860989baddadda78680e2a195bcf7a3aec26c2f009a7e4","pathsSha256":"d6f20957636be3539c2489754a8996c9e9d70f3186569b505d4a2991bb20bbc7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D07.svg","dictionarySha256":"fde975d85104d347a08f24d4b9fdad7d6141724bcb338a3b8c72be441cd23d48","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"訖","strokes":10,"corpus":"MM","originalMediansSha256":"660faa92d43c52e329c1ccb6bb40ea7f1101ab6b6fdc16754a28537d8a9987d9","pathsSha256":"72ab498ff6ed85d6ab4ed9c2cfa61690091313f63d927c6a502cfce86d24ff1c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A16.svg","dictionarySha256":"13e73b07a4b1cc35108e126a65a3e5bc4cae91a36923b236476412b40e5d4dcd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"翕","strokes":12,"corpus":"MM","originalMediansSha256":"31cf10530c8c15bf15df1a44f8a3fe70f029bf6eb1a141cac2ebfa40c80bead2","pathsSha256":"a858f001614126b18106395d6d07658ccaa0b79cf79851c9b1dc95bcc1e84d22","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7FD5.svg","dictionarySha256":"8ae289123353bbeedf6548b0ec209fc13d5a4b56750e21ce505e441b91209eb0","sourceStrokeIndices":[1,2,3,4,5,6,7,null,null,10,null,null]},
  {"glyph":"僖","strokes":14,"corpus":"MM","originalMediansSha256":"3c34f9d487732fcd82f9ba50b6bfafe44c0d842a2ea039462cb4f3da658280ef","pathsSha256":"3bff4df72d9d91692e43f235a59046d3029b02b153448e00789c8d47bd4e2b2b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/50D6.svg","dictionarySha256":"86ebf6d2fb3115fe1ed76a8fdc1cde35354d3414e676557fdf8740dd21f8b555","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"晞","strokes":11,"corpus":"Ja","originalMediansSha256":"7a89db719ee1b1e8d2902e3435f21be1f35483c2d35edb8094f614eeb100da81","pathsSha256":"56b23770fc347ce45c8b55327dec9192d14a01531cad8ac7f71cb07b703f5868","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/665E.svg","dictionarySha256":"9ba526327e0178a0bdb89ab7d75eb11bb0cc888fb0838ef3bed97b3c743f62c3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"曦","strokes":20,"corpus":"MM","originalMediansSha256":"8724536eebfd62889dfbe0a9451b70b33cd4d57151834d1631f026e1be7e3faa","pathsSha256":"b5ac5ee917c23e508f4fd463b08be898ba5562cf7bee1a5fa5d18b53af32d332","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/66E6.svg","dictionarySha256":"4dd3dc908778ee2ba326066aac184947c3136647a9c54b72af66862ead786ab9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
]
export const SPECIAL2_BATCH17_DICTIONARY_REVIEW_SHA256 = 'ba2b205fe70b2ee1fca52138e41207fd89ca5ac3ef6bcf06c1d1dba919159265'
export const SPECIAL2_BATCH17_DICTIONARY_DIRECTION_SHA256 = '9a65270a2f424697b259ae02c26c48243d0275bc0deb5666c3a9988038d5318c'
const referencesByGlyph = new Map(SPECIAL2_BATCH17_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const special2Batch17DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function special2Batch17DictionaryMetadata(ref: Special2Batch17DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-18',
    geometrySource: SPECIAL2_BATCH17_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special2-batch17-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL2_BATCH17_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL2_BATCH17_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL2_BATCH17_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type Special2Batch17DictionaryBundle = {
  verificationSource: typeof SPECIAL2_BATCH17_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL2_BATCH17_DICTIONARY_GEOMETRY
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
export function loadSpecial2Batch17DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special2 batch17 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL2_BATCH17_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL2_BATCH17_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL2_BATCH17_DICTIONARY_REFERENCES.length) throw Error('Special2 batch17 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special2 batch17 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL2_BATCH17_DICTIONARY_REFERENCES[i]
    if (!same(metadata, special2Batch17DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special2 batch17 dictionary entry mismatch')
    return { ...special2Batch17DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL2_BATCH17_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL2_BATCH17_STROKES = loadSpecial2Batch17DictionaryBundle(reviewed)
