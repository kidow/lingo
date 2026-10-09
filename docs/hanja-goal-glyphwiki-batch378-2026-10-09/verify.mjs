import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {HANJA_STROKES} from '../../lib/hanja-strokes.ts'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),proof=obj('engine-proof.json'),trace=obj('draw-trace.json'),review=obj('review.json')
assert.equal(source.glyph,'灐');assert.equal(source.root,'u7050-k')
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(source.records).length,8);assert.equal(source.providerVersions.length,4)
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
for(const name of source.wholeNames){assert.deepEqual(map.get(name),review.wholeVariants.find(v=>v.name===name));const seen=new Set();let water=false;function walk(n){if(seen.has(n))return;seen.add(n);const r=map.get(n);if(!r)return;if(n==='u6c35-01'){assert.deepEqual(r,review.sharedWater);water=true;}for(const row of r.data.split('$'))if(row.startsWith('99:'))walk(row.split(':')[7]);}walk(name);assert(water)}
const ctx=vm.createContext({records:source.records,root:source.root})
for(const [file,hash] of Object.entries(proof.engineHashes)){
 const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file);assert(response.ok)
 const code=await response.text();assert.equal(sha(code),hash);vm.runInContext(code,ctx,{timeout:1000})
}
const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults)
assert.equal(trace.length,24);assert.equal(trace.flat().length,23);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,18)
assert.deepEqual(trace[2][0].args.slice(4,6),review.failure.originalEnd)
assert.deepEqual(trace[3][0].args.slice(0,2),review.failure.originalStart)
assert(Math.hypot(...review.failure.originalEnd.map((x,i)=>x-review.failure.originalStart[i]))>34)
assert.equal(HANJA_STROKES.some(x=>x.glyph==='灐'),false)
assert.equal(review.allWholeSources.wholeVariants.length,2);for(const v of review.allWholeSources.wholeVariants){assert.deepEqual(v.initial[2][0].args.slice(4,6),review.failure.originalEnd);assert.deepEqual(v.initial[3][0].args.slice(0,2),review.failure.originalStart)}
const meta=obj('metadata.json'),dictionary=await fetch(meta.dictionary.url);assert(dictionary.ok);const bytes=Buffer.from(await dictionary.arrayBuffer());assert.equal(bytes.length,meta.dictionary.bytes);assert.equal(sha(bytes),meta.dictionary.sha256)
const next=obj('next-source-inventory.json');assert.equal(next.glyph,'瓘');assert.deepEqual(next.missing,[]);assert.deepEqual(next.aliases,[])
for(const [name,record] of Object.entries(next.records)){if(/@\d+$/.test(name)){const v=next.providerVersions.find(x=>x.name===name);assert(v);const r=await fetch(v.apiUrl);assert(r.ok);const a=await r.json();assert.equal(a.name,name.split('@')[0]);assert.equal(Number(a.version),v.version);assert.equal(a.related,record.related);assert.equal(a.data,record.data);assert.equal(sha(a.data),v.sha256)}else assert.deepEqual(map.get(name),record)}
assert.equal(HANJA_STROKES.some(x=>x.glyph==='瓘'),false)
console.log(JSON.stringify({glyph:'灐',engineFiles:8,archive:true,records:8,histories:4,raw:24,domesticReviewed:3,progressiveApproved:0,runtimeRegistered:false,next:'瓘',nextRecords:Object.keys(next.records).length,privateMediaSaved:false}))
