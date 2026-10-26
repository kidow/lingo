import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import kernel from '../docs/hanja-source-original-u5e6a-hkcs-2026-10-26/16-union-point-window-proof.json' with {type:'json'}
import audit from '../docs/hanja-source-original-u5e6a-hkcs-2026-10-26/16-early-exposure-proof.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU5e6aHkcsSourceContext,reviewedU5e6aHkcsPolicy} from './hanja-stroke-start-caps-u5e6a-hkcs.ts'
import {makeReviewedU5e6aHkcsUnion16SourceContext,reviewedU5e6aHkcsUnion16Policy,sampleReviewedU5e6aHkcsUnion16Frame,REVIEWED_U5E6A_HKCS_UNION16_SOURCE,REVIEWED_U5E6A_HKCS_UNION16_INPUT_SHA256} from './hanja-stroke-union-point-window16-u5e6a-hkcs.ts'
const f=fixture.hkcs_m5e6a,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
test('幪16 delegates exact whole-source context and owns only16m1',()=>{
 const c=makeReviewedU5e6aHkcsUnion16SourceContext(f.fullProof,f.identity,s);assert(c);assert.equal(c,makeReviewedU5e6aHkcsSourceContext(f.fullProof,f.identity,s))
 const p=reviewedU5e6aHkcsUnion16Policy(c,15,0);assert(p);assert.deepEqual(p.segment,s[15][0]);assert.equal((p.segment.outline.match(/M/g)||[]).length,3)
 for(let pen=0;pen<s.length;pen++)for(let mask=0;mask<s[pen].length;mask++)if(pen!==15||mask!==0)assert.equal(reviewedU5e6aHkcsUnion16Policy(c,pen,mask),null)
 assert.equal(reviewedU5e6aHkcsUnion16Policy({...c},15,0),null)
 const changed=clone(f.fullProof);changed.trace[17][0].args[0]+=.1;assert.equal(makeReviewedU5e6aHkcsUnion16SourceContext(changed,f.identity,s),null)
 assert.equal(makeReviewedU5e6aHkcsUnion16SourceContext(f.fullProof,{...f.identity,sourceRoot:'other'},s),null)
 let reads=0;const getter=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return f.identity.sourceRoot}});assert.equal(makeReviewedU5e6aHkcsUnion16SourceContext(f.fullProof,getter,s),null);assert.equal(reads,0)
})
test('幪16 point window starts empty, is nested, excludes the old far ornament early and completes original P3',()=>{
 const c=makeReviewedU5e6aHkcsUnion16SourceContext(f.fullProof,f.identity,s);assert(c);const p=reviewedU5e6aHkcsUnion16Policy(c,15,0);assert(p)
 assert.notDeepEqual(p.anchor,[87,55]);let prev={x:p.anchor[0],y:p.anchor[1],right:p.anchor[0],bottom:p.anchor[1]}
 for(const t of[0,1e-8,.000001,.001,.01,.03,.1,.25,.5,.75,.99,1]){const v=sampleReviewedU5e6aHkcsUnion16Frame(p,p.segment,t);assert.equal(v.sourceGuide,'M87 55 Q83 61 74 68');assert.equal(v.UARead,false);assert.equal(v.visible,t!==0);assert.equal(v.originalPDirect,t===1)
  if(v.clip){const r=v.clip,right=r.x+r.width,bottom=r.y+r.height;assert(r.x<=prev.x&&r.y<=prev.y&&right>=prev.right&&bottom>=prev.bottom);assert(r.width*r.width+r.height*r.height<=(12186/25)*t*t+1e-11);prev={x:r.x,y:r.y,right,bottom};if(t===.03)assert(right<89.185)}else assert(t===0||t===1)
 }
 assert.equal(sampleReviewedU5e6aHkcsUnion16Frame(p,p.segment,0).clip,null);assert.equal(sampleReviewedU5e6aHkcsUnion16Frame(p,p.segment,1).clip,null)
})
test('幪16 rejects old growing policy and every changed original field',()=>{
 const c=makeReviewedU5e6aHkcsUnion16SourceContext(f.fullProof,f.identity,s);assert(c);const p=reviewedU5e6aHkcsUnion16Policy(c,15,0);assert(p);const old=reviewedU5e6aHkcsPolicy(c,15,0);assert(old)
 assert.throws(()=>sampleReviewedU5e6aHkcsUnion16Frame(old as unknown as typeof p,p.segment,.03));assert.throws(()=>sampleReviewedU5e6aHkcsUnion16Frame({...p},p.segment,.03))
 for(const patch of[{outline:p.segment.outline+' '},{revealPath:p.segment.revealPath+' '},{revealWidth:15},{weight:p.segment.weight+.1},{direction:'down' as const},{bounds:[0,0,100,100] as const}])assert.throws(()=>sampleReviewedU5e6aHkcsUnion16Frame(p,{...p.segment,...patch},.03))
 for(const n of[-1,1.1,NaN,Infinity])assert.throws(()=>sampleReviewedU5e6aHkcsUnion16Frame(p,p.segment,n))
})
test('幪16 exact audit/kernel evidence stays separate from raster and direction approval',()=>{
 assert.equal(audit.farOriginalDecorationEarlyExposureProved,true);assert.equal(audit.mathematicalDisconnectionClaimed,false);assert.equal(audit.entireMaskIntersectionComponentsClassified,false);assert.equal(audit.nativeAAExplanationClaimed,false)
 assert.equal(kernel.boundaryCycles,1);assert.equal(kernel.exteriorSegments,25);assert.equal(kernel.strictKernel,true);assert.equal(kernel.originalQ0OutsideInk,true);assert.equal(kernel.originalOutlinePaintUnionEquivalenceReused.newReplay,0)
 for(const key of['anchorIsSourceQ0','sourcePOrQOrWidthOrWeightChanged','oldMaskComponentsClassified','originalClockIdentityApproved','originalMicroDirectionApproved','sharedRendererConnected','nativeApproval','runtimeApplied'] as const)assert.equal(REVIEWED_U5E6A_HKCS_UNION16_SOURCE[key],false)
 for(const[path,sha]of Object.entries(REVIEWED_U5E6A_HKCS_UNION16_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),sha)
})
