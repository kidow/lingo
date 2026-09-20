/** Fifty grade 1 forms (batch 19) individually reviewed, including 8 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch19.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH19_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 50 approved and 0 held; 8 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH19_DICTIONARY_GEOMETRY = {
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
export type G1Batch19DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH19_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH19_DICTIONARY_REFERENCES: readonly G1Batch19DictionaryReference[] = [
  {"glyph":"跆","strokes":12,"corpus":"MM","originalMediansSha256":"ce0ca03b3147aa56338cc9702c2577e4442e131ac877cc38900e557533c74639","pathsSha256":"df6644e4a86b3867dec71822fea5bc2f6a20ff24bebd137285d14979b9684b01","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8DC6.svg","dictionarySha256":"cadd4f9a984dd8dea1007fcfcfe5413d0025c490a0016b9c9cd614cc7403e648","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"汰","strokes":7,"corpus":"MM","originalMediansSha256":"1c27ca56af03112ac0e8182b66e744e04fdefffb0ebf15438351ef820557c017","pathsSha256":"3a8605a184708df85e790974a4db396be3a7db43dbdd3800a74c02ccabda7c18","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C70.svg","dictionarySha256":"25b822fa9c534c1c0d675388f503e692e68944bff523a3f836bb3539078de0c8","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"撐","strokes":15,"corpus":"MM","originalMediansSha256":"e2baaf68dad4112a0dd5b7038ffdde6c3f5031ef7485ebff6b323c7c7785ce31","pathsSha256":"eaeb1d4e357f0b15698eab275a51d91b086171d818b688a379befba76fb2f7de","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/6490.svg","dictionarySha256":"c597322c3fd304c6ddb94462357d20fb1c9b7e4385f5f3aac2db6b0071aef10a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"慟","strokes":14,"corpus":"MM","originalMediansSha256":"da641012aeb7ca46fdb9c0f64be0a8ee6d54dd4d4c26699a82ccdc13de6640e6","pathsSha256":"1332d4844846520eed3b071d268dfc4ef7dac4909b516e3b98fd095650984231","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/615F.svg","dictionarySha256":"57cf42617d718e7fc8ede3a465900fcce2bce2ffb43ef71f467f5c6b5b3db779","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,11,10,12,13,14]},
  {"glyph":"桶","strokes":11,"corpus":"MM","originalMediansSha256":"e0cb1cc22d1f259863e664cb7cb1948c20265fb06adcdfe0ca2a5f9655bbfbe0","pathsSha256":"c803601093fd4e934d5fa45549aa69329e4fac81bd6c91f013c63cba444f8f9c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/6876.svg","dictionarySha256":"1b79a5a9f3adff62c456d7d5af038f72c870cd5dff26c12cf0afa64c34bf30f8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"筒","strokes":12,"corpus":"MM","originalMediansSha256":"4d9aa75884b18076da972b386b220b9b214869b486a1800f70c37a117ef864f0","pathsSha256":"d8f9362599af417894490c2c861f654468459161cf02f4725e37e2b2301379e8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B52.svg","dictionarySha256":"30823c67ad65fd5cad90e0c66543dae4eb3109267831911ea00659c772f45397","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"頹","strokes":16,"corpus":"MM","originalMediansSha256":"930422cc77f2bc8275e4c567ecbc1f399e515cda71e567ab310020956e83b29d","pathsSha256":"2bd6699b3fae790d7409c83b6386aeba90af9ddc4f1b26bca784011fedba9a04","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/9839.svg","dictionarySha256":"b3fa4732622eafd444afdc0fb2c847ffcae7e6c1f824f2692d390cb53b5c8416","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"堆","strokes":11,"corpus":"MM","originalMediansSha256":"f3142c2300fbefb2a9b004ba114c6785ae8167f77815bc43495bdae29b22a02b","pathsSha256":"bd1eb2c306a5cd728f38568ad213321574909f175d639268717c879215c06f93","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5806.svg","dictionarySha256":"82bd39e08a4e4f23c3a2fd2385863fe14737b3f01920e472bfe19195044e094e","sourceStrokeIndices":[1,2,3,4,5,null,7,8,9,10,11]},
  {"glyph":"褪","strokes":15,"corpus":"Ja","originalMediansSha256":"1d3a28f59f1db22b5d34400e7a340f5fe12aa330c4a1a0700bfe5749b2c30e97","pathsSha256":"a5e04d8d098a6515106f1ed426076f0bb949373269b3a909164c7a0ed1f59aa8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/892A.svg","dictionarySha256":"4f95f82d25bcdda81f117110c327ed42a13d16c4d9cef3a6e7f018a58ce383e3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"腿","strokes":14,"corpus":"Ja","originalMediansSha256":"7e0458d5aedea0bcbe25f4127577865058c12a930f39a68892484e62d56ae037","pathsSha256":"00f2be5c128b37bdd0b441d40c6ac94df45795eedc6cc4bab216a1ce8ef26a04","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/817F.svg","dictionarySha256":"4335c989df1ddb5db2103644ac960bff459bc7cb3885de9a2e2af4803ba5e218","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"套","strokes":10,"corpus":"MM","originalMediansSha256":"7f10073f00418ddedcb38ce53aa04d13ce20e33879c800917f3751d15fd61456","pathsSha256":"ad2cbc764d3cac34c28baeecafe6079688006e7ff664cf8755e9e9b419b6a474","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/5957.svg","dictionarySha256":"30eb72fe2d9086bd1639f8d8634878397754b194604f96d51ff25919b31280da","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10]},
  {"glyph":"妬","strokes":8,"corpus":"Ja","originalMediansSha256":"cfaa03a18b16240129cc6d262b4494b0ffc0cfd0e99ffd74321f08837291bdad","pathsSha256":"bc0aa83720c6e83166fa6e2a7245abb87f7e05240387ca3b29808ae05b3712ae","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/59AC.svg","dictionarySha256":"09b1e619986c6541d47ba1252f979bc3033eeab26202dc26030afd5ff416a15b","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"巴","strokes":4,"corpus":"MM","originalMediansSha256":"5b179e1ea95a095fa4b02a73fa157ff697a3d42631dd3c762a02afc4af658480","pathsSha256":"948c716386353889fbda4bed9f68c34695864f113f04bd2d7d52b5597e7d05b4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5D00/5DF4.svg","dictionarySha256":"f339f1adc4c9cd7955913e18b8d3fc74315a356e540c9436176463420dcf7110","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"爬","strokes":8,"corpus":"MM","originalMediansSha256":"7f0d4a7b5584c88ba8c00ad806ac93d64fbe7dcdf2d5c18e0e80d953e0e89886","pathsSha256":"88a5b45d8f14eef6d590754c76b445fae7bcd2c2e2f4f32d04916792bb539e06","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/722C.svg","dictionarySha256":"6ea1485fae620354cf6405a9192f4b57a0bc99f47782290eea0fcd95856fd6ea","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"琶","strokes":12,"corpus":"MM","originalMediansSha256":"52033ff39606b388d675b60de5c838995f350351f0e27f53eada29670fd49c7e","pathsSha256":"e2172c51f8affddf87a90863d53e7d0550f8f36db80360c4b881651145a469be","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7436.svg","dictionarySha256":"1960918c549eba903beb29bf9de4923634554b1e3a3854756521ee0fe03e5e45","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"跛","strokes":12,"corpus":"MM","originalMediansSha256":"56f131a214e2dc2dcd884bf68e96c66ede44a15a3f15d747eebb404b13297f50","pathsSha256":"0471201b9a3a51665cb3439b74c249f7e4501ae920da874f79acd74dfc10b0fd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8DDB.svg","dictionarySha256":"eea220c2e9d97078104ee8b2b43ae5b969a51757ca7bca54f2028cf9ca22a0ce","sourceStrokeIndices":[1,2,3,4,5,6,7,9,8,10,11,12]},
  {"glyph":"婆","strokes":11,"corpus":"MM","originalMediansSha256":"e9bb364fe170e18474ed2c16e8afc883bb34849a05b7fbe86a8c3a700734bab1","pathsSha256":"d4fc0532973ee258f65e23c4922fd44d74cecf0eb8592e02bb4da468b8111ca9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5A00/5A46.svg","dictionarySha256":"ae1d2c3035688da21606037b5308f466bc123a312f9b6270b07082a683280a01","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11]},
  {"glyph":"辦","strokes":16,"corpus":"MM","originalMediansSha256":"e5e6ae740e8c89ce06378924ad1c0503e6164b03ffb8c19fe2934b5492efd7b3","pathsSha256":"adc7c0634587f1e6041c4726c1b2d47f86b49430b2a8fad4410da3664491b69d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8FA6.svg","dictionarySha256":"8983cd6fddf1ca948067259c54c566a1cf20263f7c38258061df769152c8385d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"沛","strokes":7,"corpus":"MM","originalMediansSha256":"97ded563b70a518457ee1c4b6155e50ee37450c5743bcfd5dbeca126ebc1d79c","pathsSha256":"cb6c97c301e2247a30794d06eb8ef7e6086f16a30ed2da2666bc7076d6c96fba","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C9B.svg","dictionarySha256":"039c55c2c727c480895167eb5366e33530ce40cdd9093bc4ee9b137e99266cb2","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"牌","strokes":12,"corpus":"MM","originalMediansSha256":"939140327e990c753191241084173d825aac16e6294e30425886a2061c540255","pathsSha256":"319c891d6a0c4873778089f6e6d9ed46c5fe0f05a472fec44ab94726de945351","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/724C.svg","dictionarySha256":"66e7dd8216587e4951de09d2ed88fd29f7c3906884c9ec38e8b0101dd50c1f4e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"悖","strokes":10,"corpus":"MM","originalMediansSha256":"8ae4b2fbad8d56b6c02bff8e9b213317cfcc5f801b08cb39bc0d0c20501315b3","pathsSha256":"ddf38a25519e468e2c3acef74deb6b9ee2067751f88a09f520d22f4d11f385bf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6096.svg","dictionarySha256":"b714fa0bad6913192aa928b981dc26c143e8040fb5cb473737de316cd923e1fd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"唄","strokes":10,"corpus":"MM","originalMediansSha256":"baa903a160967bb4dd7b8330273d3f723c33016fd3bff66e95300496ff67be56","pathsSha256":"19afba0572a99b91d0f91f4fcc667c12c0795e00ce16d0ab1468de71a9dd5b76","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/5504.svg","dictionarySha256":"b57cec11a8277a8f232c226337403ae1918ac7a1e0e425d30eccae968f33c9f3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"佩","strokes":8,"corpus":"MM","originalMediansSha256":"975024845af4e2ca9a250f25e3e1ac265ab6ed681079ad2329d7a806ad2a7717","pathsSha256":"e661b902f74943117f898ca1970d09ecd4247684d1e113c8b0a29ae31ff1ff96","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F69.svg","dictionarySha256":"25c7b5f803e33e1912f173c9173577d276c3676e298284ace1581b8a7d5f19a5","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"稗","strokes":13,"corpus":"MM","originalMediansSha256":"c4b3ac4d18076c26a2869079f136e5397b7f206c18ec5ead493cbd4b898a30fa","pathsSha256":"cc615b7957bd1e2eb3c03c6278ecc6e9f9730571f86b194051a13b63ce82f395","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A17.svg","dictionarySha256":"f65109eb7fdfc667a09b69a11ed09f3f5f96a1b22e3dc791128688f07b57d4ee","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"膨","strokes":16,"corpus":"MM","originalMediansSha256":"76c5bcd8ae1ddb612955443466642dc40ecab22851279d5e0c5798494a288b6e","pathsSha256":"1577f18d51286ba2ae4f0338bb3b765c0305baf6427ed0a0039129d7868d4b3d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/81A8.svg","dictionarySha256":"dfb01e84463e191390cdd1efcf7f1456edced09eccba3f1ca706b6ba649a7f26","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"澎","strokes":15,"corpus":"MM","originalMediansSha256":"946c186150a7abf5e4132cccc583ffaf09aa52973b8fa9a0f37577467c58178f","pathsSha256":"2a6124914011d11bcd0c576e703d57c6572f76f6ca655f644faf0713d3485925","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F8E.svg","dictionarySha256":"a9fe9a4936c2bf55c41a78cf00b53a086703f9091f309ae0ed141fdbf2dbe1e8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"愎","strokes":12,"corpus":"MM","originalMediansSha256":"dc61cb1d09167305ca6df79c180ec28600f206240b37b6ac52de5146aa617e6b","pathsSha256":"4d28f4ec307fb06972a29d072d27b79bf7a7107cc154c9dce4f0743c81e5790a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/610E.svg","dictionarySha256":"76f3e73798fd17b1dba14fdd6694384bef68434f67c351d6e328a12422596b9c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"鞭","strokes":18,"corpus":"MM","originalMediansSha256":"610a654867fbe1a50bc7eafc103f203b0fead0e2369bc17969ee996df33e1b8f","pathsSha256":"70de1dbd90f694ae7ea0cd16d86f3a22564c386df12cef96032cf635dd62df50","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/97AD.svg","dictionarySha256":"c1e73c0ef901f9fe5b6111e54279228fab103e444b316de32144117f7bfb31e2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"騙","strokes":19,"corpus":"MM","originalMediansSha256":"9839439f8598f7e3ea4ba57da11cc83f5182f551105f2b642d9de2122a1576de","pathsSha256":"eccba96a9cad72f54581a38e6e787ad2e893dbb2af1232df708e5294eb824342","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9A00/9A19.svg","dictionarySha256":"7ca79ff8fdfb3b79bfa70cfd865475d0887371908c9fd9bdd4fefe84274e14b9","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,null,12,13,14,15,16,17,18,19]},
  {"glyph":"陛","strokes":10,"corpus":"Ja","originalMediansSha256":"664c23377827a22ef6eb977d9afd2a43b73c98950d6a393ab034013e71e13054","pathsSha256":"2b5f3d29b15858fd38445edfe5a026456c98dac43c5313cb59233103fd84caf8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/965B.svg","dictionarySha256":"f16d82416f87b1bbfecfae6d2b408691f1b8ad62b85bba428aaa402f3df407e6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"疱","strokes":10,"corpus":"MM","originalMediansSha256":"2b9e6298bea2fa2016d9c6ef48501d5f22ddc68978d4fcb3e95e9c9f7a5dc621","pathsSha256":"cf6bd6b1a31aa46326b1eff4c35fccbe845d9905f2ea443f5d9cd44698e9a060","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/75B1.svg","dictionarySha256":"04191848052dd8fa5b0ccefce8fe8e5c5024d6cfb4ce9edbb0c0188cf9a7c234","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"庖","strokes":8,"corpus":"MM","originalMediansSha256":"6c7402f4ce8087bba01b495c5f9ac88a8a55e2df8ae6b6943f31ec67ec41b25b","pathsSha256":"6399d185d5cce59d11421a1f27c908e4bf9f11a8af227585dccbc52a93a540fd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5E96.svg","dictionarySha256":"ada8c443072df9b5cc29662b657d81f268d20dde9acccddc9b83343fe3f5f9a6","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"逋","strokes":11,"corpus":"Ja","originalMediansSha256":"3bdc1ba9c63322abb4de87ce6c0d74746535c4f89c80423b3b685421e10a1a4d","pathsSha256":"f07ef5178410b763c38ca2a9ae95e842190da2c0aadd08053243cf3789006ce2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/900B.svg","dictionarySha256":"44db80d4f3a86f498065520661803f05f6a89b7561504b6f9580541b0bd2df61","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"褒","strokes":15,"corpus":"MM","originalMediansSha256":"b65449fe96ece6c8ee0b905c620019136646dc81a6fa1b5c0a2ee4d2cf4c939d","pathsSha256":"a336da5ebf49a631040c53fb243abbd6e758ca39a037d47df17342275faa2501","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/8912.svg","dictionarySha256":"a2cfaa1ab8a0b817375428997d0966edc943a7d16df02a1eaf28b9143ffebb1e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"袍","strokes":10,"corpus":"MM","originalMediansSha256":"e98eb55a47f23105dd4a0aed1431d30b948db26070aa888fdcab9aaddc5b5b73","pathsSha256":"69ac6be2520da72f7f4af0c999e4a5fd5f5067e7cb6637a455e4a78f3bf284a5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/888D.svg","dictionarySha256":"6b60aabdcf3dd4ef849bac9d9ecc09c6bcedc6c21501df40cb2d8ce7261f7513","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"匍","strokes":9,"corpus":"MM","originalMediansSha256":"b7686ea2690affadda25e6fab0514685ec36e6882f21a119ddfeea009acb4539","pathsSha256":"307f0c3e16c097fcf221da8ef59b42a85097b60276826f5bca281ddfd7d0d884","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/530D.svg","dictionarySha256":"257495aef6b0a25a766a238eea30c1990a3070d4d7f5287f91b4a999eac124b6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"脯","strokes":11,"corpus":"MM","originalMediansSha256":"03d2dda50a3a69a62f8b295ae134938f213084bb12abad2928eb6edc205f90ef","pathsSha256":"874350dce7ccf011f29ed26021f00278bca6cbbb269e6bb2153305877512720d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/812F.svg","dictionarySha256":"c44e3b8f37f4e3c94c4c198f1febfc29a5f7fa47ba7cab21e0e45155d03d3c50","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"泡","strokes":8,"corpus":"MM","originalMediansSha256":"d2048308f156651f50642789b371efd1f818119b84d466599d05a342b75978dc","pathsSha256":"b31f2777ba73d3664df3063b5e83b0eeacf83c5741c19afbc133d47effc57d89","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6CE1.svg","dictionarySha256":"a904e46cfe04c926272f54db04e8b82b69e6eaf94790d4895914c0175c44af1b","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"圃","strokes":10,"corpus":"MM","originalMediansSha256":"9389c3bc5df1ed62640be7eccbc665826c89d8cd2edce485e82732572764a4ec","pathsSha256":"3e705acf9dcb413815933db7e4f1ba076b6f7a14c014ccfb8ea46ef9c4960242","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/5703.svg","dictionarySha256":"f508e4722f0b2b80030c6d28cf63d3169fcd9b80da4cfe9cbd7fc433806381a0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"哺","strokes":10,"corpus":"MM","originalMediansSha256":"aec3e60353214686e9331333f4273d4a11d8d4e0cbf6ed2110d4d417edfd842e","pathsSha256":"b3e7184811838a0ec6cafab8998f387cdec458bfc10ceb127ae7cf6c9d1167f6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/54FA.svg","dictionarySha256":"b6e3a6eac4280fdb46cc8f5d3fa9408215562b47d37db92e99b6071281e1d6b8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"咆","strokes":8,"corpus":"MM","originalMediansSha256":"0c71f534fda6caa25ecaffcb80dc4c675f969f7df956821f23a189cd97f0b16d","pathsSha256":"f4c3b1a42180ea8a8ecc965e9d882f99a90f1fb407fd6bd8514760afe506c1b7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/5486.svg","dictionarySha256":"5d62485ed1bc1d5a34399d5bb317847282b369354c3b77811144b7740ea6b0fa","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"曝","strokes":19,"corpus":"MM","originalMediansSha256":"c43392c703ed6e3fd9c8c1706f1c3c054a0acbb52dee829cb643f7d70c1c3c1f","pathsSha256":"0f864a5108c343c24804a8e2dfe286ecf3f20a034a96719e4809ffe494099927","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/66DD.svg","dictionarySha256":"de12443c25856fab410cd238b3418170ae189ad433cbe7162642c68048e7339f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"瀑","strokes":18,"corpus":"MM","originalMediansSha256":"0872c5716025c0a073fa96d255392a6eb91c0c1c3a4d8aabdb03f383ec7a70be","pathsSha256":"a2103532a1f59e0c5e787928da48df2e02507f72317a31eb44b3bae88d3a6ad8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7011.svg","dictionarySha256":"de4c4dc2e64f39fa10f5c7d415f2b004de72c6cdb4e72543a8360c25325080c8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"豹","strokes":10,"corpus":"MM","originalMediansSha256":"121c9329b835b4768516e26aece123f0dd43deb8a0fb14455e24b5d9099de203","pathsSha256":"dc72391efdcd9f45343c871fa1c44812e0a5b626ba6696a646b4fd942c436678","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C79.svg","dictionarySha256":"c89465e8b9471deab8aa3fc3d724c13fa7b72341b27d276e8a6cbad6ba30e0e4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"慓","strokes":14,"corpus":"Ja","originalMediansSha256":"9c0905e07c5a04c5a45ec83945f78e0db87c4e4e9cad0561a3dcf66ec4542bd5","pathsSha256":"ae335e1e8ec998be451e591ceb1cdfcb64174db716ff3d8a5c606752f092e6c8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/6153.svg","dictionarySha256":"b9fa5350e5868da3a17e80fec3e8d01574d6f8520fab325fecaac18c6acc18e7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"飄","strokes":20,"corpus":"MM","originalMediansSha256":"bbfea1e95a75c9285e809c8863dd22b369c6f50b0124ea93500c53c9541e1e81","pathsSha256":"e1b8ab9c1765ba806c1ce75c51df97edf7af20ed79bee95dec2ab52f396532af","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/98C4.svg","dictionarySha256":"18e521afca770014b24120b27a5cb9f83711777887b1d1209a729bd5958331ee","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"剽","strokes":13,"corpus":"MM","originalMediansSha256":"e760b897b89ca8e4f811bd11bc80dc83c035c3d106bf2378a15df9652a8b2cdf","pathsSha256":"c8613f53ae1183f1b48111330819c56f8efa4f944def5a00cb0510f8f12ac9e1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/527D.svg","dictionarySha256":"09921531bacc242c52f99af11da1bdc30ce92dd2be84c8c44bac090a837ef84e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"稟","strokes":13,"corpus":"MM","originalMediansSha256":"a759ad876888613e51de183a3b108aeac6617a17562f8554edb559d339b60caa","pathsSha256":"1de414519cd1fd979df704d34c5c3eadf89498f7e5c738f370dce972737c2a86","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A1F.svg","dictionarySha256":"636571332fcc3c0264e1201bce554d37bad59eb7ec9551a2e4d4b2574662a171","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"諷","strokes":16,"corpus":"MM","originalMediansSha256":"d3a7211b9c667671aa029df1e452e561bfdb0d0e694064a8cc38bd0660904b4f","pathsSha256":"080193713ba6d57a800f1b1571ca61009a923436db55b14e598de148efd2460c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8AF7.svg","dictionarySha256":"edbedffc4f5b597caf548704ffb2ee95089872886e033b7602a3bac310777732","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"披","strokes":8,"corpus":"MM","originalMediansSha256":"d5a5c40268352e567931ed674b920dc6da1079e91163a342e0987e1e9797eef8","pathsSha256":"1336cf7ac1b2d5fbcdb3cc741b37f26440abc36856a462152c750e5dd7dd77ff","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/62AB.svg","dictionarySha256":"25c3e64c1db16494a0c7d6c85501271e03b4b358ff90496c614285065cf71001","sourceStrokeIndices":[1,2,3,5,4,6,7,8]},
]
export const G1_BATCH19_DICTIONARY_REVIEW_SHA256 = '2f5ea9b7660ccbc1c66233d076f8f01f67f0d0334959b3bc1eeadbd8c81a2f1d'
export const G1_BATCH19_DICTIONARY_DIRECTION_SHA256 = '39fb1e80e5e1c4aef8fbf9209ea6b05ec1e8a29677770984addc152e8d56b689'
const referencesByGlyph = new Map(G1_BATCH19_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch19DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch19DictionaryMetadata(ref: G1Batch19DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: G1_BATCH19_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch19-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH19_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH19_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH19_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch19DictionaryBundle = {
  verificationSource: typeof G1_BATCH19_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH19_DICTIONARY_GEOMETRY
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
export function loadG1Batch19DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch19 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH19_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH19_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH19_DICTIONARY_REFERENCES.length) throw Error('G1 batch19 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch19 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH19_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch19DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch19 dictionary entry mismatch')
    return { ...g1Batch19DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH19_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH19_STROKES = loadG1Batch19DictionaryBundle(reviewed)
