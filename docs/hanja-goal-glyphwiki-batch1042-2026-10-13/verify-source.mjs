import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>fs.readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>crypto.createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),meta=obj('metadata.json'),proof=obj('engine-proof.json'),analysis=obj('source-analysis.json'),joins=obj('source-join-analysis.json')
const suffix=/^(?:[a-z]|[a-z]v|ue[0-9a-f]{4}|ufe[0-9a-f]{2}|itaiji-\d{3}|var-\d{3})$/
const cache=globalThis.__hanjaPublicSourceVerificationCache??=new Map()
const get=url=>{if(!cache.has(url))cache.set(url,(async()=>{const r=await fetch(url,{signal:AbortSignal.timeout(60000)});assert(r.ok);return Buffer.from(await r.arrayBuffer())})());return cache.get(url)}
assert.equal(hanjaStrokeData(meta.candidate),null)
assert.equal(meta.runtimeApplied,false);assert.equal(meta.runtimeRegistered,0)
assert.equal(meta.privateMediaSaved,false);assert.equal(analysis.nativeReviewed,false);assert.equal(analysis.approved,false);assert.equal(joins.nativeReviewed,false);assert.equal(joins.approved,false)
assert.equal(source.latestSubstitution,false);assert.equal(source.supplementalUsedForWholeReplay,false);assert.deepEqual(source.supplementalSources,{})
assert(source.archive.url.includes('a7dd7f3d911936770fa742e8c37d16bee7e2173c'))
const archive=await get(source.archive.url);assert.equal(sha(archive),source.archive.sha256)
const database=new Map()
for(const line of archive.toString().split('\n')){const a=line.split('|').map(s=>s.trim());if(a.length>=3)database.set(a[0],{name:a[0],related:a[1],data:a[2]})}
assert.deepEqual([...database.keys()].filter(n=>n===source.root||(n.startsWith(source.root+'-')&&suffix.test(n.slice(source.root.length+1)))).sort(),source.wholeNames)
for(const [name,r]of Object.entries(source.records)){
 if(/@\d+$/.test(name)){const v=source.providerVersions.find(v=>v.name===name);assert(v&&!v.supplemental);assert.equal(v.requestedProviderName,name);const actual=JSON.parse((await get(v.apiUrl)).toString());assert.equal(actual.name,name.split('@')[0]);assert.equal(Number(actual.version),Number(name.split('@')[1]));assert.equal(actual.related,r.related);assert.equal(actual.data,r.data);assert.equal(sha(actual.data),v.sha256)}
 else assert.deepEqual(database.get(name),r)
}
for(const missing of source.missing)assert.equal(database.has(missing),false)
assert.equal(meta.sourceMissingHold,source.missing.length>0)
for(const n of ['sources.json','engine-proof.json','metadata.json'])assert.equal(sha(read(n)),analysis.fileHashes[n])
assert.equal(Object.keys(proof.engineHashes).length,8)
const codes={}
for(const [file,hash]of Object.entries(proof.engineHashes)){const code=await get('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file);assert.equal(sha(code),hash);codes[file]=code.toString()}
const engineCapture="\nconst resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],[...seen,name]):r.data};\nconst k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));\nconst groups=[],trace=[];let calls=[];\nfor(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}};\nconst orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};\nconst p=new Polygons();k.makeGlyph(p,root);\nJSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})\n"
assert.deepEqual(joins.wholeRoots.map(r=>r.root),source.wholeNames)
for(const name of source.renderableWholeNames){
 const original=obj('engine-whole-'+name+'.json'),ctx=vm.createContext({records:source.records,root:name})
 for(const file of Object.keys(codes))vm.runInContext(codes[file],ctx,{timeout:1000})
 const actual=JSON.parse(vm.runInContext(engineCapture,ctx,{timeout:3000}))
 assert.equal(original.engineRevision,proof.engineRevision);assert.deepEqual(original.engineHashes,proof.engineHashes)
 assert.deepEqual(actual.groups,original.groups);assert.deepEqual(actual.trace,original.trace);assert.deepEqual(actual.defaults,original.defaults)
 const row=joins.wholeRoots.find(r=>r.root===name);assert(row&&row.sourceComplete);assert.equal(sha(read(row.sourceProofFile)),row.proofFileSha256)
 assert.equal(row.rawGroups,actual.groups.length);assert.equal(row.drawingCalls,actual.trace.flat().length)
 assert.equal(row.originalPolygons,actual.groups.reduce((n,g)=>n+g.polygons.length,0))
 for(let i=0;i<actual.groups.length;i++)assert.deepEqual(actual.trace[i].flatMap(c=>c.polygons),actual.groups[i].polygons)
 if(name===meta.proofRoot){assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,proof.trace);assert.deepEqual(actual.defaults,proof.defaults)}
}
for(const name of source.wholeNames.filter(n=>!source.renderableWholeNames.includes(n)))assert(source.affectedWholeRoots.some(r=>r.root===name&&r.approvalBlocked))
const domestic=await get(meta.dictionary.url),svg=domestic.toString(),clips=(svg.match(/clip-path="url\(#/g)||[]).length
assert(svg.includes('<title>'+source.glyph+'</title>'));assert.equal(sha(domestic),meta.dictionary.sha256);assert.equal(domestic.length,meta.dictionary.bytes);assert.equal(clips,meta.dictionaryStrokes)
assert.equal(meta.dictionary.glyph,source.glyph);assert.equal(meta.candidate.sourceRow,analysis.sourceRow);assert.equal(meta.candidate.strokes,analysis.catalogStrokes);assert.equal(clips,analysis.domesticClips)
console.log(JSON.stringify({batch:meta.candidate.batch,glyph:source.glyph,sourcePassed:true,wholeRoots:source.wholeNames.length,renderableWholeRoots:source.renderableWholeNames.length,records:Object.keys(source.records).length,historicalDependencies:source.providerVersions.length,engineFiles:8,catalogStrokes:meta.candidate.strokes,domesticClips:clips,sourceMissingHold:meta.sourceMissingHold,nativeApprovalAsserted:false,privateMediaSaved:false}))
