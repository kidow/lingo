import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u85c7-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import * as api from './hanja-stroke-start-caps-u85c7-hkcs.ts'
const f=fixture.hkcs_m85c7,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x)),targets=[[5,1]]
const context=api.makeReviewedU85c7HkcsSourceContext(f.fullProof,f.identity,s);assert(context)
test('藇 exact full source gate owns one policy and no outlines-only token API',()=>{
 assert.equal(context.id,'u85c7-hkcs-original-18-initial-guides')
 assert.equal('reviewedU85c7HkcsContext'in api,false);assert(Object.isFrozen(f.fullProof)&&Object.isFrozen(f.identity)&&Object.isFrozen(s))
 assert.equal(api.makeReviewedU85c7HkcsSourceContext(clone(f.fullProof),clone(f.identity),clone(s)),context)
 for(let p=0;p<s.length;p++)for(let m=0;m<s[p].length;m++)assert.equal(!!api.reviewedU85c7HkcsPolicy(context,p,m),targets.some(t=>t[0]===p+1&&t[1]===m+1))
 assert.equal(api.reviewedU85c7HkcsPolicy({...context},0,0),null)
 const proof=clone(f.fullProof);proof.trace[0][0].args[0]+=.1;assert.equal(api.makeReviewedU85c7HkcsSourceContext(proof,f.identity,s),null)
 const strokes=clone(s);(strokes[0][0] as {weight:number}).weight+=.1;assert.equal(api.makeReviewedU85c7HkcsSourceContext(f.fullProof,f.identity,strokes),null)
 assert.equal(api.makeReviewedU85c7HkcsSourceContext(f.fullProof,{...f.identity,sourceRoot:'other'},s),null)
 let reads=0;const bad=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return f.identity.sourceRoot}});assert.equal(api.makeReviewedU85c7HkcsSourceContext(f.fullProof,bad,s),null);assert.equal(reads,0)
})
function measurement(policy:NonNullable<ReturnType<typeof api.reviewedU85c7HkcsPolicy>>,p:number){
 type N={localName:string;namespaceURI:string;isConnected:boolean;ownerDocument:unknown;ownerSVGElement:N|null;parentElement:N|null;attrs:Map<string,string>;getAttribute:(k:string)=>string|null;getTotalLength:()=>number;getPointAtLength:(d:number)=>{x:number;y:number}}
 const doc:{defaultView:unknown}={defaultView:null};doc.defaultView={document:doc,getComputedStyle:()=>({transform:'none',getPropertyValue:()=>''})}
 const make=(localName:string):N=>{const attrs=new Map<string,string>();return{localName,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerDocument:doc,ownerSVGElement:null,parentElement:null,attrs,getAttribute:k=>attrs.get(k)??null,getTotalLength:()=>40,getPointAtLength:d=>({x:d,y:d})}}
 const owner=make('svg'),target=make('g'),defs=make('defs'),guide=make('path');target.parentElement=owner;defs.parentElement=target;guide.parentElement=defs
 for(const n of[target,defs,guide])n.ownerSVGElement=owner
 target.attrs.set('data-stroke-start-gate',policy.id);target.attrs.set('data-u85c7-hkcs-progress',String(p));guide.attrs.set('d',policy.segment.revealPath!);guide.attrs.set('data-u85c7-hkcs-measurement','true')
 const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);guide.getPointAtLength=d=>({x:q[0]+d,y:q[1]+d})
 return{owner,target,defs,guide}
}
test('藇 policies keep original Q and expose only guarded UA measurement, not native approval',()=>{
 for(const[pen,mask]of targets){const p=api.reviewedU85c7HkcsPolicy(context,pen-1,mask-1);assert(p);assert(p.certificate.storedBounds.initialSufficientConditions);assert.equal(p.certificate.notPreviousMaskConnectivityProof,true)
  const t=measurement(p,.01),v=api.measureReviewedU85c7HkcsFrame(p,p.segment,.01,t.guide as unknown as SVGPathElement);assert.equal(v.guide,p.segment.revealPath);assert.equal(v.d,.4);assert.equal(v.rho,.4)
  assert.throws(()=>api.measureReviewedU85c7HkcsFrame({...p},p.segment,.01,t.guide as unknown as SVGPathElement))
  for(const patch of[{outline:p.segment.outline+' '},{revealPath:p.segment.revealPath+' '},{revealWidth:15},{weight:p.segment.weight+.1}])assert.throws(()=>api.measureReviewedU85c7HkcsFrame(p,{...p.segment,...patch},.01,t.guide as unknown as SVGPathElement))
  for(const progress of[-1,NaN,1.01])assert.throws(()=>api.measureReviewedU85c7HkcsFrame(p,p.segment,progress,t.guide as unknown as SVGPathElement))
  const changed=measurement(p,.01);changed.guide.getTotalLength=()=>{changed.target.attrs.set('data-u85c7-hkcs-progress','.02');return 40};assert.throws(()=>api.measureReviewedU85c7HkcsFrame(p,p.segment,.01,changed.guide as unknown as SVGPathElement))
  const empty={measurement:null,guide:null,startCap:null,endCap:null,ink:null};assert.equal(api.commitReviewedU85c7HkcsCaps(p,p.segment,0,'review',empty).status,'empty');assert.equal(api.commitReviewedU85c7HkcsCaps(p,p.segment,1,'review',empty).status,'complete');assert.equal(api.commitReviewedU85c7HkcsCaps(p,p.segment,.01,'review',empty).status,'hidden')
 }
})
test('藇 source proof pins distinguish guide conditions from intersection and native review',()=>{
 for(const[path,sha]of Object.entries(api.REVIEWED_U85C7_HKCS_CAPS_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),sha)
 assert.equal(api.REVIEWED_U85C7_HKCS_CAPS_PROOFS.length,1);assert.equal(api.REVIEWED_U85C7_HKCS_CAPS_SOURCE.fullGrowingIntersectionProof,false);assert.equal(api.REVIEWED_U85C7_HKCS_CAPS_SOURCE.notT0WitnessIsNotSafety,true);assert.equal(api.REVIEWED_U85C7_HKCS_CAPS_SOURCE.nativeApproval,false);assert.equal(api.REVIEWED_U85C7_HKCS_CAPS_SOURCE.runtimeApplied,false)
})
