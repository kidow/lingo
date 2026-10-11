import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {compileProgressive,renderProgressive,sourceGroups} from './progressive.mjs'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),proof=obj('engine-proof.json'),trace=obj('draw-trace.json'),review=obj('progressive-review.json')
assert.equal(source.glyph,'繅');assert.equal(source.root,'u7e45')
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(source.records).length,11);assert.equal(source.providerVersions.length,0)
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
assert.equal(trace.length,23);assert.equal(trace.flat().length,23);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,15);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0);
const roots=["u7e45","u7e45-ue0100","u7e45-ue0101","u7e45-ue0102","u7e45-ufe00"];
const codes={};
for(const [file,hash] of Object.entries(proof.engineHashes)){const r=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file);assert(r.ok);codes[file]=await r.text();assert.equal(sha(codes[file]),hash);}
for(const root of roots){const ctx=vm.createContext({records:source.records,root});for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000});const actual=JSON.parse(vm.runInContext("const resolve=(n)=>{const r=records[n];const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1]):r.data;};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})",ctx,{timeout:2000}));const original=obj('engine-whole-'+root+'.json');assert.deepEqual(actual.groups,original.groups);assert.deepEqual(actual.trace,original.trace);assert.deepEqual(actual.defaults,original.defaults);}


assert.deepEqual(sourceGroups,[[0,1],[2,3],[4],[5],[6],[7],[8,9],[10,11],[12,13],[14],[15,16],[17],[18],[19],[20],[21],[22]]);
assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:23},(_,i)=>i));
assert.deepEqual(review.sourceGroupsZeroBased,sourceGroups);assert.equal(review.staticDirectionPensReviewed,17);
assert.equal(review.progressiveFramesReviewed,0);assert.equal(review.runtimeApplied,false);assert.equal(hanjaStrokeData({glyph:'繅',strokes:17}),null);
assert.equal(meta.candidate.strokes,17);assert.equal(meta.dictionaryStrokes,17);assert.deepEqual(review.blockedPens,[1,2]);
assert.deepEqual(review.compatibleWholeRoots,['u7e45','u7e45-ue0100','u7e45-ue0101']);
const moduleSource=read('progressive.mjs').toString();
for(const root of review.compatibleWholeRoots){
 const p=obj('engine-whole-'+root+'.json');
 const exactText=moduleSource.replace(/const ORIGINAL = .*\n/,'const ORIGINAL = '+JSON.stringify(p.trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))))+'\n').replace("../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs",new URL('../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs',import.meta.url).href);
 const {compileProgressive:compileExact}=await import('data:text/javascript;base64,'+Buffer.from(exactText).toString('base64'));
 assert.throws(()=>compileExact(p.trace,p),/All merged original trajectories must be continuous/);
 for(const [a,b,end,start] of [[0,1,[27.85,56],[12.94,45]],[2,3,[27.14,110],[14.36,113]]]){
  const x=p.trace[a].at(-1),y=p.trace[b][0];assert.equal(x.kind,'cdDrawCurve');assert.deepEqual(x.args.slice(4,6),end);assert.deepEqual(y.args.slice(0,2),start);assert(Math.hypot(end[0]-start[0],end[1]-start[1])/2>6);
 }
}
console.log(JSON.stringify({passed:true,glyph:'繅',records:11,roots:5,compatibleRoots:3,histories:0,raw:23,draw:23,Q:15,B:0,staticPens:17,blockedPens:[1,2],gaps:[9.264287614274506,6.563695605373546],compileRejectedCompatibleRoots:3,nativeProgressiveFrames:0,runtimeApplied:false,privateMediaSaved:false}));
