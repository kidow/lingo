import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),inventory=read('./whole-source-inventory.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"7a4ae3035f1e81a43c63cd52d769ea33badbcd21ec8ce8d8d6a893f1eef1e39e")
assert.equal(source.root,'u7443-k');assert.equal(source.missing.length,0)
assert.equal(Object.keys(source.records).length,6);assert.equal(proof.groups.length,14);assert.equal(trace.flat().length,14)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,3)
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]])
assert.deepEqual(trace[8][0].args.slice(0,2),[137.57999999999998,62.74])
assert.equal(trace[6][0].args[1],88.22);assert.equal(Number((88.22-62.74).toFixed(2)),25.48)
assert.equal(inventory.wholePrefixCandidates.length,3)
for(const c of inventory.wholePrefixCandidates){assert.equal(c.missing.length,0);assert.equal(c.records.u6625.data,source.records.u6625.data);assert.equal(c.records.u215d7.data,source.records.u215d7.data)}
assert.equal(hanjaStrokeData({glyph:'瑃',strokes:13}),null)
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const item of [{source,proof,trace}]){
  const ctx=vm.createContext({records:item.source.records,root:item.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual.groups,item.proof.groups);assert.deepEqual(actual.trace,item.trace);assert.deepEqual(actual.defaults,item.proof.defaults)
 }
 engineChecked=true
}

console.log(JSON.stringify({passed:true,held:true,engineChecked,rawGroups:14,drawingPrimitives:14,domesticReviewed:13,progressiveFramesApproved:0,runtimeRegistered:0,curveStartY:62.74,thirdHorizontalY:88.22,difference:25.48,privateMediaSaved:false}))
