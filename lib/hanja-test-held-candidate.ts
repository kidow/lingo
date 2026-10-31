import assert from 'node:assert/strict'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_VARIANT_STROKES } from './hanja-stroke-variants.ts'

/** A rejected batch remains rejected even after a separate source is reviewed. */
export function assertIndependentlyReviewedReplacement(
  character: { glyph: string; strokes: number },
  rejectedBatch: readonly { glyph: string }[],
) {
  assert(!rejectedBatch.some(entry => entry.glyph === character.glyph), character.glyph)
  const current = hanjaStrokeData(character)
  assert(current, character.glyph + ': later source must have its own reviewed registration')
  assert([...HANJA_STROKES, ...HANJA_VARIANT_STROKES].includes(current))
  assert.equal(current.verificationSource, 'ehanja-crosschecked')
  assert('geometrySource' in current && typeof current.geometrySource === 'string')
  assert.match(current.geometrySource, /^[a-f0-9]{64}$/)
  assert('sourceReference' in current && current.sourceReference && typeof current.sourceReference === 'object')
  for (const key of ['orderReviewSha256', 'geometryReviewSha256', 'directionReviewSha256'] as const) {
    assert(key in current.sourceReference)
    const hash: unknown = Reflect.get(current.sourceReference, key)
    assert(typeof hash === 'string')
    assert.match(hash, /^[a-f0-9]{64}$/)
  }
  return current
}
