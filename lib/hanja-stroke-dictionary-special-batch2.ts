/** Fifty special grade forms (batch 2) individually reviewed: eleven reordered and four locally corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch2.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH2_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 2: 50 characters individually checked, 50 approved and 0 held; 15 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH2_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch2DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH2_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH2_DICTIONARY_REFERENCES: readonly SpecialBatch2DictionaryReference[] = [
  {"glyph":"轂","strokes":17,"corpus":"Ja","originalMediansSha256":"7bd2c13342e01b9e1de6c4f08ee09075ab55ba9dc462a63fb856ef08ed2a104f","pathsSha256":"48abd99e3ed85f8db04f6e52d28af4c6e022e19e65d9a4b906e1026559fb1f07","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8F42.svg","dictionarySha256":"4f1331846326c03cab94df273486656d277d8e68951fc07f01487ab21bf2b18c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"牿","strokes":11,"corpus":"MM","originalMediansSha256":"8399fed7551e3b47fdbc736d593fcd9ca57b08da505a6c600c4377f4023c4fac","pathsSha256":"69de5d32c8c39080dfb462413b494dc445b224a9fe3c561082c10dbe15b442dc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/727F.svg","dictionarySha256":"6cde94c87411fffb31084cb7964d1f304707ed10c1f48c25226732001e2e290d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"髡","strokes":13,"corpus":"Hans","originalMediansSha256":"783cbf38130e6b7d403ea4420be71af18a51ec0d6bd92b2877f6e0f21cb88c5c","pathsSha256":"b2ef1b83a5fe45496c0d9809211498ee90d37e38cccb20a971a6087556736e48","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9A00/9AE1.svg","dictionarySha256":"9ae781800ac56c95b13fd38601b7dd88f2ffdc950e34410dbb87550a2ecb37e0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"錕","strokes":16,"corpus":"MM","originalMediansSha256":"7868598f7dd57c3450a01388b8e108c1d46e78b715ab26f5161b434bc982bb59","pathsSha256":"42934c6bd9f036cc0b42f778eb410334520cb02cc4d7871e52154be7df394026","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/9315.svg","dictionarySha256":"985efd97f7b476eab8c478bcb74ba04c84659a535661aae43b198b273f1cb4ec","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"緄","strokes":14,"corpus":"MM","originalMediansSha256":"e5248fb458622066698f9961787457a8333fe9572e26b2d6417a33547fe1c856","pathsSha256":"69b928aaedfb0ec86684e3f5fabb43ef4007a0ab8985461491314caf6a3279b3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DC4.svg","dictionarySha256":"ab6a70c850ec09fb1f2c3df6a603831f85a43ddea80639e6f31ed78e6ffdbc06","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14]},
  {"glyph":"夸","strokes":6,"corpus":"Ja","originalMediansSha256":"6f88240c02a014837c5b59f9030fe8e26e2bffc4ec21a2a9cda0f8fa7829a1ee","pathsSha256":"c608eebd24978457ab365d3dde8bb1c09354bcd16a7a7265798b8b95f0bfaa27","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/5938.svg","dictionarySha256":"399aad93e6b888a206c4689ece2f4993c1f59740b259d24c76a52a01b192545f","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"蜾","strokes":14,"corpus":"Ja","originalMediansSha256":"ffa45d05cda326235f4df799329be90b3052a00ab4a239dd063a806800cef4df","pathsSha256":"757b13b5e0744fb6fde108a72ad87631171d9f91773b35cb9abb7e479c7588ad","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/873E.svg","dictionarySha256":"7eb9adf259d4659eecb6c61d58a0480768351fda71bed0099dee8e9ac67dc3d5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"裹","strokes":14,"corpus":"Ja","originalMediansSha256":"e5e91f619020922793c9b44c2057ba855395f8113d1d9a7e1651999213f1fb84","pathsSha256":"4daec351b6af9c8e7621d2f17829968abc41682c6787aeb3ee9e6cc7baaac5ef","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/88F9.svg","dictionarySha256":"b25840a31fad68bc65e074f4efe59f0f08c0063cad4f3d794f04bec7f9d7f203","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"霍","strokes":16,"corpus":"MM","originalMediansSha256":"ede3af432b9c1174a58446f17d6d2d5bcb9b33c7f6e5bbff1cc3a2134edc08e4","pathsSha256":"c6c554924c96c8f060fd479e57ec2e20185476c49d2238ebfbc7f0de063eb4a5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/970D.svg","dictionarySha256":"300db363d2c99ec3ae51e0c20fa23898c08bd3fe8856795f42e9a2e9eba19ec3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,null,12,13,14,15,16]},
  {"glyph":"盥","strokes":16,"corpus":"MM","originalMediansSha256":"a075366919f50f58ba3a39d5543c7e4669618a7584546aa6b53c4a534f24200a","pathsSha256":"be8f294285ec0ecec2c641692f71abde9a21a5b234b4455ab743f2ce1f179e3c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/76E5.svg","dictionarySha256":"0f465065a145adcbf6e6569cfa7e44844348a5897cb8755b4c3862b3c2499171","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"丱","strokes":5,"corpus":"Ja","originalMediansSha256":"c4b8f312b9c5fb1e88b73cde578ea4615be1721b495c0402afc798a91d98d9cb","pathsSha256":"7a56acee07ced5d6a0cd855fddccb80ab89b1daffd1446a99476992fcaac8764","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4E31.svg","dictionarySha256":"55e379c986c14c2e0e1da946e1fa77c26ca94503bde133cf88682447553ed633","sourceStrokeIndices":[1,2,5,4,3]},
  {"glyph":"綰","strokes":14,"corpus":"Ja","originalMediansSha256":"f1417792f370a44cfa979ea348d3d42fd34ca917f745b54013adb9cbb4f3774e","pathsSha256":"6290e8a92ce6b66f0968e6015e6e72f38dc2b7f401cdc9e75b70d103c4a8b849","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DB0.svg","dictionarySha256":"d4e408595e72c02936bea2d572d757c7e9ff4a8e1b42e38290ca254007a45fc5","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14]},
  {"glyph":"栝","strokes":10,"corpus":"MM","originalMediansSha256":"db37b3c4a3f3ef6c6862df63500533ef91e6a790595f918731d01bd9805641fd","pathsSha256":"b2e04a6ca43a85c8742023ff8d3851e27c828b21859ece9d83628df168d1526c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/681D.svg","dictionarySha256":"43e20876d67c0bd8e5ccfef944ffc1b1bc31ba3f0a379975136c6d5b8b2677b6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"聒","strokes":12,"corpus":"Ja","originalMediansSha256":"471c3e5c9ba286b31a3c4c7fa1c2a608f098c45144729acc49f0fee2d001de63","pathsSha256":"f88a061507f3dab9eaf801064a547d1b57cbf8f01312eb7d0a488bbf47163caf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/8052.svg","dictionarySha256":"94d30e41bc79d5a56048e9f7fa3740ee34d0b0f75857ca8e6f361bb9f284235e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"誑","strokes":14,"corpus":"MM","originalMediansSha256":"e15b453fc9206a9eff6d60065f5b5e3cb8cd4165f05bb3a765d99942037e5803","pathsSha256":"b5f3bf0562517708c3dc895f7500a98f51b7a14922109b8010f8aa0320567e2a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A91.svg","dictionarySha256":"2f91103b61dee4d29166011053b7e6877ad928d4935233bf09552881672a41ed","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"桄","strokes":10,"corpus":"MM","originalMediansSha256":"39e69416cd6285c2e8ae7c01d79bb697867bae481fbc824e758bcd26c3529fa1","pathsSha256":"0d0132f8983abfcc72b6c68e962799e28e7fa98a013f664ad7765c323a31c929","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/6844.svg","dictionarySha256":"ea97379f68af316df789bb538988714bd51c9a02f80fc0ecd858c1a4d9850fce","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"蕢","strokes":16,"corpus":"MM","originalMediansSha256":"c968c4ecfe3765fe255ede5f868e841c0f38e96761ee340c5808c165be65c330","pathsSha256":"4f7a88c0588cf1ffd191aaed5eebf0d38205657d6c96748948fce80020f16600","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/8562.svg","dictionarySha256":"456a9d9f71925838369fa7bd523363274945cdd642ca094a3f456b8e4693d1b6","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"瑰","strokes":14,"corpus":"Ja","originalMediansSha256":"6dbb9e3ad935fe404e573caf1bbdb7241359c73cb5eba5b92f56cc5b3cb4bc62","pathsSha256":"bc73e94a5979c8dcd738929578af215b50883ebb642afc3da3e447f856c8edb9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7470.svg","dictionarySha256":"f0416b67a3765e8ee623cd6b773944b571ed207f591edfc81c4187faec0858ae","sourceStrokeIndices":[1,3,2,4,5,6,7,9,8,10,11,12,13,14]},
  {"glyph":"虢","strokes":15,"corpus":"Hans","originalMediansSha256":"34fa3812f8230a6d7ef950b1116de2b5e2f8df7329500c505eab067e284c6ebf","pathsSha256":"19f43323e72ac0fd5bceb1c9827bcc0ecaa8d41adf886a3011e5f12d60556054","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/8662.svg","dictionarySha256":"8eeaa569263a8e27e2b4c338f535f800620216a605b197a2dd2a41c2f7620d14","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"觥","strokes":13,"corpus":"MM","originalMediansSha256":"e7e81fc868eca128f2b45b6a7658b1e9868ae35f8eb9421cc0acb881ff751514","pathsSha256":"d956deb8383f582504cfdd20474caa59904f1f8c30e287fd26421fcd63e5ba98","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/89E5.svg","dictionarySha256":"60c7818c6cbccc54377b2ca7997e3fa78e8bdf840515fc908bd0140fd40d9ef9","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13]},
  {"glyph":"磽","strokes":17,"corpus":"Ja","originalMediansSha256":"b0d53ccf7040c71a67cd6c8aa1c7ca953784775d460a2241d4cdbb50f2bcc580","pathsSha256":"a64121c5958d19b794c3ca45915e47950dc3797b323bb5fff2b1cd1a117ea231","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/78FD.svg","dictionarySha256":"a113cb95d6392e12ebf5ae3920c9636ec3f4f0ff702a2ae3c09b5bff1e3576c9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"佼","strokes":8,"corpus":"Ja","originalMediansSha256":"3dbc968144aaa5322102156aadf9b2de99563cebf9afe37c6b69998ded565463","pathsSha256":"50dc0dca3137844963346e366112d23ba546fb1298f0a55d2e39ca88d3c6f83a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F7C.svg","dictionarySha256":"8126fe8c7bb108c5ac68d052ad2b29a3e40844e0e6087a2cd4041fba0b593b18","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"姣","strokes":9,"corpus":"MM","originalMediansSha256":"9736e2cf0173c119ec4a62065c157536a444334bb85ad27e05fe92d36e550e50","pathsSha256":"e9c0f4608287892f6eb8d9518552b1ccfcec32c079465a6e783cc12d7fdf6609","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/59E3.svg","dictionarySha256":"5682531100b0ffdae1ff72e6bebe69423d5e140945e711a0fc072b9842fe4e40","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"屨","strokes":17,"corpus":"MM","originalMediansSha256":"985a2490c33c5fe27dbf3c76bf979b586e2610c59358db28e25732aebfbefcb2","pathsSha256":"7c89e5c2b544819a7c111dbb6ea9778057c90f863729c428e99145cc629e5c79","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5C00/5C68.svg","dictionarySha256":"321553aa91d150924082856a86481eceb4428158c581402dda4125dd7306cd2d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"嫗","strokes":14,"corpus":"Ja","originalMediansSha256":"5564f87adb97c59660f881ae95353aa81fb94b5ce94bb564cf1f395fe045d068","pathsSha256":"1a9b0828626bc5f97d1f79ff792b632e39189ac8c8a56820300151a77996fe80","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5A00/5AD7.svg","dictionarySha256":"c0d3d71ec031ed31874c98447d8890032afadb4ce7f6b18ad2621f31c5a02e4c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"俅","strokes":9,"corpus":"MM","originalMediansSha256":"94f1215ff41787ca00974fc72a6d3fb7e5b79c59ccf5fbb9f72f3b351319bd18","pathsSha256":"d9577caf0b40ab4ddb442b040e33242e1f0eec3a85048c78d2fb092a0d1c7a76","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4FC5.svg","dictionarySha256":"324ad0a0e3b748eda77d9104c68203f4813d53094e4a6b79117482135ce10fd9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"劬","strokes":7,"corpus":"Ja","originalMediansSha256":"d84cf44f4b50bbb1eb606914522bbad2f143b1e2018999b6aa7098be98290769","pathsSha256":"3b1dd6a2b4fe29e0a02f186d1d4e04b63044509cd2fdff0eca943d25d9f1f129","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/52AC.svg","dictionarySha256":"798f8086861120d4db3ec9ea40112feb9871e5a64f65a209fc5e0563f442ebbe","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"糗","strokes":16,"corpus":"Ja","originalMediansSha256":"6fed2bef03bcf7d5e3c4cb95a321dc021cf94f39ba6f44e884ab346813368548","pathsSha256":"34702bd2196f9b73e427924832702106ad9e096ef0206d61e929ecdba920deca","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CD7.svg","dictionarySha256":"b28267962d5d9563555d97b4c4b57a6298a4476bf42a2b61e342e3324108c0a4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"笱","strokes":11,"corpus":"MM","originalMediansSha256":"178f399d3437f5f5bc7037f5ce43a0e19a2af1cd0e5a2674bd6e65f6d80ec88b","pathsSha256":"55c65b107603f1febcb8b49faf98daafc4f67497736ce39aa460919b45a33898","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B31.svg","dictionarySha256":"0bab06fb11a4023bd413cffdf89ffd65ca67c6868b2a7850ffc22825e7dba06b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"韭","strokes":9,"corpus":"Hans","originalMediansSha256":"fdd5a63142aab805d8bb678996e800d28a4dde8726d43af1d637e51fc8ae0b0a","pathsSha256":"40dd0c0b14160c3c2aebe72e76bb219ec2d82622ecdcc20396239a76bfab3e98","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/97ED.svg","dictionarySha256":"3aba7932c29c84c84f66369433e21e75d80d4d71ddc2cfb9be33772c520aaa68","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"遘","strokes":14,"corpus":"Ja","originalMediansSha256":"b0b341f382a70d23e1787ed419b8b2e5419200ad4631db120bc32b486cd03614","pathsSha256":"b65723e478959c493f640b67b5afdcd6a07a185d26d7d73fc3df9c3a8641020d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9058.svg","dictionarySha256":"04bee12f7fb160322823bc2aff244d5316cb40959c4e796ff1615b6d8ea48bf4","sourceStrokeIndices":[1,4,2,3,5,6,7,9,8,10,11,12,13,14]},
  {"glyph":"媾","strokes":13,"corpus":"MM","originalMediansSha256":"ca359389f0282e0b3411e1b550e8115b18c190d1e8ce69df6fb18072d46a2774","pathsSha256":"60190589e63671731081054ea234c519541277f47138faf35a0a7fa94d3345c0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5A00/5ABE.svg","dictionarySha256":"bfcfbdb6219301ca3337c6fb43eacf48c5f803f803ce0614b7108d565f8888fa","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"裘","strokes":13,"corpus":"Ja","originalMediansSha256":"8704d0a91ea6fb4dab4b5ec02f6fd14f1569183dc0ea593b0098d31f0d666573","pathsSha256":"41ac2356a97da8a07370b720bdf12ba6a25c1cbac05c7f017880997d9a8ef342","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/88D8.svg","dictionarySha256":"f544751657050e9cdb4d14cc82eedceeffd9c550451fe1cd6c8b9febca8a2c6b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"彀","strokes":13,"corpus":"Ja","originalMediansSha256":"5949a2a00541f1f6be6181ee32ee039a36bf49db5db5535fb618701fbd6e4319","pathsSha256":"52fef413e311098846aa184bb6074d8b5f7731b8aed020fc5834e91ea7cb0756","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F40.svg","dictionarySha256":"36a01d3aedcea6a74654e940073684b14af134ea6ddc1d7b977735ca33668349","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"窶","strokes":16,"corpus":"Ja","originalMediansSha256":"37cdf84b8e4c9984c520c96e6b6746b901235a94f2964585f0e4406ceda6a68a","pathsSha256":"f487aeb8dad044aebb2bbd71cb10948a1cc320e6517e5e05c50221f7e5175ad3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7AB6.svg","dictionarySha256":"c203cfdee50a65461055483c83c3fae88868178570ba89d6a80fb84933909cb4","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"疚","strokes":8,"corpus":"Ja","originalMediansSha256":"15131b7414d50f885e8092ee3f9482d788502d061956cda516c40ff55d2c38d6","pathsSha256":"93c1c9767382466b05f83521ca49da7f7dfeb9e674ab85a3e9a1c1f23289fb3d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/759A.svg","dictionarySha256":"4a1c5b3e05bb9f8d35c8aed04733edd5d0e228dff08c07938abba91d95e7687d","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"璆","strokes":15,"corpus":"Ja","originalMediansSha256":"d4cc8ec5410f7904859d85fa1b55ce0a111e31a6974971af85f6d2ddc9e178a9","pathsSha256":"3d2dc87763ae7d0bc738550653e97291a214f6b416122c7cc1a04120a85763f4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7486.svg","dictionarySha256":"2dabe655593ff31ba1fb7e0ad3b87112fefc50201f428480b795d5ed51fac599","sourceStrokeIndices":[1,3,2,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"漚","strokes":14,"corpus":"MM","originalMediansSha256":"f218ead6b020f0635e9bc064a7138b0ee0a64c2f6c50ecc953168144ded296ce","pathsSha256":"58a4025aca46166b38e6d2c2c4ea1b8d4b3dc602cb4c4838bc5b93b813590414","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F1A.svg","dictionarySha256":"e03a157849bc6649432a0eb6c00146641d606c39c8acf054f0f67a5cd1d6af47","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"搆","strokes":13,"corpus":"Ja","originalMediansSha256":"e919bc5169fd518375252c0f60842eb6e5af5b216fdb2eb14e83c66533f7e1f3","pathsSha256":"49f175b364125f3a75aa8e543c2cf65a237cf2496bb1718f23c3e88e87efe33b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/6406.svg","dictionarySha256":"0888405c2374765291d1bf10cfa9f50bf3011b1d6a87a63cf3f492e1b7bf83b3","sourceStrokeIndices":[1,2,3,4,7,5,6,8,9,10,12,11,13]},
  {"glyph":"扣","strokes":6,"corpus":"Ja","originalMediansSha256":"7b299252bc2cd101a10b039b5b39d1aa08009db852f47ccdf9052843d08b74ff","pathsSha256":"0d098130b8ed5da8e4482cdde8071f7918f99ae651ece7e2ac1c74754f1ab1ac","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/6263.svg","dictionarySha256":"f8124c923413f83673cebf3bbdcc37dc59da9ce4665bdd81ec057a622ad57df6","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"覯","strokes":17,"corpus":"Ja","originalMediansSha256":"5722546ae838f13968a8499bf64f62cad9133bf50846f77c620a8e8cdab30c6d","pathsSha256":"924cb58d13a82b8de84961bf92b5fed068651553093d0fc43dc4b1171207e6d1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/89AF.svg","dictionarySha256":"6086121cb9d803da105008017fd50cd436426a0daa64d6935ada3d5f194cfb90","sourceStrokeIndices":[1,4,2,3,5,6,7,9,8,10,11,12,13,14,15,16,17]},
  {"glyph":"匊","strokes":8,"corpus":"Ja","originalMediansSha256":"604622bc6cdcf25d60dae4e7558ac6b87a752587bf1641b98e06b538169eb8bd","pathsSha256":"ae9ff99daa52cc727e4d5f77f21c70be3964f5c00c958a3839aa11d6b3544c4d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/530A.svg","dictionarySha256":"24a43c6c862ead1a3aa1bd8c7fe49887af22275c84ea57bb601c796acaacc6dd","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"棬","strokes":12,"corpus":"Hans","originalMediansSha256":"ec8f1f53425099691e3cb59205c4a673beda189e0322d14a7c7047939008997d","pathsSha256":"85e2f3e0293c14fcc56f57be048c387bf4d69a1135e94950ae65a75b3cc78ab2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68EC.svg","dictionarySha256":"c26a69a436a76c9f9c3a987d40da6e65a3c591c7aae50e50d09cbfff45cb097f","sourceStrokeIndices":[1,2,3,4,null,null,7,8,9,10,11,12]},
  {"glyph":"綣","strokes":14,"corpus":"Ja","originalMediansSha256":"16d906e97a9763c2f7bac27f4ec365e6109d6e2c042a199dffad88d7be6c0b69","pathsSha256":"2ee3b79b5a1abf213c99e8581be7ca0d43f9a24efde68a5a4698aa919c442726","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DA3.svg","dictionarySha256":"1eb9ae2a6a786335ce9312e23825a753bd93671dc11081d7f75e1bfe91049b2a","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14]},
  {"glyph":"鬈","strokes":18,"corpus":"Hans","originalMediansSha256":"e8abdb77acfcc6db4c7c564e740792259ec828c81a127ca3283aef973f2fb90b","pathsSha256":"c4701e432874ad8aac2c684bb41aaeee130c704fdbd3fb67c4ad9bfe30d00622","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9B08.svg","dictionarySha256":"8e8e71d0ce52796bfbb02aa3910c10d346dfa443c857c221364cf3bb0340bf96","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,null,null,13,14,15,16,17,18]},
  {"glyph":"匱","strokes":14,"corpus":"Ja","originalMediansSha256":"e2d66fe788069e63f1a4510dd99f1a85c78915485331602271f9b68474785921","pathsSha256":"991f10821447e748eef2624b3380561c95c85de7186852144b39cde21b8dd09c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/5331.svg","dictionarySha256":"b2b8733743a6791ad14fe5151e5a337d03fd8c26f57a150a16b65f2570061eaa","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"氿","strokes":5,"corpus":"Ja","originalMediansSha256":"3013b5600ba9ac6e963e5c472ca1634ff225ceaec761b0133b6e0477633b3411","pathsSha256":"5b4113cb4b6a6baf31a0d1b3a306f0d6a66f16ea3c7d87c4bbefd451efa277e5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C3F.svg","dictionarySha256":"b9e86e34ec9483acfcddac94e8c8b36e902dcbf40a7d1fbb35042f6f79724a18","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"簋","strokes":17,"corpus":"MM","originalMediansSha256":"e4ed8271052a7c443aef9c092bcbaa2e9a5853195e52fd7add7258d9f3ff0e38","pathsSha256":"7c7a7f1ff5aca90eddea7a78d05c7f2728ba282a16a24a12cd6ed116d4470fe3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C0B.svg","dictionarySha256":"e5db14f17e034ad235281b29f47fdb848368909a536c7e0431dee0bc13b36794","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"跪","strokes":13,"corpus":"Ja","originalMediansSha256":"04edde461a942872be19183a3e4c0ac3de43f15ed45974227d56b5ec881868f8","pathsSha256":"a318089b0278ef8c4613de448ac49be8312cd80653242543d10a9b573bffa045","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8DEA.svg","dictionarySha256":"b2cbc68593d98dc01f2280cd6e2afe0aff1e7fe351fb6997a82ee417a354c598","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"匭","strokes":11,"corpus":"MM","originalMediansSha256":"be826beccb0fe0fa2611c4f9b67604fc2deb48613687d6208957bd49c895ed97","pathsSha256":"ae7b2b31c22c3b6cf0f300e3d4f8579199efcfa880618eafba6b66e834d4e985","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/532D.svg","dictionarySha256":"791a64946d8b8427c0036c8b9b9e475ee0d4cd2a4e2e05d828d47a3a77bdbf79","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
]
export const SPECIAL_BATCH2_DICTIONARY_REVIEW_SHA256 = '676273118c421a445fac0cc65e90832fa2fe7741e95502cc753e294392fd0868'
export const SPECIAL_BATCH2_DICTIONARY_DIRECTION_SHA256 = '9571e66d6cdf1b2d14b375d84bbdc9235f4648a130a5f7867e1e500b7b936d5d'
const referencesByGlyph = new Map(SPECIAL_BATCH2_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch2DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch2DictionaryMetadata(ref: SpecialBatch2DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH2_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch2-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH2_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH2_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH2_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch2DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH2_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH2_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch2DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch2 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH2_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH2_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH2_DICTIONARY_REFERENCES.length) throw Error('Special batch2 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch2 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH2_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch2DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch2 dictionary entry mismatch')
    return { ...specialBatch2DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH2_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH2_STROKES = loadSpecialBatch2DictionaryBundle(reviewed)
