import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH7_STROKES, G2_GEOMETRY_BATCH7_DICTIONARY_GEOMETRY, loadG2GeometryBatch7DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch7.ts'
import { buildG2GeometryBatch7DictionaryBundle, G2_GEOMETRY_BATCH7_DICTIONARY_PROOF_PINS, validateG2GeometryBatch7DictionaryProofs, validateG2GeometryBatch7DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch7.ts'
import { dictionaryGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch7-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH7_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
const distance = (p: number[], a: number[], b: number[]) => {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
const toPath = (p: number[], path: number[][]) => Math.min(...path.slice(1).map((v, k) => distance(p, path[k], v)))


const separation=(a:number[][],b:number[][]) => {
  const segment=(p:number[],q:number[],r:number[],s:number[])=>{
    const cross=(a:number[],b:number[],c:number[]) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
    if(cross(p,q,r)*cross(p,q,s)<0 && cross(r,s,p)*cross(r,s,q)<0)return 0
    return Math.min(distance(p,r,s),distance(q,r,s),distance(r,p,q),distance(s,p,q))
  }
  const result=Math.min(...a.slice(1).flatMap((q,i)=>b.slice(1).map((s,j)=>segment(a[i],q,b[j],s))))
  return result<1e-9?0:result
}

test('three full reviews reconstruct 29 strokes from 26 licensed source strokes', () => {
  validateG2GeometryBatch7DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['荀',9,10],['艾',5,6],['惹',12,13]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH7_STROKES.reduce((n,e)=>n+e.paths.length,0),29)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH7_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const candidates=(corpus:'Ja'|'MM')=>originals.filter(e=>e.corpus===corpus).map(e=>({character:e.glyph,medians:e.medians,strokes:e.paths}))
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH7_STROKES,candidates('Ja'),candidates('MM'))
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.throws(()=>auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH7_STROKES,candidates('MM'),candidates('Ja')),/geometry mismatch/)
})




test('each reviewed glyph has four independent grass strokes', () => {
  for(const g of ['荀','艾','惹']){
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
test('荀 outer roof begins on the left sweep and finishes with a leftward hook', () => {
  const sweep=points('荀',5),roof=points('荀',6)
  for(let i=1;i<sweep.length;i++)assert.ok(sweep[i][0]<sweep[i-1][0] && sweep[i][1]>sweep[i-1][1])
  assert.ok(toPath(roof[0],sweep)<1e-9)
  assert.ok(roof[1][0]>roof[0][0] && roof[1][1]===roof[0][1])
  assert.equal(roof[2][0],roof[1][0]);assert.ok(roof[2][1]>roof[1][1])
  assert.ok(roof.at(-1)![0]<roof.at(-2)![0] && roof.at(-1)![1]===roof.at(-2)![1])
  for(const n of [7,8,9,10])assert.ok(separation(roof,points('荀',n))>5)
})
test('荀 日 closes both horizontal bars at both vertical edges', () => {
  const left=points('荀',7),roof=points('荀',8)
  assert.equal(left[0][0],left.at(-1)![0]);assert.ok(left.at(-1)![1]>left[0][1])
  assert.deepEqual(left[0],roof[0])
  assert.ok(roof[1][0]>roof[0][0] && roof[1][1]===roof[0][1])
  assert.equal(roof[1][0],roof[2][0]);assert.ok(roof[2][1]>roof[1][1])
  for(const n of [9,10]){
    const bar=points('荀',n)
    assert.ok(bar.at(-1)![0]>bar[0][0])
    assert.equal(separation(left,bar),0);assert.equal(separation(roof,bar),0)
  }
  assert.ok(points('荀',10)[0][1]>points('荀',9)[0][1])
})
test('艾 begins its two crossing sweeps below opposite grass verticals without reversing', () => {
  for(const [n,side]of [[5,-1],[6,1]]){
    const p=points('艾',n)
    for(let i=1;i<p.length;i++)assert.ok(side*(p[i][0]-p[i-1][0])>0 && p[i][1]>p[i-1][1])
  }
  assert.equal(points('艾',5)[0][0],points('艾',4).at(-1)![0])
  assert.equal(points('艾',6)[0][0],points('艾',2).at(-1)![0])
  assert.equal(separation(points('艾',5),points('艾',6)),0)
  assert.ok(separation(points('艾',4),points('艾',5))>5)
  assert.ok(separation(points('艾',2),points('艾',6))>5)
})
test('惹 puts its left sweep before the crossing bar and its 心 hook rises at the right', () => {
  const sweep=points('惹',5),bar=points('惹',6)
  for(let i=1;i<sweep.length;i++)assert.ok(sweep[i][0]<sweep[i-1][0] && sweep[i][1]>sweep[i-1][1])
  assert.ok(bar.at(-1)![0]>bar[0][0] && bar.at(-1)![1]===bar[0][1])
  assert.equal(separation(sweep,bar),0)
  assert.ok(toPath(points('惹',7)[0],sweep)<1e-9)
  for(const a of [7,8])assert.equal(separation(points('惹',a),points('惹',9)),0)
  const heart=points('惹',11)
  assert.equal(heart[0][0],heart[1][0]);assert.ok(heart[1][1]>heart[0][1])
  assert.equal(heart.at(-3)![1],heart.at(-2)![1])
  assert.ok(heart.at(-2)![0]>heart.at(-3)![0])
  assert.ok(heart.at(-1)![0]>=heart.at(-2)![0] && heart.at(-1)![1]<heart.at(-2)![1])
  const last=points('惹',13)
  assert.ok(last.at(-1)![0]>last[0][0] && last.at(-1)![1]>last[0][1])
  assert.ok(separation(heart,last)>5)
})
test('36 source contacts and pen-lift gaps survive the five-unit playback width', () => {
  for(const[g,a,b,touching]of [["荀",2,5,false],["荀",4,6,false],["荀",5,6,true],["荀",5,7,false],["荀",6,7,false],["荀",6,8,false],["荀",6,10,false],["荀",7,8,true],["荀",7,9,true],["荀",8,9,true],["荀",7,10,true],["荀",8,10,true],["艾",2,5,false],["艾",4,5,false],["艾",2,6,false],["艾",4,6,false],["艾",5,6,true],["惹",2,5,false],["惹",4,5,false],["惹",2,6,false],["惹",4,6,false],["惹",5,6,true],["惹",5,7,true],["惹",5,8,true],["惹",6,8,false],["惹",7,8,true],["惹",7,9,true],["惹",8,9,true],["惹",7,11,false],["惹",9,12,false],["惹",9,11,false],["惹",10,11,false],["惹",11,12,false],["惹",11,13,false],["惹",12,13,false],["惹",8,13,false]] as const){
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH7_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch7DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch7DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch7DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch7DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch7DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch7DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH7_STROKES.slice(1)),/published bundle/)
})
