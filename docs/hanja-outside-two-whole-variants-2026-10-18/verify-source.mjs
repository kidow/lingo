import fs from 'node:fs'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import crypto from 'node:crypto'
const dir=new URL('./',import.meta.url),repo=new URL('../../',import.meta.url)
const sha=b=>crypto.createHash('sha256').update(b).digest('hex')
const bytes=new Map(),objects=new Map()
const read=f=>{if(!bytes.has(f))bytes.set(f,fs.readFileSync(new URL(f,dir)));return bytes.get(f)}
const json=f=>{if(!objects.has(f))objects.set(f,JSON.parse(read(f)));return objects.get(f)}
const manifest=json('manifest.json')
const deps=record=>{const a=record.data.match(/^\[\[([^\]]+)\]\]$/);return a?[a[1]]:record.data.split('$').map(s=>s.split(':')).filter(s=>s[0]==='99').map(s=>s[7])}
const closure=(records,root)=>{const selected={},seen=new Set();const walk=(n,active=new Set())=>{assert(!active.has(n),'Source dependency cycle');if(seen.has(n))return;assert(records[n],'Missing fixed definition');seen.add(n);selected[n]=records[n];for(const d of deps(records[n]))walk(d,new Set([...active,n]))};walk(root);return selected}
function diagnostic(proof){
 const drawing=proof.groups.map((g,i)=>({g,i,t:proof.trace[i].filter(t=>t.polygons.length)})).filter(x=>x.g.polygons.length),joins=[],gaps=[]
 for(let i=1;i<drawing.length;i++){const a=drawing[i-1],b=drawing[i];if(JSON.stringify(a.t.at(-1).args.slice(-4,-2))===JSON.stringify(b.t[0].args.slice(0,2)))joins.push([a.i,b.i])}
 for(const row of drawing)for(let i=1;i<row.t.length;i++){const from=row.t[i-1].args.slice(-4,-2),to=row.t[i].args.slice(0,2);if(JSON.stringify(from)!==JSON.stringify(to))gaps.push({rawIndex:row.i,from,to,gap:[to[0]-from[0],to[1]-from[1]]})}
 return{rawGroups:proof.groups.length,drawingGroups:drawing.length,polygons:proof.groups.reduce((n,g)=>n+g.polygons.length,0),emptyRawIndices:proof.groups.flatMap((g,i)=>g.polygons.length?[]:[i]),exactConsecutiveJoins:joins,conservativeRawMinimum:drawing.length-joins.length,internalPrimitiveGaps:gaps}
}
export function verifyAllWholes(engineCodes){
 for(const[f,h]of Object.entries(manifest.immutableInputBytePins))assert.equal(sha(read(f)),h,f)
 assert.deepEqual(Object.keys(engineCodes),Object.keys(manifest.engineHashes))
 const codes=Object.entries(manifest.engineHashes).map(([file,hash])=>{assert.equal(sha(engineCodes[file]),hash);return engineCodes[file]})
 const initialManifest=json('../hanja-outside-three-source-capture-2026-10-18/manifest.json')
 assert.equal(initialManifest.license.identifier,'LicenseRef-GlyphWiki')
 assert.equal(initialManifest.license.officialRevision.revision,18)
 assert.equal(manifest.nativeReviewCount,0);assert.equal(manifest.runtimeApplied,false);assert.equal(manifest.canonicalHoldCreated,false)
 const results=[]
 for(const family of manifest.families){
  assert.equal(sha(read(family.inventoryFile)),family.inventoryFileSHA256)
  assert.equal(sha(read(family.sourceFile)),family.sourceFileSHA256)
  const inventory=json(family.inventoryFile),source=json(family.sourceFile)
  assert.equal(inventory.metadata.statusCode,200)
  assert.equal(inventory.metadata.sourceURL,'https://glyphwiki.org/wiki/'+family.family)
  assert.deepEqual(inventory.sameCodepointNames,family.sameCodepointRootNames)
  assert.deepEqual(inventory.publishedRowWholePins,family.independentRenderedWholePins)
  const listed=[...new Set([...inventory.sameCodepointNames,...inventory.publishedRowWholeNames])]
  assert.deepEqual(listed,family.requestedNames)
  const rowPins=[...new Set([...inventory.sameCodepointRelatedRowExcerpt.matchAll(/\/glyph\/([^/@.]+@[0-9]+)\.50px\.png/g)].map(m=>m[1]))]
  assert.deepEqual(rowPins,inventory.publishedRowWholePins)
  assert.equal(source.family,family.family);assert.equal(source.candidate.strokes,family.catalogStrokes);assert.equal(source.candidate.readingGrade,family.readingGrade)
  const catalogBytes=fs.readFileSync(new URL(source.catalog.file,repo));assert.equal(sha(catalogBytes),source.catalog.sha256)
  assert.deepEqual(JSON.parse(catalogBytes).characters.find(x=>x.id===family.family),source.candidate)
  const union=new Set(source.wholeNames.flatMap(root=>Object.keys(closure(source.records,root))))
  assert.deepEqual([...union].sort(),Object.keys(source.records).sort())
  assert.equal(union.size,family.providerDefinitions);assert.equal(source.wholeNames.length,family.completeWholes)
  assert.equal(source.providerDefinitions.length,union.size)
  for(const provider of source.providerDefinitions){
   assert(union.has(provider.lookupName))
   const r=provider.provider,d=JSON.parse(r.responseText)
   assert.equal(r.status,200);assert.equal(Buffer.byteLength(r.responseText),r.bytes);assert.equal(sha(r.responseText),r.responseSHA256)
   assert.equal(d.name+'@'+String(d.version),provider.fixedName)
   assert.equal(d.name,provider.lookupName.split('@')[0])
   if(provider.lookupName.includes('@'))assert.equal(String(d.version),provider.lookupName.split('@')[1])
   assert.equal(r.url,'https://glyphwiki.org/api/glyph?name='+encodeURIComponent(provider.fixedName))
   assert.equal(sha(d.data),provider.dataSHA256)
   assert.deepEqual(provider.record,{name:provider.lookupName,related:d.related,data:d.data})
   assert.deepEqual(source.records[provider.lookupName],provider.record)
   if(provider.discovery){
    const first=provider.discovery
    assert.equal(first.status,200);assert.equal(Buffer.byteLength(first.responseText),first.bytes);assert.equal(sha(first.responseText),first.responseSHA256)
    const original=JSON.parse(first.responseText)
    for(const k of['name','data','related'])assert.equal(original[k],d[k])
    assert.equal(String(original.version),String(d.version))
   }
  }
 }
 for(const item of manifest.wholeEntries){
  const family=manifest.families.find(f=>f.family===item.family),source=json(item.sourceFile)
  assert(source.wholeNames.includes(item.root));assert(!['u785c','u795b'].includes(item.root),'Original base checks must not be repeated')
  const records=closure(source.records,item.root)
  assert.deepEqual(Object.keys(records).sort(),[...item.definitionNames].sort())
  const definition=source.providerDefinitions.find(p=>p.lookupName===item.root)
  assert.equal(definition.fixedName,item.fixedRootVersion)
  const proofBytes=read(item.proofFile);assert.equal(sha(proofBytes),item.proofFileSHA256)
  const proof=json(item.proofFile)
  assert.deepEqual(Object.keys(proof),['engineRevision','engineHashes','groups','trace','defaults'])
  assert.equal(proof.engineRevision,manifest.engineRevision);assert.deepEqual(proof.engineHashes,manifest.engineHashes)
  const context=vm.createContext({records,root:item.root})
  for(const code of codes)vm.runInContext(code,context,{timeout:1000})
  const actual=JSON.parse(vm.runInContext("const resolve=(n,seen=new Set())=>{if(seen.has(n))throw Error('alias cycle');seen.add(n);const r=records[n];if(!r)throw Error('missing '+n);const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],seen):r.data;};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})",context,{timeout:5000}))
  assert.deepEqual(actual,{groups:proof.groups,trace:proof.trace,defaults:proof.defaults})
  const d=diagnostic(proof)
  assert.deepEqual(item.diagnostic,{family:item.family,root:item.root,fixedName:item.fixedRootVersion,...d})
  const range={minimum:d.conservativeRawMinimum,maximum:d.drawingGroups,target:family.catalogStrokes,containsTarget:d.conservativeRawMinimum<=family.catalogStrokes&&family.catalogStrokes<=d.drawingGroups,requiredJoinCount:d.drawingGroups-family.catalogStrokes,availableExactJoinCount:d.exactConsecutiveJoins.length,doesNotApproveGroupingOrNative:true}
  assert.deepEqual(range,item.sourceCountOnlyTargetRange)
  for(const value of[item.nativeReviewed,item.runtimeApplied,item.canonicalHoldCreated,source.nativeReviewed,source.runtimeApplied,source.canonicalHoldCreated])assert.equal(value,false)
  results.push({ok:true,root:item.root,family:item.family,fixedRootVersion:item.fixedRootVersion,proofSHA256:item.proofFileSHA256,...d,sourceCountOnlyTargetRange:range,nativeReviewed:false})
 }
 assert.equal(results.length,39);assert.equal(new Set(results.map(r=>r.root)).size,39)
 for(const[f,h]of Object.entries(manifest.immutableInputBytePins))assert.equal(sha(fs.readFileSync(new URL(f,dir))),h,f)
 return{ok:true,wholeChecks:results.length,sourceCheckRunsPerNewWhole:1,engineFilesVerified:8,engineDownloads:0,originalInputPinsPreserved:Object.keys(manifest.immutableInputBytePins).length,results,nativeReviewCount:0,runtimeApplied:false,canonicalHoldCreated:false}
}
if(typeof process!=='undefined'&&process.argv[1]&&new URL('file://'+process.argv[1]).href===import.meta.url){
 const codes={}
 for(const[file,hash]of Object.entries(manifest.engineHashes)){
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+manifest.engineRevision+'/'+file,{signal:AbortSignal.timeout(30000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 console.log(JSON.stringify(verifyAllWholes(codes)))
}
