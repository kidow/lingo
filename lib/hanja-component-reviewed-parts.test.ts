import assert from 'node:assert/strict'
import test from 'node:test'
import { buildLibrary, compose, digest, type ApprovedDonor, type ReviewedParts } from '../scripts/hanja-component-synthesis.ts'

const paths = ['M0 0 L0 20', 'M0 0 L20 0 L20 20', 'M0 20 L20 20', 'M40 0 L40 80', 'M40 0 L80 0 L80 80', 'M40 80 L80 80']
const donor: ApprovedDonor = { glyph: '合', paths, sourceStrokeIndices: [2, 2, null, 4, 5, 6] }
const definitions = new Map([['合', '⿰口口'], ['吅', '⿰口口'], ['嵒', '⿱合合']])
const catalog = new Map([['合', { glyph: '合', strokes: 6, readingGrade: 'fixture' }]])
const parts: ReviewedParts = { version: 1, splitHash: 'a'.repeat(64), recipes: [{ id: 'synthetic-mouth-left', glyph: '口', position: 'left',
  donorGlyph: '合', donorPathsSha256: digest(paths), approvedPathIndices: [1, 2, 3],
  review: { status: 'reviewed-component-assignment', method: 'static-path-and-glyph-review', notes: 'Synthetic fixture only.', limitations: 'Not a real glyph approval.' } }] }
const options = (reviewedParts = parts) => ({ reviewedParts, layoutMode: 'position-profiles-v2' as const })

test('reviewed recipes retain final path order and repeated or null upstream provenance', () => {
  const library = buildLibrary([donor], definitions, catalog, [], options())
  const part = library.components.find(c => c.assignment === 'reviewed-component-assignment')!
  assert.deepEqual(part.paths, paths.slice(0, 3))
  assert.deepEqual(part.approvedPathIndices, [1, 2, 3])
  assert.deepEqual(part.upstreamIndices, [2, 2, null])
  assert.equal(part.assignmentReview?.reviewSha256, digest(parts.recipes[0].review))
  assert.equal(library.reviewedPartsSha256, digest(parts))
  assert.equal(library.version, 'component-pilot-v2')
})

test('a reviewed recipe never bypasses the held-out donor or contained-target exclusion', () => {
  const direct = buildLibrary([donor], definitions, catalog, ['合'], options())
  assert.equal(direct.components.length, 0)
  assert.equal(direct.skippedRecipes?.[0].reason, 'held-out-target')
  const contained = buildLibrary([donor], definitions, catalog, ['口'], options())
  assert.equal(contained.components.length, 0)
  assert.equal(contained.skippedRecipes?.[0].reason, 'contains-held-out-component')
})

test('reviewed recipes reject stale paths, duplicate IDs and invalid final path selections', () => {
  for (const indices of [[1, 1, 2], [3, 2, 1], [0, 1], [1, 7], [], [1, 2, 3, 4, 5, 6]]) {
    const invalid = structuredClone(parts); invalid.recipes[0].approvedPathIndices = indices
    assert.throws(() => buildLibrary([donor], definitions, catalog, [], options(invalid)), /Invalid reviewed component/)
  }
  const stale = structuredClone(parts); stale.recipes[0].donorPathsSha256 = 'b'.repeat(64)
  assert.throws(() => buildLibrary([donor], definitions, catalog, [], options(stale)), /Invalid reviewed component/)
  assert.throws(() => buildLibrary([donor], definitions, catalog, [], options({ ...parts, recipes: [...parts.recipes, ...parts.recipes] })), /Invalid reviewed component/)
})

test('v2 synthesis records profile provenance and remains unreviewed', () => {
  const library = buildLibrary([donor], definitions, catalog, [], options())
  const result = compose({ glyph: '吅', strokes: 6 }, definitions, library)
  assert.equal(result.status, 'candidate-unreviewed')
  assert.equal(result.provenance, 'component-derived-unreviewed')
  assert.ok(result.layoutProfiles?.[0].componentIds.length)
  assert.deepEqual(result.layoutProfiles?.[0].donorGlyphs, ['合'])
  assert.equal(result.placements[0].assignment, 'reviewed-component-assignment')
  const leftIds = result.layoutProfiles![0].componentIds.filter(id => library.components.find(c => c.id === id)?.position === 'left')
  assert.deepEqual(leftIds, library.components.filter(c => c.position === 'left' && c.assignment === 'reviewed-component-assignment').map(c => c.id))
})

test('a nested or enclosed part cannot masquerade as a direct root position profile', () => {
  for (const decomposition of ['⿸人口', '⿱人⿰口口']) {
    assert.throws(() => buildLibrary([donor], new Map([['合', decomposition]]), catalog, [], options()), /Invalid reviewed component/)
  }
  const knownChild = buildLibrary([donor], new Map([['合', '⿰口？']]), catalog, [], options())
  assert.equal(knownChild.components.filter(c => c.assignment === 'reviewed-component-assignment').length, 1)
  assert.equal(compose({ glyph: '合', strokes: 6 }, new Map([['合', '⿰口？']]), knownChild).status, 'abstained')
  const unknown = structuredClone(parts); unknown.recipes[0].glyph = '？'
  assert.throws(() => buildLibrary([donor], new Map([['合', '⿰？口']]), catalog, [], options(unknown)), /Invalid reviewed component/)
})
