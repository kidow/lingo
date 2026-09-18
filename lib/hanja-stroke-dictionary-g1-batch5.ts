/** Fifty grade 1 forms (batch 5) individually reviewed, including 12 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch5.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH5_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 5: 50 characters individually checked, 48 approved and 2 held; 12 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH5_DICTIONARY_GEOMETRY = {
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
export type G1Batch5DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH5_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH5_DICTIONARY_REFERENCES: readonly G1Batch5DictionaryReference[] = [
  {"glyph":"禱","strokes":19,"corpus":"Ja","originalMediansSha256":"db1e4f9100982f22584b98c4e9d24d9cbc74b8167989e6108b75a3f96713d6c6","pathsSha256":"cd461cfe958d78be6aa4b0c02ed92d321e6a0e74c85cb03af90a968555476aaa","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/79B1.svg","dictionarySha256":"6e35318c497f43cb1054bb61f11aa6c187f530a0481659c2716433aab7e9bd3b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"濤","strokes":17,"corpus":"MM","originalMediansSha256":"d3462a162b0ead5ba1df1678cc1ea5fa2361beba52f25e7aafe27fe4bb239cb9","pathsSha256":"466fc2d7443163f748ef6c6fd6d09b3c82304a45169171b261d48522e2a67d23","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6FE4.svg","dictionarySha256":"841846a3541e155feef3a89bf9a426e189e496555fc5b01d8ba10d12c4de6fc2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"屠","strokes":12,"corpus":"Ja","originalMediansSha256":"b98cae8631cf199ee659838eb1ddf755c9a957d2e52170c382f658c8277247b6","pathsSha256":"c2da6aacad2370beab797774758319fe42ceb03c830c90f0f2c06402ff3609ea","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5C00/5C60.svg","dictionarySha256":"a8e3aa0b7a371bbf1b207b2679952f7b06b45dd071cc79243d9e74bdf89e2a9c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"淘","strokes":11,"corpus":"MM","originalMediansSha256":"4c3c103a6f0ba2e040af9e2d4a49e84ca950fc5a0a768822608a843bff38a563","pathsSha256":"a11b906d440aaa992403487c00202eef8685a3a4a070e371318aa88ab33d107f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6DD8.svg","dictionarySha256":"7584b66633e42c2475264b7b74e6cf2f11011784cfb6bc7c9d807d47b67c3441","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"掉","strokes":11,"corpus":"MM","originalMediansSha256":"223c222b6bcc6f864a788cf71d64cfdcd6328600913b2f2e23fa07e2c3cbca92","pathsSha256":"410bedcd93f4707940861a4594484923abb8d71a9e5312bc0a7febe14a02af6b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/6389.svg","dictionarySha256":"bc2bc2a09c8e52e567e2d52d49350ca035e67ea4994ece63c4577acf3fa3a587","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"堵","strokes":12,"corpus":"Ja","originalMediansSha256":"33b9978eaa4945b614f6af12efa61229f929aa5bda1fdaee2d7ffe15c55c497c","pathsSha256":"82f4573d607dca633b2d829602dda5b38dbf8dd483c87c3ed4c31c945033f63b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5835.svg","dictionarySha256":"fe8285b76eb64301b6d847b9e71aa657543b876b7bc147fb1272d9afe22a91dc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"滔","strokes":13,"corpus":"MM","originalMediansSha256":"d33590ddc904ebb42c04068a8d655650ceb297e1b3ebc226eaf63e9848b342ba","pathsSha256":"4f9eeda76dbaadddedfe2f5c33d1859a5cead577a28c6480db8245a133dd3928","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6ED4.svg","dictionarySha256":"4092153f9a863dbdf1218ad639cbeb722be4c8b3a5effd2df0107a3fbcd7ba4a","sourceStrokeIndices":[1,2,3,4,null,6,null,8,9,10,11,12,13]},
  {"glyph":"禿","strokes":7,"corpus":"MM","originalMediansSha256":"b5eca719dc67fb103378b2312c6abf4667460d33024cbb14e6bbaf14cc70fb81","pathsSha256":"1130aea1e285aeabce0fd519cfc5dbf8a722d8da55547616e6b7326f07c04fd8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/79BF.svg","dictionarySha256":"543678bc7a930144bb730ab0ee19b581c6b12dbc57500404409a39342b3e54c9","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"沌","strokes":7,"corpus":"MM","originalMediansSha256":"ac412e5ace904c8d7075975977a923ee3b1d150ef0053e91910f7e6358f67e6f","pathsSha256":"c420924bb361d931ad141777ece474ed53f767a63c85a9ef97f928ddf9e62da8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C8C.svg","dictionarySha256":"f2ef69b472d90b7d280b34ac7e5b38b114e9b8c833525ae76c48cb71a3b1ab80","sourceStrokeIndices":[1,2,3,null,5,6,7]},
  {"glyph":"瞳","strokes":17,"corpus":"MM","originalMediansSha256":"bda71f31ec8471fe1fa1c3f7891ac5e8365e8e6522edf50337299a4ab65468be","pathsSha256":"fc7cc5235a37418e9b88a9a36b7e18248cad8df0456462004fd41ef1331757c5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/77B3.svg","dictionarySha256":"c8c336b9b31f0bd14e16410c4fb23173c5fe8a51173d856e694d58351c25aba8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15,17]},
  {"glyph":"胴","strokes":10,"corpus":"MM","originalMediansSha256":"718d5a320eef506312669d3328afcaedd5b2bf60dd95b70a18123a9daba9b8d4","pathsSha256":"9c297c24e241b32348c7ac425723c3b51d8a2bcaf0f3020dcb24c039ef494a36","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/80F4.svg","dictionarySha256":"95bcba7671b911e916b38e3460d93c719fdbeb5051aecd240deedd8c74fa8a20","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"憧","strokes":15,"corpus":"MM","originalMediansSha256":"a8a750e6133f65c4730954c79c0517896e01a4ab5a1bc06161e6ee986cd4bdd4","pathsSha256":"4d6d05ad63eb0a7a94561217136c51a8c94c088fec8ce77e7fc978a811d7ef24","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61A7.svg","dictionarySha256":"e560006db1d21c010c458268c9316ad0d2eaeaef998b566160489a885c04418c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,14,13,15]},
  {"glyph":"兜","strokes":11,"corpus":"MM","originalMediansSha256":"ec00186d758b96914cd2515e3a37bda54a1afd8953cb3917461c75d44d2fc947","pathsSha256":"af256c1c44d2da2bb1c6f212c42a554f5901ad8794479ae09fda0f86e1c43979","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/515C.svg","dictionarySha256":"afdae08a83bbc98ed79b02906f54513e6ad679a0c5cffcb25896bb88f328df84","sourceStrokeIndices":[3,4,5,6,7,1,2,8,9,10,11]},
  {"glyph":"痘","strokes":12,"corpus":"MM","originalMediansSha256":"3d9ddc930dadf2ec86859bbd5e1cfd3ef3c26c122d0173c1c687d3b459855bbd","pathsSha256":"76db058fa5ae90c9a89d69c9301255e4af385a4175b1dadb1c560b9570c8a68b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/75D8.svg","dictionarySha256":"1a70baa309f157f957f79de7034c0d78e6b7027d8cacd2830644452c3cd3e930","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"臀","strokes":17,"corpus":"MM","originalMediansSha256":"5c89403baa1ba178c1c66c4962940bedd169ed2c5dd88f5d38cd12db8a3b1461","pathsSha256":"3847376c05363c3bc0a68801875630c4c333024cc36c8271f02d5b0b81e3d3cb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/81C0.svg","dictionarySha256":"334a16b8f12d20e03f6f2ccbf495f445215787ba27bd8cffaa6b3b0c6d63539c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"遁","strokes":13,"corpus":"Ja","originalMediansSha256":"d607dd85db3e4b20c1606b65cd74661e5997e496bc8291c751659dac657d65a6","pathsSha256":"c9f16532a88786da306b8e189438f163ce8109ed2cea52bd7f73971649639fac","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9041.svg","dictionarySha256":"6da68582aee67d3e91a8948b595cd84348dbaa4f57d4729eca94de7f59c87a90","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"橙","strokes":16,"corpus":"MM","originalMediansSha256":"e858fbac230cd2a7368fce3f67fb6d86ecba4b3553607ae574eacee2aa95c12b","pathsSha256":"46e62369ba5a4b71a06b46ea514c8bf22403654a8587f7d5daaaec4abbaab6ae","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6A59.svg","dictionarySha256":"2040ee03ec25c4808f1079185dc535541278aa36b364e5ab65c472fd3fd5ad24","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"邏","strokes":23,"corpus":"Ja","originalMediansSha256":"50b425f8642209df0705ec0d8e0097487ba28c8e3d1a486bccf82bdf29ef0d27","pathsSha256":"5da475a0ab9f0e47a8eaae139164a51126d059dac42e3bf97326147425333195","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/908F.svg","dictionarySha256":"c031049b5e19c083f60aac280c1b83cb60324e230a7a85d8ffafe08fb981698d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,null,11,12,13,null,15,17,18,16,19,20,21,22,23]},
  {"glyph":"螺","strokes":17,"corpus":"MM","originalMediansSha256":"a374be9f906c98ef3a443c57efc2d555d22a8b3105c47c7f934f8b72e3ccc9d2","pathsSha256":"a9136ec5bc4d69791e8c59e5e3f682ebf8793355af09abaf95d8570cc48670f9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/87BA.svg","dictionarySha256":"d7877ccbf69a49aa2223c92b15971833d7f6ed35d9f3e66259d488acf035dc01","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"懶","strokes":19,"corpus":"MM","originalMediansSha256":"f36b515cf593dcab88a50fe25771ea77fee8fc29dcc3ec20b900924079632eb6","pathsSha256":"4d37e87eb4f31b21a535bdf63a9ab92e5acea75a52b639892b78f6f9772f13e4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61F6.svg","dictionarySha256":"9cbc27ab6170d1ff78a18df802517b3f8258fb0ea5a7a56ad799e631bdde3ecf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"癩","strokes":21,"corpus":"MM","originalMediansSha256":"953894fde49bd1c9939a4795aad5f810ff321726d7ca1ac851c0e0d716186069","pathsSha256":"d7247a5f389207b3bb35db1ea63f8dab7b0d7e049682dbfc23dec504b0847cba","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7669.svg","dictionarySha256":"a45c27b369325328d8b817ba597b1b76933801b47f425ddd063fcb69218ccd3c","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"駱","strokes":16,"corpus":"MM","originalMediansSha256":"06c7e399612282e71a8e3d7e42a6f626a9b246742a1f716922eada89156dfac4","pathsSha256":"b111b3258ca6ca6a6de71223299c37ca3662b42eb6bff13255fe2f1ab5f332c8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/99F1.svg","dictionarySha256":"7fe58be63c49ea7ba51b874b4dcfedb1d3899deef918584774c574f74dc6f68d","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"烙","strokes":10,"corpus":"MM","originalMediansSha256":"a1cdf546a47cd0b4119a5d8db9968fd28c39af80fe84c1b5fdfce13ee1d31ee3","pathsSha256":"a99bf74b01887ab338d22707db534b33f92ded53fdb1ee2734e5041de165bcf9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/70D9.svg","dictionarySha256":"0af09a62275786e8e71a4cdc44d6d24743675c6f8421342e71255a649ebea0fa","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"酪","strokes":13,"corpus":"MM","originalMediansSha256":"af512be3d073fe7844a6b1447e8a5f82dfdf40f4dcde0f56b00e044fa26538b5","pathsSha256":"6715dae63fd67c8098edebbf61ef91574c76c286bfce1e1bb4361cab50cc0131","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/916A.svg","dictionarySha256":"dae610470d80c2d2ffca30ea493a978e13371f4cb2e64f272e11f46cb94c1c99","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"瀾","strokes":20,"corpus":"MM","originalMediansSha256":"821feaf129e51dc62bb021116d59b05f5c01c4b6f2144c26bda8bfef3aaf2d51","pathsSha256":"663be732e7107b8300a66e0d85c7ccbf5cb2c23a088587cb092f4a97d044bd33","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/703E.svg","dictionarySha256":"0e2dd4bbb9c35ca28c8f69ccc2498724be5fef4f029c648ee8cbe44030cbbe3b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"鸞","strokes":30,"corpus":"MM","originalMediansSha256":"ef8004f0771f7c5ee67432089a2ead60703ff6df647f993a1457280e841403f5","pathsSha256":"d3cb416b40dceb68f19ea82da6d39a57bef06c79d50a09c808971c1dc2757768","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9E1E.svg","dictionarySha256":"a6111104347ebb6e2c843cdc478c1e08f8a7769956a2a1eae25b27c88cb819f4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,null,19,20,21,22,23,24,25,26,27,28,29,30]},
  {"glyph":"剌","strokes":9,"corpus":"MM","originalMediansSha256":"b2f9b5fd0ce4319ada39560fe0fce7f5d3d33a4dcfa0fb1cd90187cfdda8cb77","pathsSha256":"e078cff33534b987b8ce15c0d1fc69e684dce765e1d2d5265fef6087837b9c36","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/524C.svg","dictionarySha256":"d374520082a2aec4d062d9610f8b365ff75925c8aa41fe80b6d23b847a964273","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"辣","strokes":14,"corpus":"MM","originalMediansSha256":"e320a17307573b3af5bd04af5afda2f0429ec21e41d3e035894472a5ee4dcb99","pathsSha256":"0cd46281ab10a93c9d4fe60234ccd21b5258a5bbe9b64e4912b1dca26020c61a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8FA3.svg","dictionarySha256":"ad9413ef1dbd5209fee9fc6e60fe65c4f38b0691f6f834d5a6bf9a3714dc9d26","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"籃","strokes":20,"corpus":"MM","originalMediansSha256":"356afa1e152108126b0cab724e8e44d3e920e66c32ae89f739f82af6e1177f20","pathsSha256":"c7fe3f526c18f9ccba31d056d378bb93799a6faa6bde225fa9301214094c13d1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C43.svg","dictionarySha256":"253110f650c2a9fcc5141f62bb0f578201b0d01346eb8feaf4a21dcc2bea76d1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"蠟","strokes":21,"corpus":"MM","originalMediansSha256":"ceecd2b199728d030749d225274aa36f280dba940fed51349f69424b8ca80be3","pathsSha256":"ec4faaefeed8c38bac644af3871f3ae91a40957f63a951ba50047923404e5e51","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/881F.svg","dictionarySha256":"d2bc1781cdb809f882850df582ed385c6eb024191b8d51692a185ae3b28a7572","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"臘","strokes":19,"corpus":"MM","originalMediansSha256":"860da2682ab52fd4ea34a53fc222a53ecdb9c6323fdd2832268257eb21932d7e","pathsSha256":"0bf7713c20d526a2d1868510afb732174c72e0098c1aa6e9b897b50517dcd7d8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/81D8.svg","dictionarySha256":"930d9276af058ac5e2f225bea8fc34dd0749a68495c43f6fd91a31fe5dc53f90","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"狼","strokes":10,"corpus":"MM","originalMediansSha256":"9ee23615e7cc3b78a66aa5bcd75fa9f574e357a5273452a83f924a82b5f54f88","pathsSha256":"9c56f929a859f01148a1cc5fd28e1e5d651b17f0692b125082d577101ab483af","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/72FC.svg","dictionarySha256":"8f0ed45405b93c3b6c6a8c1e4a8251c240eaac54f060c92551eadec1d091f2cc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"倆","strokes":10,"corpus":"MM","originalMediansSha256":"8b4f5841f6dea155af1e09db345af050d313b56c8ea1b50a5cc0d724fe2a8d95","pathsSha256":"b5dc951ccf609addfcf2d507e1f1893d3f080e9c10a219ca3930e10e3b8566c4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5006.svg","dictionarySha256":"8518117ef90f52ede06f316462e45d92989a130968a07f67a62a9f471250ec82","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"粱","strokes":13,"corpus":"MM","originalMediansSha256":"72e5188f77ce4dbea3682faf1c46144f950ed221ac990faf6c1313df7a341e03","pathsSha256":"7fa65c2dda10d18ed08741780cb8f4e7199c95b1165518701e1c84baf69c5172","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CB1.svg","dictionarySha256":"a4495ad70d03a373defa92d0394ad6a5a06a07ba47c63c3e671e6de3f5a2c3f6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"侶","strokes":9,"corpus":"MM","originalMediansSha256":"e5d0009862adc5d671fe5eeb7f45deea6c5e8a065bbc042466595125f6770932","pathsSha256":"f36478220019c380b723097fa8a55b7775d8d24e66fddedadd44f08c918d1eee","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4FB6.svg","dictionarySha256":"f86a32354aab41b1a1eb1d702ffe191e87b6613c614a09532fbd1cb480a6a1b8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"戾","strokes":8,"corpus":"MM","originalMediansSha256":"4fdfde826634ab092e72bdad0e5ee2045c0b6c72cff582a4b02f94c774386c0d","pathsSha256":"0b610d82def75ad83312664d64d9f7c232a09a401bcaf5f121ad0039159a24a1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/623E.svg","dictionarySha256":"385c49654410c93de0a4eef40f164ab4a4f2126884e1f2d085b3e73ecad1a283","sourceStrokeIndices":[null,2,3,4,5,6,7,8]},
  {"glyph":"濾","strokes":18,"corpus":"MM","originalMediansSha256":"3296d53ec5f2918b8f1fe0fe73cd263726b4b43c4b845bb69e737b24e5fa3fad","pathsSha256":"f36dd86f6a8172f7e3411b34a75740f5d09a57d9b7984c4974dd43e8fcac63bb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6FFE.svg","dictionarySha256":"8dc6f74e138d0fa32b3100604bb43824f73146f44df72bc116369096e7cf644d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"閭","strokes":15,"corpus":"Ja","originalMediansSha256":"cdef4eb1ab639c6f1a76f04fa9bad8aba3949a2de8ba37f2527d96844f659512","pathsSha256":"d3cc3323e30f012ec122a94a0289d150861d7fd3a737544d275cd6d95160c822","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95AD.svg","dictionarySha256":"c560049da255309ddbaaafc4fde47e99fffb26d8200d46d97d09c8a88be3e788","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"黎","strokes":15,"corpus":"MM","originalMediansSha256":"26399b076cc895d6aa4ed257e9a9d2a3b548c1d31e8ba8d49d6c26186ace5c6f","pathsSha256":"53dc69b20d0ae199a98f56a25468ea570bde046f06477cc0f86f3bc95bf5c391","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9ECE.svg","dictionarySha256":"0be5d69ea34a32b3f4ff34bdf816fd14cf9a0b940716ce6c58e0e4eddf813c24","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"瀝","strokes":19,"corpus":"MM","originalMediansSha256":"8435e2c0b16c1bfd06afd042e8455a71272d91e67d832f89c033dbab1c2ab106","pathsSha256":"0e4179c6919fcff990faefe54ed4be95574cf4522ae01ba61ac93d83fe9f6300","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/701D.svg","dictionarySha256":"6b52dd3ff02236490584ffbe7463373ec0421ad634b37f1b575023b8f51acfdc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"礫","strokes":20,"corpus":"Ja","originalMediansSha256":"48d6f1e5c673fe567746071e52b8ba7b187aa61048feb82dda4fd5dd410237cf","pathsSha256":"a9658c5ced6a21765480421364d1ffd72d7a8913cdc0bfdac3ae0854075c8f56","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/792B.svg","dictionarySha256":"313dd224516b774e9edb0be4c66c809e33784f861ff43134afb4f8f282c23774","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"輦","strokes":15,"corpus":"MM","originalMediansSha256":"fffe07a5ae06e4e49597c2b5653f971acb1c913cac9412e933686704648c386b","pathsSha256":"0ccaf73596ddc610dc02548d0aed9fd90be8329c585dab12e7097b09c16d64b1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8F26.svg","dictionarySha256":"53f48a1236bbc1aa07f7e0425a58ce23761faac292062f5cbbf363c6d9a5e8d6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"斂","strokes":17,"corpus":"MM","originalMediansSha256":"818e506831b85c97f262acbfdeb97e6a26255b5ff3c45969289d06e00b528844","pathsSha256":"57edb973f5f9a2a4d4235a48904a6790f0a00cc9d5d1c4a31e1a92a24f69620d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/6582.svg","dictionarySha256":"26f714f9a2ebce8f221818914bc780a008f9cd03792bebf7dcc62f7e570d0ac8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"殮","strokes":17,"corpus":"MM","originalMediansSha256":"9cb06f809241617b7d272bd2921fb08c3c5e17e8d859e647befdffc514df715f","pathsSha256":"8fa0b5dd9705a457f86c7f4a92d88fd0a38a7d9de3903dd9107f9e49fc1338a2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6BAE.svg","dictionarySha256":"b08194fcdd462166b50c94805acbf2c787d2eea6b77078bdc215f79e1b588a03","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"簾","strokes":19,"corpus":"MM","originalMediansSha256":"06bfc9c707858f2350a7478035e183dfabbb1b90440d221dc87be378b57d24ad","pathsSha256":"70c54b0c821d3eeb2241e4ed4067b86b544f3d8b64eb19c336f59b788daac504","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C3E.svg","dictionarySha256":"581cecfb4c24a0911e6bd659eb5d13fb5bac5f512751340f5c64c12669cd953c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,null,11,12,13,14,15,16,17,18,19]},
  {"glyph":"齡","strokes":20,"corpus":"MM","originalMediansSha256":"35480fa86540a5d1dc36dd559697834c5d626711f7adf0c9671eb3dc37d18bd1","pathsSha256":"30f18b93fc1c3b8f19a4ae1c22408efc066cc6fa59a4648ce5a07f47f8f414c9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9F00/9F61.svg","dictionarySha256":"a04379483090350e04615298ba60cd872f8da510ed5df68092c33491769aabb4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"囹","strokes":8,"corpus":"MM","originalMediansSha256":"9fa52940df0bd5c92b9f100431a1a66fd731d24f5d6123abacdca1ab0574c663","pathsSha256":"f3a970600c31ab8edd77f64b2d9ebcc1d75e7aeeb6392b0748ea91fdb1391ae1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/56F9.svg","dictionarySha256":"cfccf4eadb74a1d46dbf517063632a62f487735c2002469e2655c2182f45fcf9","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"逞","strokes":11,"corpus":"Ja","originalMediansSha256":"540fe5531696c9a302d45fe9aa424ae177143d321719b06c6d106fa63bee5620","pathsSha256":"60c892fbe54326f097e5f34444a41792233f1732fd6a1842ee2bc3c7b70d49f2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/901E.svg","dictionarySha256":"bf39f4c2292b27ac05e6f07ceb25b4debf30fc3a23617f2723d01a8771e7b297","sourceStrokeIndices":[1,2,3,null,6,5,7,8,9,10,11]},
]
export const G1_BATCH5_DICTIONARY_REVIEW_SHA256 = '315a7ae9e46867d4369f06009cdeac93a32e53748f525d6bc3d3f7710d44cfbb'
export const G1_BATCH5_DICTIONARY_DIRECTION_SHA256 = '26f5409480226d8b98202ce149411b43b6417a1ec14476f774414be2c758c66a'
const referencesByGlyph = new Map(G1_BATCH5_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch5DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch5DictionaryMetadata(ref: G1Batch5DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-18',
    geometrySource: G1_BATCH5_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch5-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH5_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH5_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH5_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch5DictionaryBundle = {
  verificationSource: typeof G1_BATCH5_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH5_DICTIONARY_GEOMETRY
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
export function loadG1Batch5DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch5 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH5_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH5_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH5_DICTIONARY_REFERENCES.length) throw Error('G1 batch5 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch5 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH5_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch5DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch5 dictionary entry mismatch')
    return { ...g1Batch5DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH5_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH5_STROKES = loadG1Batch5DictionaryBundle(reviewed)
