import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH6_STROKES, G2_GEOMETRY_BATCH6_DICTIONARY_GEOMETRY, loadG2GeometryBatch6DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch6.ts'
import { buildG2GeometryBatch6DictionaryBundle, G2_GEOMETRY_BATCH6_DICTIONARY_PROOF_PINS, validateG2GeometryBatch6DictionaryProofs, validateG2GeometryBatch6DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch6.ts'
import { dictionaryGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch6-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH6_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 42 strokes from 39 licensed source strokes', () => {
  validateG2GeometryBatch6DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['蔘',14,15],['薛',16,17],['陝',9,10]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH6_STROKES.reduce((n,e)=>n+e.paths.length,0),42)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH6_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates=(corpus:'Ja'|'MM')=>originals.filter(e=>e.corpus===corpus).map(e=>({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH6_STROKES,candidates('Ja'),candidates('MM'))
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH6_STROKES,candidates('MM'),candidates('Ja')),/geometry mismatch/)
})



test('蔘 and 薛 retain the four independently reviewed grass strokes', () => {
  for(const g of ['蔘','薛']){
    const a=points(g,1),b=points(g,2),c=points(g,3),d=points(g,4)
    assert.ok(a.at(-1)![0]>a[0][0] && c.at(-1)![0]>c[0][0])
    assert.ok(separation(a,c)>5)
    for(const [v,bar]of [[b,a],[d,c]]){
      assert.equal(v[0][0],v.at(-1)![0])
      assert.ok(v[0][1]<bar[0][1] && v.at(-1)![1]>bar.at(-1)![1])
      assert.equal(separation(v,bar),0)
    }
  }
})
test('蔘 upper fold is broad, all folds descend left then rise right, and the final sweeps stay separate', () => {
  for(const n of [5,7,9]){
    const p=points('蔘',n)
    assert.ok(p[1][0]<p[0][0] && p[1][1]>p[0][1])
    assert.ok(p.at(-1)![0]>p.at(-2)![0] && p.at(-1)![1]<p.at(-2)![1])
  }
  const upper=points('蔘',5)
  assert.ok(upper.at(-1)![0]-Math.min(...upper.map(p=>p[0]))>35)
  for(const n of [11,13,14,15]){
    const p=points('蔘',n)
    for(let i=1;i<p.length;i++)assert.ok(p[i][0]<p[i-1][0] && p[i][1]>p[i-1][1])
  }
  const right=points('蔘',12)
  for(let i=1;i<right.length;i++)assert.ok(right[i][0]>right[i-1][0] && right[i][1]>right[i-1][1])
  for(const [a,b]of [[11,13],[12,13],[13,14],[14,15]])assert.ok(separation(points('蔘',a),points('蔘',b))>5)
})
test('薛 closes two boxes and its 辛 joins the observed bars and verticals', () => {
  const vertical=points('薛',6)
  assert.equal(vertical[0][0],vertical.at(-1)![0])
  for(const [roof,base]of [[7,8],[9,10]]){
    const p=points('薛',roof)
    assert.equal(p[0][1],p[1][1]);assert.equal(p[1][0],p[2][0])
    assert.ok(p[1][0]>p[0][0] && p[2][1]>p[1][1])
    assert.equal(separation(p,vertical),0)
    assert.equal(separation(points('薛',base),vertical),0)
    assert.equal(separation(points('薛',base),p),0)
  }
  assert.ok(separation(points('薛',5),vertical)>5)
  assert.equal(separation(points('薛',5),points('薛',7)),0)
  assert.equal(separation(points('薛',11),points('薛',12)),0)
  assert.ok(separation(points('薛',12),points('薛',13))>5)
  assert.equal(separation(points('薛',12),points('薛',14)),0)
  const last=points('薛',17)
  assert.equal(last[0][0],last.at(-1)![0])
  assert.equal(separation(last,points('薛',15)),0);assert.equal(separation(last,points('薛',16)),0)
})
test('陝 separates two 阜 strokes before its vertical and retains the returning hook', () => {
  const first=points('陝',1),second=points('陝',2),vertical=points('陝',3)
  assert.ok(first[1][0]>first[0][0] && first[1][1]<=first[0][1])
  assert.ok(first.at(-1)![0]<first[1][0] && first.at(-1)![1]>first[1][1])
  assert.deepEqual(first.at(-1),second[0])
  assert.ok(second[1][0]>second[0][0] && second[1][1]>second[0][1])
  assert.ok(second.at(-1)![0]<second.at(-2)![0] && second.at(-1)![1]<second.at(-2)![1])
  assert.equal(separation(first,vertical),0);assert.equal(separation(second,vertical),0)
  assert.equal(vertical[0][0],vertical.at(-1)![0])
})
test('陝 writes both inner 入 before the final central sweep pair', () => {
  for(const n of [5,7]){
    const p=points('陝',n)
    for(let i=1;i<p.length;i++)assert.ok(p[i][0]<p[i-1][0] && p[i][1]>p[i-1][1])
  }
  for(const n of [6,8]){
    const p=points('陝',n)
    assert.ok(p[1][0]>p[0][0] && p[1][1]<=p[0][1])
    assert.ok(p[2][0]<p[1][0] && p[2][1]>p[1][1])
    assert.ok(p.at(-1)![0]>p[2][0] && p.at(-1)![1]>p[2][1])
  }
  const central=points('陝',9),final=points('陝',10)
  assert.equal(central[0][0],central[1][0])
  assert.ok(central[0][1]<points('陝',4)[0][1])
  assert.ok(central.at(-1)![0]<central[0][0] && central.at(-1)![1]>points('陝',6).at(-1)![1])
  assert.ok(toPath(final[0],central)<0.2)
  for(let i=1;i<final.length;i++)assert.ok(final[i][0]>final[i-1][0] && final[i][1]>final[i-1][1])
  assert.ok(separation(points('陝',6),central)>5)
})
test('47 observed source contacts and pen-lift gaps survive the playback stroke width', () => {
  for(const[g,a,b,touching]of [["蔘",2,5,false],["蔘",4,6,false],["蔘",5,6,true],["蔘",5,7,false],["蔘",5,9,false],["蔘",7,8,true],["蔘",9,10,true],["蔘",8,11,true],["蔘",9,12,true],["蔘",11,12,true],["蔘",11,13,false],["蔘",12,13,false],["蔘",13,14,false],["蔘",14,15,false],["薛",2,5,false],["薛",5,6,false],["薛",5,7,true],["薛",6,7,true],["薛",6,8,true],["薛",7,8,true],["薛",6,9,true],["薛",6,10,true],["薛",9,10,true],["薛",4,11,false],["薛",11,12,true],["薛",12,13,false],["薛",12,14,true],["薛",13,15,true],["薛",14,15,true],["薛",15,17,true],["薛",16,17,true],["陝",1,2,true],["陝",1,3,true],["陝",2,3,true],["陝",2,5,true],["陝",5,6,true],["陝",7,8,true],["陝",4,5,false],["陝",4,6,false],["陝",4,7,false],["陝",4,8,false],["陝",4,9,true],["陝",5,9,false],["陝",6,9,false],["陝",7,9,false],["陝",8,9,false],["陝",9,10,true]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH6_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch6DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch6DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch6DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch6DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch6DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch6DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH6_STROKES.slice(1)),/published bundle/)
})
