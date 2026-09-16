import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch23-2026-09-17/compose.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH23_STROKES, G2_GEOMETRY_BATCH23_DICTIONARY_GEOMETRY, loadG2GeometryBatch23DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch23.ts'
import { buildG2GeometryBatch23DictionaryBundle, G2_GEOMETRY_BATCH23_DICTIONARY_PROOF_PINS, validateG2GeometryBatch23DictionaryProofs, validateG2GeometryBatch23DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch23.ts'
import { dictionaryGeometry, dictionaryLocalGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch23-2026-09-17/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  components?: DictionaryComponent[]; corpus: 'Components' | 'ZhHans'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH23_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 44 strokes from individually reviewed component candidates', () => {
  validateG2GeometryBatch23DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['晙',11,11],['埈',10,10],['瓚',23,23]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH23_STROKES.reduce((n,e)=>n+e.paths.length,0),44)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH23_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes+1}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH23_STROKES)
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.ok(audit.entries.every(e=>e.playback==='dictionary-crosschecked'))

})

test('twelve licensed components reconstruct the explicit layouts without approving related characters', () => {
  const sets:Record<string,[string,number][]>={'晙':[['日',4],['厶',2],['八',2],['夂',3]],'埈':[['土',3],['厶',2],['八',2],['夂',3]],'瓚':[['王',4],['先',6],['先',6],['貝',7]]}
  for(const original of originals){
    assert.deepEqual(original.components!.map(p=>[p.glyph,p.medians.length]),sets[original.glyph])
    assert.deepEqual(compose(original.components!),original.medians)
    const changed=structuredClone(original.components!);changed[0].medians[0][0][0]+=1
    assert.throws(()=>compose(changed),/medians mismatch/)
    const badBox=structuredClone(original.components!);badBox[0].targetBox[2]=0
    assert.throws(()=>compose(badBox),/target box/)
  }
  for(const g of ['日','厶','八','夂','土','王','先','貝','埰','爀','瀅'])assert.ok(!HANJA_DICTIONARY_G2_GEOMETRY_BATCH23_STROKES.some(e=>e.glyph===g))
})
test('晙 closes its narrow 日 and replaces the middle dot with a connected leg and separated terminal hook', () => {
  for(const n of [3,4])for(const side of [1,2])assert.equal(separation(points('晙',n),points('晙',side)),0)
  const top=points('晙',5),hook=points('晙',8),curve=points('晙',10),finish=points('晙',11)
  assert.ok(top[1][0]<top[0][0]&&top[1][1]>top[0][1])
  assert.ok(top.at(-1)![0]>top[1][0]&&top.at(-1)![1]<top[1][1])
  for(const n of [6,7,8])assert.ok(separation(top,points('晙',n))<=5)
  assert.ok(hook[1][1]>hook[0][1]&&hook.at(-1)![1]<hook.at(-2)![1])
  assert.ok(separation(hook,points('晙',6))>5)
  assert.ok(curve[1][0]>curve[0][0]&&curve.at(-1)![0]<curve[1][0]&&curve.at(-1)![1]>curve[1][1])
  assert.ok(finish.at(-1)![0]>finish[0][0]&&finish.at(-1)![1]>finish[0][1])
  for(const [a,b]of [[9,10],[9,11],[10,11]])assert.ok(separation(points('晙',a),points('晙',b))<=5)
})
test('埈 keeps the 土 rising baseline separate from the lower 夋 while preserving its independently reviewed hook and crossings', () => {
  const base=points('埈',3),hook=points('埈',7)
  assert.ok(base.at(-1)![0]>base[0][0]&&base.at(-1)![1]<base[0][1])
  for(const n of [1,3])assert.ok(separation(points('埈',2),points('埈',n))<=5)
  for(const n of [6,8,9,10])assert.ok(separation(base,points('埈',n))>5)
  for(const n of [5,6,7])assert.ok(separation(points('埈',4),points('埈',n))<=5)
  assert.ok(hook[1][1]>hook[0][1]&&hook.at(-1)![0]>hook.at(-2)![0]&&hook.at(-1)![1]<hook.at(-2)![1])
  assert.ok(separation(hook,points('埈',5))>5)
  for(const [a,b]of [[8,9],[8,10],[9,10]])assert.ok(separation(points('埈',a),points('埈',b))<=5)
})
test('瓚 distinguishes the first 先 rising stroke from the second hook and preserves the gaps around 貝', () => {
  const rise=points('瓚',4),first=points('瓚',10),second=points('瓚',16)
  assert.ok(rise.at(-1)![0]>rise[0][0]&&rise.at(-1)![1]<rise[0][1])
  assert.ok(first[1][1]>first[0][1]&&first[2][0]>first[1][0]&&first[2][1]<first[1][1])
  assert.ok(second[1][1]>second[0][1]&&second.at(-1)![1]<second.at(-2)![1])
  for(const [stem,top,bar,left,right]of [[7,6,8,9,10],[13,12,14,15,16]]){
    for(const n of [top,bar])assert.equal(separation(points('瓚',stem),points('瓚',n)),0)
    for(const n of [left,right]){
      assert.equal(separation(points('瓚',bar),points('瓚',n)),0)
      assert.ok(separation(points('瓚',stem),points('瓚',n))>5)
    }
  }
  for(const n of [19,20,21])for(const side of [17,18])assert.equal(separation(points('瓚',n),points('瓚',side)),0)
  for(const n of [22,23])for(const box of [17,18,19,20,21])assert.ok(separation(points('瓚',n),points('瓚',box))>5)
  const left=points('瓚',22),right=points('瓚',23)
  assert.ok(left.at(-1)![0]<left[0][0]&&left.at(-1)![1]>left[0][1])
  assert.ok(right.at(-1)![0]>right[0][0]&&right.at(-1)![1]>right[0][1])
})
test('all 353 source-observed contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["晙",1,2,true],["晙",1,3,true],["晙",1,4,true],["晙",1,5,false],["晙",1,6,false],["晙",1,7,false],["晙",1,8,false],["晙",1,9,false],["晙",1,10,false],["晙",1,11,false],["晙",2,3,true],["晙",2,4,true],["晙",2,5,false],["晙",2,6,false],["晙",2,7,false],["晙",2,8,false],["晙",2,9,false],["晙",2,10,false],["晙",2,11,false],["晙",3,4,false],["晙",3,5,false],["晙",3,6,false],["晙",3,7,false],["晙",3,8,false],["晙",3,9,false],["晙",3,10,false],["晙",3,11,false],["晙",4,5,false],["晙",4,6,false],["晙",4,7,false],["晙",4,8,false],["晙",4,9,false],["晙",4,10,false],["晙",4,11,false],["晙",5,6,true],["晙",5,7,true],["晙",5,8,true],["晙",5,9,false],["晙",5,10,false],["晙",5,11,false],["晙",6,7,false],["晙",6,8,false],["晙",6,9,false],["晙",6,10,false],["晙",6,11,false],["晙",7,8,false],["晙",7,9,false],["晙",7,10,false],["晙",7,11,false],["晙",8,9,false],["晙",8,10,false],["晙",8,11,false],["晙",9,10,true],["晙",9,11,true],["晙",10,11,true],["埈",1,2,true],["埈",1,3,false],["埈",1,4,false],["埈",1,5,false],["埈",1,6,false],["埈",1,7,false],["埈",1,8,false],["埈",1,9,false],["埈",1,10,false],["埈",2,3,true],["埈",2,4,false],["埈",2,5,false],["埈",2,6,false],["埈",2,7,false],["埈",2,8,false],["埈",2,9,false],["埈",2,10,false],["埈",3,4,false],["埈",3,5,false],["埈",3,6,false],["埈",3,7,false],["埈",3,8,false],["埈",3,9,false],["埈",3,10,false],["埈",4,5,true],["埈",4,6,true],["埈",4,7,true],["埈",4,8,false],["埈",4,9,false],["埈",4,10,false],["埈",5,6,false],["埈",5,7,false],["埈",5,8,false],["埈",5,9,false],["埈",5,10,false],["埈",6,7,false],["埈",6,8,false],["埈",6,9,false],["埈",6,10,false],["埈",7,8,false],["埈",7,9,false],["埈",7,10,false],["埈",8,9,true],["埈",8,10,true],["埈",9,10,true],["瓚",1,2,false],["瓚",1,3,true],["瓚",1,4,false],["瓚",1,5,false],["瓚",1,6,false],["瓚",1,7,false],["瓚",1,8,false],["瓚",1,9,false],["瓚",1,10,false],["瓚",1,11,false],["瓚",1,12,false],["瓚",1,13,false],["瓚",1,14,false],["瓚",1,15,false],["瓚",1,16,false],["瓚",1,17,false],["瓚",1,18,false],["瓚",1,19,false],["瓚",1,20,false],["瓚",1,21,false],["瓚",1,22,false],["瓚",1,23,false],["瓚",2,3,true],["瓚",2,4,false],["瓚",2,5,false],["瓚",2,6,false],["瓚",2,7,false],["瓚",2,8,false],["瓚",2,9,false],["瓚",2,10,false],["瓚",2,11,false],["瓚",2,12,false],["瓚",2,13,false],["瓚",2,14,false],["瓚",2,15,false],["瓚",2,16,false],["瓚",2,17,false],["瓚",2,18,false],["瓚",2,19,false],["瓚",2,20,false],["瓚",2,21,false],["瓚",2,22,false],["瓚",2,23,false],["瓚",3,4,true],["瓚",3,5,false],["瓚",3,6,false],["瓚",3,7,false],["瓚",3,8,false],["瓚",3,9,false],["瓚",3,10,false],["瓚",3,11,false],["瓚",3,12,false],["瓚",3,13,false],["瓚",3,14,false],["瓚",3,15,false],["瓚",3,16,false],["瓚",3,17,false],["瓚",3,18,false],["瓚",3,19,false],["瓚",3,20,false],["瓚",3,21,false],["瓚",3,22,false],["瓚",3,23,false],["瓚",4,5,false],["瓚",4,6,false],["瓚",4,7,false],["瓚",4,8,false],["瓚",4,9,false],["瓚",4,10,false],["瓚",4,11,false],["瓚",4,12,false],["瓚",4,13,false],["瓚",4,14,false],["瓚",4,15,false],["瓚",4,16,false],["瓚",4,17,false],["瓚",4,18,false],["瓚",4,19,false],["瓚",4,20,false],["瓚",4,21,false],["瓚",4,22,false],["瓚",4,23,false],["瓚",5,6,true],["瓚",5,7,false],["瓚",5,8,false],["瓚",5,9,false],["瓚",5,10,false],["瓚",5,11,false],["瓚",5,12,false],["瓚",5,13,false],["瓚",5,14,false],["瓚",5,15,false],["瓚",5,16,false],["瓚",5,17,false],["瓚",5,18,false],["瓚",5,19,false],["瓚",5,20,false],["瓚",5,21,false],["瓚",5,22,false],["瓚",5,23,false],["瓚",6,7,true],["瓚",6,8,false],["瓚",6,9,false],["瓚",6,10,false],["瓚",6,11,false],["瓚",6,12,false],["瓚",6,13,false],["瓚",6,14,false],["瓚",6,15,false],["瓚",6,16,false],["瓚",6,17,false],["瓚",6,18,false],["瓚",6,19,false],["瓚",6,20,false],["瓚",6,21,false],["瓚",6,22,false],["瓚",6,23,false],["瓚",7,8,true],["瓚",7,9,false],["瓚",7,10,false],["瓚",7,11,false],["瓚",7,12,false],["瓚",7,13,false],["瓚",7,14,false],["瓚",7,15,false],["瓚",7,16,false],["瓚",7,17,false],["瓚",7,18,false],["瓚",7,19,false],["瓚",7,20,false],["瓚",7,21,false],["瓚",7,22,false],["瓚",7,23,false],["瓚",8,9,true],["瓚",8,10,true],["瓚",8,11,false],["瓚",8,12,false],["瓚",8,13,false],["瓚",8,14,false],["瓚",8,15,false],["瓚",8,16,false],["瓚",8,17,false],["瓚",8,18,false],["瓚",8,19,false],["瓚",8,20,false],["瓚",8,21,false],["瓚",8,22,false],["瓚",8,23,false],["瓚",9,10,false],["瓚",9,11,false],["瓚",9,12,false],["瓚",9,13,false],["瓚",9,14,false],["瓚",9,15,false],["瓚",9,16,false],["瓚",9,17,false],["瓚",9,18,false],["瓚",9,19,false],["瓚",9,20,false],["瓚",9,21,false],["瓚",9,22,false],["瓚",9,23,false],["瓚",10,11,false],["瓚",10,12,false],["瓚",10,13,false],["瓚",10,14,false],["瓚",10,15,false],["瓚",10,16,false],["瓚",10,17,false],["瓚",10,18,false],["瓚",10,19,false],["瓚",10,20,false],["瓚",10,21,false],["瓚",10,22,false],["瓚",10,23,false],["瓚",11,12,true],["瓚",11,13,false],["瓚",11,14,false],["瓚",11,15,false],["瓚",11,16,false],["瓚",11,17,false],["瓚",11,18,false],["瓚",11,19,false],["瓚",11,20,false],["瓚",11,21,false],["瓚",11,22,false],["瓚",11,23,false],["瓚",12,13,true],["瓚",12,14,false],["瓚",12,15,false],["瓚",12,16,false],["瓚",12,17,false],["瓚",12,18,false],["瓚",12,19,false],["瓚",12,20,false],["瓚",12,21,false],["瓚",12,22,false],["瓚",12,23,false],["瓚",13,14,true],["瓚",13,15,false],["瓚",13,16,false],["瓚",13,17,false],["瓚",13,18,false],["瓚",13,19,false],["瓚",13,20,false],["瓚",13,21,false],["瓚",13,22,false],["瓚",13,23,false],["瓚",14,15,true],["瓚",14,16,true],["瓚",14,17,false],["瓚",14,18,false],["瓚",14,19,false],["瓚",14,20,false],["瓚",14,21,false],["瓚",14,22,false],["瓚",14,23,false],["瓚",15,16,false],["瓚",15,17,false],["瓚",15,18,false],["瓚",15,19,false],["瓚",15,20,false],["瓚",15,21,false],["瓚",15,22,false],["瓚",15,23,false],["瓚",16,17,false],["瓚",16,18,false],["瓚",16,19,false],["瓚",16,20,false],["瓚",16,21,false],["瓚",16,22,false],["瓚",16,23,false],["瓚",17,18,true],["瓚",17,19,true],["瓚",17,20,true],["瓚",17,21,true],["瓚",17,22,false],["瓚",17,23,false],["瓚",18,19,true],["瓚",18,20,true],["瓚",18,21,true],["瓚",18,22,false],["瓚",18,23,false],["瓚",19,20,false],["瓚",19,21,false],["瓚",19,22,false],["瓚",19,23,false],["瓚",20,21,false],["瓚",20,22,false],["瓚",20,23,false],["瓚",21,22,false],["瓚",21,23,false],["瓚",22,23,false]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH23_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch23DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch23DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch23DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch23DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch23DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch23DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH23_STROKES.slice(1)),/published bundle/)
})
