import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
assert.equal(hanjaStrokeData({glyph:'曙',strokes:18}),null)
assert.equal(proof.groups.length,21)
assert.deepEqual(trace[13][0].args.slice(0,4),[70.6,104.55,188.2,104.55])
assert.deepEqual(trace[20][0].args.slice(0,6),[136.75,108.175,148.3,112.525,154.6,121.95])
const alternatives=read('./alternatives.json'),presets=read('./preset-proof.json')
assert.equal(alternatives.records.u66d9.data,'99:0:0:0:0:200:200:u66d9-j')
assert.equal(alternatives.records['u8005-02'].data.split('$').length,5)
assert.equal(source.records['ufa5b-02'].data.split('$').length,6)
assert.equal(source.records['ufa5b-02'].data.split('$').at(-1),'2:7:8:135:83:146:89:152:102')
for(const[name,preset]of Object.entries(presets)){
 const left=preset.groups[2].polygons.flat(),bar=preset.groups[13].polygons.flat()
 const gap=Math.round((Math.min(...bar.map(p=>p.x))-Math.max(...left.map(p=>p.x)))*1e6)/1e6
 assert.equal(gap,{'defaultMincho':1.8,'default-gothic':7.8,'size1-mincho':6.2,'size1-gothic':9.8}[name])
}
const dotBottom=Math.max(...proof.groups[20].polygons.flat().map(p=>p.y)),lowerTop=Math.min(...proof.groups[16].polygons.flat().map(p=>p.y))
assert.equal(Math.round((lowerTop-dotBottom)*1e6)/1e6,1.4)
let sourceVersions=0,engineChecked=false
if(process.argv.includes('--sources'))for(const r of [...Object.values(source.records),...Object.values(alternatives.records)]){
 const response=await fetch('https://glyphwiki.org/api/glyph?name='+encodeURIComponent(r.name+'@'+r.version),{signal:AbortSignal.timeout(15000)});assert(response.ok)
 const a=await response.json();for(const key of ['name','related','data'])assert.equal(a[key],r[key]);assert.equal(Number(a.version),Number(r.version));sourceVersions++
}
if(process.argv.includes('--engine')){
 const ctx=vm.createContext({records:source.records,root:source.root}),engineSources=[]
 for(const[file,hash]of Object.entries(proof.hashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(createHash('sha256').update(code).digest('hex'),hash)
  engineSources.push([file,code]);vm.runInContext(code,ctx,{timeout:1000})
 }
 const output=vm.runInContext(`const k=new Kage();for(const[name,r]of Object.entries(records))k.kBuhin.push(name,r.data);const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000})
 const actual=JSON.parse(output);assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults);for(const name of ['default-gothic','size1-mincho','size1-gothic']){
 const replayContext=vm.createContext({records:source.records,root:source.root})
 for(const[file,code]of engineSources)vm.runInContext(code,replayContext,{timeout:1000})
 const alternateOutput=vm.runInContext(`const k=new Kage(${name.startsWith('size1')?'1':''});${name.endsWith('gothic')?'k.kShotai=k.kGothic;':''}for(const[name,r]of Object.entries(records))k.kBuhin.push(name,r.data);const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,replayContext,{timeout:2000})
  const actualPreset=JSON.parse(alternateOutput);assert.deepEqual(actualPreset.groups,presets[name].groups);assert.deepEqual(actualPreset.defaults,presets[name].defaults);assert.deepEqual(actualPreset.trace,presets[name].trace);
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,sourceVersions,engineChecked,rawGroups:21,domesticStrokes:18,runtimeRegistered:0,held:true,privateMediaSaved:false}))
