import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH2_STROKES, G2_GEOMETRY_BATCH2_DICTIONARY_GEOMETRY, loadG2GeometryBatch2DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch2.ts'
import { buildG2GeometryBatch2DictionaryBundle, G2_GEOMETRY_BATCH2_DICTIONARY_PROOF_PINS, validateG2GeometryBatch2DictionaryProofs, validateG2GeometryBatch2DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch2.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch2-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH2_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
const distance = (p: number[], a: number[], b: number[]) => {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
const toPath = (p: number[], path: number[][]) => Math.min(...path.slice(1).map((v, k) => distance(p, path[k], v)))

test('three complete reviews reconstruct 47 strokes from 44 licensed source strokes', () => {
  validateG2GeometryBatch2DictionaryBundle()
  assert.deepEqual(originals.map(e => [e.glyph,e.strokes,e.catalogStrokes]), [['董',12,13],['藤',18,19],['鄧',14,15]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH2_STROKES.reduce((n,e) => n+e.paths.length,0),47)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size,HANJA_STROKES.length)
  for (const e of originals) {
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH2_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates=originals.map(e=>({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH2_STROKES,[],candidates)
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH2_STROKES,candidates,[]),/geometry mismatch/)
})
test('董 and 藤 retain individually reviewed four-stroke tops with a visible middle gap', () => {
  for(const g of ['董','藤']){
    const left=points(g,1),lv=points(g,2),right=points(g,3),rv=points(g,4)
    assert.ok(left.at(-1)![0]>left[0][0] && right.at(-1)![0]>right[0][0])
    assert.ok(right[0][0]-left.at(-1)![0]>5,g+' gap at five-unit playback width')
    assert.ok(lv.at(-1)![1]>lv[0][1] && rv.at(-1)![1]>rv[0][1])
    assert.ok(lv[0][1]<left[0][1] && lv.at(-1)![1]>left.at(-1)![1])
    assert.ok(rv[0][1]<right[0][1] && rv.at(-1)![1]>right.at(-1)![1])
  }
})
test('reviewed enclosed bars attach to both sides', () => {
  for(const[g,n,l,r]of [['董',9,7,8],['董',10,7,8],['藤',7,5,6],['藤',8,5,6],['鄧',9,7,8]] as const){
    const p=points(g,n)
    assert.ok(toPath(p[0],points(g,l))<0.2,g+' left endpoint '+n)
    assert.ok(toPath(p.at(-1)!,points(g,r))<0.2,g+' right endpoint '+n)
    assert.ok(p.at(-1)![0]>p[0][0],g+' horizontal direction '+n)
  }
})
test('董 lower horizontal precedes the long vertical and the vertical joins top and baseline', () => {
  const horizontal=points('董',11),vertical=points('董',12),source=originals.find(e=>e.glyph==='董')!
  assert.equal(published('董').paths[10],source.paths[10])
  assert.equal(published('董').sourceStrokeIndices[10],11)
  assert.equal(published('董').sourceStrokeIndices[11],null)
  assert.ok(horizontal.at(-1)![0]>horizontal[0][0])
  assert.ok(vertical.at(-1)![1]>vertical[0][1] && vertical.every(p=>p[0]===vertical[0][0]))
  assert.ok(toPath(vertical[0],points('董',5))<0.2)
  assert.ok(toPath(vertical.at(-1)!,points('董',13))<0.2)
})
test('藤 upper short strokes and lower branch follow the dictionary directions and junction', () => {
  const left=points('藤',9),right=points('藤',10),branch=points('藤',14)
  assert.ok(left.at(-1)![0]<left[0][0] && left.at(-1)![1]>left[0][1])
  assert.ok(right.at(-1)![0]>right[0][0] && right.at(-1)![1]>right[0][1])
  assert.ok(toPath(branch[0],points('藤',13))<0.3)
  assert.ok(toPath(branch[0],points('藤',11))<0.3)
  assert.ok(branch.at(-1)![0]>branch[0][0] && branch.at(-1)![1]>branch[0][1])
})
test('鄧 ear has two separately reviewed curved strokes before its final vertical', () => {
  const upper=points('鄧',13),lower=points('鄧',14),vertical=points('鄧',15)
  assert.deepEqual(upper.at(-1),lower[0])
  assert.ok(upper.some(p=>p[0]>upper.at(-1)![0]) && upper.at(-1)![1]>upper[0][1])
  assert.ok(lower.some(p=>p[0]>lower.at(-1)![0]) && lower.at(-1)![1]>lower[0][1])
  assert.ok(toPath(upper[0],vertical)<0.01)
  assert.ok(vertical.at(-1)![1]>vertical[0][1])
  assert.deepEqual(published('鄧').sourceStrokeIndices.slice(-3),[null,null,14])
})
const separation=(a:number[][],b:number[][]) => {
  const segment=(p:number[],q:number[],r:number[],s:number[])=>{
    const cross=(a:number[],b:number[],c:number[]) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
    if(cross(p,q,r)*cross(p,q,s)<0 && cross(r,s,p)*cross(r,s,q)<0)return 0
    return Math.min(distance(p,r,s),distance(q,r,s),distance(r,p,q),distance(s,p,q))
  }
  return Math.min(...a.slice(1).flatMap((q,i)=>b.slice(1).map((s,j)=>segment(a[i],q,b[j],s))))
}
test('reviewed pen-lift gaps remain distinct at five-unit playback width', () => {
  for(const[g,a,b]of [
    ['董',5,2],['董',5,4],['董',5,6],
    ['藤',12,6],['藤',13,4],['藤',13,6],['藤',16,13],['藤',16,17],['藤',17,15],['藤',18,14],['藤',18,19],
    ['鄧',1,2],['鄧',1,5],['鄧',6,1],['鄧',6,5],['鄧',11,9],
  ] as const)assert.ok(separation(points(g,a),points(g,b))>5,g+' separate strokes '+a+'/'+b)
})
test('unreviewed originals, changed paths, proof bytes and source identity cannot silently regress', () => {
  for(const e of originals){
    const reverted=structuredClone(published(e.glyph));reverted.paths=e.paths
    assert.throws(()=>validateDictionaryReview(reverted,e.catalogStrokes),/published entry/)
    const reordered=structuredClone(published(e.glyph))
    reordered.paths=[reordered.paths[1],reordered.paths[0],...reordered.paths.slice(2)]
    assert.throws(()=>validateDictionaryReview(reordered,e.catalogStrokes),/published entry/)
  }
  for(const file of Object.keys(G2_GEOMETRY_BATCH2_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch2DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch2DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch2DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch2DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch2DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch2DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH2_STROKES.slice(1)),/published bundle/)
})
