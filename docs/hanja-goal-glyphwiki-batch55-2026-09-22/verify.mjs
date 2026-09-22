import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
assert.equal(hanjaStrokeData({glyph:'薩',strokes:18}),null)
assert.equal(proof.groups.length,19)
const alternatives=read('./alternatives.json')
assert.equal(alternatives.records['u8279-03'].data.split('$').length,3)
assert.deepEqual(alternatives.records['u4ea7-var-001@4'].data.split('$').slice(0,5),source.records['u7522-jv@1'].data.split('$').slice(0,5))
const variants=[
 {constructorSize:'default',style:'mincho',proof,trace},
 ...['size1','gothicSize1','gothicDefault'].map(key=>read('./preset-'+key+'.json'))
]
const inside=(p,x,y)=>{let hit=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const a=p[i],b=p[j];if((a.y>y)!==(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)hit=!hit}return hit}
for(const [i,w]of [[0,[150,74.1]],[2,[152.5,76]],[3,[151.4,74.3]]]){
 for(const index of [9,10])assert(variants[i].proof.groups[index].polygons.some(p=>inside(p,...w)))
}
for(const i of [1,2]){
 const groups=variants[i].proof.groups
 assert(Math.min(...groups[12].polygons.flat().map(p=>p.y))>Math.max(...groups[11].polygons.flat().map(p=>p.y)))
}
assert.deepEqual(read('./findings.json').reviewedCumulativeStrokes,Array.from({length:18},(_,i)=>i+1))
assert.equal(read('./findings.json').fullStrokeApproval,false)
let sourceVersions=0,engineChecked=false
if(process.argv.includes('--sources'))for(const r of [...Object.values(source.records),...Object.values(alternatives.records)]){
 const response=await fetch('https://glyphwiki.org/api/glyph?name='+encodeURIComponent(r.name+'@'+r.version),{signal:AbortSignal.timeout(15000)});assert(response.ok)
 const a=await response.json();for(const key of ['name','related','data'])assert.equal(a[key],r[key]);assert.equal(Number(a.version),Number(r.version));sourceVersions++
}
if(process.argv.includes('--engine'))for(const selected of variants){
 const proof=selected.proof,trace=selected.trace
 const ctx=vm.createContext({records:source.records,root:source.root})
 for(const[file,hash]of Object.entries(proof.hashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(createHash('sha256').update(code).digest('hex'),hash)
  vm.runInContext(code,ctx,{timeout:1000})
 }
 const output=vm.runInContext(`const k=new Kage(${selected.constructorSize===1?'1':''});${selected.style==='gothic'?'k.kShotai=k.kGothic;':''}for(const[name,r]of Object.entries(records))k.kBuhin.push(name,r.data);const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000})
 const actual=JSON.parse(output);assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults);engineChecked=true
}
console.log(JSON.stringify({passed:true,sourceVersions,engineChecked,rawGroups:19,domesticStrokes:18,enginePresets:engineChecked?4:0,runtimeRegistered:0,held:true,privateMediaSaved:false}))
