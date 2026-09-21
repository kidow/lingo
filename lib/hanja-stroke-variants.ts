import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-variants.json' with { type: 'json' }
import special2Reviewed from '../public/hanja-strokes/dictionary-reviewed-special2-variants.json' with { type: 'json' }
import special2DirectionReviewed from '../public/hanja-strokes/dictionary-reviewed-special2-direction-variants.json' with { type: 'json' }
import special2KanjiVGReviewed from '../public/hanja-strokes/dictionary-reviewed-special2-kanjivg-variants.json' with { type: 'json' }
import special2RabbitReviewed from '../public/hanja-strokes/dictionary-reviewed-special2-rabbit-variant.json' with { type: 'json' }
import { HANJA_DICTIONARY_VARIANT_KANJIVG_BATCH13_STROKES } from './hanja-stroke-dictionary-variant-kanjivg-batch13.ts'
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export type HanjaVariantStrokeData = HanjaDictionaryStrokeData & {
  variant: { catalogStrokes: number; playbackStrokes: number; form: string }
  candidateSha256?: string
}

type VariantPin = HanjaVariantStrokeData['variant'] & {
  glyph: string
  candidateSha256?: string
  pathsSha256?: string
}

/** Exact reviewed variants, not a general exemption from stroke-count validation. */
const allowed: readonly VariantPin[] = [
  { glyph: '飼', catalogStrokes: 14, playbackStrokes: 13, form: '飠' },
  { glyph: '祐', catalogStrokes: 10, playbackStrokes: 9, form: '礻' },
  { glyph: '禎', catalogStrokes: 14, playbackStrokes: 13, form: '礻' },
  {glyph: '夔',catalogStrokes: 20,playbackStrokes: 21,form: '사전',candidateSha256: '214259fcbf4cd6c7c3e50ad495e3dc5b1da964c9b5c4231abccc0b3dc1a27bf8',pathsSha256: '16b5aa1a9cdc859f45ccd32aa4ed260fb56e288f580a8b2fe03997506832eaf8'},
  {glyph: '犁',catalogStrokes: 12,playbackStrokes: 11,form: '사전',candidateSha256: '32baaee65f0b3731b4aaec97311d7677aeecd815ec3eae7ff8fd01397f0cecea',pathsSha256: '28daf4cfcc48db4544d1a4da4c6ef582cd59defc593b067544d244294a237d7b'},
  {glyph: '蓼',catalogStrokes: 15,playbackStrokes: 14,form: '사전',candidateSha256: '065b174bd40ee8c7d2bcdcc081fe6a3fc2c622cb4efba6a035ed82e8d6954cdc',pathsSha256: '9e374011cd9d966c9c0d567de23534bf693705e3b9f09cd9d0120516c034967a'},
  {glyph: '鵡',catalogStrokes: 18,playbackStrokes: 19,form: '사전',candidateSha256: '39f4cbe9dd103b6bd9e48d9f3fa729e7ef95c82bbe4854038e938416d9c31e49',pathsSha256: '0e4b5db03cc9da0ccc02bfa34ee87b48b5c4b95a09fbc7d419e73d5d9cd68cc0'},
  {glyph: '筬',catalogStrokes: 13,playbackStrokes: 12,form: '사전',candidateSha256: '015e712ee74b649df1eb7a4e3c63823bd7775df5b01cb8e5d6f82068a458868f',pathsSha256: '31bb20fbe5188829b17f84737942a626ede3cfd5a8d3b97b84b2985dd57f9b62'},
  {glyph: '亐',catalogStrokes: 4,playbackStrokes: 3,form: '사전',candidateSha256: '93bd14a737fd2cac8f20296b6b4ab71962cd53e96e3a19f2260065dcd070a3ef',pathsSha256: '72acbed9d66878f0d7f8623651f6f93b8e4740040cba8bee5b0ce3a3d1902a1b'},
  {glyph: '臾',catalogStrokes: 8,playbackStrokes: 9,form: '사전',candidateSha256: '572587e030e7de54abe5cfaf6320b115cc73d3340453a4b31257c4cd5a08a0a7',pathsSha256: '99365c59df6e8f750bfa81ab142f6b7e45dfa7b72c19fd8e79998e08a3e80135'},
  {glyph: '贇',catalogStrokes: 18,playbackStrokes: 19,form: '사전',candidateSha256: 'ed2a45a3d2c551729249da6520675ff04f8f94d66c5e8dd4fb6caae95b4b36b5',pathsSha256: '24bb828a3be8d70b09a2482ce996bbd6b8c93315870687d7969b6edc06e90c11'},
  {glyph: '卄',catalogStrokes: 4,playbackStrokes: 3,form: '사전',candidateSha256: 'f2121b66402cc117d02697be52aa0c3ac2afe04fdefcfb94dc3cae88d0b1ad09',pathsSha256: 'b0db42f4704b977c143b56b2181c53ecfa0d98e7090ca02b69e9a6cb18bcad6f'},
  {glyph: '渚',catalogStrokes: 12,playbackStrokes: 11,form: '사전',candidateSha256: 'd0f357be8b3588335ea7e71b234796aed06a49767bfa412f719a9f7e82bf8356',pathsSha256: 'e03e9c8d94cfa8c4e233ffe44d610063d7aae9fb0792606c101f400b5b99d69c'},
  {glyph: '猪',catalogStrokes: 12,playbackStrokes: 11,form: '사전',candidateSha256: 'f0aa8f912983ef37a6d490e04bf004fcdc8a35f566946a35bbf41eb423f7be89',pathsSha256: 'c2a35ab24237c2e4c34c0a791486e122e018b54da02e8a90bcd85e52e655353e'},
  {glyph: '簒',catalogStrokes: 16,playbackStrokes: 17,form: '사전',candidateSha256: 'ffba0fd734c5131432c343892d687e01a7e82db5dd27d79afe7ccaf8df4b5533',pathsSha256: 'a0a7c1d865ba94dbc887624876cb0031d9202f83bc4bb84b44a1358efb055c11'},
  {glyph: '砦',catalogStrokes: 10,playbackStrokes: 11,form: '사전',candidateSha256: '392f9d39017e1a0f7f6978301414686bf3e9e9424ce955fb35b372a7fb045f24',pathsSha256: 'e3833f05b1d171f5a39660cd8b7ed07b24421b3b9f572be5f0f14c8811494e6d'},
  {glyph: '穉',catalogStrokes: 16,playbackStrokes: 17,form: '사전',candidateSha256: 'da39d995cb8247e836e693da40ea7f47fa48f7d5a60714c105e690bbd57c1d7f',pathsSha256: '26da05d910b0c81fb8027b20fd3e49a2939d385e0d5e4c8942d50ec63f571834'},
  {glyph: '啣',catalogStrokes: 11,playbackStrokes: 12,form: '사전',candidateSha256: '53ce95465b3530f6edba020d8eb69eb3cd22d98bac1797cca8af6c2ff5041032',pathsSha256: 'edc52842b3355af723de7bd304d5bf34d6c18aac9301e41581cd59f8c4760495'},
  {"glyph":"嘯","catalogStrokes":15,"playbackStrokes":16,"form":"사전","candidateSha256":"12afa65eacb1c0b548dda7c116956d6b273f750a0fe5a4508e2debdceed37df5","pathsSha256":"6850fa4591a7bdcad84f5346506f4184e36173aba9dc8b0a60d4179d4a7a8a8b"},
  {"glyph":"瀟","catalogStrokes":19,"playbackStrokes":20,"form":"사전","candidateSha256":"914c7adda2170930d91efc4f461cf5fa394048fee8e13981c570008ead65b6fa","pathsSha256":"f183ed5f2f85174bc88a4d9791a4b4c0add3bc0c87c322d4806d391ef71f3cfc"},
  {"glyph":"嘴","catalogStrokes":15,"playbackStrokes":16,"form":"사전","candidateSha256":"1dfc68e93744366c805f6f6358ea60d391cb7596590d2113580b3d8dcf9c64eb","pathsSha256":"3dcaa20b63b36927335c3f3309acc82e3eeba35b90f4f4e0613ad06980e65b65"},
  {"glyph":"纛","catalogStrokes":25,"playbackStrokes":24,"form":"사전","candidateSha256":"113ce8e09d05322f67be27bd51021a73478fd2244e3bb7f8b7090a53d079270d","pathsSha256":"61f8ea7fad437453961cb54ced5be4c00d313fa33b3f6843143cb3fef8951517"},
  {"glyph":"蘿","catalogStrokes":23,"playbackStrokes":22,"form":"사전","candidateSha256":"ee34a091d47aaba84f3b468877aa2475937f749e3cc264a5a29053d5236cf8e4","pathsSha256":"3426df97d59773a79aabd369225c344f2b5c39f8ca8d0d1f0e7431f6270d2fe4"},
  {"glyph":"藺","catalogStrokes":20,"playbackStrokes":19,"form":"사전","candidateSha256":"10f5a706243b58bf9efb57bbfeb3585ac50d88d8e77ab3dcc3c74de551fbd6e6","pathsSha256":"ed87456b8aacf9fd548066ed509fa5137cbbeb668691f6facf335141b247c11a"},
  {glyph: '兎', catalogStrokes: 7, playbackStrokes: 8, form: '사전', candidateSha256: '0efa069090b693421b24f60f52cd8b261b068d7654dbb6131d6f7775c82638fb', pathsSha256: 'd0b2e473bd37ef062e13bb84f9cdd5b5093ca8f16762d9f8c8a74b54c6634a9a'},
  {"glyph":"禦","catalogStrokes":16,"playbackStrokes":17,"form":"사전","candidateSha256":"c038f1f6cdae5dcd4cd10b629c551bfa0c2ce6479e34b6eb13db0a789df9fbe5","pathsSha256":"daf398f1ee8dfb26136a57bd0f13e90a141a408659753be2bd4877303ab5e860"},
]

export const HANJA_VARIANT_STROKES: readonly HanjaVariantStrokeData[] = [...reviewed, ...special2Reviewed, ...special2DirectionReviewed, ...special2KanjiVGReviewed, ...special2RabbitReviewed, ...HANJA_DICTIONARY_VARIANT_KANJIVG_BATCH13_STROKES].map((entry, i) => {
  const pin = allowed[i]
  const candidateSha256 = 'candidateSha256' in entry ? entry.candidateSha256 : undefined
  if (!pin || entry.glyph !== pin.glyph || entry.variant.catalogStrokes !== pin.catalogStrokes
    || entry.variant.playbackStrokes !== pin.playbackStrokes || entry.variant.form !== pin.form
    || candidateSha256 !== pin.candidateSha256 || (pin.pathsSha256 && entry.pathsSha256 !== pin.pathsSha256)
    || entry.paths.length !== pin.playbackStrokes || entry.verificationSource !== 'ehanja-crosschecked') {
    throw new Error('Unreviewed Hanja playback variant')
  }
  return { ...entry, verificationSource: 'ehanja-crosschecked' }
})
if (HANJA_VARIANT_STROKES.length !== allowed.length) throw new Error('Missing Hanja playback variant')

const byGlyph = new Map(HANJA_VARIANT_STROKES.map(data => [data.glyph, data]))
export function hanjaPlaybackVariant(character: { glyph: string; strokes: number }) {
  const data = byGlyph.get(character.glyph)
  return data?.variant.catalogStrokes === character.strokes ? data : null
}
