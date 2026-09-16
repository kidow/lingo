import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch22-2026-09-17/compose.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH22_STROKES, G2_GEOMETRY_BATCH22_DICTIONARY_GEOMETRY, loadG2GeometryBatch22DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch22.ts'
import { buildG2GeometryBatch22DictionaryBundle, G2_GEOMETRY_BATCH22_DICTIONARY_PROOF_PINS, validateG2GeometryBatch22DictionaryProofs, validateG2GeometryBatch22DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch22.ts'
import { dictionaryGeometry, dictionaryLocalGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch22-2026-09-17/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  components?: DictionaryComponent[]; corpus: 'Components' | 'ZhHans'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH22_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 40 strokes from individually reviewed component candidates', () => {
  validateG2GeometryBatch22DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['鈗',12,12],['鎰',18,18],['曺',10,10]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH22_STROKES.reduce((n,e)=>n+e.paths.length,0),40)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH22_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes+1}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH22_STROKES)
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.ok(audit.entries.every(e=>e.playback==='dictionary-crosschecked'))

})

test('seven licensed components reconstruct the explicit layouts without approving related characters', () => {
  const sets:Record<string,[string,number][]>={'鈗':[['金',8],['允',4]],'鎰':[['金',8],['益',10]],'曺':[['一',1],['由',5],['日',4]]}
  for(const original of originals){
    assert.deepEqual(original.components!.map(p=>[p.glyph,p.medians.length]),sets[original.glyph])
    assert.deepEqual(compose(original.components!),original.medians)
    const changed=structuredClone(original.components!);changed[0].medians[0][0][0]+=1
    assert.throws(()=>compose(changed),/medians mismatch/)
    const badBox=structuredClone(original.components!);badBox[0].targetBox[2]=0
    assert.throws(()=>compose(badBox),/target box/)
  }
  for(const g of ['金','允','益','一','由','日','晙','埈','瓚'])assert.ok(!HANJA_DICTIONARY_G2_GEOMETRY_BATCH22_STROKES.some(e=>e.glyph===g))
})
test('鈗 keeps the 厶 corner and 儿 hook while both 金 radicals retain individually observed gaps', () => {
  for(const glyph of ['鈗','鎰']){
    const dot=points(glyph,6),rise=points(glyph,8)
    assert.ok(dot.at(-1)![0]>dot[0][0]&&dot.at(-1)![1]>dot[0][1])
    for(const n of [5,7,8])assert.ok(separation(dot,points(glyph,n))>5)
    assert.ok(rise.at(-1)![0]>rise[0][0]&&rise.at(-1)![1]<rise[0][1])
    assert.ok(separation(rise,points(glyph,5))<=5)
    assert.ok(separation(points(glyph,1),points(glyph,3))<=5)
  }
  const corner=points('鈗',9),sweep=points('鈗',11),hook=points('鈗',12)
  assert.ok(corner[1][0]<corner[0][0]&&corner[1][1]>corner[0][1])
  assert.ok(corner.at(-1)![0]>corner[1][0]&&corner.at(-1)![1]<corner[1][1])
  assert.ok(separation(corner,points('鈗',10))<=5)
  for(const n of [11,12])for(const upper of [9,10])assert.ok(separation(points('鈗',n),points('鈗',upper))>5)
  assert.ok(sweep.at(-1)![0]<sweep[0][0]&&sweep.at(-1)![1]>sweep[0][1])
  assert.ok(hook.at(-1)![0]>hook.at(-2)![0]&&hook.at(-1)![1]<hook.at(-2)![1])
  assert.ok(separation(sweep,hook)>5)
})
test('鎰 corrects both upper right-stroke starts and preserves the detached upper groups above a closed 皿', () => {
  for(const n of [9,12]){
    const path=points('鎰',n)
    assert.ok(path.at(-1)![0]<path[0][0]&&path.at(-1)![1]>path[0][1])
  }
  for(const n of [10,13]){
    const path=points('鎰',n)
    assert.ok(path[1][0]>path[0][0]&&path[1][1]<path[0][1])
    assert.ok(path.at(-1)![0]>path[1][0]&&path.at(-1)![1]>path[1][1])
  }
  for(const [a,b]of [[9,10],[9,11],[10,11],[11,12],[11,13],[12,13],[12,14],[13,15]])
    assert.ok(separation(points('鎰',a),points('鎰',b))>5)
  for(const n of [14,16,17]){
    assert.equal(separation(points('鎰',n),points('鎰',15)),0)
    assert.equal(separation(points('鎰',n),points('鎰',18)),0)
  }
  assert.equal(separation(points('鎰',15),points('鎰',18)),0)
  const base=points('鎰',18)
  assert.ok(base[0][0]<points('鎰',14)[0][0]&&base.at(-1)![0]>points('鎰',15).at(-1)![0])
})
test('曺 writes the central stem fifth through the upper frame and keeps the lower 日 separate', () => {
  const stem=points('曺',5)
  assert.ok(stem.every(p=>p[0]===stem[0][0])&&stem.at(-1)![1]>stem[0][1])
  for(const n of [1,3,4,6])assert.equal(separation(stem,points('曺',n)),0)
  for(const n of [2,3])assert.ok(separation(points('曺',1),points('曺',n))>5)
  for(const n of [4,6])for(const side of [2,3])assert.equal(separation(points('曺',n),points('曺',side)),0)
  for(const n of [9,10])for(const side of [7,8])assert.equal(separation(points('曺',n),points('曺',side)),0)
  for(const upper of [2,3,5,6])for(const lower of [7,8])assert.ok(separation(points('曺',upper),points('曺',lower))>5)
})
test('all 264 source-observed contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["鈗",1,2,true],["鈗",1,3,true],["鈗",1,4,false],["鈗",1,5,false],["鈗",1,6,false],["鈗",1,7,false],["鈗",1,8,false],["鈗",1,9,false],["鈗",1,10,false],["鈗",1,11,false],["鈗",1,12,false],["鈗",2,3,false],["鈗",2,4,false],["鈗",2,5,false],["鈗",2,6,false],["鈗",2,7,false],["鈗",2,8,false],["鈗",2,9,false],["鈗",2,10,false],["鈗",2,11,false],["鈗",2,12,false],["鈗",3,4,false],["鈗",3,5,true],["鈗",3,6,false],["鈗",3,7,false],["鈗",3,8,false],["鈗",3,9,false],["鈗",3,10,false],["鈗",3,11,false],["鈗",3,12,false],["鈗",4,5,true],["鈗",4,6,false],["鈗",4,7,false],["鈗",4,8,false],["鈗",4,9,false],["鈗",4,10,false],["鈗",4,11,false],["鈗",4,12,false],["鈗",5,6,false],["鈗",5,7,true],["鈗",5,8,true],["鈗",5,9,false],["鈗",5,10,false],["鈗",5,11,false],["鈗",5,12,false],["鈗",6,7,false],["鈗",6,8,false],["鈗",6,9,false],["鈗",6,10,false],["鈗",6,11,false],["鈗",6,12,false],["鈗",7,8,false],["鈗",7,9,false],["鈗",7,10,false],["鈗",7,11,false],["鈗",7,12,false],["鈗",8,9,false],["鈗",8,10,false],["鈗",8,11,false],["鈗",8,12,false],["鈗",9,10,true],["鈗",9,11,false],["鈗",9,12,false],["鈗",10,11,false],["鈗",10,12,false],["鈗",11,12,false],["鎰",1,2,true],["鎰",1,3,true],["鎰",1,4,false],["鎰",1,5,false],["鎰",1,6,false],["鎰",1,7,false],["鎰",1,8,false],["鎰",1,9,false],["鎰",1,10,false],["鎰",1,11,false],["鎰",1,12,false],["鎰",1,13,false],["鎰",1,14,false],["鎰",1,15,false],["鎰",1,16,false],["鎰",1,17,false],["鎰",1,18,false],["鎰",2,3,false],["鎰",2,4,false],["鎰",2,5,false],["鎰",2,6,false],["鎰",2,7,false],["鎰",2,8,false],["鎰",2,9,false],["鎰",2,10,false],["鎰",2,11,false],["鎰",2,12,false],["鎰",2,13,false],["鎰",2,14,false],["鎰",2,15,false],["鎰",2,16,false],["鎰",2,17,false],["鎰",2,18,false],["鎰",3,4,false],["鎰",3,5,true],["鎰",3,6,false],["鎰",3,7,false],["鎰",3,8,false],["鎰",3,9,false],["鎰",3,10,false],["鎰",3,11,false],["鎰",3,12,false],["鎰",3,13,false],["鎰",3,14,false],["鎰",3,15,false],["鎰",3,16,false],["鎰",3,17,false],["鎰",3,18,false],["鎰",4,5,true],["鎰",4,6,false],["鎰",4,7,false],["鎰",4,8,false],["鎰",4,9,false],["鎰",4,10,false],["鎰",4,11,false],["鎰",4,12,false],["鎰",4,13,false],["鎰",4,14,false],["鎰",4,15,false],["鎰",4,16,false],["鎰",4,17,false],["鎰",4,18,false],["鎰",5,6,false],["鎰",5,7,true],["鎰",5,8,true],["鎰",5,9,false],["鎰",5,10,false],["鎰",5,11,false],["鎰",5,12,false],["鎰",5,13,false],["鎰",5,14,false],["鎰",5,15,false],["鎰",5,16,false],["鎰",5,17,false],["鎰",5,18,false],["鎰",6,7,false],["鎰",6,8,false],["鎰",6,9,false],["鎰",6,10,false],["鎰",6,11,false],["鎰",6,12,false],["鎰",6,13,false],["鎰",6,14,false],["鎰",6,15,false],["鎰",6,16,false],["鎰",6,17,false],["鎰",6,18,false],["鎰",7,8,false],["鎰",7,9,false],["鎰",7,10,false],["鎰",7,11,false],["鎰",7,12,false],["鎰",7,13,false],["鎰",7,14,false],["鎰",7,15,false],["鎰",7,16,false],["鎰",7,17,false],["鎰",7,18,false],["鎰",8,9,false],["鎰",8,10,false],["鎰",8,11,false],["鎰",8,12,false],["鎰",8,13,false],["鎰",8,14,false],["鎰",8,15,false],["鎰",8,16,false],["鎰",8,17,false],["鎰",8,18,false],["鎰",9,10,false],["鎰",9,11,false],["鎰",9,12,false],["鎰",9,13,false],["鎰",9,14,false],["鎰",9,15,false],["鎰",9,16,false],["鎰",9,17,false],["鎰",9,18,false],["鎰",10,11,false],["鎰",10,12,false],["鎰",10,13,false],["鎰",10,14,false],["鎰",10,15,false],["鎰",10,16,false],["鎰",10,17,false],["鎰",10,18,false],["鎰",11,12,false],["鎰",11,13,false],["鎰",11,14,false],["鎰",11,15,false],["鎰",11,16,false],["鎰",11,17,false],["鎰",11,18,false],["鎰",12,13,false],["鎰",12,14,false],["鎰",12,15,false],["鎰",12,16,false],["鎰",12,17,false],["鎰",12,18,false],["鎰",13,14,false],["鎰",13,15,false],["鎰",13,16,false],["鎰",13,17,false],["鎰",13,18,false],["鎰",14,15,true],["鎰",14,16,false],["鎰",14,17,false],["鎰",14,18,true],["鎰",15,16,true],["鎰",15,17,true],["鎰",15,18,true],["鎰",16,17,false],["鎰",16,18,true],["鎰",17,18,true],["曺",1,2,false],["曺",1,3,false],["曺",1,4,false],["曺",1,5,true],["曺",1,6,false],["曺",1,7,false],["曺",1,8,false],["曺",1,9,false],["曺",1,10,false],["曺",2,3,true],["曺",2,4,true],["曺",2,5,false],["曺",2,6,true],["曺",2,7,false],["曺",2,8,false],["曺",2,9,false],["曺",2,10,false],["曺",3,4,true],["曺",3,5,true],["曺",3,6,true],["曺",3,7,false],["曺",3,8,false],["曺",3,9,false],["曺",3,10,false],["曺",4,5,true],["曺",4,6,false],["曺",4,7,false],["曺",4,8,false],["曺",4,9,false],["曺",4,10,false],["曺",5,6,true],["曺",5,7,false],["曺",5,8,false],["曺",5,9,false],["曺",5,10,false],["曺",6,7,false],["曺",6,8,false],["曺",6,9,false],["曺",6,10,false],["曺",7,8,true],["曺",7,9,true],["曺",7,10,true],["曺",8,9,true],["曺",8,10,true],["曺",9,10,false]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH22_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch22DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch22DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch22DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch22DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch22DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch22DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH22_STROKES.slice(1)),/published bundle/)
})
