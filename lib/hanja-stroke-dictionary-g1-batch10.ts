/** Fifty grade 1 forms (batch 10) individually reviewed, including 13 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch10.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH10_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 50 approved and 0 held; 13 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH10_DICTIONARY_GEOMETRY = {
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
export type G1Batch10DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH10_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH10_DICTIONARY_REFERENCES: readonly G1Batch10DictionaryReference[] = [
  {"glyph":"徙","strokes":11,"corpus":"MM","originalMediansSha256":"e1ea12a6f0be601a78859c2f912ca1f0c67863a5f5828a506150de16475f8d89","pathsSha256":"c072655065416c8d8abe0f3c1a925647bb225d1083eb03fc9898b4102eb9b1f3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F99.svg","dictionarySha256":"33e46e912a2b6909d8a1598c781d4eed0c7ce293503b1583c4640ec3fce8a0c7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"瀉","strokes":18,"corpus":"MM","originalMediansSha256":"d4092e990ace90172c3c2d6de832321ef297a5e2d1a2e280c31d1692ce0bce76","pathsSha256":"c145c9a9d5a9105b84624f3b2b53455996359fbc3d6f9c56c795025eb927fa32","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7009.svg","dictionarySha256":"862330fee7b99481c78866f4ae0775f8ebcefe91202b5fbeaecb8b84d3d3006e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"獅","strokes":13,"corpus":"MM","originalMediansSha256":"592cebdd160e4b60c8a1958c79465056200a293db1ed8d1ab769542a19d511ee","pathsSha256":"db4ebe1f1c2f0b402188a5b75dc2299822bb4f46b8bcf71fbf4b34e253eaae1f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/7345.svg","dictionarySha256":"a0ebc619447c6637624b1d612046187c5b497be46daba5b2c0c551e151745be1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"疝","strokes":8,"corpus":"MM","originalMediansSha256":"88b30367fcaf9726091e5c5912fb740163828a235e08c75d21909e3ec4be8a4e","pathsSha256":"66cfe500d74ec61e41a39ca57fdf19ccb15431a3532a2cb7517033677a6d82a4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/759D.svg","dictionarySha256":"811a9e3ba373139df134d8196267494c80a3714b377b4510899c64a2b0ecf1ef","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"珊","strokes":9,"corpus":"MM","originalMediansSha256":"671dc988e60094e150e8c9ec5f631b9be511f5da2cab35b03be9f71ae518f52b","pathsSha256":"394b03f4316cb9535cbcc3142cd4d8cf8f3e8920db266eb000c449b6c0067efd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/73CA.svg","dictionarySha256":"0bd3942c812875f0fe64210797a36cd8744b5e338d07b66d74919574fa8dbe76","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"刪","strokes":7,"corpus":"MM","originalMediansSha256":"10ec77e7f46fd29b897f227ae7a72ede8164c2679956c3f5c599fd500e54609d","pathsSha256":"6ba002d2f83a20c72cab9a2addaa32124eab7868228ba289d0f0ef6d737ed10b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/522A.svg","dictionarySha256":"3941814478cc6c5f1a2852dad4f2331571aebc984c2543f90f9fe4641b1305f2","sourceStrokeIndices":[1,2,4,5,3,6,7]},
  {"glyph":"撒","strokes":15,"corpus":"MM","originalMediansSha256":"97e46579e079fff187d400708112d5668427f87c0ba4c6f2b0a0f5f8c40812ff","pathsSha256":"c9f89d11f8fb1768d6f82290dd03cce528561a83a0f71feb3a383cff6ea252a1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/6492.svg","dictionarySha256":"b7d86677aa4014e6a14aae78d83808af871bc9c9ab6b8ca8af1a5aa5e23e8939","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"煞","strokes":13,"corpus":"MM","originalMediansSha256":"486bbe283fab756ed1a31f3f17fa0bc33c63c6436be59bc36b6b8359e890a4fb","pathsSha256":"e56e37b76343ebb468790601a1b80f8d0f2abda586f08316f2ed632270111714","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/715E.svg","dictionarySha256":"79ff2a91fc566ce1e49946c947080931138dbea114f2c69cc4df2f24565282a9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"滲","strokes":14,"corpus":"MM","originalMediansSha256":"10aa993d8e85fe0cd90a7e4a8dc9adb538a6b8e048cbe3a337a26b01884eb729","pathsSha256":"ba4330509bb2e6085009467391d59f620de882f8ae6c0287795a49ff911088bd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6EF2.svg","dictionarySha256":"7cfdfe04c97aa9057d19182c7ff26f893d0948c13e03134caadc8e2b6f448bbd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"澁","strokes":15,"corpus":"Ja","originalMediansSha256":"4d43135f8523b7f92229d0b1914b890f551743622233b2e9c02375d08ab74dec","pathsSha256":"d6db82a3fe5fdb69c2f7414bea1ac739f40678d505f4cec9e82762f6bbee9fb1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F81.svg","dictionarySha256":"3855fe00ca5bd99fb84b4130f0dea139c51469a13e45752329da773bb150f9b7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"爽","strokes":11,"corpus":"MM","originalMediansSha256":"43e4166477b35b8f44683b610132122fccfddac20a5f0358c86e610482bdbe6a","pathsSha256":"bf6609bb51f72a7bcee3769f00e88b8bc131d6041f7963e4d824874bdc9cc3d0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/723D.svg","dictionarySha256":"4be31b7c6e0ddd0bfc7d60ac66d0b2f70211d321f5e94d0e916e084e94fbf092","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"翔","strokes":12,"corpus":"MM","originalMediansSha256":"e4efd7a279252cd421d21ae0b759e660efaeffc1a5b51673a7f27646fa017d41","pathsSha256":"fb812681067b9e2a2c1b74c2fb1ec6556c50b26015570fe445a75308946c93d1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7FD4.svg","dictionarySha256":"e700d7e55530e3875be4e960b42019dd44b3a02449565232285c8ab9f92f532c","sourceStrokeIndices":[1,2,3,4,5,6,7,null,null,10,null,null]},
  {"glyph":"觴","strokes":18,"corpus":"MM","originalMediansSha256":"cf596e7c6e23d9d877dfd404bed43d1a81c37f57cc6a003e423ce7e52edb76ef","pathsSha256":"1a2963b6e5011403c932d149d666c9fb5797e8c5764ec01bcc999c6a99c6341d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/89F4.svg","dictionarySha256":"011d55ab83b06a405827bdc41d9c308bbd058d4b2ce9e56325e47ca1536c091b","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"孀","strokes":20,"corpus":"MM","originalMediansSha256":"8eee37bc747cf73bc2856d32636338210942aeed88836baf5266c9c7b08b7896","pathsSha256":"eb3b96379571f36305dbaf52ae1c05889bfba48efe52979cb7e8c314a23f458a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B40.svg","dictionarySha256":"e96acc0da5e9fc1994fca668161e7563bdebaa8ba3fc637e727e9dd7c0fbc9a0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"璽","strokes":19,"corpus":"MM","originalMediansSha256":"43a36cadbfca7518b167645853d13f581f8c0a45c98461245d89561c025cc1e2","pathsSha256":"626030cbadeb70de238c57a201ee90d38424543cf3ae9a43988ab4aaf549de4e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/74BD.svg","dictionarySha256":"bb6eab6f081d7b7a3b71a15e7fb11d25aef9e7e854567bae9c50bab572b7bb58","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"嗇","strokes":13,"corpus":"MM","originalMediansSha256":"d4f30043f6bd06142aecb2427ad8a7fc4778ca9933d7776ce0da6ba291b30b71","pathsSha256":"eba7018aefe8fff9d034b931106ef26ac0729a2f796a874dc0edd8c1e882a5eb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/55C7.svg","dictionarySha256":"bbc901730d4d0e963e22da04fb2df1c81650706fb2d196aa4cd0249354a6fd8b","sourceStrokeIndices":[5,6,1,2,3,4,7,8,9,10,11,12,13]},
  {"glyph":"牲","strokes":9,"corpus":"MM","originalMediansSha256":"38a7ed590bec088220ceb8f23d5c4e10271e210359ddcbab876e7ab65e95468d","pathsSha256":"9832d0cfaf241646e0e6adb997b8f6c75531160b07101018cdd47d3f8349e6e4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/7272.svg","dictionarySha256":"af73f263a8bbce837a87ee7aff8af30729b4e9b0fe687b44c863dc294e38cc94","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"甥","strokes":12,"corpus":"MM","originalMediansSha256":"8811ab80f3693b5d9a777843776fe3e825d242d26d2e968f1e2d4466ddfbded2","pathsSha256":"fe6e1e093f9cbc8e9d070b8157936c833bd7b0d486f789fd3a09219ca189aae0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/7525.svg","dictionarySha256":"fbff32cc605713f83bdf7113811d1f78f297f7d92ba209991c8f20ab6bd978d7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"抒","strokes":7,"corpus":"MM","originalMediansSha256":"d39dd2940db990c02b82f04119e474eb3307216a939f116297b38e937ac12db5","pathsSha256":"b07abd57e0ae011f6c59009052fd347bbf72d50ca492de39a02c8a1a54e85fb3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/6292.svg","dictionarySha256":"095e0d5fc9a99562f08f378dbc438764507711224e07f7c38e419bf32e910a56","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"棲","strokes":12,"corpus":"MM","originalMediansSha256":"ba2162e0c8e7ca04d0d72c2f84c5f77fff560eb0c15a15fd63ac2c4ee44019ec","pathsSha256":"8e915cbc34154c294f286c2effafb5e8c0b1b1b358368ba79ac7bff988e14012","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68F2.svg","dictionarySha256":"f70d657533cb37b75ec4a2f53ae9bdf00d517604af1542be14f036ae09754ce4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"犀","strokes":12,"corpus":"MM","originalMediansSha256":"b44b6665f6ed9b8fc3ac441789f16cfdb07e6a00bee6335614c0100b9877a0ad","pathsSha256":"02c31cbe7ff4421e8dd01f221a6c4d2c88c41151fe39ab7b985d16d212769bfa","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/7280.svg","dictionarySha256":"2947a68577e142c847fe6c51c35d0886775dab642813b98c98f6455e955e5fe9","sourceStrokeIndices":[1,2,3,4,5,6,null,8,9,10,11,12]},
  {"glyph":"胥","strokes":9,"corpus":"MM","originalMediansSha256":"ff1e29086fd01ba1662c18edf2bb535c88c92f4392a4f830745391a95153ab53","pathsSha256":"1b08dfa46011c3fe0e89f99f8d60ce9c46eb1ef998571ad45578e5df686d6d47","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/80E5.svg","dictionarySha256":"a13b9a785d570d0e71bc493b0cea5c1f5306c944b3fdf0db57e221f486e3e115","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"黍","strokes":12,"corpus":"MM","originalMediansSha256":"90ca92e1d54a459744ecc3a4cb2a6384b5ca206682f14748ae383a35567acb78","pathsSha256":"b3aabc3b63c9982f5f7b50017bde6355b87af3a6d1307148b87265f5ad486fb3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9ECD.svg","dictionarySha256":"3383453c956845994d7a07b57777e103fe13c62fde014252dd9fde5044c6f4e0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"鼠","strokes":13,"corpus":"MM","originalMediansSha256":"a37f73582f298d5b686629d0d14681ab4e9d58897c12db9fdf0f9a2daf323964","pathsSha256":"d9ad6aea930d7abb75ba47b080c68616f543db7b7a25b35470b283ee04a7abf2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9F00/9F20.svg","dictionarySha256":"4f1bf93b0100d47ef8d1e9cf96565aabd1423534f2df4b7473caf35ccd2fc19e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"壻","strokes":12,"corpus":"Ja","originalMediansSha256":"df62c58c76e1fa95c2ff6dafebea5f21f2bec7a425cef95b584dba4a534abeab","pathsSha256":"df4900beec6d953af0f045f7ba36cb41458c3a07d5dc473fa0dd2ae4fda4e1c7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/58FB.svg","dictionarySha256":"5d111ffbb5e98908fec3fe345d5d1c8f68754cf83f4ac654abc9a9fe15fbf084","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"潟","strokes":15,"corpus":"MM","originalMediansSha256":"cd71fe4380855b28d45b3ea019c965f98b6ffdd4766dd9897cda3b414b7ad4ba","pathsSha256":"d22c4ce9fd396cbb2b56a1157d9e15f9c2ef26913b478bcb67b6a4e60176d4a9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F5F.svg","dictionarySha256":"ddcb371e2ad87a88818f29e19ab4e1428b40152896c60a70b831eb43fb6c26c5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"煽","strokes":14,"corpus":"MM","originalMediansSha256":"8e08ea6fec5ac6d3a4fca048847b14be2b487e4594e2621d58bb155a44d7d8ff","pathsSha256":"49b295637490a0cdfee51af9b0bea07046a77d86f1a6da93a55443770437d59d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/717D.svg","dictionarySha256":"c4f2cb3c8e937e6e7529d61f8ab0e26d7e87dc0e40f5a58ff995c0c305671582","sourceStrokeIndices":[1,2,3,4,null,6,7,8,9,null,null,12,null,null]},
  {"glyph":"銑","strokes":14,"corpus":"MM","originalMediansSha256":"be3a79d03b050cbdc18165c04d860b4249d970f1dd32649409811e561c8a35e7","pathsSha256":"3ffbeb85f3dd9b2d511a5e42e70cc94fe4780e44337199ebf189740152ad7ff6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/9291.svg","dictionarySha256":"ee71b6cacce570100b60102f11f33833fa806e01e008ce27f32cd12a157706fd","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"膳","strokes":16,"corpus":"MM","originalMediansSha256":"ac32df5571e5dbc2885d8cfad7855198951178cf820cd18a4972bb10dd986d3e","pathsSha256":"fee1139ec9cb4e0f8bf2cb7a6d79072b8004fdd548bf81456c99126b3e199f70","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/81B3.svg","dictionarySha256":"3658ff0a4e274aed08d13d9626648d2542df377ad3a97cd9eeab43e75577e417","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"羨","strokes":13,"corpus":"MM","originalMediansSha256":"ec1923e466e5606a3c7bf1076ecebdaf6d1e16b7325ac5a72e71c0226c20bcc2","pathsSha256":"bee3aa1a247befd1b46d658fdd6670a3d58c196c9dde81bd42f1cafbdb8455c2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7FA8.svg","dictionarySha256":"f615054f53dcf8f83f4a6e40483e5bd820746c151959bff44c1a9c559db502c4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"扇","strokes":10,"corpus":"MM","originalMediansSha256":"2472cebae0784952e44ea7fc85de8111e506c7ae714e05cc2c6059b856916ddc","pathsSha256":"693921283b8499d6fcd348c66511c5df4a5d23a4d45aa961a32a7d7ceb79bea7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/6247.svg","dictionarySha256":"476945487b9f66d66b88fb0ebf2b4e92eda2d689cd0d2a834c9b61e9bde219e0","sourceStrokeIndices":[null,2,3,4,5,null,null,8,null,null]},
  {"glyph":"腺","strokes":13,"corpus":"MM","originalMediansSha256":"e6686691ef3bced6aca116292eb0c4e2ba942f39a213f91f1f48b9d98f274f21","pathsSha256":"641aad4142669348fa6e622c3623366dd6a6146da06590df37aa1951504cbf3b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/817A.svg","dictionarySha256":"34465f3939f9a892019f628999b5ea9a748939274c866ea1540fc79ed3f2338f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"屑","strokes":10,"corpus":"MM","originalMediansSha256":"6e4fbf800ddc0a68e288ce7c993551d553c21eaf49d78ea1b56e641665df6974","pathsSha256":"8d65ea774d685817009b62bb56d20d0607bd2069d64e5c42db553a31499f10b5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5C00/5C51.svg","dictionarySha256":"37ee8c636e09526dfe1bf5dcde3b01a8db9d2b22bb62392e5283723c9abb72b8","sourceStrokeIndices":[1,2,3,4,null,null,7,8,9,10]},
  {"glyph":"泄","strokes":8,"corpus":"MM","originalMediansSha256":"ad21aedb4bcefeb8dc0ef5d6763c5f76bedd9be865d40b0f01b15912f1b5b252","pathsSha256":"c1cbf018b2e705476719d5b34c995389e34dd5d3fa5ab6086b7fec667460be1d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6CC4.svg","dictionarySha256":"1b5814a46e99bdff72d3eb67c998763cd984282811e6ec3d1574547f3477cc3c","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"洩","strokes":9,"corpus":"MM","originalMediansSha256":"ac136d592918d6d4b320d5b1de00d294ec0e8755bdefadd1b52e71af8b5714a6","pathsSha256":"e4df4ae4f6a9f8d6edf57e1e67ee566374305006d4b61b246964c665849c323a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D29.svg","dictionarySha256":"edc97d0567ac429372ad71572674dc79cfb6d21281e52662e2b343cb4151aa59","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"渫","strokes":12,"corpus":"MM","originalMediansSha256":"4acff74e4753dd68d948d54b57705dab094b6abc867a875eacfafa2fd298878f","pathsSha256":"039288d668ccc5c2f513c59ea1f6f000f7459770bb1bc2aaa0d8c355b6638517","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6E2B.svg","dictionarySha256":"1402e7eb84c19c8cdcc6b2036d273d2fb27e60e617b2c50b9ce7e123294c91e1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"閃","strokes":10,"corpus":"MM","originalMediansSha256":"e04097da73c7c40af0be192a555e6f068f9b1d563595a5412a992da7f8308992","pathsSha256":"80cc316c895d723ee121b294327c395ed0055e39fe6e80ec1add7fb2172d2c2b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/9583.svg","dictionarySha256":"36b479d58009352b66d8113ec78c030c8c21dff52c74530d481834e35dbfb8aa","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"殲","strokes":21,"corpus":"MM","originalMediansSha256":"a9471c2ddff13638c8283b7dd45f31ec6c9464834bca8ad62b26a2dcee48f19c","pathsSha256":"60228db94fd0f6032994a5df63789c4755e01e7373b0449b30ebaa4594152c3f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6BB2.svg","dictionarySha256":"6fdd81f61f33f035139b2410f213164c3aaa760b65476279520f60dfaf84b44f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"醒","strokes":16,"corpus":"MM","originalMediansSha256":"d75ca99ac8605baca3b1f99cbd043f20a4a26f2229fc28f197c45c86c6397d2d","pathsSha256":"463596e973b41fc044864eb74a57e24c906a51966a3affac2a200f4b6bf99b62","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/9192.svg","dictionarySha256":"c68bc76c0f5698005d47a6e41ebbbe6d83250c96d19270a41f2ea3163e58fbe7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"簫","strokes":19,"corpus":"MM","originalMediansSha256":"55c9a8bb70e21012592e80e69c906d6dbe7d35fea0a19b068a76c5ce51a2e867","pathsSha256":"74e76cdf38e3e84636df40f221bcf9ab0ef6cd845c49085ab7c6bc589b608751","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C2B.svg","dictionarySha256":"5744746ca9668d981a56cd089de08af4150261bd171b792a8ae250af56fd00fc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,11,13,14,16,17,15,19,18,12,10]},
  {"glyph":"塑","strokes":13,"corpus":"MM","originalMediansSha256":"61af5c606bdc51c2e483d908043a9ca3661e1a6b4ecda39cf86b1cf9fa1a7a88","pathsSha256":"22172129848abc4d8eede9f8efe75dcb7e2a0fa0431f50d5b172bcd173339a22","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5851.svg","dictionarySha256":"4f0cf657b5f63c7240bee5f0bca21c68b1ea236f4686f48becf85e3f12734128","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"遡","strokes":14,"corpus":"Ja","originalMediansSha256":"eaf0f108f29d362f20a2c7a2e173c2580c0630e3115274f7a8313a873784dea6","pathsSha256":"eaa52634cbeedc90e37e42102bf9dc44965a7bd258a9a43dc9ff12660bbacf43","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9061.svg","dictionarySha256":"c2ef0cf7a9e646d1c0938beb5ad661bd0b3101c436ad6080861d7120a9fc6d4f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"逍","strokes":11,"corpus":"Ja","originalMediansSha256":"c8bc14d40fcb3a6ee8d40170cd25a077eb456ab62507a7410a004f0b08176461","pathsSha256":"508b8200aee090eff4f9f630da87ec54bb97295009c76bf58b90f4542adfe8ed","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/900D.svg","dictionarySha256":"ceaf0f63ac7a05bcd6942dc1a2c5cb7ae84482199c69c2346e9496517436ac0d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"蕭","strokes":17,"corpus":"MM","originalMediansSha256":"64f99e05bd8b2dbe9ef85230f16a5973ffb5e95524b6399228b0a8b100396470","pathsSha256":"e1628a268bf80d5245fbe45fe1c705c231e9993b4b489d7e6c024dac005019d1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/856D.svg","dictionarySha256":"f413e1a14c35f1c573676b0bbc1ba9c5ac794d7a8e0691e4e46ee3e1a765db7e","sourceStrokeIndices":[2,1,4,3,5,6,7,9,11,12,14,15,13,17,16,10,8]},
  {"glyph":"瘙","strokes":15,"corpus":"Ja","originalMediansSha256":"50f7e8b4f47833ec8810be07f011a848778f9e3d0ef6acc379899d754325cc01","pathsSha256":"445b5205bce6f470a879bab93740f7e3942ef82c44b57698593f6165cec3be7c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7619.svg","dictionarySha256":"efaf65696c6614d50366f139f0ce975a0c46f35f6ff92826257d463fb2f7bbb8","sourceStrokeIndices":[null,2,3,4,5,6,8,null,7,10,11,12,13,14,15]},
  {"glyph":"疎","strokes":12,"corpus":"Ja","originalMediansSha256":"2104df6af11e428c402d3a0f3211a0e302352c631981ee7144f886bbcaa0b368","pathsSha256":"3f4049d773e0a4ea21dd11c01202d5441927e94a660ccacba95b07ac07db2e65","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/758E.svg","dictionarySha256":"6ce547cb417349d471cbae4c0741ee7b5ebd1024d339585494193e7f55baa37f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"甦","strokes":12,"corpus":"MM","originalMediansSha256":"9baf71f84645651233fa64cf0b50728bec6cff2e4f7a89200f071bc60b5962f9","pathsSha256":"351dbbf90ee3cb53a508deec209d9fbc95ec8f8bb8972d24e6eb272dcf5084d2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/7526.svg","dictionarySha256":"d45121d057b9950374540280e40d1a22eaeed30f6a7856a60c1eb6179d03ec89","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"梳","strokes":11,"corpus":"MM","originalMediansSha256":"6b32d5dc7eec5940f5b619384fffbac10c3bdac9cddd39cf280ec2457eb9822c","pathsSha256":"521a1e17689c34e24b04de3f1f96840103dbe523ffba14b60fdf239df37b13e6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68B3.svg","dictionarySha256":"3ec6d557407eccf5dfc2204ac63067537b74c9d135beb7942c7c61d61c36ae27","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"宵","strokes":10,"corpus":"MM","originalMediansSha256":"05fee314ef4e2297ae6a7762bd58bcce5fe5d486127e25fba300bb9cecfcf70c","pathsSha256":"5d964cbb4c59e5883e716e1eb74067e898c35eaa35089b20f488a8c730bbf7d5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5BB5.svg","dictionarySha256":"45c482c90547750d45236de2166e6f2313154cac05ccf31ac9dbfd84142566f5","sourceStrokeIndices":[1,2,3,4,null,null,7,8,9,10]},
  {"glyph":"搔","strokes":13,"corpus":"Ja","originalMediansSha256":"b4d624642b4d4d6b4ef1f5d1003b4558027edc4b96a175a9e94e26de11b29e74","pathsSha256":"f5a5db5a94f25ce25b06fd487db03179eea95b55708051b3d62b643d82c8b91c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/6414.svg","dictionarySha256":"798f73fd1c4296e3093a40f8c7efae9e092c6e90c1719ea19babaa790dd5e45a","sourceStrokeIndices":[1,2,3,4,6,7,5,8,9,10,11,12,13]},
]
export const G1_BATCH10_DICTIONARY_REVIEW_SHA256 = '3d83d56473bd03cdf7747d7c6ecd78987b7ba21e09bb12eb175e348200c5c0d8'
export const G1_BATCH10_DICTIONARY_DIRECTION_SHA256 = '8952fb44ae56c50c994e773e81523d0d0d697988e97614372e05cf84d27e1f29'
const referencesByGlyph = new Map(G1_BATCH10_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch10DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch10DictionaryMetadata(ref: G1Batch10DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-19',
    geometrySource: G1_BATCH10_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch10-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH10_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH10_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH10_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch10DictionaryBundle = {
  verificationSource: typeof G1_BATCH10_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH10_DICTIONARY_GEOMETRY
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
export function loadG1Batch10DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch10 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH10_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH10_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH10_DICTIONARY_REFERENCES.length) throw Error('G1 batch10 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch10 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH10_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch10DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch10 dictionary entry mismatch')
    return { ...g1Batch10DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH10_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH10_STROKES = loadG1Batch10DictionaryBundle(reviewed)
