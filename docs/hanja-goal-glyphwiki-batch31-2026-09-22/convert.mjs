import assert from 'node:assert/strict'
import { expandKage } from '../hanja-goal-glyphwiki-batch26-2026-09-22/convert.mjs'

const point = p => p.map(v => Math.round(v * 1e6) / 1e6).join(' ')
const options = { allowReviewedCurves: true }
export function reviewedGroups(source, groups, order) {
  const raw = expandKage(source, options)
  assert.deepEqual(groups.flat().slice().sort((a,b) => a-b), raw.map((_,i) => i+1),
    'Every primitive must appear exactly once')
  assert.deepEqual(order.slice().sort((a,b) => a-b), groups.map((_,i) => i+1),
    'Every reviewed group must appear exactly once')
  const paths = groups.map(group => {
    assert(group.length === 1 || group.length === 2, 'Unsupported group length')
    const [a,b] = group.map(i => raw[i-1])
    const start = 'M ' + point(a.points[0])
    if (b) {
      assert.equal(group[1], group[0]+1, 'Corner primitives must be adjacent')
      assert(a.type === 1 && a.head === 0 && a.tail === 2
        && b.type === 2 && b.head === 22 && b.tail === 7, 'Unreviewed corner codes')
      assert.equal(a.source, b.source, 'Corner must be source-declared')
      assert.equal(b.sourceRow, a.sourceRow+1)
      assert.deepEqual(a.points[1], b.points[0], 'Corner endpoints must match exactly')
      assert(a.points[0][0] < a.points[1][0] && a.points[0][1] === a.points[1][1])
      assert(b.points[0][0] > b.points[1][0] && b.points[1][0] > b.points[2][0]
        && b.points[0][1] < b.points[1][1] && b.points[1][1] < b.points[2][1],
        'Only the reviewed down-left corner is supported')
      return start + ' L ' + point(a.points[1]) + ' Q ' + b.points.slice(1).map(point).join(' ')
    }
    assert(a.head !== 22 && !(a.type === 1 && a.tail === 2), 'Unpaired upper corner')
    assert(a.type === 1 || a.type === 2, 'Unreviewed primitive type')
    return start + (a.type === 1 ? ' L ' : ' Q ') + a.points.slice(1).map(point).join(' ')
  })
  return order.map(i => paths[i-1])
}
export function buildKwiPaths(source, recipe) {
  assert.equal(source.root, 'u8475-var-001')
  assert.equal(source.alternateRoot, 'u8475-var-003')
  for (const name of [source.root, source.alternateRoot]) {
    assert.equal(source.records[name].related, 'U+8475', 'Replacement must be the same whole glyph')
  }
  assert.deepEqual(recipe.groups, [[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14]])
  assert.deepEqual(recipe.sourceStrokeIndices, [1,2,4,3,5,9,6,8,7,13,10,11,12])
  assert.deepEqual(recipe.replacement, { stroke:13, root:'u8475-var-003', primitive:14 })
  const paths = reviewedGroups(source, recipe.groups, recipe.sourceStrokeIndices)
  const alternate = expandKage({ ...source, root:source.alternateRoot }, options)
  assert.equal(alternate.length, 14)
  const last = alternate[13]
  assert(last.type === 2 && last.head === 7 && last.tail === 0)
  assert.equal(last.source, 'u7678-var-001')
  assert.equal(last.sourceRow, 5)
  paths[12] = 'M ' + point(last.points[0]) + ' Q ' + last.points.slice(1).map(point).join(' ')
  return paths
}
