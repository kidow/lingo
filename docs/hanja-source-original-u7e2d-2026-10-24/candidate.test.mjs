import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups} from './candidate.mjs'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x)),full=read('../hanja-goal-glyphwiki-batch553-2026-10-11/engine-whole-u7e2d.json'),source=read('../hanja-goal-glyphwiki-batch553-2026-10-11/sources.json'),f=read('./fixtures.json').u7e2d,strokes=f.strokes
const started=performance.now()
assert.deepEqual(f.fullProof,full);assert.deepEqual(f.identity,selectedProofIdentity);assert.equal(source.root,'u7e2d');assert.equal(Object.keys(source.records).length,13)
assert.deepEqual([strokes.length,strokes.flat().length,full.groups.length,full.trace.flat().length,full.trace.flat().reduce((s,c)=>s+c.polygons.length,0)],[17,22,21,22,48])
assert.deepEqual(sourceGroups,[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12,14],[13],[15],[16,17],[18],[19],[20]])
assert.equal(sha(JSON.stringify(strokes)),'5f217195f5400ec53a1f306af4cdbbd4f4aa5b7ba142e5c26d3697b4b40f31dc');assert.equal(f.nativeApproval,false);assert.equal(f.runtimeApplied,false)
for(const[p,h]of[[selectedProofIdentity.sourceProofFile,selectedProofIdentity.sourceProofFileSha256],[selectedProofIdentity.sourceCapsuleFile,selectedProofIdentity.sourceCapsuleFileSha256],[selectedProofIdentity.sourceChecksFile,selectedProofIdentity.sourceChecksFileSha256]])assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h)
const polygons=s=>s.match(/M[^M]+/g).map(p=>{const a=p.match(/-?\d+(?:\.\d+)?/g).map(Number);return Array.from({length:a.length/2},(_,i)=>[a[2*i],a[2*i+1]])}),cycle=(a,b)=>[b,b.toReversed()].some(v=>v.some((_,i)=>JSON.stringify(a)===JSON.stringify([...v.slice(i),...v.slice(0,i)])))
const original=sourceGroups.flatMap(gs=>gs.flatMap(i=>full.trace[i]));assert.equal(original.length,strokes.flat().length)
for(let i=0;i<original.length;i++){const P=polygons(strokes.flat()[i].outline);assert.equal(P.length,original[i].polygons.length);for(let j=0;j<P.length;j++)assert(cycle(P[j],original[i].polygons[j].map(v=>[v.x/2,v.y/2])))}
assert.deepEqual(strokes[0].map(s=>s.direction),['curve','curve']);assert.deepEqual(strokes[1].map(s=>s.direction),['curve','curve'])
assert.equal(strokes[0][0].revealPath,'M25.09 8 Q19.98 18.5 13.775 28');assert.equal(strokes[0][1].revealPath,'M6.11 22.5 Q14.87 28 18.52 38')
assert.equal(strokes[1][0].revealPath,'M35.675 19.5 Q25.455 38 13.41 55');assert.equal(strokes[1][1].revealPath,'M6.84 56.5 Q22.17 54.5 35.675 50.5')
assert.deepEqual(strokes[10].map(s=>s.direction),['down','right']);assert.deepEqual(strokes[13].map(s=>s.direction),['right','down','curve'])
assert.deepEqual(sourceGroups.flat().toSorted((a,b)=>a-b),Array.from({length:21},(_,i)=>i));assert.equal(new Set(sourceGroups.flat()).size,21)
assert.deepEqual(f.sourceProposal.originalGaps.map(g=>g.delta),[[-15.33,-11],[-13.14,3]])
assert.deepEqual(f.sourceProposal.nonconsecutiveJoins,[[13,15]]);assert.deepEqual(f.sourceProposal.reorderedRawOneBased,[13,15,14]);assert.equal(f.sourceProposal.staticMappingApproved,false);assert.equal(f.sourceProposal.oldPenOneDisconnectedHoldPreserved,true);assert.equal(f.sourceProposal.oldNineteenCandidateVersusSeventeenHoldPreserved,true)
let negative=0;for(const change of[x=>x.identity.sourceRoot+='-wrong',x=>x.identity.sourceProofFileSha256='0'.repeat(64),x=>x.full.groups[0].raw[0]++,x=>x.trace[0][0].args[0]+=.01,x=>x.trace[0][0].polygons[0][0].x+=.01]){const x={identity:clone(selectedProofIdentity),full:clone(full),trace:clone(full.trace)};change(x);assert.throws(()=>compileProgressive(x.trace,x.full,x.identity));negative++}
let getterReads=0;const foreign=clone(selectedProofIdentity);Object.defineProperty(foreign,'sourceRoot',{enumerable:true,get(){getterReads++;return selectedProofIdentity.sourceRoot}});assert.throws(()=>compileProgressive(full.trace,full,foreign));assert.equal(getterReads,0);negative++
console.log(JSON.stringify({glyph:'縭',sourceGuardFIRST:true,counts:[17,22,21,22,48],negative,getterReads,sourceProjection:1,preparedProjectionReused:true,engineRuns:0,archiveGET:0,oldHoldPreserved:true,originalPCyclesPreserved:true,nativeMappingApproved:false,nativeApproval:false,registered:false,durationMs:performance.now()-started}))
