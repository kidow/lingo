import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {compileProgressive,sourceGroups} from './progressive.mjs'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),proof=obj('engine-proof.json'),trace=obj('draw-trace.json'),review=obj('progressive-review.json')
assert.equal(source.glyph,'韘');assert.equal(source.root,'u97d8')
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(source.records).length,12);assert.equal(source.providerVersions.length,2)
const archiveResponse=await fetch(source.archive.url);assert(archiveResponse.ok)
const archive=await archiveResponse.text();assert.equal(sha(archive),source.archive.sha256)
const map=new Map(archive.split('\n').map(l=>l.split('|').map(s=>s.trim())).filter(a=>a.length>=3).map(a=>[a[0],{name:a[0],related:a[1],data:a[2]}]))
for(const [name,record] of Object.entries(source.records)){
 if(/@\d+$/.test(name)){
  const version=source.providerVersions.find(v=>v.name===name);assert(version)
  const response=await fetch(version.apiUrl);assert(response.ok);const actual=await response.json()
  assert.equal(actual.name,name.split('@')[0]);assert.equal(Number(actual.version),Number(version.version))
  assert.equal(actual.related,record.related);assert.equal(actual.data,record.data);assert.equal(sha(actual.data),version.sha256)
 }else assert.deepEqual(map.get(name),record)
}
const inventory=obj('whole-variant-inventory.json');assert.equal(inventory.archiveVerified,true);assert.equal(inventory.engineFiles,8);assert.deepEqual(inventory.wholeVariants.map(v=>v.root).sort(),source.wholeNames.slice().sort());for(const v of inventory.wholeVariants)assert.equal(map.get(v.root).data,v.rootData);for(const v of review.wholeVariants){assert.equal(map.get(v.name).related,v.related);assert.equal(map.get(v.name).data,v.data);}const meta=obj('metadata.json'),dictionary=await fetch(meta.dictionary.url);assert(dictionary.ok);const bytes=Buffer.from(await dictionary.arrayBuffer());assert.equal(bytes.length,meta.dictionary.bytes);assert.equal(sha(bytes),meta.dictionary.sha256);assert.equal((bytes.toString().match(/clip-path="url\(#/g)||[]).length,meta.dictionaryStrokes);assert(bytes.toString().includes('<title>'+meta.glyph+'</title>'));
const ctx=vm.createContext({records:source.records,root:source.root})
for(const [file,hash] of Object.entries(proof.engineHashes)){
 const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file);assert(response.ok)
 const code=await response.text();assert.equal(sha(code),hash);vm.runInContext(code,ctx,{timeout:1000})
}
const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults)
assert.equal(trace.length,22);assert.equal(trace.flat().length,22);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,2);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0);
const roots=["u97d8","u97d8-g","u97d8-ue0100","u97d8-ue0101","u97d8-ue0102"];
const codes={};
for(const [file,hash] of Object.entries(proof.engineHashes)){const r=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file);assert(r.ok);codes[file]=await r.text();assert.equal(sha(codes[file]),hash);}
for(const root of roots){const ctx=vm.createContext({records:source.records,root});for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000});const actual=JSON.parse(vm.runInContext("const resolve=(n)=>{const r=records[n];const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1]):r.data;};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})",ctx,{timeout:2000}));const original=obj('engine-whole-'+root+'.json');assert.deepEqual(actual.groups,original.groups);assert.deepEqual(actual.trace,original.trace);assert.deepEqual(actual.defaults,original.defaults);}

assert.equal(review.runtimeApplied,false);assert.equal(hanjaStrokeData({glyph:'韘',strokes:18}),null);assert.deepEqual(review.dictionaryDirectionStrokes,Array.from({length:18},(_,i)=>i+1));assert.equal(review.progressiveFramesReviewed,0);assert.equal(review.progressiveFramesApproved,0);assert.equal(review.replayApproved,false);assert.deepEqual(review.compatibleWholeRoots,['u97d8','u97d8-ue0100','u97d8-ue0101']);assert.equal(review.compiledPens,null);assert.equal(review.allStrokesReviewed,false);assert.equal(review.wholeVariantsReviewed,5);assert.equal(meta.candidate.strokes,18);assert.equal(meta.dictionaryStrokes,18);
assert.deepEqual(sourceGroups,[[2],[0,1],[3],[4],[5,6],[7],[8],[9,10],[11],[12],[15],[17],[16],[13,14],[18],[19],[20],[21]]);assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:22},(_,i)=>i));assert.deepEqual(review.sourceGroupsZeroBased,sourceGroups);
for(const root of review.compatibleWholeRoots){const original=obj('engine-whole-'+root+'.json'),t=original.trace;assert.deepEqual(t[9][0].args.slice(2,4),[25.36,161]);assert.deepEqual(t[10][0].args.slice(0,2),[11.5,161]);assert.equal(Math.abs(t[9][0].args[2]-t[10][0].args[0])/2,6.93);assert.throws(()=>compileProgressive(t,original),e=>e.code==='ERR_ASSERTION'&&e.message.includes('All merged original trajectories must be continuous')&&JSON.stringify(e.actual)==='[25.36,161]'&&JSON.stringify(e.expected)==='[11.5,161]');}assert.equal(review.sourceContinuityGapNormalized,6.93);
console.log(JSON.stringify({passed:true,glyph:'韘',engineFiles:8,records:12,roots:5,histories:2,raw:22,draw:22,Q:2,B:0,staticCriticalDirectionsReviewed:18,compatibleWholeRoots:3,compilerRejectsDisjointPen8:true,nativeProgressiveFrames:0,runtimeApplied:false,privateMediaSaved:false}));
