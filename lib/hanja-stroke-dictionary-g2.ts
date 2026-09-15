/** Only the 44 completed grade 2 reviews can enter playback. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 batch 1: 44 individually reviewed characters. Not exam-body certification."
} as const
export const G2_DICTIONARY_GEOMETRY = {
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
  }
} as const
export type G2DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G2_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_DICTIONARY_REFERENCES: readonly G2DictionaryReference[] = [
  {"glyph":"柯","strokes":9,"corpus":"MM","originalMediansSha256":"46d8e9251d797ff3902cfec424f86985d86e487414eaaf6a172a6ce5327f06c2","pathsSha256":"eb52a3f5a62aa1e0374c3a8fd6fa1b5714d72651b504ecc1b2ed2357689330da","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/67EF.svg","dictionarySha256":"e3b4484f42586d32aabdc64d1611e048e03d821dc6dc341a23dc7e44257f6f0b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"賈","strokes":13,"corpus":"MM","originalMediansSha256":"6816c8ad9e7630fbbda4702c303a492f2083e9dbedc2bb830fe82a42193412d0","pathsSha256":"40353ac0e4bae93d1a5bca9bc202a12250aef02154f906f17438976f8b8422e7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8CC8.svg","dictionarySha256":"e132581899858d9055c519cc03e2fbeadb2eb7d9266b4b5797051c3da1eade25","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"軻","strokes":12,"corpus":"MM","originalMediansSha256":"eaf5a3869d9f48277ee559807503d2b3d1a1e7893191710660d0df63b9e7e4c7","pathsSha256":"d2d0eeb193aeb4ac975bbe39f451064c7055d12abda51ac002ff2ba1be28692b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8EFB.svg","dictionarySha256":"05e584624ed6ba1ad90f4ce703fe491aada6ab97a27d9278728fb6400069909c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"伽","strokes":7,"corpus":"MM","originalMediansSha256":"f67a99d43f2b776b02d3f6b87c83bd4762e33e19e811d3c9fd4d51b28c596ebb","pathsSha256":"fdf7f60fccde7b7a0e215314dc936870854af742bf167dd90f56385dae17504f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F3D.svg","dictionarySha256":"9c5848ad6a5955964a487301f043bf9226b57562fd302e0ba20ccea71dfea807","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"珏","strokes":9,"corpus":"MM","originalMediansSha256":"53e59ebbd8de7428b7fc233bf5476e0b7eec5aa41324303e3338d08d72630460","pathsSha256":"2381086c8aa3a901746c986914302f50771723e997f5ba18ce913d886f3c82a3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/73CF.svg","dictionarySha256":"a0938bfd4b3864d10df9f32e8174070793d7bf96e21b3142aa2b3edba838c2e9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"杆","strokes":7,"corpus":"MM","originalMediansSha256":"e6f2d8d953210dc551644373d0071f5aa1e7dd47f6a96022c5064a5ddab39f4c","pathsSha256":"bcbdea66f8ccb7cff9f191811fa90d35096827aaf577a2e8cfdc567bf163d43f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/6746.svg","dictionarySha256":"ea3cbbd7311237a5a7cfb1c93dc15e3f24222ca5fa75d3936d38e11e1be36b75","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"艮","strokes":6,"corpus":"MM","originalMediansSha256":"db7034f4224179290036e4522c39c2785c04a502436cc07f297511b14a0a6d24","pathsSha256":"5086b54e34ae966215ccafe4b774b24dd48dfde2b0be2309fcedea63212379cb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/826E.svg","dictionarySha256":"250eaa504302b8441dc19a7ed7129f7709ab37181d980da4ecf235a12cef3190","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"鞨","strokes":18,"corpus":"Ja","originalMediansSha256":"87bbb43db6d6eebda3c98c419b8eaa5986b99cd00d953cf37c98829f73de2888","pathsSha256":"7a066e1a53b6b79144e8e80ff927049babd4c186872640f9632a0acaa5165deb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/97A8.svg","dictionarySha256":"75ee4071e9c20cfc5c4ea678295b6c3293fbf378f3cf2aac100f5f15d5de1099","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"憾","strokes":16,"corpus":"MM","originalMediansSha256":"fefdc4bacd390696377b6c08a7d795287fa54b4a04f3edfc634356c178abe56b","pathsSha256":"fbb57af65d0136bba7021020d53ff3f57fc65c1ed5fd09ef827a8deac7b3ad38","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61BE.svg","dictionarySha256":"b8b25525fb40c238c4b649ea25c4a8483b47d89def037836c0f1ba045c457aa5","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"鉀","strokes":13,"corpus":"MM","originalMediansSha256":"c9b4a4831166a112795071c214bc71d69c3294fceff398b8ce680b0703a9d007","pathsSha256":"d566b787784b743e817c7d99396e00c4d1e20f07774ffe7d40923b8df52c982c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/9240.svg","dictionarySha256":"c5bce712dca80ac7c78f10b93525d9c96b6ac5162f74edab35e42492cf1f402f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"岬","strokes":8,"corpus":"MM","originalMediansSha256":"574e95f94ac29b9071afa133fc53768ce104d6b882e9a8e619fa83067b23df33","pathsSha256":"0c76f67cae7a1ac110201ea3d25240cc0d3e22f896e0e3ce230035c8086daffe","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5C00/5CAC.svg","dictionarySha256":"c0525215bcf4d5f468c061328210e7e90d1e0ea65cec98febef5b842c85a213d","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"姜","strokes":9,"corpus":"MM","originalMediansSha256":"759a6571f40c3e45b62327d25be2fa1683cb8f3522877845081523e418459e52","pathsSha256":"7f9038f8805760b5f1e6c51a4503f1c2ba35c28c63f7104cda821044236ba6af","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/59DC.svg","dictionarySha256":"73537dfb60a93185c7ab11a35ab5d5edafea2a2c417c3f93f65b21cd1c37a5a5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"崗","strokes":11,"corpus":"MM","originalMediansSha256":"556d0e84f7cfd88c9b1f4871d356ec88e1bb86442a1b4d92aa43943c24c25dda","pathsSha256":"cc6d775429f623fd3e5ffcfaffe4efb6c29a9de917791739265da1ff81c6dd91","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5D00/5D17.svg","dictionarySha256":"fbfd38dfa58cef3ae9172fd953a0597c45fd513fa442cbb95c2a9efe443646d3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"疆","strokes":19,"corpus":"MM","originalMediansSha256":"7e1d472105e1ffa11280997fd6de939d0f9c7944a1a4686e3014ae5ede926581","pathsSha256":"858247455b962e58a1d4cc7e0f8a093e35f13ef210f65e58b62f83a78977a79b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/7586.svg","dictionarySha256":"be30b32a904a356f195861920a2bf8daf2e9be6b81ba45277bf1555c66c07bda","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"岡","strokes":8,"corpus":"MM","originalMediansSha256":"c8af2347f26b15c67652f14b600ce6daf30bba93436215be658c0e5b5ebfc251","pathsSha256":"1d3ae44ead2a21e286bc34a735350e072f264f061b9e2a675f67b53fe1868b1a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5C00/5CA1.svg","dictionarySha256":"d7a87b1d7e254b0a89c99945ec3cf8c1446623e75a62f8998abfea8fbd47bd92","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"彊","strokes":16,"corpus":"MM","originalMediansSha256":"c541dea78c38e9b3178e4a13e0cdb27ef38a28c0c42b8eb44554c46a3d585dda","pathsSha256":"189d666defea76969c304581caf00b3e9a3850d2dff07570e09e592e8c3170af","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F4A.svg","dictionarySha256":"cae8651116d450ac576260906eaafd4388dd8d7432046bd42b0a61663bd03bb7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"价","strokes":6,"corpus":"MM","originalMediansSha256":"2304d0dae10a4f9687ffe47983341c4b811ef65a2a6dd0df7031d938055d6469","pathsSha256":"7d0d82cc910b864ce09af7d4e69e70f6487f022b28cc50084669cd7e705c8041","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4EF7.svg","dictionarySha256":"61a373e8fb8dafe1c44a380c349799c3f70916ffac91cee0e77d177c09b4b815","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"坑","strokes":7,"corpus":"MM","originalMediansSha256":"306365a1aba45ce4f51f4bc2b7aa612378ca752fd80f0b576d63eb23c95ad496","pathsSha256":"59f1a694056b4136b5a1ab8bf647b3146d03aae6f2cd1b431fda30c39a111817","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/5751.svg","dictionarySha256":"6d6401afdcc8db6b520bb6007a804fccffa2e161e940d9d5d8e2d39bc6dba044","sourceStrokeIndices":[1,2,3,null,5,6,7]},
  {"glyph":"鍵","strokes":17,"corpus":"Ja","originalMediansSha256":"c93dfc98805305c3a4835ba444f2b1c07ea1bc054e04ec597f2969a64ddb0836","pathsSha256":"873f29a6104906019b20dc328fb840dc45375d99fed581c84e132b92c71c50bd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/9375.svg","dictionarySha256":"d618ab22f9544560e7e816b140b84cd21d6e7417328239a6a044765e2f109f30","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"桀","strokes":10,"corpus":"MM","originalMediansSha256":"e6ea08155d661b1a9978dcd7c19a05121244f07a036ce5e1cbbe6a596c41e7c5","pathsSha256":"959d8e20ac2fb596dcdc77db8dcdbe4b7e903cd26038d519f4fe82478aeb94e1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/6840.svg","dictionarySha256":"e12611338f83d35b103fac54b9ad1baeca69348b89707a974493c4d95d805dab","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"杰","strokes":8,"corpus":"MM","originalMediansSha256":"d8da3f5c94fdfa2c3380a685423f06f6dc7c702304e86eb6b4d0f62edba8efc9","pathsSha256":"f7fb2514140669c525bba2d68fcaba8cd0e037e4a3674a9b7ba0583a749c49d3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/6770.svg","dictionarySha256":"a27825f9ea4636867e4a4d504c5e6df1f4eab4cc99d2c94e8bf4a6bbd8abea7a","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"憩","strokes":16,"corpus":"MM","originalMediansSha256":"aabd606f87324c6777d30f9aa8a57cd57521449bcb36abd0df40812e0015bb78","pathsSha256":"e137e98ae1f08be668671dddbb5188d3ffb437a7494b189978f00b3bb9198843","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61A9.svg","dictionarySha256":"899b4fad51bbece72874729cc4e5dcb1203b33cc9d5dd30df2452d7dd80ac9d9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"揭","strokes":12,"corpus":"MM","originalMediansSha256":"9708eadd8b3133a648eeae6e4932e0b37f7050aa6555bb4b6e9e0fc92f6bfa2d","pathsSha256":"a994fc68f299212f5ed1cd623b92cb65d38b374052964329e45c6dc6cb8818aa","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/63ED.svg","dictionarySha256":"e07291c360b0b49ac6b65a53ff9529a7c2c118b3b99ecfbd298aec33f1aeef34","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"炅","strokes":8,"corpus":"MM","originalMediansSha256":"cc705946765097bb1023d865e2e313088aa2e89d6836dfe0348b5fd65bdd3dd9","pathsSha256":"d35ebefce50428cdcbe169b675e9bc7c0b9d26afc8c90a1bb2663dace5e2f174","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7085.svg","dictionarySha256":"7a4150c43e7523b168415dfae13a514c284cb4767be5fe3aa9b5129c0133f043","sourceStrokeIndices":[1,2,3,4,null,6,7,8]},
  {"glyph":"皐","strokes":11,"corpus":"Ja","originalMediansSha256":"6ba660fdc0696fce37676c9d7301e6ea38d2e63e29be6d0e36cad9ba9522ce9c","pathsSha256":"e7296e06c19320eb9378ee6837574dabf835aec36cf4eac1806bf49dd6d960bf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7690.svg","dictionarySha256":"880645e380f66f864dc17bccd4f385d08e484148aa2e09857bc1872ff300da3b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"戈","strokes":4,"corpus":"MM","originalMediansSha256":"e7ceeba65d2d1966fc403afa515384062464f6494a450102045183f5c17e0bd4","pathsSha256":"30e91379992ce5443786c00091b77bd0e686bb73b9246b9f06d7fb77b26ab2ae","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/6208.svg","dictionarySha256":"8dbf9af07c201addefba8a69e063bb0c6fdde4ac54cc0891a8b8d5e9e4ec8aba","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"瓜","strokes":5,"corpus":"MM","originalMediansSha256":"8a44dae29a7a0b2658d6024b60d903385a645ba68e1202cd3c30b0d5be1d80f8","pathsSha256":"0ba87b75bb7deeab84ca38ebe523b5fd7c063228d27f25ec564325b2e6d7f629","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/74DC.svg","dictionarySha256":"a59379db4334566c148a4fe8bfe9eaf830889fb62ef8edc32db572a4b5f3fd9f","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"款","strokes":12,"corpus":"MM","originalMediansSha256":"e79945a16aaac0dfb7cbe069e0761a82039779f37f8235a9bb74ce2aef3c5579","pathsSha256":"1f57979bc8136f7483001863384e305a56b4670ff54d5950f77c174bf0d57210","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B3E.svg","dictionarySha256":"85a461ddd6b8fe1c3fd57179aa38b0faccf094ac5ac68138bf690e12598349b4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"串","strokes":7,"corpus":"MM","originalMediansSha256":"8b997cc10a3f12b4fefc0edf12a7f6c3ba561da7616f604f46a995d954a53194","pathsSha256":"2ca4e7fb66a26e456ce5a022adec26d6b510ea624e0099dd7bc1f29e935308b2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4E32.svg","dictionarySha256":"2bc65ab3dc937748a5fb887db66c56367c86d4e4acac12c9c33a30245eb919cf","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"傀","strokes":12,"corpus":"Ja","originalMediansSha256":"b4de22a35ffcb0ba93910e471b1270e7397f0bb111b232d8e024ef49df270f48","pathsSha256":"3bae3b87419cfa21a10ca520fb320aa0db4b898908bbedfa3796a058cb538f6a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5080.svg","dictionarySha256":"d8a9e8c73ecb157862c21d6554eafb66fe9726159c9f5a811ee008e853ce52e4","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12]},
  {"glyph":"槐","strokes":14,"corpus":"Ja","originalMediansSha256":"d47468495b6c4f0047b9fdaae6f6610af9ed007a9cf61c600d48903b7f41c60f","pathsSha256":"3e397461384ca801bab9b9468d53fab64d21c3cc8318e0b88fb9695ce29d2889","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/69D0.svg","dictionarySha256":"0ae25f3b3b35886ca60357b88970c7d2f79ad3b24ec1e86c09717021495ec180","sourceStrokeIndices":[1,2,3,4,5,6,7,9,8,10,11,12,13,14]},
  {"glyph":"僑","strokes":14,"corpus":"MM","originalMediansSha256":"903cfe1590d4ed23b3a09df0fbf11c9052e4b8fad884fdf837f6b0adfb071c11","pathsSha256":"1d543c0084968da539b685103912f3fd47ac5a972c507a42f1745a81ef185bf3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/50D1.svg","dictionarySha256":"bf9a63aa88301434c34fbea311b02170ee885d6270ad40e9a0c8bfa47294621f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"鷗","strokes":22,"corpus":"MM","originalMediansSha256":"ba8b4c2c74f400193208076763aee79ae8e6e127fcb52ea1d024697fda455d07","pathsSha256":"fbae06d787ea616a5269960a882af4941737cd7ce3f35f93d113f31730075d48","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9DD7.svg","dictionarySha256":"7f4061a90b8e5a9dfaada5a77711eeaa018dd4c930c7a7117c7b050dbfb83aac","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]},
  {"glyph":"歐","strokes":15,"corpus":"MM","originalMediansSha256":"4e95e39c10f26e28c554b740153ee6532e8427dbcdf29e08d768274db87ea2b3","pathsSha256":"ab3c973094fd6a1ccb453bc6c9a38a9a1b6352223f7d11e46abf990f9609d624","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B50.svg","dictionarySha256":"073825da180fb9a570e028b567cf9396db6b631af41c0da581d7d8b588dbae30","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"購","strokes":17,"corpus":"MM","originalMediansSha256":"331b7a29745bde2ad3ce84f6a52740a3f2d8c77aa51bdef8690a668cefb8f01c","pathsSha256":"9fd329b4ea59435ca5afa1d285fbe1f5a26b6f5d8d98d15774318de6ddeea9c0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8CFC.svg","dictionarySha256":"26947ea9c26b34f926b09d21813deb56853bbf8e9af44e90230f3380f0b33d24","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,null,16,17]},
  {"glyph":"邱","strokes":8,"corpus":"Ja","originalMediansSha256":"2670385a1e60a1809d65f913ddd37b59a361e1b36ae19639330b197601d8821b","pathsSha256":"593fd86d2db2da400e4d88bd71baf2e04b2f8b6f2d4ab0616a2ec55f975a8bd1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/90B1.svg","dictionarySha256":"84f03c02462e77a3f729fb8e0f07cced5e253d1fcb60a5bb895ae6a94534359a","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"玖","strokes":7,"corpus":"MM","originalMediansSha256":"ef2358ea2e52ab6cdfb92acd0feba7f36ddb32e1657f5c5c605a43b48186c807","pathsSha256":"38feb906e52c8190d050e4b8ef15c252fc929a14da74c39aeb7a48456c92b281","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/7396.svg","dictionarySha256":"07c375464ed200ce36e4a0d370749672b59008cbdf86a1869b5f1c408f44d8f5","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"鞠","strokes":17,"corpus":"MM","originalMediansSha256":"452574b1db71adaa223afd06018670b6e025ce1199fa3e86ec634cada7c3b9b7","pathsSha256":"05f271d3e525cb48af258f0c1158da7eddba3ba6e55f152862d6ef1d850002bc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/97A0.svg","dictionarySha256":"5d3df0ad412e4a2b99731efe29e91ff02a3b632961b212ae6e19c440ca68ee1e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"掘","strokes":11,"corpus":"MM","originalMediansSha256":"f219dad92fd690096e3fe43f68cecc5a941303bbafffd3d738e595de69b27654","pathsSha256":"0838e6c1c21e5c33733af3d68e3c0fe966dc0a42bcc5fcdf95e511a160a55253","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/6398.svg","dictionarySha256":"33ca3b684b326fb496c473a2f503709626718746e4ed1e04507a4d4912f6a58b","sourceStrokeIndices":[1,2,3,4,5,6,9,7,8,10,11]},
  {"glyph":"圈","strokes":11,"corpus":"MM","originalMediansSha256":"c98fe3dda62621963e2eaaf9992a3974f26004f290733f73aa461d6ba2699837","pathsSha256":"fb87714cebaed71567e9c7798405be1ebfb61748a14fc9c5d22792a66654192a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/5708.svg","dictionarySha256":"20dddf379867b4c9ebc527d77806f5372a4ed30da3f38b8c60e0bbdf150e3cff","sourceStrokeIndices":[1,2,null,null,5,6,7,8,9,10,11]},
  {"glyph":"闕","strokes":18,"corpus":"MM","originalMediansSha256":"594184ed3be678315a531bcba68996828d68ae7bb230494f7fbbcb68fefa026d","pathsSha256":"e9ce0df04f208749a6bb4973d8f300a2302bd0f0c8ec40814cbcc3b941960c55","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95D5.svg","dictionarySha256":"5de15446ce56ff4f5d7044925c6bbe39c14ee41d884e76efe8792b587a1ffc6b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"閨","strokes":14,"corpus":"MM","originalMediansSha256":"f32e70f5779f78099f41d42a0dd2751030b76b40b62779480ac1ad5bf2f4ec24","pathsSha256":"29047ed69f0f3f5fe6113eaea88a5799fe6aea7a72e0ba4bc5ae2ed3d52286d0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95A8.svg","dictionarySha256":"c0ba8183c369592adfae6574bcf65df85333d030d493627876fb130bdd429252","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"珪","strokes":10,"corpus":"Ja","originalMediansSha256":"35a61dfdcb4116fc8370db2ce13e1412d62899441bbfb0f71f132647dd742fbf","pathsSha256":"da6c67f0ac26ff16734cfe7085aca42e6f2bfaaa1ea2770f257204a5e969e50e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/73EA.svg","dictionarySha256":"eb62511da6ec98e0bf624251cc9e050017f74978f2f4cfbcaff3ea6b35c9a7b7","sourceStrokeIndices":[1,3,2,4,5,6,7,8,9,10]},
  {"glyph":"揆","strokes":12,"corpus":"MM","originalMediansSha256":"984368fcf16af001f4dac8e300dda3c2645fb04b017396db6daf442700f8b88a","pathsSha256":"e4e90f68ad9c26748d801e6742ce19b41585f7f9c6e44a370a4e95ae7cfdfc3d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/63C6.svg","dictionarySha256":"2af937a697fe226e4c0cdaa093d89a16cdd4f77ae55ef0662c7c34fbe9058c1e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
]
export const G2_DICTIONARY_REVIEW_SHA256 = '51e401ab09bfc457f1ee83b37ef373a90896de48c1fbffb704a685e6b73ab6a5'
export const G2_DICTIONARY_DIRECTION_SHA256 = 'a3612559268d40232337ae34d9e8cd9f60499e2f059fe3ff338d14b4cc15d573'
const referencesByGlyph = new Map(G2_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2DictionaryMetadata(ref: G2DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-15',
    geometrySource: G2_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-batch1-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2DictionaryBundle = {
  verificationSource: typeof G2_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_DICTIONARY_GEOMETRY
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
export function loadG2DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_DICTIONARY_REFERENCES.length) throw Error('G2 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 dictionary entry mismatch')
    return { ...g2DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_STROKES = loadG2DictionaryBundle(reviewed)
