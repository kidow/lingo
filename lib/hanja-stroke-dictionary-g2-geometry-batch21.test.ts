import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch21-2026-09-17/compose.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH21_STROKES, G2_GEOMETRY_BATCH21_DICTIONARY_GEOMETRY, loadG2GeometryBatch21DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch21.ts'
import { buildG2GeometryBatch21DictionaryBundle, G2_GEOMETRY_BATCH21_DICTIONARY_PROOF_PINS, validateG2GeometryBatch21DictionaryProofs, validateG2GeometryBatch21DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch21.ts'
import { dictionaryGeometry, dictionaryLocalGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch21-2026-09-17/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  components?: DictionaryComponent[]; corpus: 'Components' | 'ZhHans'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH21_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 43 strokes from individually reviewed component candidates', () => {
  validateG2GeometryBatch21DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['姸',9,9],['燁',15,15],['鏞',19,19]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH21_STROKES.reduce((n,e)=>n+e.paths.length,0),43)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH21_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes+1}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH21_STROKES)
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.ok(audit.entries.every(e=>e.playback==='dictionary-crosschecked'))

})

test('seven licensed components reconstruct the explicit layouts without approving related characters', () => {
  const sets:Record<string,[string,number][]>={'姸':[['女',3],['干',3],['干',3]],'燁':[['火',4],['華',11]],'鏞':[['金',8],['庸',11]]}
  for(const original of originals){
    assert.deepEqual(original.components!.map(p=>[p.glyph,p.medians.length]),sets[original.glyph])
    assert.deepEqual(compose(original.components!),original.medians)
    const changed=structuredClone(original.components!);changed[0].medians[0][0][0]+=1
    assert.throws(()=>compose(changed),/medians mismatch/)
    const badBox=structuredClone(original.components!);badBox[0].targetBox[2]=0
    assert.throws(()=>compose(badBox),/target box/)
  }
  for(const g of ['女','干','火','華','金','庸','鈗','鎰','曺'])assert.ok(!HANJA_DICTIONARY_G2_GEOMETRY_BATCH21_STROKES.some(e=>e.glyph===g))
})
test('姸 writes a curved left 干 and a straight right 干 after the three 女 strokes', () => {
  const left=points('姸',6),right=points('姸',9),bend=points('姸',1),sweep=points('姸',2)
  assert.ok(bend[1][0]<bend[0][0]&&bend[1][1]>bend[0][1])
  assert.ok(bend.at(-1)![0]>bend[1][0]&&bend.at(-1)![1]>bend[1][1])
  assert.ok(sweep.at(-1)![0]<sweep[0][0]&&sweep.at(-1)![1]>sweep[0][1])
  for(const n of [1,2])assert.ok(separation(points('姸',3),points('姸',n))<=5)
  assert.ok(left.at(-1)![0]<left[0][0]&&left.at(-1)![1]>left[0][1])
  assert.ok(right.every(p=>p[0]===right[0][0])&&right.at(-1)![1]>right[0][1])
  for(const n of [4,5])assert.equal(separation(left,points('姸',n)),0)
  for(const n of [7,8])assert.equal(separation(right,points('姸',n)),0)
  for(const [a,b] of [[4,7],[5,8],[6,9]])assert.ok(separation(points('姸',a),points('姸',b))>5)
})
test('燁 writes both 艹 horizontals before their verticals and finishes with the central stroke', () => {
  const recipe=JSON.parse(read(dir+'proposals.json')) as Record<string,{derivedFromStroke:number}[]>
  assert.deepEqual(recipe['燁'].map(r=>r.derivedFromStroke),[1,2,3,4,6,5,8,7,9,10,11,12,13,14,15])
  const dot=points('燁',1),central=points('燁',15)
  assert.ok(dot.at(-1)![0]<dot[0][0]&&dot.at(-1)![1]>dot[0][1])
  for(const [horizontal,vertical]of [[5,6],[7,8]]){
    const bar=points('燁',horizontal),stem=points('燁',vertical)
    assert.ok(bar.every(p=>p[1]===bar[0][1])&&bar.at(-1)![0]>bar[0][0])
    assert.ok(stem.every(p=>p[0]===stem[0][0])&&stem.at(-1)![1]>stem[0][1])
    assert.equal(separation(bar,stem),0)
    assert.ok(separation(stem,points('燁',9))>5)
  }
  for(const n of [9,10,13,14])assert.equal(separation(central,points('燁',n)),0)
  for(const side of [11,12]){
    for(const bar of [9,10,13])assert.equal(separation(points('燁',side),points('燁',bar)),0)
    assert.ok(separation(points('燁',side),points('燁',14))>5)
  }
})
test('鏞 retains the detached 金 dot, vertical 广 top and final central stroke through both inner frames', () => {
  const dot=points('鏞',6),rise=points('鏞',8),top=points('鏞',9),hook=points('鏞',16),central=points('鏞',19)
  assert.ok(dot.at(-1)![0]>dot[0][0]&&dot.at(-1)![1]>dot[0][1])
  for(const n of [5,7,8])assert.ok(separation(dot,points('鏞',n))>5)
  assert.ok(rise.at(-1)![0]>rise[0][0]&&rise.at(-1)![1]<rise[0][1])
  assert.ok(top.every(p=>p[0]===top[0][0])&&top.at(-1)![1]>top[0][1])
  assert.equal(separation(top,points('鏞',10)),0)
  assert.ok(separation(central,points('鏞',10))>5)
  for(const n of [12,13,14,16,17,18])assert.equal(separation(central,points('鏞',n)),0)
  assert.equal(separation(points('鏞',11),points('鏞',13)),0)
  for(const n of [17,18])for(const side of [15,16])assert.equal(separation(points('鏞',n),points('鏞',side)),0)
  assert.ok(hook.at(-1)![0]<hook.at(-2)![0]&&hook.at(-1)![1]<hook.at(-2)![1])
  assert.ok(separation(points('鏞',14),points('鏞',16))>5)
})
test('all 312 source-observed contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["姸",1,2,true],["姸",1,3,true],["姸",1,4,false],["姸",1,5,false],["姸",1,6,false],["姸",1,7,false],["姸",1,8,false],["姸",1,9,false],["姸",2,3,true],["姸",2,4,false],["姸",2,5,false],["姸",2,6,false],["姸",2,7,false],["姸",2,8,false],["姸",2,9,false],["姸",3,4,false],["姸",3,5,false],["姸",3,6,false],["姸",3,7,false],["姸",3,8,false],["姸",3,9,false],["姸",4,5,false],["姸",4,6,true],["姸",4,7,false],["姸",4,8,false],["姸",4,9,false],["姸",5,6,true],["姸",5,7,false],["姸",5,8,false],["姸",5,9,false],["姸",6,7,false],["姸",6,8,false],["姸",6,9,false],["姸",7,8,false],["姸",7,9,true],["姸",8,9,true],["燁",1,2,false],["燁",1,3,false],["燁",1,4,false],["燁",1,5,false],["燁",1,6,false],["燁",1,7,false],["燁",1,8,false],["燁",1,9,false],["燁",1,10,false],["燁",1,11,false],["燁",1,12,false],["燁",1,13,false],["燁",1,14,false],["燁",1,15,false],["燁",2,3,true],["燁",2,4,false],["燁",2,5,false],["燁",2,6,false],["燁",2,7,false],["燁",2,8,false],["燁",2,9,false],["燁",2,10,false],["燁",2,11,false],["燁",2,12,false],["燁",2,13,false],["燁",2,14,false],["燁",2,15,false],["燁",3,4,true],["燁",3,5,false],["燁",3,6,false],["燁",3,7,false],["燁",3,8,false],["燁",3,9,false],["燁",3,10,false],["燁",3,11,false],["燁",3,12,false],["燁",3,13,false],["燁",3,14,false],["燁",3,15,false],["燁",4,5,false],["燁",4,6,false],["燁",4,7,false],["燁",4,8,false],["燁",4,9,false],["燁",4,10,false],["燁",4,11,false],["燁",4,12,false],["燁",4,13,false],["燁",4,14,false],["燁",4,15,false],["燁",5,6,true],["燁",5,7,false],["燁",5,8,false],["燁",5,9,false],["燁",5,10,false],["燁",5,11,false],["燁",5,12,false],["燁",5,13,false],["燁",5,14,false],["燁",5,15,false],["燁",6,7,false],["燁",6,8,false],["燁",6,9,false],["燁",6,10,false],["燁",6,11,false],["燁",6,12,false],["燁",6,13,false],["燁",6,14,false],["燁",6,15,false],["燁",7,8,true],["燁",7,9,false],["燁",7,10,false],["燁",7,11,false],["燁",7,12,false],["燁",7,13,false],["燁",7,14,false],["燁",7,15,false],["燁",8,9,false],["燁",8,10,false],["燁",8,11,false],["燁",8,12,false],["燁",8,13,false],["燁",8,14,false],["燁",8,15,false],["燁",9,10,false],["燁",9,11,true],["燁",9,12,true],["燁",9,13,false],["燁",9,14,false],["燁",9,15,true],["燁",10,11,true],["燁",10,12,true],["燁",10,13,false],["燁",10,14,false],["燁",10,15,true],["燁",11,12,false],["燁",11,13,true],["燁",11,14,false],["燁",11,15,false],["燁",12,13,true],["燁",12,14,false],["燁",12,15,false],["燁",13,14,false],["燁",13,15,true],["燁",14,15,true],["鏞",1,2,true],["鏞",1,3,true],["鏞",1,4,false],["鏞",1,5,false],["鏞",1,6,false],["鏞",1,7,false],["鏞",1,8,false],["鏞",1,9,false],["鏞",1,10,false],["鏞",1,11,false],["鏞",1,12,false],["鏞",1,13,false],["鏞",1,14,false],["鏞",1,15,false],["鏞",1,16,false],["鏞",1,17,false],["鏞",1,18,false],["鏞",1,19,false],["鏞",2,3,false],["鏞",2,4,false],["鏞",2,5,false],["鏞",2,6,false],["鏞",2,7,false],["鏞",2,8,false],["鏞",2,9,false],["鏞",2,10,false],["鏞",2,11,false],["鏞",2,12,false],["鏞",2,13,false],["鏞",2,14,false],["鏞",2,15,false],["鏞",2,16,false],["鏞",2,17,false],["鏞",2,18,false],["鏞",2,19,false],["鏞",3,4,false],["鏞",3,5,true],["鏞",3,6,false],["鏞",3,7,false],["鏞",3,8,false],["鏞",3,9,false],["鏞",3,10,false],["鏞",3,11,false],["鏞",3,12,false],["鏞",3,13,false],["鏞",3,14,false],["鏞",3,15,false],["鏞",3,16,false],["鏞",3,17,false],["鏞",3,18,false],["鏞",3,19,false],["鏞",4,5,true],["鏞",4,6,false],["鏞",4,7,false],["鏞",4,8,false],["鏞",4,9,false],["鏞",4,10,false],["鏞",4,11,false],["鏞",4,12,false],["鏞",4,13,false],["鏞",4,14,false],["鏞",4,15,false],["鏞",4,16,false],["鏞",4,17,false],["鏞",4,18,false],["鏞",4,19,false],["鏞",5,6,false],["鏞",5,7,true],["鏞",5,8,true],["鏞",5,9,false],["鏞",5,10,false],["鏞",5,11,false],["鏞",5,12,false],["鏞",5,13,false],["鏞",5,14,false],["鏞",5,15,false],["鏞",5,16,false],["鏞",5,17,false],["鏞",5,18,false],["鏞",5,19,false],["鏞",6,7,false],["鏞",6,8,false],["鏞",6,9,false],["鏞",6,10,false],["鏞",6,11,false],["鏞",6,12,false],["鏞",6,13,false],["鏞",6,14,false],["鏞",6,15,false],["鏞",6,16,false],["鏞",6,17,false],["鏞",6,18,false],["鏞",6,19,false],["鏞",7,8,false],["鏞",7,9,false],["鏞",7,10,false],["鏞",7,11,false],["鏞",7,12,false],["鏞",7,13,false],["鏞",7,14,false],["鏞",7,15,false],["鏞",7,16,false],["鏞",7,17,false],["鏞",7,18,false],["鏞",7,19,false],["鏞",8,9,false],["鏞",8,10,false],["鏞",8,11,false],["鏞",8,12,false],["鏞",8,13,false],["鏞",8,14,false],["鏞",8,15,false],["鏞",8,16,false],["鏞",8,17,false],["鏞",8,18,false],["鏞",8,19,false],["鏞",9,10,true],["鏞",9,11,false],["鏞",9,12,false],["鏞",9,13,false],["鏞",9,14,false],["鏞",9,15,false],["鏞",9,16,false],["鏞",9,17,false],["鏞",9,18,false],["鏞",9,19,false],["鏞",10,11,true],["鏞",10,12,false],["鏞",10,13,false],["鏞",10,14,false],["鏞",10,15,false],["鏞",10,16,false],["鏞",10,17,false],["鏞",10,18,false],["鏞",10,19,false],["鏞",11,12,false],["鏞",11,13,true],["鏞",11,14,false],["鏞",11,15,false],["鏞",11,16,false],["鏞",11,17,false],["鏞",11,18,false],["鏞",11,19,false],["鏞",12,13,true],["鏞",12,14,true],["鏞",12,15,false],["鏞",12,16,false],["鏞",12,17,false],["鏞",12,18,false],["鏞",12,19,true],["鏞",13,14,false],["鏞",13,15,false],["鏞",13,16,false],["鏞",13,17,false],["鏞",13,18,false],["鏞",13,19,true],["鏞",14,15,false],["鏞",14,16,false],["鏞",14,17,false],["鏞",14,18,false],["鏞",14,19,true],["鏞",15,16,true],["鏞",15,17,true],["鏞",15,18,true],["鏞",15,19,false],["鏞",16,17,true],["鏞",16,18,true],["鏞",16,19,true],["鏞",17,18,false],["鏞",17,19,true],["鏞",18,19,true]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH21_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch21DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch21DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch21DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch21DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch21DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch21DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH21_STROKES.slice(1)),/published bundle/)
})
