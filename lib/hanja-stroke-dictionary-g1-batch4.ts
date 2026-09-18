/** Fifty grade 1 forms (batch 4) individually reviewed, including 7 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch4.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH4_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 4: 50 characters individually checked, 50 approved and 0 held; 7 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH4_DICTIONARY_GEOMETRY = {
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
export type G1Batch4DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH4_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH4_DICTIONARY_REFERENCES: readonly G1Batch4DictionaryReference[] = [
  {"glyph":"亘","strokes":6,"corpus":"MM","originalMediansSha256":"ea2542e46cfca217877cc72b1dcc4faad9f7202e8b231df950d5764277d705b1","pathsSha256":"1bae3efedece8513183499961c18a1ccf474a756b75c10dcf2a70d93617d4ce3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4E98.svg","dictionarySha256":"bcb0b1cf6f265a63ab27a677a6c70a61634c6b5c63dc6e2b950f88871714387a","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"譏","strokes":19,"corpus":"MM","originalMediansSha256":"41e50bc32f7c3c7b6747e4186bdf87c95f9d5707ead0dbaf7df0b9e17478ebea","pathsSha256":"17b079db25c1a61cdd2614b6b7e8440ab1372280b15a1e9218ed6b09f4437515","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8B00/8B4F.svg","dictionarySha256":"c628e101428ad50424278ff2e05f3d062151b8ef0750ccc670d969b42227783e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"肌","strokes":6,"corpus":"MM","originalMediansSha256":"f1eb564f4f47f1c94c496e18f5951cc71f0e7ad4cba6bb457b940c7ac758a003","pathsSha256":"d143ee2a05ae9cdcbf16ca17aa9bb0b8cf89d9f05f727a265ccf8b9c582c5f19","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/808C.svg","dictionarySha256":"2b564664f86c123af7c2ea6d8518c0be25193c3b7a1ae00d24dbfb9e4f4f2fc4","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"綺","strokes":14,"corpus":"MM","originalMediansSha256":"87b77f01e4a9d07d79931580100d164fd4d6c0f7e63010db0947d34b886a4f1a","pathsSha256":"d1f8ed818ce99120acb5c1341db73965dd561016ada36a98f6d964a7bb8b8e7a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DBA.svg","dictionarySha256":"6986f865156fc767c39d1386c85be435b85dc2f958f9f147a3a2cc6209a2844e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"杞","strokes":7,"corpus":"MM","originalMediansSha256":"172f1974b8d5d49f32add93148a329f5f5e38b42b86ba7f67da26990a8a96bc9","pathsSha256":"c3faed877c89441ff442333400dfad6428f311979fe428720ecb1e2017c30ad8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/675E.svg","dictionarySha256":"f1136ac4578a496edb9c174f37e9fecd435d8ffcbc63aee035117d8ab93d1af5","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"朞","strokes":12,"corpus":"Ja","originalMediansSha256":"39c695dc927e9d9f3df68d6afe4aa430614e38f6a85b4c30999d2365daa67e00","pathsSha256":"fd8c1fb93ba9e8acf74e89d0544cfc707b97b05fbcc498d6663dc914d4035398","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/671E.svg","dictionarySha256":"49b8477eaff9cae0df7b6cb6b25e78aca1e73e4579be9b051f743a79c27b7c25","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"崎","strokes":11,"corpus":"MM","originalMediansSha256":"4f3d1c08e922f682f8ca8a5ba8f142a6867ac6f5d28a892883506a41d515d546","pathsSha256":"ff8725983cafc9fd698cad62be93069b290959e8da4159796385d2039d456089","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5D00/5D0E.svg","dictionarySha256":"8e58c0dccd13be5d3f7f532c3041886c9d24f999b0c8feb079db577eb4ed8dda","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"妓","strokes":7,"corpus":"MM","originalMediansSha256":"356c3ba294db09669f18f69e9a61956dc65204c7f2106c9517f89429d1df7165","pathsSha256":"c4bf970b61189d101ec21d0abda3206df59daa4ce1118a8eb43feacbf878ab93","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/5993.svg","dictionarySha256":"ba3f996369d9b00e1722272408bd1f1d25998ccfb85dfa070f2bab66ed23dbeb","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"伎","strokes":6,"corpus":"MM","originalMediansSha256":"5938d89087ac79e684cf98ab67a5c8006efa02a4f9129e1e7f29239abba03997","pathsSha256":"4e015acca9fc59e4a4c020463fa9097e9ea61a59bc173d4f96c78eb8dbd075eb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F0E.svg","dictionarySha256":"fe2847c295c208306ae3a91541b802def1312f00b3f3d900e59a0cb8fa8a3918","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"羈","strokes":24,"corpus":"MM","originalMediansSha256":"b634ed8086a498a2901112de1f7d9ba6be118e4042885cd84aad203d98664b4a","pathsSha256":"4abe2c7780d509d8c919c27e98e73f6ce094511321df8ed08247a5b3a0912b29","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F88.svg","dictionarySha256":"6f11a5abcb87dac4a0aa182baca96111ecc9f7088ffa6f8bcb3289d5ab97002e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15,17,18,19,20,21,22,23,24]},
  {"glyph":"嗜","strokes":13,"corpus":"MM","originalMediansSha256":"0d2232aea7389f817e08b22fe4af35c12c857fe5b9000ac4f1ccfbbec51f6de1","pathsSha256":"d12c8c617c3e6bac03e3f517b347db772d35b29e66a66606443398646ab02760","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/55DC.svg","dictionarySha256":"3699a9f5c1fffc8eaf23825b32e877345ec6d1058afccbb3f4315cd355ad84bc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"畸","strokes":13,"corpus":"MM","originalMediansSha256":"8bc56cd178bce17b13278031674d1be5f99fa1e4669f9d93af3a7fb4ea65393f","pathsSha256":"9d86a19d42004fcc3437663ae539132f8e6f6e62c4b9ca4d9745fd487603bcc2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/7578.svg","dictionarySha256":"b4d8a4f331704cb4c66a446c216461af19b98d33d9cf271b9bc3e5550d2939ff","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"拮","strokes":9,"corpus":"MM","originalMediansSha256":"809d1c79746c7169ed6935e29424e2eafdf89fe5f4a8b9682b9eec6b19769823","pathsSha256":"be6f6e4267932ddbdf6555d18831e9308f049c8bcfa81a5673b6a447b80f46a4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/62EE.svg","dictionarySha256":"a887d8684f0276ce1da7655c0756d4eb923c7650e072e1c4cbabe1fb5ca0c3a4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"喫","strokes":12,"corpus":"Ja","originalMediansSha256":"2584d4d04b80c8ca0cbff36cc54bc4283f66ca68cf7cbdbc8b78ad26639dee8b","pathsSha256":"c40d0ecfa524d7c13e4007cd2d6924f2170b9688f0609d3b8bfee12abd7303a6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/55AB.svg","dictionarySha256":"0c2942aced225b4a29e49ab5ea70fa464c1c030cab94f8a7cf2c3e7fcb2c10e9","sourceStrokeIndices":[1,2,3,4,6,7,5,8,9,10,11,12]},
  {"glyph":"拏","strokes":9,"corpus":"Ja","originalMediansSha256":"32f0c6007d28abceda02ef03d441806697b4bb3aef6f7303eb4a1816d3680b79","pathsSha256":"b52d019f329b73b02251fa1dcad4f8490f97dae7d37d0c28e86b009498fc1df2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/62CF.svg","dictionarySha256":"90e1047a7152bcb9a61770e2b63ed554ec9a165ea77be5ce6c8552348df1d189","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"懦","strokes":17,"corpus":"MM","originalMediansSha256":"49761fd8bb30aba4a1e3c772c09d6150ff7eb319907103367b002a52b9752a48","pathsSha256":"a504e783a3b5b53d33531c9396afc44d2eebfc2b827984f48150e29d5763856f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61E6.svg","dictionarySha256":"45272be67e533ac15113b208447eec96cf8ea0940049459e72655e292495f0ee","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"拿","strokes":10,"corpus":"MM","originalMediansSha256":"85d39220cb21b9bf0e8f065e0f93f9c3b4e8328b0bbe2c6c104e86ff79c2ec98","pathsSha256":"45d02738e5ccd0f28dab1ec01be71af020c4f0e30adadc60403e6103ca0c6014","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/62FF.svg","dictionarySha256":"313f4cfc2fbb8ea8bf69810a9ef50da7058f4cd472458027953876a19e9276ab","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"儺","strokes":21,"corpus":"MM","originalMediansSha256":"f7b1c9d17b59b6156c5e5d98b1905b6bc2989dcff2e12342ce8d07df6a548f75","pathsSha256":"14991c184c821af2a9bd108043e5e5b43936b41b66744f72f6593ad30a6f83c7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/513A.svg","dictionarySha256":"8ee896548730e9be41ceac890c2b9801da02ea27c39820b38c79b598cdeb3d3b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null,17,18,19,20,21]},
  {"glyph":"煖","strokes":13,"corpus":"Ja","originalMediansSha256":"20206360c1a50ab805a7c3978ccd6e6d14062eb4bb832b49007cb17b04324788","pathsSha256":"2ef9bb0f74bb2ac5a9331658e49aa6e7cd4bb61a0295d7eb987e6ad051fcdb9c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/7156.svg","dictionarySha256":"560524e69286878a0a424ecdfdff9215da7455f1b12a23be50abfdbc1226eb2b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"捏","strokes":10,"corpus":"MM","originalMediansSha256":"85b0ed1ce6c6e9a9ecf5e7aa398b83a8f4a790ed71e08095e1fc98e494a24e1b","pathsSha256":"fd3fa830e0e83ca20075c22743002b695376ae288ef2c73fcb689250f30a2868","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/634F.svg","dictionarySha256":"beef18897b1956370ecf7b728fff02c3eb9861ba07cca439256c7f617eb2765a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"捺","strokes":11,"corpus":"MM","originalMediansSha256":"a5b8b256a99a4f286e6dc48f468db30aee3de8a2e9af212a0107195de3a34c00","pathsSha256":"950c59e938b049c6d0ac76590cf5ed9d628865ea86ff5a5a35a4f3609e33f97a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/637A.svg","dictionarySha256":"4d1d8b3ab10aafb779e38d074f29cbadc7036a09c982cbd54bd945075e5bb962","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"衲","strokes":9,"corpus":"MM","originalMediansSha256":"ac37bd482b9104a5bc3760685442b5f60fa2047cfc0e0a4d59175669088ecfd6","pathsSha256":"3797914ef3bb4b0dead0302da49bc7d7afc5c1c8ed0f076b51f604e75a179431","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/8872.svg","dictionarySha256":"50afee17a4cca8b7dcbd0b850e64098107d21d43937ee91457debc5e0cff1cda","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"囊","strokes":22,"corpus":"MM","originalMediansSha256":"4b60caebc0861285d782719114431c6e8b564a755280c91e4509c241cc8ab362","pathsSha256":"a45ae684dff5321a5d8b872d9f8581ee08445d5c0be2e35654dfd3cd1ef60335","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/56CA.svg","dictionarySha256":"04ca75d120a737edf50802914ba90faf884fdb6dacb29a1bcf732f6fc532ed84","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]},
  {"glyph":"撚","strokes":15,"corpus":"Ja","originalMediansSha256":"4178d48b84a8996f16e8a0b45755c976995ffdbaa7a74493e17764b9717d5fab","pathsSha256":"9f84c41d6b77d1d9e4dec4c86912e523a1ac1678fc5ab776cfa5cf8af6820640","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/649A.svg","dictionarySha256":"fba8ed2712834854788616deec104e17ca9fe4049c3739a8c556d6e3db885b9b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"涅","strokes":10,"corpus":"MM","originalMediansSha256":"b6716879c7c515141c1bf35e96c63a03dd5e47cae2e122d7abca5948e1e8aeb1","pathsSha256":"ac70d9481ddf7f33d7394400a66b47799f84e9d5f2e8efb861c29482ecd1969c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D85.svg","dictionarySha256":"06544cc2995911bbab8b80ae72fb02392a8d08442c9fd33da4fdf0e539b83b48","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"弩","strokes":8,"corpus":"MM","originalMediansSha256":"855c202d4419b0214955a5640dec8ff1617f1d2f5a57aba5616d4c3975d2e013","pathsSha256":"53f1eafba8a054b4d1f1c403da3b2e9525aab12faaafbdce3cc1b9580fbf78c4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F29.svg","dictionarySha256":"e997c10115bc368b91558ffa8bbb4dc4b8e88c167fdc0ee6df26075308be7c5f","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"駑","strokes":15,"corpus":"MM","originalMediansSha256":"6a6c4eb0546c4364479847150549a5983f578c3aab69d3c596567304745e0b1b","pathsSha256":"cd64b767c9ea1e8142dccd5a322c6171e67ed915a33dd0d26259f07b537355aa","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/99D1.svg","dictionarySha256":"b3d51746b610dd100f487f65f3acb401030490c93cfe691a9f0b07a0c58be373","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13,14,15]},
  {"glyph":"膿","strokes":17,"corpus":"MM","originalMediansSha256":"771722c5ffb6b7c6a6a9682054fe30aa3ddde5acff96427a6dae8448f2604d7d","pathsSha256":"b6044632798f07d8c7dc69c88b4d0e01f9db6b88122f582e04d55c068460aed8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/81BF.svg","dictionarySha256":"31a016efb74a0cfa5a6a25a236ef81615d65559ba7c4530cd8286cb1996b691c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"撓","strokes":15,"corpus":"MM","originalMediansSha256":"b1b4988ef5c9c13fa71b12cb47a4b7ec4aa68a9f06b46404ccd15874f72311ca","pathsSha256":"034e009b9986a84f0d4d3e40cbf45c4c3ee4b5de2f352f31293dc1598fe8165c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/6493.svg","dictionarySha256":"59efd311f7b57223ab1ad31f43759afcbbbd4e7c3271b0a5ff0ecee01c50f17d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"訥","strokes":11,"corpus":"MM","originalMediansSha256":"e5b8deaccdd60722cf8c82ec0ecc7bd2f59252d8ef62bfada8c5b15a6fdbd453","pathsSha256":"e42159656b1257716f6ef84e00a815e85c90574bed5fc3b2062efb3be3936d2a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A25.svg","dictionarySha256":"fa9d357a8522ee43cea99c112234bf69958c6dc9e2bf85f9086127bcfcd515b7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"紐","strokes":10,"corpus":"MM","originalMediansSha256":"cb3d57488281a137a0fa192a9169698ca4364e29ecba8126ff0e360889cfe697","pathsSha256":"944ee1996844b1cccf08d0087c74f58f0bc6a504fdb31a2958d0420946b13074","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D10.svg","dictionarySha256":"78e1e74c9b1e2c157b35e47b37b887df6fcec6ca3e881f84b54191aca146f83d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"蛋","strokes":11,"corpus":"MM","originalMediansSha256":"c6a7510c30c414012ef04b0c02f348a85729abdee8965549a8710dd41452c872","pathsSha256":"a1302e917976f895525997d8d892bd6c5d5f8cc6d650eb447769b37413f16abe","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/86CB.svg","dictionarySha256":"9d0c58634e3d8017cfd66b3cccb3106d99a90e4e5810d398dda0d92ac01c3d0c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"簞","strokes":18,"corpus":"MM","originalMediansSha256":"3b41952e033ef8e9fe3f8fcf283a5c0549520e738c2efe9d8dd7a33deaa9d614","pathsSha256":"9dbbe0d50232545a89fb6649f53cb1178426f8dede674ebefc3f8c577a5bfd34","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C1E.svg","dictionarySha256":"397f845b3445d7df438089c646e7cf6af2efdeb82014fd9d7e73276beb65f1d3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"緞","strokes":15,"corpus":"MM","originalMediansSha256":"63f294a56199c0199baf888909187709119b96a6e899ec19494d96f7b9f86771","pathsSha256":"505eb519e63be945a001d6e65331f4af098d08c76e52c4c6dc045cda8ab68479","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DDE.svg","dictionarySha256":"be792a9e8ee2cb4290dcc88a17e3804ab603ec32cf76cff8d2a3741795180aac","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"撻","strokes":16,"corpus":"Ja","originalMediansSha256":"e4218e413c7b84cff3c49cffb67d046ee5e2de3af35ab6e07c5277aac8377377","pathsSha256":"8ee04a376b077e85e8ce2a583ef1daacaa57120c48cacf5467267a8a40f0c7e9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64BB.svg","dictionarySha256":"c22db021109b30901d83d8854e966ca0b80f9e281a24ee3105a9ff7c1f93615e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"疸","strokes":10,"corpus":"MM","originalMediansSha256":"f2df5e33fec13fdf70ffde47ab66c33f64c67823f984c103e43914426721b217","pathsSha256":"c19d221d6911d03280dee4fcfd944b80bd480b4727722b2ca0928c3ef3acf579","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/75B8.svg","dictionarySha256":"cd3af98718b64dcb90fcc72a77d05f1e61f01a1c9246b5f298a138696e391dd3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"憺","strokes":16,"corpus":"Ja","originalMediansSha256":"74b31b08d2e2e937794b3c940435e41da4bcd797745f15165048bc673bdaadb7","pathsSha256":"64d3d3bdc61d03f036368347570ea90add3799007535b610d91043e29746a60a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61BA.svg","dictionarySha256":"0d1d5ba630f4308af07ff88d08cad783a900d28008ca81eb054317f4e4e1ad03","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"曇","strokes":16,"corpus":"MM","originalMediansSha256":"e0df028405b8c59648b90bc2657636c224328a1adbe7c7d9867b6709c281e1c3","pathsSha256":"cc322bafeb38ee94e0128a9eed413af526d9aa1cc607d241ba184240bc3dd76e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/66C7.svg","dictionarySha256":"ce9dd905c7ba984f8513225b8bde58b1f11091cc69a444e1d1190bfa6d12492a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"澹","strokes":16,"corpus":"MM","originalMediansSha256":"f8046c9060475130dd193ab84aeede0c46d1f15be182af4c0376be4ecbb406a6","pathsSha256":"e9a906db17db091d0b3819ba64fa069a5ff27c8b21f903cefbb2b8a079c99e6f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6FB9.svg","dictionarySha256":"a8d315b6ed03f4b554abb98337415cbf58715cc259d5cc87da7a076da48907aa","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"痰","strokes":13,"corpus":"MM","originalMediansSha256":"2fc83f4afe091f13ef5a700e142ebf389139dbcc6d356b6a06b813943039429b","pathsSha256":"f5471b68bbfcdc158f606c96d62aed105928e2c144dedeedbf66a5503d96d117","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/75F0.svg","dictionarySha256":"22815e2fed93fd7b7786b60ef151f512f367267af58921f81ec8b4a3e143b933","sourceStrokeIndices":[1,2,3,4,5,null,7,8,9,null,11,12,13]},
  {"glyph":"譚","strokes":19,"corpus":"MM","originalMediansSha256":"b5acf3c8a99009ea0d0f7bb30db11d60baa9f8f3927cc53253020a4da090525f","pathsSha256":"e01b35aad99f047f149e3cc72c049cc1113f459a0d1da84dcc0791cf9d304637","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8B00/8B5A.svg","dictionarySha256":"1791d4d1fa4193ed3f429426b75a5e5351aa64fa8721e931050930b798eb8aca","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"撞","strokes":15,"corpus":"MM","originalMediansSha256":"e2ce22d2aa8f630d4637809ca79587f5aa87b7a119911303717d196b7c05c4f9","pathsSha256":"e7d758ac1ba983634e2c24630e07dddacce75b41517bd152ff434032b02ce0ca","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/649E.svg","dictionarySha256":"dbd847c9c9700d88597054fe5798223f53d9f9c4db0371ae62dc81822379c27e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,14,13,15]},
  {"glyph":"棠","strokes":12,"corpus":"MM","originalMediansSha256":"2a80503fc3fd525acfcc35b291de271948082190a3c7cdc7ee8062998562de42","pathsSha256":"7bf2cf1ca97f3e7d9be496892e18e38d13e7b370f5c64ff7ce862e2d7918e12a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68E0.svg","dictionarySha256":"8154292086fa4c928699bd38518945d8eba40a09894f2cbf6ab7f63c23440e46","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"螳","strokes":17,"corpus":"MM","originalMediansSha256":"7f3fc6dd4abceeb6551c75356457c516d2a8f79f2314e03a37824f4f771c8c2a","pathsSha256":"09418879c08f222a38670cca639c370c0efcc63c008d66ef28ed63a9f34c3084","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/87B3.svg","dictionarySha256":"bcda7574a3219f158c66780b88cc376de12acb0f5f8f423bb4c28dd4795b0482","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"擡","strokes":17,"corpus":"MM","originalMediansSha256":"bc9a72a9df12fe81f9fd6634e58740c2ed1968169a7869e8e30ecd5bea8173e2","pathsSha256":"ab3e7c38945110e6ace39a8dec41a93fe8c21da32e384dbfd8aff35c786e201a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64E1.svg","dictionarySha256":"7ff7a35aa0c36a71d7ce07bd36329b91020b201677e993eea469c3ab819bdec2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"袋","strokes":11,"corpus":"MM","originalMediansSha256":"8e8b66b780894db6e44cf968bd3d2bddc2a3635db5a62349cc40ef147c245e0a","pathsSha256":"425e3ca425b78d37c6d73c20bf0375e8905425135cd273daef32115afcae8b12","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/888B.svg","dictionarySha256":"e7161061823c980a800d843f69aef895fea9d628593f81c3f26a03b09cb8bb77","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"搗","strokes":13,"corpus":"MM","originalMediansSha256":"2a977e98ea73de999f1e7cb0f918615b9aad32eac655253ec6db7d9b79c15f93","pathsSha256":"7fba0d1743aa3cfb1d7c21c52aafac92857f8fd83ae6454bf325e92d099cbea0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/6417.svg","dictionarySha256":"1272a7587fd8c8e15ddf726a9dcd94d004f25504b6143b969682e6e351aa93c9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"鍍","strokes":17,"corpus":"Ja","originalMediansSha256":"2696bb203ea0d96aee7f82d724ce6267c29bcaf4d85443704631062e26aedfa2","pathsSha256":"9e524b4b7f9ecce4e571ca4a21b8a49c5c4def37265d6695472842f9f9833ddb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/934D.svg","dictionarySha256":"b348bd2bc2931d81c566b03390b19690a5fd351331b85b075e718917af97b15d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"蹈","strokes":17,"corpus":"MM","originalMediansSha256":"75c388b104dc3722c2a4c33973443173c1220313042bf3962d8b7e221a2b90e8","pathsSha256":"3ca4d7615814b5f634be9f7fc69da165fe18f0312586fce69abe27fa8746a5f1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E48.svg","dictionarySha256":"dc6d9be7458dd4e69b7957b92b689c6389c45153023691f5db3955378dcc4e00","sourceStrokeIndices":[1,2,3,4,5,6,7,8,null,10,null,12,13,14,15,16,17]},
  {"glyph":"賭","strokes":16,"corpus":"Ja","originalMediansSha256":"1118a20577b55d7a7af1359779152e64d5dd60e975e49a32412502ce482f3911","pathsSha256":"f4f59e65d1d7c611aaba78c846f89d669cc1a0c35eb3b12416d4b1a32967a42e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8CED.svg","dictionarySha256":"6f0c6fd853d7d8800fc96b3bceed545fdb684b4e8869066ee66907e6e5dd8194","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
]
export const G1_BATCH4_DICTIONARY_REVIEW_SHA256 = 'b260cfe230699dd74b99e1e0ff9582c019bc12ce779a9410749a70f17d4468ee'
export const G1_BATCH4_DICTIONARY_DIRECTION_SHA256 = '6ef8243978988e0d0036b537acbd352db92dab62b148a5a068e85ce66424eff0'
const referencesByGlyph = new Map(G1_BATCH4_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch4DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch4DictionaryMetadata(ref: G1Batch4DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-18',
    geometrySource: G1_BATCH4_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch4-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH4_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH4_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH4_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch4DictionaryBundle = {
  verificationSource: typeof G1_BATCH4_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH4_DICTIONARY_GEOMETRY
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
export function loadG1Batch4DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch4 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH4_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH4_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH4_DICTIONARY_REFERENCES.length) throw Error('G1 batch4 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch4 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH4_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch4DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch4 dictionary entry mismatch')
    return { ...g1Batch4DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH4_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH4_STROKES = loadG1Batch4DictionaryBundle(reviewed)
