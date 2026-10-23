import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as candidate from './candidate.mjs'
const bytes=p=>readFileSync(new URL(p,import.meta.url)),clone=x=>JSON.parse(JSON.stringify(x)),sha=x=>createHash('sha256').update(x).digest('hex')
test('漑 FIRST original14p19m34P projection and six strict guards',()=>{
 const full=JSON.parse(bytes(candidate.selectedProofIdentity.sourceProofFile)),id=candidate.selectedProofIdentity
 assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(bytes(id.sourceProofFile)),'7ff6c8fb904a1a2a18bba8d82fc15389e2613bbe9e136ca0c2beab762b8a0339');assert.deepEqual([full.groups.length,full.trace.flat().length,full.groups.reduce((s,g)=>s+g.polygons.length,0)],[17,19,34])
 const strokes=candidate.compileProgressive(full.trace,full,id);assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((s,m)=>s+(m.outline.match(/M/g)||[]).length,0)],[14,19,34]);assert.deepEqual(candidate.sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:17},(_,i)=>i))
 const points=s=>s.split(/(?=M)/).filter(Boolean).map(poly=>{const a=poly.match(/-?\d+(?:\.\d+)?/g).map(Number);return Array.from({length:a.length/2},(_,i)=>[a[2*i]*2,a[2*i+1]*2])})
 const sameCycle=(a,b)=>a.length===b.length&&a.some((_,k)=>a.every((v,i)=>JSON.stringify(v)===JSON.stringify(b[(i+k)%b.length]))||a.every((v,i)=>JSON.stringify(v)===JSON.stringify(b[(k-i+b.length)%b.length])))
 let pen=0;for(const group of candidate.sourceGroups){const masks=strokes[pen++];let mi=0;for(const ri of group)for(const call of full.trace[ri]){const mask=masks[mi++],polys=points(mask.outline);assert.equal(polys.length,call.polygons.length);polys.forEach((p,i)=>assert(sameCycle(p,call.polygons[i].map(v=>[v.x,v.y]))));assert.equal(mask.revealWidth??14,14)}}
 assert.equal(strokes[2].length,2);assert.equal(strokes[2][0].revealPath,'M6.4 66.5 Q18.65 71 17.25 92');assert.equal(strokes[2][1].revealPath,'M15.5 75 Q16.9 69 31.6 33.5');assert.equal(strokes[11].length,2);assert.equal(strokes[13].length,3);assert.equal(strokes[13][2].direction,'right');assert.equal((strokes[13][2].outline.match(/M/g)||[]).length,3);assert.equal(candidate.sourceProposal.scope.mappingNativeApproved,false);assert.equal(candidate.sourceProposal.water3.fullPrefixConnectionNotProved,true);assert.equal(candidate.sourceProjectionCount,1)
 let reads=0;const getter=clone(id);Object.defineProperty(getter,'sourceRoot',{enumerable:true,get(){reads++;return'u6f11'}})
 const badProof=clone(full);badProof.groups[0].polygons[0][0].x+=1;const badTrace=clone(full.trace);badTrace[12][0].args[0]+=1
 const foreign={...id,sourceRoot:'u6f11-k'};const extra={...full,extra:true};const short=clone(full);short.groups.pop()
 for(const[tr,proof,identity]of[[full.trace,full,foreign],[full.trace,badProof,id],[badTrace,full,id],[full.trace,extra,id],[full.trace,short,id],[full.trace,full,getter]])assert.throws(()=>candidate.compileProgressive(tr,proof,identity))
 assert.equal(reads,0);assert.equal(candidate.sourceProjectionCount,1);assert.equal(candidate.nativeApproved,false);assert.equal(candidate.runtimeApplied,false)
 console.log('SOURCE_FIXTURE_RESULT:'+JSON.stringify({u6f11:{strokes,identity:id,fullProof:full,sourceProposal:candidate.sourceProposal}}))
 console.log(JSON.stringify({projectionFIRST:1,sourceGuardFIRST:1,negative6:true,getterReads:0,originalPExactlyOnce:34,originalRaw:17,originalCalls:19,pens:14,masks:19,engine:0,sourceGeometryChanged:false,nativeApproval:false}))
})
