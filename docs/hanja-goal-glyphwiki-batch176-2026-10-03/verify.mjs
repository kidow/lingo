import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),finding=read('./findings.json'),alternate=read('./alternative-sources.json')
const expectedHashes={"sources.json":"631c558b3ea1dde616f1844fc0c4479e1962fcb0717eb14bebb80f12b7d2feaf","alternative-sources.json":"536a0c9f2cbfbf607cfa06c57cca4f41780f1302cf29e349d237643164646250","findings.json":"3c6443d5add434c0bedff21c714647e24c661e307ef1d30d993bd3411d2acff0"}
for(const [name,hash]of Object.entries(expectedHashes))assert.equal(createHash('sha256').update(readFileSync(new URL(name,import.meta.url))).digest('hex'),hash)
assert.equal(source.root,'u8fea-k')
assert.deepEqual(source.providerVersions.map(v=>[v.name,v.version]),[['u8fea-k',7],['u8fb6-j',2],['u7531-07',2]])
for(const v of source.providerVersions)assert.equal(v.data,source.records[v.name].data)
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'whole-source dependency missing')
assert.equal(proof.groups.length,12)
assert.deepEqual(finding.sourceGroupsZeroBased.flat().sort((a,b)=>a-b),Array.from({length:12},(_,i)=>i))
assert.deepEqual(trace[7][0].args.slice(2,4),trace[8][0].args.slice(0,2))
assert.deepEqual(trace[2][0].args.slice(2,4),trace[3][0].args.slice(0,2))
assert.deepEqual(trace[4][0].args.slice(4,6),[55,154])
assert.deepEqual(trace[5][0].args.slice(0,2),[53,152])
assert.notDeepEqual(trace[4][0].args.slice(4,6),trace[5][0].args.slice(0,2))
assert.equal(finding.mismatch.distance,Math.hypot(55-53,154-152))
assert.equal(finding.progressiveFramesReviewed,0)
assert.deepEqual(alternate.providerVersions.map(v=>[v.name,v.version]),[['u8fea-t',9],['u8fb6-t',11],['u7531-j',2]])
for(const v of alternate.providerVersions)assert.equal(v.data,alternate.records[v.name].data)
assert.equal(alternate.records['u8fb6-t'].data.split('$')[0],'2:7:8:26:16:46:26:55:46')
assert.equal(hanjaStrokeData({glyph:'迪',strokes:9}),null)
let engineChecked=false
if(process.argv.includes('--engine')){
 const ctx=vm.createContext({records:source.records,root:source.root})
 for(const[file,hash]of Object.entries(proof.hashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(createHash('sha256').update(code).digest('hex'),hash)
  vm.runInContext(code,ctx,{timeout:1000})
 }
 const output=vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000})
 const actual=JSON.parse(output);assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults);engineChecked=true
}

console.log(JSON.stringify({passed:true,status:'held',engineChecked,providerRecords:3,alternativeProviderRecords:3,rawGroups:12,domesticReviewed:9,discontinuousFinalSweep:true,runtimeAdded:0,privateMediaSaved:false}))
