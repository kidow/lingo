import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch20-2026-09-17/compose.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH20_STROKES, G2_GEOMETRY_BATCH20_DICTIONARY_GEOMETRY, loadG2GeometryBatch20DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch20.ts'
import { buildG2GeometryBatch20DictionaryBundle, G2_GEOMETRY_BATCH20_DICTIONARY_PROOF_PINS, validateG2GeometryBatch20DictionaryProofs, validateG2GeometryBatch20DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch20.ts'
import { dictionaryGeometry, dictionaryLocalGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch20-2026-09-17/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  components?: DictionaryComponent[]; corpus: 'Components' | 'ZhHans'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH20_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 41 strokes from individually reviewed component candidates', () => {
  validateG2GeometryBatch20DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['晳',12,12],['璿',18,18],['卨',11,11]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH20_STROKES.reduce((n,e)=>n+e.paths.length,0),41)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH20_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes+1}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH20_STROKES)
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.ok(audit.entries.every(e=>e.playback==='dictionary-crosschecked'))

})

test('six licensed components reconstruct the explicit layouts without approving related characters', () => {
  const sets:Record<string,[string,number][]>={'晳':[['析',8],['日',4]],'璿':[['王',4],['睿',14]],'卨':[['卜',2],['咼',9]]}
  for(const original of originals){
    assert.deepEqual(original.components!.map(p=>[p.glyph,p.medians.length]),sets[original.glyph])
    assert.deepEqual(compose(original.components!),original.medians)
    const changed=structuredClone(original.components!);changed[0].medians[0][0][0]+=1
    assert.throws(()=>compose(changed),/medians mismatch/)
    const badBox=structuredClone(original.components!);badBox[0].targetBox[2]=0
    assert.throws(()=>compose(badBox),/target box/)
  }
  for(const g of ['析','日','王','睿','卜','咼','姸','燁','鏞'])assert.ok(!HANJA_DICTIONARY_G2_GEOMETRY_BATCH20_STROKES.some(e=>e.glyph===g))
})
test('晳 preserves the 木 dot, 斤 connections and separate closed lower 日', () => {
  const dot=points('晳',4),sweep=points('晳',5),curve=points('晳',6)
  assert.ok(dot.at(-1)![0]>dot[0][0]&&dot.at(-1)![1]>dot[0][1])
  assert.ok(separation(dot,points('晳',1))>5)
  assert.ok(separation(dot,points('晳',2))<=5)
  assert.ok(sweep.at(-1)![0]<sweep[0][0]&&sweep.at(-1)![1]>sweep[0][1])
  assert.equal(separation(sweep,curve),0)
  for(const n of [6,8])assert.ok(separation(points('晳',7),points('晳',n))<=5)
  for(const n of [11,12])for(const side of [9,10])assert.equal(separation(points('晳',n),points('晳',side)),0)
  for(const upper of [2,6,8])for(const lower of [9,10])assert.ok(separation(points('晳',upper),points('晳',lower))>5)
})
test('璿 keeps the 王 rise and roof contacts while joining the lower sweeps to the 目 corners', () => {
  const rise=points('璿',4),roof=points('璿',8),left=points('璿',12),right=points('璿',13)
  assert.ok(rise.at(-1)![0]>rise[0][0]&&rise.at(-1)![1]<rise[0][1])
  for(const n of [5,7])assert.ok(separation(roof,points('璿',n))<=5)
  assert.ok(roof.at(-1)![0]<roof.at(-2)![0]&&roof.at(-1)![1]>roof.at(-2)![1])
  assert.ok(separation(roof,points('璿',9))>5)
  for(const n of [10,11])for(const m of [9,12,13])assert.ok(separation(points('璿',n),points('璿',m))>5)
  assert.ok(left.at(-1)![0]<left[0][0]&&left.at(-1)![1]>left[0][1])
  assert.ok(right.at(-1)![0]>right[0][0]&&right.at(-1)![1]>right[0][1])
  assert.ok(separation(left,right)<=5)
  for(const n of [14,15])assert.ok(separation(left,points('璿',n))<=5)
  assert.ok(separation(right,points('璿',15))<=5)
  assert.ok(separation(right,points('璿',14))>5)
  for(const n of [16,17,18])for(const side of [14,15])assert.equal(separation(points('璿',n),points('璿',side)),0)
})
test('卨 writes the upper inner horizontal before its vertical and retains the outer hook and separate inner 口', () => {
  const recipe=JSON.parse(read(dir+'proposals.json')) as Record<string,{derivedFromStroke:number}[]>
  assert.deepEqual(recipe['卨'].map(r=>r.derivedFromStroke),[1,2,3,4,6,5,7,8,9,10,11])
  const bar=points('卨',5),stem=points('卨',6),frame=points('卨',8)
  assert.ok(bar.every(p=>p[1]===bar[0][1])&&bar.at(-1)![0]>bar[0][0])
  assert.ok(stem.every(p=>p[0]===stem[0][0])&&stem.at(-1)![1]>stem[0][1])
  assert.equal(separation(bar,stem),0)
  assert.equal(separation(points('卨',1),points('卨',4)),0)
  for(const n of [3,4,6,7])assert.equal(separation(points('卨',n),frame),0)
  assert.ok(frame.at(-1)![0]<frame.at(-2)![0]&&frame.at(-1)![1]<frame.at(-2)![1])
  for(const n of [9,10])assert.equal(separation(points('卨',11),points('卨',n)),0)
  for(const n of [9,10,11])assert.ok(separation(points('卨',n),frame)>5)
})
test('all 274 source-observed contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["晳",1,2,true],["晳",1,3,true],["晳",1,4,false],["晳",1,5,false],["晳",1,6,false],["晳",1,7,false],["晳",1,8,false],["晳",1,9,false],["晳",1,10,false],["晳",1,11,false],["晳",1,12,false],["晳",2,3,true],["晳",2,4,true],["晳",2,5,false],["晳",2,6,false],["晳",2,7,false],["晳",2,8,false],["晳",2,9,false],["晳",2,10,false],["晳",2,11,false],["晳",2,12,false],["晳",3,4,false],["晳",3,5,false],["晳",3,6,false],["晳",3,7,false],["晳",3,8,false],["晳",3,9,false],["晳",3,10,false],["晳",3,11,false],["晳",3,12,false],["晳",4,5,false],["晳",4,6,false],["晳",4,7,false],["晳",4,8,false],["晳",4,9,false],["晳",4,10,false],["晳",4,11,false],["晳",4,12,false],["晳",5,6,true],["晳",5,7,false],["晳",5,8,false],["晳",5,9,false],["晳",5,10,false],["晳",5,11,false],["晳",5,12,false],["晳",6,7,true],["晳",6,8,false],["晳",6,9,false],["晳",6,10,false],["晳",6,11,false],["晳",6,12,false],["晳",7,8,true],["晳",7,9,false],["晳",7,10,false],["晳",7,11,false],["晳",7,12,false],["晳",8,9,false],["晳",8,10,false],["晳",8,11,false],["晳",8,12,false],["晳",9,10,true],["晳",9,11,true],["晳",9,12,true],["晳",10,11,true],["晳",10,12,true],["晳",11,12,false],["璿",1,2,false],["璿",1,3,true],["璿",1,4,false],["璿",1,5,false],["璿",1,6,false],["璿",1,7,false],["璿",1,8,false],["璿",1,9,false],["璿",1,10,false],["璿",1,11,false],["璿",1,12,false],["璿",1,13,false],["璿",1,14,false],["璿",1,15,false],["璿",1,16,false],["璿",1,17,false],["璿",1,18,false],["璿",2,3,true],["璿",2,4,false],["璿",2,5,false],["璿",2,6,false],["璿",2,7,false],["璿",2,8,false],["璿",2,9,false],["璿",2,10,false],["璿",2,11,false],["璿",2,12,false],["璿",2,13,false],["璿",2,14,false],["璿",2,15,false],["璿",2,16,false],["璿",2,17,false],["璿",2,18,false],["璿",3,4,true],["璿",3,5,false],["璿",3,6,false],["璿",3,7,false],["璿",3,8,false],["璿",3,9,false],["璿",3,10,false],["璿",3,11,false],["璿",3,12,false],["璿",3,13,false],["璿",3,14,false],["璿",3,15,false],["璿",3,16,false],["璿",3,17,false],["璿",3,18,false],["璿",4,5,false],["璿",4,6,false],["璿",4,7,false],["璿",4,8,false],["璿",4,9,false],["璿",4,10,false],["璿",4,11,false],["璿",4,12,false],["璿",4,13,false],["璿",4,14,false],["璿",4,15,false],["璿",4,16,false],["璿",4,17,false],["璿",4,18,false],["璿",5,6,true],["璿",5,7,false],["璿",5,8,true],["璿",5,9,false],["璿",5,10,false],["璿",5,11,false],["璿",5,12,false],["璿",5,13,false],["璿",5,14,false],["璿",5,15,false],["璿",5,16,false],["璿",5,17,false],["璿",5,18,false],["璿",6,7,false],["璿",6,8,false],["璿",6,9,false],["璿",6,10,false],["璿",6,11,false],["璿",6,12,false],["璿",6,13,false],["璿",6,14,false],["璿",6,15,false],["璿",6,16,false],["璿",6,17,false],["璿",6,18,false],["璿",7,8,true],["璿",7,9,false],["璿",7,10,false],["璿",7,11,false],["璿",7,12,false],["璿",7,13,false],["璿",7,14,false],["璿",7,15,false],["璿",7,16,false],["璿",7,17,false],["璿",7,18,false],["璿",8,9,false],["璿",8,10,false],["璿",8,11,false],["璿",8,12,false],["璿",8,13,false],["璿",8,14,false],["璿",8,15,false],["璿",8,16,false],["璿",8,17,false],["璿",8,18,false],["璿",9,10,false],["璿",9,11,false],["璿",9,12,false],["璿",9,13,false],["璿",9,14,false],["璿",9,15,false],["璿",9,16,false],["璿",9,17,false],["璿",9,18,false],["璿",10,11,false],["璿",10,12,false],["璿",10,13,false],["璿",10,14,false],["璿",10,15,false],["璿",10,16,false],["璿",10,17,false],["璿",10,18,false],["璿",11,12,false],["璿",11,13,false],["璿",11,14,false],["璿",11,15,false],["璿",11,16,false],["璿",11,17,false],["璿",11,18,false],["璿",12,13,true],["璿",12,14,true],["璿",12,15,true],["璿",12,16,false],["璿",12,17,false],["璿",12,18,false],["璿",13,14,false],["璿",13,15,true],["璿",13,16,false],["璿",13,17,false],["璿",13,18,false],["璿",14,15,true],["璿",14,16,true],["璿",14,17,true],["璿",14,18,true],["璿",15,16,true],["璿",15,17,true],["璿",15,18,true],["璿",16,17,false],["璿",16,18,false],["璿",17,18,false],["卨",1,2,true],["卨",1,3,false],["卨",1,4,true],["卨",1,5,false],["卨",1,6,false],["卨",1,7,false],["卨",1,8,false],["卨",1,9,false],["卨",1,10,false],["卨",1,11,false],["卨",2,3,false],["卨",2,4,false],["卨",2,5,false],["卨",2,6,false],["卨",2,7,false],["卨",2,8,false],["卨",2,9,false],["卨",2,10,false],["卨",2,11,false],["卨",3,4,true],["卨",3,5,false],["卨",3,6,false],["卨",3,7,false],["卨",3,8,true],["卨",3,9,false],["卨",3,10,false],["卨",3,11,false],["卨",4,5,true],["卨",4,6,false],["卨",4,7,false],["卨",4,8,true],["卨",4,9,false],["卨",4,10,false],["卨",4,11,false],["卨",5,6,true],["卨",5,7,false],["卨",5,8,false],["卨",5,9,false],["卨",5,10,false],["卨",5,11,false],["卨",6,7,false],["卨",6,8,true],["卨",6,9,false],["卨",6,10,false],["卨",6,11,false],["卨",7,8,true],["卨",7,9,false],["卨",7,10,false],["卨",7,11,false],["卨",8,9,false],["卨",8,10,false],["卨",8,11,false],["卨",9,10,true],["卨",9,11,true],["卨",10,11,true]] as const){
    const gap=separation(points(g,a),points(g,b))
    assert.ok(touching?gap<=5:gap>5,g+' '+a+'/'+b+' gap '+gap)
  }
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
test('unreviewed originals, changed paths, proof bytes and source identity cannot silently regress', () => {
  for(const e of originals){
    const reverted=structuredClone(published(e.glyph));reverted.paths=e.paths
    assert.throws(()=>validateDictionaryReview(reverted,e.catalogStrokes),/published entry/)
    const reordered=structuredClone(published(e.glyph))
    reordered.paths=[reordered.paths[1],reordered.paths[0],...reordered.paths.slice(2)]
    assert.throws(()=>validateDictionaryReview(reordered,e.catalogStrokes),/published entry/)
  }
  for(const file of Object.keys(G2_GEOMETRY_BATCH20_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch20DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch20DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch20DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch20DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch20DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch20DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH20_STROKES.slice(1)),/published bundle/)
})
