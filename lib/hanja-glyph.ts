/** Stable public asset path; do not normalize compatibility forms into another glyph. */
export function hanjaGlyphHref(glyph: string): string {
  const codepoint = glyph.codePointAt(0)
  if (codepoint === undefined || [...glyph].length !== 1) throw new Error('Expected one Hanja glyph')
  return `/hanja/u${codepoint.toString(16)}.svg#glyph`
}
