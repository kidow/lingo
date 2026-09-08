import assert from 'node:assert/strict'
import test from 'node:test'
import { bounds, comparePaths, fitPaths, samplePath } from '../scripts/hanja-component-geometry.ts'

function near(actual: number, expected: number, tolerance = 1e-6): void {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`)
}

test('equal-arclength samples include endpoints and cross unequal line segments', () => {
  assert.deepEqual(samplePath('M0 0 L10 0 L10 30', 5), [[0, 0], [10, 0], [10, 10], [10, 20], [10, 30]])
  assert.deepEqual(samplePath('m1,2 2,0 l0,2', 3), [[1, 2], [3, 2], [3, 4]])
  assert.deepEqual(samplePath('M0 0 L0 0 L10 0 L10 0', 3), [[0, 0], [5, 0], [10, 0]])
})

test('Q and C curves use their actual curve, not just endpoints or control hull', () => {
  const quadratic = samplePath('M0 0 Q50 100 100 0', 3)
  near(quadratic[1][0], 50, 0.01)
  near(quadratic[1][1], 50, 0.01)
  assert.deepEqual(bounds(['M0 0 Q50 100 100 0']), { x: 0, y: 0, width: 100, height: 50 })
  const cubic = samplePath('M0 0 C0 100 100 100 100 0', 3)
  near(cubic[1][0], 50, 0.01)
  near(cubic[1][1], 75, 0.01)
  assert.deepEqual(bounds(['M0 0 C0 100 100 100 100 0']), { x: 0, y: 0, width: 100, height: 75 })
  // A collinear control polygon can reverse direction; flattening it to its endpoints loses that stroke.
  const returning = samplePath('M0 0 Q100 0 0 0', 3)
  near(returning[1][0], 50, 0.01)
  assert.deepEqual(returning[0], returning[2])
})

test('affine fitting preserves all separate pen strokes and curve commands', () => {
  const paths = ['M10 20 L30 40', 'M10 40 Q20 0 30 40']
  const result = fitPaths(paths, { x: 20, y: 30, width: 60, height: 40 })
  assert.deepEqual(result.sourceBox, { x: 10, y: 20, width: 20, height: 20 })
  assert.deepEqual(result.transform, { sx: 3, sy: 2, tx: -10, ty: -10 })
  assert.deepEqual(result.paths, ['M20 30 L80 70', 'M20 70 Q50 -10 80 70'])
  assert.equal(result.paths.length, paths.length)
  assert.ok(result.paths.every(path => (path.match(/M/g) ?? []).length === 1))
  assert.deepEqual(bounds(result.paths), { x: 20, y: 30, width: 60, height: 40 })
  assert.deepEqual(paths, ['M10 20 L30 40', 'M10 40 Q20 0 30 40'])
})

test('one-axis strokes remain centered lines, never NaN or collapsed points', () => {
  const vertical = fitPaths(['M30 10 L30 50'], { x: 10, y: 20, width: 40, height: 60 })
  assert.deepEqual(vertical.paths, ['M30 20 L30 80'])
  assert.deepEqual(vertical.transform, { sx: 1, sy: 1.5, tx: 0, ty: 5 })
  const horizontal = fitPaths(['M10 30 L50 30'], { x: 20, y: 10, width: 60, height: 40 })
  assert.deepEqual(horizontal.paths, ['M20 30 L80 30'])
  assert.throws(() => fitPaths(['M0 0 L10 10'], { x: 0, y: 0, width: 0, height: 10 }), /collapse/)
  assert.throws(() => fitPaths(['M0 0 L0 0'], { x: 0, y: 0, width: 10, height: 10 }), /positive/)
  assert.throws(() => fitPaths(['M0 0 L10 10'], { x: 0, y: 0, width: NaN, height: 10 }), /Invalid target/)
})

test('comparison separates reversal from shape and reports identical paths exactly', () => {
  const source = ['M10 10 Q30 90 80 80']
  const identical = comparePaths(source, source)
  assert.deepEqual(identical, {
    countMatch: true, orderedMeanDistance: 0, unorderedMeanDistance: 0, assignment: [0],
    orderAgreement: 1, directionAgreement: 1, maxMeanDistance: 0,
  })
  const reversed = comparePaths(['M80 80 Q30 90 10 10'], source)
  near(reversed.unorderedMeanDistance!, 0, 0.001)
  assert.ok(reversed.orderedMeanDistance! > 30)
  assert.equal(reversed.orderAgreement, 1)
  assert.equal(reversed.directionAgreement, 0)
})

test('minimum-cost matching detects reordered strokes without pretending their order agrees', () => {
  const expected = ['M0 0 L10 0', 'M20 20 L20 40', 'M50 50 Q60 70 80 80']
  const generated = [expected[2], expected[0], expected[1]]
  const result = comparePaths(generated, expected)
  assert.deepEqual(result.assignment, [2, 0, 1])
  assert.equal(result.unorderedMeanDistance, 0)
  assert.equal(result.orderAgreement, 0)
  assert.equal(result.directionAgreement, 1)
  assert.ok(result.orderedMeanDistance! > 20)
  assert.deepEqual(comparePaths(generated, expected), result)
})

test('assignment minimizes total cost instead of greedily taking the nearest first stroke', () => {
  const expected = ['M0 0 L0 10', 'M10 0 L10 10', 'M20 0 L20 10']
  const generated = ['M6 0 L6 10', 'M10 0 L10 10', 'M20 0 L20 10']
  const result = comparePaths(generated, expected)
  assert.deepEqual(result.assignment, [0, 1, 2])
  near(result.unorderedMeanDistance!, 2)
  near(result.maxMeanDistance!, 6)
})

test('same stroke count and direction do not hide wrong geometry, scale, or placement', () => {
  const result = comparePaths(['M0 40 L100 40'], ['M0 10 L100 10'])
  assert.equal(result.countMatch, true)
  near(result.orderedMeanDistance!, 30)
  near(result.unorderedMeanDistance!, 30)
  near(result.maxMeanDistance!, 30)
  assert.equal(result.orderAgreement, 1)
  assert.equal(result.directionAgreement, 1)
  assert.ok(comparePaths(['M20 0 L80 0'], ['M0 0 L100 0']).unorderedMeanDistance! > 10)
  assert.equal(comparePaths(['M0 0 Q100 0 0 0'], ['M0 0 Q100 0 0 0']).directionAgreement, 0)
})

test('count mismatches and empty inputs have no invented matching scores', () => {
  const unmatched = comparePaths(['M0 0 L10 0'], [])
  assert.deepEqual(unmatched, {
    countMatch: false, orderedMeanDistance: null, unorderedMeanDistance: null, assignment: [],
    orderAgreement: null, directionAgreement: null, maxMeanDistance: null,
  })
  assert.deepEqual(comparePaths([], []), { ...unmatched, countMatch: true })
})

test('malformed, nonfinite, unsupported, and multiple-pen paths are rejected', () => {
  for (const path of ['', 'M0 0', 'M0 0 L', 'L0 0', 'M0 0 L1', 'M0 0 Q10 20 30',
    'M0 0 C1 2 3 4 5', 'M0 0 LInfinity 1', 'M0 0 L1e999 1', 'M0 0 LNaN 1',
    'M0,,0 L1 1', 'M,0 0 L1 1', 'M0 0,L1 1', 'M0 0 L1 1,', 'M0 0 L1 1 garbage',
    'M0 0 L1 1 M2 2 L3 3', 'M0 0 L1 1 m2 2 l3 3', 'M0 0 L1 1 Z', 'M0 0 H10', 'M0 0 A1 1 0 0 0 2 2']) {
    assert.throws(() => samplePath(path), Error, path)
  }
  assert.throws(() => samplePath('M0 0 L1 1', 1), /sample count/)
  assert.throws(() => samplePath('M0 0 L1 1', 2.5), /sample count/)
  assert.throws(() => bounds([]), /No stroke/)
  assert.throws(() => comparePaths(['bad path'], []), /path/)
})
