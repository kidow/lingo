import test from 'node:test'
import assert from 'node:assert/strict'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch943.json' with {type:'json'}
import {loadGlyphWikiBatch943Strokes} from './hanja-stroke-dictionary-glyphwiki-batch943.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'

test('膵 uniquely registered at its catalog stroke count', () => {
  const entry = hanjaStrokeData({glyph:'膵',strokes:16})
  assert(entry)
  assert.deepEqual(entry, reviewed[0])
  assert.equal(HANJA_STROKES.filter(item => item.glyph === '膵').length, 1)
  for (const strokes of [15,17]) assert.equal(hanjaStrokeData({glyph:'膵',strokes}), null)
})

test('膵 exact selected whole preserves original sixteen pens', () => {
  const entry = loadGlyphWikiBatch943Strokes(reviewed)[0]
  assert.deepEqual(entry.sourceStrokeIndices, [1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17])
  assert.equal(entry.outlines!.length, 16)
  assert.equal(entry.outlines!.flat().length, 17)
  assert.equal(entry.outlines!.flat().flatMap(mask => mask.outline.match(/M[^Z]+Z/g) || []).length, 37)
  assert(reviewed[0].geometryLicense.revision.includes('exact whole u81b5-ue0103'))
  assert.equal(entry.sourceReference.dictionaryDirectionStrokes, '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16')
})

test('膵 altered mask, source and domestic review are rejected', () => {
  const mutations = [
    (entry:typeof reviewed[number]) => {entry.sourceStrokeIndices[0] = 999},
    (entry:typeof reviewed[number]) => {entry.outlines[0][0].weight += 1},
    (entry:typeof reviewed[number]) => {entry.geometryLicense.revision = 'unselected base whole'},
    (entry:typeof reviewed[number]) => {entry.sourceReference.directionReviewSha256 = '0'.repeat(64)},
  ]
  for (const mutate of mutations) {
    const copy = structuredClone(reviewed)
    mutate(copy[0])
    assert.throws(() => loadGlyphWikiBatch943Strokes(copy), /reviewed data mismatch/)
  }
})
