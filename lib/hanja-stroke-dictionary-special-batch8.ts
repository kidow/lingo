/** Fifty special grade forms (batch 8) individually reviewed: three reordered and six locally corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch8.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH8_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 8: 50 characters individually checked, 50 approved and 0 held; 8 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH8_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch8DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH8_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH8_DICTIONARY_REFERENCES: readonly SpecialBatch8DictionaryReference[] = [
  {"glyph":"圉","strokes":11,"corpus":"Ja","originalMediansSha256":"79caf482841355b6b305ae25894978ea6609c02415303eb97f881792d014b18a","pathsSha256":"3d179d0f62d73a1f0c45aa49580c26fa16a387aa3ae73692fb63dc6ebdbdc637","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/5709.svg","dictionarySha256":"50093797b21f0a17f96e6b6b1906bf391054571c123765d1e532b7cacd1ad126","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"嶷","strokes":17,"corpus":"Ja","originalMediansSha256":"fd434def79e22331ad0a1592d68f770d3db2af3e408a86fa31262ee41ab59fa5","pathsSha256":"bac956716b79cd492d11d252d2e4b50f2c62f0989c6e9bf936ea5c7d2700b68b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5D00/5DB7.svg","dictionarySha256":"6fb519d087cabc72b237b607b8c79ae77438a1317392e702179427cb14ec522e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"唁","strokes":10,"corpus":"MM","originalMediansSha256":"2a2b165348e1cc30f03c2edca935c2d837d99f7ad947e833aafbf83ace6307bb","pathsSha256":"2945ad5195ae27908e24fa81a19f16894e8aa30a975c8d7a241a4eef47edad11","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/5501.svg","dictionarySha256":"675dc267227240209c6fe6fed473287e256727c120735864a9ff7ea52fbe2ad8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"臬","strokes":10,"corpus":"MM","originalMediansSha256":"03055c1fd921b2df18f47bfcbd8c80ab56638ea9f9dcb9a5a423ecf613f1f879","pathsSha256":"773b694170abbffd11143e78d9ff0db8061230ce7cedacc0bd97d4f04d02618e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/81EC.svg","dictionarySha256":"def0d00224f0c5c0299a0ddc271b019474b8ff36db71106851eb8531e1e3eae0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"臲","strokes":16,"corpus":"MM","originalMediansSha256":"22bf0b64aee6da4ef58566c7ca0efd6d1e86cfb5f55d178e5062fcbc7028fc08","pathsSha256":"aa7ff6988a95883cecfb5b54106298289f75de65fb9808c544d12cf815485dd1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/81F2.svg","dictionarySha256":"85548e5fd51cb9877c87b58dd8007978a3c2aa51a8247c230cf4103cb55dadcd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"閹","strokes":16,"corpus":"MM","originalMediansSha256":"29adc0f309d34c65858a72f7b5b01b2083a548bb5b429fd0c093a03fb3986b42","pathsSha256":"bf32fbf25e3508028aff0196ec27e21c7f06a249bb57249b8b8fd79413d38974","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95B9.svg","dictionarySha256":"7ace98a2d758ed2a0770f13724d5dac93c7854fec561bda9fb053be68d23d1e3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"洳","strokes":9,"corpus":"Ja","originalMediansSha256":"d1236a385d7ec9da7c7e7f89996adcce3f70e82fcdadba93017cbf5138121fd1","pathsSha256":"7b8ac62c5a05adf01f6e574e64ac41355101a856a5d96dc47b4e64de335cfdef","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D33.svg","dictionarySha256":"3143d8af52d9e465bcc1d3ae74ab8a544969983b81991da118a9218e1474d80b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"畬","strokes":12,"corpus":"MM","originalMediansSha256":"15bca268a28639db065ebd6682555003d7b1041a4df16da404530ee01f0de0ac","pathsSha256":"4f4dd0da3c0aa9c9ca9aaca33d530de7c5e2794bfe92e69ba3fda0b560479d03","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/756C.svg","dictionarySha256":"8513b11b95583836d7a4b9b385fdc4e41e51d13dc7847a336a6b73e67fd53784","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"埸","strokes":11,"corpus":"MM","originalMediansSha256":"49f788e84ff797448c5f9004506949e01084a019cd6de4baacd7da259b72e163","pathsSha256":"d6bf48ebea5baa754030bd9e8ea353a8d86051241c6bf891783911a4ec315dbc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/57F8.svg","dictionarySha256":"efb8e8b370cd61d93c0076680dab0ebc6c46eff908af67607ad849b2c03aa0c8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"嶧","strokes":16,"corpus":"MM","originalMediansSha256":"9e5f47cbf194dc0315d028d282dc82c6ecfe57e436fec47a16386fd329c57a0f","pathsSha256":"8b5e6acb547f5cc6cfc7795c1caa21c52d34f5d14dd00053a1e585feb81b0ad5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5D00/5DA7.svg","dictionarySha256":"ef9666f3ea767a98ecf395e44b13b6079a62a70c1943b092e5da46a5ae2907a8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"懌","strokes":16,"corpus":"Ja","originalMediansSha256":"9a322bd53e96a6777616483b39e0afd500de685fe538877e3db477ecda358e8a","pathsSha256":"62ff9a64a8b836ba0cf96221942f6a89cf12fffa34dcc9ffc8e259ee613740d0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61CC.svg","dictionarySha256":"02a3af86e617a9fa73ec2b9b7ba092a844023e3f780b72f2bdc5d04dc0dad6d7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"閾","strokes":16,"corpus":"MM","originalMediansSha256":"bca9e3492ed5b5a2dc63b22c651733df3859de2428fa5ee3339a87a3ba6c309a","pathsSha256":"52a65d29c91cfae99c7bf538ae27b7e30a9a7ad463fb64eb3c17631898904887","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95BE.svg","dictionarySha256":"506828ac59df2a1af1ad8d7662f0af3e88f251ad979f7e431c9b3b00f50a4143","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"蜎","strokes":13,"corpus":"MM","originalMediansSha256":"f2e5681e5f0b8442b737a057654fe74ae6b23a93e57e38114aafdea06e571ab0","pathsSha256":"e9f90630a011290acb0e8d93c8fcb4cd0cb986a560ab72aa00d5bf022fe7461b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/870E.svg","dictionarySha256":"e7134cdcfa14319054f54f97e6441f7c5d5508a8649106a3ca930e0a268f2fe7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"掾","strokes":12,"corpus":"Ja","originalMediansSha256":"564f0efe118fedac5319c4c4ec54c453d37e12bcc6c25fd7205665e32fa7c1b7","pathsSha256":"81079591c48f13a7c873997bfa5484e67027366acef18b6a3738d5c07ed1bb3f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/63BE.svg","dictionarySha256":"f62a1bc8a51ed28c2cd5ffc2999c30384a54be5e412dd0e067e919a804096876","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"悁","strokes":10,"corpus":"Ja","originalMediansSha256":"fba52149a918af2d3a262ab0baf28a9ceac789f2e56eb131cc604474dee0e401","pathsSha256":"9b7fa7005a9e3b082786a92955c7dd31961c21e1474cb885dbb9a50aadc2a403","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6081.svg","dictionarySha256":"a8bd349d15b3a5ddf247bde069c150d2175f6b850a3c0e319f091cee7f761f91","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"兗","strokes":9,"corpus":"MM","originalMediansSha256":"f1bf6dd6042d20943e10129d6dc56c6fab6e0bed5c47de9c9489554d54c0aff3","pathsSha256":"4ab8e829368e959a0b9d0de4518945d4264d9237ea1f87e011e086fc136bf028","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/5157.svg","dictionarySha256":"c454e96b86b8f4663e094e714f92272ece4fb570253e63e88fc127d7ba7c2bf7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"噎","strokes":15,"corpus":"Ja","originalMediansSha256":"69867cf1128752012ef33fffd8f35bdeb4b45b0d3e73c8b4cc2a92a437cb0086","pathsSha256":"4c23e62697615d12395d878d528887fda891d6b28ef9c8dae6941fb6dfe67ff7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/564E.svg","dictionarySha256":"737ad4c1ca7aac37e3da023bd009e353e5e0047250f1a06597666cc82e8b6c41","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"艷","strokes":24,"corpus":"Ja","originalMediansSha256":"ca2cdc0908b65a92e487c3982987c1167d2ceee5a2a7d17c8ef175548494e17e","pathsSha256":"127d06319d2d51a1be09273ada1cf89e3688c3297244afef8bf7a7f39caa4726","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/8277.svg","dictionarySha256":"36669a12bc68b9c2321555f41f1440666650defd44978f4fb5cccff4bb081c0f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]},
  {"glyph":"饜","strokes":23,"corpus":"MM","originalMediansSha256":"6702b96d5a17d6a2e0e98a0ce5ac8b948e8d2417a143b1e7c057cd7877697810","pathsSha256":"4d50e430637421f92bb7ac6195c4c8feea82eb6c91d87ecf443c7babcc88e8e0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/995C.svg","dictionarySha256":"0c67f760a68803bfa8fa5645c805d9188f50b0051beb806b46f866bd2641e684","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},
  {"glyph":"焱","strokes":12,"corpus":"MM","originalMediansSha256":"b483f559a728e7df3cb0e982c01e46961240affb9edf2dd4c075751bb14f6118","pathsSha256":"ef0543412422d5e3c7ca34c57415d35224d99631cee2bea8fb25a9aa23aa3832","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/7131.svg","dictionarySha256":"2a4fabcfa7374c70e1d518c3c8ad0b0cc939ac4c731a595b6401165df59a4f84","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"冉","strokes":5,"corpus":"MM","originalMediansSha256":"f3776c63cefde88f33250217f67e477634bd50fa51e5b82acc6a8e4c24828320","pathsSha256":"f140102c8445bd1cfb99731110572d867dcf989b90e2d0d777cd8b0833658928","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/5189.svg","dictionarySha256":"927ba8cce3dd9755e687210ce65a3779a9de72d1c3f0fb30eaeb6f32ac9de664","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"咏","strokes":8,"corpus":"Ja","originalMediansSha256":"c552c17433c42fd91484b94a67145eff8ee4e6401190f4702e99e48a70a0e345","pathsSha256":"b6007fe85fe450bf2b047349aad0321fd355674e377635dd0ba31ca29b325f76","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/548F.svg","dictionarySha256":"613053389db4e753dd2a275148c0b167ee4a8b776526ef606b1a7be657b24ec6","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"嬴","strokes":16,"corpus":"Hans","originalMediansSha256":"50b20f670471c710ec325b10b88e9807ece630b865b24b468b4483af75c0a483","pathsSha256":"600e38a4669aeb21233e4a225893fd4047fcba3bb442219db0ecdc2616e79849","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B34.svg","dictionarySha256":"8fefebe383283f8c920e7bebb140a93d8472471727cd56f6c651f371553b30c8","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"縈","strokes":16,"corpus":"MM","originalMediansSha256":"2a3707e9412124764749298c1743faacd19ac607a8ffb0994aaf91d10b1af89d","pathsSha256":"23a3b59a03ac9b544cd102f91ce063f9e65f06d606c5d6c294f35ee291756bdd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E08.svg","dictionarySha256":"5ed7ddf577dcee90d2ebafe04403e75ab13c79d47c77c1eed1eb3f0b41253cfd","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"贏","strokes":20,"corpus":"Hans","originalMediansSha256":"1c1ffc06d1b04d2cd12ee87703d45d6049e9297218f1be327df4eeb8dc1544ea","pathsSha256":"5474717e85d0b7c6b7ad17543310eeaf8add1a4c359e5291bd1e0aa4447eb989","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8D0F.svg","dictionarySha256":"734fcdc86e7cc545dcc74fe2ab93ce81cbc3479a307fb309b6c3e80aebc83e9c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"郢","strokes":10,"corpus":"Ja","originalMediansSha256":"8e59cce1c26d2607a7f93c6d576225276ff9baa3b2f44ce623d85d8c62c054c5","pathsSha256":"a5c7f939a934931290a2f30ba7b4d300f1a96d4fb080f58d96cf4c9b17ea089d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/90E2.svg","dictionarySha256":"6537a1d91ed6f00e77d641a1f8cf221bbf1d77630ee951802ccebad3a3168264","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"羿","strokes":9,"corpus":"MM","originalMediansSha256":"c620b69090895576c063fa7418f88efdb224fad263916743e97ec121454cec16","pathsSha256":"537232032ee887d15de9629a72ce0ce1d074dadc76c7f8b8eb840b4e4f86cd71","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7FBF.svg","dictionarySha256":"b36b518b8b66bb0382b11e4e586d8bff9ec2547f125735122b9719b18450f997","sourceStrokeIndices":[1,null,null,4,null,null,7,8,9]},
  {"glyph":"橤","strokes":16,"corpus":"Ja","originalMediansSha256":"2afa5c772488d1d45c0a2ba39acf38cf436fb8e8ad9a1cc74d223aac4d0b442a","pathsSha256":"6fe4ab2eace286261361e4507db9520abd8de1a5a2af7fdee1ad47d007862c18","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6A64.svg","dictionarySha256":"a08f34dc1bf589d7520480ee1645bcbb836853b36aecd1ba3c0f814da8c6b2f5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"勩","strokes":14,"corpus":"Hans","originalMediansSha256":"e86f15ba879564c6a1c06026ab3e57b2a8682c65a37a11de13c2d1567d69b2a1","pathsSha256":"e5a723c73e1885106a93091ebd6ab94d98f4617754c6b877e65512a013819af5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/52E9.svg","dictionarySha256":"bb78e67e48fc36c35fbdd33d9a0fc13841b89829e18a25bdd1e36eac88fe1626","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"蚋","strokes":10,"corpus":"Ja","originalMediansSha256":"efe15f89e473d57b0e0371c6dd484021b4e2ee1af89ed29d9e0f56ba05a130f7","pathsSha256":"494411f89c3672b7aece91b3c7b9fb922b978db10f651e49bee0862b8de9c960","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/868B.svg","dictionarySha256":"9c1f740b8b972244e0de200b37fe9fe3dcb3e6a85776952f4d15318e9c684bd3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"翳","strokes":17,"corpus":"Ja","originalMediansSha256":"7bf2af45aedf72ff9862474bc141fd90c791ffd599f1a6e5b5f8a4d21c27e617","pathsSha256":"f23ef798d6156edd9e8435f31ad2787e19f74fce024cbfe8c6f13cb60badf8cf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7FF3.svg","dictionarySha256":"620253b299a7ca789bd3d481d3990782fa11c073cfa40525545e9a1630cc24c8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"睨","strokes":13,"corpus":"Ja","originalMediansSha256":"eceee70cb68e72600398c5299f5f0744e93b3b0d07081687023c11f9159cf2fe","pathsSha256":"ee25d6ad73e360edc2c5c026101a134c61a4ddf61cf5cc5ae4802a5d0cf28f7f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/7768.svg","dictionarySha256":"d1e0cd71bfff7a6489ceec329d2f84a84fec2ae6f2ad5cf0c1cdab511cc25490","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"珸","strokes":11,"corpus":"Ja","originalMediansSha256":"8e022eb78ae4db269b5408ab8c4f6b92a38559aa21c7eaa1096207dfb1bd612f","pathsSha256":"03c374c7f49aae126568cba61ab6ed57a2f2e4b54317e8ade7b0da4dac93195b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/73F8.svg","dictionarySha256":"7118127f1fa1895da2c31663746777d0cd77e58f2ed44b52a1ae54d54566c11f","sourceStrokeIndices":[1,3,2,4,5,6,7,8,9,10,11]},
  {"glyph":"忤","strokes":7,"corpus":"Ja","originalMediansSha256":"c41c9f4937494b51ac74aa470d21b31a732804901bf71a5ad864a4e9e21fdf77","pathsSha256":"cd6864232ad7af8457d6282d05129fb79cd9213661f6a9ecb9428a6ed09e8f77","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FE4.svg","dictionarySha256":"88159585013eafecdda201ab448b7029539ccdb39597b6a5601959930ac00abd","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"鋈","strokes":15,"corpus":"MM","originalMediansSha256":"59a46fd21d77c22bedf36eba971cb48b804b9c4a3bddcdb7c1e6cf4205e2a7bf","pathsSha256":"db14523cc9d4ffb257a5b9abe01b68d22ada6a4ae5cc1ac01dd6b8fa81887c66","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/92C8.svg","dictionarySha256":"a13ec164e95c21cb016e0559b7e12de29953cc128d5de763810fca54fffd8699","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"慍","strokes":13,"corpus":"Ja","originalMediansSha256":"483a98868a32c7d4cb02df90cfa045e84db45a1da37eeb03195817b37b238d76","pathsSha256":"f3bcc88b2a576465904156169c043c92dee225241c98d4fc54777ffe384cd2cb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/614D.svg","dictionarySha256":"09e12f4d1897901b73eebc91c32dce2626643b83da0398294e80f83ce479b92d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"媼","strokes":13,"corpus":"Ja","originalMediansSha256":"032b2a2743e4cd8ab764b59434b751d04d019a0d5edff86426f440f3247c0749","pathsSha256":"b19663296db6a4af9f4241fcce09ac3b6724c646d56bb61a9b4e3e0f333f2748","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5A00/5ABC.svg","dictionarySha256":"abd03a5bfdc597e1d9aa420fde78451341774c0f2781c11cd51227110d92976d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"昷","strokes":9,"corpus":"Ja","originalMediansSha256":"6cdeaddc48f102c8349d6181245f77fb0998fedf2e5ced11d402a6cbb3a2e75c","pathsSha256":"2a303adb9db3e995fc140b4e82cb603dcfebec65390a8b43e336f63c5401b162","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6637.svg","dictionarySha256":"0f16f345c7d6798372f457bb3fb09b8d1a9049cdb0f53c7b088d3d7fa756c78c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"醞","strokes":17,"corpus":"MM","originalMediansSha256":"400f3e4b461d4fa61da1ddfec7e37a53010679c9ea628eb56f681e886488e5ae","pathsSha256":"7e543f7386f07db81b95740bc53a5daad8a023fc03b567fd4262d3087c0fa440","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/919E.svg","dictionarySha256":"bb787224400e0c0a35b456f3fcf7ad1dd419015e6b82e7b06410d135fafa898b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"杌","strokes":7,"corpus":"MM","originalMediansSha256":"a940ebd00f6d271986256daa0cf7474230d1aa169f526ecd906e00efb9d33fdd","pathsSha256":"9064c2bfe331285a1b4e3c4d9232ced96280ce08318e3eaf49bc082345ede688","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/674C.svg","dictionarySha256":"e1a94c15de7592134f0c66a45649c0fe74e8a5b0130db71effe931992cd79dd8","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"雝","strokes":18,"corpus":"MM","originalMediansSha256":"f0ebc54acf3f20989ccca6bd8f0d8917d24269f71dc5a5d6b33da42d50976948","pathsSha256":"2625ed0e00720a0735e1d793a5c550f34de9a9a06ad47f8c26f558f98a6c3c4a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96DD.svg","dictionarySha256":"20dc20debdb2cc256f8ed93d167cf7c43c563415971573f3ea9f4bbdfe45a47b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,null,14,15,16,17,18]},
  {"glyph":"廱","strokes":21,"corpus":"Ja","originalMediansSha256":"6bc0ec51adbd392ae589d5a545d50ebbd773526f0e9ff2cffdf21c3bc9e80b2c","pathsSha256":"ed74fa22bd057aa7adcf71564dfa718c2837e02286c294a0362f86739f4ed386","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5EF1.svg","dictionarySha256":"8f7badb529208b3d4b52465a9bd64dc7adac120094ca78f925040ac4640a86f4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null,17,19,20,18,21]},
  {"glyph":"垸","strokes":10,"corpus":"MM","originalMediansSha256":"fc64ea81049a8c880428ec7046027a5f62b992122f2f6bab6c378af1bebf7ba9","pathsSha256":"bd175f17b64eab1c8edcc404d77bea557668cbe973c2ed0c6c913491d821ad58","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/57B8.svg","dictionarySha256":"edaba53ead23b1c7f28b679793ec3f34c45f2cf6c098862dcc6612e8e695d3b7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"徭","strokes":13,"corpus":"Ja","originalMediansSha256":"b1f94dd2055a9b9bc9e8bb073a78b3e16ef9a77a9ca9613d0158229a5a6dd9fa","pathsSha256":"b24c76d90ecb8a668d5502efde26e99cc2fcc8b086bbe3fd379ea176aa0a00ed","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FAD.svg","dictionarySha256":"0e289841bbdcf7bdc87972f68d047e455dbba5daed5ca6c960e1240565c9edf1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"蕘","strokes":16,"corpus":"MM","originalMediansSha256":"7aa233048f36ee0d70105fe32eb144762774f08150987ad4a4794db01f4a9655","pathsSha256":"ad0d4f3b69a1d7671443543b6980ae63f63577dba30fd6baf0bfccfd1220af8e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/8558.svg","dictionarySha256":"8d0f6fb4e03d7addea9ffc5cc0cff40437b430cc2fac3df85c7ef12de466f8fd","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"殀","strokes":8,"corpus":"Ja","originalMediansSha256":"1a716a8e1fb9f546a5df18f7b4ab4d0a2eb71229ac7fc5cf77814b3fdaa1d5a0","pathsSha256":"e56dd7ac00df770090572dafdbaf71ecd2a95e548ef3731b530cf7659bb736c0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B80.svg","dictionarySha256":"76e52ab2b9bcdba75b02d2ccb19f585da4185f1089216796e54f37246901a47d","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"徼","strokes":16,"corpus":"Ja","originalMediansSha256":"f2b9e54c8befb5ac34881b7f7ba860af28ddb89365b875badd5f3fdb671080dc","pathsSha256":"4af26b6db9ecd61310a729b746fbf2965557ddcf811c4889413e815ccca73005","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FBC.svg","dictionarySha256":"110b4dce1e1c26b4c82c0c83c13cfb88d0942a5d78abd174ad1c6b7adf669dea","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"踴","strokes":16,"corpus":"Ja","originalMediansSha256":"921c1595a8dedb7c37c0be6f70c1b85c25690735ac10370cbbee65cc3f65acb0","pathsSha256":"0bc7e31526c36f07f0469c7a5498591ede98dae972d345e7f2568ee16af24804","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E34.svg","dictionarySha256":"290d0d9ff7a0de6e1cd8d650515b3eeb5d3bed6e321e492f291f9923bcf227ff","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"盱","strokes":8,"corpus":"MM","originalMediansSha256":"eac67bac12595ed4b9c5267e018c68a0d75a8f0cce6dc54a5bf4c893df4be441","pathsSha256":"246f4a14ab84b270dd2c4d05f4b17a908e81d0211f311a9a44bc1e85385acdfd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/76F1.svg","dictionarySha256":"de69782425a2eae1081adf2cc5d4f937f8d6ca1dc929f6fd1caef57093c11d74","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"吁","strokes":6,"corpus":"Ja","originalMediansSha256":"b7a050ad5b278d288e04c319c3c1da105f03c78e3040d7c914fdb7f982b66942","pathsSha256":"314a4844f6ac309ee2b8fa0cfc09e36a79d24b61ce4db877094fdfd8116d7eda","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/5401.svg","dictionarySha256":"989f801b47a3c442e202093758559eae511b80fe7b4ea95c8fe47be96772fc71","sourceStrokeIndices":[1,2,3,4,5,6]},
]
export const SPECIAL_BATCH8_DICTIONARY_REVIEW_SHA256 = '914fefde3599d8ec27774c36a66e5e9d05c96f2593d8a44a56f8a8d1b4ba2c59'
export const SPECIAL_BATCH8_DICTIONARY_DIRECTION_SHA256 = '0e88fd9dcbea02b718281f91f25fb5ef58040a8c3715310064178cf76aa07238'
const referencesByGlyph = new Map(SPECIAL_BATCH8_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch8DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch8DictionaryMetadata(ref: SpecialBatch8DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH8_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch8-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH8_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH8_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH8_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch8DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH8_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH8_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch8DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch8 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH8_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH8_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH8_DICTIONARY_REFERENCES.length) throw Error('Special batch8 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch8 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH8_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch8DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch8 dictionary entry mismatch')
    return { ...specialBatch8DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH8_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH8_STROKES = loadSpecialBatch8DictionaryBundle(reviewed)
