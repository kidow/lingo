/** Forty-nine grade 1 forms (batch 15) individually reviewed, including 6 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch15.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH15_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 49 approved and 1 held; 6 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH15_DICTIONARY_GEOMETRY = {
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
export type G1Batch15DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH15_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH15_DICTIONARY_REFERENCES: readonly G1Batch15DictionaryReference[] = [
  {"glyph":"謫","strokes":18,"corpus":"MM","originalMediansSha256":"b57b9c958d88fbb427c91e7fec1b008d5341c90fb9d434568200da2a5ab26f38","pathsSha256":"ccad79e10da967f2cfe7b72a34c698743771ecbcf3f2a90b40358d4e81b9909d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8B00/8B2B.svg","dictionarySha256":"9b837925b0f01b675bd6803c1796ff3a0d8c99799562101a45cd89515743e281","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"狄","strokes":7,"corpus":"MM","originalMediansSha256":"49eed5009c39c743172d9c8c1e30e7c064f81f8428f8ae1207efe41d1a41354a","pathsSha256":"86d3206fbbd62e81021125a1f1d57127ec664ad2570ac059c51f8a0639f83751","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/72C4.svg","dictionarySha256":"ce58d040c441df1a4c189c4da506d6ea4608e68e0ac022ea5fc84c636dce035c","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"迹","strokes":10,"corpus":"Ja","originalMediansSha256":"e422c67d33762f7f1f387e7c01f79273c68972c94383a863e43d978161aada1b","pathsSha256":"8caedbb0c95fe050a9c4ec67f71e915f3d650cc851d3ea0b15fae5170a0c5a59","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8FF9.svg","dictionarySha256":"582ada939fa1626d476290b7bf79746d742d656afc44af9fca3993883f582234","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"塡","strokes":13,"corpus":"Ja","originalMediansSha256":"1d0d1e58a237b743b260645ee5894bc16babf8d0e2b4f34f4534f9db6e91274d","pathsSha256":"a8e7e012cfad420bd11a86c98bc7c527071461548af68b6aa477ce3628848df6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5861.svg","dictionarySha256":"3fd0d8bf6421c721f8298743d6cba16e86f3df71062288d866e8323744c7dd87","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"箋","strokes":14,"corpus":"MM","originalMediansSha256":"1ca7448fb81065f7ca339f3dd5d09249c74b5208e1d22a921b021ac752012f92","pathsSha256":"f747f49cc4f4d52d83f05bb0d05609cc16985a9ae8a8887523558eca3e107be7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B8B.svg","dictionarySha256":"db1d84eb945397c5d368cfd2abc40d4c4b0253fef4a6ff619a4818f745562079","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"顫","strokes":22,"corpus":"MM","originalMediansSha256":"4e9b1f35ef4831b63e4c8c95196947ae554654ab162b6ee319a1dea891ad4573","pathsSha256":"adbd5a707d9654a432e968eb7ea248977060f150806df0d968df71ba51ba928f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/986B.svg","dictionarySha256":"dd34aafe569d80ff20aed4e4562d7af01ff8d67861bace54f41d6caa289e6ac7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]},
  {"glyph":"顚","strokes":19,"corpus":"Ja","originalMediansSha256":"3cd78af990b4250ab03ac5b97110d30eb51a27982a7fdad1ccc11bd5dab12741","pathsSha256":"2b6199d80cfe8d1f76d3a21b9c8bebac9b3bface0e4a16648073482eaa4fa61e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/985A.svg","dictionarySha256":"ccf4054e69cc46c0db6d9f56957543042c25580057760b590e89dabd822fa6a9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"銓","strokes":14,"corpus":"MM","originalMediansSha256":"0908cbf2e107c0ca3aa4435a7d11b8b73ec3139e1edff0e16ef57295d4342597","pathsSha256":"bceed5a1762037eb1a397ac4cbe7e8a29558fbcf533f1e8a73e3f5823c6cc158","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/9293.svg","dictionarySha256":"43ab2ef9e764e27b494ab3a127cba7085841e35586e02f0219f20707a143f493","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"輾","strokes":17,"corpus":"MM","originalMediansSha256":"c1b550b8f0e867aea11af9d325e29161b6001685868ff5682f7e6bc1d22e333c","pathsSha256":"3854a7762009063a69da88b4ac03ea820e492bdb0b315e859b55917667c099ec","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8F3E.svg","dictionarySha256":"6ec5a707da593dd1c33e214a0cc63b14b47cc769c963356e12ef0c7937d0c346","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"纏","strokes":21,"corpus":"MM","originalMediansSha256":"3c41e1c71f957428bd2f7b8573e0699cdc6acca60e67357aa49a3b8b20ce8a32","pathsSha256":"c7c05b6365c44e63e9ba5c4229c3c9da5dea55fb30fbd504c37c7fad1ed76596","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E8F.svg","dictionarySha256":"4c3e66b304556a4f50fe0bd1a145f0bba62058b05f93088ea00f7da90cb3b703","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,16,17,18,19,20,21]},
  {"glyph":"栓","strokes":10,"corpus":"MM","originalMediansSha256":"b9893ade9c331da8a56399e31feee2ad237400bd3855c39e76ae76ecd1776c92","pathsSha256":"a2ace9c601ab095e90b6347d8aa706290a37199ef800b81e252d697e37c7bc6d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/6813.svg","dictionarySha256":"1a5d29d8f5b2961784bec9aa2b34a6a0dc99ef9ce09cf6d47a4bc913b28b790c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"箭","strokes":15,"corpus":"MM","originalMediansSha256":"25454b4ff32d063eeea3f4d19f4570e93b4f4e5427f1e0844d78f691c83798b9","pathsSha256":"5de5b98e9b70d8bc1049e931128231da3b84df43aebd696d39df9156611ffd06","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7BAD.svg","dictionarySha256":"76b536528a0ce052be62e5bd6fa410f3dfc4790eb70ecb4c440572ce817c836e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"廛","strokes":15,"corpus":"MM","originalMediansSha256":"edd8c274e7d1b8535def6c4271a34506b511c6116207d8acdaedcaecd9c93c5d","pathsSha256":"46e83ee40287f663cdb963b4c4d7445d232ab56e70e605fef5333d5bacc03966","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5EDB.svg","dictionarySha256":"2b87dac986b526ac9b944e8ad19fff9b71d716992bb77c5f47cc6a628531e15c","sourceStrokeIndices":[1,2,3,4,5,6,7,9,8,10,11,12,13,14,15]},
  {"glyph":"癲","strokes":24,"corpus":"MM","originalMediansSha256":"0728caa119e88bbd9abccf32d5933ff39fd41cd0ea11071ec68f8f72324813b4","pathsSha256":"dfacedde0eeea481cdb95be32fbf5482e7f0221d10bdcec44c8227b53a2e13dc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7672.svg","dictionarySha256":"1dd39aca6630aa8317814148a20f86493ffb33e28b0f22b1b8735af190931c1d","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]},
  {"glyph":"煎","strokes":13,"corpus":"MM","originalMediansSha256":"28f06feab3d2f32bd8314674fb6a77ad433c98164d502c17f8fd44e0e2e80048","pathsSha256":"9df53931b31478249f4c580f638f11378353d5fedb17fdd18696536b6cf1d943","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/714E.svg","dictionarySha256":"f30b9389ef6d1ae365e5e61940d33611e96779520fc33c8891c8d92bfea4c47a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"澱","strokes":16,"corpus":"MM","originalMediansSha256":"835dc21cfb4eb11bb6ee6c82690cea6cf74763b1baaadb249f510cbcdf4f044f","pathsSha256":"1985ccedab19475ba918bbcb103ff2aa181e4a352199dec55b69e18a4db2d5e7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6FB1.svg","dictionarySha256":"6270260aa7551459299934e16c758863fe2561a567c23fe136da5d065f1786ed","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"剪","strokes":11,"corpus":"MM","originalMediansSha256":"1848d4d8d8d1b40265222077347e8247ff345da7b7f3ee471b1da88866301e1d","pathsSha256":"3acace5a38689cbcf797d5bcb52eb3fa5ced5536a078bbb16433efbad9a25aba","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/526A.svg","dictionarySha256":"bf5d5ecd323653a8cac610bd934da919ce1f7631dfe7c3e9149358121592100c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"氈","strokes":17,"corpus":"MM","originalMediansSha256":"53772bb855cae8f0f2f1b6b25d6484e70165c9cd7f1fef4c39282bb9746acab2","pathsSha256":"412cb0ab9bd19ad1a6f513cc4dc6be9154183b87780cc564d52e898c2b9b82b4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C08.svg","dictionarySha256":"4c5f2fdaee5489316b1f8e7076db5332976dc4832b5c71df9bc7158d0066ad0b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"悛","strokes":10,"corpus":"MM","originalMediansSha256":"6e918e922f7a579bb4809e3ea4b94e838101d2c3cfb3f2161be9015c294aaed5","pathsSha256":"851123b7b81688985b5584ecf801f000b190858e0324e70d7f8aa7425392ec37","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/609B.svg","dictionarySha256":"ec09d1589edaa14a8116e76311393619fdbef0de0337c935cb680c81db61d6ae","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"篆","strokes":15,"corpus":"MM","originalMediansSha256":"5f9961ea74bd56511815281b95ab1887f6d6edd273d052c7995e8621a863d2f8","pathsSha256":"b6f1a4d0780a1a5f8fb71f088c2f8a6fe485559ec2ffda58343eb982000f3e47","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7BC6.svg","dictionarySha256":"91768347aad5b3fc0fbba3fcc1b904b1d200b2daf75fbeb18b7a06253e3c6ab7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"奠","strokes":12,"corpus":"MM","originalMediansSha256":"584e1d1752c4290dd9a2b03242b8855530454d421ed3d6273174bb3b269ae5ae","pathsSha256":"d9b512d72a832ffa40b61bd552485a351fdff911d4e7728e501b79044915739c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/5960.svg","dictionarySha256":"5a1b8bbec19f6c10a9464b10f02fa443b75abd47d92caaf2c131d80edbae694c","sourceStrokeIndices":[null,null,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"截","strokes":14,"corpus":"MM","originalMediansSha256":"f34656e3c56713bac71106b4a372b4554ffa26b865dce5b9e0d982e9ffd87625","pathsSha256":"64f9bef627743b0d09231e7731d55a03c073633e0e92a7c4cfc9622b27d2c690","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/622A.svg","dictionarySha256":"e271ce11fcb05c3605b07436acfbb89563bb8b32e6436504232525590da623db","sourceStrokeIndices":[1,2,3,4,5,null,7,8,9,10,11,12,13,14]},
  {"glyph":"霑","strokes":16,"corpus":"MM","originalMediansSha256":"054b013dc5deec2920916c870c556375ad217f33b045655f652dc90f629819fa","pathsSha256":"9ea3bbd3eee8d3c6355a9dbfadb5dc235d843cd6ec222c4dad58fc1aa9d64758","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/9711.svg","dictionarySha256":"aa40a00b3106025badddfb5b99f8b4595c6af0338d09df33ce201e325135f4e3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"粘","strokes":11,"corpus":"MM","originalMediansSha256":"41c05a9c7af8cc93858c6f0805adcf60d703829e2adcaad00a98e8ded263cbce","pathsSha256":"96d3fb8e135648b63cdc6af94775bfd8cbef0628b29a8db9246f7de2aca8aec3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C98.svg","dictionarySha256":"b85953920e98c53326a9dfd4ea6f0fdea3bb8031c5050d26792c9057e192537b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"錠","strokes":16,"corpus":"MM","originalMediansSha256":"e59ef9d0276c7b415fa0c5f4d1e41e5489b6bd86d552c55ebc4762c6adc5d13c","pathsSha256":"3385b341d5bb0a014cbd95e7914876d34afb5474a112b65c288d725230801194","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/9320.svg","dictionarySha256":"5a5b66d9eb839411d60bdad0559909679957851a681bfad80795730ca39fa266","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"挺","strokes":10,"corpus":"Ja","originalMediansSha256":"d92deebf5d00f4befdc6fc9f91bc4a40029278db51a68ec83ead0a98bd7365a2","pathsSha256":"24d08b292a6425d01ac822f0ac62f1ebd957b564799e346446a15d6325cc86db","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/633A.svg","dictionarySha256":"4aceb90c4a098c7d6763ba4a10c084f095a6c29d76014e4b7c35a5a844a7ee71","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"町","strokes":7,"corpus":"MM","originalMediansSha256":"cb46aeee18bc6b27186fd867989fa3cb83d60add43877a7f5b67395b7b311815","pathsSha256":"c4788dbb38dfcd40a61bb7a08af05e96515f473f1e63be2abdb282b48d05f726","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/753A.svg","dictionarySha256":"13a3a082e6be68333ed963d3af2d286f9d5e854e661f72c41e9ded7e43962683","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"碇","strokes":13,"corpus":"MM","originalMediansSha256":"d43429f3826393898d11d7f2a73d98f738649f6e4f6426fd8c4ec4cb137cf324","pathsSha256":"386d34f0f75d9626dc45a4adf28a5f2914a37866b5982d06e1849168f121ec63","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/7887.svg","dictionarySha256":"7ae63223b06fc04d4ac551c2bcc96a05a47da81e77052b0c74606a8377fa0044","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"穽","strokes":9,"corpus":"Ja","originalMediansSha256":"7a4dee7cd9670ae37defa85889bb048c87e0e5179fe7d6ce227ad8113ada2a6e","pathsSha256":"85b9a233c4423f8644c1c4be8295eb9b66e3618676c1ecdd639e1245d894f284","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A7D.svg","dictionarySha256":"863e8a3ecad83a9ed1a4df40ea76e55f6c5e5ad39e9dcd642179dc75b38de14e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"釘","strokes":10,"corpus":"MM","originalMediansSha256":"e8b724150acfd5ba5d4d5e277dfdd84026bea98f10629f28cc0ddfcdbd88f81a","pathsSha256":"cd1c6be67a794b72ed8b24da7a6a9825249f61e05cc42067a756f306ce48c550","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/91D8.svg","dictionarySha256":"8cbf90ecfbb58f67989f23c512263c2da0fa4a2458669364bd435e570931cc23","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"靖","strokes":13,"corpus":"MM","originalMediansSha256":"5e00d22f3b723e2052ac2405213ee6e082dd0f25c60c87611dec24abdf2afd89","pathsSha256":"f9dbcc5903e4c52565c6c1785d55b59b95fbfaf67f3e7a1ceb48836f00b23b0b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/9756.svg","dictionarySha256":"828308bb19063e35ba4f81dd9ac1397ef42956d313c1923a05b420a1627c662a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"幀","strokes":12,"corpus":"MM","originalMediansSha256":"abcc7751db9d1699afd7cf135964706fed1a149591bfcc6d7644e87e9aa2d16f","pathsSha256":"7f29a66fc89d5797335c57cd672a031783599716d49473851d7793359f12d3fa","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5E40.svg","dictionarySha256":"490997248b141bb7b8c0513787766cec90b05c91afa0ada185da8668df38e79f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"酊","strokes":9,"corpus":"MM","originalMediansSha256":"2a3123e316751b59348cb1a4fc3655ffa0f921ff966df03323ef2f9194eeaf2d","pathsSha256":"0740d2e75e36a6d7f6dddfc19b5438002d9924797c2c2611ae8e27fec1128dc8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/914A.svg","dictionarySha256":"6fa56ec5dac0c02bef9aadd1b2b34f6330454a48a5ec2c8ca1c136c4270b4e78","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"啼","strokes":12,"corpus":"MM","originalMediansSha256":"37a043952452f568ddf24d350038e8608b1a25960d4894d58517968f598ad476","pathsSha256":"ffe14245934e7ad1cdeed63f159b5b3da5ebe16ba89937ff0d6491a72acb6963","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/557C.svg","dictionarySha256":"3b4cc9659379c075c7312bdc96b911cf476490bfc42b4ddd30b443347bb6bf83","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"梯","strokes":11,"corpus":"MM","originalMediansSha256":"9afacf092f191ce60608b3bb4adec84e60c39c3dccd93d6e739adc92bf8a97a8","pathsSha256":"96dea42addfa510518d37a0cb3633f99c85338be5db4dc346639a6deb2525220","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68AF.svg","dictionarySha256":"b46b3ffeef6c6d695d6f4f72077b71c4fc5810f9083b25be0942f4cb0079a10f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"悌","strokes":10,"corpus":"MM","originalMediansSha256":"a15ebeba0ed8ff75bcd23cdc26c9f28e06003ffa1f19ba82637420fe793cc482","pathsSha256":"08645bc3eb7246e29ebf9ea935fb23821f8cc241f50fe9605a966e67e38c8b11","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/608C.svg","dictionarySha256":"2db3fab483272db90feb8ae643be75d1304421b94b723ce1d1530cd4395d0226","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"蹄","strokes":16,"corpus":"MM","originalMediansSha256":"82c65d2f5f1bdaa0cca55bb5b4c8d3f297650ffe6e66e6ad06c2d51a9216df71","pathsSha256":"81eafc129dd4ceb2cc9fea7b4dc0fb0e0467dc6ecab72d5c44470ef3c0a54b04","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E44.svg","dictionarySha256":"a579c47a83fdf9c47d4a8e94832d37d8e58e8cfbe640324581c6968304fa2c44","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"詔","strokes":12,"corpus":"MM","originalMediansSha256":"b0eefd25f62a5f452abd65d12e2c8bd202c864491f55c79e98f6027c4bc98735","pathsSha256":"5ea9125aa432a08e7320cdc2884c588452c914debedb44703b26a6b49f7278a2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A54.svg","dictionarySha256":"f310c5e803f6653c8bc6aa171bb8877058edb2d0a8fed8ded29b8bd330bcc499","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"躁","strokes":20,"corpus":"MM","originalMediansSha256":"6b11b5df061e60a436d77735326546595b48d6a483ffb9188f1a09339475969b","pathsSha256":"77e062edeaf0e6927736c348f49a8c16e0f46fa238804a720950c566944d4533","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E81.svg","dictionarySha256":"7a83c23f7d4306b859df43c53deb034e122d742f7465f8aea66249b99af5384f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"阻","strokes":8,"corpus":"Ja","originalMediansSha256":"f0aeb4d49e5c4fa969aa9c264f20a36c44e2d8120799de3163af87d520a1bbc6","pathsSha256":"6597e3676e9e0e8e24c0f2810c6260201c995f7fb44ac121225a1435f92d13d9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/963B.svg","dictionarySha256":"d3b5a1ec64f59a536cbe5cb0840a2bfad283715ccd00ba71d708b0aea37b6a61","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"凋","strokes":10,"corpus":"MM","originalMediansSha256":"f099b3e85914a799463896c59fe3d920a05e35752ba9d85ed91539d8d67ff0b4","pathsSha256":"b99455341162c5c19a783524a2ea89901195e650ff2bfa6def49e02f1c516b6a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/51CB.svg","dictionarySha256":"468c1479f39be1c80fa436a797836966d586ba689b396f6402fede5ff7a8d6e3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"嘲","strokes":15,"corpus":"MM","originalMediansSha256":"7c18ab5854596cd9378f4ac0621dcef44fe03ab3ed2418b823a6dd2a48889a2f","pathsSha256":"fd07085ad05fa3015a1395966aa333290ffb599344b8f3bfde5933db8e3fbce4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/5632.svg","dictionarySha256":"6df9487f667568ad237249e4b166b9c81339f8a16f1b7e52ff3447561b23f7c6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"曹","strokes":11,"corpus":"MM","originalMediansSha256":"a0069e021a753d59f884f85f387ad3254597f9ad9252317ea1f6c4b6595b3b6a","pathsSha256":"5796b7ea3b405c8016423c600a127347e8eebe5a6be2fdf9b75745320a9df34f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/66F9.svg","dictionarySha256":"830eb076a92654cea4520a8c9163cd3e9ce156fdbf58fe844e51a1d0b54a7319","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"棗","strokes":12,"corpus":"MM","originalMediansSha256":"345fbcb40fecdeef1a459c567db46b0c85e98911beb4940f3af818a8e2f50611","pathsSha256":"6eb524cd92b2950bf6ad628717c82a6c382d52558c7d58ac3a9806824b0b8c5e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68D7.svg","dictionarySha256":"8b094ca82d61a9710882ce9c882c0528dfac38fd32ae0e364d7c44b607dbc170","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"粗","strokes":11,"corpus":"MM","originalMediansSha256":"4f03d186285e35804934038746c83d6001fc2a106dc1f3b3129b3409ee54d0af","pathsSha256":"e6b7f0b48d0735dfa40fc65375fc46c44ad5ee44f258eb6351ac8cfd721445f4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C97.svg","dictionarySha256":"a6e9cc94107cf3ff649a5ccb47d58d803f818beece479ec6f97c37e543ca292d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"肇","strokes":14,"corpus":"MM","originalMediansSha256":"e1e68951028daf95ab490f371b50a75dbcccc759273d31241ccf8efef99d86f4","pathsSha256":"b02a135fef44d07fb0a0044c34f468d6ba2f24f6a010003c517feca3362b98ad","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/8087.svg","dictionarySha256":"498cd301079a60c02f5ea101a16ca4ccaa0adde8b7f28a94ce2ce93ea1b10bc8","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"槽","strokes":15,"corpus":"MM","originalMediansSha256":"f343a4ab7c9eafd048fd8aa0047abafd0a2291ca05c22e1b1e19feb61cc7c29d","pathsSha256":"abd6cadd6e40674fdd83a14b011200c0b0f871b16cbac664fbeda10836fd206b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/69FD.svg","dictionarySha256":"bdacc570fe5bf31d56e12f27223860d292af39ec31b708713a58ca370c57bb90","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"繰","strokes":19,"corpus":"MM","originalMediansSha256":"6ca29d50fd1b64a5e860ff7eb7eab136d923545a4d8c47e0e562f2a7e31e8308","pathsSha256":"141317dea6d9447661fc5ad0798ffc7454e0b4275372964f273df7d1cc064a56","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E70.svg","dictionarySha256":"4373e4686ebe6633580bb9670f683b9e674085296e9e73115d58654e07560c43","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"糟","strokes":17,"corpus":"MM","originalMediansSha256":"f4c1f53550bbec0550811a4d250eb12decec63396169a42a6f8bce194ee84027","pathsSha256":"139467c6ed420cc8981f8b6640aeaddd9b03cc144667dac271e843109549d206","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CDF.svg","dictionarySha256":"57c3d24c96cec2ab703cde47812eb7426ad57133dddc3a0d1be5c88bc19de719","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
]
export const G1_BATCH15_DICTIONARY_REVIEW_SHA256 = '7ebf7bf409950e0bb73f3ab1fc2547a48238848567bc3a1365545913bd84c919'
export const G1_BATCH15_DICTIONARY_DIRECTION_SHA256 = 'e2ea24de9beff2df9a971f6e0cefe33d576e7fbe5d7b4e305477598733aedce4'
const referencesByGlyph = new Map(G1_BATCH15_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch15DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch15DictionaryMetadata(ref: G1Batch15DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: G1_BATCH15_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch15-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH15_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH15_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH15_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch15DictionaryBundle = {
  verificationSource: typeof G1_BATCH15_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH15_DICTIONARY_GEOMETRY
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
export function loadG1Batch15DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch15 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH15_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH15_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH15_DICTIONARY_REFERENCES.length) throw Error('G1 batch15 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch15 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH15_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch15DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch15 dictionary entry mismatch')
    return { ...g1Batch15DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH15_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH15_STROKES = loadG1Batch15DictionaryBundle(reviewed)
