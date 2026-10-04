import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),metadata=read('./metadata.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),'9e7ea7fab35b9341580c39a765c15551db46e0aa9476b3f11fb72e229388eeed')
assert.equal(source.root,'u596b-k')
assert.equal(source.missing.length,0)
assert.equal(Object.keys(source.records).length,7)
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'declared dependency missing')
assert.equal(proof.groups.length,18)
assert.equal(trace.flat().length,19)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,7)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
assert.equal(metadata.candidate.strokes,14)
const down=trace[5][0].args.slice(4,6),rise=trace[6][0].args.slice(0,2)
assert.deepEqual(down,[37.125,184.6])
assert.deepEqual(rise,[33,162.5])
assert.notDeepEqual(down,rise,'source third water pen is discontinuous; do not invent a connector')
assert.equal(metadata.dictionary.strokeCount,15)
assert.equal(metadata.dictionary.sha256,'853d6ab639c0e5905851787ba1c1050a2bd80a5fe72d2aadf0309fe9380955ea')
assert.equal(hanjaStrokeData(metadata.candidate),null)
assert.equal(hanjaStrokeData({glyph:'奫',strokes:15}),null)
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
console.log(JSON.stringify({passed:true,held:true,engineChecked,providerRecords:7,rawGroups:18,drawingPrimitives:19,quadraticPrimitives:7,cubicPrimitives:0,catalogStrokes:14,domesticStrokes:15,runtimeRegistered:0,progressiveFramesApproved:0,privateMediaSaved:false}))
