const CANDIDATES=[{"id":"u9b2b","glyph":"鬫","hun":"범우는소리","eum":"함","readingGrade":"특급","radical":"鬥","strokes":22,"sourceRow":5482,"sourceHunEum":"범우는소리 함","batch":1005,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u83e1","glyph":"菡","hun":"연꽃봉오리","eum":"함","readingGrade":"특급","radical":"艸","strokes":12,"sourceRow":5483,"sourceHunEum":"연꽃봉오리 함","example":{"word":"菡萏","reading":"함담","source":{"dictionary":"표준국어대사전","targetCode":367936,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=367936&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":1006,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u9654","glyph":"陔","hun":"섬돌","eum":"해","readingGrade":"특급","radical":"阜","strokes":9,"sourceRow":5527,"sourceHunEum":"섬돌 해","batch":1007,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u5dd8","glyph":"巘","hun":"산봉우리","eum":"헌","readingGrade":"특급","radical":"山","strokes":23,"sourceRow":5556,"sourceHunEum":"산봉우리 헌","batch":1008,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u7381","glyph":"玁","hun":"오랑캐이름","eum":"험","readingGrade":"특급","radical":"犬","strokes":23,"sourceRow":5560,"sourceHunEum":"오랑캐이름 험","example":{"word":"玁狁","reading":"험윤","source":{"dictionary":"표준국어대사전","targetCode":377497,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=377497&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":1009,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u736b","glyph":"獫","hun":"오랑캐이름","eum":"험","readingGrade":"특급","radical":"犬","strokes":16,"readings":[{"hun":"오랑캐이름","eum":"험"},{"hun":"개","eum":"렴"}],"sourceRow":5561,"sourceHunEum":"오랑캐이름 험 | 개 렴","example":{"word":"獫狁","reading":"험윤","source":{"dictionary":"표준국어대사전","targetCode":377497,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=377497&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":1010,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u7103","glyph":"焃","hun":"붉을","eum":"혁","readingGrade":"특급","radical":"火","strokes":11,"sourceRow":5568,"sourceHunEum":"붉을 혁","batch":1011,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u8669","glyph":"虩","hun":"두려워할","eum":"혁","readingGrade":"특급","radical":"虍","strokes":18,"sourceRow":5569,"sourceHunEum":"두려워할 혁","batch":1012,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u884b","glyph":"衋","hun":"애통해할","eum":"혁","readingGrade":"특급","radical":"血","strokes":24,"sourceRow":5570,"sourceHunEum":"애통해할 혁","example":{"word":"衋傷","reading":"혁상","source":{"dictionary":"표준국어대사전","targetCode":369037,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=369037&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":1013,"priorDocs":[],"reReview":false,"runtimeApplied":false},{"id":"u9799","glyph":"鞙","hun":"멍에끈","eum":"현","readingGrade":"특급","radical":"革","strokes":16,"sourceRow":5591,"sourceHunEum":"멍에끈 현","batch":1014,"priorDocs":[],"reReview":false,"runtimeApplied":false}]
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
  const m=name.match(/^(.*)@(\d+)$/),supplemental=false
  assert(m,'Only explicit version dependencies may query public API; missing bare references are never queried as latest')
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
    supplementalSources[name]={status:'not-requested',reason:'Bare dependency absent from fixed archive; latest API lookup prohibited',approvalBlocked:true,usedInWholeCompilation:false}

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
 const sources={archive:ref.archive,root:id,glyph:candidate.glyph,wholeNames,renderableWholeNames,records,missing,aliases,providerVersions:versions,supplementalSources,affectedWholeRoots,archiveMissingReferences:missing,archiveOnlyReplay:missing.length===0,sourceMissingHold:missing.length>0,mixedSourceCandidate:false,approvalBlocked:missing.length>0,latestSubstitution:false,supplementalUsedForWholeReplay:false}
 const folder='docs/hanja-goal-glyphwiki-batch'+candidate.batch+'-2026-10-13/'
 assert(!fs.existsSync(new URL(folder+'sources.json',root)),'Source package already present; no duplicate recapture')
 const add=(name,value)=>{bundle.files[folder+name]=JSON.stringify(value,null,2)+'\n'}
 add('sources.json',sources)
 for(const affected of affectedWholeRoots)add('engine-whole-'+affected.root+'.json',{root:affected.root,status:'sourceMissing',missing,groups:null,trace:null,defaults:null,geometry:null,approvalBlocked:true,latestSubstitution:false})
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
 add('metadata.json',{glyph:candidate.glyph,root:id,candidate,dictionary,dictionaryStrokes:clips,status:missing.length?'source-only sourceMissing hold; supplemental API not used in original replay':'source-only captured; native whole, direction, progressive and replay review pending',sourceArchiveVerified:true,archiveOnlyReplay:missing.length===0,archiveMissingReferences:missing,sourceMissingHold:missing.length>0,mixedSourceCandidate:false,approvalBlocked:missing.length>0,latestSubstitution:false,supplementalUsedForWholeReplay:false,proofRoot,sourceEngineHashesVerified:true,wholeRootsCaptured:renderableWholeNames.length,wholeRootsBlocked:affectedWholeRoots.map(r=>r.root),privateMediaSaved:false,runtimeApplied:false,runtimeRegistered:0,reReview:candidate.reReview,priorDocs:candidate.priorDocs})
 bundle.summary.push({batch:candidate.batch,glyph:candidate.glyph,catalog:candidate.strokes,clips,roots:wholeNames,renderableWholeNames,records:Object.keys(records).length,versions:versions.length,archiveMissingReferences:missing,proofRoot,sourceMissingHold:missing.length>0,reReview:candidate.reReview,privateMediaSaved:false})
 }catch(error){bundle.errors.push({batch:candidate.batch,glyph:candidate.glyph,error:error.message,approvalBlocked:true})}
}
const bytes=Buffer.from(JSON.stringify(bundle))
console.log(JSON.stringify({summary:bundle.summary,errors:bundle.errors,files:Object.keys(bundle.files).length,bundleSHA256:sha(bytes),encoding:'gzip-base64-public-only',bundle:gzipSync(bytes,{level:9}).toString('base64')}))
