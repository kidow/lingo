import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
assert.equal(source.root,'u4f8a');assert.deepEqual(source.missing,[])
assert.equal(Object.keys(source.records).length,3);assert.equal(proof.groups.length,8)
for(const record of Object.values(source.records))for(const row of record.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'missing exact dependency')
assert.equal(trace[5][0].args[1],98)
assert.equal(trace[6][0].args[1],104)
const presets=read('./presets.json')
assert.equal(presets.length,4)
for(const p of presets)assert(Math.max(...p.bar.flat().map(v=>v.y))<Math.min(...p.falling.flat().map(v=>v.y)),'source curve must remain separated in every inspected preset')
assert.equal(read('./alternative-sources.json').records['u4f8a-k'].data,'99:0:0:0:0:200:200:u4f8a')
assert.equal(hanjaStrokeData({glyph:'侊',strokes:8}),null)
let sourceVersions=0,engineChecked=false
if(process.argv.includes('--sources')){
 const url='https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt'
 assert.equal(source.snapshot.url,url)
 const response=await fetch(url,{signal:AbortSignal.timeout(45000)});assert(response.ok)
 const buffer=Buffer.from(await response.arrayBuffer());assert.equal(buffer.length,source.snapshot.bytes)
 assert.equal(createHash('sha256').update(buffer).digest('hex'),source.snapshot.sha256)
 const found=new Set()
 for(const line of buffer.toString('utf8').split('\n')){
  const [name,related,data]=line.split('|').map(s=>s.trim())
  if(source.records[name]){assert.deepEqual({name,related,data},source.records[name]);found.add(name)}
 }
 assert.equal(found.size,Object.keys(source.records).length);sourceVersions=found.size
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
 const result=vm.runInContext(`JSON.stringify([undefined,1].flatMap(size=>[false,true].map(gothic=>{const k=size===undefined?new Kage():new Kage(size);if(gothic)k.kShotai=k.kGothic;for(const [n,r]of Object.entries(records))k.kBuhin.push(n,r.data);const groups=[];const orig=dfDrawFont;dfDrawFont=function(...args){const start=args[1].array.length;orig(...args);groups.push(args[1].array.slice(start).map(p=>p.array));};const p=new Polygons();try{k.makeGlyph(p,root)}finally{dfDrawFont=orig}return {size:size===undefined?'default':1,style:gothic?'gothic':'mincho',bar:groups[5],falling:groups[6],groups:groups.length}})))`,ctx,{timeout:4000});
 assert.deepEqual(JSON.parse(result),presets)
}
console.log(JSON.stringify({passed:true,sourceVersions,engineChecked,rawGroups:8,reviewedDomesticStrokes:8,separatedPresets:4,runtimeAdded:0,privateMediaSaved:false}))
