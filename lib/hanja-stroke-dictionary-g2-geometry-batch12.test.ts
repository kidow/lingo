import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH12_STROKES, G2_GEOMETRY_BATCH12_DICTIONARY_GEOMETRY, loadG2GeometryBatch12DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch12.ts'
import { buildG2GeometryBatch12DictionaryBundle, G2_GEOMETRY_BATCH12_DICTIONARY_PROOF_PINS, validateG2GeometryBatch12DictionaryProofs, validateG2GeometryBatch12DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch12.ts'
import { dictionaryGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch12-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH12_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
const distance = (p: number[], a: number[], b: number[]) => {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
const toPath = (p: number[], path: number[][]) => {
  const result = Math.min(...path.slice(1).map((v, k) => distance(p, path[k], v)))
  return result < 1e-9 ? 0 : result
}


const separation=(a:number[][],b:number[][]) => {
  const segment=(p:number[],q:number[],r:number[],s:number[])=>{
    const cross=(a:number[],b:number[],c:number[]) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
    if(cross(p,q,r)*cross(p,q,s)<0 && cross(r,s,p)*cross(r,s,q)<0)return 0
    return Math.min(distance(p,r,s),distance(q,r,s),distance(r,p,q),distance(s,p,q))
  }
  const result=Math.min(...a.slice(1).flatMap((q,i)=>b.slice(1).map((s,j)=>segment(a[i],q,b[j],s))))
  return result<1e-9?0:result
}

test('three full reviews reconstruct 27 strokes from 24 licensed source strokes', () => {
  validateG2GeometryBatch12DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['陜',9,10],['邢',6,7],['祜',9,10]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH12_STROKES.reduce((n,e)=>n+e.paths.length,0),27)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH12_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates=(corpus:'Ja'|'MM')=>originals.filter(e=>e.corpus===corpus).map(e=>({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH12_STROKES,candidates('Ja'),candidates('MM'))
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH12_STROKES,candidates('MM'),candidates('Ja')),/geometry mismatch/)
})







test('both 阝 forms split their folded head from the hooked curve at a reviewed pen lift', () => {
  for (const [g, first, second, vertical] of [['陜',1,2,3],['邢',5,6,7]] as const) {
    const fold=points(g,first),curve=points(g,second),line=points(g,vertical)
    assert.equal(fold[0][1],fold[1][1]);assert.ok(fold[1][0]>fold[0][0])
    assert.ok(fold[2][0]<fold[1][0] && fold[2][1]>fold[1][1])
    assert.deepEqual(curve[0],fold.at(-1))
    assert.ok(curve[1][0]>curve[0][0] && curve[1][1]>curve[0][1])
    assert.ok(curve.at(-1)![0]<curve.at(-2)![0] && curve.at(-1)![1]<curve.at(-2)![1])
    assert.equal(line[0][0],line.at(-1)![0]);assert.ok(line.at(-1)![1]>line[0][1])
    assert.ok(separation(fold,line)<=5 && separation(curve,line)>5)
    const recipe=JSON.parse(read(dir+'proposals.json'))[g] as {derivedFromStroke:number}[]
    assert.equal(recipe[first-1].derivedFromStroke,recipe[second-1].derivedFromStroke)
  }
})
test('陜 writes both small 人 forms before the main 大 descending strokes', () => {
  const recipe=JSON.parse(read(dir+'proposals.json'))['陜'] as {derivedFromStroke:number}[]
  assert.deepEqual(recipe.slice(4).map(p=>p.derivedFromStroke),[6,7,8,9,4,5])
  for(const [left,right] of [[5,6],[7,8]]){
    const a=points('陜',left),b=points('陜',right)
    for(let i=1;i<a.length;i++)assert.ok(a[i][0]<a[i-1][0] && a[i][1]>a[i-1][1])
    for(let i=1;i<b.length;i++)assert.ok(b[i][0]>b[i-1][0] && b[i][1]>b[i-1][1])
    assert.ok(separation(a,b)<=5)
    for(const n of [9,10])assert.ok(separation(a,points('陜',n))>5 && separation(b,points('陜',n))>5)
  }
  const main=points('陜',9),last=points('陜',10)
  assert.equal(main[0][0],main[1][0]);assert.ok(main[1][1]>main[0][1])
  for(let i=2;i<main.length;i++)assert.ok(main[i][0]<main[i-1][0] && main[i][1]>main[i-1][1])
  for(let i=1;i<last.length;i++)assert.ok(last[i][0]>last[i-1][0] && last[i][1]>last[i-1][1])
  assert.equal(separation(main,points('陜',4)),0);assert.ok(separation(main,last)<=5)
})
test('邢 connects both descending strokes to its two horizontal bars', () => {
  for(const n of [1,2]){
    const bar=points('邢',n)
    assert.equal(bar[0][1],bar.at(-1)![1]);assert.ok(bar.at(-1)![0]>bar[0][0])
    for(const v of [3,4])assert.equal(separation(bar,points('邢',v)),0)
  }
  const left=points('邢',3),right=points('邢',4)
  assert.equal(left[0][0],left[1][0])
  for(let i=2;i<left.length;i++)assert.ok(left[i][0]<left[i-1][0] && left[i][1]>left[i-1][1])
  assert.equal(right[0][0],right.at(-1)![0]);assert.ok(right.at(-1)![1]>right[0][1])
})
test('祜 replaces the licensed 礻 with the separately reviewed five-stroke 示 form', () => {
  const recipe=JSON.parse(read(dir+'proposals.json'))['祜'] as {derivedFromStroke:number}[]
  assert.deepEqual(recipe.slice(0,5).map(p=>p.derivedFromStroke),[1,2,3,2,4])
  for(const n of [1,2]){
    const p=points('祜',n)
    assert.equal(p[0][1],p.at(-1)![1]);assert.ok(p.at(-1)![0]>p[0][0])
  }
  const center=points('祜',3),left=points('祜',4),right=points('祜',5)
  assert.equal(toPath(center[0],points('祜',2)),0)
  for(const p of [center,right]){assert.equal(p[0][0],p.at(-1)![0]);assert.ok(p.at(-1)![1]>p[0][1])}
  assert.equal(left[0][0],left[1][0]);assert.ok(left[1][1]>left[0][1])
  for(let i=2;i<left.length;i++)assert.ok(left[i][0]<left[i-1][0] && left[i][1]>left[i-1][1])
  for(const n of [1,2,3,5])assert.ok(separation(left,points('祜',n))>5)
  assert.ok(separation(right,center)>5 && separation(right,points('祜',2))>5)
})
test('祜 connects the 古 vertical to its box roof and closes both bottom corners', () => {
  const vertical=points('祜',7),left=points('祜',8),roof=points('祜',9),bottom=points('祜',10)
  assert.equal(vertical[0][0],vertical.at(-1)![0]);assert.ok(vertical.at(-1)![1]>vertical[0][1])
  assert.equal(separation(vertical,points('祜',6)),0);assert.ok(separation(vertical,roof)<=5)
  assert.equal(toPath(roof[0],left),0)
  assert.equal(roof[0][1],roof[1][1]);assert.ok(roof[1][0]>roof[0][0])
  assert.equal(roof[1][0],roof[2][0]);assert.ok(roof[2][1]>roof[1][1])
  assert.equal(bottom[0][1],bottom.at(-1)![1]);assert.ok(bottom.at(-1)![0]>bottom[0][0])
  assert.equal(separation(bottom,left),0);assert.equal(separation(bottom,roof),0)
})
test('all 111 stroke-pair contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["陜",1,2,true],["陜",1,3,true],["陜",1,4,false],["陜",1,5,false],["陜",1,6,false],["陜",1,7,false],["陜",1,8,false],["陜",1,9,false],["陜",1,10,false],["陜",2,3,false],["陜",2,4,false],["陜",2,5,false],["陜",2,6,false],["陜",2,7,false],["陜",2,8,false],["陜",2,9,false],["陜",2,10,false],["陜",3,4,false],["陜",3,5,false],["陜",3,6,false],["陜",3,7,false],["陜",3,8,false],["陜",3,9,false],["陜",3,10,false],["陜",4,5,false],["陜",4,6,false],["陜",4,7,false],["陜",4,8,false],["陜",4,9,true],["陜",4,10,false],["陜",5,6,true],["陜",5,7,false],["陜",5,8,false],["陜",5,9,false],["陜",5,10,false],["陜",6,7,false],["陜",6,8,false],["陜",6,9,false],["陜",6,10,false],["陜",7,8,true],["陜",7,9,false],["陜",7,10,false],["陜",8,9,false],["陜",8,10,false],["陜",9,10,true],["邢",1,2,false],["邢",1,3,true],["邢",1,4,true],["邢",1,5,false],["邢",1,6,false],["邢",1,7,false],["邢",2,3,true],["邢",2,4,true],["邢",2,5,false],["邢",2,6,false],["邢",2,7,false],["邢",3,4,false],["邢",3,5,false],["邢",3,6,false],["邢",3,7,false],["邢",4,5,false],["邢",4,6,false],["邢",4,7,false],["邢",5,6,true],["邢",5,7,true],["邢",6,7,false],["祜",1,2,false],["祜",1,3,false],["祜",1,4,false],["祜",1,5,false],["祜",1,6,false],["祜",1,7,false],["祜",1,8,false],["祜",1,9,false],["祜",1,10,false],["祜",2,3,true],["祜",2,4,false],["祜",2,5,false],["祜",2,6,false],["祜",2,7,false],["祜",2,8,false],["祜",2,9,false],["祜",2,10,false],["祜",3,4,false],["祜",3,5,false],["祜",3,6,false],["祜",3,7,false],["祜",3,8,false],["祜",3,9,false],["祜",3,10,false],["祜",4,5,false],["祜",4,6,false],["祜",4,7,false],["祜",4,8,false],["祜",4,9,false],["祜",4,10,false],["祜",5,6,false],["祜",5,7,false],["祜",5,8,false],["祜",5,9,false],["祜",5,10,false],["祜",6,7,true],["祜",6,8,false],["祜",6,9,false],["祜",6,10,false],["祜",7,8,false],["祜",7,9,true],["祜",7,10,false],["祜",8,9,true],["祜",8,10,true],["祜",9,10,true]] as const){
    const gap=separation(points(g,a),points(g,b))
    assert.ok(touching?gap<=5:gap>5,g+' '+a+'/'+b+' gap '+gap)
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH12_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch12DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch12DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch12DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch12DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch12DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch12DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH12_STROKES.slice(1)),/published bundle/)
})
