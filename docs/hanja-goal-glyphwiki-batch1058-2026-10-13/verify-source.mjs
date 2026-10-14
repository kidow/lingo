import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const SPEC={"batch":1058,"glyph":"潝","root":"u6f5d","catalog":15,"clips":15},source=obj('sources.json'),proof=obj('engine-proof.json'),meta=obj('metadata.json'),analysis=obj('source-analysis.json'),joins=obj('source-join-analysis.json')
assert.equal(source.root,SPEC.root);assert.equal(source.glyph,SPEC.glyph);assert(Array.isArray(source.missing))
assert.equal(meta.candidate.strokes,SPEC.catalog);assert.equal(meta.dictionaryStrokes,SPEC.clips)
assert.equal(analysis.catalogStrokes,SPEC.catalog);assert.equal(analysis.dictionaryStrokes,SPEC.clips)
assert.equal(analysis.nativeReviewed,false);assert.equal(analysis.approved,false);assert.equal(joins.nativeReviewed,false);assert.equal(joins.approved,false)
assert.equal(sha(read('sources.json')),analysis.sourcesSha256);assert.equal(sha(read('engine-proof.json')),analysis.proofSha256);assert.equal(sha(read('metadata.json')),analysis.metadataSha256)
const ram=globalThis,texts=ram.__hanjaVerifierPublicText??=new Map(),archives=ram.__hanjaVerifierArchive??=new Map()
const publicText=url=>{let p=texts.get(url);if(!p){p=(async()=>{const r=await fetch(url);assert(r.ok);return r.text()})();texts.set(url,p)}return p}
const key=source.archive.url+'#'+source.archive.sha256
let archivePromise=archives.get(key)
if(!archivePromise){archivePromise=(async()=>{const text=await publicText(source.archive.url);assert.equal(sha(text),source.archive.sha256);const rows=text.split('\n').map(l=>l.split('|').map(s=>s.trim())).filter(a=>a.length>=3);return new Map(rows.map(a=>[a[0],{name:a[0],related:a[1],data:a[2]}]))})();archives.set(key,archivePromise)}
const database=await archivePromise
assert.deepEqual([...database.keys()].filter(n=>n===SPEC.root||n.startsWith(SPEC.root+'-')).sort(),source.wholeNames)
for(const [name,r]of Object.entries(source.records)){
 if(/@\d+$/.test(name)){const v=source.providerVersions.find(v=>v.name===name);assert(v);const actual=JSON.parse(await publicText(v.apiUrl));assert.equal(actual.name,name.split('@')[0]);assert.equal(Number(actual.version),Number(v.version));assert.equal(actual.related,r.related);assert.equal(actual.data,r.data);assert.equal(sha(actual.data),v.sha256)}
 else assert.deepEqual(database.get(name),r)
}
for(const a of source.aliases)assert.equal(source.records[a.name].data,'[['+a.target+']]')
assert.deepEqual(analysis.historicalNames,Object.keys(source.records).filter(n=>n.includes('@')))
assert.deepEqual(analysis.recordHashes,Object.entries(source.records).map(([name,r])=>({name,sourceSha256:sha(r.data),related:r.related})))
assert.equal(analysis.records,Object.keys(source.records).length)
const codes=[]
assert.equal(Object.keys(proof.engineHashes).length,8)
for(const [file,hash]of Object.entries(proof.engineHashes)){const code=await publicText('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file);assert.equal(sha(code),hash);codes.push(code)}
const engineCapture="\nconst resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],[...seen,name]):r.data};\nconst k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));\nconst groups=[],trace=[];let calls=[];\nfor(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}};\nconst orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};\nconst p=new Polygons();k.makeGlyph(p,root);\nJSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})\n"
const closure=(root,seen=new Set())=>{if(seen.has(root))return seen;seen.add(root);const r=source.records[root];assert(r,'Missing fixed dependency');const a=r.data.match(/^\[\[([^\]]+)\]\]$/);if(a)closure(a[1],seen);else for(const line of r.data.split('$')){const p=line.split(':');if(p[0]==='99')closure(p[7],seen)}return seen}
const reproduce=root=>{const names=closure(root),records=Object.fromEntries([...names].map(n=>[n,source.records[n]])),ctx=vm.createContext({records,root});for(const code of codes)vm.runInContext(code,ctx,{timeout:1000});return JSON.parse(vm.runInContext(engineCapture,ctx,{timeout:3000}))}
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),exact=(a,b)=>a.every((x,i)=>x===b[i])
assert.deepEqual(joins.wholeRoots.map(w=>w.root),source.wholeNames)
const closureMissing=(root,seen=new Set())=>{if(seen.has(root))return[];seen.add(root);const r=source.records[root];if(!r){assert.equal(database.has(root),false);assert(!/@\d+$/.test(root),'Explicit historical dependency failure cannot be disguised as fixed bare absence');return[root]}const a=r.data.match(/^\[\[([^\]]+)\]\]$/),names=a?[a[1]]:r.data.split('$').map(l=>l.split(':')).filter(p=>p[0]==='99').map(p=>p[7]);return[...new Set(names.flatMap(n=>closureMissing(n,seen)))].sort()}
assert.deepEqual([...new Set(source.wholeNames.flatMap(root=>closureMissing(root)))].sort(),[...source.missing].sort())
assert.deepEqual(source.renderableWholeNames,source.wholeNames.filter(root=>closureMissing(root).length===0))
for(const row of joins.wholeRoots){
 if(!row.sourceComplete){assert.deepEqual(row.missingDependencies,closureMissing(row.root));assert.equal(row.sourceProofFile,null);assert(!source.renderableWholeNames.includes(row.root));assert(!source.supplementalUsedForWholeReplay);continue}
 assert.deepEqual(closureMissing(row.root),[])
 const saved=obj(row.sourceProofFile),actual=reproduce(row.root)
 assert.equal(sha(read(row.sourceProofFile)),row.proofFileSha256)
 assert.equal(saved.engineRevision,proof.engineRevision);assert.deepEqual(saved.engineHashes,proof.engineHashes)
 assert.deepEqual(actual.groups,saved.groups);assert.deepEqual(actual.trace,saved.trace);assert.deepEqual(actual.defaults,saved.defaults)
 if(row.root===meta.proofRoot){assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,proof.trace);assert.deepEqual(actual.defaults,proof.defaults)}
 assert.equal(row.rawGroups,actual.groups.length);assert.equal(row.drawingCalls,actual.trace.flat().length);assert.equal(row.originalPolygons,actual.groups.reduce((s,g)=>s+g.polygons.length,0))
 const rows=actual.trace.map((cs,raw)=>({raw,sourceKind:actual.groups[raw].raw[0],start:cs.length?cs[0].args.slice(0,2):null,end:cs.length?endpoint(cs.at(-1)):null}));assert.deepEqual(row.endpoints,rows)
 const edges=[];for(const a of rows)for(const b of rows)if(a.raw!==b.raw&&a.end&&b.start&&exact(a.end,b.start))edges.push([a.raw,b.raw]);assert.deepEqual(row.exactDirectedJoins,edges)
 const internal=[];for(let raw=0;raw<actual.trace.length;raw++){const cs=actual.trace[raw];assert.deepEqual(cs.flatMap(c=>c.polygons),actual.groups[raw].polygons);for(let call=1;call<cs.length;call++){const end=endpoint(cs[call-1]),start=cs[call].args.slice(0,2);if(!exact(end,start)){const delta=start.map((v,i)=>v-end[i]);internal.push({raw,call,end,start,delta,distance:Math.hypot(...delta)})}}}assert.deepEqual(row.internalGaps,internal)

 const active=rows.filter(r=>r.start),adj=new Map(active.map(r=>[r.raw,edges.filter(e=>e[0]===r.raw).map(e=>e[1])])),degree=new Map(active.map(r=>[r.raw,0]))
 for(const [,b]of edges)degree.set(b,degree.get(b)+1)
 const ready=[...degree].filter(([,d])=>d===0).map(([i])=>i);let visitedCount=0
 for(let i=0;i<ready.length;i++){visitedCount++;for(const b of adj.get(ready[i])){degree.set(b,degree.get(b)-1);if(degree.get(b)===0)ready.push(b)}}
 const matched=new Map(),augment=(a,seen)=>{for(const b of adj.get(a)){if(seen.has(b))continue;seen.add(b);if(!matched.has(b)||augment(matched.get(b),seen)){matched.set(b,a);return true}}return false}
 for(const r of active)augment(r.raw,new Set())
 const cyclic=visitedCount!==active.length
 assert.equal(row.visibleRawGroups,active.length);assert.equal(row.directedGraphCyclic,cyclic);assert.equal(row.maximumEndpointMatching,matched.size);assert.equal(row.minimumRawDirectedPathCoverIfAcyclic,cyclic?null:active.length-matched.size)
 const consecutive=[];for(let raw=0;raw+1<rows.length;raw++){const a=rows[raw],b=rows[raw+1];if(a.end&&b.start&&!exact(a.end,b.start)){const delta=b.start.map((v,i)=>v-a.end[i]);consecutive.push({raw:[raw,raw+1],end:a.end,start:b.start,delta,distance:Math.hypot(...delta)})}}assert.deepEqual(row.consecutiveRawEndpointGaps,consecutive)
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
const svg=domestic.toString(),clips=(svg.match(/clip-path="url\(#/g)||[]).length
assert.equal(domestic.length,meta.dictionary.bytes);assert.equal(sha(domestic),meta.dictionary.sha256);assert.equal(clips,SPEC.clips);assert(svg.includes('<title>'+SPEC.glyph+'</title>'))
console.log(JSON.stringify({batch:SPEC.batch,glyph:SPEC.glyph,sourcePassed:source.missing.length===0,sourceEvidencePassed:true,holdGuardPassed:source.missing.length>0,sourceMissingHold:source.missing.length>0,missingOriginalReferences:source.missing,renderableWholeRoots:source.renderableWholeNames.length,wholeRoots:source.wholeNames.length,records:Object.keys(source.records).length,historicalDependencies:source.providerVersions.length,engineFiles:8,catalogStrokes:SPEC.catalog,domesticClips:clips,nativeApprovalAsserted:false,privateMediaSaved:false}))

