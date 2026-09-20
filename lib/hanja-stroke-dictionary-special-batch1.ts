/** Fifty special grade forms (batch 1) individually reviewed: eleven reordered and five locally corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-batch1.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_BATCH1_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Special grade batch 1: 50 characters individually checked, 50 approved and 0 held; 15 corrected forms rechecked. Not exam-body certification."
} as const
export const SPECIAL_BATCH1_DICTIONARY_GEOMETRY = {
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
export type SpecialBatch1DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH1_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const SPECIAL_BATCH1_DICTIONARY_REFERENCES: readonly SpecialBatch1DictionaryReference[] = [
  {"glyph":"斝","strokes":12,"corpus":"Hans","originalMediansSha256":"7d4a253c74d09d3e641049a9eec7482b6e0506467f0c32c9b45f23d02ad72135","pathsSha256":"01b62937cbaed791f6e84ae610e8cf7af4dd06e6954e3ebb3ecc1883f3c19430","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/659D.svg","dictionarySha256":"dac87466a10feeb6964ea6ad82938395211ad93a4e7a0121671b1cab41d411de","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"哿","strokes":10,"corpus":"MM","originalMediansSha256":"cdccf6062eab3b34546504784cac17ca69b437be9d078aed0b01b1d56c0d8c70","pathsSha256":"6ccf38cb1426f64d64c408be3e644b37447049bb082f12fcc3ce7217eb5e425c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5400/54FF.svg","dictionarySha256":"792add0f600d5beba45f2985618ad457337f2a747751f3a37a4ca16c8650cf2a","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"珈","strokes":9,"corpus":"MM","originalMediansSha256":"22ab18fdab63ecea99afb32042af8f7b1d082484b01fa26b0ae8a98e4a5cb522","pathsSha256":"219589fd04b12523c298efde9af71b8241bfd8550f168775f7e930c63b376f59","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/73C8.svg","dictionarySha256":"67ee7a6161f37386b0b65c98f26a0057d54a48beab543d81e35053be68244424","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"桷","strokes":11,"corpus":"Ja","originalMediansSha256":"8abd9c23da9144f4cc834531bc06c049a6938485ccf54757b525bcf977cabf37","pathsSha256":"6b7df403e5d668ca4f3117a8775ea509ab7ab49067ec386fb58ac082e8844adb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/6877.svg","dictionarySha256":"5ded659857def279d8287c1a7d5c3e29327c015408851b2654c8e2118acce9c7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,10,9,11]},
  {"glyph":"卻","strokes":9,"corpus":"Ja","originalMediansSha256":"b5f9745ead0613ebb301f21bc7eab951a71372fd0adbf6c2699563780da5eece","pathsSha256":"9ba1a0a501a95a75e04c19ddd5351d12d8e8aa1e9dfecf93ecf4760072a0a5b5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5300/537B.svg","dictionarySha256":"21abf245365d231b6be6e7be79c2ee99bce7b8d856141e9663ad5866aed5df46","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"蕑","strokes":16,"corpus":"MM","originalMediansSha256":"85bcf1263e497746c685649594b4ea02cbfd88c974960de79e16b7bcc48c9196","pathsSha256":"2567db13b362b2d11338946717ef5d0396bbed9f60825923ed097458c1cdaac7","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/8551.svg","dictionarySha256":"90bf6cee593cb174201e88bfc40ba0519022a7c85132981c7318254c59560413","sourceStrokeIndices":[2,1,4,3,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"玕","strokes":7,"corpus":"Hans","originalMediansSha256":"9f400e170a74d6c5f397771f75b722b6fead0899c298f8675b08f3d4f9ccc61e","pathsSha256":"7ef95807bfa70ee6646ac4ff60138da4bb974dd55da1d2cd9e975ab08b3abb93","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/7395.svg","dictionarySha256":"cc475e2256c9cc6d29f67afaa2c37be0402e1a296001c679857123a3ff94269f","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"榦","strokes":14,"corpus":"Hant","originalMediansSha256":"a4e33284bdc7b3ee337dcf20dd9b13ea4d13d47f4f5defce818bd7fc165a1fec","pathsSha256":"412862fbd339fb5b6990a7f6e7c09fe642f5e34a079660e2549131f51bffa2af","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/69A6.svg","dictionarySha256":"c43f9c5d80929ec361c5e14580573f3fde5f1a78d648bdf964e79d531ce9867f","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"秸","strokes":11,"corpus":"MM","originalMediansSha256":"07d406ac4f78b4e8f9a480fc9ed1485611eac17a04973d7e6727d9e2c76ead86","pathsSha256":"215b853e73112ee2bda72d55960ac27f0b829b8868cd22cb94e8df008c6f70ce","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/79F8.svg","dictionarySha256":"b60c0e0383002223dd8e7ab436f99a4e1355e4cf6642b38a81630d955839040e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11]},
  {"glyph":"欿","strokes":12,"corpus":"MM","originalMediansSha256":"d9429787162d3051cfd5834368aaed14447c403570d43fb5302de600039c6d26","pathsSha256":"4c2212b4507287211461722ca633b33e75f02617a4d0c449ef20670dd02686b2","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B3F.svg","dictionarySha256":"b29c654ce953d8d5b7fced47cf5cedae8bd24d0718bbb7a05102681f347367e7","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"减","strokes":11,"corpus":"MM","originalMediansSha256":"b7ec72ecce8187f0182fba5f4f604c11bc572f029eaedd8e9517eb796186a0cf","pathsSha256":"b136808317062848d3f0ffb39ccacb3150c8dc0bf5b320bd41298af8bbbb4c53","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/51CF.svg","dictionarySha256":"332efaf33591c92d51a4d90d7f0397af31d95afa8381141e7705511555de7914","sourceStrokeIndices":[1,2,4,3,5,6,7,8,9,10,11]},
  {"glyph":"酣","strokes":12,"corpus":"Ja","originalMediansSha256":"7677eaa89d66dc6e0f76b7dd4002d04578ef339ac3e4672ea1f6625424e39c4e","pathsSha256":"6840eb5390e5a3af9ecb068e26a5dad2836e24786903e6a0d81446141bc1ac27","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/9163.svg","dictionarySha256":"7b6898fb2b029331345646e4c182d1fcc52a8ff424ca7dc563bcf5756fb9e607","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"歛","strokes":17,"corpus":"Ja","originalMediansSha256":"454453e1d1435488d139921d71f9ebf43af198900be841cca9d13cbbc32a38e3","pathsSha256":"14e432b0a5b06bb43d2b60a96828a74ac7ca7e3f1f724c6d700100e1f4b4ae04","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B5B.svg","dictionarySha256":"9728e6dd9be34c414329b3e8f11fc9645932bbfe02e54317264ba4ac5622452d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"橿","strokes":17,"corpus":"Ja","originalMediansSha256":"9e73c6442186a76d857b6ae43556aaf3598295c119bd83db9c0eda84b75d4e42","pathsSha256":"52bbab9fa494cee996e7c6def340eab85d9bfea9f5280cd9f8cecbd169c2a21d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6A00/6A7F.svg","dictionarySha256":"1f8fc11a2e3b76730e380ff7a4745c2af62ef8b47740f2994ccab5f0c9c1f53d","sourceStrokeIndices":[1,2,3,4,5,6,7,9,8,10,11,12,13,15,14,16,17]},
  {"glyph":"杠","strokes":7,"corpus":"Ja","originalMediansSha256":"c9ce1f0eb119e06d36e9c0cfb77d794316aef9eefc13a5a20efac57db6bfecb9","pathsSha256":"89dbae696340ef9c44bee091afdd80845b8ac463e42badd3993d4b81da787e7c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/6760.svg","dictionarySha256":"b08bb9125f136bd63a66cd625f29b323c6bb264e49dce741b2f0301f17b0b588","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"湝","strokes":12,"corpus":"Hans","originalMediansSha256":"e1a6e6f0f843bc43a9e09e410f37cb49a3fb94fa5f32c0581f95bab3f71fcc44","pathsSha256":"c04bb0a9cb2bf9952a8913134a6adc5937d02f154b8e225f344c0a06c3a96574","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6E00/6E5D.svg","dictionarySha256":"ea39b6f9208c5b003886a21d341d56decb967dc3d39f84d143db9a2c23bc3a36","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"喈","strokes":12,"corpus":"MM","originalMediansSha256":"c3cca49fd27d0c834892a5ca6a3f31e0c60c8c32b3dcc930766f9ccba59ded40","pathsSha256":"3fa0f9a37d959bdc23c2410119406fdea75e1908bd4febd5e91d3ba7dca1958e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/5588.svg","dictionarySha256":"daa4cd310adacba3b8e92707a8f2e61b59a87b01d41b4e81150ef328d5dc2563","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"玠","strokes":8,"corpus":"Hans","originalMediansSha256":"58762ef7a06f4a2dd2c5d68e71582b05fa2b1f2f4cabd5f3033151aab0d6d5d6","pathsSha256":"a5e40e4004f7a6ddce4b744a13d7a5e7184ad448f7fb37babe245c962e3868a3","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/73A0.svg","dictionarySha256":"afa971450787efd5d0e3e85ef06b1fe90f911a25252c9ebee4eba5daa837599e","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"筥","strokes":13,"corpus":"Ja","originalMediansSha256":"21102ef46022442cc8f2c0ffb717b845bd57a882192aaac4e0ec2e825a36c945","pathsSha256":"a4be7fb8d8450958e87d69188b4743f03c12bc73b65973f459ec96ca763f7f5f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B65.svg","dictionarySha256":"1610d462ccebcd2f2fbff5aeb9ddf9a3a592761c4461e9332c88ea33d52b399c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"琚","strokes":12,"corpus":"MM","originalMediansSha256":"44d36688d76ee90ddb68147de2fdc95adad86e2478afafc5008073e3e0f680be","pathsSha256":"730d7762818c61242ed39b4327f5dc845ca69f76a0017695d6723da5192b9df1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/741A.svg","dictionarySha256":"529872c690c7a12e184240ac9620b8fdef7a1fbd3e3863f2014c31da5aa74133","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"秬","strokes":10,"corpus":"Ja","originalMediansSha256":"e6a3a8d875a33b8240db58dea38a32cce35318a90e97b81eea1ad28f92a49b19","pathsSha256":"4e0ddeb0f44558fc4f718a7300f9ed4d3425e27dd0e2ddd40b54e31ec7864c5b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/79EC.svg","dictionarySha256":"4c13af39238f4fe26888c07ca58c6da29fe87ae35f203b7e5d61cf458f9f5d64","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10]},
  {"glyph":"袪","strokes":10,"corpus":"Hans","originalMediansSha256":"04dd9ff100edc18ffd6a4ead27fba7e14421d9c17246ae23e77d8cdc74463000","pathsSha256":"0f44ce81e2ee12b222c8442e24d8f8d8395a4418ffe6ac0d482f718f65a637be","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/88AA.svg","dictionarySha256":"a36662168fa55adda7690595abefc5692d19b75de09adf60c6f9174f690d8dd9","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"椐","strokes":12,"corpus":"MM","originalMediansSha256":"329b8524d737eaadd2717a0ccfdf4a97e07a349b22e0976d83f4b71e6afdd17e","pathsSha256":"b780d9ee915cb84d3865dbe794adeed62852c2d7502d2a86009adbabf652f3ab","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/6910.svg","dictionarySha256":"35a2bdbc7b69d03ecc78c4f1b5532419802118bc04a2d9cb9991fb6a3ef3b2f2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"褰","strokes":16,"corpus":"MM","originalMediansSha256":"e044fdfd1db12f531286fa7be218efc847713fadb1e2e8a3f1d30206d77400b8","pathsSha256":"48137c2e609bcc21fbfa402ab871f88e9ac292e6309a0810eb531532a80b1fee","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/8930.svg","dictionarySha256":"f98277a608e0a9f1def251e0e0b01da0fca2e1457b6efe077f549170114c48e2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
  {"glyph":"繳","strokes":19,"corpus":"MM","originalMediansSha256":"4601f52fd0f3de1e15f1ce74d0989f2299a059e334ab1058d9dedeff9ee825c1","pathsSha256":"b5aca3352e614c3ae5864df097c28d84a4faec1aef0b6828f8f5696ec9e3d74f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E73.svg","dictionarySha256":"7ce4ec7dfe4fd385e3847c90152a9d307f2e43101a08f8a1bf42dd5eb1ca399b","sourceStrokeIndices":[1,2,3,5,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"岍","strokes":7,"corpus":"MM","originalMediansSha256":"63c6f076b7394a3c674515295319f87eeaa27af483537ef15086c5c178b0bdf5","pathsSha256":"18316f0bb36875b873cf744f625b70aeeac3d16764d275df674456195b487c9f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5C00/5C8D.svg","dictionarySha256":"f295e4e5b9a427ae223168482a844ade2cd720d57162ec2b50711eff71f5d345","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"蠲","strokes":23,"corpus":"MM","originalMediansSha256":"708e16c4e86f0b43a2b26c05f8f77c310598926081f06913f4b1c9ad4c6d99fa","pathsSha256":"fa5679efe9e78887d1355d78d1814ce64cfc83044345c5cffa689200f063d765","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/8832.svg","dictionarySha256":"3d58da40c156740a01e5734635a2849f3c5909d14423359aa3ee1c54e5b148c0","sourceStrokeIndices":[null,null,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},
  {"glyph":"畎","strokes":9,"corpus":"MM","originalMediansSha256":"93729c29bf23a20462b29489a2458e59e546ad530b2e228498c39c8899cb7432","pathsSha256":"de51eb7c8eb4f444246a4f247678f1957b09c5a569bdafd35d49a7a2e62e0e87","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/754E.svg","dictionarySha256":"a853880b1f3ef25530161ddbce3dad50f60e345977b0c3dd250188104f7e0430","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"狷","strokes":10,"corpus":"Ja","originalMediansSha256":"ac4bfbef892cb94dfffcc3c4362c71f650a313fa8e877033ab90667e087b1a5b","pathsSha256":"9d3c845793c1f897414c481f60d5437d85549c9e0455566ff494ef816a9e5434","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/72F7.svg","dictionarySha256":"2c6377d22d8b610d6585304eac0cc3a57cea6bf11c38682df75f001b0071718b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"歉","strokes":14,"corpus":"Ja","originalMediansSha256":"0d6d12e42d4791f8cf5c5572aa3b11ee3dc970a2b9da5ee1cd3763c564952a73","pathsSha256":"f18d83e8d27abea817e407d66109173b8cead4a439fdf913e46d8891cb7209c5","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B49.svg","dictionarySha256":"d347de7fb9c9cc3fbd5a9237db0105f793c9d79ad185dc00e4324820dcfdfd16","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"罄","strokes":17,"corpus":"MM","originalMediansSha256":"70ccdcab7df721be9b5375021d580e97b037497a100712fd94b4e7c192dab6c2","pathsSha256":"939306ffe5d672bd293f00dfdc92736cc60276a23f4fde26abb177d1fb1cef07","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F44.svg","dictionarySha256":"df016b32684fb69c9185585835e26c30ecae5a12d3ea0524950faf59d210bd7e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
  {"glyph":"睘","strokes":13,"corpus":"Ja","originalMediansSha256":"710ba916f9ec80964ebec82a3047d843bb8d74ed5fa48c2f8c0daa062fa220d7","pathsSha256":"76b405543eccb98096fd04bd0511f0fed78e0fd56ef6aa6cd8b40cebe389ce15","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/7758.svg","dictionarySha256":"8c11a7376aa0ce23001a8a4f6a438a641e27b1baafeccf029f5aa9a9ad67be4d","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"鶊","strokes":19,"corpus":"MM","originalMediansSha256":"d8247a653b5760bd6d48b0fd40217106d1c37b83cd14c57128adba5276d82a02","pathsSha256":"1e5c45eec9370156947451ff3b31c5d61d024a4934b7cea00df032c7945703be","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9D8A.svg","dictionarySha256":"b193a72ec837b4c75c655b2a9c1dded3d0c326092596eb7d1ab8137b7336cf1b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},
  {"glyph":"冂","strokes":2,"corpus":"Ko","originalMediansSha256":"6f5fbfd591523690727ec19f76168b4ad0ec12960524d23d53ab7607c70a2e30","pathsSha256":"9639c00993d8c415f4e1f8e615a4e566eef8e9a384d5ea0c8c39ee713f2f3d3a","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/5182.svg","dictionarySha256":"fa7a2a057f285a48c8b06945f928d442fd3185536b55d1e4ff9599f3520aeaa9","sourceStrokeIndices":[1,2]},
  {"glyph":"黥","strokes":20,"corpus":"Ja","originalMediansSha256":"05aac14118a66b83e7db299b6a50f45ca2dfd96e2f73122fff4048550ae49f95","pathsSha256":"fda2d1ba421a0c20b35190d86ba1dcbb8808ef9d570b771f6e415864e97eff15","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9EE5.svg","dictionarySha256":"42e10921b72a7ca4fa9501cbf84d622b6a4f544445e3d18e3377f1a0a95594b6","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"煢","strokes":13,"corpus":"Ja","originalMediansSha256":"9e4c8e915f79aaae6b429a177db818983d995253aa05168fade036a7e7f6d2a1","pathsSha256":"110a808eb6c59d3c1d91761a5dac6e62aa0e9ebcb15c6056c10b90a92a5d8ad1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/7162.svg","dictionarySha256":"00dbf107c0fc2e47e7facb0b65726c84f7c9fe1c8eb2003cdf4f83403ee21033","sourceStrokeIndices":[null,2,3,4,null,6,7,8,9,10,11,12,13]},
  {"glyph":"冏","strokes":7,"corpus":"Ja","originalMediansSha256":"95b61ac51d463df5883ff7dca0d2c4328bdb6f9b0f86fcf540658d3d1eda1efe","pathsSha256":"f2214ca8cc6143497c2d5fc50a3f502dbf53e986edd808c24ae1eed72193df12","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/518F.svg","dictionarySha256":"1367ca4db1ecdd6631282bc5ddd75c54a35c14c84341337379e219b7bd4ce2b9","sourceStrokeIndices":[1,2,3,4,5,6,7]},
  {"glyph":"笄","strokes":10,"corpus":"Ja","originalMediansSha256":"58da442ac2c6d3d8aa8082abd021c31b1e81ade2525fd0e191e8c7fcf14f615a","pathsSha256":"caafa89daca84b6ce067f6b560197d334d5d63365745f7639123813d7a4f4d63","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7B04.svg","dictionarySha256":"a917aa612ff3a8d18c166c6e2207735cd690629bcdce93dafa15c612472cff7c","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"雞","strokes":18,"corpus":"Ja","originalMediansSha256":"c5fe635e10bf3bb22a4c5a40dd19bca14984bf38b22d0947c7cb05891d82c0eb","pathsSha256":"805bf5347573ca638a581035320010c067a1d01a0bf899cd1f0b6ef96d9ca1b9","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96DE.svg","dictionarySha256":"b1f494ec94d730407bde7af303330888e0505462870e1da44f940cfabe000b52","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,null,14,16,17,15,18]},
  {"glyph":"楛","strokes":13,"corpus":"MM","originalMediansSha256":"910973739ebcc8db93b1b6c20121f22a390b1cc21fd0ad87d271b5857e868569","pathsSha256":"3a544fa3ad1c3725f03d804e7e41413a1395c75111dfcc5fea8c052b2a6a0550","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/695B.svg","dictionarySha256":"c02280321afd29328f8d6662bc4017998673f592d6442d023e7b1e7f88359628","sourceStrokeIndices":[1,2,3,4,6,5,8,7,9,10,11,12,13]},
  {"glyph":"槀","strokes":14,"corpus":"MM","originalMediansSha256":"9291ccf97f10e47a4007fc166ba37fbd8b9bf64a3bae9f31b1aba4c5f9c3b1f8","pathsSha256":"43d14068f608858992a7a7a51ced751024b74aaff42a88f2d32f9c503e527a3d","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/69C0.svg","dictionarySha256":"8a228a055f7d26f543f42064224a35b96e0111573684215f39b524282d62426a","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14]},
  {"glyph":"瞽","strokes":18,"corpus":"Ja","originalMediansSha256":"f45dc8f26f297ac9b66c790fcd40fc892c91e1aa75cfbfef2aa0a68893f4a69a","pathsSha256":"2dee99d6cb3e028651901c15b9f8952bf681b07d34faca543f821b5836660fcd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/77BD.svg","dictionarySha256":"2df1c57c79850f5aad8e9b4513acd98c4a8ef83d75f9d3c0cc6f4359e1c7c762","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"罟","strokes":10,"corpus":"Ja","originalMediansSha256":"85e79229fa3c9cc80bfb9114f9d4b69cfaec999c6e3ae4501b5184af1104dcc4","pathsSha256":"ec1a111fe1af35afb41bcebec7644df5671802aa786e437ff38d12afa7587c71","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7F5F.svg","dictionarySha256":"55d14526be2fc4d1a4fb013bc5091bcbe1975fa543551e97d795c1f8710040d6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"栲","strokes":10,"corpus":"Ja","originalMediansSha256":"3e27f28e7de48cb4be1ad769157ad94177cf62e212cee4bb750f41a10db85930","pathsSha256":"8ad6a5bd3cd95270b87f4d0a6f246ae60f943eb08911e17e088f36139ce17700","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/6832.svg","dictionarySha256":"4c7baee59abbb3731b8cbd19d390de045dd60f8ec7c85a8b7de34fce0266452b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"杲","strokes":8,"corpus":"Ja","originalMediansSha256":"747847a1d1f2830022da27698ad916fb1ff403fbe3cd863c8db66118d3482ca6","pathsSha256":"2f30423e56a4e4e9bce912b017e8efe4646e04559ead7ba7a1306a5ce2bc2815","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/6772.svg","dictionarySha256":"da3a907b91c9f0c8865f2467c7352cd787266c8a169b383288d1438ae0b35cf3","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"刳","strokes":8,"corpus":"Ja","originalMediansSha256":"5e4dc4eebd37aa2b6b4af738fd235714972050673eeb8c0c40f88a9dfbd0a32e","pathsSha256":"b5bee716acea93e376a8a144339e68376011e21a383ebe47471357a979b8ea4c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/5233.svg","dictionarySha256":"33597d4fda50546edd330d3fc2806140ce285242434dace0f97b3795b97c70b9","sourceStrokeIndices":[1,2,3,4,5,6,7,8]},
  {"glyph":"稾","strokes":15,"corpus":"Ja","originalMediansSha256":"a8d33be267ce58239b0481c5abe358ac884357c9ac3bd35b692b1a86a2b0c490","pathsSha256":"82600dcd40218403ef5ea3271ac7f957e413ea3548d3a433b8130561c703a5f1","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A3E.svg","dictionarySha256":"0c1f110169c5dcc2b441d7efe767174758d75587e6ec9b30fc29941e7067f3a6","sourceStrokeIndices":[null,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"觚","strokes":12,"corpus":"MM","originalMediansSha256":"7fe5952d6d11e721e017a3382bc52a42898afc8645e43ab9c31f4bfedd3fd968","pathsSha256":"51b3798e23474678c73b330db9bc19e637de8a3c5c8305c7edbdfe0ee52d3e60","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/89DA.svg","dictionarySha256":"a7dc09a736ea6dec20eb996eb06f8a247814eed46d5c10bd4f115b4c15421985","sourceStrokeIndices":[1,2,3,4,5,7,6,8,9,10,11,12]},
  {"glyph":"酤","strokes":12,"corpus":"MM","originalMediansSha256":"746f576909192d7182d23af9ec2956bfdea7499558719f46b40d90bbf477924c","pathsSha256":"8138162956bb8585c4fdb09c349d377c0bd4135d646d252b9dd558f7c1a29378","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/9164.svg","dictionarySha256":"f32c6e4ed813de812c30823473ec496ce3351ffa9d9d13053cbe507e1c4c4422","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"觳","strokes":17,"corpus":"MM","originalMediansSha256":"26df2e4688cf48e8fc4d32966a998dc799edb3f73c5dea4fa74f80c09e489bd0","pathsSha256":"2359db7102abd298a7e02f87e725c3c5d3ff15169cc4488712c5840f3a83f528","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8900/89F3.svg","dictionarySha256":"28ef9d4228f65a58673640fe6ba5c85c011976f3d8556ece192df9c13b27f067","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,13,12,14,15,16,17]},
]
export const SPECIAL_BATCH1_DICTIONARY_REVIEW_SHA256 = '11fd7f32a2e14a355064a863156d9fd33df4ad88b829b8e4a5bbb6033adea1a8'
export const SPECIAL_BATCH1_DICTIONARY_DIRECTION_SHA256 = '637a73e94f8cac7c8d7c89e227c7cbf10ee129b6dc96206e4af0fc1a020db5ec'
const referencesByGlyph = new Map(SPECIAL_BATCH1_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const specialBatch1DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function specialBatch1DictionaryMetadata(ref: SpecialBatch1DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: SPECIAL_BATCH1_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-special-batch1-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: SPECIAL_BATCH1_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: SPECIAL_BATCH1_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: SPECIAL_BATCH1_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type SpecialBatch1DictionaryBundle = {
  verificationSource: typeof SPECIAL_BATCH1_DICTIONARY_VERIFICATION
  geometrySources: typeof SPECIAL_BATCH1_DICTIONARY_GEOMETRY
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
export function loadSpecialBatch1DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Special batch1 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, SPECIAL_BATCH1_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, SPECIAL_BATCH1_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== SPECIAL_BATCH1_DICTIONARY_REFERENCES.length) throw Error('Special batch1 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('Special batch1 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = SPECIAL_BATCH1_DICTIONARY_REFERENCES[i]
    if (!same(metadata, specialBatch1DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('Special batch1 dictionary entry mismatch')
    return { ...specialBatch1DictionaryMetadata(reference), paths: paths as string[], verificationSource: SPECIAL_BATCH1_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES = loadSpecialBatch1DictionaryBundle(reviewed)
