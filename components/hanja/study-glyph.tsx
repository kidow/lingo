import { hanjaPlaybackVariant } from '@/lib/hanja-stroke-variants'
import type { HanjaCharacter } from '@/lib/hanja'
import { HanjaGlyph } from './glyph'

/** The reference and animation use the same reviewed form and coordinates. */
export function HanjaStudyGlyph({ character, className = '', decorative = false }: {
  character: HanjaCharacter
  className?: string
  decorative?: boolean
}) {
  const data = hanjaPlaybackVariant(character)
  if (!data) return <HanjaGlyph glyph={character.glyph} className={className} decorative={decorative} />
  return <svg viewBox="0 0 100 100" className={className} role={decorative ? undefined : 'img'}
    aria-label={decorative ? undefined : `${character.glyph} ${data.variant.form} 자형`}
    aria-hidden={decorative || undefined} focusable="false" fill="none" stroke="currentColor"
    strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    {data.paths.map((d, i) => <path key={i} d={d} />)}
  </svg>
}

export function HanjaStudyStrokeCount({ character, variantOnly = false }: { character: HanjaCharacter; variantOnly?: boolean }) {
  const data = hanjaPlaybackVariant(character)
  if (!data) return variantOnly ? null : <span>{character.strokes}획</span>
  return <span>{data.variant.form} 자형 · 재생 {data.variant.playbackStrokes}획 <span className="text-sub">(배정 {character.strokes}획)</span></span>
}
