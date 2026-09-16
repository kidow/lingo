import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch17-2026-09-16/compose.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH17_STROKES, G2_GEOMETRY_BATCH17_DICTIONARY_GEOMETRY, loadG2GeometryBatch17DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch17.ts'
import { buildG2GeometryBatch17DictionaryBundle, G2_GEOMETRY_BATCH17_DICTIONARY_PROOF_PINS, validateG2GeometryBatch17DictionaryProofs, validateG2GeometryBatch17DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch17.ts'
import { dictionaryGeometry, dictionaryLocalGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch17-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  components?: DictionaryComponent[]; corpus: 'Components' | 'ZhHans'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH17_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 32 strokes from individually reviewed component candidates', () => {
  validateG2GeometryBatch17DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['騏',18,18],['乭',6,6],['旼',8,8]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH17_STROKES.reduce((n,e)=>n+e.paths.length,0),32)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH17_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes+1}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH17_STROKES)
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.ok(audit.entries.every(e=>e.playback==='dictionary-crosschecked'))

})









test('six licensed components retain their own fingerprints and layouts without approving related glyphs', () => {
  const sets: Record<string,[string,number][]> = { '騏':[['馬',10],['其',8]], '乭':[['石',5],['乙',1]], '旼':[['日',4],['文',4]] }
  for(const original of originals){
    assert.deepEqual(original.components!.map(p=>[p.glyph,p.medians.length]),sets[original.glyph])
    assert.deepEqual(compose(original.components!),original.medians)
    const changed=structuredClone(original.components!);changed[0].medians[0][0][0]+=1
    assert.throws(()=>compose(changed),/medians mismatch/)
    const badBox=structuredClone(original.components!);badBox[0].targetBox[2]=0
    assert.throws(()=>compose(badBox),/target box/)
  }
  for(const g of ['磻','裵','倂'])assert.equal(dictionaryLocalGeometry(g),undefined)
})
test('騏 starts with the 馬 vertical then horizontal and preserves the hook and four separated dots', () => {
  const a=points('騏',1),b=points('騏',2)
  assert.equal(a[0][0],a.at(-1)![0]);assert.ok(a.at(-1)![1]>a[0][1])
  assert.equal(b[0][1],b.at(-1)![1]);assert.ok(b.at(-1)![0]>b[0][0])
  for(const n of [2,3,4,6])assert.equal(separation(a,points('騏',n)),0)
  for(const n of [2,3,4,6])assert.equal(separation(points('騏',5),points('騏',n)),0)
  const hook=points('騏',6);assert.ok(hook.at(-1)![0]<hook.at(-2)![0]&&hook.at(-1)![1]<hook.at(-2)![1])
  for(let n=7;n<=10;n++){
    const dot=points('騏',n);assert.ok(dot.at(-1)![1]>dot[0][1])
    assert.ok(n===7?dot.at(-1)![0]<dot[0][0]:dot.at(-1)![0]>dot[0][0])
    assert.ok(separation(dot,hook)>5)
  }
  for(const n of [11,14,15,16])for(const stem of [12,13])assert.equal(separation(points('騏',n),points('騏',stem)),0)
  for(const n of [17,18])assert.ok(separation(points('騏',n),points('騏',16))>5)
})
test('乭 closes 石 and writes a separate right-left-bottom-upward 乙 hook', () => {
  const slash=points('乭',2)
  assert.ok(slash.at(-1)![0]<slash[0][0]&&slash.at(-1)![1]>slash[0][1])
  for(const n of [3,4])assert.equal(separation(points('乭',5),points('乭',n)),0)
  const hook=points('乭',6)
  assert.ok(hook[1][0]>hook[0][0]&&hook[1][1]===hook[0][1])
  assert.ok(hook.slice(2).some((p,i)=>p[0]<hook[i+1][0]&&p[1]>hook[i+1][1]))
  assert.ok(hook.slice(2).some((p,i)=>p[0]>hook[i+1][0]))
  assert.ok(hook.at(-1)![0]<hook.at(-2)![0]&&hook.at(-1)![1]<hook.at(-2)![1])
  for(let n=1;n<=5;n++)assert.ok(separation(hook,points('乭',n))>5)
})
test('旼 connects its vertical dot to 文 and starts both crossing sweeps on the bar', () => {
  const dot=points('旼',5),bar=points('旼',6)
  assert.ok(dot.every(p=>p[0]===dot[0][0]));assert.ok(dot.at(-1)![1]>dot[0][1])
  assert.equal(toPath(dot.at(-1)!,bar),0)
  for(const n of [7,8])assert.equal(toPath(points('旼',n)[0],bar),0)
  const left=points('旼',7),right=points('旼',8)
  assert.ok(left.at(-1)![0]<left[0][0]&&left.at(-1)![1]>left[0][1])
  assert.ok(right.at(-1)![0]>right[0][0]&&right.at(-1)![1]>right[0][1])
  assert.equal(separation(left,right),0)
  for(const n of [3,4])for(const side of [1,2])assert.equal(separation(points('旼',n),points('旼',side)),0)
})
test('all 196 source-observed contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["騏",1,2,true],["騏",1,3,true],["騏",1,4,true],["騏",1,5,false],["騏",1,6,true],["騏",1,7,false],["騏",1,8,false],["騏",1,9,false],["騏",1,10,false],["騏",1,11,false],["騏",1,12,false],["騏",1,13,false],["騏",1,14,false],["騏",1,15,false],["騏",1,16,false],["騏",1,17,false],["騏",1,18,false],["騏",2,3,false],["騏",2,4,false],["騏",2,5,true],["騏",2,6,false],["騏",2,7,false],["騏",2,8,false],["騏",2,9,false],["騏",2,10,false],["騏",2,11,false],["騏",2,12,false],["騏",2,13,false],["騏",2,14,false],["騏",2,15,false],["騏",2,16,false],["騏",2,17,false],["騏",2,18,false],["騏",3,4,false],["騏",3,5,true],["騏",3,6,false],["騏",3,7,false],["騏",3,8,false],["騏",3,9,false],["騏",3,10,false],["騏",3,11,false],["騏",3,12,false],["騏",3,13,false],["騏",3,14,false],["騏",3,15,false],["騏",3,16,false],["騏",3,17,false],["騏",3,18,false],["騏",4,5,true],["騏",4,6,false],["騏",4,7,false],["騏",4,8,false],["騏",4,9,false],["騏",4,10,false],["騏",4,11,false],["騏",4,12,false],["騏",4,13,false],["騏",4,14,false],["騏",4,15,false],["騏",4,16,false],["騏",4,17,false],["騏",4,18,false],["騏",5,6,true],["騏",5,7,false],["騏",5,8,false],["騏",5,9,false],["騏",5,10,false],["騏",5,11,false],["騏",5,12,false],["騏",5,13,false],["騏",5,14,false],["騏",5,15,false],["騏",5,16,false],["騏",5,17,false],["騏",5,18,false],["騏",6,7,false],["騏",6,8,false],["騏",6,9,false],["騏",6,10,false],["騏",6,11,false],["騏",6,12,false],["騏",6,13,false],["騏",6,14,false],["騏",6,15,false],["騏",6,16,false],["騏",6,17,false],["騏",6,18,false],["騏",7,8,false],["騏",7,9,false],["騏",7,10,false],["騏",7,11,false],["騏",7,12,false],["騏",7,13,false],["騏",7,14,false],["騏",7,15,false],["騏",7,16,false],["騏",7,17,false],["騏",7,18,false],["騏",8,9,false],["騏",8,10,false],["騏",8,11,false],["騏",8,12,false],["騏",8,13,false],["騏",8,14,false],["騏",8,15,false],["騏",8,16,false],["騏",8,17,false],["騏",8,18,false],["騏",9,10,false],["騏",9,11,false],["騏",9,12,false],["騏",9,13,false],["騏",9,14,false],["騏",9,15,false],["騏",9,16,false],["騏",9,17,false],["騏",9,18,false],["騏",10,11,false],["騏",10,12,false],["騏",10,13,false],["騏",10,14,false],["騏",10,15,false],["騏",10,16,false],["騏",10,17,false],["騏",10,18,false],["騏",11,12,true],["騏",11,13,true],["騏",11,14,false],["騏",11,15,false],["騏",11,16,false],["騏",11,17,false],["騏",11,18,false],["騏",12,13,false],["騏",12,14,true],["騏",12,15,true],["騏",12,16,true],["騏",12,17,false],["騏",12,18,false],["騏",13,14,true],["騏",13,15,true],["騏",13,16,true],["騏",13,17,false],["騏",13,18,false],["騏",14,15,false],["騏",14,16,false],["騏",14,17,false],["騏",14,18,false],["騏",15,16,false],["騏",15,17,false],["騏",15,18,false],["騏",16,17,false],["騏",16,18,false],["騏",17,18,false],["乭",1,2,true],["乭",1,3,false],["乭",1,4,false],["乭",1,5,false],["乭",1,6,false],["乭",2,3,true],["乭",2,4,true],["乭",2,5,false],["乭",2,6,false],["乭",3,4,true],["乭",3,5,true],["乭",3,6,false],["乭",4,5,true],["乭",4,6,false],["乭",5,6,false],["旼",1,2,true],["旼",1,3,true],["旼",1,4,true],["旼",1,5,false],["旼",1,6,false],["旼",1,7,false],["旼",1,8,false],["旼",2,3,true],["旼",2,4,true],["旼",2,5,false],["旼",2,6,false],["旼",2,7,false],["旼",2,8,false],["旼",3,4,false],["旼",3,5,false],["旼",3,6,false],["旼",3,7,false],["旼",3,8,false],["旼",4,5,false],["旼",4,6,false],["旼",4,7,false],["旼",4,8,false],["旼",5,6,true],["旼",5,7,false],["旼",5,8,false],["旼",6,7,true],["旼",6,8,true],["旼",7,8,true]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH17_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch17DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch17DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch17DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch17DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch17DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch17DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH17_STROKES.slice(1)),/published bundle/)
})
