import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES, G2_GEOMETRY_BATCH13_DICTIONARY_GEOMETRY, loadG2GeometryBatch13DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch13.ts'
import { buildG2GeometryBatch13DictionaryBundle, G2_GEOMETRY_BATCH13_DICTIONARY_PROOF_PINS, validateG2GeometryBatch13DictionaryProofs, validateG2GeometryBatch13DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch13.ts'
import { dictionaryGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch13-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES.find(e => e.glyph === glyph)!
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

test('two full reviews reconstruct 27 strokes from 27 licensed source strokes', () => {
  validateG2GeometryBatch13DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['薰',17,18],['姬',10,9]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES.reduce((n,e)=>n+e.paths.length,0),27)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH13_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates=(corpus:'Ja'|'MM')=>originals.filter(e=>e.corpus===corpus).map(e=>({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES,candidates('Ja'),candidates('MM'))
  assert.equal(audit.verificationSources.dictionary,2)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES,candidates('MM'),candidates('Ja')),/geometry mismatch/)
})








test('薰 splits the grass horizontal into two independently observed strokes', () => {
  const recipe=JSON.parse(read(dir+'proposals.json'))['薰'] as {derivedFromStroke:number}[]
  assert.deepEqual(recipe.slice(0,4).map(p=>p.derivedFromStroke),[1,2,1,3])
  assert.ok(separation(points('薰',1),points('薰',3))>5)
  for(const [h,v] of [[1,2],[3,4]]){
    const bar=points('薰',h),vertical=points('薰',v)
    assert.equal(bar[0][1],bar.at(-1)![1]);assert.ok(bar.at(-1)![0]>bar[0][0])
    assert.equal(vertical[0][0],vertical.at(-1)![0]);assert.ok(vertical.at(-1)![1]>vertical[0][1])
    assert.equal(separation(bar,vertical),0)
  }
  const sweep=points('薰',5)
  for(let i=1;i<sweep.length;i++)assert.ok(sweep[i][0]<sweep[i-1][0] && sweep[i][1]>sweep[i-1][1])
  assert.ok(separation(sweep,points('薰',4))<=5 && separation(sweep,points('薰',2))>5)
})
test('薰 places the central vertical after the lower horizontal and before the bottom horizontal', () => {
  const recipe=JSON.parse(read(dir+'proposals.json'))['薰'] as {derivedFromStroke:number}[]
  assert.deepEqual(recipe.slice(10,14).map(p=>p.derivedFromStroke),[10,12,11,13])
  const vertical=points('薰',13)
  assert.equal(vertical[0][0],vertical.at(-1)![0]);assert.ok(vertical.at(-1)![1]>vertical[0][1])
  for(const n of [5,6,8,11,12,14])assert.ok(separation(vertical,points('薰',n))<=5)
  for(const n of [7,9,10])assert.ok(separation(vertical,points('薰',n))>5)
})
test('薰 inner dots touch the box bottom and remain clear of its roof; four final dots stay detached', () => {
  for(const[n,side]of [[9,1],[10,-1]]){
    const dot=points('薰',n)
    for(let i=1;i<dot.length;i++)assert.ok(side*(dot[i][0]-dot[i-1][0])>0 && dot[i][1]>dot[i-1][1])
    assert.ok(separation(dot,points('薰',11))<=5 && separation(dot,points('薰',8))>5)
  }
  for(const n of [15,16,17,18]){
    const p=points('薰',n),side=n===15?-1:1
    for(let i=1;i<p.length;i++)assert.ok(side*(p[i][0]-p[i-1][0])>0 && p[i][1]>p[i-1][1])
    for(let other=1;other<=18;other++)if(other!==n)assert.ok(separation(p,points('薰',other))>5)
  }
})
test('姬 merges both licensed source paths into one uninterrupted down-right-down sixth stroke', () => {
  const recipes=JSON.parse(read(dir+'proposals.json'))['姬'] as {derivedFromStroke:number;additionalDerivedFromStrokes?:number[]}[]
  assert.equal(recipes[4].derivedFromStroke,6);assert.equal(recipes[5].derivedFromStroke,5)
  assert.deepEqual(recipes[5].additionalDerivedFromStrokes,[7])
  const edits=JSON.parse(read(dir+'corrections.json')).edits as {glyph:string;stroke:number;additionalOriginalSources?:{stroke:number;path:string}[]}[]
  assert.deepEqual(edits.find(e=>e.glyph==='姬'&&e.stroke===6)!.additionalOriginalSources,
    [{stroke:7,path:originals.find(e=>e.glyph==='姬')!.paths[6]}])
  const fold=points('姬',6)
  assert.equal(fold.length,4);assert.equal(fold[0][0],fold[1][0]);assert.ok(fold[1][1]>fold[0][1])
  assert.equal(fold[1][1],fold[2][1]);assert.ok(fold[2][0]>fold[1][0])
  assert.equal(fold[2][0],fold[3][0]);assert.ok(fold[3][1]>fold[2][1])
  assert.equal(separation(fold,points('姬',4)),0);assert.equal(separation(fold,points('姬',7)),0)
})
test('姬 keeps its fifth stroke isolated and closes the lower vertical with the last outer fold', () => {
  const isolated=points('姬',5)
  assert.equal(isolated[0][0],isolated.at(-1)![0]);assert.ok(isolated.at(-1)![1]>isolated[0][1])
  for(let n=1;n<=9;n++)if(n!==5)assert.ok(separation(isolated,points('姬',n))>5)
  const bottom=points('姬',7),vertical=points('姬',8),outer=points('姬',9)
  assert.equal(bottom[0][1],bottom.at(-1)![1]);assert.ok(bottom.at(-1)![0]>bottom[0][0])
  assert.deepEqual(bottom[0],vertical[0]);assert.equal(vertical[0][0],vertical.at(-1)![0])
  assert.equal(outer[0][0],outer[1][0]);assert.ok(outer[1][1]>outer[0][1])
  assert.equal(outer[1][1],outer[2][1]);assert.ok(outer[2][0]>outer[1][0])
  assert.equal(toPath(vertical.at(-1)!,outer),0);assert.ok(separation(outer,points('姬',4))<=5)
})
test('all 189 stroke-pair contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["薰",1,2,true],["薰",1,3,false],["薰",1,4,false],["薰",1,5,false],["薰",1,6,false],["薰",1,7,false],["薰",1,8,false],["薰",1,9,false],["薰",1,10,false],["薰",1,11,false],["薰",1,12,false],["薰",1,13,false],["薰",1,14,false],["薰",1,15,false],["薰",1,16,false],["薰",1,17,false],["薰",1,18,false],["薰",2,3,false],["薰",2,4,false],["薰",2,5,false],["薰",2,6,false],["薰",2,7,false],["薰",2,8,false],["薰",2,9,false],["薰",2,10,false],["薰",2,11,false],["薰",2,12,false],["薰",2,13,false],["薰",2,14,false],["薰",2,15,false],["薰",2,16,false],["薰",2,17,false],["薰",2,18,false],["薰",3,4,true],["薰",3,5,false],["薰",3,6,false],["薰",3,7,false],["薰",3,8,false],["薰",3,9,false],["薰",3,10,false],["薰",3,11,false],["薰",3,12,false],["薰",3,13,false],["薰",3,14,false],["薰",3,15,false],["薰",3,16,false],["薰",3,17,false],["薰",3,18,false],["薰",4,5,true],["薰",4,6,false],["薰",4,7,false],["薰",4,8,false],["薰",4,9,false],["薰",4,10,false],["薰",4,11,false],["薰",4,12,false],["薰",4,13,false],["薰",4,14,false],["薰",4,15,false],["薰",4,16,false],["薰",4,17,false],["薰",4,18,false],["薰",5,6,false],["薰",5,7,false],["薰",5,8,false],["薰",5,9,false],["薰",5,10,false],["薰",5,11,false],["薰",5,12,false],["薰",5,13,true],["薰",5,14,false],["薰",5,15,false],["薰",5,16,false],["薰",5,17,false],["薰",5,18,false],["薰",6,7,false],["薰",6,8,false],["薰",6,9,false],["薰",6,10,false],["薰",6,11,false],["薰",6,12,false],["薰",6,13,true],["薰",6,14,false],["薰",6,15,false],["薰",6,16,false],["薰",6,17,false],["薰",6,18,false],["薰",7,8,true],["薰",7,9,false],["薰",7,10,false],["薰",7,11,true],["薰",7,12,false],["薰",7,13,false],["薰",7,14,false],["薰",7,15,false],["薰",7,16,false],["薰",7,17,false],["薰",7,18,false],["薰",8,9,false],["薰",8,10,false],["薰",8,11,true],["薰",8,12,false],["薰",8,13,true],["薰",8,14,false],["薰",8,15,false],["薰",8,16,false],["薰",8,17,false],["薰",8,18,false],["薰",9,10,false],["薰",9,11,true],["薰",9,12,false],["薰",9,13,false],["薰",9,14,false],["薰",9,15,false],["薰",9,16,false],["薰",9,17,false],["薰",9,18,false],["薰",10,11,true],["薰",10,12,false],["薰",10,13,false],["薰",10,14,false],["薰",10,15,false],["薰",10,16,false],["薰",10,17,false],["薰",10,18,false],["薰",11,12,false],["薰",11,13,true],["薰",11,14,false],["薰",11,15,false],["薰",11,16,false],["薰",11,17,false],["薰",11,18,false],["薰",12,13,true],["薰",12,14,false],["薰",12,15,false],["薰",12,16,false],["薰",12,17,false],["薰",12,18,false],["薰",13,14,true],["薰",13,15,false],["薰",13,16,false],["薰",13,17,false],["薰",13,18,false],["薰",14,15,false],["薰",14,16,false],["薰",14,17,false],["薰",14,18,false],["薰",15,16,false],["薰",15,17,false],["薰",15,18,false],["薰",16,17,false],["薰",16,18,false],["薰",17,18,false],["姬",1,2,true],["姬",1,3,true],["姬",1,4,false],["姬",1,5,false],["姬",1,6,false],["姬",1,7,false],["姬",1,8,false],["姬",1,9,false],["姬",2,3,true],["姬",2,4,false],["姬",2,5,false],["姬",2,6,false],["姬",2,7,false],["姬",2,8,false],["姬",2,9,false],["姬",3,4,false],["姬",3,5,false],["姬",3,6,false],["姬",3,7,false],["姬",3,8,false],["姬",3,9,false],["姬",4,5,false],["姬",4,6,true],["姬",4,7,false],["姬",4,8,false],["姬",4,9,true],["姬",5,6,false],["姬",5,7,false],["姬",5,8,false],["姬",5,9,false],["姬",6,7,true],["姬",6,8,false],["姬",6,9,false],["姬",7,8,true],["姬",7,9,false],["姬",8,9,true]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH13_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch13DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch13DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch13DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch13DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch13DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch13DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES.slice(1)),/published bundle/)
})
