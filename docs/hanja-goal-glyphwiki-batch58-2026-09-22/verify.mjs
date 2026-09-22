import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
assert.equal(hanjaStrokeData({glyph:'竪',strokes:13}),null)
assert.equal(proof.groups.length,16)
assert.deepEqual(trace[13][0].args.slice(0,6),[54,136.58499999999998,73,150.425,79,170.32])
assert.equal(trace[15][0].args[1],178.105)
const alternatives=read('./alternatives.json'),presets=read('./preset-proof.json')
assert.equal(alternatives.records.u7aea.data,source.records['u7aea-k'].data)
for(const [name,preset] of Object.entries(presets)){
 const dot=preset.groups[13].polygons.flat(),minX=Math.min(...dot.map(p=>p.x)),maxX=Math.max(...dot.map(p=>p.x)),maxY=Math.max(...dot.map(p=>p.y))
 const bars=preset.groups[15].polygons.filter(p=>Math.max(...p.map(v=>v.x))>=minX&&Math.min(...p.map(v=>v.x))<=maxX)
 const gap=Math.round((Math.min(...bars.flat().map(p=>p.y))-maxY)*1e6)/1e6
 assert.equal(gap,{'defaultMincho':3,'default-gothic':1.4,'size1-mincho':4.9,'size1-gothic':4}[name])
}
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
console.log(JSON.stringify({passed:true,sourceVersions,engineChecked,rawGroups:16,domesticStrokes:13,runtimeRegistered:0,held:true,privateMediaSaved:false}))
