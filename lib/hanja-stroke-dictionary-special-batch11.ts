/** Fifty special grade forms (batch 11) individually reviewed: eight reordered and five locally corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch11.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH11_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 11: 50 characters individually checked, 50 approved and 0 held; 12 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH11_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch11DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH11_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH11_DICTIONARY_REFERENCES: readonly SpecialBatch11DictionaryReference[] = [
  {"glyph":"蜩","strokes":14,"corpus":"MM","originalMediansSha256":"816cf230d77e1a3557bd9557520a6435926a1a5a6cd0dc25306350a724852b46","pathsSha256":"defe65642407556e1ef85ba7364751c6b08e86ea50912d2aab390445b7680f20","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/8729.svg","dictionarySha256":"01cd93cb740907fe57cf5089c964ccd9d5161580a56e851d63ff0001c090843c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"竈","strokes":21,"corpus":"Ja","originalMediansSha256":"d3d6e521fb0c21e75dbc9fdc47eb300e526d874aee5e5bf51cc8460c82043bf7","pathsSha256":"f89ce9f573d3cbab83e7a6625fd2421515b727153b08e6d3cfde80d9ade1c375","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7AC8.svg","dictionarySha256":"fa8b6ff53aba59c57271c451b2f44c5a442d38e47b37b3f94dc4b57cb1889ed9","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"懆","strokes":16,"corpus":"Ja","originalMediansSha256":"1e108a218837fcb616de2c90c24803e046e5f6bd9650156f70d55aa5431b5f0e","pathsSha256":"8e83148c933bd4e2fa4e02c5b4c7bea92f38b797b2973554131a1378e7017168","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61C6.svg","dictionarySha256":"b9e529a9a5f9b3805a21fd900659b440c6d6001c3d6ee73327ca071599240cc0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"徂","strokes":8,"corpus":"Ja","originalMediansSha256":"a6d7d38ecdcf5e49f45c00771916ead4888ef612847d4ac651394aacc50cf17e","pathsSha256":"a83c0de73039ea4eb4247fe85b8cd79da852b28ff101a9111536d8fdeef6af62","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F82.svg","dictionarySha256":"02d3daa88c6c1768270dbc72bcffce45cddc602ce731fc0aa168660d956e5fe3","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"螽","strokes":17,"corpus":"Ja","originalMediansSha256":"96c1effff1af00146e01e67ee84e13f8b5ed8c6ccc13bf92e9d066f21c4496ae","pathsSha256":"e720feeb88f5e1e831bb72035997aee80cdbe8ae808885d0e3c63bdf73fbcebe","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/87BD.svg","dictionarySha256":"8ef61ff3a68f8608add46d9dfcddbb5e11a6dde9a20a7e439272b322c2410b04","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"蹤","strokes":18,"corpus":"Ja","originalMediansSha256":"77d85bc12d7444f4de37689d33b00a3b27fa4a1080c93209526140c93311b298","pathsSha256":"911fc4669497015d0811caf40c48761ca32342ae619a87ea136daedffe050d41","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E64.svg","dictionarySha256":"4f715aa4451cfdab6e77ff236aabb5f008aab54201a6dc286c72819d1b9f7e83","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"樅","strokes":15,"corpus":"Ja","originalMediansSha256":"68627109b22da44732b64327f19a400dbe566529da088490e877feb3eaa042ed","pathsSha256":"3773d38aba48c308608761c3d710f14f4a372800a1444f3db4363394bc7814e8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6A05.svg","dictionarySha256":"6ae8bea2b733c425a510d6aaaae6608d1cb88f00110689c9bfb2147c08efd431","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"椶","strokes":13,"corpus":"Ja","originalMediansSha256":"63d788e3524f7903a5e0ca58c01dd385c63d17397c0cf8a20925501d06facb64","pathsSha256":"74cd47f03d4f3976008c260c5970dc961a13221167db8439e0c0d1d8d766fd7a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/6936.svg","dictionarySha256":"daf4fa331d6ca2ebc2f50f9e7206c08c101991261b3bbb38b4053478541c4f16","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"脞","strokes":11,"corpus":"MM","originalMediansSha256":"f19e8a18b83deef2012f3973c74f0dccf79ececc1f4567dfbcca98d36ea03be0","pathsSha256":"4bc46f06a745aa807de2308cef176103dd29ba3e11328a452b7ee9c0ff8ba942","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/811E.svg","dictionarySha256":"42425f396c20bb2a696ae1cb424b28bc9dd965ba067a88348a77903a8d701cac","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"幬","strokes":17,"corpus":"MM","originalMediansSha256":"ccc4d182f7537b8a9a74fb5637ae1afc8093864b4f23a1f458f1db17d2f3595c","pathsSha256":"effd15c31e16c4dc4c33e9ad58d249de4c39fe739cb5ab1f6b353584cfae96f7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5E6C.svg","dictionarySha256":"468248449850baab5b70e160a3188df82730b2c40ac37ecd7b39dd19507ab135","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"遒","strokes":13,"corpus":"Ja","originalMediansSha256":"852c5cc9fb6649be06b7cea3b433c0e650ed5c3187e17b1db9a1b4466a9857bd","pathsSha256":"439f77d49aac5a95750e31134b9621711c1529c1c76db784ea67b527e2e6801c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9052.svg","dictionarySha256":"0bd1f220f18a7a76dcc61ff1647da6240b79772a0530b39713d2d8b45731777a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"躕","strokes":22,"corpus":"MM","originalMediansSha256":"49714b45be30ddc8e276684bc2ac44e976d037672d122d2e12ced27342c173bd","pathsSha256":"437383cdb5f41f2015dfbc0addd94a1b3851c733c7fb023a3321df91cf8a1b56","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E95.svg","dictionarySha256":"7e9b893ad7cc85f393e266359e21796a3cf7ac3ba218790f7d14730b0ae6d6bd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]},
  {"glyph":"鬻","strokes":22,"corpus":"MM","originalMediansSha256":"d127281252ed3009db5e9717a8105b7eb169d4f62230115973d7c693caf18e7e","pathsSha256":"96c6c5bfb29146e28695cf7b68a2e917072f48e5e0ba8732b7d87f62c54c41ff","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9B3B.svg","dictionarySha256":"a893e6d354eb8b4a6ee068d1d68ea50b189fe9ec69d6f8b0ce4b6b4b556a1172","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,null,null,21,22]},
  {"glyph":"噂","strokes":15,"corpus":"Ja","originalMediansSha256":"2e6a7bc7a2b94d45fd121311f9b0edd5b334b404f3d07e640a7b03dfa901676e","pathsSha256":"6796ff9736d8ef47815596123348e04b6b96a9829b525009d3dfc4b439d9ac73","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/5642.svg","dictionarySha256":"f61c5801fd6752c361447c0cd72dd966551836d1d3758f093f8f14677023ccfe","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"蹲","strokes":19,"corpus":"Ja","originalMediansSha256":"c93a1bdc2f4d0e00b47fd3e55805375c0b19ed72d366d3fd808bac6d854885c3","pathsSha256":"19adde883ce9be0ae5a16181ac42209ddf507bec72fedc7fa02ccfbe78105c75","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E72.svg","dictionarySha256":"7b10f4ce1c49ceea277793bc20d194f2dca1d6e23a95f7ee55f443ab8d724ec1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"隼","strokes":10,"corpus":"Hans","originalMediansSha256":"68c4114d72bf1358d4c96547a84cc417ae62734e57969e7e240993f7dc2c1da7","pathsSha256":"ceeb84e347c27bfbf94a3785d2772058b2a357e01eb0d28d15c42002ffd1e8f7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96BC.svg","dictionarySha256":"ef817518c7e63954f5fbc9a06433c79dfeebe46ca0a8b99853f66d4736627bd0","sourceStrokeIndices":[1,2,null,4,5,6,7,8,9,10]},
  {"glyph":"鱒","strokes":23,"corpus":"Ja","originalMediansSha256":"09bcd4707d12e6dea665a17029b432cb25e05a67965424147629f767b184dd33","pathsSha256":"5a275705da0b61f605e87e5580d44e248b4ed6531f410d6c09ef7161249f1789","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9C00/9C52.svg","dictionarySha256":"40b932f5db1ca2d03996363a154c60dac7dd1576999bddf2877dc7e954b2ab1f","sourceStrokeIndices":[1,2,3,4,6,5,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},
  {"glyph":"崒","strokes":11,"corpus":"MM","originalMediansSha256":"a9f877c067a0f10871c1d0c51b42d3941d02cd095f38e734fa183b07b8973a07","pathsSha256":"cd43fa2994bb7d60ef6e04ac86058e9c663de6b877ac44ac8896a7fcc330a01e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5D00/5D12.svg","dictionarySha256":"08dbcae186b7e11d8144a27c9a69e03cc4ca0966996fdacc2ac769cedd2be13c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"戢","strokes":13,"corpus":"Ja","originalMediansSha256":"c6dc9ff178a251cecef7d70a165296640774d7465f030fe422ffbcce20927c91","pathsSha256":"dc9bbb160d385b43e5c30960048aef5965c8fca0936af08912ef24f9f9c53dfb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/6222.svg","dictionarySha256":"2c31cd946756417e9befdb52559d10c06d0f08689407351da606d32228b9cd83","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"篪","strokes":16,"corpus":"MM","originalMediansSha256":"c31551690a3c2f7fe494767b5e18f386f1aef9789bf0666087a498383edf0b8a","pathsSha256":"00e1ebd76a2d0c5036ee15311b6eddd6f23a3099b37aabed4cfcab969c6bf54b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7BEA.svg","dictionarySha256":"92da8a65b3e387999670025d509231135c0460ac6e33ad2faa0caefacabaeba7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"踟","strokes":15,"corpus":"Ja","originalMediansSha256":"df23d934274b1448a857dfdf5c9b2a7840aba2cccfaf70a959d8e150ad5fad36","pathsSha256":"6142bb4541966e34d594f676c0075c079c06f907fcbb40dc49269ca19792d867","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E1F.svg","dictionarySha256":"e35079f792cb0c53bf007a3b28e5ffcb669400b3a813e907b8e15dd9fd9ef05a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"輊","strokes":13,"corpus":"Ja","originalMediansSha256":"84ed884f63785de1a403bc70bb3f186bf9fa3aa2b9c7af39dbb890f8605abb7e","pathsSha256":"a9e47c1a8e88f7ec809b7ad4688c008dbc4d4f27e7fe5f4d74eb75294ba0d1dd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8F0A.svg","dictionarySha256":"407188782acf9a474d7b6557517049a2107e308f406992dbb42799993d556d63","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"坻","strokes":8,"corpus":"MM","originalMediansSha256":"6f26633984a72c59452f9d16680d0673cb2ca2b35c8fe4d936c9d01a8096ce19","pathsSha256":"7df5fd915ce70820391c303456ae868cac7a7a76466e1aac328af0f30a9c1abd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/577B.svg","dictionarySha256":"9cc9a6112cdd2133a99c0fa08201da596f99f852e7528fda0303675f24040ea7","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"鬒","strokes":20,"corpus":"MM","originalMediansSha256":"d5fef8abefb3ae1b1039b8851354871d13f469d936a36e58e23b85ca51c77ed6","pathsSha256":"dc97eeb0da31cb0f392aa5357caec2015a9af367d160d72b080ad5845f497a88","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9B12.svg","dictionarySha256":"c8341be6793ea8e4bc60466d100ee3a15a4469bfb73a1faf4aa0ca92e14289bc","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,12,11,13,14,15,16,17,18,19,20]},
  {"glyph":"螓","strokes":16,"corpus":"MM","originalMediansSha256":"3975e024461f0dca10e0a4ded577f63e76608febf39c75e27dddbf93cb831f56","pathsSha256":"a59dd8f77338af9d8548a9740ea3aee4b62bda66c7e52ebdec01b147e45244dd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/8793.svg","dictionarySha256":"eb4a2075d0d8261e5e11c4e4121f0bc986e83dd0c7549efaae6687d684001ac1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"瑱","strokes":14,"corpus":"MM","originalMediansSha256":"fad6420cdadbc1a576d91a27c698fd380d37e6787a3efdd0a2cd57af3e372686","pathsSha256":"f302b6e063ff25e623ccd0fd6ab9540b733bc9252ba7cf419463cb4641d58aeb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7471.svg","dictionarySha256":"cab1783666180ad0321d9f6137b24fd9527d36ad66cf4889ac8897bc43c2daf2","sourceStrokeIndices":[1,2,3,4,6,5,7,8,9,10,11,12,13,14]},
  {"glyph":"垤","strokes":9,"corpus":"Ja","originalMediansSha256":"6b65af2364cb201e501889232edf096c966c9620fbd7d4946d46cf6b788a5519","pathsSha256":"53393e9b900e9c9b0e1f7b15f760597d19e5818319dd7d7528950aa55bc3c725","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/57A4.svg","dictionarySha256":"eb9aab152b22b346e8533bd6f6629f8890d490a88a6416e214e14bf6f440d732","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"耋","strokes":12,"corpus":"Ja","originalMediansSha256":"7e16ca06feea3e791b6d987ab422b1d290da12755d7fb3b0218d88ef20fc4d32","pathsSha256":"ffa0cf5e50fe320475515d04750d7e8ccdd03f4dc882b8a379a8d5b6e2d07289","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/800B.svg","dictionarySha256":"2836f7eb8ae5b0d3c416d965fbe6669e3c301ff55ee3129a554ee3f3bf7f780e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"瓞","strokes":10,"corpus":"MM","originalMediansSha256":"5c33864b356c301d7aeafd7c7c9bd3613fc9ed8496a5728ca8ea01faa1eaa956","pathsSha256":"f33deeb1fa2da92c1e6bf393e6606aa52b28bdd49a3353f1cbb0e33c7f27bbd7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/74DE.svg","dictionarySha256":"e225507c274098f91fd2e58653d0abe2f57fc561b4585bac891c400254f3b92c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"瑳","strokes":14,"corpus":"Ja","originalMediansSha256":"1b4afa2fdb6533557939f3d758c223a8fad0bbf085bb2b5c827daa559bee1304","pathsSha256":"11e71208afa3c7c8db5fed57415e2599eaeb5259f1373f593383de1dd7f84bb0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7473.svg","dictionarySha256":"d8deced3321c99bc2757b93c0106146e959583f30cbdd8edd441cb99cd50c63f","sourceStrokeIndices":[1,3,2,4,5,6,7,9,8,10,11,12,13,14]},
  {"glyph":"泚","strokes":9,"corpus":"Hans","originalMediansSha256":"916557880c1d36b83d7245dfcb477d932d4d2bca019dd953b2614de5183a9ec8","pathsSha256":"89b26a0bfc05a311df933dc22ac7a6447c85fcd2c598e11fd2fc2ebbae5e625b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6CDA.svg","dictionarySha256":"a2d95627e66f9dd3c3bef6bfdda4192a76c59310bc9a8aa3a9a784afc85f88e4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"佽","strokes":8,"corpus":"MM","originalMediansSha256":"d44f83899d8c25cc97e073cacaa0c9e1eb0394aeaf02038a4a56a32011f9ce2c","pathsSha256":"7dfbfb31257ea03df62acfcab0f9b01e5f0ac7e211e23a2e199ea2a497ae5fa5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F7D.svg","dictionarySha256":"0270916cd4c7064d771ef5de27e8548530120ea30ba8e42d191c6cbd5ebac4d3","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"斲","strokes":14,"corpus":"MM","originalMediansSha256":"81baf4f7ce88cbc5e0d3bd179cf6928b297f0d6a9b87b29a9315363843f5485f","pathsSha256":"25e68d9e067b782fe5d204d6b132a57d5ec43ee3620d6299ba2cc846cab2d254","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65B2.svg","dictionarySha256":"ccf679ac8c1c421ea6727541d3a91645fff229ccff2717c96242331fe2daa7b3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"扎","strokes":4,"corpus":"Ja","originalMediansSha256":"7a55199562613525b6e815dc0b690221a250763978dace031f5837fa860d6a54","pathsSha256":"b5337caff6c2e91647460b8bd61d526364655cc9583d2efc07eaf26078b441c3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/624E.svg","dictionarySha256":"e582db4f60312e291154690ec085e34d84f4e66881459f86c2823d57eaaaba66","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"譖","strokes":19,"corpus":"Ja","originalMediansSha256":"48840e8cf7c3630718c4ed721ccdaa0dc02640e211a25e0f7b77c556dda9761b","pathsSha256":"046302c53e04bd38d1d6b23b5443a705e48f6296d9d68c2484737e86723ed9c8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8B00/8B56.svg","dictionarySha256":"4398fd7ed75db070d9d8db6f4532173aef9b3c65c1afc2f7aecae6df0bd969dd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"毚","strokes":17,"corpus":"Ja","originalMediansSha256":"98ab3f6406055aa0ca0cbe46ba9f2e6167dd15a9740d47454fcf819989de430e","pathsSha256":"c8d684f647f610088a662501073d106fd73b9b713cbe856255c235457a180431","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6BDA.svg","dictionarySha256":"2fc274e3a5a30f9c1cb8bf4a31970dcb1dd745474175ffe3176ba248287119a6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"搶","strokes":13,"corpus":"MM","originalMediansSha256":"8d4415120bf093ce377e8f396d0e4ab4382dfe4ab27bca68f9896f1b8b70580f","pathsSha256":"3aa19fbe3a7e44384fb872ef36f9c4eb75f136d73b705799b253da7c35ca2938","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/6436.svg","dictionarySha256":"2c6638a9945fb968fc38b05cc2169bc521cb5a02b2158baed4acb5efa83ff2fd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"蹌","strokes":17,"corpus":"Ja","originalMediansSha256":"d675b50273a1b2609ef85b9b7c98c9c32dfc95be214e77b72bf9609a0b0610d9","pathsSha256":"3b9bc66ea92e77b7b4bed94b18b355f6e28ff9ac5e5e3c6f5cacdbbceb153e51","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E4C.svg","dictionarySha256":"06006345343454fc9a4759546556aa64980d113721e505af325b5aa081ea2cf9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"窗","strokes":12,"corpus":"Ja","originalMediansSha256":"b64b3436d5d98b975c1b17231ceb5bcc90e89d719f2d8a9113f30b86ad20a95a","pathsSha256":"1276d0cd8e9a88b267760c803e2dcfe4d8304e7c13ae73614bb65d75b57845b6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A97.svg","dictionarySha256":"688cb38cfa5833f26d28ee1038ece412aed5996f30ac54d75c3550d0d8a73546","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"鶬","strokes":21,"corpus":"MM","originalMediansSha256":"e91ca12f4834a710f72e2682de876a2c88ff548605411329f2616301bd0f34c4","pathsSha256":"701888a27adb3d54a2b87c24c213c09acc5d75b353599d883d8fd6e5ece559ff","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9DAC.svg","dictionarySha256":"d4f7cc97fc252db97de99ac1db4850bfd08793bec27f6210385ad85079cf8708","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"悵","strokes":11,"corpus":"Ja","originalMediansSha256":"d975ad7f26b1fe0efa761dc1a23fe145e66b1a45c5fc19458291aa01ea8aa7a4","pathsSha256":"9f7c1e8c91a8f6445387dbd35c41121824278d1994bf8955d4adc35b85173c0f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60B5.svg","dictionarySha256":"0ba7fd9afa7a93fc86b7809a6e081be14219bcf61947e810f9219c4bdeae5f73","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"鬯","strokes":10,"corpus":"Ja","originalMediansSha256":"e9a30c634cc6c38d3bdf5f786902f320b11c9304194094a6b43ee5a2fcdf9157","pathsSha256":"326d168451fe600a19ef84ce6aed72a730bc18db85a4102942359ad76e10ac59","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9B2F.svg","dictionarySha256":"d58f89149ee618ab9a4594d54459b6cf8e906e9e43cccb1523bbffff771fc2c0","sourceStrokeIndices":[1,2,3,6,4,5,7,8,9,10]},
  {"glyph":"瘵","strokes":16,"corpus":"MM","originalMediansSha256":"51de1b86b347ffc419265e73b5ef215fabf08986613a001554b5d1091fd31246","pathsSha256":"f546b0f1b1ad74da1c0c631e090760c96fb58cdca84ea135219edcf4e6f64d2f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7635.svg","dictionarySha256":"611171a99f03e28f48ad3a33fbe1d8303f8364e84ec654a266e9de5be7308193","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"簀","strokes":17,"corpus":"Ja","originalMediansSha256":"6a1717ae9431feea8a61b56115ae14c0454d8ca0d057cea0ab8144c7cb45fd15","pathsSha256":"460dca93735e8105870f955cf5d54658a5f40ed1d2ab07d854b6ebde572fc2d2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C00.svg","dictionarySha256":"2867a5c3c0725645526cb1c659c8b3782c92eee4f924faadb5a3eb526a468557","sourceStrokeIndices":[1,2,3,4,5,6,7,9,8,10,11,12,13,14,15,16,17]},
  {"glyph":"蹢","strokes":18,"corpus":"Hans","originalMediansSha256":"3ae12996b44925b8f40641dcee16d59a7ef4dbe7c90e56b5113957a190e95fb3","pathsSha256":"ed624f30dd74c8d5901a78ecea10d87863f2efa57e0d4978b77e239fbae7bbf7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E62.svg","dictionarySha256":"cac7f3f95509d30242d6371621f65ed2071112bfa1ea3722655ceb374b583faf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"惕","strokes":11,"corpus":"MM","originalMediansSha256":"e96dc3d2bbe9a4b5bedd785966158bfe818f51b69ef8eeaa9d388ae001b0cc5b","pathsSha256":"dde83ee703daac71c416d0e39dde25592fafe8df9a758d097282697a99e35a12","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60D5.svg","dictionarySha256":"c949d3454bd0e3140dc71461485bccc31308d6f767518b3435c880be79d9b188","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"蹐","strokes":17,"corpus":"Ja","originalMediansSha256":"c4c0ce7c36fed5885542510310bdbcc5e2e15d1868b0a3857beaf93f62db769d","pathsSha256":"b527656c6e737162a595a77720d214d382de0640f2677a8e4c0fdd1c110a63d1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E50.svg","dictionarySha256":"b2f2838d32b98b5cef61e98272acbf228ba007bf258040a9e69a689031d846bd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"慼","strokes":15,"corpus":"MM","originalMediansSha256":"81bb066019a24d2f53b1dd2aef2003d539b872fd244610c98951b92f8ebc61f0","pathsSha256":"871fcabc84bb2057ed0fbd2cac3c74e2c7a27a02bcbc4be1274440755bc83c0e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/617C.svg","dictionarySha256":"4cb8a0152429cea7595cdee1deb2f44866810ee6bb38774ded43ef057879c3d7","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"跖","strokes":12,"corpus":"Ja","originalMediansSha256":"da4308546ff6906cd5210d5c3cbca93dbe5108874e4a4e0899cc78565e2b70e6","pathsSha256":"af8abb8a2736b6e59521751a9b70a28cd2e6362f0718dcc804870d975549fbfc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8DD6.svg","dictionarySha256":"9d9432b2df0ca88f229a25f5d6a202d19d5e1d38cc7d73f7ff8703699a0b6c60","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"倩","strokes":10,"corpus":"Ja","originalMediansSha256":"e7d34472d21214528a1277361a8a3c6a4ff11607d35d0d853df54161b044d009","pathsSha256":"26b7432f4353774926bc0c5dd2500fc549726cbcbcd79f10ca6e92563a33cd7a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5029.svg","dictionarySha256":"1423da064c2cd20d26c62d98811ce3db3f69e62edb9d3848c8473f930f5d3703","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10]},
]
export const SPECIAL_BATCH11_DICTIONARY_REVIEW_SHA256 = 'f33c920b0c89b1f2457e191ef19b8f3794df769a035df29daba9492eba3d8c6d'
export const SPECIAL_BATCH11_DICTIONARY_DIRECTION_SHA256 = '197d6ac4f456c6bd9364a5d855f732aeea57863965f3c87de39b37cb6974000c'
const referencesByGlyph = new Map(SPECIAL_BATCH11_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch11DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch11DictionaryMetadata(ref: SpecialBatch11DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH11_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch11-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH11_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH11_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH11_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch11DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH11_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH11_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch11DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch11 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH11_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH11_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH11_DICTIONARY_REFERENCES.length) throw Error('Special batch11 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch11 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH11_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch11DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch11 dictionary entry mismatch')
    return { ...specialBatch11DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH11_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES = loadSpecialBatch11DictionaryBundle(reviewed)
