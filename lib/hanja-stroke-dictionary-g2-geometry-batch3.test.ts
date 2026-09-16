import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH3_STROKES, G2_GEOMETRY_BATCH3_DICTIONARY_GEOMETRY, loadG2GeometryBatch3DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch3.ts'
import { buildG2GeometryBatch3DictionaryBundle, G2_GEOMETRY_BATCH3_DICTIONARY_PROOF_PINS, validateG2GeometryBatch3DictionaryProofs, validateG2GeometryBatch3DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch3.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch3-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH3_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
const distance = (p: number[], a: number[], b: number[]) => {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
const toPath = (p: number[], path: number[][]) => Math.min(...path.slice(1).map((v, k) => distance(p, path[k], v)))


test('three full reviews reconstruct 51 strokes from 48 licensed source strokes', () => {
  validateG2GeometryBatch3DictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['礪',19,20],['遼',15,16],['膜',14,15]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH3_STROKES.reduce((n,e)=>n+e.paths.length,0),51)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH3_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates=(corpus:'Ja'|'MM')=>originals.filter(e=>e.corpus===corpus).map(e=>({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH3_STROKES,candidates('Ja'),candidates('MM'))
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH3_STROKES,candidates('MM'),candidates('Ja')),/geometry mismatch/)
})
test('礪 and 膜 preserve individually reviewed four-stroke grass boundaries', () => {
  for(const[g,n]of [['礪',8],['膜',5]]as const){
    const left=points(g,n),lv=points(g,n+1),right=points(g,n+2),rv=points(g,n+3)
    assert.ok(left.at(-1)![0]>left[0][0] && right.at(-1)![0]>right[0][0])
    assert.ok(right[0][0]-left.at(-1)![0]>5,g+' middle gap')
    assert.ok(lv.at(-1)![1]>lv[0][1] && rv.at(-1)![1]>rv[0][1])
    assert.ok(lv[0][1]<left[0][1] && lv.at(-1)![1]>left.at(-1)![1])
    assert.ok(rv[0][1]<right[0][1] && rv.at(-1)![1]>right.at(-1)![1])
  }
})
test('reviewed inner bars close their enclosures on both sides', () => {
  for(const[g,n,l,r]of [
    ['礪',5,3,4],['礪',14,12,13],['礪',15,12,13],['遼',8,6,7],['遼',9,6,7],
    ['膜',3,1,2],['膜',4,1,2],['膜',11,9,10],['膜',12,9,10],
  ]as const){
    const p=points(g,n)
    assert.ok(toPath(p[0],points(g,l))<0.2,g+' left endpoint '+n)
    assert.ok(toPath(p.at(-1)!,points(g,r))<0.2,g+' right endpoint '+n)
    assert.ok(p.at(-1)![0]>p[0][0],g+' horizontal direction '+n)
  }
})
test('礪 internal vertical meets the top roof and lower rising stroke', () => {
  const vertical=points('礪',18),rise=points('礪',19),dot=points('礪',20)
  assert.ok(toPath(vertical[0],points('礪',13))<0.2)
  assert.ok(toPath(vertical.at(-1)!,rise)<0.2)
  assert.ok(vertical.at(-1)![1]>vertical[0][1] && Math.abs(vertical.at(-1)![0]-vertical[0][0])<0.2)
  assert.ok(rise.at(-1)![0]>rise[0][0] && rise.at(-1)![1]<rise[0][1])
  assert.ok(dot.at(-1)![0]>dot[0][0] && dot.at(-1)![1]>dot[0][1])
})
test('遼 has two separate dots and the final sweep enters upward through the previous endpoint', () => {
  const first=points('遼',13),second=points('遼',14),angle=points('遼',15),sweep=points('遼',16)
  for(const dot of [first,second])assert.ok(dot.at(-1)![0]>dot[0][0] && dot.at(-1)![1]>dot[0][1])
  assert.ok(second[0][1]-first.at(-1)![1]>5)
  assert.deepEqual(published('遼').sourceStrokeIndices.slice(12,16),[13,null,null,null])
  assert.equal(angle.at(-1)![0],angle.at(-2)![0])
  assert.ok(angle.at(-1)![1]>angle.at(-2)![1])
  assert.deepEqual(angle.at(-1),sweep[1])
  assert.ok(sweep[1][0]>sweep[0][0] && sweep[1][1]<sweep[0][1])
  assert.ok(sweep[2][0]>sweep[1][0] && sweep[2][1]>sweep[1][1])
})
test('reviewed roofs and branches begin or end at the source junctions', () => {
  for(const[g,n,which,target]of [
    ['礪',6,'first',7],['礪',17,'first',16],['遼',3,'first',1],['遼',5,'last',3],['遼',10,'first',9],
    ['膜',2,'first',1],['膜',10,'first',9],['膜',14,'first',12],['膜',15,'first',13],
  ]as const){
    const p=points(g,n)
    assert.ok(toPath(which==='first'?p[0]:p.at(-1)!,points(g,target))<0.2,g+' junction '+n+'/'+target)
  }
  assert.ok(toPath(points('遼',7)[5],points('遼',3))<0.01,'upper-right enclosure corner touches sweep')
})
const separation=(a:number[][],b:number[][]) => {
  const segment=(p:number[],q:number[],r:number[],s:number[])=>{
    const cross=(a:number[],b:number[],c:number[]) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
    if(cross(p,q,r)*cross(p,q,s)<0 && cross(r,s,p)*cross(r,s,q)<0)return 0
    return Math.min(distance(p,r,s),distance(q,r,s),distance(r,p,q),distance(s,p,q))
  }
  return Math.min(...a.slice(1).flatMap((q,i)=>b.slice(1).map((s,j)=>segment(a[i],q,b[j],s))))
}

test('source pen-lift gaps survive five-unit playback width', () => {
  for(const[g,a,b]of [
    ['礪',5,7],['礪',8,7],['礪',9,6],['礪',9,13],['礪',11,6],['礪',11,13],['礪',15,17],['礪',19,16],['礪',20,17],
    ['遼',5,1],['遼',12,7],['遼',13,14],['遼',14,15],['膜',5,2],['膜',8,10],['膜',13,2],
  ]as const)assert.ok(separation(points(g,a),points(g,b))>5,g+' separate strokes '+a+'/'+b)
})
test('unreviewed originals, changed paths, proof bytes and source identity cannot silently regress', () => {
  for(const e of originals){
    const reverted=structuredClone(published(e.glyph));reverted.paths=e.paths
    assert.throws(()=>validateDictionaryReview(reverted,e.catalogStrokes),/published entry/)
    const reordered=structuredClone(published(e.glyph))
    reordered.paths=[reordered.paths[1],reordered.paths[0],...reordered.paths.slice(2)]
    assert.throws(()=>validateDictionaryReview(reordered,e.catalogStrokes),/published entry/)
  }
  for(const file of Object.keys(G2_GEOMETRY_BATCH3_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch3DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch3DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch3DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch3DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch3DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch3DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH3_STROKES.slice(1)),/published bundle/)
})
