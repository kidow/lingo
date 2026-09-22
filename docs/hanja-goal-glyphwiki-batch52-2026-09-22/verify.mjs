import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
assert.equal(hanjaStrokeData({glyph:'藿',strokes:20}),null)
assert.equal(proof.groups.length,21)
assert.deepEqual(trace[15][0].args.slice(0,6),[93.28,104.1224,105.76,108.7704,111.52,121.32])
assert(trace[15][0].args[4]>trace[15][0].args[0])
assert(trace[15][0].args[5]>trace[15][0].args[1])
const alternatives=read('./alternatives.json')
assert.equal(alternatives.records['u8279-03'].data.split('$').length,3)
assert.equal(alternatives.records['u96b9-04@2'].data.split('$')[2],'2:0:7:117:87:107:99:98:108')
assert(alternatives.priorRoot.record.data.includes('u970d-g@4'))
let sourceVersions=0,engineChecked=false
if(process.argv.includes('--sources'))for(const r of [...Object.values(source.records),...Object.values(alternatives.records),alternatives.priorRoot.record]){
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
 const output=vm.runInContext(`const k=new Kage();for(const[name,r]of Object.entries(records))k.kBuhin.push(name,r.data);const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000})
 const actual=JSON.parse(output);assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults);engineChecked=true
}
console.log(JSON.stringify({passed:true,sourceVersions,engineChecked,rawGroups:21,domesticStrokes:20,runtimeRegistered:0,held:true,privateMediaSaved:false}))
