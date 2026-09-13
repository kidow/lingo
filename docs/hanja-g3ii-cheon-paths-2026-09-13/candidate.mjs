import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'

export async function buildCandidate() {
  const original = JSON.parse(await readFile(new URL('originals.json', import.meta.url)))
  const recipe = JSON.parse(await readFile(new URL('recipe.json', import.meta.url)))
  const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
  assert.equal(hash(original.medians), '7bb671fbc49d1e2bdfecb5185443439e471c25cf7b3510d75f37f846f6ca9874')
  assert.equal(original.sourceSha256, 'a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee')
  assert.equal(original.medians.length, recipe.expectedOriginalStrokes)
  assert.deepEqual(recipe.split, {
    sourceStroke: 13, sharedPointIndex: 7, sharedPoint: [219, 330], resultStrokes: [13, 14], reason: recipe.split.reason,
  })
  const source = original.medians[12]
  assert.deepEqual(source[7], recipe.split.sharedPoint)
  const medians = structuredClone([...original.medians.slice(0, 12), source.slice(0, 8), source.slice(7), original.medians[13]])
  assert.equal(medians.length, recipe.expectedCandidateStrokes)
  assert.deepEqual([...medians[12], ...medians[13].slice(1)], source)
  const correction = recipe.pointCorrections[0]
  assert.equal(recipe.pointCorrections.length, 1)
  assert.deepEqual({ ...correction, reason: '' }, { stroke: 11, pointIndex: 11, original: [790, 263], corrected: [770, 263], reason: '' })
  assert.deepEqual(medians[10][11], correction.original)
  medians[10][11] = correction.corrected
  const paths = normalizeMedians(medians)
  return { glyph: '遷', strokes: 15, paths, pathsSha256: hash(paths), originalMediansSha256: original.originalMediansSha256, sourceStrokeIndices: recipe.sourceStrokeIndices, runtimeApproved: false }
}
