/** Forty-eight grade 1 forms (batch 16) individually reviewed, including 7 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch16.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH16_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 48 approved and 2 held; 7 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH16_DICTIONARY_GEOMETRY = {
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
export type G1Batch16DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH16_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH16_DICTIONARY_REFERENCES: readonly G1Batch16DictionaryReference[] = [
  {"glyph":"稠","strokes":13,"corpus":"MM","originalMediansSha256":"08e7b19c835b62b381dd35b1ea5f528710d90f962288f14b8564524f286b7419","pathsSha256":"f9877b784e3e888e3f8b917809c3c57ea6c47b8295c53338196ea2395fb08cb7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A20.svg","dictionarySha256":"a85dcd3aa57a274b300d165174dea99a7b0e83511ad4de619f4568083670f4cf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"漕","strokes":14,"corpus":"MM","originalMediansSha256":"3bfd402c005614398e181f7617dff6eac4e60680c0aa7183861a54fd4363a686","pathsSha256":"b7e16134db8404d96ee80372380c0da7ba9025173cedebe36ebc53e790540606","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F15.svg","dictionarySha256":"cf7433e5a654f6793d89d3fe47060d87194dec4cf1e0dd745d10e458a1739c6a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"爪","strokes":4,"corpus":"MM","originalMediansSha256":"19dafc4ce241c04e614f801fb8e457f8e79d4f9f5ab4306d36369acfa916f71e","pathsSha256":"c43fa6e91e7e2ab331ff5fcb1a905e094f03e94d9aad06349592670431f8b442","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/722A.svg","dictionarySha256":"125191d2501425572a32d037e5d778921963a08c1cc00b4992ea0ae7ef2d6dd1","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"眺","strokes":11,"corpus":"MM","originalMediansSha256":"8cd87c715c7263cb3a25730643170edd2b425986ad1bf859969d771da8c204aa","pathsSha256":"31d5c13b29b93c27e21c958d2245da9ee99708ee64a22c4059f57c45ccd8ed4e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/773A.svg","dictionarySha256":"bbe565407d5335da6c55f3444fe258e0c0678cf527c75cf6083428d45b2a8362","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"簇","strokes":17,"corpus":"MM","originalMediansSha256":"5c43b653f973ca1147bec44ba91d42a0fac6b1b2a43c4c77881fb1787f6e3d86","pathsSha256":"5a6bbe672f0c7832cc21ee0e4c249672d6c14d049dc804d57ccc674745f85b4c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C07.svg","dictionarySha256":"ae857087b219239021f41484456baa7d37ecf0acbdbce7ea414f2566e28e1fe1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"猝","strokes":11,"corpus":"MM","originalMediansSha256":"b8a342af087650d1984acdab9812278cc175b833a229171d27b8cd8d10822ab7","pathsSha256":"6337c6d4db2c2503909d6cbe516b7adcff4ee650b5fd30de6813d4fbbd79745f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/731D.svg","dictionarySha256":"685b68555ebe8601b5f3d2b3cfc6bd0c17647e3ce7c853e7c88be3ac995f2496","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"踵","strokes":16,"corpus":"MM","originalMediansSha256":"780c4625d0253eec79d8ffb9a692e993b4c9fcd6fbe6d4e7572f38fd84b4100d","pathsSha256":"47e52015a62b6389be1232a1b2b9d35f101f06a1dd67af4687753ccd8e1e982f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E35.svg","dictionarySha256":"aa94b0a2920a98d428a6529ce65a8344db697100d502ecb49826774748a140b8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,16]},
  {"glyph":"慫","strokes":15,"corpus":"MM","originalMediansSha256":"ed77f1e4a2a2700cf3b52c12b35d1e461b1b133cb2e3d607466452bba9ad8fb2","pathsSha256":"f1378f4599ef68d5b52668364534e33c53c3c16ef87c4fe3d9ba46b3f75dbfe9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/616B.svg","dictionarySha256":"2f28fd8cea3613ad922a3a3c42a1d4b121ea16b71670048f98a90b345f45eb13","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"腫","strokes":13,"corpus":"MM","originalMediansSha256":"3a68c816fbcbb1617ef50cd2d129c12367d75b7fd8ed9b66a8b6d589bbd42760","pathsSha256":"496e116b562a06f25b35e6489e71c5cd50e622997a97c3e3b1271a7b684be24b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/816B.svg","dictionarySha256":"787cc12b5374782a64ddafa0d95da1b7117cf9a430793600e9a46a707b90c89f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,12,11,13]},
  {"glyph":"踪","strokes":15,"corpus":"MM","originalMediansSha256":"dbe632d44ce17a6b4d7ab87cf581a55f998ccfdf677d1e67ffe0544515728001","pathsSha256":"9467c3150283768d4bba48c00ea8a9019f7b35ec49ec5055d33f012ea76bfac2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E2A.svg","dictionarySha256":"88dc1ce00a2dec6eae3f952abfdf8e3aeccce72acbc4e0f682ea1e625465d1a5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"挫","strokes":10,"corpus":"MM","originalMediansSha256":"807685c889f990e87a8641f9c774ad6e1f6274428342cb7f8e26820d9c5f3647","pathsSha256":"205dbcf53a015271d14a06b89f40ffb9804a4cc0a409ba0cd330ec19c3480972","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/632B.svg","dictionarySha256":"871195f36009c721c49e8da6b1c442096d0c89cac4b46f879f9024b8ca7fa90c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"躊","strokes":21,"corpus":"MM","originalMediansSha256":"88111cc614aaea0b1d21b4af252a966d3eedb42a62eb306f5b04691a6090c3bd","pathsSha256":"af060c166394dd6cf6907b3f0d0aa9637b814355d63d9672e9039c3220b3cb67","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E8A.svg","dictionarySha256":"323b993990dad3391a17b17edde735d4eefad957ff26db2635f8c2b9276c0520","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"輳","strokes":16,"corpus":"Ja","originalMediansSha256":"0b3b11dd930eb46fda1ee5a3048e81ea18807db0beb45b3b3569fbed27016ea1","pathsSha256":"4bdddc15b13423d38eab56679ecb20cb5b6759d1be9efc80e3c544c079552aee","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8F33.svg","dictionarySha256":"978cc145fc62ce3024035a88b866c20b5e4c8f0919b440480c0646a9e77e04ba","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"誅","strokes":13,"corpus":"MM","originalMediansSha256":"c8b30bef3014553a4668993003bd366bd2016a99e7d1f688613b8f8298af855d","pathsSha256":"c880e8b197116eb9d9b1e025ffe3455e7947fd91c593ad7580c720601cd872a9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A85.svg","dictionarySha256":"61f5fcf49bfb8fba4a689e07bf0aaaeb58939563572815340a052770c5034231","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"做","strokes":11,"corpus":"MM","originalMediansSha256":"e0e3c172b6dcf5875caa53eed2cf928072ea522341c7745864d2e43066ec1bb5","pathsSha256":"8451887aa46b0132e14d9816cd1363c18ceb21a79b6e9fa4333aecee330e8841","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/505A.svg","dictionarySha256":"d463b8f0303b5973faad9f45d81e380f19c6245a7e5f9e6a139cd07e6d5526c7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"胄","strokes":9,"corpus":"MM","originalMediansSha256":"faafd38651a1379c528d3db5bae6327a02486f9093a352730ea356742c3f8681","pathsSha256":"f0d1ccacc30bcc5e9c85429e72a9eedcafd8463f10065c0a34af26c6d7c2a52a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/80C4.svg","dictionarySha256":"f7ef373f7e2719fe81baca0fea7dea14c813079de4640ad325504ab121677e12","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"呪","strokes":8,"corpus":"Ja","originalMediansSha256":"2c6d5ca71bbbc5a2161f781b733208ebe15733d1ee438b1cab928253bb26c75c","pathsSha256":"f752c8bb75a538708bc49b0c7c6586dd57c46fc351b5d2396e2d527c2879c66c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/546A.svg","dictionarySha256":"4079a2f344721a29bb9941fabeb0fabb9ac404617fbb6e5647e15a4ef8dccef7","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"嗾","strokes":14,"corpus":"MM","originalMediansSha256":"cf27d5c5e70ab8cef9b2ce9b829ac306a75e9e822034c55d422e274800a60f54","pathsSha256":"42907f4125242db53c3696e30cfba87547be50c9036334dcb399198354888943","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/55FE.svg","dictionarySha256":"f43617bc414bed0b3d6d966866bbd6cc373166af1fbee28c1ba47e1e46cee001","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"廚","strokes":15,"corpus":"MM","originalMediansSha256":"c04b0f6b5fe6adee3d198f6f5d9265a4e1f5aaa58801a5704a96a0e4679aa3ff","pathsSha256":"ddf12e8850185d971727d8518baad3cb66eb4e390f03c250ca1578461c983e15","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5EDA.svg","dictionarySha256":"6a79e6e43012c1a6f1dc7955a9aefd801421c54315face3b406a525cf194d505","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"紂","strokes":9,"corpus":"MM","originalMediansSha256":"a50da0019632c31daea5dbf3b87a58341686adb45205e7c5e3fbeb3d6f626644","pathsSha256":"2552edfbc7bc046c9776ef5b9904ab832f4125ba7fa697cf2ba56b8c6fe6a6b8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D02.svg","dictionarySha256":"79b395deaf7bb4329cef7b49c3a1055faa8b40809e57ea7b623ff752ab2b82af","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"紬","strokes":11,"corpus":"Ja","originalMediansSha256":"310fbf3fa248149180a248e2eef6331dde2ce2d7be34350e0d9f717d8619a40a","pathsSha256":"9cc8b85d33ba00bea91a359a925eaefff9b56113901a15f090203ead7141fa6b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D2C.svg","dictionarySha256":"f54daba30482fcaeca46f8aa1b8cf4fd7d1a8945ddb20ee0d492adac9e975eb1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,10,9,11]},
  {"glyph":"註","strokes":12,"corpus":"MM","originalMediansSha256":"b121087ca481b531a0d33202b69dc702de6c084c328875cecee58eca221da75a","pathsSha256":"c58e99593c0748763d7a057aecc2a3b0ebb95ccdfb9803b17a944535b8a5d3ee","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A3B.svg","dictionarySha256":"d21c53c9cd8bcb95e11374edfa924fa0fecd7d5eb3c30b0d61c4dbb97a76f8be","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"竣","strokes":12,"corpus":"MM","originalMediansSha256":"b2031e94f1aa72777065070f8d419cd0b8a413759891c72a163bb963e9bfc787","pathsSha256":"3414cd1a6eaa994c87010d860e06348f63cbd09905538454554489f1e1459163","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7AE3.svg","dictionarySha256":"f1501c65960b95f0cab114d9b67abf432d3eb08bfa37d8ea535c58e1d7020e02","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"樽","strokes":16,"corpus":"MM","originalMediansSha256":"e397bb4dce8c82e004808464119c815ca51794ba89421baeb3beb19b2fb23463","pathsSha256":"105e9ed3bd46c7669b9aadc8225700990c38e7a06715b7c95e6675187cde3d2c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6A3D.svg","dictionarySha256":"4923fb6cf0f627c00374f470362942ecbbb103e36ae2d4d7cd370468227c3351","sourceStrokeIndices":[1,2,3,4,null,null,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"蠢","strokes":21,"corpus":"MM","originalMediansSha256":"a5f856d99d4ae40c088cfc1cfeb6399e3d466716583429d3f87c0213a5f2911a","pathsSha256":"7306b294c130d7216e96f955650d4ce45742e0bdaf179792b2ae34dd315caead","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/8822.svg","dictionarySha256":"4e3da92d33a318bc85f74a4fa42a97668ba0da0bce703286907463a9fefbbee4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"櫛","strokes":19,"corpus":"Ja","originalMediansSha256":"4469b0c666ac7bcec7b0083305fbe66c8d07ff99eaa893846a0e8666964170e9","pathsSha256":"c5ab93eb156e90bc290e1eeffefe3e6920a95a419e080f7da4de222a654339e0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6ADB.svg","dictionarySha256":"02d5130de1158684cc515054a5017082588ebb48dfac74f2b556dfaba21deab9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,13,14,15,12,16,17,18,19]},
  {"glyph":"汁","strokes":5,"corpus":"MM","originalMediansSha256":"e239cf1e56df0113e824e695e2ab0e665ba55da6611768303a5557092c9c1b50","pathsSha256":"5a9b0e9fb95f9ccbc2eb39129416030d1187639949cdecc5ade885e8fada430b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C41.svg","dictionarySha256":"37a8c1b77abfdc6016301b079c1989264b08024024581a440cf54908a44f7233","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"咫","strokes":9,"corpus":"MM","originalMediansSha256":"c130d26e467610ee40ac79e7570e0fadaffb237082b6b285d684cc8c678cfd25","pathsSha256":"f51d46e12f692dbf0b37f2056cbc2b69e18480a5411278703eb5d7383fa189cc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/54AB.svg","dictionarySha256":"908764164dd313fb437e61923ce127ea74524729e648f4ba866a0db16da6ac3c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"摯","strokes":15,"corpus":"MM","originalMediansSha256":"051b708901acad9f7718b586a955facad0c6bd8dc2cdafca5bbba0906078c1e1","pathsSha256":"15bbbbd8e50aa6d56d8a1a51e5d434b17a116323c97dcfb1ac6f4f87025e0b24","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/646F.svg","dictionarySha256":"6c2bb906f44915eb9c0728953a611df01798c63685243c8ce44ce4c8e29566d3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"枳","strokes":9,"corpus":"MM","originalMediansSha256":"4fdbada5f6b96010d3996495c5631f7a4700c924222df794008c4dc1a5af38e7","pathsSha256":"08f055b8e88735d9b3202a088441a00a4d78221faf48632cc7fd9b5a161c4982","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/67B3.svg","dictionarySha256":"994b8e41637af1c925214cfc299a63965f1b181d924caa180c238c3d9e142a06","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"肢","strokes":8,"corpus":"MM","originalMediansSha256":"f329d3fa429726f1cca91df3718fe98ec5ec1c433e2fceaa29b4b2ae848f0d9a","pathsSha256":"1f16aa2c03be81c82d86ecb14f327123ddbd55b8615bd3675c7ce6228150a0e4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/80A2.svg","dictionarySha256":"d39a14af96d6a6c597b844be0270d3cb1b946d062d3fc243922426fd5b169c4e","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"疹","strokes":10,"corpus":"MM","originalMediansSha256":"c47837a2c484945a036f388a018c247506b2453b25bfaaeb763ed86eba10ee07","pathsSha256":"be0927de0dca2c9170aafd810a0fbabf8bf07eeedb772729470f77aca39824ad","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/75B9.svg","dictionarySha256":"95fd48392eb6a970e29256ee88baa2986aa5e14bd7a46a75ee359bbea31fc0de","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"帙","strokes":8,"corpus":"MM","originalMediansSha256":"ca59eedaf655ee25da018b1cc20c2d8043efdc791b9b1bf6effcde91a43625ce","pathsSha256":"2a47e8275bfc32f4b56b795a49b4cdc73b110463ab6a6b6e14958ddfa16a715d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5E19.svg","dictionarySha256":"d040c2c95331ce9df37e6ec9a400761d83876f5ba249b29100dc556b63546335","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"桎","strokes":10,"corpus":"MM","originalMediansSha256":"0f96dcf6d04117ccacb2039d7e963b93a8fb3da03526dc437944af6e7c3d468c","pathsSha256":"5dca11c68e26e77cdcdaa0615e8c9589d7711e485bafed47d257780b0be8dd70","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/684E.svg","dictionarySha256":"8f12394dea5d229f89a622765bc64bfeac04c2ce0265bbf8caed58bc7b2e8703","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"膣","strokes":15,"corpus":"MM","originalMediansSha256":"5efd70b71b820ad3fc2690b91a7cf78f72f16519f948292e61e7ec04fa158090","pathsSha256":"c77cd15fdac57bc6e39a1b90cd325eb286394319062bdf62d540b09df76c7088","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/81A3.svg","dictionarySha256":"2643e605b0f7b39a84645985cfef5bf4ccfbdebbcc7b0787c6642f7c46585d88","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"叱","strokes":5,"corpus":"MM","originalMediansSha256":"74629f30e986147af647d642d20ccd6fe4c074958d68e19c28696c2dd821fd08","pathsSha256":"ed7a23d11ea45b6d70ff6bbd7e6f216df90aa7253037fa7049d16bbce09e21e0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/53F1.svg","dictionarySha256":"2ca95d2e30e6e22fd137d63d0cec564c71900dd663f7d7333b34ce63005465b0","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"跌","strokes":12,"corpus":"MM","originalMediansSha256":"cd6f7bbda1091aad3cbfb9600463d570653aafd37a9bd105c13116651c800b14","pathsSha256":"c8879b65f2c55fb74205d192df03963fc79e07c5078a16ea04a4e8d3473b7b58","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8DCC.svg","dictionarySha256":"aaf170f001f554e45c5fcb141bf37cc2b22f2d5c64d4bb3289531166ce9eab8c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"嫉","strokes":13,"corpus":"MM","originalMediansSha256":"0e73e448b1300c68f15db9b0d1ada6cbc03ec0bb5761e42bc0470db548e6aa89","pathsSha256":"b25cbd77767dbfa1156129461b0105bb497bdc4b804918b4ca724cc405fd7f64","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5A00/5AC9.svg","dictionarySha256":"d06da3255d3891ed68c3661149ac56b2bf0e7904eaef7d60069191b3104c3b59","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"斟","strokes":13,"corpus":"MM","originalMediansSha256":"34fe4c58f7cd137c9c500aab0f26cc95645cbe546b9a510118fbe339242e00d9","pathsSha256":"18d96f7bf480b9c02d3329e349d2b466d6791600c7c3ec0ad85cbd42449e6be4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/659F.svg","dictionarySha256":"99e723ef9b93d09591909e60b737a2c02fbca9e5a50d63b9ebbdb2a0152def72","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"澄","strokes":15,"corpus":"MM","originalMediansSha256":"21babb5623d216937035eb6489a1221e93c58eb49eb3ae8f89402b20cb77fbb6","pathsSha256":"dce4e01007597ad7180043d8d1e4a8b0ee394b1445cd3f9d32b76b9762ecb9a6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F84.svg","dictionarySha256":"864f3e6686fd0da96292a7b6c54e2645de7e18b18f4c01bef6b991e7bd981e35","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"叉","strokes":3,"corpus":"MM","originalMediansSha256":"e8b4a7829766ae45ffe21af9dc4935c99e8f1a7b357fa7eb16f433c2c7e6c790","pathsSha256":"8dfc948e6b717f525f9c174ef6af978db9c519b9fedce6ccad4545c6f2b403d4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/53C9.svg","dictionarySha256":"81067dd56e87a94b0894c13d63920b0401bfaa76fb4bcd43febc96a8d43faf28","sourceStrokeIndices":[1,2,3]},
  {"glyph":"嗟","strokes":13,"corpus":"Ja","originalMediansSha256":"50786c91055f8d2752d099807c1f30f5ba86f94117b4bdeacd0f602e9b1445aa","pathsSha256":"cb4ad906b4c6b93ec8f3ad3bbadde8f6f9c79c22f526474c259210b420c8c969","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/55DF.svg","dictionarySha256":"78f413949973a150c43a48cb1fe4d81e8486dc3402ee6845b637325793588ef5","sourceStrokeIndices":[1,2,3,4,5,6,8,7,9,10,11,12,13]},
  {"glyph":"蹉","strokes":17,"corpus":"Ja","originalMediansSha256":"d7a5abed2bcc10bc43f2a6914f6d6b3505c9db6bc2ac1f03529bce4cfec0e53d","pathsSha256":"1b0cd8db53c968fb9f5f86a66335d73f67c34912c5a787ee817b4e92159d3c70","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8E00/8E49.svg","dictionarySha256":"8e52c15a72b943be57a4ee1213116ff9aa68c2fed0e9158f8bedcc28debcf86a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,12,11,13,14,15,16,17]},
  {"glyph":"搾","strokes":13,"corpus":"Ja","originalMediansSha256":"fb7dcecce4c68306e887c70395e2ea0a2423087f7923351a573acba20550f98c","pathsSha256":"37b744f5411c7781ab6e3d6332d80bc23989ea9d1216dcfce9dfa8c4edf36e53","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/643E.svg","dictionarySha256":"a06d808f27c02cb6ef54018f63fa8958b6ebe192c68ab12e6729476f47152949","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"窄","strokes":10,"corpus":"MM","originalMediansSha256":"45362398e4d68ffa2b217053e57ac904242037597e1bc2fc6039594df9022f05","pathsSha256":"bbf0776b1f2b2a8dbada414b3706898effa7added6c691655aa28c039a830bc8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A84.svg","dictionarySha256":"a57ac52450a9113da5d0761e4f155236d0d473a3aa773b6c76bfc9cf24fa0a31","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"鑿","strokes":28,"corpus":"MM","originalMediansSha256":"c2bce326a61ed023c5938ef54379e324796c60590d855c1fcb5e8cc8a965ed7e","pathsSha256":"ff6a8818645ce8d835ebd9ec99a81effa9848f162d7616c2ec44b996696afa16","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9400/947F.svg","dictionarySha256":"884fa2fc1172b5b9a7e5da0cee150665434457bea55c752bd4c48651675efe6e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]},
  {"glyph":"撰","strokes":15,"corpus":"MM","originalMediansSha256":"9276ec6f734dbfb8b6edfe4505087a1cf0c95219f9ea59f90244f12253ef750e","pathsSha256":"86ec247cb0af0041794966e5818ca1de9c0c0151416568ac01c5978db3a20910","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64B0.svg","dictionarySha256":"f08f09203c72fa9f82301d77beb5c2063cd8363a3725d8dd996a61352ed09fb9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"纂","strokes":20,"corpus":"MM","originalMediansSha256":"59a7668512c4aa72d300c139413eef10302fff8e80d9492840afcb5d2fa1ce2d","pathsSha256":"a9254859819da91fca5a5b1acfda6d154d20fb21577a4b1dd24b9a9618b711ca","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E82.svg","dictionarySha256":"63e899a1337b777c37a2996b6a2b328b8e2ac103bfe045f58efd75ac6e351fd4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
]
export const G1_BATCH16_DICTIONARY_REVIEW_SHA256 = '88cd1c4ccf5a40ae1660ef6aba493c2023047ab9cea14b4a14d30a77d0f80a30'
export const G1_BATCH16_DICTIONARY_DIRECTION_SHA256 = '53592ae7e423f7e1f9688ea3b7c627895f669377ce693a309b540a54faa18278'
const referencesByGlyph = new Map(G1_BATCH16_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch16DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch16DictionaryMetadata(ref: G1Batch16DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: G1_BATCH16_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch16-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH16_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH16_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH16_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch16DictionaryBundle = {
  verificationSource: typeof G1_BATCH16_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH16_DICTIONARY_GEOMETRY
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
export function loadG1Batch16DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch16 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH16_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH16_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH16_DICTIONARY_REFERENCES.length) throw Error('G1 batch16 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch16 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH16_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch16DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch16 dictionary entry mismatch')
    return { ...g1Batch16DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH16_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH16_STROKES = loadG1Batch16DictionaryBundle(reviewed)
