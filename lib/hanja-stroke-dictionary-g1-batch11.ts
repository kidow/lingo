/** Forty-eight grade 1 forms (batch 11) individually reviewed, including 10 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch11.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH11_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 48 approved and 2 held; 10 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH11_DICTIONARY_GEOMETRY = {
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
  }
} as const
export type G1Batch11DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH11_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH11_DICTIONARY_REFERENCES: readonly G1Batch11DictionaryReference[] = [
  {"glyph":"遜","strokes":14,"corpus":"Ja","originalMediansSha256":"68904ea3ba3b7411abdcacf1b71034a660cbfa356e569062b16eb9eef8e1c0f7","pathsSha256":"5d29dcb171d28340a526f90e4934dd922de7806987bee27639580426d043a790","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/905C.svg","dictionarySha256":"3ebe52814b6c5c9bf5b4244bd27755dbbb9d0f572152f7140903753999cd98fc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"悚","strokes":10,"corpus":"MM","originalMediansSha256":"07fa80be34bcea43458ed0388d0db811bba51fea60b574e5888598c60ab3ea2f","pathsSha256":"5fafa8236020bfce8170b0aee75d0ffc48ab89ac7c365de147a901c788593834","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/609A.svg","dictionarySha256":"1a7b9be31f1b8a692534d514f47ce709a52dd0e194bb5a72b8dff3a8f9b83442","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"碎","strokes":13,"corpus":"MM","originalMediansSha256":"b0b368b02a3e88330415aa727ba5cf527c7da93ce184251cea8ebcedb279c3b9","pathsSha256":"6608c94626012d1a53b9c3307b038ac31104e363d69f3a040786d7c35fbe2655","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/788E.svg","dictionarySha256":"631b12f075c4dd41baecf238175adf495d665c1a71923620a3cbd8a3ba4cedce","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"灑","strokes":22,"corpus":"MM","originalMediansSha256":"799b43d3d284e1d731139230e84fc6254d6c60f3dfc661e2bf0ae367cf5d4bba","pathsSha256":"cec8f9655cf58c5edf27d9a42f69fedf0e8d1ebb2e4c5a61dfd5de71e26f6d82","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7051.svg","dictionarySha256":"bfcaa8341df6ec800d57bc6dfdd62f18aee7a3e278961a6453f28c8017c66bf4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]},
  {"glyph":"蒐","strokes":14,"corpus":"MM","originalMediansSha256":"b15e1206f3b30f085e1b47446c8827c511240672b32a440c2d9d87863d969738","pathsSha256":"a82d3e78ccbde312cb69ae7588ec6d98e0d072e00f6bb2df12cdf9e6479ee653","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8400/8490.svg","dictionarySha256":"f76d9d1601aefacfa42d43d5146a53ab6ce4169e934aa3c80771ad0af5867488","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"戍","strokes":6,"corpus":"MM","originalMediansSha256":"48428965ca46882fae3ee505d4e841c5a3784845f35245908288957b5e0528e7","pathsSha256":"0c6066435e66c2d8ba56fcfab3684d6144ee18e0cc4106f8458d744564af0612","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/620D.svg","dictionarySha256":"1d5029b019adab76a82b6e0761cf5ceeb3ab14e3d6b9abfac6abf03d86b15da7","sourceStrokeIndices":[2,1,3,4,5,6]},
  {"glyph":"酬","strokes":13,"corpus":"MM","originalMediansSha256":"c849b5ca6fe4b69081c61320453af4c0018c7562cf01885cfb01d5d8c6fa2377","pathsSha256":"36fff4be95d53f055feb955b96fe65019b1b4d64cce3597946e9a302a9e488bb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/916C.svg","dictionarySha256":"929b640144b8d709e0bfc3f1b6b77cab75857b1ebcd1fd6fdc1bcc52fac4f8d4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"袖","strokes":10,"corpus":"MM","originalMediansSha256":"0eb839cc52925d3d1843382d083c5c2ce0ec42b37e173121db594e686325b804","pathsSha256":"b4d4324eba838f54a3f73b414f26ca153da1e0230a3516fe238238ccd91a3822","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/8896.svg","dictionarySha256":"df85c0fb76917b29fb1ae9c04bd53e2bf94f285d065e3310e4af390c0f85cb83","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"羞","strokes":11,"corpus":"Ja","originalMediansSha256":"7934c45abc53c47fa5f140116450d94c0cfeb4e2479925a84b026865c4037904","pathsSha256":"ec7120897b41a9a32f2cbc8ac2561eaa34dcc3dc861500a3117f6b2a5867aefe","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F9E.svg","dictionarySha256":"30a798e1fc3db37ebb86338360f0d103c39c32b05410e96ca9be97fe08342d47","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11]},
  {"glyph":"狩","strokes":9,"corpus":"MM","originalMediansSha256":"6249b6cdf645b254a730b1885348e233db39a2162d0f39b9a6d7403a5e121dbe","pathsSha256":"aa2dbfbd1abed47218a3e2228638c86158fef411e5b2a4cee3663fff5eb50ee5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/72E9.svg","dictionarySha256":"efb3d29f8202b60b163fe291327cf63389f9e26fa8e79e275322335f3a6ded87","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"繡","strokes":19,"corpus":"MM","originalMediansSha256":"371628fb5bdd84b2e7ba94bd8021a83cd54fec2d34e72cfbb179eceef168cd60","pathsSha256":"6c61cebfa4924a0e69c3a47edea1fa0426401fd0a6a11599c4a0f8cff6537afa","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E61.svg","dictionarySha256":"adb9aed94c5467cac172ba2c96795f21913cc51007e99060c31c966163f27525","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,11,13,14,16,17,15,19,18,12,10]},
  {"glyph":"粹","strokes":14,"corpus":"MM","originalMediansSha256":"840ccdd57d3e1fe993b0d2aeae03675ffbc702c266ba876f9a86b09a1908e35a","pathsSha256":"a139d23bea49e559e69c7602f697e755201f4cb0e29ea6d1685d694e5030c989","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CB9.svg","dictionarySha256":"31ed80d86a501c483cd454e9ede40f82d3cc5d77ed8f4a8174bfab6eff41cb6c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"穗","strokes":17,"corpus":"MM","originalMediansSha256":"7cff6cde7607083bdf9c28d67e5d9a8260d7ed81fe0a3ae1105996248e179e43","pathsSha256":"3fa59ccefdaf0d640699a2b3e83c56b7e35b0c7d7e9f960bd5edcf5b07258db0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A57.svg","dictionarySha256":"09fbbb14ef729313fc6c373a7513232735919e404e75031fe719b63dee996fc8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"讎","strokes":23,"corpus":"Ja","originalMediansSha256":"e571602af2f7ea606c4c3631df629a1e6638ec10cad68c7c6ed1a8782d79e278","pathsSha256":"434d6a620352b532ae349473c58360d2ace01fc2368e468e18a0ff95adb70ef6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8B00/8B8E.svg","dictionarySha256":"330bbd5e3242f31ccb920c733198ec8a09518db05125e0108ca6e3754507114e","sourceStrokeIndices":[8,9,null,11,13,14,12,15,1,2,3,4,5,6,7,16,17,null,19,21,22,20,23]},
  {"glyph":"夙","strokes":6,"corpus":"MM","originalMediansSha256":"7187bc185412677237d987b8f936353febcdb1ca22821f4bf83d1d6974deb162","pathsSha256":"745b04afde1ce7723d76c9c797eba55e9a3bba9746a38dfd9ebcc54279a4777a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/5919.svg","dictionarySha256":"4554e6a1ef60438047571c6bf3c6c9ebb818b53cbbbc8cb6909516470008c541","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"塾","strokes":14,"corpus":"MM","originalMediansSha256":"0dacf1e4fead6f79385786e18e2a581cb9118c6b0dadf346458d243ab90314c2","pathsSha256":"f4c38141bed8731952eaf5b7795d284fce504b15c0be1bd6cbe888b0d5b01c93","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/587E.svg","dictionarySha256":"997e7564176854d421ca506833f5f0e524a24356a2e771c8fab34aa2dd95e365","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"醇","strokes":15,"corpus":"MM","originalMediansSha256":"ea204e9c4de683a5056836e1de1a0c07a1114bcedfd4a8122529d7eb132a0880","pathsSha256":"b2773ae107d89812db55c2e88a76aaa528c37aa96d60c430134439526f7caf32","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/9187.svg","dictionarySha256":"19ad81f7f87350d98b54eb343a2cc722b21b405fe25c5b7d0e4bbb5f46146fa9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"筍","strokes":12,"corpus":"MM","originalMediansSha256":"f98383ca907263a6ac6dd3b5d23d289b7d984d4f70bcc85200ea27819af26389","pathsSha256":"693f7d005c05c597979f123069b557edab15a10ef17588fef0777de8fc120ca0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B4D.svg","dictionarySha256":"2934d5e8b3b5805cf12553567d9d05ba9bc998453cbd90f6dc9131297466b531","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"馴","strokes":13,"corpus":"MM","originalMediansSha256":"db025b53f48fb56a70a7545fb97ceda4eadfd5fa1ceb5b4ed60e46f27e21a110","pathsSha256":"9fd41a0d92f207749c661c88d47e28c7c0517485148cb512d5cc31263e9b099f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/99B4.svg","dictionarySha256":"be43eeac57913dac2ba870646f4c4756d4af307e3268f9d3c02a761b28a24c2b","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"膝","strokes":15,"corpus":"MM","originalMediansSha256":"d413b21c221ccbd6126ac862763a1f6061c2182d13f66b3edb7934cb90bd4aa4","pathsSha256":"4ed756e23f6c8e47ddd9f9c66284ad4e11e71fea4f0c58071cc3724596287cc9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/819D.svg","dictionarySha256":"e0db055c60c08cbf7aa265206583588a50b0db2a8eb5830dd0132811bad82cbe","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"丞","strokes":6,"corpus":"MM","originalMediansSha256":"2a7594adb909883bcaf439208ae8b9acee6612c9b236bf025657932575ef013d","pathsSha256":"e4f9a481eca383faf72aa4250e9d7cd53d173017a9ff0c0efa1d2eac81d6968b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4E1E.svg","dictionarySha256":"22ad1e186c2485f7b59a4f48127683a47dd00fcd38917712ba875c113d83b530","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"柿","strokes":9,"corpus":"MM","originalMediansSha256":"af0a50e7c88555ae166c9dec9dc93b55ae29ceee295ad93abd246b16becd6d0d","pathsSha256":"9567affeedc9d90118338a684297ed58358dd1505ba4bee297e9bf88800ec202","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/67FF.svg","dictionarySha256":"093715ae252aa24b16a5dc6133b625666d56f8d8410e648a1039e78d9b5c3055","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"匙","strokes":11,"corpus":"MM","originalMediansSha256":"7a1b5be8725566dc52aabe8e1e5e72a5774aef5228ce12a2a9a4a6a6ae6d248b","pathsSha256":"0020c99746116f7b8e9795483a92197b7261d463b1cb2061fd292a9e7ad6ef3b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/5319.svg","dictionarySha256":"5c2bdfdcbbb344743c38f161aa401cc51683027a9082c0d6a81a9ab4c5aa996b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"弑","strokes":12,"corpus":"MM","originalMediansSha256":"515d125757a8434c6e98fcdd64fe6be4fb493987f7469d40b3a64f4fe00f70ac","pathsSha256":"13bbe973ebd80fa9c8dbaa422f6ab6a4891ffaa0bddac626533ab643558aeeb7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F11.svg","dictionarySha256":"8aa88087e2646d7d7b79dcec612120ac66bdbc2be1ff28f9897698f97edf7fb0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"諡","strokes":16,"corpus":"MM","originalMediansSha256":"7c8fe9c8925a5d48841f5fc3c8b0aaee5e9f485242bfeabe0ed08030e8c9a715","pathsSha256":"9995ada63d99d1be42877000884b824d57f175f4b9d8db94e50ba463938bcf6e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8AE1.svg","dictionarySha256":"70557f4cc401d1e09e53c9c63840efdfaf650d7ac6d5ba0b54140073abe81fbb","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"豺","strokes":10,"corpus":"MM","originalMediansSha256":"32d519249277a0367565b28fa8ae0d66a9872ea62a4fc245318760a1521aec77","pathsSha256":"d1ea417567431f744e61138410d5b5b4442f5a40da1fb8c95322826a6c03676b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C7A.svg","dictionarySha256":"21a49f3f1c56de527cf8c6cf3dd0ca67b4d8cf8ba83a3a03b8bfdaa8e64c639c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"熄","strokes":14,"corpus":"MM","originalMediansSha256":"db2ab1b8733945c44c5ce182f61e2ea1c0e1f4f67d9264d687baca05fc6b0aba","pathsSha256":"a4c4af4c117d63f9a39838be1831f2ae6749b8500648ea76349999034a46dda6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/7184.svg","dictionarySha256":"df82a169d67fc987ff75f8bcbb934bb28c69bbfea51220781ba73bf866f1dec2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"蝕","strokes":15,"corpus":"Ja","originalMediansSha256":"cbe2ec1cc73fc88772d484ce9dbf5ecbd08fcb8e97ecf5b7fd62c2c6900abbbd","pathsSha256":"56ad743d6eb300b5744f1b12591fe0458af4747924b51e370fdc57b6a8bbf7ad","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/8755.svg","dictionarySha256":"b3ac746645af66e39955a4a823772e75b04a28d4ffb918b2ab29794515f0852f","sourceStrokeIndices":[1,2,3,5,6,7,4,8,9,10,11,12,13,14,15]},
  {"glyph":"拭","strokes":9,"corpus":"MM","originalMediansSha256":"c5dfc87ce92dc17c29e94a4fc76ff590af51a9bcdb87d173ff5c8f35545ac3e4","pathsSha256":"8c0699a7956d97554820ae2e87f582e2b94d1152c6c45e0f65dc9091ff796491","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/62ED.svg","dictionarySha256":"4987989119e33b7d54651de15edc95cdde58fd8ae86c2c68b3aa09df972bbaba","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"蜃","strokes":13,"corpus":"MM","originalMediansSha256":"2867e363ed56c70e56f3d63c9011c1836c232938b617d37060d3647209938577","pathsSha256":"e7532c1ec20332e848d32e33dfe4bcddfebb6a7509b6b9e45ffa61dc56306ff5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/8703.svg","dictionarySha256":"8b934eaadad0ad1e02bb6fbcc018068af5b4f103525f2c9cd214878785f56f85","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"燼","strokes":18,"corpus":"MM","originalMediansSha256":"252ede8924d88243080e67cd9f9da566d612107e5460484a16fc861fd5b640a5","pathsSha256":"1e29c73fc07792cd6145a22880ad75b63d33d2d76ba8a75c68cb21aaddc3d9cd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/71FC.svg","dictionarySha256":"714b2ec62a506051623d18823b4234b25e1f9f527f4e89c8e936c2ebad34c6c8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"宸","strokes":10,"corpus":"MM","originalMediansSha256":"6ec69320a8ca217fcb56a8b635ae6b29a18dd5efd66046ba34de394d30290ec8","pathsSha256":"759a1224069915a6e9fda00021cd60a83752bd803a16b36088584981aedb9b92","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5BB8.svg","dictionarySha256":"23d95a1c28415f65846277efb7a5320856891c4f8c1bd452ca51a99be4c07b64","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"娠","strokes":10,"corpus":"MM","originalMediansSha256":"1814ba1ed801e7b3316324d219d98be72a43b193a7d81e0ffe111de19132ef89","pathsSha256":"e9e9bf6c6cb5264925a5d0daf3b1c85b9802c434bd69618275c8f214f4e86c8f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5A00/5A20.svg","dictionarySha256":"a77bf9b5b9a1fd871ce3c9d7476fe662cf1a7a755e54b0e508fa3647ea5c995d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"呻","strokes":8,"corpus":"MM","originalMediansSha256":"b38649cc042f01001643056bbb4916434cd7200bb15899f52e19e7695cf6cbfa","pathsSha256":"ec85892f6f82fa64917ef0931cd901df28b7e02341abee32e075d08ca52d6deb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/547B.svg","dictionarySha256":"fa7ead2bcf2302ed8164504725b210280f721e3589b476fbf81920fdf6aec5c6","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"訊","strokes":10,"corpus":"MM","originalMediansSha256":"530e83a04277e25c42f9c61e1aeafefc47e70cf3e4d70fe5ff068f759534a0d1","pathsSha256":"11a07d78c46d32948b47fba06cacd3e8477b501d7280b364e38b68fd8aee1d65","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A0A.svg","dictionarySha256":"f62e8fc39a62e859f63d69841f417616595b02efd4fc5d510c065f1126d4a037","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"悉","strokes":11,"corpus":"MM","originalMediansSha256":"09f1d53dbaf0cc2b390f3de9f0928824c5c1c15ec16d2ec86ebe759558c1ff60","pathsSha256":"819745f81c2a6e9465b335380e51be6b5de58cc194f3305ecb0aa7fd907d1e20","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6089.svg","dictionarySha256":"0448ba03d3cd60d84f027d84bb8c0135fac6b553c4377ebf0738aacd64931f92","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"什","strokes":4,"corpus":"MM","originalMediansSha256":"94563b71383b6ef89d8be5c6ffd7074e5d3923c1d3d78582c9a9a996c1196549","pathsSha256":"b8d5af7bb5a8a71eb1f5564d0bfa62f7dd9279a5048b9deab8e0ebe10c21ece3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4EC0.svg","dictionarySha256":"389d41f2680c19fbc13b3269d4ec3fa40fcac3181fa2648b668bff0825363a96","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"訝","strokes":11,"corpus":"MM","originalMediansSha256":"ad2200362a56a4028b1d761a8b8e52bed33a893a6cd59a3c84f510a1002b021e","pathsSha256":"202d6302feb839c44e7c9a4f338f32c7698ceee2f4c4dad021b6d7e0c32700a1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A1D.svg","dictionarySha256":"6a4b98f7249a2496a48b1279f3514e8df047c6b389c03be8a2cdadf278671299","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"衙","strokes":13,"corpus":"MM","originalMediansSha256":"5404c9039930993c38ba3d67bacaccb02bebc0740c99ef572113c1a1a1fe9f6c","pathsSha256":"40059aa7be8849b32fa99b0009e81a9a43666d27ab88ba3ed450f5c3c482147f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/8859.svg","dictionarySha256":"e9fd83a82e6d3ab39fd15c59f22582417eaba4b1cc2bcaa8cf768e2f33404f9a","sourceStrokeIndices":[1,2,3,7,8,9,10,11,12,13,4,5,6]},
  {"glyph":"啞","strokes":11,"corpus":"MM","originalMediansSha256":"72ff427d7cb6b0f061efdefd637034632bd1193778572d46b243f2fff0c5f659","pathsSha256":"9aa13b65abf4a185b76b3deca3614e64526c6ccee1d98efa9880e78be99c6f6b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/555E.svg","dictionarySha256":"aae29f876c480b3807b8e2c399cc75e7253daa7841f78ad58a2819075c456558","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"俄","strokes":9,"corpus":"MM","originalMediansSha256":"623b68b5e44c9a4363ca0bf45c59743d91e180850b29c034a20e773554771674","pathsSha256":"a95626cec91233376233e6f59f3bc7a36c64148ae7b090339cc495d93aac25a5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4FC4.svg","dictionarySha256":"5660cd4ea902cae7f144cbaf4df33590762d7b944a30e6f4a0c3dc6b4500d324","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"堊","strokes":11,"corpus":"MM","originalMediansSha256":"6d6bf0c2ad4550113ae72626e37e2a9610da0a9c963bbe0f282300dbefdddbdf","pathsSha256":"41f93805930e52b68916753aa9c5e8af661eec535be2163de8e3dd61bd64de08","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/580A.svg","dictionarySha256":"c3e8bb8315c1923249f6b8e57c4c07124097544f5e61d02f21e15e59508ae4e3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"愕","strokes":12,"corpus":"MM","originalMediansSha256":"ea816af6cf183f991a1424e38f764b18a2cf069f8e0fdea2abb480b54599b6a7","pathsSha256":"bc5c824d1483ae3f9b017c18ca8cb7a8b5178da76c045c2e4e290d9b563b21b3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/6115.svg","dictionarySha256":"1d1652106f45e923dbd4291bec72a3c21fafeda310d10254b734c04c57478f3b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"顎","strokes":18,"corpus":"MM","originalMediansSha256":"02aa818e370fb6cd14c4151a8462e7c9c9ce2980c25d62a8df76c712bcee829a","pathsSha256":"853ffe67753931de215e7db6db7a9f9900f1eb1efcb6ea973cc27cc1a06054c0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/984E.svg","dictionarySha256":"2b2ad2c10010e7c073cae42ca7342ce7cb16a870cb61aa00980a5a1950307b8a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"晏","strokes":10,"corpus":"MM","originalMediansSha256":"cc2a1754b065747a8759367e1f6b6b4ae1714b2b6d87f0c1c2e0b49cab9fedb1","pathsSha256":"61d4d5beb79673f4edbc38cdf498f5ab7a6158b0937b8f2c4fffd9f45f8f0ec9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/664F.svg","dictionarySha256":"849f152d286c8e34079a4b553d1323f2fd4f16a814cdf71e5de9a6f527645b25","sourceStrokeIndices":[1,2,3,4,null,6,7,8,9,10]},
  {"glyph":"鞍","strokes":15,"corpus":"MM","originalMediansSha256":"b61d768661cf68fb9f3392c68b5b109cb37ace78da1e6f7e2ff66c545e78e230","pathsSha256":"4c5403716fc75f9eff490a55a8c2eebea23fea2c25ea831d3bc830c4cc82eac0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/978D.svg","dictionarySha256":"060f5c693f4a669895853c3d2801ffb998c042b8c642daa2e2cb4f4926869209","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"按","strokes":9,"corpus":"MM","originalMediansSha256":"35ad5a92154d56485c098ba3ec743ca9149b8bbf3877a833b2a7fbca8b402a3d","pathsSha256":"831ec621a477d9439463c0f7b260a6a5d5ad6d965a8d577d74051c13982ba9c5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/6309.svg","dictionarySha256":"cea2697d3e0c28a7afee500f96eb63d92248f00a1d1f4537aee936541f211226","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"斡","strokes":14,"corpus":"MM","originalMediansSha256":"4bbe3b5b257be87e729a74202c5843d907fd123108a1c0cdc03bd55ffb8becf0","pathsSha256":"4741d3b9b17326ba206b6cba2ccad69d146b111c091e2795ff87c171a0ead044","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65A1.svg","dictionarySha256":"0563b1183167feb3bc4effb48b22f3bf91e3366e242655e2fd393d1c0ea1ac41","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
]
export const G1_BATCH11_DICTIONARY_REVIEW_SHA256 = '5426b7ac32fd83aa618bfc894e21ea1bb982cfdbad3caa297141bbc79fc26409'
export const G1_BATCH11_DICTIONARY_DIRECTION_SHA256 = '6c9321c9b6831316937fa13ca89a84a5a0b0452adc3896cb31d4aad7f41a5119'
const referencesByGlyph = new Map(G1_BATCH11_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch11DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch11DictionaryMetadata(ref: G1Batch11DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-19',
    geometrySource: G1_BATCH11_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch11-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH11_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH11_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH11_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch11DictionaryBundle = {
  verificationSource: typeof G1_BATCH11_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH11_DICTIONARY_GEOMETRY
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
export function loadG1Batch11DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch11 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH11_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH11_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH11_DICTIONARY_REFERENCES.length) throw Error('G1 batch11 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch11 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH11_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch11DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch11 dictionary entry mismatch')
    return { ...g1Batch11DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH11_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH11_STROKES = loadG1Batch11DictionaryBundle(reviewed)
