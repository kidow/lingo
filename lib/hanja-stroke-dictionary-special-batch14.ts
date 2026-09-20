/** Thirty special grade forms (batch 14) individually reviewed: three reordered and seven locally corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch14.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH14_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 14: 30 characters individually checked, 30 approved and 0 held; 7 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH14_DICTIONARY_GEOMETRY = {
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
  "Ko": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsKo.txt",
    "sha256": "7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 1387824
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
export type SpecialBatch14DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH14_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH14_DICTIONARY_REFERENCES: readonly SpecialBatch14DictionaryReference[] = [
  {"glyph":"鬨","strokes":16,"corpus":"MM","originalMediansSha256":"380d98b1b469a1d81055122d1d7ec42cbfe6da0243303acb7a131bd7047b28f0","pathsSha256":"85e93b59e911e747b821e7afa4b29cec8b59508c198952e7adacd7a763f603d8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9B28.svg","dictionarySha256":"081062a79bb00000edb91b91ed30727e2abb231778e903706c3736c532a45890","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"洚","strokes":9,"corpus":"MM","originalMediansSha256":"a14cdb3f29007c3a036bd19efffd06e81b5e9651feafb7a25a2c08878f72d86b","pathsSha256":"4b92c718034b5bc803fd9a8cff1522ebcffde2a8d1ac6c3f264b7c76448dc812","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D1A.svg","dictionarySha256":"67012cd6fc23c8f976944f0d4d74460e298041c4314f2b4c117bda7285264e53","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"矍","strokes":20,"corpus":"MM","originalMediansSha256":"a504db71ff0eb1a49af02ae60cce221133ae1992b86bed3613c146dadebf22bb","pathsSha256":"f6f351198570a4f5943541b7325bb0bdbc205cb78c760e7f4bc3365d6b5527b4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/77CD.svg","dictionarySha256":"a9b97734733a189c47a503834c52d2818cff0edbdd2896589164923a1ca25278","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,null,14,15,16,17,18,19,20]},
  {"glyph":"豢","strokes":13,"corpus":"Ja","originalMediansSha256":"57eb61cfbbe1e3067babb67d217fc112785ae73e88303f2b6ec9bead3db2c6d4","pathsSha256":"14783513b0a0e7afd1d580d5cb297913e3cbc95cc8d10d4a3ae4311428e09cef","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C62.svg","dictionarySha256":"d86f98f53d67da5032834ef8148a32d94d2af2c508eb0237fd3a286c31bb071a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"圜","strokes":16,"corpus":"Ja","originalMediansSha256":"98410920946fec6aac2f2042439a8a421a79b97c74914c3b9143d0edabd9776d","pathsSha256":"54a1da6143533d21c669d62fc578a146399169e142a602f5f08bccb869c77a57","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/571C.svg","dictionarySha256":"49494dba7a4ef23d6168b9ac90a3aca074b3a00f38800d10eb6e999e97dcbcad","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"濶","strokes":17,"corpus":"Ja","originalMediansSha256":"0f927bf0d5e8a0bac896bffa0069db882bb3686c8411ed849caecae04f48f195","pathsSha256":"70a5d83999bd3c3841692b74854f2d2eec6b102361b233edf330513ac51bafaa","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6FF6.svg","dictionarySha256":"6402adc5688411130b5d13b711dc7958baa63740f24611648129aff3bca591ab","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"喤","strokes":12,"corpus":"Hans","originalMediansSha256":"d3786f94adc6f927b2dfb1bf9bae27864e3b502eadd44dde2217bb929ea2c7a3","pathsSha256":"9cd40e540632804e201851fd2036a88d004023eab3d06ac1487349393be3681a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/55A4.svg","dictionarySha256":"2552790c168dfb21aa7e66adffb3b16e170a98bb6fd38ca2234925d387377f63","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"洄","strokes":9,"corpus":"Ja","originalMediansSha256":"ad8f8430c29f607381f92f1cdc63c979a7c36862473a9c19304ac6968625f811","pathsSha256":"8bc7ad2af9a639f40c5633b025d56c11346b4b2482375b4fb53b3d88a9c54ecb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D04.svg","dictionarySha256":"5b871dfb004fe73891d414f0c8829d7c9d6a161f749b4886f9ad133544719d10","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"薈","strokes":17,"corpus":"MM","originalMediansSha256":"8c646ab3fc63b903a0524d35ceac54a0b84cb953fc3c0707c2ba1ab9e09a8799","pathsSha256":"d06de57964390a72479ffad7fe2510be9e2c206a35de1d9cc523e629f3c8af52","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/8588.svg","dictionarySha256":"87673ddd20aeda4f1acab14e837b397dfb022dcf3d1a41a5c1a7cfbe83e89584","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"鴞","strokes":16,"corpus":"MM","originalMediansSha256":"399e1520dabcafe22f1b9ad54417d95cb1086ca939263785ce58bf7bf8521ba9","pathsSha256":"4a878717401161437f7edc67469a359e5617273b4c7397d0cb45f883f72bce6b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9D1E.svg","dictionarySha256":"41e66f02b41cc55bacf9c50afedc3dfd922e49f9a691b73dc26e538624da31a2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"効","strokes":8,"corpus":"Ja","originalMediansSha256":"a3e0a5403a45429df41c4a33d6c4d58d01ebf2c598390b9343ce8a61d506eba3","pathsSha256":"1d73e8062d17343a84c34f52ca0b45c2540fe97818227a0e3557e18e217f0b8d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/52B9.svg","dictionarySha256":"74f63fed8737e873409203a122fc428cc77b9314e140442d1bedf27070f36dce","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"傚","strokes":12,"corpus":"Ja","originalMediansSha256":"d13e5da16c780d55fdf6d5949d05334dc7d7a890361bc01f17782c9dbf466150","pathsSha256":"69a7648360ddf5997c0dfc75c23fb00648b4c949baad11860949c51f36053d30","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/509A.svg","dictionarySha256":"7122730bb53801e11e583b18d862a474929f88e1cb5572521182b99ef17a252d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"囂","strokes":21,"corpus":"Ja","originalMediansSha256":"1751672ac82219d4ce4ef8f6ff9a6dcd74584973a912a32f6b5064648e0ca99c","pathsSha256":"86dd337585214b45f940733e42b4c8f4c6418c1e0b7eb213e3d568c83fde8a26","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/56C2.svg","dictionarySha256":"becaac3e09ab2baf011cc9641620877bdbc32847dbd55141ea96354073134f58","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"殽","strokes":12,"corpus":"MM","originalMediansSha256":"2b39d97159fe3c11ba5c6fbd7e9c3fc0d560682cc5c22fed30640dadaa93509b","pathsSha256":"d71e9961042290696e1ab2b83878186a9b4e6f26150f76cb7ded7b6c427feab8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6BBD.svg","dictionarySha256":"076ee1e0e67249592ad14bf79b6a246c9962c5d6e1e5c24697ed6094140beac4","sourceStrokeIndices":[1,2,4,3,5,6,7,8,9,10,11,12]},
  {"glyph":"酗","strokes":11,"corpus":"MM","originalMediansSha256":"e19625c93ecd3c0094a4ce424645f4e85974fc396ee9dddcf628443b8fa1cbbe","pathsSha256":"a062faf078d6d549481b3beb2e84da1d9fcdd8aa57ee25e58a4f408092252256","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/9157.svg","dictionarySha256":"1c794ed27ca9bf9656c561835969a751ae172845b5cdecdf7a562862923bdbca","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"詡","strokes":13,"corpus":"MM","originalMediansSha256":"339a9a8fb0e52092abe373d9a2907ba4d370339c1dace31dfc6a4cc8ca867858","pathsSha256":"228e37fc0396701f40a36951eb2e5803bc00612d3178af768c88dd03f7ee1439","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A61.svg","dictionarySha256":"0aba2c3a0346cf26ba353c33ceff6b7b5023e13b0770f3844cd0eaa9e3bd919c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,null,null,11,null,null]},
  {"glyph":"諠","strokes":16,"corpus":"Ja","originalMediansSha256":"047db50dbeb28b82b810aa2892a7924c020e56a39b5b751506af789b451c6301","pathsSha256":"225bd0446bfcc65557bf01f02bafffd537707f9f127009b356daa77bca0c73dc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8AE0.svg","dictionarySha256":"4a995c2f2b6329052a1c6e73344a28a2f97f09d64f4fe1336b7ff69a219f6149","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"虺","strokes":9,"corpus":"MM","originalMediansSha256":"41b0c1cf3b5afa1ca9eecc1dbac1f66f26d409fa0b9bd08eb9a7f15dac100db0","pathsSha256":"6f49d44d7bfcf6d4c5f4fba73840a71c8983f7adbda7febbf4d87a21a3cb36a3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/867A.svg","dictionarySha256":"6baa27aa12306656b4de50af6b54ebe7cea43db67658738326dda1a558bbd5cf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"睢","strokes":13,"corpus":"MM","originalMediansSha256":"3abe881dc1d963c3f1443e2772b36a148c5b97691bbea503e165d81db76d67a6","pathsSha256":"967b43ef7367cb2e54e9463a3b4fa046e98aa948b6c333e8e03d256a7d8baf84","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/7762.svg","dictionarySha256":"9c4290aa21bd87413bb48fa1362aeed3d6269d739d7251522a7e91017f2c250f","sourceStrokeIndices":[1,2,3,4,5,6,7,null,9,10,11,12,13]},
  {"glyph":"咻","strokes":9,"corpus":"MM","originalMediansSha256":"99a5c5805e223cbc99e6f303d3314c1e76002d647cfb4b4c5d4de48769a5c83e","pathsSha256":"7b5f51d3ba019e5e1dfe2f126692c2360fe734714a55bff7598e4b2b2f2a3b25","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/54BB.svg","dictionarySha256":"19ab386e1dae9b5bf7c578dfe09a1f16e4b278295e7fdf4e6b8841866900e08c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"攜","strokes":21,"corpus":"MM","originalMediansSha256":"090739c006197ef7ba3463fdd4abf6c50528d74d7a23ee3eb28cf9fb2b144867","pathsSha256":"a807bf7877dde1bcfe717adf1a4378fbf3d1fb06800a0ba3971023d544f0783f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/651C.svg","dictionarySha256":"e3bb8c05cc8a88cc776929973b208dbed0427442dd78101d4742ca56d47de9f0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,null,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"忻","strokes":7,"corpus":"Ja","originalMediansSha256":"c0c8881e50cc8e330dfc20cbe9f7ba465c2a43b18b8240da6fcc69287234ca2e","pathsSha256":"ce79f65158aec630bf58010aeefd46523eb17580cbe529b848d49fd50c3ae6cc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FFB.svg","dictionarySha256":"c6bb3dc67e5b408de1b5404fc5d75495eb1f0067b14521fcc9651e9b39675b91","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"迄","strokes":7,"corpus":"Ja","originalMediansSha256":"5738e50efbe9292b9b03eed8d6f22e5ccd18a95c3253464231df1e0be062b74d","pathsSha256":"c600596ff6a0532323b809e21861919f1c1f86212d88c77f9e3f1b4855340f62","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8FC4.svg","dictionarySha256":"2ee730a945fe148bd8ead96e2f9b2982249d0732b29eff5e254ded1ed88a9535","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"汔","strokes":6,"corpus":"MM","originalMediansSha256":"0771db62df16bdddfb70d1f8563bd58878d2d05622b09d0496bd703b63f982f9","pathsSha256":"31ddea6bb370b96df11e2c07fad9f61056b652091519234c617182125a44dbf2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C54.svg","dictionarySha256":"eb51f766c8b1294dbed303b7e49bd13b39b9bb582b2817a120016710723d1cfd","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"仡","strokes":5,"corpus":"MM","originalMediansSha256":"cd60278f1704f1f8f132830de3e81621d2b2106ca58464bfd6407dff6b8e4c5a","pathsSha256":"a32f1e04b5a21538a122b439b9e983e051e99f46fb8b51cd94e1ea7438a035ae","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4EE1.svg","dictionarySha256":"493ac72d1f307bdd27ac9b1fb8378ddb1859932f4e30ca8ad7c5e84657f56e86","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"咥","strokes":9,"corpus":"Ja","originalMediansSha256":"8b3928c9258516418778ea5e907cb414eb72ed57f626122bd10b8563266d883d","pathsSha256":"31266cd3d5a6eb03522d33c0b1093e1cb4527aa7a4b4d7ed3c717cda4598ca28","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/54A5.svg","dictionarySha256":"cb0b8b2d0d5b4050e7a176f8ae87746949e1edae4137b5801b88bf45ae5161b1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"嘻","strokes":15,"corpus":"Ja","originalMediansSha256":"81732e7820cc68143c83ea5257cc997dd557d6674a4f1eb0981394f0faefd61b","pathsSha256":"c72c47340de887d7cdb37f5f45c45809d2a309a4741161f7c927d2d9915c7f04","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/563B.svg","dictionarySha256":"a564156afbc253421f750fd7f15a3a8a7c1d762b3131d34d0731cb80ebf7b08b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"豨","strokes":14,"corpus":"Hans","originalMediansSha256":"c2b484da9754cabbf3f4d8d729d67b4fd970813b79631c6aa5ada7e15c31f4c0","pathsSha256":"9b782d2698c448b3f25cda10040206f8bce79084f06389dc7d82737713438a28","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C68.svg","dictionarySha256":"2febdd43b9db721a0ea6f8bdba5df2140dd3d356c2033022776a53d9324b717c","sourceStrokeIndices":[1,2,3,4,7,6,5,8,9,11,10,12,13,14]},
  {"glyph":"橲","strokes":16,"corpus":"Ja","originalMediansSha256":"badf5cb384526895f42e541864fb9814ada30e4898a871ddacc5229e5d88695f","pathsSha256":"5fd2d940645ea740f0d5d41e46d397673dc48860dd706cc836008de46116bf7f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6A72.svg","dictionarySha256":"852e5ddb8d63a18fdf49e7e8431a3d0d73603619a52f052f611ce0a20685baf4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"襭","strokes":20,"corpus":"Ja","originalMediansSha256":"d980051b2d25a2eb19788d3be5e8c7d31b7d6c1014fc85a00754eaeed122e5ef","pathsSha256":"a1a6970cea5c38d616a28b6bd949ca32ac463bb933ea33fb1e091835b4ddbac5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/896D.svg","dictionarySha256":"c027270aed6f20ffdfb68531ace530e32537a4bc06f17acef6512be7269ccc55","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
]
export const SPECIAL_BATCH14_DICTIONARY_REVIEW_SHA256 = '8e46881822b99d98c40e7e47befeb43113badb0c556cfd0869c562666c42f34c'
export const SPECIAL_BATCH14_DICTIONARY_DIRECTION_SHA256 = 'be8bb55272839f4ddd5fbb507f8d7678a1abe97396198b44fa8bf36fdd434243'
const referencesByGlyph = new Map(SPECIAL_BATCH14_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch14DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch14DictionaryMetadata(ref: SpecialBatch14DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH14_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch14-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH14_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH14_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH14_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch14DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH14_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH14_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch14DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch14 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH14_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH14_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH14_DICTIONARY_REFERENCES.length) throw Error('Special batch14 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch14 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH14_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch14DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch14 dictionary entry mismatch')
    return { ...specialBatch14DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH14_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES = loadSpecialBatch14DictionaryBundle(reviewed)
