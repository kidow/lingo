import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { hanjaStrokeData, HANJA_STROKES } from './hanja-strokes.ts'
import { loadNumberedBundle, numberedSourceReference, type HanjaNumberedStrokeData } from './hanja-stroke-numbered.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { buildNumberedBundle, numberedGeometry, validateNumberedBundle, validateNumberedProofs, validateNumberedReview } from '../scripts/hanja-stroke-numbered.ts'
import originals from '../scripts/hanja-stroke-numbered-originals.json' with { type: 'json' }
import grade from '../content/hanja/characters/g3-2.json' with { type: 'json' }
import reviewed from '../docs/hanja-g3ii-cheon-paths-2026-09-13/candidate-paths.json' with { type: 'json' }
import originalReview from '../docs/hanja-g3ii-cheon-paths-2026-09-13/originals.json' with { type: 'json' }
import recipe from '../docs/hanja-g3ii-cheon-paths-2026-09-13/recipe.json' with { type: 'json' }
import sources from '../docs/hanja-g3ii-cheon-paths-2026-09-13/sources.json' with { type: 'json' }

const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const points = (path: string) => [...path.matchAll(/[ML]([\d.]+) ([\d.]+)/g)].map(m => [Number(m[1]), Number(m[2])])
const original = originals.candidates.find(c => c.character === '遷')!
const published = () => hanjaStrokeData({ glyph: '遷', strokes: 15 }) as HanjaNumberedStrokeData

test('遷 activates the final grade 3-II character with the reviewed 15 paths', () => {
  assert.equal(grade.characters.length, 500)
  assert.equal(grade.characters.filter(c => hanjaStrokeData(c)).length, 500)
  assert.equal(HANJA_STROKES.filter(c => c.glyph === '遷').length, 1)
  assert.equal(published().verificationSource, 'moyaland-numbered')
  assert.deepEqual(published().paths, reviewed.paths)
  assert.equal(hash(published().paths), 'ad14e4955ce0585f21eb3481c280d47b960c44e974ded49c33f0e9ed898d38ba')
  assert.equal(hanjaStrokeData({ glyph: '遷', strokes: 14 }), null)
  assert.equal(hanjaStrokeData({ glyph: '遷', strokes: 16 }), null)
})

test('the licensed original remains 14 strokes; the reviewed split preserves every source point', () => {
  assert.deepEqual(original.medians, originalReview.medians)
  assert.equal(original.medians.length, 14)
  const before = structuredClone(original.medians)
  const geometry = numberedGeometry('遷', original.medians)
  assert.deepEqual(original.medians, before)
  assert.deepEqual(geometry.sourceStrokeIndices, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13, 14])
  const paths = geometry.paths.map(points)
  const normalized = normalizeMedians(original.medians).map(points)
  assert.deepEqual([...paths[12], ...paths[13].slice(1)], normalized[12])
  assert.deepEqual(paths[12].at(-1), paths[13][0])
  assert.deepEqual(paths[14], normalized[13])
  for (let i = 0; i < 12; i++) {
    if (i === 10) {
      assert.deepEqual(paths[i].slice(0, -1), normalized[i].slice(0, -1))
      assert.deepEqual(paths[i].at(-1), [71.3, 63])
    } else assert.deepEqual(paths[i], normalized[i])
  }
  const candidates = originals.candidates.map(c => ({ ...c, strokes: normalizeMedians(c.medians) }))
  assert.deepEqual(buildNumberedBundle(candidates).characters.find(c => c.glyph === '遷')?.paths, reviewed.paths)
  candidates.find(c => c.character === '遷')!.strokes = reviewed.paths
  assert.throws(() => buildNumberedBundle(candidates), /count mismatch/)
})

test('10 and 11 finish left/up and the two walking-component bends keep their reviewed directions', () => {
  const paths = published().paths.map(points)
  for (const index of [9, 10]) {
    const [from, to] = paths[index].slice(-2)
    assert.ok(to[0] < from[0] && to[1] < from[1])
  }
  const fourteen = paths[13]
  assert.ok(fourteen[1][0] > fourteen[0][0] && fourteen[1][1] > fourteen[0][1])
  assert.ok(fourteen.at(-1)![0] < fourteen.at(-2)![0] && fourteen.at(-1)![1] > fourteen.at(-2)![1])
  assert.equal(recipe.pointCorrections.length, 1)
  assert.deepEqual(recipe.pointCorrections[0].original, [790, 263])
  assert.deepEqual(recipe.pointCorrections[0].corrected, [770, 263])
})

test('遷 uses its own review and direction reference without claiming exam-body certification', () => {
  const data = published()
  const reference = numberedSourceReference('遷')
  assert.equal(data.verifiedAt, '2026-09-14')
  assert.equal(reference.directionUrl, sources.directionSupplement.embeddedPlayerUrl)
  assert.equal(reference.numberedDiagramUrl, 'https://www.moyaland.com/_new/data/item/1428026156_l2')
  for (const [file, expected] of [
    ['sources.json', reference.sourceReviewSha256],
    ['review.json', reference.directionEvidenceSha256],
  ]) {
    const bytes = readFileSync(new URL('../docs/hanja-g3ii-cheon-paths-2026-09-13/' + file, import.meta.url))
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expected)
  }
  assert.equal(data.geometrySource, originalReview.sourceSha256)
  assert.match(buildNumberedBundle().geometrySource.license, /Arphic/)
  assert.match(buildNumberedBundle().verificationSource.scope, /not exam-body certification/)
  validateNumberedReview(data, 15)
  validateNumberedBundle()
})

test('identity mappings, substituted evidence and reverted direction cannot bypass 遷 approval', () => {
  for (const mutate of [
    (c: HanjaNumberedStrokeData) => { c.sourceStrokeIndices = Array.from({ length: 15 }, (_, i) => i + 1) },
    (c: HanjaNumberedStrokeData) => { c.sourceReference = numberedSourceReference('笛') },
    (c: HanjaNumberedStrokeData) => { c.verifiedAt = '2026-09-13' },
  ]) {
    const bundle = structuredClone(buildNumberedBundle())
    const entry = bundle.characters.find(c => c.glyph === '遷')!
    mutate(entry as HanjaNumberedStrokeData)
    assert.throws(() => loadNumberedBundle(bundle), /entry mismatch/)
  }
  const reverted = structuredClone(published())
  reverted.paths = reverted.paths.map((p, i) => i === 10 ? p.replace('L71.3 63', 'L73 63') : p)
  reverted.pathsSha256 = hash(reverted.paths)
  assert.throws(() => validateNumberedReview(reverted, 15), /reviewed entry/)
})

test('every pinned 遷 evidence file rejects rewritten source, recipe or approval claims', () => {
  const files = ['originals.json', 'recipe.json', 'review.json', 'candidate-paths.json', 'sources.json']
  for (const filename of files) {
    assert.throws(() => validateNumberedProofs(file => {
      const bytes = readFileSync(new URL('../' + file, import.meta.url))
      return file === 'docs/hanja-g3ii-cheon-paths-2026-09-13/' + filename ? Buffer.concat([bytes, Buffer.from(' ')]) : bytes
    }), /proof changed/)
  }
})
