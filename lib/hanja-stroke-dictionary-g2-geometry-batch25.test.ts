import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch25-2026-09-17/compose.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES, G2_GEOMETRY_BATCH25_DICTIONARY_GEOMETRY, loadG2GeometryBatch25DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch25.ts'
import { buildG2GeometryBatch25DictionaryBundle, G2_GEOMETRY_BATCH25_DICTIONARY_PROOF_PINS, validateG2GeometryBatch25DictionaryProofs, validateG2GeometryBatch25DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch25.ts'
import { dictionaryGeometry, dictionaryLocalGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch25-2026-09-17/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  components?: DictionaryComponent[]; corpus: 'Components' | 'ZhHans'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 46 strokes from individually reviewed component candidates', () => {
  validateG2GeometryBatch25DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['澔',15,15],['嬅',14,14],['壎',17,17]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES.reduce((n,e)=>n+e.paths.length,0),46)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH25_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes+1}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES)
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.ok(audit.entries.every(e=>e.playback==='dictionary-crosschecked'))

})

test('seven licensed components reconstruct the explicit layouts without approving related characters', () => {
  const sets:Record<string,[string,number][]>= {'澔':[['氵',3],['白',5],['告',7]],'嬅':[['女',3],['華',11]],'壎':[['土',3],['熏',14]]}
  for(const original of originals){
    assert.deepEqual(original.components!.map(p=>[p.glyph,p.medians.length]),sets[original.glyph])
    assert.deepEqual(compose(original.components!),original.medians)
    const changed=structuredClone(original.components!);changed[0].medians[0][0][0]+=1
    assert.throws(()=>compose(changed),/medians mismatch/)
    const badBox=structuredClone(original.components!);badBox[0].targetBox[2]=0
    assert.throws(()=>compose(badBox),/target box/)
  }
  for(const g of ['氵','白','告','女','華','土','熏','飼','祐','庾','禎'])assert.ok(!HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES.some(e=>e.glyph===g))
})


test('澔 preserves the water bend, closes narrow 白 and keeps 告 above its separate 口', () => {
  const water=points('澔',3),fall=points('澔',4)
  assert.ok(Math.max(...water.map(p=>p[1]))>water[0][1])
  assert.ok(water.at(-1)![0]>water[0][0]&&water.at(-1)![1]<water[0][1])
  assert.ok(fall.at(-1)![0]<fall[0][0]&&fall.at(-1)![1]>fall[0][1])
  assert.ok(separation(fall,points('澔',6))<=5)
  assert.ok(separation(fall,points('澔',5))>5)
  for(const bar of [7,8])for(const wall of [5,6])assert.equal(separation(points('澔',bar),points('澔',wall)),0)
  for(const bar of [10,12])assert.equal(separation(points('澔',bar),points('澔',11)),0)
  assert.ok(separation(points('澔',9),points('澔',12))>5)
  assert.ok(separation(points('澔',11),points('澔',14))>5)
  for(const wall of [13,14])assert.equal(separation(points('澔',15),points('澔',wall)),0)
})
test('嬅 reorders both 艸 crosses and keeps the last central stem and 女 contact in the dictionary sequence', () => {
  const recipes=JSON.parse(read(dir+'proposals.json')) as Record<string,{derivedFromStroke:number}[]>
  assert.deepEqual(recipes['嬅'].slice(3,7).map(r=>r.derivedFromStroke),[5,4,7,6])
  for(const [h,v]of [[4,5],[6,7]]){
    const a=points('嬅',h),b=points('嬅',v)
    assert.ok(a.at(-1)![0]>a[0][0]&&a.at(-1)![1]===a[0][1])
    assert.ok(b.at(-1)![1]>b[0][1]&&b.at(-1)![0]===b[0][0])
    assert.equal(separation(a,b),0)
  }
  for(const n of [4,5])for(const other of [6,7])assert.ok(separation(points('嬅',n),points('嬅',other))>5)
  for(const bar of [8,9,12,13])assert.equal(separation(points('嬅',14),points('嬅',bar)),0)
  assert.ok(separation(points('嬅',1),points('嬅',13))<=5)
  assert.ok(separation(points('嬅',1),points('嬅',12))>5)
})
test('壎 writes the lower bar before the central stem and keeps the two inner and four bottom dots detached', () => {
  const recipes=JSON.parse(read(dir+'proposals.json')) as Record<string,{derivedFromStroke:number}[]>
  assert.deepEqual(recipes['壎'].slice(10,12).map(r=>r.derivedFromStroke),[12,11])
  const bar=points('壎',11),stem=points('壎',12),base=points('壎',3)
  assert.ok(bar.at(-1)![0]>bar[0][0]&&bar.at(-1)![1]===bar[0][1])
  assert.ok(stem.at(-1)![1]>stem[0][1]&&stem.at(-1)![0]===stem[0][0])
  assert.ok(base.at(-1)![0]>base[0][0]&&base.at(-1)![1]<base[0][1])
  for(const n of [4,5,7,10,11,13])assert.ok(separation(stem,points('壎',n))<=5)
  for(const n of [8,9]){
    for(const wall of [6,7,10,12])assert.ok(separation(points('壎',n),points('壎',wall))>5)
  }
  for(const n of [14,15,16,17]){
    const dot=points('壎',n)
    assert.ok(dot.at(-1)![1]>dot[0][1])
    assert.ok(n===14?dot.at(-1)![0]<dot[0][0]:dot.at(-1)![0]>dot[0][0])
    assert.ok(separation(dot,points('壎',13))>5)
  }
})

test('all 332 source-observed contacts and gaps survive the five-unit playback width', () => {
  const touching:Record<string,string[]>={"澔":["4/6","5/6","5/7","5/8","6/7","6/8","9/10","10/11","11/12","13/14","13/15","14/15"],"嬅":["1/2","1/3","1/13","2/3","4/5","6/7","8/10","8/11","8/14","9/10","9/11","9/14","10/12","11/12","12/14","13/14"],"壎":["1/2","2/3","4/12","5/12","6/7","6/10","7/10","7/12","10/12","11/12","12/13"]}
  let checked=0
  for(const original of originals)for(let a=1;a<original.catalogStrokes;a++)for(let b=a+1;b<=original.catalogStrokes;b++){
    const gap=separation(points(original.glyph,a),points(original.glyph,b))
    const expected=touching[original.glyph].includes(a+'/'+b)
    assert.ok(expected?gap<=5:gap>5,original.glyph+' '+a+'/'+b+' gap '+gap)
    checked++
  }
  assert.equal(checked,332)
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH25_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch25DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch25DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch25DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch25DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch25DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch25DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES.slice(1)),/published bundle/)
})
