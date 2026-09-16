import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH8_STROKES, G2_GEOMETRY_BATCH8_DICTIONARY_GEOMETRY, loadG2GeometryBatch8DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch8.ts'
import { buildG2GeometryBatch8DictionaryBundle, G2_GEOMETRY_BATCH8_DICTIONARY_PROOF_PINS, validateG2GeometryBatch8DictionaryProofs, validateG2GeometryBatch8DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch8.ts'
import { dictionaryGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch8-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH8_STROKES.find(e => e.glyph === glyph)!
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
  const result=Math.min(...a.slice(1).flatMap((q,i)=>b.slice(1).map((s,j)=>segment(a[i],q,b[j],s))))
  return result<1e-9?0:result
}

test('three full reviews reconstruct 34 strokes from 31 licensed source strokes', () => {
  validateG2GeometryBatch8DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['瑛',12,13],['暎',12,13],['芮',7,8]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH8_STROKES.reduce((n,e)=>n+e.paths.length,0),34)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH8_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates=(corpus:'Ja'|'MM')=>originals.filter(e=>e.corpus===corpus).map(e=>({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH8_STROKES,candidates('Ja'),candidates('MM'))
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH8_STROKES,candidates('MM'),candidates('Ja')),/geometry mismatch/)
})





test('all three whole-glyph sources use independent four-stroke grass boundaries', () => {
  for(const [g,start]of [['瑛',5],['暎',5],['芮',1]] as const){
    const a=points(g,start),b=points(g,start+1),c=points(g,start+2),d=points(g,start+3)
    assert.ok(a.at(-1)![0]>a[0][0] && c.at(-1)![0]>c[0][0])
    assert.ok(separation(a,c)>5)
    for(const [v,bar]of [[b,a],[d,c]]){
      assert.equal(v[0][0],v.at(-1)![0])
      assert.ok(v[0][1]<bar[0][1] && v.at(-1)![1]>bar.at(-1)![1])
      assert.equal(separation(v,bar),0)
    }
  }
})
test('瑛 jade horizontal-horizontal-vertical-rise preserves the observed contacts', () => {
  const one=points('瑛',1),two=points('瑛',2),three=points('瑛',3),four=points('瑛',4)
  for(const bar of [one,two])assert.ok(bar.at(-1)![0]>bar[0][0] && bar.at(-1)![1]===bar[0][1])
  assert.ok(one[0][1]<two[0][1])
  assert.equal(three[0][0],three.at(-1)![0]);assert.ok(three.at(-1)![1]>three[0][1])
  assert.ok(four.at(-1)![0]>four[0][0] && four.at(-1)![1]<four[0][1])
  for(const bar of [one,two,four])assert.ok(separation(three,bar)<=5)
  assert.ok(separation(one,points('瑛',5))<=5)
  assert.ok(separation(four,points('瑛',11))<=5)
})
test('暎 日 bars close both edges while remaining separate from 英', () => {
  const left=points('暎',1),roof=points('暎',2)
  assert.equal(left[0][0],left.at(-1)![0]);assert.ok(left.at(-1)![1]>left[0][1])
  assert.deepEqual(left[0],roof[0])
  assert.ok(roof[1][0]>roof[0][0] && roof[1][1]===roof[0][1])
  assert.equal(roof[1][0],roof[2][0]);assert.ok(roof[2][1]>roof[1][1])
  for(const n of [3,4]){
    const bar=points('暎',n)
    assert.ok(bar.at(-1)![0]>bar[0][0] && bar.at(-1)![1]===bar[0][1])
    assert.equal(separation(left,bar),0);assert.equal(separation(roof,bar),0)
  }
  for(const n of [5,11])assert.ok(separation(roof,points('暎',n))>5)
})
test('瑛 and 暎 央 closes its frame before the two separate descending sweeps', () => {
  for(const g of ['瑛','暎']){
    const left=points(g,9),roof=points(g,10),bar=points(g,11),sweep=points(g,12),right=points(g,13)
    assert.equal(left[0][0],left.at(-1)![0]);assert.ok(left.at(-1)![1]>left[0][1])
    assert.deepEqual(left[0],roof[0])
    assert.ok(roof[1][0]>roof[0][0] && roof[1][1]===roof[0][1])
    assert.equal(roof[1][0],roof[2][0]);assert.ok(roof[2][1]>roof[1][1])
    assert.equal(separation(left,bar),0);assert.equal(separation(roof,bar),0)
    assert.equal(separation(sweep,roof),0);assert.equal(separation(sweep,bar),0)
    for(const n of [6,8])assert.ok(separation(sweep,points(g,n))>5)
    for(let i=1;i<sweep.length;i++)assert.ok(sweep[i][0]<=sweep[i-1][0] && sweep[i][1]>sweep[i-1][1])
    for(let i=1;i<right.length;i++)assert.ok(right[i][0]>right[i-1][0] && right[i][1]>right[i-1][1])
    assert.ok(separation(sweep,right)>5);assert.ok(separation(bar,right)<=5)
  }
})
test('芮 inner left sweep starts inside; final stroke has a head above the roof and crosses it', () => {
  const left=points('芮',5),roof=points('芮',6),sweep=points('芮',7),last=points('芮',8)
  assert.deepEqual(left[0],roof[0])
  assert.equal(roof[1][1],roof[0][1]);assert.ok(roof[1][0]>roof[0][0])
  assert.ok(roof.at(-1)![0]<roof.at(-2)![0] && roof.at(-1)![1]===roof.at(-2)![1])
  assert.ok(sweep[0][1]>roof[0][1] && separation(sweep,roof)>5 && separation(sweep,left)>5)
  for(let i=1;i<sweep.length;i++)assert.ok(sweep[i][0]<sweep[i-1][0] && sweep[i][1]>sweep[i-1][1])
  assert.ok(last[1][0]>last[0][0] && last[1][1]===last[0][1] && last[0][1]<roof[0][1])
  assert.equal(last[2][0],last[1][0]);assert.ok(last[2][1]>last[1][1])
  for(let i=3;i<last.length;i++)assert.ok(last[i][0]>last[i-1][0] && last[i][1]>last[i-1][1])
  assert.equal(separation(last,roof),0);assert.ok(separation(last,sweep)<=5)
  assert.ok(separation(last,left)>5)
})
test('54 source contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["瑛",1,3,true],["瑛",2,3,true],["瑛",3,4,true],["瑛",1,5,true],["瑛",4,11,true],["瑛",5,6,true],["瑛",5,7,false],["瑛",7,8,true],["瑛",6,9,false],["瑛",6,10,false],["瑛",8,10,false],["瑛",6,12,false],["瑛",8,12,false],["瑛",9,10,true],["瑛",9,11,true],["瑛",10,11,true],["瑛",10,12,true],["瑛",11,12,true],["瑛",11,13,true],["瑛",12,13,false],["暎",1,2,true],["暎",1,3,true],["暎",2,3,true],["暎",1,4,true],["暎",2,4,true],["暎",2,5,false],["暎",2,11,false],["暎",5,6,true],["暎",5,7,false],["暎",7,8,true],["暎",6,9,false],["暎",8,10,false],["暎",6,12,false],["暎",8,12,false],["暎",9,10,true],["暎",9,11,true],["暎",10,11,true],["暎",10,12,true],["暎",11,12,true],["暎",11,13,true],["暎",12,13,false],["芮",1,2,true],["芮",1,3,false],["芮",3,4,true],["芮",2,6,false],["芮",4,6,false],["芮",2,8,false],["芮",4,8,false],["芮",5,6,true],["芮",5,7,false],["芮",6,7,false],["芮",6,8,true],["芮",7,8,true],["芮",5,8,false]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH8_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch8DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch8DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch8DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch8DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch8DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch8DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH8_STROKES.slice(1)),/published bundle/)
})
