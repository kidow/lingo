import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import {gzipSync} from 'node:zlib'
const repo=new URL('../../',import.meta.url)
const sha=b=>crypto.createHash('sha256').update(b).digest('hex')
const read=(d,n)=>fs.readFileSync(new URL(d+'/'+n,repo)),obj=(d,n)=>JSON.parse(read(d,n))
const start=Number(process.argv[2]??985),end=Number(process.argv[3]??994)
assert(Number.isInteger(start)&&Number.isInteger(end)&&start>=985&&end<=994&&start<=end)
const capture=fs.readFileSync(new URL('docs/hanja-goal-glyphwiki-batch985-2026-10-13/capture-sources.mjs',repo),'utf8')
const engineCapture=JSON.parse(capture.match(/^const engineCapture=(.+)$/m)[1])
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6)
const exact=(a,b)=>a.length===b.length&&a.every((x,i)=>x===b[i])
const pathCover=(rows,edges)=>{
 const active=rows.filter(r=>r.start),adj=new Map(active.map(r=>[r.raw,edges.filter(e=>e[0]===r.raw).map(e=>e[1])])),degree=new Map(active.map(r=>[r.raw,0]))
 for(const [,b]of edges)degree.set(b,degree.get(b)+1)
 const ready=[...degree].filter(([,d])=>d===0).map(([i])=>i);let seen=0
 for(let i=0;i<ready.length;i++){const a=ready[i];seen++;for(const b of adj.get(a)){degree.set(b,degree.get(b)-1);if(degree.get(b)===0)ready.push(b)}}
 const matched=new Map(),aug=(a,visited)=>{for(const b of adj.get(a)){if(visited.has(b))continue;visited.add(b);if(!matched.has(b)||aug(matched.get(b),visited)){matched.set(b,a);return true}}return false}
 for(const r of active)aug(r.raw,new Set())
 return {cyclic:seen!==active.length,maximumMatching:matched.size,minimumIfAcyclic:seen===active.length?active.length-matched.size:null}
}
const contiguousCandidate=w=>{
 const groups=[],joins=[]
 for(let i=0;i<w.trace.length;i++){
  const calls=w.trace[i]
  if(!calls.length){if(groups.length)groups.at(-1).push(i);else groups.push([i]);continue}
  const last=groups.at(-1),prior=last?.flatMap(raw=>w.trace[raw]).at(-1)
  if(last&&(!prior||exact(endpoint(prior),calls[0].args.slice(0,2)))){
   if(prior)joins.push([last.filter(raw=>w.trace[raw].length).at(-1),i])
   last.push(i)
  }else groups.push([i])
 }
 return {groups,joins}
}
const summarize=(d,root)=>{
 const file='engine-whole-'+root+'.json',w=obj(d,file),rows=w.trace.map((cs,raw)=>({raw,sourceKind:w.groups[raw].raw[0],start:cs.length?cs[0].args.slice(0,2):null,end:cs.length?endpoint(cs.at(-1)):null}))
 const edges=[]
 for(const a of rows)for(const b of rows)if(a.raw!==b.raw&&a.end&&b.start&&exact(a.end,b.start))edges.push([a.raw,b.raw])
 const internalGaps=[],terminals=[],degenerate=[]
 for(let raw=0;raw<w.trace.length;raw++){
  const cs=w.trace[raw];assert.deepEqual(cs.flatMap(c=>c.polygons),w.groups[raw].polygons)
  for(let call=0;call<cs.length;call++){
   const c=cs[call]
   if(call&& !exact(endpoint(cs[call-1]),c.args.slice(0,2))){const end=endpoint(cs[call-1]),start=c.args.slice(0,2);internalGaps.push({raw,call,end,start,delta:start.map((v,i)=>v-end[i]),distance:Math.hypot(...start.map((v,i)=>v-end[i]))})}
   if([5,13,14,15].includes(c.args.at(-1)%100))terminals.push({raw,call,kind:c.kind,args:c.args,terminal:c.args.at(-1),originalPolygons:c.polygons.length,finalOriginalPolygon:c.polygons.at(-1)??null})
   c.polygons.forEach((p,polygon)=>{const area=p.reduce((s,v,i)=>{const z=p[(i+1)%p.length];return s+v.x*z.y-z.x*v.y},0);if(area===0)degenerate.push({raw,call,polygon,signedArea:area,polygonSHA256:sha(JSON.stringify(p)),points:p})})
  }
 }
 const gaps=[];for(let raw=0;raw+1<rows.length;raw++){const a=rows[raw],b=rows[raw+1];if(a.end&&b.start){const delta=b.start.map((v,i)=>v-a.end[i]);if(!exact(a.end,b.start))gaps.push({raw:[raw,raw+1],end:a.end,start:b.start,delta,distance:Math.hypot(...delta)})}}
 const p=pathCover(rows,edges),candidate=contiguousCandidate(w),empty=w.trace.flatMap((cs,i)=>cs.length?[]:[i])
 return {root,sourceProofFile:file,proofFileSha256:sha(read(d,file)),sourceComplete:true,missingDependencies:[],rawGroups:w.groups.length,visibleRawGroups:rows.filter(r=>r.start).length,drawingCalls:w.trace.flat().length,originalPolygons:w.groups.reduce((s,g)=>s+g.polygons.length,0),endpoints:rows,exactDirectedJoins:edges,directedGraphCyclic:p.cyclic,maximumEndpointMatching:p.maximumMatching,minimumRawDirectedPathCoverIfAcyclic:p.minimumIfAcyclic,minimumPensCaveat:'Raw endpoint graph lower bound only; closing coincidences, internal call gaps and domestic pen boundaries must be reviewed. Numeric equality is not approval.',internalGaps,consecutiveRawEndpointGaps:gaps,terminalOriginals:terminals,degenerateOriginalPolygons:degenerate,nonDrawingRawGroups:empty,nonDrawingRawDetails:empty.map(raw=>({raw,source:w.groups[raw].raw,drawingCalls:0,polygons:w.groups[raw].polygons.length})),numericContiguousCandidateGroups:candidate.groups,candidateExactJoins:candidate.joins,candidateCount:candidate.groups.length,candidateIsDomesticApproval:false,wholeEligibility:'unreviewed',positionNamedWholeEligibility:'unknown',nativeReviewed:false,approved:false}
}
function verifier(spec,engineCapture){return `import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const SPEC=${JSON.stringify(spec)},source=obj('sources.json'),proof=obj('engine-proof.json'),meta=obj('metadata.json'),analysis=obj('source-analysis.json'),joins=obj('source-join-analysis.json')
assert.equal(source.root,SPEC.root);assert.equal(source.glyph,SPEC.glyph);assert.deepEqual(source.missing,[])
assert.equal(meta.candidate.strokes,SPEC.catalog);assert.equal(meta.dictionaryStrokes,SPEC.clips)
assert.equal(analysis.catalogStrokes,SPEC.catalog);assert.equal(analysis.dictionaryStrokes,SPEC.clips)
assert.equal(analysis.nativeReviewed,false);assert.equal(analysis.approved,false);assert.equal(joins.nativeReviewed,false);assert.equal(joins.approved,false)
assert.equal(sha(read('sources.json')),analysis.sourcesSha256);assert.equal(sha(read('engine-proof.json')),analysis.proofSha256);assert.equal(sha(read('metadata.json')),analysis.metadataSha256)
const ram=globalThis,texts=ram.__hanjaVerifierPublicText??=new Map(),archives=ram.__hanjaVerifierArchive??=new Map()
const publicText=url=>{let p=texts.get(url);if(!p){p=(async()=>{const r=await fetch(url);assert(r.ok);return r.text()})();texts.set(url,p)}return p}
const key=source.archive.url+'#'+source.archive.sha256
let archivePromise=archives.get(key)
if(!archivePromise){archivePromise=(async()=>{const text=await publicText(source.archive.url);assert.equal(sha(text),source.archive.sha256);const rows=text.split('\\n').map(l=>l.split('|').map(s=>s.trim())).filter(a=>a.length>=3);return new Map(rows.map(a=>[a[0],{name:a[0],related:a[1],data:a[2]}]))})();archives.set(key,archivePromise)}
const database=await archivePromise
assert.deepEqual([...database.keys()].filter(n=>n===SPEC.root||n.startsWith(SPEC.root+'-')).sort(),source.wholeNames)
for(const [name,r]of Object.entries(source.records)){
 if(/@\\d+$/.test(name)){const v=source.providerVersions.find(v=>v.name===name);assert(v);const actual=JSON.parse(await publicText(v.apiUrl));assert.equal(actual.name,name.split('@')[0]);assert.equal(Number(actual.version),Number(v.version));assert.equal(actual.related,r.related);assert.equal(actual.data,r.data);assert.equal(sha(actual.data),v.sha256)}
 else assert.deepEqual(database.get(name),r)
}
for(const a of source.aliases)assert.equal(source.records[a.name].data,'[['+a.target+']]')
assert.deepEqual(analysis.historicalNames,Object.keys(source.records).filter(n=>n.includes('@')))
assert.deepEqual(analysis.recordHashes,Object.entries(source.records).map(([name,r])=>({name,sourceSha256:sha(r.data),related:r.related})))
assert.equal(analysis.records,Object.keys(source.records).length)
const codes=[]
assert.equal(Object.keys(proof.engineHashes).length,8)
for(const [file,hash]of Object.entries(proof.engineHashes)){const code=await publicText('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file);assert.equal(sha(code),hash);codes.push(code)}
const engineCapture=${JSON.stringify(engineCapture)}
const closure=(root,seen=new Set())=>{if(seen.has(root))return seen;seen.add(root);const r=source.records[root];assert(r,'Missing fixed dependency');const a=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);if(a)closure(a[1],seen);else for(const line of r.data.split('$')){const p=line.split(':');if(p[0]==='99')closure(p[7],seen)}return seen}
const reproduce=root=>{const names=closure(root),records=Object.fromEntries([...names].map(n=>[n,source.records[n]])),ctx=vm.createContext({records,root});for(const code of codes)vm.runInContext(code,ctx,{timeout:1000});return JSON.parse(vm.runInContext(engineCapture,ctx,{timeout:3000}))}
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),exact=(a,b)=>a.every((x,i)=>x===b[i])
assert.deepEqual(joins.wholeRoots.map(w=>w.root),source.wholeNames)
for(const row of joins.wholeRoots){
 const saved=obj(row.sourceProofFile),actual=reproduce(row.root)
 assert.equal(sha(read(row.sourceProofFile)),row.proofFileSha256)
 assert.equal(saved.engineRevision,proof.engineRevision);assert.deepEqual(saved.engineHashes,proof.engineHashes)
 assert.deepEqual(actual.groups,saved.groups);assert.deepEqual(actual.trace,saved.trace);assert.deepEqual(actual.defaults,saved.defaults)
 if(row.root===meta.proofRoot){assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,proof.trace);assert.deepEqual(actual.defaults,proof.defaults)}
 assert.equal(row.rawGroups,actual.groups.length);assert.equal(row.drawingCalls,actual.trace.flat().length);assert.equal(row.originalPolygons,actual.groups.reduce((s,g)=>s+g.polygons.length,0))
 const rows=actual.trace.map((cs,raw)=>({raw,sourceKind:actual.groups[raw].raw[0],start:cs.length?cs[0].args.slice(0,2):null,end:cs.length?endpoint(cs.at(-1)):null}));assert.deepEqual(row.endpoints,rows)
 const edges=[];for(const a of rows)for(const b of rows)if(a.raw!==b.raw&&a.end&&b.start&&exact(a.end,b.start))edges.push([a.raw,b.raw]);assert.deepEqual(row.exactDirectedJoins,edges)
 const internal=[];for(let raw=0;raw<actual.trace.length;raw++){const cs=actual.trace[raw];assert.deepEqual(cs.flatMap(c=>c.polygons),actual.groups[raw].polygons);for(let call=1;call<cs.length;call++){const end=endpoint(cs[call-1]),start=cs[call].args.slice(0,2);if(!exact(end,start)){const delta=start.map((v,i)=>v-end[i]);internal.push({raw,call,end,start,delta,distance:Math.hypot(...delta)})}}}assert.deepEqual(row.internalGaps,internal)
 const flat=row.numericContiguousCandidateGroups.flat();assert.deepEqual([...flat].sort((a,b)=>a-b),actual.groups.map((_,i)=>i));assert.equal(new Set(flat).size,flat.length);assert.equal(row.candidateCount,row.numericContiguousCandidateGroups.length)
 for(const [a,b]of row.candidateExactJoins)assert.deepEqual(endpoint(actual.trace[a].at(-1)),actual.trace[b][0].args.slice(0,2))
 const empty=actual.trace.flatMap((cs,i)=>cs.length?[]:[i]);assert.deepEqual(row.nonDrawingRawGroups,empty)
 for(const r of row.nonDrawingRawDetails){assert.deepEqual(r.source,actual.groups[r.raw].raw);assert.equal(actual.trace[r.raw].length,0);assert.equal(actual.groups[r.raw].polygons.length,r.polygons)}
 for(const t of row.terminalOriginals){const c=actual.trace[t.raw][t.call];assert.equal(c.kind,t.kind);assert.deepEqual(c.args,t.args);assert.equal(c.args.at(-1),t.terminal);assert.deepEqual(c.polygons.at(-1)??null,t.finalOriginalPolygon)}
 for(const t of row.degenerateOriginalPolygons){const p=actual.trace[t.raw][t.call].polygons[t.polygon];assert.deepEqual(p,t.points);assert.equal(sha(JSON.stringify(p)),t.polygonSHA256);assert.equal(p.reduce((s,v,i)=>{const z=p[(i+1)%p.length];return s+v.x*z.y-z.x*v.y},0),0)}
 assert.equal(row.approved,false);assert.equal(row.nativeReviewed,false)
}
let domestic
if(ram.__hanjaVerifierGetBuffer)domestic=await ram.__hanjaVerifierGetBuffer(meta.dictionary.url)
else{const r=await fetch(meta.dictionary.url);assert(r.ok);domestic=Buffer.from(await r.arrayBuffer())}
const svg=domestic.toString(),clips=(svg.match(/clip-path="url\\(#/g)||[]).length
assert.equal(domestic.length,meta.dictionary.bytes);assert.equal(sha(domestic),meta.dictionary.sha256);assert.equal(clips,SPEC.clips);assert(svg.includes('<title>'+SPEC.glyph+'</title>'))
console.log(JSON.stringify({batch:SPEC.batch,glyph:SPEC.glyph,sourcePassed:true,wholeRoots:source.wholeNames.length,records:Object.keys(source.records).length,historicalDependencies:source.providerVersions.length,engineFiles:8,catalogStrokes:SPEC.catalog,domesticClips:clips,nativeApprovalAsserted:false,privateMediaSaved:false}))
` }
const files={},summary=[]
for(let batch=start;batch<=end;batch++){
 const d='docs/hanja-goal-glyphwiki-batch'+batch+'-2026-10-13',source=obj(d,'sources.json'),proof=obj(d,'engine-proof.json'),meta=obj(d,'metadata.json')
 assert.deepEqual(source.missing,[]);assert.equal(source.renderableWholeNames.length,source.wholeNames.length)
 const wholeRoots=source.wholeNames.map(root=>summarize(d,root)),selected=wholeRoots.find(w=>w.root===meta.proofRoot)
 const analysis={batch,glyph:source.glyph,date:'2026-10-13',scope:'Fixed public family and original engine replay; domestic metadata hash/title/clips only in RAM. Native review pending.',catalogStrokes:meta.candidate.strokes,dictionaryStrokes:meta.dictionaryStrokes,domesticClips:meta.dictionaryStrokes,catalogMatchesClips:meta.candidate.strokes===meta.dictionaryStrokes,sourceRow:meta.candidate.sourceRow,readingGrade:meta.candidate.readingGrade,root:source.root,selectedRoot:meta.proofRoot,reReview:meta.reReview,priorDocs:meta.priorDocs,archive:source.archive,sourcesSha256:sha(read(d,'sources.json')),proofSha256:sha(read(d,'engine-proof.json')),metadataSha256:sha(read(d,'metadata.json')),engineRevision:proof.engineRevision,engineHashes:proof.engineHashes,records:Object.keys(source.records).length,historicalNames:Object.keys(source.records).filter(n=>n.includes('@')),recordHashes:Object.entries(source.records).map(([name,r])=>({name,sourceSha256:sha(r.data),related:r.related})),wholeNames:source.wholeNames,wholeNamedFamilyEnumeration:'All fixed root-prefixed names, including positional/itaiji forms; whole eligibility remains unreviewed.',dictionary:meta.dictionary,privateMediaSaved:false,nativeReviewed:false,approved:false,runtimeApplied:false,sourceIncomplete:false,missingFixedDependencies:[],selectedRootDependencyComplete:true,numericGroupingIsNotDomesticApproval:true,unreviewed:['Domestic whole/order/direction and pen-to-clip mapping','Progressive masks, terminal fine boundaries and native replay','Positional/itaiji suitability as a whole-glyph replacement']}
 const joins={batch,glyph:source.glyph,date:'2026-10-13',catalogStrokes:meta.candidate.strokes,domesticClips:meta.dictionaryStrokes,domesticCountMatchesCatalog:meta.candidate.strokes===meta.dictionaryStrokes,archive:source.archive,wholeRoots,selectedRoot:meta.proofRoot,numericGroupingCandidate:selected.numericContiguousCandidateGroups,candidateCount:selected.candidateCount,candidateIsDomesticOrderApproval:false,allRawExactlyOnce:true,emptyRawMetadataRetained:true,coordinateMutation:false,connectorAuthored:false,nativeReviewed:false,approved:false,runtimeApplied:false,unresolved:'Exact coordinate coincidences are source-only candidates; they do not distinguish legitimate corners from closing edges. All native checks remain pending.'}
 const add=(name,body)=>{assert(!fs.existsSync(new URL(d+'/'+name,repo)));files[d+'/'+name]=typeof body==='string'?body:JSON.stringify(body,null,2)+'\n'}
 add('source-analysis.json',analysis);add('source-join-analysis.json',joins)
 add('verify-source.mjs',verifier({batch,glyph:source.glyph,root:source.root,catalog:meta.candidate.strokes,clips:meta.dictionaryStrokes},engineCapture))
 add('NOTICE.md','# '+source.glyph+' · GlyphWiki source notice\n\nGlyphWiki Project and contributors; LicenseRef-GlyphWiki, not CC0. License@18 and archive LICENSE.txt apply.\nSource '+source.archive.url+'\nArchive SHA256 '+source.archive.sha256+'\nDomestic URL '+meta.dictionary.url+'\nDomestic SVG SHA256 '+meta.dictionary.sha256+'\n\nAll fixed named family forms; '+Object.keys(source.records).length+' records, '+source.wholeNames.length+' roots, '+source.providerVersions.length+' explicit historical dependencies. Native whole/order/direction/progressive review pending; no runtime registration. Private domestic graphics remain RAM-only; dictionary comparison is not exam-body approval.\n')
 summary.push({batch,glyph:source.glyph,catalog:meta.candidate.strokes,clips:meta.dictionaryStrokes,wholeRoots:wholeRoots.map(w=>({root:w.root,raw:w.rawGroups,active:w.visibleRawGroups,draw:w.drawingCalls,polygons:w.originalPolygons,min:w.minimumRawDirectedPathCoverIfAcyclic,contiguousCandidate:w.candidateCount,empty:w.nonDrawingRawGroups,internalGaps:w.internalGaps.length,degenerate:w.degenerateOriginalPolygons.length,joins:w.exactDirectedJoins}))})
}
console.log(JSON.stringify({summary,files}))
