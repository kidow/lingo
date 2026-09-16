import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH9_STROKES, G2_GEOMETRY_BATCH9_DICTIONARY_GEOMETRY, loadG2GeometryBatch9DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch9.ts'
import { buildG2GeometryBatch9DictionaryBundle, G2_GEOMETRY_BATCH9_DICTIONARY_PROOF_PINS, validateG2GeometryBatch9DictionaryProofs, validateG2GeometryBatch9DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch9.ts'
import { dictionaryGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch9-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH9_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 34 strokes from 31 licensed source strokes', () => {
  validateG2GeometryBatch9DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['莞',10,11],['芸',7,8],['蔚',14,15]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH9_STROKES.reduce((n,e)=>n+e.paths.length,0),34)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH9_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates=(corpus:'Ja'|'MM')=>originals.filter(e=>e.corpus===corpus).map(e=>({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH9_STROKES,candidates('Ja'),candidates('MM'))
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH9_STROKES,candidates('MM'),candidates('Ja')),/geometry mismatch/)
})






test('all three whole-glyph sources use independent four-stroke grass boundaries', () => {
  for(const g of ['莞','芸','蔚']){
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
test('莞 roof dot descends directly to its joined roof, whose right end goes down-left', () => {
  const dot=points('莞',5),left=points('莞',6),roof=points('莞',7),bar=points('莞',8)
  assert.equal(dot[0][0],dot.at(-1)![0]);assert.ok(dot.at(-1)![1]>dot[0][1])
  assert.equal(toPath(dot.at(-1)!,roof),0);assert.equal(toPath(roof[0],left),0)
  for(let i=1;i<left.length;i++)assert.ok(left[i][0]<=left[i-1][0] && left[i][1]>left[i-1][1])
  assert.ok(roof[1][0]>roof[0][0] && roof[1][1]===roof[0][1])
  assert.ok(roof[2][0]<roof[1][0] && roof[2][1]>roof[1][1])
  assert.ok(separation(bar,roof)>5 && separation(bar,left)>5)
})
test('莞 both legs begin on the lower 元 bar and the right hook has a flat base and upward ending', () => {
  const bar=points('莞',9),sweep=points('莞',10),hook=points('莞',11)
  assert.equal(toPath(sweep[0],bar),0);assert.equal(toPath(hook[0],bar),0)
  for(let i=1;i<sweep.length;i++)assert.ok(sweep[i][0]<sweep[i-1][0] && sweep[i][1]>sweep[i-1][1])
  assert.equal(hook[0][0],hook[1][0]);assert.ok(hook[1][1]>hook[0][1])
  assert.equal(hook.at(-3)![1],hook.at(-2)![1]);assert.ok(hook.at(-2)![0]>hook.at(-3)![0])
  assert.equal(hook.at(-2)![0],hook.at(-1)![0]);assert.ok(hook.at(-1)![1]<hook.at(-2)![1])
  assert.ok(separation(sweep,hook)>5)
})
test('芸 folded sweep begins on its long bar, turns down-left then up-right, and meets the final dot', () => {
  const bar=points('芸',6),fold=points('芸',7),dot=points('芸',8)
  assert.equal(toPath(fold[0],bar),0)
  assert.ok(fold[1][0]<fold[0][0] && fold[1][1]>fold[0][1])
  assert.ok(fold[2][0]<fold[1][0] && fold[2][1]>fold[1][1])
  assert.ok(fold.at(-1)![0]>fold.at(-2)![0] && fold.at(-1)![1]<fold.at(-2)![1])
  for(let i=1;i<dot.length;i++)assert.ok(dot[i][0]>dot[i-1][0] && dot[i][1]>dot[i-1][1])
  assert.ok(separation(fold,dot)<=5 && separation(bar,dot)>5)
  assert.equal(published('芸').paths[7],originals.find(e=>e.glyph==='芸')!.paths[6])
})
test('蔚 closes 尸 before 示; both vertical hooks finish left and the three dots remain separate', () => {
  const roof=points('蔚',5),bottom=points('蔚',6),sweep=points('蔚',7)
  assert.ok(roof[1][0]>roof[0][0] && roof[1][1]===roof[0][1])
  assert.equal(roof[1][0],roof[2][0]);assert.ok(roof[2][1]>roof[1][1])
  assert.equal(separation(roof,bottom),0);assert.equal(separation(sweep,bottom),0)
  assert.deepEqual(sweep[0],roof[0])
  for(let i=1;i<sweep.length;i++)assert.ok(sweep[i][0]<=sweep[i-1][0] && sweep[i][1]>sweep[i-1][1])
  assert.ok(separation(sweep,points('蔚',8))>5);assert.ok(separation(sweep,points('蔚',9))<=5)
  for(const [n,bar]of [[10,9],[14,13]]){
    const hook=points('蔚',n)
    assert.equal(hook[0][0],hook[1][0]);assert.ok(hook[1][1]>hook[0][1])
    assert.ok(hook.at(-1)![0]<hook.at(-2)![0] && hook.at(-1)![1]===hook.at(-2)![1])
    assert.equal(separation(hook,points('蔚',bar)),0)
  }
  assert.ok(separation(roof,points('蔚',13))>5)
  for(const [n,side]of [[11,-1],[12,1],[15,1]]){
    const p=points('蔚',n)
    for(let i=1;i<p.length;i++)assert.ok(side*(p[i][0]-p[i-1][0])>0 && p[i][1]>p[i-1][1])
  }
  for(const [a,b]of [[10,11],[10,12],[12,15],[13,15],[14,15]])assert.ok(separation(points('蔚',a),points('蔚',b))>5)
  for(const [n,source]of [[11,10],[15,14]])assert.equal(published('蔚').paths[n-1],originals.find(e=>e.glyph==='蔚')!.paths[source-1])
})
test('51 source contacts and gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["莞",1,2,true],["莞",1,3,false],["莞",3,4,true],["莞",2,5,false],["莞",4,5,false],["莞",5,7,true],["莞",6,7,true],["莞",6,8,false],["莞",7,8,false],["莞",8,9,false],["莞",9,10,true],["莞",9,11,true],["莞",10,11,false],["莞",7,11,false],["芸",1,2,true],["芸",1,3,false],["芸",3,4,true],["芸",2,5,false],["芸",4,5,false],["芸",5,6,false],["芸",6,7,true],["芸",6,8,false],["芸",7,8,true],["蔚",1,2,true],["蔚",1,3,false],["蔚",3,4,true],["蔚",2,5,false],["蔚",4,5,false],["蔚",5,6,true],["蔚",5,7,true],["蔚",6,7,true],["蔚",5,8,false],["蔚",6,8,false],["蔚",7,8,false],["蔚",7,9,true],["蔚",8,9,false],["蔚",9,10,true],["蔚",9,11,false],["蔚",9,12,false],["蔚",7,11,false],["蔚",10,11,false],["蔚",10,12,false],["蔚",11,12,false],["蔚",5,13,false],["蔚",8,13,false],["蔚",9,13,false],["蔚",4,14,false],["蔚",13,14,true],["蔚",13,15,false],["蔚",14,15,false],["蔚",12,15,false]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH9_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch9DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch9DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch9DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch9DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch9DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch9DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH9_STROKES.slice(1)),/published bundle/)
})
