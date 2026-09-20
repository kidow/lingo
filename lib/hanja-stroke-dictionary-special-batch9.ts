/** Forty-eight special grade forms (batch 9) individually reviewed: four reordered and four locally corrected; two glyphs held. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch9.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH9_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 9: 50 characters individually checked, 48 approved and 2 held; 7 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH9_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch9DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH9_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH9_DICTIONARY_REFERENCES: readonly SpecialBatch9DictionaryReference[] = [
  {"glyph":"耦","strokes":15,"corpus":"Ja","originalMediansSha256":"2dd771411d28b78a5ca1cbf6daf8c869d2b6c7aa273ebb111d68f23012196d55","pathsSha256":"db381e05fc55d3b9da1a351c6b4b092072705d40ea7d2b4089f3cc8d4e982f10","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/8026.svg","dictionarySha256":"b0b0ebcdc5fcefa5d1108671167d209a8902d45af4fd859a368f131b7492e2f6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"懮","strokes":18,"corpus":"MM","originalMediansSha256":"d0aa19a56de837d94b5f5bcc8d2026e615f069101492235e7b7ac2fa77981ea2","pathsSha256":"606a2b862cce3276a412b71ef521fdb45257873e39205c21973fe37f6b0d0ea9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61EE.svg","dictionarySha256":"76f545d91ac16a30e53be72977e963b11a605e2e8c76cd0cd5bb4b9918426c17","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"踽","strokes":16,"corpus":"MM","originalMediansSha256":"5ed98c83414350aeb6588c48ebd62d6ef7046402d43960fdeef697117475e76e","pathsSha256":"9b94dd1cc14e6e546c42e82ab22f07bf6decd8b7ff9154a05d2ee0f47a3f9e80","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E3D.svg","dictionarySha256":"0763c9fd3f27104e6642c4f425c7008ed3098d18356462597f64561366ed1f76","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"耰","strokes":21,"corpus":"Hans","originalMediansSha256":"402865372909e1ef94ed40895ab2e4c380c17c8a16c704a7dd1eb4d74ac40f01","pathsSha256":"c3fdb55cbd7fcc06654e7ed2c8650b5578be6ca1c1976b6f7d55147319968088","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/8030.svg","dictionarySha256":"f7bc5eb60c1c43da31478ab7ede7cc01de15be13df717d6f8e0d73d469dd4980","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"訧","strokes":11,"corpus":"Ja","originalMediansSha256":"d7a1d9b909bd22537fcedc18ba216477ec626fad378ae400da4fcf5538eefee1","pathsSha256":"f56dc337f03d3dc9d4a9aeff21709cab1821d1bbef45d650293f9caac364b8c9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A27.svg","dictionarySha256":"27d6fcd69e8bad2d97ffdac79e71734824603e7451285c6eabb9746e286eb259","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"勗","strokes":11,"corpus":"Ja","originalMediansSha256":"c793d6197c99c461fafb26a08b691bc5f28dd8c3aca2571fba56a7c40a472af9","pathsSha256":"dc6cc1fcd212f4dfd24fcdf61d12de6e981c21951ca5c6ba993889ba173aad1d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/52D7.svg","dictionarySha256":"d4366b7903515ac79b4f8c5fccd8cd8b1443434c761effa1ce77c9eec096046f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"燠","strokes":17,"corpus":"Ja","originalMediansSha256":"4aed272ef9c62bb2da494da9cde1e338a58e5153feef3221a23e9db83c7fcede","pathsSha256":"1030e2463d5c3975527e8ed2a3353fba512abdb3dfae697b0f4e004de9ebfa47","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/71E0.svg","dictionarySha256":"a7c0578ba20c343ac40661716474eb3454bda73b556f826952b87c5f176294f9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"沄","strokes":7,"corpus":"Hans","originalMediansSha256":"fb9c0c1e6ed5307fc6663e2399055897810953894fa1a4fbd5b49b5c89edd340","pathsSha256":"ddeb9c8ab3417943282aab7f86afb03d1e49b38efa647b7b8c94f32b3d827a8d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C84.svg","dictionarySha256":"215d75dba4f59c6ee4f6c397c7ce70f3567f1a015a2ecf1e7737c13521695865","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"篔","strokes":16,"corpus":"MM","originalMediansSha256":"b25ba0662b8c12004f8b4111a9341120c36904f70eaafbba0524ff9956af1bc0","pathsSha256":"f4e0fcb289462480640eb5ac037a370c30521249c77211c3f9ec3e46285a7e50","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7BD4.svg","dictionarySha256":"51e86c0cce73afd7537954f644cf8c05392be4f0957399c4a149ecaf0edd7db5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"黿","strokes":17,"corpus":"MM","originalMediansSha256":"248eb7c07ee478413eeea880b8e328cc8541a1b347c434c865b7a258679eddd6","pathsSha256":"95d196722c639f87712e3eff66aad657d1cadd67e1eca4ba774503a1bf0f3126","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9EFF.svg","dictionarySha256":"a950030fb4f2e80ccfaa0f9050fce10aeabb50c4d35a8eaac2a3542408346257","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"刖","strokes":6,"corpus":"Ja","originalMediansSha256":"0e3c42aa940bbf2a1efb4a49c1e56898f8643616e435957151b5fe3469874256","pathsSha256":"b38456977bf13d8acc8794e268fc9cc52827e25c529ec89d694da143f7334a23","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/5216.svg","dictionarySha256":"0a414fdd35404243269331b4e6e71f57adb3d4bbe655b3305b1c21ba2e1d39ba","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"喟","strokes":12,"corpus":"MM","originalMediansSha256":"3a92bb05c72a7adb08e540d866c8d5fe2fd34a93d95b5f29450d874087eeae68","pathsSha256":"be5be093d0407aa8c88f0b346660511ebe07e8b28762db9100e72b60ccce1f80","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/559F.svg","dictionarySha256":"de1e836df93a7758c765620dea8e52487640087b36684373b2abe5fc17f5c868","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"闈","strokes":17,"corpus":"MM","originalMediansSha256":"b4981de8f2c7ecf10e4039451cc9bd8703f6ac8e06ff182812ad6dae7f0eae36","pathsSha256":"ca62eeefe5c6691be984acbfa1a7273a7cb6d33368a3301e7041d7030ce3d878","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95C8.svg","dictionarySha256":"7102441875b8675a84fcc5d2144429ced5f9613ce663a9436efa0b56812f21a4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"濰","strokes":17,"corpus":"MM","originalMediansSha256":"31a8e4fde58fd22ef1540884d54cfa602b026a473b811b30ca25d0b12e3a16c7","pathsSha256":"ab1375ebaae9f2bfac9e0ed56df96360363214b978e28bb7ea3037a6b554c142","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6FF0.svg","dictionarySha256":"ceae4239401cff9936d480bfde54546b6ab7d05060e61da0ccba85a62d62de8a","sourceStrokeIndices":[1,2,3,4,5,6,8,7,9,10,11,null,13,14,15,16,17]},
  {"glyph":"卣","strokes":7,"corpus":"MM","originalMediansSha256":"0cc850dd2f390a3788261c39f6b72d9bf13a7c2580fb0509be5f9cb47234dc84","pathsSha256":"9e8f83bcef772af188c26b5688874d1dd04e0f4dce151369b0be1e287add14e8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/5363.svg","dictionarySha256":"ca7434cc66e0098360ef4ed3f90945eed5fb6da786b2260e37ffc5a01e4e6ea8","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"龥","strokes":26,"corpus":"MM","originalMediansSha256":"910e47e12161ba427fe4e488175c8d349b5fd752ab40441099788286508eae64","pathsSha256":"07faa58efdba889d3286a254f80682e7d8290f3c62f1f692846d3a64b164b95b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9F00/9FA5.svg","dictionarySha256":"acc2103c494b3af1bd6e5f0d7a7598c4f62aff7a4b5f91b4eaefc80e9529cd0f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]},
  {"glyph":"籲","strokes":32,"corpus":"MM","originalMediansSha256":"88b3a10d4b2142e1675e1ff791fd66e2c0ec5fd4b4114b38f6a5b436ddbb1364","pathsSha256":"853385ec3d909ef5d0045f615c4796a054f328483dbf3d3da9da490550b7b4b8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C72.svg","dictionarySha256":"72c74a079db67b0ab08187d83994d1a92e3e26eae4a1242ca9e2a154e6737888","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]},
  {"glyph":"黝","strokes":17,"corpus":"Ja","originalMediansSha256":"b3c77001949a629e9116a90bf5a9390ab6b025381f5c504db01e5d9d31be7410","pathsSha256":"d242128c371c0cac87f37ce8080a314d3658bce6376134f7a42cb97371f7cede","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9EDD.svg","dictionarySha256":"f7e38f67da6903cb8993769cd7b6d9888ecd2be9452f91f84966f095f0744a4c","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"鮪","strokes":17,"corpus":"MM","originalMediansSha256":"4e669487daa100524b087b3a79f64e3658597af027c3a470fc0244972390363a","pathsSha256":"25625ed97f4b037ecdd656f668ebf9960ecd1be91007c7d1c61dc63f4f572c54","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9BAA.svg","dictionarySha256":"580ed7e92e13560896b333dac36e3287e9c2e6af12e1b14f76cf3b50ea4a1748","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,13,12,14,15,16,17]},
  {"glyph":"窬","strokes":14,"corpus":"MM","originalMediansSha256":"7287860d5227a7a3fac279ab7f1b53413b4a299a254a7fbcd86b9de6e1e6b504","pathsSha256":"c9c4e1f2baeb87e151a7142bdc0bf2a1b23013c75afbadeb4f4889b29405f955","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7AAC.svg","dictionarySha256":"a6d58bdfb5ae14e229c7af1002dd7687e093f6fb88effd2379609582fc5f75bc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"呦","strokes":8,"corpus":"Ja","originalMediansSha256":"7559a4b80772442e38b4f8a549beef376b3f350fa741a8aeeb1dbd6810d98024","pathsSha256":"8ef5d5251a834d16c14f5bbfa301924863a0a6e4e2d71499486607c8a44eeda3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/5466.svg","dictionarySha256":"03b0aba98334919358176a7bc071c670e4aaab8d32965f6e1724e0661c9b0b83","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"囿","strokes":9,"corpus":"Ja","originalMediansSha256":"ce3dbf1ba0ed2c68607c03e3b43a3c0e3296fa3252cacf466d760f6f24c58718","pathsSha256":"96b9dab923813df5c00a3a382714fc885088fd24c3b11b5a38c574ade06a1542","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/56FF.svg","dictionarySha256":"e56815e5ef8a65d7d77d3e760ebaf812ba431e24585f3e2c8b3ad60413219d97","sourceStrokeIndices":[1,2,4,3,5,6,7,8,9]},
  {"glyph":"帷","strokes":11,"corpus":"Hans","originalMediansSha256":"15d9953deef1f1361d2e5c24c70483f9ea028c4525825fb0a7799cdbbfa29c85","pathsSha256":"ceb66c5f0855c7098adb2a4b48467cf29dce5b0637dbd67bd64e4269a095da34","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5E37.svg","dictionarySha256":"d4e2056132295dc7956b5b290b535ab025b8ca3759bda07edb352a441ba6e7b5","sourceStrokeIndices":[1,2,3,4,5,null,7,8,9,10,11]},
  {"glyph":"揉","strokes":12,"corpus":"Ja","originalMediansSha256":"b16537e316afd86e6b68d10392254e0fd2cc7220de29ab1b4bf5c439e7cd445f","pathsSha256":"2dc944fa304db27051f61bed631280518de882be356e0d98cb21a3074021f597","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/63C9.svg","dictionarySha256":"17c19ccf6618e56edb98a966fdf5179baa8b9e8d67da350a8694df382219a129","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"羑","strokes":9,"corpus":"Hans","originalMediansSha256":"3f2e23cb3d6a8a4a22fe8808c548a8570457aa79f2f0937319d20d52a4cea8cb","pathsSha256":"228056c239d8cf4629eaa735174e6e8a2968ed8f44f20e166d0fbcff346ebe58","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F91.svg","dictionarySha256":"4466fd9551c962f04d72c0c022af2ec8ae05564ef652cff0a695ae8bbe966682","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"狁","strokes":7,"corpus":"MM","originalMediansSha256":"6555910a3b4b5ed5fabbc9e35d5ba26d31ce55df6c2a1e49b11c033e9cbbbf0f","pathsSha256":"e323a25eb04f622583bdc024398d0928fd155b70f27b4088e2fd7dd2569e7e79","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/72C1.svg","dictionarySha256":"7d0b17cadd4f169c55c5ae1375626f38dd297267b501b9cf30e2a7d7a4fd9caa","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"汩","strokes":7,"corpus":"MM","originalMediansSha256":"31b4f599f5e2bbb7b248aed299dd4a333a8a30186d7cb6e1fefd772ac4b6fa0d","pathsSha256":"b90aa0e7d910449fcc4db2d0e8b85199dff0206ab8c3a8423999e129bc678888","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C69.svg","dictionarySha256":"aef76a97f98abaab2e92aaa09946a6cd0334558cf34d74573c53b7134f7585a3","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"嚚","strokes":18,"corpus":"Hans","originalMediansSha256":"5816f53759ec8cd16c4c5511f661c9e397dc5bc66e4cd96172e5cc3ac12eaf50","pathsSha256":"a102fbf88faa49cfe737a67c5cf5ad61364bd1ab50f7d85d71513ff9c772b10d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/569A.svg","dictionarySha256":"11ff0c45843387a9d6093e04abc3c3fe0b43390ef9e0fa733102cc5f35ec79aa","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"憖","strokes":16,"corpus":"Ja","originalMediansSha256":"eb8b82e7294c998dbe70dd3cb48cd14ff743333ba943098671987dc680e75a48","pathsSha256":"1153641bc138598ebdb67d7bc9c5ae149001b1f4bc2705cda144651d723f1604","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/6196.svg","dictionarySha256":"4e8c48167ddf533ef08639e69a7dd87ce346ef0a6c9813bbf9cf38f4656245f4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"挹","strokes":10,"corpus":"MM","originalMediansSha256":"3036dbcfc948beff7766e1804eaa1aa1da7c488e09f5daec6214bc010dbcb0d9","pathsSha256":"a668a611a3a59c09dcdb47d923f6ae6e95c9093684c0655de15c1df8f04e709e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/6339.svg","dictionarySha256":"89e9e718799dc8fa85a5bd8cd2df23b6641f1b2329b25ceeee30e2e9316b127f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"浥","strokes":10,"corpus":"Hans","originalMediansSha256":"957d2d72b509ec524885dbab16035c6304db919f12adfbf3063dc34a1228a320","pathsSha256":"d806f37e237f3f6c0dd307413c4f80246998187cb775498752512c840196db11","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D65.svg","dictionarySha256":"af8fe5593e7c37d23be83f495dbd2415eac744df431fed2088f398a198936aab","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"猗","strokes":11,"corpus":"Ja","originalMediansSha256":"b5d12ef2626ded899bf487dee02aa93b6bef36b347e6dc977a060461977e720e","pathsSha256":"c42f098a228c9f34d65e40f2da57451ae9e263f96d47d104802f2907d3c0e9f1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/7317.svg","dictionarySha256":"29d80945629619b28649e6411b72e5abc9d41c11b143d0256b40d6915a890bb1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"劓","strokes":16,"corpus":"Hans","originalMediansSha256":"2c75bfa363aa357aa53b33726b18a730de6ce2fa4bcaab77eee0cfb1a2000fbe","pathsSha256":"641e63c96ad6df16852cf927295060ebef2920c68a1f6baeb0720956759dbcdd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/5293.svg","dictionarySha256":"e49b7e49f8d37e79f73e6a73928e235eb17f2286a01b169706a09ce90d1c8848","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"洟","strokes":9,"corpus":"Ja","originalMediansSha256":"7386bcb2a9ba77bd5875c9c0bde4de1f9ff582208a9d5740b71259a91e16d5ae","pathsSha256":"76094765fd1cfaa56c4c07596d8372fce87b6eecb4b453ae63b7b810f4ff5323","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D1F.svg","dictionarySha256":"5d92d2819843c14dfa6f0e6d6abe02f8bd50d4070e9066c4ea964794e05e889d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"詒","strokes":12,"corpus":"Ja","originalMediansSha256":"beff3c3fb87fe6d805244ea0b6d4395d03d30690b4a9e2d24199b2325c69c959","pathsSha256":"5b3f6b39d7d2ed91638cfd3c29a9df667d124b0e6a6a321171b3709df5524983","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A52.svg","dictionarySha256":"decd5d59f4488adf0597101ddf27ab460649674ce28264c71ef7892f5b4c06e4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"异","strokes":6,"corpus":"MM","originalMediansSha256":"e2f63ef439cd695b1bce8979e341ed34f347319f3afe61fd3c23d3001a4db727","pathsSha256":"8fa972912884a9d07c2d9b2978a356ca2ae1bb7905eef7481106b6c39255ae92","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F02.svg","dictionarySha256":"5600548781c7b107efd8eb3900d7f798940de581829cc09618d15f726181423d","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"彝","strokes":18,"corpus":"Ja","originalMediansSha256":"00b7e02d89867abe7e54108dfdc052fc8777e987fa544f2b115a231f4dd63af4","pathsSha256":"5954d87fd71d0a8e0f141f25a5f8fd80d522a004caf070f1e6b5b57ef81ac8fd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F5D.svg","dictionarySha256":"d9ae2ab842cf7c293a26209c3ae37a22ad0375d95992aa185cb733c53d95eeec","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"迤","strokes":9,"corpus":"Ja","originalMediansSha256":"4abd1a14ed151ff50958f877a6e864c67e3d8fd05c0d78011da94735e88d117b","pathsSha256":"130049507fcd93c84bb8f4ba9dbf462e09ad625abffa77127051f8209119eca5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8FE4.svg","dictionarySha256":"13ca2f10f9cf1b00b67e32e2ca979f58e9503186bbd2b91e1ed7e4d52684cecc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"弋","strokes":3,"corpus":"Ja","originalMediansSha256":"9d15886022d938d5f3bc327cdca6e0fe7ce201291cfc6a9875e015d653833a9b","pathsSha256":"4fda9b6f9718242d1d6b7eddffca4ef1f2d230c0fec25513f5481612fae5fc04","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F0B.svg","dictionarySha256":"87be07c9768962d614b69fc7bc65a7d7d94e32c556190341dc0df5df98915871","sourceStrokeIndices":[1,2,3]},
  {"glyph":"仞","strokes":5,"corpus":"Ja","originalMediansSha256":"493df2602acf0ce52d350f262da0c2782f07b02f51bbc16012819dc9c0077097","pathsSha256":"75d48187ae1f25c78b1413a34e2b39beca1390e4daaf4a127b9e289ec8c2bfc9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4EDE.svg","dictionarySha256":"6fa4801bdb1fc9f19088698ec06e0fd8be28ec66e1c13859a9e67ebda167daa5","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"夤","strokes":14,"corpus":"Hans","originalMediansSha256":"7b3986e26bb77a7d96283c2b6cba81238d6457c9a5dc0598bb05057ed5ff74d1","pathsSha256":"22bc9b9682ee4a38b09030741d5e30f5fe9a8c58efa37cebee0eb04d41c52897","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/5924.svg","dictionarySha256":"32bd32d6bbc23a5400a4d4f19fefb1c6b9064f6cce90b1d2ea1fca2067d67063","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"闉","strokes":17,"corpus":"MM","originalMediansSha256":"4e299e7256d670c209cf85e081f9cd6e5e464e114db33bcf43b3d7649ae0c8fe","pathsSha256":"50e418b0bccb8204644d7322a1a088bad24030126953b7143468792f9c018ff6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95C9.svg","dictionarySha256":"0112d62bf38162dcdd8594a79188746001aff32019be8c4bf496ac7398144293","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"軔","strokes":10,"corpus":"MM","originalMediansSha256":"f969b21dceb9e15cf69a6256dd1d80c31d71635a4fa5bf96ac777bd351b701cc","pathsSha256":"f989729d9606167941016bed6d3510a6bacbee3fc71534cd1c77b0c6545dc2c8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8ED4.svg","dictionarySha256":"6fcffad433ca847edb8cccb08a5955628c4a5f390fb3a462f28b18ebc69b299c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,null]},
  {"glyph":"泆","strokes":8,"corpus":"MM","originalMediansSha256":"8edf24147694e82f9a2aabd6ee7752e9200a9420adb3415a4a2311ab63bac8b8","pathsSha256":"3e42e7dbea9db2098956ac8333bab9325b495909268ddd03efc549a7e6b05754","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6CC6.svg","dictionarySha256":"fc50cb4f7dcd4151f6df69a2d7081fdb26dfb1371e7b21f38f931b0e887446a6","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"袵","strokes":11,"corpus":"Ja","originalMediansSha256":"79788dd4d9055e89061941a56eb4066fcc0a98b1bfba9f92f54d58c9e09fcace","pathsSha256":"93d97355ac0c9c4b8fc390379ff9316f4b3777277cb5d12f874692cc939dd081","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/88B5.svg","dictionarySha256":"b330bf99980f3772c8fd4a640adbc3819e86d07a93e7283450e3e27380b17eeb","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"衽","strokes":9,"corpus":"Ja","originalMediansSha256":"3327ee620b119a22d65c0058e5882311e67423b9069476ccb65e7686bbaa0cb2","pathsSha256":"c8501bdd1986642a6986995dbd8dee2720d07fbcf83b30d854f3d460a29664f3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/887D.svg","dictionarySha256":"526b64d5e6bbef08c5ecaed081e8e931ff841e88894f31bb0c6ba24a1d1fd18d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"赭","strokes":16,"corpus":"Ja","originalMediansSha256":"f50255b33d6e8d8fd9870a8d52b6e149b4ae9843508ed861c0635e4b3c2194b1","pathsSha256":"3c42af92a05af64bd4f299fbbafcd51079c3acaba25c83f1540a31029e653a8f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8D6D.svg","dictionarySha256":"9d090ee0154da43f0808191d604cdb4e9b84d03f3c1b2c17f39fb28e5fce319b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"貲","strokes":13,"corpus":"Ja","originalMediansSha256":"14ca5492ce13890d649dabf2cfaed3de9c086906ba2a46d880d85cd6a6a67586","pathsSha256":"187284c0fd30d0188c92f7d68837c5f50421d8b952f6af327fef0fdabd301f52","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8CB2.svg","dictionarySha256":"fff58a3e8c2f31e935a0b896dd0446b5869eafca04277c2526d6e95988e64d97","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
]
export const SPECIAL_BATCH9_DICTIONARY_REVIEW_SHA256 = '5b965b65d2e72d790055eaa9558a67abc4f5d8a69b35d72cf19eb1cc5df7b1d9'
export const SPECIAL_BATCH9_DICTIONARY_DIRECTION_SHA256 = 'e36213f9d9d63b54e4900e3c5095bf1be6126748eeb65b92958d7c828af07b1e'
const referencesByGlyph = new Map(SPECIAL_BATCH9_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch9DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch9DictionaryMetadata(ref: SpecialBatch9DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH9_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch9-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH9_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH9_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH9_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch9DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH9_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH9_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch9DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch9 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH9_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH9_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH9_DICTIONARY_REFERENCES.length) throw Error('Special batch9 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch9 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH9_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch9DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch9 dictionary entry mismatch')
    return { ...specialBatch9DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH9_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES = loadSpecialBatch9DictionaryBundle(reviewed)
