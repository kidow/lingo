import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import proof from '../docs/hanja-source-original-u5e6a-hkcs-2026-10-26/caps-conditions-proof.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU5e6aHkcsSourceContext,reviewedU5e6aHkcsPolicy,commitReviewedU5e6aHkcsCaps,REVIEWED_U5E6A_HKCS_CAPS_SOURCE,REVIEWED_U5E6A_HKCS_CAPS_PROOFS,REVIEWED_U5E6A_HKCS_CAPS_INPUT_SHA256} from './hanja-stroke-start-caps-u5e6a-hkcs.ts'
const f=fixture.hkcs_m5e6a,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
test('幪 caps factory binds full17 source context including all raw19',()=>{
 assert(makeReviewedU5e6aHkcsSourceContext(f.fullProof,f.identity,s));assert(makeReviewedU5e6aHkcsSourceContext(clone(f.fullProof),Object.fromEntries(Object.entries(f.identity).reverse()),clone(s)))
 const bad=clone(f.fullProof);bad.trace[4]=clone(bad.trace[0]);assert.equal(makeReviewedU5e6aHkcsSourceContext(bad,f.identity,s),null)
 assert.equal(makeReviewedU5e6aHkcsSourceContext(f.fullProof,{...f.identity,sourceRoot:'u5e6a-var-002'},s),null)
 const changed=clone(s).map(p=>p.map(m=>({...m})));changed[7][0]={...changed[7][0],revealWidth:15};assert.equal(makeReviewedU5e6aHkcsSourceContext(f.fullProof,f.identity,changed),null)
 let reads=0;const access=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return f.identity.sourceRoot}});assert.equal(makeReviewedU5e6aHkcsSourceContext(f.fullProof,access,s),null);assert.equal(reads,0)
 assert.equal(s.length,17);assert.equal(s.flat().length,21);assert.equal(s.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),38)
})
test('幪 seven exact independent initial successes dispatch only their own policies',()=>{
 const ctx=makeReviewedU5e6aHkcsSourceContext(f.fullProof,f.identity,s);assert(ctx)
 const expected=[[8,1],[12,1],[13,1],[14,1],[15,1],[16,1],[17,1]]
 for(const[pen,mask]of expected){const p=reviewedU5e6aHkcsPolicy(ctx,pen-1,mask-1);assert(p);assert.deepEqual(p.segment,s[pen-1][mask-1]);assert.equal(p.segment.revealWidth,14);assert.equal(p.certificate.notPreviousMaskConnectivityProof,true);assert.equal(p.certificate.notFullSweepProof,true)}
 for(const[pen,mask]of[[2,3],[9,2],[13,2],[1,1],[2,2],[13,3]])assert.equal(reviewedU5e6aHkcsPolicy(ctx,pen-1,mask-1),null)
 assert.equal(reviewedU5e6aHkcsPolicy({...ctx},7,0),null);assert.equal(REVIEWED_U5E6A_HKCS_CAPS_PROOFS.length,7);assert.equal(REVIEWED_U5E6A_HKCS_CAPS_SOURCE.preparedPolicies,7)
 assert.equal(REVIEWED_U5E6A_HKCS_CAPS_SOURCE.compoundContactApproved,false);assert.equal(REVIEWED_U5E6A_HKCS_CAPS_SOURCE.flag5TerminalApproved,false);assert.equal(REVIEWED_U5E6A_HKCS_CAPS_SOURCE.nativeApproval,false)
})
test('幪 stored certificates keep failed short curves and successful full Q7 coverage distinct',()=>{
 assert.equal(proof.initial.initialCases.length,10);assert.deepEqual(proof.initial.initialCases.filter(x=>!x.initialSufficientConditions).map(x=>[x.pen,x.mask]),[[2,3],[9,2],[13,2]])
 for(const f of proof.initial.initialCases.filter(x=>!x.initialSufficientConditions)){assert.equal(f.attempts.length,4);assert(f.attempts.every(a=>!a.ok))}
 assert.equal(proof.fullQCoverage.length,7);assert(proof.fullQCoverage.every(x=>x.strictFullPContained&&x.unresolved.length===0));assert.equal(proof.fullQCoverage.reduce((n,x)=>n+x.coverLeaves.length,0),433)
 for(const[p,expected]of Object.entries(REVIEWED_U5E6A_HKCS_CAPS_INPUT_SHA256)){const bytes=readFileSync(new URL('../'+p,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),expected)}
})
test('幪 absent actual SVG bindings hide without UA reads',()=>{
 const ctx=makeReviewedU5e6aHkcsSourceContext(f.fullProof,f.identity,s);assert(ctx);const p=reviewedU5e6aHkcsPolicy(ctx,7,0);assert(p)
 assert.equal(commitReviewedU5e6aHkcsCaps(p,s[7][0],.5,'test',{measurement:null,guide:null,startCap:null,endCap:null,ink:null}).status,'hidden')
 assert.equal(commitReviewedU5e6aHkcsCaps({...p},s[7][0],.5,'test',{measurement:null,guide:null,startCap:null,endCap:null,ink:null}).status,'hidden')
})
