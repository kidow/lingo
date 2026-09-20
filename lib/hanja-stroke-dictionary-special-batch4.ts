/** Fifty special grade forms (batch 4) individually reviewed: twelve reordered and six locally corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch4.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH4_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 4: 50 characters individually checked, 50 approved and 0 held; 18 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH4_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch4DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH4_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH4_DICTIONARY_REFERENCES: readonly SpecialBatch4DictionaryReference[] = [
  {"glyph":"叨","strokes":5,"corpus":"Ja","originalMediansSha256":"4aa36fccd19e603818cc6cc01c4447690314406cad750daf802429ec8c042dd3","pathsSha256":"2723a14ac209b19f8a890a7cedc3b8b9d068cf9f72739b072163e2ded027440b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/53E8.svg","dictionarySha256":"6a863b02f2b35a221b6059f02bbc54fa37f8485ba681b7f6477816f31a7bf9a7","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"綯","strokes":14,"corpus":"Ja","originalMediansSha256":"be13ec2beab63475fb473ce753357e9646bddf65b59d823078226097b24f1cad","pathsSha256":"193e94bdd03a5e34fd4a3dd48911c402a81825e77808418e8ded800aa12375b6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DAF.svg","dictionarySha256":"52d00d67f7c825df223dfd62bebb035e181cd79298a701c3ee7ae1ae03db1586","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14]},
  {"glyph":"忉","strokes":5,"corpus":"Ja","originalMediansSha256":"05bb00b02bbba0ce635758ce4d0e8a44264ed3ea27e571939b9a3caa72753e60","pathsSha256":"a8bc4196d18065b3e23daec4dbd2f8045ae503c88d1654333022613ba8de07a2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FC9.svg","dictionarySha256":"29bc5ef6f05e6da4c6cc2fb0d27628243ce021b1dc333fede924db3c1989bc74","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"黷","strokes":27,"corpus":"Ja","originalMediansSha256":"4d9c98f49d582bf256096e5e0fa5a27b347746f5d04170a6e89d1cd3a4d3ae92","pathsSha256":"0d68d245f9bfe97f6134ef976f9e244c9d215af54d8719fa8a5dcc7f214a8540","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9EF7.svg","dictionarySha256":"26de8f867833b8b02e08179fa49eba8f5b7a225cec1b6cd3a6cb4df654373f12","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]},
  {"glyph":"僮","strokes":14,"corpus":"Ja","originalMediansSha256":"09a82a82afa82221b7f40deb3c0594aab4f0298bdbdd120f12716d0922eec724","pathsSha256":"013a7117fb99ce9f44b3328e880d25dca7fbae4657f7b0ea7d91ab229f24b792","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/50EE.svg","dictionarySha256":"8e49f07e4fb76b7db2bf5ff87e4752320652a87398f53f0b50855a8a06e28c26","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,13,12,14]},
  {"glyph":"侗","strokes":8,"corpus":"MM","originalMediansSha256":"5287edd8ad32b4f1facea2326457123c8844c0265c26b1c85e3af563a8bf2b4f","pathsSha256":"32d97373d626e155645bdfd36818eb7be91b466404a96ae133ef6c3183cc5410","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F97.svg","dictionarySha256":"44681e6653159bd4b34a6eb67e870609fd92390a7c29c97b2566440b5b4a3c0d","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"彤","strokes":7,"corpus":"MM","originalMediansSha256":"c4b52d8ed821f316991914f6dc65790f4edbc051f3d66457f67019883198445a","pathsSha256":"40a87699d0be240896f20b0981e2e198adb21419e343e831d7652e672f8d2d5a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F64.svg","dictionarySha256":"7f4fd1b2947327eb87a0f4135c0b783386a523f05afddb106521b28adebe464f","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"螣","strokes":16,"corpus":"Hans","originalMediansSha256":"eeaae4f4cb4a3a7c1acd3cbd9d109dd806b3a17666a7b4d59f607f4bf2283779","pathsSha256":"815303dc9f59d058877225792e7424a49d596fcd41d0a61e1dac2cc290a5f01f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/87A3.svg","dictionarySha256":"d3df4f8294140da620246dce9b5b0817920fa622e49ed22cbaee720dd5670caa","sourceStrokeIndices":[1,2,3,4,null,null,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"滕","strokes":15,"corpus":"Ja","originalMediansSha256":"19bf5e990213f3b88224ba46570deb5dc362de0bf2e86ccefcac6022b581c5c6","pathsSha256":"616fa61dd9eea76aa9608f5deec97d95ffa20b9b7d68e3f0b9d99ff7463ea322","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6ED5.svg","dictionarySha256":"d84048a1e9ecc7b1a63df952e0c641682d5705df4e0c8a9b5104c27787a432c7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"縢","strokes":16,"corpus":"Ja","originalMediansSha256":"db9e92da5acf1394541b4487323ff82df7af63468db3080711850b233e0ecc9e","pathsSha256":"a66ac71425d3ae2c93fdb93cfd827c0d09da824b2722bdd1731866f37d11cba3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E22.svg","dictionarySha256":"320fc43ca86ede59f85a5cc7d970727c6624a62e40b1cbc05c449b736fe66d25","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"蠃","strokes":19,"corpus":"Hans","originalMediansSha256":"a33bfb2b8c692b2f5ff9de6d7a90c2217d6327dc4955d93bacde2caf6a6d0484","pathsSha256":"a071292e5e326a3d59cf34b1d319b16d9cb0c2cb7faca1ba933e88c029b2d196","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/8803.svg","dictionarySha256":"8372238e5383f27d382b068fdadeea1d932c437bb26703cdb265ce03c5754b72","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"雒","strokes":14,"corpus":"Hans","originalMediansSha256":"c1ca9912be091afc9f554654da41fa76d070be5182f6ac268ab5b1c1cf048bc5","pathsSha256":"e7208c107c3a74a1e798ffee066018b96e867365f7a82ce200fbe940c26874cf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96D2.svg","dictionarySha256":"9a107121d6a14b5b6debf1adcb8157ff1689795f68c408cd6d6065ea105359c3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,null,10,11,12,13,14]},
  {"glyph":"闌","strokes":17,"corpus":"Ja","originalMediansSha256":"5c66b8ecdc5abaa7fd4d54366fcb97ca2dddc61e8d132eb26bb8a4fee83c5d4d","pathsSha256":"968f73865d50c8b48d9859a12abe43c693d9fdd95db4e320fa9e990439b5dfe4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95CC.svg","dictionarySha256":"e30362ea63ee95afbfaae5f10c87df5864f73529911c1bf95b8869df1e5bbce0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"捋","strokes":10,"corpus":"MM","originalMediansSha256":"91e569a32f4593e6bc1548cd885c19ebe17d5f814db38df9c42d6ccdd9ed7f34","pathsSha256":"07bfd71028e403764f5fc1334a7b426d66407f7b1e1459b2435108084848e9fd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/634B.svg","dictionarySha256":"4da67c32f55c10aa38d45b84807d68881043524ee770846efb12686a2cb5fb51","sourceStrokeIndices":[1,2,3,4,null,6,null,8,9,10]},
  {"glyph":"稂","strokes":12,"corpus":"MM","originalMediansSha256":"22a66bb1c3daa050c701eaf76d2d960fc7dc8ceafc0239612313bb2c66486014","pathsSha256":"714c89772eb725c3a9f188a12ef900cc04758be6472e39bca4ad39c7762ca2fb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A02.svg","dictionarySha256":"9d3933f386a437f029207a9b7d5fd958e8479c4922c1e18b346684499ebd231c","sourceStrokeIndices":[1,2,3,4,5,null,7,8,9,10,11,12]},
  {"glyph":"膂","strokes":14,"corpus":"Ja","originalMediansSha256":"1fc34a39d7f10f519e486799e25f3ddaef7bb78f1f2ef4bd0ad65bd3ef0a5315","pathsSha256":"dabab69eb70f9808d75e5d8659131bd0f0f1e81fc0898b994aa058739df2e5c2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/8182.svg","dictionarySha256":"d29f7c750e8ed5a4901fc9492f3e1d179c7b8cf09d163f0a7c14b091b8276f3e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"厲","strokes":15,"corpus":"MM","originalMediansSha256":"528a6cdf25c3d3875908f1ab44970097017dcbb554af90012623fa8d94295489","pathsSha256":"064a4551edeb80be0b600d979992fb30b1214d3d0f27b2c6f631b6bd82f9b1e7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/53B2.svg","dictionarySha256":"f1d2c3c563fb59130808ad378f8ce4e1ddb0a373478b3f72080602a919447836","sourceStrokeIndices":[1,2,4,3,6,5,7,8,9,10,11,12,13,14,15]},
  {"glyph":"蠡","strokes":21,"corpus":"Ja","originalMediansSha256":"83fc7b8976fdd46ee8554e8bfc2d18bbf5fd436d06324de59ab346a715a2b71f","pathsSha256":"9ae4f0ec6a555f43ada34bee35a14f94c67e0456327fbe42267407f71b6dab1a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/8821.svg","dictionarySha256":"935229bd76247a91f5bfd3bf1dacab60847c8d0f6d0e4245061d6fd81e18475c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"藘","strokes":19,"corpus":"MM","originalMediansSha256":"ec6e8233396d529d7ad76f175ca15c08777fcc74a724e6cf104a2ad980b1e4a4","pathsSha256":"12f7f7fd8a81973a6751cdc6dd476975b748da16ecd190e77a706422a909ae82","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85D8.svg","dictionarySha256":"86257c3990450f930ea4e71543c92dfc287f584bdb21ff3def9a85d0f1512857","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"櫟","strokes":19,"corpus":"Ja","originalMediansSha256":"569e8b1fb9f536b4c8f1a8d9fc53db7c9555ca310a7edc1681635e84a7a784aa","pathsSha256":"29015d03a2466168d80386d3a06d7e3ca50f2bfb8ea65c87602fe2ee153118ea","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6ADF.svg","dictionarySha256":"9c00d541b0b5b4ea83f52eb88d46b0997f711a17626522c0b5c9dc402246a013","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"鬲","strokes":10,"corpus":"Ja","originalMediansSha256":"47a833123be9aa0263f2c8991920c209441756d1bc5ff6ebdd9a49c28cbbec8e","pathsSha256":"cc8412f6ff697e5e1f6a476937971f1d5deab52b6c84f065c01218e48bc267b7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9B32.svg","dictionarySha256":"525736ea72393e524ea00aa51842a413e1e50859ba8994eda8275f04898f7d77","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"孌","strokes":22,"corpus":"MM","originalMediansSha256":"1a64b159a62f0219aa4b60a9ac0da711fa2523ba56829346e4445b8c07d486f0","pathsSha256":"23e017daa5146e5b6ceffb7151f474f96a231ed1d36d66ff0f2592a23e55242e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B4C.svg","dictionarySha256":"650fe36052521c0982b66ad04721aa23a7f9e68d91da266214cf6da1e84ab21b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,12,11,13,14,15,16,18,17,19,20,21,22]},
  {"glyph":"蘞","strokes":21,"corpus":"MM","originalMediansSha256":"2031f83ffc98384a57c82de8c9dc70c4f34f1734c30064332492f00d2e10b161","pathsSha256":"34d1048c98e765168c2ac6f40db35068fda48a6a21a58e357ce8c0d0131003dc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/861E.svg","dictionarySha256":"51bc15a548866935c77686f934c1d18f6ccd47b75312fe8992cc43f46ec4a7b3","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"蛉","strokes":11,"corpus":"Ja","originalMediansSha256":"d7bd44f4bfd62282ebb570f2b605bef3ca03ffca937ff1f77f42bce6748d6393","pathsSha256":"eac365af6a3d24f18803ef9f7893b48dcce3c353080b167d46aa8edc416f6591","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/86C9.svg","dictionarySha256":"a2486608133c235d2165ed8ba0b910599dd5d71d0b3703db808f838941d7ea53","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"鱧","strokes":24,"corpus":"MM","originalMediansSha256":"c7a7cdb070ff548903ed50f3f9b106fa6b0591395dfa550ff9d2a080f99649dd","pathsSha256":"cd03a1cead110db70194a0415effc73529d8b4d1e71785055de336e283701a66","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9C00/9C67.svg","dictionarySha256":"200ed416d8565bfef63d7e4361fa8ad780bbd16b03568147063a405879515484","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]},
  {"glyph":"彔","strokes":8,"corpus":"Ja","originalMediansSha256":"d6e421552b08039b39c4a98b1e4dd2bb11721676aa2d9989f3ac7bbfb509bd01","pathsSha256":"4d64f82b81b4814da8714ae2f045a090a348845973fac031eb75f14e464858a7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F54.svg","dictionarySha256":"4b44106a9cdc4623a431854efa1a5e68a782738beb751e7311f6bbe464da0434","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"耒","strokes":6,"corpus":"Ja","originalMediansSha256":"66bc7c864bcbf6fb9138d13423e61c740710362b6085bf80ad977c1ed0df8983","pathsSha256":"e38a02e96b98ed3711186fae3a452fffa2524184a3485114a59659852a0f6bc0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/8012.svg","dictionarySha256":"dab251dced9b53658ae3e9a94fe403f4be68017df5b8353e07967e78762f5870","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"罍","strokes":21,"corpus":"Ja","originalMediansSha256":"22af1a236e611dc322c37f1e211e3f343be9a91f635095113493e0099d75406c","pathsSha256":"833acc7d7232822a3236ac608f67bfb1d7b4abd0527254c37deb15e54fdf5cff","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F4D.svg","dictionarySha256":"905609b9d3afde20c85fd457f55ea6000e883ff6352975a1bfa8d00276884265","sourceStrokeIndices":[1,2,4,3,5,6,7,9,8,10,11,12,14,13,15,16,17,18,19,20,21]},
  {"glyph":"繚","strokes":18,"corpus":"Ja","originalMediansSha256":"334933d56fce9e05591926ecd7f5566b71f09311c4ed03869d52697f10ba9e25","pathsSha256":"650c56f1793b5f11a2e40e53543a7151eef3a5fb4502f69332e75c123bd8f8e0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E5A.svg","dictionarySha256":"25a5e4cf596d389b4e3a64278d88590a0542d47c777054a4f0ae989370e695bf","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"潦","strokes":15,"corpus":"Ja","originalMediansSha256":"b6bc69672a572c335a52354681ec3a278bd4c43e838aa7758d14d5bb922daae5","pathsSha256":"ff54687164f1c8b03b9158f8b493716af13d3a2c0ebaae9dc19f4c2221a95536","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F66.svg","dictionarySha256":"98a69b2e279a8fff16b225075eb10672e3717aa6da745787c3b2e61088825cab","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"摟","strokes":14,"corpus":"MM","originalMediansSha256":"dd9a72d120b0757647d5cdf8f4501ac7961c34d4368227a25d1367bc7892b479","pathsSha256":"1ad764e1e2ed6268b7b25ee404dcb86f823400ed611130bc7638626ff9d9ecb5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/645F.svg","dictionarySha256":"1faf005d98a720ab567e5e1dd83a17274b2ae9f7ddfb42e118e18d84f1f2d47a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"纍","strokes":21,"corpus":"MM","originalMediansSha256":"23f6986ba14ffaf186760d6768aa4790f95dda4cb3b65a9767a60ca0b3077798","pathsSha256":"987a127ed31116e4d315d4f30b8edb395a368f9524563edc7c2a71795af67c1d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E8D.svg","dictionarySha256":"94a19942ecce20af2946202cee4d101a194a346ca0f7a2cc2657ae28165eee05","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"僇","strokes":13,"corpus":"Hans","originalMediansSha256":"17185bbf56142452484b90ae120d53be1e77943be19e79f7e5b8cf759b3656d7","pathsSha256":"6978c057c1b83d133c0bb0e0850f92a284686f2f4166627b4bf27022f338b8f9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/50C7.svg","dictionarySha256":"37a8d1d6e2571fcfd1a39a5a75d658eb130046e182c8c6d2d3164c453af83ba0","sourceStrokeIndices":[1,2,3,null,null,6,null,null,9,10,11,12,13]},
  {"glyph":"懍","strokes":16,"corpus":"Ja","originalMediansSha256":"6358f98a72a00808b42fe6905961ed30bec5fece6001fd44d8b851473678e580","pathsSha256":"a47c16910dc127ad612c8f7664de91cf4b99a37a6e37b3c6cdaa75e53d9662c8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61CD.svg","dictionarySha256":"db3367da2d91bfd4a8eda37b62d9fb8685c41e146b9d1b8e66eb78eec0a23985","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"廩","strokes":16,"corpus":"Ja","originalMediansSha256":"8b367094f02cbe50c1078a5bdc208e22b0df945020aad781e5030cc9897b4871","pathsSha256":"798dac4d189fac758d11cc343668bfa83596e69b03de83b91a1e9c3e1a8aa44c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5EE9.svg","dictionarySha256":"b769b6e512d0fd71ba796cf1d64d2cb92b18d93daea387778c21d3aa8c21837e","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"詈","strokes":12,"corpus":"Ja","originalMediansSha256":"0d895abf19a710900ae60b731e498169e04a2360d6281226fae53ac36e8ab5a1","pathsSha256":"2803cd990a704cc16e6dd367e32fb2b14c69f68c906c9aefe7276e25fa3c689a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A48.svg","dictionarySha256":"27cc3152da389bad1c0b3fbe13d747202c0d5367950c5dce14798a47018caf91","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"俐","strokes":9,"corpus":"Ja","originalMediansSha256":"97c0e9eb1508d2d3a18baac37bd61b9fdc383cae4dcb90da65afb8a17c55c0ac","pathsSha256":"7c40148e1b402851b7684d569553cda2e8cb98f397dbcefbc85844471da55072","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4FD0.svg","dictionarySha256":"22fe45d19a0eaf3f9f878a72f11ab74492361698dd433f9aa9e2e5d10c3e0ab4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"涖","strokes":10,"corpus":"MM","originalMediansSha256":"2284011dda3062723c363292222f585a129dc0b9fb80ac9c116167a1a5b583d4","pathsSha256":"ace404be883f5f161ce4a97a2992ee33df2d7e681227a0aed171ba2eb58abc89","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D96.svg","dictionarySha256":"2a3016ca7313d0fe6da50514b559917df916d16875feca2bdb9965ae5201b46e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"粼","strokes":14,"corpus":"MM","originalMediansSha256":"3bcffffea73f37df860d1b2dd68a80ff0a8c944b00c8c0fbbccae00819cf0daf","pathsSha256":"1e23cc3e4d3475aab4a530e4454247e40929ab533baa25b7ab5259a9265f6731","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CBC.svg","dictionarySha256":"3e975acb4e208b9e7ac9c82d3d5ec7a68d8d9049253cbb7bd3d1950581bea0fa","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"墁","strokes":14,"corpus":"MM","originalMediansSha256":"e902d96b9158cd5411f9144a143191079fb7ea09d10759a757f1031e858edde0","pathsSha256":"ac8a67ba37fbbe34afb136e290900a0586aa6c54bfcac0dfa720b86219300eb0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5881.svg","dictionarySha256":"8d50d8eec5b176395ccbf79e616e9ff5e7e79503198bda1576a73091a18f3266","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"秣","strokes":10,"corpus":"Ja","originalMediansSha256":"61ea02c19fd8499005d27f35a6f3e8c445b79d15cfc5a4e6c7da11586c816038","pathsSha256":"30dd936603c3799f32470435f4600d7b53fa1915eaf0a566a75a1fd24bdb8be1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/79E3.svg","dictionarySha256":"b6d1464cf7248038bc63d86a479969e62db37c32353987e69a870aa394012ad5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"脢","strokes":11,"corpus":"MM","originalMediansSha256":"bfdefc1a74fc35568cd9c6e5ad0e57b3430308c994399989631803979f5eb06a","pathsSha256":"6644f74bd611f944e8b70155f5b58b525d035c28645de2103c1bfed4b6c99a5b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/8122.svg","dictionarySha256":"0ed53dd1115e41106e6fc45fe03016135dba7a7351854033d099c738256eb906","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,11,10]},
  {"glyph":"霾","strokes":22,"corpus":"Ja","originalMediansSha256":"b585328ff2d5978c1a6ebe45b72b7ab1cd33ebe8e6611a89ef07bf6d0d570271","pathsSha256":"23051464fd5e2f5b7f3527faa97a3553f9343ad004d899111284ec0aa93334d9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/973E.svg","dictionarySha256":"8485bb87a5672e8945645e823a85d20525d1bb4491487114b8ed86a3bc5d27fa","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,20,22]},
  {"glyph":"浼","strokes":10,"corpus":"MM","originalMediansSha256":"f7e6021b216ef374a4bd59b325193e1c5c83be279640e83a19bf4949c2c9db21","pathsSha256":"f61be98d500addd2870aa870f9305e2f6b72ee14d89de0956364dc35f67b8173","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D7C.svg","dictionarySha256":"cce1972adf3f024d94b26d83f8abcbb909f4c4fbe22739cb9b641a5db8abeb9b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"貉","strokes":13,"corpus":"Ja","originalMediansSha256":"60136282acbae83b562545dd53a2a9aa755542cfd1bed9f89ffcb76bd0c26e2c","pathsSha256":"2e468acaa3fe6caf6304f53adac8e76ee2c42ce92ccdca850ff4b8addfdeb9c7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C89.svg","dictionarySha256":"408af73257486eac8baeda5a37dc75d016f981356bf1660340d0d4451ffa49f8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"霢","strokes":18,"corpus":"MM","originalMediansSha256":"05d5c9a5fe002b9f5e0f552b81272f25b764ba2b85d5e25b0465ce747122b8f0","pathsSha256":"a8ad4a898b087125b6cc1043d88e4e9a826ea3a9b91fe540e5777a105f534446","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/9722.svg","dictionarySha256":"523549fc2c3ad943427f975263cb9d46655846eacd6d580c191bbce850693b9a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"湎","strokes":12,"corpus":"Ja","originalMediansSha256":"fa0e1c8d6c629a457c5b2a66c9985b836626fd9e3aa691eee755601315cb7ac6","pathsSha256":"2db0c05eb435247b33ae3ccd1d151ea8232bb77edbbf02744a8b7644c2e6502b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6E4E.svg","dictionarySha256":"69f0f37b1966c41540f8eb613707c01957d5929157b123786fab8ed63bc97658","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"篾","strokes":17,"corpus":"MM","originalMediansSha256":"1dfd484afff7280bdb83403f07d624882d0ac04a6ec82cd4119b35b1801c4e27","pathsSha256":"036a4554731eeeef1e940af48583f1a17751bfab9e1454b729f670bb2a9d97ab","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7BFE.svg","dictionarySha256":"c99b9442653149956101a6827edd0015717536a6b6d7f5719a81ec1f9731d9fd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,13,12,14,15,16,17]},
  {"glyph":"眊","strokes":9,"corpus":"Hans","originalMediansSha256":"6d4dc86b5543ad0614d74153fecf9e7485435405cd244fb9ec4d7481412c3ff0","pathsSha256":"c0e99fb72e8d237ab80d62cd2270446154ca1ca95258e13ac0e239476d68892e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/770A.svg","dictionarySha256":"cca5624521583eadce4ab5ef30066857853468f92e426baadb8ca1a1aeb9f5a5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"旄","strokes":10,"corpus":"Ja","originalMediansSha256":"0f82bca298c6fb62d20d87ae02f3ffa651df746df6d799c63728084dddd00aa9","pathsSha256":"540605a2d291d065979d8585182b0fa794b3960e736e0a230e39ea4017a420af","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65C4.svg","dictionarySha256":"8fd0497b0c10dc7a677b1e1b236562e2d5892424fab42dde49c41183a039596f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
]
export const SPECIAL_BATCH4_DICTIONARY_REVIEW_SHA256 = 'f99b5205dfa9f9711a1d7bd4082cacd48e5011379cc4a695bc8bab3debf74bf8'
export const SPECIAL_BATCH4_DICTIONARY_DIRECTION_SHA256 = 'a49b8462c2c0fcb5fdd6c9cff3cac63b81736388ba1c16b48e53da020c40d098'
const referencesByGlyph = new Map(SPECIAL_BATCH4_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch4DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch4DictionaryMetadata(ref: SpecialBatch4DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH4_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch4-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH4_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH4_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH4_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch4DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH4_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH4_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch4DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch4 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH4_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH4_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH4_DICTIONARY_REFERENCES.length) throw Error('Special batch4 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch4 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH4_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch4DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch4 dictionary entry mismatch')
    return { ...specialBatch4DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH4_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES = loadSpecialBatch4DictionaryBundle(reviewed)
