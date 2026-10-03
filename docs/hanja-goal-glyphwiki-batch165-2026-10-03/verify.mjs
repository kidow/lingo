import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import vm from 'node:vm'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const s=read('./sources.json'),e=read('./engine-trace.json'),f=read('./findings.json')
assert.equal(s.root,'u4fd3-j')
assert.deepEqual(s.providerVersions.map(v=>[v.name,v.version]),[['u4fd3-j',3],['u4ebb-01',12],['u5de0-02',3]])
for(const v of s.providerVersions)assert.equal(v.data,s.records[v.name].data)
function resolve(name,seen=[]){assert(!seen.includes(name));const r=s.records[name];assert(r);const alias=r.data.match(/^\[\[([^\]]+)\]\]$/);return alias?resolve(alias[1],[...seen,name]):r.data}
for(const r of Object.values(s.records))for(const row of resolve(r.name).split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])
assert.equal(e.trace.length,12);assert.equal(Object.keys(e.hashes).length,8)
assert.deepEqual(s.aliases,[{name:'u4fd3-k',version:5,target:'u4fd3-j',url:'https://glyphwiki.org/wiki/u4fd3-k@5'}])
for(const c of f.continuity){const a=e.trace[c.precedingPrimitive][0],b=e.trace[c.nextPrimitive][0];assert.equal(a.kind,'cdDrawCurve');assert.equal(b.kind,'cdDrawCurve');assert.deepEqual(a.args.slice(4,6),c.previousEndpoint);assert.deepEqual(b.args.slice(0,2),c.nextStartpoint);assert.notDeepEqual(c.previousEndpoint,c.nextStartpoint)}
assert.deepEqual(f.continuity.map(c=>c.domesticStroke),[4,5,6])
assert.deepEqual(f.continuity.map(c=>c.previousEndpoint),[[77,78],[111.85,78],[145.675,78]])
assert.deepEqual(f.continuity.map(c=>c.nextStartpoint),[[75.975,76],[110.825,76],[144.65,76]])
assert.equal(f.status,'held');assert.equal(f.runtimeAdded,0);assert.equal(f.domestic.strokeOutlines,9);assert.equal(f.fullStrokeReviewCompleted,false)
assert.equal(hanjaStrokeData({glyph:'俓',strokes:9}),null)
let engineChecked=false
if(process.argv.includes('--engine')){
 const ctx=vm.createContext({records:s.records,root:s.root})
 for(const[file,hash]of Object.entries(e.hashes)){const r=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+e.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(r.ok);const c=await r.text();assert.equal(createHash('sha256').update(c).digest('hex'),hash);vm.runInContext(c,ctx,{timeout:1000})}
 const output=vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000})
 const actual=JSON.parse(output);assert.deepEqual(actual.groups,e.groups);assert.deepEqual(actual.trace,e.trace);assert.deepEqual(actual.defaults,e.defaults);engineChecked=true
}
console.log(JSON.stringify({passed:true,glyph:'俓',discontinuityConfirmed:true,engineChecked,runtimeAdded:0}))
