import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups} from './candidate.mjs'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x)),full=read('../hanja-actual-engine-capture-u704c-ue0102-2026-10-24/engine-whole-u704c-ue0102.json'),f=read('./fixtures.json')['u704c-ue0102'],strokes=f.strokes
const started=performance.now()
assert.deepEqual(f.fullProof,full);assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.deepEqual([strokes.length,strokes.flat().length,full.groups.length,full.trace.flat().length,full.trace.flat().reduce((s,c)=>s+c.polygons.length,0)],[21,24,24,24,41])
assert.deepEqual(sourceGroups,[[0],[1],[2,3],[4],[5],[7],[6],[8],[9,10],[11],[12],[13,14],[15],[16],[17],[18],[20],[21],[22],[19],[23]])
assert.equal(sha(JSON.stringify(strokes)),'a8b003c42ed648370f54164e98a586f70a7612ddb9c255ef8258574a157308fb');assert.equal(f.nativeApproval,false);assert.equal(f.runtimeApplied,false)
for(const[p,h]of[[selectedProofIdentity.sourceProofFile,selectedProofIdentity.sourceProofFileSha256],[selectedProofIdentity.sourceCapsuleFile,selectedProofIdentity.sourceCapsuleFileSha256],[selectedProofIdentity.sourceChecksFile,selectedProofIdentity.sourceChecksFileSha256]])assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h)
const polygons=s=>s.match(/M[^M]+/g).map(p=>{const a=p.match(/-?\d+(?:\.\d+)?/g).map(Number);return Array.from({length:a.length/2},(_,i)=>[a[2*i],a[2*i+1]])}),cycle=(a,b)=>[b,b.toReversed()].some(v=>v.some((_,i)=>JSON.stringify(a)===JSON.stringify([...v.slice(i),...v.slice(0,i)])))
const original=sourceGroups.flatMap(gs=>gs.flatMap(i=>full.trace[i]));assert.equal(original.length,strokes.flat().length)
for(let i=0;i<original.length;i++){const P=polygons(strokes.flat()[i].outline);assert.equal(P.length,original[i].polygons.length);for(let j=0;j<P.length;j++)assert(cycle(P[j],original[i].polygons[j].map(v=>[v.x/2,v.y/2])))}
assert.deepEqual(sourceGroups.flat().toSorted((a,b)=>a-b),Array.from({length:24},(_,i)=>i));assert.equal(new Set(sourceGroups.flat()).size,24)
let negative=0;for(const change of[x=>x.identity.sourceRoot+='-wrong',x=>x.identity.sourceProofFileSha256='0'.repeat(64),x=>x.full.groups[0].raw[0]++,x=>x.trace[0][0].args[0]+=.01,x=>x.trace[0][0].polygons[0][0].x+=.01]){const x={identity:clone(selectedProofIdentity),full:clone(full),trace:clone(full.trace)};change(x);assert.throws(()=>compileProgressive(x.trace,x.full,x.identity));negative++}
let getterReads=0;const foreign=clone(selectedProofIdentity);Object.defineProperty(foreign,'sourceRoot',{enumerable:true,get(){getterReads++;return selectedProofIdentity.sourceRoot}});assert.throws(()=>compileProgressive(full.trace,full,foreign));assert.equal(getterReads,0);negative++
console.log(JSON.stringify({glyph:"灌",sourceRoot:"u704c-ue0102",sourceGuardFIRST:true,counts:[21,24,24,24,41],negative,getterReads,sourceProjection:1,preparedProjectionReused:true,engineRuns:0,originalPCyclesPreserved:true,staticMappingApproved:false,waterClockProved:false,registered:false,durationMs:performance.now()-started}))
assert.equal(f.sourceProposal.waterCompound.originalGuideContinuityClaimed,false);assert.equal(f.sourceProposal.waterCompound.newSourcePClockProved,false);assert.equal(f.sourceProposal.base23RecipeTransposed,false);assert.equal(f.sourceProposal.newStaticMappingApproved,false)
