import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH11_STROKES, G2_GEOMETRY_BATCH11_DICTIONARY_GEOMETRY, loadG2GeometryBatch11DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch11.ts'
import { buildG2GeometryBatch11DictionaryBundle, G2_GEOMETRY_BATCH11_DICTIONARY_PROOF_PINS, validateG2GeometryBatch11DictionaryProofs, validateG2GeometryBatch11DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch11.ts'
import { dictionaryGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch11-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH11_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 55 strokes from 52 licensed source strokes', () => {
  validateG2GeometryBatch11DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['鑽',26,27],['蔡',14,15],['葡',12,13]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH11_STROKES.reduce((n,e)=>n+e.paths.length,0),55)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH11_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates=(corpus:'Ja'|'MM')=>originals.filter(e=>e.corpus===corpus).map(e=>({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH11_STROKES,candidates('Ja'),candidates('MM'))
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH11_STROKES,candidates('MM'),candidates('Ja')),/geometry mismatch/)
})






test('蔡 and 葡 use independently reviewed four-stroke grass boundaries', () => {
  for(const g of ['蔡','葡']){
    const a=points(g,1),b=points(g,2),c=points(g,3),d=points(g,4)
    assert.ok(a.at(-1)![0]>a[0][0] && c.at(-1)![0]>c[0][0])
    assert.ok(separation(a,c)>5)
    for(const[v,bar]of [[b,a],[d,c]]){
      assert.equal(v[0][0],v.at(-1)![0])
      assert.ok(v[0][1]<bar[0][1] && v.at(-1)![1]>bar.at(-1)![1])
      assert.equal(separation(v,bar),0)
    }
  }
})
test('鑽 separates the second 先 vertical from its curved leg and places the lower bar between them', () => {
  const recipe=JSON.parse(read(dir+'proposals.json'))['鑽'] as {derivedFromStroke:number}[]
  assert.equal(recipe[16].derivedFromStroke,19)
  assert.equal(recipe[17].derivedFromStroke,17)
  assert.equal(recipe[18].derivedFromStroke,18)
  assert.equal(recipe[19].derivedFromStroke,19)
  const vertical=points('鑽',17),bar=points('鑽',18),left=points('鑽',19),right=points('鑽',20)
  assert.equal(vertical[0][0],vertical.at(-1)![0])
  assert.ok(vertical.at(-1)![1]>vertical[0][1])
  assert.equal(separation(vertical,bar),0)
  assert.equal(toPath(left[0],bar),0);assert.equal(toPath(right[0],bar),0)
  for(let i=1;i<left.length;i++)assert.ok(left[i][0]<left[i-1][0] && left[i][1]>left[i-1][1])
  assert.equal(right[0][0],right[1][0]);assert.ok(right[1][1]>right[0][1])
  assert.equal(right.at(-3)![1],right.at(-2)![1]);assert.ok(right.at(-2)![0]>right.at(-3)![0])
  assert.equal(right.at(-2)![0],right.at(-1)![0]);assert.ok(right.at(-1)![1]<right.at(-2)![1])
  assert.ok(separation(vertical,left)>5 && separation(vertical,right)>5)
  const firstFold=points('鑽',14)
  assert.equal(firstFold[0][0],firstFold[1][0])
  assert.ok(firstFold[1][1]>firstFold[0][1] && firstFold[2][0]>firstFold[1][0] && firstFold[2][1]<firstFold[1][1])
})
test('鑽 closes all three 貝 bars and leaves both final strokes detached below', () => {
  const left=points('鑽',21),roof=points('鑽',22)
  assert.deepEqual(left[0],roof[0]);assert.equal(left[0][0],left.at(-1)![0])
  assert.ok(roof[1][0]>roof[0][0] && roof[1][1]===roof[0][1])
  assert.equal(roof[1][0],roof[2][0]);assert.ok(roof[2][1]>roof[1][1])
  for(const n of [23,24,25]){
    const p=points('鑽',n)
    assert.equal(p[0][1],p.at(-1)![1]);assert.ok(p.at(-1)![0]>p[0][0])
    assert.equal(separation(p,left),0);assert.equal(separation(p,roof),0)
  }
  for(const[n,side]of [[26,-1],[27,1]]){
    const p=points('鑽',n)
    for(let i=1;i<p.length;i++)assert.ok(side*(p[i][0]-p[i-1][0])>0 && p[i][1]>p[i-1][1])
    assert.ok(separation(p,points('鑽',25))>5)
  }
})
test('蔡 keeps both inner dots on the curved leg and the 示 hook and side strokes distinct', () => {
  const first=points('蔡',5),leg=points('蔡',6)
  for(const n of [7,8]){
    const p=points('蔡',n)
    for(let i=1;i<p.length;i++)assert.ok(p[i][0]>p[i-1][0] && p[i][1]>p[i-1][1])
    assert.ok(separation(p,leg)<=5 && separation(p,first)>5)
  }
  const fold=points('蔡',9),sweep=points('蔡',10),hook=points('蔡',13)
  assert.ok(fold[1][0]>fold[0][0] && fold[1][1]===fold[0][1])
  for(let i=2;i<fold.length;i++)assert.ok(fold[i][0]<fold[i-1][0] && fold[i][1]>fold[i-1][1])
  assert.ok(separation(fold,sweep)<=5)
  assert.equal(toPath(hook[0],points('蔡',12)),0)
  assert.equal(hook[0][0],hook[1][0]);assert.ok(hook[1][1]>hook[0][1])
  assert.ok(hook.at(-1)![0]<hook.at(-2)![0] && hook.at(-1)![1]===hook.at(-2)![1])
  for(const n of [14,15])assert.ok(separation(hook,points('蔡',n))>5)
})
test('葡 closes its inner bars before the long vertical and ends with a dot touching the upper bar', () => {
  const roof=points('葡',6),inner=points('葡',9),vertical=points('葡',12),dot=points('葡',13)
  for(const fold of [roof,inner]){
    assert.ok(fold[1][0]>fold[0][0] && fold[1][1]===fold[0][1])
    assert.equal(fold[1][0],fold[2][0]);assert.ok(fold[2][1]>fold[1][1])
    assert.ok(fold.at(-1)![0]<fold.at(-2)![0])
  }
  assert.equal(vertical[0][0],vertical.at(-1)![0]);assert.ok(vertical.at(-1)![1]>vertical[0][1])
  for(const n of [7,9,10,11])assert.equal(separation(vertical,points('葡',n)),0)
  for(const n of [10,11]){assert.equal(separation(points('葡',n),points('葡',8)),0);assert.equal(separation(points('葡',n),inner),0)}
  for(let i=1;i<dot.length;i++)assert.ok(dot[i][0]>dot[i-1][0] && dot[i][1]>dot[i-1][1])
  assert.ok(separation(dot,points('葡',7))<=5)
  assert.ok(separation(dot,roof)>5 && separation(dot,vertical)>5)
})
test('101 source contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["鑽",1,2,true],["鑽",1,3,true],["鑽",2,3,false],["鑽",3,4,false],["鑽",3,5,true],["鑽",4,5,true],["鑽",4,6,false],["鑽",4,7,false],["鑽",5,6,false],["鑽",5,7,true],["鑽",5,8,true],["鑽",6,8,false],["鑽",7,8,false],["鑽",2,9,false],["鑽",9,10,true],["鑽",10,11,true],["鑽",9,12,false],["鑽",11,12,true],["鑽",12,13,true],["鑽",12,14,true],["鑽",13,14,false],["鑽",14,19,false],["鑽",14,21,false],["鑽",15,16,true],["鑽",16,17,true],["鑽",15,18,false],["鑽",17,18,true],["鑽",18,19,true],["鑽",18,20,true],["鑽",19,20,false],["鑽",19,22,false],["鑽",20,22,false],["鑽",21,22,true],["鑽",21,23,true],["鑽",21,24,true],["鑽",21,25,true],["鑽",22,23,true],["鑽",22,24,true],["鑽",22,25,true],["鑽",23,24,false],["鑽",24,25,false],["鑽",25,26,false],["鑽",25,27,false],["鑽",26,27,false],["鑽",4,13,false],["鑽",11,13,false],["鑽",11,14,false],["鑽",12,18,false],["鑽",17,19,false],["鑽",17,20,false],["蔡",1,2,true],["蔡",1,3,false],["蔡",3,4,true],["蔡",2,5,false],["蔡",4,9,false],["蔡",5,6,true],["蔡",5,7,false],["蔡",5,8,false],["蔡",6,7,true],["蔡",6,8,true],["蔡",7,8,false],["蔡",6,9,false],["蔡",9,10,true],["蔡",6,11,false],["蔡",10,11,false],["蔡",11,12,false],["蔡",6,12,false],["蔡",10,12,false],["蔡",12,13,true],["蔡",12,14,false],["蔡",12,15,false],["蔡",13,14,false],["蔡",13,15,false],["蔡",14,15,false],["葡",1,2,true],["葡",1,3,false],["葡",3,4,true],["葡",2,5,false],["葡",4,6,false],["葡",5,6,true],["葡",5,7,false],["葡",6,7,false],["葡",6,9,false],["葡",7,8,false],["葡",7,9,false],["葡",8,9,true],["葡",8,10,true],["葡",8,11,true],["葡",9,10,true],["葡",9,11,true],["葡",10,11,false],["葡",6,12,false],["葡",7,12,true],["葡",9,12,true],["葡",10,12,true],["葡",11,12,true],["葡",8,12,false],["葡",9,13,false],["葡",6,13,false],["葡",7,13,true],["葡",12,13,false]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH11_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch11DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch11DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch11DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch11DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch11DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch11DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH11_STROKES.slice(1)),/published bundle/)
})
