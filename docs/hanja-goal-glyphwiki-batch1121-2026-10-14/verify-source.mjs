// Own fresh source-only verifier; original catalog count is not changed.
const engineCapture="\nconst resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],[...seen,name]):r.data};\nconst k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));\nconst groups=[],trace=[];let calls=[];\nfor(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}};\nconst orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};\nconst p=new Polygons();k.makeGlyph(p,root);\nJSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})\n"
import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import vm from 'node:vm'
const read=n=>fs.readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>crypto.createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),meta=obj('metadata.json')
const SLOT={"batch":1121,"candidate":{"id":"u83f1","glyph":"菱","strokes":12,"sourceRow":1533,"readingGrade":"1급"},"inputSHA":{"engine-whole-u83f1-k.json":"8b9fd4a3cfe28e1192edcc6aa7f37061c42287131de199cf021cf8da7c1277f5","engine-whole-u83f1-ue0100.json":"7a3be6da552b35d1447a0283701135db213101481fc13cfb504462dc1eb6f2bb","sources.json":"e56afbfe16ab6d8ad9659c1b9b848c4891f8ef50fe380c2df8bd983e497f0ae6","engine-whole-u83f1-ue0101.json":"7a3be6da552b35d1447a0283701135db213101481fc13cfb504462dc1eb6f2bb","engine-proof.json":"730a2ec4643d370ac0341cfd1f65c1c58d9f110d7edb225cbad51cadf2b3359b","engine-whole-u83f1-t.json":"df7730836062ba2713b39737acf9a0057980a7d977616326f5ef422d6aab3253","metadata.json":"59053b05373a451f0b692d3cd8e36f0c3741ad5dd08708ec5d83664dce232c07","engine-whole-u83f1-ue0104.json":"bfaa1ec96d9ac71b2a8491664196b3b1b990eaeedb3d161942293ae8cfb7bc87","engine-whole-u83f1.json":"730a2ec4643d370ac0341cfd1f65c1c58d9f110d7edb225cbad51cadf2b3359b","engine-whole-u83f1-ue0102.json":"cd082e46ff90d00285982f906a26e671ffd4f2cddc95f5edf7cb86efa45c50ad","engine-whole-u83f1-ufe00.json":"8b9fd4a3cfe28e1192edcc6aa7f37061c42287131de199cf021cf8da7c1277f5","engine-whole-u83f1-var-001.json":"48a08932418ee7ca048d54d2d1ed4d0892f322a500f8d990a1f4597a79307922","engine-whole-u83f1-ue0103.json":"8b9fd4a3cfe28e1192edcc6aa7f37061c42287131de199cf021cf8da7c1277f5"}}
assert.deepEqual({id:meta.candidate.id,glyph:meta.glyph,strokes:meta.candidate.strokes,sourceRow:meta.candidate.sourceRow,readingGrade:meta.candidate.readingGrade},SLOT.candidate)
for(const [name,hash] of Object.entries(SLOT.inputSHA))assert.equal(sha(read(name)),hash,'Pinned public source byte identity '+name)

const fixedArchiveSHA='7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62'
assert.equal(source.archive.sha256,fixedArchiveSHA)
assert.equal(source.glyph,meta.glyph);assert.equal(source.root,meta.root)
const buffers=globalThis.__hanjaSourceCaptureBufferCache??=new Map()
const get=url=>{if(!buffers.has(url))buffers.set(url,(async()=>{const r=await fetch(url,{signal:AbortSignal.timeout(60000)});assert(r.ok);return Buffer.from(await r.arrayBuffer())})());return buffers.get(url)}
const archive=await get(source.archive.url);assert.equal(sha(archive),fixedArchiveSHA)
const db=new Map(archive.toString().split('\n').map(l=>l.split('|').map(s=>s.trim())).filter(a=>a.length>=3).map(a=>[a[0],{name:a[0],related:a[1],data:a[2]}]))
const suffix=/^(?:[a-z]|[a-z]v|ue[0-9a-f]{4}|ufe[0-9a-f]{2}|itaiji-\d{3}|var-\d{3})$/
const names=[...db.keys()].filter(n=>n===source.root||(n.startsWith(source.root+'-')&&suffix.test(n.slice(source.root.length+1)))).sort()
assert.deepEqual(source.wholeNames,names)
for(const [name,r]of Object.entries(source.records)){
 if(/@\d+$/.test(name)){const v=source.providerVersions.find(v=>v.name===name);assert(v);const body=JSON.parse((await get(v.apiUrl)).toString());assert.equal(body.name,name.replace(/@\d+$/,''));assert.equal(Number(body.version),Number(name.split('@').at(-1)));assert.equal(sha(body.data),v.sha256);assert.equal(body.data,r.data);assert.equal(body.related,r.related)}
 else assert.deepEqual(r,db.get(name),'Every bare dependency must be the exact fixed-archive original')
}
for(const name of source.missing)if(!/@\d+$/.test(name))assert(!db.has(name),'Missing bare data remains absent; implicit latest replacement prohibited')
const resolve=(name,seen=[])=>{assert(!seen.includes(name));const r=source.records[name];assert(r,'Missing source '+name);const m=r.data.match(/^\[\[([^\]]+)\]\]$/);return m?resolve(m[1],[...seen,name]):r.data}
const reachable=(name,seen=new Set())=>{if(seen.has(name))return true;seen.add(name);const r=source.records[name];if(!r)return false;const alias=r.data.match(/^\[\[([^\]]+)\]\]$/);if(alias)return reachable(alias[1],seen);return r.data.split('$').every(row=>{const a=row.split(':');return a[0]!=='99'||reachable(a[7],seen)})}
assert.deepEqual(source.renderableWholeNames,names.filter(n=>reachable(n)))
const ref=obj('../hanja-goal-glyphwiki-batch775-2026-10-13/engine-proof.json'),codes={}
assert.equal(ref.engineRevision,'49232bac0348fe815f4200d4116ab7917e0db47f')
await Promise.all(Object.entries(ref.engineHashes).map(async([f,h])=>{const b=await get('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+ref.engineRevision+'/'+f);assert.equal(sha(b),h);codes[f]=b.toString()}))
assert.equal(Object.keys(codes).length,8)
let polygons=0,calls=0
for(const root of source.renderableWholeNames){
 const ctx=vm.createContext({records:source.records,root})
 for(const f of Object.keys(ref.engineHashes))vm.runInContext(codes[f],ctx,{timeout:1000})
 const rendered=JSON.parse(vm.runInContext(engineCapture,ctx,{timeout:3000})),actual={engineRevision:ref.engineRevision,engineHashes:ref.engineHashes,...rendered},saved=obj('engine-whole-'+root+'.json')
 assert.deepEqual(saved,actual,'Fixed source/8-engine original geometry must reproduce exactly')
 polygons+=actual.groups.reduce((s,g)=>s+g.polygons.length,0);calls+=actual.trace.flat().length
}
if(meta.proofRoot)assert.deepEqual(obj('engine-proof.json'),obj('engine-whole-'+meta.proofRoot+'.json'))
const dictionary=await get(meta.dictionary.url);assert.equal(dictionary.length,meta.dictionary.bytes);assert.equal(sha(dictionary),meta.dictionary.sha256)
const svg=dictionary.toString(),title=svg.match(/<title[^>]*>([^<]*)<\/title>/)?.[1]?.trim()
assert.equal(title,meta.glyph)
const clips=(svg.match(/clip-path="url\(#/g)||[]).length;assert.equal(clips,meta.dictionaryStrokes);assert.equal(clips,meta.dictionary.clips)
assert.equal(meta.domesticCountMatchesCatalog,clips===meta.candidate.strokes)
assert.equal(meta.runtimeApplied,false);assert.equal(meta.privateMediaSaved,false)
export const sourceVerificationResult={batch:meta.candidate.batch,glyph:meta.glyph,sourcePassed:true,archiveVerified:true,engineFiles:8,records:Object.keys(source.records).length,historicalDependencies:source.providerVersions.length,wholeRoots:names.length,renderableWholeRoots:source.renderableWholeNames.length,missingFixedDependencies:source.missing,allOriginalPolygons:polygons,allDrawingCalls:calls,catalog:meta.candidate.strokes,domesticClips:clips,catalogMatchesDomestic:clips===meta.candidate.strokes,nativeApproval:false,privateMediaSaved:false}
console.log(JSON.stringify(sourceVerificationResult))
