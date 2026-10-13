import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import * as compiler from './progressive.mjs'
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),digest=x=>sha(JSON.stringify(x)),copy=x=>JSON.parse(JSON.stringify(x)),read=n=>fs.readFileSync(new URL(n,import.meta.url)),parse=n=>JSON.parse(read(n))
const c=parse('candidate-compile-analysis.json'),m=parse('metadata.json'),source=parse('sources.json'),joined=parse('source-join-analysis.json'),identity=compiler.selectedProofIdentity,root=compiler.sourceRoot,selected=parse(compiler.sourceProofFile),header=parse('engine-proof.json')
assert.deepEqual(source.missing,[]);assert.equal(sha(read(compiler.sourceProofFile)),compiler.sourceWholeFileSHA256)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected},before=digest(proof),out=compiler.compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(out.length,c.catalogStrokes);assert.equal(m.dictionary.clips,c.catalogStrokes)
const polygons=proof.groups.flatMap(g=>g.polygons),polycount=polygons.length
assert.equal(out.flat().reduce((n,x)=>n+(x.outline.match(/M/g)||[]).length,0),polycount)
const expected=polygons.flatMap(poly=>poly.map(v=>JSON.stringify([v.x/2,v.y/2]))).sort()
const actual=out.flat().flatMap(mask=>[...mask.outline.matchAll(/[ML](-?[0-9.]+(?:e[+-]?[0-9]+)?) (-?[0-9.]+(?:e[+-]?[0-9]+)?)/g)].map(x=>JSON.stringify([Number(x[1]),Number(x[2])]))).sort()
assert.deepEqual(actual,expected)
const mutations={argumentTrace:q=>q.trace.find(x=>x.length)[0].args[0]+=1,originalPolygon:q=>q.groups.find(g=>g.polygons.length).polygons[0][0].x+=1,preset:q=>q.defaults.kWidth+=1,engineRevision:q=>q.engineRevision='altered',engineHash:q=>q.engineHashes['2d.js']='altered',extraWholeHeader:q=>q.unpinned='altered'}
let rejected=0;for(const mutate of Object.values(mutations)){const bad=copy(proof);mutate(bad);assert.throws(()=>compiler.compileSourceWhole(root,bad.trace,bad,identity));rejected++}
for(const k of ['sourceRoot','sourceProofFile','sourceProofFileSHA256']){assert.throws(()=>compiler.compileSourceWhole(root,proof.trace,proof,{...identity,[k]:'altered'}));rejected++}
assert.throws(()=>compiler.compileSourceWhole(root,proof.trace,proof));rejected++
assert.throws(()=>compiler.compileSourceWhole('unselected-'+root,proof.trace,proof,identity));rejected++
assert.throws(()=>compiler.sourceGroups[0].push(99));rejected++
const ep=x=>x.args.slice(x.kind==='cdDrawLine'?2:x.kind==='cdDrawCurve'?4:6,x.kind==='cdDrawLine'?4:x.kind==='cdDrawCurve'?6:8)
const empty=proof.groups.flatMap((g,i)=>g.polygons.length===0?[i]:[])
assert.deepEqual([...compiler.sourceGroups.flat()].sort((a,b)=>a-b),proof.groups.flatMap((g,i)=>g.polygons.length?[i]:[]))
for(const g of compiler.sourceGroups){const calls=g.flatMap(i=>proof.trace[i]);for(let i=1;i<calls.length;i++)assert.deepEqual(ep(calls[i-1]),calls[i].args.slice(0,2))}
const facts=joined.wholeRoots.map(w=>{const file='engine-whole-'+w.root+'.json',p=parse(file);assert.equal(sha(read(file)),w.proofFileSha256);assert.equal(p.groups.length,w.rawGroups);assert.equal(p.trace.flat().length,w.drawingCalls);assert.equal(p.groups.flatMap(g=>g.polygons).length,w.originalPolygons);return{root:w.root,raw:w.rawGroups,rawEmpty:p.groups.flatMap((g,i)=>g.polygons.length===0?[i]:[]),draw:w.drawingCalls,originalPolygons:w.originalPolygons,exactJoins:w.exactDirectedJoins,minimum:p.groups.filter(g=>g.polygons.length).length-(w.maximumEndpointMatching??0)}})
const transitions=out.flatMap((m,i)=>m.flatMap((x,k)=>m[k+1]?[{pen:i+1,mask:k+1,nextMask:k+2}]:[]))
assert.equal(digest(proof),before);assert.equal(compiler.nativeApproval,false);assert.equal(compiler.runtimeApplied,false)
console.log(JSON.stringify({batch:c.batch,glyph:c.glyph,passed:true,sourceRoot:root,sourceProofFile:compiler.sourceProofFile,sourceProofFileSHA256:compiler.sourceWholeFileSHA256,wholeFacts:facts,raw:proof.groups.length,rawEmpty:empty,draw:proof.trace.flat().length,candidatePens:out.length,candidateMasks:out.flat().length,originalPolygons:polycount,eachOriginalPolygonEmittedOnce:true,originalPolygonCoordinateMultisetUnchanged:true,curveFinePens:out.flatMap((m,i)=>m.some(x=>x.direction==='curve')?[i+1]:[]),originalMaskTransitions:transitions,terminalPoints:compiler.sourceGroups.map((g,i)=>({pen:i+1,sourceRaw:g,sourceEnd:ep(proof.trace[g.at(-1)].at(-1)),terminal:proof.trace[g.at(-1)].at(-1).args.at(-1),maskDirection:out[i].at(-1).direction})),sourceInputImmutable:true,guardsRejected:rejected,mutationClasses:Object.keys(mutations),compiledOutlinesSHA256:digest(out),compilerFileSHA256:sha(read('progressive.mjs')),nativeApproval:false,runtimeApplied:false}))
