import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES, G2_GEOMETRY_BATCH4_DICTIONARY_GEOMETRY, loadG2GeometryBatch4DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch4.ts'
import { buildG2GeometryBatch4DictionaryBundle, G2_GEOMETRY_BATCH4_DICTIONARY_PROOF_PINS, validateG2GeometryBatch4DictionaryProofs, validateG2GeometryBatch4DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch4.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch4-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
const distance = (p: number[], a: number[], b: number[]) => {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
const toPath = (p: number[], path: number[][]) => Math.min(...path.slice(1).map((v, k) => distance(p, path[k], v)))


const separation=(a:number[][],b:number[][]) => {
  const segment=(p:number[],q:number[],r:number[],s:number[])=>{
    const cross=(a:number[],b:number[],c:number[]) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
    if(cross(p,q,r)*cross(p,q,s)<0 && cross(r,s,p)*cross(r,s,q)<0)return 0
    return Math.min(distance(p,r,s),distance(q,r,s),distance(r,p,q),distance(s,p,q))
  }
  return Math.min(...a.slice(1).flatMap((q,i)=>b.slice(1).map((s,j)=>segment(a[i],q,b[j],s))))
}

test('three full reviews reconstruct 33 strokes from 30 licensed source strokes', () => {
  validateG2GeometryBatch4DictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['蔑',14,15],['茅',8,9],['范',8,9]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES.reduce((n,e)=>n+e.paths.length,0),33)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH4_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates=(corpus:'Ja'|'MM')=>originals.filter(e=>e.corpus===corpus).map(e=>({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES,candidates('Ja'),candidates('MM'))
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES,candidates('MM'),candidates('Ja')),/geometry mismatch/)
})

test('each whole-glyph review has separate first and third grass horizontals', () => {
  for(const g of ['蔑','茅','范']){
    const left=points(g,1),lv=points(g,2),right=points(g,3),rv=points(g,4)
    assert.ok(left.at(-1)![0]>left[0][0] && right.at(-1)![0]>right[0][0])
    assert.ok(right[0][0]-left.at(-1)![0]>5,g+' middle gap')
    assert.ok(lv.at(-1)![1]>lv[0][1] && rv.at(-1)![1]>rv[0][1])
    assert.ok(lv[0][1]<left[0][1] && lv.at(-1)![1]>left.at(-1)![1])
    assert.ok(rv[0][1]<right[0][1] && rv.at(-1)![1]>right.at(-1)![1])
  }
})
test('蔑 closes its enclosure and draws the outer sweep before the lower roof', () => {
  for(const [n,endpoint,target] of [[6,0,5],[7,0,6],[7,-1,9],[8,0,6],[8,-1,9],[9,0,5],[9,-1,6]]){
    assert.ok(toPath(points('蔑',n).at(endpoint)!,points('蔑',target))<0.2,'junction '+n+'/'+target)
  }
  const sweep=points('蔑',10),roof=points('蔑',11)
  assert.deepEqual(sweep[0],roof[0])
  assert.ok(sweep.at(-1)![0]<sweep[0][0] && sweep.at(-1)![1]>sweep[0][1])
  assert.ok(roof.at(-1)![0]>roof[0][0])
  const recipes=JSON.parse(read(dir+'proposals.json')) as Record<string,{derivedFromStroke:number}[]>
  assert.deepEqual(recipes['蔑'].slice(9,11).map(r=>r.derivedFromStroke),[10,9])
})
test('蔑 final dot contacts only the lower roof and crossing sweeps retain their directions', () => {
  const hook=points('蔑',13),sweep=points('蔑',14),dot=points('蔑',15)
  assert.ok(toPath(hook[0],points('蔑',9))<0.2)
  assert.ok(hook[1][1]>hook[0][1] && hook.at(-1)![1]<hook.at(-2)![1])
  assert.ok(sweep.slice(1).every((p,i)=>p[0]<sweep[i][0] && p[1]>sweep[i][1]))
  assert.ok(toPath(dot.at(-1)!,points('蔑',11))<0.2)
  assert.ok(separation(dot,points('蔑',9))>5)
  assert.ok(dot.at(-1)![0]>dot[0][0] && dot.at(-1)![1]>dot[0][1])
})
test('茅 keeps reviewed dot contacts, a straight central descent and a separate final sweep', () => {
  const angle=points('茅',5),dot=points('茅',6),roof=points('茅',7),hook=points('茅',8),sweep=points('茅',9)
  assert.ok(toPath(angle.at(-1)!,dot)<0.2)
  assert.ok(toPath(dot.at(-1)!,roof)<0.2)
  assert.ok(toPath(hook[0],roof)<0.2)
  assert.equal(hook[0][0],hook[1][0])
  assert.ok(hook[1][1]>hook[0][1] && hook.at(-1)![0]<hook.at(-2)![0])
  assert.ok(toPath(sweep[0],roof)<5)
  assert.ok(separation(sweep,hook)>5)
  assert.ok(sweep.at(-1)![0]<sweep[0][0] && sweep.at(-1)![1]>sweep[0][1])
})
test('范 keeps upward water movement and the distinct inner and outer hooks', () => {
  const rise=points('范',7),inner=points('范',8),outer=points('范',9)
  assert.ok(rise.at(-1)![0]>rise[0][0] && rise.at(-1)![1]<rise[0][1])
  assert.ok(rise.slice(1).every((p,i)=>p[1]<rise[i][1]))
  assert.deepEqual(inner[0],outer[0])
  assert.equal(inner[3][0],inner[4][0])
  assert.ok(inner[4][1]>inner[3][1])
  assert.ok(inner.at(-1)![0]<inner.at(-2)![0])
  assert.ok(outer.at(-1)![1]<outer.at(-2)![1])
})

test('source pen-lift gaps survive five-unit playback width', () => {
  for(const[g,a,b]of [
    ['蔑',1,3],['蔑',2,6],['蔑',4,6],['蔑',9,11],['蔑',12,10],['蔑',12,11],['蔑',14,10],['蔑',14,11],['蔑',15,9],
    ['茅',1,3],['茅',2,5],['茅',4,5],['茅',8,9],
    ['范',1,3],['范',4,8],['范',5,6],['范',5,7],['范',6,7],['范',7,9],
  ]as const){
    assert.ok(separation(points(g,a),points(g,b))>5,g+' separate strokes '+a+'/'+b)
  }
})
test('unreviewed originals, changed paths, proof bytes and source identity cannot silently regress', () => {
  for(const e of originals){
    const reverted=structuredClone(published(e.glyph));reverted.paths=e.paths
    assert.throws(()=>validateDictionaryReview(reverted,e.catalogStrokes),/published entry/)
    const reordered=structuredClone(published(e.glyph))
    reordered.paths=[reordered.paths[1],reordered.paths[0],...reordered.paths.slice(2)]
    assert.throws(()=>validateDictionaryReview(reordered,e.catalogStrokes),/published entry/)
  }
  for(const file of Object.keys(G2_GEOMETRY_BATCH4_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch4DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch4DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch4DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch4DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch4DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch4DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES.slice(1)),/published bundle/)
})
