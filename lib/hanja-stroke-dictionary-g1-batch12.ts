/** Fifty grade 1 forms (batch 12) individually reviewed, including 12 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch12.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH12_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 50 approved and 0 held; 12 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH12_DICTIONARY_GEOMETRY = {
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
export type G1Batch12DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH12_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH12_DICTIONARY_REFERENCES: readonly G1Batch12DictionaryReference[] = [
  {"glyph":"軋","strokes":8,"corpus":"MM","originalMediansSha256":"9285fd01263f7e6266beff45384bed4d033bdf2e8f959de936fedf5e0b3a1f11","pathsSha256":"495e44021dc639770789e8ef4e1053ef2c57307ac8c293ba810eb3c7d2628ca8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8ECB.svg","dictionarySha256":"8f09e0cfed6ac3acd9ce317d69ea5b8a9378b94cebbad44c92a68ff3cd334021","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"闇","strokes":17,"corpus":"Ja","originalMediansSha256":"d5f4f58420801d656e1430637be4d34cc608ba35e2fa126be4d60ed93b08dcf6","pathsSha256":"9df577d99454b7b0d5aecb1e26f5172eabc3167354df8875cbb69d6d456e5818","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95C7.svg","dictionarySha256":"ce844f6159b6dda3451f614230d35772a7327494238d959ef5ddd6c3bf90e458","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"庵","strokes":11,"corpus":"MM","originalMediansSha256":"83f7715dedb62b8c3fc848eaa1f11b0a75315b24c203b3e285a0d159ca454826","pathsSha256":"029a02392a28716761eae514c54c05f6b6695d50a58ab5eecd553b6a5e0b88e4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5EB5.svg","dictionarySha256":"d03f6c3a01df1d65f4c892a9801ea3318c7030c0add98d21492609fd5840aa63","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"昂","strokes":8,"corpus":"MM","originalMediansSha256":"3d413e1db4a903d70920d5b6b20f4bd00c34ce16b746995e55af3fe87bf1b74f","pathsSha256":"1433861a6f8fb76372e3e48a59a592a84ff0fe865fa8178863bb97aaee7af3df","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6602.svg","dictionarySha256":"c9ebee3b094ee8b217802afe03af6d57997c7ab1f71780ddb1c54167ab1d7d71","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"怏","strokes":8,"corpus":"MM","originalMediansSha256":"cc58e80932c69d1e264239ab546d265d85e7e8eed3f65d3c413c4dba28a7e7aa","pathsSha256":"7d5e52a92718fffad12eb3f510824af42d3112694c8bd1a919c4a6e8ee903f8c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/600F.svg","dictionarySha256":"a99af449ecb64c8c607915a81e62fd5c63fd4d0babab7e9b768664919e90a446","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"秧","strokes":10,"corpus":"MM","originalMediansSha256":"54cd3bfd8cc9aec0bfd634fa86d965f79d8c37f27988b964e8d9ffe21de80ceb","pathsSha256":"fabc38e1c89a1e8239694a9c8d9dfe08969835ddc52602d5e5ee5a336471096d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/79E7.svg","dictionarySha256":"4d971cbfdce6271ffdf50541f18883fe0469909126d2184373bb9adeadc46244","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"鴦","strokes":16,"corpus":"MM","originalMediansSha256":"bd5a57fadb1d04fa50266941603cc0f2a975d1d97b411a0896ae918a469c3de8","pathsSha256":"4c8f0164f6f2308a3b299e2212594c0ebc9b0ec05d3d89f060ada9922dcbd7a6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9D26.svg","dictionarySha256":"c52752fe55ed4a15867eb9bc69c723f8f3ab2f194410c916202d5919bfd83f54","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"崖","strokes":11,"corpus":"MM","originalMediansSha256":"6e97adbe743a4e05e76ef17b0578b1b444e9b909813e7d14e7a35daf6d0033b5","pathsSha256":"19e130d828a4860529fefbdd1dc04026cc09eb4c2ec451f9d5a1ae4c4a4e9d39","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5D00/5D16.svg","dictionarySha256":"73c028954e1e7dca846b7a45b84091fb5324c0d0a1ef53628a04780dae20a516","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"曖","strokes":17,"corpus":"MM","originalMediansSha256":"edd03995e5a43f629ad72913e7e1be78f65530c4597897bfc710550b138b8ca4","pathsSha256":"8c5905fedd408c1824a73713d9ba0c6cf4e8a7fbf6e2d26365d705606e2bb3cd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/66D6.svg","dictionarySha256":"5b5d50495a7d2f56d9f79cb41543dc9fe3461581564fcf57f230d55f2349b4e0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"隘","strokes":13,"corpus":"Ja","originalMediansSha256":"9f429ba6cfc5fc5ed23e11af9dd39ac087db1407beb935fef90067e44660c8ea","pathsSha256":"38aae19645dea13280053b9e203be9a1fdb948c235c7e518cecaa113b7d5c958","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/9698.svg","dictionarySha256":"54bffaa63d1701d5d77dbf76c637b488b8cf6348f7f316db11f739d0dc12bf87","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"靄","strokes":24,"corpus":"Ja","originalMediansSha256":"daf87e72dc57814b3fcd1984d7457b34365e1265ac780d0c80cc70109b800c33","pathsSha256":"786e08d04bfca3d3f19e15ff49748f180e555ba9079588900caa1970fac795db","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/9744.svg","dictionarySha256":"c897f4049284ed4c36a44b8ff8bb0c994cd99bed340c4d03fb821c914af43b8d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]},
  {"glyph":"扼","strokes":7,"corpus":"MM","originalMediansSha256":"5814881036aef91a63ce1ba0948f3dbb4ac52b702e63290268ae63208e68df22","pathsSha256":"3cc842a3c3e26d4ef6c69ecbf421c8db35853dc03443ba25bb546c8ee6fa5e57","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/627C.svg","dictionarySha256":"05606234374aeeed179978c1eb4d3acdb830afdcd707984f81c828e647cdc490","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"腋","strokes":12,"corpus":"MM","originalMediansSha256":"e94d769edb515ae532db0ef71ba36663e7d940d491f0595fc7423b28fba47831","pathsSha256":"ce50267f943851beedc7b3f0211528cc3518b70e01d4e112308cf20e9ec392f8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/814B.svg","dictionarySha256":"36bc4e509f5e4b4a4f02126e31f3a8500145069845010971fb9827c8a27ebe6f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"縊","strokes":16,"corpus":"MM","originalMediansSha256":"5651e12d0c0e04d6d0e283eace35a469a38259a90b4cc5d027b05ddb768dd8d7","pathsSha256":"5ef7b0779d3b92b8d26ed7c6401dc6046238550c91361b8c49d837fefca11006","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E0A.svg","dictionarySha256":"e2c6eda619343c882bdae2a8dca519ed66ec3d0d060c8e1d8392733cbe7464a3","sourceStrokeIndices":[1,2,3,4,5,6,null,null,9,10,11,12,13,14,15,16]},
  {"glyph":"櫻","strokes":21,"corpus":"MM","originalMediansSha256":"1a45abcc457ccf4eaa8b2916309f9e010a0a493ad148213bfbe351d434926579","pathsSha256":"0fbfca6cd7eca301a1d5a8b5ab34dbde025aee46cdc623ccce76c3d3b3fc3b59","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6AFB.svg","dictionarySha256":"178b87aca8e9e601cc9d38bd343f79d59b8812c7fa795a67b95f12ba47a90940","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"鶯","strokes":21,"corpus":"MM","originalMediansSha256":"0a84d3ed3f6e884a78e063e32ded887e01d1c630c0a9a791e51511a434aee55e","pathsSha256":"c0e5ec1fed1d0feb38be0c1515765cd574877f2c9ba5ef8af9879f700e304573","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9DAF.svg","dictionarySha256":"8b597ee53b7bdbea80d3d4f3c6e39d881061336c919eb9572a6aa5653daa87dc","sourceStrokeIndices":[null,2,3,4,null,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"揶","strokes":12,"corpus":"Ja","originalMediansSha256":"83883f165bc6578076de79189e095642c7a75c878eb5622fdc0b12e363fb2c0f","pathsSha256":"922770115d09868694d717063f2d5240938b3aefb8839675f0d3f3b8c536123a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/63F6.svg","dictionarySha256":"281128fb4a97eec89a49198e3f191b3fb1a43f63c5a9654007a08d5548b3d68c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"冶","strokes":7,"corpus":"MM","originalMediansSha256":"73295203fb04cbc31f52cd3645303507e466d476d7f03a68a3441ef27936b5b6","pathsSha256":"c59104f2550c989b12118480528ad62d65ba5e720df3dce813eda5b9a6b32791","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/51B6.svg","dictionarySha256":"b22d328ef600f03bcbbf233470954bbe4e6825b7e956bbaffa756f176a3d1376","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"爺","strokes":13,"corpus":"Ja","originalMediansSha256":"22c8d118491bb961f8570bdc9a4bf7eefad9c056075a2b5707d8330b52f44f3a","pathsSha256":"d440be050c571f320a80e80a528560c45647a1c4a940f1621815cf1ae16f6eb6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/723A.svg","dictionarySha256":"eab8e25fdc482dc93e6d709fd97b0d3f16b780c1fa17e7f7511f95ee667433b9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"攘","strokes":20,"corpus":"MM","originalMediansSha256":"9012f6a88e2df10bb73a109b92787f15d7022790dbb1ada14fea9a029e55f03c","pathsSha256":"f51bd8a1e249de620ab501807699c47524416a22937712e77ee5506bcd5c2259","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/6518.svg","dictionarySha256":"6c50fa476268f14712d1e2ed5df97ee1def98b43d8107cb7a94e7bb56a23a9f4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"恙","strokes":10,"corpus":"MM","originalMediansSha256":"58cd1fbb3daf6b4efda951fa97e159706818d693a8952a76c5b39b1048bfdb9d","pathsSha256":"377b472350450582a699b3f28c182b3ac08acf310c9ee4443015397f89270b63","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6059.svg","dictionarySha256":"bb4417a59f3e7690be87a98be4457939a7f02fae8ede1370dced6aab3a3aa888","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"釀","strokes":24,"corpus":"MM","originalMediansSha256":"f17770b82b4e04c43a2550fa4edfed4dbb6a73e5df597e587d9024b17f2b1a7f","pathsSha256":"e58bdd5713870aec962ab2fcb128b84babbf20ece3c592f971be2ad0b8dd6651","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/91C0.svg","dictionarySha256":"233f4353415829b614bdef10f139f493a859dd4cf36ccdcc47540e36b5a6036f","sourceStrokeIndices":[1,2,3,4,5,6,7,null,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]},
  {"glyph":"癢","strokes":20,"corpus":"MM","originalMediansSha256":"6a1e43d847a51874e44ce0be97950ec20b6b020c2455054d279f6e420df058a8","pathsSha256":"a59146c28ed1dde862cf0860d06ac6893f782521e1442c99678765e2bce41f6a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7662.svg","dictionarySha256":"b969ba504fbc718ea339c11604b5762ffc233c1be411d98c140990d402fa2a3e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"瘍","strokes":14,"corpus":"Ja","originalMediansSha256":"021def76d66a3a2ffd90f7ff5d5d070f1bf00f1f26474e69ee79fcc9afe6eb9e","pathsSha256":"5cde4c0557a2295329adb0e1616a1936b2ccf85dae2789112ea1eb3771062d5d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/760D.svg","dictionarySha256":"5f59d3e1c64a36c259a71a87fc302c8fe3deee7e4e52424455ed2f6fc63f9a68","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"圄","strokes":10,"corpus":"MM","originalMediansSha256":"4d8a2e6aace002f5162e0a4fefa766764dbaf821588e77b27c6f5b2bfd57b5fd","pathsSha256":"61db786e925fa4c92993f311dce477264d891823b43a7e33f46571ee9dc9b871","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/5704.svg","dictionarySha256":"c0230890c46d75bdc561ec1efe5b452e9e36a7d7ad81bbbabdcdcb47c05b9075","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"瘀","strokes":13,"corpus":"MM","originalMediansSha256":"be0d9ff9ad37472210b1891bde5746c5a48ec6da95117b332067166ae404a317","pathsSha256":"89d4da200b4cd9e4ea613b7f61b02b2ecd019220a0bac4563dac96e1713bb020","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7600.svg","dictionarySha256":"ebc64a1ed9a7b753819db1fe13988c51bcabe4b7e2e3bd83a99c20bb61a268f7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,null]},
  {"glyph":"臆","strokes":17,"corpus":"MM","originalMediansSha256":"fd3002d6bd292d668e1fefd3d510abcd32c83aedffe070e6d0944172d28e8a3a","pathsSha256":"3f442a8adc9ca4ebc7a7feddc38e6488090510d3a9f4edc9cbaecace910f90e6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/81C6.svg","dictionarySha256":"24f98a6d0a6f22c2109f0359e7465111b958c213079a25ac0653fcf0d6a5a98a","sourceStrokeIndices":[1,2,3,4,null,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"堰","strokes":12,"corpus":"MM","originalMediansSha256":"f60e3a47dc30882fc57300ffffd2b9cbb05ad762390742d2d79f3277ffbecde4","pathsSha256":"680b63284bc630197e8606c912ae4076b5fcddfcaed0380f8533bffcaa9c7f38","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5830.svg","dictionarySha256":"357922d4048971103a2cb01a342528f94360378d6409caaee571c83f494c065a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"諺","strokes":16,"corpus":"MM","originalMediansSha256":"9bfdca13421d32ef69b55d41d581c48880c5465f477705c6f89f3b1b3777a076","pathsSha256":"cfb953766375c3f54152d77c1c4c0bde8edf9fc99746b8803f81643c369dedec","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8AFA.svg","dictionarySha256":"d4bd8de433c673eb4132ab773927fc9a766864e4fc63be08698159f3e2817615","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,11,10,12,13,14,15,16]},
  {"glyph":"掩","strokes":11,"corpus":"MM","originalMediansSha256":"afdad0b7c445badbae73b827dd925fd54e4fd70ea2f329a556f8fd1ee36fab71","pathsSha256":"4c0327b213258e983aa5f850505ed72b6eb6c6a04fc866f0dc7d9cccd39ca3fb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/63A9.svg","dictionarySha256":"6ad81af6ed3a4d10a560d045061deb02290134cf5bf5a48303d300683291f207","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"奄","strokes":8,"corpus":"MM","originalMediansSha256":"ec90d04091aee5c998f5f111b7d9b2a5b5331c9aa8c1fbac68f160c62b47487a","pathsSha256":"6e590d46867f6d614f7d48edec0d74ba784deca78f9f853d35a89f6df0479343","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/5944.svg","dictionarySha256":"a5e7c09e1dffe820e77da58c7d4872630f4978532f37323719c28e444619d121","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"儼","strokes":22,"corpus":"MM","originalMediansSha256":"a1e4e5c5b289d256ad2f70218a4bd82ddf5cdde55aac692a44f6b20cb5ec71a6","pathsSha256":"e5742c82771e07d71779c912ef4a217f8c12b0829f7a700f370603319a08de66","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/513C.svg","dictionarySha256":"dd8ecdb344a2fd7504f94a888e8311c0c842293395a986a8ce18478eefa471ff","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,18,15,19,20,21,22]},
  {"glyph":"繹","strokes":19,"corpus":"MM","originalMediansSha256":"4ed2e90a7bdad438ac94050c28de27e96f6eb5aa8fd985cd9771280c5383672b","pathsSha256":"d0f81ad4cec2133c8743ae5f350d3eb02c5a3a4b51e5a594d99d13dd99f7f9c1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E79.svg","dictionarySha256":"24c78f1d5d72fb9e70699f97bdbf0f8f709e1c1804c35acfcd4c593f227f031a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"鳶","strokes":14,"corpus":"MM","originalMediansSha256":"31dcdf6f5b62fad31c2913d6213f7e3e9910bd6b8fa10bc3104eb19184d12341","pathsSha256":"536cfb494395e9284bf0a1706bc079e0db9405fe122934d49b9758d4af7ad626","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9C00/9CF6.svg","dictionarySha256":"ddffc8e1581bea43261d69b52c3d55b1b53200be66a2d8abc6649b6acb00ac4a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"捐","strokes":10,"corpus":"MM","originalMediansSha256":"2ad2ba9b237ebc2fad50b7d74e8d2b505ebfa5e3bba339d08ac1de5a27c6b532","pathsSha256":"0ce0fe69569191bee8b8fa332c2772b0fedcb4b89b196b5bf3c989ee1013ad8e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/6350.svg","dictionarySha256":"efa010546b1d826998e1b6ca0e47951ec6e3a9f6907106933dfa9a19232ec50a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"筵","strokes":13,"corpus":"Ja","originalMediansSha256":"b37affe5b4313ffc052649125eb1722f2d93087f948d658f04fc54e58e36a0f4","pathsSha256":"0049e9dfe724a8a1fbf145b9993cde5e998a1d46b60856406c5b111eb09098e5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B75.svg","dictionarySha256":"ab66f633ee9276730279f815465105706eefa6581765f6b62daa8d091d7176a4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"椽","strokes":13,"corpus":"MM","originalMediansSha256":"f784afc45d7ee979c72661e7cef47f78156c9a946f0fa13306323d7e08276bc0","pathsSha256":"e23b92924a9c3072e048e4755b9c0927098fc87e15f69c92e9712152517da57b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/693D.svg","dictionarySha256":"f98b11b6e7b3a16cd06c8879f590834faa5e1d07a28ec08aa58ce08c8f964015","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"焰","strokes":12,"corpus":"MM","originalMediansSha256":"6c427cae463f298356a50f8ced78657a2eb033216e274a7e387d335bf5b3724d","pathsSha256":"5dfb62677afd5c61a593cd2142471c1156635c8dfe49f1584a95f963228ccf32","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/7130.svg","dictionarySha256":"6476d42c387985844a49d1b89fda17a88f2cffd36b8768fe6feb6022bc4fc7a2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"艶","strokes":19,"corpus":"Ja","originalMediansSha256":"705c44f669661410dacce04979b324682bd9d5ab591b99e6a0285ebcf4c3d7f3","pathsSha256":"2f5237d4b3f593e349b0014aa53a3be7235850ff8e97394ea2b76230af97b6d5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/8276.svg","dictionarySha256":"8193ecf55b24adf3e896a7b4881773d3bceb6cabc451da28974350d1caadfbcc","sourceStrokeIndices":[1,2,5,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"嬰","strokes":17,"corpus":"MM","originalMediansSha256":"95e9be4fb0ddb5c94b6c47033d1c79a303d40d95bd34556e9d7d1b6572b93f87","pathsSha256":"c3e8efe21b206b231744dfa552b3277f940cdca7638cdeae23762d63f8140876","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B30.svg","dictionarySha256":"34d3191a38d5e0019d5f10880913135b7b4481af74ed256a5deee8933dc7b9bf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"詣","strokes":13,"corpus":"MM","originalMediansSha256":"abec0217786d7b52e5d1f7be24c52a359ca685ec2f4384848f1527301ef60f1c","pathsSha256":"971315fa072b44187d6af1eb73c91ccac71aa870badf5ff92bc41cef4bd1554a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A63.svg","dictionarySha256":"48ad5976bc65a1c63a75aa1c744ec6c7e657bbb83ce83c6c14fa1ea0e4e2fe15","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"曳","strokes":6,"corpus":"MM","originalMediansSha256":"2e970c481bef07e08b320db4ded9d65768c3c13ee3b4916da9e7e529163e3323","pathsSha256":"d650fe539b69219a60c767357a6ccec8ef886edc0b7d5886b2da70726e105043","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/66F3.svg","dictionarySha256":"f5d004b6d9f6fa0763744245f3df5f1ec262b4ed9e638f27635fa188d5f4d6eb","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"穢","strokes":18,"corpus":"MM","originalMediansSha256":"96605a7c0ff6709daad8ff73bb9e61c213e5c1980b297b44aedca3788671f009","pathsSha256":"193e1152cd5c0a14edada868ae2e34852c334eeacb8f3026936eac7459b4a513","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A62.svg","dictionarySha256":"3e3c5baed875d5354c9b4f8f7310fd1ea8189fd4fed3eb0263630f1abd9eb552","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,11,10,12,13,14,15,16,17,18]},
  {"glyph":"裔","strokes":13,"corpus":"MM","originalMediansSha256":"b56953be6f93df53648ed833df829cc454cfdd29c020fe72380154b4914dd4f1","pathsSha256":"b3afbc1f1aba75db0339da7081833367cd4b45d0a4b856994a4e429a9fe41a9d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/88D4.svg","dictionarySha256":"12e91f3dd0e0c3fd3ecbb91a5b8c7c2e60945f782c76282c7be001e26c7fb8bb","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"奧","strokes":13,"corpus":"MM","originalMediansSha256":"29efb6f3ce1eb7c86cd397043b56477bd231d9320b08a4744da6b25e8be506d9","pathsSha256":"a1f319dfb6f0d08c74876c51513b4d77140ea16f0201c38cd8a2fc4224c1a612","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/5967.svg","dictionarySha256":"189ba8b02e38c6b408d31b0aa505b4c6252464f59ea7e80158d22fe348a742e0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"懊","strokes":16,"corpus":"Ja","originalMediansSha256":"5d0d882862e66a7c31fffde42019221a13c4bc95ad54722950b97c4ca9976d5d","pathsSha256":"ca9e331a3e6ca5d1cb6047683542003f9a3634893975a48b9516ebacb8566a6c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61CA.svg","dictionarySha256":"05b335f55719d5ca60abd73a59aafed8f92426f888c8dbf8eb38f1058845dda3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"伍","strokes":6,"corpus":"MM","originalMediansSha256":"7fc642299ef0b3c1821ecb909d6550eedc531edb3ebbda859c3c3ff765441b8f","pathsSha256":"3e8a24d09117510b0c286d531e19892fa2bcda374b7e5898146cffc8ed1dd157","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F0D.svg","dictionarySha256":"8a142d7e535d79611db3ace62eaa8637d33a98f2fef31adf92f33e3a064548c5","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"寤","strokes":14,"corpus":"MM","originalMediansSha256":"b99eec2560e6dba92ff11a70737a515f8be146d34b5a1f513e9c5e7158c1c875","pathsSha256":"a314935c2bf3d92758c36b74f712251ffc854c5df48fe5370050db68ab335613","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5BE4.svg","dictionarySha256":"291cf120556dfe5149336b98eddb17add881e720076c95e62b2f4e4d56a12e6a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"蘊","strokes":20,"corpus":"MM","originalMediansSha256":"8e24008a4456c1f1b1a4019f78e88c04dd63421cfef261f278d0579dfbffbc2b","pathsSha256":"125b91f28d64cebb756362b487f0ada2affba13f5ab19d3b7172445fb53ded16","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/860A.svg","dictionarySha256":"71a21b708e4e106f752e1428ff0995e746a98017b5cfc771cc20631b5a6c2020","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"壅","strokes":16,"corpus":"MM","originalMediansSha256":"94cca41639b83e01d85109475c422915b4e32f193187de9c477af843717a23b1","pathsSha256":"0da6630e8deb2b5fccb4d70fe9373b68f22bcf59abbae244ecab574b09b0f070","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/58C5.svg","dictionarySha256":"fd652744173662f407a7010a80df7a5459279d1d9d39575cee5d82ee03bb056e","sourceStrokeIndices":[null,2,3,4,5,6,7,null,9,10,11,12,13,14,15,16]},
]
export const G1_BATCH12_DICTIONARY_REVIEW_SHA256 = '2b9cebf58ac7db00e2f7010478bd2062c73fdfd691ce05697285b9c9995dda7b'
export const G1_BATCH12_DICTIONARY_DIRECTION_SHA256 = '495470ba1d69fa95a56a3330fa827d7637fc1712213e48319995c52207a218ee'
const referencesByGlyph = new Map(G1_BATCH12_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch12DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch12DictionaryMetadata(ref: G1Batch12DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-19',
    geometrySource: G1_BATCH12_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch12-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH12_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH12_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH12_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch12DictionaryBundle = {
  verificationSource: typeof G1_BATCH12_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH12_DICTIONARY_GEOMETRY
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
export function loadG1Batch12DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch12 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH12_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH12_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH12_DICTIONARY_REFERENCES.length) throw Error('G1 batch12 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch12 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH12_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch12DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch12 dictionary entry mismatch')
    return { ...g1Batch12DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH12_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH12_STROKES = loadG1Batch12DictionaryBundle(reviewed)
