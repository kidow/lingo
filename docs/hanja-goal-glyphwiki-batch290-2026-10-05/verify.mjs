import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
const alternate={source:read('./sources-alternative.json'),proof:read('./engine-proof-alternative.json'),trace:read('./draw-trace-alternative.json')}
const items=[{source,proof,trace},alternate]
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"bfe48d17c5a7966a0d7b8eb87d70f1a7440e321b968133e706a4e346dd622a38")
assert.equal(sha(readFileSync(new URL('./sources-alternative.json',import.meta.url))),"46aef2baa9b1ecfe4e47ca7b22ba8d00ed92b5e7716ddbe5f6c00108736d9c12")
assert.equal(source.root,'u8918-k');assert.equal(alternate.source.root,'u8918')
assert.deepEqual(source.providerVersions.map(v=>v.name),['u97cb-g08@2'])
assert.equal(source.providerVersions[0].sha256,'9ea016ffe2f0b518c33dbe288ae716ebec83b83b1b7e5601d5accc28f4890c35')
assert.equal(source.providerVersions[0].author,'nkay');assert.equal(source.providerVersions[0].revision,'2')
for(const v of source.providerVersions){assert.equal(sha(v.data),v.sha256);assert.equal(v.data,source.records[v.name].data)}
for(const x of items){assert.deepEqual(x.source.missing,[]);assert.deepEqual(x.source.aliases,[]);assert.equal(Object.keys(x.source.records).length,3);assert.equal(x.proof.groups.length,18);assert.equal(x.trace.flat().length,18);assert.equal(x.trace.flat().filter(c=>c.kind==='cdDrawCurve').length,3);for(const r of Object.values(x.source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(x.source.records[row.split(':')[7]],'whole declared dependency missing')}
assert.equal(compileProgressive(trace,proof).length,14)
assert.deepEqual(alternate.trace[15][0].args.slice(2,4),[92.86,161])
assert.deepEqual(alternate.trace[16][0].args.slice(0,2),[72.25,161])
assert.notDeepEqual(alternate.trace[15][0].args.slice(2,4),alternate.trace[16][0].args.slice(0,2))
assert.throws(()=>compileProgressive(alternate.trace,alternate.proof),/original pen trajectory must be continuous/)
assert.equal(hanjaStrokeData({glyph:'褘',strokes:14}),null)
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const item of items){
  const ctx=vm.createContext({records:item.source.records,root:item.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual.groups,item.proof.groups);assert.deepEqual(actual.trace,item.trace);assert.deepEqual(actual.defaults,item.proof.defaults)
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,wholeSources:2,rawGroupsEach:18,drawingPrimitivesEach:18,historicalRecords:1,sourceCaptureHashVerified:true,originalPenGapConfirmed:true,runtimeRegistered:0,engineChecked,privateMediaSaved:false}))
