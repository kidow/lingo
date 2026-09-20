/** Fifty grade 1 forms (batch 20) individually reviewed, including 27 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch20.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH20_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 50 approved and 0 held; 27 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH20_DICTIONARY_GEOMETRY = {
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
export type G1Batch20DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH20_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH20_DICTIONARY_REFERENCES: readonly G1Batch20DictionaryReference[] = [
  {"glyph":"疋","strokes":5,"corpus":"MM","originalMediansSha256":"1560c1c6699438de8ee2495fc48140d1c6173a14c6d9a26b1c2e8d70781828d0","pathsSha256":"f9ef1ee0e046c06017427964552a11d69a49d52d7b845e0c26137ff20b9a76d9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/758B.svg","dictionarySha256":"797be3251858a0f351e39129b28e064c13ea9ea8919e269f840f9efd3d4cb7a8","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"逼","strokes":13,"corpus":"Ja","originalMediansSha256":"36ab72e15351c80eaacbe4af8a7411e2d990afe6fe1050130166e2e9b1d92af8","pathsSha256":"6194346070b96f7dc267647e32c26b63e10092f14495955ef9ed4ecbc6f22849","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/903C.svg","dictionarySha256":"19cc48d09cc91e2aaa4f771802ad6a0162891f2fa8b5402cdbcc1d8e21042221","sourceStrokeIndices":[1,2,3,4,5,6,8,7,9,10,11,12,13]},
  {"glyph":"霞","strokes":17,"corpus":"MM","originalMediansSha256":"8835d4fd871c7a85bd653d88f7551b92e9801b6cbe5b0ec523bb375c44ab6b06","pathsSha256":"ba7a2f45efccb46b3a52edd5c779cad7cbe0026ef15ad9b61a39d1d9b5d4cd8f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/971E.svg","dictionarySha256":"99e83057bee0dde957b5e7f9386c7b4dff87837bcb83a382d2b9b60ac544f9a3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,11,9,10,12,13,14,15,16,17]},
  {"glyph":"遐","strokes":13,"corpus":"Ja","originalMediansSha256":"7b10e3f3724d0c70102d430eec31fd853b370fe756555a83df0aee4f6e0ea4d4","pathsSha256":"e8e13eaa5837103dcd9df7964a8cf76c45648686dc4f5e23fe3976a7035e93ea","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9050.svg","dictionarySha256":"31466d3c15930c7071a8b22512f38cbf7da1a609fe8ab727ce94520996c1e847","sourceStrokeIndices":[3,1,2,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"蝦","strokes":15,"corpus":"MM","originalMediansSha256":"8f7d30f67cde45b9ddde8723d07c68b5ec411e0abf31630fc58ea55409c1aae2","pathsSha256":"100e3c5aa18ea18e03848cfcd8357dab041424e6242dd7d1a4169a44cffc8345","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/8766.svg","dictionarySha256":"afde2d13e66612bb4bc796f58f007cd2ec0d8c5ffcc67e57a6aff6c1b241d363","sourceStrokeIndices":[1,2,3,4,5,6,9,7,8,10,11,12,13,14,15]},
  {"glyph":"瑕","strokes":13,"corpus":"MM","originalMediansSha256":"6886ca4ffa15ca300c7763d5e2571aff78fa4872ea7539385a8ec6396f0377d6","pathsSha256":"e17c6b3e4e42b659ea860cbc8b163d0c50802f5a5eb853e8a5fa18f816f7f074","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7455.svg","dictionarySha256":"79474bb30a37a0da6b3b61a75da65125284bde30fcb117b3d3a716b8ea7e8d52","sourceStrokeIndices":[1,2,3,4,7,5,6,8,9,10,11,12,13]},
  {"glyph":"壑","strokes":17,"corpus":"MM","originalMediansSha256":"f83ad939f1babcd65774467b05d5f83c67cabdbc1503ef18bc21c5301011578d","pathsSha256":"642651b0f6065e1e8b590658adc171c2e5e7d85e51607f89042831343aa116d3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/58D1.svg","dictionarySha256":"8f4edf1998e9d16da32ca99d2446ade0cd6a851c3215b8a4f12293a68ff89f00","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"謔","strokes":16,"corpus":"MM","originalMediansSha256":"35e77f07118cd0baf35e16483a4b7f90c81834219634ff8344cb9ca5c64a5fed","pathsSha256":"cc3cf663db23f8ff430c7979bc3eba766026a73cbd759f6e7202bd5d93b6e7d3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8B00/8B14.svg","dictionarySha256":"8d1c6efd93fbb5309cb307ad7511a72e5055dfade2add279d7b61ff44dcec739","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15]},
  {"glyph":"瘧","strokes":14,"corpus":"MM","originalMediansSha256":"21cd9e44a5e843b6ff32fc8ac81c6cf57f977cfdbe888a82c841f7e2f0f30da4","pathsSha256":"88d5d3685ac66dfafd572910b1d14f1f096ae3fa441523f1eb71b59f27e39e0d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7627.svg","dictionarySha256":"baab94bf7f6ab68ffcac12211d4165e146e84f5fd1189cc8e148546a421697a1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,14,13]},
  {"glyph":"罕","strokes":7,"corpus":"MM","originalMediansSha256":"0a4de2cbe8a01967bdaf04476a71a3d3fd3a4d85882c610b8cde13f20729bae0","pathsSha256":"2d350e5f4072ebce41c2dd6e965b63665cb81d76b58cc0064ab3f444d2cc21b9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F55.svg","dictionarySha256":"9a94e3c0ebce015e2a31035a280251a77077a2fcb918248135f99b2082956cf9","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"悍","strokes":10,"corpus":"MM","originalMediansSha256":"ebbc31a518661142bc8d4140fb9545bec1fbf6025810fa9d2fd07af71a98137b","pathsSha256":"4da97cc835f8513b40c4c593398d0c75d2987245e810b02b81379269d6ab318c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/608D.svg","dictionarySha256":"39304f4a078ac52ab18f798f75a1454c9f41ad4321d4f4fd3dc267e1ad30046a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"澣","strokes":16,"corpus":"Ja","originalMediansSha256":"4a1c79c67846b3b65e130521d30a4d544b92d3c54147c83ff7f808517ec707e4","pathsSha256":"faa3b3394da325d85b63dab6a5de24b8d1ba46f814160ee8392fcda1e23ca076","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6FA3.svg","dictionarySha256":"a1fa7c0ad4e85746aded00ade4ec8a699928fa1ddcc9c9c3993ee28584375ccd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"轄","strokes":17,"corpus":"MM","originalMediansSha256":"a12b47267a9f3707bc657105c3ebb2d19ab9805f9a4131825bd122c9615060be","pathsSha256":"307d8a2a474b2b60104e34ceba50c6a40d7be35dfe895da8a600f37d813f205c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8F44.svg","dictionarySha256":"5a9287301902a3a86bfd081f40502f07e60c7e5503856ce83282881333dd0e40","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,14,13,15,16,17]},
  {"glyph":"緘","strokes":15,"corpus":"MM","originalMediansSha256":"10d2e42db2f28619585cd9e32f209a6d58207a39d31eed61c766234f0c208c0d","pathsSha256":"5aa30e894c21805040dce83457447743352dd4e5414c419bcc0f26d229f1984d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DD8.svg","dictionarySha256":"934891d7a1307b463748fa3656529130a2f617e17b141c0b8d936498d08c36ce","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"涵","strokes":11,"corpus":"MM","originalMediansSha256":"9b7f03b8e3930cca3e4808b4ffde2ed19cdaa4ccdcccdb2717f8de1aedfc4ce5","pathsSha256":"7f6975ce9eead5f3dd28101d70530480b8941950d776ba3ad1006ebea0f254c4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6DB5.svg","dictionarySha256":"f05308eb1efcc4ed2cd3c72c7b880c962db98e2990be389c20105d8dd5d112bc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"檻","strokes":18,"corpus":"MM","originalMediansSha256":"8e11f96f9e6d09c2e7bbb6801d158b42759cf547a4a4517538879255188c73d2","pathsSha256":"814c2f34ebe775a9cf19b3913e8f644d9481c031d62520a3b4008fa421634317","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6ABB.svg","dictionarySha256":"c6aa0c750d21ae359ad6a032f4035cb7e6721b488ed0863032209c9c6484e788","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"喊","strokes":12,"corpus":"MM","originalMediansSha256":"17813dbbf04d5a6c0168334e821fefdf3ce65a55f5696e0c643c287fd185def1","pathsSha256":"e91960c6dbc0bc88b1f10c8c152940a5719a70ec188932b7507c95573995c424","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/558A.svg","dictionarySha256":"bf87461beeb50c448489c8b0c2b897514e6b1a79d689bc71079b8dc99b68b927","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12]},
  {"glyph":"函","strokes":8,"corpus":"MM","originalMediansSha256":"5824502dbcc93f35f3dc7b6cabc617f998e2af2b69dfcda8e12587a5d600a0e1","pathsSha256":"b76c60e53876bd4b1c4054d8c25bc599c9fd59d150ffa508fb87aebfea3826fb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/51FD.svg","dictionarySha256":"99b7a874344bbd3b2bc43c049c9d1138b6dcb76576c20083231f483f8cfae051","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"銜","strokes":14,"corpus":"MM","originalMediansSha256":"9547510863bfabac1b7fe2a79b0a53539388fd6977db3ff26c9e744246bfa045","pathsSha256":"7d4b091ec99833992e050594503efd3df58c4cbd985fa0da45288072fc2b86cc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/929C.svg","dictionarySha256":"e8b7fd3341c82e45fb45c8decc0c9c7b2403013b3a504f7ea66cefcbdbce5489","sourceStrokeIndices":[1,2,3,7,4,9,10,11,12,13,14,8,5,6]},
  {"glyph":"鹹","strokes":20,"corpus":"MM","originalMediansSha256":"dbee6e54f3f0fce8191fef49667161b2ffc7e7c94bbd9db837269e0310df0409","pathsSha256":"991ac2a3691433541c2bf95faa469856f2f1d69d22d72148629ada36d8a2e651","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9E79.svg","dictionarySha256":"246d10df7b003f5abd64694896a5ff172918a4c8c92c15d5160e68ad52c07812","sourceStrokeIndices":[1,2,3,4,5,6,7,10,8,9,11,13,12,14,15,16,17,18,19,20]},
  {"glyph":"盒","strokes":11,"corpus":"MM","originalMediansSha256":"172b0d1a3c373e5ba9f968f2578fc15a906450c9d29ce917651055846b1988b0","pathsSha256":"21ce433ccd194c85efbc57b8d598bf1f79210d09346f8f0cd3d324a44c32cc11","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/76D2.svg","dictionarySha256":"5089977e5b52de813ae9a6b01b4a5b56f074957d9941108828a1710fad669ad5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"蛤","strokes":12,"corpus":"MM","originalMediansSha256":"343a4fcfa3ee8979d93f25d49e4f3d2bd5399be50731ccea8693d73c3125c6c4","pathsSha256":"4273353696712d89bf6a2c4a6f27ccc915a1b09a18b7b995b6f692eb0eebc95b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/86E4.svg","dictionarySha256":"e0e4bb66553b19bd288041ec695a46694e795633168d8a2cc73e2e32da1e4049","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"缸","strokes":9,"corpus":"MM","originalMediansSha256":"49cb2e5fd3d468dd9bf5ae360b93f3dcd567d1f452c0da52f057cfed248339ea","pathsSha256":"439b8c418b0118713601088659bb7895ca3a11de25f8d55863816356a02e392b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F38.svg","dictionarySha256":"1b825184ef00be6d12dd1e71b8ae663ee2a57cda9c61a6233d6226e5118cbba8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"肛","strokes":7,"corpus":"MM","originalMediansSha256":"c7ac9c1a52e22d49cf191c42bf179d9e03664d0135126fe2a2dde8d8265aa280","pathsSha256":"2a38b3c77d68e07b5b8fc2888cd90049cf0215d10e1a1ad204f7f68aa4fadc16","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/809B.svg","dictionarySha256":"fbb8c92708370c9615918a0404868546b6458d28dde4f68004a9a9a75e33de48","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"諧","strokes":16,"corpus":"MM","originalMediansSha256":"0ff82f5ded277c81b1af2b8b23093c5371404fb0518427c6823757de31f675a0","pathsSha256":"5e7300fbe80d6151a9ace4aed2791a5f48bb067351905fa9cdf915a9fbde4bc5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8AE7.svg","dictionarySha256":"15da42ed71cd0094eba4cdb00cd94a9b7b9408bbedd70183949b5f7ea761cc94","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"骸","strokes":16,"corpus":"Ja","originalMediansSha256":"ed19c7389de3b1624ee35be21069f6f7d2c277d4c35b5db0494b58efa56c9edf","pathsSha256":"dd7bc87ab918dd3ba2f745d6e340f5c0677286f0bc1596eda665d1f2c9238447","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9A00/9AB8.svg","dictionarySha256":"c7319dff153fa619917ff2e61ea57960f167868b9a3891c0df9b0a3aaa6f9126","sourceStrokeIndices":[1,2,4,3,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"楷","strokes":13,"corpus":"MM","originalMediansSha256":"57a6d0a83457c5440f3ee271b2c2aa60f4d15989fdb61101bbbc8cb468ca9ff7","pathsSha256":"f24148041ef786821ea9901765d4d81ca03bbd90d51cec8f77134c0167ad6140","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/6977.svg","dictionarySha256":"248aafcb6a3e2b19fc4a7de49a5508f82ae909b54e2e77fe0da5b2ad5241b494","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"偕","strokes":11,"corpus":"MM","originalMediansSha256":"e184db5b227fb8f6c7b78d7a10c21f0b6e06a66a4d25034084f747b980b5f0b1","pathsSha256":"470fc925b12aa215724e1d10c77b483690cc02a3e368d1a072690e6d32edbb63","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5055.svg","dictionarySha256":"5c03892bf3b1bc1ff7dc3750926ef699f0e65da8d12f904c4198dfea9f0b7867","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"駭","strokes":16,"corpus":"MM","originalMediansSha256":"2d6ac17a8d6432dbf6f17a127a70eabcdf7fc56fa16b8300e376a97e798cf3f6","pathsSha256":"eb75c81658368fd59195d43266b9f7ca46a998555eb43c11a5c0a08a3779cb8f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/99ED.svg","dictionarySha256":"ae825b9f1f0a78e5c26eafc4be3fb8c9a9efc28d9e929d003c20b7ae7907a32d","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"懈","strokes":16,"corpus":"MM","originalMediansSha256":"3cfd0358193ccf96a0dcc9378086424aef0b6cb02f0a151c902ea5cff30f0ab5","pathsSha256":"50fa2c2daa31871bfee6276150eeaa5f397b496706daca5f485aa30e28c424a6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61C8.svg","dictionarySha256":"b01b269bcea027bb0975f82ae340be88066344dba4baefbfa76006ac6b480523","sourceStrokeIndices":[1,2,3,4,5,6,7,8,10,9,11,12,13,14,15,16]},
  {"glyph":"咳","strokes":9,"corpus":"MM","originalMediansSha256":"78fa09b1c93ef26b2d7d81482bbb571dfa68fa3fd0b471011f1a77dd10b9097b","pathsSha256":"ee1cbeecf68145e5ba50ac257aae73ba37a90da023cf957c731ae02cb2711de7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/54B3.svg","dictionarySha256":"6cfc71b7aeb3e835e1d5e69c5a1ffed94e8ac7cbb25ebd19dd210b7226d9a416","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"邂","strokes":17,"corpus":"Ja","originalMediansSha256":"c05c21f1fd271e3bffbd989107b17b7bf2ce514d755497e73d217aad92d383d4","pathsSha256":"cf08ed64d0b3c0063de8a70e9e60908989b6e9adcb60b2b20b327edcc19c69d8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9082.svg","dictionarySha256":"62474aebf5df69a19b8e0127c2ecf8eb6c957543a3ce2736608eef7c941c5d10","sourceStrokeIndices":[1,2,3,4,6,5,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"劾","strokes":8,"corpus":"MM","originalMediansSha256":"3f686064204c51c2f99bbe13331a054353e78bac896d85ffa72f42deddc39215","pathsSha256":"893ee3efbfad2df9aa2d15eaf850cddd19e3a3b8188678464b87ad90119585d6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/52BE.svg","dictionarySha256":"ef8f55531026657abc2b123dfa376252e141b3e72685f2304a7c5a4e271f716d","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"嚮","strokes":19,"corpus":"Ja","originalMediansSha256":"124d12144fbeeea791e9ae4eee14a6169e883b918af4597fcf9594f7abfedec7","pathsSha256":"f407eedd3d61fd760a4004d14dc73b0b4be3eb3a5b544c76c2e520a2ef64393c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/56AE.svg","dictionarySha256":"a38109478dc417c036b90d987a6734ec49dc213e42290405b34d4a293e8a7e70","sourceStrokeIndices":[1,2,3,null,5,6,7,8,null,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"饗","strokes":22,"corpus":"Ja","originalMediansSha256":"8f923de353d9a51ee486f015d66c55e3ce6f3419367dd0ddc0b8efdc859e645e","pathsSha256":"a3b10c7a34c1e778ceca8857e67306557863a9f9df728cce4fda5dbd8273c384","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/9957.svg","dictionarySha256":"081b82bd74f9c5539e8d34177a52b35a8a4e2acee93303cf719e0c1e1e46deaf","sourceStrokeIndices":[1,2,3,4,6,7,8,5,9,10,11,12,13,14,15,16,17,18,19,20,21,22]},
  {"glyph":"噓","strokes":15,"corpus":"MM","originalMediansSha256":"fd6dae97f4e6e54459d68bb457dba072e4a9a0747ab219c187df6e7ed445a824","pathsSha256":"ed8a79ec774abc0dc867caa4f42db1431c5684d6297a41216f224530798ffa49","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/5653.svg","dictionarySha256":"46d189b3d53bf567e583f488ea0a766ef8094b06879579dd9e7fabf02bd9e41c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,11,10,12,13,14,15]},
  {"glyph":"墟","strokes":15,"corpus":"Ja","originalMediansSha256":"7dd406e854f3880de224d9668e5124454127df357d0c722d84e0eb15a29fb2d0","pathsSha256":"c6d5e546bfc1f4500b0638f6f97b777625547acc2ca5fb816374aa577c4e495f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/589F.svg","dictionarySha256":"8ca0a275065bb0d6c587dfc5ae811e94c24960532c76bdd8ee545fdcd3907387","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,12,11,13,14,15]},
  {"glyph":"歇","strokes":13,"corpus":"MM","originalMediansSha256":"ccf7e852124e05fce64f9d33ec0f0b7caa587dc2170524856aba6da1b4e854d9","pathsSha256":"06145a469d7eb7c288a328ac6e356b91cc33399fb0ae47fe29582644ede7a829","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B47.svg","dictionarySha256":"162539f7fea5227ad85d8416d83cd225c91fc8d54dffdc9e54aac79391d0eb35","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"衒","strokes":11,"corpus":"Ja","originalMediansSha256":"ac62043af4e08e72e8d791a675d76a3af5a4970bb0cd4d76e9a2ee517e55b2db","pathsSha256":"91e819be882828d3d1c5f4ee1cfcf3ada7d408b078ffaccac81bd3d79035c377","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/8852.svg","dictionarySha256":"d5aba72770cc9d9714325ca10db6ba4298c038ccb48d31506e3b99efc100560d","sourceStrokeIndices":[1,2,3,null,5,6,7,8,9,10,11]},
  {"glyph":"眩","strokes":10,"corpus":"MM","originalMediansSha256":"4c6f49a9f06609f6cba7e49eb9f8d50812bba01339c3c50b1d7c7be442584867","pathsSha256":"9854f69fcfa67bc6c198864a6a20a1bb95145adde3c5114ed7280e0a1440a3ce","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/7729.svg","dictionarySha256":"4f1373117aba030ca92ec539337f02d5b20db3c0086c47eca4d20b58b9cc19d7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"絢","strokes":12,"corpus":"MM","originalMediansSha256":"6ff390129074fc14e4c3b701c9b96b7127bc874157cf967651aa7862764291a1","pathsSha256":"44a5a0642e004fdac50250d1fe0ec271e8f23b41a3a93f99f8f584df7e93df81","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D62.svg","dictionarySha256":"9a89025b53ff97fb941c7ba67750e3710091652547ba8760d5571e580e749083","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12]},
  {"glyph":"俠","strokes":9,"corpus":"MM","originalMediansSha256":"dc7366ecb07ffe05800ec9dc65a2510ee48c03c5ef4a273118f410c92e61a696","pathsSha256":"b5b2f493dc3140a6275ac443b27d1303780d8d032c5221b8f11bffdc273e3007","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4FE0.svg","dictionarySha256":"1449e0d59ed86e97122864a3219289ba95e1294e503e63e252bd94cd44216c2e","sourceStrokeIndices":[1,2,3,6,7,8,9,4,5]},
  {"glyph":"挾","strokes":10,"corpus":"MM","originalMediansSha256":"e31157e7f8d89728794dfd9ef54677fb77f91543ef8f3334cb311524c1857d4a","pathsSha256":"5a80c10328230bf92df761bdf7de017b760c3ca27cc581dd82587ce04b70cd09","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/633E.svg","dictionarySha256":"4af328e327415e8fbd2cef3e8c19f9364e238f45a268ef10b857712a4c37ad43","sourceStrokeIndices":[1,2,3,4,7,8,9,10,5,6]},
  {"glyph":"狹","strokes":10,"corpus":"MM","originalMediansSha256":"383a150a45909790a4f22225889baec06a3b33f9b512b5e1f4f20f1449550112","pathsSha256":"85ed9eda2453420db0ac50cf0baa8dcb8fdf8f99429cff5c616df9ea3f61f412","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/72F9.svg","dictionarySha256":"1cf9a6db95e2fd526670cc60c7e0b70c3e7abe05139260d785371107f4dd2dfa","sourceStrokeIndices":[1,2,3,4,7,8,9,10,5,6]},
  {"glyph":"頰","strokes":16,"corpus":"MM","originalMediansSha256":"dd5234bae4e5f5715f032d7dc5542858c04ae327dc468eaa534f3dadf61a09b5","pathsSha256":"d5a7da0193e3b71ce191b06faa34ce626a0bc238430c62a33611b52749dd801b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/9830.svg","dictionarySha256":"2f4f185c3e6a2714549440f6a02708bdf02fbdcb1deae72c927dda35e0f1d18e","sourceStrokeIndices":[1,4,5,6,7,2,3,8,9,10,11,12,13,14,15,16]},
  {"glyph":"荊","strokes":10,"corpus":"MM","originalMediansSha256":"cd4ef94780c979bfcc808e8418bb8f779e84848b3d05b55bd1d91dd8fcdb5952","pathsSha256":"261518a8db4da3fa43ef44cc46abcb1de1196d512a68d214d1008bf796c52863","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/834A.svg","dictionarySha256":"192faf904a8cb8f1664c259cd5d44bd6bfaf82987bc00abef64f2acda1322606","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10]},
  {"glyph":"彗","strokes":11,"corpus":"MM","originalMediansSha256":"eb03738d9ccd39330fd1f86772ba2302b714a6a96152255845c5f1580676593f","pathsSha256":"2e5f251c1c0f5c800b83c8f1ced89fad7b63fa0060ef01ee0c0bcc82ffa138a7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F57.svg","dictionarySha256":"fbed34bcb0338180b1d9c459d54ffd491ed1a20e988934d8de6dd3c030976588","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"醯","strokes":19,"corpus":"MM","originalMediansSha256":"877375eb9ee9af1eb8c0e908d02ab891c1630a47fe58a6c126673be01155deb2","pathsSha256":"2635550336625d794eb4e2ead5480e8a55b20d28e33202a70c4f50fd24d10332","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/91AF.svg","dictionarySha256":"08134ba168ee386f11ddb3c6f8e8dc5063e9dd1b65b95c002becc5dc8a5cd0dc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"糊","strokes":15,"corpus":"MM","originalMediansSha256":"9ea99b6a723c9540f33bd3fdf6907737b7858596cc55ed23993ab53baf100c0f","pathsSha256":"4c49ae2e49f48e35869eb00491dfb7c05deb1df0da84338129aaa21ac442abcc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CCA.svg","dictionarySha256":"7471c49041fa7ed414f4d1dd519072ea091ab4c859fc9de546e37a70e71e4f06","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"弧","strokes":8,"corpus":"MM","originalMediansSha256":"0f5be845efdead6a93450018ccc43154b0c7ee08719b3c094cb80706229b42a8","pathsSha256":"b88df48bd06c18c8ee9a5ba6b2b94895c0129370d0b4b94cacb8ec7142fff438","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F27.svg","dictionarySha256":"156809ec71880174dc56f8fb54cfbee0a570b6089b60ec765a2408e71fda325c","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
]
export const G1_BATCH20_DICTIONARY_REVIEW_SHA256 = '40a61a56d94206ef435ca7dd69c15d9ff844227dddde76091efc24db42bdabd2'
export const G1_BATCH20_DICTIONARY_DIRECTION_SHA256 = '8fabff95a20c22c2ea004b395fe83a5dd3d0d9b34cb6ccd284d040d09b16ce15'
const referencesByGlyph = new Map(G1_BATCH20_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch20DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch20DictionaryMetadata(ref: G1Batch20DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: G1_BATCH20_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch20-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH20_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH20_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH20_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch20DictionaryBundle = {
  verificationSource: typeof G1_BATCH20_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH20_DICTIONARY_GEOMETRY
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
export function loadG1Batch20DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch20 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH20_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH20_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH20_DICTIONARY_REFERENCES.length) throw Error('G1 batch20 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch20 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH20_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch20DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch20 dictionary entry mismatch')
    return { ...g1Batch20DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH20_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH20_STROKES = loadG1Batch20DictionaryBundle(reviewed)
