import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH10_STROKES, G2_GEOMETRY_BATCH10_DICTIONARY_GEOMETRY, loadG2GeometryBatch10DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch10.ts'
import { buildG2GeometryBatch10DictionaryBundle, G2_GEOMETRY_BATCH10_DICTIONARY_PROOF_PINS, validateG2GeometryBatch10DictionaryProofs, validateG2GeometryBatch10DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch10.ts'
import { dictionaryGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch10-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH10_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 32 strokes from 28 licensed source strokes', () => {
  validateG2GeometryBatch10DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['苑',8,9],['芝',6,8],['遮',14,15]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH10_STROKES.reduce((n,e)=>n+e.paths.length,0),32)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH10_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates=(corpus:'Ja'|'MM')=>originals.filter(e=>e.corpus===corpus).map(e=>({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH10_STROKES,candidates('Ja'),candidates('MM'))
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH10_STROKES,candidates('MM'),candidates('Ja')),/geometry mismatch/)
})






test('苑 and 芝 keep four separate grass strokes and a gap between their two bars', () => {
  for(const g of ['苑','芝']){
    const a=points(g,1),b=points(g,2),c=points(g,3),d=points(g,4)
    assert.ok(a.at(-1)![0]>a[0][0] && c.at(-1)![0]>c[0][0])
    assert.ok(separation(a,c)>5)
    for(const [v,bar]of [[b,a],[d,c]]){
      assert.equal(v[0][0],v.at(-1)![0])
      assert.ok(v[0][1]<bar[0][1] && v.at(-1)![1]>bar.at(-1)![1])
      assert.equal(separation(v,bar),0)
    }
  }
})
test('苑 separates the inner dot from the first sweep and joins it to the second curved leg', () => {
  const first=points('苑',5),second=points('苑',6),dot=points('苑',7)
  for(let i=1;i<first.length;i++)assert.ok(first[i][0]<first[i-1][0] && first[i][1]>first[i-1][1])
  assert.ok(separation(first,second)<=5)
  assert.ok(second[1][0]>second[0][0] && second[1][1]===second[0][1])
  for(let i=2;i<second.length;i++)assert.ok(second[i][0]<second[i-1][0] && second[i][1]>second[i-1][1])
  for(let i=1;i<dot.length;i++)assert.ok(dot[i][0]>dot[i-1][0] && dot[i][1]>dot[i-1][1])
  assert.ok(separation(first,dot)>5 && separation(second,dot)<=5)
})
test('苑 right folds share a top junction but finish with different hook directions', () => {
  const upper=points('苑',8),lower=points('苑',9)
  assert.deepEqual(upper[0],lower[0])
  assert.ok(upper[1][0]>upper[0][0] && upper[1][1]===upper[0][1])
  assert.equal(upper[1][0],upper[2][0]);assert.ok(upper[2][1]>upper[1][1])
  assert.ok(upper.at(-1)![0]<upper.at(-2)![0])
  assert.equal(lower[0][0],lower[1][0]);assert.ok(lower[1][1]>lower[0][1])
  assert.equal(lower.at(-3)![1],lower.at(-2)![1])
  assert.ok(lower.at(-2)![0]>lower.at(-3)![0] && lower.at(-1)![1]<lower.at(-2)![1])
})
test('芝 separates the lower horizontal and down-left sweep and starts the final stroke up-right', () => {
  const dot=points('芝',5),bar=points('芝',6),sweep=points('芝',7),base=points('芝',8)
  assert.equal(dot[0][0],dot.at(-1)![0]);assert.ok(dot.at(-1)![1]>dot[0][1])
  assert.ok(separation(dot,bar)<=5)
  assert.deepEqual(bar.at(-1),sweep[0])
  for(let i=1;i<sweep.length;i++)assert.ok(sweep[i][0]<sweep[i-1][0] && sweep[i][1]>sweep[i-1][1])
  assert.ok(base[1][0]>base[0][0] && base[1][1]<base[0][1])
  assert.ok(base[2][0]>base[1][0] && base[2][1]>base[1][1])
  assert.ok(separation(base,sweep)<=5 && separation(base,bar)>5)
})
test('遮 closes its interior before four detached dots and a four-stroke movement enclosure', () => {
  const roof=points('遮',2),wall=points('遮',3)
  assert.deepEqual(roof[0],wall[0])
  for(let i=1;i<wall.length;i++)assert.ok(wall[i][0]<=wall[i-1][0] && wall[i][1]>wall[i-1][1])
  for(const n of [5,6]){assert.equal(separation(points('遮',n),points('遮',4)),0);assert.equal(separation(points('遮',n),points('遮',7)),0)}
  for(const [n,side]of [[8,-1],[9,1],[10,1],[11,1],[12,1],[13,1]]){
    const p=points('遮',n);for(let i=1;i<p.length;i++)assert.ok(side*(p[i][0]-p[i-1][0])>0 && p[i][1]>p[i-1][1])
  }
  const fold=points('遮',14),base=points('遮',15)
  assert.ok(fold[1][0]>fold[0][0] && fold[1][1]===fold[0][1])
  assert.equal(fold[1][0],fold[2][0]);assert.ok(fold[2][1]>fold[1][1])
  assert.deepEqual(fold.at(-1),base[1])
  assert.ok(base[1][0]>base[0][0] && base[1][1]<base[0][1])
  assert.ok(base[2][0]>base[1][0] && base[2][1]>base[1][1])
})
test('50 source contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["苑",1,2,true],["苑",1,3,false],["苑",3,4,true],["苑",2,5,false],["苑",4,8,false],["苑",5,6,true],["苑",5,7,false],["苑",6,7,true],["苑",6,8,false],["苑",7,9,false],["苑",8,9,true],["芝",1,2,true],["芝",1,3,false],["芝",3,4,true],["芝",2,5,false],["芝",4,5,false],["芝",5,6,true],["芝",6,7,true],["芝",6,8,false],["芝",7,8,true],["遮",1,2,true],["遮",2,3,true],["遮",2,5,false],["遮",2,6,false],["遮",3,4,false],["遮",3,8,false],["遮",4,5,true],["遮",4,6,true],["遮",4,7,false],["遮",5,6,false],["遮",5,7,true],["遮",6,7,true],["遮",5,9,false],["遮",6,10,false],["遮",7,8,false],["遮",7,9,false],["遮",8,9,false],["遮",9,10,false],["遮",10,11,false],["遮",2,12,false],["遮",3,12,false],["遮",12,13,false],["遮",13,14,false],["遮",14,15,true],["遮",3,14,false],["遮",3,15,false],["遮",8,15,false],["遮",9,15,false],["遮",10,15,false],["遮",11,15,false]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH10_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch10DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch10DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch10DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch10DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch10DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch10DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH10_STROKES.slice(1)),/published bundle/)
})
