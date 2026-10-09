import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {HANJA_STROKES} from '../../lib/hanja-strokes.ts'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),proof=obj('engine-proof.json'),trace=obj('draw-trace.json'),review=obj('review.json')
assert.equal(source.glyph,'菰');assert.equal(source.root,'u83f0-k')
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(source.records).length,6);assert.equal(source.providerVersions.length,0)
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

assert.equal(trace.length,14);assert.equal(trace.flat().length,16);assert.equal(trace.flat().filter(x=>x.kind==='cdDrawCurve').length,8);
assert.deepEqual(trace[10][0].args.slice(2,4),review.failure.firstEnd);assert.deepEqual(trace[11][0].args.slice(0,2),review.failure.nextStart);
assert(Math.hypot(review.failure.firstEnd[0]-review.failure.nextStart[0],review.failure.firstEnd[1]-review.failure.nextStart[1])>35.8);
assert.equal(review.allWholeSources.wholeVariants.length,6);
for(const info of review.allWholeSources.wholeVariants){
 const records={};async function visit(n){if(records[n])return;let record=map.get(n);if(!record&&/@\d+$/.test(n)){const r=await fetch('https://glyphwiki.org/api/glyph?name='+encodeURIComponent(n));assert(r.ok);const j=await r.json();assert.equal(j.name,n.split('@')[0]);assert.equal(Number(j.version),Number(n.split('@')[1]));record={name:n,related:j.related,data:j.data}}assert(record);records[n]=record;const alias=record.data.match(/^\[\[([^\]]+)\]\]$/);if(alias)await visit(alias[1]);else for(const row of record.data.split('$'))if(row.startsWith('99:'))await visit(row.split(':')[7]);}
 await visit(info.root);const vctx=vm.createContext({records,root:info.root});
 for(const [file,hash] of Object.entries(proof.engineHashes)){const r=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file);assert(r.ok);const code=await r.text();assert.equal(sha(code),hash);vm.runInContext(code,vctx,{timeout:1000})}
 const actualExpression=readFileSync(new URL('verify.mjs',import.meta.url),'utf8');const start=actualExpression.indexOf('const actual=JSON.parse(vm.runInContext(')+'const actual=JSON.parse(vm.runInContext('.length,end=actualExpression.indexOf(',ctx,{timeout:2000}))',start),instrument=vm.runInNewContext(actualExpression.slice(start,end));
 const a=JSON.parse(vm.runInContext(instrument,vctx,{timeout:2000}));assert.equal(a.trace.length,info.raw);assert.equal(a.trace.flat().length,info.draw);assert.deepEqual(a.trace.map(c=>c.map(x=>({kind:x.kind,args:x.args}))),info.movement);
 const offset=info.root==='u83f0-ue0103'?-2:-3, rise=a.trace.at(offset)[0],v=a.trace.at(offset-1)[0],strokeEnd=v.kind==='cdDrawLine'?v.args.slice(2,4):v.args.slice(4,6);assert.equal(rise.kind,'cdDrawCurve');const gap=Math.hypot(strokeEnd[0]-rise.args[0],strokeEnd[1]-rise.args[1]);assert(gap>18);
}
const meta=obj('metadata.json'),response=await fetch(meta.dictionary.url);assert(response.ok);const bytes=Buffer.from(await response.arrayBuffer());assert.equal(bytes.length,meta.dictionary.bytes);assert.equal(sha(bytes),meta.dictionary.sha256);
const next=obj('next-source-inventory.json');assert.equal(next.glyph,'儁');assert.deepEqual(next.missing,[]);for(const [n,record] of Object.entries(next.records)){if(/@\d+$/.test(n)){const ver=next.providerVersions.find(v=>v.name===n);assert(ver);const r=await fetch(ver.apiUrl);assert(r.ok);const j=await r.json();assert.equal(j.name,n.split('@')[0]);assert.equal(Number(j.version),ver.version);assert.equal(j.data,record.data);assert.equal(sha(j.data),ver.sha256)}else assert.deepEqual(map.get(n),record)}
assert.equal(HANJA_STROKES.some(x=>x.glyph==='菰'),false);assert.equal(HANJA_STROKES.some(x=>x.glyph==='儁'),false);
console.log(JSON.stringify({passed:true,engineFiles:8,records:6,histories:0,wholeVariants:6,domesticPens:12,minimumDiscontinuityOver:18,runtimeRegistered:false,next:'儁',privateMediaSaved:false}));
