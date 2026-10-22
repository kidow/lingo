import assert from'node:assert/strict'
import{readFileSync,existsSync}from'node:fs'
import{createHash}from'node:crypto'
const CONFIG=JSON.parse(readFileSync(new URL('./config.json',import.meta.url))),ROOT=new URL('../../',import.meta.url)
const sha=b=>createHash('sha256').update(b).digest('hex'),digest=v=>sha(JSON.stringify(v))
export const sourceRoot=CONFIG.root,sourceProofFile=CONFIG.identity.sourceProofFile,sourceProofFileSha256=CONFIG.identity.sourceProofFileSha256
export const selectedProofIdentity=Object.freeze({...CONFIG.identity}),sourceGroups=Object.freeze(CONFIG.sourceGroups.map(g=>Object.freeze([...g])))
export const nativeApproved=false,runtimeApplied=false
const originalGroups=[[0],[1],[3],[2],[4],[5],[6,7],[8],[9,10],[11],[12],[13,14],[15],[16],[17,18],[19],[20],[21],[22],[23]]
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
function validateSelected(trace,proof,identity){
 strictJSON(trace);strictJSON(proof);strictJSON(identity)
 assert.equal(sourceRoot,'u85fb-k');assert.deepEqual(identity,selectedProofIdentity);assert.deepEqual(sourceGroups,originalGroups)
 for(const[path,pin]of Object.entries(CONFIG.inputSHA256))assert.equal(sha(readFileSync(new URL(path,ROOT))),pin,path)
 const original=JSON.parse(readFileSync(new URL(sourceProofFile,import.meta.url)));assert.deepEqual(Object.keys(original).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(proof,original);assert.deepEqual(trace,original.trace);assert.equal(digest(proof),CONFIG.selectedProofJSONSHA256)
 const all=JSON.parse(readFileSync(new URL(CONFIG.sourceRecordsFile,ROOT))),names=[],queue=[sourceRoot]
 while(queue.length){const name=queue.shift();if(names.includes(name))continue;names.push(name);const rec=all.records[name];assert(rec);for(const row of rec.data.split('$')){const a=row.split(':');if(a[0]==='99')queue.push(a[7])}}
 assert.deepEqual(names,CONFIG.selectedClosureNames);const records=Object.fromEntries(names.map(n=>[n,all.records[n]]));assert.deepEqual(records,CONFIG.closureRecords);assert.equal(digest(records),CONFIG.closureRecordsSHA256);assert.equal(all.latestSubstitution,false)
}
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
const length=c=>Math.hypot(...endpoint(c).map((v,i)=>v-c.args[i]))/2
const segment=(polygons,direction,weight)=>{
 const pts=polygons.flat();assert(pts.length>0&&pts.every(p=>p.off===0));assert(weight>0)
 const ordered=polygons.map(p=>{const area=p.reduce((s,v,i)=>{const n=p[(i+1)%p.length];return s+v.x*n.y-n.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
 return{outline:ordered.map(p=>p.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...pts.map(p=>p.x))/2,Math.min(...pts.map(p=>p.y))/2,Math.max(...pts.map(p=>p.x))/2,Math.max(...pts.map(p=>p.y))/2],direction,weight:Math.round(weight*1e6)/1e6}
}
const piece=c=>{
 const a=c.args
 if(c.kind==='cdDrawCurve')return{...segment(c.polygons,'curve',length(c)),revealPath:'M'+a[0]/2+' '+a[1]/2+' Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2,revealWidth:14}
 assert.equal(c.kind,'cdDrawLine','This source has only original L/Q calls')
 const dir=a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve'
 const s=segment(c.polygons,dir,length(c));return dir==='curve'?{...s,revealPath:'M'+a[0]/2+' '+a[1]/2+' L'+a[2]/2+' '+a[3]/2,revealWidth:14}:s
}
function projectK(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit K source file/byte identity required')
 const bytes=readFileSync(new URL(sourceProofFile,import.meta.url))
 assert.equal(createHash('sha256').update(bytes).digest('hex'),sourceProofFileSha256)
 const original=JSON.parse(bytes);assert.deepEqual(proof,original,'Exact original five-key header/body/preset')
 assert.deepEqual(trace,original.trace)
 assert.deepEqual(sourceGroups,originalGroups,'Only root-observed grass permutation and specific water pair are allowed')
 assert.deepEqual([...sourceGroups.flat()].sort((a,b)=>a-b),trace.map((_,i)=>i),'All source raw rows exactly once')
 for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
 const out=sourceGroups.map(g=>{
   const calls=g.flatMap(i=>trace[i]);assert(calls.length>0)
   if(g.length===2&&g[0]===6&&g[1]===7){
     assert.equal(calls.length,2);assert.deepEqual(calls[0].args,[13.64,145.075,40.24,152.05,37.2,184.6,7,8]);assert.deepEqual(calls[1].args,[33.4,158.25,36.44,148.95,68.36,93.925,32,7])
     assert.deepEqual(endpoint(calls[0]),[37.2,184.6]);assert.deepEqual(calls[1].args.slice(0,2),[33.4,158.25])
     // Separate original Q masks. Do not bridge the(-3.8,-26.35) source gap.
     return calls.map(piece)
   }
   if(calls.length===1)return[piece(calls[0])]
   for(let i=1;i<calls.length;i++)assert.deepEqual(endpoint(calls[i-1]),calls[i].args.slice(0,2),'No other disconnected compound is allowed')
   assert(calls.every(c=>c.kind==='cdDrawLine'),'Only original exact L folds grouped')
   const start=calls[0].args.slice(0,2),path='M'+start[0]/2+' '+start[1]/2+calls.map(c=>' L'+c.args[2]/2+' '+c.args[3]/2).join('')
   return[{...segment(calls.flatMap(c=>c.polygons),'curve',calls.reduce((s,c)=>s+length(c),0)),revealPath:path,revealWidth:14}]
 })
 assert.equal(out.length,20);assert.equal(out.flat().length,21)
 return out
}

let captureRuns=0,cachedReads=0
export function captureProjection(...args){
 assert.equal(args.length,3);assert.equal(CONFIG.fixedCacheSHA256,null,'Final cache disables projection');assert(!existsSync(new URL('./fixture.json',import.meta.url)),'Existing frozen fixture forbids projection');assert.equal(captureRuns,0,'Only first K pure projection allowed')
 validateSelected(...args);captureRuns++
 const strokes=projectK(...args),geometrySHA256=digest(strokes)
 assert.equal(geometrySHA256,CONFIG.expectedCompiledGeometrySHA256,'Stop: K source output differs from historical original; do not rerun')
 assert.equal(strokes.length,20);assert.equal(strokes.flat().length,21);assert.equal(strokes.flat().reduce((s,m)=>s+(m.outline.match(/M/g)?.length??0),0),37)
 return{schema:'hanja-fixed-source-cache/v1',root:sourceRoot,identity:selectedProofIdentity,sourceGroups:originalGroups,strokes,geometrySHA256,counts:{pens:20,masks:21,polygons:37,raw:24,calls:24},originalKGeometryHelpersSHA256:CONFIG.geometryHelpersSHA256,originalKGeometryFunctionBodySHA256:CONFIG.geometryFunctionBodySHA256,preparation:{candidateProjectionRuns:1,newKPureBodyExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,nativeApproval:false,actualAppUI:false,runtimeApplied:false},sourcePreservation:{everyOriginalPolygonExactlyOnce:true,originalGuidesWidthsWeightsPreserved:true,independentWater7Masks:true,sourceGapRetained:true,connectorAdded:false,sourceSplit:false,baseMixed:false},staticMappingApproved:true,sourceGroupsApproved:false,officialMacroEvidence:{path:'docs/hanja-official-media-compare-u85fb-2026-10-23/official-temporal-native-review.json',screens:60,microClockApproved:false},sourceContactApproved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false}
}
export function compileProgressive(...args){
 assert.equal(args.length,3);validateSelected(...args);assert.equal(typeof CONFIG.fixedCacheSHA256,'string');const bytes=readFileSync(new URL('./fixture.json',import.meta.url));assert.equal(sha(bytes),CONFIG.fixedCacheSHA256);const f=JSON.parse(bytes);assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(f.sourceGroups,originalGroups);assert.equal(digest(f.strokes),CONFIG.expectedCompiledGeometrySHA256);assert.equal(f.geometrySHA256,CONFIG.expectedCompiledGeometrySHA256);cachedReads++;return f.strokes
}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
export function operationCounts(){return{captureRuns,cachedReads,engineRuns:0,originalCompilerExecutions:0}}
