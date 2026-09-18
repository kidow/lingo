/** Fifty grade 1 forms (batch 14) individually reviewed, including 16 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch14.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH14_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 50 approved and 0 held; 16 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH14_DICTIONARY_GEOMETRY = {
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
export type G1Batch14DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH14_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH14_DICTIONARY_REFERENCES: readonly G1Batch14DictionaryReference[] = [
  {"glyph":"椅","strokes":12,"corpus":"MM","originalMediansSha256":"1178bdeca9be2fb448873dc9f619dcf90854a929ed65bfa490ccfd7aead1ba39","pathsSha256":"18ef88edee9d86aea56da14e100cf9431f4c6ff531dda22559e7523bb82bb669","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/6905.svg","dictionarySha256":"4f69f147855baddcff8b5edc86ece979a42b39e96909fd1a744599af2ddb5c33","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"擬","strokes":17,"corpus":"MM","originalMediansSha256":"c4714aad2dfa719f3665fd11f9d6d874ef137348c4f1d58f294d9db18982c829","pathsSha256":"5b6a70a2e1ef2a6607736ff2c6b0aa5a2ef20576f8f981ddc291ae9adfdf5b2a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64EC.svg","dictionarySha256":"54dd49265d957ca993dea2920ca8af27f24317ef91e739bef64a15105c1d7cf4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"誼","strokes":15,"corpus":"MM","originalMediansSha256":"86192cf67a7e09b9d092b97043bc26164b4eb6fa29f942894652fda65d6568d1","pathsSha256":"2438aa992336046e5269d372ea44043849c1fb9ba45702cd7de616ef7d07d26c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8ABC.svg","dictionarySha256":"6ef59bbecfd6be8ce457aa5dd0cd4241d29daf8d4d3f1199f4d4968a42f88a46","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"餌","strokes":15,"corpus":"Ja","originalMediansSha256":"e017fbc23840c1aed2dea2fb23d876be11f952cddc292fc866e83d869547f8e1","pathsSha256":"8f7943f3e2b2968381f774c34b6c539ecb4c321e6d6dd7d6aceebba63840114a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/990C.svg","dictionarySha256":"db50b81102deb08e387e8ee514b9c96554c32fa70a7f9dc1701510e85c06bf78","sourceStrokeIndices":[1,2,3,5,6,7,4,8,9,10,11,12,13,14,15]},
  {"glyph":"姨","strokes":9,"corpus":"MM","originalMediansSha256":"e65086969729ccf207dad2a798677b828cbb3e140662710dcbcb3816f6718968","pathsSha256":"8f8e4886ba9a84296b2ce89297925dd63084ff53e29954b6e6f942424e54226a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/59E8.svg","dictionarySha256":"9af94f31917f650cf41d654b8c34c239bc9e1227233bad36ba8e524ed5609cec","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"痍","strokes":11,"corpus":"MM","originalMediansSha256":"03f109af8dc2985906cd73af5874604a6ba49db99ec10f494113b841687dadc7","pathsSha256":"e1374c471d9fc336a7cfab77d8737ff321b0125126aa7afe4540a4680aad4fc7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/75CD.svg","dictionarySha256":"5bdf126d335b4f1bad70a2fd2ebfc0739d7f8871b458c3b4c56fdd8414d2e067","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"爾","strokes":14,"corpus":"MM","originalMediansSha256":"fc12649a4d25ec9b731c3a2ff1e5d4557b61ea3c677fbf1dce2f81c6d73158ba","pathsSha256":"401e1dd3ff736866216afa153f80d2967c0e3e876da1478305f15333ea849ce5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/723E.svg","dictionarySha256":"e6aefdf3cc8b1b7872c6af61de4316f27665a23b293c981214c3367314e8069b","sourceStrokeIndices":[1,2,3,5,6,4,7,8,9,10,11,12,13,14]},
  {"glyph":"弛","strokes":6,"corpus":"MM","originalMediansSha256":"512f0d313bda42df5fd7627f83769db02d6766634b7361ef67f5d7690417d0f5","pathsSha256":"be0f80df8056b6f07bf4e7c86a7c894d21ca8c40c8d6c36c4d528dd84526a0a7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F1B.svg","dictionarySha256":"195e4b1bfb7c62e104b38f4ba11147ae2eddbc89fe595c9e77c5840317be1843","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"翌","strokes":11,"corpus":"MM","originalMediansSha256":"504efb8df3a71669ef3fddae4f9f020bf2f97de34d4fbd5a0151a74d52826c63","pathsSha256":"bf903dd235c07a4f837d0f5c7681f99ba888ab9d83ac0dc280139c6db75de643","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7FCC.svg","dictionarySha256":"d945b309bfa7514173f5a12f3504a9da5bbe79456b59e86076b20084cc075f32","sourceStrokeIndices":[1,null,null,4,null,null,null,8,9,10,11]},
  {"glyph":"蚓","strokes":10,"corpus":"MM","originalMediansSha256":"55722c2ef0449ad02f575bc4c6a61f53cf375d96313de37ffdabe48300567f07","pathsSha256":"98a93a671c0ee40ef189a1d6f4560ac7d4202a9884c8f1b12dae4104de83b221","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/8693.svg","dictionarySha256":"3fffcb862679acc96d336af0ebdb411bc58aabfbd21a82f9072f7a7c758d5518","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"靭","strokes":12,"corpus":"Ja","originalMediansSha256":"5cfe6e043e756914017c07978026ebb9ce4558274793666badadeff3b6b9c329","pathsSha256":"a00cdb9a35299f1089edbaa03bb9b3fef126f26a369764af0164d73b5007f280","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/976D.svg","dictionarySha256":"f8a423f5506428c08a181efdcfdde8b6185f8c3965fcc28edab4473ea1eda753","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,null]},
  {"glyph":"咽","strokes":9,"corpus":"MM","originalMediansSha256":"f7e8eb3a31bad3493bd5d867763b158187aefd99dc64c05114f2ab09b19448eb","pathsSha256":"6e872d6e43192ea4e7b8788d7b84e1b92e3431617de4d0b7a51425af040db37a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/54BD.svg","dictionarySha256":"8949579abf89114ae1d2e07cc6b642af831a71137244b4cf2f77d4a490c1f6ad","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"湮","strokes":12,"corpus":"MM","originalMediansSha256":"d92c848aa891a6a9d0db9b8987f7a23462358686d6cce8aeaee3039cd9b701f5","pathsSha256":"2911988992e17dc202e72f356d0316f513af71b220e5e43c9bf14183bdf07cde","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6E6E.svg","dictionarySha256":"f2f3bef741d8a97ad206a285f27a2011b47987a3d33409d75a4f3c276382670f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"溢","strokes":13,"corpus":"MM","originalMediansSha256":"e0e1bd2d445cd165acd0d8ede8e2ad3aa2592785d3f40e205296cabfd6961ed1","pathsSha256":"20750116303583411d62ab36751107a9b81281671fa8cb30164ae1d78a45beef","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6EA2.svg","dictionarySha256":"df5b54dbd6c468bffd797dee7daad6da64faa1cdd4ae8450637bab6490fca520","sourceStrokeIndices":[1,2,3,null,null,6,7,8,9,10,11,12,13]},
  {"glyph":"佚","strokes":7,"corpus":"MM","originalMediansSha256":"336c51447d0779264c36e4fc35edafffbdf50ec1725816af2815f9362eac5ae3","pathsSha256":"c2265f35a24861210dd1b596c970c1fc1ba3844924d7fcc0d11fa719b59a7e25","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F5A.svg","dictionarySha256":"6e42dcf72dd02e9a6a85907d6694baf45648fb2b4032e17cebe00f3066ded10b","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"剩","strokes":12,"corpus":"MM","originalMediansSha256":"3c3588d50fd3664480931b1494e0d008d8015a8c6e185c1892c3e04d40b65d9a","pathsSha256":"c453a0914eb6b17cbbb970fe6f41b80c4e481e6e79a3931417fec33e5eaa0222","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/5269.svg","dictionarySha256":"736617e2e78c6e021da6b1fb21fed8e763e8b7d2d2326056f887ed24ed944fd3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"孕","strokes":5,"corpus":"MM","originalMediansSha256":"9ac594661aa72dd72c2379572c68a911063c0d814e04fe930d1251d8cd7c9142","pathsSha256":"ee340e476e6f1edea315e6fab0d8d964abad3d207ad0bb0610150d33ae184d0c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B55.svg","dictionarySha256":"ae856df639ba9ef235249b5d366c90d3cbbba86f0277a35d3ecd16b1462788c9","sourceStrokeIndices":[2,1,3,4,5]},
  {"glyph":"疵","strokes":11,"corpus":"MM","originalMediansSha256":"9f18f49a47d15ec81fe44818efea7cd1673d0de354b73a43dd45bbea7977302e","pathsSha256":"f5cb28f825f170351e5a3d390e90f2c0f961f564597a02044d0952eed1065485","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/75B5.svg","dictionarySha256":"2aac2e8aecadb86a5c8146e8d684a15dfe4a97c05d8c3fcdc2f9c95c5dba639f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"仔","strokes":5,"corpus":"MM","originalMediansSha256":"857156790ffffc9415c2feadc3ab14d39cdc69267318bdf5a2930ef1ffb1f224","pathsSha256":"e117927049e324752a16fa164dab7375a7abe89c0d49382d15e38ee88a4169b7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4ED4.svg","dictionarySha256":"23a6c79dd7fc11267b0ea1db11dd35049936b2ce55635538e478e35c50a2855b","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"炙","strokes":8,"corpus":"MM","originalMediansSha256":"3d43af431572e208a8332d8f8f017ec80086ffc5f8b0c0503c8cdc6e752c5a14","pathsSha256":"76c88b7680bf0741838569ab6069291759ebd85457e28ccfa5be0af2229e77e9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7099.svg","dictionarySha256":"2c9ff3897789e1a1df11b9843c71f38bb1df4a398b326c79ce3eb6617ef28a08","sourceStrokeIndices":[1,2,3,4,null,6,7,8]},
  {"glyph":"瓷","strokes":11,"corpus":"Ja","originalMediansSha256":"c7984c0ed3e126667ff481b7f592879c5bb52c5f0191e67efc53291e976b3a4d","pathsSha256":"624b075a9699ad55089360af90dbb980f771662753b796c37873c504cdf462e6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/74F7.svg","dictionarySha256":"958bf175e3ab356c57d4d081bc6ab30b61beb680eb89858ff398ee22ba9281af","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"炸","strokes":9,"corpus":"MM","originalMediansSha256":"d0464cad237807ea0dffb6e357ca4421e11aef4b166f453302c304add901e3ae","pathsSha256":"d72b7d62c501b2d7dcc45807abef49a0800efe513aed0d05a28c0ba767a668ec","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/70B8.svg","dictionarySha256":"6b8d9441bebc5fd53613cf709328f196b32987384bd0418b18b6407e3992ed66","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"勺","strokes":3,"corpus":"MM","originalMediansSha256":"d54d79e5edc699d44286c08433f406d5447fe129787d3be4bcd910f64801ad0c","pathsSha256":"8d57f706d4a6d7aa9e11c9e33c22ae4ee54c6425e3b16be56c902548ab7933be","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/52FA.svg","dictionarySha256":"3bdc2a517c26804bca9347eed6f456f3c499440020cc2a39c8c0ee756f25d30f","sourceStrokeIndices":[1,2,3]},
  {"glyph":"灼","strokes":7,"corpus":"MM","originalMediansSha256":"d19e632d9679ce35808dbaeb1b638e1706cfa4eb372827f651befd02c15ec0ac","pathsSha256":"beb0d73857a1cb543148b803471ffddb8c935f4fe8ba67c5b496bbfef275faa6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/707C.svg","dictionarySha256":"8896a13005ca19d138f2ca85405ad099051f0e50fc3548f0c95648c29a15902d","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"綽","strokes":14,"corpus":"MM","originalMediansSha256":"1656e83310eb419032c3545de2997c9d9042b787e0e5825d3b345fad358ace72","pathsSha256":"a64012a82a674262279c5d7d5e16ee4f721aa71802d514013d0d6dfdf10f01cc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DBD.svg","dictionarySha256":"4c617f1016ce16cdadacc27906764e2dd923d7e60d53b14e92489ff3d1325864","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"嚼","strokes":21,"corpus":"Ja","originalMediansSha256":"3acae4136e6a96c5370c06e9c0b3dfd6ed4296a276741958e1b749f28e097fb0","pathsSha256":"625aea3aaf16293123aaeb1f8898eb9e82d1d3dacc5a1a5f1e9bcec3d1934da1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/56BC.svg","dictionarySha256":"e52f3fe5c289719ba10658f7e2f1a5fbf0f0e26c86973a0b388d60747c844abf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,13,17,18,19,20,21]},
  {"glyph":"雀","strokes":11,"corpus":"MM","originalMediansSha256":"c66e82c125d9f48b784de3b3431aee8986f1c42936fc3115c9afb3a8493b3cab","pathsSha256":"a01f70eb7a239ed14d83d5c81a66e9b958edaf28fb19867c0347df4c213d9f00","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96C0.svg","dictionarySha256":"4e0339a94f342032ec26ba86f501016bba68bb82925b5cb10127595d56c754f1","sourceStrokeIndices":[1,2,3,4,5,null,7,8,9,10,11]},
  {"glyph":"鵲","strokes":19,"corpus":"MM","originalMediansSha256":"75347a73cacf95eb8b4947a9034cd482a1b9e1e265f8dc1b0e8cc443e755e28e","pathsSha256":"510393dad568e4f58e744358510250707bce35fea3403a59b14afff6bcd5eae0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9D72.svg","dictionarySha256":"18a119fff829698d51f279e5986e1f6d8ed02f7ed3790257bcbe1b91d6b9a2ae","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"盞","strokes":13,"corpus":"MM","originalMediansSha256":"5ea825b331b0bda6ffc2eb90dc9c2e604049d582730e2b3245b740bca13b957b","pathsSha256":"b9d0ebaf0027c7ed36357f528d045cfae39be2573ecaf50dd9d5883f84a43ffc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/76DE.svg","dictionarySha256":"af98dfb9be196157ef0d16d563adc2bda6f7e15f9c53c6bfcc435b2679214367","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"棧","strokes":12,"corpus":"MM","originalMediansSha256":"75ce8556c5d61d2d263e6c3f509d199e3d368e2c925d99d98285272521410569","pathsSha256":"ea28177d39a98f443a2b08d301fb2fecade70c0d5f32f5f8b78385c518f42d96","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68E7.svg","dictionarySha256":"5f6957466c16b974f0bfe926c3bfbf4d0fb3fe74cad34cece9b8ff6ac65f380a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"箴","strokes":15,"corpus":"MM","originalMediansSha256":"5e4d9cc897e7ec872dd94772965a84d726b79ff362cf0d8b2c52bab4207429cc","pathsSha256":"5b02aecd6388ffdc9ea8e45a8e8e0868fb995f2dc466d9ebf2a91cd93743cf7c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7BB4.svg","dictionarySha256":"bc5decfb3c990a6ebcdd6313e2673fa9b2f82eeadab03391419b0791c251e044","sourceStrokeIndices":[1,2,3,4,5,6,8,7,9,10,11,12,13,14,15]},
  {"glyph":"簪","strokes":18,"corpus":"MM","originalMediansSha256":"516fd25c6fffd685b314508a515dca7b2d9b570efd4c5ce380406f21f06c334a","pathsSha256":"bfc2d42ed534853099361938ea4c046ced75212b9d4e8d73902d0ee6595d2a9f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C2A.svg","dictionarySha256":"325fc77dd7161c25085c1e4c22b05d1d4fd4286362afebfe9daaa2ad9070b292","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"檣","strokes":17,"corpus":"Ja","originalMediansSha256":"8ae03713d96579118890fc74ebbebc56cbe973ea3f9f099ce6a6f8f1139bc346","pathsSha256":"687e15450cba27e75aaa5c692a00bea86a4f0e7283a193e75b6bb0103a9309b9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6AA3.svg","dictionarySha256":"9056e16b76c0497c378dc128dcb7c9353ca9f211c18543b8634a45f4aa566736","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"薔","strokes":17,"corpus":"MM","originalMediansSha256":"852bb7a07c3303a971d8571370b2114d83de289b68ccf3ca93fa47629524543f","pathsSha256":"e0f80b5165776ff3cdedd00ec1f5e09e4a4d2ace5bb6c7929f512cb5a0d5b9bf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/8594.svg","dictionarySha256":"98324194a2658631af6be4cede1ad4712d401ef2c0fac414495da0a3439773a4","sourceStrokeIndices":[2,1,4,3,9,10,5,6,7,8,11,12,13,14,15,16,17]},
  {"glyph":"漿","strokes":15,"corpus":"MM","originalMediansSha256":"2252dc64acd8b3f081fc466125e8144a00dc11d7ebb792490e9b998cc8d50b43","pathsSha256":"6b0625b18815ed9197f0d14a459ce2c74c6d97c221290f780ac40d5d9d597c28","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F3F.svg","dictionarySha256":"bfff21ef102167feb5efca4dfcfb893d0b72b97efc22fab85adae3d6727be4b8","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"醬","strokes":18,"corpus":"MM","originalMediansSha256":"125c4eb9dae82385f0ad0cb5ebab4781e094d10c88fb3c98a107819885b5aaef","pathsSha256":"8b317e35657e5dac385f843cda3aebd392c4c63783ab1dcaa152a1428ee28605","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/91AC.svg","dictionarySha256":"f62818651692e2ac516491b5f29318b01685f52bac7253cdd4b65b50897ebaf5","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"杖","strokes":7,"corpus":"MM","originalMediansSha256":"4fa68d72b4b872f4afe7e28621c2f82795999c41df387c9b94e0715c79c83094","pathsSha256":"41b75d0f29dfd9911a5daaf5593ef3ff4f000af02299af0fe336da44adb05251","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/6756.svg","dictionarySha256":"8b50becae2006dd5efda5875383143eaec81ec02860aa2f173fcc1ec2656956c","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"匠","strokes":6,"corpus":"MM","originalMediansSha256":"f1eb6b24e9f38f752df6399c4cd04726261203e31186fa0d60d9f325c78aaee8","pathsSha256":"ee5b4f31f79126c72e028a166322c63303ca40743cf2fd5cb54e6154f7374d5f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/5320.svg","dictionarySha256":"123d8c41a81cf4e2031ba53166338bfe8db364223919fafb7273a37d5898fd54","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"仗","strokes":5,"corpus":"MM","originalMediansSha256":"1917cc60b0ca05dd32b1135ff7b7b3d07be9cd07a7d4143743e5b744100e65ed","pathsSha256":"cf467069f2cda1f279e99f8dfcee7b5b0469d8f9661124b2b459d383232a9dc1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4ED7.svg","dictionarySha256":"5440479db99131b4c34c2f4bf3836534ccbf2790154a71245590db3176214d6d","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"齋","strokes":17,"corpus":"MM","originalMediansSha256":"d0811afe004cd5302198d0af4e2cf8702748600fab204fcbedfa5c85c485d125","pathsSha256":"8c16b479f4a3c293a80d772aaa1581a96b93e585df706b217fcb08d78adf6d35","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9F00/9F4B.svg","dictionarySha256":"3f923293e02a49feb14747ee76d98c2985b77c945fc9eb32060cc387686e63f1","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,13,14,12,15,16,17]},
  {"glyph":"滓","strokes":13,"corpus":"MM","originalMediansSha256":"247e03788851139fbf5abd235c095feac0de5cdae9f4c701985b8ea8eb3c265c","pathsSha256":"7ec10854b4592101e66c3a03d25477078c6cdfc6433769429e3a56c539c08feb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6ED3.svg","dictionarySha256":"d83f494c0f2c8b1af20757f29df6f75bfeac8d1cc8e98933d6f86c96a4e357e5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"錚","strokes":16,"corpus":"MM","originalMediansSha256":"a491eb35bbc1a10204db08709e31234a7b51405b55003943f3f0ff137bf2fbf8","pathsSha256":"0388ca35e05b5a6cdf75fce418d2789b644f45e5dd09be8d5e0fd8549524a1ed","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/931A.svg","dictionarySha256":"307c4105c161d6f8248b58b93f5998d17626b67ec0500e085d6ac92fc968bf92","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,null,11,null,13,14,15,16]},
  {"glyph":"狙","strokes":8,"corpus":"MM","originalMediansSha256":"884988bd161b5bcc902e9efb71b41683a65099e4234350924399c65150b40f36","pathsSha256":"8039682d6bef3f032c7bfa78d39ac0cc20eb095f4b418ab8616c6d02e90df3cf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/72D9.svg","dictionarySha256":"9bbfb643647f343cd102fc035b95ddfe801934fc4c772429eeed61d87db9f2db","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"豬","strokes":16,"corpus":"Ja","originalMediansSha256":"3a9b63ecbb953427224bc7c83ad96d13da816f8287a1dd99ca6546b4e1b4fc4b","pathsSha256":"65090fcd102b8744e91f91d5f8ac04009c3f20b037bf3b4d92872535bb071c59","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C6C.svg","dictionarySha256":"f4cbeffbb007d90527d714fb3c2c70c3349c9f28ac0fcade8da58bfd14e0ded4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"箸","strokes":15,"corpus":"Ja","originalMediansSha256":"ac5227e0859ab8be60d0c8d6dd92b58fb9053d8155ac5bd367791f13ea1aec9a","pathsSha256":"8a20b54a83c48fe0b574d027bc3d234c9527f969573387e9ba65378bb4907b0c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7BB8.svg","dictionarySha256":"e7d22676174117c8335505741a4f9f889f0b1817abc4299d2a3c68e9f6427d99","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"咀","strokes":8,"corpus":"MM","originalMediansSha256":"49308b9e999b81aec87129fc6cc60a80086e4b18dc9d26ea320cd00c1200e6bf","pathsSha256":"4e7705c9fa246f9a36d18a62dd60b9a5e72a604771b84dac548ce2784836c825","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/5480.svg","dictionarySha256":"629652746bb2742bc1e7dc52b5938e3eaff852ff1bdf4c9451580f05cd229147","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"詛","strokes":12,"corpus":"MM","originalMediansSha256":"c85d40ea25ed2236b26e7e633287242aa228f43812f0b1fbd9de3d9abde7b108","pathsSha256":"ddab126667a2520290a388991181c9daf373ff18ef3ed63db1922ac70cd4a21f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A5B.svg","dictionarySha256":"8b10b14e0f34a37ab83e1e7dbbd30bd43ae24c255d2acc2a4fba13e878fc140c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"邸","strokes":8,"corpus":"Ja","originalMediansSha256":"3048b364fdbb9f2c1bfa136e9b570b34dddeaa8f779334a04df9494b629be04a","pathsSha256":"af25123b293314615f5590a1678096a0ecd82972cddebffd15b67e8f12a394df","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/90B8.svg","dictionarySha256":"7bd5e47e13ee68a686b672544ee25aa9fe2606a15af72c271f22dd7159cc1e4a","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"觝","strokes":12,"corpus":"Ja","originalMediansSha256":"b44919fdfcd005f2bc0cff7adfb2f7bcb8fdec2320fb9ff094c617974ef25cbb","pathsSha256":"10575ab5ed22e63623803be41059bf84c73dd08a4101f26da495df1b62e91365","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/89DD.svg","dictionarySha256":"73b43c5ddc4edd5c5ff3c223d19edcf7348d7de1b0d0629a008660aef277f7c4","sourceStrokeIndices":[1,2,3,4,6,5,7,8,9,10,11,12]},
  {"glyph":"嫡","strokes":14,"corpus":"MM","originalMediansSha256":"367596fd95230e7c1f17843046c8282f06587c3d272f22c96f00281907508248","pathsSha256":"16e936b510980857a38b50bb851db814a339d63d327945ead27578143b87d442","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5A00/5AE1.svg","dictionarySha256":"3d3d6517d00ad3a9f7c6bc1aeb55424cfc520ff06fa56c116c9e3b69a5fe1a6d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
]
export const G1_BATCH14_DICTIONARY_REVIEW_SHA256 = '64af57e64ac828d6be25b9f20ed50eb99b0b043d903e02f7f49a4069188e50c9'
export const G1_BATCH14_DICTIONARY_DIRECTION_SHA256 = 'b2b252cd44ddaaa548ac041818f2a2d347e35dfe45f93b7454132e1ae8beaecb'
const referencesByGlyph = new Map(G1_BATCH14_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch14DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch14DictionaryMetadata(ref: G1Batch14DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-19',
    geometrySource: G1_BATCH14_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch14-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH14_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH14_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH14_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch14DictionaryBundle = {
  verificationSource: typeof G1_BATCH14_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH14_DICTIONARY_GEOMETRY
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
export function loadG1Batch14DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch14 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH14_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH14_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH14_DICTIONARY_REFERENCES.length) throw Error('G1 batch14 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch14 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH14_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch14DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch14 dictionary entry mismatch')
    return { ...g1Batch14DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH14_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH14_STROKES = loadG1Batch14DictionaryBundle(reviewed)
