import assert from 'node:assert/strict'
import test from 'node:test'
import { bounds, samplePath } from '../scripts/hanja-component-geometry.ts'
import { buildLibrary, compose, digest, type ApprovedDonor, type CatalogCharacter,
  type ReviewedParts } from '../scripts/hanja-component-synthesis.ts'

// Artificial PUA donors exercise an integration boundary without reading any evaluation glyphs.
const mouth = ['M0 0 L0 80', 'M0 0 L80 0 L80 80', 'M0 80 L80 80']
const right = ['M40 0 L40 80', 'M40 0 L80 0 L80 80', 'M40 80 L80 80']
function fixture(allFlat = false) {
  const donorGlyphs = ['\ue200', '\ue201', '\ue202']
  const donors: ApprovedDonor[] = donorGlyphs.map((glyph, index) => ({ glyph,
    paths: [index || allFlat ? 'M0 20 L20 20' : 'M0 20 L20 21', ...right] }))
  const definitions = new Map([...donorGlyphs.map(glyph => [glyph, '⿰一口'] as [string, string]),
    ['丁', '⿰一口'], ['\ue2ff', '⿰口⿰一口']])
  const catalog = new Map<string, CatalogCharacter>(donors.map(d => [d.glyph,
    { glyph: d.glyph, strokes: 4, readingGrade: 'fixture' }]))
  catalog.set('一', { glyph: '一', strokes: 1, readingGrade: 'fixture' })
  catalog.set('口', { glyph: '口', strokes: 3, readingGrade: 'fixture' })
  const reviewedParts: ReviewedParts = { version: 1, splitHash: 'a'.repeat(64), recipes: donors.map(d => ({
    id: d.glyph, glyph: '一', position: 'left', donorGlyph: d.glyph,
    donorPathsSha256: digest(d.paths), approvedPathIndices: [1],
    review: { status: 'reviewed-component-assignment', method: 'static-path-and-glyph-review',
      notes: 'Synthetic fixture only.', limitations: 'No glyph certification.' },
  })) }
  const library = buildLibrary([...donors, { glyph: '口', paths: mouth }], definitions, catalog, [],
    { reviewedParts, layoutMode: 'position-profiles-v2' })
  return { library, definitions }
}

test('a zero-height profile median cannot flatten a selected slanted stroke or leave partial generation', () => {
  const { library, definitions } = fixture()
  const reviewed = library.components.filter(c => c.assignment === 'reviewed-component-assignment')
  assert.deepEqual(reviewed.map(c => c.sourceBox.height), [1, 0, 0])
  // This stable fixture makes the geometry chosen for emission nonflat while the profile median is flat.
  assert.equal([...reviewed].sort((a, b) => a.id.localeCompare(b.id))[0].sourceBox.height, 1)
  for (const [glyph, strokes] of [['丁', 4], ['\ue2ff', 7]] as const) {
    const result = compose({ glyph, strokes }, definitions, library)
    assert.equal(result.status, 'abstained')
    assert.equal(result.reason, 'profile-axis-collapse:一')
    assert.deepEqual(result.paths, [])
    assert.deepEqual(result.placements, [])
    assert.deepEqual(result.schedule, [])
    assert.equal(result.layoutProfiles, undefined)
  }
})

test('a truly flat selected stroke remains a valid line when its profiles have zero height', () => {
  const { library, definitions } = fixture(true)
  const result = compose({ glyph: '丁', strokes: 4 }, definitions, library)
  assert.equal(result.status, 'candidate-unreviewed')
  assert.equal(result.paths.length, 4)
  assert.equal(result.schedule.length, 4)
  assert.equal(result.placements.find(p => p.glyph === '一')?.targetBox.height, 0)
  assert.equal(result.provenance, 'component-derived-unreviewed')
})

function normalizedFixture(operator: '⿰' | '⿱', narrow = false) {
  const day = narrow
    ? ['M10 10 L10 90', 'M10 10 L30 10 L30 90', 'M10 50 Q20 45 30 50', 'M10 90 L30 90']
    : ['M10 10 L10 90', 'M10 10 L50 10 L50 90', 'M10 50 Q30 45 50 50', 'M10 90 L50 90']
  const donors: ApprovedDonor[] = [{ glyph: '口', paths: mouth }, { glyph: '日', paths: day }]
  const definitions = new Map([['\ue300', operator + (narrow ? '日日' : '口日')]])
  const catalog = new Map<string, CatalogCharacter>(donors.map(d => [d.glyph,
    { glyph: d.glyph, strokes: d.paths.length, readingGrade: 'fixture' }]))
  const library = buildLibrary(donors, definitions, catalog, [], { layoutMode: 'position-profiles-v2',
    reviewedParts: { version: 1, splitHash: 'a'.repeat(64), recipes: [] } })
  return { donors, result: compose({ glyph: '\ue300', strokes: narrow ? 8 : 7 }, definitions, library) }
}

function near(actual: number, expected: number, tolerance = 1e-7): void {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`)
}

test('final normalization fills 10..90 while retaining the relative component dimensions', () => {
  for (const operator of ['⿰', '⿱'] as const) {
    const { result } = normalizedFixture(operator)
    assert.equal(result.status, 'candidate-unreviewed')
    const box = bounds(result.paths)
    for (const key of ['x', 'y'] as const) near(box[key], 10)
    for (const key of ['width', 'height'] as const) near(box[key], 80)
    assert.ok(result.rules.includes('whole-glyph-box-normalization-unreviewed'))
    const [first, second] = result.placements
    // Before normalization LR mouth/day heights are 37/74; TB widths are 37/18.5.
    if (operator === '⿰') near(first.targetBox.height / second.targetBox.height, .5)
    else near(first.targetBox.width / second.targetBox.width, 2)
  }
})

test('final placement transforms reconstruct every scheduled donor path, including Q control points', () => {
  for (const operator of ['⿰', '⿱'] as const) {
    const { donors, result } = normalizedFixture(operator)
    assert.equal(result.status, 'candidate-unreviewed')
    for (const [index, step] of result.schedule.entries()) {
      const placement = result.placements.find(p => p.instance === step.instance)!
      const donor = donors.find(d => d.glyph === placement.donorGlyph)!
      const original = donor.paths[placement.approvedPathIndices[step.componentStroke - 1] - 1]
      let coordinate = 0
      const { sx, sy, tx, ty } = placement.transform
      // Apply the recorded combined affine matrix independently, directly to original donor data.
      const reconstructed = original.replace(/[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/gi, value => {
        const x = coordinate++ % 2 === 0
        return String(Number(value) * (x ? sx : sy) + (x ? tx : ty))
      })
      assert.deepEqual(reconstructed.match(/[MLQC]/g), result.paths[index].match(/[MLQC]/g))
      const actual = samplePath(result.paths[index], 64), expected = samplePath(reconstructed, 64)
      for (let point = 0; point < actual.length; point++) {
        near(actual[point][0], expected[point][0])
        near(actual[point][1], expected[point][1])
      }
    }
    for (const placement of result.placements) {
      const actual = bounds(result.paths.filter((_, index) => result.schedule[index].instance === placement.instance))
      for (const key of ['x', 'y', 'width', 'height'] as const) near(actual[key], placement.targetBox[key])
    }
  }
})

test('whole-glyph normalization never reduces the 6-unit centerline gap', () => {
  for (const [operator, narrow] of [['⿰', false], ['⿱', false], ['⿰', true]] as const) {
    const { result } = normalizedFixture(operator, narrow)
    assert.equal(result.status, 'candidate-unreviewed')
    const boxes = result.placements.map(placement => bounds(result.paths.filter((_, index) =>
      result.schedule[index].instance === placement.instance)))
    const gap = operator === '⿰'
      ? boxes[1].x - boxes[0].x - boxes[0].width
      : boxes[1].y - boxes[0].y - boxes[0].height
    assert.ok(gap >= 6 - 1e-7, `Centerline gap shrank to ${gap}`)
    assert.ok(gap - 5 >= 1 - 1e-7, `Painted stroke clearance shrank to ${gap - 5}`)
    // Narrow source glyphs require expansion on the split axis as well, not merely a perpendicular stretch.
    if (narrow) near(gap, 23 * 80 / 63)
  }
})
