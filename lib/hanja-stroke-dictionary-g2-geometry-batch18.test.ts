import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch18-2026-09-16/compose.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH18_STROKES, G2_GEOMETRY_BATCH18_DICTIONARY_GEOMETRY, loadG2GeometryBatch18DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch18.ts'
import { buildG2GeometryBatch18DictionaryBundle, G2_GEOMETRY_BATCH18_DICTIONARY_PROOF_PINS, validateG2GeometryBatch18DictionaryProofs, validateG2GeometryBatch18DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch18.ts'
import { dictionaryGeometry, dictionaryLocalGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch18-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  components?: DictionaryComponent[]; corpus: 'Components' | 'ZhHans'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH18_STROKES.find(e => e.glyph === glyph)!
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
  validateG2GeometryBatch18DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['磻',17,17],['裵',14,14],['倂',10,10]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH18_STROKES.reduce((n,e)=>n+e.paths.length,0),41)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH18_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes+1}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH18_STROKES)
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.ok(audit.entries.every(e=>e.playback==='dictionary-crosschecked'))

})










test('seven licensed components preserve fingerprints and layouts without approving related characters', () => {
  const sets:Record<string,[string,number][]>={'磻':[['石',5],['番',12]],'裵':[['非',8],['衣',6]],'倂':[['亻',2],['午',4],['午',4]]}
  for(const original of originals){
    assert.deepEqual(original.components!.map(p=>[p.glyph,p.medians.length]),sets[original.glyph])
    assert.deepEqual(compose(original.components!),original.medians)
    const changed=structuredClone(original.components!);changed[0].medians[0][0][0]+=1
    assert.throws(()=>compose(changed),/medians mismatch/)
    const badBox=structuredClone(original.components!);badBox[0].targetBox[2]=0
    assert.throws(()=>compose(badBox),/target box/)
  }
  for(const g of ['石','番','非','衣','亻','午','昺','昞','揷'])assert.ok(!HANJA_DICTIONARY_G2_GEOMETRY_BATCH18_STROKES.some(e=>e.glyph===g))
})
test('磻 keeps 番 dots separate from the top sweep and closes all 田 edges', () => {
  const top=points('磻',6),left=points('磻',7),right=points('磻',8),stem=points('磻',10)
  assert.ok(top.at(-1)![0]<top[0][0]&&top.at(-1)![1]>top[0][1])
  assert.ok(left.at(-1)![0]>left[0][0]&&left.at(-1)![1]>left[0][1])
  assert.ok(right.at(-1)![0]<right[0][0]&&right.at(-1)![1]>right[0][1])
  assert.equal(toPath(stem[0],top)<5,true)
  for(const dot of [7,8]){
    assert.ok(separation(points('磻',dot),top)>5)
    assert.equal(separation(points('磻',dot),points('磻',9)),0)
  }
  assert.ok(separation(points('磻',11),points('磻',12))>5)
  for(const n of [13,14,16])assert.equal(separation(points('磻',17),points('磻',n)),0)
  for(const n of [13,14,16])assert.equal(separation(points('磻',15),points('磻',n)),0)
  assert.ok(separation(points('磻',10),points('磻',14))>5)
})
test('裵 moves the 衣 head ahead of 非 and retains independent stems and lower folds', () => {
  const recipe=JSON.parse(read(dir+'proposals.json'))['裵'] as {derivedFromStroke:number}[]
  assert.deepEqual(recipe.map(r=>r.derivedFromStroke),[9,10,1,2,3,4,5,6,7,8,11,12,13,14])
  const dot=points('裵',1),leftStem=points('裵',3),rightStem=points('裵',7)
  assert.ok(dot.every(p=>p[0]===dot[0][0]));assert.ok(dot.at(-1)![1]>dot[0][1])
  assert.equal(separation(dot,points('裵',2)),0)
  assert.ok(leftStem.at(-1)![0]<leftStem[0][0]&&leftStem.at(-1)![1]>leftStem[0][1])
  for(const n of [3,7])assert.ok(separation(points('裵',n),points('裵',2))>5)
  for(const n of [4,5,6])assert.ok(separation(leftStem,points('裵',n))<=5)
  for(const n of [8,9,10])assert.equal(separation(rightStem,points('裵',n)),0)
  const fold=points('裵',12)
  assert.ok(fold[1][1]>fold[0][1]&&fold[1][0]===fold[0][0])
  assert.ok(fold[2][1]<fold[1][1]&&fold[2][0]>fold[1][0])
  assert.ok(separation(fold,points('裵',11))<=5)
  assert.ok(separation(points('裵',13),points('裵',14))<=5)
})
test('倂 uses the full-glyph curved left stem and two meeting upper bars', () => {
  const curve=points('倂',6),right=points('倂',10),rise=points('倂',5)
  assert.ok(curve.at(-1)![0]<curve[0][0]&&curve.at(-1)![1]>curve[0][1])
  assert.equal(toPath(curve.at(-1)!,points('倂',2)),0)
  assert.ok(curve.some(p=>p[0]>curve[0][0]))
  assert.equal(separation(points('倂',4),points('倂',8)),0)
  assert.ok(rise.at(-1)![0]>rise[0][0]&&rise.at(-1)![1]<rise[0][1])
  assert.equal(separation(rise,curve),0)
  assert.ok(right.every(p=>p[0]===right[0][0]));assert.ok(right.at(-1)![1]>right[0][1])
  for(const n of [8,9])assert.equal(separation(right,points('倂',n)),0)
})
test('all 272 source-observed contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["磻",1,2,true],["磻",1,3,false],["磻",1,4,false],["磻",1,5,false],["磻",1,6,false],["磻",1,7,false],["磻",1,8,false],["磻",1,9,false],["磻",1,10,false],["磻",1,11,false],["磻",1,12,false],["磻",1,13,false],["磻",1,14,false],["磻",1,15,false],["磻",1,16,false],["磻",1,17,false],["磻",2,3,true],["磻",2,4,true],["磻",2,5,false],["磻",2,6,false],["磻",2,7,false],["磻",2,8,false],["磻",2,9,false],["磻",2,10,false],["磻",2,11,false],["磻",2,12,false],["磻",2,13,false],["磻",2,14,false],["磻",2,15,false],["磻",2,16,false],["磻",2,17,false],["磻",3,4,true],["磻",3,5,true],["磻",3,6,false],["磻",3,7,false],["磻",3,8,false],["磻",3,9,false],["磻",3,10,false],["磻",3,11,false],["磻",3,12,false],["磻",3,13,false],["磻",3,14,false],["磻",3,15,false],["磻",3,16,false],["磻",3,17,false],["磻",4,5,true],["磻",4,6,false],["磻",4,7,false],["磻",4,8,false],["磻",4,9,false],["磻",4,10,false],["磻",4,11,false],["磻",4,12,false],["磻",4,13,false],["磻",4,14,false],["磻",4,15,false],["磻",4,16,false],["磻",4,17,false],["磻",5,6,false],["磻",5,7,false],["磻",5,8,false],["磻",5,9,false],["磻",5,10,false],["磻",5,11,false],["磻",5,12,false],["磻",5,13,false],["磻",5,14,false],["磻",5,15,false],["磻",5,16,false],["磻",5,17,false],["磻",6,7,false],["磻",6,8,false],["磻",6,9,false],["磻",6,10,true],["磻",6,11,false],["磻",6,12,false],["磻",6,13,false],["磻",6,14,false],["磻",6,15,false],["磻",6,16,false],["磻",6,17,false],["磻",7,8,false],["磻",7,9,true],["磻",7,10,false],["磻",7,11,false],["磻",7,12,false],["磻",7,13,false],["磻",7,14,false],["磻",7,15,false],["磻",7,16,false],["磻",7,17,false],["磻",8,9,true],["磻",8,10,false],["磻",8,11,false],["磻",8,12,false],["磻",8,13,false],["磻",8,14,false],["磻",8,15,false],["磻",8,16,false],["磻",8,17,false],["磻",9,10,true],["磻",9,11,true],["磻",9,12,true],["磻",9,13,false],["磻",9,14,false],["磻",9,15,false],["磻",9,16,false],["磻",9,17,false],["磻",10,11,true],["磻",10,12,true],["磻",10,13,false],["磻",10,14,false],["磻",10,15,false],["磻",10,16,false],["磻",10,17,false],["磻",11,12,false],["磻",11,13,false],["磻",11,14,false],["磻",11,15,false],["磻",11,16,false],["磻",11,17,false],["磻",12,13,false],["磻",12,14,false],["磻",12,15,false],["磻",12,16,false],["磻",12,17,false],["磻",13,14,true],["磻",13,15,true],["磻",13,16,false],["磻",13,17,true],["磻",14,15,true],["磻",14,16,true],["磻",14,17,true],["磻",15,16,true],["磻",15,17,false],["磻",16,17,true],["裵",1,2,true],["裵",1,3,false],["裵",1,4,false],["裵",1,5,false],["裵",1,6,false],["裵",1,7,false],["裵",1,8,false],["裵",1,9,false],["裵",1,10,false],["裵",1,11,false],["裵",1,12,false],["裵",1,13,false],["裵",1,14,false],["裵",2,3,false],["裵",2,4,false],["裵",2,5,false],["裵",2,6,false],["裵",2,7,false],["裵",2,8,false],["裵",2,9,false],["裵",2,10,false],["裵",2,11,false],["裵",2,12,false],["裵",2,13,false],["裵",2,14,false],["裵",3,4,true],["裵",3,5,true],["裵",3,6,true],["裵",3,7,false],["裵",3,8,false],["裵",3,9,false],["裵",3,10,false],["裵",3,11,false],["裵",3,12,false],["裵",3,13,false],["裵",3,14,false],["裵",4,5,false],["裵",4,6,false],["裵",4,7,false],["裵",4,8,false],["裵",4,9,false],["裵",4,10,false],["裵",4,11,false],["裵",4,12,false],["裵",4,13,false],["裵",4,14,false],["裵",5,6,false],["裵",5,7,false],["裵",5,8,false],["裵",5,9,false],["裵",5,10,false],["裵",5,11,false],["裵",5,12,false],["裵",5,13,false],["裵",5,14,false],["裵",6,7,false],["裵",6,8,false],["裵",6,9,false],["裵",6,10,false],["裵",6,11,false],["裵",6,12,false],["裵",6,13,false],["裵",6,14,false],["裵",7,8,true],["裵",7,9,true],["裵",7,10,true],["裵",7,11,false],["裵",7,12,false],["裵",7,13,false],["裵",7,14,false],["裵",8,9,false],["裵",8,10,false],["裵",8,11,false],["裵",8,12,false],["裵",8,13,false],["裵",8,14,false],["裵",9,10,false],["裵",9,11,false],["裵",9,12,false],["裵",9,13,false],["裵",9,14,false],["裵",10,11,false],["裵",10,12,false],["裵",10,13,false],["裵",10,14,false],["裵",11,12,true],["裵",11,13,false],["裵",11,14,false],["裵",12,13,false],["裵",12,14,false],["裵",13,14,true],["倂",1,2,true],["倂",1,3,false],["倂",1,4,false],["倂",1,5,false],["倂",1,6,false],["倂",1,7,false],["倂",1,8,false],["倂",1,9,false],["倂",1,10,false],["倂",2,3,false],["倂",2,4,false],["倂",2,5,false],["倂",2,6,true],["倂",2,7,false],["倂",2,8,false],["倂",2,9,false],["倂",2,10,false],["倂",3,4,true],["倂",3,5,false],["倂",3,6,true],["倂",3,7,false],["倂",3,8,false],["倂",3,9,false],["倂",3,10,false],["倂",4,5,false],["倂",4,6,true],["倂",4,7,false],["倂",4,8,true],["倂",4,9,false],["倂",4,10,false],["倂",5,6,true],["倂",5,7,false],["倂",5,8,false],["倂",5,9,false],["倂",5,10,false],["倂",6,7,false],["倂",6,8,false],["倂",6,9,false],["倂",6,10,false],["倂",7,8,true],["倂",7,9,false],["倂",7,10,true],["倂",8,9,false],["倂",8,10,true],["倂",9,10,true]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH18_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch18DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch18DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch18DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch18DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch18DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch18DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH18_STROKES.slice(1)),/published bundle/)
})
