import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-variants.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export type HanjaVariantStrokeData = HanjaDictionaryStrokeData & {
  variant: { catalogStrokes: number; playbackStrokes: number; form: string }
}

/** Exact reviewed variants, not a general exemption from stroke-count validation. */
const allowed = [
  { glyph: '飼', catalogStrokes: 14, playbackStrokes: 13, form: '飠' },
  { glyph: '祐', catalogStrokes: 10, playbackStrokes: 9, form: '礻' },
  { glyph: '禎', catalogStrokes: 14, playbackStrokes: 13, form: '礻' },
] as const

export const HANJA_VARIANT_STROKES: readonly HanjaVariantStrokeData[] = reviewed.map((entry, i) => {
  const pin = allowed[i]
  if (!pin || entry.glyph !== pin.glyph || entry.variant.catalogStrokes !== pin.catalogStrokes
    || entry.variant.playbackStrokes !== pin.playbackStrokes || entry.variant.form !== pin.form
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
