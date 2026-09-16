import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch19-2026-09-16/compose.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH19_STROKES, G2_GEOMETRY_BATCH19_DICTIONARY_GEOMETRY, loadG2GeometryBatch19DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch19.ts'
import { buildG2GeometryBatch19DictionaryBundle, G2_GEOMETRY_BATCH19_DICTIONARY_PROOF_PINS, validateG2GeometryBatch19DictionaryProofs, validateG2GeometryBatch19DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch19.ts'
import { dictionaryGeometry, dictionaryLocalGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch19-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  components?: DictionaryComponent[]; corpus: 'Components' | 'ZhHans'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH19_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 30 strokes from individually reviewed component candidates', () => {
  validateG2GeometryBatch19DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['昺',9,9],['昞',9,9],['揷',12,12]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH19_STROKES.reduce((n,e)=>n+e.paths.length,0),30)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH19_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes+1}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH19_STROKES)
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.ok(audit.entries.every(e=>e.playback==='dictionary-crosschecked'))

})











test('seven licensed components preserve fingerprints and layouts without approving related characters', () => {
  const sets:Record<string,[string,number][]>={'昺':[['日',4],['丙',5]],'昞':[['日',4],['丙',5]],'揷':[['扌',3],['千',3],['臼',6]]}
  for(const original of originals){
    assert.deepEqual(original.components!.map(p=>[p.glyph,p.medians.length]),sets[original.glyph])
    assert.deepEqual(compose(original.components!),original.medians)
    const changed=structuredClone(original.components!);changed[0].medians[0][0][0]+=1
    assert.throws(()=>compose(changed),/medians mismatch/)
    const badBox=structuredClone(original.components!);badBox[0].targetBox[2]=0
    assert.throws(()=>compose(badBox),/target box/)
  }
  for(const g of ['日','丙','扌','千','臼','晳','璿','卨'])assert.ok(!HANJA_DICTIONARY_G2_GEOMETRY_BATCH19_STROKES.some(e=>e.glyph===g))
})
test('昺 closes its upper 日 and writes a separate 丙 with an inner curve and left-up hook', () => {
  for(const n of [3,4])for(const side of [1,2])assert.equal(separation(points('昺',n),points('昺',side)),0)
  assert.ok(separation(points('昺',4),points('昺',5))>5)
  assert.ok(points('昺',5)[0][1]>points('昺',4)[0][1])
  const curve=points('昺',8),dot=points('昺',9),hook=points('昺',7)
  assert.equal(toPath(curve[0],points('昺',5)),0)
  assert.equal(separation(curve,hook),0)
  assert.ok(curve.at(-1)![0]<curve[0][0]&&curve.at(-1)![1]>curve[0][1])
  assert.ok(separation(curve,dot)<=5)
  assert.ok(dot.at(-1)![0]>dot[0][0]&&dot.at(-1)![1]>dot[0][1])
  assert.ok(hook.at(-1)![0]<hook.at(-2)![0]&&hook.at(-1)![1]<hook.at(-2)![1])
  assert.ok(separation(dot,hook)>5)
})
test('昞 keeps 日 to the left of 丙 and retains independently checked inner contacts', () => {
  const day=points('昞',2),top=points('昞',5),curve=points('昞',8),dot=points('昞',9),frame=points('昞',7)
  assert.ok(Math.max(...day.map(p=>p[0]))<Math.min(...top.map(p=>p[0])))
  for(const n of [3,4])for(const side of [1,2])assert.equal(separation(points('昞',n),points('昞',side)),0)
  assert.equal(toPath(curve[0],top),0);assert.equal(separation(curve,frame),0)
  assert.ok(curve.at(-1)![0]<curve[0][0]&&curve.at(-1)![1]>curve[0][1])
  assert.ok(separation(curve,dot)<=5)
  assert.ok(dot.at(-1)![0]>dot[0][0]&&dot.at(-1)![1]>dot[0][1])
  assert.ok(frame.at(-1)![0]<frame.at(-2)![0]&&frame.at(-1)![1]<frame.at(-2)![1])
  for(const n of [6,7])assert.ok(separation(top,points('昞',n))>5)
})
test('揷 extends the central stem to the 臼 baseline while preserving both internal gaps', () => {
  const stem=points('揷',6),base=points('揷',12),left=points('揷',8),right=points('揷',10)
  assert.ok(stem.every(p=>p[0]===stem[0][0]));assert.ok(stem.at(-1)![1]>stem[0][1])
  assert.ok(separation(stem,points('揷',4))<=5)
  assert.equal(separation(stem,points('揷',5)),0);assert.equal(separation(stem,base),0)
  for(const n of [7,8,9,10,11])assert.ok(separation(stem,points('揷',n))>5)
  assert.equal(separation(base,left),0);assert.equal(separation(base,right),0)
  assert.equal(separation(points('揷',9),left),0);assert.equal(separation(points('揷',11),right),0)
  const rise=points('揷',3),hook=points('揷',2)
  assert.ok(rise.at(-1)![0]>rise[0][0]&&rise.at(-1)![1]<rise[0][1])
  assert.equal(separation(rise,hook),0)
  assert.ok(hook.at(-1)![0]<hook.at(-2)![0]&&hook.at(-1)![1]<hook.at(-2)![1])
})
test('all 138 source-observed contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["昺",1,2,true],["昺",1,3,true],["昺",1,4,true],["昺",1,5,false],["昺",1,6,false],["昺",1,7,false],["昺",1,8,false],["昺",1,9,false],["昺",2,3,true],["昺",2,4,true],["昺",2,5,false],["昺",2,6,false],["昺",2,7,false],["昺",2,8,false],["昺",2,9,false],["昺",3,4,false],["昺",3,5,false],["昺",3,6,false],["昺",3,7,false],["昺",3,8,false],["昺",3,9,false],["昺",4,5,false],["昺",4,6,false],["昺",4,7,false],["昺",4,8,false],["昺",4,9,false],["昺",5,6,false],["昺",5,7,false],["昺",5,8,true],["昺",5,9,false],["昺",6,7,true],["昺",6,8,false],["昺",6,9,false],["昺",7,8,true],["昺",7,9,false],["昺",8,9,true],["昞",1,2,true],["昞",1,3,true],["昞",1,4,true],["昞",1,5,false],["昞",1,6,false],["昞",1,7,false],["昞",1,8,false],["昞",1,9,false],["昞",2,3,true],["昞",2,4,true],["昞",2,5,false],["昞",2,6,false],["昞",2,7,false],["昞",2,8,false],["昞",2,9,false],["昞",3,4,false],["昞",3,5,false],["昞",3,6,false],["昞",3,7,false],["昞",3,8,false],["昞",3,9,false],["昞",4,5,false],["昞",4,6,false],["昞",4,7,false],["昞",4,8,false],["昞",4,9,false],["昞",5,6,false],["昞",5,7,false],["昞",5,8,true],["昞",5,9,false],["昞",6,7,true],["昞",6,8,false],["昞",6,9,false],["昞",7,8,true],["昞",7,9,false],["昞",8,9,true],["揷",1,2,true],["揷",1,3,false],["揷",1,4,false],["揷",1,5,false],["揷",1,6,false],["揷",1,7,false],["揷",1,8,false],["揷",1,9,false],["揷",1,10,false],["揷",1,11,false],["揷",1,12,false],["揷",2,3,true],["揷",2,4,false],["揷",2,5,false],["揷",2,6,false],["揷",2,7,false],["揷",2,8,false],["揷",2,9,false],["揷",2,10,false],["揷",2,11,false],["揷",2,12,false],["揷",3,4,false],["揷",3,5,false],["揷",3,6,false],["揷",3,7,false],["揷",3,8,false],["揷",3,9,false],["揷",3,10,false],["揷",3,11,false],["揷",3,12,false],["揷",4,5,false],["揷",4,6,true],["揷",4,7,false],["揷",4,8,false],["揷",4,9,false],["揷",4,10,false],["揷",4,11,false],["揷",4,12,false],["揷",5,6,true],["揷",5,7,false],["揷",5,8,false],["揷",5,9,false],["揷",5,10,false],["揷",5,11,false],["揷",5,12,false],["揷",6,7,false],["揷",6,8,false],["揷",6,9,false],["揷",6,10,false],["揷",6,11,false],["揷",6,12,true],["揷",7,8,true],["揷",7,9,false],["揷",7,10,false],["揷",7,11,false],["揷",7,12,false],["揷",8,9,true],["揷",8,10,false],["揷",8,11,false],["揷",8,12,true],["揷",9,10,false],["揷",9,11,false],["揷",9,12,false],["揷",10,11,true],["揷",10,12,true],["揷",11,12,false]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH19_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch19DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch19DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch19DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch19DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch19DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch19DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH19_STROKES.slice(1)),/published bundle/)
})
