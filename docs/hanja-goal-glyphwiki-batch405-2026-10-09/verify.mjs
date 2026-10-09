import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {compileProgressive,renderProgressive,sourceGroups} from './progressive.mjs'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),proof=obj('engine-proof.json'),trace=obj('draw-trace.json'),review=obj('progressive-review.json')
assert.equal(source.glyph,'瞯');assert.equal(source.root,'u77af')
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(source.records).length,6);assert.equal(source.providerVersions.length,2)
const archiveResponse=await fetch(source.archive.url);assert(archiveResponse.ok)
const archive=await archiveResponse.text();assert.equal(sha(archive),source.archive.sha256)
const map=new Map(archive.split('\n').map(l=>l.split('|').map(s=>s.trim())).filter(a=>a.length>=3).map(a=>[a[0],{name:a[0],related:a[1],data:a[2]}]))
for(const [name,record] of Object.entries(source.records)){
 if(/@\d+$/.test(name)){
  const version=source.providerVersions.find(v=>v.name===name);assert(version)
  const response=await fetch(version.apiUrl);assert(response.ok);const actual=await response.json()
  assert.equal(actual.name,name.split('@')[0]);assert.equal(Number(actual.version),version.version)
  assert.equal(actual.related,record.related);assert.equal(actual.data,record.data);assert.equal(sha(actual.data),version.sha256)
 }else assert.deepEqual(map.get(name),record)
}
for(const name of source.wholeNames)assert.deepEqual(map.get(name),review.wholeVariants.find(v=>v.name===name))
const ctx=vm.createContext({records:source.records,root:source.root})
for(const [file,hash] of Object.entries(proof.engineHashes)){
 const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file);assert(response.ok)
 const code=await response.text();assert.equal(sha(code),hash);vm.runInContext(code,ctx,{timeout:1000})
}
const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults)
assert.equal(trace.length,21);assert.equal(trace.flat().length,24);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,3)
assert.equal(HANJA_STROKES.some(x=>x.glyph==='瞯'),true)
const meta=obj('metadata.json'),dictionary=await fetch(meta.dictionary.url);assert(dictionary.ok);const bytes=Buffer.from(await dictionary.arrayBuffer());assert.equal(bytes.length,meta.dictionary.bytes);assert.equal(sha(bytes),meta.dictionary.sha256)
const next=obj('next-source-inventory.json');assert.equal(next.glyph,'矙');assert.deepEqual(next.missing,[]);assert.deepEqual(next.aliases,[])
for(const [name,record] of Object.entries(next.records)){if(/@\d+$/.test(name)){const v=next.providerVersions.find(x=>x.name===name);assert(v);const r=await fetch(v.apiUrl);assert(r.ok);const a=await r.json();assert.equal(a.name,name.split('@')[0]);assert.equal(Number(a.version),v.version);assert.equal(a.related,record.related);assert.equal(a.data,record.data);assert.equal(sha(a.data),v.sha256)}else assert.deepEqual(map.get(name),record)}
assert.equal(HANJA_STROKES.some(x=>x.glyph==='矙'),false)
const compiled=compileProgressive(trace,proof);assert.equal(compiled.length,17);assert.equal(compiled.flat().length,17);assert.equal(compiled.flat().filter(s=>s.direction==='curve').length,5);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0);for(const [i,indices] of sourceGroups.entries()){const original=indices.flatMap(n=>proof.groups[n].polygons);const points=p=>JSON.stringify(p.map(v=>[v.x/2,v.y/2]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]));const got=compiled[i].flatMap(s=>s.outline.split(' Z').filter(Boolean).map(poly=>Array.from(poly.matchAll(/[ML]([^ ]+) ([^ ]+)/g)).map(m=>[Number(m[1]),Number(m[2])]).sort((a,b)=>a[0]-b[0]||a[1]-b[1])));assert.deepEqual(got.map(x=>JSON.stringify(x)).sort(),original.map(points).sort());}for(let n=1;n<=17;n++)for(const p of [0,.125,.25,.375,.5,.625,.75,.875,1])assert(renderProgressive(compiled,n,p).includes('<svg'));for(const [i,j,k] of [[13,1,0],[16,1,2],[18,1,0]]){const broken=structuredClone(trace);broken[i][j].args[k]+=1;assert.throws(()=>compileProgressive(broken,proof));}const runtime=hanjaStrokeData({glyph:'瞯',strokes:17});assert(runtime);assert.deepEqual(runtime.outlines,compiled);assert.deepEqual(runtime.paths,compiled.map(s=>s.map(p=>p.outline).join(' ')));assert.equal(runtime.geometrySource,sha(read('../../public/hanja-strokes/glyphwiki/77af.json')));assert.equal(review.progressiveFramesApproved,153);assert.deepEqual(review.sourceGroupsZeroBased,sourceGroups);
console.log(JSON.stringify({passed:true,glyph:'瞯',engineFiles:8,archiveVerified:true,records:6,histories:2,raw:21,draw:24,pens:17,masks:17,curves:5,nativeFrames:153,runtimeRegistered:true,next:'矙',privateMediaSaved:false}))
