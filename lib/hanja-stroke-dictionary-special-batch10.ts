/** Forty-nine special grade forms (batch 10) individually reviewed: six reordered and five locally corrected; one glyph held. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch10.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH10_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 10: 50 characters individually checked, 49 approved and 1 held; 10 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH10_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch10DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH10_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH10_DICTIONARY_REFERENCES: readonly SpecialBatch10DictionaryReference[] = [
  {"glyph":"訾","strokes":13,"corpus":"MM","originalMediansSha256":"f83bd9429dde6f3da8a7a1391c20f9c75ee24c7d5cc2efc7576867d1216e67a5","pathsSha256":"34d713681274d6d2d1838bd8c0609104bb1fd858db2134c9c14b10596b1768f3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A3E.svg","dictionarySha256":"6c29d8400a5b78f927a70ff9a6c3e55a047afe00b40273d7d5dfdcc82b4d3983","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"茲","strokes":10,"corpus":"MM","originalMediansSha256":"f305203507c70818ac645e1b9626b216e245055506b37af5c7d39fd6ae976385","pathsSha256":"3e905cf17f0a2f47e32f18d17841c4c30c906afe823a8e8f78a0ae7087a03e8b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8332.svg","dictionarySha256":"611bbac7e351c3ef576efc61a8c056bab37e1e379837fc72407ac61618b674fa","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10]},
  {"glyph":"耔","strokes":9,"corpus":"MM","originalMediansSha256":"5a9a847d9c89f2f55c86cf269b396942b855f5e58a3c4846c3f237d06cfa40b7","pathsSha256":"717c9e5112b2ca6b27f6daa2aad2b2bfffbe58090c4ab86a0d3f9cee858a79cd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/8014.svg","dictionarySha256":"f71df9f9cc00bb57a1c76743f3681b32fe11f9b01c7efa557e3f0074311b8c8c","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9]},
  {"glyph":"粢","strokes":12,"corpus":"Ja","originalMediansSha256":"52db49f9bee8985195084aa82be5837da4489954f7c078e8bfd7d0106c255e61","pathsSha256":"fda2f12d251f834454f2b4e35a7f0873fb3ce17065aa7c1ebcdc627264245311","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CA2.svg","dictionarySha256":"1cf2b518877c9218ed78f0d2471d59920d673fb6be0a832b581d48ee3be90969","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"柘","strokes":9,"corpus":"Ja","originalMediansSha256":"48d8edea25a9de607b3573e82cca372e1dec7a99c4c6ad965d0898d55e7e2e76","pathsSha256":"7f30148ed156f8ad9761992b825bf6b3f1405544ce0d467648ad9d4cb202e012","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/67D8.svg","dictionarySha256":"3c07dfdc1d4329c18c98e492d275ae99fbf2e230ef44815e5f9f873225c1812a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"柞","strokes":9,"corpus":"Ja","originalMediansSha256":"5e8294191031701b94232f3997d7d4e24459e9913cd3e88e903d91fa504e9c42","pathsSha256":"3ef3739b356c98c0dba9e5f1e3c15f1c089db7f5b7289abcaded7c890fcdbc69","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/67DE.svg","dictionarySha256":"978b49b8fe70433a004e472d49d018fc86973f1c0daf007499ec49ff0d78d04c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"漳","strokes":14,"corpus":"Ja","originalMediansSha256":"f9b958b5a08b7b63adfe36934f1e4cbdd8186c8412cefc34e1f2370c22df1b62","pathsSha256":"6a647a8e73ed9e46dfdbdb42c7ddfd931c99e26857db95f4716e3366ede80840","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F33.svg","dictionarySha256":"41bd89d459dcca95a931603395dc9aa4d3c174b36903e684bdb3f80a202a7b49","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"牂","strokes":10,"corpus":"Hans","originalMediansSha256":"a66484d3c37e10ceea4901d56230dd5d5843d40f4049ca07e9acf09ab032d286","pathsSha256":"fc905f94aa670669984128370cdea333b6a9758052c78d8f054cd5860b17bea4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/7242.svg","dictionarySha256":"4bbd69252501101d25c3a85723d969a5509d1d99919d4dcba770306cce3bc95e","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10]},
  {"glyph":"戕","strokes":8,"corpus":"Ja","originalMediansSha256":"87586dfcb901cd6d230b973746a5983ef2ae9356d4e359035bc0fa257c3346f3","pathsSha256":"e3dfa4134a7506f9021780294e866ae6521f5e655acc9ee50f5c24c6206ba5d1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/6215.svg","dictionarySha256":"1ccb622e75786b434db7a9bf8069677e766ddd33129314a7057f96af0508b3b5","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"奘","strokes":10,"corpus":"Ja","originalMediansSha256":"f513c45544c52748da660efdaebe446b3864664ff197c58782feaf588e8b09b8","pathsSha256":"b3f8e27d25e5a166bc973bfce4574797bff5ce02b39229a1b423225ecc247a7b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/5958.svg","dictionarySha256":"6e6b3febe71e0fed64cc33ceccd9db3a6ab4a2ace956f66d0a27c414470587c1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"灾","strokes":7,"corpus":"Hans","originalMediansSha256":"00990d6815813c6fc97b048843fe3550be990c3ebc729b8c74aad480edd7b555","pathsSha256":"d84afc62a10e86c6e2b396b2d72c9b5566ca7ee605a2db70f72e470c5748d698","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/707E.svg","dictionarySha256":"d5d4f34604c0c5800955c0de19038548500593a011bffe4b79ba5bfde0cd629a","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"纔","strokes":23,"corpus":"Ja","originalMediansSha256":"38fee4ff241ff9991cbeba6f7fbbbd18816aebe990399a2a237b8cae60770394","pathsSha256":"7d2e2817f4f6b5af0a61c2c483dcad05d1a9f887002724c7b7d357c64239ac5c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E94.svg","dictionarySha256":"a6a1a0d6b792074754909604d949464af3b3adb60cda56c5a7f26e50ea3cbade","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},
  {"glyph":"氐","strokes":5,"corpus":"Ja","originalMediansSha256":"550a5121e495fa1ffc4f328552613b9befd7b10db67926200039ac9907c5c4ef","pathsSha256":"a5203cd02a352be2f309d3ab29d2e62ebf837f1f8e5506ea6f4cd2ae223833c2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C10.svg","dictionarySha256":"b2b416444654925f7e5c692d61bd97a5f449279a979b4b0a98a730227423f305","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"砠","strokes":10,"corpus":"Ja","originalMediansSha256":"29b16ce794fb84ff617c872e7d93dc0c880be32a5d1856dc263d4196e2bbaacd","pathsSha256":"f2d2f30aa6243a6871c27c043f2c6ef07a7f7537cfde07e2c41aa64771a11bed","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/7820.svg","dictionarySha256":"bdacfbb18f28dcef508583c1256b914ef203f9f0bad8f09b23b5c60b9e9b3fe7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"羝","strokes":11,"corpus":"Ja","originalMediansSha256":"a60089c7c4415b8dfd5ebbc45124bb2c9ce52948d46c54641e43698cc750bb6d","pathsSha256":"90e5673818ef0a87e1327b9b48b78b12674e023036a62c52cddb0e3d069f538c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F9D.svg","dictionarySha256":"d4712dfc620ee38fc76e65c3589d059d2e63c8d9bd4ab2e49f9783deb5acc7e3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"杼","strokes":8,"corpus":"Ja","originalMediansSha256":"98bd9cc2acc2e9c1807e69f9763a6442b21f5523a20c276b0864094427716872","pathsSha256":"5ae4fb3e131dcbbca01f33b77b2a89ad23e57bde33f8e09df79db7d24eaee359","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/677C.svg","dictionarySha256":"8b32875e64065d961bee32ce5d64dd7e121b1b0cfced2a7949a2df919f4405c5","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"糴","strokes":22,"corpus":"Ja","originalMediansSha256":"d0c6bab9c292a35560adf386ffa4f9a953b56936c0c08595f77400be91a9b580","pathsSha256":"50c611f9336e9be5effc9768a5b4748941a6a7cbb857604781e2eac7bcea2156","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CF4.svg","dictionarySha256":"ca57e865dc096d13f7e6f21b34a29dec8b5342709a8bb57aefb7882b8389bb6a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,null,18,20,21,19,22]},
  {"glyph":"趯","strokes":21,"corpus":"MM","originalMediansSha256":"e4d0d98c6972167fa782841d52826c8cc843bb2376926a62bdc964c1511914d9","pathsSha256":"e0713c2e54e3c5e47b9e750ac7f6b6ec5721ea36452f27f12d3a3733a58b5f8f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8DAF.svg","dictionarySha256":"10253a803a310b4f67abd377d9c5ac4a105ff4b0ad21ef45e22222511e33495b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,null,null,11,null,null,14,15,null,17,18,19,20,21]},
  {"glyph":"逖","strokes":11,"corpus":"Ja","originalMediansSha256":"1be1a332d96c4419f7e821b36e0c81449d81ba877ec8fc14249115644225b2c2","pathsSha256":"851a685b86a6c3de850747a874c6f958c8ee56b785799743353069117a4e7b94","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9016.svg","dictionarySha256":"c7af5a87a6ecad8aa56b3948b8ed663af64526a6dcb228119a0a91bb2dcb102b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"覿","strokes":22,"corpus":"Ja","originalMediansSha256":"754c9a58447479eeaaec5983292d4cca8dc870cdb100a041277f33afaf8aebaa","pathsSha256":"06944980056f4d228c998a6360dca0b55f545d8ea8658998ae31008e770a9914","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/89BF.svg","dictionarySha256":"598e569d5ecdedf5d7707ec579a86b97985a1a1cc4b63ef9a8e74372f45a722d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]},
  {"glyph":"腆","strokes":12,"corpus":"Hans","originalMediansSha256":"2157fce827a906de9e3582ce3235d5c58d7489a07b919f7907590fe678f9eb03","pathsSha256":"935928e35ce13a12b55a92e3bc8cea6445f24aea4995b09b52ead295640668b7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/8146.svg","dictionarySha256":"bd765b1808890d8756ed60e4cae184e595e8c2f1a9cea0a29fc697fd8ba6dd31","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"翦","strokes":15,"corpus":"Ja","originalMediansSha256":"8a69bca16c36da33f906fcbead31629cce5147fc2960ef7c4da777c6fa670391","pathsSha256":"4392c69a56d934d8e627063f8a7290a62734c7ff3e4e046f6db39f1703de11c2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7FE6.svg","dictionarySha256":"4c08262bd6bdbcabd3f2e559e8594e542358befc39528120c6db5452902da3c8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"靦","strokes":16,"corpus":"MM","originalMediansSha256":"07c87d307c376889ff8a22efd5680101215d727c37bf6135542a9c178bb96ee8","pathsSha256":"ebfbe5294d12e1bf7f7bf217da1a6bda3567bd0091360d2bdcd96942e66f41d1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/9766.svg","dictionarySha256":"22cd21f82387c95ff7ebe5e35884437d67797891ecf5d523191d9fa6d3bdad94","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"顓","strokes":18,"corpus":"MM","originalMediansSha256":"9743d03b57ce033851264a6a824bcae13f47baf975a543d2fa9b189b0986a3e6","pathsSha256":"1ae4de5e7965e7200bccf9faaf75bd1f1c840a3de1e3216ffd6460eb7c111e42","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/9853.svg","dictionarySha256":"3f979b635d8c4d80c977f004b836f65373a5a0307e4601bbaafda721a3066176","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"旃","strokes":10,"corpus":"Ja","originalMediansSha256":"67f51b903ff61e9216d76acdac7e6a02bdcf0555f09e85a8d6bafde2d88275c5","pathsSha256":"a5ae9a4bf6b8a39080f8daf5c1c46eb451b9403ee37370a640cb9b5431f14290","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65C3.svg","dictionarySha256":"8a9662a79a5c4d36b1327d3f6354e94c3ff817ddfa749cf8fc9e175e6f7f4f76","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"巓","strokes":22,"corpus":"Ja","originalMediansSha256":"27409eeee9af441e248c99915c8ca44532e3ee8b08c17372721f26b0d3590280","pathsSha256":"27844fa303524d83ab709bc38d0afc5270112c6eeab352cea735003f24d097f9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5D00/5DD3.svg","dictionarySha256":"3455752e21fc5a438ce58aae5c449316431bc96fcea7d0039fee677a90cbc93b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]},
  {"glyph":"瀍","strokes":18,"corpus":"Hans","originalMediansSha256":"8473491580fa86ac67a3140805cee4a8549141131c729c2f7c8bce7212f6ca21","pathsSha256":"dfc5c45890271fb69c896b071aa06a0a401bed5314137c0d05d4c95389e85463","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/700D.svg","dictionarySha256":"e8df17d400d4ded51b265ab125ad75d279193259d84653cd7e84b369e59e2f2e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,12,11,13,14,15,16,17,18]},
  {"glyph":"鱣","strokes":24,"corpus":"MM","originalMediansSha256":"0fe9cd0efadee58b663f4f70dc26d18dfb21550e6d5111a284e8e98c19e46e02","pathsSha256":"29950c78ffb797696312937ea1628b050f60c67c668e65117b6dae154471d5e2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9C00/9C63.svg","dictionarySha256":"da2433300e956b670ed19f530d3076d29288af9d31f138682ac3647f6633cb24","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]},
  {"glyph":"畋","strokes":9,"corpus":"MM","originalMediansSha256":"778fa013533f06efe18522be922c6735c3f66fefe51b08a7f8a45adbc6ed8cb0","pathsSha256":"8c5196818815cbebd755bd3f07d292b80d631ef4eb2cc44850550a0431e651d4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/754B.svg","dictionarySha256":"051b4c0eec2327b97f506e5c4986db917a80afaf96b65eaca4a34c2fc77307c5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"晢","strokes":11,"corpus":"Ja","originalMediansSha256":"dfbabbce2a00b5a623d5bbaeafc3a392b60061c9ddd0260a739d18b2c963bbc5","pathsSha256":"1cc02b91779db8293a216e8add052d6602634a8861b597bdf22275057b0b201d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6662.svg","dictionarySha256":"1b95ac1bbf7ee68b2e7976f331f843b3dad3b747fe4663422bd18afde7a5259f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"玷","strokes":9,"corpus":"MM","originalMediansSha256":"69c7be062b5063ea6331b1479cc962e2f95cda290cdac5b09f6387f6bd9b5b34","pathsSha256":"1daf53dcde7c1a9aa2c9856d11a61dccb5d2a15bd94e3b69d106bc7f781db9e9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/73B7.svg","dictionarySha256":"5e49f266c93f6ab6759501433680e75881dfaf91d5c708704a389ed8fb5a4af2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"墊","strokes":14,"corpus":"MM","originalMediansSha256":"aa939043c68f5e2f801f3bbb49694b806a429ecf95fd38f8c933e663cbeb4ddb","pathsSha256":"26dc48f0a9f9ad9278ed317442b57f2ef64baf72a8ddea0752d0aac5b1b118dc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/588A.svg","dictionarySha256":"55524778c21ad06a82fa9f256e1be90729ee10bc03087574de8a9348f6399332","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"坫","strokes":8,"corpus":"MM","originalMediansSha256":"2d4e09be9c5a1ebe590008c4001de804335483faa0c59186895ef9e4a95cb212","pathsSha256":"dc18a1a71b824b5779b05cc54d0b3613d8af68ab6cc22d564a7f5d6776e9f564","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/576B.svg","dictionarySha256":"a2dd2cbe7371463d9734303811895778a96168837561a7bf8cadc0d4fa221ef1","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"簟","strokes":18,"corpus":"Ja","originalMediansSha256":"ce531b4999d431a89c0d8b3234605a461395b8652310887065100ae19c7e175b","pathsSha256":"e661fdbddab43feea1fb5d3592c2c7fe2418c794101a1221f4a78cdca485bd4d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C1F.svg","dictionarySha256":"5849c2e1bc1245d74ccc61ddc0957c957b6c198e3a3865f2846de3cb1ffc9cca","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"梃","strokes":11,"corpus":"Ja","originalMediansSha256":"e1560189c9faf0ed0d2964db62169b8f4183a36da150f93a160973c676f9d21a","pathsSha256":"86c12f97e1a95af8e4b318bbc14197268d2b77e7a5390256d750914f83e6ff4f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/6883.svg","dictionarySha256":"c5dcfcfa9bcb08c7bbbb36875f4ef19b273b841e17c85345976f0baff7263f2d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"裎","strokes":12,"corpus":"MM","originalMediansSha256":"daf765f2dfa737a548579ff45d3b6231776306012c02bb06f468b9c39d3876cd","pathsSha256":"c2e9758236e9b50e7266f02ad3c81e6b3cbe6a7ab41457b0cda1a449e42c3263","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/88CE.svg","dictionarySha256":"444d994bc77ddc10ea924c7aaf0e6184cbb0ee74064f79678e9e6bb44a2bd397","sourceStrokeIndices":[1,2,3,4,5,6,7,8,null,10,11,12]},
  {"glyph":"鋥","strokes":15,"corpus":"MM","originalMediansSha256":"42d7d6e2e35aacc875e4588a033c0c9a982875a89ab955f7e7317b3d22c1cd6e","pathsSha256":"71a43d653980a1c0717978111a318bf23e6b6113c05ed623a84cef15470f43f0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/92E5.svg","dictionarySha256":"f9fb1ad832903dc2e3e67a2b1620869ee464956f458d925e557cc2aa50c0a799","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,null,13,14,15]},
  {"glyph":"酲","strokes":14,"corpus":"Ja","originalMediansSha256":"f320677a31797fcfc5a453f5cf5c7c9b078ac8ee2a059500919c6a7ea435f9e8","pathsSha256":"f53409232fe95b232da48cb94111ec96a4cdc5a224bd71292c9a986dec021e27","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/9172.svg","dictionarySha256":"23aa119163c59b0c64033792ad978d2a0845e2627c83c61fb08d23497940185b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"鵜","strokes":18,"corpus":"Ja","originalMediansSha256":"b6e061980a37b44f3ad2e03a6bd2f9832b63244118781dace4f561849077950f","pathsSha256":"c58306cea4498875c0e8808de3f1bcccf3f9982245cf2f40a222ad777c6ad292","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9D5C.svg","dictionarySha256":"73518ef9307c0f247d6a9cc0041adaae7f708bdaa4c2982304832d5c96e1d546","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"躋","strokes":21,"corpus":"Ja","originalMediansSha256":"a41498d14eccc5afaafc7180f68f0db6f6b388025055530ad627ad67bb08e7ad","pathsSha256":"c89a12780729c90828273531bba998babb20a50ecd4fad47af567662041c6fc8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E8B.svg","dictionarySha256":"0b483192749434057ba8e45919e9db5f6afb3009e2be86582bd06eb417e7cf16","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"娣","strokes":10,"corpus":"MM","originalMediansSha256":"28f1bb75242a4ab2751a9c144c611458e6efafdb66be9cdff4b71a6e3ffc41c6","pathsSha256":"798279d8af50d6973b83951e53a73f05bdb75b5424f8097272c8dcc62255b6ac","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5A00/5A23.svg","dictionarySha256":"2eb66dce133d033ca52f02fdc32143eb31f97d398536d92d15f70a2ab6ebd572","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"螬","strokes":17,"corpus":"MM","originalMediansSha256":"93e12e073e1bf7b39920f99cdc083c12a28a32abc146e9ebd67a5e89e2b9674d","pathsSha256":"210a383186bd4161bca8c8bf9355979b19232d77262fa706c888817d81db0740","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/87AC.svg","dictionarySha256":"8f3034569b33e1049660ff9fcf21ab2e82ce646fa3b0bca8592f1bbf10af1f3f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"罩","strokes":13,"corpus":"Ja","originalMediansSha256":"ce8ddda67ea452f993e309d039a7be782c7424c671f69b591a734a06b6f278c1","pathsSha256":"e7008b028ec061cc534bd5e92d54adadf69c6b2880c9341391bd7ab8d30dde6b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F69.svg","dictionarySha256":"388d4ae0b7ad0648a9a29269c0744e4d14ba67764c6f5e68d61c0e3fa425442a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"慥","strokes":14,"corpus":"Ja","originalMediansSha256":"3052bcdca1ee8deefadc76112be25faf392a046083002262c3b5fc2b02863040","pathsSha256":"43387371a867ce128b64beb1c130624f40db2bbe54d71a25974e54044d67981b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/6165.svg","dictionarySha256":"78f1397eca39b417cd3f41372e1905721d7106528ccbfaeea3966c3e3a3949e6","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13,14]},
  {"glyph":"殂","strokes":9,"corpus":"MM","originalMediansSha256":"c8f4cf67e45a771f4b979b1689e339262e05f3fb35e4054776e4e0d221f12242","pathsSha256":"23c28bb03dfb6cbfed44bfe7a181f609d4c653880eae3f0272a600b117101146","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B82.svg","dictionarySha256":"18cf60d8f7f33c90cd262af77edd6ea10deb960ad2ca90e38b8dc7fbe57c708d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"皂","strokes":7,"corpus":"Ja","originalMediansSha256":"14b5c4549f81979d90e23f9e7953d386f9f1bf614493b814a9d46e4f11a078da","pathsSha256":"ff773bd4947415f197b88f362e91fbafde9d865645746ff179f17ee377cccb82","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7682.svg","dictionarySha256":"0985bbe53f3752204304e6debff425f5a5bdfc9c56c4689263ae2086f9eb2cd2","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"佻","strokes":8,"corpus":"Ja","originalMediansSha256":"9ecebb4211153be9637682bd3a14160d3376f5a1d261817860c326234a2a77e8","pathsSha256":"7838aa721cd00d75ccf6f042035238f6b57e0a1b1693e8695a180d3f2c163ac2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F7B.svg","dictionarySha256":"ce34a3a104c0196205beaf76505e27c716e4341cb6c3b8eac9b4a7b1222066ab","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"洮","strokes":9,"corpus":"MM","originalMediansSha256":"dde33dd8c7a637a2911a4c0a8af71cbfcd8a5c8f798c466d8a17b39f86a726a9","pathsSha256":"bb34b1bc18893265a4d7b4d946961aa5a36f5cd6cffef8c4e8aa9889dc2eb510","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D2E.svg","dictionarySha256":"af775775a9dc4af341a25484374ec40eae96d476a59d9bd0a671aabdcc8a4591","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"鼂","strokes":18,"corpus":"MM","originalMediansSha256":"d6bdbbca1a5e2dd6587cf906cde7956a064d4c70f96a73cb12dee6e1e365e68c","pathsSha256":"c0f8e0e0e7b139ff1e66d8e679eef7f18072e510393f01d8b197f07e70fc22e6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9F00/9F02.svg","dictionarySha256":"bbfc5d8eb380855a3c702e996d076008b62aafb5b685ef806e0ad1482a8f3978","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
]
export const SPECIAL_BATCH10_DICTIONARY_REVIEW_SHA256 = 'd470f79920fc785af85928929a88209ac5ff110cdb96759bb9993d44823f9dee'
export const SPECIAL_BATCH10_DICTIONARY_DIRECTION_SHA256 = '981e47df722389355a040496a7f9fd918b879520301a7bbf186ac618102e91bc'
const referencesByGlyph = new Map(SPECIAL_BATCH10_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch10DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch10DictionaryMetadata(ref: SpecialBatch10DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH10_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch10-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH10_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH10_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH10_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch10DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH10_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH10_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch10DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch10 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH10_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH10_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH10_DICTIONARY_REFERENCES.length) throw Error('Special batch10 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch10 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH10_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch10DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch10 dictionary entry mismatch')
    return { ...specialBatch10DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH10_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH10_STROKES = loadSpecialBatch10DictionaryBundle(reviewed)
