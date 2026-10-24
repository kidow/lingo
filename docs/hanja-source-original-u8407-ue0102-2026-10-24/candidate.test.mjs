import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups} from './candidate.mjs'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x)),full=read(selectedProofIdentity.sourceProofFile),f=read('./fixtures.json')['u8407-ue0102'],strokes=f.strokes
const started=performance.now()
assert.deepEqual(f.fullProof,full);assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.deepEqual([strokes.length,strokes.flat().length,full.groups.length,full.trace.flat().length,full.trace.flat().reduce((s,c)=>s+c.polygons.length,0)],[12,13,13,13,26])
assert.deepEqual(sourceGroups,[[0],[1],[3],[2],[9],[8],[10],[11],[12],[4,5],[6],[7]])
assert.equal(sha(JSON.stringify(strokes)),'7cb189c369e7daf3e4cf44a56643eaf98c4c45985ad9323ff83e6d72cdb025d5');assert.equal(f.nativeApproval,false);assert.equal(f.runtimeApplied,false)
for(const[p,h]of[[selectedProofIdentity.sourceProofFile,selectedProofIdentity.sourceProofFileSha256],[selectedProofIdentity.sourceCapsuleFile,selectedProofIdentity.sourceCapsuleFileSha256],[selectedProofIdentity.sourceChecksFile,selectedProofIdentity.sourceChecksFileSha256]])assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h)
const polygons=s=>s.match(/M[^M]+/g).map(p=>{const a=p.match(/-?\d+(?:\.\d+)?/g).map(Number);return Array.from({length:a.length/2},(_,i)=>[a[2*i],a[2*i+1]])}),cycle=(a,b)=>[b,b.toReversed()].some(v=>v.some((_,i)=>JSON.stringify(a)===JSON.stringify([...v.slice(i),...v.slice(0,i)])))
const original=sourceGroups.flatMap(gs=>gs.flatMap(i=>full.trace[i]));assert.equal(original.length,strokes.flat().length)
for(let i=0;i<original.length;i++){const P=polygons(strokes.flat()[i].outline);assert.equal(P.length,original[i].polygons.length);for(let j=0;j<P.length;j++)assert(cycle(P[j],original[i].polygons[j].map(v=>[v.x/2,v.y/2])))}
assert.deepEqual(sourceGroups.flat().toSorted((a,b)=>a-b),Array.from({length:13},(_,i)=>i));assert.equal(new Set(sourceGroups.flat()).size,13)
assert.equal(f.sourceProposal.oldStaticReview.sourceWholeCompatible,true);assert.equal(f.sourceProposal.oldInitialNibHold.confirmed,true);assert.equal(f.sourceProposal.oldInitialNibHold.positiveArea,true);assert.equal(f.sourceProposal.oldInitialNibHold.overruledByJev,false);assert.equal(f.sourceProposal.newDirectionsReviewed,0);assert.equal(f.sourceProposal.newInitialContactApproved,false)
assert.deepEqual(full.trace[4][0].args.slice(2,4),[50,169.795]);assert.deepEqual(full.trace[5][0].args.slice(0,2),[23,179.7]);assert.equal(f.sourceProposal.sourceConnectorAdded,false)
let negative=0;for(const change of[x=>x.identity.sourceRoot+='-wrong',x=>x.identity.sourceProofFileSha256='0'.repeat(64),x=>x.full.groups[0].raw[0]++,x=>x.trace[0][0].args[0]+=.01,x=>x.trace[0][0].polygons[0][0].x+=.01]){const x={identity:clone(selectedProofIdentity),full:clone(full),trace:clone(full.trace)};change(x);assert.throws(()=>compileProgressive(x.trace,x.full,x.identity));negative++}
let getterReads=0;const foreign=clone(selectedProofIdentity);Object.defineProperty(foreign,'sourceRoot',{enumerable:true,get(){getterReads++;return selectedProofIdentity.sourceRoot}});assert.throws(()=>compileProgressive(full.trace,full,foreign));assert.equal(getterReads,0);negative++
console.log(JSON.stringify({glyph:'萇',sourceRoot:'u8407-ue0102',sourceGuardFIRST:true,counts:[12,13,13,13,26],negative,getterReads,sourceProjection:1,preparedProjectionReused:true,engineRuns:0,archiveGET:0,oldInitialFiniteNibHoldPreserved:true,originalPCyclesPreserved:true,newWholeMacroApproved:false,allOfficialDirectionsObserved:false,nativeApproval:false,registered:false,durationMs:performance.now()-started}))
