const CANDIDATES=[{"id":"u8810","glyph":"蠐","hun":"굼벵이","eum":"제","readingGrade":"특급","radical":"虫","strokes":20,"sourceRow":4316,"sourceHunEum":"굼벵이 제","example":{"word":"蠐螬","reading":"제조","source":{"dictionary":"표준국어대사전","targetCode":292366,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=292366&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":865,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u85fb","glyph":"藻","hun":"마름","eum":"조","readingGrade":"1급","radical":"艸","strokes":20,"sourceRow":4340,"sourceHunEum":"마름 조:","example":{"word":"海藻","reading":"해조","source":{"dictionary":"표준국어대사전","targetCode":364531,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=364531&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":866,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u906d","glyph":"遭","hun":"만날","eum":"조","readingGrade":"1급","radical":"辵","strokes":15,"sourceRow":4349,"sourceHunEum":"만날 조","example":{"word":"遭遇","reading":"조우","source":{"dictionary":"표준국어대사전","targetCode":293387,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=293387&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":867,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u9797","glyph":"鞗","hun":"고삐","eum":"조","readingGrade":"특급","radical":"革","strokes":16,"sourceRow":4364,"sourceHunEum":"고삐 조","batch":868,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u84e7","glyph":"蓧","hun":"삼태기","eum":"조","readingGrade":"특급","radical":"艸","strokes":15,"sourceRow":4367,"sourceHunEum":"삼태기 조","batch":869,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u65d0","glyph":"旐","hun":"기","eum":"조","readingGrade":"특급","radical":"方","strokes":12,"sourceRow":4369,"sourceHunEum":"기 조","batch":870,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u9c37","glyph":"鰷","hun":"피라미","eum":"조","readingGrade":"특급","radical":"魚","strokes":22,"sourceRow":4371,"sourceHunEum":"피라미 조","example":{"word":"鰷魚","reading":"조어","source":{"dictionary":"표준국어대사전","targetCode":482155,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=482155&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":871,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u8526","glyph":"蔦","hun":"담쟁이덩굴","eum":"조","readingGrade":"특급","radical":"艸","strokes":15,"sourceRow":4378,"sourceHunEum":"담쟁이덩굴 조","example":{"word":"蔦蘿","reading":"조라","source":{"dictionary":"표준국어대사전","targetCode":302330,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=302330&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":872,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u604c","glyph":"恌","hun":"경박할","eum":"조","readingGrade":"특급","radical":"心","strokes":9,"sourceRow":4381,"sourceHunEum":"경박할 조","batch":873,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u5c30","glyph":"尰","hun":"수중다리","eum":"종","readingGrade":"특급","radical":"尢","strokes":12,"sourceRow":4411,"sourceHunEum":"수중다리 종","batch":874,"priorDocs":[],"reReview":false,"runtimeApplied":false}]
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
  let firstDependencyError=null
  for(const stroke of record.data.split('$')){const a=stroke.split(':');if(a[0]==='99'){assert(a[7]);try{await visit(a[7],[...stack,name])}catch(error){firstDependencyError??=error}}}
  // Capture all sibling dependencies even when one original dependency is missing.
  if(firstDependencyError)throw firstDependencyError
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
