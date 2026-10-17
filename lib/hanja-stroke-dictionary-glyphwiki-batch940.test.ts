import test from 'node:test'
import assert from 'node:assert/strict'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch940.json' with {type:'json'}
import {loadGlyphWikiBatch940Strokes} from './hanja-stroke-dictionary-glyphwiki-batch940.ts'
import {HANJA_STROKES, hanjaStrokeData} from './hanja-strokes.ts'

test('踧 uniquely registered at its catalog stroke count', () => {
  const entry = hanjaStrokeData({glyph:'踧', strokes:15})
  assert(entry)
  assert.deepEqual(entry, reviewed[0])
  assert.equal(HANJA_STROKES.filter(item => item.glyph === '踧').length, 1)
  for (const strokes of [14,16]) assert.equal(hanjaStrokeData({glyph:'踧', strokes}), null)
})

test('踧 complete original masks follow reviewed domestic order', () => {
  const entry = loadGlyphWikiBatch940Strokes(reviewed)[0]
  assert.deepEqual(entry.sourceStrokeIndices, [1,2,4,5,6,7,8,9,10,11,12,14,13,15,17])
  assert.equal(entry.outlines!.length, 15)
  assert.equal(entry.outlines!.flat().length, 16)
  assert.equal(entry.outlines!.flat().flatMap(mask => mask.outline.match(/M[^Z]+Z/g) || []).length, 34)
  assert.equal(entry.sourceReference.dictionaryDirectionStrokes, '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15')
  assert(entry.geometryLicense.revision.includes('exact whole u8e27'))
})

test('踧 altered order, geometry and source proof are rejected', () => {
  const mutations = [
    (entry:typeof reviewed[number]) => { entry.sourceStrokeIndices[11] = 13 },
    (entry:typeof reviewed[number]) => { entry.outlines[0][0].weight += 1 },
    (entry:typeof reviewed[number]) => { entry.geometrySource = '0'.repeat(64) },
    (entry:typeof reviewed[number]) => { entry.sourceReference.directionReviewSha256 = '0'.repeat(64) },
  ]
  for (const mutate of mutations) {
    const copy = structuredClone(reviewed)
    mutate(copy[0])
    assert.throws(() => loadGlyphWikiBatch940Strokes(copy), /reviewed data mismatch/)
  }
})
