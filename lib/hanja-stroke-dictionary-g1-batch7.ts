/** Fifty grade 1 forms (batch 7) individually reviewed, including 9 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch7.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH7_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 7: 50 characters individually checked, 50 approved and 0 held; 9 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH7_DICTIONARY_GEOMETRY = {
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
export type G1Batch7DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH7_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH7_DICTIONARY_REFERENCES: readonly G1Batch7DictionaryReference[] = [
  {"glyph":"挽","strokes":10,"corpus":"MM","originalMediansSha256":"f454e88b37f9644090356a46c0860c01fe05c5f78b5c515ab24aa29627b09a13","pathsSha256":"5410c082eb47cec76031a5199907a7e5d606964c9b43eedd799b17b6614c15d4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/633D.svg","dictionarySha256":"84c5c786c2c7c1bea4143802f454ca814dc2ebbd88469d75a554b4797187abb7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"瞞","strokes":16,"corpus":"MM","originalMediansSha256":"b573cf05d4a469e281ab4e2eaee7052ae4be6bd201b505253b75ea698b02a502","pathsSha256":"c36e39de821ab95ed8c28314712f7721f3d313760d7b9d0dabf5d861376a5ec4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/779E.svg","dictionarySha256":"9ad13d66439058dc18362e47abc8564cc465aed9c32a55d1543101008e4d888c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"抹","strokes":8,"corpus":"MM","originalMediansSha256":"fc2e559e88a2fcf08967d8723262c3c2c047ad3a23c7f6fb06e17a30625bb0a8","pathsSha256":"d9590b48bfe2e24c0a627ec025b5bb6d658c38db8e32e12d48cbfe33f0bad09d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/62B9.svg","dictionarySha256":"8381c9a6260062d11ab1e1981c464010f93e797d59d1efd98ec1f7926de8e9bb","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"沫","strokes":8,"corpus":"MM","originalMediansSha256":"88ba7ded468a0e8f41c41381375272505c6b27d2520464edbd25ad774ce64118","pathsSha256":"31eb61330a974e20ba3fd68dd706220cd98997fce97c55c882504aa96cdf14bf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6CAB.svg","dictionarySha256":"4cd9a7ad33a674d0d54ab2b7f94c4c46b74dc0fd7e8389384c820ad09b3ebe06","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"襪","strokes":20,"corpus":"MM","originalMediansSha256":"086ae4bdd87f184621b73f8cca55370cc18588937ef3af659a661a6f726ac8dc","pathsSha256":"cc200f1c575fac092f4de47f66c7dbdb62628d2cbe6f5041547d8f585fb2bc80","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/896A.svg","dictionarySha256":"de1011e4326d2b6ab802efe93cab720aebf61adcca973ad020a7a585749e611e","sourceStrokeIndices":[1,2,3,4,5,7,6,9,8,10,11,12,13,14,16,15,17,18,19,20]},
  {"glyph":"惘","strokes":11,"corpus":"MM","originalMediansSha256":"4949993d8d4d3146168c2c6ad203e2b4b9feb4def973f18423340b451f70a1a7","pathsSha256":"10104a5480579343321ee9489e7c79339373af60cdba683da5e334e9dc5b1c6e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60D8.svg","dictionarySha256":"d3b8b51dd56c1c61e97a1f894ad6fafdadd3c7da48504a20936bce21991ab55c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"煤","strokes":13,"corpus":"MM","originalMediansSha256":"5310feb180f6480d06bccd2cca3c448ca9e60dfee91a58fe497cc1754dd3589b","pathsSha256":"6f60e1cc9ffdfd877fc1155abf8d683555504d1f133b0fe865884a31becf509e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/7164.svg","dictionarySha256":"62c44ffb62c7dddb85ae4731e53baaeef68f0813106e0cb4a2d24da316d5dd29","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"罵","strokes":15,"corpus":"MM","originalMediansSha256":"e9298d64f7410ab797a065d1276a957d126ab7220fc583e94be453259a9415c8","pathsSha256":"65dc5f0281933e19b99d31c19a623390a68a8de5a0492a178b66210727806abc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F75.svg","dictionarySha256":"0b2fd331067dd497858a84e0b24491a809e2a71fbde8b209bfac734c5b86bb9e","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13,14,15]},
  {"glyph":"呆","strokes":7,"corpus":"MM","originalMediansSha256":"b84c52329a7aea21df3673e7f54142676080765861f5bb6e168a4d6984c7cf40","pathsSha256":"e0f52e1df6eb8eaf32db2752bb276600272af38171c04ce33a58395149e1204f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/5446.svg","dictionarySha256":"46abd9a7059abff3ba3cb072600172e262ee47795d090ce7364f318a1be506e8","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"昧","strokes":9,"corpus":"MM","originalMediansSha256":"34ecab02c12836dcf150b4cbfdd06777caeeabd7edb75256e59340d058d047fb","pathsSha256":"9b058443f2f0eb7a608926438dc323568c35739cb64ec4af777113d987bffd8b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6627.svg","dictionarySha256":"c3960740e87badd8ce9a94dae0594f2549a0a4d3645a6b2fe0e4ff9b5e6ff452","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"寐","strokes":12,"corpus":"MM","originalMediansSha256":"d31f2acf5f342ada8639031f464ed53e1991c2109a5598889f4b8dc506c706e8","pathsSha256":"2dc3feba12d4c094be93ee4531bb75f5dd42f4be71c6b7d721d8771b3e7891fb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5BD0.svg","dictionarySha256":"9bf2f6ea6730b484016d68f32750492cd3a3971ffc4c63ef769d327437d2bd7e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"棉","strokes":12,"corpus":"MM","originalMediansSha256":"02f1fd6a612cde4219f89f65468ef513174b748b750ea735557119c91dd30fe1","pathsSha256":"cdf32eb964514d431fc1b6f20d81f9e9855596e972977b420d70f63a6cb50798","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68C9.svg","dictionarySha256":"fd84f0288485db628f478d856e8edf8a7a8e4eabb07a6d0e2d892f518e1d0ce1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"眄","strokes":9,"corpus":"MM","originalMediansSha256":"e8e76f0e4ee3f38262d33a0df9bdba846680699bcf09be1f0af16fea85100fbf","pathsSha256":"672f75fa21520de20934528bbc40464e4255e76d9348bba75c7740c6cab3a11a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/7704.svg","dictionarySha256":"2a7ac83f732224e52c3db5d05aedca33f6039b8bed2cbe54c41fe1f49078b3f2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"緬","strokes":15,"corpus":"MM","originalMediansSha256":"6596cd6ad254b13f51cba69467a8110dd5b50011dedd548f07afd2037f0909ce","pathsSha256":"0bd0d48119a15f21bbdffbca743a036c156c2a4573ca1b14c94b448efc934323","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7DEC.svg","dictionarySha256":"c59c7ee771a1a5649af35b65c21c779afee68bbcf84549b40670f06a17c97d47","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"麪","strokes":15,"corpus":"Ja","originalMediansSha256":"0c9e4cb34dd746f57a5e579a172349afdbfd56730cdafbd34a8f9b3bf92b800a","pathsSha256":"c815d49fc15fac8a042ffc0ca0c97c04fcc00e367d44d3b3b1f880c131b76c9f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9EAA.svg","dictionarySha256":"00ffaf090534af925069f5fbef18458774e8df27d94fb5f36d19412192fdd504","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"溟","strokes":13,"corpus":"MM","originalMediansSha256":"01ff1e6ca732d284a113770a331da1643a87d1fbc690431285e1eef2a096dea8","pathsSha256":"cd4c2a4d97d8d57f0984946dbd747447689f18bb7fa036e076947c816d29acbf","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6E9F.svg","dictionarySha256":"27337ac34b2af1bda1e05f20d0d20132c36c60c684fa03b1923afd61de1e315a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"皿","strokes":5,"corpus":"MM","originalMediansSha256":"9ea701874fb0e2fb0f1fa123b7c745377271c47c1c69bd678e0164e75c5cf617","pathsSha256":"30ebf66edc2d6731fbae50de4e12d4ebcbd5e12198cf99be4f2e6bfe5fc30ce3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/76BF.svg","dictionarySha256":"a74e008ec050e9f11a094c0c229daf1ee294d791f98f05e995384998fa227111","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"螟","strokes":16,"corpus":"MM","originalMediansSha256":"c7c0332ef1d9081860e017ea25c33628f486911d0e9bb58234a638197fb824a6","pathsSha256":"f80f0cfd3559b2ca2ab0fdf085c5e4eb95fc71888e90790d95e7188ce397a648","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/879F.svg","dictionarySha256":"f482406cfba80ce9e02d92f1a57bffcc74cf80ec516883514d6520e5d138666c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"暝","strokes":14,"corpus":"MM","originalMediansSha256":"3b0c86da3642f6ad74232f624619d511f58d6c32f80e06b46fe2ecac42f01391","pathsSha256":"90b08ee26bc051d393ae8611f8f6ecff434d0d0640db0c3cb462beb8a21a2227","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/669D.svg","dictionarySha256":"2a668b003053c7a07d99e5bac6c1c68afd82b2f25c8a847e18998b02cbff8fe4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"酩","strokes":13,"corpus":"MM","originalMediansSha256":"cedfa7df5ba9c2b390df1df805b5dfc458d02f9d495f5a05a1e553f7656e6de9","pathsSha256":"0daddc0482371c6c20d3cc28eddc6a940caa67e1d02ac13582dfa36e2c01d69a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/9169.svg","dictionarySha256":"ad7ed06b55266825e14dfd2c2c9443eacee096f38bc399c4a4c26f402a6b50e1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"袂","strokes":9,"corpus":"MM","originalMediansSha256":"ef99b669b031f9e60144be958ac6a9a10b6a29223d4b06022276a645cedeac07","pathsSha256":"01dae0fb8d9c1181acdd20ef1d2907048ac969b4b8aabe4ce02e8503bff62b7b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/8882.svg","dictionarySha256":"3e8d61274ab8038276baa8ccffcc5cde44547f0c33a917d9d51fe381fd62db72","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"牡","strokes":7,"corpus":"MM","originalMediansSha256":"8a2fec98983dae15403b8ccbf6e6f8340e2288222aab376f724613b0a89138b7","pathsSha256":"e0e36f0c384e41304555fde180059803d6636b5e01bdc489b4719e8c739dbbc7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/7261.svg","dictionarySha256":"e9c07027d496b304a3ebfcd2e532a9519cf8a6251c644b946eb66205ca34d4b1","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"糢","strokes":17,"corpus":"MM","originalMediansSha256":"c69e9532fc8916ec372e16fbc4af2ae0e7676d94493cca532529cead319ef884","pathsSha256":"556c0421a73d1f0a0d5bed882b1b2486599f1a4be7b50afd7473e7519ef0eea0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7CE2.svg","dictionarySha256":"e307d669c60bdd10045fe3ec1a8475c87d3f05891abaec8833fe1c477bf53cee","sourceStrokeIndices":[1,2,3,4,5,6,8,7,10,9,11,12,13,14,15,16,17]},
  {"glyph":"耗","strokes":10,"corpus":"MM","originalMediansSha256":"db55a2d03e22794596e265f7e7b8ee2f7adda3086549e80e258941c093f04d97","pathsSha256":"39f0ce0ad9852d065fd1b94a298c910ca7912dd177224d8c7ab022ef0da2caf5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/8017.svg","dictionarySha256":"36715612ff39be5a871b7ae277697d9fe31cc82917e8469c01ac63c03bae052a","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10]},
  {"glyph":"歿","strokes":8,"corpus":"Ja","originalMediansSha256":"979985eef4aec0f6cbc082b1a827db181defe8ba2d77d6cf05ca560ec6ab34df","pathsSha256":"c876e71f79dc5d1ae2596e0cfe443ffdbf5bcd9b7e4a0fbbe3907eba2263387c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B7F.svg","dictionarySha256":"d01b9eac00cf88e00df160766a3ccafefdf6568075e086dc1b01dbe42c80e7ad","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"杳","strokes":8,"corpus":"MM","originalMediansSha256":"892cb2c06124f7ab9af91d99e7b4e9e125d8b04284cf5cd647946ec2dc51b64b","pathsSha256":"b5519797a3359aa54fc07e6dced989a2db9d15c35201d3d06a979b893b179502","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/6773.svg","dictionarySha256":"153384d36531530dc126a2cde37a8f50399da77da91289911611d5cc2aee2d5e","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"渺","strokes":12,"corpus":"MM","originalMediansSha256":"f76349ce417d7a1cc5b29e08894cf6dea972eee28c7311e1cc2679ee67a76f16","pathsSha256":"2801cf282efbf69d104f13bb7ae48b19d0a989a5b215ba984059444226ee8607","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6E3A.svg","dictionarySha256":"cf6af86bf9a031540d17fb328e1bd8357390d62d5c2a632b121a6d157c7d6ac0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"巫","strokes":7,"corpus":"MM","originalMediansSha256":"fad253b447e9d8c3fda84157764c0d23df7e00cac483defe6d533a9e36f73559","pathsSha256":"80f1b04cabdb4f829e19118e233add46e5ce8d200c97b49ee847d946761deeed","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5D00/5DEB.svg","dictionarySha256":"44898ad98aba6da8ad4212f1885e8ce7a1295b482992e1016029a6116920f4bf","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"蕪","strokes":16,"corpus":"MM","originalMediansSha256":"34890b6391d7c946326edf666e71e6cdb72176b15e7b2aa771efe72db97809c1","pathsSha256":"0584e3f7a40e5053511d1379ba51d784e4d0d425727d3a0108d388310205231a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/856A.svg","dictionarySha256":"2c34828bccc221b9cedf88307154ce32645d017c483906bb9d4504d424f4df61","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"畝","strokes":10,"corpus":"MM","originalMediansSha256":"fdce6405e86dbd9e9a93883db4e4cab996f045026f3c2bed68f3bcf98d4800a8","pathsSha256":"cfb5ffc01094ad7726e770b2ccb88bca76bc82ec95072aa9dbd628e8263ec1ee","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/755D.svg","dictionarySha256":"08242e5ddc63849c5d4ac32de599400c598b5a3c52c5907b63dc77a794693ba4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"毋","strokes":4,"corpus":"MM","originalMediansSha256":"4c1c0c697493d73501ca579f48abe285cd43a0a0754816d08550f29fedcab1ed","pathsSha256":"db9f66cfcc6d5f1b4805136cbdd049f7a000dc29caae86eb2c9cd392e2308a01","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6BCB.svg","dictionarySha256":"cda89fceacef75a7cd38a6d8c707c7dbf7d8a61a0ee209fadec0b3fb09190593","sourceStrokeIndices":[1,2,3,4]},
  {"glyph":"撫","strokes":15,"corpus":"MM","originalMediansSha256":"0622885c0ea06b9b09ff5e1297cb5b9254018938d1d5b997743c50f1872b92cd","pathsSha256":"02a04b1e98f7d0e9d2ce7a904b10a66db84b91976ad502b1d6c7f04e2105f8d8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64AB.svg","dictionarySha256":"3687b6ca2097b3768ac785db32fb8bf93a3ba4c9dedd5ee26744497552211376","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"拇","strokes":8,"corpus":"MM","originalMediansSha256":"ca212067276a2ad15d8956b3b7c79678c7389ba1bea02db9751c70449a997f9f","pathsSha256":"521ddf818be996c5c941d29e20572b4951334125936dd47f25d65c35af2a1e68","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/62C7.svg","dictionarySha256":"3203eeff67a7ea7182bf544efec39e813032c9b6ba2ac56833c1b1efcaf500eb","sourceStrokeIndices":[1,2,3,4,5,6,8,7]},
  {"glyph":"憮","strokes":15,"corpus":"Ja","originalMediansSha256":"56ab796f297894de97cba7e14c6ad280172bd74b35cfae6da8052010acffc686","pathsSha256":"da06b6b41f25c13913f26576b0a030534b8a0e6e29325f04e45f8b24859e21c7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/61AE.svg","dictionarySha256":"82fc67c86b418fafdf40193b872e3afe3c6b3ffee541852f3685dd7123f2169d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"誣","strokes":14,"corpus":"MM","originalMediansSha256":"db36d36af76613796b0c20ea89611d8d8f65724ea112275b20b73514d3195587","pathsSha256":"68abe46ee06cadbfe767e089c81e1e6009349d09970fa5800a167065e15ac0bc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8AA3.svg","dictionarySha256":"b65c3172363a3f0628f58bf73158df3be916ff58a24b405f523d089ce0d291a5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"蚊","strokes":10,"corpus":"MM","originalMediansSha256":"294bb1a725c62734017f54d0cba12b2ab15e565b59eecf35072cc976a8ec969a","pathsSha256":"7d74c7af19259d7612b88a3f5c4ec9e8abc9a588b9d95e4a5ba0545aec27e71a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/868A.svg","dictionarySha256":"a306aa2de0a41eab7c48453785f67177d140afe03f43f8b2dacee2a28aed9c6a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"靡","strokes":19,"corpus":"MM","originalMediansSha256":"a9bb081291a2efde002b0db515c1af9446869e22770dd01cf4f2bdbb713d286d","pathsSha256":"eae79f303b15d93c99d70bc0c987e5d1ceb35ba6b5c5340b1c9f627aeeaba1df","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/9761.svg","dictionarySha256":"7e7a775aa1a94615b3bc53d3fe5d6481ff231610f107e487700afc24b8ecc25d","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"媚","strokes":12,"corpus":"MM","originalMediansSha256":"9326f9e8c87462fd60cd99278500311b3109b3be262a0031955ed8ab04ce6aef","pathsSha256":"105cb017006208bf5a71b57a689bbf1ae48636dbcef16e2fb630f0c55061fe6b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5A00/5A9A.svg","dictionarySha256":"1529746660b0840618570df13da6c4b6346d5334d96003e1bbd85b9abd5ba7ad","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"悶","strokes":12,"corpus":"MM","originalMediansSha256":"53ac528a03122bd17ed1a32dc596b5bb881f94a1538c86d474906e5cad6bede5","pathsSha256":"69d620cd6609a1711f6301cce3f8313cbd3c6f2fa5132fdb90a58db2e7a822ad","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60B6.svg","dictionarySha256":"d51fbe0cf2d71ca1a3416a71fd9760637884ed937e44690a88529986cd73c150","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"謐","strokes":17,"corpus":"MM","originalMediansSha256":"3055cb928209863ccd1ff88e9aed90eca5c1b0dddd312a6892b72de3c059ef61","pathsSha256":"31d3d364e2009b51a7a13e0cfee98d0c2980d935102d95bd64fab4382e7c744e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8B00/8B10.svg","dictionarySha256":"c5d31b6952fdaa3f91b6342ee724f6cb2d354f2da4417aefb3bca37b33e50ad3","sourceStrokeIndices":[1,2,3,4,5,6,7,10,11,9,8,12,13,14,15,16,17]},
  {"glyph":"膊","strokes":14,"corpus":"MM","originalMediansSha256":"fb6554a885b4fa9bc6be0acb55c9c9a3c6238b822ba41dde2a1bcdbe6ce54278","pathsSha256":"aeb6019e5fcd97f099636c7440e3810f6f0497dbcc435c873fe15827fb011980","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/818A.svg","dictionarySha256":"9aa57a902c3af39a8811da6a66a8d470d3affaab2e51acdebf0f6e0003cfeb9b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"搏","strokes":13,"corpus":"MM","originalMediansSha256":"fda16c738e2c104ff709813974f1e9ff12a9b9e680f993492a419a68ede2058c","pathsSha256":"fcae350f5dca1b550f26004e5d19e6168866d6f2e802ca5fdbf1f74635a5fdd3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/640F.svg","dictionarySha256":"1abc823d6dafb84322c355acd6b5191faf85461e1d960563478ae10ca0747d63","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"縛","strokes":16,"corpus":"MM","originalMediansSha256":"1f652858ea6b4e6e08609166cdb5cb3c0a4d9d88adc24bc7844941b898fb3b74","pathsSha256":"ad7173803a7a73309e4965054625102ce28276a10eb109ff0a1a738895b4d047","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E1B.svg","dictionarySha256":"3dd7253f2ee4c96c8e9009317ca48795a7457d086fb7384a450ca2165ec24355","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"箔","strokes":14,"corpus":"MM","originalMediansSha256":"2bd4703c011cb0130a5753696c0365d88ed12522e6ffa2899fbd313293f705c1","pathsSha256":"9082f972fefda7a34f1a664b87fce6dab1887cbc38af206b62e94d43e585a60b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B94.svg","dictionarySha256":"b7b61fc1d88768bd901d40c4c990276e501b52716d206ab0bcff81f8c4b82565","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"撲","strokes":15,"corpus":"MM","originalMediansSha256":"7a7d18a0996ed18c1e2aaf1040669b61a8dcf765c58933a392a2d0958791789f","pathsSha256":"952b2ea0e08e5e8b1a1f1bafd0c1195e27151428202e352cd3f15dc839aaf82b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64B2.svg","dictionarySha256":"ca579de8bf2e75c74bc4419676fa1ee9b5a3ffc2cd396e4d3df8182ad88bca36","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"剝","strokes":10,"corpus":"MM","originalMediansSha256":"1930b67aa2d4ca26eea4d9e79666c6d5a2ce08e7294db1b42b3edfb51c8c95f6","pathsSha256":"790f3e54d4934925b878e7bacb4df101d667090d75940346406c9e5854db479b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/525D.svg","dictionarySha256":"15f2c44948ae836460972bc083658d8755d3019d3b559f222d098ca47dbb401c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"珀","strokes":9,"corpus":"MM","originalMediansSha256":"346da18520175a373e9b0a12b4708d45af6db0c782721ca6e133ac8ca58f73bb","pathsSha256":"ded4c5904e6b1fcd99219114f005c6d48c84da0f26bacd1cfb2857867ee4c077","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/73C0.svg","dictionarySha256":"469213a01503fd1c60c2c0e1559eaab7cd73e63a0b809dc48753275a1e0f3854","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"樸","strokes":16,"corpus":"MM","originalMediansSha256":"033f27b16e7848406cc7108da618e1063aa3b915e445523806d79f31b3f64462","pathsSha256":"379971909a62fbbdeca4171b812ea2220bdfdfd1a0dd781cea1eeadcf66cd8b7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6A38.svg","dictionarySha256":"53959c5e276ccbd1333dcc4d5f1211d87cef7a0ed6d0147b8d090b87512965cc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"粕","strokes":11,"corpus":"MM","originalMediansSha256":"6e7672399070e39c1f3656e89c16c087d2b6c7ee2643ad0751f8060649b68a2e","pathsSha256":"f54246d3a32245dd41b0033e7e54cf2226edb4696a980d91917a98afbd7ee426","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C95.svg","dictionarySha256":"acd1dec5a64b5584b166ad9014431e26f87a75b427ac8ffc9f1ba416d749ebe4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"駁","strokes":14,"corpus":"MM","originalMediansSha256":"e917901b0ba05026a4c20527ee7653792ed1da5f6f37307f4c3a7bac30722e65","pathsSha256":"72cf73a409e5fe44cec774f3997b3a386f88d27ad2316cbc43832c7aecc98da3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/99C1.svg","dictionarySha256":"0228cf0a6b32a764e02e6dbd0f407d67484d456d05fb52d7f60bef1148145ba0","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,11,12,13,14]},
]
export const G1_BATCH7_DICTIONARY_REVIEW_SHA256 = 'a6d7d54888c027e47eeb339c5857306d132c21b110187e0e18f1d80a01f0a600'
export const G1_BATCH7_DICTIONARY_DIRECTION_SHA256 = 'ebcf68bdf39d5eb5589b1a419c0fed9a777d1a7dbcc9cd27dd474bfae7c6c1c1'
const referencesByGlyph = new Map(G1_BATCH7_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch7DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch7DictionaryMetadata(ref: G1Batch7DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-18',
    geometrySource: G1_BATCH7_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch7-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH7_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH7_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH7_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch7DictionaryBundle = {
  verificationSource: typeof G1_BATCH7_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH7_DICTIONARY_GEOMETRY
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
export function loadG1Batch7DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch7 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH7_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH7_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH7_DICTIONARY_REFERENCES.length) throw Error('G1 batch7 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch7 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH7_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch7DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch7 dictionary entry mismatch')
    return { ...g1Batch7DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH7_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH7_STROKES = loadG1Batch7DictionaryBundle(reviewed)
