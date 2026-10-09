import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {compileProgressive} from './progressive.mjs'
import {HANJA_STROKES} from '../../lib/hanja-strokes.ts'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),proof=obj('engine-proof.json'),trace=obj('draw-trace.json'),review=obj('review.json')
assert.equal(source.glyph,'褧');assert.equal(source.root,'u8927')
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(source.records).length,3);assert.equal(source.providerVersions.length,0)
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

assert.equal(trace.length,17);assert.equal(trace.flat().length,17);assert.equal(trace.flat().filter(x=>x.kind==='cdDrawCurve').length,9);assert.equal(review.domesticStrokesReviewed,16);assert.equal(review.progressiveFramesApproved,0);assert.equal(review.allWholeSources.wholeVariants.length,4);
for(const info of review.allWholeSources.wholeVariants){
 const records={};async function visit(n){if(records[n])return;let record=map.get(n);if(!record&&/@\d+$/.test(n)){const r=await fetch('https://glyphwiki.org/api/glyph?name='+encodeURIComponent(n));assert(r.ok);const j=await r.json();assert.equal(j.name,n.split('@')[0]);assert.equal(Number(j.version),Number(n.split('@')[1]));record={name:n,related:j.related,data:j.data}}assert(record);records[n]=record;const alias=record.data.match(/^\[\[([^\]]+)\]\]$/);if(alias)await visit(alias[1]);else for(const row of record.data.split('$'))if(row.startsWith('99:'))await visit(row.split(':')[7]);}
 await visit(info.root);const vctx=vm.createContext({records,root:info.root});
 for(const [file,hash] of Object.entries(proof.engineHashes)){const r=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file);assert(r.ok);const code=await r.text();assert.equal(sha(code),hash);vm.runInContext(code,vctx,{timeout:1000})}
 const actualExpression=readFileSync(new URL('verify.mjs',import.meta.url),'utf8');const start=actualExpression.indexOf('const actual=JSON.parse(vm.runInContext(')+'const actual=JSON.parse(vm.runInContext('.length,end=actualExpression.indexOf(',ctx,{timeout:2000}))',start),instrument=vm.runInNewContext(actualExpression.slice(start,end));
 const a=JSON.parse(vm.runInContext(instrument,vctx,{timeout:2000}));assert.equal(a.trace.length,info.raw);assert.equal(a.trace.flat().length,info.draw);assert.deepEqual(a.trace.map(c=>c.map(x=>({kind:x.kind,args:x.args}))),info.movement);
 for(const [i,j,key] of [[13,14,'firstGap']]){const end=a.trace[i][0].args.slice(2,4),start=a.trace[j][0].args.slice(0,2),gap=Math.hypot(end[0]-start[0],end[1]-start[1]);assert(gap>30 && gap<31);assert(Math.abs(gap-review.failure.gaps.find(x=>x.root===info.root)[key])<1e-12);}
}
assert.throws(()=>compileProgressive(trace,proof),/all other original pen trajectories must be continuous/);assert.equal(HANJA_STROKES.some(x=>x.glyph==='褧'),false);const next=obj('next-source-inventory.json');assert.equal(next.glyph,'熲');assert.deepEqual(next.missing,[]);assert.equal(Object.keys(next.records).length,5);assert.equal(next.providerVersions.length,0);for(const [name,record] of Object.entries(next.records)){if(/@\d+$/.test(name)){const ver=next.providerVersions.find(x=>x.name===name);assert(ver);const response=await fetch(ver.apiUrl);assert(response.ok);const actual=await response.json();assert.equal(actual.name,name.split('@')[0]);assert.equal(Number(actual.version),ver.version);assert.equal(actual.related,record.related);assert.equal(actual.data,record.data);assert.equal(sha(actual.data),ver.sha256)}else assert.deepEqual(map.get(name),record);}console.log(JSON.stringify({passed:true,glyph:'褧',engineFiles:8,archiveVerified:true,records:3,histories:0,raw:17,draw:17,quadratics:9,cubics:0,wholes:4,domesticPens:16,progressiveFrames:0,runtimeRegistered:false,next:'熲',privateMediaSaved:false}));
