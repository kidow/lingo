import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import * as compiler from './progressive.mjs'
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),digest=x=>sha(JSON.stringify(x)),copy=x=>JSON.parse(JSON.stringify(x)),read=n=>fs.readFileSync(new URL(n,import.meta.url)),parse=n=>JSON.parse(read(n))
const p=parse('engine-whole-u98e6.json'),source=parse('sources.json'),joined=parse('source-join-analysis.json'),identity=compiler.selectedProofIdentity,before=digest(p)
assert.deepEqual(source.missing,[]);assert.equal(source.wholeNames.length,5);assert.equal(source.providerVersions[0].name,'u5e72@3')
assert.equal(sha(read(identity.sourceProofFile)),identity.sourceProofFileSha256)
const out=compiler.compileSourceWhole('u98e6',p.trace,p,identity)
assert.equal(out.length,12);assert.equal(out.flat().length,12);assert.equal(p.groups.length,13);assert.equal(p.trace.flat().length,13)
const polygons=p.groups.flatMap(g=>g.polygons),polycount=polygons.length;assert.equal(polycount,22)
assert.equal(out.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),polycount)
const expected=polygons.flatMap(poly=>poly.map(v=>JSON.stringify([v.x/2,v.y/2]))).sort()
const actual=out.flat().flatMap(m=>[...m.outline.matchAll(/[ML](-?[0-9.]+(?:e[+-]?[0-9]+)?) (-?[0-9.]+(?:e[+-]?[0-9]+)?)/g)].map(x=>JSON.stringify([Number(x[1]),Number(x[2])]))).sort()
assert.deepEqual(actual,expected)
const ep=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
assert.deepEqual(ep(p.trace[4].at(-1)),p.trace[5][0].args.slice(0,2));assert.deepEqual(ep(p.trace[4].at(-1)),[75.53,79])
const mutations={trajectory:q=>q.trace[0][0].args[0]+=1,polygon:q=>q.groups[0].polygons[0][0].x+=1,preset:q=>q.defaults.kWidth+=1,fullHeader:q=>q.defaults.extra=1,engineRevision:q=>q.engineRevision='altered',engineHash:q=>q.engineHashes['2d.js']='altered'}
let rejected=0;for(const mutate of Object.values(mutations)){const bad=copy(p);mutate(bad);assert.throws(()=>compiler.compileSourceWhole('u98e6',bad.trace,bad,identity));rejected++}
for(const k of ['sourceRoot','sourceProofFile','sourceProofFileSha256']){assert.throws(()=>compiler.compileSourceWhole('u98e6',p.trace,p,{...identity,[k]:'altered'}));rejected++}
assert.throws(()=>compiler.compileSourceWhole('u98e6',p.trace,p));rejected++
assert.throws(()=>compiler.compileSourceWhole('u98e6-ue0100',p.trace,p,identity));rejected++
assert.throws(()=>compiler.sourceGroups[0].push(11));rejected++
const facts=joined.wholeRoots.map(w=>{const file='engine-whole-'+w.root+'.json',proof=parse(file);assert.equal(sha(read(file)),w.proofFileSha256);assert.equal(proof.groups.length,w.rawGroups);assert.equal(proof.trace.flat().length,w.drawingCalls);assert.equal(proof.groups.flatMap(g=>g.polygons).length,w.originalPolygons);assert.deepEqual(w.emptyRawGroups,[]);return{root:w.root,raw:w.rawGroups,draw:w.drawingCalls,originalPolygons:w.originalPolygons,minimumPens:w.minimumCompleteCenterlinePaths,exactJoins:w.exactDirectedJoins}})
assert.equal(digest(p),before);assert.equal(compiler.nativeApproved,false);assert.equal(compiler.runtimeApplied,false)
console.log(JSON.stringify({batch:849,glyph:'飦',passed:true,sourceWholeFacts:facts,candidatePens:12,candidateMasks:12,originalPolygons:22,eachOriginalPolygonEmittedOnce:true,originalPolygonCoordinateMultisetUnchanged:true,curveFinePens:out.flatMap((m,i)=>m.some(x=>x.direction==='curve')?[i+1]:[]),terminalPoints:compiler.sourceGroups.map((g,i)=>({pen:i+1,sourceRaw:g,sourceEnd:ep(p.trace[g.at(-1)].at(-1)),terminal:p.trace[g.at(-1)].at(-1).args.at(-1),maskDirection:out[i].at(-1).direction})),sourceInputImmutable:true,guardsRejected:rejected,mutationClasses:Object.keys(mutations),compiledOutlinesSHA256:digest(out),compilerFileSHA256:sha(read('progressive.mjs')),nativeApproval:false,runtimeApplied:false}))
