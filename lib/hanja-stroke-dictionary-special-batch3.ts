/** Fifty special grade forms (batch 3) individually reviewed: three reordered and two locally corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch3.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH3_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 3: 50 characters individually checked, 50 approved and 0 held; 5 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH3_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch3DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH3_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH3_DICTIONARY_REFERENCES: readonly SpecialBatch3DictionaryReference[] = [
  {"glyph":"簣","strokes":18,"corpus":"Ja","originalMediansSha256":"8093ce4ce610f1a1bf2ba832060d35aa3f7e7c2175097d92c1d290d23378c73d","pathsSha256":"1ba3be8a91bc2f908ffcee751be8a7359e4a034ad38c17f69a58c357a1aeaa1c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C23.svg","dictionarySha256":"0701395801d3b3f381a0043bae9186a9717e2eddebab53a2e150a34b38eec5f1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"宄","strokes":5,"corpus":"MM","originalMediansSha256":"db10a89cc0defda5ba0de8d9cf7abb81f682a558f102398c782c02c361cbc67c","pathsSha256":"912d37159d050c2bd8e8d32717682253f594fc0fda2330478f6d8f40695cc5b4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B84.svg","dictionarySha256":"7f9ddf35ccdc8a11e7de9baf2eaa8efa3b8df152e017d62f714bec17aa63d928","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"糺","strokes":7,"corpus":"Ja","originalMediansSha256":"8abe76d83d2a64c9551df2a0e7df1ab6a007fcf5a84a01cbe32c4c0ce2e9fd94","pathsSha256":"19a3d35a3882c05cf98f114843fed5d92b9f3f962060a8ac51755dc14588c45e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CFA.svg","dictionarySha256":"94c7c2a5fca0077ec437ead96cdb089a313086815c7bf4b92a04b8aace96232b","sourceStrokeIndices":[1,2,3,5,4,6,7]},
  {"glyph":"睽","strokes":14,"corpus":"MM","originalMediansSha256":"0b51772b5e7ccb1c03036ddc90769b0cbef7748cba0d19df5c2b7119d778853d","pathsSha256":"0339210ad22d78c430f499f4dad25e3ad02fb773d3a94897feaf1aa3ef9da155","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/777D.svg","dictionarySha256":"cd1f01f1613af2f0eb5e51f59ff7675fdb7e2002d59cdf617775e7b7245d440d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"樛","strokes":15,"corpus":"Ja","originalMediansSha256":"9e72770002789ace2fb08202d2c200d1336ddf4c7151e02210d7ed7e7ec6ca2b","pathsSha256":"c41b33fdc5ca4cd512fec7a8f09fc9a5a9837893509884720722a2498d9f3aa1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6A1B.svg","dictionarySha256":"0f2f1ca7e50dfab5f021009f046833b82a809681dc4f7cce51fa53e892390870","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"箘","strokes":14,"corpus":"Ja","originalMediansSha256":"5440e9ce9d340d8e88b7ba7e1317c387fb42b49a8d412e8702c66d86f3470b17","pathsSha256":"d12a4f8a56825f7209a6946bb1429f5209a87b70486abb1b49b6313dae40f317","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B98.svg","dictionarySha256":"bc1953ead716db18818b27b9240a4a20fd933b598f369886b373dd068980ebd5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"郤","strokes":10,"corpus":"Ja","originalMediansSha256":"bdc66e8bb80f7bf630e8f68538de993202c72fd8cfcc0caa9f53c44a2a6723d7","pathsSha256":"0983b9b0d539f90f903b809aa31d1fb524588deb2b173b0e98989a840e1d63f5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/90E4.svg","dictionarySha256":"f9c99be9eef7e49ea6053c59451aa3a3ec443fc1337d9b338a921edcac5e3747","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"岌","strokes":7,"corpus":"Ja","originalMediansSha256":"45b099944dde43cb51f9950397b0fc300c1a144d402afb4d7caa94eaba90df97","pathsSha256":"cda44a471462e97513f96ff3cf032dc46b7a43297f7c74e8e1e36f6f38c88784","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5C00/5C8C.svg","dictionarySha256":"bd01af7097297400e72d4ebe005b673a8f9c0f9f018dbbc88a82594b2f0fd26b","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"亙","strokes":6,"corpus":"Ja","originalMediansSha256":"6dec8b521fb6314c81a906f54fa32e8761c884b5629c4d217039e229c85b53e7","pathsSha256":"84a4cc5e1dbf60104cca892fc0a7dec329a83b0699d35a85f3315bc6e68c3c6d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4E99.svg","dictionarySha256":"fe89195bc536841796fda3247b35aabc6bd4bd804c94ba261d153f04f077fb41","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"歧","strokes":8,"corpus":"MM","originalMediansSha256":"f2e55cf3d60461cd8fb37a68e55d6bf15201838638458b922d53d4427cca74a6","pathsSha256":"72a01fb52f8f4d2386b1d148433e36a4a05ed59abd40eebe8f62a23e2569a276","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B67.svg","dictionarySha256":"9ec5857a898dc0b558ae30acf0a82d11686fdb9aaa1f796f69d43f2667d61a94","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"棊","strokes":12,"corpus":"Ja","originalMediansSha256":"700a27962163818e7c938455ad09ba950ab2050cca6ccc6db29477877e06eb38","pathsSha256":"3e843a7075e36cb2cad278395f390d4bb2c656726c36c6f32c5d10dc0b55c292","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68CA.svg","dictionarySha256":"cfb9ada3b0b98295c6ff4dd967f0b9bc35708bed93f005c521aa2d5ec8af451d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"覊","strokes":25,"corpus":"Ja","originalMediansSha256":"4fc4345b7f10e76373976bf29653afb3a4d0257007cc3647e67c5fe5c401b8f9","pathsSha256":"9a6a460a4c235006d4159af56c0b9f355ac6b25dabe1ca2c84f69dd79afc8ed7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/898A.svg","dictionarySha256":"d22e22805b24e4b6c8e01503669d2b9c6a8fb036f077abc33e887d2a0779eb89","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,19,20,18,21,22,23,24,25]},
  {"glyph":"跂","strokes":11,"corpus":"Ja","originalMediansSha256":"5ac7bbecf869bf9301e86460fb0c7de2803ef2a4aecc2d06dd39c468a715a34c","pathsSha256":"6a100d74395455128363927463d1beeac9b5b7916078ac211e75f1bd3d5e9c60","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8DC2.svg","dictionarySha256":"0b4b0627b7a6b72b338eaa4e5b79f95c3432cd5a07c12e541445708ccc2b24c5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"屺","strokes":6,"corpus":"MM","originalMediansSha256":"833e62dc327dc409040ad6785a6db3f04d06872f79687dccb60a0aaa10e4cf7e","pathsSha256":"aee271f9bb225579e554e73a9bd6c30b5be9027e75539a4e8c03c3211206c4d2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5C00/5C7A.svg","dictionarySha256":"9a5f03a19d10ead1cef31cb9ad9f1effc0e97330235315f551db47bf3391bae8","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"忮","strokes":7,"corpus":"MM","originalMediansSha256":"66613d78a246f14827fe2cdb7cd0d4738d334dcc2613269036210547b352228a","pathsSha256":"cec77d0bd4097b3de3bd1b6bd4ecfb455b69fa9059f46e75eb78367f452a6926","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FEE.svg","dictionarySha256":"f9997ba20ffecadff3df6686358b088e87b8a5e904ba1ef14b80439972965946","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"掎","strokes":11,"corpus":"Ja","originalMediansSha256":"98e3693f9596257d86889ea108e25b633d8af8430f1e3a7a6371c90a70077607","pathsSha256":"370e7d78ddadd3645d8b778b8ac9ca1dcef5af0727f5fc6089a69c4149ff6365","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/638E.svg","dictionarySha256":"660f35d2ce286d9065d267248ece047ff3d71ce3033c821835682e3ea1c10849","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"羇","strokes":22,"corpus":"Ja","originalMediansSha256":"208f064b2ee2c855b68319905de0de8aa79259bdf416d4581d8cb8c52600b2f1","pathsSha256":"dd1a453bb4cd828d60b258283f324da717007bb9c8c8befb08efe121ad1d13a9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F87.svg","dictionarySha256":"0a9760e16026ef825d32fd6efd5821a2fafda16ff43ddd2ab0e6a74f79481a0d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]},
  {"glyph":"綦","strokes":14,"corpus":"MM","originalMediansSha256":"9994c5cc63d0a0a844b51ced477eb355d094069ba74097f85431058f332b93d2","pathsSha256":"3ab68f4fa7a03e5b993b2f258eedc8b07dd438e5c95b62ef45165cd97c7d4923","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DA6.svg","dictionarySha256":"13c6d0984c46f0d7cdbac03e2423cc1066b0caec8afd9c022eb60bc8bf79528f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"姞","strokes":9,"corpus":"Hans","originalMediansSha256":"6006be466e92e7c340f04d3fa75e72f1acfd85af85286d4a62682dfc41f046be","pathsSha256":"fd8c24330b54ee308f57ab1a322b9b47f02c5621c22a1c4206485f6c327d0482","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/59DE.svg","dictionarySha256":"f37f8afb833f6208c376fd3cc8db1f294b717a29be2d00966c4ed8909e780636","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"赧","strokes":12,"corpus":"Ja","originalMediansSha256":"cf496d514a19aa79678784945dd115b9be4515040caab6286b2ec68fdf8c4afe","pathsSha256":"9a022eb7fa598323912d22c1115f26b5b2473ca1eeaac6a4c31eae3926d1d6ca","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8D67.svg","dictionarySha256":"e9df2a275f62af2c3f532210435b74bf5fe114fd38f7490383a77b81f95f96a3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"曩","strokes":21,"corpus":"Hans","originalMediansSha256":"e6c3e0bd02ae0f45a83049c948d89c9e86194eb8de9dff2b466808cf95b3a35c","pathsSha256":"26ccb2e6450f96fe1d334aaf6ca6e0fabd539b919a0606fc72e02a469fda0d87","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/66E9.svg","dictionarySha256":"ff1829e9b9564b5c9a799c0212402b76c3e805b55b7e1a43cd6898ff68acb661","sourceStrokeIndices":[1,2,3,4,null,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"迺","strokes":10,"corpus":"Ja","originalMediansSha256":"6237aa14eccddbe12dbb9eb245118888633b558ef05f53297b2b1056d59cbd35","pathsSha256":"ea2f8929367f10dc3a8d975f26f85e9fb05ca7f7333781ae5303d42391e54e88","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8FFA.svg","dictionarySha256":"6382e7a0591b93a2934240cd90909e31d7238025d934a47df887553d549aa390","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"甯","strokes":12,"corpus":"MM","originalMediansSha256":"6fa8dbcd2e243edcef4589bf15dc0bcfa27c7f191983341c93edb78ff34cbb58","pathsSha256":"c41d027a6eee6ec38a10773d42236bab8f175f4f640d1f90b3a7f4c48621f4d1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/752F.svg","dictionarySha256":"74092aeb6d774a80ae6ddb18bb8135d78f71da004ae65d3f766275b44fc8636c","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"佞","strokes":7,"corpus":"Ja","originalMediansSha256":"e8a00dc99261f0d4d905be4b79d1d1b8b855a55389b5c432bbe1aad67edc4745","pathsSha256":"8b0d127f5e421e7baece7da645745a99645cdc0c9cfedd6b12a4c20e8a4b3717","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F5E.svg","dictionarySha256":"d464cd5b85ea643c73684eaadb112e6d0f08ed80c68b2c708e64a2766c6656f8","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"猱","strokes":12,"corpus":"MM","originalMediansSha256":"f250e5003817d4cbc6c765d9daaec2eb9b86563fbd797ed218569d16cf942a9d","pathsSha256":"df5bab26e098cc48188eeea88fcee5a22069bf29858382a53236e82675937644","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/7331.svg","dictionarySha256":"3625c85df817908e3ca5544b3a3bf53374a9afac55cb98c13ba5c55b0e9a4801","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"呶","strokes":8,"corpus":"Ja","originalMediansSha256":"26812bb4170b0452b6a60536512e4dc706e1f368c09520002a40341023b4d585","pathsSha256":"23d6a325ce637f2127625ee8151ab8e3be594a4a663b1c9756f24f2ddcfcd2aa","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/5476.svg","dictionarySha256":"162be1346275aae33eda33646d668bdd9051b016f29d274f3bcef69ef49c8d50","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"孥","strokes":8,"corpus":"Ja","originalMediansSha256":"24d4e82c0be013143f0e43c5d3f2c8245f25aefefc5b662bb4897ea59a1ea9c8","pathsSha256":"5edca0ca07c45fd277f89b383deb7f4cd65d2157b47017d3993f4740709e02d1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B65.svg","dictionarySha256":"d651e9d588649a52b3b84fe42699d078dd41baab902e6e51db6057890bbdb55c","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"砮","strokes":10,"corpus":"Hans","originalMediansSha256":"df4f129b01882be26f4ce98355809638fe888c12bb3fda8d1043769a69ccb09f","pathsSha256":"c10a28043570c321ba634ac2a7caad9bff4b465d8e7295472631d97282175507","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/782E.svg","dictionarySha256":"e7d0c6f6316a87a481962b86ebdb5080fb72acdb1166d53a4f53d42f13f9ae64","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"耨","strokes":16,"corpus":"Ja","originalMediansSha256":"6d737155f3b0854a84a32b73721ca724153a79301e586cb341b8a45c4a35f05e","pathsSha256":"ce6afdea9946d4c0b22f5a54061669c50ed4b18fa378d4aecf03dc125313b5dd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/8028.svg","dictionarySha256":"925eefb1f962d3b00a57f4d691d2ab50af6b66992af8df44ca84b9adf11464ed","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"忸","strokes":7,"corpus":"Ja","originalMediansSha256":"eb2d6087014853233961b362389c9003a0989913ea2dca8bd725de108754798e","pathsSha256":"d3b54f71c4e99d4d375c7cecf3c8a4e057b24ed2550dbf662895a9a434e5ed2b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FF8.svg","dictionarySha256":"67d415d599d82facb58612cc22132c4b17539bbad8308597c7e8497ba7b8783e","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"鈕","strokes":12,"corpus":"Ja","originalMediansSha256":"bd99a9e121898bfb284926122d80c5b828a94bb89b76a45d02a6e83ab624da81","pathsSha256":"13fb226d9468761d43723bfb2d8ea245ea255d2546c6124f831e1834f9d61279","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/9215.svg","dictionarySha256":"2b69216b6fc96ae45bf91db966cd538cd39b96f6f58441a6eb5c805eaad190d0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"狃","strokes":7,"corpus":"Ja","originalMediansSha256":"e5b288a48fa28ea2d98354e15fb00b14bb561521d6a98b366f396224bb4b27e2","pathsSha256":"5c05d8fe9f19349aed78d8febd225798af2eb56699b53ad2c8d5adcaf7e629ce","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/72C3.svg","dictionarySha256":"873e951bd0a2b4983559b57174010f3c6859abd0214f8dbabce266e400ff2403","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"你","strokes":7,"corpus":"Ja","originalMediansSha256":"c8d2521841c6452fa19493f047dda0fc6a577a2d2d58cfd5a5502bbf1259be61","pathsSha256":"2335e606c086aa6a097add06c044d345c8719c5b76e7075a16d70e11ff1463fb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F60.svg","dictionarySha256":"d9ed3517edce82be47f10b9962be176e4ca13b4905e39729b75caf8932018263","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"怩","strokes":8,"corpus":"Ja","originalMediansSha256":"6bbce872f83a71bc3a90a1553f4dfded074c597756a982d9591d86ccf9ed5687","pathsSha256":"482e9f0d747e6548bcd8ceb16282cecd68f5b5919d6c656e5f275e2103f088ab","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6029.svg","dictionarySha256":"75b0389d29bafb19a05b3ca04e5f94655f24de97b190f570c1d43310011e5865","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"昵","strokes":9,"corpus":"Ja","originalMediansSha256":"e462f4b475dbaa67919eb98cb1ba5b708aced10d7acc0b6de5c2ebfaaec9454e","pathsSha256":"a0e0fbda0f523080e796d40483572f34a361e5207a501511aa8429edc33f6589","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6635.svg","dictionarySha256":"ec0a4e4a931ca29daf0667e7fa579408f6e598a67f661615ad910d132c547a2d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"爹","strokes":10,"corpus":"MM","originalMediansSha256":"a0a7f4c058bf80aae79979f0da3aeb89ce74cffa330b8bc45cb2d17f31fe168d","pathsSha256":"4b69f6ec6e2597d198caafa45309589c7ba860342757b6ac9b6a2fafd62bbd25","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/7239.svg","dictionarySha256":"ce03a95ae30a03f5d8272ee0168c6ede8e03bc347cf4b8872488e3849f261c44","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"慱","strokes":14,"corpus":"Ja","originalMediansSha256":"b83aa3efeced008f8c452b92dc12b4037eefee53bb2118e05f6c4cfbb08f96c6","pathsSha256":"98c333cedb214d14d02741aae23751affd6de333775bcb40bbc88c8615dcc759","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/6171.svg","dictionarySha256":"9553369e216ef7e54e609414f6ec1b6667551b8a077b3757f4c7a12cd6a860c1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"襢","strokes":18,"corpus":"MM","originalMediansSha256":"9961a0dbc6721ec57db0558310791d0f441551665b73da61fe900e21444f2aaa","pathsSha256":"38fdf04bf1b9a3c850966dfbf59899c101a3a6ce7437b5e13a1fd81b3f75c72a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/8962.svg","dictionarySha256":"ab40fc4be2528592378439843fc0bccde1cc90499a8e3f3109aff662d0b530c4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"癉","strokes":17,"corpus":"MM","originalMediansSha256":"0192a0a5c709c65fa6e2f7a5a599723180838cfad83bb6ede11c8288df5dbb9b","pathsSha256":"d2a79f6bd4ec6ac1a3ea7fb804b7f3c5be38fc2e790b631051922f8ccfe18d67","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7649.svg","dictionarySha256":"c8be9f00e1a8db9126f4b16ae47452d9e6c6de820da308377a0eb89c22bc5c10","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"煅","strokes":13,"corpus":"MM","originalMediansSha256":"1dceabbce90fdef2020fb8c0e0faff3fb019f806c616d67ac25f72b93ef0d0df","pathsSha256":"e31331da059dfbce54f797d99af7bccb8f6b16329d97684418eb9fe6e5fee80d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/7145.svg","dictionarySha256":"cde26aae47af3fb058129643b5f687ae06f78aea701a7a7ee2a6b05062b33912","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"怛","strokes":8,"corpus":"Ja","originalMediansSha256":"0eb855ab27824d41914df4fbd78471d7c214ac5eaef74889bb0fa90d422dd934","pathsSha256":"9d42a2f387bb7485af5de98caf5b0027365c28eae0d7c28f2352b3c614bc4253","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/601B.svg","dictionarySha256":"477822a271ffa9ca59a8c09a38bb3f415806b956ee56b96e87881ac0c27d3fdf","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"儻","strokes":22,"corpus":"Ja","originalMediansSha256":"62260b1a99a81d85c1c78065f5a4e496701d487730504d7ba65d23ab9ad39f45","pathsSha256":"5de856e07939f85a93505587355246a9e52a501eb7f7baf6cb7e9e12dab1f9c3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/513B.svg","dictionarySha256":"e789589a636c90494c3e50ce8b4920e662ab79f8500f4f86e895eff6b60fd018","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,16,18,19,20,21,22]},
  {"glyph":"鐺","strokes":21,"corpus":"MM","originalMediansSha256":"00ba841dbad736007aff0bd4cfc2c7a4d497693590302f3499b3d013a7be3196","pathsSha256":"a5915816ecb0be74927b8ae09b7dc55d30bf50c4a045ef35bdb91fe29a7f6976","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9400/943A.svg","dictionarySha256":"dc2a1c11f3a7a4395c3ec3d8d88cc00f955a1d5afc1b53bcb1f2d4f38566538e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"螗","strokes":16,"corpus":"MM","originalMediansSha256":"15b6699ca1c149b858d313a7eb9d201fbaa9b8d8ce6cf9fac421ee38899301d3","pathsSha256":"c119e26fc1817c2c81c4cc17de95d50b4c5e4048bc2724ac847b5321ecf25f29","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/8797.svg","dictionarySha256":"08dd20a097c747c95ca18c4da6a873412c34d52446596ea6fa59c56c8ac3d8f2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"倘","strokes":10,"corpus":"Ja","originalMediansSha256":"87831796e37c7a7b2745e652230ee90bbaacf65355805dec5c43e83a5afc98aa","pathsSha256":"6bffbec7d6b884bf9ab8cc7632567f959e1ed3f6634e506cba145c07ef1bb276","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5018.svg","dictionarySha256":"e8c85713daa2bf18306786fe176600d37ff1f124911433cbe8b8ff09c976eae8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"懟","strokes":18,"corpus":"MM","originalMediansSha256":"95ece44c2df714ed06e85b371b4b007ea8737bca424c1e21e2f89f8876fc2a47","pathsSha256":"0479c641604812f7b9f650a89da5e61892a957868dd85137b6a2df407c3c9009","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61DF.svg","dictionarySha256":"21cb6c60f2a74a4c408736cd29f8c02251badbe2f3dd70cef305c76302e4c33d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"憝","strokes":16,"corpus":"MM","originalMediansSha256":"9e44929325b3d5a5696c7295c2318004049a5d16491cbff9d6707fa8aa43c365","pathsSha256":"f02bb370cfbc1fe111c4d87ec8ba520f717dccbb7762f9abbc20dddd83320b19","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/619D.svg","dictionarySha256":"a50eafb414f300f7d2fa91c3854282faf3ebf39cf149ebfa7ebac89b55f02215","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"檮","strokes":18,"corpus":"Ja","originalMediansSha256":"08776b19a712ea2447a48df13e0da8486972a67731c97e449261722b75be29fe","pathsSha256":"b2551723007fe8c57c66ace8d04f9ce9f157dc4daf0f6e0fe359d4ff4deb2971","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6AAE.svg","dictionarySha256":"23b86f7372919ee8f595277f1499c3c2cd471d0c98f6f8e43f3f2a28c3eab28b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"擣","strokes":17,"corpus":"Ja","originalMediansSha256":"f9816c93a0349be79e39afe27b365526181e32d06a3486d9f701ffc035cd04be","pathsSha256":"559ba31d45d1256e0566550e235c3b64b4d12449865e03f66096075bbfe8d3e0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64E3.svg","dictionarySha256":"ff5bb3c47c45b4f22231000a924c30d055a51d06c129d8c773e9a698a72d95f7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"鼗","strokes":19,"corpus":"MM","originalMediansSha256":"02f6e0f28fdb186c60c3826a757dd682926c5264002751c347e20f39aee66d16","pathsSha256":"f5e54e2926e5ef45deace4e8d3dc36a9224c45f8b92f484738d48064e7594354","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9F00/9F17.svg","dictionarySha256":"1293fdab05fba405399d52b048594aff91948740ea3171ee588a73e643fb73d0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
]
export const SPECIAL_BATCH3_DICTIONARY_REVIEW_SHA256 = '7784b086cd086ec7d389d1a13c8f72b370d44e923e67835a9aa662ad86edce4f'
export const SPECIAL_BATCH3_DICTIONARY_DIRECTION_SHA256 = '5da34f769201777ece6b791a9dbe2a96e3a7247bff34c135d68f3f2915df0556'
const referencesByGlyph = new Map(SPECIAL_BATCH3_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch3DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch3DictionaryMetadata(ref: SpecialBatch3DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH3_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch3-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH3_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH3_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH3_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch3DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH3_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH3_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch3DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch3 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH3_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH3_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH3_DICTIONARY_REFERENCES.length) throw Error('Special batch3 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch3 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH3_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch3DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch3 dictionary entry mismatch')
    return { ...specialBatch3DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH3_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES = loadSpecialBatch3DictionaryBundle(reviewed)
