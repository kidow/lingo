import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
const runtime=hanjaStrokeData({glyph:'劤',strokes:6})
assert(runtime);assert.equal(runtime.verificationSource,'ehanja-crosschecked')
assert.equal(proof.groups.length,7);assert.equal(sourceGroups.length,6)
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:7},(_,i)=>i))
const outlines=compileProgressive(trace,proof)
assert.deepEqual(runtime.outlines,outlines)
assert.deepEqual(runtime.paths,outlines.map(s=>s.map(p=>p.outline).join(' ')))
const editable=readFileSync(new URL('../../public/hanja-strokes/glyphwiki/52a4.json',import.meta.url))
assert.equal(runtime.geometrySource,createHash('sha256').update(editable).digest('hex'))
const asset=JSON.parse(editable)
assert.deepEqual(asset.records,source.records);assert.deepEqual(asset.drawTrace,trace)
assert.deepEqual(asset.sourceGroups,sourceGroups);assert.deepEqual(asset.engineHashes,proof.hashes)
assert.equal(runtime.sourceReference.geometryReviewSha256,createHash('sha256').update(readFileSync(new URL('./progressive-review.json',import.meta.url))).digest('hex'))
const reviewHash=createHash('sha256').update(readFileSync(new URL('./progressive-review.json',import.meta.url))).digest('hex')
for(const key of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])assert.equal(runtime.sourceReference[key],reviewHash)
assert.equal(runtime.pathsSha256,createHash('sha256').update(JSON.stringify(runtime.paths)).digest('hex'))
assert.deepEqual(trace[1][0].args.slice(2,4),trace[1][1].args.slice(0,2))
assert.deepEqual(trace[4][0].args.slice(2,4),trace[5][0].args.slice(0,2))
assert.deepEqual(trace[5][0].args.slice(4,6),trace[5][1].args.slice(0,2))
assert.deepEqual(trace[6][0].args.slice(2,4),trace[6][1].args.slice(0,2))
let sourceVersions=0,engineChecked=false
if(process.argv.includes('--sources'))for(const r of Object.values(source.records)){
 const response=await fetch('https://glyphwiki.org/api/glyph?name='+encodeURIComponent(r.name+'@'+r.version),{signal:AbortSignal.timeout(15000)});assert(response.ok)
 const a=await response.json();for(const key of ['name','related','data'])assert.equal(a[key],r[key]);assert.equal(Number(a.version),Number(r.version));sourceVersions++
}
if(process.argv.includes('--engine')){
 const ctx=vm.createContext({records:source.records,root:source.root})
 for(const[file,hash]of Object.entries(proof.hashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(createHash('sha256').update(code).digest('hex'),hash)
  vm.runInContext(code,ctx,{timeout:1000})
 }
 const output=vm.runInContext(`const k=new Kage();for(const [name,r] of Object.entries(records))k.kBuhin.push(name,r.data);const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000})
 const actual=JSON.parse(output);assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults);engineChecked=true
}
console.log(JSON.stringify({passed:true,sourceVersions,engineChecked,rawGroups:7,strokeGroups:6,hookStrokeSegments:4,runtimeRegistered:1,privateMediaSaved:false}))
