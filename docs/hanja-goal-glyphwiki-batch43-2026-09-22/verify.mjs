import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),proof=read('./engine-proof.json'),finding=read('./findings.json')
const runtime=hanjaStrokeData({glyph:'芭',strokes:8})
assert(runtime);assert.equal(runtime.verificationSource,'ehanja-crosschecked')
const trace=read('./draw-trace.json'),outlines=compileProgressive(trace,proof)
assert.deepEqual(runtime.outlines,outlines)
assert.deepEqual(runtime.paths,outlines.map(s=>s.map(p=>p.outline).join(' ')))
assert.equal(runtime.sourceReference.geometryReviewSha256,createHash('sha256').update(readFileSync(new URL('./progressive-review.json',import.meta.url))).digest('hex'))
assert.equal(proof.groups.length,9);assert.equal(proof.sourceGroups.length,8)
assert.deepEqual(proof.sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:9},(_,i)=>i))
const last=proof.groups.at(-1);assert.deepEqual(last.raw.slice(0,3),[3,12,5]);assert.equal(last.polygons.length,7)
assert.deepEqual(last.polygons.at(-1).map(p=>[p.x,p.y]),finding.lastStroke.polygon)
assert(last.polygons.at(-1)[1].y<last.polygons.at(-1)[0].y)
let sourceVersions=0,engineChecked=false
if(process.argv.includes('--sources'))for(const r of Object.values(source.records)){
 const response=await fetch('https://glyphwiki.org/api/glyph?name='+encodeURIComponent(r.name+'@'+r.version),{signal:AbortSignal.timeout(15000)});assert(response.ok)
 const a=await response.json();for(const key of ['name','related','data'])assert.equal(a[key],r[key]);assert.equal(Number(a.version),Number(r.version));sourceVersions++
}
if(process.argv.includes('--engine')){
 const ctx=vm.createContext({})
 for(const[file,hash]of Object.entries(proof.hashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file));const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(createHash('sha256').update(code).digest('hex'),hash)
  vm.runInContext(code,ctx,{timeout:1000})
 }
 ctx.records=source.records;ctx.root=source.root
 const output=vm.runInContext(`const k=new Kage();for(const r of Object.values(records))k.kBuhin.push(r.name,r.data);const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const originalDraw=dfDrawFont;dfDrawFont=function(...args){calls=[];const polygons=args[1],start=polygons.array.length;originalDraw(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:polygons.array.slice(start).map(p=>p.array)});};const polys=new Polygons();k.makeGlyph(polys,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000})
 const actual=JSON.parse(output);assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults);engineChecked=true
}
console.log(JSON.stringify({passed:true,sourceVersions,engineChecked,rawGroups:9,strokeGroups:8,lastStrokePolygons:7,runtimeRegistered:1,privateMediaSaved:false}))
