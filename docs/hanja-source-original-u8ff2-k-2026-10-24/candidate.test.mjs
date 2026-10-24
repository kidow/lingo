import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups} from './candidate.mjs'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x)),full=read('../hanja-public-glyphwiki-engine-capture-2026-10-22/engine-whole-u8ff2-k.json'),f=read('./fixtures.json')['u8ff2-k'],strokes=f.strokes
const started=performance.now()
assert.deepEqual(f.fullProof,full);assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.deepEqual([strokes.length,strokes.flat().length,full.groups.length,full.trace.flat().length,full.trace.flat().reduce((s,c)=>s+c.polygons.length,0)],[9,12,12,12,26])
assert.deepEqual(sourceGroups,[[6],[7],[8],[9,10],[11],[0],[1],[2,3],[4,5]])
assert.equal(sha(JSON.stringify(strokes)),'2647f8b5345c3a29193e1273e0a5ef2a133bfada0f3800708e5ba25f94b46eb2');assert.equal(f.nativeApproval,false);assert.equal(f.runtimeApplied,false)
for(const[p,h]of[[selectedProofIdentity.sourceProofFile,selectedProofIdentity.sourceProofFileSha256],[selectedProofIdentity.sourceCapsuleFile,selectedProofIdentity.sourceCapsuleFileSha256],[selectedProofIdentity.sourceChecksFile,selectedProofIdentity.sourceChecksFileSha256]])assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h)
const polygons=s=>s.match(/M[^M]+/g).map(p=>{const a=p.match(/-?\d+(?:\.\d+)?/g).map(Number);return Array.from({length:a.length/2},(_,i)=>[a[2*i],a[2*i+1]])}),cycle=(a,b)=>[b,b.toReversed()].some(v=>v.some((_,i)=>JSON.stringify(a)===JSON.stringify([...v.slice(i),...v.slice(0,i)])))
const original=sourceGroups.flatMap(gs=>gs.flatMap(i=>full.trace[i]));assert.equal(original.length,strokes.flat().length)
for(let i=0;i<original.length;i++){const P=polygons(strokes.flat()[i].outline);assert.equal(P.length,original[i].polygons.length);for(let j=0;j<P.length;j++)assert(cycle(P[j],original[i].polygons[j].map(v=>[v.x/2,v.y/2])))}
assert.deepEqual(strokes[7].map(s=>s.direction),['right','down']);assert.deepEqual(strokes[8].map(s=>s.direction),['curve','curve']);assert.equal(strokes[8][1].revealPath,'M26.5 76 C34 86 42 90.5 89.5 88.5')
assert.deepEqual(sourceGroups.flat().toSorted((a,b)=>a-b),Array.from({length:12},(_,i)=>i));assert.equal(new Set(sourceGroups.flat()).size,12)
assert.equal(f.sourceProposal.historicalMissingFixedSourceHoldPreserved,true);assert.equal(f.sourceProposal.newPublicClosureIsSeparateFromHistoricalArchive,true);assert.equal(f.sourceProposal.sourceStaticCorrespondence.reusedScreens,21);assert.equal(f.sourceProposal.compoundOfficialEvidence.reusedScreens,11);assert.equal(f.sourceProposal.allOfficialDirectionsObserved,false);assert.equal(f.sourceProposal.initialContactApproved,false)
let negative=0;for(const change of[x=>x.identity.sourceRoot+='-wrong',x=>x.identity.sourceProofFileSha256='0'.repeat(64),x=>x.full.groups[0].raw[0]++,x=>x.trace[0][0].args[0]+=.01,x=>x.trace[0][0].polygons[0][0].x+=.01]){const x={identity:clone(selectedProofIdentity),full:clone(full),trace:clone(full.trace)};change(x);assert.throws(()=>compileProgressive(x.trace,x.full,x.identity));negative++}
let getterReads=0;const foreign=clone(selectedProofIdentity);Object.defineProperty(foreign,'sourceRoot',{enumerable:true,get(){getterReads++;return selectedProofIdentity.sourceRoot}});assert.throws(()=>compileProgressive(full.trace,full,foreign));assert.equal(getterReads,0);negative++
console.log(JSON.stringify({glyph:'迲',sourceRoot:'u8ff2-k',sourceGuardFIRST:true,counts:[9,12,12,12,26],negative,getterReads,sourceProjection:1,preparedProjectionReused:true,engineRuns:0,archiveGET:0,oldHoldPreserved:true,originalPCyclesPreserved:true,staticCorrespondenceReused:21,officialCompoundScreensReused:11,nativeApproval:false,registered:false,durationMs:performance.now()-started}))
