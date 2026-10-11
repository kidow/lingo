import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),proof=obj('engine-proof.json'),trace=obj('draw-trace.json'),review=obj('progressive-review.json')
assert.equal(source.glyph,'檖');assert.equal(source.root,'u6a96')
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(source.records).length,14);assert.equal(source.providerVersions.length,1)
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
assert.equal(trace.length,20);assert.equal(trace.flat().length,21);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,14);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,1);
const roots=["u6a96","u6a96-ue0100","u6a96-ue0101"];
const codes={};
for(const [file,hash] of Object.entries(proof.engineHashes)){const r=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file);assert(r.ok);codes[file]=await r.text();assert.equal(sha(codes[file]),hash);}
for(const root of roots){const ctx=vm.createContext({records:source.records,root});for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000});const actual=JSON.parse(vm.runInContext("const resolve=(n)=>{const r=records[n];const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1]):r.data;};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})",ctx,{timeout:2000}));const original=obj('engine-whole-'+root+'.json');assert.deepEqual(actual.groups,original.groups);assert.deepEqual(actual.trace,original.trace);assert.deepEqual(actual.defaults,original.defaults);}


assert.equal(review.runtimeApplied,false);assert.equal(hanjaStrokeData({glyph:'檖',strokes:17}),null);
assert.equal(meta.candidate.strokes,17);assert.equal(meta.dictionaryStrokes,17);
assert.equal(review.wholeVariantsReviewed,3);assert.deepEqual(review.compatibleWholeRoots,[]);
assert.deepEqual(review.dictionaryDirectionStrokes,[4,13,16]);assert.equal(review.progressiveFramesReviewed,0);
function inside([x,y],poly){let odd=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a.y>y)!==(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)odd=!odd;}return odd;}
const p=obj('engine-whole-u6a96.json'),contact=[69.3,105];
assert(p.groups[16].polygons.flat().some(v=>v.x===contact[0]&&v.y===contact[1]));
assert(p.groups[3].polygons.some(poly=>inside(contact,poly)));
assert.equal(p.trace[13][0].args[1],57);
for(const [root,raw,start] of [['u6a96-ue0100',18,[149.125,104]],['u6a96-ue0101',19,[150.425,104]]]){const p=obj('engine-whole-'+root+'.json');assert.equal(p.trace[raw][0].kind,'cdDrawCurve');assert.deepEqual(p.trace[raw][0].args.slice(0,2),start);}
assert.equal(source.providerVersions[0].name,'u9042-k@5');assert.equal(source.providerVersions[0].sha256,'aebf87bbfcc2fab017b0e1a42958a6ad91558d721982d07d6bb428fc7e702bd0');
assert.equal(review.actualReplayPerformed,false);assert.equal(review.allStrokesReviewed,false);
console.log(JSON.stringify({passed:true,glyph:'檖',records:14,roots:3,compatibleRoots:0,histories:1,raw:20,draw:21,Q:14,B:1,dictionaryPens:17,nativeDirectionPens:[4,13,16],nativeProgressiveFrames:0,hold:'Basic 木 dot and 辶 horizontal joined;VS0 single dot;both VS 豕 descending sweep wrong start',runtimeApplied:false,privateMediaSaved:false}));
