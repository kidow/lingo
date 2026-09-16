import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch14-2026-09-16/compose.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH14_STROKES, G2_GEOMETRY_BATCH14_DICTIONARY_GEOMETRY, loadG2GeometryBatch14DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch14.ts'
import { buildG2GeometryBatch14DictionaryBundle, G2_GEOMETRY_BATCH14_DICTIONARY_PROOF_PINS, validateG2GeometryBatch14DictionaryProofs, validateG2GeometryBatch14DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch14.ts'
import { dictionaryGeometry, dictionaryLocalGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch14-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  components?: DictionaryComponent[]; corpus: 'Components' | 'ZhHans'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH14_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 41 strokes from alternate-corpus and component candidates', () => {
  validateG2GeometryBatch14DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['塏',13,13],['璟',16,16],['琯',12,12]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH14_STROKES.reduce((n,e)=>n+e.paths.length,0),41)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH14_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes+1}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH14_STROKES)
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.ok(audit.entries.every(e=>e.playback==='dictionary-crosschecked'))

})









test('塏 component candidates reconstruct from pinned 土 and 豈 geometry without approving related characters', () => {
  assert.ok(!HANJA_DICTIONARY_G2_GEOMETRY_BATCH14_STROKES.some(e=>e.glyph==='騏'))
  const original=originals.find(e=>e.glyph==='塏')!
  assert.deepEqual(original.components!.map(p=>[p.glyph,p.medians.length]),[['土',3],['豈',10]])
  assert.deepEqual(compose(original.components!),original.medians)
  const changed=structuredClone(original.components!)
  changed[0].medians[0][0][0]+=1
  assert.throws(()=>compose(changed),/medians mismatch/)
  const badBox=structuredClone(original.components!);badBox[0].targetBox[2]=0
  assert.throws(()=>compose(badBox),/target box/)
  for(const g of ['土','豈','塤'])assert.equal(dictionaryLocalGeometry(g),undefined)
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
test('塏 joins 山 corners and leaves the lower-left dot separate from the final baseline', () => {
  const fold=points('塏',5)
  assert.equal(fold[0][0],fold[1][0]);assert.ok(fold[1][1]>fold[0][1])
  assert.equal(fold[1][1],fold[2][1]);assert.ok(fold[2][0]>fold[1][0])
  for(const n of [4,6])assert.equal(separation(fold,points('塏',n)),0)
  assert.ok(separation(fold,points('塏',7))>5)
  for(const n of [8,9])assert.equal(separation(points('塏',10),points('塏',n)),0)
  for(const n of [8,9,10,12,13])assert.ok(separation(points('塏',11),points('塏',n))>5)
  const left=points('塏',11),right=points('塏',12)
  for(let i=1;i<left.length;i++)assert.ok(left[i][0]>left[i-1][0]&&left[i][1]>left[i-1][1])
  for(let i=1;i<right.length;i++)assert.ok(right[i][0]<right[i-1][0]&&right[i][1]>right[i-1][1])
  assert.equal(toPath(right.at(-1)!,points('塏',13)),0)
})
test('璟 and 琯 use independently reviewed 王 horizontal, vertical and rising connections', () => {
  for(const g of ['璟','琯']){
    const vertical=points(g,3)
    assert.equal(vertical[0][0],vertical.at(-1)![0]);assert.ok(vertical.at(-1)![1]>vertical[0][1])
    for(const n of [1,2]){
      const bar=points(g,n)
      assert.equal(bar[0][1],bar.at(-1)![1]);assert.ok(bar.at(-1)![0]>bar[0][0])
      assert.equal(separation(vertical,bar),0)
    }
    const rise=points(g,4);assert.ok(rise.at(-1)![0]>rise[0][0]&&rise.at(-1)![1]<rise[0][1])
    assert.equal(separation(vertical,rise),0)
  }
})
test('璟 closes 日 and its lower box, replaces the center dot with a vertical and hooks left-up', () => {
  for(const [left,roof,bars]of [[5,6,[7,8]],[11,12,[13]]] as const){
    for(const n of bars){assert.equal(separation(points('璟',n),points('璟',left)),0);assert.equal(separation(points('璟',n),points('璟',roof)),0)}
  }
  const dot=points('璟',9),hook=points('璟',14)
  assert.equal(dot[0][0],dot.at(-1)![0]);assert.ok(dot.at(-1)![1]>dot[0][1])
  assert.ok(separation(dot,points('璟',8))>5&&separation(dot,points('璟',10))<=5)
  assert.equal(toPath(hook[0],points('璟',13)),0)
  assert.ok(hook.at(-1)![0]<hook.at(-2)![0]&&hook.at(-1)![1]<hook.at(-2)![1])
  for(const[n,side]of [[15,-1],[16,1]]){
    const p=points('璟',n)
    for(let i=1;i<p.length;i++)assert.ok(side*(p[i][0]-p[i-1][0])>0&&p[i][1]>p[i-1][1])
    assert.ok(separation(p,hook)>5&&separation(p,points('璟',11))>5&&separation(p,points('璟',13))>5)
  }
})
test('琯 joins the vertical roof dot and side stroke, then closes two separated inner boxes', () => {
  const dot=points('琯',5),roof=points('琯',7),left=points('琯',8)
  assert.equal(dot[0][0],dot.at(-1)![0]);assert.ok(dot.at(-1)![1]>dot[0][1])
  assert.equal(separation(dot,roof),0);assert.ok(separation(roof,points('琯',6))<=5)
  assert.ok(roof[1][0]>roof[0][0]&&roof[1][1]===roof[0][1]);assert.ok(roof[2][0]<roof[1][0]&&roof[2][1]>roof[1][1])
  for(const n of [9,10,11,12])assert.equal(separation(left,points('琯',n)),0)
  for(const[fold,bottom]of [[9,10],[11,12]])assert.equal(separation(points('琯',fold),points('琯',bottom)),0)
  assert.ok(separation(points('琯',9),points('琯',11))>5)
  assert.ok(separation(roof,left)>5&&separation(roof,points('琯',9))>5)
})
test('all 264 stroke-pair contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["塏",1,2,true],["塏",1,3,false],["塏",1,4,false],["塏",1,5,false],["塏",1,6,false],["塏",1,7,false],["塏",1,8,false],["塏",1,9,false],["塏",1,10,false],["塏",1,11,false],["塏",1,12,false],["塏",1,13,false],["塏",2,3,true],["塏",2,4,false],["塏",2,5,false],["塏",2,6,false],["塏",2,7,false],["塏",2,8,false],["塏",2,9,false],["塏",2,10,false],["塏",2,11,false],["塏",2,12,false],["塏",2,13,false],["塏",3,4,false],["塏",3,5,false],["塏",3,6,false],["塏",3,7,false],["塏",3,8,false],["塏",3,9,false],["塏",3,10,false],["塏",3,11,false],["塏",3,12,false],["塏",3,13,false],["塏",4,5,true],["塏",4,6,false],["塏",4,7,false],["塏",4,8,false],["塏",4,9,false],["塏",4,10,false],["塏",4,11,false],["塏",4,12,false],["塏",4,13,false],["塏",5,6,true],["塏",5,7,false],["塏",5,8,false],["塏",5,9,false],["塏",5,10,false],["塏",5,11,false],["塏",5,12,false],["塏",5,13,false],["塏",6,7,false],["塏",6,8,false],["塏",6,9,false],["塏",6,10,false],["塏",6,11,false],["塏",6,12,false],["塏",6,13,false],["塏",7,8,false],["塏",7,9,false],["塏",7,10,false],["塏",7,11,false],["塏",7,12,false],["塏",7,13,false],["塏",8,9,true],["塏",8,10,true],["塏",8,11,false],["塏",8,12,false],["塏",8,13,false],["塏",9,10,true],["塏",9,11,false],["塏",9,12,false],["塏",9,13,false],["塏",10,11,false],["塏",10,12,false],["塏",10,13,false],["塏",11,12,false],["塏",11,13,false],["塏",12,13,true],["璟",1,2,false],["璟",1,3,true],["璟",1,4,false],["璟",1,5,false],["璟",1,6,false],["璟",1,7,false],["璟",1,8,false],["璟",1,9,false],["璟",1,10,false],["璟",1,11,false],["璟",1,12,false],["璟",1,13,false],["璟",1,14,false],["璟",1,15,false],["璟",1,16,false],["璟",2,3,true],["璟",2,4,false],["璟",2,5,false],["璟",2,6,false],["璟",2,7,false],["璟",2,8,false],["璟",2,9,false],["璟",2,10,false],["璟",2,11,false],["璟",2,12,false],["璟",2,13,false],["璟",2,14,false],["璟",2,15,false],["璟",2,16,false],["璟",3,4,true],["璟",3,5,false],["璟",3,6,false],["璟",3,7,false],["璟",3,8,false],["璟",3,9,false],["璟",3,10,false],["璟",3,11,false],["璟",3,12,false],["璟",3,13,false],["璟",3,14,false],["璟",3,15,false],["璟",3,16,false],["璟",4,5,false],["璟",4,6,false],["璟",4,7,false],["璟",4,8,false],["璟",4,9,false],["璟",4,10,false],["璟",4,11,false],["璟",4,12,false],["璟",4,13,false],["璟",4,14,false],["璟",4,15,false],["璟",4,16,false],["璟",5,6,true],["璟",5,7,true],["璟",5,8,true],["璟",5,9,false],["璟",5,10,false],["璟",5,11,false],["璟",5,12,false],["璟",5,13,false],["璟",5,14,false],["璟",5,15,false],["璟",5,16,false],["璟",6,7,true],["璟",6,8,true],["璟",6,9,false],["璟",6,10,false],["璟",6,11,false],["璟",6,12,false],["璟",6,13,false],["璟",6,14,false],["璟",6,15,false],["璟",6,16,false],["璟",7,8,false],["璟",7,9,false],["璟",7,10,false],["璟",7,11,false],["璟",7,12,false],["璟",7,13,false],["璟",7,14,false],["璟",7,15,false],["璟",7,16,false],["璟",8,9,false],["璟",8,10,false],["璟",8,11,false],["璟",8,12,false],["璟",8,13,false],["璟",8,14,false],["璟",8,15,false],["璟",8,16,false],["璟",9,10,true],["璟",9,11,false],["璟",9,12,false],["璟",9,13,false],["璟",9,14,false],["璟",9,15,false],["璟",9,16,false],["璟",10,11,false],["璟",10,12,false],["璟",10,13,false],["璟",10,14,false],["璟",10,15,false],["璟",10,16,false],["璟",11,12,true],["璟",11,13,true],["璟",11,14,false],["璟",11,15,false],["璟",11,16,false],["璟",12,13,true],["璟",12,14,false],["璟",12,15,false],["璟",12,16,false],["璟",13,14,true],["璟",13,15,false],["璟",13,16,false],["璟",14,15,false],["璟",14,16,false],["璟",15,16,false],["琯",1,2,false],["琯",1,3,true],["琯",1,4,false],["琯",1,5,false],["琯",1,6,false],["琯",1,7,false],["琯",1,8,false],["琯",1,9,false],["琯",1,10,false],["琯",1,11,false],["琯",1,12,false],["琯",2,3,true],["琯",2,4,false],["琯",2,5,false],["琯",2,6,false],["琯",2,7,false],["琯",2,8,false],["琯",2,9,false],["琯",2,10,false],["琯",2,11,false],["琯",2,12,false],["琯",3,4,true],["琯",3,5,false],["琯",3,6,false],["琯",3,7,false],["琯",3,8,false],["琯",3,9,false],["琯",3,10,false],["琯",3,11,false],["琯",3,12,false],["琯",4,5,false],["琯",4,6,false],["琯",4,7,false],["琯",4,8,false],["琯",4,9,false],["琯",4,10,false],["琯",4,11,false],["琯",4,12,false],["琯",5,6,false],["琯",5,7,true],["琯",5,8,false],["琯",5,9,false],["琯",5,10,false],["琯",5,11,false],["琯",5,12,false],["琯",6,7,true],["琯",6,8,false],["琯",6,9,false],["琯",6,10,false],["琯",6,11,false],["琯",6,12,false],["琯",7,8,false],["琯",7,9,false],["琯",7,10,false],["琯",7,11,false],["琯",7,12,false],["琯",8,9,true],["琯",8,10,true],["琯",8,11,true],["琯",8,12,true],["琯",9,10,true],["琯",9,11,false],["琯",9,12,false],["琯",10,11,false],["琯",10,12,false],["琯",11,12,true]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH14_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch14DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch14DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch14DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch14DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch14DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch14DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH14_STROKES.slice(1)),/published bundle/)
})
