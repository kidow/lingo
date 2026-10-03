import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),rejected=read('./rejected-k-source.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"7311e7f086ac6f44e3f12faa0d45c16cf08ad77dc06418c20292752a4e12d61d")
assert.equal(source.root,'u633b-g')
assert.deepEqual(source.providerVersions.map(v=>[v.name,v.version]),[["u633b-g",1],["u624c-01",4],["u5ef6-g02",2],["u5ef4-g02",4]])
for(const v of source.providerVersions)assert.equal(v.data,source.records[v.name].data)
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'declared whole dependency missing')
assert.equal(proof.groups.length,13)
assert.deepEqual(sourceGroups,[[0],[1],[2],[12],[8],[9],[10,11],[3,4],[5,6],[7]])
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),[0,1,2,3,4,5,6,7,8,9,10,11,12])
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,5)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
assert.deepEqual(source.aliases,[])
const runtime=hanjaStrokeData({glyph:'挻',strokes:10});assert(runtime)
assert.equal(runtime.verificationSource,'ehanja-crosschecked')
const outlines=compileProgressive(trace,proof);assert.deepEqual(runtime.outlines,outlines);assert.deepEqual(runtime.paths,outlines.map(s=>s.map(p=>p.outline).join(' ')))
const editable=readFileSync(new URL('../../public/hanja-strokes/glyphwiki/633b.json',import.meta.url)),asset=JSON.parse(editable)
assert.equal(runtime.geometrySource,sha(editable));assert.equal(asset.root,source.root)
assert.deepEqual(asset.records,source.records);assert.deepEqual(asset.providerVersions,source.providerVersions)
assert.deepEqual(asset.drawTrace,trace);assert.deepEqual(asset.sourceGroups,sourceGroups);assert.deepEqual(asset.engineHashes,proof.engineHashes)
assert.deepEqual(asset.enginePreset,{size:'default',style:'mincho'})
const reviewHash=sha(readFileSync(new URL('./progressive-review.json',import.meta.url)))
for(const key of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])assert.equal(runtime.sourceReference[key],reviewHash)
assert.equal(runtime.pathsSha256,sha(JSON.stringify(runtime.paths)))
assert.equal(rejected.rejected,true);assert.equal(rejected.source.root,'u633b-k')
assert.deepEqual(rejected.engine.trace[7][0].args.slice(4,6),[83,105]);assert.deepEqual(rejected.engine.trace[8][0].args.slice(0,2),[81,113]);assert.equal(rejected.gap.distance,Math.sqrt(68))
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const item of [{source,proof,trace},{source:rejected.source,proof:rejected.engine,trace:rejected.engine.trace}]){
  const ctx=vm.createContext({records:item.source.records,root:item.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual.groups,item.proof.groups);assert.deepEqual(actual.trace,item.trace);assert.deepEqual(actual.defaults,item.proof.defaults)
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,providerRecords:4,sourceCaptureHashVerified:true,engineChecked,rejectedKSourceReproduced:engineChecked,rawGroups:13,strokeGroups:10,quadraticPrimitives:5,cubicPrimitives:0,runtimeRegistered:1,privateMediaSaved:false}))
