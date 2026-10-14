const CANDIDATES=[{"id":"u705d","glyph":"灝","readingGrade":"특급II","strokes":24,"sourceRow":5690,"batch":1025,"priorDocs":[{"file":"docs/hanja-goal-glyphwiki-batch383-2026-10-09/metadata.json","recordPath":"$","batch":383,"date":"2026-10-09","kind":"metadata","status":"source-only-deferred-discontinuous-water-third-stroke","decision":null,"held":false,"reasonIndexes":[],"runtimeAppliedClaim":null,"checksClaim":null,"unreviewedFields":[]},{"file":"docs/hanja-goal-glyphwiki-batch383-2026-10-09/review.json","recordPath":"$","batch":383,"date":"2026-10-09","kind":"review","status":"source-only-deferred-discontinuous-water-third-stroke","decision":null,"held":false,"reasonIndexes":[],"runtimeAppliedClaim":null,"checksClaim":null,"unreviewedFields":[]},{"file":"docs/hanja-goal-glyphwiki-batch383-2026-10-09/metadata.json","glyph":"灝","native":false,"final":false,"status":"source-only-deferred-discontinuous-water-third-stroke"},{"file":"docs/hanja-goal-glyphwiki-batch383-2026-10-09/review.json","glyph":"灝","native":false,"final":true,"status":"source-only-deferred-discontinuous-water-third-stroke"}],"priorFrozenBatch":383,"reReview":true,"runtimeApplied":false},{"id":"u6fe9","glyph":"濩","readingGrade":"특급II","strokes":17,"sourceRow":5695,"batch":1026,"priorDocs":[{"file":"docs/hanja-goal-glyphwiki-batch384-2026-10-09/metadata.json","recordPath":"$","batch":384,"date":"2026-10-09","kind":"metadata","status":"source-only-deferred-discontinuous-water-third-stroke","decision":null,"held":false,"reasonIndexes":[],"runtimeAppliedClaim":null,"checksClaim":null,"unreviewedFields":[]},{"file":"docs/hanja-goal-glyphwiki-batch384-2026-10-09/review.json","recordPath":"$","batch":384,"date":"2026-10-09","kind":"review","status":"source-only-deferred-discontinuous-water-third-stroke","decision":null,"held":false,"reasonIndexes":[],"runtimeAppliedClaim":null,"checksClaim":null,"unreviewedFields":[]},{"file":"docs/hanja-goal-glyphwiki-batch384-2026-10-09/metadata.json","glyph":"濩","native":false,"final":false,"status":"source-only-deferred-discontinuous-water-third-stroke"},{"file":"docs/hanja-goal-glyphwiki-batch384-2026-10-09/review.json","glyph":"濩","native":false,"final":true,"status":"source-only-deferred-discontinuous-water-third-stroke"}],"priorFrozenBatch":384,"reReview":true,"runtimeApplied":false},{"id":"u8585","glyph":"薅","readingGrade":"특급","strokes":17,"sourceRow":5696,"batch":1027,"priorDocs":[],"priorFrozenBatch":null,"reReview":false,"runtimeApplied":false},{"id":"u76a5","glyph":"皥","readingGrade":"특급","strokes":17,"sourceRow":5697,"batch":1028,"priorDocs":[],"priorFrozenBatch":null,"reReview":false,"runtimeApplied":false},{"id":"u769c","glyph":"皜","readingGrade":"특급","strokes":15,"sourceRow":5698,"batch":1029,"priorDocs":[],"priorFrozenBatch":null,"reReview":false,"runtimeApplied":false},{"id":"u5611","glyph":"嘑","readingGrade":"특급","strokes":14,"sourceRow":5700,"batch":1030,"priorDocs":[],"priorFrozenBatch":null,"reReview":false,"runtimeApplied":false},{"id":"u9277","glyph":"鉷","readingGrade":"특급","strokes":14,"sourceRow":5724,"batch":1031,"priorDocs":[],"priorFrozenBatch":null,"reReview":false,"runtimeApplied":false},{"id":"u8b41","glyph":"譁","readingGrade":"특급II","strokes":18,"sourceRow":5740,"batch":1032,"priorDocs":[{"file":"docs/hanja-goal-glyphwiki-batch355-2026-10-05/metadata.json","recordPath":"$","batch":355,"date":"2026-10-05","kind":"metadata","status":"Original18 line groups captured; domestic18 pen mapping and form/progressive review pending.","decision":null,"held":false,"reasonIndexes":[],"runtimeAppliedClaim":null,"checksClaim":null,"unreviewedFields":[]},{"file":"docs/hanja-goal-glyphwiki-batch385-2026-10-09/metadata.json","recordPath":"$","batch":385,"date":"2026-10-09","kind":"metadata","status":"source-only-deferred-discontinuous-body-horizontal","decision":null,"held":false,"reasonIndexes":[],"runtimeAppliedClaim":null,"checksClaim":null,"unreviewedFields":[]},{"file":"docs/hanja-goal-glyphwiki-batch385-2026-10-09/review.json","recordPath":"$","batch":385,"date":"2026-10-09","kind":"review","status":"source-only-deferred-discontinuous-body-horizontal","decision":null,"held":false,"reasonIndexes":[],"runtimeAppliedClaim":null,"checksClaim":null,"unreviewedFields":[]},{"file":"docs/hanja-goal-glyphwiki-batch355-2026-10-05/metadata.json","glyph":"譁","native":false,"final":false,"status":"Original18 line groups captured; domestic18 pen mapping and form/progressive review pending."},{"file":"docs/hanja-goal-glyphwiki-batch385-2026-10-09/metadata.json","glyph":"譁","native":false,"final":false,"status":"source-only-deferred-discontinuous-body-horizontal"},{"file":"docs/hanja-goal-glyphwiki-batch385-2026-10-09/review.json","glyph":"譁","native":false,"final":true,"status":"source-only-deferred-discontinuous-body-horizontal"}],"priorFrozenBatch":385,"reReview":true,"runtimeApplied":false},{"id":"u96d8","glyph":"雘","readingGrade":"특급","strokes":18,"sourceRow":5747,"batch":1033,"priorDocs":[],"priorFrozenBatch":null,"reReview":false,"runtimeApplied":false},{"id":"u9a69","glyph":"驩","readingGrade":"1급","strokes":28,"sourceRow":5761,"batch":1034,"priorDocs":[],"priorFrozenBatch":null,"reReview":false,"runtimeApplied":false}]
const engineCapture="\nconst resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],[...seen,name]):r.data};\nconst k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));\nconst groups=[],trace=[];let calls=[];\nfor(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}};\nconst orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};\nconst p=new Polygons();k.makeGlyph(p,root);\nJSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})\n"
import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import vm from 'node:vm'
import {gzipSync} from 'node:zlib'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const root=new URL('../../',import.meta.url),ref=JSON.parse(fs.readFileSync(new URL('docs/hanja-goal-glyphwiki-batch775-2026-10-13/sources.json',root))),pin=JSON.parse(fs.readFileSync(new URL('docs/hanja-goal-glyphwiki-batch775-2026-10-13/engine-proof.json',root)))
const sha=b=>crypto.createHash('sha256').update(b).digest('hex')
const requestCache=new Map()
const get=url=>{if(!requestCache.has(url))requestCache.set(url,(async()=>{const r=await fetch(url,{signal:AbortSignal.timeout(60000)});assert(r.ok,'HTTP '+r.status+' for public/source endpoint');return Buffer.from(await r.arrayBuffer())})());return requestCache.get(url)}
const archive=await get(ref.archive.url);assert.equal(sha(archive),ref.archive.sha256)
const database=new Map()
for(const line of archive.toString().split('\n')){const a=line.split('|').map(s=>s.trim());if(a.length>=3)database.set(a[0],{name:a[0],related:a[1],data:a[2]})}
const codes={}
await Promise.all(Object.entries(pin.engineHashes).map(async([file,hash])=>{const code=await get('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+pin.engineRevision+'/'+file);assert.equal(sha(code),hash);codes[file]=code.toString()}))
const bundle={createdDate:'2026-10-13',scope:'Public pinned source records and original engine outputs; domestic SVG bytes never included.',archive:ref.archive,engineRevision:pin.engineRevision,engineHashes:pin.engineHashes,files:{},summary:[],errors:[]}
const versionCache=new Map()
const provider=async name=>{
 if(!versionCache.has(name))versionCache.set(name,(async()=>{
  let m=name.match(/^(.*)@(\d+)$/),supplemental=false
  if(!m){
   const latest=JSON.parse((await get('https://glyphwiki.org/api/glyph?name='+encodeURIComponent(name))).toString())
   assert.equal(latest.name,name);assert(Number.isInteger(Number(latest.version))&&Number(latest.version)>0)
   m=[null,name,String(latest.version)];supplemental=true
  }
  const requestedProviderName=m[1]+'@'+m[2],apiUrl='https://glyphwiki.org/api/glyph?name='+encodeURIComponent(requestedProviderName),r=JSON.parse((await get(apiUrl)).toString())
  assert.equal(r.name,m[1]);assert.equal(Number(r.version),Number(m[2]));assert.equal(typeof r.data,'string')
  return {record:{name,related:r.related,data:r.data},version:{name,version:m[2],apiUrl,requestedProviderName,responseIdentity:{name:r.name,version:r.version,related:r.related},sha256:sha(r.data),supplemental,reason:supplemental?'Bare dependency absent from pinned archive; separate official API version snapshot, not historical archive evidence':'Explicit version dependency in fixed original record'}}
 })())
 return versionCache.get(name)
}
for(const candidate of CANDIDATES){
 try{
 assert.equal(hanjaStrokeData(candidate),null,'Candidate changed to applied; fresh selection required')
 const id=candidate.id
 // Capture every fixed named family form. Positional/itaiji eligibility as a whole remains unknown.
 const wholeNames=[...database.keys()].filter(n=>n===id||n.startsWith(id+'-')).sort()
 assert(wholeNames.includes(id),'Pinned default whole missing')
 const records={},missing=[],aliases=[],versions=[],supplementalSources={},resolved=new Set(),affectedWholeRoots=[],renderableWholeNames=[]
 async function visit(name,stack=[]){
  if(resolved.has(name))return
  assert(!stack.includes(name),'dependency cycle')
  let record
  if(/@\d+$/.test(name)){const p=await provider(name);record=p.record;if(!versions.some(v=>v.name===name))versions.push(p.version)}
  else{
   record=database.get(name)
   if(!record){
    if(!missing.includes(name))missing.push(name)
    supplementalSources[name]={approvalBlocked:true,originalArchiveIdentityProven:false,usedInWholeCompilation:false,latestQueried:false,reason:'Bare dependency absent from fixed archive; no latest API query or substitution permitted'}
    throw Error('Missing fixed-archive dependency '+name+'; supplemental API must not replace it')
   }
  }
  if(!record){if(!missing.includes(name))missing.push(name);throw Error('Missing public dependency '+name)}
  records[name]=record
  const alias=record.data.match(/^\[\[([^\]]+)\]\]$/)
  if(alias){if(!aliases.some(a=>a.name===name))aliases.push({name,target:alias[1]});await visit(alias[1],[...stack,name]);resolved.add(name);return}
  for(const stroke of record.data.split('$')){const a=stroke.split(':');if(a[0]==='99'){assert(a[7]);await visit(a[7],[...stack,name])}}
  resolved.add(name)
 }
 for(const name of wholeNames){try{await visit(name);renderableWholeNames.push(name)}catch(error){affectedWholeRoots.push({root:name,error:error.message,originalRecord:database.get(name),approvalBlocked:true})}}
 const sources={archive:ref.archive,root:id,glyph:candidate.glyph,wholeNames,renderableWholeNames,records,missing,aliases,providerVersions:versions,supplementalSources,affectedWholeRoots,archiveMissingReferences:missing,archiveOnlyReplay:missing.length===0,sourceMissingHold:missing.length>0,mixedSourceCandidate:missing.length>0,approvalBlocked:missing.length>0,latestSubstitution:false,supplementalUsedForWholeReplay:false}
 const folder='docs/hanja-goal-glyphwiki-batch'+candidate.batch+'-2026-10-13/'
 const add=(name,value)=>{bundle.files[folder+name]=JSON.stringify(value,null,2)+'\n'}
 add('sources.json',sources)
 let primary
 const proofRoot=renderableWholeNames.includes(id)?id:(renderableWholeNames[0]??null)
 for(const whole of renderableWholeNames){
  const reachable=new Set();const include=name=>{if(reachable.has(name))return;reachable.add(name);const record=records[name];assert(record,'Complete original dependency required');const alias=record.data.match(/^\[\[([^\]]+)\]\]$/);if(alias)include(alias[1]);else for(const line of record.data.split('$')){const a=line.split(':');if(a[0]==='99')include(a[7]);}};include(whole)
  const wholeRecords=Object.fromEntries([...reachable].map(name=>[name,records[name]]))
  const ctx=vm.createContext({records:wholeRecords,root:whole})
  for(const file of Object.keys(pin.engineHashes))vm.runInContext(codes[file],ctx,{timeout:1000})
  const rendered=JSON.parse(vm.runInContext(engineCapture,ctx,{timeout:3000}))
  const original={engineRevision:pin.engineRevision,engineHashes:pin.engineHashes,...rendered}
  add('engine-whole-'+whole+'.json',original)
  if(whole===proofRoot)primary=original
 }
 add('engine-proof.json',primary??{engineRevision:pin.engineRevision,engineHashes:pin.engineHashes,sourceMissingHold:true,renderable:false,affectedWholeRoots})
 const upper=id.slice(1).toUpperCase(),url='http://img.e-hanja.kr/hanjaSvg/aniSVG/'+upper.slice(0,2)+'00/'+upper+'.svg'
 const domestic=await get(url),text=domestic.toString(),clips=(text.match(/clip-path="url\(#/g)||[]).length
 assert(text.includes('<title>'+candidate.glyph+'</title>'),'Domestic identity mismatch')
 assert(clips>0)
 const dictionary={url,status:200,bytes:domestic.length,sha256:sha(domestic),clips,glyph:candidate.glyph,privateMediaSaved:false}
 add('metadata.json',{glyph:candidate.glyph,root:id,candidate,dictionary,dictionaryStrokes:clips,status:missing.length?'source-only sourceMissing hold; supplemental API not used in original replay':'source-only captured; native whole, direction, progressive and replay review pending',sourceArchiveVerified:true,archiveOnlyReplay:missing.length===0,archiveMissingReferences:missing,sourceMissingHold:missing.length>0,mixedSourceCandidate:missing.length>0,approvalBlocked:missing.length>0,latestSubstitution:false,supplementalUsedForWholeReplay:false,proofRoot,sourceEngineHashesVerified:true,wholeRootsCaptured:renderableWholeNames.length,wholeRootsBlocked:affectedWholeRoots.map(r=>r.root),privateMediaSaved:false,runtimeApplied:false,runtimeRegistered:0,reReview:candidate.reReview,priorDocs:candidate.priorDocs})
 bundle.summary.push({batch:candidate.batch,glyph:candidate.glyph,catalog:candidate.strokes,clips,roots:wholeNames,renderableWholeNames,records:Object.keys(records).length,versions:versions.length,archiveMissingReferences:missing,proofRoot,sourceMissingHold:missing.length>0,reReview:candidate.reReview,privateMediaSaved:false})
 }catch(error){bundle.errors.push({batch:candidate.batch,glyph:candidate.glyph,error:error.message,approvalBlocked:true})}
}
const bytes=Buffer.from(JSON.stringify(bundle))
if(process.env.HANJA_CAPTURE_RAM_SERVER==='1'){
 const {createServer}=await import('node:http')
 const packed=gzipSync(bytes,{level:9}).toString('base64')
 globalThis.__hanjaVerifierPublicText=new Map([...requestCache].map(([url,p])=>[url,p.then(b=>b.toString())]))
 globalThis.__hanjaVerifierArchive=new Map([[ref.archive.url+'#'+ref.archive.sha256,Promise.resolve(database)]])
 globalThis.__hanjaVerifierGetBuffer=get
 const server=createServer(async(req,res)=>{
  try{
   const url=new URL(req.url,'http://127.0.0.1')
   res.setHeader('Content-Type','application/json')
   if(url.pathname==='/chunk'){
    const offset=Number(url.searchParams.get('offset')??0),size=Number(url.searchParams.get('size')??8000)
    assert(Number.isInteger(offset)&&offset>=0&&Number.isInteger(size)&&size>0&&size<=16000)
    res.end(JSON.stringify({offset,total:packed.length,chunk:packed.slice(offset,offset+size)}))
   }else if(url.pathname==='/verify'){
    const logs=[],priorLog=console.log
    try{
     console.log=value=>logs.push(JSON.parse(value))
     for(const c of CANDIDATES)await import(new URL('docs/hanja-goal-glyphwiki-batch'+c.batch+'-2026-10-13/verify-source.mjs',root))
     res.end(JSON.stringify({exit:0,results:logs}))
    }finally{console.log=priorLog}
   }else if(url.pathname==='/stop'){
    res.end(JSON.stringify({stopped:true}));server.close()
   }else{res.statusCode=404;res.end(JSON.stringify({error:'Unknown local public-evidence route'}))}
  }catch(error){res.statusCode=500;res.end(JSON.stringify({exit:1,error:error.message,stack:error.stack}))}
 })
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve))
 console.log(JSON.stringify({port:server.address().port,summary:bundle.summary,errors:bundle.errors,files:Object.keys(bundle.files).length,bundleSHA256:sha(bytes),publicBundleLength:packed.length,privateMediaRoutes:false}))
}else console.log(JSON.stringify({summary:bundle.summary,errors:bundle.errors,files:Object.keys(bundle.files).length,bundleSHA256:sha(bytes),encoding:'gzip-base64-public-only',bundle:gzipSync(bytes,{level:9}).toString('base64')}))
