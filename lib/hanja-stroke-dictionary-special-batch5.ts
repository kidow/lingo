/** Fifty special grade forms (batch 5) individually reviewed: five reordered and two locally corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch5.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH5_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 5: 50 characters individually checked, 50 approved and 0 held; 7 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH5_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch5DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH5_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH5_DICTIONARY_REFERENCES: readonly SpecialBatch5DictionaryReference[] = [
  {"glyph":"耄","strokes":10,"corpus":"Ja","originalMediansSha256":"df27edcbcaac552b2713752f3570f27985369c5a2ac6d5c2d451e7366d5a13ee","pathsSha256":"eba78f416b32f243e673f2adb3016bcbac4177f00de5d8cc465e88f87fae49af","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/8004.svg","dictionarySha256":"5eddfe2c8f4dd7760632f602b1ca97c311c67b8ed1e7fc4fb6992ee3d325b599","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"髦","strokes":14,"corpus":"Hans","originalMediansSha256":"6f86449019425ef2dd7ee0afa045f74d07972e536b26b18c0cde6fc7ef53b9d9","pathsSha256":"d5838a9deee4d3acd1b65489101ee867c8bbf6eb8b73c29a32d53dc25db45ca1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9A00/9AE6.svg","dictionarySha256":"4ff7659ec160a5a1e678d8ab383759dd90c8eccc94be09bc0130ae828c7de6eb","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"蟊","strokes":17,"corpus":"MM","originalMediansSha256":"4aad3b96cbe02b146b8842fd4ec6d7faaf733c573b083374fd50147ff165e89d","pathsSha256":"ad9a1f11bc8862cb11015e035aa62cded11330fa74155cc4df4c8ef82887cbe3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/87CA.svg","dictionarySha256":"6c57bc3abf6dff62f23b6286fca074404475aa5743a9b89ea57590f2980e47c1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"霂","strokes":15,"corpus":"MM","originalMediansSha256":"bd67ddbf5d7c589c1df166821fb0758549baccba4827e1b4b0f4faf419993a8a","pathsSha256":"811c1438995b35a7078be16edbb2f3ea9115c94be0354696982fc566b91c3bab","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/9702.svg","dictionarySha256":"b732338e88334b0cfdd463d1f99797e899a6a3a6557f1e2a21f83523ab644684","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"濛","strokes":17,"corpus":"MM","originalMediansSha256":"ed7327a4bcd10d20281ae11c78fd139415fe025c58e3de32d932565f71cc8d39","pathsSha256":"cd5272bf244b13bbe68acdd9bdce35babda3385eb5e87fb932a69ca5c72b2bb2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6FDB.svg","dictionarySha256":"a355c7e31ffa89c8b358df7abd06949b904f26dc98f73665d7eab4b29eb3bf88","sourceStrokeIndices":[1,2,3,5,4,7,6,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"矇","strokes":19,"corpus":"MM","originalMediansSha256":"23206fe74e95539e1897f06f75ea92fc88da7a929b487b5faf5c6f1f5e492bab","pathsSha256":"5efb63fb36ddcf3ef3d4a7340330d856c5b6700e09ba54fc0b23fad129d9037e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/77C7.svg","dictionarySha256":"2ea77a62dd6d96fecf5fe1c27764fc597851e2d7916b35b530f3bbc6ecabfb8c","sourceStrokeIndices":[1,2,3,4,5,7,6,9,8,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"眇","strokes":9,"corpus":"Ja","originalMediansSha256":"ba09ada3fccd79b8eec90b3841b6357a89525c47d0acf8a3ddc9c5f5dcc66513","pathsSha256":"1f9c1c221df97a993aa37901b88269d9099fcb2e5532c3925b42702f1bcdbb07","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/7707.svg","dictionarySha256":"e4f1eb43617e85b5d74b98474ce121420705ca8e7600c36baa640f12b78bc813","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"貓","strokes":16,"corpus":"Hant","originalMediansSha256":"2c9a56c29fe5d7c07a79647847796564199c5302db524bfada8f384a0180d989","pathsSha256":"ef4a8e25cbe4e5af769a76aa26fe73a0344e8cca4ff9094f578516ecd4ce6f7f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C93.svg","dictionarySha256":"d628ecc7437eb6d3d120d72c46c29de95e286a6f0ffb2d6c082f146a21e744ee","sourceStrokeIndices":[1,2,3,4,5,6,7,9,8,10,11,12,13,14,15,16]},
  {"glyph":"廡","strokes":15,"corpus":"Ja","originalMediansSha256":"29fc5e0201727ceb120065feef1bd454403cfced52f3a13abf71b365bbec470c","pathsSha256":"c4a82d005031662d8df31b381f091ce0892cc3eaaa5ebb87be80d0b2626c8f7b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5EE1.svg","dictionarySha256":"21828373b13c1923d87cba6105c710370b640b0ceff0de45db4c5acc2eea5e94","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"捫","strokes":11,"corpus":"Ja","originalMediansSha256":"7b627ed843944d3308d539fb3584a04d17eb0648c6b75d24565c9a72d421c80e","pathsSha256":"4d2219032b666acf3c19ce9deb148b06da1049d834b1c8ef3d6525d6dcc2e1bc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/636B.svg","dictionarySha256":"474303d345d8ca96458d95968a86926c4a3795728413d12be68835917e2cd6fb","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"炆","strokes":8,"corpus":"MM","originalMediansSha256":"7592dbdb9d99f031275629326faed4022ab71342310601218ff1ab999d5005e2","pathsSha256":"94e9590130b6df05405d29e9b93f50b60df81c61311aa8ade7840f8d29300793","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7086.svg","dictionarySha256":"16fe537cdbc6f96658293b0ef4baf64bc3bb861d98e8bd7eb7a3b16914a8f1ca","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"麋","strokes":17,"corpus":"Ja","originalMediansSha256":"1479a1224fcc3fca86a6eb9376997d10132cdf627ea4d997287e1fa37448a503","pathsSha256":"0e1b50446d09b0767fd450443482c81346a6d3c945ec3cc00db959d00c6ceaa6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9E8B.svg","dictionarySha256":"266aecf5c6807163032c093121bddd6e113c074692a7d36bb2032594b2cdaa43","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"弭","strokes":9,"corpus":"Ja","originalMediansSha256":"ecda242e34dec7f959c94fe881b0bb6a285a39726a4ee5a18bcb8ef8f635fb2e","pathsSha256":"14bed9d10730bf5cb43963b3238ee337a5c9a7085ef10b94c109e66f1197edbf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F2D.svg","dictionarySha256":"da0d73555904f7a5dcbd320be9693a3a67e89b4b5ddbfa87ee529191bbed4e61","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"敉","strokes":10,"corpus":"MM","originalMediansSha256":"b70908a03211e27d8cd673836df6c1e528f4d22ce6397a8a44db40719e52ce4f","pathsSha256":"2bf84c499bc0f5255fd47a2c2f2e3134afe3a63cee55c886cf8a412b188194c4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/6549.svg","dictionarySha256":"62db4541de6975bbc08a66a4c6bcea5b368ef46b471143b0e568ea6ea4c81dda","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"糜","strokes":17,"corpus":"Ja","originalMediansSha256":"c0cae7b1ea5330ce316c53065fe56510d2c8556068f1bfb4416df6213a37bf08","pathsSha256":"82add69fe9ad38e1f8840f4e49aa17b9093fdd7ed65ee76c689ce1b57684e09b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CDC.svg","dictionarySha256":"be1cbb92df83a39d72002281de8f92571c54fde56e5b0fcac5cbf5ba82d3fd13","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"瀰","strokes":20,"corpus":"Ja","originalMediansSha256":"fb423b44543a60b8e06fb02972bbb8273cf9908c5e4169dd4444a85a38764aaf","pathsSha256":"1ab7d620bb895c41401ab182a48a9cd9de65a3046ba597f63e85db0708a3b3ea","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7030.svg","dictionarySha256":"d8e0153bf069f1f2783138164c48029fd06228f6a17e7edc28811da4c24e6380","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"敃","strokes":9,"corpus":"Ja","originalMediansSha256":"c059a72889aca7e2336103853eb14d4ebabe704967e1e720da81beaf10406cf5","pathsSha256":"8b5fb33491be5069739b06ec7efc8b5f9117d0869431c557bc41db21a7657b13","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/6543.svg","dictionarySha256":"5cfd188d392b24b6b18b10cd0d4fb281b5ae53b31a5c0a16b3c4db5939da776c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"忞","strokes":8,"corpus":"MM","originalMediansSha256":"46daa0c256e3ac18e1779346032d8236ea55485b897f341851978117ff548fe1","pathsSha256":"40271f61379039bf80bad00573be0ce884d24b149ad301a46bb62b0e69935aaa","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FDE.svg","dictionarySha256":"69101d98761e791915b790a18287300f403b7bd37a642c89d506e9938da7784a","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"暋","strokes":13,"corpus":"MM","originalMediansSha256":"2e277ff09167eb2ca292c3f43b58f4065bfdb67ed950f8e41f364dc8284c9af4","pathsSha256":"5bfeb2d3373fe10ced4eaaa2784c8c2f808f9098daff7a50ec3f1d9cce19d11b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/668B.svg","dictionarySha256":"351b03ebb04e6e1e4559fdd0d10dc16ba9fc898107c7aa08efcba0ff79a3a90e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"黽","strokes":13,"corpus":"Ja","originalMediansSha256":"70717ce954b56f2b713568188f95b324e485e280223b2dd0b52a85952f9d0b88","pathsSha256":"6346275b99c74565b036383da9511bd599408f3e5146b4176cdc6e7704c91f5a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9EFD.svg","dictionarySha256":"209c6513555ba089efb3cf79d341dab0db89938bda532ac357e2ac909b502032","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"亳","strokes":10,"corpus":"Ja","originalMediansSha256":"e5b21ab46082e5cc35b2c2e9123a8aae5bf2bbfdd7fbd667b911f26746a23bae","pathsSha256":"67811b245301835a2787fc3e35ac49b2432e9410c84fdf9a10cb7665e4df94cd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4EB3.svg","dictionarySha256":"ed841b5032a84fc314db4615b810c0cdb4e7f5862abe0370c33d325a040e4932","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"鎛","strokes":18,"corpus":"MM","originalMediansSha256":"bd1f4bef8b8d9d9df0b0c4acd13a67061374c00e9ae7cc040ca360efeb1d4bbc","pathsSha256":"8db627e99084dc6e08ead4cec4a099b7f5e3e68dea83d1fb462479a865e21a47","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/939B.svg","dictionarySha256":"2f8f95bfadeb84cc26d5f15f6030ac03a66c9a0dfa4ac9a1681caf6b4d4229b4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"胖","strokes":9,"corpus":"Ja","originalMediansSha256":"b0ffcc95f278668e46b0d3e982d637ee5351e6e7a053e0ca990ef5a018bddb70","pathsSha256":"07febe78a7983be685458db756f5f652355df415612e20b651506a20eb202649","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/80D6.svg","dictionarySha256":"0e177d11eec73e6922cd2249e4ee78535502f8450c28e46e257bd0d4bceaf8ea","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"浡","strokes":10,"corpus":"Hans","originalMediansSha256":"48ba44aad8f854f3b9eb043d42fa13c18d92cde561b8879b0ddf1fa3b332035c","pathsSha256":"f17cbc5db848a01d60d71dfed2b93da252768818d6843168460e1dce915d90a5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D61.svg","dictionarySha256":"e43d44c6de0cc442053c17f76609d0bcd6287b40e4d52930fdd914014e46ac06","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"厖","strokes":9,"corpus":"Ja","originalMediansSha256":"d8f5f1c3319e4c16fe3406bcc0ef44dc85db15d863877008fcad5db80bc53488","pathsSha256":"01cf0a4c6792874c20df83b85a6af8c3f30c43606ad525d183e3111d3405ff79","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/5396.svg","dictionarySha256":"9322d0df7a966a14b496c39bf4d739edecae36f70e3e7e066b24736eadb2fc83","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"幫","strokes":17,"corpus":"Hant","originalMediansSha256":"c95527e3990b3f7a9b50ac5b2cea2ec0af7b66a433872f809d3640368def6902","pathsSha256":"2110336878f075f4445b708b41b1df4e23a4c126ab5e175e824e6b014d3650d0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5E6B.svg","dictionarySha256":"4e2c7abd6efac9f62b2c777b32847251c6b8568ad9ba04ae2f2a41d4787386f2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"翻","strokes":18,"corpus":"MM","originalMediansSha256":"c34c3c9175bb53a8a4f8a202c0662d272837994a19d320ec903653065b5710f7","pathsSha256":"1ebfce8f240ba9a77f6acbc14d575d9e963e2737a3338677d69a1963f8e3eddf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7FFB.svg","dictionarySha256":"6dd2cd0504d2ad850262c99bb602b4bedc5b39ed13984e92c9d3b6c6d776196e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,null,null,16,null,null]},
  {"glyph":"袢","strokes":10,"corpus":"Ja","originalMediansSha256":"5cd92498fbb39fa45024e3ebf46a27bfc14658f1f2ff5608776379069355f39c","pathsSha256":"9e94069f54c04efb63e9bef3cb0ecdc76fe867ccb55bbf4816cc6dade5ac3774","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/88A2.svg","dictionarySha256":"24c858d11a2612f47cea3a0cb6cdbc578b9446af3f054a3109057f0135bb3937","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"墦","strokes":15,"corpus":"Hans","originalMediansSha256":"cbacc792a1aa99e6dd414b9f3e043c6509d0358b36938a8d51bb6cbcb2c88e40","pathsSha256":"d9b5504f34b8f3d52d1d100c67e08679dbc53b4ef8f69c7fc880902a59fbc77d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/58A6.svg","dictionarySha256":"2515f9e4b68c4cd0f4f9e4bcb28b62e2b52ba70a1d620c49b492c48d4ff32e63","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"辟","strokes":13,"corpus":"Ja","originalMediansSha256":"1b20c2e0529058ea76898b1d4a3ecb71c34e9da6f6967757de425615b80d8db8","pathsSha256":"e10640f8a8ee776540c1bf459cceef4daf221803c48b3a35b017b4b3dd7bdea1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8F9F.svg","dictionarySha256":"10df722643a2152ed7ddca0270d1478e91b2dd25f445bf41b346a8a69184ff61","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"甓","strokes":18,"corpus":"Ja","originalMediansSha256":"75e3828cd9c8959ad1ff4eee39c1181f33f0ba208ec0a9f030202cc3091023ef","pathsSha256":"9fe613797c9bcd2244239266ecbdf02c7eff41d1b9734ba0ab30ff92e9218853","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/7513.svg","dictionarySha256":"c3fa881eb5ed80c4a6e211304c3e07ab93014daf019ff4b242369a9ea51a52b5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"釆","strokes":7,"corpus":"Ja","originalMediansSha256":"a1afbf0f0c83d9dccef0e7d619b364de65b2b5c3b0398835b7e32308fbb5d08e","pathsSha256":"84702e6e900444338b48dd4823d673deeffc73571cb1f087d53c9c3ba5ad1fcf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/91C6.svg","dictionarySha256":"6c0fd88cb8a0759578ae9b1ca5d001614dc0953dcace2ef358e3fc8714a736d4","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"鴇","strokes":15,"corpus":"Ja","originalMediansSha256":"a1873a6d1ad7592a24e605f0c1cc95c26d3bb065118012753bd812e6c756cfe3","pathsSha256":"243f8c02160fa7ba41e46b1a4bffeeaa902888b538b968f703d913545d91f7a5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9D07.svg","dictionarySha256":"4b5a956b3b8bbe6e9eb0c88b98253c87ad938226c2c6993b110359ef5d7c0e16","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"黼","strokes":19,"corpus":"Ja","originalMediansSha256":"a861afafbe2a60c8204990c1e102539a6f0952014864d5ccfe1e31784269d49f","pathsSha256":"3d3cd26061a4a5be6c6a9176247faf7e3b795c689a74207b118c09684ed9a1de","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9EFC.svg","dictionarySha256":"5948f2681d90de1dbadb908e706b39433b5cacca255e15daef08a13b824fb384","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"濮","strokes":17,"corpus":"Ja","originalMediansSha256":"98daf9adc26e7b92b497f04027c4995e9a881c1335ffbf84f15fd520821d1fae","pathsSha256":"ca8ebe8300f174dc9b219e9efa468333e9d00eb195de11f9a60f57798913944f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6FEE.svg","dictionarySha256":"2e77a4d314fdd9125eaaff4db3ff4a57c3f924b8df0d458912d4b04d2a4bca3b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"扑","strokes":5,"corpus":"MM","originalMediansSha256":"c5fbc7e4947ced1b98ff4b863dd277f9689c8f154c544c9d34f50231e70aa3db","pathsSha256":"698ec9e91bb03794c80550d643adfc728cafd108cede21b46b077fc0a20f430d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/6251.svg","dictionarySha256":"a996f45124d94cc2fd551e8ea36c8a20dda53ff43208a06559c9170da9721825","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"丰","strokes":4,"corpus":"Ja","originalMediansSha256":"85878c6f834184055b9d56958451a1c4f124c946831c9f5629e25460615eb552","pathsSha256":"412a6a567b6cde10d732b3a3198294f6a3e6846fdfbd95c670166454d11cac63","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4E30.svg","dictionarySha256":"4d75d8c5dc16f6fca381917f74e599c6576aaa426a0ba1465c72519f8b173dee","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"唪","strokes":11,"corpus":"MM","originalMediansSha256":"a8d8013fb1bdcf33cc3c3e69f1f1c7156e23029d4983543e5be536f0cad7268e","pathsSha256":"716da7da3709edc1fed1fd02a6bc29d75389bbe1c68737f4101d618dc669a929","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/552A.svg","dictionarySha256":"9a51e040f206a67e5328947f394231e13cefa9761505d7dcdcbcfdd5b0eb96b6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"拊","strokes":8,"corpus":"Ja","originalMediansSha256":"fc76f51d30f03579b9bb0b2a898ee05b4f7c46ebe518b3c5f8d54618019d3756","pathsSha256":"caa07916a1800bc7aa854063f4b98723eecf135278ca5d35ec1db1bcb3ab7be9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/62CA.svg","dictionarySha256":"b28bfa6bec432e1b84eae9985019ec5d47745fc5f351ea7fa4a57d16cdd63433","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"蜉","strokes":13,"corpus":"Ja","originalMediansSha256":"1b9310799d85f08435a54aafe71bb33365687659145cf4a046228ef13bc8d9ef","pathsSha256":"40f5b5f0d01cd37c07738c908a22b27040bdc92cb017b3ce66d2746b6dd48c23","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/8709.svg","dictionarySha256":"9a7555cfc5836fba670992d86a3de7dc4cc3d9f1601cd3be2e148119a341e34b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"鮒","strokes":16,"corpus":"Ja","originalMediansSha256":"3fc8486d66c93ab3aa2783e1d39ae1d39bf3850b50556518cba37d5e4dccc118","pathsSha256":"dbef6281ab38b29ae26a772bd6f83894764e7e9d1d81c927d2c7416d06118464","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9B92.svg","dictionarySha256":"7b95712df95de4aa8164ed296c48055cbf1f4ef21b123e4e64fd7805aea6022c","sourceStrokeIndices":[1,2,3,4,6,5,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"掊","strokes":11,"corpus":"MM","originalMediansSha256":"cd190f1035264265550f7b7031d5faa3f92c321ca8241206152bc06b5c0eda3f","pathsSha256":"352c114706016897fed07c663ba40d544cc6380db815d803c01b7475da9469c0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/638A.svg","dictionarySha256":"af593fb28b2f2c382e54984985df6f310195433e620cf7ebce4fabc200920c30","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"俘","strokes":9,"corpus":"Ja","originalMediansSha256":"107c7cc103f887295771203e36b4a397a06afc6afafa35ef4dcc833c0cfbee5f","pathsSha256":"5ebf8dd91ad6778433675851aed3f46bff178b600e0e308f0a344ee365181f93","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4FD8.svg","dictionarySha256":"45b28201738f63de240293c19de914ec09a0df74d0a1c34bf70d2b34190510df","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"桴","strokes":11,"corpus":"Ja","originalMediansSha256":"9635d882e009c1c65739c5039453741fea5ecb0ad919e46c0bed5d270a2616cc","pathsSha256":"22941b014f1b333a934839f80c8e765f83838cd0b88052a5469a681ada91efbe","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/6874.svg","dictionarySha256":"c2590ffc2452f09c4561e4ff77c80bf80817c6d910b6a150d955a83359dceeaa","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"濆","strokes":15,"corpus":"Ja","originalMediansSha256":"53b5381ea7328db7f35e4ba30c14682d4b1b09d195d62e603714143e32ec0c29","pathsSha256":"17f5b7bd30f00db289b88ca09f5c81df53b1a41ecd4264d0f01b161eda652cfd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6FC6.svg","dictionarySha256":"56704d3d96cd700dc65ff81b6853501f2914ef533e7ac6b8c9a4ad3ed565965c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"棼","strokes":12,"corpus":"MM","originalMediansSha256":"09df1ccfb887f787d920610d4d7ab7c9e64307b2649c9e9cf6ca109e5b945829","pathsSha256":"a8d0f323a00fa05671d797f2a5902ac54515bde185fd2e33742bb8c4f09d549b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68FC.svg","dictionarySha256":"313e38d8cca4f5ccb65697ad51640765ce85bd7a6423a51992e963d53e06cfca","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"枌","strokes":8,"corpus":"Ja","originalMediansSha256":"003d6e7efd9a9168247adbbb39017daac54156f3fa0d75587e48615af0ca92dc","pathsSha256":"c68aa77f5d38ce3ef4a9df3b316a2b97bdeb68438428c04355cf52d74fc8b93f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/678C.svg","dictionarySha256":"8a2360e9b1d2e530136c139463ec6e0697c47cc1c7ae4907868e8a0555456f39","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"紼","strokes":11,"corpus":"MM","originalMediansSha256":"67ace6391a12599a99b03af201d118bbf1d177f10e6cd044ce0417bb36dc5860","pathsSha256":"ca06aa0c2e355e52a82c71ed25c0288bbc143c289d5f9db3366b67b087d0cca2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D3C.svg","dictionarySha256":"ff5bfacdd5b527b460d0f64505e51615adf638ab4baac3589faae1a53c127524","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11]},
  {"glyph":"巿","strokes":4,"corpus":"Ja","originalMediansSha256":"4eda07c21c295f1da6c6a47dd49ddd46383f0fa00ea1a31b79f99afbcabdd580","pathsSha256":"95c36e8a9ca9cbce3b713fffe5c88bf294195bbe47fa0b067a6caf080a38b70f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5D00/5DFF.svg","dictionarySha256":"41785ec9363866d06eeb58fa7e3b370edc3ba66385438f14de405bfe92782ded","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"黻","strokes":17,"corpus":"Ja","originalMediansSha256":"b8276fdb0bec8ddc7e2e514a8b3ce0b0bc3a77ca0f4fc30a7305cc08365c18a4","pathsSha256":"7da67108fa41ff1ce7102d0909e15a601f165f5039734eb6f882534205dd50bf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9EFB.svg","dictionarySha256":"cb3f4f5fb5f5640a39d8bdf2761a6bd196c65ac942f660c303fa7b4ac5b4360b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
]
export const SPECIAL_BATCH5_DICTIONARY_REVIEW_SHA256 = '76083d9c133b64c01dad95e094d369b0e66fa303a94fba71a0abea0fe5929267'
export const SPECIAL_BATCH5_DICTIONARY_DIRECTION_SHA256 = '18465a046c46692cb5d5fe8573881e7481bfd19b385a7de24d3f1cdda015b4ae'
const referencesByGlyph = new Map(SPECIAL_BATCH5_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch5DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch5DictionaryMetadata(ref: SpecialBatch5DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH5_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch5-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH5_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH5_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH5_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch5DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH5_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH5_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch5DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch5 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH5_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH5_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH5_DICTIONARY_REFERENCES.length) throw Error('Special batch5 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch5 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH5_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch5DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch5 dictionary entry mismatch')
    return { ...specialBatch5DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH5_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH5_STROKES = loadSpecialBatch5DictionaryBundle(reviewed)
