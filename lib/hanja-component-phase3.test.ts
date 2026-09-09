import assert from 'node:assert/strict'
import test from 'node:test'
import { DICTIONARY_SOURCE, PILOT_GLYPHS, type InputSnapshot } from '../scripts/hanja-component-pilot.ts'
import { knownHeldOutExclusions, type Phase2Split } from '../scripts/hanja-component-phase2.ts'
import { digest, structureGroup, type ApprovedDonor, type CatalogCharacter, type ReviewedParts } from '../scripts/hanja-component-synthesis.ts'
import { generatePhase3, preparePhase3, scorePhase3, PHASE3_ARCHIVE_SHA256,
  type Phase3Archive, type Phase3Parts, type Phase3Split, type PreparedPhase3 } from '../scripts/hanja-component-phase3.ts'

const order = (a: string, b: string) => a.codePointAt(0)! - b.codePointAt(0)!

function fixture() {
  const glyphs = Array.from({ length: 743 }, (_, i) => String.fromCodePoint(0x3400 + i))
  glyphs[600] = '木'; glyphs[601] = '火'
  const approved: ApprovedDonor[] = glyphs.map(glyph => ({ glyph, paths: ['M10 20 L35 20', 'M65 80 L90 80'] }))
  approved[600].paths = ['M50 10 L50 90']; approved[601].paths = ['M10 90 L90 10']
  // This donor has overlapping spatial extents: the extra explicit assignment supplies 女.
  approved[707].paths = ['M10 20 L60 60', 'M50 10 L90 80']
  const definitions: Record<string, string> = Object.fromEntries(glyphs.map(g => [g, '？']))
  definitions[glyphs[200]] = '⿰女木'
  for (let i = 700; i < 706; i++) definitions[glyphs[i]] = '⿰工木'
  definitions[glyphs[707]] = '⿰女火'
  definitions[glyphs[708]] = '⿰' + glyphs[200] + '？'
  definitions[glyphs[709]] = '⿱⿰女木火'
  const characters: CatalogCharacter[] = [...approved.map(d => ({ glyph: d.glyph, strokes: d.paths.length, readingGrade: 'synthetic' })),
    ...PILOT_GLYPHS.map(glyph => ({ glyph, strokes: 2, readingGrade: 'synthetic' }))]
  const input: InputSnapshot = { version: 1, dictionarySource: DICTIONARY_SOURCE, sourceRows: 743, definitions,
    definitionsSha256: digest(definitions), approvedSnapshotSha256: digest([...approved].sort((a, b) => order(a.glyph, b.glyph))), candidateGlyphs: PILOT_GLYPHS }
  const previous: Phase2Split = { version: 1, purpose: 'Synthetic prior split', approvedSnapshotSha256: input.approvedSnapshotSha256,
    definitionsSha256: input.definitionsSha256, developmentHeldOut: glyphs.slice(0, 100), validationHeldOut: glyphs.slice(100, 200),
    allowedValidationDonors: [], excludedValidationDonors: [], groups: {}, hash: 'b'.repeat(64) }
  const recipe = (id: string, glyph: string, donor: number) => ({ id, glyph, position: 'left' as const, donorGlyph: glyphs[donor],
    donorPathsSha256: digest(approved[donor].paths), approvedPathIndices: [1],
    review: { status: 'reviewed-component-assignment' as const, method: 'static-path-and-glyph-review' as const,
      notes: 'Synthetic assignment for a regression test.', limitations: 'Not a real observation or approval.' } })
  const baseline: ReviewedParts = { version: 1, splitHash: previous.hash,
    recipes: [...Array.from({ length: 6 }, (_, i) => recipe('baseline-' + i, '工', 700 + i)), recipe('baseline-held', '女', 200)] }
  const targets = glyphs.slice(200, 300), defs = new Map(Object.entries(definitions))
  const partial = knownHeldOutExclusions(glyphs, defs, targets)
  const excluded = new Set([...targets, ...partial.map(d => d.glyph)])
  const splitBody = { version: 1 as const, purpose: 'Synthetic fresh 100', archiveFileSha256: PHASE3_ARCHIVE_SHA256,
    approvedSnapshotSha256: input.approvedSnapshotSha256, definitionsSha256: input.definitionsSha256, previousSplitHash: previous.hash,
    previousDevelopmentHeldOut: previous.developmentHeldOut, previousValidationHeldOut: previous.validationHeldOut,
    excludedDraftGlyphs: PILOT_GLYPHS, selection: { seed: 'synthetic', quotas: [['left-right', 1], ['other', 99]] as [string, number][] },
    validationHeldOut: targets,
    groups: Object.fromEntries([...new Set(targets.map(g => structureGroup(g, defs)))].sort()
      .map(group => [group, targets.filter(g => structureGroup(g, defs) === group).length])),
    allowedValidationDonors: glyphs.filter(g => !excluded.has(g)).sort(order),
    excludedValidationDonors: glyphs.filter(g => excluded.has(g)).sort(order).map(glyph => ({ glyph, reason: 'held-out-target' })),
    partialIdsExclusions: partial }
  const split: Phase3Split = { ...splitBody, hash: digest(splitBody) }
  const expanded: Phase3Parts = { version: 1, splitHash: split.hash, recipes: [...baseline.recipes, recipe('expanded-woman', '女', 707)],
    inactiveRecipes: [{ glyph: '冂', position: 'enclosure', reason: 'Unsupported ⿵ operator; no substitute operator.' }] }
  const payload = { input, approved, characters, split: previous, reviewedParts: baseline }
  const archive: Phase3Archive = { schemaVersion: 1, payload, payloadSha256: digest(payload),
    baseline: { approvedCount: 743, catalogCount: characters.length, expectedApprovedSnapshotSha256: input.approvedSnapshotSha256,
      inputCanonicalSha256: digest(input), recipeHash: digest(baseline) }, implementationFreeze: { files: {} } }
  const trust = { splitHash: split.hash, archivePayloadSha256: archive.payloadSha256 }
  return { archive, split, expanded, trust, glyphs }
}

function repinSplit(split: Phase3Split) { const { hash: _hash, ...body } = split; split.hash = digest(body) }
function repinPrepared(prepared: PreparedPhase3) { const { preparedSha256: _hash, ...body } = prepared; prepared.preparedSha256 = digest(body) }

test('same eligible donors and unchanged v2 engine isolate recipe additions; held donor recipes stay excluded', () => {
  const f = fixture(), before = JSON.stringify(f)
  const prepared = preparePhase3(f.archive, f.split, f.expanded, f.trust)
  const generated = generatePhase3(prepared)
  assert.equal(generated.predictions.v2.length, 100)
  assert.equal(generated.predictions.v3.length, 100)
  assert.deepEqual(generated.libraries.v2.donorGlyphs, generated.libraries.v3.donorGlyphs)
  assert.equal(generated.libraries.v2.layoutMode, 'position-profiles-v2')
  assert.equal(generated.libraries.v3.layoutMode, 'position-profiles-v2')
  for (const library of [generated.libraries.v2, generated.libraries.v3]) {
    assert.deepEqual(library.skippedRecipes.map(r => r.id), ['baseline-held'])
    assert.ok(!library.donorGlyphs.includes(f.glyphs[200]))
    assert.ok(!library.donorGlyphs.includes(f.glyphs[708]))
    assert.ok(!library.donorGlyphs.includes(f.glyphs[709]))
  }
  assert.equal(generated.libraries.v3.activeRecipeCount, generated.libraries.v2.activeRecipeCount + 1)
  assert.deepEqual(generated.libraries.v3.inactiveRecipes, f.expanded.inactiveRecipes)
  assert.equal(JSON.stringify(f), before)
})

test('generator cannot read withheld paths, even through a baseline recipe donor', () => {
  const f = fixture(), prepared = preparePhase3(f.archive, f.split, f.expanded, f.trust)
  const held = new Set([...f.split.validationHeldOut, ...f.split.partialIdsExclusions.map(d => d.glyph)])
  for (const donor of f.archive.payload.approved) if (held.has(donor.glyph)) {
    Object.defineProperty(donor, 'paths', { get() { throw new Error('Held-out paths read during generation') } })
  }
  for (const metadata of prepared.metadata) if (held.has(metadata.glyph)) {
    Object.defineProperty(metadata, 'paths', { get() { throw new Error('Metadata exposes no target geometry') } })
  }
  assert.doesNotThrow(() => generatePhase3(prepared))
})

test('all 100 predictions in both arms exist before scoring references are loaded', () => {
  const f = fixture(), generated = generatePhase3(preparePhase3(f.archive, f.split, f.expanded, f.trust))
  const refs = new Map(f.archive.payload.approved.map(d => [d.glyph, d.paths]))
  const calls: string[] = []
  const scored = scorePhase3(generated, glyph => {
    assert.equal(generated.predictions.v2.length, 100)
    assert.equal(generated.predictions.v3.length, 100)
    calls.push(glyph)
    return refs.get(glyph)!
  })
  assert.deepEqual(calls, f.split.validationHeldOut)
  assert.equal(scored.summary.v2.targets, 100)
  assert.equal(scored.summary.v3.targets, 100)
  assert.equal(scored.summary.v2.generated + scored.summary.v2.abstained, 100)
  assert.equal(scored.summary.published, 0)
  assert.ok(scored.predictions.v2.every(row => !('expectedPaths' in row)))
  assert.throws(() => scorePhase3(generated, () => []), /mismatched frozen evaluation reference/)
  assert.throws(() => scorePhase3(generated, glyph => refs.get(glyph)!.map(() => 'M1 1 L2 2')), /mismatched frozen evaluation reference/)
})

test('frozen payload, split, and original seven recipe pins reject substitutions', () => {
  const f = fixture()
  f.archive.payload.approved[0].paths = ['M1 1 L2 2']
  assert.throws(() => preparePhase3(f.archive, f.split, f.expanded, f.trust), /archive payload pin/)
  const split = fixture(); split.split.validationHeldOut.reverse()
  assert.throws(() => preparePhase3(split.archive, split.split, split.expanded, split.trust), /split pin/)
  const recipes = fixture(); recipes.expanded.recipes = structuredClone(recipes.expanded.recipes)
  recipes.expanded.recipes[0].review.notes = 'Changed original recipe'
  assert.throws(() => preparePhase3(recipes.archive, recipes.split, recipes.expanded, recipes.trust), /Original position recipe changed/)
})

test('fresh 100 sizing, disjointness and partial-IDS donor exclusions remain mandatory after repinning', () => {
  const small = fixture(); small.split.validationHeldOut.pop(); repinSplit(small.split); small.expanded.splitHash = small.split.hash
  assert.throws(() => preparePhase3(small.archive, small.split, small.expanded, { ...small.trust, splitHash: small.split.hash }), /exactly 100/)
  const overlap = fixture(); overlap.split.validationHeldOut[0] = overlap.split.previousDevelopmentHeldOut[0]
  repinSplit(overlap.split); overlap.expanded.splitHash = overlap.split.hash
  assert.throws(() => preparePhase3(overlap.archive, overlap.split, overlap.expanded, { ...overlap.trust, splitHash: overlap.split.hash }), /overlap prior/)
  const leak = fixture(); leak.split.allowedValidationDonors.push(leak.glyphs[708]); repinSplit(leak.split); leak.expanded.splitHash = leak.split.hash
  assert.throws(() => preparePhase3(leak.archive, leak.split, leak.expanded, { ...leak.trust, splitHash: leak.split.hash }), /common eligible donor list/)
})

test('generator rejects non-common geometry even with a refreshed prepared object hash', () => {
  const f = fixture(), prepared = preparePhase3(f.archive, f.split, f.expanded, f.trust)
  prepared.eligible = [...prepared.eligible, f.archive.payload.approved[200]]
  repinPrepared(prepared)
  assert.throws(() => generatePhase3(prepared), /non-common or held-out geometry/)
})
