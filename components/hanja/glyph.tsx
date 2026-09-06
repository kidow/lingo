import { hanjaGlyphHref } from '@/lib/hanja-glyph'

/** External SVG outlines inherit text color without shipping the corpus in JavaScript. */
export function HanjaGlyph({ glyph, className = '', decorative = false }: {
  glyph: string
  className?: string
  decorative?: boolean
}) {
  return <svg viewBox="0 0 1000 1000" width="1em" height="1em" className={`inline-block shrink-0 align-[-0.125em] ${className}`}
    role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : glyph} aria-hidden={decorative || undefined} focusable="false">
    <use href={hanjaGlyphHref(glyph)} />
  </svg>
}

export function HanjaGlyphs({ text, className = '' }: { text: string; className?: string }) {
  return <span role="img" aria-label={text} className={`inline-flex items-center ${className}`}>
    {[...text].map((glyph, index) => <HanjaGlyph key={`${glyph}-${index}`} glyph={glyph} decorative />)}
  </span>
}
