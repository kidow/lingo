/** Fifty grade 1 forms (batch 9) individually reviewed, including 8 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch9.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH9_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 50 approved and 0 held; 8 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH9_DICTIONARY_GEOMETRY = {
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
export type G1Batch9DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH9_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH9_DICTIONARY_REFERENCES: readonly G1Batch9DictionaryReference[] = [
  {"glyph":"腑","strokes":12,"corpus":"MM","originalMediansSha256":"f7e46c505c89d54fd10b166998665c56b6522f8efbd668617c7936a74a14a7e6","pathsSha256":"171aa9d12fb6326a63e551a2e1dc0492b3405ddf5fdefc12df6fcb924e4dff80","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/8151.svg","dictionarySha256":"b8c8bf9b72353246937e40075a0b3bf6d5a4dd0d515054c3faf41df8d9d016f6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"斧","strokes":8,"corpus":"MM","originalMediansSha256":"cd750839f33fc3e5fd70d53c6014e7dc999df0890f519d555b1e641ac5b0db09","pathsSha256":"7600e137563828249bad21cfda74684e9f30acc4b289240342195c4fdebe888b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65A7.svg","dictionarySha256":"dce3b4aac917e56accf7bb317bdb1e685adb54ba3ef6faea4408fe6670238dc1","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"埠","strokes":11,"corpus":"MM","originalMediansSha256":"e90df354a4f57edd9c5a38ec30a378bf779ba7ecf6a31cdc43d68d1f0e3ed600","pathsSha256":"ea3813ee78f909cd4468b118fc0bec3ba0f2a38a454668d79abb151d23aa0829","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/57E0.svg","dictionarySha256":"e127a37baef032c89815ba6ccaf9b9aa278df3e79e9655383971b6ca2f5a8997","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"咐","strokes":8,"corpus":"MM","originalMediansSha256":"1d8433ab8cc9c42327b0e3c52af2b2e48709b9008acf931b8e6fc9ee3553715b","pathsSha256":"43cd18e5ad89899b71a042d2c1bb50393828329fe687ca5cc76035cf601501de","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/5490.svg","dictionarySha256":"2ea67f95e50e75a1a70ef3289546f3f6c3671881f70b764613dfa59f62f887ff","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"剖","strokes":10,"corpus":"MM","originalMediansSha256":"3a96ff72dd223b871565721da6adb2f41d2be5b961aebf8becad30f6690e94d9","pathsSha256":"d57a0fa2cb3806c7ee54ac007874ff05edc1f6084bccb1b0dfa754aff7f084d4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/5256.svg","dictionarySha256":"c82e0c0e6a16746fe45fdb7a4c98aab3b16cfbb0a600cce369451163f1a0ecd4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"俯","strokes":10,"corpus":"MM","originalMediansSha256":"d7ca9452881d19728133ebbd2d68fec2e8040fbf6f1302bba604aa9d6490a009","pathsSha256":"91d3f649f79195a681b1e5aa43fa823baf52e2227ecc6edd13cca9d106b7c113","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4FEF.svg","dictionarySha256":"fe6dfac2973ff3fdaf5910de0237fe39d9fe943ce410c27fee38c7edacac2c55","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"孵","strokes":14,"corpus":"MM","originalMediansSha256":"42c753a0bf60851d6efceac085e9f1ae0a0fd91fd8afd4ff3540e34be25d4b23","pathsSha256":"433bc490c18de390cad9488b49929eb53651b66a1f74ef6ae539028b7196d58d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B75.svg","dictionarySha256":"5b3355e53417fbb65cf0e51c0a84f8d560d5b7567d6fbed96cce1d2c3212388a","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13,14]},
  {"glyph":"扮","strokes":7,"corpus":"MM","originalMediansSha256":"36e1ce932337e845974df540e29798f26dc1b12a563af17195054b57882a2358","pathsSha256":"f007c4fe4b283e43e3afab13383fbc8c1b9696ceef9a139b02f6e1e639298203","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/626E.svg","dictionarySha256":"e864279c932445e04060a5fa0c7faa175e0f2769387d6dfb17ec00be10f5ed6e","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"雰","strokes":12,"corpus":"Ja","originalMediansSha256":"407f2bbb6bd341274d51126c75067d02869eef96946a26328526f90989a96aaf","pathsSha256":"063fa84bccb0c8ea6f31a412e29f70aad8b1a4b90558575ddb0cb3186079858c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96F0.svg","dictionarySha256":"c2668473a1e00d108b2fbe796e2727408039cf46d1b303d5c71746a20cce3bb4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"盆","strokes":9,"corpus":"MM","originalMediansSha256":"11625aed7ea4be3fd440317184c5520979ec806ff72cde71b587d263b868eb05","pathsSha256":"8e090c2806b0bfa540efee4be6488b798ec608e2d63949a1a570e36c58fe01f0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/76C6.svg","dictionarySha256":"e50ca629bf6708af320c0e07afb202bd5059d518df7ce63ce03ff868920c5f56","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"焚","strokes":12,"corpus":"MM","originalMediansSha256":"100f7473b7555ebde844a8a3bda2113eb365479e28e7f5ada4671e2ba4f21314","pathsSha256":"812272888598ab7558df6757238d69a9a1ef41f73873708eb7fcbdabfe242d2e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/711A.svg","dictionarySha256":"d77b555d685453d5952b539338a26f9ae5278388d82730ea1be66dcbc5cfe0a2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,null,10,11,12]},
  {"glyph":"吩","strokes":7,"corpus":"MM","originalMediansSha256":"727661cfa4e90a08386533efab48da3bb1935e64f5ae98c0d37ccde971ee4728","pathsSha256":"9ad12cb03e7736f9d46dcd4a20378ea8b8381f237219d890605870da624e4a58","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/5429.svg","dictionarySha256":"91f2a1db76f844fc356f0d105ea0b23d1384b8759545fceea837e4b4896b4819","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"噴","strokes":15,"corpus":"MM","originalMediansSha256":"26a15840e52fd5baedb300b24c2114bae4b4f8dd83e22aa9c7409caa49dd7593","pathsSha256":"915a954cd0593b8bb1585aae2d17361ce8134f6c0aee6749082aa694e90a4079","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/5674.svg","dictionarySha256":"2ef27fb0d966c670be5c9e1d43f50cb8a827679a6acaef375ea9133ec79b1c2a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"忿","strokes":8,"corpus":"MM","originalMediansSha256":"5bbab1a83d25076205ea12ba3ce9b87a3d926787ee7d282189913e5dfaedc524","pathsSha256":"6582f09445b92f9a53c234ba668902a3b3d3b41c633f60ca46947f23a28aafee","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FFF.svg","dictionarySha256":"a01ffbb1e792212cc1ea84ff3b6c479d3bf942d1dff35167978740f532eab429","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"糞","strokes":17,"corpus":"MM","originalMediansSha256":"b0a7c05861d8808ccf03782f2e0c356d81ba356332155ddf99e97703c1f68b16","pathsSha256":"1eaf713630ea8e56dd8c06f1e238238347362a0741a0640a35b0beb454e9935d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CDE.svg","dictionarySha256":"8f656efc874059169b4281731d1e80ece670ca6e62a69a5f03d6ae090eb1ae2b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"彿","strokes":8,"corpus":"MM","originalMediansSha256":"b276eda328ee0e133ab0c581b5060dff058b8556f9d4a2d056794ebad8f302b3","pathsSha256":"b99380796e7e4cce9dc0ca1e248a56c700ad80cbf53c0b0bbb438768047418e1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F7F.svg","dictionarySha256":"919d5ed70b33cd5de9c4fe9635812020b5c7ba97c2b10aad8eb3f080f542d8f1","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"棚","strokes":12,"corpus":"MM","originalMediansSha256":"eb7e7e768ae12a6058e9ef4dfe1e9c310ebb24fd510a77cd567b03b3531468b2","pathsSha256":"efe2dc5e5658fc47e0a2e384d0964e9250856c990af6bd60cac633b9ab8a7fe6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68DA.svg","dictionarySha256":"5aec0e82018a23dc93bb94c53ba8d50fc228fe1698843176a34bf943188bac95","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"硼","strokes":13,"corpus":"MM","originalMediansSha256":"53d2ac85f91f3adbe09a4c4324fb0ff1237e13f59b203b54fbb93d6705f66356","pathsSha256":"4226fd88cd7c542d480f19997d39bf5484ca048d4854919a8976b5d7f3ea9b97","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/787C.svg","dictionarySha256":"9384a19d59f866ea63b511a222a79c4b473ad73adaf29a9f16e2ba20976c0f07","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"繃","strokes":17,"corpus":"MM","originalMediansSha256":"121877b7ac7393cb89983e8fda74cc07cff5ced3a22624143d7eaf0fced7ba84","pathsSha256":"f0dd207fb49cf7dea987f91de4ad843f5c17732fca541d8063faadc4e94e47a6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E43.svg","dictionarySha256":"999893df8bed9af221ffe272131a2aefbeebc05a995ca6540b3020964ad38361","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"誹","strokes":15,"corpus":"MM","originalMediansSha256":"4808c9bf3a9828553cdc281ef417dd0b324f3dc3fdc9b38d60f32a02829a707b","pathsSha256":"e3bc8de34a8e425a4710cf62f6b9af80f6e1345c7a2395cb85863aafac5dc0f4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8AB9.svg","dictionarySha256":"72f42c724d3a3d9b109e884d532be1cb9f326c802ce5ef2d78f2e39a3b446435","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"砒","strokes":9,"corpus":"MM","originalMediansSha256":"c4f55996ba722f45b49745f06b9ae509641925b5ba42b38a69737a6f32e0339b","pathsSha256":"085d170f2a7a8a41fb9531f6bf948302ceac8c9f8b131bb062e49c116936f98d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/7812.svg","dictionarySha256":"7e71c0436a36c9e4231eb6bc76fa62efea49fd1fe843397985f148c68315857e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"妣","strokes":7,"corpus":"MM","originalMediansSha256":"a5b39c5c2a9a741240f8cc002ba852f1d0e1a72d52fa42472c4f9913b0de21b3","pathsSha256":"2aa088509c2b00d59bddf4edea32a80af5fd16f6b604465ebe4be345316606e6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/59A3.svg","dictionarySha256":"53552c1128d8e1cfceee08ebcad2f624e9c26bfe2df550a3fa8ce0eb9d62c190","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"鄙","strokes":14,"corpus":"Ja","originalMediansSha256":"02368a9f1b9f8171cf64e64fa2d7b55676b68183fb19288ac3405f13d619de57","pathsSha256":"f3fd4bb0f4005232d7373974b01e80f077b79c459530d943177f42fedd18209f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/9119.svg","dictionarySha256":"bbdc13e67dbd811d4fdf0a7d828c70b386e21fc718ff92f77b843fc555358fe9","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14]},
  {"glyph":"譬","strokes":20,"corpus":"MM","originalMediansSha256":"5dba13e048bb295afaa91a77cbdd19cd6fddb87ada0b9d5248fe6e1eb324cc60","pathsSha256":"e366da9dec0c2344aca405fb78bdc12a79a88936bd06e31b148c5f813171cdbf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8B00/8B6C.svg","dictionarySha256":"0e0dd24efc04decdfb2f4770cf18ce9c04edaefd23dfb49faae69d0492fb01cf","sourceStrokeIndices":[1,2,3,4,5,6,null,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"裨","strokes":13,"corpus":"MM","originalMediansSha256":"c6cfa59235ec1c233cb983c0cce002e4de0d444e08c6bb2164ef654ed904eedd","pathsSha256":"58d185148fa936cb2d45e36a64d08705ff4d90ee5a099238eaf0f4390b3d96a8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/88E8.svg","dictionarySha256":"86e2abf241d59ee10daa64900faa7d70b22dd79a912c9230be8dc96e1676f97e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"臂","strokes":17,"corpus":"MM","originalMediansSha256":"7b0c66879bb98ffaae01fc6390effd096b1bbfc246674e8abb085d8d9163d880","pathsSha256":"4e22a998caef1885ae4113b52a6a9010e7ff25c53586ad47260b5ed708946d5a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/81C2.svg","dictionarySha256":"502e2828cf24b6e082695bc7706e3a2bda800a1c502a550f1539c2b88fda3238","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"脾","strokes":12,"corpus":"MM","originalMediansSha256":"a45d4e1853f45a9a43e29ae38af2c3f7efdc59512337ff2ddc3017a453a8d40e","pathsSha256":"ee91570595f9953c6165995a6b8cae6fda0d245a02a731cb9ec4185f3a606d05","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/813E.svg","dictionarySha256":"0a06e476a987459de7e7553ffc15b6066c870e71bea22bf3a41cd6bc23ab76e5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"翡","strokes":14,"corpus":"MM","originalMediansSha256":"740b5f4de15bfb209625c9a5d494a6094a75932c8002c2b10f8b9ab35fabe803","pathsSha256":"df649435b8423bdb69e277387d2c3922f33f785e637b63993fe5e4fef8ed0b12","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7FE1.svg","dictionarySha256":"061a3fb753270e3ba9cf0723f2590fb590e4186c7b38f40b3672b673827cdadf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,null,null,12,null,null]},
  {"glyph":"扉","strokes":12,"corpus":"MM","originalMediansSha256":"2fd60783b1bc057c6e0d8691595fcb41e278cd26086e4072273336952f304e41","pathsSha256":"177e8c340086bc3ab97567c73ffe6ef2ba2aaf5703e6b0d795fe38826529e623","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/6249.svg","dictionarySha256":"a1ac761baa8972592aec2486538ad93c98dd422c18a5bf1fbbe1a4e330e78268","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"秕","strokes":9,"corpus":"MM","originalMediansSha256":"a170d1d3a393132c2bdd04070816d0fd42a67f37b3682ecf58bab55554929dc3","pathsSha256":"bb4701c5545efe4de7fcd3f3bac29ab7b9a01096c6b12bfa3a8366cf831f9fb1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/79D5.svg","dictionarySha256":"8dbd935db7dfb044c0c87f4ac9b820bf83a19cb0ef7004cad7b9e1a6e6cd07fb","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"痺","strokes":13,"corpus":"MM","originalMediansSha256":"6a5467e46c4a0a4f8de8d5d476486dcbff391b279792f3e80dec524122544790","pathsSha256":"66939de419a277893426ff61d5fcef1babfccc6d542cb55faeeb5518bee4cbe6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/75FA.svg","dictionarySha256":"29f91b3fa4addf6e4ce1977908a02f34dff13e285289579b8916ca70ff52bc3c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"琵","strokes":12,"corpus":"MM","originalMediansSha256":"45bacce078b434fd0deb8689c44ab5da68d7a7fde8e117d320bbf0f847308d2b","pathsSha256":"34ca0ad660c9ddbf483d0c0f1f7ec8710413a4ccad5565b7bde42005da7ca5ee","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7435.svg","dictionarySha256":"5b6daeb6455f061a34eb241bef3a20213736221466054d2a85d5359ed665ac0e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"沸","strokes":8,"corpus":"MM","originalMediansSha256":"05ca3781fb3e008ee44272829be8472fb3443802f484a92a3442c7f84bd01744","pathsSha256":"5635605db1d426d53869b2aaa83a262cc8d46449bebc3e4617b515350d635f2a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6CB8.svg","dictionarySha256":"8bdc3eb851a996200c8afdd29a2dc9260b4b76f54caac010a1064ab32252686d","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"憊","strokes":16,"corpus":"MM","originalMediansSha256":"1671a050e3d25e284fd0d8b17e5278bca13c5dbd496a485497625f48ff49ef4f","pathsSha256":"71d36bf5d2761ef97ee3a69ec3565c0457b77e517dbe71fae92f5a7987a9c35d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/618A.svg","dictionarySha256":"b39ed51503d5141e694ee09f0f0e35f8dd70dafccf40abb2145dafbb42ccc439","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"匕","strokes":2,"corpus":"MM","originalMediansSha256":"325dc7add37bc9d23d2b64f6763bec38ea7fefc56158866141e313e1133ef6a6","pathsSha256":"ce989dd7891e3bfb80a6a1e0129b796d2a6f3839989b22fc7b49dfcf1d257632","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/5315.svg","dictionarySha256":"d802596366b01115b0105bf28b2f18af4fbf8519a574a1aede0239f3cc1a2021","sourceStrokeIndices":[1,2]},
  {"glyph":"蜚","strokes":14,"corpus":"MM","originalMediansSha256":"2fb58fac764b73a705a5aa29791e48575b0d61ebac89e6ff9b05bb13a9cc2064","pathsSha256":"229a718b74cc330263d3afd34a35f68cd3745b3276fa6ac43b402f3c4f22b612","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/871A.svg","dictionarySha256":"614e318c173b3339b2ef2037fe24d0892e9daff4211e6c4cf10470b28f66b896","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"庇","strokes":7,"corpus":"MM","originalMediansSha256":"0d3d8300e898dc349516f7cb407839970c84484dc3d602c9eedef7e2d7be0cae","pathsSha256":"3c888af91c1c61fea6a6d10863cbd26922184eb7cc6f1b92bab2d54ab9a44eff","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5E87.svg","dictionarySha256":"d0755a8eb881684719e0311ce91cc5b0f6203acf69c1b64b9d100e8003513b1c","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"緋","strokes":14,"corpus":"MM","originalMediansSha256":"29a53e28a25b3d561226d2426e119895ed92e6bb2dfdd8e13445cbf348e91439","pathsSha256":"29429a14d13a1ee53bfe89cf9e27ccf7bf0084d184ebd00e18e9146bbff02764","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DCB.svg","dictionarySha256":"bd9b3d59984e1c0857da35fbc33d0d8e47a0482a41f94d7e930ff214eaa4ccd5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"殯","strokes":18,"corpus":"MM","originalMediansSha256":"645a7210a1474082cb5ba698eb4d63beede6286b71514a7332d580deacb279b9","pathsSha256":"10af1930ca6da1ac686defb9e53a82b7fd09115372ec39cb08678d022a1dbd0c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6BAF.svg","dictionarySha256":"78e13dd446ea5513c5a248f8781b127048028cf930b9b3f03529fc986ed2e1dc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"濱","strokes":17,"corpus":"MM","originalMediansSha256":"d9f482f768462cf6f588beb47eb6ea477e88dc0f77afe89b02e0d7a44770e48e","pathsSha256":"9ecb5fa54377ce0a542bca63fae2dc0627c810def33df5fab7301334ace4af30","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6FF1.svg","dictionarySha256":"6b1cd909e42a94cdf8f7d9280ed23f8463666230d26d5b2722b064616102f400","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"嬪","strokes":17,"corpus":"MM","originalMediansSha256":"f9684d972da1063a606d6a515c200ed6f17818eb295843e77e1eef3a34291af3","pathsSha256":"123d230b037a438bfcdb02ecb92c668cfa05f36505a4e5618952bfdf1cb18877","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B2A.svg","dictionarySha256":"2ce32eea8b64d6bf937f9c91958313d2bfcce2860018e573442e1b9bd7911294","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"瀕","strokes":19,"corpus":"MM","originalMediansSha256":"eb52d8b597dc6b639f4e4c7b55144f7e08b816a832887a879b58c8a697f89ed8","pathsSha256":"9d8fa6138e19531251ca5693ce726583c665223a9254bffc4e05fd48b5b151bd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7015.svg","dictionarySha256":"80ea398299cdf471738d7fea204262d5f8df53c8bd529ec16380c4c788a9a081","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"憑","strokes":16,"corpus":"MM","originalMediansSha256":"7c512874da641658662cdcb35e86d676a26610bcdf8ce4a9d72124516e4cb9b7","pathsSha256":"e1a63eed0600e782f5aadb55de1734aea20919967ca111da9cd7fe2671fa5fc9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/6191.svg","dictionarySha256":"d97a53a5de8f315913bb1bb352c8956527156e8521a30b0ca8bf1f4abeca3f8d","sourceStrokeIndices":[1,2,4,3,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"些","strokes":8,"corpus":"MM","originalMediansSha256":"5fb5749ce0e0c776d2d847a1fe9f56bcd002b1d174725ad21a50418bf84e1964","pathsSha256":"d3ec0b176e535b3a6fb8b7ec1f7d89a3c04c4dc7825903384b82e115031bea42","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4E9B.svg","dictionarySha256":"708c265b42c812fbf272db9db39f806b7dea4fc27b6e948847b9c56318353e1c","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"麝","strokes":21,"corpus":"MM","originalMediansSha256":"26a284128205e522f4dc1bde0d0c2af3c495ad81457aa4d92d52c08456dfe336","pathsSha256":"949ff3488ae55497462732190d7186bcaa65bc52873e9e361551f2c8def5da04","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9E9D.svg","dictionarySha256":"afd9d59fe4a1cb1088644484f247abe8e36bbb361a8262c5c17dbd94c6b4c3f9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,null,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"祠","strokes":10,"corpus":"Ja","originalMediansSha256":"4ee301130c403152326402f4ba7ad395fccd4abc8a0f9e2375caa0ccade866bf","pathsSha256":"efd95db1c9ea002fb33f14e5989e9a5369df52f7768908adc3495526253fee13","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/7960.svg","dictionarySha256":"e6940380321d78e08c66d6eedc6cda3608325ebd477d1779afd1fd5386ad5790","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"紗","strokes":10,"corpus":"MM","originalMediansSha256":"2fb98bbacbd17ec2e37b584bdabc6f583dc45c0eb6d5f5f3cb271d375f4d1950","pathsSha256":"9904808eaea88d55d76421bc5c34f8ee911680c14a902f95031846fd124cf427","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D17.svg","dictionarySha256":"f3c2ae346328eff480453b0949e0f1abf373cfd38a4a6e06b9998b716a3b0f3c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"嗣","strokes":13,"corpus":"MM","originalMediansSha256":"6fe42c5602575756e53f0b5f3316d7958a33c072c516bad71f50bbddbc6cc7b7","pathsSha256":"2c5c1ac6937b07d7716c153436215cd7eb2d6f6ff25935042d52eabe2b8ac7da","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/55E3.svg","dictionarySha256":"39875e4d60f92a169cf793404eefcbdc23e4389a4d3a7be4233fca11d3ed75e9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"奢","strokes":12,"corpus":"Ja","originalMediansSha256":"29f4c74c25803f2bcd295bff358bbb5e9e9d9d974fe69eeb595147061f0d988e","pathsSha256":"5b0c0454ec559a84d7bbf1f33bb3ebd99a079e5c1abab5b24d60650521eb13bf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/5962.svg","dictionarySha256":"d30574e781642fd7db5ae441e239be23af038656ad0b9934a80cde2bf9ce145a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"娑","strokes":10,"corpus":"MM","originalMediansSha256":"3ef75cb40a76c47f3dc512b1e6517170623b7ed1ea870d0f19ea969163afdcb8","pathsSha256":"3d7877aac3c6fa0b9f65e81f5db70a057c0d50577f9ff559bc08e7db93c19108","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5A00/5A11.svg","dictionarySha256":"1f239d9a8b34e0b997cb83f7795918f519fd97c4f16fdf9a485f32aef88c385d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
]
export const G1_BATCH9_DICTIONARY_REVIEW_SHA256 = '043431773be4f8d51c7fd591e18e62d54c1bde022d5473b0eb82ca64382c4a38'
export const G1_BATCH9_DICTIONARY_DIRECTION_SHA256 = 'a3d6b3627095121c0db181d033747d96275c051bdb2815f15d6dd6a23ddb06bf'
const referencesByGlyph = new Map(G1_BATCH9_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch9DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch9DictionaryMetadata(ref: G1Batch9DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-19',
    geometrySource: G1_BATCH9_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch9-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH9_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH9_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH9_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch9DictionaryBundle = {
  verificationSource: typeof G1_BATCH9_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH9_DICTIONARY_GEOMETRY
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
export function loadG1Batch9DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch9 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH9_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH9_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH9_DICTIONARY_REFERENCES.length) throw Error('G1 batch9 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch9 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH9_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch9DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch9 dictionary entry mismatch')
    return { ...g1Batch9DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH9_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH9_STROKES = loadG1Batch9DictionaryBundle(reviewed)
