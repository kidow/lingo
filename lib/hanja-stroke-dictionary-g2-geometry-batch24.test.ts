import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { compose, type DictionaryComponent } from '../docs/hanja-g2-geometry-batch24-2026-09-17/compose.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH24_STROKES, G2_GEOMETRY_BATCH24_DICTIONARY_GEOMETRY, loadG2GeometryBatch24DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch24.ts'
import { buildG2GeometryBatch24DictionaryBundle, G2_GEOMETRY_BATCH24_DICTIONARY_PROOF_PINS, validateG2GeometryBatch24DictionaryProofs, validateG2GeometryBatch24DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-geometry-batch24.ts'
import { dictionaryGeometry, dictionaryLocalGeometry, validateDictionaryReview, validateDictionaryBundle } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-geometry-batch24-2026-09-17/'
const originals = (JSON.parse(read(dir + 'originals.json')) as { entries: {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number
  components?: DictionaryComponent[]; corpus: 'Components' | 'ZhHans'; medians: number[][][]; paths: string[]
}[] }).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_GEOMETRY_BATCH24_STROKES.find(e => e.glyph === glyph)!
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

test('three full reviews reconstruct 47 strokes from individually reviewed component candidates', () => {
  validateG2GeometryBatch24DictionaryBundle()
  validateDictionaryBundle()
  assert.deepEqual(originals.map(e=>[e.glyph,e.strokes,e.catalogStrokes]),[['埰',11,11],['爀',18,18],['瀅',18,18]])
  assert.equal(HANJA_DICTIONARY_G2_GEOMETRY_BATCH24_STROKES.reduce((n,e)=>n+e.paths.length,0),47)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
  for(const e of originals){
    const entry=published(e.glyph)
    assert.equal(entry.geometrySource,G2_GEOMETRY_BATCH24_DICTIONARY_GEOMETRY[e.corpus].sha256)
    assert.deepEqual(dictionaryGeometry(e.glyph,e.medians).paths,entry.paths)
    assert.deepEqual(hanjaStrokeData({glyph:e.glyph,strokes:e.catalogStrokes}),entry)
    assert.equal(hanjaStrokeData({glyph:e.glyph,strokes:e.strokes+1}),null)
    validateDictionaryReview(entry,e.catalogStrokes)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes,Array.from({length:e.catalogStrokes},(_,i)=>i+1).join(','))
  }
  const catalog=originals.map(e=>({glyph:e.glyph,strokes:e.catalogStrokes,readingGrade:'2급'}))
  const audit=auditStrokes(catalog,[],HANJA_DICTIONARY_G2_GEOMETRY_BATCH24_STROKES)
  assert.equal(audit.verificationSources.dictionary,3)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.ok(audit.entries.every(e=>e.playback==='dictionary-crosschecked'))

})

test('ten licensed components reconstruct the explicit layouts without approving related characters', () => {
  const sets:Record<string,[string,number][]>= {'埰':[['土',3],['采',8]],'爀':[['火',4],['赤',7],['赤',7]],'瀅':[['氵',3],['火',4],['火',4],['冖',2],['玉',5]]}
  for(const original of originals){
    assert.deepEqual(original.components!.map(p=>[p.glyph,p.medians.length]),sets[original.glyph])
    assert.deepEqual(compose(original.components!),original.medians)
    const changed=structuredClone(original.components!);changed[0].medians[0][0][0]+=1
    assert.throws(()=>compose(changed),/medians mismatch/)
    const badBox=structuredClone(original.components!);badBox[0].targetBox[2]=0
    assert.throws(()=>compose(badBox),/target box/)
  }
  for(const g of ['土','采','火','赤','氵','冖','玉','澔','嬅','壎'])assert.ok(!HANJA_DICTIONARY_G2_GEOMETRY_BATCH24_STROKES.some(e=>e.glyph===g))
})

test('埰 follows the dictionary upper sweep and two rightward dots before the connected 木 strokes', () => {
  const base=points('埰',3),upper=points('埰',4),fall=points('埰',5)
  assert.ok(base.at(-1)![0]>base[0][0]&&base.at(-1)![1]<base[0][1])
  assert.ok(upper.at(-1)![0]<upper[0][0]&&upper.at(-1)![1]>upper[0][1])
  assert.ok(fall.at(-1)![0]<fall[0][0]&&fall.at(-1)![1]>fall[0][1])
  for(const n of [6,7]){
    const dot=points('埰',n)
    assert.ok(dot.at(-1)![0]>dot[0][0]&&dot.at(-1)![1]>dot[0][1])
    assert.ok(separation(dot,upper)>5)
  }
  for(const n of [10,11])for(const base of [8,9])assert.ok(separation(points('埰',n),points('埰',base))<=5)
  assert.ok(separation(points('埰',10),points('埰',11))>5)
})
test('爀 keeps its narrow 火 dot apart and each 赤 hook and free dot in the source order', () => {
  const dot=points('爀',1),stem=points('爀',3),small=points('爀',4)
  assert.ok(dot.at(-1)![0]<dot[0][0]&&dot.at(-1)![1]>dot[0][1])
  assert.ok(separation(dot,stem)>5)
  assert.ok(small.at(-1)![0]>small[0][0]&&small.at(-1)![1]>small[0][1])
  for(const [upper,vertical,bar,leg,hook,free,attached]of [[5,6,7,8,9,10,11],[12,13,14,15,16,17,18]]){
    for(const n of [upper,bar])assert.ok(separation(points('爀',vertical),points('爀',n))<=5)
    assert.ok(separation(points('爀',vertical),points('爀',leg))>5)
    const h=points('爀',hook),f=points('爀',free),a=points('爀',attached)
    assert.ok(h[1][1]>h[0][1]&&h.at(-1)![0]<h[1][0]&&h.at(-1)![1]<Math.max(...h.map(p=>p[1])))
    assert.ok(f.at(-1)![0]<f[0][0]&&f.at(-1)![1]>f[0][1])
    assert.ok(a.at(-1)![0]>a[0][0]&&a.at(-1)![1]>a[0][1])
    assert.ok(separation(f,points('爀',leg))>5)
    assert.ok(separation(a,h)<=5)
  }
})
test('瀅 keeps the lower water bend, two short 火 dots, separate roof and final 玉 dot', () => {
  const rise=points('瀅',3)
  assert.ok(rise[1][0]>rise[0][0]&&rise[1][1]>rise[0][1])
  assert.ok(rise[2][0]>rise[1][0]&&rise[2][1]>rise[1][1])
  assert.ok(rise[3][0]<rise[2][0]&&rise[3][1]<rise[2][1])
  assert.ok(rise.at(-1)![0]>rise[3][0]&&rise.at(-1)![1]<rise[3][1])
  for(const [left,fall,stem,dot]of [[4,5,6,7],[8,9,10,11]]){
    assert.ok(separation(points('瀅',left),points('瀅',stem))>5)
    for(const n of [fall,dot])assert.ok(separation(points('瀅',n),points('瀅',stem))<=5)
    const d=points('瀅',dot)
    assert.ok(d.at(-1)![0]>d[0][0]&&d.at(-1)![1]>d[0][1])
  }
  const roof=points('瀅',13)
  assert.ok(roof[1][0]>roof[0][0]&&roof[2][0]<roof[1][0]&&roof[2][1]>roof[1][1])
  for(const n of [14,15,17])assert.equal(separation(points('瀅',16),points('瀅',n)),0)
  for(const n of [14,15,16,17])assert.ok(separation(points('瀅',18),points('瀅',n))>5)
})

test('all 361 source-observed contacts and gaps survive the five-unit playback width', () => {
  const touching:Record<string,string[]>={"埰":["1/2","2/3","4/5","8/9","8/10","8/11","9/10","9/11"],"爀":["2/3","3/4","5/6","6/7","7/8","7/9","9/11","12/13","13/14","14/15","14/16","16/18"],"瀅":["5/6","6/7","9/10","10/11","12/13","14/16","15/16","16/17"]}
  let checked=0
  for(const original of originals)for(let a=1;a<original.catalogStrokes;a++)for(let b=a+1;b<=original.catalogStrokes;b++){
    const gap=separation(points(original.glyph,a),points(original.glyph,b))
    const expected=touching[original.glyph].includes(a+'/'+b)
    assert.ok(expected?gap<=5:gap>5,original.glyph+' '+a+'/'+b+' gap '+gap)
    checked++
  }
  assert.equal(checked,361)
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
  for(const file of Object.keys(G2_GEOMETRY_BATCH24_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2GeometryBatch24DictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const relabeled=structuredClone(buildG2GeometryBatch24DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256='0'.repeat(64)
  assert.throws(()=>loadG2GeometryBatch24DictionaryBundle(relabeled),/entry mismatch/)
  const malformed=structuredClone(buildG2GeometryBatch24DictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2GeometryBatch24DictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2GeometryBatch24DictionaryBundle(HANJA_DICTIONARY_G2_GEOMETRY_BATCH24_STROKES.slice(1)),/published bundle/)
})
