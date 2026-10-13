import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import * as compiler from './progressive.mjs'
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),digest=x=>sha(JSON.stringify(x)),copy=x=>JSON.parse(JSON.stringify(x)),read=n=>fs.readFileSync(new URL(n,import.meta.url)),parse=n=>JSON.parse(read(n))
const p=parse('engine-whole-u7277.json'),source=parse('sources.json'),joined=parse('source-join-analysis.json'),identity=compiler.selectedProofIdentity,before=digest(p)
assert.deepEqual(source.missing,[]);assert.equal(source.wholeNames.length,2);assert.equal(source.providerVersions.length,0)
assert.equal(sha(read(identity.sourceProofFile)),identity.sourceProofFileSha256)
assert.equal(compiler.blockedReason,'minimum-original-pens-11-exceeds-catalog-10')
assert.throws(()=>compiler.compileSourceWhole('u7277',p.trace,p,identity),e=>e.message===compiler.blockedReason)
const mutations={trajectory:q=>q.trace[0][0].args[0]+=1,polygon:q=>q.groups[0].polygons[0][0].x+=1,preset:q=>q.defaults.kWidth+=1,fullHeader:q=>q.defaults.extra=1,engineRevision:q=>q.engineRevision='altered',engineHash:q=>q.engineHashes['2d.js']='altered'}
let rejected=0
for(const mutate of Object.values(mutations)){const bad=copy(p);mutate(bad);assert.throws(()=>compiler.compileSourceWhole('u7277',bad.trace,bad,identity),e=>e.message!==compiler.blockedReason);rejected++}
for(const k of ['sourceRoot','sourceProofFile','sourceProofFileSha256']){assert.throws(()=>compiler.compileSourceWhole('u7277',p.trace,p,{...identity,[k]:'altered'}),e=>e.message!==compiler.blockedReason);rejected++}
assert.throws(()=>compiler.compileSourceWhole('u7277',p.trace,p),e=>e.message!==compiler.blockedReason);rejected++
assert.throws(()=>compiler.compileSourceWhole('u7277-ue0100',p.trace,p,identity),e=>e.message!==compiler.blockedReason);rejected++
const ep=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
const facts=[]
for(const w of joined.wholeRoots){const proof=parse('engine-whole-'+w.root+'.json');assert.equal(sha(read('engine-whole-'+w.root+'.json')),w.proofFileSha256);assert.equal(proof.groups.length,11);assert.equal(proof.trace.flat().length,11);assert.equal(proof.groups.flatMap(g=>g.polygons).length,22);assert.deepEqual(w.exactDirectedJoins,[]);assert.deepEqual(w.emptyRawGroups,[]);for(let i=0;i<proof.trace.length;i++)for(let j=0;j<proof.trace.length;j++)if(i!==j)assert.notDeepEqual(ep(proof.trace[i].at(-1)),proof.trace[j][0].args.slice(0,2));assert.equal(w.minimumCompleteCenterlinePaths,11);facts.push({root:w.root,raw:11,draw:11,originalPolygons:22,exactJoins:0,minimumPens:11})}
assert.equal(digest(p),before);assert.equal(compiler.nativeApproved,false);assert.equal(compiler.runtimeApplied,false)
console.log(JSON.stringify({batch:848,glyph:'牷',passed:true,sourceComplete:true,catalogStrokes:10,originalWholeFacts:facts,expectedBlockVerified:true,candidatePens:null,candidateMasks:null,emittedPolygonExactOnce:null,reason:compiler.blockedReason,sourceInputImmutable:true,guardsRejected:rejected,mutationClasses:Object.keys(mutations),compilerFileSHA256:sha(read('progressive.mjs')),nativeApproval:false,runtimeApplied:false}))
