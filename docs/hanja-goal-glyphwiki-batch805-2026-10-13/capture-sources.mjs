const CANDIDATES=[{"id":"u85bf","glyph":"薿","hun":"우거질","eum":"의","readingGrade":"특급","radical":"艸","strokes":18,"readings":[{"hun":"우거질","eum":"의"},{"hun":"우거질","eum":"억"}],"sourceRow":3832,"sourceHunEum":"우거질 의 | 우거질 억","batch":805,"priorDocs":[],"priorNewHolds":[],"reReview":false,"runtimeApplied":false},{"id":"u82e2","glyph":"苢","hun":"질경이","eum":"이","readingGrade":"특급","radical":"艸","strokes":9,"sourceRow":3860,"sourceHunEum":"질경이 이:","example":{"word":"芣苢","reading":"부이","source":{"dictionary":"표준국어대사전","targetCode":158728,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=158728&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":806,"priorDocs":[],"priorNewHolds":[],"reReview":false,"runtimeApplied":false},{"id":"u6a32","glyph":"樲","hun":"멧대추나무","eum":"이","readingGrade":"특급","radical":"木","strokes":16,"sourceRow":3861,"sourceHunEum":"멧대추나무 이:","batch":807,"priorDocs":[],"priorNewHolds":[],"reReview":false,"runtimeApplied":false},{"id":"u5235","glyph":"刵","hun":"귀벨","eum":"이","readingGrade":"특급","radical":"刀","strokes":8,"sourceRow":3863,"sourceHunEum":"귀벨 이","example":{"word":"刵刑","reading":"이형","source":{"dictionary":"표준국어대사전","targetCode":475772,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=475772&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":808,"priorDocs":[{"docs":"hanja-goal-glyphwiki-batch114-2026-09-27","batch":114}],"priorNewHolds":[],"reReview":true,"runtimeApplied":false},{"id":"u684b","glyph":"桋","hun":"가시목","eum":"이","readingGrade":"특급","radical":"木","strokes":10,"sourceRow":3864,"sourceHunEum":"가시목 이","batch":809,"priorDocs":[],"priorNewHolds":[],"reReview":false,"runtimeApplied":false},{"id":"u8a11","glyph":"訑","hun":"자랑할","eum":"이","readingGrade":"특급","radical":"言","strokes":10,"readings":[{"hun":"자랑할","eum":"이"},{"hun":"방탕할","eum":"탄"}],"sourceRow":3865,"sourceHunEum":"자랑할 이 | 방탕할 탄","batch":810,"priorDocs":[],"priorNewHolds":[],"reReview":false,"runtimeApplied":false},{"id":"u9824","glyph":"頤","hun":"턱","eum":"이","readingGrade":"특급","radical":"頁","strokes":15,"sourceRow":3868,"sourceHunEum":"턱 이","batch":811,"priorDocs":[],"priorNewHolds":[],"reReview":false,"runtimeApplied":false},{"id":"u7037","glyph":"瀷","hun":"물이름","eum":"익","readingGrade":"특급II","radical":"水","strokes":20,"sourceRow":3875,"sourceHunEum":"물이름 익","example":{"word":"金瀷","reading":"김익","source":{"dictionary":"표준국어대사전","targetCode":52364,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=52364&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":812,"priorDocs":[{"docs":"hanja-goal-glyphwiki-batch372-2026-10-09","batch":372,"sourceRow":3875,"status":"source-only-deferred-original-water-trajectory-gap"}],"priorNewHolds":[],"reReview":true,"runtimeApplied":false},{"id":"u7d6a","glyph":"絪","hun":"기운","eum":"인","readingGrade":"특급II","radical":"糸","strokes":12,"sourceRow":3893,"sourceHunEum":"기운 인","example":{"word":"姜絪","reading":"강인","source":{"dictionary":"표준국어대사전","targetCode":8119,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=8119&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":813,"priorDocs":[{"docs":"hanja-goal-glyphwiki-batch243-2026-10-04","batch":243,"status":"provisional mapping; trajectory continuity unresolved"}],"priorNewHolds":[],"reReview":true,"runtimeApplied":false},{"id":"u99f0","glyph":"駰","hun":"회색얼룩말","eum":"인","readingGrade":"특급","radical":"馬","strokes":16,"sourceRow":3894,"sourceHunEum":"회색얼룩말 인","batch":814,"priorDocs":[],"priorNewHolds":[],"reReview":false,"runtimeApplied":false}]
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
 // Whole-family suffixes exclude numeric component forms such as -01.
 const suffix=/^(?:[a-z]|[a-z]v|ue[0-9a-f]{4}|ufe[0-9a-f]{2}|itaiji-\d{3}|var-\d{3})$/
 const wholeNames=[...database.keys()].filter(n=>n===id||(n.startsWith(id+'-')&&suffix.test(n.slice(id.length+1)))).sort()
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
    try{const p=await provider(name);supplementalSources[name]={...p,mixedSourceCandidate:true,approvalBlocked:true,originalArchiveIdentityProven:false,usedInWholeCompilation:false}}catch(error){supplementalSources[name]={approvalBlocked:true,error:error.message,usedInWholeCompilation:false}}
    throw Error('Missing fixed-archive dependency '+name+'; supplemental API must not replace it')
   }
  }
  if(!record){if(!missing.includes(name))missing.push(name);throw Error('Missing public dependency '+name)}
  records[name]=record
  const alias=record.data.match(/^\[\[([^\]]+)\]\]$/)
  if(alias){if(!aliases.includes(name))aliases.push(name);await visit(alias[1],[...stack,name]);resolved.add(name);return}
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
  const ctx=vm.createContext({records,root:whole})
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
console.log(JSON.stringify({summary:bundle.summary,errors:bundle.errors,files:Object.keys(bundle.files).length,bundleSHA256:sha(bytes),encoding:'gzip-base64-public-only',bundle:gzipSync(bytes,{level:9}).toString('base64')}))

