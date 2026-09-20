/** Forty-six grade 1 forms (batch 17) individually reviewed, including 10 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch17.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH17_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 46 approved and 4 held; 10 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH17_DICTIONARY_GEOMETRY = {
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
export type G1Batch17DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH17_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH17_DICTIONARY_REFERENCES: readonly G1Batch17DictionaryReference[] = [
  {"glyph":"篡","strokes":16,"corpus":"MM","originalMediansSha256":"ea8fda0b7d1d4234f48911790bbeb990255e22f52e4acae48aaa00da0c46b3d4","pathsSha256":"e43c7149ce8c9c63a97a51384a2dabd17fb09a0777aaf3f922866120cfd7ef75","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7BE1.svg","dictionarySha256":"e55a377c1a00c032d24aca0688e02d8baa317f2b963c961c5bf34bb08b7fff00","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"擦","strokes":17,"corpus":"MM","originalMediansSha256":"b2992425dd476f1142957c9ecb53a02d7d86878fee355060988865a0a533d079","pathsSha256":"081cfc310fa4fef5d14dc3fc02e802b1b1ee3dc0be6f716d9917e26adbfed298","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64E6.svg","dictionarySha256":"60cad8d14b5a791ec6fe6579ce1d6e9bca17008fbcfef97b92722ad339b2f9c7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"塹","strokes":14,"corpus":"MM","originalMediansSha256":"60d1ef5a5ba6b9593cfce9b2992ecffa2185b69dc454f5e4911d72e0ca262050","pathsSha256":"988b297d781345beadfcb10101fbc155cc1e29cdacab4d7143d48ef0d86f9276","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5879.svg","dictionarySha256":"214ee0db9bc7dd083691544d4be57a1776a40fd8da21d1a8cac1b3b0aaeffb28","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"站","strokes":10,"corpus":"MM","originalMediansSha256":"ae67d51b0e8d6905810be34ac6b49d2c6c832352f2cbb4cd6c85a4178c898b2d","pathsSha256":"892c318f4f3a8b6b6edcaa8a8d768bc49e22521ceef03661f34b9d2d986ab9f8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7AD9.svg","dictionarySha256":"970d0613c1c7a0049cc67ba08f2223a8f4ff2dddc025cef072df6679c2f53a08","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"僭","strokes":14,"corpus":"MM","originalMediansSha256":"fbe2d32b85152e036702576d533e50be26388648df1241807282c5f6fe3878a4","pathsSha256":"98c78d93c55157d0ade9517d035f532e75871b7967522935b1483eff316d4636","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/50ED.svg","dictionarySha256":"6cc9c49ff23bd81728dba141ffb7a3edccbb40de96a6d4fb107591e26ad93ea0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"懺","strokes":20,"corpus":"MM","originalMediansSha256":"224d6891ff8778c520e403b8a7ee44c207de6523d70f4507439c1f2feac09614","pathsSha256":"022af4edb3f61ee0ee5b00cfe2e0752b2d302cf6c101229a8496a0aeaa8daaf0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61FA.svg","dictionarySha256":"8439560646d8b6ce86816a255b98e4a8667b682a43a59e9c89b5126e010e22e7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"讖","strokes":24,"corpus":"MM","originalMediansSha256":"c1455a1be7551f0c28acee57b597d471f38290075aff35c08886deb4f528e892","pathsSha256":"b228f744780b46a85b204d5c784e085e26772943febaef25a7e0cce003e22825","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8B00/8B96.svg","dictionarySha256":"1a1d4be061163c975c09bb34e83b0d1fde82e9ed82fad2dd5c9ba70ae3fd76c8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]},
  {"glyph":"槍","strokes":14,"corpus":"MM","originalMediansSha256":"510b6ad727a98b8a47d997883111f16f10229da6b6560b8b2d5c35250338df5b","pathsSha256":"39e00c0a3c969b9201dbe8d65bf15be117879227a90d8cf6cc398fc688750ba8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/69CD.svg","dictionarySha256":"a716c09986840653c5e6d3099140c4520a2cc3bd2e374cbc954dc6b4d32b9065","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"脹","strokes":12,"corpus":"MM","originalMediansSha256":"0c1ff75127b469a3c5c98331933418e9a7e70d50e741926e884af1d43bcc7dc5","pathsSha256":"2c4db35daa051b595627914f068ae33414cbdaba37d1fd7c981a40025282f486","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/8139.svg","dictionarySha256":"e9d762b05ba01d2c826be5364627693ecd62786e332fc3e1ae1607a0d8a0b480","sourceStrokeIndices":[1,2,3,4,6,5,7,8,9,10,11,12]},
  {"glyph":"娼","strokes":11,"corpus":"MM","originalMediansSha256":"333d8bfb7a8d65f75e8a064c1396445fecbbd79c3cff39a762ddf1163112ac97","pathsSha256":"b01fb4d34686fe9ba620af953b69f55f2dc573a9e269c3ea40509a37606f99a2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5A00/5A3C.svg","dictionarySha256":"27ca335835346e20781eabd27ae02caa23aec2a566fcce05e7a61d1087ed9945","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"猖","strokes":11,"corpus":"MM","originalMediansSha256":"01cd53b60d7ad98340274d47bcdef5fe53d3f7e81a0154bca6e1a0f691950a49","pathsSha256":"e4f90febe03efba0f4a9aeb9ab80901cb6f8d6e77687528b2fea8d5bb96f4ad9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/7316.svg","dictionarySha256":"b7181c1855072ae033b00db7ed0e1aaf2cc6a9dd177a2201f104e8ec9b9befec","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"廠","strokes":15,"corpus":"MM","originalMediansSha256":"209161a850139a4796d02b5c93447fee2816c3b63bbbac9c51b086e913d24b96","pathsSha256":"a63de2aaef6539eb42a52dd803734534df5342eb766fec26155a4b5661317859","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5EE0.svg","dictionarySha256":"ba8e3e00d61b3064a32ee33c04318b0b37f10878d286c45974a3844fb1944de1","sourceStrokeIndices":[1,2,3,4,null,null,7,8,9,10,11,12,13,14,15]},
  {"glyph":"瘡","strokes":15,"corpus":"MM","originalMediansSha256":"5dd7cf188e4391d8c0df43269ffd8b9522edf38599f901b9d04ebe77a96c8b23","pathsSha256":"80a8f54f791b0f6020de02ed9dc199178b695b4324e536de015df1fc9c4540eb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7621.svg","dictionarySha256":"2ea677fa84b495e441eadec2317e2ab5e3f6f4d264ff8838d3926932c5903c97","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"倡","strokes":10,"corpus":"MM","originalMediansSha256":"0f9bffb75b3225c2051bc92faeefa657b5854d27b24b24f6c953bc7dc093d8b8","pathsSha256":"c5c681c4cf11a736e55049be5149c1f16f7e0e77b115ab30c43ce5350cc8b6fa","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5021.svg","dictionarySha256":"2bb9c99d427c02d3535253a2d361947eac741795095e7f61315df488815c284d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"艙","strokes":16,"corpus":"MM","originalMediansSha256":"43b88c06a5c3e3db658b444e5f72d7acccc5b0c138fa190edbb9f17cb23b48d1","pathsSha256":"32a995ca1b73fe78387da5247887ea7d1c0eba58b04388607777fc6f7c235230","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/8259.svg","dictionarySha256":"048d39f6f29a1400c838b92e89075f74dfff7f9a5cd127c5706be829d48ab304","sourceStrokeIndices":[1,2,3,4,6,5,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"愴","strokes":13,"corpus":"MM","originalMediansSha256":"eed244d7493194fa5df1c0dd5e2aee77610816cbb9fb8dae87b8891554cff4e2","pathsSha256":"94b571d5170659293ac7c0abe99b32ebd2289f664776c8066b0f60b563f024e4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/6134.svg","dictionarySha256":"85f084af3a8fd4f1720d943efeb9e82367c392de2f22569a38dd8b376a346f0c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"漲","strokes":14,"corpus":"MM","originalMediansSha256":"819282c3c7ee3884164828ea10fdcb6625439683406002f8e7622a9dbae31e44","pathsSha256":"d3338acbcfe7faa377c3a50763ce8a5384a03ee21cf71b8a58abca68c84c6ea8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F32.svg","dictionarySha256":"1c5730a3aa6ef52a5b3ba6f1e5be2e3e3de575baa12a73799abe7c7737faced4","sourceStrokeIndices":[1,2,3,4,5,6,8,7,9,10,11,12,13,14]},
  {"glyph":"寨","strokes":14,"corpus":"MM","originalMediansSha256":"f7982f6c61c7a9ab7436c28c8a0c8a87d32fd2fdc548ae2521161af03304b0a8","pathsSha256":"08b6745346f7e12153524f15fb8d8840d91dc964cf2b5eac43563e052710ac42","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5BE8.svg","dictionarySha256":"8d0f5aaa86c7e144c13b19d2c3448c462b8d196ff2aa687903d1cdb165bceafa","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"柵","strokes":9,"corpus":"MM","originalMediansSha256":"a2a598681e196c95585c4416990a5dbfdfaa59d03c258a5c7534625768794528","pathsSha256":"c37cf9b16b11b53feb687a84bb10b8f268761a9261b17d1559ee900ba5713fa6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/67F5.svg","dictionarySha256":"e52e33c85e18e9e800bd72b6313a5bd45750462e2de4c854173a2f301d5c5ce7","sourceStrokeIndices":[1,2,3,4,5,6,8,9,7]},
  {"glyph":"凄","strokes":10,"corpus":"MM","originalMediansSha256":"c0cb8c707f3847efd17f8b8113e7aeeab50b63eef2bfa8651a09ff139f810c7e","pathsSha256":"ce0758441c3b34628b55e73579ecc7a9c89393d5a71fe9fae85c87c49abc1cb2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/51C4.svg","dictionarySha256":"717e7ee033b48b654df5427173199120bdc7fbbbd09959934c3552a23d2151b1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"滌","strokes":14,"corpus":"MM","originalMediansSha256":"59de5cf001c6e0ea7ffb14132abecf104aadee44801cfa89e9c5bc0a203bf41f","pathsSha256":"bf3f0b13742d874daf6131b4cab7e31f3227afccdbde7b5ffed6389d8dad40fb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6ECC.svg","dictionarySha256":"10bebe320463a36c2b497d13be1ca6e1a88d79ac2c7ee88376d6758d8ebd5768","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"擲","strokes":18,"corpus":"Ja","originalMediansSha256":"02f15b1fb806ac6795940c46d65ed32fda174e4295b297ca1d2bf7e4e6a05066","pathsSha256":"fdaca22d24705ba16e636a964b809b0e20d46334fd86aab06b16ed1bc6cfebf2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64F2.svg","dictionarySha256":"ff7910405b2c298994953d4cec24e368c7ab7845e9b4e0309f66a546814b0d4a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"闡","strokes":20,"corpus":"MM","originalMediansSha256":"658e3646c8464ee048cbb2a5e2d8fc3b149d99b9336b7cf643b66c2207010176","pathsSha256":"a1d97e04f72f3d7f967454561bb0872d785d83cfdc386898b035769ad948dd95","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95E1.svg","dictionarySha256":"54ac0abf2c0e0ba2e5dad11e859b8a16e4a76f003f9e3f80cd8ba16448623d30","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"穿","strokes":9,"corpus":"MM","originalMediansSha256":"c3e225ee49d14597dd45ee944e8e522891fc29ca35ef6cf65f262ed35d99ed1d","pathsSha256":"656ac7c122134e56eef65d07766680d1346a4131e2ec67fa5aa3e87844ee7189","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A7F.svg","dictionarySha256":"dad5039075705bfc222e3baef5f77e3206315a5bbcc019e56ebdbeea428588e7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"擅","strokes":16,"corpus":"MM","originalMediansSha256":"86d0ecf642d61e774d774f974a6e67c5a60270fdef6dd33c995d2a423e74c6d9","pathsSha256":"b21276e200fc7ecbf1c3ba612bb6446910cd7d493407d1190f347cedb0856c51","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64C5.svg","dictionarySha256":"67c2579d8866dd9ded0c9d88c57703beb1f933d863947e129372abf9195be0ed","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"喘","strokes":12,"corpus":"MM","originalMediansSha256":"34256d2edab13192cbd618e0b7c2cdc323439df4a9ee869258f73b1e7439afe1","pathsSha256":"7a256b7f2fe6f497e5c4b7ef43b4089fa506d2d50261c48d14e8e134085ea5e8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/5598.svg","dictionarySha256":"8b89674636634319d39f15bc61b7b17fcd1a4eb26200f99ee8f4335240e58e4d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"轍","strokes":19,"corpus":"MM","originalMediansSha256":"903486714d10c22880444cb81d9159834be465ae9d6c942d2789537f8451aafd","pathsSha256":"7a64b1b4730b7af773062e72ff4170d1898f70a934799451aa9067f049259072","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8F4D.svg","dictionarySha256":"c42ac7478754023bd5eb1bf247abde503b820c50c3452985c12fdcf470436762","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"綴","strokes":14,"corpus":"MM","originalMediansSha256":"42dcdb09089c4acf99beb0a819c06b9878b0a5cd583e7a19f93ea6b3bb2c27f5","pathsSha256":"cc75c87176c9e2248efecca27706af0163fc3f032c3936e9e1f57ad4ae732565","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DB4.svg","dictionarySha256":"6a76e99dc08c29a007defa17185a39599f264107a9dc14852c83714d7be44517","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"籤","strokes":23,"corpus":"MM","originalMediansSha256":"bb95fc5fda96002d84b0ef308f90b0fa2aa943e7e6aa59e744a719619ba1a1b2","pathsSha256":"eed0042f8b7fb82dcb797ec4d75d8db20d92e7fe42da4d013b17898e48d87e67","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C64.svg","dictionarySha256":"55fbd861cc818b3f9ddc2e2d16210b4a3a2111e286e8589cd6dfcc74a6f6a72f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},
  {"glyph":"僉","strokes":13,"corpus":"MM","originalMediansSha256":"f77d0c968cc71f8345498f591b458f0d179b8f2588248ebed4673b8ed25fe02e","pathsSha256":"76267191751e0e3d2dbab44843e5c5530418dfbf30f44bbcb8dce385d3d70a08","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/50C9.svg","dictionarySha256":"c0584073ffc8aae2a7343edb26072c482c01af6fa42102039d4d5bec1674b27c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"諂","strokes":15,"corpus":"MM","originalMediansSha256":"960469fcc9e6b0fcf043150c75f933e8e4b2d1c8910573243ba65abb4c5c5cff","pathsSha256":"9dc3ff7b1da100009bca57b9f083ee04639743b8f80c94a3e5c5a4402f648fb8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8AC2.svg","dictionarySha256":"9e7486278e9e9da02ddee34913f1955258e3c0a992c0ece19931e5f2f30be99c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"帖","strokes":8,"corpus":"MM","originalMediansSha256":"044abac4bc5d84d43656b4670a695e0f6a0c0326ec6d1e5c54bef3a323e3cb12","pathsSha256":"41c0932e99da2c5c25f192b5c47ba071c54c3b82922145f97f222172ab68ae80","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5E16.svg","dictionarySha256":"ccafa6f797c807ff266ee7d2b80f49d7cd64a299888570338b0e19425d8db69e","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"貼","strokes":12,"corpus":"MM","originalMediansSha256":"f08c8b9ef79dc2b76b010aaa10f1de27c6a2ead3db995f9566d607a0f805aae6","pathsSha256":"af2837a78098e4b19376e27742ae9aaa440ccf22539699519181ba9ba871dbf9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8CBC.svg","dictionarySha256":"e8bf14bd5524df443aae7692879b080acebf7bbab17a231303494f5b413192d7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"疊","strokes":22,"corpus":"MM","originalMediansSha256":"4d3f3b04972e035d5c7185c70fddd254a0a147372fc4775ad2474362713ce12c","pathsSha256":"384348ddc00cc2236760c5f163d4476256e5a429e9c5ecb7668e91695def5b07","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/758A.svg","dictionarySha256":"f1a70b65de2538f8cb10a8e70fd9d36a5492ff8c727ac7646b582378400f8e69","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]},
  {"glyph":"牒","strokes":13,"corpus":"MM","originalMediansSha256":"9a801fd8ed85bda359fcb339fab4febd1496976725ed0fbf61eda0586537c80b","pathsSha256":"a63c1118fb4a5d29e70f7a6a328f7c392c687ee5b959bfb3c3d57d9611750074","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/7252.svg","dictionarySha256":"4d209033234b78aa738a83ac976c8ca727029eadd0ba5f69784a820127fa0edc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"捷","strokes":11,"corpus":"MM","originalMediansSha256":"5b2eba7b7deceac14aaf93ff97115e4025a7927c7f7014e8c4bcaa0c45822668","pathsSha256":"0f8d37933d8e1fd594d121490ef450ee35c8c6d1410d9a401118b0e1134ef83d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/6377.svg","dictionarySha256":"b40fb973c83250b3b904c4c1c2bc53bb73b2abe36e89ef903455a08ab20beb6d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"涕","strokes":10,"corpus":"MM","originalMediansSha256":"f94285b65f322435e4aad520b9d26888f97b74427b3b70ffee82ea10123f63bb","pathsSha256":"73110fc4254bdf30cb32d64025ac4fbca0dd173fe537d1665e667dc38ecbf4f5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D95.svg","dictionarySha256":"1978c6f5bbfe0f6a24a4e317499914e407012e022c5dbc12cdd9e6b09110cdfb","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"諦","strokes":16,"corpus":"MM","originalMediansSha256":"d3f34ef21e0a69e859be62716982345a6a9b104b25d3ac8f9d8901762e4b57f5","pathsSha256":"2a61603294361420c33fcff25e0117eafb645b67e8ea20248239b0192a0a2b86","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8AE6.svg","dictionarySha256":"e27616979eee3eb3a562530b96029564cca164e5b0fc5edaa93c2e1b025b0c60","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"貂","strokes":12,"corpus":"MM","originalMediansSha256":"0fc3508b7c2b166001c61facdb06f61f60e234b61b570309691c4af9b0c731d3","pathsSha256":"c89c3165be3fb2b39704beecf7132270e510de832299b0b5645d11e67cde7150","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C82.svg","dictionarySha256":"29092bda910b8f67eb78a76a87caca23b0d4cd819cf6f8d3a9e1f3011b89f7bb","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"礁","strokes":17,"corpus":"MM","originalMediansSha256":"287f88b1a17b4f4683b4ffff4affd1588b1ce65b46505bdd61b6b31af982a7b9","pathsSha256":"b4ec872ece9876bd2f646afe56960359795afe7134843ed74e02ebdcef86d323","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/7901.svg","dictionarySha256":"36e521d1041ecb9ed40f1c07faeedce67d18fff06569169d2c680c582608bc02","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"硝","strokes":12,"corpus":"MM","originalMediansSha256":"086c446905e0790b8003b665dcd7c3ad37570f5f7f89b4e3d8060beb80455f9b","pathsSha256":"0b87c1724b2b8fcbeb6db35cc82216f8c6a992a154af1649245b14834abfbabf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/785D.svg","dictionarySha256":"06b02430d21922fef21c72587cb6ac1b2402f0eb5ed04f907d2f0a68e50ad1b0","sourceStrokeIndices":[1,2,3,4,5,6,null,null,9,10,11,12]},
  {"glyph":"憔","strokes":15,"corpus":"MM","originalMediansSha256":"d73e7a362e801e542504e62efc3a1209c70c5f1821fd6712c953c14693557672","pathsSha256":"ffae129f8275b1fcf227278045cc6761ab43ba50a551279692f7a39b62f8b3f0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/6194.svg","dictionarySha256":"ffb36fbf8297faebae987e50c29f33b8abcc47a127546418d4b90e6dbe5eadcb","sourceStrokeIndices":[1,2,3,4,5,null,7,8,9,10,11,12,13,14,15]},
  {"glyph":"醋","strokes":15,"corpus":"MM","originalMediansSha256":"fa4b07982133e0da075b7e664322b00cc9dd598ffa02f4ddc18c46636abbb982","pathsSha256":"595d747829ec02cc368ec482921beb17339d3e4433b8effccbda37b257fbaa9b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/918B.svg","dictionarySha256":"fdadbdb654acc2db7a2711f089ecf650d81b66fcc665cec19ee142bc5a315947","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"樵","strokes":16,"corpus":"MM","originalMediansSha256":"c80d25887ca5ea5bcb61b61177f2c5e2484a121c2e37bd20cdb8da7432758b62","pathsSha256":"144c63e5766cf4b475c1c2510696a3cafea2cbabbc0620e125d94fd3f47c6d5d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6A35.svg","dictionarySha256":"a4671aeec000e7ad33b14cf7680ba1aeb81a41e7ab09c15aa9ad50756cd09597","sourceStrokeIndices":[1,2,3,4,5,6,null,8,9,10,11,12,13,14,15,16]},
  {"glyph":"梢","strokes":11,"corpus":"MM","originalMediansSha256":"de36bc1615613a8709c4e5efb13d14e102dae047f6bda3988600728c3dd0d45a","pathsSha256":"389864ac47065d3815afc285caf5a211f00f345cf35b0bbc2dc19d3a80007130","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68A2.svg","dictionarySha256":"f20e4f546eb42a2203db4d2e2ec112124f8b4493ff02e112037f96635b9c7fa0","sourceStrokeIndices":[1,2,3,4,5,null,null,8,9,10,11]},
  {"glyph":"稍","strokes":12,"corpus":"MM","originalMediansSha256":"0916a8b965ab851301b2e47e85212c94de0f764ff06ae1839466d0cf85d44b55","pathsSha256":"d8db15f5ccb3e62640da391023318454bfbeda8acd470f43eaf3c9de92d55838","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A0D.svg","dictionarySha256":"13e8d7627796b76407ae35cb759aad0dcdb9d7b65135674817b90b3f5e002622","sourceStrokeIndices":[1,2,3,4,5,6,null,null,9,10,11,12]},
]
export const G1_BATCH17_DICTIONARY_REVIEW_SHA256 = '84fd539e6b52dd34e5e4ce747169c89afa3e8d834a486ae0d789349a68524bbb'
export const G1_BATCH17_DICTIONARY_DIRECTION_SHA256 = '22eadd38fbc69050ec7d9fe4adb0c05025d910b2356e03b0d4a642e99de6e0cb'
const referencesByGlyph = new Map(G1_BATCH17_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch17DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch17DictionaryMetadata(ref: G1Batch17DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: G1_BATCH17_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch17-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH17_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH17_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH17_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch17DictionaryBundle = {
  verificationSource: typeof G1_BATCH17_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH17_DICTIONARY_GEOMETRY
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
export function loadG1Batch17DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch17 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH17_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH17_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH17_DICTIONARY_REFERENCES.length) throw Error('G1 batch17 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch17 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH17_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch17DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch17 dictionary entry mismatch')
    return { ...g1Batch17DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH17_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH17_STROKES = loadG1Batch17DictionaryBundle(reviewed)
