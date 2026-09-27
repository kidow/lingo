import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
assert.equal(source.root,'u6cdb');assert.equal(Object.keys(source.records).length,4)
assert.equal(proof.groups.length,10);assert.equal(hanjaStrokeData({glyph:'泛',strokes:8}),null)
assert.deepEqual(trace[2][0].args.slice(4,6),[39.875,183.48])
assert.deepEqual(trace[3][0].args.slice(0,2),[36,150.5])
assert.deepEqual(trace[8][0].args.slice(4,6),[92.37,130.8])
assert.deepEqual(trace[9][0].args.slice(0,2),[91.225,130.8])
const alternative=read('./current-source-alternative.json'),currentTrace=read('./current-draw-trace.json')
assert.equal(alternative.root,'u6cdb-j')
assert.deepEqual(alternative.providerVersions.map(v=>v.version),[7,21,1,3])
for(const r of Object.values(alternative.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(alternative.records[row.split(':')[7]])
for(const v of alternative.providerVersions)assert.equal(v.data,alternative.records[v.name].data)
assert.deepEqual(currentTrace[2][0].args.slice(4,6),[42.75,184])
assert.deepEqual(currentTrace[3][0].args.slice(0,2),[39.49,145])
assert.deepEqual(currentTrace[8][0].args.slice(4,6),[93.49,130.8])
assert.deepEqual(currentTrace[9][0].args.slice(0,2),[92.325,130.8])
for(const [a,b]of [[2,3],[8,9]])assert.notDeepEqual(currentTrace[a][0].args.slice(4,6),currentTrace[b][0].args.slice(0,2))
let sourceVersions=0,engineChecked=false
if(process.argv.includes('--sources')){
 const url='https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt'
 assert.equal(source.snapshot.url,url)
 const response=await fetch(url,{signal:AbortSignal.timeout(45000)});assert(response.ok)
 const buffer=Buffer.from(await response.arrayBuffer());assert.equal(buffer.length,source.snapshot.bytes)
 assert.equal(createHash('sha256').update(buffer).digest('hex'),source.snapshot.sha256)
 const allRecords=source.records
 const found=new Set()
 for(const line of buffer.toString('utf8').split('\n')){
  const [name,related,data]=line.split('|').map(s=>s.trim())
  if(allRecords[name]){assert.deepEqual({name,related,data},allRecords[name]);found.add(name)}
 }
 assert.equal(found.size,Object.keys(allRecords).length);sourceVersions=found.size
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
console.log(JSON.stringify({passed:true,sourceVersions,engineChecked,domesticReviewed:8,archiveRawGroups:10,blockedStrokes:[3,8],currentWholeSourceRecords:4,runtimeAdded:0,privateMediaSaved:false}))
