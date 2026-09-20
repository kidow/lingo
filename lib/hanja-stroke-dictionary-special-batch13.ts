/** Forty-eight special grade forms (batch 13) individually reviewed: five reordered and ten locally corrected; two glyphs held. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch13.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH13_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 13: 50 characters individually checked, 48 approved and 2 held; 8 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH13_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch13DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH13_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH13_DICTIONARY_REFERENCES: readonly SpecialBatch13DictionaryReference[] = [
  {"glyph":"漯","strokes":14,"corpus":"MM","originalMediansSha256":"a87f76e42ac5c0ea53a763664193fa5a89f1a6fc57d2ef3cf4aabc731af936f7","pathsSha256":"29c3087de4a94bceb5fb12cf89c0007213c966f8df3e1839488dd7b3d00ca6ff","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F2F.svg","dictionarySha256":"d2be87a7d00015338429b5c078626f101b5e9ce4c2438431fc0b8dec778c38c7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"蝪","strokes":15,"corpus":"Ja","originalMediansSha256":"11bce34c6a48c96ce2152d9473771e5482d5dcc6dc25bdaa205efe1910e9e132","pathsSha256":"3e247c0e1fce02e75c2d5ab145226407dad870dc90aae1ae03177c16acf757b3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8700/876A.svg","dictionarySha256":"64dd1d509e70a0622ce557a95e8e8c31178d4d37d6cc18dd501a0f4d3f54aeb5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"盪","strokes":17,"corpus":"Ja","originalMediansSha256":"e7189251ca577396dbfc6dcda0f176132cb0cf1ca1460ae849f896fa96c318c2","pathsSha256":"735cf79ed2783d972d161050827f72000fa2d378a557e128b7304ebe85ac52c2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/76EA.svg","dictionarySha256":"0a7205e3c99315978174db2a783fd552b83a1288aa7dde6dbd54a94c8baffe1f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"噸","strokes":16,"corpus":"Ja","originalMediansSha256":"cf782264e815ff7aef1f2a8b2bc56000aad6ad83d0ed33eb8b544e8e0497e34b","pathsSha256":"a2c4a22583915bf6ce07759c54c07055323a453b3f7998504cb8209093f3d35f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/5678.svg","dictionarySha256":"a8771b9b99dfaa52bfe200b81715acbef18607a0a0322a4df390d190617eedf5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"瓲","strokes":9,"corpus":"Ja","originalMediansSha256":"dbbb5497029167356dff432ba3d863099e560c2d0f4a4aa5696fdbf45d903245","pathsSha256":"20066d097262b744b34cb024cea9e556768825baa6cead0fccc29f62fcf48e24","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/74F2.svg","dictionarySha256":"4266e432dcc9fb94243b4493d5f2e9b89b878c8db24435772bf0098b244ebd42","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"恫","strokes":9,"corpus":"Ja","originalMediansSha256":"4a14966beefb9c6a96d69aab01da94dd74470c111b0d5acae809ec5d32f94285","pathsSha256":"b51d7e7f0768036f46921e016efe11e9ea0100ce6d949cf87a5c7588a66c8aa2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/606B.svg","dictionarySha256":"44a2a423c28b11431cf038645cb55e908f56ac83ba18d0d07c4c418e511c97a4","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"渝","strokes":12,"corpus":"Ja","originalMediansSha256":"b8ae2abf06355327b8973425030eef54c56f77b25de459d1679a2c88295c3e27","pathsSha256":"ac852d705742090582935c9e25205b2adca0296392e56f9884fe27c4a29897db","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6E1D.svg","dictionarySha256":"b14fbbf43d2f3e7d957d4c581f0e6fe0badfcb7342a805cf878429ac38c439c2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"忒","strokes":7,"corpus":"MM","originalMediansSha256":"6cf947d74eb1fe8df8c37408ee803d62f3496505278b6e9a07254ba4ee608b30","pathsSha256":"5d254e6b8c0213be25ea55dc349d06e0317d86338300cad60fa5d743f08bebdd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FD2.svg","dictionarySha256":"89603e63365d41e61042cab7d9f747fe16af7ed13cd8b4556570fd850ec2da82","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"嶓","strokes":15,"corpus":"Hans","originalMediansSha256":"694bb9fd787d55e8d43cf24feb971e9e9f3003d29fe6252fc4edca5ad37d5d87","pathsSha256":"8d7b3980986f17703a7f0fe9251a66f34f5899327d81f9a064490e08d1e30f40","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5D00/5D93.svg","dictionarySha256":"143306c93ad1fe60f43453cfb22268851abdc67b4e839c28b782af462c7ad57f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"皤","strokes":17,"corpus":"MM","originalMediansSha256":"f61498667fb1f5ee29858fc9f8be18565526d9b35262a4c4da15b16caadba83a","pathsSha256":"1e6e88f203468970117a1767d62da0928104f830bb27784c4934993d581d0f49","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/76A4.svg","dictionarySha256":"b162b278a03a75dad25ccf26dc5af01af37d6e8b3f9213bd5402eb3410bd3cad","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"簸","strokes":19,"corpus":"Ja","originalMediansSha256":"814eddb2cc0f09edef4bbc8902a568b7d8add02edede6000745bea80ac649fe0","pathsSha256":"1dd5e846b1de73a385c7ba4a34cbdc74c144bb1b1c2f4ea803f8adc96d566da5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7C00/7C38.svg","dictionarySha256":"6439f3ba2e51fe48fa40e4cbc4aee9f983a27051ce02fee86e3fc5e7edfcec80","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"旆","strokes":10,"corpus":"Ja","originalMediansSha256":"ad2a838787eded08e2e49bffacea500e2efee3da38288bf8de901dfd8e2122de","pathsSha256":"98278a788c6b393968412b26060ebc6d3912d0bd1ee896faa28a6bac612a3add","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65C6.svg","dictionarySha256":"956cec21c7b40b72d6380b5b4c8efd86ea6636fe496ba61dc2c83a61e78eff3e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"孛","strokes":7,"corpus":"Ja","originalMediansSha256":"2e4371ab7c05a5b03a1e492e629795415124884877f81f331066de0db37d4c51","pathsSha256":"2663ab5eabb6cdbaf1c2f68aba5772a4ba1b9697d1ba7d3740dbd06326e21453","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B5B.svg","dictionarySha256":"fdff84c91f0383288788b7158e6654f01fb2470ae5b160c33e365ce8cdac7524","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"苹","strokes":9,"corpus":"Hant","originalMediansSha256":"994247be61912f1563e2b157e0b8d646ed5fef187072b9b3e8daaaae19058846","pathsSha256":"808977798a0c2aa9778807a1fbb9240e2dce6d0e4e82df8b453ffd38e31ceda9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82F9.svg","dictionarySha256":"517fd367da26c05a28201f37fa7f26c067207552ab3985bc5e6b6bc77971f598","sourceStrokeIndices":[2,1,3,4,5,null,null,8,9]},
  {"glyph":"麃","strokes":15,"corpus":"MM","originalMediansSha256":"32ee327597109df48f02ddca301a004b1dc72e3b2cb3dcb98820ea350558b10e","pathsSha256":"780c8c71ad7b25717c604378b0eea72add367eaa44df30a0c155ae557c2c1021","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9E83.svg","dictionarySha256":"1e1bdb4a8d12e57081c7611457be9f9f671527f2638b056d0727b6aea38bf847","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"襃","strokes":17,"corpus":"Ja","originalMediansSha256":"d88b7458de43dfcbfae2440b92ed4555c663322a1f4d63ece279648c54c65840","pathsSha256":"8671efa4a614d9147689684a561a6785d15d34ae130491229957db430baf1242","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/8943.svg","dictionarySha256":"4da90ae82b3a6814f31713257720a4324e930fe3c7459fb38694d7f91d121938","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"炮","strokes":9,"corpus":"Ja","originalMediansSha256":"59599efce895f69c6eae11154e30efd427d69f1bb53de65762f3f40d08a6deba","pathsSha256":"78b62abf835b91d51a2a046bb9cfda4f8674c89ecf9d564a2298b6db8ae06dac","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/70AE.svg","dictionarySha256":"00b23566f7c68964acad259b9caab667cf4140329eb5284cdc9327eea56aca9c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"鑣","strokes":23,"corpus":"MM","originalMediansSha256":"d2d6401112cb35e0a2e6506e6aeacf4f7ead907c960ffad6132c480cb03ce283","pathsSha256":"571b8b3df92388cdbf5ff496e8ce0508e670be5cddb7b62d0020c0275c5f85e8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9400/9463.svg","dictionarySha256":"c0b077e7e0953df9efac473d645025b7afc63fdf1e6da480aa8934f6d4a5f657","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},
  {"glyph":"瀌","strokes":18,"corpus":"Hans","originalMediansSha256":"66e38f65ab18742eb33af2e7184b04d5247d1c5968e9168596d41b7d6eecedbb","pathsSha256":"8ba795823fb75ae15feb32f1f94f30e7f5416374a4f1fd628947c5cf4d0b71f8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/700C.svg","dictionarySha256":"31bdc99a723802f0ebd4b9847a5e23d15580d90ca61c3a159d563fe45be37bd5","sourceStrokeIndices":[1,2,3,null,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"飆","strokes":21,"corpus":"MM","originalMediansSha256":"cb90ff6f04ac533ea7f1090c742dd4e2e691a33970f65dc1f74b8f3f35351660","pathsSha256":"c885b068131c6253390e84f050cadda2a8b39c1d7480cbe9e2bf24a7ca50a6dd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/98C6.svg","dictionarySha256":"ccdf44ec15d96345814b8433f6e27da3c587da633d5c0fe88c7f7ab419287b58","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
  {"glyph":"摽","strokes":14,"corpus":"MM","originalMediansSha256":"e26543b82221f4156562112767114dc1050dd58ae1991c309bea99058aa8f14e","pathsSha256":"38fa66b406bb6a5c4641fea8dbbfeb9adc3e99f7384c8aa0e5409c8ed6631af5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6400/647D.svg","dictionarySha256":"c5f70ae9fc5bc3a8ba06f2dcb8f64a23f2f313a8a50198310962fb4576ced642","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"殍","strokes":11,"corpus":"Ja","originalMediansSha256":"931d4bf801d7104dec9522205312e12952148cd4b01fac8cd97cde23506f436f","pathsSha256":"d044160dd95f0c1fcc6dc9b5cbc21276334689481603926bdc767db90668534f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B8D.svg","dictionarySha256":"63b345c8904fd57d25ef85d9515a020af36f7483e0b91fbdb7a37d0be4117719","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"嘌","strokes":14,"corpus":"MM","originalMediansSha256":"9c6c9bdba8dbe839fae2bfe7ec6759dd9bbc84844efac2a5f5740bb9c49dc11a","pathsSha256":"636c803e812e597d4e26257b9f643f03e20ca72caff2adc3c321f9f1783e1670","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/560C.svg","dictionarySha256":"f370167d15dbe223e9b58bc7d3dee45350401c987b9f64542494431e12092d48","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"豐","strokes":18,"corpus":"Ja","originalMediansSha256":"580c8011a764352f2e07a3660904456027da0eafd89b660f569457503c59629c","pathsSha256":"e823828ebb2e9dfb2db073e17fc1ab0e60b884fced51d5c3d497f63ce1f81035","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C50.svg","dictionarySha256":"37187a610fa8ed8079e5aabe3a83357b6fbd7049028522bfc945450e0a498377","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"觱","strokes":16,"corpus":"MM","originalMediansSha256":"a69ab5ef5db1703e3a11e6f8cfaa145933e4a9c38aa7f10470308275af7a73d1","pathsSha256":"2bb7a10c05f5f147b34993ab9ae36198d619def993adb299e634b73359204d80","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/89F1.svg","dictionarySha256":"03bd2f1998a3e3945dea5d6d2a3e3d95561aabf70f49f9148b145d77cb596dbc","sourceStrokeIndices":[2,1,3,4,5,6,7,8,9,10,11,12,13,14,16,15]},
  {"glyph":"呀","strokes":7,"corpus":"Ja","originalMediansSha256":"7eb74e195ae2ba4487a5b13b3c7124edfdae68bbbdecec72ead2b8c851dd3b4b","pathsSha256":"40e7254f57575b26fb3a2bf594a9a48d7725a2cd37e32a8bf18416617b0df063","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/5440.svg","dictionarySha256":"8be9d2e5bfba3a8823b061fcf54f8364fe604072b7b0102ab03dce233454911a","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"嘏","strokes":14,"corpus":"MM","originalMediansSha256":"292bfe01b0bd7a7b406fb3377f4fcc71f5df396c612daa49b64bee5a8aca7f99","pathsSha256":"c968f6626b3adbc004ef1087e1e23d7e4cfcec9aa549d272b3cece9477d375da","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/560F.svg","dictionarySha256":"28c83485574aefdbe4015281aa7602adc1e49f9ae14f27487f1d97f9c015600d","sourceStrokeIndices":[1,2,3,4,5,8,6,7,9,10,11,12,13,14]},
  {"glyph":"翯","strokes":16,"corpus":"Hans","originalMediansSha256":"4fb59577c92d130e8711c888563f8ed69992233072f8c23813e711cee969c4fa","pathsSha256":"2eb7f24167327b43bddc51cad24146dbdd7cbd1b69973635f501138748e59e7f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7FEF.svg","dictionarySha256":"a001343cc525a0b9949dac2e15981cfbc154d51b5fed99992a692a506f7d0475","sourceStrokeIndices":[1,null,null,4,null,null,null,8,9,10,11,12,13,14,15,16]},
  {"glyph":"扞","strokes":6,"corpus":"Ja","originalMediansSha256":"bb1fb80f0afa4db67017dffe148ec7aedaf05ececd7228ab46fa0951881c9e6e","pathsSha256":"ff1c4c90e74972f4d2908ce8443e9d64ccaaef8d4e5557a9df1133852570a8c1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/625E.svg","dictionarySha256":"f41ef528da9e87cd03a68ea550e6fe3cd400b61091103d6a30ed8f9af05e4109","sourceStrokeIndices":[1,2,3,4,5,6]},
  {"glyph":"劼","strokes":8,"corpus":"Ja","originalMediansSha256":"df859bd82dcd1ef15a2b127fa592ae83b98178e50a30afea87615f28a6b40b07","pathsSha256":"561b4b7d23896e0b8e9afc18a2b2f870d39fc266332f8ee508a9993eb76c77a3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/52BC.svg","dictionarySha256":"89048664e833409ddf85ac51dadaa9864be1824a9e52a5ca5672324cc2339e5a","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"嗑","strokes":13,"corpus":"MM","originalMediansSha256":"7d40957d1f41392cbe695d4dcfd78233e1f3dbd14d6c9ebf46a117fc605fb576","pathsSha256":"4a01310a8b93b1459155c04417dd4300b7d6008722157534f27f303ded5c24e1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/55D1.svg","dictionarySha256":"134c037ba2353d5cebdbce18756c31e88916ead5b7f167d41809e7d246bb855e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"柙","strokes":9,"corpus":"MM","originalMediansSha256":"5dd3243969de61b29d150c26ee1c137666a6433fbb947230588933a262521a6b","pathsSha256":"c66206c879b32ecdf5d3ab79076fb295903db77f2f6760a05d2936bfa8d2a064","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/67D9.svg","dictionarySha256":"3f5c85451c0bbec536bda26f09a3b83d6556615fe24956b9c815fe8741eb0e26","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"盍","strokes":10,"corpus":"Ja","originalMediansSha256":"4681d02eba2694788369beb465ce7c31e961f000d59b713e5370c999df12e84a","pathsSha256":"4334d4d7b599d55ce92f71a59dcfdb517f3d5a403bd0fe4f956bc3ef9c93eb18","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/76CD.svg","dictionarySha256":"32cb048aa2a25380f03670d101cfb0d54c89183c653df0e15717b530db312a37","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"頏","strokes":13,"corpus":"MM","originalMediansSha256":"66bbfc3bff903766213d5a1148ec3e6df61ddff7a8eb070c63e4f7be92c25c48","pathsSha256":"bc52d3d0e984132370ce727aa3c5ce0cdd7d907f2e5ba2d8049ae3f073868ef6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/980F.svg","dictionarySha256":"72b5c7afaaeb58fa90173622f8a9bad2d34329e30edc13034f41c30437cf16d5","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"醢","strokes":17,"corpus":"Ja","originalMediansSha256":"e7f7bc92c30a42c1c82b18c5dee525a2793dec81d532bd8e2d66ae9d6b3e9ffe","pathsSha256":"265819e7a22aa10926e9d104a212ebce9efd42df841efaee75d77657a8204867","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/91A2.svg","dictionarySha256":"8382790578470ee5d1f4bb9eaf4dc9d5c87676f1e3652090b5e6d354c8500ca9","sourceStrokeIndices":[1,2,3,4,5,6,7,9,8,10,11,12,13,14,15,16,17]},
  {"glyph":"覈","strokes":19,"corpus":"Ja","originalMediansSha256":"73dd4498b16cf974e80bb1519ee7ab6ed932bc2ff06ee843018fa7ef997dfdc3","pathsSha256":"a9430bb3abd400a877d46ed6d27a3967fa6d9bba2cf0f820d6db395b560e47cc","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/8988.svg","dictionarySha256":"b642fdb4903c9128a4ac08e6cb94eb405253251a92d7efdfde59049c45673a86","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"悻","strokes":11,"corpus":"MM","originalMediansSha256":"52f3700f0117d7ea051423f167ff4d57ebbf55fdaa5032a54371185b47b55030","pathsSha256":"656a5da714243bc1784042918c43e3f1655e6031fb797187d93aa481d81a5997","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60BB.svg","dictionarySha256":"2600ec5f25c9e5fb5911858a87201e722daaca667318a4daf96dea515263a367","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"栩","strokes":10,"corpus":"Ja","originalMediansSha256":"3b09204c5e5f7312688f6d3492052d0aa6077143920a754b34a28c0c5c3ccbe4","pathsSha256":"c490b6fef8f7da57ca6c6cfdfdd6b5703f00d13225dba1dd54025567888904a2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/6829.svg","dictionarySha256":"5b331a51c5230c1325c410f118a1ce4c1c9cdbe4f8bdc6afcf53d8a1df040b67","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"洫","strokes":9,"corpus":"Ja","originalMediansSha256":"8142982a9e5a214e3d537bae143474affe6749c7e582063840d00637670f8565","pathsSha256":"ae0df17d7ac193bab9c6b00e47d173fa17f4d69a21a4b03a6a945dccb6b6fde6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D2B.svg","dictionarySha256":"2a386c15a87c2f05561da863a333cc310a21c40b6b15f03e4fb23abcb9323d45","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"儇","strokes":15,"corpus":"MM","originalMediansSha256":"93c7996e2a31826ac592586d83f34ec26db8678c8fbcd5c0d8f10b3f2d6aa416","pathsSha256":"f7d9eb87e945221844708cbf333243ef0bce5d257f96ddd054b0061fb5597ec4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/5107.svg","dictionarySha256":"dfe344f9281789c06ea2be3065f2d1a73cdf5e25d7a60bb5a3a7ca19800b708f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"嬛","strokes":16,"corpus":"MM","originalMediansSha256":"a05760b728909532de16f0f4fe7d44b39a9a16fb235623706d6d0d91b617e155","pathsSha256":"6de6a252525f644ae4c0d2a866fcacac824d1ab95c7f3f1884d2f98549e050d4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B1B.svg","dictionarySha256":"08dbd84672c678d1f10bd1b98d3da2b58ba90f9a6108be13a45662941f907edf","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"莧","strokes":11,"corpus":"MM","originalMediansSha256":"29bca70c2ae73fefa0e42e31fd4c1ba12e74d75e8f777f4cc12d7b5542aa9334","pathsSha256":"24660b7f3228ed9f2ce10ad2626ba51a05ef0bde37da6e73d2eb112b28b4603d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83A7.svg","dictionarySha256":"7f7a5d3c9c6b1209dce7c7c3ab4632153d8557c374473649bf47dd8a40389302","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10,11]},
  {"glyph":"絜","strokes":12,"corpus":"Ja","originalMediansSha256":"4cd146a63a3f6138d6b61bc3b7a063821004f81d6ae8fd46a3eaa3954613183e","pathsSha256":"48a1c485becc3d4d611c30d3f906ee763ba605b62367fa61609bfe724da336ce","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D5C.svg","dictionarySha256":"f7e41342bf3d928f40f52b19732d1f2ea69ba9b275e395d9359195d51795f86c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"恊","strokes":9,"corpus":"Ja","originalMediansSha256":"79d64f8a7445c0e3b5397f2da7a83a2454ab3889ed9db4e49e18904398ae4ccc","pathsSha256":"980383f99b7c5a56af4ece4afaf65ea5764e59f6a8cdd9c00986e75d245c5b61","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/604A.svg","dictionarySha256":"8df58f6f29f965885d531f7f382ed8d583d3d7e9ab4a0a2da914243d9b7e1b52","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"盻","strokes":9,"corpus":"Ja","originalMediansSha256":"177036e918d56bcbf1c719583bb1395012621d2a458e5e18d5018b749eacd32d","pathsSha256":"5bb1e754206d67ab3566972abd3dde6d2141658c64e80811220906bc787e09e3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/76FB.svg","dictionarySha256":"40180a775803905b8192458a1dc13f04c69168d6a0a80921d01d0c0719d63ae1","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"徯","strokes":13,"corpus":"MM","originalMediansSha256":"89d46ee6e9ecc8850dc0e54f7d7238ede8022610d3d2b8da4f300c4979ba2ff6","pathsSha256":"7747fa1a2a7f7af1c5c9692d5019c61ca8b902b6b42cebe2455efa94213b941b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5FAF.svg","dictionarySha256":"433598239d88185b62475717c62aba0d78080f00d191570f536adbc9a91cb1d6","sourceStrokeIndices":[1,2,3,4,null,6,null,8,9,10,11,12,13]},
  {"glyph":"怙","strokes":8,"corpus":"Ja","originalMediansSha256":"3c1b71eed6c84d6e20669771d0db08bfc8ae4a0a91617aee9a12a801ab7104d7","pathsSha256":"892427f3bab4a34ab9c913a6beba9c9ff571f01403c4f3e367c1f283e01148c3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6019.svg","dictionarySha256":"ba5ef4beb76903396e0c575a032a2ff057c4dd0b96a7775ccc314eb2e6cec9f5","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"惛","strokes":11,"corpus":"MM","originalMediansSha256":"9a17a85e3161f21ded7dbe29fe38bc2b8501c37eec71ae8617768a8774865b6e","pathsSha256":"51a3dc510ad03a18477977b4bdc32f16c14933f06be3db444bc3b9191bd21786","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60DB.svg","dictionarySha256":"fd18a2d3d5b23075016f15211568893eedecb9206dbce6762be6fda742ac7e53","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
]
export const SPECIAL_BATCH13_DICTIONARY_REVIEW_SHA256 = 'f6cb4b9a46dfa5c8e1a23e9d09c6c9545c590eefb025f6752f7d8f3fa3b4b08e'
export const SPECIAL_BATCH13_DICTIONARY_DIRECTION_SHA256 = '95347dc215be684ed3c99ccb561ded6da8a28f64512df1fc2d3c282e95efdd0f'
const referencesByGlyph = new Map(SPECIAL_BATCH13_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch13DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch13DictionaryMetadata(ref: SpecialBatch13DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH13_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch13-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH13_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH13_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH13_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch13DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH13_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH13_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch13DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch13 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH13_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH13_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH13_DICTIONARY_REFERENCES.length) throw Error('Special batch13 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch13 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH13_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch13DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch13 dictionary entry mismatch')
    return { ...specialBatch13DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH13_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES = loadSpecialBatch13DictionaryBundle(reviewed)
