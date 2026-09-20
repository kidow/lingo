/** Fifty special grade forms (batch 12) individually reviewed: seven reordered and nine locally corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch12.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH12_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 12: 50 characters individually checked, 50 approved and 0 held; 11 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH12_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch12DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH12_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH12_DICTIONARY_REFERENCES: readonly SpecialBatch12DictionaryReference[] = [
  {"glyph":"惙","strokes":11,"corpus":"MM","originalMediansSha256":"f95fe8c78fd3135b11bbcc12efc31efcc2bacdb5c7844e628e203db3ae2c0b48","pathsSha256":"b5feb90c310341a9bd0599eb5a24f27b5889daa2b4a1ef767a8d363f0095dd25","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60D9.svg","dictionarySha256":"5b7881a8d58b01d684feccbe687e7a468a746ab19ea6a5816920c7f09b29ce12","sourceStrokeIndices":[1,2,3,4,5,8,9,6,7,10,11]},
  {"glyph":"啜","strokes":11,"corpus":"Ja","originalMediansSha256":"7db5cb7f4cc72a408fcf319e2fdda7b32e4034e7c906b067b2a7880d039de36a","pathsSha256":"30f987ab119b220214c4ff5fb40e18c1a20ff14503127aa8fe7815567a5f8327","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/555C.svg","dictionarySha256":"ffc81edebeb508b17ee7b161b343a32391dddc575b8b465697e3b22cca812fbe","sourceStrokeIndices":[1,2,3,4,5,8,9,6,7,10,11]},
  {"glyph":"掇","strokes":11,"corpus":"MM","originalMediansSha256":"cf900229bdd9005a12863b03ca37eb2f77153351efa401251eb53de6b7a21f6d","pathsSha256":"c46d1655365cfc67fe54daed6d68a6cc16038608591c65578b71a796f2d2407e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/6387.svg","dictionarySha256":"20e02be8fdb73bc457b28a62fe9d9e2e5805c802f6cc95a78b9b452b8f89afbe","sourceStrokeIndices":[1,2,3,4,5,8,9,6,7,10,11]},
  {"glyph":"覘","strokes":12,"corpus":"Ja","originalMediansSha256":"80cd824d307d14df3f85007b79a88daaee59dafd65f50b6ab9269b4ee4406a16","pathsSha256":"8f8a539b9e5844fe29241a279d48329cf261895b9ce20546f3ca4bc4327810d5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/8998.svg","dictionarySha256":"e5942b5331a31d03a9f74b05afd3e5637251440444061855f470faa93a4fcac2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"忝","strokes":8,"corpus":"Ja","originalMediansSha256":"d8a12ac576b34d3c97358f3c385ff561dda7fd1112d02738c9f87b9c0ab854e1","pathsSha256":"9ffbb1d45793b83a10dff106836f7f48b98e0c31b058163efd57a7e29ca73bc1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FDD.svg","dictionarySha256":"bcae1ae4b0e0a6f5bae6550f9a78c0f98e68f4cb3670623b15b73a6a9082590f","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"疐","strokes":14,"corpus":"MM","originalMediansSha256":"d2fefb5aa2ed63a016a7b7d588bf87d049d9ec05432e92f6d338c6408ae7413d","pathsSha256":"a64d1d02ed96721b72f7b8fc88fd6cb4eb7659c00c472553bf3942ccbc6c1ad3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/7590.svg","dictionarySha256":"7406cc07c691e0235109903eaf27c7851651c3d896499eb43f882cda879fcfbb","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"彘","strokes":12,"corpus":"MM","originalMediansSha256":"1c0ed13800e43d243bd14033ce98a5511f91b926bb494b74fb7fbb0bfa98dd8c","pathsSha256":"0b5a9424321fde5a2297d534182b5006690ce605417dbe42b7343492f1b4d528","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F58.svg","dictionarySha256":"340fc38d9b4d7591c1e31ed384a97c210cc3a024cc700e3c9a4fdb05094b2e07","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"棣","strokes":12,"corpus":"Ja","originalMediansSha256":"d454760e3463bcdeef5caa49090809a88bc6c49df2bddd0e3794806a42eb845b","pathsSha256":"59d412fd760e2d16077ac16dc0af4702070c6a0c4388b9ae15fe5558c61e0b32","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68E3.svg","dictionarySha256":"bd2a38184d831ab819f6caecbe5ef7541a497fb2c151241487fc5407267a3386","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"嚔","strokes":18,"corpus":"Ja","originalMediansSha256":"d7469a302f607bc9c46b3f4457186a70a6dad2fbd6be802b6a574164b18b4fe4","pathsSha256":"bf3a6074fd195a404a5d3a235c04a3dc4df4c9488c16a1afb6ac8d7e19a61eb1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/5694.svg","dictionarySha256":"3599fe2f9011751a5800cc02502550837ec4166c3432d50f72a9755c9ceeb87f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,11,10,12,13,14,15,16,17,18]},
  {"glyph":"掣","strokes":12,"corpus":"Ja","originalMediansSha256":"a90ddfc60b5a456edde63f6a3d92d586c085349e8cf0f2e67bd88fe4d0e7b425","pathsSha256":"8cf31745102cebabc576f0a6f21fd4a2908df5736db58078e6790098a7464fea","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/63A3.svg","dictionarySha256":"861e92519158d1ad4d0156c21099d7112451730257529bf663e578ea30418644","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"誚","strokes":14,"corpus":"Ja","originalMediansSha256":"be14d46846c2ca381fd145a6765499d392c71bac4f6e0ea90ec80d641bfa1d84","pathsSha256":"de0ec97774a5c2ac7a660b2d1a8ef38ee471c2627e4ce070ae0e0aa0b51056fc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A9A.svg","dictionarySha256":"c8398cd44398e12262af07c75aa980adcfbab444c09e99ee7d87b9a6d6c24c94","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"勦","strokes":13,"corpus":"Ja","originalMediansSha256":"927c9f09c3ebe7eb7e34c9b47c2db5f78bf6d8160a7c1aa323626370bd593635","pathsSha256":"aad02a86a8430191147cacb5d75a34afad0e612a918a98c797dc4fea7a8c6038","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/52E6.svg","dictionarySha256":"806d24d859856a5f80ac647a0b14b126508e07d9cb39c71a9fec27984e848538","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"悄","strokes":10,"corpus":"Ja","originalMediansSha256":"f2c6ea3df149be1a8450963a704a5614e8fb33974d273693d93ac36fd8d6cbbb","pathsSha256":"f9ffc7ab1fc01a2056d86de40dfc45871b934b1ccae5d3afb110fdbc14a6e471","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6084.svg","dictionarySha256":"887c97962b1cedf9ac5067c0a4ed7fd89954fb604b2c4b3784adbe878736dc2c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"譙","strokes":19,"corpus":"MM","originalMediansSha256":"16837632203a59f36ce18aa6d68cb70a218f0c2223002996c697855b15212e3d","pathsSha256":"35d5c5e21631cc8c6583be9be592025a1a109bba0d12c664ca54c0860d4f331d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8B00/8B59.svg","dictionarySha256":"453de9ba2daa271cfd39582175d70c7383fb1a5e1aa74defaade44e7a0ff1bda","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,null,11,12,13,14,15,16,17,18,19]},
  {"glyph":"蠋","strokes":19,"corpus":"Hans","originalMediansSha256":"8679486d82eab2a6ff478f693fde1fb72fbe662a70c3df0d0129191bfc7041ac","pathsSha256":"5a14b562e40333a8cae2fbe0491e3acaf60e3e96940ccd8cb891a1ffe4f37145","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/880B.svg","dictionarySha256":"436241ff3213e58f466bbc3234bb98231264aa698ceaf35270395672bcc533d0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"躅","strokes":20,"corpus":"Ja","originalMediansSha256":"d84039e1c59b31987d9c4290597b72fbffd25dbf5dc116985ff77f84fd5c6429","pathsSha256":"8ae5922584a6d49b77113d6e0555c7742681d1eef69d283a3b68306ae9414ad0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E85.svg","dictionarySha256":"769a91b598cfe8ffcffdaf6e2fe3627945390f39860212a6aff2afc01afc365d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"冢","strokes":10,"corpus":"MM","originalMediansSha256":"ffc10c6e16ec93ae753c43f678062043960c2ccf24309901566c8c3f65688c4a","pathsSha256":"a5f960b77359bbdda05e998e325274ddbbcb9235bfb9157a84725183b35ca20d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/51A2.svg","dictionarySha256":"e8b665b3540278da65eb38c7ae64bf1b4359934e040a8997e7c7eed26c161f50","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"摧","strokes":14,"corpus":"MM","originalMediansSha256":"61405b4f34e324d72294b2469d0512e28e0700da2ed233aad890f8a99028ab03","pathsSha256":"a0dad5858c76b40a3dcb8122604529dacf48965315ef8c42c4c97191e457ab5f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/6467.svg","dictionarySha256":"58993101f6027ff67e17c28cbf7fd1ca154cc3d738cc882d5f421ffaf931fa8a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,null,10,11,12,13,14]},
  {"glyph":"嘬","strokes":15,"corpus":"MM","originalMediansSha256":"f0b4faf77e3c18fbbe1c69aa4d08e777299d959708db1c914f6e3aac53f125b5","pathsSha256":"14aafb9ecc66b4a9c7c37e7219ae3088ef452e1bc2a981dde27b0a066c9f7b8e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/562C.svg","dictionarySha256":"b84210358524ff6dc99867c4358965f03adcc9f75c0fdb1c53b055e6b6670a89","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,11,12,13,10,14,15]},
  {"glyph":"瘳","strokes":16,"corpus":"MM","originalMediansSha256":"9f46836e7eec0890cf02b193c0c2d5aba38ca064affe807c3b4dd5db5b5b0885","pathsSha256":"cf96ad3dc64b94f1b553c8053a3820f7d6f120eca1073cef9277e7b6c7ea19b7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7633.svg","dictionarySha256":"7251b738498bfbf70edbfd66401258e18c735c478bba2355c59f774346440098","sourceStrokeIndices":[null,2,3,4,5,6,null,null,9,null,null,12,13,14,15,16]},
  {"glyph":"鶖","strokes":20,"corpus":"MM","originalMediansSha256":"e2acc91ee2fd1f7f15eadf9a7f0d6a17993983312a2446e9de456a984e8ea627","pathsSha256":"8d8c8bcab449c5b39cef8492c5a55c740bf7f507be61887214ba22b0267b61da","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9D96.svg","dictionarySha256":"e7e8ea57751ea33b8727538c0048cdc1bd80569828109d9030f4f0923313a97d","sourceStrokeIndices":[1,2,3,4,5,null,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"甃","strokes":14,"corpus":"Ja","originalMediansSha256":"d4a3e632a19b9836efceb95330d63dcfb3af6841082c3d4f1c546c282e8a2129","pathsSha256":"26b17b38bf11385d16391d83032877eea3923151eb640c5908c6af0d19656b77","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/7503.svg","dictionarySha256":"75294aec2f94a79788f1761a84298e15ff353dc50c5714cc224eba2f45eaa32d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"騅","strokes":18,"corpus":"MM","originalMediansSha256":"551a88bdccebf46bdf673fe3c0ece7eb8f491d5fdf0f4db3b32d456f05a83bdc","pathsSha256":"758a399c798d4551324926dc5281db5c3554c9dbbbfdd51d2eb8b1a382592acd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9A00/9A05.svg","dictionarySha256":"713795b54c5f7c89b1b2b7a8493a2593c82e824a2b29496d55826ae8f4e1c4fe","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,11,12,null,14,15,16,17,18]},
  {"glyph":"蝤","strokes":15,"corpus":"Ja","originalMediansSha256":"91f57e97b848aab4292bcdb2cb2055d923fc468dc2195d9888af608ea1ee34c9","pathsSha256":"97e622aaaa1bbf42b47802e9cb0537f20d6d6f846aa2696620c3af9ece4a68c7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/8764.svg","dictionarySha256":"f9b1eaccf0b73977d44403ef81e8d04f91b1cb8622223f626c97bb9a08534597","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"蹜","strokes":18,"corpus":"Hans","originalMediansSha256":"eaa4ab6820f3cb4ea448cd1533d05038224e9e05ad88c4228d2eb616d732f124","pathsSha256":"cf4952baa219a9ef667636b22ba2045ab4ca90058a1d0e10e7d7d1266f826416","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E5C.svg","dictionarySha256":"d0be1f84ade9755cd88401eb292fe782b4b26bb2a7a9f80592b39abf3bc03d48","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"妯","strokes":8,"corpus":"MM","originalMediansSha256":"1794fee0a9f5885652f99722914cf8c64f8466e8aab98d291425f4740b601af6","pathsSha256":"0797d069e50c530753c9149dd324d533c639453809d526bedd477d77a1897565","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/59AF.svg","dictionarySha256":"11a5add2555acee9dfa300a4603ee586f074d7ab3ff691e993318b72ba240a42","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"怵","strokes":8,"corpus":"MM","originalMediansSha256":"f6cbc7b443c1ae2b34fe201a51e2c04203bc3dd47044bc8e39ea7a31a0b80a39","pathsSha256":"147f82d2f8e31b93de5935aa5eaf37945f043b2e82c751152f108e7bb1cded57","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6035.svg","dictionarySha256":"ee93c21d8fa802efeadb3a417ab5a24fdf1a4ee85b944fe13fb5ae112338b76c","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"忡","strokes":7,"corpus":"MM","originalMediansSha256":"ab92f1757001297e33080035ec79b1338c5ebe0ef9b18864c744d7017316bca1","pathsSha256":"67d67202fd74b8681291188e419d1640cf1113819360dc4721596e008287ea06","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FE1.svg","dictionarySha256":"61d7daa2acda2ea403ba590b9b64133702c6591e173473a0007bacc4c88eaad6","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"虫","strokes":6,"corpus":"Ja","originalMediansSha256":"677c90421ac6055975b1ebd1f9f59125314bbb9a520e0a97acb503d20bde8840","pathsSha256":"a2f593f93c6581de38882b8b93d5d93426c8e514910130f3c14b4471b35a448b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/866B.svg","dictionarySha256":"33125873cb2396bd152e786dc8a9494a309d255e4a219d5955f86992a6248a52","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"揣","strokes":12,"corpus":"Ja","originalMediansSha256":"2cd7e6582085a437b17191ea5a5cc5de40e76b5b7d75d57c9a5bed72d127e0e2","pathsSha256":"eaaf823054041ec28d856af1d90eeb4b0128848d4d0909b6024e3a07186aa23f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/63E3.svg","dictionarySha256":"42d3843a0b3499cfe380bef929dc3b116062e34470f18b2fe047a1f53abe34c2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"惴","strokes":12,"corpus":"Ja","originalMediansSha256":"59bda8befda419160c9dd54e473184d68ea444e0e62e91eabd3bf5138833b417","pathsSha256":"97f8d6bd9a70c03e5f1e670482fce6fc86f55cfc4a528004eaec9c50c4214518","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60F4.svg","dictionarySha256":"c02d77762ad90c7cd7c9842b0f2a354d558575a101de909818c476af2660873f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"瘁","strokes":13,"corpus":"Ja","originalMediansSha256":"6990c4ff5c5cebe4449c5165cd93563feb831bc972a3224be21ff4e5e76db42e","pathsSha256":"ebd16e0fd5eecba053796700bb42a44891d5a08eb86788d4d4b8b6c8377d02f3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7601.svg","dictionarySha256":"50c1bc7c5cbfa5634de31713f995ab4150d16494530a46512323f8d551989156","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"毳","strokes":12,"corpus":"Ja","originalMediansSha256":"8f99b319a2d6035316656b5e32441b6713a191be5d494d3212e2852f244034a1","pathsSha256":"068923c824a1186e216cb6e058feb4f8457a85ee1d444b0d6a2c4383fc359c65","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6BF3.svg","dictionarySha256":"da73ede08cac7b1a7cb8a01b27d31f2b44d6c6be5e8046c954a026ca7412b8b3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"昃","strokes":8,"corpus":"Ja","originalMediansSha256":"87f03887053fd4867a095f3808544c3e660b71c0eeafa11ea9dfe3c481f76d37","pathsSha256":"8a204816f04a1197a34caae0f6659cbda263da7fc8738f47c03ca05ca1494124","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6603.svg","dictionarySha256":"7776ff456aff479c2496f6b5ba230f329d2c9a92a39a720eab1b5c60dab322e5","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"廁","strokes":12,"corpus":"Ja","originalMediansSha256":"38a92efd1aec01add0cdc2fe8adf9a4047c776396125e8e0c0472d6e4ca8b066","pathsSha256":"1e73e29b2fb01d19b10ea47c9357d4bef8bd93686a64ae2bdcff5f7fdd05441f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5EC1.svg","dictionarySha256":"c9f10bdfadd1505eb024c5c949e528015d33bc7809bd4d573bda0174aabedd44","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"褫","strokes":15,"corpus":"Hans","originalMediansSha256":"4d652feed899ba5f1effa8d640d0b0b72ee15543e293dc2eb88e339de55144da","pathsSha256":"d8dff3f50d916401ae10196e76363b34fbea3e7ba74295480865546e0d7817d5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/892B.svg","dictionarySha256":"e702ac596744e0c7c5f35951aff0e1233927b8e767a5f9bc91877f20fd50aba5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"庤","strokes":9,"corpus":"Hans","originalMediansSha256":"223f17f254a2eba0112c1576c9f21c59a01b99b9e544f421bfe0db29ea0feb53","pathsSha256":"46f1942ebf8d8614d556fbea6596fe79c4e5cfd1ca2df4d0ee1fc4c2973c2a3a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5EA4.svg","dictionarySha256":"737a9eff4628efd9f425aaeadea8d0d84face27e665a979a75e8ecdccd979134","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"鴟","strokes":16,"corpus":"MM","originalMediansSha256":"f82f0c8c18da5707559f83dd5ca6a87907b1652c85e22423c8a99c0a583fe9a1","pathsSha256":"f8fd913b02567cf07b9bb873e76e4a727d862c9760f469e29add38e4e4ab0ab9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9D1F.svg","dictionarySha256":"90a0ad8b95816a5464fc926f09cb3c0545d0aa53af497571ff6f4d5f325d940d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"哆","strokes":9,"corpus":"MM","originalMediansSha256":"0c4183b8b0056570b9d3c47ac41268e28dd6a866f788c8813e90d64e51274b7d","pathsSha256":"48438d4b0f4d16de5b3857afaa16feb222e418d92844b75bebc123cf1d0a1109","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/54C6.svg","dictionarySha256":"52345176ecd7e192c7629214848f6ecab8463262fc08bc3eac06580b8cb4ad98","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"忱","strokes":7,"corpus":"Ja","originalMediansSha256":"cc1eb5480e70c2797ca5d46e07a7345b45b814158a18a6678feca2505102ffa4","pathsSha256":"fae2214036e563e4ec45dbcf211661ca2ef4cd7517a29ef7a8b8e869b58454ab","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FF1.svg","dictionarySha256":"cb2c7dc9669a7a45a64f0fbee7e657020ee4d2605e197e06637745ab184ccd5e","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"夬","strokes":4,"corpus":"Ja","originalMediansSha256":"00a67baeb5e4e895a633d1e21725ad063a8ffe5dc08d681d7041b7cb1ea15e22","pathsSha256":"5dee6b739449828c47661d0c7a5f6eef380350295bbd33d9f99e961a1362ce28","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/592C.svg","dictionarySha256":"5baca249e47b7236668af00fa7de7fde96aaaa43d8cd49e0f94543431d7024cc","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"噲","strokes":16,"corpus":"MM","originalMediansSha256":"67269b7f7441b1c481bc1d3603b2de6d1f5686d5042c4592b4fc96f6c7f0112e","pathsSha256":"c4a91e4ad534c2721d781340ae591942c3d65c2278d8944be342419f7e5f481c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/5672.svg","dictionarySha256":"2a3a0e18c5065242a771b25f4f4a8134600a268313cde96b79d76d81f78767b5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"佗","strokes":7,"corpus":"Ja","originalMediansSha256":"8a7bb7b843003af23de656180d4095be817bd9c9cee4e7fc1437d2e2f9f1c4c7","pathsSha256":"135fed4f9b20dba28c39efbfde7b1b99db642ff5b6b5f062ff7bfe3dc013b8cc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F57.svg","dictionarySha256":"2960cc551c117a677c42f59a3e1b7cc7ab967ad55ac7ce91a6496d664013ae95","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"沱","strokes":8,"corpus":"Ja","originalMediansSha256":"e81cd2afbe6ec7b6f85c711c4e862ac18fc07670948ebdfb221dade504b94d0f","pathsSha256":"5f8fd9a42e2dfa783d4c192879b3c509271d10365216f9fd2c3620a89e69709d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6CB1.svg","dictionarySha256":"d4368ad7101ce9f0e58a14cacaabfd1da74f23c931f5c84b679f55ed21168ad7","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"鼉","strokes":25,"corpus":"MM","originalMediansSha256":"30fa6e5538db6a3db1534bc02d8ac3b6b4739a1708bd069058e965ec09f36925","pathsSha256":"48cf0ce503df41c41eb463ca6f6e205f326c0691aaa8a65750d92472b5c46786","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9F00/9F09.svg","dictionarySha256":"8229366b466de814812ec2f39dff5c8c9ff67efc3b715080182e9dab3caf0bce","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]},
  {"glyph":"它","strokes":5,"corpus":"Ja","originalMediansSha256":"d6872f13bfd4c72fcbb59d927c0476157b0467ef42abc7259e9a4bea41ef24c4","pathsSha256":"e7bf307a51034b4f841c6069d96f055a3a694a48e01cf38c0365d0b900c7680c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B83.svg","dictionarySha256":"dff7eb971c6709be7b6ed006b436f1ffdbcd2d14a03a836672342340e2112b8f","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"橐","strokes":16,"corpus":"MM","originalMediansSha256":"f55cd6ba54099fe78e69fe3e39f060fe3c156beb43f3f48f4746e4b5c2741e59","pathsSha256":"289c52dc8898228419504318febb1070309250cf7cc0b182b5ef5e8a3c570638","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6A50.svg","dictionarySha256":"87ac561af7c297e51186f051879dd71ed32a58382646af025965741b318508e4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"嘽","strokes":15,"corpus":"MM","originalMediansSha256":"cfa5941262787049e446ad522f70e05cf3d0f53a5d683931e2fb8ef084ebdeec","pathsSha256":"60dd8ee02d4cc704ecf4aefd5484ad325b0273755621c4dd08e1df524a4f0b59","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/563D.svg","dictionarySha256":"6f503e926b4da7d9115bdee16061abf58b9d047c2fc0668c795aa96fe2393758","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"殫","strokes":16,"corpus":"Ja","originalMediansSha256":"cc75d6a9e8e3751f3e8ead62b00c8f8d5f5566c7329e96c69681e3258b14425d","pathsSha256":"efe327c1beffe07d348b97bed62d528b4c0abb0d0d6b953700aee0fd94f07a20","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6BAB.svg","dictionarySha256":"0128345fbd9e35048cbc8697a45f53107301816ee74948a5cd0d1689c79bf59a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"疃","strokes":17,"corpus":"MM","originalMediansSha256":"07f50055c1701a41d57c2fed947c10b4e8a6724105b3a0616a3d0ca0eae346fe","pathsSha256":"7c9386adc049ca50ce77c1a28e7a48841fb5789a115adf88a3b7bfdbd5935e29","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/7583.svg","dictionarySha256":"69486a0b0895b1ca583947050a9211cc1c64d3bcdefc79b01176bcf604df2d0d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15,17]},
]
export const SPECIAL_BATCH12_DICTIONARY_REVIEW_SHA256 = 'ad217fd7cb05f3e4cf14f1bb8bf33cd60510da2d3ccf243f0452ca82ff48bb76'
export const SPECIAL_BATCH12_DICTIONARY_DIRECTION_SHA256 = '5b56f8c99da87e661c5cc2188a40a1b2aa4df8f0f68d829a015aed4f4ab97050'
const referencesByGlyph = new Map(SPECIAL_BATCH12_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch12DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch12DictionaryMetadata(ref: SpecialBatch12DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH12_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch12-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH12_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH12_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH12_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch12DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH12_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH12_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch12DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch12 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH12_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH12_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH12_DICTIONARY_REFERENCES.length) throw Error('Special batch12 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch12 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH12_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch12DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch12 dictionary entry mismatch')
    return { ...specialBatch12DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH12_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH12_STROKES = loadSpecialBatch12DictionaryBundle(reviewed)
