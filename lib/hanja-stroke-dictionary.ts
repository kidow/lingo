/** Per-glyph dictionary comparisons; source artwork is never used as runtime geometry. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed.json' with { type: 'json' }

export const HANJA_DICTIONARY_SOURCE = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Per-glyph Korean dictionary crosschecks: three disputed directions for 訣·紋, and complete sequences for 森·楓·奔·慈·蓮·追·透·還·兔·弊·冊·灰·液·砲·筋·衛·豊·獎·鍾·藝. Not exam-body certification."
} as const
export const HANJA_DICTIONARY_GEOMETRY_SOURCE = {
  "name": "Make Me a Hanzi with reviewed local corrections",
  "url": "https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt",
  "sha256": "a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee"
} as const
export const DICTIONARY_REFERENCES: Readonly<Record<string, {
  strokes: number; pathsSha256: string; directions: string; svgUrl: string; svgSha256: string
  originalMediansSha256: string; moyaId?: string; wholeGlyphReview?: 'sam-pung' | 'bun-ja' | 'walk-four' | 'rabbit' | 'pye' | 'g4-three' | 'ek-po-geun' | 'wi-pung' | 'jang-jong' | 'ye'
  sourceStrokeIndices?: readonly (number | null)[]
}>> = {
  "訣": {
    "strokes": 11,
    "pathsSha256": "435af55f848a05e34f914caa7f44a6bf374ea4c433fdc8bdf8b1c30bc9e56b1b",
    "directions": "11",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A23.svg",
    "svgSha256": "cb6e1872d42392cb31a33836fe73c904fe4e98819cce659db79e5911bf946ef5",
    "originalMediansSha256": "66e8fe7d0f7224d87475494186f5bd059a5ef2c005b64400ffa63fee0a0a4038",
    "moyaId": "1426211138"
  },
  "紋": {
    "strokes": 10,
    "pathsSha256": "b56229e19c76d38f7416ed5889b5dbc8e0cc58686e8b9fce55831bc306457d3b",
    "directions": "4,5",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D0B.svg",
    "svgSha256": "a91427c241f313eaf0b6b344db307ef3987a9c41d70b1c2e13277bebd7f1a4c8",
    "originalMediansSha256": "dd79b6482e1b27ae8a00dfb7268caf50e507f7e029825fad1f43fefbddb044c6",
    "moyaId": "1427260631"
  },
  "森": {
    "strokes": 12,
    "pathsSha256": "506e9158f1a5e4e060cf3e9637cc09355fb88fd4913eb0bd997e4c87ab59eff7",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68EE.svg",
    "svgSha256": "85260a980be04cd745afdbc54a084f7808b96911c983d47e51e02939658fb110",
    "originalMediansSha256": "cd04eb332edb46b081760204fb4d800b914a7c6441a58d5206a55e6d02753f5e",
    "wholeGlyphReview": "sam-pung"
  },
  "楓": {
    "strokes": 13,
    "pathsSha256": "85cc8a6a9ec86dd5059c29fa134d5b44166704faae207527fde30509b957cb3a",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12,13",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/6953.svg",
    "svgSha256": "fc7b9d8244d4fe80acf1602ed6ddbf64fa26d0a4c1ee1cd3b93a53f1753633ab",
    "originalMediansSha256": "4656865eb5d853903ecaee3ba3b7a8ceae22c0960a0f36e4560cda3af0d9a8a4",
    "wholeGlyphReview": "sam-pung"
  },
  "奔": {
    "strokes": 8,
    "pathsSha256": "f84abc08f6ffb86ec9dd5249ea1d9f263d15cb1cd36dd70b16f6afa0634d0cd5",
    "directions": "1,2,3,4,5,6,7,8",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/5954.svg",
    "svgSha256": "b20cdb48f63a135392a96e151cc7c74ed44ab03bb7853ec1e6ceac7d722bc668",
    "originalMediansSha256": "66ea648e85ca5d77ad4a710a3750a5a3d6ec2a2a46a5b14f2d9ae0962f452b47",
    "wholeGlyphReview": "bun-ja"
  },
  "慈": {
    "strokes": 13,
    "pathsSha256": "c43aa31138c74551180cf559ad8e71295c414ae296011a5d750c506c7a018329",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12,13",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/6148.svg",
    "svgSha256": "fe8fd5c3afaad257df65d9949168dfca3b8770053a9036a4a328e37744f0dbdd",
    "originalMediansSha256": "a1272b070d7dfa02cd525d2cde65ce1abe021e2d8b8ce10308e9047eb0f4fca5",
    "wholeGlyphReview": "bun-ja"
  },
  "蓮": {
    "strokes": 15,
    "pathsSha256": "4918edf2d4ab5d93b01be3acf87af95a085ac3e22d35f28c348628f869b74a16",
    "originalMediansSha256": "00d29a6b3168a7544b0599853d8392f7bb45884efb1d13f8699f61b19bc4f4ca",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8400/84EE.svg",
    "svgSha256": "1fb3802ff4272b6f3b0b727b1a51530f32021cf9095e12a7f4b375f69d1024ce",
    "wholeGlyphReview": "walk-four",
    "sourceStrokeIndices": [
      2,
      1,
      4,
      3,
      5,
      6,
      7,
      null,
      9,
      10,
      11,
      null,
      null,
      null,
      null
    ]
  },
  "追": {
    "strokes": 10,
    "pathsSha256": "547868cfc4843ebe25bfe8df40faa77415f22d327c580ba3390c4681e6b0d615",
    "originalMediansSha256": "8d2ccf0a6c97e9c7bf68ad830e2d1abc66962400aa03caf2d89be20e6f2d33f9",
    "directions": "1,2,3,4,5,6,7,8,9,10",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8FFD.svg",
    "svgSha256": "338e614fc7b83deb893cd20e34375186ce7e0db29b4938da5d7f67f75fa18d30",
    "wholeGlyphReview": "walk-four",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      null,
      null,
      null,
      null
    ]
  },
  "透": {
    "strokes": 11,
    "pathsSha256": "a46b02784da16f8616fdd83a158e7c3b7996b12227b53bf31bcf3a2b2c988558",
    "originalMediansSha256": "3974c4c0610c036d39ab4d38f93265d5f1b867453263a082ed7039bc58f91dba",
    "directions": "1,2,3,4,5,6,7,8,9,10,11",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/900F.svg",
    "svgSha256": "16dd8dab8b0c3cfaa20411a0a6478036d0a553a5ac93c55e7ede21594b85cdf2",
    "wholeGlyphReview": "walk-four",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      7,
      6,
      null,
      null,
      null,
      null
    ]
  },
  "還": {
    "strokes": 17,
    "pathsSha256": "7459aa527953fc417e5374d15fcd2337f0ad2a798eb47e444eb7b1efbe89ce22",
    "originalMediansSha256": "63dadcec72db2ec09f8037c3e8d9c08dda86504ff673a7f7fc9aad491a34558d",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9084.svg",
    "svgSha256": "ef8bc1e18d4b7e0a41f7ebc9945aed56ed19b73e027fd1d662648a524446ddc9",
    "wholeGlyphReview": "walk-four",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      null,
      null,
      12,
      null,
      null,
      null,
      null,
      null
    ]
  },
  "弊": {
    "strokes": 14,
    "pathsSha256": "c87a6d0f8aeed5310bc80ac08ef9435e873246eaa07a61d287f18e5f8e66cd6a",
    "originalMediansSha256": "ebab2929ffffca89b7d67b774840cca4f7c9711f3c8545c73f9c1aaaead66d77",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12,13,14",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F0A.svg",
    "svgSha256": "b345afcd709b8bfe29a05a6c979bbe2cd8464c7fa47ab78f3228a9812dfefd02",
    "wholeGlyphReview": "pye",
    "sourceStrokeIndices": [null, null, null, null, null, null, null, null, 9, null, null, 12, null, null]
  },
  "兔": {
    "strokes": 8,
    "pathsSha256": "f632caf98a7bd2e97163ea60b075374042402b4d8e0cddc9842458fec7c80cde",
    "originalMediansSha256": "7f7f6d334067e9d130e967d0abd02e3e8066b890f507922059784a8a164d7d82",
    "directions": "1,2,3,4,5,6,7,8",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/2F800/2F80F.svg",
    "svgSha256": "868c74b5d8f35142897d4e79cb62b02009f4d683839de016ac9f556edc9def53",
    "wholeGlyphReview": "rabbit",
    "sourceStrokeIndices": [
      null,
      null,
      3,
      4,
      5,
      6,
      null,
      8
    ]
  },
  "冊": {
    "strokes": 5,
    "pathsSha256": "fa59e6ef890902c3b6e377657d71c5c67690a63a13adb14c5230cb7fd5ea3a29",
    "originalMediansSha256": "03e8b3373f8bd5858c9495f7072ca81e675762fe3e795f9004b416dd9126f524",
    "directions": "1,2,3,4,5",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/518A.svg",
    "svgSha256": "3908eff0d94902c38003ac910d9c24a026f455f1225f846deb5b8d2eda192db9",
    "wholeGlyphReview": "g4-three",
    "sourceStrokeIndices": [
      null,
      2,
      4,
      5,
      3
    ]
  },
  "灰": {
    "strokes": 6,
    "pathsSha256": "2a3f383cd60b11ef9224b2a1b57e5c8410127a70cb070ee5466d6a60d638c4e4",
    "originalMediansSha256": "6d76f3359a06b4ee56ee39dbcf335f4b3326dabf95b867eeb46ad7d8249a895e",
    "directions": "1,2,3,4,5,6",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7070.svg",
    "svgSha256": "d889ab989c73d90c8cb554d99da31b5a4b96dd7c132291addd959ac669e4d89b",
    "wholeGlyphReview": "g4-three",
    "sourceStrokeIndices": [
      1,
      2,
      null,
      4,
      5,
      null
    ]
  },
  "液": {
    "strokes": 11,
    "pathsSha256": "ebbb0c1f212cf859ba0cf21c7a6c6fc9da32877fc7babcda25555f29ec53870c",
    "originalMediansSha256": "e8563155d867cbc30342fbfac15635c7a05ae4a55fefc24d2bf2484f78c4d041",
    "directions": "1,2,3,4,5,6,7,8,9,10,11",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6DB2.svg",
    "svgSha256": "59a03301affa80f8972c9a8e07017b31aa0965b8a1d7ef88cd8dc9e5ee1d55d2",
    "wholeGlyphReview": "ek-po-geun",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      null,
      5,
      6,
      7,
      8,
      9,
      null,
      11
    ]
  },
  "砲": {
    "strokes": 10,
    "pathsSha256": "a902f2539614204af647ecf958701d6aa815ec72f26ee90198ba430b96b855d2",
    "originalMediansSha256": "96b8755ac3c9838b1b013a5c55c129c6eb9a8e8c19ed108de48ba0270b65b7e3",
    "directions": "1,2,3,4,5,6,7,8,9,10",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/7832.svg",
    "svgSha256": "8529fee989c031ad2a6023af849a88ac8494b024259322b2f20112de16d1ca14",
    "wholeGlyphReview": "ek-po-geun",
    "sourceStrokeIndices": [
      1,
      2,
      null,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ]
  },
  "筋": {
    "strokes": 12,
    "pathsSha256": "522136746fce5f285f54ce9ff0b4f65323f3036dfee8f3d0226dee76e390a7de",
    "originalMediansSha256": "b424b0af844a15f2a0d6805d9c0641e26037206995860dcef34b350b3d917425",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B4B.svg",
    "svgSha256": "b8c90a36bed0061541950c9d91528b03a091d31be7c9cc68c4d909225f712790",
    "wholeGlyphReview": "ek-po-geun",
    "sourceStrokeIndices": [
      1,
      2,
      null,
      4,
      5,
      null,
      7,
      8,
      9,
      10,
      11,
      12
    ]
  },
  "衛": {
    "strokes": 15,
    "pathsSha256": "a2784739eec847c1e8269924b4dc402d0543ab1fe140d7950bb8285e4022242d",
    "originalMediansSha256": "b25cd4696fba55a49acfe43fbc4d33c085c0e994f021e1ff4abd83d2536d68b8",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/885B.svg",
    "svgSha256": "0f7b360be2770519d8a62d2767346af43fb58c87f5ac01c8481faf556d373fdb",
    "wholeGlyphReview": "wi-pung",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      null,
      8,
      9,
      10,
      null,
      12,
      13,
      14,
      15
    ]
  },
  "豊": {
    "strokes": 13,
    "pathsSha256": "f19f635092bd361c9fa52c0c2b5f093f1ab3f53bcc698afb231dc8176a77c72e",
    "originalMediansSha256": "efff03d9205a100eb9340c586100cfc9e70fa04dbd19878c7f4820c56426f518",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12,13",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C4A.svg",
    "svgSha256": "422130895490ea88ecb31e5cf4d9b73a64f7edf2631552a02f49e4b21040db6d",
    "wholeGlyphReview": "wi-pung",
    "sourceStrokeIndices": [
      1,
      2,
      null,
      4,
      5,
      6,
      7,
      null,
      9,
      10,
      null,
      12,
      13
    ]
  },
  "獎": {
    "strokes": 15,
    "pathsSha256": "db6c558e00f85b0ca85aeb929f0f02a54c957506dd4225c4cfe37f801d943ca9",
    "originalMediansSha256": "73167052c318491fa18291d0358e9d38c0a4536daa0bdbe49ec0c308931e2ab5",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/734E.svg",
    "svgSha256": "512b07a5e7edf2d2e351ef7849b9217160db2cc930d5982980d2ecba5546821d",
    "wholeGlyphReview": "jang-jong",
    "sourceStrokeIndices": [
      2,
      1,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      null,
      12,
      null,
      14,
      null
    ]
  },
  "鍾": {
    "strokes": 17,
    "pathsSha256": "c1b95882431b7cdbdfc37d66d119e0c0454186ac5d8c0c89bd584eebca548bbf",
    "originalMediansSha256": "e715964c450cea9fb82aaa83bfcbe7605ca6ee977b7a498688138aa9b33db855",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/937E.svg",
    "svgSha256": "175d7465c46851e4e38be5fe47763a0f4be211fd7df27d10c6474c04a540bddc",
    "wholeGlyphReview": "jang-jong",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      null,
      8,
      9,
      10,
      null,
      12,
      null,
      14,
      15,
      16,
      17
    ]
  },
  "藝": {
    "strokes": 19,
    "pathsSha256": "638ab51bc8f7bc172a8664593968390f265252e4a0e40f1aa7faf8ad514a18f2",
    "originalMediansSha256": "564570f6c01c27ac5834231980cff8ca81095cf391cc18909a784da7f8e8679a",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85DD.svg",
    "svgSha256": "1f14646875c991d31c70dc81e3ecb264ffc14d834f1a91cf14a1d41651cf6a23",
    "wholeGlyphReview": "ye",
    "sourceStrokeIndices": [
      2,
      1,
      4,
      3,
      5,
      6,
      7,
      8,
      null,
      10,
      null,
      12,
      null,
      14,
      15,
      16,
      17,
      18,
      19
    ]
  },
}

export function dictionarySourceReference(glyph: string) {
  const ref = Object.hasOwn(DICTIONARY_REFERENCES, glyph) ? DICTIONARY_REFERENCES[glyph] : undefined
  if (!ref) throw new Error('Unreviewed dictionary glyph: ' + glyph)
  if (ref.wholeGlyphReview === 'ye') return {
    orderUrl: ref.svgUrl, dictionarySvgUrl: ref.svgUrl, dictionarySvgSha256: ref.svgSha256,
    dictionaryDirectionStrokes: ref.directions,
    orderReviewSha256: '1adec5d827a60b58dcd93e211e193d1858f040f55ff66176e453612c48c48774',
    geometryReviewSha256: '1adec5d827a60b58dcd93e211e193d1858f040f55ff66176e453612c48c48774',
    directionReviewSha256: '048c5dfa0f93cba1a25f929b8bf250e0a2f38f967aca585d975c45153a3112f8',
  }
  if (ref.wholeGlyphReview === 'jang-jong') return {
    orderUrl: ref.svgUrl, dictionarySvgUrl: ref.svgUrl, dictionarySvgSha256: ref.svgSha256,
    dictionaryDirectionStrokes: ref.directions,
    orderReviewSha256: 'a09f1363158dfbb6300aae8c48d732468073d182215c0412fa1613ea3e8830f1',
    geometryReviewSha256: 'a09f1363158dfbb6300aae8c48d732468073d182215c0412fa1613ea3e8830f1',
    directionReviewSha256: 'ef23f5a91613c2afddeeac6afbf29fa533a0f901d4d80f7d18936c1955f69e72',
  }
  if (ref.wholeGlyphReview === 'wi-pung') return {
    orderUrl: ref.svgUrl, dictionarySvgUrl: ref.svgUrl, dictionarySvgSha256: ref.svgSha256,
    dictionaryDirectionStrokes: ref.directions,
    orderReviewSha256: 'd4adb0cffda065780f7ded7bc2c60419cb6746c9fa54cd9371c64af7aca178c7',
    geometryReviewSha256: 'd4adb0cffda065780f7ded7bc2c60419cb6746c9fa54cd9371c64af7aca178c7',
    directionReviewSha256: '838ec06d1f08b2d93dd5b626703f0394981d0732962adaa7844e5b89f01ca623',
  }
  if (ref.wholeGlyphReview === 'ek-po-geun') return {
    orderUrl: ref.svgUrl, dictionarySvgUrl: ref.svgUrl, dictionarySvgSha256: ref.svgSha256,
    dictionaryDirectionStrokes: ref.directions,
    orderReviewSha256: 'cdae941e0f6123ea540335789f7cba4c6aa575d02cbff37e494470b86321262b',
    geometryReviewSha256: 'cdae941e0f6123ea540335789f7cba4c6aa575d02cbff37e494470b86321262b',
    directionReviewSha256: '34be6eceefc11bc26b767adfd261c0f6fefd50dc08ea5860d4d8c28931a31345',
  }
  if (ref.wholeGlyphReview === 'g4-three') return {
    orderUrl: ref.svgUrl, dictionarySvgUrl: ref.svgUrl, dictionarySvgSha256: ref.svgSha256,
    dictionaryDirectionStrokes: ref.directions,
    orderReviewSha256: '7124909e47f7c97355c9062b21af650826e8ada189888388a848827796285161',
    geometryReviewSha256: '7124909e47f7c97355c9062b21af650826e8ada189888388a848827796285161',
    directionReviewSha256: '07555e6ee2488a0613b3978a26c8afc65853682b2d76fef0a2a59c7cc0113e64',
  }
  if (ref.wholeGlyphReview === 'pye') return {
    orderUrl: ref.svgUrl, dictionarySvgUrl: ref.svgUrl, dictionarySvgSha256: ref.svgSha256,
    dictionaryDirectionStrokes: ref.directions,
    orderReviewSha256: '940f772e8bc3b67d686e7c5784b2a839d870a2486221e10acbee2ebffb7de547',
    geometryReviewSha256: '940f772e8bc3b67d686e7c5784b2a839d870a2486221e10acbee2ebffb7de547',
    directionReviewSha256: '9972837f8a54b241096b4c2b3cd109df3a78c18b121a6bc3e8814c3e80ec050e',
  }
  if (ref.wholeGlyphReview === 'rabbit') return {
    orderUrl: ref.svgUrl, dictionarySvgUrl: ref.svgUrl, dictionarySvgSha256: ref.svgSha256,
    dictionaryDirectionStrokes: ref.directions,
    orderReviewSha256: 'b294d7b3ff0402827c92ccc52ff9d6aa56055ad1456660b820b43aa30daa4003',
    geometryReviewSha256: 'b294d7b3ff0402827c92ccc52ff9d6aa56055ad1456660b820b43aa30daa4003',
    directionReviewSha256: '63ab3c17716ef3da6e7be9fe62e3835e6c744ad468ae364030676d63dcc340fc',
  }
  const bunJa = ref.wholeGlyphReview === 'bun-ja'
  const walkFour = ref.wholeGlyphReview === 'walk-four'
  return {
    orderUrl: ref.wholeGlyphReview ? ref.svgUrl : 'https://www.moyaland.com/_new/hanja/item_01.php?it_id=' + ref.moyaId,
    dictionarySvgUrl: ref.svgUrl,
    dictionarySvgSha256: ref.svgSha256,
    dictionaryDirectionStrokes: ref.directions,
    orderReviewSha256: walkFour ? '9acf5db467609f2bb6d2fd23dca75b61fddf5f897be7b0b477a1e895f48c4a87' : ref.wholeGlyphReview ? 'a03a988581ae438f9db5e08fe6846854f0d343b1b2f2d89552a70a39b7409314' : 'ab877fcc6bcb0d24f78b0bfaa4890b1da76e7e1edb131f1bfa1f105462b5cd16',
    geometryReviewSha256: walkFour ? '9acf5db467609f2bb6d2fd23dca75b61fddf5f897be7b0b477a1e895f48c4a87' : bunJa ? 'e05ddc52b19c21c05c5c59d8f3b0c232d4fc6cb0f18d4a032f5dc781ad2626b2' : ref.wholeGlyphReview ? 'e5929e944b1a1f9f044f5f4cf6abdba00f1eadc7c993cef27803fa26de37915b' : '7a50a6ecc20a69e8311a57cf85960288735910cb7f0c66f890fad7ebdd413aef',
    directionReviewSha256: walkFour ? '487824b99172ff33f512773f5f83c23e86c2a20d3eb927b77b547e1672352a31' : bunJa ? '8a614fbbec1a255e1bba7c7e1c6dfe14e0e3528e0f2527a16e84dc246a25d915' : ref.wholeGlyphReview ? 'a87ee0996533aa8a45f48c17712a609c1023f9e32d732a20e0c369e9f22efb32' : 'fb78cd80c63793d4edb5f0ce34adc7b9851207c39c69b5a905425fcddef25c78',
  }
}

export type HanjaDictionaryStrokeData = {
  glyph: string
  verificationSource: 'ehanja-crosschecked'
  verifiedAt: string
  geometrySource: string
  geometryCorrection: string
  sourceStrokeIndices: readonly (number | null)[]
  pathsSha256: string
  paths: readonly string[]
  sourceReference: ReturnType<typeof dictionarySourceReference>
  sourceImage?: never
  sourceRow?: never
  sourceWholeImage?: never
  geometryAuthored?: never
  strokeOrder?: never
}
export type DictionaryBundle = {
  verificationSource: typeof HANJA_DICTIONARY_SOURCE
  geometrySource: typeof HANJA_DICTIONARY_GEOMETRY_SOURCE
  characters: readonly Omit<HanjaDictionaryStrokeData, 'verificationSource'>[]
}
function sameFields(value: unknown, expected: Readonly<Record<string, string>>) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const actual = value as Record<string, unknown>
  return Object.keys(actual).length === Object.keys(expected).length
    && Object.entries(expected).every(([key, entry]) => Object.hasOwn(actual, key) && actual[key] === entry)
}
export function dictionaryStrokeIndices(glyph: string) {
  const ref = Object.hasOwn(DICTIONARY_REFERENCES, glyph) ? DICTIONARY_REFERENCES[glyph] : undefined
  if (!ref) throw new Error('Unreviewed dictionary glyph: ' + glyph)
  if (ref.sourceStrokeIndices) return [...ref.sourceStrokeIndices]
  return Array.from({ length: ref.strokes }, (_, i) =>
    (glyph === '紋' && (i === 3 || i === 4)) || (glyph === '慈' && [3, 6, 10].includes(i)) ? null : i + 1)
}
/** Structural checks are browser-safe; prebuild also reconstructs every path and pins every proof. */
export function loadDictionaryBundle(bundle: DictionaryBundle): readonly HanjaDictionaryStrokeData[] {
  if (!bundle || !sameFields(bundle.verificationSource, HANJA_DICTIONARY_SOURCE)
    || !sameFields(bundle.geometrySource, HANJA_DICTIONARY_GEOMETRY_SOURCE)
    || !Array.isArray(bundle.characters) || bundle.characters.length !== Object.keys(DICTIONARY_REFERENCES).length) throw new Error('Dictionary bundle source mismatch')
  const seen = new Set<string>()
  return bundle.characters.map(entry => {
    const ref = entry && Object.hasOwn(DICTIONARY_REFERENCES, entry.glyph) ? DICTIONARY_REFERENCES[entry.glyph] : undefined
    if (!ref || seen.has(entry.glyph) || entry.verifiedAt !== (ref.wholeGlyphReview === 'g4-three' || ref.wholeGlyphReview === 'ek-po-geun' || ref.wholeGlyphReview === 'wi-pung' || ref.wholeGlyphReview === 'jang-jong' || ref.wholeGlyphReview === 'ye' ? '2026-09-14' : '2026-09-13')
      || entry.geometrySource !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
      || entry.geometryCorrection !== 'dictionary-crosscheck-' + entry.glyph.codePointAt(0)!.toString(16) + '-v1'
      || entry.pathsSha256 !== ref.pathsSha256 || !Array.isArray(entry.paths) || entry.paths.length !== ref.strokes
      || !entry.paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path))
      || !Array.isArray(entry.sourceStrokeIndices) || entry.sourceStrokeIndices.length !== ref.strokes
      || entry.sourceStrokeIndices.some((stroke: unknown, i: number) => stroke !== dictionaryStrokeIndices(entry.glyph)[i])
      || !sameFields(entry.sourceReference, dictionarySourceReference(entry.glyph))
      || entry.sourceImage !== undefined || entry.sourceRow !== undefined || entry.sourceWholeImage !== undefined
      || entry.geometryAuthored !== undefined || entry.strokeOrder !== undefined) throw new Error('Dictionary bundle entry mismatch')
    seen.add(entry.glyph)
    return { ...entry, verificationSource: HANJA_DICTIONARY_SOURCE.id }
  })
}
export const HANJA_DICTIONARY_STROKES = loadDictionaryBundle(reviewed as DictionaryBundle)
