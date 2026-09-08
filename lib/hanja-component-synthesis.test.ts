import assert from 'node:assert/strict'
import test from 'node:test'
import { bounds } from '../scripts/hanja-component-geometry.ts'
import { buildLibrary, compose, digest, selectHoldout, structureGroup,
  type ApprovedDonor, type CatalogCharacter, type Library } from '../scripts/hanja-component-synthesis.ts'
import { DICTIONARY_SOURCE, PILOT_GLYPHS, runPilot, validateInput,
  type InputSnapshot } from '../scripts/hanja-component-pilot.ts'

// Synthetic centerlines and provenance: these fixtures never certify or publish a glyph.
const mouth = ['M10 10 L10 90', 'M10 10 L90 10 L90 90', 'M10 90 L90 90']
const line = (index: number) => `M10 ${10 + index * 2} L90 ${10 + index * 2}`
function donor(glyph: string, paths: readonly string[] = mouth): ApprovedDonor {
  return { glyph, paths: [...paths], pathsSha256: digest(paths), verificationSource: 'synthetic-test-fixture' }
}
function catalogFor(donors: readonly ApprovedDonor[]): Map<string, CatalogCharacter> {
  return new Map(donors.map(d => [d.glyph, { glyph: d.glyph, strokes: d.paths.length, readingGrade: 'fixture' }]))
}
function simpleLibrary(): Library {
  const donors = [donor('口'), donor('囗')]
  return buildLibrary(donors, new Map(), catalogFor(donors))
}
function rehashLibrary(library: Library): void {
  const { hash: _hash, ...value } = library
  library.hash = digest(value)
}

function experimentFixture() {
  const groups = ['⿰口口', '⿱口口', '⿰氵口', '⿴囗口', '？']
  const approved = Array.from({ length: 150 }, (_, index) => donor(String.fromCodePoint(0xe000 + index), [line(0), line(1)]))
  const definitions: Record<string, string> = Object.fromEntries(approved.map((d, index) => [d.glyph, groups[Math.floor(index / 30)]]))
  for (const glyph of PILOT_GLYPHS) definitions[glyph] = '⿰口口'
  const characters = [...catalogFor(approved).values(), ...PILOT_GLYPHS.map(glyph => ({ glyph, strokes: 6, readingGrade: 'fixture' }))]
  const input: InputSnapshot = {
    version: 1, dictionarySource: DICTIONARY_SOURCE, sourceRows: 150,
    definitions, definitionsSha256: digest(definitions), approvedSnapshotSha256: digest(approved),
    candidateGlyphs: [...PILOT_GLYPHS],
  }
  return { approved, characters, input }
}

test('the same 100 held-out targets stay selected when every prediction abstains', () => {
  const { input, approved, characters } = experimentFixture()
  const definitions = new Map(Object.entries(input.definitions))
  const selected = selectHoldout(approved.map(d => d.glyph), definitions)
  assert.equal(new Set(selected).size, 100)
  assert.deepEqual(selectHoldout(approved.map(d => d.glyph).reverse(), definitions), selected)
  assert.deepEqual(Object.fromEntries(['left-right', 'top-bottom', 'positional-variant', 'enclosure', 'other']
    .map(group => [group, selected.filter(g => structureGroup(g, definitions) === group).length])), {
    'left-right': 25, 'top-bottom': 25, 'positional-variant': 25, enclosure: 15, other: 10,
  })
  // There are 50 unselected donors, but generation failure must never backfill from them.
  const result = runPilot(input, approved, characters)
  assert.deepEqual(result.input.heldOut, selected)
  assert.deepEqual(result.evaluation.map(e => e.glyph), selected)
  assert.equal(result.summary.heldOut, 100)
  assert.equal(result.summary.generated, 0)
  assert.equal(result.summary.abstained, 100)
  assert.equal(result.summary.screenPassed, 0)
  assert.equal(result.summary.pilotApproved, 0)
  assert.equal(result.summary.runtimePublished, 0)
  assert.throws(() => selectHoldout(approved.slice(0, 99).map(d => d.glyph), definitions), /100/)
  assert.throws(() => selectHoldout([...approved.map(d => d.glyph), approved[0].glyph], definitions), /unique/)
})

test('held-out glyphs, recursive complete subcomponents, and expanded matching IDS subtrees cannot donate', () => {
  const approved = [donor('木', Array.from({ length: 4 }, (_, i) => line(i))),
    donor('林', Array.from({ length: 8 }, (_, i) => line(i))),
    donor('森', Array.from({ length: 12 }, (_, i) => line(i))),
    donor('\ue100', Array.from({ length: 12 }, (_, i) => line(i))),
    donor('\ue101', Array.from({ length: 16 }, (_, i) => line(i)))]
  const definitions = new Map([
    ['林', '⿰木木'], ['森', '⿱木林'], ['\ue100', '⿱木⿰木木'], ['\ue101', '⿱森木'],
  ])
  const library = buildLibrary(approved, definitions, catalogFor(approved), ['林'])
  assert.deepEqual(library.donorGlyphs, ['木'])
  assert.deepEqual(new Set(library.components.map(c => c.donorGlyph)), new Set(['木']))
  assert.equal(library.excludedDonors.find(d => d.glyph === '林')?.reason, 'held-out-target')
  for (const glyph of ['森', '\ue100', '\ue101']) {
    assert.equal(library.excludedDonors.find(d => d.glyph === glyph)?.reason, 'contains-held-out-component')
  }
  // A compatibility ideograph must not bypass the direct held-out restriction.
  const compatible = [donor('兩')]
  assert.equal(buildLibrary(compatible, new Map(), catalogFor(compatible), ['兩']).donorGlyphs.length, 0)
})

test('upstream split indices and explicit nulls survive while truncated or invalid mappings fail', () => {
  const approved = [{ ...donor('口'), geometrySource: 'synthetic-source',
    sourceStrokeIndices: [4, 4, null], strokeOrder: [1, 2, 3] }]
  const library = buildLibrary(approved, new Map(), catalogFor(approved))
  assert.deepEqual(library.components[0].approvedPathIndices, [1, 2, 3])
  assert.deepEqual(library.components[0].upstreamIndices, [4, 4, null])
  for (const mapping of [[1, 2], [1, 2, 0], [1, 2, NaN], Array<number>(3)]) {
    const invalid = [{ ...donor('口'), sourceStrokeIndices: mapping }]
    assert.throws(() => buildLibrary(invalid, new Map(), catalogFor(invalid)), /Invalid upstream mapping/)
  }
  const invalidStrokeOrder = [{ ...donor('口'), strokeOrder: [1, 2] }]
  assert.throws(() => buildLibrary(invalidStrokeOrder, new Map(), catalogFor(invalidStrokeOrder)), /Invalid upstream mapping/)
})

test('changing donor paths, library layout, or a component invalidates its recorded identity', () => {
  const definitions = new Map([['吅', '⿰口口']])
  const modifiedDonor = [{ ...donor('口'), paths: ['M0 0 L10 10', ...mouth.slice(1)] }]
  assert.throws(() => buildLibrary(modifiedDonor, new Map(), catalogFor(modifiedDonor)), /Stale approved donor paths hash/)
  const library = simpleLibrary()
  library.layouts.push({ operator: '⿰', first: '口', second: '口', ratio: .3, donorGlyph: '口' })
  assert.throws(() => compose({ glyph: '吅', strokes: 6 }, definitions, library), /library hash mismatch/)
  const changedComponent = simpleLibrary()
  changedComponent.components[0].paths[0] = 'M20 20 L20 80'
  rehashLibrary(changedComponent)
  assert.throws(() => compose({ glyph: '吅', strokes: 6 }, definitions, changedComponent), /Component identity/)
  const changedMapping = simpleLibrary()
  changedMapping.components[0].approvedPathIndices = [1, 1, 3]
  const { id: _id, ...record } = changedMapping.components[0]
  changedMapping.components[0].id = digest(record).slice(0, 24)
  rehashLibrary(changedMapping)
  assert.throws(() => compose({ glyph: '吅', strokes: 6 }, definitions, changedMapping), /approved path mapping/)
})

test('binary and nested mouth components leave actual clearance with stroke width 5', () => {
  const definitions = new Map([['吅', '⿰口口'], ['\ue110', '⿰口⿰口口']])
  for (const [glyph, strokes] of [['吅', 6], ['\ue110', 9]] as const) {
    const candidate = compose({ glyph, strokes }, definitions, simpleLibrary())
    assert.equal(candidate.status, 'candidate-unreviewed')
    const boxes = candidate.placements.map(placement => bounds(candidate.paths.filter((_, i) => candidate.schedule[i].instance === placement.instance)))
      .sort((a, b) => a.x - b.x)
    assert.equal(boxes.length, strokes / 3)
    for (let index = 1; index < boxes.length; index++) {
      const centerlineGap = boxes[index].x - (boxes[index - 1].x + boxes[index - 1].width)
      assert.ok(centerlineGap - 5 >= 1 - 1e-8, `Painted stroke clearance is ${centerlineGap - 5}`)
    }
  }
})

test('full enclosure schedules opening two strokes, complete interior, then its closing stroke', () => {
  const candidate = compose({ glyph: '回', strokes: 6 }, new Map([['回', '⿴囗口']]), simpleLibrary())
  assert.equal(candidate.status, 'candidate-unreviewed')
  assert.deepEqual(candidate.schedule, [
    { instance: 'root.0', componentStroke: 1 }, { instance: 'root.0', componentStroke: 2 },
    { instance: 'root.1', componentStroke: 1 }, { instance: 'root.1', componentStroke: 2 },
    { instance: 'root.1', componentStroke: 3 }, { instance: 'root.0', componentStroke: 3 },
  ])
  assert.equal(candidate.paths.length, 6)
  assert.equal(new Set(candidate.schedule.map(s => s.instance + ':' + s.componentStroke)).size, 6)
  assert.ok(candidate.rules.includes('enclosure-opening-interior-closing'))
})

test('deep enclosures must abstain or preserve the painted gap around their inner components', () => {
  const candidate = compose({ glyph: '\ue111', strokes: 15 }, new Map([['\ue111', '⿴囗⿴囗⿴囗⿴囗口']]), simpleLibrary())
  if (candidate.status === 'abstained') {
    assert.equal(candidate.paths.length, 0)
    return
  }
  const boxes = candidate.placements.map(placement => bounds(candidate.paths.filter((_, i) => candidate.schedule[i].instance === placement.instance)))
  for (let index = 1; index < boxes.length; index++) {
    const outer = boxes[index - 1], inner = boxes[index]
    const inset = Math.min(inner.x - outer.x, inner.y - outer.y,
      outer.x + outer.width - inner.x - inner.width, outer.y + outer.height - inner.y - inner.height)
    assert.ok(inset >= 6 - 1e-8, `Nested painted strokes overlap or lose clearance: centerline inset ${inset}`)
  }
})

test('unsupported structure, missing positional forms, cycles, and wrong target counts abstain without partial paths', () => {
  const definitions = new Map([['吅', '⿰口口'], ['串', '⿻口口'], ['\ue112', '⿰氵口'], ['\ue113', '⿰\ue113口'], ['\ue114', '？']])
  for (const [glyph, strokes, reason] of [
    ['吅', 7, 'target-stroke-count:6/7'], ['串', 6, 'unsupported-operator:⿻'],
    ['\ue112', 6, 'missing-component:氵'], ['\ue113', 6, 'cyclic-or-deep-decomposition:'],
    ['\ue114', 6, 'missing-compound-definition'],
  ] as const) {
    const candidate = compose({ glyph, strokes }, definitions, simpleLibrary())
    assert.equal(candidate.status, 'abstained')
    assert.ok(candidate.reason?.startsWith(reason), candidate.reason ?? 'Missing abstention reason')
    assert.deepEqual(candidate.paths, [])
    assert.deepEqual(candidate.schedule, [])
    assert.deepEqual(candidate.placements, [])
  }
})

test('generation consumes only target identity/count, structure, and donor paths, without foreign target geometry', () => {
  const target = { glyph: '吅', strokes: 6 }
  for (const field of ['paths', 'medians', 'matches', 'strokeOrder']) {
    Object.defineProperty(target, field, { get() { throw new Error('Forbidden target field read: ' + field) } })
  }
  const candidate = compose(target, new Map([['吅', '⿰口口']]), simpleLibrary())
  assert.equal(candidate.status, 'candidate-unreviewed')
  assert.equal(candidate.provenance, 'component-derived-unreviewed')
  assert.equal(candidate.paths.length, 6)
  assert.ok(candidate.placements.every(p => p.donorGlyph === '口'))
})

test('experiment snapshots bind donor data and definitions before held-out evaluation', () => {
  const { input, approved } = experimentFixture()
  validateInput(input, [...approved].reverse())
  const changedDefinitions = structuredClone(input)
  changedDefinitions.definitions[approved[0].glyph] = '⿱口口'
  assert.throws(() => validateInput(changedDefinitions, approved), /snapshot changed/)
  const changedDonors = structuredClone(approved)
  changedDonors[0].paths = ['M0 0 L1 1', line(1)]
  assert.throws(() => validateInput(input, changedDonors), /snapshot changed/)
  assert.throws(() => validateInput({ ...input, candidateGlyphs: [...input.candidateGlyphs].reverse() }, approved), /snapshot changed/)
})
