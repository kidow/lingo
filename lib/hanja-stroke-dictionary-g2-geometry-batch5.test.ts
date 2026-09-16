import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH5_STROKES, G2_GEOMETRY_BATCH5_DICTIONARY_GEOMETRY, loadG2GeometryBatch5DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch5.ts'
import { buildG2GeometryBatch5DictionaryBundle, G2_GEOMETRY_BATCH5_DICTIONARY_PROOF_PINS, validateG2GeometryBatch5DictionaryProofs, validateG2GeometryBatch5DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch5.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch5-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH5_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 40 strokes from 37 licensed source strokes', () => {
  validateG2GeometryBatch5DictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['縫',16,17],['蓬',14,15],['芬',7,8]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH5_STROKES.reduce((n,e)=>n+e.paths.length,0),40)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH5_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates=(corpus:'Ja'|'MM')=>originals.filter(e=>e.corpus===corpus).map(e=>({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH5_STROKES,candidates('Ja'),candidates('MM'))
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH5_STROKES,candidates('MM'),candidates('Ja')),/geometry mismatch/)
})


test('縫 uses the Korean thread-side form with its reviewed gaps and contacts', () => {
  const first=points('縫',1),second=points('縫',2),vertical=points('縫',4),left=points('縫',5),dot=points('縫',6)
  assert.ok(first[1][0]<first[0][0] && first[1][1]>first[0][1])
  assert.ok(first[2][0]<first[1][0] && first[2][1]<first[1][1])
  assert.ok(first[3][0]>first[2][0] && first[3][1]>first[2][1])
  assert.ok(separation(first,second)>5)
  assert.ok(toPath(second.at(-1)!,points('縫',3))<1)
  assert.ok(toPath(vertical[0],second)<0.2)
  assert.equal(vertical[0][0],vertical.at(-1)![0])
  assert.ok(vertical.at(-1)![1]-vertical[0][1]>30)
  assert.ok(left.at(-1)![0]<left[0][0] && left.at(-1)![1]>left[0][1])
  assert.ok(dot.at(-1)![0]>dot[0][0] && dot.at(-1)![1]>dot[0][1])
})
test('蓬 and 芬 preserve individually reviewed four-stroke grass boundaries', () => {
  for(const g of ['蓬','芬']){
    const left=points(g,1),lv=points(g,2),right=points(g,3),rv=points(g,4)
    assert.ok(left.at(-1)![0]>left[0][0] && right.at(-1)![0]>right[0][0])
    assert.ok(right[0][0]-left.at(-1)![0]>5,g+' middle gap')
    assert.ok(lv.at(-1)![1]>lv[0][1] && rv.at(-1)![1]>rv[0][1])
    assert.ok(lv[0][1]<left[0][1] && lv.at(-1)![1]>left.at(-1)![1])
    assert.ok(rv[0][1]<right[0][1] && rv.at(-1)![1]>right.at(-1)![1])
  }
})
test('縫 and 蓬 join the upper crossing while the central vertical stays separate', () => {
  for(const[g,oblique,roof,sweep,vertical,bars,final]of [
    ['縫',7,8,9,13,[10,11,12],17],['蓬',5,6,7,11,[8,9,10],15],
  ]as const){
    assert.ok(toPath(points(g,roof)[0],points(g,oblique))<0.2)
    assert.deepEqual(points(g,roof)[0],points(g,sweep)[0])
    assert.ok(separation(points(g,vertical),points(g,roof))>5)
    assert.ok(separation(points(g,vertical),points(g,sweep))>5)
    assert.ok(separation(points(g,vertical),points(g,final))>5)
    for(const bar of bars)assert.ok(separation(points(g,vertical),points(g,bar))<0.2)
  }
})
test('both book-walk forms have two separate dots and an upward final entry', () => {
  for(const[g,dot1,dot2,angle,final]of [['縫',14,15,16,17],['蓬',12,13,14,15]]as const){
    for(const n of [dot1,dot2]){
      const dot=points(g,n)
      assert.ok(dot.at(-1)![0]>dot[0][0] && dot.at(-1)![1]>dot[0][1])
    }
    assert.ok(separation(points(g,dot1),points(g,dot2))>5)
    const bent=points(g,angle),sweep=points(g,final)
    assert.equal(bent.at(-1)![0],bent.at(-2)![0])
    assert.ok(bent.at(-1)![1]>bent.at(-2)![1])
    assert.deepEqual(bent.at(-1),sweep[1])
    assert.ok(sweep[1][0]>sweep[0][0] && sweep[1][1]<sweep[0][1])
    assert.ok(sweep[2][0]>sweep[1][0] && sweep[2][1]>sweep[1][1])
    assert.ok(sweep.at(-1)![0]>sweep.at(-2)![0] && sweep.at(-1)![1]<sweep.at(-2)![1])
  }
})
test('芬 right sweep begins with a horizontal and its blade meets both source junctions', () => {
  const right=points('芬',6),blade=points('芬',7),last=points('芬',8)
  assert.equal(right[0][1],right[1][1])
  assert.ok(right[1][0]-right[0][0]>8)
  assert.ok(right[2][0]>right[1][0] && right[2][1]>right[1][1])
  assert.ok(toPath(blade[0],points('芬',5))<0.2)
  assert.ok(toPath(last[0],blade)<0.2)
  assert.ok(blade.at(-1)![0]<blade.at(-2)![0] && blade.at(-1)![1]===blade.at(-2)![1])
  assert.ok(last.at(-1)![0]<last[0][0] && last.at(-1)![1]>last[0][1])
})
test('reviewed pen-lift gaps survive five-unit playback width', () => {
  for(const[g,a,b]of [["縫",1,2],["縫",2,14],["縫",3,15],["縫",3,16],["縫",2,16],["縫",4,5],["縫",4,6],["縫",6,16],["縫",6,17],["縫",13,17],["縫",14,15],["縫",15,16],["縫",8,15],["縫",13,8],["縫",13,9],["縫",9,10],["縫",10,11],["縫",11,12],["蓬",1,3],["蓬",2,5],["蓬",4,6],["蓬",1,12],["蓬",12,13],["蓬",13,14],["蓬",5,12],["蓬",6,13],["蓬",6,11],["蓬",7,11],["蓬",11,15],["蓬",6,8],["蓬",7,8],["蓬",8,9],["蓬",9,10],["芬",1,3],["芬",2,5],["芬",4,6],["芬",5,6],["芬",6,7]] as const)
    assert.ok(separation(points(g,a),points(g,b))>5,g+' separate strokes '+a+'/'+b)
})
test('unreviewed originals, changed paths, proof bytes and source identity cannot silently regress', () => {
  for(const e of originals){
    const reverted=structuredClone(published(e.glyph));reverted.paths=e.paths
    assert.throws(()=>validateDictionaryReview(reverted,e.catalogStrokes),/published entry/)
    const reordered=structuredClone(published(e.glyph))
    reordered.paths=[reordered.paths[1],reordered.paths[0],...reordered.paths.slice(2)]
    assert.throws(()=>validateDictionaryReview(reordered,e.catalogStrokes),/published entry/)
  }
  for(const file of Object.keys(G2_GEOMETRY_BATCH5_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch5DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch5DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch5DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch5DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch5DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch5DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH5_STROKES.slice(1)),/published bundle/)
})
