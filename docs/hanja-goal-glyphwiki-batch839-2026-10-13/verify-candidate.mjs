import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import * as compiler from './progressive.mjs'
const read=n=>fs.readFileSync(new URL(n,import.meta.url)),parse=n=>JSON.parse(read(n)),sha=x=>crypto.createHash('sha256').update(x).digest('hex'),digest=x=>sha(JSON.stringify(x)),copy=x=>JSON.parse(JSON.stringify(x))
const source=parse('sources.json'),joined=parse('source-join-analysis.json'),results=[]
assert.equal(source.root,'u82f4');assert.deepEqual(source.missing,[]);assert.equal(source.providerVersions.length,0)
assert.deepEqual(compiler.supportedWholeRoots,['u82f4-k'])
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
const coordinateMultiset=points=>points.map(p=>JSON.stringify(p)).sort()
const outlineCoordinates=out=>out.flatMap(mask=>[...mask.outline.matchAll(/[ML](-?[0-9.]+(?:e[+-]?[0-9]+)?) (-?[0-9.]+(?:e[+-]?[0-9]+)?)/g)].map(m=>[Number(m[1]),Number(m[2])]))
const mut={trajectory:p=>p.trace.flat()[0].args[0]+=1,polygon:p=>p.groups.find(g=>g.polygons.length).polygons[0][0].x+=1,preset:p=>p.defaults.kWidth+=1,engineRevision:p=>p.engineRevision='altered',engineHash:p=>p.engineHashes['2d.js']='altered',wholeAttribution:p=>p.sourceRoot='unselected-u7cbb'}
for(const root of compiler.supportedWholeRoots){
 const id=compiler.wholeSourceIdentities[root],p=parse(id.file),before=digest(p)
 assert.equal(sha(read(id.file)),id.fileSHA256);assert.equal(p.sourceRoot,root);assert.equal(p.sourceProofFile,id.file);assert.equal(p.sourceArchiveSHA256,source.archive.sha256);assert.equal(joined.wholeResults.find(w=>w.root===root).originalWholeFileSHA256,id.fileSHA256)
 const proof={...copy(p),sourceProofFileSHA256:id.fileSHA256},out=compiler.compileSourceWhole(root,proof.trace,proof,id)
 assert.equal(digest(p),before);assert.equal(out.length,9)
 const poly=p.groups.reduce((n,g)=>n+g.polygons.length,0);assert.equal(poly,16);assert.equal(out.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),poly)
 const expectedCoordinates=p.groups.flatMap(g=>g.polygons.flatMap(poly=>poly.map(v=>[v.x/2,v.y/2])));assert.deepEqual(coordinateMultiset(outlineCoordinates(out.flat())),coordinateMultiset(expectedCoordinates))
 assert.equal(p.groups.length,10);assert.equal(p.trace.flat().length,10);assert(p.groups.every(g=>g.polygons.length>0));for(const g of compiler.sourceGroups)for(let i=1;i<g.length;i++)assert.deepEqual(endpoint(p.trace[g[i-1]].at(-1)),p.trace[g[i]][0].args.slice(0,2));
 let rejected=0;for(const mutate of Object.values(mut)){const bad=copy(proof);mutate(bad);assert.throws(()=>compiler.compileSourceWhole(root,bad.trace,bad,id));rejected++}
 for(const key of ['sourceProofFile','sourceProofFileSHA256','sourceArchiveSHA256']){const bad=copy(proof);bad[key]='altered';assert.throws(()=>compiler.compileSourceWhole(root,bad.trace,bad,id));rejected++}
 assert.throws(()=>compiler.compileSourceWhole(root,proof.trace,proof));assert.throws(()=>compiler.compileSourceWhole(root,proof.trace,proof,{...id,fileSHA256:'altered'}));assert.throws(()=>compiler.compileSourceWhole('u7cbb-g',proof.trace,proof,id));assert.throws(()=>compiler.compileSourceWhole('u82f4',proof.trace,proof,id));rejected+=4
 assert.throws(()=>compiler.sourceGroups[0].push(11));rejected++
 const sourceGroups=compiler.sourceGroups;
 const terminalPoints=sourceGroups.map((g,i)=>{const c=p.trace[g.at(-1)].at(-1);return{pen:i+1,sourceRaw:g,sourceEnd:endpoint(c),normalizedEnd:endpoint(c).map(v=>v/2),terminal:c.args.at(-1),maskDirection:out[i].at(-1).direction}})
 const curveFinePens=out.flatMap((m,i)=>m.some(x=>x.direction==='curve')?[i+1]:[])
 const maskTransitions=out.flatMap((m,i)=>m.flatMap((x,k)=>m[k+1]?[{pen:i+1,mask:k+1,nextMask:k+2}]:[]))
 results.push({root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,raw:10,rawEmpty:0,draw:10,originalPolygons:poly,candidatePens:out.length,masks:out.flat().length,curveFinePens,terminalPoints,maskTransitions,compiledOutlinesSHA256:digest(out),originalPolygonCoordinateMultisetUnchanged:true,eachOriginalPolygonEmittedOnce:true,sourceInputImmutable:true,guardsRejected:rejected,mutationClasses:Object.keys(mut),nativeApproval:false,nativeOrderApproval:false,nativeDirectionsReviewed:0,nativeFramesReviewed:0,nativeReplaysReviewed:0,runtimeApplied:false})
}
assert.equal(compiler.nativeApproval,false);assert.equal(compiler.runtimeApplied,false)
console.log(JSON.stringify({batch:839,glyph:'苴',passed:true,compilerFileSHA256:sha(read('progressive.mjs')),sourceFileSHA256:sha(read('sources.json')),sourceJoinAnalysisSHA256:sha(read('source-join-analysis.json')),results,scope:'원본 숫자·file identity·불변 geometry 검증만 수행. 국내 whole·pen 경계·순서·방향·frame·replay 미검토.'}))
