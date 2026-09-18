/** Fifty grade 1 forms (batch 8) individually reviewed, including 10 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch8.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH8_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 50 approved and 0 held; 10 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH8_DICTIONARY_GEOMETRY = {
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
export type G1Batch8DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH8_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH8_DICTIONARY_REFERENCES: readonly G1Batch8DictionaryReference[] = [
  {"glyph":"槃","strokes":14,"corpus":"MM","originalMediansSha256":"7b5d0f0809b5ed16449ca16cb6a51203675ef9b2ff18f582c57e0de7d3446c00","pathsSha256":"aa2b53ec07fe4b00aeba48f75d25452489724001abd2b808b0467ab3206db870","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/69C3.svg","dictionarySha256":"322909c0584a395d65589f86407d1acc95628712b97cba90697d22de4e14341d","sourceStrokeIndices":[1,2,3,4,6,5,7,8,9,10,11,12,13,14]},
  {"glyph":"斑","strokes":12,"corpus":"MM","originalMediansSha256":"d0ad1035caff26eada40ad76fce9bb8b6fbbbcce500c37d2755fdb3c01179d03","pathsSha256":"35d3753981cfb82863ceae3e7e330b551c6e6fc2681f0e6fa02c7a4ffc3d6187","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/6591.svg","dictionarySha256":"1d63d21f4faf06fcddb2ebce055f4538f9bee2ad46478f3a4a63c90ee8fbcff8","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"礬","strokes":20,"corpus":"MM","originalMediansSha256":"3b3c124f26779ae72bd22bff7252d3dbee5e76fd191b0d489a1e65c7002d283b","pathsSha256":"8a44b3b25f4c0df1034a30997b6ea8055efa05e53f41acbd067f17393b29cb4e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/792C.svg","dictionarySha256":"b329a2eba10778bf1299cae08839bb01c61b3f170cd103ab2db575191f789688","sourceStrokeIndices":[5,6,7,8,1,2,3,4,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"絆","strokes":11,"corpus":"MM","originalMediansSha256":"07d2c5975dfadc08612ada3a5d28b267db6ffc186fde6446b56afdc1d59356f4","pathsSha256":"3f8c99740bd2550352e7be4c7500efffff72fbc5c11f42341ca2a927644f4198","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D46.svg","dictionarySha256":"a130e9d00f0c58de75a638d846f0b8171f8242dced6cbd3afa0735465d5ecc1f","sourceStrokeIndices":[1,2,3,4,5,6,null,null,9,10,11]},
  {"glyph":"畔","strokes":10,"corpus":"MM","originalMediansSha256":"1b30d34830e43f00dabf2a61e9f46bad6c4bcd3e8c8d30f3cf540d48f284d6f2","pathsSha256":"e07fe6f8ed88eb9f1a902593e260c9addeab33d9968fdf60d921503d1380ee34","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/7554.svg","dictionarySha256":"71be3a3eb3adcc3c1f6589f833a47c064926e666b33c5fe38252b8ce32491cd1","sourceStrokeIndices":[1,2,3,4,5,null,null,8,9,10]},
  {"glyph":"蟠","strokes":18,"corpus":"MM","originalMediansSha256":"fc619b5fcb7fb970e1092b4921a86a40d8a59cb4a75fb7a1d197f8d78c83bef1","pathsSha256":"1fad94599bd8bd3f55f983da3c4e37e9cfc092edc8544a2210e18d8e7aeabe84","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/87E0.svg","dictionarySha256":"eda96195465061bfdc7c9b3c6af2131d3d4d2ec74b9ef80e91b22a75c388f37e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"頒","strokes":13,"corpus":"MM","originalMediansSha256":"c015c2f72f928e476957aa5b1d94ad58c9f6eddbeee0ede2143a114ac8996370","pathsSha256":"95cf715ddedcd17cf2b6244f60195425a87a3d662ff3756f92c9568a57cc4842","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/9812.svg","dictionarySha256":"e08773083b232a8ba01c27d229448124aa66db8cb9e1c4a5b1375202b9ca77f6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"攀","strokes":19,"corpus":"MM","originalMediansSha256":"2432bd9ab8774f96ca89de7e2139143423e6d6e05f33ae45a936bfbbf19dfde7","pathsSha256":"12b8bb71f33d6427a775803d370706fd588d4197b7c1893840c4e7784b4339c2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/6500.svg","dictionarySha256":"dcc328d76351ef738849e213949a42cd610f2234847b48090623e4574dc96ade","sourceStrokeIndices":[5,6,7,8,1,2,3,4,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"拌","strokes":8,"corpus":"MM","originalMediansSha256":"4f3f4be0449689dfe5cf134c00d005bf194c726982575e58b63c5149317ef04d","pathsSha256":"8b10b7478f1b6edb0ee9569f950cceb384925cab40490b96269d4b27cf729036","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/62CC.svg","dictionarySha256":"f60ac2b8a2ad579efcb1de2d0a920d75ec3195993680ebf52f487f2c60148eab","sourceStrokeIndices":[1,2,3,null,null,6,7,8]},
  {"glyph":"跋","strokes":12,"corpus":"MM","originalMediansSha256":"b911192dedf9c2caebaf6b902852b2a45cc8a1243b85eeade542a81fcb0df316","pathsSha256":"838469b05550dd95ad573b03445097098fc1de2448bb9eaa41c58febee7b91fb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8DCB.svg","dictionarySha256":"201c38a4fc5a6927fce86df93c8fcc9b7ea2d1838b67b3a005d24425689d68e7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"勃","strokes":9,"corpus":"MM","originalMediansSha256":"c200f7574c0742440553e2d780ca9484fd4cf568255cc684f649e991960b76cc","pathsSha256":"bf94292f22fb6a806a833671998ed5b0f6d2b57381cef08b2e06a21d11b715f7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/52C3.svg","dictionarySha256":"c634f5d336d94ef4ad3f2c706dd859ac897d9dba06c104f898de7e84213cbf2a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"魃","strokes":15,"corpus":"Ja","originalMediansSha256":"8168a2d475ea2c2ccc47adcc49841cd3188cb582f1249e55f502b72fbebaaf7e","pathsSha256":"c7afa22cd56ae91f43baa8a4c27e2c460b85aa1c1ece318751a8d599ac2b1f8f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9B43.svg","dictionarySha256":"d84bf76c46a4989d8055cf08869190730eeeedb2890c1419b8d9b234a334540e","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"醱","strokes":19,"corpus":"MM","originalMediansSha256":"04da5635b11f1d9701754598b609e50f1ae8793acb58632aa2b162a752e8341a","pathsSha256":"8fe382dac58f1e18097c8542983d96cbfc4e8ce2339507759d48d17031087b38","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/91B1.svg","dictionarySha256":"525a2672a3a72c536d091bd2a3e6865481d5a149103a97b38b88717a9fe2eb2a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"潑","strokes":15,"corpus":"MM","originalMediansSha256":"b14ede079ed68861c641ad18c1e75d20db484fc2441a48ee961e0fef3e9e6099","pathsSha256":"6ea450e5d1d589f00b10a5f86ee59b3b9d4b7c15be5bf7e6c2233a8f1990e033","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F51.svg","dictionarySha256":"7421fcf794fbbda1a2e5a0dfe45ca4cdde0fd8264d7e3c66e4510b4476321368","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"撥","strokes":15,"corpus":"MM","originalMediansSha256":"c688fb2f86d48284666006378ff2b1c37a33fee954ff5bfdda2d3de8480ab7fd","pathsSha256":"53ddc519780d7d73f5edf1dc065a8e9792e2ca34e9f7a4216818e931ce3da2fb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64A5.svg","dictionarySha256":"544cddbd314de2988a7568b7653af34bcc17ae64fbfdfd96d1f6bf78858dc2fc","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"彷","strokes":7,"corpus":"MM","originalMediansSha256":"e05676f00c042b6555cce014d9b69d03b48358a9eadadeef53ef92b35daec0d8","pathsSha256":"7d6180bc42ca65b29d58e8d3831aa8dd26ec4320d0bd4d4b5b63338b8ec0d931","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F77.svg","dictionarySha256":"466aee21ca0a53419eede60974cab16ec7b973433fb91901665aaf48bcfaa238","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"尨","strokes":7,"corpus":"MM","originalMediansSha256":"932c96eee2466c03c6cc201a3623794e8f953b8589dd29b562c8bcf8bf7bc595","pathsSha256":"50c35e08bb2b344ab448a1e8e71146b37238b12e73ff6290fcee11475133def6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5C00/5C28.svg","dictionarySha256":"58ec08b3814cc554fda7f8240fe0a3b30d8b863bb0935c1f9c454d4526718b58","sourceStrokeIndices":[1,2,3,5,6,7,4]},
  {"glyph":"謗","strokes":17,"corpus":"MM","originalMediansSha256":"1324e3fd5b545d8f99cef714d7e690dcdcbdcf39708973f85ac5efbf7b4391bb","pathsSha256":"be5b4b0b9dedd94164ad8db5b119ff28bdb511e0ca3df3f792c0f2e0f9c82b8e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8B00/8B17.svg","dictionarySha256":"2fe0282275fa876fec42fe91baf981ab20cec94d5f0412cbe00d48668506e500","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"坊","strokes":7,"corpus":"MM","originalMediansSha256":"1f5f12fed0adab3150d54d6b106cd584d64720d4dc2d2f09b6f58eb4c52f7cd1","pathsSha256":"fe9c5ef9ab5cb44303879f7d921651d2f2d7c894781c22735c5e082cd4762e12","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/574A.svg","dictionarySha256":"f9947c66a0e2ae4b32f1bbb6c02b042bfb6cde7125b533aefd95abd076278d28","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"膀","strokes":14,"corpus":"MM","originalMediansSha256":"cd6b176a568d952b2eeeedf12b67ced07b1445f222b20c56374e31007a31f999","pathsSha256":"f9550e276f0fb914a76a6c866a6eb08d6750437f494b33e59026041cfe8e666b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/8180.svg","dictionarySha256":"1f1c9cb69860b6efea3b3afb84f7087397d1e3608850505ac9c05e5bbc0fb89e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"幇","strokes":12,"corpus":"Ja","originalMediansSha256":"ebdf95a3f8cb539dd27da1eb978f2b9deb8b7329ae33ff795b11cff21b5b5372","pathsSha256":"87232cd252056559ae0edcf266fb2610bd459e54215a1e8eee0ef0409a07a79b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5E47.svg","dictionarySha256":"c075529bdb829a89ec7f10de06bba4bc5ea1847acb45492c8d0dc5fd4d839629","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"昉","strokes":8,"corpus":"MM","originalMediansSha256":"5c86f8e80d88c9f8f403cd3b7386063afc2a7d5199feb6c324d3ba33daee7636","pathsSha256":"4b06fc5160ef0810baa5527f363131f319d184005c97dea211cbe25e7dcab8be","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6609.svg","dictionarySha256":"daff8cd801419e620dee3c543c11247279ff9d89ca28faaac3dbdaf0522bde8a","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"肪","strokes":8,"corpus":"MM","originalMediansSha256":"9979ac20d1042cd496b7a8fcec5100036a118f54c19361acb17b20b651ff3fbe","pathsSha256":"efc5890da0a1c9ede9fb7ab489d26d4a5234a728f078838c7d38a8a2a712c6f6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/80AA.svg","dictionarySha256":"1b9054d2aa1c971de69d4f71b104494a949c6b32477b3a3a9f3c3912f1be2250","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"榜","strokes":14,"corpus":"MM","originalMediansSha256":"2c1664292f5c596c2ea4fdefe3b0d404184792a71f407b1cca663a16e1f74403","pathsSha256":"271288ae0d55cd72ecdb13b43f64d13641fa5a2dbb51809a913a9b7c9cd92b1e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/699C.svg","dictionarySha256":"a1964b9d12ba1db831aad313f1793f17c83f0ca7329097da687c86ab2cd47b44","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"枋","strokes":8,"corpus":"MM","originalMediansSha256":"0c44c7f97832fbcb209c633f52e39379be0206bfa8e8b831073fc4b503e08400","pathsSha256":"2c529a3ea9bc35c4c624528b088f33bc29c13772eb44a7883d1c58065c3dda0f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/678B.svg","dictionarySha256":"d835af98c786ddb624402fecd74a2f1e439eb21aeffe5a07b96b94dce84632e3","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"陪","strokes":11,"corpus":"Ja","originalMediansSha256":"f0176373dd7f6b9f3f5fc94a2483afba6cea82b91fced7cdbc70c1b6cbd4c949","pathsSha256":"2b94ab9e7d52d10076e3561990a08cd1da3e3939aa8c43f50640aa1715b3b29e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/966A.svg","dictionarySha256":"75ece3bdb84f52ce424989a4f1dd5bb6c181cf7e836fe63c21148dc93673f61a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"胚","strokes":9,"corpus":"MM","originalMediansSha256":"54b3e759be25db051c52feb52ad9b98abb7c74c32ffb3b6b6111e128145bca2a","pathsSha256":"534c48e5f653ad110f853ba4f457913274c93e03294f21984e359d5d692870d1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/80DA.svg","dictionarySha256":"15d629693f24b8d8454630388a337c0d4203eb0166b2cb5839d311331f67fdaf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"湃","strokes":12,"corpus":"MM","originalMediansSha256":"89e9e1e329255771a36ee035368616e4b7fdfb32997ee65d503dc78bbb1235be","pathsSha256":"d771e5d58d3bdd19fe339991736f898fa1ca83f01c9a1a3c842e1fb2fee40dcd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6E43.svg","dictionarySha256":"2f43b257956066765cf74ec522754a998c76e16461d771f4155055c1f4fb9952","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"徘","strokes":11,"corpus":"MM","originalMediansSha256":"939f8c8fb449ffa7aa0bd0f03e7f057b4204dfbddbc466d2fcdf454bc1bf65a4","pathsSha256":"f0d0011cb22362a236dce652a218fe09b890648b1960a75dbb57c8a6af555be4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F98.svg","dictionarySha256":"006f85cef4303ed716d178b3f82903eacbf4e250e6e5f1307a75ce2d68d9a2f3","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"魄","strokes":15,"corpus":"Ja","originalMediansSha256":"0a31da622d91a788a80783551b8e3be1c6fadbb1acfa234ae41488bde88c3211","pathsSha256":"b08325384c1a2a3ec45a1fa6adb7e7be85fd891a1779126a5817fb39582a218a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9B44.svg","dictionarySha256":"9f60b7dc60408c12ed8dd56b8d94577bc1811ad06693b5e250b7d2b26a5c1ec5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,10,9,11,12,13,14,15]},
  {"glyph":"帛","strokes":8,"corpus":"MM","originalMediansSha256":"93ffc2cebd01d58a8f75433247f90f7128e7c92d4d5b1954f9b8888f1f571f2e","pathsSha256":"ffe020932e096864fa53eceabbb033c3fdb8f65de396353a0f8fa82fc7b07954","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5E1B.svg","dictionarySha256":"43359ce1ac3e9372da5ce852e0c3000add81fbf40107921c42aa39fe9affbe35","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"帆","strokes":6,"corpus":"MM","originalMediansSha256":"30b163659490334b1e56f0e88ce1620a8f86f81ea6303a95d3ee1e6e9606c704","pathsSha256":"f59df4cf642e8e5752c6927775169a210ab2372d61b4c5e587862529f8954251","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5E00/5E06.svg","dictionarySha256":"1441231a38dc09cfc9591e8b20477f2a978bdc6bf6deac78259b4fa311195215","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"梵","strokes":11,"corpus":"MM","originalMediansSha256":"9a2790268d9b7ab97e8f963ced1736ca46c6f1845adee3aa3425c33be20f84d2","pathsSha256":"03dbf0b61e05cb332b90a2da056b8675b9073ebd3829efd62a3efec055f80589","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68B5.svg","dictionarySha256":"70bd2a8dab6cd7948f5bd3f3109716a4dea0759ca233eec27a5de9d3c34f9bac","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"氾","strokes":5,"corpus":"MM","originalMediansSha256":"320c3202f4b2b5c5a6a545d69629afd58d3520213cf0a53d522a8609aa6e8f44","pathsSha256":"934fa696b4492a5be9a548a53d03410d722612f1be82c4ede5ca8749233f3f6a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6C00/6C3E.svg","dictionarySha256":"461ae9d2619c479d7e049965c538de30b1473007c08b9d060f58e1ec98cc0dc4","sourceStrokeIndices":[1,2,3,4,5]},
  {"glyph":"癖","strokes":18,"corpus":"MM","originalMediansSha256":"6a7f8b3a600a62c4bfb9bd33f38fbcff9ac24fb7f975647dad7d9f8dab3fe167","pathsSha256":"0b6f901bd374c1c04adc3bd89d42a5c3e1d1ce5b0ce20622a453a132bf5a4228","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7656.svg","dictionarySha256":"a016e95630f726753d1b42029536666e1c37932574dbc0b4d9d442a8a19fbeee","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"劈","strokes":15,"corpus":"MM","originalMediansSha256":"420fce47042a561790255f6a9b14ebf198d3eb092e2b3ce836458d0e3d516dcc","pathsSha256":"2a28b6e8b026f708ff3df6b0cdcb4ee602cce60e8726a6f403d8dba063077b8f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/5288.svg","dictionarySha256":"80e163072afad8d9f3b729b76367701e6453cb1f5cd888e0ce27db6262985bdf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"闢","strokes":21,"corpus":"MM","originalMediansSha256":"7ec43c491a5fc4c6972acf3329f6eb1307618ff6aaa1799180d84b69f0d80412","pathsSha256":"815d867d38a0cd41b1157d7fe29dc3923ca6c9c246e50ea317ec4a191ff8bc3b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95E2.svg","dictionarySha256":"1d1d8c544e2d764da7a9048199eb183469c3eec86611a243d7b5439992d886a1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"擘","strokes":17,"corpus":"MM","originalMediansSha256":"5e7b3e279810317b9463a026b01f5fb63f50bb25ffb7dc5f3b356518bd8929ee","pathsSha256":"1be06a99560a71df0d778032b123a85c941235a5e20c293f72b2eab1061fe085","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/64D8.svg","dictionarySha256":"47029bdc213f4b0d24081e174123cf1de6042bdc077d413b2b99f9615fb22268","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"璧","strokes":18,"corpus":"MM","originalMediansSha256":"c009cf134e420773a1090aa4dfb0e64bf5e9f3ffacacd2883207e91a067d1280","pathsSha256":"ebc2f5df5f5dc5cb7f52b9aa86dc629f754732e705a1b407f160ce648f244407","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/74A7.svg","dictionarySha256":"31c3cfca68d2c4fa910d30d46078d4dc4336198b001514ecb0ef9865d864486c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"堡","strokes":12,"corpus":"MM","originalMediansSha256":"055331b573b6f965705bf33656486a59093cd8814e9055fbc2600022bbe4154b","pathsSha256":"1975488642363323819b5ecc8d8fec57ca6ed9b60e969a0b472e443b4742417a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5821.svg","dictionarySha256":"183565b967a3934de7b2770b395f3daaae938369f4a8fc7a256f0b8118d5cf84","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"僕","strokes":14,"corpus":"MM","originalMediansSha256":"9850e29bb57e6eb1f2ca5a1442e98ed66215277293402aec4fc06dbf477bfaa6","pathsSha256":"744783a4545629d326eaaff9fc3c9f48bab1d0859c554028328ceb77a5519563","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/50D5.svg","dictionarySha256":"21f1be006709d01fd16fcd9c617e41d82f6c81a287b3fb23f39256fd70ccfd20","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"匐","strokes":11,"corpus":"MM","originalMediansSha256":"82deb34275f7460a08fc8692bfd80f2bc426705d7e0154cb8d4ca65e4840afcf","pathsSha256":"203dd1394460b164c018f35c73c9b8e60ffe3de5f59fe76c4e9a1eaf0057e74a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/5310.svg","dictionarySha256":"c0c875104e8309b807d4b35699899b94e68fe713ba38ec093ac68da3d48e8185","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"輻","strokes":16,"corpus":"MM","originalMediansSha256":"2d39a4cb6422fb0c1c08037ed6e9bdfcb4b6adbcfb8dfd02bfe0b3defc6abe57","pathsSha256":"2e6e4f1d1810213c5680e57afb1a182ae86f665d416edf358535581b3c4f0ff9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8F3B.svg","dictionarySha256":"34cc4e8cd7d1a51bb5dd713adc63a2fb0462d6e477b3771100b843ea647eb2e0","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"鋒","strokes":15,"corpus":"MM","originalMediansSha256":"25f37c4e360f226273f64115bd3f61ac5a77764c7f9e593229b2876ed02d485a","pathsSha256":"e6b783b21b1e0593fee2a487f4803347732fcd5b6741d508c3bba3266aa107c2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/92D2.svg","dictionarySha256":"f192f6c6f8650c7a27f70c00615370304fed04c8a334ebda6dadca430d6c8402","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"烽","strokes":11,"corpus":"MM","originalMediansSha256":"5d88cc88ce328a8027e268ded44d8de3f6ad7a4c0325d9b34a7d252a571632a1","pathsSha256":"efbf71f7895bc70e84763175ce3c2c3080c2ce3074720264e69a76164dac6250","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/70FD.svg","dictionarySha256":"4c2e7924c2f79151ff4549858b7f68166bdca125c0a4f534c2108830c3a7c719","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"捧","strokes":11,"corpus":"MM","originalMediansSha256":"edc0b5a5af13fa17c7d9685a26b9a157593787d2aefeeb715ca4044fcd3ed397","pathsSha256":"a181291238305ed5c972ae409481ebf0189c813f81fa035a07380c21e45f73b3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/6367.svg","dictionarySha256":"94d593e03f8b39e96f0ab9f1baddaf5b4dbfe9c0d78d50e6c95357d3ebf4182c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"棒","strokes":12,"corpus":"MM","originalMediansSha256":"7fa9b258e230cd357131a4e191d57feae6513377e40819cbfdbd6b4d215d6ebb","pathsSha256":"0548c4d8601fda6485fedb04a5c0f75b5f391c8d97e3ebc27b79f239d5dc1b86","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68D2.svg","dictionarySha256":"4cd196747a956a00e5ff5d5658f04e40f5fc1129015c707ff7b4da98ecdb2a28","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"賻","strokes":17,"corpus":"Ja","originalMediansSha256":"40d9411c31839127aad20ae5f5653de1f3331e484c51cf71684a1ccdeac2db08","pathsSha256":"a03e4c89657817803f5e3c0284210aeec8e97be636993d04ad0f66175b7e1e75","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8CFB.svg","dictionarySha256":"cdddfbf6dbc1243b62fd1d7e45122b8af90c9994cc2b7fd7a37520d24e186cfe","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"駙","strokes":15,"corpus":"MM","originalMediansSha256":"ba31d8e721d7b6236c529e33ccdcb2a4497507e405b3bf5ee0f1bcc59820432f","pathsSha256":"007638c81772f46afbdc98fdd027bc8398032e138f340ca8fd03e4282b94a9ab","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/99D9.svg","dictionarySha256":"2d51b19ab9afc63c1ab1864fce12af4d3e4e03ec67d4175afbd6685b517e7f7d","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"訃","strokes":9,"corpus":"MM","originalMediansSha256":"86cb5d24a2562de25345ac94b6e049183773c971cbd1aee292584a5aac21198f","pathsSha256":"e67ce6588ad298cb21bf3d016feea7a732885fb7971b4de21963fe7327a35f65","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A03.svg","dictionarySha256":"973e706a202de959404b21b4d595f03f7fc6140eede924241b0503487e10682d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
]
export const G1_BATCH8_DICTIONARY_REVIEW_SHA256 = 'cba5c888eaeccfd1cb82ea53db5bc86bd287e49af50be7b906011fa7451e9e38'
export const G1_BATCH8_DICTIONARY_DIRECTION_SHA256 = 'd2c27e891519f970c1a10a20d35199127d573c30555d29fd8c1d36b7aac8a75d'
const referencesByGlyph = new Map(G1_BATCH8_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch8DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch8DictionaryMetadata(ref: G1Batch8DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-19',
    geometrySource: G1_BATCH8_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch8-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH8_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH8_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH8_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch8DictionaryBundle = {
  verificationSource: typeof G1_BATCH8_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH8_DICTIONARY_GEOMETRY
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
export function loadG1Batch8DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch8 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH8_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH8_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH8_DICTIONARY_REFERENCES.length) throw Error('G1 batch8 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch8 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH8_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch8DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch8 dictionary entry mismatch')
    return { ...g1Batch8DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH8_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH8_STROKES = loadG1Batch8DictionaryBundle(reviewed)
