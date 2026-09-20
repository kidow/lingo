/** Fifty grade 1 forms (batch 21) individually reviewed, including 6 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch21.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH21_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 50 approved and 0 held; 6 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH21_DICTIONARY_GEOMETRY = {
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
export type G1Batch21DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH21_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH21_DICTIONARY_REFERENCES: readonly G1Batch21DictionaryReference[] = [
  {"glyph":"狐","strokes":8,"corpus":"MM","originalMediansSha256":"04e1f8b2a47cbe36fdb57decf57140f8d183023985761eb0d4460fcb22280d8a","pathsSha256":"b36eae003994240245232f4bd757432db777b18a71c6e36b298317670d5324c9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/72D0.svg","dictionarySha256":"90fe2dffe5d18bababbe657c0dfbb43dac5bdd3301355ef17c319ddb20eb7806","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"瑚","strokes":13,"corpus":"MM","originalMediansSha256":"c58a8de73aec3ebfabbce309a1d8ddf7d474d1ee7d58f167e9bf0cba4abfc7e9","pathsSha256":"092ee0341cafe8cc8ba50bb7cac86abdde07cf7243047923c7cc0335c437026f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/745A.svg","dictionarySha256":"7fe4756137d1e362fab182e82706403537487a3637a823006fa169134f2a66a5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"琥","strokes":12,"corpus":"MM","originalMediansSha256":"64fe994f5036fea5dbb9a98f16fb1c334c635d9090b5fcfe0cfab577902641a9","pathsSha256":"3ed2a17047ed7b7eed47de21b91a678d135a9230de82e0de3def046838cfa624","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7425.svg","dictionarySha256":"e23b131597c8bceb8c67ad281417fad18f0c1483c19fcfcb9c356f7423cede7b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"渾","strokes":12,"corpus":"MM","originalMediansSha256":"cf1d35968c021ec89a237a495108516a97ba0bbc93437f5fdbc2f7e31b377ad8","pathsSha256":"8bdfabd555852e9343448a15d1411978dee111516628cb7488e6041c658a641f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6E3E.svg","dictionarySha256":"507792b34d1f028767ad1ebd4f82786394f70695546083525305acce9a9d1db4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"笏","strokes":10,"corpus":"MM","originalMediansSha256":"3b10ff52d4a280033ebbb7d1ac58d1ff4e98691a83c22199894182e887e88694","pathsSha256":"a6156137860394f5a6f85c2adeeae3aac4f06ab5a80170c411cb5e44c0d7e6fb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B0F.svg","dictionarySha256":"cfca7c205565834c68877040499332fec509e1d28379fd079a6e10f4d81a8d60","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"惚","strokes":11,"corpus":"MM","originalMediansSha256":"980a6352e6908505ca3ba3ae540516993e00e896ced4af6648f822f67135dc4b","pathsSha256":"76c563e42998056a3af013fdbb4cbae8dacfc4310875e172aeb6d60137c154ef","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60DA.svg","dictionarySha256":"46abada2e6dace88e45460a2f5d070304bc75a03bc8b1095378501aa71839b3f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"哄","strokes":9,"corpus":"MM","originalMediansSha256":"74e302ee263d510a8cc7d50f46b481c360ca0bf7abab5e425bbaca0e5d5eec7b","pathsSha256":"79f6c205fa2c28ea1e7b1ac6cb26fbc8f862f96382a751d91766026f4d3509a9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/54C4.svg","dictionarySha256":"c063edab362de0c01318bb0ad0c01d36634ac007390d356e6962802a245af211","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"訌","strokes":10,"corpus":"MM","originalMediansSha256":"59d7c2cba4ef6653636bf51c9e83c70c37ed9913e0684bbcb768c2231ffc26dd","pathsSha256":"5db8bfcc9516a9ae3b3f89c2a6b4ad88139756cfbb6a2268fdca73c86be1366f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A0C.svg","dictionarySha256":"c0066da790bfcfc687efc6e79d0ea3129f0955fb8082dd23a977bb6215d72daf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"虹","strokes":9,"corpus":"MM","originalMediansSha256":"a93fe149a5f552e9a4cec181f624e1b4920ed4bc26cfde368a8d0ef2c507c362","pathsSha256":"5eb2d154e9bfb69527cd0e4986c0f7d215b5c0d206d2c7b6302437e474bb57c7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/8679.svg","dictionarySha256":"43005ea964d42a7d0a49e7a5ea3594a18ab983185a75f4932fd7c135dcb6f73b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"宦","strokes":9,"corpus":"MM","originalMediansSha256":"09d7e633b066b51d85828b9950f20ac51d2ff596814a0b33f4f468554d9cab88","pathsSha256":"e385b40e8992932d4d84f69187c04d0045081e9f43399529b5a60c46c6e198b6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5BA6.svg","dictionarySha256":"1222b6f1c68569b62438a002b562afe6112fdf7e51e39a9bd52e56709b320dd2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"鰥","strokes":21,"corpus":"MM","originalMediansSha256":"0c2a5c04388cb83b84e3fc2b056602aceeeb8440a77ec3f17c84a67106b1d0af","pathsSha256":"245a771ab1d676347c873ca2f94b7f0c9f814c9b6893955da5ab145e101212c2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9C00/9C25.svg","dictionarySha256":"e4cb68073a9de942a861d270d675ad83a4554e51eb0c0a75f9b3d927ecbd74ed","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"喚","strokes":12,"corpus":"MM","originalMediansSha256":"9f149f1f04d0c2bad99fe46d594fa6afc49ec8bd482af051fe24e7f546cadf40","pathsSha256":"191329c550fa4f646837c3cbf48228c488e8252fbe7c68b8fc06a4ee18e4083c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/559A.svg","dictionarySha256":"00d3d515fde048d206833efd164fd6998679c837506d195c3bd799948803bcc7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"猾","strokes":13,"corpus":"Ja","originalMediansSha256":"aa8b5a732afe9c7b4c42dca83408e8238d0923b033e1adc14353b9cfd5686a6a","pathsSha256":"63a1ea723a9ca7e938c030b52605af39d40c958431505f383e6feff2ba5d17f7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/733E.svg","dictionarySha256":"9200fe0bb46a3ef9ceabcb49af903eb1a8b683f437d8c4dc07076f1e8fc23db5","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13]},
  {"glyph":"闊","strokes":17,"corpus":"MM","originalMediansSha256":"8d810b1b14d4a2a7755d00d0b2de7f5260df8f60c096942683317cc4da02131a","pathsSha256":"7e9045127a6bda40fa65dd967e99f8310b1a52172f8a798fe22981b15b6ed838","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95CA.svg","dictionarySha256":"84b03c58753c363eac87b28948343931b6ce6b2c2fdf354ac55ee95c5fc17575","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"煌","strokes":13,"corpus":"MM","originalMediansSha256":"6b75c29856c6bb3cf2452cf0824c5388f7c185557fa29a998d35a2016d710a6f","pathsSha256":"a26683102335929fbaa0363b657770357fe7989862a8f4d3a7a6ecbe3c509f32","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/714C.svg","dictionarySha256":"6dea0f90207b8b8b915fc3662ada770dc9da4a0dfcb064c74d3ea21ed0a3e43d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"徨","strokes":12,"corpus":"MM","originalMediansSha256":"abac63f96e36d7a031c63503481fe103ba977a939d236aec73db78a6811f6ff4","pathsSha256":"d25f25a797583f130c5c960254c4207fa8b5e1911eacf5797ea02ad0dfbfd979","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FA8.svg","dictionarySha256":"3468d2e34e5e4200b65c0e035ed831eb6083a47805e0f8ac1855543c1aed045b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"遑","strokes":13,"corpus":"Ja","originalMediansSha256":"15b46ea1e033673ae7bbd47056e84e62cac0d67bd57fe3017e2b273bb55513c7","pathsSha256":"b9e15185714fb09fac63435889a0c491571ade01c14a0cd8c522f831db014c16","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9051.svg","dictionarySha256":"a4b2aeb8d1132917279ba147df8d38ec6e1550c6f966632b3365c6306fec2af9","sourceStrokeIndices":[1,2,3,4,5,6,8,7,9,10,11,12,13]},
  {"glyph":"恍","strokes":9,"corpus":"MM","originalMediansSha256":"4058c94939f4628babcc06011628bb6ddb9f248371eec52fef8c78ae81172a3f","pathsSha256":"bcd3f5006297e7f017772c6754d33498f291ead3521248c6b96ff154dafd538b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/604D.svg","dictionarySha256":"3fce6d6962571d76653f5d944b205a4ef2dfa3fc3561fd18f1d8fc5a62796344","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"凰","strokes":11,"corpus":"MM","originalMediansSha256":"c6b78705d3658abbdff4be3f2d09f848d64140446cbd6a5c88f236ce41e1ac12","pathsSha256":"e0beff89b3261c5131bf26c61f1cfa59c46c5279e0e5810421805158832b070b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/51F0.svg","dictionarySha256":"08308716d256b99fe8dca9e2df91b8f53a9f28c08102f85c1e3132092b6c0266","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"惶","strokes":12,"corpus":"MM","originalMediansSha256":"817850125e46b39993603c12c8aa3fd7ed648d383bb0e209a48d41666b1be800","pathsSha256":"952553f3a73360101c60e23d7a42f80c6d63ce590da525be69ee698f58859f35","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60F6.svg","dictionarySha256":"f286adc9f31f2ccc0e333493ddeb6a8fc9faedef0ddf92583039f682ae5c6e47","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"賄","strokes":13,"corpus":"MM","originalMediansSha256":"27506ad1057d310f0aad161add35dd8c9a2206b3165c300cd9914112a2d187c2","pathsSha256":"b300467ca80f3e946f9b3a53bb9784d241b37159f882c0d61ad94964a0875839","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8CC4.svg","dictionarySha256":"02562e3b2e825b7bca4f14e380fbfa04bd3138a4b30776e10df5f2f05771045c","sourceStrokeIndices":[1,2,3,4,5,6,7,9,8,10,11,12,13]},
  {"glyph":"誨","strokes":14,"corpus":"MM","originalMediansSha256":"a36ac256235c6972114fd9a82387f54bc783853faf58ca1bc6d44253f43813ce","pathsSha256":"aa4f2ac867d4d4abea10bf921afce280384974e4fffe4b7006687c35ad36739d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8AA8.svg","dictionarySha256":"ca0616aed9f3b7244d45a9c2b2b6a56f9924a683ce865be8fd25b2f4b5aa9557","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,14,13]},
  {"glyph":"蛔","strokes":12,"corpus":"MM","originalMediansSha256":"5b1a7d01a597b1b1059c89e388aa8a15803e601f1fa8f57c007f3dadd52568b2","pathsSha256":"68dd189db60ca45e24e1d63486c1c41e06198b4ed0416b42361e2afe3913a03f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/86D4.svg","dictionarySha256":"cb0b814b9a23a0bdde476cd680eee8e34fbb53abb17a12a9e6ccb5bf453a7ba2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"膾","strokes":17,"corpus":"MM","originalMediansSha256":"afc0d04193bee6219d76dc995a2ed4fb466fda86745d2531a1a2bd2d4153eee9","pathsSha256":"27453128e1ca73c7a4fa0bf52412ffeef9ef4baeee8821695c8c7f2ab5c9649b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/81BE.svg","dictionarySha256":"bfd690c8b38a62242fba5bf9f5f68640bbcba57fcc44f995b065e4e9d952a344","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"繪","strokes":19,"corpus":"MM","originalMediansSha256":"03ad1d34f3322b253935d747db02f048f9150cc36961f66499674db32117bf1e","pathsSha256":"60b03d517295cbfe964bdab8369ca878f8695e42655494fb0d689de3cbcac5e5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E6A.svg","dictionarySha256":"5c5c0dbc265c478d021c30cd383b763e3bea963cb4d110cdd8cc5d44e9f7e720","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"晦","strokes":11,"corpus":"MM","originalMediansSha256":"171a759de31ad3415ff2845c513c57f7cd25f24c5fc218492aa06f3302a624c3","pathsSha256":"bcaa544f9b67a74f5c9662248e54ee65541d3eaddad5ca7d686b217c24573d71","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6666.svg","dictionarySha256":"b6a3afcef1ace5109832efbcdc214dd8dcf44274c13be4f0694f2aa626a0dd6c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,11,10]},
  {"glyph":"徊","strokes":9,"corpus":"MM","originalMediansSha256":"b4430864b8b88badf5e6c649c19c3c6629048810b3a953b1c02e893ba3306ba4","pathsSha256":"ee7e353785b5ea7fd7ca90f5b0e2a4cd032c75d516e4cd31b2672255ab330514","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F8A.svg","dictionarySha256":"9ae2c04a77116fa1780c9f9e6eb075ae8df3a781f2165f9aedcf1f55e609ef3b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"恢","strokes":9,"corpus":"MM","originalMediansSha256":"87c5c308e90fd1c649e1a809369f7ad1924955070af0d564d60ee9210f401a56","pathsSha256":"255f2bd765a7cd482b674eb1cea78ab32fbe03bb2e01f16415f62a5967453994","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6062.svg","dictionarySha256":"276359934f67f9e0105ebbbfedd19c0cff4e6f64f4050061786b6d73d3525136","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"爻","strokes":4,"corpus":"MM","originalMediansSha256":"09bbb1219118ba70b5ece93109b84ce68e37fdb9096428709922e1782018c163","pathsSha256":"6a050f12dbf5e8471b69003ac8d806e65b64e5e960589a3c556c347e861d3d83","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/723B.svg","dictionarySha256":"ea1545b51d773c4ffb2cf7235db37acc657b352647e0b7db5a62ba8e9f581602","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"酵","strokes":14,"corpus":"MM","originalMediansSha256":"cf1b55e5594e81e96f5e46545b1d9ad533391619ece6b4b6c58f111ab511ffa8","pathsSha256":"ea666db11522706d7ab1e8f021f03c82bee02c4b18a0de2fe2eb909e323beea3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/9175.svg","dictionarySha256":"bff64ad173e4cfffac5870b5d11f701393369d7ac63356d282a46a7159bea6ac","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"哮","strokes":10,"corpus":"MM","originalMediansSha256":"d4d095cfa0ea0efa72dc46ae74a5e3f8c2c37d1547db80feb1e319e9bb306ff1","pathsSha256":"fc7f5f42cded62d35e5e757edf464cc14fe591d9ea9b4a9c0cf938db56f35fd3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/54EE.svg","dictionarySha256":"0d9fb5fad2ca22b6691a68cf7a0d9c75b39c2223f4bf228cc57930da90390902","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"逅","strokes":10,"corpus":"Ja","originalMediansSha256":"fd3a2fb2ea355d2388cae742666538d95a039d2d4f1533e8fddda2e39fb83fe3","pathsSha256":"68a28cf422c48df4d37a8df09ac0412849dacae94e1da295e5b929e9aa73e53e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9005.svg","dictionarySha256":"aea3f1d1f5e3658fa74cd67e54ca7887d3eec8efd1733e41a804c93ebf8129f9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"朽","strokes":6,"corpus":"MM","originalMediansSha256":"9c3b04a460ed652ffda7d4a2d039215b58a0a06605be45a79b8f22bf7998fe6f","pathsSha256":"7c08c7766726f99062d0d98c2f574d76b102dba3ffbdee34185351f2250b59a1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/673D.svg","dictionarySha256":"b179853ed7e24b1d219183d2cfb1528c21dbeeb97ac40d2bef01c5a3bb008847","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"嗅","strokes":13,"corpus":"MM","originalMediansSha256":"38164cb0d50e08b9da64e43714f04607a2ff7d1bcfd2885749a812371d89e9d2","pathsSha256":"639f290102cbf10339d17a5602c175c5d0c6b134b895b466204a47624bbe4d50","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/55C5.svg","dictionarySha256":"0e7e4f5017f36062380444929ad7014e7e0d07062f79763db5be33dfbe885e67","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"吼","strokes":7,"corpus":"MM","originalMediansSha256":"61231d30f28a22ce49caca690e4f58be66f77b16f3c9dc1dedcdda233fc5b367","pathsSha256":"0d29f4549dd077d0c9054e0cebc80f594f2236fc38393cbaa487fa1f9170226f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/543C.svg","dictionarySha256":"051858e6332139f3bcbf8277e2fb5f7224f9b8902e261041abc7e55bee59c072","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"暈","strokes":13,"corpus":"MM","originalMediansSha256":"be46ad0eaf8cf7c87081ef117eff7f2855ef85bd825aaf12b6dbd0982fbe326c","pathsSha256":"9133c6e28dd713b514a3cf4a188ff6b9fe10cb947c1ae7de81778004c6f14b58","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6688.svg","dictionarySha256":"8ff44a161bd45dd79586452828ec487317b938b986e1fbdf64b8e08869b18524","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"喧","strokes":12,"corpus":"MM","originalMediansSha256":"19c8fbcb04a25149860857f2acddb825b3515ca2d700111175c2ce4f013269cd","pathsSha256":"92b1ed60bc1982745462c167ca2ba8b4a722ee9ebc3f54629ee98113218a641d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/55A7.svg","dictionarySha256":"b7f5067e390a2e82a3d6c65c4504e7dd272e89173b00955186a1a82456415eac","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"喙","strokes":12,"corpus":"MM","originalMediansSha256":"fc740968561314ecc9e7fd19fb29b823a39e5b5024f00c36064003738705d099","pathsSha256":"cf7c07354e8cd106b0c5ac450315147a488bbb980f96e3b9bed1b1192645f687","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/5599.svg","dictionarySha256":"68b817f9433f1d087afa30a8757c562a0e6c81cdc37f8534e8a205f4187facd6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"卉","strokes":5,"corpus":"MM","originalMediansSha256":"27f82111d9551151a05ec55a149d4d923f21133a5bd622ec90d1e85965f3203a","pathsSha256":"5b20060a2e800e57f47f735df604b6f2db0ef441266c49abdb8d65c7c4662363","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/5349.svg","dictionarySha256":"cbf754c3de7d3c0230a42d05ae60d757978f5541d6a1c2339da7a4c5515a6f11","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"麾","strokes":15,"corpus":"MM","originalMediansSha256":"8f6772ffd6e620e2425087b475932c57ead3324a179e7b1c605c700f5ee0ca79","pathsSha256":"cc61c4a94e9b4b640dca94aae5e182cfe759d42d0571089fe6435d407f101a86","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9EBE.svg","dictionarySha256":"b48ccff2c3ed0bb833cf3f66a098f7aad125ac810b9da915a10d8479de97dba3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"彙","strokes":13,"corpus":"MM","originalMediansSha256":"e3cbee22f1649fba363979427bcd96748a1f2547c731dce25fb4273edd0fb05c","pathsSha256":"cede71e2fbded3d776d1aa54b0032b5c9b730640ca6c0d1ba2aff0ff9b364f84","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F59.svg","dictionarySha256":"65a802a5a3f7717a043215ae37176ffa5b1e3c25a853db68d886330caa0d683c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"諱","strokes":16,"corpus":"MM","originalMediansSha256":"d42d5ea956df181d26ab213c3e655ae6a00505341721ca64ff9b560d7b4cbd59","pathsSha256":"ab979c43907201b8cfd0dda1c4b678498ce40b48e4aaa29f716a989863c656a4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8AF1.svg","dictionarySha256":"2cf0b9deffff9d2601c78dcebdab980927007dfcadb34350070615b8612803cf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"恤","strokes":9,"corpus":"MM","originalMediansSha256":"9f4c8c340dcc23cbce1b743fc2a5e680a5e5fae6e260eded7d2de8b2d9673c52","pathsSha256":"37dd984c6e759fa58882ce051a4d690a257799df89a497bdf5829bc98f1b41b2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6064.svg","dictionarySha256":"0f055f4a9139870bcfc37428e18fd14965d3cf610cc802ac84eff06fe2ba0912","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"兇","strokes":6,"corpus":"MM","originalMediansSha256":"577dcf0dad490183f9b6f71f6d8e8f59df118e878fd840f35a2fcb9374b45eca","pathsSha256":"6c2896f9e7e429a72a57d77cffb646a8152fcdc85e82716995a35346066d1c71","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/5147.svg","dictionarySha256":"1c942301ad97e925fe227a6ef819d17d442331f80eedbf5f45fe3cf253578440","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"洶","strokes":9,"corpus":"MM","originalMediansSha256":"87710effc9dcfa1d5f867572619f44432ebc80d08a1f8fab2e267e5b550aa7c3","pathsSha256":"ef4a43c1b3aef6a4f9ba5bf542ed4b6b29a66283644774860c82235cc078a1e8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D36.svg","dictionarySha256":"868d820ec8895696c76f1c33df149a8375e0d74a411e69640ebc68fa734cc393","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"欣","strokes":8,"corpus":"MM","originalMediansSha256":"8777d3511f97a8254fd8095769520129d871340ebeb5ff0a2865dd6ee9d44199","pathsSha256":"e4f08c6114602d34f1c640693e1a1068673879b20b7370ab1ff7819a37eab1bb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B23.svg","dictionarySha256":"9371bf12991bb9634782726700b66d3d2632161a056e1ccdc4f4ac9d4c0a3339","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"痕","strokes":11,"corpus":"MM","originalMediansSha256":"379c9558b957cb4626ec462dac25e8aa3ff4f69e328b30e314c9231ca19f1638","pathsSha256":"c6210cc43069042e450e29888b268a848d5b80fcd06623982223185b95f4b9e3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/75D5.svg","dictionarySha256":"05327b7337881dc0618daf8e65ec4c923c58d010c41ab9a48efe6c053f40c3d9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"歆","strokes":13,"corpus":"MM","originalMediansSha256":"b5ccec834f39bcc76e293a800610e72f0f0aaa0b5bb2fac7aece416ec584e828","pathsSha256":"9a1292a3c781382ab0af852a43bf066214da93bd4296240c78a66561dbb1b183","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B46.svg","dictionarySha256":"aec961fbc1920e8f2c05666feec99e3fa08f33d373d38641bdd028bedd3923d5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"欠","strokes":4,"corpus":"MM","originalMediansSha256":"797d9c5351cf0a60aa682ccd59c47b98d8a3f313cbc627dfbf49e87df28f57ff","pathsSha256":"41aebc51cee867267e4e5a5f271fefb236e5ae366f55e554a0e01b1dfd360695","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B20.svg","dictionarySha256":"9bf4eda650aeddc6ed5376e87213f552225798da1031e38769ccdec98ec48727","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"洽","strokes":9,"corpus":"MM","originalMediansSha256":"41f4dbc812d5c47b3ce017196270a770061082542b07f9c05f5bab43a2018424","pathsSha256":"9ae08bc39d78787baf58fc33bc70bc1e8a813032605fcdc98ac8b081fb8ab7ed","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D3D.svg","dictionarySha256":"d966ddc78e1b6ed0fcac803fbbf34ef60a6a09724bfac2142559c227c0398fe5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
]
export const G1_BATCH21_DICTIONARY_REVIEW_SHA256 = '4ba19c6bb9f8eb074b44c5ea372c0c7b5f4aebcfa7123a339a6356981b78e4f0'
export const G1_BATCH21_DICTIONARY_DIRECTION_SHA256 = 'a53d1ed4f6140d9020f991039292f991fd749f1307618f78a104d940f6059033'
const referencesByGlyph = new Map(G1_BATCH21_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch21DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch21DictionaryMetadata(ref: G1Batch21DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: G1_BATCH21_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch21-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH21_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH21_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH21_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch21DictionaryBundle = {
  verificationSource: typeof G1_BATCH21_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH21_DICTIONARY_GEOMETRY
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
export function loadG1Batch21DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch21 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH21_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH21_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH21_DICTIONARY_REFERENCES.length) throw Error('G1 batch21 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch21 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH21_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch21DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch21 dictionary entry mismatch')
    return { ...g1Batch21DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH21_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH21_STROKES = loadG1Batch21DictionaryBundle(reviewed)
