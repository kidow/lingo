import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups} from './candidate.mjs'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x)),full=read('../hanja-goal-glyphwiki-batch551-2026-10-11/engine-whole-u7e9a.json'),f=read('./fixtures.json')['u7e9a'],strokes=f.strokes
const started=performance.now()
assert.deepEqual(f.fullProof,full);assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.deepEqual([strokes.length,strokes.flat().length,full.groups.length,full.trace.flat().length,full.trace.flat().reduce((s,c)=>s+c.polygons.length,0)],[25,34,31,34,68])
assert.deepEqual(sourceGroups,[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15,16],[17],[18],[19],[20],[21,22],[23],[24],[25],[26],[27,28],[29],[30]])
assert.equal(sha(JSON.stringify(strokes)),'1754fd2153c4a6bbb023fcdb3ce5b868d102f1372b0858b2f96a3c77750ff7e7');assert.equal(f.nativeApproval,false);assert.equal(f.runtimeApplied,false)
for(const[p,h]of[[selectedProofIdentity.sourceProofFile,selectedProofIdentity.sourceProofFileSha256],[selectedProofIdentity.sourceCapsuleFile,selectedProofIdentity.sourceCapsuleFileSha256],[selectedProofIdentity.sourceChecksFile,selectedProofIdentity.sourceChecksFileSha256]])assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h)
const polygons=s=>s.match(/M[^M]+/g).map(p=>{const a=p.match(/-?\d+(?:\.\d+)?/g).map(Number);return Array.from({length:a.length/2},(_,i)=>[a[2*i],a[2*i+1]])}),cycle=(a,b)=>[b,b.toReversed()].some(v=>v.some((_,i)=>JSON.stringify(a)===JSON.stringify([...v.slice(i),...v.slice(0,i)])))
const original=sourceGroups.flatMap(gs=>gs.flatMap(i=>full.trace[i]));assert.equal(original.length,strokes.flat().length)
for(let i=0;i<original.length;i++){const P=polygons(strokes.flat()[i].outline);assert.equal(P.length,original[i].polygons.length);for(let j=0;j<P.length;j++)assert(cycle(P[j],original[i].polygons[j].map(v=>[v.x/2,v.y/2])))}
assert.deepEqual(sourceGroups.flat().toSorted((a,b)=>a-b),Array.from({length:31},(_,i)=>i));assert.equal(new Set(sourceGroups.flat()).size,31)
assert.equal(strokes[0].length,2);assert.equal(strokes[1].length,2);assert.equal(strokes[22].length,2);assert.equal(f.sourceProposal.historical9FramesApproved,0);assert.equal(f.sourceProposal.newSourceStaticMappingApproved,false);assert.equal(f.sourceProposal.newDirectionsReviewed,0);
let negative=0;for(const change of[x=>x.identity.sourceRoot+='-wrong',x=>x.identity.sourceProofFileSha256='0'.repeat(64),x=>x.full.groups[0].raw[0]++,x=>x.trace[0][0].args[0]+=.01,x=>x.trace[0][0].polygons[0][0].x+=.01]){const x={identity:clone(selectedProofIdentity),full:clone(full),trace:clone(full.trace)};change(x);assert.throws(()=>compileProgressive(x.trace,x.full,x.identity));negative++}
let getterReads=0;const foreign=clone(selectedProofIdentity);Object.defineProperty(foreign,'sourceRoot',{enumerable:true,get(){getterReads++;return selectedProofIdentity.sourceRoot}});assert.throws(()=>compileProgressive(full.trace,full,foreign));assert.equal(getterReads,0);negative++
console.log(JSON.stringify({glyph:'纚',sourceRoot:'u7e9a',sourceGuardFIRST:true,counts:[25,34,31,34,68],negative,getterReads,sourceProjection:1,preparedProjectionReused:true,engineRuns:0,archiveGET:0,oldHoldPreserved:true,originalPCyclesPreserved:true,historicalWholeOnly:true,old9FramesApproved:0,newGroupingApproved:false,nativeApproval:false,registered:false,durationMs:performance.now()-started}))
