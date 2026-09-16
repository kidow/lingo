import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH1_STROKES, G2_GEOMETRY_BATCH1_DICTIONARY_GEOMETRY, loadG2GeometryBatch1DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch1.ts'
import { buildG2GeometryBatch1DictionaryBundle, G2_GEOMETRY_BATCH1_DICTIONARY_PROOF_PINS, validateG2GeometryBatch1DictionaryProofs, validateG2GeometryBatch1DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch1.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch1-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH1_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
const distance = (p: number[], a: number[], b: number[]) => {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
const toPath = (p: number[], path: number[][]) => Math.min(...path.slice(1).map((v, k) => distance(p, path[k], v)))
test('three complete reviews reconstruct 40 strokes from the 37 licensed source strokes', () => {
  validateG2GeometryBatch1DictionaryBundle()
  assert.deepEqual(originals.map(e => [e.glyph, e.strokes, e.catalogStrokes]), [['葛',12,13],['儆',14,15],['菓',11,12]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH1_STROKES.reduce((n,e) => n + e.paths.length, 0), 40)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  for (const e of originals) {
    const entry = published(e.glyph)
    assert.equal(entry.geometrySource, G2_GEOMETRY_BATCH1_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph, e.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}), entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}), null)
    validateDictionaryReview(entry, e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes, Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus).map(e => ({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog = originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G2_GEOMETRY_BATCH1_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 3)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH1_STROKES,candidates('MM'),candidates('Ja')),/geometry mismatch/)
})
test('reviewed four-stroke tops retain separate horizontals and their intervening verticals', () => {
  for (const [g, first] of [['葛',1],['儆',3],['菓',1]] as const) {
    const left=points(g,first), lv=points(g,first+1), right=points(g,first+2), rv=points(g,first+3)
    assert.ok(left.at(-1)![0]>left[0][0] && right.at(-1)![0]>right[0][0],g+' horizontal direction')
    assert.ok(right[0][0]-left.at(-1)![0]>5,g+' visible gap at five-unit playback width')
    assert.ok(lv.at(-1)![1]>lv[0][1] && rv.at(-1)![1]>rv[0][1],g+' downward verticals')
    assert.ok(lv[0][1]<left[0][1] && lv.at(-1)![1]>left.at(-1)![1])
    assert.ok(rv[0][1]<right[0][1] && rv.at(-1)![1]>right.at(-1)![1])
  }
})
test('reviewed middle and bottom bars attach to both stems', () => {
  for (const [g, n, l, r] of [['葛',7,5,6],['葛',8,5,6],['菓',7,5,6],['菓',8,5,6],['儆',11,9,10]] as const) {
    const p=points(g,n)
    assert.ok(toPath(p[0],points(g,l))<0.2,g+' left endpoint '+n)
    assert.ok(toPath(p.at(-1)!,points(g,r))<0.2,g+' right endpoint '+n)
    assert.ok(p.at(-1)![0]>p[0][0],g+' left-to-right '+n)
  }
})
test('儆 final strokes begin on the horizontal and proceed in the reviewed directions', () => {
  const sweep=points('儆',14),fall=points('儆',15),bar=points('儆',13)
  assert.ok(toPath(sweep[0],bar)<0.2)
  assert.ok(toPath(fall[0],bar)<0.2)
  assert.ok(sweep.at(-1)![0]<sweep[0][0] && sweep.at(-1)![1]>sweep[0][1])
  assert.ok(fall.at(-1)![0]>fall[0][0] && fall.at(-1)![1]>fall[0][1])
  assert.ok(Math.abs(fall[1][0]-fall[0][0])<1 && fall[1][1]>fall[0][1], 'initial descent')
})
test('source geometry, directions, proof bytes and source identity cannot silently regress', () => {
  for (const e of originals) {
    const reverted=structuredClone(published(e.glyph));reverted.paths=e.paths
    assert.throws(()=>validateDictionaryReview(reverted,e.catalogStrokes),/published entry/)
    const reordered=structuredClone(published(e.glyph));reordered.paths=[reordered.paths[1],reordered.paths[0],...reordered.paths.slice(2)]
    assert.throws(()=>validateDictionaryReview(reordered,e.catalogStrokes),/published entry/)
  }
  for(const file of Object.keys(G2_GEOMETRY_BATCH1_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch1DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch1DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch1DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch1DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch1DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch1DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH1_STROKES.slice(1)),/published bundle/)
})
