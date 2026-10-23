import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as candidate from './candidate.mjs'
const bytes=p=>readFileSync(new URL(p,import.meta.url)),clone=x=>JSON.parse(JSON.stringify(x)),sha=x=>createHash('sha256').update(x).digest('hex')
test('迨 FIRST original9p13m25P projection and six strict guards',()=>{
 const full=JSON.parse(bytes(candidate.selectedProofIdentity.sourceProofFile)),id=candidate.selectedProofIdentity
 assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(bytes(id.sourceProofFile)),'b761033f1011dae76fe3d30324ddae06448954c52a583305ee2ee085f21f80b1');assert.deepEqual([full.groups.length,full.trace.flat().length,full.groups.reduce((s,g)=>s+g.polygons.length,0)],[13,13,25])
 const strokes=candidate.compileProgressive(full.trace,full,id);assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((s,m)=>s+(m.outline.match(/M/g)||[]).length,0)],[9,13,25]);assert.deepEqual(candidate.sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:13},(_,i)=>i))
 const points=s=>s.split(/(?=M)/).filter(Boolean).map(poly=>{const a=poly.match(/-?\d+(?:\.\d+)?/g).map(Number);return Array.from({length:a.length/2},(_,i)=>[a[2*i]*2,a[2*i+1]*2])})
 const sameCycle=(a,b)=>a.length===b.length&&a.some((_,k)=>a.every((v,i)=>JSON.stringify(v)===JSON.stringify(b[(i+k)%b.length]))||a.every((v,i)=>JSON.stringify(v)===JSON.stringify(b[(k-i+b.length)%b.length])))
 let pen=0;for(const group of candidate.sourceGroups){const masks=strokes[pen++];let mi=0;for(const ri of group)for(const call of full.trace[ri]){const mask=masks[mi++],polys=points(mask.outline);assert.equal(polys.length,call.polygons.length);polys.forEach((p,i)=>assert(sameCycle(p,call.polygons[i].map(v=>[v.x,v.y]))));assert.equal(mask.revealWidth??14,14)}}
 assert.equal(strokes[0].length,2);assert.equal(strokes[7].length,2);assert.equal(strokes[8].length,2);assert.equal(strokes[8][0].revealPath,'M8 89.5 Q17.5 84 27.5 77');assert.equal(strokes[8][1].revealPath,'M26.5 76 C34 86 42 90.5 89.5 88.5');assert.equal(candidate.sourceProjectionCount,1)
 let reads=0;const getter=clone(id);Object.defineProperty(getter,'sourceRoot',{enumerable:true,get(){reads++;return'u8fe8'}})
 const badProof=clone(full);badProof.groups[0].polygons[0][0].x+=1;const badTrace=clone(full.trace);badTrace[12][0].args[0]+=1
 const foreign={...id,sourceRoot:'u8fe8-k'};const extra={...full,extra:true};const short=clone(full);short.groups.pop()
 for(const[tr,proof,identity]of[[full.trace,full,foreign],[full.trace,badProof,id],[badTrace,full,id],[full.trace,extra,id],[full.trace,short,id],[full.trace,full,getter]])assert.throws(()=>candidate.compileProgressive(tr,proof,identity))
 assert.equal(reads,0);assert.equal(candidate.sourceProjectionCount,1);assert.equal(candidate.nativeApproved,false);assert.equal(candidate.runtimeApplied,false)
 console.log('SOURCE_FIXTURE_RESULT:'+JSON.stringify({u8fe8:{strokes,identity:id,fullProof:full}}))
 console.log(JSON.stringify({projectionFIRST:1,sourceGuardFIRST:1,negative6:true,getterReads:0,originalPExactlyOnce:25,originalRaw:13,originalCalls:13,pens:9,masks:13,engine:0,sourceGeometryChanged:false,nativeApproval:false}))
})
