/** Fifty special grade forms (batch 6) individually reviewed: nine reordered, none locally corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch6.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH6_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 6: 50 characters individually checked, 50 approved and 0 held; 9 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH6_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch6DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH6_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH6_DICTIONARY_REFERENCES: readonly SpecialBatch6DictionaryReference[] = [
  {"glyph":"茀","strokes":9,"corpus":"MM","originalMediansSha256":"cc74eddfa391fcdf0a8f2b7ddf86c2ba0dbb8fe6bbced9c0719a3502a574720c","pathsSha256":"7d81e39e81b3cd8bb87b85b0b2995b70f99918a8238ea3881138420d09b0bddf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8300.svg","dictionarySha256":"704998fae9afb05b2dd6a61a5c959aa6f6a13b3277d996fcd7499955c9367faf","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9]},
  {"glyph":"艴","strokes":11,"corpus":"MM","originalMediansSha256":"8dd264e6839ab5ba2f92b8c8b6d5043df863e1daef966dda5739f5acdb395474","pathsSha256":"c8081a70ba01cd7f00fccff28d5b7a31e353b362458c7283299facc76affdf75","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/8274.svg","dictionarySha256":"64dff8dda8cb725d51da8430bb1e1b33f757f94c17213b67346f9dff499c17cc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"剕","strokes":10,"corpus":"Ja","originalMediansSha256":"0c478f2ee4e77c7ee28851a73690c30d97976430cf3b607fa464b9ebab6fb6e5","pathsSha256":"856136cb408addcaf783c3c68793d1c3fded27c893e9af5aad3a2902fe248b0c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/5255.svg","dictionarySha256":"db4fa50e41fe2c5bbb6b612b9792182c62e35666c674f1bf52aee6a41d174c81","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"圮","strokes":6,"corpus":"MM","originalMediansSha256":"645c79ba1bdb67603cc045d6887aa9a80c97f3dbfb098538221ba848b29b9ca9","pathsSha256":"c810861230f25b61e7d68e7017e528b263bb0cb3dd4deccabfe27226d8989f6a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/572E.svg","dictionarySha256":"61523a70d1b2587042c98749b598cae334c4bb7634214be2871f9f3900807fe8","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"埤","strokes":11,"corpus":"MM","originalMediansSha256":"ab735dff59fc4bdc9b4f01f83f803c2f80970eea171f5b78e740fbb0f1813eeb","pathsSha256":"0bf51e23ab5d7ed9995f0005bd557eb3f44118c3a26d9a2d8e7a6a74968019fd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/57E4.svg","dictionarySha256":"2b17915ed23a9baae484dfd735317a1745dce3a89d67ed4dabdc7fcdc5580a43","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"庳","strokes":11,"corpus":"MM","originalMediansSha256":"e7879d735c224968f564ff60c7361416462282387b3171f453b9e019dd577eae","pathsSha256":"ac775a688a16823e3852fc11596c7b309bd5e3e7a0d8c521e99ab00ecf4605ec","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5EB3.svg","dictionarySha256":"e23cea948068e8192c413026b528e9ac4da4bc86d8bf95b8a306b8e7dc54a84e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"悱","strokes":11,"corpus":"MM","originalMediansSha256":"be24c0c30ba35ee355b31579c6da08c6766bcaaf6d0882d5b0e7043989436ab3","pathsSha256":"e8c2f30f401c7abeca925ccfd979dd370db64e3b4f00d323bbd0f3811960ff9b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60B1.svg","dictionarySha256":"f22ddf4535d96b06012e191099d059ce0b01371dd401665542fcc6c35a5a950d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"淠","strokes":11,"corpus":"MM","originalMediansSha256":"e694a8bbd4450f1e3465f7d9cdd32241f502d189033fd8657f1f64ccc683b700","pathsSha256":"36a3bc8b31613f248b252fea2b84fa6ac2c3de6dc6e44feb3e9c105088cee00a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6DE0.svg","dictionarySha256":"5c890c8b1fdd033dbf4921008fe8ad6344f2d8fb778ebfa83b92fae37b2b054c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"紕","strokes":10,"corpus":"Ja","originalMediansSha256":"0df804959c14a4d5e9669ae779835873a6afe0ea60496f4bdf0b7fc413c3adb5","pathsSha256":"5eb2a527e48bee8006e1fcfaf0fb0b0f9976f2f5cd7fe0b3465dbd8ff63972df","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D15.svg","dictionarySha256":"0b5120b243df63f3bc049d25f9e1214e90b0a1bbe182d16b540fb6860d3cb297","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10]},
  {"glyph":"腓","strokes":12,"corpus":"Ja","originalMediansSha256":"5c8c31ddcdbe1577a830f1e03ece517b5dc8fefca4f8c99906e76cfdcfa0929e","pathsSha256":"9a5c546a7bf5811de6f3633fda99ac65233cbdb0246f52aae226bb56df75903f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/8153.svg","dictionarySha256":"8d54b0b9c3c31f89bca8331cfb867f8c838faa032b5b9ebf84cd21332309cf60","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"俾","strokes":10,"corpus":"Ja","originalMediansSha256":"cb9d93434b7d9838f583933153ea1b459736022d6d3189acb3ba853113cf770e","pathsSha256":"06c03a9919b5220f3c9364e1b8b6650b5bcc79bf18fb0f5b6d2f6bbd9ecc1661","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4FFE.svg","dictionarySha256":"2ed46b9f346adc003636608f1fb95b119cf6e12b6af776bc40695d35d30549ab","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"轡","strokes":22,"corpus":"Ja","originalMediansSha256":"6923413e9b5a61f77905d4ec73c04adb683566b23650dff2bc2c9ea2859a7935","pathsSha256":"d474ba0c56fd84c3cdf09e5bfbdfa75c6d04b119b40be82ca645f53e35437c7c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8F61.svg","dictionarySha256":"b053b96b939c5a4326afd276609c8cc4a8a5a3a7707d27f857837b81af82fc9f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,12,11,13,14,15,16,18,17,19,20,21,22]},
  {"glyph":"痹","strokes":13,"corpus":"MM","originalMediansSha256":"74708e698468c49390ff402757e078a4da06e6dac57ee051a4f2db8a4f34eef9","pathsSha256":"fdbb4fa49e7adb280edc0214ad6587cadc70dc7fca115ae3f7de29cf99d3b1e7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/75F9.svg","dictionarySha256":"3780b97d59038a44c8e7ed7e2a08934af577b28deeeccf2c1db56c127afcf471","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"霏","strokes":16,"corpus":"Ja","originalMediansSha256":"abcb7f49321fc0a92052effbfb1bbc8e2fd95ab8543d5f17c4d9b09379bc7bb3","pathsSha256":"ecf9a0088662a3432853b7713488d57b91e654f652188c429ba74e1dce504d5f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/970F.svg","dictionarySha256":"89261afc2615548dd88e8f5f473dce635b264c29402ccdc25ce0d065fa0b7a57","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"伾","strokes":7,"corpus":"MM","originalMediansSha256":"a0f295187cee9027397bb58e75a133a9263cbde36ceb7e01edab197794b2bb04","pathsSha256":"7cc896a5dea0aefaf7ee168fc9a07e29ce8cf22fb01abe9c34fd80d3c687f550","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F3E.svg","dictionarySha256":"51cc7ceba2e905578c0840ba63044ee96a4f955b7e70cdd387a75a29164826b6","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"朏","strokes":9,"corpus":"Ja","originalMediansSha256":"dbf40299e1a26b391d58428c4b7d67312bd30527d735bd30f59bcae408001398","pathsSha256":"6e9ffd65101cd4df4b093644f02f72b5e65b48071881935834bf35a644eef026","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/670F.svg","dictionarySha256":"7baf7b01c9fecde3dd9206e8f6ffb26c01c280c90b5f175467022bac3a1631b6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"畀","strokes":8,"corpus":"Hans","originalMediansSha256":"59603efcd982a73d0acf94727f0ef9acbf9012fcf796fc389f313647557aa742","pathsSha256":"5cd6de1676fc9a8b68c50631765d90043a6439cd4fdef27672f740900f48888c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/7540.svg","dictionarySha256":"749783efbd241561888aacf134914d7e84e1a624eb6dbd9dfa4a561220106164","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"篚","strokes":16,"corpus":"MM","originalMediansSha256":"8fc43c09287697c2bcfa4cef630f2e2937c35e1aed6b6cba85449bfc99526986","pathsSha256":"6f6bc2f540f9f761c4ce544126026dd8318963bd790ba36cfd4a04c95b3c3624","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7BDA.svg","dictionarySha256":"e4f1cf0c735fc5c177b79382105fe687326cde52a94e615cd0bbef2659dd6abd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"貔","strokes":17,"corpus":"Ja","originalMediansSha256":"5974ade39479853e2a039bc1487260470200f9311ae6e1a820b4f508da78977b","pathsSha256":"7c28885f98087ef1b3c288535406782187984ec03e58afb1ff52ba265a9c70b1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C94.svg","dictionarySha256":"832936146e372b986534a074dd09c114b29c68896d322e412fb115ace290059d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"羆","strokes":19,"corpus":"Ja","originalMediansSha256":"93bf639f3d82ad69b1054883b6b4d30d2d942843f22c8ffde95e5f7b3816e1de","pathsSha256":"c7d37c6ee9debf1013d18efc672f454d6a2ab8ce6c8a80e820df5a121898e1c7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F86.svg","dictionarySha256":"b3c32622384083c52385f1c1c232a4a3752511406b54c4b36681777abba41f81","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"仳","strokes":6,"corpus":"MM","originalMediansSha256":"e67f012110dc354f10b0f36b9288faf249947fcf7794bb0ee08308f58431cbbf","pathsSha256":"94a091d7fe033bbaea60a7d355d432ff0b00869411448538056953b5af7157d1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4EF3.svg","dictionarySha256":"168daee1daf0081c571f7b56989371cc585f83952855012177d20e8d3f53ce66","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"繽","strokes":20,"corpus":"Ja","originalMediansSha256":"bf21f9fb241e531476254f7ce40ec62d557e8ece6832ca43c2443287e594902e","pathsSha256":"2170f5629dc90d22ead94e8e6ad9ec85045272d1f4580ba697bb396a65e2adc4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E7D.svg","dictionarySha256":"7da08e7c61ad0b61b33d6abafeef700a9d9ee69a2cf56f6ab80384545801b896","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"擯","strokes":17,"corpus":"Ja","originalMediansSha256":"41c22c898d46a88deb69e5900c86f98b08f394072cf479dcdbbac9bdd71dcfa2","pathsSha256":"94e4367d58359f9cff1c05692e112fd157bc6793f03766a5cc107c2c8958d0b0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64EF.svg","dictionarySha256":"f8ec8c857d3acb847609131d4a9a5c3234ed313922f5e1c835d9edc625b5f235","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"鬢","strokes":24,"corpus":"MM","originalMediansSha256":"4ffd7ae47ec975b6ff2c2499d235a35c9118cf7eeb2979d2535d6c0e966f6b6e","pathsSha256":"d26ba06fd619c5299525063667a0b2182925fd73a72e072b66e5b665aa0c3700","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9B22.svg","dictionarySha256":"019ecb2a6647995a2f6c73527933b447950bafc84b7be0ea493c7e4505702f96","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]},
  {"glyph":"豳","strokes":17,"corpus":"MM","originalMediansSha256":"09bf449f7b553893e6bf97de30f622fa3d1d86892fb46724de68f1d0396d49ef","pathsSha256":"0e1ab9ec8cf3ed69950a5a1635462780222ca1724bd9287b3dbca3d18f69f032","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C73.svg","dictionarySha256":"cd5103635ecb64235812cd6a042c7b7e767b8c0d1cfb71cb8e7be2d53c3c811f","sourceStrokeIndices":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,16,17]},
  {"glyph":"蘋","strokes":20,"corpus":"Hant","originalMediansSha256":"151c554a5617cdbc809677e53e627504b14ef0a7d572a62cbf6628312453b41f","pathsSha256":"0bb7618d4bda7442ece9ed078e981e8c46a3735f7708f1b507dfb699ccf0b8b9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/860B.svg","dictionarySha256":"8bac715eae61824284813ee5817cdbb9242e551aa71697043631fc72f246ef62","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"鯊","strokes":18,"corpus":"MM","originalMediansSha256":"590bcb30e9ffcbc704dba3fcdbced78d2d69c9c3598ad6bc86de7bd0564bfc10","pathsSha256":"628417c04680443bed6ffd140d90afae5c46a845a125b9a56c9a03b513915ba6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9BCA.svg","dictionarySha256":"b1925dac693d11b8d857d0bb675e446a9c8a42d1747248519001e4bab7eb97f7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"耜","strokes":11,"corpus":"Ja","originalMediansSha256":"bbe1b878e1c63edc1731f41107ed562a376329d52e2cfd043d284be64336c864","pathsSha256":"517fc8b246d4b0220e673cb28fb1ae950c753fb750ef21cb835c7af54c8313f2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/801C.svg","dictionarySha256":"b21d727229412585ab0d28e764c054043a4469bd47e9abfa4901a43d938b4b2d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"笥","strokes":11,"corpus":"Ja","originalMediansSha256":"af6f9f40c3554f47c1115af87f8a3b85c82c730cbc50f07d2704a03cba9e8d90","pathsSha256":"b80aee108a7eab0a56c94d6c606bc8a3db2619576edb66299fe1ea4941943af1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B25.svg","dictionarySha256":"842918ae2780f7c5b9fef6135cff0eb4b49c73758674af53514a08b6a4948e85","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"涘","strokes":10,"corpus":"Hans","originalMediansSha256":"4f0508a0b48ccd208f9a4b466ae92e1f7c4473af74e20afa60792a4ff8097efc","pathsSha256":"ffcea0e88b9687d454963f0f89fb5bae06a386fb1e5f260e1bd7948524965c41","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D98.svg","dictionarySha256":"4cf3000bad0efe9051b789e996e6c53078db8f9d648a34b551fd2082b14b38e3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"簑","strokes":16,"corpus":"Ja","originalMediansSha256":"81a573b7eb9fc00b198f42a58b24b03c2fb0ff217a249546a5f94939d7b90782","pathsSha256":"24c922b8975b265ec943df7e5587d48756f81f86f9e0876d76e35503015c0cb7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C11.svg","dictionarySha256":"f851bffc58ca638db54e1f3d49dcc82b06045e957d977b50753dfa87fbfa7690","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"汜","strokes":6,"corpus":"MM","originalMediansSha256":"32edbda28d3da8c4003d08c494fd1c85ef8fdc263b3a6a8dbcc7dc05f0f79bac","pathsSha256":"e261d0984115d4824928c3ad13b2aabaf7e2e493bc87d5b972adc5508f7f1473","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C5C.svg","dictionarySha256":"5dd0fd6066cd25b4a08929f2247901afaacbe11d99b3da10b5909620a79e5e93","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"榭","strokes":14,"corpus":"MM","originalMediansSha256":"0f2202e8678a7051793f1e56dc17114e7c3a19fbcaf0b6a4f9fb4ad4461cbe9d","pathsSha256":"da307be0153b29b62c994660b782d5d25602799429f79e7f4dc63b772d032dd1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/69AD.svg","dictionarySha256":"3ec99da0aa460ab791924a30929598b34003fee940965753aeb8396578d08ffc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"糸","strokes":6,"corpus":"Ja","originalMediansSha256":"3029f1fe46d1836649ce3705de167713dcf69b0c3d73d060e815f27d34c1bd98","pathsSha256":"fb3e8bd478be99400af62c64d1bd6aeb874f773275e0163363ef790de873c727","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CF8.svg","dictionarySha256":"4c9310dad5aa76f6124e854b34c8ee846a947bf5efd1c31705943e455b939c60","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"鑠","strokes":23,"corpus":"MM","originalMediansSha256":"7cbbbeb881922f2742a07ef613b329537539190226b834d6b2953654982c0562","pathsSha256":"22eed9b8969e9d59de67b10e08253a30be5be64f37317d12a76e0c78d49e2a73","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9400/9460.svg","dictionarySha256":"8552cf38e3d9bacc90657ae10020d702825b49dcb511221d291037b48af4290b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},
  {"glyph":"潸","strokes":15,"corpus":"Ja","originalMediansSha256":"99839b0189add2eb7245e91c4a3faffddc492d485f8950c9bfe2dd47251d88d7","pathsSha256":"113c72eaa14eb3f7a2766e4ba816c3508cbfaf293ebf72e560d5d8ee54073a97","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F78.svg","dictionarySha256":"022ccbe8eb5d08a8a778a7dccbbfc306b350e29513a2eb3f543c5c15cf342f37","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"歃","strokes":13,"corpus":"MM","originalMediansSha256":"c8e585ec55068f2bef23ae79f3881500195c9e6cd7d1d5ed8d8690be051f6ecb","pathsSha256":"9be92615ee6b52e0223e56439e22917df26850f14778e28716f3ed6a85758d66","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B43.svg","dictionarySha256":"b9a2ea7d56b6eb0162dc239e9d19c2f6fe8c56727d073220a6d34778ffe61d51","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"殤","strokes":15,"corpus":"Ja","originalMediansSha256":"e25ed432c8a8389231b98c6580e9ef7ccc942df1445a1cc693ae7de2d662d745","pathsSha256":"dbcbcf624ba4cfa46afa88b9fcc27fd683d5fe4eabf4e9424e8d72286cb1bb93","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6BA4.svg","dictionarySha256":"70f73e046961495749c6032ce36ecb19a527b0c4e89cdf9c7f48623bd0683499","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"顙","strokes":19,"corpus":"MM","originalMediansSha256":"77653e32f466643b7582742debf0e265d146bdda6612c19db0cebbe3f9e91613","pathsSha256":"d299f75fc07b0df797abea35dde26830c9794c66db8cc087e1ff724264139ab7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/9859.svg","dictionarySha256":"dae9d261df84d6cd96094a36f51df5b90894f8791e4a1aaea90f6e9479e09d76","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"眚","strokes":10,"corpus":"MM","originalMediansSha256":"2d11bb71313842b0eebe64bb6e85ae5a69d1797e5624b0fc520cf26bb71052d8","pathsSha256":"7970a587608f9ae8776733a5591d65608f22d079df3a8a29711338214d4d0020","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/771A.svg","dictionarySha256":"555189df0c074146963751a681b871fff0ba03146c1dd0375c0138565745003d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"噬","strokes":16,"corpus":"Ja","originalMediansSha256":"54ab723504368e8bc754ba99969ee522e2c850f1d9f85e0794dd041ca4be5336","pathsSha256":"3a8a2220f97e266fc2349bc4fd16b08c8793dbecf9bc143307f6743c4985e354","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/566C.svg","dictionarySha256":"c828a98340bad3844cca5a7b58fb3e37cd4bd69025ea8577ae501792c89df670","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"婿","strokes":12,"corpus":"Ja","originalMediansSha256":"78c6f390a26284c9472ddfdbe1d9a76da4c67581b489a1c1b99e9bc284eb12dd","pathsSha256":"e8cced13bb36acce944007e2d5de92cd8726c0adc2b88c4b9b7ba24c8ac8c21c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5A00/5A7F.svg","dictionarySha256":"987562e048ec425beb1fd86324061a1033bbca75926a3cd5745c6873ce41c720","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"紓","strokes":10,"corpus":"MM","originalMediansSha256":"832381c8721175d5be83e4a83c21ae283b1fafba53565d9a9923e1b57b592952","pathsSha256":"339e877bf47d42409e1f2456443a54c377aa5a0ae1ce417d37e73546150ad367","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D13.svg","dictionarySha256":"184d42496332a6a73d33c641def6e782a80c44501e3ea6f6f94ccf74e227e96e","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10]},
  {"glyph":"鼫","strokes":18,"corpus":"Hans","originalMediansSha256":"bf6e766b6ef940831d04e6b96851b7cbd240e438ffa549100dcc2eda2d4b3f6e","pathsSha256":"117b408f69f926c3726a92a53290f2d972a752b5ef983f23af39f253c6b9ef3b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9F00/9F2B.svg","dictionarySha256":"7247c408883632c92c2287ea770e2fd6f64f6889ad7abdcc7af5af6be13259e6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"螫","strokes":17,"corpus":"Ja","originalMediansSha256":"f0e549c538696c00c0320761a72d92d39481c38e11640f30ca9d0a1a1fc6fff0","pathsSha256":"4df2a521d0ed13c7e875d8555c886078f48097155a6b70b7643a26b387cd64cb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/87AB.svg","dictionarySha256":"6fb5f9d123d75ed6574bafd45b39018a916f965f3f6a437aad6593f076d56808","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"裼","strokes":13,"corpus":"Ja","originalMediansSha256":"ecbfed10bd285de39a68decd1faedd9d196f859347b2fc50be21cead6214ad96","pathsSha256":"6eff780e95076b0d8f625b8061883b5c7e7a26c1ac377d6fb45be627fd0e5e27","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/88FC.svg","dictionarySha256":"16f35f2ecbba2757445ed5540c0424232884201050d51e32f7a892dd433ae6c3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"腊","strokes":12,"corpus":"MM","originalMediansSha256":"4365fdb36c5c0510916ff0ba9e31019cd1bc89ac3d0254013ece27c77d5d7e1f","pathsSha256":"08c3f26ba25db7061c7b74fff1c66979c47260b9428b4e15906bae3a6d18479e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/814A.svg","dictionarySha256":"13cce715730f29125a19cd6b56a35f8fc73d6cea5a51d19ebd0722319c5e652b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"鉐","strokes":13,"corpus":"Ja","originalMediansSha256":"959c5a580b556eaf9ed72dd4730e85e25aa16800087330e6987a8342b43e4d39","pathsSha256":"a7f1141af4ead8e0277314359f76f492fc289ce227a0160f461a46cb76b3a986","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/9250.svg","dictionarySha256":"9c22ed2fdadc03fe0275701fd95a54f6c82ec0f635f0d01a574e752b7180d7f9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"愃","strokes":12,"corpus":"Ja","originalMediansSha256":"eccac88cb12fec32bd300d22642fbe09dd4f7ed9e41984e215452cdc45344f7b","pathsSha256":"862c46323cabe785c77ed4debbbab7ccafd700fc792a47c79855d6ccfebf5a8e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/6103.svg","dictionarySha256":"a92378e6ca5ec32c0fe6bd62687b2379720e001c458175ff48510e18ebaa438d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"紲","strokes":11,"corpus":"Ja","originalMediansSha256":"23aa1cb0ff746b02fc57ea42425f8f78544fd9aac936647c86abefde7103d884","pathsSha256":"10641dead2eb21d931f9eabaf4ba1d4ce86f9579eda7f11fa6feeb9f807e7f03","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D32.svg","dictionarySha256":"f98729b1b9430a54629070888c5384d896ebbade655fd43e20b531e5c623b477","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11]},
]
export const SPECIAL_BATCH6_DICTIONARY_REVIEW_SHA256 = 'd166f4d095fb0f281ce05ccfe7e322a15cfc51855923ed9530ce081a88568825'
export const SPECIAL_BATCH6_DICTIONARY_DIRECTION_SHA256 = '57aba2a686714bce464fbfa2962edbac1334782e8eafa0bae7849acd4eb77612'
const referencesByGlyph = new Map(SPECIAL_BATCH6_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch6DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch6DictionaryMetadata(ref: SpecialBatch6DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH6_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch6-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH6_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH6_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH6_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch6DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH6_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH6_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch6DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch6 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH6_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH6_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH6_DICTIONARY_REFERENCES.length) throw Error('Special batch6 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch6 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH6_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch6DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch6 dictionary entry mismatch')
    return { ...specialBatch6DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH6_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES = loadSpecialBatch6DictionaryBundle(reviewed)
