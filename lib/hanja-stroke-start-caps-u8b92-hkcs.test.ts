import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u8b92-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import proof from '../docs/hanja-source-original-u8b92-hkcs-2026-10-26/caps-conditions-proof.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8b92HkcsSourceContext,reviewedU8b92HkcsPolicy,commitReviewedU8b92HkcsCaps,REVIEWED_U8B92_HKCS_CAPS_SOURCE,REVIEWED_U8B92_HKCS_CAPS_PROOFS,REVIEWED_U8B92_HKCS_CAPS_INPUT_SHA256} from './hanja-stroke-start-caps-u8b92-hkcs.ts'
const f=fixture.hkcs_m8b92,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
test('讒 caps factory binds full24 source context including metadata raw5',()=>{
 assert(makeReviewedU8b92HkcsSourceContext(f.fullProof,f.identity,s));assert(makeReviewedU8b92HkcsSourceContext(clone(f.fullProof),Object.fromEntries(Object.entries(f.identity).reverse()),clone(s)))
 const bad=clone(f.fullProof);bad.trace[4]=clone(bad.trace[0]);assert.equal(makeReviewedU8b92HkcsSourceContext(bad,f.identity,s),null)
 assert.equal(makeReviewedU8b92HkcsSourceContext(f.fullProof,{...f.identity,sourceRoot:'u8b92-var-002'},s),null)
 const changed=clone(s).map(p=>p.map(m=>({...m})));changed[7][0]={...changed[7][0],revealWidth:15};assert.equal(makeReviewedU8b92HkcsSourceContext(f.fullProof,f.identity,changed),null)
 let reads=0;const access=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return f.identity.sourceRoot}});assert.equal(makeReviewedU8b92HkcsSourceContext(f.fullProof,access,s),null);assert.equal(reads,0)
 assert.equal(s.length,24);assert.equal(s.flat().length,34);assert.equal(s.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),63)
})
test('讒 eight exact initial successes stay separate from seven prepared dispatch targets',()=>{
 const ctx=makeReviewedU8b92HkcsSourceContext(f.fullProof,f.identity,s);assert(ctx)
 const expected=[[8,1],[9,2],[15,1],[17,1],[18,2],[22,1],[24,1]]
 for(const[pen,mask]of expected){const p=reviewedU8b92HkcsPolicy(ctx,pen-1,mask-1);assert(p);assert.deepEqual(p.segment,s[pen-1][mask-1]);assert.equal(p.segment.revealWidth,14);assert.equal(p.certificate.notPreviousMaskConnectivityProof,true);assert.equal(p.certificate.notFullSweepProof,true)}
 for(const[pen,mask]of[[14,2],[16,2],[23,2],[1,1],[16,3],[23,3]])assert.equal(reviewedU8b92HkcsPolicy(ctx,pen-1,mask-1),null)
 assert.equal(reviewedU8b92HkcsPolicy({...ctx},7,0),null);assert.equal(REVIEWED_U8B92_HKCS_CAPS_PROOFS.length,8);assert.equal(REVIEWED_U8B92_HKCS_CAPS_SOURCE.preparedPolicies,7)
 assert.equal(REVIEWED_U8B92_HKCS_CAPS_SOURCE.compoundContactApproved,false);assert.equal(REVIEWED_U8B92_HKCS_CAPS_SOURCE.flag5TerminalApproved,false);assert.equal(REVIEWED_U8B92_HKCS_CAPS_SOURCE.nativeApproval,false)
})
test('讒 stored certificates keep failed short curves and successful full Q7 coverage distinct',()=>{
 assert.equal(proof.initialCases.length,10);assert.deepEqual(proof.initialCases.filter(x=>!x.initialSufficientConditions).map(x=>[x.pen,x.mask]),[[16,2],[23,2]])
 for(const f of proof.initialCases.filter(x=>!x.initialSufficientConditions)){assert.equal(f.attempts.length,4);assert(f.attempts.every(a=>!a.ok))}
 assert.equal(proof.fullQCoverage.length,8);assert(proof.fullQCoverage.every(x=>x.strictFullPContained&&x.unresolved.length===0));assert.equal(proof.fullQCoverage.reduce((n,x)=>n+x.coverLeaves.length,0),236)
 for(const[p,expected]of Object.entries(REVIEWED_U8B92_HKCS_CAPS_INPUT_SHA256)){const bytes=readFileSync(new URL('../'+p,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),expected)}
})
test('讒 absent actual SVG bindings hide without UA reads',()=>{
 const ctx=makeReviewedU8b92HkcsSourceContext(f.fullProof,f.identity,s);assert(ctx);const p=reviewedU8b92HkcsPolicy(ctx,7,0);assert(p)
 assert.equal(commitReviewedU8b92HkcsCaps(p,s[7][0],.5,'test',{measurement:null,guide:null,startCap:null,endCap:null,ink:null}).status,'hidden')
 assert.equal(commitReviewedU8b92HkcsCaps({...p},s[7][0],.5,'test',{measurement:null,guide:null,startCap:null,endCap:null,ink:null}).status,'hidden')
})
