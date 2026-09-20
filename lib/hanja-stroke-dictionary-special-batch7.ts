/** Fifty special grade forms (batch 7) individually reviewed: eight reordered and five locally corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch7.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH7_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 7: 50 characters individually checked, 50 approved and 0 held; 13 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH7_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch7DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH7_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH7_DICTIONARY_REFERENCES: readonly SpecialBatch7DictionaryReference[] = [
  {"glyph":"挈","strokes":10,"corpus":"MM","originalMediansSha256":"bf4fbc8380a8da629a994e16ce687dc9e5f8859616073dbe0d9fccb0eb19257a","pathsSha256":"e009d1fca2f1a882ad11b017897ab51a22ca6bc0bd94bbe9e2d5b0b22d2c8a31","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/6308.svg","dictionarySha256":"7135219d9fb1e2717a3cf74fddf5b4ff3012fcdc97e0924b96e5c2feb27d0c32","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"絏","strokes":12,"corpus":"Ja","originalMediansSha256":"3bc4b01e1b5be7a3b45745644ac0a67e885183c4b384353c92d2b44492f37440","pathsSha256":"6e8fa9dd8fd0d36492d36c716442a178c4385f6d8c04c91c6dc1b647d4eb6d4b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D4F.svg","dictionarySha256":"28dd13150078d33e93b49cbc3c7439256fbffcedd3a324762bd3fead61e54b0e","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12]},
  {"glyph":"愬","strokes":14,"corpus":"Ja","originalMediansSha256":"df5a02b47f98db830c51e70f5730e44f14e21ce937a23dd0e2e89ecda793ee1c","pathsSha256":"2b78a298990fde4f9061c5c86297beebfbf9a183d4afd5b0acb92a83cea53136","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/612C.svg","dictionarySha256":"5a18ce8d8882b4e1b6e2a59804af3b108b8f34fcf2b2dea82d5dc0bfeb789e10","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"艘","strokes":16,"corpus":"Ja","originalMediansSha256":"e8bc8805683eed20eb3c1ffc51873f09c6928f87c20983d7efd1707103532bea","pathsSha256":"c2675e7083ebe07bc0ae49b26eaef46b3b9433529865b8e101a4f77a8666b877","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/8258.svg","dictionarySha256":"95eae497936048a32437d0aae307b07d9dfc98d928b573080fe7ef62638528cd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"蛸","strokes":13,"corpus":"Ja","originalMediansSha256":"c6019e5759ab1311851f227321d63e5fd43f7a77f9f676a20e235404470ed23c","pathsSha256":"cbdf086b701113bc55c8448619dae48039e33a50f767c15adc311957b3fbba26","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/86F8.svg","dictionarySha256":"3b9975579634956402639b6870da0ebf8acfa6517b8f744cb0c000d3a776c76a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"埽","strokes":11,"corpus":"MM","originalMediansSha256":"03baaea850eed8f89d7a022abe3ee2063f88440cf8bf3e80ceccbed278f4d804","pathsSha256":"76bd15941fec3e9c37c8f77360b955f3164a441c6ae63fd98ae18ed616c7eb0f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/57FD.svg","dictionarySha256":"4d9726c55e374d0a1a373cddded30de96ec25d0747067c2a6ae1ad0d3cd3548b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"蠨","strokes":23,"corpus":"MM","originalMediansSha256":"05c843a41cd285cf8bd2c468e1bc3beb927bc5484fb08e00c5d58cbfcf71408f","pathsSha256":"9f95585b8d61eccaa29c17e889c580c808df4a198570742ec8883298d363de6b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/8828.svg","dictionarySha256":"cc42a60a38c463deacccbc2641ab045de262b35a64fc5dcf5e64a2ed3354047c","sourceStrokeIndices":[1,2,3,4,5,6,8,7,10,9,11,12,13,15,17,18,20,21,19,23,22,16,14]},
  {"glyph":"霄","strokes":15,"corpus":"Ja","originalMediansSha256":"6aa47440f61e4ccdfa9a36e4f3c3ff1bd58e174a2160237af249a063db8059dd","pathsSha256":"b12612d22c21beaaa6e41ca9a31a7c6ae8e1867f4e997c414090dfae5c252bef","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/9704.svg","dictionarySha256":"9e7adb93ca88979c6e862eaf0b50c229e9094ca21b9673edb6d7d04cdffba90a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"愫","strokes":13,"corpus":"MM","originalMediansSha256":"627ced8439bbc8100c15775cf5a364d80ebd6e69595c61fb1b5ca376a7dee98c","pathsSha256":"578f8b5f8e998a6d7fbd5d4849614ecfe03d424963b35a70f3c907d5b1d7a9fe","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/612B.svg","dictionarySha256":"da8ddfa79cd8a596f473c6db883f92cfa7401de9ac1bb8fdd4ba43c4d6c62644","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"觫","strokes":14,"corpus":"MM","originalMediansSha256":"047e44c5af307e99a4f65c7474f0d39bee50236db5d8311de11e36c1331b4505","pathsSha256":"c5eb536549d7a40502fd9a6cf0bf124158fe2d9edfadc41265b5fde76841631b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/89EB.svg","dictionarySha256":"f4f4eb07cce5ce9b4507903ad7f24c7b7da1dbef6917437a889905059f5a2c5f","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13,14]},
  {"glyph":"飧","strokes":12,"corpus":"MM","originalMediansSha256":"4bc8865563c1cb2208d7b367a165d77e0867feb9bd566bff88e2de232b285bd0","pathsSha256":"af8e84ecb1d726b269e587e7b8344317b9f65c21b85a6bcc2489674736c4aa34","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/98E7.svg","dictionarySha256":"3692d1754dbb04fe16c878fd63cffcee5e4a4e634803998e74dd34ef8bd78370","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"蟀","strokes":17,"corpus":"Ja","originalMediansSha256":"1cc11731567d50881a01d299882b1cc93b007a58e5329145a690bb984931ab05","pathsSha256":"2353bfb66f1d65fe26d72506328fd6ea0b0ce28057bbd89121157977f3b6c156","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/87C0.svg","dictionarySha256":"9aca57d75283d719d55d49ec279eb9cf9a5510e47dc088d0880c753127c9bfc9","sourceStrokeIndices":[1,2,3,4,5,6,null,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"竦","strokes":12,"corpus":"Ja","originalMediansSha256":"5f1dd1bbc35b7dd3cfcdecf2d96d8898c9213a8ecfcdedb97c76ae7284c12db8","pathsSha256":"3b32556e6aea8a2ca51c435fbeb6248deaf26034e97847400c7fc7153a414a1c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7AE6.svg","dictionarySha256":"b23a5692caff93dbdad9d47bbe9c3a0ca220b4011c1a76a91deba7ed73f48ee8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"洒","strokes":9,"corpus":"Ja","originalMediansSha256":"e646b85862f526439ce2aa8fd4aedffc5f623e2f22b18672130a6f0aeea6e8da","pathsSha256":"884455d4267f268a9da03cf0fdfdf0cb5bd423d60314ab2eac707257ec2f029d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D12.svg","dictionarySha256":"c0c7b91f3ad157aa6db96d02fadebce8653d5bf644e53bf914439f035104f066","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"瑣","strokes":14,"corpus":"Ja","originalMediansSha256":"ab2ae3df7ff2b98a441f1b30c855d2fe01a48619b7e880f2020ddfd4426a3b5e","pathsSha256":"a2806209262d1856606aed06f6ec06824f08d7c9531447b43bfcaa1f10b87e91","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7463.svg","dictionarySha256":"bc4ae0d5b07ce7b31af34fd557a4a7b4147d9ce7005a25ad5285bf0e6e06b6a4","sourceStrokeIndices":[1,3,2,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"售","strokes":11,"corpus":"Hans","originalMediansSha256":"cd31acd549f47c7237f939b741a97b9b7274e42e34ae3e81d238a4a4527bdf77","pathsSha256":"3f69682db0639be35c8fc5e88290e4dcb97e23fac371c0d05689e6ef546e1100","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/552E.svg","dictionarySha256":"2e2841c1deb559d51499ffb771b9dbc15eda1a7da87bc6b381532011a9137aba","sourceStrokeIndices":[1,2,null,4,5,6,7,8,9,10,11]},
  {"glyph":"殳","strokes":4,"corpus":"Ja","originalMediansSha256":"e0297eca9c0619bfe5d5aec9033508ce11098631103c19dc985fd09124dbde63","pathsSha256":"f9219478c18caadd853e4c5f74ffe32ca2388831344d96dbb37f314deee66d55","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6BB3.svg","dictionarySha256":"ba71ca35f69976f48bca5ad5e9ddb72223b212749dbc523dbc35e9ef4b639730","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"濉","strokes":16,"corpus":"MM","originalMediansSha256":"4a6534c21e608f72b54ec4fbf4e41b7cc8afcc94847a93bc743d31ae3705a276","pathsSha256":"a9c315cd8212f09f2967e0c38d14ee5f1b7fe05313c6eb46074e06c3637d29a6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6FC9.svg","dictionarySha256":"329334ea952c9be536a30c5834ac645152160929bf62a2357657c8652010a166","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,null,12,13,14,15,16]},
  {"glyph":"豎","strokes":15,"corpus":"MM","originalMediansSha256":"f4673a5af77d6f5ab61e325e29c38e655ef8fd4121434b57020648cc12418fed","pathsSha256":"1bcaaf65f384a845092f68e98221b3be5d1c9fb69f35ab31b202f0d04455cc44","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C4E.svg","dictionarySha256":"d061ea642e638d445dfdee55c20215ddab1426c9acd6108fb4232e15633b166b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"繻","strokes":20,"corpus":"Ja","originalMediansSha256":"bb432882b4c10430fef7c18f91ee1374def44771ffe14405313346a40dafd65a","pathsSha256":"d05281885495ff25436096fa92b4bdccd812089788693d295f13767c846e0738","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E7B.svg","dictionarySha256":"b9d16c19a107dbabbdc2b53b3c38d6547b004d380a1c1a38fc8e1a5706602d38","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"俶","strokes":10,"corpus":"Ja","originalMediansSha256":"80f103355ad554ab02ae19111b435d259344636d92793a4b2f0d95de4ff36e91","pathsSha256":"63ab0117fa171e43abffc27c3d4ff778f359cd425fd0ab1f803bd80e0673d8cc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4FF6.svg","dictionarySha256":"c7e15ea1c8f99f8f42138adf5b4e0a79d3e61f4616b22fa713d1ba30a29e7293","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"肫","strokes":8,"corpus":"MM","originalMediansSha256":"bb077163f52c10fb7d881cf14db92d9cf1865887fd3c69ec8545d5330ce46e59","pathsSha256":"2ebb673f2d64a00c160590b7f60177564809ee67125e9de5c9432f6768300668","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/80AB.svg","dictionarySha256":"fbc86445f8d11f1ede747c22e4ff5dda861c13502f5726b8a52331887044c2f2","sourceStrokeIndices":[1,2,3,4,null,6,7,8]},
  {"glyph":"鶉","strokes":19,"corpus":"MM","originalMediansSha256":"e107ea06498a6c7b570308c46c132c4765aaa9fd0b149ec0b3e8a229e4373a0d","pathsSha256":"36c895da5fab421c1cc53f7c1c8a6f4bfc61bddc08db11a4bed60c9e8390669f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9D89.svg","dictionarySha256":"3deb0f140839b22a3c8748817bf42e890a51cc29187b2d78c7f4151662727179","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"熠","strokes":15,"corpus":"MM","originalMediansSha256":"ac51361d128581352ae30c0db3e62beb7fe67c741c2a71f61f064e71c571f5ce","pathsSha256":"ce0e435535905f02761fa59a820a12725910ba6a297c3d4fb2db9c7a0d7ab71e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/71A0.svg","dictionarySha256":"fe2fa17aa9009c2f86a780316eef42ccd2d1410e310689d228bd2af7bf91981a","sourceStrokeIndices":[1,2,3,4,5,null,null,8,null,null,11,12,13,14,15]},
  {"glyph":"塒","strokes":13,"corpus":"Ja","originalMediansSha256":"0aba86788e9e92274a226dea531f2e967f4e57d5ed0cbb48808c6c5c02466ec3","pathsSha256":"d92e881cf50d1a750ba20a490f51ce627d41ede4a0f09732044509ed4816e3db","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5852.svg","dictionarySha256":"d6af440fbe6d861df248ef26cf11f1473486c747209ca4368b312720fd05cd58","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"啻","strokes":12,"corpus":"Ja","originalMediansSha256":"894cf682abd4e15246f0e222951f021becffa2593578d15607a836cfa1596109","pathsSha256":"b014613f72f59f3c95a8a3c8da9f4ee749f95de6a90a3ea00571b2e308df1fdf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/557B.svg","dictionarySha256":"912b2a0820c7574690984358d5f602f5197537dfcea4958449fe75079e02f5b9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"偲","strokes":11,"corpus":"Hans","originalMediansSha256":"453f8e800213192cf14e3e28f03bd18ee509a3a2a6133b264709ae745e3fc08b","pathsSha256":"04bdd7cc2ed0456efffc29e0b8098bf30ae3f2354b2841cea0d80c87efeb0c64","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5072.svg","dictionarySha256":"ce8949098b68871b3b301d7116c4331c642da4daed37c14fbc848e64949cfb3e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"贐","strokes":21,"corpus":"Ja","originalMediansSha256":"4590ade543b5947bac77c32f4043e134d4ded007080689ed37d61c4b23ead9b5","pathsSha256":"fd01f1d7767c0692de264913a4de61b6b47e7a00d01e8673c3001b407a6befdb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8D10.svg","dictionarySha256":"086d329d82167c61aadda44f737cc1b3da38507e144d4441fb90eea78c419870","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,12,11,13,14,15,16,17,18,19,20,21]},
  {"glyph":"矧","strokes":9,"corpus":"Ja","originalMediansSha256":"4091fde2e6f17806990a9f7e4cf5acf2135561e14b586c72500bdde60bc7e90c","pathsSha256":"a3e049cd0c4910c9bd553716e421b64c269b1a19949eb1478bf7c2d065daa4a0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/77E7.svg","dictionarySha256":"7c26ea2fbdfd39c6c7697819b3703350972ddf4f063732991c43f87dd3bc3681","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"哂","strokes":9,"corpus":"Ja","originalMediansSha256":"83427f534378db4bfb8ecbdd46da1e169a3e1578701889fead5ff6a641029539","pathsSha256":"93457028dfcaba46dcb8629c2aeb07523c42a48c600e33d0917c585a82c1ce9b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/54C2.svg","dictionarySha256":"50d7aa75b471f53cb5724398946feaa1dc18cc6b2f29b0c58ca7fb2b3eec1ea5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"蟋","strokes":17,"corpus":"Ja","originalMediansSha256":"01b79f87ca523bb7d31b887ce47ce4aab81795b0577877978ad0b7ba7e1ab25f","pathsSha256":"13adc93a2cfe765e567274dfb81bbbf777dcf8e335ba525624ee440423dcfcc2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/87CB.svg","dictionarySha256":"41287f9fc5664720cced376aa6edd3678cdd224202a935683545a2bd4829f9ed","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"咢","strokes":9,"corpus":"Ja","originalMediansSha256":"9d93f10cdb7ab81873cac3d9de07c4e93485cd5d1a12a7315aee5433dadaab14","pathsSha256":"afd64d712e61993c9e858edae5a862d9011aad6ceae185ef8e7d0fc270e9d943","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/54A2.svg","dictionarySha256":"98dc37f66ef0497fcc3a27c46f860f88266cba1595bcb62b13840a3132c182f7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"鴈","strokes":15,"corpus":"MM","originalMediansSha256":"1c0182bb42bae5129e5a8aa2410ded072eb0acb9cb035d6b52c74af0f581e731","pathsSha256":"7a79ebf5b09c7f6d275c1cbeefc096bdd460da7fda694d81cc767c0bdf0063c2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9D08.svg","dictionarySha256":"c8e5edbfecdba2cbb9c6644563f545e889e2ae327099a2754029ec304f939855","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"犴","strokes":6,"corpus":"MM","originalMediansSha256":"1df7b05977e3c6494543bd117a69b5d05c14aa1d1208fc592e594ebe2840a36a","pathsSha256":"37e7d118fafb846645bfa6f9ed5398e8a61ced6c14062b2eac2a6f7f459e1489","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/72B4.svg","dictionarySha256":"0757494395cca3f82c8e0400942b0a37fd75ceee48dc41030fa7aa72d6ae0aef","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"訐","strokes":10,"corpus":"Ja","originalMediansSha256":"6473155dd62c19cbee24584cdd39b43cd07a4382be4eb6490cdbe120bd8a33bd","pathsSha256":"e3740f6022c61b6c2a3e1132be0f62591a4784dc4bf14c6faf40be820f828202","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A10.svg","dictionarySha256":"2deaf5412bdd6378b3f71636a29e880d16d046fc6474e13c037432deffccf8c0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"遏","strokes":13,"corpus":"Ja","originalMediansSha256":"877b6dfef61cad7526ee2484f697ab2de51aacc0a38cb6c6477ef1d3688b67e5","pathsSha256":"7d37805b2475e0425d379003cf1a0c9059d33c593dbb6e5e2889444be0fa9157","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/904F.svg","dictionarySha256":"e2c1e21beca2314c012693d3d89da20158026cc867603050123ea92b04003dfa","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"歹","strokes":4,"corpus":"Ja","originalMediansSha256":"f8c0dd0df908559ae1194063c99ab1fdfa9d410b0a708477b73a286b81b6cb42","pathsSha256":"4e0bbbcaef04684a275b4ca068a3657feaa670da3c155012d821de34b706383a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B79.svg","dictionarySha256":"6b144bd2b04240ff9c0b12cd90719d0e00d9d9979a6208ab52693987f4f72083","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"戛","strokes":11,"corpus":"Ja","originalMediansSha256":"adfe4696ec79d1dc41a89df1c7d3d7526c2127cc7601768cdd6359caa290dc55","pathsSha256":"61478ca3f9bd8be65b9d17cb145be30a82f6c2dc567c0bdca02286790586770e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/621B.svg","dictionarySha256":"706431ada734273550d3a0757e8ec297af788881c2248cc3227708d98df1a8bb","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"揠","strokes":12,"corpus":"MM","originalMediansSha256":"9093d96f0f4f21c1b5920651ee02f01aecd6b93c356811ac1ec1cc3f0baeeb56","pathsSha256":"04bae7d572945b20d40fbe6ddc62a3140efdb09211e4ea0ec320eb3fe8ba3fb9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/63E0.svg","dictionarySha256":"c73da89fb6c880a28036cfef9ece6c23dcdc19e9c1907b05ee9453eeb37e1fd7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"黯","strokes":21,"corpus":"Ja","originalMediansSha256":"f72a754ad905c2876149dcb4ae4a07a5f44bf31b70490c1192729cde368e0fd0","pathsSha256":"df5f5e1ebdcd35c4c5ae08bba5ebc57f2de38c41e25081f341db35de4aafc97e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9EEF.svg","dictionarySha256":"ad287f8bb874216297ffab8876bf2b1b94a2bc91d4547147b835ea5bd42ac33b","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"泱","strokes":8,"corpus":"Ja","originalMediansSha256":"a4edb39dfc66679fc7d03193b3083b3aa94bc23e036432a6be575a36fab07694","pathsSha256":"230d1c8265d0bf61765ac9f034845cd1690c481c7cd6d4663e75b72aabf474b9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6CF1.svg","dictionarySha256":"a595426192e0b51553fcf65b4431bc6b48112049bcb3fe1cda6a79d7322fe65d","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"盎","strokes":10,"corpus":"MM","originalMediansSha256":"6142823b424705ea384d4fd528de66ee2d109de976cba2e5420f5865e77d610b","pathsSha256":"cceb1b49f68b42e487772d4dabda7889924556232e0fb9c2ee9b10b60f9c94fb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/76CE.svg","dictionarySha256":"5e7d81dcbc77252b201a9bd6558309357764c1105192ed315c2845de692899fd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"鞅","strokes":14,"corpus":"Ja","originalMediansSha256":"9752bcb4721a1a72181d191156b36374b45ae235326fd2a6ecaf324126d6cc43","pathsSha256":"ee4439c65e0f8610312a9165ad83c565acfa040a937ebbd57e1474611941bd0a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/9785.svg","dictionarySha256":"01d523ada74b215cf05322e8b60b74cee7d7f51ccf8cf658e38621e08d23d9ac","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"卬","strokes":4,"corpus":"Ja","originalMediansSha256":"f9e390ee4d03289c65a207f5dd19cd00da0bbebc2cd705ed00a9409c9c03bcd1","pathsSha256":"a973612d0bd3e1e2797183cacc927196bc5187d07cfe38864b4be198f772f7b0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/536C.svg","dictionarySha256":"5541cb554b4c37e7d8ff0509bcd417574bd41ab8336523dfa66d3a7199005ecd","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"藹","strokes":20,"corpus":"MM","originalMediansSha256":"f368eeb4c464b9899fe99fe89aaaba95b0e24ea05cd820feca638de3bfdd3168","pathsSha256":"cd6e0ac2b6ffa8ccc93cd48e13bf9e6cc34e9fc145066a5bcdf58ba18a961c3a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85F9.svg","dictionarySha256":"0fa1e097dedf393a31a77860bc0519cde7b6edb74607c3ab7061e87ad06d74a8","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"嚶","strokes":20,"corpus":"Ja","originalMediansSha256":"ac0c7b88209fb49680bb67134fe6865c62bda4194b4318c8e6f7cad1a49eb91c","pathsSha256":"2b01544f3248f05ca1028d9f6675425e910694ef31e3f516715b97580b807044","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/56B6.svg","dictionarySha256":"15c946efad9dc93fc2e02d6300c030da60e9c836b5316860f209f72a04338253","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"瀹","strokes":20,"corpus":"MM","originalMediansSha256":"34f5c114a99e982dbdbaa5da97a856b83bae9578239db42d3dc693a12ca3867e","pathsSha256":"0af9d7b3bbbb66ed0afb76790501fa5631dfbe5e21df8d628fadb5820ba49578","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7039.svg","dictionarySha256":"aca8cf8464de3b87e78d2cc764c495376e44a63847425a1a8cc13c1b105b6789","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"籥","strokes":23,"corpus":"Ja","originalMediansSha256":"56c00be3021912145fd3e13c2510576a0f6c475ed97b33351d2c46fce34e9595","pathsSha256":"301dc10a77fd30929dc2099275a0fffcd81484938099afd276dc25442257a80b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C65.svg","dictionarySha256":"9ef8a6a318600adad503c28255c0779c45ff51922f3a944448b8feff69da43e9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},
  {"glyph":"昜","strokes":9,"corpus":"Ja","originalMediansSha256":"537d6edc1b8482df9c2590a7facf7a2430df3ed57e42cd356d28995406096f82","pathsSha256":"72f3a100a42796daf47b8708dbc367be448135ccad99f852655c4c24b731f823","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/661C.svg","dictionarySha256":"37cd7eaca7c15268cdf5ba22ea4ce184647ac3a2d71a19482de34000c644cd06","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"漾","strokes":14,"corpus":"MM","originalMediansSha256":"efecebc5075a67f6875d51b21f890e53aee708aab1158755b08b21557a96cd9d","pathsSha256":"61e962400e110d39ebfd9a3236e01a247680c6385e07e6dbff00d14ef8c9ee98","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F3E.svg","dictionarySha256":"14f5c8b895b9376a552b7e949ab6667a6ea9befdf9f7a771529cc029dab22e9b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
]
export const SPECIAL_BATCH7_DICTIONARY_REVIEW_SHA256 = 'a7e46dac243b6f27e9e73e5463cb62f4af4f0362b8663e2e5b26d8645736ac89'
export const SPECIAL_BATCH7_DICTIONARY_DIRECTION_SHA256 = 'adb57d93ba6724eb23cfa3833b8adb661c4f66308a910007bc73d91731501e63'
const referencesByGlyph = new Map(SPECIAL_BATCH7_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch7DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch7DictionaryMetadata(ref: SpecialBatch7DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH7_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch7-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH7_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH7_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH7_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch7DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH7_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH7_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch7DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch7 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH7_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH7_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH7_DICTIONARY_REFERENCES.length) throw Error('Special batch7 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch7 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH7_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch7DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch7 dictionary entry mismatch')
    return { ...specialBatch7DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH7_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES = loadSpecialBatch7DictionaryBundle(reviewed)
