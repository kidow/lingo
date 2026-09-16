import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES, G2_GEOMETRY_BATCH15_DICTIONARY_GEOMETRY, loadG2GeometryBatch15DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch15.ts'
import { buildG2GeometryBatch15DictionaryBundle, G2_GEOMETRY_BATCH15_DICTIONARY_PROOF_PINS, validateG2GeometryBatch15DictionaryProofs, validateG2GeometryBatch15DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch15.ts'
import { dictionaryGeometry, dictionaryLocalGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch15-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'ZhHans'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 36 strokes from licensed ZhHans candidates', () => {
  validateG2GeometryBatch15DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['湜',12,12],['珣',10,10],['瑢',14,14]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES.reduce((n,e)=>n+e.paths.length,0),36)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH15_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes+1}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES)
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.ok(audit.entries.every(e=>e.playback==='dictionary-crosschecked'))

})

test('local geometry audit rejects altered provenance and altered paths for the explicit three-glyph set', () => {
  for(const original of originals){
    const entry=published(original.glyph)
    assert.deepEqual(dictionaryLocalGeometry(original.glyph)!.paths,entry.paths)
    const catalog=[{glyph:original.glyph,strokes:original.catalogStrokes,readingGrade:'2급'}]
    const altered=structuredClone(entry);altered.geometrySource='0'.repeat(64)
    assert.throws(()=>auditStrokes(catalog,[],[altered]),/published entry/)
    const path=structuredClone(entry);path.paths=['M1 1 L2 2',...path.paths.slice(1)]
    assert.throws(()=>auditStrokes(catalog,[],[path]),/published entry/)
  }
})


test('湜 keeps the water strokes separate and joins the lower center to the final sweep', () => {
  for(const [n,side] of [[1,1],[2,1],[11,-1]]) {
    const p=points('湜',n)
    for(let i=1;i<p.length;i++)assert.ok(side*(p[i][0]-p[i-1][0])>0 && p[i][1]>p[i-1][1])
  }
  const rise=points('湜',3)
  for(let i=1;i<rise.length;i++)assert.ok(rise[i][0]>=rise[i-1][0] && rise[i][1]<rise[i-1][1])
  for(const n of [4,5])for(const bar of [6,7])assert.equal(separation(points('湜',n),points('湜',bar)),0)
  for(const [a,b] of [[8,9],[9,10]])assert.equal(separation(points('湜',a),points('湜',b)),0)
  for(const n of [9,11])assert.ok(separation(points('湜',12),points('湜',n))<=5)
})
test('珣 closes the inner 日 and finishes the outer folded stroke with an up-left hook', () => {
  for(const a of [7,8])for(const b of [9,10])assert.equal(separation(points('珣',a),points('珣',b)),0)
  const hook=points('珣',6)
  assert.ok(hook[1][0]>hook[0][0] && hook[1][1]===hook[0][1])
  assert.ok(hook.at(-1)![0]<hook.at(-2)![0] && hook.at(-1)![1]<hook.at(-2)![1])
  assert.ok(separation(hook,points('珣',5))<=5)
  for(const n of [7,8,9,10])assert.ok(separation(hook,points('珣',n))>5)
})
test('瑢 uses a downward roof dot and separates 王 from the central left sweep', () => {
  const dot=points('瑢',5),roof=points('瑢',7)
  assert.equal(dot[0][0],dot.at(-1)![0]);assert.ok(dot.at(-1)![1]>dot[0][1])
  assert.equal(separation(dot,roof),0);assert.ok(separation(roof,points('瑢',6))<=5)
  assert.ok(roof[1][0]>roof[0][0]&&roof[1][1]===roof[0][1])
  assert.ok(roof[2][0]<roof[1][0]&&roof[2][1]>roof[1][1])
  assert.ok(separation(points('瑢',4),points('瑢',10))>5)
  assert.ok(separation(points('瑢',10),points('瑢',12))<=5)
  for(const a of [12,13])assert.equal(separation(points('瑢',a),points('瑢',14)),0)
  for(const n of [10,11])assert.ok(separation(points('瑢',13),points('瑢',n))>5)
})
test('珣 and 瑢 each retain the reviewed 王 stroke order and connections', () => {
  for(const g of ['珣','瑢']){
    const vertical=points(g,3)
    assert.equal(vertical[0][0],vertical.at(-1)![0]);assert.ok(vertical.at(-1)![1]>vertical[0][1])
    for(const n of [1,2,4])assert.ok(separation(vertical,points(g,n))<=5)
    const rise=points(g,4);assert.ok(rise.at(-1)![0]>rise[0][0]&&rise.at(-1)![1]<rise[0][1])
  }
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES.some(e=>e.glyph==='珽'),false)
  assert.ok(!HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES.some(e=>e.glyph==='騏'))
  for(const g of ['瑄','湟'])assert.equal(dictionaryLocalGeometry(g),undefined)
})
test('all 202 source stroke-pair contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["湜",1,2,false],["湜",1,3,false],["湜",1,4,false],["湜",1,5,false],["湜",1,6,false],["湜",1,7,false],["湜",1,8,false],["湜",1,9,false],["湜",1,10,false],["湜",1,11,false],["湜",1,12,false],["湜",2,3,false],["湜",2,4,false],["湜",2,5,false],["湜",2,6,false],["湜",2,7,false],["湜",2,8,false],["湜",2,9,false],["湜",2,10,false],["湜",2,11,false],["湜",2,12,false],["湜",3,4,false],["湜",3,5,false],["湜",3,6,false],["湜",3,7,false],["湜",3,8,false],["湜",3,9,false],["湜",3,10,false],["湜",3,11,false],["湜",3,12,false],["湜",4,5,true],["湜",4,6,true],["湜",4,7,true],["湜",4,8,false],["湜",4,9,false],["湜",4,10,false],["湜",4,11,false],["湜",4,12,false],["湜",5,6,true],["湜",5,7,true],["湜",5,8,false],["湜",5,9,false],["湜",5,10,false],["湜",5,11,false],["湜",5,12,false],["湜",6,7,false],["湜",6,8,false],["湜",6,9,false],["湜",6,10,false],["湜",6,11,false],["湜",6,12,false],["湜",7,8,false],["湜",7,9,false],["湜",7,10,false],["湜",7,11,false],["湜",7,12,false],["湜",8,9,true],["湜",8,10,false],["湜",8,11,false],["湜",8,12,false],["湜",9,10,true],["湜",9,11,false],["湜",9,12,true],["湜",10,11,false],["湜",10,12,false],["湜",11,12,true],["珣",1,2,false],["珣",1,3,true],["珣",1,4,false],["珣",1,5,false],["珣",1,6,false],["珣",1,7,false],["珣",1,8,false],["珣",1,9,false],["珣",1,10,false],["珣",2,3,true],["珣",2,4,false],["珣",2,5,false],["珣",2,6,false],["珣",2,7,false],["珣",2,8,false],["珣",2,9,false],["珣",2,10,false],["珣",3,4,true],["珣",3,5,false],["珣",3,6,false],["珣",3,7,false],["珣",3,8,false],["珣",3,9,false],["珣",3,10,false],["珣",4,5,false],["珣",4,6,false],["珣",4,7,false],["珣",4,8,false],["珣",4,9,false],["珣",4,10,false],["珣",5,6,true],["珣",5,7,false],["珣",5,8,false],["珣",5,9,false],["珣",5,10,false],["珣",6,7,false],["珣",6,8,false],["珣",6,9,false],["珣",6,10,false],["珣",7,8,true],["珣",7,9,true],["珣",7,10,true],["珣",8,9,true],["珣",8,10,true],["珣",9,10,false],["瑢",1,2,false],["瑢",1,3,true],["瑢",1,4,false],["瑢",1,5,false],["瑢",1,6,false],["瑢",1,7,false],["瑢",1,8,false],["瑢",1,9,false],["瑢",1,10,false],["瑢",1,11,false],["瑢",1,12,false],["瑢",1,13,false],["瑢",1,14,false],["瑢",2,3,true],["瑢",2,4,false],["瑢",2,5,false],["瑢",2,6,false],["瑢",2,7,false],["瑢",2,8,false],["瑢",2,9,false],["瑢",2,10,false],["瑢",2,11,false],["瑢",2,12,false],["瑢",2,13,false],["瑢",2,14,false],["瑢",3,4,true],["瑢",3,5,false],["瑢",3,6,false],["瑢",3,7,false],["瑢",3,8,false],["瑢",3,9,false],["瑢",3,10,false],["瑢",3,11,false],["瑢",3,12,false],["瑢",3,13,false],["瑢",3,14,false],["瑢",4,5,false],["瑢",4,6,false],["瑢",4,7,false],["瑢",4,8,false],["瑢",4,9,false],["瑢",4,10,false],["瑢",4,11,false],["瑢",4,12,false],["瑢",4,13,false],["瑢",4,14,false],["瑢",5,6,false],["瑢",5,7,true],["瑢",5,8,false],["瑢",5,9,false],["瑢",5,10,false],["瑢",5,11,false],["瑢",5,12,false],["瑢",5,13,false],["瑢",5,14,false],["瑢",6,7,true],["瑢",6,8,false],["瑢",6,9,false],["瑢",6,10,false],["瑢",6,11,false],["瑢",6,12,false],["瑢",6,13,false],["瑢",6,14,false],["瑢",7,8,false],["瑢",7,9,false],["瑢",7,10,false],["瑢",7,11,false],["瑢",7,12,false],["瑢",7,13,false],["瑢",7,14,false],["瑢",8,9,false],["瑢",8,10,false],["瑢",8,11,false],["瑢",8,12,false],["瑢",8,13,false],["瑢",8,14,false],["瑢",9,10,false],["瑢",9,11,false],["瑢",9,12,false],["瑢",9,13,false],["瑢",9,14,false],["瑢",10,11,true],["瑢",10,12,true],["瑢",10,13,false],["瑢",10,14,false],["瑢",11,12,false],["瑢",11,13,false],["瑢",11,14,false],["瑢",12,13,true],["瑢",12,14,true],["瑢",13,14,true]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH15_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch15DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch15DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch15DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch15DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch15DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch15DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES.slice(1)),/published bundle/)
})
