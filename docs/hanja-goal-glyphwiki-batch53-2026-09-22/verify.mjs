import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),proof=read('./engine-proof-gothic-size1.json'),trace=read('./draw-trace-gothic-size1.json')
const runtime=hanjaStrokeData({glyph:'萄',strokes:12})
assert(runtime);assert.equal(runtime.verificationSource,'ehanja-crosschecked')
assert.equal(proof.groups.length,14);assert.equal(sourceGroups.length,12)
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:14},(_,i)=>i))
const outlines=compileProgressive(trace,proof)
assert.deepEqual(runtime.outlines,outlines)
assert.deepEqual(runtime.paths,outlines.map(s=>s.map(p=>p.outline).join(' ')))
assert.equal(runtime.sourceReference.geometryReviewSha256,createHash('sha256').update(readFileSync(new URL('./progressive-review.json',import.meta.url))).digest('hex'))
const editable=readFileSync(new URL('../../public/hanja-strokes/glyphwiki/8404.json',import.meta.url))
assert.equal(runtime.geometrySource,createHash('sha256').update(editable).digest('hex'))
const asset=JSON.parse(editable)
assert.deepEqual(asset.records,source.records);assert.deepEqual(asset.drawTrace,trace);assert.deepEqual(asset.sourceGroups,sourceGroups)
assert.equal(asset.engineConstructorSize,1);assert.equal(asset.engineStyle,'gothic')
assert.equal(proof.engineConstructorSize,1);assert.equal(proof.engineStyle,'gothic')
const grass=proof.groups[1].polygons.flat(),fall=proof.groups[11].polygons.flat()
const gap=Math.min(...grass.map(p=>p.x))-Math.max(...fall.map(p=>p.x))
assert(gap>0,'Reviewed grass and falling stroke must stay separate')
function inside(p,poly){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a.y>p.y)!=(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)c=!c}return c}
for(const[file,point]of [['./engine-proof.json',{x:62.4,y:49.6}],['./engine-proof-size1.json',{x:61.6,y:50.2}]]){
 const rejected=read(file);assert(rejected.groups[11].polygons.some(p=>p.some(v=>v.x===point.x&&v.y===point.y)));assert(inside(point,rejected.groups[1].polygons[0]))
}
let sourceVersions=0,engineChecked=false
if(process.argv.includes('--sources'))for(const r of Object.values(source.records)){
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
 const output=vm.runInContext(`const k=new Kage(1);k.kShotai=k.kGothic;for(const [name,r] of Object.entries(records))k.kBuhin.push(name,r.data);const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kShotai:k.kShotai,kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000})
 const actual=JSON.parse(output);assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults);engineChecked=true
}
console.log(JSON.stringify({passed:true,sourceVersions,engineChecked,rawGroups:14,strokeGroups:12,hookSegments:3,preset:"Kage(1)-Gothic",separation:gap,runtimeRegistered:1,privateMediaSaved:false}))
