import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=(name)=>JSON.parse(fs.readFileSync(new URL(name,import.meta.url),'utf8'))
const source=read('./sources.json'),engine=read('./engine-proof.json'),trace=read('./draw-trace.json'),findings=read('./findings.json')
assert.equal(source.glyph,'玹');assert.equal(source.root,'u73b9-k');assert.equal(Object.keys(source.records).length,4)
assert.deepEqual(source.providerVersions.map(v=>[v.name,v.version]),[['u73b9-k',9],['u73b9',12],['u248e9-01',10],['u7384-02',5]])
const records=source.records,root=source.root,sandbox={records,root,console};vm.createContext(sandbox)
for(const [name,hash] of Object.entries(engine.engineHashes)){
 const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+engine.engineRevision+'/'+name)
 assert(response.ok);const code=await response.text();assert.equal(crypto.createHash('sha256').update(code).digest('hex'),hash);vm.runInContext(code,sandbox)
}
const reproduced=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,sandbox))
assert.deepEqual(reproduced.groups,engine.groups);assert.deepEqual(reproduced.trace,trace);assert.deepEqual(reproduced.defaults,engine.defaults)
assert.equal(engine.groups.length,11)
for(const gap of findings.gaps){
 const [a,b]=gap.rawGroups;const last=trace[a].at(-1),first=trace[b][0]
 assert.equal(last.kind,'cdDrawCurve');const end=last.args.slice(4,6),start=first.args.slice(0,2)
 assert.deepEqual(end,gap.end);assert.deepEqual(start,gap.start);assert.equal(Math.hypot(end[0]-start[0],end[1]-start[1]),gap.distance);assert(gap.distance>18)
}
assert.equal(findings.status,'held');assert.equal(findings.runtimeAdded,0);assert.equal(findings.domesticReview.privateMediaSaved,false)
assert.equal(hanjaStrokeData({glyph:'玹',strokes:9}),null)
console.log(JSON.stringify({glyph:'玹',engineFiles:8,providerRecords:4,rawGroups:11,discontinuousJoins:findings.gaps.length,runtimeAdded:0,passed:true}))
