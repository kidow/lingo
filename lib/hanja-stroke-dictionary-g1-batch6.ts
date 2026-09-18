/** Fifty grade 1 forms (batch 6) individually reviewed, including 15 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch6.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH6_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 6: 50 characters individually checked, 49 approved and 1 held; 15 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH6_DICTIONARY_GEOMETRY = {
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
export type G1Batch6DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH6_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH6_DICTIONARY_REFERENCES: readonly G1Batch6DictionaryReference[] = [
  {"glyph":"鈴","strokes":13,"corpus":"MM","originalMediansSha256":"02e56155865a9302a06d40a4807e9e628e8fbec6e624b30523951b2d94095b8a","pathsSha256":"bcc2bd84fcd923eb45820842b6ec04c7c79ce9c6780fb059bd084d864e06f1e9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/9234.svg","dictionarySha256":"e3791cda25a527268c98343e7116f9f3b8924c059b3cd2a02978f31db07e0411","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"虜","strokes":13,"corpus":"MM","originalMediansSha256":"e68664046db5dec8a570fe1fc6aae0fd342280430d08c5ea4ee815c06b6dedc8","pathsSha256":"1181547b2bfda27ca55622773a0411ea63a654013f98115cc9e62ab0434c0eb5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/865C.svg","dictionarySha256":"d12d6608fe1732831155bb85963fe4e0bb6c89561edf896d6e3f4d460af0aec2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"撈","strokes":15,"corpus":"MM","originalMediansSha256":"1625fd4243136cd4a7ea5c041fb45996c4ab8fdcd8192a15ccc10ca39c0ebbb5","pathsSha256":"0369c4f5e40e21492f100ffdc5e0181f289ccc2e4e7c9073ac3434ce773cfad1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/6488.svg","dictionarySha256":"b981cf37a16019f92c1ea201f65fa5576e2510edd79b8c446003367f17b80abb","sourceStrokeIndices":[1,2,3,null,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"麓","strokes":19,"corpus":"MM","originalMediansSha256":"c0ebb6c68e51af4ce371ca5e2817d4b45d10d593f095766e7c8ce75cc89df5be","pathsSha256":"5ff9099865739711d4bfc8164e7004e735515d605706fc5c9974e922d04b7e9c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9E93.svg","dictionarySha256":"dc07cbacaa3639addcd921ae307071d392f7733af4de9f3e85d4aa027dc1142a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"壟","strokes":19,"corpus":"MM","originalMediansSha256":"4b5def4cc1bdbca404a5004ff7eb540f1ba09b129a8e1db8742678868f7a280d","pathsSha256":"6f80eaf5ddd48dace59051bd9a076e25822b06bf20aaa53b27b2a8732130c104","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/58DF.svg","dictionarySha256":"aff06a2174a5aa81262fbe8a1e101f056dc03be11546412b05f179d6dd61d34b","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"聾","strokes":22,"corpus":"MM","originalMediansSha256":"62034f1f4362bd8863e164b5f8723141fe9491aa0f1739fdd71932e9caa3ca69","pathsSha256":"9d6df588de8ab801330fd4a70866aa16e4aae3e9130b98356c0b406ca85e94e8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/807E.svg","dictionarySha256":"aec25a2564575393800491ee5a371c4fc6225c05c991c2dcc5f18d9b779c42e3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,22,19]},
  {"glyph":"瓏","strokes":20,"corpus":"MM","originalMediansSha256":"5a93d68fe466bdb6d417d41534d6a1d5fd2bb8cbf21d899e4ba3c453b8d0ee36","pathsSha256":"823acde7b15931ea151b295b37425ba089bed51547c9e585ce0ed7d02fa9c4fc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/74CF.svg","dictionarySha256":"5626754caca357b75bdea20b098f499ca711ff99d8d44bf76480410394843478","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"賂","strokes":13,"corpus":"MM","originalMediansSha256":"4c2798f3a494946a007338e63a92ed1859c63abea80979e5e386d455aa717984","pathsSha256":"0a580c8a7380b14ceec3c5b2342bfc4ed885e1c13d93d6099760f6840e6c5272","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8CC2.svg","dictionarySha256":"258a2f3884108b032e1f4e64e1dd1d153a0a281a2f59d8282744bc8bfa2ad037","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"磊","strokes":15,"corpus":"MM","originalMediansSha256":"d309db107e8bedafaf90c45b02364432d6fab32069bfc56575ea189c472969c1","pathsSha256":"91b46f7da3afd9b18da4a12a784bc8de3e6ee1c532de4373e9a9253c5905c6cb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/78CA.svg","dictionarySha256":"908b4538ca33db3f5bcb440f79c10ec0d8f87fef2da24ad2a5fe5fc8d770cde6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"牢","strokes":7,"corpus":"MM","originalMediansSha256":"7bc7f9a385306ebd75684c844b274cb421d33048f9e7ff91fde042ab73cd7645","pathsSha256":"99f52c607fe605fd78c4748174690ffa6223b2829ec8dfff1b7c163279b558f7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/7262.svg","dictionarySha256":"a1e419e4fe9500621d450c7fc22167412943258275afe8becb5b91f2d9b4ad31","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"儡","strokes":17,"corpus":"MM","originalMediansSha256":"022d9eea7c27997dad10bc128a60588d75630994e18aff995742a795f29e9dda","pathsSha256":"fc3e74dc6c020f80947d4442b45049a11f53127186ef453930852171568a1da4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/5121.svg","dictionarySha256":"4dbca1eda8cccb588dee99b0628101639d5eae3e17bb2e13232a20fb3a018b03","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"燎","strokes":16,"corpus":"MM","originalMediansSha256":"3925bf1f291b745c5dfe98286b97c6a98aa5099e20399f1307e344895ee4ef7f","pathsSha256":"b3a16fbe8dfd0805e3cc03f94f47630f14300231d54de15e2c845214eb0340db","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/71CE.svg","dictionarySha256":"ecdf96ca92629ff40f0145ef3696a349f771678fa084d51e8e2be5dfa7edd041","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"瞭","strokes":17,"corpus":"MM","originalMediansSha256":"ea511a2081a2b1a62a23dfec994c0cc7f593453681bc7ec609d51077b7ce5d51","pathsSha256":"7c40c03ae2bb93e1470ec4cfe99821a17089d8d3c6dde901e5e8db66ea116bfa","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/77AD.svg","dictionarySha256":"2e3921898a9f658d79da32dc5b924285d2bc8aa08ac1763f18e2539ee118f929","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"聊","strokes":11,"corpus":"MM","originalMediansSha256":"af3a0d6febedca719eeed8a9742a966cbde38429cb094b5e54e97c082c756d5e","pathsSha256":"f4b164702b8ca85b8e9695cb9f9a95dd4cd3e5000c7b5d06230cb3760e055999","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/804A.svg","dictionarySha256":"80cf7884e1f326a22f2eaa2a1e3deab15d99e70a585918964ba670571e189b87","sourceStrokeIndices":[1,2,4,5,6,3,7,8,9,10,11]},
  {"glyph":"寥","strokes":14,"corpus":"MM","originalMediansSha256":"633547d9f97b3df2d3efaffe92ac514c5b10b962c4b3bb4736abd9e9921c81d4","pathsSha256":"963f7de8291fbf9a868e144c33aec34120ceb96ac8dcf7f383ef840b9e9ef740","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5BE5.svg","dictionarySha256":"ea264b9e1bc11d01299ec94599e152b8723fe17cd71227dae2fee8fed5e870c0","sourceStrokeIndices":[null,2,3,4,null,null,7,null,null,10,11,12,13,14]},
  {"glyph":"寮","strokes":15,"corpus":"MM","originalMediansSha256":"d7dfd984f3c472e9b8a3fb669e9a4983d6fabfeabc908083c00ce85bc1666c6b","pathsSha256":"edfa982faef7914437c4568eddebef958b94706bd9598dd0651a01c9e1e87d70","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5BEE.svg","dictionarySha256":"fc09321fc1ba8624395f4ae114820f19177fce63ae883efe431164102b6554d2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"壘","strokes":18,"corpus":"MM","originalMediansSha256":"4839fd0c2470a20aa63ec52d16e1cb52a2e774481bc559e601b12082b040fda8","pathsSha256":"cba5393c86dc39e54eed14b9ed2f67770a7c48aa779adcb63a60253ea2829e07","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/58D8.svg","dictionarySha256":"3e0e91c6df32b5b6c923f556c899f97ba81855fb323971883cb2179ed1b19efd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"陋","strokes":9,"corpus":"Ja","originalMediansSha256":"efa88b5a163bfc8a55e53eea08b07f3fe621a275f9607400d770f15779f38233","pathsSha256":"0fa7fdb29a434a00be9d647860775ac01604e3a440882140c65e935d4d549fc1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/964B.svg","dictionarySha256":"4fe8a8ed668718e63c5e7c3e56c102da18ccde68e3cfbccca8f5f0307de6dbc7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"琉","strokes":11,"corpus":"MM","originalMediansSha256":"f87621a4ba1f32979355d95386fbc58dcfc18280729a3c4cc6328a0b204f2c62","pathsSha256":"4dd142a8eeecd2aeb1e1ef2ee1b90ad026ea4965169b20200a9a04852d1143c7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7409.svg","dictionarySha256":"ccd49e4de32919fc2ec97434614caf6dcbdac124cfb67bc058e055794a9f6785","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"溜","strokes":13,"corpus":"MM","originalMediansSha256":"93665b245b98a52a51f3f6ae633b3e216831b71da367a9c87b382674ba028163","pathsSha256":"055783671ffd45cde46f61d0a7ca6d34c002da2ac54c03d129db03faf8c46fb5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6E9C.svg","dictionarySha256":"f6c76f4ef4a2239133f26c40b391d04c91db3e318773f36703accc8ae9b320ea","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"瘤","strokes":15,"corpus":"MM","originalMediansSha256":"8d8588c194d2de044c2ee4ec17a16ac38ee659b0ae59bd29bcbe427e171dab91","pathsSha256":"e167f00713deb807fd21d27edd061c5840c0652efd7073fec74e8ac10634d25f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7624.svg","dictionarySha256":"3ba13100d1aa06e6f355c571ba0ed75fb89fd22eac2437c79d9a56f4ba86e711","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"戮","strokes":15,"corpus":"MM","originalMediansSha256":"7883151f20c0da719bc1606dffdfa7624d3dd7346126de1fcc706d4b7c1b5360","pathsSha256":"64081d609ffd49d405c18f35c839044c512906c300056ea0826777fa7b2fb672","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/622E.svg","dictionarySha256":"13ad05731fbf6949a9acb2603b020877d7b15cc0b3eda0d79d33f88b970c626f","sourceStrokeIndices":[1,null,null,4,null,null,7,8,9,10,11,12,13,14,15]},
  {"glyph":"淪","strokes":11,"corpus":"MM","originalMediansSha256":"2a084e6ca21812c1e23492508a76b4661a221fad59d8331d070efaad7ec9a427","pathsSha256":"570d754570c70623cfb8cf3462931d57564b6bace2c91628ad46bb8649cad27d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6DEA.svg","dictionarySha256":"4869e9430c70e958816700c96bca4c7a967d519125320102afaf963641852991","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"綸","strokes":14,"corpus":"MM","originalMediansSha256":"778eb7a2c19115914a9c26dcbfba2a845006ee51615174e606c7b46e1c84d875","pathsSha256":"4ed8b45d0179ea54bfe9ccb679ff01132c12f639683dd9a575a6eddf993d405a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DB8.svg","dictionarySha256":"a44d7e0d95524f32c1d3ba766c910d8e78ee14b8a9c3cf6bba6d73eb59336500","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"慄","strokes":13,"corpus":"MM","originalMediansSha256":"a33cd0d062610ecb6bb7776d087d9791baf316450e4fae1beccc55cea1ddbcc2","pathsSha256":"7b0851f24b3f0ebc8bb21583b8ba771f7dab4ebdbe39858dc85179d1c32a7ceb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/6144.svg","dictionarySha256":"15652241879a71f6d2b854364c4535fedef5d52db94115ee3bddc125d7a6b9e7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"肋","strokes":6,"corpus":"MM","originalMediansSha256":"dc0abbebff4899bee6cf21d6722a1d413bdff0930779118ed11c36ccac06b540","pathsSha256":"3ae52a993923198cfa970366fed5c4c9ff1b9bf217ea25b15efb69e689779bf0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/808B.svg","dictionarySha256":"74916ec4f7866542b3c010bc0967846e33ef6f159c51520ee10936a6abf63a5d","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"勒","strokes":11,"corpus":"MM","originalMediansSha256":"00ff22eb63cc0e9eaddb81ed6439e2ef43753c8e4e32fb734e7bbbf501ae74cb","pathsSha256":"726e8ef9a0e5b9b240a10aa1b567790ef89a9f084a856c3f6ab27321b91d3093","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/52D2.svg","dictionarySha256":"b5cd8705a8e23914bace6d69d491d123543c48880f796d87381a434f00b7fd16","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"凜","strokes":15,"corpus":"MM","originalMediansSha256":"9180eb60d872c208dfa54dbcb0604d0effb4adca234d03d9616c59225d0e6155","pathsSha256":"1eeae75426916cfbcb5a822d342884fd954b9195737cff0c02cb5c378eba32d6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/51DC.svg","dictionarySha256":"8dd1b04dbe9826d190ca393369e0d324865b4bbc5f9813286a10d5485f389cdf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"稜","strokes":13,"corpus":"MM","originalMediansSha256":"ad14c6d891df645732297ae9dcd6efafa6c187f1453305da4ee872aee08810a8","pathsSha256":"2c27ffb4514eff9c09dcfeae71c5ccce45e0aa27c59aed9795a8d4dc1bcedcd3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A1C.svg","dictionarySha256":"d9b3e515845905a8f8b2da59294c2a99898eb38b87de4bd196536dc4dd7e164f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"綾","strokes":14,"corpus":"Ja","originalMediansSha256":"08bad1a5c7d829078f694584c7f3baf4c8a8c72472c23c8ab7d7f3f264344a66","pathsSha256":"b77d3d940805d37691d55f9b6900152499360c1a715ab0509239e349f511bcde","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DBE.svg","dictionarySha256":"6cd94c25382358ca1ce481dcceefeab44fd6357ac75a90c1bf420ae45adf6196","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"凌","strokes":10,"corpus":"MM","originalMediansSha256":"bd097149d124448646609b6f64960765af57f33cafe8ab39092dc58929b48e3f","pathsSha256":"1e15eb8b24933299510a2ad76a0ea894cac9aa4ba2d834626924f8bce56cd159","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/51CC.svg","dictionarySha256":"6b4788ed653f01712abe39acb22a639ae04abae985bfa15d338036f4bac66d15","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"悧","strokes":10,"corpus":"MM","originalMediansSha256":"534c691afbe831ee95418066a9717c3487a12542e805ae973bc735e01c7b1ef5","pathsSha256":"6b612deedf7ba0890177d81e27fbf622239d1dacc7a472ad166731182da19d2d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60A7.svg","dictionarySha256":"da406043307bdb344691ec1b2cb9f9265f3a011b26a73e2bcdfc3ca2d2868602","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"籬","strokes":25,"corpus":"Ja","originalMediansSha256":"f8849b09e9409dc28bcc6d4b495a92807d40a5370888a49a10b133b5f2f2b1f1","pathsSha256":"a1d0123d98772f077ed40d5aecf7096990cf249cbdaf5c61622df44daecb7d00","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C6C.svg","dictionarySha256":"8b79aed55e128cbfae6c563a98f0937ca703f3cfe3d24dac94553415eb98619f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,null,21,23,24,22,25]},
  {"glyph":"釐","strokes":18,"corpus":"MM","originalMediansSha256":"755a5269002c2eca150af42d730d52f22831fd00c6f00e1b521fafe81167526a","pathsSha256":"bdd45e15d5bbec674a186ed4f03f8a9a71408df791457b21ef3e6f9b4e33d938","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/91D0.svg","dictionarySha256":"a7785869026e5b5be003d2a6859ffc53d8c3f2422b038dbcdc9090691222bf1d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,16,18]},
  {"glyph":"俚","strokes":9,"corpus":"MM","originalMediansSha256":"8b6cc626baa2b9f4e2082a7704b54615a16fb5dd18ec33aca8f92ddfe9a2996f","pathsSha256":"40faa08589016624c00e60d6d8945828d083874aa17db2ec1d3c186084ec1067","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4FDA.svg","dictionarySha256":"54e578ffaab89b52ceeb838d8e26b64b7c66fab70d10c595a8addc9ffb505213","sourceStrokeIndices":[1,2,3,4,5,6,8,7,9]},
  {"glyph":"裡","strokes":12,"corpus":"MM","originalMediansSha256":"fd9042824758807bfbdc999ee7b44cab9d41a2bf2a44b8a955c0c1892c2ee46c","pathsSha256":"563629cb952911a8b6795bf40c6a9a3bcc7d1afdc037c1ef498039a3c939182a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/88E1.svg","dictionarySha256":"b008bd9bc03c55a704a97220b93bd3b5a5829d1aae521f782bf6b969d2d4b0bf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,11,10,12]},
  {"glyph":"痢","strokes":12,"corpus":"MM","originalMediansSha256":"65cacce167303c018caa8433d6a0d959f923932edb365d1ce72f23b25abeb7e3","pathsSha256":"dcecbca74c64353b44018c1813903a2d91d1a0528ad9be3ccf125d61da012104","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/75E2.svg","dictionarySha256":"e6a1a71068f251e095fc76d87a96868ebaf9315ed231ce50468f4c5a3ec1acc4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"罹","strokes":16,"corpus":"MM","originalMediansSha256":"45790fc09008842247587ceba8d370e44d093805ebd7c0e3733eccb9ef9c25b5","pathsSha256":"972e14358bc7a0b2487360c634483443530fd18415ffa2a9ca8f11313050d9a8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F79.svg","dictionarySha256":"fbe07916e04eb2c7031f3576fae459db496af8efd2709256e5c14fc3123ffa7b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,null,12,13,14,15,16]},
  {"glyph":"吝","strokes":7,"corpus":"MM","originalMediansSha256":"0e703c19572a790b169587cc8537e23d138f9d6d5ee79b32f219e355d357bddc","pathsSha256":"1c4e039693ceb3e3a3fe45b53543cd198aaebad1bd880f14ca3f796bcdc90477","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/541D.svg","dictionarySha256":"dc6a2ce7837bf9da109135f9dd2ee865f5b26e0170c2c7d7bf6bd8eb6de78b8a","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"鱗","strokes":23,"corpus":"MM","originalMediansSha256":"9d2d07c345e94d3e01d3fe22a5523a39c4bc068052305cfbbabb9cf498903e1d","pathsSha256":"cadda9350243c2611516ce98729db3dd147a45e07de233f058b864988414c1b2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9C00/9C57.svg","dictionarySha256":"c50448432aa1bd04e40c8335fb7b7ba1f90654c1927a96f47db578e36a15e56b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},
  {"glyph":"躪","strokes":27,"corpus":"MM","originalMediansSha256":"c9ce498b8de575910601923e41d67eb6a6b87852d540b381618cf7c7ebe2add4","pathsSha256":"4dd099eb3fa9d16e3487a63860283ebb36f0ed328ff5889e0d9afc3a21697a4d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8EAA.svg","dictionarySha256":"1478291a7d01d345f8e4275fcdcaeb8679040a00cb38fcfbec6a146c5db8204d","sourceStrokeIndices":[1,2,3,4,5,6,7,9,8,11,10,12,13,14,15,16,17,18,19,20,21,null,23,24,25,26,27]},
  {"glyph":"淋","strokes":11,"corpus":"MM","originalMediansSha256":"f6541295bc11da385d41209c630fdc44a6ae0fedfee25a4f6c0024bbd00c31bb","pathsSha256":"71ca959dbb29b11d2b79ea7a08217f943a973c554f4d6ce8a05fb34d04db50ec","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6DCB.svg","dictionarySha256":"d98aec459e29ec6ff847b7713b9a1bb16940ea254ad4cb0be7db39b3d845b9d8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"笠","strokes":11,"corpus":"MM","originalMediansSha256":"10763ebbdb52c2304852589ccd81c8cc8e1e9fc8427809a47858b4fde42d678b","pathsSha256":"b60bd9301433338c638b5c64484255b95f6368689d8d81039b9dcb280a29a222","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B20.svg","dictionarySha256":"2bbdd490bb01b296719804d2c045628fa60011cf92f013a449b3439c0ad3d97b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"粒","strokes":11,"corpus":"MM","originalMediansSha256":"7eac467b4e115781dd4c82a0ceabc38ac6ed07f8b79faec915b516fff4f2e467","pathsSha256":"5fe1e2c5a883814020983c6217e24ad8fc06b5980766ab6720d28f0323f24a4c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C92.svg","dictionarySha256":"ea4898ae3de0fab71ed605e4a6d4b24e1a2e7893c370cf821bd2a5eae2cd2aff","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"輓","strokes":14,"corpus":"MM","originalMediansSha256":"6d295a2c8077a95a0133e6e3cc800467a4b72df5ef47711ae8fd02e432ea6cdc","pathsSha256":"ea2a0dc38e87762ed9703cc01d5c4028815ac6c183f8b32aae5e5abd98ad9f98","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8F13.svg","dictionarySha256":"2431ce912c8903feacd4f5c3be127f4298577a288e621b3d5e46eda2a9e1b2a7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"饅","strokes":20,"corpus":"Ja","originalMediansSha256":"7e2dbe7ba64d6455282c1bea553858d2ed8ff77da60c74c0184bdbf40593798b","pathsSha256":"ea2cbc6977c2017a0aa7ff29d7cea826171e07dd9a142649c2d985ee77e4ca92","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/9945.svg","dictionarySha256":"149e95a91844e981b16f9d14f72e84a27fe09dfd3eafefe59006bf1e717241a3","sourceStrokeIndices":[1,2,3,5,6,7,4,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"鰻","strokes":22,"corpus":"MM","originalMediansSha256":"9e21ffb7309d1d6f4d13fd1b540cc0edbb7e6cc757952aee7e8012e30c9740f5","pathsSha256":"35e9760ef09f34793e03989ac30e4374e18bdb42f3a0fd8c9499b5b1101edf84","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9C00/9C3B.svg","dictionarySha256":"7f2e8e4aefadcbea9c8abb2ef7d244c590468f43e84e4d77ba971c5868b1f27a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]},
  {"glyph":"卍","strokes":6,"corpus":"Ja","originalMediansSha256":"fde07901fe75bd783b8bd1f46beb23ade1264cb4f12d15f7d05c9eb898663af4","pathsSha256":"c9721044deec29e5c097e836680c115555cfcf693437e45d0316983396d263e1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/534D.svg","dictionarySha256":"bc21abab40ce3d541b79e501d1b088f98520feb814a102a3b036534e82ae4084","sourceStrokeIndices":[1,3,6,5,2,4]},
  {"glyph":"彎","strokes":22,"corpus":"MM","originalMediansSha256":"d53d402753af66d766ba18952b177cdca92ff16fc141e56914e2b52ec3d386e3","pathsSha256":"68bd8f074b93dcf583fdb7bcd5105bcf7c71fe40be5b04364869ba01d7bc4ef4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F4E.svg","dictionarySha256":"c307484728c81892175d0bd8fdb70311435ad3b172349c7e246d5cc841dc5728","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,null,19,20,21,22]},
]
export const G1_BATCH6_DICTIONARY_REVIEW_SHA256 = '40f1fd31fc7e012afb37b76e7e5beed4688d518054ea232098015e4079467d7a'
export const G1_BATCH6_DICTIONARY_DIRECTION_SHA256 = 'cc7da08e73cf3fad6821dd6cca1c4d063751b3d10a4895e5525f680d59473f9e'
const referencesByGlyph = new Map(G1_BATCH6_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch6DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch6DictionaryMetadata(ref: G1Batch6DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-18',
    geometrySource: G1_BATCH6_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch6-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH6_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH6_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH6_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch6DictionaryBundle = {
  verificationSource: typeof G1_BATCH6_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH6_DICTIONARY_GEOMETRY
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
export function loadG1Batch6DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch6 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH6_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH6_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH6_DICTIONARY_REFERENCES.length) throw Error('G1 batch6 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch6 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH6_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch6DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch6 dictionary entry mismatch')
    return { ...g1Batch6DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH6_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH6_STROKES = loadG1Batch6DictionaryBundle(reviewed)
