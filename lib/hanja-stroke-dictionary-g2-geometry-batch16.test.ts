import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH16_STROKES, G2_GEOMETRY_BATCH16_DICTIONARY_GEOMETRY, loadG2GeometryBatch16DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch16.ts'
import { buildG2GeometryBatch16DictionaryBundle, G2_GEOMETRY_BATCH16_DICTIONARY_PROOF_PINS, validateG2GeometryBatch16DictionaryProofs, validateG2GeometryBatch16DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch16.ts'
import { dictionaryGeometry, dictionaryLocalGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch16-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'ZhHans'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH16_STROKES.find(e => e.glyph === glyph)!
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

test('one full review reconstructs 11 strokes from licensed ZhHans candidates', () => {
  validateG2GeometryBatch16DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['珽',10,11]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH16_STROKES.reduce((n,e)=>n+e.paths.length,0),11)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH16_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes+1}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH16_STROKES)
  assert.equal(audit.verificationSources.dictionary,1)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.ok(audit.entries.every(e=>e.playback==='dictionary-crosschecked'))

})

test('local geometry audit rejects altered provenance and altered paths for the explicit reviewed glyph', () => {
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



test('珽 splits licensed stroke 9 into two independently timed dictionary stages', () => {
  const split=JSON.parse(read(dir+'split-review.json')) as {
    sourceStroke:number;splitPointIndex:number;targetSourceStrokeMapping:number[];
    licensedSourceFragments:{targetStroke:number;path:string}[];
    sourceStages:{targetStroke:number;delay:number;duration:number}[]
  }
  const recipes=JSON.parse(read(dir+'proposals.json')) as Record<string,{derivedFromStroke:number}[]>
  assert.equal(split.sourceStroke,9);assert.equal(split.splitPointIndex,3)
  assert.deepEqual(split.targetSourceStrokeMapping,[1,2,3,4,5,6,7,8,9,9,10])
  assert.deepEqual(recipes['珽'].map(p=>p.derivedFromStroke),split.targetSourceStrokeMapping)
  assert.deepEqual(split.licensedSourceFragments.map(e=>e.targetStroke),[9,10])
  const source=originals[0].paths[8]
  const fragmentPoints=split.licensedSourceFragments.map(e=>[...e.path.matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m=>[+m[1],+m[2]]))
  const sourcePoints=[...source.matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m=>[+m[1],+m[2]])
  assert.deepEqual([...fragmentPoints[0],...fragmentPoints[1].slice(1)],sourcePoints)
  assert.deepEqual(fragmentPoints[0].at(-1),fragmentPoints[1][0])
  assert.deepEqual(split.sourceStages.map(s=>s.targetStroke),[9,10,11])
  for(let i=1;i<split.sourceStages.length;i++){
    const prev=split.sourceStages[i-1],current=split.sourceStages[i]
    assert.ok(current.delay>prev.delay+prev.duration)
  }
  const first=points('珽',9),second=points('珽',10)
  assert.deepEqual(first.at(-1),second[0])
  for(const p of [first,second]){
    assert.ok(p[1][0]>p[0][0]&&p[1][1]===p[0][1])
    assert.ok(p.at(-1)![0]<p[1][0]&&p.at(-1)![1]>p[1][1])
  }
})
test('珽 preserves the independently reviewed 王 connections and inner vertical order', () => {
  const v=points('珽',3)
  assert.equal(v[0][0],v.at(-1)![0]);assert.ok(v.at(-1)![1]>v[0][1])
  for(const n of [1,2,4])assert.ok(separation(v,points('珽',n))<=5)
  const upper=points('珽',5)
  for(let i=1;i<upper.length;i++)assert.ok(upper[i][0]<upper[i-1][0]&&upper[i][1]>upper[i-1][1])
  for(const n of [5,6,8])assert.ok(separation(points('珽',7),points('珽',n))<=5)
  assert.ok(separation(points('珽',10),points('珽',11))<=5)
  assert.ok(separation(points('珽',9),points('珽',11))>5)
  for(const g of ['廷','挺','庭','艇'])assert.equal(dictionaryLocalGeometry(g),undefined)
})
test('all 55 source contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["珽",1,2,false],["珽",1,3,true],["珽",1,4,false],["珽",1,5,false],["珽",1,6,false],["珽",1,7,false],["珽",1,8,false],["珽",1,9,false],["珽",1,10,false],["珽",1,11,false],["珽",2,3,true],["珽",2,4,false],["珽",2,5,false],["珽",2,6,false],["珽",2,7,false],["珽",2,8,false],["珽",2,9,false],["珽",2,10,false],["珽",2,11,false],["珽",3,4,true],["珽",3,5,false],["珽",3,6,false],["珽",3,7,false],["珽",3,8,false],["珽",3,9,false],["珽",3,10,false],["珽",3,11,false],["珽",4,5,false],["珽",4,6,false],["珽",4,7,false],["珽",4,8,false],["珽",4,9,false],["珽",4,10,false],["珽",4,11,false],["珽",5,6,false],["珽",5,7,true],["珽",5,8,false],["珽",5,9,false],["珽",5,10,false],["珽",5,11,false],["珽",6,7,true],["珽",6,8,false],["珽",6,9,false],["珽",6,10,false],["珽",6,11,false],["珽",7,8,true],["珽",7,9,false],["珽",7,10,false],["珽",7,11,false],["珽",8,9,false],["珽",8,10,false],["珽",8,11,false],["珽",9,10,true],["珽",9,11,false],["珽",10,11,true]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH16_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch16DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch16DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch16DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch16DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch16DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch16DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH16_STROKES.slice(1)),/published bundle/)
})
